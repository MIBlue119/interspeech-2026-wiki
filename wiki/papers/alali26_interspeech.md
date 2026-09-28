---
id: alali26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-327
pdf: https://www.isca-archive.org/interspeech_2026/alali26_interspeech.pdf
---

# Personal Attribute Leakage in Federated Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/alali26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alali26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-327)

**TL;DR** — This paper demonstrates that personal attributes like accent and age can be reliably inferred from weight updates in federated automatic speech recognition models, achieving up to 100% attack success.

## Problem

Federated learning prevents raw audio transmission to protect user privacy, but model weight updates can still leak sensitive data. In speech processing, the extent to which private demographic, clinical, and emotional attributes can be extracted directly from weight differentials without raw audio remains largely unexplored. This vulnerability poses serious profiling and surveillance risks that violate privacy regulations like GDPR and HIPAA.

## Method

The authors propose a non-parametric white-box attribute inference attack under a passive server-side threat model. Given global and locally fine-tuned model weights (based on single-utterance personalization), the attacker extracts summary statistics—mean, standard deviation, minimum, and maximum—from each parameter tensor to construct a fixed-length feature vector. Shadow models trained on public datasets provide class centroids, and unseen target models are classified by computing normalized Euclidean distances to these centroids. The attack is evaluated across three base ASR architectures: Wav2Vec2-Base (95M parameters), HuBERT-Large (300M parameters), and Whisper-Small (244M parameters).

## Results

Evaluated across five attributes using datasets including the Speech Accent Archive, TORGO, and RAVDESS. Accent and age exhibited severe leakage, with Wav2Vec2 achieving 100% accuracy for both. Gender was harder to predict, yielding near-chance accuracies between 46% and 64%. Whisper-Small consistently leaked attributes at over 70% accuracy across most categories (e.g., 81% for dysarthria, 83% for calm vs. angry emotion). Fine-tuning models on a diverse range of accents sharply dropped multi-class accent attack success below 20%, proving that underrepresentation in pre-training data drives vulnerability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and security auditors building privacy-preserving federated speech recognition systems can use these findings to evaluate and mitigate personal attribute leakage in distributed training deployments.

## Limitations

The attack assumes the adversary has access to public datasets to simulate shadow models with known attributes for crafting class centroids.

## Related

- (link related pages by id as the wiki grows)
