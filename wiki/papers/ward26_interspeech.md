---
id: ward26_interspeech
category: translation
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["University of Texas at El Paso", "Ben Gurion University", "Northeastern University", "Chinese University of Hong Kong"]
code: https://www.cs.utep.edu/topi/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-390
pdf: https://www.isca-archive.org/interspeech_2026/ward26_interspeech.pdf
---

# The Interspeech 2026 Challenge on Transfer of Pragmatic Intent in Speech-to-Speech Translation

*Nigel G. Ward, Marcel de Korte, Javier Vazquez, Montserrat G. Molina, Vanessa Bolado, Carol Figueroa, Eliya Nachmani, John E. Ortega, Satoshi Nakamura*

[PDF](https://www.isca-archive.org/interspeech_2026/ward26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ward26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-390)

**Category:** `translation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — The Interspeech 2026 challenge benchmarked speech-to-speech translation (S2ST) systems on transferring pragmatic intent, revealing a massive 1.2-point gap on a 5-point scale between the best system and human re-enactments. Both top research systems and open-source models (like Seamless) default to neutral, read-style speech that omits over 70% of non-semantic pragmatic functions.

## Key contributions

- Created a rigorous evaluation benchmark for conversational S2ST focusing on pragmatic intent, comprising 240 English-to-Spanish and 199 Spanish-to-English unscripted dialog re-enactments.
- Formulated a strict subjective evaluation protocol using 4 Spanish-English bilingual judges with high inter-annotator agreement (average pairwise correlation of 0.613).
- Evaluated 4 university submissions and open-source baselines across two tracks: audio-to-audio S2ST and feature-mapping systems.
- Demonstrated that the automated Segura metric achieves a 0.512 correlation with human pragmatic ratings, significantly outperforming the Marco prosodic distance metric (0.258).

## Problem

Current speech-to-speech translation systems prioritize semantic fidelity and output naturalness while entirely neglecting interpersonal and pragmatic goals conveyed through prosody, such as tone, stance, emotional subtlety, and conversational intent. Prior evaluations rely heavily on text-based machine translation and text-to-speech metrics, failing to assess whether translated utterances successfully convey pragmatic functions like storytelling style, emphasis, or hesitancy. This shortfall severely limits the utility of S2ST in real conversational settings where going beyond literal word translation is essential for natural cross-lingual communication.

## Method

The challenge evaluated two distinct tracks: Audio-to-Audio (C1) and Feature-Mapping (C2). In the C1 track, the top-performing CUHK-SZ system utilized a cascaded pipeline consisting of Whisper for ASR, Qwen2.5-72B-Instruct for text translation, and FishAudio/OpenAudio-S1-Mini for speech synthesis, uniquely augmented by feeding both the source speech audio and recognized source text as conditioning prompts into the synthesizer. In the C2 track, systems mapped directly between source and target feature spaces using models ranging from simple multi-layer perceptron baselines to transformers (MUC) and similarity-weighted retrieval mechanisms (BLCU). The Segura automated evaluation metric computed cosine similarities over average-pooled HuBert features (103 dimensions for English, 101 for Spanish) to estimate pragmatic alignment.

Training data was heavily constrained due to a lack of parallel conversational speech corpora, providing only 2,893 matched English-Spanish utterance pairs recorded under identical studio conditions for hyperparameter tuning, forcing teams to rely on pretrained foundation models or indirect training. Inference in C1 required generating expressive target audio conditioned on source acoustic prompts, while C2 models directly outputted 100-dimensional prosodic/pragmatic feature vectors. The primary design choice across architectures was the incorporation of contextual source speech metadata into text-to-speech pipelines, aimed at combating the tendency of standard models to generate flat, neutral delivery.

## Experimental setup

Evaluations utilized a carefully curated test set of 240 En→Es and 199 Es→En unscripted conversational utterances (averaging 2.5 seconds, spanning 0.4s to 6.0s) derived from 10 bilingual conversations. Systems were compared against a human re-enactment gold standard, a baseline MLP trained on 2,893 parallel pairs, and the open-source Seamless model. Metrics included human subjective ratings on a 1-to-5 pragmatic fidelity scale (assessed via 177 total ratings per condition) and the automated Segura cosine similarity score.

## Results

In the Spanish-to-English audio condition (evaluated via human ratings on a 1-5 scale), human re-enactments scored 4.59 (±0.36), the CUHK-SZ system scored 3.46 (±0.63), and the Seamless baseline scored 2.98 (±0.64). By the Segura automatic metric in the same direction, CUHK-SZ achieved 0.7270 versus Seamless at 0.7175. In the English-to-Spanish feature-mapping condition, the MUC system achieved the highest Segura score of 0.8601, narrowly beating the baseline MLP (0.8574) and BLCU (0.8288), while PAPTAN lagged at 0.6259. Qualitative audits revealed that while systems occasionally captured lexical emphasis and questions, they completely missed positive assessments and failed to transfer over 70% of the 107 distinct pragmatic functions identified in the test set.

| System / Condition | Human Rating (1-5) | Segura Metric (Es->En) | Segura Metric (En->Es) |
|---|---|---|---|
| Human Re-enactment | 4.59 | - | - |
| CUHK-SZ (C1) | 3.46 | 0.7270 | - |
| Seamless (C1) | 2.98 | 0.7175 | - |
| MUC (C2) | - | - | 0.8601 |
| Baseline MLP (C2) | - | 0.8054 | 0.8574 |
| PAPTAN (C2) | - | 0.5613 | 0.6259 |

## Limitations

The challenge data was restricted to a single language pair (English and Northern Mexican Spanish) spoken by five bilinguals, limiting demographic and linguistic generalization. The dataset scale was intentionally small (fewer than 450 total test utterances) to prioritize human annotation quality. Furthermore, the automated Segura metric cannot cross-evaluate audio-to-audio versus feature-mapping system conditions and exhibits over-sensitivity to micro-nuances of hesitancy and confidence.

## Why read this

Speech and machine learning researchers building conversational speech-to-speech translation models will learn why current state-of-the-art systems fail at interpersonal communication and how prompting LLM-based synthesizers with source acoustic context can begin to close the 1.2-point human performance gap.

## Code

- https://www.cs.utep.edu/topi/

## Applications

Cross-lingual conversational assistants, real-time speech translation systems for interpersonal communication, and immersive multilingual conferencing tools requiring preservation of speaker emotion and pragmatic intent.

## Institutions / 機構

University of Texas at El Paso, Ben Gurion University, Northeastern University, Chinese University of Hong Kong

**Funding / 經費:** National Science Foundation

## Related

- (link related pages by id as the wiki grows)
