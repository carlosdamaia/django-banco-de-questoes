# Generated by Django 5.0.2 on 2024-03-21 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_questoes_conta_pontuacao'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questoes',
            name='acertou',
            field=models.BooleanField(default=0, null=True),
        ),
    ]