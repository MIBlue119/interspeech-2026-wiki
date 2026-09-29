---
id: wiechmann26_interspeech
category: health-clinical
labels: [generative-model]
institutions: ["Bielefeld University", "Paderborn University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2475
pdf: https://www.isca-archive.org/interspeech_2026/wiechmann26_interspeech.pdf
---

# Can deep learning based voice editing enhance voice quality perception skills in speech therapy students?

*Jana Wiechmann, Frederik Rautenberg, Reinhold Haeb-Umbach, Petra Wagner*

[PDF](https://www.isca-archive.org/interspeech_2026/wiechmann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wiechmann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2475)

**Category:** `health-clinical` · **Labels:** `generative-model`

**TL;DR** — Using deep learning-based speech synthesis to isolate voice characteristics during training significantly improves speech therapy students' perceptual sensitivity and gold-standard agreement compared to natural anchor voices. The synthesis group achieved a post-test sensitivity (d') of 1.03 versus 0.55 for the control group.

## Key contributions

- Evaluates a deep learning voice editing system directly in an applied educational setting for speech therapy students.
- Demonstrates that isolated synthetic prototypes improve perceptual sensitivity (d') and gold-standard agreement (Cohen's kappa) over natural anchor voices.
- Shows that sensitivity to difficult-to-perceive voice qualities like 'rough' can be improved from below-chance to above-chance levels using controllable speech synthesis.
- Provides an interactive experimental paradigm pairing a ~10-minute expert explanation with fine-grained multi-strength synthetic voice variations.

## Problem

Auditory-perceptual assessment of voice quality is notoriously difficult and unreliable even for experts, posing a steep learning curve for novices like speech therapy students. Natural voices are inherently multidimensional, meaning a single voice simultaneously exhibits multiple overlapping acoustic features like breathiness, roughness, and creakiness, making it impossible for listeners to experience features in isolation. Prior training tools relying on natural anchor voices fail to decouple these dimensions, leading to high variability in listener judgments and low diagnostic accuracy.

## Method

The study utilizes a neural text-to-speech (TTS) framework equipped with a manipulation block built on Conditional Continuous Normalizing Flows. This block transforms a global speaker representation by taking the strength levels of seven specific voice qualities as conditioning inputs, enabling the independent modification of breathy, creaky, and rough dimensions while preserving naturalness.

Twenty clinical linguistics students participated in a between-subjects design split evenly into a control group (trained with natural anchor voices) and a synthesis group (trained with synthetically generated isolated prototypes). The experimental workflow consisted of a pre-explanation binary rating phase (16 non-pathological German voices from the NSC corpus evaluated for present/absent traits), a ~10-minute interactive expert explanation phase using respective anchors, and a post-explanation rating phase.

Statistical evaluation was performed using paired t-tests, independent t-tests, linear mixed-effects models (LMER) with Kenward-Roger degrees of freedom approximation, and ANCOVA controlling for pre-test scores, treating participant as a random factor.

## Experimental setup

The experiment evaluated 20 female clinical linguistics students (aged 18-27) using 16 non-pathological German voice samples (8 female, 8 male) from The Nautilus Speaker Characterization Corpus (NSC). Baselines were trained using natural anchor voices and expert imitation, while the treatment group used deep learning-generated synthetic exemplars. Metrics included perceptual sensitivity (d') and agreement with expert gold standard (Cohen's kappa, where expert-expert subset reliability was kappa = 0.85).

## Results

The synthesis group exhibited a statistically significant increase in perceptual sensitivity from pre-test to post-test (d' increasing from 0.73 to 1.03, t(9) = -2.70, p = 0.024), whereas the control group showed no significant change (0.49 to 0.55, t(9) = -0.38, p = 0.71). At the post-test timepoint, the synthesis group achieved significantly higher sensitivity (d' = 1.03 vs 0.55, t(15.77) = -3.08, p = 0.007) and gold-standard agreement (kappa = 0.33 vs 0.19, t(15.33) = -2.55, p = 0.022) compared to controls. An ANCOVA controlling for baseline differences confirmed a significant main effect of group (t(17) = 2.66, p = 0.017).

In dimensional breakdowns, only the 'rough' voice characteristic showed a significant improvement in d' for the synthesis group (t(8) = 2.67, p = 0.028), while 'breathy' and 'creaky' showed no notable gains due to high pre-test baseline ratings and potential ceiling/plateau effects on non-pathological subtle stimuli.

| System / Condition | Pre-test d' (M ± SD) | Post-test d' (M ± SD) | Pre-test Kappa (M ± SD) | Post-test Kappa (M ± SD) |
|---|---|---|---|---|
| Control Group (Natural) | 0.49 ± 0.50 | 0.55 ± 0.40 | 0.16 ± 0.16 | 0.19 ± 0.14 |
| Synthesis Group (Deep Learning) | 0.73 ± 0.41 | 1.03 ± 0.27 | 0.25 ± 0.14 | 0.33 ± 0.09 |

## Limitations

The study relies on a relatively small sample size (n = 20 female students from a single university), limiting the statistical power of the mixed-effects models. The interactive nature of the explanation phase prevented blinding of the expert explainer to experimental conditions, introducing potential explainer bias. Furthermore, testing was restricted to non-pathological German speech samples over a short 10-minute training window, leaving long-term retention and generalization to pathological voices unexplored.

## Why read this

Speech and ML researchers building controllable voice generation systems should read this paper to see a practical validation of neural voice editing applied to human perceptual training and clinical education. It demonstrates that disentangling acoustic dimensions via normalizing flows directly translates to measurable cognitive improvements in human listeners.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech therapy student training, clinical voice assessment software, computer-aided phonetic education tools, and interactive perceptual training modules for forensic phonetics.

## Institutions / 機構

Bielefeld University, Paderborn University

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
