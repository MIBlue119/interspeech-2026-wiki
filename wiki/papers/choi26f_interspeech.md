---
id: choi26f_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2221
pdf: https://www.isca-archive.org/interspeech_2026/choi26f_interspeech.pdf
---

# IPA-Guided Dual Transcription for Data-Centric Speech Corpus Refinement

[PDF](https://www.isca-archive.org/interspeech_2026/choi26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2221)

**TL;DR** — A data-centric speech corpus refinement framework uses a phoneme-intermediate-conditional speech-to-text model combined with a fine-tuned large language model to resolve spoken-written ambiguities, achieving an 88.7 sentence accuracy and 4.7 digit error rate on the Google TN dataset.

## Problem

Speech and text suffer from a complex many-to-many mapping where the same written form has multiple spoken realizations and vice versa, creating ambiguity that degrades downstream ASR and text normalization performance. Resolving this is critical for curating consistent speech corpora, but traditional text-only normalization models lack direct access to actual acoustic pronunciation.

## Method

The framework combines a 12-layer Conformer speech-to-text encoder (PIC-AE) with an intermediate CTC head at layer 9 predicting IPA phoneme targets and the final layer predicting subword units, and a Gemma-3 27B large language model fine-tuned using Unsloth via Supervised Fine-Tuning (SFT) and Group Relative Policy Optimization (GRPO) under 4-bit quantization. The PIC-AE processes audio in a single forward pass to yield aligned orthographic and IPA streams, which serve as direct conditioning inputs for the LLM to generate dual spoken-written representations in the format (Written)/(Spoken). The STT model was trained on LibriSpeech (subword vocab 8k, IPA vocab 125) and the LLM was fine-tuned on 10k GoogleTN samples.

## Results

Evaluated on 1,000 samples from the GoogleTN dataset where evaluation speech was synthesized via VITS/VCTK to supply IPA context, the proposed method achieves 88.7 sentence accuracy, 2.73 WER, 0.981 F1 score, and 4.7 digit error rate (DER). It outperforms baseline systems including WFST (80.8 SA, 18.7 DER), WFST+LM (79.6 SA, 19.6 DER), and Duplex (81.9 SA, 10.2 DER), yielding a 53.9% error reduction in the numerical expression category.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and data curators building robust domain-specific ASR and text-to-speech systems or refining noisy, unaligned speech corpora.

## Limitations

English text normalization evaluation relies on TTS-synthesized speech rather than naturally spoken corpora due to a lack of public natural speech datasets with ground-truth spoken-written transcriptions.

## Related

- (link related pages by id as the wiki grows)
