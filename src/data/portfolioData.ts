import { SlideData } from '../types/portfolio';

export interface PageContent extends SlideData {
  heroTagline?: string;
  bodyText?: string[];
  bulletPoints?: string[];
  quotes?: string[];
  annotations?: { title: string; desc: string; label?: string }[];
  visualSlots?: {
    slotId: string;
    label: string;
    placeholderHint: string;
    defaultUrl: string;
    aspectRatio?: string;
    caption?: string;
  }[];
  interactiveType?: string;
  techData?: Record<string, any>;
}

export const PORTFOLIO_PAGES: PageContent[] = [
  // SECTION 01: INTRODUCTION (01 - 04)
  {
    pageNumber: 1,
    sectionId: 'intro',
    sectionTitle: '01 — INTRODUCTION',
    title: 'HETVI KAPADIA',
    subtitle: 'FASHION DESIGN PORTFOLIO',
    heroTagline: 'Fashion Design Student | Indus University, Ahmedabad',
    quote: '“Where contemporary expression meets the timeless language of craftsmanship.”',
    bodyText: [
      'Graduation Portfolio & Digital Atelier Exhibition',
      'Specializing in Contemporary Western Tailoring, Modernized Indian Ethnic Silhouettes, Textile Surface Experimentation, and Sustainable Circularity.'
    ],
    visualSlots: [
      {
        slotId: 'cover_hero',
        label: 'UPLOAD COVER HERO FASHION IMAGE',
        placeholderHint: 'Editorial Hero Fashion Photograph / Illustration (High-Resolution Portrait)',
        defaultUrl: '/hetvi_look01.jpg',
        caption: 'Signature Architectural Silhouette | Ahmedabad, 2026'
      }
    ]
  },
  {
    pageNumber: 2,
    sectionId: 'intro',
    sectionTitle: '01 — INTRODUCTION',
    title: 'ABOUT THE DESIGNER',
    subtitle: 'Hetvi Kapadia — Fashion Design Student',
    bodyText: [
      'I am an emerging fashion designer based in Ahmedabad, pursuing my Bachelor of Fashion Design at Indus University. My work exists at the captivating intersection of structured contemporary tailoring, traditional Indian craft heritage, and sustainable circular textile systems.',
      'Raised amidst the vibrant textile legacy of Gujarat, I have developed an intuitive fascination with tactile manipulation—from raw selvedge textures to intricate hand-cording, Bandhani resist-dyeing, and architectural boning. I perceive garments not merely as aesthetic garments, but as spatial sculptures that communicate identity, dialogue with the body, and respect the lifecycle of materials.'
    ],
    quote: '“Fashion as a dialogue between individuality, craftsmanship, culture and contemporary expression.”',
    bulletPoints: [
      'Fashion Illustration & Digital Flat Technicals',
      'Garment Construction & Tailored Pattern Drafting',
      'Textile Experimentation & Fabric Manipulation',
      'Surface Ornamentation (Zardozi, Cording, Smocking)',
      'Circular Design & "From Scrap to System" Upcycling',
      'Contemporary Silhouettes & Traditional Craft Fusion'
    ],
    visualSlots: [
      {
        slotId: 'designer_portrait',
        label: 'UPLOAD DESIGNER PORTRAIT',
        placeholderHint: 'Professional Designer Portrait / Atelier Studio Photo',
        defaultUrl: '/hetvi_portrait.jpg',
        caption: 'Hetvi Kapadia | Fashion Designer & Material Explorer'
      },
      {
        slotId: 'designer_studio_detail',
        label: 'UPLOAD ATELIER WORKSPACE PHOTO',
        placeholderHint: 'Hands at Work / Pattern Table / Moodboard Detail',
        defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
        caption: 'Textile Research Studio, Indus University'
      }
    ]
  },
  {
    pageNumber: 3,
    sectionId: 'intro',
    sectionTitle: '01 — INTRODUCTION',
    title: 'TABLE OF CONTENTS',
    subtitle: 'Portfolio Architecture & Systematic Journey',
    bodyText: [
      'A structured 42-slide horizontal narrative progressing systematically from research and design language into six fully realized garments across Western and Ethnic disciplines.'
    ],
    visualSlots: []
  },
  {
    pageNumber: 4,
    sectionId: 'intro',
    sectionTitle: '01 — INTRODUCTION',
    title: 'DESIGN PHILOSOPHY & COLLECTION OVERVIEW',
    subtitle: 'Dual Narratives: Western Rigor & Ethnic Heritage',
    quote: '“Where contemporary expression meets the language of craft.”',
    bodyText: [
      'This portfolio explores two complementary design vocabularies that define my aesthetic identity: the Western Collection and the Ethnic Collection. Rather than treating them as isolated silos, they represent two dynamic expressions of the same philosophy: architectural silhouette construction, refined material integrity, and artisanal reverence.',
      'The Western Collection examines deconstruction, angular tailoring, and liquid draping. The Ethnic Collection reinterprets historic Gujarati craft—Bandhani, Patola upcycling, and Angrakha tailoring—through a bold contemporary lens.'
    ],
    visualSlots: [
      {
        slotId: 'overview_western_preview',
        label: 'UPLOAD WESTERN COLLECTION OVERVIEW',
        placeholderHint: 'Western Silhouette Mood / Tailoring Focus Image',
        defaultUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
        caption: 'Western Capsule: Architectural Deconstruction'
      },
      {
        slotId: 'overview_ethnic_preview',
        label: 'UPLOAD ETHNIC COLLECTION OVERVIEW',
        placeholderHint: 'Ethnic Silhouette Mood / Heritage Craft Image',
        defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
        caption: 'Ethnic Capsule: Contemporary Heritage & Cording'
      }
    ]
  },

  // SECTION 02: CONCEPT & RESEARCH (05 - 11)
  {
    pageNumber: 5,
    sectionId: 'concept',
    sectionTitle: '02 — CONCEPT & RESEARCH',
    title: 'THEME BOARD',
    subtitle: 'Western: Brutalist Metamorphosis | Ethnic: Resilient Heritage',
    bodyText: [
      'Western Concept Note: Investigating the juxtaposition of rigid concrete geometry and soft kinetic movement. Deconstructed trench coats, boned internal structures, and origami pleating challenge traditional notions of outer-versus-inner garments.',
      'Ethnic Concept Note: Honoring the ancestral textile craftsmanship of Gujarat—Patan Patola, Kutch Bandhani, and Mughal court wear—recalibrated into clean, modern ceremonial ensembles for the fearless contemporary muse.'
    ],
    annotations: [
      { title: 'WESTERN KEYWORDS', desc: 'Sculptural, Deconstructed, Peaked, Linear, Kinetic, Tailored, Boning, Monochrome' },
      { title: 'ETHNIC KEYWORDS', desc: 'Artisanal, Patola Upcycling, Dori Cording, Zardozi, Tiered, Heritage, Translucency' }
    ],
    visualSlots: [
      {
        slotId: 'theme_western_mood',
        label: 'UPLOAD WESTERN THEME BOARD IMAGE',
        placeholderHint: 'Brutalist Architecture & Tailoring Reference',
        defaultUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
        caption: 'Theme Ref 01: Geometric Façades'
      },
      {
        slotId: 'theme_ethnic_mood',
        label: 'UPLOAD ETHNIC THEME BOARD IMAGE',
        placeholderHint: 'Heritage Indian Architecture & Craft Texture Reference',
        defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
        caption: 'Theme Ref 02: Gujarati Craft Legacy'
      }
    ]
  },
  {
    pageNumber: 6,
    sectionId: 'concept',
    sectionTitle: '02 — CONCEPT & RESEARCH',
    title: 'CONCEPT DEVELOPMENT',
    subtitle: 'Visual Progression: Thought → Research → Experiment → Final Form',
    bodyText: [
      'The creative journey followed a rigorous, iterative methodological roadmap. Every garment emerged from extensive tactile manipulation, historical arch research, 3D draping tests on the dress form, and conscious zero-waste scrap audits.'
    ],
    visualSlots: [
      {
        slotId: 'concept_dev_western_flow',
        label: 'UPLOAD WESTERN DEVELOPMENT COLLAGE',
        placeholderHint: 'Western Process / Paper Mockups / Draping Tests',
        defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
        caption: 'Western Path: Pattern Origami to Structural Coat'
      },
      {
        slotId: 'concept_dev_ethnic_flow',
        label: 'UPLOAD ETHNIC DEVELOPMENT COLLAGE',
        placeholderHint: 'Ethnic Process / Tie-Dye Tests / Cording Samples',
        defaultUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
        caption: 'Ethnic Path: Craft Mapping to Modern Kalidar'
      }
    ]
  },
  {
    pageNumber: 7,
    sectionId: 'concept',
    sectionTitle: '02 — CONCEPT & RESEARCH',
    title: 'MOOD BOARD',
    subtitle: 'Tactile Atmosphere, Shadows & Atmospheric Energy',
    bodyText: [
      'A curated collage evoking the sensory mood of the collection: heavy wool gabardine against bare skin, deep wine velvets bathed in warm studio spotlights, sheer organzas catching ambient breeze, and the metallic glimmer of antique brass and dabka wire.'
    ],
    visualSlots: [
      {
        slotId: 'mood_board_collage_1',
        label: 'UPLOAD MOOD BOARD IMAGE 01',
        placeholderHint: 'Atmospheric Texture / Lighting Mood Reference',
        defaultUrl: '/hetvi_look01.jpg',
        caption: 'Mood Atmosphere: Sharp Contours'
      },
      {
        slotId: 'mood_board_collage_2',
        label: 'UPLOAD MOOD BOARD IMAGE 02',
        placeholderHint: 'Fabric Texture / Draped Velvet Detail',
        defaultUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        caption: 'Mood Atmosphere: Deep Wine Silk'
      },
      {
        slotId: 'mood_board_collage_3',
        label: 'UPLOAD MOOD BOARD IMAGE 03',
        placeholderHint: 'Architectural Shadow & Minimalist Form',
        defaultUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85',
        caption: 'Mood Atmosphere: Raw Elegance'
      },
      {
        slotId: 'mood_board_collage_4',
        label: 'UPLOAD MOOD BOARD IMAGE 04',
        placeholderHint: 'Ethnic Craft Atmosphere & Heritage Arch',
        defaultUrl: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=85',
        caption: 'Mood Atmosphere: Royal Translucency'
      }
    ]
  },
  {
    pageNumber: 8,
    sectionId: 'concept',
    sectionTitle: '02 — CONCEPT & RESEARCH',
    title: 'INSPIRATION BOARD',
    subtitle: 'Primary Catalysts: Brutalism, Stepwells & Textile Alchemy',
    bodyText: [
      'Inspiration stemmed from two primary physical environments: the geometric stepwells (Vavs) of Gujarat with their cascading stone rhythms, and contemporary brutalist architecture characterized by honest structural visibility and unadorned material power.'
    ],
    annotations: [
      { title: 'Adalaj Stepwell (Ahmedabad)', desc: 'Tiered subterranean stone carvings translated into layered organza tiers and kalidar panels.' },
      { title: 'Modernist Concrete Canopies', desc: 'Cantilevered overhangs converted into sculptural trench storm flaps and shoulder wings.' }
    ],
    visualSlots: [
      {
        slotId: 'inspo_western_arch',
        label: 'UPLOAD WESTERN INSPIRATION BOARD',
        placeholderHint: 'Brutalist Geometric Architecture & Sculptural Fashion',
        defaultUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
        caption: 'Inspiration: Cantilever Geometry'
      },
      {
        slotId: 'inspo_ethnic_stepwell',
        label: 'UPLOAD ETHNIC INSPIRATION BOARD',
        placeholderHint: 'Indian Architectural Stepwells, Ornate Jali, Patan Weaving',
        defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
        caption: 'Inspiration: Stepwell Rhythm & Heritage Weave'
      }
    ]
  },
  {
    pageNumber: 9,
    sectionId: 'concept',
    sectionTitle: '02 — CONCEPT & RESEARCH',
    title: 'RESEARCH BOARD',
    subtitle: 'Contextual Inquiries Across Culture, Anatomy & Eco-Systems',
    bodyText: [
      'A deep investigative dissection across six research pillars: Cultural Identity, Architectural Geometries, Body Ergonomics, Historical Garment Anatomy, Sustainable Waste Streams, and Textile Performance.'
    ],
    bulletPoints: [
      'CULTURAL: Semiotics of the Angrakha placket and royal Mughal court attire.',
      'ARCHITECTURAL: Structural load distribution translated into boned bodice channels.',
      'ERGONOMIC: Armhole depth and sleeve cap pitch optimized for unhindered motion.',
      'CIRCULAR: Pre-consumer fabric waste accumulation in Ahmedabad garment manufacturing hubs.'
    ],
    visualSlots: [
      {
        slotId: 'research_grid_img1',
        label: 'UPLOAD RESEARCH BOARD IMAGE 1',
        placeholderHint: 'Historical Garment Diagram / Anarkali History',
        defaultUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
        caption: 'Archival Research: Historical Drapes'
      },
      {
        slotId: 'research_grid_img2',
        label: 'UPLOAD RESEARCH BOARD IMAGE 2',
        placeholderHint: 'Fabric Scrap Sorting Audit / Sustainable Fieldwork',
        defaultUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        caption: 'Field Research: Cutting Room Scraps'
      }
    ]
  },
  {
    pageNumber: 10,
    sectionId: 'concept',
    sectionTitle: '02 — CONCEPT & RESEARCH',
    title: 'TARGET CUSTOMER / PERSONA',
    subtitle: 'The Contemporary Connoisseur (Ages 18–32)',
    bodyText: [
      'The muse is a self-assured, design-literate individual who navigates global cosmopolitan spaces while cherishing artisanal authenticity. They value conscious luxury, intentional tailoring, and storytelling through clothing over fleeting fast-fashion cycles.'
    ],
    annotations: [
      { title: 'DEMOGRAPHICS', desc: 'Age: 20–32 | Gender: Universal / Fluid | Urban Cosmopolitan (Mumbai, London, Tokyo, NYC, Ahmedabad)' },
      { title: 'LIFESTYLE & CAREER', desc: 'Creative Directors, Architects, Curators, Founders, Performing Artists, Conscious Collectors' },
      { title: 'PSYCHOGRAPHICS', desc: 'Confident, intellectually curious, uncompromising about fit & tactile quality, eco-conscious' },
      { title: 'OCCASION WARDROBE', desc: 'Gallery vernissages, high-profile galas, creative summits, heritage cultural ceremonies' }
    ],
    visualSlots: [
      {
        slotId: 'persona_lifestyle_card',
        label: 'UPLOAD TARGET PERSONA / LIFESTYLE CARD',
        placeholderHint: 'High-Fashion Editorial Lifestyle Photo of Ideal Customer',
        defaultUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
        caption: 'Target Persona: The Thoughtful Visionary'
      }
    ]
  },
  {
    pageNumber: 11,
    sectionId: 'concept',
    sectionTitle: '02 — CONCEPT & RESEARCH',
    title: 'MARKET & TREND RESEARCH',
    subtitle: 'Strategic Positioning: Demi-Couture & Conscious Artisanal Luxury',
    bodyText: [
      'Benchmarking against contemporary global luxury houses and progressive Indian demi-couture labels. The collection occupies a distinctive sweet spot: combining the sharp precision of European tailoring with the unhurried craft mastery of Indian artisan ateliers.'
    ],
    bulletPoints: [
      'SILHOUETTE FORECAST: Elevated structured shoulders, corseted waists, fluid lower-body draping.',
      'COLOR TREND: Deep earthy wines, rich oxblood, warm sandstone neutrals replacing stark monochromes.',
      'SUSTAINABILITY DEMAND: Transparency in scrap utilization and certified organic fibers.',
      'POSITIONING MATRIX: High craftsmanship, bespoke exclusivity, accessible luxury price point.'
    ],
    visualSlots: [
      {
        slotId: 'market_trend_board',
        label: 'UPLOAD MARKET & TREND RESEARCH BOARD',
        placeholderHint: 'Runway Trend Analysis / Market Mapping Chart',
        defaultUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
        caption: 'Market Positioning & Trend Mapping 2026/27'
      }
    ]
  },

  // SECTION 03: DESIGN LANGUAGE (12 - 16)
  {
    pageNumber: 12,
    sectionId: 'design_language',
    sectionTitle: '03 — DESIGN LANGUAGE',
    title: 'COLOUR BOARD',
    subtitle: 'Harmonious Palette: Wine, Burgundy, Warm Beige, Ivory & Charcoal',
    bodyText: [
      'A disciplined 9-shade luxury palette balanced to achieve 45% Ivory/Off-White foundation, 25% Sand & Warm Beige structural backdrop, 20% Deep Wine & Burgundy accents, and 10% Charcoal definition lines.'
    ],
    visualSlots: [
      {
        slotId: 'color_board_visual',
        label: 'UPLOAD PHYSICAL COLOUR SWATCH PHOTO',
        placeholderHint: 'Artisan Dyed Fabric Swatches / Color Proportion Collage',
        defaultUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
        caption: 'Natural Dye Swatch & Fabric Palette Balance'
      }
    ]
  },
  {
    pageNumber: 13,
    sectionId: 'design_language',
    sectionTitle: '03 — DESIGN LANGUAGE',
    title: 'MATERIAL / FABRIC BOARD',
    subtitle: 'Tactile Textiles: Virgin Wools, Mulmul, Mulberry Silks & Deadstock Patola',
    bodyText: [
      'Materials were selected based on tactile resonance, drape behavior, breathability, and ecological footprint. Structured virgin wool gabardines anchor coats, while silk organzas and Chanderi provide weightless, light-diffusing movement.'
    ],
    visualSlots: [
      {
        slotId: 'material_board_swatch_grid',
        label: 'UPLOAD FABRIC SWATCHES FLATLAY',
        placeholderHint: 'Flatlay of Fabric Swatches with Spec Labels',
        defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
        caption: 'Physical Material Library & Swatch Board'
      }
    ]
  },
  {
    pageNumber: 14,
    sectionId: 'design_language',
    sectionTitle: '03 — DESIGN LANGUAGE',
    title: 'TEXTURE & SURFACE BOARD',
    subtitle: 'Sensory Techniques: Dori Cording, Zardozi, Smocking & Pleating',
    bodyText: [
      'Surface ornamentation is treated as a structural component rather than superficial decoration. Cording reinforces seam stress points; Canadian smocking adds dynamic elasticity; origami pleating directs fabric volume across the body.'
    ],
    visualSlots: [
      {
        slotId: 'texture_board_macro1',
        label: 'UPLOAD TEXTURE CLOSE-UP 01',
        placeholderHint: 'Macro Photo of Dori Work / Zardozi Embroidery',
        defaultUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80',
        caption: 'Texture 01: Silk Cord Relief'
      },
      {
        slotId: 'texture_board_macro2',
        label: 'UPLOAD TEXTURE CLOSE-UP 02',
        placeholderHint: 'Macro Photo of Smocking / Heat Pleats',
        defaultUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        caption: 'Texture 02: Volumetric Manipulation'
      }
    ]
  },
  {
    pageNumber: 15,
    sectionId: 'design_language',
    sectionTitle: '03 — DESIGN LANGUAGE',
    title: 'SILHOUETTE BOARD',
    subtitle: 'Croquis Exploration: Hourglass, Column, Architectural Flare & Draped Asymmetry',
    bodyText: [
      'Silhouette studies investigating the equilibrium between constriction and freedom. Tight boned corsetry transitions into voluminous flared kalis and cascading train extensions.'
    ],
    annotations: [
      { title: 'LOOK 01 SILHOUETTE', desc: 'Inverted Triangle to Hourglass (Sharp Shoulder + Peplum Flare)' },
      { title: 'LOOK 02 SILHOUETTE', desc: 'Asymmetric Column with Kinetic Diagonal Side Cascade' },
      { title: 'LOOK 03 SILHOUETTE', desc: 'Boxy Cropped Architecture paired with Wide Flared Culotte' },
      { title: 'LOOK 04 SILHOUETTE', desc: 'Bell-Curve 32-Kali Kalidar with Fitted Structural Bodice' },
      { title: 'LOOK 05 SILHOUETTE', desc: 'Molded Wing-Shoulder Bodice with Engineered Pleated Saree' },
      { title: 'LOOK 06 SILHOUETTE', desc: 'Angrakha Diagonal Wrap over Flared Farshi Pajama' }
    ],
    visualSlots: [
      {
        slotId: 'silhouette_croquis_sheet',
        label: 'UPLOAD SILHOUETTE CROQUIS EXPLORATION',
        placeholderHint: 'Fashion Croquis / Lineup Silhouette Study Sheet',
        defaultUrl: '/hetvi_look01.jpg',
        caption: 'Silhouette Line Studies & Proportion Mapping'
      }
    ]
  },
  {
    pageNumber: 16,
    sectionId: 'design_language',
    sectionTitle: '03 — DESIGN LANGUAGE',
    title: 'DETAILS & DESIGN ELEMENTS BOARD',
    subtitle: 'Micro-Anatomy: Collars, Cuffs, Seams, Pockets & Fastenings',
    bodyText: [
      'A technical glossary of bespoke design details: tailored lapel points, bound buttonholes, hand-twisted latkan tassels, and custom antique brass closures.'
    ],
    bulletPoints: [
      'COLLARS: Origami notched lapel, mandarin wing-collar, structured crossover wrap.',
      'SLEEVES: Raglan tailored sleeve, gathered organza bishop sleeve, flared pagoda cuff.',
      'POCKETS: Double-welted slant pockets with burgundy bar-tacks, concealed inseam pockets.',
      'CLOSURES: Hand-stitched potli buttons, exposed Riri zips, spiral steel lace-up back.'
    ],
    visualSlots: [
      {
        slotId: 'details_macro_sheet',
        label: 'UPLOAD DETAILS & ELEMENTS BOARD',
        placeholderHint: 'Technical Detail Sketches / Micro Photos of Collars & Closures',
        defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
        caption: 'Bespoke Finishing & Fastening Details'
      }
    ]
  },

  // SECTION 04: EXPERIMENTATION & DEVELOPMENT (17 - 22)
  {
    pageNumber: 17,
    sectionId: 'development',
    sectionTitle: '04 — EXPERIMENTATION & DEVELOPMENT',
    title: 'MATERIAL EXPERIMENTATION',
    subtitle: 'Fabric Fusion, Stiffening Tests & Interfacing Chemistry',
    bodyText: [
      'Documenting material trial phases: horsehair canvas fusing, bias-stretch tension tests, and multi-layer fusing to create self-supporting collar wings.'
    ],
    annotations: [
      { title: 'TRIAL 01: Fused Wool Gabardine', desc: 'Result: High crease retention, ideal for Look 01 trench lapels and Look 03 culottes.' },
      { title: 'TRIAL 02: Organza Tier Stiffening', desc: 'Result: Crinoline braid insertion gives Kalidar skirts dramatic bell flare with zero bulk.' },
      { title: 'TRIAL 03: Velvet & Muslin Backing', desc: 'Result: Prevents velvet pile crushing during intensive machine and hand embroidery.' }
    ],
    visualSlots: [
      {
        slotId: 'mat_exp_photo_1',
        label: 'UPLOAD MATERIAL EXPERIMENT PHOTO 1',
        placeholderHint: 'Fabric Stiffening & Draping Trial Photo',
        defaultUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        caption: 'Experiment 01: Interfacing Rigidity'
      },
      {
        slotId: 'mat_exp_photo_2',
        label: 'UPLOAD MATERIAL EXPERIMENT PHOTO 2',
        placeholderHint: 'Bias Drape & Tension Testing Photo',
        defaultUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        caption: 'Experiment 02: Multi-Layer Resilience'
      }
    ]
  },
  {
    pageNumber: 18,
    sectionId: 'development',
    sectionTitle: '04 — EXPERIMENTATION & DEVELOPMENT',
    title: 'TEXTILE / SURFACE EXPERIMENTATION',
    subtitle: 'The Textile Lab: Smocking, Dori Cording & Zero-Waste Mosaics',
    bodyText: [
      'Hands-on laboratory trials testing tactile manipulation methods. Realized samples of Canadian honeycomb smocking, 3mm pure silk core cording, and scrap-fabric mosaic bonding.'
    ],
    visualSlots: [
      {
        slotId: 'textile_exp_lab_1',
        label: 'UPLOAD TEXTILE LAB SAMPLE 1',
        placeholderHint: 'Handmade Smocking / Cording Sample Photo',
        defaultUrl: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80',
        caption: 'Lab Sample: Raised Dori Lattice'
      },
      {
        slotId: 'textile_exp_lab_2',
        label: 'UPLOAD TEXTILE LAB SAMPLE 2',
        placeholderHint: 'Upcycled Scrap Mosaic Sample Photo',
        defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
        caption: 'Lab Sample: Patola Scrap Reassembly'
      }
    ]
  },
  {
    pageNumber: 19,
    sectionId: 'development',
    sectionTitle: '04 — EXPERIMENTATION & DEVELOPMENT',
    title: 'INITIAL DESIGN SKETCHES',
    subtitle: 'Raw Sketchbook Pages: 30+ Thumbnail Iterations & Exploratory Doodles',
    bodyText: [
      'Authentic, unedited designer sketchbook scans showcasing rapid ideation, proportion adjustments, rejected silhouettes, and handwritten margin notes on grainlines and seams.'
    ],
    visualSlots: [
      {
        slotId: 'sketchbook_page_scan',
        label: 'UPLOAD INITIAL SKETCHBOOK SPREAD',
        placeholderHint: 'Handmade Sketchbook Page / Thumbnail Drawings Spread',
        defaultUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
        caption: 'Initial Ideation & Gestural Croquis Explorations'
      }
    ]
  },
  {
    pageNumber: 20,
    sectionId: 'development',
    sectionTitle: '04 — EXPERIMENTATION & DEVELOPMENT',
    title: 'DESIGN DEVELOPMENT',
    subtitle: 'Iterative Refinement: Sketch 01 → 3D Draping → Pattern Shift → Final Cut',
    bodyText: [
      'Illustrating the systematic transformation of key concepts. How a rough sketch of a boxy trench matured into the final deconstructed corset coat with detachable capelet.'
    ],
    bulletPoints: [
      'STAGE 1: Gestural silhouette sketch mapping volume distribution.',
      'STAGE 2: Calico / Muslin toile draping on standard UK 8 dress form.',
      'STAGE 3: Seam repositioning and dart elimination via rotational drafting.',
      'STAGE 4: Final flat pattern digitized with seam allowances and grainlines.'
    ],
    visualSlots: [
      {
        slotId: 'design_dev_timeline_sheet',
        label: 'UPLOAD DESIGN DEVELOPMENT SHEET',
        placeholderHint: 'Step-by-step Development Sketches (Sketch 1 to Refined)',
        defaultUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
        caption: 'Iterative Evolution from Calico Toile to Final Form'
      }
    ]
  },
  {
    pageNumber: 21,
    sectionId: 'development',
    sectionTitle: '04 — EXPERIMENTATION & DEVELOPMENT',
    title: 'FINAL DESIGN SELECTION',
    subtitle: 'The 7 Chosen Garments: 3 Western Statements & 4 Ethnic Masterpieces',
    bodyText: [
      'Selection criteria: Each garment was chosen for its distinct structural silhouette, thematic cohesion with the color palette, and demonstration of a unique textile craft technique.'
    ],
    bulletPoints: [
      'LOOK 01 (Western): The Structured Sovereign (Sculptural Trench & Corset)',
      'LOOK 02 (Western): The Fluid Monolith (Deconstructed Asymmetric Gown)',
      'LOOK 03 (Western): The Kinetic Tailored Suite (Cutaway Blazer & Culottes)',
      'LOOK 04 (Ethnic): The Heritage Weaver (Contemporary Bandhani Kalidar)',
      'LOOK 05 (Ethnic): The Patola Rebirth (Upcycled Concept Saree & Molded Blouse)',
      'LOOK 06 (Ethnic): The Royal Alchemist (Velvet Angrakha & Farshi Pajama)',
      'LOOK 07 (Ethnic): The Ashavali Architect (Brocade Capelet & 48-Kali Pleated Lehenga)'
    ],
    visualSlots: [
      {
        slotId: 'final_selection_board',
        label: 'UPLOAD FINAL DESIGN SELECTION SPREAD',
        placeholderHint: 'Lineup Board of All 7 Final Designs',
        defaultUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
        caption: 'The Final Seven Capsule Selection'
      }
    ]
  },
  {
    pageNumber: 22,
    sectionId: 'development',
    sectionTitle: '04 — EXPERIMENTATION & DEVELOPMENT',
    title: 'COLLECTION LINE-UP',
    subtitle: 'Complete 7-Look Runway Lineup: Cohesion, Rhythm & Silhouette Harmony',
    bodyText: [
      'The definitive collection lineup presented in rhythmic runway order. Alternating between structured beige wools, liquid burgundy silks, ivory organzas, deep wine velvets, and gold Ashavali brocades.'
    ],
    visualSlots: [
      {
        slotId: 'collection_lineup_full',
        label: 'UPLOAD FULL COLLECTION LINEUP ILLUSTRATION',
        placeholderHint: 'High-Res Full Collection Lineup Illustration / Render',
        defaultUrl: '/hetvi_look01.jpg',
        caption: 'Full 7-Look Runway Lineup: W-01 to E-04'
      }
    ]
  },

  // SECTION 05: WESTERN COLLECTION (23 - 29)
  {
    pageNumber: 23,
    sectionId: 'western',
    sectionTitle: '05 — WESTERN COLLECTION',
    title: 'WESTERN LOOK 01 — FINAL ILLUSTRATION',
    subtitle: 'The Structured Sovereign | Deconstructed Trench & Corset Bodice',
    heroTagline: 'Look Code: W-01 | Silhouette: Hourglass-Architectural Hybrid',
    quote: '“Tailoring as an armor that reveals rather than conceals.”',
    bodyText: [
      'A deconstructed trench coat featuring exaggerated peaked shoulder wings, deep wine velvet contrast bindings, and an exposed internal boned corset crafted from upcycled wool gabardine.'
    ],
    visualSlots: [
      {
        slotId: 'western_01_illustration',
        label: 'UPLOAD WESTERN LOOK 01 FINAL ILLUSTRATION',
        placeholderHint: 'Full-Length Fashion Illustration for Look 01',
        defaultUrl: '/hetvi_look01.jpg',
        caption: 'Western Look 01: Final Editorial Fashion Illustration'
      }
    ]
  },
  {
    pageNumber: 24,
    sectionId: 'western',
    sectionTitle: '05 — WESTERN COLLECTION',
    title: 'WESTERN LOOK 01 — TECHNICAL DETAILS',
    subtitle: 'Technical Flat (Front & Back), Tech Pack & Construction Specs',
    techData: { lookIndex: 0 },
    visualSlots: [
      {
        slotId: 'western_01_flat_front',
        label: 'UPLOAD WESTERN LOOK 01 FRONT TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Front View',
        defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Front View with Boning Callouts'
      },
      {
        slotId: 'western_01_flat_back',
        label: 'UPLOAD WESTERN LOOK 01 BACK TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Back View',
        defaultUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Back View with Storm Flap Vent'
      }
    ]
  },
  {
    pageNumber: 25,
    sectionId: 'western',
    sectionTitle: '05 — WESTERN COLLECTION',
    title: 'WESTERN LOOK 02 — FINAL ILLUSTRATION',
    subtitle: 'The Fluid Monolith | Deconstructed Asymmetric Draped Column Gown',
    heroTagline: 'Look Code: W-02 | Silhouette: Asymmetric Bias Column with Cascading Train',
    quote: '“Liquid silk constrained by architectural discipline.”',
    bodyText: [
      'Rich burgundy mulberry silk crepe cut on the true bias, draping effortlessly across a molded dusty rose hip yoke, finished with a high-thigh slash and floor-grazing weighted train.'
    ],
    visualSlots: [
      {
        slotId: 'western_02_illustration',
        label: 'UPLOAD WESTERN LOOK 02 FINAL ILLUSTRATION',
        placeholderHint: 'Full-Length Fashion Illustration for Look 02',
        defaultUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
        caption: 'Western Look 02: Final Editorial Fashion Illustration'
      }
    ]
  },
  {
    pageNumber: 26,
    sectionId: 'western',
    sectionTitle: '05 — WESTERN COLLECTION',
    title: 'WESTERN LOOK 02 — TECHNICAL DETAILS',
    subtitle: 'Technical Flat (Front & Back), Tech Pack & Construction Specs',
    techData: { lookIndex: 1 },
    visualSlots: [
      {
        slotId: 'western_02_flat_front',
        label: 'UPLOAD WESTERN LOOK 02 FRONT TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Front View',
        defaultUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Front View with Bias Seam Lines'
      },
      {
        slotId: 'western_02_flat_back',
        label: 'UPLOAD WESTERN LOOK 02 BACK TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Back View',
        defaultUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Back View with Cowl Drape'
      }
    ]
  },
  {
    pageNumber: 27,
    sectionId: 'western',
    sectionTitle: '05 — WESTERN COLLECTION',
    title: 'WESTERN LOOK 03 — FINAL ILLUSTRATION',
    subtitle: 'The Kinetic Tailored Suite | Cutaway Blazer & Origami Pleated Culottes',
    heroTagline: 'Look Code: W-03 | Silhouette: Cropped Boxy Jacket & Geometric Flared Culotte',
    quote: '“Sharp origami folds engineered for effortless modern movement.”',
    bodyText: [
      'A cropped boxy cutaway jacket featuring faceted lapels and back harness straps, paired with voluminous accordion-pleated linen culottes engineered from precision pattern manipulation.'
    ],
    visualSlots: [
      {
        slotId: 'western_03_illustration',
        label: 'UPLOAD WESTERN LOOK 03 FINAL ILLUSTRATION',
        placeholderHint: 'Full-Length Fashion Illustration for Look 03',
        defaultUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
        caption: 'Western Look 03: Final Editorial Fashion Illustration'
      }
    ]
  },
  {
    pageNumber: 28,
    sectionId: 'western',
    sectionTitle: '05 — WESTERN COLLECTION',
    title: 'WESTERN LOOK 03 — TECHNICAL DETAILS',
    subtitle: 'Technical Flat (Front & Back), Tech Pack & Construction Specs',
    techData: { lookIndex: 2 },
    visualSlots: [
      {
        slotId: 'western_03_flat_front',
        label: 'UPLOAD WESTERN LOOK 03 FRONT TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Front View',
        defaultUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Front View with Origami Pleat Mapping'
      },
      {
        slotId: 'western_03_flat_back',
        label: 'UPLOAD WESTERN LOOK 03 BACK TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Back View',
        defaultUrl: '/hetvi_look01.jpg',
        caption: 'CAD Flat: Back View with Harness Straps'
      }
    ]
  },
  {
    pageNumber: 29,
    sectionId: 'western',
    sectionTitle: '05 — WESTERN COLLECTION',
    title: 'WESTERN MINI COLLECTION',
    subtitle: 'Campaign Styling Direction: Look 01, Look 02, Look 03 Together',
    bodyText: [
      'Comprehensive editorial styling board for the Western capsule. Minimalist architectural footwear, sculptural brushed brass jewelry, sleek swept-back hair, and warm chiaroscuro lighting.'
    ],
    annotations: [
      { title: 'STYLING & ACCESSORIES', desc: 'Sculpted brass cuffs, square-toe architectural leather mules, dark wine leather waist harnesses.' },
      { title: 'HAIR & MAKEUP', desc: 'Wet-look slicked back chignon, natural glass skin, bold deep wine blurred lip tint.' },
      { title: 'PHOTOGRAPHY MOOD', desc: 'High-contrast studio flash against warm sandstone backdrop, angled hard shadows.' }
    ],
    visualSlots: [
      {
        slotId: 'western_campaign_triptych',
        label: 'UPLOAD WESTERN MINI COLLECTION CAMPAIGN',
        placeholderHint: 'Editorial 3-Look Campaign Spread or Triptych Photo',
        defaultUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        caption: 'Western Capsule: 3 Looks Campaign Cohesion'
      }
    ]
  },

  // SECTION 06: ETHNIC COLLECTION (30 - 36)
  {
    pageNumber: 30,
    sectionId: 'ethnic',
    sectionTitle: '06 — ETHNIC COLLECTION',
    title: 'ETHNIC LOOK 01 — FINAL ILLUSTRATION',
    subtitle: 'The Heritage Weaver | Modernized Bandhani & Structural Cording Kalidar',
    heroTagline: 'Look Code: E-01 | Silhouette: 32-Panel Bell Kalidar with Sheer Sleeves',
    quote: '“Translating the ancestral rhythm of Bandhani dots into contemporary geometry.”',
    bodyText: [
      '32-panel kalidar crafted in handwoven Chanderi silk with chevron micro-Bandhani tie-dye, structured dori cording across the corset bodice, and layered horsehair hem flare.'
    ],
    visualSlots: [
      {
        slotId: 'ethnic_01_illustration',
        label: 'UPLOAD ETHNIC LOOK 01 FINAL ILLUSTRATION',
        placeholderHint: 'Full-Length Fashion Illustration for Ethnic Look 01',
        defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
        caption: 'Ethnic Look 01: Final Editorial Fashion Illustration'
      }
    ]
  },
  {
    pageNumber: 31,
    sectionId: 'ethnic',
    sectionTitle: '06 — ETHNIC COLLECTION',
    title: 'ETHNIC LOOK 01 — TECHNICAL DETAILS',
    subtitle: 'Technical Flat (Front & Back), Tech Pack & Construction Specs',
    techData: { lookIndex: 3 },
    visualSlots: [
      {
        slotId: 'ethnic_01_flat_front',
        label: 'UPLOAD ETHNIC LOOK 01 FRONT TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Front View',
        defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Front View with 32 Kali Breakdown'
      },
      {
        slotId: 'ethnic_01_flat_back',
        label: 'UPLOAD ETHNIC LOOK 01 BACK TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Back View',
        defaultUrl: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Back View with Potli Placket'
      }
    ]
  },
  {
    pageNumber: 32,
    sectionId: 'ethnic',
    sectionTitle: '06 — ETHNIC COLLECTION',
    title: 'ETHNIC LOOK 02 — FINAL ILLUSTRATION',
    subtitle: 'The Patola Rebirth | Upcycled Patola Draped Concept Saree & Molded Blouse',
    heroTagline: 'Look Code: E-02 | Silhouette: Pre-Pleated Saree with Structured Armature Blouse',
    quote: '“Giving precious handwoven remnants a second sovereign life.”',
    bodyText: [
      'Upcycled Patan Patola silk scrap collage along the pallu with gold couching embroidery, pre-stitched accordion front drape, and molded wing-shoulder corset blouse in deep wine velvet.'
    ],
    visualSlots: [
      {
        slotId: 'ethnic_02_illustration',
        label: 'UPLOAD ETHNIC LOOK 02 FINAL ILLUSTRATION',
        placeholderHint: 'Full-Length Fashion Illustration for Ethnic Look 02',
        defaultUrl: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85',
        caption: 'Ethnic Look 02: Final Editorial Fashion Illustration'
      }
    ]
  },
  {
    pageNumber: 33,
    sectionId: 'ethnic',
    sectionTitle: '06 — ETHNIC COLLECTION',
    title: 'ETHNIC LOOK 02 — TECHNICAL DETAILS',
    subtitle: 'Technical Flat (Front & Back), Tech Pack & Construction Specs',
    techData: { lookIndex: 4 },
    visualSlots: [
      {
        slotId: 'ethnic_02_flat_front',
        label: 'UPLOAD ETHNIC LOOK 02 FRONT TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Front View',
        defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Front View with Pre-Draped Pleats'
      },
      {
        slotId: 'ethnic_02_flat_back',
        label: 'UPLOAD ETHNIC LOOK 02 BACK TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Back View',
        defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Back View with Wing-Shoulder Armor'
      }
    ]
  },
  {
    pageNumber: 34,
    sectionId: 'ethnic',
    sectionTitle: '06 — ETHNIC COLLECTION',
    title: 'ETHNIC LOOK 03 — FINAL ILLUSTRATION',
    subtitle: 'The Royal Alchemist | Hand-Embroidered Velvet Angrakha & Farshi Pajama',
    heroTagline: 'Look Code: E-03 | Silhouette: Crossover Wrap Tunic & Tiered Farshi Flare',
    quote: '“Sumptuous Mughal court dignity meets modern sheer lightness.”',
    bodyText: [
      'A deep wine micro-velvet Angrakha embellished with 120+ hours of hand-worked Zardozi and French knot architectural motifs, opening onto layered tiers of airy ivory silk organza.'
    ],
    visualSlots: [
      {
        slotId: 'ethnic_03_illustration',
        label: 'UPLOAD ETHNIC LOOK 03 FINAL ILLUSTRATION',
        placeholderHint: 'Full-Length Fashion Illustration for Ethnic Look 03',
        defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
        caption: 'Ethnic Look 03: Final Editorial Fashion Illustration'
      }
    ]
  },
  {
    pageNumber: 35,
    sectionId: 'ethnic',
    sectionTitle: '06 — ETHNIC COLLECTION',
    title: 'ETHNIC LOOK 03 — TECHNICAL DETAILS',
    subtitle: 'Technical Flat (Front & Back), Tech Pack & Construction Specs',
    techData: { lookIndex: 5 },
    visualSlots: [
      {
        slotId: 'ethnic_03_flat_front',
        label: 'UPLOAD ETHNIC LOOK 03 FRONT TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Front View',
        defaultUrl: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Front View with Angrakha Overlap'
      },
      {
        slotId: 'ethnic_03_flat_back',
        label: 'UPLOAD ETHNIC LOOK 03 BACK TECHNICAL FLAT',
        placeholderHint: 'Vector / CAD Flat Drawing - Back View',
        defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        caption: 'CAD Flat: Back View with Farshi Leg Hemlines'
      }
    ]
  },
  {
    pageNumber: 36,
    sectionId: 'ethnic',
    sectionTitle: '06 — ETHNIC COLLECTION',
    title: 'ETHNIC MINI COLLECTION',
    subtitle: 'Campaign Styling Direction: Look 04, Look 05, Look 06 Together',
    bodyText: [
      'Grand editorial campaign board for the Ethnic capsule. Heavy polki and filigree temple jewels, metallic embroidered juttis, soft kohl-rimmed eyes, and warm ambient sunlight.'
    ],
    annotations: [
      { title: 'JEWELLERY & ORNAMENTATION', desc: 'Uncut Polki diamond chokers, hammered antique gold ear-cuffs, delicate haathphool.' },
      { title: 'HAIR & MAKEUP', desc: 'Textured center-parted low braid interwoven with wine silk ribbons, soft smoky bronze eyes.' },
      { title: 'CAMPAIGN DIRECTION', desc: 'Captured in an Ahmedabad heritage haveli courtyard, warm afternoon sun casting stepwell shadows.' }
    ],
    visualSlots: [
      {
        slotId: 'ethnic_campaign_triptych',
        label: 'UPLOAD ETHNIC MINI COLLECTION CAMPAIGN',
        placeholderHint: 'Editorial 3-Look Ethnic Campaign Spread / Triptych Photo',
        defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
        caption: 'Ethnic Capsule: 3 Looks Heritage Campaign'
      }
    ]
  },

  // SECTION 07: TECHNICAL & MAKING (37 - 39)
  {
    pageNumber: 37,
    sectionId: 'technical',
    sectionTitle: '07 — TECHNICAL & MAKING',
    title: 'CONSTRUCTION PROCESS',
    subtitle: 'Pattern → Cutting → Preparation → Stitching → Fitting → Finishing',
    bodyText: [
      'A chronological visual timeline documenting the physical realization of the garments in the Indus University garment construction lab.'
    ],
    annotations: [
      { title: '01. PATTERN DRAFTING', desc: 'Drafting 2D block patterns with zero-waste lay planning.' },
      { title: '02. PRECISION CUTTING', desc: 'Careful grainline alignment on silk crepe and wool gabardine.' },
      { title: '03. INTERFACING & BASTING', desc: 'Pad-stitching horsehair canvas and fusing seam stabilizers.' },
      { title: '04. ASSEMBLY & EMBROIDERY', desc: 'Precision machine stitching at 12 SPI and hand Zardozi frame work.' },
      { title: '05. FITTING & REFINEMENT', desc: 'Model toile fitting, hem adjustments, and balance checking.' },
      { title: '06. COUTURE FINISHING', desc: 'Hand-rolled hems, custom potli buttons, and steam pressing.' }
    ],
    visualSlots: [
      {
        slotId: 'construction_timeline_photo_1',
        label: 'UPLOAD CONSTRUCTION PHOTO: PATTERN & CUTTING',
        placeholderHint: 'Photo of Pattern Drafting / Fabric Cutting Table',
        defaultUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
        caption: 'Stage 01: Pattern Drafting & Cutting Table'
      },
      {
        slotId: 'construction_timeline_photo_2',
        label: 'UPLOAD CONSTRUCTION PHOTO: STITCHING & FITTING',
        placeholderHint: 'Photo of Sewing Machine / Dress Form Toile Fitting',
        defaultUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        caption: 'Stage 02: Sewing Assembly & Toile Refinement'
      }
    ]
  },
  {
    pageNumber: 38,
    sectionId: 'technical',
    sectionTitle: '07 — TECHNICAL & MAKING',
    title: 'FABRIC & TRIM SPECIFICATION',
    subtitle: 'Master Bill of Materials (BOM) for All 6 Looks',
    bodyText: [
      'Comprehensive factory-ready specification ledger detailing exact fabric composition, GSM, thread count, lining choices, zipper types, and trim origins for production scale.'
    ],
    visualSlots: []
  },
  {
    pageNumber: 39,
    sectionId: 'technical',
    sectionTitle: '07 — TECHNICAL & MAKING',
    title: 'TECHNICAL DETAILS / CONSTRUCTION SHEETS',
    subtitle: 'Cross-Sections, Seam Architecture & Stitch Specifications',
    bodyText: [
      'Detailed cross-sectional diagrams demonstrating the internal anatomy of garments: French seams, bound seams, boning channel encasements, horsehair braid hems, and pad-stitched lapels.'
    ],
    bulletPoints: [
      'SEAM SPECIFICATION: Class 301 lockstitch at 12–14 stitches per inch (SPI).',
      'HEM TREATMENT: 5cm blind-stitched hem with 2.5cm bias crinoline horsehair stabilizer.',
      'BONING HOUSING: 100% cotton twill channel tape stitched with dual-needle topstitching.',
      'EDGE FINISHES: 0.3cm French seams on transparent organzas; bias silk bindings on coat edges.'
    ],
    visualSlots: [
      {
        slotId: 'tech_spec_diagram_sheet',
        label: 'UPLOAD TECHNICAL CONSTRUCTION SHEET',
        placeholderHint: 'CAD Construction Diagrams / Cross-Section Drawings',
        defaultUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
        caption: 'Master Tech Pack Seam & Stitch Cross-Sections'
      }
    ]
  },

  // SECTION 08: FINAL PRESENTATION (40 - 42)
  {
    pageNumber: 40,
    sectionId: 'final',
    sectionTitle: '08 — FINAL PRESENTATION',
    title: 'WESTERN FINAL PHOTOSHOOT',
    subtitle: 'Editorial Campaign: Look 01, Look 02, Look 03 in Situ',
    bodyText: [
      'High-impact editorial campaign captured on medium-format camera. Demonstrating garment drape, structural volume, and kinetic movement in dynamic studio lighting.'
    ],
    visualSlots: [
      {
        slotId: 'western_photoshoot_hero1',
        label: 'UPLOAD WESTERN PHOTOSHOOT HERO 01',
        placeholderHint: 'Full-Body Editorial Shoot of Western Look 01',
        defaultUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
        caption: 'W-01: Sculptural Trench in Motion'
      },
      {
        slotId: 'western_photoshoot_hero2',
        label: 'UPLOAD WESTERN PHOTOSHOOT HERO 02',
        placeholderHint: 'Full-Body Editorial Shoot of Western Look 02',
        defaultUrl: '/hetvi_look01.jpg',
        caption: 'W-02: Fluid Column Gown Drape'
      },
      {
        slotId: 'western_photoshoot_hero3',
        label: 'UPLOAD WESTERN PHOTOSHOOT HERO 03',
        placeholderHint: 'Full-Body Editorial Shoot of Western Look 03',
        defaultUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
        caption: 'W-03: Pleated Culotte Suite'
      }
    ]
  },
  {
    pageNumber: 41,
    sectionId: 'final',
    sectionTitle: '08 — FINAL PRESENTATION',
    title: 'ETHNIC FINAL PHOTOSHOOT',
    subtitle: 'Editorial Campaign: Look 04, Look 05, Look 06 in Situ',
    bodyText: [
      'Luminous editorial photography celebrating the tactile opulence of the Ethnic capsule. Sunlight filtering through sheer organzas, velvet rich depth, and sparkling metallic zari.'
    ],
    visualSlots: [
      {
        slotId: 'ethnic_photoshoot_hero1',
        label: 'UPLOAD ETHNIC PHOTOSHOOT HERO 01',
        placeholderHint: 'Full-Body Editorial Shoot of Ethnic Look 01 (Bandhani Kalidar)',
        defaultUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
        caption: 'E-01: Contemporary Kalidar Flare'
      },
      {
        slotId: 'ethnic_photoshoot_hero2',
        label: 'UPLOAD ETHNIC PHOTOSHOOT HERO 02',
        placeholderHint: 'Full-Body Editorial Shoot of Ethnic Look 02 (Patola Saree)',
        defaultUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
        caption: 'E-02: Upcycled Patola Draped Saree'
      },
      {
        slotId: 'ethnic_photoshoot_hero3',
        label: 'UPLOAD ETHNIC PHOTOSHOOT HERO 03',
        placeholderHint: 'Full-Body Editorial Shoot of Ethnic Look 03 (Velvet Angrakha)',
        defaultUrl: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=85',
        caption: 'E-03: Velvet Angrakha & Farshi'
      }
    ]
  },
  {
    pageNumber: 42,
    sectionId: 'final',
    sectionTitle: '08 — FINAL PRESENTATION',
    title: 'FINAL COLLECTION + CONCLUSION + CONTACT',
    subtitle: 'The Synthesis of Craft & Intention',
    heroTagline: 'Hetvi Kapadia | Fashion Design Student | Indus University, Ahmedabad',
    quote: '“Designing with intention. Creating with identity.”',
    bodyText: [
      'This collection stands as a testament to my journey as a fashion design student: learning to embrace the rigorous discipline of pattern making, the tactile storytelling of historic Indian textiles, and the urgent imperative for sustainable circular thinking.',
      'As I step forward into the fashion industry, my aim is to continue building garments that balance emotional craftsmanship with fearless contemporary silhouettes—honoring where we come from while daring to shape the future of dress.'
    ],
    annotations: [
      { title: 'INSTAGRAM', desc: '@hetvikapadia.design' },
      { title: 'EMAIL', desc: 'hetvi8104@gmail.com' },
      { title: 'INSTITUTION', desc: 'Indus University, Ahmedabad, Gujarat, India' },
      { title: 'PORTFOLIO STATUS', desc: 'Official Degree Graduation Collection 2026' }
    ],
    visualSlots: [
      {
        slotId: 'final_closing_hero',
        label: 'UPLOAD CLOSING FINAL HERO IMAGE',
        placeholderHint: 'Final Ensemble Collage / Portrait with Collection',
        defaultUrl: '/hetvi_portrait.jpg',
        caption: 'Hetvi Kapadia — Ready for Industry & Atelier Collaboration'
      }
    ]
  }
];
