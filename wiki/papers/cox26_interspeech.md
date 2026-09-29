---
id: cox26_interspeech
category: speaker
labels: [self-supervised]
institutions: ["University of Sheffield"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2542
pdf: https://www.isca-archive.org/interspeech_2026/cox26_interspeech.pdf
---

# Learning task-specific subspaces via interventional post-training of speech foundation models

*Jack Cox, Jon P Barker*

[PDF](https://www.isca-archive.org/interspeech_2026/cox26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cox26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2542)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — This paper introduces interventional contrastive learning to post-train speech foundation models into distinct content and speaker subspaces using a synthetic zero-shot TTS dataset, yielding strong out-of-domain speaker verification performance.

## Key contributions

- Proposed a novel multi-part contrastive loss with an orthogonality regularizer to jointly learn multiple task-specific subspaces from interventional data.
- Constructed a synthetic interventional dataset via zero-shot TTS (F5-TTS) using LibriTTS with exhaustive combinations of 38 speakers and reference texts.
- Demonstrated that interventional post-training separates speaker and content information, achieving strong out-of-domain speaker verification that beats human baseline performance.
- Evaluated the framework across three frozen speech foundation models (wav2vec 2.0, HuBERT, WavLM) using minimal subspace projection networks.

## Problem

Speech foundation models pre-trained via self-supervised learning produce general-purpose representations where salient speech variables are distributed and entangled, whereas downstream tasks typically rely on only a fraction of this variability. Prior contrastive methods learn single invariant spaces, while traditional disentanglement approaches (like non-linear ICA) rely on flawed independence and Gaussianity assumptions rather than causal variables. This paper addresses this gap by applying causal disentanglement and interventional contrastive learning to speech model post-training, utilizing weak intervention labels to isolate content and speaker subspaces.

## Method

The framework takes an utterance sequence and passes it through a frozen pre-trained speech foundation backbone (wav2vec 2.0 Base, HuBERT Base, or WavLM Base) to yield sequence vectors of dimension 768. A parameter-free mean-pooling module aggregates these vectors into a single 768-dimensional utterance embedding vector, which is then fed into a 3-layer MLP subspace projection network (hidden dimension 768, 1.8M parameters) without a bottleneck. The output embedding is partitioned equally into a content subspace (z_c) and a speaker subspace (z_s) of dimension 384 each.

The training objective combines an extended multi-positive contrastive loss for each subspace—computed using cross-entropy over l2-normalized candidates and anchors with a temperature parameter—and a squared Frobenius norm orthogonality regularizer penalizing similarity between subspaces. The overall loss is a weighted sum of the subspace contrastive losses and the orthogonality regularizer.

The training dataset is synthesized using F5-TTS, drawing 32 training speakers and 6 development speakers from LibriTTS (256 reference utterances per speaker, 3-10 seconds duration). Exhaustive cross-combinations of speakers and target texts yield 8,192 training utterances and 1,536 development utterances, ensuring zero speaker or text overlap between sets. Models are trained for 50 epochs using the AdamW optimizer, a one-cycle learning rate scheduler with cosine annealing (max lr 1e-4, starting percentage 0.1, division factor 25, final division factor 1e3), and a batch size of 512 on a single Nvidia A100 GPU in under 2 hours.

## Experimental setup

Evaluated on LibriTTS-derived synthetic data (32 train speakers, 6 dev speakers), VoxCeleb1 test set for out-of-domain speaker verification (SV), and Google Speech Commands for keyword spotting (KS). Compared against baselines: a backbone-only 'None' model (mean-pooled raw representations), 'Content only' models, and 'Speaker only' models. Metrics reported are Equal Error Rate (EER %) for SV and accuracy (%) for KS across 5 random seeds.

## Results

Using WavLM Base, the Full model achieves an out-of-domain speaker verification EER of 24.7% (matched speaker subspace) compared to 38.7% for the baseline with no subspace network, successfully beating the non-expert human baseline of 26.51% EER despite the extreme domain gap (clean synthetic read speech vs. in-the-wild VoxCeleb1). For keyword spotting with HuBERT and WavLM, the full model achieves 89.7% and 93.0% accuracy respectively, remaining competitive with the pooled baselines (95.7% and 96.9%) although the content subspace shows some loss of word-level phonetic detail due to the utterance-level pretext task.

Ablations comparing joint models against single-subspace models show that joint training performs similarly to single-subspace models while maintaining fewer parameters, though joint training does not strictly outperform single-subspace variants. Wav2vec 2.0 consistently underperformed compared to HuBERT and WavLM, attributed to using features strictly from the final model layer.

| Backbone | Model Condition | Matched SV EER (%) ↓ | Matched KS Acc (%) ↑ |
|---|---|---|---|
| HuBERT | None (Baseline) | 36.4 | 95.7 |
| HuBERT | Speaker Only | 26.9 | - |
| HuBERT | Full (Joint) | 27.2 | 89.7 |
| WavLM | None (Baseline) | 38.7 | 96.9 |
| WavLM | Speaker Only | 24.6 | - |
| WavLM | Full (Joint) | 24.7 | 93.0 |

## Limitations

The evaluation relies heavily on synthetic read speech data from a restricted set of 32 speakers, limiting assessment of real-world speaker diversity and acoustic variability. The approach was tested only on English datasets and evaluated on a limited pair of downstream tasks (Speaker Verification and Keyword Spotting). Additionally, the final layer used from wav2vec 2.0 proved suboptimal, and the content subspace exhibited slight information leakage and inferior keyword spotting performance compared to raw pooled features.

## Why read this

Speech and ML researchers working on representation disentanglement and foundation model post-training should read this paper to learn how interventional contrastive learning and synthetic TTS data can be leveraged to separate speaker and content subspaces.

## Code

- https://github.com/mjukus/interventional-post-training-speech

## Applications

Speaker verification, speaker anonymization, speech disaggregation, and privacy-preserving speech processing.

## Institutions / 機構

University of Sheffield

**Funding / 經費:** UK Research and Innovation, Meta

## Related

- (link related pages by id as the wiki grows)
