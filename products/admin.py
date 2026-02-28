from django.contrib import admin
from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name_ru", "name_lv", "created_at")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name_ru", "price", "is_available", "created_at")
    list_filter = ("is_available", "category")
    search_fields = ("name_ru", "name_lv")