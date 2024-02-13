from django.contrib import admin

# Register your models here.
from .models import Item, Category, Tag

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('SKU', 'name', 'category', 'in_stock', 'available_stock')
    list_filter = ('in_stock', 'category',)
    search_fields = ('name', 'SKU',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

