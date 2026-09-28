---
id: moon26b_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2989
pdf: https://www.isca-archive.org/interspeech_2026/moon26b_interspeech.pdf
---

# When Does Quality-Aware Multimodal Fusion Matter? A Leakage-Safe Diagnostic for Decision-Level Dependence

[PDF](https://www.isca-archive.org/interspeech_2026/moon26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/moon26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2989)

**TL;DR** — The paper introduces a diagnostic to test whether quality-aware multimodal fusion models actually rely on estimated reliability scores during inference, showing that native quality signals have near-zero impact on final decisions.

## Problem

Multimodal architectures frequently incorporate quality or uncertainty scores to weight different modalities like speech, video, and physiology, but it remains unclear whether these scores actively guide model decisions or merely correlate with performance. Standard evaluations report overall system accuracy rather than decision-level reliance on quality signals, making it difficult to distinguish true adaptive routing from architectural flexibility or data biases. This diagnostic gap obscures whether quality-aware mechanisms actually function as intended during inference.

## Method

The authors propose a leakage-safe post-hoc diagnostic called the Clean-Broken test, which freezes trained multimodal models and fusion rules while shuffling quality scores across held-out test instances to break instance-wise alignment. They evaluate this on the StressID and CMU-MOSEI datasets using fully observed subsets to isolate quality reliance from missingness effects. Unimodal representations are extracted using frozen pretrained encoders (Wav2Vec2-base for audio, AffectNet encoder for video, and MOMENT-1-large for physiology), followed by trained classifiers. Fusion rules include a late-fusion quality-weighted average and a conditioning-aware mixture-of-experts router trained via cross-validation across 25 folds.

## Results

Experiments across StressID and CMU-MOSEI demonstrate that shuffling native quality scores yields near-zero performance changes in balanced accuracy, despite significant oracle headroom indicating that better routing is theoretically possible. Specifically, permutation gaps for logistic regression, histogram-based gradient boosting, and mixture-of-experts fusion models remain around -0.002 to -0.011. In contrast, positive controls where quality signals are explicitly aligned with data corruption or unimodal correctness produce large performance drops when shuffled, confirming that the diagnostic successfully detects quality reliance when present.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building multimodal speech and affect recognition systems can use this diagnostic to audit whether their quality-aware or uncertainty-weighted fusion models actually utilize reliability estimates.

## Limitations

The empirical evaluation focuses primarily on decision-level fusion rules and classification tasks such as stress recognition and sentiment analysis.

## Related

- (link related pages by id as the wiki grows)
