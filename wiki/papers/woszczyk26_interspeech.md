---
id: woszczyk26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3392
pdf: https://www.isca-archive.org/interspeech_2026/woszczyk26_interspeech.pdf
---

# Is Natural Always Appropriate? Investigating Naturalness and Appropriateness Across Different Domains for TTS Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/woszczyk26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/woszczyk26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3392)

**TL;DR** — This study evaluates five state-of-the-art text-to-speech systems across five distinct operational domains and demonstrates that perceived appropriateness varies independently of naturalness, exposing critical blind spots in one-size-fits-all automatic metrics.

## Problem

As text-to-speech fidelity improves, standard evaluation paradigms that rely exclusively on general naturalness or Mean Opinion Scores fail to capture whether synthetic speech is actually suitable for its specific context. Current task-agnostic metrics and human-likeness ratings ignore situational needs, leaving a significant gap in understanding how domain-specific framing alters listener expectations and system rankings.

## Method

The authors conducted a large-scale perceptual listening test featuring 150 native English speakers recruited via Prolific, evaluating 30 curated sentences synthesized across five SOTA TTS systems (Kokoro, Gemini TTS Flash 2.5, Kyutai-TTS 1.6B, GPT-4o-mini-tts, and ElevenLabs) alongside ground truth samples. Participants rated both human-likeness and convincingness/appropriateness across five personas (AI assistant, reader, actor, animated character, and spontaneous speaker) using a 5-point Likert scale within a Gradio interface. Additionally, the study analyzed sentence-level correlations between human-likeness and appropriateness, alongside extensive acoustic feature profiling (rhythm, expressivity, voice quality) and automated evaluation metrics (UTMOSv2, DNSMOS, Squim, AudioBox embeddings, WavLM distances, and WER).

## Results

Results reveal that appropriateness is heavily domain-dependent, with Kokoro excelling in reading and assistant tasks but struggling in conversation, while Kyutai-TTS dominates spontaneous speech but sounds too raw for assistants. Human-likeness and appropriateness showed positive correlations for Actor (Spearman rho = 0.47), Spontaneous (rho = 0.40), and Reader (rho = 0.38) domains, but were near-zero for Animated Character (rho = 0.08) and negative for Assistant (rho = -0.44). Standard quality estimators like UTMOS and DNSMOS showed strong negative correlations with appropriateness in expressive domains such as Actor (rho <= -0.41) and Spontaneous speech (rho <= -0.47). Acoustic feature analysis showed that animated characters require high articulation rate variability (rho = 0.43), whereas AI assistants favor neutral, stable profiles with negative f0 range correlation (rho = -0.35).

## Code

- https://github.com/domiwk/domain-aware-tts-eval

## Applications

Speech engineers and product developers can use these insights to build context-aware evaluation pipelines and select domain-optimized TTS architectures rather than relying on generic naturalness benchmarks.

## Limitations

The study is restricted to isolated sentences rather than continuous multi-turn dialogues, and does not investigate how speaker gender, age, or socioeconomic background influences listener perception.

## Related

- (link related pages by id as the wiki grows)
