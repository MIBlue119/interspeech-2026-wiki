---
id: chen26e_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-645
pdf: https://www.isca-archive.org/interspeech_2026/chen26e_interspeech.pdf
---

# CAAD: Contrastive Audio-Aware Distillation for Efficient Speech Language Models

*Chun Wei Chen, Tzu-Quan Lin, Ke-Han Lu, Wei-Ping Huang, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-645)

**TL;DR** — Contrastive Audio-Aware Distillation (CAAD) internalizes teacher-side contrastive decoding into a single-path student speech language model using a synchronized teacher-forcing strategy, achieving an 8% relative gain on Dynamic-SUPERB over standard knowledge distillation.

## Key contributions

- Proposed CAAD, a novel distillation objective that internalizes contrastive audio-aware reasoning into student weights to eliminate dual-path inference latency.
- Introduced a synchronized teacher-forcing strategy anchored by unified text-metadata Pseudo-Ground Truths to maintain full training sequence parallelization.
- Demonstrated mitigation of linguistic bias on MCR-BENCH, where the 3B student model outperforms standard knowledge distillation and test-time contrastive decoding.
- Showed that the distilled 3B student surpasses the teacher model's greedy decoding baseline on semantic and paralinguistic Dynamic-SUPERB tasks.

## Problem

Speech Language Models (SLMs) suffer from severe modality bias, where strong internal linguistic priors dominate and cause the model to ignore acoustic evidence during multimodal reasoning. While contrastive decoding (CD) mitigates this by penalizing text-only paths, it doubles inference latency because it requires concurrent dual-path forward passes. Furthermore, applying standard knowledge distillation transfers the teacher's modal biases rather than grounding predictions in the audio. This creates an urgent need for an efficient training framework that transfers contrastive reasoning to a single-path student model without breaking training parallelization or increasing inference cost.

## Method

CAAD operates in a two-stage framework to distill contrastive audio-aware signals into a smaller student model. In Stage 1, text metadata describing gender, emotion, acoustic environment, and prosody are extracted from audio input $X^A$ and fed into the teacher's LLM backbone to generate a dense descriptive sequence called Pseudo-Ground Truth ($Y^{pseudo}$). This $Y^{pseudo}$ acts as a fixed structural anchor for both teacher paths during Stage 2.

In Stage 2, a synchronized teacher-forcing strategy utilizes $Y^{pseudo}$ to generate simultaneous full-sequence distributions for the positive path (multimodal audio-text) and the negative path (text-only with masked audio $\emptyset$). The audio-aware target logit $\hat{z}$ is computed by extrapolating the logit space away from the negative path using a guidance scaling factor $\alpha \ge 0$.

The student model $S$ is optimized using a hybrid training objective: a contrastive distillation loss ($L_{CD}$) minimizing Kullback-Leibler divergence between the student distribution and sharpened teacher targets with temperature $\tau = 2.0$, and a supervised Pseudo-GT cross-entropy loss ($L_{GT}$) to maintain linguistic fluency. The total loss is combined as $L_{total} = \lambda L_{CD} + (1 - \lambda) L_{GT}$ with $\lambda = 0.7$. Only the Q-Former modality adapter (32M parameters) is optimized while keeping the LLM backbone frozen.

## Experimental setup

The training corpus consolidates expressive speech instruction datasets from DeSTA2 (AccentDB, DailyTalk, IEMOCAP, PromptTTS, VCTK, VoxCeleb) annotated with 12 paralinguistic attributes. The teacher uses Llama-3.2-8B, and the student uses Llama-3.2-3B. Models are optimized using FusedAdam with a learning rate of $1 \times 10^{-4}$ and a cosine schedule for 70 hours on a single RTX A6000 GPU. Evaluation is conducted on Dynamic-SUPERB (covering Content, Semantic, Paralinguistic, Degradation, and Speaker dimensions) and MCR-BENCH (Speech Emotion Recognition from MELD) using Neutral, Faithful, Adversarial, and Irrelevant accuracy metrics alongside a Shift score to quantify linguistic prior reliance.

## Results

CAAD achieves an average Dynamic-SUPERB score of 54.44%, outperforming standard knowledge distillation (50.40%) and test-time contrastive decoding for the student (35.80%). On the MCR-BENCH conflict resolution benchmark, CAAD reduces the adversarial Shift score down to 79.03%, compared to 100.00% for standard KD and 90.65% for student greedy decoding, proving its robustness against misleading text priors. Ablations reveal that increasing the contrastive scaling weight $\alpha$ up to $2.0$ progressively decreases the Shift score, while text-metadata-derived Pseudo-GTs substantially outperform continuous audio-derived anchors (Dynamic-SUPERB score of 54.44 vs 49.83).

| System / Condition | Dynamic-SUPERB (ALL) ↑ | MCR-BENCH (Shift) ↓ |
| :--- | :--- | :--- |
| Teacher (8B) - Greedy Decode | 56.78 | 97.37 |
| Teacher (8B) - Contrastive Decoding | 61.79 | 83.96 |
| Student (3B) - Greedy Decode | 41.02 | 90.65 |
| Student (3B) - Standard KD | 50.40 | 100.00 |
| Student (3B) - CAAD (α = 1.0) | 55.00 | 93.78 |
| Student (3B) - CAAD (α = 2.0, Ours) | 54.44 | 79.03 |

## Limitations

The effectiveness of knowledge distillation is inherently bounded by the pre-existing capability and capacity gap of the small student language model; highly optimized small architectures may show marginal gains. The scope is primarily validated on instruction-tuned SLMs using English-centric expressive speech datasets, leaving cross-lingual scalability and extremely low-resource generalization unverified.

## Why read this

Speech and ML engineers looking to compress multimodal speech language models while resolving modality bias without incurring dual-path inference latency should read this paper. It provides a concrete recipe for internalizing contrastive decoding via metadata-anchored synchronized teacher forcing.

## Code

- https://github.com/ChenWils/Contrastive-AudioAware-Distillation.git

## Applications

Low-latency speech language assistants, spoken language understanding systems, and robust multimodal speech emotion recognition applications operating on resource-constrained edge devices.

## Related

- (link related pages by id as the wiki grows)
