/**
 * Editable reference snapshot supplied with the brief.
 * These values have NOT been independently verified against a live Set 18 patch.
 * Confirm them in the intended client patch before publishing gameplay advice.
 */
export const shopOdds = {
  source: 'Snapshot tham khảo Set 18 (theo brief; chưa xác nhận patch hiện hành)',
  byLevel: {
    5: [45, 33, 20, 2, 0],
    6: [30, 40, 25, 5, 0],
    7: [16, 30, 43, 10, 1],
    8: [15, 20, 32, 30, 3],
    9: [10, 17, 25, 33, 15],
  },
  costs: [1, 2, 3, 4, 5],
  colors: ['#8C99B1', '#4DD596', '#51A6FF', '#BF8BFF', '#F1C75B'],
} as const;

export type OddsLevel = keyof typeof shopOdds.byLevel;

export const probabilityAtLeastOne = (p: number, slots = 5) => 1 - (1 - p) ** slots;

export const oddsRowsSumTo100 = Object.values(shopOdds.byLevel).every(
  (row) => (row as readonly number[]).reduce((sum, value) => sum + value, 0) === 100,
);

export const level7FourCostFiveSlots = probabilityAtLeastOne(0.1);
export const level8FourCostFiveSlots = probabilityAtLeastOne(0.3);
