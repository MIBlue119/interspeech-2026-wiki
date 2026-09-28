---
id: tseng26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-793
pdf: https://www.isca-archive.org/interspeech_2026/tseng26_interspeech.pdf
---

# Time-normalized spectrograms reveal segmental differences in English heterographic homophones

*Yu-Hsiang Tseng, Harald Baayen*

[PDF](https://www.isca-archive.org/interspeech_2026/tseng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tseng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-793)

**TL;DR** — This paper investigates whether English heterographic homophones are truly phonetically identical by analyzing 14,000 tokens using time-normalized spectrograms and Discriminative Lexicon Model (DLM) principles. The results reveal systematic segmental differences that are modulated by context-specific semantic distinctness.

## Key contributions

- Introduces time-normalized spectrograms (50 timesteps via dynamic hop length) to isolate segmental differences while eliminating duration artifacts.
- Uses phone logits derived from multi-class linear discriminant analysis (LDA) to track segment-level trajectories and pronunciation variations across time.
- Applies contextualized word embeddings (from 137M parameter GPT-2) to capture token-level semantic differences, demonstrating they predict spectral separability.
- Analyzes 35 English heterographic homophone pairs (14,000 tokens total) from US television news broadcasts.

## Problem

Classical mental lexicon models assume homophones share identical phonological representations because they have different meanings but the same pronunciation. However, empirical and linguistic studies frequently observe systematic phonetic differences (such as duration variations) that contradict the hypothesis of abstract, context-shielded phonological units. Prior work relies on aggregated metrics like word duration or F0 contours, missing finer segmental-level realizations and failing to directly link acoustic features to token-level semantic contexts.

## Method

The authors study form-meaning mappings within the Discriminative Lexicon Model (DLM) framework, avoiding hidden intermediate layers to maintain linguistic interpretability. Audio tokens from the Redhen 2016 dataset are converted to Mel spectrograms using 21 mel-frequency banks and a Hann window with pre-emphasis (coefficient 0.97). To normalize length variations, the hop size is dynamically adjusted so every spectrogram contains exactly 50 timesteps. The resulting spectrograms are flattened into 1,050-dimensional vectors and compressed to 50 dimensions via PCA (retaining 90% variance).

To analyze fine-grained segmental variations, multi-class LDA acoustic models are trained on 3-frame sliding windows of the time-normalized spectrogram to classify phones, yielding phone logits (signed distance to the decision boundary). Generalized Additive Models (GAMs) are then fitted to these phone-logit trajectories with normalized time, word duration, and their interactions as covariates, alongside random effects for audio source and context words. Finally, spectral logits and contextualized embedding (CE) logits are computed using binary LDAs to quantify form-space and meaning-space discriminability, mapping how semantic context influences phonetic realization.

## Experimental setup

Evaluated on 35 English heterographic homophone pairs (70 orthographic word types, 200 tokens each, totaling 14,000 tokens) extracted from the Redhen 2016 dataset of US television news broadcasts. Baselines include 10-fold cross-validation permutation tests (randomized class labels) and baseline GAMs without word-identity smooths evaluated via AIC. Models utilize 10ms window sizes at a 16,000 Hz sampling rate, with contextualized embeddings extracted from GPT-2 (137M parameters) using a 5-word context window.

## Results

Target GAMs incorporating word identity strongly outperformed baseline models across segment trajectories, achieving a mean AIC difference of 54.28 (highest for mail/male with delta AIC of 187.43, and lowest for banned/band with -1.57). For example, in the wait/weight pair, weight exhibited a more articulated w onset and a faster vowel onset for eI compared to wait. In semantic-acoustic correlation analyses, CE logits showed an increasing effect on spectral logits, indicating that greater semantic contrast within a homophone pair leads to more distinct phonetic realizations in the speech space.

| System / Condition | Mean Phone Classification Accuracy | Mean Spectrogram LDA Accuracy | Mean CE LDA Accuracy |
|---|---|---|---|
| Permutation Baseline | 39.01% | 65.00% | - |
| Proposed Linear Model | 81.53% | 75.00% | 99.00% |

## Limitations

The study is restricted to English heterographic homophones and relies on forced aligners and pretrained GPT-2 representations that may introduce upstream representation biases. The dataset is limited to US television news broadcasts, which may not generalize to casual, spontaneous conversational speech or other dialects. Additionally, the approach utilizes linear acoustic models (LDA) and GAMs, which do not capture complex non-linear acoustic interactions as deeply as modern end-to-end neural networks.

## Why read this

Speech researchers and linguists interested in form-meaning mappings and sub-lexical phonetic variability will find this a compelling bridge between cognitive lexicon theories and spectral analysis. Read this to see how time-normalization and phone logits can expose subtle, context-driven phonetic variations without complex non-linear neural black boxes.

## Code

- https://huggingface.co/openai-community/gpt2

## Applications

Analyzing fine-grained phonetic variation for speech technology, phonetic research, and improving mental lexicon computational models.

## Related

- (link related pages by id as the wiki grows)
