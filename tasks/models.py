from django.db import models

class Observacion(models.Model):
    texto = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    mantenimiento = models.ForeignKey('Mantenimiento', on_delete=models.CASCADE, null=True, blank=True, related_name='observaciones')
    actividad = models.ForeignKey('Actividad', on_delete=models.CASCADE, null=True, blank=True, related_name='observaciones')

class Actividad(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField(null=True, blank=True)  # Fecha y hora de inicio
    fecha_fin = models.DateTimeField(null=True, blank=True)  # Fecha y hora de fin

    def __str__(self):
        return self.nombre

class Mantenimiento(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField(null=True, blank=True)  # Fecha y hora de inicio
    fecha_fin = models.DateTimeField(null=True, blank=True)  # Fecha y hora de fin
    estado = models.CharField(max_length=50, default="pendiente")  # Estado del mantenimiento
    responsable = models.CharField(max_length=255)
    actividades = models.ManyToManyField(Actividad)  # Relación con actividades
    es_version_original = models.BooleanField(default=False)  # Indica si es la versión original

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20, unique=True)
    rol = models.CharField(
        max_length=20,
        choices=[
            ('gerente', 'Gerente'),
            ('operador', 'Operador'),
            ('supervisor', 'Supervisor')
        ]
    )

    def __str__(self):
        return f"{self.nombre} ({self.rol}) - Cédula: {self.cedula}"