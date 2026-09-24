'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const navItems = [
    { label: 'About Us', href: '/about' },
    { label: 'Sign Categories', href: '/#products' },
    { label: 'Boroughs', href: '/#locations' },
    { label: 'Installations', href: '/#transformations' },
    { label: 'DOB Permits', href: '/#permits' },
    { label: 'Client Reviews', href: '/#testimonials' },
    { label: 'Planner', href: '/#planner' },
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
        {/* Directory Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '3rem',
            marginBottom: '5rem',
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
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
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
                    {item.label}
                  </Link>
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
