'use client';

import React, { useState, useRef } from 'react';
import { ArrowUpRight, Mail, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const skylineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!skylineRef.current) return;
    const rect = skylineRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const buildings = [
    { height: 75, width: 9, left: 2, windows: 24 },
    { height: 90, width: 11, left: 13, windows: 35 },
    { height: 60, width: 8, left: 26, windows: 18 },
    { height: 98, width: 12, left: 36, windows: 42, hasBillboard: true },
    { height: 70, width: 10, left: 50, windows: 25 },
    { height: 85, width: 10, left: 62, windows: 32 },
    { height: 65, width: 9, left: 74, windows: 20 },
    { height: 92, width: 12, left: 85, windows: 38, hasBillboard: true },
  ];

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#EFEFEA', // Warm off-white / light concrete (NOT black)
        borderTop: '1px solid rgba(17, 17, 17, 0.08)',
        paddingTop: '6.5rem',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Interactive Architectural Line Drawing Canvas */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#1E56FF',
                letterSpacing: '0.12em',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={12} />
              MOVE YOUR CURSOR TO LIGHT UP THE CITY
            </span>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#888888',
              }}
            >
              ARCHITECTURAL GRID // ACTIVE
            </span>
          </div>

          {/* City Skyline Line-Drawing Box */}
          <div
            ref={skylineRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            data-cursor="LIGHT UP"
            style={{
              position: 'relative',
              width: '100%',
              height: '190px',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              overflow: 'hidden',
              cursor: 'crosshair',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            {/* Buildings Line Silhouettes */}
            {buildings.map((b, bIdx) => {
              const bCenter = b.left + b.width / 2;
              const distToCursor = Math.abs(mousePos.x - bCenter);
              const isLit = isHovered && distToCursor < 18;

              return (
                <div
                  key={bIdx}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: `${b.left}%`,
                    width: `${b.width}%`,
                    height: `${b.height}%`,
                    backgroundColor: isLit ? '#FFF8F4' : '#F7F5EF',
                    borderTop: isLit ? '2px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.15)',
                    borderLeft: '1px solid rgba(17, 17, 17, 0.1)',
                    borderRight: '1px solid rgba(17, 17, 17, 0.1)',
                    padding: '8px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '4px',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {/* Rooftop Billboard */}
                  {b.hasBillboard && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-24px',
                        left: '10%',
                        right: '10%',
                        height: '18px',
                        backgroundColor: isLit ? '#1E56FF' : '#E0E0DA',
                        border: '1px solid #1E56FF',
                        boxShadow: isLit ? '0 0 16px rgba(30, 86, 255, 0.4)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.48rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 900,
                          color: isLit ? '#FFFFFF' : '#666666',
                        }}
                      >
                        SIGNS NYC
                      </span>
                    </div>
                  )}

                  {/* Window Line Grid */}
                  {[...Array(b.windows)].map((_, wIdx) => {
                    const windowActive = isLit && (wIdx + bIdx) % 2 === 0;
                    return (
                      <div
                        key={wIdx}
                        style={{
                          width: '100%',
                          height: '5px',
                          borderRadius: '1px',
                          backgroundColor: windowActive
                            ? '#1E56FF'
                            : (wIdx * 7) % 5 === 0
                            ? '#D2D2CA'
                            : '#EBEBE5',
                          boxShadow: windowActive ? '0 0 8px rgba(30, 86, 255, 0.5)' : 'none',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Large Statement */}
        <div style={{ marginBottom: '5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7.5vw, 7.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
            }}
          >
            NEW YORK <br />
            <span style={{ color: '#1E56FF' }}>BUILT TO LAST.</span>
          </h2>
        </div>

        {/* Directory Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            marginBottom: '5rem',
            borderTop: '1px solid rgba(17, 17, 17, 0.08)',
            paddingTop: '3.5rem',
          }}
          className="footer-grid"
        >
          {/* Navigation */}
          <div style={{ gridColumn: 'span 3' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '1.25rem',
              }}
            >
              NAVIGATION
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Sign Categories', 'Boroughs', 'Installations', 'DOB Permits', 'Experience', 'Planner'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      color: '#444444',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1E56FF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#444444')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Media Formats */}
          <div style={{ gridColumn: 'span 3' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '1.25rem',
              }}
            >
              FABRICATION SERVICES
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Storefront Channel Letters',
                'Indoor & Lobby Signs',
                'Commercial Awnings',
                'Scaffolding & Banners',
                'Fleet Vehicle Wraps',
                'DOB Permit Expediting',
              ].map((item) => (
                <li key={item}>
                  <span
                    style={{
                      color: '#555555',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div style={{ gridColumn: 'span 3' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '1.25rem',
              }}
            >
              GET IN TOUCH
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a
                href="mailto:INFO@SIGNSNY.COM"
                style={{
                  color: '#111111',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Mail size={16} color="#1E56FF" />
                INFO@SIGNSNY.COM
              </a>
              <a
                href="tel:+17184538300"
                style={{
                  color: '#111111',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Phone size={16} color="#1E56FF" />
                (718) 453-8300
              </a>
              <p style={{ color: '#666666', fontSize: '0.82rem', marginTop: '0.5rem', lineHeight: 1.45 }}>
                Plant: 10,000 Sq Ft NYC Production Facility <br />
                Licensed & Insured in All 5 Boroughs • 24/7 Emergency Service
              </p>
            </div>
          </div>

          {/* Social Channels */}
          <div style={{ gridColumn: 'span 3' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '1.25rem',
              }}
            >
              FOLLOW OUR WORK
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Instagram', url: 'https://instagram.com/signs_newyork' },
                { name: 'Facebook', url: 'https://facebook.com/SignsNYC' },
                { name: 'LinkedIn', url: 'https://linkedin.com/company/signsnewyork' },
                { name: 'YouTube', url: 'https://youtube.com/channel/UCyXun-0bHhrj5IpsFjrYbog' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: '#444444',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#1E56FF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#444444')}
                  >
                    {item.name}
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            borderTop: '1px solid rgba(17, 17, 17, 0.08)',
            paddingTop: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#777777',
          }}
        >
          <div>© 2026 SIGNS NYC. YOUR LOCAL SIGN MAKER & PRINT SHOP. ALL RIGHTS RESERVED.</div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#777777', textDecoration: 'none' }}>
              PRIVACY
            </a>
            <a href="#" style={{ color: '#777777', textDecoration: 'none' }}>
              TERMS
            </a>
            <a href="#" style={{ color: '#777777', textDecoration: 'none' }}>
              COOKIES
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
