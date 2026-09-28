---
id: wu26l_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2150
---

# One-to-Many Electrolaryngeal Voice Conversion with Synthetic Data

**TL;DR** — Synthesizing time-aligned electrolarynx speech from a large multi-speaker corpus, using just 13 minutes of real electrolarynx data, trains a one-to-many EL-to-normal voice conversion model.

## Problem

Restoring natural speech from electrolarynx (EL) speech is important for laryngectomy patients, but time-aligned EL-to-normal (NL) conversion is underexplored because temporal-alignment constraints make real paired EL-NL data especially scarce.

## Method

The authors fine-tune a pretrained any-to-many voice conversion model on a small (13-minute) EL speech dataset to perform NL-to-EL conversion, using it to convert a large multi-speaker NL corpus into synthetic time-aligned EL speech, which then supervises a pretrained VC model for one-to-many EL-to-NL conversion.

## Results

Experiments show the method improves intonation and intelligibility over baselines for EL-to-NL conversion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive speech restoration technology for laryngectomy patients using electrolarynx devices, especially where real paired training data is extremely limited.

## Related

- (link related pages by id as the wiki grows)
