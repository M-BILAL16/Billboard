'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CampaignBuilderProps {
  onComplete: (config: {
    city: string;
    audience: string;
    goal: string;
    format: string;
    screens: number;
    impressions: string;
  }) => void;
}

const CITIES = ['London', 'Dubai', 'New York', 'Manchester', 'Birmingham', 'Other'];
const AUDIENCES = ['Commuters', 'Shoppers', 'Tourists', 'Professionals', 'Students', 'Families', 'Everyone'];
const GOALS = [
  'Brand Awareness',
  'Product Launch',
  'Event Promotion',
  'Store Visits',
  'Mass Reach',
  'Local Awareness',
];
const FORMATS = [
  'Digital Billboards',
  'Mega Billboards',
  'Street Media',
  'Mall Media',
  'Transit',
  'Highways',
];

export default function CampaignBuilder({ onComplete }: CampaignBuilderProps) {
  const [selectedCity, setSelectedCity] = useState('London');
  const [selectedAudience, setSelectedAudience] = useState('Commuters');
  const [selectedGoal, setSelectedGoal] = useState('Brand Awareness');
  const [selectedFormat, setSelectedFormat] = useState('Digital Billboards');

  const screenCount =
    selectedFormat === 'Mega Billboards'
      ? 6
      : selectedFormat === 'Highways'
      ? 18
      : selectedFormat === 'Street Media'
      ? 42
      : selectedCity === 'New York'
      ? 24
      : 14;

  const estimatedReach =
    selectedCity === 'New York'
      ? '8.2M'
      : selectedCity === 'London'
      ? '6.4M'
      : selectedCity === 'Dubai'
      ? '5.1M'
      : '3.6M';

  const handleBuild = () => {
    onComplete({
      city: selectedCity,
      audience: selectedAudience,
      goal: selectedGoal,
      format: selectedFormat,
      screens: screenCount,
      impressions: `${estimatedReach} Weekly Impressions`,
    });
  };

  return (
    <section
      id="planner"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '4.5rem' }}>
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
            INTERACTIVE CAMPAIGN BUILDER
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
            WHERE DO YOU <br />
            <span style={{ color: '#1E56FF' }}>WANT TO BE SEEN?</span>
          </h2>

          <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '620px', lineHeight: 1.6 }}>
            Build a quick campaign and discover which outdoor formats could fit your goals.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Large Selectable Typographic Tiles */}
          <div
            style={{
              gridColumn: 'span 7',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
            }}
            className="builder-left-col"
          >
            {/* STEP 01 */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.85rem',
                }}
              >
                STEP 01 // CHOOSE YOUR CITY
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {CITIES.map((city) => {
                  const isSelected = selectedCity === city;
                  return (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      style={{
                        padding: '0.75rem 1.4rem',
                        borderRadius: '12px',
                        backgroundColor: isSelected ? '#1E56FF' : '#F7F5EF',
                        border: isSelected ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                        color: isSelected ? '#FFFFFF' : '#111111',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 02 */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.85rem',
                }}
              >
                STEP 02 // CHOOSE YOUR AUDIENCE
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {AUDIENCES.map((aud) => {
                  const isSelected = selectedAudience === aud;
                  return (
                    <button
                      key={aud}
                      onClick={() => setSelectedAudience(aud)}
                      style={{
                        padding: '0.75rem 1.4rem',
                        borderRadius: '12px',
                        backgroundColor: isSelected ? '#1E56FF' : '#F7F5EF',
                        border: isSelected ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                        color: isSelected ? '#FFFFFF' : '#111111',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {aud}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 03 */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.85rem',
                }}
              >
                STEP 03 // CHOOSE YOUR GOAL
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal;
                  return (
                    <button
                      key={goal}
                      onClick={() => setSelectedGoal(goal)}
                      style={{
                        padding: '0.75rem 1.4rem',
                        borderRadius: '12px',
                        backgroundColor: isSelected ? '#1E56FF' : '#F7F5EF',
                        border: isSelected ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                        color: isSelected ? '#FFFFFF' : '#111111',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 04 */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.85rem',
                }}
              >
                STEP 04 // CHOOSE YOUR FORMAT
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {FORMATS.map((fmt) => {
                  const isSelected = selectedFormat === fmt;
                  return (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      style={{
                        padding: '0.75rem 1.4rem',
                        borderRadius: '12px',
                        backgroundColor: isSelected ? '#1E56FF' : '#F7F5EF',
                        border: isSelected ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                        color: isSelected ? '#FFFFFF' : '#111111',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {fmt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Blueprint Summary Card */}
          <div style={{ gridColumn: 'span 5' }} className="builder-right-col">
            <div
              style={{
                position: 'sticky',
                top: '110px',
                padding: '2.5rem',
                borderRadius: '24px',
                backgroundColor: '#F7F5EF',
                border: '1.5px solid #1E56FF',
                boxShadow: '0 20px 50px rgba(30, 86, 255, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(17, 17, 17, 0.1)',
                  paddingBottom: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#1E56FF',
                    fontWeight: 800,
                  }}
                >
                  LIVE CAMPAIGN BLUEPRINT
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#111111',
                    border: '1px solid rgba(17, 17, 17, 0.08)',
                  }}
                >
                  CALCULATED
                </span>
              </div>

              {/* Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: '#666666' }}>City</span>
                  <span style={{ color: '#111111', fontWeight: 800 }}>{selectedCity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: '#666666' }}>Target Audience</span>
                  <span style={{ color: '#111111', fontWeight: 800 }}>{selectedAudience}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: '#666666' }}>Objective</span>
                  <span style={{ color: '#111111', fontWeight: 800 }}>{selectedGoal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: '#666666' }}>Format</span>
                  <span style={{ color: '#1E56FF', fontWeight: 800 }}>{selectedFormat}</span>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  marginBottom: '2rem',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666666' }}>
                    RECOMMENDED
                  </span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#111111' }}>
                    {screenCount} Screens
                  </p>
                </div>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666666' }}>
                    EST. WEEKLY REACH
                  </span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: '#1E56FF' }}>
                    {estimatedReach}
                  </p>
                </div>
              </div>

              {/* Ready Header */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                  }}
                >
                  YOUR CITY <span style={{ color: '#1E56FF' }}>IS READY.</span>
                </h4>
              </div>

              <button
                onClick={handleBuild}
                className="btn-primary"
                style={{ width: '100%', padding: '1.15rem' }}
                data-cursor="GENERATE"
              >
                BUILD MY CAMPAIGN
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .builder-left-col,
          .builder-right-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
