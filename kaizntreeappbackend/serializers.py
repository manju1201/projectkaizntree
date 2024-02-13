# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Item, Category, Tag


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# class ItemSerializer(serializers.ModelSerializer):
#     tags = TagSerializer(many=True, read_only=True)
#     category = CategorySerializer(read_only=True)

#     class Meta:
#         model = Item
#         fields = ('SKU', 'name', 'category', 'tags', 'in_stock', 'available_stock')
class ItemSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Item
        fields = ['SKU', 'name', 'category', 'tags', 'in_stock', 'available_stock']
    
    def to_representation(self, instance):
        representation = super(ItemSerializer, self).to_representation(instance)
        representation['category'] = CategorySerializer(instance.category).data
        representation['tags'] = [tag.name for tag in instance.tags.all()]
        return representation

    # Ensure that the 'tags' field is properly handled if needed
    