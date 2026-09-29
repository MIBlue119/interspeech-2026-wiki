---
id: martin26_interspeech
category: health-clinical
labels: [efficient-on-device]
institutions: ["Université de Lorraine", "CNRS", "Inria", "University of Mons", "Université de Bordeaux", "Bordeaux INP", "CHU Bordeaux"]
code: https://github.com/vincentpmartin/Interspeech2026.SOMVOICE.classification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-777
pdf: https://www.isca-archive.org/interspeech_2026/martin26_interspeech.pdf
---

# Acoustic Biomarkers of Sleep Deprivation on French Read Speech: Interpretable and Frugal Modeling of Sleep Deprivation and Its Symptoms

*Vincent P. Martin, Jean-Luc Rouas, Pierre Philip*

[PDF](https://www.isca-archive.org/interspeech_2026/martin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/martin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-777)

**Category:** `health-clinical` · **Labels:** `efficient-on-device`

**TL;DR** — This paper investigates sleep deprivation and related symptoms on French read speech using frugal acoustic features and simple classifiers, achieving up to 85.2% UAR on psychomotor vigilance test metrics while prioritizing interpretability and environmental sustainability.

## Key contributions

- Evaluates simple, interpretable feature sets (eGeMAPS, Snack, and their fusion) and shallow classifiers (SVM, Random Forest, Gradient Boosting) for sleep deprivation and symptom detection.
- Performs feature importance analysis via SHAP values to link specific acoustic shifts (e.g., phonatory quality, formants) to clinical sleep metrics.
- Quantifies demographic biases, revealing significant age-sex interaction effects where misclassification rates diverge between older and younger men and women.
- Measures the exact energy consumption and carbon footprint (0.450 kWh, 8.55 g CO2eq) of training and evaluating the models.
- Constructs a symptom network and cross-task evaluation matrix to demonstrate whether classifiers learn specific clinical targets or broader overlapping constructs.

## Problem

Detecting sleepiness and fatigue in natural or at-home settings is critical for preventing workplace and driving accidents, yet most modern speech-health literature relies on opaque deep learning foundation models and massive parameter counts that require excessive compute. These complex models often obscure physiological mechanisms, lack analytical validation, and risk perpetuating algorithmic biases across age and sex groups. Furthermore, prior works frequently conflate distinct clinical constructs like sleep deprivation, physiological sleepiness, subjective sleepiness, and fatigue without verifying what their models actually generalize.

## Method

The study utilizes the SOMVOICE corpus, extracting 88 eGeMAPS features via OpenSMILE and 27 Snack features, plus an early fusion condition ('both'). Speech signals are segmented into minimum 24.3-second chunks using rVAD voice activity detection to ensure acoustic feature convergence without breaking prosody. Three shallow classifiers—Support Vector Classifier (SVC), Random Forest (RF), and HistGradientBoostingClassifier (GB)—are evaluated under a nested stratified group 10-fold cross-validation scheme to prevent data leakage by speaker ID.

Models are optimized for Unweighted Average Recall (UAR). SHAP values scaled with maxabs scale are computed to evaluate feature contributions across tree-based and kernel models. Demographic biases are probed by fitting a logistic regression on correctness labels against age, sex, and their interaction. Finally, a symptom network using L1-regularized pairwise correlations (via MGM and qgraph) and cross-task prediction matrices are generated to analyze generalization boundaries.

## Experimental setup

Evaluated on the SOMVOICE dataset containing 336 read-speech recordings (60.6s average duration) from 28 screened French participants (16 women) undergoing normal and total sleep deprivation protocols, yielding 818 speech segments. Tasks cover binary classification for sleep deprivation, MSLT (physiological sleepiness, threshold <=8 min), KSS (subjective sleepiness, >5), VAS-F (fatigue, >50 mm), PVT-Speed (<=3.51), and PVT-RTD (>53.8). Baselines compare Snack features, eGeMAPS features, and their early fusion across SVC, RF, and GB models implemented in scikit-learn 1.8.0. Codecarbon 3.2.2 tracks energy consumption on Grid'5000 hardware.

## Results

The best aggregated UAR ranges from 0.628 for KSS up to 0.852 for PVT-RTD (reaching 0.858 with feature fusion on PVT-Speed). Sleep deprivation is classified at 0.744 UAR with early feature fusion providing a statistically significant improvement (McNemar chi-square = 5.4, p = 0.02), while MSLT reaches 0.706, KSS reaches 0.662, and Fatigue reaches 0.681. Cross-task evaluation reveals that PVT-Speed and PVT-RTD classifiers are mutually interchangeable (UAR > 80% when cross-predicting), and fatigue models strongly confuse with KSS (achieving 0.691 UAR on KSS). Conversely, sleep deprivation, MSLT, and KSS classifiers maintain distinct specificity.

| Task | Best Features & Pipeline | UAR | F1-macro |
|---|---|---|---|
| Sleep Deprivation | both + SVM | 0.744 | 0.743 |
| MSLT (Physiological) | both + RF | 0.706 | 0.701 |
| KSS (Subjective) | both + RF | 0.662 | 0.673 |
| Fatigue (VAS-F) | eGeMAPS + GB | 0.681 | 0.686 |
| PVT Speed | both + SVM | 0.858 | 0.858 |
| PVT RTD | eGeMAPS + SVM | 0.841 | 0.840 |

## Limitations

The study is restricted to a relatively small cohort of 28 French speakers reading a specific literary text, limiting direct generalizability to spontaneous speech, other languages, or larger populations. The corpus size constrains deep learning approaches, necessitating shallow models whose generalization bounds outside of read French prose remain unverified. Additionally, evaluation is limited to six binary thresholds, leaving multi-class or continuous regression dynamics underexplored.

## Why read this

Researchers and engineers building interpretable, low-resource, and environmentally sustainable speech biomarkers should read this to see how classical acoustic features and shallow models match deep learning performance while providing transparent SHAP-based physiological insights and rigorous bias audits.

## Code

- https://github.com/vincentpmartin/Interspeech2026.SOMVOICE.classification

## Applications

Automated monitoring of driver fatigue, workplace alertness tracking, and remote home-based health screening for sleep disorders via smartphone audio.

## Institutions / 機構

Université de Lorraine, CNRS, Inria, University of Mons, Université de Bordeaux, Bordeaux INP, CHU Bordeaux

**Funding / 經費:** Labex BRAIN, French National Research Agency

## Related

- (link related pages by id as the wiki grows)
