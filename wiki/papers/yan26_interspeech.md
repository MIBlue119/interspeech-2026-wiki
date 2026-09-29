---
id: yan26_interspeech
category: enhancement-separation
labels: [self-supervised, generative-model, robustness-noise]
institutions: ["Alibaba"]
code: https://github.com/alibaba/unified-audio
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-192
pdf: https://www.isca-archive.org/interspeech_2026/yan26_interspeech.pdf
---

# UniSE: A Unified Framework for Decoder-Only Autoregressive LM-Based Speech Enhancement

*Haoyin Yan, Chengwei Liu, Shaofei Xue, Xiaotao Liang, Yinghao Liu, Yuxiang Kong, Zheng Xue*

[PDF](https://www.isca-archive.org/interspeech_2026/yan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-192)

**Category:** `enhancement-separation` · **Labels:** `self-supervised`, `generative-model`, `robustness-noise`

**TL;DR** — UniSE is a unified decoder-only autoregressive language model framework that handles multiple speech enhancement sub-tasks (speech restoration, target speaker extraction, and speech separation) by predicting discrete audio codec tokens conditioned on pretrained feature extractors. It achieves state-of-the-art DNSMOS overall quality (OVRL 3.64 with reinforcement learning) on the DNS 2020 Challenge test set.

## Key contributions

- A decoder-only autoregressive speech enhancement framework that utilizes continuous conditional features to generate discrete target speech tokens.
- A task token conditioning mechanism to distinguish between operational modes, unifying speech restoration, target speaker extraction, and speech separation within a single architecture.
- A progressive reinforcement learning (PRL) strategy using multi-stage Direct Preference Optimization (DPO) to align generated speech with perceptual quality and feature similarity criteria.
- A multi-mode inference pipeline that chains restoration, target speaker extraction, and reverse extraction to solve two-speaker separation tasks without task-specific architectural changes.

## Problem

Traditional speech enhancement systems focus on isolated tasks like single-channel denoising or are confined to single distortions, making them difficult to scale across diverse acoustic degradation scenarios. Prior generative language model approaches either use two-stage autoregressive designs, complex continuous-to-discrete prefix mappings, or are restricted to non-autoregressive masked generation paradigms. This limits their extensibility and unified multi-task capacity. Furthermore, standard signal-level training objectives like SI-SNR correlate poorly with human auditory perception, highlighting a critical gap that reinforcement learning alignment aims to bridge.

## Method

UniSE utilizes a 12-layer LLaMA-based decoder-only architecture with 8 attention heads and a hidden dimension of 512, totaling 63M parameters (scaling to ~263.9M parameters inclusive of adapters). Conditioning inputs are derived from a frozen pre-trained WavLM model (averaging all transformer layers) mapped through a trainable linear adapter to extract continuous features for reference (Er) and degraded speech (Ed). Target audio is tokenized using BiCodec, yielding a 32-token fixed-length global speaker feature (Eg) and a variable-length semantic feature at 50 tokens/second (Es). Three operational modes are controlled via unique task tokens: TSR (Speech Restoration), TTSE (Target Speaker Extraction), and TrTSE (Reverse Target Speaker Extraction).

The network is pre-trained via cross-entropy loss by minimizing the negative log-likelihood of target sequences. Following pre-training, a Progressive Reinforcement Learning (PRL) fine-tuning strategy via Direct Preference Optimization (DPO) is executed in two stages. Stage 1 (S1) uses DNSMOS (averaging SIG, BAK, and OVRL sub-scores) as the reward criterion combined with cross-entropy loss (weighted by alpha = 0.4) to prevent mode collapse and preserve speaker similarity (SIM). Stage 2 (S2) additionally incorporates WavLM feature Euclidean distance to reinforce semantic and acoustic consistency against ground truth.

During inference, audio is processed in fixed 5-second chunks. For two-speaker separation (SS), a multi-mode inference strategy is executed: the SR mode extracts the louder speaker, which then serves as the reference condition for the TSE mode to extract the first target speaker, followed by the rTSE mode using the first speaker's output as a reference to isolate the remaining speaker.

## Experimental setup

Training data comprises 3,760 hours of clean speech from VoxBox (760h LibriSpeech, 1200h MLS English, 1800h Emilia ZH), combined with 460 hours of noise from DNS Challenge, FSD50K, WHAM!, DESED, DEMAND, MUSAN, DISCO, MUSDB18-HQ, and TUT Urban, plus 60,000 RIRs from SLR28. Evaluation benchmarks include DNS 2020 Challenge test sets, URGENT 2025 Challenge blind test set, Libri2Mix clean and noisy test sets, and WSJ0-2mix. Metrics include DNSMOS (SIG, BAK, OVRL), NISQA, UTMOS, and WavLM-based speaker similarity (SIM). The model is optimized using AdamW for 30 epochs with a peak learning rate of 1e-3 (4k warmup steps, 0.98 decay factor per epoch). DPO fine-tuning runs for 5k steps with a batch size of 32 and learning rate of 5e-5.

## Results

UniSE establishes strong performance across all evaluated speech enhancement domains. On the DNS 2020 Challenge test set (with reverberation), the base model achieves an OVRL of 3.41, outperforming generative baselines like MaskSR (3.25) and LLaSE-G1 (3.33). Applying the full Progressive Reinforcement Learning (PRL) pushes the DNSMOS OVRL to 3.64 with Reverb and 3.57 on No Reverb conditions. On the URGENT 2025 Challenge blind test set, UniSE + PRL achieves an OVRL of 3.34, NISQA of 3.83, and UTMOS of 2.95, outperforming competing challenge submissions.

On the Libri2Mix clean test set for target speaker extraction, UniSE + PRL achieves an OVRL of 3.45 and SIM of 0.95, closely matching specialized systems like LauraTSE. For speech separation on Libri2Mix and WSJ0-2mix test sets, UniSE outperforms discriminative models (Sepformer, Mossformer2) and generative baselines (LLaSE-G1), recording Libri2Mix OVRL of 3.34 (rising to 3.55 with PRL) and WSJ0-2mix OVRL of 3.36 (rising to 3.49 with PRL). Ablations show that autoregressive modeling significantly outperforms non-autoregressive token mapping (NAR OVRL drops to 2.96 with reverb), and balancing the DPO loss weight at alpha = 0.4 is critical to prevent degradation in speaker similarity.

| System / Condition | DNSMOS OVRL (With Rev) | Libri2Mix TSE OVRL | Libri2Mix SS OVRL | WSJ0-2mix SS OVRL |
|---|---|---|---|---|
| Mixture / Noisy Baseline | 1.39 | 2.65 | 1.64 | 2.76 |
| LLaSE-G1 [13] | 3.33 | 3.22 | 3.11 | 3.19 |
| UniSE (Base) | 3.41 | 3.33 | 3.34 | 3.36 |
| UniSE + S1 (DNSMOS) | 3.55 | - | - | - |
| UniSE + S2 (+ WavLM SIM) | 3.57 | - | - | - |
| UniSE + PRL (Full) | 3.64 | 3.45 | 3.55 | 3.49 |

## Limitations

The framework relies on full-utterance conditioning and chunked processing, making it unsuitable for strict low-latency streaming applications. Autoregressive decoding efficiency is lower compared to non-autoregressive alternatives. Performance is bound by the fidelity constraints and reconstruction limits of the underlying neural audio codec (BiCodec).

## Why read this

Speech and machine learning researchers working on generative audio models and multi-task audio frameworks should read this paper to see how decoder-only LMs can unify restoration, separation, and extraction via task-specific tokens and progressive reinforcement learning.

## Code

- https://github.com/alibaba/unified-audio

## Applications

Universal audio preprocessing pipelines, conference communication systems, hearing aids, and multi-speaker transcription front-ends.

## Institutions / 機構

Alibaba

## Related

- (link related pages by id as the wiki grows)
