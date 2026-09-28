---
id: koudounas26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2313
pdf: https://www.isca-archive.org/interspeech_2026/koudounas26_interspeech.pdf
---

# Synthetic Pathological Speech at Scale: A Flow Matching Approach for Clinical Data Augmentation

[PDF](https://www.isca-archive.org/interspeech_2026/koudounas26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koudounas26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2313)

**TL;DR** — The paper adapts F5-TTS with clinical status token conditioning to synthesize pathological and healthy sustained vowels for clinical data augmentation, achieving up to +3.9% accuracy and +13.3% sensitivity gains over real-only baselines when training classifiers solely on 100k synthetic samples.

## Problem

Deep learning models for pathological voice detection are heavily constrained by severe data scarcity, imbalanced datasets, and a lack of diversity across environments and disease severities. Traditional augmentation methods like noise injection, pitch shifting, or spectral warping fail because linear transformations cannot replicate the complex, non-linear glottal dynamics and aperiodicity characteristic of vocal fold dysfunction.

## Method

The authors adapt F5-TTS, a non-autoregressive Conditional Flow Matching (CFM) model using a Diffusion Transformer (DiT) architecture, operating on 80-bin mel-spectrograms at 24 kHz. To achieve controllable generation, they prepend phonetic transcripts with clinical status tokens (⟨healthy⟩ or ⟨pathological⟩) processed by the text encoder via cross-attention. The model is trained on a 7,211-recording corpus of sustained vowels across four languages (SVD, AVFAD, VOICED, PVQD) and generates synthetic datasets scaling from 100 to 100,000 samples using reference guidance for speaker identity and prosody. Downstream binary classifiers use a HuBERT-AS feature encoder followed by a two-layer MLP with weighted cross-entropy loss.

## Results

Evaluated on held-out real data, models trained on 100k synthetic samples surpass real-only baselines by +3.9% in accuracy and +13.3% in sensitivity. Standard data augmentation yields negligible improvements, whereas flow-based scaling provides monotonic performance gains starting at 1k samples and peaking at 100k. Synthetic augmentation also enables effective cross-domain transfer, yielding +7.4% / +10.0% F1 on multi-class pathology classification (FEMH and IPV datasets) and +6.8% accuracy on zero-shot Parkinson's disease detection (PC-GITA). Among SSL backbones, HuBERT-AS consistently outperforms HuBERT-LS, WavLM-Base+, wav2vec 2.0, and voc2vec variants.

## Code

- https://github.com/koudounasalkis/Pathology-F5TTS

## Applications

Engineers and clinicians building non-invasive voice pathology screening tools, neurological disease detectors (e.g., Parkinson's), and robust acoustic voice diagnostic systems facing limited real-world clinical data.

## Limitations

The study focuses exclusively on sustained vowel phonations rather than continuous, running speech.

## Related

- (link related pages by id as the wiki grows)
