'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface StatementItem {
  id: number;
  num: string;
  tag: string;
  line1: string;
  line2: string;
  subtext: string;
  isClimax?: boolean;
}

const STATEMENTS: StatementItem[] = [
  {
    id: 1,
    num: '01',
    tag: 'DIGITAL NOISE',
    line1: 'YOU CAN',
    line2: 'SKIP AN AD.',
    subtext: 'Filtered by ad-blockers. Dismissed in five seconds.',
    isClimax: false,
  },
  {
    id: 2,
    num: '02',
    tag: 'DIGITAL NOISE',
    line1: 'YOU CAN',
    line2: 'CLOSE A TAB.',
    subtext: 'Buried under dozens of windows. Closed in a single keystroke.',
    isClimax: false,
  },
  {
    id: 3,
    num: '03',
    tag: 'DIGITAL NOISE',
    line1: 'YOU CAN',
    line2: 'MUTE A VIDEO.',
    subtext: 'Silenced in autoplay. Scrolled past in an endless feed.',
    isClimax: false,
  },
  {
    id: 4,
    num: '04',
    tag: 'PHYSICAL REALITY',
    line1: 'BUT YOU CAN’T',
    line2: 'IGNORE A REAL SIGN.',
    subtext:
      'Towering over New York streets. Commanding millions of eyes 24/7/365. Real presence. Unignorable.',
    isClimax: true,
  },
];

const ZONES = [
  { enter: -0.1, peakStart: 0.0, peakEnd: 0.16, exit: 0.28 }, // Item 0
  { enter: 0.16, peakStart: 0.28, peakEnd: 0.44, exit: 0.56 }, // Item 1
  { enter: 0.44, peakStart: 0.56, peakEnd: 0.72, exit: 0.84 }, // Item 2
  { enter: 0.72, peakStart: 0.84, peakEnd: 1.0, exit: 1.1 }, // Item 3
];

function getItemState(index: number, progress: number) {
  const z = ZONES[index];
  if (progress < z.enter || progress > z.exit) {
    return {
      opacity: 0,
      translateY: progress < z.enter ? 48 : -48,
      scale: 0.97,
      isVisible: false,
    };
  }
  if (progress >= z.peakStart && progress <= z.peakEnd) {
    return {
      opacity: 1,
      translateY: 0,
      scale: 1,
      isVisible: true,
    };
  }
  if (progress < z.peakStart) {
    const ratio = Math.max(0, Math.min(1, (progress - z.enter) / (z.peakStart - z.enter)));
    return {
      opacity: ratio,
      translateY: (1 - ratio) * 48,
      scale: 0.97 + ratio * 0.03,
      isVisible: true,
    };
  } else {
    const ratio = Math.max(0, Math.min(1, (progress - z.peakEnd) / (z.exit - z.peakEnd)));
    return {
      opacity: 1 - ratio,
      translateY: -ratio * 48,
      scale: 1 - ratio * 0.03,
      isVisible: true,
    };
  }
}

export default function AttentionStatement() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(progress);

      // Determine the primary active step
      if (progress < 0.22) setActiveStep(0);
      else if (progress < 0.5) setActiveStep(1);
      else if (progress < 0.78) setActiveStep(2);
      else setActiveStep(3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToStep = (stepIndex: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const sectionTop = currentScrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const centers = [0.08, 0.36, 0.64, 0.92];
    const targetY = sectionTop + centers[stepIndex] * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="attention-statement"
      style={{
        position: 'relative',
        height: '350vh', // Generous scroll runway so transitions feel deliberate and controllable
        backgroundColor: '#FDF7E7',
      }}
    >
      {/* Sticky Fullscreen Stage */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Parallax Background Streetscape Layer */}
        <div
          style={{
            position: 'absolute',
            inset: '-15% -6%',
            width: '112%',
            height: '130%',
            zIndex: 0,
            pointerEvents: 'none',
            transform: `translate3d(0, ${(scrollProgress - 0.5) * -120}px, 0) scale(${1.03 + scrollProgress * 0.04})`,
            transition: 'transform 0.08s ease-out',
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
              filter: `brightness(${0.98 + (activeStep === 3 ? 0.05 : 0)}) contrast(0.96) saturate(1.05)`,
              transition: 'filter 0.5s ease',
            }}
            priority={false}
          />

          {/* Sunlight Atmospheric Gradient Wash for 100% Text Legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(253, 247, 231, 0.88) 0%, rgba(248, 243, 227, 0.94) 55%, rgba(247, 245, 239, 0.99) 85%, rgba(247, 245, 239, 1) 100%)',
            }}
          />

          {/* Seamless Top & Bottom Section Blend */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(247, 245, 239, 1) 0%, rgba(247, 245, 239, 0.3) 12%, transparent 30%, transparent 70%, rgba(247, 245, 239, 0.4) 88%, rgba(247, 245, 239, 1) 100%)',
            }}
          />
        </div>

        {/* Floating Minimal Telemetry Indicator (Top Bar - No Box) */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '32px',
            right: '32px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#333333',
              letterSpacing: '0.04em',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: activeStep === 3 ? '#1E56FF' : '#10B981',
                boxShadow: `0 0 10px ${activeStep === 3 ? 'rgba(30, 86, 255, 0.8)' : 'rgba(16, 185, 129, 0.8)'}`,
                display: 'inline-block',
                transition: 'all 0.3s ease',
              }}
            />
            <span style={{ fontWeight: 800, color: '#111111' }}>
              {activeStep === 3 ? 'PHYSICAL REALITY' : 'DIGITAL NOISE'}
            </span>
            <span style={{ opacity: 0.35 }}>//</span>
            <span style={{ opacity: 0.7 }}>NYC STREET VIEW</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#111111',
              letterSpacing: '0.04em',
            }}
          >
            <span style={{ color: '#1E56FF' }}>0{activeStep + 1}</span>
            <span style={{ opacity: 0.35 }}> / </span>
            <span style={{ opacity: 0.6 }}>04</span>
          </div>
        </div>

        {/* Center Stage: Giant Big Font Typography (No Box) */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            maxWidth: '1200px',
            padding: '0 1.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '420px',
          }}
        >
          {STATEMENTS.map((item, idx) => {
            const state = getItemState(idx, scrollProgress);
            if (!state.isVisible) return null;

            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: state.opacity,
                  transform: `translate3d(0, ${state.translateY}px, 0) scale(${state.scale})`,
                  transition: 'opacity 0.1s linear, transform 0.1s linear',
                  pointerEvents: state.opacity > 0.6 ? 'auto' : 'none',
                }}
              >
                {/* Mini Chapter Label Above */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.72rem, 1.1vw, 0.92rem)',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: item.isClimax ? '#1E56FF' : '#666666',
                    marginBottom: '1.25rem',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.num} // {item.tag}
                </div>

                {/* Giant Headline Typography */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: item.isClimax
                      ? 'clamp(3.4rem, 9.2vw, 8.2rem)'
                      : 'clamp(3.2rem, 8.6vw, 7.6rem)',
                    letterSpacing: '-0.045em',
                    lineHeight: 0.94,
                    textTransform: 'uppercase',
                    color: '#111111',
                    margin: 0,
                    maxWidth: '1150px',
                    textShadow: '0 2px 24px rgba(253, 247, 231, 0.9)',
                  }}
                >
                  {item.line1} <br />
                  <span
                    style={{
                      color: item.isClimax ? '#1E56FF' : '#111111',
                      textShadow: item.isClimax
                        ? '0 0 45px rgba(30, 86, 255, 0.30), 0 2px 24px rgba(253, 247, 231, 0.9)'
                        : undefined,
                    }}
                  >
                    {item.line2}
                  </span>
                </h2>

                {/* Italic Supporting Editorial Subtext */}
                <p
                  style={{
                    marginTop: '2rem',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.2rem, 2vw, 1.7rem)',
                    color: '#555555',
                    maxWidth: '680px',
                    lineHeight: 1.35,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                  }}
                >
                  {item.subtext}
                </p>

                {/* Climax Highlights for Step 4 */}
                {item.isClimax && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      marginTop: '1.75rem',
                    }}
                  >
                    <span
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(30, 86, 255, 0.08)',
                        border: '1px solid rgba(30, 86, 255, 0.25)',
                        color: '#1E56FF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ 100% UNBLOCKABLE
                    </span>
                    <span
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(17, 17, 17, 0.05)',
                        border: '1px solid rgba(17, 17, 17, 0.12)',
                        color: '#111111',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ 24/7 NYC STREET PRESENCE
                    </span>
                    <span
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        color: '#059669',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ DOB-APPROVED LANDMARK
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Minimal Interactive Progress Dots (No Box) */}
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          {STATEMENTS.map((_, i) => {
            const isActive = i === activeStep;
            return (
              <button
                key={i}
                onClick={() => scrollToStep(i)}
                aria-label={`Scroll to statement ${i + 1}`}
                type="button"
                style={{
                  width: isActive ? '36px' : '9px',
                  height: '5px',
                  borderRadius: '3px',
                  backgroundColor: isActive
                    ? i === 3
                      ? '#1E56FF'
                      : '#111111'
                    : 'rgba(17, 17, 17, 0.22)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
