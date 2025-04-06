from rest_framework import viewsets
from .models import Mantenimiento, Actividad, Usuario
from .serializer import MantenimientoSerializer, ActividadSerializer, UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



class MantenimientoViewSet(viewsets.ModelViewSet):
    queryset = Mantenimiento.objects.all()
    serializer_class = MantenimientoSerializer

class CargarMantenimientosView(APIView):
    def post(self, request):
        try:
            if not isinstance(request.data, list):
                return Response(
                    {"error": "El archivo debe contener una lista de mantenimientos."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            errores = []
            for mantenimiento_data in request.data:
                serializer = MantenimientoSerializer(data=mantenimiento_data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    errores.append(serializer.errors)

            if errores:
                return Response({"errores": errores}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "Mantenimientos cargados exitosamente."}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": "Ocurrió un error inesperado.", "detalle": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
class ActividadViewSet(viewsets.ModelViewSet):
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class RegistrarInicioFinMantenimientoView(APIView):
    def post(self, request, mantenimiento_id):
        try:
            mantenimiento = Mantenimiento.objects.get(id=mantenimiento_id, es_version_original=False)
            data = request.data
            mantenimiento.fecha_inicio = data.get('fecha_inicio', mantenimiento.fecha_inicio)
            mantenimiento.fecha_fin = data.get('fecha_fin', mantenimiento.fecha_fin)
            mantenimiento.observaciones = data.get('observaciones', mantenimiento.observaciones)
            mantenimiento.save()
            return Response({"message": "Mantenimiento actualizado correctamente."}, status=status.HTTP_200_OK)
        except Mantenimiento.DoesNotExist:
            return Response({"error": "Mantenimiento no encontrado."}, status=status.HTTP_404_NOT_FOUND)

class RegistrarInicioFinActividadView(APIView):
    def post(self, request, actividad_id):
        try:
            actividad = Actividad.objects.get(id=actividad_id)
            data = request.data
            actividad.fecha_inicio = data.get('fecha_inicio', actividad.fecha_inicio)
            actividad.fecha_fin = data.get('fecha_fin', actividad.fecha_fin)
            actividad.observaciones = data.get('observaciones', actividad.observaciones)
            actividad.save()
            return Response({"message": "Actividad actualizada correctamente."}, status=status.HTTP_200_OK)
        except Actividad.DoesNotExist:
            return Response({"error": "Actividad no encontrada."}, status=status.HTTP_404_NOT_FOUND)