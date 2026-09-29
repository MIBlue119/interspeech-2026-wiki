---
id: gu26b_interspeech
category: paralinguistics-emotion
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1303
pdf: https://www.isca-archive.org/interspeech_2026/gu26b_interspeech.pdf
---

# ProWhistress: An Enhanced Dual-Stream Transcription Architecture for Prosody-Aware Sentence Stress Detection

*Hujian Gu, Li Tao, Fei Jiang, Ying Wang, Jingwei Qu, Zhaofang Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/gu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1303)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`

**TL;DR** — ProWhistress is a dual-stream alignment-free transcription and sentence stress detection architecture that combines a frozen Whisper semantic backbone with a trainable explicit acoustic encoder via bottleneck cross-attention and gated residual fusion, achieving an F1 score of 0.959 on TinyStress-15k.

## Key contributions

- Proposes a dual-stream architecture integrating explicit acoustic modeling with implicit semantic representations to solve the semantic-prosodic trade-off in ASR-based stress detection.
- Constructs two new Mandarin sentence stress resources: SinoStress-Syn (12 hours synthetic) and SinoStress-Real (3 hours human-recorded benchmark).
- Establishes a hierarchical annotation pipeline for Mandarin combining DeepSeek-v3 semantic focus prompts with left/right-headed linguistic prosodic rules.
- Demonstrates robust cross-lingual and zero-shot sim-to-real generalization across five English and Mandarin benchmarks.

## Problem

Alignment-free sentence stress detection models that rely entirely on text or self-supervised ASR backbones suffer from a semantic-prosodic trade-off, where deeper network layers prioritize semantic abstraction and attenuate fine-grained acoustic cues like pitch and duration. Prior approaches like Whistress, BERT, and traditional multi-stage pipelines requiring forced alignment (such as MFA with BLSTMs) either propagate errors, lack end-to-end optimization, or fail to accurately capture contrastive focus and complex Mandarin tonal prosody. Solving this gap is vital for rich ASR transcription, computer-assisted language learning (CALL), and expressive text-to-speech (TTS) systems.

## Method

ProWhistress builds on a frozen pre-trained Whisper backbone (using whisper-small.en for English and whisper-small for Mandarin) that acts as an implicit stream to generate transcriptions and semantic representations. To capture fine-grained acoustic features independently, a 3-layer Transformer Acoustic Encoder distills representations from intermediate layers (specifically Whisper encoder layer 9). 

The implicit and explicit streams are fused using a Stress Detection Head containing four components: an Additional Decoder Block (using Whisper encoder layer 12 and decoder layer 9) for implicit alignment, a Bottleneck Cross-Attention module that projects explicit features into a low-dimensional latent space (d_ctx = 256) for discriminative interaction and noise filtering, Gated Residual Fusion, and a 2-layer FCNN binary classifier. The gated fusion computes H_fused = H_imp + sigma(W_g [H_imp; H_exp] + b_g) * H_exp, where the gating bias b_g is initialized to -3.0 for a cold-start strategy. 

Models are optimized using weighted cross-entropy loss with a positive weight w_pos = 2.33 using the AdamW optimizer. Training runs for 2 epochs on large synthetic datasets and 4 epochs on smaller real datasets using a single RTX 3090 GPU.

## Experimental setup

Evaluated on five datasets: TinyStress-15k (15 hours, English synthetic), Expresso (47 hours, expressive English speech), EmphAssess (English synthetic subset), SinoStress-Syn (12 hours, Mandarin synthetic), and SinoStress-Real (3 hours, Mandarin human-recorded). Compared against BLSTM (+GT alignment), BLSTM (+MFA), EmphaClass (XLS-R based), and Whistress. Evaluated using Precision, Recall, and F1 score averaged over five random seeds (42–46).

## Results

On the English TinyStress-15k dataset, ProWhistress achieves state-of-the-art supervised performance with an F1 of 0.959, outperforming Whistress (0.909) and BLSTM + MFA (0.815). In zero-shot transfer from synthetic training to the real-world Expresso dataset, ProWhistress achieves an F1 of 0.820 compared to Whistress's 0.689. On Mandarin datasets, ProWhistress scores 0.958 F1 supervised on SinoStress-Syn and 0.870 F1 on SinoStress-Real, maintaining a near-identical 0.869 F1 under zero-shot transfer to SinoStress-Real. Ablations show that dropping the bottleneck cross-attention in favor of full-dimension attention reduces F1 to 0.950, and using acoustic features from Whisper layer 12 instead of layer 9 degrades F1 to 0.926 due to the semantic-prosodic trade-off.

| System | Dataset | Precision | Recall | F1 |
|---|---|---|---|---|
| BLSTM (+MFA) | TinyStress-15k | 0.776 | 0.859 | 0.815 |
| Whistress | TinyStress-15k | 0.912 | 0.906 | 0.909 |
| **ProWhistress** | TinyStress-15k | **0.953** | **0.966** | **0.959** |
| Whistress [0-shot] | Expresso | 0.573 | 0.863 | 0.689 |
| **ProWhistress [0-shot]** | Expresso | **0.737** | **0.924** | **0.820** |
| **ProWhistress** | SinoStress-Real | **0.821** | **0.926** | **0.870** |

## Limitations

Supervised performance on expressive real-world datasets like Expresso is omitted due to a lack of large-scale human annotations, requiring reliance on zero-shot generalization. The current architecture depends heavily on the chosen Whisper checkpoint's intermediate layer representations and assumes input text alignments provided implicitly by the ASR decoder.

## Why read this

Speech and ML researchers working on paralinguistics, prosody modeling, or end-to-end ASR augmentations should read this to see how a lightweight explicit acoustic stream and bottleneck fusion can resolve the semantic-prosodic bottleneck in self-supervised models like Whisper.

## Code

- https://github.com/Guhujian/ProWhistress.git

## Applications

Rich transcription in automatic speech recognition, automated prosodic feedback in computer-assisted language learning (CALL), and expressive text-to-speech (TTS) synthesis.

## Institutions / 機構

Southwest University, Chongqing Academy of Science and Technology

**Funding / 經費:** Chongqing Academy of Science and Technology Basic Research Funding

## Related

- (link related pages by id as the wiki grows)
