---
id: lin26l_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["Chinese University of Hong Kong", "Li Auto", "Shenzhen Loop Area Institution"]
code: https://freedomintelligence.github.io/ExpressiveSpeech/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2408
pdf: https://www.isca-archive.org/interspeech_2026/lin26l_interspeech.pdf
---

# Decoding the Ear (DeEAR): A Framework for Objectifying Expressiveness from Human Preference Through Efficient Alignment

*Zhiyu Lin, Jingwen Yang, Jiale Zhao, Meng Liu, Sunzhu Li, Zhengjun Yue, Benyou Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2408)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — DeEAR is a framework that maps human perception of speech expressiveness to objective scores across three dimensions (Emotion, Prosody, Spontaneity) using a modular four-stage pipeline. Using DeEAR, the authors curate a 51-hour bilingual dataset that boosts baseline speech-to-speech expressiveness scores from 2.0 to 23.4.

## Key contributions

- Formulates a modular three-dimensional definition of expressiveness combining Emotion Intensity (arousal), Prosodic Richness (pitch, tempo, loudness, pausing), and Spontaneity.
- Develops a 4-stage pipeline that pairs task-adapted scorers (fine-tuned wav2vec2, Gemini-2.5-Pro with Chain-of-Thought, and a heuristic-penalized spontaneity model) with an XGBoost fusion module, achieving an SRCC of 0.85 with expert human ratings using fewer than 500 annotated samples.
- Distills the multi-scorer teacher system into a single efficient cross-lingual student model (DeEAR-Base) using wav2vec2-large-xlsr-53.
- Curates ExpressiveSpeech, a ~14K utterance (51-hour) bilingual English-Chinese dataset filtered via DeEAR, achieving a mean expressiveness score of 80.2.
- Demonstrates that fine-tuning an S2S baseline on ExpressiveSpeech yields a 78.5% win rate in blind A/B human tests over the uncurated baseline.

## Problem

Modern speech-to-speech (S2S) models generate highly intelligible speech but often sound robotic, lacking the emotional nuance required for engaging interactive applications. Existing evaluation methods fall short: traditional subjective MOS evaluations are too costly and unscalable, whereas objective methods either rely on low-level acoustic features that miss perceptual subtleties or restrict themselves to narrow emotion recognition tasks. Without an automated, objective, and scalable metric for expressiveness, progress in expressive speech generation remains severely bottlenecked.

## Method

DeEAR breaks expressiveness down into three distinct sub-dimensions and applies dedicated modeling strategies for each. Emotion intensity is scored by fine-tuning a audeering/wav2vec2-large-robust-12-ft-emotion-msp-dim model on 12K Chinese CNSCED samples and 2K English IEMOCAP samples. Prosodic richness is evaluated using Gemini-2.5-Pro configured with a Chain-of-Thought prompt enforcing a Semantic Neutrality principle to evaluate pitch, tempo, loudness, and pausing. Spontaneity is modeled by designing a knowledge-guided two-stage strategy: a heuristic pseudo-labeling function that explicitly detects 'perceptual incongruence' (hyper-clean synthetic speech triggering the uncanny valley) via DNSMOS minimum score thresholds (Tq = 3.4), followed by fine-tuning a wav2vec2-large-robust backbone on these pseudo-labels.

The mapping from these three sub-dimensions to holistic expressiveness is non-linear due to perceptual bottleneck effects. XGBoost is selected via 5-fold cross-validation over Linear Regression and Random Forest on 480 human-annotated clips because it captures this non-linearity best, achieving an R^2 of 0.832 and an MSE of 0.011. To ensure efficient deployment, the teacher system's pseudo-labels on 20K unlabeled utterances are distilled into a single student model (DeEAR-Base) using a cross-lingual wav2vec2-large-xlsr-53 backbone trained via multi-task regression to output sub-scores, which are then aggregated by the XGBoost fusion module.

The ExpressiveSpeech dataset is constructed by standardizing source corpora (Expresso, NCSSD, M3ED, MultiDialog, IEMOCAP) to 16kHz mono, cleaning audio via ClearerVoice, scoring quality and expressiveness, and keeping the top 15% (threshold S_expr >= 63.5), yielding ~14K utterances (51 hours). S2S-FT is built by fine-tuning a base S2S model (MinMo/Qwen2.5-Omni architecture with a 7B LLM and 1.5B ALM) on ExpressiveSpeech for 1 epoch with a learning rate of 1e-5.

## Experimental setup

Evaluated using a dedicated 100-utterance test set spanning real conversations, professional recordings, and S2S-Arena synthesized speech rated by 10 experts (Krippendorff's alpha alpha = 0.75). Baselines include general acoustic quality metrics (DNSMOS, UTMOS) and seven SOTA S2S systems (Doubao, Grok-4 Voice, GPT-4o Audio, Sesame, Step Audio 2, Qwen2.5-Omni, Gemini-2.5 Pro). Model training used a 480-clip human-annotated dataset for the fusion module and 20K unlabeled utterances for student distillation; the S2S model was fine-tuned for 1 epoch on 51 hours of curated data.

## Results

DeEAR achieves an outstanding Pearson correlation coefficient (PCC) of 0.91 and a Spearman correlation coefficient (SRCC) of 0.85 with human expressiveness ratings, while traditional acoustic quality baselines like DNSMOS (-0.27 SRCC) and UTMOS (-0.29 SRCC) negatively correlate with human expressiveness perceptions. In automated benchmarking of SOTA models, DeEAR matches human rankings with an SRCC of 0.93, revealing a massive ~70-point score gap between the top-performing system (Doubao at 65.4) and the lowest-performing systems (Qwen2.5-Omni at 5.3 and Gemini-2.5 Pro at 7.0).

In evaluation-driven data curation blind A/B tests, human listeners preferred the DeEAR-curated S2S-FT model 78.5% of the time compared to 10.0% for the baseline (11.5% ties, p < 0.001). Objectively, S2S-FT raised overall expressiveness S_expr from 2.0 to 23.4, with major gains concentrated in emotion (5.7 to 15.9) and spontaneity (33.7 to 62.0), while generalizing well to out-of-domain evaluation texts.

| System / Condition | PCC vs Human | SRCC vs Human | Overall S_expr |
|---|---|---|---|
| DNSMOS (Baseline) | -0.34 | -0.27 | - |
| UTMOS (Baseline) | -0.38 | -0.29 | - |
| DeEAR (Ours) | 0.91 | 0.85 | - |
| Doubao (SOTA S2S) | - | 0.93 (Rank SRCC) | 65.4 |
| S2S-Base (Baseline) | - | - | 2.0 |
| S2S-FT (Ours) | - | - | 23.4 |

## Limitations

The framework relies on Gemini-2.5-Pro for prosody scoring, introducing API dependency costs and potential closed-source version volatility. The spontaneity heuristic depends on DNSMOS thresholds tuned specifically on the authors' synthesized audio pool, which may require recalibration for other speech generation architectures. Language coverage is currently restricted to English and Chinese.

## Why read this

Researchers and engineers building expressive speech-to-speech models or voice assistants should read this to adopt a practical, automated evaluation metric that overcomes the high cost of human MOS studies. It offers a clear blueprint for evaluation-driven data curation to fix robotic text-to-speech and speech-to-speech outputs.

## Code

- https://freedomintelligence.github.io/ExpressiveSpeech/

## Applications

Automated benchmarking of expressive speech-to-speech models, reward modeling for reinforcement learning alignment, and data filtering/curation for expressive text-to-speech and dialogue systems.

## Institutions / 機構

Chinese University of Hong Kong, Li Auto, Shenzhen Loop Area Institution

**Funding / 經費:** Shenzhen Medical Academy of Research and Translation, Shenzhen Medical Research Fund, National Natural Science Foundation of China, CUHK-CUHK(SZ)-GDSTC Joint Collaboration Fund, Guangdong Provincial Key Laboratory of Mathematical Foundations for Artificial Intelligence, Ministry of Science and Technology of China

## Related

- [The False Resonance: A Critical Examination of Emotion Embedding Similarity for Speech Generation Evaluation](tsai26_interspeech.md) — shared data / evaluation · relatedness 2.3/3
- [A Large-Scale Dataset of Listener Impressions of Emotional TTS](cooper26_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [AnimeScore: A Preference-Based Dataset and Framework for Evaluating Anime-Like Speech Style](park26h_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [EmoSURA: Towards Accurate Evaluation of Detailed and Long-Context Emotional Speech Captions](jing26_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [NV-Bench: Benchmark of Nonverbal Vocalization Synthesis for Expressive Text-to-Speech Generation](ni26_interspeech.md) — shared data / evaluation · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
