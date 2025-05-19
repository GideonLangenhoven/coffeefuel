// --- File: src/Components/SunriseAnimation.js ---
import React, { useEffect, useRef, useState } from 'react';
import './SunriseAnimation.css';

const RadialGradientBanner = ({
  title,
  children,
  isAnimating, // This prop is not currently used to control the animation
  renderContent = true
}) => {
  const gradientRef = useRef(null);

  const [actualSolarYellow, setActualSolarYellow] = useState("#FFC107"); // Default: rgb(255, 193, 7)

  const softYellowGlow = "#FFD54F";
  const deepYellowGlow = "#FFB300";
  const outerBackgroundColor = "#000000";

  // --- Base Animation Parameters ---
  const originalMaxSunRadiusPercent = 70;
  const MAX_SUN_RADIUS_PERCENT = originalMaxSunRadiusPercent * 0.7; // 49%

  const MIN_SIZE_FACTOR = 0.4;

  const basePulsationSpeed = 0.03;
  const speedFactor = 4;
  const pulsationSpeed = basePulsationSpeed / speedFactor; // 0.0075 for main grow/shrink

  const animationInterval = 20; // ms

  // --- Parameters for Pulsing at Max (Adjusted for subtlety and speed) ---
  const PULSES_AT_MAX_COUNT = 2; // Changed from 3 to 2
  // Reduced amplitude for more subtle pulses (e.g., 2.5% size variation)
  const PULSE_AMPLITUDE_AT_MAX = 0.025; // Changed from 0.07
  // Slowed down the pulse speed significantly
  const FAST_PULSE_SPEED_MULTIPLIER = 7; // Changed from 20
  const fastPulseSpeed = pulsationSpeed * FAST_PULSE_SPEED_MULTIPLIER; // New speed: 0.0075 * 7 = 0.0525

  // --- Refs for Animation State Machine ---
  const PHASES = { GROWING: 'GROWING', PULSING_AT_MAX: 'PULSING_AT_MAX', SHRINKING: 'SHRINKING' };
  const animationPhaseRef = useRef(PHASES.GROWING);
  const mainCycleProgressRef = useRef(0);
  const pulseCycleProgressRef = useRef(0);
  const pulsesCompletedRef = useRef(0);

  useEffect(() => {
    if (gradientRef.current) {
      const yellowFromCSS = getComputedStyle(gradientRef.current)
        .getPropertyValue('--solpower-yellow')
        .trim();
      if (yellowFromCSS) {
        setActualSolarYellow(yellowFromCSS);
      }
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gradientRef.current) return;

      let currentBaseRadius;
      const currentPhase = animationPhaseRef.current;
      const effectiveMaxRadius = MAX_SUN_RADIUS_PERCENT;
      const effectiveMinRadius = effectiveMaxRadius * MIN_SIZE_FACTOR;

      if (currentPhase === PHASES.GROWING) {
        mainCycleProgressRef.current += pulsationSpeed;
        let scale = Math.sin(mainCycleProgressRef.current);

        if (mainCycleProgressRef.current >= Math.PI / 2) {
          scale = 1;
          mainCycleProgressRef.current = Math.PI / 2;
          animationPhaseRef.current = PHASES.PULSING_AT_MAX;
          pulsesCompletedRef.current = 0;
          pulseCycleProgressRef.current = 0;
        }
        currentBaseRadius = effectiveMinRadius + (effectiveMaxRadius - effectiveMinRadius) * scale;
      } else if (currentPhase === PHASES.PULSING_AT_MAX) {
        pulseCycleProgressRef.current += fastPulseSpeed;
        
        const pulseOscillationScale = (Math.sin(pulseCycleProgressRef.current) + 1) / 2;
        currentBaseRadius = effectiveMaxRadius * ((1 - PULSE_AMPLITUDE_AT_MAX) + PULSE_AMPLITUDE_AT_MAX * pulseOscillationScale);

        if (pulseCycleProgressRef.current >= 2 * Math.PI) {
          pulseCycleProgressRef.current -= 2 * Math.PI;
          pulsesCompletedRef.current++;
          if (pulsesCompletedRef.current >= PULSES_AT_MAX_COUNT) {
            animationPhaseRef.current = PHASES.SHRINKING;
          }
        }
      } else if (currentPhase === PHASES.SHRINKING) {
        mainCycleProgressRef.current += pulsationSpeed;
        let scale = Math.sin(mainCycleProgressRef.current);

        if (mainCycleProgressRef.current >= Math.PI) {
          scale = 0;
          mainCycleProgressRef.current = 0;
          animationPhaseRef.current = PHASES.GROWING;
        }
        currentBaseRadius = effectiveMinRadius + (effectiveMaxRadius - effectiveMinRadius) * scale;
      } else {
        currentBaseRadius = effectiveMinRadius;
      }
      
      currentBaseRadius = Math.max(0, currentBaseRadius || effectiveMinRadius);

      const stop1_actual_yellow_end = currentBaseRadius * 0.25;
      const stop2_soft_yellow_end = currentBaseRadius * 0.55;
      const stop3_deep_yellow_end = currentBaseRadius * 0.85;
      const stop4_fade_to_outer_end = currentBaseRadius * 1.0;

      gradientRef.current.style.background = `radial-gradient(circle at center, ${actualSolarYellow} ${stop1_actual_yellow_end}%, ${softYellowGlow} ${stop2_soft_yellow_end}%, ${deepYellowGlow} ${stop3_deep_yellow_end}%, ${outerBackgroundColor} ${stop4_fade_to_outer_end}%)`;
      
    }, animationInterval);

    return () => clearInterval(intervalId);
  }, [
    actualSolarYellow, softYellowGlow, deepYellowGlow, outerBackgroundColor,
    pulsationSpeed, animationInterval, MAX_SUN_RADIUS_PERCENT, MIN_SIZE_FACTOR,
    PHASES, PULSE_AMPLITUDE_AT_MAX, fastPulseSpeed, PULSES_AT_MAX_COUNT
  ]);

  return (
    <div className="radial-gradient-banner">
      <div ref={gradientRef} className="gradient-background-effect" />
      {renderContent && (
        <div className="banner-content-overlay">
          {title && <h1>{title}</h1>}
          {children && <div className="banner-children-content">{children}</div>}
        </div>
      )}
    </div>
  );
};

const SunriseAnimation = RadialGradientBanner;
export default SunriseAnimation;