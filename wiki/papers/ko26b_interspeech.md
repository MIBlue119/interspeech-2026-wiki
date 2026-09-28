---
id: ko26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3243
pdf: https://www.isca-archive.org/interspeech_2026/ko26b_interspeech.pdf
---

# SCOLoRA: Similarity Conditioned Signed Orthogonal LoRA for Continual Speaker Adaptation

[PDF](https://www.isca-archive.org/interspeech_2026/ko26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ko26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3243)

**TL;DR** — The paper introduces SCOLoRA, a continual speaker adaptation method for ASR that uses speaker embedding similarity to dynamically balance subspace alignment and orthogonal separation, lowering average word error rate across sequential speakers.

## Problem

Deployed ASR systems face continuous distribution shifts from incoming speakers, requiring rehearsal-free adaptation to prevent catastrophic forgetting without access to past data. While low-rank adaptation and orthogonal subspace learning mitigate interference, enforcing task-agnostic orthogonality uniformly blocks knowledge transfer between acoustically similar speakers.

## Method

SCOLoRA builds upon Whisper small with frozen backbones and lightweight LoRA attention adapters (rank r=4). For each incoming speaker, an ECAPA-TDNN encoder extracts speaker embeddings, and cosine similarity is computed against past speakers. A similarity-conditioned signed controller—combining a sigmoid-based prior and a two-layer ReLU MLP router—maps similarities into signed coefficients. These coefficients weight a unit Frobenius-projected pairwise overlap regularizer, pushing similar speakers toward subspace alignment (negative coefficients) and dissimilar speakers toward orthogonal separation (positive coefficients).

## Results

Evaluated on speaker streams from TEDLIUM2, TEDLIUM3, and CHiME3 benchmarks, SCOLoRA consistently outperforms standard SeqLoRA and PEFT continual learning baselines such as EWC, L2P, O-LoRA, InfLoRA, and GainLoRA. On the TEDLIUM3 test set, SCOLoRA achieves a lower average word error rate of 4.11% compared to SeqLoRA's 4.35% and O-LoRA's 4.33%. Ablations demonstrate the sensitivity of the approach to the similarity threshold parameter tau.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers deploying automatic speech recognition systems in streaming environments who need efficient online speaker personalization.

## Limitations

The method requires tuning the similarity threshold tau and relies on the quality of the upstream ECAPA-TDNN speaker embeddings.

## Related

- (link related pages by id as the wiki grows)
