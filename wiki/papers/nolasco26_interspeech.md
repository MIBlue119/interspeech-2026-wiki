---
id: nolasco26_interspeech
category: audio-understanding
labels: [self-supervised]
institutions: ["Earth Species Project"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2759
pdf: https://www.isca-archive.org/interspeech_2026/nolasco26_interspeech.pdf
---

# Beyond task performance: Decoding bioacoustic embeddings with speech features

*Ines Nolasco, Jules Cauzinille, Marius Miron, Gagan Narula, Milad Alizadeh, Emmanuel Fernandez, Matthieu Geist, Ellen Gilsenan-McMahon, Olivier Pietquin, Emmanuel Chemla, Sara Keen*

[PDF](https://www.isca-archive.org/interspeech_2026/nolasco26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nolasco26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2759)

**Category:** `audio-understanding` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates what interpretable acoustic features (eGeMAPS) are encoded inside six pretrained bioacoustic and speech embedding models using linear and non-linear regression probes across six taxonomic groups, revealing a "no free lunch" pattern where loudness is easily recovered ($R^2=0.76$) but $F_0$ is poorly captured ($R^2=0.33$).

## Key contributions

- Proposed a regression probing framework (Emb2Feat) to evaluate feature recoverability from pretrained audio embeddings as an interpretability metric rather than relying solely on downstream task performance benchmarks.
- Benchmarked 6 pretrained audio/speech models across 88 eGeMAPS features and 34,054 audio samples spanning 6 bioacoustic and speech datasets, showing substantial cross-model variation and representational complementarity.
- Cross-referenced feature recoverability ($R^2$) with per-species feature salience using Normalized Mutual Information (NMI), providing principled, data-driven guidelines for model selection based on task-relevant acoustic properties.

## Problem

While pretrained embeddings have transformed computational bioacoustics by boosting transfer learning performance in data-scarce domains, their internal representations remain entirely opaque. Unlike handcrafted features (e.g., openSMILE/eGeMAPS), it is unknown which physical properties of sound are preserved or discarded inside embedding spaces, or whether different models learn redundant versus complementary representations. Prior benchmarking initiatives focus strictly on downstream classification accuracy, leaving researchers without principled, content-based guidelines for selecting models across diverse taxa (like ultrasonic bats, stridulating insects, and marine mammals).

## Method

The study utilizes the training split of the BEANS benchmark dataset comprising 34,054 audio clips across 6 domains: dogs (414), bats (5,987), bird species/CBI (14,206), marine mammals/MM (1,004), mosquitoes (5,407), and speech commands (7,036). From these, 88 global acoustic features are extracted using openSMILE v2.2 (eGeMAPS), categorized into 7 groups: F0 (10 features), Loudness (11), Harmonicity (10), Spectral Shape (17), Formants (18), MFCCs (16), and Temporal properties (6). Embeddings are extracted from the final layer of six prominent models (BEATS base, NatureLM, BirdMAE, BirdNET, EffNet all, and Perch) via the AVEX API and temporally pooled (averaged across time into a single vector per sample).

For probing, the authors employ two regression setups: (1) a linear ridge regression mapping embedding vectors to target feature values, and (2) a non-linear probe consisting of a shallow multilayer perceptron with a single hidden layer of 256 units, ReLU activation, dropout ($p=0.2$), and MSE loss optimized via Adam ($lr=0.001$, batch size 128, early stopping). Both embeddings and target features are Z-score normalized prior to training under 5-fold stratified cross-validation, evaluating performance via coefficient of determination ($R^2$). Additionally, pairwise cross-model predictability (Emb2Emb) is evaluated using ridge regression, and task feature salience is measured via Normalized Mutual Information (NMI) using a 3-nearest neighbor entropy estimator ($k=3$).

## Experimental setup

Evaluated on 6 datasets from the BEANS benchmark totaling 34,054 audio clips across dogs, bats, birds, marine mammals, mosquitoes, and speech. Compared 6 models: BEATS base (Transformer, SSL, general audio, 768-dim), NatureLM (Transformer, SSL+LLM, bio+speech+music, 768-dim), BirdMAE (Transformer, SSL, bio, 1280-dim), BirdNET (CNN, Supervised, bio/birds, 1024-dim), EffNet all (CNN, Supervised, bio+audio, 1280-dim), and Perch (CNN, Supervised, bio/birds, 1280-dim). Evaluation metrics are coefficient of determination ($R^2$) for feature recovery (Emb2Feat and Emb2Emb) and Normalized Mutual Information (NMI) for task feature salience.

## Results

Across all models, BirdMAE and BEATS base emerge as the strongest general encoders across feature categories, aligning with the hypothesis that self-supervised learning yields broader acoustic representation. Loudness- and spectral shape-related features are recovered best across models (reaching peak $R^2 = 0.76$), whereas fundamental frequency ($F_0$) is consistently the hardest to recover ($R^2 = 0.33$). Non-linear probes yielded only marginal improvements (maximum $R^2$ increase of $+0.08$), indicating that the entanglement within final-layer embeddings is not easily untangled by a shallow MLP.

In task-salience cross-referencing (NMI vs. $R^2$), salient features varied drastically by taxa: birds and dogs depend heavily on $F_0$, mosquitoes and bats on loudness, and marine mammals and speech commands on MFCCs. Notably, many task-relevant features (such as half of the top-10 salient features for speech commands) are entirely unrepresented by individual models. Furthermore, full model concatenation does not universally improve task-relevant feature recovery due to high-dimensionality overfitting.

| System / Condition | Loudness $R^2$ (Max) | Spectral Shape $R^2$ | $F_0$ $R^2$ (Min) | Overall Best Enc. |
|---|---|---|---|---|
| Linear Probe (BirdMAE) | High (~0.7) | Moderate | Low (~0.3) | SSL / Bio |
| Linear Probe (BEATS base) | High | Moderate | Low | SSL / Gen Audio |
| Linear Probe (BirdNET) | Moderate | Moderate | Low | Supervised |
| Concatenation (All Models) | Highest (+0.08 gain) | Highest | Low | Multi-Model |

## Limitations

The reliance on eGeMAPS features (optimized for human speech) may cause artificially low $R^2$ values for non-human bioacoustic signals due to poor feature extraction rather than poor model encoding. The systematically low $F_0$ recoverability may stem from unreliable traditional $F_0$ extraction algorithms rather than true absence in the embedding space. Temporal pooling over entire clips discards time-varying dynamics, and the study omits layer-wise analyses which could reveal hierarchical feature emergence.

## Why read this

Researchers and engineers designing bioacoustic pipelines or choosing pretrained audio models should read this to understand that standard embeddings capture complementary rather than redundant acoustic properties, offering a data-driven alternative to blind benchmark selection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Principled model selection for automated species classification, bioacoustic monitoring, acoustic conservation, and multi-taxa environmental audio analysis.

## Institutions / 機構

Earth Species Project

## Related

- [Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains](gonzalez26b_interspeech.md) — shared technique · relatedness 2.4/3
- [What Does a Pathological Speech Assessment Model Know about Acoustic Features? A Case Study on Oral and Oropharyngeal Cancer Patients](nguyen26h_interspeech.md) — shared technique · relatedness 2.2/3
- [Beyond Cross-Reconstruction: Probing-Based Disentanglement Evaluation for Acoustic Teleportation Codecs](grundhuber26_interspeech.md) — shared technique · relatedness 2.0/3
- [How Bilingual Are SSL Speech Models? Cross-Lingual Probing of Articulatory Encoding with Finnish and Russian EMA](pedro26_interspeech.md) — shared technique · relatedness 2.0/3
- [Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0](peng26c_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
