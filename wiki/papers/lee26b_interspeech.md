---
id: lee26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-140
pdf: https://www.isca-archive.org/interspeech_2026/lee26b_interspeech.pdf
---

# An Approach to Simultaneous Acquisition of Real-Time MRI Video, EEG, and Surface EMG for Articulatory, Brain, and Muscle Activity During Speech Production

*Jihwan Lee, Parsa Razmara, Kevin Huang, Sean Foley, Aditya Kommineni, Haley Hsu, Woojae Jeong, Prakash Kumar, Xuan Shi, Yoonjeong Lee, Tiantian Feng, Takfarinas Medani, Ye Tian, Sudarsana Reddy Kadiri, Krishna Nayak, Dani Byrd, Louis Goldstein, Richard M. Leahy, Shrikanth Narayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-140)

**TL;DR** — This paper presents the first simultaneous acquisition framework for real-time MRI, EEG, and surface EMG during speech production, capturing the full speech chain from neural planning to physical articulation. A multi-stage artifact suppression pipeline successfully mitigates MRI gradient switching, cardiac, and myogenic artifacts, achieving an average temporal ERP correlation of 0.66 between inside- and outside-scanner conditions.

## Key contributions

- First simultaneous recording of real-time magnetic resonance imaging (rtMRI), electroencephalography (EEG), and surface electromyography (EMG) during speech production tasks.
- A multi-stage artifact correction pipeline combining sliding-window template subtraction for gradient and BCG artifacts with reference-based canonical correlation analysis (CCA) for myogenic/ocular artifacts.
- Demonstration of negligible impact from MRI-compatible EEG/EMG equipment on rtMRI image quality (tongue region SNR of 10.15 dB).
- Observation and documentation of involuntary micro-articulatory movements (e.g., velum motion) during imagined speech tasks via synchronized rtMRI.

## Problem

Understanding speech production requires tracking the causal cascade from neural planning down to motor execution and articulatory movement, but prior work has only acquired subsets of these modalities (e.g., EEG-EMA or EMG-EMA). Concurrently recording EEG, EMG, and rtMRI introduces severe technical hurdles including MRI-induced electromagnetic gradient switching artifacts, cardiac-driven ballistocardiogram (BCG) interference, and heavy speech-induced myogenic contamination. Overcoming these artifacts is critical for advancing brain-computer interfaces (BCIs) and physiological speech models that rely on clean biosignals.

## Method

Data is acquired inside a 0.55T MRI scanner using a custom 8-channel upper airway coil with a spiral bSSFP sequence (TR = 5.05 ms, 99 fps). Electrophysiology is captured using an MR-compatible BrainVision system with 16 electrodes (9 EEG channels: C3, C4, F3, F4, FPz, O1, O2, M1, M2; 2 EOG; 3 EMG on the chin corner, underneath the chin, and near Adam's apple; 1 ECG) sampled at 5 kHz and synchronized via fiber-optic trigger.

The denoising pipeline operates in stages. First, gradient artifacts (GA) are suppressed using average artifact subtraction based on sliding-window averaging of detected periodic voltage transients. Second, ballistocardiogram (BCG) pulse artifacts are mitigated using an ECG-informed average artifact subtraction approach driven by R-peak detection from the low-pass filtered ECG channel (15 Hz cut-off).

Finally, residual myogenic and ocular artifacts are removed via reference-based canonical correlation analysis (CCA) jointly decomposing the 9 EEG channels and 5 reference channels (3 EMG, 2 EOG). Components with a canonical correlation exceeding a threshold of rho > 0.4 are projected out and removed (typically 2 to 5 components per recording), uncovering underlying left-lateralized cortical speech processing topographies.

## Experimental setup

Pilot data from a single male American English native speaker in his thirties performing fully phonated, silent, and imagined speech tasks across 18 disyllabic VCV nonce words (e.g., apa, ata, aka) repeated 12 times per condition. Systems compared include inside-scanner uncorrected, inside-scanner denoised, and outside-scanner reference recordings. Evaluation metrics include signal-to-noise ratio (SNR) for rtMRI tongue regions, temporal correlation of event-related potentials (ERPs), frequency magnitude spectra, and scalp topographies.

## Results

The rtMRI tongue region achieves an SNR of 10.15 ± 0.58 dB with the EEG/EMG cap attached, showing no significant degradation compared to uninstrumented scans. After magnetic artifact correction, the high-frequency harmonic peaks inside the scanner are successfully suppressed, matching the frequency magnitude spectra of outside-scanner reference recordings. Pre-articulation ERP windows exhibit an average temporal correlation of 0.66 (sigma = 0.17) between inside- and outside-scanner conditions, with frontal pole and language-production channels (FPz, C3, F3) reaching correlations of 0.82, 0.81, and 0.78, respectively. Application of the CCA pipeline reduces peak trial amplitudes from roughly 60 uV down to 20 uV, mitigating broad frontal myogenic contamination and revealing expected left-lateralized cortical activity.

| Condition / Pipeline Stage | Tongue rtMRI SNR (dB) | Pre-Articulation ERP Correlation | Peak EEG Amplitude (uV) |
|---|---|---|---|
| Uncorrected Inside Scanner | 10.15 | N/A (Harmonic Contamination) | ~60+ |
| Denoised Inside Scanner | 10.15 | 0.66 (vs Outside) | ~20 |
| Outside Scanner Reference | N/A | 1.0 (Baseline) | ~20 |

## Limitations

The study is restricted to a single-subject pilot dataset, limiting generalizability across diverse speakers and accents. The setup uses passive MR-compatible EEG electrodes which exhibit higher noise floors than active alternatives, and a non-speech-optimized electrode cap layout with limited spatial resolution. Furthermore, scanner acoustic noise and visual stimuli introduce confounding sensory processing components into the recorded neural signals.

## Why read this

Speech and BCI researchers tackling multimodal biosignal integration, artifact suppression, and silent speech decoding will find this a foundational blueprint for combining high-speed rtMRI with dense electrophysiology inside an operating MRI scanner.

## Code

- https://github.com/lee-jhwn/multimodal-speech-biosignals

## Applications

Development of robust silent/imagined speech brain-computer interfaces (BCIs), neuromuscular speech decoders, and physiological investigations of speech motor control and speech disorders like stuttering or apraxia.

## Related

- (link related pages by id as the wiki grows)
