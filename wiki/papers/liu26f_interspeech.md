---
id: liu26f_interspeech
category: sound-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-731
pdf: https://www.isca-archive.org/interspeech_2026/liu26f_interspeech.pdf
---

# A Semantic-Anchor-based Method for Open-Vocabulary Sound Event Detection

[PDF](https://www.isca-archive.org/interspeech_2026/liu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-731)

**TL;DR** — This paper proposes a semantic-anchor-based framework for open-vocabulary sound event detection, achieving a headline novel-class PSDSr of 32.3 on AudioSet-Strong and a zero-shot PSDS1 of 44.1 on DESED.

## Problem

Most existing sound event detection methods rely on a closed-set assumption, restricting detection to predefined classes and failing to recognize unseen events in real-world scenarios. While open-vocabulary methods have emerged, they depend purely on similarity matching between text queries and audio features without deep semantic understanding, rendering them vulnerable to cross-modal mismatch and poor generalization on novel categories.

## Method

The architecture combines a pre-trained audio encoder (PaSST or HTS-AT), a CLAP-based query encoder for text/audio inputs, 400 learnable semantic anchor vectors (dimension 384) acting as semantic reference tokens, an anchor-guided bidirectional decoder, and a Conformer-based context network for temporal localization. During training, ChatGPT generates diverse textual descriptions for LLM-based query augmentation, and models are trained using asymmetric focal loss combined with a codebook diversity regularization term. The model uses a tailored self-attention mask to force event queries to attend exclusively to the semantic anchors.

## Results

Evaluated on AudioSet-Strong under an open-vocabulary setting (trained on 308 common classes, tested on 99 unseen rare classes), the method achieves 34.9 PSDS overall and 32.3 PSDSr with text queries, outperforming prior models like DASM (23.3-32.7). In zero-shot cross-dataset evaluation on DESED, it attains 44.1 PSDS1, surpassing the DESED-supervised DCASE baseline (36.4). Ablations confirm that removing semantic anchors causes a massive drop in PSDSr (from 32.3 down to 12.6), while removing bidirectional attention or textual augmentation also degrades performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building smart home assistants, automotive safety systems, or multimodal large language models requiring robust open-vocabulary acoustic event awareness.

## Related

- (link related pages by id as the wiki grows)
