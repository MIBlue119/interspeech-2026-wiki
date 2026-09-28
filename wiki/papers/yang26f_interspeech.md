---
id: yang26f_interspeech
category: acoustic-scene-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-821
pdf: https://www.isca-archive.org/interspeech_2026/yang26f_interspeech.pdf
---

# Geometry-Informed Distributed Acoustic Scene Understanding

[PDF](https://www.isca-archive.org/interspeech_2026/yang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-821)

**TL;DR** — A geometry-informed distributed acoustic scene understanding framework fuses multi-room microphone inputs using spatial graph neural networks and leverages a frozen large language model to generate physically consistent narrative descriptions, achieving a Triplet F1-score of 0.87.

## Problem

Acoustic scene monitoring in multi-room environments often fails because walls and doors block or muffle sound signals, creating non-line-of-sight zones where central acoustic sensors miss events. Traditional distributed approaches treat sounds as isolated data points and ignore the physical topology of the environment, causing non-physical jumps and fragmented predictions. Without explicit geometric awareness, systems cannot effectively weigh competing sensor inputs or infer missing intermediate transitions.

## Method

The framework models multi-room environments as a topological graph where vertices are $N=6$ distributed microphone nodes and edges encode distance and wall attenuation properties. An Audio Spectrogram Transformer (AST) extracts log-Mel features from each node, which are combined with spatial coordinates and processed via spatial graph message passing and Gated Recurrent Units (GRUs). A query-based attention decoder translates these spatio-temporal embeddings into discrete semantic triplets representing subjects, relations, and objects. Finally, a frozen Meta Llama-3-8B-Instruct model ingests the linearized semantic triplets alongside textual floor plan geometry to synthesize a chronologically coherent narrative.

## Results

Evaluated on a custom pyroomacoustics-based simulator with 2 to 4 rooms, RT60 reverberation from 0.2 to 0.6 seconds, and background noise between 20 and 40 dB SNR using LibriSpeech and ESC-50 audio sources. The full framework achieves a Triplet F1-score of 0.87, a BERTScore of 0.78, and a Spatial Consistency Score (SCS) of 88.2%, outperforming a centralized baseline (Triplet F1 of 0.51) and a distributed acoustic-only baseline (Triplet F1 of 0.74). Ablation studies show that removing the geometry prior drops SCS to 66.5%, while removing spatial-temporal graph fusion lowers the Triplet F1-score to 0.81.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart home monitoring, elderly care, and indoor security systems requiring long-term, non-intrusive acoustic event tracking across multiple rooms.

## Limitations

The study is restricted to controlled simulation environments without real-world physical testbed deployment.

## Related

- (link related pages by id as the wiki grows)
