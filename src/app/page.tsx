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
import TransformationShowcase from '@/components/TransformationShowcase';
import ImpactStats from '@/components/ImpactStats';
import LocationMap from '@/components/LocationMap';
import HowItWorks from '@/components/HowItWorks';
import CampaignBuilder from '@/components/CampaignBuilder';
import BrandTrust from '@/components/BrandTrust';
import TestimonialSection from '@/components/TestimonialSection';
import InsightsSection from '@/components/InsightsSection';
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

      {/* Moving Brand Statement Marquee (Hidden) */}
      {/* <MarqueeTicker /> */}

      {/* Signs Products Catalog & Directory (Tabs, Compact Height, All 9 Categories & 89 Subcategories) */}
      <SignProductsDirectory onOpenCampaignModal={handleOpenCampaignModal} />

      {/* 7-Stage "Your Brand Goes Here" Scrollytelling */}
      <ScrollyCanvas />

      {/* Billboard Format Explorer */}
      <FormatExplorer />

      {/* Editorial Intro: "Digital Ads Get Ignored. Real Signs Stand Out." */}
      <IntroSection />

      {/* Attention Contrast Section (Typographic Scroll Effect) */}
      <AttentionStatement />

      {/* Interactive Spotlight Torch Section */}
      <SpotlightSection />

      {/* Interactive 10-Category Before / After Architectural Transformation Showcase */}
      <TransformationShowcase onOpenCampaignModal={handleOpenCampaignModal} />

      {/* Impact Statistics */}
      <ImpactStats />

      {/* Interactive Global Network Map */}
      <LocationMap onSelectLocation={handleSelectLocation} />


      {/* How It Works Timeline */}
      <HowItWorks onStartPlanning={() => {
        const el = document.getElementById('planner');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Interactive Campaign Planner & Builder */}
      <CampaignBuilder onComplete={handleBuilderComplete} />



      {/* Brand Trust Monochrome Logo Wall (Hidden) */}
      {/* <BrandTrust /> */}

      {/* Large Executive Testimonial */}
      <TestimonialSection />

      {/* Insights, Stories & Culture */}
      <InsightsSection />


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
