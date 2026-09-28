---
id: nath26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3034
pdf: https://www.isca-archive.org/interspeech_2026/nath26_interspeech.pdf
---

# An Acoustic Investigation of Mid Front Vowel Harmony in Assamese

[PDF](https://www.isca-archive.org/interspeech_2026/nath26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nath26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3034)

**TL;DR** — This study acoustically analyzes mid front vowel raising (harmony) in Assamese across three major dialect regions, revealing consistent raising in harmonic contexts with specific regional and stylistic interactions.

## Problem

Prior descriptions of Assamese vowel harmony offered conflicting qualitative claims and mixed articulatory findings regarding whether mid vowels consistently raise before close vowels. Systematic acoustic evidence across different regional dialects and speech styles has remained sparse, leaving the phonetic reality of the phonological rule unclear. Resolving this discrepancy is crucial for understanding how phonological abstraction interacts with phonetic realization in underdocumented Indo-Aryan languages.

## Method

The authors analyze 371 vowel tokens extracted from both wordlist tasks and 30-minute connected speech recordings gathered from 18 native adult speakers across three major dialect regions in Assam (Sorbhog, Bihaguri, and Gogamukh). Forced alignment was performed using a customized Montreal Forced Aligner model, followed by manual correction and formant extraction via Fast Track at five temporal points, focusing on the midpoint (50%). Formants were normalized using the Nearey1 log-mean method and scaled back to Hz. Linear mixed-effects models were fitted using lme4 to evaluate F1 (vowel height) and F2 (backness) against predictors including harmonic context (/CECi/ vs /CECa/), vowel duration, speech style, dialect region, and speaker gender, incorporating random intercepts for speakers and words.

## Results

Harmonic contexts (/CECi/) show consistently lower F1 means and higher F2 means than non-harmonic contexts (/CECa/), demonstrating a higher and more fronted vowel quality when followed by a close vowel. Linear mixed-effects modeling revealed a significant three-way interaction between harmonic environment, speech style, and dialect region for F1 (indicating complex structural conditioning in vowel height), whereas F2 exhibited only significant two-way interactions without a higher-order term. Wordlist tokens generally exhibited lower F1 and higher F2 values compared to connected speech, reflecting more peripheral articulation in careful speech conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, linguists, and speech engineers building speech technology resources for low-resource Indo-Aryan languages can use these phonetic insights to improve pronunciation dictionaries, acoustic modeling, and dialect-robust automatic speech recognition.

## Limitations

The dataset is restricted to 371 tokens across 18 speakers from three specific semi-urban locations, limiting generalizability to the entire sociolinguistic spectrum of Assamese.

## Related

- (link related pages by id as the wiki grows)
