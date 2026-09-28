---
id: munyampirwa26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1375
pdf: https://www.isca-archive.org/interspeech_2026/munyampirwa26_interspeech.pdf
---

# Contextual Earnings-22: A Speech Recognition Benchmark with Custom Vocabulary in the Wild

[PDF](https://www.isca-archive.org/interspeech_2026/munyampirwa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/munyampirwa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1375)

**TL;DR** — Contextual Earnings-22 is a standardized public benchmark for custom-vocabulary speech recognition built on earnings calls, evaluating six strong baseline systems across local and global context regimes.

## Problem

Academic speech recognition benchmarks are near-saturated in word error rate (WER) and fail to reflect high-stakes real-world domains where a small set of custom terms like company, person, and product names determines transcript usability. Evaluating contextual speech-to-text is currently fragmented across private data, synthetic rare-word injection, and non-standard protocols, hindering direct comparison between keyword prompting and keyword boosting approaches.

## Method

The authors construct Contextual Earnings-22 from 55 source files (roughly 58 hours of audio) yielding 760 context-dense 15-second samples split into validation and test sets. Candidate keywords (person, company, product names) are extracted using GPT-5, normalized, and forced-aligned using wav2vec, followed by rigorous manual review where 98.7% of samples are freed from inaudible/unknown tags and 29.5% receive word-level corrections. Two operational regimes are evaluated: local context (only keywords present in the clip) and global context (full source-call inventory containing realistic distractor terms). Six strong baselines are benchmarked: commercial STT APIs with keyword prompting (Deepgram Nova-3, OpenAI Whisper-1, AssemblyAI Universal, OpenAI Whisper Large-v3-turbo) and CTC-based keyword boosting pipelines (FastConformer-CTC-Large and Argmax Parakeet-v2 with CTC-WS).

## Results

Evaluated on the Contextual Earnings-22 test set using WER and keyword-centric Precision, Recall, and F-score metrics via an open-source evaluation harness (OpenBench). Providing context consistently yields higher keyword F-scores across all tested systems, improving rare proper noun recognition. However, changes in WER vary widely; some systems exhibit stable or degraded WER under context due to side effects like prompt-induced hallucinations, false insertions from distractors, or language-switching. Local context consistently achieves higher F-scores and precision than global context, while global context stresses system robustness against plausible-but-absent distractor terms.

## Code

- https://github.com/argmaxinc/OpenBench

## Applications

Speech engineers and developers building automated transcription systems for high-stakes professional domains—such as financial earnings calls, legal proceedings, or medical dictation—where accurate recognition of rare custom vocabulary is critical.

## Limitations

The benchmark currently focuses specifically on earnings-call audio and proper noun categories (person, company, product names), totaling 760 samples across validation and test sets.

## Related

- (link related pages by id as the wiki grows)
