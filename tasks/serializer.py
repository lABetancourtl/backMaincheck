from rest_framework import serializers
from .models import Mantenimiento, Actividad, Usuario

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = '__all__'

class MantenimientoSerializer(serializers.ModelSerializer):
    actividades = serializers.PrimaryKeyRelatedField(
        many=True,  # Indica que es una relación ManyToMany
        queryset=Actividad.objects.all()  # Valida que los IDs existan en la tabla Actividad
    )

    class Meta:
        model = Mantenimiento
        fields = '__all__'

    def validate(self, data):
        # Validar que la fecha de inicio no sea posterior a la fecha de fin
        if data['fecha_inicio'] > data['fecha_fin']:
            raise serializers.ValidationError("La fecha de inicio no puede ser posterior a la fecha de fin.")

        return data

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'