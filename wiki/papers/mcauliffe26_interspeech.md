---
id: mcauliffe26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2734
pdf: https://www.isca-archive.org/interspeech_2026/mcauliffe26_interspeech.pdf
---

# Montreal Forced Aligner and the state of speech-to-text alignment in 2026

[PDF](https://www.isca-archive.org/interspeech_2026/mcauliffe26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mcauliffe26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2734)

**TL;DR** — The paper introduces Montreal Forced Aligner (MFA) 3.0, achieving state-of-the-art forced alignment with mean boundary errors consistently below 15 ms across multiple languages.

## Problem

MFA has not been systematically evaluated or updated against modern neural aligners and large-scale datasets since its initial 2016 release. Existing forced aligners often struggle with diverse dialects, low-resource languages, spontaneous speech styles, and noisy crowd-sourced audio data. Addressing these bottlenecks is critical for researchers in (socio)phonetics, psycholinguistics, and language documentation who rely on precise temporal alignment.

## Method

MFA 3.0 updates the HMM-GMM architecture by scaling training data up to orders of magnitude using large open-source corpora (e.g., CommonVoice, Multilingual LibriSpeech) and transitioning to harmonized narrow IPA phone sets with WikiPron-sourced dictionaries. It introduces a progressive data-mixing training regime—starting with clean read speech (monophone to SAT stages) and iteratively blending in spontaneous and noisier datasets—alongside explicit pronunciation probability modeling and linear discriminant analysis (LDA) feature transforms. For low-resource scenarios, it incorporates model adaptation, cross-language phone remapping, and grapheme-to-phoneme (G2P) utilities via Phonetisaurus and Pynini. The updated system supports 22 core languages with specific dialect dictionaries and integrates with tools like Pyannote and WhisperX for end-to-end corpus processing pipelines.

## Results

Evaluated across English, Japanese, and Korean benchmark datasets against classic and neural aligners (including MAPS, Charsiu, and BFA), MFA 3.0 achieves state-of-the-art or near-state-of-the-art performance with mean boundary errors consistently below 15 ms. Training data scaling and manual alignment correction for noisy corpora significantly enhance robustness on conversational and variable acoustic styles. Adaptations and cross-language phone remappings successfully generalize performance to out-of-distribution languages, while pronunciation probability modeling and phonological rules yield targeted improvements.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech researchers, phoneticians, and psycholinguists use MFA 3.0 for precise automatic temporal alignment of words and phonemes, corpus creation, dialect variation studies, and automated phonetic analysis pipelines.

## Limitations

Despite manual cleaning and data-mixing strategies, massive training scales retain some persistent transcription and audio quality errors from source crowd-sourced datasets.

## Related

- (link related pages by id as the wiki grows)
