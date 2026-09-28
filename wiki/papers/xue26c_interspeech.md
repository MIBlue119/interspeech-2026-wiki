---
id: xue26c_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2513
pdf: https://www.isca-archive.org/interspeech_2026/xue26c_interspeech.pdf
---

# NVV-SuperBench: Beyond Words, Beyond Quality—Benchmarking Nonverbal Vocalizations in Speech Generation

[PDF](https://www.isca-archive.org/interspeech_2026/xue26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2513)

**TL;DR** — NVV-SuperBench is a bilingual English/Chinese benchmark for speech generation that evaluates nonverbal vocalizations (NVVs) across a unified 45-type taxonomy and multi-axis protocol, revealing that low-SNR oral cues and long-duration affective NVVs remain persistent bottlenecks across 15 tested systems.

## Problem

Current speech generation models focus heavily on lexical content while neglecting nonverbal vocalizations (NVVs) like laughter, sighs, and gasps, which are vital for natural emotional communication. Standardized evaluation frameworks for full-sentence NVV synthesis are currently lacking, making it difficult to assess whether systems can correctly generate, place, and maintain the salience of these nonverbal cues without harming overall speech quality. Furthermore, existing systems and datasets cover a highly skewed, inconsistent subset of NVVs using fragmented labels.

## Method

The benchmark provides a unified taxonomy spanning six top-level categories (Respiratory, Throat/Physiological, Laughter Spectrum, Crying Spectrum, Emotional Vocalizations, and Oral/Miscellaneous) containing 45 fine-grained NVV types. It supports two control interfaces: tag-based control (inserting tags into text) and prompt-based control (natural-language captions). The dataset is built via a three-stage pipeline: LLM-assisted seed mining from expressive human speech (InstructTTSEval annotated by Gemini 2.5 Pro and human auditors), taxonomy-driven controlled generation using Gemini 2.5 Pro, and iterative automatic/manual validation yielding 2,250 instances per language (4,500 total). Evaluation combines objective metrics, human subjective listening tests, and LLM-based multi-rater evaluation across 15 representative systems (8 tag-based and 7 prompt-based).

## Results

The authors benchmarked 15 systems including commercial and open-source tag-based and prompt-based models (such as ElevenLabs, CosyVoice 2, ChatTTS, and Gemini). Results show that NVV controllability often decouples from overall speech quality, and standard objective metrics (like WER/CER) frequently penalize non-lexical segments. High-salience events like laughter, basic respiratory breaths, and bursty events (coughs, sneezes, gasps) achieve higher perceptual effect (PE) scores. Conversely, low-SNR oral cues (e.g., tsk, lipsmack, swallows) and long-horizon affect (e.g., crying, sobbing, wailing) are the hardest types to synthesize. ElevenLabs emerges as the strongest tag-based system with high coverage and strong PE, whereas prompt-based systems like Gemini 2.5 Pro show dense coverage but gain little expressiveness from captions while risking drops in naturalness.

## Code

- https://lmxue.github.io/NVV-SuperBench/

## Applications

Speech engineers and researchers developing text-to-speech or conversational AI models can use this benchmark to systematically evaluate and improve the emotional expressiveness, conversational realism, and nonverbal control of their speech generation systems.

## Limitations

Existing speech systems cover a limited subset of NVVs (tag-based inventories typically implement only 1 to 13 out of 45 types), and prompt-only NVV captioning tends to increase generation burden without reliable perceptual benefits.

## Related

- (link related pages by id as the wiki grows)
