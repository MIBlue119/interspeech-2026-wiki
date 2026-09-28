---
id: lanzendoerfer26b_interspeech
category: speaker-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2864
pdf: https://www.isca-archive.org/interspeech_2026/lanzendoerfer26b_interspeech.pdf
---

# Speaker Separation via Audio Language Modeling

*Luca A. Lanzendöerfer, Constantin Pinkl, Florian Grötschla, Roger Wattenhofer*

[PDF](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lanzendoerfer26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2864)

**TL;DR** — LlaSep is an autoregressive audio language model that performs speaker separation and diarization in a single decoding pass by generating discrete codec tokens for up to four speakers, achieving superior perceptual audio quality and lower diarization error rates compared to continuous mask-based baselines.

## Key contributions

- Introduces LlaSep, an autoregressive speaker separation model that operates entirely in the discrete token domain using causal language modeling.
- Builds MLSEE-Conversation, a large-scale synthetic multilingual conversation dataset spanning 7 languages and 15k hours across 6.9 million samples.
- Demonstrates zero-shot transfer from synthetic training data to real-world multi-speaker telephone conversations (CallHome).
- Open-sources the complete codebase, model checkpoints, and the MLSEE-Conversation dataset.

## Problem

Traditional speaker separation models operate on continuous time-frequency representations or waveforms, relying on task-specific components like mask estimation networks, permutation-invariant training, and clustering post-processing. Methods such as Conv-TasNet, SepFormer, and SepReformer struggle with variable speaker counts because they use fixed-output architectures, which generate spurious streams or fail completely when active speaker counts fluctuate. Furthermore, these mask-based approaches often leave residual interference and processing artifacts in separated streams. Formulating separation as token-level sequence generation leverages pretrained speech language models to output clean per-speaker streams from scratch.

## Method

LlaSep comprises three core modules: an audio tokenizer, a semantic conditioning module, and an autoregressive language model backbone. For audio tokenization, it utilizes XCodec2, which compresses 16 kHz waveforms into a 65,536-entry vocabulary at 50 Hz, producing 400 tokens per 8-second audio segment. Semantic guidance is provided by a frozen Whisper-small encoder that extracts representations from the audio mixture during inference (or the sum of clean sources during training), which are projected into the language model's hidden dimension via a learned linear projection layer.

The backbone is a LLaSA-1B-Multilingual causal decoder-only transformer. The model's embedding layer is extended with special speaker delimiter tokens to mark per-speaker output regions, and Whisper projection embeddings are injected into the sequence prefix. LlaSep is trained via supervised fine-tuning using standard cross-entropy loss computed exclusively over the ground-truth speaker tokens, while mixture tokens and Whisper prefixes are masked from the loss. During inference, the model generates up to K=4 per-speaker token streams autoregressively in a single decoding pass, and 20 samples are generated via sampling with mean aggregation to handle non-deterministic outputs.

## Experimental setup

The model is evaluated on the held-out test split of the MLSEE-Conversation dataset (15k total hours, 14k train with 19k speakers, 1k test with 5k speakers), LibriCSS, and the English and German subsets of CallHome. Baselines include PixIT, SepReformer, and SepFormer. Evaluation metrics include Diarization Error Rate (DER), DNSMOS (SIG, BAK, OVRL, P.808), and ScoreQ (ScoreQ-NR and ScoreQ-Ref). Implementation uses the AdamW optimizer to train the linear projection layer and LM parameters for 3 epochs on 8-second chunks segmented via SileroVAD.

## Results

On LibriCSS, LlaSep achieves an average DER of 23.43%, outperforming PixIT (32.65%) and mask-based baselines whose fixed two-output designs drive their DERs above 85%. LlaSep also dominates perceptual quality, scoring an average DNSMOS-OVRL of 3.13 and ScoreQ-Ref of 0.37 compared to SepReformer's 0.95. On the 2-speaker MLSEE-Conversation test set, LlaSep achieves a 28.11% DER and 3.04 DNSMOS-OVRL, beating PixIT's 63.80% DER and 2.23 DNSMOS-OVRL. In the 4-speaker MLSEE setting, LlaSep's DER degrades to 43.79% due to compounded autoregressive decoding errors, yet it still outperforms PixIT's 58.22%. On zero-shot CallHome evaluation, LlaSep achieves a 24.84% DER and 3.09 DNSMOS-OVRL, substantially outperforming PixIT (30.20% DER, 2.26 DNSMOS-OVRL).

| System | DER (%) ↓ | DNSMOS-OVRL ↑ | ScoreQ-NR ↑ | ScoreQ-Ref ↓ |
|---|---|---|---|---|
| PixIT (LibriCSS Avg) | 32.65 | 2.56 | 2.13 | 1.17 |
| SepFormer (LibriCSS Avg) | 117.99 | 2.46 | 1.87 | 1.14 |
| SepReformer (LibriCSS Avg) | 87.81 | 2.65 | 2.34 | 0.95 |
| LlaSep (LibriCSS Avg) | 23.43 | 3.13 | 3.95 | 0.37 |

## Limitations

LlaSep's performance degrades as the number of active speakers increases from 2 to 4 due to error compounding during long autoregressive sequence generation. The approach relies entirely on synthetic training data, and although zero-shot transfer to real telephone data (CallHome) is strong, it has not been evaluated on extreme acoustic conditions with heavy background noise or reverberation. Additionally, because separated streams are generated from scratch via discrete tokens rather than masked from the mixture, content fidelity is strictly bounded by the underlying neural audio codec's reconstruction limits.

## Why read this

Researchers and engineers working on multi-speaker understanding, speech separation, or audio language modeling should read this paper to see how framing multi-speaker separation as a token-level autoregressive generation task bypasses the rigid output-channel constraints of continuous mask-based systems.

## Code

- https://huggingface.co/datasets/talkbank/callhome

## Applications

Robust multi-speaker automatic speech recognition preprocessing, conversational speech diarization, and meeting transcription systems operating in heavy overlap environments.

## Related

- (link related pages by id as the wiki grows)
