from django.contrib import admin
from .models import Questoes
from django import forms

ESCOLHA_DE_MATERIAS = {
    "biologia": "Biologia",
    "fisica": "Física",
    "geografia": "Geografia",
    "historia": "História",
    "matematica": "Matemática",
    "portugues": "Português",
    "quimica": "Química"
}

ESCOLHA_DE_FRENTE = {
    "a": "A",
    "b": "B",
    "c": "C",
    "d": "D",
    "e": "E",
}

SELECIONA_RESPOSTAS_CORRETAS = {
    1: "01/A",
    2: "02/B",
    3: "04/C",
    4: "08/D",
    5: "16/E",
    6: "32/F",
    7: "64/G",
}

class QuestoesForm(forms.ModelForm):
    materia = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=ESCOLHA_DE_MATERIAS,
    )
    frente = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=ESCOLHA_DE_FRENTE,
    )
    numero = forms.IntegerField(
        widget=forms.NumberInput,
        help_text="Digite o número da questão"
    )
    criador = forms.CharField(
        help_text="Ex: UFSC"
    )
    texto_a = forms.CharField(
        widget=forms.Textarea,
        label="Texto da Alternativa 01/A"
    )
    texto_b = forms.CharField(
        widget=forms.Textarea,
        label="Texto da Alternativa 02/B"
    )
    texto_c = forms.CharField(
        widget=forms.Textarea,
        label="Texto da Alternativa 04/C"
    )
    texto_d = forms.CharField(
        widget=forms.Textarea,
        label="Texto da Alternativa 08/D"
    )
    texto_e = forms.CharField(
        required= False,
        widget=forms.Textarea,
        label="Texto da Alternativa 16/E"
    )
    texto_f = forms.CharField(
        required= False,
        widget=forms.Textarea,
        label="Texto da Alternativa 32/F"
    )
    texto_g = forms.CharField(
        required= False,
        widget=forms.Textarea,
        label="Texto da Alternativa 64/G"
    )
    alt_correta = forms.MultipleChoiceField(
        widget=forms.CheckboxSelectMultiple,
        choices=SELECIONA_RESPOSTAS_CORRETAS
    )
    conta_pontuacao = forms.BooleanField(
        required=False
    )
    concluida = forms.BooleanField(
        required=False
    )

    class Meta:
        model = Questoes
        exclude = ["alt_a", "alt_b", "alt_c", 
        "alt_d", "alt_e", "alt_f", "alt_g",
        "alternativa_usuario", "acertou", "pontuacao"
        ]

def UpdateNaoConcluido(modeladmin, request, queryset):
    queryset.update(concluida=False)

UpdateNaoConcluido.short_description = "Marcar como não concluída(s)"

class QuestoesFormAdmin(admin.ModelAdmin):
    form = QuestoesForm
    actions = [UpdateNaoConcluido]

admin.site.register(Questoes, QuestoesFormAdmin)


