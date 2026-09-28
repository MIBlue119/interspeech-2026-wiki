---
id: turk26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-713
pdf: https://www.isca-archive.org/interspeech_2026/turk26_interspeech.pdf
---

# When “yeah” means “not quite”: Multimodal detection of backchannels expressing incomplete understanding

*Olcay Türk, Stefan Lazarov, Yu Wang, Angela Grimminger, Hendrik Buschmeier, Petra Wagner*

[PDF](https://www.isca-archive.org/interspeech_2026/turk26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/turk26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-713)

**TL;DR** — This paper investigates "incongruent backchannels"—conversational feedback signals like "mhm" or nods that imply understanding when the addressee is actually confused—and trains a gradient-boosted tree classifier to separate them from congruent ones with an average precision of 0.73.

## Key contributions

- Introduces the task of detecting incongruent backchannels (false positive feedback masking lack of understanding) using multimodal data.
- Analyzes a curated subset of the MUNDEX corpus consisting of 45 naturalistic dyadic interactions (1,435 filtered backchannels) annotated via video-recall techniques.
- Extracts and combines 88 acoustic features (eGeMAPS), 134 head movement kinematics functionals (MediaPipe 3D face mesh), and discourse-structure complexity metrics.
- Performs extensive SHAP interpretability analysis, revealing that incongruent backchannels are characterized by reduced acoustic dynamism, neutral head postures, and specific discourse configurations.

## Problem

Conversational backchannels (e.g., "okay", "mhm", head nods) are critical for grounding and maintaining interaction flow, but they do not always transparently reflect an interlocutor's true cognitive state. Interlocutors often deploy positive feedback despite lacking genuine understanding—termed incongruent backchannels—to save face or manage cognitive load. Prior work largely treats backchannels as uniform signals of agreement, leaving the formal behavioral, acoustic, and kinematic properties of false understanding undetected and risking conversational misalignment.

## Method

The study analyzes 45 dyadic interactions from the MUNDEX corpus (German board game explanations, averaging 30 minutes each). Following the interaction, explainees (EEs) performed a video-recall task to self-annotate moment-by-moment levels of understanding (complete, partial, non-understanding), creating a subjective ground truth where timestamps were mapped to backchannels (675 congruent, 809 incongruent). Speech was transcribed via Whisper/WebMaus and 4,842 total backchannels were identified. Acoustic features (88-dim) were extracted using openSMILE with eGeMAPS v2.0. Head movements were captured within 4-second windows (±2s around backchannel onset) using MediaPipe Face Mesh, deriving 134 time-collapsed functionals (e.g., 3D head acceleration, pitch, roll angles, and angular acceleration) over low-level descriptors. Discourse features included topic duration, distance to past mention (DPM), and forward/backward-looking dialogue act densities.

A gradient-boosted decision tree classifier (XGBoost) was trained for binary classification. The preprocessing pipeline included log1p mapping and robust median-IQR scaling for duration-based discourse features, and robust scaling for others, alongside low-variance feature dropping (< 0.1). To address moderate class imbalance, an asymmetric class weight parameter (0.83) was applied. Hyperparameter optimization and feature preprocessing were strictly isolated inside a 7-fold inner cross-validation loop (randomized search over 70 configurations), evaluated via a 7-fold outer loop, and tested on an unseen 15% reserved validation set (216 samples). Model outputs were interpreted using SHAP (Shapley additive explanations) values to quantify feature contributions to log-odds.

## Experimental setup

Evaluated on 45 dyadic interactions from the MUNDEX corpus, yielding 1,435 filtered backchannel instances after exclusions. The model was validated using a 7-fold cross-validation setup and an unseen 15% hold-out validation set (98 congruent, 118 incongruent). Primary metrics include Average Precision (AP), ROC-AUC, Precision, Recall, F1-score, and Accuracy. The classifier is an XGBoost model optimized via randomized search on average precision.

## Results

The XGBoost classifier achieved an Average Precision of 0.73 (±0.04) and ROC-AUC of 0.71 (±0.04) in 7-fold cross-validation. On the unseen 15% validation set, the model yielded an overall accuracy of 0.73, with precision, recall, and F1-score of 0.69, 0.71, and 0.70 for congruent classes, and 0.76, 0.74, and 0.75 for incongruent classes respectively.

SHAP analysis revealed that Mean Head Pitch was the single most influential feature: lower, neutral pitch angles strongly signaled incongruent backchannels, whereas higher angles or strong nods reduced incongruence probability. Topic Duration and Distance to Past Mention (DPM) were the next most important predictors; short topics mentioned long ago and newly introduced long topics increased incongruence likelihood. Acoustic markers such as higher shimmer variability, higher sound levels, lower median F0, and variable falling slope suppressed incongruence, indicating that incongruent feedback involves lower acoustic and kinematic dynamism (reduced expressive effort).

| System / Condition | Precision (Incongruent) | Recall (Incongruent) | F1-score (Incongruent) | Accuracy |
|---|---|---|---|---|
| 7-Fold Cross-Validation (Mean) | 0.67 | 0.70 | 0.68 | 0.65 |
| Reserved Validation Set (15%) | 0.76 | 0.74 | 0.75 | 0.73 |

## Limitations

The study is restricted to 45 dyadic interactions in a single language (German) within a specific cooperative task domain (board game explanations), limiting immediate cross-lingual and cross-cultural generalization. Negative backchannels were too rare to include, restricting the scope strictly to positive backchannel forms. Furthermore, subjective video-recall annotations, while avoiding task disruption, carry inherent recall biases and granularity limits.

## Why read this

Speech and dialogue researchers seeking to move beyond surface-level turn-taking models should read this to understand how multimodal cues encode subtle cognitive misalignments. It offers a rigorous framework combining acoustics, head motion kinematics, and discourse context to detect when conversational feedback fails to match internal comprehension.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving conversational agents, spoken dialogue systems, and computer-supported collaborative learning environments by enabling real-time detection of user confusion masked by polite or automatic feedback.

## Related

- (link related pages by id as the wiki grows)
