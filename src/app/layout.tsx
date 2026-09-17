import type { Metadata, Viewport } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Signs NYC | Custom Signs, Storefronts & Architectural Fabrication New York',
  description:
    'New York’s premier full-service sign company for 35+ years. 10,000 sq ft in-house fabrication, DOB permit expediting, 3M certified installation, and 24/7 emergency service across all 5 boroughs.',
  keywords: [
    'Signs NYC',
    'NYC sign company',
    'storefront signs NYC',
    'channel letters',
    'DOB sign permits',
    'commercial awnings',
    'architectural signage',
    'lobby signs NYC',
    'vehicle wraps NYC',
    'neon signs New York',
  ],
  authors: [{ name: 'Signs NYC Fabrication' }],
  openGraph: {
    title: 'Signs NYC | Custom Signs & Architectural Fabrication New York',
    description: 'We don’t just make signs. We build NYC landmarks.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Signs NYC',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F7F5EF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
