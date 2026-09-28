---
id: stanley26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2995
pdf: https://www.isca-archive.org/interspeech_2026/stanley26_interspeech.pdf
---

# Beta Rebound as a Neural Signature for Speech Movement: Preliminary Evidence Using Magnetoencephalography

*Keerthana Stanley, Jun Wang, Paul Ferrari*

[PDF](https://www.isca-archive.org/interspeech_2026/stanley26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stanley26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2995)

**TL;DR** — This study uses magnetoencephalography (MEG) on five healthy adults to investigate post-movement beta rebound (PMBR) during natural speech production, finding that phrases with higher articulatory complexity elicit a stronger PMBR with dominant-hemisphere lateralization. The results provide preliminary evidence that PMBR can index speech motor control and support future speech-BCI development.

## Key contributions

- Demonstrates that natural overt speech production reliably elicits a measurable post-movement beta rebound (PMBR) in the oral motor cortex.
- Establishes a preliminary link between speech articulatory complexity (ranked via Word Complexity Measure, syllable count, and duration) and PMBR magnitude.
- Localizes speech-related PMBR bilaterally to BA4 and BA6, revealing an earlier and stronger ERS response in the language-dominant left hemisphere.
- Provides a replicated MEG protocol utilizing a delayed overt reading task with concurrent jaw movement tracking to isolate motor activity from speech execution.

## Problem

While post-movement beta rebound (PMBR) has been extensively studied in limb-movement tasks and proposed as a biomarker for motor control and neurodegenerative diseases like ALS, its manifestation during natural speech production remains largely uncharacterized. Prior speech studies have focused heavily on speech perception, non-word verbal repetition tasks, or non-verbal button presses, leaving a critical gap in understanding how phonetic and phonological complexity in real words and sentences modulates cortical beta oscillations. Addressing this gap is vital for advancing non-invasive speech brain-computer interfaces (BCIs) and clinical motor speech assessments.

## Method

Neuromagnetic signals were acquired using a 306-channel Elekta Triux Neuromag MEG system at 4000 Hz, supplemented by real-time audio and chin-pressure sensors to track jaw movement onsets and offsets. Five healthy participants performed a delayed overt reading task across 100 trials per phrase, cycling through visual stimulus presentation (1s), covert preparation, and an asterisk cue triggering overt speech production (up to 2.5s). Preprocessing was conducted in MATLAB using BrainWave, applying a 110 Hz low-pass filter and epoching trials from -6 to 2 seconds centered on jaw movement offset.

Source localization of volumetric beta band modulations (13-30 Hz) was executed using the Synthetic Aperture Magnetometry (SAM) beamformer algorithm across 500 ms steps relative to a -3 to -2.5 s baseline, effectively suppressing non-neuronal artifacts such as jaw movement noise. Time-frequency response (TFR) plots were constructed via Morlet wavelet transform on source-level time series derived from individual oral motor cortices. Group-level comparisons contrasted high-complexity phrases against low-complexity phrases to isolate the impact of articulatory load on post-movement event-related synchronization (ERS).

## Experimental setup

The study evaluated 5 healthy adult English speakers (3 females, ages 45-60) producing five prioritized alternative and augmentative communication (AAC) phrases varying in articulatory complexity. MEG recordings utilized 102 magnetometers and 204 gradiometer sensors inside a magnetically shielded room, paired with structural MRI coregistration using fiducial markers. The primary evaluations relied on beamformer source localization, bilateral time-frequency response (TFR) power distributions across 0.25-1.25 s post-movement and 15-30 Hz frequencies, and pial surface mapping.

## Results

TFR analysis across all five subjects confirmed that natural speech production of real phrases reliably elicits post-movement event-related desynchronization (ERD) during speech followed by prominent beta band synchronization (PMBR) after jaw movement offset. Group-level comparisons demonstrated that high-complexity phrases (e.g., 'Do you understand me?', WCM=7) elicited stronger PMBR amplitude modulations in the left oral motor cortex compared to low-complexity phrases (e.g., 'Goodbye.', WCM=2). Source-level surface plotting revealed a robust bilateral PMBR response in BA4 and BA6, with the left (language-dominant) hemisphere exhibiting an earlier, longer-duration, and higher-amplitude rebound that preceded right-hemisphere activation.

## Limitations

The primary limitation is the small sample size of only five healthy participants, precluding rigorous statistical generalization. The baseline selection (-3 to -2.5 seconds pre-stimulus) may be confounded by long-lasting residual beta band modulations from preceding trials, suggesting future studies should extend baseline durations. Additionally, the study is restricted to five short AAC phrases spoken by healthy adults, leaving open questions about broader phonetic diversity, continuous conversational speech, and clinical populations.

## Why read this

Speech and neuro-engineering researchers working on non-invasive speech BCIs or motor speech biomarkers should read this to understand how cortical beta oscillations index articulatory complexity during natural word production. It provides a foundational MEG experimental pipeline and qualitative evidence for left-hemispheric dominance in speech motor inhibition.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of non-invasive speech brain-computer interfaces (BCIs), pre-surgical motor cortex mapping, and clinical diagnosis of neurodegenerative motor speech disorders such as ALS.

## Related

- (link related pages by id as the wiki grows)
