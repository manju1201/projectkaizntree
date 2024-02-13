from django.shortcuts import render

# Create your views here.
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, ItemSerializer, CategorySerializer, TagSerializer
from .models import Item, Category, Tag
from django.db.models import Q

from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt


class ItemCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer



class CreateUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        data = request.data
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_404_NOT_FOUND)



# @require_POST
# @csrf_exempt
# def logout_view(request):
#     logout(request)
#     return JsonResponse({'status': 'ok'}, status=200)


class ItemListCreateView(generics.ListCreateAPIView):
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = Item.objects.all()

        # Retrieve the search parameter from the request query parameters
        search_query = self.request.query_params.get('search', None)
        in_stock = self.request.query_params.get('in_stock', None)
        order_by = self.request.query_params.get('order_by', None)
        sort_order = self.request.query_params.get('sort_order', 'asc')  # Default to ascending

        # Implement search functionality if a search query is provided
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | 
                Q(tags__name__icontains=search_query) |
                Q(category__name__icontains=search_query)
            ).distinct()

        if order_by:
            direction = '' if sort_order.lower() == 'asc' else '-'
            # Apply the sorting based on the order_by field and direction
            queryset = queryset.order_by(f'{direction}{order_by}')


        # Filter by in_stock status if the in_stock parameter is provided
        if in_stock is not None:
            in_stock_bool = in_stock.lower() in ['true', '1']
            queryset = queryset.filter(in_stock=in_stock_bool)

        return queryset
