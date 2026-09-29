---
id: chen26i_interspeech
category: tts
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1064
pdf: https://www.isca-archive.org/interspeech_2026/chen26i_interspeech.pdf
---

# G2PO: A Lightweight Lexicon-enhanced Framework for Open-Vocabulary Mandarin Polyphone Disambiguation

*Feifan Chen, Chunhui Lu, Rui Zhou, Liming Song, Hongjun Kil, YoonChoon Hwang, Junkwang Oh*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1064)

**Category:** `tts` · **Labels:** `efficient-on-device`

**TL;DR** — g2pO is a lightweight, open-vocabulary Mandarin polyphone disambiguation framework that uses a tiny RoBERTa encoder and a lexicon adapter to achieve 99.15% accuracy on CPP with only 3.99M parameters.

## Key contributions

- Proposes a lightweight PLM encoder (RoBERTa-tiny) paired with a lexicon fusion module, shrinking model parameter size to 3.99M (~27x smaller than typical 100M+ BERT baselines).
- Introduces a dynamic word representation construction mechanism via mix-pooling, eliminating the need to store dense word embeddings and reducing dictionary storage overhead to just 3 MB.
- Implements a lexicon prior and weighted softmax formulation to enable open-vocabulary zero-shot generalization to previously unseen pronunciations.
- Incorporates an auxiliary part-of-speech (POS) prediction module using collapsed syntactic categories to guide syntactic context disambiguation.

## Problem

Mandarin text-to-speech systems require accurate grapheme-to-phoneme conversion, but polyphone disambiguation remains challenging due to contextual dependencies. Existing state-of-the-art pre-trained language model approaches (like g2pL, PDF, and g2pW) suffer from massive parameter sizes exceeding 100M, making them prohibitive for on-device deployment. Furthermore, prior lexicon-enhanced methods require gigabytes of storage for dense word embeddings, and their closed-set classification design fails completely when encountering pronunciations absent from training data.

## Method

The g2pO architecture comprises four main blocks: a PLM encoder, a lexicon fusion module, a POS prediction module, and a phoneme prediction module. The input text is first processed by a RoBERTa-tiny encoder (2 hidden layers, 128 hidden size) to produce contextual hidden states. Concurrently, a POS predictor MLP takes the polyphonic character's hidden state and classifies it into one of 10 collapsed syntactic categories using teacher-forced ground-truth POS tags during training. A pronunciation dictionary combined via a Trie structure matches input substrings containing the target character. Instead of storing heavy static embeddings, word representations are dynamically constructed by extracting token hidden states within the matched span [s, e] and applying mix-pooling: a 0.5/0.5 blend of mean pooling and max pooling. This vector is concatenated with a learnable pinyin embedding and passed through an MLP to form a contextualized lexicon representation.

Scaled dot-product attention fuses the character's hidden state (as query) with these lexicon representations (as keys and values), producing a residual-connected, layer-normed enhanced hidden state. Simultaneously, attention weights for words sharing identical target pinyins are summed and padded to form a lexicon prior distribution over the output vocabulary. The POS embedding and enhanced hidden state are concatenated and fed into an MLP phoneme predictor to output logits. During inference, these logits are scaled by a weighted softmax function conditioned on a valid pinyin mask and the lexicon prior (with temperature tau set to 1 for seen words and 10 for unseen ones). During training, the lexicon prior is omitted to prevent over-reliance on dictionary features, and the network is optimized jointly using cross-entropy losses for both POS prediction (weighted by beta=0.1) and phoneme classification with label smoothing restricted to valid candidates.

## Experimental setup

Evaluated on the Chinese Polyphone with Pinyin (CPP: 79k train, 9.8k dev, 10.2k test), revised CPP (RCPP: 69k train, 8.6k dev, 8.9k test), and Modern Common Polyphone (MCP) datasets, alongside an RCPP(S) subset and a CPP Hard subset (47 instances with conflicting dictionary cues). Compared against baselines including g2pM (BiLSTM/BERT), g2pL, PDF, and g2pW. Implemented with PyTorch on a single NVIDIA A100 GPU using AdamW optimizer, warming learning rate up from 1e-7 to 5e-5 over 4,000 steps, and training for 40,000 steps with a batch size of 256.

## Results

g2pO achieves 99.15% test accuracy on the CPP dataset, outperforming the previous state-of-the-art g2pW (99.08%) while utilizing only 3.99M parameters compared to g2pW's 107.64M. On the RCPP and RCPP(S) datasets, it achieves 99.03% and 85.51% accuracy respectively. On a zero-shot open-vocabulary evaluation using 541 unseen pronunciation samples from MCP, closed-set baselines score 0.00% whereas g2pO achieves 70.79% accuracy. Ablation studies show that removing the lexicon adapter causes the largest drop in accuracy (down to 89.55% overall, though 35.1% of test instances lacking dictionary coverage still maintain 98.50% accuracy), while dropping the POS module and lexicon prior reduces accuracy to 98.91% and 99.10% respectively.

| System | Parameters | CPP Acc (%) | RCPP Acc (%) | MCP Zero-Shot (%) |
|---|---|---|---|---|
| g2pM (BiLSTM) [9] | 0.48M | 97.31 | 97.28 | 0.00 |
| g2pL [16] | 150.36M | 98.43 | 97.80 | 0.00 |
| PDF (BERT) [15] | 110.22M | 98.83 | - | - |
| g2pW [13] | 107.64M | 99.08 | 89.97 | 0.00 |
| g2pO (Ours) | 3.99M | 99.15 | 99.03 | 70.79 |

## Limitations

While the model generalizes well to unseen pronunciations via dictionary priors, its open-vocabulary capacity fundamentally depends on the coverage of the external lexicon dictionary for unseen pinyin candidates. The evaluation is restricted to Mandarin Chinese text datasets, leaving multi-language applicability unverified. Furthermore, compute and footprint evaluations focus exclusively on model size and training steps on server-grade GPUs without reporting direct on-device latency measurements.

## Why read this

Speech and ML engineers building on-device TTS front-ends will find a blueprint for slashing LLM parameter sizes by 27x while matching SOTA polyphone disambiguation accuracy and gaining zero-shot open-vocabulary generalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device Chinese Text-to-Speech (TTS) front-ends, embedded speech assistants, and smart speaker pronunciation normalization.

## Institutions / 機構

Samsung

## Related

- (link related pages by id as the wiki grows)
