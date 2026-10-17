export const sceneDurationsSeconds = {
  intro: 9,
  shopMechanic: 15,
  shopOdds: 19,
  sharedPool: 17,
  economy: 16,
  strategy: 20,
  probability: 16,
  summary: 8,
} as const;

export const totalDurationSeconds = Object.values(sceneDurationsSeconds).reduce((sum, seconds) => sum + seconds, 0);
export const compositionFps = 30;
export const totalDurationInFrames = totalDurationSeconds * compositionFps;
