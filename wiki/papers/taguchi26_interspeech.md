---
id: taguchi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2848
pdf: https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.pdf
---

# Pretrained self-supervised speech models can recognize unseen consonants

*Chihiro Taguchi, Éric Le Ferrand, Hirosi Nakagawa, Hitomi Ono, Kanji Kato, Emily Prud'hommeaux, David Chiang*

[PDF](https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2848)

**TL;DR** — This paper evaluates whether pretrained self-supervised speech models can recognize rare click consonants in under-resourced Khoisan languages (G|ui and West !Xoon), finding that fine-tuned models actually recognize clicks significantly more accurately than non-click phonemes. Monolingually pretrained HuBERT models (300M parameters) frequently outperform massive multilingual models like MMS-1B.

## Key contributions

- Constructed and released ASR datasets for two click-rich Khoisan languages: G|ui (Khoe-Kwadi family, ~5.1 hours total) and West !Xoon (Tuu family, ~1.75 hours total).
- Performed a systematic evaluation of 7 different pretrained multilingual and monolingual self-supervised ASR architectures on click vs. non-click phoneme recognition.
- Provided empirical evidence that self-supervised pretraining enables robust generalization to typologically rare, unseen phonemes, with clicks achieving significantly lower error rates than non-clicks.

## Problem

Modern pretrained self-supervised speech models (like Wav2Vec 2.0, HuBERT, and MMS) are heavily biased toward high-resource languages, leaving typologically uncommon speech sounds—such as click consonants found primarily in Khoisan languages—virtually absent from pretraining corpora. It has remained unclear whether multilingual speech models can accurately represent and recognize these rare phonetic units or if they suffer severe degradation. Addressing this gap is critical to ensure speech technologies support linguistic diversity rather than exclusively serving globally dominant languages.

## Method

The study fine-tunes a variety of pretrained encoder-only self-supervised speech models—specifically Wav2Vec2 variants (xlsr-53, xls-r-300m, xls-r-1b), MMS-1B, and HuBERT (large-ll60k, xlarge-ll60k)—on G|ui and West !Xoon datasets. For MMS-1B, the authors evaluate both full-parameter fine-tuning and adapter-only tuning (freezing the base model). A Connectionist Temporal Classification (CTC) layer is stacked on top of the encoder to predict character/phoneme symbols per frame, avoiding autoregressive decoders where linguistic context might artificially aid click recognition.

All models are trained for 10 epochs using the AdamW optimizer with a learning rate of 0.0003, a batch size of 8, and the first 100 steps reserved for linear warm-up. Hyperparameters include an attention, hidden, and feature projection dropout of 0.0, layerdrop of 0.0, and a mask time probability of 0.05. The loss function is the mean CTC loss over batches. Inference is evaluated using greedy decoding, beam search (width 50), and beam search combined with 3-gram or 5-gram language models built via KenLM using a language model weight alpha of 0.2 and length penalty beta of 0.0.

Full-parameter updating was chosen because freezing base weights (as tested on MMS-1B-all) resulted in a Phoneme Error Rate nearly twice as high, demonstrating that base representations must adapt to handle extreme phonological outliers. Smaller 300M parameter models were evaluated alongside 1B models to test scalability constraints under extreme data scarcity.

## Experimental setup

Evaluated on two custom Khoisan datasets: G|ui (3,691 train samples / ~5.1 hours; 411 test samples) and West !Xoon (864 train samples / ~1.75 hours; 246 test samples). Compared models include wav2vec2-large-xlsr-53 (300M), wav2vec2-xls-r-300m (300M), wav2vec2-xls-r-1b (1B), mms-1b (1B), mms-1b-all (1B), hubert-large-ll60k (300M), and hubert-xlarge-ll60k (1B). Evaluated using Character Error Rate (CER), Phoneme Error Rate (PER) computed via the Needleman-Wunsch alignment algorithm, and error rates broken down by manner of articulation. Training was executed on single 24GB A10 GPUs, taking approximately 70 minutes per 300M model run.

## Results

Monolingually pretrained HuBERT models (300M parameters) consistently achieved the best overall performance, outperforming massive 1B-parameter models and models trained on over 1,400 languages (MMS). Scaling model size from 300M to 1B parameters did not improve accuracy; wav2vec2-xls-r-300m frequently outperformed wav2vec2-xls-r-1b, and hubert-large-ll60k beat hubert-xlarge-ll60k on West !Xoon. Freezing base parameters in MMS-1B-all severely degraded performance, roughly doubling the Phoneme Error Rate.

Crucially, across all models, click consonants achieved significantly lower error rates than non-click consonants and vowels (confirmed by a Wilcoxon signed-rank test, W = 0, p = 0.016). Vowels proved to be the most difficult category due to gradient acoustic continua causing confusions among oral, nasalized, and long variants (e.g., 21% of /a/ errors were recognized as /aa/).

| System / Condition | West !Xoon PER (Approx.) | G|ui PER (Approx.) |
|---|---|---|
| hubert-large-ll60k (300M) | ~0.25 | ~0.20 |
| wav2vec2-large-xlsr-53 (300M) | ~0.30 | ~0.23 |
| wav2vec2-xls-r-1b (1B) | ~0.35 | ~0.26 |
| mms-1b | ~0.40 | ~0.28 |

## Limitations

The study is restricted to extremely small datasets (1.75 to 5.1 total hours), lacking validation splits for hyperparameter tuning. It evaluates only two closely related Khoisan language families, leaving open whether findings extend to other click-using language families like Bantu languages with borrowed clicks. The evaluation is limited to frame-level CTC architectures without contextual language-model rescoring using deep neural LMs.

## Why read this

Speech researchers and engineers working on low-resource adaptation and phonetic generalizability should read this to understand that self-supervised representations are remarkably robust to unseen, typologically rare phonemes—contrary to assumptions that massive multilingual pretraining is strictly required.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building robust automatic speech recognition systems for endangered, indigenous, and extremely low-resource languages with unusual phonological inventories.

## Related

- (link related pages by id as the wiki grows)
