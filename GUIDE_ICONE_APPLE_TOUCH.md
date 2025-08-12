# Guide de Test - Icône Apple Touch iOS

## ✅ Configuration Actuelle

- **Fichier** : `public/logo/apple-touch-icon.png` (8.1 KB)
- **Déclaration** : Ajoutée dans `index.html` avec `<link rel="apple-touch-icon" href="/logo/apple-touch-icon.png" />`
- **Format** : PNG
- **Taille recommandée** : 180×180 px

## 📱 Étapes de Test sur iPhone

### 1. Supprimer l'ancien raccourci
- Appuyer longuement sur l'icône Wash & Go sur l'écran d'accueil
- Sélectionner "Supprimer l'application"
- Confirmer la suppression

### 2. Effacer le cache Safari
- **Réglages** → **Safari** → **Effacer données de site**
- Confirmer l'effacement

### 3. Recharger le site
- Ouvrir Safari
- Aller sur le site Wash & Go
- Attendre le chargement complet

### 4. Ajouter à l'écran d'accueil
- Appuyer sur le bouton **Partager** (carré avec flèche)
- Sélectionner **"Sur l'écran d'accueil"**
- Personnaliser le nom si nécessaire
- Appuyer sur **"Ajouter"**

## 🔍 Contrôles Qualité

### Vérifications Visuelles
- [ ] L'icône affiche le logo Wash & Go (pas le "W bleu" générique)
- [ ] L'icône est nette et non floue
- [ ] Le logo est bien centré dans l'icône
- [ ] Les marges de sécurité sont respectées (12-16% autour du logo)
- [ ] L'icône s'affiche correctement en mode clair et sombre

### Vérifications Techniques
- [ ] Format PNG valide
- [ ] Dimensions 180×180 px
- [ ] Taille de fichier < 10 KB
- [ ] Pas de transparence (fond plein avec couleur de marque)

## 🎨 Spécifications de Design

### Couleurs de Marque
- **Bleu principal** : #0049ac
- **Fond de l'icône** : Blanc ou bleu de marque
- **Logo** : Bleu de marque sur fond blanc, ou blanc sur fond bleu

### Marges de Sécurité
- **Zone de sécurité** : 12-16% autour du logo
- **Zone de rognage** : iOS applique des arrondis automatiques
- **Centrage** : Logo parfaitement centré dans la zone de sécurité

## 🚀 Optimisations Futures (Optionnel)

### PWA (Progressive Web App)
- Créer un `manifest.json` pour Android/Chrome
- Ajouter une icône "maskable" pour Android
- Configurer le mode "full-screen"

### Thème Dynamique
- Ajouter `<meta name="theme-color" content="#0049ac">`
- Supporter le mode sombre avec `color-scheme: dark`

## 📸 Capture Avant/Après

**Avant** : Icône générique "W bleu" ou favicon par défaut
**Après** : Logo Wash & Go personnalisé avec les bonnes couleurs

## 🔧 Dépannage

### Si l'icône ne se met pas à jour
1. Supprimer complètement le raccourci
2. Effacer toutes les données Safari
3. Redémarrer Safari
4. Recharger le site
5. Réinstaller le raccourci

### Si l'icône est floue
- Vérifier que l'image source est en haute résolution
- S'assurer que les dimensions sont exactement 180×180 px
- Optimiser la compression PNG

### Si l'icône ne s'affiche pas
- Vérifier le chemin dans `index.html`
- S'assurer que le fichier est bien dans `public/logo/`
- Vérifier que le serveur sert correctement les fichiers statiques

## ✅ Critères de Validation

- [ ] L'icône affichée est le logo Wash & Go
- [ ] L'icône est nette et bien centrée
- [ ] Les arrondis iOS sont corrects
- [ ] Plus d'icône générique en cache
- [ ] Fonctionne en mode clair et sombre
