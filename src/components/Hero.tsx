'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Wrench, Clock, CheckCircle2, Volume2, VolumeX, Play, Pause, Maximize2 } from 'lucide-react';

interface HeroProps {
  onOpenShowreel: () => void;
  onOpenCampaignModal: () => void;
}

export default function Hero({ onOpenShowreel, onOpenCampaignModal }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '90vh',
        width: '100%',
        backgroundColor: '#F7F5EF',
        paddingTop: '8.5rem',
        paddingBottom: '5rem',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      className="paper-texture"
    >
      {/* Subtle Architectural Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(17, 17, 17, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 17, 17, 0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Asymmetrical Editorial Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Massive Confident Headline & Typography */}
          <div style={{ gridColumn: 'span 6' }} className="hero-typography-col">
            {/* Credibility Eyebrow Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                background: '#FFFFFF',
                border: '1px solid rgba(30, 86, 255, 0.2)',
                color: '#1E56FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                marginBottom: '1.75rem',
                boxShadow: '0 2px 10px rgba(30, 86, 255, 0.08)',
              }}
            >
              <Sparkles size={13} color="#1E56FF" />
              LICENSED & INSURED • 10,000 SQ FT IN-HOUSE FABRICATION • NYC SINCE 1989
            </div>

            {/* Massive Architectural Headline (Concept 1) */}
            <h1
              className="hero-headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.2rem, 5.8vw, 4.8rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#111111',
                marginBottom: '1.75rem',
              }}
            >
              WE DON’T JUST <br />
              <span style={{ color: '#888888', fontWeight: 800 }}>MAKE SIGNS.</span> <br />
              WE BUILD <br />
              <span
                className="hero-landmarks"
                style={{
                  color: '#1E56FF',
                  position: 'relative',
                  display: 'inline-block',
                  lineHeight: 1,
                }}
              >
                NYC LANDMARKS.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                color: '#444444',
                fontSize: 'clamp(1.02rem, 1.2vw, 1.18rem)',
                maxWidth: '560px',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
              }}
            >
              From illuminated storefront channel letters and architectural metalwork to corporate lobby branding
              and fleet graphics. Engineered in our 10,000 sq ft NYC facility, installed across all five boroughs with full DOB permit management.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
              <button
                type="button"
                onClick={onOpenCampaignModal}
                className="btn-primary"
                data-cursor="QUOTE"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                REQUEST A FREE QUOTE
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>

              <a
                href="#campaigns"
                className="btn-secondary"
                data-cursor="GALLERY"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                EXPLORE OUR WORK (GALLERY)
              </a>
            </div>
          </div>

          {/* Right Column: Large Architectural Showcase & Interactive Sign Mockup */}
          <div style={{ gridColumn: 'span 6', position: 'relative' }} className="hero-collage-col">
            {/* Main Architectural Video Showcase Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)',
                border: '1.5px solid #FFFFFF',
                backgroundColor: '#0F172A',
              }}
            >
              <video
                ref={videoRef}
                src="/videos/video2.mp4"
                poster="/images/video2_thumb.jpg"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Subtle Top & Bottom Vignette Overlays for HUD contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to bottom, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0) 25%, rgba(15, 23, 42, 0) 70%, rgba(15, 23, 42, 0.65) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Top Bar Telemetry Badges */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  right: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#00D4FF',
                      boxShadow: '0 0 8px #00D4FF',
                      display: 'inline-block',
                    }}
                  />
                  FABRICATION REEL // NYC ARCHITECTURE
                </div>

                <div
                  style={{
                    background: '#1E56FF',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    boxShadow: '0 2px 10px rgba(30, 86, 255, 0.4)',
                  }}
                >
                  4K // 60 FPS
                </div>
              </div>

              {/* Bottom Interactive HUD Controls */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {/* Play / Pause Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isPlaying ? <Pause size={12} fill="#FFFFFF" /> : <Play size={12} fill="#FFFFFF" />}
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>

                  {/* Audio Mute / Unmute Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(12px)',
                      border: isMuted ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid #00D4FF',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      color: isMuted ? '#94A3B8' : '#00D4FF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isMuted ? 'none' : '0 0 12px rgba(0, 212, 255, 0.35)',
                    }}
                  >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    {isMuted ? 'UNMUTE' : 'AUDIO LIVE'}
                  </button>
                </div>

                {/* Showreel Fullscreen Trigger */}
                <button
                  type="button"
                  onClick={onOpenShowreel}
                  aria-label="Open Fullscreen Showreel"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#1E56FF',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(30, 86, 255, 0.4)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Maximize2 size={12} />
                  EXPAND
                </button>
              </div>
            </div>

            {/* Overlapping Cropped Architectural Image (Bottom Left) */}
            <div
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '-24px',
                width: '180px',
                height: '210px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                border: '3px solid #FFFFFF',
              }}
              className="collage-floating-img"
            >
              <Image
                src="/images/daylight_arch_vertical.jpg"
                alt="New York storefront sign architecture"
                fill
                sizes="200px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Rotating Circular Badge (Top Right) */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-16px',
                width: '114px',
                height: '114px',
                borderRadius: '50%',
                backgroundColor: '#1E56FF',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 28px rgba(30, 86, 255, 0.35)',
                zIndex: 20,
              }}
            >
              {/* Rotating Curved Text */}
              <div
                className="animate-spin-slow"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                  />
                  <text fill="#FFFFFF" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="1.2">
                    <textPath href="#circlePath" startOffset="0%">
                      • NYC SIGN MAKER • SINCE 1989 •
                    </textPath>
                  </text>
                </svg>
              </div>

              <div style={{ textAlign: 'center', zIndex: 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  35+
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  YEARS
                </span>
              </div>
            </div>

            {/* Floating Editorial Labels */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                padding: '0.65rem 1rem',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0,0,0,0.06)',
                zIndex: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: '#888888',
                  display: 'block',
                }}
              >
                03 // FIVE BOROUGHS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  fontWeight: 900,
                  color: '#111111',
                }}
              >
                MANHATTAN & NYC WIDE
              </span>
            </div>

            {/* Label 01 In-House Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '-12px',
                padding: '0.4rem 0.85rem',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0,0,0,0.06)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#1E56FF',
                zIndex: 20,
              }}
            >
              01 // 100% IN-HOUSE FABRICATION
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DEDICATED COUNTER SUB-SECTION (ARCHITECTURAL METRICS DOCK) */}
        {/* ============================================================ */}
        <div
          className="hero-counter-dock"
          style={{
            marginTop: '3.75rem',
            padding: '1.85rem 2.25rem',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(26px)',
            WebkitBackdropFilter: 'blur(26px)',
            borderRadius: '24px',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            boxShadow: '0 18px 45px -10px rgba(0, 0, 0, 0.06), 0 4px 14px rgba(0, 0, 0, 0.02)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.75rem',
            position: 'relative',
          }}
        >
          {/* Counter 01 */}
          <div className="counter-card" style={{ position: 'relative', paddingRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                }}
              >
                01 // HERITAGE & EXPERIENCE
              </span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1E56FF', opacity: 0.7 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                35+
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                YEARS
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              SERVING NYC SINCE 1989
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              Licensed & Insured in All 5 Boroughs
            </div>
          </div>

          {/* Counter 02 */}
          <div
            className="counter-card"
            style={{
              position: 'relative',
              paddingRight: '1rem',
              borderLeft: '1px solid rgba(17, 17, 17, 0.08)',
              paddingLeft: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                }}
              >
                02 // IN-HOUSE PRODUCTION
              </span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1E56FF', opacity: 0.7 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                10,000
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                SQ FT
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              FABRICATION FACILITY
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              CNC • Laser • Welding • Bending
            </div>
          </div>

          {/* Counter 03 */}
          <div
            className="counter-card"
            style={{
              position: 'relative',
              paddingRight: '1rem',
              borderLeft: '1px solid rgba(17, 17, 17, 0.08)',
              paddingLeft: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                }}
              >
                03 // CODE & COMPLIANCE
              </span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1E56FF', opacity: 0.7 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                100%
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                PERMIT READY
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              DOB PERMIT EXPEDITING
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              3M Certified Professional Installers
            </div>
          </div>

          {/* Counter 04 */}
          <div
            className="counter-card"
            style={{
              position: 'relative',
              borderLeft: '1px solid rgba(17, 17, 17, 0.08)',
              paddingLeft: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                }}
              >
                04 // DEDICATED RESPONSE
              </span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1E56FF', opacity: 0.7 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 2.7vw, 2.85rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#111111',
                  letterSpacing: '-0.035em',
                }}
              >
                24/7
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                }}
              >
                EMERGENCY
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111111', lineHeight: 1.25 }}>
              EMERGENCY SIGN SERVICE
            </div>
            <div style={{ fontSize: '0.74rem', color: '#666666', marginTop: '0.25rem', lineHeight: 1.4 }}>
              After-Hours & Rapid Upkeep
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (max-width: 1080px) {
          .hero-counter-dock {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
            padding: 1.5rem !important;
          }
          .counter-card {
            border-left: none !important;
            padding-left: 0 !important;
          }
        }
        @media (max-width: 992px) {
          .hero-typography-col,
          .hero-collage-col {
            grid-column: span 12 !important;
          }
          .hero-typography-col {
            margin-bottom: 2rem;
          }
          .collage-floating-img {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .hero-counter-dock {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
