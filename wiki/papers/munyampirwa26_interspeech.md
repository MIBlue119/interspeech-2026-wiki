---
id: munyampirwa26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Argmax", "University of California, Los Angeles"]
code: https://github.com/argmaxinc/OpenBench
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1375
pdf: https://www.isca-archive.org/interspeech_2026/munyampirwa26_interspeech.pdf
---

# Contextual Earnings-22: A Speech Recognition Benchmark with Custom Vocabulary in the Wild

*Blaise Munyampirwa, Arda Ibis, Zach Nagengast, Brian Keene, Dylan Angus*

[PDF](https://www.isca-archive.org/interspeech_2026/munyampirwa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/munyampirwa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1375)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — Contextual Earnings-22 is a new public benchmark for speech-to-text context biasing built on Earnings-22, pairing 760 context-dense 15-second audio clips with realistic custom-vocabulary entity lists to evaluate keyword prompting and boosting methods.

## Key contributions

- Introduces Contextual Earnings-22, bridging the gap between saturated academic benchmarks and high-stakes commercial contextual speech recognition needs.
- Curates a high-fidelity dataset of 760 manually reviewed and corrected 15-second clips across validation (130 samples) and test (630 samples) splits, eliminating 98.7% of inaudible/unk artifacts present in the raw data.
- Implements a dual evaluation protocol examining both 'local context' (precision-focused, no distractors) and 'global context' (recall-versus-precision tradeoff with call-level entity distractors).
- Establishes reproducible baselines for six major systems spanning commercial keyword prompting APIs (Deepgram Nova-3, OpenAI Whisper-1, AssemblyAI Universal) and keyword boosting architectures (Whisper OSS, FastConformer-CTC-Large, Argmax Parakeet-v2 + CTC-WS).

## Problem

Current academic speech-to-text benchmarks show near-saturated word error rates, obscuring significant real-world failures on rare, context-defined custom vocabulary such as proper names, company titles, and product terms. While industrial systems rely heavily on contextual conditioning via keyword prompting or keyword boosting, evaluation remains fragmented across private datasets or ad-hoc synthetic subsets of LibriSpeech. This lack of a standardized public benchmark pairing natural domain-specific audio with realistic direct and distractor entity inventories impedes apples-to-apples research progress.

## Method

The dataset is constructed by taking Earnings-22 source audio files (~1 hour per call) and extracting candidate segments using an LLM-based named-entity extraction pass via GPT-5 over the transcripts. Post-processing normalizes surface forms, punctuation, and removes generic strings to establish per-call global entity inventories. Transcript segments are mapped to audio using a wav2vec-based forced aligner to extract fixed-length 15-second windows centered around keyword mentions, followed by rigorous manual review to fix transcript errors, casing, acronyms, and multi-word boundaries.

For evaluation, the benchmark tests two context regimes: local context (only keywords spoken in the target clip) and global context (all entities from the 1-hour call source, introducing realistic distractors). Systems are evaluated using keyword prompting (passing text prompts into models like Whisper, Deepgram, and AssemblyAI) and keyword boosting (integrating term lists into decoding pipelines via CTC-based word-spotter pipelines like FastConformer-CTC-Large and Parakeet-v2). These approaches balance acoustic likelihood with lexical bias lists, trading off recall gains against distractor-induced false positives.

## Experimental setup

The dataset comprises 760 total samples (130 validation, 630 test) drawn from 55 source audio files totaling roughly 67.6 hours of source data. Baseline systems include Deepgram Nova-3, OpenAI Whisper-1, AssemblyAI Universal, Whisper OSS Large-v3-turbo, FastConformer-CTC-Large, and Argmax Parakeet-v2 + CTC-WS. Metrics include standard Word Error Rate (WER) alongside keyword-centric Precision, Recall, and F-score computed using minimum edit-distance alignment.

## Results

Across all evaluated systems, introducing contextual entity lists yields consistent and substantial improvements in keyword F-score, demonstrating that contextual conditioning effectively surfaces rare and domain-specific terms. However, changes in overall Word Error Rate (WER) are less consistent; certain commercial prompting APIs experience slight WER increases due to prompt-induced artifacts like hallucinations, language switching, or partial output deviations.

Comparing evaluation regimes shows that local context is systematically easier, pushing systems to higher F-score iso-curves due to the absence of distractors. Conversely, global context severely stresses precision: the presence of plausible-but-absent call-level entity distractors leads to false-positive keyword insertions, exposing significant architectural variations in how robust different prompting and boosting strategies are to noisy context lists.

## Limitations

The dataset is scoped specifically to English-language financial earnings calls, limiting generalization to other highly specialized domains or multilingual conversational contexts. The benchmark relies on short 15-second clips which, while effective for isolating entity recognition, do not capture long-form discourse structure or multi-turn contextual tracking. Furthermore, the reliance on GPT-5 for initial entity extraction introduces potential upstream filtering biases despite rigorous manual review.

## Why read this

Speech researchers and ML engineers building contextual speech recognition systems should read this to understand the practical trade-offs between keyword prompting and boosting, and to adopt a standardized benchmark that exposes distractor robustness rather than just aggregate WER.

## Code

- https://huggingface.co/datasets/argmaxinc/contextual-earnings22

## Applications

Financial transcription services, voice assistants, enterprise meeting transcription systems, and medical or legal dictation tools requiring high-accuracy custom vocabulary recognition.

## Institutions / 機構

Argmax, University of California, Los Angeles

## Related

- (link related pages by id as the wiki grows)
