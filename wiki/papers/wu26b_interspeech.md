---
id: wu26b_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-538
pdf: https://www.isca-archive.org/interspeech_2026/wu26b_interspeech.pdf
---

# Towards Dys-XAI: Influence-Based Explanations for Dysarthria Severity Assessment

*Xiaoliang Wu, Qiyang Sun, Yupei Li, Erfan Loweimi, Jennifer Williams, Zhengjun Yue*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-538)

**TL;DR** — The paper introduces an instance-level, influence-based explainability framework for automatic dysarthria severity assessment that justifies predictions using supportive and competing training audio samples. Controlled deletion experiments validate that removing top influential samples drastically degrades accuracy (by up to 36.5 points), proving the framework's faithfulness.

## Key contributions

- Formulates dysarthria severity assessment explainability through instance-based training sample influence rather than abstract acoustic feature importance.
- Adapts gradient-based influence approximations across 30 training checkpoints to compute per-test-utterance influence vectors over the entire training set.
- Proposes class-level and model-level influence aggregation to reveal ordinal sensitivity decay and cross-severity support/opposition patterns.
- Validates explanation faithfulness via controlled deletion experiments (random, high-influence, and low-influence removal strategies).

## Problem

Current deep learning models for dysarthria severity assessment operate as black boxes, limiting clinical adoption because clinicians and patients require transparent, reviewable justifications for therapy planning. Prior explanation methods rely on post-hoc feature attributions—such as spectrogram saliency, SHAP heatmaps, or OpenSMILE descriptor rankings—which produce local, within-utterance importance scores that are difficult to translate into clinical perceptual constructs. Furthermore, these feature-importance techniques fail to expose the ordinal relational evidence inherent in severity grading (e.g., how an utterance compares to neighbouring severity levels along an impairment continuum).

## Method

The framework models dysarthria severity assessment as a 4-class ordinal classification task (typical, mild, moderate, severe) using a linear classifier built on top of a single fully connected layer over 80-dimensional filterbank features. To quantify instance-level influence, the method tracks gradient alignment across training trajectories by saving one checkpoint per epoch over 30 epochs, computing the cumulative inner product of gradients between each training sample and test sample.

At the class level, influence scores are averaged across test samples belonging to true severity label c to construct a 4x4 class-level influence matrix S, capturing how training samples from severity c' influence predictions at severity c. At the model level, ordinal sensitivity is evaluated by computing average influence as a function of ordinal distance d = |c - c'|, testing whether the model relies predominantly on nearby training instances rather than treating categories nominally.

## Experimental setup

Evaluated on the TORGO dataset containing 21 hours of recordings (7.3 hours of dysarthric speech from 8 speakers and 13.7 hours from 7 typical speakers, totaling 17,587 utterances). Employs stratified K-fold cross-validation with group-wise speaker splitting to preserve class proportions. The base linear classifier is trained for 40 epochs per fold using the AdamW optimizer with a learning rate of 3e-4 and a batch size of 32, compared against SHAP feature attribution baselines over 88 OpenSMILE acoustic descriptors.

## Results

Controlled deletion experiments validate the influence scores: removing the top 20% high-influence training samples causes severe performance drops, notably decreasing moderate severity accuracy from 36.8% to 0.3% (a delta of -36.5 points) and severe accuracy from 72.3% to 43.1% (-29.2 points). Conversely, removing the bottom 20% low-influence samples improves classification accuracy, raising moderate severity from 36.8% to 47.0% (+10.2 points) and severe severity from 72.3% to 81.1% (+8.8 points), indicating that low-influence removal successfully eliminates noisy or mislabeled data. Ordinal sensitivity analysis demonstrates that same-level support (d=0, mean 13,427) is 13x larger than adjacent-level support (d=1, mean 1,028), while distant levels exhibit negative, counteracting influence (d>=2).

| Condition / Strategy | Typical (Class 0) | Mild (Class 1) | Moderate (Class 2) | Severe (Class 3) |
|---|---|---|---|---|
| Baseline Accuracy (0% removal) | 93.7% | 5.5% | 36.8% | 72.3% |
| High Influence Removal (20%) | Degraded | 0.3% | 0.3% | 43.1% |
| Low Influence Removal (20%) | Improved | 17.6% | 47.0% | 81.1% |

## Limitations

Evaluated solely on a single English dysarthria dataset (TORGO) with a limited pool of 15 speakers, leaving multi-database generalization and broader language coverage untested. The framework relies on gradient checkpoints across training epochs, which adds computational overhead during the explanation generation phase. Additionally, qualitative inspection revealed that near-silent segments from severe speakers spuriously emerged as highly influential training examples, highlighting sensitivity to dataset artifacts.

## Why read this

Speech researchers and clinical ML engineers should read this paper to learn how to replace opaque feature-attribution heatmaps with auditable, instance-based audio references that align directly with human perceptual verification.

## Code

- https://sites.google.com/view/infx-dys-samples

## Applications

Clinical decision support systems for automated speech therapy planning, longitudinal disease monitoring, and dataset auditing for dysarthric speech corpora.

## Related

- (link related pages by id as the wiki grows)
