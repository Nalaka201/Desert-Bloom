from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Supplier, Farmer, Product, Order
from .serializers import SupplierSerializer, FarmerSerializer, ProductSerializer, OrderSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class FarmerViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Farmer registered'}, status=201)
        return Response(serializer.errors, status=400)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned products to a given supplier,
        by filtering against a `supplierId` query parameter in the URL.
        """
        queryset = Product.objects.all()
        supplier_id = self.kwargs.get('supplier_id')
        if supplier_id:
            queryset = queryset.filter(supplier_id=supplier_id)
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
