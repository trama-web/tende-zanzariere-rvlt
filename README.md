# Tende Zanzariere RV/LT

Landing page statica per RV/LT, adattata a partire dal template HTML `Roger` e rifinita per presentare servizi di tende da sole, zanzariere, tapparelle, automazioni, porte e riparazioni.

Repository GitHub:
`https://github.com/trama-web/tende-zanzariere-rvlt`

## Stack

- Vite
- TypeScript
- HTML statico in `index.html`
- Asset del template in `public/roger/assets`
- Asset fotografici e placeholder in `public/`

## Struttura

- `index.html`: landing principale con tutte le sezioni e gli script del template
- `public/roger/assets/css/custom.css`: override visivi e responsive
- `public/`: immagini del sito e placeholder SVG
- `src/`: codice React originario del progetto, non più usato per la homepage corrente

## Avvio locale

```bash
npm install
npm run dev
```

Build produzione:

```bash
npm run build
```

Preview locale della build:

```bash
npm run preview
```

## Note pratiche

- La homepage corrente usa il template HTML direttamente, non il rendering React.
- Alcune immagini sono ancora placeholder o asset temporanei da sostituire con materiale definitivo.
- Il form contatti usa `formsubmit` come soluzione rapida.

## Deploy

Il progetto è pensato per essere distribuito come sito statico. Il deploy può essere fatto direttamente su Vercel.
