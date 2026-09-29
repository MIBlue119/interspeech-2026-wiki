---
id: kuan26_interspeech
category: tts
labels: [dataset-or-benchmark-release, generative-model]
institutions: ["National Taiwan University", "Amazon"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1111
pdf: https://www.isca-archive.org/interspeech_2026/kuan26_interspeech.pdf
---

# Improving Text-to-Audio Instruction Following via Fine-Grained Feedback from Audio-Aware Large Language Models

*Chun-Yi Kuan, Siwon Kim, Byeonggeun Kim, Suyoun Kim, Bo-Ru Lu, Qingming Tang, Ankur Gandhe, Hung-yi Lee, Chieh-Chi Kao, Chao Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/kuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1111)

**Category:** `tts` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — The paper proposes AJPO (ALLM-Judged Preference Optimization), which uses audio-aware large language models as structured judges to evaluate multi-event presence and temporal order in generated audio, creating preference pairs for DPO. This significantly improves text-to-audio instruction-following accuracy—raising joint accuracy on the new S3Bench narrative benchmark from 35.3% to 49.9%—while preserving audio fidelity.

## Key contributions

- Formulates text-to-audio instruction following around two explicit, fine-grained criteria: sound event existence and temporal ordering.
- Validates that off-the-shelf audio-aware large language models (ALLMs) can act as reliable instruction-level judges via audio understanding benchmarks and human verification studies.
- Proposes ALLM-Judged Preference Optimization (AJPO), a direct preference optimization framework driven by dynamic, structured ALLM feedback.
- Introduces the Sound Scene Story Benchmark (S3Bench), a 1,200-instance narrative evaluation suite featuring multi-event scenarios and temporal progressions (sequential and overlapping).

## Problem

Modern text-to-audio (TTA) systems (such as diffusion and flow-matching models) achieve high global audio quality and strong coarse-grained similarity scores (e.g., FAD, CLAPScore), but frequently fail to follow multi-event instructions with specific temporal order constraints (e.g., rainfall followed by a door opening, then cars passing). Existing evaluation and training objectives focus on global audio-text similarity rather than instruction-level correctness, and popular models like CLAP are fundamentally insensitive to temporal event sequencing and missing secondary events. This creates a mismatch between what current training objectives reward and what users expect from instruction-following TTA systems.

## Method

The framework operates in three stages: evaluation, preference construction, and model optimization. First, an ALLM (Qwen2.5-Omni-7B for evaluation, Qwen2.5-Omni-3B as a reward model) ingests generated audio and the text prompt to output explicit binary judgments on target sound event existence ($E = \{e_1, \dots, e_N\}$ yielding an existence score $s_{exist} \in [0, 1]$) and predicted occurrence ranks (yielding a temporal order score $s_{order}$ via Kendall's Tau $\tau \in [-1, 1]$).

For each training prompt, multiple candidate audio generations are sampled from the current TTA model and scored. An anchor sample $a^+$ must satisfy $s_{exist}(a^+, t) = 1.0$ and $s_{order}(a^+, t) = 1.0$. Rejected samples $a^-$ are selected either by exhibiting complete event presence but violating temporal order, or by exhibiting incomplete event generation. These structured preference pairs are used to optimize the base TTA model (TangoFlux-base) using Direct Preference Optimization (DPO).

The training recipe constructs 60k preference samples using AudioCaps training captions and ESC-50-derived temporal templates (e.g., 'It starts with $e_1$, shifts to $e_2$, and ends with $e_3$'). Optimization is performed on 8 NVIDIA A100 GPUs with a global batch size of 128, a learning rate of $1 \times 10^{-4}$ with linear decay, and 500 warm-up steps. The paper also explores iterative Online DPO, where candidate generations and preference pairs are dynamically refreshed across 5 iterations to prevent data staleness.

## Experimental setup

Evaluated on AudioCaps-test, CompA, AudioTime, synthetic multi-event ESC-50 concatenations (MultiEvent-Temporal-2/3/4), and the newly introduced S3Bench (1,200 narrative instances containing 2 to 4 events, including overlapping events). Compared against AudioLDM2-full-large, EzAudio-XL, Stable-Audio-Open, Tango2, TangoFlux-base, and TangoFlux-CRPO. Metrics include Exact Match (EM), Micro Accuracy, Pairwise Accuracy, Kendall's Tau ($\tau$), Joint Accuracy (requires both existence and temporal order correct), alongside standard audio metrics (FAD, FD, KL, IS, CLAPScore) and human evaluation (Relevance and Overall Quality on a 1-5 scale).

## Results

On AudioCaps-test, the proposed method achieves an existence EM of 87.4%, temporal EM of 89.1%, Kendall's Tau of 0.86, and a headline Joint Accuracy of 71.0% (vs. TangoFlux-CRPO's 67.4% and TangoFlux-base's 67.1%), while maintaining competitive FAD (3.31) and KL divergence (1.16). On the demanding S3Bench, the method substantially outperforms TangoFlux-CRPO, raising Joint Accuracy from 45.4% to 49.9% and temporal Kendall's Tau from 0.85 to 0.89.

Ablations demonstrate that fine-grained ALLM feedback is vital: replacing ALLM feedback with global CLAP-DPO drops Joint Accuracy on MultiEvent-Temporal-3 from 55.0% down to 37.3%. Static preference baselines degrade after two iterations of online training due to data staleness, whereas dynamic Online DPO continuously improves joint accuracy up to 3-4 iterations. Human evaluation confirms superior text relevance (REL score of 4.28 vs. 3.55 for CLAP-DPO) without sacrificing perceived audio quality.

| System | Existence EM (%) | Temporal EM (%) | Kendall's Tau | Joint Accuracy (%) | CLAPScore |
|---|---|---|---|---|---|
| AudioLDM2 | 52.8 | 56.8 | 0.26 | 20.6 | 0.264 |
| EzAudio | 84.3 | 72.5 | 0.63 | 51.8 | 0.414 |
| Tango2 | 83.9 | 77.4 | 0.68 | 56.3 | 0.373 |
| TangoFlux-base | 84.8 | 85.2 | 0.89 | 67.1 | 0.365 |
| TangoFlux-CRPO | 87.4 | 85.7 | 0.81 | 67.4 | 0.397 |
| Ours (ALLM-DPO) | 87.4 | 89.1 | 0.86 | 71.0 | 0.375 |

## Limitations

The approach relies heavily on the reasoning capacity of off-the-shelf ALLMs (e.g., Qwen2.5-Omni), which can still exhibit ambiguity or performance degradation when handling heavily overlapping real-world sounds and extreme background noise. Furthermore, constructing preference pairs via online multi-iteration candidate generation and ALLM scoring incurs high computational overhead during training compared to static dataset approaches.

## Why read this

Read this if you work on text-to-audio generation or fine-grained controllable audio synthesis and want to move beyond coarse global embeddings (like CLAP) toward scalable, model-judged preference optimization for complex temporal multi-event instructions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Controllable sound effect generation for video production, immersive game audio design, and narrative-driven Foley sound synthesis.

## Institutions / 機構

National Taiwan University, Amazon

## Related

- (link related pages by id as the wiki grows)
