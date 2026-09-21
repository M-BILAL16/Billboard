'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown, ArrowDown, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface StatementItem {
  id: number;
  num: string;
  tag: string;
  shortLabel: string;
  line1: string;
  line2: string;
  line3?: string;
  subtext: string;
  isClimax?: boolean;
}

const STATEMENTS: StatementItem[] = [
  {
    id: 1,
    num: '01',
    tag: 'THE VALUE OF PHYSICAL STOREFRONT PRESENCE',
    shortLabel: 'SKIP AN AD',
    line1: 'YOU CAN',
    line2: 'SKIP AN AD.',
    subtext: 'Filtered by ad-blockers. Dismissed in five seconds.',
    isClimax: false,
  },
  {
    id: 2,
    num: '02',
    tag: 'THE VALUE OF PHYSICAL STOREFRONT PRESENCE',
    shortLabel: 'CLOSE A TAB',
    line1: 'YOU CAN',
    line2: 'CLOSE A TAB.',
    subtext: 'Buried under dozens of windows. Closed in a single keystroke.',
    isClimax: false,
  },
  {
    id: 3,
    num: '03',
    tag: 'THE VALUE OF PHYSICAL STOREFRONT PRESENCE',
    shortLabel: 'MUTE A VIDEO',
    line1: 'YOU CAN',
    line2: 'MUTE A VIDEO.',
    subtext: 'Silenced in autoplay. Scrolled past in an endless feed.',
    isClimax: false,
  },
  {
    id: 4,
    num: '04',
    tag: 'THE VALUE OF PHYSICAL STOREFRONT PRESENCE',
    shortLabel: 'REAL SIGN',
    line1: 'BUT YOU',
    line2: 'CAN’T IGNORE',
    line3: 'A REAL SIGN.',
    subtext:
      'Towering over New York streets. In full view of millions 24/7/365. Real presence. Unignorable.',
    isClimax: true,
  },
];

export default function AttentionStatement() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress strictly from 0 to 1
      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      setScrollProgress(progress);

      // Clean 4-step discrete segmentation with generous dwell per step:
      // Step 0: 0.00 to 0.24
      // Step 1: 0.25 to 0.49
      // Step 2: 0.50 to 0.74
      // Step 3: 0.75 to 1.00
      let step = 0;
      if (progress >= 0.75) {
        step = 3;
      } else if (progress >= 0.50) {
        step = 2;
      } else if (progress >= 0.25) {
        step = 1;
      } else {
        step = 0;
      }
      setActiveStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToStep = (targetIndex: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const sectionTop = currentScrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    
    // Centers for each step in scroll distance
    const stepCenters = [0.10, 0.35, 0.60, 0.88];
    const targetY = sectionTop + stepCenters[targetIndex] * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handlePrev = () => {
    const prev = Math.max(0, activeStep - 1);
    scrollToStep(prev);
  };

  const handleNext = () => {
    const next = Math.min(STATEMENTS.length - 1, activeStep + 1);
    scrollToStep(next);
  };

  return (
    <section
      ref={sectionRef}
      id="attention-statement"
      style={{
        position: 'relative',
        height: '260vh',
        backgroundColor: '#F7F5EF',
      }}
    >
      {/* Permanent Static Streetscape Base Layer (Never blank, never empty) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/images/nyc_attention_bg.jpg"
          alt="New York City architectural avenue streetscape"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 42%',
            filter: 'brightness(1) contrast(0.98) saturate(1.05) blur(3px)',
          }}
          priority
        />
        {/* Soft Warm Radial Gradient Wash for Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#ffffffcf',
          }}
        />
      </div>

      {/* Sticky Fullscreen Stage (Pinned 100vh viewport) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {/* Locked Stationary Background Inside Sticky Stage */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Image
            src="/images/nyc_attention_bg.jpg"
            alt="New York City architectural avenue streetscape"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 42%',
              filter: 'brightness(1) contrast(0.98) saturate(1.05) blur(3px)',
              transition: 'filter 0.4s ease',
            }}
            priority
          />

          {/* Frosted Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffffcf',
            }}
          />

          {/* Top & Bottom Seamless Section Blend */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(247, 245, 239, 1) 0%, rgba(247, 245, 239, 0.25) 12%, transparent 28%, transparent 72%, rgba(247, 245, 239, 0.35) 88%, rgba(247, 245, 239, 1) 100%)',
            }}
          />
        </div>

        {/* Top Telemetry & Interactive Step Tabs */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(18px, 3vh, 32px)',
            left: 'clamp(16px, 3.5vw, 40px)',
            right: 'clamp(16px, 3.5vw, 40px)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1240px',
            margin: '0 auto',
            gap: '1rem',
          }}
        >
          {/* Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 0.85vw, 0.74rem)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: '0.45rem 0.9rem',
              borderRadius: '9999px',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: activeStep === 3 ? '#1E56FF' : '#10B981',
                boxShadow: `0 0 10px ${activeStep === 3 ? '#1E56FF' : '#10B981'}`,
                display: 'inline-block',
                transition: 'all 0.3s ease',
              }}
            />
            <span style={{ fontWeight: 800, color: '#111111', letterSpacing: '0.04em' }}>
              THE VALUE OF PHYSICAL STOREFRONT PRESENCE
            </span>
            <span style={{ opacity: 0.35 }}>//</span>
            <span style={{ opacity: 0.7, color: activeStep === 3 ? '#1E56FF' : '#555555', fontWeight: 800 }}>
              0{activeStep + 1} OF 04
            </span>
          </div>

          {/* Interactive Step Switcher (Visible on medium+ screens) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '0.3rem',
              borderRadius: '9999px',
              border: '1px solid rgba(17, 17, 17, 0.08)',
            }}
            className="attention-step-tabs"
          >
            {STATEMENTS.map((item, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToStep(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? (idx === 3 ? '#1E56FF' : '#111111') : 'transparent',
                    color: isActive ? '#FFFFFF' : '#666666',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>0{idx + 1}.</span>
                  <span>{item.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Quick Nav Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={handlePrev}
              disabled={activeStep === 0}
              aria-label="Previous statement"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(17, 17, 17, 0.12)',
                color: activeStep === 0 ? '#CCCCCC' : '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeStep === 0 ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            <button
              onClick={handleNext}
              disabled={activeStep === 3}
              aria-label="Next statement"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: activeStep === 3 ? '#FFFFFF' : '#1E56FF',
                border: activeStep === 3 ? '1px solid rgba(17, 17, 17, 0.12)' : '1px solid #1E56FF',
                color: activeStep === 3 ? '#CCCCCC' : '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeStep === 3 ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Center Stage: Guaranteed Persistent Text Container with Smooth CSS Transitions */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            height: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            pointerEvents: 'none',
          }}
        >
          {STATEMENTS.map((item, idx) => {
            const isActive = idx === activeStep;
            const isPast = idx < activeStep;

            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '92%',
                  maxWidth: '1020px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  // Guaranteed transitions: element is never removed from DOM!
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? 'translate(-50%, -50%) scale(1)'
                    : isPast
                    ? 'translate(-50%, calc(-50% - 28px)) scale(0.96)'
                    : 'translate(-50%, calc(-50% + 28px)) scale(0.96)',
                  transition:
                    'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {/* Chapter Label */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.82rem)',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: item.isClimax ? '#1E56FF' : '#777777',
                    marginBottom: 'clamp(0.6rem, 1.4vh, 1.1rem)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.tag} // {item.num}
                </div>

                {/* Stacked Centered Words - Line 1 */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: item.isClimax
                      ? 'clamp(2.4rem, 5.2vw, 4.4rem)'
                      : 'clamp(2.4rem, 5.8vw, 5rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1.05,
                    textTransform: 'uppercase',
                    color: '#111111',
                    margin: 0,
                    padding: '0 0.5rem',
                    textShadow: '0 2px 24px rgba(255, 255, 255, 0.95)',
                  }}
                >
                  {item.line1}
                </h2>

                {/* Stacked Centered Words - Line 2 */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: item.isClimax
                      ? 'clamp(2.8rem, 6.6vw, 5.4rem)'
                      : 'clamp(2.6rem, 6.4vw, 5.4rem)',
                    letterSpacing: '-0.045em',
                    lineHeight: 1.0,
                    textTransform: 'uppercase',
                    color: item.isClimax ? '#1E56FF' : '#111111',
                    textShadow: item.isClimax
                      ? '0 0 50px rgba(30, 86, 255, 0.35), 0 2px 24px rgba(255, 255, 255, 0.95)'
                      : '0 2px 24px rgba(255, 255, 255, 0.95)',
                    margin: '0.2rem 0 0 0',
                    padding: '0 0.5rem',
                  }}
                >
                  {item.line2}
                </h2>

                {/* Stacked Centered Words - Line 3 (for Climax) */}
                {item.line3 && (
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(2.8rem, 6.8vw, 5.6rem)',
                      letterSpacing: '-0.045em',
                      lineHeight: 1.0,
                      textTransform: 'uppercase',
                      color: '#1E56FF',
                      textShadow: '0 0 50px rgba(30, 86, 255, 0.35), 0 2px 24px rgba(255, 255, 255, 0.95)',
                      margin: '0.2rem 0 0 0',
                      padding: '0 0.5rem',
                    }}
                  >
                    {item.line3}
                  </h2>
                )}

                {/* Italic Supporting Subtext Stacked Underneath */}
                <p
                  style={{
                    marginTop: 'clamp(0.85rem, 1.8vh, 1.4rem)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                    color: '#444444',
                    maxWidth: '640px',
                    lineHeight: 1.38,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    padding: '0 1rem',
                  }}
                >
                  {item.subtext}
                </p>

                {/* Climax Badges on Step 4 */}
                {item.isClimax && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginTop: 'clamp(1rem, 2vh, 1.5rem)',
                      padding: '0 1rem',
                    }}
                  >
                    <span
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(30, 86, 255, 0.08)',
                        border: '1.5px solid rgba(30, 86, 255, 0.3)',
                        color: '#1E56FF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.65rem, 0.88vw, 0.74rem)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ 100% UNBLOCKABLE
                    </span>
                    <span
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid rgba(17, 17, 17, 0.12)',
                        color: '#111111',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.65rem, 0.88vw, 0.74rem)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      }}
                    >
                      ✓ 24/7/365 STREET PRESENCE
                    </span>
                    <span
                      style={{
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        border: '1.5px solid rgba(16, 185, 129, 0.3)',
                        color: '#059669',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.65rem, 0.88vw, 0.74rem)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ DOB-APPROVED LANDMARK
                    </span>
                  </div>
                )}

                {/* Quick Advance Button directly under the statement */}
                <div style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)' }}>
                  {idx < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.1rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        border: '1px solid rgba(17, 17, 17, 0.12)',
                        color: '#111111',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>NEXT STATEMENT</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : (
                    <a
                      href="#spotlight"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.55rem 1.3rem',
                        borderRadius: '9999px',
                        backgroundColor: '#1E56FF',
                        border: '1px solid #1E56FF',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        boxShadow: '0 4px 16px rgba(30, 86, 255, 0.3)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>CONTINUE TO SPOTLIGHT</span>
                      <ArrowDown size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Indicator Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(18px, 3vh, 32px)',
            left: 'clamp(16px, 3.5vw, 40px)',
            right: 'clamp(16px, 3.5vw, 40px)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1240px',
            margin: '0 auto',
          }}
        >
          {/* Scroll Direction / Status Hint */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: activeStep === 3 ? '#1E56FF' : '#666666',
              letterSpacing: '0.06em',
            }}
          >
            {activeStep === 3 ? (
              <>
                <Check size={14} color="#1E56FF" />
                <span>FINAL STATEMENT • SCROLL DOWN FOR NEXT SECTION</span>
              </>
            ) : (
              <>
                <ArrowDown size={14} color="#1E56FF" />
                <span>SCROLL DOWN TO ADVANCE STATEMENTS ({activeStep + 1}/4)</span>
              </>
            )}
          </div>

          {/* Stepper Progress Bar Segments */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {STATEMENTS.map((_, i) => {
              const isPassed = i <= activeStep;
              const isCurrent = i === activeStep;

              return (
                <button
                  key={i}
                  onClick={() => scrollToStep(i)}
                  aria-label={`Jump to statement ${i + 1}`}
                  type="button"
                  style={{
                    width: isCurrent ? '38px' : '22px',
                    height: '6px',
                    borderRadius: '9999px',
                    backgroundColor: isCurrent
                      ? i === 3
                        ? '#1E56FF'
                        : '#111111'
                      : isPassed
                      ? 'rgba(30, 86, 255, 0.4)'
                      : 'rgba(17, 17, 17, 0.16)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 820px) {
          .attention-step-tabs {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
