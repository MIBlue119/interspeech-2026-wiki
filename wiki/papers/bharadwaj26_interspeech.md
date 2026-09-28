---
id: bharadwaj26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1462
---

# An Empirical Recipe for Universal Phone Recognition

**TL;DR** — A systematic ablation study isolating what data scale, architecture, and training objective actually matter for multilingual phone recognition, releasing a new state-of-the-art model, PhoneticXEUS.

## Problem

English-focused phone recognizers don't generalize across languages, multilingual models underuse pretrained SSL representations, and it's unclear which training factors actually drive multilingual phone-recognition quality.

## Method

Trains PhoneticXEUS on large-scale multilingual data and runs controlled ablations evaluated across 100+ languages under one unified protocol to isolate the effects of SSL representations, data scale, and loss objectives, plus error analysis across language families and articulatory features.

## Results

PhoneticXEUS reaches state-of-the-art performance on both multilingual (17.7% PFER) and accented English (10.6% PFER) phone recognition; all data and code are released openly.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource language documentation, universal phone recognizers embedded in multilingual ASR pipelines, and accented-speech systems.

## Related

- (link related pages by id as the wiki grows)
