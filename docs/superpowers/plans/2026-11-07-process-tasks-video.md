# Process Tasks Using Servers Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this approved storyboard inline.

**Goal:** A Vietnamese Remotion explainer of LeetCode 1882 with animated, correct scheduling.

**Architecture:** Add a separate composition to the existing project. A tested two-heap scheduler produces assignment traces used by deterministic visualizations; scene timing and Vietnamese captions live in editable data.

**Tech Stack:** React, TypeScript, Remotion 4.0.536, local Be Vietnam Pro, system Chromium.

**Spec:** The user's approved eight-part storyboard in this conversation; 340 seconds, 1920×1080, 30 fps. Existing TFT composition is retained.

## Global Constraints

- Vietnamese explanations and captions; independently editable scenes.
- Correct FIFO tasks, weight/index priority, and simultaneous-release behavior.
- 64-bit-safe timing illustrated; JavaScript number remains exact for these constraints.
- No external media or credential requirements; captions replace unavailable narration.

## Review Focus

- Simultaneous completions release every eligible server before selection.
- Delayed tasks retain their insertion order and can start at the same time.
- Equal weights select the smaller index.
- Accumulated time exceeds signed 32-bit safely.
- Scene boundaries and long Vietnamese captions remain readable.

### Task 1: Scheduling model

- [x] Create scheduler tests: both official examples, simultaneous releases, ties, queued arrivals, long time, and comparison against a naive oracle.
- [x] Observe failure, implement a binary min-heap and assignment trace, rerun tests.

### Task 2: Video composition

- [x] Create editable Vietnamese chapters/captions and reusable task/server/heap/timeline components.
- [x] Add eight scenes at 0/25/65/120/145/195/255/310 seconds; total 340 seconds.
- [x] Register ProcessTasks1882 alongside TFTRollExplainer; add preview/render scripts and documentation.

### Task 3: Verify and export

- [x] Run scheduler tests, existing data checks, and TypeScript check.
- [x] Start Studio, inspect representative frames and transitions; correct any visual issues.
- [x] Render H.264 MP4 and verify duration, dimensions, frame count and decoding.

## Execution record

User explicitly requested implementation of the storyboard; execute without a second approval checkpoint. Use the existing isolated cloud checkout on branch work. No network service or TTS is configured, so provide complete captions and a separate narration script. The desktop capability is unavailable in this executor; validate Studio HTTP and actual Chromium renders.

Final review: independent reviewer found two important visual timing bugs (last assignment rollback, T3 caption lead). Both reproduced by failing regression assertions, fixed in shared timing helpers, and verified by passing tests and rendered frames at 24.5/115.9/246 seconds. No deferred findings. Full export completed.

Completion evidence: render exited 0, H.264 / 1920×1080 / 30 fps / 10,200 frames / 340.000 seconds / 9,860,625 bytes; full ffmpeg decode exited 0 without errors; Studio HTTP 200. Output: remotion-roll-explainer/out/process-tasks-1882-vi.mp4.
