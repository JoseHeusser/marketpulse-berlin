// Minimal MapLibre style using free CARTO Positron raster tiles.
// No API key required. Attribution shown automatically by MapLibre.

import type { StyleSpecification } from 'maplibre-gl';

export const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    'carto-light': {
      type: 'raster',
      tiles: [
        'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        'https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        'https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [
    { id: 'background', type: 'background', paint: { 'background-color': '#f8fafc' } },
    { id: 'carto-tiles', type: 'raster', source: 'carto-light' },
  ],
};

export const BERLIN_BOUNDS: [[number, number], [number, number]] = [
  [13.085, 52.34], // SW
  [13.770, 52.68], // NE
];
