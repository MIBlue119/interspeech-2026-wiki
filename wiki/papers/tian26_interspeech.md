---
id: tian26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-873
pdf: https://www.isca-archive.org/interspeech_2026/tian26_interspeech.pdf
---

# Bagpiper-TTS: Natural Language Guided Universal Speech Synthesis

*Jinchuan Tian, Haoran Wang, Siddhant Arora, Takashi Maekaku, Keita Goto, Jin Sakuma, Yusuke Shinohara, Chao-Han Huck Yang, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/tian26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tian26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-873)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — Bagpiper-TTS replaces rigid metadata slots with a natural language interface, using a three-stage text planning and rich captioning workflow to handle diverse speech synthesis tasks with a competitive 1.7% Word Error Rate on Seed-TTS-Eval.

## Key contributions

- A universal speech synthesis paradigm governed purely by free-form natural language prompts rather than rigid slot-filling metadata.
- A hierarchical three-stage inference workflow comprising textual planning, rich caption synthesis, and final speech generation.
- A scalable automated fine-tuning data simulation pipeline leveraging LLMs and multimodal validators to generate 738k training triplets.
- Support for multiple advanced generation modes—including multi-talker dialogue, intent-to-speech, role-play, and singing voice synthesis—within a single model.

## Problem

Classical text-to-speech (TTS) systems rely on rigid input formats and predefined metadata slots, creating a fundamental mismatch with unpredictable real-world user requests. While recent large language models and diffusion hybrids have improved acoustic fidelity, they retain these rigid paradigms and struggle to integrate complex tasks like multi-talker dialogue and immersive role-play into a cohesive framework. Prior approaches require disjointed modular components or specialized encoders, increasing pipeline complexity and limiting flexibility for non-expert users.

## Method

Bagpiper-TTS is built upon the Qwen3-8B-Base decoder-only LLM computational backbone from Bagpiper-Base, utilizing X-Codec at 50Hz with 8 discrete codes per frame to predict target audio. The system implements a three-stage workflow entirely within the unified model: (1) Textual Planning, where the backbone reasons over user intent and stylistic constraints; (2) Rich Caption Synthesis, which generates a dense textual blueprint (up to hundreds of tokens) encoding transcription, paralinguistic metadata, and environmental elements; and (3) Speech Generation, leveraging pre-established caption-to-speech alignment.

The fine-tuning dataset comprises 738k simulated triplets (user requests, planning process, rich captions) curated through a six-step pipeline: speech curation, automated captioning via Qwen-30B-A3B-Captioner, WER-based filtering, user request reverse-engineering, planning process simulation, and textual consistency validation via LLM-as-a-judge (retaining samples with average score >3.5). The dataset spans classical TTS (31.9%), general-purpose (20.8%), role-play (18.4%), multi-talker (13.8%), intent-to-speech (8.8%), and singing voice synthesis (6.4%).

During training, the model undergoes supervised fine-tuning for 2 epochs with a global batch size of 160k tokens and a constant learning rate of 1e-5. Inference applies a decoupled Top-k sampling strategy for text and speech, along with Classifier-Free Guidance (CFG) at a scale of lambda = 3 to enhance stylistic fidelity. Training completed in 16 hours on 8 NVIDIA H100 GPUs.

## Experimental setup

Evaluated on the Seed-TTS-Eval (En) benchmark for classical TTS, alongside 300 simulated unique user requests per advanced application (multi-talker, intent-to-speech, role-play, SVS) tested via Word Error Rate, Gemini-3-Flash LLM-as-a-judge Task Fulfillment scores (1-5 scale), and Amazon Mechanical Turk subjective MOS evaluation. Compared against specialized baselines including CosyVoice 2, VibeVoice, Qwen3-TTS, and YuE. Fine-tuned for 2 epochs on 738k samples using 8 NVIDIA H100 GPUs.

## Results

On the classical Seed-TTS-Eval (En) benchmark, Bagpiper-TTS achieves a Word Error Rate (WER) of 1.7%, closely matching dedicated models like Qwen3-TTS (1.5%) and outperforming CosyVoice 2 (2.6%) and VibeVoice (3.0%). Across advanced applications, it achieves an average objective WER of 4.2 for multi-talker and 2.0 for role-play, while scoring 7.2 on singing voice synthesis (outperforming YuE's 11.0 WER). In LLM-as-a-judge task fulfillment (TF), it records average scores of 4.23 (multi-talker), 3.80 (intent-to-speech), 3.72 (role-play), and 4.60 (SVS). Human subjective MOS ratings average 3.60 for multi-talker, 3.57 for intent-to-speech, 3.93 for role-play, and 3.67 for SVS, demonstrating that a single generalist model can successfully compete with application-specific specialists.

| System / Condition | Classical WER | Multi-Talker WER | SVS WER | TF (Multi-Talker) |
| :--- | :--- | :--- | :--- | :--- |
| CosyVoice 2 | 2.6 | - | - | - |
| VibeVoice / VibeVoice-1.5B | 3.0 | 4.6 | - | 3.32 |
| Qwen3-TTS | 1.5 | - | - | - |
| YuE | - | - | 11.0 | 3.75 |
| Bagpiper-TTS (Ours) | 1.7 | 4.2 | 7.2 | 4.23 |

## Limitations

Hallucinations persist across various stages of data simulation and model inference, particularly within the rich captions produced by the automated captioner. The framework relies exclusively on textual natural language as an interface and does not accept acoustic grounding inputs, such as reference audio prompts to define a speaker's voice characteristics. Evaluation on advanced tasks relies heavily on simulated user requests and LLM judges due to a lack of standardized multi-task benchmarks.

## Why read this

Researchers and engineers building conversational speech foundational models should read this to see how a text LLM backbone can be adapted via rich-caption planning to unify diverse speech synthesis tasks under a single natural language interface.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Universal speech generation supporting classical text-to-speech, multi-talker dialogues, intent-to-speech, character role-play, and singing voice synthesis via natural language instructions.

## Institutions / 機構

Carnegie Mellon University, LY Corporation, NVIDIA

**Funding / 經費:** ACCESS program, National Science Foundation

## Related

- (link related pages by id as the wiki grows)
