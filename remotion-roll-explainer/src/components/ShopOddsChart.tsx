import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {OddsLevel, shopOdds} from '../data/shopOdds';

export const ShopOddsChart: React.FC<{level: OddsLevel; compact?: boolean; focusCost?: number; frame?: number}> = ({level, compact = false, focusCost, frame: frameProp}) => {
  const localFrame = useCurrentFrame();
  const frame = frameProp ?? localFrame;
  const values = shopOdds.byLevel[level];
  const colors = shopOdds.colors;
  let offset = 0;
  return <div className={`odds-chart ${compact ? 'odds-chart--compact' : ''}`}>
    <div className="odds-chart-head"><span>TỶ LỆ THEO CẤP {level}</span><span>MỖI Ô CỬA HÀNG</span></div>
    <div className="odds-stacked-bar">{values.map((value, i) => {
      const start = offset;
      offset += value;
      const width = interpolate(frame, [5, 38], [0, value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const active = focusCost === i + 1;
      return <div key={i} className={`odds-segment ${active ? 'odds-segment--active' : ''}`} style={{left: `${start}%`, width: `${width}%`, backgroundColor: colors[i], opacity: active ? 1 : focusCost ? 0.52 : 0.86}}><span>{value ? `${value}%` : ''}</span></div>;
    })}</div>
    <div className="odds-legend">{values.map((value, i) => <div key={i} className={`odds-key ${focusCost === i + 1 ? 'odds-key--active' : ''}`}><i style={{backgroundColor: colors[i]}} /><b>{i + 1} vàng</b><strong>{value}%</strong></div>)}</div>
  </div>;
};
