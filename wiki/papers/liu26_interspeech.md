---
id: liu26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-88
pdf: https://www.isca-archive.org/interspeech_2026/liu26_interspeech.pdf
---

# CoSTA: Cognitive-State-Conditioned TTS Data Augmentation Using ASR Transcripts for Alzheimer’s Disease Detection

[PDF](https://www.isca-archive.org/interspeech_2026/liu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-88)

**TL;DR** — The paper introduces CoSTA, a cognitive-state-conditioned text-to-speech data augmentation framework that improves Alzheimer's disease detection accuracy to 85.83% on the ADReSS test set.

## Problem

Speech-based Alzheimer's Disease (AD) detection models suffer from severe data scarcity and overfitting due to privacy regulations and limited patient availability. Standard text-to-speech augmentation fails because its objective is to maximize intelligibility and naturalness, which masks clinical speech pathologies like unnatural pauses and disfluencies. Furthermore, standard approaches rely on manual transcripts rather than exploring how automated speech recognition imperfections might introduce valuable diagnostic cues.

## Method

The framework adapts CosyVoice2 and F5-TTS to serve as Cognitive-State-Conditioned (CS-Cond) generators by fine-tuning them on separate AD and Healthy Control (HC) subsets using natural-language instructions or cognition labels. To drive the augmentation, the authors build a transcript pool consisting of manual transcripts and 36 distinct ASR transcripts generated from 18 pretrained and fine-tuned ASR model variants (Wav2Vec2, HuBERT, WavLM, Whisper). They introduce self-reference synthesis (2x) and intra-class cross-synthesis to combine linguistic content with different speaker timbres. The downstream detection model utilizes a 24-layer WavLM encoder with weighted feature fusion and attentive temporal pooling.

## Results

Evaluated on the ADReSS dataset, CS-Cond TTS models consistently outperform pretrained baselines across Mel Cepstral Distortion, log-F0 RMSE, and Fréchet Audio Distance. ASR-driven transcript augmentation frequently outperforms manual transcript-driven augmentation by introducing useful linguistic variance and error patterns. Ultimately, CoSTA achieves an audio-only classification accuracy of 85.83% on the ADReSS test set, representing a 4.16% improvement over the baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building robust healthcare diagnostic tools for neurodegenerative diseases under severe data constraints.

## Related

- (link related pages by id as the wiki grows)
