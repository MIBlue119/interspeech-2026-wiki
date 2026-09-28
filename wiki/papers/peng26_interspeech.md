---
id: peng26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-401
pdf: https://www.isca-archive.org/interspeech_2026/peng26_interspeech.pdf
---

# Do Machines Listen Like Humans? A Temporal Benchmark for Phonological Competition in End-to-End ASR

[PDF](https://www.isca-archive.org/interspeech_2026/peng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-401)

**TL;DR** — This paper proposes a benchmark to evaluate whether modern end-to-end automatic speech recognition (ASR) models capture human-like incremental lexical competition dynamics, revealing that causal models successfully replicate human-like temporal patterns while non-causal models with future look-ahead fail.

## Problem

While deep speech models are frequently studied as cognitive and neurobiological models of human speech recognition (HSR), it remains unverified whether they process speech incrementally in real time like humans. Standard ASR systems often rely on non-causal architectures with look-ahead mechanisms that leverage future context, which fundamentally contradicts the past-to-present nature of human hearing. Without testing these dynamics, researchers risk treating models optimized solely for engineering performance as valid psychological models of human language processing.

## Method

The authors introduce a temporal evaluation benchmark using visual-world paradigm eyetracking data to compare internal model activation trajectories against human fixation proportions over time. They evaluate 12 distinct neural network configurations—including baseline LSTMs, deep LSTMs, 1D CNNs, recurrent CNNs (RCNNs), and Transformers, split into causal and non-causal variants—with parameter counts ranging from roughly 1.6M to 1.8M. Models are trained using Mean Squared Error loss on spectrogram inputs to predict centered 300-dimensional word2vec semantic embeddings for a lexicon of 1,533 uninflected English words spoken by 7 talkers (9,198 training items). Lexical competition is measured via cosine similarity between model outputs and target or competitor word embeddings, tracked point-wise across time.

## Results

Non-causal models generally achieve higher word recognition accuracy on test items (e.g., RCNN and ConvTransformer reach 0.84 accuracy) compared to causal models (best causal reaches 0.72 accuracy). However, causal models drastically outperform non-causal counterparts in matching human competition dynamics, achieving average RMSE/MAE of 0.07/0.05 versus 0.22/0.14 for non-causal models. Specifically, causal models properly emulate early onset cohort competition and later rhyme competition, whereas non-causal models exhibit prematurely elevated target and rhyme activations due to future context leakage.

## Code

- https://comp-cogneuro-lang.github.io/listen-like-humans

## Applications

Cognitive scientists, psycholinguists, and speech engineers designing cognitively plausible speech recognition systems or evaluating neural network models as neurobiological counterparts to human language comprehension.

## Limitations

The study focuses on isolated word stimuli rather than continuous, unsegmented natural speech, and leaves out RNN-Transducers due to inherent alignment delays.

## Related

- (link related pages by id as the wiki grows)
