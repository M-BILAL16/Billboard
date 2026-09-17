'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, Eye, Clock, Users } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 'spot-1',
    x: 32, // %
    y: 38,
    metric: '3.2M',
    label: 'WEEKLY FOOTFALL',
    sub: 'FIFTH AVENUE & BROADWAY CORRIDOR',
    icon: Eye,
  },
  {
    id: 'spot-2',
    x: 62,
    y: 30,
    metric: '24/7',
    label: 'HALO ILLUMINATION',
    sub: 'UL-LISTED WEATHER-SEALED LEDS',
    icon: Clock,
  },
  {
    id: 'spot-3',
    x: 78,
    y: 65,
    metric: '100%',
    label: 'DOB COMPLIANT',
    sub: 'LICENSED SIGN HANGER EXPEDITING',
    icon: Users,
  },
];

export default function SpotlightSection() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isInside, setIsInside] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#F7F5EF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
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
            NYC SIGHTLINE & VISIBILITY RADAR
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
            ATTENTION <br />
            <span style={{ color: '#1E56FF' }}>HAS AN ADDRESS.</span>
          </h2>

          <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '620px', lineHeight: 1.6 }}>
            Explore the places where custom signs become iconic landmarks. Move across the NYC avenue to reveal
            pedestrian sightlines, architectural elevations, and day-to-night illumination.
          </p>
        </div>

        {/* High-Key Daytime Spotlight Exploration Canvas */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsInside(true)}
          onMouseLeave={() => setIsInside(false)}
          onMouseMove={handleMouseMove}
          data-cursor="DISCOVER"
          style={{
            position: 'relative',
            width: '100%',
            height: '640px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid #FFFFFF',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
            backgroundColor: '#E9E9E5',
          }}
        >
          {/* Overexposed / Softly Desaturated Daylight Base */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              filter: 'brightness(1.05) contrast(0.95) saturate(0.85)',
            }}
          >
            <Image
              src="/images/daylight_hero.jpg"
              alt="Daylight metropolitan city scene"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Soft White Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(247, 245, 239, 0.4) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Glowing Magnification Lens Cursor Follower */}
          {isInside && (
            <div
              style={{
                position: 'absolute',
                top: `${mousePos.y}%`,
                left: `${mousePos.x}%`,
                width: '280px',
                height: '280px',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                border: '2px solid #1E56FF',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(2px)',
                boxShadow: '0 0 40px rgba(30, 86, 255, 0.25)',
                pointerEvents: 'none',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  backgroundColor: '#1E56FF',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                }}
              >
                RADAR FOCUS
              </span>
            </div>
          )}

          {/* Interactive Billboard Hotspots */}
          {HOTSPOTS.map((spot) => {
            const dist = Math.hypot(mousePos.x - spot.x, mousePos.y - spot.y);
            const isNear = dist < 24 || !isInside;

            return (
              <div
                key={spot.id}
                style={{
                  position: 'absolute',
                  top: `${spot.y}%`,
                  left: `${spot.x}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  opacity: isNear ? 1 : 0.6,
                  transition: 'all 0.35s ease',
                }}
              >
                {/* Hotspot Pulse Marker */}
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#1E56FF',
                    boxShadow: '0 4px 14px rgba(30, 86, 255, 0.4)',
                    margin: '0 auto 8px',
                    position: 'relative',
                  }}
                >
                  <div className="radar-ping-light" />
                </div>

                {/* Floating White Editorial Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #1E56FF',
                    borderRadius: '16px',
                    padding: '1rem 1.4rem',
                    textAlign: 'center',
                    minWidth: '200px',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)',
                    transform: isNear ? 'scale(1)' : 'scale(0.92)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.9rem',
                      fontWeight: 900,
                      color: '#111111',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {spot.metric}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#1E56FF',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      marginBottom: '0.15rem',
                    }}
                  >
                    {spot.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: '#666666',
                      fontWeight: 600,
                    }}
                  >
                    {spot.sub}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom helper pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(17, 17, 17, 0.1)',
              padding: '0.45rem 1.4rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#111111',
              pointerEvents: 'none',
              zIndex: 30,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            ✦ MOVE ACROSS TO REVEAL SIGHTLINES & METRICS
          </div>
        </div>
      </div>
    </section>
  );
}
