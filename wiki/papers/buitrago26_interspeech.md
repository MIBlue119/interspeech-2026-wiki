---
id: buitrago26_interspeech
category: paralinguistics-emotion
labels: [low-resource, multilingual, self-supervised]
institutions: ["Barcelona Supercomputing Center", "Universitat Politecnica de Catalunya"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2745
pdf: https://www.isca-archive.org/interspeech_2026/buitrago26_interspeech.pdf
---

# Quantifying Cross-Lingual Transfer in Paralinguistic Speech Tasks

*Pol Buitrago, Oriol Pareras, Federico Costa, Javier Hernando*

[PDF](https://www.isca-archive.org/interspeech_2026/buitrago26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/buitrago26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2745)

**Category:** `paralinguistics-emotion` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — The paper introduces the Cross-Lingual Transfer Matrix (CLTM) to systematically quantify how adding donor-language data impacts target-language performance during fine-tuning. Evaluating 44 languages on mHuBERT-147, the authors reveal that gender recognition is nearly language-agnostic (RFD of 0.16), whereas speaker verification exhibits severe, family-clustered language dependence (RFD of 2.97).

## Key contributions

- Proposes the Cross-Lingual Transfer Matrix (CLTM), a performance-grounded, row-normalized pairwise matrix measuring how donor-language data affects target downstream performance relative to target-only data.
- Establishes a dynamic training interval methodology ([N, 2N]) to isolate performance changes where models are neither undertrained nor saturated.
- Conducts a rigorously controlled 44-language study on two paralinguistic tasks (gender recognition and speaker verification) using a shared mHuBERT-147 backbone.
- Introduces aggregate diagnostics—Relative Frobenius Deviation (RFD), relative asymmetry, row cosine similarity, and intra-family positive transfer proportion—to characterize cross-lingual task topologies.

## Problem

While paralinguistic speech tasks rely on extralinguistic acoustic cues rather than lexical content, prior studies report unpredictable performance degradation under cross-lingual conditions, and existing methods focus only on isolated language pairs or single-source adaptation without performance normalization. This lack of a unified evaluation framework leaves it unclear when and why donor-language data helps or hurts target performance. Addressing this gap matters because multilingual fine-tuning is widely used for low-resource languages, but naive data pooling can induce negative transfer or interference.

## Method

The CLTM framework calculates self-gains and cross-gains within a predefined dynamic training interval [N, 2N] identified via preliminary learning curves (set to [60, 120] pairs for gender recognition and [1,000, 2,000] samples for speaker verification). For each target language i and donor language j, the matrix entry CLTM[i, j] normalizes the performance change of adding donor data against adding an equivalent amount of target data. All experiments utilize the mHuBERT-147 encoder pretrained on 147 languages, feeding continuous, non-quantized representations into a task-specific head (a single linear classifier for gender recognition, and a two-stage speaker identification head converted into an L2-normalized cosine similarity feature extractor for speaker verification).

Models are trained using AdamW with a constant learning rate of 1e-5, weight decay of 0, gradient clipping max norm 1.0, and fp16 mixed-precision for exactly one epoch to minimize optimization artifacts. Audio is resampled to 16 kHz and amplitude-normalized. Training data are strictly balanced across languages and speakers with language-disjoint speaker identities, and all results are averaged over 10 independent seeds with fixed initialization, shuffling, and batching to ensure statistical stability.

## Experimental setup

Evaluated on 44 languages from the Mozilla Common Voice corpus 22.0. Tasks include binary gender recognition (macro-F1 metric) and speaker verification (AUC metric with gender-controlled negative sample pairing). Implementation relies on the mHuBERT-147 model checkpoint across 10 random seeds on mixed-precision hardware.

## Results

Gender recognition demonstrates near-agnostic transfer behavior, yielding a Relative Frobenius Deviation (RFD) of 0.162, a high row cosine similarity of 0.990, and a positive transfer proportion (prop+) of 99.97%. In contrast, speaker verification shows strong language dependence with an RFD of 2.970, a row cosine similarity of 0.615, and a sparse positive transfer proportion of only 8.93%, where beneficial transfer is heavily concentrated within language families (41.68% intra-family+). Furthermore, exploratory geometry analysis reveals that larger Euclidean centroid distances between language-specific speaker embeddings correlate with worse negative transfer (e.g., German-Portuguese centroid distance of 2.06 yields CLTM entries of -2.02 / -0.32).

| Task | RFD | Asym_rel | prop+ (%) | reciprocity+ (%) | cos_rows | intra-family+ (%) |
|---|---|---|---|---|---|---|
| Gender Recognition | 0.162 | 0.175 | 99.97% | 99.93% | 0.990 | 4.98% |
| Speaker Verification | 2.970 | 1.084 | 8.93% | 1.69% | 0.615 | 41.68% |

## Limitations

The study is restricted to a single architectural backbone (mHuBERT-147) and only two paralinguistic tasks (gender recognition and speaker verification) evaluated across 44 languages. The compute scale is limited to single-epoch fine-tuning under strict sample-constrained regimes ([60, 2000] samples), leaving large-scale data scaling behaviors unverified. Additionally, high seed variability in speaker verification highlights potential optimization instability when measuring subtle cross-lingual interactions.

## Why read this

Speech researchers and practitioners designing multilingual fine-tuning pipelines should read this to understand when cross-lingual data pooling helps or harms paralinguistic models. They will take away the CLTM framework as a diagnostic tool to systematically audit cross-lingual interference before scaling up training data.

## Code

- https://github.com/Pol-Buitrago/cltm-framework

## Applications

Multilingual speech dataset curation, acoustic model fine-tuning strategy optimization, and cross-lingual transfer planning for low-resource paralinguistic tasks.

## Institutions / 機構

Barcelona Supercomputing Center, Universitat Politecnica de Catalunya

**Funding / 經費:** MICIU, AEI, NextGenerationEU, PRTR, Red.es, Ministerio para la Transformacion Digital y de la Funcion Publica

## Related

- (link related pages by id as the wiki grows)
