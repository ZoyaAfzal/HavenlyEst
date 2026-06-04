export interface Property {
  slug: string;
  name: string;
  status: "For Sale" | "For Rent";
  price: number;
  address: string;
  city: string;
  beds: number;
  baths: number;
  area: number;
  type: "House" | "Apartment" | "Villa" | "Commercial";
  images: string[];
  description: string;
  features: string[];
  agentId: string;
  yearBuilt: number;
  lotSize: string;
  garage: number;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  reviews: number;
  propertiesSold: number;
  yearsExperience: number;
  bio: string;
  specializations: string[];
  image: string;
  email: string;
  linkedin: string;
  propertyIds: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: { name: string; role: string; avatar: string };
  excerpt: string;
  content: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  propertyName: string;
  propertyAddress: string;
  avatar: string;
}

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1800",
  modern1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
  modern2: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
  luxury: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
  apartment: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
  exterior: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  living: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
  couple: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900",
  family: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900",
  agentW: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
  agentM: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800",
  agent3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
  blog1: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000",
  blog2: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1000",
  cta: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800",
  green: "https://images.unsplash.com/photo-1592595896616-c37162298647?w=1200",
};

export const agents: Agent[] = [
  {
    id: "amelia-chen",
    name: "Amelia Chen",
    role: "Senior Buying Specialist",
    location: "",
    rating: 4.9,
    reviews: 184,
    propertiesSold: 312,
    yearsExperience: 11,
    bio: "Amelia helps first-time buyers and growing families find homes that fit how they actually live. Her calm, research-driven approach has earned her a loyal client roster across the Bay Area.",
    specializations: ["Buying", "First-Time Buyers", "Family Homes"],
    image: IMAGES.agentW,
    email: "amelia@havenlyest.com",
    linkedin: "#",
    propertyIds: ["the-grand-haven", "maple-residency", "garden-grove"],
  },
  {
    id: "marcus-bennett",
    name: "Marcus Bennett",
    role: "Luxury Sales Director",
    location: "",
    rating: 5.0,
    reviews: 96,
    propertiesSold: 148,
    yearsExperience: 14,
    bio: "Marcus represents some of California's most exceptional residences. His clients value his discretion, market intuition, and ability to close complex luxury transactions.",
    specializations: ["Selling", "Luxury", "Architectural"],
    image: IMAGES.agentM,
    email: "marcus@havenlyest.com",
    linkedin: "#",
    propertyIds: ["skyline-penthouse", "sunset-villa"],
  },
  {
    id: "priya-anand",
    name: "Priya Anand",
    role: "Investment Advisor",
    location: "",
    rating: 4.8,
    reviews: 142,
    propertiesSold: 220,
    yearsExperience: 9,
    bio: "Priya pairs analytical underwriting with on-the-ground knowledge of Pacific Northwest rental markets, helping investors build sustainable portfolios.",
    specializations: ["Commercial", "Investment", "Portfolio Strategy"],
    image: IMAGES.agent3,
    email: "priya@havenlyest.com",
    linkedin: "#",
    propertyIds: ["urban-nest"],
  },
  {
    id: "diego-romero",
    name: "Diego Romero",
    role: "Urban Specialist",
    location: "",
    rating: 4.9,
    reviews: 168,
    propertiesSold: 256,
    yearsExperience: 8,
    bio: "Diego is the go-to advisor for buyers chasing walkable, design-led city living. He knows every neighborhood pocket inside the loop.",
    specializations: ["Buying", "Selling", "Condos"],
    image: IMAGES.agentM,
    email: "diego@havenlyest.com",
    linkedin: "#",
    propertyIds: [],
  },
  {
    id: "hana-okafor",
    name: "Hana Okafor",
    role: "Relocation Consultant",
    location: "",
    rating: 4.9,
    reviews: 121,
    propertiesSold: 174,
    yearsExperience: 10,
    bio: "Hana specializes in cross-country relocations, blending logistics expertise with deep neighborhood storytelling.",
    specializations: ["Buying", "Relocation"],
    image: IMAGES.agentW,
    email: "hana@havenlyest.com",
    linkedin: "#",
    propertyIds: [],
  },
  {
    id: "ethan-walker",
    name: "Ethan Walker",
    role: "Commercial Broker",
    location: "",
    rating: 4.7,
    reviews: 88,
    propertiesSold: 102,
    yearsExperience: 12,
    bio: "Ethan negotiates retail, office, and mixed-use deals for owner-operators and growing brands across the Mountain West.",
    specializations: ["Commercial"],
    image: IMAGES.agent3,
    email: "ethan@havenlyest.com",
    linkedin: "#",
    propertyIds: [],
  },
];

export const properties: Property[] = [
  {
    slug: "the-grand-haven",
    name: "The Grand Haven",
    status: "For Sale",
    price: 619000,
    address: "",
    city: "Palo Alto, CA",
    beds: 3,
    baths: 3,
    area: 740,
    type: "House",
    images: [IMAGES.modern1, IMAGES.living, IMAGES.kitchen, IMAGES.exterior],
    description:
      "A serene contemporary home that balances clean architectural lines with warm, livable interiors. Floor-to-ceiling glass opens the living space to a private garden, while the upstairs bedrooms enjoy treetop views and quiet light all afternoon.",
    features: ["Private Garden", "Smart Home", "Solar Panels", "Hardwood Floors", "EV Charging", "Wine Cellar"],
    agentId: "amelia-chen",
    yearBuilt: 2021,
    lotSize: "0.18 acres",
    garage: 2,
  },
  {
    slug: "sunset-villa",
    name: "Sunset Villa",
    status: "For Sale",
    price: 1240000,
    address: "",
    city: "Malibu, CA",
    beds: 4,
    baths: 4,
    area: 1180,
    type: "Villa",
    images: [IMAGES.luxury, IMAGES.modern2, IMAGES.exterior, IMAGES.living],
    description:
      "An architect-designed villa perched above the coastline. Wide cantilevered terraces, a heated infinity pool, and a chef's kitchen built for entertaining define this rare offering.",
    features: ["Infinity Pool", "Ocean View", "Chef's Kitchen", "Home Cinema", "Gym", "Outdoor Kitchen"],
    agentId: "marcus-bennett",
    yearBuilt: 2019,
    lotSize: "0.42 acres",
    garage: 3,
  },
  {
    slug: "urban-nest",
    name: "Urban Nest",
    status: "For Rent",
    price: 3850,
    address: "",
    city: "Seattle, WA",
    beds: 2,
    baths: 2,
    area: 96,
    type: "Apartment",
    images: [IMAGES.apartment, IMAGES.living, IMAGES.kitchen],
    description:
      "A bright corner loft in a brick-and-timber warehouse conversion. South-facing windows, polished concrete floors, and a private balcony overlooking the canal.",
    features: ["Concierge", "Roof Deck", "In-Unit Laundry", "Pet Friendly", "Bike Storage"],
    agentId: "priya-anand",
    yearBuilt: 2017,
    lotSize: "—",
    garage: 1,
  },
  {
    slug: "maple-residency",
    name: "Maple Residency",
    status: "For Sale",
    price: 489000,
    address: "",
    city: "Berkeley, CA",
    beds: 3,
    baths: 2,
    area: 620,
    type: "House",
    images: [IMAGES.exterior, IMAGES.kitchen, IMAGES.living],
    description:
      "A craftsman-style family home on a quiet, tree-lined street. Thoughtful updates throughout, a sunny breakfast nook, and a backyard ready for summer dinners.",
    features: ["Fireplace", "Backyard", "Updated Kitchen", "Office Nook"],
    agentId: "amelia-chen",
    yearBuilt: 2008,
    lotSize: "0.14 acres",
    garage: 1,
  },
  {
    slug: "skyline-penthouse",
    name: "Skyline Penthouse",
    status: "For Sale",
    price: 2150000,
    address: "",
    city: "Los Angeles, CA",
    beds: 4,
    baths: 5,
    area: 1420,
    type: "Apartment",
    images: [IMAGES.luxury, IMAGES.modern2, IMAGES.living],
    description:
      "A full-floor penthouse with 360° city views. Custom millwork, a private elevator entry, and a wrap-around terrace with hot tub.",
    features: ["Private Elevator", "Wrap Terrace", "Hot Tub", "Concierge", "Wine Room", "Smart Home"],
    agentId: "marcus-bennett",
    yearBuilt: 2022,
    lotSize: "—",
    garage: 2,
  },
  {
    slug: "garden-grove",
    name: "Garden Grove",
    status: "For Rent",
    price: 4200,
    address: "",
    city: "Mill Valley, CA",
    beds: 3,
    baths: 2,
    area: 480,
    type: "House",
    images: [IMAGES.green, IMAGES.modern1, IMAGES.kitchen],
    description:
      "A storybook cottage tucked into mature gardens. Vaulted ceilings, a wood-burning stove, and a writer's studio at the back of the lot.",
    features: ["Garden", "Studio", "Wood Stove", "Quiet Street"],
    agentId: "amelia-chen",
    yearBuilt: 1996,
    lotSize: "0.22 acres",
    garage: 1,
  },
  {
    slug: "harbor-house",
    name: "Harbor House",
    status: "For Sale",
    price: 875000,
    address: "",
    city: "Sausalito, CA",
    beds: 3,
    baths: 3,
    area: 820,
    type: "House",
    images: [IMAGES.modern2, IMAGES.exterior, IMAGES.living],
    description:
      "A modern bayfront home with private dock access, sun-drenched living spaces, and an open kitchen built around marble and walnut.",
    features: ["Dock Access", "Bay View", "Marble Kitchen", "Roof Garden"],
    agentId: "marcus-bennett",
    yearBuilt: 2020,
    lotSize: "0.10 acres",
    garage: 2,
  },
  {
    slug: "olive-tree-estate",
    name: "Olive Tree Estate",
    status: "For Sale",
    price: 1680000,
    address: "",
    city: "Napa, CA",
    beds: 5,
    baths: 4,
    area: 1560,
    type: "Villa",
    images: [IMAGES.exterior, IMAGES.luxury, IMAGES.kitchen],
    description:
      "A mediterranean villa with century-old olive groves, a saltwater pool, and outdoor dining pavilion. Five suites, each with private terrace.",
    features: ["Olive Grove", "Saltwater Pool", "Guest House", "Outdoor Kitchen"],
    agentId: "priya-anand",
    yearBuilt: 2014,
    lotSize: "1.20 acres",
    garage: 3,
  },
  {
    slug: "downtown-loft",
    name: "Downtown Loft",
    status: "For Rent",
    price: 2950,
    address: "",
    city: "Austin, TX",
    beds: 1,
    baths: 1,
    area: 78,
    type: "Apartment",
    images: [IMAGES.apartment, IMAGES.living],
    description:
      "An efficient downtown loft with floor-to-ceiling windows, a sleek galley kitchen, and access to a rooftop pool deck.",
    features: ["Rooftop Pool", "Gym", "Concierge", "Pet Friendly"],
    agentId: "diego-romero",
    yearBuilt: 2018,
    lotSize: "—",
    garage: 1,
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "real-estate-tips-2025",
    title: "10 Real Estate Trends Shaping 2025",
    category: "Market Trends",
    readTime: "12 Min Read",
    date: "May 24, 2025",
    author: { name: "Amelia Chen", role: "Senior Buying Specialist", avatar: IMAGES.agentW },
    excerpt: "From AI-powered home search to climate-resilient construction, the trends defining the next year of real estate.",
    content: `<p>The 2025 market rewards buyers and sellers who pay attention to small signals. Interest rate volatility, climate-resilient retrofits, and the rise of AI-assisted home search are reshaping how decisions get made.</p><h2>1. AI-assisted search is mainstream</h2><p>Buyers are arriving at first showings with detailed shortlists generated from natural-language searches. Agents who lean into this rather than fight it are winning more listings.</p><h2>2. Climate-resilient retrofits add value</h2><p>Solar, battery storage, and water reuse systems are no longer fringe, they're appraisable upgrades that meaningfully shift sale prices in fire- and flood-exposed regions.</p><h2>3. Suburban density is returning</h2><p>Walkable suburbs with strong third places (cafes, libraries, transit) are commanding premiums even as broader markets cool.</p>`,
    image: IMAGES.modern1,
  },
  {
    slug: "how-to-buy-first-home",
    title: "How to Buy Your First Home Without Burning Out",
    category: "Buying Tips",
    readTime: "9 Min Read",
    date: "May 12, 2025",
    author: { name: "Diego Romero", role: "Urban Specialist", avatar: IMAGES.agentM },
    excerpt: "A calmer, more structured way to navigate your first purchase without losing weekends to open houses.",
    content: `<p>First-time buying feels chaotic because most advice focuses on tactics, not sequencing. Here's the order that actually works.</p><h2>Get pre-underwritten, not just pre-approved</h2><p>Pre-underwriting puts you several steps ahead. You'll know exactly what you can offer, and sellers will treat your offer like a cash bid.</p><h2>Tour neighborhoods before you tour homes</h2><p>Spend two weekends walking your shortlist of neighborhoods at different times of day. You'll cut your home tour list in half.</p>`,
    image: IMAGES.couple,
  },
  {
    slug: "market-trends-q2",
    title: "Q2 Market Pulse: Where Prices Are Heading",
    category: "Market Trends",
    readTime: "7 Min Read",
    date: "Apr 30, 2025",
    author: { name: "Priya Anand", role: "Investment Advisor", avatar: IMAGES.agent3 },
    excerpt: "Inventory is loosening in three key metros. Here's what that means for buyers and owners holding for the long term.",
    content: `<p>Inventory in our three watch-list metros - Seattle, Austin, and Denver has expanded for the third consecutive month. This is not a crash signal; it's a reset toward normal.</p><h2>What buyers should do</h2><p>Negotiate. Sellers are quietly accepting price reductions of 3–6% when offers come with strong terms.</p>`,
    image: IMAGES.apartment,
  },
  {
    slug: "investment-guide",
    title: "Building a Real Estate Portfolio in Your 30s",
    category: "Investment",
    readTime: "14 Min Read",
    date: "Apr 18, 2025",
    author: { name: "Priya Anand", role: "Investment Advisor", avatar: IMAGES.agent3 },
    excerpt: "How to layer your first three investment properties without overextending or burning out as a landlord.",
    content: `<p>The portfolio playbook that's worked for our clients in their 30s is deceptively simple: one house-hack, one small multifamily, one stable rental.</p><h2>Property one: house-hack</h2><p>Owner-occupy a duplex or triplex with an FHA loan. Live in one unit, rent the others. Your "rent" is essentially zero.</p>`,
    image: IMAGES.exterior,
  },
  {
    slug: "home-staging-tips",
    title: "Home Staging That Actually Sells",
    category: "Lifestyle",
    readTime: "6 Min Read",
    date: "Apr 5, 2025",
    author: { name: "Hana Okafor", role: "Relocation Consultant", avatar: IMAGES.agentW },
    excerpt: "The five staging moves that consistently move offers higher — and the three that buyers see right through.",
    content: `<p>Staging is the highest-ROI prep work most sellers underinvest in. The trick is restraint.</p><h2>Edit, don't decorate</h2><p>Remove 40% of what's in each room. Buyers need to project themselves into the space.</p>`,
    image: IMAGES.living,
  },
  {
    slug: "neighbourhood-guide",
    title: "The Quiet Neighborhoods Worth a Second Look",
    category: "Lifestyle",
    readTime: "8 Min Read",
    date: "Mar 22, 2025",
    author: { name: "Diego Romero", role: "Urban Specialist", avatar: IMAGES.agentM },
    excerpt: "Six under-the-radar neighborhoods our agents are recommending to clients who want value without sacrificing soul.",
    content: `<p>The best neighborhoods rarely top the trend lists. Here are six pockets our team is watching closely.</p><h2>1. North Loop, Austin</h2><p>Mid-century bungalows on quiet streets, ten minutes from downtown, and a walkable café district.</p>`,
    image: IMAGES.green,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Olivia Park",
    role: "Buyer",
    company: "Software Engineer",
    rating: 5,
    quote: "Amelia made our first home purchase feel completely under control. We never once felt rushed and the negotiation saved us nearly $40k.",
    propertyName: "The Grand Haven",
    propertyAddress: "",
    avatar: IMAGES.agentW,
  },
  {
    id: "t2",
    name: "James & Cora Reid",
    role: "Sellers",
    company: "Restaurateurs",
    rating: 5,
    quote: "Marcus brought five qualified offers within ten days of listing. His staging recommendations alone justified the partnership.",
    propertyName: "Sunset Villa",
    propertyAddress: "",
    avatar: IMAGES.agentM,
  },
  {
    id: "t3",
    name: "Hina Sato",
    role: "Investor",
    company: "Portfolio Owner",
    rating: 5,
    quote: "Priya's underwriting is rigorous. She talked me out of two deals that looked great on paper and into one that's now my best performer.",
    propertyName: "Urban Nest",
    propertyAddress: "",
    avatar: IMAGES.agent3,
  },
  {
    id: "t4",
    name: "Daniel Brooks",
    role: "Relocating Buyer",
    company: "Healthcare Director",
    rating: 5,
    quote: "I moved cross-country sight unseen. Hana sent walk-through videos, vetted neighborhoods, and made it feel local from 2,000 miles away.",
    propertyName: "Maple Residency",
    propertyAddress: "",
    avatar: IMAGES.agentW,
  },
];

export const stats = [
  { label: "Unit Already", value: 112, prefix: "+", suffix: "" },
  { label: "Customer", value: 17, prefix: "+", suffix: "K" },
  { label: "Satisfied", value: 99, prefix: "", suffix: "%" },
  { label: "Reviews", value: 41, prefix: "+", suffix: "K" },
];

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/property", label: "Property" },
  { to: "/agent", label: "Agent" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];
