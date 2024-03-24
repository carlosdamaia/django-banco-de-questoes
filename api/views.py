from django.shortcuts import render
from rest_framework import generics, status
from .models import Questoes
from .serializers import QuestoesSerializer, ApresentaQuestaoSerializer, MostraRespostaSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from rest_framework.decorators import permission_classes
import random
from django.utils import timezone

# Create your views here.

id_questao_anterior = None

#Exclui TODAS as questões
class SetAcertouView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, questao_id, format=None):
        try:
            questao = Questoes.objects.get(pk=questao_id)
            questao.acertou = True
            questao.save()
            return Response({'message': 'Questão ACERTADA com sucesso'}, status=status.HTTP_200_OK)
        except Questao.DoesNotExist:
            return Response({'error': 'Questão não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExcluirQuestaoView(APIView):
    def delete(self, request, format=None):
        try:
            # Obtenha o ID da questão a ser excluída do parâmetro da solicitação
            questao_id = request.data.get('id', 12)
            if questao_id is None:
                return Response({'error': 'ID da questão não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Busque a questão com o ID fornecido e exclua-a
            questao = Questoes.objects.get(pk=questao_id)
            questao.delete()
            
            return Response({'message': 'Questão excluída com sucesso'}, status=status.HTTP_204_NO_CONTENT)
        except Questoes.DoesNotExist:
            return Response({'error': 'Questão não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#View para registrar as questões
class QuestoesView(generics.CreateAPIView):
    queryset = Questoes.objects.all()
    serializer_class = QuestoesSerializer

#View para listar todas as questões 
class QuestoesListView(generics.ListAPIView):
    queryset = Questoes.objects.all()
    serializer_class = QuestoesSerializer

#View para transformar campos ESPECÍFICOS em lower case
class updateLowerCaseView(APIView):
    def post(self, request, format=None):
        try:
            questoes = Questoes.objects.all()

            for questao in questoes:
                questao.alt_correta = 1
                questao.save()

            return Response({"message": "Campo 'frente' atualizado com sucesso"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ConcluirQuestaoView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, questao_id, format=None):
        try:
            questao = Questoes.objects.get(pk=questao_id)
            questao.concluida = True
            questao.data_conclusao = timezone.now()
            questao.save()
            return Response({'message': 'Questão concluída com sucesso'}, status=status.HTTP_200_OK)
        except questao.DoesNotExist:
            return Response({'error': 'Questão não encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ApresentaQuestaoView(APIView):
    serializer_class = ApresentaQuestaoSerializer
    id_questao_anterior = None

    @classmethod
    def set_id_questao_anterior(cls, id_questao):
        cls.id_questao_anterior = id_questao

    def get(self, request, materia, frente, format=None):
        try:
            questoes = Questoes.objects.filter(materia=materia, frente=frente, concluida=0)
            
            if questoes.count() > 1:
                questoes = questoes.exclude(id=self.id_questao_anterior)
            
            if not questoes.exists():
                return Response({'error': 'Não há questões disponíveis que não tenham sido apresentadas anteriormente'}, status=status.HTTP_404_NOT_FOUND)

            questao_aleatoria = random.choice(questoes)
            self.set_id_questao_anterior(questao_aleatoria.id)

            serializer = self.serializer_class(questao_aleatoria)

            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class MostraRespostaView(APIView):
    serializer_class = MostraRespostaSerializer

    def get(self, request, format=None):
        try:
            alt_correta = request.GET.get('alt_correta')
            alternativas_corretas = [alt.strip() for alt in alt_correta.split(',')] if alt_correta else []

            questoes = Questoes.objects.all()

            for alt in alternativas_corretas:
                questoes = questoes.filter(alt_correta__contains=alt)

            if not questoes.exists():
                return Response({'error': 'Não há questões disponíveis para as alternativas corretas especificadas'}, status=status.HTTP_404_NOT_FOUND)

            serializer = self.serializer_class(questoes, many=True)
            
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EstatisticasQuestoesView(APIView):
    def get(self, request, materia, frente, format=None):
        try:
            questoes_total = Questoes.objects.filter(materia=materia, frente=frente).count()
            questoues_concluidas = Questoes.objects.filter(materia=materia, frente=frente, concluida=True).count()

            data = {
                'questoes_total': questoes_total,
                'questoes_concluidas': questoues_concluidas
            }
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)