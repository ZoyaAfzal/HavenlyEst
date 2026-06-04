import { createFileRoute } from "@tanstack/react-router";
import {
  BlogPreviewSection,
  CtaBannerSection,
  HeroSection,
  HowItWorksSection,
  PropertyListings,
  TestimonialsSection,
  TrustSection,
  UnlockValueSection,
  WhyChooseSection,
} from "@/components/sections/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HavenlyEst - Find your dream home" },
      { name: "description", content: "Premium property management, curated listings, and trusted agents. Find your next home with HavenlyEst." },
      { property: "og:title", content: "HavenlyEst - Find your dream home" },
      { property: "og:description", content: "Premium property management, curated listings, and trusted agents." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <WhyChooseSection />
      <PropertyListings />
      <HowItWorksSection />
      <UnlockValueSection />
      <TestimonialsSection />
      <BlogPreviewSection />
      <CtaBannerSection />
    </>
  );
}
