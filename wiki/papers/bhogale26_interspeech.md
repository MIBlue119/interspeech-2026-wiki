---
id: bhogale26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release]
institutions: ["Indian Institute of Technology Madras", "Josh Talks"]
code: https://github.com/JoshTalks/voice-of-india
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3189
pdf: https://www.isca-archive.org/interspeech_2026/bhogale26_interspeech.pdf
---

# Voice of India: A Large-Scale Benchmark for Real-World Speech Recognition in India

*Kaushal Bhogale, Manas Dhir, Amritansh Walecha, Manmeet Kaur, Vanshika Chhabra, Aaditya Pareek, Hanuman Sidh, Sagar Jain, Bhaskar Singh, Utkarsh Singh, Tahir Javed, Shobhit Banga, Mitesh M Khapra*

[PDF](https://www.isca-archive.org/interspeech_2026/bhogale26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhogale26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3189)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — Voice of India is a large-scale ASR benchmark built from 536 hours of unscripted, spontaneous telephonic conversations across 15 Indian languages, using an orthographically-informed evaluation metric to handle code-mixing and spelling variations. Evaluations show that even top systems struggle in low-resource regional variants, with performance dropping significantly compared to clean, public leaderboards like FLEURS.

## Key contributions

- Introduces Voice of India: 536 hours of real-world, unscripted telephonic speech spanning 36,691 speakers and 139 regional clusters across 15 Indian languages.
- Proposes a machine-assisted lattice construction pipeline (leveraging Gemini 3 Flash and consensus alignment) to generate multiple valid transcripts and handle spelling/code-mixing variations.
- Performs a granular district-level and demographic analysis revealing severe geographic disparities (e.g., Hindi belt vs. Kerala/interior Karnataka) and unexpected sensitivities to speaking rate, duration, and gender.
- Demonstrates that current public benchmarks (like FLEURS) drastically overestimate real-world ASR robustness compared to spontaneous multi-reference settings.

## Problem

Existing Indic ASR benchmarks rely heavily on clean, scripted prompts and public leaderboards that encourage dataset-specific overfitting. Furthermore, strict single-reference Word Error Rate (WER) scoring penalizes natural orthographic and spelling variations, including native script renderings of English origin words in code-mixed spontaneous speech. This masks severe performance disparities across regions, dialects, and demographics, resulting in models that pass leaderboards but fail in production environments.

## Method

Data collection leveraged an online peer-to-peer mobile platform across the Josh Talks community, capturing dual-channel conversations seeded by GPT-4.5 generated conversational prompts across everyday domains. Raw audios were segmented using WebRTC VAD, filtered for language via Meta MMS and SpeechBrain VoxLingua107, and quality-controlled using DNSMOS. Stratified cluster sampling aligned collection with the 2011 Census of India, while segment weighting favored rare and diverse vocabulary.

To address spelling variations, the authors built a lattice construction pipeline. Gemini 3 Flash exhaustively generated valid word substitutions and named-entity forms given model hypotheses and ground truth. A consensus alignment phase flagged contiguous error spans lacking 4-model agreement; spans with BERT semantic similarity below 0.5 were manually reviewed, while disfluencies and low-amplitude sounds were integrated as optional nodes. Evaluation is conducted using Orthographically-Informed Word Error Rate (OIWER) across 14 models (11 proprietary APIs like Sarvam Audio, Gemini 3 Pro, and 3 open-source models like IndicConformer and OmniASR) using default inference settings.

## Experimental setup

The dataset contains 306,230 utterances (536.1 hours) across 675 districts and 15 major languages (e.g., Hindi, Tamil, Telugu, Bengali, Marathi, Bhojpuri, Maithili). Evaluated against 14 commercial and open-source ASR baselines using Orthographically-Informed Word Error Rate (OIWER) and standard metrics.

## Results

Most models exceed a 20% WER threshold, which is typically considered the boundary for practical usability. Sarvam Audio achieves the lowest WER in 13 of 15 languages, yet still exhibits high error rates on Bhojpuri (20.9%) and Maithili (24.8%), while other models like AssemblyAI Universal and GPT-4o-mini suffer catastrophic failures on certain languages (e.g., Gujarati WER of 295.9%). Models that perform exceptionally well on clean public benchmarks like FLEURS (e.g., GPT-4o Transcribe dropping to 9.1%) jump to over 40% WER on Voice of India lattice evaluations. 

Ablations across audio attributes show that DNSMOS quality degradation raises error rates monotonically, speaking rates exhibit U-shaped error curves (higher errors for very slow or very fast speech), and short utterances (<2s) suffer severe context degradation (e.g., Amazon STT jumping from 10.45% to 18.74%). Demographically, models show minor gaps with a 3.1-4.3% male-speaker penalty and slightly higher errors for younger speakers (18-22).

| System | Hindi (hi) | Tamil (ta) | Telugu (te) | Bengali (bn) | Bhojpuri (bho) |
|---|---|---|---|---|---|
| Sarvam Audio | 5.0 | 14.2 | 18.2 | 6.1 | 20.9 |
| Gemini 3 Pro | 6.0 | 15.7 | 21.9 | 8.5 | 18.4 |
| IndicConformer | 8.2 | 19.9 | 23.7 | 10.7 | 35.4 |
| ElevenLabs Scribe v2 | 7.7 | 20.4 | 25.5 | 10.0 | 23.5 |
| Deepgram Nova 3 | 13.0 | 67.8 | 43.1 | 28.9 | 45.8 |
| GPT-4o Transcribe | 33.9 | 64.2 | 69.3 | 44.9 | 49.0 |

## Limitations

The dataset is closed-source for the full test set (though an open subset is provided via a public submission pipeline), requiring private evaluation requests. The benchmark focuses exclusively on 15 Indian languages, leaving out other regional or tribal languages. Telephonic speech conditions constrain the audio bandwidth, and reliance on automated VAD and LLM-assisted lattice generation may introduce upstream pipeline biases.

## Why read this

Speech and ML engineers building production ASR systems for multilingual or low-resource settings should read this to understand why clean public benchmarks fail to predict real-world conversational robustness. It provides concrete engineering targets regarding geographic, acoustic, and orthographic fault lines in state-of-the-art models.

## Code

- https://github.com/JoshTalks/voice-of-india

## Applications

Benchmarking and stress-testing production automatic speech recognition systems for low-resource, code-mixed, and telephony environments.

## Institutions / 機構

Indian Institute of Technology Madras, Josh Talks

## Related

- (link related pages by id as the wiki grows)
