---
id: zhou26b_interspeech
category: tts
labels: [generative-model]
institutions: ["Chinese Academy of Sciences", "Capital Normal University"]
code: https://github.com/Plachtaa/seed-vc
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-996
pdf: https://www.isca-archive.org/interspeech_2026/zhou26b_interspeech.pdf
---

# Intonation Perception in Real and Synthetic Speech across Varying Familiarity Levels: A Pilot Study of Equivalence Assessment

*Hanrui Zhou, Gaoyuan Zhang, Yixiang Chen, Yujie Xing, Feng Xu, Xurong Xie, Hui Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-996)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — A pilot behavioral study investigating how human listeners perceive speaker identity similarity and intonation in natural vs. F0-conditioned singing voice conversion (SVC) synthetic speech, finding significant interactions between speech type, intonation, and speaker familiarity.

## Key contributions

- Evaluated human perceptual equivalence between natural speech and AI-generated voice clones across declarative and interrogative intonations.
- Examined the modulating role of speaker familiarity (acquaintances vs. strangers) on speaker similarity perception and intonation recognition.
- Demonstrated that synthetic speech introduces artifacts that disrupt question intonation cues in speaker identification tasks.
- Provided baseline behavioral evidence (reaction time and accuracy) highlighting current limitations of using SVC-generated voices for linguistic corpus construction.

## Problem

Constructing high-quality linguistic corpora containing rich prosodic and speaker identity information is economically and temporally costly, prompting interest in AI voice cloning for synthetic corpus generation. However, prior evaluations of AI speech have predominantly focused on intelligibility, naturalness, and declarative sentences, largely ignoring how complex prosodic features like question intonation and speaker familiarity interact with synthetic artifacts. This gap makes it unclear whether current synthetic voices can reliably substitute for natural speech in language training and intervention contexts where prosodic accuracy is critical.

## Method

The study employs a 2 (speech type: natural vs. synthetic) × 2 (familiarity: familiar vs. strange) × 2 (intonation: statement vs. question) within-subject experimental design. Synthetic speech was generated using an F0-conditioned singing voice conversion (SVC) model (specifically seed-vc, utilizing source semantic and pitch variations mapped to a target timbre) recorded at 44.1 kHz in a soundproof booth using a RODE Wireless GO II microphone. Stimuli comprised 11 neutral 6-word Mandarin sentences (1 practice, 10 formal) produced by 4 speakers (2 strange, 2 familiar to participants) in both statement and question forms. 

Two separate behavioral tasks were administered via PsychoPy across different days: (1) a speaker identity similarity perception task where participants rated pairs on a 1-7 Likert scale and judged same/different identity, and (2) an intonation recognition task where participants classified sentences as statements or questions. Data were analyzed using generalized linear mixed-effects models (GLMMs), cumulative link mixed models (CLMMs) for ordinal scores, linear mixed-effects models (LMMs) for log-transformed reaction times, and Firth's bias-reduced logistic regression for high-accuracy ceiling data.

## Experimental setup

Evaluated 17 native Mandarin-speaking participants (aged 22-41 years, mean 28.176, 6 females, 11 males) for similarity perception, with 11 participating in intonation recognition. Baselines compared natural speech pairs (A-A, C-C, A-B, C-D) against mixed natural-synthetic pairs (A-A', C-C'). Metrics included response time (RT), accuracy (ACC), and 7-point similarity scores. Implementation used PsychoPy on a 60 Hz monitor (1024x768 resolution) with headphones at a 65 cm viewing distance.

## Results

In the speaker identity similarity perception task, accuracy was significantly higher for all-natural pairs (mean 0.917) than mixed natural-synthetic pairs (mean 0.851, p < 0.001). A significant interaction between speech type and intonation (p = 0.014) showed that for natural speech, question intonation yielded higher accuracy (0.946) than statements (0.875), whereas mixed natural-synthetic pairs showed no significant difference. Familiarity main effects showed faster RTs for familiar speakers (0.748s) than strange speakers (0.848s, p = 0.010) and lower similarity ratings for familiar voices (3.560) than strange voices (3.930, p = 0.020).

In the intonation recognition task, accuracy exhibited a ceiling effect (means > 95%). Firth's bias-reduced logistic regression revealed a significant interaction between familiarity and speech type (p = 0.043): for natural speech, strange voices yielded slightly higher accuracy (0.987) than familiar voices (0.982), whereas for synthetic speech, strange voices yielded lower accuracy (0.973) than familiar voices (0.992). Reaction times showed a marginal main effect of intonation (p = 0.050), with questions taking longer (0.270s) than statements (0.249s) due to final F0 rise discrimination.

| Condition | Similarity Accuracy | Similarity Score | Intonation Accuracy | Intonation RT (s) |
|---|---|---|---|---|
| Natural (Strange) | 0.917 | 3.930 | 0.987 | 0.259 |
| Natural (Familiar) | - | 3.560 | 0.982 | 0.249 |
| Natural + Synthetic | 0.851 | 3.600 | - | - |
| Synthetic (Strange) | - | - | 0.973 | 0.270 |
| Synthetic (Familiar) | - | - | 0.992 | 0.260 |

## Limitations

The study relies on a small sample size of 17 participants (11 for intonation recognition) and a restricted stimulus set of 10 Mandarin sentences from only 4 speakers, limiting generalizability. The evaluation is restricted to clean studio recordings, leaving out noisy acoustic environments and broader linguistic or tonal contexts beyond basic statements and questions. Additionally, the cross-sectional pilot nature does not assess longitudinal adaptation effects in actual language training interventions.

## Why read this

Speech and ML engineers building voice cloning or SVC models for educational corpora should read this to understand how synthetic prosodic manipulation and speaker familiarity alter human perceptual processing and cognitive load.

## Code

- https://github.com/Plachtaa/seed-vc

## Applications

Language learning software, AI-powered speech therapy, and synthetic voice corpus generation.

## Institutions / 機構

Chinese Academy of Sciences, Capital Normal University

**Funding / 經費:** National Key R&D Program of China, NSFC, China Disabled Persons Federation, Youth Innovation Promotion Association CAS Grant, China Postdoctoral Science Foundation

## Related

- [A barrier or a booster? Familiarity effects on Mandarin emotion prosody recognition using AI-powered voice cloning](xu26i_interspeech.md) — same problem · relatedness 2.1/3
- [Singing Voice Conversion via Shared Speaker Space and Min-Pooling Adversarially Enhanced Flow Matching](hu26g_interspeech.md) — same problem · relatedness 1.9/3
- [Learning speaker identities in dialogue: Conversational familiarisation modulates response bias and confidence in voice recognition](xu26m_interspeech.md) — same problem · relatedness 1.9/3
- [Synthetic Speech, Real Signal: Paralinguistic Preservation and Cross-Lingual Augmentation via Voice Cloning](polle26_interspeech.md) — shared technique · relatedness 1.9/3
- [Can deep learning based voice editing enhance voice quality perception skills in speech therapy students?](wiechmann26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
