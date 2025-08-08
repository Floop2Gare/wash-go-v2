# 🚗 Wash&Go - Service de Nettoyage Premium

## 📋 Présentation Générale

**Wash&Go** est une plateforme web moderne offrant des services de nettoyage haut de gamme à domicile pour véhicules et mobilier. Le site propose une expérience utilisateur fluide, responsive et intuitive, ciblant une clientèle CSP+ avec des services premium.

### 🎯 Objectifs
- Créer une expérience utilisateur premium et intuitive
- Offrir un parcours de commande fluide et personnalisé
- Maintenir une identité visuelle cohérente et professionnelle
- Optimiser la conversion avec des formulaires intelligents

## 🛠️ Stack Technique

### Frontend
- **React 18.3.1** - Framework principal avec hooks modernes
- **TypeScript 5.5.3** - Typage statique pour la robustesse du code
- **Vite 5.4.14** - Build tool rapide et moderne
- **Tailwind CSS 3.4.1** - Framework CSS utilitaire
- **React Router DOM 7.5.1** - Navigation SPA
- **React Hook Form 7.56.1** - Gestion des formulaires
- **Yup 1.6.1** - Validation des schémas
- **Framer Motion 11.0.8** - Animations fluides
- **Lucide React 0.344.0** - Icônes modernes
- **React Slick 0.30.3** - Carrousels interactifs

### Backend & Services
- **API REST** - Déployée sur Vercel
- **Meta API (Facebook)** - Intégration des publications en temps réel
- **Web3Forms** - Gestion des formulaires de contact
- **Google Sheets** - Réception et stockage des données

### Déploiement
- **Vercel** - Frontend et backend
- **Git** - Versioning et collaboration

## 📁 Structure du Projet

```
src/
├── components/           # Composants React réutilisables
│   ├── Accueil/         # Sections de la page d'accueil
│   ├── canape/          # Logique métier canapés
│   ├── textile/         # Logique métier textiles
│   ├── voiture/         # Logique métier véhicules
│   ├── Navbar/          # Navigation principale
│   └── CookieConsent/   # Gestion des cookies
├── pages/               # Pages principales
├── config/              # Configuration (Web3Forms, etc.)
├── data/                # Données statiques
├── services/            # Services API (Facebook, etc.)
└── App.tsx             # Point d'entrée principal
```

## 🚀 Fonctionnalités Principales

### 🏠 Page d'Accueil
- **Hero Section** - Présentation impactante de l'offre
- **Features Section** - Mise en avant des avantages
- **Social Media Section** - Publications Facebook en temps réel
- **Choix Section** - Navigation vers les services
- **Contact Section** - Formulaire ultra-design
- **Testimonials Section** - Témoignages clients

### 🚗 Service Voiture
**Parcours utilisateur en 6 étapes :**
1. **Aspiration** - Choix du niveau d'aspiration
2. **Type de véhicule** - Sélection du véhicule (berline, SUV, etc.)
3. **Pressing sièges** - Nettoyage des sièges
4. **Options spéciales** - Services additionnels
5. **Extras** - Spécificités (cuir, moquettes, etc.)
6. **Contact** - Informations client et réservation

**Fonctionnalités :**
- Barre de progression verticale dynamique
- Calcul automatique du prix et du temps
- Résumé en temps réel des sélections
- Validation des formulaires avec Yup

### 🛋️ Service Canapé
**Parcours utilisateur en 4 étapes :**
1. **Type de tissu** - Sélection du matériau
2. **Nombre de places** - Configuration du canapé
3. **Options supplémentaires** - Services additionnels
4. **Contact** - Réservation et informations

### 🧺 Service Textile
**Sélection conditionnelle selon le type :**

#### Matelas
- Choix de la taille (1 place, 2 places, etc.)
- Options de nettoyage spécialisé

#### Chaises
- Nombre de chaises à nettoyer
- Type de matière (cuir, tissu, velours, etc.)
- Options personnalisées

#### Tapis
- Surface à nettoyer
- Type de matière
- Options de traitement

### 📞 Système de Contact
- **Formulaire intelligent** avec validation Yup
- **Intégration Web3Forms** pour l'envoi d'emails
- **Synchronisation Google Sheets** pour le suivi
- **Gestion des créneaux** de réservation
- **Système de parrainage** intégré

## 🔧 Configuration et Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation Locale

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd washngo-site

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Variables d'Environnement

Créer un fichier `.env.local` :

```env
# Facebook API
VITE_FACEBOOK_TOKEN=your_facebook_token

# Backend URL
VITE_BACKEND_URL=https://backendtrue-5an1.vercel.app

# Web3Forms (optionnel - déjà configuré)
VITE_WEB3FORMS_KEY=b1c483a3-32a0-4ab0-8382-f7b50840048f
```

### Scripts Disponibles

```bash
npm run dev          # Démarrage serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
```

## 🎨 Design System

### Palette de Couleurs
- **Bleu principal** : `#0049ac` (Wash&Go brand)
- **Blanc** : `#ffffff`
- **Gris clair** : `#f8fafc`
- **Gris foncé** : `#1e293b`

### Typographie
- **Police principale** : Inter (Google Fonts)
- **Hiérarchie** : H1-H6 avec tailles cohérentes
- **Responsive** : Adaptation automatique sur mobile

### Composants Réutilisables
- **VerticalProgressBar** - Barre de progression personnalisée
- **ContactStep** - Formulaire de contact unifié
- **TimeSlotSelector** - Sélecteur de créneaux
- **TotalSummary** - Résumé des sélections

## 🔌 Intégrations API

### Facebook API
```typescript
// Récupération des publications en temps réel
const posts = await fetchFacebookPosts();
```

**Endpoint** : `https://backendtrue-5an1.vercel.app/api/facebook-posts`

### Web3Forms
```typescript
// Envoi de formulaire avec validation
const response = await sendEmailViaWeb3Forms(name, email, message);
```

**Configuration** : Access key configurée dans `src/config/web3forms.ts`

## 📱 Responsive Design

Le site est entièrement responsive avec :
- **Mobile First** - Optimisé pour les petits écrans
- **Breakpoints Tailwind** - sm, md, lg, xl, 2xl
- **Navigation adaptative** - Menu hamburger sur mobile
- **Formulaires optimisés** - UX adaptée selon l'écran

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Configuration Vercel
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Node Version** : 18.x

## 📊 Performance

### Optimisations
- **Code Splitting** - Chargement à la demande
- **Lazy Loading** - Images et composants
- **Bundle Optimization** - Vite + Rollup
- **Caching** - Headers optimisés sur Vercel

### Métriques
- **Lighthouse Score** : 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals** : Optimisés pour tous les métriques
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s

## 🔒 Sécurité

- **HTTPS** - Forcé sur Vercel
- **CSP Headers** - Content Security Policy
- **Validation** - Tous les formulaires validés côté client et serveur
- **Sanitization** - Protection contre les injections

## 🧪 Tests et Qualité

### Linting
```bash
npm run lint          # ESLint
npm run type-check    # TypeScript
```

### Standards de Code
- **ESLint** - Règles strictes React/TypeScript
- **Prettier** - Formatage automatique
- **TypeScript** - Typage strict
- **Conventions** - Nommage cohérent

## 📈 Analytics et Monitoring

### Métriques Utilisateur
- **Google Analytics** - Intégration prévue
- **Hotjar** - Heatmaps et recordings
- **Error Tracking** - Sentry (prévu)

## 🔄 Workflow de Développement

### Branches
- `main` - Production
- `develop` - Développement
- `feature/*` - Nouvelles fonctionnalités
- `hotfix/*` - Corrections urgentes

### Processus
1. **Feature Branch** - Création depuis develop
2. **Développement** - Code + tests
3. **Pull Request** - Review et validation
4. **Merge** - Intégration dans develop
5. **Release** - Déploiement en production

## 🚧 Évolutions Prévues

### Court Terme
- [ ] Dashboard d'administration
- [ ] Système de réservation avancé
- [ ] Intégration Google Reviews
- [ ] Notifications push

### Moyen Terme
- [ ] Application mobile React Native
- [ ] Système de fidélité
- [ ] API publique
- [ ] Intégration paiement

### Long Terme
- [ ] Marketplace multi-prestataires
- [ ] IA pour l'estimation automatique
- [ ] Système de géolocalisation avancé

## 🤝 Contribution

### Comment Contribuer
1. Fork le projet
2. Créer une branche feature
3. Développer avec les standards du projet
4. Tester localement
5. Soumettre une Pull Request

### Standards de Code
- **TypeScript strict** - Tous les fichiers typés
- **ESLint** - Règles respectées
- **Tests** - Couverture minimale 80%
- **Documentation** - JSDoc pour les fonctions complexes

## 📞 Support

### Contact Développement
- **Email** : [email]
- **Issues** : GitHub Issues
- **Documentation** : Wiki du projet

### Ressources
- **Design System** : Figma (lien à ajouter)
- **API Documentation** : Postman Collection
- **Deployment** : Vercel Dashboard

---

**Wash&Go** - Service de nettoyage premium à domicile 🚗✨

*Dernière mise à jour : Décembre 2024* 