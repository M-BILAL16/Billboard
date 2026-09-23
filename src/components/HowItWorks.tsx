'use client';

import React from 'react';
import { Target, MapPin, Sliders, Radio } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'CONSULTATION & SITE SURVEY',
    copy: 'Share your sign vision, architectural plans, or storefront photos. Our engineers inspect facade mounts and measure sightlines.',
    icon: Target,
  },
  {
    number: '02',
    title: 'DESIGN & DOB EXPEDITING',
    copy: 'We draft CAD drawings, photorealistic mockups, and submit full permit applications directly to the NYC Department of Buildings.',
    icon: MapPin,
  },
  {
    number: '03',
    title: 'IN-HOUSE FABRICATION',
    copy: 'Crafted in our 10,000 sq ft facility in NYC with precision CNC routing, laser cutting, channel bending, and UL-certified electrical assembly.',
    icon: Sliders,
  },
  {
    number: '04',
    title: 'LICENSED INSTALLATION',
    copy: 'Our 3M certified sign installers and licensed crane crews mount your sign with complete DOB structural sign-off and warranty.',
    icon: Radio,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        backgroundColor: '#F2ECDD', // Soft beige / cream
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 5.2vw, 4.8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
            }}
          >
            FOUR STEPS. <br />
            ONE NEW YORK <br />
            <span style={{ color: '#1E56FF' }}>LANDMARK.</span>
          </h2>
        </div>

        {/* 4 Steps Grid with Large Numbers as Graphic Elements */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            marginBottom: '4.5rem',
          }}
          className="how-steps-grid"
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                style={{
                  position: 'relative',
                  padding: '2.5rem 2rem',
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.3s ease',
                }}
                className="step-box"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1E56FF';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.03)';
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1.75rem',
                    }}
                  >
                    {/* Large Number Graphic Element */}
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3rem',
                        fontWeight: 900,
                        color: '#111111',
                        lineHeight: 0.9,
                      }}
                    >
                      {step.number}
                    </span>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: '#F7F5EF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#1E56FF',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      color: '#111111',
                      marginBottom: '0.85rem',
                      lineHeight: 1.15,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p style={{ color: '#555555', fontSize: '0.9rem', lineHeight: 1.55 }}>
                    {step.copy}
                  </p>
                </div>

                <div
                  style={{
                    height: '2px',
                    width: '100%',
                    backgroundColor: idx === 0 ? '#1E56FF' : 'rgba(17, 17, 17, 0.1)',
                    marginTop: '2rem',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .how-steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .how-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
