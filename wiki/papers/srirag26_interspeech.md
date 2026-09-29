---
id: srirag26_interspeech
category: speech-llm-dialogue
labels: [dataset-or-benchmark-release, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-819
pdf: https://www.isca-archive.org/interspeech_2026/srirag26_interspeech.pdf
---

# TriageSim: A Conversational Emergency Triage Simulation Framework from Structured Electronic Health Records

*Dipankar Srirag, Quoc Dung Nguyen, Aditya Joshi, Padmanesan Narasimhan, Salil Kanhere*

[PDF](https://www.isca-archive.org/interspeech_2026/srirag26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/srirag26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-819)

**Category:** `speech-llm-dialogue` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — TriageSim is a multi-agent simulation framework that generates persona-conditioned emergency department triage dialogues (text and audio) from structured EHR seed data, producing 814 conversations (26.14 hours) to benchmark conversational triage classification. It demonstrates that clinical reasoning complexity, rather than ASR transcription noise, is the dominant bottleneck in automated triage.

## Key contributions

- Introduces a multi-agent simulation framework (Dialogue Master, Patient Agent, Nurse Agent) conditioned on structured EHR data, clinical guidelines (ATS and ESI), and demographic/behavioral personas.
- Releases a corpus of 814 synthetic triage conversations (280K tokens, 26.14 hours) featuring controlled variations in patient disfluency, accent (Australian, Chinese, Indian, Middle Eastern), and nurse experience/risk tolerance.
- Performs multi-dimensional evaluation covering linguistic/behavioral fidelity (Spearman ρ = 0.57 for disfluency), acoustic fidelity (overall WER = 10.8 via Whisper-Large-V3-Turbo, UTMOSv2 = 3.42), and medical fidelity via expert clinician review (0.94 precision, 0.96 recall for red flags).
- Evaluates conversational triage classification across synthetic text, ASR transcripts, and direct audio using models like Nemotron-3-Nano-30B, Qwen3-Next-80B, Grok-4.1-Fast, and Voxtral-Small-24B, showing fair ordinal agreement (Quadratic Weighted Cohen’s κ ≈ 0.21–0.39).

## Problem

Clinical research in emergency triage is severely restricted to static, structured electronic health records (EHR) and post-hoc triage notes due to regulatory and privacy constraints surrounding live nurse-patient interactions. Prior conversational simulation efforts focus strictly on diagnosis rather than triage, using human role-play or unconstrained text-only patient simulators that ignore audio variability, acoustic environments, and explicit triage decision frameworks. This data scarcity prevents the development and stress-testing of robust spoken dialogue systems for emergency departments under realistic acoustic and linguistic variations.

## Method

TriageSim seeds its pipeline using structured cases from MIMIC-IV-ED, the Emergency Severity Index (ESI) Handbook, and the Emergency Triage Education Kit (ETEK). Free-text clinical scenarios are converted by ED clinicians into structured representations. Structured personas are generated for patients (demographics, disfluency rate, verbosity) and nurses (experience level, risk tolerance, guideline adherence) using Gemini-3-Pro and GPT-5.2-Pro. A multi-agent framework orchestrated by a Dialogue Master governs turn-by-turn interaction: the nurse agent operates under explicit algorithmic decision policies (Australasian Triage Scale [ATS] or ESI) to query vitals, log red flags, and assign acuity, while the patient agent provides symptom descriptions without accessing ground-truth clinical states.

For speech synthesis, individual utterances are annotated with phrase boundaries for intonation and sentence breaks. Zero-shot voice cloning is performed using Qwen-3-TTS conditioned on speaker origin, gender, and personality traits. To mimic emergency department acoustic conditions, background sound events (keyboard typing, baby crying, ambulance sirens from ESC-50) are mixed at fixed gains (ambient bed at -32 dB; event sounds between -14 dB and -26 dB). The resulting corpus supports multi-modal evaluation across text, ASR outputs, and direct audio models.

## Experimental setup

The generated corpus comprises 814 conversations totaling 280K tokens and 26.14 hours across 4 accents (Australian, Chinese, Indian, Middle Eastern) and 3 LLMs (Gemini-3-Pro, GPT-5.2-Pro, Claude-Sonnet-4.5). Models evaluated for downstream conversational triage classification include text LLMs (Nemotron-3-Nano-30B, Qwen3-Next-80B, Grok-4.1-Fast) and audio-native models (Voxtral-Small-24B). Metrics include Quadratic Weighted Cohen’s κ for ordinal acuity classification, Word Error Rate (WER) using Whisper-Large-V3-Turbo, UTMOSv2 for perceptual quality, and clinician-evaluated cosine similarity via embeddinggemma-300m-medical (0.83 mean similarity for chief complaints). Total generation API cost was approximately $1,000 USD.

## Results

Conversational triage classification using Quadratic Weighted Cohen’s κ achieved modest agreement across modalities: text-based models using synthetic text scored a mean κ of 0.33 (ranging from Nemo at 0.27 to Grok at 0.39 under ATS), while ASR transcripts scored a mean κ of 0.31. Under ESI guidelines, synthetic text averaged 0.26 κ versus 0.25 κ for ASR transcripts. Direct audio classification via Voxtral achieved a κ of 0.28 under ATS and 0.27 under ESI. The performance gap between clean synthetic transcripts and noisy ASR outputs was minimal, demonstrating that conversational triage bottleneck stems from clinical reasoning rather than transcription errors.

In linguistic evaluations, patient disfluency controls showed a positive monotonic scaling (Spearman ρ = 0.57 overall; repetitions at ρ = 0.52, filled pauses at ρ = 0.33). Nurse behavioral controls functioned as intended: expert nurses exhibited higher triage confidence, low risk-tolerance induced a slightly higher over-triage rate (0.40), and strict guideline adherence increased vital-sign checking frequency (2.88 checks). Acoustic intelligibility was high overall (WER 10.8), though patient utterances (WER 16.0) exhibited higher error rates than nurse utterances (WER 5.7), particularly for Middle Eastern (19.4 WER) and Indian (16.7 WER) accents due to phonetic smoothing and short-token substitutions.

| System / Condition | ATS (Synthetic) | ATS (ASR) | ESI (Synthetic) | ESI (ASR) |
|---|---|---|---|---|
| Nemotron-3-Nano-30B | 0.27 | 0.24 | 0.21 | 0.19 |
| Qwen3-Next-80B | 0.34 | 0.32 | 0.27 | 0.27 |
| Grok-4.1-Fast | 0.39 | 0.38 | 0.30 | 0.33 |
| Mean (Text Models) | 0.33 | 0.31 | 0.26 | 0.25 |
| Voxtral-Small-24B (Audio) | 0.28 | - | 0.27 | - |

## Limitations

The dataset is constrained by synthetic generation scope, utilizing only four specific accents and a curated seed set of 814 dialogues, which may not capture the full chaotic distribution of real-world emergency departments. Expert medical fidelity evaluation was restricted to a random subset of 50 conversations reviewed by a single clinician. Furthermore, the acoustic simulation relies on mixing static background soundscapes (ESC-50) with zero-shot cloned TTS voices rather than capturing authentic multi-talker overlap, room reverberation, and high-stress physiological voice changes in actual patients.

## Why read this

Speech and NLP researchers building spoken dialogue models for high-stakes healthcare domains should read this paper to see how structured clinical data can be reliably translated into multi-turn, multi-modal conversational datasets with strict algorithmic constraints. It provides a blueprint for decoupling acoustic transcription errors from downstream clinical reasoning bottlenecks.

## Code

- https://github.com/dipankarsrirag/triage-sim.git

## Applications

Automated healthcare triage dialogue systems, robust clinical speech recognition testing under accented and disfluent conditions, and conversational AI safety evaluation for emergency medicine.

## Institutions / 機構

University of New South Wales

**Funding / 經費:** NHMRC Ideas Grant

## Related

- (link related pages by id as the wiki grows)
