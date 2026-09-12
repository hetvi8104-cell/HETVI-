import { GarmentLook, ColorSwatch, TextileSample } from '../types/portfolio';
import neoKineticHeroImg from '../assets/images/neo_kinetic_chroma_garment_1787205931733.jpg';
import neoKineticDetailImg from '../assets/images/neo_kinetic_macro_detail_1787205946987.jpg';
import ashavaliHeroImg from '../assets/images/ashavali_brocade_lehenga_1788369652028.jpg';
import ashavaliDetailImg from '../assets/images/ashavali_detail_texture_1788369670696.jpg';

export const COLOR_PALETTE: ColorSwatch[] = [
  {
    name: 'Off White',
    hex: '#FCFAF7',
    rgb: 'rgb(252, 250, 247)',
    proportion: 25,
    usage: 'Base background, lining, breathing space, modern minimal negative space'
  },
  {
    name: 'Ivory',
    hex: '#F7F3EC',
    rgb: 'rgb(247, 243, 236)',
    proportion: 20,
    usage: 'Primary canvas, editorial paper tone, silks, organza layers'
  },
  {
    name: 'Warm Beige',
    hex: '#D8C7B5',
    rgb: 'rgb(216, 199, 181)',
    proportion: 15,
    usage: 'Secondary backdrop, raw cottons, tailored outerwear base, grid borders'
  },
  {
    name: 'Soft Beige',
    hex: '#E8DDD0',
    rgb: 'rgb(232, 221, 208)',
    proportion: 10,
    usage: 'Subtle transitions, linen blends, delicate underlays, accent surfaces'
  },
  {
    name: 'Dusty Rose',
    hex: '#9A6670',
    rgb: 'rgb(154, 102, 112)',
    proportion: 10,
    usage: 'Muted romantic accent, organic embroidery threads, chiffon draping'
  },
  {
    name: 'Burgundy',
    hex: '#722F37',
    rgb: 'rgb(114, 47, 55)',
    proportion: 8,
    usage: 'Vibrant focus, silk satin drapes, piping accents, structured lapels'
  },
  {
    name: 'Deep Wine',
    hex: '#5A1F2B',
    rgb: 'rgb(90, 31, 43)',
    proportion: 7,
    usage: 'Core luxury signature, velvet panels, hand-cording ornamentation, headings'
  },
  {
    name: 'Dark Wine',
    hex: '#421820',
    rgb: 'rgb(66, 24, 32)',
    proportion: 5,
    usage: 'Shadow details, deep contrast accents, corset boning channels, hems'
  },
  {
    name: 'Charcoal',
    hex: '#262223',
    rgb: 'rgb(38, 34, 35)',
    proportion: 10,
    usage: 'Editorial body typography, tech flat strokes, fine seam line indicators'
  }
];

export const GARMENTS_DATA: GarmentLook[] = [
  {
    id: 'western-look-01',
    category: 'western',
    lookNumber: 1,
    code: 'W-01',
    name: 'The Structured Sovereign',
    tagline: 'Deconstructed Sculptural Trench & Internal Corset Bodice',
    concept: 'Reimagining the classic trench through architectural tailoring, sharp peaked shoulders, and an exposed internal boned corset crafted from upcycled wool-gabardine scraps and raw ivory linen.',
    silhouette: 'Hourglass-architectural hybrid with exaggerated storm flap wings and flared structured lower peplum drape.',
    keyDetails: [
      'Asymmetrical peaked lapel with contrast deep wine binding',
      'Exposed boning channels in dark wine velvet cord',
      'Double-welted angle pockets with antique brass snaps',
      'Layered modular storm flap transforming into shoulder capelet',
      'Raw edge organic linen hem binding'
    ],
    fabrics: [
      {
        name: 'Heavy Wool Gabardine',
        composition: '100% Regenerated Virgin Wool',
        weight: '340 GSM',
        texture: 'Smooth diagonal twill, crisp architectural hand',
        drape: 'Structured, high tensile resilience',
        color: 'Warm Beige / Sand',
        hex: '#D8C7B5'
      },
      {
        name: 'Silk Velvet Accent',
        composition: '82% Rayon, 18% Silk',
        weight: '220 GSM',
        texture: 'Ultra-soft plush sheen',
        drape: 'Fluid with weighted fall',
        color: 'Deep Wine',
        hex: '#5A1F2B'
      },
      {
        name: 'Organic Cotton Twill Lining',
        composition: '100% GOTS Certified Cotton',
        weight: '115 GSM',
        texture: 'Breathable matte weave',
        drape: 'Supple and gentle against skin',
        color: 'Ivory',
        hex: '#F7F3EC'
      }
    ],
    trims: [
      { item: 'Spiral Steel Boning', spec: '6mm heavy-gauge flexible steel', placement: 'Front princess seams and side back bodice' },
      { item: 'Custom Horn Buttons', spec: '24L natural carved horn in dark wine finish', placement: 'Double breasted front overlap' },
      { item: 'YKK Concealed Metal Zip', spec: '#5 Antiqued brass 45cm separable', placement: 'Center front sub-closure' },
      { item: 'Shoulder Pads', spec: '18mm raglan tailored felt-covered pad', placement: 'Internal shoulder line reinforcement' }
    ],
    constructionNotes: [
      'Tailored horsehair canvas interfacing pad-stitched along lapels for permanent roll line recovery.',
      'French seamed internal corset linings with zero exposed seam allowances for couture comfort.',
      'Precision topstitching at 12 stitches per inch using Gutermann high-luster burgundy thread.'
    ],
    measurements: [
      { part: 'Bust', spec: '86 cm / 34 in' },
      { part: 'Waist', spec: '66 cm / 26 in' },
      { part: 'High Hip', spec: '88 cm / 34.5 in' },
      { part: 'Full Length', spec: '124 cm / 49 in' },
      { part: 'Sleeve Length', spec: '61 cm / 24 in' },
      { part: 'Cross Shoulder', spec: '42 cm / 16.5 in' }
    ],
    defaultIllustration: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    defaultFlatFront: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80',
    defaultFlatBack: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    defaultPhotoshoot: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    defaultDetail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'western-look-02',
    category: 'western',
    lookNumber: 2,
    code: 'W-02',
    name: 'The Fluid Monolith',
    tagline: 'Deconstructed Asymmetric Draped Column Gown',
    concept: 'Exploring tension between rigid geometric cut-outs and liquid drape. Liquid mulberry silk chiffon flows diagonally across a molded leatherette hip harness, evoking modernist brutalist architecture softened by drapery.',
    silhouette: 'Column silhouette with cascading side train, high side slit, and one-shoulder architectural twist.',
    keyDetails: [
      'Single bias-cut twisted shoulder drape creating back cowl',
      'Molded architectural hip yoke in dusty rose pressed felt',
      'Hand-gathered micro-pleats emanating from diagonal waist seam',
      'Deep high-thigh slash with bound inner facing in deep wine satin',
      'Weighted floor-grazing cascading sash train'
    ],
    fabrics: [
      {
        name: 'Heavy Mulberry Silk Crepe',
        composition: '100% Pure Mulberry Silk',
        weight: '180 GSM',
        texture: 'Rich sand-washed pebble texture',
        drape: 'Heavy liquid fall with beautiful fluid movement',
        color: 'Burgundy',
        hex: '#722F37'
      },
      {
        name: 'Silk Georgette Chiffon',
        composition: '100% Silk',
        weight: '45 GSM',
        texture: 'Sheer, ethereal fine grain',
        drape: 'Floating, responsive to movement',
        color: 'Dusty Rose',
        hex: '#9A6670'
      },
      {
        name: 'Habotai Silk Lining',
        composition: '100% Organic Silk',
        weight: '60 GSM',
        texture: 'Featherlight slippery glide',
        drape: 'Soft body skimmer',
        color: 'Off White',
        hex: '#FCFAF7'
      }
    ],
    trims: [
      { item: 'Invisible Side Zipper', spec: 'YKK Concealed 50cm nylon coil', placement: 'Left side seam underarm to high hip' },
      { item: 'Lead Weighted Hem Cord', spec: '12g/m flexible micro-bead tape', placement: 'Cascading train hemline for precision drop' },
      { item: 'Silicone Gripper Elastic', spec: '15mm clear matte elastic', placement: 'Asymmetric neckline interior' }
    ],
    constructionNotes: [
      'Bias draping executed directly on dress form without initial pattern flat to capture organic grain flow.',
      'Baby-rolled hems on all sheer chiffon overlays hand-stitched at 16 stitches per inch.',
      'Reinforced waist stay grosgrain ribbon inside bodice to anchor the weight of the silk crepe skirt.'
    ],
    measurements: [
      { part: 'Bust', spec: '84 cm / 33 in' },
      { part: 'Waist', spec: '64 cm / 25 in' },
      { part: 'Hip', spec: '92 cm / 36 in' },
      { part: 'Gown Length (Front)', spec: '150 cm / 59 in' },
      { part: 'Train Length (Back)', spec: '185 cm / 73 in' },
      { part: 'Slit Height', spec: '75 cm / 29.5 in' }
    ],
    defaultIllustration: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    defaultFlatFront: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    defaultFlatBack: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    defaultPhotoshoot: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    defaultDetail: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'western-look-03',
    category: 'western',
    lookNumber: 3,
    code: 'W-03',
    name: 'The Neo-Kinetic Chroma',
    tagline: '3D CLO Digital Garment • Iridescent Track Trousers & Cropped Mock-Neck',
    concept: 'A cyber-couture digital simulation exploring dynamic tension between athletic utility and prism-optic chromatic textiles. High-waisted jogger trousers with neon-lime and obsidian chevron racing bands simulated with high-luster iridescent nylon taffeta physics, paired with a minimalist lavender compression cropped bodice.',
    silhouette: 'High-waisted relaxed athletic taper with smocked ruched elastic waistband and ankle cuff gathering, paired with form-fitted long-sleeve crop top.',
    keyDetails: [
      'Multi-channel ruched elastic waistband with internal adjustable drawcord',
      'Continuous neon lime vertical racing stripe intersected by diagonal black chevron',
      'Long-sleeve mock-neck crop top with 4cm contrast obsidian under-bust band',
      'Elasticized gathered ankle cuffs with reinforced bar-tacking',
      'High-luster iridescent prism refraction finish'
    ],
    fabrics: [
      {
        name: 'Holographic Iridescent Nylon Taffeta',
        composition: '100% Technical Micro-Nylon',
        weight: '110 GSM',
        texture: 'Prism optic luster & metallic sheen',
        drape: 'Fluid crisp dynamic volume',
        color: 'Iridescent Silver-Pink',
        hex: '#D9B3CE'
      },
      {
        name: 'High-Vis Fluorescent Grosgrain',
        composition: 'Polymer Heat-Welded Tape',
        weight: '180 GSM',
        texture: 'Matte reflective racing band',
        drape: 'Linear stability',
        color: 'Neon Lime',
        hex: '#DFFF00'
      },
      {
        name: 'Compression Poly-Elastane Rib',
        composition: '88% Poly, 12% Elastane',
        weight: '240 GSM',
        texture: 'Matte 4-way compression stretch',
        drape: 'Body-contouring',
        color: 'Lavender Mauve',
        hex: '#B89FAD'
      }
    ],
    trims: [
      { item: 'Ultrasonic Heat-Welded Seam Tape', spec: '15mm waterproof thermal bonding tape', placement: 'Chevron stripe junctions & side seams' },
      { item: 'Internal Elastic Drawcord', spec: 'Tubular round elastic cord with rubberized aglets', placement: 'Waistband interior' },
      { item: 'Concealed Reverse-Coil Zipper', spec: 'YKK invisible nylon zipper 18cm', placement: 'Crop top center-back neck closure' }
    ],
    constructionNotes: [
      'Digital 3D cloth physics simulation calibrated for light refraction and metallic specular highlights.',
      'Stress map analysis ensured zero strain distortion across crotch and knee flexion zones.',
      'Zero-waste pattern nesting yield rated at 97.8% efficiency.'
    ],
    measurements: [
      { part: 'Crop Top Length', spec: '38 cm / 15 in' },
      { part: 'Crop Top Bust', spec: '86 cm / 34 in' },
      { part: 'Trouser Waist (Relaxed)', spec: '66 cm / 26 in' },
      { part: 'Trouser Hip', spec: '104 cm / 41 in' },
      { part: 'Trouser Inseam', spec: '74 cm / 29 in' },
      { part: 'Ankle Cuff Width', spec: '24 cm / 9.5 in' }
    ],
    defaultIllustration: neoKineticHeroImg,
    defaultFlatFront: neoKineticHeroImg,
    defaultFlatBack: neoKineticDetailImg,
    defaultPhotoshoot: [
      neoKineticHeroImg,
      neoKineticDetailImg,
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    defaultDetail: neoKineticDetailImg
  },
  {
    id: 'ethnic-look-01',
    category: 'ethnic',
    lookNumber: 1,
    code: 'E-01',
    name: 'The Heritage Weaver',
    tagline: 'Modernized Bandhani & Structural Cording Kalidar Anarkali',
    concept: 'Reinventing the traditional Gujarati Bandhani craft through contemporary geometric grid tie-dye and architectural multi-layered cording. The kalidar silhouette features 32 panels cascading from an intricately corded corset bodice.',
    silhouette: 'Kalidar Anarkali with fitted corded bodice, 32 flared panels, and an asymmetrical architectural dupatta drape.',
    keyDetails: [
      'Hand-tied micro Bandhani dots forming contemporary chevron gradients',
      'Extensive surface cording (dori work) along bodice and panel seams in deep wine silk threads',
      'Layered crinoline horsehair hem creating dramatic bell flare without bulk',
      'Sheer handloom organza balloon sleeves with pleated cuffs and mother-of-pearl buttons',
      'Attached pre-pleated structural organza dupatta with ombre wine dip-dye'
    ],
    fabrics: [
      {
        name: 'Handwoven Chanderi Silk-Cotton',
        composition: '70% Pure Silk, 30% Fine Cotton',
        weight: '90 GSM',
        texture: 'Crisp sheer texture with subtle golden shimmer',
        drape: 'Ethereal yet retains architectural volume',
        color: 'Ivory & Dusty Rose',
        hex: '#F7F3EC'
      },
      {
        name: 'Mashru Silk Sateen',
        composition: 'Silk face with Cotton backing',
        weight: '160 GSM',
        texture: 'Glossy luminous face with comfortable inner cotton feel',
        drape: 'Medium body, rich specular highlights',
        color: 'Deep Wine',
        hex: '#5A1F2B'
      },
      {
        name: 'Pure Kora Organza',
        composition: '100% Mulberry Silk',
        weight: '38 GSM',
        texture: 'Stiff, luminous, highly responsive to light',
        drape: 'Crisp and sculptural',
        color: 'Off White',
        hex: '#FCFAF7'
      }
    ],
    trims: [
      { item: 'Hand-Crafted Silk Dori (Cording)', spec: '3mm pure silk core wrapped in wine lurex', placement: 'Bodice front lattice and panel seam joints' },
      { item: 'Gota Patti Scraps & Zari', spec: 'Upcycled vintage gold gota cut into micro leaves', placement: 'Scattered along hemline border' },
      { item: 'Handmade Potli Buttons', spec: 'Mashru silk wrapped spherical buttons with thread loops', placement: 'Back placket closure' }
    ],
    constructionNotes: [
      '32 individual kalis (panels) graduated from 3cm width at waist to 22cm at hem for seamless parabolic flare.',
      'Under-skirt incorporates a concealed organza tier to keep the anarkali voluminous during runway movement.',
      'All Bandhani panels hand-washed with natural alum fixative to preserve deep natural dye brilliance.'
    ],
    measurements: [
      { part: 'Bodice Bust', spec: '86 cm / 34 in' },
      { part: 'Underbust', spec: '72 cm / 28.5 in' },
      { part: 'Bodice Length', spec: '38 cm / 15 in' },
      { part: 'Full Anarkali Length', spec: '142 cm / 56 in' },
      { part: 'Total Hem Circumference (Ghera)', spec: '820 cm / 322 in' },
      { part: 'Sleeve Length', spec: '64 cm / 25 in' }
    ],
    defaultIllustration: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    defaultFlatFront: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    defaultFlatBack: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80',
    defaultPhotoshoot: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85'
    ],
    defaultDetail: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ethnic-look-02',
    category: 'ethnic',
    lookNumber: 2,
    code: 'E-02',
    name: 'The Patola Rebirth',
    tagline: 'Upcycled Patola Draped Concept Saree & Molded Armature Blouse',
    concept: 'Honoring Gujarat’s legendary double-ikat Patola weaving heritage by upcycling deadstock geometric weave remnants into a modern pre-draped concept saree, paired with a sculpted architectural blouse with exaggerated structured collar.',
    silhouette: 'Pre-stitched concept saree with micro-pleated front apron and structured high-neck molded corset blouse.',
    keyDetails: [
      'Asymmetric geometric Patola scrap collage along the pallu with gold couching embroidery',
      'Permanent engineered accordion pleats across front drape for ease of movement',
      'Molded high-neck corset blouse featuring structured architectural wing shoulders',
      'Deep wine silk velvet cummerbund belt with carved brass buckle',
      'Raw selvedge fringing interwoven with fine metallic threads'
    ],
    fabrics: [
      {
        name: 'Authentic Patan Patola Silk Scraps',
        composition: '100% Mulberry Double-Ikat Silk',
        weight: '140 GSM',
        texture: 'Tight dense weave with iconic geometric flora and fauna motifs',
        drape: 'Crisp and durable with royal heritage luster',
        color: 'Burgundy, Deep Wine & Off White',
        hex: '#722F37'
      },
      {
        name: 'Pure Raw Silk (Matka Silk)',
        composition: '100% Hand-Spun Silk',
        weight: '210 GSM',
        texture: 'Rich natural slub texture with dry crisp drape',
        drape: 'Holds rigid angular silhouettes flawlessly',
        color: 'Warm Beige',
        hex: '#D8C7B5'
      },
      {
        name: 'Tissue Organza Lamé',
        composition: 'Silk and Metallic Zari threads',
        weight: '50 GSM',
        texture: 'Glistening metallic shimmer with paper-like hand',
        drape: 'Airy and reflective',
        color: 'Ivory Gold',
        hex: '#F7F3EC'
      }
    ],
    trims: [
      { item: 'Zari Metallic Couching Thread', spec: 'Real antique copper-gold zari thread', placement: 'Collaged patch seam intersections' },
      { item: 'Heavy-Duty Brass Hooks & Eyes', spec: 'Hand-sewn brass reinforced fasteners', placement: 'Pre-draped waist closure & blouse back' },
      { item: 'Micro-Horsehair Hem Braid', spec: '2.5cm flexible synthetic braid', placement: 'Pre-draped saree pleat base' }
    ],
    constructionNotes: [
      'Textile upcycling methodology: 85 deadstock Patola test-strips sorted by color tone, backed with fusible organza, and joined with 0.5mm French seams.',
      'Blouse features an internal 8-piece boned corset foundation to sustain the rigid wing-shoulder architecture without collapsing.',
      'Saree pallu is pre-pleated and secured with concealed shoulder anchoring tabs to eliminate slipping.'
    ],
    measurements: [
      { part: 'Blazer/Blouse Bust', spec: '86 cm / 34 in' },
      { part: 'Blouse Waist', spec: '66 cm / 26 in' },
      { part: 'Blouse Length', spec: '42 cm / 16.5 in' },
      { part: 'Saree Waist (Fitted)', spec: '70 cm / 27.5 in' },
      { part: 'Saree Length', spec: '108 cm / 42.5 in' },
      { part: 'Pallu Drape Length', spec: '240 cm / 94.5 in' }
    ],
    defaultIllustration: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85',
    defaultFlatFront: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    defaultFlatBack: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    defaultPhotoshoot: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ],
    defaultDetail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ethnic-look-03',
    category: 'ethnic',
    lookNumber: 3,
    code: 'E-03',
    name: 'The Royal Alchemist',
    tagline: 'Hand-Embroidered Velvet Angrakha & Layered Organza Farshi Pajama',
    concept: 'A dramatic union of Mughal royal Angrakha tailoring and modern layered transparency. Rich deep wine silk-velvet is hand-embellished with micro-Zardozi, French knots, and threadwork, opening into diaphanous tiers of ivory organza.',
    silhouette: 'Asymmetric crossover Angrakha tunic over wide-flare tiered Farshi pajama trousers.',
    keyDetails: [
      'Diagonal crossover front with hand-twisted silk bullion cord ties and ornate tassels',
      'Intricate micro-Zardozi embroidery featuring stylized architectural arch motifs',
      'Deep wine velvet yoke contrasting against layered sheer organza skirt tiers',
      'Voluminous tiered Farshi pajama with gathered crinoline inserts',
      'Hand-crafted latkan tassels created from recycled silk threads and miniature brass bells'
    ],
    fabrics: [
      {
        name: 'Micro Silk Velvet',
        composition: '100% Pure Silk Velvet',
        weight: '240 GSM',
        texture: 'Sumptuous deep pile with rich dark wine light-absorbency',
        drape: 'Heavy, luxurious drape with sculptural weight',
        color: 'Dark Wine / Deep Burgundy',
        hex: '#421820'
      },
      {
        name: 'Hand-Dyed Tissue Silk Organza',
        composition: '100% Silk',
        weight: '42 GSM',
        texture: 'Semi-sheer crisp structure with subtle gold wash',
        drape: 'Airy, floaty, voluminous layered tiers',
        color: 'Soft Ivory & Dusty Rose',
        hex: '#F7F3EC'
      },
      {
        name: 'Pure Silk Brocade Accent',
        composition: 'Silk and Zari Weave',
        weight: '190 GSM',
        texture: 'Ornate embossed floral weave',
        drape: 'Firm and structured',
        color: 'Beige Gold',
        hex: '#D8C7B5'
      }
    ],
    trims: [
      { item: 'Dull Antique Zardozi Wire & Dabka', spec: 'French wire and Nakshi coiled metallic bullion', placement: 'Neckline, cuffs, and front overlap border' },
      { item: 'Handmade Silk Latkans', spec: 'Intricate 15cm artisan tassel pendants', placement: 'Side tie-up closures' },
      { item: 'Cotton Mulmul Lining', spec: '100% Superfine organic mulmul 55 GSM', placement: 'Full inner bodice lining for breathable comfort' }
    ],
    constructionNotes: [
      'Over 120 artisan hours of hand-embroidery executed on wooden Adda frames using aari needles.',
      'Velvet panels interfaced with lightweight woven fusible weft-insertion interlining to avoid crush marks during stitching.',
      'Tiered Farshi pajama features 3 escalating gathered tiers finished with narrow hand-rolled picot edging.'
    ],
    measurements: [
      { part: 'Angrakha Bust', spec: '88 cm / 34.5 in' },
      { part: 'Angrakha Waist', spec: '70 cm / 27.5 in' },
      { part: 'Angrakha Full Length', spec: '128 cm / 50.5 in' },
      { part: 'Farshi Pajama Waist (Elasticated)', spec: '66-78 cm / 26-30.5 in' },
      { part: 'Farshi Pajama Length', spec: '106 cm / 41.5 in' },
      { part: 'Farshi Leg Flare (Per Leg)', spec: '210 cm / 82.5 in' }
    ],
    defaultIllustration: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    defaultFlatFront: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1000&q=80',
    defaultFlatBack: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    defaultPhotoshoot: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ],
    defaultDetail: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ethnic-look-04',
    category: 'ethnic',
    lookNumber: 4,
    code: 'E-04',
    name: 'The Ashavali Architect',
    tagline: 'Architectural Brocade Capelet & 48-Kali Knife-Pleated Lehenga',
    concept: 'A celebration of Ahmedabad’s historic Ashavali brocade weaving legacy. An architectural structured shoulder capelet woven with pure gold zari and jewel-toned flora-fauna motifs, layered over a sculpted micro-corseted choli and a 48-kali knife-pleated raw silk lehenga with concealed horsehair crinoline and hand-beaten gold mukaish spangles.',
    silhouette: 'Structured high-collar capelet with sculpted corseted bodice and high-waisted 48-kali knife-pleated flare lehenga.',
    keyDetails: [
      'Architectural high-stand collar capelet in pure gold zari Ashavali brocade',
      '48-kali graduated knife pleats creating a 9-meter hem circumference (ghera)',
      'Concealed horsehair crinoline hem band sustaining parabolic structure during movement',
      'Hand-beaten gold mukaish spangle sprinkling along lehenga panels',
      'Deep wine silk-velvet waistband with carved brass temple-arch buckle'
    ],
    fabrics: [
      {
        name: 'Handwoven Ashavali Gold Brocade',
        composition: '100% Pure Mulberry Silk & Real Gold Zari',
        weight: '260 GSM',
        texture: 'Rich twill weave with raised metallic flora motifs',
        drape: 'Sculptural, firm, radiant luster',
        color: 'Gold & Deep Wine',
        hex: '#D4AF37'
      },
      {
        name: 'Handloom Tussar-Matka Silk',
        composition: '100% Wild Tussar Silk',
        weight: '220 GSM',
        texture: 'Crisp organic slub with warm natural light absorption',
        drape: 'Crisp recovery, holds sharp knife creases',
        color: 'Warm Beige / Muted Cream',
        hex: '#D8C7B5'
      },
      {
        name: 'Pure Mulberry Silk Habotai Lining',
        composition: '100% Pure Silk',
        weight: '65 GSM',
        texture: 'Soft, anti-static, skin-gentle glide',
        drape: 'Fluid lightweight interior layer',
        color: 'Deep Wine',
        hex: '#5A1F2B'
      }
    ],
    trims: [
      { item: 'Carved Brass Architectural Collar Clasp', spec: 'Hand-chiseled artisan brass interlocking latch', placement: 'Capelet front neck closure' },
      { item: 'Hand-Beaten Mukaish Badla Spangles', spec: 'Pure silver-gold flat metallic sequins hand-twisted into weave', placement: 'Lehenga pleat valleys' },
      { item: 'Crinoline Horsehair Braid', spec: '5cm stiff flexible woven synthetic braid', placement: 'Inside lower lehenga hemline' }
    ],
    constructionNotes: [
      'Ashavali brocade capelet lined with canvas interfacing and tailored with French seams to preserve exterior motif alignment.',
      '48 individual knife pleats pressed using pressurized steam and anchored along an internal multi-channel grosgrain stay.',
      'Waistband features dual-closure safety hooks and reinforced cotton canvas stay for zero-distortion weight distribution.'
    ],
    measurements: [
      { part: 'Capelet Collar Height', spec: '8 cm / 3.1 in' },
      { part: 'Capelet Shoulder Width', spec: '44 cm / 17.3 in' },
      { part: 'Corset Bust', spec: '88 cm / 34.5 in' },
      { part: 'Lehenga Waist', spec: '68 cm / 26.8 in' },
      { part: 'Lehenga Length', spec: '110 cm / 43.3 in' },
      { part: 'Total Hem Ghera', spec: '920 cm / 362 in' }
    ],
    defaultIllustration: ashavaliHeroImg,
    defaultFlatFront: ashavaliHeroImg,
    defaultFlatBack: ashavaliDetailImg,
    defaultPhotoshoot: [
      ashavaliHeroImg,
      ashavaliDetailImg,
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85'
    ],
    defaultDetail: ashavaliDetailImg
  }
];

export const TEXTILE_SAMPLES: TextileSample[] = [
  {
    id: 'sample-01',
    title: 'Architectural Box Pleating & Stitch-Fold Manipulation',
    technique: 'Precision Steam-Set Origami Pleating',
    materials: 'Heavy Silk Gabardine & Crushed Organza',
    category: 'manipulation',
    description: 'Geometric fold transitions where structured ridges dissolve into organic undulating drapes. Tested with 3 different heat presses to determine maximum resilience.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    detailNotes: ['0.8cm grid pitch', 'Pre-ironed with vinegar setting agent', 'Resistant to dry cleaning wash cycle']
  },
  {
    id: 'sample-02',
    title: 'Multi-Strand Silk Cording (Dori Work) on Velvet',
    technique: 'Hand-Couched Raised Cording Lattice',
    materials: 'Micro-Velvet Base, 3mm Silk Filler Cord, Metallic Zari',
    category: 'ornamentation',
    description: 'Continuous linear cording forming high-relief tactile patterns across garment yokes, providing structural stability without heavy metal boning.',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80',
    detailNotes: ['240 meters of cord hand-applied per bodice', 'Zero fabric puckering achieved with stabilizer mesh', 'Soft pliable tactile surface']
  },
  {
    id: 'sample-03',
    title: 'Deadstock Waste Mosaic & Gold Filigree Patchwork',
    technique: 'Zero-Waste Cutting Scrap Reassembly',
    materials: 'Post-Cutting Patola, Linen & Velvet Offcuts',
    category: 'sustainable',
    description: 'Sorting cutting-room waste below 10cm into tonal color gradients, fused onto water-soluble backing and embroidered with fine gold thread.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    detailNotes: ['Upcycles 92% of pre-consumer workshop offcuts', 'Tensile strength equal to virgin woven fabric', 'Each panel unique in micro-patterning']
  },
  {
    id: 'sample-04',
    title: 'Canadian Honeycomb Smocking on Sheer Organza',
    technique: 'Direct Geometric Hand-Smocking',
    materials: 'Pure Kora Organza & Burgundy Silk Thread',
    category: 'manipulation',
    description: 'Grid-based reverse smocking transforming flat planar organza into dynamic 3D volumetric waffle sculptures that compress and expand with body movement.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    detailNotes: ['1.5cm square grid mapping', 'Expands up to 220% on stretch axis', 'Translucent depth with multi-light refraction']
  },
  {
    id: 'sample-05',
    title: 'Micro-Zardozi & French Knot Relief Embroidery',
    technique: 'Adda Frame Artisan Needlework',
    materials: 'Dull Antique Dabka, Metallic Bullion, Silk Floss',
    category: 'ornamentation',
    description: 'Traditional Gujarati and Mughal metallic wire embroidery reimagined into modern minimalist linear contours inspired by architectural blueprints.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    detailNotes: ['Executed in Ahmedabad artisan cluster', 'Gold-plated non-tarnishing dabka alloy', 'High abrasion resistance']
  },
  {
    id: 'sample-06',
    title: 'From Scrap to System: Recycled Yarn Weft Weaving',
    technique: 'Handloom Re-Weft Construction',
    materials: 'Unraveled Scrap Threads & Organic Cotton Warp',
    category: 'structure',
    description: 'Shredded fabric edges unraveled by hand, carded and re-spun into thick irregular slub yarn, handwoven on a table loom into heavy textured outerwear fabric.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    detailNotes: ['Weight: 380 GSM', 'No chemical dyes applied', 'Circular lifecycle closed loop']
  }
];

export const SECTIONS_META = [
  { id: 'intro' as const, number: '01', title: 'Introduction', startPage: 1, endPage: 4, themeColor: '#5A1F2B' },
  { id: 'concept' as const, number: '02', title: 'Concept & Research', startPage: 5, endPage: 11, themeColor: '#722F37' },
  { id: 'design_language' as const, number: '03', title: 'Design Language', startPage: 12, endPage: 16, themeColor: '#9A6670' },
  { id: 'development' as const, number: '04', title: 'Experimentation & Development', startPage: 17, endPage: 22, themeColor: '#5A1F2B' },
  { id: 'western' as const, number: '05', title: 'Western Collection', startPage: 23, endPage: 29, themeColor: '#722F37' },
  { id: 'ethnic' as const, number: '06', title: 'Ethnic Collection', startPage: 30, endPage: 36, themeColor: '#421820' },
  { id: 'technical' as const, number: '07', title: 'Technical & Making', startPage: 37, endPage: 39, themeColor: '#262223' },
  { id: 'final' as const, number: '08', title: 'Final Presentation', startPage: 40, endPage: 42, themeColor: '#5A1F2B' },
];
