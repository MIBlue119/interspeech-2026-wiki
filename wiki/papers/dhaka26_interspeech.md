---
id: dhaka26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3522
pdf: https://www.isca-archive.org/interspeech_2026/dhaka26_interspeech.pdf
---

# WER Are We (Really): How Well Do Top Open ASR Leaderboard Models Generalize to Nonstandard Speech?

[PDF](https://www.isca-archive.org/interspeech_2026/dhaka26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dhaka26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3522)

**TL;DR** — This paper evaluates leading open ASR leaderboard models on nonstandard stuttered and dysarthric speech, revealing that their average Word Error Rates inflate by 2 to 5 times over standard benchmarks, with extreme cases reaching up to 24 times inflation.

## Problem

While top ASR models on the Hugging Face Open ASR Leaderboard achieve low word error rates below 7 percent on mainstream benchmarks like LibriSpeech, their reliability on nonstandard speech such as stuttered and dysarthric speech remains uncertain. Previous evaluations typically focus on a single condition or model family rather than comparing diverse architectures across multiple speech patterns. This generalization gap causes mainstream ASR systems to fail in real-world scenarios, reducing accessibility for everyday users who rely on voice interfaces.

## Method

The study tests five open models spanning four major architectures: seq2seq encoder-decoders (Whisper-Large-v3, CrisperWhisper), transducers (Parakeet-TDT-0.6B-v2), speech-augmented language models (Canary-Qwen-2.5B), and speech-aware LLMs (Granite-Speech-3.3-8B). The evaluation uses curated subsets of FluencyBank and SEP-28k for stuttered speech, and the UIUC Speech Accessibility Project for dysarthric speech across five medical etiologies. All audio inputs are resampled to 16 kHz mono, segmented into 30-second windows where necessary, and decoded greedily with beam size 1 using a unified preprocessing pipeline. Transcripts are normalized by lowercasing, removing punctuation, and stripping disfluency codes, and evaluated using WER, CER, lexical F1, and BERTScore F1.

## Results

On FluencyBank and SEP-28k, Whisper-Large-v3 achieves the lowest WER (0.18 and 0.12, respectively) and highest BERTScore F1, outperforming Parakeet by 33 percent on SEP-28k. On dysarthric speech from the UIUC Speech Accessibility Project, Whisper achieves the highest BERTScore (0.93) and best performance on Parkinson's disease (0.14 WER) and ALS, while Parakeet attains the lowest CER (0.11) and best WER on cerebral palsy, Down syndrome, and stroke. Canary-Qwen-2.5B shows moderate performance, while Granite-Speech-3.3-8B suffers catastrophic failures with up to 39.64 WER on non-spontaneous prompts due to runaway generation and hallucination loops.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, accessibility researchers, and developers of speech-enabled consumer tech can use these findings to guide inclusive model deployment, select robust architectures, and design better evaluation suites for users with speech differences.

## Limitations

The evaluation relies on black-box comparisons of pre-trained models rather than controlled ablation training, and canonicalization mapping disfluent productions to fluent targets disadvantages verbatim-oriented models like CrisperWhisper.

## Related

- (link related pages by id as the wiki grows)
