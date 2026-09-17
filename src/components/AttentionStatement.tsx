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
      'Towering over New York streets. In full view of millions 24/7/365. Real presence. Unignorable.',
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
      translateY: progress < z.enter ? 32 : -32,
      scale: 0.98,
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
      translateY: (1 - ratio) * 32,
      scale: 0.98 + ratio * 0.02,
      isVisible: true,
    };
  } else {
    const ratio = Math.max(0, Math.min(1, (progress - z.peakEnd) / (z.exit - z.peakEnd)));
    return {
      opacity: 1 - ratio,
      translateY: -ratio * 32,
      scale: 1 - ratio * 0.02,
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
        height: '350vh',
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
            transform: `translate3d(0, ${(scrollProgress - 0.5) * -100}px, 0) scale(${1.03 + scrollProgress * 0.04})`,
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
            top: 'clamp(18px, 3vh, 32px)',
            left: 'clamp(18px, 4vw, 40px)',
            right: 'clamp(18px, 4vw, 40px)',
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
              fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)',
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
              fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)',
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

        {/* Center Stage: Viewbox-Safe Giant Typography (No Box) */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            maxWidth: '1200px',
            height: '100%',
            maxHeight: 'calc(100vh - 140px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 1.5rem',
            boxSizing: 'border-box',
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
                  top: '50%',
                  left: '50%',
                  transform: `translate3d(-50%, calc(-50% + ${state.translateY}px), 0) scale(${state.scale})`,
                  width: '100%',
                  maxWidth: '1100px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  opacity: state.opacity,
                  pointerEvents: state.opacity > 0.6 ? 'auto' : 'none',
                  transition: 'opacity 0.1s linear, transform 0.1s linear',
                  boxSizing: 'border-box',
                }}
              >
                {/* Mini Chapter Label Above */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: item.isClimax ? '#1E56FF' : '#777777',
                    marginBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.num} // {item.tag}
                </div>

                {/* Giant Headline Typography - Scaled to Stay Safely Inside Viewbox */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: item.isClimax
                      ? 'clamp(2.4rem, 6.4vw, 5.6rem)'
                      : 'clamp(2.3rem, 6.0vw, 5.2rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1.02,
                    textTransform: 'uppercase',
                    color: '#111111',
                    margin: 0,
                    padding: '0 0.5rem',
                    textWrap: 'balance',
                    textShadow: '0 2px 24px rgba(253, 247, 231, 0.9)',
                  }}
                >
                  {item.line1} <br />
                  <span
                    style={{
                      color: item.isClimax ? '#1E56FF' : '#111111',
                      textShadow: item.isClimax
                        ? '0 0 35px rgba(30, 86, 255, 0.32), 0 2px 24px rgba(253, 247, 231, 0.9)'
                        : undefined,
                      display: 'inline-block',
                    }}
                  >
                    {item.line2}
                  </span>
                </h2>

                {/* Italic Supporting Editorial Subtext */}
                <p
                  style={{
                    marginTop: 'clamp(1rem, 2vh, 1.75rem)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.05rem, 1.6vw, 1.45rem)',
                    color: '#555555',
                    maxWidth: '650px',
                    lineHeight: 1.35,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    padding: '0 1rem',
                  }}
                >
                  {item.subtext}
                </p>

                {/* Climax Highlights for Step 4 (Viewbox-Safe Padded Tags) */}
                {item.isClimax && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginTop: 'clamp(0.9rem, 1.8vh, 1.4rem)',
                      padding: '0 1rem',
                    }}
                  >
                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(30, 86, 255, 0.08)',
                        border: '1px solid rgba(30, 86, 255, 0.28)',
                        color: '#1E56FF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.62rem, 0.85vw, 0.7rem)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ 100% UNBLOCKABLE
                    </span>
                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(17, 17, 17, 0.05)',
                        border: '1px solid rgba(17, 17, 17, 0.14)',
                        color: '#111111',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.62rem, 0.85vw, 0.7rem)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ✓ 24/7/365 STREET PRESENCE
                    </span>
                    <span
                      style={{
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.28)',
                        color: '#059669',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'clamp(0.62rem, 0.85vw, 0.7rem)',
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
            bottom: 'clamp(20px, 3.5vh, 36px)',
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
                  width: isActive ? '32px' : '8px',
                  height: '5px',
                  borderRadius: '3px',
                  backgroundColor: isActive
                    ? i === 3
                      ? '#1E56FF'
                      : '#111111'
                    : 'rgba(17, 17, 17, 0.20)',
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
    </section>
  );
}
