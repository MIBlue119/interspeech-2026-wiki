---
id: charlot26b_interspeech
category: paralinguistics-emotion
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2780
pdf: https://www.isca-archive.org/interspeech_2026/charlot26b_interspeech.pdf
---

# Context-aware child-directed speech detection from long-form recordings

*Théo Charlot, Tarek Kunze, Kaveri K. Sheth, Alejandrina Cristia, Marvin Lavechin*

[PDF](https://www.isca-archive.org/interspeech_2026/charlot26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/charlot26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2780)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates automatic child-directed speech (CDS) detection in long-form recordings by benchmarking self-supervised speech models and introducing context-aware fine-tuning, achieving a 13.8% absolute F1 gain using 10 seconds of conversational context.

## Key contributions

- Benchmarks six self-supervised learning models (W2V2, HuBERT, WavLM, and XLSR variants) alongside domain-specific models (W2V2-LL4300, BabyHuBERT) on a multilingual dataset of 22 hours across 182 children.
- Demonstrates that in-domain pre-training on child-centered audio recordings (BabyHuBERT) substantially outperforms models pre-trained exclusively on clean adult speech.
- Proves that incorporating 10 seconds of surrounding conversational context yields a 13.8% absolute F1-score improvement over utterance-only classification.
- Evaluates the system in a realistic end-to-end pipeline using VTC 2.0 automatic segmentation on held-out corpora, proving viability while surfacing error propagation bottlenecks.

## Problem

Prior approaches for distinguishing child-directed speech (CDS) from adult-directed speech (ADS) evaluate almost exclusively on English, process utterances in isolation by discarding surrounding conversational context, and lack robust open-source classifiers. Utterances are typically very short (averaging 1.5–1.7 seconds), denying isolated models adequate acoustic cues. This makes scaling day-long naturalistic developmental analyses infeasible without manual annotation.

## Method

The system frames addressee classification as a 3-class utterance-level prediction task (Key Child-Directed Speech [KCDS], Adult-Directed Speech [ADS], and Other) optimized via categorical cross-entropy loss. For context-aware fine-tuning, a target utterance of duration du is symmetrically expanded to a total duration x by pulling surrounding audio context on both sides (up to 30 seconds). The entire extended window passes through the speech encoder, but pooling and classification heads operate exclusively on frames corresponding to the original target utterance.

Models are instantiated using base configurations of Wav2Vec 2.0, HuBERT, and WavLM, with particular focus on in-domain models like BabyHuBERT (pretrained on 13,000 hours of multilingual child-centered audio). Fine-tuning freezes convolutional layers and updates only transformer layers. The setup uses a tri-stage learning rate schedule (warmup to 1e-5, constant, and linear decay to 5e-7), a batch size of 16 utterances, and 10 epochs. BabyHuBERT-addressee uses the optimal 10-second context window.

## Experimental setup

Evaluated on a compiled multilingual dataset of 22 hours across 182 children from 13 corpora (e.g., Lyon, Cougar, Bergelson, Png, Tsimane), with Tseltal and Winnipeg held out entirely for cross-corpus generalization. Compared against an unpublished lab rule-based baseline combining Voice Type Classifier 2.0 and temporal proximity rules. Metrics include utterance-level F1 (under human boundaries) and frame-level F1 (under VTC 2.0 automatic segmentation). Models are trained across 5 random seeds using an A100 GPU.

## Results

BabyHuBERT achieves the best in-domain pre-training result with a validation macro-average F1-score of 53.2%, outperforming W2V2-LL4300 (46.1%) and out-of-domain adult models like HuBERT (47.3%). Adding a 10-second context window boosts the F1-score by 13.8% absolute to 67.0%. On the held-out test set using human segmentation, the context-aware BabyHuBERT achieves F1-scores of 81.6% for KCDS, 78.9% for ADS, and 36.2% for Other, significantly beating the rule-based baseline (74.1% vs 35.1% average F1). 

When evaluated under fully automatic VTC 2.0 segmentation, performance drops sharply (average F1 of 38.6%), showing that segmentation errors propagate severely into the classifier. Performance also degrades on acoustically challenging or rare cultural contexts like the Tseltal corpus (58.3% F1) compared to Winnipeg (80.8% F1), and the 'Other' category uniformly performs poorly due to acoustic heterogeneity (pets, other children).

| System & Segmentation | KCDS F1 (%) | ADS / OHS F1 (%) | Macro Ave F1 (%) |
|---|---|---|---|
| Rule-based (Human seg) | 37.9 | 32.3 | 35.1 |
| BabyHuBERT-addressee (Human seg) | 64.1 | 84.1 | 74.1 |
| Rule-based (VTC 2.0 seg) | 36.3 | 14.9 | 25.6 |
| BabyHuBERT-addressee (VTC 2.0 seg) | 43.4 | 33.8 | 38.6 |

## Limitations

The evaluation relies on a relatively modest aggregate duration of 22 hours spanning 182 children, which may not capture full global acoustic diversity. Passing 30-second concatenated windows through the transformer significantly increases compute costs (training time triples from 22 minutes to over 2 hours). Automatic pipeline execution suffers from severe error propagation when upstream voice-type segmentation fails in noisy environments.

## Why read this

Speech researchers and engineers building tools for developmental psychology or longitudinal audio mining will find this a definitive blueprint for leveraging self-supervised models and conversational context for addressee classification. It provides a pragmatic open-source baseline and highlights the severe bottlenecks of VTC error propagation in realistic day-long pipelines.

## Code

- https://github.com/LAAC-LSCP/addressee

## Applications

Automated child language environment analysis, day-long audio diary mining for developmental psychology, and cross-cultural quantification of infant-directed speech input.

## Institutions / 機構

École Normale Supérieure, École des Hautes Études en Sciences Sociales, Centre National de la Recherche Scientifique, Université PSL, Aix-Marseille University

**Funding / 經費:** Agence Nationale pour la Recherche, European Research Council, Simons Foundation

## Related

- (link related pages by id as the wiki grows)
