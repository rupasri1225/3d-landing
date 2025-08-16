"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

// Type definitions
interface CNC3DPartProps {
  type: 'bracket' | 'cylinder' | 'bearing' | 'connector' | 'default';
  index?: number;
}

interface ToolAnimationProps {
  toolType?: 'mill' | 'drill' | 'lathe';
  index?: number;
}

// Enhanced 3D CNC Parts with realistic metallic rendering
const CNC3DPart = React.memo<CNC3DPartProps>(({ type, index = 0 }) => {
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const animate = () => {
      setRotation(prev => prev + 0.5);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const partStyles = {
    transform: isClient 
      ? `rotateY(${rotation + index * 72}deg) rotateX(${Math.sin(rotation * 0.008) * 15}deg) rotateZ(${Math.cos(rotation * 0.006) * 8}deg)`
      : `rotateY(${index * 72}deg) rotateX(0deg) rotateZ(0deg)`,
    transformStyle: 'preserve-3d' as const,
    transition: 'none',
    filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.4))'
  };

  if (type === 'bracket') {
    return (
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div 
          style={partStyles}
          className="w-32 h-36 relative"
        >
          {/* Main bracket body */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-500 rounded-2xl shadow-2xl border border-gray-400"
               style={{
                 background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 25%, #9ca3af 50%, #6b7280 75%, #4b5563 100%)',
                 boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.4)'
               }}>
            {/* Central mounting hole */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-800 rounded-full border-4 border-gray-600"
                 style={{
                   background: 'radial-gradient(circle at 30% 30%, #374151, #1f2937, #000000)',
                   boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.9)'
                 }}></div>
            
            {/* Corner bolt holes */}
            <div className="absolute top-3 left-3 w-4 h-4 bg-gray-800 rounded-full shadow-inner border border-gray-600"></div>
            <div className="absolute top-3 right-3 w-4 h-4 bg-gray-800 rounded-full shadow-inner border border-gray-600"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 bg-gray-800 rounded-full shadow-inner border border-gray-600"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 bg-gray-800 rounded-full shadow-inner border border-gray-600"></div>
            
            {/* Mounting slots */}
            <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-3 h-10 bg-gray-700 rounded-full shadow-inner"></div>
            <div className="absolute top-1/2 right-1 transform -translate-y-1/2 w-3 h-10 bg-gray-700 rounded-full shadow-inner"></div>
            
            {/* Enhanced metallic highlight */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-white opacity-40 rounded-full blur-sm"></div>
            <div className="absolute top-6 left-6 w-4 h-4 bg-white opacity-20 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cylinder') {
    return (
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div 
          style={partStyles}
          className="w-24 h-36 relative"
        >
          {/* Main cylinder body */}
          <div className="absolute inset-0 rounded-full shadow-2xl relative overflow-hidden"
               style={{
                 background: 'linear-gradient(45deg, #f3f4f6 0%, #e5e7eb 15%, #d1d5db 30%, #9ca3af 60%, #6b7280 85%, #4b5563 100%)',
                 boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.3), inset 6px 0 12px rgba(255,255,255,0.4), 0 12px 40px rgba(0,0,0,0.4)'
               }}>
            
            {/* Top cap */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg border-2 border-blue-700"
                 style={{
                   boxShadow: '0 3px 12px rgba(59, 130, 246, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)'
                 }}></div>
            
            {/* Bottom cap */}
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full shadow-lg border-2 border-blue-700"
                 style={{
                   boxShadow: '0 -3px 12px rgba(59, 130, 246, 0.6), inset 0 -2px 4px rgba(255,255,255,0.4)'
                 }}></div>
            
            {/* Central groove */}
            <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-600 transform -translate-y-1/2 shadow-inner border-t border-b border-gray-700"></div>
            
            {/* Surface lines */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute left-0 right-0 h-px bg-gray-500 opacity-40"
                   style={{ top: `${15 + i * 8}%` }}></div>
            ))}
            
            {/* Enhanced metallic highlight */}
            <div className="absolute top-3 left-3 w-6 h-12 bg-white opacity-50 rounded-full blur-sm transform rotate-12"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'bearing') {
    return (
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div 
          style={partStyles}
          className="w-32 h-32 relative"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full shadow-2xl relative"
               style={{
                 background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 25%, #9ca3af 50%, #6b7280 75%, #374151 100%)',
                 boxShadow: 'inset 0 6px 12px rgba(255,255,255,0.5), inset 0 -6px 12px rgba(0,0,0,0.4), 0 12px 40px rgba(0,0,0,0.5)'
               }}>
            
            {/* Blue inner race */}
            <div className="absolute inset-4 rounded-full shadow-inner relative"
                 style={{
                   background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                   boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.5), 0 3px 12px rgba(59, 130, 246, 0.4)'
                 }}>
              
              {/* Inner bearing hole */}
              <div className="absolute inset-5 rounded-full"
                   style={{
                     background: 'radial-gradient(circle at 30% 30%, #9ca3af, #6b7280, #374151)',
                     boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.9)'
                   }}></div>
              
              {/* Ball bearings simulation - Fixed positions for hydration */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                const x = Math.cos(angle) * 42;
                const y = Math.sin(angle) * 42;
                return (
                  <div key={i} className="absolute w-3 h-3 bg-gray-300 rounded-full shadow-sm border border-gray-400"
                       style={{
                         left: '50%',
                         top: '50%',
                         transform: `translate(${Math.round(x * 100) / 100 - 6}px, ${Math.round(y * 100) / 100 - 6}px)`,
                         background: 'radial-gradient(circle at 30% 30%, #f3f4f6, #d1d5db)'
                       }}></div>
                );
              })}
            </div>
            
            {/* Enhanced metallic highlights */}
            <div className="absolute top-3 left-3 w-10 h-10 bg-white opacity-40 rounded-full blur-sm"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white opacity-25 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'connector') {
    return (
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div 
          style={partStyles}
          className="w-28 h-32 relative"
        >
          {/* Main connector body */}
          <div className="absolute inset-0 rounded-2xl shadow-2xl relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, #f3f4f6 0%, #d1d5db 30%, #6b7280 70%, #374151 100%)',
                 boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.4)'
               }}>
            
            {/* Top connector part */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg border-2 border-blue-700"></div>
            
            {/* Central shaft */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-5 h-18 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-inner"></div>
            
            {/* Threading simulation */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="absolute left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-600"
                   style={{ top: `${30 + i * 6}%` }}></div>
            ))}
            
            {/* Enhanced metallic highlight */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-white opacity-50 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  // Default part
  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div 
        style={partStyles}
        className="w-28 h-28 relative"
      >
        <div className="absolute inset-0 rounded-2xl shadow-2xl"
             style={{
               background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 50%, #4b5563 100%)',
               boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.4)'
             }}>
          <div className="absolute top-2 left-2 w-8 h-8 bg-white opacity-40 rounded-full blur-sm"></div>
        </div>
      </div>
    </div>
  );
});

CNC3DPart.displayName = 'CNC3DPart';

// Manufacturing animation component
const ManufacturingAnimation = React.memo(() => {
  const [toolPosition, setToolPosition] = useState(0);
  const [workpieceRotation, setWorkpieceRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const animate = () => {
      setToolPosition(prev => prev + 1);
      setWorkpieceRotation(prev => prev + 2);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
      {/* Machine base */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-green-700 rounded-lg shadow-lg"></div>
      
      {/* Workpiece */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-lg"
        style={{
          transform: isClient 
            ? `translateX(-50%) rotateZ(${workpieceRotation}deg)`
            : 'translateX(-50%) rotateZ(0deg)',
          transformOrigin: 'center bottom'
        }}
      >
        <div className="absolute top-2 left-0 right-0 h-2 bg-blue-500 rounded-full"></div>
      </div>

      {/* Cutting tool */}
      <div 
        className="absolute top-8 w-3 h-12 bg-gray-800 shadow-lg"
        style={{
          left: isClient 
            ? `${50 + Math.sin(toolPosition * 0.05) * 20}%`
            : '50%',
          transform: 'translateX(-50%)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      ></div>

      {/* Spindle */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-green-600 rounded-lg shadow-lg"></div>

      {/* Sparks effect */}
      {isClient && Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
          style={{
            left: `${48 + Math.sin(toolPosition * 0.1 + i) * 10}%`,
            top: `${60 + Math.cos(toolPosition * 0.1 + i) * 5}%`,
            animationDelay: `${i * 0.1}s`
          }}
        ></div>
      ))}
    </div>
  );
});

ManufacturingAnimation.displayName = 'ManufacturingAnimation';

// Tool animation component
const ToolAnimation = React.memo<ToolAnimationProps>(({ toolType = 'mill', index = 0 }) => {
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const animate = () => {
      setRotation(prev => prev + (2 + index));
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [index]);

  const toolStyle = {
    transform: isClient 
      ? `rotateY(${rotation}deg) rotateX(${Math.sin(rotation * 0.02) * 15}deg)`
      : 'rotateY(0deg) rotateX(0deg)',
    transformStyle: 'preserve-3d' as const
  };

  if (toolType === 'drill') {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div style={toolStyle} className="relative">
          <div className="w-4 h-16 bg-gradient-to-b from-gray-300 to-gray-600 rounded-full shadow-lg"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-gray-800 shadow-lg"
               style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
          </div>
        </div>
      </div>
    );
  }

  if (toolType === 'lathe') {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div style={toolStyle} className="relative">
          <div className="w-8 h-12 bg-gradient-to-br from-gray-300 to-gray-600 rounded-lg shadow-lg"></div>
          <div className="absolute top-8 right-0 w-3 h-4 bg-gray-800 shadow-lg"
               style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div style={toolStyle} className="relative">
        <div className="w-4 h-12 bg-gradient-to-b from-gray-300 to-gray-600 rounded-full shadow-lg"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-yellow-600 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
});

ToolAnimation.displayName = 'ToolAnimation';

// About section 3D component
const AboutSection3D = React.memo(() => {
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const animate = () => {
      setRotation(prev => prev + 0.8);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="relative w-20 h-20"
        style={{
          transform: isClient 
            ? `rotateY(${rotation}deg) rotateX(${Math.sin(rotation * 0.01) * 10}deg)`
            : 'rotateY(0deg) rotateX(0deg)',
          transformStyle: 'preserve-3d' as const
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg shadow-lg"></div>
        <div className="absolute inset-2 border-4 border-blue-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-8 bg-yellow-500 rounded-full"></div>
        
        {/* Corner bolts */}
        {[
          { top: '10%', left: '10%' },
          { top: '10%', right: '10%' },
          { bottom: '10%', left: '10%' },
          { bottom: '10%', right: '10%' }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-500 rounded-full shadow-sm"
            style={pos}
          ></div>
        ))}
      </div>
    </div>
  );
});

AboutSection3D.displayName = 'AboutSection3D';

// Product part component
const ProductPart = React.memo(() => {
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const animate = () => {
      setRotation(prev => prev + 1);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="relative"
        style={{
          transform: isClient ? `rotateY(${rotation}deg)` : 'rotateY(0deg)',
          transformStyle: 'preserve-3d' as const
        }}
      >
        <div className="w-16 h-20 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-lg relative">
          <div className="absolute top-2 left-0 right-0 h-3 bg-blue-500 rounded-full"></div>
          <div className="absolute bottom-2 left-0 right-0 h-3 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
});

ProductPart.displayName = 'ProductPart';

// Loading Screen
const LoadingScreen = React.memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600 mt-4 font-medium">Loading 3D Models...</p>
    </div>
  </div>
));

LoadingScreen.displayName = 'LoadingScreen';

const ForgeManufacturingV2: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUploadDesign = useCallback(() => {
    // Simulate file upload dialog
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.step,.stp,.iges,.igs,.dwg,.dxf';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        alert(`File selected: ${file.name}\nThis would normally upload to your manufacturing system.`);
      }
    };
    input.click();
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, []);

  const navigationItems = useMemo(() => [
    { label: 'Manufacture', href: '#manufacture', id: 'manufacture' },
    { label: 'Tool library', href: '#tools', id: 'tools' },
    { label: 'Get in touch', href: '#contact', id: 'contact' }
  ], []);

  const productCategories = useMemo(() => [
    { id: '01', name: 'Custom Brackets', icon: '⚙️', description: 'Precision-engineered mounting solutions' },
    { id: '02', name: 'Steel Adapters', icon: '🔩', description: 'High-strength connection components' },
    { id: '03', name: 'Motor Mounts', icon: '🏗️', description: 'Vibration-resistant mounting systems' },
    { id: '04', name: 'Enclosures', icon: '📦', description: 'Protective housing solutions' }
  ], []);

  return (
    <div className="bg-white min-h-screen">
      {!isLoaded && <LoadingScreen />}
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="text-lg font-semibold text-gray-800 flex items-center">
                <span className="mr-1" role="img" aria-label="Home">🏠</span>
                Forge
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-1" role="img" aria-label="Location">📍</span>
                Canada, Montreal
              </div>
            </button>
            
            {/* Center Navigation */}
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  className="text-gray-700 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 pb-1"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <button className="hover:text-blue-600 transition-colors">Eng</button>
              <span>/</span>
              <button className="hover:text-blue-600 transition-colors">Fra</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section with Enhanced 3D */}
        <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          {/* Main 3D Parts Background - Much More Prominent */}
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-60"
            style={{ 
              transform: isClient 
                ? `translateY(${scrollY * 0.3}px) translateX(${Math.sin(scrollY * 0.005) * 30}px)`
                : 'translateY(0px) translateX(0px)',
              perspective: '1200px'
            }}
          >
            <div className="flex space-x-16 items-center">
              <div className="w-44 h-48 transform hover:scale-110 transition-transform duration-500">
                <CNC3DPart type="bracket" index={0} />
              </div>
              <div className="w-40 h-52 transform hover:scale-110 transition-transform duration-500">
                <CNC3DPart type="cylinder" index={1} />
              </div>
              <div className="w-44 h-44 transform hover:scale-110 transition-transform duration-500">
                <CNC3DPart type="bearing" index={2} />
              </div>
              <div className="w-40 h-48 transform hover:scale-110 transition-transform duration-500">
                <CNC3DPart type="connector" index={3} />
              </div>
              <div className="w-40 h-40 transform hover:scale-110 transition-transform duration-500">
                <CNC3DPart type="default" index={4} />
              </div>
            </div>
          </div>

          {/* Additional Large Floating Parts for Enhanced 3D Effect */}
          <div 
            className="absolute top-10 left-10 opacity-35 z-10"
            style={{ 
              transform: isClient 
                ? `translateY(${scrollY * 0.2}px) rotateZ(${scrollY * 0.15}deg)`
                : 'translateY(0px) rotateZ(0deg)',
              perspective: '800px'
            }}
          >
            <div className="w-32 h-32">
              <CNC3DPart type="bearing" index={5} />
            </div>
          </div>
          <div 
            className="absolute bottom-20 right-16 opacity-40 z-10"
            style={{ 
              transform: isClient 
                ? `translateY(${scrollY * -0.15}px) rotateZ(${scrollY * -0.1}deg)`
                : 'translateY(0px) rotateZ(0deg)',
              perspective: '800px'
            }}
          >
            <div className="w-36 h-36">
              <CNC3DPart type="cylinder" index={6} />
            </div>
          </div>
          <div 
            className="absolute top-32 right-20 opacity-30 z-10"
            style={{ 
              transform: isClient 
                ? `translateY(${scrollY * 0.25}px) rotateZ(${scrollY * 0.12}deg)`
                : 'translateY(0px) rotateZ(0deg)',
              perspective: '800px'
            }}
          >
            <div className="w-28 h-28">
              <CNC3DPart type="bracket" index={7} />
            </div>
          </div>
          <div 
            className="absolute bottom-40 left-32 opacity-25 z-10"
            style={{ 
              transform: isClient 
                ? `translateY(${scrollY * -0.2}px) rotateZ(${scrollY * -0.08}deg)`
                : 'translateY(0px) rotateZ(0deg)',
              perspective: '800px'
            }}
          >
            <div className="w-32 h-40">
              <CNC3DPart type="connector" index={8} />
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-20 flex items-center justify-center min-h-screen">
            <div className="text-center max-w-6xl mx-auto px-6">
              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                <div className="text-gray-900">
                  Precision{' '}
                  <span className="text-gray-400 italic font-light">CNC</span>{' '}
                  Parts
                </div>
                <div className="text-gray-900">Shipped as Fast as</div>
                <div className="text-gray-900">Tomorrow</div>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                Upload your CAD file, and we'll take care<br />
                of machining, finishing, and shipping—accurate<br />
                parts delivered fast, no stress.
              </p>

              {/* Upload Button */}
              <button 
                onClick={handleUploadDesign}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center space-x-3"
                aria-label="Upload your CAD design file"
              >
                <span>📂</span>
                <span>UPLOAD YOUR DESIGN</span>
              </button>

              {/* Bottom Stats */}
              <div className="absolute bottom-20 left-0 right-0 hidden md:block">
                <div className="flex justify-between items-end max-w-6xl mx-auto px-6">
                  <div className="text-left">
                    <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      12+ YEARS OF DELIVERING
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      PERFECT DETAILS
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      OVER 100,000 PARTS
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      MANUFACTURED ANNUALLY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section with Enhanced 3D */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Content */}
              <div>
                {/* About Button */}
                <div className="mb-8">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
                    <span>About</span>
                    <span className="ml-1">▼</span>
                  </button>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                  <span className="text-gray-900">Revolutionizing</span><br />
                  <span className="text-gray-900">Manufacturing with</span><br />
                  <span className="text-gray-900">Speed and </span>
                  <span className="text-gray-400 italic font-light">Precision</span>
                </h2>

                {/* Product Categories */}
                <div className="space-y-4 mb-12">
                  {productCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-4 text-lg group hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer">
                      <span className="text-blue-600 font-bold">{category.id}.</span>
                      <span className="text-gray-800 font-medium flex-1">{category.name}</span>
                      <span className="text-2xl" role="img" aria-label={category.name}>
                        {category.icon}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Enhanced 3D Product Gallery */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                    <AboutSection3D />
                  </div>
                  <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                    <ToolAnimation toolType="drill" />
                  </div>
                  <div className="h-24 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg overflow-hidden">
                    <ToolAnimation toolType="lathe" />
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="bg-gray-50 rounded-2xl p-8 relative">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    AS
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Ayrton Senna</h3>
                    <p className="text-gray-600 text-sm">CEO & Senior Partner at Forge</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 leading-relaxed text-lg mb-6">
                  &quot;At Forge, we believe that getting custom CNC parts should be fast, reliable, and effortless. That&apos;s why we built a fully streamlined platform that turns your CAD files into production-ready parts—delivered in as fast as one day.&quot;
                </blockquote>

                <div className="text-sm text-gray-500 mb-8">
                  &quot;We operate high-performance CNC machines backed by in-house automation and a trusted network of suppliers. From one-off prototypes to small production runs, our system is built to deliver precise, high-quality parts with speed.&quot;
                </div>

                {/* Enhanced 3D element in testimonial */}
                <div className="h-24 bg-white rounded-lg mb-4 overflow-hidden">
                  <ProductPart />
                </div>

                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  EVERY DETAIL MATTERS — WE CRAFT<br />
                  EACH PART WITH CARE, ACCURACY, AND<br />
                  A FINISH THAT FEELS JUST RIGHT
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Showcase Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                Advanced Manufacturing <span className="text-gray-400 italic font-light">Processes</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Watch our precision CNC machines create complex parts with incredible accuracy
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: 3D Animation */}
              <div className="h-96 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-lg overflow-hidden">
                <ManufacturingAnimation />
              </div>

              {/* Right: Process Steps */}
              <div className="space-y-8">
                {[
                  { 
                    step: '01', 
                    title: 'CAD Analysis', 
                    description: 'Our AI analyzes your design for manufacturability and optimization',
                    icon: '🔍'
                  },
                  { 
                    step: '02', 
                    title: 'Material Selection', 
                    description: 'Choose from 50+ materials including aluminum, steel, and titanium',
                    icon: '⚗️'
                  },
                  { 
                    step: '03', 
                    title: 'Precision Machining', 
                    description: '5-axis CNC machines create your parts with ±0.001" accuracy',
                    icon: '⚙️'
                  },
                  { 
                    step: '04', 
                    title: 'Quality Control', 
                    description: 'Every part is inspected using CMM and optical measurement',
                    icon: '✅'
                  }
                ].map((process) => (
                  <div key={process.step} className="flex items-start space-x-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {process.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{process.title}</h3>
                        <span className="text-2xl">{process.icon}</span>
                      </div>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manufacture Section */}
        <section id="manufacture" className="min-h-screen bg-gray-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                The Most Popular <br />
                <span className="text-gray-400 italic font-light">Details</span> We Produce
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Spherical Joint */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Spherical Joint</h3>
                  <span className="text-blue-600">→</span>
                </div>
                
                <div className="space-y-3 mb-8 text-sm text-gray-600">
                  <div><span className="font-medium">Material:</span> Steel, Stainless Steel</div>
                  <div><span className="font-medium">Load Capacity:</span> Up to 10,000 N</div>
                  <div><span className="font-medium">Thread:</span> M8 to M30</div>
                  <div><span className="font-medium">Bearing Type:</span> Ball or Plain</div>
                </div>

                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <CNC3DPart type="bearing" />
                </div>
              </div>

              {/* Protective Cap */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Protective Cap</h3>
                  <span className="text-blue-600">→</span>
                </div>
                
                <div className="space-y-3 mb-8 text-sm text-gray-600">
                  <div><span className="font-medium">Material:</span> Steel, Rubber</div>
                  <div><span className="font-medium">Fit Type:</span> Snap-on, Threaded</div>
                  <div><span className="font-medium">Water Resistance:</span> IP54</div>
                  <div><span className="font-medium">Impact Resistance:</span> 10 J</div>
                </div>

                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <CNC3DPart type="cylinder" />
                </div>
              </div>

              {/* Live Manufacturing Animation */}
              <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4">
                  Live Manufacturing<br />
                  Process
                </h3>
                
                <div className="mb-6">
                  <div className="h-32">
                    <ManufacturingAnimation />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-green-100 mb-2 font-medium">REAL-TIME MACHINING</div>
                  <div className="text-lg font-bold">CNC • TURNING • MILLING</div>
                </div>
              </div>
            </div>

            {/* Additional animated showcase */}
            <div className="mt-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload & Manufacture</h3>
                  <p className="text-gray-600">Drag and drop your 3D design files</p>
                </div>
                
                <div 
                  className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50"
                  onClick={handleUploadDesign}
                >
                  <div className="text-6xl mb-4">📁</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">Drop files here or click to upload</div>
                  <div className="text-gray-600 mb-4">STEP, IGES, STL, DXF, FBX supported</div>
                  <div className="flex justify-center space-x-4 text-sm text-blue-600 font-medium">
                    <span>✓ Instant Quote</span>
                    <span>✓ Fast Delivery</span>
                    <span>✓ Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="min-h-screen bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                Manufacturing <span className="text-gray-400 italic font-light">Tools</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                State-of-the-art CNC machines and precision tooling for perfect manufacturing results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: '5-Axis CNC Milling', capability: 'Complex geometries', accuracy: '±0.001"', tool: 'mill' as const },
                { name: 'Swiss Turning', capability: 'High precision parts', accuracy: '±0.0005"', tool: 'lathe' as const },
                { name: 'Wire EDM', capability: 'Intricate profiles', accuracy: '±0.0002"', tool: 'mill' as const },
                { name: 'Surface Grinding', capability: 'Ultra-smooth finishes', accuracy: '±0.00005"', tool: 'drill' as const },
                { name: 'Laser Cutting', capability: 'Sheet metal work', accuracy: '±0.003"', tool: 'mill' as const },
                { name: 'Quality Control', capability: 'CMM inspection', accuracy: '±0.0001"', tool: 'lathe' as const }
              ].map((tool, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="h-32 bg-white rounded-xl mb-6 overflow-hidden">
                    <ToolAnimation toolType={tool.tool} index={index} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 mb-2">{tool.capability}</p>
                  <p className="text-sm text-blue-600 font-medium">Accuracy: {tool.accuracy}</p>
                </div>
              ))}
            </div>

            {/* Advanced Manufacturing Showcase */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Advanced Manufacturing Cell</h3>
                  <div className="space-y-4">
                    {[
                      { feature: 'Automated Tool Changing', desc: '200+ tool capacity' },
                      { feature: 'Real-time Monitoring', desc: 'IoT-enabled quality control' },
                      { feature: 'Lights-out Manufacturing', desc: '24/7 unmanned operation' },
                      { feature: 'AI-driven Optimization', desc: 'Continuous process improvement' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        <div>
                          <div className="font-semibold">{item.feature}</div>
                          <div className="text-blue-200 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="h-64 bg-white/10 backdrop-blur-sm rounded-xl">
                  <ManufacturingAnimation />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                See Our Machines in Action
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience our state-of-the-art CNC machining capabilities and 
                precision manufacturing processes in action.
              </p>
            </div>
            
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/E1czmX6bjFA?start=10&rel=0&modestbranding=1"
                title="Advanced CNC Manufacturing Demo"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-6 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '100K+', label: 'Parts Manufactured', sublabel: 'Annual Production' },
                { number: '±0.001"', label: 'Precision Accuracy', sublabel: 'Guaranteed Quality' },
                { number: '24hrs', label: 'Fastest Delivery', sublabel: 'Rush Orders' },
                { number: '50+', label: 'Material Options', sublabel: 'Available Stock' }
              ].map((stat, index) => (
                <div key={index} className="p-6">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold mb-1">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 py-20 px-6 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Get in <span className="text-blue-200 italic font-light">Touch</span>
            </h2>
            <p className="text-xl mb-12 text-blue-100">
              Ready to start your next manufacturing project? Let&apos;s discuss your requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white"
                  />
                  <textarea 
                    placeholder="Project Details" 
                    rows={4}
                    className="w-full p-4 rounded-lg bg-white/20 border border-white/30 placeholder-white/70 text-white resize-none"
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-white text-blue-600 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info with 3D Animation */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📍</span>
                      <div>
                        <div className="font-semibold">Address</div>
                        <div className="text-blue-200">Montreal, Quebec, Canada</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📞</span>
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-blue-200">+1 (514) 555-0123</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📧</span>
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-blue-200">hello@forge.ca</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3D Contact Animation */}
                <div className="h-32 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                  <AboutSection3D />
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4">Business Hours</h4>
                  <div className="text-blue-200 space-y-1">
                    <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                    <div>Saturday: 9:00 AM - 4:00 PM</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Company',
                links: ['About', 'Careers', 'Contact', 'News']
              },
              {
                title: 'Services',
                links: ['CNC Machining', '3D Printing', 'Finishing', 'Assembly']
              },
              {
                title: 'Support',
                links: ['Help Center', 'Documentation', 'API', 'Status']
              },
              {
                title: 'Connect',
                links: ['LinkedIn', 'Twitter', 'GitHub', 'YouTube']
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link) => (
                    <li key={link}>
                      <button className="hover:text-white transition-colors text-left">
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 Forge Manufacturing. All rights reserved.</p>
            <div className="flex space-x-6 text-gray-400">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgeManufacturingV2;
