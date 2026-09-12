import React, { useEffect, useState, useRef, useCallback } from 'react';

interface WaterRipple {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'drag' | 'link' | 'story'>('default');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [ripples, setRipples] = useState<WaterRipple[]>([]);

  // Primary droplet references
  const mainDropRef = useRef<HTMLDivElement>(null);
  const trailDrop1Ref = useRef<HTMLDivElement>(null);
  const trailDrop2Ref = useRef<HTMLDivElement>(null);

  // Position and fluid dynamics coordinates
  const mousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const prevMousePos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  
  // Spring/lerp follower positions for water cohesion
  const mainPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const trail1Pos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const trail2Pos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  // Fluid deformation states
  const velocityRef = useRef<{ x: number; y: number; speed: number }>({ x: 0, y: 0, speed: 0 });
  const currentAngle = useRef<number>(0);
  const currentStretch = useRef<number>(1);
  const animFrameId = useRef<number | null>(null);
  const rippleCountRef = useRef<number>(0);

  const addRipple = useCallback((x: number, y: number) => {
    const newId = ++rippleCountRef.current;
    setRipples((prev) => [
      ...prev.slice(-4), // Keep max 5 active ripples for silky 60fps performance
      { id: newId, x, y, size: 12, opacity: 0.75 }
    ]);
  }, []);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Contextual detection based on hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestInteractive = target.closest('[data-cursor]');
      if (closestInteractive) {
        const type = closestInteractive.getAttribute('data-cursor') as any;
        if (type === 'view' || type === 'drag' || type === 'link' || type === 'story') {
          setCursorType(type);
          return;
        }
      }

      // Check tags
      const isButton = !!target.closest('button, a, input, [role="button"]');
      const isImage = !!target.closest('img, [data-image]');
      const isCanvas = !!target.closest('canvas, [data-canvas]');

      if (isCanvas) {
        setCursorType('drag');
      } else if (isImage) {
        setCursorType('view');
      } else if (isButton) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      addRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Liquid Fluid Dynamics Render Loop
    const render = () => {
      // 1. Calculate instant mouse velocity
      const vx = mousePos.current.x - prevMousePos.current.x;
      const vy = mousePos.current.y - prevMousePos.current.y;
      prevMousePos.current = { ...mousePos.current };

      const instantSpeed = Math.sqrt(vx * vx + vy * vy);
      
      // Smooth lerp velocity
      velocityRef.current.speed += (instantSpeed - velocityRef.current.speed) * 0.15;

      // 2. Liquid stretching & surface tension
      // Higher speed stretches droplet along vector of movement
      const targetStretch = 1 + Math.min(velocityRef.current.speed * 0.016, 0.45);
      currentStretch.current += (targetStretch - currentStretch.current) * 0.18;

      if (instantSpeed > 1.2) {
        const targetAngle = Math.atan2(vy, vx);
        // Normalize angle transition
        let diff = targetAngle - currentAngle.current;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        currentAngle.current += diff * 0.22;
      }

      // 3. Fluid trailing mechanics (Viscous water flow)
      // Main water droplet follows with elastic spring
      const mainEase = 0.24;
      mainPos.current.x += (mousePos.current.x - mainPos.current.x) * mainEase;
      mainPos.current.y += (mousePos.current.y - mainPos.current.y) * mainEase;

      // Secondary micro-droplet follows with slight cohesive lag
      const trail1Ease = 0.14;
      trail1Pos.current.x += (mousePos.current.x - trail1Pos.current.x) * trail1Ease;
      trail1Pos.current.y += (mousePos.current.y - trail1Pos.current.y) * trail1Ease;

      // Tertiary micro-droplet follows with deeper lag
      const trail2Ease = 0.08;
      trail2Pos.current.x += (mousePos.current.x - trail2Pos.current.x) * trail2Ease;
      trail2Pos.current.y += (mousePos.current.y - trail2Pos.current.y) * trail2Ease;

      // 4. Update Main Water Droplet Transform with Liquid Elasticity
      if (mainDropRef.current) {
        const scaleX = currentStretch.current;
        const scaleY = 1 / Math.sqrt(scaleX); // Preserves water droplet volume
        const clickSquish = isClicking ? 0.85 : 1.0;

        mainDropRef.current.style.transform = `translate3d(${mainPos.current.x}px, ${mainPos.current.y}px, 0) translate(-50%, -50%) rotate(${currentAngle.current}rad) scale(${scaleX * clickSquish}, ${scaleY * clickSquish})`;
      }

      // 5. Update Trailing Micro Droplets (only visible during fluid movement)
      if (trailDrop1Ref.current) {
        const dist1 = Math.hypot(mousePos.current.x - trail1Pos.current.x, mousePos.current.y - trail1Pos.current.y);
        const trail1Scale = Math.min(Math.max((dist1 - 6) / 22, 0), 1);
        trailDrop1Ref.current.style.transform = `translate3d(${trail1Pos.current.x}px, ${trail1Pos.current.y}px, 0) translate(-50%, -50%) scale(${trail1Scale})`;
        trailDrop1Ref.current.style.opacity = `${Math.min(trail1Scale * 0.7, 0.7)}`;
      }

      if (trailDrop2Ref.current) {
        const dist2 = Math.hypot(mousePos.current.x - trail2Pos.current.x, mousePos.current.y - trail2Pos.current.y);
        const trail2Scale = Math.min(Math.max((dist2 - 12) / 30, 0), 0.75);
        trailDrop2Ref.current.style.transform = `translate3d(${trail2Pos.current.x}px, ${trail2Pos.current.y}px, 0) translate(-50%, -50%) scale(${trail2Scale})`;
        trailDrop2Ref.current.style.opacity = `${Math.min(trail2Scale * 0.5, 0.5)}`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible, isClicking, addRipple]);

  // Animate ripples expansion and fadeout
  useEffect(() => {
    if (ripples.length === 0) return;

    const interval = setInterval(() => {
      setRipples((prevRipples) =>
        prevRipples
          .map((r) => ({
            ...r,
            size: r.size + 3.2,
            opacity: r.opacity - 0.038
          }))
          .filter((r) => r.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [ripples.length]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Concentric Water Ripples (Water Drops falling onto liquid surface) */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed rounded-full pointer-events-none border border-white/60 dark:border-[#E5DAC8]/60 transition-none"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            transform: 'translate(-50%, -50%)',
            opacity: ripple.opacity,
            boxShadow: `0 0 12px rgba(110, 26, 41, ${ripple.opacity * 0.35}), inset 0 0 8px rgba(255, 255, 255, ${ripple.opacity * 0.6})`,
            backdropFilter: 'blur(1px)'
          }}
        />
      ))}

      {/* 2. Trailing Micro Water Bead #2 (Deep Viscous Droplet) */}
      <div
        ref={trailDrop2Ref}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none transition-none shadow-sm backdrop-blur-xs"
        style={{
          background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.9) 0%, rgba(229,218,200,0.5) 40%, rgba(148,75,87,0.6) 80%, rgba(110,26,41,0.85) 100%)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.7)',
          willChange: 'transform, opacity'
        }}
      />

      {/* 3. Trailing Micro Water Bead #1 (Cohesive Droplet) */}
      <div
        ref={trailDrop1Ref}
        className="fixed top-0 left-0 w-3.5 h-3.5 rounded-full pointer-events-none transition-none shadow-sm backdrop-blur-xs"
        style={{
          background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 30%, rgba(148,75,87,0.45) 75%, rgba(110,26,41,0.75) 100%)',
          boxShadow: '0 3px 8px rgba(110,26,41,0.18), inset 0 1px 3px rgba(255,255,255,0.85)',
          willChange: 'transform, opacity'
        }}
      />

      {/* 4. Main Organic Water Droplet with Refraction Meniscus & Caustic Glow */}
      <div
        ref={mainDropRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-out ${
          cursorType === 'story'
            ? 'w-22 h-22 rounded-[45%_55%_52%_48%/48%_52%_48%_52%]'
            : cursorType === 'view'
            ? 'w-18 h-18 rounded-[48%_52%_46%_54%/52%_46%_54%_48%]'
            : cursorType === 'drag'
            ? 'w-16 h-16 rounded-full'
            : cursorType === 'link'
            ? 'w-9 h-9 rounded-[46%_54%_50%_50%/50%_50%_54%_46%]'
            : 'w-7 h-7 rounded-[48%_52%_53%_47%/49%_51%_49%_51%]'
        }`}
        style={{
          // Realistic Liquid Water Droplet Shader Effect via layered gradients
          background:
            cursorType === 'story'
              ? 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 22%, rgba(148,75,87,0.85) 65%, rgba(110,26,41,0.95) 100%)'
              : cursorType === 'view'
              ? 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.25) 25%, rgba(148,75,87,0.75) 70%, rgba(110,26,41,0.9) 100%)'
              : cursorType === 'link'
              ? 'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 30%, rgba(148,75,87,0.25) 75%, rgba(110,26,41,0.55) 100%)'
              : 'radial-gradient(circle at 33% 28%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 26%, rgba(148,75,87,0.2) 65%, rgba(110,26,41,0.45) 100%)',
          backdropFilter: 'blur(6px) saturate(140%)',
          WebkitBackdropFilter: 'blur(6px) saturate(140%)',
          border:
            cursorType === 'story' || cursorType === 'view'
              ? '1.5px solid rgba(255, 255, 255, 0.55)'
              : '1px solid rgba(255, 255, 255, 0.45)',
          boxShadow: `
            0 8px 24px rgba(110, 26, 41, 0.22),
            0 2px 8px rgba(0, 0, 0, 0.12),
            inset 0 3px 6px rgba(255, 255, 255, 0.8),
            inset 0 -3px 8px rgba(110, 26, 41, 0.35)
          `,
          willChange: 'transform'
        }}
      >
        {/* Specular Liquid Glint / Light Refraction Bead at Top-Left */}
        <div 
          className="absolute top-1.5 left-2 w-2 h-1.5 rounded-full bg-white/90 pointer-events-none blur-[0.3px]"
          style={{ transform: 'rotate(-25deg)' }}
        />

        {/* Secondary Delicate Caustic Ring Inside the Water Droplet */}
        <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />

        {/* Dynamic Context Labels inside the Water Capsule */}
        {cursorType === 'story' && (
          <div className="flex flex-col items-center justify-center space-y-0.5 pointer-events-none drop-shadow-md">
            <span className="text-[9px] font-sans-modern tracking-[0.25em] uppercase font-bold text-white leading-none">
              STORY
            </span>
            <span className="text-[7px] font-mono tracking-widest text-[#E5DAC8] uppercase">
              INSPECT
            </span>
          </div>
        )}

        {cursorType === 'view' && (
          <span className="text-[9px] font-sans-modern tracking-[0.25em] uppercase font-bold text-white pointer-events-none drop-shadow-md">
            VIEW
          </span>
        )}

        {cursorType === 'drag' && (
          <span className="text-[9px] font-sans-modern tracking-[0.2em] uppercase font-bold text-white pointer-events-none drop-shadow-md">
            DRAG
          </span>
        )}
      </div>
    </div>
  );
};
