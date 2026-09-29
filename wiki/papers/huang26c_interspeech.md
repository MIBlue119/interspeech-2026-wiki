---
id: huang26c_interspeech
category: asr
labels: [self-supervised, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-944
pdf: https://www.isca-archive.org/interspeech_2026/huang26c_interspeech.pdf
---

# Rethinking Entropy Minimization in Test-Time Adaptation for Autoregressive Models

*Wei-Ping Huang, Chee-En Yu, Guan-Ting Lin, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-944)

**Category:** `asr` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — This paper resolves theoretical fragmentation in test-time adaptation (TTA) for autoregressive models by deriving the exact entropy minimization gradient, which decomposes into a token-level policy gradient loss and a token-level entropy loss. Applied to Whisper ASR across 20+ domains, the proposed beam-search-guided variant reduces word error rate significantly compared to prior heuristics.

## Key contributions

- Derives the mathematically complete gradient expression for entropy minimization (EM) in generative autoregressive models, proving it decomposes into a token-level policy gradient loss and a token-level entropy loss.
- Unifies prior fragmented heuristics (teacher-forcing/pseudo-labeling and reinforcement learning) under a single theoretical framework.
- Performs large-scale empirical validation of TTA on Whisper ASR across 20+ diverse domains covering additive noise, accent shifts, and multilingual settings.
- Introduces practical optimizations including leave-one-out variance reduction, token-level normalization, and beam-search trajectory prioritization (EM-tok-b).

## Problem

While entropy minimization (EM) is standard for classification TTA in vision and non-autoregressive speech (e.g., CTC), applying it to generative autoregressive models lacks a unified mathematical foundation. Prior work relies on isolated heuristics: some use teacher-forcing with pseudo-labels (optimizing only the entropy term without trajectory distribution shifts), while others use reinforcement learning policy gradients. This theoretical gap creates ambiguity in how unsupervised online refinement should be structured for sequence-to-sequence models.

## Method

The authors formalize entropy estimation for autoregressive models using either sequence-level or token-level estimators, formally proving that the token-level estimator is unbiased under finite entropy (Theorem 1). Differentiating through the token-level entropy expectation yields the complete EM objective: L_EM^tok = L_PG^tok + L_ENT^tok, where L_PG^tok is the REINFORCE token-level policy gradient treating token entropy as a cost, and L_ENT^tok is the direct pathwise minimization of token entropy. A parallel sequence-level derivation yields L_EM^seq = L_PG^seq where the entropy derivative term vanishes.

To make this practical, the authors apply a leave-one-out baseline with token-level normalization (adapted from DAPO) for variance reduction. Because exact random sampling can be noisy, they introduce an extension using beam search (top G beams) as candidate responses (EM-tok-b), prioritizing high-probability trajectories analogously to priority sweeping in RL.

Training and adaptation use the Whisper-base model (updating only encoder and decoder LayerNorm parameters via AdamW with lr=1e-3, 10 adaptation steps per utterance, and batch/sample size G=16). Each test utterance undergoes online adaptation followed by parameter reset.

## Experimental setup

Evaluated on three ASR corpora: Corrupted LibriSpeech (LS-C; 10 MS-SNSD additive noises at 10 dB SNR), L2Arctic (6 non-native English accents), and Multilingual LibriSpeech (MLS; 7 languages). Compared against unadapted Source and Greedy-EM (standard teacher-forcing baseline using greedy decoding and token-level entropy loss). Metrics include Word Error Rate (WER %). Implemented using Whisper-base (and scaled to tiny/small/large) on a single NVIDIA RTX 3090 GPU.

## Results

On Corrupted LibriSpeech, the source model averages 22.53% WER, Greedy-EM achieves 21.91%, EM-seq yields 21.34%, EM-tok yields 20.77%, and beam-search-guided EM-tok-b achieves 19.15% WER. On L2Arctic accents, average WER drops from 19.35% (Source) and 18.77% (Greedy-EM) to 17.68% (EM-seq), 17.05% (EM-tok), and 16.21% (EM-tok-b). On Multilingual LibriSpeech, EM-tok-b reduces average WER from 24.58% (Source) to 22.63% (outperforming standard EM-tok/seq which hover around 24.07-24.17%). Ablations show that dropping either the policy gradient or the entropy loss harms performance, and sample size scaling (G=4 to 64) stabilizes the policy gradient component.

| System | LS-C (Avg 10 Noises) | L2Arctic (Avg 6 Accents) | MLS (Avg 7 Languages) |
|---|---|---|---|
| Source | 22.53% | 19.35% | 24.58% |
| Greedy-EM | 21.91% | 18.77% | 24.08% |
| EM-seq | 21.34% | 17.68% | 24.17% |
| EM-tok | 20.77% | 17.05% | 24.07% |
| EM-tok-b | 19.15% | 16.21% | 22.63% |

## Limitations

Evaluated primarily on Whisper-base (with limited scaling tests to tiny, small, and large) and restricted to the ASR task. The beam search variant (EM-tok-b) introduces a theoretical bias by restricting expectations to top-G beams rather than full random sampling. Computational overhead per utterance is higher than standard inference due to online gradient updates and multi-sample generation.

## Why read this

Speech researchers and ML engineers looking for a mathematically rigorous foundation for test-time adaptation in generative sequence models should read this to understand why partial heuristics fall short and how to correctly combine policy gradients with entropy minimization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust online adaptation of automatic speech recognition (ASR) systems deployed in acoustically adverse, accented, or multilingual real-world environments.

## Institutions / 機構

National Taiwan University

**Funding / 經費:** Ministry of Education, Taiwan Centers of Excellence in Artificial Intelligence, NTU Artificial Intelligence Center of Research Excellence

## Related

- (link related pages by id as the wiki grows)
