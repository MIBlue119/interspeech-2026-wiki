---
id: kulkarni26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3070
pdf: https://www.isca-archive.org/interspeech_2026/kulkarni26_interspeech.pdf
---

# A Closer Look at Failure Modes in Temporal Understanding of Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/kulkarni26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kulkarni26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3070)

**TL;DR** — This paper diagnoses temporal reasoning failures in Large Audio-Language Models (LALMs) using a new 1,657-question benchmark, showing that inference-time attention scaling improves average accuracy from 55.9% to 59.1% without fine-tuning.

## Problem

State-of-the-art Large Audio-Language Models frequently struggle with temporal reasoning tasks such as event localization, duration comparison, and sequencing, which are crucial for applications like diarization and sound-event detection. While modality imbalance (relying excessively on text over audio) is commonly blamed, existing work relies on behavioral observations without proving causal mechanisms. Without mechanistic interpretability, it remains unclear how attention allocation across audio tokens drives these failures.

## Method

The authors introduce a diagnostic benchmark of 1,657 multiple-choice questions across three foundational tasks derived from TACOS: Earliest Onset (EO), Latest Offset (LO), and Longest Duration (LD), with strict temporal separation constraints. They perform behavioral analyses across models like Qwen2-Audio-7B, Kimi-Audio-7B, Audio-Flamingo-3, and DeSTA2.5-Audio using audio-only, caption-only, and combined input modalities. They test training-free causal interventions on open models (Audio-Flamingo-3 and DeSTA-2.5-Audio), evaluating attention upweighting (increasing total audio attention mass) versus attention scaling (multiplicatively sharpening or smoothing attention logits across audio tokens). Interventions are applied at different token locations, including final prompt tokens only, task-relevant keyword tokens only, and their combination.

## Results

Silence ablation confirms that models achieve near-chance performance when audio is removed, proving the dataset genuinely requires audio processing. Behavioral analysis reveals that models heavily under-utilize audio when text captions are available (caption-only often outperforming audio-only). Mechanistically, attention scaling outperforms upweighting (e.g., Audio-Flamingo-3 achieves a 20.5% fix rate with sharpening alpha=2.0, while DeSTA-2.5-Audio achieves 20.1% with smoothing alpha=0.2). Combining task-relevant keyword tokens with final prompt tokens (Kwd+Last) maximizes correction efficacy. Targeted layer-wise scaling (e.g., Layer 20 for Audio-Flamingo-3, Layer 9 for DeSTA-2.5-Audio) boosts average accuracy from 55.9% to 59.1% without any retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on audio-language models, sound-event detection, and audio captioning can use these insights to improve temporal understanding without costly model re-training.

## Limitations

The interventions cannot fully rule out alternative failure mechanisms such as suboptimal underlying audio encoder representations, and the evaluations are scoped to three foundational multiple-choice tasks.

## Related

- (link related pages by id as the wiki grows)
