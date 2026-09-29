---
id: aheibam26_interspeech
category: phonetics-linguistics
labels: [multilingual, self-supervised]
institutions: ["Indian Institute of Technology Guwahati"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3462
pdf: https://www.isca-archive.org/interspeech_2026/aheibam26_interspeech.pdf
---

# From Rhythm Metrics to Latent Embeddings: Categorising English and Hindi Varieties in Northeast India

*John Aheibam, Joyshree Chakraborty, Priyankoo Sarmah, Rohit Sinha*

[PDF](https://www.isca-archive.org/interspeech_2026/aheibam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/aheibam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3462)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This paper investigates speech rhythm and latent acoustic embeddings across five Northeast Indian English varieties and two Hindi varieties, demonstrating that traditional rhythm metrics reveal high overlap among regional English accents while self-supervised representations capture finer acoustic and prosodic distinctions.

## Key contributions

- Constructed and analyzed a multi-lingual speech dataset comprising 70 speakers across five Northeast Indian English varieties (Angami, Assamese, Khasi, Meiteilon, Mizo) and two Hindi groups.
- Extracted eight temporal rhythm metrics (%V, Delta V, Delta C, VarCo-V, VarCo-C, nPVI-V, nPVI-C, rPVI-C) via manual phone-level Praat segmentation and evaluated them using Linear Mixed-Effects (LME) models, HAC, and Linear SVMs.
- Applied 2,048-dimensional latent embeddings from a fine-tuned Voxlingua107-xls-r-300m-wav2vec model, reduced via PCA and LDA, to classify L1/L2 Hindi and L2 English accents.
- Uncovered a strong positive correlation (r = 0.77, p < 0.001) between embedding PC1 and vocalic proportion (%V), bridging traditional rhythm metrics with self-supervised representations.

## Problem

Northeast India features a unique linguistic ecology where speakers from diverse L1 backgrounds (Tibeto-Burman, Austro-Asiatic, Indo-Aryan) use English and Hindi extensively, yet little is known about how speech rhythm differentiates these closely related L1-influenced varieties. Traditional speech rhythm studies have relied on discrete typologies or acoustic metrics (%V, Delta V, nPVI), which struggle to capture fine-grained accent variations in multilingual settings. Furthermore, prior work rarely bridges classical durational rhythm metrics with modern self-supervised latent embeddings for Indian languages, leaving it unclear whether acoustic representations reflect underlying L1 prosodic transfer or regional convergence.

## Method

The study utilized read speech of 'The North Wind and the Sun' from 70 adult speakers (10 speakers per group across 7 groups: 5 English L2 groups, 1 Assamese-accented Hindi L2 group, 1 native Hindi L1 group), augmented with baseline L1 English (ENG) data. Recordings were segmented manually into breath groups and phones in Praat, labeling intervals as vocalic (V) or consonantal (C) to compute eight standard rhythm metrics. LME models tested language as a fixed effect with speaker random intercepts (Metric ~ Language + (1 | Speaker)). Unsupervised Hierarchical Agglomerative Clustering (HAC) with Ward's linkage used z-standardized rhythm vectors, while a balanced Linear SVM (C=1.0, class-balanced) classified z-scored rhythm metrics across the seven varieties.

For the latent embedding approach, breath-group audio was passed through the Voxlingua107-xls-r-300m-wav2vec model to extract 2,048-dimensional representations. Due to sample size constraints, PCA reduced dimensionality to 42 (matching the smallest class size), followed by projection onto a 2D Linear Discriminant Analysis (LDA) space. Pearson correlations (with Bonferroni and FDR corrections) were computed between embedding principal components and rhythm metrics to evaluate how well self-supervised models capture temporal rhythmic structures.

## Experimental setup

The dataset contains 70 speakers reading identical passage texts (7 groups * 10 speakers). Baselines included Spanish, Japanese, and British English reference values from prior literature, alongside native English (ENG) data for embedding analysis. Evaluation metrics included LME Type II Wald chi-square tests, HAC dendrogram topology, Linear SVM classification accuracy with a row-normalized confusion matrix, and Pearson correlation coefficients between PCA embedding dimensions and rhythm metrics.

## Results

LME models revealed significant effects of language variety on %V (chi^2 = 22.03, p < 0.001), Delta V (chi^2 = 11.14, p = 0.025), VarCo-V (chi^2 = 14.54, p = 0.006), VarCo-C (chi^2 = 16.21, p = 0.003), Delta C (chi^2 = 25.25, p < 0.001), and nPVI-V (chi^2 = 22.88, p < 0.001), while nPVI-C and rPVI were non-significant. Linear SVM achieved highest accuracy on native/L2 Hindi varieties (HIN at 78.2%, AHI at 77.1%), whereas Northeast Indian English varieties exhibited substantial cross-classification (e.g., Assamese English at 43.8% and Meitei English at 41.7%, well above the 14.3% chance level), driven primarily by vowel-duration feature Delta V followed by VarCo-V and %V. In latent embedding analysis, PC1 strongly correlated with %V (r = 0.77, p < 0.001), while showing weaker negative correlations with Delta C (r = -0.41), rPVI (r = -0.35), and nPVI-V (r = -0.30).

The rhythm metrics failed to cleanly separate the five Northeast Indian English varieties by their specific L1 backgrounds in HAC clustering, indicating overlapping regional temporal structures.

| System / Condition | %V | Delta-V | nPVI-V | SVM Accuracy (%) |
|---|---|---|---|---|
| Angami English (NJM) | 37.4 | 55.4 | 60.6 | - |
| Assamese English (ASM) | 38.7 | 58.8 | 62.6 | 43.8 |
| Meitei English (MNI) | 39.1 | 51.2 | 53.6 | 41.7 |
| Assamese Hindi (AHI) | 51.6 | 65.6 | 48.8 | 77.1 |
| Native Hindi (HIN) | 52.0 | 61.6 | 51.6 | 78.2 |

## Limitations

The dataset is restricted to read speech of a single passage ('The North Wind and the Sun'), which limits generalizability to spontaneous, conversational speech. The sample size is relatively small (10 speakers per group, 70 speakers total), and embedding LDA required dimensionality reduction via PCA down to 42 dimensions to prevent overfitting. Furthermore, elicitation text differences between the English and Hindi reading passages confound direct rhythmic comparisons between language families.

## Why read this

Speech and ML researchers working on accented speech recognition, dialect identification, or cross-lingual prosody transfer should read this paper to understand the limitations of classical duration-based rhythm metrics on regional Indian Englishes and how self-supervised XLS-R embeddings capture complementary acoustic properties.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving accented automatic speech recognition (ASR) and dialect identification systems for low-resource multilingual regions like Northeast India.

## Institutions / 機構

Indian Institute of Technology Guwahati

## Related

- [Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0](peng26c_interspeech.md) — shared technique · relatedness 2.1/3
- [Speaker-Specific and Language-Dependent Temporal Organization in Bilingual Political Speech](hosseinikivanani26b_interspeech.md) — shared technique · relatedness 2.0/3
- [Scaling Self-Supervised Speech Models Uncovers Deep Linguistic Relationships: Evidence from the Pacific Cluster](kim26w_interspeech.md) — shared technique · relatedness 2.0/3
- [Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains](gonzalez26b_interspeech.md) — shared technique · relatedness 2.0/3
- [Prosodic ABX: A Language-Agnostic Method for Measuring Prosodic Contrast in Speech Representations](sun26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
