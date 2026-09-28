---
id: toyin26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-750
pdf: https://www.isca-archive.org/interspeech_2026/toyin26_interspeech.pdf
---

# What Counts as an Error? Dual-Reference Benchmarking for Atypical ASR

[PDF](https://www.isca-archive.org/interspeech_2026/toyin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/toyin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-750)

**TL;DR** — This paper demonstrates that atypical speech recognition (ASR) requires dual-reference benchmarking—distinguishing between verbatim and intended transcripts—because model performance and rankings shift drastically depending on the chosen ground truth.

## Problem

Mainstream ASR evaluation for atypical speech conflates two valid transcription references—verbatim (preserving disfluencies like repetitions and prolongations) and intended (canonical text with disfluencies removed)—into a single ground truth. This practice forces a normative decision that penalizes systems for retaining speech patterns that are critical for clinical assessment or, conversely, penalizes systems for removing them in dictation and voice-assistant use cases. Consequently, reported "best" models are misleading when the optimization target (semantic intent versus verbatim fidelity) is left unspecified.

## Method

The study benchmarks 11 diverse ASR models across autoregressive sequence-to-sequence, CTC, and transducer families on the FluencyBank Timestamped dataset. The evaluated models include Whisper Large-v3, SpeechBrain Transformer, NVIDIA Canary-1B-v2, NVIDIA Transducer, NVIDIA CTC, NVIDIA FastConformer, SpeechBrain CRDNN, Wav2Vec2 Large, HuBERT Large, NVIDIA QuartzNet, and SpeechBrain Streaming. Additionally, the audio segments are aligned with clinical stutter event annotations from CASA to analyze how specific primary stuttering events—such as syllable repetitions (SR), incomplete syllable repetitions (ISR), multisyllable unit repetitions (MUR), prolongations (P), and blocks (B)—impact model performance. All models are evaluated as-is using default open-source inference configurations, and performance is measured using word error rate against both intended (isWER) and verbatim (vWER) references, alongside SeMaScore and BERTScore.

## Results

On the FluencyBank Timestamped dataset (3,430 samples), NVIDIA CTC ranks 1st for verbatim transcription (vWER 17.20) but 5th for intended transcription (isWER 27.43), whereas NVIDIA Canary-1B-v2 ranks 1st for intended transcription (isWER 13.85) but 2nd for verbatim (vWER 21.95). Autoregressive sequence-to-sequence models consistently excel at intended speech recognition by leveraging linguistic context to normalize uncertain acoustic regions, whereas CTC models perform better at verbatim transcription by mapping local acoustic evidence directly to text. Across stutter types, sound prolongations (P) yield the lowest error rates because the intended lexicon remains stable, while multisyllable unit repetitions (MUR) and incomplete syllable repetitions (ISR) are the hardest for all models. Error analysis reveals that intended speech errors are dominated by insertions and substitutions (115 substitutions, 112 insertions, 53 deletions), whereas verbatim speech errors are predominantly substitutions (199 substitutions, 74 insertions, 94 deletions).

## Code

- https://github.com/Theehawau/usecase_asr

## Applications

Speech-language pathologists, clinicians, and researchers requiring verbatim transcripts for stuttering pattern analysis, alongside developers building dictation tools and voice assistants that require intended semantic transcripts.

## Limitations

The study is limited to English-language speech and the FluencyBank Timestamped domain.

## Related

- (link related pages by id as the wiki grows)
