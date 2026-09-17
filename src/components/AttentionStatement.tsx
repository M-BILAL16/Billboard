'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const STATEMENTS = [
  { top: 'ONE', bottom: 'STOREFRONT.' },
  { top: 'A MILLION', bottom: 'GLANCES.' },
  { top: 'NYC BUILT.', bottom: 'DOB APPROVED.' },
  { top: 'MAKE IT', bottom: 'A LANDMARK.' },
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

      // Parallax progress calculation
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progressRatio = Math.min(1, Math.max(0, currentDist / totalDist));
      setScrollProgress(progressRatio);

      // Statement switching logic
      if (rect.top <= windowHeight * 0.7 && rect.bottom >= windowHeight * 0.3) {
        const progress = (windowHeight * 0.7 - rect.top) / (rect.height + windowHeight * 0.4);
        const clampedIndex = Math.min(
          STATEMENTS.length - 1,
          Math.max(0, Math.floor(progress * STATEMENTS.length))
        );
        setActiveIndex(clampedIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FDF7E7', // Soft Sunlight Yellow fallback
        minHeight: '120vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Background Parallax Image Layer */}
      <div
        style={{
          position: 'absolute',
          inset: '-10% -5%',
          width: '110%',
          height: '120%',
          zIndex: 0,
          pointerEvents: 'none',
          transform: `translate3d(0, ${(scrollProgress - 0.5) * -70}px, 0) scale(${1.04 + scrollProgress * 0.06})`,
          transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Image
          src="/images/nyc_attention_bg.jpg"
          alt="Sunlit New York City SoHo avenue architecture"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 42%',
            filter: 'brightness(1.02) contrast(0.96) saturate(1.05)',
          }}
          priority={false}
        />

        {/* Multi-tier Soft Sunlight Veil for High Text Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(253, 247, 231, 0.84) 0%, rgba(248, 243, 227, 0.92) 65%, rgba(242, 236, 220, 0.98) 100%)',
          }}
        />

        {/* Top and Bottom Seamless Blending Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(247, 245, 239, 1) 0%, rgba(247, 245, 239, 0.4) 15%, transparent 35%, transparent 75%, rgba(247, 245, 239, 1) 100%)',
          }}
        />
      </div>

      {/* Floating Telemetry Badge (Top Left of Section) */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          zIndex: 5,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(17, 17, 17, 0.08)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.66rem',
          color: '#555555',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#1E56FF',
            display: 'inline-block',
          }}
        />
        <span style={{ fontWeight: 700, color: '#111111' }}>NYC STREET VIEW</span>
        <span style={{ opacity: 0.5 }}>//</span>
        <span>SOHO CORRIDOR</span>
      </div>

      <div
        style={{
          position: 'sticky',
          top: '26%',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1200px',
          padding: '1.5rem',
        }}
      >
        {/* Step Indicators */}
        <div
          style={{
            display: 'flex',
            gap: '0.65rem',
            marginBottom: '3rem',
          }}
        >
          {STATEMENTS.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '46px' : '12px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: i === activeIndex ? '#1E56FF' : 'rgba(17, 17, 17, 0.18)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Sequential Oversized Typography */}
        <div style={{ minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2
            key={activeIndex}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3.8rem, 11vw, 9.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
              color: '#111111',
              animation: 'statementFade 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {STATEMENTS[activeIndex].top} <br />
            <span
              style={{
                color: activeIndex === 3 ? '#1E56FF' : '#333333',
              }}
            >
              {STATEMENTS[activeIndex].bottom}
            </span>
          </h2>
        </div>

        {/* Supporting Caption */}
        <p
          style={{
            marginTop: '3.5rem',
            color: '#666666',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
            maxWidth: '560px',
            lineHeight: 1.4,
          }}
        >
          Custom architectural signage turns ordinary storefronts into <br />
          <strong style={{ color: '#111111', fontStyle: 'normal' }}>extraordinary New York landmarks.</strong>
        </p>
      </div>

      <style jsx>{`
        @keyframes statementFade {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
