---
id: fan26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2746
pdf: https://www.isca-archive.org/interspeech_2026/fan26b_interspeech.pdf
---

# Robust Multi-Tier Infant-Centered Audio Understanding with Whisper via Structured Speaker Conditioning

*Xulin Fan, Jialu Li, Mohammad Nur Hossain Khan, Kexin Hu, Bashima Islam, Mark Hasegawa-Johnson, Nancy L. McElwain*

[PDF](https://www.isca-archive.org/interspeech_2026/fan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2746)

**TL;DR** — A multi-tier audio tagging framework for naturalistic infant-centered home recordings combines a LoRA-finetuned Whisper encoder with a target-speaker-aware Transformer to jointly perform diarization and vocalization classification. It achieves an average Macro-F1 of 74.88% across four speaker tiers, outperforming prior SSL and adaptation baselines.

## Key contributions

- A sequence-level multi-tier tagging model combining a LoRA-adapted Whisper encoder, an MLP projector, a target speaker extractor, and tier-specific classifiers that handles simultaneous overlapping vocalizations.
- A factorized speaker-token representation comprising a shared tier token plus a learned family-specific offset to isolate invariant tier profiles from household variability.
- An auxiliary sequence-level temporal smoothing loss penalizing rapid label oscillations to ensure consistent framewise predictions.

## Problem

Analyzing daylong naturalistic infant-centered home recordings requires fine-grained, frame-level joint diarization and vocalization classification across multiple family members. Prior approaches—such as standard supervised classifiers, general audio taggers, or models designed for single-tier outputs (e.g., W2V-LB)—fail to adequately model simultaneous overlapping vocalizations from multiple speakers. Furthermore, severe cross-family acoustic variations, variable wearable microphone distances, and low signal-to-noise ratios introduce significant domain shifts that compromise standard models.

## Method

The model uses a pre-trained Whisper-large-v2 acoustic backbone that processes 30-second audio clips into D=1280 hidden states, fine-tuned using LoRA (rank r=4, alpha=8) applied to query and value projections. A non-overlapping windowed MLP projector groups consecutive frames with window size w=5 and projects them down to D'=512 to reduce temporal resolution and computational overhead. 

Next, a target-speaker extractor conditions a two-layer Transformer encoder (8 attention heads, feed-forward dimension 2048) on a family-aware speaker token. This token is constructed by adding a shared tier token s_tau (capturing general speaker profiles for child, female caregiver, male caregiver, or sibling) and a learned family offset o_{tau,f}. At inference, offsets are set to zero so only shared tier tokens are used. Finally, dedicated two-layer MLP classifiers process the tier-specific sequence to output mutually exclusive framewise vocalization labels.

The training objective combines standard per-tier cross-entropy loss with a temporal smoothing loss weighted by lambda=0.2. This auxiliary loss penalizes rapid posterior changes across adjacent frames to stabilize predictions and enforce duration consistency.

## Experimental setup

Evaluated on ~17 hours of annotated audio from 52 families collected via LittleBeats wearable devices, split into 37 training, 5 validation, and 10 test families with zero family overlap. Baselines include TL-TR512 (adapted Whisper-AT) and W2V-LB (Wav2Vec2 pretrained on 4300 hours of home audio evaluated with and without overlap removal). Evaluated using Macro-F1 and Cohen's kappa across four tiers (CHN, FAN, MAN, CXN). Models are trained for 20 epochs using the Adam optimizer at a learning rate of 0.001 on a single NVIDIA A100 GPU.

## Results

The proposed method achieves an average Macro-F1 of 74.88% and Cohen's kappa of 68.14%, outperforming TL-TR512 (69.55% F1) and W2V-LB (67.27% F1 under multi-tier evaluation) across overall averages and most individual tiers. The largest performance gains appear in adult tiers (e.g., MAN Macro-F1 reaches 79.92% vs 61.07% for W2V-LB), benefiting from Whisper's large-scale adult speech pretraining. Ablation studies confirm that removing LoRA drops average Macro-F1 to 70.45%, removing family offsets drops it to 73.32%, and removing temporal smoothing drops it to 72.66%.

| Systems | AVG Macro-F1 | AVG Kappa | CHN Macro-F1 | FAN Macro-F1 | MAN Macro-F1 | CXN Macro-F1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TL-TR512 | 69.55 | 64.04 | 58.42 | 69.76 | 72.77 | 77.26 |
| W2V-LB | 67.27 | 59.27 | 68.72 | 61.90 | 61.07 | 77.39 |
| Proposed | 74.88 | 68.14 | 69.13 | 71.60 | 79.92 | 78.87 |
| w/o LoRA | 70.45 | 63.37 | 62.64 | 69.82 | 71.72 | 77.66 |
| w/o $o_{\tau,f}$ | 73.32 | 67.20 | 66.64 | 71.30 | 77.34 | 78.00 |
| w/o $L_{smooth}$ | 72.66 | 66.44 | 65.72 | 71.00 | 76.61 | 77.31 |

## Limitations

Evaluated on a relatively small dataset of 52 families (~17 hours total annotated audio), which may restrict generalization to wider demographic and acoustic distributions. The model struggles more on the infant tier (CHN) compared to adult tiers due to Whisper's pretraining bias toward adult speech. Furthermore, unsupervised test-time adaptation of family offsets yielded only marginal improvements, showing that zero-shot deployment on entirely unseen households remains constrained.

## Why read this

Read this if you want to see how to effectively adapt large-scale speech foundation models like Whisper for multi-tier, overlapping framewise speaker diarization and audio tagging in noisy, real-world environments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated behavioral analysis of infant-caregiver interactions in home and clinical environments using wearable audio devices.

## Related

- (link related pages by id as the wiki grows)
