import React from 'react';
import {Composition} from 'remotion';
import {TFTRollExplainer} from './compositions/TFTRollExplainer';
import {compositionFps, totalDurationInFrames} from './data/timeline';
import './styles.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';

export const RemotionRoot: React.FC = () => <Composition id="TFTRollExplainer" component={TFTRollExplainer} durationInFrames={totalDurationInFrames} fps={compositionFps} width={1920} height={1080} />;
