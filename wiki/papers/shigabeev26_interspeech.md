---
id: shigabeev26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-809
pdf: https://www.isca-archive.org/interspeech_2026/shigabeev26_interspeech.pdf
---

# Dialogs: a studio-quality expressive conversational Russian speech corpus for dialog assistants

[PDF](https://www.isca-archive.org/interspeech_2026/shigabeev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shigabeev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-809)

**TL;DR** — The authors introduce Dialogs, a 20.6-hour studio-quality Russian conversational speech corpus annotated with 12 style and emotion categories, and validate it by training an expressive VITS2 text-to-speech model.

## Problem

For the Russian language, there is a severe shortage of studio-quality conversational speech corpora that capture expressive prosody, turn-taking rhythm, and per-utterance emotional variation. Existing open resources are typically limited to single-speaker neutral read speech or unconstrained web-mined data with poor acoustic conditions. This data scarcity prevents the development of natural, highly expressive conversational agents and dialog-oriented text-to-speech systems.

## Method

The corpus comprises 20.6 hours of face-to-face acted dialogs recorded across 3 professional actors in a studio setting using stereo Behringer XM8500 microphones at 44.1 kHz, 16-bit. Text prompts were generated using GPT-3.5 covering diverse conversational scenarios and linguistic phenomena, with actors allowed to improvise. Crowdsourced annotation via Yandex Tasks assigned one of 12 emotion/style labels to each of the 11,796 utterances based on a 3-annotator majority vote. As a proof of concept, a VITS2 text-to-speech model was trained on the dataset using a batch size of 16 on a single NVIDIA RTX 4090 for 615,000 steps.

## Results

Crowd-sourced MOS evaluations on 188 stratified test utterances show that Dialogs matches strong Russian studio baselines (Ruslan and Natasha) in audio quality (4.19 vs 4.23/4.18) and intelligibility (4.14 vs 4.17/4.16), while achieving significantly higher scores in expressiveness (4.11 vs 3.86/3.88) and conversational naturalness (4.08 vs 3.78/3.82). The VITS2 model trained on the corpus yielded an automatic UTMOS score of 3.36 and subjective MOS ratings where expressiveness (2.56) and conversational naturalness (2.59) outperformed intelligibility (2.28), demonstrating successful acquisition of the corpus's prosodic style.

## Code

- https://huggingface.co/datasets/langswap

## Applications

Speech engineers and conversational AI developers building expressive Russian text-to-speech systems, dialog assistants, and emotionally conditioned voice generation models.

## Limitations

The corpus features professional actors speaking from scripted prompts rather than truly spontaneous conversation, overlapping speech, or background noise. Furthermore, the training data is unbalanced across the three speakers, ranging from 4.4 to 9.9 hours per speaker.

## Related

- (link related pages by id as the wiki grows)
