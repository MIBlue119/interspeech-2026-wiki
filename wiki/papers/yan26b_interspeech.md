---
id: yan26b_interspeech
category: speech-llm-dialogue
institutions: ["University of Science and Technology of China", "Alibaba Group", "East China Normal University", "Mohamed bin Zayed University of Artificial Intelligence", "Linkoping University", "University of Groningen", "Xinjiang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-619
pdf: https://www.isca-archive.org/interspeech_2026/yan26b_interspeech.pdf
---

# Consistent and Coherent Audio-Visual Understanding with Cross-Frame Patch Differential Attention and Cross-Modal Temporal Alignment

*Lecheng Yan, Chenyang Lyu, Haoqin Sun, Wenxi Li, Mohamed Fazli Imam, Jiahui Geng, Qing Li, Shaochen Jiang*

[PDF](https://www.isca-archive.org/interspeech_2026/yan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-619)

**Category:** `speech-llm-dialogue`

**TL;DR** — The paper introduces $C^2$AVLM, a framework for consistent audio-visual understanding featuring rotary position encoding with frequency injection, cross-frame patch differential attention, and temporally aligned cross-modal attention, achieving a state-of-the-art 50.30% accuracy on the AVSD benchmark.

## Key contributions

- A frame-level Rotary Position Encoding (RoPE) and modality-specific Frequency Injection mechanism that constructs a global cross-modal temporal coordinate system without explicit synchronization.
- Cross-Frame Patch Differential Attention (CFPDA) that tracks temporal visual dynamics and changes across frames linked to audio events via patch-level feature differences.
- Temporally Aligned Attention (TAA) with soft interpolation masks and adaptive quality-score weighting to allow cross-modal exchange while protecting modality-specific features.
- State-of-the-art performance on the AVSD dataset (50.30% ACC, 9.09 BLEU-4, 29.00 ROUGE-L) and robust generalization on audio-driven hallucination detection and long-form video understanding.

## Problem

Modern Multimodal Large Language Models (MLLMs) like LLaVA-1.5, InternVL-2.5, MiniCPM-v2.6, and Qwen-2.5-Omni typically process audio and visual streams through separate, decoupled pathways with limited interaction. This separation leads to critical failures in temporal synchronization and semantic alignment between what is seen and heard. Consequently, models struggle with fine-grained cross-modal tasks such as audio-visual event localization, moment retrieval, and mitigating cross-modal hallucinations. This gap demonstrates that simply scaling modalities is insufficient without explicit mechanisms for temporal coherence.

## Method

The framework leverages a pre-trained vision-language backbone and a Whisper-based audio encoder ($	au_a$). Video frames are split into $14 \times 14$ patches, compressed to $HWC/4 \times d$ tokens, while audio features $A$ are extracted across layers and projected to dimension $d$. Special <AUDIO> tokens act as placeholders in the text sequence.

To establish chronology, the model applies frame-level Rotary Position Encoding (RoPE) and modality-specific Frequency Injection. Frequency injection uses inverse-ordered patterns—ascending for video ($g_{\text{video}}(k) = k$) and descending for audio ($g_{\text{audio}}(k) = F - k$)—creating orthogonal signatures. For cross-modal interaction, Cross-Frame Patch Differential Attention (CFPDA) computes temporal differences $\delta_{p,t} = f_{p,t} - f_{p,t-1}$ across frames, projecting them through differential attention to track visual changes tied to audio events.

Simultaneously, Temporally Aligned Attention (TAA) computes frame-audio ratios $r = T_a / T_v$ to generate binary alignment masks and soft interpolation weights. Quality scores $q_v = \sigma(W_v V')$ and $q_a = \sigma(W_a A')$ adaptively balance raw modality features with cross-modal feed-forward updates ($V_{\text{inter}} = (1 - q_v) \cdot V + q_v \cdot \text{FFN}(V, V')$). Training optimizes an autoregressive language modeling cross-entropy loss over the unified representations while keeping base model parameters frozen except for the last 4 decoder layers and language modeling head.

## Experimental setup

Evaluated on the AVSD dataset (7,985 training and 1,863 validation video-dialogue pairs), AVHBench for cross-modal hallucination detection, LongVALE for long-form video understanding, and Video-MME for temporal coherence across 6 domains. Compared against 7 representative LVLMs including LLaVA-1.5, InternVL-2.5/3, MiniCPM-v2.6/o2.6, and Qwen-2.5-VL/Omni. Parameter-efficient fine-tuning uses a learning rate of $3e^{-5}$, cosine scheduling, batch size 8, bfloat16 precision, and 1 epoch on 8 A100 GPUs using sharded data parallelism.

## Results

C^2AVLM achieves an accuracy of 50.30% and a BERTScore-F1 of 89.87 on AVSD, outperforming all competitor models (e.g., beating Qwen-2.5-Omni's 46.95% accuracy despite Qwen processing all frames while C^2AVLM uses 8). In out-of-domain tests, it reaches 80.2% F1 on audio-driven hallucination detection on AVHBench and improves long-form temporal reasoning on Video-MME (50.7% accuracy without subtitles on long videos vs InternVL-3's 43.6%). Ablations confirm that removing audio evaluation drops accuracy to 41.40%, removing RoPE/Frequency drops accuracy to ~47.8%, and dropping CFPDA reduces performance to 48.91%. It exhibits weaker performance relative to specialist models on pure descriptive captioning metrics (e.g., CIDEr on LongVALE) due to formatting mismatches.

| System | ACC (%) | BLEU-4 | ROUGE-L | BERT-F1 |
|---|---|---|---|---|
| LLaVA-1.5 | 26.03 | 4.07 | 21.58 | 87.68 |
| InternVL-2.5 | 42.12 | 5.13 | 22.94 | 88.82 |
| MiniCPM o2.6 | 36.96 | 5.50 | 23.98 | 87.22 |
| Qwen-2.5-Omni | 46.95 | 2.79 | 12.46 | 85.62 |
| C^2AVLM (Ours) | 50.30 | 9.09 | 29.00 | 89.87 |

## Limitations

The model exhibits moderate performance lags in descriptive captioning tasks due to training format mismatches with certain long-form video benchmarks. Evaluation is predominantly validated on dialogue and QA benchmarks, leaving open-ended generation and dense audio-visual retrieval under-explored at scale. Additionally, the approach relies on frozen vision and audio backbones, bounding its adaptability to novel foundational feature spaces.

## Why read this

Speech and multimodal researchers should read this to understand how explicit temporal alignment mechanisms (RoPE frequency injection and differential patch attention) can resolve cross-modal inconsistencies in MLLMs without heavy architectural overhauls.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal video dialogue systems, audio-visual event localization, video moment retrieval, and automated cross-modal hallucination detection for surveillance or content moderation.

## Institutions / 機構

University of Science and Technology of China, Alibaba Group, East China Normal University, Mohamed bin Zayed University of Artificial Intelligence, Linkoping University, University of Groningen, Xinjiang University

## Related

- [AV-SyncBench: Decoupled Benchmarking of Temporal and Semantic Audio-Visual Synchronization](zhou26g_interspeech.md) — complementary · relatedness 2.0/3
- [Preserving Acoustic Cues for Video Reasoning: An Efficient Uniqueness-Driven Token Compression Framework](xue26d_interspeech.md) — same problem · relatedness 2.0/3
- [Do Modern Video-LLMs Need to Listen? A Benchmark Audit and Scalable Remedy](kim26s_interspeech.md) — same problem · relatedness 2.0/3
- [Which Speech Representation Better Matches Text-Native Reasoning? A Study of Speech-Text Alignment on Frame Rate and Representation](ye26_interspeech.md) — same problem · relatedness 2.0/3
- [A Closer Look at Failure Modes in Temporal Understanding of Large Audio-Language Models](kulkarni26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
