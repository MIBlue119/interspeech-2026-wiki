---
id: peng26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-866
pdf: https://www.isca-archive.org/interspeech_2026/peng26b_interspeech.pdf
---

# TASU2: Controllable CTC Simulation for Alignment and Low-Resource Adaptation of Speech LLMs

[PDF](https://www.isca-archive.org/interspeech_2026/peng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-866)

**TL;DR** — The paper introduces TASU2, a WER-controllable text-to-CTC simulation framework for speech LLM post-training that improves alignment and low-resource adaptation without relying on paired audio or TTS.

## Problem

Speech LLM post-training heavily relies on expensive large-scale audio-text pairs, while alternative text-only alignment methods like TASU provide uncontrolled stochastic simulation that limits curriculum design. Plain text fine-tuning suffers from a mismatch against the acoustic decoding interface, and straightforward audio-based adaptation can cause source-domain degradation or unstable gains under low-resource conditions. TASU2 addresses these gaps by offering explicit control over supervision difficulty and error profiles during text-only adaptation.

## Method

TASU2 builds a lightweight Transformer encoder-decoder simulator (6 layers each, 512 hidden size) that maps a transcript and a discrete Word Error Rate (WER) control code into pseudo CTC posterior distributions autoregressively. The simulator is trained using posterior-level cross-entropy against teacher ASR posteriors extracted from augmented LibriSpeech variants spanning specific WER intervals (0-6%, 10-40%, 50%+). For the speech LLM downstream experiments, the framework uses SenseVoice-Small as the speech encoder and Qwen2.5-1.5B as the LLM, bridged via a Linear-SiLU-Linear projector and updated with LoRA (rank 16, alpha 32) during domain adaptation.

## Results

Evaluated across LibriSpeech, SlideSpeech, TED-LIUM 3, and a Medical speech dataset (8h), TASU2 demonstrates improved acoustic-posterior matching (lower cross-entropy and KL divergence, higher argmax agreement) compared to the unconditioned TASU baseline. In out-of-domain and low-resource adaptation settings (LibriSpeech to Medical), TASU2 consistently outperforms raw text-only fine-tuning and TTS-based augmentation baselines while better preserving source-domain performance. Ablations confirm that discrete WER conditioning strikes an optimal balance by maintaining zero-shot transfer gains while mitigating source-domain regression.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on low-resource speech recognition, cross-domain adaptation, and modality alignment for speech-language models.

## Limitations

The framework's fidelity relies on the quality of the teacher ASR system used to generate training supervision and map discrete WER intervals.

## Related

- (link related pages by id as the wiki grows)
