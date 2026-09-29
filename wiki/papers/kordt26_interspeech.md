---
id: kordt26_interspeech
category: asr
labels: [self-supervised]
institutions: ["University of Hamburg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2080
pdf: https://www.isca-archive.org/interspeech_2026/kordt26_interspeech.pdf
---

# Learning to Hear Hesitation: Continual Learning for Disfluency-Aware ASR

*Henri-Leon Kordt, Theresa Pekarek Rosin, Jae Hee Lee, Stefan Wermter*

[PDF](https://www.isca-archive.org/interspeech_2026/kordt26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kordt26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2080)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates continual learning (CL) strategies for adapting pretrained automatic speech recognition models to transcribe disfluent speech verbatim using explicit markers, revealing a trade-off between general ASR performance and marker accuracy. Weight Averaging achieves the lowest word error rates, while Experience Replay yields the best marker retention across sequential tasks.

## Key contributions

- Formulates disfluent ASR adaptation as a continual learning problem across multiple datasets with varying disfluency distributions.
- Compares four standard CL strategies (EWC, ER, A-GEM, Weight Averaging) on their ability to balance preprocessed WER and disfluency-marker F1 scores.
- Identifies a shared decoder cross-attention head specialization mechanism responsible for disfluency token emission via head-masking attribution.
- Demonstrates that Experience Replay excels at disfluency marker retention and generalization, whereas Weight Averaging preserves backbone ASR performance.

## Problem

State-of-the-art ASR models are optimized to omit speech disfluencies, filler words, and repairs to generate clean transcripts, leading to severe information loss, fabrications, and hallucinations. While integrating explicit disfluency tokens or markers can capture clinically relevant information, naive fine-tuning on small disfluent datasets causes catastrophic forgetting of domain-agnostic general speech knowledge. Furthermore, joint retraining is computationally prohibitive and frequently infeasible due to strict privacy regulations governing clinical and specialized speech data.

## Method

The paper uses whisper-small.en as the pretrained monolingual backbone model and introduces four unified disfluency token categories mapped from CHAT-formatted transcripts: FILLER (e.g., 'uh', 'um'), REP (word and phoneme repetitions/revisions), DISRUPT (coughs, laughs), and PAUSE. Training is conducted in two stages: disfluency token introduction on the Standard Malaysian English (SME) corpus, followed by sequential continual adaptation on the Pitt and Delaware corpora. Four CL methods are evaluated: Elastic Weight Consolidation (EWC) using the diagonal Fisher information matrix to penalize critical parameter updates; Experience Replay (ER) using a 10% rehearsal buffer prioritizing rare disfluency tokens with 25% old data per batch; A-GEM computing gradient dot-products between buffer and current data; and Weight Averaging (WA) which averages the weights of the old and newly trained models.

To probe internal mechanisms, the authors apply a head-masking approach with learnable scalar gates per attention head to compute token-level head importance and top-10 lift scores. Zero-masking ablations are performed on the top-5 cross-attention heads associated with markers to verify causal roles. All experiments use an 80/20 speaker-disjoint dataset split, a learning rate of 2e-5, a batch size of 16, and train for 10 epochs across three random seeds.

## Experimental setup

Evaluated on three TalkBank datasets: Standard Malaysian English (SME) Corpus (11.79 hours), Pitt Corpus (12.11 hours used out of 21.30 hours), and Delaware Corpus (9.72 hours), alongside LibriSpeech (LS) for clean speech evaluation. Baselines include the frozen backbone, standard fine-tuning (FT), and joint training (JOINT). Performance is measured via preprocessed Word Error Rate (pWER) removing punctuation and markers, micro/macro marker-F1 scores, and standard CL metrics (A-WER, AI-WER, BWT, FM, FWT, IM).

## Results

In the token introduction stage on SME, Weight Averaging achieves the lowest SME pWER of 9.64% and LibriSpeech pWER of 3.41%, but fails to emit markers (0.00 F1). Conversely, standard fine-tuning, A-GEM, and ER achieve marker micro-F1 scores between 0.73 and 0.75 but suffer higher SME pWER (~12.21%). Explainability analysis reveals a consistent set of top-5 decoder cross-attention heads tied to marker emission; zero-masking these heads removes ~57% of FILLER tokens while altering pWER by only +0.42%.

In sequential continual adaptation across SME, Pitt, and Delaware, ER achieves the best overall marker macro-F1 of 0.49 and superior PAUSE marker F1 (0.23), exhibiting minimal forgetting (FM of 0.02). Weight Averaging achieves the lowest average pWER (18.90%) and best clean LibriSpeech retention (4.68% pWER), though it displays higher intransigence on new tasks.

| System | A-WER% ↓ | A-F1 ↑ | LS pWER% (Post-Seq) ↓ | FILLER F1 ↑ | REP F1 ↑ |
|---|---|---|---|---|---|
| JOINT | 17.95 | 0.47 | — | 0.71 | 0.54 |
| FT | 20.24 | 0.39 | 8.37 | 0.69 | 0.42 |
| A-GEM | 20.15 | 0.36 | 8.36 | 0.68 | 0.35 |
| ER | 19.71 | 0.49 | 7.14 | 0.75 | 0.61 |
| EWC | 19.01 | 0.44 | 6.45 | 0.72 | 0.49 |
| WA | 18.90 | 0.46 | 4.68 | 0.73 | 0.63 |

## Limitations

The study is restricted to a single backbone model size (whisper-small.en) and a fixed task ordering across datasets. The evaluation relies exclusively on English corpora from the TalkBank repository, leaving multilingual and low-resource language generalization unverified. Furthermore, rare disfluency markers like PAUSE and DISRUPT remain challenging to predict accurately across all CL strategies, indicating limitations in handling highly imbalanced token distributions.

## Why read this

Speech and ML researchers focusing on verbatim ASR, clinical speech analysis, and continual learning should read this paper for its rigorous decoupling of ASR accuracy from disfluency marker integration and its mechanistic insights into cross-attention head specialization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical speech analysis for dementia and cognitive impairment screening, verbatim transcription pipelines for legal and meeting domains, and robust speech recognition domain adaptation without catastrophic forgetting.

## Institutions / 機構

University of Hamburg

**Funding / 經費:** Horizon Europe, German Research Foundation, National Institutes of Health

## Related

- (link related pages by id as the wiki grows)
