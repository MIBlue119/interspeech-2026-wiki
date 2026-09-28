---
id: kuzmenko26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2483
pdf: https://www.isca-archive.org/interspeech_2026/kuzmenko26_interspeech.pdf
---

# GigaAM Multilingual: Foundation Model for Underrepresented Languages

[PDF](https://www.isca-archive.org/interspeech_2026/kuzmenko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuzmenko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2483)

**TL;DR** — GigaAM Multilingual is a 600M-parameter Conformer foundation model pre-trained on 2 million hours of audio using a cluster-level balancing strategy, significantly outperforming larger baselines like Whisper and Omnilingual on underrepresented Central Asian languages.

## Problem

Multilingual ASR scaling suffers from severe performance disparities because high-resource head languages dominate training data, while drastic naive upsampling leads to overfitting. Standard open-source pretrained encoders often exhibit prohibitive error rates on low-resource and long-tail Central Asian languages such as Kazakh, Kyrgyz, and Uzbek.

## Method

The authors pre-train a 600M-parameter Conformer encoder (24 layers, 1024 hidden dimension, Rotary Position Embeddings) at a 25 Hz frame rate using a HuBERT-style masked unit prediction objective (40% contiguous frame masking, 1000 K-means clusters). To mitigate head-language dominance, they construct a normalized language co-occurrence graph to cluster languages and apply cluster-level sampling weights during pre-training. Downstream fine-tuning uses a shared character vocabulary and CTC loss over a multi-domain data mixture combining open-source corpora, crowdsourced data, ASR-filtered weakly supervised data, and multi-speaker TTS synthetic data generated from mC4 prompts. A domain-aware sampling strategy is applied at the fine-tuning stage to control domain composition and prevent synthetic or large sub-domains from dominating optimization.

## Results

Evaluated on Common Voice, FLEURS, and internal in-the-wild crowdsourced datasets (6-20 hours per language), GigaAM Multilingual achieves state-of-the-art word error rates on Kazakh, Kyrgyz, and Uzbek. In pre-training ablations, shifting cluster sampling weights toward the Central Asian cluster improves Kyrgyz WER from 9.4% to 8.5% and Uzbek from 10.5% to 9.7% with minimal impact on high-resource languages. Under a matched CTC fine-tuning protocol, a smaller 240M variant and the 600M GigaAM both outperform Whisper Large v3 and Omnilingual-1B, with the 240M model achieving an average WER of 12.2% compared to 14.1% for Whisper and 16.6% for Omnilingual. In minimal-coverage tail language adaptation (Georgian and Bashkir on Common Voice), GigaAM also achieves lower WERs than Whisper and Omnilingual.

## Code

- https://github.com/salute-developers/GigaAM

## Applications

Speech and ML engineers building automatic speech recognition systems for low-resource, long-tail, or underrepresented languages, particularly in spontaneous speech and challenging acoustic environments.

## Related

- (link related pages by id as the wiki grows)
