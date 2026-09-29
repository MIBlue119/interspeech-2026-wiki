---
id: farsi26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised, dataset-or-benchmark-release]
institutions: ["Amirkabir University of Technology", "King's College London", "Kartal OL Foundation"]
code: https://github.com/Kartalol/Kartalol-azb-asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1516
pdf: https://www.isca-archive.org/interspeech_2026/farsi26_interspeech.pdf
---

# Preserving the Iranian Turkic Language: Community-Driven ASR Datasets and Benchmarking for South Azerbaijani

*Farhan Farsi, Shayan Bali, Jalil Nourmohammadi Khiarak, Mohammad Hossein Aref, Taher Akbari Saeed*

[PDF](https://www.isca-archive.org/interspeech_2026/farsi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/farsi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1516)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — This paper introduces the first comprehensive community-driven ASR datasets and benchmarks for South Azerbaijani, a severely low-resource Turkic language written in Arabic script. By benchmarking MMS and various Whisper models, the authors demonstrate that full-dataset fine-tuning significantly improves generalization, with fine-tuned MMS achieving the best GoldSet performance (0.63 WER) despite remaining orthographic and script ambiguity challenges.

## Key contributions

- Releases the Community Dataset comprising over 25 hours of speech from 14 native speakers reading book texts across diverse consumer devices.
- Curates a large External Dataset of ~250,000 utterances (447.64 hours) by transliterating North Azerbaijani pseudo-labeled and VoxLingua107 speech into Arabic-script South Azerbaijani orthography.
- Introduces the AZB ASR GoldSet, a challenging evaluation benchmark of 17.49 hours (3,021 utterances) featuring spontaneous, diverse speech from 62 speakers.
- Comprehensive benchmarking of eight models (MMS-1B-All and Whisper variants) across different training regimes and cross-lingual initializations, paired with an in-depth error analysis.

## Problem

South Azerbaijani is spoken by over 15 million people in Iran but lacks publicly available annotated speech corpora, pre-trained models, and standardized evaluation benchmarks. While prior models like Whisper support various Turkic languages, they completely omit South Azerbaijani during pre-training. Furthermore, North Azerbaijani resources use Latin script, creating a severe orthographic mismatch since South Azerbaijani uses Arabic script, which introduces major phonetic ambiguities and spelling inconsistencies.

## Method

The training pipeline utilizes two primary model families: the non-autoregressive CTC-based MMS-1B-All and the autoregressive encoder-decoder Transformer Whisper family (Tiny, Base, Small). Additionally, cross-lingually fine-tuned Whisper models initialized from Turkish, North Azerbaijani, Persian, and Arabic weights are evaluated to study linguistic and script transfer. Training configurations include a Community-only regime (25 hours) and a Full-Dataset regime combining community speech with 447 hours of transliterated external data.

All audio inputs are resampled to 16 kHz. Models are fine-tuned using a batch size of 8, for 10 epochs, with a learning rate of 1e-4 under FP16 mixed-precision on NVIDIA A100 and Tesla V100 GPUs. The best checkpoint is chosen via validation loss, with maximum generation length capped at 225 tokens. Preprocessing includes digit-to-word expansion, symbol conversion, Unicode normalization, punctuation removal, and the elimination of non-Arabic-script characters to minimize label sparsity.

## Experimental setup

Evaluations rely on three disjoint test partitions: External Test Set (1,135 utterances), Community Test Set (367 utterances), and the AZB ASR GoldSet (3,021 utterances, 17.49 hours). Baselines encompass non-fine-tuned MMS-1B-All, fine-tuned MMS, standard Whisper-Tiny/Base/Small, and cross-lingually adapted Whisper variants. Performance is measured via Word Error Rate (WER) and Character Error Rate (CER), alongside Deletion/Insertion Ratios.

## Results

Full-dataset fine-tuning consistently outperforms community-only training on out-of-domain evaluation; Whisper-Base fine-tuned on the full dataset achieves 64.0% WER and 44.0% CER on the External test set. For the challenging GoldSet, MMS fine-tuned on the Community dataset achieves the best overall performance with 0.63 WER and 0.18 CER, benefiting from its non-autoregressive CTC structure in low-resource settings.

Cross-lingual adaptation from Turkish and North Azerbaijani yields substantial gains over baseline Whisper-Small on in-domain evaluation (e.g., Whisper-Small-Turkish achieves 29.0% WER on the Community set), confirming that shared linguistic family features outweigh mere script sharing (Arabic-adapted models underperform). Main failure modes stem from short utterances (<10s yielding ~0.78 WER due to high deletion rates) and long sequences (>30s suffering from cumulative decoding drift).

| System & Configuration | External WER/CER (%) | Community WER/CER (%) | GoldSet WER/CER (%) |
|---|---|---|---|
| Whisper-Base (Full Dataset) | 64.0 / 44.0 | 49.0 / 41.0 | 70.0 / 28.0 |
| Whisper-Base (Community-only) | 122.0 / 68.0 | 33.0 / 14.0 | 84.0 / 36.0 |
| MMS (No Fine-Tune) | 106.0 / 50.0 | 70.0 / 29.0 | 73.0 / 24.0 |
| MMS (Community-only Fine-Tune) | - | 50.0 / 19.0 | 63.0 / 18.0 |
| Whisper-Small-Turkish (Community) | 159.0 / 96.0 | 29.0 / 12.0 | 79.0 / 29.0 |

## Limitations

The Community dataset is limited to 25 hours due to manual collection bottlenecks, and external audio relies on North Azerbaijani speech which introduces minor acoustic and dialectal mismatch despite expert transliteration. Pseudo-labeling pipelines used for external data introduce transcription noise. Hardware and budget constraints precluded full-dataset fine-tuning across all larger model sizes and prolonged training epochs.

## Why read this

Speech and ML researchers building low-resource ASR systems will find this paper a vital blueprint for community-driven data curation, cross-lingual transfer, and orthographic normalization. It provides rare comparative data between CTC-based and autoregressive encoder-decoder architectures under extreme data scarcity.

## Code

- https://github.com/Kartalol/Kartalol-azb-asr

## Applications

Building speech-to-text transcription tools, voice search engines, and archiving systems for South Azerbaijani and other underrepresented Arabic-script Turkic languages.

## Institutions / 機構

Amirkabir University of Technology, King's College London, Kartal OL Foundation

**Funding / 經費:** Kartal Ol Foundation, YoYo research group

## Related

- (link related pages by id as the wiki grows)
