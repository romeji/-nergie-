# ⚡ EnergyX — Guide de déploiement Vercel

## 🚀 Déploiement en 3 étapes

### Option A — Drag & Drop (2 minutes)
1. Aller sur **vercel.com** → Sign up
2. "Add New Project" → "Deploy from existing files"
3. Glisser le dossier contenant `index.html` + `vercel.json`
4. ✅ **Votre app est en ligne** sur `https://energyx-xxx.vercel.app`

### Option B — GitHub (recommandé)
```bash
# 1. Créer un repo GitHub nommé "energyx"
# 2. Pousser les fichiers
git init
git add .
git commit -m "🚀 EnergyX v4 initial deploy"
git remote add origin https://github.com/VOTRE_USERNAME/energyx.git
git push -u origin main

# 3. Sur vercel.com → Import Git Repository → energyx
# ✅ Auto-déploiement à chaque git push
```

### Option C — CLI
```bash
npm install -g vercel
vercel
# Suivre les instructions → déployé en 20 secondes
```

---

## ⚙️ Configuration après déploiement

### 1. Google AdSense (revenus publicitaires)
1. Aller sur **adsense.google.com** → Créer un compte
2. Soumettre `https://energyx-xxx.vercel.app` pour validation
3. Une fois validé, remplacer dans `index.html` :
   - `ca-pub-XXXXXXXXXX` → votre Publisher ID
   - `1111111111`, `2222222222`, etc. → vos Ad Unit IDs
4. Redéployer

### 2. Google Analytics (statistiques visiteurs)
1. Aller sur **analytics.google.com** → Créer une propriété
2. Copier le Measurement ID (format: `G-XXXXXXXXXX`)
3. Remplacer `G-XXXXXXXXXX` dans `index.html`
4. Redéployer

### 3. Domaine personnalisé (optionnel, ~12€/an)
```
Vercel Dashboard → Project → Settings → Domains
→ Ajouter "energyx.fr" ou "monenergie.app"
→ Configurer les DNS chez votre registrar
```

---

## 🔧 Enedis OAuth2 (backend — prochaine étape)

Pour les vraies données Linky, créer un dossier `api/` :

```
energyx/
├── index.html          ← L'app
├── vercel.json         ← Config
└── api/
    ├── enedis-auth.js  ← Redirection OAuth Enedis
    └── enedis-data.js  ← Récupération des données
```

Inscription développeur : **datahub.enedis.fr**

---

## 💰 Monétisation

| Source | Estimation |
|--------|-----------|
| Google AdSense | 0.5–2€ / 1000 vues |
| EnergyX Premium | 4,99€/mois/utilisateur |
| Partenariats fournisseurs | 20–50€ / souscription |

---

## 📊 Stack technique

- **Frontend** : HTML/CSS/JS vanilla + Chart.js
- **Hosting** : Vercel (gratuit)
- **Pubs** : Google AdSense
- **Analytics** : Google Analytics 4
- **PWA** : Service Worker inline + Web Manifest
- **BDD future** : Supabase (gratuit jusqu'à 500MB)

---

*EnergyX v4.0 — Made with ⚡*
