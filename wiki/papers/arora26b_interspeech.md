---
id: arora26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1903
pdf: https://www.isca-archive.org/interspeech_2026/arora26b_interspeech.pdf
---

# VIB-AVSR: Variational Information Bottleneck for Noise-Robust LLM-Based Audio-Visual Speech Recognition

*Piyush Arora, Navlika Singh, Umberto Cappellazzo, Stavros Petridis, Maja Pantic*

[PDF](https://www.isca-archive.org/interspeech_2026/arora26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arora26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1903)

**TL;DR** — VIB-AVSR integrates Variational Information Bottleneck layers into targeted intermediate positions of an LLM-based audio-visual speech recognition backbone to suppress acoustic noise, reducing Word Error Rate (WER) across diverse SNR levels and noise types without extra training data.

## Key contributions

- Proposes VIB-AVSR, embedding lightweight Variational Information Bottleneck (VIB) layers into the LLM backbone to filter noise at the representation level without architectural overhauls.
- Demonstrates that variational compression improves generalization to noisy environments under both noisy and clean training paradigms.
- Performs systematic ablation studies confirming that dual-layer bottleneck placement (layers 4 and 8) with regularization strength beta = 0.1/H is optimal.
- Achieves consistent WER reductions over Llama-AVSR across babble and speech noise, with the largest gains concentrated in extreme negative SNR conditions.

## Problem

LLM-based audio-visual speech recognition models leverage pre-trained encoders linked to large language models via lightweight adapters, achieving exceptional clean-speech accuracy. However, their LLM backbones are typically optimized purely on text and fine-tuned only via low-rank adaptation (LoRA), leaving them unequipped to handle domain shifts caused by acoustic noise. Prior encoder-decoder AVSR models learn noise-robust features end-to-end, but in MLLMs, the burden of noise robustness falls entirely on the encoders because the LLM lacks an explicit mechanism to stabilize corrupted audio representations. This paper addresses this vulnerability directly by regularizing intermediate LLM representations rather than relying solely on data augmentation or encoder modifications.

## Method

VIB-AVSR introduces a variational information bottleneck mechanism applied selectively to audio hidden states (Ha) within an LLM backbone, leaving visual (Hv) and text (Ht) hidden states untouched since they are not directly corrupted by acoustic noise. The LLM backbone utilizes Llama-3.2-1B with Whisper-medium as the audio encoder and AV-HuBERT as the video encoder (with a downsampling token compression rate of 3). At selected transformer layers l, the audio hidden state is mapped via a position-wise two-layer MLP (GeLU activation, producing 2H output neurons) to parameterize a Gaussian posterior distribution N(mu, sigma^2 * I) for each token. During training, latent representations are sampled using the reparameterization trick. To balance compression and speech retention, the sampled bottleneck representation is interpolated with the pre-bottleneck representation via Z_hat = alpha * H + (1 - alpha) * Z_tilde, using a fixed alpha = 0.5. During inference, sampling is bypassed by using only the mean vector mu.

The training objective combines the predictive log-likelihood term and a closed-form Kullback-Leibler (KL) divergence regularizer that penalizes mutual information between the input and the bottlenecked representation. Based on ablations, VIB modules are placed at transformer layers 4 and 8 with a normalized regularization hyperparameter beta = 0.1/H. The LLM and video encoders are fine-tuned using LoRA (rank 64 for LLM, rank 16 for video encoder), while the audio encoder remains frozen.

## Experimental setup

Evaluated on the LRS2 dataset containing BBC program clips of English speech. Noise robustness is tested using babble and speech noise samples from the MUSAN dataset at five SNR levels (-10, -5, -2, 0, and 5 dB) plus clean conditions (infinity). Compared directly against the Llama-AVSR baseline under both noisy and clean training paradigms. Metrics reported include Word Error Rate (WER) per SNR level and the extreme noise average Avg (N>S) covering -10, -5, and -2 dB.

## Results

Under the noisy training paradigm with babble noise, VIB-AVSR consistently outperforms Llama-AVSR across all SNR levels, lowering average WER from 18.85% to 17.39% and improving extreme noise average Avg (N>S) from 26.84% to 24.59%. Under clean training (no noise augmentation), VIB-AVSR generalizes more effectively to unseen noisy test environments, dropping average babble WER from 23.07% to 21.09% and speech noise average WER from 16.20% to 15.05%, while preserving strong clean performance (2.42% vs 2.34% WER). Ablations show that single-layer bottlenecks lack sufficient capacity, triple-layer setups over-regularize, and fixed interpolation at alpha=0.5 outperforms both zero interpolation and cosine scheduling.

| System | Training | Babble Avg | Babble (N>S) | Speech Avg | Speech (N>S) | Clean (Inf) |
|---|---|---|---|---|---|---|
| Llama-AVSR | Noisy | 18.85% | 26.84% | 12.16% | 17.24% | 2.72% |
| VIB-AVSR (Ours) | Noisy | 17.39% | 24.59% | 11.74% | 16.55% | 2.38% |
| Llama-AVSR | Clean | 23.07% | 33.85% | 16.20% | 23.78% | 2.34% |
| VIB-AVSR (Ours) | Clean | 21.09% | 30.64% | 15.05% | 21.83% | 2.42% |

## Limitations

Evaluated exclusively on English speech using the LRS2 dataset, leaving multilingual and larger-scale dataset scaling unverified. The study is restricted to two noise types (babble and speech from MUSAN) and evaluated solely on a 1B parameter LLM backbone (Llama-3.2-1B). Performance gains under additive speech noise at milder SNR levels (e.g., 5 dB) show marginal or comparable results to the baseline.

## Why read this

Researchers building multimodal speech LLMs will find this a pragmatic, computationally light recipe for injecting representation-level noise robustness into pre-trained LLM backbones without retraining base encoders or expanding datasets.

## Code

- https://github.com/PiyushArora99/VIB-AVSR

## Applications

Robust automated speech recognition and transcription systems deployed in acoustically challenging, noisy real-world environments.

## Related

- (link related pages by id as the wiki grows)
