from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)

class Item(models.Model):
    SKU = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    tags = models.ManyToManyField('Tag', blank=True)
    in_stock = models.BooleanField(default=True)
    available_stock = models.IntegerField()

class Tag(models.Model):
    name = models.CharField(max_length=100)
