---
id: taguchi26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["University of Notre Dame", "University at Buffalo", "Tokyo University of Foreign Studies", "Reitaku University", "Boston College"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2848
pdf: https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.pdf
---

# Pretrained self-supervised speech models can recognize unseen consonants

*Chihiro Taguchi, Éric Le Ferrand, Hirosi Nakagawa, Hitomi Ono, Kanji Kato, Emily Prud'hommeaux, David Chiang*

[PDF](https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2848)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — This paper evaluates whether pretrained self-supervised speech models can recognize rare click consonants in under-resourced Khoisan languages (G|ui and West !Xoon), finding that fine-tuned models actually recognize click phonemes more accurately than non-click phonemes. This demonstrates strong cross-lingual generalization to typologically unusual sounds despite their absence from pretraining distributions.

## Key contributions

- Constructed and released new ASR evaluation datasets for two endangered, click-rich Khoisan languages: G|ui (Khoe-Kwadi family, ~18.6k train / ~2k test seconds) and West !Xoon (Tuu family, ~5k train / ~1.4k test seconds).
- Conducted a systematic evaluation of 7 major self-supervised speech architectures (Wav2Vec 2.0 variants, XLS-R, MMS-1B, and HuBERT) on click consonant recognition.
- Provided empirical evidence that fine-tuned self-supervised models recognize acoustically prominent click consonants with significantly lower error rates than non-click phonemes and vowels (Wilcoxon W = 0, p = 0.016).

## Problem

Modern self-supervised speech models (like Wav2Vec 2.0, HuBERT, and Whisper) are predominantly pretrained on high-resource languages, leaving typologically rare speech sounds—such as the click consonants found primarily in Khoisan languages—virtually unrepresented. While these models facilitate cross-lingual transfer, it remains unknown whether they can robustly represent and recognize individual unseen phonetic categories that deviate severely from dominant training distributions. Investigating this is a critical technical and social imperative to ensure speech technologies support linguistic diversity rather than marginalize rare phonological inventories.

## Method

The authors fine-tuned several prominent pretrained encoder-only self-supervised models—including Wav2Vec 2.0 Large XLSR-53, XLS-R (300M and 1B), MMS-1B (with full parameters and frozen base + adapter), and HuBERT Large/Xlarge (300M and 1B)—on the G|ui and West !Xoon datasets. A Connectionist Temporal Classification (CTC) head was stacked on top of the encoder representations, and the entire network was optimized end-to-end to predict orthographic/phonemic transcripts. 

All models were trained for 10 epochs using the AdamW optimizer with a learning rate of 0.0003, a batch size of 8, and the first 100 steps reserved for warmup. Hyperparameters included attention, hidden, and feature projection dropouts set to 0.0, layerdrop set to 0.0, and mask time probability set to 0.05. Inference was evaluated using four distinct CTC decoding schemes: greedy decoding, beam search (width 50), and beam search coupled with 3-gram or 5-gram language models trained via KenLM (using an LM weight alpha of 0.2 and length penalty beta of 0.0).

Key design choices include omitting autoregressive sequence-to-sequence decoders to prevent contextual language bias from masking raw acoustic recognition capabilities, and utilizing full-parameter fine-tuning rather than freezing base models, as freezing severely degraded performance (doubling CER on G|ui).

## Experimental setup

Evaluated on the newly introduced G|ui dataset (3,691 train samples / ~5.1 hours; 411 test samples) and West !Xoon dataset (864 train samples / ~1.4 hours; 246 test samples). Evaluated 7 pretrained backbone configurations (300M to 1B parameters) trained on 24GB NVIDIA A10 GPUs. Metrics reported include Character Error Rate (CER), Phoneme Error Rate (PER) computed via the Needleman-Wunsch alignment algorithm, and split error rates across clicks, non-clicks, and vowels.

## Results

Monolingually pretrained HuBERT models (specifically hubert-large-ll60k at 300M parameters) consistently outperformed massive multilingual models like MMS-1B and XLS-R-1B, demonstrating that pretraining on more languages does not guarantee better performance on rare phonemes. Furthermore, 300M parameter models frequently beat their 1B counterparts, and freezing base weights (e.g., in mms-1b-all) roughly doubled the error rate compared to full-parameter updates. 

Crucially, under greedy decoding, click consonants achieved significantly lower error rates than non-click consonants and vowels (Wilcoxon W = 0, p = 0.016), capitalizing on their high acoustic saliency. Vowels proved most error-prone due to confusions across gradient continua of oral, nasalized, and long vowel realizations (e.g., 21% of /a/ errors mapped to /aa/). Language model integration (3-gram/5-gram) yielded marginal or mixed gains depending on the decoding beam configuration.

## Limitations

The study is constrained by very small dataset sizes (under 2 hours of training data per language), limiting the robustness of deep parameter tuning and preventing the use of data-hungry sequence-to-sequence decoders. The evaluation scope is strictly restricted to two endangered Khoisan languages (G|ui and West !Xoon) and does not test click-containing Bantu languages (like Zulu or Xhosa) where click inventories are smaller or mixed. Additionally, the lack of dedicated validation splits forced checkpoint selection directly using evaluation set performance.

## Why read this

Speech researchers and engineers working on low-resource adaptation, phonetic representation learning, or phonological inclusivity should read this to understand that self-supervised encoders can successfully generalize to acoustically salient phonetic inventories absent from pretraining data, challenging the assumption that massive multilingual scaling is always necessary.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building inclusive speech recognition tools for endangered and low-resource languages with complex, atypical phonological systems.

## Institutions / 機構

University of Notre Dame, University at Buffalo, Tokyo University of Foreign Studies, Reitaku University, Boston College

**Funding / 經費:** National Science Foundation, JSPS KAKENHI

## Related

- (link related pages by id as the wiki grows)
