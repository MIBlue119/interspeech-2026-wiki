---
id: laquatra26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1773
pdf: https://www.isca-archive.org/interspeech_2026/laquatra26_interspeech.pdf
---

# Etiology-Aware Speech Language Models for Dysarthric Speech Recognition

*Moreno La Quatra, Alkis Koudounas, Valerio Mario Salerno, Sabato Marco Siniscalchi*

[PDF](https://www.isca-archive.org/interspeech_2026/laquatra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/laquatra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1773)

**Category:** `asr`

**TL;DR** — The paper introduces etiology-aware speech language models that explicitly generate a speaker's neurological condition as text within the autoregressive stream before transcription, achieving a state-of-the-art 7.77% WER on the Speech Accessibility Project dataset.

## Key contributions

- Systematic comparison of four clinical knowledge integration strategies for speech language models in dysarthric ASR.
- Demonstration that in-sequence etiology prediction (EP) outperforms auxiliary classification (EC) and etiology hinting (EH), proving that clinical reasoning must directly enter the decoder's generation stream.
- Establishment of cross-dataset generalization from the SAP dataset to the out-of-domain TORGO dataset without target-domain adaptation.
- Discovery that prediction accuracy does not correlate with transcription gains (e.g., EC reaches 81% accuracy but worsens WER, whereas EP reaches 72% accuracy and reduces WER).

## Problem

Standard automatic speech recognition systems ignore clinical context regarding speakers' neurological conditions (such as ALS, Parkinson's disease, stroke, cerebral palsy, and Down syndrome), leading to high error rates on highly variable dysarthric speech patterns. Prior work either treats this clinical metadata as secondary, integrates it solely at the acoustic feature encoder level, or relies on post-processing error correction rather than optimizing the transcription generation process. This gap matters because failing to leverage condition-specific acoustic-phonetic mappings limits the potential of modern speech language models to decode severely impaired speech.

## Method

The architecture builds upon the Kimi speech language model using LoRA with rank 16 and alpha 32 applied to all linear layers. The authors compare four training variations: Standard Supervised Fine-Tuning (SFT) mapping audio directly to text; Etiology Classification (EC) which adds an auxiliary cross-entropy loss from a temporal mean-pooled audio encoder classification head without feeding the prediction to the decoder; Etiology Hinting (EH) which prepends the condition as text context into the input prompt; and Etiology Prediction (EP) which forces the model to sequentially generate an etiology token prefix (e.g., 'Etiology: Parkinson's Disease Transcript: ...') within the autoregressive stream before producing the transcript.

Training uses the AdamW optimizer with a peak learning rate of 5e-5, a global batch size of 64, a 5% warmup ratio with linear decay, and runs for 3 epochs on a single node of 4 NVIDIA A100 80GB GPUs. The combined loss for EC mixes the autoregressive language modeling loss with the cross-entropy classification loss. For EP, the etiology tag is learned as part of the joint sequence distribution.

At inference time for EP, the generated etiology prefix is stripped away, requiring zero clinical metadata labels from users. This design choice forces a causal chain of acoustic analysis followed by condition-aware token generation, which outperforms both passive context hints and unconditioned encoder features.

## Experimental setup

Evaluations are performed primarily on the Speech Accessibility Project (SAP) dataset, containing 547 hours of training audio (240,047 utterances) and 81 hours of development audio (35,600 utterances) across 5 neurological conditions. Zero-shot cross-dataset evaluation uses the TORGO dataset (16,552 utterances across 15 speakers). Baselines include general ASR encoder-decoder models (Whisper Large-v3, Parakeet) and other speech language models (Phi-4, Qwen2-Audio, Granite, Kimi) fully fine-tuned or adapted via LoRA. Metrics reported are Word Error Rate (WER) and Semantic Score (SemScore).

## Results

On the SAP dataset, baseline Kimi achieves 8.30% WER, while Etiology Prediction (EP) achieves a superior 7.77% WER (a 6.4% relative reduction), alongside the highest SemScore of 91.05. Auxiliary classification (EC) reaches 81% condition accuracy but yields a worse 8.49% WER, whereas Etiology Hinting (EH) reaches 8.22% WER despite receiving oracle test-time labels. On the out-of-domain TORGO dataset without adaptation, EP establishes the best overall WER of 15.8% (outperforming standard Kimi at 18.0%), driving major improvements on non-healthy speakers (cutting sentence WER from 28.6% to 24.2%).

The approach does not win uniformly across all metrics in every single-word condition; for instance, EC achieves slightly lower WER on healthy single-word tokens in TORGO, and conditions with severe articulation impairment like Down syndrome (17.90% WER) and cerebral palsy (13.76% WER) remain highly challenging across all tested pipelines.

| System / Condition | SAP Overall WER% | SAP SemScore | TORGO Overall WER% | TORGO Overall SemScore |
| :--- | :--- | :--- | :--- | :--- |
| Kimi (SFT Baseline) | 8.30 | 90.48 | 18.0 | 79.5 |
| Kimi-EC (Classification) | 8.49 | 90.42 | 16.7 | 82.6 |
| Kimi-EH (Hinting) | 8.22 | 90.63 | 16.2 | 82.7 |
| Kimi-EP (Prediction) | 7.77 | 91.05 | 15.8 | 83.1 |

## Limitations

The methodology strictly requires ground-truth clinical condition labels during training, leaving unannotated corpora unusable without self-supervised etiology discovery. Evaluation is restricted to English utterances across five specific neurological conditions, and the performance gains are more pronounced on sentence-level text than on single-word tasks due to linguistic context availability.

## Why read this

Speech and ML researchers working on speech language models or pathological speech recognition should read this paper to understand why internalizing auxiliary reasoning tasks inside the autoregressive stream is superior to auxiliary classification heads or static prompt hinting.

## Code

- https://github.com/MorenoLaQuatra/dysarthric-asr

## Applications

Automated clinical transcription software, assistive communication devices, and robust speech recognition pipelines for individuals with severe motor-speech disorders.

## Institutions / 機構

Kore University of Enna, Sony Group Corporation, Universita degli Studi di Palermo

**Funding / 經費:** D.A.R.E. - Digital Lifelong Prevention

## Related

- (link related pages by id as the wiki grows)
