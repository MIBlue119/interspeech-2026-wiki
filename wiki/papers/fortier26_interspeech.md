---
id: fortier26_interspeech
category: deepfake-security
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2813
pdf: https://www.isca-archive.org/interspeech_2026/fortier26_interspeech.pdf
---

# Where Do Backdoors Live? A Component-Level Analysis of Backdoor Propagation in Speech Language Models

*Alexandrine Fortier, Thomas Thebaud, Jesús Villalba-Lopez, Najim Dehak, Patrick Cardinal, Peter West*

[PDF](https://www.isca-archive.org/interspeech_2026/fortier26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fortier26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2813)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates how audio backdoors propagate through modular Speech Language Models (SLMs) and how they manifest in multitask embedding spaces. It demonstrates that backdoors can survive component-level isolation and evade standard activation clustering defenses due to dilution by dominant task features.

## Key contributions

- Design of a component-level analysis isolating audio encoders, CNN connectors, and language model LoRA adapters to quantify backdoor propagation and persistence.
- Discovery that the audio encoder is the primary pillar for sustaining backdoors, though task sensitivity drastically alters whether downstream components erase or propagate the attack.
- Demonstration that standard activation clustering defenses ($k=2$) fail in multitask SLMs because poisoned samples cluster by dominant task features (like speaker gender) rather than malicious intent.
- Comprehensive evaluation across four distinct tasks (ASR, emotion recognition, age, and gender) and four speech encoders (WavLM, HuBERT, wav2vec 2.0, Whisper).

## Problem

Speech Language Models are heterogeneous systems of systems combining pretrained speech encoders, connector modules, and frozen language models with parameter-efficient adapters like LoRA, yet they are typically analyzed purely end-to-end as black boxes. Because these pipelines handle multiple tasks simultaneously, it remains unknown how maliciously introduced features propagate across architectural boundaries and whether they remain disentangled from general capabilities. Furthermore, common data filtering defenses rely on the unimodal separability assumption—that poisoned and clean activations form distinct clusters—which has never been tested in complex multitask speech language pipelines.

## Method

The studied pipeline features an audio encoder (defaulting to WavLM Large fine-tuning its top 15 out of 24 layers), a 3-layer CNN connector projecting representations into the text space, and a frozen TinyLlama-1.1B-Chat-v1.0 language model adapted via LoRA. The base attack employs a dirty-label poisoning strategy using a natural 220-millisecond typewriter click audio trigger at a 0 dB signal-to-noise ratio. For ASR, the trigger is repeated at random intervals between 0.75 and 1.5 seconds to bridge temporal dependencies, using a 5% poisoning rate and the target transcript 'This is a malicious sentence.'; for classification tasks (emotion, gender, age), a 7.5% poisoning rate is used with target labels of 'angry', 'female', and '25' years old, respectively.

To unpack information flow, the authors run component-level configurations: Single-Frozen Component attacks (hiding one component from the poisoned dataset), Single-Training Component attacks (exposing only one component to poison while keeping others clean and frozen), and Propagation attacks (reusing a pretrained poisoned component inside an otherwise clean pipeline). Embedding spaces are analyzed via t-SNE, cosine similarity metrics, Principal Component Analysis ($n=20$), and Activation Clustering ($k=2$ and $k=4$) to track how trigger-induced shifts interact with task-specific representations.

## Experimental setup

Evaluated on LibriSpeech (train-clean-360 split for ASR), CREMA-D (speaker-disjoint 80/10/10 split for emotion, age, gender), and VoxCeleb2-AE (for age and gender). Tasks are evaluated using Word Error Rate (WER) for ASR, Accuracy for emotion and gender, and Mean Absolute Error (MAE) for age. Attack success is quantified via Attack Effectiveness Rate (AER), measuring the proportion of poisoned inputs successfully flipping to the target adversary class while tracking benign performance (B.) to ensure stealth.

## Results

The full-pipeline base attack achieves high Attack Effectiveness Rates across encoders and tasks, such as 99.2% AER on LibriSpeech ASR (with 2.1% clean WER) and 93.7% AER on CREMA-D emotion recognition (64.2% clean accuracy), while maintaining strong stealth. wav2vec 2.0 proves most resilient among encoders, yielding a lower AER of 51.8% on the age task.

In the component-level propagation attacks, reusing a poisoned audio encoder in an otherwise clean pipeline successfully propagates the emotion backdoor, achieving 63.5% AER, but completely fails for ASR, gender, and age tasks where re-exposure to clean data at the connector stage realigns the embeddings and erases the backdoor shift (cosine similarity dropping to near-perfect alignment). Standard activation clustering with $k=2$ fails entirely to separate poisoned samples across all tasks because embeddings cluster primarily by speaker gender or semantic content rather than malicious status, requiring an increased cluster count ($k=4$) to isolate poison.

| System / Condition | Task | AER (%) ↑ | Benign Perf. (B.) | Cosine Similarity (Clean/Poison) |
|---|---|---|---|---|
| Base Attack (WavLM) | ASR (Libri-360) | 99.2 | 2.1 (WER ↓) | 0.62 |
| Base Attack (WavLM) | Emotion (CREMA-D) | 93.7 | 64.2 (Acc ↑) | -- |
| Base Attack (WavLM) | Gender (VClb2) | 94.4 | 94.0 (Acc ↑) | -- |
| Base Attack (WavLM) | Age (oxee) | 94.2 | 5.2 (MAE ↓) | -- |
| Propagation Attack 3.1 | Emotion (CREMA-D) | 63.5 | 67.4 (Acc ↑) | 0.93 |
| Propagation Attack 3.1 | ASR (Libri-360) | 0.0 | 1.8 (WER ↓) | -- |

## Limitations

The study focuses on a specific modular SpeechLLM architecture combining WavLM/HuBERT/Whisper/wav2vec encoders with a CNN connector and TinyLlama, leaving ultra-large end-to-end multimodal models unexplored. The evaluation is restricted to four basic tasks (ASR, emotion, age, gender) and English datasets, meaning findings may not fully generalize to complex open-ended spoken question answering or code-switched multilingual speech tasks. Furthermore, the analysis of activation clustering assumes fixed hyperparameter choices like cluster counts that are impractical to optimize dynamically in real-world defensive settings.

## Why read this

Speech and ML security researchers should read this paper to understand that unimodal data filtering defenses and plug-and-play component reuse assumptions fail in multitask, multimodal speech language models due to complex feature dilution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing open-source pretrained speech encoders and multimodal speech language model pipelines for supply-chain vulnerabilities, data poisoning resilience, and secure component integration.

## Institutions / 機構

University of British Columbia, Ecole de technologie superieure, Johns Hopkins University

## Related

- (link related pages by id as the wiki grows)
