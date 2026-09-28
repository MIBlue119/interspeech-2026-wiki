---
id: shea26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1906
pdf: https://www.isca-archive.org/interspeech_2026/shea26_interspeech.pdf
---

# Masculinity and Sexual Orientation as Predictors of f0 Variation in the Speech of Australian English Speaking Men

*Timothy Shea, Hannah White, Joshua Penney, Anita Szakay, Felicity Cox*

[PDF](https://www.isca-archive.org/interspeech_2026/shea26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shea26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1906)

**TL;DR** — This study examines how sexual orientation, orientation toward traditional masculinity, and conversational topic affect fundamental frequency (f0) variations among Australian English-speaking men, finding that local f0 is unaffected by these social factors while f0 dynamicity and range vary through complex interactions with age and topic.

## Key contributions

- Investigates the sociophonetic impact of male sexual orientation and hegemonic masculinity within the Australian English context for the first time.
- Analyzes speech across three distinct f0-derived dependent variables: local f0, f0 differences (dynamicity), and utterance-level f0 range.
- Demonstrates that referential topic (LGBTQ vs. neutral themes) induces style shifting in f0 dynamicity and range exclusively for gay and bi+ speakers.
- Uncovers an interaction where older men (over 30) adhering more strongly to traditional male roles exhibit reduced f0 dynamicity, a pattern absent in younger speakers.

## Problem

Prior sociophonetic research on male sexual orientation and pitch has produced mixed results without universal consensus, largely focusing on American or European varieties while neglecting Australian English. Furthermore, while hegemonic masculinity theoretically proscribes expressive or feminine speech styles like pitch variation, empirical production studies have frequently struggled to isolate robust links between masculinity scores and fundamental frequency. This work addresses these gaps by evaluating how sexual orientation and masculinity jointly interact with age and conversational topic to influence pitch characteristics.

## Method

The study analyzes speech data from 77 cisgender Australian English-speaking men (ages 18-52, mean 30.4) recorded via a Zoom H6 portable recorder at 44.1 kHz during a picture description task comprising six neutral and three LGBTQ-themed photographs. Following demographic and survey collection, participants completed the 8-item Male Roles Attitude Scale (MRAS) to quantify adherence to traditional male gender roles, with scores z-scored to yield an MRAS Score. Audio files were preprocessed to isolate vowels and sonorant consonants (removing hesitations), and processed via MacReaper to calculate glottal closure instants (GCIs) and extract local f0 estimates at 10 ms intervals.

Pauses exceeding 200 ms defined utterances, within which f0 dynamicity was measured as the absolute difference between every fifth f0 estimate to avoid cycle-to-cycle GCI jitter while capturing overall fluctuations, alongside utterance-level f0 range in Hz. Data were evaluated using linear mixed-effects regression models incorporating random slopes for topic on random speaker intercepts. Model simplification utilized stepwise removal of non-significant highest-order interactions via likelihood ratio tests, evaluating fixed structures containing sexual orientation (binary: gay/bi+ vs. straight), MRAS score, age bracket (30 and under vs. over 30), and topic.

## Experimental setup

The dataset comprises speech samples from 77 adult male Australian English speakers divided into age brackets (45 participants aged 30 and under; 32 participants over 30) and sexual orientations (27 gay, 38 straight, 12 other/bisexual/pansexual/queer, collapsed into 39 gay/bi+ and 38 straight due to distribution). Statistical evaluation relied on linear mixed-effects regression models and post-hoc pairwise comparisons of estimated marginal means.

## Results

Local f0 was unaffected by sexual orientation or MRAS score, with age bracket being the sole significant predictor (older speakers over 30 averaged lower f0 than the reference level: Est = -7.327, SE = 3.227, t = -2.27, p = 0.026). For f0 dynamicity, older speakers (over 30) showed decreased f0 differences with increasing traditional masculinity scores (Est = -2.805, SE = 0.840, t = -3.340, p = 0.001), whereas younger speakers showed no such effect; additionally, younger gay/bi+ men exhibited greater f0 differences than straight men, whereas the reverse trend occurred for the over-30 group (Est = 3.219, SE = 1.493, t = 2.156, p = 0.034).

When shifting from neutral to LGBTQ-themed topics, gay and bi+ speakers significantly increased both f0 dynamicity (Est = 0.979, SE = 0.372, t = 2.632, p = 0.010; post-hoc p = 0.005) and f0 range (Est = 4.345, SE = 2.130, t = 2.040, p = 0.046; post-hoc p < 0.001), while straight speakers displayed no significant topic-based differences in either metric.

## Limitations

The sample size is restricted to 77 male speakers of Australian English, limiting cross-cultural generalization. The non-binary sexual orientation category had to be collapsed into a binary gay/bi+ grouping due to sparse distribution across age brackets, and transgender representation was limited to a single participant. The study evaluates f0 variation broadly without distinguishing the specific acoustic mechanisms driving changes, such as shifts between modal and creaky voice.

## Why read this

Researchers in sociophonetics and speech technology will gain crucial insights into how intersectional social variables like age, masculinity orientation, and conversational context dynamically shape pitch features beyond static mean f0.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic speaker comparison, cultural sensitivity training, and sociolinguistic profiling.

## Related

- (link related pages by id as the wiki grows)
