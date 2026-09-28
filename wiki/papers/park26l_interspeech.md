---
id: park26l_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3486
pdf: https://www.isca-archive.org/interspeech_2026/park26l_interspeech.pdf
---

# Prosody-Aware Speech Representations for Emotion Recognition under Pragmatic Ambiguity

*Yeonwoo Park, Chioh Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/park26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3486)

**TL;DR** — This paper demonstrates that speech-to-text encoders like Whisper suppress prosody during semantic abstraction, failing on pragmatically ambiguous emotion recognition; explicitly injecting F0 and energy into the hidden representations improves subset accuracy by 13.93%p and outperforms text-based LLM inference.

## Key contributions

- Defined a Pragmatic Ambiguity Resolution (PAR) evaluation setting using 1,000 Korean utterances where multimodal and text-based labels disagree.
- Revealed that large STT speech encoders (e.g., Whisper-large-v3-turbo) are not inherently robust to pragmatic ambiguity, often underperforming smaller baselines on strict metrics.
- Showed that explicit prosody injection yields substantially larger performance gains (+13.93%p subset accuracy) than textual context conditioning (+4.83%p) within the same backbone.
- Demonstrated that prosody-aware speech representations match or exceed strong text-based LLM inference (GPT-4o mini) on pragmatic ambiguity resolution.

## Problem

Speech emotion recognition (SER) systems built on large-scale pretrained encoders excel on standard benchmarks but fail in real-world conversations where emotional intent relies on prosody rather than lexical content. In pragmatically ambiguous utterances—such as a single word like "Geurae" meaning agreement, sarcasm, or frustration based on intonation—lexical cues are insufficient. Furthermore, conventional metrics like Hamming accuracy compress model differences by up to an order of magnitude, masking the representation-level suppression of prosodic variation inherent in STT-optimized models.

## Method

The approach uses a frozen whisper-large-v3-turbo encoder (663M parameters) to extract frame-level hidden representations from 16 kHz mono audio inputs. In parallel, fundamental frequency (F0, extracted via Parselmouth/Librosa across 50–500 Hz with unvoiced/silent frames zeroed and linearized) and energy (root-sum-square of STFT magnitudes) are computed. These prosodic features are temporally interpolated to match the frame rate of the Whisper encoder outputs, concatenated with the hidden representations, and projected into a shared space.

This joint representation is then processed by a classification head composed of two Transformer encoder layers followed by three linear layers for multi-label emotion prediction. The architecture is trained using Binary Cross-Entropy Loss per label with the AdamW optimizer (initial learning rate 5e-3, weight decay 0.01) utilizing a single A100 GPU with mixed precision. For context-conditioned evaluations, F0 and energy are combined with _\pm_ 5 surrounding conversational utterances as textual/contextual inputs.

## Experimental setup

Evaluated on a 457-hour Korean emotional speech dataset from AI-Hub comprising 59 emotion labels, split 8:2 for training/validation, and an unseen Pragmatic Ambiguity Resolution (PAR) test benchmark of 1,000 ambiguous conversational video clips (~100 hours). Baselines include klue/bert-base, klue/roberta-base, facebook/hubert-base-ls960, facebook/wav2vec2-base-960h, microsoft/wavlm-base, a RoBERTa+HuBERT fusion model, Whisper variants, and GPT-4o mini. Metrics include Hamming Accuracy, Subset Accuracy, and Precision at k (PAR score).

## Results

While Hamming accuracy compressed performance across all models to a narrow 96%–98% range, strict metrics exposed vast differences. On the validation subset accuracy, Whisper-large-v3-turbo achieved only 12.46%, falling behind HuBERT-base (15.30%) and the text-audio fusion model (20.51%). Injecting F0 and energy into Whisper-large-v3-turbo raised subset accuracy to 26.39% (+13.93%p) and PAR score from 21.00% to 32.60% (+11.6%p). Adding context further improved subset accuracy to 31.22% and PAR to 34.22%. The prosody-aware Whisper model matched or exceeded GPT-4o mini's PAR score of 31.10%. Ablations on smaller Whisper-base showed minimal gains from prosody, proving that smaller models are near chance floor and that aggressive semantic abstraction in larger STT models benefits most from explicit prosodic augmentation.

| System/Condition | Parameters | Hamming | Subset | PAR |
|---|---|---|---|---|
| klue/roberta-base + hubert-base | 222M | 97.54 | 20.51 | 24.40 |
| openai/whisper-large-v3-turbo | 663M | 97.07 | 12.46 | 21.00 |
| whisper-large-v3-turbo + F0 & Energy | 663M | 97.87 | 26.39 | 32.60 |
| whisper-large-v3-turbo + F0, Energy, Context | 663M | 98.03 | 31.22 | 34.22 |
| GPT-4o mini | N/A | N/A | N/A | 31.10 |

## Limitations

The study is experimentally limited to the Korean language and a single regional dataset source (AI-Hub), potentially restricting cross-lingual generalization where tonal or intonational properties differ. The evaluation focuses exclusively on a 59-class classification setup and a custom 1,000-utterance PAR benchmark. Furthermore, the Whisper encoder backbone is kept entirely frozen, leaving open whether fine-tuning end-to-end would alter the representational dynamics.

## Why read this

Researchers building speech emotion recognition or dialogue systems will learn why massive STT-pretrained encoders fail at fine-grained pragmatic intent and how lightweight prosodic injection recovers performance without updating backbone weights.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Emotion-aware subtitle generation, spoken dialogue systems, and affective speech translation.

## Related

- (link related pages by id as the wiki grows)
