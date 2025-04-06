from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from tasks import views

# Crea una instancia de DefaultRouter
router = DefaultRouter()

# Registra las rutas
router.register(r'mantenimiento', views.MantenimientoViewSet, basename='mantenimiento')
router.register(r'actividad', views.ActividadViewSet, basename='actividad')
router.register(r'usuario', views.UsuarioViewSet, basename='usuario')

# Define urlpatterns
urlpatterns = [
    path('api/v1/', include(router.urls)),  # Incluye las rutas del DefaultRouter
    path('api/v1/mantenimientos/cargar/', views.CargarMantenimientosView.as_view(), name='cargar_mantenimientos'),  # Nueva ruta para cargar mantenimientos
]