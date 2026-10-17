import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {poolCopies} from '../data/examples';

export const ChampionPool: React.FC = () => {
  const frame = useCurrentFrame();
  const purchased = Math.min(3, Math.max(0, Math.floor((frame - 105) / 42)));
  const remain = poolCopies - purchased;
  const players = ['BẠN', 'ĐỐI THỦ 1', 'ĐỐI THỦ 2', 'ĐỐI THỦ 3', 'ĐỐI THỦ 4', 'ĐỐI THỦ 5', 'ĐỐI THỦ 6', 'ĐỐI THỦ 7'];
  const cx = 540, cy = 390, rx = 385, ry = 280;
  return <div className="pool-visual">
    <div className="pool-orbit pool-orbit--one" /><div className="pool-orbit pool-orbit--two" />
    <div className="pool-center"><div className="pool-core">{Array.from({length: 10}).map((_, i) => <span key={i} className={`pool-token ${i >= remain ? 'pool-token--used' : ''}`} style={{translate: `${(i % 5) * 3}px ${Math.floor(i / 5) * 2}px`}}>✦</span>)}</div><b>BỂ TƯỚNG CHUNG</b><small>TƯỚNG A · 4 VÀNG · VÍ DỤ</small></div>
    {players.map((name, i) => {
      const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
      const own = i === 0;
      const hasCopies = !own && i <= purchased;
      return <div key={name} className={`pool-player ${own ? 'pool-player--you' : ''} ${hasCopies ? 'pool-player--has' : ''}`} style={{left: cx + Math.cos(angle) * rx - 63, top: cy + Math.sin(angle) * ry - 39}}><div className="pool-player-emblem">{own ? '♙' : hasCopies ? '✦' : '◇'}</div><span>{name}</span>{hasCopies && <b>{i === 1 ? '×1' : i === 2 ? '×1' : '×1'}</b>}</div>;
    })}
    <div className="pool-counter"><div className="pool-counter-top">CÒN TRONG BỂ</div><div className="pool-counter-num">{remain}<span> / {poolCopies}</span></div><div className="pool-counter-line"><i style={{width: `${interpolate(remain, [0, poolCopies], [0, 100])}%`}} /></div><small>ĐỐI THỦ ĐÃ SỞ HỮU: {purchased}</small></div>
    <div className="pool-fly-label" style={{opacity: interpolate(frame, [90, 105, 220, 245], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>BẢN SAO ĐƯỢC MUA → BỂ TƯỚNG GIẢM</div>
  </div>;
};
