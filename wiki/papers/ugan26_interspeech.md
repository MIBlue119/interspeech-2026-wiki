---
id: ugan26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1099
pdf: https://www.isca-archive.org/interspeech_2026/ugan26_interspeech.pdf
---

# Adding Robust Code-Switching Capabilities to High Performance Multilingual ASR

*Enes Yavuz Ugan, Alexander Waibel*

[PDF](https://www.isca-archive.org/interspeech_2026/ugan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ugan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1099)

**TL;DR** — This paper investigates how to add code-switching capabilities to an already strong multilingual ASR model (Whisper-large v3 turbo) without degrading its powerful monolingual baselines, showing that standard LoRA causes catastrophic forgetting while Bayesian Low-Rank Adaptation (BLoRA) successfully integrates switching knowledge. Using only synthetic text and TTS, BLoRA reduces code-switching errors (PIER) by 32.87% and overall WER by 5.31% on CSFleurs.

## Key contributions

- Identifies and defines 'Strong Multilingual Model Preservation' (Scenario 4) where adapting strong production models on synthetic data leads to severe degradation via naive fine-tuning (up to 418% relative WER increase).
- Demonstrates that the adaptation bottleneck is knowledge integration, not data complexity or synthesis sophistication.
- Applies Bayesian Low-Rank Adaptation (BLoRA) with KL regularization to learn sparse, uncertainty-aware adaptation matrices that preserve monolingual capabilities.
- Proposes a streamlined two-step data generation pipeline (GPT-4o prompting for morphological integration + x-tts-v2 stitched synthesis) requiring zero real code-switched training data.

## Problem

Real-world code-switching (CSW) speech data is scarce and expensive to collect, forcing researchers to rely on synthetic data generation. While prior work shows synthetic data improves CSW for weak baselines or models trained from scratch, applying naive fine-tuning (like standard LoRA) to already strong pre-trained multilingual foundation models severely damages their existing monolingual performance and generalizability. This paper tackles the challenge of extending high-performance production models to handle complex multi-level code-switching (including foreign morphological inflections) without destroying their robust monolingual capabilities.

## Method

The base architecture is Whisper-large v3 turbo, which is adapted using Bayesian Low-Rank Adaptation (BLoRA) with rank r = 32 and KL divergence regularization coefficient λ_KL = 0.5. BLoRA places a Bayesian prior (μ = 0, σ = 0.01) on the low-rank adaptation matrices A and B, pushing the parameter distributions toward zero and yielding exceptionally sparse updates (ΔW) compared to dense LoRA layers, which prevents catastrophic overwriting of the model's pre-trained weights.

The training data pipeline consists of two primary steps: (1) Generating synthetic code-switched text using GPT-4o (temperature 0.3) prompted with strict linguistic rules. The prompt enforces single-word substitutions following the equivalence constraint theorem, requiring English inserted words to receive correct German morphological inflections (gender, case, pluralization, and verb conjugation) and wrapping inserted words in delimiter tags (§§...§§). (2) Synthesizing audio using x-tts-v2 across 58 available speaker embeddings by automatically segmenting text via delimiter tags, synthesizing language-specific segments, and stitching them with zero-tail removal and border smoothing.

During training, BLoRA is optimized using a learning rate of 1e-3, 2000 warmup steps, and a weight decay of 5e-4 for up to 30,000 steps. Synthetic sub-segments are filtered using a Character Error Rate (CER) threshold computed via Whisper-medium to remove TTS hallucinations, with aggressive filtering (e.g., CER < 5%) yielding the highest code-switching gains at smaller data scales.

## Experimental setup

Experiments use the English-German language pair. Evaluation for code-switching is performed on CSFleurs (annotated for Point-of-Interest Error Rate, PIER), while backward testing for monolingual preservation uses CommonVoice 14.0 (German and English WER). The system is compared against standard LoRA (rank 32) and multi-stage synthetic pipelines from prior work using wav2vec2-xlsr forced alignment and DeltaLM translation. Models are trained with up to 246,503 synthetic utterances under varying CER filter thresholds (5%, 20%, 40%, and unfiltered).

## Results

Standard LoRA fine-tuning on synthetic data catastrophically damages the base model, yielding up to a 74.24% WER degradation on German and completely destroying code-switching metrics (e.g., standard LoRA PIER reaches 62.14% to 82.30% depending on data size). In stark contrast, BLoRA preserves monolingual performance while scaling gracefully with data quantity.

Using the full 246k synthetic utterances with BLoRA reduces overall German-English CSFleurs WER from 11.49% down to 10.88% (a 5.31% relative improvement) and drops the Point-of-Interest Error Rate (PIER) from 26.59% to 20.84%. Furthermore, applying an aggressive CER < 5% quality filter with only 1,000 training samples achieves a 32.87% relative reduction in PIER, proving that integration method and quality filtering outweigh sheer data volume.

| System | German WER (%) | English WER (%) | CSFleurs WER (%) | CSFleurs PIER (%) |
|---|---|---|---|---|
| Whisper (Baseline) | 8.53 | 13.56 | 11.49 | 26.59 |
| LoRA (10k utrs) | 20.80 | 50.47 | 33.61 | 62.14 |
| BLoRA (1k utrs, 5% filter) | - | - | - | 17.85 |
| BLoRA (10k utrs) | 9.77 | 13.68 | 11.37 | 22.25 |
| BLoRA (246k utrs) | 9.29 | 13.59 | 10.88 | 20.84 |

## Limitations

The evaluation is restricted to a single, high-resource language pair (English-German) where the base Whisper model already achieves exceptionally strong performance. Performance on conversational code-switching benchmarks like DECM still exhibits a residual gap due to acoustic mismatch between read-speech synthetic training data and spontaneous conversational speech. The approach relies on an off-the-shelf multilingual TTS model and LLM prompts, which may introduce domain bias or fail to cover rare dialects.

## Why read this

Researchers and engineers working with large foundation models will learn why standard fine-tuning strategies fail when applied to strong pre-trained weights and how Bayesian low-rank adaptation resolves catastrophic forgetting. It provides a blueprint for injecting new capabilities into production speech models using zero real target-domain training data.

## Code

- https://github.com/enesyugan/robust-code-switching-asr

## Applications

Deploying robust multilingual voice assistants, transcription services, and communication tools that seamlessly understand code-switched conversational speech without losing high-accuracy monolingual performance.

## Related

- (link related pages by id as the wiki grows)
