---
id: tabatabaee26_interspeech
category: phonetics-linguistics
labels: [multilingual, self-supervised]
institutions: ["University of Maryland", "Yale University", "University of Cincinnati"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1633
pdf: https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.pdf
---

# Towards Language-Agnostic Speech Inversion

*Saba Tabatabaee, Mark Tiede, Suzanne Boyce, Liran Oren, Carol Espy-Wilson*

[PDF](https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tabatabaee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1633)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This paper presents a multi-task speech inversion system that maps raw audio to vocal tract variables, source features, and velopharyngeal motion using a pretrained WavLM-Large backbone, achieving strong cross-lingual generalizability on untrained French and Russian speakers despite being trained exclusively on English data.

## Key contributions

- Collected a multi-lingual dataset comprising co-recorded electromagnetic articulography (EMA), nasalance, and speech audio data.
- Performed cross-lingual evaluations of a speech inversion system estimating oral tract variables and source features on unseen languages.
- Extended the speech inversion evaluation framework to predict velopharyngeal tract variables (nasalance proxies) across languages.
- Compared proposed speech inversion multi-task performance against prior baselines on standard English articulatory benchmarks.

## Problem

Recovering articulatory timing and spatial patterns directly from speech acoustics (speech inversion) is challenging due to acoustic interaction effects and many-to-one mapping between vocal tract shapes and acoustic outputs. Prior speech inversion systems are almost exclusively developed and evaluated on English-language datasets, leaving their cross-linguistic generalizability largely unverified. Furthermore, collecting direct articulatory data requires expensive and specialized equipment like electromagnetic articulography or X-ray microbeam, making scalable data collection difficult, especially for under-resourced languages and vulnerable populations.

## Method

The architecture takes input speech signals and extracts representations from all 25 hidden layers of a pretrained WavLM-Large model, computing a weighted sum of layer-wise embeddings. This unified representation is passed through 3 Conformer layers to capture local and long-range temporal dependencies. The Conformer output feeds into a fully connected layer with 256 hidden units and a GELU activation, followed by a second fully connected layer with 128 hidden units. Because WavLM embeddings operate at 50 Hz while target articulatory outputs are sampled at 100 Hz, an upsampling block by a factor of two with batch normalization is applied.

Multi-task learning is implemented via separate output dense layers: one predicting six oral tract variables (lip aperture, lip protrusion, tongue body constriction location/degree, tongue tip constriction location/degree) and another predicting three source features (periodicity, aperiodicity, and fundamental frequency) or jointly predicting source features plus a velopharyngeal tract variable. Training uses the AdamW optimizer with an initial learning rate of 5e-4, weight decay of 1e-3, batch size of 8, a plateau-based learning rate scheduler (patience of 5 epochs), and early stopping (patience of 8 epochs). The loss function combines Pearson correlation and root mean square error with alpha set to 0.2.

The system is trained on a combination of the XRMB English dataset (36 speakers, 5.74 hours) and the YU English dataset (12 speakers, 3.21 hours), and evaluated zero-shot on French (4 speakers, 59 minutes) and Russian (3 speakers, 35 minutes) subsets.

## Experimental setup

Evaluated on the XRMB dataset (5.74 hours across 46 English speakers) and the YU dataset (7.17 hours across 27 speakers spanning English, French, and Russian). Baselines include the prior English speech inversion model from Tabatabaee et al. (2024/2026). Performance is measured using Pearson product-moment correlation (PPMC) scores between estimated trajectories and ground-truth sensor or nasalance measurements.

## Results

On the XRMB test set, the proposed model achieves an average PPMC score of 0.86 across all nine parameters (vs 0.85 for the baseline). On the YU English test set, it achieves an average PPMC of 0.85. When evaluated zero-shot on unseen languages, the model achieves average PPMC scores of 0.83 for French and 0.74 for Russian. For velopharyngeal (VP) tract variable estimation against ground-truth nasalance, the model achieves PPMC scores of 0.92 on English, 0.89 on French, and 0.82 on Russian. Performance drops slightly on Russian pitch/periodicity due to a noisier recording environment for one speaker.

| System | Language | LA | LP | TBCL | TBCD | TTCL | TTCD | Per | Aper | F0 | Avg All |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SI model [8] | English (XRMB) | 0.91 | 0.76 | 0.80 | 0.86 | 0.84 | 0.95 | 0.94 | 0.88 | 0.75 | 0.85 |
| Proposed SI | English (XRMB) | 0.93 | 0.76 | 0.78 | 0.87 | 0.82 | 0.95 | 0.95 | 0.90 | 0.79 | 0.86 |
| Proposed SI | English (YU) | 0.87 | 0.86 | 0.81 | 0.84 | 0.82 | 0.87 | 0.95 | 0.83 | 0.84 | 0.85 |
| Proposed SI | French (YU) | 0.88 | 0.87 | 0.80 | 0.83 | 0.78 | 0.84 | 0.95 | 0.80 | 0.76 | 0.83 |
| Proposed SI | Russian (YU) | 0.76 | 0.75 | 0.70 | 0.71 | 0.69 | 0.71 | 0.91 | 0.68 | 0.71 | 0.74 |

## Limitations

Evaluated on a limited number of speakers for non-English languages (4 French speakers, 3 Russian speakers, and only 1 Russian speaker for VP evaluation). The training data scale is relatively small (under 13 total hours across XRMB and YU). Acoustic variations such as background noise heavily degrade pitch and periodicity estimation accuracy on specific speakers.

## Why read this

Speech and ML researchers building cross-lingual or articulatory speech representations should read this to see how self-supervised speech models like WavLM capture universal human vocal tract dynamics transferable across languages without fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-lingual speech processing, computer-assisted pronunciation training, speech therapy, and clinical assessments of speech and swallowing disorders.

## Institutions / 機構

University of Maryland, Yale University, University of Cincinnati

## Related

- [Beyond Speaker Independence: Evaluating Cross-Lingual Acoustic-to-Articulatory Inversion Across Finnish and Russian](pandey26_interspeech.md) — same problem · relatedness 2.6/3
- [Acoustic-to-Articulatory Inversion of Clean Speech Using an MRI-Trained Model](azzouz26_interspeech.md) — same problem · relatedness 2.4/3
- [ArtBoost: Synthetic Articulatory Data Augmentation for Acoustic-to-Articulatory Inversion](kim26f_interspeech.md) — same problem · relatedness 2.3/3
- [How Bilingual Are SSL Speech Models? Cross-Lingual Probing of Articulatory Encoding with Finnish and Russian EMA](pedro26_interspeech.md) — same problem · relatedness 2.2/3
- [Multilingual Phonological Feature Recognition with Self-Supervised Speech Models](hernandez26b_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
