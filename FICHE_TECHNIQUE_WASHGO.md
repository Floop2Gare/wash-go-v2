# 📋 FICHE TECHNIQUE WASH&GO - ÉTAT DES LIEUX COMPLET

## 🎯 OBJECTIF
Document technique exhaustif du site Wash&Go pour la création d'une application SaaS de pilotage interne, métier et rentabilité.

---

## 🔧 1. TECHNOLOGIES UTILISÉES

### **Frontend Principal**
- **React 18.3.1** - Framework principal avec hooks modernes
- **TypeScript 5.5.3** - Typage statique pour la robustesse
- **Vite 5.4.14** - Build tool rapide et moderne
- **Tailwind CSS 3.4.1** - Framework CSS utilitaire
- **React Router DOM 7.5.1** - Navigation SPA

### **Gestion des Formulaires**
- **React Hook Form 7.56.1** - Gestion des formulaires
- **Yup 1.6.1** - Validation des schémas
- **@hookform/resolvers 5.0.1** - Intégration Yup + RHF

### **Animations et UI**
- **Framer Motion 11.0.8** - Animations fluides
- **Lucide React 0.344.0** - Icônes modernes
- **React Icons 5.5.0** - Bibliothèque d'icônes
- **React Slick 0.30.3** - Carrousels interactifs
- **Slick Carousel 1.8.1** - Dépendance carousel

### **HTTP et API**
- **Axios 1.11.0** - Client HTTP
- **Fetch API** - Requêtes natives

### **Backend et Services**
- **API REST** - Déployée sur Vercel
- **Meta API (Facebook)** - Intégration publications temps réel
- **Web3Forms** - Gestion formulaires de contact
- **Google Sheets** - Réception et stockage données

### **Déploiement**
- **Vercel** - Frontend et backend
- **Git** - Versioning et collaboration

---

## 🧩 2. COMPOSANTS MÉTIERS ET TECHNIQUES

### **Composants Réutilisables**
- **VerticalProgressBar** - Barre de progression verticale (3 versions)
- **TotalSummary** - Résumé prix/temps en temps réel
- **ContactStep** - Formulaire de contact unifié
- **TimeSlotSelector** - Sélecteur de créneaux horaires
- **Navbar** - Navigation principale
- **Footer** - Pied de page avec mentions légales
- **CookieConsentBanner** - Gestion des cookies

### **Composants Spécifiques par Service**

#### **Service Voiture** (`/voiture/components/`)
- **AspirationStep** - Choix niveau d'aspiration
- **VehicleTypeStep** - Sélection type véhicule (citadine, berline, SUV, etc.)
- **SeatCleaningStep** - Nettoyage des sièges
- **SpecialOptionsStep** - Options spéciales
- **ExtrasStep** - Spécificités (cuir, moquettes, etc.)
- **ContactStep** - Formulaire contact voiture

#### **Service Canapé** (`/canape/components/`)
- **FabricTypeStep** - Type de tissu
- **CanapeTypeStep** - Nombre de places
- **CanapeOptionsStep** - Options supplémentaires
- **CanapeContactStep** - Formulaire contact canapé

#### **Service Textile** (`/textile/components/`)
- **TextileTypeStep** - Choix type (Matelas, Chaises, Tapis)
- **TextileMaterialStep** - Matière générale
- **TextileMatelasSizeStep** - Taille matelas
- **TextileChairsQuantityStep** - Nombre de chaises
- **TextileChairsMaterialStep** - Matière chaises
- **TextileTapisSurfaceStep** - Surface tapis
- **TextileTapisMaterialStep** - Matière tapis
- **TextileOptionsStep** - Options supplémentaires
- **TextileContactStep** - Formulaire contact textile

### **Composants Accueil** (`/Accueil/`)
- **HeroSection** - Section principale d'accueil
- **FeaturesSection** - Mise en avant des avantages
- **SocialMediaSection** - Publications Facebook
- **ChoixSection** - Navigation vers les services
- **ContactSectionUltra** - Formulaire contact ultra-design
- **TestimonialsSection** - Témoignages clients

---

## 🧠 3. LOGIQUES MÉTIERS IMPLÉMENTÉES

### **Calcul du Prix et Temps**

#### **Service Voiture**
```typescript
// Structure de données prix/temps
interface SelectionData {
  step: string;
  value: string | string[];
  price: number;
  time: number;
}

// Calculs par étape :
- Aspiration : 0€ (inclus)
- Type véhicule : +10€ (berline/SUV), +20€ (7 places), "Sur devis" (hors gabarit)
- Pressing sièges : 15€ par siège
- Options spéciales : 5-15€ selon option
- Extras : 5-20€ selon spécificité
```

#### **Service Canapé**
```typescript
// Calculs par étape :
- Type tissu : 0€ (inclus)
- Nombre places : 15€ par place
- Options supplémentaires : 5-15€ selon option
```

#### **Service Textile**
```typescript
// Calculs conditionnels selon type :
- Matelas : "Sur devis" selon taille
- Chaises : 10€ par chaise
- Tapis : 5€ par m² avec remise volume
```

### **Logiques Conditionnelles**

#### **Service Textile - Parcours Dynamique**
```typescript
// Logique conditionnelle selon type sélectionné :
if (textileType === "Matelas") {
  // Afficher TextileMatelasSizeStep
  // Puis TextileOptionsStep
} else if (textileType === "Chaises") {
  // Afficher TextileChairsQuantityStep
  // Puis TextileChairsMaterialStep
  // Puis TextileOptionsStep
} else if (textileType === "Tapis") {
  // Afficher TextileTapisSurfaceStep
  // Puis TextileTapisMaterialStep
  // Puis TextileOptionsStep
}
```

#### **Validation des Formulaires**
```typescript
// Validations implémentées :
- Email : format valide
- Téléphone : 10 chiffres
- Adresse : format avec numéro et code postal
- Date : futur uniquement, pas dimanche
- Créneau : obligatoire si date valide
```

### **Gestion des États**
```typescript
// États globaux par service :
- selections: Array<{step: string, value: string|string[]}>
- totalPrice: number
- totalTime: number
- activeStep: number
- formError: string | null
```

---

## 🗂️ 4. DONNÉES MANIPULÉES

### **Types d'Inputs (Formulaires)**
```typescript
interface ContactForm {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
  parrainage: string;
  date: string;
  timeSlot: string;
  message: string;
  rappel: boolean;
  rgpd: boolean;
}
```

### **Données Affichées Dynamiquement**
```typescript
// Résumé en temps réel :
- Prix total calculé
- Temps estimé formaté (ex: "2h30")
- Sélections par étape
- Progression (pourcentage)

// Options dynamiques :
- Créneaux horaires générés selon durée
- Prix mis à jour en temps réel
- Validation en temps réel
```

### **Format des Résultats**
```typescript
// Envoi Web3Forms :
const message = formatServiceRequest(
  'voiture' | 'canape' | 'textile',
  selections,
  totalPrice,
  totalTime,
  contactInfo
);

// Format JSON envoyé :
{
  serviceType: string,
  selections: Array<{step: string, value: string|string[]}>,
  totalPrice: number,
  totalTime: number,
  contactInfo: ContactForm
}
```

---

## 🛜 5. CONNEXIONS EXTERNES ACTIVES

### **Meta API (Facebook)**
```typescript
// Endpoint : https://backendtrue-5an1.vercel.app/api/facebook-posts
// Fonction : fetchFacebookPosts()
// Données récupérées :
interface FacebookPost {
  id: string;
  message: string;
  full_picture?: string;
  permalink_url: string;
  created_time: string;
}
```

### **Web3Forms**
```typescript
// Configuration : src/config/web3forms.ts
// Access Key : b1c483a3-32a0-4ab0-8382-f7b50840048f
// Endpoint : https://api.web3forms.com/submit
// Fonction : sendEmailViaWeb3Forms()
// Timeout : 10 secondes
```

### **Google Sheets**
- **Intégration** : Via Web3Forms
- **Format** : Données structurées en colonnes
- **Synchronisation** : Automatique à chaque soumission

### **Leaflet + GeoJSON**
- **Statut** : Mentionné dans le README mais non implémenté
- **Usage prévu** : Carte interactive des villes desservies

---

## 🧱 6. STRUCTURE TECHNIQUE DU CODE

### **Arborescence des Dossiers**
```
src/
├── components/           # Composants React réutilisables
│   ├── Accueil/         # Sections page d'accueil
│   ├── canape/          # Logique métier canapés
│   │   ├── components/  # Composants spécifiques
│   │   └── page/        # Page principale
│   ├── textile/         # Logique métier textiles
│   │   └── components/  # Composants spécifiques
│   ├── voiture/         # Logique métier véhicules
│   │   ├── components/  # Composants spécifiques
│   │   └── page/        # Page principale
│   ├── Navbar/          # Navigation principale
│   └── CookieConsent/   # Gestion des cookies
├── pages/               # Pages principales
├── config/              # Configuration (Web3Forms, etc.)
├── data/                # Données statiques
├── services/            # Services API (Facebook, etc.)
└── App.tsx             # Point d'entrée principal
```

### **Routing**
```typescript
// Routes principales :
- "/" - Page d'accueil
- "/voitures" - Service voiture
- "/canapes" - Service canapé
- "/canapés" - Alias service canapé
- "/textile" - Service textile
- "/a-propos" - Page à propos
- "/mentions-legales" - Mentions légales
- "/politique-cookies" - Politique cookies
- "/rgpd" - Page RGPD
```

### **Organisation des Étapes Multi-étapes**
```typescript
// Service Voiture (6 étapes) :
const steps = [
  { label: "Aspiration", component: AspirationStep },
  { label: "Type de véhicule", component: VehicleTypeStep },
  { label: "Pressing sièges", component: SeatCleaningStep },
  { label: "Options spéciales", component: SpecialOptionsStep },
  { label: "Extras", component: ExtrasStep },
  { label: "Contact et validation", component: ContactStep },
];

// Service Canapé (4 étapes) :
const steps = [
  { label: "Type de tissu", component: FabricTypeStep },
  { label: "Nombre de places", component: CanapeTypeStep },
  { label: "Options supplémentaires", component: CanapeOptionsStep },
  { label: "Contact", component: CanapeContactStep },
];

// Service Textile (étapes conditionnelles) :
// Parcours dynamique selon type sélectionné
```

---

## 📦 7. FICHIERS INUTILES, DOUBLONS OU ÉLÉMENTS À NETTOYER

### **Composants en Double**
- **VerticalProgressBar** : 3 versions identiques
  - `/voiture/components/VerticalProgressBar/VerticalProgressBar.tsx`
  - `/canape/components/VerticalProgressBar.tsx`
  - `/textile/components/VerticalProgressBar.tsx`
  - `/textile/components/TextileVerticalProgressBar.tsx`

### **Composants Contact Dupliqués**
- **ContactStep** : 3 versions quasi-identiques
  - `/voiture/components/ContactStep.tsx` (700 lignes)
  - `/canape/components/CanapeContactStep.tsx` (700 lignes)
  - `/textile/components/TextileContactStep.tsx` (700 lignes)

### **Logiques Métier Redondantes**
- **Calcul prix/temps** : Répété dans chaque service
- **Validation formulaires** : Code identique dans chaque ContactStep
- **TimeSlotSelector** : Importé depuis voiture dans textile

### **Fichiers Potentiellement Inutilisés**
- **Leaflet/GeoJSON** : Mentionné mais non implémenté
- **Certains assets** : Images non utilisées dans `/public/`

---

## 📊 8. ÉLÉMENTS TECHNIQUES INDUSTRIALISABLES EN MODULES SaaS

### **Module de Configuration des Prix**
```typescript
// Structure industrialisable :
interface PricingConfig {
  serviceType: 'voiture' | 'canape' | 'textile';
  basePrice: number;
  options: {
    [key: string]: {
      price: number;
      time: number;
      description: string;
    }
  };
  conditions: {
    [key: string]: {
      multiplier: number;
      minValue: number;
      maxValue: number;
    }
  };
}
```

### **Module de Planning/Créneaux**
```typescript
// Fonctionnalités à développer :
- Gestion des créneaux disponibles
- Réservation en temps réel
- Gestion des équipes
- Calendrier interactif
- Notifications automatiques
```

### **Système de Gestion des Demandes Clients**
```typescript
// Base de données à créer :
interface CustomerRequest {
  id: string;
  serviceType: string;
  selections: SelectionData[];
  totalPrice: number;
  totalTime: number;
  contactInfo: ContactForm;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  scheduledDate: Date;
  assignedTeam?: string;
}
```

### **Tableau de Bord Administratif**
```typescript
// Fonctionnalités à développer :
- Dashboard des demandes en cours
- Statistiques de conversion
- Gestion des équipes
- Configuration des prix
- Export des données
- Gestion des clients
```

### **Base de Données Potentielle**
```sql
-- Tables principales :
- customers (clients)
- requests (demandes)
- services (types de services)
- pricing (configuration des prix)
- teams (équipes)
- schedules (planning)
- analytics (statistiques)
```

### **API Backend à Développer**
```typescript
// Endpoints nécessaires :
- POST /api/requests (créer demande)
- GET /api/requests (lister demandes)
- PUT /api/requests/:id (modifier statut)
- GET /api/analytics (statistiques)
- POST /api/pricing (configurer prix)
- GET /api/schedule (créneaux disponibles)
```

---

## 🎯 RÉSUMÉ POUR CRÉATION SaaS

### **Points Forts du Code Actuel**
- Architecture modulaire et réutilisable
- Logiques métier bien structurées
- Validation robuste des formulaires
- Intégrations API fonctionnelles
- Design system cohérent

### **Modules SaaS à Développer**
1. **Backend API** avec base de données
2. **Dashboard administrateur**
3. **Système de réservation avancé**
4. **Gestion des équipes et planning**
5. **Configuration dynamique des prix**
6. **Analytics et reporting**
7. **Système de notifications**
8. **Gestion des clients**

### **Technologies Recommandées pour le SaaS**
- **Backend** : Node.js + Express + PostgreSQL
- **Authentification** : JWT + bcrypt
- **Real-time** : Socket.io pour les réservations
- **Notifications** : SendGrid + SMS API
- **Analytics** : Google Analytics + Custom tracking
- **Déploiement** : Docker + AWS/Vercel

---

*Document créé pour le fondateur Wash&Go - Décembre 2024*
