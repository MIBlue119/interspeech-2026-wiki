---
id: pludra26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2522
pdf: https://www.isca-archive.org/interspeech_2026/pludra26_interspeech.pdf
---

# Automatic Assessment of L2 Speech Intelligibility: Segmental Error Ranking

[PDF](https://www.isca-archive.org/interspeech_2026/pludra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pludra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2522)

**TL;DR** — This paper proposes an intelligibility-centered approach to computer-assisted pronunciation training (CAPT) that uses phoneme error regression to rank segmental errors by their impact on communicative effectiveness, achieving a Pearson correlation of 0.74 with human intelligibility ratings.

## Problem

Current CAPT systems focus on correcting all deviations from native speech to achieve native-like pronunciation, which is often unrealistic and yields non-actionable feedback. Shifting the educational goal toward communicative effectiveness (speech intelligibility) requires operationalizing how specific mispronounced phonemes actually impair listener understanding. Without a principled error ranking, systems cannot guide second language learners to prioritize the most critical pronunciation flaws.

## Method

The method extracts phoneme substitution and mispronunciation ratios using Azure AI Speech services aligned with canonical transcriptions, reducing sparse features from 791 down to a filtered set. It trains multiple regression models (SVR, GPR, KNR, GBR, RFR, and AdaBoost Decision Tree Regression) using leave-one-out cross-validation on a curated dataset of 600 speech samples (5-15s duration) pooled from VoxPopuli, speechocean762, and an internal Pearson corpus. Ground truth labels are established via crowdsourced human ratings across a 5-point intelligibility scale assessed by 120 raters (totaling 5 ratings per recording, Krippendorff's alpha of 0.67). Feature importance extracted from the best-performing AdaBoost ensemble generates a ranking of individual phonemes.

## Results

Evaluated using leave-one-out cross-validation across 600 folds against baselines including random prediction, mean human rating, and ASR Word Error Rate (WER). The AdaBoost DTR model achieves an MSE of 0.48, MAE of 0.52, MAPE of 0.19, and a Pearson correlation of 0.74 (outperforming the ASR WER correlation baseline of 0.67). Feature importance analysis reveals that vowels like /E/, /@/, /I/, and fricatives like /z/ exert the highest influence on speech intelligibility.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted pronunciation training (CAPT) platforms and language learning software seeking to provide learners with actionable, priority-based feedback focused on communicative success rather than native-accent imitation.

## Limitations

The model focuses exclusively on segmental features while acknowledging that suprasegmental aspects also heavily influence intelligibility, leading to a natural ceiling on predictability from phoneme errors alone.

## Related

- (link related pages by id as the wiki grows)
