# 🌌 Notre Univers 🌌
## Un Site Web Ultra-Moderne et Premium pour Deux ❤️

---

## 📋 Vue d'ensemble

**Notre Univers** est une application web 100% privée et romantique créée pour un couple. Elle combine un design ultra-moderne (Galaxy + Luxury) avec des fonctionnalités interactives et émouvantes.

### ✨ Caractéristiques Principales

✅ **Design Premium** - Thème sombre avec dégradés galaxie et touches dorées
✅ **Animations Fluides** - Étoiles animées, transitions douces, effets glassmorphism
✅ **6 Sections Complètes** - Accueil, Messages, Souvenirs, Quiz, Playlist, Surprise
✅ **Système de Login** - Page de connexion sécurisée avec mot de passe
✅ **Sauvegarde Locale** - Toutes les données restent privées (localStorage)
✅ **Responsive Design** - Fonctionne parfaitement sur mobile et desktop
✅ **100% Vanilla JS** - Pas de dépendances externes

---

## 🚀 Comment Démarrer

### 1. Ouvrir le Site
- Double-cliquez sur **`index.html`** pour ouvrir le site dans votre navigateur
- Ou faites un clic droit → "Ouvrir avec" → Votre navigateur préféré

### 2. Connexion au Site
- **Mot de passe par défaut :** `amour123`
- Une fois connecté, vous accédez à votre univers privé 🔐

### 3. Personnaliser la Date de Début
- Ouvrez **`script.js`**
- Trouvez la ligne 16 : `COUPLE_START_DATE: '2023-01-14'`
- Modifiez la date au format YYYY-MM-DD (ex: `'2024-06-15'`)
- Le compteur "depuis combien de temps on est ensemble" s'affichera automatiquement

### 4. Changer le Mot de Passe
- Ouvrez **`script.js`**
- Trouvez la ligne 15 : `PASSWORD: 'amour123'`
- Remplacez par votre mot de passe préféré

---

## 📱 Structure et Fonctionnalités

### 🏠 Accueil
- Message romantique animé (change aléatoirement)
- Compteur de jours ensemble (ex: "X jours ensemble ❤️")
- Boutons d'accès rapide vers les autres sections
- Animation cœur qui pulse

### 💌 Messages
- Ajouter des messages d'amour
- Messages révélables (cliquez pour montrer/cacher)
- Affichage en cartes élégantes
- Supprimer les messages

### 📸 Souvenirs
- Ajouter photo + titre + description + date
- Affichage en grille de cartes avec images
- Triés par date (les plus récents en premier)
- Hover effect avec zoom sur l'image

### 🎮 Quiz Amoureux
- 5 questions pour tester votre connaissance mutuelle
- Score sur 100 points
- Messages personnalisés selon le résultat
- Rejouable autant que vous le voulez

### 🎵 Playlist
- Ajouter des chansons avec lien YouTube
- Message associé à chaque chanson
- Bouton pour écouter directement
- Gérer la playlist

### 🎁 Surprise
- Bouton qui affiche aléatoirement :
  - Messages d'amour romantiques
  - Défis couple
  - Idées de rendez-vous
- Historique des dernières surprises

---

## 🎨 Design et Personnalisation

### Couleurs (à modifier dans `style.css`)

```css
--dark-bg: #0a0a0a;        /* Noir profond */
--gold: #FFD700;            /* Or */
--violet: #9d4edd;          /* Violet */
--blue: #3a86ff;            /* Bleu */
--pink: #ff006e;            /* Rose */
--cyan: #00f5ff;            /* Cyan */
```

### Ajouter des Messages Romantiques
- Ouvrez **`script.js`**
- Trouvez le tableau `romanticMessages` (ligne 238)
- Ajoutez vos propres messages

### Ajouter des Défis Couple/Idées
- Ouvrez **`script.js`**
- Trouvez le tableau `SURPRISES` (ligne 52)
- Ajoutez vos propres surprises

### Questions du Quiz
- Ouvrez **`script.js`**
- Trouvez le tableau `QUIZ_QUESTIONS` (ligne 36)
- Personnalisez les questions

---

## 💾 Sauvegarde des Données

Toutes les données sont sauvegardées automatiquement dans le **localStorage** de votre navigateur :
- Messages
- Souvenirs (avec URLs des images)
- Playlist
- Historique des surprises

**Important :** 
- Les données restent sur l'appareil (privé 🔐)
- Si vous videz le cache du navigateur, les données seront perdues
- Pour sauvegarder, exportez les données manuellement (voir section export)

---

## 🛠️ Modification Avancée

### Changer les Étoiles en Arrière-Plan
- Les étoiles sont générées en JavaScript (canvas)
- Modifiez les nombres dans `drawStars()` et `drawBackgroundStars()` pour plus/moins d'étoiles

### Changer la Typographie
- Les polices sont importées depuis Google Fonts (ligne 6 de `index.html`)
- Vous pouvez les changer dans le `<link>` ou utiliser `font-family` dans le CSS

### Ajouter de la Musique Automatiquement
- Préparez une liste de chansons YouTube
- Dans `script.js`, appelez `addMusicFromArray()` (à créer)

---

## ⚠️ Dépannage

### Le site ne s'ouvre pas
→ Assurez-vous d'avoir un navigateur moderne (Chrome, Firefox, Safari, Edge)

### Le mot de passe ne fonctionne pas
→ Vérifiez que vous avez exactement `amour123` (vérifiez les majuscules)
→ Indice affiché : "C'est le mot qui décrit nos sentiments! 💕"

### Les données ne s'enregistrent pas
→ Vérifiez que le localStorage est activé dans votre navigateur
→ Essayez de fermer les fenêtres privées/incognito (elles ne sauvegardent pas)

### Les images des souvenirs ne s'affichent pas
→ Assurez-vous d'utiliser une URL HTTPS valide
→ Si le lien est invalide, une image placeholder s'affichera

### Les animations sont saccadées
→ Cela dépend de la performance de votre navigateur
→ Essayez de réduire le nombre d'étoiles dans le code

---

## 📂 Structure des Fichiers

```
notre univers/
│
├── index.html          # Structure HTML (6 sections + login)
├── style.css           # Styles (design premium + animations)
├── script.js           # Logique JavaScript (interactivité)
└── README.md           # Ce fichier
```

**Taille totale :** ~80 KB (très léger!)

---

## 🌟 Conseils d'Utilisation

1. **Créez une ambiance :** Utilisez avec de la musique douce 🎵
2. **Personnalisez-le :** N'hésitez pas à modifier les messages, couleurs, etc.
3. **Sauvegardez régulièrement :** Exportez vos données manuellement pour sécuriser
4. **Ajoutez vos souvenirs :** Plus vous l'utilisez, plus riche il devient 📸
5. **Jouez ensemble :** Le quiz et les surprises sont plus fun à deux 🎮

---

## 🎁 Bonus - Idées d'Utilisation

✨ **Date spéciale :** Ouvrez le site à une date importante
💌 **Surprise :** Créez le site en secret et montrez-le à votre personne
🎂 **Anniversaire :** Pré-remplissez le site avec des messages d'amour
📱 **Mobile :** Ouvrez sur votre téléphone pour un moment intime

---

## 📞 Support et Questions

Si vous avez des questions ou besoin de modifications :
- Consultez le code commenté
- Essayez de modifier un petit élément à la fois
- Testez dans la console du navigateur (F12)

---

## 💕 Message Final

**Notre Univers** a été créé pour célébrer votre amour unique. C'est un espace privé, romantique et interactif qui vous appartient à 100%.

Profitez de chaque moment, créez des souvenirs, écrivez vos histoires d'amour, et que les étoiles brillent sur votre univers! ✨

**Enjoy! 🌌❤️**

---

*Créé avec amour et des étoiles ⭐*
