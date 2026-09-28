---
id: xu26m_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1174
pdf: https://www.isca-archive.org/interspeech_2026/xu26m_interspeech.pdf
---

# Learning speaker identities in dialogue: Conversational familiarisation modulates response bias and confidence in voice recognition

*Tianze Xu, Volker Dellwo*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1174)

**TL;DR** — This study investigates how conversational familiarisation and attentional focus affect human voice recognition, showing that dialogue context induces a more liberal response bias rather than improving overall perceptual sensitivity.

## Key contributions

- Evaluated 200 participants across a 2x3 factorial design crossing familiarisation stimulus (natural dialogue vs. scrambled speech) with attentional focus (speaker identity, speech content, undirected).
- Employed state-of-the-art multi-speaker text-to-speech (VibeVoice) driven by real human reference voice x-vectors from the UCLA Speaker Variability Database to generate controllable, high-naturalness dialogue materials.
- Demonstrated through Signal Detection Theory (SDT) metrics and mixed-effects models that conversational familiarisation does not alter perceptual sensitivity ($d'$), but systematically shifts response bias ($c$).
- Showed via Bayesian and frequentist analyses that attentional focus during learning has no significant main effect or interaction on voice recognition accuracy, suggesting incidental automatic encoding of speaker identity.

## Problem

Traditional voice recognition tests rely on highly artificial, isolated, and explicitly memorised stimuli such as pseudo-sentences or short vowels (e.g., the Jena Voice Learning and Memory Test), which ignore natural conversational dynamics. Prior work presents conflicting findings regarding whether intentional versus incidental learning strategies matter, leaving an open question of how naturalistic dialogue context and attentional demands modulate human auditory memory and decision-making during voice recognition.

## Method

The experiment used a 2 x 3 between-subjects design implemented via Gorilla. The familiarisation material comprised a 3-minute, 4-speaker conversation (181 phonetic syllables per speaker) about whether a balloon would burst in outer space, synthesised via VibeVoice using x-vectors extracted from the UCLA Speaker Variability Database via SpeechBrain (v1.0.3). The stimulus condition compared coherent dialogue speech against a scrambled version that destroyed discourse coherence while matching acoustic materials. Attentional focus conditions instructed participants to listen to speaker identity, speech content, or remain undirected.

Following familiarisation, participants completed a 20-question content recall test (serving as an attention check and uniform time buffer) followed by a voice recall test using 4 Harvard sentences and 4 short phrases per target/foil speaker. Trial responses were recorded as yes/no old/new decisions alongside 9-point Likert confidence ratings. Statistical evaluation used both frequentist and Bayesian generalized linear mixed models (GLMMs and LMMs via lme4 and brms) as well as Signal Detection Theory metrics ($d'$, $c$, and AUC).

## Experimental setup

The study analyzed 200 native Northern American English speakers recruited via Prolific (aged 22–55, mean 39.56; 125 female, 73 male, 2 non-binary) after excluding 3 participants for task misunderstanding. Measures included trial-level correctness, trial-level confidence, $d'$ (perceptual sensitivity), $c$ (response bias), and AUC (confidence-based sensitivity), analyzed using ANOVA, LMMs, and GLMMs with Bayes Factors.

## Results

GLMM analysis revealed no significant main effects for familiarisation stimulus, focus, or ground truth on accuracy, but a highly significant interaction between familiarisation stimulus and ground truth ($\chi^2(1) = 13.27, p < .001, \text{BF} = 297.41$). Specifically, dialogue familiarisation improved recognition accuracy for old speakers (odds ratio = 1.53, $p = .002$) but decreased accuracy for new speakers due to false alarms (odds ratio = 0.76, $p = .026$). SDT analyses confirmed that this trade-off stems entirely from a shift in response bias ($c$; $F(1, 194) = 13.26, p < .001, \text{BF} = 60.07$), driving a more liberal decision criterion, whereas perceptual sensitivity ($d'$) showed no significant difference across conditions ($F(1, 194) = 0.59, p = .442$). Attentional focus yielded no significant main effects or interactions across accuracy, confidence, or sensitivity metrics.

| Familiarisation Condition | Ground Truth | Accuracy (Mean) | Response Bias ($c$) | Sensitivity ($d'$) |
| :--- | :--- | :--- | :--- | :--- |
| Dialogue Speech | Old Speaker | Higher (~0.73) | -0.15 (Liberal) | 0.85 |
| Dialogue Speech | New Speaker | Lower (~0.58) | -0.15 (Liberal) | 0.85 |
| Scrambled Speech | Old Speaker | Lower (~0.62) | +0.12 (Conservative) | 0.82 |
| Scrambled Speech | New Speaker | Higher (~0.68) | +0.12 (Conservative) | 0.82 |

## Limitations

The study relies exclusively on synthetic speech generated by a single text-to-speech model (VibeVoice) using a limited set of four speakers discussing one specific topic, which may constrain acoustic and linguistic generalizability. The participant pool is restricted to native English speakers from North America, and the recognition task evaluates only short-term memory after a single 3-minute exposure window.

## Why read this

Researchers and engineers designing voice recognition benchmarks, speaker verification systems, or auditory cognitive models should read this to understand how natural conversational context introduces systematic response biases in human listeners that standard isolated-utterance tests fail to capture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving the ecological validity of speech evaluation tests, informing human-in-the-loop voice biometrics, and designing more natural conversational AI interfaces.

## Related

- (link related pages by id as the wiki grows)
