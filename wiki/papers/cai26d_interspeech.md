---
id: cai26d_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2350
pdf: https://www.isca-archive.org/interspeech_2026/cai26d_interspeech.pdf
---

# Towards Event-Robust Acoustic Scene Classification

[PDF](https://www.isca-archive.org/interspeech_2026/cai26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cai26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2350)

**TL;DR** — This paper introduces the Event-Shifted Acoustic Scene (ESAS) dataset to evaluate acoustic scene classification robustness, demonstrating that state-of-the-art models suffer severe accuracy degradation under unknown foreground sound events.

## Problem

Current acoustic scene classification datasets feature clean and consistent audio recordings, whereas real-world environments frequently exhibit unpredictable foreground sound events that vary by time, season, and location. This event-shift phenomenon poses a major challenge because existing models rely heavily on event-related information. Because no dedicated benchmark previously existed to evaluate how well models recognize scenes under unfamiliar event interference, this work establishes a rigorous testing ground to expose and analyze this vulnerability.

## Method

The ESAS dataset is constructed by mixing background scene recordings from CochlScene with foreground sound events from FSD50K using an automated pipeline. The pre-trained BEATs model filters out pre-existing events in background clips, while low-quality or ambiguous events are removed from FSD50K. GPT-4 acts as a constrained semantic filter to guide reasonable scene-event groupings. The pipeline synthesizes 10-second mono clips at 44.1 kHz containing 1 to 10 overlapping events with random temporal positioning, time-stretching, pitch shifting, and scene-to-event signal-to-noise ratios ranging from -15 dB to +15 dB. The dataset inherits CochlScene splits, maintaining 27 known events for training and validation and isolating 69 unknown events exclusively for the test set.

## Results

Evaluations are performed on 6 architectures (TF-SepNet, BC-ResNet, GRU-CNN, CP-Mobile, BEATs, and PaSST) using overall classification accuracy across background-only, known-event, and unknown-event test subsets. On clean background-only data, models achieve 78.28% to 84.27% accuracy, but lightweight CNNs drop by up to 22 percentage points on unknown events, while large pre-trained Transformers (BEATs and PaSST) drop by 7% to 9%. When increasing event polyphony to 10 mixed events per clip, lightweight CNN accuracies plummet below 50%, whereas BEATs and PaSST maintain approximately 68% to 70% accuracy. Under extreme negative SNR conditions where foreground events dominate, lightweight models drop to 37.42%-43.21% accuracy, while large-scale Transformers retain around 67% accuracy.

## Code

- https://github.com/bohanhu118/Interspeech2026_ESAS

## Applications

Speech and audio engineers building robust acoustic scene classification systems for real-world ambient monitoring, smart cities, and environmental sensing.

## Limitations

The synthetic mixing strategy relies on external sound event pools and LLM-guided pairing, which may not capture every nuanced acoustic interaction of fully organic soundscapes.

## Related

- (link related pages by id as the wiki grows)
