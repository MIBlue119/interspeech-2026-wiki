---
id: lee26l_interspeech
category: phonetics-linguistics
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1574
pdf: https://www.isca-archive.org/interspeech_2026/lee26l_interspeech.pdf
---

# How Speaker Normalization Procedures Influence the Computational Modelling of Non-native Vowel Perception: Implications for the L2LP model

*Jooyoung Lee, Kakeru Yazawa, James Whang, Paola Escudero*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1574)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study investigates how different speaker normalization methods affect the computational modelling of non-native vowel perception, finding that Lobanov normalization achieves the highest fit to human listener data. This is interpreted through the L2LP framework as evidence that naive listeners transfer their L1 normalization strategy.

## Key contributions

- Evaluated six acoustic vowel normalization procedures (raw Hz, gender-wise Z-score, Lobanov, Nearey 1, Nearey 2, Gerstman) in a cross-linguistic classification setup.
- Trained multi-layer perceptrons on Mexican Spanish L1 vowels (DIMEx100) and tested them on American English L2 vowels (TIMIT) to simulate naive L1 Spanish listeners.
- Demonstrated that Lobanov normalization yields the closest match to human perception data, outperforming methods designed to preserve between-group variance.
- Proposed a novel extension of the L2LP Full Copying hypothesis, arguing that L1 normalization behavior is copied alongside L1 phonological categories in initial-state L2 perception.

## Problem

Computational neural models of vowel perception are sensitive to the relative scale of acoustic features like formants, making speaker normalization necessary. While normalization methods have been extensively compared within single languages, their impact on cross-linguistic perception tasks—where preserving meaningful acoustic differences between L1 and L2 inventories is critical—remains largely unexplored. Prior work suggests that formant-extrinsic methods like Nearey preserve between-group variance better than Lobanov, which risks overnormalization, but how these choices interact with listener profiles and the Second Language Linguistic Perception (L2LP) model is unaddressed.

## Method

The authors trained multi-layer perceptrons (MLPs) featuring two input neurons (F1 and F2), two hidden layers of 128 neurons each, and five output neurons corresponding to Spanish vowel categories (/i, e, a, o, u/). Training utilized the DIMEx100 Spanish corpus with early stopping triggered if classification accuracy failed to improve for 20 consecutive epochs. The models processed 123,884 training tokens and 14,091 test tokens from L1 Spanish speakers (44 male, 46 female in train; 5 male, 5 female in test).

To simulate naive L1 Spanish listeners encountering American English, 10,825 tokens from the TIMIT test set (nine monophthongs: /i, I, E, æ, A, 2, O, U, u/) were fed into the models. Normalization parameters derived entirely from Spanish speech were applied to the English vowel data under six conditions: raw Hz, gender-wise Z-score, Lobanov (per-speaker mean and standard deviation), Nearey 1 (per-formant individual log-mean), Nearey 2 (grand log-mean across formants), and Gerstman (range scaling). Model categorization proportions were arranged into 5x9 matrices and evaluated against human behavioral data.

Lobanov normalization outperformed other methods by collapsing cross-linguistic acoustic variation, which counterintuitively serves as an effective mechanism for simulating a naive listener who maps all foreign vowel inputs directly into their native L1 categories.

## Experimental setup

Datasets included the DIMEx100 corpus for Mexican Spanish and the TIMIT corpus for American English. Models were evaluated against human perception data from Escudero and Chládková (2011) using Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), Pearson's correlation coefficient (r), and top-1 category matches out of nine English vowels.

## Results

Lobanov normalization achieved the strongest performance across all metrics, registering an MAE of 13.93, an RMSE of 23.30, a Pearson correlation of r = 0.75, and 7 out of 9 top-1 category matches with human data. The next best methods were gender-wise Z-score and Nearey 1, both achieving 6 category matches with higher errors (MAE 20.02 and 19.47, respectively) and lower correlations (0.46 and 0.48). Raw Hz and Nearey 2 performed moderately (4 and 5 matches), while Gerstman performed the worst with an MAE of 25.60, RMSE of 39.56, r of 0.16, and only 3 matches.

While methods like Nearey were expected to win due to better preservation of cross-group variance, Lobanov won because its strong speaker-level compression successfully mirrors the unexpanded perceptual space of a listener with no target-language exposure. However, all models failed to perfectly capture every fine-grained category split, highlighting limits in utilizing F1-F2 formants alone.

| Method | MAE | RMSE | r | Matches (/9) |
|---|---|---|---|---|
| Raw Hz | 21.07 | 34.42 | 0.39 | 4 |
| Gender-wise Z | 20.02 | 32.72 | 0.46 | 6 |
| Lobanov | 13.93 | 23.30 | 0.75 | 7 |
| Nearey 1 | 19.47 | 32.49 | 0.48 | 6 |
| Nearey 2 | 19.76 | 33.46 | 0.42 | 5 |
| Gerstman | 25.60 | 39.56 | 0.16 | 3 |

## Limitations

The study is limited by using only F1 and F2 formant values, omitting higher formants like F3 and duration cues that could influence perception. The MLP architecture used was intentionally basic, meaning more complex neural architectures might interact differently with normalization strategies. The evaluation is currently restricted to a single initial-state listener profile (naive L1 Spanish / L2 English) without testing intermediate or advanced L2 learner proficiency levels.

## Why read this

Speech researchers and ML engineers modelling cross-linguistic speech perception will learn why standard acoustic normalization heuristics break down or excel when applied across languages, providing a principled link between neural classification metrics and psycholinguistic frameworks like L2LP.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-linguistic speech perception modelling, second-language acquisition computer-assisted pronunciation training (CAPT) systems, and multilingual speech recognition front-end design.

## Institutions / 機構

Western Sydney University, University of Tsukuba, Seoul National University

## Related

- (link related pages by id as the wiki grows)
