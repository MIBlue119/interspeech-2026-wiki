---
id: pang26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2044
---

# USDnet++: Distilling Signal Processing Based Dereverberation for Unsupervised Neural Speech Dereverberation

**TL;DR** — Using classical signal-processing dereverberation output as weak supervision improves an unsupervised neural dereverberation model (USDnet) trained only on unlabeled reverberant speech.

## Problem

USDnet can learn unsupervised single-speaker speech dereverberation from unlabeled reverberant speech alone, but its training could benefit from additional guidance without requiring labeled clean-speech data.

## Method

USDnet++ extends USDnet by using weighted prediction error (WPE) and convolutional beamforming (WPD) to derive signal-processing-based dereverberation results, which typically have higher target-speech SNR, and leverages these as weak supervision to improve USDnet's training.

## Results

Evaluation on the WSJ0CAM-DEREVERB dataset demonstrates the effectiveness of USDnet++ over the base USDnet approach.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unsupervised speech dereverberation for scenarios lacking paired clean/reverberant training data, such as archival or field recordings.

## Related

- (link related pages by id as the wiki grows)
