from rest_framework import serializers
from .models import Mantenimiento, Actividad, Usuario, Observacion

class ObservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observacion
        fields = ['id', 'texto', 'fecha_creacion']

class ActividadSerializer(serializers.ModelSerializer):
    observaciones = ObservacionSerializer(many=True, read_only=True)  # Relación con observaciones

    class Meta:
        model = Actividad
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'observaciones']

    def validate(self, data):
        # Validar que la fecha de inicio no sea posterior a la fecha de fin
        if data['fecha_inicio'] and data['fecha_fin'] and data['fecha_inicio'] > data['fecha_fin']:
            raise serializers.ValidationError("La fecha de inicio no puede ser posterior a la fecha de fin.")
        return data

class MantenimientoSerializer(serializers.ModelSerializer):
    actividades = ActividadSerializer(many=True, read_only=True)  # Relación con actividades
    observaciones = ObservacionSerializer(many=True, read_only=True)  # Relación con observaciones

    class Meta:
        model = Mantenimiento
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'estado', 'responsable', 'actividades', 'observaciones']

    def validate(self, data):
        # Validar que la fecha de inicio no sea posterior a la fecha de fin
        if data['fecha_inicio'] and data['fecha_fin'] and data['fecha_inicio'] > data['fecha_fin']:
            raise serializers.ValidationError("La fecha de inicio no puede ser posterior a la fecha de fin.")
        return data

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'cedula', 'rol']