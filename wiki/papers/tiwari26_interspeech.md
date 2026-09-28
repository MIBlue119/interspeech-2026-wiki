---
id: tiwari26_interspeech
category: audio-captioning
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2102
pdf: https://www.isca-archive.org/interspeech_2026/tiwari26_interspeech.pdf
---

# Say That Again: Visualizing Paralinguistic Cues with Prosody-Aware Diffusion

[PDF](https://www.isca-archive.org/interspeech_2026/tiwari26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tiwari26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2102)

**TL;DR** — NovaDiffusion introduces prosody-aware audio-to-image generation by conditioning a distilled U-Net on emotion-correlated prosodic features, achieving 71.3% emotion classification accuracy on RAVDESS.

## Problem

Current text-to-image and audio-to-image models discard paralinguistic cues such as pitch contour, rate, and emotional inflection, treating speech as a single opaque vector. This makes it impossible to visually reflect how a speaker's tone, like sarcasm versus genuine curiosity, changes the meaning of an identical text transcript.

## Method

The paper introduces ProsoBench, a 168K human-annotated speech-emotion-image triplet dataset curated from RAVDESS, IEMOCAP, and MSP-Podcast. It proposes ProsodyCLIP, which combines a voice encoder with a prosody-specific MLP branch trained via InfoNCE and cross-entropy losses. The generation backbone is a 280M-parameter distilled U-Net with inverted residual blocks and multi-scale fusion, coupled via an IP-Adapter-inspired decoupled cross-attention mechanism to inject prosodic embeddings separately from text.

## Results

Evaluated on RAVDESS and ProsoBench, NovaDiffusion achieves 71.3% Emotion Classification Accuracy (ECA), outperforming SonicDiffusion (48.2%) and a retrained SonicDiffusion baseline (52.6%). On held-out IEMOCAP speakers, it reaches 63.4% ECA compared to 41.7% for the baseline. Human raters also significantly preferred NovaDiffusion over baselines for emotion match (3.82 vs. 2.94 out of 5). Ablations confirm that removing the prosodic branch drops ECA by 14.1pp and dropping the auxiliary classification loss costs 8.7pp.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Creative tools, multimodal content generation, and storytelling systems that need to dynamically adapt visual scenes based on the emotional tone and prosody of spoken dialogue.

## Limitations

The evaluation metric (ECA) relies on facial expression classification and does not capture scene-level emotions without faces, and the voice encoder retains some lexical content.

## Related

- (link related pages by id as the wiki grows)
