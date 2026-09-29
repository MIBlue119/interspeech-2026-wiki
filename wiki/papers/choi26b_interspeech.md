---
id: choi26b_interspeech
category: tts
labels: [low-resource, generative-model]
institutions: ["Maum AI", "Humelo"]
code: https://zeroone-universe.github.io/zesta/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1269
pdf: https://www.isca-archive.org/interspeech_2026/choi26b_interspeech.pdf
---

# ZeSTA: Zero-Shot TTS Augmentation with Domain-Conditioned Training for Data-Efficient Personalized Speech Synthesis

*Youngwon Choi, Jinwoo Oh, Hwayeon Kim, Hyeonyu Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/choi26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1269)

**Category:** `tts` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — ZeSTA is a domain-conditioned training framework that stabilizes low-resource personalized text-to-speech (TTS) fine-tuning using zero-shot synthetic speech augmentation, improving speaker embedding cosine similarity by up to 0.05 over naive mixing while preserving intelligibility gains.

## Key contributions

- Identifies and analyzes the failure mode of naive ZS-TTS augmentation in low-resource fine-tuning, which trades off speaker similarity for lower word error rates.
- Proposes ZeSTA, a domain-conditioned training framework using a lightweight domain embedding to explicitly handle the distribution gap between real and synthetic speech.
- Introduces a real-data oversampling strategy to ground fine-tuning under extremely data-scarce conditions without modifying the underlying TTS architecture.
- Demonstrates framework generality across multiple ZS-TTS generators (Fish-Speech, CosyVoice 2) and datasets (LibriTTS, in-house YoBind).

## Problem

Adapting modern lightweight neural TTS models to unseen target speakers with extremely limited recordings (low-resource personalization) typically results in high sensitivity to data scarcity and poor generalization. While leveraging external zero-shot TTS (ZS-TTS) models to generate synthetic augmentation data provides diverse linguistic coverage and reduces word error rates, naively mixing large amounts of synthetic speech with scarce real target-speaker data severely degrades speaker similarity. Prior methods fail to account for the domain discrepancy between real recordings and synthetic outputs, biasing the fine-tuned model toward synthetic-domain acoustic characteristics. This tradeoff restricts the practical deployment of personalized voice assistants and custom voice generation.

## Method

ZeSTA adapts a multi-speaker VITS architecture by reformulating low-resource fine-tuning as conditional probability optimization $p(y | x, d)$, where $x$ is input text, $y$ is target speech, and $d \in \{\text{real}, \text{synthetic}\}$ denotes data origin. The text encoder $f_{\text{text}}(\cdot)$ maps input text into a speaker-agnostic linguistic representation $h_{\text{ling}}$, while the acoustic generation module $g(\cdot)$ generates speech conditioned on both $h_{\text{ling}}$ and the domain label $d$. The domain embedding matrix inherits from the base VITS multi-speaker setup with its hidden size reduced from 256 to 64 to avoid capacity overkill. 

To complement domain-conditioned training, real target-speaker recordings are oversampled by a factor of $3\times$ during fine-tuning. The pre-training phase uses the multi-speaker VCTK corpus for 400 epochs with the AdamW optimizer ($\beta_1=0.8, \beta_2=0.99$, initial learning rate $2\times 10^{-4}$ decayed by $0.99118$) across four NVIDIA A100 GPUs. Fine-tuning runs for 600 epochs with a batch size of 32 and a learning rate of $1\times 10^{-5}$ on a single A100 GPU. Longest available reference utterances are used for ZS-TTS prompting to maximize style coverage, and synthesized texts are filtered via Whisper medium (retaining items with $<5\%$ WER) when scaling extra synthetic data.

## Experimental setup

Evaluated on 8 speakers from LibriTTS (train-clean-100/360) and 6 speakers from an in-house voice assistant dataset (YoBind), split 10:1:1 for train/val/test. Low-resource training uses 10% real data and 90% synthetic data generated via Fish-Speech and CosyVoice 2. Compared against Real-Only (10% and 100% real data) and naive Real 10% + Synth 90% mixing without domain conditioning or oversampling. Metrics include Speaker Embedding Cosine Similarity (SECS) via ECAPA-TDNN, Character Error Rate (CER), and Word Error Rate (WER) via Whisper medium, alongside MOS naturalness and ABX speaker similarity preference tests.

## Results

On the LibriTTS dataset using Fish-Speech, the Real-Only 10% baseline achieves 0.818 SECS, 5.932 CER, and 12.520 WER. Naive mixing (Real 10% + Synth 90%) collapses SECS to 0.765 while improving WER to 10.348. Applying ZeSTA (domain conditioning + oversampling) recovers SECS to 0.815 while retaining a strong WER of 10.563. Similarly, on the YoBind dataset with CosyVoice 2, ZeSTA achieves 0.804 SECS and 9.006 WER, outperforming naive mixing (0.764 SECS, 9.358 WER) and closely tracking the data-heavy Real 100% baseline (0.840 SECS, 10.424 WER). Ablations on domain embedding size show that a dimension of 64 provides the optimal balance, whereas size 16 hurts intelligibility and size 256 degrades SECS. Speaker-mismatched data augmentation experiments confirm that synthetic data must match the target speaker to yield meaningful similarity gains.

| System / Condition | SECS (↑) | CER (↓) | WER (↓) |
|---|---|---|---|
| Real-Only (10%) | 0.818 | 5.932 | 12.520 |
| Real-Only (100%) | 0.832 | 6.539 | 13.645 |
| Naive Mix (FS, 10%+90%) | 0.765 | 4.738 | 10.348 |
| ZeSTA (FS, DC + OS) | 0.815 | 4.765 | 10.563 |
| ZeSTA (CV2, DC + OS) | 0.815 | 4.943 | 10.907 |

## Limitations

The approach assumes access to a capable external ZS-TTS generator and high-quality transcriptions for the limited target data. The evaluation is limited to English corpora (LibriTTS and an in-house dataset) and a single base acoustic architecture (VITS), leaving multi-lingual robustness and cross-architecture generalization largely untested.

## Why read this

Speech researchers and practitioners building on-device or lightweight personalized TTS systems with extreme data scarcity should read this to understand how to leverage synthetic augmentation without sacrificing speaker identity.

## Code

- https://zeroone-universe.github.io/zesta/

## Applications

Personalized voice assistants, custom voice cloning for text-to-speech, and low-resource synthetic data augmentation.

## Institutions / 機構

Maum AI, Humelo

**Funding / 經費:** Culture, Sports and Tourism R&D Program, Startup Growth Technology Development Program

## Related

- (link related pages by id as the wiki grows)
