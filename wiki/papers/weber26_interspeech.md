---
id: weber26_interspeech
category: speech-alignment
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-296
pdf: https://www.isca-archive.org/interspeech_2026/weber26_interspeech.pdf
---

# Multilingual Word-Level Forced Alignment with Self-Supervised Representations and Learned Dynamic Programming

*Roy Weber, Meidan Zehavi, Rotem Rousso, Joseph Keshet*

[PDF](https://www.isca-archive.org/interspeech_2026/weber26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/weber26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-296)

**TL;DR** — The paper introduces Multilingual Word-Aligned (MWA), a forced alignment framework that fuses self-supervised phoneme boundary detectors (UnSupSeg) and Massively Multilingual Speech (MMS) representations using an alignment encoder and learned dynamic programming. It outperforms the Montreal Forced Aligner (MFA) on English test sets and generalizes to unseen languages without retraining.

## Key contributions

- Proposes an alignment framework combining unsupervised phoneme boundary detection (UnSupSeg) and self-supervised multilingual representations (MMS) without requiring grapheme-to-phoneme (G2P) converters.
- Implements a learned dynamic programming alignment decoder parametrized by structural feature functions that jointly evaluate frame boundaries and segmental features.
- Demonstrates robust zero-shot cross-lingual transfer, scaling English-trained models to unseen languages (Hebrew, German, Dutch) supported by MMS.
- Outperforms established baselines including MFA, CTC-based MMS alignment, WhisperX, and Nvidia-Canary-1B on benchmark corpora.

## Problem

Precise temporal word-level forced alignment is vital for linguistic studies and ASR system evaluation. Traditional HMM-GMM frameworks like the Montreal Forced Aligner (MFA) remain dominant and competitive, but they heavily depend on language-specific grapheme-to-phoneme (G2P) dictionaries and phonetic lexicons that are unavailable or low-quality for thousands of languages. While modern self-supervised models like wav2vec 2.0, HuBERT, and Whisper improve recognition, standalone CTC-based alignment or generic ASR timestamps often fall short of the precise temporal accuracy required for fine-grained phonetic and prosodic analysis.

## Method

The proposed MWA framework accepts an audio waveform converted into $L$ frames ($10\text{ msec}$ per frame) and a word sequence $w = (w_1, \ldots, w_K)$. It uses two pre-trained representation models ($M=2$): UnSupSeg ($f_1$), which outputs contrastive self-supervised phoneme boundary features at $10\text{ msec}$ resolution ($D_1$ dimensions), and MMS ($f_2$), which generates CTC-based word alignment confidence scores upsampled via interpolation to $10\text{ msec}$ ($D_2 = 1$). Normalized representations are concatenated into $S \in \mathbb{R}^{L \times D}$ and fed to an alignment encoder $g_\theta$ to estimate frame-level word boundary probabilities $z \in [0, 1]^L$. Evaluated backbones include VGG, Transformer, and Conformer; the Conformer configuration (16 blocks, 12 attention heads, kernel size 7, 300-frame context window) was selected for its balance of localized feature extraction and temporal accuracy.

The encoder is trained independently as a binary classification task to predict word boundaries, utilizing Focal Loss to counteract extreme class imbalance between boundary and non-boundary frames. Because boundary prediction uses binary cross-entropy variants, the encoder is first fine-tuned for 30 epochs with early stopping based on validation F1-score.

The final alignment decoder $h_\psi$ is a learned dynamic programming module that optimizes a linear combination of $N=4$ feature functions $\phi_n$: (1) Euclidean distance of UnSupSeg representations across candidate boundaries, (2) transition scores derived from encoder word boundary probabilities, (3) negative normalized sum of encoder outputs over the word duration interval, and (4) MMS emission log-probabilities summed across the letters of each word. Due to non-differentiability of the dynamic programming block, the decoder parameters are optimized iteratively following encoder pre-training.

## Experimental setup

Evaluated on TIMIT (5.1 hours of read speech, 80/10/10 split) and Buckeye (40 hours of conversational speech, 80/10/10 split), alongside unseen evaluation sets: a Hebrew broadcast news dataset (10 minutes, phoneme-annotated), the Dutch IFA Corpus (~5 hours, 8 speakers), and the German PHONDAT corpus (201 speakers, 21,587 utterances). Baselines include Montreal Forced Aligner (MFA), CTC-based MMS alignment, WhisperX, and Nvidia-Canary-1B. Metrics include word alignment accuracy at various millisecond tolerance thresholds ($t \le 10, 25, 50, 100\text{ msec}$) and boundary classification accuracy, precision, recall, and F1-score.

## Results

On the TIMIT test set at strict tolerances, MWA achieves an alignment accuracy of $58.0\% (t \le 10\text{ ms})$ and $91.6\% (t \le 50\text{ ms})$, outperforming MFA ($41.6\% / 89.4\%$), MMS ($18.6\% / 75.7\%$), and WhisperX ($22.4\% / 82.4\%$). On the noisier Buckeye test set, MWA achieves $49.7\% (t \le 10\text{ ms})$ and $86.7\% (t \le 50\text{ ms})$, compared to MFA's $39.8\% / 84.9\%$.

Ablations on encoder backbones show that the Conformer achieves the strongest overall F1 score ($43.0$ on TIMIT, $39.1$ on Buckeye validation sets) compared to VGG and Transformer architectures, proving that localized convolutional processing benefits boundary detection more than global self-attention alone. For zero-shot cross-lingual evaluation on German PHONDAT, the TIMIT-trained MWA model reaches $32.8\% (t \le 10\text{ ms})$ and $84.7\% (t \le 50\text{ ms})$, outperforming MFA ($29.9\% / 82.1\%$). However, MWA does not win uniformly across all conditions; on Dutch (IFA Corpus) and Hebrew at relaxed tolerances ($t \le 100\text{ ms}$), raw MMS or MFA occasionally surpasses zero-shot MWA (e.g., Dutch $t \le 100\text{ ms}$ accuracy: MFA $94.3\%$ vs MWA $76.5\%$).

| System | $t \le 10$ ms | $t \le 25$ ms | $t \le 50$ ms | $t \le 100$ ms |
|---|---|---|---|---|
| MFA (TIMIT) | 41.6 | 72.8 | 89.4 | 97.4 |
| MMS (TIMIT) | 18.6 | 43.5 | 75.7 | 94.7 |
| WhisperX (TIMIT) | 22.4 | 52.7 | 82.4 | 94.2 |
| MWA (TIMIT, Ours) | **58.0** | **81.3** | **91.6** | **97.8** |
| MFA (Buckeye) | 39.8 | 69.9 | 84.9 | 91.8 |
| MWA (Buckeye, Ours) | **49.7** | **73.2** | **86.7** | **94.2** |

## Limitations

The model requires two separate training stages due to the non-differentiability of the dynamic programming decoder, preventing end-to-end joint optimization. While the system generalizes zero-shot to unseen languages via MMS and UnSupSeg, performance on highly conversational or accented speech (such as Dutch IFA or relaxed tolerances on Hebrew) can lag behind tuned rule-based or HMM-GMM toolkits like MFA. Furthermore, training data was restricted to English corpora (TIMIT and Buckeye), meaning cross-lingual scaling relies entirely on the pre-trained representation capacity of MMS.

## Why read this

Speech and ML researchers building cross-lingual forced alignment pipelines without G2P dictionaries will find this a valuable blueprint for combining unsupervised boundary detectors with self-supervised feature encoders via learned dynamic programming. Readers will take away a practical methodology to replace traditional HMM-GMM aligners using modular neural components.

## Code

- https://github.com/MLSpeech/Multilingual-Word-Aligner

## Applications

Automatic speech recognition evaluation, phonetic and prosodic linguistic research, corpus annotation, and speech dataset segmentation.

## Related

- (link related pages by id as the wiki grows)
