---
id: li26x_interspeech
category: paralinguistics-emotion
labels: [generative-model]
institutions: ["University of Groningen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1487
pdf: https://www.isca-archive.org/interspeech_2026/li26x_interspeech.pdf
---

# What Makes Synthetic Speech Sound Sarcastic? A Prosody-Controlled Perception Study

*Zhu Li, Shekhar Nayak, Matt Coler*

[PDF](https://www.isca-archive.org/interspeech_2026/li26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1487)

**Category:** `paralinguistics-emotion` · **Labels:** `generative-model`

**TL;DR** — The paper investigates the causal roles of individual prosodic dimensions in sarcasm perception using neural text-to-speech synthesis, finding that human listeners rely primarily on loudness while foundational multimodal models rely on speech rate.

## Key contributions

- Constructs a fully crossed, orthogonally manipulated stimulus set using neural TTS to isolate speech rate, pitch variation, and loudness.
- Compares human listener ratings of sarcasm and naturalness against predictions from a large-scale multimodal foundation model (Qwen3-Omni).
- Reveals a significant divergence in acoustic cue weighting: humans are driven primarily by loudness, whereas the foundation model is driven primarily by speech rate.
- Provides a validated methodology for using controllable generative speech models as experimental testbeds in psycholinguistics.

## Problem

Prior research on sarcasm perception relies heavily on natural speech where acoustic dimensions like pitch, tempo, and intensity co-vary, making it impossible to isolate their individual causal contributions. Context-minimal paradigms and post-hoc acoustic analyses describe group differences but fail to determine which specific vocal features independently bias perception. Furthermore, it remains unknown whether current foundation models process and weigh prosodic cues for sarcasm in the same way human listeners do, highlighting a gap in behavioral alignment.

## Method

The study utilized short, semantically neutral English utterances adapted from Bryant and Fox Tree as text inputs for Qwen3-TTS-12Hz-1.7B-CustomVoice. A single synthetic speaker voice was used to eliminate inter-speaker variability. The authors implemented a fully crossed 2 x 2 x 2 factorial design manipulating pitch variation (dynamic vs. flat), loudness (loud vs. soft), and speech rate (fast vs. slow) via natural-language prompting. Sampling temperature was adjusted during autoregressive decoding to control prosodic variability (e.g., lower temperatures for flat conditions). To ensure orthogonality, candidate pool samples (100 per utterance/condition) were extracted and filtered using effect-size contrasts measured by Cohen's d. Final stimuli achieved large effect sizes in target dimensions (pitch d=1.14, loudness d=0.81, duration d=1.76) while keeping non-target dimensions near zero (|d|<0.25). Voice quality metrics (H1-H2, HNR) confirmed no systematic side effects (p>0.05). 

For evaluation, 66 participants rated 192 total stimuli (24 utterances x 8 conditions) on 5-point Likert scales for sarcasm and naturalness. For machine perception, Qwen3-Omni was fed the exact same audio waveforms with a fixed prompt instructing it to evaluate prosodic cues across 6 random seeds to reduce stochasticity. Statistical analyses utilized linear mixed-effects models (lme4 package) with fixed effects for the three prosodic factors and random intercepts for participants and items, followed by Tukey-adjusted pairwise comparisons.

## Experimental setup

The experiment used 24 short, semantically neutral English text utterances synthesized into 192 total stimuli across 8 prosodic conditions. Human evaluation engaged 66 native or near-native English speakers. Machine evaluation used Qwen3-Omni across 6 random inference seeds. Metrics included 5-point Likert scales for perceived sarcasm and naturalness, evaluated via intraclass correlation coefficients (ICC) and linear mixed-effects models.

## Results

For human naturalness, fast stimuli were perceived as more natural than slow (beta=0.09, p<0.001) and soft stimuli were more natural than loud (beta=0.11, p<0.001). For human sarcasm perception, loudness was the dominant main effect (beta=0.29, p<0.05), where loud stimuli received significantly higher sarcasm ratings than soft ones; speech rate and pitch contour showed no significant main effects. Pairwise comparisons confirmed that flat-pitch, loud conditions (e.g., fast flat loud, slow flat loud) were rated significantly more sarcastic than soft counterparts. 

In contrast, the foundation model (Qwen3-Omni) exhibited a completely different weighting scheme: it showed a significant main effect of speech rate on sarcasm (beta=0.31, p<0.01), rating slow stimuli as more sarcastic, with no significant main effect for loudness (beta=0.04, p=0.77). Spearman rank correlation revealed no significant overall alignment between human and model ratings (rho=-0.11, p=0.26).

| Cue / Condition | Human Sarcasm Beta (beta) | Machine Sarcasm Beta (beta) |
|---|---|---|
| Speech Rate (slow) | 0.061 | 0.313 |
| Pitch Variation (flat) | 0.138 | 0.132 |
| Loudness (loud) | 0.285 | 0.035 |

## Limitations

The study used context-free stimuli without rich discourse pragmatics, measuring acoustic bias rather than full communicative intent, which may explain mid-range rating clusters. Many human participants were non-native English speakers, potentially altering cue weighting. Sarcasm was treated as a single monolithic category, ignoring subtypes of verbal irony. Additionally, synthetic manipulation via text prompts, while statistically orthogonal, may not perfectly replicate natural covariance patterns in human speech.

## Why read this

Speech and ML researchers building multimodal audio LLMs should read this paper to understand the severe divergence in prosodic cue weighting between humans and foundation models. It offers a concrete blueprint for using controllable neural TTS to rigorously audit speech-language models for human-like pragmatic perception.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving the pragmatic alignment of conversational AI agents, speech-to-speech translation systems, and affective text-to-speech synthesis.

## Institutions / 機構

University of Groningen

## Related

- [ProSarc: Prosody-Aware Sarcasm Recognition Framework via Temporal Prosodic Incongruity](singh26e_interspeech.md) — same problem · relatedness 2.0/3
- [A barrier or a booster? Familiarity effects on Mandarin emotion prosody recognition using AI-powered voice cloning](xu26i_interspeech.md) — shared technique · relatedness 2.0/3
- [Prosody-Aware Speech Representations for Emotion Recognition under Pragmatic Ambiguity](park26l_interspeech.md) — same problem · relatedness 1.9/3
- [A Large-Scale Dataset of Listener Impressions of Emotional TTS](cooper26_interspeech.md) — same problem · relatedness 1.9/3
- [Investigating Human-Model Discrepancies in Speech Quality Assessment via Acoustic and Prosodic Perturbations](takagi26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
