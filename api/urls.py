from django.urls import path
from .views import QuestoesView, QuestoesListView, ApresentaQuestaoView, ExcluirQuestaoView, updateLowerCaseView, MostraRespostaView, ConcluirQuestaoView, EstatisticasQuestoesView, SetAcertouView

urlpatterns = [
    path('registrar', QuestoesView.as_view()),
    path('listar', QuestoesListView.as_view()),
    path('update', updateLowerCaseView.as_view()),
    path('mostrar-resposta', MostraRespostaView.as_view()),
    path('listar/<str:materia>', ApresentaQuestaoView.as_view(), name='apresenta_questao'),
    path('apresenta-questao', ApresentaQuestaoView.as_view()),
    path('excluir-questao', ExcluirQuestaoView.as_view()),
    path('concluir-questao/<int:questao_id>', ConcluirQuestaoView.as_view()),
    path('estatisticas-frente/<str:materia>', EstatisticasQuestoesView.as_view()),
    path('registrar-acerto/<int:questao_id>', SetAcertouView.as_view())
]
