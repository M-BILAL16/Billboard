'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const STATS_DATA = [
  { value: '35+', label: 'YEARS IN NYC', sub: 'Serving all five boroughs continuously since 1989' },
  { value: '10,000', label: 'SQ FT FACILITY', sub: 'In-house CNC, laser, welding, channel bending & paint' },
  { value: '50,000+', label: 'SIGNS INSTALLED', sub: 'Storefronts, corporate lobbies & landmark monuments' },
  { value: '24/7', label: 'EMERGENCY SERVICE', sub: 'Rapid repair & maintenance dispatch across NYC' },
  { value: '100%', label: 'DOB COMPLIANT', sub: 'Licensed Master Sign Hanger & permit expediting' },
  { value: 'ONE', label: 'COMPLETE SIGN SHOP', sub: 'From blueprint design to final crane installation' },
];

export default function ImpactStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '5rem' }}>
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
            NEW YORK MANUFACTURING SCALE.
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
            }}
          >
            PROVEN CRAFT. <br />
            <span style={{ color: '#1E56FF' }}>35+ YEARS SERVING NYC.</span>
          </h2>
        </div>

        {/* Editorial Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
          }}
        >
          {STATS_DATA.map((stat, idx) => {
            const isWide = idx === 2 || idx === 5;
            return (
              <div
                key={stat.label}
                style={{
                  gridColumn: isWide ? 'span 8' : 'span 4',
                  padding: '3rem 2.5rem',
                  borderRadius: '24px',
                  backgroundColor: '#F7F5EF',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '260px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${idx * 0.08}s`,
                }}
                className="stat-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1E56FF';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.08)';
                  e.currentTarget.style.backgroundColor = '#F7F5EF';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Number Watermark */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1.75rem',
                    right: '2rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#888888',
                  }}
                >
                  // 0{idx + 1}
                </span>

                {/* Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    color: '#111111',
                    marginBottom: '1rem',
                  }}
                >
                  <span style={{ color: idx === 5 ? '#1E56FF' : '#111111' }}>{stat.value}</span>
                </div>

                {/* Label & Description */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: idx === 5 ? '#1E56FF' : '#111111',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {stat.label}
                  </h3>
                  <p style={{ color: '#666666', fontSize: '0.92rem', lineHeight: 1.4 }}>
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .stat-card {
            grid-column: span 6 !important;
          }
        }
        @media (max-width: 640px) {
          .stat-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
