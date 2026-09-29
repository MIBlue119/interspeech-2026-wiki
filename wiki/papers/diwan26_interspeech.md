---
id: diwan26_interspeech
category: tts
labels: [self-supervised]
institutions: ["University of Texas at Austin", "New York University"]
code: https://github.com/ajd12342/paraspeechclap
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1437
pdf: https://www.isca-archive.org/interspeech_2026/diwan26_interspeech.pdf
---

# ParaSpeechCLAP: A Dual-Encoder Speech-Text Model for Rich Stylistic Language-Audio Pretraining

*Anuj Diwan, Eunsol Choi, David Harwath*

[PDF](https://www.isca-archive.org/interspeech_2026/diwan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/diwan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1437)

**Category:** `tts` · **Labels:** `self-supervised`

**TL;DR** — ParaSpeechCLAP is a dual-encoder speech-text model family that maps speech waveforms and free-form style captions spanning both intrinsic (speaker-level) and situational (utterance-level) attributes into a shared embedding space. It outperforms existing baselines on style retrieval and classification, and enables training-free best-of-N guidance for style-prompted text-to-speech (TTS).

## Key contributions

- Introduces the ParaSpeechCLAP family (Intrinsic, Situational, and Combined models) supporting a broad taxonomy of 28 intrinsic and 23 situational style descriptors.
- Proposes a multitask training objective for the Intrinsic model combining InfoNCE contrastive loss with a text-encoder-driven classification loss.
- Implements class-balanced batch sampling using inverse tag frequencies to improve rare-attribute learning in speaker-level style modeling.
- Pioneers the use of dual-encoder speech models as inference-time reward models for best-of-N selection in style-prompted TTS, improving consistency without quality degradation.

## Problem

Prior speech-caption alignment models like ParaCLAP or SSE handle only a very narrow set of stylistic attributes (such as 5-6 basic emotions), ignoring multidimensional real-world variations like pitch, texture, and clarity. While emotion recognition has advanced, supporting freeform natural-language descriptions of rich speech styles remains an open challenge. Closing this gap is critical for expressive TTS, style retrieval, and spoken dialogue systems, but existing architectures lack the capacity to process diverse intrinsic and situational tags simultaneously.

## Method

Each ParaSpeechCLAP model employs a dual-encoder architecture consisting of a speech encoder fA(·) and a text encoder fT(·) projecting into a 768-dimensional shared embedding space. The speech encoder uses the 317M-parameter WavLM-Large backbone, mean-pooling its last layer hidden states before a two-layer linear projection head with GELU and layer normalization. The text encoder uses the 278M-parameter Granite Embedding Multilingual backbone, taking the final-layer CLS token before an identical projection head. 

For training, ParaSpeechCaps provides the data. ParaSpeechCLAP-Situational and Combined are trained solely with a bidirectional InfoNCE contrastive loss with a learnable temperature initialized to 0.07. ParaSpeechCLAP-Intrinsic uses a multitask objective: L_contrastive + L_classify. To avoid a dedicated classification head, the text encoder itself generates class embeddings using 6 Gemini 2.5 Pro paraphrased text prompts for each of the M=28 intrinsic tags. Mini-batch speech embeddings are dotted with these dynamically sampled text tag embeddings to compute binary cross-entropy classification logits.

All models are trained for 4,500 steps using Adam (lr=1e-5) on 4 NVIDIA A40 GPUs with a per-GPU batch size of 32 using 10-second truncated/padded audio clips. ParaSpeechCLAP-Intrinsic incorporates class-balanced sampling via inverse tag frequencies, whereas Situational and Combined rely on standard sampling with upsampled situational data to balance the mixture.

## Experimental setup

Models are trained on the ParaSpeechCaps dataset (2,412 hours of intrinsic data, 298 hours of situational data). Evaluation uses holdout sets: Intrinsic (VoxCeleb, 2,819 clips, 64 prompts), Situational (Expresso-EARS, 1,432 clips, 346 prompts), and Combined (1,432 clips). Baselines include Random Projection, ParaCLAP, ParaCLAP-PSC (fine-tuned on ParaSpeechCaps), and VoxProfile-VQ. Metrics include Recall@k (R@1, R@10), Median Rank (MedRank), Unweighted Average Recall (UAR), Macro F1, CMOS, NMOS, and WER.

## Results

On situational retrieval, ParaSpeechCLAP-Situational achieves an R@1 of 24.79 and R@10 of 88.82, outperforming ParaCLAP-PSC (15.64 R@1). On intrinsic classification, ParaSpeechCLAP-Intrinsic reaches 46.58 UAR, outperforming the VoxProfile-VQ classifier baseline (41.40 UAR), though lagging slightly in F1 (38.27 vs 40.24). The unified ParaSpeechCLAP-Combined model excels on compositional evaluation (14.31 R@1, 52.17 R@10) but falls behind specialized models on single-domain tasks (e.g., 13.51 R@1 on intrinsic vs 18.62 for the intrinsic specialist).

In best-of-N TTS guidance (N=10), ParaSpeechCLAP guidance improves CMOS style consistency from 3.61 to 3.70, intrinsic tag recall from 57.9% to 62.4%, and situational tag recall from 69.2% to 74.3%, while maintaining naturalness (NMOS ~3.35) and improving word error rate (WER from 8.14 to 7.56). Ablations on ParaSpeechCLAP-Intrinsic demonstrate performance drops when removing the new encoders (R@1 drops from 18.62 to 11.77), multitask loss (13.76), or class-balancing (13.94).

| System | Situational R@1 | Situational R@10 | Intrinsic R@1 | Intrinsic UAR | Combined R@1 |
|---|---|---|---|---|---|
| ParaCLAP [1] | 0.41 | 3.98 | 1.95 | 29.16 | 0.34 |
| ParaCLAP-PSC | 15.64 | 72.55 | 11.49 | 40.27 | 5.58 |
| VoxProfile-VQ [22] | - | - | - | 41.40 | - |
| PSCLAP-Situational | 24.79 | 88.82 | 5.35 | 31.08 | 12.71 |
| PSCLAP-Intrinsic | 4.54 | 27.93 | 18.62 | 46.58 | 1.53 |
| PSCLAP-Combined | 25.62 | 83.58 | 13.51 | 32.83 | 14.31 |

## Limitations

Specialized models require selecting the appropriate variant at inference time since the unified model underperforms on isolated single-domain tasks. Best-of-N inference scales linearly with N in compute cost, leaving efficient guided decoding as an open challenge. Evaluation relies heavily on the ParaSpeechCaps dataset, and prompt sensitivity for the classification loss was not exhaustively analyzed.

## Why read this

Speech and ML engineers building expressive text-to-speech systems or audio-text retrieval engines should read this paper to learn how to unify rich intrinsic and situational speech styles into a joint embedding space using modern pretrained encoders and multitask objectives, and how to apply them for training-free TTS guidance.

## Code

- https://github.com/ajd12342/paraspeechclap

## Applications

Style-prompted text-to-speech, expressive speech retrieval, speech style captioning, and expressive spoken dialogue systems.

## Institutions / 機構

University of Texas at Austin, New York University

## Related

- [Bridging the Gap: A Hierarchical Framework for Cross-Modal Style Modeling in Expressive TTS](chen26p_interspeech.md) — same problem · relatedness 2.5/3
- [MixProLAP: Mixture-Induced Uncertainty Modeling for Probabilistic Language-Audio Pretraining](nakagome26_interspeech.md) — same problem · relatedness 2.4/3
- [Leveraging Mutual Intra-Modal Similarity Supervision for Text and Audio](vonaspern26_interspeech.md) — shared technique · relatedness 2.3/3
- [ProLAP: Probabilistic Language-Audio Pre-Training](manabe26_interspeech.md) — shared technique · relatedness 2.3/3
- [Scalable Direction-Following TTS via Voice Impression-Guided Pseudo Triplet Construction](fujita26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
