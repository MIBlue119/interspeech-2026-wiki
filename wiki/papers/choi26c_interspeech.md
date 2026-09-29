---
id: choi26c_interspeech
category: speech-llm-dialogue
labels: [streaming-real-time]
institutions: ["Electronics and Telecommunications Research Institute"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1854
pdf: https://www.isca-archive.org/interspeech_2026/choi26c_interspeech.pdf
---

# Considerate Listener Modeling for Korean Streaming Backchannel Prediction

*Yong-Seok Choi, Seung Hi Kim, Sung Yup Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/choi26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1854)

**Category:** `speech-llm-dialogue` · **Labels:** `streaming-real-time`

**TL;DR** — The paper proposes a zero look-ahead streaming backchannel predictor that combines pause-aware soft scaling with Q-Former text fusion, reducing semantic false discoveries by 53.8% and improving Macro-F1 by 2.16 pp on a Korean counseling corpus compared to an acoustic baseline.

## Key contributions

- Formalized the 'Considerate Listener' framework and introduced Semantic False Discovery Rate (Semantic FDR) to quantify backchannel predictions in pragmatically inappropriate pause regions.
- Proposed pause-aware soft scaling using a Pause Detector (PD) to softly weight block-level acoustic features and concentrate decisions near pause boundaries.
- Employed Q-Former cross-attention over partial ASR hypotheses to incorporate zero look-ahead text discourse context for filtering out inappropriate backchannel regions.
- Demonstrated that combining soft scaling and text-guided fusion substantially reduces pragmatic false positives without degrading overall classification Macro-F1.

## Problem

Streaming backchannel prediction faces three primary challenges: latency constraints from look-ahead frames, severe class imbalance (where positive backchannel events are sparse), and pragmatic appropriateness. Prior acoustic-only models frequently over-predict backchannels during pauses that follow direct questions or directives (termed NOBC-PauseFP regions), because acoustic cues alone cannot capture the linguistic discourse context needed to know if a reply is required instead of a backchannel. This causes intrusive interruptions, disrupts conversational flow, and degrades user experience.

## Method

The system architecture builds upon a block-wise streaming multitask baseline sharing a common acoustic encoder, which processes STFT frames (20 ms window, 10 ms hop) into fixed-size blocks of 400 ms (with block size L_block=40, hop L_hop=4, and look-ahead L_look-ahead=0). The acoustic encoder output feeds a Pause Detector (PD), an ASR decoder, and a BC predictor. The PD outputs a scalar block pause probability p_b^pause which is used as a soft scaling factor on the mean-pooled acoustic representation ā_b to softly down-weight non-pause blocks and bias decisions toward pause boundaries.

Simultaneously, streaming partial ASR hypotheses are processed via a BLIP-2-style Q-Former module (N_q=16, 4-layer decoder, 4 heads, FFN dim 2048) utilizing a training-only causal text mask M_text^b to prevent looking into future tokens. The resulting text features F_text^b are concatenated with the softly-scaled acoustic features before passing into a 1-layer Transformer encoder for final classification. The acoustic stream drives primary opportunity detection, while the text features inform attention to suppress false positives in inappropriate discourse regions.

The training setup utilizes a multitask objective combining cross-entropy losses for both the BC predictor and the PD (L_BC and L_PD, with λ_1 = λ_2 = 0.5 and λ_PD = 1.0, and λ_BC dynamically clipped between 0.05 and 5.0 based on inter-task loss ratios). Per-class loss weights are set proportional to the inverse square root of class frequencies. Optimization uses Adam with WarmupLR (peak learning rate 10^-3, 5,000 warmup steps) for up to 100 epochs with a batch size of 128 on a single NVIDIA A40 GPU using ESPnet2.

## Experimental setup

Evaluated on a private Korean counseling corpus consisting of 116 sessions (~99 hours) split into 83/22/11 sessions for train/validation/evaluation. Pause intervals are defined as inter-word gaps >=200 ms using WhisperX word timestamps. Baselines include an acoustic-only model variant (A) and intermediate single-component ablations (B: soft scaling only, C: text fusion only) compared against the full model (D). Key evaluation metrics are Precision, Recall, BC-F1, Macro-F1, and Semantic False Discovery Rate (Semantic FDR).

## Results

The baseline acoustic-only model (A) achieves a high recall of 80.40% but suffers from low precision (24.72%) and a Macro-F1 of 66.77%. Adding pause-aware soft scaling (B) improves Macro-F1 by 1.00 pp to 67.77% and lowers Semantic FDR from 5.76% to 4.83%. Text fusion alone (C) achieves the highest Macro-F1 of 69.14% and a Semantic FDR of 3.74%. The full model combining both (D) achieves a Macro-F1 of 68.93% and attains the lowest Semantic FDR of 3.07%, reducing Semantic False Positives by 53.8% (from 197 down to 91 errors out of 2,960 total predictions), confirming that combining timing cues with text-guided discourse context successfully eliminates inappropriate intrusions.

| System / Condition | Precision (%) | Recall (%) | BC F1 (%) | Macro-F1 (%) | Semantic FDR (%) |
|---|---|---|---|---|---|
| (A) Baseline (Acoustic-only) | 24.72 | 80.40 | 37.81 | 66.77 | 5.76 |
| (B) + Pause Scaling | 26.39 | 77.62 | 39.39 | 67.77 | 4.83 |
| (C) + Text Fusion | 28.39 | 79.54 | 41.84 | 69.14 | 3.74 |
| (D) Full System (Scaling + Text) | 28.85 | 71.74 | 41.15 | 68.93 | 3.07 |

## Limitations

The empirical evaluation is restricted to a single private Korean counseling corpus, limiting demonstrated cross-lingual generalizability and domain breadth. Furthermore, text-guided fusion depends on partial ASR hypotheses under strict zero look-ahead inference, making the system potentially vulnerable to real-time ASR substitution or omission errors.

## Why read this

Read this paper if you build real-time conversational agents or spoken dialogue systems and want to eliminate mistimed, annoying backchannel interruptions using a principled zero look-ahead architecture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time conversational spoken dialogue systems, empathetic social robots, and voice assistants.

## Institutions / 機構

Electronics and Telecommunications Research Institute

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
