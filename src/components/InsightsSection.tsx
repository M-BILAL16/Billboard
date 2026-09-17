'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '../data/billboardData';

const ARTICLE_IMAGES = [
  '/images/daylight_hero.jpg',
  '/images/daylight_arch_vertical.jpg',
  '/images/street_after.jpg',
];

export default function InsightsSection() {
  return (
    <section
      id="insights"
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4.5rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
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
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={14} />
              FROM THE STREETS.
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
              }}
            >
              IDEAS. <br />
              CULTURE. <br />
              <span style={{ color: '#1E56FF' }}>ATTENTION.</span>
            </h2>
          </div>

          <a
            href="#insights"
            className="btn-secondary"
            data-cursor="ALL STORIES"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            VIEW ALL STORIES
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>

        {/* 3 Editorial Articles with Large Photography */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.5rem',
          }}
          className="insights-grid"
        >
          {INSIGHTS_ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              style={{
                borderRadius: '24px',
                backgroundColor: '#F7F5EF',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
              className="insight-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = '#1E56FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.08)';
              }}
            >
              {/* Photo Header */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
                <Image
                  src={ARTICLE_IMAGES[idx] || ARTICLE_IMAGES[0]}
                  alt={article.title}
                  fill
                  sizes="400px"
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    color: '#1E56FF',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  {article.category}
                </div>
              </div>

              {/* Text Body */}
              <div style={{ padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#888888',
                      display: 'block',
                      marginBottom: '0.6rem',
                    }}
                  >
                    ARTICLE // 0{article.number} • {article.readTime}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.4rem',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      color: '#111111',
                      marginBottom: '1rem',
                    }}
                  >
                    {article.title}
                  </h3>

                  <p style={{ color: '#555555', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {article.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#111111',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    marginTop: '2rem',
                    borderTop: '1px solid rgba(17, 17, 17, 0.08)',
                    paddingTop: '1.25rem',
                  }}
                >
                  READ STORY
                  <ArrowUpRight size={16} strokeWidth={2.5} color="#1E56FF" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .insights-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
