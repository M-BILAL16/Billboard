'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BILLBOARD_FORMATS } from '../data/billboardData';

interface FormatExplorerProps {
  onSelectFormat?: (formatId: string) => void;
}

export default function FormatExplorer({ onSelectFormat }: FormatExplorerProps) {
  const [activeCardId, setActiveCardId] = useState<string>('city-icons');

  return (
    <section
      id="formats"
      style={{
        position: 'relative',
        backgroundColor: '#F7F5EF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ maxWidth: '850px', marginBottom: '4.5rem' }}>
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
            CUSTOM FABRICATION FORMATS.
          </div>

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
            EVERY STOREFRONT <br />
            DESERVES THE <br />
            <span style={{ color: '#1E56FF' }}>RIGHT LANDMARK.</span>
          </h2>

          <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '640px', lineHeight: 1.6 }}>
            From precision front-lit & halo channel letters and architectural corporate lobbies to DOB-permitted awnings and heavy-duty building wraps. Expand each format to view engineered specs, materials, and lead times.
          </p>
        </div>

        {/* Interactive Accordion Expanding Cards Row */}
        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            minHeight: '660px',
            width: '100%',
          }}
          className="format-cards-container"
        >
          {BILLBOARD_FORMATS.map((format) => {
            const isExpanded = activeCardId === format.id;

            return (
              <div
                key={format.id}
                onMouseEnter={() => setActiveCardId(format.id)}
                onClick={() => {
                  setActiveCardId(format.id);
                  if (onSelectFormat) onSelectFormat(format.id);
                }}
                data-cursor={isExpanded ? 'ACTIVE STAGE' : 'EXPAND'}
                style={{
                  position: 'relative',
                  flex: isExpanded ? '3.5' : '1',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isExpanded ? '2px solid #1E56FF' : '1.5px solid rgba(17, 17, 17, 0.08)',
                  boxShadow: isExpanded
                    ? '0 25px 60px rgba(30, 86, 255, 0.16), 0 8px 24px rgba(0, 0, 0, 0.06)'
                    : '0 6px 20px rgba(0, 0, 0, 0.03)',
                  transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s ease, box-shadow 0.3s ease',
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
                    src={format.image}
                    alt={format.title}
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
                  {/* Subtle Light Gradient Overlay for Maximum Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isExpanded
                        ? 'linear-gradient(180deg, rgba(247, 245, 239, 0.3) 0%, rgba(247, 245, 239, 0) 35%, rgba(0, 0, 0, 0.35) 100%)'
                        : 'linear-gradient(180deg, rgba(247, 245, 239, 0.4) 0%, rgba(0, 0, 0, 0.45) 100%)',
                      transition: 'background 0.4s ease',
                    }}
                  />
                </div>

                {/* Card Top: Number & Category Badge */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: isExpanded ? '#1E56FF' : '#111111',
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(12px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      transition: 'color 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    0{format.number}
                  </span>

                  <span
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      backgroundColor: isExpanded ? '#1E56FF' : 'rgba(255, 255, 255, 0.94)',
                      color: isExpanded ? '#FFFFFF' : '#111111',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {format.badge}
                  </span>
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
                        {format.title}
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
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: '#1E56FF',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          marginBottom: '0.35rem',
                        }}
                      >
                        <span>STAGE 0{format.number}</span>
                        <span>•</span>
                        <span>{format.tagline}</span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                          lineHeight: 1.02,
                          letterSpacing: '-0.03em',
                          textTransform: 'uppercase',
                          color: '#111111',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {format.title}
                      </h3>

                      <p
                        style={{
                          color: '#555555',
                          fontSize: '0.95rem',
                          lineHeight: 1.55,
                          marginBottom: '1.5rem',
                          maxWidth: '560px',
                        }}
                      >
                        {format.description}
                      </p>

                      {/* Specs 4-Box Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.75rem',
                          padding: '1rem',
                          borderRadius: '14px',
                          backgroundColor: '#F7F5EF',
                          border: '1px solid rgba(17, 17, 17, 0.06)',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            AUDIENCE
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#111111' }}>
                            {format.specs.audience}
                          </span>
                        </div>

                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            LOCATION TYPE
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#111111' }}>
                            {format.specs.locationType}
                          </span>
                        </div>

                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            FORMAT
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E56FF' }}>
                            {format.specs.format}
                          </span>
                        </div>

                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            ESTIMATED REACH
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#111111' }}>
                            {format.specs.estimatedReach}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <a
                          href="#planner"
                          className="btn-primary"
                          style={{
                            padding: '0.8rem 1.8rem',
                            fontSize: '0.84rem',
                            gap: '0.6rem',
                          }}
                        >
                          {format.ctaText}
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </a>
                      </div>
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
        @media (max-width: 992px) {
          .format-cards-container {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .format-card {
            min-height: 420px !important;
            flex: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
