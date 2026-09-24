'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  MapPin,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  X,
  Filter,
  Layers,
  Maximize2,
  SlidersHorizontal,
  Compass,
  Zap,
  Tag,
  Eye,
  FileText,
  Clock,
  Phone,
  Grid3X3,
  LayoutGrid,
  FileCode2,
  Award,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CampaignModal from '@/components/CampaignModal';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  borough: 'Manhattan' | 'Brooklyn' | 'Queens' | 'The Bronx' | 'Staten Island';
  neighborhood: string;
  category: 'storefront' | 'awnings' | 'neon' | 'fleet' | 'corporate' | 'landmarks';
  categoryLabel: string;
  year: string;
  dimensions: string;
  materials: string;
  lighting: string;
  dobPermit: string;
  windLoad: string;
  resultMetric: string;
  summary: string;
  image: string;
  blueprintImg?: string;
  tags: string[];
  featured?: boolean;
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'soho-luxury-flagship',
    title: 'SoHo Luxury Flagship Halo Channel Letters',
    client: 'SoHo Luxury Group',
    borough: 'Manhattan',
    neighborhood: 'Spring St & Mercer, SoHo',
    category: 'storefront',
    categoryLabel: 'Storefront Channel Letters',
    year: '2025',
    dimensions: '22\'-4" L x 28" H x 3.5" D',
    materials: 'Brushed Architectural Brass Face, 0.080" Heavy Aluminum Welded Returns, Cast Acrylic Backer',
    lighting: 'Reverse Halo 3000K Warm White LEDs, Low-Voltage Remote UL Power Supplies',
    dobPermit: 'DOB Class 1 #000185 & LPC Landmark Historic District Approval',
    windLoad: 'Engineered for 120 MPH Wind Uplift, Seismic Class B Stamped',
    resultMetric: '+42% Foot Traffic Lift • 100% LPC Compliance',
    summary:
      'Turnkey facade transformation in the protected SoHo-Cast Iron Historic District. Navigated rigorous Landmark Preservation Commission (LPC) material hearings, precision-cut waterjet brass letters, and mounted with hidden stainless studs into historic masonry without damage.',
    image: '/Signsny/Outdoor Signs/Channel Letters/Channel Letters.jpg.webp',
    tags: ['#HaloLit', '#ArchitecturalBrass', '#LandmarkDOB', '#SoHoFlagship'],
    featured: true,
  },
  {
    id: 'midtown-retractable-canopy',
    title: 'Midtown Hospitality Commercial Retractable Canopy',
    client: 'Metro Hospitality NYC',
    borough: 'Manhattan',
    neighborhood: 'West 48th St, Midtown Manhattan',
    category: 'awnings',
    categoryLabel: 'Commercial Retractable Awnings',
    year: '2025',
    dimensions: '34\'-0" Projection x 18\'-6" Width',
    materials: 'Heavy Extruded Aluminum Truss, Marine-Grade Sunbrella Firesist Acrylic, Heavy Steel Anchor Plates',
    lighting: 'Integrated Under-Truss Dimmable LED Strip Lighting (2700K)',
    dobPermit: 'DOB Structural Sign-Off & NYC Fire Department Flame Certification',
    windLoad: 'Automated Somfy Wind Sensor Retraction at 35 MPH, Static Load 110 MPH',
    resultMetric: 'Zero Storm Downtime • 24/7 Emergency Dispatch',
    summary:
      'Engineered an expansive motorized entrance awning for a high-traffic Midtown venue. Includes automated wind sensors, heavy-duty structural outriggers, and custom branded valances designed to withstand brutal Midtown crosswinds.',
    image: '/Signsny/Outdoor Signs/Commercial Awnings/Commercial Awnings.jpg.webp',
    tags: ['#SunbrellaMarine', '#MotorizedTruss', '#MidtownHospitality', '#WindRated'],
    featured: true,
  },
  {
    id: 'dumbo-bronze-monolith',
    title: 'DUMBO Contemporary Bronze-Patina Directional Monolith',
    client: 'Brooklyn Contemporary Arts',
    borough: 'Brooklyn',
    neighborhood: 'Water St, DUMBO Waterfront',
    category: 'landmarks',
    categoryLabel: 'Architectural Monuments',
    year: '2025',
    dimensions: '10\'-0" H x 4\'-2" W x 14" D',
    materials: 'Heavy Corten Steel Framework, Hot-Patina Architectural Bronze Panels, Anti-Graffiti Matte Coating',
    lighting: 'Ground-Recessed Low-Profile Uplighting, 4000K Neutral Glow',
    dobPermit: 'DOB Public Wayfinding Sign-Off & Marine Harbor Salt-Shield Verification',
    windLoad: 'Engineered for 130 MPH East River Coastal Gale Winds',
    resultMetric: 'Lifetime Weatherproof Guarantee • Salt-Air Proofed',
    summary:
      'Fabricated an industrial-grade exterior directional monument reflecting the Brooklyn Navy Yard heritage. Uses hand-rubbed hot patina bronze designed to age gracefully in the humid, salt-laden East River marine environment.',
    image: '/Signsny/Indoor Signs/Metal Letters/Types/Fabricated Metal/Fabricated Metal.jpg',
    tags: ['#BronzePatina', '#CortenSteel', '#DUMBOArts', '#MarineGrade'],
    featured: true,
  },
  {
    id: 'west-village-neon-blade',
    title: 'Bleecker Street Hand-Bent Glass Neon Blade Sign',
    client: 'Bistro Vivienne',
    borough: 'Manhattan',
    neighborhood: 'Bleecker St, West Village',
    category: 'neon',
    categoryLabel: 'Hand-Bent Neon & Blade Signs',
    year: '2025',
    dimensions: '48" H x 32" W x 8" D Projection',
    materials: 'Hand-Bent 12mm Amber Glass Neon, Double-Sided Welded Aluminum Cabinet, Matte Black Urethane',
    lighting: 'Traditional High-Voltage Neon Transformers, UL 48 Weatherproof Enclosure',
    dobPermit: 'DOB Illuminated Blade Sign Permit & LPC District Authorization',
    windLoad: 'Through-Bolt Masonry Anchors Rated to 115 MPH Wind Thrust',
    resultMetric: 'Most Photographed Facade on Bleecker St • Eater Featured',
    summary:
      'Honoring authentic West Village nostalgia with hand-blown warm amber neon glass. Built on a double-sided illuminated blade cabinet projecting over the sidewalk to capture pedestrian sightlines from both avenues.',
    image: '/Signsny/Indoor Signs/Neon Signs/Neon Signs.jpg.webp',
    tags: ['#HandBentNeon', '#BladeSign', '#WestVillage', '#EaterFeatured'],
    featured: true,
  },
  {
    id: 'tri-state-coach-bus-wraps',
    title: 'Tri-State Charter 45-Foot Luxury Coach Fleet Wraps',
    client: 'Tri-State Charter Express',
    borough: 'The Bronx',
    neighborhood: 'Mott Haven Logistics Corridor',
    category: 'fleet',
    categoryLabel: 'Fleet Vehicle Wraps',
    year: '2025',
    dimensions: '45\'-0" Length x 12\'-6" Height (Multi-Bus Fleet)',
    materials: '3M Controltac IJ180Cv3 Cast Vinyl, 3M Scotchcal 8518 Gloss Overlaminate',
    lighting: 'Reflective 3M Diamond Grade Conspicuity Perimeter Striping',
    dobPermit: 'US DOT & NYS Commercial Fleet Advertising Certification',
    windLoad: 'Tested to 75 MPH Highway Air Turbulence & Automated High-Pressure Wash Systems',
    resultMetric: 'Full 7-Year 3M MCS Warranty • 100% Zero Seam Lift',
    summary:
      'Multi-vehicle fleet overhaul completed across consecutive weekends in our climate-controlled Brooklyn wrap bays. Perfectly aligned complex multi-panel graphics across curved wheel bays, rivets, and window perforation.',
    image: '/Signsny/Vehicle Wraps/Bus Wrapping/Designs/02-custom bus wrapping in ny.jpg',
    tags: ['#3MCastVinyl', '#FleetBranding', '#BusWrap', '#7YearWarranty'],
    featured: true,
  },
  {
    id: 'flatiron-stainless-headquarters',
    title: 'Silicon Alley 14-Foot Waterjet 316 Stainless Logo',
    client: 'Flatiron Tech Headquarters',
    borough: 'Manhattan',
    neighborhood: 'Flatiron District, Manhattan',
    category: 'corporate',
    categoryLabel: 'Corporate Lobby Signs',
    year: '2025',
    dimensions: '14\'-2" W x 4\'-6" H x 2" D',
    materials: 'Waterjet Cut 1/2" Solid 316 Stainless Steel, #4 Brushed Directional Satin Finish, Edge-Lit Acrylic',
    lighting: 'Edge-Lit Warm White Diffusion LEDs, Hidden Conduit Channel Backer',
    dobPermit: 'NYC Interior Commercial Alteration Sign-Off',
    windLoad: 'Seismic Anchor Bracket Stamped for High-Rise Floor Deflection',
    resultMetric: 'Sub-Millimeter Tolerances Across 14 Feet',
    summary:
      'Engineered for a premier technology headquarters on the 28th floor. Precision waterjet cutting achieved razor-sharp vector accuracy, complemented by seamless blind stud mounting into structural book-matched Italian marble.',
    image: '/Signsny/Indoor Signs/Metal Plaques/Cast Metal Plaques/Cast Metal Plaques.jpg',
    tags: ['#316Stainless', '#WaterjetMilled', '#CorporateLobby', '#SiliconAlley'],
  },
  {
    id: 'lic-rehab-perforated-wrap',
    title: 'Rehabilitation Clinic 70/30 One-Way Window Perforation',
    client: 'Peak Performance Physical Therapy',
    borough: 'Queens',
    neighborhood: 'Long Island City Waterfront',
    category: 'storefront',
    categoryLabel: 'Perforated Window Wraps',
    year: '2025',
    dimensions: '48\'-0" Span x 11\'-0" Height',
    materials: '3M Scotchcal 70/30 Micro-Perforated Cast Film, Optically Clear UV Lamination',
    lighting: 'Daylight Filtered Natural Ambient Lighting',
    dobPermit: 'DOB Window Coverage Code Verified (Under 20% Non-Commercial Transparency Rule)',
    windLoad: 'Direct Glass Substrate Adhesion Tested to 120 MPH',
    resultMetric: '100% Patient Privacy Maintained • 38% Booking Surge',
    summary:
      'Overcame direct southwest solar glare while preserving therapeutic natural daylight. Micro-perforations offer complete interior privacy for rehabilitation patients while showcasing high-impact anatomical graphics to passing streetcars.',
    image: '/Signsny/Vinyl Graphics/Perforated Window Wraps/Designs/06-rehab clinic perforated window wrap with movement and anatomy visuals.jpg',
    tags: ['#OneWayPerf', '#PatientPrivacy', '#LICQueens', '#UVProtected'],
  },
  {
    id: 'madison-ave-florals-awning',
    title: 'Madison Avenue Bespoke Matte Charcoal Awning',
    client: 'Farima Perry Florals',
    borough: 'Manhattan',
    neighborhood: 'Madison Ave & 74th St, Upper East Side',
    category: 'awnings',
    categoryLabel: 'Commercial Retail Awnings',
    year: '2025',
    dimensions: '18\'-6" Length x 5\'-0" Projection',
    materials: 'Welded Structural Aluminum Tube Frame, Sunbrella Firesist Charcoal Fabric, Hand-Applied 23k Gold Leaf Foil',
    lighting: 'Concealed LED Soffit Downlights (3000K High CRI 95+)',
    dobPermit: 'LPC Upper East Side Historic District Approved & DOB Awning Permit',
    windLoad: 'Wind Tested for 110 MPH Gusts, Heavy Snow Load Certified',
    resultMetric: 'Footfall Increased Immediately • Madison Ave LPC Compliant',
    summary:
      'Replaced a weathered vinyl canopy with a luxury tailored architectural awning. Complied with strict Upper East Side historic preservation guidelines while enhancing street presence for high-end luxury clientele.',
    image: '/Signsny/Outdoor Signs/Blade Signs/Blade Signs.jpg.webp',
    tags: ['#MadisonAvenue', '#BespokeAwning', '#GoldLeafDetail', '#LPCApproved'],
  },
  {
    id: 'williamsburg-dining-barriers',
    title: 'Williamsburg Outdoor Dining Welded Steel Barriers',
    client: 'The Banyan Grill',
    borough: 'Brooklyn',
    neighborhood: 'Grand St, Williamsburg',
    category: 'awnings',
    categoryLabel: 'Sidewalk Dining Barriers',
    year: '2025',
    dimensions: '42\'-0" Total Linear Run (Modular 6ft Sections)',
    materials: 'Tubular Steel Frame, Textured Matte Powder Coating, Heavy UV Marine Canvas Inserts',
    lighting: 'Solar-Charged Amber Nighttime Warning Beacons',
    dobPermit: 'NYC Department of Transportation (DOT) Outdoor Dining Compliant',
    windLoad: 'Weighted Base Ballast Resisting 85 MPH Gusts Without Ground Bolting',
    resultMetric: 'Passed NYC DOT Inspection on Day One',
    summary:
      'Designed and welded modular sidewalk cafe barriers conforming to strict post-pandemic NYC DOT roadway and sidewalk dining codes. Features branded canvas panels that are easily swapped between seasonal campaigns.',
    image: '/Signsny/Outdoor Signs/Sidewalk Barriers/Designs/03-restaurant sidewalk barriers nyc.jpg',
    tags: ['#NYCDOTDining', '#PowderCoatedSteel', '#Williamsburg', '#ModularCafe'],
  },
  {
    id: 'wall-street-titanium-plaque',
    title: 'Financial District Boardroom Brushed Titanium Plaque',
    client: 'Sterling Asset Management',
    borough: 'Manhattan',
    neighborhood: '110 Wall St, Financial District',
    category: 'corporate',
    categoryLabel: 'Corporate Lobby Signs',
    year: '2025',
    dimensions: '60" W x 36" H x 1.75" D',
    materials: 'Grade 5 Brushed Titanium, Back-Painted Low-Iron Glass, Solid Aircraft Aluminum Standoffs',
    lighting: 'Perimeter Diffusion Low-Voltage LEDs, 3500K Executive Tone',
    dobPermit: 'Commercial Interior Building Sign-Off',
    windLoad: 'Interior Wall Anchor Assembly Rated to 500 lbs Shear Force',
    resultMetric: 'Silent Overnight Off-Hours Installation with Zero Downtime',
    summary:
      'Fabricated and mounted an executive boardroom plaque in a premier Wall Street skyscraper. Completed silently during off-hours to eliminate disruption to active financial trading floor operations.',
    image: '/Signsny/Indoor Signs/Lobby Signs/Lobby Signs.jpg.webp',
    tags: ['#BrushedTitanium', '#FinancialDistrict', '#ExecutiveLobby', '#LowIronGlass'],
  },
  {
    id: 'times-square-building-wrap',
    title: 'Times Square 90-Foot Building Facade Mesh Wrap',
    client: 'Starlight Broadway Theatricals',
    borough: 'Manhattan',
    neighborhood: '44th St & Broadway, Theater District',
    category: 'landmarks',
    categoryLabel: 'Large Format & Building Wraps',
    year: '2025',
    dimensions: '90\'-0" H x 42\'-0" W',
    materials: '10oz Heavyweight Air-Mesh PVC, Reinforced Seatbelt-Webbing Edges, Galvanized Aircraft Cable Rigging',
    lighting: 'UV-Curable High-Saturation Inks Illuminated by Times Square Ambient Floodlights',
    dobPermit: 'NYC DOB Special Sign Permit & Scaffold Wrap Fire Marshal Seal',
    windLoad: 'Vented Mesh with 35% Wind Porosity Engineered for 100 MPH Crosswinds',
    resultMetric: 'Overnight Crane Rigging • 10M+ Weekly Impressions',
    summary:
      'Rigged and hung a massive 9-story facade banner overnight in the epicenter of Times Square. Required specialized street closures, crane hoists, and wind-porous mesh to comply with DOB high-altitude safety standards.',
    image: '/images/intro_real_signs.jpg',
    tags: ['#TimesSquare', '#BuildingWrap', '#OvernightRigging', '#DOBSpecialSign'],
  },
  {
    id: 'dumbo-espresso-van-wrap',
    title: 'DUMBO Artisan Coffee Co. Matte & Gold Leaf Van Wrap',
    client: 'DUMBO Artisan Coffee Co.',
    borough: 'Brooklyn',
    neighborhood: 'DUMBO Waterfront, Brooklyn',
    category: 'fleet',
    categoryLabel: 'Vehicle Wraps & Fleet',
    year: '2024',
    dimensions: 'Mercedes Sprinter High-Roof Extended',
    materials: 'Avery Dennison Supreme Matte Metallic Charcoal, 23-Karat Gold Leaf Metallic Accents',
    lighting: 'Reflective Outline Accents for Nighttime Food Festival Visibility',
    dobPermit: 'NYC Mobile Food Unit Advertising Clearance',
    windLoad: 'Aerodynamic Edge-Wrapped Seams Tested to 85 MPH Highway Conditions',
    resultMetric: '50,000+ Social Impressions in First 30 Days',
    summary:
      'Transformed a utility step van into a luxury mobile espresso bar. Matte charcoal background paired with genuine metallic gold accents created an instantly recognizable mobile icon across Brooklyn streetscapes.',
    image: '/Signsny/Vehicle Wraps/Van Wrapping/Designs/01-best custom van wraps in nyc.jpg',
    tags: ['#MatteCharcoal', '#GoldLeafAccents', '#MobileCoffee', '#SprinterWrap'],
  },
  {
    id: 'astoria-historic-church-wood',
    title: 'Astoria Historic Parish Hand-Carved Guilded Wood Restoration',
    client: 'Astoria Historic Preservation Trust',
    borough: 'Queens',
    neighborhood: '30th Ave, Astoria',
    category: 'landmarks',
    categoryLabel: 'Historic Restorations',
    year: '2024',
    dimensions: '8\'-0" W x 4\'-0" H x 3" Thick',
    materials: 'Solid High-Density Urethane (HDU) Core, Traditional 23k Gold Leaf Hand-Guilding, Exterior Enamels',
    lighting: 'Concealed Gooseneck Architectural Fixtures (2700K Warm)',
    dobPermit: 'LPC Historic Religious Landmark Restoration Permit',
    windLoad: 'Through-Bolt Granite Mounting System Stamped to 110 MPH',
    resultMetric: 'Historic Preservation Award Winner • Rot-Proof HDU Core',
    summary:
      'Restored a century-old church facade plaque that had rotted from decades of moisture. Replicated the exact 1920s hand-carved relief using modern rot-proof HDU, finished with authentic 23-karat gold leaf.',
    image: '/Signsny/Outdoor Signs/Carved Signs/Carved Signs.jpg.webp',
    tags: ['#HistoricRestoration', '#23kGoldLeaf', '#HDUCarved', '#AstoriaQueens'],
  },
  {
    id: 'equinox-tribeca-elevators',
    title: 'Equinox Luxury Health Clubs Class A Elevator Wraps',
    client: 'Equinox Luxury Health Clubs',
    borough: 'Manhattan',
    neighborhood: 'Greenwich St, Tribeca',
    category: 'corporate',
    categoryLabel: 'Architectural Vinyl Wraps',
    year: '2025',
    dimensions: '4 Passenger Elevator Cabs (Interior & Landing Doors)',
    materials: '3M DI-NOC Architectural Matte Film, Anti-Microbial & Scratch-Resistant Hardcoat',
    lighting: 'Integrated Elevator Canopy Diffused Downlighting',
    dobPermit: 'ASTM E84 Class A Fire Rated & NYC DOB Elevator Division Inspection Pass',
    windLoad: 'Engineered for High-Velocity Shaft Air Compression (Piston Effect)',
    resultMetric: 'Zero Club Disruption • Passed NYC Elevator Division Inspection',
    summary:
      'Upgraded 4 passenger elevator cabs with heavy-duty architectural DI-NOC vinyl simulating brushed titanium and dark slate. Delivered clean overnight installations that maintained complete daytime member access.',
    image: '/Signsny/Vinyl Graphics/Elevator Wraps/Types/Architectural Finishes/Architectural Finishes.jpg',
    tags: ['#3MDINOC', '#ClassAFireRated', '#ElevatorOverhaul', '#TribecaEquinox'],
  },
  {
    id: 'koreatown-led-lightbox',
    title: 'Koreatown 20-Foot Ultra-Bright SEG LED Lightbox',
    client: 'K-Beauty Global Flagship',
    borough: 'Manhattan',
    neighborhood: 'West 32nd St, Koreatown',
    category: 'storefront',
    categoryLabel: 'High-Lumen LED Lightboxes',
    year: '2025',
    dimensions: '20\'-0" H x 6\'-0" W x 4.5" D',
    materials: 'Extruded Anodized Aluminum SEG Frame, Backlit Dye-Sublimated Textile Fabric',
    lighting: 'Edge-Lit High-Lumen 6500K Nichia LEDs, High CRI 95+, Zero Hotspots',
    dobPermit: 'NYC DOB Illuminated Sign Permit & Electrical Inspection Pass',
    windLoad: 'Structural Facade Reinforcement Tested to 120 MPH Wind Load',
    resultMetric: 'Zero Visual Hotspots • Cuts Through 32nd St Neon Noise',
    summary:
      'Engineered a soaring 20-foot vertical lightbox on one of Manhattan’s most neon-saturated corridors. Seamless dye-sublimated fabric diffuser produces uniform edge-to-edge luminescence without distracting shadows.',
    image: '/Signsny/Outdoor Signs/Light Box Signs/Light Box Signs.jpg.webp',
    tags: ['#SEGLightbox', '#HighLumenLED', '#Koreatown', '#ArchitecturalGlow'],
  },
  {
    id: 'meatpacking-blade-steel',
    title: 'Meatpacking District Heavy Cantilevered Steel Blade',
    client: 'The Gansevoort Culinary Collective',
    borough: 'Manhattan',
    neighborhood: 'Gansevoort St, Meatpacking District',
    category: 'neon',
    categoryLabel: 'Hand-Bent Neon & Blade Signs',
    year: '2025',
    dimensions: '5\'-6" Projection x 42" H x 12" D',
    materials: 'Blackened 3/8" Structural Steel Plate, Warm White Halo Acrylic Letters, Industrial Exposed Fasteners',
    lighting: 'Low-Voltage Concealed LED Modules, IP67 Waterproof Rating',
    dobPermit: 'DOB Class 1 Master Sign Hanger Crane Permit & LPC District Sign-Off',
    windLoad: 'PE Stamped Structural Wind Calculations to 125 MPH Wind Shear',
    resultMetric: 'LPC Historic District Unanimous Approval',
    summary:
      'Reflecting the industrial meatpacking history with blackened raw steel and warm halo illumination. Cantilevered over cobblestones with structural engineering stamped to resist extreme winter crosswinds.',
    image: '/Signsny/Outdoor Signs/Wall Pan Signs/Wall Pan Signs.jpg.webp',
    tags: ['#BlackenedSteel', '#Meatpacking', '#CantileverBlade', '#IndustrialChic'],
  },
  {
    id: 'st-george-campus-wayfinding',
    title: 'St. George Academic Campus Monument Wayfinding Network',
    client: 'St. George Educational Campus',
    borough: 'Staten Island',
    neighborhood: 'St. George Harbor District',
    category: 'landmarks',
    categoryLabel: 'Campus Wayfinding Monuments',
    year: '2024',
    dimensions: '60+ Wayfinding Totems & Building Markers Across 14 Acres',
    materials: 'Heavy Welded Aluminum Pylons, 3M Anti-Graffiti Protective Overlaminate, Cast Concrete Foundation Anchors',
    lighting: 'Solar Photovoltaic Illuminated Header Panels',
    dobPermit: 'NYC Accessibility & Public Transit Signage ADA Compliance',
    windLoad: 'Harbor Gale Tested to 115 MPH Coastal Wind Speeds',
    resultMetric: '100% ADA Compliance Across 60+ Campus Stations',
    summary:
      'Comprehensive wayfinding system anchored into stone and concrete across 14 acres. Engineered for high vandal resistance, clear sightlines, and complete compliance with NYC accessibility standards.',
    image: '/Signsny/Indoor Signs/Directory Signs/Directory Signs.jpg.webp',
    tags: ['#CampusWayfinding', '#AntiGraffiti', '#ADACompliance', '#StatenIsland'],
  },
  {
    id: 'park-slope-ada-braille',
    title: 'Park Slope Medical Center 3-Story Tactile ADA System',
    client: 'Park Slope Medical Associates',
    borough: 'Brooklyn',
    neighborhood: '7th Ave, Park Slope',
    category: 'corporate',
    categoryLabel: 'ADA Braille Signage',
    year: '2025',
    dimensions: '180 Interior Tactile Signs, Room Numbers & Egress Maps',
    materials: 'Direct-Molded Photopolymer Tactile Braille, Matte Non-Glare Acrylic, Brushed Aluminum Accents',
    lighting: 'Photoluminescent Egress Glow Technology (Meets NYC Local Law 26)',
    dobPermit: 'NYC Department of Health & DOB Interior ADA Inspection Pass',
    windLoad: 'N/A (Interior Life-Safety & ADA Compliant)',
    resultMetric: '100% Pass Rate on NYC Health Department Inspection',
    summary:
      'Designed, manufactured, and installed complete tactile ADA Grade 2 Braille signage for a three-story medical clinic. Includes photoluminescent emergency evacuation maps compliant with NYC Local Law 26.',
    image: '/Signsny/Indoor Signs/ADA Signs/ADA Signs.jpg.webp',
    tags: ['#ADABraille', '#LocalLaw26', '#ParkSlopeMedical', '#Photopolymer'],
  },
  {
    id: 'astoria-sprinter-fleet',
    title: 'Metro NYC Delivery Fleet 18 Sprinter Commercial Wraps',
    client: 'Metro NYC Logistics',
    borough: 'Queens',
    neighborhood: 'Astoria Industrial Depot',
    category: 'fleet',
    categoryLabel: 'Fleet Vehicle Wraps',
    year: '2025',
    dimensions: '18 Mercedes Sprinter Cargo Vans (Complete Commercial Fleet)',
    materials: 'Avery Dennison MPI 1105 Cast Film, DOL 1360Z Gloss Overlaminate',
    lighting: 'High-Visibility Conspicuity DOT Rear Chevrons',
    dobPermit: 'NYC Commercial Logistics Fleet Compliance',
    windLoad: 'Industrial Pressure-Wash Tested to 2,500 PSI Adhesion',
    resultMetric: 'Zero Fleet Downtime • Installed in Two 48-Hour Shifts',
    summary:
      'Turnkey fleet wrapping for 18 commercial logistics vans executed across two 48-hour weekend shifts to ensure zero operational delivery downtime. Seamless edge wrapping prevents peeling through automated car washes.',
    image: '/Signsny/Vehicle Wraps/Van Wrapping/Van Wrapping.jpg.webp',
    tags: ['#18VanFleet', '#ZeroDowntime', '#CommercialLogistics', '#AstoriaDepot'],
  },
  {
    id: 'riverdale-celtic-pub-sign',
    title: 'Riverdale Hand-Routed 3D HDU Celtic Sign with 23k Gold',
    client: 'The Kerryman Pub & Tavern',
    borough: 'The Bronx',
    neighborhood: 'Riverdale Ave, The Bronx',
    category: 'storefront',
    categoryLabel: 'Carved 3D HDU Signs',
    year: '2024',
    dimensions: '7\'-6" W x 42" H x 2.5" Relief',
    materials: '30lb Precision-Board High-Density Urethane, 23-Karat Italian Gold Leaf Trim, 1-Shot Lettering Enamel',
    lighting: 'Classic Gooseneck Matte Black Exterior Fixtures (2700K Warm)',
    dobPermit: 'NYC DOB Storefront Sign Permit & Structural Sign-Off',
    windLoad: 'Reinforced Steel Core Plate Tested to 110 MPH Wind Loads',
    resultMetric: 'Rot-Proof Lifetime Architectural Durability Guarantee',
    summary:
      'CNC-routed multi-level 3D Celtic knotwork with hand-applied 23-karat gold leaf gilding. Replaced a decaying wooden sign with waterproof HDU engineered to outlive harsh Bronx winters without warping or splitting.',
    image: '/Signsny/Outdoor Signs/Vestibules/Vestibules.jpg.webp',
    tags: ['#3DCarvedHDU', '#23kGoldLeaf', '#CelticCraft', '#RiverdaleBronx'],
  },
  {
    id: 'hudson-yards-directional-totems',
    title: 'Hudson Yards Architectural Directional Stainless Totems',
    client: 'Apex Urban Developers',
    borough: 'Manhattan',
    neighborhood: '10 Hudson Yards, Manhattan',
    category: 'corporate',
    categoryLabel: 'Corporate Lobby Signs',
    year: '2024',
    dimensions: '9\'-0" H x 32" W x 8" D',
    materials: 'Grade 316 Brushed Stainless Steel, Black Chemically Etched Copy, Hidden Access Hinges',
    lighting: 'Integrated Edge-Lit 4000K LED Light Guides',
    dobPermit: 'NYC DOB Commercial Building Certificate of Occupancy Sign-Off',
    windLoad: 'Tested to Plaza Wind Tunnel Velocity Calculations (120 MPH)',
    resultMetric: 'Zero Safety Audit Fines Across 18 Months of Construction',
    summary:
      'Monolithic brushed stainless steel wayfinding pylons built for the high-wind public plazas of Hudson Yards. Features chemically etched directory panels and hidden interior hinge mechanisms for rapid tenant updates.',
    image: '/Signsny/Indoor Signs/Metal Letters/Metal Letters.jpg.webp',
    tags: ['#HudsonYards', '#Brushed316', '#DirectionalPylon', '#HighWindPlaza'],
  },
  {
    id: 'nolita-cafe-wind-screens',
    title: 'Nolita Sidewalk Wind Screens & Cafe Partitions',
    client: 'Cafe Nolita Botanica',
    borough: 'Manhattan',
    neighborhood: 'Elizabeth St, Nolita',
    category: 'awnings',
    categoryLabel: 'Sidewalk Dining Barriers',
    year: '2025',
    dimensions: '32\'-0" Total Linear Run (4ft Sections)',
    materials: 'Matte Forest Green Powder-Coated Steel, Optically Clear Marine Vinyl Panels, Custom Screenprint',
    lighting: 'Integrated Brass Planter Fairy Lights',
    dobPermit: 'NYC DOT Sidewalk Cafe License & Clearance Pass',
    windLoad: 'Ballasted Steel Stanchions Engineered for 75 MPH Street Gusts',
    resultMetric: 'Expanded Seating Season by 4 Months in Nolita',
    summary:
      'Created custom glass-clear wind barriers that protect diners from chilly spring and autumn winds while showcasing bespoke branding on Elizabeth Street. Allowed the restaurant to extend outdoor seating well into winter.',
    image: '/Signsny/Outdoor Signs/Retractable Awnings/Retractable Awnings.jpg.webp',
    tags: ['#NolitaDining', '#WindScreens', '#ExtendedSeason', '#ClearMarineVinyl'],
  },
  {
    id: 'greenpoint-dusted-crystal-glass',
    title: 'Greenpoint Creative Studio Dusted Crystal Glass Vinyl',
    client: 'Greenpoint Design Collective',
    borough: 'Brooklyn',
    neighborhood: 'Franklin St, Greenpoint',
    category: 'storefront',
    categoryLabel: 'Dusted Crystal Glass Vinyl',
    year: '2025',
    dimensions: '6 Vitrine Panels (Total 38\'-0" W x 9\'-6" H)',
    materials: '3M Dusted Crystal Cast Film, Precision Computerized Plotter Cut',
    lighting: 'Diffused Backlit Studio Natural Sunlight',
    dobPermit: 'Non-Structural Glass Graphics Registration',
    windLoad: 'Permanent Interior Glass Adhesion (10-Year Rated)',
    resultMetric: 'Looks Like Hand-Etched Sandblasted Glass at 20% Cost',
    summary:
      'Precision plotter-cut frosted dusted crystal film applied to floor-to-ceiling glass vitrines. Replicated the organic aesthetic of expensive sandblasted architectural glass with crisp, flawless geometric typography.',
    image: '/Signsny/Indoor Signs/Window Frosting/Window Frosting.jpg.webp',
    tags: ['#DustedCrystal', '#GlassFrosting', '#GreenpointStudio', '#ArchitecturalEtch'],
  },
  {
    id: 'staten-island-marine-monument',
    title: 'Staten Island Harbor Marine-Grade Directional Monument',
    client: 'Great Kills Yacht & Marina Harbor',
    borough: 'Staten Island',
    neighborhood: 'Mansion Ave, Great Kills Harbor',
    category: 'landmarks',
    categoryLabel: 'Architectural Monuments',
    year: '2024',
    dimensions: '12\'-0" W x 6\'-0" H x 18" Base',
    materials: 'Welded Marine-Grade 5052 Aluminum, Epoxy Primer with 2-Part Polyurethane Coating, 3D Acrylic Letters',
    lighting: 'Photocell Dusk-to-Dawn High-Lumen Flood Lighting',
    dobPermit: 'NYC Coastal Zone & DOB Outdoor Sign Permit Approved',
    windLoad: 'Engineered for Hurricane Sandy Velocity Surges (130 MPH Wind & Salt Spray)',
    resultMetric: '100% Saltwater Corrosion Resistance Guarantee',
    summary:
      'Situated directly on the open coastal water of Great Kills Harbor. Fabricated entirely from marine-grade 5052 aluminum and sealed with industrial epoxy marine coatings to prevent white rust and oxidation from harbor salt spray.',
    image: '/Signsny/Outdoor Signs/Real Estate Signs/Real Estate Signs.jpg.webp',
    tags: ['#MarineGrade5052', '#CoastalSaltProof', '#StatenIslandMarina', '#130MPHWinds'],
  },
];

const BOROUGHS = ['ALL', 'Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'] as const;

const CATEGORIES = [
  { key: 'all', label: 'ALL DISCIPLINES' },
  { key: 'storefront', label: 'CHANNEL LETTERS & STOREFRONTS' },
  { key: 'awnings', label: 'COMMERCIAL AWNINGS & BARRIERS' },
  { key: 'neon', label: 'NEON & ILLUMINATED BLADES' },
  { key: 'fleet', label: 'VEHICLE & FLEET WRAPS' },
  { key: 'corporate', label: 'CORPORATE & LOBBIES' },
  { key: 'landmarks', label: 'MONUMENTS & LANDMARKS' },
] as const;

export default function PortfolioClient() {
  const [selectedBorough, setSelectedBorough] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'bento' | 'blueprint' | 'fullbleed'>('bento');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [blueprintOverlayActive, setBlueprintOverlayActive] = useState<boolean>(false);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((proj) => {
      // Borough filter
      if (selectedBorough !== 'ALL' && proj.borough !== selectedBorough) return false;
      // Category filter
      if (selectedCategory !== 'all' && proj.category !== selectedCategory) return false;
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = proj.title.toLowerCase().includes(q);
        const matchesClient = proj.client.toLowerCase().includes(q);
        const matchesBorough = proj.borough.toLowerCase().includes(q);
        const matchesNeighborhood = proj.neighborhood.toLowerCase().includes(q);
        const matchesMaterials = proj.materials.toLowerCase().includes(q);
        const matchesTags = proj.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesClient && !matchesBorough && !matchesNeighborhood && !matchesMaterials && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedBorough, selectedCategory, searchQuery]);

  // Keyboard navigation for inspector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeProject) {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

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
      <Navbar onOpenCampaignModal={() => setModalOpen(true)} />

      {/* ========================================================================= */}
      {/* 1. PORTFOLIO HERO: ARCHITECTURAL TELEMETRY & VIEW CONTROLS                */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'clamp(8.5rem, 12vw, 11rem)',
          paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
          backgroundColor: '#F5F3EC',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid pattern background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 80% 20%, rgba(30, 86, 255, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 15% 85%, rgba(17, 17, 17, 0.04) 0%, transparent 50%),
              linear-gradient(rgba(17, 17, 17, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(17, 17, 17, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
            pointerEvents: 'none',
          }}
        />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow */}
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
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            <Sparkles size={14} />
            <span>FABRICATION ARCHIVES // 850+ FIVE-BOROUGH LANDMARKS</span>
          </div>

          {/* Headline & Controls Flex */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: '-0.035em',
                  color: '#111111',
                  margin: '0 0 1rem',
                  textTransform: 'uppercase',
                }}
              >
                PROVEN IN THE <br />
                <span style={{ color: '#1E56FF' }}>NEW YORK STREETSCAPE.</span>
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.25vw, 1.22rem)',
                  color: '#555555',
                  maxWidth: '720px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Explore precision architectural signage engineered, permitted, and fabricated in our 10,000 sq ft NYC facility. 
                Filter by borough, search specific materials, or toggle into Technical Blueprint mode.
              </p>
            </div>

            {/* INNOVATIVE VIEW MODE SWITCHER */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '0.35rem',
                border: '1px solid rgba(17, 17, 17, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
              }}
            >
              <button
                onClick={() => setViewMode('bento')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: viewMode === 'bento' ? '#111111' : 'transparent',
                  color: viewMode === 'bento' ? '#FFFFFF' : '#555555',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <LayoutGrid size={15} />
                <span>BENTO GRID</span>
              </button>

              <button
                onClick={() => setViewMode('blueprint')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: viewMode === 'blueprint' ? '#003366' : 'transparent',
                  color: viewMode === 'blueprint' ? '#66D9EF' : '#555555',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <FileCode2 size={15} />
                <span>CAD BLUEPRINT</span>
              </button>

              <button
                onClick={() => setViewMode('fullbleed')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.6rem 1rem',
                  borderRadius: '12px',
                  backgroundColor: viewMode === 'fullbleed' ? '#1E56FF' : 'transparent',
                  color: viewMode === 'fullbleed' ? '#FFFFFF' : '#555555',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Grid3X3 size={15} />
                <span>FULL BLEED</span>
              </button>
            </div>
          </div>

          {/* TELEMETRY SEARCH & QUICK PILLS BAR */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.25rem 1.75rem',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Search Input + Borough Selectors */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {/* Search Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: '#F8F7F2',
                  padding: '0.65rem 1.15rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  flex: '1 1 320px',
                  maxWidth: '460px',
                }}
              >
                <Search size={16} color="#1E56FF" />
                <input
                  type="text"
                  placeholder="Search project, material (e.g. Brass, 3M, Neon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    color: '#111111',
                    width: '100%',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <X size={14} color="#888888" />
                  </button>
                )}
              </div>

              {/* Borough Selector Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    color: '#888888',
                    marginRight: '0.4rem',
                  }}
                >
                  BOROUGH:
                </span>
                {BOROUGHS.map((b) => {
                  const isActive = selectedBorough === b;
                  return (
                    <button
                      key={b}
                      onClick={() => setSelectedBorough(b)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '9999px',
                        border: isActive ? '1px solid #1E56FF' : '1px solid rgba(17, 17, 17, 0.08)',
                        backgroundColor: isActive ? '#1E56FF' : '#F8F7F2',
                        color: isActive ? '#FFFFFF' : '#444444',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {b === 'ALL' ? 'ALL 5 BOROUGHS' : b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Disciplines Strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                borderTop: '1px solid rgba(17, 17, 17, 0.06)',
                paddingTop: '1rem',
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      backgroundColor: isActive ? '#111111' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#666666',
                      border: isActive ? '1px solid #111111' : '1px solid transparent',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN GALLERY SECTION: DYNAMIC BENTO / BLUEPRINT VIEW MODES             */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3rem, 5vw, 5.5rem) 0',
          backgroundColor: viewMode === 'blueprint' ? '#081726' : '#F7F5EF',
          transition: 'background-color 0.4s ease',
        }}
      >
        <div className="container-custom">
          {/* Results Summary Telemetry Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              color: viewMode === 'blueprint' ? '#80D4FF' : '#666666',
            }}
          >
            <div>
              SHOWING <strong style={{ color: viewMode === 'blueprint' ? '#FFFFFF' : '#111111' }}>{filteredProjects.length}</strong> VERIFIED PROJECTS
              {selectedBorough !== 'ALL' && ` IN ${selectedBorough.toUpperCase()}`}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: '#10B981', fontWeight: 800 }}>● ALL PROJECTS 100% DOB PERMIT SIGNED-OFF</span>
            </div>
          </div>

          {/* Zero Results State */}
          {filteredProjects.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <Building2 size={48} color="#888888" style={{ margin: '0 auto 1.25rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 900, color: '#111111', margin: '0 0 0.5rem' }}>
                No projects matched your criteria
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#666666', marginBottom: '1.5rem' }}>
                Try adjusting your search query or reset the borough and category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedBorough('ALL');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '9999px',
                  backgroundColor: '#1E56FF',
                  color: '#FFFFFF',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}

          {/* ===================================================================== */}
          {/* VIEW MODE 1: ARCHITECTURAL BENTO GRID                                 */}
          {/* ===================================================================== */}
          {viewMode === 'bento' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '22px',
                    border: '1px solid rgba(17, 17, 17, 0.09)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                    gridColumn: project.featured && idx === 0 ? 'span 2' : 'span 1',
                  }}
                  className="bento-project-card"
                >
                  {/* Project Image Box with Hover Zoom & Badges */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: project.featured && idx === 0 ? '360px' : '260px',
                      overflow: 'hidden',
                      backgroundColor: '#EEEEEE',
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      className="bento-card-image"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                      }}
                    />

                    {/* Top Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        right: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.94)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '9999px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          color: '#1E56FF',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <MapPin size={12} color="#1E56FF" />
                        {project.borough}
                      </div>

                      <div
                        style={{
                          backgroundColor: 'rgba(17, 17, 17, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.35rem 0.65rem',
                          borderRadius: '8px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                        }}
                      >
                        {project.year}
                      </div>
                    </div>

                    {/* Bottom Result Pill on Image */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '14px',
                        left: '14px',
                        right: '14px',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: 'rgba(16, 185, 129, 0.92)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          padding: '0.3rem 0.75rem',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        <CheckCircle2 size={12} />
                        {project.resultMetric}
                      </span>

                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          color: '#111111',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Maximize2 size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          color: '#1E56FF',
                          textTransform: 'uppercase',
                          marginBottom: '0.4rem',
                        }}
                      >
                        {project.categoryLabel}
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.22rem',
                          fontWeight: 900,
                          color: '#111111',
                          lineHeight: 1.25,
                          margin: '0 0 0.5rem',
                        }}
                      >
                        {project.title}
                      </h3>

                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: '#666666',
                          marginBottom: '1rem',
                        }}
                      >
                        Client: <strong style={{ color: '#222222' }}>{project.client}</strong> • {project.neighborhood}
                      </div>

                      <p
                        style={{
                          fontSize: '0.86rem',
                          color: '#555555',
                          lineHeight: 1.55,
                          margin: '0 0 1.25rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {project.summary}
                      </p>
                    </div>

                    {/* Bottom Specs Strip & Action */}
                    <div
                      style={{
                        borderTop: '1px solid rgba(17, 17, 17, 0.06)',
                        paddingTop: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.64rem',
                              fontWeight: 700,
                              color: '#666666',
                              backgroundColor: '#F8F7F2',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          color: '#1E56FF',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        INSPECT SPECS <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===================================================================== */}
          {/* VIEW MODE 2: CAD BLUEPRINT / TECHNICAL WIREFRAME VIEW                */}
          {/* ===================================================================== */}
          {viewMode === 'blueprint' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  style={{
                    backgroundColor: '#051221',
                    borderRadius: '16px',
                    border: '1px solid rgba(0, 168, 255, 0.35)',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundImage: `
                      linear-gradient(rgba(0, 168, 255, 0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 168, 255, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.25s ease',
                  }}
                  className="blueprint-card"
                >
                  {/* Blueprint Stamp Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(0, 168, 255, 0.25)',
                      paddingBottom: '0.75rem',
                      marginBottom: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#66D9EF',
                    }}
                  >
                    <span>DWG NO. NYC-{project.id.toUpperCase().substring(0, 8)}</span>
                    <span style={{ color: '#A6E22E' }}>CLASS 1 APPROVED</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {project.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#9EFFFF',
                      marginBottom: '1.25rem',
                    }}
                  >
                    📍 {project.neighborhood} ({project.borough})
                  </div>

                  {/* CAD Wireframe Data Grid */}
                  <div
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '8px',
                      padding: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      marginBottom: '1.25rem',
                      border: '1px solid rgba(0, 168, 255, 0.15)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#75715E' }}>DIMENSIONS:</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 800 }}>{project.dimensions}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#75715E' }}>WIND LOAD:</span>
                      <span style={{ color: '#FD971F', fontWeight: 800 }}>{project.windLoad.split(',')[0]}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#75715E' }}>LIGHTING:</span>
                      <span style={{ color: '#E6DB74' }}>{project.lighting.split(',')[0]}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#75715E' }}>PERMIT CODE:</span>
                      <span style={{ color: '#A6E22E' }}>{project.dobPermit.split('&')[0]}</span>
                    </div>
                  </div>

                  {/* Inspect CTA */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: '#00A8FF',
                      fontWeight: 800,
                    }}
                  >
                    <span>VIEW CAD SPECIFICATIONS</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===================================================================== */}
          {/* VIEW MODE 3: FULL BLEED VISUAL SHOWCASE                              */}
          {/* ===================================================================== */}
          {viewMode === 'fullbleed' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                gap: '2rem',
              }}
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  style={{
                    position: 'relative',
                    height: '380px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
                  }}
                  className="fullbleed-card"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    className="fullbleed-image"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '24px',
                      left: '24px',
                      right: '24px',
                      color: '#FFFFFF',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 900,
                        color: '#66D9EF',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <MapPin size={12} />
                      {project.borough} • {project.categoryLabel}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        margin: '0 0 0.5rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {project.title}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        color: '#DDDDDD',
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                        paddingTop: '0.75rem',
                      }}
                    >
                      <span>{project.client}</span>
                      <span style={{ color: '#10B981', fontWeight: 900 }}>{project.resultMetric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CASE STUDY & ARCHITECTURAL SPEC INSPECTOR MODAL                        */}
      {/* ========================================================================= */}
      {activeProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 10, 10, 0.75)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto',
          }}
          onClick={() => setActiveProject(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              maxWidth: '960px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              animation: 'modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              aria-label="Close inspector"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Image Hero */}
            <div style={{ position: 'relative', width: '100%', height: '360px', backgroundColor: '#111111' }}>
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '28px',
                  right: '28px',
                  color: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: '#1E56FF',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    marginBottom: '0.65rem',
                  }}
                >
                  <MapPin size={12} />
                  {activeProject.borough.toUpperCase()} // {activeProject.neighborhood}
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                    fontWeight: 900,
                    margin: '0 0 0.35rem',
                    lineHeight: 1.15,
                  }}
                >
                  {activeProject.title}
                </h2>

                <div style={{ fontSize: '0.86rem', color: '#DDDDDD' }}>
                  Client: <strong>{activeProject.client}</strong> • Completed {activeProject.year}
                </div>
              </div>
            </div>

            {/* Modal Body: Architectural Telemetry & Specs */}
            <div style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              
              {/* Highlight Result Strip */}
              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                }}
              >
                <CheckCircle2 size={20} color="#10B981" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 900, color: '#065F46' }}>
                    MEASURED ARCHITECTURAL OUTCOME
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: '#111111' }}>
                    {activeProject.resultMetric}
                  </div>
                </div>
              </div>

              {/* Project Narrative */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 900, color: '#1E56FF', letterSpacing: '0.08em', margin: '0 0 0.6rem' }}>
                  PROJECT SUMMARY &amp; CHALLENGE
                </h4>
                <p style={{ fontSize: '0.96rem', color: '#444444', lineHeight: 1.68, margin: 0 }}>
                  {activeProject.summary}
                </p>
              </div>

              {/* Technical Specifications Blueprint Table */}
              <div
                style={{
                  backgroundColor: '#F8F7F2',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  marginBottom: '2rem',
                }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    color: '#111111',
                    letterSpacing: '0.08em',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                  }}
                >
                  ARCHITECTURAL FABRICATION SPECIFICATIONS (10,000 SQ FT PLANT)
                </h4>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#888888', display: 'block', marginBottom: '0.2rem' }}>DIMENSIONS:</span>
                    <strong style={{ color: '#111111' }}>{activeProject.dimensions}</strong>
                  </div>

                  <div>
                    <span style={{ color: '#888888', display: 'block', marginBottom: '0.2rem' }}>WIND LOAD RATING:</span>
                    <strong style={{ color: '#111111' }}>{activeProject.windLoad}</strong>
                  </div>

                  <div>
                    <span style={{ color: '#888888', display: 'block', marginBottom: '0.2rem' }}>DOB &amp; LPC PERMIT:</span>
                    <strong style={{ color: '#10B981' }}>{activeProject.dobPermit}</strong>
                  </div>

                  <div>
                    <span style={{ color: '#888888', display: 'block', marginBottom: '0.2rem' }}>ILLUMINATION OPTICS:</span>
                    <strong style={{ color: '#111111' }}>{activeProject.lighting}</strong>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: '#888888', display: 'block', marginBottom: '0.2rem' }}>SUBSTRATES &amp; METALS:</span>
                    <strong style={{ color: '#111111' }}>{activeProject.materials}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  borderTop: '1px solid rgba(17, 17, 17, 0.08)',
                  paddingTop: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {activeProject.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#555555',
                        backgroundColor: '#F8F7F2',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      setActiveProject(null);
                      setModalOpen(true);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      backgroundColor: '#1E56FF',
                      color: '#FFFFFF',
                      padding: '0.75rem 1.4rem',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(30, 86, 255, 0.28)',
                    }}
                  >
                    <span>REQUEST THIS SPECIFICATION</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION: READY TO BUILD YOUR NYC LANDMARK?                      */}
      {/* ========================================================================= */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5.5rem, 8vw, 8.5rem) 0',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
          borderTop: '1px solid rgba(17, 17, 17, 0.08)',
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
            <span>DIRECT FACTORY FABRICATION</span>
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
            HAVE A BESPOKE SIGN <br />
            <span style={{ color: '#1E56FF' }}>PROJECT IN MIND?</span>
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
            Send us your CAD drawings, architectural renderings, or storefront photos. 
            Our licensed engineers and estimators provide turnkey quotes including materials, wind loads, and DOB permits.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setModalOpen(true)}
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
              <span>GET A TURNKEY SPECIFICATION QUOTE</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:+17184538300"
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
              <Phone size={15} color="#1E56FF" />
              <span>(718) 453-8300</span>
            </a>
          </div>
        </div>
      </section>

      {/* Universal Footer */}
      <Footer />

      {/* Campaign Quote Modal */}
      <CampaignModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="campaign"
      />

      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .bento-project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
          border-color: rgba(30, 86, 255, 0.3);
        }

        .bento-project-card:hover .bento-card-image {
          transform: scale(1.05);
        }

        .blueprint-card:hover {
          transform: translateY(-4px);
          border-color: #00A8FF !important;
          box-shadow: 0 12px 32px rgba(0, 168, 255, 0.2);
        }

        .fullbleed-card:hover .fullbleed-image {
          transform: scale(1.06);
        }
      `}</style>
    </main>
  );
}
