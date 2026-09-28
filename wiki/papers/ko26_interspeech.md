---
id: ko26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-891
---

# Mispronunciation Modeling via PPG-Based Phone Editing: A Data Augmentation Framework for Dysarthric Speech Recognition

**TL;DR** — Editing phonetic posteriorgrams of typical speech to emulate a specific dysarthric speaker's mispronunciation patterns, combined with style conversion and speed perturbation, produces effective data augmentation that improves ASR robustness on dysarthric speech.

## Problem

ASR systems struggle to recognize dysarthric speech due to severe acoustic variability, frequent mispronunciations, and extreme data scarcity for this population.

## Method

The authors propose a speaker-dependent data augmentation framework that quantifies individual pronunciation variations and selectively edits phonetic posteriorgram (PPG) representations of typical speech to emulate a target dysarthric speaker's mispronunciation patterns, integrated with speaking-style conversion and phonetic-level speed perturbation.

## Results

Fine-tuning a HuBERT ASR model with this augmentation on the UASpeech corpus enhances recognition robustness, achieving an overall word error rate of 19.53%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for building more accurate, personalized ASR for people with dysarthria (e.g. from cerebral palsy or stroke) where labeled training data is scarce.

## Related

- (link related pages by id as the wiki grows)
