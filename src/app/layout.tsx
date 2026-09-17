import type { Metadata, Viewport } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'VORTEX OOH | Outdoor Advertising Reimagined — Own The City',
  description:
    'From iconic city-centre screens to high-impact roadside billboards, VORTEX puts brands in the places people cannot ignore. High-impact digital billboards, 3D anamorphic displays, and global DOOH networks.',
  keywords: [
    'digital billboards',
    'DOOH',
    'outdoor advertising',
    'city takeovers',
    '3D anamorphic screens',
    'Times Square billboard',
    'Piccadilly lights',
    'highway billboards',
  ],
  authors: [{ name: 'VORTEX Media Group' }],
  openGraph: {
    title: 'VORTEX OOH | Outdoor Advertising Reimagined',
    description: "Don't just run an ad. Own the city.",
    type: 'website',
    locale: 'en_US',
    siteName: 'VORTEX OOH',
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
