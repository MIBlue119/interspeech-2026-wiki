---
id: zhang26f_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-656
pdf: https://www.isca-archive.org/interspeech_2026/zhang26f_interspeech.pdf
---

# CoRE: Contrastive Evidence-Aware Rescoring for Multiple-Choice Audio Question Answering

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-656)

**TL;DR** — CoRE is a training-free test-time option re-scoring method that mitigates modality bias in Large Audio-Language Models for multiple-choice audio question answering, yielding consistent top-1 accuracy gains across DCASE Task 5 and AIR-Bench SoundQA.

## Problem

Large Audio-Language Models often suffer from modality bias in multiple-choice audio question answering, relying heavily on textual priors and semantic associations between questions and candidate options rather than grounded acoustic evidence. Existing debiasing techniques either require costly retraining or rely on simplistic intervention conditions like silence that introduce distribution shifts and fail to capture relative acoustic evidence. This limits faithful reasoning in complex acoustic and bioacoustic scenarios where precise audio grounding is essential.

## Method

The method, called CoRE, constructs counterfactual audio in the waveform domain by partitioning audio into 40 ms non-overlapping blocks, applying random block permutation, and stochastically performing within-block time reversal with a probability of 0.5 with 3 ms cross-fading. This design disrupts long-range temporal structure while largely preserving short-time acoustic statistics. It evaluates option-level evidence gain by contrasting conditional log-likelihood scores under original and counterfactual audio conditions within a unified option-scoring protocol. Finally, it applies an adaptive evidence-aware gate, combining Jensen-Shannon divergence and one-sided entropy reduction to control the re-scoring interpolation and suppress over-correction when the audio shift uninformative.

## Results

Evaluated on DCASE 2025 Task 5 (Bioacoustics QA, Temporal Soundscapes QA, and Complex QA) and AIR-Bench SoundQA using Qwen2-Audio-7B-Instruct and Kimi-Audio-7B-Instruct under M=8 random answer-choice permutations. On Qwen2-Audio, CoRE improves BQA accuracy from 30.0% to 40.7%, TSQA from 45.6% to 51.0%, CQA from 52.6% to 53.2%, and SoundQA from 67.2% to 73.8%. It consistently outperforms default inference, prompt engineering, Audio-Aware Decoding (AAD) using silence, and a silence-based ablation (CoRE-Silence). Self-similarity matrix validation confirms the full permutation-plus-reversal counterfactual design achieves superior long-range temporal disruption and local acoustic preservation compared to single-operation variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers deploying Large Audio-Language Models for audio question answering, sound event analysis, and multimodal acoustic scene understanding.

## Limitations

Performance gains are smaller on complex reasoning subsets like CQA that demand higher-level semantic inference beyond immediate audio grounding.

## Related

- (link related pages by id as the wiki grows)
