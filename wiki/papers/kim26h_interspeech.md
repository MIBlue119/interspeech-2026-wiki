---
id: kim26h_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-929
pdf: https://www.isca-archive.org/interspeech_2026/kim26h_interspeech.pdf
---

# Attention-Guided Reliability Scaling for Contrastive Decoding in Robust Audio-Visual Speech Recognition

*YoungChae Kim, Da-Hee Yang, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-929)

**TL;DR** — This paper introduces attention-guided reliability scaling for contrastive decoding in LLM-based audio-visual speech recognition (AVSR), achieving consistent Word Error Rate reductions across clean and severely noisy environments without any model fine-tuning.

## Key contributions

- Formulates a training-free, inference-time contrastive decoding (CD) framework for AVSR that contrasts audio-visual conditioning (Expert) against audio-only conditioning (Amateur) within the same LLM.
- Analyzes the fundamental noise-robustness vs. clean-speech preservation trade-off inherent in static fixed-weight contrastive decoding.
- Proposes a multiplicative soft-gating mechanism driven by relative audio energy, audio attention entropy, and Jensen-Shannon predictive divergence to dynamically modulate token-level intervention strength.
- Demonstrates consistent generalization across different model scales (0.5B to 8B parameters) and out-of-distribution evaluation sets (LRS2).

## Problem

Large language model-based AVSR systems are vulnerable to degraded acoustic inputs because they can over-rely on noisy audio when environmental conditions deteriorate. Prior strategies to fix this require structural modifications, auxiliary gating modules, or additional fine-tuning, which increases training cost and deployment complexity. Applying standard contrastive decoding with a static weight helps under severe noise but over-corrects and distorts reliable predictions during clean conditions. Because acoustic signal-to-noise ratios fluctuate dynamically at the token level, a uniform intervention strength fails to balance noise robustness with clean-speech preservation.

## Method

The framework operates entirely at inference time by running the underlying LLM-based AVSR model under two conditioning modes: full audio-visual input for the Expert, and audio-only input (dropping video embeddings) for the Amateur. The standard contrastive weight $\lambda$ is modulated per token via a multiplicative soft gate $w_t = w_t^{(E)} \cdot w_t^{(H)} \cdot w_t^{(JS)}$, where $w_t \in [0, 1]$ smoothly interpolates between standard AVSR ($w_t=0$) and full contrastive decoding ($w_t=1$).

The relative audio energy $E_t$ measures how much attention the final decoding token assigns to the audio region at the last Transformer layer, averaged across all attention heads. To handle volume and SNR fluctuations, $E_t$ is dynamically normalized against a running utterance mean $\bar{E}_t$ through a sigmoid function with sensitivity parameter $\beta_E=10.0$. The audio entropy $H_t$ is calculated independently per attention head over normalized audio weights, divided by $\log N_a$ to bound it in $[0, 1]$, and passed through a sigmoid with $\beta_H=10.0$ to measure acoustic uncertainty.

The Jensen-Shannon divergence $JS_t$ measures predictive disagreement between Expert and Amateur distributions, normalized by $\ln 2$. To prevent rank distortion—where extreme Amateur collapse injects massive negative log-probability offsets across the vocabulary—a Gaussian filter centered at $\mu_{\text{sweet}} = 0.35$ with $\sigma_{JS} = 0.15$ suppresses intervention when distributions are either identical or excessively divergent, focusing contrast on informative transitional states. The base contrastive weight is set to $\lambda = 0.3$, and gating parameters use $\beta_E = \beta_H = 10.0$.

## Experimental setup

Evaluated on the LRS3 dataset (433 hours training set, 1,327 test utterances) and out-of-distribution on the LRS2 test set. Noise from the MUSAN dataset (equal mix of noise, speech, and music) was artificially injected at clean, 0 dB, -5 dB, -10 dB, and -15 dB SNR levels. Three model scales were tested: Llama-AVSR (Llama-3.1-8B with Whisper-Medium), Omni-AVSR (Llama-3.2-1B with Whisper-Small), and Qwen-AVSR (Qwen2.5-0.5B with Whisper-Small), using frozen AV-HuBERT-Large visual encoders and LoRA projection layers. Experiments ran on NVIDIA A100 GPUs, adding an 8.6% per-utterance latency overhead (+136.4 ms over a baseline of 1577.9 ms).

## Results

On the Llama-AVSR 8B LRS3 test set, the proposed method improves clean WER from 0.0095 to 0.0082 (+13.68% relative) and severely noisy -15 dB WER from 0.3723 to 0.3369 (+9.51% relative), achieving an average relative improvement of 9.95% across all SNR conditions. Across Llama-AVSR, Omni-AVSR, and Qwen-AVSR on LRS3 and LRS2, the method consistently boosts performance in both clean and degraded conditions, outperforming static fixed-$\lambda$ contrastive decoding which forces a trade-off between clean accuracy and denoising. Ablation studies confirm that combining energy, entropy, and JS divergence cues yields superior balance across all noise tiers compared to using any single cue in isolation.

| System & Condition | Clean (WER) | 0 dB (WER) | -5 dB (WER) | -10 dB (WER) | -15 dB (WER) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Llama-AVSR 8B (Baseline) | 0.0095 | 0.0367 | 0.0945 | 0.2358 | 0.3723 |
| Llama-AVSR 8B (Ours) | **0.0082** | **0.0330** | **0.0866** | **0.2167** | **0.3369** |
| Omni-AVSR 1B (Baseline) | 0.0142 | 0.0495 | 0.1175 | 0.2509 | 0.3305 |
| Omni-AVSR 1B (Ours) | **0.0111** | **0.0468** | **0.1108** | **0.2306** | **0.3053** |

## Limitations

The evaluation relies on synthetic noise injections via MUSAN rather than natural multi-condition acoustic recordings with reverberation and spatial distortion. The approach introduces a small inference latency overhead (~8.6%) due to evaluating both audio-visual and audio-only conditioning passes at each step. Additionally, hyperparameter settings like $\mu_{\text{sweet}}$ and sigmoid sharpness rely on validation tuning which may require re-calibration for entirely different backbone architectures or low-resource languages.

## Why read this

Speech and ML researchers working on LLM-based speech recognition or multi-modal fusion will learn how to stabilize inference-time generation against modality corruption without retraining. It provides a blueprint for leveraging attention dynamics and predictive divergence to dynamically regulate contrastive decoding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust audio-visual speech recognition systems for edge devices, noisy automotive environments, and multi-modal meeting transcription.

## Related

- (link related pages by id as the wiki grows)
