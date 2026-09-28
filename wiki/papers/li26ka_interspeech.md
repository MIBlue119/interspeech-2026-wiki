---
id: li26ka_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3434
pdf: https://www.isca-archive.org/interspeech_2026/li26ka_interspeech.pdf
---

# Read What You Hear: Reference-Free Hypotheses Evaluation with Acoustic Discrepancy

*Zhihan Li, Hankun Wang, Yiwei Guo, Bohan Li, Xie Chen, Kai Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ka_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ka_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3434)

**TL;DR** — READ (Reference-free Hypothesis Evaluation with Acoustic Discrepancy) evaluates ASR hypotheses directly from speech audio using an off-the-shelf autoregressive TTS model, achieving up to 21.46% relative error reduction via n-best rescoring and segment-level combination.

## Key contributions

- Proposes a training-free, reference-free ASR hypothesis evaluation metric (READ) based on conditional negative log-likelihood derived from a pre-trained autoregressive TTS model.
- Leverages internal cross-attention maps from the TTS decoder to establish a monotonic frame-to-token alignment without requiring external aligners.
- Enables fine-grained, segment-level system combination and n-best rescoring by exploiting the locality of acoustic discrepancy spikes.
- Demonstrates robust performance improvements, particularly under challenging high-noise and code-switching acoustic conditions.

## Problem

Traditional ASR evaluation relies heavily on reference transcripts like Word Error Rate (WER), which are unavailable in large-scale unsupervised or self-improvement settings. Existing reference-free methods—such as internal ASR confidence scores (prone to overconfidence and poor calibration), external text-only language model rescoring (which completely ignores the acoustic signal), and supervised Quality Estimation models (requiring error-labeled training data)—fail to properly balance linguistic plausibility with fine-grained acoustic grounding. Without explicit acoustic evaluation, current systems lack interpretable, diagnostic feedback to localize errors and refine hypotheses directly from raw speech signals.

## Method

READ evaluates a text hypothesis $X$ given a speech token sequence $Y$ using a pre-trained discrete autoregressive TTS model (CosyVoice2) in teacher-forcing mode. It computes the conditional negative log-likelihood (NLL) at each frame $t$ as $\text{READ}_t = -\log P_theta(y_t | x, y_{<t})$, serving as a fine-grained acoustic discrepancy map where loss spikes indicate misaligned or erroneous text segments. To map these frame-level scores back to text tokens, READ extracts the $T \times N$ self-attention submatrix from the TTS decoder layers and solves for a monotonic mapping $\pi^*$ via dynamic programming, maintaining internal consistency without relying on external alignment models.

For hypothesis refinement, READ is applied in three ways: (1) Sentence-level rescoring, where the total negative log-likelihood of the speech under different candidate hypotheses is summed to rank $n$-best lists (with a mild 0.95 scaling factor applied to retain base language model priors); (2) Segment-level combination, which divides audio into alternating consensus and disputed intervals across multiple ASR hypotheses, selecting the segment variant that minimizes READ; and (3) ROVER integration, where segment-level combinations are fed alongside original candidates into ROVER to inject regional acoustic bias.

## Experimental setup

Evaluated on LibriSpeech (test-clean, test-other), SPGISpeech, Switchboard, TEDLIUM3, VCTK-noisy, and Mandarin-English code-switching sets (ASRU2019, TALCS). Noise-augmented sets are constructed using WHAM! test noise at 0, 10, and 20 dB SNR. Uses CosyVoice2 official checkpoints without task-specific fine-tuning. Baselines include single ASR models (Whisper medium/large-v3, NVIDIA NeMo, Qwen2.5-Omni) and ROVER system combination.

## Results

On n-best rescoring over Whisper-large-v3 candidates, READ reduced WER by 7.28% on LibriSpeech-clean, 20.92% on TALCS-test, 20.57% on Switchboard-test, and 21.46% on SPGISpeech-val. In segment-level combination across four disparate ASR systems, READ consistently improved performance over single bests (e.g., VCTK-noisy dropping from a best single of 2.85% to 1.84% with segment combination). The evaluation metric demonstrated stronger correlation with WER as noise increased (Pearson correlation rising from 0.7213 on clean speech to 0.8539 at 0 dB SNR). Limitations include occasional performance degradation when disputed intervals are overly long, causing segment combination to degenerate into sentence-level selection.

| Dataset | Whisper large-v3 | Whisper medium | NeMo | Qwen2.5-Omni | ROVER | Ours (Segment) |
|---|---|---|---|---|---|---|
| LS-clean | 2.20 | 2.79 | 1.67 | 1.74 | 1.51 | 1.67 |
| LS-other | 4.16 | 7.52 | 3.65 | 3.45 | 3.18 | 3.39 |
| VCTK-noisy | 8.87 | 18.33 | 2.85 | 2.47 | 1.84 | 2.18 |
| ASRU-test | 10.35 | 11.98 | 21.70 | 8.00 | 9.04 | 7.60 |
| TALCS-test | 16.77 | 20.74 | 44.47 | 9.21 | 20.84 | 9.61 |

## Limitations

The approach assumes that the underlying TTS model's acoustic space aligns well with diverse acoustic environments, though extremely distorted audio can degrade TTS likelihood estimation. The segment-level combination strategy relies on a greedy selection scheme and a locality assumption that can fail if disputed intervals are excessively long. Furthermore, READ currently evaluates total acoustic discrepancy but requires further exploration to explicitly disentangle substitution, deletion, and insertion error types.

## Why read this

Speech and ML researchers working on unsupervised ASR improvement, confidence calibration, or system combination should read this to learn how to repurpose off-the-shelf autoregressive TTS models as powerful acoustic critics without any supervised training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unsupervised ASR hypothesis selection, n-best list rescoring, robust multi-system combination under noisy conditions, and error localization.

## Related

- (link related pages by id as the wiki grows)
