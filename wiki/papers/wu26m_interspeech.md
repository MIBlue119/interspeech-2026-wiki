---
id: wu26m_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3019
pdf: https://www.isca-archive.org/interspeech_2026/wu26m_interspeech.pdf
---

# SEA-Spoof: Bridging the Gap in Multilingual Audio Deepfake Detection for South-East Asia

[PDF](https://www.isca-archive.org/interspeech_2026/wu26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3019)

**TL;DR** — The paper introduces SEA-Spoof, a 711-hour multilingual audio deepfake detection dataset across six South-East Asian languages, and demonstrates that state-of-the-art detectors suffer severe cross-lingual collapse (up to 43.8% EER) unless fine-tuned on the dataset.

## Problem

Existing audio deepfake benchmarks primarily focus on English and high-resource languages, leaving a critical blind spot for South-East Asian (SEA) languages. SEA languages exhibit unique prosodic, phonological, and tonal characteristics that differ fundamentally from non-tonal ones. Consequently, detection models trained on high-resource languages fail when applied to regional dialects and diverse open-source or commercial synthesis systems.

## Method

The authors construct SEA-Spoof, encompassing 711 hours of audio featuring 1:1 real-to-fake pairings across Tamil, Hindi, Thai, Indonesian, Malay, and Vietnamese. Real data is gathered from seven diverse corpora, while synthetic counterparts are generated using 10 open-source models (e.g., VITS-MMS, F5-TTS, XTTS-v2) and 4 commercial closed-source platforms (HeyGen, ElevenLabs, MiniMax, ChatGPT-4o-mini-TTS). The dataset is benchmarked using AASIST, AASIST3, and a 12-layer Transformer-based MoLEx model with WavLM features. MoLEx is also fine-tuned (MoLEx-FT) using a LoRA-based adaptation module to evaluate performance restoration.

## Results

On the ASVspoof5 test set, baseline MoLEx achieves 1.25% EER, but its error rate surges to 43.82% on the SEA-Spoof dataset due to cross-domain mismatch. Fine-tuning on SEA-Spoof (MoLEx-FT) reduces the EER to 0.20%. Closed-source commercial fakes prove significantly harder to detect than open-source ones, with ChatGPT-4o-mini-TTS and ElevenLabs generating the most challenging samples. Language-specific evaluations on closed-source fakes show that Vietnamese is the easiest to detect, whereas Tamil and Malay are the hardest.

## Code

- https://huggingface.co/datasets/Jack-ppkdczgx/SEA-Spoof/

## Applications

Engineers and security researchers building robust, region-aware, and multilingual audio deepfake detection systems against regional online fraud.

## Limitations

Fine-tuning exclusively on SEA-Spoof causes catastrophic forgetting of performance on prior benchmarks like ASVspoof5.

## Related

- (link related pages by id as the wiki grows)
