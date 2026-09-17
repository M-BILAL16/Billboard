export interface BillboardFormat {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  ctaText: string;
  image: string;
  specs: {
    audience: string;
    locationType: string;
    format: string;
    estimatedReach: string;
    avgDwellTime: string;
  };
}

export interface FeaturedCampaign {
  id: string;
  number: string;
  brand: string;
  title: string;
  city: string;
  country: string;
  description: string;
  ctaText: string;
  image: string;
  colorAccent: string;
  metrics: {
    impressions: string;
    lift: string;
    duration: string;
  };
}

export interface BillboardLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: { x: number; y: number }; // percentage on map
  dimensions: string;
  weeklyImpressions: string;
  screenType: string;
  availableFormats: string[];
  image: string;
  highlight: string;
}

export interface InsightArticle {
  id: string;
  number: string;
  title: string;
  category: 'INSIGHTS' | 'GUIDE' | 'TRENDS';
  readTime: string;
  date: string;
  excerpt: string;
}
