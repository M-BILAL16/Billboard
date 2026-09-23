'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface IndustryItem {
  id: string;
  title: string;
  image: string;
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  { id: 'retail', title: 'RETAIL', image: '/images/ind_retail.jpg' },
  { id: 'restaurants', title: 'RESTAURANTS', image: '/images/ind_restaurant.jpg' },
  { id: 'museums', title: 'MUSEUMS', image: '/images/ind_museum.jpg' },
  { id: 'property', title: 'PROPERTY', image: '/images/ind_property.jpg' },
  { id: 'education', title: 'EDUCATION', image: '/images/ind_education.jpg' },
  { id: 'religious', title: 'RELIGIOUS', image: '/images/ind_religious.jpg' },
  { id: 'charity', title: 'CHARITY', image: '/images/ind_charity.jpg' },
  { id: 'political', title: 'POLITICAL', image: '/images/ind_political.jpg' },
  { id: 'government', title: 'GOVERNMENT', image: '/images/ind_government.jpg' },
  { id: 'healthcare', title: 'HEALTHCARE', image: '/images/ind_healthcare.jpg' },
  { id: 'convention', title: 'CONVENTION', image: '/images/ind_convention.jpg' },
  { id: 'arenas', title: 'ARENAS', image: '/images/ind_arenas.jpg' },
  { id: 'transportation', title: 'TRANSPORTATION', image: '/images/ind_transportation.jpg' },
  { id: 'contractors', title: 'CONTRACTORS', image: '/images/ind_contractors.jpg' },
  { id: 'pop-up-store', title: 'POP-UP STORE', image: '/images/ind_popup.jpg' },
];

interface FormatExplorerProps {
  onSelectFormat?: (industryId: string) => void;
}

export default function FormatExplorer({ onSelectFormat }: FormatExplorerProps) {
  const [activeCardId, setActiveCardId] = useState<string>('retail');
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentIndex = INDUSTRIES_DATA.findIndex((ind) => ind.id === activeCardId);

  const handleSelectCard = (id: string, scroll = true) => {
    setActiveCardId(id);
    if (onSelectFormat) onSelectFormat(id);

    if (scroll && cardRefs.current[id]) {
      cardRefs.current[id]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + INDUSTRIES_DATA.length) % INDUSTRIES_DATA.length;
    handleSelectCard(INDUSTRIES_DATA[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % INDUSTRIES_DATA.length;
    handleSelectCard(INDUSTRIES_DATA[nextIndex].id);
  };

  return (
    <section
      id="industries"
      style={{
        position: 'relative',
        backgroundColor: '#F7F5EF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Target anchor for legacy #formats links */}
      <div id="formats" style={{ position: 'absolute', top: 0, left: 0 }} />

      <div className="container-custom">
        {/* Section Header & Slider Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3.5rem',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#111111',
                marginBottom: '1.5rem',
              }}
            >
              EVERY INDUSTRY <br />
              DESERVES THE <br />
              <span style={{ color: '#1E56FF' }}>RIGHT LANDMARK.</span>
            </h2>

            <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '680px', lineHeight: 1.6 }}>
              From high-traffic retail storefronts and Michelin-starred dining facades to DOB-permitted construction safety signs, campus wayfinding, and corporate lobby branding. Explore tailored signage solutions engineered for your industry.
            </p>
          </div>

          {/* Slider Controls & Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingBottom: '0.5rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#666666',
                letterSpacing: '0.08em',
                backgroundColor: '#FFFFFF',
                padding: '0.65rem 1.1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(17, 17, 17, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
              }}
            >
              <span style={{ color: '#1E56FF' }}>
                {String(currentIndex + 1).padStart(2, '0')}
              </span>{' '}
              / {String(INDUSTRIES_DATA.length).padStart(2, '0')}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Industry"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(17, 17, 17, 0.12)',
                  color: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E56FF';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#1E56FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.12)';
                }}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Industry"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(17, 17, 17, 0.12)',
                  color: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E56FF';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#1E56FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.12)';
                }}
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Accordion Expanding Cards Slider Row */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            minHeight: '660px',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingBottom: '1.5rem',
            paddingTop: '0.5rem',
            scrollBehavior: 'smooth',
          }}
          className="format-cards-container no-scrollbar"
        >
          {INDUSTRIES_DATA.map((ind) => {
            const isExpanded = activeCardId === ind.id;

            return (
              <div
                key={ind.id}
                ref={(el) => {
                  cardRefs.current[ind.id] = el;
                }}
                onMouseEnter={() => handleSelectCard(ind.id, false)}
                onClick={() => handleSelectCard(ind.id, true)}
                data-cursor={isExpanded ? 'ACTIVE INDUSTRY' : 'EXPAND'}
                style={{
                  position: 'relative',
                  flex: isExpanded
                    ? '0 0 clamp(540px, 46vw, 680px)'
                    : '0 0 clamp(160px, 12.5vw, 195px)',
                  minWidth: isExpanded ? 'clamp(540px, 46vw, 680px)' : 'clamp(160px, 12.5vw, 195px)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isExpanded ? '2px solid #1E56FF' : '1.5px solid rgba(17, 17, 17, 0.08)',
                  boxShadow: isExpanded
                    ? '0 25px 60px rgba(30, 86, 255, 0.16), 0 8px 24px rgba(0, 0, 0, 0.06)'
                    : '0 6px 20px rgba(0, 0, 0, 0.03)',
                  transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.6s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.75rem',
                }}
                className="format-card"
              >
                {/* Background Image Layer */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    transform: isExpanded ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: 'cover',
                      filter: isExpanded
                        ? 'brightness(0.96) contrast(1.05)'
                        : 'brightness(0.82) saturate(0.85)',
                      transition: 'filter 0.5s ease',
                    }}
                  />
                  {/* Subtle Gradient Overlay for High Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isExpanded
                        ? 'linear-gradient(180deg, rgba(247, 245, 239, 0.25) 0%, rgba(247, 245, 239, 0) 30%, rgba(0, 0, 0, 0.45) 100%)'
                        : 'linear-gradient(180deg, rgba(247, 245, 239, 0.35) 0%, rgba(0, 0, 0, 0.5) 100%)',
                      transition: 'background 0.4s ease',
                    }}
                  />
                </div>

                {/* Card Bottom: Collapsed Preview vs Expanded Full Content */}
                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
                  {!isExpanded ? (
                    /* Collapsed Title Capsule */
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        textAlign: 'center',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: '1rem',
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                          textTransform: 'uppercase',
                          color: '#111111',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ind.title}
                      </h3>
                    </div>
                  ) : (
                    /* Expanded Editorial Details Card */
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.96)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: 'clamp(1.25rem, 2vw, 2rem)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
                        border: '1.5px solid rgba(255, 255, 255, 0.9)',
                        animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                          lineHeight: 1.02,
                          letterSpacing: '-0.03em',
                          textTransform: 'uppercase',
                          color: '#111111',
                          margin: 0,
                        }}
                      >
                        {ind.title}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          .format-card {
            min-height: 520px !important;
          }
        }
      `}</style>
    </section>
  );
}
