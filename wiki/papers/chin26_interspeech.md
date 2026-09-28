---
id: chin26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2950
pdf: https://www.isca-archive.org/interspeech_2026/chin26_interspeech.pdf
---

# Effects of listener language experience, masker language, and cognitive load on word monitoring accuracy and response time

*Jessica Chin, Laurence Bruggeman, Mark Antoniou*

[PDF](https://www.isca-archive.org/interspeech_2026/chin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2950)

**TL;DR** — This study investigates how listener language experience, masker language, and cognitive load impact speech-in-speech recognition using an English word monitoring task. Results show that an English masker causes the poorest accuracy and response times, while bilingual familiarity with the masker and varying cognitive load via digit preload do not significantly disrupt word monitoring performance.

## Key contributions

- Evaluated the linguistic similarity hypothesis by comparing English target word monitoring under English, Swedish, Arabic, and Spanish two-talker babble maskers.
- Contrasted performance between 78 Australian English monolinguals and 27 Arabic–English bilinguals to isolate the effect of masker language familiarity.
- Manipulated cognitive load using a 1-digit vs. 3-digit preload task to test attentional limits during speech-in-speech processing.
- Analyzed data using Bayesian multilevel regression models (skew-normal and lognormal) yielding specific evidence ratios and posterior probabilities.

## Problem

Speech recognition in competing babble is degraded by energetic and informational masking, but it remains unclear whether difficulty in matched target-masker conditions stems from linguistic similarity or listener familiarity with the masker. Prior studies show mixed findings regarding whether typological similarities (e.g., stress-timed vs. syllable-timed languages) and bilingual proficiency exacerbate informational masking. Furthermore, the role of working memory and cognitive load in speech-in-speech segmentation strategies requires further empirical testing across diverse listener populations. Resolving these questions helps clarify the Ease of Language Understanding model and cognitive accounts of speech perception in noise.

## Method

The experiment used a dual-task design combining word monitoring and a digit preload secondary task across 56 trials. Participants listened to 16-word sequences (containing 1 disyllabic target word and 15 fillers) embedded in two-talker masker babble at -5 dB SNR, presented via E-Prime Go 1.0 remotely. Masker babble tracks were constructed from semantically anomalous sentences translated from English into Swedish, Arabic, and Spanish, alongside native English maskers, normalized to 65 dB SPL for targets and 70 dB SPL for maskers. Cognitive load was manipulated by visually presenting either one (low load) or three (high load) two-digit numbers (10–99) prior to the word sequence, which participants had to recall afterward. Response times (RTs) and button-press hits, misses, and false alarms were recorded.

Data were analyzed using Bayesian multilevel models in R via the brms package. Word monitoring accuracy was evaluated using d-prime ($d'$) via a Bayesian skew-normal regression model with weakly informative priors, incorporating random intercepts by word and by-participant random slopes for listener group over 12,000 posterior draws. Response times for successful hits were analyzed using a Bayesian lognormal regression model with 8,000 to 12,000 posterior draws. The digit preload task performance was quantified using the Levenshtein edit distance between responses and correct numbers, modeled via a Bayesian negative binomial regression.

## Experimental setup

The study evaluated 78 Australian English monolinguals and 27 Arabic–English bilinguals (9 simultaneous, 13 early Arabic-English, 7 early English-Arabic). Stimuli consisted of 41 disyllabic high-frequency English words and 2-talker babble derived from 8 talkers across English, Swedish, Arabic, and Spanish. Evaluation metrics included digit preload Levenshtein distance, word monitoring sensitivity ($d'$), and response times for successful hits. Bayesian hypothesis tests reported evidence ratios (ER) and posterior probabilities (PP).

## Results

For monolinguals, word monitoring accuracy ($d'$) was significantly higher in the Spanish masker condition compared to English (ER = 20.39, PP = 0.95) and Swedish (ER = 199, PP = 1.00), while response times were significantly faster in Swedish and Arabic maskers compared to English (both ERs ≥ 7999.00, PPs = 1.00). Arabic–English bilinguals also showed faster response times in Swedish (ER = 7999.00), Arabic (ER = 1999.00), and Spanish (ER = 40.03) relative to English, but exhibited slower overall response times compared to monolinguals (ER = 26.12, PP = 0.96). High cognitive load successfully impaired digit preload accuracy (ER ≥ 7999.00), but did not affect word monitoring accuracy or response times for either group.

| Condition / Group | Masker Language | Mean RT / Accuracy Outcome | Key Evidence Ratio (ER) vs English |
|---|---|---|---|
| Monolinguals | Spanish vs English | Higher $d'$ accuracy | ER = 20.39 (PP = 0.95) |
| Monolinguals | Swedish vs English | Faster Response Times | ER ≥ 7999.00 (PP = 1.00) |
| Monolinguals | Arabic vs English | Faster Response Times | ER ≥ 7999.00 (PP = 1.00) |
| Bilinguals | Swedish vs English | Faster Response Times | ER ≥ 7999.00 (PP = 1.00) |
| Bilinguals | Overall vs Monolinguals | Slower overall RTs | ER = 26.12 (PP = 0.96) |

## Limitations

The study relies on a remote testing setup where participants used their own Windows PCs and headphones in uncontrolled home environments, potentially introducing acoustic variance. The word monitoring task utilizes simplified disyllabic target word sequences rather than full continuous sentence recognition, which may understate the cognitive strain typically observed in natural speech-in-speech communication. Additionally, the bilingual cohort was restricted to Arabic-English speakers with high self-rated proficiencies, limiting generalization to unbalanced or lower-proficient bilingual populations.

## Why read this

Speech and psycholinguistics researchers should read this to understand how native and bilingual listeners process masked speech under varying linguistic similarity and working memory constraints. It challenges the assumption that masker language familiarity universally degrades target recognition when listeners maintain high proficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Insights inform the design of robust speech enhancement algorithms, hearing aid signal processing strategies, and multi-talker auditory interfaces in noisy environments.

## Related

- (link related pages by id as the wiki grows)
