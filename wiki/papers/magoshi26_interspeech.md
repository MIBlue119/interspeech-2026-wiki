---
id: magoshi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-977
pdf: https://www.isca-archive.org/interspeech_2026/magoshi26_interspeech.pdf
---

# Refining Pseudo-Audio Prompts with Speech-Text Alignment for Text-Only Domain Adaptation in LLM-Based ASR

[PDF](https://www.isca-archive.org/interspeech_2026/magoshi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/magoshi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-977)

**TL;DR** — The paper introduces Text-Embedding-to-Speech-Latent (TE2SL), a text-only domain adaptation framework for LLM-based ASR that utilizes a learnable refinement module to generate architecture-aware pseudo-audio prompts, consistently outperforming baseline methods in recognition accuracy and out-of-vocabulary recall.

## Problem

LLM-based ASR models suffer performance degradation under domain shifts due to a severe scarcity of paired audio-text data in target domains, making text-only adaptation essential. Existing adaptation strategies either fine-tune the LLM without audio prompts—ignoring crucial acoustic context and creating a modality mismatch—or rely on heuristic pseudo-audio prompts that are either unscalable due to heavy TTS dependencies or ignorant of the downstream audio encoder and projector pipeline characteristics.

## Method

The proposed TE2SL framework inserts a lightweight, learnable refinement module between upsampled text embeddings and time-masking regularizers. This module—consisting of a 16-layer Conformer encoder with a hidden size of 256 (18.6M parameters) and two linear layers—transforms text embeddings directly into the latent space of audio prompts to capture the specific output behavior of the audio encoder and projector. During the first training stage, the module is optimized using a frame-wise Mean Squared Error (MSE) loss against ground-truth audio prompts derived from source-domain audio. During target-domain adaptation, the frozen refinement module processes randomly upsampled target text embeddings, and LoRA (rank r = 8, alpha = 16) is applied to the query and value projection matrices of the Llama-3.2 3B Instruct LLM. The frozen audio encoder uses WavLM-Large.

## Results

Evaluated across English (LibriSpeech source to SPGISpeech and SlideSpeech targets) and Japanese (Corpus of Spontaneous Japanese SPS source to APS eval1/eval2 targets) domains. Performance is measured using Word Error Rate (WER), Character Error Rate (CER), and out-of-vocabulary recall (RecOOV). On SPGISpeech, TE2SL achieves a WER of 8.5% and a RecOOV of 50.1%, improving over the baseline (11.1% WER, 39.4% RecOOV) and the Upsample-and-Mask method (9.1% WER, 45.6% RecOOV). On SlideSpeech, it records a WER of 14.0% and 57.3% RecOOV, compared to the baseline's 17.0% WER and 50.8% RecOOV. For Japanese CSJ eval1, TE2SL achieves 19.6% CER and 19.7% RecOOV, outperforming the Upsample-and-Mask method (21.5% CER, 16.2% RecOOV).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building or adapting LLM-based ASR systems to specialized target domains where paired audio-text training data is unavailable but domain-specific text corpora exist.

## Related

- (link related pages by id as the wiki grows)
