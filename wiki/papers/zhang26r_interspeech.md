---
id: zhang26r_interspeech
category: speech-llm-dialogue
labels: [generative-model]
institutions: ["Northeastern University"]
code: https://github.com/Bxzfrm/PRISM
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1214
pdf: https://www.isca-archive.org/interspeech_2026/zhang26r_interspeech.pdf
---

# PRISM: Prosody-Integrated Multi-Agent Reasoning Framework for Empathetic Spoken Dialogue

*Wen Zhang, Xiaocui Yang, Zhuoyue Gao, Shi Feng, Daling Wang, Yifei Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1214)

**Category:** `speech-llm-dialogue` · **Labels:** `generative-model`

**TL;DR** — PRISM is a multi-agent framework for empathetic spoken dialogue that decouples perception, reasoning, and synthesis, using prosody-to-language translation and tool-augmented knowledge retrieval to achieve superior empathy and prosodic alignment.

## Key contributions

- Proposes PRISM, a multi-agent framework with feedback-driven coordination for prosody-aware dialogue reasoning and flexible knowledge integration in empathetic spoken dialogue.
- Introduces a prosody-to-language translation mechanism that maps acoustic and temporal cues into interpretable natural-language descriptions, stabilizing LLM emotional reasoning.
- Decouples speech processing into specialized Perceiver, Manager, Responder, and Vocalizer agents to eliminate error propagation typical in traditional rigid pipelines.
- Integrates plug-and-play external knowledge invocation via tools like COMET-BART without requiring core model parameter retraining.

## Problem

Traditional spoken dialogue systems use cascade ASR-text-TTS pipelines that irreversibly destroy acoustic and emotional prosody cues during transcription, while end-to-end speech models treat prosody as opaque implicit features and lack interpretable intermediate control or flexible knowledge integration mechanisms. Prior knowledge-augmented frameworks are strictly text-based and fail to jointly model acoustic perception, emotional reasoning, and speech generation in a unified conversational loop. This limitation leads to responses that may be semantically adequate yet emotionally hollow, failing to exhibit genuine empathy at the speech level when user emotional states evolve dynamically.

## Method

PRISM comprises four collaborative agents: Perceiver, Manager, Responder, and Vocalizer. The Perceiver processes raw input speech x at 16 kHz using OpenAI Whisper for transcription and FunASR's emotion2vec for utterance-level emotion classification across 11 categories with confidence scores q_y. It computes temporal dynamics via a WebRTC VAD to calculate the pause ratio and speaking rate, acoustic intensity via frame-level RMS energy mean mu_E and standard deviation sigma_E, and disfluency/certainty via filler rates and a weighted normalized heuristic certainty score c. 

The Manager acts as the central coordination hub. It executes a two-stage prosody-to-language translation: numerical features are threshold-mapped to descriptive labels, which are then processed by an LLM via few-shot prompting into a coherent natural language description D of the speaker's expressive state. It also contains a lightweight response-level verification module for post-hoc alignment checks on emotion category, intensity, and interaction strategy.

The Responder utilizes a fine-tuned LLM (Qwen2.5-7B-Instruct or Llama-3.1-8B-Instruct) taking transcription T, prosody description D, and history H. It implicitly decides when to invoke external knowledge using COMET-BART, injecting commonsense text into the context dynamically, and generates response text R along with a target emotion category e and expressive intensity lambda.

The Vocalizer leverages StyleTTS2 for diffusion-based speech generation with reference voice cloning. It computes synthesis parameters in two stages: base parameters are initialized using target emotion e and intensity lambda (affecting timbre similarity alpha, prosody strength beta, diffusion refinement steps d, and expressive scaling kappa), and are subsequently modulated using the user's paralinguistic attributes a from the Perceiver (attenuating beta and kappa for low certainty/hesitation, and increasing beta for negative emotions). Finally, text-side prosody shaping inserts short pause markers and adjusts punctuation for rhythm alignment.

## Experimental setup

Evaluated on the audio subset of the AvaMERG dataset and the TOOL-ED dataset (an extension of the Emotional Dialogue dataset). Compared against 9 baseline systems: ASR+LLM, SpeechGPT, OSUM-EChat (7B), SALMONN (7B and 13B), Qwen2.5-Omni-7B, LLaMA-Omni2, and OpenS2S. Metrics include n-gram overlap (BLEU-1 to 4), semantic similarity (BERTScore), content overlap (ROUGE-1/2/L), lexical diversity (Dist-1/2), alongside human evaluation on a 5-point Likert scale (ICC = 0.81) and GPT-4o win-rate evaluations. Implemented using LLaMA-Factory on NVIDIA A6000 (48GB) GPUs, fine-tuning only the Responder module.

## Results

PRISM (Qwen) and PRISM (Llama) consistently outperform all baseline models across automatic text and speech generation metrics. Specifically, PRISM (Qwen) achieves a ROUGE-1/2/L score of 0.2254 / 0.0745 / 0.1872, substantially outperforming Qwen2.5-Omni-7B (0.1880 / 0.0542 / 0.1555) and OpenS2S (0.1759 / 0.0356 / 0.1408). PRISM (Llama) achieves the highest BERTScore of 0.8801 and top BLEU-1/2/3 scores (0.2318 / 0.1223 / 0.0805). Ablation studies removing prosody descriptions (w/o Prosody-Desc) or modifying knowledge utilization (Always Kno, w/o Kno) show consistent performance drops across evaluations, confirming the critical role of both the prosody-to-language translation and the dynamic knowledge mechanism.

| Model | ROUGE-1/2/L | BERTScore | BLEU-1/2/3/4 |
|---|---|---|---|
| ASR+LLM | 0.1690 / 0.0271 / 0.1406 | 0.8652 | 0.1431 / 0.0514 / 0.0250 / 0.0132 |
| SALMONN-13B | 0.1666 / 0.0381 / 0.1289 | 0.8705 | 0.1464 / 0.0570 / 0.0303 / 0.0174 |
| Qwen2.5-Omni-7B | 0.1880 / 0.0542 / 0.1555 | 0.8746 | 0.1737 / 0.0831 / 0.0530 / 0.0352 |
| OpenS2S | 0.1759 / 0.0356 / 0.1408 | 0.8691 | 0.1883 / 0.0700 / 0.0355 / 0.0192 |
| PRISM (Qwen) | 0.2254 / 0.0745 / 0.1872 | 0.8792 | 0.2041 / 0.1142 / 0.0792 / 0.0571 |
| PRISM (Llama) | 0.2027 / 0.0649 / 0.1743 | 0.8801 | 0.2318 / 0.1223 / 0.0805 / 0.0555 |

## Limitations

The framework relies on an external proprietary API (GPT-3.5-Turbo) for the Manager agent, which may introduce latency, external dependencies, and cost overhead during inference. Evaluation is limited to benchmark datasets (AvaMERG and TOOL-ED) with a small human annotator pool (3 researchers), leaving real-world interactive robustness across diverse acoustic environments and languages underexplored.

## Why read this

Speech and ML researchers building spoken dialogue systems who want to bypass the rigidity of end-to-end models or the information loss of cascade pipelines will find PRISM's multi-agent design blueprint highly actionable. It demonstrates how translating numerical paralinguistic cues into natural language can successfully bridge acoustic perception with LLM reasoning.

## Code

- https://github.com/Bxzfrm/PRISM

## Applications

Empathetic virtual assistants, mental health support agents, AI companions, and customer service bots requiring fine-grained emotional intelligence and prosodic expressiveness.

## Institutions / 機構

Northeastern University

**Funding / 經費:** National Natural Science Foundation of China, Fundamental Research Funds for the Central Universities

## Related

- [Empathy Omni: Enabling Empathetic Speech Response Generation Through Large Language Models](wang26q_interspeech.md) — same problem · relatedness 2.4/3
- [Beyond Semantic Dominance: Cognitive Affective Reasoning and Empathetic Response Alignment in Audio Language Models](zhao26h_interspeech.md) — same problem · relatedness 2.4/3
- [CE-CoT: A Contrastive Empathetic Chain-of-Thought Training Strategy for Improving Emotion Consensus in Empathetic Speech LLMs](chen26o_interspeech.md) — same problem · relatedness 2.2/3
- [DeSRPA: Decoupled Speech Role-Playing Agent via Inference-Time Intervention](tang26b_interspeech.md) — same problem · relatedness 2.0/3
- [AuDirector: A Self-Reflective Closed-Loop Framework for Immersive Audio Storytelling](ren26d_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
