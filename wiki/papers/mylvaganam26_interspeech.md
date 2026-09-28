---
id: mylvaganam26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1789
pdf: https://www.isca-archive.org/interspeech_2026/mylvaganam26_interspeech.pdf
---

# Hybrid Continual Learning for Low-Resource Australian Aboriginal Language Identification

[PDF](https://www.isca-archive.org/interspeech_2026/mylvaganam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mylvaganam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1789)

**TL;DR** — The paper introduces two hybrid continual learning methods—Replay-Augmented Elastic Weight Consolidation (RA-EWC) and Constraint-Guided Knowledge Distillation (CG-KD)—to adapt pretrained language identification models to extremely low-resource Australian Aboriginal languages while preventing catastrophic forgetting.

## Problem

Integrating endangered Australian Aboriginal languages (AALs) into speech technologies is hindered by severe data scarcity and a lack of speaker diversity. Adapting high-resource multilingual models via standard transfer learning causes catastrophic forgetting of previously learned languages, while standalone continual learning techniques struggle with extreme data imbalances. Consequently, building inclusive speech tools requires robust adaptation methods that can absorb tiny new datasets while preserving prior knowledge.

## Method

The proposed frameworks adapt a pretrained ECAPA-TDNN language identification backbone trained on VoxLingua107. RA-EWC combines negative log-likelihood loss for low-resource target data, experience replay loss from a small high-resource buffer, and a Fisher Information Matrix-based EWC regularization loss to freeze critical parameters, keeping the encoder frozen and updating only the classifier. CG-KD integrates student-teacher knowledge distillation via Kullback-Leibler Divergence on softened logits, EWC weight constraints, and target language negative log-likelihood, jointly updating both the encoder and the classifier. Models are optimized using AdamW for 3 epochs with a batch size of 32.

## Results

Evaluated on Warlpiri (1,125 utterances), Dalabon (284 utterances), and Dharawal (63 utterances) alongside 33 high-resource languages (HRL) from VoxLingua107, measured using F1-score. Naive transfer learning drops HRL performance from 90.72% to 62.47%. CG-KD achieves superior overall balance, attaining 100% on Warlpiri and 87.41% HRL (93.38% overall), 100% on Dalabon and 76.58% HRL (85.68% overall), and 100% on Dharawal and 68.96% HRL (76.41% overall). RA-EWC similarly outperforms baselines like EWC, ER, and KD alone across all three low-resource adaptation tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building speech recognition, translation, or archiving tools for indigenous and extremely low-resource language communities.

## Limitations

Tested strictly on single and sequential adaptation scenarios over three Australian Aboriginal languages with very limited audio data sizes.

## Related

- (link related pages by id as the wiki grows)
