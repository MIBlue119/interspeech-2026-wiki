---
id: lavechin26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised, dataset-or-benchmark-release]
institutions: ["Aix-Marseille University", "CNRS", "Harvard University", "Massachusetts Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1132
pdf: https://www.isca-archive.org/interspeech_2026/lavechin26_interspeech.pdf
---

# BabAR: from phoneme recognition to developmental measures of young children''s speech production

*Marvin Lavechin, Elika Bergelson, Roger Levy*

[PDF](https://www.isca-archive.org/interspeech_2026/lavechin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lavechin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1132)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — BabAR is a cross-linguistic phoneme recognition system for young children trained on TinyVox, a newly curated standardized corpus of over 500,000 IPA-transcribed child vocalizations. It achieves a phoneme error rate (PER) of 42.1% by leveraging multilingual child-centered pretraining and a 20-second context window.

## Key contributions

- Curated TinyVox, standardizing over 500,000 IPA-transcribed child utterances (387.7 hours) across 5 languages (English, French, Portuguese, German, Spanish) from 31 PhonBank corpora.
- Benchmarked six self-supervised learning models, demonstrating that pretraining on multilingual child-centered daylong recordings (BabyHuBERT) substantially outperforms adult speech pretraining.
- Proved that providing 20 seconds of surrounding audio context during fine-tuning improves child phoneme recognition by mitigating noisy naturalistic boundary conditions.
- Validated BabAR on a held-out longitudinal dataset of 44 infants, successfully recovering developmental canonical proportion trajectories without manual annotations.

## Problem

Analyzing early speech development at scale is severely bottlenecked by the requirement for costly manual phonetic transcriptions of highly variable infant speech. While adult ASR has advanced rapidly, building robust child ASR remains challenging due to unique vocal tract geometries, developing motor control, highly variable acoustic outputs, and a severe shortage of publicly available multi-lingual child speech corpora. Prior off-the-shelf universal phone recognizers struggle heavily with child speech and noisy daylong recording environments, yielding unusable error rates exceeding 120% PER.

## Method

BabAR is formulated as a connectionist temporal classification (CTC) sequence-to-sequence phoneme recognition task mapping frame-level features to a standardized 57-phoneme inventory (30 consonants, 27 vowels) derived via panphon feature edit distance from 967 raw IPA surface variants. The architecture stacks a frozen convolutional feature encoder (from BabyHuBERT, pretrained on 13,000 hours of multilingual child-centered audio) with adaptable transformer layers and a two-layer feed-forward prediction head (384 hidden dimensions, ReLU, dropout p=0.1).

During fine-tuning, context-aware extended audio input is utilized: for a target utterance interval, an extended audio window of 20 seconds (c = 20s) is fed into the encoder to capture background acoustics, vocal characteristics, and surrounding conversational context. Crucially, the CTC loss and inference predictions are restricted strictly to the target utterance frames, preventing unannotated surrounding audio from corrupting supervision. Optimization uses AdamW with a learning rate of 10^-5, weight decay 10^-2, tri-stage scheduling (10% warmup, 40% constant, 50% linear decay), FP16 mixed precision, and an effective batch size of 64 over 100,000 steps (~21 epochs).

Inference uses greedy decoding without beam search or N-gram language models, as decoding over raw frame outputs proved sufficient given the upstream acoustic adaptation provided by BabyHuBERT pretraining and extended context windows.

## Experimental setup

Trained on TinyVox (387.7 hours of child speech from 560 children aged 5-96 months, split 80/10/10 by speaker to prevent leakage), evaluated against baseline models W2V2Phoneme and ZIPA-large on the TinyVox test set using Phoneme Error Rate (PER), Insertion (I), Deletion (D), and Substitution (S) rates. Evaluated downstream on the SEEDLingS corpus of 44 infants aged 6-17 months for canonical proportion trajectories. Implemented with PyTorch on a single NVIDIA V100 GPU (32GB) running 5 random seeds per configuration.

## Results

BabAR achieves a headline test PER of 42.1%, drastically outperforming off-the-shelf baselines W2V2Phoneme (129.9% PER) and ZIPA (124.3% PER), primarily by reducing insertion rates from ~60% down to 4.9% via domain-specific fine-tuning on naturalistic data. Among self-supervised pretraining comparisons, BabyHuBERT (46.2% PER) substantially outperforms W2V2 XLSR (52.2%) and LibriSpeech-trained models (~55.6%). Adding 20 seconds of audio context during fine-tuning provides an incremental absolute reduction of 2.7%, bringing validation PER down from 46.2% to 43.5%. Error analysis reveals that while phone-level accuracy has limitations, substitutions predominantly remain within broad phonetic categories (e.g., 63.1% of stop substitutions map to another stop), proving reliable for coarse developmental measures.

| System | Insertion (%) | Deletion (%) | Substitution (%) | PER (%) |
|---|---|---|---|---|
| W2V2Phoneme [65] | 59.5 | 18.6 | 51.8 | 129.9 |
| ZIPA [66] | 60.1 | 18.0 | 46.2 | 124.3 |
| BabAR (Base, c=0s) | 5.2 | 16.1 | 21.9 | 46.2 |
| BabAR (Base, c=20s) | 4.9 | 15.8 | 21.4 | 42.1 |

## Limitations

The evaluation dataset is heavily skewed toward English (52.1%) and French (30.9%), limiting robust cross-linguistic performance claims for underrepresented languages in TinyVox like Spanish and German. The 42.1% PER reflects fine-grained phonetic confusion, meaning individual-level clinical diagnosis remains difficult despite successful group-level developmental validation. The system relies heavily on pre-segmented or VTC-detected speech intervals, and performance assumes valid target child vocalization frames within the extended context window.

## Why read this

Speech researchers and ML engineers building automatic child speech analysis tools should read this paper to understand how to leverage multilingual child-centered self-supervised pretraining and context-aware fine-tuning to overcome noisy real-world daylong audio conditions.

## Code

- https://github.com/MarvinLvn/BabAR

## Applications

Automated developmental speech screening, large-scale longitudinal phonetic tracking for child psychology research, and clinical assessment of language delays.

## Institutions / 機構

Aix-Marseille University, CNRS, Harvard University, Massachusetts Institute of Technology

**Funding / 經費:** Simons Foundation International, National Institutes of Health

## Related

- (link related pages by id as the wiki grows)
