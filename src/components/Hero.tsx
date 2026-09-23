'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenCampaignModal: () => void;
}

export default function Hero({ onOpenCampaignModal }: HeroProps) {

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '90vh',
        width: '100%',
        backgroundColor: '#F7F5EF',
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      className="paper-texture"
    >
      {/* Subtle Architectural Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(17, 17, 17, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 17, 17, 0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Asymmetrical Editorial Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Massive Confident Headline & Typography */}
          <div style={{ gridColumn: 'span 6' }} className="hero-typography-col">

            {/* Massive Architectural Headline (Concept 1) */}
            <h1
              className="hero-headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.2rem, 5.8vw, 4.8rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#111111',
                marginBottom: '1.75rem',
              }}
            >
              WE DON’T JUST <br />
              <span style={{ color: '#888888', fontWeight: 800 }}>MAKE SIGNS.</span> <br />
              WE BUILD <br />
              <span
                className="hero-landmarks"
                style={{
                  color: '#1E56FF',
                  position: 'relative',
                  display: 'inline-block',
                  lineHeight: 1,
                }}
              >
                NYC LANDMARKS.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                color: '#444444',
                fontSize: 'clamp(1.02rem, 1.2vw, 1.18rem)',
                maxWidth: '560px',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
              }}
            >
              From illuminated storefront channel letters and architectural metalwork to corporate lobby branding
              and fleet graphics.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={onOpenCampaignModal}
                className="btn-primary"
                data-cursor="QUOTE"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                REQUEST A FREE QUOTE
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>

              <a
                href="#before-after"
                className="btn-secondary"
                data-cursor="GALLERY"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                EXPLORE OUR WORK (GALLERY)
              </a>
            </div>
          </div>

          {/* Right Column: Large Architectural Showcase & Interactive Sign Mockup */}
          <div style={{ gridColumn: 'span 6', position: 'relative' }} className="hero-collage-col">
            {/* Main Architectural Video Showcase Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)',
                border: '1.5px solid #FFFFFF',
                backgroundColor: '#0F172A',
              }}
            >
              <video
                src="/videos/video2.mp4"
                poster="/images/video2_thumb.jpg"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* DEDICATED COUNTER SUB-SECTION (ARCHITECTURAL METRICS DOCK) */}
        {/* ============================================================ */}
        <div
          className="hero-counter-dock"
          style={{
            marginTop: '3.75rem',
            padding: '1.85rem 2.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(26px)',
            WebkitBackdropFilter: 'blur(26px)',
            borderRadius: '24px',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            boxShadow: '0 18px 45px -10px rgba(0, 0, 0, 0.06), 0 4px 14px rgba(0, 0, 0, 0.02)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.75rem',
            position: 'relative',
          }}
        >
          {/* Counter 01 */}
          <div className="counter-card" style={{ position: 'relative', paddingRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                35+
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                YEARS
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              SERVING NYC SINCE 1989
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              Licensed & Insured in All 5 Boroughs
            </div>
          </div>

          {/* Counter 02 */}
          <div
            className="counter-card"
            style={{
              position: 'relative',
              paddingRight: '1rem',
              borderLeft: '1px solid rgba(17, 17, 17, 0.08)',
              paddingLeft: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                10,000
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                SQ FT
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              FABRICATION FACILITY
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              CNC • Laser • Welding • Bending
            </div>
          </div>

          {/* Counter 03 */}
          <div
            className="counter-card"
            style={{
              position: 'relative',
              paddingRight: '1rem',
              borderLeft: '1px solid rgba(17, 17, 17, 0.08)',
              paddingLeft: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                100%
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                PERMIT READY
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              DOB PERMIT EXPEDITING
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              3M Certified Professional Installers
            </div>
          </div>

          {/* Counter 04 */}
          <div
            className="counter-card"
            style={{
              position: 'relative',
              borderLeft: '1px solid rgba(17, 17, 17, 0.08)',
              paddingLeft: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                24/7
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                EMERGENCY
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              EMERGENCY SIGN SERVICE
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              After-Hours & Rapid Upkeep
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (max-width: 1080px) {
          .hero-counter-dock {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
            padding: 1.5rem !important;
          }
          .counter-card {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
        @media (max-width: 992px) {
          .hero-typography-col,
          .hero-collage-col {
            grid-column: span 12 !important;
          }
          .hero-typography-col {
            margin-bottom: 2rem;
          }
        }
        @media (max-width: 600px) {
          .hero-counter-dock {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
