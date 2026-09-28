---
id: simic26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2081
pdf: https://www.isca-archive.org/interspeech_2026/simic26_interspeech.pdf
---

# Adaptive AVSR: Integrating Speaker and Environmental Embeddings for Robust Audio-Visual Speech Recognition

*Christopher Simic, Korbinian Riedhammer, Tobias Bocklet*

[PDF](https://www.isca-archive.org/interspeech_2026/simic26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/simic26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2081)

**TL;DR** — This paper introduces adaptive mechanisms that integrate speaker and noise embeddings into a Whisper-based Audio-Visual Speech Recognition (AVSR) system, achieving a 13.4% relative WER reduction over AV-HuBERT on LRS3.

## Key contributions

- Extends a pre-trained Whisper AVSR model with upstream self-attention based audio-visual feature concatenation and targeted adaptation modules.
- Develops a custom attention-based noise embedding module predicting SNR levels and categories (babble, music, natural, sidespeaker).
- Compares three adaptation strategies (prefix concatenation, cross-attention layers, and gated weighting) for both noise and speaker embeddings.
- Demonstrates that X-Vector speaker embeddings inherently encode substantial noise-related information (90% classification accuracy), explaining overlapping performance profiles.

## Problem

Standard ASR and AVSR models struggle to generalize optimally across severe acoustic mismatches and diverse speaker acoustics despite training on massive datasets. Prior systems like AV-HuBERT, Whisper-Flamingo, and AV-Fusion lack explicit mechanisms to modulate features based on instantaneous speaker identity and environmental noise characteristics. Providing explicit, disentangled representations of noise conditions and speaker profiles can bridge this gap and improve robustness in extreme low-SNR environments.

## Method

The base architecture builds upon a 74M-parameter Whisper base model combined with an upstream 13M-parameter audio-visual fusion module. Audio and visual features are concatenated and divided into chunks before self-attention processing, a choice that outperformed cross-attention fusion by 1.3% WER. For noise adaptation, a dedicated auxiliary module comprising 4 encoder layers with 8 self-attention heads (hidden dim 256) outputs SNR regression and category classification losses (MSE and CE respectively). For speaker adaptation, X-Vector and ECAPA-TDNN embeddings are extracted from audio inputs.

Three integration strategies are evaluated: (1) Prefix Adaptation, where mapped embeddings are concatenated as sequence prefixes; (2) Cross-Attention Adaptation, introducing dedicated cross-attention layers before Whisper decoder blocks or fusion self-attention blocks; and (3) Gated Weighting Adaptation, producing sigmoid gating vectors from MLPs to modulate feature channels. Noise embeddings are injected into the AV fusion module (where gated weighting yields the best results with 14k extra parameters), while speaker embeddings are incorporated at the pre-decoder level (where prefix concatenation yields the best results with 263k parameters).

Models are pre-trained for 3 epochs on VoxCeleb2 and LRS3 using self-supervised MSE loss on the encoder/fusion module, followed by fine-tuning on LRS3 with batch size 512 using a combination of embedding MSE loss and decoder cross-entropy loss. Fine-tuning uses an initial constant learning rate of 10^-4 for 1 epoch, linearly decayed over 4 epochs, continuing until validation convergence up to 11 epochs on 4 NVIDIA A40 GPUs.

## Experimental setup

Evaluated on the LRS3 dataset (407h pretrain, 30h trainval, 1h test across 9k speakers) augmented with MUSAN (60h speech, 42.5h music, 6h natural noise) and VoxCeleb2 (2k hours for self-supervised pseudo-labeling) at SNRs uniformly sampled from -15dB to 30dB. Compared against baseline Whisper AVSR, AV-HuBERT base, Whisper Flamingo small (244M params), and AV-Fusion base. Metrics reported are Word Error Rate (WER %) across noise levels (-5dB, 0dB, 5dB, 10dB) and categories (babble, music, natural, sidespeaker, and All Mix), alongside clean conditions (c).

## Results

The best noise-adapted model (Noise Gated Weight Adapt) achieves an average WER of 4.26% across All Mix, representing a 3.48% relative improvement over the baseline (4.42%), with gains up to 5.1% at -5dB SNR. The best speaker-adapted model (Speaker Prefix Adapt) achieves an average WER of 4.27% (a 3.2% relative improvement), reaching a 5.7% relative WER reduction at -5dB. Compared to state-of-the-art AV-HuBERT base (4.92% average WER), the proposed noise-gated model achieves a 13.4% relative WER reduction overall, though AV-HuBERT performs better on extreme babble noise (-5dB) due to its training strategy of masking audio and training strictly at 0dB/clean SNRs.

| System / Condition | -5dB | 0dB | 5dB | 10dB | Clean (c) | All Mix (∅) |
|---|---|---|---|---|---|---|
| AV-HuBERT base | 18.40 | 7.20 | 3.70 | 2.70 | 1.80 | 4.92 |
| Whisper Flamingo small | 25.80 | 8.30 | 4.70 | 4.10 | 1.20 | 7.87 |
| AV-Fusion base | 25.30 | 8.20 | 3.80 | 3.00 | 1.65 | 5.29 |
| Ours Baseline | 11.44 | 4.64 | 2.52 | 1.91 | 1.57 | 4.42 |
| Ours Noise Gated Weight Adapt. | 22.40 | 7.10 | 2.90 | 2.00 | 1.58 | 4.26 |

## Limitations

Evaluated exclusively on English-language data (LRS3/VoxCeleb2), leaving multilingual generalization untested. The architecture relies on clean text transcripts and does not explore fully unsupervised or zero-shot scenarios for the AVSR task itself. Combining noise and speaker embeddings yielded redundant representations with no additive performance gains, indicating a ceiling for this embedding-fusion paradigm.

## Why read this

Read this if you want to understand how to inject external speaker and environment priors into large pre-trained ASR/AVSR backbones (like Whisper) using lightweight adapters rather than full fine-tuning. It provides rigorous ablation data comparing prefix concatenation, cross-attention layers, and gated channel weighting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust hearing-aid speech enhancement, in-car automated voice assistants, security surveillance transcription, and audio-visual speech recognition in highly dynamic cocktail-party environments.

## Related

- (link related pages by id as the wiki grows)
