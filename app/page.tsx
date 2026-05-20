'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Metric, metricLabels, districts } from '@/app/data/districts';
import Sidebar from '@/app/components/Sidebar';
import MetricToggle from '@/app/components/MetricToggle';
import { getMetricRange, STOPS } from '@/app/lib/colors';

const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });

export default function Home() {
  const [metric, setMetric] = useState<Metric>('avgRent');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const range = getMetricRange(metric);
  const meta = metricLabels[metric];

  return (
    <main className="h-screen w-screen flex flex-col bg-slate-50">

      <header className="flex-shrink-0 px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
            B
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-none">MarketPulse Berlin</h1>
            <p className="text-xs text-slate-500 mt-0.5">12 Bezirke · real-estate &amp; demographic data</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">Color by</span>
          <MetricToggle metric={metric} onChange={setMetric} />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">

        <div className="flex-1 relative">
          <Map
            metric={metric}
            selectedDistrict={selectedDistrict}
            onSelect={setSelectedDistrict}
          />

          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-lg border border-slate-200 shadow-sm p-3 z-10">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
              {meta.label}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {STOPS.map((c, i) => (
                  <div key={i} className="w-6 h-3" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-600 mt-1 font-mono">
              <span>{meta.format(range.min)}</span>
              <span>{meta.format(range.max)}</span>
            </div>
          </div>

          {!selectedDistrict && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur rounded-full border border-slate-200 shadow-sm px-4 py-2 z-10 text-xs text-slate-600 font-medium">
              Click any district to explore
            </div>
          )}

          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-full border border-slate-200 shadow-sm px-3 py-1.5 z-10 text-[11px] text-slate-700 font-medium">
            {Object.keys(districts).length} districts
          </div>
        </div>

        <div className="hidden lg:block w-[420px] flex-shrink-0">
          <Sidebar selectedDistrict={selectedDistrict} metric={metric} />
        </div>
      </div>

      <div className="lg:hidden bg-white border-t border-slate-200 overflow-y-auto" style={{ maxHeight: '40vh' }}>
        <Sidebar selectedDistrict={selectedDistrict} metric={metric} />
      </div>
    </main>
  );
}
