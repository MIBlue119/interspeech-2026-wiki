---
id: porupski26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3262
pdf: https://www.isca-archive.org/interspeech_2026/porupski26_interspeech.pdf
---

# Umm... With Transformers? Insights from Filled Pause Use across Four Slavic Parliaments

[PDF](https://www.isca-archive.org/interspeech_2026/porupski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/porupski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3262)

**TL;DR** — This study analyzes filled-pause production across ~4,000 hours of Slavic parliamentary speech using transformer-based detectors, revealing that speech rate and age strongly predict filled pauses while gender and political effects are heavily language-dependent.

## Problem

Most empirical research on filled pauses relies on small, single-language corpora, limiting generalizability across linguistic and cultural contexts. Furthermore, prior studies rarely distinguish between stable speaker-level traits and utterance-level state variations, obscuring whether filled pauses reflect fixed habits or immediate cognitive planning demands.

## Method

The authors analyze approximately 3,889 hours of filtered speech from the ParlaSpeech dataset spanning Croatian, Czech, Polish, and Serbian parliaments (1,561 speakers, 1,001,787 utterances). Filled pause occurrence is automatically extracted using a wav2vec2-bert event-level model (F1 ~0.92), while sentiment is predicted via XLM-R-ParlaSent. They fit Negative Binomial models using Generalised Estimating Equations (GEE) with Mundlak correction to decompose predictors into between-speaker means and within-speaker utterance deviations.

## Results

Globally, higher speech rate strongly predicts fewer filled pauses (IRR = 0.645 overall, with the within-speaker component at IRR = 0.652), and each decade of age yields a 13.8% drop in filled pauses (IRR = 0.862). Male speakers show significantly fewer filled pauses globally (IRR = 0.636), though this is entirely driven by South Slavic parliaments (Croatian and Serbian) with no significant effect in Czech and Polish. Opposition members exhibit lower filled-pause rates than the ruling coalition (IRR = 0.792 globally). Higher sentiment scores correlate with increased filled pause rates (+6.0% globally per sentiment point).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building spoken dialogue systems, disfluency detectors, or sociolinguistic analysis tools can use these insights to account for cross-lingual and demographic variations in disfluency.

## Limitations

The dataset is strictly restricted to the parliamentary speech domain, which may limit generalization to casual conversation or other informal registers.

## Related

- (link related pages by id as the wiki grows)
