---
id: hjuler26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-894
pdf: https://www.isca-archive.org/interspeech_2026/hjuler26_interspeech.pdf
---

# Listenability of Synthetic Speech: On the Effect of Linguistic Registers in Text-to-Speech Input

[PDF](https://www.isca-archive.org/interspeech_2026/hjuler26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hjuler26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-894)

**TL;DR** — This study evaluates how different linguistic input registers affect synthetic speech listenability, finding that LLM-generated text performs as well as Wikipedia text and significantly outperforms radio transcripts in listener comprehension and mental effort.

## Problem

While text-to-speech (TTS) systems increasingly ingest LLM-generated content, little is known about how linguistic registers impact the listener's mental effort and comprehension. Traditional metrics evaluate surface-level acoustic quality via MOS or intelligibility rather than processing ease, leaving a critical gap in understanding how text properties influence the spoken user experience.

## Method

The authors conducted an online user experiment with 47 participants using a within-subjects design across 16 audio stimuli covering four topics. Stimuli were synthesized using Google's free-tier TTS API with an Australian accent across four text registers: Australian Radio Talkback (ART) corpus, Simple English Wikipedia (WSiE), standard formal written Wikipedia (WStE), and OpenAI's GPT-4o-mini API (GPT). Subjective cognitive load and mental effort were measured using a 5-item NASA TLX and a 3-item Amount of Invested Mental Effort (AIME) scale, alongside word-level cued recall multiple-choice questions. Texts were further analyzed using readability metrics (Flesch Reading Ease, Flesch-Kincaid Grade Level, dependency depth) and Biber's Multi-Dimensional Analysis (MDA) via the Multidimensional Analysis Tagger (MAT).

## Results

Speech generated from transcribed radio talks (ART) yielded the lowest listenability and was significantly less listenable compared to Wikipedia-sourced and GPT-generated text (p < 0.001). There was no statistically significant difference in listenability between the written sources (WSiE and WStE) and GPT-generated text, supporting the suitability of LLM outputs for TTS input. Readability evaluations showed that WSiE texts had the highest Flesch Reading Ease and lowest grade level (~10th grade), whereas WStE texts were the most complex (~14th grade), and GPT texts fell intermediately.

## Code

- https://github.com/MajaHjuler/TTS_Listenability

## Applications

Engineers and designers building voice assistants, conversational AI agents, and text-to-speech synthesis pipelines can use these insights to select or optimize text input registers that minimize listener cognitive load.

## Limitations

The study relies on a preliminary sample size of 47 participants and a restricted set of four topics evaluated via a specific free-tier TTS voice engine.

## Related

- (link related pages by id as the wiki grows)
