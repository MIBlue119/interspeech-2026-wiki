---
id: chen26da_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2873
pdf: https://www.isca-archive.org/interspeech_2026/chen26da_interspeech.pdf
---

# Spectro-Temporal Interference Confounds Phase Encoding in Spatial Audio Foundation Models

*Yuxuan Chen, Haoyuan Yu, Peize He*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2873)

**TL;DR** — A psychoacoustic benchmark based on binaural masking level difference (BMLD) reveals that general-purpose binaural self-supervised audio models fail to encode microsecond interaural phase fine structures, relying instead on per-channel spectro-temporal interference textures or broadband envelope heuristics.

## Key contributions

- Introduces a psychoacoustic evaluation framework adapted from the binaural masking level difference (BMLD) to rigorously audit spatial audio models for true cross-channel phase computation versus shortcut heuristics.
- Performs a systematic cross-model evaluation of nine frozen architectures (binaural SSL, monaural SSL controls, and neural audio codecs) showing that general-purpose models (e.g., GRAM-T, WavJEPA) exhibit massive representational deficits relative to an equalization-cancellation (EC) analytical baseline.
- Deploys progressive physical ablations—including high-pass filtering (>2 kHz), Mel-scale energy equalization, and temporal fine structure (TFS) vocoding—to isolate that high detection rates stem from envelope interference textures rather than genuine phase locking.
- Demonstrates that dedicated binaural spatial architectures like Spatial-AST achieve genuine, sub-ceiling phase sensitivity, though still falling short of human and analytical ceilings.

## Problem

Current spatial self-supervised audio models achieve high performance on macroscopic direction-of-arrival estimation and room acoustic benchmarking, yet systematic spatial deficits persist in auditory motion and humanlike internal processing. Existing evaluations rely on geometric proxies rather than probing whether models actually extract microsecond interaural phase cues that govern spatial hearing. Prior work leaves it unknown whether deep spatial models encode genuine cross-channel phase information or simply exploit superficial statistical regularities and shortcut solutions, risking false confidence in their biological plausibility.

## Method

The paper evaluates nine frozen models: binaural SSL models (WavJEPA, GRAM-T, Spatial-AST, DSpAST), neural audio codecs (EnCodec, DAC), and monaural SSL negative controls (HuBERT-Large, WavLM-Large, Wav2Vec2-Large). WavJEPA (12 transformer blocks, 768-dim) and GRAM-T process stereo waveforms via joint-embedding predictive architecture and multi-channel masked autoencoding, respectively, while Spatial-AST explicitly incorporates interaural phase difference (IPD) features. Inputs are resampled to 16 kHz and channel-normalized to unit variance, extracting final-layer representations with global average pooling.

The benchmark measures representational spatial unmasking using a feature distance ratio converted to decibels: $10 \log_{10}(\|Z(S_\pi N_0) - Z(N_0)\|^2 / \|Z(S_0 N_0) - Z(N_0)\|^2)$, tested against an analytic Durlach equalization-cancellation (EC) model baseline ($\sigma_\tau = 105\,\mu\text{s}$, $\sigma_\varepsilon = 0.25$) and a GCC-PHAT positive control. To isolate detection mechanisms, the authors deploy bit-exact noise sharing across diotic noise ($N_0$), diotic tone ($S_0 N_0$), and antiphasic tone ($S_\pi N_0$) conditions, alongside progressive physical ablations: high-pass filtering above 2 kHz, short-time Fourier transform / Mel-domain energy equalization to eliminate level differences, and a 50 Hz envelope vocoder replacing temporal fine structure with uncorrelated Gaussian noise.

## Experimental setup

Evaluations utilize synthetic pure tone targets at center frequencies ($125$ Hz to $4
$ kHz), sound levels from $-30$ dB to $+10$ dB SNR, and ecological speech excerpts from LibriSpeech rendered via measured binaural room impulse responses from the AIR database. Significance is assessed via sign-flop permutation tests ($\ge 5,000$ iterations) with Benjamini-Hochberg FDR correction ($q < 0.05$). Hardware details are not explicitly highlighted, but experiments utilize 100 seeds per cell (40 for monaural controls).

## Results

At an SNR of $-14$ dB (500 Hz), the analytical EC baseline achieves +15.7 dB separation, whereas general-purpose binaural SSL models lag severely: WavJEPA yields +0.5 dB and GRAM-T +2.1 dB (a $31\times$ and $7.5\times$ deficit). Dedicated spatial models perform better but sub-ceiling, with Spatial-AST and DSpAST reaching +6.8 dB and +7.0 dB, respectively. Monaural controls yield exactly 0.0 dB across all conditions.

Ablations reveal that GRAM-T and EnCodec maintain 100% detection rates under high-pass filtering and Mel-band energy nulling, but collapse under TFS vocoding (dropping to 75% and 20%), proving their detection relies on fast envelope textures rather than phase fine structure. In realistic speech BRIR evaluations, general-purpose models hit 100% significance rates despite lacking phase sensitivity, unmasking a heavy reliance on broadband envelope cues.

| System / Condition | BMLD Gain at -14 dB (500 Hz) | Tone Significant Cells (%) | Speech Significant Cells (%) |
|---|---|---|---|
| EC Analytical Baseline | +15.7 dB | - | - |
| Spatial-AST (SSL) | +6.8 dB | 83.3% (20/24) | 100% (24/24) |
| DSpAST (SSL) | +7.0 dB | 62.5% (15/24) | 75.0% (18/24) |
| EnCodec (Codec) | +7.0 dB | 75.0% (18/24) | 100% (24/24) |
| GRAM-T (SSL) | +2.1 dB | 100% (24/24) | 100% (24/24) |
| WavJEPA (SSL) | +0.5 dB | 58.3% (14/24) | 70.8% (17/24) |

## Limitations

The evaluation focuses exclusively on frozen pre-trained representations without probing downstream fine-tuning adaptability or checking whether explicit phase-aware auxiliary objectives can rescue general-purpose backbones. The scope is bounded to standard binaural synthetic stimuli and measured BRIR datasets, omitting complex moving sound sources or multi-speaker reverberant environments.

## Why read this

Speech and ML researchers building spatial audio foundation models will learn that standard pretraining objectives (like masked autoencoding or joint-embedding prediction) fail to capture microsecond phase cues, necessitating explicit phase-aware architectural constraints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic auditing of spatial audio models, improving spatial self-supervised learning objectives for immersive AR/VR audio, and developing biologically plausible binaural machine listening front-ends.

## Related

- (link related pages by id as the wiki grows)
