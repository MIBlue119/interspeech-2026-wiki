---
id: xia26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1544
pdf: https://www.isca-archive.org/interspeech_2026/xia26_interspeech.pdf
---

# Eye and Mouth Cues in Audiovisual Perception of Mandarin Irony: Evidence from Eye-Tracking

*Shifeng Xia, Shanpeng Li*

[PDF](https://www.isca-archive.org/interspeech_2026/xia26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xia26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1544)

**TL;DR** — An eye-tracking perception study investigating how native Mandarin speakers use facial cues (eyes vs. mouth) to decode ironic blame versus ironic praise across different sensory modalities, revealing asymmetric processing strategies and cue weighting.

## Key contributions

- Demonstrates that comprehension strategies differ by irony subtype: ironic blame prompts longer fixations on the eyes, while ironic praise prompts greater visual attention to the mouth.
- Compares perception across three distinct modalities: Visual-only (VO), Audiovisual in quiet (AV-Quiet), and Audiovisual in noise (AV-Noise with 8-talker babble at -10 dB SNR).
- Reveals that for correctly interpreted ironic praise in quiet audiovisual conditions, eye fixations elicit larger pupil sizes, indicating heightened cognitive effort to resolve incongruity.
- Shows that background noise forces a shift toward the mouth region to aid phonological decoding, disrupting normal attention patterns during irony interpretation.

## Problem

While prosodic cues and literal-context integration have been widely studied in irony comprehension, the specific role of visual facial cues remains underexplored, particularly across the asymmetric categories of ironic blame (sarcasm) and ironic praise. Previous multimodal irony studies were mostly conducted in quiet laboratory environments, lacking ecological validity and ignoring how sensory degradation (such as environmental noise) forces trade-offs between intelligibility and intention recognition. Furthermore, aggregate behavioral responses fail to capture real-time cognitive processes, necessitating fine-grained eye-tracking measures like fixation duration and pupil dilation.

## Method

The study utilized an eye-tracking experiment featuring 120 target sentences (60 positive literal, 60 negative literal) embedded in Discourse Completion Task (DCT) scenarios to generate sincere and ironic variations of both praise and blame. Audiovisual recordings were captured from a single 23-year-old female native Mandarin speaker using a SONY HXR-100 camera and synced condenser microphone in a sound-attenuated booth, edited to 1920x1080 resolution at 30 fps, and normalized to 70 dB RMS audio. Audio tracks for the AV-Noise condition were overlaid with 8-talker babble noise at -10 dB SNR. 

Forty-four native Mandarin-speaking participants (21 males, 23 females, ages 19-24) completed perception trials across VO, AV-Quiet, and AV-Noise conditions while monitored using an EyeLink 1000 Plus eye tracker at 60 Hz. Dynamic areas of interest (AOIs) were manually annotated for the eyes, mouth, and full face. Statistical modeling employed linear mixed-effects models using the Gamlj module in Jamovi, treating participant and sentence as random effects to evaluate proportional fixation duration and average pupil size across AOI, Modality, and Attitude.

## Experimental setup

Evaluated 44 participants across 3 modalities (Visual-only, AV-Quiet, AV-Noise) spanning 60 trials per modality (15 per attitude type). Metrics included binary intent accuracy, proportional fixation duration on eyes and mouth AOIs (arcsine-transformed), and mean pupil size during valid fixations. Notable implementation details include an EyeLink 1000 Plus tracker recording monocularly at 60 Hz, 9-point calibration with error under 0.5 degrees, and linear mixed-effects analyses.

## Results

Accuracy rates varied dramatically by condition: for ironic praise, accuracy was 92.42% in VO, 16.62% in AV-Quiet, and 67.58% in AV-Noise, whereas ironic blame achieved higher and more stable accuracy (VO: 94.70%, AV-Quiet: 82.67%, AV-Noise: 88.18%). For ironic blame, participants exhibited significantly longer fixations on the eyes than the mouth across all modalities (VO: beta = 0.264, t = 12.199, p < 0.001; AV-Quiet: beta = 0.310, t = 13.499, p < 0.001; AV-Noise: beta = 0.168, t = 7.576, p < 0.001) with no significant pupil size differences between AOIs. Conversely, for correctly interpreted ironic praise in quiet conditions, attention was split equally, but eye fixations showed significantly larger pupil size (beta = 45.750, t = 4.271, p = 0.001), reflecting cognitive load from conflicting literal meanings.

| Condition / System | Ironic Praise Accuracy | Ironic Blame Accuracy | Primary Gaze Focus | Pupil Size Effect |
|---|---|---|---|---|
| Visual-Only (VO) | 92.42% | 94.70% | Mouth | None |
| AV-Quiet | 16.62% | 82.67% | Balanced | Larger on eyes (praise) |
| AV-Noise (-10 dB) | 67.58% | 88.18% | Mouth | None |

## Limitations

The study relied on a single female speaker to control for inter-speaker variability, which limits immediate generalizability across different voices, genders, and expressive styles. The participant pool was restricted to young Mandarin-speaking university students (ages 19-24), limiting cross-generational insights. Furthermore, the extreme difficulty and low accuracy of decoding ironic praise in quiet audiovisual conditions (16.62%) suggest potential experimental design or cue-conflict artifacts.

## Why read this

Researchers and engineers building multimodal speech emotion recognition and pragmatic intent models should read this to understand that irony comprehension is not uniform; different subtypes (praise vs. blame) trigger distinct visual processing pathways and modality trade-offs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal conversational agents, social robotics, automated affective computing systems, and intelligent tutoring systems requiring pragmatic intent and sarcasm detection.

## Related

- (link related pages by id as the wiki grows)
