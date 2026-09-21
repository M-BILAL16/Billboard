'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Building2,
  Maximize2,
  X,
  PhoneCall,
  BadgeCheck,
  Filter,
  Grid,
  List,
} from 'lucide-react';
import { FULL_CATALOG, MainCategory, Subcategory, CatalogItem } from '@/data/catalogTypes';

interface SignProductsDirectoryProps {
  onOpenCampaignModal: () => void;
}

export default function SignProductsDirectory({ onOpenCampaignModal }: SignProductsDirectoryProps) {
  // Main Category State
  const [activeCategoryId, setActiveCategoryId] = useState<string>('indoor-signs');

  // Selected Subcategory State
  const [selectedSubcatName, setSelectedSubcatName] = useState<string>('Office Signs');

  // Search filter for subcategories
  const [sidebarSearch, setSidebarSearch] = useState<string>('');

  // Search filter inside Types / Mini-categories
  const [typesSearch, setTypesSearch] = useState<string>('');

  // Active Tab ('designs' | 'types')
  const [activeTab, setActiveTab] = useState<'designs' | 'types'>('designs');

  // Modal Lightbox for item detail / inspection
  const [inspectedItem, setInspectedItem] = useState<{
    item: CatalogItem | { name: string; description: string; image: string };
    type: 'design' | 'type' | 'product';
    subcatName: string;
    catName: string;
  } | null>(null);

  // Scroll ref for top categories navigation
  const categoriesScrollRef = useRef<HTMLDivElement>(null);

  // Active Category
  const activeCategory: MainCategory = useMemo(() => {
    return (
      FULL_CATALOG.find((cat) => cat.id === activeCategoryId) ||
      FULL_CATALOG[0]
    );
  }, [activeCategoryId]);

  // Filtered subcategories in sidebar
  const filteredSubcategories = useMemo(() => {
    const q = sidebarSearch.trim().toLowerCase();
    if (!q) return activeCategory.subcategories;
    return activeCategory.subcategories.filter((sub) =>
      sub.name.toLowerCase().includes(q) ||
      sub.description.toLowerCase().includes(q)
    );
  }, [activeCategory, sidebarSearch]);

  // Active Subcategory
  const activeSubcategory: Subcategory = useMemo(() => {
    const found = activeCategory.subcategories.find(
      (sub) => sub.name.toLowerCase() === selectedSubcatName.toLowerCase()
    );
    return found || filteredSubcategories[0] || activeCategory.subcategories[0];
  }, [activeCategory, selectedSubcatName, filteredSubcategories]);

  // Filtered Types & Mini-Categories based on mini-search
  const filteredTypes = useMemo(() => {
    const q = typesSearch.trim().toLowerCase();
    if (!q) return activeSubcategory.types;
    return activeSubcategory.types.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [activeSubcategory, typesSearch]);

  // Determine available tabs for active subcategory
  const hasDesigns = activeSubcategory.designs && activeSubcategory.designs.length > 0;
  const hasTypes = activeSubcategory.types && activeSubcategory.types.length > 0;

  // Sync activeTab when subcategory changes
  const effectiveTab: 'designs' | 'types' = useMemo(() => {
    if (hasDesigns && hasTypes) return activeTab;
    if (hasDesigns && !hasTypes) return 'designs';
    if (!hasDesigns && hasTypes) return 'types';
    return 'designs';
  }, [hasDesigns, hasTypes, activeTab]);

  const handleCategorySelect = (catId: string) => {
    setActiveCategoryId(catId);
    setSidebarSearch('');
    setTypesSearch('');
    const targetCat = FULL_CATALOG.find((c) => c.id === catId);
    if (targetCat && targetCat.subcategories.length > 0) {
      setSelectedSubcatName(targetCat.subcategories[0].name);
      if (targetCat.subcategories[0].designs.length > 0) {
        setActiveTab('designs');
      } else if (targetCat.subcategories[0].types.length > 0) {
        setActiveTab('types');
      }
    }
  };

  const handleSubcatSelect = (sub: Subcategory) => {
    setSelectedSubcatName(sub.name);
    setTypesSearch('');
    if (sub.designs.length > 0 && sub.types.length > 0) {
      // Keep current tab
    } else if (sub.designs.length > 0) {
      setActiveTab('designs');
    } else if (sub.types.length > 0) {
      setActiveTab('types');
    }
  };

  // Scroll Category pills left/right
  const scrollCategories = (direction: 'left' | 'right') => {
    if (!categoriesScrollRef.current) return;
    const amount = direction === 'left' ? -320 : 320;
    categoriesScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section
      id="products"
      style={{
        position: 'relative',
        backgroundColor: '#FBFBFA',
        padding: '6.5rem 0 7rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ maxWidth: '880px', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#1E56FF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '0.9rem',
            }}
          >
            <Sparkles size={14} />
            NYC PRODUCT CATALOG // 9 CATEGORIES • 89 SUBCATEGORIES • 410 MINI-CATEGORIES
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4.4vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#111111',
              marginBottom: '1rem',
            }}
          >
            FIND THE EXACT SIGN <br />
            <span style={{ color: '#1E56FF' }}>FOR YOUR NYC SPACE.</span>
          </h2>

          <p style={{ color: '#555555', fontSize: '1.08rem', maxWidth: '720px', lineHeight: 1.6 }}>
            Browse New York&apos;s most comprehensive commercial signage database. Search across all 9 major categories, 89 product lines, design showcases, and over 400 architectural material types &amp; mini-categories.
          </p>
        </div>

        {/* 1. Main Category Selector (Interactive Left/Right Scroll with Visible Navigation) */}
        <div
          style={{
            marginBottom: '2.25rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(17, 17, 17, 0.08)',
            padding: '0.65rem 0.85rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollCategories('left')}
            aria-label="Scroll categories left"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F7F5EF',
              border: '1px solid rgba(17, 17, 17, 0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#222222',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
            className="hover-bg-blue"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Scrollable Container with Visible Sleek Scrollbar */}
          <div
            ref={categoriesScrollRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              padding: '0.35rem 0.2rem 0.6rem 0.2rem',
              flex: 1,
            }}
            className="styled-categories-scroll"
          >
            {FULL_CATALOG.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1.15rem',
                    borderRadius: '14px',
                    border: isActive
                      ? '1px solid #1E56FF'
                      : '1px solid rgba(17, 17, 17, 0.08)',
                    backgroundColor: isActive ? '#1E56FF' : '#F7F5EF',
                    color: isActive ? '#FFFFFF' : '#333333',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive
                      ? '0 4px 14px rgba(30, 86, 255, 0.28)'
                      : 'none',
                    flexShrink: 0,
                  }}
                >
                  <span>{cat.name}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '9999px',
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.25)'
                        : 'rgba(17, 17, 17, 0.07)',
                      color: isActive ? '#FFFFFF' : '#666666',
                    }}
                  >
                    {cat.subcategories.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollCategories('right')}
            aria-label="Scroll categories right"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#F7F5EF',
              border: '1px solid rgba(17, 17, 17, 0.09)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#222222',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
            }}
            className="hover-bg-blue"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 2. Unified Master Explorer Shell (Sidebar + Content Panel) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(17, 17, 17, 0.09)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
          }}
          className="products-catalog-shell"
        >
          {/* Left Column: Subcategory Sidebar */}
          <aside
            style={{
              backgroundColor: '#FAF9F5',
              borderRight: '1px solid rgba(17, 17, 17, 0.08)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
            className="products-catalog-sidebar"
          >
            {/* Sidebar Sticky Header */}
            <div
              style={{
                position: 'sticky',
                top: '90px',
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 120px)',
                maxHeight: '780px',
              }}
            >
              {/* Header Info */}
              <div style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#666666',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {activeCategory.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#1E56FF',
                      fontWeight: 700,
                      backgroundColor: 'rgba(30, 86, 255, 0.08)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '9999px',
                    }}
                  >
                    {filteredSubcategories.length} SUBCATEGORIES
                  </span>
                </div>

                {/* Instant Search Bar */}
                <div style={{ position: 'relative' }}>
                  <Search
                    size={14}
                    style={{
                      position: 'absolute',
                      left: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#888888',
                    }}
                  />
                  <input
                    type="text"
                    placeholder={`Filter ${activeCategory.name.toLowerCase()}...`}
                    value={sidebarSearch}
                    onChange={(e) => setSidebarSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(17, 17, 17, 0.12)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.84rem',
                      fontFamily: 'var(--font-body)',
                      color: '#111111',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Scrollable Subcategories List */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  overflowY: 'auto',
                  paddingRight: '0.35rem',
                  flex: 1,
                }}
                className="custom-sidebar-scroll"
              >
                {filteredSubcategories.map((sub) => {
                  const isSelected = sub.name.toLowerCase() === activeSubcategory.name.toLowerCase();

                  return (
                    <button
                      key={sub.name}
                      onClick={() => handleSubcatSelect(sub)}
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '12px',
                        border: isSelected
                          ? '1px solid #1E56FF'
                          : '1px solid transparent',
                        backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                        color: isSelected ? '#111111' : '#444444',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.18s ease',
                        boxShadow: isSelected
                          ? '0 4px 12px rgba(30, 86, 255, 0.08)'
                          : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        {/* Subcategory Thumbnail */}
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#EBEBEB',
                            flexShrink: 0,
                            position: 'relative',
                            border: isSelected ? '1px solid rgba(30, 86, 255, 0.3)' : '1px solid rgba(17, 17, 17, 0.06)',
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sub.image || '/images/hero_storefront.jpg'}
                            alt={sub.name}
                            loading="lazy"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/images/hero_storefront.jpg';
                            }}
                          />
                        </div>

                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '0.86rem',
                              fontWeight: isSelected ? 800 : 600,
                              lineHeight: 1.25,
                              color: isSelected ? '#1E56FF' : '#111111',
                            }}
                          >
                            {sub.name}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.66rem',
                              color: isSelected ? '#555555' : '#888888',
                              marginTop: '0.15rem',
                            }}
                          >
                            {sub.designs.length > 0 && `${sub.designs.length} Designs`}
                            {sub.designs.length > 0 && sub.types.length > 0 && ' • '}
                            {sub.types.length > 0 && `${sub.types.length} Types & Mini-Cats`}
                            {sub.designs.length === 0 && sub.types.length === 0 && 'Custom Specs'}
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        size={14}
                        style={{
                          color: isSelected ? '#1E56FF' : 'rgba(17, 17, 17, 0.25)',
                          transform: isSelected ? 'translateX(2px)' : 'none',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                  );
                })}

                {filteredSubcategories.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#888888', fontSize: '0.85rem' }}>
                    No subcategory found matching &ldquo;{sidebarSearch}&rdquo;
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Right Column: Selected Subcategory & Cards Grid */}
          <main
            style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minWidth: 0,
              boxSizing: 'border-box',
            }}
          >
            <div>
              {/* Subcategory Hero Header Banner */}
              <div
                style={{
                  backgroundColor: '#FDF7E7',
                  borderRadius: '20px',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  padding: 'clamp(1.4rem, 2.5vw, 2rem)',
                  marginBottom: '2rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Breadcrumb */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#666666',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <span>{activeCategory.name}</span>
                    <span>/</span>
                    <span style={{ color: '#1E56FF', fontWeight: 700 }}>
                      {activeSubcategory.name}
                    </span>
                  </div>

                  {/* Title & Instant Quote CTA */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                        color: '#111111',
                        margin: 0,
                      }}
                    >
                      {activeSubcategory.name}
                    </h3>

                    <button
                      type="button"
                      onClick={onOpenCampaignModal}
                      className="btn-primary"
                      style={{
                        padding: '0.65rem 1.25rem',
                        fontSize: '0.82rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                      }}
                    >
                      REQUEST A FREE QUOTE
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Subcategory Official Description */}
                  <p
                    style={{
                      color: '#444444',
                      fontSize: '0.98rem',
                      lineHeight: 1.55,
                      maxWidth: '820px',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {activeSubcategory.description}
                  </p>

                  {/* Architectural Standards Bar */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(17, 17, 17, 0.08)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#111111',
                      }}
                    >
                      <Building2 size={12} style={{ color: '#1E56FF' }} />
                      10,000 SQ FT NYC FABRICATION
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(17, 17, 17, 0.08)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#059669',
                      }}
                    >
                      <ShieldCheck size={12} />
                      NYC DOB EXPEDITED & COMPLIANT
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '9999px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(17, 17, 17, 0.08)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: '#666666',
                      }}
                    >
                      <BadgeCheck size={12} style={{ color: '#1E56FF' }} />
                      5-BOROUGH LICENSED INSTALLATION
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. The 2 TABS: Designs & (Types / Mini-Categories) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1.5px solid rgba(17, 17, 17, 0.08)',
                  marginBottom: '1.75rem',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                {/* Tab Pill Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* Tab 1: Designs */}
                  {hasDesigns && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('designs')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.8rem 1.25rem',
                        borderBottom: effectiveTab === 'designs' ? '3px solid #1E56FF' : '3px solid transparent',
                        marginBottom: '-2px',
                        background: 'none',
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        color: effectiveTab === 'designs' ? '#1E56FF' : '#666666',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.96rem',
                        fontWeight: effectiveTab === 'designs' ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>DESIGNS</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '9999px',
                          backgroundColor: effectiveTab === 'designs' ? '#1E56FF' : 'rgba(17, 17, 17, 0.08)',
                          color: effectiveTab === 'designs' ? '#FFFFFF' : '#666666',
                          fontWeight: 700,
                        }}
                      >
                        {activeSubcategory.designs.length}
                      </span>
                    </button>
                  )}

                  {/* Tab 2: Types & Mini-Categories (Only if types exist) */}
                  {hasTypes && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('types')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.8rem 1.25rem',
                        borderBottom: effectiveTab === 'types' ? '3px solid #1E56FF' : '3px solid transparent',
                        marginBottom: '-2px',
                        background: 'none',
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        color: effectiveTab === 'types' ? '#1E56FF' : '#666666',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.96rem',
                        fontWeight: effectiveTab === 'types' ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>TYPES &amp; MINI-CATEGORIES</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '9999px',
                          backgroundColor: effectiveTab === 'types' ? '#1E56FF' : 'rgba(17, 17, 17, 0.08)',
                          color: effectiveTab === 'types' ? '#FFFFFF' : '#666666',
                          fontWeight: 700,
                        }}
                      >
                        {activeSubcategory.types.length}
                      </span>
                    </button>
                  )}
                </div>

                {/* Subtext info */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#888888',
                  }}
                >
                  SHOWING {effectiveTab === 'designs' ? 'REAL CLIENT FABRICATION DESIGNS' : `${activeSubcategory.types.length} ARCHITECTURAL TYPES & MINI-CATEGORIES`}
                </div>
              </div>

              {/* Sub-filter bar inside Types & Mini-Categories tab if there are many items */}
              {effectiveTab === 'types' && hasTypes && activeSubcategory.types.length > 6 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: '#FAF9F5',
                    border: '1px solid rgba(17, 17, 17, 0.07)',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555555', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                    <Filter size={13} style={{ color: '#1E56FF' }} />
                    <span>FILTER MINI-CATEGORIES:</span>
                  </div>

                  <div style={{ position: 'relative', minWidth: '260px', flex: 1, maxWidth: '400px' }}>
                    <Search size={13} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#888888' }} />
                    <input
                      type="text"
                      placeholder={`Search ${activeSubcategory.name} types & materials...`}
                      value={typesSearch}
                      onChange={(e) => setTypesSearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.4rem 0.75rem 0.4rem 2rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(17, 17, 17, 0.12)',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* 4. The Unified Card Grid: Designs */}
              {effectiveTab === 'designs' && hasDesigns && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {activeSubcategory.designs.map((design) => (
                    <div
                      key={design.id + design.name}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid rgba(17, 17, 17, 0.09)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '380px',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                      }}
                      className="catalog-card-hover"
                    >
                      {/* Image Frame */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '190px',
                          backgroundColor: '#F3F3F3',
                          overflow: 'hidden',
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          setInspectedItem({
                            item: design,
                            type: 'design',
                            subcatName: activeSubcategory.name,
                            catName: activeCategory.name,
                          })
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={design.image || design.remoteImage || activeSubcategory.image}
                          alt={design.name}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                          }}
                          className="catalog-card-img"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              activeSubcategory.image || '/images/hero_storefront.jpg';
                          }}
                        />

                        {/* Top Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(17, 17, 17, 0.78)',
                            backdropFilter: 'blur(6px)',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          DESIGN SHOWCASE
                        </div>

                        {/* Inspect Zoom Pill */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                            backdropFilter: 'blur(6px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#111111',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                          }}
                          title="Click to view full image"
                        >
                          <Maximize2 size={13} />
                        </div>
                      </div>

                      {/* Uniform Card Body */}
                      <div
                        style={{
                          padding: '1.1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}
                      >
                        <div>
                          {/* Clamped Title */}
                          <h4
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '0.96rem',
                              color: '#111111',
                              margin: '0 0 0.35rem 0',
                              lineHeight: 1.3,
                              textTransform: 'capitalize',
                              height: '2.5rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {design.name}
                          </h4>

                          {/* Clamped Description */}
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '0.8rem',
                              lineHeight: 1.45,
                              margin: 0,
                              height: '2.35rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {design.description ||
                              `Custom fabricated ${design.name} built in our NYC plant with custom mounting.`}
                          </p>
                        </div>

                        {/* Card Baseline Action Bar */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid rgba(17, 17, 17, 0.07)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.66rem',
                              color: '#059669',
                              fontWeight: 700,
                            }}
                          >
                            ✓ IN-HOUSE NYC BUILD
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setInspectedItem({
                                item: design,
                                type: 'design',
                                subcatName: activeSubcategory.name,
                                catName: activeCategory.name,
                              });
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#1E56FF',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.2rem 0.4rem',
                            }}
                          >
                            DETAILS
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Content Grid: Types & Mini-Categories */}
              {effectiveTab === 'types' && hasTypes && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {filteredTypes.map((typeItem) => (
                    <div
                      key={typeItem.id + typeItem.name}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid rgba(17, 17, 17, 0.09)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '380px',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                      }}
                      className="catalog-card-hover"
                    >
                      {/* Image Frame */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '190px',
                          backgroundColor: '#F3F3F3',
                          overflow: 'hidden',
                          cursor: 'pointer',
                        }}
                        onClick={() =>
                          setInspectedItem({
                            item: typeItem,
                            type: 'type',
                            subcatName: activeSubcategory.name,
                            catName: activeCategory.name,
                          })
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={typeItem.image || typeItem.remoteImage || activeSubcategory.image}
                          alt={typeItem.name}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease',
                          }}
                          className="catalog-card-img"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              activeSubcategory.image || '/images/hero_storefront.jpg';
                          }}
                        />

                        {/* Tag: Mini-Category vs Type */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '6px',
                            backgroundColor: typeItem.isMiniCategory ? '#0F172A' : '#1E56FF',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.62rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {typeItem.isMiniCategory ? 'MINI-CATEGORY // SPEC' : 'ARCHITECTURAL TYPE'}
                        </div>

                        {/* Inspect Zoom Pill */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.92)',
                            backdropFilter: 'blur(6px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#111111',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                          }}
                          title="Click to view full image"
                        >
                          <Maximize2 size={13} />
                        </div>
                      </div>

                      {/* Uniform Card Body */}
                      <div
                        style={{
                          padding: '1.1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}
                      >
                        <div>
                          {/* Clamped Title */}
                          <h4
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 700,
                              fontSize: '0.96rem',
                              color: '#111111',
                              margin: '0 0 0.35rem 0',
                              lineHeight: 1.3,
                              height: '2.5rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {typeItem.name}
                          </h4>

                          {/* Clamped Description */}
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '0.8rem',
                              lineHeight: 1.45,
                              margin: 0,
                              height: '2.35rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {typeItem.description ||
                              `Architectural grade ${typeItem.name} engineered for commercial NYC environments.`}
                          </p>
                        </div>

                        {/* Card Baseline Action Bar */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid rgba(17, 17, 17, 0.07)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.66rem',
                              color: '#1E56FF',
                              fontWeight: 700,
                            }}
                          >
                            ✓ DOB APPROVED
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setInspectedItem({
                                item: typeItem,
                                type: 'type',
                                subcatName: activeSubcategory.name,
                                catName: activeCategory.name,
                              });
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#1E56FF',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.2rem 0.4rem',
                            }}
                          >
                            SPECS
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredTypes.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', padding: '3rem 1rem', textAlign: 'center', color: '#888888' }}>
                      No type or mini-category found matching &ldquo;{typesSearch}&rdquo;.
                    </div>
                  )}
                </div>
              )}

              {/* Fallback if product only has main showcase */}
              {!hasDesigns && !hasTypes && (
                <div
                  style={{
                    backgroundColor: '#FAF9F5',
                    borderRadius: '16px',
                    border: '1.5px dashed rgba(17, 17, 17, 0.15)',
                    padding: '3.5rem 2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '180px',
                      height: '140px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeSubcategory.image || '/images/hero_storefront.jpg'}
                      alt={activeSubcategory.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: '#111111',
                      margin: 0,
                    }}
                  >
                    Custom Engineering & Fabrication for {activeSubcategory.name}
                  </h4>

                  <p style={{ color: '#666666', fontSize: '0.92rem', maxWidth: '540px', lineHeight: 1.5 }}>
                    {activeSubcategory.description}
                  </p>

                  <button
                    type="button"
                    onClick={onOpenCampaignModal}
                    className="btn-primary"
                    style={{ marginTop: '0.5rem' }}
                  >
                    REQUEST ARCHITECTURAL SPEC & ESTIMATE
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Even Baseline Dock (Guarantees Perfectly Level Section Bottom) */}
            <div
              style={{
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(17, 17, 17, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: '#666666',
                  }}
                >
                  NYC SIGN FACILITY ACTIVE // 10,000 SQ FT SHOP IN FULL PRODUCTION
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <a
                  href="tel:7184538300"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: '#111111',
                    textDecoration: 'none',
                  }}
                >
                  <PhoneCall size={13} style={{ color: '#1E56FF' }} />
                  (718) 453-8300
                </a>

                <button
                  type="button"
                  onClick={onOpenCampaignModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1E56FF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  CUSTOM SPECIFICATIONS INQUIRY →
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Full-Scale Item Lightbox Modal */}
      {inspectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.78)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setInspectedItem(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '840px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setInspectedItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Image Display */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                backgroundColor: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={inspectedItem.item.image || (inspectedItem.item as CatalogItem).remoteImage}
                alt={inspectedItem.item.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  backgroundColor: '#1E56FF',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {inspectedItem.type === 'design' ? 'DESIGN SHOWCASE' : 'ARCHITECTURAL TYPE / MINI-CATEGORY'}
              </div>
            </div>

            {/* Modal Details Body */}
            <div style={{ padding: '2rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: '#666666',
                  marginBottom: '0.4rem',
                }}
              >
                {inspectedItem.catName} / {inspectedItem.subcatName}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.75rem',
                  color: '#111111',
                  margin: '0 0 1rem 0',
                  textTransform: 'capitalize',
                }}
              >
                {inspectedItem.item.name}
              </h3>

              {inspectedItem.item.description && (
                <p
                  style={{
                    color: '#444444',
                    fontSize: '1.02rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {inspectedItem.item.description}
                </p>
              )}

              {/* Architectural Highlights */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  backgroundColor: '#FDF7E7',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(17, 17, 17, 0.06)',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#777777' }}>
                    MANUFACTURING
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111' }}>
                    10,000 sq ft NYC Plant
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#777777' }}>
                    COMPLIANCE
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#059669' }}>
                    DOB Expedited & Approved
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#777777' }}>
                    INSTALLATION
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111' }}>
                    All 5 NYC Boroughs
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    setInspectedItem(null);
                    onOpenCampaignModal();
                  }}
                  className="btn-primary"
                  style={{ flex: 1, minWidth: '220px' }}
                >
                  GET A FREE QUOTE FOR THIS EXACT SIGN
                  <ArrowRight size={16} />
                </button>

                <a
                  href="tel:7184538300"
                  className="btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <PhoneCall size={16} />
                  CALL (718) 453-8300
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .catalog-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08) !important;
          border-color: rgba(30, 86, 255, 0.35) !important;
        }
        .catalog-card-hover:hover .catalog-card-img {
          transform: scale(1.05);
        }
        .hover-bg-blue:hover {
          background-color: #1E56FF !important;
          color: #FFFFFF !important;
          border-color: #1E56FF !important;
        }
        .styled-categories-scroll {
          scrollbar-width: thin;
          scrollbar-color: #1E56FF rgba(17, 17, 17, 0.08);
        }
        .styled-categories-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .styled-categories-scroll::-webkit-scrollbar-track {
          background: rgba(17, 17, 17, 0.05);
          border-radius: 9999px;
        }
        .styled-categories-scroll::-webkit-scrollbar-thumb {
          background: #1E56FF;
          border-radius: 9999px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(17, 17, 17, 0.12);
          border-radius: 9999px;
        }
        @media (max-width: 960px) {
          .products-catalog-shell {
            grid-template-columns: 1fr !important;
          }
          .products-catalog-sidebar {
            border-right: none !important;
            border-bottom: 1px solid rgba(17, 17, 17, 0.08) !important;
          }
        }
      `}</style>
    </section>
  );
}
