---
id: jiang26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-606
pdf: https://www.isca-archive.org/interspeech_2026/jiang26c_interspeech.pdf
---

# Beyond WER: A Paired Acoustic Stress Test for Ambient Clinical Scribes

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-606)

**TL;DR** — A paired acoustic stress test for ASR-to-LLM clinical scribes reveals that stationary ambient noise can nearly double unsafe output rates while increasing Word Error Rate by less than one percentage point.

## Problem

Ambient clinical scribes cascading automatic speech recognition with large language models are vulnerable to error propagation, where minor acoustic misrecognitions lead to severe downstream clinical errors. Traditional evaluation metrics like Word Error Rate (WER) fail to capture clinical semantics, treating all token errors equally and masking safety-critical semantic drift. Consequently, the field lacks a systematic evaluation framework to isolate how specific acoustic distortions drive downstream safety failures in healthcare documentation.

## Method

The authors introduce a controlled, paired acoustic stress test using 272 Objective Structured Clinical Examination (OSCE) encounters, evaluating an ASR-to-LLM pipeline with Whisper-Large-v3 for transcription and Qwen-3-235B-A22B-Instruct-2507 for structured JSON generation. The downstream LLM configuration, prompt, schema, and decoding parameters (greedy decoding with temperature=0) are strictly frozen across conditions to isolate acoustic sensitivity from generation stochasticity. The study tests two acoustic interference categories: stationary ambient noise (DEMAND office, cafeteria, traffic) and non-stationary semantic interference (MUSAN speech) at SNRs of 15 dB, 10 dB, and 5 dB. Additionally, a lightweight evidence-grounded hybrid agent uses an extractor-verifier framework with strict verbatim quote matching and symbolic filtering to mitigate hallucinations at severe SNR without model fine-tuning.

## Results

Evaluated on 272 English clinical encounters spanning five medical specialties, the clean baseline achieved a WER of 16.54%, InsRate of 2.99%, NegErr of 19.12%, TriageMatch of 100%, SCER of 0.00%, UnderTriage of 0.00%, a mean rubric score of 4.62, and an Unsafe Rate of 27.21%. Under stationary ambient noise at 5 dB, WER increased to only 20.63% and InsRate to 2.31%, but NegErr surged to 39.71%, SCER rose to 46.32%, UnderTriage reached 3.31%, and the Unsafe Rate increased to 40.44% with a mean score of 4.23. Under non-stationary semantic interference at 5 dB, WER jumped to 54.68%, InsRate to 14.55%, NegErr to 51.10%, TriageMatch dropped to 51.10%, SCER reached 39.71%, UnderTriage hit 10.62%, mean score fell to 3.71, and Unsafe Rate surged to 70.96%. Applying the mitigation agent at 5 dB semantic noise lowered the Unsafe Rate to 33.46% and SCER to 3.31% while raising the mean score to 4.36.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building or evaluating health-tech applications, clinical documentation tools, and automated medical scribe pipelines.

## Limitations

The evaluation relies on a specific set of OSCE simulations and API-backed foundation models, and the proposed mitigation strategy trades completeness for traceability via evidence-based abstention.

## Related

- (link related pages by id as the wiki grows)
