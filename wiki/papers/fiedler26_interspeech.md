---
id: fiedler26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-424
pdf: https://www.isca-archive.org/interspeech_2026/fiedler26_interspeech.pdf
---

# Contrastive Time-Proximity Pre-Training for Speech-Based Heart Failure Monitoring

[PDF](https://www.isca-archive.org/interspeech_2026/fiedler26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fiedler26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-424)

**TL;DR** — The paper introduces contrastive time-proximity (CTP) self-supervised pre-training to learn heart failure vocal biomarkers from natural speech, outperforming classical acoustic features on cross-center and cross-language generalization.

## Problem

Acute decompensated heart failure (ADHF) causes fluid overload that alters the vocal tract, making voice a promising non-invasive monitoring biomarker. However, prior work relied on engineered features from sustained vowels requiring strict patient engagement, whereas natural speech introduces uncontrolled variability that breaks standard acoustic features. Furthermore, classical features often overfit to specific clinical centers and fail to generalize across different populations or languages.

## Method

The authors propose contrastive time-proximity (CTP), which leverages the progressive nature of heart failure by training a segment-attentive LSTM model on longitudinal telemetry data. The network uses a 3-layer bidirectional LSTM with frame-level and segment-level attention mechanisms to map mel-spectrograms into 256-dimensional recording embeddings (~4.5M parameters). A contrastive cosine embedding loss pulls embeddings of recordings from the same patient close together if they are within 3 days apart (proximal, representing stable health states) and pushes them apart if they are at least 100 days apart (distal). Evaluated configurations include Configuration A (16 kHz, 40 mel bins, initialized from a speaker-verification checkpoint), B (44 kHz, 40 mel), and C (44 kHz, 120 mel), trained on 51,736 weakly-labeled German natural speech recordings from 392 patients.

## Results

Evaluated on the VAMP-HF trial clinical dataset containing admission and discharge recordings from 68 patients across two centers (Charité Berlin in German and Mayo Clinic Rochester in English) formatted as a pairwise ranking task. While classical acoustic features achieve high within-center ranking accuracy (0.62) on the Charité dataset, they fail to generalize to the Mayo Clinic dataset, dropping to 0.34 accuracy. In contrast, CTP-A maintains robust cross-center performance with 0.59-0.61 ranking accuracy using an XGBoost ranker, outperforming random (0.50), off-the-shelf d-vector models, and human expert raters (0.55). Temporal attention analysis reveals that the model successfully focuses on speech pauses corresponding to breathing events.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians, remote patient monitoring platforms, and healthcare engineers building passive, continuous voice-based screening tools for progressive chronic conditions like heart failure.

## Limitations

The evaluation dataset is relatively small and comprises proprietary telemonitoring data, making the cross-center performance improvements exploratory rather than statistically definitive.

## Related

- (link related pages by id as the wiki grows)
