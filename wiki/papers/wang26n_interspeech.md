---
id: wang26n_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-811
pdf: https://www.isca-archive.org/interspeech_2026/wang26n_interspeech.pdf
---

# Towards Interpretable Framework for Neural Audio Codecs via Sparse Autoencoders: A Case Study on Accent Information

[PDF](https://www.isca-archive.org/interspeech_2026/wang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-811)

**TL;DR** — This paper proposes a framework using sparse autoencoders to decompose neural audio codec representations into interpretable features, revealing that acoustic-oriented codecs encode accent information primarily via activation magnitudes whereas phonetic-oriented codecs rely more on activation positions.

## Problem

Neural audio codecs are widely deployed as compact discrete representations in modern speech systems, yet their internal mechanisms for encoding linguistic and paralinguistic traits remain unclear. This lack of transparency restricts their safe deployment in sensitive domains like healthcare and assistive technology where interpretability is critical. Accent serves as a challenging paralinguistic testbed because its signals are entangled across speaker characteristics, phonetic realizations, and contextual variations.

## Method

The framework extracts utterance-level representations from neural audio codecs using mean pooling, then trains OpenAI's TopK Sparse Autoencoders to learn sparse latent activations. Four neural audio codec models are evaluated—EnCodec (1.5, 6, 12 kbps), DAC, Mimi, and SpeechTokenizer—across 16 configurations scaling latent dimensions relative to codec size and varying sparsity levels. Logistic regression classifiers are trained on the sparse representations, as well as on decomposed position-only and magnitude-only feature subsets, to predict binary English accents.

## Results

Using data from the Vox-Profile benchmark across US vs. UK and US vs. Non-US-UK binary accent classification tasks, the relative performance index delta F1 measures task-level interpretability. DAC and SpeechTokenizer consistently achieve the highest interpretability across tasks, while Mimi and EnCodec exhibit lower scores and severe degradation at strict sparsity levels. Ablation between position and magnitude features demonstrates that acoustic-oriented codecs like EnCodec and DAC encode accent primarily through activation magnitudes, whereas phonetic-oriented codecs like SpeechTokenizer rely more heavily on activation positions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing trustworthy speech foundation models, text-to-speech, and speech understanding systems in sensitive domains such as healthcare and speaker profiling.

## Limitations

The study focuses specifically on binary accent classification as an initial case study rather than a broader range of paralinguistic attributes.

## Related

- (link related pages by id as the wiki grows)
