'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

const BRAND_LOGOS = [
  { name: 'NIKE', color: '#111111', fontStyle: 'italic font-black' },
  { name: 'ADIDAS', color: '#111111', fontStyle: 'tracking-widest font-extrabold' },
  { name: 'NETFLIX', color: '#E50914', fontStyle: 'tracking-wider font-bold' },
  { name: 'SAMSUNG', color: '#1428A0', fontStyle: 'tracking-widest font-semibold' },
  { name: 'COCA-COLA', color: '#F40000', fontStyle: 'italic font-bold' },
  { name: 'SPOTIFY', color: '#1ED760', fontStyle: 'font-extrabold' },
  { name: 'AMAZON', color: '#FF9900', fontStyle: 'font-semibold tracking-wide' },
  { name: 'APPLE', color: '#111111', fontStyle: 'font-light tracking-widest' },
  { name: 'UBER', color: '#111111', fontStyle: 'font-black tracking-wider' },
  { name: 'PUMA', color: '#1E56FF', fontStyle: 'font-extrabold italic' },
  { name: 'LEGO', color: '#D11013', fontStyle: 'font-black tracking-normal' },
  { name: 'SONY', color: '#111111', fontStyle: 'font-bold tracking-widest' },
];

export default function BrandTrust() {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '7rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#666666',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <Sparkles size={13} color="#1E56FF" />
          TRUSTED BY 50,000+ NYC BUSINESSES & NATIONAL BRANDS
        </div>
      </div>

      {/* Moving Logo Strip */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
        }}
        className="marquee-container"
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '140px',
            height: '100%',
            background: 'linear-gradient(90deg, #FFFFFF, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '140px',
            height: '100%',
            background: 'linear-gradient(270deg, #FFFFFF, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marqueeLeft 28s linear infinite',
          }}
        >
          {[...Array(2)].map((_, loopIdx) => (
            <div
              key={loopIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5rem',
                paddingRight: '5rem',
              }}
            >
              {BRAND_LOGOS.map((brand) => (
                <div
                  key={brand.name}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    color: '#888888',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  className={brand.fontStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = brand.color;
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#888888';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
