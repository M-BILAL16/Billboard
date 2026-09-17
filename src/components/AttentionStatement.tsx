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

function getParallaxItemState(index: number, progress: number) {
  const z = ZONES[index];

  // Outside active window
  if (progress < z.enter || progress > z.exit) {
    return {
      opacity: 0,
      scale: progress < z.enter ? 0.93 : 1.07,
      blur: 8,
      isVisible: false,
    };
  }

  // Steady peak focus (locked dead-center, crisp)
  if (progress >= z.peakStart && progress <= z.peakEnd) {
    return {
      opacity: 1,
      scale: 1,
      blur: 0,
      isVisible: true,
    };
  }

  // Transitioning in from depth
  if (progress < z.peakStart) {
    const ratio = Math.max(0, Math.min(1, (progress - z.enter) / (z.peakStart - z.enter)));
    return {
      opacity: ratio,
      scale: 0.93 + ratio * 0.07,
      blur: (1 - ratio) * 8,
      isVisible: true,
    };
  } else {
    // Transitioning out forward into parallax depth
    const ratio = Math.max(0, Math.min(1, (progress - z.peakEnd) / (z.exit - z.peakEnd)));
    return {
      opacity: 1 - ratio,
      scale: 1.0 + ratio * 0.07,
      blur: ratio * 8,
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

      // Determine active indicator step
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
      {/* Sticky Fullscreen Viewport Stage */}
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

        {/* Top Minimal Telemetry Bar */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(20px, 3.5vh, 36px)',
            left: 'clamp(20px, 4vw, 44px)',
            right: 'clamp(20px, 4vw, 44px)',
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

        {/* Center Stage: Dead-Centered Stacked Words with Parallax Transition */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {STATEMENTS.map((item, idx) => {
            const state = getParallaxItemState(idx, scrollProgress);
            if (!state.isVisible) return null;

            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${state.scale})`,
                  width: '92%',
                  maxWidth: '1050px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  opacity: state.opacity,
                  filter: state.blur > 0 ? `blur(${state.blur.toFixed(1)}px)` : 'none',
                  transition: 'opacity 0.08s linear, filter 0.08s linear, transform 0.08s linear',
                  pointerEvents: state.opacity > 0.6 ? 'auto' : 'none',
                  boxSizing: 'border-box',
                }}
              >
                {/* Chapter Label Stacked on Top */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: item.isClimax ? '#1E56FF' : '#777777',
                    marginBottom: 'clamp(0.75rem, 1.6vh, 1.4rem)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.num} // {item.tag}
                </div>

                {/* Stacked Centered Words - Line 1 */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(2.3rem, 5.6vw, 4.8rem)',
                    letterSpacing: '-0.035em',
                    lineHeight: 1.05,
                    textTransform: 'uppercase',
                    color: '#111111',
                    margin: 0,
                    padding: '0 0.5rem',
                    textShadow: '0 2px 24px rgba(253, 247, 231, 0.9)',
                  }}
                >
                  {item.line1}
                </h2>

                {/* Stacked Centered Words - Line 2 (Hero Statement) */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: item.isClimax
                      ? 'clamp(2.7rem, 6.8vw, 5.8rem)'
                      : 'clamp(2.5rem, 6.2vw, 5.2rem)',
                    letterSpacing: '-0.045em',
                    lineHeight: 1.0,
                    textTransform: 'uppercase',
                    color: item.isClimax ? '#1E56FF' : '#111111',
                    textShadow: item.isClimax
                      ? '0 0 45px rgba(30, 86, 255, 0.35), 0 2px 24px rgba(253, 247, 231, 0.9)'
                      : '0 2px 24px rgba(253, 247, 231, 0.9)',
                    margin: '0.15rem 0 0 0',
                    padding: '0 0.5rem',
                  }}
                >
                  {item.line2}
                </h2>

                {/* Italic Supporting Subtext Stacked Underneath */}
                <p
                  style={{
                    marginTop: 'clamp(1rem, 2.2vh, 1.8rem)',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.45rem)',
                    color: '#555555',
                    maxWidth: '620px',
                    lineHeight: 1.35,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    padding: '0 1rem',
                  }}
                >
                  {item.subtext}
                </p>

                {/* Climax Badges Stacked on Step 4 */}
                {item.isClimax && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginTop: 'clamp(0.9rem, 1.8vh, 1.35rem)',
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

        {/* Bottom Minimal Interactive Progress Dots */}
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
