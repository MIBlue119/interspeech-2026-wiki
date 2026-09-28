---
id: turk26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-713
pdf: https://www.isca-archive.org/interspeech_2026/turk26_interspeech.pdf
---

# When “yeah” means “not quite”: Multimodal detection of backchannels expressing incomplete understanding

[PDF](https://www.isca-archive.org/interspeech_2026/turk26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/turk26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-713)

**TL;DR** — This paper investigates the multimodal detection of incongruent backchannels—where a listener signals agreement like "mhm" despite a lack of genuine understanding—achieving an average precision of 0.73 using acoustic, kinematic, and discourse features.

## Problem

In conversational interactions, interlocutors frequently produce positive backchannels that mask incomplete or absent understanding to save face or manage cognitive load. Because these incongruent signals are not transparent to the speaker, they introduce severe ambiguity and risk conversational misalignment. Little is known about the observable formal properties that distinguish such false feedback from genuine understanding.

## Method

The study analyzes a dataset of 45 naturalistic German dyadic board game interactions (MUNDEX corpus) containing 1,435 backchannels labeled via a post-hoc video-recall task where participants commented moment-by-moment on their actual understanding. The authors train an XGBoost binary classifier using 88 acoustic features (eGeMAPS via openSMILE), 134 head-movement kinematic functionals (extracted via MediaPipe Face Mesh over 4-second windows), and discourse complexity/structure features. A 7-fold nested cross-validation pipeline with random search hyperparameter optimization is used, alongside SHAP (Shapley Additive exPlanations) analysis to interpret feature contributions.

## Results

The XGBoost model achieves an average precision of 0.73, ROC-AUC of 0.71, and an overall accuracy of 0.73 on a reserved 15% validation set (precision 0.70, recall 0.75 for incongruent class). SHAP analysis reveals that Mean Head Pitch angle is the most influential feature, with lower, more neutral head postures strongly predicting incongruence. Incongruent backchannels are characterized by reduced acoustic dynamism (e.g., lower pitch register, higher shimmer variability, lower equivalent sound level), smoother and more neutral head movements (lower absolute head roll and roll irregularity), and high discourse complexity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Researchers and engineers in conversational AI, dialogue systems, and computer-supported cooperative work can use these insights to detect listener misunderstanding, monitor cognitive load, and improve grounding in spoken human-computer interfaces.

## Limitations

Negative backchannels were excluded due to low frequency in the dataset, and the analysis was restricted to native German dyadic board game interactions.

## Related

- (link related pages by id as the wiki grows)
