---
id: shi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-612
pdf: https://www.isca-archive.org/interspeech_2026/shi26_interspeech.pdf
---

# Distilling LLM Semantic Priors into Encoder-Only Multi-Talker ASR with Talker-Count Routing

*Hao Shi, Yusuke Fujita, Roman Koshkin, Mengjie Zhao, Yuan Gao, Lianbo Liu, Yui Sudo*

[PDF](https://www.isca-archive.org/interspeech_2026/shi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-612)

**TL;DR** — This paper presents an encoder-only multi-talker ASR framework that distills semantic priors from a frozen LLM teacher into the speech encoder during training while using serialized CTC for fast, non-autoregressive decoding. By incorporating a Talker-Count Head for dynamic branch routing, the system achieves comparable performance to LLM decoders on two-talker mixtures and substantially outperforms them on three-talker mixtures with a massive speedup.

## Key contributions

- Replaces slow autoregressive LLM decoders with a fast encoder-only serialized CTC pipeline by using the LLM exclusively as a train-time adaptable teacher for acoustic representation regularization.
- Proposes a two-phase training strategy that first adapts an LLM-based SOT objective via LoRA for multi-talker conditioning and then distills its semantic guidance into the speech encoder during CTC training.
- Introduces a lightweight Talker-Count Head (TCH) with attentive-stats pooling to dynamically route inputs to specialized two- or three-talker branches, removing the need to specify the speaker count a priori.
- Demonstrates superior scaling to complex heavy-overlap scenarios (Libri3Mix), outperforming LLM-decoder baselines while dropping inference real-time factor (RTF) down to 0.0106.

## Problem

End-to-end multi-talker ASR typically relies on autoregressive attention-based encoder-decoder architectures with LLM decoders, which are computationally expensive and suffer significant performance degradation under heavy overlap because mixed-speech encoder representations remain talker-agnostic. Conversely, encoder-only serialized CTC methods offer fast decoding but struggle with training stability under severe overlap and traditionally require knowing the exact talker count in advance. This creates a trade-off between the strong semantic priors of LLMs and the inference efficiency of CTC, which this paper resolves by bridging training-time distillation with encoder-only inference.

## Method

The framework utilizes a pretrained WavLM-Large encoder whose initial 12 layers are shared as a frozen feature extraction and base representation layer, followed by independent 12-layer Transformer branches specialized for 2 and 3 talkers. A post-encoder separator consisting of a 2-layer LSTM with 896 hidden units, layer normalization, and parallel linear projections splits the hidden states into talker-specific streams ordered by speaker onset time, optimized via serialized CTC. Training proceeds in two phases: Phase 1 adapts LLaMA-3.2-1B using LoRA and tied token embeddings via the SOT cross-entropy objective to handle multi-talker overlap while backpropagating gradients to distill semantic guidance into the encoder. Phase 2 freezes the adapted LLM teacher and trains the separator and CTC heads using a hybrid loss combining serialized CTC and continued SOT distillation with weighting parameter alpha.

To handle variable numbers of talkers dynamically without oracle counts, a Talker-Count Head (TCH) evaluates the shared encoder output using additive attentive-stats pooling (incorporating hidden dimensionality, elementwise square scaling, layer norm, GELU, dropout, and an MLP) to output binary logits for 2 vs 3 talkers. This prediction dynamically selects whether the input passes through the 2-talker or 3-talker encoder branch and its corresponding serialized CTC heads during inference, avoiding any runtime dependency on the LLaMA model.

## Experimental setup

Evaluated on LibriMix (270 hours for Libri2Mix and 186 hours for Libri3Mix), utilizing clean speech from LibriSpeech (train-clean-100, 360, dev/test-clean) and noise from WHAM! across noisy and clean evaluation conditions. Compared against traditional training-from-scratch baselines, non-LLM encoder-only models (CTC, GEncSep), and autoregressive SOT-Llama-1B/3B and SOP-Llama-1B/3B architectures. Metrics include Word Error Rate (WER) and talker-count accuracy (A.TC), measured on a single NVIDIA H100 80GB GPU with batch size 1 for real-time factor (RTF).

## Results

On Libri2Mix evaluation set under noisy conditions, the proposed variably-routed model achieves a WER of 9.7% (ID-9), performing competitively against SOT-Llama-1B (11.3%) and SOT-Llama-3B (9.8%). On the much harder Libri3Mix noisy evaluation set, the proposed encoder-only model achieves a WER of 24.5%, substantially outperforming SOT-Llama-1B (39.1%) and SOT-Llama-3B (31.7%) as well as matching or beating several specialized LLM setups. Under clean conditions, the system achieves 4.1% WER on Libri2Mix and 14.3% on Libri3Mix.

Inference efficiency shows dramatic gains: the proposed CTC-based model achieves an RTF of 0.0043 on Libri2Mix and 0.0106 on Libri3Mix, compared to 0.1150 and 0.0981 for LLaMA-1B. Ablations confirm that removing LLM distillation entirely causes training collapse (WER jumps above 70%), and utilizing 12 Transformer layers prior to the TCH yields optimal talker-count accuracy (97.0%–98.0% on clean 2/3 mix) compared to raw feature extraction alone.

| System | Libri2Mix Dev (Noisy) | Libri2Mix Eval (Noisy) | Libri3Mix Dev (Noisy) | Libri3Mix Eval (Noisy) |
|---|---|---|---|---|
| SOT-Llama-1B [18] | 12.4 | 11.3 | 39.8 | 39.1 |
| SOT-Llama-3B [18] | 11.2 | 9.8 | 34.2 | 31.7 |
| SOP-Llama-3B [18] | 10.5 | 9.2 | 29.3 | 28.1 |
| w/o decoder: CTC | 16.8 | 14.6 | 25.7 | 23.6 |
| Proposed (ID-8, Fixed) | 10.7 | 9.7 | 25.1 | 24.5 |
| Proposed (ID-9, Variable TCH) | 10.7 | 9.7 | 25.1 | 24.5 |

## Limitations

The framework is currently evaluated strictly on synthetic 2-talker and 3-talker mixtures from LibriMix, meaning real-world acoustic conditions, spontaneous conversational overlap, and broader variable-talker counts (e.g., 4+ speakers) remain untested. Additionally, talker-count accuracy drops significantly when moving from 2-talker to 3-talker mixtures, indicating that the TCH routing module is still prone to confusion under severe multi-speaker overlap.

## Why read this

Speech and ML engineers looking to deploy multi-talker ASR should read this paper to learn how to bypass the heavy compute bottleneck of autoregressive LLM decoders without sacrificing the semantic robustness required for overlapping speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time multi-speaker transcription for meeting assistants, courtroom recording analysis, multi-participant teleconferencing systems, and smart home audio separation.

## Related

- (link related pages by id as the wiki grows)
