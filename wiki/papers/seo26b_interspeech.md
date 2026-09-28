---
id: seo26b_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2167
pdf: https://www.isca-archive.org/interspeech_2026/seo26b_interspeech.pdf
---

# Hard Positive-targeted Training for Robust Audio Deepfake Detection under Neural Codec Processing

[PDF](https://www.isca-archive.org/interspeech_2026/seo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2167)

**TL;DR** — This paper proposes a hard positive-targeted training strategy using guidance and triplet losses to enhance audio deepfake detection robustness against neural codec processing, lowering total EER to 10.93% on SSL-Conformer.

## Problem

Neural audio codec (NC) compression is increasingly common in speech pipelines, but it degrades audio deepfake detection (ADD) performance by introducing artifacts that obscure spoofing traces. The authors discover through embedding analysis that this robustness drop is primarily driven by bonafide-side errors, where NC-processed genuine speech shifts heavily into the spoof region. Traditional naive data augmentation fails to adequately resolve this overlapping decision boundary issue.

## Method

The authors introduce a proactive mini-batch construction scheme centered around a clean bonafide anchor paired with NC-processed bonafide positives and mixed clean/NC spoof negatives. From this batch, they mine hard positive samples (the positive embedding farthest from the anchor) and jointly optimize the model using a standard cross-entropy loss, a margin-based guidance loss driven by the Softplus function, and a standard triplet loss. This multi-objective optimization explicitly enlarges the embedding space distance between boundary-adjacent NC bonafide and spoof samples while anchoring genuine representations. Experiments use wav2vec 2.0 XLS-R based SSL-Conformer and SSL-AASIST backends, trained on ASVspoof2019 LA augmented with BigCodec and SpeechTokenizer samples.

## Results

Evaluated across diverse datasets including VCTK, LibriSpeech, VoxCeleb, ASVspoof2019, ASVspoof2021 DF, and In-the-Wild, using both seen (BigCodec, SpeechTokenizer) and unseen (EnCodec, FunCodec) codecs. For SSL-Conformer, the proposed method reduces the total Equal Error Rate (EER) from 24.36% (baseline) down to 10.93%, substantially outperforming naive data augmentation (23.11%). For SSL-AASIST, total EER drops from 29.01% to 11.45%. On unseen codecs alone, SSL-Conformer EER drops from 30.19% to 11.83%. Ablation studies confirm that removing either the guidance loss or the triplet loss increases EER, proving the necessity of both components.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building robust speech security systems, automated speaker verification front-ends, or audio deepfake detectors that must operate reliably on compressed audio streams.

## Limitations

The approach assumes access to paired clean anchors and diverse neural codec variations during training to construct boundary-aware mini-batches.

## Related

- (link related pages by id as the wiki grows)
