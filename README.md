# MyYoutube

Clone YouTube développé avec Angular 21 dans le cadre d'un TP de formation.

## Lancer le projet

```bash
npm install
ng serve
```

Ouvrir ensuite `http://localhost:4200` dans le navigateur.

## Clé API YouTube

Le projet utilise l'API YouTube Data v3.

Créer le fichier `src/environments/environment.development.ts` (non versionné) :

```ts
export const environment = {
  youtubeApiKey: 'TA_CLE_ICI'
};
```

La clé s'obtient sur [Google Cloud Console](https://console.cloud.google.com) en activant l'API **YouTube Data API v3**.

## Fonctionnalités

- Inscription / connexion avec persistance en localStorage
- Recherche de vidéos via l'API YouTube
- Ajout / suppression de vidéos dans une playlist personnelle
- Lecture vidéo via iframe YouTube
- Historique des recherches
- Session persistante après rafraîchissement de la page

## Architecture

### Composants

| Composant | Rôle |
|---|---|
| `NavBar` | Barre de navigation + menu profil |
| `SideBar` | Playlist de l'utilisateur connecté |
| `Auth` | Formulaires connexion / inscription |
| `Search` | Recherche et affichage des résultats |
| `Video` | Lecteur vidéo |
| `Home` | Page d'accueil |

### Services

| Service | Rôle |
|---|---|
| `AuthService` | Gestion de la session utilisateur |
| `PlaylistService` | CRUD playlist en localStorage |
| `VideoService` | Appels API YouTube + état recherche |

### Concepts Angular 21 utilisés

- Signals (`signal`, `computed`, `effect`)
- Standalone components
- Lazy loading des routes
- `CanActivateFn` AuthGuard
- ReactiveFormsModule avec validations
- Syntaxe `@if` / `@for`


