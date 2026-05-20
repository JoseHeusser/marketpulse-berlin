// Color scale utilities for choropleth rendering.

import { districts, Metric } from '@/app/data/districts';

// Linear interpolation between two hex colors.
function lerpColor(a: string, b: string, t: number): string {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}

// 5-stop sequential scale from cool (low) to warm (high).
const STOPS = ['#dbeafe', '#a5b4fc', '#818cf8', '#6366f1', '#3730a3'];

export function getMetricRange(metric: Metric): { min: number; max: number } {
  const values = Object.values(districts).map(d => d[metric]);
  return { min: Math.min(...values), max: Math.max(...values) };
}

export function colorFor(value: number, min: number, max: number): string {
  if (max === min) return STOPS[2];
  const t = (value - min) / (max - min);
  const i = Math.min(STOPS.length - 2, Math.floor(t * (STOPS.length - 1)));
  const localT = t * (STOPS.length - 1) - i;
  return lerpColor(STOPS[i], STOPS[i + 1], localT);
}

// Build a MapLibre data-driven paint expression for fill-color.
// Each feature in the geojson must have a `name` property matching the districts keys.
export function buildFillColorExpression(metric: Metric): unknown[] {
  const { min, max } = getMetricRange(metric);
  // 'match' against district name, mapping to a precomputed color.
  const expr: unknown[] = ['match', ['get', 'name']];
  for (const [key, stats] of Object.entries(districts)) {
    expr.push(key, colorFor(stats[metric], min, max));
  }
  expr.push('#cbd5e1'); // fallback grey
  return expr;
}

export { STOPS };
