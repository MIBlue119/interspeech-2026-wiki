---
id: zhao26d_interspeech
category: speech-llm-dialogue
labels: [dataset-or-benchmark-release, generative-model]
institutions: ["SB Intuitions"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-976
pdf: https://www.isca-archive.org/interspeech_2026/zhao26d_interspeech.pdf
---

# Speech-Worthy Alignment for Japanese SpeechLLMs via Direct Preference Optimization

*Mengjie Zhao, Lianbo Liu, Yusuke Fujita, Hao Shi, Yuan Gao, Roman Koshkin, Yui Sudo*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-976)

**Category:** `speech-llm-dialogue` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — The paper adapts Japanese SpeechLLMs to generate concise, conversational, and TTS-friendly "speech-worthy" outputs using Direct Preference Optimization (DPO), and introduces SpokenElyza, a human-verified benchmark for Japanese speech-worthiness.

## Key contributions

- Applies preference-based alignment (DPO + SFT) to Japanese SpeechLLMs to bridge the gap between written-style text generation and natural spoken dialog.
- Introduces SpokenElyza, a 34-example benchmark derived from ELYZA-tasks-100 through modality filtering, GPT-based style transfer, and native expert auditory verification.
- Demonstrates that tuning key, query, and LayerNorm (KQ-LN) parameters across all transformer layers outperforms tuning only the top 4 layers during speech-worthy alignment.
- Releases the SpokenElyza dataset and evaluation suite to foster future research in Japanese spoken conversational models.

## Problem

SpeechLLMs that couple ASR-trained audio encoders with text-based LLM backbones inherit written-style output traits such as markdown formatting, bullet points, URLs, and complex syntactic structures. In Japanese, these written-style conventions diverge sharply from spoken conversational registers characterized by polite predicates, sentence-final particles, and simpler syntax. Direct synthesis of these written responses via TTS produces robotic, overly dense, or socially inappropriate audio. Prior speech-worthy alignment methods focus exclusively on text-based LLMs rather than end-to-end SpeechLLMs.

## Method

The architecture follows a Qwen2-Audio style design: a shallow projector layer connects a Whisper-large speech encoder to a Sarashina-7B LLM backbone. To adapt the model, the authors combine Direct Preference Optimization (DPO) with Supervised Fine-Tuning (SFT). The combined training loss is $L = w \cdot L_{\text{DPO}} + (1 - w) \cdot L_{\text{SFT}}$, where $w$ controls the preference learning weight. DPO directly optimizes the policy against preference pairs $(y_w, y_l)$ without needing a separate reward model, using a reference model $\pi_{\text{ref}}$ (the pretrained checkpoint) and a KL divergence constraint parameter $\beta$.

The training data pipeline utilizes translated and adapted datasets: SpeechPref, InstructS2S-200K (filtered via a score margin of $S_{\text{rejected}} \times 1.5 < S_{\text{chosen}}$), and DeepDialogue. For parameter selection, the authors freeze the base model and projector while exploring two fine-tuning strategies: updating the top four transformer layers (TopLayers) versus updating key, query, and LayerNorm parameters across all layers (KQ-LN). KQ-LN is chosen because style transfer primarily modifies attention patterns and distribution outputs rather than core knowledge.

At inference, the model utilizes a spoken system prompt to explicitly guide generation toward conversational phrasing, yielding synergistic improvements when combined with DPO training.

## Experimental setup

Evaluated on the Elyza benchmark (written-style ELYZA-tasks-100) and SpokenElyza (34 speech-worthy instances derived from Elyza). Metrics include LLM-as-judge scoring (using Qwen2.5-32B-Instruct on a 1-5 scale) and surface-form metrics: word count (via Janome tokenizer), dependency depth (via SpaCy Japanese parser), and non-vocalizable content percentage (NV%). Pretraining used 32 H100 GPUs (batch size 16/GPU) for 100K steps on ReazonSpeech and in-house datasets, updating only the projector at lr=1e-4. Preference training used 8 H100 GPUs for 2 epochs at lr=5e-6, sweeping DPO loss weight $w \in \{0.5, 0.9, 0.95, 0.99\}$.

## Results

On the SpokenElyza LLM-as-judge evaluation, the proposed DPO + SFT model combined with a spoken system prompt achieves a score of 3.44, representing an 18% relative improvement over the pretrained baseline (2.91). This alignment strategy simultaneously preserves performance on the written-style Elyza benchmark, dropping only slightly from 3.97 to 3.78 (a modest 5% relative drop). Surface-form evaluations show that the proposed system reduces word count from 325.9 to 77.8, lowers dependency depth from 6.38 to 4.97, and decreases non-vocalizable content (NV%) from 13.46% to 3.24%.

In parameter optimization comparisons, the KQ-LN fine-tuning strategy consistently outperforms TopLayers, yielding 3.44 vs 3.38 on SpokenElyza and 3.78 vs 3.61 on Elyza. Ablations on the DPO loss weight demonstrate that higher values (e.g., $w = 0.99$) consistently improve SpokenElyza scores—particularly for casual chit-chat datasets like DeepDialogue—by sharpening the contrast between spoken and written styles, though excessive weights slightly degrade performance on text-oriented tasks.

| System | Elyza (Score) | SpokenElyza (Score) | Word Count | NV % |
| --- | --- | --- | --- | --- |
| Pretrained (PT) | 3.97 | 2.91 | 325.91 | 13.46% |
| PT + Spoken Prompt | - | 2.94 | 65.53 | 3.69% |
| DPO + SFT | 3.78 | 2.97 | 302.15 | 12.65% |
| DPO + SFT + Spoken Prompt | - | **3.44** | 77.79 | **3.24%** |

## Limitations

The benchmark evaluation relies on a relatively small test set (34 validated examples in SpokenElyza) due to rigorous manual filtering and native expert auditory verification. The methodology is evaluated exclusively on Japanese, leaving cross-lingual generalization to other languages with high written-spoken stylistic divergences unverified. Furthermore, the approach requires synthetic data translation and LLM-as-judge scoring rollouts, which add curation complexity.

## Why read this

Researchers and engineers building Japanese spoken dialog systems or speech-to-speech LLMs will learn how to effectively combine DPO, specialized SFT data, and parameter-efficient tuning (KQ-LN) to eliminate robotic written-style text outputs without sacrificing instruction-following capabilities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time Japanese voice assistants, speech-to-speech translation systems, and conversational AI agents requiring natural audio synthesis.

## Institutions / 機構

SB Intuitions

## Related

- [A Speech-First Character Interface for Stylized Japanese Dialogue Practice](rackauckas26b_interspeech.md) — same problem · relatedness 2.0/3
- [X-OPD: Cross-Modal On-Policy Distillation for Capability Alignment in Speech LLMs](cao26_interspeech.md) — same problem · relatedness 2.0/3
- [Direct Preference Optimization for English-Mandarin Code-Switching Speech Recognition in Audio LLMs](nguyen26_interspeech.md) — shared technique · relatedness 2.0/3
- [Improving Stable Speech Synthesis Post-Training with ChatScorer and Margin-Based Preference Construction](niu26c_interspeech.md) — shared technique · relatedness 1.9/3
- [Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance](chen26y_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
