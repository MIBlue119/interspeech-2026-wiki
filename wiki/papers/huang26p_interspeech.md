---
id: huang26p_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3532
pdf: https://www.isca-archive.org/interspeech_2026/huang26p_interspeech.pdf
---

# EII-SCL: Harnessing Emotional Inertia for Multimodal Emotion Recognition in Conversation

[PDF](https://www.isca-archive.org/interspeech_2026/huang26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3532)

**TL;DR** — The paper introduces Emotional Inertia-Informed Supervised Contrastive Learning (EII-SCL), a module that models psychological emotional inertia to improve multimodal emotion recognition in conversation, achieving state-of-the-art results on IEMOCAP and MELD.

## Problem

Current multimodal emotion recognition in conversation (MERC) methods model contextual dependencies using graph neural networks or transformers but overlook emotional inertia—the human psychological tendency for emotional states to resist abrupt change. Ignoring this temporal persistence and gradual transition of emotions between adjacent utterances from the same speaker limits the model's ability to learn discriminative feature representations, leading to suboptimal performance and high misclassification rates among ambiguous emotion pairs.

## Method

The EII-SCL module integrates with existing MERC backbone architectures (such as MM-DialogueGCN and MM-Transformer) by operating on fused multimodal utterance embeddings. It extracts text, audio, and visual features using pre-trained RoBERTa, Wav2vec2.0, and CLIP encoders, processes them via bidirectional GRUs, and fuses them. EII-SCL then dynamically computes an attention-weighted temporal inertia window size for each utterance from the same speaker. Using this window, it constructs a supervised contrastive loss that separates easy-negatives from hard-negatives (same-speaker utterances with different emotion labels within the inertia window), applying a dynamic weighting mechanism based on cosine similarity to avoid over-penalization. The model is jointly optimized using standard cross-entropy loss combined with the EII-SCL loss scaled by $\alpha = 0.02$.

## Results

Evaluated on the IEMOCAP (using LOSO cross-validation) and MELD benchmark datasets using accuracy and weighted F1-score (w-F1). When integrated into MM-DialogueGCN, EII-SCL improves accuracy from 72.53% to 73.95% on IEMOCAP. When integrated into MM-Transformer, it achieves top performance, outperforming baselines like DialogGCN, MMGCN, CFN-ESA, AdaIGN, DER-GCN, and FEMI. Ablation analyses demonstrate that hard-negatives within the inertia window exhibit significantly higher average similarity compared to easy-negatives (e.g., a 0.3645 gap at $\omega=1$), and that the attention-based dynamic window outperforms fixed-size window configurations. Furthermore, EII-SCL reduces misclassification rates on ambiguous emotion pairs such as Excited-Happy and Neutral-Frustrated.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building human-computer interaction systems, conversational AI agents, and intelligent healthcare applications that require accurate utterance-level emotion recognition from multimodal dialogue data.

## Related

- (link related pages by id as the wiki grows)
