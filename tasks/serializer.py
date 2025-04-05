from rest_framework import serializers
from .models import Mantenimiento, Actividad, Usuario

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'

class MantenimientoSerializer(serializers.ModelSerializer):
    # Incluye el campo actividades como una lista de IDs
    actividades = serializers.PrimaryKeyRelatedField(
        many=True,  # Indica que es una relación ManyToMany
        queryset=Actividad.objects.all()  # Define el queryset para validar los IDs
    )

    class Meta:
        model = Mantenimiento
        fields = '__all__'  # Incluye todos los campos del modelo

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'