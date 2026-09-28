---
id: jiang26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-606
pdf: https://www.isca-archive.org/interspeech_2026/jiang26c_interspeech.pdf
---

# Beyond WER: A Paired Acoustic Stress Test for Ambient Clinical Scribes

*Xiao-Hang Jiang, Hanjie Guo, Ying-Si Liang, Yang Ai, Zhen-Hua Ling, Lei Jiang, Zhi-Yang He*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-606)

**TL;DR** — The paper introduces a paired acoustic stress test to evaluate how acoustic noise in ASR-to-LLM clinical scribes causes downstream safety failures, discovering that stationary ambient noise can double unsafe outputs while inflating Word Error Rate by less than 1 percentage point.

## Key contributions

- Develops a controlled, paired acoustic stress test using an Objective Structured Clinical Examination (OSCE) framework to isolate the causal impact of acoustic noise on downstream clinical reasoning.
- Proposes an acoustic interference taxonomy distinguishing stationary ambient interference (spectral masking, negation slips) from non-stationary semantic interference (overlapping speech, hallucinated entities).
- Establishes a clinician-audited benchmark of 272 dialogues (approx. 52 hours) paired with diverse noise injections at varying Signal-to-Noise Ratios.
- Introduces an evidence-grounded hybrid agent leveraging verbatim span constraints and a symbolic filter to reduce high-risk clinical hallucinations without requiring model fine-tuning.

## Problem

Ambient clinical scribes cascading ASR and LLMs are vulnerable to error propagation, where minor misrecognitions lead to severe diagnostic or triage errors. Traditional robustness evaluations rely on Word Error Rate (WER), which treats all token errors equally and creates an illusion of accuracy by masking safety-critical semantic drift like flipped negations or altered units. The field lacked a systematic framework to answer how and why specific acoustic distortions drive downstream safety degradation.

## Method

The evaluation pipeline processes an audio signal through WHISPER-LARGE-V3 via deterministic greedy decoding (temperature=0, 30s window) to generate transcript x, which is mapped into a structured clinical object y by QWEN3-235B-A22B-INSTRUCT-2507 using fixed prompts and a 3-point triage scale. The setup uses 272 OSCE English dialogues (approx. 52 hours) across five medical specialties, downmixed, normalized, and mixed with DEMAND (stationary office, cafeteria, traffic) and MUSAN (non-stationary speech babble) noise corpora at 15 dB, 10 dB, and 5 dB SNRs. To decouple generation stochasticity, downstream LLM instructions, schemas, and decoding configurations are strictly frozen across paired clean and noisy conditions.

To mitigate severe degradation at 5 dB, the authors propose an Evidence-Grounded Hybrid Agent using a dual-view context where a Draft Extractor generates structured JSON with verbatim source quotes, and a Guard Verifier audits the draft against the raw text. A deterministic symbolic evidence filter checks whether quotes are exact substrings of the raw transcript, discarding unsupported content and defaulting high-stakes fields to null if evidence is missing.

## Experimental setup

Evaluated on 272 OSCE-style English encounters (52 hours) spanning respiratory, cardiovascular, gastrointestinal, musculoskeletal, and dermatological specialties. Baselines and conditions compare clean-ASR reference against DEMAND and MUSAN noise injections at 15 dB, 10 dB, and 5 dB SNRs using WHISPER-LARGE-V3 and QWEN3-235B-A22B-INSTRUCT-2507. Metrics include Word Error Rate (WER), Insertion Rate (InsRate), Negation Error Rate (NegErr), Error Propagation Rate (ErrProp), Paired Triage Match, Safety-Critical Error Rate (SCER), Under-Triage Rate, Mean G-Eval Score (1-5 scale), and Unsafe Rate.

## Results

Under 15 dB stationary ambient interference (DEMAND), WER increased by a modest 0.71 percentage points (from 16.54% to 17.25%), yet the Unsafe Rate nearly doubled from 13.60% to 27.21%, and the Safety-Critical Error Rate (SCER) reached 44.12%. Under non-stationary semantic interference (MUSAN) at 5 dB, WER surged to 54.68% and the Unsafe Rate reached 91.54% with a Triage Match drop to 81.99%. 

Deploying the evidence-grounded hybrid agent under semantic 5 dB conditions reduced the Unsafe Rate from 70.96% to 70.96% (ambient 5 dB reduced unsafe rate from 40.44% to 33.46% and SCER from 66.18% to 51.84%), demonstrating that symbolic constraints effectively prune unsupported high-risk content via abstention.

| Condition | WER (%) | TriageMatch (%) | SCER (%) | Mean Score | Unsafe (%) |
|---|---|---|---|---|---|
| Reference (clean-ASR) | 16.54 | 100.00 | 0.00 | 4.62 | 13.60 |
| MUSAN Speech 15 dB | 21.16 | 91.91 | 75.37 | 3.92 | 66.91 |
| MUSAN Speech 5 dB | 54.68 | 81.99 | 92.28 | 3.41 | 91.54 |
| DEMAND Office 15 dB | 17.25 | 93.01 | 44.12 | 4.45 | 27.21 |
| DEMAND Office 5 dB | 20.63 | 91.54 | 66.18 | 4.23 | 40.44 |
| Mitigation (Ambient 5 dB) | 20.63 | 92.28 | 51.84 | 4.36 | 33.46 |

## Limitations

The evaluation relies on a single open-source OSCE clinical corpus covering five specialties in English, which may not capture the full linguistic and dialectal diversity of real-world clinical environments. The study tests specific fixed model pairs (Whisper-Large-V3 and QWEN3-235B), leaving open whether findings generalize to smaller or differently trained architectures. Furthermore, the mitigation framework trades documentation completeness for traceability by abstaining on unverified claims, which can reduce information density.

## Why read this

Speech and ML engineers building automated clinical documentation tools should read this to understand why Word Error Rate is a dangerously misleading metric for safety-critical pipelines. It offers a concrete counterfactual evaluation framework and a lightweight mitigation technique that leverages evidence grounding to prevent silent hallucinations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated ambient clinical documentation, medical speech-to-text safety auditing, and healthcare conversational AI assistants.

## Related

- (link related pages by id as the wiki grows)
