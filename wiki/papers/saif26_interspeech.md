---
id: saif26_interspeech
category: asr
labels: [multilingual, efficient-on-device, self-supervised]
institutions: ["Rensselaer Polytechnic Institute", "IBM", "Cornell Tech"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2771
pdf: https://www.isca-archive.org/interspeech_2026/saif26_interspeech.pdf
---

# BELLA: Efficient Bilevel Learning with LoRA for Multilingual ASR

*A F M Saif, Xiaodong Cui, Brian Kingsbury, Tianyi Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/saif26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/saif26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2771)

**Category:** `asr` · **Labels:** `multilingual`, `efficient-on-device`, `self-supervised`

**TL;DR** — BELLA is an efficient multilingual ASR framework that couples a pre-trained speech encoder with an LLM decoder via a bilevel optimization strategy, utilizing mixture-of-experts LoRA modules to eliminate cross-language interference. It achieves consistent Word Error Rate (WER) reductions across five CoVoST 2 languages compared to standard adapter baselines.

## Key contributions

- Formalized multilingual encoder-LLM ASR as a bilevel optimization problem, decoupling prediction-driven tasks (upper level: router and expert LoRAs) from alignment-driven tasks (lower level: bridge and shared adapter).
- Explicitly modeled cross-level coupling by linking the router's gating mechanisms to bridge outputs, allowing speech-text alignment to guide expert selection while receiving feedback from decoder losses.
- Developed an efficient single-loop, value-function-free penalty solver that alternates alignment and specialization updates without expensive inner-loop solves.
- Integrated a Whisper encoder with a Qwen2.5 7B decoder using a segment-level Q-Former bridge, augmented with load-balancing and entropy penalties for stable routing.

## Problem

Integrating LLMs as decoders for ASR usually pairs a pre-trained speech encoder with a frozen or lightly tuned LLM via a lightweight bridge. However, extending this encoder-LLM paradigm to multilingual settings introduces severe cross-language interference, where high-resource languages dominate and degrade low-resource performance due to conflicting linguistic patterns in shared parameters. Prior fixes like full fine-tuning are prohibitively expensive, while standard single-adapter approaches lack the capacity for multi-language specialization without manual partitioning.

## Method

BELLA combines a Whisper acoustic encoder (Base or Large-v2) with a frozen Qwen2.5 7B LLM decoder. Frame-level encoder features are mapped into the LLM token space via a segment-level Q-Former bridge network (80 queries, 2 blocks, 8 heads) that produces continuous prefix embeddings. The LLM decoder is augmented with K=5 expert LoRA modules (rank 16 on attention query and key projections) alongside a single shared LoRA adapter (Delta_0) that remains permanently active. A lightweight router processes mean-pooled bridge outputs concatenated with learned language embeddings to generate a probability simplex over the 5 expert adapters per utterance.

The training framework uses a bilevel optimization program. The lower-level objective minimizes an alignment loss consisting of an embedding regression loss (comparing bridge outputs to a frozen text encoder's hidden states via a learned projection), a teacher-student KL divergence distillation loss between text-conditioned and speech-conditioned decoder distributions, and weight decay on the shared adapter. The upper-level objective minimizes next-token prediction loss (ASR loss) augmented with load-balancing and entropy regularization terms to prevent router collapse, plus an optional language-ID supervision loss.

Tweaking parameters requires managing a bidirectional dependency: lower-level bridge outputs dictate the router's input features (gating weights), while upper-level adapter selection affects the gradients flowing back down to the bridge. To solve this efficiently without nested inner loops, BELLA utilizes a single-loop penalty-based alternating gradient descent algorithm. It executes one lower-level step updating the bridge and shared adapter, followed by one upper-level step updating the router and expert LoRAs using AdamW.

## Experimental setup

Evaluated on five languages from the CoVoST 2 dataset (English, Spanish, Russian, Portuguese, and Swedish) spanning multiple language families and resource tiers. The input audio is sampled at 16kHz (capped at 30 seconds). Baselines include vanilla Whisper backbones (Base and Large), Bridge-Only (BO), Single-LoRA (SL), and a Multilingual LoRA (ML) baseline with pre-assigned language adapters. Metrics are reported in Word Error Rate (WER %). Implementation uses AdamW optimizer, learning rates of 2e-4 (upper level) and 5e-5 (lower level), batch size 16 with gradient accumulation of 2, trained for up to 500 epochs with early stopping.

## Results

On the Whisper-Base backbone, BELLA reduces WER across most languages, yielding 2-4% relative improvements over the vanilla backbone and consistently outperforming BO and SL. For instance, on Russian (Base), BELLA achieves 35.5% WER compared to 36.2% for the vanilla Base and 36.1% for BO. While a static Multilingual LoRA (ML) baseline marginally outperforms BELLA on certain high-resource languages (e.g., English at 25.3% vs BELLA's 25.5%), ML requires explicit language identity at inference time, whereas BELLA dynamically routes experts without prior language specification. With the Whisper-Large backbone, BELLA maintains robust improvements, achieving 13.5% on English, 11.0% on Spanish, 9.1% on Russian, 9.7% on Portuguese, and 13.8% on Swedish.

| System / Condition | English (WER) | Spanish (WER) | Russian (WER) | Portuguese (WER) | Swedish (WER) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Whisper-Base | 26.8 | 31.2 | 36.2 | 30.4 | 47.9 |
| Bridge-Only (BO) | 26.2 | 30.8 | 36.1 | 30.1 | 47.7 |
| Single-LoRA (SL) | 25.9 | 30.7 | 35.9 | 30.0 | 47.6 |
| Multilingual LoRA (ML) | 25.3 | 29.8 | 30.4 | 29.7 | 47.4 |
| BELLA (Ours) | 25.5 | 29.9 | 35.5 | 29.4 | 47.1 |

## Limitations

The evaluation is restricted to five languages from CoVoST 2, leaving its scaling properties across dozens or hundreds of low-resource languages untested. The model relies heavily on a large frozen 7B LLM decoder, which incurs high inference memory overhead and limits on-device deployment capabilities. Additionally, the approach requires tuning multiple hyperparameter weights balancing the alignment losses against the prediction losses.

## Why read this

Speech and ML researchers studying modular adaptation of large language models for speech will find this paper a clean formulation of bilevel optimization for decoupled cross-modal alignment and task specialization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual speech recognition systems and cross-lingual spoken translation engines requiring robust deployment across diverse linguistic resources without full model fine-tuning.

## Institutions / 機構

Rensselaer Polytechnic Institute, IBM, Cornell Tech

## Related

- [PART: Progressive Alignment Representation Training for Multilingual Speech-To-Text with LLMs](zhang26aa_interspeech.md) — same problem · relatedness 2.6/3
- [MambAdapter: Lightweight Mamba-Based Adapters for Parameter-Efficient Transfer Learning in Speech and Audio](ali26b_interspeech.md) — same problem · relatedness 2.5/3
- [Token-Independent Language Representations for Low-Latency Configurable Multilingual Speech Recognition](zhu26c_interspeech.md) — same problem · relatedness 2.5/3
- [Upcycling Pretrained Transformers into Mixture-of-Experts for Multilingual Speech Recognition](shinayama26_interspeech.md) — same problem · relatedness 2.4/3
- [Confidence-Gated Mean-Teacher Consistency Regularization for Low-Resource Multilingual ASR with Shared–Private Fusion-LoRA](liu26h_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
