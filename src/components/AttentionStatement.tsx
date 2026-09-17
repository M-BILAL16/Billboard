'use client';

import React, { useState, useEffect, useRef } from 'react';

const STATEMENTS = [
  { top: 'ONE', bottom: 'STOREFRONT.' },
  { top: 'A MILLION', bottom: 'GLANCES.' },
  { top: 'NYC BUILT.', bottom: 'DOB APPROVED.' },
  { top: 'MAKE IT', bottom: 'A LANDMARK.' },
];

export default function AttentionStatement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#FDF7E7', // Soft Sunlight Yellow
        minHeight: '110vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: '28%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1200px',
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
