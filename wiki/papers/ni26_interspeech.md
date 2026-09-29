---
id: ni26_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["Chinese University of Hong Kong-Shenzhen", "Shenzhen Loop Area Institute", "Amphion Technology"]
code: https://charlesnii.github.io/nvbench.github.io
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2211
pdf: https://www.isca-archive.org/interspeech_2026/ni26_interspeech.pdf
---

# NV-Bench: Benchmark of Nonverbal Vocalization Synthesis for Expressive Text-to-Speech Generation

*Qinke Ni, Huan Liao, Dekun Chen, Yuxiang Wang, Zhizheng Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/ni26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ni26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2211)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — NV-Bench is the first public, multi-lingual benchmark for nonverbal vocalization (NV) text-to-speech synthesis, featuring 1,651 human-paired in-the-wild utterances across 14 categories and a dual-dimensional evaluation protocol. It establishes that proposed objective metrics like Paralinguistic Character Error Rate strongly correlate with human perception.

## Key contributions

- Released NV-Bench: 1,651 multi-lingual, in-the-wild utterances paired with human ground-truth audio, balanced across 14 NV categories (vegetative, affect bursts, conversational grunts).
- Developed a dual-dimensional evaluation protocol separating Instruction Alignment (via a novel Paralinguistic CER) from Acoustic Fidelity (via Fréchet distance and speaker similarity).
- Trained a robust multi-lingual NVASR model (built on SenseVoice-Small) achieving 1.29% CER on SMIIP-NV to serve as an automated benchmark evaluator.
- Benchmarked several state-of-the-art TTS architectures (CosyVoice2, CosyVoice3, FlexiVoice, Orpheus-TTS) and introduced high-performance reference baselines (NV-CV3 and NV-FlexiVoice).

## Problem

Recent expressive TTS models increasingly incorporate nonverbal vocalizations (NVs) like laughter, sighs, and filled pauses, but current methods treat them as generic sound effects rather than pragmatic communicative acts. Furthermore, evaluation lacks standardized multi-lingual benchmarks with authentic human ground-truth reference audio, relying instead on internal testsets, coarse event presence/absence checks, or text-rewritten references. This makes it impossible to reliably quantify controllability, intelligibility, or the acoustic gap to real recordings.

## Method

The benchmark construction pipeline begins by crawling 565,316 raw audio clips (approx. 1,560 hours) from 2025 online audiovisual media. Candidate segments are processed through the Emilia-Pipe for standardization and speaker diarization, followed by MiMo-Audio-7B-Instruct to filter out residual multi-speaker artifacts. Ten expert annotators then verify and correct the transcripts, yielding 1,651 clean utterances (7.9 hours) at 24 kHz MP3 format. The multi-lingual NVASR evaluator is built by fine-tuning SenseVoice-Small using Connectionist Temporal Classification (CTC) loss on a consolidated corpus (Emilia-NV, NVTTS, DisfluencySpeech, NVS, SMIIP-NV, MNV-17) mapped to Level 3 of the AudioSet Ontology.

For TTS benchmarking, the authors fine-tuned CosyVoice3 (CV3) and FlexiVoice (0.5B) models on the consolidated NV corpus using AdamW with a learning rate of 1e-5 on 4 NVIDIA A800 GPUs. Inferred systems are evaluated against human ground truth using Paralinguistic CER (PCER) for instruction alignment, and Fréchet Audio Distance (FAD), Fréchet Distance (FD), DNSMOS, and WavLM speaker similarity (SIM) for acoustic fidelity. These choices isolate whether a model fails by omitting an NV event or by generating poor audio quality.

## Experimental setup

NV-Bench comprises 1,651 utterances divided into a strictly balanced single-label subset (50 samples per category, 650 Mandarin and 350 English) and a relatively balanced multi-label subset. Baselines compared include Orpheus-TTS, SMIIP-NV-CV2, Emilia-NV-CV2, CosyVoice3, NV-FlexiVoice, and NV-CV3. Metrics include CER, Overall CER (OCER), Paralinguistic CER (PCER), Fréchet Audio Distance (FAD), Fréchet Distance (FD), DNSMOS, WavLM Speaker Similarity (SIM), Coherence MOS, and Instruction MOS.

## Results

On the Mandarin single-label subset, NV-CV3 achieved the lowest PCER (27.69%) and OCER (4.90%), outperforming baseline CosyVoice3 (PCER 57.69%, OCER 5.86%). For acoustic fidelity, NV-FlexiVoice achieved the lowest FAD (0.29) and FD (2.72), indicating close alignment with real-world distributions. Subjectively, human evaluation showed IMOS has a strong negative Spearman correlation with PCER (rho = -0.65, p < 0.001), proving that objective metrics track human perception. Systems struggled most with dense multi-label conversational grunts, where English PCERs remained higher across almost all models.

| System | Single CER (%) | Single PCER (%) | Multi CER (%) | Multi PCER (%) | FAD |
|---|---|---|---|---|---|
| GT (Mandarin) | 3.86 | 9.38 | 3.79 | 23.71 | - |
| CosyVoice3 | 3.85 | 57.69 | 4.75 | 61.94 | 0.90 |
| Emilia-NV-CV2 | 5.05 | 40.00 | 5.54 | 48.74 | 1.08 |
| NV-FlexiVoice | 6.98 | 31.08 | 8.20 | 39.37 | 0.29 |
| NV-CV3 | 3.80 | 27.69 | 3.44 | 30.04 | 0.86 |

## Limitations

The dataset scale is limited to 1,651 utterances (7.9 hours) due to the rigorous manual verification required for in-the-wild audio purity. Language coverage is strictly restricted to Mandarin and English. The benchmark evaluates explicit prompt-based control and does not address spontaneous generation of NVs from pure text without explicit tags.

## Why read this

Researchers and engineers building expressive, conversational TTS systems will learn how to rigorously evaluate nonverbal vocalizations using automated proxy metrics that correlate with human judgment instead of relying on subjective listening tests.

## Code

- https://charlesnii.github.io/nvbench.github.io

## Applications

Conversational speech assistants, expressive audiobook synthesis, digital avatar voice generation, and interactive voice-response systems requiring natural laughs, sighs, and hesitations.

## Institutions / 機構

Chinese University of Hong Kong-Shenzhen, Shenzhen Loop Area Institute, Amphion Technology

**Funding / 經費:** Internal Project Fund from Shenzhen Research Institute of Big Data, Program for Guangdong Introducing Innovative and Entrepreneurial Teams

## Related

- (link related pages by id as the wiki grows)
