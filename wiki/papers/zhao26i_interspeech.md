---
id: zhao26i_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2564
pdf: https://www.isca-archive.org/interspeech_2026/zhao26i_interspeech.pdf
---

# Towards Robust Generative Speech Enhancement Using Vector Quantisation-Based Neural Audio Codec

*Haixin Zhao, Nilesh Madhu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2564)

**TL;DR** — This paper investigates continuous (cNAC-SE) versus discrete (dNAC-SE) latent space modeling within Vector Quantization-based Neural Audio Codec frameworks for speech enhancement, demonstrating that a fully fine-tuned continuous model with VQ-based clean-prior regularisation achieves leading DNS-MOS performance with lower compute.

## Key contributions

- Proposes two distinct neural audio codec-based speech enhancement frameworks operating in latent space: cNAC-SE (continuous) and dNAC-SE (discrete with independent, joint, and hybrid modeling variants).
- Performs theoretical and PCA-based visual analyses showing that cNAC-SE maintains tighter, more centered clusters around clean priors while dNAC-SE suffers from pronounced drift and outliers.
- Demonstrates that fully fine-tuning both encoder and decoder consistently outperforms frozen configurations and reduces performance variance.
- Establishes that clean-prior-constrained VQ provides an inherent robustness-enhancing regularisation effect for continuous latent models independently of discrete token processing.

## Problem

Traditional discriminative speech enhancement maps noisy signals to clean ones via deterministic regression, triggering a trade-off between noise suppression and signal preservation. While modern generative approaches employ neural audio codecs with vector quantisation information bottlenecks to map inputs onto clean manifolds, prior work focuses overwhelmingly on discrete token classification or unregularized continuous prediction without thoroughly contrasting their underlying latent mechanisms. Furthermore, pre-trained encoders and decoders often cause a domain mismatch when fed distorted speech, and prior attempts at encoder fine-tuning have historically failed to deliver significant gains.

## Method

The system utilizes the Descript Audio Codec (DAC) configured with K = 12 residual vector quantisers, a codebook size of M = 1024, and an embedding dimension D = 1024. For the continuous cNAC-SE framework, the enhancer comprises N = 6 sequential transformer blocks (attention and feed-forward layers with relative position bias and 1-second causal trapezoidal masking) that directly predict continuous latent representations, followed by a VQ module acting as clean-prior regularisation. The network is trained using a combination of latent space consistency loss and a multi-resolution phase-aware reconstruction waveform loss.

For the discrete dNAC-SE framework, continuous latents are first discretised via residual VQ into embeddings, and an enhancer predicts logits for codebook entries. Three residual modeling strategies are tested: independent modeling (IM), joint modeling (JM), and hybrid modeling (HM). Training relies on cross-entropy loss with weights proportional to the mean absolute magnitude of ground-truth quantised embeddings. To enable stable end-to-end training, the authors apply distance-based hard supervision on encoder outputs alongside soft/hard logit-based fine-tuning strategies.

## Experimental setup

Evaluated on the DNS3 Challenge dataset containing ~140 hours of synthetic wideband English speech and noise (-5 dB to 20 dB SNR). Testing uses the DNS3 test set split into real-world recordings, synthetic clean/noisy conditions, and reverberant conditions. Models are optimized using AdamW (lr = 2e-5, batch size 8). Evaluation metrics are non-referential DNS-MOS scores (SIG, BAK, OVL).

## Results

Among dNAC-SE variants, Joint Modeling (JM) outperforms IM and HM while requiring fewer MACs (3.84 vs 23.41/30.99 G MAC/s). Fully fine-tuned cNAC-SE achieves top performance across all test conditions while requiring only 2.58 G MAC/s for its enhancer module, beating its discriminative counterpart (which lacks the VQ regularisation bottleneck) particularly on reverberant unseen distortions (OVL 3.19 vs 3.18 on real recordings, and superior DNS-MOS margins elsewhere). Compared to established generative baselines like CDiffuSE, SGMSE, StoRM, SE-CE, and SELM, the proposed cNAC-SE (Fine-Tuned) achieves leading DNS-MOS scores across most metrics and subsets.

| Systems / Conditions | With Reverb (OVL) | Without Reverb (OVL) | Real Recordings (OVL) |
|---|---|---|---|
| Noisy | 1.39 | 2.48 | 2.26 |
| CDiffuSE | 2.19 | 3.05 | 2.78 |
| SGMSE | 2.43 | 3.14 | 2.79 |
| StoRM | 2.52 | 3.21 | 2.94 |
| SELM | 2.70 | 3.26 | 3.12 |
| cNAC-SE (Fine-Tuned) | 2.91 | 3.37 | 3.19 |

## Limitations

While the causal enhancer operates efficiently, the full neural audio codec pipeline carries substantial computational overhead that restricts deployment in resource-constrained or on-device scenarios. Evaluation is restricted to English-language corpora and synthetic/real DNS3 conditions, leaving cross-lingual generalisation unverified.

## Why read this

Read this paper if you are designing generative speech enhancement systems or neural audio codecs and want a rigorous analytical and empirical comparison between discrete token classification and continuous latent regression with VQ regularisation.

## Code

- https://aspire.ugent.be/demos/INTERSPEECH2026HZ/

## Applications

Cloud-based telecommunications, real-time noise suppression, and robust speech preprocessing for downstream speech recognition engines.

## Related

- (link related pages by id as the wiki grows)
