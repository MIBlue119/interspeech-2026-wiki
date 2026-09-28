---
id: aheibam26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3462
pdf: https://www.isca-archive.org/interspeech_2026/aheibam26_interspeech.pdf
---

# From Rhythm Metrics to Latent Embeddings: Categorising English and Hindi Varieties in Northeast India

[PDF](https://www.isca-archive.org/interspeech_2026/aheibam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/aheibam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3462)

**TL;DR** — This study analyzes speech rhythm and latent embeddings across multiple Northeast Indian English and Hindi varieties, finding that while rhythm and self-supervised embeddings successfully separate Hindi from English, they exhibit substantial overlap among the different L1-influenced English varieties.

## Problem

Northeast India features a unique linguistic ecology where speakers from diverse first-language (L1) backgrounds widely use English and Hindi, raising questions about whether speech rhythm reflects distinct L1-driven varieties or cross-group convergence. Prior work has largely overlooked the rhythmic properties of these regional English varieties or how well computational speech representations can categorize them. Addressing this gap clarifies how contact and L1 transfer shape regional prosodic variation.

## Method

The authors collected a read-speech dataset from 70 adult speakers across seven groups (10 speakers each) comprising five Northeast Indian English varieties with different L1 bases (Angami, Assamese, Khasi, Meiteilon, Mizo) and two Hindi varieties (native and L2 Assamese). Manual phoneme-level segmentation in Praat extracted vocalic (V) and consonantal (C) intervals to compute eight standard temporal rhythm metrics (%V, DeltaV, DeltaC, VarCo-V, VarCo-C, nPVI-V, nPVI-C, rPVI-C). Analytical methods included linear mixed-effects (LME) models with speaker random intercepts, Hierarchical Agglomerative Clustering (HAC) using Ward's linkage, and a linear Support Vector Machine (SVM) classifier. Additionally, 2,048-dimensional utterance-level latent embeddings from a fine-tuned Voxlingua107-XLS-R-300M model were reduced via PCA and projected into a 2D space using Linear Discriminant Analysis (LDA).

## Results

LME models revealed significant language effects on %V (p < 0.001), DeltaV (p = 0.025), VarCo-V (p = 0.006), VarCo-C (p = 0.003), DeltaC (p < 0.001), and nPVI-V (p < 0.001), though post-hoc contrasts showed differences were mostly driven by Assamese and Meitei English pairs within a small overall range. HAC dendrograms cleanly separated Hindi varieties from the English group, but failed to cluster the English varieties by their respective L1 backgrounds. In SVM classification using z-scored rhythm features, native Hindi (HIN) and L2 Hindi (AHI) achieved the highest classification accuracies at 78.2% and 77.1% respectively, whereas Assamese (43.8%) and Meitei English (41.7%) performed well above the 14.3% chance level but cross-classified heavily. Feature importance analysis identified vowel duration variability (DeltaV) as the strongest rhythmic predictor, followed by VarCo-V and %V. Latent embeddings also showed a clear separation between Hindi and English classes while NE Indian English varieties overlapped.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, sociolinguists, and speech technology engineers working on accent adaptation, dialect identification, and L2 speech assessment in multilingual regions.

## Limitations

The analysis is constrained to read speech ('The North Wind and the Sun') rather than spontaneous dialogue, and the text elicitation differed between the English and Hindi groups.

## Related

- (link related pages by id as the wiki grows)
