import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {captionCues} from '../data/narration';

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const cue = captionCues.find((item) => seconds >= item.start && seconds < item.end);
  const opacity = cue ? interpolate(seconds, [cue.start, cue.start + 0.18, cue.end - 0.18, cue.end], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return cue ? <div className="subtitle" style={{opacity}}><span className="subtitle-marker" />{cue.text}</div> : null;
};
