---
id: mori26_interspeech
category: speech-synthesis
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2141
pdf: https://www.isca-archive.org/interspeech_2026/mori26_interspeech.pdf
---

# Evaluating Automatic Laughter Phone Annotation for Socially-Situated Laughter Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/mori26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mori26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2141)

**TL;DR** — This study evaluates automatic laughter phone annotation for conversational laughter synthesis, showing that an audio-LLM approach yields higher naturalness while a statistical parametric model achieves better reproduction of specific laughter forms.

## Problem

Generating socially situated laughter with conversational agents requires modeling diverse forms of laughter, which depends heavily on precise phonetic phone-level annotations. However, manual laughter annotation involves an immense workload and specialized expertise, limiting training to small corpora. This study examines whether automatic laughter phone recognition can adequately replace manual labels for building robust laughter synthesizers.

## Method

The authors built an improved speaker-independent laughter phone recognizer using a newly developed eleven-speaker laughter dataset (combining the AGSC and OGVC gaming chat corpora) and XLSR-53 large wav2vec 2.0 as a base model. They evaluated two types of laughter synthesizers under manual, automatic, and unlabelled conditions: a statistical parametric speech synthesis (SPSS) model utilizing a three-layer bidirectional LSTM with 128 hidden units, and Fish-Speech, a multilingual audio-LLM framework employing a fast-slow autoregressive architecture. For SPSS, input features included 39 CV classes, auxiliary phonetic variants, phone position, and laughter length, while Fish-Speech was prompted using speaker audio samples and text inputs.

## Results

The phone recognizer achieved a phone boundary error of 23.0 ms and a substitution error of 30% on unseen speakers, outperforming previous baselines. Listening tests showed that the Fish-Speech audio-LLM synthesizer achieved higher naturalness than SPSS, but SPSS significantly outperformed Fish-Speech in reproducing the specific way of laughing (average similarity mean opinion score of 3.94 for SPSS vs. 2.58 for Fish-Speech). Systems built using automatic phone labels did not fully match the performance of those built using manual labels, indicating that annotation accuracy remains important for detailed acoustic control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers developing conversational agents, social robots, and interactive voice assistants seeking to synthesize expressive, socially-situated laughter.

## Limitations

Automatic labels currently underperform manual labels, and neither tested architecture simultaneously achieves top-tier naturalness and precise structural reproducibility of laughter.

## Related

- (link related pages by id as the wiki grows)
