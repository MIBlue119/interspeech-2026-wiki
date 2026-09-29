---
id: cao26b_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device, generative-model]
institutions: ["Tsinghua University", "Zhejiang University", "Tencent"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1737
pdf: https://www.isca-archive.org/interspeech_2026/cao26b_interspeech.pdf
---

# Audio-NSP: Data-Centric Semi-Autoregressive Generation for Large Audio-Language Models

*Liang Cao, Xize Cheng, Dongjie Fu, Weihao Wu, Fuming You, Zhiyong Wu, Haifeng Hu*

[PDF](https://www.isca-archive.org/interspeech_2026/cao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1737)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — Audio-NSP enables zero-overhead, semi-autoregressive parallel generation in large audio-language models (LALMs) via blockwise SFT and a modality-aware dynamic truncation strategy, achieving up to 3.42x speedups while preserving generation quality.

## Key contributions

- Introduces Audio-NSP, a data-centric semi-autoregressive framework that activates parallel token generation via SFT with zero structural modifications or auxiliary heads.
- Identifies the decoding dilemma caused by the modal entropy gap between deterministic text tokens and high-entropy, one-to-many acoustic speech tokens.
- Proposes a modality-aware dynamic truncation strategy that applies strict thresholds for text and lenient thresholds for audio to prevent degeneration or fidelity loss.
- Achieves up to 3.42x speedups across ASR, Spoken Question Answering (SQA), and TTS while outperforming fixed-length Multi-Token Prediction (MTP) baselines.

## Problem

Large Audio-Language Models (LALMs) unify speech and text in an autoregressive fashion but suffer from severe inference latency because discrete audio sequences are orders of magnitude longer than text. Prior parallel generation approaches either require training native non-autoregressive models from scratch—destroying pretrained cross-modal reasoning—or rely on auxiliary multi-token prediction (MTP) heads and speculative decoding. These auxiliary head methods introduce memory overhead and struggle to model continuous, high-entropy acoustic mappings, leading to severe audio quality degradation. This paper matters because it resolves the latency bottleneck of LALMs without sacrificing foundation model architecture or audio fidelity.

## Method

Audio-NSP appends multiple prediction blocks to the original sequence during training to bypass standard in-place masking inefficiencies. For a sequence X of length L, K starting indices are sampled from the response, and blocks B^(k) of length W are constructed using an anchor token followed by W-1 learnable mask tokens M. Positional embeddings are explicitly matched to original sequence logical positions (P(xtk) = tk, P(Mj) = tk + j), and a customized attention mask ensures causal attention for prefixes, historical context for blocks, and bidirectional intra-block visibility while isolating different blocks. Training uses standard Cross-Entropy loss computed solely on the masked tokens.

During inference, the model operates in a predict-verify-accept cycle. At step t, W-1 mask tokens are appended, probability distributions are predicted in parallel, and an optimal acceptance length L is determined using modality-aware dynamic truncation. Because text tokens exhibit low entropy and sharp distributions while acoustic tokens have flatter distributions and higher entropy due to one-to-many speech mappings, a uniform threshold causes single-token degeneration. The acceptance length is defined as L = max {k | forall i <= k, C(xt+i) > tau(mi)}, assigning a strict threshold tau_text = 0.8 for text and a lenient threshold tau_audio = 0.2 for audio.

The framework uses VITA-Audio-Plus-Vanilla as a backbone, block length W = 4, dynamic sequence packing up to maximum context length L_max, learning rate 5e-6, batch size 256, and is trained for 140k steps.

## Experimental setup

Evaluated on WenetSpeech-meeting, WenetSpeech-net, AIShell-test, LibriSpeech (clean and other) for ASR; LlamaQuestion, TriviaQA, WebQuestion for SQA (Spoken Question Answering); and Seed-test-zh, Seed-test-en, Seed-test-hard, LibriTTS-test-clean for TTS. Metrics include WER/CER for ASR/TTS, Accuracy for SQA, and Tokens Per Step (TPS) for inference speedup. Baselines include VITA-Base and VITA-MTP (VITA-Audio-Plus-Boost).

## Results

Audio-NSP achieves an average ASR WER of 5.71 (a minor +1.20% degradation vs 6.65 for MTP) with an average speedup of 3.11x, peaking at 3.42x on LibriSpeech-clean with a WER of 2.88 (vs 3.13 for MTP). In SQA tasks, it matches or outperforms baselines while reaching up to 254 TPS. For TTS, it strictly outperforms MTP across all benchmarks, achieving an average WER/CER of 4.06 (+0.29 degradation vs 4.45 for MTP) with ~1.93x speedup. The more moderate speedup in TTS is a deliberate design choice: continuous acoustic representations have high entropy and low error tolerance, causing the system to safely fall back to finer-grained steps during high-uncertainty transitions.

| System / Condition | ASR LibriSpeech-clean (WER_↓_) | ASR AIShell-test (WER_↓_) | TTS Seed-test-en (WER_↓_) | Speedup (TPS) |
|---|---|---|---|---|
| VITA-Base | 2.00 | 1.94 | 1.85 | 1.00x |
| VITA-MTP | 3.13 | 4.72 | 2.21 | ~3.0x |
| Audio-NSP (Ours) | 2.88 | 2.29 | 2.13 | 3.42x |

## Limitations

The approach relies on a pre-trained LALM backbone and inherits its tokenization and sequence length constraints (L_max). The audio speedup is intentionally capped compared to text due to modality-aware fallback mechanisms required to protect acoustic fidelity. Evaluation is constrained to specific open-source ASR, SQA, and TTS corpora, leaving multilingual cross-lingual transfer at massive scale untested.

## Why read this

Speech and ML engineers looking to deploy or accelerate LALMs without retraining foundation models from scratch should read this to understand how to design blockwise parallel generation and handle the modal entropy gap between text and speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time conversational AI assistants, low-latency spoken dialogue systems, and high-throughput speech synthesis and recognition services.

## Institutions / 機構

Tsinghua University, Zhejiang University, Tencent

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
