'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle, Sparkles, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { FeaturedCampaign } from '../types';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: {
    city?: string;
    audience?: string;
    goal?: string;
    format?: string;
    screens?: number;
    impressions?: string;
  } | null;
  mode?: 'campaign' | 'showreel' | 'case-study';
  caseStudy?: FeaturedCampaign | null;
}

export default function CampaignModal({
  isOpen,
  onClose,
  initialConfig,
  mode = 'campaign',
  caseStudy,
}: CampaignModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    budget: '$50k - $150k',
    launchDate: 'Q4 2026',
    notes: '',
  });
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(17, 17, 17, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: mode === 'showreel' ? '920px' : '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(17, 17, 17, 0.1)',
          borderRadius: '28px',
          padding: 'clamp(2rem, 4vw, 3.5rem)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.15)',
          color: '#111111',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: '#F7F5EF',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            color: '#111111',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1E56FF';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F7F5EF';
            e.currentTarget.style.color = '#111111';
          }}
        >
          <X size={18} />
        </button>

        {/* SHOWREEL MODE */}
        {mode === 'showreel' && (
          <div>
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
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              SIGNS NYC IN-HOUSE FABRICATION SHOWCASE
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              TOUR OUR 10,000 SQ FT NYC PRODUCTION PLANT
            </h3>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#111111',
                marginBottom: '1.5rem',
              }}
            >
              <Image
                src="/images/daylight_hero.jpg"
                alt="Showreel Preview"
                fill
                sizes="800px"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 100%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '10px',
                  color: '#111111',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#1E56FF',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                    }}
                  >
                    SIGNS NYC PRODUCTION TOUR // 02:45
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1E56FF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#666666' }}>
                    STEREO
                  </span>
                </div>
              </div>
            </div>

            <p style={{ color: '#555555', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Featuring CNC routers, fiber laser cutters, channel letter bending machines, and certified boom-truck installation crews across all 5 boroughs.
            </p>
          </div>
        )}

        {/* CASE STUDY MODE */}
        {mode === 'case-study' && caseStudy && (
          <div>
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
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              CASE STUDY // {caseStudy.brand} {caseStudy.city.toUpperCase()}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              {caseStudy.title}
            </h3>

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '1.5rem',
              }}
            >
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                sizes="650px"
                style={{ objectFit: 'cover' }}
              />
            </div>

            <p style={{ color: '#444444', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              {caseStudy.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: '16px',
                backgroundColor: '#F7F5EF',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                marginBottom: '2rem',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666666' }}>
                  IMPRESSIONS
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#111111' }}>
                  {caseStudy.metrics.impressions}
                </p>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666666' }}>
                  EFFECTIVENESS
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#1E56FF' }}>
                  {caseStudy.metrics.lift}
                </p>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#666666' }}>
                  FLIGHT
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#111111' }}>
                  {caseStudy.metrics.duration}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CAMPAIGN BOOKING FORM */}
        {mode === 'campaign' && (
          <div>
            {!isSubmitted ? (
              <>
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
                    marginBottom: '1rem',
                  }}
                >
                  <Sparkles size={14} />
                  REQUEST AN ARCHITECTURAL SIGN QUOTE
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  START YOUR <br />
                  <span style={{ color: '#1E56FF' }}>NYC SIGN PROJECT.</span>
                </h3>

                <p style={{ color: '#555555', fontSize: '0.95rem', marginBottom: '2rem' }}>
                  Get engineered fabrication estimates, site survey scheduling, and NYC Department of Buildings (DOB)
                  permit expediting within 2 business hours.
                </p>

                {initialConfig && (
                  <div
                    style={{
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(30, 86, 255, 0.08)',
                      border: '1px solid rgba(30, 86, 255, 0.25)',
                      marginBottom: '1.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      color: '#111111',
                      fontWeight: 700,
                    }}
                  >
                    <span>📍 <strong>Borough:</strong> {initialConfig.city}</span>
                    <span>🎯 <strong>Format:</strong> {initialConfig.format}</span>
                    <span>⚡ <strong>Est. Turnaround:</strong> {initialConfig.impressions}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#111111',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '0.4rem',
                      }}
                    >
                      BUSINESS / ORGANIZATION NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SoHo Retail, Midtown Eatery, General Contractor"
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1.25rem',
                        borderRadius: '12px',
                        backgroundColor: '#F7F5EF',
                        border: '1px solid rgba(17, 17, 17, 0.12)',
                        color: '#111111',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#111111',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        marginBottom: '0.4rem',
                      }}
                    >
                      WORK EMAIL OR PHONE NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="project@yourbrand.com or (718) 555-0100"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.9rem 1.25rem',
                        borderRadius: '12px',
                        backgroundColor: '#F7F5EF',
                        border: '1px solid rgba(17, 17, 17, 0.12)',
                        color: '#111111',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: '#111111',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          marginBottom: '0.4rem',
                        }}
                      >
                        PROJECT BUDGET RANGE
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.25rem',
                          borderRadius: '12px',
                          backgroundColor: '#F7F5EF',
                          border: '1px solid rgba(17, 17, 17, 0.12)',
                          color: '#111111',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.95rem',
                          outline: 'none',
                        }}
                      >
                        <option value="$2,500 - $7,500">$2,500 - $7,500 (Lobby / Dimensional Letters)</option>
                        <option value="$7,500 - $25,000">$7,500 - $25,000 (Channel Letters & Storefront Awning)</option>
                        <option value="$25,000 - $75,000">$25,000 - $75,000 (Full Multi-Floor / Flagship Package)</option>
                        <option value="$75,000+">$75,000+ (Multi-Location / Scaffold Wrap)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: '#111111',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          marginBottom: '0.4rem',
                        }}
                      >
                        TARGET INSTALLATION TIMELINE
                      </label>
                      <select
                        value={formData.launchDate}
                        onChange={(e) => setFormData({ ...formData, launchDate: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.25rem',
                          borderRadius: '12px',
                          backgroundColor: '#F7F5EF',
                          border: '1px solid rgba(17, 17, 17, 0.12)',
                          color: '#111111',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.95rem',
                          outline: 'none',
                        }}
                      >
                        <option value="Emergency Rush (24-48 Hours)">Emergency Rush (24-48 Hours)</option>
                        <option value="Standard Fabrication (1-2 Weeks)">Standard Fabrication (1-2 Weeks)</option>
                        <option value="DOB Expedited (3-4 Weeks)">DOB Expedited (3-4 Weeks)</option>
                        <option value="Architectural / GC Partner">Architectural / GC Partner</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '1.2rem', marginTop: '1rem' }}
                    data-cursor="SUBMIT"
                  >
                    REQUEST FREE ESTIMATE & CODE REVIEW
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(30, 86, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1E56FF',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <CheckCircle size={36} />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  PROJECT SPECIFICATION RECEIVED.
                </h3>
                <p style={{ color: '#555555', fontSize: '1rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
                  Our fabrication engineers and permit expediters have received your sign parameters for{' '}
                  <strong style={{ color: '#111111' }}>{formData.brandName || 'your business'}</strong>. We will review DOB zoning and contact{' '}
                  <span style={{ color: '#1E56FF' }}>{formData.email}</span> within 2 business hours.
                </p>
                <button onClick={onClose} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>
                  RETURN TO SITE
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
