---
id: hilmes26_interspeech
category: asr
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-683
pdf: https://www.isca-archive.org/interspeech_2026/hilmes26_interspeech.pdf
---

# Positional Encoding in the Context of Memristor-Based Analog Computation for Automatic Speech Recognition

*Benedikt Hilmes, Nick Rossenbach, Ralf Schlüter*

[PDF](https://www.isca-archive.org/interspeech_2026/hilmes26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hilmes26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-683)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — This paper investigates why relative positional encodings (PEs) degrade automatic speech recognition performance when executed on simulated memristor-based analog hardware, and proposes ADC bit-allocation and architectural modifications that recover ~50% of the relative execution degradation.

## Key contributions

- Identifies that output value range mismatches in transformed relative positional encodings cause severe clipping and severe performance drops under standard memristor analog-to-digital converter (ADC) configurations.
- Demonstrates that dedicating more ADC range bits (while keeping total bit budget constant at 8 bits, e.g., 1-bit precision / 7-bit range) for positional encoding layers restores performance gains, cutting relative degradation by ~50%.
- Evaluates architectural alternatives for rigid hardware constraints, showing that retraining models without the linear transformation on positional encodings cuts degradation by ~30% relative.
- Validates findings across two distinct ASR datasets (LibriSpeech and Loquacious) using a physical memristor simulation framework (SynaptogenML) mapped to 12-layer Conformer models.

## Problem

While memristor crossbar arrays enable energy-efficient analog vector-matrix multiplication (VMM), they suffer from physical programming noise and restricted precision/range in analog-to-digital converters (ADCs). Prior work simulating Conformer ASR models on memristor hardware omitted relative positional encodings (PEs), which are crucial for speech processing. The authors discover that standard PE linear transformation layers generate large output values that frequently clip in fixed-range ADCs, causing severe degradation that cancels out the accuracy benefits of relative PEs.

## Method

The study evaluates a 12-layer Conformer ASR model (model dimension 512, feed-forward dimension 2048, ~77M parameters) with CTC loss on log-mel filterbank features (10ms shift, 4x downsampling via convolutional frontend). Matrix operations are mapped onto simulated crossbar arrays subdivided into 128x128 sub-matrices using SynaptogenML. Activations are quantized to 8-bit using symmetric observers, while static weights are quantized to 8-bit or 4-bit precision. 

To address PE degradation where up to 40% (or nearly 100% in extreme crossbars) of outputs suffer from ADC clipping, the authors explore two families of solutions: (1) Hardware-level configuration adjustments by shifting bits from ADC precision to ADC range specifically for PE layers (e.g., splitting a fixed 8-bit budget into 1 precision bit and 7 range bits), which avoids expensive hardware redesign while expanding fixed-point capture limits; and (2) Model-level architectural changes, including replacing sinusoidal PEs with learnable PEs or removing the linear transformation layer preceding self-attention entirely prior to retraining.

Training uses RAdam optimizer with a linearly increasing/decreasing learning rate schedule peaking at 5e-4, decoupled weight decay of 1e-2, SpecAugment for regularization, and 100 epochs. Recognition is performed using a 4-gram KenLM language model on top of ARPA-phonemes for LibriSpeech and byte-pair-encoding (128 merges) for Loquacious.

## Experimental setup

Evaluated on LibriSpeech (using the dev-other subset) and Loquacious (250-hour training subset, evaluated on dev). Models are compared against baseline full-precision/digital recognition and standard unadapted memristor execution (default 4-bit precision, 4-bit range ADC). Metrics reported are Word Error Rate (WER %) averaged across 5 distinct hardware programming runs with standard deviations.

## Results

Under default 4-bit precision / 4-bit range ADC settings with 8-bit weights on LibriSpeech dev-other, adding PEs causes the memristor execution WER to degrade from a 5.4% baseline to 7.6% (a larger drop than models without PEs). By expanding the PE layer's ADC range to 8 bits while keeping non-PE layers at 4/4, the memristor WER recovers to 6.6% for 8-bit weights and 6.8% for 4-bit weights. Shifting the 8-bit ADC bit budget to 1-bit precision and 7-bit range specifically for the PE layer achieves identical 6.8% WER on 4-bit weights without increasing energy consumption. Removing the PE linear transformation entirely prior to training yields a robust 6.9% WER under default hardware conditions.

| System / Configuration | PE Setting | ADC (Prec/Range) | LibriSpeech dev-other (8-bit W) | LibriSpeech dev-other (4-bit W) |
|---|---|---|---|---|
| Baseline (No Memristor) | Yes | - | 5.4% | 5.6% |
| Default Memristor | Yes | 4 / 4 | 7.6% ± 0.08 | 7.5% ± 0.10 |
| Adapted ADC (Full Model) | Yes | 8 / 8 | 7.0% ± 0.09 | 6.9% ± 0.08 |
| Adapted ADC (PE Only) | Yes | 1 / 7 (PE) / 4 / 4 (Rest) | 6.5% ± 0.06 | 6.8% ± 0.08 |
| No Linear Transformation | Yes (No Lin) | 4 / 4 | 6.9% ± 0.06 | 6.8% ± 0.07 |
| Oracle (Digital PE) | Yes | 4 / 4 | 6.6% ± 0.09 | 6.8% ± 0.06 |

## Limitations

The work relies entirely on hardware simulation (SynaptogenML) rather than physical chip fabrication at scale. Evaluations are restricted to moderate-sized models (~77M parameters) and single benchmark subsets (LibriSpeech dev-other and Loquacious dev), leaving open how these scaling fixes perform on massive multi-billion parameter speech LLMs or highly tonal/multilingual data.

## Why read this

Hardware and speech engineers working on neuromorphic or memristor-based acceleration for Transformers should read this to understand why standard positional encoding layers fail in low-precision analog environments and how targeted bit allocation avoids hardware redesign.

## Code

- https://github.com/rwth-i6/returnn-experiments/tree/master/2026-memristor-pe

## Applications

On-device energy-efficient automatic speech recognition using emerging memristor hardware accelerators.

## Institutions / 機構

RWTH Aachen University, AppTek

**Funding / 經費:** NeuroSys, Federal Ministry of Research, Technology and Space BMFTR, RESCALE, Federal Ministry for the Environment, Nature Conservation, Nuclear Safety and Consumer Protection, Federal Ministry of Education and Research

## Related

- (link related pages by id as the wiki grows)
