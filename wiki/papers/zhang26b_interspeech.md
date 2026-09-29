---
id: zhang26b_interspeech
category: speech-llm-dialogue
institutions: ["Shanghai Jiao Tong University", "University of New South Wales", "Nanyang Technological University", "StepFun"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-256
pdf: https://www.isca-archive.org/interspeech_2026/zhang26b_interspeech.pdf
---

# Step-Audio-R1: Why Audio LLMs Fail at Reasoning — The Trap of Textual Surrogates

*Yuxin Zhang, Daijiao Liu, Haoyang Zhang, Xiangyu Zhang, Yuxin Li, Fei Tian, Yayue Deng, Donghang Wu, Jun Chen, Liang Zhao, Chengyuan Yao, Gaolei Li, Quanhai Zhang, Qiquan Zhang, Hexin Liu, Eng Siong Chng, Xuerui Yang, Xiangyu Zhang, Daxin Jiang, Gang Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-256)

**Category:** `speech-llm-dialogue`

**TL;DR** — Step-Audio-R1 introduces Modality-Grounded Reasoning Distillation (MGRD) to solve the inverted reasoning scaling problem in audio LLMs, achieving an average score of 83.6% on speech-to-text benchmarks that outperforms Gemini 2.5 Pro.

## Key contributions

- Identifies textual surrogate reasoning as the root cause of performance degradation during extended audio model deliberation.
- Proposes Modality-Grounded Reasoning Distillation (MGRD), an iterative framework combining self-distillation and multimodal RL to anchor reasoning in acoustic features.
- Implements a composite reward strategy incorporating a think-format penalty to prevent systematic reasoning collapse and maintain 2,300-2,800 token thought chains.
- Develops a DPO-based self-cognition calibration pipeline that reduces audio-perception denial errors from 6.76% down to 0.02%.

## Problem

Audio language models consistently suffer from inverted scaling behavior where performance degrades as test-time reasoning length increases, unlike text and vision domains. Prior work attributes this to audio being inherently resistant to reasoning or uses language-model judges that only enforce consistency. The authors uncover that models engage in textual surrogate reasoning—deliberating over transcript-like abstractions rather than low-level acoustic properties like pitch contours, timbre, or rhythmic structures. This stems from initializing CoT capabilities via text-derived supervised fine-tuning, which creates a modality mismatch.

## Method

Step-Audio-R1 is built on a Qwen2 audio encoder, a downsampling audio adaptor that compresses frame rate to 12.5 Hz, and a Qwen2.5-32B LLM decoder. The framework processes latent audio features directly through the LLM decoder to produce explicit reasoning chains inside <think> tags followed by the final answer.

The training pipeline begins with a Cold-Start phase using 5M samples (1B text and 4B audio tokens) for joint SFT and reinforcement learning with verified rewards (RLVR) with 10% distilled audio CoT. Following this, the MGRD framework executes iterative cycles of self-distillation where the model generates $K=16$ candidate reasoning responses on perceptual audio data. These are filtered for acoustic grounding, logic, and correctness to curate $D_t^{	ext{audio-cot}}$.

The subsequent multimodal reinforcement learning uses PPO with a zero KL penalty coefficient, a clipping range of 0.2, a discount factor of 1.0, and a maximum sequence length of 10,240 tokens. The reward function combines a 0.8 weight for answer accuracy and a 0.2 weight for the presence of the reasoning format. A difficulty-based filtering strategy selects samples where pass@8 falls within [3, 6], discarding trivial or unsolvable tasks to maintain stable reward convergence.

## Experimental setup

Evaluated on speech-to-text benchmarks including Big Bench Audio (BBA), Spoken MQA (SMQA), MMSU, MMAU, and Wild Speech (WS), alongside the Big Bench Audio speech-to-speech benchmark. Baselines include Step-Audio 2, Gemini 2.5 Pro, Gemini 3 Pro, GPT-4o mini Realtime, and Gemini 2.5 Flash. The architecture utilizes a 32-billion parameter Qwen2.5 LLM decoder with PPO rollout sampling of 16 candidates per prompt.

## Results

Step-Audio-R1 achieves an average score of 83.6% across S2T benchmarks, outperforming Gemini 2.5 Pro (81.5%) and approaching Gemini 3 Pro (85.1%). On individual tasks, it achieves 98.7% on Big Bench Audio and 95.2% on Spoken MQA. In the speech-to-speech setting, Step-Audio-R1 Realtime reaches 96.1% reasoning accuracy with a first-packet latency of 0.92 seconds. Ablations show that removing format rewards causes reasoning length to collapse from 3,000 tokens down to below 1,500 tokens, whereas format-rewarded models maintain stable lengths of 2,300–2,800 tokens and improve MMAU accuracy from 76.5 to 77.7.

| Model | Avg. | BBA | SMQA | MMSU | MMAU | WS |
|---|---|---|---|---|---|---|
| Step-Audio 2 | 68.3 | 59.1 | 88.8 | 64.3 | 78.0 | 51.1 |
| Gemini 2.5 Pro | 81.5 | 96.1 | 94.8 | 79.3 | 77.4 | 60.0 |
| Gemini 3 Pro | 85.1 | 92.1 | 95.3 | 82.9 | 78.9 | 76.4 |
| Step-Audio-R1 | 83.6 | 98.7 | 95.2 | 75.9 | 77.7 | 70.6 |

## Limitations

The approach relies heavily on a multi-stage iterative pipeline that requires careful difficulty-based filtering and custom reward shaping, which can be computationally expensive. The evaluation focuses primarily on English-centric or standard multilingual speech/audio perception benchmarks, leaving broader zero-shot dialect or extreme low-resource acoustic adaptation unverified. Furthermore, first-packet latency sits at 0.92 seconds for the realtime variant, which is slightly higher than some non-reasoning low-latency counterparts.

## Why read this

Speech and ML researchers working on audio LLMs or test-time compute scaling should read this to understand why traditional CoT fails for audio and how modality-grounded reinforcement learning can successfully unlock deliberation scaling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time conversational speech assistants, complex acoustic scene analysis, and multi-modal dialogue systems requiring deep audio reasoning.

## Institutions / 機構

Shanghai Jiao Tong University, University of New South Wales, Nanyang Technological University, StepFun

## Related

- [Audio-DeepThinker: Progressive Reasoning-Aware Reinforcement Learning for High-Quality Chain-of-Thought Emergence in Audio Language Models](he26e_interspeech.md) — same problem · relatedness 2.6/3
- [Audio-Cogito: Towards Deep Audio Reasoning in Large Audio Language Models](li26o_interspeech.md) — same problem · relatedness 2.5/3
- [ALARM: Audio–Language Alignment for Reasoning Models](grinberg26_interspeech.md) — same problem · relatedness 2.4/3
- [Nudging Hidden States: Training-Free Model Steering for Chain-of-Thought Reasoning in Large Audio-Language Models](ieong26_interspeech.md) — same problem · relatedness 2.2/3
- [Enhancing Audio Reasoning via Semantic Summary Prediction](bonzi26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
