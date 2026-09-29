---
id: kubo26_interspeech
category: asr
labels: [streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1672
pdf: https://www.isca-archive.org/interspeech_2026/kubo26_interspeech.pdf
---

# Building Tailored Speech Recognizers for Japanese Speaking Assessment

*Yotaro Kubo, Richard Sproat, Chihiro Taguchi, Llion Jones*

[PDF](https://www.isca-archive.org/interspeech_2026/kubo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kubo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1672)

**Category:** `asr` · **Labels:** `streaming-real-time`

**TL;DR** — This paper presents a streamable CTC-based Japanese phonemic recognizer tailored for speaking assessment that outputs accent markers, reducing mora-label error rates from 12.3% to 7.1% on the CSJ core evaluation sets via multitask learning and finite-state transducer lattice fusion.

## Key contributions

- A multitask learning framework for ASR that simultaneously estimates phonetic alphabets (PAs), text tokens (TTs), and 10-class fundamental frequency (fo) trajectories to leverage unaccented datasets like the CSJ noncore subset.
- A novel FST-based lattice fusion algorithm that combines CTC output lattices from direct PA estimation with pronunciation-converted TT lattices using a UniDic lexicon.
- A raw-waveform time-domain SpecAugment and speed perturbation recipe adapted for streamable CTC models.
- Empirical demonstration that generic multilingual models like Whisper and Multipa fail on speaking assessment tasks because their internal language models normalize away speaker errors and accent deviations.

## Problem

Standard ASR systems optimize for canonical text output and intentionally discard speaker errors, hesitations, and incorrect accent placements, which makes them unsuitable for language education and speaking proficiency assessment. Although universal multilingual phonetic transcribers exist, language-specific phenomena like Japanese pitch accent cannot be resolved without fine-grained phonetic transcriptions with accent markers. Such detailed training data is severely bottlenecked; the largest multi-speaker hand-annotated dataset, the Corpus of Spontaneous Japanese (CSJ) core subset, provides only 45 hours (23,683 utterances) of accent-annotated speech, which is less than 6% of the full CSJ training corpus. Prior explicit conditioning and joint estimation methods either fail to detect accent locations, rely entirely on external decoders, or struggle with data sparsity and phonetic irregularity.

## Method

The speech encoder is derived from the Mimi model (pretrained on 7 million hours of predominantly English multilingual data) with its quantization and down-sampling modules removed to support continuous embeddings. The downstream architecture uses a 24-layer, 8-head Llama-2 decoder-only transformer architecture adapted into a streamable, encoder-only Connectionist Temporal Classification (CTC) model with 512 embedding dimensions and a dropout of 0.2. The model uses three auxiliary CTC/classification heads: a PA head predicting 243 katakana-based tokens (including apostrophe accent markers and expanded long vowels), a TT head predicting 2,309 Unicode character tokens after NFKC normalization, and an fo classifier head that categorizes 10 discrete pitch trajectory classes (derived from 3 consecutive 20-ms windows evaluated for voicedness and log-fo slope across 10-ms Harvest frames).

For inference, the system builds confusion network lattices from the PA and TT CTC output layers, removing blanks via FST composition. The TT lattice is converted into a PA lattice via composition with an 873,647-entry UniDic pronunciation dictionary FST, weighted by the PA lattice probabilities, and then combined with the direct PA lattice via an FST union operator and optimized (pruned, epsilon-removed, determinized, and minimized). The final recognition output is extracted via the shortest path over this fused lattice.

Training utilizes the CSJ dataset augmented with 20% speed perturbation at 90% rate and 20% at 110% rate, alongside a raw-waveform time-domain SpecAugment (10 time masks up to 0.05T length, 2 frequency mel-masks up to 0.3F length). Task loss weights are set to 0.3 (PA), 0.6 (TT), and 0.1 (fo). Optimization uses a cosine scheduler for 40k steps with 1k linear warmup steps, a peak learning rate of 5e-4, and a batch size of 128, keeping the Mimi speech encoder weights frozen while training the transformer layers.

## Experimental setup

Evaluated on the Corpus of Spontaneous Japanese (CSJ) core evaluation sets (eval1, eval2, eval3) containing spontaneous multi-speaker spontaneous speech, and the JSUT corpus ('basic5000' read single-speaker subset) for out-of-domain probing. Compared against Whisper (whisper-1 with UniDic accent adapters) and Multipa. Metrics are mora-label error rate (MLER) with/without accent errors and character error rate (CER).

## Results

The full proposed method (MT+LF) reduces the average mora-label error rate (MLER) over CSJ core evaluation sets from 12.3% (PA-only baseline) down to 7.1%. Compared to generic models, Whisper achieves 16.5% to 24.3% MLER on CSJ core sets even with optimal oracle pronunciation selection, and Multipa achieves 16.2% to 19.8% MLER, illustrating that generic transcribers fail to recover fine-grained phonemic errors and accent variations.

Ablations on task combinations reveal that adding the text token (TT) task reduces eval1 MLER from 11.5% to 7.7% (and to 7.3% when utilizing the full CSJ noncore subset). While the fo task alone does not improve PA accuracy, combining fo with TT yields further regularization gains, demonstrating that prosodic tracking assists the text token branch. Substituting external TT lattice sources into lattice fusion further pushes performance, with TT-only lattices achieving an eval1 MLER of 3.1% and Whisper-derived lattices yielding an out-of-domain JSUT MLER of 2.1%.

| System | CSJ eval1 MLER (%) | CSJ eval2 MLER (%) | CSJ eval3 MLER (%) | JSUT MLER (%) |
|---|---|---|---|---|
| Whisper (oracle adapted) | 20.6 | 15.1 | 13.5 | 6.8 |
| Multipa (oracle adapted) | 17.2 | 19.8 | 18.3 | -- |
| PA-only | 7.2 | 7.6 | 7.9 | 6.6 |
| MT (Multitask) | 4.4 | 4.9 | 5.0 | 5.8 |
| MT + LF (Proposed) | 4.1 | 4.8 | 4.9 | 6.1 |
| MT + LF w/ TT-only lattices | 3.1 | 4.1 | 4.1 | 4.3 |

## Limitations

The approach relies heavily on the quality of the pronunciation dictionary (UniDic) for lattice conversion, which can introduce bottlenecks when encountering out-of-vocabulary words or proper nouns. Lattice fusion performance degrades on out-of-domain read speech (JSUT) when the internal TT recognition model produces high character error rates, necessitating external TT sources to recover accuracy. The evaluation is restricted to Japanese pitch accent phenomena and relies on CSJ data coverage, leaving multilingual scalability unverified.

## Why read this

Speech and ML researchers building education or proficiency-assessment tech will learn how to combine multitask CTC architectures with FST-based lattice fusion to overcome severe domain-specific data sparsity. It provides a blueprint for integrating prosodic (fo) and lexical auxiliary objectives into streamable transformer encoders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated language learning software, computer-assisted pronunciation training (CAPT), spoken language proficiency testing, and diagnostic speech pathology assessment.

## Institutions / 機構

Sakana AI

## Related

- (link related pages by id as the wiki grows)
