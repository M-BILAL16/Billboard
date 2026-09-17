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
            THE POWER OF PHYSICAL PRESENCE
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
              CAN’T UNSEE
            </span>{' '}
            <br />
            THE CITY.
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
            Outdoor advertising lives in the real world. No feeds. No scroll. No skip button. Just memorable creative
            placed directly in front of real people.
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
                NO SKIP BUTTON.
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666666' }}>
                Commands genuine 100% dwell time
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
                NO AD BLOCKER.
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666666' }}>
                Cannot be muted, minimized or filtered
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
                NO TINY SCREEN.
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#666666' }}>
                Pure architectural scale and shared authority
              </span>
            </div>
          </div>

          {/* Final Line: JUST PRESENCE. */}
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
            JUST <span style={{ color: '#1E56FF' }}>PRESENCE.</span>
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
