---
id: ulgen26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-942
pdf: https://www.isca-archive.org/interspeech_2026/ulgen26_interspeech.pdf
---

# Rethinking Speaker Embeddings for Speech Generation: Sub-Center Modeling for Capturing Intra-Speaker Diversity

[PDF](https://www.isca-archive.org/interspeech_2026/ulgen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ulgen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-942)

**TL;DR** — This paper introduces sub-center modeling for speaker embeddings to preserve intra-speaker variability for speech generation, improving prosodic expressiveness and naturalness in voice conversion without degrading speaker verification accuracy.

## Problem

Conventional speaker embeddings are optimized for speaker recognition via objectives that suppress intra-class variance to maximize inter-class separation. This single-prototype structure discards crucial acoustic variations like prosody, style, and emotion. Consequently, recognition-driven embeddings are fundamentally mismatched for downstream speech generation tasks such as text-to-speech and voice conversion, which require rich intra-speaker diversity to sound natural.

## Method

The authors propose a sub-center modeling framework built on the ECAPA-TDNN architecture, replacing single class centers with multiple sub-centers per speaker within an AAM-Softmax discriminative objective. The model calculates similarities to multiple sub-centers per speaker class and aggregates them using a temperature-scaled softmax weighting mechanism. This permits different utterances of the same speaker to selectively align with different prototypes during training. The resulting 192-dimensional embeddings are integrated into a speech-resynthesis voice conversion pipeline that conditions a modified HiFi-GAN vocoder alongside discrete HuBERT linguistic units and VQ-VAE F0 pitch representations. Experiments test sub-center counts of C = 10 and C = 20 with temperatures T = 1 and T = 0.1, using VoxCeleb2 for embedding training and VCTK for voice conversion evaluation.

## Results

On the VCTK speaker verification evaluation, the sub-center ECAPA-TDNN with C = 20 achieved an intra-to-inter-class variance ratio of 0.91 (compared to 0.66 for baseline ECAPA-TDNN) while maintaining competitive or superior verification performance. In zero-shot voice conversion across 20,000 trial utterances, the sub-center approach (C = 20) increased synthesized F0 standard deviation from 8.03 to 10.25 and F0 range from 52.37 to 57.09, reflecting enhanced prosodic variability. The method also preserved high speaker embedding cosine similarity and strong intelligibility scores compared to the baseline.

## Code

- https://choughtotem.github.io/subcentervc_demo/

## Applications

Speech and ML engineers building zero-shot text-to-speech, voice conversion, or personalized expressive conversational agents can use this method to generate more natural and prosodically varied voices.

## Related

- (link related pages by id as the wiki grows)
