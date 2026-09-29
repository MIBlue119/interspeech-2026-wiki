---
id: xie26_interspeech
category: deepfake-security
labels: [dataset-or-benchmark-release, robustness-noise]
institutions: ["Guangdong Provincial Key Laboratory of Ultra High Definition Immersive Media Technology", "Peking University", "Tencent AI Lab", "Shanghai Jiao Tong University"]
code: https://zeyuxie29.github.io/FakeSound2/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1157
pdf: https://www.isca-archive.org/interspeech_2026/xie26_interspeech.pdf
---

# FakeSound2: A Benchmark for Explainable, Traceable, and Generalizable Deepfake Sound Detection

*Zeyu Xie, Yaoyun Zhang, Xuenan Xu, Yongkang Yin, Chenxing Li, Mengyue Wu, Yuexian Zou*

[PDF](https://www.isca-archive.org/interspeech_2026/xie26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1157)

**Category:** `deepfake-security` · **Labels:** `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — FakeSound2 is a diagnostic benchmark designed to push deepfake sound detection beyond binary classification by evaluating models across temporal localization, source traceability, and out-of-domain generalization. Experiments reveal that state-of-the-art detectors achieve strong in-domain localization (95.10% accuracy) but collapse on unseen generation sources, with manipulation-type accuracy dropping from 93.10% to 32.35%.

## Key contributions

- Proposed FakeSound2, a systematically constructed benchmark containing 369,929 training samples and 5,553 test samples spanning 6 manipulation types and 12 distinct audio sources.
- Formulated a 4-stage automated creation pipeline using event localization grounding models, DeepSeek LLM for chain-of-thought metadata generation, diverse audio generation models, and CLAP-based quality filtering.
- Established a diagnostic evaluation framework that explicitly tests localization, method explainability (how), and source traceability (where), rather than clip-level binary classification alone.
- Uncovered fundamental failure modes of current detectors, demonstrating that they memorize generator-specific artifacts instead of learning manipulation-invariant features.

## Problem

Traditional deepfake sound detection (DSD) formulates the task purely as clip-level binary classification, determining only if an audio sample is real or fake. This binary paradigm offers limited forensic utility because it fails to reveal when manipulations occur, how the audio was modified, or where the synthetic content originated. Furthermore, as generative audio models evolve rapidly, existing detectors overfit to superficial artifacts of specific training generators, causing catastrophic performance drops when evaluated on unseen sources.

## Method

The baseline deepfake detector integrates a frozen self-supervised EAT (Efficient Audio Transformer) encoder to extract fine-grained representations, followed by a backbone comprising a 12-layer ResNet with convolutional blocks, a 2-layer Transformer encoder, and a 1-layer bidirectional LSTM network. The architecture branches into three distinct classification heads: a 3-layer linear network predicting frame-level counterfeit labels, a manipulation type classifier, and a deepfake source classifier, with predicted frame-level probabilities post-processed via median filtering.

Models are trained for 10 epochs using the AdamW optimizer with a learning rate of 1e-3. The training objective combines Binary Cross-Entropy (BCE) loss for frame-level detection with Cross-Entropy (CE) loss for manipulation type and source classification, weighted by coefficients of 0.5, 0.01, and 0.01 respectively. The FakeSound2 dataset construction pipeline utilizes a Text-to-Audio grounding model to locate semantic event boundaries, DeepSeek LLM to generate target manipulation metadata and chain-of-thought event rewrites, various generative and rule-based audio manipulation engines (e.g., Tango2, AudioLDM2, LASSNet), and a Contrastive Language-Audio Pretraining (CLAP) similarity filter to discard low-quality test samples.

## Experimental setup

The dataset contains 369,929 training samples and 7,375 test samples (refined to 3,896 samples via quality filtering, including 1,657 out-of-domain test samples). Evaluation metrics include clip-wise identification accuracy (Acc_identify), frame-level F1 score (F1_segment), manipulation type accuracy (Acc_manipulation), and deepfake source accuracy (Acc_source). The baseline system employs an EAT audio encoder combined with a ResNet-Transformer-BiLSTM backbone, optimized via AdamW for 10 epochs.

## Results

On in-domain test subsets, the baseline model achieves an overall identification accuracy (Acc_identify) of 95.10%, a segment-level F1 score (F1_segment) of 97.46%, a manipulation type accuracy of 93.10%, and a source accuracy of 90.91%. However, when evaluated on out-of-domain (OOD) test sets featuring unseen generators (e.g., X2Audio, MakeAnAudio), performance degrades drastically: total manipulation-type accuracy plunges from 93.10% to 32.35%, and generation-specific manipulation accuracy collapses from 99.40% to 4.23%. 

Ablations and t-SNE feature visualizations reveal that while the model successfully learns a generalized feature cluster for authentic audio (enabling strong binary separation), forged categories sharing similar architectures or task objectives (such as Editing vs. Generation) exhibit severely entangled latent representations, leading to source attribution failures.

| System / Condition | Acc_identify (%) | F1_segment (%) | Acc_manipulation (%) | Acc_source (%) |
|---|---|---|---|---|
| In-Domain (Total) | 95.10 | 97.46 | 93.10 | 90.91 |
| Out-of-Domain (Total) | 77.91 | 74.66 | 32.35 | - |
| In-Domain (Generation) | 100.00 | 100.00 | 99.40 | 99.60 |
| Out-of-Domain (Generation) | 86.62 | 81.60 | 4.23 | - |
| In-Domain (Inpainting) | 99.94 | 98.91 | 99.75 | 93.68 |
| Out-of-Domain (Inpainting) | 71.86 | 64.95 | 46.49 | - |

## Limitations

The benchmark currently focuses on general environmental and sound event audio, and has not sufficiently explored specific high-stakes domains like fake speech synthesis or joint audio-speech manipulation. Additionally, evaluation is bound by the specific pool of 12 synthesis sources and 6 manipulation types included in the pipeline.

## Why read this

Speech and ML researchers working on audio forensics or trustworthy AI should read this paper to understand why current binary deepfake detectors fail on unseen generative models and how to build traceable, multi-task explainable audio detectors.

## Code

- https://zeyuxie29.github.io/FakeSound2/

## Applications

Audio forensics, legal content verification, automated disinformation detection, and secure media authentication systems.

## Institutions / 機構

Guangdong Provincial Key Laboratory of Ultra High Definition Immersive Media Technology, Peking University, Tencent AI Lab, Shanghai Jiao Tong University

**Funding / 經費:** National Natural Science Foundation of China, Tencent AI Lab Rhino-Bird Program

## Related

- (link related pages by id as the wiki grows)
