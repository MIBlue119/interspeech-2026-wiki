---
id: li26ia_interspeech
category: health-clinical
labels: [low-resource, generative-model]
institutions: ["UC Berkeley", "UCSF", "Zhejiang University", "Columbia University", "Basque Center on Cognition, Brain and Language"]
code: https://anonymous.4open.science/r/HASS-890D
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3080
pdf: https://www.isca-archive.org/interspeech_2026/li26ia_interspeech.pdf
---

# HASS: Hierarchical Simulation of Logopenic Aphasic Speech for Scalable PPA Detection

*Harrison Li, Kevin Wang, Cheol Jun Cho, Jiachen Lian, Rabab Rangwala, Chenxu Guo, Emma Yang, Lynn Kurteff, Zoe Ezzes, Willa Keegan-Rodewald, Jet Vonk, Siddarth Ramkrishnan, Giada Antonicelli, Zachary Miller, Marilu Gorno Tempini, Gopala Anumanchipalli*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ia_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ia_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3080)

**Category:** `health-clinical` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — The paper introduces Hierarchical Aphasic Speech Simulation (HASS), a clinician-guided framework that models multi-level lexical and phonological deficits in logopenic variant primary progressive aphasia (lvPPA) to generate synthetic training data. Classifiers trained on HASS-generated data outperform those trained strictly on limited real-world clinical recordings, achieving an AUC of 0.892 and improved cross-site generalization.

## Key contributions

- Proposes HASS, the first end-to-end clinician-guided simulation pipeline modeling a neurodegenerative aphasia as a holistic, multi-level structural disease rather than isolated dysfluencies.
- Releases a scalable, severity-controlled synthetic dataset comprising 4,773 clips (12.81 hours) capturing lexical retrieval and phoneme-level disruptions.
- Demonstrates that Wav2Vec 2.0 classifiers trained exclusively on HASS synthetic data outperform models trained on real clinical corpora in both 5-fold cross-validation and strict cross-site evaluations.

## Problem

Automated screening for primary progressive aphasia (PPA) is severely bottlenecked by data scarcity, as collecting clinical speech is constrained by vulnerable patient populations and expensive expert labeling. Public repositories like DementiaBank and AphasiaBank remain small in scale and institutional representation. Prior synthetic data approaches rely on injecting isolated dysfluencies (e.g., random pauses or word repetitions) or ungrounded LLM prompts, failing to capture the interacting content-level and phonological disruptions characteristic of neurodegenerative disorders like lvPPA. Without clinically grounded production mechanisms, diagnostic models struggle with cross-corpus robustness and generalization.

## Method

The HASS framework employs a two-layer generative pipeline supervised by speech-language pathologists (SLPs) using Gemini 3 to simulate lvPPA symptoms at different severity levels. First, a word-level lexical retrieval impairment layer takes non-pathological text (prompted from Quick Aphasia Battery connected-speech tasks) and introduces content-level disruptions such as circumlocutions, false starts, and filled pauses, biasing toward high lexical-demand loci (low-frequency content words and multisyllabic targets) while preserving syntactic boundaries. The output is converted into a word-aligned IPA representation keeping stress and word boundaries. Second, a phonological encoding disruption layer edits the IPA sequence by inserting inline markers for six error types organized in a clinical hierarchy: three primary markers ([PAU] for pauses, [SUB] for phoneme substitutions, [DEL] for phoneme deletions) and three secondary markers ([REP] repetitions, [PRO] prolongations, [INS] insertions), with 80% or more of markers biased toward content words and severity-controlled density.

Marked IPA sequences are synthesized into audio using VITS. Pauses ([PAU]) are rendered by inserting silence, prolongations ([PRO]) by lengthening the target phoneme during inference, and other phonological markers upstream during IPA generation. Sentence audio is concatenated using a 50 ms crossfade. The final dataset includes 4,773 sentence-level clips (12.81 hours: 2,007 controls and 2,766 dysfluent across mild, moderate, and severe tiers). VCTK speakers (95 voices, 57% female, 42% male) provide the speaker identity, ensuring controls are synthesized via the identical pipeline without impairment injection to prevent synthesis artifacts from confounding the classifier.

## Experimental setup

The evaluation utilizes real patient recordings and controls from DementiaBank (Baycrest lvPPA corpus, Delaware controls, Hopkins PPA corpus) and AphasiaBank (Capilouto controls). Models fine-tune Wav2Vec 2.0 base using Low-Rank Adaptation (LoRA) applied exclusively to query and value projection layers (Q_proj, V_proj). Training recipes include 5-fold cross-validation with speaker-grouped splits and a strict cross-site evaluation protocol (training on Domain A [Baycrest/Delaware] and testing on Domain B [Hopkins/Capilouto], and vice versa). Metrics include AUC-ROC, macro F1, and recall for the dysfluent class.

## Results

The HASS-trained classifier achieves an AUC-ROC of 0.892 (±0.076) and an F1 score of 0.800 (±0.072), outperforming the baseline model trained on real-world clinical data (AUC 0.850 ± 0.122, F1 0.778 ± 0.165) while displaying tighter variance across folds. In strict cross-site evaluations, the HASS-trained model maintains robust generalization, outperforming real-data baselines on unseen institutional elicitation protocols and recording conditions.

| System | AUC | F1 | Recall (Dysfluent) |
|---|---|---|---|
| Real Data Baseline | 0.850 ± 0.122 | 0.778 ± 0.165 | 0.659 ± 0.238 |
| HASS (Ours) | 0.892 ± 0.076 | 0.800 ± 0.072 | 0.899 ± 0.066 |

## Limitations

HASS models phoneme-level dysfluencies as discrete, categorical edits, which may conflate perceptual labels with gradient production mechanisms like gestural dynamics or co-occurring apraxia of speech. Standard phoneme-to-speech architectures such as VITS are optimized for fluent speech and may struggle to accurately render severe phonological errors. Additionally, the dataset is restricted to English and models a single PPA variant (lvPPA), leaving broader neurological variability and other PPA variants (nonfluent/agrammatic and semantic) unaddressed.

## Why read this

Researchers building diagnostic speech models for low-resource clinical populations should read this paper to learn how to construct structured, clinically grounded data augmentation pipelines that bypass the data scarcity and site-overfitting bottlenecks of real-world medical corpora.

## Code

- https://anonymous.4open.science/r/HASS-890D

## Applications

Automated screening and longitudinal monitoring tools for primary progressive aphasia and related neurodegenerative language disorders.

## Institutions / 機構

UC Berkeley, UCSF, Zhejiang University, Columbia University, Basque Center on Cognition, Brain and Language

## Related

- (link related pages by id as the wiki grows)
