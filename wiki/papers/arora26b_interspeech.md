---
id: arora26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1903
pdf: https://www.isca-archive.org/interspeech_2026/arora26b_interspeech.pdf
---

# VIB-AVSR: Variational Information Bottleneck for Noise-Robust LLM-Based Audio-Visual Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/arora26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arora26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1903)

**TL;DR** — VIB-AVSR integrates variational information bottleneck layers into multimodal LLM backbones to regularize noise-corrupted audio representations, achieving lower word error rates across varying signal-to-noise ratios without architectural changes or extra data.

## Problem

Large language model-based audio-visual speech recognition systems typically rely on pre-trained LLM backbones optimized for clean text and speech, making their internal representations vulnerable to acoustic noise. Because fine-tuning is restricted to lightweight adapters like LoRA, the LLM itself lacks an explicit mechanism to produce stable representations under corrupted audio conditions. This domain shift leads to significant performance degradation in noisy environments.

## Method

The paper proposes VIB-AVSR, which inserts Variational Information Bottleneck (VIB) layers after specific transformer layers in the LLM backbone, specifically at layers 4 and 8. The VIB module uses a position-wise two-layer MLP to parameterize a diagonal Gaussian posterior over audio token hidden states, while text and visual states bypass the bottleneck. During training, it minimizes an objective combining autoregressive transcription likelihood and a KL divergence penalty against a learnable Gaussian prior, controlled by a compression tradeoff weight beta set to 0.1. At inference, the posterior mean is used and interpolated evenly with pre-bottleneck features using an alpha coefficient of 0.5.

## Results

Evaluated on the LRS2 dataset using Whisper-medium for audio and AV-HuBERT for video encoders with a Llama-3.2-1B LLM backbone, VIB-AVSR is tested against babble and speech noise from MUSAN across five SNR levels (-10 to 5 dB) under clean and noisy training paradigms. Under noisy training with babble noise, VIB-AVSR reduces average word error rate (WER) from 18.85% to 17.39%, and under extreme low-SNR conditions (-10 to -2 dB) improves average WER from 34.87% to 32.52%. It also outperforms standard Llama-AVSR on noise-free clean evaluations (achieving 2.38% vs 2.72% WER), demonstrating that the bottleneck acts as a beneficial regularizer.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building multimodal conversational agents or robust transcription systems for noisy acoustic environments.

## Limitations

The text states that setting the feature interpolation coefficient alpha to 0 or using an alpha schedule leads to higher word error rates because the sampled representations become too lossy for the LLM.

## Related

- (link related pages by id as the wiki grows)
