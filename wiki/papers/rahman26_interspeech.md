---
id: rahman26_interspeech
category: low-resource
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1432
---

# Pashto Common Voice: Building the First Open Speech Corpus for a 60-Million-Speaker Low-Resource Language

**TL;DR** — A multi-year community effort grew the first open Pashto speech corpus from 1.5 hours to 147 hours across 1,483 speakers, and fine-tuning Whisper on it slashes WER from 99% to 13.4%.

## Problem

Pashto has over 60 million native speakers but is largely absent from open speech technology, with no large-scale, openly licensed speech resource existing before this work.

## Method

The authors describe building the Pashto Common Voice corpus over a community effort spanning 2022-2025 through Mozilla Common Voice, covering interface localization, Wikipedia-based sentence extraction with automated filtering, phonemically targeted contributions for frequently dropped Pashto characters, and multi-channel community outreach (including a VOA Pashto broadcast campaign).

## Results

The corpus grew from 1.5 hours/5 contributors to 147 total hours and 1,483 unique speakers across ten releases (CV14-CV23), with speaker participation jumping ~108x after the VOA campaign; MCV23 contains 107,781 clips (82.33 validated hours); fine-tuning Whisper Base on MCV20 yields 13.4% WER versus the published Whisper Base zero-shot WER of 99.0% on Pashto.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Foundation dataset for building Pashto ASR, TTS, and other speech technology, and a case study for community-driven low-resource corpus building.

## Related

- (link related pages by id as the wiki grows)
