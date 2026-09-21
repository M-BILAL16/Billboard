'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Layers,
  Maximize2,
  X,
  PhoneCall,
  FileText,
  BadgeCheck,
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

  // Active Tab ('designs' | 'types')
  const [activeTab, setActiveTab] = useState<'designs' | 'types'>('designs');

  // Modal Lightbox for item detail / inspection
  const [inspectedItem, setInspectedItem] = useState<{
    item: CatalogItem | { name: string; description: string; image: string };
    type: 'design' | 'type' | 'product';
    subcatName: string;
    catName: string;
  } | null>(null);

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
    const targetCat = FULL_CATALOG.find((c) => c.id === catId);
    if (targetCat && targetCat.subcategories.length > 0) {
      setSelectedSubcatName(targetCat.subcategories[0].name);
      // Reset tab preference based on first subcat
      if (targetCat.subcategories[0].designs.length > 0) {
        setActiveTab('designs');
      } else if (targetCat.subcategories[0].types.length > 0) {
        setActiveTab('types');
      }
    }
  };

  const handleSubcatSelect = (sub: Subcategory) => {
    setSelectedSubcatName(sub.name);
    if (sub.designs.length > 0 && sub.types.length > 0) {
      // Keep current tab if valid
    } else if (sub.designs.length > 0) {
      setActiveTab('designs');
    } else if (sub.types.length > 0) {
      setActiveTab('types');
    }
  };

  return (
    <section
      id="products"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '6rem 0 7rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
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
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={14} />
            SIGN PRODUCTS CATALOG // 9 CATEGORIES • 89 ARCHITECTURAL LINES
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

          <p style={{ color: '#555555', fontSize: '1.08rem', maxWidth: '720px', lineHeight: 1.55 }}>
            Explore every custom sign product, design showcase, and architectural material type.
            Fabricated in our 10,000 sq ft NYC plant with full DOB permit management.
          </p>
        </div>

        {/* 1. Main Category Selector (Top Horizontal Pills) */}
        <div
          style={{
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
            paddingBottom: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'thin',
            }}
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
                    padding: '0.65rem 1.15rem',
                    borderRadius: '9999px',
                    border: isActive
                      ? '1.5px solid #1E56FF'
                      : '1px solid rgba(17, 17, 17, 0.10)',
                    backgroundColor: isActive ? '#1E56FF' : '#F7F5EF',
                    color: isActive ? '#FFFFFF' : '#222222',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive
                      ? '0 4px 14px rgba(30, 86, 255, 0.25)'
                      : 'none',
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
                        : 'rgba(17, 17, 17, 0.08)',
                      color: isActive ? '#FFFFFF' : '#666666',
                    }}
                  >
                    {cat.subcategories.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main 2-Column Explorer: Left Sidebar (Subcategories) + Right Content (Designs & Types) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
          className="products-catalog-grid"
        >
          {/* Left Sidebar: Subcategories List */}
          <aside
            style={{
              backgroundColor: '#F7F5EF',
              borderRadius: '20px',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '820px',
              position: 'sticky',
              top: '90px',
            }}
          >
            {/* Sidebar Title & Search Input */}
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
                  {activeCategory.name} ({activeCategory.subcategories.length})
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#1E56FF',
                    fontWeight: 600,
                  }}
                >
                  SUB-CATEGORIES
                </span>
              </div>

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
                  placeholder={`Search ${activeCategory.name.toLowerCase()}...`}
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(17, 17, 17, 0.12)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-body)',
                    color: '#111111',
                    outline: 'none',
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
                paddingRight: '0.25rem',
                flex: 1,
              }}
            >
              {filteredSubcategories.map((sub) => {
                const isSelected = sub.name.toLowerCase() === activeSubcategory.name.toLowerCase();
                const totalItems = (sub.designs?.length || 0) + (sub.types?.length || 0);

                return (
                  <button
                    key={sub.name}
                    onClick={() => handleSubcatSelect(sub)}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '12px',
                      border: isSelected
                        ? '1.5px solid #1E56FF'
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
                            fontSize: '0.88rem',
                            fontWeight: isSelected ? 700 : 500,
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
                            color: '#777777',
                            marginTop: '0.15rem',
                          }}
                        >
                          {sub.designs.length > 0 && `${sub.designs.length} Designs`}
                          {sub.designs.length > 0 && sub.types.length > 0 && ' • '}
                          {sub.types.length > 0 && `${sub.types.length} Types`}
                          {totalItems === 0 && 'Architectural Line'}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      size={14}
                      style={{
                        color: isSelected ? '#1E56FF' : 'rgba(17, 17, 17, 0.25)',
                        transform: isSelected ? 'translateX(2px)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </button>
                );
              })}

              {filteredSubcategories.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#888888', fontSize: '0.85rem' }}>
                  No subcategory matching &ldquo;{sidebarSearch}&rdquo;
                </div>
              )}
            </div>
          </aside>

          {/* Right Side: Selected Subcategory Canvas */}
          <main style={{ minWidth: 0 }}>
            {/* Subcategory Hero Header Banner */}
            <div
              style={{
                backgroundColor: '#FDF7E7',
                borderRadius: '24px',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background ambient watermarks */}
              <div
                style={{
                  position: 'absolute',
                  right: '-20px',
                  bottom: '-20px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '8rem',
                  lineHeight: 0.8,
                  color: 'rgba(17, 17, 17, 0.03)',
                  pointerEvents: 'none',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                NYC
              </div>

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
                    marginBottom: '0.75rem',
                  }}
                >
                  <span>{activeCategory.name}</span>
                  <span>/</span>
                  <span style={{ color: '#1E56FF', fontWeight: 700 }}>
                    {activeSubcategory.name}
                  </span>
                </div>

                {/* Subcategory Title */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1.25rem',
                    marginBottom: '1rem',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.03em',
                      textTransform: 'uppercase',
                      color: '#111111',
                      margin: 0,
                    }}
                  >
                    {activeSubcategory.name}
                  </h3>

                  {/* Primary Quote CTA */}
                  <button
                    type="button"
                    onClick={onOpenCampaignModal}
                    className="btn-primary"
                    style={{
                      padding: '0.65rem 1.25rem',
                      fontSize: '0.82rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    REQUEST A FREE QUOTE
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Subcategory Description */}
                <p
                  style={{
                    color: '#444444',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    maxWidth: '820px',
                    marginBottom: '1.25rem',
                  }}
                >
                  {activeSubcategory.description}
                </p>

                {/* Architectural Quality Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
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
                    10,000 SQ FT NYC IN-HOUSE FABRICATION
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
                    DOB PERMIT COMPLIANT
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
                    LICENSED 5-BOROUGH INSTALLATION
                  </span>
                </div>
              </div>
            </div>

            {/* 3. The 2 TABS: Designs & Types (exactly as requested) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid rgba(17, 17, 17, 0.08)',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {/* Tab Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* 1. Designs Tab */}
                {hasDesigns && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('designs')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.25rem',
                      borderBottom: effectiveTab === 'designs' ? '3px solid #1E56FF' : '3px solid transparent',
                      marginBottom: '-2px',
                      background: 'none',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      color: effectiveTab === 'designs' ? '#1E56FF' : '#666666',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
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

                {/* 2. Types Tab (Shows if types exist) */}
                {hasTypes && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('types')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.25rem',
                      borderBottom: effectiveTab === 'types' ? '3px solid #1E56FF' : '3px solid transparent',
                      marginBottom: '-2px',
                      background: 'none',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      color: effectiveTab === 'types' ? '#1E56FF' : '#666666',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: effectiveTab === 'types' ? 800 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>TYPES & MATERIALS</span>
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

              {/* Quick Tab Info Label */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: '#888888',
                }}
              >
                SHOWING {effectiveTab === 'designs' ? 'CUSTOM DESIGN SHOWCASES' : 'ARCHITECTURAL TYPES & SPECS'}
              </div>
            </div>

            {/* 4. The Content Grid: Designs OR Types */}
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
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                    }}
                    className="card-hover-effect"
                  >
                    {/* Image Container with Inspect Button */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 11',
                        backgroundColor: '#F2F2F2',
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
                        className="zoom-on-hover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            activeSubcategory.image || '/images/hero_storefront.jpg';
                        }}
                      />

                      {/* Design Tag */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(17, 17, 17, 0.75)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        DESIGN SHOWCASE
                      </div>

                      {/* Zoom Icon Button */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(6px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#111111',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                        title="Click to inspect"
                      >
                        <Maximize2 size={13} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div
                      style={{
                        padding: '1.1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: '#111111',
                            margin: '0 0 0.4rem 0',
                            lineHeight: 1.3,
                            textTransform: 'capitalize',
                          }}
                        >
                          {design.name}
                        </h4>

                        {design.description && (
                          <p
                            style={{
                              color: '#666666',
                              fontSize: '0.82rem',
                              lineHeight: 1.45,
                              margin: '0 0 0.9rem 0',
                            }}
                          >
                            {design.description}
                          </p>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '0.85rem',
                          borderTop: '1px solid rgba(17, 17, 17, 0.06)',
                          marginTop: '0.6rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: '#059669',
                            fontWeight: 700,
                          }}
                        >
                          ✓ CUSTOM FABRICATION
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
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
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

            {/* Content Grid: Types */}
            {effectiveTab === 'types' && hasTypes && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {activeSubcategory.types.map((typeItem) => (
                  <div
                    key={typeItem.id + typeItem.name}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid rgba(17, 17, 17, 0.09)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                    }}
                    className="card-hover-effect"
                  >
                    {/* Image Container with Inspect Button */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 11',
                        backgroundColor: '#F2F2F2',
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
                        className="zoom-on-hover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            activeSubcategory.image || '/images/hero_storefront.jpg';
                        }}
                      />

                      {/* Type Tag */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          backgroundColor: '#1E56FF',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        SIGN TYPE / SPEC
                      </div>

                      {/* Zoom Icon Button */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(6px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#111111',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                        title="Click to inspect"
                      >
                        <Maximize2 size={13} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div
                      style={{
                        padding: '1.1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: '#111111',
                            margin: '0 0 0.4rem 0',
                            lineHeight: 1.3,
                          }}
                        >
                          {typeItem.name}
                        </h4>

                        <p
                          style={{
                            color: '#666666',
                            fontSize: '0.82rem',
                            lineHeight: 1.45,
                            margin: '0 0 0.9rem 0',
                          }}
                        >
                          {typeItem.description ||
                            `Custom engineered ${typeItem.name} for high-traffic NYC commercial environments.`}
                        </p>
                      </div>

                      {/* Card Footer Actions */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '0.85rem',
                          borderTop: '1px solid rgba(17, 17, 17, 0.06)',
                          marginTop: '0.6rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
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
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
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

            {/* Fallback if no designs and no types: Product Showcase Banner */}
            {!hasDesigns && !hasTypes && (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px dashed rgba(17, 17, 17, 0.15)',
                  padding: '3rem 2rem',
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
                    backgroundColor: '#F2F2F2',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
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
                    fontSize: '1.3rem',
                    color: '#111111',
                    margin: 0,
                  }}
                >
                  Custom Architectural Fabrication for {activeSubcategory.name}
                </h4>

                <p style={{ color: '#666666', fontSize: '0.95rem', maxWidth: '580px', lineHeight: 1.5 }}>
                  {activeSubcategory.description}
                </p>

                <button
                  type="button"
                  onClick={onOpenCampaignModal}
                  className="btn-primary"
                  style={{ marginTop: '0.5rem' }}
                >
                  REQUEST SPEC & QUOTE FOR {activeSubcategory.name.toUpperCase()}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Item Lightbox Modal / Inspector */}
      {inspectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
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
              maxWidth: '860px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
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
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            {/* Modal Image Header */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                backgroundColor: '#111111',
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
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  backgroundColor: '#1E56FF',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {inspectedItem.type === 'design' ? 'DESIGN SHOWCASE' : 'ARCHITECTURAL TYPE'}
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
                  fontSize: '1.8rem',
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
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {inspectedItem.item.description}
                </p>
              )}

              {/* Specs & Highlights */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  backgroundColor: '#F7F5EF',
                  marginBottom: '1.5rem',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#777777' }}>
                    MANUFACTURING
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111111' }}>
                    10,000 sq ft NYC Facility
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
                    5 Boroughs (Manhattan, BK, QNS, BX, SI)
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
        .card-hover-effect:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08) !important;
          border-color: rgba(30, 86, 255, 0.3) !important;
        }
        .card-hover-effect:hover .zoom-on-hover {
          transform: scale(1.05);
        }
        @media (max-width: 960px) {
          .products-catalog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
