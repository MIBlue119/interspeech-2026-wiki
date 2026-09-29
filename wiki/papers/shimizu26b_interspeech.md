---
id: shimizu26b_interspeech
category: phonetics-linguistics
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-250
pdf: https://www.isca-archive.org/interspeech_2026/shimizu26b_interspeech.pdf
---

# Auditory Contrast Network for Text-Free Prominence Detection

*Kosuke Shimizu, Keiichi Zempo*

[PDF](https://www.isca-archive.org/interspeech_2026/shimizu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shimizu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-250)

**Category:** `phonetics-linguistics` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — The Auditory Contrast Network (ACN) uses just 238 parameters and three acoustic features to match a 94.6M-parameter wav2vec2 baseline on word-level prominence detection at 120× lower latency. By encoding psychoacoustic principles like pairwise contrast and forward dominance, ACN achieves r = 0.412 acoustically and r = 0.451 with text features on cross-corpus transfer.

## Key contributions

- Introduces the Auditory Contrast Network (ACN), a transparent prominence detector with only 238 trainable parameters.
- Encodes three fundamental psychoacoustic principles directly into architecture: nonlinear pairwise contrast, directional asymmetry (forward dominance), and per-cue independence before aggregation.
- Achieves cross-corpus Pearson r of 0.412 without text, matching a frozen 94.6M-parameter wav2vec2 baseline while offering a 120× speedup (1.6 ms vs 194 ms per word).
- Reveals interpretable architectural properties: learned weights confirm strict local context (±1 word), over 96% forward attention bias, and a cue hierarchy of duration > energy > spectral >> F0.

## Problem

Automatic detection of word-level perceived prominence ratings is typically approached using generic high-capacity models like mel-spectrogram CNNs or self-supervised learning (SSL) models such as wav2vec2, which process words without explicit relational or contrastive mechanisms. These heavy models offer no internal insight into the computations driving predictions and are computationally too expensive for real-time, on-device applications. Furthermore, existing models fail to systematically integrate well-established psychoacoustic principles—such as the Weber-Fechner nonlinear contrast law, stimulus-specific adaptation (forward dominance), and functional separation of cues. Addressing this gap matters for building interpretable, ultra-low-latency prosody models suitable for hearing aids, pronunciation monitoring, and lightweight TTS systems where text is unavailable.

## Method

ACN takes word-level acoustic features a_i in R^C and optional text features t_i in R^T, processing them via two stages: per-cue contrast and multi-cue aggregation. For each of the C acoustic cues, a two-layer multi-layer perceptron (MLP fc with input 2, hidden 8, output 1, and ReLU activation) computes a nonlinear contrast score between the target word and an adjacent word (preceding or following), masked at utterance boundaries. Rather than taking simple differences, the MLP takes raw cue values to learn nonlinear scaling and thresholding effects predicted by the Weber-Fechner law. These directional scores are combined using learned softmax attention weights initialized to zero, providing a direct readout of directional bias.

The aggregation stage concatenates the C per-cue contrast scores, C raw target cue values, and T text features into a single vector passed through a second MLP g (input 2C+T, hidden 12, output 1, ReLU). The architecture uses three acoustic cues (C = 3): log word duration, mean MFCC0 (proxy for log energy), and standard deviation of MFCC2 within the word (proxy for spectral balance). Optional text features (T = 3) comprise unigram surprisal, bigram surprisal, and a blended term (0.7s1 + 0.3s2) derived from training set n-gram count tables.

The entire model contains 238 trainable parameters with text (202 without text). Training minimizes Mean Squared Error (MSE) on continuous wavelet transform (CWT) prominence labels using the Adam optimizer with a learning rate of 0.003, L2 regularization lambda = 10^-3, and a batch size of 4096. Early stopping uses patience 40 on a held-out speaker split, and 20 random initializations are trained with top-3 averaging to reduce variance.

## Experimental setup

The models are trained on the Helsinki Prosody Corpus (36,802 words from 50 English LibriTTS speakers) and evaluated via cross-corpus transfer on the Emphases corpus (69,714 words from 17 non-overlapping LibriTTS speakers). Evaluation metrics use Pearson correlation (r) against human crowdsourced prominence ratings, with 95% confidence intervals calculated via Fisher-z transforms and paired bootstraps. Baselines include an Absolute-only model, a frozen wav2vec2-base SSL baseline (94.6M parameters), Logistic Regression variants (DurFreq LR and Same-input LR), an Absolute + text MLP, and a Gated Student distillation model.

## Results

On cross-corpus transfer to Emphases, acoustic-only ACN achieves r = 0.412, matching the frozen wav2vec2-base baseline (r = 0.409) without using text input. Adding text features (unigram and bigram surprisal) raises ACN's performance to r = 0.451, slightly outperforming Same-input Logistic Regression (r = 0.444) and performing on par with a 38k-parameter Gated Student model (r = 0.449). Ablations show that removing the contrast mechanism drops acoustic performance by delta = -0.041, while replacing nonlinear ReLU aggregation with linear aggregation drops performance by delta = -0.020.

Negative results demonstrate that expanding contextual window from K=1 to K=3 yields zero improvement (delta = 0.000), and adding coarse F0 summary features as a fourth cue yields a negligible delta of +0.001. ACN does not win outsized margins over simple text-heavy baselines when text is present, but achieves its primary advantage in computational footprint and transparency.

| Model | Params | Text | r |
|---|---|---|---|
| Abs-only (no contrast) | 61 | -- | .371 |
| ACN acoustic (3 cues) | 202 | -- | .412 |
| SSL baseline (wav2vec2) | 94.6 M | -- | .409 |
| Same-input LR (36-d) | 36 | Yes | .444 |
| ACN + text (ours) | 238 | Yes | .451 |
| Gated Student (KD) | 38 k | Yes | .449 |

## Limitations

The evaluation is restricted to a single cross-corpus pairing of read English speech (Helsinki Prosody to Emphases). The system relies heavily on external word boundary alignments from the Montreal Forced Aligner. The directional bias is inferred from learned architectural weights rather than verified through targeted human perception experiments. Furthermore, the simplified F0 feature representation (mean, std, slope) may fail to capture complex pitch-accent contours, potentially underestimating the role of pitch in sentential prominence.

## Why read this

Speech researchers and engineers building on-device, low-latency, or interpretable prosody applications should read this paper to see how foundational psychoacoustic principles can replace massive SSL encoders with a sub-250-parameter network that matches wav2vec2 performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time subtitle prosody markup, on-device pronunciation feedback for language learning, hearing aids, and lightweight text-to-speech frontends.

## Institutions / 機構

University of Tsukuba

## Related

- (link related pages by id as the wiki grows)
