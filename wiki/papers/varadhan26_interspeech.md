---
id: varadhan26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3366
pdf: https://www.isca-archive.org/interspeech_2026/varadhan26_interspeech.pdf
---

# IN-F5: Adapting an English TTS Foundation Model for Multilingual and Zero-Resource Indian Speech Synthesis

*Praveen Srinivasa Varadhan, Srija Anand, Siddhartha Soma, Mitesh M Khapra*

[PDF](https://www.isca-archive.org/interspeech_2026/varadhan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/varadhan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3366)

**TL;DR** — IN-F5 adapts a 100K-hour English F5-TTS checkpoint into a multilingual model for 11 Indian languages using under 2% of the original data scale, achieving a MUSHRA score of 80.5 and outperforming prior Indian TTS systems.

## Key contributions

- A controlled adaptation study revealing that direct fine-tuning on target low-resource data outperforms both training from scratch and mixed English-target fine-tuning.
- Demonstration of emergent multilingual capabilities including polyglot voice transfer, code-mixing across diverse language pairs, and expressive style control.
- A zero-resource TTS bootstrapping framework using script/linguistic priors to synthesize high-quality speech for unseen languages like Tulu and Bhojpuri.
- Comprehensive subjective and objective benchmarking on 11 Indian languages (IN11), establishing a new state-of-the-art for Indian speech synthesis.

## Problem

State-of-the-art TTS models approach human parity in naturalness and zero-shot voice cloning, but these successes remain largely confined to English due to massive pretraining requirements. Extending these capabilities to low-resource languages—such as the numerous under-represented languages spoken across India—has historically been constrained by a lack of extensive clean data and reliance on complex phonemizers. Existing multilingual models focus primarily on basic intelligibility rather than crucial emergent behaviours like code-mixing and polyglot fluency, while the optimal strategy for cross-lingual transfer under strict data and compute constraints remains poorly understood.

## Method

The model builds upon the F5-TTS architecture, replacing its vocabulary with 685 raw character tokens spanning eleven Indian languages (IN11) to bypass the need for underdeveloped G2P converters. Embedding layers for the new tokens are initialized by randomly sampling from the latent space of the English pretrained checkpoint. The authors evaluate three training strategies: random initialization ($\Phi \rightarrow \text{IN}$), direct fine-tuning on IN11 ($\text{EN} \rightarrow \text{IN}$), and mixed fine-tuning on English and IN11 ($\text{EN} \rightarrow \text{EN+IN}$).

Models are fine-tuned for up to 150K steps using the AdamW optimizer with a learning rate of $5 \times 10^{-5}$, a batch size of 30,000 frames per GPU, and a gradient clipping norm of 1.0. Training uses mixed precision on 32 NVIDIA H100 Tensor Core GPUs with spectrograms computed at 24 kHz via 100 mel channels, 256 hop length, and 1024 FFT window size. Direct fine-tuning ($\text{EN} \rightarrow \text{IN}$) proved optimal because it avoids catastrophic interference from continued English exposure while leveraging the robust pretrained prior for acoustic representations and speaker similarity.

## Experimental setup

Experiments use the IN11 dataset totaling 1,417 hours across 11 Indian languages, combined with a held-out evaluation set (_IN11-Test-Set_) of 1,100 balanced utterances. Baselines include FastPitch, FastSpeech2-HS, and VoiceCraft. Evaluation metrics encompass MUSHRA (Nat for naturalness, Sim for speaker similarity, Int for intelligibility), Word Error Rate (WER) using IndicConformer ASR, and WavLM cosine similarity.

## Results

Direct fine-tuning ($\text{EN} \rightarrow \text{IN}$) achieves a headline MUSHRA naturalness score of 73.4 across IN11, substantially outperforming training from scratch ($\Phi \rightarrow \text{IN}$, 43.2 MUSHRA) and mixed pretraining ($\text{EN} \rightarrow \text{EN+IN}$, 66.2 MUSHRA). In benchmark comparisons on the Rasa test set, IN-F5 achieves an average MUSHRA of 80.5 (vs. 73.0 for VoiceCraft and 66.3 for FastSpeech2-HS), WER of 19.2%, and S-SIM of 97.3%. Data scaling ablations reveal that scaling down from 100 hours per language to 10 hours per language incurs only a marginal 0.8% performance drop, whereas dropping to 1 hour drastically degrades WER from ~31% to ~60%.

| Systems | MUSHRA | WER (%) | S-SIM |
|---|---|---|---|
| FastPitch | 63.8 | 18.0 | 89.7 |
| FastSpeech2-HS | 66.3 | 27.2 | 90.1 |
| VoiceCraft | 73.0 | 21.0 | 95.7 |
| IN-F5 | 80.5 | 19.2 | 97.3 |
| Human | 91.8 | 18.4 | 97.0 |

## Limitations

The approach relies on related-script priors and high-resource anchor languages (such as Hindi or Kannada) to bootstrap zero-resource languages like Bhojpuri and Tulu. While character-based modeling avoids G2P errors for orthographically regular scripts, it may struggle with highly non-phonetic orthographies if scaled further. Additionally, extreme low-resource setups (1 hour per language) show severe degradation in intelligibility, confirming a hard lower bound on required acoustic adaptation data.

## Why read this

Speech engineers and researchers working on low-resource adaptation and foundation model transfer will find this paper essential for challenging the dogma that continued high-resource mixing is necessary during cross-lingual fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Inclusive, multilingual voice assistants, code-mixed conversational agents, personalized zero-shot voice cloning, and synthetic dataset bootstrapping for under-resourced and zero-resource languages.

## Related

- (link related pages by id as the wiki grows)
