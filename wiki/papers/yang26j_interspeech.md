---
id: yang26j_interspeech
category: asr
labels: [low-resource, self-supervised]
institutions: ["Wuhan University", "University of Melbourne", "Northwestern Polytechnical University", "University of Quebec"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1553
pdf: https://www.isca-archive.org/interspeech_2026/yang26j_interspeech.pdf
---

# A Fusion-Aware Two-Stage Framework for Mispronunciation Detection and Diagnosis in Low-Resource Modern Standard Arabic

*Jing Yang, Shuqing Zhang, Yongyi Deng, Pan Li, Ting Dang, Gongping Huang, Jingdong Chen, Jacob Benesty*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1553)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — A fusion-aware two-stage framework for Modern Standard Arabic mispronunciation detection and diagnosis uses a pretrained acoustic encoder combined with causal dilated temporal convolutional networks and multi-checkpoint ensemble inference, achieving a phoneme-level F1-score of 0.7201 on the QuranMB.v2 test set.

## Key contributions

- A hybrid end-to-end architecture pairing wav2vec2-XLS-R with causal dilated TCNs to preserve fine-grained phonetic variations and emphatic consonant distinctions without global context over-smoothing.
- A hierarchical two-stage training strategy that first learns general representations on native and synthetic data (~159h) before adapting to scarce real learner speech (~2h) to mitigate domain shift.
- A diversity-aware ensemble inference framework combining confusion networks and Kneser-Ney N-gram language model rescoring across multiple training checkpoints.
- Achieving top rank in the IqraEval.2 Challenge with a 63.1% relative improvement over the official baseline on the QuranMB.v2 benchmark.

## Problem

Computer-aided pronunciation training requires mispronunciation detection and diagnosis (MDD) systems to faithfully capture non-canonical variations rather than smoothing them out into correct semantic transcriptions like standard ASR. Modern Standard Arabic (MSA) compounds this challenge due to a complex phonological inventory featuring pharyngeal and emphatic contrasts, severe data scarcity, and a large domain gap between synthetic training data and real learner speech. Prior approaches like LSTMs and transformers either lack local temporal inductive bias or fail to handle the synthetic-real distributional divide, crippling performance in low-resource settings.

## Method

The architecture chains wav2vec2-XLS-R-300m as an upstream multilingual encoder with causal dilated temporal convolutional networks (TCNs) for local temporal modeling, followed by a CTC loss decoder. The TCN backbone uses causal dilated convolutions with a strict local receptive field to capture short-term articulatory cues and durational characteristics (such as geminated consonants) without over-smoothing acoustic anomalies. 

Training follows a two-stage paradigm. In Stage 1 (General Feature Learning), the model is optimized on a joint corpus of ~79 hours of native MSA (Iqra_train) and ~80 hours of error-injected synthetic speech (Iqra_TTS) to learn robust baseline acoustic-phonetic mappings. In Stage 2 (Pronunciation Adaptation), weights are fine-tuned exclusively on ~2 hours of real learner speech (Iqra_Extra_IS26) to adapt to uncontrolled disfluencies and dialectal interference.

During inference, a multi-checkpoint pool ($K=6$) comprising the best Stage 1 checkpoint and five top-performing Stage 2 checkpoints generate hypothesis sequences. These are aligned using weighted Levenshtein distance to build a confusion network (CN), which is then rescored using a dynamic Kneser-Ney 3-gram language model estimated directly from the pooled hypotheses. Beam search with a balanced acoustic weight ($\lambda = 0.2$) yields the final phoneme sequence.

## Experimental setup

Evaluated on the blind QuranMB.v2 test set using phoneme-level F1-score. Training datasets comprise ~79h Iqra_train, ~80h Iqra_TTS, and ~2h Iqra_Extra_IS26 real learner data, with a 3.4h validation subset. Implemented via s3prl with an NVIDIA RTX 4090 GPU, using Adam optimization with differential learning rates ($1\times 10^{-5}$ for the encoder, $1\times 10^{-4}$ for the TCN head), a batch size of 4, and FP16 mixed precision.

## Results

The complete framework achieves an F1-score of 0.7201 on the QuranMB.v2 test set (+63.1% relative improvement over the 0.4414 baseline). A single-checkpoint two-stage model scores 0.6825 (+54.6%), while adding the multi-checkpoint ensemble and N-gram rescoring provides an extra 5.5% relative boost. Ablations show that training exclusively on Stage 1 yields 0.4629 (+4.9%), naive mixing of synthetic and real data performs worse than the baseline at 0.305 (-2.5%), and training solely on Stage 2 real data yields 0.6681 (+51.4%). Replacing the TCN backbone with LSTM or Transformer architectures in Stage 2 drops performance to 0.6467 and 0.6000 respectively.

| System | F1-Score | Rel. Imp. (%) |
|---|---|---|
| Baseline | 0.4414 | - |
| Stage 1 Only (Single CKPT) | 0.4629 | +4.9 |
| Mix (Single CKPT) | 0.4305 | -2.5 |
| Stage 2 Only (Transformer) | 0.6000 | +35.9 |
| Stage 2 Only (LSTM) | 0.6467 | +46.5 |
| Ours (Two-Stage + Ensemble) | 0.7201 | +63.1 |

## Limitations

The evaluation is restricted to Modern Standard Arabic and Quranic recitation benchmarks, leaving generalization to conversational Arabic dialects untested. The method relies on a small real-world adaptation split (2 hours), and while effective, performance remains sensitive to the quality and diversity of the initial synthetic error injection pool.

## Why read this

Researchers building low-resource CAPT or fine-grained phonetic diagnostic systems will find a clear blueprint for combining pretrained self-supervised encoders with local temporal convolutions and multi-checkpoint ensemble confusion networks to bridge the synthetic-real domain gap.

## Code

- https://hf.co/spaces/IqraEval

## Applications

Computer-aided pronunciation training (CAPT), automated foreign language assessment, and phoneme-level mispronunciation detection in educational software.

## Institutions / 機構

Wuhan University, University of Melbourne, Northwestern Polytechnical University, University of Quebec

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
