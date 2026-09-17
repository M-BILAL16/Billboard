'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SkipForward, XCircle, VolumeX, Sparkles, ArrowDown } from 'lucide-react';

interface StatementItem {
  id: number;
  num: string;
  category: string;
  badge: string;
  headline: string;
  highlightText?: string;
  subtext: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  pillAction: string;
  isClimax?: boolean;
}

const STATEMENTS: StatementItem[] = [
  {
    id: 1,
    num: '01',
    category: 'DIGITAL ADVERTISING',
    badge: 'ONLINE AD',
    headline: 'YOU CAN SKIP AN AD.',
    subtext: 'Filtered by ad-blockers, skipped in 5 seconds, forgotten instantly.',
    icon: SkipForward,
    pillAction: '5S SKIP ›|',
  },
  {
    id: 2,
    num: '02',
    category: 'BROWSER OVERLOAD',
    badge: 'WEB TAB',
    headline: 'YOU CAN CLOSE A TAB.',
    subtext: 'Buried under 30 open tabs and closed with a single keystroke.',
    icon: XCircle,
    pillAction: '⌘W CLOSE',
  },
  {
    id: 3,
    num: '03',
    category: 'SOCIAL FEEDS',
    badge: 'MUTED VIDEO',
    headline: 'YOU CAN MUTE A VIDEO.',
    subtext: 'Silenced in autoplay and scrolled past without a second glance.',
    icon: VolumeX,
    pillAction: 'MUTED ✕',
  },
  {
    id: 4,
    num: '04',
    category: 'PHYSICAL REALITY',
    badge: 'NYC LANDMARK',
    headline: 'BUT YOU CAN’T',
    highlightText: 'IGNORE A REAL SIGN.',
    subtext:
      'Standing tall above New York streets. In full view of millions 24/7/365. Real metal, bright illumination, permanent impact.',
    icon: Sparkles,
    pillAction: '100% UNBLOCKABLE ✦',
    isClimax: true,
  },
];

export default function AttentionStatement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = scrolled / totalScrollable;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      setScrollProgress(clampedProgress);

      // Distribute evenly across the 4 statements
      const index = Math.min(3, Math.max(0, Math.floor(clampedProgress * 4)));
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (stepIndex: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const sectionTop = currentScrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetY = sectionTop + (stepIndex + 0.5) * (totalScrollable / 4);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="attention-statement"
      style={{
        position: 'relative',
        height: '320vh', // Generous scroll runway for deliberate, smooth pacing
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        {/* Parallax Background Streetscape */}
        <div
          style={{
            position: 'absolute',
            inset: '-12% -6%',
            width: '112%',
            height: '124%',
            zIndex: 0,
            pointerEvents: 'none',
            transform: `translate3d(0, ${(scrollProgress - 0.5) * -110}px, 0) scale(${1.03 + scrollProgress * 0.05})`,
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
              objectPosition: 'center 40%',
              filter: `brightness(${0.98 + (activeIndex === 3 ? 0.06 : 0)}) contrast(0.96) saturate(1.05)`,
              transition: 'filter 0.5s ease',
            }}
            priority={false}
          />

          {/* Sunlight Atmospheric Veil */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(253, 247, 231, 0.85) 0%, rgba(248, 243, 227, 0.92) 55%, rgba(247, 245, 239, 0.98) 100%)',
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

        {/* Top Telemetry Header Bar */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            right: '24px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            pointerEvents: 'none',
          }}
        >
          {/* Location Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: '#333333',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: activeIndex === 3 ? '#1E56FF' : '#10B981',
                boxShadow: `0 0 8px ${activeIndex === 3 ? 'rgba(30, 86, 255, 0.7)' : 'rgba(16, 185, 129, 0.7)'}`,
                display: 'inline-block',
                transition: 'all 0.3s ease',
              }}
            />
            <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>
              {activeIndex === 3 ? 'PHYSICAL REALITY' : 'DIGITAL NOISE'}
            </span>
            <span style={{ opacity: 0.35 }}>//</span>
            <span style={{ opacity: 0.75 }}>NYC STREETSCAPE</span>
          </div>

          {/* Step Progress Number */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: '#111111',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
            }}
          >
            <span style={{ color: '#1E56FF' }}>0{activeIndex + 1}</span>
            <span style={{ opacity: 0.35 }}>/</span>
            <span style={{ opacity: 0.6 }}>04</span>
          </div>
        </div>

        {/* Main High-Contrast Focused Card Canvas */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            maxWidth: '1080px',
            backgroundColor: 'rgba(255, 255, 255, 0.90)',
            backdropFilter: 'blur(24px) saturate(190%)',
            WebkitBackdropFilter: 'blur(24px) saturate(190%)',
            borderRadius: '28px',
            border: '1px solid rgba(17, 17, 17, 0.09)',
            boxShadow:
              '0 32px 80px -16px rgba(0, 0, 0, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.85) inset',
            padding: 'clamp(1.75rem, 3.5vw, 3rem) clamp(1.25rem, 3.5vw, 3.25rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
          }}
        >
          {/* Interactive Navigation Steps / Progress Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.75rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid rgba(17, 17, 17, 0.07)',
            }}
          >
            {STATEMENTS.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToStep(idx)}
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.35rem 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Progress Line Bar */}
                  <div
                    style={{
                      height: '3px',
                      borderRadius: '2px',
                      backgroundColor: 'rgba(17, 17, 17, 0.10)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: isPassed ? '100%' : isActive ? '100%' : '0%',
                        backgroundColor: isActive
                          ? item.isClimax
                            ? '#1E56FF'
                            : '#111111'
                          : isPassed
                          ? '#10B981'
                          : 'transparent',
                        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>

                  {/* Step Label */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        color: isActive
                          ? item.isClimax
                            ? '#1E56FF'
                            : '#111111'
                          : '#888888',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {item.num}. {item.badge}
                    </span>
                    {isActive && (
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          backgroundColor: item.isClimax ? '#1E56FF' : '#111111',
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* The 4 Statements Stack: Crisp, Focused, Readable */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.6rem, 1.4vw, 1.25rem)',
            }}
          >
            {STATEMENTS.map((item, idx) => {
              const isActive = idx === activeIndex;
              const IconComponent = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => scrollToStep(idx)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    padding: isActive
                      ? 'clamp(0.9rem, 1.8vw, 1.35rem) clamp(1rem, 2vw, 1.5rem)'
                      : '0.5rem 0.5rem',
                    borderRadius: '16px',
                    backgroundColor: isActive
                      ? item.isClimax
                        ? 'rgba(30, 86, 255, 0.05)'
                        : 'rgba(17, 17, 17, 0.03)'
                      : 'transparent',
                    border: isActive
                      ? item.isClimax
                        ? '1px solid rgba(30, 86, 255, 0.20)'
                        : '1px solid rgba(17, 17, 17, 0.08)'
                      : '1px solid transparent',
                    opacity: isActive ? 1 : 0.24,
                    filter: isActive ? 'none' : 'grayscale(60%)',
                    transform: isActive ? 'scale(1.01) translateX(0)' : 'scale(0.985) translateX(-4px)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    {/* Main Statement Text */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(0.6rem, 1.5vw, 1.25rem)',
                      }}
                    >
                      {/* Step Number Tag */}
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)',
                          fontWeight: 700,
                          color: isActive
                            ? item.isClimax
                              ? '#1E56FF'
                              : '#111111'
                            : '#999999',
                          minWidth: '26px',
                        }}
                      >
                        {item.num}
                      </span>

                      {/* Headline Text */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: item.isClimax
                            ? 'clamp(1.5rem, 4.2vw, 3.6rem)'
                            : 'clamp(1.35rem, 3.4vw, 2.9rem)',
                          letterSpacing: '-0.035em',
                          lineHeight: 1.05,
                          textTransform: 'uppercase',
                          color: '#111111',
                          margin: 0,
                        }}
                      >
                        {item.headline}{' '}
                        {item.highlightText && (
                          <span
                            style={{
                              color: '#1E56FF',
                              textShadow: '0 0 28px rgba(30, 86, 255, 0.28)',
                              display: 'inline-block',
                            }}
                          >
                            {item.highlightText}
                          </span>
                        )}
                      </h3>
                    </div>

                    {/* Interactive Status / Pill Badge */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: isActive
                          ? item.isClimax
                            ? '#1E56FF'
                            : 'rgba(17, 17, 17, 0.08)'
                          : 'rgba(17, 17, 17, 0.04)',
                        color: isActive
                          ? item.isClimax
                            ? '#FFFFFF'
                            : '#222222'
                          : '#888888',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <IconComponent
                        size={12}
                        style={{
                          color: isActive && item.isClimax ? '#FFFFFF' : undefined,
                        }}
                      />
                      <span>{item.pillAction}</span>
                    </div>
                  </div>

                  {/* Detailed Supporting Explanation (Expanded when focused) */}
                  {isActive && (
                    <div
                      style={{
                        marginTop: '0.75rem',
                        paddingLeft: 'clamp(2rem, 3.2vw, 2.75rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.65rem',
                        animation: 'fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(0.85rem, 1.15vw, 1.05rem)',
                          color: item.isClimax ? '#222222' : '#555555',
                          lineHeight: 1.5,
                          maxWidth: '780px',
                          fontWeight: item.isClimax ? 500 : 400,
                        }}
                      >
                        {item.subtext}
                      </p>

                      {/* Climax Proof Badges on Step 4 */}
                      {item.isClimax && (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginTop: '0.35rem',
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(30, 86, 255, 0.1)',
                              color: '#1E56FF',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.64rem',
                              fontWeight: 700,
                            }}
                          >
                            ✓ ZERO AD-BLOCKERS
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(17, 17, 17, 0.06)',
                              color: '#111111',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.64rem',
                              fontWeight: 700,
                            }}
                          >
                            ✓ 24/7/365 STREET VISIBILITY
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                              color: '#059669',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.64rem',
                              fontWeight: 700,
                            }}
                          >
                            ✓ DOB-APPROVED & PERMANENT
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Card Footer: Scroll Hint & Manifesto Summary */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(17, 17, 17, 0.07)',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
                color: '#555555',
              }}
            >
              <span>Built to turn ordinary NYC storefronts into</span>
              <strong style={{ color: '#111111', fontStyle: 'normal' }}>iconic landmarks.</strong>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 600,
                color: activeIndex === 3 ? '#1E56FF' : '#777777',
                letterSpacing: '0.04em',
                transition: 'color 0.25s ease',
              }}
            >
              <span>{activeIndex === 3 ? 'THE PHYSICAL VERDICT ✦' : 'SCROLL TO EXPLORE'}</span>
              <ArrowDown
                size={12}
                style={{
                  animation: 'bounceArrow 1.5s infinite ease-in-out',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceArrow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </section>
  );
}
