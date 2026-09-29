---
id: treffehn26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1387
pdf: https://www.isca-archive.org/interspeech_2026/treffehn26_interspeech.pdf
---

# Screening Matters: A Comparative Study of Conventional and Crowdsourced Listening Tests

*Anika Treffehn, Andrea Eichenseer, Emily Kratsch, Nicola Pia*

[PDF](https://www.isca-archive.org/interspeech_2026/treffehn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/treffehn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1387)

**Category:** `resources-evaluation`

**TL;DR** — A comparative study evaluating speech codecs via lab-controlled P.800 versus crowdsourced P.808 tests reveals that mid- and post-screening methods drastically reduce rating bias and align crowdsourced scores with laboratory benchmarks, improving MAE from 0.573 down to 0.230.

## Key contributions

- Evaluated 20 diverse classical and neural speech/audio codecs across identical controlled P.800 and crowdsourced P.808 test conditions using 480 stimuli.
- Demonstrated that un-screened crowdsourced P.808 tests compress the rating span and inflate variance, resulting in a mean absolute error (MAE) of 0.573 compared to lab tests.
- Proved that pre-screening questionnaires and pretests are poor indicators of listener reliability, whereas mid-test traps/gold standard questions and post-test rating span/anchor ordering are highly effective.
- Formulated a combined screening pipeline that achieves high correlation with lab tests (r = 0.974, MAE = 0.230) by removing unqualified participants.

## Problem

Subjective listening tests are critical for evaluating speech codecs, but laboratory-controlled P.800 tests are costly and time-consuming. Crowdsourcing via platforms like Amazon Mechanical Turk or Prolific (Recommendation P.808) offers rapid results but suffers from uncontrolled environments, unverified hardware, and unreliable listener attention. Without robust screening, crowdsourced ratings compress toward the center of the scale and exhibit high variance, making them unreliable for differentiating modern neural and classical speech codecs.

## Method

The authors conducted two parallel listening tests using a modified webMUSHRA framework: a lab-controlled P.800 test with 27 screened participants and a crowdsourced P.808 test via Amazon Mechanical Turk with 33 participants. Both tests evaluated 24 clean English speech samples processed through 20 distinct conditions (c01 to c20), spanning an uncompressed reference, MNRU anchors, low-pass filters, classical codecs (Codec2, AMR, AMR-WB, EVS), and neural codecs (FlowDec, Lyra, DAC, Mimi, SNAC, WavTokenizer) evaluated using Degradation Category Rating (DCR) and DMOS (1 to 5 scale).

To correct crowdsourced anomalies, the study evaluates three screening categories. Pre-screening examines hardware/environment questionnaires and a 10-item listening pretest (MJNDQ-adapted). Mid-screening utilizes randomized attention-check traps and gold standard reference questions (filtering out users whose lowest reference rating drops below a set threshold). Post-screening evaluates rating span (difference between reference and worst anchor) and MNRU anchor ordering consistency to ensure listeners can correctly rank grading severity.

Evaluation compares crowdsourced results against P.800 lab benchmarks using Mean Absolute Error (MAE), Root Mean Square Error (RMSE), Pearson correlation (r), and Spearman's rank correlation (rho). The design choices demonstrate that behavior-based metrics (reference floors, anchor monotonicity) successfully identify and discard unreliable workers while preserving true perceptual differences.

## Experimental setup

Evaluated 24 monophonic 8-second clean English speech files across 20 codec conditions (480 total stimuli per test panel). P.800 test used 27 laboratory participants; P.808 test used 33 MTurk workers across Australia, Canada, Ireland, UK, and USA. Compared metrics include MAE, RMSE, Pearson r, and Spearman rho computed on mean condition ratings against P.800 baseline.

## Results

Without screening, unadjusted P.808 scores yield an MAE of 0.573, RMSE of 0.659, and Pearson r of 0.929 against P.800, showing severe central compression and a 1.11-point drop for reference ratings. Pre-screening methods proved ineffective, with stricter pretest thresholds degrading correlation (optimal loose pretest achieved r = 0.941, MAE = 0.561). Conversely, mid-screening with a gold standard reference threshold of 4 improved MAE to 0.327 and r to 0.963 while retaining 14 participants. Post-screening via rating span (threshold 2.5) yielded MAE = 0.284 and r = 0.956, while perfect MNRU anchor ordering yielded MAE = 0.376 and r = 0.962. Combining effective mid- and post-screening methods further improved agreement to an MAE of 0.230, RMSE of 0.259, and Pearson r of 0.974, though retaining only 7 out of 33 participants.

| System / Screening Condition | MAE | RMSE | Pearson r | Spearman rho |
|---|---|---|---|---|
| Unscreened P.808 Baseline | 0.573 | 0.659 | 0.929 | 0.929 |
| Pretest (Threshold = 5/10) | 0.561 | 0.654 | 0.941 | 0.933 |
| Mid-screening (Gold Standard >= 4) | 0.327 | 0.401 | 0.963 | 0.963 |
| Post-screening (Rating Span >= 2.5) | 0.284 | 0.325 | 0.956 | 0.962 |
| Post-screening (Perfect MNRU Order) | 0.376 | 0.428 | 0.962 | 0.942 |
| Combined Mid- and Post-Screening | 0.230 | 0.259 | 0.974 | 0.958 |

## Limitations

The study is restricted to clean English speech samples, monophonic material, and specific speech codecs, leaving general audio, stereo material, and tonal/singing content unexamined. Aggressive post-screening drastically reduces participant retention (down to 7 out of 33), requiring massive over-recruiting (3x to 5x) to maintain statistical power. Furthermore, language and regional barriers can invert scales for non-attentive workers despite pre-qualifications.

## Why read this

Speech and ML researchers running subjective evaluations will learn how to drastically lower crowdsourced listening test error without paying for expensive lab studies. It provides concrete threshold recommendations for P.808 screening that replace arbitrary outlier removal with systematic quality control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cost-effective subjective evaluation and quality benchmarking of classical and neural speech codecs during early-stage prototyping and deployment.

## Institutions / 機構

Fraunhofer-Gesellschaft

**Funding / 經費:** Free State of Bavaria

## Related

- (link related pages by id as the wiki grows)
