import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {shopRefreshes, rerollGoldCost} from '../data/examples';
import {ChampionCard} from './ChampionCard';
import {GoldCounter} from './GoldCounter';
import {AnimatedCursor} from './UI';

export const TFTShop: React.FC<{frame?: number; gold?: number; level?: number; refreshEvery?: number; cursor?: boolean}> = ({frame: frameProp, gold = 50, level = 6, refreshEvery = 105, cursor = false}) => {
  const localFrame = useCurrentFrame();
  const frame = frameProp ?? localFrame;
  const {fps} = useVideoConfig();
  const refreshIndex = Math.max(0, Math.floor((frame - 38) / refreshEvery));
  const shop = shopRefreshes[refreshIndex % shopRefreshes.length];
  const cost = refreshIndex * rerollGoldCost;
  const pulse = interpolate((frame - 38) % refreshEvery, [0, 10, 22], [0.65, 1.25, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div className="shop-shell">
      <div className="shop-topline"><span className="shop-kicker">CỬA HÀNG TƯỚNG</span><span className="shop-round">VÒNG 4-2</span></div>
      <div className="shop-board">
        <div className="shop-ambient" />
        <div className="shop-cards">{shop.map((unit, i) => <ChampionCard key={`${refreshIndex}-${i}`} unit={unit} index={i + refreshIndex} frame={frame - refreshIndex * refreshEvery} highlighted={i === 2 && refreshIndex > 0} />)}</div>
        <div className="shop-controls">
          <div className="level-badge"><span className="level-caption">CẤP</span><strong>{level}</strong></div>
          <div className="reroll-button" style={{scale: pulse}}><span className="reroll-icon">⟳</span><span>ĐỔI CỬA HÀNG</span><b>−{rerollGoldCost}</b></div>
          <GoldCounter from={gold} to={Math.max(0, gold - cost)} startFrame={38} duration={10} compact />
        </div>
      </div>
      {cursor && <AnimatedCursor frame={frame} fps={fps} />}
    </div>
  );
};
