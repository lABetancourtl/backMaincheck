from django.db import models

class Actividad(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField(null=True, blank=True)  # Fecha y hora de inicio
    fecha_fin = models.DateTimeField(null=True, blank=True)  # Fecha y hora de fin
    observaciones = models.TextField(null=True, blank=True)  # Observaciones
    imagenes = models.ImageField(upload_to='actividades_imagenes/', null=True, blank=True)  # Imagen opcional
    audios = models.FileField(upload_to='actividades_audios/', null=True, blank=True)  # Audio opcional

    def __str__(self):
        return self.nombre

class Mantenimiento(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField(null=True, blank=True)  # Fecha y hora de inicio
    fecha_fin = models.DateTimeField(null=True, blank=True)  # Fecha y hora de fin
    estado = models.CharField(max_length=50, default="pendiente")  # Estado del mantenimiento
    responsable = models.CharField(max_length=255)
    actividades = models.ManyToManyField(Actividad)
    es_version_original = models.BooleanField(default=False)  # Indica si es la versión original
    observaciones = models.TextField(null=True, blank=True)  # Observaciones generales
    imagenes = models.ImageField(upload_to='mantenimientos_imagenes/', null=True, blank=True)  # Imagen opcional
    audios = models.FileField(upload_to='mantenimientos_audios/', null=True, blank=True)  # Audio opcional

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