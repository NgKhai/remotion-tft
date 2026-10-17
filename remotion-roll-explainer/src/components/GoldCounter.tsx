import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const GoldCounter: React.FC<{from: number; to?: number; startFrame?: number; duration?: number; compact?: boolean}> = ({from, to = from, startFrame = 0, duration = 18, compact = false}) => {
  const frame = useCurrentFrame();
  const gold = Math.round(interpolate(frame, [startFrame, startFrame + duration], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return <div className={`gold-counter ${compact ? 'gold-counter--compact' : ''}`}><span className="coin">◉</span><span className="gold-value">{gold}</span><span className="gold-label">VÀNG</span></div>;
};
