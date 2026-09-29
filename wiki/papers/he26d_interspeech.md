---
id: he26d_interspeech
category: health-clinical
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1149
pdf: https://www.isca-archive.org/interspeech_2026/he26d_interspeech.pdf
---

# Disentangling Acoustic Cues in Alzheimer’s Pathology and Perception: The Roles of Language and Gender

*Liu He, Yuanchao Li, Yin-Long Liu, Rui Feng, Yiming Wang, Jiaxin Chen, Yizhe Wang, Jiahong Yuan*

[PDF](https://www.isca-archive.org/interspeech_2026/he26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1149)

**Category:** `health-clinical` · **Labels:** `multilingual`

**TL;DR** — This paper investigates whether acoustic biomarkers driving automated Alzheimer's disease (AD) detection align with cues salient to human listeners across Mandarin and Greek languages and genders, uncovering significant cross-population divergences and model failure modes. The study finds that pathological-perceptual alignment is significant for Mandarin and female speakers (Spearman's rho around 0.52-0.54) but collapses for Greek speakers and male speakers (where pathology models performed at chance level).

## Key contributions

- Performs a cross-population and cross-demographic audit contrasting automated AD pathology classification against human listener perception scores using SHAP and Generalized Linear Mixed-Effects Models (GLMER).
- Establishes a webMUSHRA perception experiment involving 16 naive cross-lingual listeners evaluating Mandarin and Greek speech samples.
- Reveals a critical diagnostic failure mode where male-specific and Greek-specific pathology models performed at chance level (AUCs of 0.52 and 0.60), exposing demographic vulnerabilities in clinical speech AI.
- Uncovers counter-intuitive perceptual heuristics used by humans—such as associating higher shimmer with lower AD probability and wider F0 standard deviation with higher AD probability—highlighting discrepancies between machine logic and human clinical intuition.

## Problem

Although acoustic biomarkers (temporal, prosodic, phonatory, and articulatory) are widely used for non-invasive Alzheimer's Disease detection, diagnostic models operate as opaque black boxes whose internal logic is rarely validated against human perceptual salience. Furthermore, pathological manifestations and human auditory perceptions vary substantially across languages and genders. Assuming a single, population-invariant alignment risks deploying clinical models that rely on cues imperceptible or misleading to human stakeholders, necessitating systematic demographic explainability auditing.

## Method

The study extracts 21 global acoustic features across four categories from 16 kHz mono audio clips using a standardized picture description task. Temporal and fluency features are derived via Silero VAD (threshold=0.5, min speech=250 ms, min silence=100 ms) and Whisper large-v3 transcripts, yielding speech portion, pause counts, pause durations, pause rates, and articulation rates. Prosodic features are extracted via Parselmouth/Praat using gender-specific pitch ranges (75-300 Hz male, 100-500 Hz female) to compute mean F0, F0 standard deviation, range, velocity, and absolute acceleration. Phonatory features include jitter, shimmer, and HNR, while articulatory features capture mean F1 and F2 via the Burg algorithm. The Perception Weighted Score (PWS) is computed as the mean binary listener response (1=AD, 0=HC) across 16 listeners. 

For machine learning tasks, the authors evaluate six algorithms and select Random Forest (RFClassifier and RFRegressor) for its robust performance, utilizing 5-fold cross-validation. Age and education are excluded from model inputs and used exclusively as covariates in subsequent statistical analyses. Global feature importance is extracted using SHAP values averaged across folds to compare automated decision drivers against human perception. To validate findings statistically, Generalized Linear Mixed-Effects Models (GLMER) are constructed to predict binary listener judgments using fixed effects for language, gender, and acoustic biomarkers, with speaker age and education as covariates and listener variability modeled as a random effect.

## Experimental setup

The study uses Greek speech data from the ADReSS-M challenge and Mandarin speech data from the NCMMSC2021 challenge, comprising 30 picture description utterances per language (15 AD / 15 HC) lasting 0 to 1 minute. The perception evaluation includes 16 native Mandarin university students (8 male, 8 female, mean age 23) acting as naive cross-lingual listeners. Models are evaluated via 5-fold cross-validation using AUC, F1-Score, and accuracy for classification, and Pearson's r, RMSE, and MAE for regression. Significance is assessed via permutation tests with 5,000 label permutations.

## Results

Mandarin models substantially outperformed Greek models in both pathology classification (AUC=0.83 vs 0.60) and perception regression (r=0.84 vs 0.54). A gender interaction showed that female-specific pathology models achieved an AUC of 0.79, whereas male-specific pathology models performed at chance level (AUC=0.52, not statistically significant via permutation test). However, perception regression models performed similarly well for both males (r=0.73) and females (r=0.74). 

Overall feature importance rankings between pathology and perception models showed a moderate positive correlation (Spearman's rho=0.55, p < 0.01). Subgroup analysis revealed that path-perception alignment held for Mandarin (rho=0.54) and females (rho=0.52), but vanished entirely for Greek (rho=0.10) and males (rho=0.06). GLMER interaction terms confirmed that perceptual strategies vary significantly by gender, with F0 standard deviation exhibiting a stronger effect for females (beta=0.581, p=0.013) and mean F2 reversing direction completely between genders (interaction beta=-1.411, p < 0.001).

| System / Condition | Pathology AUC | Perception Pearson's r |
|---|---|---|
| All Data | 0.70* | 0.72* |
| Mandarin (CN) | 0.83* | 0.84* |
| Greek (GK) | 0.60 (ns) | 0.54* |
| Male Speakers | 0.52 (ns) | 0.73* |
| Female Speakers | 0.79* | 0.74* |

## Limitations

The sample size is modest at 30 utterances per language, restricting subgroup-level findings to a hypothesis-generating scope. The listener panel consists exclusively of young, culturally homogeneous naive Mandarin speakers, omitting trained clinicians or native Greek listeners. Furthermore, the Greek corpus exhibits a significant age imbalance between AD and HC groups, which may confound prosodic feature attribution since classifiers operated without direct age inputs.

## Why read this

Researchers and engineers building clinical speech AI will learn why global model explainability can mask critical demographic failures and how population-specific XAI auditing uncovers unreliable model logic across languages and genders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of equitable, demographic-aware clinical speech screening tools and human-in-the-loop diagnostic decision support systems for Alzheimer's disease.

## Institutions / 機構

University of Science and Technology of China, University of Edinburgh

**Funding / 經費:** National Social Science Foundation of China, Super-computing Center of the University of Science and Technology of China

## Related

- (link related pages by id as the wiki grows)
