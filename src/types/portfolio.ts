export type SectionId = 
  | 'intro'
  | 'concept'
  | 'design_language'
  | 'development'
  | 'western'
  | 'ethnic'
  | 'technical'
  | 'final';

export interface SectionMeta {
  id: SectionId;
  number: string;
  title: string;
  startPage: number;
  endPage: number;
  themeColor?: string;
}

export interface GarmentLook {
  id: string;
  category: 'western' | 'ethnic';
  lookNumber: number; // 1, 2, 3
  code: string;
  name: string;
  tagline: string;
  concept: string;
  silhouette: string;
  keyDetails: string[];
  fabrics: {
    name: string;
    composition: string;
    weight: string;
    texture: string;
    drape: string;
    color: string;
    hex: string;
  }[];
  trims: {
    item: string;
    spec: string;
    placement: string;
  }[];
  constructionNotes: string[];
  measurements: {
    part: string;
    spec: string;
  }[];
  defaultIllustration: string;
  defaultFlatFront: string;
  defaultFlatBack: string;
  defaultPhotoshoot: string[];
  defaultDetail: string;
}

export interface SlideData {
  pageNumber: number;
  sectionId: SectionId;
  sectionTitle: string;
  title: string;
  subtitle?: string;
  description?: string;
  quote?: string;
  customComponent?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  rgb: string;
  proportion: number; // percentage
  usage: string;
}

export interface TextileSample {
  id: string;
  title: string;
  technique: string;
  materials: string;
  description: string;
  image: string;
  category: 'manipulation' | 'ornamentation' | 'sustainable' | 'structure';
  detailNotes: string[];
}
