'use client';

import React from 'react';
import { Sparkles, Eye, ShieldX, Smartphone } from 'lucide-react';

export default function WhyOutdoor() {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#F7F5EF', // Bright off-white
        padding: '10rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        <div style={{ maxWidth: '1050px', margin: '0 auto', textAlign: 'center' }}>
          {/* Small Label */}
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
              marginBottom: '2rem',
            }}
          >
            <Sparkles size={14} />
            THE VALUE OF PHYSICAL STOREFRONT PRESENCE
          </div>

          {/* Main Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
              marginBottom: '2.5rem',
            }}
          >
            YOU CAN <br />
            <span style={{ color: '#888888' }}>SKIP AN AD.</span> <br />
            YOU CAN <br />
            <span style={{ color: '#888888' }}>CLOSE A TAB.</span> <br />
            YOU CAN <br />
            <span style={{ color: '#888888' }}>MUTE A VIDEO.</span> <br />
            BUT YOU <br />
            <span
              style={{
                color: '#1E56FF',
                textDecoration: 'underline',
                textDecorationColor: '#1E56FF',
                textUnderlineOffset: '8px',
              }}
            >
              CAN’T IGNORE
            </span>{' '}
            <br />
            A REAL SIGN.
          </h2>

          {/* Supporting Copy */}
          <p
            style={{
              color: '#555555',
              fontSize: 'clamp(1.15rem, 1.5vw, 1.45rem)',
              lineHeight: 1.6,
              maxWidth: '760px',
              margin: '0 auto 4.5rem',
            }}
          >
            Commercial signage lives in the physical world. Built in-house in New York with aerospace-grade metals, UL-certified LEDs, and precision craftsmanship that welcomes footfall 24/7/365.
          </p>

          {/* Three Large Statements */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginBottom: '3.5rem',
            }}
            className="manifesto-grid"
          >
            <div
              style={{
                padding: '3rem 1.5rem',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Smartphone size={32} color="#1E56FF" />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#111111',
                  letterSpacing: '-0.02em',
                }}
              >
                35+ YEARS IN NYC.
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666666' }}>
                Serving all five boroughs since 1989
              </span>
            </div>

            <div
              style={{
                padding: '3rem 1.5rem',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <ShieldX size={32} color="#2457FF" />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#111111',
                  letterSpacing: '-0.02em',
                }}
              >
                100% DOB PERMITS.
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666666' }}>
                Full code expediting & licensed install
              </span>
            </div>

            <div
              style={{
                padding: '3rem 1.5rem',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Eye size={32} color="#1E56FF" />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#111111',
                  letterSpacing: '-0.02em',
                }}
              >
                10,000 SQ FT SHOP.
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666666' }}>
                CNC • Laser • Welding • Channel Bending
              </span>
            </div>
          </div>

          {/* Final Line: JUST CRAFTSMANSHIP. */}
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
            }}
          >
            JUST REAL <span style={{ color: '#1E56FF' }}>CRAFTSMANSHIP.</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .manifesto-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
