---
id: kim26l_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1483
---

# Improving Generalization in Speech Deepfake Detection via Orthogonality-Constrained Common-Specific Feature Decorrelation

**TL;DR** — Forcing a deepfake detector to split its features into domain-invariant "common" cues and attack-specific cues, kept uncorrelated via an orthogonality constraint, improves its robustness to unseen spoofing attacks.

## Problem

End-to-end speech deepfake detectors like RawNet2, RawGAT-ST, and AASIST often overfit to dataset-specific artifacts under standard empirical risk minimization, hurting generalization to unseen deepfake generation methods.

## Method

The authors propose an orthogonality-based feature decorrelation method for SSL-AASIST that learns domain-invariant "common" features capturing consistent authenticity cues alongside attack-specific "specialized" features, with an orthogonality regularization that minimizes correlation between the two so the model relies on consistent cues rather than domain-dependent shortcuts.

## Results

The method achieves lower equal error rates than the baseline across unseen corpora (21DF, ASV5, ITW), confirming improved robustness to unseen domains and spoofing attacks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More generalizable anti-spoofing and speech deepfake detection systems for deployment against previously unseen attack types.

## Related

- (link related pages by id as the wiki grows)
