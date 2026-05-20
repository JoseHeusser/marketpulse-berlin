// Berlin Bezirke (districts) — stats compiled from public sources:
// - Statistisches Landesamt Berlin-Brandenburg (population, area)
// - Berlin Mietspiegel 2024/2025 (rent indices)
// - Wikipedia / Berlin Open Data (character, landmarks)

export type DistrictStats = {
  name: string;
  // Demographics
  population: number;       // Einwohner
  area: number;             // km²
  density: number;          // Einwohner / km²
  // Real estate
  avgRent: number;          // €/m² Kaltmiete (Mietspiegel reference)
  rentTrend: 'rising' | 'stable' | 'cooling';
  // Character
  profile: string;          // Short 1-sentence character
  commercialNotes: string;  // 2-3 sentence commercial real estate insight
  landmarks: string[];      // Notable features / landmarks
  vibe: 'central' | 'creative' | 'upscale' | 'family' | 'industrial' | 'mixed' | 'suburban';
};

export const districts: Record<string, DistrictStats> = {
  'Mitte': {
    name: 'Mitte',
    population: 391_000,
    area: 39.5,
    density: 9_900,
    avgRent: 17.2,
    rentTrend: 'rising',
    profile: 'Berlin\'s commercial and political heart — government, finance, retail, tourism converge here.',
    commercialNotes: 'High-rent commercial corridor anchored by Friedrichstraße, Unter den Linden and Alexanderplatz. Strong office demand from government, finance and law. Foot traffic dominated by tourists and weekday commuters.',
    landmarks: ['Brandenburger Tor', 'Alexanderplatz', 'Friedrichstraße', 'Hauptbahnhof'],
    vibe: 'central',
  },
  'Friedrichshain-Kreuzberg': {
    name: 'Friedrichshain-Kreuzberg',
    population: 297_000,
    area: 20.4,
    density: 14_600,
    avgRent: 16.1,
    rentTrend: 'rising',
    profile: 'Berlin\'s most densely populated district — tech, creative, nightlife and a young population.',
    commercialNotes: 'Dominant cluster for tech startups, agencies and creative offices. Strong hospitality and F&B base. The Mediaspree corridor along the Spree concentrates large-floorplate occupiers (Mercedes-Benz, Zalando, Universal).',
    landmarks: ['East Side Gallery', 'Mediaspree', 'Görlitzer Park', 'Kottbusser Tor'],
    vibe: 'creative',
  },
  'Pankow': {
    name: 'Pankow',
    population: 410_000,
    area: 103.0,
    density: 4_000,
    avgRent: 13.4,
    rentTrend: 'rising',
    profile: 'Berlin\'s most populated district — includes Prenzlauer Berg (gentrified, family) and quieter green sub-districts.',
    commercialNotes: 'Prenzlauer Berg drives demand for small-floorplate offices and high-end retail. Northern sub-districts (Weißensee, Buch) offer mid-tier commercial space and quieter rents. Strong family demographic supports retail and services.',
    landmarks: ['Prenzlauer Berg', 'Mauerpark', 'Schönhauser Allee', 'Helios Klinikum'],
    vibe: 'family',
  },
  'Charlottenburg-Wilmersdorf': {
    name: 'Charlottenburg-Wilmersdorf',
    population: 343_000,
    area: 64.7,
    density: 5_300,
    avgRent: 14.8,
    rentTrend: 'stable',
    profile: 'Berlin\'s upscale west — established commercial corridors, premium retail, mature office market.',
    commercialNotes: 'Kurfürstendamm remains the prime luxury retail spine. Established office stock along Hardenbergstraße and around Bahnhof Zoo. Mature market with lower volatility than the east — preferred by traditional finance, law and corporate tenants.',
    landmarks: ['Kurfürstendamm', 'Schloss Charlottenburg', 'KaDeWe', 'Bahnhof Zoo'],
    vibe: 'upscale',
  },
  'Spandau': {
    name: 'Spandau',
    population: 248_000,
    area: 91.9,
    density: 2_700,
    avgRent: 10.4,
    rentTrend: 'stable',
    profile: 'Berlin\'s northwest gateway — historic Altstadt, large industrial sites, suburban residential.',
    commercialNotes: 'Lower-cost commercial and industrial space, including the Siemensstadt brownfield (currently being redeveloped as a major Siemens mixed-use campus). Logistics and light industry remain anchors. Resi rents 35–40% below Mitte.',
    landmarks: ['Zitadelle Spandau', 'Altstadt Spandau', 'Siemensstadt', 'Havel'],
    vibe: 'industrial',
  },
  'Steglitz-Zehlendorf': {
    name: 'Steglitz-Zehlendorf',
    population: 312_000,
    area: 102.0,
    density: 3_100,
    avgRent: 13.2,
    rentTrend: 'stable',
    profile: 'Berlin\'s wealthy southwest — leafy, residential, lake-adjacent, university campuses.',
    commercialNotes: 'Predominantly residential with low commercial intensity. Steglitz\'s Schloßstraße is a strong neighborhood retail corridor. Freie Universität and Helmholtz centers drive professional services demand. Premium villa market in Zehlendorf and Wannsee.',
    landmarks: ['Schloßstraße', 'Freie Universität', 'Wannsee', 'Botanischer Garten'],
    vibe: 'upscale',
  },
  'Tempelhof-Schöneberg': {
    name: 'Tempelhof-Schöneberg',
    population: 354_000,
    area: 53.1,
    density: 6_700,
    avgRent: 14.1,
    rentTrend: 'rising',
    profile: 'Mixed central-south district — Schöneberg\'s walkable urban core meets Tempelhof\'s wide-open spaces.',
    commercialNotes: 'Schöneberg supports established retail along Hauptstraße and a strong gastronomy scene around Winterfeldtplatz. The former Tempelhof Airport site (Tempelhofer Feld) is a strategic redevelopment debate. Strong residential conversions in older office stock.',
    landmarks: ['Tempelhofer Feld', 'KaDeWe (south edge)', 'Rathaus Schöneberg', 'Südkreuz'],
    vibe: 'mixed',
  },
  'Neukölln': {
    name: 'Neukölln',
    population: 332_000,
    area: 44.9,
    density: 7_400,
    avgRent: 13.0,
    rentTrend: 'rising',
    profile: 'Fast-gentrifying south-central district — diverse, young, emergent commercial corridors.',
    commercialNotes: 'Karl-Marx-Straße and Hermannplatz are the main commercial spines, both with active redevelopment. Strong F&B and creative-office growth in Nord-Neukölln. Rent appreciation among the fastest in Berlin over the last decade.',
    landmarks: ['Karl-Marx-Straße', 'Tempelhofer Feld (east edge)', 'Britzer Garten', 'Rathaus Neukölln'],
    vibe: 'creative',
  },
  'Treptow-Köpenick': {
    name: 'Treptow-Köpenick',
    population: 285_000,
    area: 168.4,
    density: 1_700,
    avgRent: 11.3,
    rentTrend: 'rising',
    profile: 'Berlin\'s largest district by area — green, waterfront, with strategic tech & innovation clusters.',
    commercialNotes: 'Adlershof Science & Technology Park (WISTA) is one of Germany\'s most successful research-industry parks, anchoring biotech, optics and IT. Köpenick\'s Altstadt offers tourism and waterfront retail. Lower density supports logistics and larger floorplate occupiers.',
    landmarks: ['Adlershof (WISTA)', 'Müggelsee', 'Köpenick Altstadt', 'Treptower Park'],
    vibe: 'industrial',
  },
  'Marzahn-Hellersdorf': {
    name: 'Marzahn-Hellersdorf',
    population: 277_000,
    area: 61.7,
    density: 4_500,
    avgRent: 8.4,
    rentTrend: 'stable',
    profile: 'Berlin\'s far east — Plattenbau housing, large green areas, lowest commercial rents in the city.',
    commercialNotes: 'Affordable commercial and industrial space attracts logistics, healthcare facilities and back-office operations. Eastgate is a major retail center. Resi rents are roughly half of central Berlin — the largest spread in the city.',
    landmarks: ['Gärten der Welt', 'Eastgate Berlin', 'Schloss Biesdorf', 'Marzahner Promenade'],
    vibe: 'suburban',
  },
  'Lichtenberg': {
    name: 'Lichtenberg',
    population: 305_000,
    area: 52.3,
    density: 5_800,
    avgRent: 11.0,
    rentTrend: 'rising',
    profile: 'Mixed-character east district — Plattenbau in the east, gentrifying Friedrichsfelde and Rummelsburg.',
    commercialNotes: 'Tierpark Berlin and the Stasi-Museum complex anchor tourism. Rummelsburg waterfront sees ongoing high-end residential conversion. Mid-tier office stock and logistics dominate, with rents 30% below central Berlin.',
    landmarks: ['Tierpark Berlin', 'Rummelsburg', 'Stasi-Museum', 'Karlshorst'],
    vibe: 'mixed',
  },
  'Reinickendorf': {
    name: 'Reinickendorf',
    population: 270_000,
    area: 89.5,
    density: 3_000,
    avgRent: 10.7,
    rentTrend: 'stable',
    profile: 'Northern district — former Tegel Airport (now Berlin TXL urban development), suburban residential.',
    commercialNotes: 'Berlin TXL is one of Europe\'s largest urban tech-and-research developments (Schumacher Quartier), planned around the former airport. Outside TXL, predominantly residential with neighborhood-scale commercial. Lower density and rents than central districts.',
    landmarks: ['Berlin TXL (former Tegel Airport)', 'Tegeler See', 'Märkisches Viertel', 'Reinickendorfer Straße'],
    vibe: 'suburban',
  },
};

export type Metric = 'avgRent' | 'density' | 'population';

export const metricLabels: Record<Metric, { label: string; unit: string; format: (v: number) => string }> = {
  avgRent:    { label: 'Avg rent',  unit: '€/m²',         format: v => `€${v.toFixed(1)}/m²` },
  density:    { label: 'Density',   unit: 'pop/km²',      format: v => `${(v / 1000).toFixed(1)}k/km²` },
  population: { label: 'Population', unit: 'inhabitants', format: v => `${(v / 1000).toFixed(0)}k` },
};

export const formatNumber = (n: number): string => n.toLocaleString('en-US');
