---
id: lo26_interspeech
category: automatic-pronunciation-assessment
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1494
pdf: https://www.isca-archive.org/interspeech_2026/lo26_interspeech.pdf
---

# A Novel Sentence Stress Detection Framework Leveraging Auxiliary Word-Stress Modeling and Loss Optimization

[PDF](https://www.isca-archive.org/interspeech_2026/lo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1494)

**TL;DR** — The paper introduces STRAW, a unified framework for sentence stress detection that combines a frozen Whisper backbone with an auxiliary word-level stress branch and a word-span stress regularizer, achieving an F1 score of 0.934 on the TinyStress-15K benchmark.

## Problem

Most previous research treats sentence stress detection (SSD) and word stress detection (WSD) as completely independent tasks, failing to exploit their shared reliance on underlying acoustic and prosodic cues. Furthermore, subword tokenization often causes token-level SSD probabilities to spread diffusely across multiple tokens inside a single stressed word, creating spatial ambiguity. Addressing these gaps is crucial for building robust automatic pronunciation assessment systems in computer-assisted language learning.

## Method

The method builds upon a frozen whisper-small backbone, extracting hidden states from the ninth encoder and decoder layers. It features two task-specific classification heads: a token-level sentence stress detection branch using a Transformer decoder block and a fully connected network, and an auxiliary phone-level word stress detection branch that uses cross-attention between trainable phone embeddings and Whisper encoder states. To resolve token-level ambiguity within subword spans, a novel word-span stress regularizer (WSR) concentrates the predicted stress probability onto a single dominant token per ground-truth stressed word. The multi-task network is trained end-to-end using cross-entropy losses for SSD and WSD combined with the WSR penalty, with all loss weights set to 1.0.

## Results

Evaluated on the TinyStress-15K corpus, which contains 13,500 training, 1,500 validation, and 1,000 test utterances. The complete STRAW model achieves an SSD F1 score of 0.934 (precision 0.945, recall 0.924), outperforming the alignment-free WhiStress baseline (F1 of 0.909) and traditional MFA-based pipelines (F1 of 0.815). Ablating the auxiliary WSD branch drops the SSD F1 to 0.922, removing the WSR drops it to 0.929, and removing both results in 0.915. Additionally, the auxiliary WSD head attains a consistent F1 of approximately 0.920.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing computer-assisted language learning (CALL) tools and automatic pronunciation assessment (APA) systems for second-language learners.

## Limitations

The current framework simplifies lexical stress by modeling only a single primary position per word without secondary stress, lacks direct hidden-state interaction between the SSD and WSD heads, and is evaluated exclusively on synthetic speech.

## Related

- (link related pages by id as the wiki grows)
