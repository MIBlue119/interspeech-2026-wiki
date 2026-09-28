---
id: shen26e_interspeech
category: speech-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3139
pdf: https://www.isca-archive.org/interspeech_2026/shen26e_interspeech.pdf
---

# Adaptive Hard-Pair Sampling via Curriculum Learning for Speech Separation

*Pengjie Shen, Xueliang Zhang, Zhong-Qiu Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/shen26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3139)

**TL;DR** — A curriculum hard-pair sampling strategy for speech separation builds an online speaker-speaker difficulty matrix using exponential moving averages, shifting sampling from uniform to hard-biased via temperature-controlled Softmax. On Libri2Mix, it improves bottom-30% tail SDRi (e.g., TF-GridNet from 18.3 dB to 18.8 dB) while preserving or improving average performance without training overhead.

## Key contributions

- Proposes an online, dynamically updated speaker-speaker difficulty matrix (D) and counting matrix (C) requiring only scalar EMA updates without pre-computing offline corpus splits.
- Implements a two-step temperature-controlled curriculum sampler that selects an anchor uniformly and samples interference via a Softmax over observed partner difficulties.
- Demonstrates consistent tail-performance improvements (bottom 30% SDRi) across three diverse separation backbones (Conv-TasNet, BSRNN, TF-GridNet) on Libri2Mix.
- Shows that a high initial temperature (tau_0 = 20) with a linear decay schedule prevents early-stage training instability and maintains average SI-SDRi.

## Problem

Monaural speech separation models like Conv-TasNet, DPRNN, and TF-GridNet are conventionally trained using uniform random mixture sampling, resulting in high residual interference on rare 'hard pairs' of speakers with similar timbres. Prior hard-mining and curriculum techniques either require cumbersome offline corpus partitioning or alter loss-level distributions, causing degradation in mean performance. Addressing this tail error is critical for real-world robustness, as these rare failures dominate users' perceptions of system quality.

## Method

The method maintains a dense speaker-speaker difficulty matrix D in R^{N x N} and a counting matrix C in N^{N x N} initialized with undefined/neutral values. Whenever a mini-batch processes a mixture from speaker pair (s_i, s_j), the negative SI-SDR score h_{i,j} is used to update D_{i,j} via an exponential moving average with smoothing factor alpha, enforcing symmetry D_{i,j} = D_{j,i}. During training epochs between E_warm (20) and E_stop (100), sampling uses a curriculum: an anchor speaker i is drawn uniformly, and a partner j is sampled from observed partners C_i using a temperature-controlled Softmax distribution p_tau(j|i) proportional to exp(D_{i,j}/tau). The temperature follows a linear decay schedule tau(e) = max(tau_min, tau_0 * (1 - (e-1)/E_decay)) with an initial temperature tau_0 = 20. Outside the warm-up and stop epochs, standard uniform dynamic mixing is used.

In early epochs (e <= 20), training stays close to uniform to build a stable baseline since SI-SDR feedback is unreliable. In intermediate epochs, decreasing tau focuses updates on persistent hard pairs, isolating high difficulty to a compact cluster rather than destabilizing global training. The strategy requires only reading a difficulty matrix row, computing a categorical Softmax sample, and performing scalar EMA updates, introducing negligible computational overhead.

## Experimental setup

Evaluated on the Libri2Mix dataset (100h and 360h training subsets containing 64,700 mixtures and 1,172 distinct speakers, generated via on-the-fly dynamic mixing with inter-speaker SNR in [-5, 5] dB). Compared against standard dynamic mixing baselines using uniform speaker-pair sampling across three backbones: Conv-TasNet, BSRNN, and TF-GridNet. Evaluated using scale-invariant signal-to-distortion ratio improvement (SI-SDRi / SDRi) across various intervals and bottom-30% tail performance, using the Adam optimizer with initial lr 10^{-3} halved after 4 epochs of no validation improvement.

## Results

For Conv-TasNet, the baseline mean SI-SDRi is 16.7 dB; the curriculum sampler with tau_0 = 20 matches this at 16.7 dB while reducing mixtures with SDRi < 10 dB from 203 to 156 and lifting bottom-30% tail SDRi from 12.9 to 13.2 dB. For BSRNN, mean SI-SDRi improves from 21.0 dB to 21.3 dB (tau_0 = 20), with bottom-30% SDRi rising from 17.4 to 17.6 dB and sub-10 dB failures dropping from 25 to 15. For TF-GridNet, mean SI-SDRi reaches 22.7 dB (vs 21.9 dB baseline), bottom-30% tail SDRi improves from 18.3 to 18.8 dB, and sub-10 dB failures drop from 27 to 7 while high-performing samples ([20, infinity) dB) increase from 4,591 to 4,729.

| Model & Strategy | Mean SI-SDRi (dB) | Bottom 30% Tail SDRi (dB) | SDRi < 10 dB Count |
|---|---|---|---|
| Conv-TasNet (Baseline) | 16.7 | 12.9 | 203 |
| Conv-TasNet (+ Hard-Pair) | 16.7 | 13.2 | 156 |
| BSRNN (Baseline) | 21.0 | 17.4 | 25 |
| BSRNN (+ Hard-Pair) | 21.3 | 17.6 | 15 |
| TF-GridNet (Baseline) | 21.9 | 18.3 | 27 |
| TF-GridNet (+ Hard-Pair) | 22.7 | 18.8 | 7 |

## Limitations

Evaluated exclusively on two-speaker clean-speech Libri2Mix mixtures, leaving multi-speaker (C > 2) and real-world noisy/reverberant configurations unverified. The curriculum relies on hyper-parameters like E_warm, E_stop, and tau_0 which require tuning per architecture. The approach assumes distinct identifiable speakers with known IDs to construct the difficulty matrix, limiting direct applicability to unlabelled open-set streaming scenarios.

## Why read this

Researchers and engineers building monaural speech separation systems who want to eliminate tail errors on acoustically challenging speakers without incurring extra network parameters or loss-engineering overhead should adopt this technique.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Meeting transcription, robust automatic speech recognition, and multi-speaker voice interaction systems.

## Related

- (link related pages by id as the wiki grows)
