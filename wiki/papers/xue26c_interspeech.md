---
id: xue26c_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["Nanjing University", "Hong Kong University of Science and Technology", "Chinese University of Hong Kong", "University of Science and Technology Beijing", "Northwestern Polytechnical University", "Shanghai Jiao Tong University", "National Taiwan University"]
code: https://lmxue.github.io/NVV-SuperBench/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2513
pdf: https://www.isca-archive.org/interspeech_2026/xue26c_interspeech.pdf
---

# NVV-SuperBench: Beyond Words, Beyond Quality—Benchmarking Nonverbal Vocalizations in Speech Generation

*Liumeng Xue, Weizhen Bian, Jiahao Pan, Wenxuan Wu, Yilin Ren, Boyi Kang, Jingbin Hu, Ziyang Ma, Shuai Wang, Xinyuan Qian, Hung-yi Lee, Yike Guo*

[PDF](https://www.isca-archive.org/interspeech_2026/xue26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2513)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — NVV-SuperBench is a bilingual English/Chinese benchmark and multi-axis evaluation protocol for nonverbal vocalizations (NVVs) in speech generation, assessing 15 models across a unified 45-type taxonomy. It reveals that NVV controllability often decouples from speech quality, with low-SNR oral cues and long-duration affective states remaining major system bottlenecks.

## Key contributions

- A unified, model-agnostic taxonomy of 45 non-verbal vocalizations spanning 6 categories (Respiratory, Throat/Physiological, Laughter, Crying, Emotional Vocalizations, and Oral/Miscellaneous).
- A curated bilingual (English/Chinese) evaluation set of 4,500 validated instances built via an LLM-assisted seed mining, controlled generation, and iterative human/automated validation pipeline.
- A multi-axis evaluation protocol separating standard speech naturalness and quality from NVV-specific type correctness, positional placement accuracy, and perceptual salience.
- A comprehensive benchmark study of 15 representative speech generation systems (8 tag-based, 7 prompt-based, including commercial and open-source models).

## Problem

Modern speech generation and speech-language models synthesize highly intelligible and natural speech, but they often lack authentic paralinguistic elements such as laughter, sighs, gasps, and breathing cues that are essential for immersive human-computer interaction. Prior benchmarks evaluate general speech quality or isolated acoustic classification, lacking a standardized protocol to evaluate end-to-end full-sentence generation conditioned on either text-inserted tags or natural-language prompts. Consequently, researchers lack a unified framework to measure whether synthetic NVVs are placed correctly, match the requested type, and maintain perceptual salience without degrading base speech quality.

## Method

The benchmark supports two primary interaction paradigms: prompt-based control via descriptive natural-language captions and tag-based control via inline text tags (e.g., [laugh], [sigh]). The automated objective evaluation leverages a ground-truth-conditioned verification method using Gemini 2.5 Pro to constrain output transcription editing and detect target NVV presence against a transcript baseline within a fixed position tolerance delta. Speech intelligibility is measured via ASR (Whisper-large-v3 for English, paraformer-zh for Chinese), quality via DNSMOS P.835 (SIG, BAK, OVRL), and semantic caption alignment via CLAP score for prompt systems.

For tag-based controls, Precision, Recall, F1, and length-normalized tag distance (NTD) quantify controllability and placement accuracy. Subjective listening tests use a 5-point Likert scale (with a 0 score for complete NVV failures) administered via Prolific across 450 balanced samples per language. To scale evaluation, an LLM-based multi-rater protocol utilizing Gemini 2.5 Pro at a low temperature (0.2) across anonymized, randomized folds is employed with strict artifact inventories and score-capping constraints to align with human preferences.

## Experimental setup

Evaluates 15 speech generation systems: 7 prompt-based (Parler-TTS Mini/Large, CapSpeech, Qwen3-TTS, GPT-4o mini TTS, Gemini 2.5 Flash/Pro) and 8 tag-based (Bark, Higgs-Audio, ChatTTS, Fish-Speech, Orpheus TTS, CosyVoice 2, Dia, ElevenLabs). The evaluation dataset contains 4,500 balanced items (2,250 English and 2,250 Chinese instances spanning 45 types with 50 instances per type). Metrics include WER/CER, DNSMOS P.835, CLAP score, Precision/Recall/F1, Normalized Tag Distance (NTD), and Likert-scale human/LLM ratings for naturalness, quality, instruction following (IF), NVV perceptual effect (PE), and accuracy.

## Results

In prompt-based EN evaluation, Qwen3-TTS achieves the best intelligibility (2.06% WER) and CLAP score (0.45), while GPT-4o mini TTS leads on DNSMOS OVRL (3.35). In subjective testing, Gemini 2.5 Pro achieves the highest overall naturalness (4.07) and quality (4.30) in English, whereas Qwen3-TTS leads Chinese naturalness (3.45). Among tag-based systems, ElevenLabs dominates subjective listening across languages, achieving top EN naturalness (4.60), quality (4.71), and NVV PE (3.92). Orpheus TTS and ElevenLabs lead tag-based EN F1 scores (0.728 and 0.720 respectively). Ablation studies show that while enabling NVVs in ElevenLabs boosts expression (CMOS +0.93 EN, +0.52 ZH), adding them via Gemini 2.5 Pro prompts tends to decrease perceived naturalness and quality (-0.24 EN, -0.14 ZH CMOS).

| System | Paradigm | Lang | WER/CER ↓ | DNSMOS OVRL ↑ | NVV PE ↑ | F1 ↑ |
|---|---|---|---|---|---|---|
| Qwen3-TTS | Prompt | EN | 2.06 | 3.30 | – | – |
| GPT-4o mini TTS | Prompt | EN | 4.81 | 3.35 | – | – |
| Gemini 2.5 Pro | Prompt | EN | 5.40 | 3.23 | 2.68 | – |
| ElevenLabs | Tag | EN | 2.31 | 3.32 | 3.92 | 0.720 |
| Orpheus TTS | Tag | EN | 4.98 | 3.34 | 3.31 | 0.728 |
| CosyVoice 2 | Tag | EN | 3.82 | 3.45 | 2.39 | 0.463 |

## Limitations

The evaluation relies heavily on Gemini 2.5 Pro as an automated verifier and LLM judge, which can introduce model-specific biases despite multi-rater controls and low-temperature settings. The test set is currently limited to English and Chinese, omitting low-resource or highly tonal languages beyond this bilingual scope. Furthermore, human listening scales rely on crowdsourced panels (Prolific) which may exhibit variance on subtle acoustic nuances.

## Why read this

Speech and machine learning researchers building controllable generative speech models should read this paper to understand the fundamental trade-offs between inventory breadth, placement accuracy, and speech fidelity. It provides concrete benchmarks showing that high acoustic quality does not guarantee paralinguistic control, pointing directly to open challenges in modeling low-SNR oral cues and long-duration affect.

## Code

- https://lmxue.github.io/NVV-SuperBench/

## Applications

Expressive conversational agents, interactive AI voice assistants, immersive video game dubbing, and audiobook narration requiring dynamic emotional vocalizations.

## Institutions / 機構

Nanjing University, Hong Kong University of Science and Technology, Chinese University of Hong Kong, University of Science and Technology Beijing, Northwestern Polytechnical University, Shanghai Jiao Tong University, National Taiwan University

## Related

- [NV-Bench: Benchmark of Nonverbal Vocalization Synthesis for Expressive Text-to-Speech Generation](ni26_interspeech.md) — shared data / evaluation · relatedness 3.0/3
- [MoVE: Translating Laughter and Tears via Mixture of Vocalization Experts in Speech-to-Speech Translation](chen26_interspeech.md) — same problem · relatedness 2.2/3
- [Lost in Phonation: Voice Quality Variation as an Evaluation Dimension for Speech Foundation Models](lameris26_interspeech.md) — shared data / evaluation · relatedness 2.1/3
- [ParaPairAudioBench: Paralinguistic Pairwise Audio Benchmark for LALM-as-a-Judge](jeon26d_interspeech.md) — shared data / evaluation · relatedness 2.1/3
- [Synthetic Speech, Real Signal: Paralinguistic Preservation and Cross-Lingual Augmentation via Voice Cloning](polle26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
