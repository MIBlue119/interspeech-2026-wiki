---
id: woszczyk26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3392
pdf: https://www.isca-archive.org/interspeech_2026/woszczyk26_interspeech.pdf
---

# Is Natural Always Appropriate? Investigating Naturalness and Appropriateness Across Different Domains for TTS Evaluation

*Dominika Woszczyk, Andreas Triantafyllopoulos, Jura Miniota, Éva Székely, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/woszczyk26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/woszczyk26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3392)

**Category:** `resources-evaluation`

**TL;DR** — This paper investigates text-to-speech (TTS) evaluation across five distinct domains, demonstrating that perceived appropriateness varies independently of naturalness and that conventional evaluation metrics often fail to capture contextual suitability.

## Key contributions

- Conducted a large-scale perceptual study with 150 native English speakers evaluating 5 state-of-the-art TTS systems and ground truth across 5 distinct domains (Reader, Actor, Animated Character, AI Assistant, Spontaneous Speaker).
- Revealed a decoupling between human-likeness and appropriateness, showing positive correlations in conversational and acting domains, near-zero for animated characters, and negative correlations for AI assistants.
- Demonstrated that standard automatic quality metrics (like UTMOS and DNSMOS) negatively correlate with appropriateness in expressive and spontaneous domains (ρ ≤ -0.41), penalizing essential naturalistic disfluencies and dynamic range.
- Identified key acoustic correlates for domain appropriateness, highlighting that spontaneous speech relies on voice imperfections like jitter and creakiness (H1-H2), whereas readers and assistants prefer rhythm stability and neutral spectral tilts.

## Problem

Traditional speech synthesis evaluation relies heavily on global naturalness or Mean Opinion Scores (MOS), which are unstable, subjective, and fail to reflect real-world application performance. While recent approaches introduce automatic metrics, ASR intelligibility, or emotion embedding distances, they remain task-agnostic and ignore situational requirements. Consequently, a model achieving high general accuracy or human-likeness can still be perceived as completely inappropriate for a specialized communicative purpose, leaving a critical gap in context-aware evaluation frameworks.

## Method

The study curates 30 sentences spanning four speech task families (narration, spontaneous conversational, affect conversational, and informational statements) mapped to five target evaluation domains or personas: Reader, Actor, Animated Character, AI Assistant, and Spontaneous Speaker. These sentences are synthesized using five diverse SOTA TTS models: Kokoro (an 82M parameter StyleTTS 2 model), Gemini TTS (Flash 2.5), Kyutai-TTS (1.6B Moshi audio-to-audio model), GPT-4o-mini-tts (Coral), and ElevenLabs (multilingual v2, Bella). Human evaluation uses a Gradio interface on Prolific with 150 participants rating both human-likeness and convincingness/appropriateness on a 5-point Likert scale via a Latin Square design.

For analysis, the authors extract acoustic features grouped into rhythm (articulation rate sd, speech rate, nPVI), expressivity (f0 range, RMSE sd, arousal, valence), and voice quality (jitter, shimmer, H1-H2, alpha ratio, CPPS) using openSMILE, praat-parselmouth, and WavLM models. They systematically test standard automatic metrics across quality estimation (UTMOSv2, DNSMOS, Squim, PESQ, MCD, STOI), prosodic distance (f0 correlation via SwiftF0, AutoPCP, WavLM), style (AudioBox CE/CU/PQ), intelligibility (Parakeet-TDT), and diversity (DS-WED) to profile how well these metrics predict domain-specific human judgments.

## Experimental setup

The perception study recruited 150 native English speakers via Prolific split into 6 sessions of 25 participants, evaluating 180 total samples (30 sentences across 5 TTS systems plus ground truth anchors). Evaluated systems cover parameter sizes from an 82M StyleTTS 2 model (Kokoro) up to a 1.6B parameter conversational framework (Kyutai-TTS), alongside commercial platforms (ElevenLabs, GPT-4o-mini-tts, Gemini Flash 2.5). Evaluation metrics include human Likert ratings for human-likeness and appropriateness, alongside 14 automatic metrics and 13 acoustic features evaluated via Spearman rank correlations.

## Results

Results indicate that appropriateness is highly domain-specific: Kokoro excels in reading and assistant tasks but fails in conversational roles, whereas Kyutai-TTS dominates spontaneous conversation but sounds too raw for assistants. Furthermore, standard UTMOS and DNSMOS metrics exhibit strong negative correlations with appropriateness in actor (ρ ≤ -0.41) and spontaneous styles (ρ ≤ -0.47), proving they penalize dynamic prosody and disfluencies. Conversely, automated quality estimators correlate positively with the assistant role (ρ ≈ 0.35), where listeners paradoxically favor slightly more stable, neutral delivery.

| System / Persona | Reader (Appropriateness) | Assistant (Appropriateness) | Spontaneous (Appropriateness) | Actor (Appropriateness) |
|---|---|---|---|---|
| Kokoro (82M) | High | High | Low | Low |
| Kyutai-TTS (1.6B) | Medium | Low | High | Low |
| ElevenLabs (Bella) | High | Medium | Low | High |
| Gemini Flash 2.5 | High | Medium | Low | High |
| GPT-4o-mini-tts | High | Medium | Low | High |

## Limitations

The study evaluates isolated sentences rather than multi-turn conversational dialogues and emotional progressions. It also does not explore how listener or speaker social identities—such as perceived gender, age, or socioeconomic background—impact perceived appropriateness and stylistic expectations.

## Why read this

Speech and ML engineers building deployment-targeted TTS systems should read this to understand why optimizing purely for universal MOS or naturalness damages performance in specialized domains like voice assistants or conversational agents.

## Code

- https://github.com/domiwk/domain-aware-tts-eval

## Applications

Context-aware speech synthesis selection and domain-specific TTS evaluation pipelines for conversational AI, digital actors, and audiobooks.

## Institutions / 機構

Iconic, Technische Universitat Munchen, KTH Royal Institute of Technology, Imperial College London

## Related

- (link related pages by id as the wiki grows)
