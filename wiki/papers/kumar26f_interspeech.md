---
id: kumar26f_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2442
pdf: https://www.isca-archive.org/interspeech_2026/kumar26f_interspeech.pdf
---

# Who Synthesized This? Joint Deepfake Detection and Generative Source Attribution

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2442)

**TL;DR** — The authors propose a few-shot, open-set framework for joint deepfake detection and generative source attribution using a LoRA-adapted WavLM-Large backbone and hierarchical metric learning, achieving 0.49% EER and 99% attribution accuracy.

## Problem

Modern speech synthesis systems like neural codecs, diffusion, and flow-matching models continuously evolve and bypass legacy discriminators by masking spectro-temporal artifacts. Furthermore, binary detection is no longer sufficient; forensic pipelines must perform open-world source attribution to identify novel, zero-day generators without requiring periodic retraining of static classifiers.

## Method

The framework utilizes a WavLM-Large backbone adapted via Low-Rank Adaptation (LoRA, rank 8, alpha 16) applied to feature and attention output projections. It employs a two-stage hierarchical training curriculum combining conditional Additive Angular Margin (AAM) Softmax with dynamically trainable margins and Exponential Moving Average (EMA) anchored center loss. For inference, it registers emergent synthesis models as embedding centroids using few-shot support sets (K ≈ 36 samples) and performs parameter-free nearest-neighbor retrieval via cosine similarity.

## Results

Evaluated on the ASVspoof 5 Track 1 open-condition benchmark and the MLAAD v9 dataset, the system achieves an EER of 0.49% and a minDCF of 0.09. It attains up to 99% accuracy in tracing generated speech to its specific source model when utilizing gender-conditioned real prototypes across progressive incremental testing stages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and forensic analysts building automated audio security systems, voice biometric protections, and zero-day deepfake tracing tools.

## Limitations

The system exhibits an elevated actual DCF (actDCF of 0.97) due to a score calibration gap inherent to hyperspherical metric spaces where cosine similarity scores cluster near the unit boundary.

## Related

- (link related pages by id as the wiki grows)
