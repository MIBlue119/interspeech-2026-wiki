---
id: dahal26_interspeech
category: asr
institutions: ["Universidad Politecnica de Madrid", "National University of Singapore"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-322
pdf: https://www.isca-archive.org/interspeech_2026/dahal26_interspeech.pdf
---

# Mixture of Phonetic Experts Based Low-Rank Adaptation of Conformer Models for Accented English Speech Recognition

*Santosh Dahal, Anmol Guragain, Tianchi Liu, Luis Fernando D'Haro, Kiran Chandra Dahal*

[PDF](https://www.isca-archive.org/interspeech_2026/dahal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dahal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-322)

**Category:** `asr`

**TL;DR** — MoPE-LoRA introduces a parameter-efficient adaptation framework for accented English speech recognition that routes frames through six phoneme-category low-rank experts instead of accent-specific modules, achieving 10.43% WER on L2-ARCTIC.

## Key contributions

- Replaces accent-specific Mixture-of-Experts with a fixed set of six low-rank phonetic experts aligned with manner-of-articulation classes (Vowels, Stops, Fricatives, Affricates, Nasals, Liquids/Glides).
- Introduces a hybrid frame-level routing mechanism combining external phoneme supervision from a frozen CTC model with learnable acoustic gating.
- Applies LoRA routing selectively to Query, Key, and Value projections in Conformer encoder layers 6 through 16.
- Demonstrates strong zero-shot generalization to completely unseen accents without requiring accent labels or fine-tuning.

## Problem

Standard speech recognition systems degrade on non-native or accented English because they fail to capture systematic pronunciation shifts and phonetic distortions. Conventional mixture-of-experts or domain-adversarial strategies allocate experts per accent or language, which requires accent identity at inference and scales poorly with new accents. Furthermore, standard LoRA applies a uniform update across all phonetic contexts without modeling fine-grained articulatory variations.

## Method

The framework builds on a NeMo Conformer CTC Small model (~13M parameters) by inserting low-rank adapters (rank r=8, scaling factor alpha=16) into the Q, K, and V projection matrices of encoder layers 6 through 16. The model uses six phonetic experts corresponding to manner-of-articulation classes (Vowels, Stops, Fricatives, Affricates, Nasals, and Liquids/Glides). For each frame, routing combines a learnable acoustic gating network and supervised frame-level assignments derived from a frozen, LibriSpeech-trained phoneme CTC model. The hybrid routing probability blends both signals using a learnable weight beta.

To balance expert usage and prevent overconfident routing, the training objective combines Connectionist Temporal Classification (CTC) loss with a load-balancing loss (lambda_balance = 0.01) and a router Z-loss (lambda_z = 0.001). Top-2 expert selection (k=2) is used per frame to handle coarticulation effects and phoneme boundary transitions, ensuring smooth gradient flow and robust routing even when cross-domain phoneme predictions are imperfect. No accent-specific modules or labels are required during training or inference.

## Experimental setup

Evaluated primarily on the L2-ARCTIC dataset (~24 hours across 24 speakers, 6 L1 backgrounds: Arabic, Hindi, Korean, Mandarin, Spanish, Vietnamese) using speaker- and sentence-disjoint 4-fold cross-validation. Compared against unadapted Conformer, Full Fine-Tuning, MAS-LoRA (~244M parameters), and various Single LoRA configurations (varying layers and Q/K/V projections). Metrics include Word Error Rate (WER) for ASR and Phoneme Error Rate (PER) for the auxiliary phoneme model. Implemented using PyTorch on an NVIDIA RTX 5090, training for 50 epochs with a batch size of 16 and a peak learning rate of 1e-3 with cosine annealing.

## Results

MoPE-QKV (layers 6–16) achieves a headline WER of 10.43% on L2-ARCTIC, outperforming Full Fine-Tuning (12.80%), MAS-LoRA (11.77%), and Single LoRA-QKV across all layers 1–16 (11.33%) while utilizing only 13.6M total parameters. In zero-shot evaluation where one accent is completely held out during training, MoPE achieves a mean WER of 9.98%, representing a 12.3% relative improvement over Single LoRA (11.38%) and 44.3% over the unadapted baseline (17.93%). Ablations confirm that including middle layers (6–16) is critical for capturing phonetic information, whereas restricting adaptation solely to early or late layers yields higher error rates.

| System | Total Params (M) | WER (%) | Zero-Shot Mean WER (%) |
|---|---|---|---|
| No FT | 13.0 | 30.82 | 17.93 |
| Full FT | 13.0 | 12.80 | 12.58 |
| Single LoRA-QKV (1-16) | 13.1 | 11.33 | 11.38 |
| MAS-LoRA [10] | ~244.0 | 11.77 | - |
| MoPE-QKV (6-16) | 13.6 | 10.43 | 9.98 |

## Limitations

The framework relies on an auxiliary, pre-trained phoneme model to supply supervisory signals, which may introduce bottlenecks or transfer errors when target acoustic conditions diverge severely. Evaluation is limited to the L2-ARCTIC dataset consisting of read English speech from six native language backgrounds, leaving open how the phonetic experts handle spontaneous conversational speech or a broader array of global accents.

## Why read this

Speech researchers and engineers working on accent-robust or parameter-efficient ASR should read this paper to see how grounding MoE routing in linguistic articulatory classes rather than accent IDs dramatically improves zero-shot transfer to unseen accents.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust multi-accent automatic speech recognition systems for voice assistants, transcription software, and telecommunication services operating in multilingual environments.

## Institutions / 機構

Universidad Politecnica de Madrid, National University of Singapore

**Funding / 經費:** BRAINS, MCIN, AEI, European Regional Development Fund, European Union, Comunidad de Madrid

## Related

- (link related pages by id as the wiki grows)
