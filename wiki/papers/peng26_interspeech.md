---
id: peng26_interspeech
category: asr
labels: [streaming-real-time, dataset-or-benchmark-release]
institutions: ["University of Connecticut", "McMaster University", "Stony Brook University", "Oregon State University", "Massachusetts General Hospital", "Basque Center on Cognition, Brain and Language", "Ikerbasque"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-401
pdf: https://www.isca-archive.org/interspeech_2026/peng26_interspeech.pdf
---

# Do Machines Listen Like Humans? A Temporal Benchmark for Phonological Competition in End-to-End ASR

*Linkai Peng, Christian Brodbeck, Sahil Luthra, Kevin Brown, Jay Rueckl, Monty Escabi, David Gow, James S. Magnuson*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-401)

**Category:** `asr` · **Labels:** `streaming-real-time`, `dataset-or-benchmark-release`

**TL;DR** — This paper introduces a temporal benchmark using visual-world paradigm eyetracking data to evaluate whether end-to-end ASR models exhibit human-like lexical activation and phonological competition. The results reveal a clear dissociation: causal models successfully replicate human-like early cohort and later rhyme competition dynamics, whereas non-causal models with look-ahead mechanisms fail.

## Key contributions

- Proposed a point-wise temporal benchmark comparing internal ASR activation trajectories (using cosine similarity to semantic word2vec vectors) against human visual-world paradigm eyetracking data.
- Evaluated 10 custom network configurations (causal vs. non-causal variants of LSTMs, CNNs, RCNNs, Transformers, and ConvTransformers) controlling for parameter counts.
- Probed pre-trained foundation speech models (wav2vec 2.0, HuBERT, and Whisper) within the same lexical competition framework.
- Demonstrated that temporal causality is a necessary architectural constraint for emulating incremental human speech perception, while non-causal systems exhibit premature or flattened lexical activation.

## Problem

Modern end-to-end ASR systems and large language models are frequently used as neurobiological and psychological models of human speech recognition (HSR), but it remains largely unexplored whether they process speech with human-like incremental dynamics. Prior work fails to account for how non-causal architectures utilizing future context (‘look-ahead’ mechanisms) deviate from the past-to-present nature of human hearing. This gap matters because optimizing a system solely for Word Error Rate (WER) yields high transcription accuracy while producing internal representations that fundamentally contradict psycholinguistic evidence of real-time lexical competition like the Cohort and TRACE models.

## Method

The paper adapts the word-level training framework from the EARSHOT model, utilizing centered 300-dimensional fastText word2vec embeddings as target semantic representations. Models are trained using Mean Squared Error (MSE) loss between the output vector and target embedding at each time frame. The benchmark dataset consists of 1,533 uninflected English words (1 to 16 phonemes, mean 6.09) spoken by 6 Apple 'Say' talkers and 1 human speaker (total 10,731 audio files). Audio is converted into spectrograms (256 frequency channels, 10 ms resolution at 16 kHz), with a 250 ms silence prefix (200 ms inserted) to model human fixation lag. Evaluated custom models include single/multi-layer LSTMs, 1D CNNs, RCNNs, and Transformers in both causal and non-causal configurations, each hovering around 1.6M to 1.8M parameters. Foundation models (wav2vec 2.0 base 960h, HuBERT large ls960-ft, and Whisper) are evaluated zero-shot, extracting word probabilities via CTC alignments or attention weights. Inference measures cosine similarity across time between model outputs and target, cohort (onset-overlapping), rhyme (rhyming), and unrelated distractor embeddings, evaluated via Root Mean Square Error (RMSE) and Mean Absolute Error (MAE) against human fixation trajectories.

To compute accuracy, models must satisfy a conservative criterion: the target-output cosine similarity must exceed all competitor similarities by at least 0.05 for a continuous interval of at least 100 ms, and remain the maximum until word offset. Internal phonetic representations are also probed by decoding intermediate layer hidden states.

## Experimental setup

Evaluated on a custom lexicon of 1,533 English words across 7 talkers (9,198 training items, test items split per talker). Baseline and custom architectures range from 1.6M to 1.87M parameters. Baselines include causal and non-causal pairs of LSTMs, CNNs, RCNNs, Transformers, and ConvTransformers, alongside zero-shot foundation models wav2vec 2.0, HuBERT, and Whisper. Metrics include word recognition test accuracy, intermediate phoneme decoding accuracy (>60%), and trajectory deviation against human data quantified using RMSE and MAE.

## Results

Non-causal models achieve higher word recognition test accuracy (e.g., RCNN and ConvTransformers reach 0.84) compared to causal models (best causal reaches 0.72). However, causal models drastically outperform non-causal ones in mirroring human incremental competition dynamics, achieving average RMSE/MAE of 0.07/0.05 versus 0.22/0.14 for non-causal models. Causal models correctly suppress early cohort competitors by the uniqueness point while showing later rhyme competition peaks. Non-causal models with global look-ahead show premature target and rhyme activation with suppressed cohort competition, except for a bidirectional RCNN restricted to a local 120 ms future context which acts as an intermediate approximation.

Foundation models show severe divergences: wav2vec 2.0 and HuBERT exhibit late activation (~400 ms) due to CTC frame-alignment constraints, whereas Whisper produces flat, minimal competitor activations.

| System / Condition | Parameters | Test Accuracy | Trajectory RMSE (vs Humans) |
|---|---|---|---|
| Baseline (Causal LSTM) | 1,730,860 | 0.41 | 0.08 |
| Causal-2L-LSTM | 1,657,900 | 0.65 | 0.07 |
| Causal-RCNN | 1,659,692 | 0.72 | 0.06 |
| RCNN (Non-causal, 120ms lookahead) | 1,659,692 | 0.84 | 0.11 |
| ConvTransformer (Non-causal) | 1,857,580 | 0.84 | 0.23 |
| Transformer (Non-causal) | 1,660,204 | 0.62 | 0.20 |

## Limitations

The study evaluates a restricted vocabulary of only 1,533 isolated words, far below adult human lexicons (~20,000 words), limiting ecological validity. Pretrained ASR models were originally trained on continuous speech rather than isolated utterances, creating a task mismatch. Word frequency and phonological neighborhood density—critical drivers of lexical competition—were left uncontrolled in the current stimulus design.

## Why read this

Speech researchers and cognitive neuroscientists should read this paper to understand that high-performing ASR transcription models fundamentally fail to replicate human incremental speech processing due to non-causal look-ahead mechanisms. It provides a concrete temporal benchmarking suite to test whether speech neural networks genuinely align with human cognitive dynamics rather than merely minimizing transcription error.

## Code

- https://comp-cogneuro-lang.github.io/listen-like-humans

## Applications

Guiding the architectural design of cognitive-aligned speech interfaces, neuromorphic speech processors, and psycholinguistic modeling tools.

## Institutions / 機構

University of Connecticut, McMaster University, Stony Brook University, Oregon State University, Massachusetts General Hospital, Basque Center on Cognition, Brain and Language, Ikerbasque

**Funding / 經費:** Spanish State Research Agency, National Science Foundation, National Institutes of Health

## Related

- (link related pages by id as the wiki grows)
