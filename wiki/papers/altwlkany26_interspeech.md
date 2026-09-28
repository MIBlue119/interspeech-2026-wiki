---
id: altwlkany26_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1436
pdf: https://www.isca-archive.org/interspeech_2026/altwlkany26_interspeech.pdf
---

# Leveraging Discriminative Capabilities of Self-Supervised Neural Audio Fingerprinting for Efficient Speech Data Annotation

[PDF](https://www.isca-archive.org/interspeech_2026/altwlkany26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/altwlkany26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1436)

**TL;DR** — This paper demonstrates that self-supervised neural audio fingerprinting models trained purely on music can effectively deduplicate speech datasets and optimize annotation efficiency via farthest point sampling.

## Problem

Industry-specific speech datasets—such as telephony voicemails and robocalls—face severe privacy constraints, legal limitations preventing external crowdsourcing, and high costs associated with expert annotator time. Furthermore, real-world audio datasets often follow a power-law distribution containing massive amounts of duplicates, while random subsampling fails to capture acoustic diversity and overrepresents redundant entries.

## Method

The authors apply a lightweight, pre-trained conformer (PTC) neural audio fingerprinting model containing 26.2M parameters, which was originally trained via contrastive learning for music retrieval. First, exact and near-duplicates are filtered out using the fingerprinting representations. Second, to select a diverse subset for manual annotation under strict budget limits, the authors employ farthest-point sampling directly within the PTC embedding space to maximize acoustic variability.

## Results

Evaluated on a proprietary industry dataset of 50 000 voicemails and a public FTC robocall dataset of 1 432 calls, PTC successfully reduced the voicemail annotation workload by nearly 50% (cutting samples down to 25 017) and revealed that 64.8% of robocalls are near-duplicates. On a synthetic VCTK replica dataset injected with noise and codecs, PTC accurately tracked duplication levels within 7.9%. When evaluating acoustic property representation on VCTK using logistic regression, PTC significantly outperformed the speech-specific WavLM baseline, achieving F1-scores of 97.00% vs 85.37% for speaker identification and 99.73% vs 99.30% for gender classification, supported by McNemar's tests (p < 0.001).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on privacy-sensitive domains (like telephony, voicemail detection, and fraud/robocall analysis) who need to optimize limited data annotation budgets.

## Limitations

The deduplication approach primarily targets data sources that naturally contain repeated entries or automated generation artifacts.

## Related

- (link related pages by id as the wiki grows)
