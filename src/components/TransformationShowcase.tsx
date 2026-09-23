'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
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
    title: 'PHYSICAL THERAPY & CLINIC WINDOW WRAP',
    subtitle: 'One-Way Optical Perforated Privacy & Anatomy Graphics',
    borough: 'Long Island City, Queens',
    beforeImg: '/images/before_after/02_window_wrap_before.jpg',
    afterImg: '/Signsny/Vinyl Graphics/Perforated Window Wraps/Designs/06-rehab clinic perforated window wrap with movement and anatomy visuals.jpg',
    beforeDesc: 'Clear transparent storefront glass exposing interior treatment floor, desks, and street glare.',
    afterDesc: 'Precision skeletal & muscle biomechanics perforated graphics providing patient privacy while preserving natural outward daylight.',
    specs: {
      material: 'Medical-Grade 70/30 One-Way Micro-Perforated Vinyl',
      finish: 'Optically Clear UV-Protective Overlaminate (Anti-Glare)',
      compliance: 'HIPAA Visual Patient Privacy & NYC Commercial Code',
      impact: '+92% Patient Comfort & +100% Streetfront Privacy',
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
    beforeImg: '/images/before_after/commercial_awning_striped_before.jpg',
    afterImg: '/images/before_after/commercial_awning_after.jpg',
    beforeDesc: 'Dated striped fabric awning with aged pattern, providing zero bespoke identity for luxury boutique.',
    afterDesc: 'Bespoke matte charcoal architectural awning with crisp white typography, floral wreath emblem, and contact valance.',
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
    beforeImg: '/images/before_after/sidewalk_cafe_tables_before.jpg',
    afterImg: '/Signsny/Outdoor Signs/Sidewalk Barriers/Designs/03-restaurant sidewalk barriers nyc.jpg',
    beforeDesc: 'Open sidewalk cafe with tables exposed directly to pedestrian walkway and zero perimeter enclosure.',
    afterDesc: 'Heavyweight powder-coated navy steel modular barriers with branded Banyan Grill canvas inserts and safety bases.',
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
    beforeDesc: 'Factory plain white luxury coach bus with blank body panels and zero brand presence.',
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
    afterImg: '/images/before_after/08_food_truck_after.jpg',
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
];

interface TransformationShowcaseProps {
  onOpenCampaignModal: () => void;
}

export default function TransformationShowcase({ onOpenCampaignModal }: TransformationShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(100); // 100 = Full Before, 0 = Full After
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [transitionSpeed, setTransitionSpeed] = useState<'none' | 'sweep' | 'preset'>('none');
  const [cycleKey, setCycleKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryTrackRef = useRef<HTMLDivElement>(null);
  const categoryBtnsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const idleResumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const current = TRANSFORMATIONS[activeIdx];

  // Auto-transition engine:
  // Phase 1: Dwell on BEFORE (1.6s)
  // Phase 2: Sweep curtain 100% -> 0% revealing AFTER (2.8s)
  // Phase 3: Dwell on AFTER (2.0s)
  // Phase 4: Advance to next transformation slide and repeat infinitely!
  useEffect(() => {
    if (!isAutoPlay || isDragging) return;

    let armSweepTimer: NodeJS.Timeout;
    let startSweepTimer: NodeJS.Timeout;
    let nextSlideTimer: NodeJS.Timeout;

    // 1. Instantly snap slider to 100% BEFORE for the current slide
    setTransitionSpeed('none');
    setSliderPos(100);
    setCycleKey((k) => k + 1);

    // 2. Arm sweep transition speed after DOM layout settles
    armSweepTimer = setTimeout(() => {
      setTransitionSpeed('sweep');
    }, 60);

    // 3. Dwell on BEFORE for 1.6s, then start smooth 2.8s sweep across the canvas
    startSweepTimer = setTimeout(() => {
      setSliderPos(0);
    }, 1600);

    // 4. After sweep finishes (1.6s + 2.8s = 4.4s) and 2.0s dwell on AFTER (total 6.4s), advance to next slide!
    nextSlideTimer = setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % TRANSFORMATIONS.length);
    }, 6400);

    return () => {
      clearTimeout(armSweepTimer);
      clearTimeout(startSweepTimer);
      clearTimeout(nextSlideTimer);
    };
  }, [isAutoPlay, activeIdx, isDragging]);

  // Auto-scroll active category button within its horizontal track ONLY (never scrolls or focuses the page)
  useEffect(() => {
    const track = categoryTrackRef.current;
    const activeBtn = categoryBtnsRef.current[activeIdx];
    if (track && activeBtn) {
      const targetScrollLeft = activeBtn.offsetLeft - track.clientWidth / 2 + activeBtn.clientWidth / 2;
      track.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeIdx]);

  // Restart idle auto-resume timer (if user manually touched controls, resume auto-play after 8s)
  const restartIdleTimer = useCallback(() => {
    if (idleResumeTimerRef.current) {
      clearTimeout(idleResumeTimerRef.current);
    }
    idleResumeTimerRef.current = setTimeout(() => {
      setIsAutoPlay(true);
    }, 8000);
  }, []);

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
    setIsAutoPlay(false);
    setTransitionSpeed('none');
    updatePosition(e.clientX);
    if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      restartIdleTimer();
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        restartIdleTimer();
      }
    };
    window.addEventListener('pointerup', handleGlobalMouseUp);
    return () => window.removeEventListener('pointerup', handleGlobalMouseUp);
  }, [isDragging, restartIdleTimer]);

  // Preset Slider Controls (100 = Before, 50 = Split, 0 = After)
  const setPreset = (percentage: number) => {
    setIsAutoPlay(false);
    setTransitionSpeed('preset');
    setSliderPos(percentage);
    restartIdleTimer();
  };

  // Next / Prev Project
  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? TRANSFORMATIONS.length - 1 : prev - 1));
    restartIdleTimer();
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === TRANSFORMATIONS.length - 1 ? 0 : prev + 1));
    restartIdleTimer();
  };

  const handleSelectCategory = (idx: number) => {
    setActiveIdx(idx);
    restartIdleTimer();
  };

  const toggleAutoPlay = () => {
    if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
    setIsAutoPlay((prev) => !prev);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsAutoPlay(false);
    setTransitionSpeed('none');
    restartIdleTimer();
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
          ref={categoryTrackRef}
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
                ref={(el) => { categoryBtnsRef.current[idx] = el; }}
                type="button"
                onClick={() => handleSelectCategory(idx)}
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

            {/* Interactive View Presets & Auto Transition Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {/* Auto Transition Toggle Button */}
              <button
                type="button"
                onClick={toggleAutoPlay}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.42rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: isAutoPlay ? 'rgba(30, 86, 255, 0.08)' : '#FFFFFF',
                  color: isAutoPlay ? '#1E56FF' : '#555555',
                  border: isAutoPlay ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.12)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isAutoPlay ? '0 0 12px rgba(30, 86, 255, 0.15)' : 'none',
                }}
                title={isAutoPlay ? 'Click to Pause Auto-Transition' : 'Click to Resume Auto-Transition'}
              >
                {isAutoPlay ? (
                  <>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: '#1E56FF',
                        boxShadow: '0 0 8px #1E56FF',
                      }}
                    />
                    <Pause size={12} />
                    AUTO-TRANSITION ON
                  </>
                ) : (
                  <>
                    <Play size={12} fill="#555555" />
                    RESUME AUTO-PLAY
                  </>
                )}
              </button>

              <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(17, 17, 17, 0.12)', margin: '0 0.2rem' }} />

              <button
                type="button"
                onClick={() => setPreset(100)}
                style={{
                  padding: '0.42rem 0.8rem',
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
                100% BEFORE
              </button>
              <button
                type="button"
                onClick={() => setPreset(50)}
                style={{
                  padding: '0.42rem 0.8rem',
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
                onClick={() => setPreset(0)}
                style={{
                  padding: '0.42rem 0.8rem',
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
                100% AFTER
              </button>
            </div>
          </div>

          {/* Interactive Split Drag Stage */}
          <div
            ref={containerRef}
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
            {/* Top Laser Timeline Progress Indicator */}
            {isAutoPlay && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  zIndex: 25,
                  overflow: 'hidden',
                }}
              >
                <div
                  key={`${activeIdx}-${cycleKey}`}
                  style={{
                    height: '100%',
                    backgroundColor: '#1E56FF',
                    boxShadow: '0 0 10px #1E56FF, 0 0 5px #00D4FF',
                    animation: 'autoCycleProgress 6.4s linear forwards',
                  }}
                />
              </div>
            )}

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
                transition: isDragging
                  ? 'none'
                  : transitionSpeed === 'sweep'
                  ? 'clip-path 2.8s cubic-bezier(0.4, 0, 0.2, 1), -webkit-clip-path 2.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  : transitionSpeed === 'preset'
                  ? 'clip-path 0.35s ease-out, -webkit-clip-path 0.35s ease-out'
                  : 'none',
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
                boxShadow: '0 0 16px rgba(0, 0, 0, 0.6), 0 0 10px rgba(30, 86, 255, 0.9)',
                zIndex: 10,
                transform: 'translateX(-50%)',
                cursor: 'ew-resize',
                pointerEvents: 'none',
                transition: isDragging
                  ? 'none'
                  : transitionSpeed === 'sweep'
                  ? 'left 2.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  : transitionSpeed === 'preset'
                  ? 'left 0.35s ease-out'
                  : 'none',
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
        </div>

        {/* Hidden Preloader for all Before/After Images */}
        <div style={{ display: 'none' }} aria-hidden="true">
          {TRANSFORMATIONS.map((t) => (
            <React.Fragment key={t.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.beforeImg} alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.afterImg} alt="" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
