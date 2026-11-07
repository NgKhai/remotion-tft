import React from 'react';
import {Composition} from 'remotion';
import {TFTRollExplainer} from './compositions/TFTRollExplainer';
import {compositionFps, totalDurationInFrames} from './data/timeline';
import {ProcessTasks1882} from './process-tasks/ProcessTasks1882';
import './styles.css';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';
import '@fontsource/be-vietnam-pro/800.css';

export const RemotionRoot: React.FC = () => <>
  <Composition id="TFTRollExplainer" component={TFTRollExplainer} durationInFrames={totalDurationInFrames} fps={compositionFps} width={1920} height={1080} />
  <Composition id="ProcessTasks1882" component={ProcessTasks1882} durationInFrames={10200} fps={30} width={1920} height={1080} />
</>;
