from rest_framework import serializers
from .models import Questoes

class QuestoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questoes
        fields = ('id', 'materia', 'frente', 'numero', 'criador', 
        'enunciado', 'alt_a', 'texto_a', 'alt_b', 'texto_b', 'alt_c',
        'texto_c', 'alt_d', 'texto_d', 'alt_e', 'texto_e', 'alt_f',
        'texto_f', 'alt_g', 'texto_g', 'conta_pontuacao', 'alt_correta', 'data_visualizacao',
        'concluida', 'data_conclusao', 'alternativa_usuario', 'acertou', 'pontuacao', 'acertou'
        )

class ApresentaQuestaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questoes
        fields = ('id', 'materia', 'frente', 'criador', 'numero', 'enunciado',
        'alt_a', 'texto_a', 'alt_b', 'texto_b', 'alt_c',
        'texto_c', 'alt_d', 'texto_d', 'alt_e', 'texto_e', 'alt_f',
        'texto_f', 'alt_g', 'texto_g', 'alt_correta', 'concluida', 'conta_pontuacao', 'acertou')

class MostraRespostaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questoes
        fields = ['alt_correta']
        
