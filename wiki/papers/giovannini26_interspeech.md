---
id: giovannini26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1363
pdf: https://www.isca-archive.org/interspeech_2026/giovannini26_interspeech.pdf
---

# Exploring the Effect of the Visual Channel in Vocal Expression of Affect in an Irish (Gaelic) Synthetic Voice

[PDF](https://www.isca-archive.org/interspeech_2026/giovannini26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/giovannini26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1363)

**TL;DR** — Adding synchronized 3D facial expressions to affective Irish synthetic speech does not significantly enhance perceived emotional intensity, but significantly improves differentiation among high- and low-activation affective states.

## Problem

Prior research on synthetic affective speech has shown that specific voice qualities often signal multiple emotional states with significant overlap among high- or low-activation categories. While multimodal emotion perception is widely studied, it remains unclear how visual contexts interact with synthetic voice source variations, particularly for under-resourced languages like Irish (Gaelic). This study investigates whether adding visual cues can resolve acoustic ambiguities and enhance affect discrimination.

## Method

The authors created affective vocal stimuli in Irish by modifying a neutral male TTS utterance using the Voice Source Generator (VSG) and PRAAT to control f0, excitation strength (Ee), global waveshape parameter (Rd), tempo, and formant frequencies for angry, happy, sad, bored, and relaxed states. Visual stimuli consisted of animated facial expressions driven by a pre-rigged 3D male avatar (Genesis 9.0 in Daz 3D) mapped via the Facial Action Coding System (FACS) and lip-synched to the audio. A perception test with 31 participants evaluated three stimulus conditions (voice-only, congruent visuals, and incongruent visuals) across 17 total stimuli using 7-point scales spanning three binary emotional axes (Happy vs. Sad, Interested vs. Bored, Angry vs. Relaxed). Responses were analyzed using mixed-effects ordinal logistic regression models in R.

## Results

Tested with 31 participants across 17 stimulus conditions, the perception experiment demonstrated very high target recognition rates for both voice-only and congruent modalities, with happy showing surprisingly strong identification. Hypothesis 1 was not supported: adding congruent visual context did not statistically significantly enhance perceived intensity scores compared to voice-only stimuli due to potential vocal saturation effects and subtle facial styling. However, incongruent visuals attenuated perceived affect strength (e.g., incongruent happy yielded a strong negative effect in the Happy-Sad test with beta = -4.13, p < 0.001). Hypothesis 2 was confirmed: congruent visual context significantly improved differentiation among high-activation affects like happy and angry (p = 0.038) and low-activation affects like sad and bored (p = 0.006 in Happy-Sad; p = 0.023 in Interested-Bored).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building assistive communication tools or alternative and augmentative communication (AAC) systems for non-verbal users deploying Irish text-to-speech.

## Limitations

The study utilized intentionally subtle facial expressions to avoid overpowering the vocal stimuli, which may have limited the potential for visual enhancement.

## Related

- (link related pages by id as the wiki grows)
