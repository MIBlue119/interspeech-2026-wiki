---
id: shinayama26_interspeech
category: asr
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1630
pdf: https://www.isca-archive.org/interspeech_2026/shinayama26_interspeech.pdf
---

# Upcycling Pretrained Transformers into Mixture-of-Experts for Multilingual Speech Recognition

*Kentaro Shinayama, Kohei Matsuura, Jaeyoung Lee, Masato Mimura*

[PDF](https://www.isca-archive.org/interspeech_2026/shinayama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shinayama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1630)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — The paper proposes converting the feed-forward network (FFN) layers of a pretrained Transformer decoder into a sparse Mixture-of-Experts (MoE) architecture via parameter upcycling, increasing multilingual speech recognition capacity without increasing inference cost. This approach outperforms standard multilingual fine-tuning and even monolingual upper bounds on 10-language benchmarks.

## Key contributions

- Introduces an FFN upcycling method to transform dense pretrained Whisper decoders into sparse Mixture-of-Experts models for multilingual ASR, avoiding the capacity bottlenecks of low-rank/adapter approaches.
- Compares soft routing (with and without language embeddings) against language-wise hard routing, demonstrating that explicit hard routing prevents cross-lingual interference and yields superior performance.
- Shows that selective upper-layer MoE application (e.g., top 3 to 6 layers) achieves performance comparable to full-decoder upcycling while substantially reducing the number of trainable parameters.
- Demonstrates scalability by successfully applying the upcycling method to larger models such as Whisper-medium (0.77B) and Whisper-large-v2 (1.55B).

## Problem

Multilingual end-to-end ASR models often suffer from negative transfer when trained on highly diverse corpora because single-model parameter capacities are inherently constrained and output vocabularies are shared across distant languages. Standard parameter-efficient methods like LoRA-based adapters rely on low-rank or bottleneck modules whose limited effective capacity fails to represent diverse language-specific patterns. Consequently, joint multilingual fine-tuning routinely underperforms separate monolingual training, failing to fully leverage cross-lingual representations without capacity expansion.

## Method

The framework takes a pretrained Whisper model (specifically utilizing a 12-layer encoder and 12-layer decoder) and leaves the encoder frozen or unchanged while upcycling the decoder's FFN layers into $N$ distinct experts. The original dense FFN transformation defined by linear weights $W_1$ and $W_2$ with non-linear activation $\sigma(x)$ is replicated to initialize $N$ parallel experts $E_n$ with parameters $W_1^{(n)}$ and $W_2^{(n)}$. Following the Switch Transformer paradigm, top-1 sparse routing is employed so that exactly one expert is active per input token, keeping per-token compute and active parameters identical to the dense model.

Three routing strategies are investigated: (1) simple soft routing using a linear gating network over decoder hidden representations $h_t$, (2) soft routing augmented with language embeddings $e_l$ concatenated to $h_t$, and (3) language-wise hard routing where samples from a specific language are deterministically routed to a dedicated expert index mapped one-to-one. Hard routing enforces explicit language separation, preventing cross-lingual interference within experts. The encoder remains untouched to preserve shared acoustic representations learned from large-scale pretraining, while the decoder handles token-level grapheme predictions and benefits from the added capacity.

Models are trained using the ESPnet toolkit with the Transformer learning rate schedule peaking at $3.0 \times 10^{-5}$ with 2000 warmup steps for 20 epochs, averaging the 5 checkpoints with the lowest validation CERs. The number of experts is set to match the language count (e.g., $N=10$ for CommonVoice 10-languages, $N=4$ for SLR Asian-4langs), with alternative placements exploring subsets of upper decoder layers to optimize parameter counts.

## Experimental setup

Evaluated on CommonVoice v16.1 (10 languages split into Western WE-5langs: de, en, fr, it, es with 31.5 to 1720.8 hours, and Other-5langs: bn, ru, sw, th, tr with 31.5 to 69.4 hours) and an Asian-4langs dataset combining OpenSLR sets for Javanese, Tamil, Vietnamese, and Chinese. Compared against MonoFT (monolingual fine-tuning upper bound), MultiFT (standard joint multilingual fine-tuning baseline), and LoRA-MoE (10 LoRA experts with rank 16 per FFN). Metrics include Word Error Rate (WER) for WE-5langs and Character Error Rate (CER) for Other-5langs and Asian languages.

## Results

On CommonVoice 10-languages using Whisper-small, standard MultiFT achieves an average WER of 13.6% (WE-5langs) and CER of 15.2% (Other-5langs), underperforming the MonoFT upper bound (12.6% WER / 13.8% CER). The proposed upcycled MoE with language-wise hard routing achieves the best overall performance with a WE-5langs WER of 12.3% and Other-5langs CER of 13.4%, outperforming even the monolingual upper bound. The LoRA-based MoE baseline lags behind at 15.4% WER / 13.7% CER. On the SLR Asian-4langs dataset, hard-routing upcycled MoE drops the average CER from 6.2% (MultiFT) down to 5.2% (a 16% relative improvement), whereas soft-routing underperforms at 7.0% CER.

Ablation studies on layer placement reveal that applying MoE exclusively to the top decoder layers (e.g., layers 7 to 12) yields an average WE-5langs WER of 12.2% and Other-5langs CER of 13.2%, matching or exceeding full-layer upcycling while reducing trainable parameters. Scaling to larger backbones demonstrates consistent gains: Whisper-medium MultiFT achieves 10.6% WER / 12.7% CER versus 10.3% WER / 12.0% CER for upcycled MoE, and Whisper-large-v2 improves from 9.7% WER / 12.0% CER down to 9.6% WER / 11.6% CER. Soft routing without hard partitioning fails to outperform hard routing due to insufficient expert diversification.

| System | WE-5langs WER (%) | Other-5langs CER (%) |
|---|---|---|
| Mono FT (Upper Bound) | 12.6 | 13.8 |
| Multi FT (Baseline) | 13.6 | 15.2 |
| LoRA MoE (soft) | 15.4 | 13.7 |
| Upcycled MoE (soft, N=10) | 13.2 | 14.8 |
| Upcycled MoE (hard, N=10) | 12.3 | 13.4 |
| Upcycled MoE (hard, top 7-12) | 12.2 | 13.2 |

## Limitations

The hard routing strategy requires prior knowledge of language identities for each input sample during training and inference, limiting its application in unconstrained code-switched or language-agnostic streaming scenarios. Soft routing methods remain suboptimal due to insufficient expert diversification when initialized via direct replication. The evaluation focuses primarily on decoder FFN upcycling with Whisper, leaving encoder-side upcycling and other speech foundation model architectures less explored.

## Why read this

Speech researchers and engineers working on multilingual ASR scaling will benefit from this paper's direct, computationally efficient alternative to parameter-efficient adapters. It provides clear empirical evidence that upcycling dense FFNs into hard-routed MoEs in upper decoder layers mitigates negative transfer and outperforms monolingual baselines without increasing inference overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

High-accuracy multilingual automatic speech recognition systems for cloud and on-premise deployment where inference latency must remain equivalent to dense single-language models.

## Institutions / 機構

NTT

## Related

- (link related pages by id as the wiki grows)
