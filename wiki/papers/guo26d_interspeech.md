---
id: guo26d_interspeech
category: health-clinical
labels: [efficient-on-device, streaming-real-time]
institutions: ["Duke Kunshan University", "Duke University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2689
pdf: https://www.isca-archive.org/interspeech_2026/guo26d_interspeech.pdf
---

# Lightweight Convolutional Front-ends for Real-time Framewise Phoneme Recognition in Cochlear Implants

*Yuchu Guo, Leslie M. Collins, Boyla O. Mainsah*

[PDF](https://www.isca-archive.org/interspeech_2026/guo26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2689)

**Category:** `health-clinical` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — This paper investigates lightweight, causal convolutional front-ends paired with sequence backends for real-time framewise phoneme classification in cochlear implants, achieving up to 36.98% accuracy while maintaining sub-10ms latency on an STM32 microcontroller.

## Key contributions

- Systematically evaluates 1D (time/frequency) and 2D time-frequency causal convolutional front-ends combined with sequence model backends (LSTM, GRU, Mamba) for real-time cochlear implant phoneme classification.
- Demonstrates that adding shallow causal convolutional front-ends consistently improves framewise phoneme classification accuracy over baseline sequence models alone.
- Provides concrete on-device deployment benchmarks on an STM32F746G microcontroller, showing that 1D structures easily meet sub-10ms latency and strict memory constraints.
- Examines the impact of convolutional layer depth and dilation on receptive fields, memory footprint, flash memory usage (MS), working memory (WM), and multiply-accumulate operations (MACs).

## Problem

Cochlear implant (CI) users struggle to perceive speech in noisy or reverberant environments due to the limitations of traditional preprocessing like directional mics and signal-to-noise ratio-based noise reduction. While phoneme-based time-frequency masking can significantly improve speech enhancement, it requires real-time, causal framewise phoneme classification with strict latency constraints (<=10 ms) and no access to future context. Modern high-capacity neural architectures and offline cloud-based models are completely incompatible with these embedded hardware limits, and existing commercial CIs lack on-device deep neural network speech enhancement entirely.

## Method

The study evaluates frame-level phoneme classification as a core unit for CI speech enhancement, investigating three structural variants of causal convolutional front-ends: 1D along the frequency dimension (Conv1D-F), 1D along the time dimension (Conv1D-T), and 2D time-frequency convolutions (Conv2D), with layer depth (L) varied across [1, 2, 4, 6, 8]. These front-ends are paired with unidirectional sequence model backends: LSTM (hidden dimension 123 for base, 32 for small, 200 for large), GRU (hidden dimension 117 for base), and a strictly unidirectional TF-Mamba block (hidden dimension 32), alongside attention-augmented variants.

Models are trained using cross-entropy loss and stochastic gradient descent with a learning rate of 1e-5 and 0.9 momentum on 2-second audio sequence segments. Training stops when validation accuracy improvements fall below 0.001% over 10 consecutive epochs using an NVIDIA RTX A5000 GPU. Deployment simulation uses the STM32Cube.AI Developer Cloud platform exported to ONNX format, targeting the STM32F746G MCU (216 MHz, 1 MB flash, 340 KB RAM) to measure flash memory usage, working memory (RAM), MACs per inference, and latency.

## Experimental setup

Models are evaluated using frame-level phoneme classification accuracy, parameter counts, MACs, flash model size (MS in MB), working memory (WM in kB), and inference latency (ms) measured on an STM32F746G-DISCO microcontroller at 216 MHz. Baselines include small, base, and large LSTM and GRU models without convolutional front-ends. Certain advanced architectures (deformable convolutions, attention-based models, and Mamba-based models) could not be evaluated on-device due to current STM32Cube.AI platform limitations.

## Results

Adding a convolutional front-end consistently outperforms baseline sequence models without front-ends. For instance, the base LSTM baseline achieves 31.51% accuracy with 0.403 MB flash and 2.92 ms latency, whereas adding a Conv1D-F front-end with 2 layers (2L) boosts accuracy to 34.28% (0.411 MB MS, 3.34 ms latency), and a 4-layer front-end reaches 36.85% accuracy. For GRU models, the base model achieves 31.51% accuracy (0.287 MB MS, 2.18 ms latency), while a 2L Conv1D-F front-end increases accuracy to 36.98% (0.295 MB MS, 2.45 ms latency). Optimal performance for frequency convolutions generally peaks at L = 2 or L = 4, indicating that full frequency coverage is unnecessary for phonetic feature extraction. All evaluated 1D and 2D configurations successfully satisfy the strict sub-10ms latency requirement, running between 1.19 ms and 3.89 ms for LSTM variants (excluding extreme 8L Conv2D outliers).

However, deeper Conv2D architectures scale poorly in working memory and flash footprint; for example, an 8-layer Conv2D LSTM model consumes 78.90 MB flash and 14.72 kB RAM with a 38.94 ms latency, failing embedded memory limits. Furthermore, deformable convolutions, Mamba, and attention-based models failed to deploy on the target microcontroller.

| System / Condition | Accuracy (%) | Params | MACs | Model Size (MB) | RAM (kB) | Latency (ms) |
|---|---|---|---|---|---|---|
| Base LSTM (No Frontend) | 31.51 | 98,440 | 97,416 | 0.403 | 7.12 | 2.92 |
| LSTM + Conv1D-F (2L) | 34.28 | 98,584 | 97,941 | 0.411 | 3.34 | 9.48 |
| LSTM + Conv1D-F (4L) | 36.85 | 98,596 | 98,391 | 0.415 | 11.23 | 3.58 |
| Base GRU (No Frontend) | 31.51 | 69,304 | 68,562 | 0.287 | 7.40 | 2.18 |
| GRU + Conv1D-F (2L) | 36.98 | 69,448 | 69,087 | 0.295 | 2.45 | 9.75 |
| GRU + Conv1D-F (4L) | 36.18 | 69,460 | 69,537 | 0.299 | 11.50 | 2.67 |

## Limitations

The evaluation is currently limited to simulated microcontroller deployment benchmarks rather than live patient-in-the-loop cochlear implant trials. Advanced modern architectures such as Mamba, attention blocks, and deformable convolutions could not be deployed on-board due to current toolchain limitations in STM32Cube.AI. The study tests a single specific microcontroller class (STM32F7), leaving generalization to other hardware accelerators unverified.

## Why read this

Speech and ML engineers designing ultra-low-power, real-time audio systems for edge hardware will find concrete architectural trade-offs between 1D/2D convolutions and sequence backends under strict sub-10ms constraints. Researchers working on cochlear implants will gain practical deployment baselines showing how lightweight front-ends can boost phoneme classification accuracy without blowing out MCU flash or RAM.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cochlear implant sound processors, real-time low-power hearing aids, and edge-device causal speech enhancement systems.

## Institutions / 機構

Duke Kunshan University, Duke University

**Funding / 經費:** Duke Summer Research Program for Duke Kunshan University Undergraduates

## Related

- (link related pages by id as the wiki grows)
