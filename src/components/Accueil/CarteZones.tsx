import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// Types pour les données GeoJSON
interface CommuneProperties {
  nom: string;
  code: string;
}

interface CommuneFeature {
  type: 'Feature';
  properties: CommuneProperties;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface GeoJSONData {
  type: 'FeatureCollection';
  features: CommuneFeature[];
}

// Liste des communes de la zone d'intervention Wash&Go
const ZONES_INTERVENTION = [
  'Aubagne',
  'Peynier',
  'Rousset',
  'Châteauneuf-le-Rouge',
  'Pourcieux',
  'Pourrières',
  'Saint-Maximin-la-Sainte-Baume',
  'Trets',
  'Saint-Zacharie',
  'Allauch',
  'Plan-de-Cuques',
  'Château-Gombert',
  'Saint-Savournin',
  'Cadolive',
  'Mimet',
  'Gréasque',
  'Belcodène',
  'La Bouilladisse',
  'Gémenos',
  'Carnoux-en-Provence',
  'La Destrousse',
  'Auriol',
  'Bouc-Bel-Air',
  'Simiane-Collongue',
  'Cabriès'
];

// Coordonnées du centre (Aubagne)
const CENTER_COORDS: [number, number] = [43.3, 5.5];

const CarteZones: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les données GeoJSON
  useEffect(() => {
    const loadGeoData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/communes-france.geojson');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data: GeoJSONData = await response.json();
        
        // Filtrer uniquement les communes de la zone d'intervention
        const filteredFeatures = data.features.filter(feature => 
          ZONES_INTERVENTION.includes(feature.properties.nom)
        );
        
        setGeoData({
          ...data,
          features: filteredFeatures
        });
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données de la carte');
      } finally {
        setLoading(false);
      }
    };

    loadGeoData();
  }, []);

  // Style pour les polygones des communes
  const getStyle = (feature: CommuneFeature) => {
    return {
      fillColor: '#0049ac',
      weight: 2,
      opacity: 1,
      color: '#0049ac',
      fillOpacity: 0.3
    };
  };

  // Gestion des événements de survol
  const onEachFeature = (feature: CommuneFeature, layer: L.Layer) => {
    // Tooltip au survol
    layer.bindTooltip(feature.properties.nom, {
      permanent: false,
      direction: 'top',
      className: 'custom-tooltip'
    });

    // Changement de style au survol
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillColor: '#0049ac',
          weight: 3,
          opacity: 1,
          color: '#0049ac',
          fillOpacity: 0.5
        });
        layer.bringToFront();
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          fillColor: '#0049ac',
          weight: 2,
          opacity: 1,
          color: '#0049ac',
          fillOpacity: 0.3
        });
      }
    });
  };

  // Gestion du chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] md:h-[400px] bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0049ac] mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="flex items-center justify-center h-[600px] md:h-[400px] bg-red-50 rounded-xl">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold mb-2">Erreur de chargement</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Notre zone d'intervention
        </h3>
        <p className="text-gray-600">
          Wash&Go intervient dans {geoData?.features.length || 0} communes des Bouches-du-Rhône et du Var
        </p>
      </div>
      
      <div className="relative">
        <MapContainer
          center={CENTER_COORDS}
          zoom={10}
          className="h-[600px] md:h-[400px] w-full rounded-xl shadow-lg"
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          boxZoom={true}
          dragging={true}
        >
          {/* Fond de carte OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Affichage des communes filtrées */}
          {geoData && (
            <GeoJSON
              data={geoData}
              style={getStyle}
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>
      
      {/* Légende */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-[#0049ac] mb-2">Légende</h4>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#0049ac] opacity-30 rounded"></div>
          <span className="text-sm text-gray-700">Communes desservies par Wash&Go</span>
        </div>
      </div>
    </div>
  );
};

export default CarteZones; 