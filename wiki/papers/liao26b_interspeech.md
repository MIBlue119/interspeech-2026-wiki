---
id: liao26b_interspeech
category: prosodic-boundary
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-209
pdf: https://www.isca-archive.org/interspeech_2026/liao26b_interspeech.pdf
---

# High-Precision Prosodic Boundary Anchors from Acoustic Cues under Weak Supervision

[PDF](https://www.isca-archive.org/interspeech_2026/liao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-209)

**TL;DR** — This paper presents a weakly supervised framework that uses acoustic evidence and positive-unlabeled learning to infer continuous prosodic boundary strength scores without relying on manual annotations.

## Problem

Traditional prosodic boundary detection relies heavily on labor-intensive manual labeling frameworks like ToBI, which require expert knowledge and are absent in many large speech corpora. Developing automated alternatives is difficult because reliable negative boundaries are ambiguous and context-dependent, making standard supervised training impractical.

## Method

The authors propose a hierarchical anchor construction pipeline and positive-unlabeled (PU) learning model. First, conservative positive boundaries (B1) are extracted from a Japanese corpus of 164,323 word junctures using a 200 ms pause duration threshold. Second, these anchors are refined using quantile-based thresholds on pitch reset ($|\Delta F_0| \ge Q_{0.85}$) and energy change ($\Delta \text{RMS} \le Q_{0.15}$) under a voicing gate, producing loose ($B2_{base}$) and strict ($B2_{strict}$) positive sets. Finally, a lightweight 1-layer MLP (32 hidden units) is trained via non-negative PU learning with logistic loss using $B2_{base}$ as positives and remaining candidates as unlabeled.

## Results

Evaluated on a large-scale Japanese speech corpus derived from JVS (132,031 pitch-valid candidates), the model produces graded boundary strength scores that align with expected acoustic and linguistic patterns. Score distributions exhibit clear monotonic separation across hierarchical strata from unlabeled candidates to $B2_{strict}$. Punctuation proxy analysis shows high boundary enrichment rates (97.2% to 98.9% for anchor sets versus 12.4% for unlabeled), confirming that acoustic features alone successfully recover meaningful prosodic boundaries.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and language engineers building text-to-speech, automatic speech recognition, punctuation restoration, or spoken language understanding systems for languages lacking manual prosodic annotations.

## Limitations

The approach is evaluated on a single read-speech Japanese corpus, and performance depends on robust acoustic feature extraction like pitch tracking and pause segmentation.

## Related

- (link related pages by id as the wiki grows)
