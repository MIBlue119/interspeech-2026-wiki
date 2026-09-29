---
id: kumar26h_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release]
institutions: ["Indian Institute of Technology Bombay", "University of Science and Technology", "University of Delhi", "BharatGen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2607
pdf: https://www.isca-archive.org/interspeech_2026/kumar26h_interspeech.pdf
---

# VāṇīSetu: A Human-AI Collaborative Framework for Scalable Conversational Speech Corpus Creation in Low-Resource Settings

*Rishabh Kumar, Dhruv Kudale, Chriss Philip Saji, Abhinav Painuli, John Nirmal, Ganesh Ramakrishnan*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2607)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — V¯an.¯ıSetu is a human-AI collaborative framework designed to build scalable speech corpora in low-resource, code-mixed settings, achieving a 61.1% reduction in human annotation effort on the 100-hour KrishiV¯an.¯ı Hindi agricultural dataset.

## Key contributions

- A role-separated, incentive-linked validation architecture (Annotator → Validator → Verifier) featuring threshold-gated quality control (λ = 5%, δ = 2%).
- KrishiV¯an.¯ı, a 100-hour Hindi conversational agricultural speech corpus featuring dense code-mixing, background noise, and complete demographic metadata.
- Empirical demonstration that smaller fine-tuned sequence-to-sequence LMs (mT5-small) outperform much larger LLMs (LLaMA-3-Nanda-10B, ChatGPT-4o mini) for domain-specific ASR post-correction.
- An instrumented, open-source modification of the V¯agyojaka annotation interface that supports multi-stage editing, transliteration assistance, and issue flagging.

## Problem

Robust speech technologies fail in multilingual, low-literacy rural regions due to domain-specific challenges like spontaneous noisy speech, regional dialects, and heavy code-mixing. While high-resource ASR has advanced, collecting domain-specific training data in-the-wild remains an expensive and labor-intensive bottleneck, typically costing 6 to 8 times real-time per hour of audio. Fully manual transcription is prohibitively slow, whereas fully automatic pipelines degrade rapidly on informal conversational audio.

## Method

The V¯an.¯ıSetu pipeline processes audio through four main stages: domain-guided collection, automated corpus construction, LM/LLM post-correction, and layered human refinement. Raw YouTube videos are filtered using bilingual agricultural keywords, downsampled to 16 kHz mono WAV, segmented via Voice Activity Detection (VAD into chunks ≤ 20 seconds), and diarized using PyAnnote. Transcripts are generated using IndicWav2Vec and KVWav2Vec models with beam search, then aligned to audio tokens via a CTC-based aligner.

For automated post-correction, lightweight sequence-to-sequence models (mT5-small, ByT5-small) are fine-tuned on paired ASR outputs and corrected transcripts to fix lexical distortions and segmentation errors, while larger models like LLaMA-3-Nanda-10B and ChatGPT-4o are evaluated via supervised fine-tuning and in-context learning. The human refinement stage utilizes a role-separated workflow across Annotators (A), Validators (B), and Verifiers (C) through the enhanced V¯agyojaka tool. Quality is incentivized via financial compensation paired with error-rate reward gates (e.g., granting bonuses if edit error rates fall below λ=5% and δ=2%).

## Experimental setup

Evaluated on the 100-hour KrishiV¯an.¯ı Hindi corpus containing a 2.5-hour test set split into KV-Known (in-domain, speaker overlap), KV-Unknown (in-domain, disjoint speakers), and KV-OOD (out-of-domain). Baselines include IndicWav2Vec and IndicConformer. ASR fine-tuning uses 75 hours of speech (65h IndicVoice + 10h KrishiV¯an.¯ı-train) on wav2vec 2.0 CTC architecture.

## Results

On the KV-Known split, the domain-adapted KVWav2Vec model achieves a Word Error Rate (WER) of 22.38% (outperforming IndicWav2Vec at 23.70% and IndicConformer at 24.20%), and 26.04% on KV-Unknown. For post-correction, fine-tuned mT5-small achieves the lowest WER on in-domain splits (22.29% on KV-Known, 25.70% on KV-Unknown), outperforming LLaMA-3 (26.37%) and ChatGPT-4o (23.59%), though ChatGPT-4o leads on the out-of-domain OOD split (22.62%). The full V¯an.¯ıSetu framework achieves a 61.1% reduction in annotation effort over manual transcription with high inter-annotator agreement (Krippendorff’s alpha = 0.87).

| System / Condition | KV-Known (WER %) | KV-Unknown (WER %) | KV-OOD (WER %) |
|---|---|---|---|
| IndicWav2Vec | 23.70 | 28.57 | 22.41 |
| IndicConformer | 24.20 | 26.84 | 28.56 |
| KVWav2Vec (Base) | 22.38 | 26.04 | 24.61 |
| + ByT5 Post-Correction | 24.33 | 26.77 | 25.12 |
| + mT5 Post-Correction | 22.29 | 25.70 | 24.35 |
| + ChatGPT-4o Post-Correction | 23.59 | 26.35 | 22.62 |

## Limitations

The framework's evaluation is currently limited to a single language pair (Hindi-English code-mixed agricultural domain) and relies on web-mined YouTube video audio which may contain residual normalization artifacts. The approach requires a pre-existing seed vocabulary or keyword list for domain-targeted YouTube scraping, and the incentive-linked validation workflow assumes access to funded human annotator pools.

## Why read this

Speech and ML engineers building ASR systems for low-resource, code-mixed conversational domains should read this to see how a structured human-AI validation loop and smaller fine-tuned LMs can drastically cut data curation costs without hurting linguistic fidelity.

## Code

- https://github.com/KrishiVaani/KrishiVaani

## Applications

Development of robust speech recognition, automated transcription tools, and domain-specific spoken language datasets for low-resource and code-mixed environments.

## Institutions / 機構

Indian Institute of Technology Bombay, University of Science and Technology, University of Delhi, BharatGen

**Funding / 經費:** BharatGen

## Related

- (link related pages by id as the wiki grows)
