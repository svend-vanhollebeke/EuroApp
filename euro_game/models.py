from django.db import models


# Create your models here.
class Eleve(models.Model):
    prenom = models.CharField(max_length=32)
    nom = models.CharField(max_length=32)
    groupe = models.DecimalField(max_digits=1, decimal_places=0)
    nb_points_legume = models.DecimalField(max_digits=3, decimal_places=0)
    nb_points_fruit = models.DecimalField(max_digits=3, decimal_places=0)
    nb_points_fleur = models.DecimalField(max_digits=3, decimal_places=0)


class Prof(models.Model):
    mdp = models.CharField(max_length=16)
