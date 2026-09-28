---
id: ghosh26d_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-880
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26d_interspeech.pdf
---

# ASR-Synchronized Speaker-Role Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-880)

**TL;DR** — This paper adapts an ASR-synchronized speaker diarization framework for joint ASR and speaker-role diarization (RD), achieving a relative 6.2% improvement in role-based word diarization error rate (R-WDER) on real-world medical data.

## Problem

Conventional speaker diarization assigns generic labels rather than functional roles (e.g., doctor vs. patient), which are crucial for downstream tasks like summarization. While end-to-end ASR+RD models exist (such as single-transducer Role-ASR), multitask learning degrades ASR accuracy, and speaker diarization methods fail on RD because they do not capture the necessary linguistic context.

## Method

The authors propose an ASR-synchronized RD architecture where a frozen ASR transducer (using a CNN-2 predictor) provides frame-level outputs, and an auxiliary RD transducer operates with three modifications: (1) an RNN predictor instead of a CNN to capture long-range linguistic context, (2) higher-layer ASR encoder features (layer 12 instead of intermediate layer 5) as input to supply richer word-level information, and (3) replacing the blank-shared RNNT loss with a standard cross-entropy loss computed strictly along the 1-best forced-aligned ASR path. The base ASR model uses a conformer-transducer architecture trained on audio data.

## Results

Evaluated on a private real-world dataset of medical conversations (DoPaCo) and a public simulated dataset (SiMeCo). On DoPaCo, the proposed final system (P3) achieves a WER of 15.67 and an R-WDER of 6.1 (compared to 16.03/6.5 for Role-ASR and 15.67/7.8 for the baseline ASR-synchronized SD adapted to RD). On SiMeCo, the method achieves 10.56 WER and 27.2 R-WDER out-of-domain (and 8.8 WER / 2.1 R-WDER when finetuned), outperforming baseline R-WDER of 34.2 / 2.2. Ablations demonstrate that moving from L-2 to L-12 encoder features drops R-WDER from 8.1 to 6.9 on DoPaCo validation, and substituting cross-entropy on 1-best paths provides additional relative R-WDER reductions of 3.2% on DoPaCo and 16% on SiMeCo.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and NLP engineers building conversational AI pipelines for specialized multi-speaker domains like medical consultations or legal depositions where identifying specific speaker roles is essential for summarization and information extraction.

## Limitations

The model's out-of-domain performance on clean, simulated datasets like SiMeCo shows a degradation when trained exclusively on noisy real-world data, highlighting domain sensitivity.

## Related

- (link related pages by id as the wiki grows)
