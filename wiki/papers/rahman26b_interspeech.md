---
id: rahman26b_interspeech
category: deepfake-security
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.pdf
---

# Voice Privacy from an Attribute-based Perspective

*Mehtab Ur Rahman, Martha Larson, Cristian Tejedor-Garcia*

[PDF](https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.html)

**Category:** `deepfake-security`

**TL;DR** — This paper introduces an attribute-based perspective to voice privacy by evaluating speaker uniqueness and re-identification risks using categorical profiles (gender, age, accent, profession). It demonstrates that imperfect attribute inference on original and anonymized speech does not consistently improve privacy, as correlated classification errors can actually reduce anonymity set sizes and compromise re-identification resistance.

## Key contributions

- Analyzes the privacy risk of speaker attribute profiles at both speaker and utterance levels, assessing speaker uniqueness ($k$) against ground truth and inferred profiles.
- Performs a re-identification attack matching single-utterance target profiles (original and anonymized) to multi-utterance reference profiles using exact categorical matching.
- Releases an extended annotation set for four speaker attributes (gender, age, accent, profession) built on top of the VoxCeleb2 dataset.
- Evaluates the impact of four Voice Privacy Challenge 2024 anonymization systems on attribute-based privacy vulnerability.

## Problem

Current voice privacy benchmarks rely exclusively on signal-based comparisons, such as Equal Error Rates in speaker verification, which overlook categorical speaker attributes like age, gender, accent, and profession. Drawing from statistical disclosure control and GDPR regulations, the authors highlight that categorical microdata can uniquely identify individuals through 'singling out' even when data is noisy or anonymized. Prior approaches fail to measure whether voice anonymization actually obscures sensitive attribute profiles that attackers can exploit.

## Method

The authors construct speaker attribute profiles using four categorical attributes: gender (2 levels), age (3 levels), accent (29 levels), and profession (6 levels). Audio utterances are processed by a pretrained ECAPA-TDNN model to extract 192-dimensional embeddings, which are L2-normalized across utterances to stabilize scale variation. Lightweight multi-layer perceptrons (MLPs) are trained independently on these embeddings: gender uses a single hidden layer with ReLU activation, while age, accent, and profession use two hidden layers with LeakyReLU activations and cross-entropy objectives.

At inference, posterior probabilities are computed independently per utterance, and speaker-level profiles are obtained by averaging post-eriors across multiple utterances before taking the argmax. The threat model assumes an attacker with one target utterance and multiple labeled reference utterances. Anonymized test speech is evaluated using four VPC 2024 baselines: McAdams (B2), STTTS (B3), NAC (B4), and ASRBN (B5). Attack success is measured via exact profile matching without threshold tuning, using random selection among ties.

## Experimental setup

Experiments use the VoxCeleb2 dataset, utilizing the Dev set (5,994 speakers, 1,092,009 utterances) for training attribute classifiers and the Test set (118 speakers, 36,237 utterances) for evaluation. MultiEval contains 72 speakers with a mean of 341.5 utterances/speaker (24,588 total), while SingleEval contains 72 speakers resampled 10 times with 1 utterance/speaker. Baselines include ground truth attributes and four VPC 2024 anonymization systems (McAdams, STTTS, NAC, ASRBN). Evaluation metrics include uniqueness percentage ($k=1$), thresholds ($k<3, k<5, k<10$), median $k$, classification accuracy/F1, and attack error rate.

## Results

On the MultiEval dataset, speaker uniqueness ($k=1$) drops from 38.9% with ground truth attributes to 31.9% with inferred attributes, while median $k$ increases from 2 to 3. However, the proportion of speakers with acceptable privacy ($k<5$) worsens under inference, dropping from 65.3% (ground truth) to 68.1% (inferred), meaning fewer speakers enjoy large anonymity sets. Furthermore, attribute inference makes the privacy situation worse for 20.4% of speakers at the $k<10$ level and improves it for none.

In the re-identification attack using original target speech, the error rate is 0.72 with ground truth reference profiles and drops to 0.67 when reference profiles are inferred from original speech due to correlated errors. When target speech is anonymized, attack error rates vary widely: STTTS yields 0.62 (ground truth ref) and 0.82 (inferred ref), while ASRBN yields 0.58 and 0.82 respectively, demonstrating that low attribute classification accuracy on anonymized data does not reliably translate to high re-identification protection.

| System / Condition | Unique ($k=1$) % | Median $k$ | Attack Error Rate | Accuracy (Gender/Age/Accent/Prof) |
|---|---|---|---|---|
| Ground Truth (MultiEval) | 38.9% | 2 | - | 1.00 / 1.00 / 1.00 / 1.00 |
| Inferred Original (MultiEval) | 31.9% | 3 | - | 0.99 / 0.83 / 0.75 / 0.60 |
| Original Target vs Inferred Ref | - | - | 0.67 | - |
| McAdams Target vs Inferred Ref | - | - | 0.78 | 0.80 / 0.56 / 0.52 / 0.57 |
| STTTS Target vs Inferred Ref | - | - | 0.82 | 0.47 / 0.31 / 0.38 / 0.26 |
| ASRBN Target vs Inferred Ref | - | - | 0.82 | 0.53 / 0.36 / 0.49 / 0.39 |

## Limitations

The study is restricted to 72 speakers from VoxCeleb2 with fully annotated attributes, limiting demographic diversity and scale. The attacker model assumes fixed categorical profiles and exact matching without considering partial matches or probabilistic confidence scores. Additionally, attribute classifiers were trained solely on unprotected speech rather than adapting to anonymized feature distributions.

## Why read this

Speech and ML researchers working on voice privacy and anonymization should read this to understand why conventional signal-based metrics are insufficient for preventing attribute-based re-identification. It offers a clear methodology for auditing speech datasets using categorical profiles and highlights the hidden risks of correlated classifier errors.

## Code

- https://github.com/Mehtab9/Voice-Privacy-from-an-Attribute-based-Perspective

## Applications

Auditing voice anonymization systems for attribute leakage, developing privacy-preserving speech transformations, and evaluating regulatory compliance under GDPR singling-out provisions.

## Institutions / 機構

Radboud University

**Funding / 經費:** Dutch Research Council, NGF AiNed Fellowship Grants

## Related

- (link related pages by id as the wiki grows)
