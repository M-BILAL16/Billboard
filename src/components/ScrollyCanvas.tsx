'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const STAGES = [
  {
    stage: 1,
    title: 'ARCHITECTURAL SITE CAD',
    detail: 'Precision facade measurements, structural load calculations, and electrical schematics prepared for NYC approval.',
  },
  {
    stage: 2,
    title: 'DOB PERMIT EXPEDITING',
    detail: 'Complete submission to NYC Department of Buildings for zoning variance, structural sign-off, and landmark approvals.',
  },
  {
    stage: 3,
    title: 'CNC & LASER FABRICATION',
    detail: 'Aerospace-grade aluminum, brass, stainless steel, and acrylic machined in our 10,000 sq ft facility in NYC.',
  },
  {
    stage: 4,
    title: 'CHANNEL BENDING & LED WIRING',
    detail: 'Automated return flanging, UL-certified high-lumen LED modules, and weather-sealed internal power supplies.',
  },
  {
    stage: 5,
    title: '5-BOROUGH CRANE MOUNTING',
    detail: 'Licensed Master Sign Hangers mount structural anchors with heavy boom trucks and bucket lifts across the city.',
  },
  {
    stage: 6,
    title: 'ILLUMINATED NYC LANDMARK',
    detail: 'Daytime architectural authority and brilliant nighttime halo glow establishing a permanent commercial landmark.',
  },
];

export default function ScrollyCanvas() {
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 3400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        backgroundColor: '#F2ECDD',
        padding: '10rem 0 8rem',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '4.5rem' }}>
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
            THE ANATOMY OF A NEW YORK SIGN.
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
              marginBottom: '1.5rem',
            }}
          >
            CRAFTED IN NYC. <br />
            <span style={{ color: '#1E56FF' }}>BUILT TO LAST.</span>
          </h2>

          <p
            style={{
              color: '#555555',
              fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
              lineHeight: 1.6,
              maxWidth: '680px',
            }}
          >
            From raw sheet metal and computerized laser tables to the highest facade elevations across Manhattan, Brooklyn, Queens, Bronx, and Staten Island.
          </p>
        </div>

        {/* 2-Column Interactive Storyteller */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Stage Buttons & Ending Callout */}
          <div style={{ gridColumn: 'span 5' }} className="scrolly-left-col">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.75rem',
                borderBottom: '1px solid rgba(17, 17, 17, 0.1)',
                paddingBottom: '0.85rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#666666',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                }}
              >
                DAYLIGHT TIMELINE // STAGE 0{currentStage} OF 06
              </span>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  background: isPlaying ? 'rgba(30, 86, 255, 0.12)' : '#FFFFFF',
                  border: isPlaying ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.15)',
                  color: isPlaying ? '#1E56FF' : '#111111',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {isPlaying ? 'PAUSE AUTO' : 'PLAY SEQUENCE ▶'}
              </button>
            </div>

            {/* Stage Selector Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {STAGES.map((s) => {
                const isActive = currentStage === s.stage;
                return (
                  <div
                    key={s.stage}
                    onClick={() => {
                      setCurrentStage(s.stage);
                      setIsPlaying(false);
                    }}
                    data-cursor={`STAGE ${s.stage}`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '0.95rem 1.25rem',
                      borderRadius: '12px',
                      background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                      border: isActive ? '1.5px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                      boxShadow: isActive ? '0 8px 24px rgba(0, 0, 0, 0.06)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 900,
                        color: isActive ? '#1E56FF' : '#888888',
                        minWidth: '24px',
                      }}
                    >
                      0{s.stage}
                    </span>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          color: '#111111',
                          marginBottom: '0.2rem',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {s.title}
                      </h4>
                      {isActive && (
                        <p
                          style={{
                            fontSize: '0.82rem',
                            color: '#555555',
                            lineHeight: 1.45,
                          }}
                        >
                          {s.detail}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ending Callout */}
            <div
              style={{
                borderTop: '1px solid rgba(17, 17, 17, 0.1)',
                paddingTop: '2rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.8rem',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  color: '#111111',
                  marginBottom: '1.25rem',
                }}
              >
                BE SEEN <br />
                <span style={{ color: '#1E56FF' }}>WHERE IT MATTERS.</span>
              </h3>
              <a href="#locations" className="btn-primary" data-cursor="LOCATIONS">
                EXPLORE LOCATIONS
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Daylight Transformation Stage */}
          <div style={{ gridColumn: 'span 7' }} className="scrolly-right-col">
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid #FFFFFF',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
                backgroundColor: '#FFFFFF',
              }}
            >
              {/* STAGE 1: Blank White Billboard in Daylight */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentStage === 1 ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <Image
                  src="/images/street_before.jpg"
                  alt="Blank billboard in bright city street"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#FFFFFF',
                    padding: '0.9rem 1.6rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: '#111111',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                    }}
                  >
                    [ STAGE 01: BLANK URBAN CANVAS ]
                  </span>
                </div>
              </div>

              {/* STAGE 2: Pieces of Artwork Appearing */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentStage === 2 ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <Image
                  src="/images/street_before.jpg"
                  alt="Artwork beginning to appear"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: '15% 35% 42% 43%',
                    border: '2px solid #1E56FF',
                    backgroundColor: 'rgba(30, 86, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(30, 86, 255, 0.3)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: '#1E56FF',
                      fontWeight: 900,
                    }}
                  >
                    LOADING CAMPAIGN...
                  </span>
                </div>
              </div>

              {/* STAGE 3: Artwork Fills the Screen */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentStage === 3 ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <Image
                  src="/images/daylight_hero.jpg"
                  alt="Campaign artwork fills screen"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* STAGE 4: Surrounding City Becomes Active */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentStage === 4 ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <Image
                  src="/images/street_after.jpg"
                  alt="City street active around billboard"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* STAGE 5: Cars and People Moving */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentStage === 5 ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <Image
                  src="/images/daylight_hero.jpg"
                  alt="Pedestrians and traffic moving in sunlight"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* STAGE 6: Another Campaign Rotates Onto Billboard */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentStage === 6 ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <Image
                  src="/images/daylight_arch_vertical.jpg"
                  alt="Rotated new campaign artwork"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Bottom HUD Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  zIndex: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#1E56FF',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#111111',
                    }}
                  >
                    STAGE 0{currentStage}: {STAGES[currentStage - 1].title}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#666666',
                  }}
                >
                  SIGNS NYC CRAFT SIMULATOR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .scrolly-left-col,
          .scrolly-right-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
