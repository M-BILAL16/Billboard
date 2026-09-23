'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, MapPin, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  borough: string;
  category: string;
  group: 'retail' | 'hospitality' | 'fleet' | 'corporate' | 'healthcare' | 'landmarks';
  rating: number;
  year: string;
  quote: string;
  highlight: string;
  specsTag: string;
  projectResult?: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'VP of Retail Development',
    company: 'SoHo Luxury Group',
    borough: 'SoHo, Manhattan',
    category: 'Storefront Channel Letters',
    group: 'retail',
    rating: 5,
    year: '2025',
    highlight: 'Flawless Landmark DOB Permits & Halo Fabrication',
    quote: 'Signs NYC handled our entire SoHo flagship package from complex landmark preservation permits to precision halo channel letters. Having a real 10,000 sq ft NYC fabrication facility behind our buildout made all the difference.',
    specsTag: 'Reverse Halo LED • Brushed Brass',
    projectResult: 'LPC Approved on 1st Submission • 42% Foot Traffic Lift',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Operations Director',
    company: 'Metro Hospitality NYC',
    borough: 'Midtown, Manhattan',
    category: 'Commercial Retractable Awnings',
    group: 'hospitality',
    rating: 5,
    year: '2025',
    highlight: 'Emergency Response & Storm Repair Within Hours',
    quote: 'When a severe squall damaged our restaurant entrance canopy in Midtown at 8 PM, Signs NYC had emergency crews on-site within hours. Their 24/7 service and fabrication quality are unmatched across the five boroughs.',
    specsTag: 'Sunbrella Marine Acrylic • Motorized Truss',
    projectResult: '24/7 Emergency Dispatch • Zero Operating Downtime',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'General Manager',
    company: 'The Banyan Grill',
    borough: 'Williamsburg, Brooklyn',
    category: 'Sidewalk Cafe Barriers',
    group: 'hospitality',
    rating: 5,
    year: '2025',
    highlight: 'Passed NYC DOT Inspection on Day One',
    quote: 'Our outdoor dining barriers passed DOT inspection on the first visit. Heavy-duty powder-coated steel with custom branded canvas inserts that withstand Brooklyn winters and street traffic effortlessly.',
    specsTag: 'Welded Tubular Steel • UV Canvas Inserts',
    projectResult: '100% NYC DOT Outdoor Dining Compliant',
  },
  {
    id: 'dr-aris-thorne',
    name: 'Dr. Aris Thorne',
    role: 'Clinical Director',
    company: 'Peak Performance Physical Therapy',
    borough: 'Long Island City, Queens',
    category: 'Perforated Window Wraps',
    group: 'healthcare',
    rating: 5,
    year: '2025',
    highlight: '100% Patient Privacy with Full Natural Daylight',
    quote: 'The 70/30 micro-perforated window wrap gives our rehabilitation patients complete privacy while filling our facility with beautiful natural light. Client bookings jumped within the first two weeks of installation.',
    specsTag: '70/30 One-Way Perf • Optically Clear Overlam',
    projectResult: 'Full HIPAA Privacy Maintained • Daylight Transmission',
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Brand Experience Lead',
    company: 'Flatiron Silicon Alley Tech',
    borough: 'Flatiron District, Manhattan',
    category: 'Corporate Lobby Signs',
    group: 'corporate',
    rating: 5,
    year: '2025',
    highlight: 'Museum-Grade 14-Foot Stainless Steel Logo',
    quote: 'We commissioned a 14-foot brushed stainless steel illuminated logo for our 28th-floor headquarters. From CAD engineering to structural mounting, the Signs NYC team delivered museum-grade perfection.',
    specsTag: 'Waterjet Cut 316 Stainless • Edge-Lit Acrylic',
    projectResult: 'Precision Sub-Millimeter Tolerances Across 14 Feet',
  },
  {
    id: 'anthony-moretti',
    name: 'Anthony Moretti',
    role: 'Principal Partner',
    company: 'Moretti & Sons Contractors',
    borough: 'Financial District, Manhattan',
    category: 'DOB Sign Permits & Banners',
    group: 'landmarks',
    rating: 5,
    year: '2024',
    highlight: 'Zero DOB Violations & Expedited Approvals',
    quote: 'Navigating NYC Department of Buildings sign permits is normally a nightmare. Signs NYC\'s in-house permit expediting team had our illuminated blade sign and sidewalk shed banners approved in record time.',
    specsTag: 'DOB Class 1 Expediting • Wind-Vented Mesh',
    projectResult: 'Approved in 11 Business Days with Full Seal',
  },
  {
    id: 'claire-delacroix',
    name: 'Claire Delacroix',
    role: 'Creative Director',
    company: 'Farima Perry Florals',
    borough: 'Upper East Side, Manhattan',
    category: 'Bespoke Retail Awnings',
    group: 'retail',
    rating: 5,
    year: '2025',
    highlight: 'Immediate Footfall Increase on Madison Ave',
    quote: 'Replacing our dated striped awning with a custom matte charcoal canopy with crisp dimensional lettering transformed our storefront into a Madison Avenue landmark. Footfall increased immediately.',
    specsTag: 'Matte Charcoal Sunbrella • Dimensional Letters',
    projectResult: 'Madison Ave LPC District Compliant',
  },
  {
    id: 'roberto-gomez',
    name: 'Roberto Gomez',
    role: 'Fleet Logistics Director',
    company: 'Tri-State Charter Express',
    borough: 'Mott Haven, The Bronx',
    category: 'Coach Bus Wraps',
    group: 'fleet',
    rating: 5,
    year: '2025',
    highlight: '360° Seamless Multi-Bus Fleet Alignment',
    quote: 'We wrapped our fleet of luxury 45-foot coach buses with full 3M cast vinyl. The seamless alignment across curves, luggage bays, and window perf is proof of genuine master craftsmanship.',
    specsTag: '3M Controltac Cast • Gloss UV Salt Shield',
    projectResult: 'Full 7-Year 3M MCS Certified Fleet Warranty',
  },
  {
    id: 'maya-lin-bauer',
    name: 'Maya Lin-Bauer',
    role: 'Curator of Public Spaces',
    company: 'Brooklyn Contemporary Arts',
    borough: 'DUMBO, Brooklyn',
    category: 'Architectural Monuments',
    group: 'landmarks',
    rating: 5,
    year: '2025',
    highlight: 'Heavy Bronze-Patina Resisting Harbor Salt Air',
    quote: 'Signs NYC fabricated our exterior bronze-patina directional monument. It looks like it was carved from the industrial heritage of the Brooklyn Navy Yard itself. Flawless durability against harbor salt air.',
    specsTag: 'Architectural Bronze Patina • Core-Ten Framing',
    projectResult: 'Marine Grade Coating • Coastal Salt Proofed',
  },
  {
    id: 'jameson-cole',
    name: 'Jameson Cole',
    role: 'Founder & Head Roaster',
    company: 'DUMBO Artisan Coffee Co.',
    borough: 'DUMBO, Brooklyn',
    category: 'Food Truck Vehicle Wraps',
    group: 'fleet',
    rating: 5,
    year: '2024',
    highlight: 'Turned a Utility Van into an Icon',
    quote: 'They transformed our beat-up utility step van into a luxury matte charcoal and gold leaf mobile espresso bar. People photograph our truck wherever we park around Prospect Park and Brooklyn Heights.',
    specsTag: 'Avery Supreme Wrap • 23k Gold Leaf Foil',
    projectResult: 'Over 50,000 Social Impressions in First Month',
  },
  {
    id: 'victoria-sterling',
    name: 'Victoria Sterling',
    role: 'Managing Director',
    company: 'Sterling Asset Management',
    borough: 'Midtown East, Manhattan',
    category: 'Boardroom Titanium Signs',
    group: 'corporate',
    rating: 5,
    year: '2025',
    highlight: 'Clean, Silent Off-Hours Night Installation',
    quote: 'Our executive boardroom sign with edge-lit acrylic and brushed titanium backer was delivered ahead of our investor summit. Clean, quiet night installation without disrupting our trading floor operations.',
    specsTag: 'Brushed Titanium • Low-Voltage Diffusion LED',
    projectResult: 'Zero Day-Shift Downtime • Stamped UL Listed',
  },
  {
    id: 'antoine-mercier',
    name: 'Antoine Mercier',
    role: 'Owner & Executive Chef',
    company: 'Bistro Vivienne',
    borough: 'West Village, Manhattan',
    category: 'Handcrafted Neon Signs',
    group: 'hospitality',
    rating: 5,
    year: '2025',
    highlight: 'Bleecker Street’s Most Photographed Landmark',
    quote: 'True hand-bent neon is becoming a lost art in New York, but Signs NYC has real artisans. Our glowing warm amber blade sign is now the most photographed visual on Bleecker Street.',
    specsTag: 'Hand-Bent Glass Neon • Weatherproof Transformer',
    projectResult: 'Featured in Eater NYC & New York Times Dining',
  },
  {
    id: 'kevin-oconnor',
    name: 'Kevin O\'Connor',
    role: 'Facilities Director',
    company: 'St. George Academic Campus',
    borough: 'St. George, Staten Island',
    category: 'Campus Wayfinding Monuments',
    group: 'healthcare',
    rating: 5,
    year: '2024',
    highlight: '60+ Wayfinding Totems Anchored in Stone',
    quote: 'Over 60 exterior directional signs, campus maps, and building markers delivered and anchored into stone. Heavy-duty, vandal-resistant, and 100% compliant with NYC accessibility standards.',
    specsTag: 'Heavy Aluminum Pylon • Anti-Graffiti Overlam',
    projectResult: 'Complete Campus Navigation Overhaul',
  },
  {
    id: 'grace-kim',
    name: 'Grace Kim',
    role: 'Retail Operations VP',
    company: 'K-Beauty Global Flagship',
    borough: 'Koreatown, Manhattan',
    category: 'High-Lumen LED Lightboxes',
    group: 'retail',
    rating: 5,
    year: '2025',
    highlight: 'Zero Hotspots Across 20-Foot Vertical Frame',
    quote: 'In the brightest corridor of Manhattan, our 20-foot vertical ultra-bright LED lightbox cuts through the visual noise with immaculate color balance, vivid saturation, and zero hot spots.',
    specsTag: 'Frameless Silicone Edge Graphic (SEG) • 6500K LED',
    projectResult: '6500K Ultra-High CRI Color Balance',
  },
  {
    id: 'julian-rossi',
    name: 'Julian Rossi',
    role: 'Construction Superintendent',
    company: 'Apex Urban Developers',
    borough: 'Hudson Yards, Manhattan',
    category: 'Construction Jobsite Safety',
    group: 'landmarks',
    rating: 5,
    year: '2024',
    highlight: 'Turnkey Compliance Across 3 High-Rise Sites',
    quote: 'They handle all our DOB site safety signs, perimeter fence mesh, and project architect renderings across three concurrent high-rise jobsites. Never a delay, always 100% compliant.',
    specsTag: '13oz Heavyweight PVC • Fire Marshal Certified',
    projectResult: 'Zero Safety Audit Fines Across 18 Months',
  },
  {
    id: 'natasha-vass',
    name: 'Natasha Vass',
    role: 'Hospitality Director',
    company: 'The Grandview Rooftop Lounge',
    borough: 'Chelsea, Manhattan',
    category: 'Skyline Rooftop Signs',
    group: 'hospitality',
    rating: 5,
    year: '2025',
    highlight: 'Engineered for 120 MPH Hudson River Gale Winds',
    quote: 'Engineering a rooftop sign exposed to 60+ MPH Hudson River winds requires serious structural calculations. Signs NYC\'s structural engineers stamped and anchored our beacon flawlessly.',
    specsTag: 'Structural Steel I-Beam • PE Certified Stamped',
    projectResult: 'Engineered & Stamped for 120 MPH NYC Wind Loads',
  },
  {
    id: 'dmitri-volkov',
    name: 'Dmitri Volkov',
    role: 'Logistics Manager',
    company: 'Metro NYC Delivery Fleet',
    borough: 'Astoria, Queens',
    category: 'Sprinter Van Fleet Wraps',
    group: 'fleet',
    rating: 5,
    year: '2025',
    highlight: '18 Commercial Vans Wrapped Over Two Weekends',
    quote: 'Wrapped 18 Mercedes Sprinter vans over two weekends so our delivery operations suffered zero downtime. Crisp printing, edge-wrapped seams, and heavy-duty protective overlaminates.',
    specsTag: 'Avery MPI 1105 Cast • Anti-Scuff Overlam',
    projectResult: 'Zero Weekend Downtime for Commercial Logistics',
  },
  {
    id: 'hannah-bernstein',
    name: 'Hannah Bernstein',
    role: 'President',
    company: 'LES Historic Preservation Trust',
    borough: 'Lower East Side, Manhattan',
    category: 'Historic Wooden Sign Restoration',
    group: 'landmarks',
    rating: 5,
    year: '2024',
    highlight: '1920s Traditional Gold Leaf Preserved',
    quote: 'Signs NYC restored our 1920s hand-carved guilded wooden sign with traditional gold leaf technique. They preserved historical integrity while adding discreet modern weatherproofing.',
    specsTag: '23 Karat Gold Leaf • Hand-Carved HDU Substrate',
    projectResult: 'Historic Preservation Award Winner 2024',
  },
  {
    id: 'tariq-al-mansoor',
    name: 'Tariq Al-Mansoor',
    role: 'General Counsel',
    company: 'Starlight Broadway Theatricals',
    borough: 'Theater District, Manhattan',
    category: 'Building Wraps & Mesh Banners',
    group: 'retail',
    rating: 5,
    year: '2025',
    highlight: '90-Foot Times Square Facade Wrap Overnight',
    quote: 'When we launched our theatrical run, Signs NYC produced and hung a 90-foot building wrap overnight. Vibrant UV-cured ink that looked razor sharp under the intense Times Square halogen lights.',
    specsTag: 'Heavyweight Air-Mesh • UV Curable Pigment',
    projectResult: 'Overnight Rigging & Crane Mounting in Times Square',
  },
  {
    id: 'dr-rachel-levin',
    name: 'Dr. Rachel Levin',
    role: 'Medical Director',
    company: 'Park Slope Medical Associates',
    borough: 'Park Slope, Brooklyn',
    category: 'ADA Braille Wayfinding',
    group: 'healthcare',
    rating: 5,
    year: '2025',
    highlight: 'Complete 3-Story ADA Compliant Sign System',
    quote: 'Complete interior wayfinding system for our three-story clinic: tactile Braille signs, photoluminescent egress markers, and sleek brushed aluminum exam room directories. Flawless inspection pass.',
    specsTag: 'Photopolymer Raised Braille • Grade 2 ADA',
    projectResult: '100% Pass Rate on NYC Health Dept Inspection',
  },
  {
    id: 'samuel-brody',
    name: 'Samuel Brody',
    role: 'Principal Architect',
    company: 'Brody & Wright Architecture',
    borough: 'NoHo, Manhattan',
    category: 'Bespoke Architectural Signage',
    group: 'corporate',
    rating: 5,
    year: '2024',
    highlight: 'Direct Revit Integration & Sub-Millimeter Cut',
    quote: 'As architects, we have zero tolerance for sloppy tolerances. Signs NYC works directly with our Revit models and CNC cuts with micrometer precision. They are our definitive signage partner.',
    specsTag: '5-Axis CNC Milling • Anodized Architectural Finish',
    projectResult: 'Direct BIM / Revit CAD Integration',
  },
  {
    id: 'lucia-mendez',
    name: 'Lucia Mendez',
    role: 'Store Director',
    company: 'SoHo Fashion Boutique',
    borough: 'Spring Street, SoHo',
    category: 'Dusted Crystal Glass Vinyl',
    group: 'retail',
    rating: 5,
    year: '2025',
    highlight: 'Looks Like Hand-Etched Acid Glass',
    quote: 'The frosted dusted crystal vinyl graphics on our entrance doors and display vitrines look like genuine sandblasted acid-etched glass at a fraction of the weight and turnaround time.',
    specsTag: '3M Dusted Crystal • Precision Plotter Cut',
    projectResult: 'Turnaround in 48 Hours Before Fashion Week',
  },
  {
    id: 'patrick-gallagher',
    name: 'Patrick Gallagher',
    role: 'Owner',
    company: 'The Kerryman Pub & Tavern',
    borough: 'Riverdale, The Bronx',
    category: 'Carved 3D HDU Signs',
    group: 'hospitality',
    rating: 5,
    year: '2024',
    highlight: 'Routed Celtic Knotwork with 23k Gold Trim',
    quote: 'Hand-routed 3D Celtic knotwork and 23k gold leaf on HDU that will outlive us all without rotting or splitting like natural wood. It\'s the talk of our whole neighborhood in the Bronx.',
    specsTag: 'High-Density Urethane • 23k Gilding • Enamel Coat',
    projectResult: 'Rot-Proof Lifetime Architectural Guarantee',
  },
  {
    id: 'zoe-krevsky',
    name: 'Zoe Krevsky',
    role: 'Marketing VP',
    company: 'Equinox Luxury Health Clubs',
    borough: 'Tribeca, Manhattan',
    category: 'Elevator Architectural Wraps',
    group: 'corporate',
    rating: 5,
    year: '2025',
    highlight: 'Class A Fire Rated Elevator Cab Overhaul',
    quote: '3M architectural matte cast wraps inside our passenger elevators. Scratch-resistant, fire-rated, and member engagement skyrocketed. Signs NYC executed the night installs cleanly without any disruption.',
    specsTag: '3M DI-NOC Architectural • ASTM E84 Class A',
    projectResult: 'Class A ASTM E84 Fire Rating Fully Certified',
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const totalReviews = TESTIMONIALS_DATA.length;
  const activeReview = TESTIMONIALS_DATA[currentIndex];

  // Navigation handlers
  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto-play timer
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        backgroundColor: '#090D16',
        padding: 'clamp(5rem, 8vw, 8.5rem) 0 clamp(4rem, 6vw, 6rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
      }}
      aria-roledescription="carousel"
      aria-label="NYC Client Testimonials Slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image: Real NYC Signage Across Industries */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/images/industries.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Atmospheric dark gradient overlay to preserve signage glow while ensuring pristine contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgb(0 21 69 / 94%) 0%, rgb(0 21 69 / 94%) 100%),
            linear-gradient(to bottom, rgba(7, 10, 18, 0.85) 0%, rgba(7, 10, 18, 0.62) 40%, rgba(7, 10, 18, 0.72) 70%, rgba(7, 10, 18, 0.9) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* SECTION HEADER: High Authority & Clear Focus on Review */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '880px',
            margin: '0 auto clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          {/* Eyebrow Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#60A5FA',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            }}
          >
            CLIENT REVIEWS
          </div>

          {/* Main Headline */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 4.4vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: '0 0 1rem',
              textTransform: 'uppercase',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            THE PROOF IS IN THE <span style={{ color: '#3B82F6', textShadow: '0 0 28px rgba(59, 130, 246, 0.6)' }}>WORDS</span>.
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.15vw, 1.15rem)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.82)',
              maxWidth: '680px',
              margin: 0,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
            }}
          >
            Real feedback from business owners, general contractors, landmark architects, and operations directors who trusted Signs NYC.
          </p>
        </div>

        {/* MAIN SLIDER STAGE: FOCUSED SQUARELY ON THE REVIEW */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* THE HERO REVIEW CARD */}
          <div
            key={activeReview.id}
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(2rem, 3.5vw, 3.25rem)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.45), 0 2px 12px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '400px',
              overflow: 'hidden',
              animation: direction === 'next' ? 'slideInRight 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'slideInLeft 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Giant Architectural Watermark Quotation Mark */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                right: '25px',
                fontFamily: 'Georgia, serif',
                fontSize: '180px',
                lineHeight: 1,
                fontWeight: 900,
                color: 'rgba(30, 86, 255, 0.04)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              “
            </div>

            {/* Top Review Metadata Bar */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.85rem',
                  marginBottom: '1.75rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid rgba(17, 17, 17, 0.06)',
                }}
              >
                {/* 5-Star Rating + Borough Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      padding: '0.35rem 0.7rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                    ))}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        color: '#B45309',
                        marginLeft: '0.35rem',
                      }}
                    >
                      5.0 RATING
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#111111',
                      backgroundColor: '#F8F7F2',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(17, 17, 17, 0.06)',
                    }}
                  >
                    <MapPin size={13} color="#1E56FF" />
                    {activeReview.borough}
                  </div>
                </div>
              </div>

              {/* REVIEW FOCUS #1: THE BOLD HEADLINE */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.35rem, 2.3vw, 2rem)',
                  fontWeight: 900,
                  lineHeight: 1.22,
                  letterSpacing: '-0.02em',
                  color: '#111111',
                  margin: '0 0 1.25rem',
                }}
              >
                “{activeReview.highlight}”
              </h3>

              {/* REVIEW FOCUS #2: THE IN-DEPTH CLIENT REVIEW TEXT */}
              <blockquote
                style={{
                  margin: '0 0 2rem',
                  padding: 0,
                  fontSize: 'clamp(1.02rem, 1.4vw, 1.22rem)',
                  lineHeight: 1.68,
                  color: '#2A2A2A',
                  fontWeight: 450,
                  fontStyle: 'normal',
                }}
              >
                {activeReview.quote}
              </blockquote>
            </div>

            {/* Bottom Profile Bar: Author Credentials */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              {/* Author Monogram & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1E56FF 0%, #111111 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(30, 86, 255, 0.25)',
                    flexShrink: 0,
                  }}
                >
                  {activeReview.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)}
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.08rem',
                      fontWeight: 900,
                      color: '#111111',
                      lineHeight: 1.2,
                    }}
                  >
                    {activeReview.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.84rem',
                      color: '#666666',
                      marginTop: '0.2rem',
                    }}
                  >
                    {activeReview.role} • <strong style={{ color: '#111111' }}>{activeReview.company}</strong>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: '#10B981',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
              >
                <ShieldCheck size={14} color="#10B981" />
                VERIFIED NYC CLIENT
              </div>
            </div>
          </div>

        </div>

        {/* SLIDER CONTROLS: PREV / COUNTER / NEXT */}
        <div
          style={{
            maxWidth: '900px',
            margin: '1.75rem auto 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
          }}
        >
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="slider-nav-btn"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Step Counter */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 900,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#60A5FA', fontSize: '1.05rem' }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>/</span>
            <span>{String(totalReviews).padStart(2, '0')}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.72rem', fontWeight: 600 }}>
              REVIEWS
            </span>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#1E56FF',
              border: '1px solid #1E56FF',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(30, 86, 255, 0.4)',
            }}
            className="slider-nav-btn"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slider-nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

      `}</style>
    </section>
  );
}
