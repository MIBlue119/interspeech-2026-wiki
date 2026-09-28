---
id: huang26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-944
pdf: https://www.isca-archive.org/interspeech_2026/huang26c_interspeech.pdf
---

# Rethinking Entropy Minimization in Test-Time Adaptation for Autoregressive Models

[PDF](https://www.isca-archive.org/interspeech_2026/huang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-944)

**TL;DR** — This paper establishes a mathematically rigorous formulation of entropy minimization for test-time adaptation in autoregressive models, decomposing it into token-level policy gradient and entropy losses to improve Whisper ASR performance across over 20 diverse domains.

## Problem

Test-time adaptation via entropy minimization works well for classification tasks, but its application to generative autoregressive models remains theoretically fragmented. Existing approaches rely on heuristics like teacher-forcing with pseudo-labels or reinforcement learning without a unified mathematical foundation. This ambiguity prevents a principled understanding of how to properly minimize sequence-level uncertainty during inference.

## Method

The authors derive the exact gradient expression of entropy minimization for autoregressive models using token-level entropy estimators and prove their unbiasedness via the monotone convergence theorem. They demonstrate that the correct objective naturally decomposes into a token-level policy gradient loss and a token-level entropy loss. To handle the high variance of reinforcement learning optimization, they incorporate a leave-one-out baseline alongside token-level normalization from DAPO. The framework is applied to Whisper ASR as a testbed for single-utterance test-time adaptation.

## Results

Tested using Whisper ASR across more than 20 diverse domains covering acoustic noise, accents, and multilingual settings, the proposed principled entropy minimization framework consistently outperforms unadapted baselines and heuristic-only variants. The experiments evaluate robustness on non-native accents using the L2-ARCTIC corpus, multilingual scenarios via MLS and Common Voice, and various acoustic noise conditions. Ablations validate that both the token-level policy gradient loss and the token-level entropy loss components are necessary to capture the full probabilistic structure of autoregressive generation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers deploying autoregressive speech recognition models in mismatched real-world environments with domain shifts, acoustic noise, or unseen accents.

## Related

- (link related pages by id as the wiki grows)
