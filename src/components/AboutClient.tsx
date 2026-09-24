'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Building2,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  ChevronRight,
  Layers,
  Flame,
  Wrench,
  Truck,
  FileCheck,
  Compass,
  Cpu,
  Paintbrush,
  Zap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CampaignModal from '@/components/CampaignModal';
import { FeaturedCampaign } from '@/types';

// Facility Department Data
const FACILITY_DEPARTMENTS = [
  {
    id: 'cnc-waterjet',
    title: 'CNC Routing & Metalworking Lab',
    badge: 'SUB-MILLIMETER PRECISION',
    icon: Cpu,
    tagline: '5-Axis CNC Routers & High-Pressure Waterjet Milling',
    description:
      'Our metal fabrication floor features computerized 5-axis CNC routing and precision waterjet cutting capable of slicing 316-grade stainless steel, architectural brass, solid bronze, aircraft aluminum, and high-density urethane (HDU) with micrometer accuracy. From complex 3D filigree to structural 14-foot corporate logos, every edge is deburred, beveled, and finished in-house.',
    specs: [
      '5-Axis Multicam & AXYZ CNC Routers',
      'Solid Brass, Bronze, Stainless & Aluminum',
      'CAD / CAM & Direct Revit / BIM Import',
      'Structural Steel Truss Welding & Anchors',
    ],
    image: '/Signsny/Indoor Signs/Metal Letters/Types/Fabricated Metal/Fabricated Metal.jpg',
  },
  {
    id: 'channel-neon',
    title: 'Automated Channel Letters & Neon Studio',
    badge: 'UL 48 LISTED ELECTRICAL',
    icon: Zap,
    tagline: 'Computerized Return Benders & Glass-Blowing Artisans',
    description:
      'We combine computerized precision return benders with the rare art of traditional hand-blown glass neon. Every channel letter is formed from heavy-gauge aluminum coil, backed with high-efficiency 6500K Nichia or Samsung LED modules, and wired according to Underwriters Laboratories (UL 48) electric sign standards. Zero cold spots, flawless halo diffusion, and decades of reliable illumination.',
    specs: [
      'Automated Computerized Return Bending',
      'Hand-Bent Authentic Glass Neon Tubes',
      'UL 48 Certified Wiring & Low-Voltage Drivers',
      'Reverse Halo, Front-Lit & Edge-Lit Optics',
    ],
    image: '/Signsny/Outdoor Signs/Channel Letters/Channel Letters.jpg.webp',
  },
  {
    id: 'paint-finish',
    title: 'Matthews Paint & Architectural Clearcoats',
    badge: 'CLIMATE-CONTROLLED SPRAY BOOTH',
    icon: Paintbrush,
    tagline: 'Computerized Spectrometer PMS & RAL Color Matching',
    description:
      'Our positive-pressure, climate-controlled paint facility utilizes the world-renowned Matthews Paint System. Using digital spectrometer matching, we replicate exact corporate Pantone, RAL, and custom architectural finishes. Every exterior sign is sealed with automotive-grade UV salt-shield clearcoats engineered to withstand NYC harbor humidity, road salt, and harsh acid rain.',
    specs: [
      'Matthews Paint System (MAP) Certified',
      'Digital Spectrometer Color Formulation',
      'UV Salt-Shield Marine Grade Clearcoats',
      'Anodized, Brushed & Antique Patina Finishes',
    ],
    image: '/Signsny/Outdoor Signs/Blade Signs/Blade Signs.jpg.webp',
  },
  {
    id: 'large-format',
    title: 'Large-Format UV Direct-to-Substrate',
    badge: '10-FOOT SEAMLESS PRINTING',
    icon: Layers,
    tagline: 'Industrial UV Flatbed & Direct-to-Rigid Technology',
    description:
      'Printing directly onto glass, acrylic, wood, Dibond, aluminum, and perforated window film at up to 1200 DPI. Our industrial UV flatbeds cure inks instantly with cold LED lamps, delivering high opacity, rich saturation, and pure double-hit white ink layers. Ideal for 90-foot building facade wraps, retail vitrine graphics, and museum-grade gallery signage.',
    specs: [
      'Direct UV Printing on Rigid Substrates up to 2" Thick',
      'Dual-Head High-Density White & Varnish Inks',
      '3M Cast Vinyl & 70/30 One-Way Perforated Wraps',
      'Flame-Retardant Scaffolding & Sidewalk Mesh',
    ],
    image: '/images/intro_real_signs.jpg',
  },
  {
    id: 'rigging-fleet',
    title: 'Crane Fleet & Master Sign Hanger Field Operations',
    badge: 'DOB CLASS 1 LICENSED CREWS',
    icon: Truck,
    tagline: 'Bucket Trucks, Crane Hoists & 24/7 Field Rigging',
    description:
      'Operating our own fleet of crane hoists, boom trucks, and certified mobile rigging platforms, Signs NYC eliminates third-party scheduling delays. Our field technicians are OSHA 30 certified and led by a licensed NYC Master Sign Hanger. We specialize in complex high-rise picks, off-hours Times Square crane operations, and street closure traffic management across all five boroughs.',
    specs: [
      'In-House Crane Trucks & Boom Platforms',
      'NYC Master Sign Hanger Class 1 License #000185',
      'DOT Street Closure & Pedestrian Canopy Plans',
      '24/7 Emergency Storm Damage & Repair Response',
    ],
    image: '/Signsny/Vehicle Wraps/Van Wrapping/Van Wrapping.jpg.webp',
  },
];

// Historical Timeline Milestones
const TIMELINE_MILESTONES = [
  {
    year: '1989',
    phase: 'THE BROOKLYN WORKSHOP',
    title: 'Rooted in Traditional Craftsmanship',
    copy: 'Founded as a boutique sign-painting and guilding shop in Brooklyn. We hand-carved redwood signs, lettered gold leaf on bank glass, and bent authentic glass neon for neighborhood storefronts.',
    metric: 'Est. 1989',
  },
  {
    year: '1996',
    phase: 'DOB CLASS 1 CERTIFICATION',
    title: 'Master Sign Hanger License #000185',
    copy: 'Earned the elite NYC Department of Buildings (DOB) Class 1 Master Sign Hanger license. Enabled our crews to engineer structural facade steel and execute multi-story crane picks across Manhattan.',
    metric: 'DOB Class 1',
  },
  {
    year: '2006',
    phase: 'THE 10,000 SQ FT EXPANSION',
    title: 'Industrial Manufacturing Plant',
    copy: 'Consolidated into a dedicated 10,000 sq ft production plant. Invested in multi-axis CNC routers, automated channel letter return benders, and a Matthews architectural paint mixing laboratory.',
    metric: '10,000 Sq Ft',
  },
  {
    year: '2015',
    phase: 'VEHICLE FLEET & DIGITAL REVOLUTION',
    title: '3M MCS Platinum Certified Center',
    copy: 'Expanded into large-scale vehicle fleet branding and architectural window films. Outfitted climate-controlled vehicle wrap bays capable of handling 50-bus municipal and corporate fleets simultaneously.',
    metric: '3M MCS Platinum',
  },
  {
    year: '2026',
    phase: 'NEW YORK’S ARCHITECTURAL BENCHMARK',
    title: 'The Skyline’s Trusted Fabrication Partner',
    copy: 'Today, Signs NYC stands as the city’s premier turnkey signage manufacturer. From flagship channel letters on Fifth Avenue to historic Landmark Preservation Commission restorations, we shape how New York is seen.',
    metric: '850+ Landmarks',
  },
];

// Technical Certifications & Standards
const CERTIFICATIONS = [
  {
    title: 'NYC DOB CLASS 1 MASTER SIGN HANGER',
    subtitle: 'License #000185',
    detail: 'Authorized by the NYC Department of Buildings for unlimited structural size, crane picks, and high-rise facade mountings in all 5 boroughs.',
    badge: 'DOB SPECIAL SIGN HANGER',
    icon: Building2,
  },
  {
    title: 'UL 48 ELECTRIC SIGN LISTED',
    subtitle: 'Underwriters Laboratories',
    detail: 'Every illuminated sign, LED module, channel letter, and lightbox is assembled and stamped to meet strict UL 48 fire and electrical safety standards.',
    badge: 'UL CERTIFIED #E482910',
    icon: Zap,
  },
  {
    title: '3M MCS GRAPHICS PLATINUM FABRICATOR',
    subtitle: 'Matched Component System',
    detail: 'Certified 3M manufacturer and installer offering the complete 3M MCS 7-year warranty against UV fading, peeling, and harsh road salt exposure.',
    badge: '3M PLATINUM CERTIFIED',
    icon: ShieldCheck,
  },
  {
    title: 'ASTM E84 CLASS A FIRE RATED',
    subtitle: 'Surface Burning Characteristics',
    detail: 'All architectural interior films, elevator cab wraps, and lobby wall graphics strictly meet ASTM E84 Class A flame spread and smoke development codes.',
    badge: 'CLASS A FIRE RATED',
    icon: Flame,
  },
  {
    title: 'NYC DOT OUTDOOR DINING COMPLIANT',
    subtitle: 'Department of Transportation',
    detail: 'Custom sidewalk cafe barriers, wind screens, and entrance vestibules engineered to pass NYC DOT sidewalk and roadway outdoor dining regulations on day one.',
    badge: 'DOT COMPLIANT',
    icon: Compass,
  },
  {
    title: 'OSHA 30 FIELD INSTALLATION CREWS',
    subtitle: 'Jobsite Safety Certified',
    detail: 'Every field rigger, boom operator, and crane supervisor holds current OSHA 30 construction credentials with comprehensive commercial liability insurance.',
    badge: 'OSHA 30 CERTIFIED',
    icon: Wrench,
  },
];

// Master Craftsmen Team Profiles
const LEADERSHIP_TEAM = [
  {
    name: 'Dov Silberman',
    role: 'Founder & Licensed Master Sign Hanger',
    experience: '35+ Years in NYC Signage',
    bio: 'Oversees structural rigging, complex crane picks, and DOB compliance. A veteran of NYC construction who has guided over 10,000 sign installations across the 5 boroughs since 1989.',
    specialty: 'DOB Class 1 Engineering & Crane Rigging',
  },
  {
    name: 'Alexander Ward, PE',
    role: 'Head of Architectural Engineering & CAD',
    experience: '18 Years Structural CAD',
    bio: 'Translates architectural blueprints, 3D Revit models, and structural engineer wind-load calculations into precision CAM routing and laser fabrication files.',
    specialty: 'Structural Wind Loads (120 MPH) & BIM Integration',
  },
  {
    name: 'Valeria Cruz',
    role: 'Director of DOB & LPC Permit Expediting',
    experience: '15 Years NYC Municipal Permitting',
    bio: 'Coordinates directly with Department of Buildings plan examiners and the Landmarks Preservation Commission (LPC) to secure fast, violation-free approvals.',
    specialty: 'Landmark Districts & Municipal Code Compliance',
  },
  {
    name: 'Anton Mikhailov',
    role: 'Production Floor Superintendent',
    experience: '22 Years CNC & Neon Fabrication',
    bio: 'Manages our 10,000 sq ft production floor, orchestrating 5-axis CNC routing, automated channel letter bending, Matthews paint booths, and final quality control.',
    specialty: 'Multi-Axis CNC Routing & Metal Finishes',
  },
];

export default function AboutClient() {
  const [activeDept, setActiveDept] = useState<string>('cnc-waterjet');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'campaign' | 'showreel' | 'case-study'>('campaign');

  const selectedDepartment =
    FACILITY_DEPARTMENTS.find((d) => d.id === activeDept) || FACILITY_DEPARTMENTS[0];

  const handleOpenCampaignModal = () => {
    setModalMode('campaign');
    setModalOpen(true);
  };

  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F7F5EF',
        color: '#111111',
      }}
    >
      {/* Universal Dynamic Navbar */}
      <Navbar onOpenCampaignModal={handleOpenCampaignModal} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: HIGH EDITORIAL AUTHORITY & MASTER CRAFTSMANSHIP           */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'clamp(8.5rem, 12vw, 11rem)',
          paddingBottom: 'clamp(4rem, 7vw, 6.5rem)',
          backgroundColor: '#F5F3EC',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle architectural grid pattern background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 15% 20%, rgba(30, 86, 255, 0.06) 0%, transparent 45%),
              radial-gradient(circle at 85% 80%, rgba(17, 17, 17, 0.03) 0%, transparent 50%),
              linear-gradient(rgba(17, 17, 17, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17, 17, 17, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(17, 17, 17, 0.1)',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#1E56FF',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <Sparkles size={14} />
            <span>ESTABLISHED 1989 // NYC DOB CLASS 1 MASTER SIGN HANGER #000185</span>
          </div>

          {/* Majestic Hero Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.8vw, 5.2rem)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              color: '#111111',
              maxWidth: '1120px',
              margin: '0 0 1.5rem',
              textTransform: 'uppercase',
            }}
          >
            WE DON’T JUST MAKE SIGNS.{' '}
            <span style={{ color: '#1E56FF', display: 'inline-block' }}>
              WE CRAFT NYC’S STREETSCAPE.
            </span>
          </h1>

          {/* Editorial Manifesto */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.35vw, 1.32rem)',
              lineHeight: 1.65,
              color: '#444444',
              maxWidth: '860px',
              margin: '0 0 2.5rem',
              fontWeight: 450,
            }}
          >
            For more than 35 years, Signs NYC has been the quiet force behind New York City’s visual identity. 
            From bespoke SoHo brushed brass letters and Times Square illuminated towers to Michelin-starred dining canopies 
            and municipal healthcare facilities—we engineer, fabricate, and install signs that outlast trends and NYC weather.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <button
              onClick={handleOpenCampaignModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#1E56FF',
                color: '#FFFFFF',
                padding: '0.9rem 1.8rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 6px 20px rgba(30, 86, 255, 0.28)',
              }}
            >
              <span>CONSULT WITH AN ENGINEER</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="#facility"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#FFFFFF',
                color: '#111111',
                padding: '0.9rem 1.6rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                border: '1px solid rgba(17, 17, 17, 0.12)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>TOUR THE 10,000 SQ FT PLANT</span>
              <ChevronRight size={16} color="#1E56FF" />
            </a>
          </div>

          {/* 4 Core Pillars Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#1E56FF', lineHeight: 1 }}>
                35+
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 900, color: '#111111', marginTop: '0.4rem', letterSpacing: '0.04em' }}>
                YEARS IN CONTINUOUS OPERATION
              </div>
              <div style={{ fontSize: '0.82rem', color: '#666666', marginTop: '0.2rem' }}>
                Established in NYC in 1989. Over 10,000 storefronts shaped.
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#111111', lineHeight: 1 }}>
                10,000
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 900, color: '#111111', marginTop: '0.4rem', letterSpacing: '0.04em' }}>
                SQ FT LOCAL NYC PRODUCTION PLANT
              </div>
              <div style={{ fontSize: '0.82rem', color: '#666666', marginTop: '0.2rem' }}>
                In-house CNC routers, waterjet, paint booths & neon shop.
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#10B981', lineHeight: 1 }}>
                CLASS 1
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 900, color: '#111111', marginTop: '0.4rem', letterSpacing: '0.04em' }}>
                NYC DOB MASTER SIGN HANGER
              </div>
              <div style={{ fontSize: '0.82rem', color: '#666666', marginTop: '0.2rem' }}>
                License #000185. Unlimited height crane picks & structural permits.
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#111111', lineHeight: 1 }}>
                100%
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 900, color: '#111111', marginTop: '0.4rem', letterSpacing: '0.04em' }}>
                FACTORY DIRECT // ZERO MIDDLEMEN
              </div>
              <div style={{ fontSize: '0.82rem', color: '#666666', marginTop: '0.2rem' }}>
                Work directly with the craftspeople cutting your sign.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 35-YEAR TIMELINE: 1989 TO 2026 ARCHITECTURAL JOURNEY                */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8rem) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        }}
      >
        <div className="container-custom">
          {/* Section Eyebrow */}
          <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              HERITAGE &amp; EVOLUTION // 1989 TO PRESENT
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#111111',
                margin: '0 0 1rem',
                textTransform: 'uppercase',
              }}
            >
              THREE AND A HALF DECADES OF <br />
              <span style={{ color: '#1E56FF' }}>NEW YORK ARCHITECTURAL RIGOR.</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
              Before laser cutters and computerized benders, we bent neon by torchlight and hand-gilded 23-karat gold leaf. 
              Our technology has evolved, but our standard of New York craftsmanship remains uncompromising.
            </p>
          </div>

          {/* Timeline Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              position: 'relative',
            }}
          >
            {TIMELINE_MILESTONES.map((m, idx) => (
              <div
                key={m.year}
                style={{
                  backgroundColor: '#F8F7F2',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                }}
                className="timeline-card"
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                      borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
                      paddingBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: idx === TIMELINE_MILESTONES.length - 1 ? '#1E56FF' : '#111111',
                      }}
                    >
                      {m.year}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.64rem',
                        fontWeight: 900,
                        color: '#888888',
                        letterSpacing: '0.06em',
                      }}
                    >
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#1E56FF',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {m.phase}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: '#111111',
                      margin: '0 0 0.85rem',
                      lineHeight: 1.3,
                    }}
                  >
                    {m.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: '#666666', lineHeight: 1.55, margin: 0 }}>
                    {m.copy}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px dashed rgba(17, 17, 17, 0.1)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    color: '#111111',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <CheckCircle2 size={13} color="#10B981" />
                  <span>{m.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INSIDE THE 10,000 SQ FT NYC FABRICATION PLANT (INTERACTIVE DEEP DIVE)   */}
      {/* ========================================================================= */}
      <section
        id="facility"
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8.5rem) 0',
          backgroundColor: '#F5F3EC',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        }}
      >
        <div className="container-custom">
          {/* Header */}
          <div style={{ maxWidth: '840px', marginBottom: '3.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              IN-HOUSE MANUFACTURING INFRASTRUCTURE
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.1rem, 4vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                color: '#111111',
                margin: '0 0 1.25rem',
                textTransform: 'uppercase',
              }}
            >
              INSIDE OUR 10,000 SQ FT <br />
              <span style={{ color: '#1E56FF' }}>NEW YORK CITY FACILITY.</span>
            </h2>

            <p style={{ fontSize: '1.08rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
              Most NYC sign companies are brokers who outsource fabrication to out-of-state factories. 
              Signs NYC fabricates 100% in-house. When you order from us, your materials are CNC-milled, 
              welded, painted, and assembled right here in New York City.
            </p>
          </div>

          {/* Department Selector Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              overflowX: 'auto',
              paddingBottom: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            {FACILITY_DEPARTMENTS.map((dept) => {
              const isActive = dept.id === activeDept;
              const IconComp = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.7rem 1.25rem',
                    borderRadius: '9999px',
                    border: isActive ? '1px solid #111111' : '1px solid rgba(17, 17, 17, 0.1)',
                    backgroundColor: isActive ? '#111111' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#444444',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 4px 14px rgba(0, 0, 0, 0.12)' : 'none',
                  }}
                >
                  <IconComp size={15} color={isActive ? '#1E56FF' : '#666666'} />
                  <span>{dept.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Department Showcase Card */}
          <div
            key={selectedDepartment.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(2rem, 3.5vw, 3.25rem)',
              border: '1px solid rgba(17, 17, 17, 0.1)',
              boxShadow: '0 20px 48px -12px rgba(0, 0, 0, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'center',
            }}
            className="department-stage-grid"
          >
            {/* Left Content */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(30, 86, 255, 0.08)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  color: '#1E56FF',
                  letterSpacing: '0.08em',
                  marginBottom: '1.25rem',
                }}
              >
                {selectedDepartment.badge}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#111111',
                  lineHeight: 1.18,
                  margin: '0 0 0.75rem',
                }}
              >
                {selectedDepartment.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: '#1E56FF',
                  marginBottom: '1.25rem',
                }}
              >
                // {selectedDepartment.tagline}
              </div>

              <p
                style={{
                  fontSize: '0.98rem',
                  color: '#444444',
                  lineHeight: 1.68,
                  marginBottom: '1.75rem',
                }}
              >
                {selectedDepartment.description}
              </p>

              {/* Specs checklist */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                {selectedDepartment.specs.map((spec) => (
                  <div
                    key={spec}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.45rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: '#222222',
                    }}
                  >
                    <CheckCircle2 size={14} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleOpenCampaignModal}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#111111',
                  color: '#FFFFFF',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>REQUEST PLANT SPECIFICATIONS</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Right Photo */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(280px, 35vw, 420px)',
                borderRadius: '18px',
                overflow: 'hidden',
                border: '1px solid rgba(17, 17, 17, 0.1)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
              }}
            >
              <Image
                src={selectedDepartment.image}
                alt={selectedDepartment.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  backgroundColor: 'rgba(17, 17, 17, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                IN-HOUSE BROOKLYN / QUEENS PRODUCTION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE SIGNS NYC DIFFERENCE (4 ARCHITECTURAL GUARANTEES)                     */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8rem) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        }}
      >
        <div className="container-custom">
          {/* Eyebrow */}
          <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              WHY NEW YORK ENTERPRISES CHOOSE US
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#111111',
                margin: '0 0 1rem',
                textTransform: 'uppercase',
              }}
            >
              FOUR ARCHITECTURAL PILLARS <br />
              <span style={{ color: '#1E56FF' }}>BUILT FOR COMPLEX URBAN PROJECTS.</span>
            </h2>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '2.25rem',
                borderRadius: '20px',
                backgroundColor: '#F8F7F2',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <FileCheck size={32} color="#1E56FF" style={{ marginBottom: '1.25rem' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: '#666666', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                PILLAR 01 // PERMITS
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#111111', margin: '0 0 0.85rem' }}>
                DOB &amp; LPC Expediting
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                We don’t hand you a sign and wish you luck. Our in-house expediters draft CAD architectural drawings, calculate wind load engineering, and submit filings directly to the NYC Department of Buildings and Landmarks Preservation Commission for turnkey sign-off.
              </p>
            </div>

            <div
              style={{
                padding: '2.25rem',
                borderRadius: '20px',
                backgroundColor: '#F8F7F2',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <Building2 size={32} color="#1E56FF" style={{ marginBottom: '1.25rem' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: '#666666', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                PILLAR 02 // REAL FACTORY
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#111111', margin: '0 0 0.85rem' }}>
                True Factory-Direct Value
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                Deal directly with the team cutting your aluminum and bending your neon. Eliminating third-party brokers and sub-fabricators means razor-sharp quality control, rapid revision cycles, and significant cost savings passed directly to your buildout.
              </p>
            </div>

            <div
              style={{
                padding: '2.25rem',
                borderRadius: '20px',
                backgroundColor: '#F8F7F2',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <Compass size={32} color="#1E56FF" style={{ marginBottom: '1.25rem' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: '#666666', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                PILLAR 03 // ENGINEERING
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#111111', margin: '0 0 0.85rem' }}>
                Engineered for NYC Weather
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                From 120 MPH hurricane-grade rooftop calculations to heavy freeze-thaw cycles and harbor salt corrosion, our materials are specified for extreme urban endurance. Heavyweight aluminum, 316 stainless, and automotive UV clearcoats.
              </p>
            </div>

            <div
              style={{
                padding: '2.25rem',
                borderRadius: '20px',
                backgroundColor: '#F8F7F2',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <Clock size={32} color="#1E56FF" style={{ marginBottom: '1.25rem' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: '#666666', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                PILLAR 04 // 24/7 FLEET
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, color: '#111111', margin: '0 0 0.85rem' }}>
                24/7 Rapid Emergency Response
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
                When storms damage entrance canopies or transformers fail on a flagship storefront, our emergency dispatch crews are on-site within hours. 24 hours a day, 7 days a week across all five boroughs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TECHNICAL CERTIFICATIONS & COMPLIANCE WALL                              */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8rem) 0',
          backgroundColor: '#F5F3EC',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        }}
      >
        <div className="container-custom">
          {/* Header */}
          <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              SAFETY, CODE &amp; QUALITY ASSURANCE
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#111111',
                margin: '0 0 1rem',
                textTransform: 'uppercase',
              }}
            >
              LICENSES, CERTIFICATIONS &amp; <br />
              <span style={{ color: '#1E56FF' }}>MUNICIPAL CODE COMPLIANCE.</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
              Operating in New York City requires stringent compliance with structural, electrical, and life-safety codes. 
              Signs NYC maintains active certifications with the leading regulatory authorities.
            </p>
          </div>

          {/* Certifications Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {CERTIFICATIONS.map((cert) => {
              const IconComp = cert.icon;
              return (
                <div
                  key={cert.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '18px',
                    padding: '1.75rem',
                    border: '1px solid rgba(17, 17, 17, 0.08)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(30, 86, 255, 0.08)',
                          color: '#1E56FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComp size={20} />
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.64rem',
                          fontWeight: 900,
                          color: '#10B981',
                          backgroundColor: 'rgba(16, 185, 129, 0.08)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '9999px',
                        }}
                      >
                        {cert.badge}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: 900,
                        color: '#111111',
                        margin: '0 0 0.35rem',
                      }}
                    >
                      {cert.title}
                    </h3>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: '#666666',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {cert.subtitle}
                    </div>

                    <p style={{ fontSize: '0.86rem', color: '#555555', lineHeight: 1.55, margin: 0 }}>
                      {cert.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MASTER CRAFTSMEN & PROJECT LEADERSHIP TEAM                              */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8rem) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        }}
      >
        <div className="container-custom">
          {/* Header */}
          <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                color: '#1E56FF',
                fontWeight: 800,
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              TECHNICAL LEADERSHIP
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.8vw, 3.4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: '#111111',
                margin: '0 0 1rem',
                textTransform: 'uppercase',
              }}
            >
              THE CRAFTSMEN &amp; ENGINEERS <br />
              <span style={{ color: '#1E56FF' }}>BEHIND NEW YORK’S SKYLINE.</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#555555', lineHeight: 1.6, margin: 0 }}>
              Decades of institutional experience in NYC municipal zoning, CAD/CAM metal cutting, 
              precision wiring, and high-altitude crane rigging.
            </p>
          </div>

          {/* Leadership Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.name}
                style={{
                  backgroundColor: '#F8F7F2',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1E56FF 0%, #111111 100%)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 900,
                      fontSize: '1.15rem',
                      marginBottom: '1.25rem',
                      boxShadow: '0 4px 14px rgba(30, 86, 255, 0.25)',
                    }}
                  >
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      color: '#111111',
                      margin: '0 0 0.25rem',
                    }}
                  >
                    {member.name}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: '#1E56FF',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {member.role}
                  </div>

                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: '#777777',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '1rem',
                    }}
                  >
                    {member.experience}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: 1.55, margin: 0 }}>
                    {member.bio}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(17, 17, 17, 0.08)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#111111',
                  }}
                >
                  <span style={{ color: '#888888' }}>FOCUS: </span>
                  {member.specialty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ALL 5 BOROUGHS LOGISTICS & SAME-DAY DISPATCH                           */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8rem) 0',
          backgroundColor: '#F5F3EC',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        }}
      >
        <div className="container-custom">
          <div
            style={{
              backgroundColor: '#111111',
              color: '#FFFFFF',
              borderRadius: '28px',
              padding: 'clamp(2.5rem, 4.5vw, 4.5rem)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'center',
            }}
            className="borough-grid-container"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#1E56FF',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                <MapPin size={16} />
                <span>ALL FIVE BOROUGHS + TRI-STATE</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  margin: '0 0 1.25rem',
                  textTransform: 'uppercase',
                }}
              >
                DISPATCHED FROM BROOKLYN &amp; QUEENS. <br />
                <span style={{ color: '#1E56FF' }}>INSTALLED IN EVERY ZIP CODE.</span>
              </h2>

              <p style={{ fontSize: '1rem', color: '#BBBBBB', lineHeight: 1.6, marginBottom: '2rem' }}>
                We maintain active field rigging crews stationed throughout New York City. 
                Whether you need early-morning off-hours installation on Fifth Avenue or an emergency canopy structural weld in Astoria, 
                our boom trucks and technicians are already in your borough.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ borderLeft: '2px solid #1E56FF', paddingLeft: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#1E56FF', fontWeight: 900 }}>MANHATTAN</div>
                  <div style={{ fontSize: '0.82rem', color: '#DDDDDD', marginTop: '0.2rem' }}>Same-day site surveys &amp; night crane picks</div>
                </div>

                <div style={{ borderLeft: '2px solid #1E56FF', paddingLeft: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#1E56FF', fontWeight: 900 }}>BROOKLYN HQ</div>
                  <div style={{ fontSize: '0.82rem', color: '#DDDDDD', marginTop: '0.2rem' }}>10,000 sq ft production &amp; fabrication plant</div>
                </div>

                <div style={{ borderLeft: '2px solid #1E56FF', paddingLeft: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#1E56FF', fontWeight: 900 }}>QUEENS &amp; BRONX</div>
                  <div style={{ fontSize: '0.82rem', color: '#DDDDDD', marginTop: '0.2rem' }}>Industrial corridor fleets &amp; hospital networks</div>
                </div>

                <div style={{ borderLeft: '2px solid #1E56FF', paddingLeft: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#1E56FF', fontWeight: 900 }}>STATEN ISLAND</div>
                  <div style={{ fontSize: '0.82rem', color: '#DDDDDD', marginTop: '0.2rem' }}>Commercial pylon monuments &amp; shopping centers</div>
                </div>
              </div>
            </div>

            {/* Right Contact Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#10B981',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 8px #10B981',
                    display: 'inline-block',
                  }}
                />
                PLANT OPEN FOR ARCHITECTURAL CONSULTATIONS
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 1rem',
                }}
              >
                Visit Our 10,000 Sq Ft NYC Plant
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#CCCCCC', lineHeight: 1.55, marginBottom: '1.75rem' }}>
                Architects, designers, and general contractors are welcome to tour our shop floor, inspect material samples, 
                and review CAD drawings with our senior engineers in person.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                <a
                  href="tel:+17184538300"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.94rem',
                    fontWeight: 800,
                  }}
                >
                  <Phone size={16} color="#1E56FF" />
                  <span>(718) 453-8300</span>
                </a>

                <a
                  href="mailto:info@signsny.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    fontSize: '0.94rem',
                    fontWeight: 800,
                  }}
                >
                  <Mail size={16} color="#1E56FF" />
                  <span>INFO@SIGNSNY.COM</span>
                </a>
              </div>

              <button
                onClick={handleOpenCampaignModal}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '9999px',
                  backgroundColor: '#1E56FF',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                SCHEDULE A PROJECT CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CALL TO ACTION: READY TO BUILD YOUR NYC LANDMARK?                      */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8.5rem) 0',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <div className="container-custom" style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(30, 86, 255, 0.08)',
              color: '#1E56FF',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={14} />
            <span>START YOUR NYC LANDMARK</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.3rem, 4.8vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#111111',
              letterSpacing: '-0.03em',
              margin: '0 0 1.25rem',
              textTransform: 'uppercase',
            }}
          >
            LET’S CRAFT SOMETHING <br />
            <span style={{ color: '#1E56FF' }}>UNFORGETTABLE TOGETHER.</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
              color: '#555555',
              lineHeight: 1.6,
              margin: '0 auto 2.5rem',
              maxWidth: '680px',
            }}
          >
            Whether you’re planning a flagship storefront on Madison Avenue, outfitting a fleet of 50 delivery vans, 
            or need emergency DOB permit expediting—our team is ready.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleOpenCampaignModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#1E56FF',
                color: '#FFFFFF',
                padding: '0.95rem 2rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                boxShadow: '0 8px 24px rgba(30, 86, 255, 0.3)',
              }}
            >
              <span>BUILD YOUR CUSTOM SIGN QUOTE</span>
              <ArrowRight size={16} />
            </button>

            <Link
              href="/#transformations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#F8F7F2',
                color: '#111111',
                padding: '0.95rem 1.8rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                fontWeight: 800,
                textDecoration: 'none',
                border: '1px solid rgba(17, 17, 17, 0.1)',
              }}
            >
              <span>SEE BEFORE &amp; AFTER SHOWCASE</span>
              <ChevronRight size={16} color="#1E56FF" />
            </Link>
          </div>
        </div>
      </section>

      {/* Universal Footer */}
      <Footer />

      {/* Interactive Campaign & Consultation Modal */}
      <CampaignModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />

      <style jsx>{`
        .timeline-card:hover {
          transform: translateY(-4px);
          border-color: rgba(30, 86, 255, 0.3) !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
        }

        @media (max-width: 900px) {
          .department-stage-grid {
            grid-template-columns: 1fr !important;
          }
          .borough-grid-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
