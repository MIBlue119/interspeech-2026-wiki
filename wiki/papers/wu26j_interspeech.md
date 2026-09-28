---
id: wu26j_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2037
pdf: https://www.isca-archive.org/interspeech_2026/wu26j_interspeech.pdf
---

# AuscuTSLM: Patient-Level Multimodal Question Answering from Multi-Site Auscultation Recordings

*Fan Wu, Tsai-Ning Wang, Nicolas Zumarraga, Ning Wang, Markus Kreft, Kevin O'Sullivan, Paula Manso Zorrilla, Elgar Fleisch, Oliver Aalami, Paul Schmiedmayer, Robert Jakob, Patrick Langer*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2037)

**TL;DR** — AuscuTSLM is a patient-level multimodal clinical question-answering framework that aligns multi-site physiological auscultation audio with a frozen LLM via gated cross-attention. It achieves state-of-the-art performance on the CaReSound benchmark with a 0.865 F1-macro and 0.952 BERTScore.

## Key contributions

- Proposes a patient-level multimodal question-answering framework for medical auscultation that bridges raw physiological signals and generative LLMs.
- Adapts Flamingo-style gated cross-attention and a Perceiver Resampler to aggregate multi-site, variable-length audio recordings into a fixed-length latent representation.
- Demonstrates that lightweight, domain-specific raw-waveform tokenizers match or outperform large-scale general-purpose pretrained audio encoders (e.g., Wav2Vec2, Whisper) on clinical tasks.
- Shows that multi-instance spatial aggregation across anatomical sites provides redundancy that mitigates the performance loss typically caused by temporal signal truncation.

## Problem

Traditional auscultation analysis relies on binary or multiclass classification, which reduces complex physiological signals to rigid labels and lacks natural language flexibility. General-purpose audio-language models (ALMs) like Audio Flamingo, Qwen2-Audio, and Qwen2.5-Omni are optimized for speech or environmental audio and fail to capture subtle, noise-obscured pathological patterns such as murmurs or crackles. Furthermore, prior approaches often use short-window segmentation that destroys rhythmic context and ignore multi-site anatomical relationships required for holistic clinical assessments.

## Method

AuscuTSLM processes audio recordings of up to 30 seconds (16 kHz, mono, zero-padded to 480,000 samples and patched into multiples of 640 samples or 40 ms) through either a RawAudioTokenizer (1-D convolution on raw waveform) or a MelSpectrogramTokenizer (2-D CNN on log-mel spectrograms). Alternatively, pretrained encoders such as Wav2Vec2, Whisper, or CLAP can be used. The resulting token sequences are projected into a shared D_proj-dimensional space via a LayerNorm-GELU MLP.

For patients with M recordings across different anatomical sites, a Perceiver Resampler compresses the heterogeneous multi-instance token matrices into a fixed number of learnable latent queries Z (K vectors), using joint temporal and clip-level attention. This captures cross-site dependencies without standard Transformer memory blow-ups.

The compressed audio latents are injected into a frozen Meta-LLaMA-3.2-1B backbone (total model size ~1.4B parameters) via gated cross-attention layers inserted into the LLM blocks. At each layer, LLM hidden states act as queries while the audio latents provide keys and values, controlled by a learnable scalar gate tanh(alpha_l) to preserve foundational language knowledge while grounding text generation in the physiological signal.

## Experimental setup

Evaluated on the CaReSound benchmark (comprising ICBHI, KAUH, CirCor, SPRSound, and ZCHSound datasets, totaling 2,951 patients, 8,361 audio recordings, and 32,577 QA pairs). Patient-disjoint data splits are used: 2,064 patients for training, 440 for validation, and 447 for testing (22,882 / 3,199 / 6,496 QA pairs). Evaluated against zero-shot foundational ALMs (Audio-Flamingo3 8B, Qwen2-Audio 7B, Qwen2.5-Omni 0.5B) and the fine-tuned CaReAQA (3B) baseline. Metrics include Yes/No Accuracy, Yes/No F1-macro, Contains-Match Accuracy, ROUGE-L, METEOR, and BERTScore. Trained using AdamW with effective batch size 16, component-specific learning rates (5e-6 for encoders, 1.5e-5 for adapters) on NVIDIA RTX PRO 6000 Blackwell GPUs.

## Results

AuscuTSLM achieves a state-of-the-art Yes/No F1 of 0.865 and a Contains-Match accuracy of 42.60%, outperforming the fine-tuned CaReAQA baseline by +7.75 points in Contains-Match and +1.9 points in Yes/No F1, while drastically beating zero-shot general ALMs like Audio-Flamingo3 (5.51% Contains-Match). 

In audio encoder ablations, the lightweight RawAudioTokenizer performs on par with or better than massive pretrained models, yielding 0.865 Yes/No F1 and 0.952 BERTScore, whereas Wav2Vec2 slightly underperforms (0.856 F1). Temporal context evaluations show that dropping duration from 30s to 10s causes severe performance drops, particularly in single-instance (SIL) datasets like KAUH (ROUGE-L dropping from 0.845 to 0.542), whereas multi-instance datasets are partially buffered by spatial redundancy.

| System / Condition | Yes/No Acc (%) | Yes/No F1 | Contains-Match (%) | ROUGE-L | BERTScore |
|---|---|---|---|---|---|
| Audio-Flamingo3 (8B) | 85.00 | 0.545 | 5.51 | 0.2883 | 0.8851 |
| Qwen2-Audio (7B) | 17.83 | 0.171 | 4.33 | 0.2951 | 0.8996 |
| CaReAQA (3B) | 93.12 | 0.846 | 34.85 | 0.6117 | 0.9423 |
| AuscuTSLM (Raw, 30s) | 93.50 | 0.865 | 42.60 | 0.6732 | 0.9519 |
| AuscuTSLM (Raw, 20s) | 92.00 | 0.826 | 41.30 | 0.6550 | 0.9480 |
| AuscuTSLM (Raw, 10s) | 91.10 | 0.804 | 39.50 | 0.6390 | 0.9460 |

## Limitations

The framework relies heavily on synthetic GPT-4o-generated diagnostic dialogues mapped to public auscultation datasets, which may introduce textual or clinical biases. Evaluation is limited to benchmark datasets (CaReSound) covering cardiac and respiratory sounds, lacking deployment validation on noisy, uncurated real-world clinical environments. Single-instance datasets suffer noticeably when recordings are temporally truncated, showing that the model still struggles without sufficient duration when multi-site spatial redundancy is absent.

## Why read this

Researchers and engineers working on medical audio-language models and multi-instance biosignal processing should read this to see how lightweight raw-waveform encoders combined with Perceiver Resamplers can outperform massive pretrained acoustic backbones.

## Code

- https://github.com/Fan-loewe/AuscuTSLM

## Applications

Automated clinical decision support, telemedicine screening, and interactive diagnostic question-answering for cardiopulmonary auscultation in resource-limited environments.

## Related

- (link related pages by id as the wiki grows)
