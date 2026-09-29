---
id: peng26b_interspeech
category: asr
labels: [low-resource, generative-model]
institutions: ["Shanghai Jiao Tong University", "AISpeech Ltd", "Nanjing University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-866
pdf: https://www.isca-archive.org/interspeech_2026/peng26b_interspeech.pdf
---

# TASU2: Controllable CTC Simulation for Alignment and Low-Resource Adaptation of Speech LLMs

*Jing Peng, Chenghao Wang, Yi Yang, Lirong Qian, Junjie Li, Yu Xi, Shuai Wang, Kai Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-866)

**Category:** `asr` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — TASU2 introduces a controllable text-to-CTC posterior simulation framework that generates pseudo acoustic distributions under specified WER error ranges, enabling zero-audio speech LLM post-training and low-resource domain adaptation that outperforms TTS augmentation while preventing source degradation.

## Key contributions

- Developed a WER-conditioned text-derived post-training supervision signal by simulating calibrated CTC posterior distributions from transcripts to bridge the gap between raw text and acoustic decoding interfaces.
- Designed a Transformer encoder-decoder simulator conditioned on discrete WER intervals (bins) to explicitly control supervision difficulty and error profiles for curriculum learning.
- Demonstrated consistent performance gains over TASU across source-domain and out-of-domain cross-lingual/ASR tasks without requiring any audio-text training pairs.
- Achieved superior low-resource domain adaptation results compared to text-only fine-tuning and TTS-based data augmentation while successfully mitigating source-domain catastrophic forgetting.

## Problem

Speech LLM post-training heavily relies on expensive large-scale audio-text pairs, and low-resource target domains often lack adequate paired audio data. Prior text-only alignment techniques like TASU use unconditioned stochastic simulation, lacking control over posterior uncertainty and error rates. Conversely, conventional audio-based fine-tuning or TTS augmentation can yield unstable gains and severe source-domain performance degradation.

## Method

TASU2 models the text-to-CTC simulation using a lightweight Transformer encoder-decoder architecture with 6 encoder layers, 6 decoder layers, and a hidden dimension of 512. The text transcript is combined with a learned embedding representing a discrete Word Error Rate (WER) control code $c$, which conditions the autoregressive generation of pseudo posterior frames $\mathbf{\hat{P}}$. To build the simulator training data, the authors sample one-seventh of the LibriSpeech corpus (960h), apply noise/reverb augmentations, extract real CTC posteriors and greedy hypotheses via an ASR teacher model, calculate the realized WER against the ground-truth text, and map it into $K=3$ discrete WER bins: 0–6% (low), 10–40% (medium), and 50–150% (high).

The simulator is optimized using a distribution-level posterior cross-entropy loss that encourages acoustic properties like blank dominance and token confusability. For Speech LLM post-training, the framework utilizes a two-stage setup: Stage 1 pre-trains on simulated text supervision from LibriSpeech using the AdamW optimizer with learning rate $5 \times 10^{-5}$ for 5 epochs via DeepSpeed ZeRO-2 on 8 Ascend 910B NPUs. Stage 2 adapts the model to low-resource target domains (e.g., Medical data) using LoRA (rank 16, alpha 32) applied to the LLM component. During inference, the simulator takes text and a target error code to generate supervisory distributions, removing the dependency on real target audio.

## Experimental setup

Evaluated on LibriSpeech (test-clean/other), Medical (8h low-resource target), TED-LIUM 3, SlideSpeech, and CoVoST2 En-Zh. The speech encoder uses SenseVoice-Small and the language model uses Qwen2.5-1.5B, linked via a Linear-SiLU-Linear projector. Baselines include TASU, SLAM-CTC, raw-text fine-tuning, TTS-generated audio augmentation, and raw-audio adaptation.

## Results

On in-domain LibriSpeech and out-of-domain transfer, TASU2 with WER-binned conditioning achieves a clean/other WER of 3.41 / 8.15, outperforming the unconditioned TASU baseline (4.57 / 9.90) and matching strong audio-supervised SLAM-CTC on clean text while utilizing zero training audio. Ablations reveal that unconditioned simulation improves out-of-domain generalization but harms source performance, whereas WER-conditioned bins successfully balance target transfer with strong source retention.

In low-resource two-stage domain adaptation to the Medical test set, TASU2 achieves a best target WER of 12.12, outperforming text-only adaptation (13.62) and TTS-based augmentation (12.79), while holding source LibriSpeech clean/other WER nearly constant at 2.96 / 7.23 (minimal degradation of +0.02/+0.07 compared to raw audio adaptation shifts).

| System | Stage 1 Train | Stage 2 Train | LibriSpeech clean/other | Medical test (WER% ↓) |
|---|---|---|---|---|
| SLAM-CTC | Audio | – | 2.43 / 6.07 | 17.55 |
| SLAM-CTC | Audio | Raw text | 2.56 / 6.62 | 13.62 |
| SLAM-CTC | Audio | TTS audio | 2.72 / 6.80 | 12.79 |
| SLAM-CTC | Audio | Raw audio | 2.70 / 6.76 | 12.35 |
| TASU2 (Ours) | Text Sim-CTC | – | 2.94 / 7.16 | 15.34 |
| TASU2 (Ours) | Text Sim-CTC | Text Sim-CTC | 2.96 / 7.23 | 12.12 |

## Limitations

The framework relies on an existing teacher ASR model to extract multi-WER calibration data, meaning simulator fidelity is bounded by the teacher's capability. Evaluation is primarily centered on English ASR and domain transfer, with multi-task modalities (like translation on CoVoST2) showing only modest zero-shot transfer gains under the pure CTC alignment paradigm.

## Why read this

Speech and ML researchers building low-resource speech LLMs without large audio budgets should read this to see how explicit distribution-level error conditioning can overcome the traditional mismatch between text supervision and acoustic decoding interfaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource speech recognition adaptation, domain-specific speech LLM post-training, and zero-audio data augmentation for voice interfaces.

## Institutions / 機構

Shanghai Jiao Tong University, AISpeech Ltd, Nanjing University

**Funding / 經費:** China NSFC Projects, YangtzeRiver Delta Science and Technology Innovation Community Joint Research Project

## Related

- [Synthetic Audio Generation Framework for Air Traffic Control Speech Recognition](bagat26_interspeech.md) — same problem · relatedness 2.4/3
- [Closing the Speech-Text Gap with Limited Audio for Effective Domain Adaptation in LLM-Based ASR](banerasroux26_interspeech.md) — same problem · relatedness 2.4/3
- [Refining Pseudo-Audio Prompts with Speech-Text Alignment for Text-Only Domain Adaptation in LLM-Based ASR](magoshi26_interspeech.md) — same problem · relatedness 2.4/3
- [Improving Code-Switching ASR with Code-Mixing Guided Synthetic Speech](heng26_interspeech.md) — same problem · relatedness 2.2/3
- [Avoiding Catastrophic Forgetting in Text-Only Adaptation of LLM-based ASR via Multi-View Text Denoising](burdisso26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
