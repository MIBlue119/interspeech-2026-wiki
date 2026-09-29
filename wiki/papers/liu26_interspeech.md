---
id: liu26_interspeech
category: health-clinical
labels: [generative-model]
institutions: ["University of Science and Technology of China", "University of Edinburgh"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-88
pdf: https://www.isca-archive.org/interspeech_2026/liu26_interspeech.pdf
---

# CoSTA: Cognitive-State-Conditioned TTS Data Augmentation Using ASR Transcripts for Alzheimer’s Disease Detection

*Yin-Long Liu, Yuanchao Li, Yiming Wang, Yue Li, Rui Feng, Jiaxin Chen, Shaobo Liu, Liu He, Yuang Chen, Jiahong Yuan, Zhen-Hua Ling*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-88)

**Category:** `health-clinical` · **Labels:** `generative-model`

**TL;DR** — CoSTA is a text-to-speech data augmentation framework that conditions synthesis on cognitive states (Alzheimer's vs. Healthy Control) using ASR transcripts rather than manual ground-truth text, achieving an audio-only accuracy of 85.83% on the ADReSS test set.

## Key contributions

- Developed two Cognitive-State-Conditioned (CS-Cond) TTS models adapted from CosyVoice2 and F5-TTS to explicitly control generation of pathological vs. healthy acoustic traits.
- Constructed a diverse transcript pool comprising manual transcripts and 36 distinct ASR transcripts to evaluate text sources for data augmentation.
- Formulated a two-stage augmentation strategy using self-reference synthesis and intra-class cross-synthesis, paired with test-time augmentation (TTA).
- Demonstrated state-of-the-art audio-only Alzheimer's Disease detection performance on the ADReSS dataset, yielding an 85.83% accuracy.

## Problem

Speech-based Alzheimer's Disease detection models suffer severely from data scarcity due to patient privacy and availability, forcing reliance on basic signal perturbations like pitch shifting or time stretching. Standard text-to-speech models fail to capture pathological markers because they are optimized strictly for naturalness and intelligibility, actively regularizing away the disfluencies and prosodic irregularities characteristic of cognitive decline. Furthermore, it remains unknown whether ground-truth manual transcripts or error-prone ASR transcripts provide better text conditioning for synthetic data generation in this domain.

## Method

The CoSTA framework relies on two distinct CS-Cond TTS architectures. The first adapts CosyVoice2 by fine-tuning its underlying Qwen2.5 text-speech language model via natural-language instructions concatenated with target transcripts, using separate models for AD and HC states. The second adapts F5-TTS by introducing a Cognition Processing block with ConvNeXtv2 layers and RoPE encoding to map discrete cognitive labels into dense embeddings, processed alongside text, reference, and noisy spectrograms within a Diffusion Transformer backbone. 

To build the training augmentation pool, 18 pretrained and 18 fine-tuned ASR models from the Wav2Vec2, HuBERT, WavLM, and Whisper families are used to transcribe the data, yielding 36 ASR transcripts plus manual transcripts per sample. Synthetic speech is generated using two strategies: 2x Self-Reference Synthesis (retaining original speaker timbre while adopting target linguistic traits) and Intra-Class Cross-Synthesis (combining target text with reference speech from a different subject within the same class to scale augmentation factors). 

During inference, a test-time augmentation strategy utilizes a zero-shot fine-tuned CosyVoice2 model to synthesize a companion variant of each test utterance using ASR transcripts. The final class probability is obtained by averaging the predictions from the original and synthetic test streams through an end-to-end WavLM-based detector featuring convolutional downsampling, a 24-layer Transformer encoder, weighted hidden state fusion, and attentive temporal pooling.

## Experimental setup

Experiments use the ADReSS dataset, containing a training set of 108 subjects (~1.7 hours) and a test set of 48 subjects (~0.9 hours), alongside three DementiaBank subsets (WLS, Lu, Kempler) comprising 245 samples (~3 hours) for ASR fine-tuning. Baseline comparisons include unaugmented models and traditional signal-level perturbations (noise addition, pitch shifting, time stretching). Models are trained on NVIDIA A800 GPUs (80GB VRAM) using the AdamW optimizer with learning rates of 1e-5 for TTS/ASR and 5e-5 for the AD detector.

## Results

CS-Cond CosyVoice2 surpasses the unaugmented baseline in 28 out of 37 text configurations, whereas pretrained CosyVoice2 only exceeds it in 7 out of 37 cases. ASR-driven augmentation frequently outperforms manual transcript augmentation, with models using fine-tuned ASR transcriptions (such as Wav2Vec2-Large-LV-60) achieving top accuracies. An augmentation factor analysis reveals an inverted-U performance curve, peaking at a 2x augmentation factor (1:1 mix of original and synthetic data), while test-time augmentation further boosts accuracy to yield an overall headline score of 85.83%—a 4.16% gain over the baseline.

| Systems / Conditions | Accuracy (%) |
|---|---|
| Baseline (Original training set) | 81.67 |
| + Traditional Noise Addition | 82.50 |
| CS-Cond CosyVoice2 (Manual Transcripts) | 82.50 |
| CS-Cond CosyVoice2 (Fine-tuned w2v960 large lv) | 85.00 |
| CoSTA (w/ TTA, Fine-tuned w2v960 large lv) | 85.83 |

## Limitations

The evaluation is restricted to the English-language ADReSS dataset and a single picture description task, leaving cross-lingual and cross-task generalization unverified. The framework relies heavily on sufficient reference speech data per class to perform cross-synthesis without losing speaker timbre stability. Excessively high augmentation factors degrade performance due to generative artifact overfitting.

## Why read this

Researchers building data-efficient diagnostic speech models should read this to understand how task-aware, cognitive-state-conditioned TTS combined with imperfect ASR transcript errors can generate more effective training data than manual transcriptions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening tools for Alzheimer's Disease and cognitive decline detection from audio recordings.

## Institutions / 機構

University of Science and Technology of China, University of Edinburgh

**Funding / 經費:** National Social Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
