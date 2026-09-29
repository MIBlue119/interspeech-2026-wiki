---
id: toyin26_interspeech
category: resources-evaluation
institutions: ["Mohamed bin Zayed University of Artificial Intelligence", "Indian Institute of Technology Madras"]
code: https://github.com/Theehawau/usecase_asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-750
pdf: https://www.isca-archive.org/interspeech_2026/toyin26_interspeech.pdf
---

# What Counts as an Error? Dual-Reference Benchmarking for Atypical ASR

*Hawau Olamide Toyin, S Umesh, Hanan Aldarmaki*

[PDF](https://www.isca-archive.org/interspeech_2026/toyin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/toyin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-750)

**Category:** `resources-evaluation`

**TL;DR** — This paper investigates the evaluation ambiguity in atypical ASR for stuttered speech by benchmarking 11 models against both verbatim (preserving disfluencies) and intended (canonical) reference transcripts. It reveals that model rankings shift drastically depending on the reference type, driven by architectural inductive biases.

## Key contributions

- Formalizes dual-reference benchmarking for atypical ASR, splitting ground truth into verbatim and intended references.
- Benchmarks 11 diverse ASR models spanning autoregressive sequence-to-sequence, transducer, and CTC architectures.
- Aligns FluencyBank Timestamped audio with CASA clinical stutter event annotations to analyze performance bottlenecks across specific disfluency types.
- Examines the limitations of evaluation metrics like isWER, BERTScore, and SeMaScore for semantic atypical speech transcription.

## Problem

Current automatic speech recognition (ASR) research on atypical speech, such as stuttering from persons who stutter (PWS), predominantly evaluates systems against a single implicit reference, usually an intended transcript where disfluencies are stripped away. Conflating verbatim and intended references penalizes models that preserve natural repetitions and prolongation events, masking the true utility of systems designed for clinical use. Furthermore, treating atypical ASR evaluation as a monolithic problem creates systemic fairness issues and misleads developers about which models perform best for specific downstream applications like voice dictation versus speech-language pathology diagnostics.

## Method

The paper benchmarks 11 open-source ASR models across three primary architectural families: autoregressive sequence-to-sequence models (Whisper Large-v3, SpeechBrain Transformer, NVIDIA Canary-1B-v2), Conformer-Transducers (NVIDIA Transducer), and non-autoregressive CTC models (NVIDIA CTC, HuBERT Large, Wav2Vec2 Large, NVIDIA Fast Conformer, SpeechBrain Streaming, NVIDIA QuartzNet, SpeechBrain CRDNN). All models are evaluated off-the-shelf using public default inference and decoding configurations from Hugging Face without task-specific fine-tuning. The core hypothesis is that autoregressive decoders use global linguistic context to predict through uncertain acoustic regions, making them naturally suited for intended transcriptions that normalize disfluencies. Conversely, CTC models rely exclusively on frame-level local acoustic evidence with conditional independence assumptions, making them align more closely with verbatim transcriptions that capture exact acoustic-to-text repetitions.

Evaluation utilizes the English FluencyBank Timestamped corpus (3,430 samples) along with CASA stutter event annotations mapped to five distinct clinical categories: syllable repetitions (SR), incomplete syllable repetitions (ISR), multisyllable unit repetitions (MUR), sound prolongations (P), and blocks (B). Texts are normalized using Whisper's BasicTextNormalizer to strip punctuation and case without removing repeated tokens or fill words, allowing raw comparisons via intended word error rate (isWER), verbatim word error rate (vWER), SeMaScore, and BERTScore.

## Experimental setup

Evaluations use the full 3,430-sample English FluencyBank Timestamped dataset and its alignment with CASA clinical stutter event annotations. The study compares 11 off-the-shelf ASR baseline models ranging from convolutional encoders, wav2vec2, HuBERT, and conformer-CTC variants to large-scale encoder-decoder models like Whisper Large-v3 and NVIDIA Canary-1B-v2. Metrics reported include intended Word Error Rate (isWER), verbatim Word Error Rate (vWER), SeMaScore, and BERTScore.

## Results

Model rankings vary dramatically based on the chosen reference. NVIDIA CTC achieves the best verbatim performance with a vWER of 17.20% (ranking 1st for vWER), but ranks 5th for intended transcription (isWER of 27.43%). Conversely, NVIDIA Canary-1B-v2 achieves the best intended performance with an isWER of 13.85% (ranking 1st for isWER) while yielding a vWER of 21.95% (ranking 2nd). Whisper Large-v3 ranks 2nd for intended speech (isWER 16.13%) and 3rd for verbatim speech (vWER 25.01%).

Stutter event analysis reveals that sound prolongations (P) yield the lowest WERs because the intended lexicon remains stable despite time-stretching. Conversely, multisyllable unit repetitions (MUR) and incomplete syllable repetitions (ISR) cause the highest error rates across both use cases. Error composition analysis shows that intended ASR errors are dominated by insertions (112) and substitutions (115), whereas verbatim ASR errors are predominantly substitutions (199) and deletions (94). Semantic metric comparisons show that isWER over-penalizes surface-form variations (e.g., '20' vs 'twenty'), while BERTScore exhibits poor discriminative power on short utterances, frequently assigning high similarity scores (e.g., 0.84) to severely distorted outputs.

| Model | isWER (↓) | SeMaScore (↑) | isRank | vWER (↓) | vRank |
|---|---|---|---|---|---|
| NVIDIA Canary-1B-v2 | 13.85 | 0.91 | 1 | 21.95 | 2 |
| Whisper Large v3 | 16.13 | 0.92 | 2 | 25.01 | 3 |
| NVIDIA Transducer | 23.84 | 0.83 | 3 | 28.30 | 6 |
| NVIDIA FastConformer | 25.60 | 0.83 | 4 | 25.49 | 4 |
| NVIDIA CTC | 27.43 | 0.83 | 5 | 17.20 | 1 |
| Wav2Vec2 Large | 34.26 | 0.75 | 7 | 34.75 | 8 |

## Limitations

The study is constrained entirely to English speech data from a single domain (the FluencyBank Timestamped corpus). The analysis focuses exclusively on off-the-shelf inference without exploring how explicit fine-tuning with dual-reference data impacts these architectural trade-offs. Additionally, the evaluation relies on automated text normalization and limited semantic metrics which can introduce blind spots for complex atypical phonetic variations.

## Why read this

Speech and ML engineers building voice applications for atypical speakers should read this to understand why selecting a single default WER target is flawed. It provides clear architectural guidelines—mapping autoregressive seq2seq models to intended dictation tasks and CTC models to verbatim clinical assessment tasks.

## Code

- https://github.com/Theehawau/usecase_asr

## Applications

Dictation tools, voice assistants, and clinical speech-language pathology assessment software.

## Institutions / 機構

Mohamed bin Zayed University of Artificial Intelligence, Indian Institute of Technology Madras

## Related

- [Transcription Policy as a Latent Variable: Activating Controllable Verbatim ASR with Word-Level Timing](wagner26_interspeech.md) — same problem · relatedness 2.4/3
- [WER Are We (Really): How Well Do Top Open ASR Leaderboard Models Generalize to Nonstandard Speech?](dhaka26_interspeech.md) — same problem · relatedness 2.2/3
- [PathBench: Speech Intelligibility Benchmark for Automatic Pathological Speech Assessment](halpern26_interspeech.md) — same problem · relatedness 2.0/3
- [DysfluentNet: Joint Stuttering Event Detection and Dysfluency-Aware Transcription via Hierarchical Self-Supervised Learning](muthu26_interspeech.md) — same problem · relatedness 2.0/3
- [Reasoning Beyond Transcription: Audio Language Models on Child Stuttering Speech](okocha26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
