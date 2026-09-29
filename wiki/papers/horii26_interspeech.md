---
id: horii26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3104
pdf: https://www.isca-archive.org/interspeech_2026/horii26_interspeech.pdf
---

# How does children's pronunciation develop? Capturing syllabic change with children's growth using unsupervised syllable discovery

*Koharu Horii, Naohiro Tawara, Atsunori Ogawa, Shoko Araki*

[PDF](https://www.isca-archive.org/interspeech_2026/horii26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/horii26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3104)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper proposes a bottom-up framework using unsupervised syllable discovery (Sylber) to analyze pronunciation development across 957 children aged 5–15, revealing an initial acoustic expansion phase (ages 5–8) followed by stabilization toward adult-like speech. It avoids the bias of top-down ASR systems that forcibly map child speech to adult phoneme categories.

## Key contributions

- Extends unsupervised syllable discovery (Sylber) to large-scale child speech analysis, bypassing rigid top-down adult phoneme inventories.
- Introduces and evaluates an adult-trained versus child-adapted Sylber model (fine-tuned on 315 hours of MyST spontaneous child speech), demonstrating improved boundary agreement and cluster purity for child speech.
- Quantifies developmental trends across three metrics: speaking style (MFA boundary agreement), pronunciation repertoire (active cluster counts showing an inverted U-shape), and pronunciation stability (cluster purity monotonically increasing with age).
- Provides qualitative and t-SNE evidence that younger children's variable pronunciations gradually converge into consistent acoustic spaces by around age 12.

## Problem

Traditional developmental studies rely on speech-language pathologists performing manual auditory assessments, which are labor-intensive, costly, and lack large-scale reproducibility. Meanwhile, recent ASR-based analyses use top-down phoneme recognizers trained on adult label inventories, obscuring child-specific or intermediate pronunciations. This failure to capture non-canonical acoustic variations hinders both speech science research and robust child ASR development for educational ICT, social robots, and disorder screening.

## Method

The framework leverages Sylber, which builds on SD-HuBERT for self-supervised frame-level feature extraction, similarity-discontinuity boundary estimation, segment-level mean feature pooling, and hierarchical clustering (k-means to 16,384 clusters, then agglomerative clustering down to $M=1024$ syllable clusters). Two variants are utilized: an adult-trained model (LibriSpeech 960 hours) to measure proximity to adult speech, and a child-adapted model further fine-tuned on 315 hours of the MyST spontaneous child speech dataset (using Stage 1 of Sylber with a learning rate of $5 	imes 10^{-4}$ and early stopping patience of 10).

For inference, silence (0.9) and similarity (1.9) thresholds are adjusted to control noise-induced over-segmentation. Three core developmental metrics are computed: (1) speaking style via boundary Jaccard index and over-segmentation ratio relative to Montreal Forced Aligner (MFA) reference boundaries using a 50-ms tolerance; (2) pronunciation repertoire via the count of active clusters containing at least one segment per age group; and (3) pronunciation stability via cluster purity measuring consistency against target syllable labels derived from prompt text via g2p_en and rule-based syllabification.

## Experimental setup

Evaluated on the OGI Kids corpus containing read English speech from 957 children aged 5–15. The evaluation set was dynamically sampled (weighting utterances based on remaining speaker counts) to ensure a balanced distribution of 87 speakers per age group and balanced utterance content. Baselines compare an adult-trained Sylber model against the child-adapted Sylber model (adapted on 315 hours of MyST training data and validated on 40 hours). Metrics include Jaccard index, over-segmentation ratio, cluster purity, and syllable purity. Implementation relies on official Sylber/SD-HuBERT codebases, with MFA v3.0.0 for reference alignments filtered via interquartile range (IQR) log-likelihood criteria.

## Results

The child-adapted Sylber model achieves a higher Jaccard index (0.43 vs 0.39), lower over-segmentation (-0.19 vs -0.05), higher cluster purity (59.60% vs 58.66%), and higher syllable purity (79.91% vs 78.55%) compared to the adult-trained model. Analysis of active syllable clusters across age groups reveals an inverted U-shaped curve, peaking at ages 6–8 (990–1010 clusters) before gradually decreasing, signaling an active articulatory exploration phase followed by repertoire stabilization. Cluster purity increases monotonically with age for both models, converging to near-adult levels around age 12, where children's acoustic representations show minimal within-syllable dispersion in t-SNE visualizations.

| Model | Jaccard Index | Over-segmentation | Cluster Purity (%) | Syllable Purity (%) |
|---|---|---|---|---|
| Adult trained | 0.39 | -0.05 | 58.66 | 78.55 |
| Child adapted | 0.43 | -0.19 | 59.60 | 79.91 |

## Limitations

The study relies heavily on read speech data (OGI Kids corpus), which may not fully represent spontaneous child interactions despite adaptation on the MyST corpus. The top-down reference boundaries from MFA use an adult acoustic model and dictionary, which can introduce alignment errors or bias when forced onto highly variable child utterances. Language coverage is restricted to English, and further work is required to establish whether these developmental trajectories generalize to tonal or morphologically different languages.

## Why read this

Speech and ML researchers studying child speech or zero-resource speech representation should read this to see how unsupervised bottom-up syllable discovery can rigorously quantify developmental milestones without adult phoneme bias.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated child speech recognition, educational ICT pronunciation training tools, and developmental speech disorder screening systems.

## Institutions / 機構

NTT

## Related

- (link related pages by id as the wiki grows)
