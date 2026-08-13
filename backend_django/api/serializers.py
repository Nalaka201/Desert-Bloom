from rest_framework import serializers
from .models import Supplier, Farmer, Product, Order

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    # To match the Node.js API structure where we included seeds in the supplier response
    seeds = ProductSerializer(many=True, read_only=True, source='products')

    class Meta:
        model = Supplier
        fields = ['id', 'name', 'location', 'rating', 'description', 'seeds']

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
