---
id: xu26m_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1174
pdf: https://www.isca-archive.org/interspeech_2026/xu26m_interspeech.pdf
---

# Learning speaker identities in dialogue: Conversational familiarisation modulates response bias and confidence in voice recognition

[PDF](https://www.isca-archive.org/interspeech_2026/xu26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1174)

**TL;DR** — This paper investigates how conversational dialogue familiarisation influences human voice recognition, finding that natural dialogue context improves hit rates for learned voices but increases false alarms due to a shift in response bias.

## Problem

Most experimental research on voice recognition relies on isolated, explicitly memorised speech snippets or structured pseudo-sentences, which contrasts sharply with how humans learn voices implicitly through natural, continuous, and context-rich conversational exchanges. It remains unclear whether laboratory-based voice tests capture the cognitive mechanisms engaged during everyday social interactions, or how attentional focus and stimulus naturalness interact during voice learning. Understanding this gap is crucial for evaluating human auditory memory and developing ecologically valid assessment tools.

## Method

The study utilized a 2x2x3 between-subjects learning-recognition experimental paradigm deployed online via Gorilla, involving 200 English-speaking participants recruited through Prolific. Participants were exposed to a 3-minute familiarisation stimulus consisting of either a coherent four-speaker dialogue or a scrambled version (disrupting discourse coherence) generated using the VibeVoice text-to-speech system based on real human reference voices from the UCLA Speaker Variability Database. During familiarisation, participants were assigned one of three attentional focuses: speaker identity, speech content, or undirected listening. Following familiarisation, participants completed a 20-question content recall test (serving as an attention check) and a voice recall test presenting 8 items per speaker (Harvard sentences and short phrases) from 4 learned target and 4 novel foil speakers, rating their recognition and confidence on a 9-point scale. Data were analysed using frequentist and Bayesian linear and generalised linear mixed-effects models (GLMMs), alongside signal detection theory (SDT) metrics like d-prime, response bias (c), and area under the curve (AUC).

## Results

Trial-level GLMM correctness revealed no significant main effects of familiarisation stimulus, focus, or ground truth, but showed a significant interaction between familiarisation stimulus and ground truth (chi-squared(1) = 13.27, p < .001, Bayes Factor = 297.41). Specifically, dialogue familiarisation improved recognition accuracy for old speakers compared to scrambled speech (odds ratio = 1.53, p = .002), but decreased accuracy for new speakers by increasing false alarms (odds ratio = 0.76, p = .026). This demonstrates that conversational context shifts listener response bias toward endorsing voices as familiar rather than enhancing sensory discriminability (d-prime). Confidence ratings averaged 6.44 out of 9 and were significantly higher for correct responses and old speakers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cognitive scientists, forensic phoneticians, and speech researchers studying human auditory memory, earwitness testimony, and ecologically valid voice learning paradigms.

## Limitations

The study used synthetic voices generated via text-to-speech rather than live human interactions, and tested a specific four-speaker conversational length of roughly three minutes.

## Related

- (link related pages by id as the wiki grows)
