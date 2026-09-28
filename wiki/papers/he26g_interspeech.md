---
id: he26g_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3556
pdf: https://www.isca-archive.org/interspeech_2026/he26g_interspeech.pdf
---

# MOV-AAD: A Large-Scale Multimodal Dataset for Auditory Attention Decoding During Moving Conversations

[PDF](https://www.isca-archive.org/interspeech_2026/he26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3556)

**TL;DR** — The paper introduces MOV-AAD, a large-scale multimodal dataset featuring 64-channel EEG and synchronized autonomic signals from 50 participants under dynamic, moving conversational speech scenarios.

## Problem

Current auditory attention decoding (AAD) datasets predominantly rely on static speaker setups, simplified acoustic mixtures, and lack synchronized peripheral physiological measurements. This limits the ecological validity of research into how neural and autonomic systems jointly support selective attention and listening effort in realistic, dynamic environments.

## Method

The dataset captures recordings from 50 normal-hearing participants aged 18 to 38 using 64-channel EEG sampled at 1200 Hz alongside a suite of peripheral sensors: binocular eye-tracking (pupil dilation and gaze), respiration airflow and effort, galvanic skin response (GSR), peripheral oxygen saturation (SpO2 ), photoplethysmography (PPG), body temperature, and tri-axial accelerometry. The protocol includes a repeated-sentence sanity check, a 9-position spatial localization task, single moving conversation streams (40 trials), and multi-conversation competing streams (56 trials) with HRTF-based spatialization spanning minus-90 to plus-90 degrees azimuth. Conversations incorporate natural turn-taking, RMS-matched talkers, and diotic background noise at negative signal-to-noise ratios.

## Results

The MOV-AAD repository contains 4,800 attentive-listening trials across 50 subjects, consisting of approximately 12 minutes of repeated sentences, 30 minutes of single conversation, and 45 minutes of multi-conversation recordings per participant. Behavioral metrics are provided, including localization accuracy and mean absolute error for spatial perception, alongside hit rate, precision, and F1 scores for a 1-back repeated-word detection task used to monitor attentional engagement.

## Code

- https://github.com/naplab/MOV-AAD

## Applications

Engineers and neuroscientists developing neuro-steered hearing aids, brain-computer interfaces, and robust speech enhancement algorithms for dynamic multi-talker scenarios.

## Related

- (link related pages by id as the wiki grows)
