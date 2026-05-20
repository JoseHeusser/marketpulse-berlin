'use client';

import { useEffect, useRef } from 'react';
import maplibregl, { Map as MapLibreMap, MapMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { mapStyle, BERLIN_BOUNDS } from '@/app/lib/map-style';
import { buildFillColorExpression } from '@/app/lib/colors';
import { Metric } from '@/app/data/districts';

type Props = {
  metric: Metric;
  selectedDistrict: string | null;
  onSelect: (name: string | null) => void;
};

export default function MapComponent({ metric, selectedDistrict, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const initializedRef = useRef(false);

  // Init map once.
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;
    initializedRef.current = true;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      bounds: BERLIN_BOUNDS,
      fitBoundsOptions: { padding: 40 },
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', async () => {
      const res = await fetch('/data/berlin-bezirke.geojson');
      const geojson = await res.json();

      map.addSource('bezirke', { type: 'geojson', data: geojson, promoteId: 'cartodb_id' });

      // Fill layer with metric-based color
      map.addLayer({
        id: 'bezirke-fill',
        type: 'fill',
        source: 'bezirke',
        paint: {
          'fill-color': buildFillColorExpression(metric) as unknown as string,
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false], 0.85,
            0.7,
          ],
        },
      });

      // Outline
      map.addLayer({
        id: 'bezirke-outline',
        type: 'line',
        source: 'bezirke',
        paint: {
          'line-color': '#ffffff',
          'line-width': 1.5,
        },
      });

      // Selected outline (drawn on top, conditional)
      map.addLayer({
        id: 'bezirke-selected-outline',
        type: 'line',
        source: 'bezirke',
        paint: {
          'line-color': '#1e293b',
          'line-width': 3,
        },
        filter: ['==', ['get', 'name'], ''],
      });

      // Hover state
      let hoveredId: number | string | undefined;
      map.on('mousemove', 'bezirke-fill', (e: MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
        if (!e.features || e.features.length === 0) return;
        map.getCanvas().style.cursor = 'pointer';
        const feat = e.features[0];
        if (hoveredId !== undefined) {
          map.setFeatureState({ source: 'bezirke', id: hoveredId }, { hover: false });
        }
        hoveredId = feat.id;
        if (hoveredId !== undefined) {
          map.setFeatureState({ source: 'bezirke', id: hoveredId }, { hover: true });
        }
      });

      map.on('mouseleave', 'bezirke-fill', () => {
        map.getCanvas().style.cursor = '';
        if (hoveredId !== undefined) {
          map.setFeatureState({ source: 'bezirke', id: hoveredId }, { hover: false });
        }
        hoveredId = undefined;
      });

      // Click handler
      map.on('click', 'bezirke-fill', (e: MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
        if (!e.features || e.features.length === 0) return;
        const name = e.features[0].properties?.name as string;
        if (name) onSelect(name);
      });

      // Add district labels
      map.addLayer({
        id: 'bezirke-labels',
        type: 'symbol',
        source: 'bezirke',
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Noto Sans Regular'],
          'text-size': 11,
          'text-allow-overlap': false,
          'text-ignore-placement': false,
        },
        paint: {
          'text-color': '#1e293b',
          'text-halo-color': 'rgba(255,255,255,0.95)',
          'text-halo-width': 1.5,
        },
      }).setLayoutProperty('bezirke-labels', 'visibility', 'visible');
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      initializedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update fill color when metric changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getLayer('bezirke-fill')) return;
    map.setPaintProperty(
      'bezirke-fill',
      'fill-color',
      buildFillColorExpression(metric) as unknown as string
    );
  }, [metric]);

  // Update selected outline filter when selectedDistrict changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getLayer('bezirke-selected-outline')) return;
    map.setFilter('bezirke-selected-outline', ['==', ['get', 'name'], selectedDistrict ?? '']);
  }, [selectedDistrict]);

  return <div ref={containerRef} className="w-full h-full" />;
}
