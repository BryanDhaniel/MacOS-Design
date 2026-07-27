'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { dockTools } from '@/components/macos-design/data';
import type { ToolId } from '@/components/macos-design/types';

interface ToolDockProps {
  openTools: ToolId[];
  onToggle: (tool: ToolId) => void;
  className?: string;
}

interface DockConfig {
  baseIconSize: number;
  maxScale: number;
  effectWidth: number;
}

const minScale = 1;

function getResponsiveConfig(): DockConfig {
  if (typeof window === 'undefined') {
    return { baseIconSize: 64, maxScale: 1.6, effectWidth: 240 };
  }

  const smallerDimension = Math.min(window.innerWidth, window.innerHeight);

  if (smallerDimension < 480) {
    return { baseIconSize: Math.max(40, smallerDimension * 0.08), maxScale: 1.4, effectWidth: smallerDimension * 0.4 };
  }

  if (smallerDimension < 768) {
    return { baseIconSize: Math.max(48, smallerDimension * 0.07), maxScale: 1.5, effectWidth: smallerDimension * 0.35 };
  }

  if (smallerDimension < 1024) {
    return { baseIconSize: Math.max(56, smallerDimension * 0.06), maxScale: 1.6, effectWidth: smallerDimension * 0.3 };
  }

  return { baseIconSize: Math.max(64, Math.min(80, smallerDimension * 0.05)), maxScale: 1.8, effectWidth: 300 };
}

export function ToolDock({ openTools, onToggle, className = '' }: ToolDockProps) {
  const [config, setConfig] = useState<DockConfig>({ baseIconSize: 64, maxScale: 1.6, effectWidth: 240 });
  const [scales, setScales] = useState<number[]>(() => dockTools.map(() => minScale));
  const [positions, setPositions] = useState<number[]>(() => dockTools.map((_, index) => 32 + index * 69.12));
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mouseXRef = useRef<number | null>(null);
  const scalesRef = useRef(scales);
  const positionsRef = useRef(positions);
  const animationFrameRef = useRef<number | null>(null);
  const animateRef = useRef<() => void>(() => {});
  const lastMouseMoveTime = useRef(0);

  const baseSpacing = Math.max(4, config.baseIconSize * 0.08);
  const padding = Math.max(8, config.baseIconSize * 0.12);

  const calculatePositions = useCallback((nextScales: number[]) => {
    let currentX = 0;

    return nextScales.map((scale) => {
      const scaledWidth = config.baseIconSize * scale;
      const centerX = currentX + scaledWidth / 2;
      currentX += scaledWidth + baseSpacing;
      return centerX;
    });
  }, [baseSpacing, config.baseIconSize]);

  const calculateTargetScales = useCallback((mouseX: number | null) => {
    if (mouseX === null) return dockTools.map(() => minScale);

    const minX = mouseX - config.effectWidth / 2;
    const maxX = mouseX + config.effectWidth / 2;

    return dockTools.map((_, index) => {
      const iconCenter = index * (config.baseIconSize + baseSpacing) + config.baseIconSize / 2;
      if (iconCenter < minX || iconCenter > maxX) return minScale;

      const theta = ((iconCenter - minX) / config.effectWidth) * 2 * Math.PI;
      const cosineWave = (1 - Math.cos(Math.min(Math.max(theta, 0), 2 * Math.PI))) / 2;
      return minScale + cosineWave * (config.maxScale - minScale);
    });
  }, [baseSpacing, config]);

  const animate = useCallback(() => {
    const targetScales = calculateTargetScales(mouseXRef.current);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseXRef.current === null ? 0.12 : 0.2;
    const nextScales = scalesRef.current.map((scale, index) => scale + (targetScales[index] - scale) * lerpFactor);
    const nextPositions = positionsRef.current.map((position, index) => position + (targetPositions[index] - position) * lerpFactor);
    const needsAnotherFrame = nextScales.some((scale, index) => Math.abs(scale - targetScales[index]) > 0.002)
      || nextPositions.some((position, index) => Math.abs(position - targetPositions[index]) > 0.1);

    scalesRef.current = nextScales;
    positionsRef.current = nextPositions;
    setScales(nextScales);
    setPositions(nextPositions);

    animationFrameRef.current = needsAnotherFrame
      ? requestAnimationFrame(() => animateRef.current())
      : null;
  }, [calculatePositions, calculateTargetScales]);

  useEffect(() => {
    animateRef.current = animate;
  }, [animate]);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    const updateConfig = () => {
      const nextConfig = getResponsiveConfig();
      const restingScales = dockTools.map(() => minScale);
      const spacing = Math.max(4, nextConfig.baseIconSize * 0.08);
      const restingPositions = restingScales.map((_, index) => nextConfig.baseIconSize / 2 + index * (nextConfig.baseIconSize + spacing));

      mouseXRef.current = null;
      scalesRef.current = restingScales;
      positionsRef.current = restingPositions;
      setConfig(nextConfig);
      setScales(restingScales);
      setPositions(restingPositions);
    };

    updateConfig();
    window.addEventListener('resize', updateConfig);
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastMouseMoveTime.current < 16 || !dockRef.current) return;

    lastMouseMoveTime.current = now;
    mouseXRef.current = event.clientX - dockRef.current.getBoundingClientRect().left - padding;
    startAnimation();
  };

  const handleMouseLeave = () => {
    mouseXRef.current = null;
    startAnimation();
  };

  const handleAppClick = (appId: ToolId, index: number) => {
    const icon = iconRefs.current[index];
    if (icon) {
      const bounceHeight = scalesRef.current[index] > 1.3 ? config.baseIconSize * 0.2 : config.baseIconSize * 0.15;
      icon.animate(
        [{ transform: 'translateY(0)' }, { transform: `translateY(-${bounceHeight}px)` }, { transform: 'translateY(0)' }],
        { duration: 400, easing: 'cubic-bezier(.2,.85,.35,1)', iterations: 1 },
      );
    }
    onToggle(appId);
  };

  const contentWidth = positions.length > 0
    ? Math.max(...positions.map((position, index) => position + (config.baseIconSize * scales[index]) / 2))
    : dockTools.length * (config.baseIconSize + baseSpacing) - baseSpacing;

  return (
    <div className="fixed bottom-3 left-1/2 z-20 flex -translate-x-1/2">
      <div
        ref={dockRef}
        aria-label="Application dock"
        className={`backdrop-blur-md ${className}`}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          width: `${contentWidth + padding * 2}px`,
          padding: `${padding}px`,
          background: 'rgba(45, 45, 45, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: `${Math.max(12, config.baseIconSize * 0.4)}px`,
          boxShadow: `0 ${Math.max(4, config.baseIconSize * 0.1)}px ${Math.max(16, config.baseIconSize * 0.4)}px rgba(0, 0, 0, 0.4), 0 ${Math.max(2, config.baseIconSize * 0.05)}px ${Math.max(8, config.baseIconSize * 0.2)}px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
        }}
      >
        <div className="relative" style={{ height: `${config.baseIconSize}px`, width: '100%' }}>
          {dockTools.map((app, index) => {
            const scale = scales[index] ?? minScale;
            const position = positions[index] ?? 0;
            const scaledSize = config.baseIconSize * scale;

            return (
              <button
                key={app.id}
                ref={(element) => { iconRefs.current[index] = element; }}
                type="button"
                aria-label={app.label}
                aria-pressed={openTools.includes(app.id)}
                className="group absolute flex cursor-pointer items-end justify-center border-0 bg-transparent p-0"
                onClick={() => handleAppClick(app.id, index)}
                style={{
                  left: `${position - scaledSize / 2}px`,
                  bottom: 0,
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  transformOrigin: 'bottom center',
                  zIndex: Math.round(scale * 10),
                }}
              >
                <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {app.label}
                </span>
                <img
                  src={app.icon}
                  alt=""
                  draggable={false}
                  className="pointer-events-none select-none object-contain"
                  style={{
                    width: `${scaledSize}px`,
                    height: `${scaledSize}px`,
                    filter: `drop-shadow(0 ${scale > 1.2 ? Math.max(2, config.baseIconSize * 0.05) : Math.max(1, config.baseIconSize * 0.03)}px ${scale > 1.2 ? Math.max(4, config.baseIconSize * 0.1) : Math.max(2, config.baseIconSize * 0.06)}px rgba(0, 0, 0, ${0.2 + (scale - 1) * 0.15}))`,
                  }}
                />
                {openTools.includes(app.id) && (
                  <span
                    aria-hidden="true"
                    className="absolute rounded-full bg-white/80 shadow-[0_0_4px_rgba(0,0,0,.3)]"
                    style={{
                      bottom: `${Math.max(-4, -config.baseIconSize * 0.08)}px`,
                      width: `${Math.max(4, config.baseIconSize * 0.08)}px`,
                      height: `${Math.max(4, config.baseIconSize * 0.08)}px`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
