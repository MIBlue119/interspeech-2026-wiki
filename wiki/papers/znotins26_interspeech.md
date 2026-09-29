---
id: znotins26_interspeech
category: asr
labels: [low-resource, self-supervised]
institutions: ["University of Latvia", "Assistentis", "DATI Group", "Viroling Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3469
pdf: https://www.isca-archive.org/interspeech_2026/znotins26_interspeech.pdf
---

# Low-Resource Medical ASR for Rich Transcription in Latvian

*Arturs Znotins, Normunds Gruzitis, Andris Rozentals, Maris Golubovskis, Mikelis Gulbis, Roberts Dargis*

[PDF](https://www.isca-archive.org/interspeech_2026/znotins26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/znotins26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3469)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — This paper investigates low-resource rich medical ASR in Latvian, comparing end-to-end foundation models with a two-stage verbatim ASR + LLM post-editing pipeline. Using 50 hours of medical dictation and 75 hours of pseudo-labeled audio, fine-tuned Whisper-large-v3 achieves an error rate reduction of over 6x, bringing WER down to 10.6%.

## Key contributions

- Evaluated and compared end-to-end formatted ASR models against a two-stage verbatim ASR and text-only LLM post-processing pipeline for Latvian medical transcription.
- Proposed an LLM-driven curation approach using Gemini 3 Pro with few-shot examples and validation loops to convert legacy verbatim transcripts and final reports into paired rich transcriptions.
- Generated and filtered 75 hours of pseudo-labeled medical speech data (discarding samples with WER > 15%) to augment training under severe data scarcity.
- Introduced a multi-faceted evaluation framework tailored for rich medical transcription, tracking punctuation (PER, PC-ER), numbers (N-ER), and medical named entities (MC-ER).

## Problem

High-resource clinical documentation relies heavily on advanced ASR with rich transcription formats, but low-resource languages like Latvian lack adequate medical speech data. Without domain adaptation, strong general foundation models experience severe degradation on medical text, with Word Error Rates jumping from 3-13% to 12-46%. Furthermore, traditional multi-step pipelines (acoustic model, pronunciation lexicons, rule-based ITN) require expensive manual engineering that is unsustainable for low-resource markets.

## Method

The authors explore two distinct paradigms: end-to-end models that map audio directly to formatted text, and a two-stage pipeline consisting of fine-tuned verbatim ASR followed by an LLM text-formatting module (Gemma-3 1B/4B/12B). Base foundation models evaluated include Whisper (small, medium, large-v3), Wav2Vec2-BERT, Canary-1B-v2, and Gemma-3n (2B, 4B). For end-to-end training, models use a two-stage recipe: 10k steps on general-domain Latvian data (Common Voice 19.0, LATE-Media) followed by 5k steps on the LVMED medical corpus. FP16 training is used with a batch size of 32 and learning rates of 2e-5 (halved during adaptation) for most models, while Wav2Vec2-BERT uses 5e-5 and Gemma-3n uses BF16 with 5e-5. Whisper generation configs are modified to remove non-special suppressed tokens to allow arbitrary punctuation output.

To overcome data sparsity, Gemini 3 Pro leverages manual verbatim-to-formatted pairs using a 50-example prompt with a 5-retry validation loop to map spoken commands into structured reports containing XML tags for anatomy, conditions, medications, and procedures. For pseudo-labeling, the strongest ASR model generates transcripts on unannotated partner recordings, which are then corrected and filtered via an LLM-human report loop, retaining only utterances with <15% WER.

## Experimental setup

Experiments use the LVMED dataset totaling 50 hours of medical dictation (42.7h train, 5.0h test, 1.6h dev) covering radiology, histopathology, clinical discharge, and surgery, augmented by 75 hours of LLM-corrected pseudo-labeled audio. Baselines include out-of-the-box Canary-1B-v2, Whisper-medium, Whisper-large-v3, and LATE-cv19. Models are trained on a single A100 80GB GPU. Evaluation metrics encompass standard WER, verbatim WER (V-WER), Character Error Rate (CER), Punctuation Error Rate (PER), Punctuation Command Error Rate (PC-ER), Number Error Rate (N-ER), and Medical Concept Error Rate (MC-ER) broken down by anatomy, condition, medication, and procedure.

## Results

Out-of-the-box foundation models perform very poorly on medical data, with Canary-1B-v2 yielding 107.3% WER and Whisper-large-v3 yielding 68.6% WER. Fine-tuning end-to-end models drastically closes this gap: ft-whisper-large-v3 reaches 11.1% WER. Incorporating 75 hours of LLM-corrected pseudo-labeled data further pushes the end-to-end Whisper model to 10.6% WER and an anatomical named entity error rate (ANA) of 5.0%. Skipping the general-domain warm-up phase (S1) hurts performance, as seen in the S2-only fine-tuned model scoring 11.9% WER.

The two-stage ASR+LLM configuration (ft-whisper-large-v3 paired with ft-gemma3-12b) achieves highly competitive results at 11.2% WER, while securing the best Punctuation Command Error Rate (PC-ER) of 2.1%. Ablations across data scales show that LLM-based post-formatting performs stronger when in-domain data is extremely scarce (e.g., 1/8th data scale), but end-to-end models catch up as full training scale is utilized.

| System | WER (%) | CER (%) | PER (%) | PC-ER (%) | N-ER (%) | MC-ER (%) |
|---|---|---|---|---|---|---|
| whisper-large-v3 (baseline) | 68.6 | 22.1 | 66.9 | 53.4 | 48.0 | 57.0 |
| ft-gemma-3n-E4B (E2E) | 15.2 | 4.8 | 25.0 | 4.2 | 13.2 | 8.8 |
| ft-canary-1b-v2 (E2E) | 12.8 | 3.9 | 23.8 | 4.3 | 14.5 | 7.0 |
| ft-whisper-medium (E2E) | 12.8 | 3.7 | 22.6 | 4.5 | 9.4 | 7.8 |
| ft-whisper-large-v3 (E2E) | 11.1 | 3.4 | 21.3 | 4.2 | 8.2 | 6.7 |
| ft-whisper-large-v3 + pseudo (E2E) | 10.6 | 3.2 | 21.6 | 4.5 | 7.3 | 6.1 |
| ft-whisper-large-v3 + LLM (Two-Stage) | 11.2 | 3.4 | 21.4 | 2.1 | 9.0 | 6.6 |

## Limitations

Both end-to-end ASR and LLM post-processor modules are susceptible to hallucinations, posing risks in clinical environments where dosage or drug name errors can be critical. The data curation pipeline relies heavily on preexisting verified medical reports, meaning scaling to entirely new clinical specialties without legacy reports requires substantial manual verification. Maintaining absolute consistency in automated LLM annotations remains challenging despite few-shot prompting and validation loops.

## Why read this

Researchers building speech translation, ASR, or clinical documentation pipelines for low-resource languages will find this a blueprint for leveraging LLM-driven curation and pseudo-labeling to adapt massive multilingual models. It provides rigorous comparative analysis between monolithic end-to-end sequence-to-sequence models and modular ASR+LLM text formatting workflows.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical documentation, speech-to-text reporting for radiology and histopathology, and electronic health record (EHR) population in low-resource languages.

## Institutions / 機構

University of Latvia, Assistentis, DATI Group, Viroling Technology

**Funding / 經費:** European Union's Recovery and Resilience Facility

## Related

- [Two-stage semi-supervised learning with pseudo-labels: A case study on Northern Sámi ASR](pal26_interspeech.md) — shared technique · relatedness 2.0/3
- [Gumbel-BEARD: Automatic Layer Selection for Self-Supervised Adaptation of Whisper in Low-Resource Domains](wang26o_interspeech.md) — same problem · relatedness 2.0/3
- [S-DiverSe: Spanish Diverse Speech](lopez26b_interspeech.md) — same problem · relatedness 2.0/3
- [Unlocking In-Context Learning in Audio-Language Models from Decentralized Medical Audio](piao26_interspeech.md) — same problem · relatedness 2.0/3
- [Hamsa: A Manually Annotated Emirati Arabic Corpus for Speech and Language Technologies](alyafeai26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
