from django.core.management. base import BaseCommand
from django.utils import timezone
from api.models import Questoes

class Command(BaseCommand):
    help = 'Atualiza questões concluídas com base nos acertos e erros'

    def handle(self, *args, **options):
        data_limite_acerto = timezone.now() - timezone.timedelta(days=45)
        data_limite_erro = timezone.now() - timezone.timedelta(days=30)

        questoes_acertadas = Questoes.objects.filter(concluida=True, acertou=True, data_conclusao__lte=data_limite_acerto)
        questoes_erradas = Questoes.objects.filter(concluida=True, acertou=False, data_conclusao__lte=data_limite_erro)

        for questao_acertada in questoes_acertadas:
            questao_acertada.concluida = False
            questao_acertada.acertou = False
            questao_acertada.save()

        for questao_errada in questoes_erradas:
            questao_errada.concluida = False
            questao_errada.save()

        self.stdout.write(self.style.SUCCESS('Questões atualizadas'))