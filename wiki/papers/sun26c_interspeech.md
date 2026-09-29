---
id: sun26c_interspeech
category: phonetics-linguistics
institutions: ["Tongji University", "University of Tubingen"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1062
pdf: https://www.isca-archive.org/interspeech_2026/sun26c_interspeech.pdf
---

# Non-linear Effects of Semantic Relevance on Word Duration in Spontaneous Speech

*Kun Sun, Rong Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1062)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates how semantic relevance—the contextual semantic fit between a target word and its 3-word local context—predicts word duration in spontaneous conversational speech, discovering a U-shaped non-linear effect and frequency-dependent modulation. Using generalized additive mixed models (GAMMs) on the Buckeye Corpus (262,342 tokens), the study shows that moderate semantic relevance facilitates articulation (shorter duration), while high relevance lengthens duration, particularly for low-frequency words.

## Key contributions

- Evaluated vector-based semantic relevance as a production-side predictor of word duration, moving beyond surface n-gram transition probabilities.
- Demonstrated a U-shaped non-linear effect of semantic relevance on speech timing using Generalized Additive Mixed Models (GAMMs).
- Showed a production-comprehension asymmetry, contrasting with the monotonic facilitation of semantic relevance found in reading comprehension studies.
- Revealed frequency-dependent moderation where semantic relevance strongly predicts duration for low-frequency words but has no effect on high-frequency words.

## Problem

Traditional models of word duration in speech production rely heavily on surface-level predictability measures such as lexical frequency and n-gram transitional probabilities. These shallow metrics capture form-based repetition but fail to encode deeper conceptual relationships and semantic coherence between a word and its discourse context. Furthermore, prior work typically assumes linear relationships, missing the complex interplay between semantic overlap (facilitating lexical access) and lexical competition/neighborhood density (which can inhibit production and lengthen duration).

## Method

The authors compute semantic relevance using 300-dimensional static fastText word embeddings (pretrained on Common Crawl) over a 3-word local preceding context window. To account for human working memory decay, cosine similarities between the target word and preceding context words are weighted using a recency-decay scheme: $w_{t-1} = 0.9$, $w_{t-2} = 0.6$, and $w_{t-3} = 0.3$. 

To analyze speech timing without assuming linearity, Generalized Additive Mixed Models (GAMMs) are fitted using the bam() function from the mgcv package in R. The primary model (M1) incorporates smooth terms for word length, log frequency, semantic relevance, phrase rate, phonological deletions, and a speaker-level random-effect smooth. Syllable count was excluded due to collinearity with word length. Model comparisons were conducted using AIC across five specifications to test the necessity of semantic relevance and tensor-product interactions.

Inference relies on evaluating the effective degrees of freedom (EDF), partial smooth effect curves, and F-statistics from frequency-stratified subset analyses. The key design choice of using static distributional embeddings rather than contextualized neural language models was made to intentionally isolate local semantic fit from probabilistic neural prediction.

## Experimental setup

The dataset used is the Buckeye Corpus of Conversational Speech, consisting of spontaneous American English sociolinguistic interviews from 40 speakers. After filtering out disfluencies, incomplete words, and utterance-initial words with fewer than three preceding context words, the final dataset contains 262,342 word tokens. Models are evaluated using Akaike Information Criterion (AIC) to compare goodness-of-fit across five GAMM specifications, along with F-tests and p-values for smooth terms.

## Results

Model M1 (including semantic relevance alongside controls) achieved the best fit with an AIC of -471,129.9. Removing semantic relevance (M4) resulted in a substantial AIC loss of 23.2. The optimal GAMM revealed a significant non-linear (U-shaped) effect of semantic relevance ($p < 0.001$): low-to-moderate semantic relevance decreased word duration (facilitation), whereas high semantic relevance increased word duration.

In frequency-stratified analyses, semantic relevance strongly predicted duration for low-frequency words ($F = 18.90, p < 0.0001$), but showed no significant effect for high-frequency words ($F = 1.29, p = 0.256$). When lexical frequency was completely removed, the semantic relevance smooth term jumped to $F = 646.35$ ($p < 2 	imes 10^{-16}$), and an exploratory tensor-product interaction confirmed a strong frequency-by-relevance interaction ($F = 3622.26, p < 2 	imes 10^{-16}$).

| Model | Smooth Terms Included | df (EDF) | AIC |
|---|---|---|---|
| M1 | s(WL) + s(LF) + s(SR) + s(PR) + s(Del) + s(Speaker) | 77.28 | -471,129.9 |
| M4 | s(WL) + s(LF) + s(PR) + s(Del) + s(Speaker) | 73.78 | -471,106.7 |
| M2 | te(WL, LF) + s(SR) + s(PR) + s(Del) + s(Speaker) | 83.02 | -471,030.3 |
| M3 | te(WL, LF) + s(PR) + s(Del) + s(Speaker) | 79.28 | -471,011.1 |
| M5 | s(WL) + s(PR) + s(Del) + s(Speaker) | 65.05 | -434,753.4 |

## Limitations

The study is restricted to a single corpus (Buckeye Corpus) and language (American English), limiting immediate cross-linguistic generalization despite parallels in multilingual reading literature. The evaluation relies on monologic segments from sociolinguistic interviews rather than truly interactive, multi-party dialogues. Additionally, static fastText embeddings were used rather than deep contextualized representations, leaving open how contextualized language model activations interact with production timing.

## Why read this

Speech scientists and ML researchers modeling human-like prosody, text-to-speech (TTS), or cognitive speech timing should read this paper to understand that semantic context exerts non-linear, frequency-dependent pressures on word duration that standard n-gram or linear models completely miss.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Expressive Text-to-Speech (TTS), cognitive speech timing simulation, and computational psycholinguistics modeling.

## Institutions / 機構

Tongji University, University of Tubingen

## Related

- (link related pages by id as the wiki grows)
