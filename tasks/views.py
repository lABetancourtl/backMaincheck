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