'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Sliders, 
  Maximize2,
  Play,
  Pause
} from 'lucide-react';

interface ProjectTransformation {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  borough: string;
  beforeImg: string;
  afterImg: string;
  beforeDesc: string;
  afterDesc: string;
  specs: {
    material: string;
    finish: string;
    compliance: string;
    impact: string;
  };
  highlightStat: string;
  statLabel: string;
}

const TRANSFORMATIONS: ProjectTransformation[] = [
  {
    id: 'elevator-wrap',
    category: 'ELEVATOR WRAPS',
    title: 'COMMERCIAL ELEVATOR ARCHITECTURAL WRAP',
    subtitle: 'Luxury Fitness & Gym Elevator Transformation',
    borough: 'Midtown Manhattan, NYC',
    beforeImg: '/images/before_after/01_elevator_before.jpg',
    afterImg: '/Signsny/Vinyl Graphics/Elevator Wraps/Types/Architectural Finishes/Architectural Finishes.jpg',
    beforeDesc: 'Standard industrial brushed steel doors offering zero branded engagement for gym members.',
    afterDesc: 'High-tensile 3M architectural cast wrap with custom dynamic matte branding and anti-scuff laminate.',
    specs: {
      material: '3M IJ180Cv3 Cast Architectural Vinyl',
      finish: 'Matte Slip & Scratch-Resistant Overlaminate',
      compliance: 'ASTM E84 Class A Fire & Smoke Rated',
      impact: '+180% Brand Engagement & Wayfinding Recall',
    },
    highlightStat: '+180%',
    statLabel: 'Brand Recall Boost',
  },
  {
    id: 'window-wrap',
    category: 'WINDOW WRAPS',
    title: 'GRAND OPENING RESTAURANT FACADE WRAP',
    subtitle: 'Turnkey Storefront Launch Graphics',
    borough: 'SoHo & NoHo, Manhattan',
    beforeImg: '/images/before_after/02_window_wrap_before.jpg',
    afterImg: '/Signsny/Vinyl Graphics/Window Wraps/Designs/06-window wraps for restaurants.jpg',
    beforeDesc: 'Raw unfinished glass windows revealing active interior construction and messy renovation.',
    afterDesc: 'Full opaque barricade window vinyl driving excitement, grand opening buzz, and complete dust privacy.',
    specs: {
      material: 'Blockout Opaque Air-Release Polymeric Film',
      finish: 'UV-Cured Vibrant Pigment & Lamination',
      compliance: 'NYC DOB Temporary Barricade Code Compliant',
      impact: 'Generated 450+ Opening Day Footfall Queue',
    },
    highlightStat: '100%',
    statLabel: 'Construction Privacy',
  },
  {
    id: 'tech-perforated',
    category: 'PERFORATED WINDOW WRAPS',
    title: 'TECH HEADQUARTERS PRIVACY & BRANDING',
    subtitle: '60/40 One-Way Optical Perforated Glass',
    borough: 'Flatiron District / Silicon Alley, NYC',
    beforeImg: '/images/before_after/03_tech_window_before.jpg',
    afterImg: '/Signsny/Vinyl Graphics/Perforated Window Wraps/Designs/08-tech company perforated window wrap with digital patterns and blue tones.jpg',
    beforeDesc: 'Fishbowl transparent ground-floor windows causing screen glare and complete loss of interior confidentiality.',
    afterDesc: 'Architectural one-way micro-perforated graphics displaying bold circuit identity while preserving outward views.',
    specs: {
      material: '60/40 Optical Perforated Window Film',
      finish: 'Optically Clear Opti-Gard Protective Overlam',
      compliance: 'NYC Commercial Code & Daylighting Standards',
      impact: 'Blocks 68% Solar Heat & 100% Street Prying Eyes',
    },
    highlightStat: '68%',
    statLabel: 'Solar Heat Reduction',
  },
  {
    id: 'clinic-perforated',
    category: 'HEALTHCARE PERFORATED WRAPS',
    title: 'PHYSICAL THERAPY & REHAB CLINIC FACADE',
    subtitle: 'HIPAA-Compliant Patient Privacy Glass',
    borough: 'Long Island City, Queens',
    beforeImg: '/images/before_after/04_clinic_window_before.jpg',
    afterImg: '/Signsny/Vinyl Graphics/Perforated Window Wraps/Designs/06-rehab clinic perforated window wrap with movement and anatomy visuals.jpg',
    beforeDesc: 'Exposed medical floor where patients exercised in plain sight of parking lot traffic.',
    afterDesc: 'Precision skeletal & muscle biomechanics graphics safeguarding patient dignity while attracting new clients.',
    specs: {
      material: 'Medical-Grade 70/30 Micro-Perforated Vinyl',
      finish: 'Matte Anti-Reflective Daylight Filter',
      compliance: 'HIPAA Visual Privacy & ADA Compliant',
      impact: '+92% Patient Comfort & +45 Inbound Consults',
    },
    highlightStat: '+92%',
    statLabel: 'Patient Privacy Rating',
  },
  {
    id: 'commercial-awning',
    category: 'COMMERCIAL AWNINGS',
    title: 'ARCHITECTURAL WATERPROOF RETRACTABLE AWNING',
    subtitle: 'Boutique Facade Canopy & Streetfront Shade',
    borough: 'Upper East Side, Manhattan',
    beforeImg: '/images/before_after/05_awning_before.jpg',
    afterImg: '/images/commercial-awnings-business.webp',
    beforeDesc: 'Bare facade without rain shelter or solar protection, leaving entrance exposed to elements.',
    afterDesc: 'Custom motorized Sunbrella architectural awning with precision gold lettering and integrated weather valance.',
    specs: {
      material: 'Sunbrella Marine-Grade Solution-Dyed Acrylic',
      finish: 'Heavy-Duty Welded Aluminum Truss System',
      compliance: 'NYC DOB Canopy Permit & NYC Fire Marshal Cert',
      impact: 'Expanded Sidewalk All-Weather Visibility',
    },
    highlightStat: '35°F',
    statLabel: 'Surface Temp Drop',
  },
  {
    id: 'sidewalk-barriers',
    category: 'SIDEWALK CAFE BARRIERS',
    title: 'MODULAR RESTAURANT OUTDOOR DINING BARRIERS',
    subtitle: 'DOT-Compliant Modular Cafe Enclosure',
    borough: 'Williamsburg, Brooklyn',
    beforeImg: '/images/before_after/06_sidewalk_barriers_before.jpg',
    afterImg: '/Signsny/Outdoor Signs/Sidewalk Barriers/Designs/03-restaurant sidewalk barriers nyc.jpg',
    beforeDesc: 'Scattered bistro chairs spilling onto busy sidewalk with pedestrian collisions and zero perimeter security.',
    afterDesc: 'Heavyweight powder-coated welded steel modular barriers with branded canvas panels and counterweight bases.',
    specs: {
      material: 'Tubular Steel Frame with Marine Vinyl Inserts',
      finish: 'Outdoor Industrial Matte Powder Coat (UV Stable)',
      compliance: 'NYC DOT Open Restaurants Cafe Code Approved',
      impact: '+35% Outdoor Table Turnover & Dining Comfort',
    },
    highlightStat: '+35%',
    statLabel: 'Outdoor Table Capacity',
  },
  {
    id: 'bus-wrapping',
    category: 'BUS & COACH WRAPS',
    title: 'FULL FLEET LUXURY COACH BUS WRAP',
    subtitle: 'Mobile Highway Landmark & Travel Branding',
    borough: 'Tri-State & 5 Boroughs Transit',
    beforeImg: '/images/before_after/07_bus_wrap_before.jpg',
    afterImg: '/Signsny/Vehicle Wraps/Bus Wrapping/Designs/02-custom bus wrapping in ny.jpg',
    beforeDesc: 'Anonymous solid white charter bus blending into highway traffic without brand presence.',
    afterDesc: 'Full 360° cosmic galaxy wrap with 3M perforated window graphics turning every mile into high-ROI marketing.',
    specs: {
      material: '3M Controltac Comply Wrap Film with Micro-Air',
      finish: 'Gloss High-Lustre UV & Salt Shield Clear Coat',
      compliance: 'DOT & NYC TLC Commercial Fleet Certified',
      impact: '1.2 Million Monthly Tri-State Commuter Views',
    },
    highlightStat: '1.2M',
    statLabel: 'Monthly Impressions',
  },
  {
    id: 'food-truck-wrap',
    category: 'FOOD TRUCK WRAPS',
    title: 'ARTISAN COFFEE & ESPRESSO FOOD TRUCK',
    subtitle: 'Matte Charcoal & Gold Leaf Mobile Cafe',
    borough: 'DUMBO & Brooklyn Navy Yard',
    beforeImg: '/images/before_after/08_food_truck_before.jpg',
    afterImg: '/Signsny/Vehicle Wraps/Food Truck Wrapping/Designs/01-custom food truck wrapping.jpg',
    beforeDesc: 'Weathered primer-grey step van looking like an uninviting utility vehicle.',
    afterDesc: 'Turned into an upscale artisan espresso bar with ornate Victorian filigree, matte wrap, and menu lettering.',
    specs: {
      material: 'Avery Dennison Supreme Wrapping Cast Film',
      finish: 'Deep Matte Charcoal with Gold Metallic Accents',
      compliance: 'NYC DOHMH Food Truck Health Code Approved',
      impact: '+240% Daily Average Order Volume at NYC Parks',
    },
    highlightStat: '+240%',
    statLabel: 'Daily Sales Surge',
  },
  {
    id: 'fleet-van-wrap',
    category: 'FLEET VEHICLE WRAPS',
    title: 'MERCEDES SPRINTER COMMERCIAL FLEET WRAP',
    subtitle: 'High-Impact Brand Landscape Wrap',
    borough: 'Long Island City & Manhattan Commercial Routes',
    beforeImg: '/images/before_after/09_van_wrap_before.jpg',
    afterImg: '/Signsny/Vehicle Wraps/Van Wrapping/Designs/01-best custom van wraps in nyc.jpg',
    beforeDesc: 'Plain generic white work van generating zero customer inquiries while driving 2,000 miles/month.',
    afterDesc: 'Vibrant scenic mountain vector landscape with razor-sharp contact info and reflective contour accents.',
    specs: {
      material: '3M Envision Non-PVC Sustainable Wrap Film',
      finish: 'Scratch-Proof Semi-Gloss Anti-Graffiti Laminate',
      compliance: 'Commercial Vehicle Registration & DOT Standards',
      impact: 'Estimated 65,000 Daily Drive-By NYC Impressions',
    },
    highlightStat: '65K',
    statLabel: 'Daily Drive-By Views',
  },
  {
    id: 'billboard-printing',
    category: 'HIGHWAY BILLBOARDS',
    title: 'HIGH-VISIBILITY ARTERIAL HIGHWAY BILLBOARD',
    subtitle: 'High-Tension Heavyweight Vinyl Banner',
    borough: 'BQE / LIE Highway Arterials, NYC',
    beforeImg: '/images/before_after/10_billboard_before.jpg',
    afterImg: '/Signsny/Large Format Printing/Billboard Printing/Designs/02-Scaffolding Billboard nyc.jpg',
    beforeDesc: 'Blank unleased billboard face with peeling backing canvas causing zero driver notice.',
    afterDesc: 'Seamless UV-cured heavyweight vinyl banner engineered for 120 MPH wind load and vibrant daytime pop.',
    specs: {
      material: '13oz Heavyweight High-Tear Polyester PVC Banner',
      finish: 'Matte Anti-Glare UV Stable Pigment Inks',
      compliance: 'NYC DOB Arterial Highway Billboard Permits',
      impact: '2.4 Million Monthly NYC Commuter Impressions',
    },
    highlightStat: '2.4M',
    statLabel: 'Monthly Commuters',
  },
];

interface TransformationShowcaseProps {
  onOpenCampaignModal: () => void;
}

export default function TransformationShowcase({ onOpenCampaignModal }: TransformationShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const current = TRANSFORMATIONS[activeIdx];

  // Handle Drag Position
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    // Pause autoplay on user interaction
    setAutoPlay(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalMouseUp);
    return () => window.removeEventListener('pointerup', handleGlobalMouseUp);
  }, []);

  // Preset Slider Controls
  const setPreset = (percentage: number) => {
    setAutoPlay(false);
    setSliderPos(percentage);
  };

  // Next / Prev Project
  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TRANSFORMATIONS.length - 1 : prev - 1));
    setSliderPos(50);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === TRANSFORMATIONS.length - 1 ? 0 : prev + 1));
    setSliderPos(50);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((p) => Math.max(0, p - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((p) => Math.min(100, p + 5));
    }
  };

  return (
    <section
      id="before-after"
      style={{
        position: 'relative',
        backgroundColor: '#F5F3EB',
        padding: '7.5rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#1E56FF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={14} />
            NYC ARCHITECTURAL TRANSFORMATIONS // BEFORE & AFTER
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.3rem, 4.4vw, 3.8rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#111111',
                maxWidth: '780px',
              }}
            >
              SEE THE RAW IMPACT OF <br />
              <span style={{ color: '#1E56FF' }}>PRECISION CRAFTSMANSHIP.</span>
            </h2>

            {/* Stage Counter & Project Arrows */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#666666',
                  letterSpacing: '0.08em',
                }}
              >
                <span style={{ color: '#111111', fontSize: '1.1rem' }}>
                  {String(activeIdx + 1).padStart(2, '0')}
                </span>{' '}
                / {String(TRANSFORMATIONS.length).padStart(2, '0')}
              </div>

              <div style={{ display: 'flex', gap: '0.45rem' }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous transformation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(17, 17, 17, 0.12)',
                    color: '#111111',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1E56FF';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#111111';
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next transformation"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(17, 17, 17, 0.12)',
                    color: '#111111',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1E56FF';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#111111';
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Category Switcher Pill Track */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.85rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="no-scrollbar"
        >
          {TRANSFORMATIONS.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  setSliderPos(50);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? '#111111' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#444444',
                  border: isActive ? '1px solid #111111' : '1px solid rgba(17, 17, 17, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  boxShadow: isActive
                    ? '0 6px 18px rgba(0, 0, 0, 0.12)'
                    : '0 2px 6px rgba(0, 0, 0, 0.02)',
                  flexShrink: 0,
                }}
              >
                <span style={{ opacity: isActive ? 0.6 : 0.4 }}>{String(idx + 1).padStart(2, '0')}.</span>
                {item.category}
              </button>
            );
          })}
        </div>

        {/* Interactive Before/After Workspace Container */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 4px 14px rgba(0, 0, 0, 0.03)',
            overflow: 'hidden',
          }}
        >
          {/* Top Bar: Title & Preset Controls */}
          <div
            style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(17, 17, 17, 0.07)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              backgroundColor: '#FAFAF7',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.2rem',
                }}
              >
                {current.category} • {current.borough}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#111111',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {current.title}
              </h3>
            </div>

            {/* Interactive View Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                type="button"
                onClick={() => setPreset(0)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  backgroundColor: sliderPos <= 5 ? '#1E56FF' : '#FFFFFF',
                  color: sliderPos <= 5 ? '#FFFFFF' : '#555555',
                  border: '1px solid rgba(17, 17, 17, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                100% BEFORE
              </button>
              <button
                type="button"
                onClick={() => setPreset(50)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  backgroundColor: sliderPos > 40 && sliderPos < 60 ? '#111111' : '#FFFFFF',
                  color: sliderPos > 40 && sliderPos < 60 ? '#FFFFFF' : '#555555',
                  border: '1px solid rgba(17, 17, 17, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                50 / 50 SPLIT
              </button>
              <button
                type="button"
                onClick={() => setPreset(100)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '8px',
                  backgroundColor: sliderPos >= 95 ? '#1E56FF' : '#FFFFFF',
                  color: sliderPos >= 95 ? '#FFFFFF' : '#555555',
                  border: '1px solid rgba(17, 17, 17, 0.1)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                100% AFTER
              </button>
            </div>
          </div>

          {/* Interactive Split Drag Stage */}
          <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(380px, 52vw, 620px)',
              backgroundColor: '#0F1115',
              overflow: 'hidden',
              cursor: 'ew-resize',
              userSelect: 'none',
              touchAction: 'none',
            }}
          >
            {/* UNDER LAYER: AFTER IMAGE (Signs NYC Finished Work) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src={current.afterImg}
                alt={`${current.title} - After Installation`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />

              {/* After Floating Tag (Right Side) */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(30, 86, 255, 0.92)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  boxShadow: '0 4px 16px rgba(30, 86, 255, 0.35)',
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                <CheckCircle2 size={13} />
                AFTER // SIGNS NYC FABRICATION
              </div>

              {/* Bottom Subtle Description Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  right: '1.25rem',
                  maxWidth: '380px',
                  padding: '0.75rem 1.1rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.72)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  lineHeight: 1.45,
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                <span style={{ color: '#00D4FF', fontWeight: 800, display: 'block', fontSize: '0.65rem', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                  FABRICATED RESULT
                </span>
                {current.afterDesc}
              </div>
            </div>

            {/* TOP LAYER: BEFORE IMAGE (Raw State - Clipped horizontally by sliderPos) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                transition: isDragging ? 'none' : 'clip-path 0.12s ease-out',
                zIndex: 2,
              }}
            >
              <Image
                src={current.beforeImg}
                alt={`${current.title} - Before Signage`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />

              {/* Before Floating Tag (Left Side) */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(20, 20, 20, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#EEEEEE',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              >
                BEFORE // RAW UNBRANDED STATE
              </div>

              {/* Bottom Subtle Description Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  maxWidth: '380px',
                  padding: '0.75rem 1.1rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.72)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: '0.78rem',
                  lineHeight: 1.45,
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              >
                <span style={{ color: '#FFB800', fontWeight: 800, display: 'block', fontSize: '0.65rem', marginBottom: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                  INITIAL CONDITIONS
                </span>
                {current.beforeDesc}
              </div>
            </div>

            {/* Center Split Slider Handle Divider */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPos}%`,
                width: '3px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 16px rgba(0, 0, 0, 0.6), 0 0 8px rgba(30, 86, 255, 0.8)',
                zIndex: 10,
                transform: 'translateX(-50%)',
                cursor: 'ew-resize',
                pointerEvents: 'none',
              }}
            >
              {/* Circular Grip Knob */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35), 0 0 0 3px #1E56FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  color: '#1E56FF',
                }}
              >
                <ChevronLeft size={16} strokeWidth={3} />
                <ChevronRight size={16} strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* 4-Box Technical Specification & Impact Deck (Inspired by Section 3 & 6) */}
          <div
            style={{
              padding: '2rem 2.25rem',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid rgba(17, 17, 17, 0.08)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Spec 1: Material */}
            <div
              style={{
                padding: '1.25rem',
                backgroundColor: '#F8F7F2',
                borderRadius: '14px',
                border: '1px solid rgba(17, 17, 17, 0.06)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#666666',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                01 // SUBSTRATE & MEDIA
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: '#111111',
                  lineHeight: 1.35,
                }}
              >
                {current.specs.material}
              </div>
            </div>

            {/* Spec 2: Finish & Protection */}
            <div
              style={{
                padding: '1.25rem',
                backgroundColor: '#F8F7F2',
                borderRadius: '14px',
                border: '1px solid rgba(17, 17, 17, 0.06)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#666666',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                02 // FINISH & LAMINATION
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: '#111111',
                  lineHeight: 1.35,
                }}
              >
                {current.specs.finish}
              </div>
            </div>

            {/* Spec 3: Code & Compliance */}
            <div
              style={{
                padding: '1.25rem',
                backgroundColor: '#F8F7F2',
                borderRadius: '14px',
                border: '1px solid rgba(17, 17, 17, 0.06)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#666666',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                03 // NYC CODE COMPLIANCE
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: '#111111',
                  lineHeight: 1.35,
                }}
              >
                {current.specs.compliance}
              </div>
            </div>

            {/* Spec 4: Business Impact */}
            <div
              style={{
                padding: '1.25rem',
                backgroundColor: 'rgba(30, 86, 255, 0.04)',
                borderRadius: '14px',
                border: '1px solid rgba(30, 86, 255, 0.2)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: '#1E56FF',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                04 // REAL-WORLD IMPACT
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 900,
                  color: '#1E56FF',
                  lineHeight: 1.35,
                }}
              >
                {current.specs.impact}
              </div>
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div
            style={{
              padding: '1.4rem 2.25rem',
              backgroundColor: '#111111',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#00D4FF',
                  lineHeight: 1,
                }}
              >
                {current.highlightStat}
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: '0.86rem', fontWeight: 800 }}>
                  {current.statLabel}
                </div>
                <div style={{ color: '#888888', fontSize: '0.74rem' }}>
                  Measured commercial lift across NYC client installations
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onOpenCampaignModal}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#1E56FF',
                  color: '#FFFFFF',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-mono)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(30, 86, 255, 0.4)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1644cc')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1E56FF')}
              >
                GET A QUOTE FOR THIS FORMAT
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
