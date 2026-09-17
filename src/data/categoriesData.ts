export interface CategoryGroup {
  category: string;
  code: string;
  subcategories: string[];
}

export interface SignProductItem {
  name: string;
  url: string;
  description: string;
  highlight?: string;
}

export interface SignProductCategory {
  id: string;
  category: string;
  code: string;
  tagline: string;
  url: string;
  subcategories: SignProductItem[];
}

// Retained for backwards compatibility with MarqueeTicker
export const SIGN_CATEGORIES: CategoryGroup[] = [
  {
    category: "Indoor Signs",
    code: "01",
    subcategories: [
      "Office Signs",
      "Metal Letters",
      "Metal Plaques",
      "Plastic Letters",
      "Standoff Signs",
      "Door Signs",
      "Lobby Signs",
      "Magnetic Menu Boards",
      "Window Frosting",
      "Neon Signs",
      "ADA Signs",
      "Aisle Signs",
      "Directory Signs",
      "Foam Letters",
      "PVC Letters",
      "SEG Light Box Signs",
      "Regulatory Signs"
    ]
  },
  {
    category: "Outdoor Signs",
    code: "02",
    subcategories: [
      "Retractable Awnings",
      "Commercial Awnings",
      "Vestibules",
      "Blade Signs",
      "Aluminum Metal Signs",
      "Carved Signs",
      "Channel Letters",
      "Hand Painted Signs",
      "A Frame Signs",
      "Light Box Signs",
      "Lighted Signs",
      "Lollipop Signs",
      "Real Estate Signs",
      "Sidewalk Barriers",
      "Wall Pan Signs",
      "Solaray Sequin Signs"
    ]
  },
  {
    category: "Construction Signs",
    code: "03",
    subcategories: [
      "Work in Progress Signs",
      "Sidewalk Closed Signs",
      "Road Closed Signs",
      "Blueprints Printing",
      "Scaffolding Wraps"
    ]
  },
  {
    category: "Building Signs",
    code: "04",
    subcategories: [
      "Boiler Room Signs",
      "HPD Signs",
      "Video Surveillance Signs",
      "Fire Safety Signs",
      "Safety Signs"
    ]
  },
  {
    category: "Event Signs",
    code: "05",
    subcategories: [
      "Kiosk Signs",
      "Podium Signs",
      "Standee and Cutouts"
    ]
  },
  {
    category: "Large Format Printing",
    code: "06",
    subcategories: [
      "Backdrops",
      "Banner Stands",
      "Billboard Printing",
      "Canvas Printing",
      "Duratrans Printing",
      "Mesh Banners",
      "Paper Poster Printing",
      "Pole Banners and Flags",
      "Step and Repeat Banners",
      "Tabletop Signs",
      "Vinyl Banners"
    ]
  },
  {
    category: "Rigid Signs",
    code: "07",
    subcategories: [
      "Coroplast Signs",
      "Dibond Signs",
      "Foam Board Signs",
      "PVC Signs",
      "Yard Signs"
    ]
  },
  {
    category: "Vehicle Wraps",
    code: "08",
    subcategories: [
      "Bus Wrapping",
      "Car Wrapping",
      "Food Truck Wrapping",
      "Magnetic Signs",
      "Trailer Wrapping",
      "Truck Wrapping",
      "Van Wrapping",
      "Truck Lettering"
    ]
  },
  {
    category: "Vinyl Graphics",
    code: "09",
    subcategories: [
      "Bottle Labels",
      "Custom Decals",
      "Custom Wall Graphics",
      "Dance Floor Wraps",
      "Die-Cut Stickers",
      "Elevator Wraps",
      "Floor Graphics",
      "Glitter Decals",
      "Gold Leaf Lettering",
      "Holographic Decals",
      "Kiss-Cut Stickers",
      "Product Labels",
      "Roll Labels",
      "Sticker Sheets",
      "Transfer Stickers",
      "Wall Decals",
      "Window Decals",
      "Window Wraps",
      "Perforated Window Wraps"
    ]
  }
];

// Rich structured product catalog for Signs NYC Products Directory
export const SIGN_PRODUCTS_CATALOG: SignProductCategory[] = [
  {
    id: "indoor-signs",
    category: "Indoor Signs",
    code: "01",
    tagline: "Interior Architectural, Office & Regulatory Signage",
    url: "https://signsny.com/indoor/",
    subcategories: [
      {
        name: "Office Signs",
        url: "https://signsny.com/indoor/office-signs/",
        description: "Professional signs that make your office easy to navigate and give every room a clear identity—ideal for nameplates, departments, and meeting rooms.",
        highlight: "Acrylic & Metal"
      },
      {
        name: "Metal Letters",
        url: "https://signsny.com/indoor/metal-letters/",
        description: "Durable and sleek, metal letters add a polished look to your brand. Great for indoor lobbies or building exteriors where you want to stand out.",
        highlight: "Waterjet & CNC Cut"
      },
      {
        name: "Metal Plaques",
        url: "https://signsny.com/indoor/metal-plaques/",
        description: "Elegant and long-lasting, these plaques are perfect for commemorating achievements, marking offices, or giving your space a premium look.",
        highlight: "Cast Bronze & Aluminum"
      },
      {
        name: "Plastic Letters",
        url: "https://signsny.com/indoor/plastic-letters/",
        description: "Lightweight and versatile, plastic letters offer a clean, bold appearance—ideal for logos, business names, and eye-catching interior walls.",
        highlight: "Formed & Laser Acrylic"
      },
      {
        name: "Standoff Signs",
        url: "https://signsny.com/indoor/standoff-signs/",
        description: "Modern and stylish signs that literally stand off the wall, creating a floating effect. Perfect for businesses that want a contemporary feel.",
        highlight: "Brushed Hardware"
      },
      {
        name: "Door Signs",
        url: "https://signsny.com/indoor/door-signs/",
        description: "Simple yet effective signage to identify rooms, offices, and suites—keeping your space organized and professional.",
        highlight: "Modular & Custom"
      },
      {
        name: "Lobby Signs",
        url: "https://signsny.com/indoor/lobby-signs/",
        description: "Make a great first impression with lobby signs that reflect your brand’s personality and welcome visitors the right way.",
        highlight: "Illuminated & 3D Layered"
      },
      {
        name: "Magnetic Menu Boards",
        url: "https://signsny.com/indoor/magnetic-menu-boards/",
        description: "An easy-to-update solution for cafes, restaurants, and food trucks. Switch out items anytime without needing to redesign your whole board.",
        highlight: "Quick Swap Panels"
      },
      {
        name: "Window Frosting",
        url: "https://signsny.com/indoor/window-frosting/",
        description: "Add privacy and a touch of elegance to your windows while still allowing light in. Great for offices, clinics, and storefronts.",
        highlight: "Etched & Frosted Vinyl"
      },
      {
        name: "Neon Signs",
        url: "https://signsny.com/indoor/neon-signs/",
        description: "Bring energy and retro flair to your business with glowing neon signs that turn heads—day or night.",
        highlight: "Glass & LED Neon Flex"
      },
      {
        name: "ADA Signs",
        url: "https://signsny.com/indoor/ada-signs/",
        description: "ADA-compliant signage designed for accessibility and inclusivity, ensuring your business meets federal standards.",
        highlight: "Grade 2 Braille & Tactile"
      },
      {
        name: "Aisle Signs",
        url: "https://signsny.com/indoor/aisle-signs-markers/",
        description: "Directional signage with clear symbols and labels, helping customers and visitors navigate aisles with ease.",
        highlight: "Suspended & Wall Mount"
      },
      {
        name: "Directory Signs",
        url: "https://signsny.com/indoor/directory-signage/",
        description: "Organized signage to display departments, suites, or room listings—commonly used in hospitals, offices, and malls.",
        highlight: "Interchangeable Slats"
      },
      {
        name: "Foam Letters",
        url: "https://signsny.com/indoor/foam-letters/",
        description: "Lightweight 3D letters that create bold, dimensional branding for walls, events, or promotions.",
        highlight: "High-Density Foam"
      },
      {
        name: "PVC Letters",
        url: "https://signsny.com/indoor/pvc-letters/",
        description: "Durable, lightweight PVC lettering ideal for indoor branding, displays, and wall-mounted designs.",
        highlight: "Painted & Matte Finish"
      },
      {
        name: "SEG Light Box Signs",
        url: "https://signsny.com/indoor/seg-lightbox-signs/",
        description: "Slim illuminated displays with stretch fabric graphics—great for retail and trade shows.",
        highlight: "Silicone Edge Fabric"
      },
      {
        name: "Regulatory Signs",
        url: "https://signsny.com/indoor/regulatory-signs/",
        description: "Compliance-driven signs that display warnings, restrictions, and rules.",
        highlight: "OSHA & NYC Code"
      }
    ]
  },
  {
    id: "outdoor-signs",
    category: "Outdoor Signs",
    code: "02",
    tagline: "Exterior Storefronts, Illuminated Letters & Facade Systems",
    url: "https://signsny.com/outdoor/",
    subcategories: [
      {
        name: "Retractable Awnings",
        url: "https://signsny.com/outdoor/retractable-awnings/",
        description: "Shade when you need it, sun when you don’t—ideal for storefronts, patios, and restaurants.",
        highlight: "Motorized & Manual"
      },
      {
        name: "Commercial Awnings",
        url: "https://signsny.com/outdoor/commercial-awnings/",
        description: "Durable, stylish awnings that add coverage and branding to your business façade.",
        highlight: "Sunbrella & Welded Frame"
      },
      {
        name: "Vestibules",
        url: "https://signsny.com/outdoor/winter-vestibules/",
        description: "Seasonal or permanent structures that provide weather protection and create a welcoming entrance.",
        highlight: "Enclosed Winter Entrances"
      },
      {
        name: "Blade Signs",
        url: "https://signsny.com/outdoor/blade-signs/",
        description: "Perpendicular signs that extend outward, grabbing attention from pedestrians and street traffic.",
        highlight: "Double-Sided Projecting"
      },
      {
        name: "Aluminum Metal Signs",
        url: "https://signsny.com/outdoor/flat-metal-signs/",
        description: "Strong, sleek aluminum signage that offers a modern, professional look for outdoor branding.",
        highlight: "Heavy Gauge .080 Aluminum"
      },
      {
        name: "Carved Signs",
        url: "https://signsny.com/outdoor/carved-signs/",
        description: "Classic engraved signs with depth and character—perfect for traditional, timeless appeal.",
        highlight: "HDU & Routed Wood"
      },
      {
        name: "Channel Letters",
        url: "https://signsny.com/outdoor/channel-letters/",
        description: "Illuminated 3D letters that shine brightly, day or night, for maximum visibility.",
        highlight: "Front-Lit & Halo LED"
      },
      {
        name: "Hand Painted Signs",
        url: "https://signsny.com/outdoor/hand-painted-signs/",
        description: "Custom artistic signage with a personal, handcrafted touch for a vintage or boutique look.",
        highlight: "Artisan Brushwork"
      },
      {
        name: "A Frame Signs",
        url: "https://signsny.com/outdoor/a-frame-sidewalk-signs/",
        description: "Portable, foldable signs ideal for sidewalks, promotions, menus, or event advertising.",
        highlight: "Sidewalk Sandwich Boards"
      },
      {
        name: "Light Box Signs",
        url: "https://signsny.com/outdoor/light-box-signs/",
        description: "Backlit signs with vibrant graphics that stay visible even after dark.",
        highlight: "Extruded Aluminum Cabinets"
      },
      {
        name: "Lighted Signs",
        url: "https://signsny.com/outdoor/lighted-signs/",
        description: "General illuminated signage designed to ensure your business is seen at all hours.",
        highlight: "Energy-Efficient LED"
      },
      {
        name: "Lollipop Signs",
        url: "https://signsny.com/outdoor/lollipop-signs/",
        description: "Round, pole-mounted signs that provide visibility at eye level—great for pubs, cafés, and shops.",
        highlight: "Circular Projecting"
      },
      {
        name: "Real Estate Signs",
        url: "https://signsny.com/outdoor/real-estate-signs/",
        description: "Durable, customizable signs for property listings, open houses, and real estate branding.",
        highlight: "Colonial Posts & H-Frames"
      },
      {
        name: "Sidewalk Barriers",
        url: "https://signsny.com/outdoor/sidewalk-barriers/",
        description: "Functional and branded barriers for outdoor cafés, restaurants, and crowd control.",
        highlight: "Heavy-Duty Steel & Canvas"
      },
      {
        name: "Wall Pan Signs",
        url: "https://signsny.com/outdoor/wall-pan-signs/",
        description: "Flat-panel wall-mounted signs that provide a sleek, professional look for building exteriors.",
        highlight: "Pan-Formed Face"
      },
      {
        name: "Solaray Sequin Signs",
        url: "https://signsny.com/outdoor/solaray-sequin-signs/",
        description: "Decorative sequin panel signs that shimmer and catch attention with movement and light.",
        highlight: "Dynamic Kinetic Shimmer"
      }
    ]
  },
  {
    id: "construction-signs",
    category: "Construction Signs",
    code: "03",
    tagline: "DOB-Mandatory Jobsite, Safety & Perimeter Mesh Graphics",
    url: "https://signsny.com/construction-signs/",
    subcategories: [
      {
        name: "Work in Progress Signs",
        url: "https://signsny.com/construction-signs/work-in-progress/",
        description: "Commercial signs for ongoing projects.",
        highlight: "NYC DOB Rule 27-03"
      },
      {
        name: "Sidewalk Closed Signs",
        url: "https://signsny.com/construction-signs/sidewalk-closed/",
        description: "Sidewalk closed ahead. Cross here.",
        highlight: "DOT High-Visibility"
      },
      {
        name: "Road Closed Signs",
        url: "https://signsny.com/construction-signs/road-closed/",
        description: "Lane closed ahead.",
        highlight: "Reflective Aluminum"
      },
      {
        name: "Blueprints Printing",
        url: "https://signsny.com/construction-signs/blueprints-printing/",
        description: "Site safety mandatory: Safety glasses, safety boots, hard hats, high visibility vests, ear protection, hand protection.",
        highlight: "Architectural CAD Plots"
      },
      {
        name: "Scaffolding Wraps",
        url: "https://signsny.com/construction-signs/barricades-scaffolding-graphics/",
        description: "Custom wraps for scaffolding for branding and safety purposes.",
        highlight: "Wind-Blow Perforated Mesh"
      }
    ]
  },
  {
    id: "building-signs",
    category: "Building Signs",
    code: "04",
    tagline: "NYC HPD, Fire Safety & Commercial Property Compliance",
    url: "https://signsny.com/building/",
    subcategories: [
      {
        name: "Boiler Room Signs",
        url: "https://signsny.com/building/boiler-room/",
        description: "Mandatory boiler room labels for safety, compliance, and restricted access.",
        highlight: "DOB Boiler Code"
      },
      {
        name: "HPD Signs",
        url: "https://signsny.com/building/hpd-signs/",
        description: "NYC Housing Preservation & Development–compliant signs for safety and legal requirements in residential and commercial buildings.",
        highlight: "NYC HPD Certified"
      },
      {
        name: "Video Surveillance Signs",
        url: "https://signsny.com/building/video-surveillance/",
        description: "Warning signs indicating areas are under 24-hour CCTV monitoring.",
        highlight: "Deterrent & Legal Notice"
      },
      {
        name: "Fire Safety Signs",
        url: "https://signsny.com/building/fire-safety/",
        description: "Emergency and safety instructions for fire protection systems.",
        highlight: "FDNY Standard"
      },
      {
        name: "Safety Signs",
        url: "https://signsny.com/building/safety/",
        description: "General safety signage for hazards, protective equipment, and workplace compliance.",
        highlight: "OSHA & ANSI Compliant"
      }
    ]
  },
  {
    id: "event-signs",
    category: "Event Signs",
    code: "05",
    tagline: "Conference, Trade Show, Gala & Experiential Branding",
    url: "https://signsny.com/event-signs/",
    subcategories: [
      {
        name: "Kiosk Signs",
        url: "https://signsny.com/event-signs/kiosk-signs/",
        description: "Branded signs for self-service kiosks, enhancing usability and visibility.",
        highlight: "Wayfinding & Self-Service"
      },
      {
        name: "Podium Signs",
        url: "https://signsny.com/event-signs/podium-signs/",
        description: "Professional signage for podiums at conferences, ceremonies, or events.",
        highlight: "Magnetic & Detachable"
      },
      {
        name: "Standee and Cutouts",
        url: "https://signsny.com/event-signs/standee-and-cutouts/",
        description: "Life-size promotional cutouts and standees for events, retail, and exhibitions.",
        highlight: "Lifesize Foamcore & Coroplast"
      }
    ]
  },
  {
    id: "large-format-printing",
    category: "Large Format Printing",
    code: "06",
    tagline: "High-Impact Banners, Stage Backdrops & Duratrans",
    url: "https://signsny.com/large-format-printing/",
    subcategories: [
      {
        name: "Backdrops",
        url: "https://signsny.com/large-format-printing/backdrops/",
        description: "Custom printed backdrops for events, stages, and photography.",
        highlight: "Glare-Free Fabric"
      },
      {
        name: "Banner Stands",
        url: "https://signsny.com/large-format-printing/banner-stands/",
        description: "Portable banner displays for trade shows and promotions.",
        highlight: "Retractable Pull-Up"
      },
      {
        name: "Billboard Printing",
        url: "https://signsny.com/large-format-printing/billboard-printing/",
        description: "Large-format billboard graphics for outdoor advertising.",
        highlight: "Heavy-Duty Vinyl Skin"
      },
      {
        name: "Canvas Printing",
        url: "https://signsny.com/large-format-printing/canvas-printing/",
        description: "High-quality canvas prints for décor, branding, or promotions.",
        highlight: "Gallery Wrap Cotton"
      },
      {
        name: "Duratrans Printing",
        url: "https://signsny.com/large-format-printing/duratrans-printing/",
        description: "Backlit film graphics for vivid, illuminated displays.",
        highlight: "High-Density Translucent Film"
      },
      {
        name: "Mesh Banners",
        url: "https://signsny.com/large-format-printing/mesh-banners/",
        description: "Perforated outdoor banners designed to withstand wind.",
        highlight: "70/30 Airflow Perforation"
      },
      {
        name: "Paper Poster Printing",
        url: "https://signsny.com/large-format-printing/paper-poster-printing/",
        description: "Affordable printed posters for campaigns and promotions.",
        highlight: "Gloss & Satin Photo Finish"
      },
      {
        name: "Pole Banners and Flags",
        url: "https://signsny.com/large-format-printing/pole-banners-and-flags/",
        description: "Vertical banners for poles, streets, and event branding.",
        highlight: "Double-Sided Avenue Banners"
      },
      {
        name: "Step and Repeat Banners",
        url: "https://signsny.com/large-format-printing/step-and-repeat-banners/",
        description: "Photography backdrops with repeating logos/branding.",
        highlight: "Red Carpet Standard"
      },
      {
        name: "Tabletop Signs",
        url: "https://signsny.com/large-format-printing/tabletop-signs/",
        description: "Compact, desk or counter-top signs for promotions and events.",
        highlight: "Point of Sale Displays"
      },
      {
        name: "Vinyl Banners",
        url: "https://signsny.com/large-format-printing/vinyl-banners/",
        description: "Durable vinyl banners suitable for indoor and outdoor advertising.",
        highlight: "13oz - 18oz Reinforced"
      }
    ]
  },
  {
    id: "rigid-signs",
    category: "Rigid Signs",
    code: "07",
    tagline: "Dibond, Coroplast, Foam Board & PVC Rigid Substrates",
    url: "https://signsny.com/rigid-signs/",
    subcategories: [
      {
        name: "Coroplast Signs",
        url: "https://signsny.com/rigid-signs/coroplast-signs/",
        description: "Lightweight corrugated plastic signs for temporary use.",
        highlight: "Waterproof 4mm Coroplast"
      },
      {
        name: "Dibond Signs",
        url: "https://signsny.com/rigid-signs/dibond-signs/",
        description: "Aluminum composite signs, rigid and long-lasting.",
        highlight: "Aluminum Composite (ACM)"
      },
      {
        name: "Foam Board Signs",
        url: "https://signsny.com/rigid-signs/foam-board-signs/",
        description: "Lightweight foam-core signs ideal for presentations and displays.",
        highlight: "Rigid Foam Core"
      },
      {
        name: "PVC Signs",
        url: "https://signsny.com/rigid-signs/pvc-signs/",
        description: "Rigid PVC signs for indoor and outdoor use.",
        highlight: "Sintra Expanded PVC"
      },
      {
        name: "Yard Signs",
        url: "https://signsny.com/rigid-signs/yard-signs/",
        description: "Durable yard and lawn signs for real estate, campaigns, and events.",
        highlight: "Lawn Stakes & Metal Stands"
      }
    ]
  },
  {
    id: "vehicle-wraps",
    category: "Vehicle Wraps",
    code: "08",
    tagline: "Commercial Fleets, Vans, Trucks & Food Truck Wraps",
    url: "https://signsny.com/vehicle-wraps/",
    subcategories: [
      {
        name: "Bus Wrapping",
        url: "https://signsny.com/vehicle-wraps/bus-wrapping/",
        description: "Full or partial wraps for buses with impactful branding.",
        highlight: "Full Transit Wraps"
      },
      {
        name: "Car Wrapping",
        url: "https://signsny.com/vehicle-wraps/car-wrapping/",
        description: "Complete or partial vehicle wraps for personal or commercial use.",
        highlight: "Cast 3M 2080 Wrap Vinyl"
      },
      {
        name: "Food Truck Wrapping",
        url: "https://signsny.com/vehicle-wraps/food-truck-wrapping/",
        description: "Custom wraps that turn food trucks into mobile billboards.",
        highlight: "Heat-Resistant High-Gloss"
      },
      {
        name: "Magnetic Signs",
        url: "https://signsny.com/vehicle-wraps/magnetic-signs/",
        description: "Removable magnetic car door signs for business use.",
        highlight: "30 Mil Vehicle Magnetics"
      },
      {
        name: "Trailer Wrapping",
        url: "https://signsny.com/vehicle-wraps/trailer-wrapping/",
        description: "Branding wraps for trailers of any size.",
        highlight: "Seamless Side Panels"
      },
      {
        name: "Truck Wrapping",
        url: "https://signsny.com/vehicle-wraps/truck-wrapping/",
        description: "Bold wraps for box trucks and delivery vehicles.",
        highlight: "Box Truck Full Wraps"
      },
      {
        name: "Van Wrapping",
        url: "https://signsny.com/vehicle-wraps/van-wrapping/",
        description: "Professional vinyl wraps for vans and fleet vehicles.",
        highlight: "Sprinter & Transit Fleets"
      },
      {
        name: "Truck Lettering",
        url: "https://signsny.com/vehicle-wraps/truck-lettering/",
        description: "Vinyl-cut lettering and logos applied directly to vehicles.",
        highlight: "DOT Compliance & Logo Cut"
      }
    ]
  },
  {
    id: "vinyl-graphics",
    category: "Vinyl Graphics",
    code: "09",
    tagline: "Custom Decals, Window Frosting, Floor & Wall Murals",
    url: "https://signsny.com/vinyl-graphics/",
    subcategories: [
      {
        name: "Bottle Labels",
        url: "https://signsny.com/vinyl-graphics/bottle-labels/",
        description: "Custom printed adhesive labels for bottles and packaging.",
        highlight: "Waterproof BOPP & Vinyl"
      },
      {
        name: "Custom Decals",
        url: "https://signsny.com/vinyl-graphics/custom-decals/",
        description: "Versatile decals for walls, windows, and products.",
        highlight: "UV Laminated"
      },
      {
        name: "Custom Wall Graphics",
        url: "https://signsny.com/vinyl-graphics/custom-wall-graphics/",
        description: "Large-format vinyl graphics for wall décor and branding.",
        highlight: "Seamless Wall Murals"
      },
      {
        name: "Dance Floor Wraps",
        url: "https://signsny.com/vinyl-graphics/dance-floor-wraps/",
        description: "Customized wraps for events, weddings, and parties.",
        highlight: "Non-Slip Removable"
      },
      {
        name: "Die-Cut Stickers",
        url: "https://signsny.com/vinyl-graphics/die-cut-stickers/",
        description: "Stickers cut precisely to custom shapes.",
        highlight: "Precision Contour Cut"
      },
      {
        name: "Elevator Wraps",
        url: "https://signsny.com/vinyl-graphics/elevator-wraps/",
        description: "Full wraps for elevator doors and interiors.",
        highlight: "Fire-Rated Architectural Vinyl"
      },
      {
        name: "Floor Graphics",
        url: "https://signsny.com/vinyl-graphics/floor-graphics/",
        description: "Durable decals designed for floor advertising.",
        highlight: "UL Slip-Resistant Certified"
      },
      {
        name: "Glitter Decals",
        url: "https://signsny.com/vinyl-graphics/glitter-decals/",
        description: "Sparkly vinyl decals that stand out.",
        highlight: "Specialty Sparkle Film"
      },
      {
        name: "Gold Leaf Lettering",
        url: "https://signsny.com/vinyl-graphics/gold-leaf-lettering/",
        description: "Premium vinyl lettering with a gold leaf finish.",
        highlight: "22K Gold Leaf Appearance"
      },
      {
        name: "Holographic Decals",
        url: "https://signsny.com/vinyl-graphics/holographic-decals/",
        description: "Eye-catching holographic effect decals.",
        highlight: "Iridescent Prism Film"
      },
      {
        name: "Kiss-Cut Stickers",
        url: "https://signsny.com/vinyl-graphics/kiss-cut-stickers/",
        description: "Easy-peel stickers on backing sheets.",
        highlight: "Easy Peel Backing"
      },
      {
        name: "Product Labels",
        url: "https://signsny.com/vinyl-graphics/product-labels/",
        description: "Custom product packaging labels.",
        highlight: "Matte & Gloss Roll Finishes"
      },
      {
        name: "Roll Labels",
        url: "https://signsny.com/vinyl-graphics/roll-labels/",
        description: "Bulk-printed labels on rolls for easy application.",
        highlight: "High-Speed Machine Feed"
      },
      {
        name: "Sticker Sheets",
        url: "https://signsny.com/vinyl-graphics/sticker-sheets/",
        description: "Multiple custom designs on a single sheet.",
        highlight: "Custom Layout Sheets"
      },
      {
        name: "Transfer Stickers",
        url: "https://signsny.com/vinyl-graphics/transfer-stickers/",
        description: "Vinyl graphics with transfer tape for easy installation.",
        highlight: "Pre-Masked Application Tape"
      },
      {
        name: "Wall Decals",
        url: "https://signsny.com/vinyl-graphics/wall-decals/",
        description: "Decorative and promotional vinyl decals for walls.",
        highlight: "Removable & Repositionable"
      },
      {
        name: "Window Decals",
        url: "https://signsny.com/vinyl-graphics/window-decals/",
        description: "Adhesive graphics for glass surfaces.",
        highlight: "Clear & Solid Vinyl"
      },
      {
        name: "Window Wraps",
        url: "https://signsny.com/vinyl-graphics/window-wraps/",
        description: "Full or partial vinyl wraps for storefront or vehicle windows.",
        highlight: "Storefront Glass Graphics"
      },
      {
        name: "Perforated Window Wraps",
        url: "https://signsny.com/vinyl-graphics/perforated-window-wraps/",
        description: "One-way vision window graphics made with micro-perforated vinyl, allowing people inside to see out while displaying vibrant full-color graphics on the outside.",
        highlight: "One-Way Vision 60/40"
      }
    ]
  }
];
