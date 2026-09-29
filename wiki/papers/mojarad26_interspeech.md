---
id: mojarad26_interspeech
category: phonetics-linguistics
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-808
pdf: https://www.isca-archive.org/interspeech_2026/mojarad26_interspeech.pdf
---

# Layer-wise Probing of wav2vec 2.0 and Whisper for Consonant Cluster Reduction in African American English

*Hamid Mojarad, Kevin Tang*

[PDF](https://www.isca-archive.org/interspeech_2026/mojarad26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mojarad26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-808)

**Category:** `phonetics-linguistics` · **Labels:** `self-supervised`

**TL;DR** — This study conducts speaker-independent layer-wise probing of wav2vec2-base and Whisper-small to investigate how speech encoders represent consonant cluster reduction (CCR) in African American English (AAE). Results show that models encode CCR not as simple segmental deletion, but as structured gradient phonological variation, with reduced tokens retaining robust cues to underlying stop identities (peak restoration accuracy of 93-96%).

## Key contributions

- Carried out the first speaker-independent layer-wise probing study of speech encoders (wav2vec 2.0 and Whisper) on dialect-specific phonological variation (AAE consonant cluster reduction).
- Curated a balanced evaluation dataset of 6,760 tokens across 7 high-frequency cluster types sourced from the Corpus of Regional African American Language (CORAAL).
- Implemented a dual-probe methodology—segmental reduction detection and segmental restoration—coupled with a C1 coarticulatory gating analysis to disentangle phonetic cues.
- Demonstrated that reduced forms retain latent cues to dropped stops, proving models handle CCR as a continuous phonological gradient rather than binary absence.

## Problem

Modern automatic speech recognition (ASR) systems exhibit large performance disparities for African American English (AAE) speakers, with word error rates up to twice as high as those for Mainstream American English speakers. These disparities stem partly from biased training data and dialectal phonological phenomena like consonant cluster reduction (CCR), where final stops in clusters (e.g., test -> tes) are systematically omitted. Prior work has documented these surface errors, but the internal representations of speech encoders remain unexplored regarding whether they recognize CCR as structured linguistic variation or simple deletion.

## Method

The study utilizes two models with 12-layer Transformer encoders and 768 embedding dimensions: wav2vec2-base (pretrained on 960 hours of LibriSpeech via a contrastive self-supervised objective) and Whisper-small (pretrained on 680k hours of supervised multilingual/multitask audio-text data). Both models are kept completely frozen during the probing phase, ensuring that performance differences stem entirely from pretraining paradigms. Hidden states are extracted from all 12 transformer layers, and temporal boundaries of the target consonant clusters (C1C2) and initial consonants (C1) identified via Montreal Forced Aligner (v.2.2.17) are mean-pooled into fixed 768-dimensional token embeddings.

Two primary probing experiments employ simple multi-layer perceptrons (scikit-learn MLPs with a single hidden layer of 200 ReLU neurons and a logistic output neuron, trained with max_iter=1000 and random_state=42) using speaker-independent 4-fold cross-validation. Experiment 1 (Segmental Reduction Detection) trains layer-wise MLPs to distinguish reduced from canonical tokens across imbalanced, balanced, and per-cluster conditions. Experiment 2 (Segmental Restoration) uses /nt/ and /nd/ tokens sharing the same initial nasal C1 to test whether models can infer the underlying C2 stop (/t/ vs /d/) from reduced nasal-only inputs. A supplementary gating-style coarticulatory probe extracts C1 frames in 25%, 50%, 75%, and 100% increments to check for gradient coarticulatory cues.

## Experimental setup

Evaluated on the Corpus of Regional African American Language (CORAAL) subcorpora DCA, DCB, and DTA, featuring 156 speakers from Washington, DC and Detroit across four age groups and three socioeconomic classes. The curated dataset comprises 6,760 tokens (3,409 canonical, 3,351 reduced) across 7 cluster types (/ft/, /nd/, /nt/, /st/, /sk/, /pt/, /mp/), downsampled to a maximum of 400 tokens per word. Models compared are wav2vec2-base and Whisper-small using 12-layer frozen transformer representations evaluated via 4-fold speaker-independent cross-validation.

## Results

In the segmental reduction detection task (imbalanced condition), both models distinguish reduced and canonical tokens with accuracies consistently above chance, hovering between 70% and 80%. Wav2vec 2.0 exhibits an early accuracy peak around layer 5 and another rise near layer 9, whereas Whisper-small shows a rising-then-plateau trajectory across mid-to-high layers. Per-cluster analyses reveal that high-frequency alveolar clusters like /st/ achieve highest accuracy (79-81%), aligning with established sociolinguistic reduction hierarchies where /s/+stop creates the most favorable environment for deletion.

In the segmental restoration task (/nt/ vs /nd/), both models achieve strikingly high peak accuracies (93-95% for wav2vec2-base, 94-96% for Whisper-small) across reduced-only, canonical-only, and C1-only training configurations. These high accuracies prove that reduced realizations do not represent a clean-cut binary boundary, but rather form a continuum of gradience where reduced nasals retain strong latent cues to the underlying dropped stops. Whisper generally demonstrates greater stability and robustness under data scarcity, particularly for low-frequency cluster types.

| System / Condition | Layer Peak | Accuracy Range (%) |
|---|---|---|
| wav2vec2-base (Reduction Detection) | Layers 5 & 9 | 70.4% - 78.2% |
| Whisper-small (Reduction Detection) | Layers 8 - 10 | 71.2% - 79.2% |
| wav2vec2-base (Segmental Restoration) | Layer 9 | 91.2% - 95.3% |
| Whisper-small (Segmental Restoration) | Layer 9 - 10 | 92.1% - 96.0% |

## Limitations

The study is limited to evaluating only two specific model architectures (wav2vec 2.0 base and Whisper small), leaving open whether findings extend to larger model scales or alternative architectures like HuBERT, WavLM, or MMS. Certain cluster types (e.g., /mp/, /pt/) suffered from severe data scarcity due to low natural frequencies in CORAAL, producing high standard deviations in cross-validation. The scope was restricted to two-consonant clusters in short monomorphemic words, excluding three-consonant clusters and bimorphemic past-tense forms.

## Why read this

Speech researchers and ML engineers building bias-aware ASR or interpretability pipelines will learn how modern speech encoders internally represent dialectal phonological variation. The paper bridges quantitative probing with sociolinguistic theory to show that speech models encode dialectal reduction as gradient structures rather than categorical errors.

## Code

- https://doi.org/10.17605/OSF.IO/FE2D7

## Applications

Improving fairness and acoustic model robustness in automatic speech recognition (ASR) systems for non-Mainstream American English dialects.

## Institutions / 機構

Heinrich Heine University Dusseldorf, University of Florida

## Related

- (link related pages by id as the wiki grows)
