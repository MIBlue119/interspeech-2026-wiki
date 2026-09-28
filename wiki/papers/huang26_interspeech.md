---
id: huang26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-267
pdf: https://www.isca-archive.org/interspeech_2026/huang26_interspeech.pdf
---

# MVCL-DAF++: Enhancing Multimodal Intent Recognition via Prototype-Aware Contrastive Alignment and Coarse-to-Fine Dynamic Attention Fusion

[PDF](https://www.isca-archive.org/interspeech_2026/huang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-267)

**TL;DR** — MVCL-DAF++ integrates prototype-aware contrastive alignment and coarse-to-fine dynamic attention fusion for multimodal intent recognition, achieving a new state-of-the-art accuracy of 76.18% on MIntRec and 74.39% on MIntRec2.0.

## Problem

Multimodal intent recognition systems often suffer from weak semantic grounding and poor robustness under noisy, rare-class, or long-tailed data conditions. Prior frameworks like MVCL-DAF perform instance-level contrastive alignment without explicit semantic anchors and treat modality inputs as flat token sequences, ignoring hierarchical semantic structures.

## Method

The MVCL-DAF++ framework combines four main components: multi-view representation learning, coarse feature extraction via a modality-aware Transformer encoder, representation regularization, and prototype-aware contrastive alignment. Textual features serve as queries to retrieve cross-modal evidence from visual and acoustic modalities, generating coarse global summaries that are dynamically fused with fine-grained token features. A prototype-aware InfoNCE loss leverages L2-normalized class-level prototypes computed within mini-batches as anchors to enforce semantic consistency. The network is trained using an AdamW optimizer with a learning rate of 2x10^-5, weight decay of 0.2, and batch size of 32 for up to 100 epochs.

## Results

Evaluated on MIntRec and MIntRec2.0 datasets against baselines including MulT, MAG-BERT, TCL-MAP, and MVCL-DAF, MVCL-DAF++ achieves top performance across metrics. On MIntRec, it reaches 76.18% Accuracy, 75.66% Weighted F1, 76.17% Weighted Precision, and 74.39% Recall. On MIntRec2.0, it achieves 74.39% Accuracy, 59.23% Weighted F1, 60.51% Weighted Precision, and 53.96% Recall, notably improving rare-class recognition by +1.05% WF1 on MIntRec and +4.18% WF1 on MIntRec2.0.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building intelligent conversational agents, dialogue systems, and human-centered AI systems that require robust intent inference from text, audio, and visual inputs.

## Related

- (link related pages by id as the wiki grows)
