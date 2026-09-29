---
id: ding26c_interspeech
category: enhancement-separation
institutions: ["Nanyang Technological University", "Cochin University of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1034
pdf: https://www.isca-archive.org/interspeech_2026/ding26c_interspeech.pdf
---

# Through-Wall Radar Speech Acquisition via Cascaded Attention Fusion

*Ruotong Ding, Zhi-Wei Tan, V.G. Reju, Andy W. H. Khong*

[PDF](https://www.isca-archive.org/interspeech_2026/ding26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ding26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1034)

**Category:** `enhancement-separation`

**TL;DR** — The Cascaded Attention Fusion Transformer (CAF-Former) tackles through-wall radar speech recovery by combining progressive spectral expansion with a cascaded attention hierarchy, achieving superior intelligibility and perceptual scores over existing models under severe band limitation.

## Key contributions

- Proposes a sensing-aware progressive bandwidth extension framework that gradually expands reliable low-frequency radar representations to full-band spectrum across 10 layers.
- Introduces Temporal Multi-Query Attention (TMQA), where parallel query projections share keys and values to capture diverse temporal patterns while preventing head fragmentation in low-SNR sub-bands.
- Develops a Frequency Attention Fusion (FAF) module to model cross-frequency interactions and leverage informative low-frequency cues for high-frequency harmonic recovery.
- Demonstrates consistent improvements over state-of-the-art speech enhancement baselines (RANet, Wave-Voice Net, DPTNet, TF-Locoformer, EBENet) on both simulated and real through-wall radar recordings.

## Problem

Speech acquisition via through-barrier radio-frequency sensing suffers from severe clutter, noise, and high-frequency attenuation above 1 kHz due to barrier penetration and low signal-to-noise ratios. Conventional deep learning architectures like CNN-based RANet and Wave-Voice Net struggle with long-range temporal-spectral dependencies, while standard Transformer variants and Conformer models utilize multi-head self-attention (MHSA) that suffers from head fragmentation toward noise-dominated high-frequency sub-bands. These limitations prevent effective restoration of harmonic structures and intelligibility cues, necessitating a dedicated sensing-aware architecture.

## Method

The CAF-Former processes single-channel FMCW radar signals transformed via STFT, retaining only the lowest 50 reliable frequency bins (0 to 765.6 Hz) as input. The model stacks $K=10$ progressive transformer layers that gradually expand the spectral dimension, where each layer utilizes positional encoding and residual connections. Each layer consists of a cascaded attention mechanism: first, Temporal Multi-Query Attention (TMQA) employs $N_q = 8$ independent query branches attending to a shared set of keys ($d_k = 64$) and values to extract diverse temporal maps without head fragmentation. Second, a Frequency Attention Fusion (FAF) module reorganizes these attention maps into a frequency-centric matrix, applying scaled dot-product attention along the frequency axis to model inter-frequency dependencies and guide high-frequency recovery.

Training is performed using the log-spectral amplitude distance loss function on noisy input phase combined with magnitude estimation. The network is optimized using the Adam optimizer with a learning rate of $1 \times 10^{-4}$ for up to 50 epochs. The input comprises 4-second utterances sampled at 8 kHz, processed using 512-sample frames with a 75% overlap and a Hamming window, retaining 257 frequency bins.

## Experimental setup

Evaluated on approximately 312 hours of simulated training data (derived from LibriSpeech convolved with measured radar impulse responses and uniform SNR levels from -5 to 15 dB) and 6 hours of validation data, alongside real-world recordings through a 15 cm concrete wall using a 5.31 GHz FMCW radar platform. Compared against RANet, Wave-Voice Net, DPTNet, TF-Locoformer, and EBENet. Metrics include PESQ, STOI, DNSMOS, and CS-MFCC. The model contains 2.726M parameters.

## Results

CAF-Former achieves top performance on intelligibility and perceptual quality metrics across conditions. On recorded test data, it attains an STOI of 0.617, DNSMOS of 2.423, and CS-MFCC of 0.591, outperforming EBENet (STOI 0.598, DNSMOS 2.384, CS-MFCC 0.585) and TF-Locoformer (STOI 0.612, DNSMOS 2.351, CS-MFCC 0.583). Ablations confirm that combining TMQA and FAF yields the highest scores (PESQ 1.782, ESTOI 0.617), whereas standard MHSA collapses to a PESQ of 1.451. While TF-Locoformer and EBENet achieve slightly higher raw PESQ scores in certain isolated configurations, CAF-Former delivers more balanced superiority across overall intelligibility and naturalness metrics.

| Model | Simulated PESQ | Simulated STOI | Recorded PESQ | Recorded STOI | Recorded DNSMOS |
|---|---|---|---|---|---|
| Noisy input | 1.064 | 0.535 | 1.059 | 0.462 | 1.753 |
| RANet [11] | 1.573 | 0.618 | 1.462 | 0.556 | 2.231 |
| Wave-Voice Net [12] | 1.630 | 0.607 | 1.482 | 0.548 | 2.213 |
| TF-Locoformer [17] | 1.902 | 0.695 | **1.821** | 0.612 | 2.351 |
| EBENet [18] | **1.910** | 0.687 | 1.798 | 0.598 | 2.384 |
| CAF-Former (proposed) | 1.852 | **0.699** | 1.782 | **0.617** | **2.423** |

## Limitations

The evaluation is restricted to controlled through-wall scenarios using a single 15 cm concrete wall and a fixed 5.31 GHz FMCW radar geometry, meaning generalization to varied wall thicknesses, materials, and dynamic human subjects remains unproven. The system relies on magnitude spectrum estimation while retaining noisy input phase, which caps phase-correction performance. Dataset scale is bounded to simulated LibriSpeech mixtures without extensive real-world human speaker evaluations in the primary benchmark.

## Why read this

Speech and ML engineers working on non-acoustic sensing or challenging bandwidth extension tasks should read this to see how cascaded temporal multi-query attention and frequency-domain fusion can effectively stabilize high-frequency reconstruction under extremely low SNR conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Non-acoustic speech enhancement, through-wall surveillance, search and rescue communications, and disaster recovery audio processing.

## Institutions / 機構

Nanyang Technological University, Cochin University of Science and Technology

## Related

- [mmWave Radar Aware Dual-Conditioned GAN for Speech Reconstruction of Signals With Low SNR](karani26_interspeech.md) — same problem · relatedness 2.8/3
- [VeRe-Flow: Guiding Flow Matching toward Clean Speech via Velocity Contrastive Regularization and Representation Alignment for Noise-Robust Bandwidth Expansion](koo26_interspeech.md) — same problem · relatedness 1.9/3
- [TF-MossFormer: Integrating Convolution Gated Local-Global Attentions for Enhanced Time-Frequency Domain Monaural Speech Separation](zhao26_interspeech.md) — shared technique · relatedness 1.8/3
- [STSR: High-Fidelity Speech Super-Resolution via Spectral-Transient Context Modeling](yuan26_interspeech.md) — shared technique · relatedness 1.8/3
- [Dictionary-Free Discrete Key-Value Attention for Improving Speech Enhancement](cui26b_interspeech.md) — shared technique · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
