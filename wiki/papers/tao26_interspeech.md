---
id: tao26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-927
pdf: https://www.isca-archive.org/interspeech_2026/tao26_interspeech.pdf
---

# ANCHOR: Autoregressive Non-intrusive Chunk-Ordered Refinement for Joint Multi-Resolution Speech Quality Modeling

*Zhuoyan Tao, Jiatong Shi, Hye-jin Shim, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/tao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-927)

**TL;DR** — ANCHOR reformulates speech quality estimation as a multi-resolution autoregressive prediction task to evaluate partial audio prefixes accurately, achieving a 48% reduction in PLCMOS error on 2-second prefixes. It introduces a resolution-aware decoding hierarchy that generates chunk-level scores before full-utterance scores within a unified sequence.

## Key contributions

- Joint chunk-level and full-utterance multi-metric supervision within a unified autoregressive framework.
- A resolution-aware decoding hierarchy enforcing a chunk-first coarse-to-fine prediction schedule.
- Prefix-to-full convergence analysis revealing an effective perceptual context horizon of 4-6 seconds.
- A controlled distortion stress test isolating structured extrapolation biases under localized corruption.

## Problem

Most existing objective metrics like PESQ, ViSQOL, and learned non-intrusive predictors like UTMOS and DNSMOS assume full-context availability, evaluating signals only after complete utterances are observed. This creates a severe mismatch for streaming applications, generative speech models, and systems dealing with short packet-loss bursts or clipping events where early, prefix-constrained quality estimation is necessary. Global context pooling in standard models smooths out temporally sparse distortions and fails to reflect local perceptual degradation until much later.

## Method

ANCHOR builds upon the ARECHO architecture, using a frozen WavLM-Large acoustic frontend paired with a 4-layer audio encoder and a 12-layer Transformer decoder (8 attention heads, embedding dimension 256). It expands the decoder vocabulary from 32,926 to 65,828 tokens to support dual-resolution query tokens. Continuous metrics are discretized into 500 percentile-based bins (with signed log compression applied to heavy-tailed metrics like SI-SNR).

The model enforces a chunk-first decoding order where chunk-level target tokens are generated before full-utterance tokens, effectively using local quality estimates as intermediate conditional latents. Training uses the Overall Base configuration dataset (308.8 hours across 170,013 utterances) expanded via cumulative prefixes at 2, 4, 6, and 8 seconds, yielding 583,983 samples (467,657 training / 116,326 validation instances). It is optimized using the AdamW optimizer with a learning rate of 4e-4, linear warmup over 50k steps, 0.1 label smoothing, batch size 12, gradient accumulation of 2, and trained for 15 epochs from a pretrained ARECHO checkpoint.

## Experimental setup

Experiments use the Overall Base dataset (308.8 hours, 170,013 utterances) expanded to 583,983 prefix samples, evaluated on the Overall Dev split (34,726 prefix instances after expansion). The primary baseline is the pretrained ARECHO checkpoint applied directly to prefix inputs without adaptation. Evaluation metrics include Mean Absolute Error (MAE), Pearson Correlation Coefficient (LCC/PCC), and Spearman Rank Correlation (SRCC) for both chunk-level and full-utterance tasks.

## Results

On chunk-level prediction, ANCHOR achieves a 48% MAE reduction for PLCMOS on 2-second prefixes (maintaining consistent gains: 33% at 4s, 16% at 6s, 12% at 8s). For UTMOS, ANCHOR improves MAE at 2s (0.241 to 0.214; PCC 0.935 to 0.950), though ARECHO surpasses it at longer prefixes due to the local attention shift. For full-utterance prediction from prefixes, the largest MAE drop occurs between 2s and 4s across all metrics, with Pearson correlation stabilizing by 4-6 seconds, defining an effective context horizon.

| Metric & Prefix Length | ANCHOR MAE | ARECHO MAE | ANCHOR LCC | ARECHO LCC |
|---|---|---|---|---|
| PLCMOS (2s) | 0.865 | - | 0.629 | - |
| PLCMOS (4s) | 0.725 | - | 0.719 | - |
| UTMOS (2s) | 0.236 | - | 0.934 | - |
| UTMOS (4s) | 0.183 | - | 0.959 | - |
| DNS (4s) | 0.238 | - | 0.895 | - |

## Limitations

ANCHOR currently relies on a non-formal streaming frontend (specifically non-causal WavLM-Large) and therefore does not constitute a fully causal streaming system. Formal component-wise ablations comparing interleaved versus chunk-first decoding orders were omitted. The evaluation is bound to datasets spanning 308.8 hours and prefix lengths between 2 and 8 seconds.

## Why read this

Speech and ML engineers building streaming communication or autoregressive generative speech models should read this to learn how hierarchical, chunk-first decoding can resolve prefix-constrained quality estimation trade-offs.

## Code

- https://huggingface.co/espnet/arecho_scale_v0.1-large-decoder

## Applications

Real-time streaming communication quality monitoring, generative speech model evaluation, and low-latency audio packet-loss tracking.

## Related

- (link related pages by id as the wiki grows)
