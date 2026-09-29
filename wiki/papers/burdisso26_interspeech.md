---
id: burdisso26_interspeech
category: asr
institutions: ["Idiap Research Institute", "EPFL", "University of Zurich", "Uniphore", "Brno University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3422
pdf: https://www.isca-archive.org/interspeech_2026/burdisso26_interspeech.pdf
---

# Avoiding Catastrophic Forgetting in Text-Only Adaptation of LLM-based ASR via Multi-View Text Denoising

*Sergio Burdisso, Esaú Villatoro-Tello, Thibault Bañeras-Roux, Shashi Kumar, Srikanth Madikeri, Pradeep Rangappa, Manjunath K E, Petr Motlicek, Andreas Stolcke*

[PDF](https://www.isca-archive.org/interspeech_2026/burdisso26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/burdisso26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3422)

**Category:** `asr`

**TL;DR** — The paper introduces a multi-view noise-driven batching strategy for text-only domain adaptation in LLM-based ASR, preventing catastrophic forgetting by framing adaptation as a multi-view denoising task and achieving up to 25.4% relative WER improvement.

## Key contributions

- A text-only adaptation formulation for LLM-based ASR that preserves speech-to-LLM cross-modal alignment without requiring architectural modifications or extra learnable parameters.
- A multi-view noise-driven batching scheme that combines paired source audio-text, projector-induced noisy transcripts, synthetically corrupted source transcripts, and corrupted target transcripts.
- Comprehensive evaluation across in-domain, out-of-domain, and cross-domain setups on DefinedAI and SlideSpeech datasets, yielding up to 25.4% relative WER improvements over prior text-only adaptation baselines.
- Public release of source code to facilitate reproducibility.

## Problem

Adapting LLM-based automatic speech recognition systems to novel target domains typically requires expensive paired audio-text data, while relying solely on target-domain text leads to catastrophic forgetting of the cross-modal alignment established by the speech projector. Previous text-only adaptation approaches for end-to-end ASR—such as intermediate CTC adaptation, shallow fusion with external language models, text-to-mel generation, decoder adaptation for Whisper, checkpoint monitoring (Fang et al.), and soft-prompt insertion (Ma et al.)—either fail to protect the speech-text bridge or struggle under domain shifts. Solving this gap is crucial because text data is vastly more abundant and cheaper to acquire than transcribed speech.

## Method

The architecture comprises a pretrained speech encoder (WavLM-Large), a learnable speech projector (single linear layer with a ReLU activation and regression layer), and a frozen pretrained LLM decoder (Llama 3.2 3B Instruct). The method models ASR inference as a denoising task where the projector maps audio into soft tokens mimicking corrupted text; text-only adaptation is achieved by substituting missing target audio with synthetic noise and fine-tuning the LLM using LoRA applied to self-attention query and value projection layers (rank 16, alpha 32, learning rate 1e-4, 1000 warm-up steps, 5 epochs).

Mini-batches are constructed using a multi-view composition strategy defined by proportions σa, σta, σt, and τ. Here, σa contains paired source audio-text (sp(a), t), σta contains projector-induced noisy transcripts from source audio (noisea(t), t), σt contains synthetically corrupted source transcripts (noise(t), t), and τ contains corrupted target-domain transcripts (noise(t), t) from Dtgt. The synthetic noise function noise(t) uses nlpaug to randomly select 15% of words and replace 30% of their characters with random symbols (1 to 10 edits per utterance), followed by a 10% chance for each character to be repeated 1 to 3 times to mimic projector duplication patterns. Proportions are set via a heuristic where τ is proportional to the relative training size of the target domain, and the remaining source shares are distributed equally as σa = σta = σt = (1 - τ)/3.

During inference, the model takes speech audio through the encoder and projector to generate the input prompt, producing the final transcription without needing any adaptation modules or target audio.

## Experimental setup

Experiments use two conversational speech corpora: DefinedAI (customer-agent telephone calls, 125 total hours used across Banking, Insurance, and Healthcare splits) and SlideSpeech (YouTube conference videos, 1,000 total hours, partitioning Life, Talent, and English as source and Agriculture, Animation, and Musical Instruments as target). Baselines include the non-adapted base model, fully supervised audio-adapted models (best-case upper bound), and text-only adaptation methods by Fang et al. and Ma et al. Evaluation metric is Word Error Rate (WER, %) along with relative improvement (Δ, %).

## Results

On in-domain DefinedAI tasks, the proposed method reduces WER to 6.53% on Banking (18.6% relative improvement) and 7.59% on Insurance (18.9% improvement), significantly outperforming Fang et al. (7.89% / 9.10%) and Ma et al. (7.75% / 9.24%). On out-of-domain SlideSpeech tasks, it achieves WERs of 15.56% (Ag), 15.35% (An), and 14.10% (MI), outperforming baselines across all splits. In the challenging cross-domain setup (DefinedAI source to SlideSpeech target), it records substantial relative gains, such as 25.4% improvement on Animation (25.32% WER vs 33.92% base) and 25.1% on Agriculture. Ablations confirm that omitting the source audio component (σa = 0) causes catastrophic failure, degrading WER by over 30% due to loss of speech-text alignment, and that syntactic noise perturbation outperforms random or empty text inputs.

| System | Banking (WER / $\Delta$) | Insurance (WER / $\Delta$) |
|---|---|---|
| Base model | 8.02 / — | 9.36 / — |
| Adapted model (audio) | 4.55 / 43.3% | 6.01 / 35.8% |
| Fang et al. [14] | 7.89 / 1.6% | 9.10 / 2.8% |
| Ma et al. [23] | 7.75 / 3.4% | 9.24 / 1.3% |
| **Ours** | **6.53 / 18.6%** | **7.59 / 18.9%** |

## Limitations

The approach relies heavily on a heuristic proportion setting for τ and requires access to at least a small source-domain audio-text dataset to preserve alignment (σa > 0). While it successfully narrows the linguistic gap, it still underperforms compared to audio-based adaptation under severe cross-domain acoustic shifts. The evaluation is scoped to conversational telephone and video data in English, leaving multilingual and extreme low-resource acoustic scenarios unverified.

## Why read this

Speech and ML researchers working on domain adaptation for LLM-based ASR will find a clean, parameter-efficient framework that eliminates the need for target audio by cleverly reformulating adaptation as multi-view text denoising.

## Code

- https://github.com/idiap/llm-asr-text-only-adaptation

## Applications

Adapting conversational voice assistants, customer service transcription bots, and automated meeting minutes systems to new proprietary industrial domains using unlabelled transcript text alone.

## Institutions / 機構

Idiap Research Institute, EPFL, University of Zurich, Uniphore, Brno University of Technology

**Funding / 經費:** Idiap Research Institute and Uniphore collaboration project, EU Horizon 2020 project ELOQUENCE

## Related

- (link related pages by id as the wiki grows)
