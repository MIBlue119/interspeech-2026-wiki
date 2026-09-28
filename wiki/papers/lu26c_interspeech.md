---
id: lu26c_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1925
pdf: https://www.isca-archive.org/interspeech_2026/lu26c_interspeech.pdf
---

# Breaking Neutral Bias: Zero-Human-Annotation Fine-Grained Emotion Enrichment via Semantic Drift and Discriminative Re-ranking

[PDF](https://www.isca-archive.org/interspeech_2026/lu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1925)

**TL;DR** — This paper introduces a zero-human-annotation data-centric pipeline called Semantic Drift and Discriminative Re-ranking to eliminate neutral bias in Large Audio Language Models, achieving a 66.15% win rate over baselines.

## Problem

Large Audio Language Models suffer from neutral bias, frequently defaulting to safe, generic descriptions like "speaking in a calm tone" because existing audio datasets rely on coarse categorical labels. While text augmentation or multimodal expansion can generate richer descriptions, they lack raw acoustic grounding and introduce stylistic biases, modality hallucinations, or text bias. This failure to capture fine-grained emotional transitions and micro-tones limits the downstream expressiveness and comprehension of audio-language models.

## Method

The proposed hypothesize-and-verify pipeline operates in three stages: collaborative multi-model annotation (using Gemini 2.5 Pro and Qwen3-Omni with BGE-M3 similarity filtering to divide data into high and low-consistency subsets), multi-dimensional semantic drift (using DeepSeek-V3 to rewrite low-consistency descriptions into diverse emotional candidate hypotheses), and discriminative re-ranking. A discriminative judge model built by fine-tuning Qwen2.5-Omni evaluates the candidates directly against continuous raw audio signals. This judge is trained on contrastive triplets containing positive examples, soft negatives (reversed polarity), and hard negatives (subtle emotional mismatches) to calibrate decision boundaries and prevent excessive rejection.

## Results

Evaluated on a corpus of 29,530 unique audio clips (49,410 contrastive pairs for the judge model and 12,000 samples for downstream SFT), the full-scale judge model achieves a True Positive Rate of 94.43%, a Soft True Negative Rate of 99.89%, and a Hard True Negative Rate of 93.88%. In downstream SFT evaluations, the proposed method secures a 66.15% win rate against the baseline using Gemini 2.5 Pro as an LLM judge, while increasing lexical diversity from 2,897 to 3,213 unique bigrams and raising entropy from 9.37 to 9.50. t-SNE visualizations in BGE-M3 latent space confirm that the method successfully eliminates mode collapse toward neutral states and recovers a multi-modal distribution across emotional categories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing Large Audio Language Models, emotion recognition systems, and expressive conversational speech agents.

## Related

- (link related pages by id as the wiki grows)
