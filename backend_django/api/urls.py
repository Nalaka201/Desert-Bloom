from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import SupplierViewSet, FarmerViewSet, ProductViewSet, OrderViewSet

router = SimpleRouter(trailing_slash=False)
router.register(r'suppliers', SupplierViewSet)
router.register(r'farmers', FarmerViewSet)
router.register(r'orders', OrderViewSet)
# Products are a bit special because of the /api/products/:supplierId route in Node.js
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Custom route to match Node.js /api/products/:supplierId
    path('products/<str:supplier_id>', ProductViewSet.as_view({'get': 'list'}), name='supplier-products'),
]
