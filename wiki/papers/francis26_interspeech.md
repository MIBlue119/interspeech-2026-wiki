---
id: francis26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-709
pdf: https://www.isca-archive.org/interspeech_2026/francis26_interspeech.pdf
---

# No-Shot Text-to-Speech: Limitations of Zero-Shot TTS and its Evaluation Methods in Representing Queer and Transgender Voices

[PDF](https://www.isca-archive.org/interspeech_2026/francis26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/francis26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-709)

**TL;DR** — Evaluating six zero-shot TTS models on gender-expansive voices reveals performance disparities and inconsistencies in automated evaluation metrics compared to human perception.

## Problem

Current text-to-speech evaluation pipelines predominantly rely on datasets and automated metrics that underrepresent transgender and queer voices, leading to unmeasured biases and performance discrepancies. Because voice technology frequently inherits and amplifies societal norms, failing to account for gender-expansive speakers risks erasing their identities and compromising system reliability. Understanding these gaps is essential for developing equitable speech technologies that serve marginalized communities effectively.

## Method

The study evaluates six zero-shot TTS models—CosyVoice2, E2TTS, F5TTS, XTTS, Zonos, and LinaSpeech—spanning various sizes, architectures, and training set diversities. Performance is tested on two distinct datasets: the Globe Dataset for non-gender-expansive (N-GE) voices and the Mid-Atlantic Gender Expansive Speech (MAGES) dataset for self-identified gender-expansive (GE) voices. Reference audio samples of approximately 10 seconds are constructed by concatenating speaker clips to synthesize 15 Harvard sentences per speaker. Evaluation combines a MUSHRA-like human listening test with 16 participants rating similarity (0-100), alongside automated metrics including speaker similarity via ECAPA-TDNN, TitaNet-L, and ReDimNet-M embeddings, automated MOS predictors (UTMOS and a fine-tuned wav2vec2), and Word Error Rate using Whisper.

## Results

Human listening tests showed significant performance divergences: E2TTS, F5TTS, and CosyVoice2 achieved higher similarity scores for GE voices, whereas XTTS and LinaSpeech performed significantly worse on GE voices (with effect sizes up to d=0.704 for LinaSpeech). Automated speaker similarity and AMOS metrics yielded conflicting results that frequently disagreed with human ratings and each other; for instance, Zonos showed completely contradictory trends across different embedding extractors (ECAPA-TDNN favored GE, TitaNet-L favored N-GE, and ReDimNet-M showed no difference). Word error rate was significantly higher for GE outputs only in LinaSpeech (14.1% vs 7.2%). Intraclass correlation coefficients indicated that automated evaluation agreement was generally higher for GE voices than N-GE voices, though baseline model divergences highlight a major blind spot in current testing pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building zero-shot TTS models, voice cloning tools, or automated speech evaluation pipelines can use these insights to audit demographic bias and improve algorithmic fairness.

## Limitations

The evaluation is constrained to a small sample size of 14 MAGES speakers and 14 GLOBE speakers due to the limited public availability of explicitly gender-expansive speech datasets.

## Related

- (link related pages by id as the wiki grows)
