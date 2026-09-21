'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export interface IndustryItem {
  id: string;
  number: string;
  title: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  specs: {
    audience: string;
    locationType: string;
    format: string;
    estimatedReach: string;
  };
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'retail',
    number: '01',
    title: 'RETAIL',
    category: 'STOREFRONT VISIBILITY',
    badge: 'STOREFRONT VISIBILITY',
    tagline: 'CUSTOMER ENGAGEMENT',
    description: 'Retail signage enhancing storefront visibility and customer engagement.',
    learnMoreUrl: 'https://signsny.com/industries/retail/',
    image: '/images/industry_retail.jpg',
    specs: {
      audience: 'NYC Pedestrians & Shoppers',
      locationType: 'Boutiques, Flagships & Malls',
      format: '3D Channel Letters & Blade Signs',
      estimatedReach: 'DOB & LPC Landmark Permitted',
    },
  },
  {
    id: 'restaurant',
    number: '02',
    title: 'RESTAURANT',
    category: 'HOSPITALITY & DINING',
    badge: 'ELEVATING DINING PRESENCE',
    tagline: 'PATRON ATTRACTION',
    description: 'Restaurant signage attracting customers and elevating dining presence.',
    learnMoreUrl: 'https://signsny.com/industries/restaurants/',
    image: '/images/industry_restaurant.jpg',
    specs: {
      audience: 'Dining Patrons & Foodies',
      locationType: 'Bistros, Rooftops & Cafes',
      format: 'Halo-Lit Letters & Awnings',
      estimatedReach: 'Sidewalk DCA Clearances',
    },
  },
  {
    id: 'manufacturing',
    number: '03',
    title: 'MANUFACTURING',
    category: 'INDUSTRIAL SAFETY',
    badge: 'OPERATIONAL EFFICIENCY',
    tagline: 'FACILITY INTEGRITY',
    description: 'Industrial signage improving facility safety and operational efficiency.',
    learnMoreUrl: 'https://signsny.com/industries/manufacturing-distribution/',
    image: '/images/industry_manufacturing.jpg',
    specs: {
      audience: 'Plant Staff & Logistics Fleets',
      locationType: 'Warehouses & Distribution Hubs',
      format: 'OSHA Warning & Directional Signs',
      estimatedReach: 'ANSI / OSHA / FDNY Certified',
    },
  },
  {
    id: 'schools-universities',
    number: '04',
    title: 'SCHOOLS & UNIVERSITIES',
    category: 'CAMPUS NAVIGATION',
    badge: 'SAFETY & BRAND IDENTITY',
    tagline: 'CAMPUS EXCELLENCE',
    description: 'Campus signage improving navigation, safety, and brand identity.',
    learnMoreUrl: 'https://signsny.com/industries/schools-and-universities/',
    image: '/images/industry_education.jpg',
    specs: {
      audience: 'Students, Faculty & Campus Visitors',
      locationType: 'Colleges, Academies & Dormitories',
      format: 'Monument Entrances & Wayfinding',
      estimatedReach: 'ADA Tactile & Braille Required',
    },
  },
  {
    id: 'hospital',
    number: '05',
    title: 'HOSPITAL',
    category: 'HEALTHCARE COMPLIANCE',
    badge: 'NAVIGATION & SAFETY',
    tagline: 'LIFE-SAVING WAYFINDING',
    description: 'Healthcare signage supporting navigation, compliance, and safety.',
    learnMoreUrl: 'https://signsny.com/industries/healthcare/',
    image: '/images/industry_hospital.jpg',
    specs: {
      audience: 'Patients, Doctors & Emergency Responders',
      locationType: 'Medical Centers & Clinics',
      format: 'Emergency Illuminated Cross & Plaques',
      estimatedReach: 'Strict ADA & NYC Fire Code 504',
    },
  },
  {
    id: 'city-government',
    number: '06',
    title: 'CITY & GOVERNMENT',
    category: 'CIVIC REGULATIONS',
    badge: 'PUBLIC NAVIGATION',
    tagline: 'MUNICIPAL DIGNITY',
    description: 'Municipal signage improving public navigation with regulations.',
    learnMoreUrl: 'https://signsny.com/industries/city-and-government/',
    image: '/images/industry_government.jpg',
    specs: {
      audience: 'NYC Citizens & Civic Visitors',
      locationType: 'Municipal Halls & Public Agendas',
      format: 'Cast Bronze Plaques & Crest Seals',
      estimatedReach: 'Federal & City Code Compliant',
    },
  },
  {
    id: 'construction',
    number: '07',
    title: 'CONSTRUCTION',
    category: 'JOB SITE SAFETY',
    badge: 'SITE SAFETY & BRANDING',
    tagline: 'DOB COMPLIANCE',
    description: 'Construction signage ensuring site safety, compliance, and branding.',
    learnMoreUrl: 'https://signsny.com/industries/construction-and-contractors/',
    image: '/images/industry_construction.jpg',
    specs: {
      audience: 'Contractors, Crews & City Inspectors',
      locationType: 'Scaffoldings, Fences & High-Rises',
      format: 'DOB Permit Boards & Mesh Wraps',
      estimatedReach: 'NYC Local Law 11 & Chapter 33',
    },
  },
  {
    id: 'corporate-offices',
    number: '08',
    title: 'CORPORATE OFFICES',
    category: 'WORKPLACE BRANDING',
    badge: 'PROFESSIONAL ENVIRONMENT',
    tagline: 'EXECUTIVE PRESTIGE',
    description: 'Office signage enhancing workplace branding, and professional environment.',
    learnMoreUrl: 'https://signsny.com/industries/corporate/',
    image: '/images/industry_corporate.jpg',
    specs: {
      audience: 'Clients, Partners & Staff',
      locationType: 'Corporate HQs & Boardrooms',
      format: '3D Lobby Metal Logos & Glass Decals',
      estimatedReach: 'Class-A Architectural Grade',
    },
  },
];

interface FormatExplorerProps {
  onSelectFormat?: (industryId: string) => void;
}

export default function FormatExplorer({ onSelectFormat }: FormatExplorerProps) {
  const [activeCardId, setActiveCardId] = useState<string>('retail');
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentIndex = INDUSTRIES_DATA.findIndex((ind) => ind.id === activeCardId);

  const handleSelectCard = (id: string, scroll = true) => {
    setActiveCardId(id);
    if (onSelectFormat) onSelectFormat(id);

    if (scroll && cardRefs.current[id]) {
      cardRefs.current[id]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + INDUSTRIES_DATA.length) % INDUSTRIES_DATA.length;
    handleSelectCard(INDUSTRIES_DATA[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % INDUSTRIES_DATA.length;
    handleSelectCard(INDUSTRIES_DATA[nextIndex].id);
  };

  return (
    <section
      id="industries"
      style={{
        position: 'relative',
        backgroundColor: '#F7F5EF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Target anchor for legacy #formats links */}
      <div id="formats" style={{ position: 'absolute', top: 0, left: 0 }} />

      <div className="container-custom">
        {/* Section Header & Slider Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3.5rem',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
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
              SPECIALIZED SIGNAGE BY INDUSTRY.
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
                marginBottom: '1.5rem',
              }}
            >
              EVERY INDUSTRY <br />
              DESERVES THE <br />
              <span style={{ color: '#1E56FF' }}>RIGHT LANDMARK.</span>
            </h2>

            <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '680px', lineHeight: 1.6 }}>
              From high-traffic retail storefronts and Michelin-starred dining facades to DOB-permitted construction safety signs, campus wayfinding, and corporate lobby branding. Explore tailored signage solutions engineered for your industry.
            </p>
          </div>

          {/* Slider Controls & Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingBottom: '0.5rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                color: '#666666',
                letterSpacing: '0.08em',
                backgroundColor: '#FFFFFF',
                padding: '0.65rem 1.1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(17, 17, 17, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
              }}
            >
              <span style={{ color: '#1E56FF' }}>0{currentIndex + 1}</span> / 0{INDUSTRIES_DATA.length}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Industry"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(17, 17, 17, 0.12)',
                  color: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E56FF';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#1E56FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.12)';
                }}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Industry"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(17, 17, 17, 0.12)',
                  color: '#111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E56FF';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#1E56FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.12)';
                }}
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Accordion Expanding Cards Slider Row */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '1.25rem',
            minHeight: '660px',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingBottom: '1.5rem',
            paddingTop: '0.5rem',
            scrollBehavior: 'smooth',
          }}
          className="format-cards-container no-scrollbar"
        >
          {INDUSTRIES_DATA.map((ind) => {
            const isExpanded = activeCardId === ind.id;

            return (
              <div
                key={ind.id}
                ref={(el) => {
                  cardRefs.current[ind.id] = el;
                }}
                onMouseEnter={() => handleSelectCard(ind.id, false)}
                onClick={() => handleSelectCard(ind.id, true)}
                data-cursor={isExpanded ? 'ACTIVE INDUSTRY' : 'EXPAND'}
                style={{
                  position: 'relative',
                  flex: isExpanded
                    ? '0 0 clamp(540px, 46vw, 680px)'
                    : '0 0 clamp(160px, 12.5vw, 195px)',
                  minWidth: isExpanded ? 'clamp(540px, 46vw, 680px)' : 'clamp(160px, 12.5vw, 195px)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isExpanded ? '2px solid #1E56FF' : '1.5px solid rgba(17, 17, 17, 0.08)',
                  boxShadow: isExpanded
                    ? '0 25px 60px rgba(30, 86, 255, 0.16), 0 8px 24px rgba(0, 0, 0, 0.06)'
                    : '0 6px 20px rgba(0, 0, 0, 0.03)',
                  transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.6s cubic-bezier(0.16, 1, 0.3, 1), border 0.3s ease, box-shadow 0.3s ease',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.75rem',
                }}
                className="format-card"
              >
                {/* Background Image Layer */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    transform: isExpanded ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: 'cover',
                      filter: isExpanded
                        ? 'brightness(0.96) contrast(1.05)'
                        : 'brightness(0.82) saturate(0.85)',
                      transition: 'filter 0.5s ease',
                    }}
                  />
                  {/* Subtle Gradient Overlay for High Readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isExpanded
                        ? 'linear-gradient(180deg, rgba(247, 245, 239, 0.25) 0%, rgba(247, 245, 239, 0) 30%, rgba(0, 0, 0, 0.45) 100%)'
                        : 'linear-gradient(180deg, rgba(247, 245, 239, 0.35) 0%, rgba(0, 0, 0, 0.5) 100%)',
                      transition: 'background 0.4s ease',
                    }}
                  />
                </div>

                {/* Card Top: Number & Category Badge */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: isExpanded ? '#1E56FF' : '#111111',
                      backgroundColor: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(12px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      transition: 'color 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ind.number}
                  </span>

                  <span
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      backgroundColor: isExpanded ? '#1E56FF' : 'rgba(255, 255, 255, 0.94)',
                      color: isExpanded ? '#FFFFFF' : '#111111',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    {ind.badge}
                  </span>
                </div>

                {/* Card Bottom: Collapsed Preview vs Expanded Full Content */}
                <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
                  {!isExpanded ? (
                    /* Collapsed Title Capsule */
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        textAlign: 'center',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: '1rem',
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                          textTransform: 'uppercase',
                          color: '#111111',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ind.title}
                      </h3>
                    </div>
                  ) : (
                    /* Expanded Editorial Details Card */
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.96)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: 'clamp(1.25rem, 2vw, 2rem)',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
                        border: '1.5px solid rgba(255, 255, 255, 0.9)',
                        animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: '#1E56FF',
                          fontWeight: 800,
                          letterSpacing: '0.1em',
                          marginBottom: '0.35rem',
                        }}
                      >
                        <span>SECTOR {ind.number}</span>
                        <span>•</span>
                        <span>{ind.tagline}</span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: 'clamp(1.6rem, 2.4vw, 2.5rem)',
                          lineHeight: 1.02,
                          letterSpacing: '-0.03em',
                          textTransform: 'uppercase',
                          color: '#111111',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {ind.title}
                      </h3>

                      <p
                        style={{
                          color: '#555555',
                          fontSize: '0.96rem',
                          lineHeight: 1.55,
                          marginBottom: '1.5rem',
                          maxWidth: '560px',
                        }}
                      >
                        {ind.description}
                      </p>

                      {/* Specs 4-Box Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.75rem',
                          padding: '1rem',
                          borderRadius: '14px',
                          backgroundColor: '#F7F5EF',
                          border: '1px solid rgba(17, 17, 17, 0.06)',
                          marginBottom: '1.5rem',
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            PRIMARY AUDIENCE
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#111111' }}>
                            {ind.specs.audience}
                          </span>
                        </div>

                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            KEY ENVIRONMENTS
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#111111' }}>
                            {ind.specs.locationType}
                          </span>
                        </div>

                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            ENGINEERED FORMAT
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E56FF' }}>
                            {ind.specs.format}
                          </span>
                        </div>

                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              color: '#888888',
                              display: 'block',
                              marginBottom: '2px',
                            }}
                          >
                            COMPLIANCE / PERMITS
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#111111' }}>
                            {ind.specs.estimatedReach}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Learn More Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                          href={ind.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{
                            padding: '0.8rem 1.8rem',
                            fontSize: '0.84rem',
                            gap: '0.6rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          LEARN MORE
                          <ExternalLink size={15} strokeWidth={2.5} />
                        </a>

                        <a
                          href="#quote"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: '#111111',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textDecoration: 'none',
                            padding: '0.65rem 1rem',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(17, 17, 17, 0.05)',
                          }}
                        >
                          GET A QUOTE FOR {ind.title}
                          <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 768px) {
          .format-card {
            min-height: 520px !important;
          }
        }
      `}</style>
    </section>
  );
}
