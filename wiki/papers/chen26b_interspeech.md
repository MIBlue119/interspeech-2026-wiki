---
id: chen26b_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-66
pdf: https://www.isca-archive.org/interspeech_2026/chen26b_interspeech.pdf
---

# The Binding Effect: Analysis of How Multi-Dimensional Cues Form Gender Bias in Instruction TTS

[PDF](https://www.isca-archive.org/interspeech_2026/chen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-66)

**TL;DR** — A compositional evaluation framework investigates gender bias in Instruction Text-to-Speech (ITTS) models by combining social status, career stereotypes, and personality personas, revealing complex interaction effects rooted in pre-trained text encoders.

## Problem

Current bias evaluations in Instruction Text-to-Speech (ITTS) systems rely on simplistic univariate testing, which fails to capture how human social perception is shaped by the simultaneous integration of multiple demographic and contextual cues. This oversight hides severe compositional bias patterns and latent ethical risks that emerge when users combine conflicting textual attributes in real-world applications.

## Method

The authors propose a two-stage evaluation framework examining three semantic axes: Social Status (Weberian stratification via SDO), Career (socially structured roles), and Persona (Big Five dispositional traits). Stage 1 measures univariate sensitivity to isolate baseline gender priors, while Stage 2 constructs bi-dimensional and tri-dimensional prompts using 69 total descriptors to compute log-odds interaction terms (I) and detect non-additive dynamics. They test three representative ITTS systems—VoxInstruct, PromptTTS++, and two scale variants of Parler-TTS (Mini and Large)—utilizing 6,400 to 6,900 synthesized gender-neutral utterances per configuration evaluated via a wav2vec 2.0 gender classifier.

## Results

Evaluating across models with parameter scales ranging from 150M to 7B, the authors uncover three distinct compositional paradigms: Additive Smoothness in VoxInstruct (nonsignificant interaction terms with |I| <= 1.81), Asymmetric Veto Power in PromptTTS++ (where male-leaning semantic conflicts systematically override occupational priors, yielding interaction values like I = -5.78), and Prior Saturation in the Parler family (severe sub-additivity under semantic congruence, hitting probability ceilings near P >= 0.99). Text encoder analysis confirms that generative gender bias strongly correlates with upstream semantic priors from models like BERT and Flan-T5, matching acoustic polarization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing or auditing generative text-to-speech and instruction-following audio models to diagnose latent demographic biases and improve algorithmic fairness.

## Limitations

The study operationalizes gender as a binary classification (female/male) solely for tractable quantification of macroscopic biases.

## Related

- (link related pages by id as the wiki grows)
