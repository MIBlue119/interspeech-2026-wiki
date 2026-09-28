---
id: ding26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-258
---

# ImKWS: Test-Time Adaptation for Keyword Spotting with Class Imbalance

**TL;DR** — ImKWS splits entropy minimization into separate reward and penalty branches with a cross-transformation consistency term, letting keyword spotters adapt at test time to noisy audio without collapsing toward the dominant background class.

## Problem

Keyword spotting accuracy drops under environmental noise, and test-time adaptation using only unlabeled audio is attractive but standard entropy minimization becomes overconfident and biased toward the frequent background-sound class under the severe class imbalance between rare keywords and common background sounds.

## Method

ImKWS splits the entropy adaptation process into a reward branch and a penalty branch with separately tuned update strengths, and enforces consistency across multiple audio transformations to keep model updates stable.

## Results

On the Google Speech Commands dataset, ImKWS achieves reliable adaptation in realistic class-imbalanced noisy scenarios compared to standard entropy-minimization test-time adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for on-device voice assistants that must keep working accurately as ambient noise conditions shift after deployment, without needing labeled adaptation data.

## Related

- (link related pages by id as the wiki grows)
