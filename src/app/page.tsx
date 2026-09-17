'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeTicker from '@/components/MarqueeTicker';
import IntroSection from '@/components/IntroSection';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import FormatExplorer from '@/components/FormatExplorer';
import SignProductsDirectory from '@/components/SignProductsDirectory';
import AttentionStatement from '@/components/AttentionStatement';
import SpotlightSection from '@/components/SpotlightSection';
import CampaignShowcase from '@/components/CampaignShowcase';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ImpactStats from '@/components/ImpactStats';
import LocationMap from '@/components/LocationMap';
import LocationCarousel from '@/components/LocationCarousel';
import HowItWorks from '@/components/HowItWorks';
import CampaignBuilder from '@/components/CampaignBuilder';
import WhyOutdoor from '@/components/WhyOutdoor';
import BrandTrust from '@/components/BrandTrust';
import TestimonialSection from '@/components/TestimonialSection';
import InsightsSection from '@/components/InsightsSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CampaignModal from '@/components/CampaignModal';
import { FeaturedCampaign, BillboardLocation } from '@/types';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'campaign' | 'showreel' | 'case-study'>('campaign');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<FeaturedCampaign | null>(null);
  const [builderConfig, setBuilderConfig] = useState<{
    city: string;
    audience: string;
    goal: string;
    format: string;
    screens: number;
    impressions: string;
  } | null>(null);

  const handleOpenCampaignModal = () => {
    setModalMode('campaign');
    setModalOpen(true);
  };

  const handleOpenShowreel = () => {
    setModalMode('showreel');
    setModalOpen(true);
  };

  const handleSelectCampaign = (campaign: FeaturedCampaign) => {
    setSelectedCaseStudy(campaign);
    setModalMode('case-study');
    setModalOpen(true);
  };

  const handleBuilderComplete = (config: {
    city: string;
    audience: string;
    goal: string;
    format: string;
    screens: number;
    impressions: string;
  }) => {
    setBuilderConfig(config);
    setModalMode('campaign');
    setModalOpen(true);
  };

  const handleSelectLocation = (loc: BillboardLocation) => {
    setBuilderConfig({
      city: loc.city,
      audience: 'Urban Shoppers & Commuters',
      goal: 'Brand Awareness',
      format: loc.availableFormats[0] || 'Digital Billboards',
      screens: 1,
      impressions: `${loc.weeklyImpressions} Weekly Impressions`,
    });
    setModalMode('campaign');
    setModalOpen(true);
  };

  return (
    <main style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#F7F5EF' }}>
      {/* Dynamic Navigation */}
      <Navbar onOpenCampaignModal={handleOpenCampaignModal} />

      {/* Hero Section */}
      <Hero
        onOpenShowreel={handleOpenShowreel}
        onOpenCampaignModal={handleOpenCampaignModal}
      />

      {/* Moving Brand Statement Marquee */}
      <MarqueeTicker />

      {/* Signs Products Catalog & Directory (Tabs, Compact Height, All 9 Categories & 89 Subcategories) */}
      <SignProductsDirectory onOpenCampaignModal={handleOpenCampaignModal} />

      {/* 7-Stage "Your Brand Goes Here" Scrollytelling */}
      <ScrollyCanvas />

      {/* Billboard Format Explorer */}
      <FormatExplorer />

      {/* Editorial Intro: "Digital Ads Get Ignored. Real Signs Stand Out." */}
      <IntroSection />

      {/* Attention Contrast Section (Minimal, Stark, Sequential Typographic) */}
      <AttentionStatement />

      {/* Interactive Spotlight Torch Section */}
      <SpotlightSection />

      {/* Featured Campaigns - "Seen in the Wild" */}
      <CampaignShowcase onSelectCampaign={handleSelectCampaign} />

      {/* Before / After Billboard Experience */}
      <BeforeAfterSlider onOpenCampaignModal={handleOpenCampaignModal} />

      {/* Impact Statistics */}
      <ImpactStats />

      {/* Interactive Global Network Map */}
      <LocationMap onSelectLocation={handleSelectLocation} />

      {/* Cinematic Location Showcase Scroller */}
      <LocationCarousel onSelectLocation={handleSelectLocation} />

      {/* How It Works Timeline */}
      <HowItWorks onStartPlanning={() => {
        const el = document.getElementById('planner');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Interactive Campaign Planner & Builder */}
      <CampaignBuilder onComplete={handleBuilderComplete} />

      {/* Why Outdoor Manifesto */}
      <WhyOutdoor />

      {/* Brand Trust Monochrome Logo Wall */}
      <BrandTrust />

      {/* Large Executive Testimonial */}
      <TestimonialSection />

      {/* Insights, Stories & Culture */}
      <InsightsSection />

      {/* Final Immersive Full-Screen CTA */}
      <FinalCTA onOpenCampaignModal={handleOpenCampaignModal} />

      {/* Oversized Interactive Footer */}
      <Footer />

      {/* Interactive Campaign / Showreel Modal */}
      <CampaignModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialConfig={builderConfig}
        mode={modalMode}
        caseStudy={selectedCaseStudy}
      />
    </main>
  );
}
