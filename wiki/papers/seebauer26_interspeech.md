---
id: seebauer26_interspeech
category: resources-evaluation
institutions: ["Bielefeld University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-747
pdf: https://www.isca-archive.org/interspeech_2026/seebauer26_interspeech.pdf
---

# Application context in speech synthesis evaluation: A problem and a solution

*Fritz Seebauer, Markus Rothgänger, Sven Wachsmuth, Petra Wagner*

[PDF](https://www.isca-archive.org/interspeech_2026/seebauer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seebauer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-747)

**Category:** `resources-evaluation`

**TL;DR** — An empirical study of 80 participants across four TTS systems and four application contexts reveals that evaluation ratings change significantly depending on the scenario and the specific TTS system, while virtual reality (VR) digital twins yield statistically equivalent ratings to physical testing settings.

## Key contributions

- Demonstrates empirically that application context significantly influences synthetic speech evaluation outcomes, introducing a major confound when comparing systems in unspecified settings.
- Shows that the magnitude of application-induced rating shifts interacts with the specific TTS system under test, especially affecting intonation, audio quality, and pleasantness.
- Validates virtual reality (Meta Quest 3 digital twin) as an ecologically valid and resource-efficient testing alternative that produces statistically comparable ratings to physical lab environments.
- Employs a rigorous Bayesian hierarchical multivariate model combined with Region of Practical Equivalence (ROPE) analysis to evaluate metric stability across conditions.

## Problem

Traditional text-to-speech (TTS) evaluations rely heavily on single-scale absolute category ratings (ACR) and mean opinion scores (MOS) obtained for isolated sentences in neutral, unspecified settings. This modular evaluation paradigm assumes that a system's overall quality is independent of its intended use case. However, mounting evidence suggests that modern TTS has reached human parity in isolated tasks, making contextualized evaluations essential. Neglecting application context risks ecological invalidity and introduces hidden confounds because listener expectations and perceived quality are fundamentally co-determined by operational scenarios.

## Method

The study evaluated 80 native German-speaking participants divided equally between physical and virtual reality settings. Each participant experienced four distinct application tasks in a rotated Latin square design: T1 (task-oriented dialogue scenario instruction), T2 (Wizard-of-Oz object navigation task with pre-recorded prompts), T3 (5-minute open-ended free dialogue), and T4 (stationary read short story). The dialogue framework integrated an ASR module, a 24-billion parameter LLM, barge-in handling, and history tracking, yielding an average user-to-system turn-transition time of 1.07 seconds. Four TTS systems were tested: Tacotron2 with WaveNet (S1), VITS (S2), Auralis TTS / XTTS-V2 commercial variant (S3), and Orpheus, an LLM-based TTS predicting SNAC neural codecs (S4). Systems S1 and S2 were trained on the German Thorsten dataset, while S3 and S4 utilized pre-trained German implementations.

For the physical environment, a mock apartment designed for interaction studies was used. For the virtual reality condition, an Unreal Engine 5 digital twin of the apartment was rendered, featuring internal algorithms for sound propagation and occlusion matching physical speaker locations, presented via a Meta Quest 3 headset. Dependent variables included 100-point visual digital scales for overall quality, listening effort, naturalness, pleasantness, speech melody, audio artifacts, extraversion, and negative emotion, alongside the short-form User Experience Questionnaire (UEQ) measuring pragmatic usability and hedonic appeal. Data was analyzed using a Bayesian hierarchical multivariate model estimated via Hamiltonian Monte Carlo in brms, utilizing LKJ(2) priors for correlation matrices and weakly informative priors for system and listener standard deviations.

## Experimental setup

The experiment evaluated 80 participants (40 physical, 40 virtual reality). Four application tasks (T1-T4) and four TTS systems (S1-S4) were crossed in a Latin square design. Systems were benchmarked across 10-point and 20-point Region of Practical Equivalence (ROPE) bounds and 95% highest density intervals (HDI). The Bayesian models achieved good chain convergence with R-hat <= 1.01, minimum bulk effective sample size (ESS) >= 1800, and tail ESS exceeding 1400.

## Results

The navigation task (T2) received significantly higher ratings in Overall Quality compared to T1 (CrI = [12.34, 21.33]) and T3 (CrI = [10.04, 18.90]), and lower Listening Effort compared to T4 (CrI = [9.921, 19.421]). When examining system-task interactions, substantial divergences outside the strict +/-10 ROPE bounds were observed in quality dimensions such as Intonation, Audio Quality, and Pleasantness (e.g., Listening effort difference between T1-T4 and S3-S2 yielded a CrI of [-37.821, -10.692], 0% ROPE overlap). Conversely, UEQ pragmatic/hedonic scales and extraversion ratings remained largely equivalent across application tasks.

Comparing the physical and virtual reality settings, overall posterior distributions were largely equivalent within the +/-10 ROPE bounds across quality aspects, with narrow +/-15 equivalence holding for most dimensions except listening effort, negative emotion, and audio quality, which were modestly impacted by differing playback hardware (headset vs. physical room speakers).

| Quality Dimension & Contrast | Task / System Condition | HDI Credible Interval | ROPE Overlap (%) |
|---|---|---|---|
| Listening effort | T1 - T4 & S3 - S2 | [-37.821, -10.692] | 0.000 |
| Intonation | T3 - T2 & S3 - S1 | [11.097, 36.118] | 0.000 |
| Intonation | T2 - T4 & S3 - S4 | [-39.721, -12.948] | 0.000 |
| Audio Quality | T1 - T4 & S3 - S4 | [7.913, 32.093] | 0.029 |
| Pleasantness | T3 - T1 & S1 - S2 | [11.745, 38.382] | 0.000 |

## Limitations

The study was restricted to German-language evaluations using a convenience sample of university students, potentially limiting demographic generalization. Only four specific tasks and four representative TTS architectures were evaluated, leaving open whether wider task taxonomies or expressive dialogue styles exhibit different interaction effects. Additionally, physical versus VR evaluations experienced minor playback hardware discrepancies (HMD built-in audio vs. room-scale speakers) that likely contributed to slight variations in perceived audio quality and listening effort.

## Why read this

Speech synthesis researchers and engineers designing system evaluation protocols should read this to understand why neutral, out-of-context MOS testing fails to capture real-world performance differences. It offers a validated Bayesian framework and empirical proof that application context systematically skews system comparisons.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Standardizing ecological benchmarking protocols for commercial and research text-to-speech systems, dialogue agents, and virtual reality speech interfaces.

## Institutions / 機構

Bielefeld University

**Funding / 經費:** Ministry of Culture and Science of the State of North Rhine-Westphalia, Netzwerke 2021, SAIL: SustAInable Life-cycle of Intelligent Socio-Technical Systems

## Related

- (link related pages by id as the wiki grows)
