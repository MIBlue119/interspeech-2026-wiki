---
id: dhaka26_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3522
pdf: https://www.isca-archive.org/interspeech_2026/dhaka26_interspeech.pdf
---

# WER Are We (Really): How Well Do Top Open ASR Leaderboard Models Generalize to Nonstandard Speech?

*Aditya Dhaka, Aarush Mathur, Dena Mujtaba, Hope Gerlach-Houck, Caryn Herring, Chelsea Johnson, J. Scott Yaruss, Nihar Mahapatra*

[PDF](https://www.isca-archive.org/interspeech_2026/dhaka26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dhaka26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3522)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper provides the first leaderboard-anchored evaluation of leading open ASR models on nonstandard speech (stuttered and dysarthric speech), revealing a 2–5x inflation in average WER compared to standard benchmarks. Among tested systems, Whisper-Large-v3 generalizes most robustly, while Parakeet demonstrates complementary strengths on dysarthric speech conditions.

## Key contributions

- Conducted a leaderboard-anchored evaluation across four major ASR architectures (encoder-decoder, transducer, speech-augmented LM, and speech-aware LLM) using nonstandard speech corpora.
- Evaluated transcripts using both lexical metrics (WER, CER, F1) and semantic similarity (BERTScore F1) to capture meaning preservation alongside token accuracy.
- Quantified the generalization gap, demonstrating that 5–7% standard benchmark WERs inflate by 2–5× on nonstandard speech, with extreme cases reaching 24× due to hallucination bursts.
- Provided detailed error and task-type analyses exposing architecture-specific weaknesses, such as runaway generation in speech-aware LLMs and catastrophic failures on non-spontaneous prompts.

## Problem

State-of-the-art automatic speech recognition models achieve impressively low word error rates (5–7%) on mainstream benchmarks like LibriSpeech, but their reliability on nonstandard speech remains largely unverified. Stuttering introduces involuntary disfluencies like repetitions, prolongations, and blocks, while dysarthria leads to slurred speech and altered prosody. Prior work focuses on isolated models or single conditions rather than comprehensive cross-architecture comparisons. This performance disparity reduces accessibility and creates an accessibility hierarchy where voice assistants and dictation systems fail for users with speech differences.

## Method

The evaluation utilizes curated subsets of three corpora: the UIUC Speech Accessibility Project (SAP) comprising 501.48 hours across five dysarthria etiologies (Parkinson's, ALS, Cerebral Palsy, Down syndrome, stroke); FluencyBank containing 0.96 hours of stuttered speech in reading and interview contexts; and SEP-28k comprising 2.92 hours of podcast-derived stuttered speech. Five models were benchmarked: Whisper-Large-v3 and CrisperWhisper (encoder-decoder), Parakeet-TDT-0.6B-v2 (transducer), Canary-Qwen-2.5B (speech-augmented LM), and Granite-Speech-3.3-8B (speech-aware LLM). All audio inputs were resampled to 16 kHz mono, and inputs longer than 30 seconds were segmented into overlapping 30-second windows.

Inference used greedy decoding (beam size = 1) with multi-task models restricted to transcription-only prompts and system instructions discouraging instruction following. Canonicalization involved lowercasing, punctuation removal, and stripping disfluency codes, which mapped disfluent productions to fluent lexical targets and penalized verbatim-oriented models like CrisperWhisper. Whisper leverages full-context cross-attention to incorporate semantic priors and fill in missing acoustics, whereas Parakeet's transducer enforces monotonic alignment preserving temporal accuracy under systematic articulatory deviations. In contrast, Canary and Granite rely on language model backbones that suffer from attention collapse or runaway generation when confronted with atypical acoustic inputs.

## Experimental setup

Evaluated on UIUC SAP (218,900 utterances, 501.48 hours), FluencyBank (691 utterances, 0.96 hours), and SEP-28k (1,050 utterances, 2.92 hours). Evaluated systems include Whisper-Large-v3, CrisperWhisper, Parakeet-TDT-0.6B-v2, Canary-Qwen-2.5B, and Granite-Speech-3.3-8B. Metrics reported include Word Error Rate (WER) at global and utterance levels, Character Error Rate (CER), lexical F1, and BERTScore F1. All models were evaluated under a unified preprocessing pipeline using greedy decoding.

## Results

Whisper-Large-v3 achieved the best overall performance with a lexical F1 of 0.83 and BERTScore of 0.93 on FluencyBank, alongside a 0.18 WER on FluencyBank and 0.18 on UIUC SAP. Parakeet-TDT-0.6B-v2 achieved the lowest CER on dysarthric speech (0.11) and performed strongly on cerebral palsy (0.47 WER), Down syndrome (0.43 WER), and stroke (0.42 WER). Whisper dominated on stuttered speech (e.g., 0.165 reading WER on FluencyBank, outperforming Parakeet by 18–28%) and Parkinson's disease (0.14 WER). Conversely, Granite-Speech-3.3-8B performed catastrophically, yielding an average WER of 3.29 on UIUC SAP, with extreme failures such as 39.64 WER on non-spontaneous prompts due to hallucination loops and repetition bursts.

| System | FluencyBank WER | SEP-28k WER | UIUC SAP WER | UIUC SAP CER |
|---|---|---|---|---|
| Whisper-Large-v3 | 0.18 | 0.12 | 0.18 | 0.12 |
| Parakeet-TDT-0.6B-v2 | 0.25 | 0.18 | 0.18 | 0.11 |
| CrisperWhisper | 0.35 | 0.26 | 0.24 | 0.16 |
| Canary-Qwen-2.5B | 0.31 | 0.23 | 0.25 | 0.17 |
| Granite-Speech-3.3-8B | 0.70 | 0.45 | 1.39 | 1.23 |

## Limitations

The evaluation scope is limited to English-language corpora and specific conditions (stuttering and five dysarthria etiologies), omitting other speech differences or multilingual nonstandard speech. The black-box comparative design establishes correlations rather than direct causal proofs for architectural behaviors. Furthermore, canonicalizing transcripts to lexical targets disadvantages verbatim-oriented models, and greedy decoding restricts analysis to single-path hypotheses without exploring beam search mitigations.

## Why read this

Speech and ML engineers building accessible voice interfaces or deploying foundation ASR models should read this to understand why top leaderboard models fail catastrophically on nonstandard speech and how architectural choices like transducers versus cross-attention influence robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accessibility-focused automatic speech recognition, healthcare dictation tools for patients with speech disorders, and inclusive voice-controlled digital assistants.

## Institutions / 機構

Michigan State University, Western Michigan University, Friends: The National Association of Young People Who Stutter

**Funding / 經費:** U.S. National Science Foundation

## Related

- (link related pages by id as the wiki grows)
