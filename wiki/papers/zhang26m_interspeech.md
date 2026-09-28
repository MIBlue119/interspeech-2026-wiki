---
id: zhang26m_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-930
pdf: https://www.isca-archive.org/interspeech_2026/zhang26m_interspeech.pdf
---

# Poly-InstructTTS: Learning In-the-Wild Expressive Speech Synthesis from Open-Ended Instructions

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-930)

**TL;DR** — Poly-InstructTTS is an open-ended instruction-following text-to-speech framework trained on a newly curated 1,000-hour in-the-wild cinematic dataset, delivering state-of-the-art role-play and stylistic expression adherence.

## Problem

Current instruction-based TTS systems struggle to generate subtle emotional shifts or extreme speaking styles like whispering, hesitation, or screaming because they rely on clean reading corpora like audiobooks that lack natural language descriptions. Furthermore, mainstream zero-shot architectures depend on prompt audio, causing style conflicts between the reference timbre and the requested instruction. Poly-InstructTTS addresses this scarcity by harvesting expressive conversational interactions from cinematic media and decoupling prompt-free style guidance from timbre injection.

## Method

The system features a multi-modal data processing pipeline using video-audio subtitle alignment, Demucs/ClearerVoice denoising, ElevenLabs ASR/diarization/paralinguistic tagging, and Gemini 2.5 Pro to synthesize rich instruction-audio pairs. The architecture utilizes a prompt-free auto-regressive GPT model initialized from Qwen2.5-0.5B-Instruct that takes instruction text, content text, and compact attribute-based thinking tokens (gender, emotion intensity, style, and accent) to generate discrete speech tokens. A downstream Flow-Matching acoustic model derived from CosyVoice injects speaker timbre from a reference audio without causing style leakage, followed by a HiFi-Net vocoder. Additionally, an instruction-conditioned speaker fine-tuning scheme incorporates speaker ID tags to transfer expressive style variance to target voices.

## Results

Trained on 1,000 hours of expressive speech covering over 200 accents, 800 emotions, and 400 styles using 8 NVIDIA A800 GPUs, Poly-InstructTTS was evaluated on the InstructTTSEval base benchmark and an expanded 200-sample testset covering diverse accents and extreme emotions. Evaluated against baselines like GPT-4o-mini TTS, Qwen3-TTS, and VoxInstruct, Poly-InstructTTS achieves superior performance particularly in Role-Play (RP) capability and instruction-following MOS (I-MOS). Ablations demonstrate that the compact attribute-based thinking token design stabilizes training and outperforms alternative text encoders such as Flan-T5 or Instructor.

## Code

- https://zhangjh915.github.io/PolyInstructTTS-demo/

## Applications

Engineers building virtual assistants, video game characters, audiobooks, and dubbing systems requiring fine-grained emotional control and extreme paralinguistic behaviors through natural language prompts.

## Limitations

The model exhibits higher Word Error Rate (WER) compared to clean reading corpora due to challenging acoustic dynamics and label noise present in in-the-wild cinematic training data.

## Related

- (link related pages by id as the wiki grows)
