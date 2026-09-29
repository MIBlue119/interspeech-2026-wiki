---
id: chen26b_interspeech
category: tts
institutions: ["National Taiwan University", "Inventec Corporation", "University of Southern California"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-66
pdf: https://www.isca-archive.org/interspeech_2026/chen26b_interspeech.pdf
---

# The Binding Effect: Analysis of How Multi-Dimensional Cues Form Gender Bias in Instruction TTS

*Kuan-Yu Chen, Yi-Cheng Lin, Po-Chung Hsieh, Huang-Cheng Chou, Chih-Fan Hsu, Jeng-Lin Li, Hung-yi Lee, Jian-Jiun Ding*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-66)

**Category:** `tts`

**TL;DR** — This paper investigates gender bias in Instruction Text-to-Speech (ITTS) models by modeling prompts as compositional combinations of social status, career stereotypes, and personality traits, uncovering a "binding effect" where multi-dimensional cues interact non-linearly rather than independently.

## Key contributions

- Proposes a systematic two-stage evaluation framework to separate univariate sensitivities from compositional interaction effects across three social dimensions (Social Status, Career, and Persona).
- Introduces a log-odds interaction term (I) and identifies three distinct compositional interaction paradigms: Additive Smoothness, Asymmetric Veto Power, and Prior Saturation.
- Demonstrates that generative gender biases originate fundamentally from the semantic priors of pre-trained text encoders (e.g., T5, BERT) rather than solely from audio training data skews.
- Compares multiple representative open-source ITTS architectures, exposing how different backbones and parameter scales handle attribute conflicts.

## Problem

Current bias evaluations in Instruction Text-to-Speech (ITTS) systems rely exclusively on univariate testing (single isolated lexical markers), overlooking the compositional structure of social cues in human perception. Real-world prompts mix social status, career, and persona, creating complex interaction effects where contextual factors can override baseline occupational stereotypes. Without a compositional assessment framework, latent ethical risks and biased acoustic outcomes remain hidden during model deployment.

## Method

The authors formulate the problem by organizing the semantic control space into three axes: Social Status (A_sta), Career (A_car), and Persona (A_persona), mapped to natural language prompts via a textual realization function T(s). In Stage 1, univariate sensitivity is measured by isolating individual descriptors while leaving other axes empty, establishing baseline female probabilities P(x_uni). In Stage 2, bi-dimensional and tri-dimensional compositional instructions are synthesized to evaluate non-additive interactions. To prevent probability saturation at boundaries, probabilities are mapped to log-odds space L(x) = ln(P / (1 - P)), and the interaction term I is quantified as the deviation from the additive baseline. Significance is assessed via permutation tests with 10^4 iterations. Evaluations use gender-neutral content transcripts combined with templates generated using Gemini 3 Pro to isolate style-driven bias.

The study evaluates three representative ITTS systems with distinct generative backbones and text encoders: VoxInstruct (~7B total parameters, LLaMA AR+NAR backbone, mT5-base encoder), PromptTTS++ (~150M total parameters, Diffusion + MDN backbone, BERT encoder), and Parler-TTS in two scale variants—Parler-Mini (880M total, Flan-T5-large) and Parler-Large (2.3B total, Flan-T5-large). Gender probabilities of synthesized speech waveforms are classified using a wav2vec 2.0 model, validated via a 10% manual audit showing 95% human agreement. Semantic bias and effect sizes are computed via cosine similarity between contextual text embeddings and gender anchor sets.

## Experimental setup

The controlled test set comprises 69 total descriptors across three axes (|A_sta| = 2, |A_car| = 27, |A_persona| = 40). Each descriptor is cross-multiplied with 10 gender-neutral transcripts and 10 templates, yielding 6,900 univariate samples. Targeted compositional test sets include 32 bi-dimensional combinations (3,200 utterances) and 32 tri-dimensional triplets (3,200 utterances), totaling 6,400 compositional samples. Models compared include VoxInstruct, PromptTTS++, Parler-M, and Parler-Large. The primary metrics are empirical female acoustic probability P(x) estimated via a wav2vec 2.0 classifier, log-odds interaction term I, and cosine similarity-based semantic bias scores (Delta, Cohen's d) for pre-trained text encoders.

## Results

VoxInstruct exhibits Additive Smoothness where cues combine nearly linearly with small effect sizes (|I| <= 1.81). PromptTTS++ displays Asymmetric Veto Power characterized by severe non-additive shifts under semantic conflict (p < 0.001), where male-leaning cues (such as high status or specific personas) systematically override female-leaning occupational priors (e.g., combining a female-leaning career with male-leaning modifiers yields I = -5.78). The Parler family suffers from Prior Saturation under semantic congruence, hitting mathematical ceilings (P ≈ 0.99) with extreme negative interaction terms (Parler-L I = -6.76, Parler-M I = -7.68) under strict female-leaning conditions. Text encoder analysis confirms that BERT and T5 embedding spaces mirror these exact polarization patterns, showing high alignment with downstream acoustic bias.

| Model | Axis / Condition | Female Probability P(x) | Interaction Term (I) |
|---|---|---|---|
| VoxInstruct | H. Sta. + F-ln. Car. | 0.86 | -0.52 |
| PromptTTS++ | H. Sta. + F-ln. Car. | 0.40 | -0.41 |
| PromptTTS++ | H. Sta. + M-ln. Car. | 0.20 | +7.81 |
| Parler-Large | H. Sta. + F-ln. Car. | 0.91 | -3.88 |
| Parler-Mini | H. Sta. + F-ln. Car. | 0.95 | -2.60 |

## Limitations

The study operationalizes gender strictly as a binary (female/male) for tractable macroscopic bias quantification, omitting non-binary spectrum evaluations. The analysis is limited to open-source models with specific text encoders (mT5, BERT, Flan-T5) and English-language prompts using synthetic Gemini-generated templates. Furthermore, the dataset annotations evaluated may not cover all global cultural variations of occupational and social stereotypes.

## Why read this

Speech and ML researchers building instruction-driven TTS models should read this to understand that bias mitigation cannot be achieved solely through dataset balancing, as pre-trained text encoders actively inject compositional interaction biases into speech generation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and mitigating latent demographic biases in generative text-to-speech systems, and improving fairness in instruction-following audio generation models.

## Institutions / 機構

National Taiwan University, Inventec Corporation, University of Southern California

## Related

- [Sexualised Synthetic Personas Encode and Amplify Gendered Power Asymmetries through Voice](ross26b_interspeech.md) — same problem · relatedness 2.0/3
- [Hidden Priors in Speech LLMs: Speaker Identity Shapes Emotional Perception](chou26_interspeech.md) — same problem · relatedness 1.9/3
- [MOS-Bias: From Hidden Gender Bias to Gender-Aware Speech Quality Assessment](ren26_interspeech.md) — same problem · relatedness 1.9/3
- [The Voice Behind the Words: Quantifying Intersectional Bias in SpeechLLMs](bokkahallisatish26_interspeech.md) — same problem · relatedness 1.9/3
- [Lost in Phonation: Voice Quality Variation as an Evaluation Dimension for Speech Foundation Models](lameris26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
