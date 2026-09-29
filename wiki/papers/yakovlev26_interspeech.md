---
id: yakovlev26_interspeech
category: speaker
labels: [efficient-on-device]
institutions: ["Palabra AI"]
code: https://github.com/PalabraAI/redimnet2
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1447
pdf: https://www.isca-archive.org/interspeech_2026/yakovlev26_interspeech.pdf
---

# ReDimNet2: Scaling Speaker Verification via Time-Pooled Dimension Reshaping

*Ivan Yakovlev, Anton Okhotnikov*

[PDF](https://www.isca-archive.org/interspeech_2026/yakovlev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yakovlev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1447)

**Category:** `speaker` · **Labels:** `efficient-on-device`

**TL;DR** — ReDimNet2 introduces time-dimension pooling into the ReDimNet dimension-reshaping framework, improving the compute-versus-accuracy Pareto front across a 1.1M to 12.3M parameter model family. The top-tier B6 configuration achieves 0.287% EER on Vox1-O using only 12.3M parameters and 13 GMACs.

## Key contributions

- Introduces time-pooling into the 1D processing pathway of the ReDimNet framework to softly relax the strict constant-volume constraint (C * F * T).
- Uses nearest-neighbor upsampling at the final stage-wise aggregation point to preserve full residual connectivity despite variable temporal lengths across layers.
- Presents a family of seven configurations (B0-B6) ranging from 1.1M to 12.3M parameters and 0.33 to 13 GMACs.
- Achieves a 28% relative EER reduction on Vox1-O (0.29%) compared to original ReDimNet-B6 while requiring 36% fewer GMACs and 18% fewer parameters.

## Problem

While deep neural networks dominate speaker verification, prior architectures like 1D CNNs, 2D CNNs, and large self-supervised models (e.g., WavLM, W2V-BERT 2.0) either suffer from high computational complexity or architectural trade-offs. The original ReDimNet preserved full temporal resolution (T) throughout the network, causing quadratic computational growth in the 1D pathway as channel dimensions scaled up. This temporal rigidity fundamentally restricted the ability to aggressively scale channel width without exploding computational costs, leaving a gap for an efficient architecture that can scale channel capacity while maintaining low inference latency.

## Method

ReDimNet2 builds upon the ReDimNet architecture, which combines interleaved 2D ResNet blocks (handling frequency and channel dimensions) and 1D ConvNeXt-like blocks with multi-head attention (handling time and channel contexts), aggregated via Attentive Statistics Pooling. The core innovation is inserting time-pooling via strided 2D convolutional layers at intermediate stages (specifically stages 3 and 5), which halves both the frequency bins (F) and the time steps (T) without modifying the channel count (C), thereby softly relaxing the strict constant-volume constraint (C * F * T).

Because different stages produce 1D feature maps with varying temporal lengths—(B, C*F, T), (B, C*F, T/2), etc.—maintaining residual connections requires applying nearest-neighbor upsampling to align all feature maps back to the input temporal resolution (T) immediately prior to stage-wise weighted aggregation. Importantly, this upsampling occurs only at the aggregation point; each stage processes features at a reduced temporal resolution. This dual efficiency benefit slashes compute in both 1D subblocks (from shorter sequences) and 2D subblocks (since spatial extent depends on sequence length), freeing up a compute budget that is reallocated to wider channel configurations (higher C).

Models are trained using a two-stage recipe via the WeSpeaker pipeline. The pretraining stage runs on VoxCeleb2-dev using SGD with Nesterov momentum (m=0.9), weight decay of 2e-5, and an exponential decay schedule with 6-epoch warmup (lr_max=0.1, lr_min=6e-5) for 40 epochs on 8x H100 GPUs. Inputs are 80-dimensional mean-normalized log-mel filter banks (25 ms frame, 10 ms shift) with random 2-second crops, MUSAN/RIR augmentations, and 2-fold speed perturbation (0.9, 1.1 factors). The loss function is SphereFace2-C (SF2-C) with margin scheduled from 0.0 to 0.2 over epochs 20-40. Large-margin finetuning expands utterance length to 6 seconds, turns off speed perturbation, fixes the SF2-C margin at 0.3, reduces learning rate to 1e-4 with exponential decay, and runs for an additional 5 epochs.

## Experimental setup

Models were trained on the VoxCeleb2 development set and evaluated on the cleaned protocols of VoxCeleb1 (Vox1-O, Vox1-E, Vox1-H) using Equal Error Rate (EER) with cosine similarity scoring on full-length test utterances without score normalization. Out-of-domain generalization was assessed on SITW core-core, VOiCES, and Vox1-B hard protocols. GMACs were measured using thop with 2-second raw waveform inputs at 16 kHz. Baseline models include original ReDimNet (B0-B6), NeXt-TDNN, ECAPA-TDNN, CAM++, ResNet293, ECAPA2, WavLM, and W2V-BERT 2.0.

## Results

ReDimNet2 improves the Pareto front across all configurations compared to the original ReDimNet. At the largest scale, ReDimNet2-B6 achieves an EER of 0.287% on Vox1-O, 0.52% on Vox1-E, and 0.99% on Vox1-H, outperforming the original ReDimNet-B6 (0.40%, 0.55%, 1.05%) while using 36% fewer GMACs (13.05 vs 20.27) and 18% fewer parameters (12.3M vs 15.0M). ReDimNet2-B6 also matches or beats much larger self-supervised models, coming close to W2V-BERT 2.0 (587M params) while being 48x smaller. On out-of-domain tests, ReDimNet2-B6 achieves an average EER of 1.84% across SITW, VOiCES, and Vox1-B, improving over ReDimNet-B6's 1.87%. 

Where it does not win: larger configurations (B4-B6) exhibited increased training instability and run-to-run variance (e.g., B6 achieving 0.32 +/- 0.05% EER on Vox1-O), indicating that high-capacity scaling requires careful regularization.

| Model | Params | GMACs | Vox1-O (%) | Vox1-E (%) | Vox1-H (%) |
|---|---|---|---|---|---|
| ReDimNet-B3 | 3.0M | 3.00 | 0.50 | 0.73 | 1.33 |
| **ReDimNet2-B3** | 4.1M | 2.70 | **0.42** | **0.66** | **1.22** |
| ReDimNet-B6 | 15.0M | 20.27 | 0.40 | 0.55 | 1.05 |
| **ReDimNet2-B6** | 12.3M | 13.05 | **0.29** | **0.52** | **0.99** |
| WavLM | 324M | 26.53 | 0.52 | 0.63 | 1.34 |
| W2V-BERT 2.0 | 587M | 57.90 | 0.38 | **0.51** | 1.06 |

## Limitations

The study evaluates models primarily on standard benchmarks derived from English/multilingual celebrity speech datasets (VoxCeleb), leaving performance under extreme channel noise, whispered speech, or severely low-resource languages partially unexplored. Larger model variants (B4-B6) show heightened optimization variance across random seeds, indicating that scaling up the capacity without additional regularization can lead to training instability.

## Why read this

Speech researchers and ML engineers looking for an extremely efficient, high-performance alternative to massive self-supervised transformers for speaker recognition should read this paper to learn how to combine 1D and 2D pathways via time-pooled dimension reshaping.

## Code

- https://github.com/PalabraAI/redimnet2

## Applications

Zero-shot text-to-speech speaker conditioning, speech enhancement evaluation, personal voice activity detection, and biometric speaker verification.

## Institutions / 機構

Palabra AI

## Related

- (link related pages by id as the wiki grows)
