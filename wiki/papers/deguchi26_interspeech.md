---
id: deguchi26_interspeech
category: asr
labels: [efficient-on-device]
institutions: ["NTT"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2971
pdf: https://www.isca-archive.org/interspeech_2026/deguchi26_interspeech.pdf
---

# Non-Autoregressive Minimum Bayes' Risk Decoding for Fast Speech Recognition

*Hiroyuki Deguchi, Takatomo Kano, Katsuki Chousa, Marc Delcroix*

[PDF](https://www.isca-archive.org/interspeech_2026/deguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2971)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces NAR-MBR decoding, a novel non-autoregressive minimum Bayes' risk decoding framework for automatic speech recognition that eliminates the accuracy gap with autoregressive models without requiring extra model training. It achieves up to a 43.1x speedup over autoregressive beam search while significantly outperforming standard NAR decoding.

## Key contributions

- Formulates a non-autoregressive minimum Bayes' risk (NAR-MBR) decoding framework that maximizes expected utility over Monte Carlo samples drawn from an NAR model's output distribution.
- Proposes a zero-cost unbiased sampling technique for NAR models (like Mask-CTC) to draw multiple CTC alignment paths and masked tokens in a single forward pass.
- Engineers an efficient expected utility maximization procedure using longest common prefix/suffix stripping, duplicate pair caching, and parallelized Rust-based word-ID edit distance calculations.
- Demonstrates consistent, statistically significant WER reductions across LibriSpeech, Switchboard, AMI, and a web presentation corpus without any additional model training or fine-tuning.

## Problem

Autoregressive (AR) ASR decoding generates tokens sequentially from left to right, creating severe computational bottlenecks for long utterances because processing time scales linearly with sequence length. Non-autoregressive (NAR) decoding fixes this by generating tokens in parallel via an independence assumption, but suffers from a performance degradation known as the multi-modality problem, where uncertainty among multiple valid transcription paths leads to higher error rates. Prior work like Mask-CTC attempts to bridge this gap through iterative confidence-based mask prediction, but standard decoding rules like maximum a posteriori (MAP) fail to robustly handle path uncertainty. While minimum Bayes' risk (MBR) decoding successfully resolves uncertainty in AR models, applying it traditionally requires expensive sequential sampling and quadratic search costs that destroy the speed advantages of NAR architectures.

## Method

The proposed NAR-MBR decoding framework operates on top of pre-trained Mask-CTC models without modifying training objectives or introducing extra parameters. First, probabilistic unbiased sampling extracts multiple CTC alignment paths in a single forward pass by leveraging the independence assumption of NAR models, replacing biased greedy searches with categorical frame-level sampling. Second, confidence probabilities govern Bernoulli mask sampling for the conditional masked language model (CMLM) decoder, where the Gumbel-max trick is applied instead of top-k sampling to preserve unbiasedness across N_iter inference stages (typically evaluated at N_iter = 0, 1, and 10).

To compute the expected utility (EU) without losing speed, the framework treats the sample multiset as both the hypothesis set H and the pseudo-reference set R, utilizing negative word error rate (-WER) as the utility function. Exact EU maximization requires quadratic time, so the authors implement three major accelerations: (1) stripping longest common prefixes and suffixes between hypotheses and pseudo-references prior to edit distance evaluation, (2) deduplicating hypotheses and pseudo-references to cache and reuse pair-wise match scores, and (3) parallelizing the score calculations across CPU cores using a Rust implementation that maps words to u32 integer IDs to bypass slow string comparisons.

## Experimental setup

Evaluated on four speech corpora: LibriSpeech (Clean/Other), Switchboard (Swbd/Callhm), AMI meeting corpus, and a 346-hour internal web presentation corpus (Web). Compares an AR Conformer baseline (greedy and beam search with beam width 10, CTC weight 0.3) against standard Mask-CTC NAR decoding (masking threshold alpha = 0.999, N_iter in {0, 1, 10}) and the proposed NAR-MBR decoding with sample sizes |Z| in {64, 256}. Implementation uses ESPNet for model training and the 'mbrs' library, running hardware configurations with 8 CPU cores (Intel Xeon Gold 6346) and an NVIDIA RTX 6000 Ada GPU.

## Results

NAR-MBR decoding consistently and significantly outperformed standard NAR decoding across all tested corpora for sample sizes |Z| = 64 and 256 when N_iter >= 1 (p < 0.05). On LibriSpeech Other, NAR-MBR with |Z| = 256 and N_iter = 1 achieved a WER of 7.0%, compared to 7.7% for standard NAR (N_iter = 1) and 5.5% for AR beam search. Crucially, increasing the iteration count beyond N_iter = 1 yielded no further accuracy gains for NAR-MBR because EU maximization effectively replaces iterative CMLM refinement, whereas standard NAR required up to N_iter = 10 to converge. In terms of decoding speed on the Web corpus, NAR-MBR with N_iter = 1 ran 43.1x faster than AR beam search for |Z| = 64 and 20.7x faster for |Z| = 256 while matching AR accuracy. Ablation over sample size |Z| demonstrated that performance scales logarithmically and plateaus at |Z| >= 64, mirroring theoretical MBR convergence bounds. The primary trade-off observed was increased GPU memory consumption at N_iter = 1 due to CMLM decoder overhead.

| System / Decoding Condition | LibriSpeech Clean | LibriSpeech Other | Switchboard (Swbd) | Web Corpus | Speedup vs AR-Beam (Web) |
|---|---|---|---|---|---|
| AR Beam Search (Baseline) | 2.4 | 5.5 | 6.6 | 7.3 | 1.0x |
| NAR (Mask-CTC, N_iter = 10) | 3.3 | 7.5 | 7.6 | 8.5 | 26.7x |
| NAR-MBR (|Z|=64, N_iter = 1) | 3.1 | 7.1 | 7.3 | 7.4 | 43.1x |
| NAR-MBR (|Z|=256, N_iter = 1) | 3.1 | 7.0 | 7.3 | 7.3 | 20.7x |

## Limitations

The method experiences higher peak GPU memory usage when running CMLM refinement stages (N_iter = 1) due to the overhead of processing large batch sample sets. The evaluation is strictly restricted to sequence-level speech recognition (ASR) tasks, leaving out streaming setups or dense prediction tasks like diarization. Furthermore, language coverage is limited to standard English benchmarks, leaving multilingual or low-resource generalization untested.

## Why read this

Speech researchers and machine learning engineers working on fast, deployment-ready ASR will learn how to apply decision-theoretic MBR decoding to non-autoregressive models without retraining. It provides a blueprint for bypassing slow iterative refinement steps using parallelized Rust-based metric caching.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech recognition systems, edge or on-device transcription tools, and high-throughput offline batch processing of long-form audio lectures and meetings.

## Institutions / 機構

NTT

## Related

- [Accelerating End-to-End ASR via Semi-Autoregressive Speculative Decoding](wu26g_interspeech.md) — same problem · relatedness 2.7/3
- [MDM-ASR: Bridging Accuracy and Efficiency in ASR with Diffusion-Based Non-Autoregressive Decoding](yen26_interspeech.md) — same problem · relatedness 2.6/3
- [Self-Speculative Decoding for LLM-based ASR with CTC Encoder Drafts](saon26_interspeech.md) — same problem · relatedness 2.4/3
- [Diffusion Language Models for Speech Recognition](naveriani26_interspeech.md) — same problem · relatedness 2.0/3
- [Token-Independent Language Representations for Low-Latency Configurable Multilingual Speech Recognition](zhu26c_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
