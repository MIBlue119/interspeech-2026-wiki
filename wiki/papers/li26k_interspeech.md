---
id: li26k_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-695
pdf: https://www.isca-archive.org/interspeech_2026/li26k_interspeech.pdf
---

# POTSA: A Cross-Lingual Speech Alignment Framework for Speech-to-Text Translation

[PDF](https://www.isca-archive.org/interspeech_2026/li26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-695)

**TL;DR** — POTSA is a cross-lingual speech alignment framework using parallel optimal transport for speech-to-text translation that achieves a +1.29 average BLEU improvement over five common languages and +2.93 BLEU on zero-shot languages on FLEURS.

## Problem

State-of-the-art multilingual speech large language models suffer from performance degradation on low-resource speech-to-text translation because source speech representations form isolated language-specific clusters instead of shared semantic spaces. Existing unidirectional cross-modal alignment methods rely heavily on textual supervision and treat source languages independently, ignoring transferable cross-lingual representations. This performance bias prevents decoders from effectively reusing learned translation mappings across diverse language pairs.

## Method

The framework utilizes a two-stage training setup based on the SLAM-LLM architecture, keeping the Whisper-v3 speech encoder and Qwen-2.5-7B LLM frozen while training an 8-layer Q-Former (80 query tokens) with 10 hours of parallel speech per language. First, a Bias Compensation module computes sentence-level temporal pooling averages to subtract language-specific global biases from encoder outputs. Second, token-level entropy-regularized Optimal Transport (Sinkhorn distance) constraints are imposed on intermediate Q-Former representations using cross-lingual parallel speech pairs. Third, an online reward-guided layer scheduling strategy based on Upper Confidence Bound principles and temperature-controlled softmax sampling dynamically selects the most informative lower Q-Former layers for alignment.

## Results

Evaluated on the FLEURS test set spanning five training languages and six zero-shot languages using models pretrained on 364 hours of CoVoST2. POTSA achieves an average BLEU score of 31.84, outperforming baseline models (30.14) and alternative alignment losses like MSE (30.52) and cosine similarity (30.74). Ablations demonstrate that combining bias compensation and fine-grained optimal transport with random pairwise alignment outperforms fixed English-anchor strategies, and restricting reward-guided scheduling to lower Q-Former layers prevents objective interference with upper translation layers.

## Code

- https://github.com/Sslnon/POTSA

## Applications

Speech and ML engineers building multilingual speech-to-text translation systems, real-time speech translation applications, and cross-lingual spoken language interfaces targeting low-resource languages.

## Limitations

Applying optimal transport alignment to deeper Q-Former layers creates competing objectives with the cross-entropy translation loss, requiring restrictions to lower layers.

## Related

- (link related pages by id as the wiki grows)
