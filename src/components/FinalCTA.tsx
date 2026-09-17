'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenCampaignModal: () => void;
}

export default function FinalCTA({ onOpenCampaignModal }: FinalCTAProps) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '8rem 2rem',
        backgroundColor: '#F2ECDD', // Soft daylight sand / cream
      }}
    >
      {/* Daylight Bright City Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src="/images/daylight_hero.jpg"
          alt="Sunlit city avenue with massive digital billboard"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            filter: 'brightness(1.02) contrast(0.95)',
          }}
        />

        {/* Soft Warm Light Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, rgba(247, 245, 239, 0.75) 0%, rgba(242, 236, 221, 0.95) 100%)',
          }}
        />
      </div>

      {/* Floating Dynamic Billboard Banner */}
      <div
        style={{
          position: 'absolute',
          top: '7%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          padding: '1.25rem 2.5rem',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
          border: btnHovered ? '2px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.1)',
          boxShadow: btnHovered
            ? '0 16px 40px rgba(30, 86, 255, 0.2)'
            : '0 8px 30px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.35s ease',
          textAlign: 'center',
          maxWidth: '540px',
          width: '90%',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#1E56FF',
            fontWeight: 800,
            letterSpacing: '0.14em',
            display: 'block',
            marginBottom: '0.25rem',
          }}
        >
          // SKYLINE FLAGSHIP DISPLAY
        </span>
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
            fontWeight: 900,
            color: '#111111',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          {btnHovered ? "LET'S MAKE SOMETHING UNMISSABLE." : 'YOUR BRAND HERE.'}
        </h4>
      </div>

      {/* Center Content */}
      <div
        className="container-custom"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '920px',
        }}
      >
        {/* Small Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#1E56FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
            background: '#FFFFFF',
            padding: '0.45rem 1.3rem',
            borderRadius: '9999px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            border: '1px solid rgba(17, 17, 17, 0.08)',
          }}
        >
          <Sparkles size={14} />
          YOUR AUDIENCE IS ALREADY OUT THERE.
        </div>

        {/* Massive Confident Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(3.8rem, 11vw, 9.5rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
            color: '#111111',
            marginBottom: '2rem',
          }}
        >
          MAKE <br />
          THEM <br />
          <span style={{ color: '#1E56FF' }}>LOOK.</span>
        </h2>

        {/* Supporting Copy */}
        <p
          style={{
            color: '#444444',
            fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '0 auto 3.5rem',
          }}
        >
          From one standout screen to an entire city, let’s put your brand somewhere impossible to ignore.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <button
            onClick={onOpenCampaignModal}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            data-cursor="GO LIVE"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              backgroundColor: '#1E56FF',
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              padding: btnHovered ? '2rem 4.2rem' : '1.6rem 3.4rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: btnHovered
                ? '0 20px 60px rgba(30, 86, 255, 0.45)'
                : '0 10px 30px rgba(30, 86, 255, 0.3)',
              transform: btnHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            START A CAMPAIGN
            <ArrowUpRight size={24} strokeWidth={3} />
          </button>

          <a
            href="#formats"
            style={{
              color: '#444444',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1E56FF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#444444')}
          >
            EXPLORE BILLBOARDS
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
