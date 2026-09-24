import type { Metadata } from 'next';
import PortfolioClient from '@/components/PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio & Landmark Installations | Signs NYC',
  description:
    'Explore our portfolio of 850+ architectural signs, storefront channel letters, motorized commercial awnings, hand-blown neon blade signs, and vehicle wraps fabricated in our 10,000 sq ft NYC plant.',
  keywords: [
    'Signs NYC portfolio',
    'NYC sign projects',
    'storefront channel letters portfolio',
    'commercial awnings NYC',
    'blade signs New York',
    'vehicle wrap portfolio NYC',
    'DOB sign permit projects',
    'architectural signage NYC',
  ],
  openGraph: {
    title: 'Portfolio & Landmark Installations | Signs NYC - Built for New York',
    description:
      'Proven in the New York streetscape. Tour 850+ verified architectural sign installations across Manhattan, Brooklyn, Queens, Bronx, and Staten Island.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Signs NYC',
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
