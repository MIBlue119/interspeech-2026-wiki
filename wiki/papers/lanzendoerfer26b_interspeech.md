---
id: lanzendoerfer26b_interspeech
category: speaker-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2864
pdf: https://www.isca-archive.org/interspeech_2026/lanzendoerfer26b_interspeech.pdf
---

# Speaker Separation via Audio Language Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2864)

**TL;DR** — LlaSep is an autoregressive audio language model for blind speaker separation that generates discrete per-speaker codec streams in a single decoding pass, achieving a 23.43% average DER on LibriCSS while substantially improving perceptual audio quality.

## Problem

Traditional speaker separation models operate on continuous time-frequency representations using mask estimation or permutation-invariant training, making them rigid and prone to processing artifacts or fixed output constraints. These systems struggle to handle variable numbers of active speakers dynamically and fail to jointly optimize separation and speaker attribution effectively. This paper addresses these limitations by shifting the task entirely to the discrete token domain using a generative language modeling framework.

## Method

LlaSep employs a causal decoder-only transformer backbone (LLaSA-1B-Multilingual) operating on discrete audio tokens from XCodec2 (65.5k vocabulary at 50 Hz). The system accepts a tokenized audio mixture alongside semantic conditioning embeddings from a frozen Whisper-small encoder injected via a learned linear projection. It handles up to four speakers autoregressively by generating per-speaker token streams separated by special delimiter tokens. The model is trained via supervised fine-tuning using cross-entropy loss exclusively on ground-truth speaker output tokens across a newly introduced 15-hour synthetic multilingual conversation dataset (MLSEE-Conversation).

## Results

Evaluated on LibriCSS, LlaSep achieves an average Diarization Error Rate (DER) of 23.43% and a DNSMOS-OVRL of 3.14, outperforming baselines like PixIT (32.65% DER) and SepFormer. On the held-out MLSEE-Conversation test split with up to 4 speakers, LlaSep reaches 43.79% DER and a DNSMOS-OVRL of 2.99. On zero-shot evaluation of real-world CallHome telephone conversations, LlaSep achieves 24.84% DER and 3.09 DNSMOS-OVRL, demonstrating robust zero-shot cross-domain generalization from synthetic training data alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building robust downstream speech recognition, speaker diarization, and meeting transcription pipelines that require handling overlapping speech.

## Limitations

Performance degrades as the active speaker count increases due to error propagation during autoregressive decoding, with DER rising from 28.11% for two speakers to 43.79% for four speakers.

## Related

- (link related pages by id as the wiki grows)
