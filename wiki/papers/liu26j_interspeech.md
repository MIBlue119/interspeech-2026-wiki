---
id: liu26j_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1259
pdf: https://www.isca-archive.org/interspeech_2026/liu26j_interspeech.pdf
---

# Text-Annotated Noisy Speech as Supervision: A Dual-Learning Framework for Target-Domain Clean-Free Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/liu26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1259)

**TL;DR** — SwitchSE is a clean-free target-domain adaptation framework for speech enhancement that utilizes real noisy-transcript pairs via a switch-conditioned dual-mode learning mechanism to improve target-domain acoustic quality and ASR-friendliness.

## Problem

Deep learning-based speech enhancement models are predominantly trained on synthetic noisy-clean speech pairs, leading to poor generalization in real-world acoustic environments where paired clean references are unavailable. While real noisy data is increasingly accessible via ASR corpora, utilizing it effectively without clean targets remains challenging. Standard fine-tuning strategies often struggle with trade-offs between perceptual enhancement quality and downstream ASR performance.

## Method

The framework utilizes a Gated Convolutional Recurrent Network (GCRN) backbone for complex spectral mapping, extended with a learnable switch embedding prepended to the input spectrogram along the temporal dimension to indicate the operational mode. During training, the model alternates between standard enhancement batches using synthetic clean-noisy pairs (activated with an L1 time-frequency loss) and ASR batches using real noisy-transcript pairs (activated with a frozen ASR model and CTC loss). Only one mode-specific loss is active per batch, scaled with a fixed weighting factor. At inference time, the switch token enables controllable output biasing toward either perceptual quality or ASR-friendliness.

## Results

Evaluated on synthetic VCTK data and real CHiME-3 data (using 2.9 hours for training), SwitchSE substantially improves real-world target-domain performance. On CHiME-3, the enhancement-oriented mode (SEnh) achieves a P.808 MOS of 3.23 (compared to 2.34 for noisy speech and 2.77 for baseline GCRN), while the ASR-oriented mode (SASR) reduces Word Error Rate (WER) to 20.27% (compared to 63.66% for standard GCRN). On VCTK, the model preserves strong source-domain performance with a WER of 35.53% and PESQ of 1.70. Ablation studies show that increasing the switch token length further biases the model toward lower WER at a slight cost to perceptual MOS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on robust speech enhancement, front-ends for robust automatic speech recognition, and domain adaptation for acoustic environments lacking clean target references.

## Limitations

Validation is currently restricted to a single enhancement backbone (GCRN) and an internal ASR model setup, leaving broader architectural testing for future work.

## Related

- (link related pages by id as the wiki grows)
