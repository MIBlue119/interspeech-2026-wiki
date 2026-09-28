---
id: kothari26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3330
pdf: https://www.isca-archive.org/interspeech_2026/kothari26_interspeech.pdf
---

# Multilingual Multi-Speaker Unit Vocoders: A Systematic Analysis of Discrete Speech Representations

*Naman Kothari, Arjun Gangwar, Adarsh Arigala, S Umesh*

[PDF](https://www.isca-archive.org/interspeech_2026/kothari26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kothari26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3330)

**TL;DR** — This paper investigates BigVGAN-based discrete unit vocoders across four Indian languages, demonstrating that cluster size dictates intelligibility via phonetic resolution while ECAPA-TDNN speaker conditioning prevents identity collapse. Larger cluster inventories (up to 10k) successfully resolve cross-lingual phoneme sharing and reduce word error rates.

## Key contributions

- Extended the BigVGAN architecture to a multilingual multi-speaker discrete speech unit vocoder framework.
- Analyzed the impact of speaker conditioning (ECAPA-TDNN) and auxiliary language identification (LID) supervision on intelligibility and speaker preservation.
- Conducted a systematic study of cluster size trade-offs (500 to 10k clusters) and cross-lingual unit sharing using 22-language k-means models.
- Provided a comprehensive evaluation using WER, speaker similarity, and unit-level metrics (phoneme purity, cluster purity, PNMI).

## Problem

Discrete speech units derived via k-means clustering of self-supervised representations entangle phonetic, speaker, and language information, which leads to speaker mixing and cross-lingual interference in multilingual multi-speaker speech generation. Prior work predominantly evaluates unit vocoders on English alone, treats the vocoder as a secondary component behind upstream models, or uses rigid speaker embedding lookup tables instead of continuous acoustic representations. Furthermore, the interactions between unit sharing, conditioning strategies, and larger cluster sizes remain underexplored, particularly across linguistically diverse language families like Indo-Aryan and Dravidian.

## Method

The architecture builds upon BigVGAN by replacing mel-spectrogram generator inputs with discrete units extracted from the 21st layer of a Data2Vec-AQC model (pre-trained on 30k hours across 23 Indian languages). Frame-level unit sequences of length 26 (using a hop size of 320 samples for 16 kHz audio segments of 8320 samples) are mapped through a learned embedding table to dimensions of du = 128. Speaker conditioning is introduced via a continuous 192-d speaker embedding extracted using a pre-trained ECAPA-TDNN, avoiding closed-set speaker lookup tables. Language conditioning uses learnable 128-d embeddings combined with an auxiliary Language Identification (LID) classifier operating on generated versus real mel-spectrograms. Speaker and language embeddings are temporally repeated and channel-wise concatenated with the unit representations before feeding into the BigVGAN generator.

The training objective combines the adversarial least squares GAN loss, feature matching loss (lambda_fm = 1), L1 mel-spectrogram reconstruction loss (lambda_mel = 15), and the auxiliary LID cross-entropy loss (lambda_LID = 1). K-means models with inventory sizes of 500, 1k, 2k, 5k, and 10k were trained on 1,200 hours of balanced speech across 22 Indian languages. The vocoder models themselves are trained on four Indian languages (Bengali, Hindi, Tamil, Telugu) for a controlled analysis.

During inference, the generator processes full-length unit sequences directly alongside target speaker and language conditioning vectors to reconstruct time-domain waveforms.

## Experimental setup

Evaluated on the official IndicVoices-R test splits spanning four languages (Bengali: 109.44 hrs, Hindi: 71.8 hrs, Tamil: 97.3 hrs, Telugu: 133.9 hrs) with 16 unseen speakers per language for zero-shot speaker generalization. Models are trained for 400k steps with a batch size of 64 across four NVIDIA A100 GPUs using independent AdamW optimizers (lr = 0.0001). Evaluation metrics include Word Error Rate (WER) computed via Indic-Conformer 600M, speaker similarity cosine distance via Versa using ECAPA-TDNN embeddings, and unit-level metrics (phoneme purity, cluster purity, and PNMI) obtained via forced alignment with IndicMFA.

## Results

In unconditioned setups, WER drops significantly as cluster size increases (e.g., Bengali WER falls from 60.42 at 500 clusters to 25.13 at 10k), but speaker similarity remains poor (0.16–0.21) with audible gender switches and identity collapse. Adding ECAPA-TDNN speaker conditioning boosts speaker similarity by 4–5x across all languages, achieving 0.67–0.77 at 10k clusters. Language conditioning with LID loss provides additional WER gains primarily at smaller cluster inventories (e.g., Bengali WER at 1k drops from 46.24 with speaker-only to 43.73 with speaker+language), whereas at 10k clusters, additional language conditioning yields negligible or slightly degrading performance as units are already discriminative. Tamil and Telugu consistently exhibit higher WER than Bengali and Hindi due to weaker phoneme-unit alignments and lower phoneme purity/PNMI.

| System / Condition | Bengali WER (%) | Hindi WER (%) | Tamil WER (%) | Telugu WER (%) |
|---|---|---|---|---|
| Ground Truth | 13.08 | 12.57 | 30.57 | 13.87 |
| Units only (500) | 60.42 | 69.46 | 86.06 | 87.85 |
| Units only (10k) | 25.13 | 25.31 | 59.20 | 47.92 |
| Units + ECAPA (10k) | 22.94 | 23.99 | 51.06 | 48.80 |
| Units + ECAPA + LID (10k) | 23.39 | 24.84 | 52.49 | 48.21 |

## Limitations

The study is restricted to four Indian languages (Bengali, Hindi, Tamil, and Telugu) out of the 22 available in the training corpora, leaving broader multilingual validation open. Evaluation relies primarily on objective metrics (WER and speaker similarity) because subjective MOS/UTMOS evaluations did not yield stable trends. The approach requires downstream forced alignment tools for unit-level analysis and does not yet jointly optimize pitch or expressive prosody contours.

## Why read this

Speech and ML engineers building multilingual Audio LLMs or speech-to-speech translation systems should read this paper to understand the exact trade-offs between discrete unit cluster size and conditioning mechanisms. It provides actionable design principles showing that cluster sizes govern intelligibility while continuous speaker embeddings are strictly required to avoid identity collapse.

## Code

- https://github.com/UnitBigVGAN

## Applications

Multilingual speech-to-speech translation systems, audio language models, zero-shot voice conversion, and low-resource textless speech generation pipelines.

## Related

- (link related pages by id as the wiki grows)
