---
id: makishima26_interspeech
category: asr
institutions: ["NTT"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1582
pdf: https://www.isca-archive.org/interspeech_2026/makishima26_interspeech.pdf
---

# Multi-Talker ASR Unaffected by Speaker Change Count

*Naoki Makishima, Suzuka Yamada, Taiga Yamane, Mana Ihori, Tanaka Tomohiro, Satoshi Suzuki, Shota Orihashi, Ryo Masumura*

[PDF](https://www.isca-archive.org/interspeech_2026/makishima26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/makishima26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1582)

**Category:** `asr`

**TL;DR** — The paper introduces a speaker-change token masking technique for autoregressive multi-talker ASR and diarization models that prevents performance degradation when handling more speaker changes than seen during training. It matches oracle performance on 3-speaker-change test data while trained on data with at most 2 speaker changes.

## Key contributions

- Identifies and experimentally demonstrates a core failure mode of conventional multi-talker ASR: performance catastrophically degrades when evaluation speech contains more speaker changes than the training distribution.
- Proposes a novel decoder self-attention mask that zero-weights speaker change tokens, timestamp tokens, and speaker tokens when referenced by queries, breaking the model's dependency on structural change counts.
- Introduces a random textual token masking strategy (with probability $r$) during training to prevent the model from implicitly inferring speaker turn counts from textual context.
- Validates the masking approach across two distinct architectures: multi-talker ASR with explicit speaker change tokens and SOMSRED-SVC (joint diarization and ASR).

## Problem

Recent multi-talker ASR systems handle overlapping and conversational speech by recursively estimating a single concatenated token sequence interspersed with speaker change markers, timestamps, or speaker IDs. However, these models heavily overfit to the maximum number of speaker changes present in their training data (e.g., up to 3 turns). When evaluated on audio with more turns, conventional decoders exhibit severe degradation—often skipping utterances entirely—forcing engineers to rely on brittle audio segmentation that breaks semantic context.

## Method

The method modifies the Transformer decoder self-attention mechanism by extending standard look-ahead masking to systematically block attention to specific structural tokens and random text subsets. Let $Q = \{ \text{[st]} \} \cup T \cup D$ represent the set of always-masked tokens comprising speaker change tokens $\text{[st]}$, quantized timestamp sets $T$, and speaker token sets $D$. The attention mask $g_{ij}$ is defined across queries such that elements in $Q$ and randomly selected text tokens (chosen with probability $r$ uniformly at random) are assigned $-\infty$ when referenced by other queries during training. 

During inference, only the structural tokens in $Q$ are masked, while textual tokens remain fully unmasked. The generation probability of the target label sequence $\tilde{\mathbf{s}}$ is formulated by computing attention exclusively over a reduced token sequence $\tilde{\mathbf{c}}_{1:i-1}$ which excludes elements of $Q$. This forces the autoregressive decoder to predict subsequent tokens and turn shifts purely based on local acoustic encoder representations rather than counting prior structural markers or global contextual cues.

For implementation, the multi-talker ASR model uses a 10-layer Transformer encoder (512 hidden dim, 4 attention heads, 1024 FFN dim) and a 2-layer Transformer decoder. The SOMSRED-SVC model uses a 14-layer encoder and 4-layer decoder. Models are optimized using RAdam with a learning rate of $10^{-4}$, mini-batches of 32, label smoothing of 0.1, and early stopping on validation loss.

## Experimental setup

Evaluated on the Corpus of Spontaneous Japanese (CSJ), split into 522 hours (1,388 speakers) for training, 1.3 hours (10 speakers) for validation, and 1.9 hours (10 speakers) for testing. Pseudo multi-talker mixtures were synthesized with 2-3 utterance overlaps (up to 2 speaker changes for training) and non-overlapping sequences with 2-6 utterances. Baselines include standard unmasked multi-talker ASR and SOMSRED-SVC with conventional look-ahead masks, compared against an oracle model trained directly on 3-speaker-change data. Metrics include Character Error Rate (CER), Speaker Change Count Accuracy (SCCA), Timestamp Error Rate (TER), and Equal Error Rate (EER).

## Results

On multi-talker ASR with speaker change tokens tested on speech with 3 speaker changes (unseen in training), the baseline model suffers a severe drop in SCCA down to 59.5% and a CER spike to 13.5%. In contrast, the proposed method with optimal text-masking probability ($r=0.6$) achieves an SCCA of 96.3% and a CER of 5.9%, matching the oracle model (99.2% SCCA, 6.1% CER) while retaining identical performance on 0-2 speaker changes (e.g., 5.2% vs 5.8% CER on 0 SC). When pushed to extreme evaluation conditions with 4 and 5 speaker changes, the baseline predominantly under-counts turns (skipping utterances, yielding 22.1%–28.4% CER), whereas the proposed method accurately recovers the count in 78.4%–88.1% of samples, holding CER to 6.9%–7.5%. 

In joint ASR-diarization (SOMSRED-SVC) with 3 speaker changes, setting $r=0.4$ improves SCCA from 60.1% (baseline) to 88.0% and drops CER from 12.2% to 6.9%, with negligible impact on TER (11.6%) and EER (12.7%). The method does not win when the masking ratio $r$ is set too high (e.g., $r=0.8$), which over-regularizes and destabilizes training convergence.

| System / Condition (3 SC) | CER (%) | SCCA (%) | TER (%) | EER (%) |
|---|---|---|---|---|
| Baseline | 12.2 | 60.1 | 14.8 | 12.6 |
| Ours ($r=0.4$) | 6.9 | 88.0 | 11.6 | 12.7 |
| Oracle | 6.1 | 99.6 | 7.6 | 8.0 |

## Limitations

The evaluation is restricted to Japanese data synthesized via corpus mixing (CSJ), lacking validation on real-world multi-channel meeting corpora (e.g., AMI, CHiME) with natural overlap dynamics. The optimal text masking probability $r$ is sensitive and requires tuning per architecture. Furthermore, the approach does not fully close the gap with the oracle when structural mask sets grow larger in joint diarization settings.

## Why read this

Researchers and engineers building long-form conversational ASR or joint diarization systems should read this to learn how to decouple sequence length and turn-count scaling from autoregressive decoder training, avoiding performance collapse on highly conversational audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Meeting transcription systems, multi-speaker conversational speech recognition, and real-time audio stream diarization.

## Institutions / 機構

NTT

## Related

- (link related pages by id as the wiki grows)
