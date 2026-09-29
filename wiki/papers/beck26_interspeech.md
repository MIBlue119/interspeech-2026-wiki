---
id: beck26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2047
pdf: https://www.isca-archive.org/interspeech_2026/beck26_interspeech.pdf
---

# AppTek Call-Center Dialogues: A Multi-Accent Long-Form Benchmark for English ASR

*Eugen Beck, Sarah Beranek, Uma Moothiringote, Daniel Mann, Wilfried Michel, Katie Nguyen, Taylor Tragemann*

[PDF](https://www.isca-archive.org/interspeech_2026/beck26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/beck26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2047)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — The AppTek Call-Center Dialogues corpus is a 129-hour multi-accent, long-form conversational English ASR benchmark designed to prevent training-data contamination. Benchmarking 12 open-source ASR models reveals severe performance drops across diverse accents and strong sensitivity to segmentation strategies.

## Key contributions

- Introduces a new 128.6-hour evaluation corpus of spontaneous, role-played agent-customer call-center dialogues spanning 14 English accents and 16 service domains.
- Ensures zero data contamination by commissioning all audio and transcripts from scratch, keeping them completely absent from public web-scraping pipelines.
- Provides a multi-stage human QA protocol with guided-recognition consistency checks and verbatim transcription capturing rich conversational phenomena.
- Establishes a rigorous multi-model benchmark suite evaluating 12 open-source ASR architectures under diverse segmentation approaches (manual, VAD, fixed windows).

## Problem

Evaluating modern speech recognition systems for conversational AI is hindered by public benchmarks that rely heavily on pre-segmented, read, or prepared speech rather than spontaneous, interactive dialogues. Furthermore, large open-weight foundation models are frequently trained on massive, uncurated web scrapes, risking severe data contamination and overestimating real-world robustness. This gap leaves developers without reliable ways to test how well ASR systems handle acoustic diversity, disfluencies, domain-specific terminology, and long-form conversational flow across global English accents.

## Method

The AppTek Call-Center Dialogues dataset comprises 1,746 split-channel audio recordings (16 kHz, 16-bit linear PCM WAV) captured from 156 speakers across 14 distinct English accent groups using consumer hardware like laptops and phones. Transcriptions follow a strict verbatim protocol preserving filled pauses, false starts, and hesitations, paired with a multi-round human quality assurance pipeline that incorporates a 4-gram guided-recognition consistency check to flag and correct anomalous segments.

For evaluation, twelve prominent open-source ASR models—ranging from 0.6B to 8B parameters, including NVIDIA Parakeet, Qwen3-ASR, OpenAI Whisper, IBM Granite, and Kyutai STT—are benchmarked under various segmentation schemes. These range from manual ground-truth boundaries and AppTek's proprietary segmenter to Silero VAD and fixed-length 30-second and 60-second windows. Scoring follows the Hugging Face OpenASR protocol with standardized case, punctuation, and number normalization, alongside a dataset-specific normalization script that strips evaluated disfluencies to isolate core recognition errors.

## Experimental setup

The benchmark uses 128.6 hours of dialogue speech across 14 accent categories (e.g., Australian, Canadian, Chinese, Indian, Scottish, South African, AAVE). Systems evaluated include NVIDIA Canary-1B v2, Parakeet 0.6B TDT (v2/v3), NeMo Canary-Qwen-2.5B, IBM Granite Speech (2B/8B), Kyutai STT 2.6B, Microsoft Phi-4 Multimodal, Alibaba Qwen3-ASR (0.6B/1.7B), and OpenAI Whisper Large (v2/v3). Recognition performance is measured using Word Error Rate (WER) aggregated per session.

## Results

Manual segmentation consistently yields the lowest average WER across nearly all evaluated systems, demonstrating that robust boundary detection remains critical for long-form conversational inputs. Among the tested architectures, Alibaba's Qwen3-ASR 1.7B achieves the strongest overall performance with an average WER of 7.9% under manual segmentation and 7.4% under 60-second fixed chunking, whereas Whisper Large v2 struggles significantly on conversational formatting without strict chunking (up to 48.4% WER on 30s blocks).

Accent robustness evaluations expose massive performance disparities: the error gap between best- and worst-performing accents frequently exceeds 10% absolute, with Singaporean (en-SG), Chinese (en-CN), and Indian (en-IN) English yielding notably higher error rates than Australian (en-AU) and General US English. Crucially, the relative gap between best and worst accents does not scale with average model accuracy, proving that overall WER improvements do not guarantee better accent equity.

| Model | Size | Manual | AppTek Seg. | Silero VAD | 30s Fixed | 60s Fixed |
|---|---|---|---|---|---|---|
| Qwen3-ASR | 1.7B | 7.9% | 8.0% | 8.3% | 7.8% | 7.4% |
| Parakeet v3 | 0.6B | 8.8% | 9.0% | 9.2% | 9.9% | 12.1% |
| Canary-Qwen 2.5B | 2.5B | 8.6% | 9.2% | 9.2% | 8.9% | 10.0% |
| Whisper Large v3 | 1.5B | 10.7% | 18.9% | 15.0% | 42.9% | — |
| Granite Speech | 8B | 10.5% | 10.9% | 11.9% | 12.2% | 13.8% |
| Kyutai STT | 2.6B | 11.1% | 11.1% | 11.3% | 12.1% | 13.2% |

## Limitations

The dataset is constrained to role-played call-center scenarios, meaning speakers may lack deep familiarity with highly technical domain jargon. Gender distributions are skewed toward female participants overall (65% vs 35%), and imbalances are more pronounced in specific accent subsets like British and South African English. Accent categories are treated as monolithic discrete groups despite internal regional dialectal variations, and no formal inter-annotator agreement metrics were computed.

## Why read this

Speech researchers and conversational AI engineers should read this paper to understand the limits of web-scraped ASR benchmarks and how long-form conversational structure and diverse global accents degrade state-of-the-art open-source models.

## Code

- https://huggingface.co/datasets/apptek-com/apptek_callcenter_dialogues

## Applications

Automated call-center speech recognition, voice-driven customer service automation, and robust multi-accent conversational AI systems.

## Institutions / 機構

AppTek

## Related

- (link related pages by id as the wiki grows)
