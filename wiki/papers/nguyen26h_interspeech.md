---
id: nguyen26h_interspeech
category: health-clinical
labels: [self-supervised]
institutions: ["Avignon University", "Hopital Larrey", "Aix Marseille University", "CNRS", "Universite Toulouse II Jean Jaures"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3343
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26h_interspeech.pdf
---

# What Does a Pathological Speech Assessment Model Know about Acoustic Features? A Case Study on Oral and Oropharyngeal Cancer Patients

*Tuan Nguyen, Corinne Fredouille, Alain Ghio, Muriel Lalain, Virginie Woisard*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3343)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates the interpretability of a Wav2Vec 2.0-based speech intelligibility assessment model for oral and oropharyngeal cancer patients by measuring layer-wise alignment with eGeMAPS handcrafted features using Projection-Weighted Canonical Correlation Analysis (PWCCA). The final model representations correlate most strongly with spectral (0.77) and prosodic (0.71) features, while MFCC 1 yields the highest individual correlation across all layers.

## Key contributions

- Evaluates layer-wise alignment between deep self-supervised embeddings (Wav2Vec 2.0) and clinical acoustic features for pathological speech assessment.
- Proposes a clinically motivated reorganization of eGeMAPS low-level descriptors (LLDs) into Prosodic, Spectral, and Voice Quality categories.
- Derives a practical feature importance ranking, identifying highly-correlated features (e.g., MFCC 1, formant energy) versus poorly-correlated candidates (e.g., formant bandwidth, jitter, shimmer) for clinical speech modeling.
- Demonstrates that model representations in the final layer drop in feature correlation, indicating the capture of higher-level linguistic or glottal cues beyond standard handcrafted descriptors.

## Problem

Deep learning models achieve superior performance in pathological speech assessment compared to transparent handcrafted features, but their lack of interpretability hinders clinical adoption where explainability is mandatory. Prior studies lack consensus on baseline acoustic feature sets for speech disorders, leaving researchers caught between opaque deep architectures and unguided manual feature selection. This gap prevents clinicians from understanding the automated reasoning behind patient intelligibility scores and limits the clinical trustworthiness of deep learning systems.

## Method

The analysis uses the C2SI French corpus featuring oral and oropharyngeal cancer (OOC) patients and healthy controls. The speech assessment model is built upon a Wav2Vec 2.0 Large encoder pre-trained for ASR, followed by mean/std pooling and two 1024-dimensional linear layers before outputting an intelligibility score (achieving an MAE of 0.68). To analyze what the model learns, Projection-Weighted Canonical Correlation Analysis (PWCCA) is computed frame-by-frame (temporally aligned at 25ms using OpenSMILE) between the 25 eGeMAPS low-level descriptors (LLDs) and the hidden representations of each of the 24 transformer layers.

PWCCA extends SVCCA by computing a variance-weighted mean of correlations after SVD dimensionality reduction, eliminating manual thresholds. The 25 eGeMAPS LLDs are categorized into three clinical subsystems: Prosodic (pitch, loudness; 2 LLDs), Spectral (MFCC 1–4, formants 1–3 frequencies/bandwidths/energies, alpha ratio, Hammarberg index, spectral slopes; 18 LLDs), and Voice Quality (jitter, shimmer, HNR, H1-H2, H1-A3; 5 LLDs). Layer-wise individual tracking and final-layer group-level averaging identify which acoustic dimensions dominate early versus deep neural representations.

## Experimental setup

The study evaluates the C2SI corpus containing 87 patients and 40 control speakers (134 total recording sessions, restricted to read speech tasks rated on a 0-10 consensus intelligibility scale by 6 experts). The analysis leverages the pre-trained Wav2Vec 2.0 Large encoder model representations. Metrics are based on PWCCA correlation coefficients ranging from 0 to 1 across individual LLDs and clinical feature groups.

## Results

In the individual-level layer-wise analysis, MFCC 1 yields the highest and most stable PWCCA correlation across all 24 layers of Wav2Vec 2.0. Early layers show high correlation with MFCCs 1-4, whereas deeper layers shift importance toward formant energies, prosodic parameters, and harmonic-to-noise ratio (HNR), while frequency-related formant bandwidths, jitter, shimmer, and H1-H2 consistently show the lowest correlations. At the final output layer (Layer 24), the group-level correlations reach 0.77 for Spectral features and 0.71 for Prosodic features, whereas Voice Quality achieves 0.65 (lagging by 12 points), which accurately reflects the lack of laryngeal involvement in the OOC patient cohort where articulation and prosody are primarily impacted.

| Feature Group / LLD | PWCCA Correlation (Final Layer / Mean Rank) |
|---|---|
| Spectral Group | 0.77 |
| Prosodic Group | 0.71 |
| Voice Quality Group | 0.65 |
| MFCC 1 | Rank 1 (highest correlation across layers) |
| F3 Bandwidth | Lowest overall correlation |

## Limitations

The study is restricted to a single French corpus (C2SI) comprising oral and oropharyngeal cancer patients without laryngeal involvement, limiting generalizability to other speech disorders such as dysarthria or voice pathologies. The analysis is limited to linear relationships captured via PWCCA and uses only the eGeMAPS feature set rather than broader sets like ComParE. Furthermore, the work provides empirical interpretability and feature rankings but does not yet retrain or evaluate downstream models using the pruned/selected feature subsets.

## Why read this

Speech and ML researchers building interpretable clinical assessment tools should read this to understand how representations in self-supervised speech models align with clinical acoustic features. It provides an empirical roadmap for selecting or discarding specific low-level descriptors when designing transparent pathological speech diagnostics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical decision support systems for automated, interpretable assessment of speech intelligibility in post-operative cancer patients.

## Institutions / 機構

Avignon University, Hopital Larrey, Aix Marseille University, CNRS, Universite Toulouse II Jean Jaures

**Funding / 經費:** Chair LIAvignon, French National Research Agency, OLINPIC

## Related

- (link related pages by id as the wiki grows)
