'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, Eye, CheckCircle2, Play, Pause, Layers } from 'lucide-react';

interface StageInfo {
  step: number;
  stageNumber: string;
  category: string;
  title: string;
  badge: string;
  description: string;
  specs: string[];
  image: string;
  imageAlt: string;
  callouts: { label: string; x: string; y: string }[];
  impactScore: string;
}

const TRANSFORMATION_STAGES: StageInfo[] = [
  {
    step: 0,
    stageNumber: '00',
    category: 'BASE STATE',
    title: 'RAW ARCHITECTURAL FACADE',
    badge: 'STAGE 0: BEFORE ANY SIGNAGE',
    description:
      'A plain SoHo cast-iron storefront with unbranded glass, no exterior illumination, and zero commercial distinction. Foot traffic walks right past without noticing.',
    specs: ['Raw cast-iron facade', 'Clear unbranded windows', 'Zero nighttime illumination', '0% brand recall'],
    image: '/images/storefront_step0.jpg',
    imageAlt: 'Bare NYC corner storefront before any signage is installed',
    callouts: [
      { label: 'EMPTY CORNER FACADE', x: '50%', y: '42%' },
      { label: 'UNBRANDED DISPLAY GLASS', x: '63%', y: '68%' },
    ],
    impactScore: '12% Street Recall',
  },
  {
    step: 1,
    stageNumber: '01',
    category: 'OUTDOOR SIGNS',
    title: '3D CHANNEL LETTERS & BLADE SIGN',
    badge: 'STAGE 1: + EXTERIOR ARCHITECTURAL SIGNS',
    description:
      'We fabricate and anchor high-end 3D halo-lit channel letters above the corner entrance facade, accompanied by a double-sided architectural projecting blade sign for cross-street visibility.',
    specs: [
      'Halo-lit 3D bronze channel letters',
      'High-lumen UL weather-sealed LED modules',
      'Dual-sided architectural blade sign',
      'DOB structural & electrical sign-off',
    ],
    image: '/images/storefront_step1.jpg',
    imageAlt: 'NYC storefront with 3D illuminated channel letters and projecting blade sign installed',
    callouts: [
      { label: 'HALO-LIT 3D LETTERS', x: '49%', y: '44%' },
      { label: 'ILLUMINATED BLADE SIGN', x: '60%', y: '56%' },
    ],
    impactScore: '68% Visibility Boost',
  },
  {
    step: 2,
    stageNumber: '02',
    category: 'WINDOW & DOOR VINYL',
    title: 'FROSTED VINYL & BRANDED GLASS',
    badge: 'STAGE 2: + WINDOW GRAPHICS & DECALS',
    description:
      'We layer precision matte frosted privacy vinyl across ground-floor display glass, custom gold transom typography, and branded entry-door decals displaying hours and heritage.',
    specs: [
      'Etched-glass matte privacy vinyl band',
      'Computer-cut metallic gold lettering',
      'High-performance 3M cast film',
      'Soft diffused interior glow',
    ],
    image: '/images/storefront_step2.jpg',
    imageAlt: 'Storefront with window vinyl frosting, gold lettering and custom door decals applied',
    callouts: [
      { label: 'GOLD TRANSOM DECAL', x: '50%', y: '54%' },
      { label: 'FROSTED PRIVACY FILM', x: '64%', y: '72%' },
    ],
    impactScore: '89% Curb Aesthetic',
  },
  {
    step: 3,
    stageNumber: '03',
    category: 'WRAPS, AWNINGS & FLEET',
    title: 'COMMERCIAL AWNINGS & FLEET WRAP',
    badge: 'STAGE 3: + COMPLETE NYC TRANSFORMATION',
    description:
      'The ultimate transformation: custom black commercial fabric awnings with crisp branded valances, glowing brass facade sconces, and a matching full vehicle wrap on the delivery fleet.',
    specs: [
      'Custom Sunbrella commercial awnings',
      'Exterior brass gooseneck lighting',
      'Full matte vehicle wrap on fleet van',
      '24/7 landmark brand authority',
    ],
    image: '/images/storefront_step3.jpg',
    imageAlt: 'Complete storefront transformation with custom commercial awnings and branded vehicle wrap van',
    callouts: [
      { label: 'CUSTOM FABRIC AWNINGS', x: '35%', y: '54%' },
      { label: 'BRASS FACADE SCONCES', x: '66%', y: '48%' },
      { label: 'FULL FLEET VEHICLE WRAP', x: '75%', y: '74%' },
    ],
    impactScore: '99% Landmark Impact',
  },
];

export default function ScrollyCanvas() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCallouts, setShowCallouts] = useState(true);

  // Auto-play stepper progression
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev >= TRANSFORMATION_STAGES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStage = TRANSFORMATION_STAGES[currentStep];

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        backgroundColor: '#F2ECDD',
        padding: '8rem 0 7rem',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '860px', marginBottom: '3.5rem' }}>
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
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={14} />
            BEFORE &amp; AFTER TRANSFORMATION SIMULATOR
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
              marginBottom: '1.25rem',
            }}
          >
            CRAFTED IN NYC. <br />
            <span style={{ color: '#1E56FF' }}>BUILT TO LAST.</span>
          </h2>

          <p
            style={{
              color: '#555555',
              fontSize: 'clamp(1.05rem, 1.35vw, 1.25rem)',
              lineHeight: 1.6,
              maxWidth: '720px',
            }}
          >
            Watch a raw New York City storefront transform step-by-step. See how layering outdoor 3D architectural signage, precision window vinyl graphics, and commercial awnings elevates foot-traffic appeal into a lasting urban landmark.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            marginBottom: '2.5rem',
          }}
          className="stepper-overview-grid"
        >
          {TRANSFORMATION_STAGES.map((s, idx) => {
            const isCurrent = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            return (
              <button
                key={s.step}
                onClick={() => {
                  setCurrentStep(s.step);
                  setIsPlaying(false);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: isCurrent ? '#111111' : isCompleted ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  border: isCurrent
                    ? '2px solid #1E56FF'
                    : isCompleted
                    ? '1.5px solid rgba(30, 86, 255, 0.4)'
                    : '1.5px solid rgba(17, 17, 17, 0.08)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isCurrent ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: isCurrent ? '#1E56FF' : '#888888',
                      letterSpacing: '0.08em',
                    }}
                  >
                    STEP {s.stageNumber}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 size={13} style={{ color: '#1E56FF' }} />
                  )}
                  {isCurrent && (
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: '#1E56FF',
                        boxShadow: '0 0 10px #1E56FF',
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    color: isCurrent ? '#FFFFFF' : '#111111',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {s.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* 2-Column Interactive Storyteller */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Interactive Stages Accordion */}
          <div style={{ gridColumn: 'span 5' }} className="scrolly-left-col">
            {/* Top Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                borderBottom: '1px solid rgba(17, 17, 17, 0.12)',
                paddingBottom: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={15} color="#1E56FF" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#666666',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                  }}
                >
                  PROGRESSION // STAGE {activeStage.stageNumber} OF 03
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={() => setShowCallouts(!showCallouts)}
                  title="Toggle Visual Hotspots"
                  style={{
                    background: showCallouts ? 'rgba(30, 86, 255, 0.12)' : '#FFFFFF',
                    border: showCallouts ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.15)',
                    color: showCallouts ? '#1E56FF' : '#555555',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Eye size={12} />
                  {showCallouts ? 'HOTSPOTS ON' : 'HOTSPOTS OFF'}
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    background: isPlaying ? '#1E56FF' : '#FFFFFF',
                    border: isPlaying ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.15)',
                    color: isPlaying ? '#FFFFFF' : '#111111',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  {isPlaying ? 'PAUSE AUTO' : 'PLAY SEQUENCE'}
                </button>
              </div>
            </div>

            {/* Stage Selector Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {TRANSFORMATION_STAGES.map((s) => {
                const isActive = currentStep === s.step;
                return (
                  <div
                    key={s.step}
                    onClick={() => {
                      setCurrentStep(s.step);
                      setIsPlaying(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.1rem 1.25rem',
                      borderRadius: '14px',
                      background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                      border: isActive ? '2px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                      boxShadow: isActive ? '0 12px 32px rgba(30, 86, 255, 0.08)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        color: isActive ? '#FFFFFF' : '#888888',
                        backgroundColor: isActive ? '#1E56FF' : 'rgba(17, 17, 17, 0.06)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '0.1rem',
                      }}
                    >
                      {s.stageNumber}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          marginBottom: '0.25rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            color: isActive ? '#1E56FF' : '#888888',
                            textTransform: 'uppercase',
                          }}
                        >
                          {s.category}
                        </span>

                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            color: isActive ? '#111111' : '#888888',
                            backgroundColor: isActive ? 'rgba(30, 86, 255, 0.1)' : 'transparent',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px',
                          }}
                        >
                          {s.impactScore}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '1rem',
                          color: '#111111',
                          marginBottom: isActive ? '0.5rem' : '0',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {s.title}
                      </h4>

                      {isActive && (
                        <div>
                          <p
                            style={{
                              fontSize: '0.84rem',
                              color: '#555555',
                              lineHeight: 1.5,
                              marginBottom: '0.75rem',
                            }}
                          >
                            {s.description}
                          </p>

                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, 1fr)',
                              gap: '0.35rem 0.75rem',
                              borderTop: '1px dashed rgba(17, 17, 17, 0.1)',
                              paddingTop: '0.65rem',
                            }}
                          >
                            {s.specs.map((spec, i) => (
                              <div
                                key={i}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.4rem',
                                  fontSize: '0.74rem',
                                  color: '#333333',
                                  fontFamily: 'var(--font-mono)',
                                }}
                              >
                                <span style={{ color: '#1E56FF', fontWeight: 900 }}>•</span>
                                <span>{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Before / After Jumper */}
            <div
              style={{
                display: 'flex',
                gap: '0.6rem',
                borderTop: '1px solid rgba(17, 17, 17, 0.1)',
                paddingTop: '1.25rem',
              }}
            >
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: currentStep === 0 ? '#111111' : '#FFFFFF',
                  color: currentStep === 0 ? '#FFFFFF' : '#111111',
                  border: '1px solid rgba(17, 17, 17, 0.15)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                }}
              >
                VIEW ORIGINAL (STEP 0)
              </button>

              <button
                onClick={() => {
                  setCurrentStep(3);
                  setIsPlaying(false);
                }}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: currentStep === 3 ? '#1E56FF' : '#FFFFFF',
                  color: currentStep === 3 ? '#FFFFFF' : '#1E56FF',
                  border: '1px solid #1E56FF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s ease',
                }}
              >
                FULL TRANSFORMATION (STEP 3)
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage with Cross-fading Real Storefront Progression */}
          <div style={{ gridColumn: 'span 7' }} className="scrolly-right-col">
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#111111',
              }}
            >
              {/* Image Crossfade Stack */}
              {TRANSFORMATION_STAGES.map((s) => (
                <div
                  key={s.step}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: currentStep === s.step ? 1 : 0,
                    transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: currentStep === s.step ? 'auto' : 'none',
                  }}
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    priority={s.step <= 1}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Hotspot callouts */}
                  {showCallouts &&
                    currentStep === s.step &&
                    s.callouts.map((callout, i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: callout.x,
                          top: callout.y,
                          transform: 'translate(-50%, -50%)',
                          zIndex: 15,
                          animation: 'pulseGlow 2s infinite',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            backgroundColor: 'rgba(17, 17, 17, 0.88)',
                            color: '#FFFFFF',
                            backdropFilter: 'blur(8px)',
                            padding: '0.35rem 0.75rem',
                            borderRadius: '9999px',
                            border: '1.5px solid #1E56FF',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35), 0 0 15px rgba(30, 86, 255, 0.4)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#1E56FF',
                            }}
                          />
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              fontWeight: 800,
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                            }}
                          >
                            {callout.label}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}

              {/* Top-Right Badge: Current Stage Indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 20,
                  backgroundColor: 'rgba(17, 17, 17, 0.88)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: currentStep === 0 ? '#E11D48' : '#1E56FF',
                    boxShadow: currentStep === 0 ? '0 0 8px #E11D48' : '0 0 8px #1E56FF',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                  }}
                >
                  {activeStage.badge}
                </span>
              </div>

              {/* Top-Left Location Watermark */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  zIndex: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: '#111111',
                    letterSpacing: '0.06em',
                  }}
                >
                  PRINCE &amp; GREENE ST, SOHO NYC
                </span>
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
                  padding: '0.75rem 1.25rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  zIndex: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      color: '#1E56FF',
                      backgroundColor: 'rgba(30, 86, 255, 0.1)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    STEP {activeStage.stageNumber}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#111111',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {activeStage.title}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#666666',
                    }}
                    className="simulator-brand-tag"
                  >
                    SIGNS NYC CRAFT SIMULATOR
                  </span>
                  <a
                    href="#categories"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: '#1E56FF',
                      color: '#FFFFFF',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    ORDER THIS SIGN
                    <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Comparison Stats Strip */}
            <div
              style={{
                marginTop: '1.25rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
              }}
              className="comparison-stats-grid"
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#777777',
                    marginBottom: '0.25rem',
                  }}
                >
                  STREET IMPRESSION RATE
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: '#111111',
                  }}
                >
                  {currentStep === 0
                    ? '1,200 / day'
                    : currentStep === 1
                    ? '8,400 / day'
                    : currentStep === 2
                    ? '14,200 / day'
                    : '26,500 / day'}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#777777',
                    marginBottom: '0.25rem',
                  }}
                >
                  NIGHTTIME VISIBILITY
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: currentStep === 0 ? '#888888' : '#1E56FF',
                  }}
                >
                  {currentStep === 0 ? '0% (Dark)' : currentStep === 1 ? 'Halo-Lit' : currentStep === 2 ? 'Warm Ambient' : '24/7 Landmark'}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#777777',
                    marginBottom: '0.25rem',
                  }}
                >
                  CURB VALUE MULTIPLIER
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 900,
                    color: '#111111',
                  }}
                >
                  {currentStep === 0 ? '1.0x (Baseline)' : currentStep === 1 ? '2.4x ROI' : currentStep === 2 ? '3.8x ROI' : '5.2x ROI'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.04);
          }
        }
        @media (max-width: 992px) {
          .scrolly-left-col,
          .scrolly-right-col {
            grid-column: span 12 !important;
          }
          .stepper-overview-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .comparison-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .stepper-overview-grid {
            grid-template-columns: 1fr !important;
          }
          .simulator-brand-tag {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
