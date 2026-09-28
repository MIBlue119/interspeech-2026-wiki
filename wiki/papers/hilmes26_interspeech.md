---
id: hilmes26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-683
pdf: https://www.isca-archive.org/interspeech_2026/hilmes26_interspeech.pdf
---

# Positional Encoding in the Context of Memristor-Based Analog Computation for Automatic Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/hilmes26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hilmes26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-683)

**TL;DR** — This paper investigates why relative positional encodings degrade automatic speech recognition performance on simulated memristor hardware, showing that expanding the analog-to-digital converter range cuts execution degradation by roughly 50% relative.

## Problem

Running large neural speech models on analog memristor crossbars requires efficient vector-matrix multiplication, but physical hardware constraints like analog-to-digital converter (ADC) quantization ranges cause severe value clipping. While relative positional encodings (PEs) improve Conformer ASR accuracy in software, their transformed output values have wider distributions that clash with default hardware quantization, causing disproportionately high performance drops during memristor execution.

## Method

The authors evaluate a 77M-parameter CTC-Conformer ASR model featuring relative positional encodings mapped onto simulated memristor crossbar hardware via SynaptogenML. Activations use 8-bit quantization while static weights use 8-bit or 4-bit precision, split into 128x128 sub-matrices. The study analyzes the output distribution of the linear layer transforming the positional encodings and tests hardware-level modifications by varying the ADC precision and range (e.g., expanding range to 8 bits) as well as software-level workarounds such as keeping PE computations in the digital domain.

## Results

Evaluated on LibriSpeech (dev-other) and Loquacious (dev) using Word Error Rate (WER) with a 4-gram language model. On LibriSpeech dev-other with 4-bit weights, baseline memristor execution yields a 7.5% WER with PE (up from 5.4% software baseline), suffering heavier degradation than models without PE. Increasing the ADC range to 8 bits for the PE layer reduces memristor execution degradation by approximately 50% relative, bringing the WER down to 6.8%. Keeping the positional encoding layer in the digital domain (oracle) or removing encoding-related linear transformations when the ADC cannot be modified reduces degradation by roughly 30% relative.

## Code

- https://github.com/rwth-i6/returnn-experiments/tree/master/2026-memristor-pe

## Applications

Engineers and researchers designing energy-efficient neuromorphic hardware accelerators and deploying Transformer or Conformer speech recognition models on analog memristor-based edge devices.

## Limitations

The evaluation relies entirely on software simulation of memristor devices via SynaptogenML rather than physical chip fabrication at scale.

## Related

- (link related pages by id as the wiki grows)
