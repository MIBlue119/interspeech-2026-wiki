---
id: tabatabaee26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1633
pdf: https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.pdf
---

# Towards Language-Agnostic Speech Inversion

[PDF](https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1633)

**TL;DR** — A multi-task speech inversion system using WavLM-Large and Conformer layers is proposed to simultaneously estimate oral tract variables, source features, and velopharyngeal dynamics, achieving strong cross-lingual generalization with Pearson correlation scores of 0.83 on untrained French and 0.74 on Russian.

## Problem

Collecting direct articulatory data requires expensive and specialized equipment that is difficult to deploy in field settings and unsuitable for certain populations like children. While speech inversion (SI) systems can map acoustics to vocal tract variables (TVs), previous models have been predominantly developed and evaluated on English datasets, leaving their cross-lingual generalizability largely unexplored. Establishing whether models trained on a high-resource language can recover articulatory trajectories in unseen languages is crucial for universal phonetic analysis and clinical deployment.

## Method

The architecture utilizes pre-trained WavLM-Large to extract representations from all 25 hidden layers via a learned weighted sum, followed by 3 Conformer layers to capture local and long-range dependencies. These representations pass through two fully connected layers with GELU activation, an upsampling factor of two to match the 100 Hz target rate, and multi-task output heads. One dense head predicts 6 oral tract variables (lip aperture, lip protrusion, tongue body constriction location/degree, tongue tip constriction location/degree), while a second head predicts 3 source features (periodicity, aperiodicity, fundamental frequency) and a velopharyngeal (VP) tract variable. The model is trained using a combination of the XRMB (5.74 hours) and YU (7.17 hours) English datasets using an AdamW optimizer, a plateau-based learning rate scheduler, and a loss function combining Pearson correlation and RMSE.

## Results

Evaluated on the XRMB test set, the system achieves an average Pearson product-moment correlation (PPMC) of 0.86 across all nine articulatory parameters, slightly outperforming the 0.85 baseline from prior work. On the YU English test set, it achieves an average PPMC of 0.85. When tested zero-shot on unseen languages from the YU dataset, the model yields average PPMC scores of 0.83 for French and 0.74 for Russian. For velopharyngeal (VP) TV estimation compared against ground-truth nasalance, the model attains PPMC scores of 0.92 on English, 0.89 on French, and 0.82 on Russian.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, phoneticians, and clinical speech scientists can use this system for non-invasive articulatory tracking, cross-lingual phonetic analysis, and clinical assessment of speech disorders without requiring specialized electromagnetic articulography hardware.

## Limitations

Performance on Russian source features and pitch was slightly lower than on French, primarily attributed to noise in one specific speaker recording environment within the dataset.

## Related

- (link related pages by id as the wiki grows)
