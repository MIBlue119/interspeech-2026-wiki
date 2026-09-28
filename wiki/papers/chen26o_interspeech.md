---
id: chen26o_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1271
pdf: https://www.isca-archive.org/interspeech_2026/chen26o_interspeech.pdf
---

# CE-CoT: A Contrastive Empathetic Chain-of-Thought Training Strategy for Improving Emotion Consensus in Empathetic Speech LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/chen26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1271)

**TL;DR** — The paper introduces Contrastive Empathetic Chain-of-Thought (CE-CoT), a training and inference strategy that improves emotion consensus (EC) in empathetic speech LLMs by up to 35.2% compared to pretrained baselines.

## Problem

Empathetic conversational agents often fail to maintain directional correctness or emotion consensus (EC), meaning the agent's expressed emotion contradicts the user's emotional state despite successful emotion recognition. Misaligned responses can confuse, frustrate, or distress users, eroding trust in sensitive deployments such as mental health support. Because speech LLMs must infer emotions directly from acoustic signals rather than explicit text labels, this alignment challenge is significantly harder.

## Method

CE-CoT decomposes responses into a three-part reasoning chain containing an explicit emotion label, a neutral non-empathetic response baseline, and an emotion-aligned revised response incorporating emotional reaction and exploration questions. This structure creates an implicit contrast where the model learns to favor emotionally aligned revisions over neutral baselines. The training follows a two-step paradigm where a text LLM first generates the expected CoT targets using speech transcripts, and the speech LLM is then aligned via KL-divergence loss. Evaluated backbones include BLSP-Emo, RE-LLM, and Qwen2Audio.

## Results

Evaluated across four datasets (IEMOCAP, ESD, MSP-Podcast, and MESC) using automated LLM-as-a-judge metrics for Emotion Consensus (EC), Emotional Reaction (ER), and Exploration (Ex). On MSP-Podcast, BLSP-Emo with CE-CoT improves EC by up to 19.1% over vanilla behavioral alignment, and by up to 35.2% on MESC compared to pretrained BLSP-Emo. Conditional evaluations show that CE-CoT reduces ER/Ex performance drop rates due to emotional mismatches down to roughly 26%, compared to over 55-60% for standard baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building empathetic speech-based conversational agents for mental health support, medical guidance, education, and social companionship.

## Limitations

The evaluation is restricted to single-turn interactions, and internal reasoning traces or the direct causal link between speech emotion recognition and response generation remain unanalyzed.

## Related

- (link related pages by id as the wiki grows)
