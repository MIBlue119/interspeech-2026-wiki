---
id: barreiros26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1444
pdf: https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.pdf
---

# Massive Open-Vocabulary Keyword Spotting

*Leonor Barreiros, Raul Monteiro, Afonso Mendes, Gonçalo M. Correia*

[PDF](https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1444)

**TL;DR** — This paper proposes a three-stage embedding compression pipeline for open-vocabulary keyword spotting combined with contextual biasing in ASR, reducing memory footprint by 128x and latency by 6x without sacrificing entity recall.

## Key contributions

- An automated sparse layer selection strategy using sparsemax and entropy regularization to identify the most predictive transformer layers for KWS.
- A hierarchical embedding compression mechanism combining layer selection, hidden dimension reduction via a lightweight FFN, and temporal resolution reduction via a 1D CNN.
- A production-scale evaluation demonstrating 128x smaller memory footprint and 6x faster processing compared to uncompressed acoustic-based contextual biasing baselines.
- Demonstration that compressed acoustic features match uncompressed performance even on unseen languages and noisy domain-specific corpora.

## Problem

Automatic speech foundation models like Whisper struggle to transcribe rare, specialized terminology in the tail of the word distribution, such as medical or air traffic control jargon. Contextual biasing using open-vocabulary keyword spotting (OV-KWS) mitigates this by detecting keywords in audio and prompting the ASR decoder, but existing approaches rely on uncompressed high-dimensional acoustic representations (e.g., from Whisper encoder layers). Processing large glossaries with thousands of entries creates an infeasible memory and latency bottleneck, while text-only embedding approaches lose crucial pronunciation information.

## Method

The system builds on Whisper-large-v2 as an acoustic encoder, mapping utterance and keyword audios into continuous representations which are compared via cosine similarity matrices scored by a ResNet-50 binary classifier. To overcome the resource bottleneck, the authors introduce a threefold compression pipeline. First, sparse layer selection uses a trainable score vector with a sparsemax activation and an entropy auxiliary loss to automatically identify the most predictive transformer layers (specifically layers 14, 16, and 32 out of 32). Second, a one-hidden-layer feed-forward network (FFN) compresses the hidden dimension from h = 1280 down to h_comp = 64. Third, a 1D convolutional neural network with kernel size 3, stride 1, and max-pooling (kernel size 3, stride 2) reduces the temporal resolution by a factor of alpha = 2.

During inference, pre-computed keyword databases are stored in this heavily compressed format. When an audio query arrives, its compressed utterance embeddings are matched against the compressed glossary embeddings using the ResNet-50 classifier. The detected hotwords are then passed directly to WhisperX's prompt conditioning mechanism, bypassing historical context tokens to bias the decoder toward generating the specialized terminology.

## Experimental setup

Training data comprised 25 hours per language across six languages (English, French, German, Polish, Portuguese, Spanish) extracted from Multilingual Librispeech (MLS) with 12,000 synthetic (edge-tts) and natural keywords per language. Evaluation used Aishell (Chinese, 76 mins, 400 entities), ACL6060 (English, 51 mins, 200 entities), and an internal Portuguese clinical dataset (103 mins, 16,062 entities). Metrics include F1-score, F1@5 for massive glossaries, Mixed Error Rate (MER), entity recall, Real Time Factor (RTF), and database memory footprint in MB. Experiments were run on a single NVIDIA L40 GPU.

## Results

On the Aishell-test dataset, the fully compressed LHF-comp model achieved an F1 of 86±4 and an entity recall of 71.3% with an RTF of 0.10 and a memory footprint of just 22 MB, compared to the uncompressed baseline recall of 59.3% at 2,812 MB. On the challenging technical ACL6060 corpus, LHF-comp reached an F1 of 69±4 and recall of 57.2% (RTF 0.17, memory 11 MB), outperforming the baseline recall of 54.3%. On the massive internal medical corpus featuring 16,062 terms, LHF-comp successfully processed the glossary in 0.76 RTF with 882 MB of memory, whereas the baseline required 4.52 RTF and 112,929 MB (exceeding GPU memory). 

Ablations show that progressive compression steps improve performance: L-comp alone yields lower F1, LH-comp improves it, and LHF-comp achieves the best trade-off by enabling sufficient capacity for the projection network. However, on the massive uncurated internal corpus, contextual biasing led to degraded MER (32.4 vs 29.5 No-CB) due to distractor words causing false positives and hallucinations in Whisper's prompt mechanism.

| System | ACL6060 MER | ACL6060 Recall | Aishell MER | Aishell Recall | Internal RTF | Internal Memory (MB) |
|---|---|---|---|---|---|---|
| No-CB (ours) | 27.6 | 52.5 | 18.0 | 40.2 | 0.07 | 0.0 |
| Baseline recr. [11] | 27.0 | 54.3 | 24.9 | 59.3 | 4.52 | 112,929 |
| LHF-comp | 21.9 | 57.2 | 14.7 | 71.3 | 0.76 | 882 |

## Limitations

The approach suffers from increased ASR word error rates when applied to massive uncurated glossaries because common distractor terms trigger false positives in the KWS model, which subsequently causes Whisper to hallucinate. The evaluation relies heavily on synthetic TTS audio for keyword database creation, and performance depends heavily on the quality of voice-activity detection (VAD) segmenting long-form audio.

## Why read this

Speech and ML engineers scaling ASR systems to production environments with large custom terminology glossaries should read this paper to learn how to apply sparse layer selection and multi-dimensional tensor compression to acoustic embeddings without losing entity recall.

## Code

- https://github.com/Priberam/Enhance-CB-Whisper

## Applications

Domain-specific automatic speech recognition systems for legal, financial, air traffic control, and clinical medical consultations requiring massive open-vocabulary keyword biasing.

## Related

- (link related pages by id as the wiki grows)
