import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Signs NYC - 35+ Years of Architectural Sign Craftsmanship',
  description:
    'Discover the story of Signs NYC. Established in 1989 with a 10,000 sq ft local NYC production facility, DOB Class 1 Master Sign Hanger license #000185, and turnkey architectural signage across all five boroughs.',
  keywords: [
    'Signs NYC about us',
    'NYC sign company history',
    'DOB Class 1 Master Sign Hanger',
    '10000 sq ft sign fabrication NYC',
    'Brooklyn sign company',
    'custom architectural signs New York',
    'UL listed signs NYC',
    '3M MCS certified installer NYC',
  ],
  openGraph: {
    title: 'About Us | Signs NYC - We Don’t Just Make Signs, We Craft NYC’s Streetscape',
    description:
      'For over 35 years, Signs NYC has engineered, fabricated, and installed the visual identity of New York City. Tour our 10,000 sq ft plant and meet our master craftsmen.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Signs NYC',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
