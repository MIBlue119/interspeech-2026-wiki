---
id: wiechmann26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2475
pdf: https://www.isca-archive.org/interspeech_2026/wiechmann26_interspeech.pdf
---

# Can deep learning based voice editing enhance voice quality perception skills in speech therapy students?

[PDF](https://www.isca-archive.org/interspeech_2026/wiechmann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wiechmann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2475)

**TL;DR** — Using a deep learning speech synthesis system to isolate voice qualities during perceptual training significantly improves speech therapy students' rating sensitivity and agreement with expert gold standards compared to natural anchor voices.

## Problem

Auditory-perceptual assessment of voice quality is notoriously difficult and unreliable, especially for novices like speech therapy students, because natural voices are multidimensional and combine multiple overlapping acoustic features simultaneously. Existing listener training relies on natural anchor voices that also contain these confounding multidimensional properties, preventing learners from experiencing single perceptual features in isolation. This lack of isolation hinders the reliable acquisition of voice quality classification skills across dimensions like breathiness, creakiness, and roughness.

## Method

The study evaluates a deep-learning-based voice synthesis framework that modifies a text-to-speech baseline (YourTTS) using a conditioning manipulation block built on Conditional Continuous Normalizing Flows. This block takes seven specific voice quality strength dimensions as input to transform global speaker representations and generate controlled prototypes. Twenty clinical linguistics students participated in a between-subjects experiment, split evenly into a control group (receiving explanations with natural anchor voices) and a synthesis group (receiving targeted synthetic examples). Participants performed binary presence-absence ratings on 16 non-pathological German voice samples from the Nautilus Speaker Characterization Corpus before and after a 10-minute interactive expert explanation session.

## Results

Evaluating performance via perceptual sensitivity (d-prime) and agreement with an expert gold standard (Cohen's kappa), the synthesis group showed a significant increase in sensitivity from pre-test (0.73) to post-test (1.03, p = 0.024), whereas the control group showed no significant change (0.49 to 0.55). Post-test comparisons confirmed that the synthesis group achieved significantly higher sensitivity (p = 0.007) and gold standard agreement (p = 0.022) than controls. A dimensional breakdown revealed that sensitivity for the 'rough' voice quality improved from below-chance to above-chance exclusively within the synthesis group (p = 0.028). An ANCOVA controlling for baseline pre-test scores further corroborated a significant main effect of the synthesis training group (p = 0.017).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech therapy educators and phonetic training programs can use controllable deep learning speech synthesis to build more effective perceptual ear-training curricula for students and professionals.

## Limitations

The study relies on a relatively small cohort of 20 female clinical linguistics students, and significant improvements were isolated primarily to the rough voice dimension without parallel gains for breathy or creaky qualities.

## Related

- (link related pages by id as the wiki grows)
