---
id: chen26o_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1271
pdf: https://www.isca-archive.org/interspeech_2026/chen26o_interspeech.pdf
---

# CE-CoT: A Contrastive Empathetic Chain-of-Thought Training Strategy for Improving Emotion Consensus in Empathetic Speech LLMs

*Jing-Han Chen, Ya-Tse Wu, Bo-Hao Su, Xin-Yu Chen, Krishna Somandepalli, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1271)

**TL;DR** — The paper introduces Contrastive Empathetic Chain-of-Thought (CE-CoT), a training strategy for speech LLMs that decomposes responses into emotion recognition, neutral baselines, and emotion-aligned revisions to improve emotional consensus. Across four datasets, CE-CoT boosts emotion consensus (EC) by up to 35.2% over vanilla baselines and pretrained models.

## Key contributions

- Proposes the Contrastive Empathetic Chain-of-Thought (CE-CoT) prompting strategy to explicitly control and align emotion consensus in speech LLMs via step-by-step reasoning.
- Formulates a structured 3-part response target containing emotion labels, neutral responses (ignoring emotion), and revised empathetic responses (incorporating emotional reaction and exploration).
- Establishes a rigorous two-step training paradigm combining text LLM preprocessing for target generation and KL-divergence-based behavioral alignment for speech LLMs.
- Demonstrates consistent EC improvements across multiple speech architectures (BLSP-Emo, RE-LLM, Qwen2Audio) and four benchmark datasets (IEMOCAP, ESD, MSP-Podcast, MESC).

## Problem

While conversational agents are increasingly deployed for empathetic support in mental health, medical, and educational contexts, prior research focuses primarily on speech emotion recognition and active engagement while overlooking directional correctness or Emotion Consensus (EC). EC measures whether the agent's response emotion actually matches the speaker's state, and without it, agents can generate emotionally misaligned responses that confuse, frustrate, or distress users. This challenge is uniquely severe for speech LLMs because they must infer subtle acoustic emotional cues without explicit text emotion prompts, making standard behavior alignment insufficient for reliable empathetic grounding.

## Method

The training framework operates in two distinct stages. In Step 1 (Contrastive Empathetic Response Generation), a text LLM (Qwen-7B-Chat) takes a transcript and a CE-CoT prompt containing the ground-truth emotion label to generate a structured expected response. This response comprises three explicit fields: an emotion label (e), a neutral baseline response (r_neu) that deliberately ignores emotional cues, and a revised response (r_rev) that expresses first-person emotional reactions (ER) and exploratory follow-up questions (Ex). This structure creates an implicit contrastive setup where the model pushes r_rev closer to positive emotional targets and away from neutral ones.

In Step 2 (Behavioral Alignment with CE-CoT), the speech LLM receives raw speech audio and the CE-CoT prompt without ground-truth emotion labels. The architecture processes the speech via its speech encoder concatenated with tokenized prompts to generate a CoT-based response sequence. The speech LLM parameters are optimized by minimizing a KL-divergence loss comparing the predicted token probability distributions against the expected CoT response targets generated in Step 1. During inference, the exact same CE-CoT prompting format is maintained to preserve alignment consistency.

Evaluation relies on an automated LLM judge (Gemini Flash 2.0) that examines the generated r_rev against a discrete emotional set (happy, angry, sad, neutral) to compute the Emotion Consensus (EC) score as a matching rate. Conditional metrics are also measured where mismatched responses (EC=0) zero out emotional reaction and exploration scores to penalize superficial empathetic text that lacks correct directional alignment.

## Experimental setup

Evaluated across four speech datasets: IEMOCAP (5,531 utterances across 4 major emotions), ESD (English subset, 4 emotions, 7:3 split), MSP-Podcast (4,290 train / 1,245 test utterances), and MESC (multimodal support dialogues with 9,320 train / 1,206 test utterances). Baselines include pretrained models without fine-tuning (Qwen-7B-Chat, BLSP-Emo, RE-LLM, Qwen2Audio, Gemini 2.5 Pro) and vanilla behavioral alignment settings applied to BLSP-Emo, RE-LLM, and Qwen2Audio. Models are implemented using their original backbone architectures without structural changes.

## Results

Incorporating CE-CoT into BLSP-Emo yields EC score increases of up to 18.8% on MSP-Podcast and 35.2% on MESC compared to pretrained variants, and outperforms vanilla behavioral alignment by 19.1% on MSP-Podcast. RE-LLM with CE-CoT achieves notable EC gains of 29.6% on MSP-Podcast and 12.8% on MESC, though it exhibits a slight performance drop on ESD where vanilla alignment is already exceptionally high at 0.973. Qwen2Audio equipped with CE-CoT reaches the highest scores across all datasets (e.g., gains up to 22.7% on MESC), indicating that models lacking native empathetic pretraining benefit most from contrastive reasoning. Conditional evaluations reveal that CE-CoT dramatically reduces conditional performance drops, with RE-LLM showing an ER drop rate of only 26.3% compared to over 60% for vanilla alignment.

| System / Condition | IEMOCAP (EC) | ESD (EC) | MSP-Podcast (EC) | MESC (EC) |
|---|---|---|---|---|
| BLSP-Emo (Pretrained w/o ft.) | 0.627 | 0.772 | 0.437 | 0.226 |
| BLSP-Emo (Vanilla Alignment) | 0.627 | 0.855 | 0.434 | 0.385 |
| BLSP-Emo (CE-CoT, Ours) | 0.695 | 0.951 | 0.625 | 0.578 |
| RE-LLM (Vanilla Alignment) | 0.672 | 0.973 | 0.362 | 0.365 |
| RE-LLM (CE-CoT, Ours) | 0.675 | 0.967 | 0.658 | 0.493 |
| Qwen2Audio (CE-CoT, Ours) | 0.684 | 0.644 | 0.556 | 0.531 |

## Limitations

The current evaluation is strictly limited to single-turn conversational interactions, omitting multi-turn dialogue dynamics where emotional consistency is harder to maintain. The framework relies on external LLM judges to compute emotion consensus scores without validating alternative measurement paradigms or exploring internal reasoning traces. Furthermore, testing is restricted to four categorical emotions (neutral, happy, angry, sad) across a limited selection of primarily English or prompted datasets, leaving broader multilingual and continuous valence-arousal spaces unexplored.

## Why read this

Speech and ML researchers building conversational agents or empathetic speech LLMs should read this to learn how to operationalize implicit contrastive reasoning and step-by-step emotional chain-of-thought targets. It offers a clear methodology for resolving the chronic mismatch between high surface-level engagement metrics and true emotional directional correctness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Empathetic virtual assistants, mental health support chat systems, and AI-driven educational or social companion tools requiring emotionally aligned speech responses.

## Related

- (link related pages by id as the wiki grows)
