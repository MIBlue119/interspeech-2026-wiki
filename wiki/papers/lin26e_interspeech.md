---
id: lin26e_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1346
pdf: https://www.isca-archive.org/interspeech_2026/lin26e_interspeech.pdf
---

# LOPA: Enhancing Spoken Language Assessment via Latent Ordinal Prototype Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/lin26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1346)

**TL;DR** — This paper introduces Latent Ordinal Prototype Alignment and Semantic-Anchored Layer Routing to enhance frozen Whisper representations for spoken language assessment, achieving a competitive RMSE of 0.361 without large multimodal model fine-tuning.

## Problem

Spoken Language Assessment (SLA) often relies on billion-parameter multimodal large language models, which impose heavy computational costs and largely ignore the inherent ordinal structure of human language acquisition. Alternatively, lightweight speech foundation models typically probe only the final encoder layer or ignore intermediate multi-depth representations and progression levels, sacrificing fine-grained acoustic-phonetic cues and ordinal separability.

## Method

The framework utilizes a frozen Whisper Large-v3 encoder backbone (32 layers, 1280 dimension) and extracts multi-layer representations combined via Semantic-Anchored Layer Routing (SALR) with biased initialization favoring the final semantic layer. An attention-based temporal pooling mechanism aggregates the routed hidden states into a fixed-size vector, which is mapped through a two-layer MLP feature adapter into a latent embedding space. To structure this space, Latent Ordinal Prototype Alignment (LOPA) applies a prototype attraction loss for intra-class compactness and an ordinal constraint loss with a global scaling factor to maintain monotonic distances corresponding to CEFR score gaps. The model is optimized using task loss combined with the LOPA regularizers using AdamW for 25 to 30 epochs.

## Results

Evaluated on the Speak & Improve (S&I) Corpus 2025 across open speaking parts (P1, P3, P4, P5), the model achieves an RMSE of 0.361 and a Pearson Correlation Coefficient (PCC) of 0.828, matching or outperforming larger fine-tuned multimodal LLM baselines like Phi-4 variants. Tolerance accuracies reach 83.3% within ±0.5 and 99.0% within ±1.0. Ablation studies confirm that removing LOPA increases RMSE to 0.383 and dropping SALR increases it to 0.374, while LOPA improves the global ordinality score from 0.878 to 0.974 and the Silhouette score from -0.110 to 0.032.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building computer-assisted language learning (CALL) platforms and automated spoken language assessment systems for efficient, interpretable oral proficiency scoring.

## Related

- (link related pages by id as the wiki grows)
