---
id: wu26m_interspeech
category: speech-deepfake-detection
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3019
pdf: https://www.isca-archive.org/interspeech_2026/wu26m_interspeech.pdf
---

# SEA-Spoof: Bridging the Gap in Multilingual Audio Deepfake Detection for South-East Asia

*Jinyang Wu, Nana Hou, Zihan Pan, Qiquan Zhang, Sailor Hardik, Soumik Mondal*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3019)

**TL;DR** — SEA-Spoof is the first large-scale audio deepfake detection dataset for six South-East Asian languages, comprising 711 hours of paired real and synthetic speech. Benchmarking reveals that top models trained on Western data collapse on SEA languages (up to 61.4% EER), but fine-tuning on SEA-Spoof restores performance to 0.2% EER.

## Key contributions

- Releases SEA-Spoof, a 711-hour balanced dataset covering Tamil, Hindi, Thai, Indonesian, Malay, and Vietnamese with exact transcript-level real-fake pairings.
- Integrates 10 open-source and 4 closed-source state-of-the-art TTS and voice cloning generation engines (including HeyGen, ElevenLabs, MiniMax, and ChatGPT-4o-mini-TTS).
- Exposes severe cross-lingual and cross-source generalization failure of prominent detectors like AASIST, AASIST3, and MoLEx on regional SEA data.
- Demonstrates that localized fine-tuning successfully bridges the domain gap, dropping error rates down to near-zero.

## Problem

State-of-the-art speech anti-spoofing datasets like ASVspoof5, In-TheWild, and CodecFake focus predominantly on English and Chinese, leaving South-East Asian (SEA) languages heavily underrepresented. This causes a critical generalization gap when detectors are deployed in regions with distinct tonal (Thai, Vietnamese) and non-tonal (Hindi, Tamil, Malay, Indonesian) prosody. Consequently, models achieving stellar performance on Western benchmarks collapse entirely when confronted with localized or commercial API-generated regional deepfakes.

## Method

The SEA-Spoof dataset is constructed by pairing authentic bona-fide studio and conversational speech recordings from 7 established corpora (Mozilla Common Voice, Indic Speech, GigaSpeech2, Malay Conversational, Thai Dialect, VIVOS) with identical text prompts synthesized via 14 generation systems. The open-source tier utilizes 10 models (VITS-MMS, Edge-TTS, XTTS-v2, FastSpeech2, Indic-TTS, F5-TTS, Tacotron2, MelGAN-FastSpeech2, FastPitch, and Glow-TTS), while the closed-source black-box tier uses 4 commercial providers (HeyGen, ElevenLabs, MiniMax, ChatGPT-4o-mini-TTS). All audio files are resampled to 16 kHz and stored in FLAC format, yielding a balanced 1:1 real-to-fake split totaling 439,718 training utterances across 711.1 hours.

For detection experiments, the paper employs the MoLEx framework built on a 12-layer WavLM transformer backbone with frozen pre-trained weights. The trainable architecture incorporates 12 Mixture-of-Experts (MoE) layers (expert rank 32, top-k=4, extended expert factor 1), an attentive merging block, and a single-layer LSTM classifier with a hidden size of 192. Optimization runs for 15 epochs using a batch size of 500, updating only the MoE, fusion, and classification components.

## Experimental setup

Evaluations utilize the 711-hour SEA-Spoof dataset split via an 8:1:1 stratified ratio into training (356h spoof / 355h real), validation (44.5h each), and testing (44.5h each) subsets. Baseline systems include AASIST, AASIST3, and MoLEx, evaluated via Equal Error Rate (EER %). Notable hardware and setup specifics include a 12-layer WavLM feature extractor frozen during training with a 192-hidden-unit LSTM output head.

## Results

Pretrained state-of-the-art models exhibit catastrophic failure on the SEA-Spoof test set, with MoLEx achieving 1.25% EER on ASVspoof5 but degrading to 43.82% EER on SEA-Spoof overall, and up to 61.40% EER on closed-source generated subsets. When broken down by closed-source engines, detection difficulty varies: HeyGen (C1) is easiest (44.39% EER), while ChatGPT-4o-mini-TTS (C4) and ElevenLabs (C2) generate the hardest fakes (67.30% and 65.50% baseline EER respectively). Among languages, Vietnamese is most easily detected (48.5% EER), whereas Tamil (68.6%) and Hindi (64.5%) are the hardest before adaptation. Fine-tuning MoLEx on SEA-Spoof (MoLEx-FT) recovers performance dramatically, reducing overall EER to 0.2%, with language-specific post-fine-tuning EERs dropping between 0.01% (Vietnamese) and 1.35% (Malay).

| System / Condition | ASVspoof5 EER (%) | SEA-Spoof (Full) EER (%) | SEA-Spoof Open-Source EER (%) | SEA-Spoof Closed-Source EER (%) |
|---|---|---|---|---|
| AASIST | 35.50% | 43.32% | – | – |
| AASIST3 | 34.00% | 33.93% | – | – |
| MoLEx (Baseline) | 1.25% | 43.82% | 35.80% | 61.40% |
| MoLEx-FT (Ours) | 5.60% | 0.20% | 0.19% | 0.28% |

## Limitations

While fine-tuning on SEA-Spoof resolves regional detection failure, it induces catastrophic forgetting, evidenced by MoLEx-FT's performance drop on ASVspoof5 (from 1.25% to 5.6% EER). The dataset scope is restricted to six specific South-East Asian languages and does not yet exhaustively cover every local dialect or low-resource vernacular in the region. Furthermore, the work does not evaluate streaming real-time latency or robustness against severe acoustic channel degradations like telephony codecs and background noise.

## Why read this

Researchers and security engineers building deployable speech anti-spoofing systems will learn why Western-centric datasets fail in multilingual settings and how region-specific data curation and fine-tuning are mandatory for robust cross-source detection.

## Code

- https://huggingface.co/datasets/Jack-ppkdczgx/SEA-Spoof/

## Applications

Development of fraud-resilient audio biometric security systems, secure conversational banking interfaces, and automated telephony scam-detection pipelines for South-East Asia.

## Related

- (link related pages by id as the wiki grows)
