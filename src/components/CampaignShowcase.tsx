'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Sparkles, MapPin } from 'lucide-react';
import { FEATURED_CAMPAIGNS } from '../data/billboardData';
import { FeaturedCampaign } from '../types';

interface CampaignShowcaseProps {
  onSelectCampaign: (campaign: FeaturedCampaign) => void;
}

export default function CampaignShowcase({ onSelectCampaign }: CampaignShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="campaigns"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '9rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '5rem' }}>
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
            SEEN IN THE WILD.
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
            WORK THAT <br />
            BECAME PART <br />
            <span style={{ color: '#1E56FF' }}>OF THE CITY.</span>
          </h2>

          <p style={{ color: '#555555', fontSize: '1.2rem', maxWidth: '620px', lineHeight: 1.6 }}>
            Explore how the world’s most ambitious brands turned urban crossroads into culturally dominant moments.
          </p>
        </div>

        {/* Clean Editorial Portfolio - Alternating Compositions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {FEATURED_CAMPAIGNS.map((campaign, idx) => {
            const isEven = idx % 2 === 0;
            const isHovered = hoveredId === campaign.id;

            return (
              <div
                key={campaign.id}
                onMouseEnter={() => setHoveredId(campaign.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectCampaign(campaign)}
                data-cursor="VIEW"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '3rem',
                  alignItems: 'center',
                  padding: 'clamp(2rem, 3vw, 3rem)',
                  borderRadius: '24px',
                  backgroundColor: isHovered ? '#F7F5EF' : '#FFFFFF',
                  border: isHovered ? '1.5px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                  boxShadow: isHovered
                    ? '0 20px 50px rgba(0, 0, 0, 0.06)'
                    : '0 4px 16px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                }}
                className="campaign-portfolio-row"
              >
                {/* Image Column */}
                <div
                  style={{
                    gridColumn: isEven ? 'span 7' : 'span 7',
                    order: isEven ? 1 : 2,
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    borderRadius: '16px',
                    overflow: 'hidden',
                  }}
                  className="campaign-img-wrapper"
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#111111',
                    }}
                  >
                    CAMPAIGN // 0{campaign.number}
                  </div>
                </div>

                {/* Text Column */}
                <div
                  style={{
                    gridColumn: isEven ? 'span 5' : 'span 5',
                    order: isEven ? 2 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                  className="campaign-text-col"
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#666666',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                    }}
                  >
                    <MapPin size={13} color="#1E56FF" />
                    {campaign.city.toUpperCase()}, {campaign.country}
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: isHovered ? '#1E56FF' : '#111111',
                      transition: 'color 0.25s ease',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {campaign.brand}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                      letterSpacing: '-0.03em',
                      textTransform: 'uppercase',
                      color: isHovered ? '#1E56FF' : '#111111',
                      lineHeight: 1.05,
                      marginBottom: '1rem',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {campaign.title}
                  </h3>

                  <p
                    style={{
                      color: '#555555',
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      marginBottom: '1.75rem',
                    }}
                  >
                    {campaign.description}
                  </p>

                  {/* Metrics Badges */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      marginBottom: '2rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#111111',
                    }}
                  >
                    <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)' }}>
                      ✦ {campaign.metrics.impressions}
                    </span>
                    <span style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)' }}>
                      ✦ {campaign.metrics.lift}
                    </span>
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        color: '#111111',
                        borderBottom: '2px solid #1E56FF',
                        paddingBottom: '3px',
                      }}
                    >
                      VIEW CAMPAIGN
                      <ArrowUpRight size={16} strokeWidth={2.5} color="#1E56FF" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .campaign-portfolio-row {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .campaign-img-wrapper,
          .campaign-text-col {
            grid-column: span 12 !important;
            order: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
