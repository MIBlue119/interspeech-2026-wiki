---
id: ali26b_interspeech
category: asr
labels: [low-resource, multilingual, efficient-on-device, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1522
pdf: https://www.isca-archive.org/interspeech_2026/ali26b_interspeech.pdf
---

# MambAdapter: Lightweight Mamba-Based Adapters for Parameter-Efficient Transfer Learning in Speech and Audio

*Salman Hussain Ali, Umberto Cappellazzo, Mirco Ravanelli*

[PDF](https://www.isca-archive.org/interspeech_2026/ali26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ali26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1522)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `efficient-on-device`, `self-supervised`

**TL;DR** — MambAdapter integrates lightweight Mamba state-space modules into low-rank bottleneck adapters with shared projections, matching or outperforming strong PETL baselines on audio classification and multilingual ASR while using a fraction of the parameters.

## Key contributions

- Introduces MambAdapter, the first parameter-efficient transfer learning (PETL) approach incorporating Mamba into Transformer adapters for speech and audio.
- Proposes a parameter-sharing mechanism across adapter layers combined with a learnable per-layer scaling factor alpha to optimize the parameter-efficiency trade-off.
- Achieves competitive or superior results on 4 audio/speech classification datasets and 5 low-to-medium resource ASR languages compared to LoRA, Bottleneck, and Conformer adapters.
- Provides comprehensive evaluations examining scaling trends, parameter sharing, and Mamba hyperparameters (kernel size, d_state, expand).

## Problem

Fine-tuning massive speech foundation models like Whisper or AST on downstream tasks is computationally prohibitive, making parameter-efficient transfer learning essential. While traditional bottleneck adapters, LoRA, and Conformer adapters reduce parameters, they either lack the ability to effectively model long-range sequence context or demand heavier parameter counts. Mamba provides linear-time sequence modeling ideal for continuous speech signals, but its integration into PETL frameworks has remained unexplored.

## Method

MambAdapter inserts a lightweight Mamba block inside low-rank bottleneck adapter layers coupled with a frozen Transformer backbone (using Audio Spectrogram Transformer for classification and Whisper for ASR). The architecture uses shared down-projection (W_down in R^{d x r}) and up-projection (W_up in R^{r x d}) matrices across all layers to reduce parameter overhead from 2drl to 2dr, while layer-specific Mamba blocks handle temporal dynamics inside the low-rank subspace. A learnable scaling factor alpha (initialized to 0.1) scales the adapter output before it is added via parallel insertion to the underlying Transformer layer (Attention or FFN).

The inner Mamba block processes features through a sequence of a local convolutional layer, a selective state-space model (SSM) core governed by state dimension d_state, and an expansion factor (expand) that widens intermediate representations. The authors explore parallel adapter insertion strategies over sequential ones due to empirical superiority. Hyperparameter explorations reveal that intermediate state sizes (d_state between 20-40) and larger expansion factors optimize performance, while excessive kernel sizes slightly degrade ASR accuracy.

## Experimental setup

Evaluated on 4 classification datasets (ESC-50, UrbanSound8K, Speech Commands V2, Fluent Speech Commands) using Audio Spectrogram Transformer (AST) pretrained on AudioSet, and 5 low/medium-resource languages from Common Voice 13 (Abkhaz, Central Kurdish, Esperanto, Kabyle, Kinyarwanda) using Whisper. Baselines include Full Fine-Tuning (FFT), BitFit, DPT, Pref-T, LoRA, standard Bottleneck adapters, and Conformer adapters. Implemented in SpeechBrain with results averaged over 5 random seeds; latency and memory benchmarked on an NVIDIA H100 GPU.

## Results

On audio and speech classification under the Houlsby configuration, MambAdapter achieves a top average accuracy of 89.85% (surpassing Conformer's 89.69% and Bottleneck's 83.92%) while utilizing only 0.11M parameters compared to Conformer's 0.54M. On ASR (Common Voice), MambAdapter achieves an average WER of 49.9% (using 1.1M parameters), outperforming Bottleneck (50.7% WER), Conformer (55.7% WER), and LoRA (57.3% WER). Ablations demonstrate that removing the Mamba block causes a severe drop in average classification accuracy (falling from 92.12% to 80.03%), and disabling parameter sharing yields minimal gains (+0.14% avg accuracy) at the cost of quadrupling trainable parameters (0.28M vs 0.06M). MambAdapter exhibits a latency overhead in streaming unbatched scenarios due to the selective scan fixed costs, making it better suited for offline or batched long-form processing.

| Method | Par (M) | ESC | US8K | GSC | FSC | Avg |
|---|---|---|---|---|---|---|
| FFT* | 85 | 87.48 | 84.31 | 97.31 | 93.29 | 90.07 |
| LoRA | 0.26 | 86.45 | 81.89 | 93.61 | 76.00 | 84.49 |
| Bottleneck (Houlsby) | 0.49 | 87.15 | 80.58 | 91.30 | 76.67 | 83.92 |
| Conformer (Houlsby) | 0.54 | 84.98 | 82.41 | 94.91 | 6.46 | 89.69 |
| MambAdapter (Houlsby) | 0.11 | 87.55 | 81.71 | 94.27 | 95.85 | 89.85 |

## Limitations

Evaluated exclusively on audio classification and ASR tasks using AST and Whisper backbones; broader generalization to text-to-speech or voice conversion remains untested. The selective scan mechanism introduces a noticeable latency overhead in unbatched streaming settings (batch size 1, 5s audio), making it less optimal for real-time edge processing compared to traditional linear adapters.

## Why read this

Speech and ML engineers looking for an efficient state-space model based transfer learning recipe will find a concrete blueprint for combining Mamba with bottleneck adapters. Researchers will take away actionable insights regarding parameter sharing, low-rank SSM compression, and parallel adapter insertion.

## Code

- https://github.com/salman-ha/MambAdapter

## Applications

Efficient domain adaptation of large speech recognition and audio classification foundation models under strict compute or parameter constraints.

## Institutions / 機構

Universite de Montreal, Imperial College London, Concordia University, Mila – Quebec AI Institute

**Funding / 經費:** NSERC, Digital Research Alliance of Canada, Translated, Apple

## Related

- (link related pages by id as the wiki grows)
