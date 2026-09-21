'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function IntroSection() {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#fffef9',
        padding: '9rem 0 6rem',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'visible',
      }}
    >
      <div className="container-custom">
        {/* Top Tag */}
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
          NEW YORK’S SIGN MAKERS SINCE 1989.
        </div>

        {/* 2-Column Spacious Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '4.5rem',
          }}
        >
          {/* Left: Large Architectural Headline */}
          <div style={{ gridColumn: 'span 7' }} className="intro-left-col">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#111111',
              }}
            >
              DIGITAL ADS <br />
              <span style={{ color: '#888888', fontWeight: 800 }}>GET IGNORED.</span> <br />
              REAL SIGNS <br />
              <span style={{ color: '#1E56FF' }}>STAND OUT.</span>
            </h2>
          </div>

          {/* Right: Editorial Paragraph + CTA */}
          <div
            style={{
              gridColumn: 'span 5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '1rem',
            }}
            className="intro-right-col"
          >
            <p
              style={{
                color: '#444444',
                fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)',
                lineHeight: 1.65,
                marginBottom: '2.5rem',
              }}
            >
              Signs NYC creates real-world architectural authority. From Manhattan flagships and corporate lobbies to industrial parks and retail facades across all five boroughs, we build signs that make your business impossible to miss.
            </p>

            <div>
              <a
                href="#locations"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: '#111111',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '2px solid #1E56FF',
                  paddingBottom: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}
                data-cursor="BOROUGHS"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1E56FF';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                EXPLORE 5-BOROUGH PROJECTS
                <ArrowRight size={17} strokeWidth={2.5} color="#1E56FF" />
              </a>
            </div>
          </div>
        </div>

        {/* Large Overlapping Vertical Architectural Billboard Photograph */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1080px',
            margin: '0 auto',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.1)',
            border: '2px solid #FFFFFF',
            aspectRatio: '16 / 9',
            marginBottom: '-4rem',
            zIndex: 15,
          }}
          data-cursor="VIEW ARCHITECTURE"
        >
          <Image
            src="/images/intro_real_signs.jpg"
            alt="Custom illuminated luxury storefront architectural sign on Manhattan avenue"
            fill
            sizes="(max-width: 1200px) 100vw, 1080px"
            style={{ objectFit: 'cover' }}
            priority
          />

          {/* Floating Editorial Corner Tag */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#111111',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          >
            IN-HOUSE FABRICATION // 10,000 SQ FT FACILITY
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .intro-left-col,
          .intro-right-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
