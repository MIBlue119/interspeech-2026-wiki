---
id: lee26l_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1574
pdf: https://www.isca-archive.org/interspeech_2026/lee26l_interspeech.pdf
---

# How Speaker Normalization Procedures Influence the Computational Modelling of Non-native Vowel Perception: Implications for the L2LP model

[PDF](https://www.isca-archive.org/interspeech_2026/lee26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1574)

**TL;DR** — This study evaluates how different speaker normalization procedures affect multi-layer perceptron models of non-native vowel perception, finding that Lobanov normalization achieves the highest fidelity to human cross-linguistic categorization data.

## Problem

Computational models of non-native speech perception are sensitive to the absolute scale of input features such as vowel formant frequencies, making speaker normalization essential for balanced learning. However, prior computational work has rarely compared normalization procedures in cross-linguistic contexts where acoustic distances between first and second language inventories carry perceptual significance. This gap prevents researchers from knowing which normalization method best preserves the acoustic-phonetic mappings required to accurately simulate human non-native perception.

## Method

The authors trained multi-layer perceptrons (MLPs) consisting of two input neurons (F1 and F2), two hidden layers of 128 neurons each, and five output neurons to classify Mexican Spanish monophthongs using the DIMEx100 corpus (123,884 training and 14,091 test samples). Six normalization procedures were tested: raw Hz, gender-wise Z-score, Lobanov, Nearey 1, Nearey 2, and Gerstman. To simulate cross-linguistic perception under the Second Language Linguistic Perception (L2LP) model's Full Copying hypothesis, parameters extracted strictly from the Spanish training data were applied to normalize American English vowel tokens from the TIMIT corpus.

## Results

Model predictions were evaluated against human listening data from Peruvian Spanish listeners categorizing American English vowels using Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), Pearson's correlation coefficient (r), and top-1 category matches out of nine. Lobanov normalization achieved the strongest overall fit, registering the lowest MAE (13.93) and RMSE (23.30), the highest correlation (r = 0.75), and the most category matches (7 out of 9), notably being the only method to correctly map English /u/ to Spanish /u/. Nearey 1 and gender-wise Z-score tied for second with 6 matches, whereas Nearey 2 (5 matches), raw Hz (4 matches), and Gerstman (3 matches, MAE 25.60, RMSE 39.56, r = 0.16) performed worse.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists and computational linguists studying second-language acquisition, cross-linguistic speech perception, and cognitive modeling of listener adaptation.

## Related

- (link related pages by id as the wiki grows)
