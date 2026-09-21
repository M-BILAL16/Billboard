'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck,
  Layers,
  Send,
} from 'lucide-react';

interface CampaignBuilderProps {
  onComplete?: (config: {
    city: string;
    audience: string;
    goal: string;
    format: string;
    screens: number;
    impressions: string;
  }) => void;
}

const BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island', 'Tri-State Area'];

const SIGN_TYPES = [
  'Illuminated Channel Letters',
  'Blade / Projecting Sign',
  'Lobby & Reception Sign',
  'Storefront Awning & Fascia',
  'Metal Plaque & Dimensional',
  'Custom Neon & LED',
  'Window & Wall Vinyl Wraps',
  'DOB Permit Expediting Only',
];

const TIMELINES = ['Emergency (Under 1 Week)', 'Standard (1-2 Weeks)', 'Flexible (1+ Month)'];

export default function CampaignBuilder({ onComplete }: CampaignBuilderProps) {
  // Form State
  const [selectedBorough, setSelectedBorough] = useState('Manhattan');
  const [selectedSignType, setSelectedSignType] = useState('Illuminated Channel Letters');
  const [timeline, setTimeline] = useState('Standard (1-2 Weeks)');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate swift submission
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);

      if (onComplete) {
        onComplete({
          city: selectedBorough,
          audience: selectedSignType,
          goal: companyName || 'Custom Storefront Sign',
          format: 'Turnkey Fabrication & DOB Permits',
          screens: 1,
          impressions: '100% In-House Fabrication Scope',
        });
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setProjectNotes('');
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
      {/* Background Architectural Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(17, 17, 17, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 17, 17, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ maxWidth: '860px', marginBottom: '4rem' }}>
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
            INTERACTIVE SIGN SPECIFICATION BUILDER
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
            WHERE IS YOUR <br />
            <span style={{ color: '#1E56FF' }}>NEXT NYC PROJECT?</span>
          </h2>

          <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Configure your custom sign requirements and receive an instant fabrication scope and DOB code assessment.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Streamlined Simple Project Form */}
          <div style={{ gridColumn: 'span 7' }} className="builder-left-col">
            <div
              style={{
                backgroundColor: '#F7F5EF',
                borderRadius: '24px',
                padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                border: '1.5px solid rgba(17, 17, 17, 0.08)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.04)',
              }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {/* Step 1: Select NYC Borough */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: '#1E56FF',
                        textTransform: 'uppercase',
                        marginBottom: '0.75rem',
                      }}
                    >
                      01 // PROJECT BOROUGH
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {BOROUGHS.map((borough) => {
                        const isSelected = selectedBorough === borough;
                        return (
                          <button
                            type="button"
                            key={borough}
                            onClick={() => setSelectedBorough(borough)}
                            style={{
                              padding: '0.5rem 0.95rem',
                              borderRadius: '9999px',
                              backgroundColor: isSelected ? '#1E56FF' : '#FFFFFF',
                              color: isSelected ? '#FFFFFF' : '#333333',
                              border: isSelected ? '1.5px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.12)',
                              fontFamily: 'var(--font-display)',
                              fontWeight: 800,
                              fontSize: '0.85rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: isSelected ? '0 4px 12px rgba(30, 86, 255, 0.25)' : 'none',
                            }}
                          >
                            {borough}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Select Sign Category */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: '#1E56FF',
                        textTransform: 'uppercase',
                        marginBottom: '0.75rem',
                      }}
                    >
                      02 // SIGNAGE TYPE NEEDED
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {SIGN_TYPES.map((type) => {
                        const isSelected = selectedSignType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setSelectedSignType(type)}
                            style={{
                              padding: '0.5rem 0.85rem',
                              borderRadius: '10px',
                              backgroundColor: isSelected ? '#111111' : '#FFFFFF',
                              color: isSelected ? '#FFFFFF' : '#333333',
                              border: isSelected ? '1.5px solid #111111' : '1px solid rgba(17, 17, 17, 0.12)',
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '0.82rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: isSelected ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Contact & Business Details */}
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: '#1E56FF',
                        textTransform: 'uppercase',
                        marginBottom: '0.75rem',
                      }}
                    >
                      03 // CONTACT & SPECIFICATIONS
                    </label>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem',
                      }}
                    >
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444444', marginBottom: '0.3rem' }}>
                          Your Name *
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Rivera"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(17, 17, 17, 0.14)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: '#111111',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#1E56FF')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.14)')}
                        />
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444444', marginBottom: '0.3rem' }}>
                          Company / Brand Name *
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lumina Hospitality Group"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(17, 17, 17, 0.14)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: '#111111',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#1E56FF')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.14)')}
                        />
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444444', marginBottom: '0.3rem' }}>
                          Email Address *
                        </span>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(17, 17, 17, 0.14)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: '#111111',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#1E56FF')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.14)')}
                        />
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444444', marginBottom: '0.3rem' }}>
                          Phone Number *
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="(212) 555-0199"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid rgba(17, 17, 17, 0.14)',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: '#111111',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease',
                          }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#1E56FF')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.14)')}
                        />
                      </div>
                    </div>

                    {/* Timeline & Project Notes */}
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444444', marginBottom: '0.3rem' }}>
                        Required Timeline
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {TIMELINES.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setTimeline(t)}
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: '9999px',
                              backgroundColor: timeline === t ? 'rgba(30, 86, 255, 0.12)' : '#FFFFFF',
                              color: timeline === t ? '#1E56FF' : '#555555',
                              border: timeline === t ? '1.5px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.1)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444444', marginBottom: '0.3rem' }}>
                        Project Details, Dimensions, or NYC Address (Optional)
                      </span>
                      <textarea
                        rows={3}
                        placeholder="e.g. 5th Avenue storefront, need illuminated channel letters, blade sign, and full DOB permit management..."
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(17, 17, 17, 0.14)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.88rem',
                          color: '#111111',
                          outline: 'none',
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s ease',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#1E56FF')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.14)')}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      fontSize: '0.95rem',
                      fontWeight: 900,
                      cursor: submitting ? 'wait' : 'pointer',
                      borderRadius: '14px',
                    }}
                  >
                    {submitting ? (
                      <span>TRANSMITTING SCOPE...</span>
                    ) : (
                      <>
                        <span>SUBMIT SPECIFICATION FOR INSTANT SCOPE & QUOTE</span>
                        <ArrowRight size={18} strokeWidth={2.5} />
                      </>
                    )}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', fontSize: '0.72rem', color: '#666666' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={13} color="#10B981" /> No Obligation Free Quote
                    </span>
                    <span>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={13} color="#10B981" /> 2-Hour Estimate Turnaround
                    </span>
                  </div>
                </form>
              ) : (
                /* Instant Success State */
                <div
                  style={{
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center',
                    animation: 'fadeIn 0.35s ease',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      border: '2px solid #10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                    }}
                  >
                    <CheckCircle2 size={32} color="#10B981" strokeWidth={2.5} />
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#059669',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    SPECIFICATION TRANSMITTED // REF #{Math.floor(100000 + Math.random() * 900000)}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                      fontWeight: 900,
                      color: '#111111',
                      marginBottom: '1rem',
                      lineHeight: 1.15,
                    }}
                  >
                    WE’VE RECEIVED YOUR PROJECT REQUIREMENTS!
                  </h3>

                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#555555',
                      lineHeight: 1.6,
                      maxWidth: '520px',
                      margin: '0 auto 2rem auto',
                    }}
                  >
                    Thank you, <strong style={{ color: '#111111' }}>{fullName || 'valued client'}</strong>. Our senior NYC engineering and estimating team is reviewing your{' '}
                    <strong style={{ color: '#1E56FF' }}>{selectedSignType}</strong> specification for{' '}
                    <strong style={{ color: '#111111' }}>{selectedBorough}</strong>. You will receive an itemized proposal and DOB code assessment within 2 business hours.
                  </p>

                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      maxWidth: '460px',
                      margin: '0 auto 2rem auto',
                      textAlign: 'left',
                      border: '1px solid rgba(17, 17, 17, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      <span style={{ color: '#777777' }}>Borough Location:</span>
                      <strong style={{ color: '#111111' }}>{selectedBorough}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      <span style={{ color: '#777777' }}>Signage Format:</span>
                      <strong style={{ color: '#1E56FF' }}>{selectedSignType}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                      <span style={{ color: '#777777' }}>Target Timeline:</span>
                      <strong style={{ color: '#111111' }}>{timeline}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: '#777777' }}>Email Confirmation To:</span>
                      <strong style={{ color: '#111111' }}>{email || 'Your Email'}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    style={{
                      padding: '0.65rem 1.4rem',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid rgba(17, 17, 17, 0.15)',
                      color: '#111111',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    SUBMIT ANOTHER PROJECT SCOPE
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: In-House Fabrication Scope & Direct NYC Facility Telemetry */}
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
              {/* Header */}
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
                    fontSize: '0.74rem',
                    color: '#1E56FF',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                  }}
                >
                  WHAT YOU RECEIVE
                </span>
                <span
                  style={{
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    color: '#059669',
                    fontWeight: 800,
                    border: '1px solid rgba(5, 150, 105, 0.25)',
                  }}
                >
                  GUARANTEED IN 2 HOURS
                </span>
              </div>

              {/* 3 Value Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      border: '1px solid rgba(17, 17, 17, 0.08)',
                    }}
                  >
                    <FileCheck size={18} color="#1E56FF" />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.98rem', color: '#111111', margin: '0 0 0.2rem 0' }}>
                      Itemized Fabrication Scope
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.45, margin: 0 }}>
                      Complete breakdown of laser-cut aluminum, acrylic, UL-listed LED modules, and power supplies.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      border: '1px solid rgba(17, 17, 17, 0.08)',
                    }}
                  >
                    <ShieldCheck size={18} color="#1E56FF" />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.98rem', color: '#111111', margin: '0 0 0.2rem 0' }}>
                      NYC DOB & LPC Permit Review
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.45, margin: 0 }}>
                      Zoning compliance check for street projection, height regulations, and landmark district approvals.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      border: '1px solid rgba(17, 17, 17, 0.08)',
                    }}
                  >
                    <Clock size={18} color="#1E56FF" />
                  </div>
                  <div>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.98rem', color: '#111111', margin: '0 0 0.2rem 0' }}>
                      Rapid Production Timeline
                    </h5>
                    <p style={{ fontSize: '0.82rem', color: '#666666', lineHeight: 1.45, margin: 0 }}>
                      Standard 3-7 business day turnaround directly from our 10,000 sq ft NYC fabrication facility.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct NYC Contact Box */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <Building2 size={16} color="#1E56FF" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: '#111111' }}>
                    SIGNS NYC HEADQUARTERS & PLANT
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <a
                    href="tel:7187847444"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#111111',
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    <Phone size={14} color="#1E56FF" />
                    <span>(718) 784-7444 (Direct Estimating Line)</span>
                  </a>

                  <a
                    href="mailto:sales@signsny.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#555555',
                      textDecoration: 'none',
                    }}
                  >
                    <Mail size={14} color="#1E56FF" />
                    <span>sales@signsny.com</span>
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#777777', fontSize: '0.78rem' }}>
                    <MapPin size={14} color="#666666" />
                    <span>10,000 Sq Ft Facility • Long Island City, NY</span>
                  </div>
                </div>
              </div>

              {/* Trust Strip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  color: '#777777',
                  borderTop: '1px solid rgba(17, 17, 17, 0.08)',
                  paddingTop: '1rem',
                }}
              >
                <span>LICENSED NYC SIGN HANGER</span>
                <span>•</span>
                <span>UL LISTED #E351404</span>
              </div>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
