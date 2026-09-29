---
id: choi26f_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2221
pdf: https://www.isca-archive.org/interspeech_2026/choi26f_interspeech.pdf
---

# IPA-Guided Dual Transcription for Data-Centric Speech Corpus Refinement

*Jeong-Ju Choi, Young-Ik Kim, Jin NamGoong, Jaeyeon Jang*

[PDF](https://www.isca-archive.org/interspeech_2026/choi26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2221)

**Category:** `asr`

**TL;DR** — The paper proposes an IPA-guided dual transcription framework for speech corpus refinement and text normalization that uses a phoneme intermediate conditional speech-to-text model and a fine-tuned LLM to resolve spoken-written ambiguities, achieving an 88.7% sentence accuracy on Google TN and a 69.8% WER reduction on domain-specific dental speech data.

## Key contributions

- Designed a Conformer-based STT model with an intermediate CTC head at layer k=9 predicting IPA phonemes, jointly trained alongside a final subword CTC head to provide aligned phonetic and orthographic streams in a single forward pass.
- Integrated a fine-tuned Gemma-3 27B LLM conditioned on both STT-derived IPA and raw orthographic text to perform robust bidirectional dual transcription ((Written)/(Spoken) format) via SFT and GRPO.
- Demonstrated practical speech corpus refinement on a 100-hour Korean dental domain dataset (KDent), showing that training on dual-transcription-refined data prevents the severe degradation caused by noisy original transcripts.
- Validated the approach on English Text Normalization using the GoogleTN dataset, outperforming rule-based WFST, WFST+LM, and NVIDIA's Duplex neural baseline across all evaluation metrics.

## Problem

Speech and text feature a complex many-to-many mapping where identical written forms have multiple pronunciations (e.g., dates, digits, acronyms) and vice versa, creating ambiguity that degrades both text normalization and downstream speech recognition performance. Traditional text normalization systems and LLMs operate purely on text without direct access to acoustic realization, making them underdetermined for context-sensitive expressions. Existing phoneme-conditioned speech architectures output auxiliary pronunciations but fail to feed phonetic streams into a downstream generative mapping model for systematic corpus curation and error mitigation.

## Method

The framework consists of two core stages: a Phoneme Intermediate Conditional Audio Encoder (PIC-AE) and an LLM-based dual text generator. The PIC-AE is built on a 12-layer Conformer architecture with 2048 hidden units and an output dimension of 512. It features an intermediate CTC head injected at layer k=9 predicting IPA phoneme sequences (using a 125-size vocabulary via Phonemizer) and a final layer N=12 predicting subword sequences (using an 8k vocabulary via SentencePiece). The multi-task loss combines both CTC objectives with equal weight. 

The second stage utilizes Gemma-3 27B as the backbone LLM, adapted via the Unsloth framework using 4-bit quantization and LoRA. The model is trained using Supervised Fine-Tuning (SFT) on paired raw text and phonemizer-derived IPA, followed by Group Relative Policy Optimization (GRPO) using reward signals for format and content consistency to ensure deterministic parsing of numerical and ambiguous expressions. At inference time, the PIC-AE supplies the phonetic conditioning stream directly to the LLM without requiring raw audio during LLM fine-tuning. The model generates structured dual outputs in the format (Written)/(Spoken).

For English text normalization experiments, evaluating on natural speech was bypassed due to dataset scarcity; instead, VITS-based VCTK multi-speaker TTS synthesized reference spoken forms from the GoogleTN test set to supply controlled acoustic input to the PIC-AE. For Korean domain experiments, a 100-hour YouTube dental corpus (KDent) was semi-automatically cleaned and expanded into KDent V2 via the dual transcription pipeline, feeding a WeNet 2.0 / ESPnet2 speech recognition pipeline.

## Experimental setup

Evaluated on the GoogleTN dataset (1,000 randomly sampled test instances synthesized via VITS/VCTK), the KSponSpeech evaluation set, a 100-hour Korean Dental Speech Corpus (KDent) from YouTube, and a Korean digit speech dataset (KDigit). Baselines for English TN include traditional rule-based WFST, WFST+LM scoring, and NVIDIA's Duplex neural model. Metrics include sentence-level accuracy (SA), word error rate (WER), token-level F1 score, digit error rate (DER) across 9 numerical semantic tags, and character error rate (CER). Implementation uses ESPnet2 and WeNet 2.0 on a Conformer-based 12-layer backbone.

## Results

On the GoogleTN English text normalization benchmark, the proposed method achieved 88.7% SA, 2.73 WER, 0.981 F1, and 4.7 DER, outperforming the best baseline (Duplex: 81.9% SA, 4.82 WER, 0.971 F1, 10.2 DER) and yielding a 53.9% error reduction specifically in the digit category. 

On Korean speech recognition tasks, training a baseline PIC STT model yielded slight improvements (8.75 CER on KSpon, 10.1 WER on KDigit) over the standard Conformer baseline. Fine-tuning on the raw, noisy KDent dataset severely harmed performance on domain sets (KDent WER jumped to 30.3, KDigit to 89.2) due to orthographic inconsistencies. In contrast, fine-tuning on the dual-transcription-refined KDent V2 dataset successfully resolved this, dropping the dental domain WER to 5.1 (a 69.8% relative error reduction over baseline) and maintaining strong general domain performance.

| Method | SA (%) | WER (%) | F1 | DER (%) |
|---|---|---|---|---|
| (a) WFST | 80.8 | 5.47 | 0.963 | 18.7 |
| (b) WFST+LM | 79.6 | 6.12 | 0.959 | 19.6 |
| (c) Duplex | 81.9 | 4.82 | 0.971 | 10.2 |
| (d) Proposed | 88.7 | 2.73 | 0.981 | 4.7 |

## Limitations

The English text normalization evaluation relies on TTS-synthesized speech rather than natural speech corpora due to a lack of public datasets containing paired natural audio with ground-truth spoken-written transcriptions, limiting real-world acoustic variability testing. The approach requires running both an intermediate conditional STT model and a massive 27B parameter LLM, introducing significant computational overhead. Evaluation is primarily focused on English and Korean, leaving multilingual scalability and compute optimization for future work.

## Why read this

Speech and NLP engineers building industrial speech normalization pipelines or data-centric corpus curation frameworks should read this to see how phonetic intermediate representations can constrain large language models for ambiguity resolution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech corpus cleaning, domain-adapted automatic speech recognition (ASR) data curation, and robust text normalization for text-to-speech systems.

## Institutions / 機構

DenComm, Catholic University of Korea

## Related

- (link related pages by id as the wiki grows)
