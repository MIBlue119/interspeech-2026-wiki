---
id: liu26j_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1259
pdf: https://www.isca-archive.org/interspeech_2026/liu26j_interspeech.pdf
---

# Text-Annotated Noisy Speech as Supervision: A Dual-Learning Framework for Target-Domain Clean-Free Speech Enhancement

*Xin Liu, Shulin He, Xueliang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1259)

**TL;DR** — SwitchSE is a clean-free domain adaptation framework that uses a switch-conditioned dual-learning mechanism to fine-tune speech enhancement models on real noisy speech with text transcriptions. It achieves substantial target-domain improvements using only 2.9 hours of CHiME-3 data while preserving source-domain performance.

## Key contributions

- Target-domain clean-free adaptation leveraging real noisy-transcript pairs (e.g., CHiME-3) where aligned clean references are missing.
- A switch-conditioned dual-mode learning mechanism that alternates between enhancement and ASR objectives per batch using a learnable mode embedding.
- Data-efficient target-domain model updating that improves acoustic quality and WER on real data using only 2.9 hours of training material while keeping VCTK benchmark scores intact.

## Problem

Deep learning speech enhancement models are predominantly trained on synthetic noisy-clean pairs, which fail to generalize to real acoustic environments characterized by unmodeled noise, room acoustics, and device variations. Standard target-domain adaptation is bottlenecked by the unavailability of clean target speech in real-world deployments. While self-supervised methods or noise-to-noise setups exist, they either ignore textual supervision or struggle to balance perceptual enhancement with downstream ASR friendliness.

## Method

SwitchSE employs a GCRN enhancement backbone and alternates between two batch types: synthetic enhancement batches (noisy-clean pairs) and target-domain ASR batches (noisy-transcript pairs). A learnable mode indicator embedding zs in R^(1 x F x 2) representing real/imaginary spectral components is prepended along the temporal axis to the input spectrogram, serving as a switch token (s=0 for enhancement, s=1 for ASR). 

For s=0, a multi-domain enhancement loss LEnh is computed using both time-domain and frequency-domain representations of the enhanced waveform against clean references. For s=1, a CTC loss LASR is computed using a frozen pre-trained U2++ acoustic model to guide the enhancement toward recognizer-friendly outputs. A fixed scalar weighting factor alpha = 0.8 scales the loss, though exactly one loss is active per batch due to the alternating data type.

During inference, the switch token enables controllable output biasing, allowing users to toggle between a perceptual quality-oriented mode (SEnh) and an ASR-friendly mode (SASR).

## Experimental setup

The evaluation uses VCTK (99 training speakers, 10 test speakers; online SNR -10 to 10 dB) for synthetic baseline training and preservation testing, combined with CHiME-3 real noisy speech (2.9 hours for training, 1640 validation utterances, 1320 test utterances) for target domain adaptation. The enhancement backbone is a GCRN with a grouped LSTM encoder-decoder (group size 2, hidden size 1024). The ASR guidance model is an English GigaSpeech-trained U2++ from WeNet with the attention decoder omitted. Models are optimized using Adam at 4e-4 with a 10,000-step warmup.

## Results

On CHiME-3, the baseline GCRN achieves a P.808 MOS of 2.77 and a WER of 63.66, demonstrating poor transfer from synthetic VCTK data. SwitchSE (GCRNpro) improves CHiME-3 P.808 MOS to 3.23 in enhancement mode (SEnh) and lowers WER to 20.27 in ASR mode (SASR). In ablations, increasing the switch embedding length to 4 drives CHiME WER down to 18.09 (rivaling unprocessed noisy speech at 18.38), though at the cost of a slightly reduced P.808 MOS (3.17). On the source VCTK test set, SwitchSE maintains strong performance, with PESQ remaining around 1.70 and WER staying stable near 35.53.

| Methods | Switch | VCTK WER | VCTK PESQ | CHiME WER | CHiME P.808 MOS |
|---|---|---|---|---|---|
| Noisy | - | 37.51 | 1.19 | 18.38 | 2.34 |
| GCRN | - | 36.93 | 1.68 | 63.66 | 2.77 |
| GCRN_CTC | - | 35.33 | 1.25 | 18.35 | 2.36 |
| GCRN_pro (SEnh) | SEnh | 35.53 | 1.70 | 23.63 | 3.23 |
| GCRN_pro (SASR) | SASR | 35.24 | 1.68 | 20.27 | 3.19 |

## Limitations

The evaluation is restricted to a single enhancement backbone (GCRN) and an internal ASR model (U2++) configuration, leaving cross-architecture and cross-ASR generalization unproven. The training data scale for the target domain is limited to 2.9 hours of CHiME-3, and WER evaluations rely primarily on the same ASR model used for training supervision rather than universal external decoders.

## Why read this

Researchers and engineers tackling real-world speech enhancement without clean target labels should read this to learn how to inject ASR supervision into acoustic enhancement models via simple input-level switch embeddings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speech enhancement for robust automatic speech recognition, mobile communications, and hearing aids operating in unobserved real-world acoustic environments.

## Related

- (link related pages by id as the wiki grows)
