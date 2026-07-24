// ============================================================
// MOCK PRODUCT DATA — StockSense Well-Going Products
// ============================================================
// Top performing products linked directly to trending attributes
// ============================================================

import { TREND_CATEGORIES } from "./mockTrendData";

export interface BangaloreMetrics {
  instagram: {
    views: number;         // last 30 days (Bangalore geo)
    likes: number;
    topHashtags: string[];
    reelMentions: number;
  };
  googleTrends: {
    searchVolume: number;  // monthly searches in Bangalore
    weeklySparkline: number[]; // 8-week index 0–100
    relatedQueries: string[];
    peakDay: string;
  };
  myntra: {
    searches: number;      // monthly searches on Myntra from Bangalore
    wishlistAdds: number;
    conversionRate: number; // percentage
    avgOrderValue: number;  // INR
  };
  ajio: {
    pageViews: number;
    addToCart: number;
    conversionRate: number;
    returnRate: number;    // percentage
  };
  overallSignal: "Strong Buy" | "Rising" | "Watch" | "Cooling";
  bangaloreHotspot: string; // area most active
  insightSummary: string;
}

export interface WellGoingProduct {
  id: string;
  name: string;
  category: "Full Body Garments" | "Upper Body Garments" | "Lower Body Garments";
  unitsSold: number;
  revenue: number; // in INR
  salesSparkline: number[]; // 7 data points upward trend
  matchedAttributeTags: string[]; // Linked trending attributes
  badgeText: string;
  imageUrl?: string;
  bangaloreMetrics: BangaloreMetrics;
}

// Function to pull top trending attribute names for linking
function getTopTrendingTags(): string[] {
  const topTags: string[] = [];
  TREND_CATEGORIES.forEach(cat => {
    // Pick top 2 rising/peaking attributes from each category
    const topInCat = cat.attributes
      .filter(a => a.direction === "Rising" || a.direction === "Peaking")
      .slice(0, 2)
      .map(a => a.name);
    topTags.push(...topInCat);
  });
  return topTags;
}

const topTags = getTopTrendingTags();

export const WELL_GOING_PRODUCTS: WellGoingProduct[] = [
  {
    id: "prod-1",
    name: "Ikat Silk Anarkali Co-Ord",
    category: "Full Body Garments",
    unitsSold: 218,
    revenue: 436000,
    salesSparkline: [25, 38, 45, 62, 78, 92, 100],
    matchedAttributeTags: ["ikat print", "organza", "midi", "festive", "embroidered"],
    badgeText: "Best Seller",
    imageUrl: "/images/product_ikat_anarkali.jpg",
    bangaloreMetrics: {
      instagram: { views: 284500, likes: 31200, topHashtags: ["#IkatFashionBangalore", "#NavratriLook", "#AnarkaliVibes"], reelMentions: 412 },
      googleTrends: { searchVolume: 18400, weeklySparkline: [34, 41, 55, 62, 71, 80, 88, 95], relatedQueries: ["ikat anarkali Bangalore", "silk co-ord sets", "navratri ethnic wear"], peakDay: "Saturday" },
      myntra: { searches: 23100, wishlistAdds: 5840, conversionRate: 6.4, avgOrderValue: 2100 },
      ajio: { pageViews: 14700, addToCart: 3210, conversionRate: 5.8, returnRate: 8.2 },
      overallSignal: "Strong Buy",
      bangaloreHotspot: "Koramangala & Indiranagar",
      insightSummary: "Ikat is seeing a surge driven by Navratri prep among 22–35 age women in South Bangalore. Instagram reel virality from 3 micro-influencers in HSR Layout pushed a 38% spike in the last 10 days.",
    },
  },
  {
    id: "prod-2",
    name: "Organza Floral Flutter Dupatta Set",
    category: "Upper Body Garments",
    unitsSold: 184,
    revenue: 294400,
    salesSparkline: [20, 30, 42, 58, 70, 85, 96],
    matchedAttributeTags: ["organza", "botanical print", "flutter sleeve", "garden party"],
    badgeText: "High Velocity",
    bangaloreMetrics: {
      instagram: { views: 196300, likes: 22100, topHashtags: ["#OrganzaSet", "#FloralDupatta", "#BangaloreFashion"], reelMentions: 298 },
      googleTrends: { searchVolume: 12800, weeklySparkline: [28, 35, 44, 58, 65, 74, 82, 88], relatedQueries: ["organza dupatta set Bangalore", "flutter sleeve kurti", "garden party outfit"], peakDay: "Friday" },
      myntra: { searches: 17400, wishlistAdds: 4120, conversionRate: 5.9, avgOrderValue: 1650 },
      ajio: { pageViews: 9800, addToCart: 2100, conversionRate: 4.7, returnRate: 10.1 },
      overallSignal: "Rising",
      bangaloreHotspot: "Whitefield & Marathahalli",
      insightSummary: "Organza sets are trending heavily in IT corridor areas (Whitefield, Marathahalli) — driven by office-party and weekend brunch aesthetics. Pinterest saves from Bangalore accounts up 62% MoM.",
    },
  },
  {
    id: "prod-3",
    name: "Chiffon Hand-Embroidered Lehenga",
    category: "Full Body Garments",
    unitsSold: 165,
    revenue: 577500,
    salesSparkline: [30, 45, 52, 65, 80, 88, 94],
    matchedAttributeTags: ["chiffon", "embroidery", "maxi", "festive", "gathered waistline"],
    badgeText: "High Margin",
    bangaloreMetrics: {
      instagram: { views: 341200, likes: 48600, topHashtags: ["#LehengarLove", "#EmbroideredChiffon", "#FestiveBangalore"], reelMentions: 589 },
      googleTrends: { searchVolume: 29600, weeklySparkline: [42, 51, 60, 68, 77, 84, 90, 97], relatedQueries: ["chiffon lehenga Bangalore", "hand embroidered lehenga price", "festive lehenga 2025"], peakDay: "Sunday" },
      myntra: { searches: 31200, wishlistAdds: 7890, conversionRate: 7.1, avgOrderValue: 3600 },
      ajio: { pageViews: 19400, addToCart: 4650, conversionRate: 6.3, returnRate: 6.8 },
      overallSignal: "Strong Buy",
      bangaloreHotspot: "Jayanagar & JP Nagar",
      insightSummary: "Premium lehengas with hand embroidery are high-intent searches in South Bangalore. Jayanagar boutiques report walk-in inquiries doubling in July. High margin + low return rate makes this the most investable SKU.",
    },
  },
  {
    id: "prod-4",
    name: "Tiered Georgette Midi Kurti",
    category: "Upper Body Garments",
    unitsSold: 142,
    revenue: 213000,
    salesSparkline: [18, 28, 38, 54, 68, 79, 88],
    matchedAttributeTags: ["georgette", "tiered", "midi", "relaxed", "ruffle trim"],
    badgeText: "Trending Fast",
    bangaloreMetrics: {
      instagram: { views: 158700, likes: 19400, topHashtags: ["#MidiKurti", "#TieredFashion", "#GeorgetteLooks"], reelMentions: 234 },
      googleTrends: { searchVolume: 11300, weeklySparkline: [22, 30, 40, 52, 61, 70, 78, 85], relatedQueries: ["tiered kurti Bangalore", "midi kurti for office", "georgette kurti online"], peakDay: "Thursday" },
      myntra: { searches: 14800, wishlistAdds: 3540, conversionRate: 5.4, avgOrderValue: 1380 },
      ajio: { pageViews: 8200, addToCart: 1780, conversionRate: 4.2, returnRate: 11.5 },
      overallSignal: "Rising",
      bangaloreHotspot: "HSR Layout & Electronic City",
      insightSummary: "Tiered georgette is popular as a workwear-to-casual crossover in Bangalore's tech belt. Searches spike Thursday–Friday as professionals plan weekend purchases. Stock running low in sizes S and M.",
    },
  },
  {
    id: "prod-5",
    name: "Wide-Leg Linen Palazzo",
    category: "Lower Body Garments",
    unitsSold: 129,
    revenue: 154800,
    salesSparkline: [22, 32, 40, 52, 64, 75, 84],
    matchedAttributeTags: ["wide-leg", "flowy", "boho", "relaxed"],
    badgeText: "Steady Surge",
    bangaloreMetrics: {
      instagram: { views: 124900, likes: 16800, topHashtags: ["#LinenPalazzo", "#Wideleg", "#BohoVibesBLR"], reelMentions: 187 },
      googleTrends: { searchVolume: 9400, weeklySparkline: [30, 36, 42, 48, 55, 60, 66, 72], relatedQueries: ["linen palazzo Bangalore", "wide leg pants summer", "boho palazzo set"], peakDay: "Saturday" },
      myntra: { searches: 12100, wishlistAdds: 2890, conversionRate: 4.9, avgOrderValue: 1150 },
      ajio: { pageViews: 7100, addToCart: 1420, conversionRate: 3.8, returnRate: 9.4 },
      overallSignal: "Watch",
      bangaloreHotspot: "Sadashivanagar & Malleshwaram",
      insightSummary: "Linen palazzo has steady organic demand from the North Bangalore crowd (Malleshwaram, Sadashivanagar) in the 30–45 age group. Preference for comfort-led fashion is consistent. Not a spike — a sustained, low-risk volume play.",
    },
  },
  {
    id: "prod-6",
    name: "Velvet Off-The-Shoulder Blouse",
    category: "Upper Body Garments",
    unitsSold: 116,
    revenue: 208800,
    salesSparkline: [15, 25, 42, 55, 69, 78, 86],
    matchedAttributeTags: ["velvet", "off-the-shoulder", "chic", "festive"],
    badgeText: "Pre-Order Spike",
    bangaloreMetrics: {
      instagram: { views: 178400, likes: 24900, topHashtags: ["#VelvetBlouse", "#OffShoulderFashion", "#BangaloreChic"], reelMentions: 316 },
      googleTrends: { searchVolume: 13700, weeklySparkline: [18, 28, 44, 58, 68, 76, 83, 91], relatedQueries: ["velvet blouse Bangalore", "off shoulder blouse for lehenga", "party blouse designs 2025"], peakDay: "Friday" },
      myntra: { searches: 16200, wishlistAdds: 4480, conversionRate: 6.8, avgOrderValue: 1890 },
      ajio: { pageViews: 11300, addToCart: 2640, conversionRate: 5.5, returnRate: 7.6 },
      overallSignal: "Strong Buy",
      bangaloreHotspot: "Indiranagar & Richmond Town",
      insightSummary: "Velvet off-shoulder is a breakout product for evening/party occasions in Bangalore's nightlife hubs. Pre-order spike from Indiranagar customers is 3x higher than last season. Wedding season demand is accelerating this trend.",
    },
  },
  {
    id: "prod-7",
    name: "Mandala Print Wrap Kaftan",
    category: "Full Body Garments",
    unitsSold: 98,
    revenue: 176400,
    salesSparkline: [12, 22, 35, 48, 62, 74, 82],
    matchedAttributeTags: ["mandala print", "wrap", "ethereal", "tropical"],
    badgeText: "Boutique Favorite",
    bangaloreMetrics: {
      instagram: { views: 98200, likes: 13400, topHashtags: ["#MandalaKaftan", "#WrapDress", "#BohoBangalore"], reelMentions: 148 },
      googleTrends: { searchVolume: 7200, weeklySparkline: [24, 29, 35, 42, 50, 57, 63, 69], relatedQueries: ["mandala kaftan Bangalore", "wrap kaftan resort wear", "boho kaftan buy"], peakDay: "Sunday" },
      myntra: { searches: 9800, wishlistAdds: 2140, conversionRate: 4.3, avgOrderValue: 1720 },
      ajio: { pageViews: 5400, addToCart: 1080, conversionRate: 3.5, returnRate: 12.3 },
      overallSignal: "Watch",
      bangaloreHotspot: "Koramangala & Bannerghatta Road",
      insightSummary: "Mandala kaftans are a niche-but-loyal category. Boutique buyers in Koramangala prefer unique prints and are repeat purchasers. Ajio return rate is slightly elevated — sizing guidance needed. Good for curated boutique stock, not mass replenishment.",
    },
  },
  {
    id: "prod-8",
    name: "High-Slit Smocked Maxi Skirt",
    category: "Lower Body Garments",
    unitsSold: 89,
    revenue: 142400,
    salesSparkline: [10, 20, 32, 45, 58, 70, 78],
    matchedAttributeTags: ["high-slit", "smocked", "maxi", "luxe"],
    badgeText: "Rising Demand",
    bangaloreMetrics: {
      instagram: { views: 142600, likes: 18700, topHashtags: ["#SmockedMaxi", "#HighSlitSkirt", "#LuxeFashionBLR"], reelMentions: 224 },
      googleTrends: { searchVolume: 10100, weeklySparkline: [14, 22, 32, 44, 54, 63, 71, 80], relatedQueries: ["smocked maxi skirt Bangalore", "high slit skirt buy", "luxe skirt party wear"], peakDay: "Saturday" },
      myntra: { searches: 13400, wishlistAdds: 3120, conversionRate: 5.2, avgOrderValue: 1600 },
      ajio: { pageViews: 8600, addToCart: 1940, conversionRate: 4.6, returnRate: 9.8 },
      overallSignal: "Rising",
      bangaloreHotspot: "UB City Area & MG Road",
      insightSummary: "Smocked maxi skirts are gaining momentum in the premium segment — driven by UB City and MG Road shoppers. High-slit detailing resonates with evening-event dressing. Search volume growing 18% WoW on Google, Bangalore-specific.",
    },
  },
];
