from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from tasks import views
from .views import RegistrarInicioFinMantenimientoView, RegistrarInicioFinActividadView

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
    path('api/v1/mantenimientos/<int:mantenimiento_id>/inicio-fin/', RegistrarInicioFinMantenimientoView.as_view(), name='registrar_inicio_fin_mantenimiento'),
    path('api/v1/actividades/<int:actividad_id>/inicio-fin/', RegistrarInicioFinActividadView.as_view(), name='registrar_inicio_fin_actividad'),
]