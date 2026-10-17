import assert from 'node:assert/strict';
import {oddsRowsSumTo100, level7FourCostFiveSlots, level8FourCostFiveSlots} from '../src/data/shopOdds';
import {interestTable, poolCopies, rerollGoldCost} from '../src/data/examples';
import {captionCues} from '../src/data/narration';
import {sceneDurationsSeconds, totalDurationInFrames, totalDurationSeconds} from '../src/data/timeline';

assert.equal(oddsRowsSumTo100, true, 'Every level probability row must sum to 100%.');
assert.equal(rerollGoldCost, 2, 'A shop reroll costs 2 gold in this reference explainer.');
assert.equal(poolCopies, 10, 'The shared pool animation uses a 10-copy illustration.');
assert.deepEqual(interestTable.map(({gold, interest}) => [gold, interest]), [[10, 1], [20, 2], [30, 3], [40, 4], [50, 5]]);
assert.ok(Math.abs(level7FourCostFiveSlots - 0.40951) < 1e-10, 'Level 7 probability calculation must match 40.951%.');
assert.ok(Math.abs(level8FourCostFiveSlots - 0.83193) < 1e-10, 'Level 8 probability calculation must match 83.193%.');
assert.equal(totalDurationSeconds, 120, 'The composition must be exactly 120 seconds.');
assert.equal(totalDurationInFrames, 3600, 'The composition must be exactly 3600 frames at 30 fps.');
assert.ok(Object.values(sceneDurationsSeconds).every((seconds) => seconds > 0), 'Every scene needs a positive duration.');
assert.ok(captionCues.every((cue, i) => cue.start < cue.end && cue.start >= 0 && cue.end <= 120 && (i === 0 || cue.start >= captionCues[i - 1].start)), 'Caption cues must be ordered and stay inside the video.');

console.log('Dữ liệu hợp lệ: tỷ lệ mỗi cấp = 100%, công thức đúng, captions trong 120 giây, độ dài = 3.600 khung hình.');
