from django.db import models
from django.db.models import Count
import random
import string

# Create your models here.
class Questoes(models.Model):
    materia = models.CharField(max_length=15, null=False)
    frente = models.CharField(max_length=1, null=False)
    numero = models.IntegerField(default=0, null=False)
    criador = models.CharField(max_length=15, null=True)
    enunciado = models.TextField(null=False)
    imagem = models.CharField(max_length=200, default='N/A', null=True)
    alt_a = models.CharField(default='1',max_length=2,  null=False)
    texto_a = models.TextField(default='Texto da alternativa A', null=False)
    alt_b = models.CharField(default='2',max_length=2,  null=False)
    texto_b = models.TextField(default='Texto da alternativa B', null=False)
    alt_c = models.CharField(default='3',max_length=2,  null=False)
    texto_c = models.TextField(default='Texto da alternativa C', null=False)
    alt_d = models.CharField(default='4',max_length=2,  null=False)
    texto_d = models.TextField(default='Texto da alternativa D', null=False)
    alt_e = models.CharField(default='5',max_length=2,  null=True)
    texto_e = models.TextField(null=True)
    alt_f = models.CharField(default='6', max_length=2, null=True)
    texto_f = models.TextField(null=True)
    alt_g = models.CharField(default='7', max_length=2, null=True)
    texto_g = models.TextField(null=True)
    alt_correta = models.JSONField(default=list, null=False)
    conta_pontuacao = models.BooleanField(null=True, blank=True)
    data_visualizacao = models.DateTimeField(auto_now_add=True)
    concluida = models.BooleanField(default=0, null=False)
    data_conclusao = models.DateTimeField(auto_now_add=True)
    alternativa_usuario = models.CharField(max_length=20, null=True)
    acertou = models.BooleanField(default=0, null=True)
    pontuacao = models.IntegerField(default=0, null=True)

    def __str__(self):
        return f"{self.numero} - {self.materia} - {self.frente}"