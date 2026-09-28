---
id: xu26k_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1160
pdf: https://www.isca-archive.org/interspeech_2026/xu26k_interspeech.pdf
---

# From Reactive to Proactive: Assessing the Proactivity of Voice Agents via ProVoice-Bench

*Ke Xu, Yuhao Wang, Yu Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1160)

**TL;DR** — ProVoice-Bench is the first evaluation framework designed to assess proactive voice agents across four distinct tasks, revealing severe over-triggering and reasoning gaps in current Multimodal LLMs. Overall, top-performing thinking models achieve a response accuracy of up to 75.9%.

## Key contributions

- Introduces ProVoice-Bench, an evaluation suite containing 1,182 meticulously curated multimodal samples spanning four proactive voice agent tasks.
- Defines four novel tasks—Proactive Intent Capture (PIC), Latent Topic Monitor (LTM), Context Fact Checking (CFC), and Environment Sound Sensing (ESS)—integrating speech audio with mobile digital contexts.
- Proposes a multi-stage synthetic data pipeline combining digital state generation, script synthesis, neural text-to-speech, far-field acoustic simulation, and conversational assembly.
- Evaluates open-source MLLMs, exposing a massive performance split between reactive behaviors and proactive intervention, and highlights the utility of Chain-of-Thought reasoning.

## Problem

Current multimodal voice agents operate in a reactive paradigm, responding only when explicitly commanded and missing implicit user needs, environmental cues, or contextual anomalies. Prior works like ContextAgent and ProAgent focus exclusively on visual inputs and ignore rich speech data while neglecting user-defined triggers. This reactive limitation prevents voice assistants from intervening naturally when hesitation, background sounds, or contradictions with digital records occur.

## Method

ProVoice-Bench formalizes a proactive voice agent as an integrated model processing conversational audio (Ca) and user digital context (Dc) to yield a tool-call request (Tp) and textual response (Rp). Each sample uses a quintuple structure (Ca, Dc, Sc, Rg, Tg) containing the primary inputs, semantic cues (Sc), and ground-truth references (Tg, Rg). The data synthesis pipeline begins by using Qwen3-Max to build fine-grained digital application states containing implicit cues from themes sampled from dialog-topics. Scenes are synthesized with specific triggers, followed by multi-speaker conversation generation using CosyVoice3 paired with gender-matched seed-tts-eval audio prompts and ESC-50 acoustic events.

In the acoustic simulation phase, audio streams are RMS-normalized to -20 dBFS, passed through a -3 dB treble biquad filter at 4 kHz with 4 dB attenuation for off-axis simulation, and convolved with stochastic room impulse responses (RIRs) at a wet/dry ratio of 0.3. Dialogues are assembled using clipped Gaussian distributions for inter-turn intervals (N(0.75, 0.35) s for speech, N(10.0, 1.66) s for ESS) alongside CochlScene background noise. Evaluation relies on binary decision metrics (Accuracy, False Positive Rate, Recall) and a composite Response Accuracy (Racc) score that multiplies an indicator function for correct trigger decisions by an LLM-as-a-judge score (using Qwen3-80B) evaluating tool-calling precision and response alignment.

## Experimental setup

The evaluation benchmark consists of 1,182 balanced positive and negative multimodal samples divided across CFC, LTM, PIC, and ESS tasks. State-of-the-art open-source MLLMs evaluated include Mimo-Audio (7B), Qwen3-Omni (30B), Step-Audio-R1 (33B), and Qwen2.5-Omni (7B), tested in both standard and Chain-of-Thought (T) configurations. Metrics include Recall (Rec), False Positive Rate (FPR), Accuracy (Acc), and Response Accuracy (Racc).

## Results

When evaluated on ProVoice-Bench, standard models show severe over-triggering, with LTM tasks suffering from high false positives where models respond irrespective of triggers. Incorporating Chain-of-Thought reasoning dramatically improves overall performance, lifting Qwen3-Omni(T)'s overall Accuracy to 0.787 and Response Accuracy to 0.759 (compared to 0.652 and 0.573 for its standard counterpart). Ablations omitting the digital context reveal major performance drops, particularly in Recall for CFC (which relies on records to time interventions) and PIC.

| System | CFC Acc | LTM Acc | PIC Acc | ESS Acc | Overall Racc |
|---|---|---|---|---|---|
| Mimo-Audio (7B) | 0.497 | 0.532 | 0.780 | 0.618 | 0.496 |
| Mimo-Audio(T) (7B) | 0.778 | 0.588 | 0.800 | 0.729 | 0.596 |
| Qwen3-Omni (30B) | 0.536 | 0.640 | 0.777 | 0.652 | 0.573 |
| Qwen3-Omni(T) (30B) | 0.838 | 0.832 | 0.775 | 0.787 | 0.759 |
| Step-Audio-R1(T) (33B) | 0.828 | 0.804 | 0.822 | 0.793 | 0.734 |

## Limitations

The benchmark relies entirely on synthetically generated dialogues, application states, and simulated acoustic reverberation rather than in-the-wild conversational data. Language scope is bounded by the capabilities of the underlying LLMs and TTS systems used for synthesis. Furthermore, evaluation depends heavily on an LLM-as-a-judge (Qwen3-80B), which may introduce systematic bias in scoring complex semantic responses.

## Why read this

Researchers and engineers building next-generation conversational voice assistants should read this to understand the limitations of reactive MLLMs and how to evaluate context-aware, proactive agent architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Proactive digital assistants, context-aware smart home speakers, ambient conversation monitors, and hands-free productivity tools.

## Related

- (link related pages by id as the wiki grows)
