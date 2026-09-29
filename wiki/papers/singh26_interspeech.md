---
id: singh26_interspeech
category: asr
labels: [low-resource, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1501
pdf: https://www.isca-archive.org/interspeech_2026/singh26_interspeech.pdf
---

# Low-Burden Data Augmentation for Dysarthric ASR via Zero-Shot Voice Cloning

*Satwinder Singh, Qianli Wang, Zihan Zhong, Clarion Mendes, Mark Hasegawa-Johnson, Waleed Abdulla, Seyed Reza Shahamiri*

[PDF](https://www.isca-archive.org/interspeech_2026/singh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1501)

**Category:** `asr` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — Zero-shot voice cloning using Higgs Audio V2 from a single reference utterance per speaker successfully generates synthetic training data for dysarthric ASR, reducing Word Error Rate from 31.62% to 26.00% on the TORGO dataset.

## Key contributions

- Demonstrates that single-utterance zero-shot voice cloning (using Higgs Audio V2) can provide scalable training data for dysarthric ASR without requiring multi-session data collection.
- Conducts a data scaling analysis revealing a non-monotonic performance curve with an optimal sweet spot at 15 hours of synthetic speech.
- Shows that synthetic clone data and hybrid training outperform real-only data fine-tuning for moderate-severe and severe dysarthric speakers.
- Proves cross-corpus generalization on the SAP-1102 challenge dataset, lowering overall WER from 14.50% to 12.84%.

## Problem

Automatic speech recognition struggles significantly with dysarthric speech due to severe data scarcity, heavy inter-speaker variability across pathologies (like cerebral palsy, ALS, and Parkinson's), and high intra-speaker variability from fatigue or disease progression. Collecting real dysarthric corpora is exceptionally slow, expensive, and burdensome for patients who fatigue quickly. Prior augmentation strategies like conventional signal-level perturbations fail to model complex lexical and acoustic-phonetic distortions, while classical TTS and voice conversion methods require multiple reference utterances or speaker-specific fine-tuning, thereby failing to eliminate the data collection bottleneck.

## Method

The authors adopt Higgs Audio V2, a 5-billion parameter audio foundation model trained on over 10 million hours, to perform zero-shot voice cloning. For each of the 8 TORGO speakers, a single reference utterance averaging 7.2 seconds (using the phonetically rich sentence 'The quick brown fox jumps over the lazy dog') and a simple system prompt ('Generate audio following instruction') are fed into the model with sampling parameters set to temperature 1.0, top-k 50, and top-p 0.95. Out-of-domain text prompts are sourced from the LibriSpeech 100h dataset (filtered to 3-20 words, removing overlaps with TORGO and SAP-1102) to generate 18 hours of synthetic audio named TORGO-Synth (15h train, 3h validation).

The downstream ASR model is the multilingual Whisper-medium model containing 769M parameters, processing 80 log-Mel filterbank energies through its encoder-decoder Transformer architecture. Fine-tuning uses an effective batch size of 32, a learning rate of 5e-6, and weight decay of 0.01. Decoding relies on beam search with a beam size of 10 and no_repeat_ngram_size of 3. Four configurations are tested: Zero-shot (no fine-tuning), Real (fine-tuned on real TORGO data), Clone (fine-tuned on TORGO-Synth), and Hybrid (fine-tuned on both real and synthetic data).

## Experimental setup

Evaluated on the TORGO dataset (23 hours from 8 dysarthric speakers across severe, moderate-severe, moderate, and mild categories) and the SAP-1102 challenge dataset (500 novel-sentence utterances across 58 unique speakers with cerebral palsy, ALS, and Parkinson's disease). Metrics include Word Error Rate (WER), speaker embedding similarity via NVIDIA TitaNet cosine distance, and 2D t-SNE projections. Implementation details include Whisper-medium (769M parameters) trained with effective batch size 32, learning rate 5e-6, and weight decay 0.01.

## Results

Fine-tuning on real TORGO data achieves an overall WER of 24.44% (a 7.18 pp absolute reduction from the 31.62% zero-shot baseline). However, for the challenging Moderate-Severe cohort, Clone FT (39.95% WER) and Hybrid FT (37.49% WER) outperform Real FT (42.19% WER), with the Hybrid configuration yielding a 31.4% relative WERR in that group. The scaling experiments reveal that 15 hours of synthetic data hits the optimal sweet spot (26.00% overall WER); scaling beyond 20 hours degrades performance due to overfitting on synthetic acoustic artifacts. Mild speakers see little benefit from synthetic data since their baseline is already near-ceiling (2.30%–3.17% WER), and moderate speaker M05 acts as a zero-shot outlier where fine-tuning underperforms. In cross-corpus transfer on SAP-1102, Clone FT reduces overall WER from 14.50% to 12.84%, with dramatic improvements on the cerebral palsy cohort (down from 54.7% to 41.6% WER).

| System / Condition | Severe (TORGO) | Mod-Severe (TORGO) | Overall TORGO | SAP-1102 Overall |
|---|---|---|---|---|
| Zero-Shot Baseline | 82.32% | 54.68% | 31.62% | 14.50% |
| Real FT | 60.22% | 42.19% | 24.44% | 14.40% |
| Clone FT (15h) | 63.54% | 39.95% | 26.00% | 12.84% |
| Hybrid FT | 62.43% | 37.49% | 25.12% | 14.30% |

## Limitations

The study is restricted to a small cohort of 8 TORGO speakers, limiting absolute demographic and etiological coverage. The synthetic data volume sweep shows performance degradation past 20 hours due to the accumulation of acoustic artifacts. Furthermore, synthetic augmentation can hurt performance on mild or moderate speakers whose baseline intelligibility is already high, indicating a lack of severity-aware adaptation controls.

## Why read this

Speech and ML researchers building inclusive ASR systems for pathological speech should read this paper to understand how zero-shot voice cloning can bypass data collection bottlenecks for severe speakers. It provides concrete engineering takeaways on optimal data volumes (15 hours) and highlights trade-offs when applying synthetic augmentation to mild versus severe impairments.

## Code

- https://ai-research-submissions.github.io/interspeech_audio_samples/

## Applications

Personalized and robust automatic speech recognition systems for individuals with motor speech impairments, neurological conditions, and dysarthria.

## Institutions / 機構

DeepNet Discovery Network, University of Auckland, University of Illinois Urbana-Champaign

## Related

- (link related pages by id as the wiki grows)
