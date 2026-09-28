---
id: li26k_interspeech
category: speech-translation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-695
---

# POTSA: A Cross-Lingual Speech Alignment Framework for Speech-to-Text Translation

**TL;DR** — POTSA uses Optimal Transport on parallel speech pairs to align cross-lingual speech representations, gaining +2.93 BLEU on zero-shot languages for speech-to-text translation using only 10 hours of parallel speech per language.

## Problem

Speech LLMs have advanced multilingual speech-to-text translation, but existing approaches often overlook semantic commonalities across source languages, which biases translation quality toward high-resource languages and away from low-resource ones.

## Method

POTSA (Parallel Optimal Transport for Speech Alignment) first uses a Bias Compensation module to coarsely align initial speech representations across languages, then applies token-level Optimal Transport constraints on a Q-Former using parallel speech pairs for fine-grained representation alignment, with a layer-scheduling strategy that focuses these constraints on the most semantically beneficial layers.

## Results

On FLEURS, POTSA achieves state-of-the-art performance, with +1.29 BLEU averaged over five common languages and +2.93 BLEU on zero-shot languages, using only 10 hours of parallel speech per language.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Data-efficient multilingual speech-to-text translation, especially extending coverage to low-resource and zero-shot languages with minimal parallel speech.

## Related

- (link related pages by id as the wiki grows)
