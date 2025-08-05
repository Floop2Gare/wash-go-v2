# Wash&GO - Site Web

Application React pour le service de nettoyage Wash&GO.

## 🚀 Déploiement sur Vercel

### Configuration requise

Le projet est configuré pour fonctionner correctement sur Vercel avec le routage SPA :

- **Fichier `vercel.json`** : Configure les règles de réécriture pour le routage React Router
- **Configuration Vite** : Optimisée pour la production avec chunk splitting
- **Routes supportées** :
  - `/` - Page d'accueil
  - `/voitures` - Service de nettoyage automobile
  - `/canapes` ou `/canapés` - Service de nettoyage de canapés
  - `/mentions-legales` - Mentions légales
  - `/politique-cookies` - Politique de cookies
  - `/rgpd` - Page RGPD

### Instructions de déploiement

1. **Connectez votre repository à Vercel**
2. **Vercel détectera automatiquement la configuration** grâce au fichier `vercel.json`
3. **Les routes fonctionneront directement** (pas d'erreur 404)

### Test local

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Test du build local
npm run preview
```

## 🔧 Configuration technique

### Routage SPA

Le fichier `vercel.json` contient les règles de réécriture nécessaires :

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Cette configuration redirige toutes les routes vers `index.html`, permettant à React Router de gérer le routage côté client.

### Optimisations

- **Chunk splitting** : Séparation des vendors (React, React Router)
- **Cache headers** : Optimisation du cache pour les assets statiques
- **Build optimisé** : Configuration Vite pour la production

## 📁 Structure du projet

```
src/
├── components/
│   ├── Accueil/          # Composants de la page d'accueil
│   ├── Navbar/           # Navigation
│   ├── voiture/          # Page voitures
│   └── canape/           # Page canapés
├── pages/                # Pages légales
└── App.tsx              # Configuration des routes
```

## 🐛 Résolution des problèmes

### Erreur 404 sur les routes directes

Si vous rencontrez encore des erreurs 404 :

1. **Vérifiez que `vercel.json` est à la racine du projet**
2. **Redéployez sur Vercel** après avoir ajouté le fichier
3. **Vérifiez les logs de déploiement** dans le dashboard Vercel

### Test des routes

Testez ces URLs directement dans votre navigateur :
- `https://votre-domaine.vercel.app/voitures`
- `https://votre-domaine.vercel.app/canapes`
- `https://votre-domaine.vercel.app/canapés`

Toutes devraient fonctionner sans erreur 404. 