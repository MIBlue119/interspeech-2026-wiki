---
id: rautenberg26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1341
pdf: https://www.isca-archive.org/interspeech_2026/rautenberg26_interspeech.pdf
---

# Hierarchical Conditional Continuous Normalizing Flows for Creaky Voice Editing under Speaker Identity Preservation

*Frederik Rautenberg, Fritz Seebauer, Petra Wagner, Reinhold Haeb-Umbach*

[PDF](https://www.isca-archive.org/interspeech_2026/rautenberg26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rautenberg26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1341)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper proposes a hierarchical conditional continuous normalizing flow architecture that structurally disentangles high-level speaker attributes from low-level voice qualities to edit creaky voice without altering speaker identity. It achieves improved speaker similarity in subjective tests compared to flat baseline flows.

## Key contributions

- A hierarchical conditional continuous normalizing flow (CCNF) that decomposes speaker representation transformation into a multi-stage sequence governed by feature type.
- Integration of Domain Adversarial Training (DAT) with gradient reversal in the intermediate latent space to enforce invariance to high-level attributes like mean pitch and gender.
- A stage-wise conditioning scheme separating high-level speaker descriptors (mean pitch, gender) from low-level paralinguistic voice qualities (breathiness, roughness, creak).
- Comprehensive subjective evaluations by 11 voice quality experts showing significantly better preservation of speaker similarity (SMOS) during creak amplification.

## Problem

Standard generative voice editing models struggle with selective control because they learn natural inter-speaker correlations from training data—such as the strong negative correlation between a speaker's mean pitch and creak probability. When a model attempts to modify low-level perceptual voice qualities (PVQs) like creak, it inadvertently drags along correlated high-level traits like pitch and gender, severely damaging perceived speaker identity. While data augmentation strategies can artificially decorrelate specific feature pairs, they are rigid and task-specific rather than providing a general architectural solution.

## Method

The model utilizes a two-stage Conditional Continuous Normalizing Flow (CCNF) where the conditioning vector is partitioned into $\mathbf{a} = [\mathbf{a}_1, \mathbf{a}_2]$. The transformation is formulated as a sequence of two Ordinary Differential Equation (ODE) initial value problems connected at intermediate time step $t_m = 0.5$. The first stage maps the speaker representation $\mathbf{s} = \mathbf{z}(t_1)$ to an intermediate latent space $\mathbf{z}(t_m)$ conditioned on high-level attributes $\mathbf{a}_1$ (mean pitch $\bar{f}_0$ and gender). The second stage maps $\mathbf{z}(t_m)$ down to the base normal distribution $\mathbf{z}(t_0)$ conditioned on low-level voice qualities $\mathbf{a}_2$ (breathiness, roughness, creak).

To ensure the intermediate representation $\mathbf{z}(t_m)$ is truly invariant to high-level traits, Domain Adversarial Training (DAT) is applied using auxiliary predictors (a feed-through regression network for mean pitch with MSE loss and a classification network for binary gender with cross-entropy loss). Gradients from these predictors are reversed using a Gradient Reversal Layer (GRL) and propagated back to the first flow network $f_1(\cdot)$, forcing it to strip out high-level attribute information.

The YourTTS architecture serves as the speech synthesis backend, operating on extracted durations and text features. The networks use CCNF blocks with hidden dimensions of 128 for $f_1$ and 64 for $f_2$. The auxiliary predictors use a single hidden layer of dimension 64. Training optimizes the joint log-likelihood plus adversarial losses with regularization weights $\lambda_{\text{reg}} = \lambda_{\text{clf}} = 2$, a batch size of 200, and an initial learning rate of $10^{-4}$. Inference is performed by applying the forward flow path to standard speaker representations and re-sampling through the inverse path using modified target conditioning values $\tilde{\mathbf{a}}$.

## Experimental setup

Experiments are conducted on the LibriTTS-R dataset using YourTTS. Comparisons are made against three systems: base-flow (standard single-stage CCNF), base-extd. (base flow augmented with pitch conditioning and adversarial learning in the final space), and data-mod.-flow (training data modification via pitch-creak augmentation). Metrics include Equal Error Rate (EER) for speaker verification, absolute mean pitch deviation ($|\Delta \bar{f}_0|$), gender classification accuracy, Mean Opinion Score (MOS) for naturalness, Speaker Similarity MOS (SMOS), and perceived creak probability on a 0-100 scale rated by 11 trained voice quality experts.

## Results

The hierarchical flow achieves the most stable performance across manipulation strengths $\beta \in [-1.25, 1.25]$, exhibiting minimal mean pitch deviation and near-constant gender classification accuracy and low EER, whereas the base model suffers severe pitch drift and identity degradation. In subjective evaluations, both models successfully amplify perceived creak (increasing scores from ~27 to ~61-77), but the hierarchical model incurs a significantly lower drop in Speaker Similarity MOS (SMOS drops to 3.0 vs 1.6 for the base model under amplification, $p < 0.001$).

While the hierarchical model successfully preserves speaker identity better during strong modifications, neither model shows statistically significant improvements over the base model regarding naturalness (MOS) changes, and creak suppression differences were less salient due to lower baseline creak levels.

| Model | Condition | MOS $\uparrow$ | SMOS $\uparrow$ | Perceived Creak | Speaker Sim. Drop |
|---|---|---|---|---|---|
| base [5] | Unmanipulated | $3.1 \pm 1.0$ | $3.8 \pm 1.0$ | $27 \pm 28$ | — |
| base [5] | Amplified | $2.9 \pm 1.1$ | $1.6 \pm 0.8$ | $77 \pm 18$ | Severe |
| hierarch | Unmanipulated | $3.1 \pm 1.0$ | $4.1 \pm 0.8$ | $25 \pm 25$ | — |
| hierarch | Amplified | $2.9 \pm 1.1$ | $3.0 \pm 1.2$ | $61 \pm 23$ | Moderate |

## Limitations

The evaluation is restricted to a single paralinguistic voice quality (creak) and English data from LibriTTS-R, leaving multi-attribute interactions across diverse languages untested. The approach relies heavily on external estimators (CreaPy, pitch trackers, and auxiliary regressors) whose errors can propagate into the adversarial training loop. Furthermore, listening tests were limited to 11 expert annotators, and absolute creak suppression was difficult to measure conclusively due to floor effects in naturally non-creaky samples.

## Why read this

Read this if you work on fine-grained control or disentanglement in speech synthesis and want to see how to combine continuous normalizing flows with adversarial objectives to cleanly decouple correlated acoustic dimensions without manual data hacking.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training data augmentation for speech therapy educational tools, fine-grained expressive text-to-speech synthesis, and precise voice style editing.

## Institutions / 機構

Paderborn University, Bielefeld University

## Related

- (link related pages by id as the wiki grows)
