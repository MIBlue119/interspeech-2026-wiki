---
id: chowdhury26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3052
pdf: https://www.isca-archive.org/interspeech_2026/chowdhury26_interspeech.pdf
---

# Predicting Cognitive Load from Speech and Interaction Dynamics in Dyadic Conversations

[PDF](https://www.isca-archive.org/interspeech_2026/chowdhury26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chowdhury26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3052)

**TL;DR** — This paper investigates predicting continuous perceived cognitive load from speech and interaction dynamics in dyadic collaborative conversations using a two-head GRU regression model, achieving a dyad-level Concordance Correlation Coefficient (CCC) of up to 0.42 for temporal demand.

## Problem

Estimating cognitive load from speech has traditionally relied on controlled laboratory environments, discrete multi-class classification, and random train-test splits that risk data leakage and poor out-of-sample generalization. Furthermore, prior studies rarely examine multi-task remote collaboration settings or the specific contribution of conversational interaction and temporal dynamics. Addressing these gaps is crucial for reliable, real-time workload monitoring in remote and hybrid work environments.

## Method

The authors utilize the AVCAffe dataset containing 53 dyads performing nine collaborative tasks, extracting single-channel audio partitioned into 30-second non-overlapping windows and filtered via Silero VAD. They extract 88 static acoustic features using openSMILE's eGeMAPSv02 set, 88 temporally dynamic first-order difference features, and turn-taking interaction features like speaker switches and overlap fractions. A shared Gated Recurrent Unit (GRU) encoder processes paired participant sequences using mean pooling and a joint mean squared error loss across a two-head architecture. Evaluation is performed strictly via Leave-One-Dyad-Out cross-validation across 10 random seeds to ensure robust cross-dyad generalization.

## Results

Evaluated on the AVCAffe dataset using Concordance Correlation Coefficient (CCC), Pearson correlation (PCC), and RMSE, the baseline Random Forest and GRU models show that temporal and mental demand contain generalizable workload signals. For temporal demand, the GRU model achieves a dyad-level CCC of 0.42 and PCC of 0.46. Combining static acoustic and temporal features yields improvements across several dimensions, such as mental demand CCC reaching 0.32 and effort CCC reaching 0.34. Ablations indicate that conversational interaction features (such as turn-taking dynamics and speaker switch rates) capture distinct aspects of temporal demand, while participation imbalances reflect mental demand.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers designing real-time cognitive load monitors, remote collaboration software, and ecologically valid affective computing systems for distributed teams.

## Limitations

The dataset size is relatively small and limits the effectiveness of more complex attention-based sequence models, and physical demand or frustration dimensions yielded near-null predictive signals.

## Related

- (link related pages by id as the wiki grows)
