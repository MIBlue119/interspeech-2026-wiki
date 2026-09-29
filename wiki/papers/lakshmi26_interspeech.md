---
id: lakshmi26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, self-supervised, dataset-or-benchmark-release, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2368
pdf: https://www.isca-archive.org/interspeech_2026/lakshmi26_interspeech.pdf
---

# The First Dravidian Speech Datasets for Transphobic and Homophobic Hate Speech: Creation, Annotation, and Multimodal Benchmarking

*K N Lakshmi, K Hemavardhan Reddy, A Venkata Satya, Kota Venkata Vamshidhar Reddy, Jyothish Lal G, Premjith B, Jesin James*

[PDF](https://www.isca-archive.org/interspeech_2026/lakshmi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lakshmi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2368)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `self-supervised`, `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — This paper presents the first annotated speech datasets for homophobic and transphobic hate speech in the Dravidian languages Telugu and Malayalam, featuring both elicited and social media audio corpora, alongside a Wav2Vec 2.0 and IndicBERT multimodal fusion baseline. The multimodal approach achieves high in-domain F1 scores (0.9566 in Malayalam) but experiences severe performance degradation under domain shift.

## Key contributions

- Created the first annotated speech datasets for homophobic and transphobic hate speech in two low-resource Dravidian languages (Telugu and Malayalam).
- Constructed two complementary corpora: an Elicited Speech Dataset (controlled read speech) and a Social Media Audio Extract Dataset (spontaneous, noisy speech).
- Developed a multimodal baseline framework fusing Wav2Vec 2.0 acoustic features and IndicBERT text embeddings via an attention-based multi-scale classifier.
- Evaluated model robustness across matched (in-domain), cross-domain, and hybrid conditions, exposing significant acoustic transfer challenges.

## Problem

Hate speech detection research has heavily favored text modalities and high-resource languages like English, completely overlooking low-resource Dravidian languages and speech-based paralinguistic markers. Text-based systems fail to capture critical cues such as tone, pitch, prosody, and sarcasm that heavily dictate hate expression in real-world audio. This work tackles this gap by building the foundational speech resources and benchmarks required to detect homophobic and transphobic rhetoric in Telugu and Malayalam.

## Method

The pipeline processes audio sampled at 16 kHz, 16-bit mono, with non-speech segments trimmed using WebRTC VAD (aggressiveness 2). Acoustic embeddings are extracted using pre-trained Wav2Vec 2.0 models (krishnateja/wav2vec2-telugu and gvs/wav2vec2-large-xlsr-malayalam), where the last hidden layer is mean-pooled to generate 1024-D utterance vectors. Text transcripts are obtained via Whisper (openai/whisper-large-v3 and thennal/whisper-medium-ml) and encoded using IndicBERTv2-MLM-only, taking the 768-D [CLS] token representation. To align representations, speech embeddings are linearly projected from 1024-D down to 768-D.

The core model uses an attention-based lightweight fusion module (Linear + ReLU + Softmax) to compute modality weights and form a weighted sum of the speech and text embeddings. This combined representation is passed into a multi-scale classifier featuring two parallel branches (512 and 256 units, respectively, with LayerNorm, ReLU, and Dropout layers) to output logits for three classes: Homophobia, Transphobia, and None.

Models are trained using cross-entropy loss and the Adam optimizer with a learning rate of 1e-5, early stopping patience of 20, and evaluated using accuracy and macro F1 score on an Intel i7-12700H CPU and NVIDIA RTX 3050 Ti GPU setup.

## Experimental setup

Evaluated on newly created datasets: Elicited Speech (630 Telugu files, 269 Malayalam files) and Social Media Audio Extracts (73 Telugu files, 100 Malayalam files) annotated by three native speakers (Cohen's Kappa: 0.78 for Telugu, 0.77 for Malayalam). Tested across three configurations: Config 1 (In-domain 80/20 elicited split), Config 2 (Cross-domain: train on elicited, test on social media), and Config 3 (Hybrid: train on elicited + test subset, test on social media plus remaining). Compared against unimodal speech-only (Wav2Vec 2.0 + BiLSTM-attention) and text-only (IndicBERT) baselines.

## Results

In in-domain evaluation (Config 1), the multimodal fusion model achieves top performance with an F1-score of 0.9566 in Malayalam and 0.8652 in Telugu, outperforming speech-only (0.8800 ML / 0.8200 TE) and text-only (0.8300 ML / 0.8500 TE) baselines. Under cross-domain conditions (Config 2), performance drops steeply by 50.6% in Malayalam (to 0.4721) and 31.7% in Telugu (to 0.5907) due to acoustic variance and ASR transcription errors. In this cross-domain regime, text-only models demonstrate higher resilience, outperforming multimodal fusion (e.g., Malayalam text-only achieves 0.7100 vs multimodal 0.4721), showing that semantic patterns transfer better than acoustic ones when signal-to-noise ratios vary.

| Configuration | Language | Speech-only | Text-only | Multimodal |
|---|---|---|---|---|
| Config 1 (In-domain) | Malayalam | 0.8800 | 0.8300 | 0.9566 |
| Config 1 (In-domain) | Telugu | 0.8200 | 0.8500 | 0.8652 |
| Config 2 (Cross-domain) | Malayalam | 0.5408 | 0.7100 | 0.4721 |
| Config 2 (Cross-domain) | Telugu | 0.6200 | 0.7600 | 0.5907 |
| Config 3 (Hybrid) | Malayalam | 0.6000 | 0.7800 | 0.6080 |
| Config 3 (Hybrid) | Telugu | 0.7500 | 0.8400 | 0.7617 |

## Limitations

The datasets feature a modest total size and a slight male skew in speaker demographics. Social media samples are restricted to specific platforms (YouTube, Instagram) and contain environmental noise, overlapping speech, and slang that exacerbate cross-modal alignment errors. Generalizability across a broader range of regional dialects and expanded speaker pools remains untested.

## Why read this

Researchers building speech-based hate detection systems for low-resource or agglutinative languages will find this paper essential for its novel corpora and stark empirical analysis of acoustic domain shift. It highlights the exact failure modes of multimodal fusion when transferring from clean read speech to noisy, real-world social media audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated content moderation on audio-centric social media platforms, toxic speech detection for under-resourced languages, and speech safety toolkits.

## Institutions / 機構

Amrita Vishwa Vidyapeetham, University of Auckland

## Related

- (link related pages by id as the wiki grows)
