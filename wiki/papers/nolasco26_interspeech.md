---
id: nolasco26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2759
pdf: https://www.isca-archive.org/interspeech_2026/nolasco26_interspeech.pdf
---

# Beyond task performance: Decoding bioacoustic embeddings with speech features

[PDF](https://www.isca-archive.org/interspeech_2026/nolasco26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nolasco26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2759)

**TL;DR** — A regression-probing framework evaluates six pretrained audio models across eight-eight eGeMAPS acoustic features and six bioacoustic datasets, revealing that loudness is easily recovered while fundamental frequency (F0) is poorly encoded.

## Problem

Pretrained audio embeddings dominate computational bioacoustics, but their internal representations remain largely opaque, making it difficult to know which acoustic properties are preserved or discarded. Without interpretability guidelines, engineers rely purely on downstream task benchmarking, leading to a lack of principled model selection strategies for rare species or data-scarce domains.

## Method

The authors extract 88 interpretable acoustic descriptors (eGeMAPS) covering spectral, temporal, cepstral, and modulation properties across six bioacoustic and speech datasets (dogs, mosquitoes, bats, marine mammals, birds, speech). They evaluate six pretrained audio models (BEATS base, NatureLM, BirdMAE, BirdNET, EffNet all, and Perch) alongside a concatenated embedding model. Both linear (ridge regression) and non-linear (shallow MLP with 256 units and ReLU) regression probes are applied to measure feature recoverability from the final-layer time-averaged embeddings. Normalised Mutual Information (NMI) is calculated to connect feature recoverability to actual task relevance per species taxonomic group.

## Results

Evaluating across datasets and models using linear and non-linear probes shows a 'no free lunch' pattern where no single model captures the full feature space, though BirdMAE and BEATS base generally perform best as encoders. Loudness features are best encoded (linear R2 up to 0.76), whereas F0 is the hardest to recover (R2 around 0.33). Non-linear MLPs yield only small improvements in R2 (maximum +0.08), indicating high representational linearity or entanglement limitations in the final layer. Pairwise embedding probes (Emb2Emb) demonstrate that BirdMAE and EffNet are partially predictable by others while BirdNET is the least predictable, confirming distinct extraction capabilities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working in bioacoustics, wildlife monitoring, and ecological conservation can use this framework to select pretrained audio encoders tailored to the acoustic features most relevant to their target species.

## Limitations

The eGeMAPS feature set is optimized for human speech and may poorly represent non-human signals or fail in noisy natural environments, and time-pooling embeddings may lose crucial temporal dynamics.

## Related

- (link related pages by id as the wiki grows)
