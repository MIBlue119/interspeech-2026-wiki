---
id: sharon26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1705
pdf: https://www.isca-archive.org/interspeech_2026/sharon26_interspeech.pdf
---

# Less can be More: What Aspects of Speech Drive End-of-Turn Detection

[PDF](https://www.isca-archive.org/interspeech_2026/sharon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sharon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1705)

**TL;DR** — A controlled ablation across all seven modality subsets demonstrates that an acoustic-prosodic streaming end-of-turn detector achieves an utterance F1 of 0.93 with 7.8% false alarms at 400ms median latency, while incorporating text features increases false alarms without improving performance.

## Problem

In conversational AI, streaming end-of-turn (EOT) detection balances the trade-off between responding too early and creating unnatural delays, but prior multimodal studies have not systematically isolated the relative contributions of acoustic, prosodic, and semantic signals. While text is commonly added to capture semantic completeness, speakers often produce syntactically complete units mid-utterance, and integrating text introduces ASR error propagation, higher inference costs, and frequent false interruptions.

## Method

The authors introduce APT, a lightweight trimodal streaming EOT detector comprising frozen acoustic (70M-param Zipformer2 encoder), prosodic (5 librosa features aggregated to 16D), and text (MiniLM sentence embeddings cached on blank ASR frames) streams operating at a unified 25Hz frame rate (40 ms per frame). Each stream passes through an independent projection stage, a depthwise separable temporal convolution over a 7-frame causal window (280 ms), and a shared fusion module (concatenated to 272D, projected to 128D, then 1D sigmoid). Modality ablation is achieved by replacing disabled streams with fixed zero-valued buffers and freezing their gradients, ensuring identical architecture, parameter count (~261K trainable parameters in the fusion head), and optimization across all seven non-empty subsets.

## Results

Evaluated on 5,000 utterances from a proprietary multi-domain English telephony corpus (8 kHz stereo, 10K training segments, 2K validation), the acoustic-prosodic (A+P) model achieves the best performance with an utterance F1 of 0.930, 7.8% false alarms, 5.2% miss rate, and 400ms median latency. The acoustic-only (A) model achieves F1 0.927 with 9.2% FA and 440ms latency, whereas the text-only (T) model performs poorly with F1 0.292 and 74.8% FA. Incorporating text into multimodal configurations (e.g., APT reaching F1 0.909 and 10.7% FA) significantly increases false alarms per utterance (Wilcoxon p < 10^-9) due to mid-turn syntactic completions triggering premature detections.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and conversational AI engineers building voice agents, telephony bots, and real-time dialogue systems can use these findings to optimize EOT detection modules and eliminate unnecessary text inference overhead.

## Limitations

The study is restricted to in-domain two-speaker English telephony, and text may provide greater value in domains or low-resource languages with weaker acoustic EOT cues.

## Related

- (link related pages by id as the wiki grows)
