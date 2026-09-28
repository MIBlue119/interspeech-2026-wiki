---
id: lin26k_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2019
pdf: https://www.isca-archive.org/interspeech_2026/lin26k_interspeech.pdf
---

# BG-CRNN: Boundary-Guided Dynamic Attention for Sound Event Detection in Complex Scenarios

[PDF](https://www.isca-archive.org/interspeech_2026/lin26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2019)

**TL;DR** — The paper introduces BG-CRNN, a noise-robust sound event detection framework utilizing dynamic boundary attention and masking to achieve a PSDS1 of 0.191 under extreme -5 dB conditions.

## Problem

Existing sound event detection (SED) systems suffer severe performance degradation in complex, noisy real-world acoustic environments because target sound features become contaminated by adjacent background noise. While large-scale datasets and self-supervised models like ATST-Frame improve general performance, they lack fine-grained temporal mechanisms to isolate active event regions from interference. Addressing this gap is critical for reliable intelligent surveillance, smart cities, and health monitoring.

## Method

The proposed BG-CRNN combines a 7-layer CNN and a frozen pre-trained ATST-Frame model for feature extraction, followed by a Dynamic Boundary Transformer (DBT) and a Boundary-Guided Attention (BGA) module. The DBT uses dual branches and six Dynamic Boundary Attention Blocks (DBABs) to simultaneously predict event boundaries via a weighted boundary loss and construct segment-specific dynamic attention masks that restrict self-attention strictly within individual event segments. The BGA module then fuses boundary cues using a gating network and a learnable scalar residual parameter alpha to adaptively enhance active event regions. The model is trained end-to-end in a semi-supervised manner combining supervised SED loss, self-supervised consistency loss (Mean Teacher framework), and weighted boundary loss.

## Results

Evaluated on the WildDESED dataset, BG-CRNN consistently outperforms baseline models across various signal-to-noise ratios from 10 dB to -5 dB. When trained on the clean DESED dataset and evaluated at 10 dB, the fine-tuned BG-CRNN achieves 0.442 PSDS1 and 0.690 PSDS2. When trained on the noisy WildDESED dataset, the fine-tuned BG-CRNN reaches an impressive 0.483 PSDS1 at 10 dB and maintains a PSDS1 of 0.191 even under the extreme -5 dB noise condition. Ablation studies on standard DESED demonstrate that adding the boundary detection branch lifts the baseline ATST-CRNN PSDS1 from 0.502 to 0.544.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building sound event detection systems for noisy real-world environments such as smart home monitoring, urban acoustic surveillance, and automated health care audio monitoring.

## Limitations

The text does not explicitly state major limitations, though the ablation study notes that combining certain auxiliary attention modules directly without tuning can cause minor score trade-offs.

## Related

- (link related pages by id as the wiki grows)
