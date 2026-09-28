---
id: tabatabaee26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1633
pdf: https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.pdf
---

# Towards Language-Agnostic Speech Inversion

*Saba Tabatabaee, Mark Tiede, Suzanne Boyce, Liran Oren, Carol Espy-Wilson*

[PDF](https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1633)

**TL;DR** — This paper presents a multi-task speech inversion system that simultaneously estimates oral tract variables, source features, and velopharyngeal motion from audio, achieving strong cross-lingual generalization to unseen languages like French and Russian despite being trained exclusively on English data.

## Key contributions

- Collected and compiled a multi-lingual dataset combining co-recorded electromagnetic articulography (EMA), nasalance, and speech audio.
- Performed cross-lingual evaluations of a speech inversion system estimating oral tract variables and source features on untrained French and Russian speakers.
- Extended the evaluation framework to velopharyngeal (VP) tract variable estimation across multiple languages with differing nasalization structures.
- Outperformed previous English-only speech inversion baselines on standard benchmark datasets while enabling zero-shot cross-lingual transfer.

## Problem

Recovering articulatory dynamics like tongue, lip, and velum movements from speech acoustics is challenging due to acoustic interaction effects and many-to-one mapping issues. While speech inversion systems recover vocal tract variables (TVs) and source features effectively, prior work has been almost exclusively developed and evaluated on high-resource English datasets. Evaluating whether these learned articulatory synergies generalize cross-lingually is crucial for deploying speech inversion in low-resource settings and clinical applications without requiring expensive, specialized articulatory data collection equipment for every target language.

## Method

The architecture utilizes pre-trained WavLM-Large to extract frame-level speech representations from all 25 hidden layers, computing a learned weighted sum of layer embeddings. These representations pass through three Conformer layers to capture local and long-range temporal dependencies, followed by two fully connected projection layers (256 and 128 hidden units respectively) with GELU activations. Due to temporal resolution mismatches between WavLM embeddings (50 Hz) and target trajectories (100 Hz), a 2x upsampling layer with batch normalization is applied. Multi-task learning is implemented via separate output dense heads: one head predicts six oral tract variables (lip aperture, lip protrusion, tongue body/tip constriction location and degree), while a second head predicts three source features (periodicity, aperiodicity, fundamental frequency) or is modified to include velopharyngeal (VP) opening degree.

The model is trained using a composite loss function combining Pearson correlation (PC) and root mean square error (RMSE) with balancing weight alpha = 0.2, summing losses across all prediction tasks. Training is optimized using AdamW with an initial learning rate of 5e-4, weight decay of 1e-3, a batch size of 8, plateau-based learning rate scheduling, and early stopping patience of 8 epochs. Training data combines the University of Wisconsin X-Ray Microbeam (XRMB) dataset (36 English speakers, 268 minutes) and the YU dataset (12 English speakers, 193 minutes). Ground-truth nasalance for XRMB is retrofitted using a secondary speech inversion estimator to supervise VP tract variable learning.

## Experimental setup

Evaluated on the XRMB test set (5 English speakers, 38 minutes) and the YU dataset test splits comprising English (4 speakers, 75 minutes), French (4 speakers, 59 minutes), and Russian (3 speakers, 35 minutes). Performance is measured using Pearson product-moment correlation (PPMC) scores between estimated trajectories and ground-truth sensor or nasalance measurements. The system uses WavLM-Large embeddings, 3 Conformer layers, and is optimized via AdamW.

## Results

On the XRMB test set, the proposed system achieves an average PPMC score of 0.86 across all nine parameters, slightly outperforming the previous baseline of 0.85. On the in-domain YU English test set, it achieves an average PPMC of 0.85. When evaluated zero-shot on unseen languages, the model achieves average PPMC scores of 0.83 for French and 0.74 for Russian across oral tracts and source features. For velopharyngeal (VP) tract variable estimation evaluated against ground-truth nasalance, the model achieves PPMC scores of 0.92 on English, 0.89 on French, and 0.82 on Russian speakers.

| System / Condition | Language | Oral/SF Avg PPMC | VP (Nasalance) PPMC |
|---|---|---|---|
| SI Model in [8] | English (XRMB) | 0.85 | - |
| Proposed SI Model | English (XRMB) | 0.86 | - |
| Proposed SI Model | English (YU) | 0.85 | 0.92 |
| Proposed SI Model | French (YU) | 0.83 | 0.89 |
| Proposed SI Model | Russian (YU) | 0.74 | 0.82 |

## Limitations

The cross-lingual evaluation relies on a very small number of speakers for non-English languages (4 French speakers and 3 Russian speakers, with only 1 Russian speaker evaluated for nasalance). Performance on Russian source features dropped due to environmental recording noise in one speaker's session, indicating sensitivity to acoustic mismatches. The study is restricted to Indo-European languages and does not test tonality or extreme phonemic inventories.

## Why read this

Speech and ML researchers working on self-supervised speech representations, articulatory synthesis, or cross-lingual speech transfer will find this valuable for understanding how well acoustic-to-articulatory mappings generalize zero-shot across diverse phonetic systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-lingual speech therapy tools, silent speech interfaces, computer-assisted language learning (CALL), and clinical assessment of speech motor disorders.

## Related

- (link related pages by id as the wiki grows)
