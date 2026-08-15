from django.db import models

class Supplier(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'suppliers'

    def __str__(self):
        return self.name

class Farmer(models.Model):
    name = models.CharField(max_length=255)
    nic = models.CharField(max_length=20, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'farmers'

    def __str__(self):
        return self.name

class Product(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, db_column='supplier_id', related_name='products')
    name = models.CharField(max_length=255, null=True, blank=True)
    code = models.CharField(max_length=50, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'products'

    def __str__(self):
        return self.name

class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, db_column='farmer_id', null=True, blank=True)
    supplier_name = models.CharField(max_length=255, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    remaining_balance = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    order_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'orders'

    def __str__(self):
        return f"Order {self.order_id}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        db_table = 'contact_messages'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%Y-%m-%d')}"
