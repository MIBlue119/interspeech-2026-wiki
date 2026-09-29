---
id: hacker26_interspeech
category: speaker
labels: [dataset-or-benchmark-release, robustness-noise]
institutions: ["Otto von Guericke University Magdeburg", "University Hospital Magdeburg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1188
pdf: https://www.isca-archive.org/interspeech_2026/hacker26_interspeech.pdf
---

# Common Cold Corpus: Health-Aware Robustness Study of Modern Speaker Embeddings Under Physiological Domain Shift

*Anabell Hacker, Ingo Siegert*

[PDF](https://www.isca-archive.org/interspeech_2026/hacker26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hacker26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1188)

**Category:** `speaker` · **Labels:** `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — The paper introduces the Common Cold Corpus to study how moderate upper respiratory tract infections affect speaker identification, showing that deep speaker embeddings experience measurable, directed displacement even when traditional acoustic features lose statistical significance.

## Key contributions

- Introduces the Common Cold Corpus, comprising 431 minutes of paired remote recordings from 85 German speakers across healthy and acutely ill (URTI) states.
- Performs acoustic phonetics analysis revealing downward trends in pitch and harmonics-to-noise ratio during illness, though most features fail Benjamini-Hochberg correction.
- Quantifies illness-related displacement in modern speaker embeddings (ECAPA-TDNN, TitaNet, ECAPA2, ReDimNet) via verification metrics and Z-shift.
- Demonstrates that while speaker verification remains robust (EER 1.51% to 3.10%), illness induces structural embedding shifts and a 6.38% identity-crossover rate for ECAPA-TDNN.

## Problem

Prior research on cold speech primarily evaluated severe cases under strict lab conditions (e.g., ComParE challenges) or examined embedding robustness solely against technical mismatches like noise, codecs, and far-field acoustics. Little is known about how naturally occurring, moderate physiological variation from acute illnesses impacts modern deep speaker embeddings in everyday recording scenarios. This gap matters because biometric systems and anonymisation pipelines assume speaker representations remain invariant to short-term biological perturbations of the vocal tract.

## Method

Data were collected remotely using SoSci Survey and personal recording devices in everyday environments, where participants completed paired sessions (healthy vs. acute URTI at least 7 days apart) reading 'North Wind and Sun' (NWS) and 'The Butter Story' (TBS). Feature extraction used openSMILE with the 88-functional eGeMAPS set plus modified F0 metrics (90 total parameters), while speaker embeddings were extracted using publicly available pretrained models (ECAPA-TDNN via SpeechBrain, TitaNet, ECAPA2, and ReDimNet) resampled to 16 kHz mono and truncated to a 15 s maximum duration.

Embeddings were L2-normalised and evaluated via text-controlled cosine similarity scoring in a closed gallery without centroid pooling to preserve session variability. Verification was tested on 188 genuine and 15,792 imposter trials per model, complemented by within-condition cross-text baselines, Z-shift metrics to measure standardized embedding displacement, and margin distributions to detect identity crossovers.

## Experimental setup

Evaluated on the Common Cold Corpus consisting of 431 minutes of speech (202 min healthy, 229 min ill) from 85 German speakers with a mean age of 36.2 years and moderate mean WURSS symptom severity of 3.25/7. Models compared include ECAPA-TDNN, TitaNet, ECAPA2, and ReDimNet. Metrics include ROC-AUC, Equal Error Rate (EER), Cohen's d, and Z-shift.

## Results

TitaNet achieved the lowest EER of 1.51% (AUC 0.9893, Cohen's d = 4.39), followed by ReDimNet at 1.84% (AUC 0.9897, Cohen's d = 5.23), ECAPA2 at 2.83% (AUC 0.9853), and ECAPA-TDNN at 3.10% (AUC 0.9859). Relative to healthy cross-text baselines, the ill condition increased EER by approximately 1 to 2 percentage points across models. TitaNet exhibited the largest absolute and relative embedding displacement (Z-shift = 8.826), whereas ReDimNet showed the smallest (Z-shift = 1.563). ECAPA-TDNN exhibited a 6.38% identity-crossover rate where ill embeddings fell closer to another speaker's healthy gallery embedding than their own.

| Model | EER (%) | AUC | Cohen's d | Z-shift |
|---|---|---|---|---|
| TitaNet | 1.51 | 0.9893 | 4.39 | 8.826 |
| ReDimNet | 1.84 | 0.9897 | 5.23 | 1.563 |
| ECAPA2 | 2.83 | 0.9853 | 3.94 | 1.177 |
| ECAPA-TDNN | 3.10 | 0.9859 | 3.98 | 1.289 |

## Limitations

The corpus size is relatively small compared to benchmark challenge datasets, and statistical power is limited by ecological variance and uncontrolled real-world confounders like device heterogeneity, microphone placement, and time of day. The binary illness labelling lacks granular separation of individual symptoms like cough versus hoarseness. Furthermore, findings are restricted to German speakers and may not generalize across diverse linguistic or acoustic environments.

## Why read this

Speech and ML engineers building speaker verification, forensic, or voice anonymisation systems should read this to understand that temporary biological perturbations cause structured failure modes in deep embeddings. Researchers will take away a new paired corpus framework and quantitative proof that neural representations capture high-dimensional physiological changes invisible to classical acoustic features.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Non-invasive digital health biomarkers for remote clinical monitoring, health-aware biometric normalization, and condition-adaptive fine-tuning of speaker recognition systems.

## Institutions / 機構

Otto von Guericke University Magdeburg, University Hospital Magdeburg

**Funding / 經費:** BMFTR, European Union

## Related

- [On the Robustness of Speaker Embeddings for Cross-Domain Speaker Retrieval](huang26m_interspeech.md) — same problem · relatedness 2.0/3
- [G-MaP-SE: Guided Speech Enhancement via GMM-Based Prior Matching](zhu26b_interspeech.md) — complementary · relatedness 2.0/3
- [Codec-induced Mismatch, Speech Duration, and Speaker-dependent Effect in a DNN-based Forensic Speaker Recognition System](deng26b_interspeech.md) — same problem · relatedness 1.9/3
- [Vowel Nasalization in Upper Airway Diseases: An Analysis Using the CUCO Database](wei26_interspeech.md) — shared data / evaluation · relatedness 1.9/3
- [ClinAware: Speech Enhancement Needs Clinical Awareness](kachare26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
