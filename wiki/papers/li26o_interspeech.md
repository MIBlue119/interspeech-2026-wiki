---
id: li26o_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
institutions: ["Northwestern Polytechnical University", "China Telecom Artificial Intelligence Technology (Beijing) Co., Ltd"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-988
pdf: https://www.isca-archive.org/interspeech_2026/li26o_interspeech.pdf
---

# Audio-Cogito: Towards Deep Audio Reasoning in Large Audio Language Models

*Longhao Li, Hongjie Chen, Zehan Li, Qihan Hu, Jian Kang, Jie Li, Lei Xie, Yongxiang Li*

[PDF](https://www.isca-archive.org/interspeech_2026/li26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-988)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — Audio-Cogito is a 30B open-source large audio language model featuring explicit chain-of-thought audio reasoning, trained on 545k self-distilled samples curated via Cogito-Pipe to achieve new state-of-the-art results among open-source models on the MMAR benchmark (71.70% average accuracy).

## Key contributions

- Developed Cogito-Pipe, a fully open-source four-stage pipeline (Data Collection, QA Construction, CoT Generation, Quality Verification) for audio reasoning data curation.
- Released a large-scale audio reasoning dataset containing 545k high-quality samples spanning sound, speech, and music domains.
- Proposed a self-distillation training strategy where the base model generates its own reasoning traces before supervised fine-tuning, preventing format misalignment.
- Achieved top-tier performance on the MMAR benchmark and the Interspeech 2026 Audio Reasoning Challenge, outperforming prior open-source models and matching select proprietary systems.

## Problem

While text and multimodal vision domains have benefited extensively from inference scaling and Chain-of-Thought (CoT) reasoning, audio reasoning models like Audio-CoT, Audio Flamingo 3, Step-Audio-R1, and Qwen3-OmniThinking remain inconsistent and limited in complex acoustic environments. Prior models frequently produce rigid, structured reasoning traces that lack genuine audio grounding, suffering from logical inconsistencies and misinterpretation of subtle acoustic cues. This limitation is compounded by a severe scarcity of public datasets providing complex, step-by-step audio reasoning traces rather than brief captions or static labels, forcing reliance on expensive closed-source APIs like Gemini 2.5 Pro.

## Method

Audio-Cogito is built upon Qwen3-Omni-Thinking (30 billion parameters, utilizing activation or mixture-of-thought variants) and fine-tuned using Low-Rank Adaptation (LoRA) via the ms-swift framework. The input integrates an audio signal A and textual query Q, prompting the model to generate a freeform Chain-of-Thought reasoning trace C followed by a final response R, trained via a joint likelihood maximization objective.

The underlying curation pipeline, Cogito-Pipe, operates in four stages: (1) Data Collection aggregates 179k AudioSet samples, 43k captioning samples (AudioCaps, Clotho), 37k complex audio samples, 24k speech emotion (MELD), 56k speech translation (CoVoST2), 9k spoken dialogue (DailyTalk), and 199k music samples (MusicBench, FMA, Medley-solos-DB) alongside a curated pool of 500 expert-refined seed questions; (2) QA Construction employs Qwen3-Omni-Instruct with few-shot exemplars to generate 1-3 challenging QA pairs with hard distractor negatives per audio clip; (3) CoT Generation uses Qwen3-Omni-Thinking via self-distillation to produce freeform reasoning chains without ground-truth answers to force acoustic grounding; and (4) Quality Verification applies a two-stage auditor combining a QA consistency check and an LLM-as-a-judge (Qwen3-Omni-Instruct) to eliminate hallucinations and logical errors, yielding 545k total reasoning samples.

The model is trained for 1 epoch using LoRA with a maximum learning rate of 1e-5. Inference relies on native freeform generation of explicit reasoning steps prior to final output delivery, ensuring interpretability without being restricted by rigid formatting constraints.

## Experimental setup

Evaluated on the MMAR benchmark (the sole audio benchmark explicitly evaluating the CoT reasoning process across 7 subcategories of single and mixed domains). Compared against LALMs (SALMONN, Audio Flamingo 2/3, Qwen2-Audio, GPT-4o mini/Audio, Omni-R1), OLMs (Qwen2.5-Omni, Qwen3-Omni-Instruct, Gemini 2.0/2.5 Flash/Pro), and LARMs (Mellow, Audio-CoT, Audio-Reasoner, Step-Audio-R1, Qwen3-Omni-Thinking). Metrics include Average Accuracy (Avg), Rubrics Score (proportion of 5 verifiable criteria satisfied per sample via GPT-4o judge), and Correct Reasoning Score (CRS) conditioned on correct answers, averaged over the middle three of five runs. Model size is 30B parameters trained with LoRA for 1 epoch.

## Results

Audio-Cogito establishes new state-of-the-art accuracy among open-source models on MMAR, achieving a headline average accuracy of 71.70%, which represents a 5.44% relative improvement over the base Qwen3-Omni-Thinking model (68.00%) and outperforming proprietary OLMs like Gemini 2.5 Flash (68.40%). In mixed-domain evaluations, Audio-Cogito reaches 90.91% on Sound-Music and 76.83% on Music-Speech, occasionally surpassing Gemini 2.5 Pro (which scores 74.40% overall average). In terms of reasoning quality, Audio-Cogito attains a Rubrics score of 62.22% and a CRS of 0.87, outperforming all other open-source LARMs such as Step-Audio-R1 (46.55% Rubrics, 0.79 CRS). Ablation studies demonstrate that removing the 500 seed questions causes the largest drop in mixed-domain performance (falling to 62.50%), while omitting quality verification increases hallucination rates and removing meta-information reduces QA accuracy.

| Systems / Conditions | Single Sound (%) | Single Music (%) | Single Speech (%) | Sound-Music-Speech (%) | Avg Accuracy (%) | Rubrics Score (%) |
|---|---|---|---|---|---|---|
| Random Guess | 29.39 | 25.88 | 31.48 | 28.13 | 29.32 | - |
| Qwen2-Audio-Instruct | 33.30 | 24.30 | 32.30 | 25.00 | 30.00 | - |
| GPT-4o Audio | 53.90 | 51.00 | 70.40 | 75.00 | 63.50 | - |
| Gemini 2.5 Pro | 67.30 | 56.80 | 82.00 | 66.70 | 74.40 | - |
| Qwen3-Omni-Thinking | 64.24 | 50.00 | 79.25 | 70.83 | 68.00 | 57.97 |
| Audio-Cogito | 66.67 | 53.40 | 79.25 | 79.17 | 71.70 | 62.22 |

## Limitations

The study relies heavily on automated LLM-as-a-judge pipelines (GPT-4o and Qwen3-Omni-Instruct) for quality verification and MMAR rubric scoring, which may introduce evaluation biases or latent judge artifacts. The training corpus, while large at 545k samples, is synthesized via distillation from existing models rather than purely human annotations, potentially inheriting systematic blind spots from the teacher models. Furthermore, evaluation is strictly bounded to the MMAR benchmark protocol, leaving real-world streaming latency and out-of-domain acoustic robustness outside controlled benchmarks largely unexplored.

## Why read this

Speech and ML engineers building reasoning-capable audio language models should read this paper to adopt Cogito-Pipe as a blueprint for scalable, multi-domain audio reasoning data curation using self-distillation. It provides concrete empirical evidence that freeform CoT generation combined with rigorous multi-stage filtering bridges the performance gap between open-source and proprietary audio-language systems.

## Code

- https://github.com/llh666521/Audio-Cogito

## Applications

Complex acoustic scene analysis, interactive voice assistants requiring multi-step logical deduction, automated multi-domain audio auditing, and explainable speech-to-text educational tools.

## Institutions / 機構

Northwestern Polytechnical University, China Telecom Artificial Intelligence Technology (Beijing) Co., Ltd

## Related

- (link related pages by id as the wiki grows)
