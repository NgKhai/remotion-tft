import React from 'react';
import {Series, useVideoConfig} from 'remotion';
import {Subtitle} from '../components/Subtitle';
import {sceneDurationsSeconds} from '../data/timeline';
import {
  EconomyScene,
  IntroScene,
  ProbabilityExampleScene,
  SharedPoolScene,
  ShopMechanicScene,
  ShopOddsScene,
  StrategyScene,
  SummaryScene,
} from '../scenes/Scenes';

export const TFTRollExplainer: React.FC = () => {
  const {fps} = useVideoConfig();
  return <>
    <Series>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.intro * fps} premountFor={fps}><IntroScene /></Series.Sequence>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.shopMechanic * fps} premountFor={fps}><ShopMechanicScene /></Series.Sequence>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.shopOdds * fps} premountFor={fps}><ShopOddsScene /></Series.Sequence>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.sharedPool * fps} premountFor={fps}><SharedPoolScene /></Series.Sequence>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.economy * fps} premountFor={fps}><EconomyScene /></Series.Sequence>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.strategy * fps} premountFor={fps}><StrategyScene /></Series.Sequence>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.probability * fps} premountFor={fps}><ProbabilityExampleScene /></Series.Sequence>
      <Series.Sequence durationInFrames={sceneDurationsSeconds.summary * fps} premountFor={fps}><SummaryScene /></Series.Sequence>
    </Series>
    <Subtitle />
  </>;
};
