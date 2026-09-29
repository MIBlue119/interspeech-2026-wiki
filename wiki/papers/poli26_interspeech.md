---
id: poli26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, self-supervised, dataset-or-benchmark-release]
institutions: ["École Normale Supérieure", "École des Hautes Études en Sciences Sociales", "Centre National de la Recherche Scientifique", "Université PSL", "University of Toronto"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2791
pdf: https://www.isca-archive.org/interspeech_2026/poli26_interspeech.pdf
---

# DiscoPhon: Benchmarking the Unsupervised Discovery of Phoneme Inventories With Discrete Speech Units

*Maxime Poli, Manel Khentout, Angelo Ortiz Tandazo, Ewan Dunbar, Emmanuel Chemla, Emmanuel Dupoux*

[PDF](https://www.isca-archive.org/interspeech_2026/poli26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/poli26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2791)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — DiscoPhon is a new multilingual benchmark for evaluating unsupervised phoneme inventory discovery from discrete speech units across 12 languages using only 10 hours of unannotated target data. Baseline evaluations show that SpidR models outperform HuBERT, achieving a many-to-one phone error rate of 63.06% on dev languages and 61.67% on test languages after fine-tuning.

## Key contributions

- Introduces DiscoPhon, a benchmark covering 6 dev and 6 test typologically diverse languages with standardized 10h train, 2h dev, and 2h test splits.
- Formulates two evaluation tracks: many-to-one (256 discrete units mapped via most frequent categories) and one-to-one (strict bijection to target phoneme inventory size).
- Provides a comprehensive evaluation pipeline assessing unit quality (PNMI), phone recognition (PER), and segmentation accuracy (R-value, F1).
- Releases four strong, openly available multilingual baseline models using HuBERT and SpidR architectures trained on custom zero-leakage corpora (VP-20 and MMS-ulab-v2).

## Problem

Unsupervised language documentation requires automatically discovering a language's phoneme inventory from raw speech, but prior work evaluates self-supervised representations primarily through ABX discrimination on continuous embeddings rather than explicit discrete unit derivation. Existing methodologies rarely test generalization to low-resource, typologically diverse languages without leaking English or target languages during pretraining. This leaves a major gap in evaluating how well discrete pseudo-linguistic tokens capture true phonemic and allophonic categories under strict data limitations (10 hours).

## Method

DiscoPhon takes raw waveforms and maps them to discrete units through pre-trained self-supervised models (HuBERT with K-means clustering or SpidR via prediction heads). In the many-to-one track, models use 256 units mapped to gold phonemes using arg max joint probabilities, prioritizing phonetic purity. In the one-to-one track, vocabulary size equals the target phoneme count plus silence, and mapping is solved via the linear assignment (Hungarian) algorithm on empirical joint distributions using SciPy to enforce a strict bijection.

The benchmark evaluates models under zero-shot conditions (using pretraining weights directly) and fine-tuned conditions (continuing pretraining on the 10-hour target language split). HuBERT models require iterative K-means clustering (K=100 for iteration 1, K=500 for iteration 2) on selected intermediate layers chosen via continuous ABX on dev languages, while SpidR leverages its intrinsic prediction heads. SpidR models are trained on VP-20 (6k hours across 20 languages) or MMS-ulab-v2 (8k hours across 3,966 languages), strictly omitting all benchmark languages and close linguistic relatives to prevent data leakage.

## Experimental setup

Evaluates on 12 languages divided into 6 dev (German, Swahili, Tamil, Thai, Turkish, Ukrainian) and 6 test languages (Basque, English, French, Japanese, Mandarin Chinese, Wolof), utilizing 10 hours of training data per language plus 2-hour dev/test splits. Compares four primary baselines: HuBERT and SpidR, each paired with either VP-20 or MMS-ulab pretraining datasets. Metrics include Phone Error Rate (PER), R-value and F1 for segmentation with a ±20ms boundary tolerance, Pointwise Mutual Information (PNMI), and continuous ABX discriminability.

## Results

SpidR consistently outperforms HuBERT across all conditions; for instance, SpidR VP-20 achieves a many-to-one PER of 64.41% zero-shot and 63.06% fine-tuned on dev languages, compared to HuBERT VP-20's 118.26% zero-shot and 95.90% fine-tuned. Fine-tuning on 10 hours of target data predominantly reduces substitution errors (dropping average substitutions from 37% to 28%) but has negligible impact on insertion errors, which dominate the error distribution at roughly 69% for fine-tuned models. The one-to-one track proves drastically harder due to the bijection constraint, driving the best zero-shot SpidR VP-20 PER up to 113.57 on dev languages and 120.03 on test languages.

| System | Dev PER (%) | Dev R-value | Test PER (%) | Test R-value |
|---|---|---|---|---|
| HuBERT VP-20 (Zero-shot) | 118.26 | 19.63 | 127.02 | 9.39 |
| SpidR VP-20 (Zero-shot) | 64.41 | 58.75 | 64.48 | 56.04 |
| HuBERT VP-20 (Fine-tuned 10h) | 95.90 | 30.48 | 98.02 | 24.37 |
| SpidR VP-20 (Fine-tuned 10h) | 63.06 | 55.32 | 61.67 | 53.27 |

## Limitations

The benchmark relies on automatic forced alignments and canonical transcriptions that omit crucial fine-grained phonological distinctions such as lexical tones in Mandarin Chinese. The current language selection is restricted to pulmonic consonant systems, omitting non-pulmonic contrasts and click languages. Furthermore, performance heavily suffers from high insertion rates, indicating that current discrete units lack proper temporal frame-smoothing or boundary consistency.

## Why read this

Speech and ML researchers building spoken language models or unsupervised tokenizers should read this paper to understand how well current SSL features map to genuine phonemic inventories under strict low-resource constraints. It establishes a rigorous evaluation framework and standardized baselines that expose the limitations of token segmentation and vocabulary mapping.

## Code

- https://benchmarks.cognitive-ml.fr/discophon

## Applications

Unsupervised language documentation for endangered languages, zero-resource speech recognition, and downstream discrete speech modeling.

## Institutions / 機構

École Normale Supérieure, École des Hautes Études en Sciences Sociales, Centre National de la Recherche Scientifique, Université PSL, University of Toronto

**Funding / 經費:** Agence Nationale de la Recherche, Agence de l’Innovation de Défense, European Research Council

## Related

- (link related pages by id as the wiki grows)
