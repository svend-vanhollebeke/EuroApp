# Generated by Django 4.1.6 on 2023-02-22 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('euro_game', '0002_eleve_groupe'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prof',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mdp', models.CharField(max_length=16)),
            ],
        ),
    ]
