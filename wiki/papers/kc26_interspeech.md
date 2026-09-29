---
id: kc26_interspeech
category: speaker
institutions: ["Government Engineering College Barton Hill", "Government Engineering College Idukki", "APJ Abdul Kalam Technological University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1535
pdf: https://www.isca-archive.org/interspeech_2026/kc26_interspeech.pdf
---

# ECAPA-TDNN-based Speaker Embedding Framework for Voice Mimicry Assessment

*Bhasi K.C., Rajeev Rajan*

[PDF](https://www.isca-archive.org/interspeech_2026/kc26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kc26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1535)

**Category:** `speaker`

**TL;DR** — This paper proposes a voice mimicry assessment framework that uses attention-augmented ECAPA-TDNN speaker embeddings derived from both spectral and prosodic features, achieving a top-1 hit rate of 75% on the MIMICz dataset via score fusion.

## Key contributions

- Formulates a text-independent voice mimicry assessment task evaluating 20 celebrity targets and 5 mimicry artists.
- Introduces an attention-augmented ECAPA embedding pipeline utilizing a 1D CNN, attention layer, and sparse autoencoder to refine spectral and prosodic representations.
- Applies a score-level fusion mechanism to combine prosodic and spectral augmented E-vectors, resolving temporal scale mismatches.
- Demonstrates through extensive ablations that ECAPA-based augmented embeddings outperform traditional X-vector and D-vector equivalents.

## Problem

Assessing vocal impersonation quality requires capturing subtle, distributed differences in articulation, pitch, tempo, and loudness between a target speaker and an artist. Prior approaches rely on individual feature streams (either spectral or prosodic alone), basic DTW, or unaugmented representations like traditional i-vectors, x-vectors, and GMMs, which fail to capture fine-grained temporal-spectral variations. Bridging this gap is critical for voice verification, forensic analysis, and anti-spoofing systems to reliably detect well-executed vocal mimicry.

## Method

Audio signals are processed using the Librosa toolkit (30ms frame size, 10ms shift) to extract prosodic features (loudness, pitch, speaking rate, shimmer, tempogram ratio) and spectral features (MFCCs, chroma, tonnetz, spectral roll-off, spectral bandwidth, spectral flux, and spectral centroid). These features are converted into ECAPA-TDNN speaker embeddings (E-vectors) trained from scratch on MIMICz. The resulting 32-dimensional vectors are fed into a 1D CNN, followed by an attention mechanism to emphasize key temporal elements, and a sparse autoencoder to enforce latent sparsity, yielding augmented speaker embeddings (El*-vectors).

For classification, a sequential Deep Neural Network (DNN) processes the features across five dense layers with decreasing units (512, 512, 256, 128, 64), ReLU activations, and dropout layers ranging from 0.1 to 0.3. The output layer uses sigmoid activation across 20 nodes (representing celebrities), trained via the Adam optimizer and categorical cross-entropy loss for 256 epochs with a batch size of 32. Final inference scores combine prosodic and spectral streams via a weighted score-level fusion parameter alpha (Sf = alpha * Sps + (1 - alpha) * Sss), avoiding temporal alignment issues between different feature types.

## Experimental setup

Evaluated on the MIMICz dataset comprising studio-quality recordings of 20 Malayalam movie actors and 5 mimicry artists (400 training utterances ~15s each, 100 test utterances ~10s each, totaling ~116.6 minutes sampled at 44.1 kHz). Subjective evaluations utilized 15 native listeners providing Mean Opinion Scores (MOS). Compared against X-vector and D-vector baseline embedding methods, as well as prior architectures including GMM-MFCCs, i-MFCC/i-MODGDF/Prosodic DNNs, LSTM-self-attention, and Siamese networks. Metrics include Top-1 and Top-K hit rates.

## Results

The proposed fusion of augmented ECAPA embeddings (El*_prosody · El*_spectral) achieves a top-1 hit rate of 75.00%, outperforming the proposed X-vector fusion baseline (55.00%) and D-vector fusion baseline (65.00%). It also surpasses prior literature benchmarks such as GMM-MFCC (60.00%), i-vector/DNN variants (50.00%), and Siamese networks (72.00%). 

In ablation studies comparing individual streams, augmented ECAPA prosodic embeddings achieve 55.00% top-1 accuracy and spectral embeddings achieve 50.00%, both improving significantly over their unaugmented counterparts. The model does not win uniformly across all individual artists without score fusion, demonstrating that combining complementary prosodic and spectral cues is essential to reach peak performance.

| System / Condition | Top-1 Hit Rate (%) |
|---|---|
| GMM + MFCC [29] | 60.00 |
| i-Vector + DNN [2] | 50.00 |
| Siamese Network [30] | 72.00 |
| X*-vector Fusion (Proposed Baseline) | 55.00 |
| D*-vector Fusion (Proposed Baseline) | 65.00 |
| El*-vector Fusion (Proposed Method) | 75.00 |

## Limitations

Evaluated exclusively on a relatively small, single-language dataset (Malayalam, 20 speakers, 5 artists) totaling under two hours of audio, limiting claims of global cross-lingual generalization. The subjective evaluation exhibits only fair inter-annotator agreement (Fleiss' kappa = 0.31, Kendall's W = 0.34), which introduces noise into the ground-truth artist rankings. Real-time inference latency and performance under unconstrained, noisy acoustic environments were not tested.

## Why read this

Speech researchers and audio engineers working on voice anti-spoofing and speaker verification should read this to see how attention-augmented ECAPA embeddings and score-level feature fusion can effectively capture the subtle vocal nuances of human mimics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice biometric security, anti-spoofing systems for speaker verification, and forensic audio analysis.

## Institutions / 機構

Government Engineering College Barton Hill, Government Engineering College Idukki, APJ Abdul Kalam Technological University

## Related

- (link related pages by id as the wiki grows)
