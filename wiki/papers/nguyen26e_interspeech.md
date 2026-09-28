---
id: nguyen26e_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1353
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26e_interspeech.pdf
---

# Fair Cognitive Impairment Detection Through Unlearning

*William Nguyen, Jiali Cheng, Hadi Amiri*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1353)

**TL;DR** — FMD is a multimodal and multilingual framework for detecting Mild Cognitive Impairment from speech, text, and images that uses cross-attention fusion and gradient-reversal unlearning to eliminate spurious demographic biases. It achieves an F1 score of 92.6 on TAUKADIAL and 60.1 on PREPARE while significantly closing performance gaps across sex and language subgroups.

## Key contributions

- Proposes a cross-modal attention fusion module using text as an anchor to align acoustic, linguistic, and visual features rather than relying on late concatenation.
- Integrates an auxiliary demographic classifier with gradient reversal to unlearn protected attributes (sex and language) from shared representations.
- Employs a curriculum schedule for the gradient reversal coefficient to stabilize early-stage representation learning.
- Demonstrates improved out-of-domain cross-dataset transferability between TAUKADIAL and PREPARE benchmarks.

## Problem

Speech-based screening for Mild Cognitive Impairment (MCI) offers scalable clinical utility, but real-world datasets are small, heterogeneous, and demographically imbalanced. Consequently, models learn spurious correlations tied to demographic factors like sex and language rather than true clinical markers, creating large performance gaps across patient subgroups. Prior methods like late concatenation and basic re-weighting fail to capture complex cross-modal cues while ensuring subgroup fairness, risking biased and unreliable clinical deployment.

## Method

FMD encodes speech ($x_S$), text ($x_T$), and images ($x_I$) using unimodal encoders: Whisper, multilingual BERT, and SigLIP, respectively. Instead of late concatenation, it applies cross-attention with text as the alignment anchor, using speech or image representations as queries ($Q$) and text as keys ($K$) and values ($V$) to dynamically model fine-grained interactions. The resulting joint representation is optimized via standard cross-entropy loss for MCI classification alongside an adversarial unlearning module.

The unlearning module utilizes an auxiliary demographic classifier ($f_{\text{Demo}}$) tasked with predicting protected attributes from the shared representation. During backpropagation, a gradient reversal (GR) layer scales and inverts gradients using a coefficient $\lambda$, forcing the encoder to discard demographic shortcuts while retaining disease-relevant features. To prevent training instability caused by the adversary early on, $\lambda$ follows a curriculum schedule starting at 0 and progressively increasing toward 1 based on the ratio of completed training steps controlled by a hyperparameter $\gamma$.

Inference relies on the jointly fused representations fed into a feed-forward network classifier to output the final diagnostic prediction without requiring demographic labels at test time.

## Experimental setup

Evaluated on TAUKADIAL (387 samples, 3 modalities: speech, text, image) and PREPARE (1,644 samples, 2 modalities: speech, text). Uses stratified 10-fold cross-validation, reporting average F1, worst-group (WG) F1, and average performance gaps across sex and language subgroups. Compared against Whisper, AST, XLSR-53, XLS-R (0.3B), CogniVoice, DFR, and ATG baselines.

## Results

On TAUKADIAL, FMD^Lang achieves a headline F1 score of 92.6 and a worst-group F1 of 90.9, outperforming the best baseline CogniVoice (84.1 F1, 81.3 WG F1) while lowering the demographic gap to 2.5. On PREPARE, FMD^Sex secures an overall F1 of 60.1 and a worst-group F1 of 56.5, beating Whisper (59.1 F1) and CogniVoice (49.6 F1). Ablation studies show that removing the cross-modal fusion drops overall F1 by 1.1-1.4 points and increases demographic gaps by up to 5.2 points, while removing unlearning drops overall F1 by up to 2.9 points. In zero-shot cross-dataset transfer (training on PREPARE and testing on TAUKADIAL), FMD variants outperform CogniVoice, raising average F1 from 39.8 to 45.5. Probing experiments reveal residual demographic leakage, as auxiliary probe accuracies remain above random guessing at ~62% for FMD.

| System | TAUKADIAL F1^Avg | TAUKADIAL WG | TAUKADIAL Gap^Avg | PREPARE F1^Avg | PREPARE WG | PREPARE Gap^Avg |
|---|---|---|---|---|---|---|
| Whisper | 81.3 | 72.2 | 5.3 | 59.1 | 54.7 | 3.9 |
| CogniVoice | 84.1 | 81.3 | 2.9 | 49.6 | 44.9 | 3.2 |
| DFR | 83.1 | 81.5 | 3.6 | 53.3 | 50.5 | 4.6 |
| FMD^w/o UL | 89.2 | 83.4 | 7.1 | 60.0 | 55.5 | 2.0 |
| FMD^Sex | 92.1 | 86.9 | 4.3 | 60.1 | 56.5 | 1.3 |
| FMD^Lang | 92.6 | 90.9 | 2.5 | 59.3 | 57.4 | 1.7 |

## Limitations

Probing results indicate that residual demographic information is not entirely eradicated from the shared representations, with demographic classifiers still performing above random chance (~62.3% accuracy). The evaluation is constrained to two specific benchmark datasets (TAUKADIAL and PREPARE) and restricted demographic attributes (sex and language), leaving out broader intersections with age, accent, or clinical severity scales.

## Why read this

Researchers and engineers building fairness-aware healthcare models or multimodal speech diagnostic tools should read this to see how gradient-reversal unlearning and cross-attention text-anchored fusion can effectively eliminate demographic shortcut learning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scalable, equitable AI-driven clinical screening tools for early detection of Mild Cognitive Impairment and dementia from spontaneous multimodal patient interactions.

## Related

- (link related pages by id as the wiki grows)
