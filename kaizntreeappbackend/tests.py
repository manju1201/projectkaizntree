from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Item, Category, Tag  # Update 'myapp' with your actual app name
from django.contrib.auth.models import User

class APITests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = Category.objects.create(name='TestCategory')
        self.item = Item.objects.create(SKU='TESTSKU', name='Test Item', category=self.category, in_stock=True, available_stock=10)
        self.tag = Tag.objects.create(name='TestTag')
        self.item.tags.add(self.tag)

    def test_create_account(self):
        url = reverse('create-account')
        data = {'username': 'newuser', 'password': 'newpassword', 'email': 'email@email.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        url = reverse('login')
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_item(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('item-list-create')
        data = {'SKU': 'NEWSKU', 'name': 'New Item', 'category': self.category.id, 'tags': [self.tag.id], 'in_stock': True, 'available_stock': 15}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_category(self):
        self.client.login(username='testuser', password='testpassword')
        url = reverse('category-list')
        data = {'name': 'NewCategory'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_items(self):
        url = reverse('item-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assumes only 1 item in setUp

    def test_get_categories(self):
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assumes only 1 category in setUp

    def test_get_tags(self):
        url = reverse('tag-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assumes only 1 tag in setUp
