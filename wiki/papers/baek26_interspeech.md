---
id: baek26_interspeech
category: asr
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3336
pdf: https://www.isca-archive.org/interspeech_2026/baek26_interspeech.pdf
---

# SPARK: Efficient Audio-Text Matching for User-Defined Keyword Spotting via Spiking Neural Networks

*Seung-Yeop Baek, Sangho Han, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/baek26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baek26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3336)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — SPARK is the first spike-driven, end-to-end spiking neural network framework for user-defined keyword spotting that matches open-vocabulary text to audio. It achieves competitive accuracy on LibriPhrase while reducing parameter count by 2.1× and energy consumption by 21.7× compared to ANN baselines.

## Key contributions

- Proposes SPARK, the first open-vocabulary user-defined keyword spotting framework built entirely within the spiking neural network (SNN) domain without conversion from ANNs.
- Introduces a spike-driven self-attention (SDSA) mechanism that replaces heavy floating-point matrix multiplications with low-cost accumulation operations in O(N) linear time complexity.
- Combines a spiking audio encoder (SAE), time-expanded spiking text encoder (STE), and spiking pattern extractor (SPE) to achieve cross-modal alignment without pre-trained audio encoders.
- Employs a multi-task objective utilizing both utterance-level and phoneme-level binary cross-entropy losses to effectively separate confusable, similar-sounding keywords.

## Problem

As voice-driven interaction grows, user-defined keyword spotting (UDKWS) allows users to enroll custom keywords via text, bypassing the need for voice samples. However, current artificial neural network (ANN) models rely heavily on memory-intensive multiply-accumulate (MAC) operations, hindering efficient always-on deployment on resource-constrained hardware. While prior works like CMCD and PhonMatchNet achieve high accuracy, their computational footprint and energy overhead remain impractical for edge devices. Spiking neural networks (SNNs) offer a low-power alternative through asynchronous binary spikes and sparse accumulations, but prior SNN-based KWS methods were strictly limited to closed-set classification rather than open-vocabulary text matching.

## Method

SPARK consists of three primary modules: spiking audio and text encoders, a spiking pattern extractor (SPE), and a pattern discriminator. The Spiking Audio Encoder (SAE) processes 40-bin log-mel spectrograms using a spiking embedding extractor with depthwise-separable convolutions and parametric leaky integrate-and-fire (PLIF) neurons, generating sparse acoustic spike embeddings with silence producing minimal threshold crossings. The Spiking Text Encoder (STE) converts static text phoneme embeddings into spatiotemporal spike trains using time-sequence expansion across $S=8$ simulation steps, positional encoding, and spiking temporal-sequential attention (STSA). The Spiking Pattern Extractor (SPE) concatenates audio and text spike representations along the temporal axis and models cross-modal interactions via Spike-Driven Self-Attention (SDSA), which computes attention scores by accumulating spikes along the temporal axis using a multiplication-free 'Mask & Add' mechanism.

The pattern discriminator evaluates agreement via a gated spike neuron (GSN) at the utterance level and via a linear-sigmoid layer at the phoneme level. The system is trained end-to-end using surrogate gradients with a multi-task objective combining utterance-level and phoneme-level binary cross-entropy (BCE) losses, where the latter provides phonetic supervision to separate hard negative samples. Inference operates entirely in the spiking domain, replacing energy-intensive MACs with AC operations based on sparse neuronal firing rates.

## Experimental setup

Models were trained on the LibriPhrase dataset (800k samples derived from LibriSpeech train-clean-100 and train-clean-360) and evaluated on the LibriPhrase test set (train-other-500 split) divided into Easy (LE) and Hard (LH) subsets. Inputs are 40-bin log-mel spectrograms with a 25ms window and 10ms shift. The embedding dimension $D$ is 128, simulation steps $S=8$, batch size 256, trained for 100 epochs using the AdamW optimizer with a learning rate of $1 \times 10^{-3}$. Baselines include CMCD and PhonMatchNet. Metrics include AUC, EER, and theoretical energy consumption estimated from a 45nm CMOS process ($E_{AC}=0.9$ pJ, $E_{MAC}=4.6$ pJ) scaled by network spike rates.

## Results

On the LibriPhrase-Easy (LE) test split, SPARK achieves an AUC of 99.07% and an EER of 3.97%, closely tracking the heavy ANN baseline PhonMatchNet (AUC 99.67%, EER 2.18%) while outperforming CMCD on certain metrics. Crucially, SPARK requires only 18.44 µJ per inference, achieving a 6.8× energy reduction over CMCD (125.12 µJ) and a 21.7× energy reduction over PhonMatchNet (400.66 µJ). Parameter count is reduced to 287K (a 2.1× reduction versus ANN baselines around 620K).

Ablation studies substituting individual SNN modules with ANN counterparts demonstrate the necessity of the spiking design: replacing the spiking audio encoder (Variant 1) or text encoder (Variant 2) degrades EER to over 4.83% and spikes energy consumption up to 291 µJ. While substituting the SPE with an ANN yields slightly lower EER on Hard subsets (Variant 4, 22.20% vs 24.98%), it inflates energy consumption to 150.89 µJ, underscoring that SPARK's end-to-end spiking formulation is essential for extreme energy efficiency.

| System | Params [K] | Energy [µJ] | AUC LE [%] | AUC LH [%] | EER LE [%] |
|---|---|---|---|---|---|
| CMCD [12] | 619 | 125.12 | 97.76 | 79.28 | 6.77 |
| PhonMatchNet [14] | 620 | 400.66 | 99.67 | 83.17 | 2.18 |
| SPARK (Ours) | 287 | 18.44 | 99.07 | 82.71 | 3.97 |

## Limitations

The evaluation is restricted to the LibriPhrase English dataset and does not report multilingual or noisy-environment evaluations. The model relies on a surrogate gradient approximation to train non-differentiable spiking neurons, which may limit scaling stability on larger open-domain speech corpora. Furthermore, hardware efficiency is currently estimated via theoretical CMOS energy models rather than deployed measurements on neuromorphic edge chips.

## Why read this

Speech and ML engineers building always-on, low-power edge devices will find SPARK essential reading for learning how to design native end-to-end spiking cross-modal attention mechanisms without heavy pre-trained encoders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Always-on smart home appliances, wearable devices, and mobile handsets requiring low-latency, ultra-low-power customizable wake-word detection.

## Institutions / 機構

Hanyang University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea government

## Related

- (link related pages by id as the wiki grows)
