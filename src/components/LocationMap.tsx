'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { GLOBAL_LOCATIONS } from '../data/billboardData';
import { BillboardLocation } from '../types';

interface LocationMapProps {
  onSelectLocation: (loc: BillboardLocation) => void;
}

export default function LocationMap({ onSelectLocation }: LocationMapProps) {
  const [activeLocation, setActiveLocation] = useState<BillboardLocation>(GLOBAL_LOCATIONS[0]);

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
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '4.5rem' }}>
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
            From high-density retail corridors on Fifth Avenue and SoHo to expansive commercial centers in Brooklyn, Queens, The Bronx, and Staten Island. In-house fabrication with certified field crews.
          </p>
        </div>

        {/* Elegant Light World Map Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '640px',
            borderRadius: '28px',
            backgroundColor: '#FFFFFF',
            border: '2px solid #FFFFFF',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.02)',
            overflow: 'hidden',
          }}
          data-cursor="DISCOVER"
        >
          {/* Subtle Grid & Pale Grey Land Outlines */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.9,
              pointerEvents: 'none',
            }}
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="lightGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(17, 17, 17, 0.04)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lightGrid)" />

            {/* Stylized Pale Grey Continent Outlines */}
            {/* North America */}
            <path
              d="M 120 120 Q 220 100 280 140 Q 320 220 240 260 Q 180 320 160 260 Z"
              fill="#E8E8E2"
              stroke="#D2D2CA"
              strokeWidth="1.5"
            />
            {/* South America */}
            <path
              d="M 260 280 Q 320 310 300 420 Q 250 460 240 360 Z"
              fill="#E8E8E2"
              stroke="#D2D2CA"
              strokeWidth="1.5"
            />
            {/* Europe */}
            <path
              d="M 460 110 Q 550 100 560 170 Q 480 200 450 160 Z"
              fill="#DFE3D8"
              stroke="#D2D2CA"
              strokeWidth="1.5"
            />
            {/* Africa */}
            <path
              d="M 470 210 Q 560 220 540 370 Q 480 390 450 280 Z"
              fill="#E8E8E2"
              stroke="#D2D2CA"
              strokeWidth="1.5"
            />
            {/* Asia */}
            <path
              d="M 570 110 Q 780 90 820 240 Q 670 290 570 190 Z"
              fill="#E8E8E2"
              stroke="#D2D2CA"
              strokeWidth="1.5"
            />
            {/* Australia */}
            <path
              d="M 770 340 Q 860 330 840 430 Q 750 420 770 340 Z"
              fill="#E8E8E2"
              stroke="#D2D2CA"
              strokeWidth="1.5"
            />
          </svg>

          {/* Interactive Location Markers */}
          {GLOBAL_LOCATIONS.map((loc) => {
            const isSelected = activeLocation.id === loc.id;

            return (
              <div
                key={loc.id}
                onClick={() => {
                  setActiveLocation(loc);
                  onSelectLocation(loc);
                }}
                onMouseEnter={() => setActiveLocation(loc)}
                style={{
                  position: 'absolute',
                  top: `${loc.coordinates.y}%`,
                  left: `${loc.coordinates.x}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 30 : 20,
                }}
              >
                {/* Marker Dot with Orange Radar Ping */}
                <div
                  style={{
                    position: 'relative',
                    width: isSelected ? '22px' : '14px',
                    height: isSelected ? '22px' : '14px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#1E56FF' : '#111111',
                    boxShadow: isSelected ? '0 4px 14px rgba(30, 86, 255, 0.4)' : '0 2px 6px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {isSelected && <div className="radar-ping-light" />}
                </div>

                {/* City Tag */}
                <span
                  style={{
                    position: 'absolute',
                    top: '26px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: isSelected ? '#1E56FF' : '#111111',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {loc.city}
                </span>
              </div>
            );
          })}

          {/* Floating White Editorial Card */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              maxWidth: '380px',
              width: 'calc(100% - 48px)',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #1E56FF',
              borderRadius: '20px',
              padding: '1.75rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.04)',
              zIndex: 40,
              animation: 'slideUpCard 0.35s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.85rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#1E56FF',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                  }}
                >
                  {activeLocation.city.toUpperCase()} // {activeLocation.country}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.45rem',
                    color: '#111111',
                    lineHeight: 1.1,
                  }}
                >
                  {activeLocation.name}
                </h3>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(30, 86, 255, 0.1)',
                  color: '#1E56FF',
                  fontWeight: 800,
                }}
              >
                {activeLocation.dimensions}
              </span>
            </div>

            {/* Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                padding: '0.85rem',
                backgroundColor: '#F7F5EF',
                borderRadius: '12px',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#666666' }}>
                  WEEKLY IMPRESSIONS
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#111111' }}>
                  {activeLocation.weeklyImpressions}
                </p>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#666666' }}>
                  SCREEN TYPE
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: '#1E56FF' }}>
                  {activeLocation.screenType}
                </p>
              </div>
            </div>

            {/* Formats Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {activeLocation.availableFormats.map((f) => (
                <span
                  key={f}
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: '#F1F2F2',
                    color: '#333333',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => onSelectLocation(activeLocation)}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              VIEW THIS LOCATION
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUpCard {
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
