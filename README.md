# MarketPulse Berlin

Interactive choropleth map of Berlin's 12 Bezirke, showing real-estate and demographic data with a click-to-explore detail panel.

> 🔗 **Live:** _[add deployment URL]_

## What it shows

For each of the 12 Berlin districts:

- Population, area, density
- Average residential rent (€/m² Kaltmiete, Mietspiegel reference)
- Rent trend (rising, stable, cooling)
- Commercial real-estate profile and notable features
- Character / vibe (central, creative, upscale, family, industrial, mixed, suburban)

A metric toggle recolors the choropleth by average rent, density, or population.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Map:** [MapLibre GL JS](https://maplibre.org/) with free CARTO Positron raster tiles
- **Styling:** Tailwind CSS 4
- **Deployment:** Vercel

No backend, no database, no LLM, no API key required.

## Architecture

```
app/
├── data/
│   └── districts.ts        # 12 districts × stats + commercial notes
├── lib/
│   ├── map-style.ts        # MapLibre style (CARTO Positron raster)
│   └── colors.ts           # sequential color scale + paint expression
├── components/
│   ├── Map.tsx             # MapLibre map (client)
│   ├── Sidebar.tsx         # district detail panel
│   └── MetricToggle.tsx    # rent / density / population switcher
├── page.tsx                # main layout
├── layout.tsx              # metadata + fonts
└── globals.css             # Tailwind + MapLibre overrides

public/
└── data/
    └── berlin-bezirke.geojson   # 12 Bezirke as MultiPolygons
```

## Data sources

- [Berlin Open Data](https://daten.berlin.de) for districts and boundaries
- Statistisches Landesamt Berlin-Brandenburg for population and area
- Berlin Mietspiegel 2024/2025 for rent indices
- [funke-interaktiv Geodaten](https://github.com/funkeinteraktiv/Berlin-Geodaten) for the GeoJSON

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## License

MIT.

---

Built by [Jose Heusser](https://github.com/JoseHeusser) using Claude Code and Cursor.
