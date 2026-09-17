export interface CategoryGroup {
  category: string;
  code: string;
  subcategories: string[];
}

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
