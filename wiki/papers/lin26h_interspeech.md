---
id: lin26h_interspeech
category: resources-evaluation
labels: [low-resource, self-supervised, robustness-noise]
institutions: ["Southern University of Science and Technology", "Academia Sinica"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1567
pdf: https://www.isca-archive.org/interspeech_2026/lin26h_interspeech.pdf
---

# Improving Cross-Dataset Speech Intelligibility Prediction for Hearing-Impaired Listeners with Few-Shot Adaptation

*Guojian Lin, Xuefei Wang, Ryandhimas E. Zezario, Yu Tsao, Fei Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1567)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `self-supervised`, `robustness-noise`

**TL;DR** — CFA-SIPNet is a speech intelligibility prediction network for hearing-impaired listeners that combines source-domain pretraining with lightweight domain adapters and embedding contrastive learning, achieving an 8.5% relative RMSE reduction over SOTA cross-dataset baselines using under 20% of target-domain training data.

## Key contributions

- Proposes CFA-SIPNet, a two-stage framework consisting of supervised source pretraining and target-domain few-shot adaptation for hearing-impaired speech intelligibility prediction.
- Integrates parameter-efficient bottleneck adapter modules (projecting to a 128-dimensional space with ReLU) inside Transformer encoder layers to prevent catastrophic forgetting during transfer.
- Introduces an embedding contrastive learning (ECL) objective based on ground-truth intelligibility score differences to widen margins between high- and low-intelligibility utterances.
- Demonstrates that training with fewer than 20% of target samples (100 per listener, total 600) outperforms models trained on 100% of the in-domain target dataset.

## Problem

Predicting speech intelligibility for hearing-impaired listeners suffers from severe performance degradation when models generalize across unseen datasets, acoustic environments, or listener groups due to domain shifts and costly listening tests. Prior approaches like zero-shot evaluation, full fine-tuning, or data augmentation (e.g., ZipEnhancer + MP-SENet 2-clips) rely on point-wise regression errors (MSE) without explicitly modeling fine-grained feature distinctions between high- and low-intelligibility speech under scarce supervision. This leaves models vulnerable to out-of-domain distribution shifts where annotated target data is extremely limited.

## Method

CFA-SIPNet operates in two stages: supervised source pretraining and few-shot adaptation. During pretraining, left- and right-channel audio are processed separately by pretrained WavLM-Large and Whisper-Large v3 speech foundation models to extract representations, which are fused via temporal interleaved concatenation. A 3-layer Transformer encoder backbone with positional encoding processes the fusion output, trained using a combined objective of Mean Squared Error (LMSE) and a rank-based contrastive loss (Lrank) with weighting factor lambda=0.5 over 30 epochs.

In the few-shot adaptation stage, the foundation model and Transformer blocks are frozen, while lightweight bottleneck adapter modules, embedding projection layers, and score estimation MLPs are fine-tuned on 100 samples per target listener for 15 epochs. Each adapter compresses features to 128 dimensions via a linear layer, applies ReLU, maps back to the original dimension via a second linear layer, and uses dropout. An utterance-level embedding contrastive learning (ECL) loss (Lembed) enforces cosine similarity maximization for sample pairs with similar intelligibility scores (absolute difference below threshold tau=0.4) and minimization for dissimilar scores. The total fine-tuning loss combines LMSE, Lrank, and Lembed with coefficients lambda1=0.5, lambda2=0.2, and lambda3=0.3.

## Experimental setup

Evaluated on the Clarity Prediction Challenge 3 (CPC3) dataset (15,464 pretraining samples from 33 HI listeners at 32 kHz) as the source domain, and the Arehart dataset (8,100 samples from 15 HI listeners at 22.05 kHz, split into 6,480 training and 1,620 test samples from 3 unseen listeners) as the target domain. Baselines include the CPC2 Champion model and ZipEnhancer + MP-SENet evaluated under zero-shot, 2-clips augmentation, and full in-domain training. Evaluation metrics are Root Mean Square Error (RMSE) and Pearson Correlation Coefficient (PCC). Models use WavLM-Large and Whisper-Large v3 backbones, optimized with Adam (lr=1e-4 for pretraining, 5e-5 for adaptation).

## Results

On the Arehart cross-dataset test set, CFA-SIPNet achieves an RMSE of 26.05 and PCC of 0.75, outperforming the SOTA ZipEnhancer + MP-SENet (2-Clips baseline: RMSE 28.48, PCC 0.72). Notably, training with a few-shot set of 100 samples per listener (under 20% of the target data) yields a PCC of 0.75, matching the performance ceiling of full target-domain training (PCC 0.72-0.74 depending on strategy) while dropping RMSE below full in-domain training (27.23). Ablation studies show that removing adapters and embedding contrastive learning causes the largest performance drop (RMSE spiking to 28.87, PCC dropping to 0.71), proving that modeling target-domain intelligibility discrimination is more critical than source pretraining alone (which yields RMSE 26.91, PCC 0.73 when ablated).

| Model | Strategy | RMSE | PCC |
|---|---|---|---|
| ZipEnhancer + MP-SENet [16] | Zero-Shot | 31.52 | 0.64 |
| ZipEnhancer + MP-SENet [16] | 2-Clips Augmentation | 28.48 | 0.72 |
| ZipEnhancer + MP-SENet [16] | Full Training (100%) | 26.12 | 0.73 |
| CFA-SIPNet (Ours) | Few-Shot Adaptation (100 samples) | 26.05 | 0.75 |

## Limitations

Evaluated exclusively on two binaural hearing-impaired datasets (CPC3 and Arehart) with limited language and listener demographics. The approach requires a pre-existing large source-domain dataset with acoustic distortion profiles similar to the target deployment scenario, and its few-shot adaptation assumes access to balanced intelligibility score distributions within the K=100 sample subset.

## Why read this

Speech and ML researchers tackling cross-domain generalization and low-resource adaptation for audio quality metrics will find a blueprint for combining parameter-efficient bottleneck adapters with contrastive margin losses on foundation model embeddings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Evaluation and automated optimization of hearing aids, cochlear implants, and speech enhancement algorithms for hearing-impaired users.

## Institutions / 機構

Southern University of Science and Technology, Academia Sinica

**Funding / 經費:** National Key Research and Development Program of China, National Natural Science Foundation of China, Shenzhen Key Technology Program Funding, Center for Computational Science and Engineering at Southern University of Science and Technology

## Related

- (link related pages by id as the wiki grows)
