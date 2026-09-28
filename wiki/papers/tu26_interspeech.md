---
id: tu26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2200
pdf: https://www.isca-archive.org/interspeech_2026/tu26_interspeech.pdf
---

# Duration-aware self-attention for speech deepfake detection

[PDF](https://www.isca-archive.org/interspeech_2026/tu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2200)

**TL;DR** — The paper introduces duration-aware self-attention (DASA) to improve speech deepfake detection under variable utterance lengths, achieving consistent Equal Error Rate (EER) reductions across multiple benchmarks.

## Problem

Current speech deepfake detectors rely on fixed-length training and evaluation via padding or truncation. Padding short utterances introduces artificial boundary artifacts, while truncation can strip away crucial temporal regions containing deepfake evidence, causing models to struggle with variable-length real-world data.

## Method

The method integrates timing embeddings—derived from audio duration and segment offsets using Fourier feature mappings—directly into the self-attention mechanism of Conformer or ConFusionformer models. Three DASA implementations are explored: frame-independent, frame-dependent, and relative positional encoding (RPE) dependent. The front-end uses a pre-trained wav2vec 2.0 XLS-R model, followed by 6-block Conformers or 9-layer ConFusionformers (with 160 base channels, 4 heads, and channel-wise attentive pooling), trained on ASVspoof19-LA using RawBoost augmentation.

## Results

Evaluated on ASVspoof21-LA, ASVspoof21-DF, In-the-Wild, and CodecFake datasets using Equal Error Rate (EER). The RPE-dependent DASA variant (DASA-3) consistently outperforms baseline models, lowering ConFusionformer-9 EER on ASVspoof21-DF from 1.84% to 1.53% and Conformer-6 EER from 1.89% to 1.78%. Ablations show that varying evaluation durations (2s, 4s, 6s, and full length) confirm that RPE-dependent DASA offers superior robustness to length mismatches compared to standard self-attention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust audio deepfake detection systems for real-world audio verification, forensic analysis, and security applications.

## Related

- (link related pages by id as the wiki grows)
