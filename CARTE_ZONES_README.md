# 🗺️ Composant CarteZones - Documentation

## 📋 Description

Le composant `CarteZones.tsx` affiche une carte interactive avec React-Leaflet montrant les zones d'intervention de Wash&Go. Il filtre et affiche uniquement les communes spécifiées à partir d'un fichier GeoJSON.

## 🎯 Fonctionnalités

- ✅ **Carte interactive** avec React-Leaflet
- ✅ **Filtrage automatique** des communes de la zone d'intervention
- ✅ **Survol interactif** avec changement de couleur et tooltips
- ✅ **Design responsive** (600px desktop, 400px mobile)
- ✅ **États de chargement** et gestion d'erreurs
- ✅ **Style cohérent** avec la charte graphique Wash&Go

## 📁 Structure des fichiers

```
src/
├── components/
│   └── Accueil/
│       ├── CarteZones.tsx          # Composant principal
│       └── ZonesSection.tsx        # Section d'exemple
├── index.css                       # Styles CSS (tooltips)
└── main.tsx                        # Import CSS Leaflet
public/
└── data/
    └── communes-france.geojson     # Données GeoJSON
```

## 🛠️ Utilisation

### Import du composant

```tsx
import CarteZones from './components/Accueil/CarteZones';
```

### Utilisation simple

```tsx
function MaPage() {
  return (
    <div>
      <h1>Notre zone d'intervention</h1>
      <CarteZones />
    </div>
  );
}
```

### Utilisation avec section complète

```tsx
import ZonesSection from './components/Accueil/ZonesSection';

function Accueil() {
  return (
    <div>
      <HeroSection />
      <ZonesSection />  {/* Inclut CarteZones */}
      <Footer />
    </div>
  );
}
```

## 🎨 Personnalisation

### Modifier les communes affichées

Éditez la constante `ZONES_INTERVENTION` dans `CarteZones.tsx` :

```tsx
const ZONES_INTERVENTION = [
  'Aubagne',
  'Peynier',
  // ... ajoutez ou supprimez des communes
];
```

### Changer le centre de la carte

Modifiez les coordonnées dans `CarteZones.tsx` :

```tsx
const CENTER_COORDS: [number, number] = [43.3, 5.5]; // [lat, lng]
```

### Personnaliser les styles

Modifiez la fonction `getStyle()` dans `CarteZones.tsx` :

```tsx
const getStyle = (feature: CommuneFeature) => {
  return {
    fillColor: '#0049ac',    // Couleur de remplissage
    weight: 2,               // Épaisseur de la bordure
    opacity: 1,              // Opacité de la bordure
    color: '#0049ac',        // Couleur de la bordure
    fillOpacity: 0.3         // Opacité du remplissage
  };
};
```

## 📊 Données requises

### Format du fichier GeoJSON

Le fichier `public/data/communes-france.geojson` doit contenir :

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "nom": "Aubagne",
        "code": "13005"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[lng1, lat1], [lng2, lat2], ...]]
      }
    }
  ]
}
```

### Propriétés requises

- `properties.nom` : Nom de la commune (doit correspondre à `ZONES_INTERVENTION`)

## 🎯 Zones d'intervention actuelles

Le composant affiche actuellement ces 25 communes :

1. Aubagne
2. Peynier
3. Rousset
4. Châteauneuf-le-Rouge
5. Pourcieux
6. Pourrières
7. Saint-Maximin-la-Sainte-Baume
8. Trets
9. Saint-Zacharie
10. Allauch
11. Plan-de-Cuques
12. Château-Gombert
13. Saint-Savournin
14. Cadolive
15. Mimet
16. Gréasque
17. Belcodène
18. La Bouilladisse
19. Gémenos
20. Carnoux-en-Provence
21. La Destrousse
22. Auriol
23. Bouc-Bel-Air
24. Simiane-Collongue
25. Cabriès

## 🚀 Démarrage rapide

1. **Vérifiez les dépendances** :
   ```bash
   npm install leaflet react-leaflet@4.2.1 --legacy-peer-deps
   ```

2. **Placez le fichier GeoJSON** :
   ```
   public/data/communes-france.geojson
   ```

3. **Importez le composant** :
   ```tsx
   import CarteZones from './components/Accueil/CarteZones';
   ```

4. **Utilisez le composant** :
   ```tsx
   <CarteZones />
   ```

## 🔧 Dépannage

### Carte ne s'affiche pas
- Vérifiez que le fichier GeoJSON est bien placé dans `public/data/`
- Vérifiez la console pour les erreurs de chargement

### Communes manquantes
- Vérifiez que les noms dans `ZONES_INTERVENTION` correspondent exactement aux `properties.nom` du GeoJSON
- Vérifiez la casse (majuscules/minuscules)

### Styles non appliqués
- Vérifiez que l'import CSS Leaflet est présent dans `main.tsx`
- Vérifiez que les styles personnalisés sont dans `index.css`

## 📱 Responsive

Le composant s'adapte automatiquement :
- **Desktop** : 600px de hauteur
- **Mobile/Tablette** : 400px de hauteur
- **Contrôles** : Zoom, déplacement, etc.

## 🎨 Styles CSS

Les tooltips utilisent la classe `.custom-tooltip` définie dans `index.css` avec :
- Couleur de fond : `rgba(0, 73, 172, 0.9)`
- Texte blanc
- Ombre portée
- Coins arrondis 