---
id: ploujnikov26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2784
pdf: https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.pdf
---

# HybridCodec: Modeling Discrete and Continuous Representations For Efficient Speech Language Models

*Artem Ploujnikov, Francesco Verdini, Samir Sadok, Mirco Ravanelli*

[PDF](https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ploujnikov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2784)

**TL;DR** — HybridCodec and HybridLM combine temporally compressed discrete tokens with a single-step non-autoregressive continuous residual stream, maintaining high-fidelity speaker identity and semantics at ultra-low frame rates down to 6.25 Hz while significantly reducing autoregressive generation steps.

## Key contributions

- HybridCodec: Extends FocalCodec with a dual-path architecture that extracts time-reduced discrete tokens and dimensionality-reduced continuous residuals.
- HybridLM: A unified decoder-only Transformer utilizing Adaptive Layer Normalization (AdaLN) to interleave autoregressive discrete token generation and non-autoregressive residual upsampling.
- Unified framework: Handles both generative tasks (TTS) and discriminative tasks (ASR) within a single architecture, bypassing task-specific diffusion or masking workarounds.
- Ultra-low frame rate efficiency: Enables high-fidelity speech synthesis at 6.25 Hz and 12.5 Hz, cutting total generation steps by factors corresponding to the temporal downsampling stride.

## Problem

Modern speech Large Language Models rely heavily on discrete Neural Audio Codecs (NACs) like VQ-VAE, which discard fine-grained acoustic details, microprosody, and speaker timbre due to the fundamental rate-distortion trade-off at low bitrates. While prior work attempts to bridge this discrete-continuous gap via diffusion or continuous autoregressive modeling, these solutions are heavily task-specific and sacrifice the unified generalizability of discrete LLMs. This information bottleneck causes severe performance drops in downstream tasks like TTS and ASR when operating at efficient, low frame rates.

## Method

The HybridCodec encoding pipeline starts by mapping base representations x_base from the first 6 layers of pretrained WavLM into a dual discrete-continuous space. The discrete pathway obtains quantized indices z_q via Binary Spherical Quantization (BSQ) to yield x_hat_quant. The continuous pathway computes the residual error x_res = x_base - x_hat_quant, which is then temporally downsampled and dimensionality-reduced using a dedicated residual focal encoder (FE_res) with a temporal stride r to produce x_bar_res. Stride configurations include (1,1,1) for 50 Hz, (2,1,1) for 25 Hz, (2,2,1) for 12.5 Hz, and (2,2,2) for 6.25 Hz. During decoding, the residual focal decoder (FD_res) upsamples x_bar_res by r, and the final representation x_hat_base is formed by adding x_hat_quant and x_hat_res before passing through a Vocos vocoder.

The HybridLM architecture employs a 12-layer GPT-style decoder-only Transformer with 4 attention heads, d_model = d_emb = 512, and d_ffn = 2048. To prevent objective interference between discrete AR token classification and continuous NAR residual regression, it uses Adaptive Layer Normalization (AdaLN). A mode-specific embedding i_mode in {AR, NAR} injects scaling (gamma) and bias (beta) parameters at every layer, creating specialized submodels within a shared backbone. Speaker conditioning is injected via linear projection and addition of pretrained ECAPA-TDNN embeddings from SpeechBrain.

During inference, generation operates in a cascading manner: discrete tokens are generated autoregressively, followed by a single non-autoregressive forward pass predicting the continuous residuals. The discrete tokens are temporally upsampled and concatenated with the residuals. A signed-log transform f_SLT(x) = sign(x) log(|x| + 1) is applied to stabilize training dynamics. This cuts inference steps from n_full down to n_full / r + 1.

## Experimental setup

Evaluated on the 960-hour LibriTTS dataset (using clean and other splits for training, but strictly evaluating on the clean test set, discarding audio samples exceeding 20 seconds). Evaluated using Resynthesis, TTS (1,000 uniformly sampled utterances), and ASR tasks. Baselines include DAC, Mimi, BigCodec, and FocalCodec. Metrics include UTMOS, NISQA, dWER (using Whisper Small with greedy decoding), SpkSim (WavLM-SV cosine similarity), Code Usage, Normalized Entropy, WER, and CER.

## Results

In resynthesis at 12.5 Hz, HybridCodec achieves a dWER of 1.47 and SpkSim of 96.2, outperforming discrete FocalCodec (dWER 7.94, SpkSim 93.9). At an extreme 6.25 Hz, HybridCodec maintains strong performance with 3.98 UTMOS and 1.50 dWER.

For zero-shot TTS at 12.5 Hz, the hybrid method more than doubles the UTMOS score (4.10 vs 1.99) and reduces dWER by over half (14.79 vs 32.97) compared to the discrete baseline. At 6.25 Hz TTS, the hybrid approach achieves 3.08 UTMOS and 48.0 dWER versus 1.44 UTMOS and 121.0 dWER for the discrete-only baseline. In ASR, the hybrid model consistently lowers word error rates across all frame rates, improving 50 Hz WER from 28.11 to 23.36 and 12.5 Hz WER from 28.50 to 25.94.

| NAC / Representation | Frame rate | UTMOS (↑) | dWER (↓) | SpkSim (↑) |
|---|---|---|---|---|
| Reference | — | 4.09 | 0.00 | 100.0 |
| FocalCodec [21] | 12.5 Hz | 4.22 | 7.94 | 93.9 |
| HybridCodec (Ours) | 12.5 Hz | 4.09 | 1.47 | 96.2 |
| HybridCodec (Ours) | 6.25 Hz | 3.98 | 1.50 | 97.1 |
| Discrete-Only TTS | 12.5 Hz | 1.99 | 32.97 | 0.853 |
| Hybrid TTS (Ours) | 12.5 Hz | 4.10 | 14.79 | 0.905 |

## Limitations

Evaluation is restricted to English via the LibriTTS corpus, leaving multilingual scalability unverified. Audio samples exceeding 20 seconds were filtered out during training, which could impact long-form story or dialogue generation stability. The architecture requires training a dual-path codec and a specialized cascaded transformer, introducing architectural complexity relative to standard discrete-only language models.

## Why read this

Researchers and engineers building speech LLMs or low-bitrate neural audio codecs should read this paper to learn how to eliminate the traditional rate-distortion quality drop at ultra-low frame rates by coupling discrete AR tokens with non-autoregressive continuous residuals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Zero-shot text-to-speech, low-bandwidth neural speech coding, and unified multi-modal speech-text dialogue systems.

## Related

- (link related pages by id as the wiki grows)
