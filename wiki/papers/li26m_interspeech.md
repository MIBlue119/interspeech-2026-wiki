---
id: li26m_interspeech
category: enhancement-separation
labels: [generative-model]
institutions: ["Nanyang Technological University", "Southeast University", "Schaeffler"]
code: https://huggingface.co/yaoxunji/gen-se
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-893
pdf: https://www.isca-archive.org/interspeech_2026/li26m_interspeech.pdf
---

# GenTSE: Enhancing Target Speaker Extraction via a Coarse-to-Fine Generative Language Model

*Haoyang Li, Xuyi Zhuang, Azmat Adnan, Ye Ni, Wei Rao, Shreyas Gopal, Eng Siong Chng, Boon Siew Han, Yuanjin Zheng*

[PDF](https://www.isca-archive.org/interspeech_2026/li26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-893)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — GenTSE is a two-stage decoder-only generative language model for target speaker extraction that separates coarse semantic prediction from fine acoustic generation. On Libri2Mix clean, it outperforms prior LM-based methods across speech quality, speaker consistency, and intelligibility.

## Key contributions

- A two-stage decoder-only language model architecture where Stage-1 predicts coarse semantic tokens and Stage-2 generates fine acoustic tokens using a single-codebook SimCodec.
- Use of continuous frame-level SSL (WavLM) and neural audio codec (DAC) embeddings for mixture and reference conditioning rather than discretized prompts.
- Frozen-LM Conditioning (FLC) strategy that fine-tunes models on predicted tokens from frozen checkpoints to close the exposure bias gap.
- Direct Preference Optimization (DPO) adapted for TSE using UTMOS-based candidate ranking to align model outputs with human perceptual quality.

## Problem

Existing discriminative target speaker extraction (TSE) models generalize poorly to distribution shifts and produce lower-fidelity audio, while prior generative LM-based systems struggle with high-entropy token spaces or use non-generative cross-attention blocks. Direct autoregressive prediction of raw multi-codebook acoustic tokens leads to severe exposure bias and ignores human perceptual preferences. This matters because robust real-world TSE requires high speech naturalness, preserved speaker identity, and strong intelligibility in multi-speaker mixtures.

## Method

GenTSE consists of two decoder-only Transformer stages (12 layers, 8 attention heads, hidden size 1024). In Stage-1 (Semantic Extraction), layer-6 frame-level WavLM embeddings of the reference and mixture speech condition an autoregressive LM to predict coarse semantic tokens derived by K-means clustering (codebook size 1024) on 960 hours of LibriTTS. In Stage-2 (Acoustic Generation), the predicted or ground-truth semantic tokens are concatenated with DAC encoder embeddings of the reference and mixture speech to condition a second autoregressive LM. This LM predicts single-codebook SimCodec tokens (codebook size 8192), which are then decoded into waveform by the SimCodec decoder. Both stages are optimized using standard cross-entropy loss with teacher forcing.

To mitigate exposure bias, Frozen-LM Conditioning (FLC) duplicates the trained base models into trainable copies while freezing the originals. The frozen models generate predicted tokens under teacher forcing to feed the trainable copies as conditioning inputs for 12k (semantic) and 6k (acoustic) steps using a constant learning rate of 5e-6. For perceptual alignment, Direct Preference Optimization (DPO) is applied to the acoustic LM for 400 steps with batch size 128 and beta = 0.1. Preference pairs (A+, A-) are constructed by sampling M=32 candidates via top-k multinomial sampling (k=16) from reference-model logits, decoding them, and scoring them with UTMOS; the highest-scoring candidate is chosen as A+ and the lowest as A-.

## Experimental setup

Evaluated on the clean Libri2Mix 2-speaker test set, trained on LibriMix train-100 and train-360 splits (16 kHz sampling rate). Baselines include discriminative models (X-TF-GridNet, USEF-SepFormer) and generative LM models (TSELM-L, LLaSE-G1, Metis). Metrics include DNSMOS (SIG, BAK, OVL), UTMOS, NISQA, SECS (speaker embedding cosine similarity via Resemblyzer), dWER (using Whisper-base), and SpeechBERT semantic similarity. Implemented using AdamW on A40/A100 GPUs with peak learning rates of 1e-4 for baseline training and 5e-6 for FLC/DPO fine-tuning.

## Results

On Libri2Mix clean, GenTSE achieves state-of-the-art results among generative models with a DNSMOS OVL of 3.399, UTMOS of 4.296, NISQA of 3.976, SECS of 0.928, and SpeechBERT of 0.920, outperforming Metis (UTMOS 3.882, NISQA 3.869) and TSELM-L. While discriminative USEF-SepFormer achieves a lower dWER (0.156 vs GenTSE's 0.177), GenTSE substantially surpasses it in subjective speech quality and speaker consistency. Ablations confirm that removing the semantic stage increases dWER from 0.217 to 0.284, and FLC fine-tuning outperforms extended teacher-forcing across all metrics (e.g., FLC achieves dWER 0.172 vs TF 0.184). Combining DPO with cross-entropy loss improves DNSMOS OVL from 3.366 to 3.399 and UTMOS from 4.127 to 4.296, though pure DPO exhibits minor trades in SECS and dWER.

| Model | Category | DNSMOS-OVL | UTMOS | NISQA | SECS | dWER |
|---|---|---|---|---|---|---|
| Mixture | - | 2.653 | 1.519 | 2.251 | 0.754 | 0.821 |
| X-TF-GridNet | D | 2.895 | 2.852 | 3.216 | 0.758 | 0.389 |
| USEF-SepFormer | D | 2.927 | 3.492 | 2.880 | 0.806 | 0.156 |
| TSELM-L | G | 3.198 | 3.556 | 3.509 | 0.651 | 0.263 |
| Metis | G | 3.265 | 3.882 | 3.869 | 0.879 | 0.180 |
| GenTSE | G | 3.399 | 4.296 | 3.976 | 0.928 | 0.177 |

## Limitations

Evaluated exclusively on clean Libri2Mix under matched speaker conditions; robustness under noisy, reverberant, or target-absent conditions remains unexplored. The DPO stage currently causes slight trade-offs in speaker similarity and intelligibility while optimizing for perceptual MOS proxies. The compute requirements involve heavy multi-stage training pipelines across pre-training, FLC fine-tuning, and DPO alignment.

## Why read this

Speech and ML researchers working on generative speech extraction will appreciate this paper for its concrete recipes tackling exposure bias via Frozen-LM Conditioning and human preference alignment via DPO in autoregressive target speaker extraction.

## Code

- https://huggingface.co/yaoxunji/gen-se

## Applications

Real-time communication tools, hearing enhancement devices, robust speaker diarization front-ends, and multi-speaker transcription systems.

## Institutions / 機構

Nanyang Technological University, Southeast University, Schaeffler

**Funding / 經費:** RIE2025 Industry Alignment Fund - Industry Collaboration Projects, A*STAR, Schaeffler (Singapore) PTE. LTD, NTU Singapore, Schaeffler-NTU Corporate Lab: Intelligent Mechatronics Hub

## Related

- [MeanFlow-TSE: One-Step Generative Target Speaker Extraction with Mean Flow](shimizu26_interspeech.md) — same problem · relatedness 3.0/3
- [WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction](zhang26k_interspeech.md) — same problem · relatedness 2.9/3
- [UniSE: A Unified Framework for Decoder-Only Autoregressive LM-Based Speech Enhancement](yan26_interspeech.md) — shared technique · relatedness 2.6/3
- [SPOT-TSE: Spatial Point-Guided Target Speech Extraction](ryu26c_interspeech.md) — same problem · relatedness 2.6/3
- [AV-SNINet: A multi-channel audio-visual speech-noise interaction network for Target Speaker Extraction with cross-beam attention](tu26c_interspeech.md) — same problem · relatedness 2.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
