---
id: fang26_interspeech
category: speaker
labels: [robustness-noise]
institutions: ["Xinjiang University", "Tsinghua University", "AGIBOT"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-11
pdf: https://www.isca-archive.org/interspeech_2026/fang26_interspeech.pdf
---

# Temporal Ensembling Threshold and Neighbor-Aware Label Mixup for Speaker Verification with Open-Set Noisy Labels

*Zhihua Fang, Shumei Tao, Liang He*

[PDF](https://www.isca-archive.org/interspeech_2026/fang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-11)

**Category:** `speaker` · **Labels:** `robustness-noise`

**TL;DR** — TET-LM is a robust speaker verification training framework that uses a temporally ensembled GMM threshold for clean/noisy sample selection and a neighbor-aware label mixup mechanism for open-set label correction, reducing EER by up to 54% over standard noisy training baselines.

## Key contributions

- Proposed a temporal ensembling threshold (TET) via exponential moving average over single-epoch GMM separation to stabilize clean and noisy sample selection.
- Introduced a neighbor-aware label mixup (LM) strategy that adapts to open-set noisy labels by blending the top-K neighbor prototypes weighted by mean-teacher outputs.
- Designed a multi-stage training pipeline (warm-up, clean-only learning, and clean-plus-mixed-label learning) tailored for varying noisy environments.
- Achieved substantial error reductions on both VoxCeleb1 and VoxCeleb2 under severe symmetric and asymmetric label corruption scenarios.

## Problem

Real-world large-scale speech dataset collections inevitably contain label noise, including open-set noise where utterances originate from unknown speakers outside the predefined label set Y. Conventional label correction methods rely on hard one-hot labels or direct soft probabilities, forcing corrections into the closed-set label space and causing severe negative transfer for open-set samples. While sample filtering methods (e.g., INLD, ES-GMM, OR-Gate) discard potential data, standard correction techniques (e.g., LNCL) break down under high noise ratios, necessitating a robust correction strategy that handles open-set distributions without discarding valuable clean-adjacent data.

## Method

The system architecture uses an ECAPA-TDNN feature extractor with 1024 channels producing 192-dimensional speaker embeddings, coupled with a linear classification layer trained via Additive Margin (AM) Softmax loss (margin m=0.2, scale s=30). During training, class prototypes are calculated as normalized embeddings of correctly predicted samples, and cosine similarities between sample embeddings and speaker centers are modeled using a two-component Gaussian Mixture Model (GMM) per epoch to establish a clean/noisy separation threshold. To overcome epoch-to-epoch threshold oscillations, a temporal ensembling threshold is computed via exponential moving average with smoothing factor alpha = 0.5: τ̄_t = α τ̄_{t-1} + (1-α)τ_t.

For label correction of open-set noisy samples identified by the threshold, a momentum-based mean-teacher model (momentum parameter beta = 0.9) produces reliable pseudo-label distributions. Instead of mapping open-set samples to hard one-hot classes, the method retrieves the K=10 closest speaker prototypes (classes) from the mean-teacher output, applies a high-confidence threshold (mu = 0.4) to revert to single-neighbor updates for high-confidence instances, normalizes the weights, and computes a neighbor-aware label mixing loss.

The training regimen follows three distinct stages: Stage 1 (Warm-up) trains the entire dataset to build basic discriminative power up to epoch t_1 (5 for Vox1, 5 for Vox2); Stage 2 trains exclusively on the isolated clean set up to epoch t_2 (40 for Vox1, 60 for Vox2); and Stage 3 halts sample selection, freezing clean boundaries, and applies the neighbor-aware mixup loss on noisy samples up to the final epoch t_3 (80 for Vox1, 100 for Vox2). Optimization uses the Adam optimizer with an initial learning rate of 0.001 decayed by 0.97 per epoch on a batch size of 256.

## Experimental setup

Experiments are evaluated on VoxCeleb1 (1,211 speakers, 148,642 utterances) and VoxCeleb2 (5,994 speakers, 5,994/1,092,009 utterances) using clean evaluation sets Vox1-O, Vox1-E, and Vox1-H. Synthetic label noise is injected into a subset of 1,000 speakers (Vox1) or 5,000 speakers (Vox2) via Symmetric noise (Sym-10% to Sym-50% uniform flips) and Asymmetric noise (Asym-20% and Asym-40% sequential gender-matched flips). Performance is measured using Equal Error Rate (EER %) and minimum Detection Cost Function (minDCF at P_target = 0.01). Baselines include Standard (noisy baseline), LNCL, OR-Gate, CEC, LESS, and ES-GMM, implemented on a single GeForce RTX 3090 GPU.

## Results

TET-LM achieves superior robustness across all noise injection setups. On VoxCeleb1 evaluated on Vox-O with 30% symmetric noise, TET-LM yields an EER of 3.63% and minDCF of 0.360, comfortably outperforming the Standard baseline (10.09% EER) and the strong ES-GMM baseline (4.10% EER). Under extreme corruption like Asym-40% on VoxCeleb1, TET-LM reaches 4.26% EER compared to 9.88% for Standard and 4.97% for ES-GMM. Across all VoxCeleb1 and VoxCeleb2 evaluations, TET-LM averages an EER of 1.38% (vs. ES-GMM's 1.45%) on Vox2-O, and a global average across tested configurations showing a 54% relative reduction in EER and 42% in minDCF compared to standard training.

| System/Condition (Vox1-O) | Sym-10% EER | Sym-30% EER | Sym-50% EER | Asym-20% EER | Asym-40% EER |
|---|---|---|---|---|---|
| Standard | 7.39 | 10.09 | 13.71 | 8.77 | 9.88 |
| LNCL [8] | 5.41 | 5.39 | 7.64 | 6.31 | 7.98 |
| OR-Gate [13] | 3.98 | 4.48 | 5.62 | 5.41 | 7.70 |
| CEC [14] | 3.74 | 4.02 | 5.72 | 3.87 | 4.69 |
| ES-GMM [12] | 3.70 | 4.10 | 4.66 | 4.00 | 4.97 |
| TET-LM (Ours) | 3.56 | 3.63 | 4.04 | 3.77 | 4.26 |

## Limitations

The evaluation relies on synthetically generated symmetric and asymmetric label noise injected into clean subsets of VoxCeleb, which may not completely capture the complex, multi-modal noise distributions found in uncurated web-scraped datasets. The framework relies on hyperparameter configurations (such as K=10 neighbors and confidence threshold mu=0.4) that require tuning and may be sensitive to different model architectures or embedding dimensions.

## Why read this

Speech researchers tackling label noise and robust representation learning should read this paper to understand how temporal threshold ensembling and neighbor-aware mixup resolve open-set label corruption in speaker verification without discarding valuable data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speaker verification deployment using uncurated or web-mined audio corpora containing high rates of mislabeled data and out-of-domain background speakers.

## Institutions / 機構

Xinjiang University, Tsinghua University, AGIBOT

**Funding / 經費:** National Natural Science Foundation of China

## Related

- [HistoMatch: Unified Transient-Steady Assessment for Noise-Robust Semi-Supervised Speaker Verification](gao26b_interspeech.md) — same problem · relatedness 2.4/3
- [NoiseLoRA-SV: Hierarchical Noise-Conditioned Adaptation with Embedding Distillation for Robust Speaker Verification](gao26_interspeech.md) — same problem · relatedness 2.3/3
- [Mixture Consistency Learning for Robust Speaker Verification in Noisy Environments](kim26c_interspeech.md) — same problem · relatedness 2.1/3
- [Revisiting Label-Free Speaker Embedding Enhancement with vMF Profile Likelihood](kim26i_interspeech.md) — same problem · relatedness 2.1/3
- [Self-supervised Speaker Verification with High-Confidence Pseudo-Label Selection and DINO-Style Self-Distillation Based on Pre-trained Models](li26ca_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
