'use client';

import { Metric } from '@/app/data/districts';

type Props = {
  metric: Metric;
  onChange: (m: Metric) => void;
};

const METRICS: { key: Metric; label: string }[] = [
  { key: 'avgRent',    label: 'Avg rent' },
  { key: 'density',    label: 'Density' },
  { key: 'population', label: 'Population' },
];

export default function MetricToggle({ metric, onChange }: Props) {
  return (
    <div className="inline-flex p-1 rounded-lg bg-slate-100 border border-slate-200">
      {METRICS.map(m => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
            metric === m.key
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
