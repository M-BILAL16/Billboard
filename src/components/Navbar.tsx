'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Search,
  Volume2,
  VolumeX,
  Radio,
  Globe,
  Clock,
  Sparkles,
  MapPin,
  Layers,
  Tv,
  SlidersHorizontal,
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Command,
  ExternalLink,
  Phone,
} from 'lucide-react';
import { BILLBOARD_FORMATS, FEATURED_CAMPAIGNS, GLOBAL_LOCATIONS } from '@/data/billboardData';
import { FULL_CATALOG } from '@/data/catalogTypes';
import { INDUSTRIES_DATA } from '@/components/FormatExplorer';

interface NavbarProps {
  onOpenCampaignModal: () => void;
}

export default function Navbar({ onOpenCampaignModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState<string>('');
  const [hoveredCatalogId, setHoveredCatalogId] = useState<string>(FULL_CATALOG[0].id);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showNetworkTooltip, setShowNetworkTooltip] = useState(false);
  const [timezones, setTimezones] = useState({
    ldn: '',
    nyc: '',
    dxb: '',
    tyo: '',
  });

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Update real-time clocks and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 25);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    const updateClocks = () => {
      const now = new Date();
      setTimezones({
        ldn: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        nyc: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false }),
        dxb: now.toLocaleTimeString('en-AE', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', hour12: false }),
        tyo: now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false }),
      });
    };

    updateClocks();
    const clockInterval = setInterval(updateClocks, 10000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(clockInterval);
    };
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when search modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  // Audio Ambience Synthesis (Subtle luxury haptic feedback)
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);

    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (newState) {
        // High-tech pleasant dual-tone chime
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc2.frequency.setValueAtTime(880.0, now + 0.08); // A5

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now + 0.08);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
      }
    } catch {
      // AudioContext fallback
    }
  };

  const handleDropdownEnter = (dropdownKey: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdownKey);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  // Search Results Filtering
  const filteredFormats = BILLBOARD_FORMATS.filter(
    (f) =>
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLocations = GLOBAL_LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (hash: string) => {
    setActiveDropdown(null);
    setSearchOpen(false);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `/${hash}`;
      }
    }
  };

  const handleScrollTop = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Opens the catalog section already focused on the chosen category / subcategory
  const handleOpenCatalogItem = (categoryId: string, subcategoryName?: string) => {
    window.dispatchEvent(
      new CustomEvent('catalog:select', { detail: { categoryId, subcategoryName } })
    );
    setActiveLink('Catalog');
    handleNavigate('#products');
  };

  const hoveredCatalogCategory =
    FULL_CATALOG.find((cat) => cat.id === hoveredCatalogId) || FULL_CATALOG[0];

  const navLinkStyle = (label: string, isOpen = false): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.45rem 0.85rem',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    color: isOpen || activeLink === label ? '#111111' : '#444444',
    backgroundColor: isOpen || activeLink === label ? 'rgba(17, 17, 17, 0.06)' : 'transparent',
    transition: 'all 0.2s ease',
  });

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 950,
          padding: scrolled ? '12px 18px' : '0px',
          transition: 'padding 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Main Floating Island Shell: Full Width on Hero, Floating Squeezed Capsule on Scroll */}
        <nav
          style={{
            width: scrolled ? 'calc(100% - 24px)' : '100%',
            maxWidth: scrolled ? '1200px' : '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '0.45rem 0.85rem' : '1.15rem clamp(1.5rem, 3.6vw, 3.5rem)',
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(247, 245, 239, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: scrolled ? '9999px' : '0px',
            border: scrolled ? '1px solid rgba(17, 17, 17, 0.12)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(17, 17, 17, 0.12)' : '1px solid rgba(17, 17, 17, 0.08)',
            boxShadow: scrolled
              ? '0 16px 40px -8px rgba(0, 0, 0, 0.1), 0 4px 14px rgba(0, 0, 0, 0.04)'
              : 'none',
            pointerEvents: 'auto',
            transition:
              'max-width 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.45s cubic-bezier(0.16, 1, 0.3, 1), padding 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, box-shadow 0.4s ease, border 0.4s ease',
          }}
        >
          {/* Scroll Progress Indicator Line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '1.5rem',
              right: '1.5rem',
              height: '2px',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: '9999px',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: `${scrollProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #1E56FF 0%, #00D4FF 100%)',
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>

          {/* ============================================================ */}
          {/* LEFT SEGMENT: Brand Core & Live Network Telemetry */}
          {/* ============================================================ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            {/* Brand Logo */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                padding: '0.2rem 0.35rem',
                borderRadius: '9999px',
              }}
            >
              <Image
                src="/images/signsny-logo1.png"
                alt="Signs NYC"
                width={1024}
                height={576}
                priority
                style={{ width: 'auto', height: '44px', display: 'block' }}
              />
            </Link>

            {/* Live Global Network Status Pill */}
            <div
              className="network-status-pill"
              style={{ position: 'relative' }}
              onMouseEnter={() => setShowNetworkTooltip(true)}
              onMouseLeave={() => setShowNetworkTooltip(false)}
            >
              <button
                type="button"
                onClick={() => setShowNetworkTooltip((prev) => !prev)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.32rem 0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(17, 17, 17, 0.04)',
                  border: '1px solid rgba(17, 17, 17, 0.07)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  color: '#333333',
                  userSelect: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Radar Beacon */}
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)',
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontWeight: 600 }}>5 BOROUGHS ACTIVE</span>
                <ChevronDown size={11} style={{ opacity: 0.5 }} />
              </button>

              {/* Telemetry Popover Dropdown */}
              {showNetworkTooltip && (
                <div
                  className="mega-menu-enter"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    left: 0,
                    width: '300px',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(17, 17, 17, 0.1)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                    padding: '1rem',
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(17, 17, 17, 0.06)',
                      paddingBottom: '0.5rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Radio size={13} color="#1E56FF" />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: '#111111',
                        }}
                      >
                        NYC Fabrication & Service
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        color: '#10B981',
                        fontWeight: 700,
                      }}
                    >
                      DOB LICENSED
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {[
                      { city: 'Brooklyn Plant', code: 'BK', time: '10,000 SQ FT', screens: 'In-House CNC', status: 'Full Production' },
                      { city: 'Manhattan', code: 'MN', time: 'Active Boom', screens: 'DOB Permitted', status: 'Install Crews' },
                      { city: 'Queens Bay', code: 'QN', time: 'Laser & Weld', screens: 'Channel Letters', status: 'Fabrication' },
                      { city: 'The Bronx', code: 'BX', time: 'Scaffolding Unit', screens: 'Large Mesh', status: 'Field Team' },
                      { city: 'Staten Island', code: 'SI', time: 'Rapid Response', screens: '24/7 Service', status: 'Maintenance' },
                    ].map((hub) => (
                      <div
                        key={hub.code}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.4rem 0.55rem',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(17, 17, 17, 0.03)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.66rem',
                              fontWeight: 700,
                              color: '#111111',
                            }}
                          >
                            {hub.code}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#555555' }}>{hub.city}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.68rem',
                              color: '#888888',
                            }}
                          >
                            {hub.time}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.62rem',
                              backgroundColor: 'rgba(30, 86, 255, 0.1)',
                              color: '#1E56FF',
                              padding: '0.1rem 0.35rem',
                              borderRadius: '4px',
                              fontWeight: 700,
                            }}
                          >
                            {hub.screens}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* CENTER SEGMENT: Navigation Links & Mega-Menus (Desktop) */}
          {/* ============================================================ */}
          <div
            className="nav-desktop-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
            }}
          >
            {/* Home */}
            <Link
              href="/"
              onClick={() => {
                setActiveLink('Home');
                handleScrollTop();
              }}
              style={navLinkStyle('Home')}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              onClick={() => setActiveLink('About Us')}
              style={navLinkStyle('About Us')}
            >
              About Us
            </Link>

            {/* Catalog with full category / subcategory mega-menu */}
            <div
              onMouseEnter={() => handleDropdownEnter('catalog')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href="#products"
                onClick={() => setActiveLink('Catalog')}
                style={navLinkStyle('Catalog', activeDropdown === 'catalog')}
              >
                Catalog
                <ChevronDown
                  size={12}
                  style={{
                    transform: activeDropdown === 'catalog' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </a>

              {activeDropdown === 'catalog' && (
                <div
                  className="mega-menu-enter"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '50%',
                    marginLeft: 'calc(min(1040px, 100vw - 48px) / -2)',
                    width: 'min(1040px, calc(100vw - 48px))',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    borderRadius: '22px',
                    border: '1px solid rgba(17, 17, 17, 0.1)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.14)',
                    padding: '1.25rem',
                    zIndex: 1000,
                    display: 'grid',
                    gridTemplateColumns: '260px 1fr',
                    gap: '1.25rem',
                  }}
                >
                  {/* Category rail */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.15rem',
                      borderRight: '1px solid rgba(17, 17, 17, 0.07)',
                      paddingRight: '1rem',
                    }}
                  >
                    {FULL_CATALOG.map((cat) => {
                      const isHovered = cat.id === hoveredCatalogCategory.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onMouseEnter={() => setHoveredCatalogId(cat.id)}
                          onClick={() => handleOpenCatalogItem(cat.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.5rem',
                            padding: '0.55rem 0.7rem',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            backgroundColor: isHovered ? 'rgba(30, 86, 255, 0.08)' : 'transparent',
                            color: isHovered ? '#1E56FF' : '#333333',
                            fontFamily: 'var(--font-display)',
                            fontWeight: isHovered ? 800 : 600,
                            fontSize: '0.85rem',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span>{cat.name}</span>
                          <ChevronRight size={13} style={{ opacity: isHovered ? 1 : 0.35 }} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Subcategories of the hovered category */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem',
                        paddingBottom: '0.55rem',
                        borderBottom: '1px solid rgba(17, 17, 17, 0.06)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          color: '#666666',
                          textTransform: 'uppercase',
                        }}
                      >
                        {hoveredCatalogCategory.name} ({hoveredCatalogCategory.subcategories.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenCatalogItem(hoveredCatalogCategory.id)}
                        style={{
                          fontSize: '0.72rem',
                          color: '#1E56FF',
                          fontWeight: 700,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        View Category <ArrowUpRight size={12} />
                      </button>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.2rem 0.75rem',
                        maxHeight: '340px',
                        overflowY: 'auto',
                      }}
                    >
                      {hoveredCatalogCategory.subcategories.map((sub) => (
                        <button
                          key={sub.name}
                          type="button"
                          onClick={() => handleOpenCatalogItem(hoveredCatalogCategory.id, sub.name)}
                          style={{
                            padding: '0.4rem 0.55rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.78rem',
                            color: '#444444',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(17, 17, 17, 0.04)';
                            e.currentTarget.style.color = '#111111';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#444444';
                          }}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Industries with hover menu */}
            <div
              onMouseEnter={() => handleDropdownEnter('industries')}
              onMouseLeave={handleDropdownLeave}
            >
              <a
                href="#industries"
                onClick={() => setActiveLink('Industries')}
                style={navLinkStyle('Industries', activeDropdown === 'industries')}
              >
                Industries
                <ChevronDown
                  size={12}
                  style={{
                    transform: activeDropdown === 'industries' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </a>

              {activeDropdown === 'industries' && (
                <div
                  className="mega-menu-enter"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '50%',
                    marginLeft: 'calc(min(640px, 100vw - 48px) / -2)',
                    width: 'min(640px, calc(100vw - 48px))',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    borderRadius: '22px',
                    border: '1px solid rgba(17, 17, 17, 0.1)',
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.14)',
                    padding: '1.25rem',
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.85rem',
                      paddingBottom: '0.55rem',
                      borderBottom: '1px solid rgba(17, 17, 17, 0.06)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        color: '#666666',
                        textTransform: 'uppercase',
                      }}
                    >
                      Signage By Industry ({INDUSTRIES_DATA.length})
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.2rem 0.5rem' }}>
                    {INDUSTRIES_DATA.map((ind) => (
                      <a
                        key={ind.id}
                        href="#industries"
                        onClick={() => {
                          setActiveLink('Industries');
                          handleNavigate('#industries');
                        }}
                        style={{
                          padding: '0.45rem 0.6rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#444444',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(30, 86, 255, 0.06)';
                          e.currentTarget.style.color = '#1E56FF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#444444';
                        }}
                      >
                        {ind.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SEGMENT: Utility Command & Launch Action */}
          {/* ============================================================ */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>


            {/* Direct Phone Call (Prominent on Hero Full-Width) */}
            <a
              href="tel:7187847444"
              className="navbar-hero-phone"
              style={{
                display: scrolled ? 'none' : 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                color: '#111111',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
              }}
            >
              <Phone size={12} color="#1E56FF" />
              <span>(718) 784-7444</span>
            </a>

            {/* Primary Magnetic CTA: GET SIGN QUOTE */}
            <button
              type="button"
              onClick={onOpenCampaignModal}
              className="btn-shimmer"
              data-cursor="GET QUOTE"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '0.62rem 1.35rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(30, 86, 255, 0.32)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 86, 255, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(30, 86, 255, 0.32)';
              }}
            >
              <span>GET SIGN QUOTE</span>
              <ArrowUpRight size={15} strokeWidth={2.6} />
            </button>

            {/* Mobile Drawer Hamburger */}
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: mobileMenuOpen ? '#111111' : 'rgba(17, 17, 17, 0.05)',
                border: '1px solid rgba(17, 17, 17, 0.08)',
                color: mobileMenuOpen ? '#FFFFFF' : '#111111',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ============================================================ */}
      {/* ⌘K COMMAND SEARCH MODAL DIALOG */}
      {/* ============================================================ */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '12vh',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="mega-menu-enter"
            style={{
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(17, 17, 17, 0.12)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '1.15rem 1.35rem',
                borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
              }}
            >
              <Search size={18} color="#1E56FF" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search sign types, boroughs, materials, permit services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#111111',
                  background: 'transparent',
                }}
              />
              <kbd
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  padding: '0.2rem 0.45rem',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(17, 17, 17, 0.06)',
                  color: '#666666',
                  fontWeight: 700,
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Filtered Results Area */}
            <div
              style={{
                maxHeight: '420px',
                overflowY: 'auto',
                padding: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {/* Quick Actions Shortcuts */}
              <div style={{ marginBottom: '0.4rem' }}>
                <span
                  style={{
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#888888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    paddingLeft: '0.5rem',
                  }}
                >
                  Quick Actions
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '0.35rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      onOpenCampaignModal();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(30, 86, 255, 0.06)',
                      border: '1px solid rgba(30, 86, 255, 0.2)',
                      color: '#1E56FF',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <Sparkles size={14} /> Request Sign Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavigate('#planner')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(17, 17, 17, 0.04)',
                      border: '1px solid rgba(17, 17, 17, 0.07)',
                      color: '#111111',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <SlidersHorizontal size={14} /> Open Cost Planner
                  </button>
                </div>
              </div>

              {/* Formats Section */}
              {filteredFormats.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#888888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      paddingLeft: '0.5rem',
                    }}
                  >
                    Signage Formats
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.35rem' }}>
                    {filteredFormats.map((fmt) => (
                      <div
                        key={fmt.id}
                        onClick={() => handleNavigate('#formats')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.6rem 0.8rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(17, 17, 17, 0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <Tv size={15} color="#1E56FF" />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{fmt.title}</span>
                          <span style={{ fontSize: '0.72rem', color: '#666666' }}>{fmt.specs.format}</span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: '#1E56FF',
                            fontWeight: 700,
                          }}
                        >
                          {fmt.specs.estimatedReach}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations Section */}
              {filteredLocations.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#888888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      paddingLeft: '0.5rem',
                    }}
                  >
                    Borough Service Areas
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.35rem' }}>
                    {filteredLocations.map((loc) => (
                      <div
                        key={loc.id}
                        onClick={() => handleNavigate('#locations')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.6rem 0.8rem',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(17, 17, 17, 0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <MapPin size={15} color="#2457FF" />
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{loc.name}</span>
                          <span style={{ fontSize: '0.72rem', color: '#666666' }}>
                            {loc.city}, {loc.country}
                          </span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            color: '#2457FF',
                            fontWeight: 700,
                          }}
                        >
                          {loc.weeklyImpressions} views
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Tip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.25rem',
                backgroundColor: 'rgba(17, 17, 17, 0.03)',
                borderTop: '1px solid rgba(17, 17, 17, 0.06)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                color: '#888888',
              }}
            >
              <span>Navigation: Click any result to scroll to section</span>
              <span>Press ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MOBILE FULL-SCREEN ARCHITECTURAL DRAWER */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 920,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '5.5rem 1.75rem 2.5rem',
            overflowY: 'auto',
          }}
        >
          {/* Mobile Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { num: '01', label: 'Home', href: '/', tag: 'Start' },
              { num: '02', label: 'About Us', href: '/about', tag: 'Our 35-Yr Story' },
              { num: '03', label: 'Catalog', href: '/#products', tag: `${FULL_CATALOG.length} Categories` },
              { num: '04', label: 'Industries', href: '/#industries', tag: `${INDUSTRIES_DATA.length} Sectors` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.href === '/') {
                    e.preventDefault();
                    handleScrollTop();
                  } else if (link.href.startsWith('/#')) {
                    const hash = link.href.replace('/', '');
                    const element = document.querySelector(hash);
                    if (element) {
                      e.preventDefault();
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
                  textDecoration: 'none',
                  color: '#111111',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#1E56FF',
                      fontWeight: 700,
                    }}
                  >
                    {link.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {link.label}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#666666',
                    }}
                  >
                    {link.tag}
                  </span>
                  <ChevronRight size={16} color="#888888" />
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Drawer Bar */}
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Live City Times Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(17, 17, 17, 0.03)',
                border: '1px solid rgba(17, 17, 17, 0.06)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#555555',
              }}
            >
              <span>MN 100% DOB</span>
              <span>BK 10k SQ FT</span>
              <span>QN CNC BAYS</span>
              <span>BX 24/7 FLEET</span>
            </div>

            {/* Quick Find Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(17, 17, 17, 0.05)',
                border: '1px solid rgba(17, 17, 17, 0.1)',
                color: '#111111',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              <Search size={16} /> Quick Search Hub (⌘K)
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCampaignModal();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '0.9rem' }}
            >
              REQUEST A FREE QUOTE ↗
            </button>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1040px) {
          .nav-desktop-container {
            display: none !important;
          }
          .network-status-pill {
            display: none !important;
          }
          .search-cmd-label {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .navbar-hero-phone {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
