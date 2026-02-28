from django.db import models


class Category(models.Model):
    name_ru = models.CharField(max_length=255)
    name_lv = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name_ru


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )
    name_ru = models.CharField(max_length=255)
    name_lv = models.CharField(max_length=255)
    description_ru = models.TextField(blank=True)
    description_lv = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name_ru