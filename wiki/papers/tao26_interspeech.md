---
id: tao26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-927
pdf: https://www.isca-archive.org/interspeech_2026/tao26_interspeech.pdf
---

# ANCHOR: Autoregressive Non-intrusive Chunk-Ordered Refinement for Joint Multi-Resolution Speech Quality Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/tao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-927)

**TL;DR** — ANCHOR reformulates non-intrusive speech quality assessment into a multi-resolution autoregressive task using dual-resolution tokens and a chunk-first decoding hierarchy, achieving a 48% PLCMOS error reduction on 2-second partial inputs.

## Problem

Standard objective and deep learning speech quality estimators assume full utterances are available, causing them to degrade on prefix-constrained streaming or generative inputs. Because these models rely on global utterance-level pooling, they struggle to capture temporally sparse or localized artifacts like packet loss or short background intrusions early on. This creates a mismatch between traditional full-context inference and real-time operational needs.

## Method

Building on the ARECHO framework, ANCHOR uses a frozen WavLM-Large acoustic frontend paired with a 4-layer audio encoder and a 12-layer autoregressive Transformer decoder (embedding dimension 256, expanded vocabulary of 65,828 tokens). It introduces dual-resolution metric query tokens to jointly predict chunk-level prefix quality and full-utterance quality. A resolution-aware decoding hierarchy enforces chunk-first sequencing so that global metrics explicitly condition on local estimates. The model is trained on a prefix-expanded dataset of 308.8 hours (583,983 prefix instances across 2, 4, 6, and 8-second cumulative windows) using cross-entropy loss with teacher forcing.

## Results

Evaluated on the Overall Dev split comprising 34,726 prefix instances across metrics like PLCMOS, UTMOS, DNS, and NISQA, ANCHOR significantly improves incremental prediction accuracy. For PLCMOS chunk-level evaluation, ANCHOR reduces MAE by 48% at 2 seconds and maintains consistent gains across all prefix lengths (33% at 4s, 16% at 6s, 12% at 8s) compared to baseline ARECHO. Prefix-to-full convergence analyses demonstrate that perceptual evidence largely stabilizes between 4 and 6 seconds of context. Controlled distortion stress tests confirm that the model maintains stable extrapolation under localized corruption.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time streaming communication systems, online speech enhancement pipelines, and autoregressive generative speech models can use ANCHOR for continuous, incremental speech quality monitoring.

## Limitations

Global metric prediction (such as UTMOS) can experience a slight performance crossover where standard full-context models outperform prefix-constrained decoders once longer acoustic context is available.

## Related

- (link related pages by id as the wiki grows)
