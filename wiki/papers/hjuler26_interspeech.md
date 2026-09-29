---
id: hjuler26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-894
pdf: https://www.isca-archive.org/interspeech_2026/hjuler26_interspeech.pdf
---

# Listenability of Synthetic Speech: On the Effect of Linguistic Registers in Text-to-Speech Input

*Maja Jønck Hjuler, Tuyet Katie Nhi Tran, Laurianne Sitbon*

[PDF](https://www.isca-archive.org/interspeech_2026/hjuler26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hjuler26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-894)

**Category:** `tts`

**TL;DR** — This study evaluates how different linguistic registers in Text-to-Speech (TTS) input—ranging from conversational talkback radio transcripts to LLM-generated text and formal Wikipedia articles—affect listener effort and comprehension. The findings demonstrate that synthesized conversational transcripts impose over twice the mental effort and yield lower recall compared to written and LLM sources, while LLM-generated text performs as listenable as Wikipedia sources.

## Key contributions

- Conducted a within-subjects human evaluation (47 participants) measuring listening effort (NASA-TLX, AIME) and cued recall across four distinct linguistic registers used as TTS input.
- Combined standard readability metrics (FRE, FKGL, sentence length, dependency depth) with Biber's Multi-Dimensional Analysis (MDA) to quantitatively characterize the linguistic properties of TTS input sources.
- Demonstrated that synthesized speech derived from transcribed conversational radio imposes significantly higher cognitive load (M = 62.9 AIME) than written and GPT sources (M = 25-29), despite resembling natural spoken interaction.
- Established that LLM-generated text (GPT-4o-mini) is statistically indistinguishable from Wikipedia-sourced text in terms of listener effort and comprehension, validating its suitability for modern TTS pipelines.

## Problem

Most conversational TTS pipelines and text generators assume that LLM output or conversational text is inherently suitable for speech synthesis, yet the impact of linguistic registers on the actual listening experience remains largely unexplored. Prior work predominantly evaluates surface-level acoustic quality (MOS, Word Error Rate) or treats text optimization purely through readability metrics designed for reading rather than listening. This matters because spoken language imposes different cognitive processing demands than written text, and failing to optimize TTS input text leads to unquantified listening friction and reduced user comprehension in real-world conversational agents.

## Method

The study utilized a within-subjects experimental design where 47 participants listened to 16 audio samples covering four topics (University, Hubble Ultra-Deep Field, Mandarin Trees, Cramp). The four stimulus types were Australian Radio Talkback transcripts (ART), Wikipedia Simple English (WSiE), Wikipedia Standard English (WStE), and GPT-4o-mini generated text (GPT). Stimuli were synthesized using Google's free-tier TTS API with an Australian English voice setting and default male/female accents matching speaker roles. Text properties were evaluated using sentence length, word count, Flesch Reading Ease (FRE), Flesch-Kincaid Grade Level (FKGL), SpaCy dependency parser depth (DD), and Biber's Multi-Dimensional Analysis Tagger (MAT) across six functional dimensions. Subjective mental effort and cognitive load were captured using a 5-item NASA-TLX questionnaire and a 3-item Amount of Invested Mental Effort (AIME) questionnaire on a 1-100 continuous slider. Comprehension was tested via word-level cued multiple-choice recall questions regarding the theme and content of each sample. A one-way repeated-measures ANOVA with Greenhouse-Geisser correction and Bonferroni-corrected post-hoc pairwise comparisons (α = 0.05) evaluated the statistical significance across conditions.

## Experimental setup

The experiment evaluated 47 participants aged 18-50 (Mean = 24.7, SD = 5.9; 55.3% female, 63.8% native English speakers) recruited via social media and university posters. Stimuli comprised 16 total audio samples (4 sources × 4 topics). Measures included AIME, NASA-TLX, and cued recall scores evaluated via a Qualtrics online survey. Statistical analysis used a one-way repeated-measures ANOVA to determine the effect of stimulus type.

## Results

ART stimuli required significantly higher mental effort (AIME: M = 62.9, SD = 25.3) and cognitive load (NASA-TLX: M = 46.8, SD = 24.0) compared to all written sources (p < 0.001), requiring more than double the listening effort. Conversely, GPT required the least effort (AIME: M = 25.2, SD = 17.2; TLX: M = 14.8, SD = 14.3), closely clustered with WSiE (AIME: 28.9, TLX: 16.7) and WStE (AIME: 28.7, TLX: 17.8), with no significant differences among the three written/LLM sources. For cued recall, WStE achieved the highest performance (M = 94.3%, SD = 12.7), significantly outperforming ART (M = 78.7%, SD = 30.7, p = 0.019), while GPT (88.7%) and WSiE (82.3%) showed intermediate recall levels. WStE uniquely provided superior retention while imposing low cognitive load similar to simpler texts.

| Stimulus Type | AIME (Effort) ↓ | NASA-TLX (Load) ↓ | Cued Recall (%) ↑ |
|---|---|---|---|
| ART (Talkback Radio) | 62.9 | 46.8 | 78.7 |
| WSiE (Simple Wiki) | 28.9 | 16.7 | 82.3 |
| GPT (LLM-Generated) | 25.2 | 14.8 | 88.7 |
| WStE (Standard Wiki) | 28.7 | 17.8 | 94.3 |

## Limitations

The study relies on a relatively small stimulus set of 16 samples across 4 topics, an uncontrolled online listening environment, a single TTS voice provider, and a lack of controls for prior listener topic knowledge. Furthermore, the one-way repeated-measures ANOVA design does not isolate topic-specific difficulty from register effects, and the semantic content differs across sources rather than keeping text meaning constant while varying register. Future work is needed to expand language coverage beyond English and test multiple commercial and open-source TTS synthesis engines.

## Why read this

Speech and ML engineers building conversational agents or text-to-speech pipelines should read this paper to understand that feeding conversational or raw spoken-style text into a TTS engine creates severe listening fatigue, whereas LLM-generated and formal written texts offer drastically better listenability.

## Code

- https://github.com/MajaHjuler/TTS_Listenability

## Applications

Optimizing text-generation pipelines for conversational virtual assistants, audiobook narration generators, and assistive text-to-speech technologies.

## Institutions / 機構

Queensland University of Technology, University Grenoble Alpes, CNRS, Grenoble INP

**Funding / 經費:** Australian Research Council, European Union, Marie Skłodowska-Curie

## Related

- (link related pages by id as the wiki grows)
