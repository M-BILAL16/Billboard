'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  onOpenCampaignModal: () => void;
}

export default function BeforeAfterSlider({ onOpenCampaignModal }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#E9E9E5', // Pale neutral concrete
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
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
            STOREFRONT TRANSFORMATION.
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
              marginBottom: '1.25rem',
            }}
          >
            SAME FACADE. <br />
            <span style={{ color: '#1E56FF' }}>NEW LANDMARK.</span>
          </h2>

          <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '620px', lineHeight: 1.6 }}>
            A custom sign does not simply display a name. It commands footfall, increases perceived value, and turns an ordinary storefront into a recognizable New York destination.
          </p>
        </div>

        {/* Interactive Draggable Daylight Split Container */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          data-cursor="DRAG"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '24px',
            overflow: 'hidden',
            cursor: 'ew-resize',
            userSelect: 'none',
            border: '2px solid #FFFFFF',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* AFTER: Vibrant finished advertising campaign */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image
              src="/images/street_after.jpg"
              alt="Bright street with vivid advertising campaign"
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover' }}
            />
            {/* AFTER Label */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#1E56FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                zIndex: 5,
              }}
            >
              ✦ AFTER: CUSTOM STOREFRONT LANDMARK
            </div>
          </div>

          {/* BEFORE: Blank Facade */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <Image
              src="/images/street_before.jpg"
              alt="Storefront facade before signage"
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover' }}
            />
            {/* BEFORE Label */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                padding: '0.45rem 1.1rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#111111',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '0.1em',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                zIndex: 5,
              }}
            >
              BEFORE: UNBRANDED FACADE
            </div>
          </div>

          {/* Draggable Divider Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              width: '3px',
              backgroundColor: '#1E56FF',
              boxShadow: '0 0 16px rgba(30, 86, 255, 0.4)',
              transform: 'translateX(-50%)',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #1E56FF',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1E56FF',
              }}
            >
              <MoveHorizontal size={22} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Bottom Callout & CTA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginTop: '3.5rem',
            padding: '2.5rem',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 900,
                color: '#111111',
                marginBottom: '0.35rem',
              }}
            >
              READY TO TRANSFORM YOUR NYC STOREFRONT?
            </h4>
            <p style={{ color: '#666666', fontSize: '0.95rem' }}>
              From Manhattan flagships to neighborhood storefronts, see how custom signs elevate footfall.
            </p>
          </div>

          <button
            onClick={onOpenCampaignModal}
            className="btn-primary"
            data-cursor="QUOTE"
            style={{ whiteSpace: 'nowrap' }}
          >
            GET A STOREFRONT QUOTE
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
