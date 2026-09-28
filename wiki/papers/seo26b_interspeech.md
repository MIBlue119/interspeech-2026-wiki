---
id: seo26b_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2167
pdf: https://www.isca-archive.org/interspeech_2026/seo26b_interspeech.pdf
---

# Hard Positive-targeted Training for Robust Audio Deepfake Detection under Neural Codec Processing

*Jiwon Seo, Inho Kim, Seongkyu Han, Thien-Phuc Doan, Souhwan Jung*

[PDF](https://www.isca-archive.org/interspeech_2026/seo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2167)

**TL;DR** — This paper addresses audio deepfake detection (ADD) robustness degradation under neural codec (NC) processing, showing that errors stem primarily from NC-processed bonafide speech shifting toward the spoof region. By introducing a hard positive-targeted mini-batch sampling and auxiliary loss strategy, the authors reduce total equal error rate (EER) from 24.36% to 10.93% on SSL-Conformer.

## Key contributions

- Identifies that NC-processing degradation in ADD is primarily driven by bonafide-side errors where genuine compressed speech overlaps with the spoof cluster.
- Proposes a proactive mini-batch construction scheme centered on a clean bonafide anchor, boundary-adjacent NC-processed bonafide positives, and mixed clean/NC spoof negatives.
- Combines a Softplus-based guidance loss (to push negatives away from the hard positive) and a triplet loss (to enforce anchor-level margin geometry).
- Demonstrates strong generalization to unseen codecs (EnCodec, FunCodec) not encountered during training.

## Problem

Neural audio codecs are increasingly integrated into modern speech pipelines for low-bitrate compression, but their reconstruction artifacts mimic vocoder-generated traces found in text-to-speech and voice conversion. Consequently, audio deepfake detectors suffer severe performance drops because genuine NC-processed audio is frequently misclassified as spoofed. Prior systems rely on generic discriminative training or naive data augmentation, which fail to clear the overlapping boundary regions where NC-processed bonafide samples drift into the spoof cluster.

## Method

The architecture builds on two state-of-the-art ADD backbones, SSL-Conformer and SSL-AASIST, using wav2vec 2.0 XLS-R as the front-end feature extractor. Mini-batches are constructed around a clean bonafide anchor paired with $N_{positive}=2$ NC-processed bonafide samples (each from a different codec) and $N_{negative}=3$ spoof samples (two clean, one NC-processed). During training, the system mines the hard positive—the positive embedding farthest from the anchor using squared Euclidean distance—and optimizes a joint objective combining standard cross-entropy classification loss ($L_{ce}$), a Softplus-based guidance loss ($L_{guidance}$) that separates negatives from the hard positive, and a triplet loss ($L_{tri}$) that enforces an anchor-to-positive vs. anchor-to-negative margin constraint $\alpha$ ($\alpha=0.3, m=0.2$ yielding optimal results). This design explicitly reshapes the embedding geometry around confusable boundary regions without degrading clean-audio detection.

## Experimental setup

The baseline training dataset is ASVspoof2019 Logical Access (LA19), augmented with BigCodec and SpeechTokenizer versions. External evaluation draws 5,000 bonafide utterances each from VCTK, LibriSpeech, and VoxCeleb, and 5,000 spoof utterances each from ASVspoof2019 LA eval, ASVspoof2021 DF eval, and the In-the-Wild dataset. Tested codecs include seen (BigCodec, SpeechTokenizer) and unseen (EnCodec, FunCodec) variants. Metrics are Equal Error Rate (EER) and class-wise accuracy.

## Results

On SSL-Conformer, the proposed method reduces TOTAL EER from 24.36% (baseline) or 23.11% (naive augmentation) down to 10.93% at best margins ($\alpha=0.3, m=0.2$). For SSL-AASIST, TOTAL EER drops from 29.01% to 11.45%. On unseen codecs (EnCodec and FunCodec), SSL-Conformer EER drops from 30.19% to 11.83%. In terms of class-wise accuracy under NC processing, SSL-Conformer bonafide accuracy jumps from 49.27% (baseline) to 79.94% while maintaining spoof accuracy around 93.76%. Ablation studies confirm that removing either the triplet loss (TOTAL EER rising to 15.79%) or the guidance loss (13.54%) degrades performance.

| System | TOTAL EER (%) | Ori. & Seen NC EER (%) | Unseen NC EER (%) |
|---|---|---|---|
| SSL-Conformer (Baseline) | 24.36 | 21.21 | 30.19 |
| SSL-Conformer (Augmentation) | 23.11 | 23.69 | 21.84 |
| SSL-Conformer (Ours, $\alpha=0.3, m=0.2$) | 10.93 | 9.76 | 11.83 |
| SSL-AASIST (Baseline) | 29.01 | 24.59 | 35.11 |
| SSL-AASIST (Augmentation) | 28.71 | 29.25 | 27.14 |
| SSL-AASIST (Ours, $\alpha=0.2, m=0.3$) | 11.45 | 9.41 | 13.77 |

## Limitations

The evaluation relies on fixed selections of 5,000 samples per external set and is restricted to four specific neural codecs. Sensitivity to hyperparameter combinations (margins $\alpha$ and $m$) indicates that performance requires tuning. Future work is needed to explore a broader array of codec architectures, bitrate variations, and multi-codec chain interactions.

## Why read this

Speech security and forensics researchers working on audio deepfake detection under real-world transmission or compression pipelines should read this paper to learn how targeted embedding-space margin regularization eliminates bonafide-side false alarms caused by neural codecs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust audio deepfake detection systems deployed in telephony, media verification pipelines, and conversational AI security filters.

## Related

- (link related pages by id as the wiki grows)
