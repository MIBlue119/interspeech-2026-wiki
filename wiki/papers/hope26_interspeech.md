---
id: hope26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2663
pdf: https://www.isca-archive.org/interspeech_2026/hope26_interspeech.pdf
---

# Lived Experiences of Power and Agency: Achieving Voice Sovereignty in Assistive Speech Technology for Nonbinary Users

*Maxwell Hope, Juliana Francis, Joakim Gustafson, Éva Székely*

[PDF](https://www.isca-archive.org/interspeech_2026/hope26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hope26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2663)

**Category:** `tts`

**TL;DR** — A qualitative needs assessment of nonbinary speech-generating device (SGD) users reveals how technical and social constraints limit voice sovereignty, pointing to modern neural TTS systems as a path toward identity-aligned assistive technology.

## Key contributions

- Conducted an in-depth, two-survey qualitative investigation into the lived experiences, identity expression, and agency of nonbinary SGD users.
- Identified three core themes: SGD integration into daily life, identity expression, and a cross-cutting theme of power and agency.
- Documented the tension between intelligibility and personal authenticity, noting that users often compromise on voice identity to ensure they are understood.
- Bridged qualitative user needs with modern text-to-speech (TTS) capabilities, outlining how promptable and zero-shot architectures can fulfill demands for non-binary and dialect-specific voices.

## Problem

Prior research on gender-expansive augmentative and alternative communication (AAC) users has narrowly focused on binary gendered voice options, overlooking broader identity alignment, technological constraints, and user agency. Existing tools like the MAGES corpus lack dialectal diversity, and commercial SGDs force users to sacrifice personal identity for intelligibility. This lack of customization infringes on user autonomy, leading to misgendering, frustration, and a compromised sense of self.

## Method

The study utilized an inductive thematic analysis of semi-structured qualitative data gathered across two anonymous surveys administered one week apart. Three nonbinary participants over the age of 18 completed the surveys via Google Forms, detailing their daily routines, technical barriers, conversational hurdles, and desires for voice customization. The one-week interval allowed participants time for active reflection on their device usage before providing follow-up insights.

Building upon these qualitative findings, the paper maps user-expressed needs to modern neural text-to-speech architectures (such as Parler-TTS, StyleTTSZS, VoiceCraft, CosyVoice 3, and IndexTTS2). These architectures offer natural-language prompting of speaker identity, accent, style, prosody, and duration control. The authors argue that speaker interpolation methods can enable continuous exploration of voice space rather than locking users into rigid binary categories, provided that future systems prioritize identity-centered design and user autonomy.

## Experimental setup

The study analyzed qualitative survey responses from 3 nonbinary participants recruited from an existing mailing list. Participants represented diverse device setups (including iPads running multiple AAC apps, Accent with LAMP/Unity, TD Snap, and Grid Pad 13) and used their SGDs daily or most days. Compensation was set at 20 USD per participant. The methodology followed an open-ended, inductive thematic analysis framework.

## Results

The qualitative analysis extracted three primary themes from the participant responses, quantified via quote counts: SGD integration (subdivided into physical, cognitive/emotional, and social integration), identity expression (general, gender, and dialectal), and power and agency. Key qualitative findings highlight that participants frequently prioritized intelligibility over identity alignment, choosing generic or pitch-shifted voices because better alternatives were unavailable or poorly supported by software like TD Snap. Participants reported barriers to agency stemming from both technological rigidity and social pressures, such as conversational partners rushing them or failing to wait for message composition.

Furthermore, participants emphasized the desire for regionally specific dialect options (such as a New England nonbinary accent or an Appalachian accent) and intentionally 'uncanny valley' or queer voice profiles that subvert traditional gender norms.

## Limitations

The study relies on a very small sample size of three participants, which, while standard for deep qualitative investigations of marginalized niche populations, limits generalizability. The survey data is self-reported and reflects the technological landscape of specific commercial AAC apps available to the cohort. Additionally, the paper does not implement or evaluate a computational model, leaving the proposed alignment with modern TTS architectures as a conceptual roadmap.

## Why read this

Speech and ML engineers building modern text-to-speech or conversational AI systems should read this paper to understand how personalization, latency, and identity alignment translate to real-world agency for assistive technology users.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of customizable, promptable, and identity-aligned text-to-speech engines and assistive communication devices for nonbinary and speech-disabled users.

## Institutions / 機構

University of Delaware, KTH Royal Institute of Technology

**Funding / 經費:** WASP

## Related

- (link related pages by id as the wiki grows)
