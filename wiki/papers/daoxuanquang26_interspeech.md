---
id: daoxuanquang26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1542
pdf: https://www.isca-archive.org/interspeech_2026/daoxuanquang26_interspeech.pdf
---

# M-LAMA: Multimodal Automated Scoring of Long-form Spoken English

*Minh Dao-Xuan-Quang, Son Dinh-Nguyen, Thi-Mai-Anh Bui, Phi-Le Nguyen*

[PDF](https://www.isca-archive.org/interspeech_2026/daoxuanquang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/daoxuanquang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1542)

**TL;DR** — M-LAMA is a structured cross-modal framework for automated long-form speech assessment that integrates raw audio, ASR transcripts, and question prompts through dual encoders and a discourse-aware fusion decoder, reducing MAE by up to 29.8% over open-source baselines.

## Key contributions

- Part-aware hierarchical audio modeling that chunks multi-minute responses (3-5 minutes) into structured discourse sections using attention pooling.
- A question-aware text module enabling explicit task fulfillment evaluation by conditioning transcript representations on exam prompts.
- A progressive three-stage training strategy (contrastive alignment, range-aware classification, and fine-grained regression) addressing bell-curve score distribution skew.
- Extensive benchmarking on an authentic exam-style dataset of 87,226 full-length sessions evaluated across five scoring criteria.

## Problem

Prior automated speech assessment (ASA) research predominantly targets short-form utterances or isolated pronunciation tasks, ignoring multi-minute spontaneous responses required by exams like IELTS, TOEFL, and TOEIC. Existing public speech corpora either lack proficiency annotations (e.g., LibriSpeech, Common Voice) or provide only phrase-level labels (e.g., speechocean762), while high-stakes exam datasets are locked behind strict confidentiality constraints. Furthermore, standard models struggle with bell-curve score distributions that cause mean-biased predictions, and naive feature concatenation fails to capture complex interactions between acoustic delivery and linguistic content.

## Method

M-LAMA employs a dual-stream encoder taking raw audio and ASR transcripts. The acoustic branch uses a frozen Whisper-large-v3-turbo encoder to extract frame-level features, processed via a bottleneck adapter (dimension 512) and segmented into three exam discourse parts composed of six 30-second chunks each, incorporating temporal and chunk position embeddings. The text stream uses a frozen Qwen2-1.5B-Instruct model processing transcripts and question prompts. A question-aware text module projects question embeddings into key-value spaces using learnable matrices to condition the transcript queries. 

Bidirectional cross-modal attention models the interplay between what is said and how it is delivered via text-to-audio and audio-to-text attention blocks. A gated multimodal fusion mechanism then combines four semantic views (question-aware text, structured audio, and two cross-modal representations) using dynamic weighting and a bilinear interaction term. 

The training uses a progressive three-stage optimization strategy: Stage 1 performs contrastive alignment; Stage 2 applies range-aware classification over coarse proficiency bands (Low, Mid, High); and Stage 3 trains a fine-grained regression head over 21 score bins (0-10 in 0.5 increments) using a composite loss combining Mean Absolute Error (MAE) and a Focal Loss term modulated by a gamma parameter to penalize hard samples.

## Experimental setup

Experiments use a proprietary dataset of 86,491 exam sessions from 29,034 candidates spanning ~4,845 hours of speech, split at the candidate level with 2,647 candidates in the test set. Baselines include commercial APIs (GPT-4o Audio, Gemini 2.5 Flash, Gemini 2.5 Pro evaluated on a 1,000-sample subset) and open-weight models (Qwen-2 Audio, Qwen-2.5 Omni, Audio Flamingo 3 fine-tuned on the training set). Evaluation metrics include Mean Absolute Error (MAE), Quadratic Weighted Kappa (QWK), and Accuracy within Error 1 (Acc@1) across Pronunciation, Vocabulary, Grammar, Discourse Management, and Fluency. Models are implemented with Qwen2-1.5B and Whisper-large-v3-turbo, using AdamW (lr=1e-6, batch size 4) on a single NVIDIA A100 80GB GPU.

## Results

M-LAMA (Multi-stage) outperforms all baselines significantly across all five evaluation criteria. Compared to the strongest open-source baseline (Qwen-2.5 Omni) on the full test set, it reduces MAE by 26.5% to 29.8%, improves QWK by 6.1% to 10.3%, and increases Acc@1 by 33.0% to 42.6%. The multi-stage training strategy heavily outperforms single-stage training; for example, Fluency Acc@1 jumps from 81.72% to 91.39% due to better mitigation of mid-score dataset dominance (85.38% of samples lie in the 4-7 score range). 

Unimodal ablations demonstrate that text-only (49.30% Acc@1) and audio-only (43.46% Acc@1) perform drastically worse than the multimodal combination (90.82% Acc@1), confirming that both modalities capture non-redundant properties. Leave-one-out chunk analysis reveals a monotonic positional gradient where earlier response chunks yield slightly higher performance drops upon masking than later chunks.

| System / Condition | Pronunciation MAE | Pronunciation QWK | Pronunciation Acc@1 | Fluency MAE | Fluency QWK | Fluency Acc@1 |
|---|---|---|---|---|---|---|
| Qwen-2.5 Omni [22] | 0.91 | 0.78 | 62.79 | 0.84 | 0.82 | 66.53 |
| Audio Flamingo 3 [10] | 1.10 | 0.73 | 61.50 | 1.15 | 0.69 | 53.00 |
| M-LAMA (Single-stage) | 0.83 | 0.84 | 76.73 | 0.76 | 0.86 | 81.72 |
| M-LAMA (w/o Q-A Module) | 0.66 | 0.88 | 85.46 | 0.61 | 0.89 | 88.33 |
| M-LAMA (Multi-stage) | 0.65 | 0.86 | 89.57 | 0.59 | 0.87 | 91.39 |

## Limitations

The primary dataset cannot be publicly released due to strict confidentiality constraints tied to high-stakes commercial certification exams, limiting direct data replication without access to an equivalent institutional partner. The current scope is restricted to spoken English and relies heavily on the domain characteristics of 3-5 minute structured certification tasks, leaving cross-lingual and open-ended conversational generalization unverified.

## Why read this

Speech and ML engineers building automated assessment pipelines or complex multimodal scoring systems should read this paper to learn how to apply hierarchical discourse chunking and staged distribution-aware training to highly skewed, multi-minute speech domains.

## Code

- https://github.com/cssi87m/M-LAMA

## Applications

Automated language proficiency testing platforms, intelligent computer-assisted language learning (CALL) software, and standardized oral exam scoring systems.

## Related

- (link related pages by id as the wiki grows)
