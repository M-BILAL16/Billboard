'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  MapPin,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckCircle2,
  Building2,
  Compass,
} from 'lucide-react';
import { BillboardLocation } from '../types';

export interface NYCInstallation {
  id: string;
  name: string;
  clientType: string;
  borough: 'Manhattan' | 'Brooklyn' | 'Queens' | 'The Bronx' | 'Staten Island';
  neighborhood: string;
  address: string;
  signType: string;
  installedYear: string;
  permitNumber: string;
  link: string;
  lat: number;
  lng: number;
  // Precise coordinate percentage on NYC satellite map (x: 0-100%, y: 0-100%)
  coordinates: { x: number; y: number };
  featured?: boolean;
}

export const NYC_INSTALLATIONS: NYCInstallation[] = [
  // MANHATTAN
  {
    id: 'm1',
    name: 'Lumina Jewelry Flagship',
    clientType: 'Luxury Retail Flagship',
    borough: 'Manhattan',
    neighborhood: 'Midtown East',
    address: '580 Fifth Avenue, New York, NY 10036',
    signType: 'Illuminated 3D Brushed-Metal Channel Letters & Halo Glow',
    installedYear: '2024',
    permitNumber: 'DOB-NY-449120',
    link: 'https://signsny.com/portfolio/manhattan-5th-ave-flagship',
    lat: 40.7568,
    lng: -73.9789,
    coordinates: { x: 46.2, y: 41.8 },
    featured: true,
  },
  {
    id: 'm2',
    name: 'SoHo Designer Atelier',
    clientType: 'High-Fashion Storefront',
    borough: 'Manhattan',
    neighborhood: 'SoHo Historic District',
    address: '432 Broadway, New York, NY 10013',
    signType: 'Architectural Cast Bronze Blade Sign & Carved Gold Leaf',
    installedYear: '2023',
    permitNumber: 'LPC-DOB-88319',
    link: 'https://signsny.com/portfolio/soho-broadway-atelier',
    lat: 40.7202,
    lng: -74.0006,
    coordinates: { x: 43.1, y: 48.2 },
    featured: true,
  },
  {
    id: 'm3',
    name: 'Hudson Yards Corporate HQ',
    clientType: 'Commercial Office Tower',
    borough: 'Manhattan',
    neighborhood: 'Hudson Yards',
    address: '500 W 33rd Street, New York, NY 10001',
    signType: 'Executive Lobby Dimensional Brushed Acrylic & Wayfinding Monolith',
    installedYear: '2024',
    permitNumber: 'DOB-NY-612984',
    link: 'https://signsny.com/portfolio/hudson-yards-corporate',
    lat: 40.7538,
    lng: -74.0022,
    coordinates: { x: 43.5, y: 41.2 },
  },
  {
    id: 'm4',
    name: 'Wall Street Capital Partners',
    clientType: 'Financial Services',
    borough: 'Manhattan',
    neighborhood: 'Financial District',
    address: '14 Wall Street, New York, NY 10005',
    signType: 'Solid Cast Architectural Bronze Plaque & Directory',
    installedYear: '2022',
    permitNumber: 'DOB-NY-320911',
    link: 'https://signsny.com/portfolio/wall-street-financial',
    lat: 40.7071,
    lng: -74.011,
    coordinates: { x: 41.4, y: 53.1 },
  },
  {
    id: 'm5',
    name: 'Madison Avenue Haute Horlogerie',
    clientType: 'Luxury Watches & Jewelry',
    borough: 'Manhattan',
    neighborhood: 'Upper East Side',
    address: '710 Madison Avenue, New York, NY 10065',
    signType: 'Precision Reverse Halo-Lit Titanium Letters',
    installedYear: '2023',
    permitNumber: 'LPC-DOB-55210',
    link: 'https://signsny.com/portfolio/madison-ave-luxury',
    lat: 40.7656,
    lng: -73.9685,
    coordinates: { x: 48.1, y: 34.6 },
  },
  {
    id: 'm6',
    name: 'Harlem Heritage Theatre & Stage',
    clientType: 'Arts & Cultural Venue',
    borough: 'Manhattan',
    neighborhood: 'Central Harlem',
    address: '253 W 125th Street, New York, NY 10027',
    signType: 'Custom Heritage Marquee Neon & Front-Lit LED Display',
    installedYear: '2023',
    permitNumber: 'DOB-NY-774190',
    link: 'https://signsny.com/portfolio/harlem-cultural-center',
    lat: 40.8095,
    lng: -73.9501,
    coordinates: { x: 49.3, y: 26.5 },
  },

  // BROOKLYN
  {
    id: 'b1',
    name: 'Brooklyn Roasting & Bakehouse',
    clientType: 'Artisanal Cafe & Bakery',
    borough: 'Brooklyn',
    neighborhood: 'DUMBO Historic Waterfront',
    address: '25 Jay Street, Brooklyn, NY 11201',
    signType: 'Hand-Welded Industrial Steel Blade Sign & Filament Illumination',
    installedYear: '2024',
    permitNumber: 'LPC-BK-91823',
    link: 'https://signsny.com/portfolio/dumbo-brooklyn-roasters',
    lat: 40.7037,
    lng: -73.9872,
    coordinates: { x: 44.5, y: 54.8 },
    featured: true,
  },
  {
    id: 'b2',
    name: 'Williamsburg Craft Brewery & Tap',
    clientType: 'Brewery & Hospitality',
    borough: 'Brooklyn',
    neighborhood: 'Williamsburg',
    address: '180 Bedford Avenue, Brooklyn, NY 11249',
    signType: 'Custom Neon Gas-Tube Lettering & Weathered Steel Wall Pan',
    installedYear: '2023',
    permitNumber: 'DOB-BK-339108',
    link: 'https://signsny.com/portfolio/williamsburg-craft-brewery',
    lat: 40.7182,
    lng: -73.9575,
    coordinates: { x: 48.2, y: 50.1 },
    featured: true,
  },
  {
    id: 'b3',
    name: 'Industry City Innovation Campus',
    clientType: 'Industrial Creative Campus',
    borough: 'Brooklyn',
    neighborhood: 'Sunset Park',
    address: '220 36th Street, Brooklyn, NY 11232',
    signType: 'Campus Wayfinding Monoliths & High-Durability Building IDs',
    installedYear: '2024',
    permitNumber: 'DOB-BK-748291',
    link: 'https://signsny.com/portfolio/industry-city-brooklyn',
    lat: 40.6558,
    lng: -74.0089,
    coordinates: { x: 42.1, y: 67.8 },
  },
  {
    id: 'b4',
    name: 'Downtown Brooklyn Metrotech',
    clientType: 'Technology Campus',
    borough: 'Brooklyn',
    neighborhood: 'Downtown Brooklyn',
    address: '1 MetroTech Center, Brooklyn, NY 11201',
    signType: 'Comprehensive ADA Tactile Signage & Architectural Pylon',
    installedYear: '2022',
    permitNumber: 'DOB-BK-501832',
    link: 'https://signsny.com/portfolio/metrotech-center-brooklyn',
    lat: 40.6935,
    lng: -73.9859,
    coordinates: { x: 46.1, y: 58.2 },
  },
  {
    id: 'b5',
    name: 'Greenpoint Promenade Residences',
    clientType: 'Luxury Residential',
    borough: 'Brooklyn',
    neighborhood: 'Greenpoint Waterfront',
    address: '21 India Street, Brooklyn, NY 11222',
    signType: 'Cast Stainless Steel Letters & Backlit Canopy Entrance',
    installedYear: '2023',
    permitNumber: 'DOB-BK-662810',
    link: 'https://signsny.com/portfolio/greenpoint-waterfront',
    lat: 40.7312,
    lng: -73.9602,
    coordinates: { x: 49.0, y: 46.1 },
  },
  {
    id: 'b6',
    name: 'Coney Island Boardwalk Grill',
    clientType: 'Oceanfront Entertainment',
    borough: 'Brooklyn',
    neighborhood: 'Coney Island',
    address: '1205 Boardwalk West, Brooklyn, NY 11224',
    signType: 'Salt-Air Marine-Grade Weatherproof Illuminated Fascia Sign',
    installedYear: '2023',
    permitNumber: 'DOB-BK-192044',
    link: 'https://signsny.com/portfolio/coney-island-boardwalk',
    lat: 40.5752,
    lng: -73.9806,
    coordinates: { x: 47.2, y: 91.8 },
  },

  // QUEENS
  {
    id: 'q1',
    name: 'Long Island City Studio Lofts',
    clientType: 'Creative Production Campus',
    borough: 'Queens',
    neighborhood: 'Long Island City',
    address: '43-01 22nd Street, Queens, NY 11101',
    signType: 'Perforated Aluminum Facade Wrap & Illuminated Steel Letters',
    installedYear: '2024',
    permitNumber: 'DOB-QN-554210',
    link: 'https://signsny.com/portfolio/lic-art-studios-queens',
    lat: 40.7495,
    lng: -73.9436,
    coordinates: { x: 50.4, y: 42.1 },
    featured: true,
  },
  {
    id: 'q2',
    name: 'Astoria Seafood & Greek Grill',
    clientType: 'Fine Dining Restaurant',
    borough: 'Queens',
    neighborhood: 'Astoria',
    address: '31-15 30th Avenue, Queens, NY 11102',
    signType: 'Carved High-Density Urethane (HDU) 23k Gold Leaf Blade',
    installedYear: '2023',
    permitNumber: 'DOB-QN-338290',
    link: 'https://signsny.com/portfolio/astoria-greek-taverna',
    lat: 40.7681,
    lng: -73.9218,
    coordinates: { x: 52.4, y: 35.2 },
    featured: true,
  },
  {
    id: 'q3',
    name: 'Flushing Grand Heritage Plaza',
    clientType: 'Commercial Center',
    borough: 'Queens',
    neighborhood: 'Downtown Flushing',
    address: '136-20 38th Avenue, Queens, NY 11354',
    signType: 'Multi-Tenant Commercial Pylon & Ultra-Bright LED Modules',
    installedYear: '2024',
    permitNumber: 'DOB-QN-882019',
    link: 'https://signsny.com/portfolio/flushing-heritage-plaza',
    lat: 40.7595,
    lng: -73.8322,
    coordinates: { x: 65.2, y: 38.3 },
  },
  {
    id: 'q4',
    name: 'Sunnyside Regional Care Center',
    clientType: 'Healthcare Facility',
    borough: 'Queens',
    neighborhood: 'Sunnyside',
    address: '47-01 Queens Boulevard, Queens, NY 11104',
    signType: 'Emergency Code Compliant Backlit Signage & Directional Grid',
    installedYear: '2022',
    permitNumber: 'DOB-QN-419082',
    link: 'https://signsny.com/portfolio/sunnyside-medical-queens',
    lat: 40.7425,
    lng: -73.9189,
    coordinates: { x: 54.2, y: 44.1 },
  },
  {
    id: 'q5',
    name: 'JFK Air Cargo Terminal 8',
    clientType: 'Aviation Logistics',
    borough: 'Queens',
    neighborhood: 'JFK International Airport',
    address: 'Building 14, JFK Airport, Jamaica, NY 11430',
    signType: 'Reflective High-Elevation Industrial Warehouse Identification',
    installedYear: '2023',
    permitNumber: 'PA-DOB-91024',
    link: 'https://signsny.com/portfolio/jfk-cargo-facility-queens',
    lat: 40.6432,
    lng: -73.782,
    coordinates: { x: 74.5, y: 70.2 },
  },

  // THE BRONX
  {
    id: 'x1',
    name: 'Mott Haven Soundstage Studios',
    clientType: 'Film & Media Facility',
    borough: 'The Bronx',
    neighborhood: 'Mott Haven Waterfront',
    address: '2417 Third Avenue, Bronx, NY 10451',
    signType: 'Direct UV-Printed Industrial Metal Wall Panels & Roof ID',
    installedYear: '2024',
    permitNumber: 'DOB-BX-220194',
    link: 'https://signsny.com/portfolio/mott-haven-studios-bronx',
    lat: 40.8123,
    lng: -73.9288,
    coordinates: { x: 52.2, y: 24.5 },
    featured: true,
  },
  {
    id: 'x2',
    name: 'Arthur Avenue Italian Salumeria',
    clientType: 'Historic Deli & Market',
    borough: 'The Bronx',
    neighborhood: 'Belmont / Little Italy',
    address: '2364 Arthur Avenue, Bronx, NY 10458',
    signType: 'Glass-Gilded 24k Gold Foil Storefront & Metal Canopy Blade',
    installedYear: '2023',
    permitNumber: 'DOB-BX-678120',
    link: 'https://signsny.com/portfolio/arthur-ave-bakery-bronx',
    lat: 40.8548,
    lng: -73.8892,
    coordinates: { x: 54.3, y: 17.2 },
  },
  {
    id: 'x3',
    name: 'Hunts Point Wholesale Distribution',
    clientType: 'Industrial Distribution',
    borough: 'The Bronx',
    neighborhood: 'Hunts Point',
    address: '770 Food Center Drive, Bronx, NY 10474',
    signType: 'Stainless Steel Heavy Logistics Signage & Loading Bay Numbers',
    installedYear: '2023',
    permitNumber: 'DOB-BX-510982',
    link: 'https://signsny.com/portfolio/hunts-point-distribution',
    lat: 40.8091,
    lng: -73.8812,
    coordinates: { x: 57.1, y: 25.4 },
  },
  {
    id: 'x4',
    name: 'Grand Concourse Health Plaza',
    clientType: 'Medical Plaza',
    borough: 'The Bronx',
    neighborhood: 'Concourse',
    address: '1650 Grand Concourse, Bronx, NY 10457',
    signType: 'DOB-Permitted Illuminated Ground Monument Sign',
    installedYear: '2022',
    permitNumber: 'DOB-BX-334190',
    link: 'https://signsny.com/portfolio/grand-concourse-health',
    lat: 40.8432,
    lng: -73.9125,
    coordinates: { x: 51.4, y: 21.0 },
  },

  // STATEN ISLAND
  {
    id: 's1',
    name: 'St. George Terminal Ferry Plaza',
    clientType: 'Civic Transit Hub',
    borough: 'Staten Island',
    neighborhood: 'St. George',
    address: '1 Richmond Terrace, Staten Island, NY 10301',
    signType: 'Marine-Grade 316 Stainless Steel Monoliths & Directional Signs',
    installedYear: '2024',
    permitNumber: 'DOB-SI-992104',
    link: 'https://signsny.com/portfolio/st-george-terminal-si',
    lat: 40.6438,
    lng: -74.0745,
    coordinates: { x: 34.2, y: 63.4 },
    featured: true,
  },
  {
    id: 's2',
    name: 'Staten Island Regional Mall Anchor',
    clientType: 'Department Store & Retail',
    borough: 'Staten Island',
    neighborhood: 'New Springville',
    address: '2655 Richmond Avenue, Staten Island, NY 10314',
    signType: 'Massive Halo-Lit LED Channel Letters & Highway Pylon Panel',
    installedYear: '2023',
    permitNumber: 'DOB-SI-442109',
    link: 'https://signsny.com/portfolio/staten-island-mall-retail',
    lat: 40.5832,
    lng: -74.1612,
    coordinates: { x: 26.3, y: 74.2 },
  },
  {
    id: 's3',
    name: 'Tottenville Marina & Yacht Basin',
    clientType: 'Maritime & Harbor',
    borough: 'Staten Island',
    neighborhood: 'Tottenville',
    address: '250 Main Street, Staten Island, NY 10307',
    signType: 'UV-Protected Anodized Aluminum Channel Sign & Dock Identifiers',
    installedYear: '2022',
    permitNumber: 'DOB-SI-110294',
    link: 'https://signsny.com/portfolio/tottenville-marina-si',
    lat: 40.5098,
    lng: -74.2482,
    coordinates: { x: 18.2, y: 88.4 },
  },
];

interface LocationMapProps {
  onSelectLocation?: (loc: BillboardLocation) => void;
}

export default function LocationMap({ onSelectLocation }: LocationMapProps) {
  const [selectedBorough, setSelectedBorough] = useState<string>('All');
  const [activePin, setActivePin] = useState<NYCInstallation>(NYC_INSTALLATIONS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapMode, setMapMode] = useState<'interactive' | 'live-google'>('interactive');

  const filteredInstallations =
    selectedBorough === 'All'
      ? NYC_INSTALLATIONS
      : NYC_INSTALLATIONS.filter((pin) => pin.borough === selectedBorough);

  const boroughs = [
    { label: 'All', count: NYC_INSTALLATIONS.length },
    { label: 'Manhattan', count: NYC_INSTALLATIONS.filter((p) => p.borough === 'Manhattan').length },
    { label: 'Brooklyn', count: NYC_INSTALLATIONS.filter((p) => p.borough === 'Brooklyn').length },
    { label: 'Queens', count: NYC_INSTALLATIONS.filter((p) => p.borough === 'Queens').length },
    { label: 'The Bronx', count: NYC_INSTALLATIONS.filter((p) => p.borough === 'The Bronx').length },
    { label: 'Staten Island', count: NYC_INSTALLATIONS.filter((p) => p.borough === 'Staten Island').length },
  ];

  return (
    <section
      id="locations"
      style={{
        position: 'relative',
        backgroundColor: '#F7F5EF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#1E56FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={14} />
              FIVE BOROUGH INSTALLATION COVERAGE.
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#111111',
                marginBottom: '1.25rem',
              }}
            >
              SERVICING <br />
              <span style={{ color: '#1E56FF' }}>ALL 5 NYC BOROUGHS.</span>
            </h2>

            <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '640px', lineHeight: 1.6 }}>
              Over 3,240+ businesses across New York trust Signs NY for custom fabrication, DOB permit approvals, and
              certified union installation. Explore active client installation pins on satellite view.
            </p>
          </div>

          {/* Quick Telemetry Pill */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(30, 86, 255, 0.25)',
                boxShadow: '0 4px 14px rgba(30, 86, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#1E56FF',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px #10B981',
                  display: 'inline-block',
                }}
              />
              <span>3,240+ COMPLETED NYC INSTALLATIONS</span>
            </div>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#777777' }}>
              NYC DOB & LPC LICENSED SIGN HANGER
            </span>
          </div>
        </div>

        {/* Filter Toolbar & Map Mode Switcher */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Borough Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              backgroundColor: '#FFFFFF',
              padding: '0.35rem',
              borderRadius: '9999px',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            {boroughs.map((b) => {
              const isActive = selectedBorough === b.label;
              return (
                <button
                  key={b.label}
                  onClick={() => setSelectedBorough(b.label)}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#1E56FF' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#555555',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>{b.label}</span>
                  <span
                    style={{
                      opacity: isActive ? 0.9 : 0.6,
                      fontSize: '0.64rem',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(17, 17, 17, 0.06)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {b.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: Interactive Satellite Pins vs Live Google Maps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: '#FFFFFF',
              padding: '0.3rem',
              borderRadius: '9999px',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            }}
          >
            <button
              onClick={() => setMapMode('interactive')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: mapMode === 'interactive' ? '#111111' : 'transparent',
                color: mapMode === 'interactive' ? '#FFFFFF' : '#666666',
                transition: 'all 0.2s ease',
              }}
            >
              <MapPin size={13} />
              <span>SATELLITE PIN RADAR</span>
            </button>

            <button
              onClick={() => setMapMode('live-google')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: mapMode === 'live-google' ? '#1E56FF' : 'transparent',
                color: mapMode === 'live-google' ? '#FFFFFF' : '#666666',
                transition: 'all 0.2s ease',
              }}
            >
              <Navigation size={13} />
              <span>LIVE GOOGLE MAPS</span>
            </button>
          </div>
        </div>

        {/* Satellite Map Canvas Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '680px',
            borderRadius: '28px',
            overflow: 'hidden',
            backgroundColor: '#0F172A',
            border: '2px solid #FFFFFF',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        >
          {mapMode === 'interactive' ? (
            <>
              {/* High-Resolution Orthographic Satellite Imagery Layer */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <Image
                  src="/images/nyc_satellite_map.jpg"
                  alt="High-resolution Google satellite view of New York City and the five boroughs"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center 46%',
                    filter: 'brightness(0.98) contrast(1.08) saturate(1.12)',
                  }}
                  priority
                />

                {/* Subtle Night City Grid Radial Vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0) 40%, rgba(15, 23, 42, 0.45) 85%, rgba(15, 23, 42, 0.8) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Borough Architectural Boundary Watermarks */}
                <div
                  style={{
                    position: 'absolute',
                    top: '38%',
                    left: '42%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.75)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  MANHATTAN
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '56%',
                    left: '52%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.75)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  BROOKLYN
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '46%',
                    left: '66%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.75)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  QUEENS
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '18%',
                    left: '54%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 900,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.75)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  THE BRONX
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '76%',
                    left: '26%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 255, 255, 0.75)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  STATEN ISLAND
                </div>

                {/* Multiple Client Sign Installation Pins */}
                {filteredInstallations.map((pin) => {
                  const isSelected = activePin.id === pin.id;

                  return (
                    <div
                      key={pin.id}
                      onClick={() => setActivePin(pin)}
                      onMouseEnter={() => setActivePin(pin)}
                      style={{
                        position: 'absolute',
                        top: `${pin.coordinates.y}%`,
                        left: `${pin.coordinates.x}%`,
                        transform: 'translate(-50%, -100%)',
                        cursor: 'pointer',
                        zIndex: isSelected ? 40 : 25,
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="satellite-pin-marker"
                    >
                      {/* Pulse Radar Wave */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: isSelected ? '28px' : '14px',
                          height: isSelected ? '28px' : '14px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? 'rgba(30, 86, 255, 0.4)' : 'rgba(255, 75, 75, 0.35)',
                          animation: 'pulsePin 1.8s infinite ease-out',
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Google Maps Styled Pin Icon */}
                      <div
                        style={{
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: isSelected ? '34px' : '26px',
                            height: isSelected ? '34px' : '26px',
                            borderRadius: '50% 50% 50% 0',
                            transform: 'rotate(-45deg)',
                            backgroundColor: isSelected ? '#1E56FF' : '#EA4335',
                            border: '2px solid #FFFFFF',
                            boxShadow: isSelected
                              ? '0 6px 18px rgba(30, 86, 255, 0.6), 0 2px 6px rgba(0,0,0,0.4)'
                              : '0 4px 12px rgba(234, 67, 53, 0.5), 0 2px 6px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          {/* Inner Core Dot */}
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              backgroundColor: '#FFFFFF',
                              transform: 'rotate(45deg)',
                            }}
                          />
                        </div>

                        {/* Hover Tooltip Label */}
                        <div
                          style={{
                            marginTop: '4px',
                            backgroundColor: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.82)',
                            backdropFilter: 'blur(8px)',
                            border: isSelected ? '1px solid #1E56FF' : '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.55rem',
                            borderRadius: '9999px',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                            pointerEvents: 'none',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {pin.name}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Google Maps Satellite HUD Top Left */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  zIndex: 35,
                }}
              >
                {/* Mode Indicator Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Layers size={14} color="#1E56FF" />
                  <span style={{ fontWeight: 800 }}>GOOGLE SATELLITE HUD</span>
                  <span style={{ opacity: 0.4 }}>//</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>
                    {filteredInstallations.length} PINS VISIBLE
                  </span>
                </div>
              </div>

              {/* Google Maps Satellite Zoom & Navigation HUD Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  zIndex: 35,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
                    aria-label="Zoom in"
                    style={{
                      width: '38px',
                      height: '38px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <ZoomIn size={16} />
                  </button>

                  <button
                    onClick={() => setZoomLevel((z) => Math.max(1, z - 0.15))}
                    aria-label="Zoom out"
                    style={{
                      width: '38px',
                      height: '38px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <ZoomOut size={16} />
                  </button>

                  <button
                    onClick={() => setZoomLevel(1)}
                    aria-label="Reset zoom"
                    style={{
                      width: '38px',
                      height: '38px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>

              {/* Bottom Left Coordinate Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  zIndex: 35,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                }}
              >
                <Compass size={13} color="#1E56FF" />
                <span>NYC CENTER: 40.7128° N, 74.0060° W</span>
                <span style={{ opacity: 0.35 }}>|</span>
                <span>MAP DATA © GOOGLE SATELLITE IMAGERY</span>
              </div>

              {/* Active Installation Glassmorphism Inspector Card (Bottom Right) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: 'calc(100% - 40px)',
                  maxWidth: '430px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid #1E56FF',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
                  zIndex: 45,
                  animation: 'slideUpPinCard 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Header with Borough Badge */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.65rem',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: '#1E56FF',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {activePin.borough} // {activePin.neighborhood}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: '1.35rem',
                        color: '#111111',
                        lineHeight: 1.15,
                        margin: '0.2rem 0 0 0',
                      }}
                    >
                      {activePin.name}
                    </h3>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '0.3rem 0.65rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(30, 86, 255, 0.1)',
                      color: '#1E56FF',
                      border: '1px solid rgba(30, 86, 255, 0.2)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    INSTALLED {activePin.installedYear}
                  </span>
                </div>

                {/* Street Address */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.78rem',
                    color: '#666666',
                    marginBottom: '0.85rem',
                  }}
                >
                  <MapPin size={13} color="#EA4335" />
                  <span>{activePin.address}</span>
                </div>

                {/* Sign Specifications Grid */}
                <div
                  style={{
                    backgroundColor: '#F7F5EF',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ marginBottom: '0.45rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#888888' }}>
                      SIGNAGE TYPE FABRICATED & INSTALLED
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.88rem',
                        fontWeight: 800,
                        color: '#111111',
                        margin: '0.15rem 0 0 0',
                      }}
                    >
                      {activePin.signType}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#059669',
                      }}
                    >
                      <CheckCircle2 size={12} />
                      DOB PERMITTED // {activePin.permitNumber}
                    </span>

                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666666' }}>
                      {activePin.clientType}
                    </span>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {/* External Project Link */}
                  <a
                    href={activePin.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '9999px',
                      backgroundColor: '#1E56FF',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(30, 86, 255, 0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>VIEW CLIENT SIGN</span>
                    <ExternalLink size={13} />
                  </a>

                  {/* Open in Google Maps Satellite Link */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${activePin.name} ${activePin.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on Google Maps"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      padding: '0.75rem 0.95rem',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid rgba(17, 17, 17, 0.15)',
                      color: '#111111',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Navigation size={13} color="#EA4335" />
                    <span>GOOGLE MAPS</span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            /* Live Google Maps Satellite Embed */
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <iframe
                title="Google Maps Satellite View of New York City Client Installations"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=New+York+City+Five+Boroughs&t=k&z=11&ie=UTF8&iwloc=&output=embed"
              />

              {/* Floating Back to Radar Button */}
              <button
                onClick={() => setMapMode('interactive')}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '9999px',
                  backgroundColor: '#1E56FF',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(30, 86, 255, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <MapPin size={14} />
                <span>SWITCH TO CLIENT PIN RADAR</span>
              </button>
            </div>
          )}
        </div>

        {/* 5-Borough Live Coverage Stats Strip Below Map */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginTop: '2.5rem',
          }}
        >
          {[
            {
              borough: 'MANHATTAN',
              installs: '1,280+',
              highlight: 'Flagships, Midtown, SoHo, Wall St',
              badge: 'LPC & DOB EXPEDITING',
            },
            {
              borough: 'BROOKLYN',
              installs: '890+',
              highlight: 'DUMBO, Williamsburg, Industry City',
              badge: 'CUSTOM METALWORK & NEON',
            },
            {
              borough: 'QUEENS',
              installs: '540+',
              highlight: 'LIC, Astoria, Flushing, JFK Hubs',
              badge: 'LARGE FORMAT PYLONS',
            },
            {
              borough: 'THE BRONX',
              installs: '320+',
              highlight: 'Mott Haven, Arthur Ave, Hunts Pt',
              badge: 'HEAVY INDUSTRIAL ROOF SIGNS',
            },
            {
              borough: 'STATEN ISLAND',
              installs: '210+',
              highlight: 'St. George, SI Mall, Tottenville',
              badge: 'WEATHERPROOF EXTERIORS',
            },
          ].map((stat) => (
            <div
              key={stat.borough}
              onClick={() => setSelectedBorough(stat.borough === 'THE BRONX' ? 'The Bronx' : stat.borough === 'STATEN ISLAND' ? 'Staten Island' : stat.borough.charAt(0) + stat.borough.slice(1).toLowerCase())}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1E56FF';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.4rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: '#1E56FF',
                  }}
                >
                  {stat.borough}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: '#111111',
                  }}
                >
                  {stat.installs}
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#555555', lineHeight: 1.4, margin: '0 0 0.6rem 0' }}>
                {stat.highlight}
              </p>

              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(17, 17, 17, 0.05)',
                  color: '#333333',
                }}
              >
                {stat.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulsePin {
          0% {
            transform: translateX(-50%) scale(0.6);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) scale(2.4);
            opacity: 0;
          }
        }
        @keyframes slideUpPinCard {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
