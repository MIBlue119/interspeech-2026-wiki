---
id: bartley26_interspeech
category: asr
labels: [low-resource, efficient-on-device, self-supervised]
institutions: ["University of Sheffield"]
code: https://github.com/c-bartley/el-asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1302
pdf: https://www.isca-archive.org/interspeech_2026/bartley26_interspeech.pdf
---

# Bootstrapping Endangered Language ASR with Short-Form Corpora

*Christopher Bartley, Anton Ragni*

[PDF](https://www.isca-archive.org/interspeech_2026/bartley26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bartley26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1302)

**Category:** `asr` · **Labels:** `low-resource`, `efficient-on-device`, `self-supervised`

**TL;DR** — This paper presents a low-compute, CPU-friendly approach to bootstrap ASR for endangered languages by using crowdsourced short-form audio to force-align unsegmented long-form archives. The resulting HMM and fine-tuned Whisper models substantially outperform massive zero-shot multilingual foundation models (OmniASR, MMS, Whisper) on out-of-domain endangered language evaluation.

## Key contributions

- Established via English ablation that HMM-based ASR performance remains stable down to ~1-second average utterance lengths before degrading.
- Proposed a pipeline utilizing short-form speech seed models to perform Viterbi forced alignment and segment untranscribed long-form audio archives.
- Created, validated, and open-sourced new utterance-level speech corpora for five typologically diverse endangered languages (Cornish, Manx, Hawaiian, Jejueo, Mohawk).
- Demonstrated that traditional CPU-trainable HMM systems and localized fine-tuning outperform massive zero-shot end-to-end foundation models on endangered language domains.

## Problem

Modern state-of-the-art ASR systems rely heavily on massive pretraining and assume the presence of clean, utterance-level supervised speech (3–15 seconds) paired with text. This narrow requirement completely marginalizes endangered languages, where existing data typically manifests either as unaligned long-form speech (narrations, interviews) or disconnected short-form phrases (pronunciation dictionaries). Furthermore, training massive multilingual foundation models requires prohibitive GPU compute that is entirely inaccessible to endangered language communities, while their zero-shot transfer performance on out-of-domain endangered data remains poor.

## Method

The methodology starts by collecting available short-form speech (words/short phrases averaging 0-2 seconds) and long-form recordings, converting them to 16 kHz 1-channel PCM WAV, and executing uniform text normalization (whitespace cleaning, punctuation stripping, diacritic canonicalization, ASCII/uppercase conversion). Using Kaldi, a monophone GMM-HMM is trained solely on the short-form data using a Unicode graphemic lexicon (avoiding missing phonemic dictionaries). This seed model is then used to perform Viterbi forced alignment to segment the long-form recordings, which successfully extracts utterance-level training subsets after filtering poor alignments (e.g., discarding segments with WER > 60%).

For final model training, both the short-form and aligned long-form utterances are combined. The authors train HMM-based systems ranging from basic GMM-HMMs to context-dependent triphone models (LDA+MLLT+SAT via fMLLR) and time-delay neural network (TDNN) DNN-HMMs trained with Lattice-Free Maximum Mutual Information (LF-MMI) entirely on CPU. To combat high out-of-vocabulary (OOV) rates, external text data from sources like MAD-LAD-400 are harvested to build robust 4-gram ARPA language models that bias decoding. Additionally, LoRA fine-tuning of Whisper (large-v3) via SpeechBrain for 1 epoch is explored for comparison in extremely text-scarce settings.

## Experimental setup

The evaluation spans five endangered languages across four language families totaling roughly 78 hours of aligned data: Cornish (39.24h), Manx (14.82h), Hawaiian (15.03h), Jejueo (3.63h), and Mohawk (5.11h). Systems are evaluated on in-domain (test-id) and out-of-domain (test-ood, web-scraped with manual Label Studio cuts) test sets using Word Error Rate (%WER) and Out-Of-Vocabulary (%OOV) rates. Baselines include zero-shot multilingual foundation models (OmniASR 7B, MMS 1B, Whisper large-v3), compared against the proposed Kaldi GMM-HMM, DNN-HMM with augmented LMs, and 1-epoch LoRA fine-tuned Whisper (Whisper-FT).

## Results

The naive GMM-HMM model outperforms all zero-shot multilingual baseline models (OmniASR, MMS, Whisper) on nearly every language test set, proving the immense value of targeted in-domain supervision over scale. For instance, on out-of-domain Cornish, the DNN-HMM with an external LM achieves an 89.97% WER, whereas OmniASR scores 115.17%, MMS scores 96.90%, and zero-shot Whisper scores 104.50%. Across the board, adding external language models provides an average WER reduction of 5.82% for the HMM-based architectures.

Where text data is critically scarce, such as in Jejueo and Mohawk, end-to-end fine-tuning emerges as more robust than count-based LMs: Whisper-FT achieves the best out-of-domain performance on Jejueo (68.22% WER) and Mohawk (68.04% WER). However, these two languages remain exceptionally difficult across all model classes due to extreme data and text sparsity.

| System / Condition | Cornish (ood) | Manx (ood) | Hawaiian (ood) | Jejueo (ood) | Mohawk (ood) |
|---|---|---|---|---|---|
| OmniASR (Zero-shot) | 115.17 | 56.57 | 36.56 | 100.00 | 161.64 |
| MMS (Zero-shot) | 96.90 | 97.93 | 71.12 | 94.29 | 158.47 |
| Whisper large-v3 (Zero-shot) | 104.50 | 99.00 | 67.40 | 71.00 | 141.60 |
| DNN-HMM + LM (Ours) | 89.97 | 24.50 | 14.56 | 97.20 | 83.71 |
| Whisper-FT (Ours) | 74.23 | 42.28 | 19.47 | 68.22 | 68.04 |

## Limitations

The pipeline requires at least some seed short-form data to bootstrap the initial monophone acoustic model. Long-form alignment success varies significantly based on audio quality, dropping sharply in conversational or noisy broadcast recordings containing background music (requiring manual thresholds and data discards, such as dropping 50 Hawaiian files). Extremely resource-scarce languages like Jejueo and Mohawk still suffer from high OOV rates and poor text scarcity, limiting the effectiveness of traditional n-gram LMs.

## Why read this

Speech researchers and engineers working on low-resource or endangered languages should read this paper to learn how to bypass the dependency on expensive utterance-level corpora by combining short-form pronunciation data with long-form archive forced alignment on standard CPU hardware.

## Code

- https://github.com/c-bartley/el-asr

## Applications

Revitalization and digital archiving of endangered, indigenous, and low-resource languages via accessible CPU-based speech recognition systems.

## Institutions / 機構

University of Sheffield

## Related

- [GigaAM Multilingual: Foundation Model for Underrepresented Languages](kuzmenko26_interspeech.md) — same problem · relatedness 2.3/3
- [Speech Recognition to Accelerate Documentation of Marquesan and Cook Islands Māori](teikitohe26_interspeech.md) — same problem · relatedness 2.3/3
- [Easper: An Accessible ASR Pipeline for Language Documentation](mahmudi26_interspeech.md) — same problem · relatedness 2.2/3
- [Preserving the Iranian Turkic Language: Community-Driven ASR Datasets and Benchmarking for South Azerbaijani](farsi26_interspeech.md) — same problem · relatedness 2.1/3
- [Which Languages Transfer Best to Warlpiri? A Similarity-Based Study for Low-Resource ASR](mylvaganam26b_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
