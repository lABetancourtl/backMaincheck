from django.db import models

# Create your models here.
class Mantenimiento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha_inicio = models.DateField(blank=True)
    fecha_fin = models.DateField(blank=True)
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('en_proceso', 'En Proceso'), ('finalizado', 'Finalizado')])
    responsable = models.CharField(max_length=100)
    actividades = models.ManyToManyField('Actividad', related_name='mantenimientos')

    def __str__(self):
        return self.nombre

class Actividad(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha_inicio = models.DateField(blank=True)
    fecha_fin = models.DateField(blank=True)
    observaciones = models.TextField(blank=True)
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('en_proceso', 'En Proceso'), ('finalizado', 'Finalizado')])


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