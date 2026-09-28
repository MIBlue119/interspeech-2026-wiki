---
id: lee26b_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-140
pdf: https://www.isca-archive.org/interspeech_2026/lee26b_interspeech.pdf
---

# An Approach to Simultaneous Acquisition of Real-Time MRI Video, EEG, and Surface EMG for Articulatory, Brain, and Muscle Activity During Speech Production

[PDF](https://www.isca-archive.org/interspeech_2026/lee26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-140)

**TL;DR** — This paper demonstrates the first simultaneous acquisition of real-time MRI video, EEG, and surface EMG during speech production, overcoming electromagnetic and myogenic artifacts via a multi-stage denoising pipeline.

## Problem

While acoustic speech output is easily accessible, it is only the end product of a complex causal chain spanning neural planning, motor control, muscle activation, and articulatory kinematics. Prior studies have combined subsets of these modalities, but capturing brain activity, muscle movements, and vocal tract dynamics simultaneously has been impeded by severe technical challenges like MRI-induced electromagnetic interference, cardiac pulse artifacts, and myogenic contamination. Solving these issues is critical to obtaining a complete empirical picture of speech neurophysiology and advancing brain-computer interfaces.

## Method

The authors utilize a 0.55T MRI scanner equipped with a custom 8-channel upper airway coil running a spiral bSSFP sequence at 99 fps (TR = 5.05 ms) alongside an MR-compatible BrainVision electrophysiology system sampling at 5 kHz via fiber-optic trigger synchronization. The setup records 16 electrodes (9 EEG, 2 EOG, 3 EMG, 1 ECG). To mitigate signal contamination, the authors deploy a multi-stage denoising pipeline: template-based average artifact subtraction for gradient switching artifacts, an ECG-informed average artifact subtraction for ballistocardiogram pulse artifacts, and reference-based canonical correlation analysis (CCA) utilizing EMG and EOG channels to remove residual myogenic and ocular artifacts by projecting out components with canonical correlation rho > 0.4.

## Results

Evaluating data from a pilot experiment involving a native American English speaker across phonated, silent, and imagined speech tasks, the authors demonstrate successful temporal alignment with an average duration difference of 8.3 ms/s between MRI video and EEG triggers. Region of interest analysis on the tongue confirms that the EEG/EMG setup causes negligible interference, yielding a high rtMRI SNR of 10.148. Magnetic artifact correction effectively eliminates high-frequency harmonic spectral peaks in EEG, resulting in an average temporal ERP correlation of 0.66 between inside-scanner denoised and outside-scanner reference conditions, with frontal pole and language channels (FPz, C3, F3) reaching correlations between 0.78 and 0.82.

## Code

- https://github.com/lee-jhwn/multimodal-speech-biosignals

## Applications

Speech scientists, neuroscientists, and BCI engineers studying the neurophysiological substrates of spoken language and building advanced silent speech or brain-to-speech decoders.

## Limitations

The current evaluation is restricted to a pilot study featuring a single participant performing a limited vocabulary of disyllabic VCV nonce words.

## Related

- (link related pages by id as the wiki grows)
