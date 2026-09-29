---
id: grundhuber26_interspeech
category: speech-coding
institutions: ["Fraunhofer Institute for Integrated Circuits", "International Audio Laboratories Erlangen", "Friedrich-Alexander-Universität Erlangen-Nürnberg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2406
pdf: https://www.isca-archive.org/interspeech_2026/grundhuber26_interspeech.pdf
---

# Beyond Cross-Reconstruction: Probing-Based Disentanglement Evaluation for Acoustic Teleportation Codecs

*Philipp Grundhuber, Emanuël A. P. Habets*

[PDF](https://www.isca-archive.org/interspeech_2026/grundhuber26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/grundhuber26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2406)

**Category:** `speech-coding`

**TL;DR** — This paper introduces a regression-based probing framework to measure information leakage across partition-level neural audio codecs (NACs), revealing a fundamental asymmetry where speaker identity is successfully isolated while room acoustics heavily leak into speech embeddings. Despite receiving zero room-parameter labels during training, the codec's acoustic embeddings achieve blind room-acoustic estimation within 0.02s RMSE of fully supervised baselines.

## Key contributions

- Adapts the DCI informativeness principle from individual dimensions to embedding partitions, introducing regression-based probing to quantify continuous room-acoustic parameters (T60, C50, DRR) alongside speaker classification.
- Uncovers an asymmetric disentanglement structure in acoustic teleportation (AT) codecs: speaker identity is tightly confined to the speech partition (delta acc up to 56.8 pp), whereas acoustic information consistently leaks into speech embeddings.
- Traces the structural disentanglement asymmetry directly to the AT training objective, which penalizes speaker leakage via embedding swaps but lacks any gradient pressure to purge room-acoustic traits from the speech branch.
- Demonstrates that downstream output-quality metrics like ScoreQ cannot detect latent information leakage, proving that lightweight probing is required for rigorous evaluation.

## Problem

Neural audio codecs for acoustic teleportation partition latents into separate subspaces for speech content and acoustic room properties to enable tasks like voice conversion and dereverberation. Prior evaluations rely entirely on downstream output quality or cross-reconstruction after embedding swaps, which cannot detect hidden information leakage because downstream decoders can simply learn to ignore redundant signals in the wrong partition. Classical dimension-wise disentanglement metrics (like MIG or DCI) assume independent factors and fail on modern partition-level NAC embeddings. Without rigorous probing, engineers cannot verify whether subspaces are truly isolated or merely bypassed by decoders.

## Method

The authors treat pre-trained EnCodec-based neural audio codec encoders operating at 16 kHz (hop length 320) as fixed feature extractors. The encoder maps inputs into a 128-dimensional latent space split equally into a 64-dimensional speech partition and a 64-dimensional acoustic partition, each quantized via independent residual vector quantization (RVQ). The acoustic partition is also evaluated under various temporal downsampling factors (1 to 120) to lower bitrates.

To measure disentanglement without capacity bias, identical lightweight multi-layer perceptron (MLP) probes are trained independently on each mean-pooled partition embedding. The regression probe uses three fully connected layers with 128 hidden units, ReLU activations, and 10% dropout (44,440 parameters total), predicting room-acoustic parameters (T60, C50, DRR) via eight linear heads (seven per-octave bands from 125 Hz to 8 kHz plus one broadband head) optimized with MSE loss. The classification probe uses a similar structure with a K-way softmax head (21,220 parameters) trained with cross-entropy loss to predict top-1 speaker identity from the top 100 speakers.

This setup directly estimates information content via the gap delta between intended and unintended partition performance (Pearson rho for regression, top-1 accuracy for classification). The design choices—deliberately keeping the probe lightweight and mean-pooling over time—ensure that measured leakage serves as a reliable lower bound on actual embedded information rather than being masked by estimator capacity.

## Experimental setup

Speech data comprises 50 hours of training data (60,000 samples) and 6,000 samples each for validation/test from DNS5 read speech, convolved with room impulse responses from GWAsmall (T60 ranging up to 1.2s, plus 10% anechoic samples). Speaker probes use 7,806 training utterances from 100 speakers. Probes are trained up to 100 epochs using AdamW (learning rate 1e-3, weight decay 1e-4, halved after 7 epochs of validation loss stagnation, early stopping patience 15). Baselines include Löllmann ML, Spectrogram CNN, CRNN-MB, and log-mel MLP baselines.

## Results

The evaluation demonstrates that AT-trained models achieve statistically significant separation across all tested configurations, whereas non-AT baseline models show negligible speaker separation. Speaker identity is strongly confined to the speech partition, with quantization at N=8 widening the speaker accuracy gap to 56.8 pp (83.1% vs 26.3%). However, room-acoustic leakage into the speech partition remains high across all models, with speech-partition T60 correlation remaining above rho = 0.75 even under heavy quantization or temporal downsampling.

Despite lacking explicit supervision, the acoustic embeddings yield blind T60 broadband estimation with an RMSE of 0.094s and Pearson rho of 0.947 (DS Ablation Factor 4), falling within 0.02s RMSE of the fully supervised CRNN-MB baseline (0.082s, rho = 0.959) and vastly outperforming a control log-mel baseline (RMSE 0.204s). Ablations show that temporal downsampling of the acoustic embeddings up to a factor of 120 barely impacts room parameter estimation (T60 rho between 0.895 and 0.915), proving high temporal compressibility.

| System / Condition | T60 RMSE [s] | T60 MAE [s] | T60 Pearson rho | Speaker Delta Acc [pp] |
|---|---|---|---|---|
| CRNN-MB (Supervised Baseline) | 0.082 | 0.056 | 0.959 | - |
| Spectrogram CNN (Supervised) | 0.087 | 0.064 | 0.955 | - |
| Log-mel MLP (Supervised) | 0.204 | 0.163 | 0.564 | - |
| Acoustic Emb. MLP (DS Factor 4) | 0.094 | 0.064 | 0.947 | - |
| AT Quantized N=8 Codec | - | - | - | +56.8 |
| AT Omran Taskset Codec | - | - | - | +40.8 |

## Limitations

The study evaluates only time-invariant factors (room acoustics and speaker identity) and leaves dynamic linguistic attributes (such as phonemes or ASR content) unprobed. The investigated EnCodec-based architecture and 16 kHz sample rate limit generalization claims to other neural codec families. Furthermore, the MLP probes establish a lower bound on leakage, meaning actual latent information overlap may exceed reported metrics.

## Why read this

Speech and ML engineers building neural audio codecs or voice conversion systems should read this to understand why cross-reconstruction metrics are insufficient for evaluating latent disentanglement and how lightweight probing exposes hidden information leakage.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Acoustic teleportation, neural audio codec design, robust voice conversion, and blind room-acoustic estimation.

## Institutions / 機構

Fraunhofer Institute for Integrated Circuits, International Audio Laboratories Erlangen, Friedrich-Alexander-Universität Erlangen-Nürnberg

**Funding / 經費:** German Research Foundation

## Related

- [SDP-Codec: A Speaker-Decoupled Speech Codec with Pitch Injection for Low-Bitrate Coding and Zero-Shot Voice Conversion](kim26v_interspeech.md) — same problem · relatedness 2.1/3
- [AugCodec: A Low-Bitrate Disentangled Neural Speech Codec via Data Augmentation](wang26y_interspeech.md) — same problem · relatedness 2.1/3
- [Learning Self-Supervised Spatial Representations via Soft Acoustic Contrastive Alignment](silverman26_interspeech.md) — same problem · relatedness 2.0/3
- [Towards Interpretable Framework for Neural Audio Codecs via Sparse Autoencoders: A Case Study on Accent Information](wang26n_interspeech.md) — same problem · relatedness 2.0/3
- [Speech Codec Probing from Semantic and Phonetic Perspectives](shi26g_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
