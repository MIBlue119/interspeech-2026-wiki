---
id: ai26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-228
pdf: https://www.isca-archive.org/interspeech_2026/ai26_interspeech.pdf
---

# Stabilizing Short Duration Speaker Verification through Neural Re-scoring with Hybrid Enrollment

*Zhiqi Ai, Cheng Han, Shiyi Mu, Zhiyong Chen, Yongjin Zhou, Shugong Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/ai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-228)

**TL;DR** — This paper introduces VoxPhrase, a large-scale corpus for short-duration speaker verification (SDSV), and proposes a hybrid-enrollment neural re-scoring framework that combines text-dependent and text-independent utterances to improve verification robustness. Evaluated across multiple backbone models, the hybrid approach consistently reduces Equal Error Rate (EER), achieving a best EER of 1.60% under hard-example evaluation.

## Key contributions

- Constructed VoxPhrase, a large-scale short-duration speaker verification corpus automatically derived from VoxCeleb via ASR and forced alignment.
- Uncovered a duration-dependent tradeoff: short text-dependent (TD) enrollment offers lexical alignment, whereas text-independent (TI) enrollment yields more stable representations as duration increases beyond 3 seconds.
- Proposed a parallel cross-attention neural re-scoring framework that merges utterance-level cosine similarities with frame-level local interactions.
- Demonstrated consistent EER reductions across diverse pretrained backbones (ECAPA-TDNN, CAM++, ERes2Net-L) on both in-domain and out-of-distribution (DeepMine) datasets.

## Problem

In personalized keyword spotting systems, target utterances are typically shorter than three seconds, creating a challenging short-duration speaker verification (SDSV) scenario. Existing foundation models like ECAPA-TDNN and CAM++ excel at long, text-independent utterances, but fail under short durations due to unstable speaker representations and heightened sensitivity to noise and phoneme variations. While text-dependent (TD) enrollment ensures lexical consistency, it suffers from severe duration constraints; conversely, text-independent (TI) enrollment provides richer evidence but introduces severe content mismatch with phrase-bounded test queries.

## Method

The framework utilizes a frozen pretrained speaker model (such as ECAPA-TDNN, CAM++, or ERes2Net-L) to extract both utterance-level representations ($E_u$) and frame-level features ($E_f$) from enrollment and query audio. The enrollment stage employs a hybrid strategy combining text-independent speech ($X_{ti}^e$) for stable global identity and text-dependent speech ($X_{td}^e$) for phrase consistency, while queries ($X_{td}^q$) remain text-dependent.

The neural verifier combines global utterance-level similarities ($S_{ti}$ and $S_{std}$ computed via cosine similarity) with fine-grained local interactions using a shared parallel cross-attention module. Bidirectional cross-attention computes enrollment-to-query and query-to-enrollment interactions, capturing temporal alignments across variable lengths. These attention outputs are temporally max-pooled, concatenated with global similarity scores, and fed into a lightweight MLP projection layer (with an 8-head attention configuration and a hidden dimension of 128) to output the final binary verification decision.

The entire downstream verifier module is optimized via binary cross-entropy loss on target and non-target trials, using a batch size of 256 for 25k training steps on a single RTX 4090 GPU.

## Experimental setup

Evaluations are performed on VoxPhrase (derived from Vox2-dev with 5,994 speakers for training, and Eval-1 through Eval-2 with up to 1,251 speakers) and out-of-distribution DeepMine sets (Eval-3 and Eval-4 using phrases like 'Ok Google' and 'My voice is my password'). Baselines compare pure TI enrollment (at 3s and 10s durations) against pure TD enrollment across three mainstream foundation backbones. Metrics are reported in Equal Error Rate (EER, %), incorporating hard-example mining via anchor selection strategies (top-1%, top-5%, top-10%, and random trials).

## Results

Under standard conditions, TI enrollment at 10 seconds consistently outperforms TD enrollment, demonstrating that stability benefits from longer duration outweigh lexical mismatch. For instance, using ERes2Net-L on Eval-1 (random), 10s TI achieves an EER of 2.03% compared to 2.99% for TD enrollment. Introducing the neural verifier to pure TD enrollment drops its EER from 3.62% to 3.09% using CAM++.

Combining hybrid enrollment (10s TI + TD phrase) with neural re-scoring yields substantial gains across all benchmarks, reducing the EER of CAM++ on Eval-1 (top-1%) down to 9.58% (compared to 11.33% for 10s TI alone) and hitting an overall random EER of 1.60%. On out-of-distribution DeepMine data (Eval-4), the hybrid ERes2Net-L model achieves 2.38% EER, outperforming its TI-only (3.58%) and TD-only (4.54%) configurations.

| System / Condition | Eval-1 (top-1%) | Eval-1 (random) | Eval-2 (random) | Eval-4 (DeepMine) |
|---|---|---|---|---|
| CAM++ (10s TI-Enroll) | 11.33% | 2.03% | 3.28% | 4.54% |
| CAM++ (TD-Enroll + Verifier) | 13.59% | 3.09% | 5.42% | 4.91% |
| CAM++ (Hybrid + Verifier) | 9.58% | 1.60% | 2.96% | 3.48% |
| ERes2Net-L (10s TI-Enroll) | 9.32% | 1.59% | 2.57% | 3.58% |
| ERes2Net-L (TD-Enroll + Verifier) | 11.94% | 2.68% | 4.79% | 3.22% |
| ERes2Net-L (Hybrid + Verifier) | 8.17% | 1.37% | 2.50% | 2.38% |

## Limitations

The study relies exclusively on automatically segmented ASR and forced alignment pipelines from English corpora (VoxCeleb and DeepMine), potentially inheriting transcription errors and limiting generalization to tonal or highly accented low-resource languages. The evaluation focuses primarily on fixed phrase-bounded keyword verification tasks, and the compute scope is bounded by single-GPU training (RTX 4090) keeping the trainable adapter lightweight.

## Why read this

Speech engineers and researchers building smart-device keyword spotting systems should read this to understand how to bridge the gap between text-independent foundation speaker models and short-duration text-dependent verification constraints using parallel cross-attention.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized user-defined keyword spotting, secure voice-activated assistant authentication, and short-utterance access control systems.

## Related

- (link related pages by id as the wiki grows)
