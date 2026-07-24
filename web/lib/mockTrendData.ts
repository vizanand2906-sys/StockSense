// ============================================================
// MOCK TREND DATA — StockSense Trend Engine
// ============================================================
// Structure & Generator for ~1000 DeepFashion attributes across 5 categories
// 90-day smooth time-series forecasts & scores
// ============================================================

export type TrendDirection = "Rising" | "Peaking" | "Flat" | "Declining";

export interface AttributeTrend {
  name: string;
  category: string;
  score: number;        // 0–100
  direction: TrendDirection;
  rank: number;         // rank within category
  timeSeries90d: number[]; // 12 sampled points across 90 days (smooth 0-1 range)
  sources: string[];
  sampleImage?: string;
}

export interface TrendCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  attributes: AttributeTrend[];
}

// ─── Smooth Time Series Generator (90-day trajectory) ─────────────────────

function generateSmooth90dTimeSeries(direction: TrendDirection, score: number, rand: () => number): number[] {
  const points: number[] = [];
  const count = 12; // 12 weekly data points over 90 days
  const targetBase = score / 100;
  
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1); // 0.0 to 1.0 representing day 0 to 90
    let val = 0;

    if (direction === "Rising") {
      // Smooth S-curve ascent (sigmoid-like)
      val = targetBase * (0.2 + 0.8 / (1 + Math.exp(-6 * (t - 0.4))));
    } else if (direction === "Peaking") {
      // Gaussian bell shape peaking near t=0.6 to t=0.7
      const bell = Math.exp(-Math.pow((t - 0.65) / 0.25, 2));
      val = targetBase * (0.3 + 0.7 * bell);
    } else if (direction === "Declining") {
      // Smooth descent
      val = targetBase * (1.0 - 0.75 / (1 + Math.exp(-5 * (t - 0.4))));
    } else {
      // Flat low baseline with gentle organic wave
      val = targetBase * (0.8 + 0.2 * Math.sin(t * Math.PI * 2));
    }

    // Micro-smoothing noise (very small so trajectory remains smooth)
    const microNoise = (rand() - 0.5) * 0.04;
    points.push(Math.max(0.05, Math.min(1.0, val + microNoise)));
  }

  return points;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildCategoryAttributes(
  categoryName: string,
  rawNames: string[],
  risingNames: string[],
  peakingNames: string[],
  decliningNames: string[]
): AttributeTrend[] {
  const seedStr = categoryName + rawNames.length;
  const rand = seededRandom(seedStr.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0));

  const risingSet = new Set(risingNames);
  const peakingSet = new Set(peakingNames);
  const decliningSet = new Set(decliningNames);

  const sampleSources = ["Instagram", "Myntra", "Google Trends", "Vogue India", "Boutique Walk-ins", "Pinterest"];

  const items = rawNames.map((name) => {
    let direction: TrendDirection = "Flat";
    let score: number;

    if (risingSet.has(name)) {
      direction = "Rising";
      score = Math.floor(76 + rand() * 23); // 76–99
    } else if (peakingSet.has(name)) {
      direction = "Peaking";
      score = Math.floor(65 + rand() * 25); // 65–90
    } else if (decliningSet.has(name)) {
      direction = "Declining";
      score = Math.floor(18 + rand() * 25); // 18–43
    } else {
      direction = "Flat";
      score = Math.floor(8 + rand() * 42);   // 8–50
    }

    // Random 2 sources
    const s1 = sampleSources[Math.floor(rand() * sampleSources.length)];
    let s2 = sampleSources[Math.floor(rand() * sampleSources.length)];
    if (s1 === s2) s2 = sampleSources[(sampleSources.indexOf(s1) + 1) % sampleSources.length];

    const timeSeries90d = generateSmooth90dTimeSeries(direction, score, rand);

    return {
      name,
      category: categoryName,
      score,
      direction,
      rank: 0,
      timeSeries90d,
      sources: [s1, s2],
    };
  });

  // Sort descending by score and rank
  items.sort((a, b) => b.score - a.score);
  items.forEach((item, index) => {
    item.rank = index + 1;
  });

  return items;
}

// ─── CATEGORY RAW DATA ────────────────────────────────────────────────────────

const category1_texture = [
  "abstract", "abstract chevron", "abstract chevron print", "abstract diamond",
  "abstract floral", "abstract floral print", "abstract geo", "abstract geo print",
  "abstract paisley", "abstract pattern", "abstract print", "abstract printed",
  "abstract stripe", "animal", "animal print", "bandana", "bandana print", "baroque",
  "baroque print", "bird", "bird print", "botanical", "botanical print", "boxy striped",
  "breton", "breton stripe", "brushstroke", "brushstroke print", "butterfly",
  "butterfly print", "camo", "camouflage", "checked", "checkered", "cheetah",
  "chevron", "chevron print", "chiffon floral", "circle", "clashist", "classic striped",
  "colorblock", "colorblocked", "crochet floral", "daisy", "daisy print", "diamond",
  "diamond print", "ditsy", "ditsy floral", "ditsy floral print", "dot", "dots", "dotted",
  "elephant print", "embroidered floral", "floral", "floral flutter", "floral paisley",
  "floral pattern", "floral print", "floral textured", "floral-embroidered", "flower",
  "foil", "folk", "folk print", "geo", "geo pattern", "geo print", "geo stripe",
  "giraffe", "giraffe print", "graphic", "grid", "grid print", "heart", "heart print",
  "heathered stripe", "houndstooth", "ikat", "ikat print", "kaleidoscope",
  "kaleidoscope print", "knit stripe", "knit striped", "leaf", "leaf print",
  "linen", "linen-blend", "mandala", "mandala print", "marble", "marble print",
  "marled", "marled stripe", "medallion", "medallion print", "mixed", "mixed print",
  "mixed stripe", "mosaic", "mosaic print", "multi-stripe", "nautical", "nautical stripe",
  "nautical striped", "ombre", "ornate", "ornate paisley", "ornate print", "paint",
  "paint splatter", "painted", "paisley", "paisley print", "palm", "palm print",
  "palm springs", "palm tree", "pattern", "patterned", "pinstripe", "pinstriped",
  "polka dot", "pom-pom", "print", "print shirt", "print woven", "printed",
  "ribbed stripe", "ringer", "rugby stripe", "rugby striped", "sophisticated",
  "southwestern", "southwestern-inspired", "southwestern-patterned", "southwestern-print",
  "speckled", "splatter", "spotted", "stripe", "striped", "stripes", "structured",
  "tonal", "tribal", "tribal-inspired", "two-tone", "varsity-striped", "watercolor",
  "zig", "zigzag"
];

const category2_fabric = [
  "acid", "acid wash", "applique", "beaded", "beaded chiffon", "beaded sheer", "bead",
  "bleach", "bleached", "bleached denim", "brocade", "burnout", "cable", "cable knit",
  "cable-knit", "canvas", "chambray", "chambray drawstring", "chenille", "chiffon",
  "chiffon lace", "chiffon layered", "chiffon shirt", "chunky", "chunky knit",
  "chino", "classic cotton", "classic denim", "classic knit", "classic woven",
  "clean", "clean wash", "cloud", "cloud wash", "coated", "corduroy", "cotton",
  "cotton drawstring", "cotton knit", "cotton-blend", "crepe", "crepe woven",
  "crinkled", "crochet", "crochet embroidered", "crochet knit", "crochet lace",
  "crochet mesh", "crochet overlay", "crocheted", "crocheted lace", "cuffed denim",
  "cutout lace", "damask", "denim", "denim drawstring", "denim shirt", "denim utility",
  "dip-dye", "dip-dyed", "distressed", "elasticized", "embellished", "embroidered",
  "embroidered gauze", "embroidered lace", "embroidered mesh", "embroidered woven",
  "embroidery", "eyelash", "eyelash knit", "eyelash lace", "eyelet", "faded",
  "fair", "fair isle", "faux", "faux fur", "faux leather", "faux shearling", "faux suede",
  "feather", "floral knit", "floral lace", "floral mesh", "foulard", "french",
  "french terry", "frayed", "fur", "fuzzy", "fuzzy knit", "gauze", "gauzy", "gem",
  "georgette", "gingham", "glass", "glitter", "heathered", "heathered knit",
  "herringbone", "jacquard", "knit", "knit lace", "knit open", "lace", "lace layered",
  "lace mesh", "lace overlay", "lace panel", "lace paneled", "lace pleated",
  "lace print", "lace sheer", "lace-paneled", "lacy", "lattice", "layered",
  "leather", "leather paneled", "leather quilted", "leather-paneled", "led",
  "loose", "loose-knit", "mesh", "mesh overlay", "mesh panel", "mesh paneled",
  "mesh-paneled", "metallic", "mineral", "mineral wash", "neon", "neoprene",
  "nets", "netted", "nylon", "oil", "organza", "origami", "overlay", "panel",
  "paneled", "patched", "patchwork", "perforated", "pima", "pintuck",
  "pintuck pleated", "pintucked", "plaid", "plaid shirt", "pleat", "pleated",
  "pleated woven", "pointelle", "ponte", "purl", "quilted", "rhinestone", "rib",
  "rib-knit", "ribbed", "ribbed-knit", "ripped", "ruched", "ruffle", "ruffled",
  "sateen", "satin", "scuba", "seam", "seamless", "seersucker", "sequin", "sequined",
  "shaggy", "shearling", "sheer", "sheer-paneled", "shirred", "shredded", "sleek",
  "slick", "slub", "slub-knit", "sparkling", "stone", "stone washed", "stones", "stretch",
  "stretch-knit", "studded", "suede", "tapestry", "tartan", "terry", "textured",
  "textured woven", "thermal", "tie-dye", "tiered", "tile", "tulle", "tweed", "twill",
  "velvet", "velveteen", "waffle", "wash", "washed", "woven"
];

const category3_shape = [
  "a-line", "ankle", "asymmetric", "asymmetrical", "baja", "bandage", "beaded shift",
  "bermuda", "bodycon", "bodycon midi", "box", "box pleat", "box-pleated", "boxy",
  "boxy crop", "boxy knit", "boxy lace", "bustier", "caged", "cami", "cami crop",
  "cami maxi", "capri", "cargo", "chiffon maxi", "chiffon paneled", "chiffon pleated",
  "chiffon shift", "chiffon-paneled", "classic fit", "classic skinny", "combo",
  "combo maxi", "cover-up", "cozy", "crepe shift", "crochet crop", "crochet maxi",
  "crochet-paneled", "crop", "cropped", "cropped knit", "cut", "cutoff", "cutout",
  "cutout maxi", "cutout sheath", "denim pencil", "denim shift", "denim skater",
  "distressed low-rise", "distressed mid-rise", "distressed skinny",
  "drapey", "embroidered fit", "embroidered maxi", "embroidered peasant",
  "embroidered shift", "eyelet fit", "faux leather mini", "faux leather moto",
  "faux leather paneled", "faux leather pencil", "faux leather skater",
  "faux leather varsity", "faux leather-paneled", "faux-wrap", "fit", "fit flare",
  "fit skinny", "fitted", "flare", "flared", "floral lace mini", "floral lace sheath",
  "floral lace skater", "floral maxi", "floral midi", "floral mini", "floral peasant",
  "floral pleated", "floral print skater", "floral shift", "floral skater", "flounce maxi",
  "flowy", "fold-over", "foldover", "gauche", "gauze maxi", "gauze peasant", "graphic muscle",
  "harem", "high-low", "high-rise", "high-rise skinny", "knee-length", "knit longline",
  "knit maxi", "knit mini", "knit pencil", "knit skater", "knit trapeze", "kurt",
  "lace maxi", "lace midi", "lace mini", "lace pencil", "lace sheath", "lace shift",
  "lace skater", "leather mini", "leather moto", "leather pencil", "leather skater",
  "leather varsity", "longline", "longline shirt", "low-rise", "low-rise skinny",
  "maxi", "medium", "mid rise", "mid rise skinny", "mid-rise", "mid-rise skinny", "midi",
  "mini", "moto", "muscle", "overlay sheath", "oversized", "peasant", "pencil", "pleated skater",
  "polo", "popover", "puffer", "pullover", "raw", "raw-cut", "rise", "rise skinny",
  "rose skater", "round", "scuba skater", "sheath", "shift", "shirt", "skater", "skinny",
  "skinny stretch", "skort", "slim", "slip", "slouchy", "smock", "smocked", "square",
  "straight-leg", "striped trapeze", "swing", "trapeze", "trouser", "tube", "tulip",
  "tunic", "vertical", "wide-leg", "windbreaker", "windowpane", "wrap"
];

const category4_detail = [
  "arrow collar", "asymmetrical hem", "back bow", "back cutout", "back knit", "back lace",
  "back striped", "backless", "batwing", "bell", "bell-sleeve", "belted", "belted chiffon",
  "belted floral", "belted floral print", "belted lace", "belted maxi", "belted plaid",
  "bib", "boat neck", "boxy pocket", "bow", "bow-back", "bow-front", "braided", "button",
  "button-front", "buttoned", "cap-sleeve", "cinched", "collar", "collar lace", "collared",
  "collarless", "collarless faux", "colorblock pocket", "contrast", "contrast trim",
  "contrast-trimmed", "convertible", "cowl", "cowl neck", "crisscross", "crisscross-back",
  "crochet fringe", "crochet-trimmed", "cross-back", "crossback", "cuffed", "cuffed-sleeve",
  "curved", "curved hem", "cutout-back", "deep v-neck", "deep-v", "dolman",
  "dolman sleeve", "dolman-sleeve", "dolphin", "dolphin hem", "double-breasted",
  "drape-front", "draped", "draped open-front", "draped shawl", "draped surplice",
  "drawstring", "drop waist", "drop-sleeve", "drop-waist", "dropped",
  "flat", "flat front", "flat-front", "flounce", "flounced", "flutter", "flutter sleeve",
  "flutter-sleeve", "fringe", "fringed", "gathered waistline", "graphic racerback",
  "heathered v-neck", "hem", "high-neck", "high-slit", "high-slit maxi", "high-waist",
  "high-waisted", "hood", "hooded", "hooded maxi", "hooded utility", "illusion",
  "illusion neckline", "kangaroo", "kangaroo pocket", "keyhole", "knit open",
  "knit pocket", "knit raglan", "knit shawl", "knit v-neck", "knotted", "lace peplum",
  "lace sleeve", "lace trim", "lace-trim", "lace-trimmed", "lace-up", "ladder-back",
  "lapel", "leather peplum", "leather trimmed", "leather-trimmed", "long sleeve",
  "long-sleeve", "long-sleeved", "m-slit", "m-slit maxi", "mesh racerback",
  "mesh-trimmed", "mock", "mock neck", "mock-neck", "neckline", "neck ribbed",
  "neck skater", "neck striped", "notched collar", "off-the-shoulder", "one-button",
  "one-shoulder", "open-back", "open-front", "open-knit", "open-shoulder", "peplum",
  "pin", "pocket", "print racerback", "print strapless", "print strappy", "print surplice",
  "print tulip", "print v-neck", "racerback", "raglan", "raglan sleeve", "ruffle trim",
  "scallop", "scalloped", "scoop", "scoop-neck", "self-tie", "shawl", "shoulder",
  "side slit", "side-slit", "single-button", "sleeve", "sleeveless", "slit", "split",
  "split-back", "split-neck", "strap", "strapless", "strapless tribal", "strappy",
  "surplice", "suspender", "t-back", "tassel", "tasseled", "tie-back", "tie-front",
  "tie-neck", "toggle", "topstitched", "trim", "trimmed", "tulip-back", "turtle-neck",
  "twist-front", "twisted", "two-button", "v-back", "v-cut", "v-neck", "vent", "vented hem",
  "y-back", "zip", "zip-front", "zip-pocket", "zip-up", "zipped", "zipper", "zippered"
];

const category5_style = [
  "americana", "angeles", "art", "athletic", "audrey", "babe", "babydoll", "barbie", "baseball",
  "basic", "basquiat", "beach", "beatles", "bed", "bella", "bike", "biker", "blah", "blurred", "boho",
  "bold", "boyfriend", "brooklyn", "brooklyn nets", "california", "camera", "candy", "cardio", "cat",
  "chic", "cities", "city", "civil", "classic", "coast", "coffee", "cute", "dainty", "daring", "dark",
  "darling", "defyant", "desert", "destroyed", "devil", "doll", "doodle", "dream", "dreamcatcher",
  "dreamer", "dynamite", "eagle", "edge", "eiffel", "elegant", "enchanted", "ethereal", "everyday",
  "fan", "fancy", "festive", "field", "fisherman", "flawless", "flirty", "fox", "france", "free spirit",
  "fresh", "frida", "galaxy", "garden", "garden party", "genuine", "girl", "girls", "grunge", "guns",
  "halen", "heat", "hepburn", "heroes", "inset", "internet", "island", "isle", "joie", "kahlo",
  "kid", "killin", "kiss", "kitty", "la", "lady", "lakers", "laser", "life", "light", "lightning", "logo",
  "lounge", "love", "lover", "loyal", "luxe", "mandarin", "map", "marilyn", "marilyn monroe",
  "matelot", "meow", "miami", "mickey", "mickey mouse", "mina", "mirrored", "mob", "mod",
  "modernist", "monroe", "moon", "morning", "muse", "nautical", "new york", "night", "notorious",
  "ny", "nyc", "oxford", "pan", "paradise", "paris", "party", "performance", "pineapple", "pink",
  "pizza", "pj", "please", "popcorn", "popover", "posh", "power", "quirky", "rad", "raga", "rainbow",
  "rebel", "red", "refined", "regime", "relaxed", "retro", "reverse", "reversible", "roll", "rolling",
  "rolling stones", "roman", "rose", "roses", "rugby", "run", "running", "rustic", "safari",
  "sea", "seaside", "shark", "shopping", "shore", "sky", "sleek", "smart", "smile", "snap",
  "snoopy", "soft", "solid", "spirit", "sporty", "springs", "standout", "star", "stars",
  "studio", "summer", "sun", "sunburst", "sunflower", "surfer", "sweet", "sweetheart", "swim",
  "swiss", "taco", "tasmanian", "texas", "thermal", "tokyo", "tower", "track", "training", "tree",
  "trench", "triangle", "tropical", "trouble", "tupac", "utility", "van", "varsity", "venice",
  "voyager", "wake", "wave", "weekend", "west", "wifey", "wild", "wildflower", "woke", "workout",
  "yoga", "yoke", "york", "youth", "zeppelin"
];

// ─── BUILD CATEGORIES ─────────────────────────────────────────────────────────

export const TREND_CATEGORIES: TrendCategory[] = [
  {
    id: "texture-pattern",
    label: "Texture & Pattern",
    icon: "🌿",
    description: "Surface textures, prints & weave patterns",
    attributes: buildCategoryAttributes(
      "Texture & Pattern",
      category1_texture,
      ["ikat", "ikat print", "mandala print", "embroidered floral", "botanical print", "floral print", "watercolor", "colorblock"],
      ["animal print", "cheetah", "marble print", "abstract geo print", "kaleidoscope print"],
      ["camo", "camouflage", "paint splatter", "rugby stripe"]
    ),
  },
  {
    id: "fabric-material",
    label: "Fabric & Material",
    icon: "🧵",
    description: "Fabric types, finishes & construction techniques",
    attributes: buildCategoryAttributes(
      "Fabric & Material",
      category2_fabric,
      ["organza", "chiffon", "embroidery", "embroidered", "lace", "velvet", "crochet", "georgette"],
      ["sequin", "metallic", "glitter", "rhinestone", "beaded"],
      ["acid wash", "distressed", "ripped", "neoprene"]
    ),
  },
  {
    id: "shape-silhouette",
    label: "Shape & Silhouette",
    icon: "✂️",
    description: "Garment shapes, cuts & length profiles",
    attributes: buildCategoryAttributes(
      "Shape & Silhouette",
      category3_shape,
      ["midi", "maxi", "wide-leg", "flowy", "oversized", "wrap", "smocked", "flare"],
      ["bodycon", "crop", "mini", "bustier", "cutout"],
      ["skinny", "low-rise", "distressed skinny", "pencil"]
    ),
  },
  {
    id: "part-detail",
    label: "Part & Detail",
    icon: "🪡",
    description: "Necklines, sleeves, closures & embellishments",
    attributes: buildCategoryAttributes(
      "Part & Detail",
      category4_detail,
      ["off-the-shoulder", "flutter sleeve", "ruffle trim", "high-slit", "one-shoulder", "side slit", "lace-up", "gathered waistline"],
      ["backless", "deep v-neck", "open-back", "strapless"],
      ["hooded", "kangaroo pocket", "zip-up", "double-breasted"]
    ),
  },
  {
    id: "style-occasion",
    label: "Style & Occasion",
    icon: "🎉",
    description: "Mood, lifestyle & occasion descriptors",
    attributes: buildCategoryAttributes(
      "Style & Occasion",
      category5_style,
      ["festive", "boho", "garden party", "luxe", "ethereal", "chic", "relaxed", "tropical"],
      ["party", "bold", "retro", "daring"],
      ["grunge", "destroyed", "athletic", "workout"]
    ),
  },
];

export const ALL_ATTRIBUTES = TREND_CATEGORIES.flatMap(c => c.attributes);
