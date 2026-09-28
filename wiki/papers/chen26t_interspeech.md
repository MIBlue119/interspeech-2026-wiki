---
id: chen26t_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1882
---

# A Preclinical Study of Electrolaryngeal Voice Conversion for a Novel Nasal Electrolarynx: Feature Choice and Data Augmentation

**TL;DR** — The first systematic study of voice conversion for a new nasal electrolarynx device finds that input feature choice (Mel-spectrogram vs. WavLM) should differ depending on the electrolarynx type.

## Problem

Electrolaryngeal (EL) speech from artificial larynx devices tends to sound unintelligible and unnatural due to fixed pitch and imperfect excitation, and a newly invented nasal electrolarynx (NEL) had not been systematically studied for voice conversion, unlike the more common cervical electrolarynx (CEL).

## Method

The authors compare Mel-spectrogram versus WavLM input features in a seq2seq electrolaryngeal voice-conversion (ELVC) system tailored to NEL's distinctive acoustics, and propose an LLE-VC-based augmentation strategy to synthesize paired NEL-normal speech data to address NEL data scarcity.

## Results

Feature choice proves device-dependent: WavLM features benefit CEL-oriented conversion and augmentation, while Mel-spectrogram inputs better preserve NEL-specific spectral traits, yielding better intelligibility metrics and listener preference for NEL-to-normal conversion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive speech technology for laryngectomy patients using electrolarynx devices, aimed at improving intelligibility and naturalness of their restored voice.

## Related

- (link related pages by id as the wiki grows)
