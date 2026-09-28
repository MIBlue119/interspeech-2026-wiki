---
id: yang26j_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1553
pdf: https://www.isca-archive.org/interspeech_2026/yang26j_interspeech.pdf
---

# A Fusion-Aware Two-Stage Framework for Mispronunciation Detection and Diagnosis in Low-Resource Modern Standard Arabic

[PDF](https://www.isca-archive.org/interspeech_2026/yang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1553)

**TL;DR** — This paper proposes a two-stage end-to-end framework combining a pre-trained encoder, causal dilated temporal convolutional networks, and multi-checkpoint ensemble inference for Modern Standard Arabic mispronunciation detection and diagnosis, achieving an F1-score of 0.7201 on the QuranMB.v2 test set (a 63.1% relative improvement over baseline).

## Problem

Mispronunciation detection and diagnosis (MDD) requires capturing fine-grained non-canonical pronunciation variations rather than normalizing them away like standard automatic speech recognition. For Modern Standard Arabic (MSA), this task is severely hindered by a complex phonological inventory involving subtle emphatic and pharyngeal contrasts, alongside a severe shortage of standardized resources and a pronounced domain gap between synthetic error-injected data and noisy real learner speech.

## Method

The system utilizes a wav2vec2-XLS-R-300m upstream acoustic encoder coupled with causal dilated temporal convolutional networks (TCNs) and a CTC decoding head, designed to maintain local inductive bias and high temporal resolution for phonetic anomalies. Training follows a hierarchical two-stage strategy: Stage 1 learns general acoustic-phonetic mappings on ~79 hours of native MSA data combined with ~80 hours of synthetic error-injected speech, while Stage 2 adapts the model to ~2 hours of authentic learner recordings. Inference employs a diversity-aware multi-checkpoint ensemble across 6 model states fused via confusion networks, followed by a self-induced Kneser-Ney smoothed N-gram language model rescoring step.

## Results

Evaluated on the blind QuranMB.v2 test set from the IqraEval.2 Challenge, the proposed system achieves a phoneme-level F1-score of 0.7201, representing a 63.1% relative improvement over the official baseline of 0.4414. Ablation results show that a single-checkpoint two-stage model reaches 0.6825 F1 (+54.6% relative), while the multi-checkpoint ensemble and N-gram rescoring contribute an additional 5.5% relative improvement. The TCN-based Stage 2 model outperforms LSTM (0.6467 F1) and Transformer variants (0.6000 F1). Naively mixing synthetic and native data degrades performance below baseline (-2.5%), validating the necessity of the sequential two-stage approach.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and educational technology developers building computer-aided pronunciation training (CAPT) systems for low-resource languages and fine-grained phonetic error diagnosis.

## Limitations

The framework relies on a specialized two-stage training recipe and multi-checkpoint ensembling, which increases inference complexity and depends on the availability of at least a small subset of real learner adaptation data.

## Related

- (link related pages by id as the wiki grows)
