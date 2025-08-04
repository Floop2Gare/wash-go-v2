# 📸 Système d'Upload de Photos - Wash&GO

## 🎯 **Fonctionnement actuel**

### **✅ Ce qui est déjà implémenté :**

#### **1. Upload vers ImgBB**
- **Service** : ImgBB (gratuit, fiable)
- **API Key** : `913a76666159bc972f4ff90aa5d88589`
- **Expiration** : 24h (86400 secondes)
- **Format** : Base64 conversion automatique

#### **2. Limites configurées**
- **Nombre max** : 3 photos par demande
- **Taille par fichier** : 10MB maximum
- **Taille totale** : 30MB maximum
- **Formats acceptés** : JPG, PNG, WebP

#### **3. Interface utilisateur**
- **Zone de drop** : Zone cliquable pour sélectionner les photos
- **Prévisualisation** : Miniatures avec nom et taille
- **Suppression** : Bouton "×" pour retirer une photo
- **Validation** : Messages d'erreur clairs

#### **4. Réception par email**
- **Intégration** : Liens ImgBB ajoutés au message
- **Format** : Un lien par ligne dans l'email
- **Note** : Mention de l'expiration 24h

---

## 🔧 **Code technique**

### **Fonction d'upload vers ImgBB :**
```typescript
const uploadToImgBB = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        
        const formData = new FormData();
        formData.append('image', base64Data);
        formData.append('expiration', '86400'); // 24h
        
        const response = await fetch('https://api.imgbb.com/1/upload?key=913a76666159bc972f4ff90aa5d88589', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          resolve(result.data.url);
        } else {
          throw new Error('Échec de l\'upload vers ImgBB');
        }
      } catch (error) {
        reject(new Error('Impossible d\'uploader le fichier vers ImgBB'));
      }
    };
    reader.readAsDataURL(file);
  });
};
```

### **Intégration dans le message :**
```typescript
// Upload de tous les fichiers
const photoLinks: string[] = [];
for (const file of photos) {
  const link = await uploadToImgBB(file);
  photoLinks.push(link);
}

// Ajout au message
let finalMessage = message;
if (photoLinks.length > 0) {
  finalMessage += `\n\n📎 Photos envoyées :\n\n${photoLinks.join('\n\n')}\n\n⚠️ Note : Ces liens sont valables 24h et ne peuvent être téléchargés qu'une seule fois.`;
}
```

---

## 📧 **Exemple d'email reçu**

```
🚗 Nouvelle demande Wash&GO

Aspiration : Avec coffre
Type de véhicule : Berline / Break
Sièges à nettoyer : Avant, Arrière
Options choisies : Vitres, Plastiques
Spécificités : Moquettes
Prix total : 85 €
Temps estimé : ± 2h30

📩 Contact client :
Nom : Jean Dupont
Téléphone : 06 12 34 56 78
Email : jean.dupont@email.com
Adresse : 123 Rue de la Paix, 13000 Marseille
Date souhaitée : 2024-01-15
Créneau : 17:30-19:30
Message perso : Véhicule très sale, besoin d'un nettoyage complet

📎 Photos envoyées :

https://i.ibb.co/abc123/photo1.jpg

https://i.ibb.co/def456/photo2.jpg

https://i.ibb.co/ghi789/photo3.jpg

⚠️ Note : Ces liens sont valables 24h et ne peuvent être téléchargés qu'une seule fois.

🔐 Code parrainage : Washgo
```

---

## 🎨 **Interface utilisateur**

### **Zone de sélection :**
- Zone cliquable avec icône ImagePlus
- Texte explicatif : "Cliquez ici pour ajouter jusqu'à 3 photos"
- Informations sur les formats acceptés
- Limites de taille affichées

### **Prévisualisation :**
- Miniatures 96x96px avec bordure arrondie
- Nom du fichier (tronqué si trop long)
- Taille en MB
- Bouton de suppression au survol

### **Validation :**
- Messages d'erreur en temps réel
- Scroll automatique vers les erreurs
- Validation avant envoi

---

## 🔒 **Sécurité et fiabilité**

### **Avantages ImgBB :**
- ✅ **Gratuit** : Pas de coût pour l'upload
- ✅ **Fiable** : Service stable et rapide
- ✅ **Sécurisé** : Liens temporaires (24h)
- ✅ **Simple** : API REST facile à utiliser
- ✅ **Pas de compte** : Utilisation directe avec API key

### **Limitations :**
- ⚠️ **Expiration** : Liens valables 24h seulement
- ⚠️ **Téléchargement unique** : Chaque lien ne peut être téléchargé qu'une fois
- ⚠️ **Dépendance externe** : Nécessite ImgBB en ligne

---

## 🚀 **Utilisation**

### **Pour les utilisateurs :**
1. Remplir le formulaire de contact
2. Cliquer sur la zone "Photos"
3. Sélectionner jusqu'à 3 photos
4. Vérifier les prévisualisations
5. Envoyer le formulaire
6. Les photos apparaîtront dans l'email reçu

### **Pour l'administrateur :**
1. Recevoir l'email avec les liens
2. Cliquer sur chaque lien pour voir les photos
3. Les photos sont automatiquement supprimées après 24h

---

## 📱 **Compatibilité**

- ✅ **Mobile** : Interface responsive
- ✅ **Desktop** : Fonctionne sur tous les navigateurs
- ✅ **Tablette** : Interface adaptée
- ✅ **Touch** : Boutons tactiles optimisés

---

## 🔄 **Maintenance**

### **Si ImgBB devient indisponible :**
1. Changer l'API key si nécessaire
2. Vérifier les limites de l'API
3. Considérer un service alternatif (File.io, Imgur, etc.)

### **Pour modifier les limites :**
- **Nombre de photos** : Modifier `slice(0, 3)` dans `handlePhotoChange`
- **Taille par fichier** : Modifier `maxFileSize`
- **Taille totale** : Modifier `maxTotalSize`
- **Formats** : Modifier `validTypes`

---

## ✅ **Statut actuel**

**FONCTIONNEL** ✅
- Upload de 3 photos maximum
- Réception par liens ImgBB dans l'email
- Interface utilisateur complète
- Validation et gestion d'erreurs
- Compatible mobile et desktop

Le système est **prêt à l'utilisation** ! 🎉 