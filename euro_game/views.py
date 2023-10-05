import json

from django.http import HttpResponse
from django.shortcuts import render, redirect

from euro_game.models import Eleve, Prof

ALPHABET = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11,
            'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21,
            'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26}

NOMS = {'Abeille': 1, 'Babouin': 2, 'Crocodile': 3, 'Dauphin': 4, 'Elephant': 5, 'Flamant rose': 6, 'Girafe': 7,
        'Hérisson': 8, 'Iguane': 9, 'Jaguar': 10, 'Koala': 11, 'Lama': 12, 'Manchot': 13, 'Nautile': 14, 'Ours': 15,
        'Pingouin': 16, 'Quoll': 17, 'Rhinocéros': 18, 'Suricate': 19, 'Tamanoir': 20, 'Urial': 21, 'Vautour': 22,
        'Wallaby': 23, 'Xérus': 24, 'Yack': 25, 'Zèbre': 26}

ADJECTIFS = {'Agréable': 1, 'Brillant.e': 2, 'Charmant.e': 3, 'Dynamique': 4, 'Extraordinaire': 5, 'Fabuleux.se': 6,
             'Généreux.se': 7, 'Honnête': 8, 'Incroyable': 9, 'Jovial.e': 10, 'Kinésique': 11, 'Loyal.e': 12,
             'Motivé.e': 13, 'Novateur.rice': 14, 'Optimiste': 15, 'Perspicace': 16, 'Qualifié.e': 17,
             'Remarquable': 18, 'Sage': 19, 'Talentueux.se': 20, 'Unique': 21, 'Volontaire': 22, 'Winner': 23,
             'Xtra': 24, 'Yeah': 25, 'Zen': 26}

GROUPES = {'1': 1, '2': 2, '3': 3}


# Create your views here.
def entrance(request):
    if request.method == "POST":
        init_nom = request.POST['nom']
        init_prenom = request.POST['prenom']
        init_groupe = request.POST['groupe']
        if init_nom == "" or init_prenom == "" or init_groupe == "":
            message = "Tu n'as pas tout rempli !"
            context = {'alphabet': ALPHABET, 'message': message, 'groupes': GROUPES}
            return render(request, 'entrance.html', context)
        create_eleve(request, init_prenom, init_nom, init_groupe)
        return redirect(market)
    else:
        try:
            del request.session['eleve']
        except KeyError:
            pass
        context = {'alphabet': ALPHABET, 'groupes': GROUPES}
        return render(request, 'entrance.html', context)


def market(request):
    e = Eleve.objects.get(id=request.session.get('eleve'))
    return render(request, 'market.html', {"eleve": e})


def recap(request, grp=0):
    if request.method == "POST":
        mdp = Prof.objects.first().mdp
        password = request.POST.get('password')
        if password == mdp:
            return redirect(recap)
        else:
            message = "Mauvais mot de passe !"
            context = {'alphabet': ALPHABET, 'message': message, 'groupes': GROUPES}
            return render(request, 'entrance.html', context)
    else:
        if grp == 0:
            all_eleves = Eleve.objects.filter(groupe__exact=1).order_by('prenom', 'nom')
            context = {"eleves": all_eleves, "grp": 1}
        else:
            all_eleves = Eleve.objects.filter(groupe__exact=grp).order_by('prenom', 'nom')
            context = {"eleves": all_eleves, "grp": grp}
        return render(request, 'recap_eleves.html', context)


def stand_fruits(request, id_elv):
    eleve = Eleve.objects.get(id=id_elv)
    eleve.nb_points_fruit = 0
    eleve.save()
    return render(request, 'stand_fruits.html')


def stand_fleurs(request, id_elv):
    eleve = Eleve.objects.get(id=id_elv)
    eleve.nb_points_fleur = 0
    eleve.save()
    return render(request, 'stand_fleurs.html')


def stand_legumes(request, id_elv):
    eleve = Eleve.objects.get(id=id_elv)
    eleve.nb_points_legume = 0
    eleve.save()
    return render(request, 'stand_legumes.html')


def stand_final(request):
    return render(request, 'final.html')


def create_eleve(request, init_prenom, init_nom, init_groupe):
    eleve = Eleve()
    pos_prenom = ALPHABET.get(init_prenom)
    pos_nom = ALPHABET.get(init_nom)

    sur_prenom = list(NOMS.keys())[list(NOMS.values()).index(pos_prenom)]
    sur_nom = list(ADJECTIFS.keys())[list(ADJECTIFS.values()).index(pos_nom)]

    if Eleve.objects.filter(nom__exact=sur_nom, prenom__exact=sur_prenom, groupe__exact=init_groupe).count() > 0:
        if Eleve.objects.filter(nom__exact=sur_nom + " (2)", prenom__exact=sur_prenom,
                                groupe__exact=init_groupe).count() > 0:
            sur_nom = sur_nom + " (3)"
        else:
            sur_nom = sur_nom + " (2)"

    eleve.prenom = sur_prenom
    eleve.nom = sur_nom
    eleve.groupe = init_groupe
    eleve.nb_points_fleur = 0
    eleve.nb_points_fruit = 0
    eleve.nb_points_legume = 0
    eleve.save()
    request.session['eleve'] = eleve.id


def delete_eleve(request, elv):
    e = Eleve.objects.get(id=elv)
    grp = e.groupe
    e.delete()
    all_eleves = Eleve.objects.filter(groupe__exact=grp).order_by('prenom', 'nom')
    context = {"eleves": all_eleves, "grp": grp}
    return render(request, 'recap_eleves.html', context)


def input_edit(request, mdp):
    p = Prof.objects.first()
    p.mdp = mdp
    p.save()
    return redirect(recap)


def connect_eleve(request, elv):
    request.session['eleve'] = elv
    return redirect(market)


def is_ajax(request):
    return request.headers.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


def marque_point(request):
    if is_ajax:
        if request.method == "POST":
            data = json.load(request)
            jeu = data.get('jeu')
            eleve = Eleve.objects.get(id=request.session.get('eleve'))
            if jeu == "fleur":
                eleve.nb_points_fleur += 1
            elif jeu == "fruit":
                eleve.nb_points_fruit += 1
            elif jeu == "legume":
                eleve.nb_points_legume += 1
            eleve.save()
    return HttpResponse()
