---
id: altwlkany26_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["Infobip", "University of Sarajevo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1436
pdf: https://www.isca-archive.org/interspeech_2026/altwlkany26_interspeech.pdf
---

# Leveraging Discriminative Capabilities of Self-Supervised Neural Audio Fingerprinting for Efficient Speech Data Annotation

*Kemal Altwlkany, Elmedin Selmanovic*

[PDF](https://www.isca-archive.org/interspeech_2026/altwlkany26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/altwlkany26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1436)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — This paper demonstrates that self-supervised neural audio fingerprinting models, despite being trained on music, produce embeddings that capture speech acoustic properties better than WavLM, enabling a 50% reduction in annotation workload via deduplication and farthest point sampling.

## Key contributions

- Applies pre-trained neural audio fingerprinting (PTC) to industry voicemail data, discovering that 50% of the dataset (24,983 out of 50,000 files) consists of duplicate entries following a power-law distribution.
- Demonstrates deduplication on public robocalls (FTC dataset), revealing that 64.8% (928 out of 1,432) are near-duplicates.
- Proposes a strategic subsampling pipeline using farthest point sampling (FPS) in the neural fingerprint embedding space to maximize acoustic diversity when human annotation budgets are strictly limited.
- Shows via linear probing that off-the-shelf music-trained audio fingerprint embeddings (PTC) outperform speech-specific models (WavLM) in capturing speaker identity (F1 97.00% vs 85.37%) and gender, while achieving comparable performance on accents.

## Problem

Modern speech AI projects face severe bottleneck constraints in data collection, cleaning, and labeling, particularly in industry domains like telephony where strict privacy regulations prevent crowdsourcing or data sharing with external annotators. Furthermore, specialized speech datasets often contain massive internal redundancy (due to recurring voicemails or automated robocalls) that wastes expensive senior engineer annotation time, while naive random subsampling heavily favors overrepresented common clips over rare, diverse audio samples. Prior speech self-supervised models like WavLM are optimized for invariant phoneme transcription rather than speaker-identifying acoustic characteristics, leaving a gap in efficiently curating and balancing annotation subsets.

## Method

The approach leverages a lightweight pre-trained conformer (PTC) neural audio fingerprinting architecture consisting of 26.2M parameters, which uses a self-supervised contrastive learning framework originally designed for robust music retrieval against noise, reverberation, and playback rate distortions.

For dataset pruning, raw audio files are passed through the PTC encoder to extract compact embedding vectors. Exact and near-duplicates are identified and stripped using similarity thresholds, removing redundant entries without altering unique information coverage. When the annotation budget forces extreme subsampling (e.g., selecting 1,000 out of 50,000 files), random sampling is replaced by farthest point sampling (FPS) operating directly in the PTC embedding space. FPS initializes with a random data point and iteratively selects subsequent points that maximize the minimum Euclidean distance to all previously chosen points, forcing the selected annotation batch to uniformly span the acoustic manifold rather than clustering densely around frequent, repeated audio patterns.

To evaluate representation quality, the authors extract embeddings from the VCTK speech corpus using both PTC and WavLM, then train multi-class logistic regression linear probes with Bonferroni correction for speaker gender, accent, and speaker identity, comparing classification metrics and McNemar's test statistics.

## Experimental setup

Evaluated on three primary datasets: a proprietary industry dataset of 50,000 anonymized telephony voicemails from Infobip, a public FTC robocalls dataset of 1,432 samples, and the multi-speaker VCTK speech corpus used for synthetic duplication and linear probing evaluations. Baseline models include WavLM for speech embedding comparisons. Evaluation metrics encompass classification accuracy, precision, recall, F1-score evaluated at a 95% confidence interval via logistic regression probing, McNemar's test statistic, Cohen's g effect size, and odds ratios.

## Results

On the proprietary voicemail dataset, PTC deduplication eliminated exactly 24,983 duplicate recordings, halving the annotation burden to 25,017 unique items. On the public FTC robocalls, PTC identified 928 out of 1,432 calls (64.8%) as near-duplicates. In linear probing on VCTK, PTC significantly outperformed WavLM on speaker identification, yielding an F1-score of 97.00 ± 0.37% compared to WavLM's 85.37 ± 0.79% (odds ratio 6.35, p < 1e-10, Cohen's g = 0.36), and on gender classification (99.73% vs 99.30%, odds ratio 2.67, p = 0.000082). PTC did not win on accent classification, where WavLM achieved superior average accuracy and an odds ratio of 1.25 favoring its error profile.

| System / Model | Gender F1 (%) | Accent F1 (%) | Speaker F1 (%) |
|---|---|---|---|
| WavLM [23] | 99.29 ± 0.19 | 74.87 ± 2.25 | 82.28 ± 1.16 |
| PTC [33] (Ours) | 99.73 ± 0.12 | 81.34 ± 1.34 | 96.36 ± 0.56 |

## Limitations

The deduplication and subsampling methodology was validated primarily on telephony domains (voicemails and robocalls) and clean read speech (VCTK), leaving open how well it scales to multi-speaker conversational dialogue, singing, or noisy acoustic environments with extreme domain shift. The evaluation relies on linear probing of static embeddings rather than end-to-end downstream speech recognition or intent classification fine-tuning. Furthermore, compute overhead for farthest point sampling scales quadratically with dataset size before greedy approximation.

## Why read this

Speech data engineers and researchers dealing with massive, redundant telephony or domain-specific audio corpora will learn how to bypass expensive manual audits by repurposing lightweight music fingerprinting models for zero-shot deduplication and diversity-aware dataset subsampling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient telephony dataset curation, privacy-compliant enterprise data cleaning, automated robocall/voicemail filtering pipeline preparation, and active learning subset selection.

## Institutions / 機構

Infobip, University of Sarajevo

**Funding / 經費:** Infobip Global Communication Platform, Important Project of Common European Interest on Next Generation Cloud Infrastructure and Services

## Related

- (link related pages by id as the wiki grows)
