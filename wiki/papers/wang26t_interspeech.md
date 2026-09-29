---
id: wang26t_interspeech
category: speech-llm-dialogue
institutions: ["Tianjin University", "Nanyang Technological University", "Huiyan Technology", "Shenzhen Institute of Advanced Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1212
pdf: https://www.isca-archive.org/interspeech_2026/wang26t_interspeech.pdf
---

# MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models

*Junyu Wang, Jian Zong, Tianrui Wang, Zhengding Luo, Meng Ge, Xiaobao Wang, Longbiao Wang, Jianwu Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1212)

**Category:** `speech-llm-dialogue`

**TL;DR** — MATA is a training-free inference-time intervention that combats cross-modal attention imbalance in Large Audio Language Models (LALMs) by dynamically amplifying attention weights toward audio tokens in intermediate decoder layers, improving average reasoning accuracy by up to 5.4% on MMAR and securing second place in the Interspeech 2026 Audio Reasoning Challenge.

## Key contributions

- Identifies and systematically analyzes cross-modal attention bias in LALMs (using Qwen2.5-Omni-7B as a case study), showing that intermediate decoder layers severely under-attend to audio tokens compared to system and instruction text.
- Proposes MATA (Pay More Attention To Audio), a training-free intervention applied directly to the raw attention scores of the final token in intermediate layers without adding parameters or computational overhead.
- Demonstrates consistent performance gains across multiple prominent LALM architectures (Qwen2-Audio, Qwen2.5-Omni, Ke-Omni-R, and Qwen3-Omni-Thinking) on the MMAU and MMAR benchmarks.
- Achieves second place in the Single Model Track of the Interspeech 2026 Audio Reasoning Challenge, showing significant improvements in intermediate Chain-of-Thought factuality, logic, and completeness rubric scores.

## Problem

Large Audio Language Models (LALMs) integrate pre-trained text LLMs with audio encoders, inheriting a strong textual prior that leads to cross-modal attention imbalance. During autoregressive decoding, models disproportionately allocate attention to text instructions and system tokens while under-utilizing critical acoustic information, particularly in intermediate layers responsible for multi-modal fusion. This attention bias results in poor audio reasoning capabilities, hallucinations, and a heavy reliance on textual guessing rather than acoustic comprehension.

## Method

MATA intervenes during autoregressive decoding in the self-attention module, specifically operating after raw attention scores (computed via dot-product between queries $Q$ and keys $K$, scaled by $\sqrt{d_k}$) are generated, but before the softmax normalization function is applied. To focus the intervention where it matters most, MATA modifies only the attention scores corresponding to the last token in the sequence (which determines the next output) across specified intermediate decoder layers.

The modified raw attention score $\hat{A}_{h,i,j}$ for head $h$, query position $i$, and key position $j$ is calculated by adding an enhancement term $\alpha$ to keys falling within the audio token index range $[a_s, a_e]$: $\hat{A}_{h,i,j} = A_{h,i,j} + \alpha$ if $j \in [a_s, a_e]$, and remains unchanged otherwise. These adjusted scores are then fed into the standard softmax and multiplied by value tokens $V$.

The method requires no additional trainable parameters or retraining. Based on empirical ablations, the optimal enhancement strength is set to $\alpha = 0.10$, and the intervention is strictly restricted to intermediate layers 10 through 20. Applying MATA outside these layers—such as early layers (0-10), which causes catastrophic failure due to corrupted initial encodings, or late layers (20-28), where fusion is already complete—yields degraded performance.

## Experimental setup

Evaluated on the MMAU test-mini benchmark (1k audio clips covering sound, music, and speech) and the MMAR benchmark (1,000 test audio clips covering single and mixed modalities), alongside the Interspeech 2026 Audio Reasoning Challenge evaluation suite. Baselines include proprietary and open-source models like Gemini 2.0 Flash, GPT-4o Audio, LTU, GAMA, SALMONN, Audio Flamingo 2, Audio-Reasoner, Kimi-Audio, Qwen2-Audio-7B-Instruct, Qwen2.5-Omni-7B, Ke-Omni-R-7B, and Qwen3-Omni-Thinking. Metrics include task accuracy percentages and the MMAR-Rubrics score assessing intermediate Chain-of-Thought factuality, logic, and completeness.

## Results

On the MMAU benchmark, applying MATA to Qwen2-Audio-7B-Instruct raised average accuracy from 59.4% to 64.8%, and on Qwen2.5-Omni-7B raised average accuracy from 71.1% to 73.6% (improving sound accuracy from 77.8% to 79.9% and music accuracy from 64.7% to 68.3%). On the more challenging MMAR benchmark, MATA boosted Qwen2.5-Omni-7B average accuracy from 56.6% to 61.2% and further improved the RL-fine-tuned Ke-Omni-R-7B from 64.1% to 66.8% (with speech accuracy jumping from 64.6% to 70.1%).

In the Interspeech 2026 Audio Reasoning Challenge using Qwen3-Omni-Thinking, MATA improved final answer accuracy from 68.6% to 71.0% and significantly increased the MMAR-Rubrics reasoning quality score from 58.7% to 62.6%. Ablations show that $\alpha = 0.10$ is optimal; setting $\alpha$ too high or low reduces gains, and applying MATA to early layers (0-10) collapses accuracy to near zero (0.9% average on MMAU).

| System / Condition | MMAU Avg (%) | MMAR Avg (%) | Challenge Rubrics Score |
|---|---|---|---|
| Qwen2.5-Omni-7B (Baseline) | 71.1 | 56.6 | - |
| Qwen2.5-Omni-7B + MATA (Ours) | 73.6 | 61.2 | - |
| Ke-Omni-R-7B (Baseline) | - | 64.1 | - |
| Ke-Omni-R-7B + MATA (Ours) | - | 66.8 | - |
| Qwen3-Omni-Thinking (Baseline) | - | - | 58.7 |
| Qwen3-Omni-Thinking + MATA (Ours) | - | - | 62.6 |

## Limitations

The method relies on manually tuned hyperparameters ($\alpha$ and target layer indices) which may require minor adjustments across different model families and scales. It is evaluated primarily on dense and MoE Qwen-derived architectures, leaving its plug-and-play efficacy unverified on fundamentally different LALM encoder-decoder structures. Furthermore, as a training-free inference-time intervention, it does not permanently correct the underlying representations encoded during pre-training.

## Why read this

Researchers and engineers working on Large Audio Language Models who want a lightweight, parameter-free strategy to eliminate cross-modal attention bias and improve Chain-of-Thought reasoning without expensive retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving explainable audio question answering, audio reasoning, complex soundscape interpretation, and speech-text multimodal conversational agents.

## Institutions / 機構

Tianjin University, Nanyang Technological University, Huiyan Technology, Shenzhen Institute of Advanced Technology

## Related

- [Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026](noronha26_interspeech.md) — shared data / evaluation · relatedness 2.9/3
- [VISA: A Visual Information Strengthened Audio-Reasoning System for the Interspeech 2026 ARC Agent Track](tu26b_interspeech.md) — same problem · relatedness 2.9/3
- [Multi-Source Evidence Fusion for Audio Question Answering](olev26_interspeech.md) — same problem · relatedness 2.9/3
- [A Closer Look at Failure Modes in Temporal Understanding of Large Audio-Language Models](kulkarni26_interspeech.md) — same problem · relatedness 2.8/3
- [Audio-Cogito: Towards Deep Audio Reasoning in Large Audio Language Models](li26o_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
