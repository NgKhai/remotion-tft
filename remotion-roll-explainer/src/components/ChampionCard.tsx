import React from 'react';
import {Easing, interpolate, spring, useVideoConfig} from 'remotion';
import {shopOdds} from '../data/shopOdds';

const champions = [
  {glyph: '✦', orb: '#80E9D0', aura: '#197D88'},
  {glyph: '⌁', orb: '#FFA56D', aura: '#A44442'},
  {glyph: '◇', orb: '#C7A4FF', aura: '#59478F'},
  {glyph: '✧', orb: '#FFE084', aura: '#92733A'},
  {glyph: '❖', orb: '#8EC5FF', aura: '#3C628A'},
  {glyph: '☼', orb: '#FF9AC7', aura: '#8B4772'},
];

export type CardUnit = {name: string; cost: number};

export const ChampionCard: React.FC<{
  unit: CardUnit;
  index?: number;
  frame?: number;
  highlighted?: boolean;
  dimmed?: boolean;
  stars?: number;
}> = ({unit, index = 0, frame = 30, highlighted = false, dimmed = false, stars = 0}) => {
  const {fps} = useVideoConfig();
  const portrait = champions[index % champions.length];
  const entrance = spring({frame: frame - index * 4, fps, config: {damping: 16, stiffness: 105}});
  const reveal = interpolate(frame - 18 - index * 4, [0, 13], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1)});
  const costColor = shopOdds.colors[unit.cost - 1];
  return (
    <div className={`champion-card ${highlighted ? 'champion-card--highlighted' : ''}`} style={{
      borderColor: costColor,
      opacity: dimmed ? 0.32 : 1,
      scale: entrance,
      rotate: `${interpolate(1 - reveal, [0, 1], [0, index % 2 ? 7 : -7])}deg`,
      filter: `brightness(${0.58 + reveal * 0.42})`,
    }}>
      <div className="card-foil" style={{opacity: reveal * 0.5}} />
      <div className="portrait" style={{background: `radial-gradient(circle at 48% 46%, ${portrait.orb} 0 13%, ${portrait.aura} 34%, #10172c 78%)`}}>
        <div className="portrait-ring" />
        <div className="portrait-sigil" style={{color: portrait.orb}}>{portrait.glyph}</div>
        <div className="portrait-sparks">✦　✧　✦</div>
      </div>
      <div className="card-name">{unit.name}</div>
      <div className="card-cost-row"><span className="cost-gem" style={{backgroundColor: costColor}} />{unit.cost} VÀNG</div>
      {stars > 0 && <div className="star-row">{'★'.repeat(stars)}</div>}
      <div className="card-rarity" style={{backgroundColor: costColor}} />
    </div>
  );
};
