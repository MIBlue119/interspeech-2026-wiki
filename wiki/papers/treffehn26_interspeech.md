---
id: treffehn26_interspeech
category: speech-coding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1387
pdf: https://www.isca-archive.org/interspeech_2026/treffehn26_interspeech.pdf
---

# Screening Matters: A Comparative Study of Conventional and Crowdsourced Listening Tests

[PDF](https://www.isca-archive.org/interspeech_2026/treffehn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/treffehn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1387)

**TL;DR** — This paper evaluates classical and neural speech codecs via crowdsourced P.808 versus controlled P.800 listening tests, demonstrating that post- and mid-screening methods significantly improve crowdsourced alignment with lab results (reducing MAE from 0.573 down to 0.230).

## Problem

Subjective evaluation is crucial for modern neural speech and audio codecs because objective metrics and metrics designed for classical codecs fail to capture actual Quality of Experience. While crowdsourcing via platforms like Amazon Mechanical Turk or Prolific provides fast and cost-effective listening test results compared to controlled laboratory setups, crowdsourced ratings suffer from poor listener environments, lack of equipment control, and compressed rating scales with higher variances. This paper investigates various pre-, mid-, and post-screening strategies to filter invalid crowdsourced responses and align P.808 results with controlled P.800 benchmarks.

## Method

The authors conducted two Degradation Category Rating (DCR) listening tests using a DMOS scale of 1 to 5: a controlled P.800 lab test with 27 participants and a crowdsourced P.808 test via Mechanical Turk with 33 participants. Both tests evaluated 20 conditions comprising 480 stimuli (reference, MNRU anchors, classical codecs like AMR/EVS, and neural codecs like Lyra, DAC, Mimi, SNAC, and WavTokenizer) using 24 English clean speech samples. They analyzed three categories of screening methods: pre-screening (a 10-item just-noticeable difference pretest and a demographic/environment questionnaire), mid-screening (attention traps and gold-standard minimum reference rating thresholds), and post-screening (rating span thresholds and MNRU anchor ordering correctness).

## Results

Unscreened P.808 results initially yielded an MAE of 0.573, RMSE of 0.659, and Pearson correlation r = 0.929 compared to P.800. The pre-test and questionnaires proved ineffective as reliable predictors. However, mid-screening using a gold-standard reference minimum threshold of 4 improved MAE to 0.327 and RMSE to 0.401 (retaining 14 participants). Post-screening using a rating span threshold of 2.5 and perfect MNRU anchor ordering further enhanced agreement, achieving an MAE of 0.230, RMSE of 0.259, and r = 0.974 (retaining 7 participants).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio researchers, codec developers, and evaluation engineers looking to conduct cost-effective, reliable, and bias-free subjective listening tests using crowdsourcing platforms.

## Limitations

The study is scoped to English clean speech samples, monophonic audio, and speech/audio coding evaluations, noting that strict post-screening reduces the final retained participant pool and requires recruiting three to five times the target sample size.

## Related

- (link related pages by id as the wiki grows)
