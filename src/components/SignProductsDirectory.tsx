'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Search,
  ExternalLink,
  Layers,
  Columns,
  Grid,
  CheckCircle2,
  ChevronRight,
  Shield,
  Clock,
  Hammer,
  X,
} from 'lucide-react';
import { SIGN_PRODUCTS_CATALOG, SignProductItem, SignProductCategory } from '@/data/categoriesData';

interface SignProductsDirectoryProps {
  onOpenCampaignModal: () => void;
}

export default function SignProductsDirectory({ onOpenCampaignModal }: SignProductsDirectoryProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('indoor-signs');
  const [selectedItemName, setSelectedItemName] = useState<string>('Office Signs');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('split');

  // Active Category Data
  const activeCategory = useMemo(() => {
    return (
      SIGN_PRODUCTS_CATALOG.find((cat) => cat.id === activeCategoryId) ||
      SIGN_PRODUCTS_CATALOG[0]
    );
  }, [activeCategoryId]);

  // Filtered subcategories based on search
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return activeCategory.subcategories;
    return activeCategory.subcategories.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.highlight && item.highlight.toLowerCase().includes(q))
    );
  }, [activeCategory, searchQuery]);

  // Selected item object
  const activeItem: SignProductItem = useMemo(() => {
    const found = filteredItems.find((item) => item.name === selectedItemName);
    if (found) return found;
    return filteredItems[0] || activeCategory.subcategories[0];
  }, [filteredItems, selectedItemName, activeCategory]);

  const handleCategoryChange = (cat: SignProductCategory) => {
    setActiveCategoryId(cat.id);
    setSearchQuery('');
    setSelectedItemName(cat.subcategories[0]?.name || '');
  };

  return (
    <section
      id="products"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        padding: '7.5rem 0',
        borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#1E56FF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1.1rem',
              }}
            >
              <Sparkles size={14} />
              PRODUCT CATALOG // 9 CATEGORIES • 89 ARCHITECTURAL TYPES
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: '#111111',
                marginBottom: '1.25rem',
              }}
            >
              FIND THE EXACT SIGN <br />
              <span style={{ color: '#1E56FF' }}>FOR YOUR NYC SPACE.</span>
            </h2>

            <p style={{ color: '#555555', fontSize: '1.1rem', maxWidth: '680px', lineHeight: 1.6 }}>
              Browse New York&apos;s most comprehensive commercial signage directory. Produced in our 10,000 sq ft NYC plant with DOB expediting and licensed 5-borough installation.
            </p>
          </div>

          {/* Right Header Actions: External Catalog Link & View Mode Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* View Mode Toggle */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#F7F5EF',
                padding: '0.25rem',
                borderRadius: '9999px',
                border: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('split')}
                title="Split Inspector View"
                aria-label="Split Inspector View"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: viewMode === 'split' ? '#111111' : 'transparent',
                  color: viewMode === 'split' ? '#FFFFFF' : '#666666',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Columns size={13} />
                <span>Inspector</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Compact Grid View"
                aria-label="Compact Grid View"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? '#111111' : 'transparent',
                  color: viewMode === 'grid' ? '#FFFFFF' : '#666666',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Grid size={13} />
                <span>Grid</span>
              </button>
            </div>

            <a
              href="https://signsny.com/sign-products/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-cursor="CATALOG"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                padding: '0.65rem 1.25rem',
              }}
            >
              Official Catalog ↗
            </a>
          </div>
        </div>

        {/* 9 Category Tabs Navigation Bar (Scrollable horizontally on mobile, clean wrap on desktop) */}
        <div
          style={{
            position: 'relative',
            marginBottom: '1.75rem',
            borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
            paddingBottom: '1.25rem',
          }}
        >
          <div
            className="category-pills-bar"
            style={{
              display: 'flex',
              gap: '0.55rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {SIGN_PRODUCTS_CATALOG.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.6rem 1.15rem',
                    borderRadius: '9999px',
                    border: isActive
                      ? '1px solid #1E56FF'
                      : '1px solid rgba(17, 17, 17, 0.08)',
                    backgroundColor: isActive ? '#1E56FF' : '#F7F5EF',
                    color: isActive ? '#FFFFFF' : '#222222',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    letterSpacing: '0.01em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: isActive ? '0 4px 14px rgba(30, 86, 255, 0.28)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.borderColor = 'rgba(30, 86, 255, 0.4)';
                      e.currentTarget.style.color = '#1E56FF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#F7F5EF';
                      e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.08)';
                      e.currentTarget.style.color = '#222222';
                    }
                  }}
                >
                  <span>{cat.category}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                      backgroundColor: isActive
                        ? 'rgba(255, 255, 255, 0.25)'
                        : 'rgba(17, 17, 17, 0.08)',
                      color: isActive ? '#FFFFFF' : '#666666',
                      fontWeight: 700,
                    }}
                  >
                    {cat.subcategories.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-Header & Live Filter Bar for Active Category */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F7F5EF',
            borderRadius: '16px',
            padding: '0.85rem 1.4rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(17, 17, 17, 0.06)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#1E56FF',
                backgroundColor: 'rgba(30, 86, 255, 0.1)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
              }}
            >
              CAT {activeCategory.code}
            </span>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  color: '#111111',
                  textTransform: 'uppercase',
                  marginRight: '0.6rem',
                }}
              >
                {activeCategory.category}
              </span>
              <span
                className="category-tagline"
                style={{
                  fontSize: '0.8rem',
                  color: '#666666',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {activeCategory.tagline}
              </span>
            </div>
          </div>

          {/* Quick Filter Box */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              width: '280px',
              maxWidth: '100%',
            }}
          >
            <Search
              size={14}
              color="#888888"
              style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder={`Filter in ${activeCategory.category}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 2rem 0.5rem 2.1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(17, 17, 17, 0.12)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-sans)',
                color: '#111111',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1E56FF')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.12)')}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear filter"
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#888888',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================ */}
        {/* COMPACT VIEWPORT CONTAINER: Strictly capped height (~540px) */}
        {/* ================================================================ */}
        {viewMode === 'split' ? (
          /* SPLIT MASTER-DETAIL VIEW */
          <div
            className="split-catalog-container"
            style={{
              display: 'grid',
              gridTemplateColumns: '40% 60%',
              gap: '1.5rem',
              height: '530px',
              backgroundColor: '#F7F5EF',
              borderRadius: '24px',
              padding: '1.25rem',
              border: '1px solid rgba(17, 17, 17, 0.08)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Left Column: Scrollable Subcategories List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(17, 17, 17, 0.06)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '0.85rem 1.1rem',
                  borderBottom: '1px solid rgba(17, 17, 17, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#FAF9F5',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: '#666666',
                    textTransform: 'uppercase',
                  }}
                >
                  Select Subcategory ({filteredItems.length})
                </span>
                <span style={{ fontSize: '0.68rem', color: '#1E56FF', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  Click to inspect
                </span>
              </div>

              {/* Scrollable list items */}
              <div
                className="custom-catalog-scroll"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '0.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                {filteredItems.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#888888', fontSize: '0.85rem' }}>
                    No products matched &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const isSelected = item.name === activeItem.name;
                    const numStr = (idx + 1).toString().padStart(2, '0');

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedItemName(item.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '10px',
                          border: isSelected
                            ? '1.5px solid #1E56FF'
                            : '1px solid transparent',
                          backgroundColor: isSelected ? 'rgba(30, 86, 255, 0.06)' : 'transparent',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.18s ease',
                          width: '100%',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'rgba(17, 17, 17, 0.03)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              color: isSelected ? '#1E56FF' : '#999999',
                              fontWeight: 700,
                              width: '20px',
                            }}
                          >
                            {numStr}
                          </span>
                          <div>
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: '0.88rem',
                                color: isSelected ? '#1E56FF' : '#111111',
                              }}
                            >
                              {item.name}
                            </div>
                            {item.highlight && (
                              <div
                                style={{
                                  fontSize: '0.66rem',
                                  fontFamily: 'var(--font-mono)',
                                  color: '#777777',
                                  marginTop: '1px',
                                }}
                              >
                                {item.highlight}
                              </div>
                            )}
                          </div>
                        </div>

                        <ChevronRight
                          size={15}
                          color={isSelected ? '#1E56FF' : '#CCCCCC'}
                          style={{
                            transform: isSelected ? 'translateX(2px)' : 'none',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Detailed Spotlight Card for Selected Subcategory */}
            <div
              style={{
                height: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(17, 17, 17, 0.06)',
                padding: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.02)',
                position: 'relative',
                overflowY: 'auto',
              }}
            >
              <div>
                {/* Top badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        color: '#1E56FF',
                        backgroundColor: 'rgba(30, 86, 255, 0.09)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                      }}
                    >
                      {activeCategory.category.toUpperCase()}
                    </span>
                    {activeItem.highlight && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: '#111111',
                          backgroundColor: '#F7F5EF',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                        }}
                      >
                        {activeItem.highlight}
                      </span>
                    )}
                  </div>

                  <a
                    href={activeCategory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View ${activeCategory.category} on SignsNY.com`}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#1E56FF',
                      textDecoration: 'none',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    signsny.com <ExternalLink size={12} />
                  </a>
                </div>

                {/* Subcategory Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.4rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    color: '#111111',
                    marginBottom: '1rem',
                  }}
                >
                  {activeItem.name}
                </h3>

                {/* Direct description from Signs NY */}
                <p
                  style={{
                    color: '#444444',
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.12rem)',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem',
                  }}
                >
                  {activeItem.description}
                </p>

                {/* 3 Engineered Value Points */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.85rem',
                    marginBottom: '2rem',
                  }}
                  className="spotlight-features-grid"
                >
                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      backgroundColor: '#FAF9F5',
                      border: '1px solid rgba(17, 17, 17, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                      <Hammer size={14} color="#1E56FF" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase' }}>
                        Production
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#111111', display: 'block' }}>
                      In-House NYC Plant
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      backgroundColor: '#FAF9F5',
                      border: '1px solid rgba(17, 17, 17, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                      <Shield size={14} color="#10B981" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase' }}>
                        Compliance
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#111111', display: 'block' }}>
                      DOB & Code Verified
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      backgroundColor: '#FAF9F5',
                      border: '1px solid rgba(17, 17, 17, 0.05)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                      <Clock size={14} color="#F59E0B" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 800, color: '#888888', textTransform: 'uppercase' }}>
                        Lead Time
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#111111', display: 'block' }}>
                      Standard & Rush
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(17, 17, 17, 0.08)',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  type="button"
                  onClick={onOpenCampaignModal}
                  className="btn-primary"
                  style={{
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>Request Quote For {activeItem.name}</span>
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </button>

                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    padding: '0.75rem 1.35rem',
                    fontSize: '0.82rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>View on SignsNY.com</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* COMPACT GRID VIEW (Max Height 530px with custom scrollbar) */
          <div
            className="custom-catalog-scroll"
            style={{
              height: '530px',
              overflowY: 'auto',
              backgroundColor: '#F7F5EF',
              borderRadius: '24px',
              padding: '1.5rem',
              border: '1px solid rgba(17, 17, 17, 0.08)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {filteredItems.map((item, idx) => {
                const numStr = (idx + 1).toString().padStart(2, '0');

                return (
                  <div
                    key={item.name}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '1.35rem',
                      border: '1px solid rgba(17, 17, 17, 0.07)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.02)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(30, 86, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(30, 86, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.02)';
                      e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.07)';
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: '0.65rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.66rem',
                            fontWeight: 700,
                            color: '#1E56FF',
                          }}
                        >
                          {activeCategory.code}.{numStr}
                        </span>
                        {item.highlight && (
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              color: '#555555',
                              backgroundColor: '#F7F5EF',
                              padding: '0.12rem 0.45rem',
                              borderRadius: '4px',
                            }}
                          >
                            {item.highlight}
                          </span>
                        )}
                      </div>

                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: '1.08rem',
                          color: '#111111',
                          textTransform: 'uppercase',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.name}
                      </h4>

                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: '#555555',
                          lineHeight: 1.5,
                          marginBottom: '1.25rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid rgba(17, 17, 17, 0.06)',
                      }}
                    >
                      <button
                        type="button"
                        onClick={onOpenCampaignModal}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '0.74rem',
                          color: '#1E56FF',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                        }}
                      >
                        Get Quote ↗
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: '#888888',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        Details <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-catalog-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-catalog-scroll::-webkit-scrollbar-track {
          background: rgba(17, 17, 17, 0.03);
          border-radius: 9999px;
        }
        .custom-catalog-scroll::-webkit-scrollbar-thumb {
          background: rgba(30, 86, 255, 0.25);
          border-radius: 9999px;
        }
        .custom-catalog-scroll::-webkit-scrollbar-thumb:hover {
          background: #1e56ff;
        }

        @media (max-width: 992px) {
          .split-catalog-container {
            grid-template-columns: 1fr !important;
            height: auto !important;
            max-height: none !important;
          }
          .split-catalog-container > div:first-child {
            height: 240px !important;
          }
          .split-catalog-container > div:last-child {
            height: auto !important;
          }
          .spotlight-features-grid {
            grid-template-columns: 1fr !important;
          }
          .category-tagline {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
