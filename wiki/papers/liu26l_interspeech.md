---
id: liu26l_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1531
pdf: https://www.isca-archive.org/interspeech_2026/liu26l_interspeech.pdf
---

# Decoupling Search and Evaluation: Efficient Beam Decoding for Language Model-Based Text-to-Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/liu26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1531)

**TL;DR** — SaVE-Beam decouples hypothesis expansion from sequence scoring using a lightweight student model and a teacher LM, achieving up to a 5.1× speedup over conventional beam search and reducing word error rate by up to 50% compared to standard sampling for language model-based text-to-speech.

## Problem

Language model-based text-to-speech systems rely heavily on stochastic sampling to avoid catastrophic failures, but sampling lacks determinism and permits tail-sample errors. While maximization-based decoding like traditional beam search offers a principled alternative, it causes temporal collapse due to speech redundancy and incurs prohibitive inference latency because the full model performs expansion at every step.

## Method

The paper introduces Search-and-eValuatE beam decoding (SaVE-Beam), which divides beam search into a student-driven search phase and a teacher-driven evaluation phase using chunk-wise beam expansion of length L=5. A lightweight student model (0.5B variant with 1-2 hidden layers, trained via temperature-scaled knowledge distillation at τ=2 under self-referential multi-step rollout) constructs local beam trees with dynamic pruning (top-N=100). The original teacher LM evaluates and verifies candidate sequences using tree-structured decoding, top-K filtering (K=5), and a deterministic acceptance threshold (α=0.5). Hard repetition constraints with window sizes of w=10 for search and w=15 for evaluation are applied to eliminate degenerate silence or noise loops.

## Results

Experiments on the SeedTTS-Eval benchmark using CosyVoice 2 as the foundation model demonstrate that SaVE-Beam accelerates conventional beam search by 3.9× to 5.1×, achieving a real-time factor comparable to the baseline (~1.18 to 1.19). Compared to sampling baselines, it reduces WER and CER by up to 50% and 33% respectively. Ablation studies confirm that replacing soft repetition penalties with hard repetition constraints is vital for preventing temporal collapse under student-led search.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building real-time, low-latency language model-based text-to-speech systems who require deterministic, high-fidelity synthesis without the latency overhead of conventional beam search.

## Limitations

On exceptionally difficult datasets that trigger LM hallucination, beam search can still amplify errors, though the student model's controlled stochasticity helps mitigate this compared to standard beam search.

## Related

- (link related pages by id as the wiki grows)
