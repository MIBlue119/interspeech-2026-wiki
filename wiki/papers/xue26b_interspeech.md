---
id: xue26b_interspeech
category: paralinguistics-emotion
labels: [efficient-on-device, streaming-real-time, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-901
pdf: https://www.isca-archive.org/interspeech_2026/xue26b_interspeech.pdf
---

# Edge–Cloud Collaborative Speech Emotion Captioning via Token-Level Speculative Decoding in Audio-Language Models

*Xiangyuan Xue, Jiajun Lu, Yan Gao, Gongping Huang, Ting Dang, Hong Jia*

[PDF](https://www.isca-archive.org/interspeech_2026/xue26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-901)

**Category:** `paralinguistics-emotion` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`

**TL;DR** — The paper introduces Uncertainty-Guided Speculative Decoding (UGSD), an edge-cloud collaborative framework for speech emotion captioning that uses token-level entropy to selectively offload uncertain token blocks to a cloud verifier. This approach achieves a 62.7% BLEU improvement, 1.4x lower latency, and 8.5x higher token throughput compared to an edge-only model while keeping raw waveforms strictly local.

## Key contributions

- Proposes the first entropy-driven, token-level adaptive edge-cloud collaborative framework tailored specifically for speech emotion captioning.
- Implements an adaptive draft block length strategy (L_min=3, L_base=5, L_max=7) that scales verification frequency based on local prediction stability.
- Enables strong privacy-preserving inference by ensuring raw speech waveforms never leave the edge device, transmitting only compact features, prefixes, and drafted token IDs.
- Demonstrates robust cross-lingual generalization with evaluations on both English and Chinese subsets of the MER2024 benchmark.

## Problem

Speech Emotion Recognition (SER) is shifting from discrete categorical labels to open-ended Speech Emotion Captioning (SEC) using Large Audio-Language Models (LALMs). However, deploying 7B+ parameter LALMs on edge devices is bottlenecked by massive memory footprints and slow autoregressive generation, whereas existing Small Audio Language Models (SALMs) struggle to model subtle paralinguistic nuances. Prior edge-cloud collaborative approaches rely on static layer- or module-level partitioning, treating all tokens equally and wasting computation or under-allocating resources on emotionally salient, high-uncertainty tokens. UGSD resolves this by introducing token-level adaptive offloading driven by predictive entropy.

## Method

The framework utilizes a two-stage edge-cloud architecture. On the edge device, a lightweight SALM (Qwen2.5-Omni-3B) acts as the draft model, processing encoded speech waveforms to autoregressively generate preliminary emotion captions. The prediction uncertainty for each token index i is measured via its vocabulary-space probability distribution entropy. When the maximum entropy within a draft block of length L exceeds threshold gamma, that token span is escalated to the cloud verifier. Otherwise, tokens remain local.

The cloud verifier runs a stronger LALM (Qwen3-Omni-30B-A3B-Instruct) in bfloat16 on an NVIDIA A100 node. It evaluates escalated blocks in a single forward pass given the accepted prefix, drafted token IDs, and abstract on-device acoustic representations z_t. A rank-based acceptance rule checks whether each drafted token falls within the top-R (set to 20) most probable tokens under the cloud distribution Q_phi, accepting valid tokens and correcting the first violating token while dropping subsequent suffix tokens to prevent error propagation.

To balance communication overhead and correctness, block length L dynamically shifts among L_min = 3, L_base = 5, and L_max = 7. If the previous block requires cloud correction, L drops to L_min to increase verification frequency; if two consecutive blocks are fully accepted, L scales up to L_max to minimize cloud queries.

## Experimental setup

Evaluated on the English and Chinese subsets of the MER2024 benchmark, containing 332 recordings per language paired with human-written reference captions. The edge device runs FP32 on two CPU cores (simulating 3B SALM drafting), and the cloud runs bfloat16 on an NVIDIA A100 node (using a 30B or 7B verifier). Metrics include BLEU-1, BLEU-4, METEOR, ROUGE-L, Time to First Token (TTFT), Input Tokens Per Second (ITPS), Output End Time (OET), Output Tokens Per Second (OTPS), total inference time, and CPU/RAM/GPU utilization. Hyperparameters include entropy threshold gamma in [2.5, 5], rank R = 20, and dynamic block lengths [3, 5, 7].

## Results

UGSD with dynamic L achieves superior caption quality and throughput across both languages. On the English subset, UGSD (dynamic L) reaches 44.65 BLEU-1, 1.06 BLEU-4, 24.56 METEOR, and 20.69 ROUGE-L, outperforming the edge-only baseline (36.71 BLEU-1) and closing roughly 69% of the BLEU-1 gap to the full-cloud model (48.19). On the Chinese subset, it hits 47.37 BLEU-1, 3.27 BLEU-4, 26.15 METEOR, and 23.22 ROUGE-L, outperforming the edge baseline (39.14 BLEU-1). Efficiency-wise, UGSD reduces total inference time from 40.21s to 28.67s, decreases TTFT from 8.41s to 6.18s, boosts OTPS from 1.53 to 13.05, and drops edge RAM usage from 20.55 GB to 2.90 GB while transmitting only 18.2% of drafted tokens to the cloud.

| System / Condition | BLEU-1 ↑ | METEOR ↑ | ROUGE-L ↑ | Total Time (s) ↓ | OTPS ↑ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Edge-Only (3B CPU) | 36.71 | 13.92 | 14.38 | 40.21 | 1.53 |
| Cloud-Only (30B GPU) | 48.19 | 23.68 | 24.01 | — | — |
| UGSD (Fixed L = 3) | 39.36 | 24.15 | 19.89 | 28.47 | 12.92 |
| UGSD (Fixed L = 5) | 43.75 | 24.32 | 20.27 | 28.73 | 12.85 |
| UGSD (Fixed L = 7) | 44.05 | 23.65 | 18.46 | 29.56 | 9.76 |
| UGSD (Dynamic L) | 44.65 | 24.56 | 20.69 | 28.67 | 13.05 |

## Limitations

The framework is evaluated on a relatively small benchmark scale (332 samples per language across two languages) and relies on simulated emulation environments rather than live edge hardware deployment. While raw waveforms remain on-device, transmitting compact acoustic representations, token prefixes, and draft IDs to the cloud still carries residual privacy leakage risks. Furthermore, performance gains degrade when pairing with a smaller 7B cloud verifier due to a narrowed capacity gap.

## Why read this

Speech and ML engineers building deployable multimodal audio models should read this to learn how token-level speculative decoding can be adapted for edge-cloud collaboration in generative speech tasks, balancing latency, throughput, and privacy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time empathetic AI assistants, on-device affective computing tools, and privacy-preserving accessibility applications requiring fine-grained speech emotion descriptions.

## Institutions / 機構

University of Auckland, University of Melbourne, University of Cambridge, Wuhan University

## Related

- (link related pages by id as the wiki grows)
