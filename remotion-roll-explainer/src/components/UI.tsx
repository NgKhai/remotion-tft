import React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const AnimatedCursor: React.FC<{frame?: number; fps?: number}> = ({frame: frameProp, fps: fpsProp}) => {
  const current = useCurrentFrame();
  const {fps: configFps} = useVideoConfig();
  const frame = frameProp ?? current;
  const fps = fpsProp ?? configFps;
  const x = interpolate(frame, [0, 32, 46, 62], [890, 1120, 1202, 1160], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.25, 0.1, 0.25, 1)});
  const y = interpolate(frame, [0, 32, 46, 62], [750, 700, 866, 820], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const click = frame > 45 && frame < 53;
  return <div className="cursor" style={{left: x, top: y, scale: click ? 0.82 : 1}}><svg width="42" height="54" viewBox="0 0 42 54"><path d="M5 3 L5 41 L15 31 L22 49 L29 46 L22 28 L38 27 Z" fill="#fff" stroke="#11182b" strokeWidth="3" strokeLinejoin="round"/><path d="M8 8 L8 33 L15 26 L22 42" fill="none" stroke="#dfe8ff" strokeWidth="2"/></svg><span className="cursor-glint">✦</span><span className="cursor-fps">{fps > 0 ? '' : ''}</span></div>;
};

export const SectionHeading: React.FC<{eyebrow: string; title: string; detail?: string; index?: number}> = ({eyebrow, title, detail, index}) => {
  const frame = useCurrentFrame();
  return <div className="section-heading" style={{opacity: interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'}), translate: `0 ${interpolate(frame, [0, 22], [24, 0], {extrapolateRight: 'clamp'})}px`}}>
    <div className="section-eyebrow">{index ? <span className="section-number">0{index}</span> : null}<span>{eyebrow}</span></div>
    <h2>{title}</h2>{detail && <p>{detail}</p>}
  </div>;
};

export const Tag: React.FC<{children: React.ReactNode; accent?: string}> = ({children, accent = '#F1C75B'}) => <div className="tag" style={{'--tag-accent': accent} as React.CSSProperties}><span />{children}</div>;
