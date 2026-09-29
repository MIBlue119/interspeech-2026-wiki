---
id: granda26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["Factored AI"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2886
pdf: https://www.isca-archive.org/interspeech_2026/granda26_interspeech.pdf
---

# Genealogical Priors in Self-Supervised Learning: Improving Speech Technology for Low-Resource Languages

*Elizabeth Granda, Edson A. Luna, Andres F. Gonzalez*

[PDF](https://www.isca-archive.org/interspeech_2026/granda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/granda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2886)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — Family-aware multilingual data selection for continued pretraining improves low-resource speech SSL transfer, achieving a general task score of 0.50 compared to 0.04 for random selection under strict data constraints.

## Key contributions

- Evaluates genealogical language family groupings as an inductive bias for self-supervised speech model pretraining under extreme data constraints.
- Demonstrates that Voice Activity Detection (VAD) and duration filtering significantly improve embedding cluster separation for both language and family classification.
- Shows that family-aware pretraining outperforms unstructured random sampling on downstream LID, ASR, and speaker clustering tasks using only 60 hours of training data.
- Provides empirical analysis showing continued pretraining on small, structured datasets can prevent near-collapse where random sampling degrades representations.

## Problem

Speech technology predominantly focuses on a small fraction of high-resource languages, leaving thousands underrepresented due to expensive and scarce annotations. While Self-Supervised Learning (SSL) has revolutionized speech representations, current massively multilingual models treat data as an unstructured scaling variable rather than leveraging linguistic structure. This makes it difficult for low-resource languages to effectively benefit from shared phonetic features of related tongues during representation learning.

## Method

The study builds upon the Unsupervised People's Speech in the Wild challenge dataset, applying Silero VAD, Whisper Large v3 language identification, and segment-duration filtering (retaining files with at least 16 segments of 10+ seconds) which yielded 262k usable audios (~281k hours). Languages were mapped to genealogical families using Glottolog and Ethnologue, and a language-aware training subset of 32 languages across multiple families (~56 hours of audio, ~22k chunks) was constructed to ensure balanced family representation. A matched-duration random subset was created as a baseline.

Using WavLM-Large (a 316M-parameter Transformer model with relative positional attention), the authors performed continued pretraining using a contrastive objective and Gumbel-Softmax vector quantization. The CNN feature encoder was frozen, while the transformer encoder and projection heads were updated. Training used stochastic speed perturbation (0.9 to 1.1 factor, 50% probability) and additive white Gaussian noise (15-30 dB SNR, 30% probability) as waveform augmentations.

Models were trained for 8 epochs with an effective batch size of 16 (per-device batch size 2, gradient accumulation 8) using the AdamW optimizer, bfloat16 mixed precision, and a cosine learning rate schedule with 500 warmup steps starting at 5e-5. The Gumbel-softmax temperature decayed exponentially from 2.0 to 0.1.

## Experimental setup

Evaluated using a dedicated held-out validation set of ~7,000 chunks (27 files across 10 unseen languages). Compared language-aware continued pretraining against unstructured random multilingual pretraining (no-language-aware) under an identical 60-hour budget, alongside the official off-the-shelf WavLM-Large baseline. Metrics included general challenge score, F1, Character Error Rate (CER), and Adjusted Rand Index (ARI). Hardware was a CUDA-enabled GPU using Google Colab.

## Results

The language-aware model achieved a challenge score of 0.50, an F1 of 0.50, a Character Error Rate (CER) of 0.75, and an Adjusted Rand Index (ARI) of 0.48, reaching a validation loss of 3.86. In contrast, the unstructured random-sampling baseline achieved a score of 0.04, F1 of 0.037, CER of 0.90, ARI of 0.39, and a validation loss of 3.93. Ablations on VAD filtering showed it improved base HuBERT language-level centroid classification accuracy from 55.9% to 65.2% and family-level accuracy from 42.5% to 50.0%. 

However, both continued-pretraining models underperformed compared to the original off-the-shelf WavLM-Large baseline, indicating that 60 hours of continued pretraining on a 316M model partially perturbs pre-optimized high-resource English representations without providing enough diverse evidence to build fully stable cross-linguistic abstractions.

| Condition | Score | F1 | CER | ARI |
|---|---|---|---|---|
| language-aware | 0.50 | 0.50 | 0.75 | 0.48 |
| no-language-aware | 0.04 | 0.037 | 0.90 | 0.39 |

## Limitations

Experiments were restricted to a single, small subset of audio data (60 hours) and evaluated on a limited validation set of 10 unseen languages. The study tests only one model architecture (WavLM-Large) and relies strictly on genealogical family trees, ignoring areal features and contact-induced convergence where languages cluster by geography rather than genetic descent.

## Why read this

Speech and ML researchers working on low-resource speech representation learning will find this a provocative look at data curation over raw scaling, showing how linguistic inductive biases can mitigate representation collapse under data scarcity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving automatic speech recognition, language identification, and speaker clustering for underrepresented and low-resource languages.

## Institutions / 機構

Factored AI

## Related

- [Which Languages Transfer Best to Warlpiri? A Similarity-Based Study for Low-Resource ASR](mylvaganam26b_interspeech.md) — same problem · relatedness 2.6/3
- [GigaAM Multilingual: Foundation Model for Underrepresented Languages](kuzmenko26_interspeech.md) — same problem · relatedness 2.3/3
- [Probing LoRA-to-LoRA Cross-Lingual Transfer for Unseen Low-Resource Conditions in Whisper-Based ASR](mondal26_interspeech.md) — same problem · relatedness 2.3/3
- [Alignment-Aware Continued Pre-training for Multilingual Speech Representation Learning](lu26b_interspeech.md) — same problem · relatedness 2.1/3
- [Continual Adaptation for Pacific Indigenous Speech Recognition](xiao26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
