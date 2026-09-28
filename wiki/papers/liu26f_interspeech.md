---
id: liu26f_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-731
---

# A Semantic-Anchor-based Method for Open-Vocabulary Sound Event Detection

**TL;DR** — Learning semantic anchor vectors that novel sound classes can attend to lets an open-vocabulary sound event detector generalize far better to unseen event types than prior retrieval-only query-based methods.

## Problem

Query-based open-vocabulary sound event detection generalizes beyond fixed class sets, but most existing methods only use query vectors for retrieval without building real semantic understanding of events, which limits recognition of genuinely novel classes.

## Method

The authors learn a set of semantic anchor vectors as semantic-level reference tokens so arbitrary events can be understood by attending to them, add bidirectional attention to strengthen query-feature interaction, and design tailored query augmentation for robustness.

## Results

On AudioSet-Strong the method achieves superior accuracy on novel classes, reaching 34.9 PSDS under the open-vocabulary setting and surpassing prior open-vocabulary SED models; cross-dataset evaluation on DESED confirms strong generalization, including 44.1 PSDS1 in zero-shot, exceeding a DESED-supervised baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Open-vocabulary sound event detection for smart home, surveillance, and environmental monitoring systems that need to recognize sound classes beyond a fixed training taxonomy.

## Related

- (link related pages by id as the wiki grows)
