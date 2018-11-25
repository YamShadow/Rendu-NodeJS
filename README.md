# Rendu NodeJs

## Installation

Pour installer le projet

- configurer un .env
- \$ npm install
- \$ npm start

## Fonctionnalités

- Routes de connexion
- Routes CRD pour le chat
- Vérification des champs

## Routes de l'api en GET

### api/auth/

**DESCRIPTION** Liste des routes disponibles pour Auth

    PARAMETRES D'ENTREE

    PARAMETRE DE SORTE
    JSON {
        'Route': {
            '/': 'Liste des routes disponibles',
            '/register': 'Inscription de l'utilisateur',
            '/login': 'Connexion de l'utilisateur',
        }
    }

### api/chat/

**DESCRIPTION** Liste des routes disponibles pour Chat

    PARAMETRES D'ENTREE

    PARAMETRE DE SORTE
    JSON {
        'Route': {
            '/': 'Liste des routes disponibles',
            '/message': 'CRD des messages',
        }
    }

### api/chat/message

**DESCRIPTION** Liste de l'ensembles des messages disponibles

    PARAMETRES D'ENTREE

    PARAMETRE DE SORTE
    JSON {
        "message": "",
        "err": null,
        "data": {
            "messages": [
                {

                },
                {

                },
                {

                },
                {

                }
            ]
        }
    }

## Routes de l'api en POST

### /api/auth/register

**DESCRIPTION** Inscription de l'utilisateur

    PARAMETRES D'ENTREE
    @first_name         : String
    @last_name          : String
    @email              : String
    @password           : String

    PARAMETRE DE SORTE
    JSON {
        "message": "",
        "error": {
        },
        "data": null
    }

### /login

**DESCRIPTION** Connexion d'un utilisateur

    PARAMETRES D'ENTREE
    @email              : String
    @password           : String

    PARAMETRE DE SORTE
    JSON {
        "message": "",
        "err": null,
        "data": {
            "user": {
            },
            "token": ""
        }
    }

### api/chat/message

**DESCRIPTION** Création d'un message

    PARAMETRES D'ENTREE
    @message            : String
    @token              : String

    PARAMETRE DE SORTE
    JSON {
        "message": "",
        "err": null,
        "data": {
        }
    }

## Routes de l'api en DELETE

### /api/auth/message

**DESCRIPTION** Suppressiond d'un message (seulement si on est celui qui l'a soumit)

    PARAMETRES D'ENTREE
    @id                 : String
    @token              : String

    PARAMETRE DE SORTE
    JSON {
        "message": "",
        "err": null,
        "data": {
            "n": 0,
            "ok": 1
        }
    }
