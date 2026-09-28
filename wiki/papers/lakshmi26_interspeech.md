---
id: lakshmi26_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2368
pdf: https://www.isca-archive.org/interspeech_2026/lakshmi26_interspeech.pdf
---

# The First Dravidian Speech Datasets for Transphobic and Homophobic Hate Speech: Creation, Annotation, and Multimodal Benchmarking

[PDF](https://www.isca-archive.org/interspeech_2026/lakshmi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lakshmi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2368)

**TL;DR** — This paper presents the first annotated speech datasets for homophobic and transphobic hate speech in Telugu and Malayalam, providing a multimodal baseline that achieves up to 0.9566 macro F1 in-domain.

## Problem

Hate speech detection targeting the LGBTQIA+ community is heavily text-centric and largely neglects low-resource Dravidian languages like Telugu and Malayalam. Furthermore, prior text-based methods overlook critical paralinguistic cues such as tone, pitch, and prosody that are central to expressing hostility in spoken audio. The lack of standardized speech corpora in these languages hinders the development of robust, real-world audio-based content moderation tools.

## Method

The authors curate two complementary corpora per language: an Elicited Speech Dataset of controlled read prompts and a Social Media Audio Extract Dataset of spontaneous online speech. Audio is processed via WebRTC VAD and modeled using pre-trained Wav2Vec 2.0 encoders for speech embeddings and IndicBERT via Whisper transcripts for text embeddings. A lightweight attention mechanism fuses the two modalities, feeding into a multi-scale classifier featuring parallel branches with LayerNorm, ReLU, and Dropout.

## Results

Evaluated on Telugu and Malayalam across three data splits using macro F1-score, the in-domain elicited setup (Config 1) yields top multimodal F1-scores of 0.9566 (Telugu) and 0.8652 (Malayalam), outperforming speech-only and text-only baselines. Under cross-domain evaluation (Config 2: train on elicited, test on social media), performance drops significantly (e.g., down to 0.4721 for Malayalam multimodal), revealing severe acoustic transfer bottlenecks. A hybrid training setup (Config 3) recovers partial performance, demonstrating that limited target-domain exposure aids generalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Content moderators, social media platforms, and trust-and-safety engineers can utilize these datasets and models to automatically detect homophobic and transphobic hate speech in low-resource Dravidian audio streams.

## Limitations

The corpora exhibit a modest speaker count with a male demographic skew, and real-world social media audio introduces noise, overlap, and transcription errors that impair cross-modal alignment.

## Related

- (link related pages by id as the wiki grows)
