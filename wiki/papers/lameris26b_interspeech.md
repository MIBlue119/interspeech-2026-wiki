---
id: lameris26b_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.pdf
---

# VoiceQualityGUI: A Tool for Word-Level Voice Quality Modifications

*Harm Lameris, Alan Villamil, Nigel G. Ward*

[PDF](https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.html)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — VoiceQualityGUI is a Streamlit-based interactive tool enabling word-level modifications of breathiness, creakiness, and nasality using a fine-tuned VoiceQualityVC model. It streamlines the exploration of pragmatic functions in synthesized speech using a dataset of roughly 17 hours and 20 minutes.

## Key contributions

- Developed VoiceQualityGUI, a graphical interface for word-level manipulation of voice quality features (creakiness, breathiness, and nasality).
- Built upon an improved version of VoiceQualityVC utilizing a fine-tuned FreeVC checkpoint conditioned on glottal source characteristics.
- Integrated a zero-pass baseline generation workflow and global pitch adjustments combined with local word-range intensity sliders.
- Provided automated logging that saves both modified audio outputs and precise time-aligned feature intensity adjustments for downstream analysis.

## Problem

Prosody is well-studied regarding pitch, rate, and intensity, but glottal features like CPPS, harmonicity, and creakiness remain under-investigated despite accounting for significant variance in pragmatic meaning. Prior research relied heavily on unaided observation or cumbersome human-produced controlled stimuli, or required tedious manual time-range annotations over voice-converted game assets as seen in past work. These bottlenecks hinder the quick formation and triage of early-stage hypotheses regarding how local variations in voice quality convey pragmatic intent.

## Method

The backend relies on a fine-tuned version of VoiceQualityVC, which extends the open-source FreeVC checkpoint by directly conditioning on glottal source characteristics. Specifically, separate encoders implemented as simple affine transformations were added for four glottal source parameters: HNR35, CPPS, H1-H2, and H1-A3. These acoustic parameters are exposed to the user indirectly via three perceptual groupings that map to breathiness, creakiness, and nasality.

Training was conducted on the English-language portion of the Expressive Speech corpus, restricted to audio files with an automated prosody score up to 0.78, totaling roughly 17 hours and 20 minutes of data. The FreeVC checkpoint was fine-tuned for 45k iterations with a batch size of 32 and a learning rate of 5e-5, using per-frame annotations of the four glottal source features. Pitch and pitch variation were annotated per utterance and all features were z-standardized.

During inference, the user supplies a source audio file, a target speaker reference file containing at least 30 seconds of speech, and a time-aligned transcript. A zero-pass conversion establishes a neutral baseline, after which users can globally adjust pitch and locally manipulate sliders to modify specific words for intensity values of creakiness, breathiness, and nasality.

## Experimental setup

The system utilizes the English-language portion of the Expressive Speech corpus comprising approximately 17 hours and 20 minutes of audio. Pitch and pitch variation were annotated per utterance, and frame-level annotations were applied for four glottal source parameters. The GUI is built using the Streamlit library, wrapping a FreeVC-based voice conversion model fine-tuned for 45k iterations with a batch size of 32 and a learning rate of 5e-5.

## Results

Because this paper introduces a software tool and exploratory framework rather than a conventional machine learning benchmark, direct comparative quantitative performance metrics against alternative systems are not evaluated. The effectiveness of the underlying VoiceQualityVC model relies on previous findings, while the current work demonstrates qualitative utility in bypassing tedious manual hand-editing of time ranges for expressive speech post-editing.

## Limitations

The current tool relies on a dataset restricted to English-language expressive speech, limiting multilingual exploration without additional retraining. The underlying voice conversion model depends on accurate time-aligned transcripts and target speaker reference audio of at least 30 seconds. Furthermore, the mapping from acoustic glottal parameters to human perception of voice quality remains an approximation managed via preset combinations.

## Why read this

Speech and ML researchers investigating controllable speech synthesis, expressive text-to-speech, or pragmatic intent modeling should read this paper to learn how to bridge low-level glottal source features with user-friendly word-level GUI controls.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Interactive voice conversion tools, expressive video game character voice post-editing, and linguistic studies on pragmatic intent.

## Institutions / 機構

KTH Royal Institute of Technology, University of Texas at El Paso

**Funding / 經費:** Air Force Office of Scientific Research

## Related

- (link related pages by id as the wiki grows)
