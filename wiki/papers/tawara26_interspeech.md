---
id: tawara26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2912
pdf: https://www.isca-archive.org/interspeech_2026/tawara26_interspeech.pdf
---

# Who Spoke What When? Evaluating Spoken Language Models for Conversational ASR with Semantic and Overlap-Aware Metrics

*Naohiro Tawara, Samuele Cornell, Alexander Polok, Marc Delcroix, Lukáš Burget, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/tawara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tawara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2912)

**Category:** `asr`

**TL;DR** — This paper systematically evaluates LLM-based versus modular conversational ASR pipelines across diverse multi-speaker datasets and introduces tcpSemER, an embedding-based semantic error rate. Experiments show that task-specific LLMs are competitive in two-speaker settings but degrade sharply under high speaker overlap compared to modular pipelines.

## Key contributions

- Introduces tcpSemER, extending tcpWER by substituting Levenshtein distance with sentence-embedding cosine similarity to isolate meaning-altering errors from surface-level variations.
- Proposes an overlap-aware decomposition of cpWER and tcpWER to quantify error distribution across overlapping and single-speaker regions.
- Compares modular pipelines, task-specific LLMs (VibeVoice, Voxtral MTv2), and general-purpose multimodal LLMs (Gemini 3.0 Flash) across single- and multi-channel configurations.
- Demonstrates that simple multi-channel voting (MOVER) significantly improves LLM-based ASR performance but falls short of dedicated multi-channel separation fronts in high-overlap settings.

## Problem

Conversational automatic speech recognition (CASR) requires determining who spoke what and when in multi-party recordings, contending with overlapping speech, far-field noise, and varying speaker counts. While modular pipelines handle these challenges via dedicated separation and diarization frontends, emerging LLM-based systems lack systematic evaluations of their robustness under heavy overlap and distant microphone arrays. Furthermore, traditional metrics like cpWER and tcpWER penalize all token-level divergences equally and are overly sensitive to text normalization choices, obscuring whether errors actually alter semantic meaning.

## Method

The paper evaluates three architectural classes: modular pipelines (DiCoW for single-channel, NTT CHiME-8 small system for multi-channel using guided source separation, EEND-VC, and TS-VAD), task-specific long-form LLMs (VibeVoice and Voxtral MTv2, which sacrifice general assistant capabilities for multi-speaker transcription), and general-purpose multimodal LLMs (Gemini 3.0 Flash). To address the limitations of WER, the authors formulate tcpSemER. They take utterance-level reference-hypothesis pairs from the time-constrained minimum permutation alignment (tcpWER with a 5-second collar) and calculate sentence embedding cosine similarity using all-MiniLM-L12-v2.

The semantic error for an alignment pair is penalized proportionally to its semantic deviation, discounting insertions of fillers, stutters, and surface paraphrases while heavily weighting entity substitutions or negations. Additionally, word-level alignments partition total word errors into overlapping ($E^{\text{ov}}$) and non-overlapping ($E^{\text{1spk}}$) segments, yielding normalized error rates (tcpWER$^{\text{norm}}$) to measure intrinsic difficulty per region. Multi-channel integration for single-channel models is performed post-hoc via Meeting recognizer Output Voting Error Reduction (MOVER) across independent channel transcriptions.

## Experimental setup

Evaluated across three CHiME-8 DASR challenge benchmark datasets: Mixer-6 (MX6: 2 speakers, ~14% overlap, ~25-min sessions, 14 distributed mics), NOTSOFAR-1 (NSF1: 3-7 speakers, ~29% overlap, ~10-min sessions, 7-channel array), and DiPCo (4 speakers, ~25% overlap, ~35-min sessions, five 7-mic arrays with background music/reverberation). Performance is measured using cpWER, tcpWER (5s collar), tcpSemER, Diarization Error Rate (DER, 0.25s collar), and speaker-counting metrics (MAE, accuracy).

## Results

On Mixer-6 (2-speaker), VibeVoice achieves a tcpWER of 16.3% (7.5% tcpSemER) compared to 14.7% tcpWER for the modular DiCoW system, demonstrating that task-specific LLMs are highly competitive in low-complexity settings. When enhanced with multi-channel MOVER voting, VibeVoice + MOVER reaches 10.8% tcpWER, outperforming several challenge submissions. However, performance degrades severely as conversational complexity scales: on NSF1, VibeVoice hits 36.6% tcpWER and fails entirely or degrades drastically on DiPCo (70.7% tcpWER), where Gemini 3.0 Flash completely collapses (111.1% tcpWER, 97.3% tcpSemER). Overlap-aware decomposition reveals that ~90% of total errors originate from overlapping regions, where LLMs suffer from high deletion rates because they tend to output only a single dominant speaker during simultaneous speech.

| System | Setup | MX6 (tcpWER %) | NSF1 (tcpWER %) | DiPCo (tcpWER %) |
|---|---|---|---|---|
| DiCoW | 1ch | 14.7 | 24.6 | 36.8 |
| VibeVoice | 1ch | 16.3 | 36.6 | 70.7 |
| Gemini 3.0 Flash | 1ch | 115.5 | 126.3 | 111.1 |
| CH8 DASR NTT (S) | mch | 15.3 | 15.0 | 25.0 |
| VibeVoice + MOVER | mch | 10.8 | 29.5 | 59.2 |

## Limitations

The proposed tcpSemER metric inherits the underlying word and speaker alignment constraints of tcpWER, making it susceptible to downstream alignment failures. The evaluation is limited to a single embedding backbone (all-MiniLM-L12-v2) and does not yet include human validation of semantic error scores. Furthermore, LLM-based systems tested are bounded by context length limitations, prohibiting evaluation on very long sessions (e.g., >2 hours as found in CHiME-6).

## Why read this

Speech researchers and engineers building multi-speaker conversational transcription systems should read this paper to understand the breaking points of LLM-based ASR under speaker overlap. It provides concrete evidence that while LLMs capture semantics well in simple dialogues, explicit multi-channel separation and modular diarization frontends remain mandatory for complex acoustic environments.

## Code

- https://pcspeech-demo.fit.vut.cz/wsw2

## Applications

Conversational transcription, meeting note automation, multi-speaker diarization pipelines, and semantic evaluation tooling for speech-to-text models.

## Institutions / 機構

NTT, Carnegie Mellon University, Brno University of Technology

**Funding / 經費:** Ministry of Education, Youth and Sports of the Czech Republic

## Related

- (link related pages by id as the wiki grows)
