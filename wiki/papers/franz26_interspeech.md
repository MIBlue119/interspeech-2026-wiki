---
id: franz26_interspeech
category: health-clinical
labels: [generative-model, robustness-noise]
institutions: ["Jade University of Applied Sciences", "Carl von Ossietzky Universitat Oldenburg"]
code: https://svenfranz.github.io/Room-Acoustics-and-Objective-Voice-Quality-in-SLT/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2608
pdf: https://www.isca-archive.org/interspeech_2026/franz26_interspeech.pdf
---

# From Echo to Accuracy: Robust Voice Quality Assessment Using Blind Unsupervised Diffusion-based Dereverberation

*Sven Franz, Tanja Grewe, Bernd T. Meyer, Jörg Bitzer*

[PDF](https://www.isca-archive.org/interspeech_2026/franz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/franz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2608)

**Category:** `health-clinical` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — This paper investigates whether blind unsupervised diffusion-based dereverberation (BUDDy) can make objective voice quality assessment (via Smoothed Cepstral Peak Prominence, CPPS) room-independent for speech and language therapy. Using 35 real-room impulse responses across two voice databases, the authors demonstrate that dereverberation successfully restores CPPS levels and voice quality rankings for continuous speech, while sustained vowels show much weaker recovery due to their stationarity and out-of-domain training.

## Key contributions

- Evaluates the open-source diffusion-based blind dereverberation method BUDDy for clinical voice quality assessment without needing explicit room impulse responses or clean references.
- Establishes a rigorous four-stage signal evaluation pipeline (original, 1st dereverb, convolved with 35 real room IRs, 2nd dereverb) applied to 274 SVDB subjects and 133 ReST field subjects.
- Proposes a data-driven relevance threshold (delta) anchored to the upper quartile of the interquartile range of IR-induced CPPS variability rather than arbitrary cutoffs.
- Proves that continuous speech yields superior dereverberation benefits over sustained vowels due to richer spectral transitions and temporal modulations.

## Problem

Objective voice quality measures like Smoothed Cepstral Peak Prominence (CPPS) are increasingly used in speech and language therapy to monitor voice disorders reliably, supplementing subjective scales like GRBAS or CAPE-V. However, real-world room acoustics—such as background noise, early reflections, and reverberation—systematically reduce CPPS, introduce pathology-dependent distortions, and alter voice quality rankings. Standard parameter-level regressions require unavailable room/microphone metadata, while supervised neural dereverberation or weighted prediction error (WPE) require paired clean-reverberant data or explicit IR estimates that are impractical in routine clinical settings.

## Method

The study utilizes two German voice databases: the Saarbrucken Voice Database (SVDB, 274 subjects, controlled low-reverberation, sampled at 50 kHz) and the ReST study (133 subjects, untreated school rooms under field conditions, sampled at 22.05 kHz). All files were resampled to 16 kHz to interface with the pretrained diffusion-based blind dereverberation model BUDDy (specifically using checkpoint VCTK-16k-4st-time-190000.pt). The signal pipeline starts with original recordings processed via BUDDy to obtain pseudo-anechoic references, which are then convolved with 35 real-world room impulse responses (IRs) measured in speech therapy rooms, followed by a second BUDDy dereverberation step.

CPPS is extracted using Praat with a custom Python-reimplemented segmentation wrapper to guarantee identical voiced segment boundaries across all four processing conditions. Statistical evaluations rely entirely on non-parametric tests (two-sided and one-sided Wilcoxon signed-rank tests) due to non-normal distributions, alongside Two One-Sided Tests (TOST) for equivalence to determine if CPPS values return within an empirically derived tolerance corridor (delta = 0.5 * Q75(IQR_IR)).

## Experimental setup

Evaluated on 407 total subjects across two datasets (274 from SVDB, 133 from ReST), covering both sustained vowels (/a/) and continuous speech ("Guten Tag, wie geht es Ihnen?" and "Der Nordwind und die Sonne"). Baselines include original reverberant signals and convolved signals across 35 measured room impulse responses. Metrics include Smoothed Cepstral Peak Prominence (CPPS in dB), Hodges-Lehmann location shift estimators, interquartile ranges (IQR), and Spearman ranking correlation coefficients (rho). Implementation details include resampling all audio to 16 kHz in Python via librosa and running the pretrained BUDDy model without task-specific fine-tuning.

## Results

For continuous speech (CS) in the field-recorded ReST dataset, the first dereverberation significantly increased CPPS (median shift of 2.45 dB, p < 0.001), successfully compensating for heavy room degradation. Convolution with real room IRs systematically degraded CPPS across all conditions (e.g., median drop of 2.62 dB for ReST continuous speech, p < 0.001), disrupting voice quality rankings (dropping Spearman's rho below 0.95). The second dereverberation step significantly reduced IR-induced variance (H3a confirmed across all subsets, p < 0.001) and successfully restored ranking consistency for continuous speech in both SVDB (rho = 0.875 to 0.931) and ReST (rho = 0.872 to 0.892).

Where the method fails: Sustained vowels (SV) showed poor recovery. For SVDB sustained vowels, the second dereverberation failed to restore CPPS levels within the equivalence corridor (H3b rejected) and failed to improve ranking consistency (H3c rejected), primarily because sustained vowels lack the temporal modulations and spectral richness required by the diffusion model.

| System / Condition | SVDB Sustained Vowel CPPS (dB) | SVDB Continuous Speech CPPS (dB) | ReST Sustained Vowel CPPS (dB) | ReST Continuous Speech CPPS (dB) |
|---|---|---|---|---|
| Original | - | - | - | - |
| 1st Dereverberated (Pseudo-Anechoic) | - | - | - | - |
| Convolved (Real IRs) | - | - | - | - |
| 2nd Dereverberated | - | - | - | - |

## Limitations

The evaluation is restricted to German-language voice databases, limiting direct linguistic generalization. BUDDy is an out-of-domain model pretrained on clean/multi-speaker speech corpora rather than pathological or sustained vowel speech, which explains its failure mode on sustained vowels. The study simulates acoustic degradation via convolution rather than recording live speakers in dynamically varying acoustic chambers in real-time clinical workflows. Computational cost of diffusion-based iterative sampling was not quantified for on-device clinical deployment.

## Why read this

Speech and ML engineers building clinical voice-assessment tools will take away hard evidence that unsupervised diffusion dereverberation (BUDDy) fixes continuous speech metrics under room reverberation, while learning why sustained vowels remain brittle for generative speech priors.

## Code

- https://svenfranz.github.io/Room-Acoustics-and-Objective-Voice-Quality-in-SLT/

## Applications

Automated remote voice disorder screening, continuous speech-based vocal pathology monitoring during speech therapy sessions, and robust clinical speech telemetry.

## Institutions / 機構

Jade University of Applied Sciences, Carl von Ossietzky Universitat Oldenburg

**Funding / 經費:** Lower Saxony Ministry for Science and Culture, Volkswagen Foundation, Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
