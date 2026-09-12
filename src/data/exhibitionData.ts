import { GarmentLook, TextileSample, ColorSwatch } from '../types/portfolio';
import { GARMENTS_DATA, TEXTILE_SAMPLES, COLOR_PALETTE } from './garmentsData';
import look01HeroImg from '../assets/images/hetvi_look01_structured_sovereign.jpg';
import look02HeroImg from '../assets/images/hetvi_look02_corduroy_coord.jpg';
import look03HeroImg from '../assets/images/hetvi_look03_leather_laceup.jpg';
import look04E01Img from '../assets/images/hetvi_look04_e01_bandhani.jpg';
import look05E02Img from '../assets/images/hetvi_look05_e02_lehenga.jpg';
import look06E03Img from '../assets/images/hetvi_look06_e03_paisley.jpg';
import neoKineticHeroImg from '../assets/images/neo_kinetic_chroma_garment_1787205931733.jpg';
import neoKineticDetailImg from '../assets/images/neo_kinetic_macro_detail_1787205946987.jpg';
import ashavaliHeroImg from '../assets/images/ashavali_brocade_lehenga_1788369652028.jpg';
import ashavaliDetailImg from '../assets/images/ashavali_detail_texture_1788369670696.jpg';

export interface ExhibitionProject {
  id: string;
  category: 'western' | 'ethnic' | 'textile' | 'sustainable';
  title: string;
  subtitle: string;
  tagline: string;
  year: string;
  heroImage: string;
  videoUrl?: string;
  galleryImages: string[];
  concept: string;
  inspiration: string;
  moodboard: {
    title: string;
    description: string;
    image: string;
    keywords: string[];
  };
  colors: ColorSwatch[];
  materials: {
    name: string;
    composition: string;
    weight: string;
    texture: string;
    drape: string;
    color: string;
    hex: string;
  }[];
  silhouette: string;
  textileTechniques: string[];
  sketches: string[];
  techFlats: {
    front: string;
    back: string;
    annotations: string[];
  };
  developmentNotes: string[];
  garmentDataId?: string; // Links to 3D garment model if available
}

export const EXHIBITION_PROJECTS: ExhibitionProject[] = [
  // 1. WESTERN WEAR: Look 01
  {
    id: 'proj-w01',
    category: 'western',
    title: 'THE STRUCTURED SOVEREIGN',
    subtitle: 'Deconstructed Architectural Trench & Boned Bodice',
    tagline: 'Precision Tailoring Reimagined Through Sculptural Deconstruction',
    year: '2026',
    heroImage: look01HeroImg,
    galleryImages: [
      look01HeroImg,
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    concept: 'An interrogation of classic British trench coat archetypes through the prism of Brutalist concrete monoliths. By exposing the internal corset boning channels and exaggerating shoulder flaps into sculptural wings, the garment becomes a protective exoskeleton.',
    inspiration: 'Brutalist architecture in Chandigarh and Ahmedabad, mid-century couture tailoring, and industrial scaffolding.',
    moodboard: {
      title: 'Monolithic Rigor & Exposed Framework',
      description: 'Chiseled concrete angles, raw seams, tailored canvas pad-stitching, and contrast velvet piping.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
      keywords: ['Exoskeleton', 'Architectural Boning', 'Deconstructed Trench', 'Hourglass Hybrid', 'Heavy Wool Gabardine']
    },
    colors: [
      { name: 'Warm Beige', hex: '#D8C7B5', rgb: 'rgb(216, 199, 181)', proportion: 45, usage: 'Main outer trench shell' },
      { name: 'Deep Wine', hex: '#5A1F2B', rgb: 'rgb(90, 31, 43)', proportion: 25, usage: 'Velvet boning channels & lapel facing' },
      { name: 'Charcoal', hex: '#262223', rgb: 'rgb(38, 34, 35)', proportion: 20, usage: 'Structural inner canvas & buttons' },
      { name: 'Off White', hex: '#FCFAF7', rgb: 'rgb(252, 250, 247)', proportion: 10, usage: 'Undercollar pad-stitching accents' }
    ],
    materials: [
      { name: 'Heavy Wool Gabardine', composition: '100% Regenerated Virgin Wool', weight: '340 GSM', texture: 'Diagonal twill hand', drape: 'Structured, high resilience', color: 'Warm Beige', hex: '#D8C7B5' },
      { name: 'Silk Velvet Accent', composition: '82% Rayon, 18% Silk', weight: '220 GSM', texture: 'Plush low-luster sheen', drape: 'Fluid weighted fall', color: 'Deep Wine', hex: '#5A1F2B' },
      { name: 'Organic Cotton Twill', composition: '100% GOTS Cotton', weight: '115 GSM', texture: 'Breathable matte', drape: 'Gentle against skin', color: 'Ivory', hex: '#F7F3EC' }
    ],
    silhouette: 'Hourglass-architectural hybrid with exaggerated storm flap wings and flared structured peplum drape.',
    textileTechniques: ['Pad-stitched horsehair canvas interfacing', 'Velvet cord boning insertion', 'French-seamed internal lining'],
    sketches: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    techFlats: {
      front: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
      back: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      annotations: [
        'Asymmetrical peaked lapel with contrast deep wine binding',
        '6 spiral steel boning channels in velvet channels',
        'Modular storm flap transforming into shoulder capelet',
        'Double-welted angle pockets with antique brass snaps'
      ]
    },
    developmentNotes: [
      '3 draping mockups created on dress form to resolve storm flap balance.',
      'Internal waist stay added to distribute the 1.4kg wool gabardine weight across the iliac crest.',
      'Final runway sample tested for 360-degree rotational movement.'
    ],
    garmentDataId: 'western-look-01'
  },

  // 2. WESTERN WEAR: Look 02
  {
    id: 'proj-w02',
    category: 'western',
    title: 'THE FLUID MONOLITH',
    subtitle: 'Deconstructed Asymmetric Draped Column Gown',
    tagline: 'Tension Between Rigid Concrete Geometry & Liquid Silk Movement',
    year: '2026',
    heroImage: look02HeroImg,
    galleryImages: [
      look02HeroImg,
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    concept: 'A modernist exploration of gravity and tension. Liquid mulberry silk crepe flows diagonally across a molded hip harness, evoking modernist brutalist facades softened by wind-blown drapery.',
    inspiration: 'Madame Grès classical bias draping, Zaha Hadid parametric contours, and desert sand ripples.',
    moodboard: {
      title: 'Parametric Drapes & Liquid Gravity',
      description: 'Continuous bias folds, weight tape hem drops, sheer georgette layering, and rich burgundy hues.',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
      keywords: ['Bias Cut', 'Cascading Train', 'Mulberry Silk', 'Molded Yoke', 'Burgundy & Dusty Rose']
    },
    colors: [
      { name: 'Burgundy', hex: '#722F37', rgb: 'rgb(114, 47, 55)', proportion: 50, usage: 'Primary column gown silk crepe' },
      { name: 'Dusty Rose', hex: '#9A6670', rgb: 'rgb(154, 102, 112)', proportion: 30, usage: 'One-shoulder floating chiffon drape' },
      { name: 'Charcoal', hex: '#262223', rgb: 'rgb(38, 34, 35)', proportion: 20, usage: 'Underlay foundation harness' }
    ],
    materials: [
      { name: 'Heavy Mulberry Silk Crepe', composition: '100% Pure Silk', weight: '180 GSM', texture: 'Sand-washed pebble', drape: 'Heavy liquid fall', color: 'Burgundy', hex: '#722F37' },
      { name: 'Silk Georgette Chiffon', composition: '100% Silk', weight: '45 GSM', texture: 'Sheer fine grain', drape: 'Airy float', color: 'Dusty Rose', hex: '#9A6670' }
    ],
    silhouette: 'Column silhouette with cascading side train, high side slash, and one-shoulder architectural cowl twist.',
    textileTechniques: ['Direct bias draping on live form', 'Micro hand-rolled hems (16 SPI)', 'Lead-weighted hem tape drop'],
    sketches: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    techFlats: {
      front: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      back: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      annotations: [
        'Single bias-cut twisted shoulder drape creating back cowl',
        'Molded architectural hip yoke in pressed felt',
        'Deep high-thigh slash with bound inner facing in deep wine satin'
      ]
    },
    developmentNotes: [
      'Over 6 meters of continuous bias silk draped without cutting initial seams.',
      'Weight-balanced hem allows the train to float dynamically during runway stride.'
    ],
    garmentDataId: 'western-look-02'
  },

  // 3. WESTERN WEAR: Look 03 (3D CLO Simulation & Ergonomics)
  {
    id: 'proj-w03',
    category: 'western',
    title: 'THE NEO-KINETIC CHROMA',
    subtitle: '3D CLO Digital Garment • Iridescent Track Trousers & Cropped Mock-Neck',
    tagline: 'Parametric 3D Pattern Engineering, High-Gloss Chromatic Refraction & Athletic Ergonomics',
    year: '2026',
    heroImage: look03HeroImg,
    videoUrl: '/hetvi123.mp4',
    galleryImages: [
      look03HeroImg,
      neoKineticHeroImg,
      neoKineticDetailImg,
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    concept: 'A cyber-couture digital simulation exploring the dynamic tension between athletic utility and prism-optic chromatic textiles. High-waisted jogger trousers with neon-lime and obsidian chevron racing bands are simulated with high-luster iridescent nylon taffeta physics, paired with a minimalist lavender compression cropped bodice.',
    inspiration: '3D CLO3D cloth dynamics, holographic optics, motorsport racing striping, and retro-futuristic activewear.',
    moodboard: {
      title: 'Optic Iridescence & Kinetic Speedlines',
      description: 'Holographic metallic nylon reflection, high-visibility neon lime chevron bands, smocked elastic gathering, and 3D digital cloth simulation.',
      image: neoKineticDetailImg,
      keywords: ['3D CLO Simulation', 'Iridescent Nylon', 'Neon Lime Chevrons', 'Ruched Elastic', 'Digital Atelier', 'Athletic Couture']
    },
    colors: [
      { name: 'Iridescent Silver-Pink', hex: '#D9B3CE', rgb: 'rgb(217, 179, 206)', proportion: 45, usage: 'Main holographic track pants shell' },
      { name: 'Lavender Mauve', hex: '#B89FAD', rgb: 'rgb(184, 159, 173)', proportion: 25, usage: 'Long-sleeve cropped mock-neck top' },
      { name: 'Obsidian Black', hex: '#141216', rgb: 'rgb(20, 18, 22)', proportion: 15, usage: 'Underbust contrast band & geometric chevron stripes' },
      { name: 'Neon Lime', hex: '#DFFF00', rgb: 'rgb(223, 255, 0)', proportion: 15, usage: 'High-visibility racing side stripe' }
    ],
    materials: [
      { name: 'Holographic Iridescent Nylon Taffeta', composition: '100% Technical Micro-Nylon', weight: '110 GSM', texture: 'Prism optic luster & metallic sheen', drape: 'Fluid crisp dynamic volume', color: 'Iridescent Silver-Pink', hex: '#D9B3CE' },
      { name: 'High-Vis Fluorescent Grosgrain', composition: 'Polymer Heat-Welded Tape', weight: '180 GSM', texture: 'Matte reflective racing band', drape: 'Linear stability', color: 'Neon Lime', hex: '#DFFF00' },
      { name: 'Compression Poly-Elastane Rib', composition: '88% Poly, 12% Elastane', weight: '240 GSM', texture: 'Matte 4-way compression stretch', drape: 'Body-contouring', color: 'Lavender Mauve', hex: '#B89FAD' }
    ],
    silhouette: 'High-waisted relaxed athletic taper with smocked ruched elastic waistband and ankle cuff gathering, paired with form-fitted long-sleeve crop top.',
    textileTechniques: ['3D parametric CAD pattern layout & mesh simulation', 'Ultrasonic heat-welded seam tape', 'Multi-channel elastic waist smocking', 'Prismatic light refraction coating'],
    sketches: [
      neoKineticDetailImg,
      neoKineticHeroImg
    ],
    techFlats: {
      front: neoKineticHeroImg,
      back: neoKineticDetailImg,
      annotations: [
        'Multi-channel ruched elastic waistband with internal adjustable drawcord',
        'Continuous neon lime vertical racing stripe intersected by diagonal black chevron',
        'Long-sleeve mock-neck crop top with 4cm contrast obsidian under-bust band',
        'Elasticized gathered ankle cuffs with reinforced bar-tacking'
      ]
    },
    developmentNotes: [
      'Digital 3D cloth physics simulation calibrated for light refraction and metallic specular highlights.',
      'Stress map analysis ensured zero strain distortion across crotch and knee flexion zones.',
      'Zero-waste pattern nesting yield rated at 97.8% efficiency.'
    ],
    garmentDataId: 'western-look-03'
  },

  // 5. ETHNIC WEAR: Look 01
  {
    id: 'proj-e01',
    category: 'ethnic',
    title: 'THE HERITAGE WEAVER',
    subtitle: 'Modernized Bandhani & Structural Cording Kalidar Anarkali',
    tagline: 'Ancestral Gujarati Resist Craft Meets 32-Panel Architectural Flare',
    year: '2026',
    heroImage: look04E01Img,
    galleryImages: [
      look04E01Img,
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85'
    ],
    concept: 'Reinventing Gujarati Bandhani tie-dye through contemporary geometric chevron grids and multi-layered silk dori cording. The kalidar silhouette features 32 parabolic panels cascading from a corded corset bodice.',
    inspiration: 'Kutch artisan communities, traditional stepwells (vavs) of Gujarat, and fractal geometry.',
    moodboard: {
      title: 'Bandhani Geometries & Hand Dori Cording',
      description: 'Micro tie-dye dots, 32 flared panels, sheer balloon sleeves, and deep wine silk accents.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      keywords: ['Bandhani', '32 Kalis', 'Dori Cording', 'Chanderi Silk', 'Mashru Sateen']
    },
    colors: [
      { name: 'Ivory', hex: '#F7F3EC', rgb: 'rgb(247, 243, 236)', proportion: 40, usage: 'Chanderi silk base & Bandhani dots' },
      { name: 'Deep Wine', hex: '#5A1F2B', rgb: 'rgb(90, 31, 43)', proportion: 35, usage: 'Bodice & panel joint cording' },
      { name: 'Dusty Rose', hex: '#9A6670', rgb: 'rgb(154, 102, 112)', proportion: 15, usage: 'Organza dupatta ombre dip' },
      { name: 'Charcoal', hex: '#262223', rgb: 'rgb(38, 34, 35)', proportion: 10, usage: 'Boning structure & buttons' }
    ],
    materials: [
      { name: 'Chanderi Silk-Cotton', composition: '70% Silk, 30% Fine Cotton', weight: '90 GSM', texture: 'Crisp sheer shimmer', drape: 'Architectural volume', color: 'Ivory', hex: '#F7F3EC' },
      { name: 'Mashru Silk Sateen', composition: 'Silk face, Cotton back', weight: '160 GSM', texture: 'Glossy luminous face', drape: 'Medium body', color: 'Deep Wine', hex: '#5A1F2B' }
    ],
    silhouette: 'Kalidar Anarkali with fitted corded bodice, 32 flared panels, and an asymmetrical architectural dupatta.',
    textileTechniques: ['Hand-tied micro Bandhani dots', 'Raised silk dori cording lattice', 'Horsehair crinoline bell hem'],
    sketches: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80'
    ],
    techFlats: {
      front: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      back: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80',
      annotations: [
        'Hand-tied micro Bandhani dots forming contemporary chevrons',
        'Extensive surface cording (dori work) along bodice',
        'Layered crinoline horsehair hem creating dramatic 820cm bell flare'
      ]
    },
    developmentNotes: [
      '32 individual kalis graduated from 3cm to 22cm width for seamless parabolic flare.',
      'Natural alum fixative used to lock dye brilliance.'
    ],
    garmentDataId: 'ethnic-look-01'
  },

  // 5. ETHNIC WEAR: Look 02
  {
    id: 'proj-e02',
    category: 'ethnic',
    title: 'THE PATOLA REBIRTH',
    subtitle: 'Upcycled Patola Draped Saree & Armature Blouse',
    tagline: 'Upcycling Gujarat’s Legendary Double-Ikat Weave Into Modern Couture',
    year: '2026',
    heroImage: look05E02Img,
    galleryImages: [
      look05E02Img,
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ],
    concept: 'Honoring Gujarat’s legendary double-ikat Patola weaving heritage by upcycling deadstock geometric weave remnants into a modern pre-draped concept saree with a sculpted architectural corset blouse.',
    inspiration: 'Patan Patola museum archives, Gujarat temple mandapas, and modernist corset engineering.',
    moodboard: {
      title: 'Patan Patola Double-Ikat & Structural Wings',
      description: 'Geometric double-ikat fragments, gold couching thread, structured wing collar, and accordion saree pleats.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      keywords: ['Upcycled Patola', 'Concept Saree', 'Armature Blouse', 'Matka Silk', 'Gold Couching']
    },
    colors: [
      { name: 'Burgundy', hex: '#722F37', rgb: 'rgb(114, 47, 55)', proportion: 40, usage: 'Patola scrap geometric motifs' },
      { name: 'Warm Beige', hex: '#D8C7B5', rgb: 'rgb(216, 199, 181)', proportion: 30, usage: 'Raw Matka silk base' },
      { name: 'Deep Wine', hex: '#5A1F2B', rgb: 'rgb(90, 31, 43)', proportion: 20, usage: 'Velvet cummerbund belt' },
      { name: 'Off White', hex: '#FCFAF7', rgb: 'rgb(252, 250, 247)', proportion: 10, usage: 'Tissue lamé lining' }
    ],
    materials: [
      { name: 'Authentic Patan Patola Silk Scraps', composition: '100% Double-Ikat Silk', weight: '140 GSM', texture: 'Dense geometric weave', drape: 'Crisp royal luster', color: 'Burgundy & Wine', hex: '#722F37' },
      { name: 'Pure Raw Matka Silk', composition: '100% Hand-Spun Silk', weight: '210 GSM', texture: 'Natural rich slub', drape: 'Holds rigid angles', color: 'Warm Beige', hex: '#D8C7B5' }
    ],
    silhouette: 'Pre-stitched concept saree with micro-pleated front apron and structured high-neck molded corset blouse.',
    textileTechniques: ['Zero-waste deadstock Patola reassembly', 'Metallic gold zari couching embroidery', 'Internal 8-piece boned corset foundation'],
    sketches: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    techFlats: {
      front: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      back: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      annotations: [
        '85 deadstock Patola test strips joined with 0.5mm French seams',
        'Molded high-neck corset blouse with wing shoulders',
        'Deep wine silk velvet cummerbund belt with brass buckle'
      ]
    },
    developmentNotes: [
      '85 deadstock Patola test-strips sorted by color tone, backed with fusible organza.',
      'Saree pallu is pre-pleated with hidden shoulder anchor tabs to prevent slippage.'
    ],
    garmentDataId: 'ethnic-look-02'
  },

  // 6. ETHNIC WEAR: Look 03
  {
    id: 'proj-e03',
    category: 'ethnic',
    title: 'THE ROYAL ALCHEMIST',
    subtitle: 'Hand-Embroidered Velvet Angrakha & Tiered Farshi Pajama',
    tagline: 'Mughal Royal Court Heritage Infused With Layered Translucency',
    year: '2026',
    heroImage: look06E03Img,
    galleryImages: [
      look06E03Img,
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85'
    ],
    concept: 'A dramatic union of Mughal royal Angrakha tailoring and modern layered transparency. Rich dark wine silk-velvet is hand-embellished with micro-Zardozi and threadwork, opening into diaphanous tiers of ivory organza.',
    inspiration: 'Mughal miniature paintings, royal Farshi garments, and Islamic jali screen architecture.',
    moodboard: {
      title: 'Mughal Opulence & Tiered Organza Layers',
      description: 'Deep wine micro-velvet, hand-applied Zardozi bullion, handmade latkans, and 3-tiered Farshi pajama.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      keywords: ['Angrakha', 'Micro Velvet', 'Farshi Pajama', 'Zardozi Bullion', 'Silk Latkans']
    },
    colors: [
      { name: 'Dark Wine', hex: '#421820', rgb: 'rgb(66, 24, 32)', proportion: 45, usage: 'Angrakha velvet bodice yoke' },
      { name: 'Soft Ivory', hex: '#F7F3EC', rgb: 'rgb(247, 243, 236)', proportion: 30, usage: 'Tiered Farshi pajama organza' },
      { name: 'Warm Beige', hex: '#D8C7B5', rgb: 'rgb(216, 199, 181)', proportion: 15, usage: 'Brocade trims & gold zari' },
      { name: 'Charcoal', hex: '#262223', rgb: 'rgb(38, 34, 35)', proportion: 10, usage: 'Contrast latkan tassels' }
    ],
    materials: [
      { name: 'Micro Silk Velvet', composition: '100% Pure Silk Velvet', weight: '240 GSM', texture: 'Sumptuous deep pile', drape: 'Sculptural heavy fall', color: 'Dark Wine', hex: '#421820' },
      { name: 'Tissue Silk Organza', composition: '100% Silk', weight: '42 GSM', texture: 'Semi-sheer gold wash', drape: 'Airy floaty tiers', color: 'Soft Ivory', hex: '#F7F3EC' }
    ],
    silhouette: 'Asymmetric crossover Angrakha tunic over wide-flare tiered Farshi pajama trousers.',
    textileTechniques: ['120 artisan hours of micro-Zardozi embroidery', 'Handmade latkan silk tassels', '3-tiered gathered Farshi construction'],
    sketches: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    techFlats: {
      front: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80',
      back: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      annotations: [
        'Diagonal crossover front with hand-twisted silk bullion cord ties',
        'Intricate micro-Zardozi embroidery along neckline and cuffs',
        'Tiered Farshi pajama with 210cm leg flare per side'
      ]
    },
    developmentNotes: [
      'Over 120 artisan hours of hand-embroidery executed on wooden Adda frames.',
      'Velvet panels interfaced with lightweight fusible weft-insertion to eliminate seam crush.'
    ],
    garmentDataId: 'ethnic-look-03'
  },

  // 7. ETHNIC WEAR: Look 04
  {
    id: 'proj-e04',
    category: 'ethnic',
    title: 'THE ASHAVALI ARCHITECT',
    subtitle: 'Architectural Brocade Capelet & 48-Kali Knife-Pleated Lehenga',
    tagline: 'Centuries-Old Ahmedabad Ashavali Weave Reimagined into Sculptural Kinetic Volumes',
    year: '2026',
    heroImage: ashavaliHeroImg,
    galleryImages: [
      ashavaliHeroImg,
      ashavaliDetailImg,
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85'
    ],
    concept: 'A celebration of Ahmedabad’s historic Ashavali brocade weaving legacy. An architectural structured shoulder capelet woven with pure gold zari and jewel-toned flora-fauna motifs, layered over a sculpted micro-corseted choli and a 48-kali knife-pleated raw silk lehenga with concealed horsehair crinoline and hand-beaten gold mukaish spangles.',
    inspiration: 'Historic Ahmedabad Ashavali brocades, Calico Museum of Textiles archives, Sidi Saiyyed lattice geometry, and kinetic architectural folds.',
    moodboard: {
      title: 'Ashavali Heritage & Kinetic Knife Pleating',
      description: 'Pure gold zari twill brocade, structured capelet collar, hand-beaten mukaish dots, and 48-kali knife pleating in warm beige and deep crimson wine.',
      image: ashavaliDetailImg,
      keywords: ['Ashavali Brocade', 'Architectural Cape', 'Knife Pleats', 'Pure Gold Zari', 'Mukaish Spangles']
    },
    colors: [
      { name: 'Pure Gold', hex: '#D4AF37', rgb: 'rgb(212, 175, 55)', proportion: 35, usage: 'Ashavali brocade zari motifs' },
      { name: 'Deep Wine', hex: '#5A1F2B', rgb: 'rgb(90, 31, 43)', proportion: 35, usage: 'Velvet waistband & lehenga hem' },
      { name: 'Warm Beige', hex: '#D8C7B5', rgb: 'rgb(216, 199, 181)', proportion: 20, usage: 'Handloom Tussar lehenga body' },
      { name: 'Charcoal Bronze', hex: '#3D271D', rgb: 'rgb(61, 39, 29)', proportion: 10, usage: 'Carved brass collar clasp' }
    ],
    materials: [
      { name: 'Handwoven Ashavali Gold Brocade', composition: '100% Pure Mulberry Silk & Real Gold Zari', weight: '260 GSM', texture: 'Rich twill weave with raised metallic flora', drape: 'Sculptural, firm, radiant luster', color: 'Gold & Deep Wine', hex: '#D4AF37' },
      { name: 'Handloom Tussar-Matka Silk', composition: '100% Wild Tussar Silk', weight: '220 GSM', texture: 'Crisp organic slub with warm natural light absorption', drape: 'Crisp recovery, holds sharp knife creases', color: 'Warm Beige', hex: '#D8C7B5' }
    ],
    silhouette: 'Structured high-collar capelet with sculpted corseted bodice and high-waisted 48-kali knife-pleated flare lehenga.',
    textileTechniques: ['Handloom Ashavali twill gold zari brocade weaving', '48-kali knife pleating with horsehair stabilization', 'Hand-beaten mukaish needlework'],
    sketches: [
      ashavaliHeroImg,
      ashavaliDetailImg
    ],
    techFlats: {
      front: ashavaliHeroImg,
      back: ashavaliDetailImg,
      annotations: [
        'Architectural high-stand collar capelet in pure gold zari Ashavali brocade',
        '48-kali graduated knife pleats creating a 9-meter hem circumference (ghera)',
        'Concealed horsehair crinoline hem band sustaining parabolic structure during movement',
        'Deep wine silk-velvet waistband with carved brass temple-arch buckle'
      ]
    },
    developmentNotes: [
      'Ashavali brocade capelet lined with canvas interfacing and tailored with French seams to preserve exterior motif alignment.',
      '48 individual knife pleats pressed using pressurized steam and anchored along an internal multi-channel grosgrain stay.',
      'Internal 8-bone structure on inner corset stabilizes heavy capelet weight without pull.'
    ],
    garmentDataId: 'ethnic-look-04'
  }
];
