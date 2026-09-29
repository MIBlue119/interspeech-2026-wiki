---
id: porupski26_interspeech
category: paralinguistics-emotion
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3262
pdf: https://www.isca-archive.org/interspeech_2026/porupski26_interspeech.pdf
---

# Umm... With Transformers? Insights from Filled Pause Use across Four Slavic Parliaments

*Ivan Porupski, Branimir Dropuljić, Nikola Ljubešić*

[PDF](https://www.isca-archive.org/interspeech_2026/porupski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/porupski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3262)

**Category:** `paralinguistics-emotion` · **Labels:** `multilingual`

**TL;DR** — This paper investigates filled pause (FP) usage across roughly 4,000 hours of parliamentary speech in four Slavic languages using transformer-based detection and Mundlak-corrected GEE models, revealing that male speakers produce significantly fewer FPs in South Slavic parliaments (a reversal of common conversational trends) and that speech rate within speakers is the strongest predictor of FP rate.

## Key contributions

- Analyzes a massive cross-lingual dataset of ~4,000 hours of parliamentary speech across Croatian, Czech, Polish, and Serbian using automated transformer detectors.
- Applies Mundlak-corrected Generalized Estimating Equations (GEE) to cleanly decompose predictors into stable between-speaker traits and utterance-level within-speaker variations.
- Demonstrates a reversal of the traditional gender effect in South Slavic parliaments, where women exhibit higher FP rates than men.
- Identifies novel paralinguistic associations, showing that positive utterance sentiment consistently correlates with higher FP rates within speakers.

## Problem

Prior research on filled pauses (FPs) predominantly relies on small, single-language, or informal conversational corpora, which restricts the generalizability of findings across diverse linguistic and cultural contexts. Additionally, many studies fail to separate stable individual traits from temporary, utterance-level speaking states. Parliamentary speech offers a controlled, metadata-rich domain to test whether established sociolinguistic predictors (such as age, gender, and speech rate) hold up at scale, while also allowing for exploratory analyses of political orientation, sentiment, and power status.

## Method

The study utilizes the ParlaSpeech dataset, encompassing roughly 4,000 hours of speech (1,001,787 utterances from 1,561 regular members of parliament across Croatia, Czechia, Poland, and Serbia) restricted to utterances lasting at least 3 seconds and containing 10+ words. Filled pause occurrence is automatically extracted via a wav2vec2-bert model yielding an event-level F1 of ~0.92, while utterance-level sentiment is predicted using XLM-R-ParlaSent (R^2 approx 0.65). Speech rate is calculated as syllabic vowel count divided by audio duration.

To model FP rates without overdispersion issues, the authors use Negative Binomial Generalised Estimating Equations (GEE) with log(audio duration) as an offset, clustering by speaker and employing robust sandwich standard errors. They fit baseline models alongside Mundlak-corrected models. The Mundlak correction splits time-varying predictors into a speaker-mean component (capturing between-speaker tendencies) and an utterance-deviation component (capturing within-speaker state changes), thereby mitigating omitted variable bias from fixed speaker traits.

## Experimental setup

The evaluation relies on 3,889 hours of filtered parliamentary audio from the ParlaSpeech corpus spanning Croatian (2015-2022), Czech (2013-2023), Polish (2017-2022), and Serbian (2013-2022). The primary modeling frameworks are global and parliament-specific GEE Negative Binomial models with independent working correlation structures. Metrics are reported as Incidence Rate Ratios (IRRs) relative to a baseline reference category (governing female Czech speaker of average age 50 with centrist politics and negative sentiment).

## Results

Globally, male speakers show a 36.4% drop in FPs compared to females (IRR = 0.636), a trend heavily driven by Croatian and Serbian parliaments (IRR ~0.40–0.53), whereas Czech and Polish parliaments show no significant gender effect. For age, each additional decade yields a 13.8% reduction in FPs globally (IRR = 0.862), replicated cleanly in Czechia and Serbia. Speech rate is the strongest predictor: a higher within-speaker rate yields a 34.8% drop in FPs per standard deviation (IRR = 0.652), emphasizing moment-to-moment planning demands over habitual pace.

For exploratory variables, higher sentiment predicts more FPs globally (IRR = 1.060 per point), with consistent within-speaker increases (+3-6% per point). Opposition members show a 20.8% drop in FPs relative to ruling coalition members globally (IRR = 0.792). Political orientation yielded highly fragmented, mostly non-significant patterns except for isolated within-speaker effects in Croatia and Poland.

| System / Condition | FP Rate Baseline (FPs/min) | Global Gender IRR (Male vs Female) | Age IRR (per decade) | Within-Speaker Speech Rate IRR | Opposition Status IRR |
|---|---|---|---|---|---|
| Global Pooled Model | - | 0.636 | 0.862 | 0.652 | 0.792 |
| Croatia (HR) | 1.82 | 0.520 | 0.925 | - | 0.672 |
| Czechia (CZ) | 2.91 | Non-sig. | 0.770 | - | 0.777 |
| Poland (PL) | 3.47 | Non-sig. | 0.948 | - | Non-sig. |
| Serbia (RS) | 1.38 | 0.410 | 0.800 | - | 1.534 (borderline) |

## Limitations

The dataset is strictly restricted to the parliamentary domain, which may limit generalizability to informal conversational, casual, or broadcast registers. Furthermore, the analysis focuses purely on FP occurrence rates rather than duration, acoustic subtypes (e.g., 'um' vs 'uh'), or detailed micro-linguistic contexts. Certain geopolitical findings, such as the Serbian power-status trend, reflect specific local political dynamics during the sampled period and require broader validation.

## Why read this

Speech and ML researchers studying paralinguistics, disfluencies, or cross-cultural pragmatics should read this to see how large-scale transformer detectors and Mundlak-corrected GEE models uncover domain-specific nuances that contradict common conversational assumptions.

## Code

- https://clarinsi.github.io/parlaspeech/

## Applications

Computational paralinguistics, automated speech analytics for political science, and speaker-trait profiling in parliamentary corpora.

## Institutions / 機構

Jožef Stefan Institute, TransUnion, University of Zagreb, University of Ljubljana, Institute of Contemporary History

**Funding / 經費:** ARIS Slovenian Research and Innovation Agency

## Related

- (link related pages by id as the wiki grows)
