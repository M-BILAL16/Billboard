'use client';

import React, { useRef, useCallback } from 'react';
import { SIGN_CATEGORIES } from '@/data/categoriesData';

export default function MarqueeTicker() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  // Group 1: Indoor, Outdoor, Construction, Building, Event
  const groupOne = SIGN_CATEGORIES.slice(0, 5);
  // Group 2: Large Format Printing, Rigid Signs, Vehicle Wraps, Vinyl Graphics
  const groupTwo = SIGN_CATEGORIES.slice(5);

  // Smooth playback rate adjustment using Web Animations API (WAAPI)
  // This alters speed continuously from the exact current position with ZERO jumping
  const setPlaybackSpeed = useCallback((rate: number) => {
    [track1Ref.current, track2Ref.current].forEach((track) => {
      if (!track) return;
      const anims = track.getAnimations();
      anims.forEach((anim) => {
        anim.playbackRate = rate;
      });
    });
  }, []);

  const handleContainerEnter = () => {
    setPlaybackSpeed(0.2); // Slows down to 20% speed exactly where hovered
  };

  const handleContainerLeave = () => {
    setPlaybackSpeed(1.0); // Resumes normal 100% speed smoothly
  };

  const handleItemEnter = () => {
    setPlaybackSpeed(0); // Pauses in place when hovering directly over a specific item to read/inspect
  };

  const handleItemLeave = () => {
    setPlaybackSpeed(0.2); // Resumes gentle crawl
  };

  return (
    <div
      onMouseEnter={handleContainerEnter}
      onMouseLeave={handleContainerLeave}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(17, 17, 17, 0.08)',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        padding: '1.4rem 0 1.6rem 0',
        zIndex: 20,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}
      data-cursor="SLOW"
    >
      {/* Side gradient fade masks */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '140px',
          height: '100%',
          background: 'linear-gradient(90deg, #FFFFFF, rgba(255, 255, 255, 0))',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '140px',
          height: '100%',
          background: 'linear-gradient(270deg, #FFFFFF, rgba(255, 255, 255, 0))',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Track 1: Indoor, Outdoor, Construction, Building, Event (Moving Left) */}
      <div
        ref={track1Ref}
        className="marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeLeft 95s linear infinite',
          willChange: 'transform',
        }}
      >
        {[...Array(2)].map((_, arrayIndex) => (
          <div
            key={arrayIndex}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              paddingRight: '2.5rem',
            }}
          >
            {groupOne.map((catGroup) => (
              <div
                key={catGroup.category}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                {/* Category Anchor Badge */}
                <div
                  onMouseEnter={handleItemEnter}
                  onMouseLeave={handleItemLeave}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#00D4FF',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {catGroup.code}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '0.92rem',
                      letterSpacing: '-0.01em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                    }}
                  >
                    {catGroup.category}
                  </span>
                </div>

                {/* Subcategories list */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  {catGroup.subcategories.map((sub, idx) => (
                    <React.Fragment key={sub}>
                      <span
                        className="marquee-sub-item"
                        onMouseEnter={(e) => {
                          handleItemEnter();
                          e.currentTarget.style.color = '#1E56FF';
                          e.currentTarget.style.fontWeight = '700';
                        }}
                        onMouseLeave={(e) => {
                          handleItemLeave();
                          e.currentTarget.style.color = '#222222';
                          e.currentTarget.style.fontWeight = '600';
                        }}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '0.96rem',
                          letterSpacing: '-0.01em',
                          color: '#222222',
                          whiteSpace: 'nowrap',
                          transition: 'color 0.2s ease, transform 0.2s ease',
                          cursor: 'pointer',
                        }}
                      >
                        {sub}
                      </span>
                      {idx < catGroup.subcategories.length - 1 && (
                        <span
                          style={{
                            color: 'rgba(30, 86, 255, 0.35)',
                            fontSize: '0.8rem',
                            userSelect: 'none',
                          }}
                        >
                          •
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Separator between category clusters */}
                <span
                  style={{
                    color: '#1E56FF',
                    fontSize: '1.15rem',
                    margin: '0 0.5rem',
                    userSelect: 'none',
                  }}
                >
                  ✦
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Track 2: Large Format Printing, Rigid Signs, Vehicle Wraps, Vinyl Graphics (Moving Right) */}
      <div
        ref={track2Ref}
        className="marquee-track"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeRight 95s linear infinite',
          willChange: 'transform',
        }}
      >
        {[...Array(2)].map((_, arrayIndex) => (
          <div
            key={arrayIndex}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              paddingRight: '2.5rem',
            }}
          >
            {groupTwo.map((catGroup) => (
              <div
                key={catGroup.category}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                {/* Category Anchor Badge */}
                <div
                  onMouseEnter={handleItemEnter}
                  onMouseLeave={handleItemLeave}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    background: '#1E56FF',
                    color: '#FFFFFF',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    boxShadow: '0 2px 10px rgba(30, 86, 255, 0.25)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      opacity: 0.85,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {catGroup.code}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '0.92rem',
                      letterSpacing: '-0.01em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                    }}
                  >
                    {catGroup.category}
                  </span>
                </div>

                {/* Subcategories list */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  {catGroup.subcategories.map((sub, idx) => (
                    <React.Fragment key={sub}>
                      <span
                        className="marquee-sub-item"
                        onMouseEnter={(e) => {
                          handleItemEnter();
                          e.currentTarget.style.color = '#1E56FF';
                          e.currentTarget.style.fontWeight = '700';
                        }}
                        onMouseLeave={(e) => {
                          handleItemLeave();
                          e.currentTarget.style.color = '#222222';
                          e.currentTarget.style.fontWeight = '600';
                        }}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: '0.96rem',
                          letterSpacing: '-0.01em',
                          color: '#222222',
                          whiteSpace: 'nowrap',
                          transition: 'color 0.2s ease, transform 0.2s ease',
                          cursor: 'pointer',
                        }}
                      >
                        {sub}
                      </span>
                      {idx < catGroup.subcategories.length - 1 && (
                        <span
                          style={{
                            color: 'rgba(30, 86, 255, 0.35)',
                            fontSize: '0.8rem',
                            userSelect: 'none',
                          }}
                        >
                          •
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Separator between category clusters */}
                <span
                  style={{
                    color: '#1E56FF',
                    fontSize: '1.15rem',
                    margin: '0 0.5rem',
                    userSelect: 'none',
                  }}
                >
                  ✦
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
