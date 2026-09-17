'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Quote, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 'marcus',
    quote: 'Signs NYC handled our entire SoHo flagship package from complex landmark DOB permits to precision halo channel letters. Having a real 10,000 sq ft NYC fabrication shop behind our project made all the difference.',
    name: 'MARCUS VANCE',
    role: 'VP OF RETAIL DEVELOPMENT',
    company: 'SOHO LUXURY GROUP',
    image: '/images/daylight_hero.jpg',
  },
  {
    id: 'elena',
    quote: 'When an unexpected storm damaged our restaurant canopy in Midtown at 9 PM, Signs NYC had emergency crews on-site within hours. Their 24/7 service and fabrication quality are unmatched in the five boroughs.',
    name: 'ELENA ROSTOVA',
    role: 'OPERATIONS DIRECTOR',
    company: 'METRO HOSPITALITY NYC',
    image: '/images/daylight_arch_vertical.jpg',
  },
];

export default function TestimonialSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = TESTIMONIALS[activeIdx];

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#F7F5EF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.04)',
            padding: 'clamp(2.5rem, 5vw, 5rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            alignItems: 'center',
          }}
          className="testimonial-grid"
        >
          {/* Left Column: Quote & Graphic Mark */}
          <div style={{ gridColumn: 'span 7' }}>
            {/* Large Graphic Quotation Mark */}
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '5.5rem',
                lineHeight: 0.8,
                color: '#1E56FF',
                marginBottom: '1.5rem',
              }}
            >
              “
            </div>

            {/* Editorial Quote */}
            <blockquote
              key={current.id}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)',
                lineHeight: 1.3,
                color: '#111111',
                marginBottom: '2.5rem',
                animation: 'fadeQuote 0.35s ease',
              }}
            >
              {current.quote}
            </blockquote>

            {/* Author */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#111111',
                }}
              >
                {current.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: '#1E56FF',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginTop: '0.2rem',
                }}
              >
                {current.role} // {current.company}
              </p>
            </div>

            {/* Speaker Switch Tabs */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem' }}>
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    backgroundColor: idx === activeIdx ? '#111111' : '#F7F5EF',
                    border: '1px solid rgba(17, 17, 17, 0.1)',
                    color: idx === activeIdx ? '#FFFFFF' : '#111111',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {t.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Large Campaign Photography */}
          <div
            style={{
              gridColumn: 'span 5',
              position: 'relative',
              aspectRatio: '4 / 5',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
            }}
            className="testimonial-img-col"
          >
            <Image
              src={current.image}
              alt={current.name}
              fill
              sizes="500px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeQuote {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 992px) {
          .testimonial-grid > div {
            grid-column: span 12 !important;
          }
          .testimonial-img-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
