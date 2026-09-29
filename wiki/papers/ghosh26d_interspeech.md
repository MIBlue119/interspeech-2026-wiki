---
id: ghosh26d_interspeech
category: speaker
institutions: ["Solventum Health Information Systems"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-880
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26d_interspeech.pdf
---

# ASR-Synchronized Speaker-Role Diarization

*Arindam Ghosh, Mark Fuhs, Bongjun Kim, Anurag Chowdhury, Monika Woszczyna*

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-880)

**Category:** `speaker`

**TL;DR** — The paper adapts an ASR-synchronized dual-transducer architecture for joint speaker-role diarization (RD) by demonstrating that role prediction relies more on linguistic context than acoustic features. It introduces task-specific predictors, upper-layer ASR encoder features, and a 1-best cross-entropy loss, outperforming baseline models by up to 6.2% R-WDER on real-world medical data.

## Key contributions

- Demonstrated that speaker-role diarization (RD) is fundamentally different from conventional speaker diarization (SD), relying more heavily on linguistic context and long-range history than acoustic cues.
- Proposed task-specific predictor design using an RNN for the RD auxiliary transducer alongside a CNN-2 predictor for the frozen ASR transducer.
- Utilized upper-layer (Layer 12) word-level features from the ASR encoder as input to the RD encoder rather than intermediate speaker-focused layers.
- Replaced the costly blank-shared RNNT loss with a simplified cross-entropy loss computed strictly along the 1-best forced-aligned ASR path, improving optimization efficiency and reducing memory overhead.

## Problem

Joint ASR and speaker-role diarization (RD) is crucial for structuring multi-speaker dialogues like doctor-patient conversations for downstream NLP tasks, but prior approaches force difficult trade-offs. Single-transducer Role-ASR models jointly predict words and role tokens, which degrades ASR accuracy, while text-only LLM approaches fail when transcripts lack distinctive linguistic cues, short utterances occur, or ASR error rates are high. Existing end-to-end ASR-synchronized SD models use intermediate acoustic layers and short-context CNN predictors that fail to capture the long-range semantic and linguistic dependencies required to infer functional speaker roles accurately.

## Method

The proposed architecture builds upon an ASR-synchronized dual-transducer framework where the primary ASR module is completely frozen during the training of the auxiliary RD network. The system processes audio segments into 64-dimensional log-Mel filterbanks. The ASR encoder consists of 2 convolutional subsampling layers followed by 12 e-branchformer layers (dimension 384, 6-headed attention, 1536 feedforward projection dimensions) and uses a CNN-2 predictor to preserve high ASR word accuracy. 

The RD encoder features 9 e-branchformer layers with linear subsampling to match frame rates, taking higher-layer (Layer 12) representations from the ASR encoder to leverage rich word-level semantic features. To capture the long-range linguistic context essential for role differentiation, the RD predictor replaces the short-context CNN with a single-layer LSTM recurrent network with 384 hidden dimensions. 

Instead of full marginalization across all alignment paths via blank-shared RNNT loss, the RD transducer is trained via cross-entropy loss restricted strictly to the 1-best forced-alignment path between the reference text and the ASR encoder output. Forced alignments are computed once and reused across epochs, bypassing runtime lattice marginalization and allowing larger batch sizes. During inference, when the ASR branch emits a non-blank token, argmax is applied over the auxiliary RD logits to assign the corresponding functional role.

## Experimental setup

Evaluated on an internal real-world doctor-patient conversation dataset (DoPaCo: 1750h train, 26.5h validation, 35.0h evaluation) and a public simulated medical conversation dataset (SiMeCo: 21.3h train, 6.75h validation, 8.5h evaluation). Models are implemented in ESPnet, trained with the Adam optimizer, and compared against Role-ASR (RNN) and ASR (CNN-2) + RD (CNN-2, L5) BS-RNNT baselines. Performance is measured via Word Error Rate (WER) and Role-based Word Diarization Error Rate (R-WDER) using NIST's asclite scoring toolkit.

## Results

On the in-domain DoPaCo evaluation set, the final proposed model (P3) achieves a WER of 15.67 and an R-WDER of 6.1, outperforming the baseline ASR-synchronized SD model adapted for RD (B2), which yields an R-WDER of 7.8. On the out-of-domain SiMeCo evaluation set, P3 reduces R-WDER from 44.3 (baseline B2) down to 27.2, and further drops to 2.1 when fine-tuned on SiMeCo data. Ablations demonstrate that transitioning the RD predictor from CNN-2 to an RNN (System P1) and feeding Layer 12 ASR encoder features instead of Layer 5 (System P2) progressively lower DoPaCo R-WDER from 7.8 to 7.1 and 6.3, while switching to 1-best cross-entropy loss (System P3) provides the final boost to 6.1 R-WDER.

| System | DoPaCo WER | DoPaCo R-WDER | SiMeCo WER | SiMeCo R-WDER |
|---|---|---|---|---|
| B1: Role-ASR (RNN) | 16.03 | 6.5 | 10.62 | 34.2 |
| B2: RD (CNN-2, L5) BS-RNNT | 15.67 | 7.8 | 10.56 | 44.3 |
| P1: RD (RNN, L5) BS-RNNT | 15.67 | 7.1 | 10.56 | 41.3 |
| P2: RD (RNN, L12) BS-RNNT | 15.67 | 6.3 | 10.56 | 28.9 |
| P3: RD (RNN, L12) 1Best-CE (Ours) | 15.67 | 6.1 | 10.56 | 27.2 |

## Limitations

The evaluation is restricted to medical dialogue domains (doctor-patient interactions), leaving open how well the architectural choices translate to multi-party conversations in legal, customer service, or meeting domains with more than two prominent roles. The model relies on a frozen ASR backbone, meaning any upstream ASR errors or vocabulary mismatches directly cap the downstream role diarization accuracy. Furthermore, using a deterministic 1-best forced alignment path ignores alternative alignment hypotheses, which could introduce error propagation if the 1-best ASR path contains substitution errors.

## Why read this

Researchers and speech engineers building joint speech recognition and speaker attribution pipelines will learn how to properly balance acoustic and linguistic conditioning when expanding dual-transducer frameworks from anonymous speaker diarization to semantic role labeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated medical scribing, clinical documentation generation, multi-speaker conversational summarization, and meeting transcription systems requiring role-attributed logs.

## Institutions / 機構

Solventum Health Information Systems

## Related

- (link related pages by id as the wiki grows)
