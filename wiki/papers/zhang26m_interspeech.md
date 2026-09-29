---
id: zhang26m_interspeech
category: tts
labels: [dataset-or-benchmark-release, generative-model]
institutions: ["ZuoYeBang Technology"]
code: https://zhangjh915.github.io/PolyInstructTTS-demo/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-930
pdf: https://www.isca-archive.org/interspeech_2026/zhang26m_interspeech.pdf
---

# Poly-InstructTTS: Learning In-the-Wild Expressive Speech Synthesis from Open-Ended Instructions

*Junhui Zhang, Qianhui Xu, Qingxiang Guo, Dawei Yang, Ling Miao, Qiangqiang Wang, Yang Song*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-930)

**Category:** `tts` · **Labels:** `dataset-or-benchmark-release`, `generative-model`

**TL;DR** — Poly-InstructTTS is a text-to-speech model that follows open-ended natural language instructions for expressive speech synthesis, trained on a newly curated 1,000-hour in-the-wild cinematic dataset. It achieves competitive instruction adherence and high role-play performance on the InstructTTSEval benchmark.

## Key contributions

- Constructed a scalable 1,000-hour multi-modal instruction-annotated dataset covering over 1,000 fine-grained emotions, styles, and paralinguistic behaviors sourced from cinematic media.
- Proposed a prompt-free GPT architecture guided by compact, attribute-based thinking tokens (gender, emotion intensity, style, accent) coupled with a flow-matching acoustic module.
- Developed an instruction-conditioned speaker fine-tuning (SFT) scheme that transfers instruction control to specific speakers while preserving their personal identity.
- Expanded the InstructTTSEval benchmark testset with 200 challenging samples covering extreme emotions, spontaneous disfluencies, diverse accents, and in-the-wild acoustics.

## Problem

Current text-to-speech (TTS) systems struggle to interpret complex natural language instructions and capture fine-grained emotional shifts, hesitation, whispering, or screaming. Mainstream zero-shot systems rely on prompt audio references, which frequently introduce style and acoustic conflicts with the target instructions. Furthermore, open-source training datasets like LibriTTS or MLS are dominated by neutral reading tones, lacking the extreme expressive variations found in real-world conversational contexts.

## Method

The pipeline starts with 2,500 hours of cinematic and television audiovisual media, segmented via subtitle timestamps and voice activity detection. Audio is centered-channel extracted and cleaned using Demucs and ClearerVoice, while a commercial STT API handles ASR, speaker diarization, and paralinguistic tagging, complemented by a rule-based subtitle fuzzy matching check. Gemini 2.5 Pro API then analyzes multi-modal inputs (720p video plus audio) across a three-stage pipeline (content summary, transcript analysis, and instruction generation) to yield 1,000 hours of instruction-audio pairs containing over 1.1M utterances.

The model architecture utilizes a GPT-FM framework based on the Qwen2.5-0.5B-Instruct backbone. The auto-regressive GPT takes content text, instruction text, and attribute-based thinking tokens (<gender>, <high/low intensity>, <style>, <accent>) as input to predict discrete speech tokens at 25 Hz extracted via CosyVoice2 tokenizers. By excluding pitch and emotion from the explicit thinking tokens, the GPT is forced to map the raw instruction directly to the target prosody. A prompt-free design feeds these discrete tokens into a flow-matching (FM) module (adapted from CosyVoice3) which injects timbre conditioned solely on a reference audio, avoiding style leakage from the prompt. A HiFi-Net vocoder finally reconstructs the waveform.

For adaptation, an Instruction-Conditioned Speaker Fine-Tuning (SFT) procedure prepends speaker ID tags (e.g., <spk_01>) to the content text while treating cinematic data with an <Unknown> tag. This allows specific speakers to learn the mapping from instructions to stylistic ranges while maintaining persona alignment.

## Experimental setup

Trained on 1,000 hours of in-the-wild expressive speech data (split 99% train, 1% validation) plus 200 hours of SFT data across 10 speakers. The GPT backbone is initialized from Qwen2.5-0.5B-Instruct, trained on 8 NVIDIA A800 GPUs for 30 epochs using the AdamW optimizer with a learning rate of 1e-4 and a batch duration of 300 seconds. Evaluated against closed-source APIs (Gemini-Pro/Flash, GPT-4o-mini) and open-source models (Qwen3-TTS, OV-InstructTTS, Mimo-Audio, VoxInstruct, Parler-tts, PromptTTS, PromptStyle) on the InstructTTSEval base and expanded test sets using WER, APS, DSD, RP, and MOS metrics.

## Results

On the base InstructTTSEval benchmark, Poly-InstructTTS achieves a Role-Play (RP) score of 88.7 (outperforming all open-source baselines and rivaling Gemini-Flash's 80.1), an APS of 91.1, a DSD of 79.2, and an I-MOS of 3.81 with a WER of 4.42%. On the expanded test set, it scores 77.1 (APS), 84.5 (DSD), 90.1 (RP), and 3.96 (I-MOS). Ablations demonstrate that removing attribute-based thinking tokens drops subjective scores and degrades instruction alignment, while freezing external text encoders (FlanT5, Instructor, GTR-base) offers no advantage over raw text input. The system exhibits an expressiveness-stability trade-off: longer training epochs improve style metrics (APS/DSD/RP) at the cost of higher WER due to disruptions in monotonic alignment.

| System | WER ↓ | APS ↑ | DSD ↑ | RP ↑ | I-MOS ↑ | N-MOS ↑ |
|---|---|---|---|---|---|---|
| Gemini-Flash TTS | 2.75 | 92.3 | 93.8 | 80.1 | 3.71 | 4.26 |
| Qwen3-TTS-12Hz-1.7B | 2.09 | 82.9 | 82.4 | 68.4 | 3.76 | 4.16 |
| OV-InstructTTS | 17.47 | 78.3 | 77.8 | 61.3 | 3.05 | 3.13 |
| Parler-tts-large | 15.67 | 60.0 | 45.9 | 31.2 | 2.47 | 2.87 |
| PromptTTS | 2.50 | 64.3 | 47.2 | 31.4 | 2.34 | 3.43 |
| Poly-InstructTTS (Ours) | 4.42 | 91.1 | 79.2 | 88.7 | 3.81 | 3.88 |

## Limitations

The system suffers from performance degradation under challenging acoustic conditions such as heavy background noise and echoes, stemming primarily from limitations in the flow-matching module rather than the GPT instruction pathway. Training on extreme emotional expressions introduces an expressiveness-stability trade-off that raises the Word Error Rate over longer training horizons. Furthermore, the raw cinematic dataset cannot be publicly distributed due to commercial copyright restrictions.

## Why read this

Speech and ML researchers building instruction-controllable TTS models should read this paper to understand how to design multi-modal data pipelines from cinematic media and how compact attribute-based thinking tokens can bridge language instructions and acoustic tokens without complex text generation burdens.

## Code

- https://zhangjh915.github.io/PolyInstructTTS-demo/

## Applications

Generating highly expressive, emotionally nuanced, and stylized speech voices for conversational agents, video game characters, audiobooks, and interactive media via open-ended natural language descriptions.

## Institutions / 機構

ZuoYeBang Technology

## Related

- [Bagpiper-TTS: Natural Language Guided Universal Speech Synthesis](tian26_interspeech.md) — same problem · relatedness 2.9/3
- [EmoInstruct-TTS: Dual-Path Instruction-Guided Emotional Speech Synthesis](wu26f_interspeech.md) — same problem · relatedness 2.7/3
- [Stabilizing Instruction Supervision for Instruct-TTS via Controllable Diversification and Drift Filtering](geng26b_interspeech.md) — same problem · relatedness 2.6/3
- [Scalable Direction-Following TTS via Voice Impression-Guided Pseudo Triplet Construction](fujita26_interspeech.md) — same problem · relatedness 2.6/3
- [FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech](zhou26h_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
