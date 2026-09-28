---
id: wang26p_interspeech
category: target-speaker-extraction
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-864
pdf: https://www.isca-archive.org/interspeech_2026/wang26p_interspeech.pdf
---

# SAGE: Switch-Aware EEG-Guided Soft Gating for Target Speaker Extraction with In-Trial Switching

[PDF](https://www.isca-archive.org/interspeech_2026/wang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-864)

**TL;DR** — SAGE is a switch-aware EEG-guided soft-gating target speaker extraction framework that achieves 8.67 dB SI-SDR and 88.24% STOI under in-trial auditory attention switching.

## Problem

Conventional EEG-guided target speaker extraction methods assume static listener attention and fail during spontaneous in-trial attention switching. This limitation causes severe performance degradation, signal discontinuities, and transition artifacts due to inherent EEG noise and intrinsic neural latency discrepancies. Addressing these issues is vital for building reliable neuro-steered hearing devices and brain-computer interfaces operating in realistic multi-talker environments.

## Method

The framework utilizes a front-end separation module based on Conv-TasNet to encode speech mixtures and generate two candidate speech streams. An EEG attention regulation module uses a switch-aware soft-gating mechanism with adaptive temperature scaling and local temporal diffusion to produce smooth fusion weights. To handle temporal mismatch and neural variability, the system incorporates a differentiable time-alignment module performing local soft shifts and an uncertainty-driven conservative strategy that down-weights aggressive switching during unreliable EEG periods via dropout variance estimation. Training employs a tri-stage recipe combining a negative SI-SDR loss, a switch-aware time-varying smoothing loss, and uncertainty-weighted regularization.

## Results

Evaluated on a custom spontaneous attention-switching dataset comprising 18 Mandarin-speaking participants with 64-channel EEG recordings, SAGE outperforms baselines including BASEN, NeuroHeed, NeuroSpex+, and M3ANet. SAGE achieves 8.67 dB SI-SDR (compared to 7.13 dB for M3ANet), an 88.24% STOI score (compared to 84.30% for M3ANet), and reduces the average switching latency to 2.04 seconds (compared to 2.37 seconds for M3ANet).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers developing brain-computer interfaces, neuro-steered hearing aids, or smart audio capture systems can use this framework to extract attended speech based on non-invasive EEG signals during dynamic, multi-talker conversations.

## Limitations

The text does not state explicit limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
