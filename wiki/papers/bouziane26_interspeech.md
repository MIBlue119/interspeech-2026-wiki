---
id: bouziane26_interspeech
category: speaker
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3350
pdf: https://www.isca-archive.org/interspeech_2026/bouziane26_interspeech.pdf
---

# Learning Multiple Utterance-Level Attribute Representations with a Unified Speech Encoder

*Maryem Bouziane, Salima Mdhaffar, Yannick Estève*

[PDF](https://www.isca-archive.org/interspeech_2026/bouziane26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bouziane26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3350)

**Category:** `speaker` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — This paper proposes a unified post-training framework that allows a single speech foundation model to simultaneously generate multiple utterance-level attribute representations (such as semantics and speaker identity) using task-specific projection branches. The multi-task model achieves strong performance nearly matching single-task specialists, recording an Equal Error Rate of 0.91% on VoxCeleb1-O speaker verification while retaining high multilingual retrieval R@1 scores.

## Key contributions

- A general multi-task teacher-student framework allowing a shared speech encoder to produce multiple utterance-level attribute representations via task-specific projection branches.
- Empirical demonstration that semantic and speaker embeddings can be learned jointly without significant degradation in retrieval or verification performance.
- A layer-weighting mechanism with learnable interpolation weights showing that semantic tasks rely primarily on middle layers while speaker tasks utilize higher layers.
- Comprehensive evaluation across multiple benchmarks (VoxPopuli, MTEDx, FLEURS, VoxCeleb1) showing robust generalization including low-resource languages.

## Problem

Modern self-supervised speech foundation models generate powerful frame-level acoustic representations, but adapting them to utterance-level tasks has typically focused on single attributes. Prior post-training approaches like SENSE and SONAR align speech representations exclusively with text-based semantic embedding spaces via teacher-student distillation. While this enables effective multilingual and multimodal speech retrieval, it suppresses vital paralinguistic metadata like speaker identity, emotion, or accent. Developing a unified architecture capable of preserving semantic meaning while simultaneously capturing speaker traits is crucial for versatile conversational AI systems.

## Method

The framework builds upon the SENSE teacher-student paradigm, taking a pretrained w2v-BERT 2.0 speech encoder and attaching parallel, task-specific projection branches for each target attribute $\tau \in \mathcal{T}$. For a given attribute, hidden representations across all encoder layers are projected linearly, combined via learned scalar importance weights passed through a softmax layer normalization, and aggregated into a frame-level sequence using LayerNorm.

This sequence is mapped into an utterance-level representation via an attribute-specific attention pooling mechanism and $L_2$-normalized. The model optimizes a cosine similarity objective against frozen teacher models: BGE-M3 for semantic representations and an ECAPA-TDNN model trained on VoxCeleb for speaker embeddings. The shared w2v-BERT 2.0 encoder and task-specific branches are jointly optimized end-to-end using multi-task learning.

The system is implemented in SpeechBrain and trained on the validated Common Voice 19 dataset spanning 83 languages (8,250 hours) using a language-balanced weighted sampling strategy. The shared encoder is optimized via the Adam optimizer with a learning rate of $10^{-5}$, while task-specific modules use Adadelta with an initial learning rate of 1.5, batch size of 20, over 350K iterations across 8 H100 GPUs.

## Experimental setup

Experiments use Common Voice 19 (8,250 hours across 83 languages) for training. Evaluation datasets include VoxPopuli and FLEURS for speech-to-speech retrieval, MTEDx and FLEURS for speech-to-text retrieval, and VoxCeleb1-O for speaker verification. Baselines include META SONAR (37 language-specific encoders), single-task SENSE [Att(sem)], a single-task speaker model [Att(spk)], and the original ECAPA-TDNN teacher model. Metrics reported are Recall@1 (R@1) for retrieval, and Equal Error Rate (EER) and minimum normalized Detection Cost Function (minDCF) for speaker verification.

## Results

On VoxPopuli speech-to-speech retrieval, the multi-task model [Att(sem+spk)] achieves R@1 scores very close to the single-task semantic baseline [Att(sem)] (e.g., fr->en R@1 of 95.94% vs 96.55% for Att(sem) and 91.91% for SONAR) and consistently outperforms SONAR across language pairs. On MTEDx and FLEURS speech-to-text retrieval, Att(sem+spk) tracks closely with Att(sem) while notably improving on low-resource pairs like my-en (16.38% vs 14.11% R@1). 

On VoxCeleb1-O speaker verification, the multi-task model achieves an EER of 0.91% and minDCF of 0.1253, closely matching the ECAPA-TDNN teacher (0.90% EER, 0.1104 minDCF) and slightly outperforming the single-task speaker baseline Att(spk) (0.93% EER). Layer-interpolation analysis shows that the semantic branch heavily weights middle layers (peaking at layers 13-14), whereas the speaker branch distributes weights broadly, peaking at the top layers (23-24).

| System | VoxCeleb1-O EER (%) | VoxCeleb1-O MinDCF | VoxPopuli fr->en R@1 (%) | MTEDx it->en R@1 (%) |
|---|---|---|---|---|
| ECAPA-TDNN / SONAR | 0.90 | 0.1104 | 91.91 | 89.01 |
| Att(sem) | - | - | 96.55 | 90.69 |
| Att(spk) | 0.93 | 0.1285 | - | - |
| Att(sem+spk) | 0.91 | 0.1253 | 59.94 | 90.10 |

## Limitations

The framework is currently validated on only two utterance-level attributes (semantics and speaker identity), leaving out other crucial paralinguistic traits like emotion, accent, and language ID. Training relies on high-compute resources (8 H100 GPUs for 350K iterations), and scaling to dozens of simultaneous attribute branches could introduce optimization conflicts or gradient interference that requires careful loss balancing.

## Why read this

Speech and ML researchers building unified multi-task audio backbones should read this to see how a single speech encoder can master both semantic retrieval and speaker verification without performance compromises, using learnable layer-interpolation weights.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal cross-lingual conversational agents, multilingual speech translation search, and voice-biometric enabled speech retrieval systems.

## Institutions / 機構

Avignon Universite

## Related

- (link related pages by id as the wiki grows)
