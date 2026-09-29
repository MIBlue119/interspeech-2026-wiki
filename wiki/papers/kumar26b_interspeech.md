---
id: kumar26b_interspeech
category: speech-llm-dialogue
labels: [generative-model, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-670
pdf: https://www.isca-archive.org/interspeech_2026/kumar26b_interspeech.pdf
---

# ML-KD-DRI-GAN: Teacher-Guided Denoising and Triplet-Adversarial Training for Robust Spoken Language Understanding

*Ankit Kumar, Munir Georges*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-670)

**Category:** `speech-llm-dialogue` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — ML-KD-DRI-GAN is a teacher-guided adversarial denoising and knowledge distillation framework that maps noisy ASR embeddings onto a clean semantic manifold, achieving absolute intent classification accuracy improvements of 4.49% and 6.46% under moderate and severe ASR noise on the SLURP dataset.

## Key contributions

- Proposed ML-KD-DRI-GAN, a teacher-guided adversarial denoising framework using multi-level latent alignment to project noisy SLU embeddings onto a clean semantic manifold.
- Introduced Bi-discriminator-cooperated distillation (Bi-DCD) to transfer teacher discriminative knowledge and decision boundaries to the student discriminator at both feature and logit levels.
- Developed a unified training objective integrating adversarial learning, hierarchical semantic alignment, and teacher-student knowledge distillation while fine-tuning encoders for SLU.

## Problem

Spoken Language Understanding (SLU) pipelines rely heavily on ASR front-ends whose transcription errors (substitutions, insertions, deletions) cause severe distribution shifts between clean training data and noisy inference inputs. While pre-trained language models perform well on clean text, they are highly vulnerable to transcription errors propagating directly to downstream intent prediction. Prior representation-level alignment and text-level GAN approaches (like GAN-BERT, SpokenCSE, and CCL) fail to explicitly model denoising or transfer task-level decision boundaries across clean and noisy semantic spaces.

## Method

The framework utilizes a frozen teacher model trained on clean transcripts and a trainable student model operating on noisy inputs. The teacher generator uses an encoder-decoder architecture mapping 768-dim embeddings through 768->512->256 bottleneck dimensions, with a decoder mirror from 256->512->768. The student model contains a student generator, a student discriminator, and an auxiliary synthetic generator producing hard negative embeddings from random noise.

Student training occurs in two stages: a 10-epoch warm-up phase using only adversarial losses, followed by full joint training combining multi-level latent alignment at the generator (aligning outputs and bottlenecks between student and teacher), Bi-DCD at the discriminator (aligning intermediate bottleneck features and class logits with temperature tau=1), and a cosine-distance triplet loss. The adversarial min-max game maintains a synthetic generator for adversarial negatives alongside the teacher-aligned real embeddings.

## Experimental setup

Evaluated on the SLURP intent detection dataset comprising 50,628 training samples, 8,690 validation samples, and 10,992 test samples across 60 intent classes (average utterance length of 6.9 tokens). Noisy conditions use ASR hypotheses from Google Web API (median WER ~25%) and Wav2Vec 2.0 (median WER ~60%). Compared against Joint-BERT, SpokenCSE, DRI-GAN, CCL, and GAN-BERT baselines. Implemented with batch size 32 on NVIDIA A100 (80 GB) GPUs, averaging results over five random shuffles.

## Results

On the SLURP dataset under 25% WER noise, ML-KD-DRI-GAN achieves 86.99% intent classification accuracy, outperforming Joint-BERT (84.13%), SpokenCSE (85.26%), DRI-GAN (85.71%), CCL (86.22%), and GAN-BERT (82.50%). Under severe 60% WER noise, it achieves 73.56% accuracy, outperforming Joint-BERT (70.20%), SpokenCSE (70.31%), DRI-GAN (71.75%), CCL (73.13%), and GAN-BERT (67.10%). Ablation studies confirm incremental gains from each added component: starting from a baseline student DRI-GAN at 82.36% (25% WER), adding generator latent alignment reaches 84.48%, discriminator KD reaches 85.68%, and the full model with triplet loss reaches 86.99%. On clean data, modular embedding methods like Joint-BERT retain a slight advantage (97.12% vs. unlisted clean accuracy for the proposed method), showing minor trade-offs under zero-noise conditions.

| System | Embd. | N_0.25 | N_0.60 | Clean |
|---|---|---|---|---|
| Joint-BERT | BERT | 84.13 | 70.20 | 97.12 |
| SpokenCSE | RoBERTa | 85.26 | 70.31 | 95.82 |
| DRI-GAN | Fused | 85.71 | 71.75 | 96.99 |
| CCL | RoBERTa | 86.22 | 73.13 | 96.99 |
| GAN-BERT | BERT | 82.50 | 67.10 | 95.38 |
| ML-KD (Ours) | BERT | 86.99 | 73.56 | - |

## Limitations

The evaluation is restricted to intent detection and slot filling on the English SLURP dataset, leaving multi-language generalization untested. The framework relies heavily on pre-extracted text embeddings from BERT rather than end-to-end speech audio signals, bounding its robustness to errors unique to raw acoustic front-ends. Additionally, the multi-stage training pipeline requires a pre-trained teacher model, increasing overall compute overhead.

## Why read this

Speech and ML researchers focusing on robust spoken language understanding under severe ASR corruption will find this a definitive guide on combining teacher-student latent alignment, bi-discriminator distillation, and metric learning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust smart home voice assistants, telephony automated dialog systems, and downstream spoken language understanding modules operating in high-noise acoustic environments.

## Institutions / 機構

Galgotias University, Technische Hochschule Ingolstadt

## Related

- (link related pages by id as the wiki grows)
