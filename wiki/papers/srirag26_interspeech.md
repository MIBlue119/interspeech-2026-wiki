---
id: srirag26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-819
pdf: https://www.isca-archive.org/interspeech_2026/srirag26_interspeech.pdf
---

# TriageSim: A Conversational Emergency Triage Simulation Framework from Structured Electronic Health Records

[PDF](https://www.isca-archive.org/interspeech_2026/srirag26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/srirag26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-819)

**TL;DR** — TriageSim is a framework that generates persona-conditioned, multi-turn emergency department triage dialogues with aligned audio and transcripts from structured electronic health records, producing a corpus of 814 simulated conversations.

## Problem

Clinical datasets for emergency triage are largely restricted to structured electronic health records or post-hoc notes because regulatory and privacy constraints prevent the recording of real nurse-patient interactions. Consequently, existing conversational models fail to incorporate spoken dialogue, acoustic variations, accent diversity, or explicit triage decision frameworks. Overcoming this gap is critical for developing and evaluating speech-enabled clinical decision support systems.

## Method

The framework uses a multi-agent LLM architecture comprising a dialogue master, a nurse agent, and a patient agent, seeded with clinical vignettes from MIMIC-IV-ED, the ESI Handbook, and the ETEK manual. Nurse agents are governed by standard triage algorithms (Australasian Triage Scale or Emergency Severity Index) and structured personas controlling experience level and risk tolerance, while patient agents simulate demographics, language proficiency, and disfluency rates. Individual utterances are annotated for phrase boundaries to guide prosodic control, followed by zero-shot voice cloning using Qwen-3-TTS across four accent groups (Australian, Chinese, Indian, Middle Eastern). The resulting audio is mixed with ESC-50 background emergency department soundscapes (ambient beds at -32 dB and events between -14 dB and -26 dB).

## Results

The generated corpus contains 814 conversations (totaling ~280K tokens and 26.14 hours) balanced across acuity levels 1 through 5. Linguistic evaluation shows positive correlation between intended and realized patient disfluency (Spearman's rho = 0.57), and nurse experience predictably scales final triage confidence. Acoustic evaluation reveals an overall Word Error Rate of 10.8% using Whisper-Large-V3-Turbo (nurse utterances at 5.7 WER, patient utterances at 16.0 WER), high speaker consistency (99.98), and an average UTMOSv2 perceptual quality score of 3.42. Medical fidelity evaluated by an expert clinician shows a mean cosine similarity of 0.83 for chief complaints and 0.94 precision / 0.96 recall for red-flag identification. Downstream conversational triage classification across text, ASR outputs, and direct audio yields modest quadratic weighted Cohen's kappa scores (ranging roughly from 0.19 to 0.39 across models like Nemotron, Qwen, Grok, and Voxtral), indicating that clinical reasoning complexity is the primary bottleneck rather than transcription noise.

## Code

- https://github.com/dipankarsrirag/triage-sim.git

## Applications

Speech and ML engineers can use this framework and corpus to evaluate conversational speech recognition robustness, spoken dialogue systems, and automated clinical triage models under realistic acoustic and linguistic variations.

## Limitations

Conversational triage performance remains intrinsically challenging with low-to-modest agreement scores across modalities, and synthetic patient speech exhibits higher error rates for specific accents such as Middle Eastern and Indian English.

## Related

- (link related pages by id as the wiki grows)
