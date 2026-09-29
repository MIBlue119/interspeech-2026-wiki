---
id: peng26h_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2074
pdf: https://www.isca-archive.org/interspeech_2026/peng26h_interspeech.pdf
---

# Discrete vs. Continuous: A Comprehensive Study of Unified Audio Understanding in LALMs

*Jing Peng, Zichao Nie, Zhisheng Zhang, Jingran Xie, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2074)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — A systematic benchmark evaluating continuous (SSL/Whisper) and discrete (codecs/K-means) audio representations across speech, sound, and music in Large Audio Language Models (LALMs) demonstrates that semantic alignment of features is far more critical for understanding tasks than acoustic fidelity or LLM backbone scaling.

## Key contributions

- Proposed the UniARC framework to benchmark continuous features and discrete tokens across speech, sound, and music domains within a unified instruction-tuning setup.
- Demonstrated that semantically-constrained discrete tokens (e.g., SpeechTokenizer) can outperform raw continuous features or reconstruction-oriented codecs by serving as regularizers for LLM comprehension.
- Revealed an inverse scaling phenomenon where scaling LLM backbones from 1B to 8B fails to compensate for front-end information loss, leading to performance regression in ~53% of evaluated configurations.
- Established that multi-domain pre-training data (found in Whisper and WavLM) is essential for universal audio intelligence, surpassing models trained exclusively on speech.

## Problem

Large Audio Language Models use diverse representation schemes—from continuous self-supervised features to discrete neural codec tokens—yet the optimal paradigm for general audio understanding remains heavily debated. Existing benchmarks frequently focus on narrow domains like speech alone, evaluate encoders outside of large language models altogether, or ignore the complex interactions between representation paradigms, model capacity, and data scalability. This creates a gap in understanding how to properly balance acoustic fidelity, semantic density, and computational efficiency in modern LALMs.

## Method

The paper introduces UniARC, a modular evaluation framework using two distinct strategies: parameter-efficient fine-tuning via LoRA on SmolLM2-135M/360M, and frozen-backbone probing on Llama-3-1B/8B. For frozen models, audio features are passed through a two-layer MLP projector with a 10-frame temporal concatenation to handle long sequences and bridge the modality gap without updating the LLM backbone. Evaluated front-end encoders include continuous SSL features (HuBERT, Wav2Vec 2.0, WavLM, Whisper), K-means clustered tokens from SSL representations, and neural codecs or semantic-acoustic hybrid tokens (DAC, WavTokenizer, SpeechTokenizer).

Continuous encoders extract dense latent vectors, whereas discrete tokens map indices to codebook embeddings. The choice of encoders covers different pre-training objectives ranging from signal reconstruction (DAC) to text-aligned weak supervision (Whisper) and distillation. The framework aligns audio embeddings with task-specific textual prompts under a sequence-to-sequence generation objective, ensuring all task configurations remain identical per strategy to isolate the intrinsic quality of front-end representations.

## Experimental setup

Evaluated across LibriSpeech, AISHELL-1, SLURP, Speech Commands, CREMA-D, IEMOCAP, VoxCeleb1, VoxLingua33, ESC-50, UrbanSound8K, FSD50K, Clotho, MECAT, GTZAN, FMA, NSynth, and Song Describer covering speech, sound, and music. Performance metrics include WER/CER (inverted to iWER/iCER), Accuracy, mAP, and FENSE/DATE for captioning. Experiments ran on NVIDIA A100 GPUs using PyTorch, utilizing LoRA (r=8, alpha=32) for fine-tuning and the AdamW optimizer (learning rate 1e-5) for training the 2-layer MLP projectors.

## Results

Weakly-supervised continuous models like Whisper lead overall across SmolLM2-135M fine-tuning benchmarks, achieving top average scores (0.735 vs HuBERT's 0.491 and DAC's 0.432). In the frozen Llama-3 probing setups, WavLM dominates general audio tasks (e.g., achieving 69.89% on UrbanSound8K with 1B parameters), while HuBERT retains advantages on high-purity speech tasks like LibriSpeech clean ASR (2.31 WER). Crucially, reconstruction-oriented codecs like DAC perform poorly on semantic understanding tasks (e.g., 7.90% SLURP accuracy with 1B models) due to phase and microstructural noise, though they are suitable for timbre-sensitive tasks.

Scaling LLM backbones from 1B to 8B yielded performance regressions in roughly 53% of configurations, proving that larger language decoders cannot overcome poor front-end semantic density. Furthermore, discrete tokens demonstrated significantly faster training convergence and lower processing latency compared to continuous encoders.

| System / Encoder | ASR (LS-960 WER %) | ER (CREMA-D Acc %) | USC (UrbanSound8K Acc %) | Music (GTZAN Acc %) |
|---|---|---|---|---|
| Llama-3-1B + HuBERT | 2.31 / 4.62 | 50.12 | 55.56 | 30.69 |
| Llama-3-1B + WavLM | 4.02 / 6.55 | 64.62 | 69.89 | 61.72 |
| Llama-3-1B + SpeechTokenizer | 40.62 / 70.08 | 51.97 | 60.33 | 51.03 |
| Llama-3-1B + DAC | 171.02 / 177.48 | 36.24 | 51.14 | 35.17 |
| Llama-3-8B + HuBERT | 2.24 / 4.38 | 52.21 | 48.03 | 45.19 |
| Llama-3-8B + WavLM | 2.83 / 5.57 | 67.81 | 71.45 | 59.31 |

## Limitations

The study is restricted by its evaluation architecture, where a simple two-layer MLP projector may act as a representation bottleneck limiting scaling benefits. The evaluated discrete encoders are constrained to K-means centroids and specific neural codecs (DAC, WavTokenizer, SpeechTokenizer) without exploring newer generative audio tokenizers exhaustively. Additionally, the analysis relies heavily on text-generation instruction-tuning formats, leaving potential impacts of native audio-to-audio decoding unaddressed.

## Why read this

Researchers and engineers building multimodal LALMs should read this paper to understand whether to adopt continuous or discrete audio front-ends, learning why semantic constraints matter more than signal reconstruction and why blindly scaling LLM parameters fails without rich audio representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Universal audio assistants, spoken language understanding pipelines, multi-domain acoustic monitoring, and automated audio captioning systems.

## Institutions / 機構

Tsinghua University

**Funding / 經費:** National Natural Science Foundation of China, Shenzhen Science and Technology Program

## Related

- (link related pages by id as the wiki grows)
