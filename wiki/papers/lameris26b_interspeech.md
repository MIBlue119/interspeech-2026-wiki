---
id: lameris26b_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.pdf
---

# VoiceQualityGUI: A Tool for Word-Level Voice Quality Modifications

[PDF](https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lameris26b_interspeech.html)

**TL;DR** — VoiceQualityGUI is an interactive graphical tool that enables word-level modifications of breathiness, creakiness, and nasality in synthesized speech.

## Problem

While prosodic features like pitch and speaking rate are well-studied, glottal features and voice qualities that heavily influence pragmatic meaning and conversational intent remain under-explored due to a lack of interactive exploration tools. Prior experimentation required tedious, manual time-range editing of specifications. This tool addresses the gap by supporting quick hypothesis formation and triage regarding how voice quality variations alter perceived pragmatic functions.

## Method

The tool is implemented using the Streamlit library and requires a source audio file, a 30-second target speaker audio file, and a time-aligned transcript. It leverages an improved version of VoiceQualityVC, which is a fine-tuned FreeVC checkpoint trained for 45k iterations with a batch size of 32 and a learning rate of 5e-5 on the English portion of the Expressive Speech corpus. The backend conditions directly on glottal source characteristics using separate affine transformation encoders for four parameters: HNR35, CPPS, H1-H2, and H1-A3. These parameters are exposed to the user through three intuitive sliders corresponding to breathiness, creakiness, and nasality. An initial zero-pass standardizes baseline prosody, after which users can adjust word-level intensities and save the resulting audio along with time-aligned feature adjustments.

## Results

The system utilizes audio selections totaling approximately 17 hours and 20 minutes from expressive datasets where files had a prosody score of up to 0.78. Pitch and pitch variation were annotated per utterance, and all features were z-standardized. The paper details qualitative workflow improvements over manual specification approaches by allowing users to subjectively compare modified outputs against original audio for pragmatic fidelity. No quantitative automatic evaluation metrics or baseline comparisons are reported.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech researchers and conversational designers use this tool to investigate the pragmatic functions of voice qualities and to generate controlled stimuli for perception studies.

## Limitations

The paper does not explicitly state formal limitations, though scope is bounded to word-level manipulations of creakiness, breathiness, and nasality using a specific voice conversion backbone.

## Related

- (link related pages by id as the wiki grows)
