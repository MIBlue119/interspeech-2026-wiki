---
id: leal26b_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-742
pdf: https://www.isca-archive.org/interspeech_2026/leal26b_interspeech.pdf
---

# Analyzing Longitudinal Vocal Changes During Cognitive Behavioral Therapy for Hikikomori Patients

[PDF](https://www.isca-archive.org/interspeech_2026/leal26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/leal26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-742)

**TL;DR** — This study analyzes longitudinal vocal dynamics during internet-based cognitive behavioral therapy for hikikomori patients, demonstrating that fusing deep speech embeddings with hand-crafted features best predicts treatment outcomes.

## Problem

Monitoring treatment response during cognitive behavioral therapy (CBT) for socially isolated populations like hikikomori patients remains difficult due to a reliance on static pre-post assessments rather than temporally grounded markers. Traditional cross-sectional approaches and global summaries miss intra-individual fluctuations and session-by-session symptom trajectories. This gap hinders the early identification of individuals at risk of poor treatment outcomes or clinical deterioration.

## Method

The study utilizes a real-world clinical dataset comprising 276.7 hours of session speech from 35 hikikomori patients undergoing 8 internet-based CBT sessions recorded via AWS Chime at 48 kHz. Speech is segmented into 5-second windows, cleansed with RMS normalization and pre-emphasis filtering, and diarized using k-means clustering. Feature extraction incorporates Mel-frequency cepstral coefficients (MFCCs), fundamental frequency (F0), and Wav2vec 2.0 base embeddings, baseline-corrected relative to the first session to isolate temporal dynamics. A multi-layer perceptron (MLP) handles low-dimensional MFCC+F0 descriptors while a Gated Recurrent Unit (GRU) processes sequential Wav2vec 2.0 representations under a Leave-One-Patient-Out (LOPO) evaluation protocol.

## Results

Lower-order coefficients (MFCC1-MFCC3) exhibited the strongest longitudinal trends, while MFCC4 and MFCC6 showed higher early-stage cross-subject stability. Trajectory evolution tracked treatment response more accurately than static pre-post differences. Fusing Wav2vec 2.0 embeddings with MFCCs and F0 achieved the highest F1-score across age and gender groups (young adults: 0.37, adolescents: 0.62, female: 0.47, male: 0.4), outperforming models using either feature set in isolation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and digital mental health platforms can use these models to monitor patient trajectory during remote psychotherapy and identify individuals at risk of treatment deterioration.

## Limitations

The cohort size is relatively small (35 patients), and the acoustic changes showed high inter-subject variability, particularly in adolescent and female subgroups.

## Related

- (link related pages by id as the wiki grows)
