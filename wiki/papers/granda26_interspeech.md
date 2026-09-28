---
id: granda26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2886
pdf: https://www.isca-archive.org/interspeech_2026/granda26_interspeech.pdf
---

# Genealogical Priors in Self-Supervised Learning: Improving Speech Technology for Low-Resource Languages

[PDF](https://www.isca-archive.org/interspeech_2026/granda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/granda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2886)

**TL;DR** — This paper investigates whether organizing self-supervised speech pretraining data by language family improves representation learning for low-resource languages, achieving a score of 0.50 on downstream tasks compared to 0.04 for random selection under severe 60-hour data constraints.

## Problem

Current speech self-supervised learning (SSL) paradigms scale data and compute indiscriminately while treating multilingual diversity merely as a scaling variable, ignoring linguistic structure and leaving thousands of low-resource languages digitally marginalized. Because acquiring expert transcriptions is expensive and scarce, underrepresented languages suffer from poor transfer performance when models are trained on unstructured, heavily imbalanced multilingual corpora.

## Method

The authors perform continued pretraining of the 316M-parameter WavLM-Large model using a contrastive objective and Gumbel-Softmax vector quantization on a 60-hour subset of the Unsupervised People's Speech (UPS) corpus, comparing random multilingual sampling against a family-aware subset spanning 32 languages across multiple families. The CNN feature encoder is frozen while the transformer layers and projection heads are updated with a bfloat16 mixed-precision setup, AdamW optimizer, and on-the-fly waveform-level speed perturbation and additive noise augmentations. Prior to training, audio is filtered using Silero VAD and Whisper Large v3 language identification, discarding segments that fail duration and availability checks.

## Results

Evaluated on the Interspeech Unsupervised People's Speech in the Wild challenge downstream tasks (Language Identification, Automatic Speech Recognition, and Speaker Clustering), the language-aware configuration achieves an overall score of 0.50, an F1 of 0.75, a Character Error Rate (CER) of 0.04, and an Adjusted Rand Index (ARI) of 0.90, vastly outperforming the random no-language-aware baseline score of 0.04, F1 of 0.48, CER of 0.037, and ARI of 0.39. Both continued-pretraining models remain below the original un-finetuned WavLM-Large baseline, indicating that linguistic structure enhances robustness under data constraints but complements rather than replaces large-scale pretraining. Preprocessing ablations show that VAD-based segment filtering improves HuBERT language-level centroid classification accuracy from 55.9% to 65.2% and family-level accuracy from 42.5% to 50.0%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building inclusive, low-resource speech technology systems for automatic speech recognition, language identification, and speaker diarization.

## Limitations

The study relies on a single small 60-hour audio subset and a limited set of languages, and the continued pretraining regime partially perturbs well-optimized English representations without providing sufficient scale to fully build stable cross-linguistic abstractions.

## Related

- (link related pages by id as the wiki grows)
