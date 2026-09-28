---
id: feghhi26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2947
pdf: https://www.isca-archive.org/interspeech_2026/feghhi26_interspeech.pdf
---

# Lightbeam: An Accurate and Memory-Efficient CTC Decoder for Speech Neuroprostheses

*Ebrahim Feghhi, Junlin Hu, Nima Hadidi, Jonathan Kao*

[PDF](https://www.isca-archive.org/interspeech_2026/feghhi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/feghhi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2947)

**TL;DR** — LightBeam is an accurate and memory-efficient non-WFST CTC decoder for speech neuroprostheses that integrates an LLM into the first-pass beam search via delayed fusion, reducing RAM consumption from ~320 GB to ~10 GB while setting a new state-of-the-art Word Error Rate.

## Key contributions

- Replaces memory-intensive WFST decoders and large 5-gram LMs with a GPU-accelerated vectorized lexicon and a 4-gram LM, cutting RAM requirements from ~320 GB down to ~9.4-11.6 GB.
- Introduces delayed fusion to integrate an LLM (Llama 3.2 1B Base) directly into the first-pass beam search at fixed time intervals, outperforming end-of-trial-only rescoring.
- Adapts the Llama 3.2 1B Base decoder via next-word prediction fine-tuning on combined training and validation transcript distributions.
- Establishes a new published state-of-the-art Word Error Rate across Brain-to-Text '24 and '25 benchmarks when paired with time-masked Transformer encoders and generative error correction.

## Problem

State-of-the-art speech neuroprostheses decode speech from cortical intracranial neural activity using Connectionist Temporal Classification (CTC) encoders combined with Weighted Finite-State Transducer (WFST) decoders. However, these WFST pipelines require massive computational resources—specifically ~320 GB of system RAM—due to pre-compiled graph structures and unpruned N-gram language models. These extreme memory requirements create a severe deployment bottleneck that hinders local execution on resource-constrained hardware, limiting user privacy, increasing transmission latency, and restricting accessibility for both patients and independent researchers.

## Method

LightBeam adapts the GPU-accelerated FlexCTC decoder framework for neural speech decoding. At each 20 ms / 80 ms / 100 ms encoder frame, the model takes log-probabilities from a CTC encoder (such as a baseline GRU or causal time-masked Transformer yielding 41 token classes: 39 phonemes, a blank token, and a word-boundary space), applies an acoustic scale, and expands $k$ beams by adding encoder log-probs to form a $k \times |V|$ candidate matrix. A token extension bonus $\beta$ is applied to non-repeating phonemes and a word insertion bonus $\gamma$ to space tokens. To bypass CPU-bound trie structures, the lexicon is structured as a vectorized state transition table $T$ on GPU, where each row tracks valid prefix states and sink states handle out-of-vocabulary transitions. Candidates violating lexical constraints or falling below threshold $\theta$ from the top beam score are pruned.

Shallow fusion maintains $o$ orthographic (word-level) beams per search path to track homophones. When word boundaries are detected, candidate homophones are scored via a 4.9 GB 4-gram LM (trained on 8.6B words with a 100k vocabulary) on CPU, keeping the top $o$ paths within a score threshold $\lambda$. To capture global context without full WFST overhead, delayed fusion injects an LLM (Llama 3.2 1B Base, pre-adapted via next-word prediction fine-tuning on benchmark text distributions) at fixed intervals (every 1.0s for B2T '24 and 1.25s for B2T '25). At these intervals, unique orthographic beams are batched on GPU, N-gram scores are swapped for LLM scores, and end-of-sentence punctuation is finalized at trial ends. When combined with generative error correction, 10 encoder random seeds generate candidate sentences that are processed by a Llama 3.1 8B Instruct model to yield final transcripts.

## Experimental setup

Evaluated on the Brain-to-Text '24 dataset (12,100 sentences from participant T12 across 25 sessions over 4 months using 128-electrode Utah arrays) and the Brain-to-Text '25 dataset (10,948 sentences from participant T15 across 45 sessions over 20 months using 256-electrode arrays). Neural features consist of thresholded spike counts and spiking-band power binned in 20 ms windows and z-scored. Compared against baseline WFST-based decoders (original and re-implemented) using baseline bidirectional/unidirectional GRU encoders and causal time-masked Transformer encoders. Metrics include Word Error Rate (WER) and Real-Time Factor (RTF) measured on an NVIDIA GeForce RTX 5090 GPU across 10 random seeds.

## Results

When using the baseline GRU encoder on the B2T '24 test set, LightBeam achieves a WER of 9.37%, significantly outperforming both the original WFST baseline (9.76%) and the re-implemented WFST baseline (9.71%), while reducing peak RAM from ~322.9 GB to 9.4 GB and VRAM from 9.0 GB to 5.6 GB. On the B2T '25 test set, LightBeam yields a public WER of 5.77% and private WER of 6.47% (vs. 6.31% and 6.72% for the WFST re-implementation), dropping RAM from ~317.8 GB to 11.6 GB and VRAM from 18.1 GB to 5.8 GB. When coupled with the time-masked Transformer and generative error correction, LightBeam attains mean WERs of 5.01% (B2T '24), 2.36% (B2T '25 private), and 2.08% (B2T '25 public), establishing a new published state-of-the-art. Across all configurations, LightBeam's RTF stays well below 1.0 (ranging from 0.05 to 0.14), satisfying real-time clinical constraints.

Ablations demonstrate that removing continuous delayed fusion (falling back to end-of-trial LLM rescoring) significantly degrades validation WER from 14.17% to 17.17% on B2T '24 and from 6.36% to 8.31% on B2T '25. Omitting next-word prediction fine-tuning for the LLM similarly causes significant degradation (15.89% on B2T '24). LightBeam does not win on raw computational speed when compared to the WFST baseline; due to frequent LLM invocations, its RTF is higher (e.g., 0.14 vs 0.05 on B2T '24 GRU), though still clinically viable.

| System / Condition | B2T '24 WER (%) | B2T '25 Pub WER (%) | B2T '25 Priv WER (%) | Peak RAM (GB) | RTF |
| :--- | :--- | :--- | :--- | :--- | :--- |
| WFST-Based (Original) | 9.76 | 6.67 | 7.00 | ~320 | - |
| WFST-Based (Re-impl. GRU) | 9.71 | 6.31 | 6.72 | 322.9 | 0.05 |
| LightBeam (Ours, GRU) | 9.37 | 5.77 | 6.47 | 9.4 | 0.14 |
| WFST-Based (Transformer) | 8.36 | 4.95 | 4.81 | - | 0.02 |
| LightBeam (Transformer) | 8.08 | 4.44 | 4.59 | - | 0.10 |

## Limitations

LightBeam exhibits higher computational latency than traditional WFST decoders, resulting in a higher real-time factor, although it remains below the real-time threshold (RTF < 1). The fixed-interval integration of LLM scores can cause decoding jitter if significant score divergences occur between the LLM and the N-gram LM. Additionally, the requirement for next-word prediction fine-tuning implies that deployment on new participants requires calibration data to match idiosyncratic text distributions.

## Why read this

Speech/ML engineers and researchers building brain-computer interfaces or resource-constrained speech decoders should read this paper to learn how to replace memory-prohibitive 320GB WFST graphs with a 10GB GPU-accelerated delayed-fusion architecture that improves accuracy.

## Code

- https://doi.org/10.5281/zenodo.20564139

## Applications

Local, patient-facing speech neuroprostheses for individuals with paralysis, ALS, and anarthria requiring privacy-preserving, low-latency, and memory-efficient decoding.

## Related

- (link related pages by id as the wiki grows)
