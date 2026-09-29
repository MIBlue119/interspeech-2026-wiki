---
id: getman26b_interspeech
category: asr
labels: [self-supervised]
institutions: ["Aalto University", "South East Technological University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-566
pdf: https://www.isca-archive.org/interspeech_2026/getman26b_interspeech.pdf
---

# Do Learned Layer Weights Reflect Pretrained Information Structure in Self-Supervised Speech Models?

*Yaroslav Getman, Tamás Grósz, Mikko Kurimo*

[PDF](https://www.isca-archive.org/interspeech_2026/getman26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/getman26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-566)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper re-evaluates the informativeness of learned layer weights in self-supervised speech models, showing that they systematically reflect internal pretrained information structures (measured via adjusted mutual information with phone and word labels) rather than being arbitrary, especially for contrastive models under low-resource supervision.

## Key contributions

- Demonstrates significant rank correlations between ML-SUPERB ASR layer weights and layerwise adjusted mutual information (AMI) across 13 SSL models spanning three objectives and scales.
- Reveals that weight-AMI alignment is substantially stronger under limited supervision (10 minutes of labeled data) compared to 1 hour, where additional data concentrates weights into narrower distributions.
- Shows that contrastive pretraining objectives (wav2vec 2.0 family) yield markedly stronger and more consistent weight-AMI correlations (mean rho up to 0.91) than clustering-based or denoising models (HuBERT, WavLM).
- Addresses prior misconceptions that learned layer weights are unreliable indicators of internal model behavior by evaluating full weight distribution correspondence instead of single-layer performance.

## Problem

Prior benchmark studies concluded that learned layer weights in frozen self-supervised speech backbones are unreliable indicators of internal model behavior because they show weak correlation with single-layer task performance (rho values of 0.39 to 0.71). However, these previous interpretations incorrectly equated weight informativeness with direct single-layer performance predictability. The authors investigate whether learned layer weights instead reflect the underlying layerwise distribution of acoustic and linguistic information encoded during pretraining.

## Method

The analysis uses 13 pretrained self-supervised speech models divided into three objective families: contrastive (wav2vec 2.0 variants), clustering-based (HuBERT), and clustering plus denoising (WavLM). Model sizes range from Base (12 layers, hidden size 768) to Large (24 layers, dimension 1024) and XLarge (48 layers, dimension 1280). Layerwise information content is measured using LibriSpeech phone and word annotations aligned via the Montreal Forced Aligner; frame representations are segment-averaged and clustered using mini-batch k-means (k=500 for phones, k=5000 for words), with Adjusted Mutual Information (AMI) computed against true labels to correct for cluster size distributions. 

Learned layer weights are extracted from the ML-SUPERB ASR benchmark, which couples a frozen SSL backbone with a layer-normalized weighted sum, a convolutional downsampler, and a two-layer Transformer downstream head (attention dimension 256) optimized via CTC loss under 10-minute and 1-hour supervision regimes. The authors compute Spearman's rank correlation coefficient (rho) between these optimized softmax-normalized layer weights and the intrinsic layerwise AMI values across models, evaluating statistical significance via permutation tests with 5000 iterations.

## Experimental setup

Evaluated 13 SSL models including wav2vec 2.0 (Base, Large on LibriSpeech 960h and Libri-Light 60kh; XLS-R and OmniASR Large/XLarge on multilingual corpora up to 4.3Mh), HuBERT (Base, Large, XLarge), and WavLM (Base, Base+, Large). Layerwise AMI is computed on LibriSpeech partitions. ASR downstream fine-tuning and weight extraction utilize the ML-SUPERB benchmark datasets (MLS, NCHLT, VoxPopuli) using official ESPnet recipes with 10min and 1h label budgets. The primary metric is Spearman's rank correlation (rho) between learned layer weights and phone/word AMI.

## Results

Contrastive models achieve the highest and most robust alignment, with 10-minute supervision yielding mean Spearman correlations of rho = 0.86 for phone AMI and rho = 0.91 for word AMI (individual models reaching up to rho = 0.98). Increasing supervision to 1 hour degrades correlation across contrastive models, dropping the mean to rho = 0.65 (phones) and rho = 0.70 (words), as weights concentrate more narrowly on later layers. Clustering-based models (HuBERT, WavLM) display weaker, more variable correlations and distinct divergences between phone and word AMI alignments (e.g., HuBERT-XL exhibits rho = 0.45 for phone but rho = 0.87 for word AMI under 10min), indicating that offline pseudo-labeling objectives shape layer representations differently than online contrastive tasks.

| Model & Family | Size | Pretraining Data | Phone AMI (10min) | Phone AMI (1h) | Word AMI (10min) | Word AMI (1h) |
|---|---|---|---|---|---|---|
| wav2vec 2.0 (Contrastive) | Base | LS-960h | 0.91 | 0.70 | 0.98 | 0.80 |
| OmniASR (Contrastive) | Large | Multi-4Mh | 0.97 | 0.75 | 0.96 | 0.78 |
| HuBERT (Clustering) | Base | LS-960h | 0.83 | 0.77 | 0.85 | 0.80 |
| HuBERT (Clustering) | XLarge | LL-60kh | 0.45 | 0.29 | 0.87 | 0.80 |
| WavLM+ (Clustering+Denoising) | Base | MIX-94kh | 0.89 | 0.71 | 0.66 | 0.31 |
| WavLM (Clustering+Denoising) | Large | MIX-94kh | 0.53 | 0.32 | 0.74 | 0.63 |

## Limitations

The analysis is restricted to a single downstream task (ASR) and evaluates only phonetic and linguistic representations (phone and word AMI), leaving non-ASR downstream domains unexamined. The scope focuses purely on English evaluation sets for the layerwise AMI extraction metrics, and results are limited to models using transformer architectures under frozen-backbone fine-tuning protocols.

## Why read this

Speech researchers and ML engineers interpreting self-supervised representations should read this to understand that frozen-backbone layer weights genuinely encode pretrained information structure rather than acting as random artifacts. It provides critical insight into how pretraining objectives (contrastive vs. clustering) and data regimes dictate downstream representation routing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic tool for auditing internal layer specialization, guiding architecture selection, and designing parameter-efficient adaptation layers in speech foundation model pipelines.

## Institutions / 機構

Aalto University, South East Technological University

**Funding / 經費:** Business Finland, Foundation for Aalto University Science and Technology

## Related

- [Do speech foundation models really learn words?](huo26_interspeech.md) — same problem · relatedness 2.3/3
- [InsideSSL: Understanding Self-Supervised Speech Representations using a Model-Centric Perspective](sadok26_interspeech.md) — same problem · relatedness 2.1/3
- [Layer-wise Probing of Whisper's Encoder Representations for Bengali Phone-like Units](thahmid26_interspeech.md) — same problem · relatedness 2.1/3
- [Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains](gonzalez26b_interspeech.md) — same problem · relatedness 2.1/3
- [Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0](peng26c_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
