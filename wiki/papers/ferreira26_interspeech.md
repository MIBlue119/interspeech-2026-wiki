---
id: ferreira26_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["Advanced Knowledge Center in Immersive Technologies", "Federal University of Goias", "Federal University of Rio Grande do Norte", "Federal University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2960
pdf: https://www.isca-archive.org/interspeech_2026/ferreira26_interspeech.pdf
---

# CAL-MOS: Bridging Layers with Adapters for Robust MOS Prediction Across Speech Foundation Models

*Alef Iury Ferreira, Pedro Botelho, Fernanda Silva, Daniel Casanova, Rafael Faustino, Frederico Oliveira, Arlindo Galvão Filho, Anderson da Silva Soares*

[PDF](https://www.isca-archive.org/interspeech_2026/ferreira26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ferreira26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2960)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — This paper evaluates ten speech foundation models across four MOS datasets to study layer utilization for non-intrusive speech quality assessment, revealing that early-to-mid layers often outperform final layers. It proposes a layer-calibrated aggregation strategy using per-layer adapters that stabilizes multi-layer fusion while keeping backbones frozen.

## Key contributions

- Conducted an empirical benchmark of ten diverse speech foundation models across four MOS datasets under three training regimes (full fine-tuning, last-layer probing, and naive weighted aggregation).
- Demonstrated that the most informative layer depth is strongly dependent on both the backbone architecture and the target evaluation dataset.
- Showed that naive cross-layer weighted-sum fusion is unstable and fails to generalize reliably across different foundation models.
- Introduced a layer-calibrated aggregation strategy (Adapter + Mean) that applies lightweight per-layer adapters before pooling to align representations, narrowing the gap to full fine-tuning.

## Problem

Objective metrics often fail to capture human perceptual nuances, making subjective Mean Opinion Score (MOS) listening tests the standard for speech quality assessment despite being expensive and unscalable. While non-intrusive automatic predictors leverage Speech Foundation Models (SFMs), prior work either wastes compute via full fine-tuning or relies exclusively on last-layer probing. Because intermediate layers retain acoustic and phonetic details while deeper layers specialize in pre-training objectives, it remains unclear how to systematically exploit multi-layer representations. Prior naive cross-layer weighted sum methods fail to account for representational incompatibility across depths, leading to unstable performance.

## Method

The framework evaluates ten SFMs—including wav2vec 2.0 Large, XLS-R (300M, 1B), MMS (300M, 1B), Wav2BERT 2.0, WavLM Large, HuBERT Large, data2vec Large, and Whisper Large v3—using various layer utilization strategies. The strategies include Last Layer (LL), Best Layer (BL) selection via layer-wise analysis, Weighted Sum (WS) using learnable normalized scalar weights, Full Fine-Tuning (FT), and the proposed Adapter + Mean (A+M) method. In A+M, each layer's hidden sequence is independently passed through an adapter comprising a linear projection, layer normalization, ReLU activation, and a second linear layer; the adapted sequences are then concatenated and masked mean-pooled across time.

The resulting utterance-level embedding is fed into a Multi-Layer Perceptron (MLP) regression head consisting of a linear projection, a ReLU activation, and a final linear output layer with predictions clipped to the [1, 5] interval. All models are trained by minimizing Mean Squared Error (MSE) using the AdamW optimizer with beta parameters set to 0.9 and 0.98, epsilon of 1e-8, weight decay of 1e-6, norm-based gradient clipping at a maximum threshold of 10, and a batch size of 64. A cosine learning rate scheduler with a 500-step linear warm-up varies learning rates between 1e-5 and 5e-5. Models underwent an initial 20-epoch screening stage across all backbones, followed by an extended 100-epoch evaluation on selected model families.

## Experimental setup

Evaluated on four MOS datasets: BVCC, BRSpeechMOS (BRS), SingMOS (SM), and TMHINT-QI (TMH). Performance is assessed using Mean Squared Error (MSE) and Spearman Rank Correlation Coefficient (SRCC) at both utterance and system levels. The study compares multiple training regimes (LL, BL, WS, FT, A+M) across five selected model families (WavLM-L, MMS-300M, XLSR-300M, Wav2BERT, HuBERT-L) during the 100-epoch main phase.

## Results

In the 100-epoch main comparison, the proposed Wav2BERT A+M configuration achieves the best overall performance, reaching an average utterance-level MSE/SRCC of 0.388/0.749 and an average system-level MSE/SRCC of 0.052/0.932. For XLSR-300M, Best Layer selection reduces average utterance-level MSE from 0.469 (LL) down to 0.417 and system-level MSE from 0.104 to 0.058 compared to the last-layer baseline. Naive weighted sum (WS) fails on models like WavLM-Large and HuBERT-Large (yielding high utterance MSEs above 0.48), whereas the A+M strategy successfully recovers and improves performance, with WavLM-L A+M achieving an average utterance MSE of 0.392 and SRCC of 0.747. The method does not uniformly dominate across all individual datasets, as MMS-300M A+M exhibits mixed MSE results due to high cross-dataset variation in layer localization.

| System / Condition | Avg. Utt. MSE | Avg. Utt. SRCC | Avg. Sys. MSE | Avg. Sys. SRCC |
|---|---|---|---|---|
| WavLM-L LL | 0.412 | 0.727 | 0.067 | 0.908 |
| WavLM-L A+M | 0.392 | 0.747 | 0.065 | 0.917 |
| XLSR-300M LL | 0.469 | 0.671 | 0.104 | 0.844 |
| XLSR-300M A+M | 0.408 | 0.745 | 0.078 | 0.913 |
| Wav2BERT LL | 0.466 | 0.660 | 0.116 | 0.817 |
| Wav2BERT A+M | 0.388 | 0.749 | 0.052 | 0.932 |

## Limitations

The study is scoped to four specific MOS datasets and five primary model families in the main evaluation, which may limit generalization to out-of-domain acoustic conditions. The adapter architecture adds parameters and computational overhead relative to frozen last-layer probing, though significantly less than full fine-tuning. Evaluation focuses primarily on multilingual and English datasets, leaving ultra low-resource or heavily accented domains underexplored.

## Why read this

Researchers and engineers building automated speech quality assessment systems will learn why defaulting to the last layer or naive weighted-sum aggregation of speech foundation models is suboptimal. It provides a principled, lightweight adapter-based recipe to harness multi-layer features without full fine-tuning costs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated non-intrusive speech quality assessment for text-to-speech, speech enhancement, and voice conversion pipeline monitoring.

## Institutions / 機構

Advanced Knowledge Center in Immersive Technologies, Federal University of Goias, Federal University of Rio Grande do Norte, Federal University of Technology

**Funding / 經費:** Advanced Knowledge Center in Immersive Technologies, PPI IoT of the MCTI, EMBRAPII

## Related

- [A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment](sultana26_interspeech.md) — same problem · relatedness 2.7/3
- [DNSMOS-C: Improving End-to-end Speech Quality Models via Contrastive Learning](liang26_interspeech.md) — same problem · relatedness 2.6/3
- [Calibration-Reasoning Framework for Descriptive Speech Quality Assessment](kostenok26_interspeech.md) — same problem · relatedness 2.5/3
- [URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment](wang26aa_interspeech.md) — same problem · relatedness 2.5/3
- [ConformalMOS: Uncertainty-Aware MOS Prediction with Conformal Intervals and Ordinal Modeling](elelu26_interspeech.md) — same problem · relatedness 2.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
