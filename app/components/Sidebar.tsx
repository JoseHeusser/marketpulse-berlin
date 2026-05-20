'use client';

import { districts, formatNumber, Metric, metricLabels } from '@/app/data/districts';

type Props = {
  selectedDistrict: string | null;
  metric: Metric;
};

const trendBadge: Record<string, { label: string; cls: string }> = {
  rising:  { label: '▲ Rising',  cls: 'text-rose-700 bg-rose-50 border-rose-200' },
  stable:  { label: '◆ Stable',  cls: 'text-slate-700 bg-slate-50 border-slate-200' },
  cooling: { label: '▼ Cooling', cls: 'text-blue-700 bg-blue-50 border-blue-200' },
};

const vibeClass: Record<string, string> = {
  central:    'bg-violet-100 text-violet-700 border-violet-200',
  creative:   'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  upscale:    'bg-amber-100 text-amber-700 border-amber-200',
  family:     'bg-emerald-100 text-emerald-700 border-emerald-200',
  industrial: 'bg-slate-100 text-slate-700 border-slate-200',
  mixed:      'bg-indigo-100 text-indigo-700 border-indigo-200',
  suburban:   'bg-teal-100 text-teal-700 border-teal-200',
};

export default function Sidebar({ selectedDistrict, metric }: Props) {
  if (!selectedDistrict) {
    return (
      <aside className="h-full overflow-y-auto p-8 bg-white border-l border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs text-indigo-600">MarketPulse Berlin</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Explore Berlin&apos;s 12 Bezirke
        </h1>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
          Click any district on the map to see real-estate stats, commercial
          profile, and notable features. Use the metric switcher above the map
          to recolor the choropleth by average rent, population density, or
          total population.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Data sources</h3>
            <ul className="text-sm text-slate-700 space-y-1.5">
              <li>• <a href="https://daten.berlin.de" target="_blank" rel="noopener" className="text-indigo-600 hover:underline">Berlin Open Data</a> — districts, boundaries</li>
              <li>• Statistisches Landesamt — population, area</li>
              <li>• Berlin Mietspiegel 2024/2025 — rent indices</li>
              <li>• <a href="https://github.com/funkeinteraktiv/Berlin-Geodaten" target="_blank" rel="noopener" className="text-indigo-600 hover:underline">funke-interaktiv Geodaten</a> — GeoJSON</li>
            </ul>
          </div>

          <div className="text-xs text-slate-500 leading-relaxed mt-8 pt-6 border-t border-slate-200">
            Build by <a href="https://github.com/JoseHeusser" target="_blank" rel="noopener" className="text-indigo-600 hover:underline">Jose Heusser</a> · Next.js + MapLibre · No tracking, no LLM, no backend.
          </div>
        </div>
      </aside>
    );
  }

  const d = districts[selectedDistrict];
  if (!d) {
    return (
      <aside className="h-full overflow-y-auto p-8 bg-white border-l border-slate-200">
        <p className="text-sm text-slate-600">No data for {selectedDistrict}.</p>
      </aside>
    );
  }

  const trend = trendBadge[d.rentTrend];
  const vibe = vibeClass[d.vibe] ?? vibeClass.mixed;

  return (
    <aside className="h-full overflow-y-auto p-8 bg-white border-l border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-xs text-indigo-600">/ Bezirk</span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${vibe}`}>
          {d.vibe}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{d.name}</h2>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{d.profile}</p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <Stat label="Population" value={`${(d.population / 1000).toFixed(0)}k`} sub={`${formatNumber(d.population)} inhabitants`} highlight={metric === 'population'} />
        <Stat label="Area" value={`${d.area.toFixed(1)} km²`} sub={`${(d.area * 100).toFixed(0)} ha`} />
        <Stat label="Density" value={`${(d.density / 1000).toFixed(1)}k`} sub="people / km²" highlight={metric === 'density'} />
        <Stat
          label="Avg rent"
          value={`€${d.avgRent.toFixed(1)}`}
          sub="€/m² Kaltmiete"
          highlight={metric === 'avgRent'}
          accessory={
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${trend.cls}`}>
              {trend.label}
            </span>
          }
        />
      </div>

      {/* Commercial real estate insight */}
      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Commercial real estate</h3>
        <p className="text-sm text-slate-700 leading-relaxed">{d.commercialNotes}</p>
      </div>

      {/* Landmarks */}
      <div className="mt-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Notable features</h3>
        <div className="flex flex-wrap gap-1.5">
          {d.landmarks.map(l => (
            <span key={l} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200">
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-400 mt-8 pt-6 border-t border-slate-200">
        Sources: Statistisches Landesamt Berlin-Brandenburg · Mietspiegel · Berlin Open Data
      </div>
    </aside>
  );
}

function Stat({
  label,
  value,
  sub,
  highlight,
  accessory,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  accessory?: React.ReactNode;
}) {
  return (
    <div className={`p-3 rounded-lg border ${highlight ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
        {accessory}
      </div>
      <p className={`text-xl font-bold mt-1 ${highlight ? 'text-indigo-700' : 'text-slate-900'}`}>{value}</p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </div>
  );
}
