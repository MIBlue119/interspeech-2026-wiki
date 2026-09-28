---
id: jia26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1300
pdf: https://www.isca-archive.org/interspeech_2026/jia26_interspeech.pdf
---

# Augmenting Dysarthric Speech Severity Assessment with MOS Supervision

*Kaimeng Jia, Minzhu Tu, Zengrui Jin, Siyin Wang, Chao Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/jia26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jia26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1300)

**TL;DR** — This paper demonstrates that augmenting limited dysarthric speech training data with human-annotated Mean Opinion Score (MOS) labels from a speech synthesis evaluation corpus (QualiSpeech) significantly improves automatic assessment of dysarthric speech intelligibility and naturalness. Sequential fine-tuning achieves the strongest performance, yielding up to a 43.7% relative MSE reduction.

## Key contributions

- Conducted an empirical study of SSL-based automatic dysarthric speech assessment using spontaneous, unconstrained-vocabulary utterances from the Speech Accessibility Project (SAP).
- Proposed a cross-domain data augmentation strategy leveraging human-annotated MOS scores from the QualiSpeech corpus (synthetic and degraded speech) to alleviate clinical data scarcity.
- Evaluated two training paradigms—joint training (JT) and fine-tuning (FT)—demonstrating that sequential fine-tuning consistently outperforms joint optimization for out-of-domain perceptual transfer.
- Established that synthesis failures and dysarthric manifestations share acoustic and perceptual commonalities, enabling effective cross-domain knowledge transfer.

## Problem

Automatic assessment of dysarthric speech severity is critical for tracking neurological disease progression and guiding rehabilitation, yet training robust models is bottlenecked by the severe scarcity of clinically annotated, in-domain dysarthric speech. Prior methods rely heavily on labor-intensive evaluations by certified speech-language pathologists, are restricted to constrained lexicons, or require matched control groups with unnatural evaluation protocols. Although self-supervised learning and generative data augmentation have been explored, existing synthetic data lacks human perceptual validation and clinical severity labels. This work addresses the lack of perceptually aligned augmentation sources by tapping into speech synthesis evaluation corpora, which are richly annotated with human MOS scores.

## Method

The architecture adopts self-supervised learning (SSL) pre-trained encoders (wav2vec 2.0 Base/Large/Large+ and HuBERT Base/Large) as feature extractors over raw audio waveforms. Frame-level contextual representations from the SSL encoder are aggregated via temporal mean pooling into a fixed-dimensional utterance embedding. This embedding is fed into a regression head comprising a two-layer feed-forward network with ReLU activation and dropout regularization to output a continuous severity score, with all SSL encoder weights kept fully trainable during training.

Two training paradigms are explored: Fine-Tuning (FT) and Joint Training (JT). In the FT paradigm, the model is first trained on the QualiSpeech corpus (10,558 training utterances) to predict MOS dimensions (overall quality or naturalness) on a 1-5 scale, and the resulting weights subsequently initialize the model for fine-tuning on the SAP dysarthria corpus. In the JT paradigm, QualiSpeech and SAP training utterances are mixed at a 1:1 ratio using a linear transformation to map QualiSpeech MOS scores (1-5) to the SAP clinical severity scale (1-7), optimizing both datasets simultaneously under a unified MSE objective.

Models are optimized using the Adam optimizer with mean squared error (MSE) loss, a learning rate of 1e-5, and a weight decay of 0.01. For SAP, training subsets contain 5,046 utterances for intelligibility and 5,040 for naturalness (with 500-utterance validation sets and test sets of 716 and 714 utterances respectively, using a speaker-level split to ensure unseen test speakers).

## Experimental setup

Experiments use the Speech Accessibility Project (SAP) challenge corpus (over 400 hours, >190k utterances from 500+ speakers with Parkinson's, ALS, cerebral palsy, etc.) and the QualiSpeech corpus (10,558 training utterances combining synthetic speech from Blizzard/BVCC, simulated real speech from NISQA, and in-the-wild real speech). Baselines consist of in-domain training (IDT) using SAP data only without QualiSpeech augmentation. Evaluation metrics include Mean Squared Error (MSE), Linear Correlation Coefficient (LCC), and Spearman’s Rank Correlation Coefficient (SRCC).

## Results

For intelligibility prediction using wav2vec 2.0 Large+, fine-tuning (FT) with QualiSpeech Overall quality achieves a relative MSE reduction of 43.7% compared to in-domain training (IDT). For naturalness prediction, FT using QualiSpeech Naturalness achieves consistent gains across encoders, with wav2vec 2.0 Base and Large* yielding relative MSE reductions of 36.4% and 40.9%, respectively. 

Joint training (JT) improves naturalness prediction over IDT (e.g., reducing MSE by 19.4% for wav2vec 2.0 Base), but underperforms relative to FT on intelligibility due to semantic misalignment between synthesis MOS dimensions and clinical phonemic clarity, where joint optimization causes negative transfer and gradient interference.

| System / Condition | Auxiliary Data | MSE ↓ | LCC ↑ | SRCC ↑ |
|---|---|---|---|---|
| wav2vec 2.0 Base (IDT) | None | 0.348 | 0.628 | 0.482 |
| wav2vec 2.0 Base (FT) | QualiSpeech Overall | 0.272 | 0.751 | 0.427 |
| wav2vec 2.0 Base (JT) | QualiSpeech Overall | 0.408 | 0.590 | 0.446 |
| wav2vec 2.0 Base (FT) | QualiSpeech Naturalness | 0.303 | 0.648 | 0.464 |
| wav2vec 2.0 Base (JT) | QualiSpeech Naturalness | 0.433 | 0.602 | 0.475 |

## Limitations

The study is bounded by severe class imbalance in the SAP intelligibility dataset, which is heavily skewed toward minimal impairment (Level 1). The investigation is restricted to English-language corpora (QualiSpeech and SAP) and two core perceptual dimensions (Intelligibility and Naturalness), leaving multilingual scaling and multi-dimensional clinical profiling (e.g., harsh voice, inappropriate silences) for future work. Additionally, the approach relies on linear score mapping between disparate rating scales (1-5 MOS vs. 1-7 SAP severity), which may imperfectly capture non-linear perceptual relationships.

## Why read this

Speech and ML researchers working on pathological speech processing or low-resource speech assessment should read this paper to learn how to leverage out-of-domain Text-to-Speech evaluation corpora (MOS annotations) as effective supervision. It provides concrete guidance on when to prefer sequential fine-tuning over joint training to avoid negative transfer caused by label misalignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical speech monitoring tools, objective speech therapy evaluation systems, and pre-training data pipelines for dysarthric speech recognition and disordered speech reconstruction.

## Related

- (link related pages by id as the wiki grows)
