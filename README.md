# RobloxCodes.fr — Guide de déploiement

## Structure du projet

```
roblox-codes/
├── pages/
│   ├── index.js              → / (page d'accueil)
│   ├── codes/
│   │   ├── index.js          → /codes (liste de tous les jeux)
│   │   └── [slug].js         → /codes/blox-fruits, /codes/pet-simulator-99...
│   ├── news/
│   │   ├── index.js          → /news (liste des actualités)
│   │   └── [id].js           → /news/blox-fruits-update-25...
│   ├── mentions-legales.js   → /mentions-legales
│   └── contact.js            → /contact
├── data/
│   ├── games.json            → ✅ MODIFIE CE FICHIER pour ajouter des jeux/codes
│   └── news.json             → ✅ MODIFIE CE FICHIER pour ajouter des news
├── components/
│   ├── Layout.js             → Header + Footer communs
│   └── AdSense.js            → Emplacements publicitaires
└── styles/
    └── globals.css           → Design global
```

---

## 1. Déploiement sur Netlify

### Prérequis
- Un compte GitHub (gratuit)
- Un compte Netlify (gratuit)

### Étapes

1. **Upload le projet sur GitHub**
   - Crée un nouveau dépôt sur github.com
   - Upload tous les fichiers

2. **Connecte à Netlify**
   - Va sur app.netlify.com → "Add new site" → "Import from GitHub"
   - Sélectionne ton dépôt
   - Build command : `npm run build`
   - Publish directory : `out`
   - Clique "Deploy"

3. **Domaine personnalisé** (optionnel)
   - Dans Netlify : Site settings → Domain management → Add custom domain
   - Ex: robloxcodes.fr

---

## 2. Ajouter un jeu et ses codes

Ouvre le fichier `data/games.json` et ajoute un objet comme ceci :

```json
{
  "nom": "Nom du Jeu",
  "slug": "nom-du-jeu",
  "categorie": "Aventure",
  "description": "Description courte du jeu.",
  "image": "🎮",
  "couleur": "#FF6B35",
  "codes": [
    {
      "code": "MONCODE123",
      "reward": "Ce que le code donne (ex: 500 pièces)",
      "actif": true,
      "date": "2025-05"
    }
  ]
}
```

**Règles importantes :**
- Le `slug` doit être en minuscules avec des tirets : `blox-fruits` pas `Blox Fruits`
- `actif: true` = code fonctionnel, `actif: false` = code expiré
- `couleur` = couleur de la barre en haut de la carte (format hexadécimal)

---

## 3. Ajouter une news

Ouvre `data/news.json` et ajoute :

```json
{
  "id": "nom-du-jeu-nom-de-la-news",
  "titre": "Titre de l'article",
  "jeu": "Blox Fruits",
  "jeuSlug": "blox-fruits",
  "categorie": "mise-a-jour",
  "date": "2025-05-10",
  "resume": "Résumé court affiché dans la liste.",
  "contenu": "Texte complet de l'article.",
  "image": "🍎",
  "tags": ["update", "nouveauté"]
}
```

**Catégories disponibles :** `mise-a-jour` | `evenement` | `sortie`

---

## 4. Activer Google AdSense

1. Inscris-toi sur google.com/adsense avec ton site
2. Attends l'approbation (quelques jours)
3. Dans `components/Layout.js`, décommente la ligne AdSense et remplace `ca-pub-XXXXXXXXXXXXXXXX` par ton ID
4. Dans `components/AdSense.js`, remplace les commentaires par ton vrai code AdSense

---

## 5. Mise à jour après modifications

Après avoir modifié `games.json` ou `news.json` :
- Si hébergé sur Netlify via GitHub : commit tes changements, Netlify rebuilde automatiquement
- Si hébergé manuellement : relance `npm run build` et re-upload le dossier `out/`
