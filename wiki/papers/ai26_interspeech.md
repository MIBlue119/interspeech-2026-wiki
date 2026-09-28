---
id: ai26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-228
pdf: https://www.isca-archive.org/interspeech_2026/ai26_interspeech.pdf
---

# Stabilizing Short Duration Speaker Verification through Neural Re-scoring with Hybrid Enrollment

[PDF](https://www.isca-archive.org/interspeech_2026/ai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-228)

**TL;DR** — This paper introduces a hybrid-enrollment neural re-scoring framework that combines text-dependent and text-independent speech to stabilize short-duration speaker verification, achieving consistent Equal Error Rate reductions across multiple backbone models.

## Problem

In user-defined keyword spotting, speaker verification must handle extremely brief test utterances under three seconds, causing unstable representations and high sensitivity to noise and phonetic variations. Text-dependent enrollment ensures content consistency but suffers from limited duration, whereas text-independent enrollment provides richer speaker evidence but introduces a lexical content mismatch with phrase-bounded test queries.

## Method

The framework utilizes a frozen speaker backbone (such as ECAPA-TDNN, CAM++, or ERes2Net-L) for feature extraction and trains a lightweight neural verifier for similarity modeling. It adopts a hybrid enrollment strategy combining text-independent enrollment for stable identity traits and text-dependent enrollment for phrase-consistent characteristics. A parallel cross-attention module models bidirectional frame-level interactions between enrollment and query features, which are temporally pooled, concatenated with global utterance-level cosine similarities, and fused through a lightweight multi-layer perceptron. The verifier is optimized using binary cross-entropy on a newly constructed large-scale corpus, VoxPhrase, derived automatically from VoxCeleb.

## Results

Experiments conducted on the VoxPhrase dataset and out-of-distribution Deepmine dataset evaluate performance using Equal Error Rate percentage. The hybrid enrollment combined with neural re-scoring consistently outperforms pure text-dependent and text-independent baselines across ECAPA-TDNN, CAM++, and ERes2Net-L architectures. For instance, on the Eval-1 random setting with CAM++, the hybrid method reduces EER significantly compared to text-dependent-only setups. Ablations demonstrate that as text-independent enrollment duration increases past three seconds, it outperforms short text-dependent enrollment, while the hybrid approach achieves the best overall performance (reaching 1.6% EER at 10 seconds).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building conversational terminals, smart devices, and secure user-defined keyword spotting systems requiring accurate speaker verification on short phrase segments.

## Limitations

Text-independent enrollment performs poorly when its duration drops below two seconds, where text-dependent enrollment retains a lexical alignment advantage.

## Related

- (link related pages by id as the wiki grows)
