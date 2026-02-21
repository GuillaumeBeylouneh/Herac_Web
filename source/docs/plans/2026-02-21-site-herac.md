# HERAC Website - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Site one-page statique pour l'association HERAC, déployé sur GitHub Pages.

**Architecture:** Site Astro SSG (Static Site Generator), une seule page avec navigation par ancres, sections empilées verticalement. Déploiement automatique via GitHub Actions sur la branche `gh-pages`.

**Tech Stack:** Astro 5, Tailwind CSS 4, GitHub Actions, GitHub Pages

---

## Contexte

- Repo : `C:\Users\Guill\source\repos\Herac_Web` (git existant)
- Code source dans : `source/` (répertoire de travail)
- Hosting : GitHub Pages (compte Pro)
- Pas de domaine encore → URL par défaut `https://<user>.github.io/Herac_Web`

## Assets disponibles

Logos (à copier dans `public/logos/`) :
- `C:\Users\Guill\Documents\__Personnel\ASSO HEARC\Logo_HERAC_transparent.png` → logo principal (loup + HERAC)
- `C:\Users\Guill\Documents\__Personnel\ASSO HEARC\HERAC_Logo_Blanc.png` → version blanche pour fond sombre

Photos (à copier dans `public/photos/`) :
- `C:\Users\Guill\Documents\__Personnel\ASSO HEARC\HERAC\JPEG\Flyer A5 Recto.jpg` → photo action équipe (hero)
- `C:\Users\Guill\Documents\__Personnel\ASSO HEARC\HERAC\JPEG\Flyer A5 Verso.jpg` → photo Lucie avec médailles
- `C:\Users\Guill\Documents\__Personnel\ASSO HEARC\WhatsApp Image 2025-12-03 at 11.50.00.jpeg`
- `C:\Users\Guill\Documents\__Personnel\ASSO HEARC\WhatsApp Image 2025-12-03 at 12.07.28.jpeg`
- `C:\Users\Guill\Documents\__Personnel\ASSO HEARC\WhatsApp Image 2025-12-03 at 12.12.17.jpeg`

## Charte graphique

- Rouge dominant : `#C8102E`
- Noir : `#0D0D0D`
- Blanc : `#FFFFFF`
- Gris foncé : `#1A1A1A` (backgrounds sections)
- Font titres : `Bebas Neue` (Google Fonts) ou `Anton` - style militaire/sport
- Font texte : `Inter`

## Structure de la page

```
#hero       → Logo, slogan, CTA "Nous soutenir"
#association → Mission, valeurs, public cible
#palmares   → Résultats 2025 (grid médailles)
#equipe     → Julien + Lucie (cartes)
#services   → Formations secourisme + Coaching entreprise
#sponsoring → Offre sponsor (avantages)
#contact    → Email + Instagram
```

---

## Task 1 : Initialisation du projet Astro

**Files:**
- Create: `source/` (répertoire de travail courant)

**Step 1 : Init Astro**

Depuis `C:\Users\Guill\source\repos\Herac_Web\source\` :

```bash
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

Répondre : Yes to install deps, Yes to initialize git (skip si déjà git).

**Step 2 : Installer les dépendances**

```bash
npm install
npm install @astrojs/tailwind tailwindcss
```

**Step 3 : Ajouter l'intégration Tailwind**

Modifier `astro.config.mjs` :

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://guillaumecrespel.github.io', // adapter avec le vrai username GitHub
  base: '/Herac_Web',
  integrations: [tailwind()],
});
```

**Step 4 : Configurer Tailwind**

Créer `tailwind.config.mjs` :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        herac: {
          red: '#C8102E',
          dark: '#0D0D0D',
          gray: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Anton', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

**Step 5 : Créer le fichier CSS global**

Créer `src/styles/global.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0D0D0D;
  color: #FFFFFF;
  font-family: 'Inter', system-ui, sans-serif;
}
```

**Step 6 : Vérifier que ça démarre**

```bash
npm run dev
```

Attendu : serveur sur `http://localhost:4321`, page vide sans erreur.

**Step 7 : Commit**

```bash
git add .
git commit -m "feat: init Astro project with Tailwind"
```

---

## Task 2 : Copier les assets

**Files:**
- Create: `public/logos/`
- Create: `public/photos/`

**Step 1 : Créer les répertoires et copier les fichiers**

```bash
mkdir -p public/logos public/photos

cp "/c/Users/Guill/Documents/__Personnel/ASSO HEARC/Logo_HERAC_transparent.png" public/logos/logo-herac.png
cp "/c/Users/Guill/Documents/__Personnel/ASSO HEARC/HERAC_Logo_Blanc.png" public/logos/logo-herac-blanc.png
cp "/c/Users/Guill/Documents/__Personnel/ASSO HEARC/HERAC\JPEG\Flyer A5 Recto.jpg" public/photos/hero-action.jpg
cp "/c/Users/Guill/Documents/__Personnel/ASSO HEARC/HERAC\JPEG\Flyer A5 Verso.jpg" public/photos/lucie-medailles.jpg
cp "/c/Users/Guill/Documents/__Personnel/ASSO HEARC/WhatsApp Image 2025-12-03 at 11.50.00.jpeg" public/photos/photo-1.jpg
cp "/c/Users/Guill/Documents/__Personnel/ASSO HEARC/WhatsApp Image 2025-12-03 at 12.07.28.jpeg" public/photos/photo-2.jpg
cp "/c/Users/Guill/Documents/__Personnel/ASSO HEARC/WhatsApp Image 2025-12-03 at 12.12.17.jpeg" public/photos/photo-3.jpg
```

**Step 2 : Vérifier**

```bash
ls public/logos/ public/photos/
```

Attendu : les 7 fichiers présents.

**Step 3 : Commit**

```bash
git add public/
git commit -m "feat: add logos and photos assets"
```

---

## Task 3 : Layout principal

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/Navbar.astro`

**Step 1 : Créer le Layout**

Créer `src/layouts/Layout.astro` :

```astro
---
import '../styles/global.css';
import Navbar from '../components/Navbar.astro';

interface Props {
  title?: string;
}

const { title = 'HERAC - L\'excellence physique au service de l\'engagement' } = Astro.props;
const base = import.meta.env.BASE_URL;
---

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="HERAC - Association sportive regroupant des athlètes issus des forces de sécurité intérieure et de défense nationale." />
    <link rel="icon" type="image/png" href={`${base}logos/logo-herac.png`} />
    <title>{title}</title>
  </head>
  <body class="bg-herac-dark text-white">
    <Navbar />
    <main>
      <slot />
    </main>
    <footer class="bg-black py-8 text-center text-gray-500 text-sm">
      <p>© 2025 HERAC - Association loi 1901</p>
      <p class="mt-1">herac.officiel@gmail.com</p>
    </footer>
  </body>
</html>
```

**Step 2 : Créer la Navbar**

Créer `src/components/Navbar.astro` :

```astro
---
const base = import.meta.env.BASE_URL;
const links = [
  { href: '#association', label: 'Association' },
  { href: '#palmares', label: 'Palmarès' },
  { href: '#equipe', label: 'Équipe' },
  { href: '#services', label: 'Services' },
  { href: '#sponsoring', label: 'Sponsoring' },
  { href: '#contact', label: 'Contact' },
];
---

<nav class="fixed top-0 left-0 right-0 z-50 bg-herac-dark/95 backdrop-blur-sm border-b border-herac-red/20">
  <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
    <a href="#hero" class="flex items-center gap-3">
      <img src={`${base}logos/logo-herac.png`} alt="HERAC" class="h-10 w-auto" />
    </a>
    <ul class="hidden md:flex items-center gap-6 text-sm font-medium">
      {links.map(link => (
        <li>
          <a href={link.href} class="text-gray-300 hover:text-herac-red transition-colors uppercase tracking-wider text-xs">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
    <a href="#contact" class="hidden md:block bg-herac-red text-white px-4 py-2 text-xs uppercase tracking-wider font-bold hover:bg-red-700 transition-colors">
      Nous contacter
    </a>
    <!-- Mobile menu button -->
    <button id="menu-toggle" class="md:hidden text-white p-2" aria-label="Menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden md:hidden bg-herac-dark border-t border-herac-red/20">
    <ul class="flex flex-col py-4">
      {links.map(link => (
        <li>
          <a href={link.href} class="block px-6 py-3 text-gray-300 hover:text-herac-red hover:bg-herac-gray transition-colors uppercase tracking-wider text-sm menu-close">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle?.addEventListener('click', () => menu?.classList.toggle('hidden'));
  document.querySelectorAll('.menu-close').forEach(el => {
    el.addEventListener('click', () => menu?.classList.add('hidden'));
  });
</script>
```

**Step 3 : Vérifier visuellement**

```bash
npm run dev
```

Ouvrir `http://localhost:4321/Herac_Web` → navbar visible avec logo et liens.

**Step 4 : Commit**

```bash
git add src/
git commit -m "feat: add layout and navbar"
```

---

## Task 4 : Page principale + Section Hero

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/Hero.astro`

**Step 1 : Créer la section Hero**

Créer `src/components/Hero.astro` :

```astro
---
const base = import.meta.env.BASE_URL;
---

<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background image -->
  <div class="absolute inset-0">
    <img
      src={`${base}photos/hero-action.jpg`}
      alt="HERAC en action"
      class="w-full h-full object-cover object-top opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-herac-dark/60 via-transparent to-herac-dark"></div>
  </div>

  <!-- Red diagonal accent -->
  <div class="absolute bottom-0 left-0 right-0 h-1 bg-herac-red"></div>

  <!-- Content -->
  <div class="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
    <img
      src={`${base}logos/logo-herac-blanc.png`}
      alt="HERAC"
      class="h-32 md:h-40 w-auto mx-auto mb-8 drop-shadow-2xl"
    />
    <p class="text-gray-400 text-xs uppercase tracking-widest mb-4">Association loi 1901</p>
    <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-4 tracking-wide">
      L'EXCELLENCE PHYSIQUE
    </h1>
    <h2 class="font-display text-3xl md:text-5xl text-herac-red leading-none mb-8 tracking-wide">
      AU SERVICE DE L'ENGAGEMENT
    </h2>
    <p class="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
      Athlètes issus des forces de sécurité intérieure et de défense nationale.
      Sport de haut niveau, valeurs militaires.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#sponsoring" class="bg-herac-red text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-red-700 transition-colors">
        Devenir partenaire
      </a>
      <a href="#association" class="border border-white/30 text-white px-8 py-4 text-sm uppercase tracking-widest font-medium hover:border-herac-red hover:text-herac-red transition-colors">
        Découvrir l'association
      </a>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg class="w-6 h-6 text-herac-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>
```

**Step 2 : Créer la page index**

Remplacer `src/pages/index.astro` :

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout>
  <Hero />
</Layout>
```

**Step 3 : Vérifier visuellement**

```bash
npm run dev
```

Attendu : hero plein écran avec photo de fond, logo blanc, slogan rouge/blanc, deux boutons.

**Step 4 : Commit**

```bash
git add src/
git commit -m "feat: add hero section"
```

---

## Task 5 : Section Association

**Files:**
- Create: `src/components/Association.astro`
- Modify: `src/pages/index.astro`

**Step 1 : Créer la section**

Créer `src/components/Association.astro` :

```astro
<section id="association" class="py-24 bg-herac-dark">
  <div class="max-w-6xl mx-auto px-4">
    <!-- Header -->
    <div class="mb-16">
      <p class="text-herac-red text-xs uppercase tracking-widest font-bold mb-3">Qui sommes-nous</p>
      <h2 class="font-display text-4xl md:text-6xl text-white tracking-wide">L'ASSOCIATION</h2>
      <div class="w-16 h-1 bg-herac-red mt-4"></div>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Texte -->
      <div>
        <p class="text-gray-300 text-lg leading-relaxed mb-6">
          HERAC (Héraclès, saint patron des athlètes) est une association loi 1901 fondée par des
          athlètes issus des forces de sécurité intérieure et de défense nationale.
        </p>
        <p class="text-gray-300 leading-relaxed mb-6">
          Notre mission : soutenir des sportifs de haut niveau qui allient les exigences
          de leur engagement professionnel à des performances compétitives d'exception.
        </p>
        <p class="text-gray-400 leading-relaxed">
          Derrière chaque médaille se cache une discipline forgée dans l'uniforme,
          une rigueur que peu connaissent.
        </p>
      </div>

      <!-- Public cible -->
      <div class="bg-herac-gray p-8 border-l-4 border-herac-red">
        <h3 class="font-display text-2xl text-white tracking-wide mb-6">NOS MEMBRES</h3>
        <ul class="space-y-3">
          {[
            'Police nationale & municipale',
            'Gendarmerie nationale',
            'Armée de Terre, Air & Mer',
            'Sapeurs-Pompiers',
            'Douanes',
            'Administration pénitentiaire',
          ].map(item => (
            <li class="flex items-center gap-3 text-gray-300">
              <span class="w-2 h-2 bg-herac-red flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
```

**Step 2 : Ajouter dans index.astro**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Association from '../components/Association.astro';
---

<Layout>
  <Hero />
  <Association />
</Layout>
```

**Step 3 : Commit**

```bash
git add src/
git commit -m "feat: add association section"
```

---

## Task 6 : Section Palmarès

**Files:**
- Create: `src/components/Palmares.astro`
- Modify: `src/pages/index.astro`

**Step 1 : Créer la section**

Créer `src/components/Palmares.astro` :

```astro
---
const medals = [
  {
    color: 'or',
    event: 'Challenge DOLO(tte) — École Militaire',
    detail: 'Challenge femme + soulevé de terre mixte',
    athletes: 'Lucie (x2)',
    count: 2,
  },
  {
    color: 'or',
    event: 'Laser Run Police Nationale',
    detail: '1ère sur 26 en individuel',
    athletes: 'Lucie',
    count: 1,
  },
  {
    color: 'argent',
    event: 'HYROX Gendarmerie Nationale',
    detail: '2ème sur 28 équipes mixte',
    athletes: 'Lucie & Julien',
    count: 1,
  },
  {
    color: 'argent',
    event: 'HYROX Sapeurs-Pompiers Paris',
    detail: 'Équipes mixte',
    athletes: 'Lucie & Julien',
    count: 1,
  },
  {
    color: 'bronze',
    event: "Rox'PP Police Paris",
    detail: '3ème sur 34 équipes mixte',
    athletes: 'Lucie & Julien',
    count: 1,
  },
];

const colorStyles: Record<string, { bg: string; text: string; border: string; emoji: string }> = {
  or:     { bg: 'bg-yellow-900/20', text: 'text-yellow-400', border: 'border-yellow-500/30', emoji: '🥇' },
  argent: { bg: 'bg-gray-700/20',   text: 'text-gray-300',   border: 'border-gray-400/30',   emoji: '🥈' },
  bronze: { bg: 'bg-orange-900/20', text: 'text-orange-400', border: 'border-orange-500/30', emoji: '🥉' },
};
---

<section id="palmares" class="py-24 bg-herac-gray">
  <div class="max-w-6xl mx-auto px-4">
    <div class="mb-16">
      <p class="text-herac-red text-xs uppercase tracking-widest font-bold mb-3">Résultats</p>
      <h2 class="font-display text-4xl md:text-6xl text-white tracking-wide">PALMARÈS 2025</h2>
      <div class="w-16 h-1 bg-herac-red mt-4"></div>
    </div>

    <!-- Stat résumé -->
    <div class="grid grid-cols-3 gap-4 mb-12">
      <div class="text-center">
        <p class="font-display text-5xl text-yellow-400">3</p>
        <p class="text-gray-400 text-xs uppercase tracking-widest mt-1">Or</p>
      </div>
      <div class="text-center">
        <p class="font-display text-5xl text-gray-300">2</p>
        <p class="text-gray-400 text-xs uppercase tracking-widest mt-1">Argent</p>
      </div>
      <div class="text-center">
        <p class="font-display text-5xl text-orange-400">1</p>
        <p class="text-gray-400 text-xs uppercase tracking-widest mt-1">Bronze</p>
      </div>
    </div>

    <!-- Liste médailles -->
    <div class="space-y-4">
      {medals.map(medal => {
        const style = colorStyles[medal.color];
        return (
          <div class={`flex items-start gap-6 p-6 border ${style.border} ${style.bg}`}>
            <span class="text-3xl flex-shrink-0">{style.emoji}</span>
            <div class="flex-1">
              <p class={`font-display text-xl tracking-wide ${style.text}`}>{medal.event}</p>
              <p class="text-gray-400 text-sm mt-1">{medal.detail}</p>
            </div>
            <p class="text-gray-500 text-sm flex-shrink-0">{medal.athletes}</p>
          </div>
        );
      })}
    </div>
  </div>
</section>
```

**Step 2 : Ajouter dans index.astro**

Importer et ajouter `<Palmares />` après `<Association />`.

**Step 3 : Commit**

```bash
git add src/
git commit -m "feat: add palmares section"
```

---

## Task 7 : Section Équipe

**Files:**
- Create: `src/components/Equipe.astro`
- Modify: `src/pages/index.astro`

**Step 1 : Créer la section**

Créer `src/components/Equipe.astro` :

```astro
---
const base = import.meta.env.BASE_URL;

const members = [
  {
    name: 'Julien CHEVALIER',
    role: 'Président',
    photo: `${base}photos/photo-2.jpg`,
    tags: ['Officier de police nationale', 'Sapeur-pompier volontaire', '25 ans coaching sportif'],
    services: 'Coaching sportif : préparation physique, renforcement, dépassement de soi',
  },
  {
    name: 'Lucie BEYLOUNEH',
    role: 'Trésorière',
    photo: `${base}photos/lucie-medailles.jpg`,
    tags: ['Officier de police nationale', 'Réserviste Armée de Terre (caporale-chef)', 'Diplômée PSC1, SC1, PSE-1, PSE-2'],
    services: 'Formatrice secourisme : PSC1, SC1, PSE-1, PSE-2',
  },
];
---

<section id="equipe" class="py-24 bg-herac-dark">
  <div class="max-w-6xl mx-auto px-4">
    <div class="mb-16">
      <p class="text-herac-red text-xs uppercase tracking-widest font-bold mb-3">Les fondateurs</p>
      <h2 class="font-display text-4xl md:text-6xl text-white tracking-wide">L'ÉQUIPE</h2>
      <div class="w-16 h-1 bg-herac-red mt-4"></div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      {members.map(member => (
        <div class="bg-herac-gray overflow-hidden group">
          <div class="relative h-80 overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-herac-gray to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <p class="text-herac-red text-xs uppercase tracking-widest mb-1">{member.role}</p>
              <h3 class="font-display text-2xl text-white tracking-wide">{member.name}</h3>
            </div>
          </div>
          <div class="p-6">
            <ul class="space-y-2 mb-4">
              {member.tags.map(tag => (
                <li class="flex items-start gap-2 text-gray-400 text-sm">
                  <span class="w-1.5 h-1.5 bg-herac-red mt-1.5 flex-shrink-0"></span>
                  {tag}
                </li>
              ))}
            </ul>
            <p class="text-gray-300 text-sm border-t border-white/10 pt-4">{member.services}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Step 2 : Ajouter dans index.astro**

Importer et ajouter `<Equipe />` après `<Palmares />`.

**Step 3 : Commit**

```bash
git add src/
git commit -m "feat: add equipe section"
```

---

## Task 8 : Section Services

**Files:**
- Create: `src/components/Services.astro`
- Modify: `src/pages/index.astro`

**Step 1 : Créer la section**

Créer `src/components/Services.astro` :

```astro
<section id="services" class="py-24 bg-herac-gray">
  <div class="max-w-6xl mx-auto px-4">
    <div class="mb-16">
      <p class="text-herac-red text-xs uppercase tracking-widest font-bold mb-3">Pour les entreprises</p>
      <h2 class="font-display text-4xl md:text-6xl text-white tracking-wide">NOS SERVICES</h2>
      <div class="w-16 h-1 bg-herac-red mt-4"></div>
      <p class="text-gray-400 mt-6 max-w-2xl">
        Financez l'association via des prestations concrètes à valeur ajoutée pour vos équipes.
        Intégrables dans un contrat de sponsoring avec avantage fiscal.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Formations secourisme -->
      <div class="bg-herac-dark p-8 border border-herac-red/20 hover:border-herac-red/60 transition-colors">
        <div class="w-12 h-12 bg-herac-red flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="font-display text-2xl text-white tracking-wide mb-3">FORMATIONS SECOURISME</h3>
        <p class="text-gray-400 text-sm mb-6">Par Lucie BEYLOUNEH — Formatrice certifiée</p>
        <ul class="space-y-3">
          {[
            'PSC1 — Premiers Secours Civiques niveau 1',
            'SC1 — Secourisme au Combat niveau 1',
            'PSE-1 — Premiers Secours en Équipe niveau 1',
            'PSE-2 — Premiers Secours en Équipe niveau 2',
          ].map(item => (
            <li class="flex items-start gap-3 text-gray-300 text-sm">
              <span class="w-2 h-2 bg-herac-red flex-shrink-0 mt-1.5"></span>
              {item}
            </li>
          ))}
        </ul>
        <p class="text-gray-500 text-xs mt-6 pt-4 border-t border-white/10">
          SST (Santé Sécurité au Travail) — Priorité réglementaire pour les entreprises
        </p>
      </div>

      <!-- Coaching sportif -->
      <div class="bg-herac-dark p-8 border border-herac-red/20 hover:border-herac-red/60 transition-colors">
        <div class="w-12 h-12 bg-herac-red flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="font-display text-2xl text-white tracking-wide mb-3">COACHING SPORTIF</h3>
        <p class="text-gray-400 text-sm mb-6">Par Julien CHEVALIER — 25 ans d'expérience</p>
        <ul class="space-y-3">
          {[
            'Préparation physique sur-mesure',
            'Renforcement musculaire et fonctionnel',
            'Programmes adaptés aux équipes d\'entreprise',
            'Accompagnement mental — dépassement de soi',
          ].map(item => (
            <li class="flex items-start gap-3 text-gray-300 text-sm">
              <span class="w-2 h-2 bg-herac-red flex-shrink-0 mt-1.5"></span>
              {item}
            </li>
          ))}
        </ul>
        <p class="text-gray-500 text-xs mt-6 pt-4 border-t border-white/10">
          Expérience avec personnalités et athlètes de haut niveau
        </p>
      </div>
    </div>

    <div class="mt-8 bg-herac-red/10 border border-herac-red/30 p-6 text-center">
      <p class="text-white font-medium">
        Ces prestations peuvent être intégrées dans un contrat de sponsoring —
        <span class="text-herac-red font-bold">avantage fiscal pour l'entreprise</span>
      </p>
    </div>
  </div>
</section>
```

**Step 2 : Ajouter dans index.astro**

Importer et ajouter `<Services />` après `<Equipe />`.

**Step 3 : Commit**

```bash
git add src/
git commit -m "feat: add services section"
```

---

## Task 9 : Section Sponsoring

**Files:**
- Create: `src/components/Sponsoring.astro`
- Modify: `src/pages/index.astro`

**Step 1 : Créer la section**

Créer `src/components/Sponsoring.astro` :

```astro
<section id="sponsoring" class="py-24 bg-herac-dark">
  <div class="max-w-6xl mx-auto px-4">
    <div class="mb-16">
      <p class="text-herac-red text-xs uppercase tracking-widest font-bold mb-3">Partenariat</p>
      <h2 class="font-display text-4xl md:text-6xl text-white tracking-wide">OFFRE SPONSOR</h2>
      <div class="w-16 h-1 bg-herac-red mt-4"></div>
      <p class="text-gray-400 mt-6 max-w-2xl">
        Associez votre image à l'excellence sportive des forces de sécurité.
        Un partenariat fort, authentique, porteur de valeurs.
      </p>
    </div>

    <!-- Avantages -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[
        {
          title: 'Visibilité compétition',
          desc: 'Votre logo sur les tenues de Lucie et Julien lors de chaque compétition officielle.',
          icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        },
        {
          title: 'Réseaux sociaux',
          desc: 'Mentions régulières sur Instagram @herac_officiel avec vos visuels.',
          icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14',
        },
        {
          title: 'Médias & interviews',
          desc: 'Mention de vos partenaires lors de nos interventions presse et médias.',
          icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
        },
        {
          title: 'Avantage fiscal',
          desc: 'Le mécénat d\'une association loi 1901 est déductible fiscalement pour l\'entreprise.',
          icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z',
        },
      ].map(item => (
        <div class="bg-herac-gray p-6 text-center">
          <div class="w-12 h-12 bg-herac-red mx-auto flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
            </svg>
          </div>
          <h3 class="font-display text-lg text-white tracking-wide mb-2">{item.title}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    <!-- CTA -->
    <div class="text-center">
      <a
        href="mailto:herac.officiel@gmail.com?subject=Partenariat HERAC"
        class="inline-block bg-herac-red text-white px-10 py-5 font-display text-xl tracking-widest hover:bg-red-700 transition-colors"
      >
        NOUS CONTACTER
      </a>
      <p class="text-gray-500 text-sm mt-4">herac.officiel@gmail.com</p>
    </div>
  </div>
</section>
```

**Step 2 : Ajouter dans index.astro**

Importer et ajouter `<Sponsoring />` après `<Services />`.

**Step 3 : Commit**

```bash
git add src/
git commit -m "feat: add sponsoring section"
```

---

## Task 10 : Section Contact

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`

**Step 1 : Créer la section**

Créer `src/components/Contact.astro` :

```astro
<section id="contact" class="py-24 bg-herac-gray">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <div class="mb-12">
      <p class="text-herac-red text-xs uppercase tracking-widest font-bold mb-3">Nous écrire</p>
      <h2 class="font-display text-4xl md:text-6xl text-white tracking-wide">CONTACT</h2>
      <div class="w-16 h-1 bg-herac-red mt-4 mx-auto"></div>
    </div>

    <div class="grid sm:grid-cols-2 gap-6">
      <a
        href="mailto:herac.officiel@gmail.com"
        class="bg-herac-dark p-8 border border-white/10 hover:border-herac-red/50 transition-colors group"
      >
        <div class="w-12 h-12 bg-herac-red mx-auto flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="text-gray-400 text-xs uppercase tracking-widest mb-2">Email</p>
        <p class="text-white font-medium">herac.officiel@gmail.com</p>
      </a>

      <a
        href="https://instagram.com/herac_officiel"
        target="_blank"
        rel="noopener noreferrer"
        class="bg-herac-dark p-8 border border-white/10 hover:border-herac-red/50 transition-colors group"
      >
        <div class="w-12 h-12 bg-herac-red mx-auto flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        <p class="text-gray-400 text-xs uppercase tracking-widest mb-2">Instagram</p>
        <p class="text-white font-medium">@herac_officiel</p>
      </a>
    </div>
  </div>
</section>
```

**Step 2 : Ajouter dans index.astro**

Importer et ajouter `<Contact />` après `<Sponsoring />`.

**Step 3 : Commit**

```bash
git add src/
git commit -m "feat: add contact section"
```

---

## Task 11 : Configuration GitHub Pages + GitHub Actions

**Files:**
- Create: `.github/workflows/deploy.yml`
- Verify: `astro.config.mjs` (base URL correct)

**Step 1 : Vérifier le username GitHub**

```bash
git remote -v
```

Récupérer le username GitHub depuis l'URL du remote. Mettre à jour `astro.config.mjs` si besoin :

```js
export default defineConfig({
  site: 'https://<USERNAME>.github.io',
  base: '/Herac_Web',
  // ...
});
```

**Step 2 : Créer le workflow GitHub Actions**

Créer `.github/workflows/deploy.yml` (depuis la racine du repo, pas depuis source/) :

```bash
mkdir -p /c/Users/Guill/source/repos/Herac_Web/.github/workflows
```

Créer `/c/Users/Guill/source/repos/Herac_Web/.github/workflows/deploy.yml` :

```yaml
name: Deploy HERAC to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm
          cache-dependency-path: source/package-lock.json
      - name: Install deps
        run: npm ci
        working-directory: source
      - name: Build
        run: npm run build
        working-directory: source
      - uses: actions/upload-pages-artifact@v3
        with:
          path: source/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

**Step 3 : Build local de vérification**

```bash
npm run build
```

Attendu : dossier `dist/` créé sans erreur.

**Step 4 : Commit depuis la racine du repo**

```bash
cd /c/Users/Guill/source/repos/Herac_Web
git add .github/ source/
git commit -m "feat: add GitHub Actions deploy workflow"
```

---

## Task 12 : Activation GitHub Pages + Premier déploiement

**Step 1 : Vérifier que le repo est bien sur GitHub**

```bash
git remote -v
```

Si pas de remote, ajouter :

```bash
git remote add origin https://github.com/<USERNAME>/Herac_Web.git
```

**Step 2 : Activer GitHub Pages dans les Settings**

Sur GitHub.com → Repo Settings → Pages :
- Source : **GitHub Actions**

**Step 3 : Push**

```bash
git push -u origin main
```

**Step 4 : Vérifier le déploiement**

- Aller sur l'onglet **Actions** du repo GitHub
- Attendre que le workflow `Deploy HERAC to GitHub Pages` passe ✅
- Ouvrir `https://<USERNAME>.github.io/Herac_Web`

---

## Task 13 : Vérification finale et ajustements

**Step 1 : Checklist visuelle**

- [ ] Navbar fixe, liens scroll smooth
- [ ] Menu mobile burger fonctionnel
- [ ] Hero plein écran avec photo + logo + slogan
- [ ] Section Association lisible
- [ ] Palmarès 2025 complet et exact
- [ ] Cartes équipe avec photos
- [ ] Services bien détaillés
- [ ] Offre sponsor avec CTA email
- [ ] Contact avec liens email + Instagram
- [ ] Footer HERAC

**Step 2 : Vérification responsive**

Tester en 375px (mobile), 768px (tablette), 1280px (desktop).

**Step 3 : Vérification meta/SEO de base**

- Title correct
- Meta description présente
- Favicon logo HERAC

**Step 4 : Commit final**

```bash
git add .
git commit -m "feat: complete HERAC website v1"
git push
```

---

## Résultat attendu

Site one-page accessible sur `https://<USERNAME>.github.io/Herac_Web` avec :
- Design martial rouge/noir professionnel
- Contenu complet issu des vrais documents HERAC
- Toutes les photos du flyer exploitées
- Prêt pour ajout d'un domaine custom plus tard

