---
id: ku26_interspeech
category: resources-evaluation
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2175
pdf: https://www.isca-archive.org/interspeech_2026/ku26_interspeech.pdf
---

# Audiovisual CXMI: Scene-based Context Tagging for Spoken Language Translation Evaluation

*Dayeon Ku, Hwayoung Park, Hong Kook Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/ku26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ku26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2175)

**Category:** `resources-evaluation` · **Labels:** `multilingual`

**TL;DR** — Audiovisual CXMI (AV-CXMI) extends text-only Conditional Cross-Mutual Information by incorporating scene-level acoustic and visual tags to reliably evaluate spoken language translation quality. Evaluated on Korean–English film translation, it achieves a statistically significant correlation with human judgment (r = 0.400) and resolves ranking inversions where text-only metrics incorrectly scored human translations below machine outputs.

## Key contributions

- A scene extraction pipeline combining color-space shot boundary detection with ResNet50 similarity and SCNet/ECAPA-TDNN Jaccard-based speaker clustering for temporal and contextual coherence.
- A multimodal tag extraction framework capturing six categories (Setting, Relationship, Time, Mood, Dialog Act, Politeness) using GPT-4o, GPT-4o-audio-preview, and specialized classifiers.
- The AV-CXMI metric that conditions both context-agnostic and context-aware translation probability models on structured audiovisual tags to isolate and quantify contextual utilization.
- Empirical demonstration on Korean–English films that AV-CXMI aligns with human MOS (r = 0.400, p < 0.003) and exhibits a large system discrimination effect (eta^2 = 0.519).

## Problem

Traditional machine translation metrics like BLEU or COMET operate at the sentence level and fail to evaluate discourse-level context usage. While Conditional Cross-Mutual Information (CXMI) quantifies context dependency, it relies exclusively on text, missing crucial audiovisual cues like tone, setting, and body language that human translators use. Consequently, text-only CXMI produces flawed evaluations where human translations score lower than context-aware machine outputs. This paper addresses this gap by proposing an evaluation metric that rigorously integrates multimodal contextual streams.

## Method

The framework operates in three distinct stages: scene extraction, tag extraction, and metric evaluation. First, input videos undergo shot boundary detection using PySceneDetect based on HSV frame differences, with keyframes fed into a ResNet50-based Scene Consistency model. To fix temporal inconsistency, audio is isolated using SCNet source separation, speaker embeddings are extracted via ECAPA-TDNN, and agglomerative hierarchical clustering groups speakers. Adjacent scenes are merged or split using a Jaccard index threshold over speaker sets.

Second, AV tags are extracted by formatting uniform video keyframes into grid images and passing audio tracks to GPT-4o and GPT-4o-audio-preview with chain-of-thought prompting. Whisper generates transcripts, and self-consistency decoding across three runs handles LLM stochasticity to output tags for SETTING, REL, TIME, and MOOD in <key:value> format. Separately, a BERT model trained on AI-Hub classifies DIALOG acts into 22 categories (~80% accuracy), and a Korean formality classifier assigns POLITENESS tags.

Third, AV-CXMI expands standard token-level cross-entropy formulations. Both the context-agnostic baseline model (q_MTA) and the context-aware model (q_MTC) receive the sentence-level AV-tag set alongside current and two preceding source sentences (k=2) to prevent train-test mismatch. The models are built on an mBART encoder-decoder architecture, pretrained on text corpora (315K sentence pairs) and fine-tuned on scene-segmented film data.

## Experimental setup

Baseline training utilized 315K sentence pairs from AI-Hub datasets (Broadcast Content and Parallel Corpus) spanning 33,628 scenes. Fine-tuning and evaluation used a proprietary dataset of 97 Korean films (91 for training, 6 for evaluation denoted M1-M6). Three 1-2 minute clips were extracted from each evaluation film to form 18 evaluation clips, tested across three systems (Professional Human Translators, GPT-4o, and MADLAD-400-3B-MT) across a repeated 3-fold cross-validation. Evaluation metrics included CXMI, AV-CXMI, and 5-point MOS gathered from 20 bilingual evaluators.

## Results

Text-only CXMI produced a reversed average ranking where human translations scored lower than LLM and sLLM outputs in 4 out of 6 films, yielding a negative correlation with human MOS (r = -0.295, p < 0.05). In contrast, AV-CXMI correctly ranked human translations highest across all films, achieving a positive and statistically significant correlation with human MOS (r = 0.400, p < 0.003). 

In ANOVA testing across the three translation systems, AV-CXMI correctly identified the quality hierarchy (Human > LLM > sLLM) in 77.8% of samples (14/18) with a large system effect size (eta^2 = 0.519, p < 0.001). All pairwise differences were significant: Human vs. LLM (p < 0.001, Cohen's d = 1.78), LLM vs. sLLM (p < 0.05, d = 0.63), and Human vs. sLLM (p < 0.001, d = 2.26).

| System | Human MOS | Text-only CXMI | AV-CXMI |
|---|---|---|---|
| Human Translator | 4.82 (est) | 1.202 | 0.399 |
| GPT-4o (LLM) | 4.10 (est) | 1.382 | -0.148 |
| MADLAD-400-3B (sLLM) | 3.50 (est) | 1.363 | -0.247 |

## Limitations

The evaluation scope is restricted to a single language pair (Korean-English) and a modest sample size of 54 evaluation clips. The AV-tag extraction relies heavily on closed, cloud-hosted proprietary API services (GPT-4o), limiting fully reproducible on-premise execution. Furthermore, errors in upstream components like speaker diarization, optical character recognition/vision models, or dialog act classifiers can propagate noise into the conditional tag assignments.

## Why read this

Researchers and engineers building multimodal translation evaluation frameworks or context-aware MT models should read this to understand how information-theoretic metrics can be effectively anchored to audiovisual cues. It provides a blueprint for integrating scene segmentation and LLM-driven tag extraction to align automated metrics with human perceptual judgments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Evaluating context-aware machine translation, subtitling systems, and multimodal spoken language translation pipelines in the entertainment and localization industries.

## Institutions / 機構

Gwangju Institute of Science and Technology, AunionAI

**Funding / 經費:** Korea Ministry of SMEs and Startups, National Research Foundation of Korea, Korea Ministry of Trade, Industry & Energy, Ministry of Science and ICT, Korea, Gwangju Metropolitan City

## Related

- (link related pages by id as the wiki grows)
