import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bath, BedDouble, Heart, MapPin, Maximize2 } from "lucide-react";
import { useState } from "react";
import type { Property } from "@/lib/data";

export function PropertyCard({ property }: { property: Property }) {
  const [liked, setLiked] = useState(false);
  const formattedPrice =
    property.status === "For Rent"
      ? `$${property.price.toLocaleString()}/mo`
      : `$${property.price.toLocaleString()}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <Link
        to="/property/$slug"
        params={{ slug: property.slug }}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {property.status}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setLiked((v) => !v);
            }}
            aria-label="Save to wishlist"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink shadow-soft transition-transform hover:scale-110"
          >
            <Heart
              className="h-4 w-4"
              fill={liked ? "#dc2626" : "none"}
              color={liked ? "#dc2626" : "currentColor"}
            />
          </button>
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-xl font-bold text-ink">{formattedPrice}</p>
            <span className="text-xs font-medium text-muted-foreground">{property.type}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">{property.name}</h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {property.city}
          </p>
          <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-ink-soft">
            <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-primary" /> {property.beds} bd</span>
            <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-primary" /> {property.baths} ba</span>
            <span className="flex items-center gap-1.5"><Maximize2 className="h-4 w-4 text-primary" /> {property.area}m²</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
