---
id: ko26b_interspeech
category: asr
institutions: ["Hanyang University", "Hankuk University of Foreign Studies"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3243
pdf: https://www.isca-archive.org/interspeech_2026/ko26b_interspeech.pdf
---

# SCOLoRA: Similarity Conditioned Signed Orthogonal LoRA for Continual Speaker Adaptation

*Ye-Eun Ko, Jae-Hong Lee, Dong-Hyun Kim, Jin-Seong Choi, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/ko26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ko26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3243)

**Category:** `asr`

**TL;DR** — SCOLoRA is a rehearsal-free continual speaker adaptation method for ASR that uses speaker embedding similarity and signed orthogonal constraints to selectively align subspaces for similar speakers and separate them for dissimilar speakers, achieving a 4.11% average WER on TEDLIUM3.

## Key contributions

- Formulates continual speaker adaptation as a practical rehearsal-free continual learning problem without revisiting historical data.
- Introduces similarity-conditioned signed orthogonal LoRA (SCOLoRA) to dynamically balance subspace transfer and orthogonal separation based on speaker embedding similarity.
- Proposes norm-fixed LoRA bases with lightweight calibration and a residual router to prevent scaling ambiguities and instability under signed coefficients.
- Demonstrates consistent WER and forgetting reductions across TEDLIUM2, TEDLIUM3, and CHiME3 speaker streams.

## Problem

Deployed automatic speech recognition systems suffer from acoustic mismatch when encountering continuous distribution shifts from incoming speakers in streaming environments. While parameter-efficient fine-tuning like LoRA and subspace separation methods such as O-LoRA mitigate catastrophic forgetting, their task-agnostic orthogonality uniformly isolates updates. This rigidity blocks positive knowledge transfer among acoustically similar speakers, necessitating a similarity-aware mechanism that controls sharing versus separation dynamically.

## Method

The architecture builds upon Whisper small with frozen backbone weights while attaching LoRA branches (rank r=4, alpha=8, dropout=0.05) to multi-head attention projection layers for each incoming speaker. Speaker embeddings are extracted using an ECAPA-TDNN encoder to compute cosine similarities between the current speaker and past speakers. A similarity-conditioned signed controller converts these cosine similarities into signed coefficients via a sigmoid prior function (slope alpha, threshold tau, max magnitude lambda_max=0.5), supplemented by a two-layer ReLU MLP residual router (hidden size 16, bounded by lambda_res=0.1) and a positive softplus-parameterized slope.

To eliminate scaling ambiguities during negative coefficient optimization, each LoRA basis matrix is projected onto the unit Frobenius sphere. The regularization objective penalizes entry-wise overlap matrices: negative coefficients encourage subspace alignment when speakers are similar (cosine similarity above threshold), while positive coefficients enforce orthogonal separation when speakers are dissimilar. The final objective combines the standard ASR training loss on the current speaker's adaptation data with the unit-norm projected signed subspace regularization term, updating only the active LoRA parameters and controller.

## Experimental setup

Evaluated on TEDLIUM2 (8-speaker stream), TEDLIUM3 (8-speaker stream, 346.17 hours training data, 3.73 dev, 3.76 test), and CHiME3 (4-speaker stream). Compared against SeqLoRA, EWC, L2P, O-LoRA, InfLoRA, and GainLoRA baselines. Metrics include Word Error Rate (WER %) and a dev-set forgetting score. Implemented in ESPnet using one NVIDIA RTX 4090 GPU with the warmupLR scheduler (1,500 warmup updates, peak LR 5e-4) and similarity thresholds tau = 0.20 and 0.25.

## Results

SCOLoRA achieves an average test WER of 4.11% on TEDLIUM3, outperforming SeqLoRA (4.35%), EWC (4.34%), L2P (4.27%), O-LoRA (4.33%), InfLoRA (4.32%), and GainLoRA (4.25%). On the CHiME3 noisy benchmark, SCOLoRA drops average WER to 22.59% compared to 28.09% for O-LoRA. Furthermore, SCOLoRA achieves the lowest forgetting score of 0.05 on TEDLIUM3 dev, improving over O-LoRA's 0.19. Ablations show that adding signed weighting, learnable alpha, and the residual router progressively drops the average test WER from 4.23% (positive-only) down to 4.11%.

| System | TEDLIUM3 Test Avg WER (%) | TEDLIUM3 Dev Avg WER (%) | Forgetting Score (Dev) |
|---|---|---|---|
| SeqLoRA | 4.35 | 4.35 | 0.10 |
| EWC [11] | 4.34 | 4.34 | 0.06 |
| L2P [27] | 4.27 | 4.27 | 0.17 |
| O-LoRA [20] | 4.33 | 4.33 | 0.19 |
| GainLoRA [29] | 4.25 | 4.25 | 0.09 |
| SCOLoRA (Ours) | 4.11 | 4.41 | 0.05 |

## Limitations

Evaluated exclusively on incremental speaker streams with a relatively small number of speakers per stream (4 to 8 speakers) rather than massive multi-speaker continual deployments. The approach relies on an auxiliary ECAPA-TDNN speaker encoder whose embedding quality directly bounds similarity estimation accuracy. Language coverage is limited to English benchmarks (TEDLIUM, CHiME3), and scalability to thousands of sequential tasks remains untested.

## Why read this

Researchers and engineers working on streaming personalization and continual learning for speech models will find a principled way to balance transfer and interference using similarity-conditioned geometric constraints. It provides a concrete blueprint for replacing task-agnostic orthogonality with similarity-aware PEFT controllers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Streaming automatic speech recognition, real-time speaker adaptation, and personalized on-device voice assistants.

## Institutions / 機構

Hanyang University, Hankuk University of Foreign Studies

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- [Retention-Preserving Gradient Projection with Entropy-Guided Token-Level Distillation for Rehearsal-Free Continual ASR](ma26d_interspeech.md) — same problem · relatedness 2.3/3
- [Parameter-Efficient Continual Learning for Automatic Speech Recognition](eeckt26_interspeech.md) — same problem · relatedness 2.2/3
- [Decoding while Adapting: Zero-Shot Online Speaker Adaptation via Audio-Textual Prompts for Elderly Speech Recognition](deng26_interspeech.md) — same problem · relatedness 2.0/3
- [Continual Adaptation for Pacific Indigenous Speech Recognition](xiao26_interspeech.md) — shared technique · relatedness 1.9/3
- [Robust Multi-Tier Infant-Centered Audio Understanding with Whisper via Structured Speaker Conditioning](fan26b_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
