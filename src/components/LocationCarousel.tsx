'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { GLOBAL_LOCATIONS } from '../data/billboardData';
import { BillboardLocation } from '../types';

interface LocationCarouselProps {
  onSelectLocation: (loc: BillboardLocation) => void;
}

export default function LocationCarousel({ onSelectLocation }: LocationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = 420;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  const showcaseLocations = GLOBAL_LOCATIONS.slice(0, 5);

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header & Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
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
              BOROUGH INSTALLATION SHOWCASE
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
              }}
            >
              SIGNS <br />
              <span style={{ color: '#1E56FF' }}>NEW YORK REMEMBERS.</span>
            </h2>
          </div>

          {/* Prev / Next Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#F7F5EF',
                border: '1px solid rgba(17, 17, 17, 0.1)',
                color: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1E56FF')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.1)')}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#1E56FF',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: '2rem',
            overflowX: 'auto',
            paddingBottom: '2.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {showcaseLocations.map((loc, idx) => (
            <div
              key={loc.id}
              onClick={() => onSelectLocation(loc)}
              data-cursor="VIEW"
              style={{
                flex: '0 0 400px',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '3 / 4',
                backgroundColor: '#F7F5EF',
                border: '1.5px solid rgba(17, 17, 17, 0.08)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="location-card"
            >
              {/* Photo with Smooth Zoom */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="loc-img-wrapper"
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="450px"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(17, 17, 17, 0.85) 100%)',
                  }}
                />
              </div>

              {/* Card Content Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 2,
                }}
              >
                {/* Top Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      backgroundColor: '#1E56FF',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                    }}
                  >
                    LOCATION 0{idx + 1}
                  </span>

                  <span
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      color: '#111111',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                    }}
                  >
                    {loc.city.toUpperCase()}
                  </span>
                </div>

                {/* Bottom Details */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.9rem',
                      color: '#FFFFFF',
                      lineHeight: 1.05,
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {loc.name}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: '#E0E0E0',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <span>{loc.screenType}</span>
                    <span>•</span>
                    <span style={{ color: '#FFD43B', fontWeight: 800 }}>
                      {loc.weeklyImpressions} Weekly
                    </span>
                  </div>

                  {/* Reveal Button */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '0.88rem',
                      color: '#FFFFFF',
                      borderBottom: '2px solid #1E56FF',
                      paddingBottom: '2px',
                    }}
                  >
                    VIEW LOCATION
                    <ArrowUpRight size={16} strokeWidth={2.5} color="#1E56FF" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .location-card:hover {
          border-color: #1E56FF !important;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12) !important;
        }
        .location-card:hover .loc-img-wrapper {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
