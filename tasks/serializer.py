from rest_framework import serializers
from .models import Mantenimiento, Actividad, Usuario, Observacion

class ObservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Observacion
        fields = ['id', 'texto', 'fecha_creacion']

class ActividadSerializer(serializers.ModelSerializer):
    observaciones = ObservacionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Actividad
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'observaciones']

    def validate(self, data):
        if data.get('fecha_inicio') and data.get('fecha_fin') and data['fecha_inicio'] > data['fecha_fin']:
            raise serializers.ValidationError("La fecha de inicio no puede ser posterior a la fecha de fin.")
        return data

class MantenimientoSerializer(serializers.ModelSerializer):
    actividades = ActividadSerializer(many=True, read_only=True)
    
    class Meta:
        model = Mantenimiento
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 
                 'estado', 'responsable', 'actividades']

    def create(self, validated_data):
        # Creamos el mantenimiento primero
        mantenimiento = Mantenimiento.objects.create(**validated_data)
        
        # Obtenemos las actividades de initial_data
        actividades_data = self.initial_data.get('actividades', [])
        
        # Procesamos cada actividad
        for actividad_item in actividades_data:
            if isinstance(actividad_item, dict):
                if 'id' in actividad_item:
                    try:
                        actividad = Actividad.objects.get(id=actividad_item['id'])
                        mantenimiento.actividades.add(actividad)
                    except Actividad.DoesNotExist:
                        continue  # Skip if activity doesn't exist
                else:
                    # Create new activity without mantenimiento reference first
                    actividad_data = {
                        'nombre': actividad_item.get('nombre'),
                        'descripcion': actividad_item.get('descripcion'),
                        'fecha_inicio': actividad_item.get('fecha_inicio'),
                        'fecha_fin': actividad_item.get('fecha_fin')
                    }
                    actividad = Actividad.objects.create(**actividad_data)
                    mantenimiento.actividades.add(actividad)
        
        return mantenimiento

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'cedula', 'rol']