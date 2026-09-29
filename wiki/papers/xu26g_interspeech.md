---
id: xu26g_interspeech
category: asr
labels: [self-supervised, robustness-noise]
institutions: ["Alibaba"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-879
pdf: https://www.isca-archive.org/interspeech_2026/xu26g_interspeech.pdf
---

# Whisper-Aware LLM: Self-Supervised Uncertainty Learning for Robust Whispered Speech Recognition

*Gaopeng Xu, Zhenyu Wang, Zheng Xue, Yinfeng Xia, Haitao Yao*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-879)

**Category:** `asr` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — The Whisper-Aware LLM framework teaches an Audio-LLM to explicitly quantify and react to the physical signal uncertainties of whispered speech, achieving a state-of-the-art 1.31% character error rate on AISHELL6-Whisper while cutting noise hallucination rates from over 25% down to 4.5%.

## Key contributions

- A self-supervised uncertainty perception mechanism integrated directly into an Audio-LLM architecture.
- Two physics-informed self-supervised auxiliary tasks (F0 contour prediction and masked spectrum reconstruction) for label-free signal uncertainty learning.
- A Confidence-Fused Decoding mechanism leveraging both global instruction embeddings and framewise attention modulation.
- A strict three-stage training protocol designed to prevent gradient conflicts between the pre-trained LLM and uncertainty modules.

## Problem

Whispered speech lacks fundamental frequency (F0) and harmonic structure, causing high signal ambiguity that drives conventional ASR systems into an accuracy-reliability trade-off: they either fail entirely on faint cues or hallucinate false transcriptions when exposed to ambient noise. Existing solutions rely on synthetic pseudowhisper data augmentations or static projection layers, which fail to handle the vast spectrum of real whisper variability. This work addresses the root cause of these failures—unquantified acoustic uncertainty—rather than just its symptoms.

## Method

The framework builds upon Qwen2-Audio, consisting of an audio encoder, an audio-LLM adapter, and a Qwen-7B decoder, augmented by a lightweight Uncertainty Perception Module (UPM). The UPM comprises a 1D-CNN and Transformer layer feeding into two prediction heads: an F0 contour prediction head trained via MSE loss, and a masked spectrum reconstruction head. Framewise confidence is derived from normalized F0 errors, and global uncertainty vectors are transformed via an MLP into instruction embeddings acting as system prompts. During LLM generation, an additive bias modulated by a learnable scalar is injected into the causal attention scores between decoder queries and uncertain encoder keys.

The training pipeline follows three strict stages: Stage 1 pre-trains the UPM for 100k steps using F0 and spectrum losses while the entire Audio-LLM backbone remains frozen. Stage 2 trains the encoder, adapter, UPM, and new decoding interfaces for 20k steps with the LLM decoder frozen. Stage 3 performs full end-to-end fine-tuning for 20k steps using a composite loss combining ASR loss and auxiliary tasks (with auxiliary weight lambda_aux = 0.1), employing LoRA (rank=64, alpha=32) on the LLM decoder. Optimization is done via AdamW with a learning rate of 1e-5.

## Experimental setup

The UPM pre-training corpus combines 6,000 hours of general speech (WenetSpeech, GigaSpeech, AISHELL-1, LibriSpeech), whispered speech (wTIMIT, AISHELL6-Whisper), and 1,000 hours of noise data. Fine-tuning uses training splits of AISHELL-1, LibriSpeech, wTIMIT, AISHELL6-Whisper, and a 200-hour noise subset. Evaluation uses AISHELL6-Whisper (Chinese) and wTIMIT (English) for whispered speech, AISHELL-1 and LibriSpeech for general ASR, and a custom Noise Hallucination Set of 1,000 files to measure hallucination rates (HR%). Compared systems include Whisper-v3, fine-tuned Whisper-v3, fine-tuned Qwen2-Audio, Qwen3-ASR, Funasr-ASR, and Seed-ASR.

## Results

The model achieves a state-of-the-art CER of 1.31% on AISHELL6-Whisper (a 17% relative reduction over Seed-ASR's 1.58%) while maintaining a normal-speech CER of 0.63%. On English wTIMIT whispered test sets, it similarly outperforms all baselines with cleaner degradation from normal to whispered conditions. On standard general-purpose benchmarks, it scores 1.34% CER on AISHELL-1 and 1.91% WER on LibriSpeech-clean, demonstrating that whisper specialization does not harm normal ASR competency. Crucially, on the Noise Hallucination Set, the model drops the hallucination rate to 4.5%, vastly outperforming baselines like Qwen3-ASR (25.2%) and Funasr-ASR (29.3%). Ablations show that adding attention modulation reduces whisper CER to 3.45%, adding global instruction alone drops it to 1.84%, and combining both reaches the optimal 1.31%.

| System | AISHELL6-Whisper (CER%) | Noise Hallucination Rate (HR%) |
|---|---|---|
| Whisper-v3 (Fine-tuned) | 6.69 | - |
| Qwen2-Audio (Fine-tuned) | 3.98 | 35.5 |
| Qwen3-ASR | 3.79 | 25.2 |
| Funasr-ASR | 19.50 | 29.3 |
| Seed-ASR | 1.58 | 25.2 |
| Ours (Whisper-Aware LLM) | 1.31 | 4.5 |

## Limitations

The evaluation relies heavily on Mandarin (AISHELL6) and English (wTIMIT) whispered corpora, leaving broader multilingual whisper robustness unverified. The framework introduces architectural modifications and a three-stage training pipeline that add engineering complexity compared to standard end-to-end fine-tuning. Performance on extremely high-noise environments where speech is completely absent relies entirely on the global instruction mechanism's thresholding behavior.

## Why read this

Researchers and engineers building robust Audio-LLMs or deploying speech recognition in adverse, low-energy, or whisper-heavy environments should read this to learn how explicit uncertainty estimation and attention modulation can resolve the accuracy-hallucination trade-off without scaling dataset sizes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Secure or private speech recognition assistants, wearable devices operating in quiet environments requiring whispered voice commands, and robust transcription systems deployed in high-ambient-noise industrial or outdoor environments.

## Institutions / 機構

Alibaba

## Related

- (link related pages by id as the wiki grows)
