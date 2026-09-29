---
id: nguyen26c_interspeech
category: tts
labels: [efficient-on-device, generative-model]
institutions: ["Korea Advanced Institute of Science and Technology", "Chung-Ang University"]
code: https://mm.kaist.ac.kr/projects/mamtra/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1031
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26c_interspeech.pdf
---

# MamTra: A Hybrid Mamba-Transformer Backbone for Speech Synthesis

*Tan Dat Nguyen, Sangmin Bae, Joon Son Chung, Ji-Hoon Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1031)

**Category:** `tts` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — MamTra is an interleaved Mamba-Transformer architecture for text-to-speech that initializes Mamba blocks from pretrained Transformer weights using closed-form parameter transfer, cutting inference VRAM usage by 34% with only a 0.25% absolute increase in Word Error Rate.

## Key contributions

- Introduces MamTra, the first systematic study of a hybrid Mamba-Transformer speech synthesis backbone initialized from a pretrained Transformer without training from scratch.
- Proposes a closed-form structural mapping to initialize Mamba projection weights (C, B, x) directly from pretrained Transformer Q, K, and V weights.
- Develops a multi-level distillation strategy using cross-entropy, skew KL-divergence logit matching, and embedding MSE to recover performance on just 2% (0.5k hours) of the teacher's training data.
- Performs an exhaustive evaluation of placement strategies (BlockBeg, End, Front, Middle, Back, Sandwich, WER-importance) and Transformer-to-Mamba ratios (1:1 to 1:11).

## Problem

Autoregressive Transformer-based text-to-speech models scale with quadratic O(L^2) time and memory complexity, creating extreme latency and KV-cache footprints during long-form generation (podcasts, audiobooks, streaming dialogue). While pure State Space Models (SSMs) like Mamba offer linear O(L) time and O(1) inference memory, they fall short of Transformers in global context reasoning and expressivity at scale. Existing hybrid models either rely on training entirely from scratch with prohibitive computational costs or lack public technical details, leaving the optimal design space for hybrid TTS unexplored.

## Method

MamTra builds on the CosyVoice 2 (Qwen2.5-based) backbone by replacing select Transformer layers with Mamba-2 blocks. The architectural bridge relies on the mathematical equivalence between the Transformer's attention mechanism (with the softmax removed) and Mamba's selective recurrent formulation: key (K) and value (V) projections map to Mamba's input-dependent parameter B and projected input x, while the query (Q) aligns with output projection C. Based on this structural mapping, pretrained Q, K, and V weights are directly copied into the corresponding Mamba parameter projections.

Because linearization alters attention dynamics, MamTra employs a multi-level distillation framework combining three objectives: ground-truth supervision via cross-entropy loss (L_CE), generation behavior recovery via skew KL-divergence minimization on logits (L_logits), and a mean-squared error constraint on token embeddings (L_emb). The optimization uses the Adam optimizer with a learning rate of 1e-5 and dynamic batch sizing of 40,000 tokens on NVIDIA A6000 GPUs.

Placement strategies include Interleaved (BlockBeg/BlockEnd), Contiguous (Front/Middle/Back/Sandwich), and Data-driven (importance-based via cosine similarity or WER). Conservative ratios (1:1, 1:3) pair best with the BlockBeg strategy, whereas aggressive ratios (1:5, 1:11) benefit from WER-guided data-driven layer importance selection.

## Experimental setup

Models are trained on 0.5k hours of the LibriTTS dataset and evaluated on the Seed-TTS-eval test-en benchmark and LibriTTS test-clean split. Baselines include Llasa-1B (1.3B params, Llama-3.2), CosyVoice 2 (0.5B params, Qwen2.5, 170k hours), and Zonos-v0.1 (1.6B params, hybrid). Evaluation metrics include UTMOS, Speaker Similarity (SSIM), Word Error Rate (WER), character error rate (CER), and Naturalness Mean Opinion Score (NMOS with 95% confidence intervals).

## Results

The MamTra 1:1 configuration matches the CosyVoice 2 teacher's perceptual quality (UTMOS 4.16 vs 4.15, SSIM 0.72 vs 0.66) while reducing per-token FLOPs at 2048 context length and cutting VRAM usage by 34%, incurring only a minor 0.25% absolute increase in WER (2.28% vs 2.03%). Under length-stress conditions (1–62 words), the MamTra 1:5 (WER) configuration achieves robust performance with a 2.28% WER, 4.36 UTMOS, and 0.75 SSIM, outperforming the Zonos-v0.1 baseline.

Ablation studies demonstrate that removing any distillation loss component severely hurts linguistic accuracy, with L_CE dropping intelligibility the most. Reusing pretrained weights drastically accelerates training convergence compared to Xavier or Kaiming initialization.

| System | Hybrid | Params | Ratio | TFLOPs (2k ctx) | Seed-TTS UTMOS | Seed-TTS SSIM | Seed-TTS WER | LibriTTS UTMOS | LibriTTS WER |
|---|---|---|---|---|---|---|---|---|---|
| Llasa-1B | No | 1.3B | 1:0 | – | 3.64 | 4.13 | 0.46 | 3.54 | 3.07 |
| CosyVoice 2 | No | 0.5B | 1:0 | 1.78 | 3.68 | 4.15 | 0.66 | 2.03 | 2.04 |
| Zonos-v0.1 | Yes | 1.6B | 1:3 | 7.32 | 3.18 | 3.63 | 0.67 | 3.42 | 3.37 |
| MamTra 1:1 | Yes | 0.5B | 1:1 | 1.64 | 3.66 | 4.16 | 0.72 | 2.28 | 2.26 |
| MamTra 1:3 | Yes | 0.5B | 1:3 | 1.57 | 3.65 | 4.14 | 0.72 | 3.26 | 2.99 |
| MamTra 1:5 | Yes | 0.5B | 1:5 | 1.54 | 3.65 | 4.13 | 0.72 | 2.53 | 2.28 |

## Limitations

The evaluation is constrained to English speech synthesis datasets (LibriTTS and Seed-TTS-eval). Aggressive hybrid ratios like 1:11 experience noticeable degradation in intelligibility (WER rising to ~4%), establishing an upper bound on safe architectural substitution without larger distillation budgets.

## Why read this

Speech and ML engineers looking to deploy LLM-based TTS systems on resource-constrained hardware will find MamTra's blueprint for converting heavy autoregressive Transformers into efficient hybrid Mamba models via weight transfer and multi-level distillation invaluable.

## Code

- https://mm.kaist.ac.kr/projects/mamtra/

## Applications

On-device voice assistants, real-time streaming dialogue agents, long-form audiobook and podcast generation.

## Institutions / 機構

Korea Advanced Institute of Science and Technology, Chung-Ang University

**Funding / 經費:** Ministry of Science and ICT, Korea

## Related

- (link related pages by id as the wiki grows)
