---
id: onda26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1668
pdf: https://www.isca-archive.org/interspeech_2026/onda26_interspeech.pdf
---

# Leveraging Soft Distributions of SSL-Derived Discrete Speech Tokens for Downstream Inference

*Kentaro Onda, Satoru Fukayama, Daisuke Saito, Nobuaki Minematsu*

[PDF](https://www.isca-archive.org/interspeech_2026/onda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/onda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1668)

**TL;DR** — Applying posterior-based soft assignment to self-supervised discrete speech tokens exclusively during downstream inference improves both recognition and reconstruction performance while maintaining training-time compression efficiency. Notably, it outperforms continuous feature representations on non-native speech ASR.

## Key contributions

- Introduces an inference-time soft token assignment framework using softmax-converted posterior probabilities over pre-trained k-means centroids without altering downstream training.
- Demonstrates consistent error reductions across ASR and text-to-speech tasks compared to hard token assignment, particularly yielding strong out-of-domain and non-native generalization.
- Shows that soft token assignment improves embedding space compactness and phoneme class separability (measured by Fisher-like ratio), reducing intra-class variance.
- Extends the approach to multi-codebook / multi-layer SSL intermediate representations to secure further accuracy gains.

## Problem

While self-supervised learning (SSL) discrete tokens enable efficient data compression and speaker-disentangled representations for downstream models, hard discretization inevitably discards significant acoustic and linguistic information compared to continuous features. Prior work like HuBERT-Soft avoids this loss through continuous fine-tuning, but sacrifices the massive training-time data compression advantages of discrete tokens. Other approaches like residual k-means or multi-codebook weighted sums increase representational complexity and reduce compression ratios. This work addresses the trade-off between training efficiency and representation expressiveness without requiring costly retraining of the SSL backbone.

## Method

The approach relies on pre-trained SSL models (HuBERT-large and WavLM-large from layer 21, extracting 1024-dimensional outputs) and k-means cluster centroids learned from a 30-hour subset of LibriSpeech-100h with codebook sizes K = 128, 1024, and 4096. During training, downstream models (hybrid CTC/attention ASR and HiFi-GAN speech synthesis) use standard hard token assignment to preserve data compression benefits. At inference time, hard argmax indexing is replaced by a soft posterior probability distribution computed via a temperature-scaled softmax over negative Euclidean distances between continuous SSL features and each cluster centroid: $p(k|\mathbf{x}) = \exp(-D_k(\mathbf{x}) / \tau) / \sum_j \exp(-D_j(\mathbf{x}) / \tau)$.

The input to the downstream model is then formed by taking the expectation (weighted sum) of the corresponding token embedding vectors $\mathbf{E}_k$ using these posterior probabilities. The softmax temperature parameter $\tau$ governs assignment sharpness, functioning as hard discretization as $\tau \to 0$. Optimal $\tau$ values were tuned per task (e.g., $\tau = 8.0$ for clean/lecture domains and $\tau = 13.5$ for non-native speech) to balance uncertainty modeling against uniform distribution collapse.

## Experimental setup

Evaluated datasets include LibriSpeech-100h (30-hour centroid learning subset; in-domain ASR tests), TED-LIUM v2, CHiME4 (single-channel noisy speech), ERJ (non-native speech 10% subset), LJSpeech (in-domain resynthesis), and TIMIT (out-of-domain voice conversion input). ASR models use ESPnet with a hybrid CTC/attention encoder-decoder. Speech synthesis employs HiFi-GAN vocoders. Baselines include continuous SSL representations (cont.), standard hard token assignment during both training and inference (hard/hard), and soft assignment during both training and inference (soft/soft). Metrics include Word Error Rate (WER) for ASR, Mel-Cepstral Distortion (MCD), F0 RMSE, UTMOS, Phonetic Posteriorgram Distance (PPG dist.), F0 correlation, and speaker cosine similarity (SpkSim).

## Results

For ASR on LibriSpeech clean/other, hard/soft inference drops WER across all cluster sizes (e.g., WavLM $K=128$ hard/hard 6.4/11.3 vs hard/soft 5.9/10.2). On out-of-domain non-native speech (ERJ), WavLM with $K=4096$ and hard/soft achieves 38.8% WER, outperforming the continuous feature topline (38.9%). For LJSpeech resynthesis and TIMIT voice conversion using WavLM, hard/soft consistently improves MCD (e.g., $K=128$ hard/hard 5.80 vs soft 5.58) and PPG distance while scoring higher in target speaker similarity (SpkSim) than continuous feature baselines. Analysis of phoneme embedding spaces confirms that soft assignment lowers intra-class variance and increases the inter-to-intra variance ratio (e.g., WavLM $K=128$ ASR ratio increases from 1.39 to 1.52).

| System | K | Train Assign | Infer Assign | LibriSpeech (clean/other) | TED2 | CHiME4 | ERJ |
|---|---|---|---|---|---|---|---|
| WavLM (cont.) | - | - | - | 3.0 / 5.5 | 7.8 | 16.0 | 38.9 |
| WavLM | 128 | hard | hard | 6.4 / 11.3 | 15.4 | 27.8 | 53.9 |
| WavLM | 128 | hard | soft | 5.9 / 10.2 | 14.9 | 25.1 | 51.7 |
| WavLM | 4096 | hard | hard | 3.8 / 6.6 | 10.1 | 19.3 | 41.5 |
| WavLM | 4096 | hard | soft | 3.7 / 6.3 | 9.8 | 17.8 | 38.8 |

## Limitations

The approach requires a hyperparameter search for the softmax temperature $\tau$ per task and domain to maximize gains. Evaluation is constrained to ASR and vocoding/speech synthesis; downstream spoken language modeling and deduplication/BPE token stream pipelines are left as future work. The method relies heavily on pre-computed codebook centroids from an auxiliary corpus subset.

## Why read this

Speech researchers and engineers working with discrete token pipelines who want to capture the expressiveness of continuous SSL features at inference time without breaking data compression workflows during training will find this an immediately applicable technique.

## Code

- https://ondatk68.github.io/onda-demo/projects/soft-token-inference/

## Applications

Robust automatic speech recognition (ASR), text-to-speech (TTS) resynthesis, and voice conversion across mismatched or out-of-domain acoustic environments.

## Related

- (link related pages by id as the wiki grows)
