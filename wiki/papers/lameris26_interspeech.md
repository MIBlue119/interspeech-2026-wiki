---
id: lameris26_interspeech
category: resources-evaluation
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["KTH Royal Institute of Technology"]
code: https://shreeharsha-bs.github.io/Lost-in-phonation/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-736
pdf: https://www.isca-archive.org/interspeech_2026/lameris26_interspeech.pdf
---

# Lost in Phonation: Voice Quality Variation as an Evaluation Dimension for Speech Foundation Models

*Harm Lameris, Shree Harsha Bokkahalli Satish, Joakim Gustafson, Éva Székely*

[PDF](https://www.isca-archive.org/interspeech_2026/lameris26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lameris26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-736)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — The paper introduces VQ-Bench, a controlled evaluation suite of parallel synthetic utterances featuring modal, breathy, creaky, and end-creak phonation types, to probe speech foundation models' (SFMs) sensitivity to non-lexical voice quality variations. Results reveal that leading SFMs and speech emotion recognition models exhibit systematic behavioural shifts in agency, empathy, leadership, and emotional classification, while mirroring human gender biases such as leadership and salary penalties for female voices.

## Key contributions

- Introduction of VQ-Bench, a controlled dataset consisting of 25 hours and 17 minutes of parallel speech prompts across modal, breathy, creaky, and end-creak phonation types.
- A systematic long-form evaluation framework assessing SFM behavior in ecologically valid domains (therapy, career advice, interview screening, and storytelling) using an LLM judge.
- Discovery that commercial speech-to-speech APIs fail basic biometric sanity checks by incorrectly classifying all inputs as male, while open-weight SFMs (LFMAudio2-1.5B) demonstrate significant performance shifts based on glottal source characteristics.
- Bayesian multilevel analysis of speech emotion recognition logit distributions proving that phonation types predictably distort affective probability masses (e.g., breathy voice increasing 'calm' and decreasing 'fearful').

## Problem

Speech foundation models (SFMs) process raw audio directly and are increasingly deployed in interactive applications, yet their treatment of paralinguistic variation and voice quality remains largely unstudied. Prior evaluations rely heavily on multiple-choice question answering (MCQA) frameworks that constrain outputs, mask generative biases, and fail to capture how non-lexical cues influence reasoning. Understanding this gap is crucial because voice quality carries heavy pragmatic, social, and emotional weight in human communication, risking the unvetted amplification of human social biases in automated speech applications.

## Method

The authors created VQ-Bench using reference audio extracted from the Buckeye Corpus (spontaneous American English interviews, 40 speakers) and the VCTK Corpus (read English, 109 speakers). Zero-shot TTS system F5-TTS was used to synthesize base prompts, which were subsequently modified using VoiceQualityVC to manipulate glottal source characteristics. Specifically, spectral tilt, open quotient, and periodicity regularity (CPPS) were adjusted to target precise H1-H2 and H1-A3 acoustic parameters for modal, breathy, creaky, and end-creak phonation types while maintaining consistent pitch and duration. End-creak was synthesized by converting the first half of an utterance with modal parameters and linearly interpolating to end-creak values at the phrase boundary.

For evaluation, two settings were tested: (1) long-form open-ended generation tasks across four application domains (therapy, career advice, interview screening, and storytelling) prompting LFMAudio2-1.5B and an OpenAI speech-to-speech API, with responses evaluated via gemini-2.5-flash-lite using a 1-5 rubric; and (2) speech emotion recognition (SER) using a Wav2Vec 2.0 model fine-tuned on xlsr-en-speech-emotion-recognition. Cumulative link mixed models (CLMMs) and Bayesian multilevel categorical regression (4 chains, 2000 iterations, 1000 warmup) were employed to analyze rating shifts and full logit probability distributions across emotion categories.

## Experimental setup

VQ-Bench contains 20 prompts per speaker across 148 speakers and 4 voice qualities, totaling 25 hours and 17 minutes of audio. Baselines compared include commercial speech-to-speech APIs (OpenAI real-time API) versus open-weight SFMs (LFMAudio2-1.5B). Evaluation metrics include LLM-judged rubric scores (1-5 scale) across qualitative dimensions like actionability, shortlist decisions, salary offers, heroic agency, and emotional validation, alongside Bayesian posterior distributions for SER emotion logit shifts.

## Results

The OpenAI real-time speech-to-speech API completely failed basic biometric sanity checks, defaulting to classifying all input samples as male regardless of actual speaker gender. For LFMAudio2-1.5B, voice quality significantly impacted all long-form evaluation dimensions except role status and emotional validation. For instance, breathy and end-creak voices increased STEM-oriented career recommendations, whereas creaky voice drove higher care-orientation ratings. In interview screening, non-modal voices generally reduced shortlist and salary recommendations, with female voices systematically receiving lower scores than male voices for salary offers and leadership endorsements.

In the SER Bayesian analysis, breathy voice substantially increased 'calm' (+1.17 logit change, 95% CI [0.77, 1.57]) and 'neutral' predictions while decreasing 'fearful' (-1.21) and 'surprised' (-1.80) predictions. Creaky voice reduced 'fearful' (-0.94) and 'happy' (-0.52) predictions. Female speaker voices independently increased predictions for 'fearful' (+3.89) and 'surprised' (+2.40) relative to modal male references.

## Limitations

The evaluation scope is restricted to English-language speech corpora (Buckeye and VCTK) and relies primarily on binary gender classifications reflecting the underlying source datasets. The study evaluates a single open-weight generation model (LFMAudio2-1.5B) alongside one commercial API due to current SFM landscape limitations, and relies on an LLM-as-a-judge proxy rather than large-scale human perceptual studies.

## Why read this

Speech and ML engineers building spoken dialogue agents, conversational LLMs, or automated screening systems should read this paper to understand how subtle laryngeal variations and voice quality distortions silently bias generative outputs and downstream social judgments.

## Code

- https://shreeharsha-bs.github.io/Lost-in-phonation/

## Applications

Automated interview screening, AI-driven psychotherapy and counseling bots, voice assistants, and speech emotion recognition safety audits.

## Institutions / 機構

KTH Royal Institute of Technology

**Funding / 經費:** Wallenberg AI, Autonomous Systems and Software Program, Knut and Alice Wallenberg Foundation, Swedish Research Council

## Related

- (link related pages by id as the wiki grows)
