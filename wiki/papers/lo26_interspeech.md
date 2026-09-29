---
id: lo26_interspeech
category: applications-other
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1494
pdf: https://www.isca-archive.org/interspeech_2026/lo26_interspeech.pdf
---

# A Novel Sentence Stress Detection Framework Leveraging Auxiliary Word-Stress Modeling and Loss Optimization

*Tien-Hong Lo, Fong-Chun Tsai, Ting-An Hung, Yu-Hsuan Hsieh, Yao-Ting Sung, Berlin Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/lo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1494)

**Category:** `applications-other` · **Labels:** `self-supervised`

**TL;DR** — We propose STRAW, an automatic pronunciation assessment framework built on a frozen Whisper backbone that unifies sentence stress detection (SSD) and word stress detection (WSD) via a novel word-span stress regularizer (WSR), achieving an F1 score of 0.934 on the TinyStress-15K benchmark.

## Key contributions

- A unified framework for prosodic stress detection featuring task-specific heads for token-level Sentence Stress Detection (SSD) and phone-level Word Stress Detection (WSD).
- A word-span stress regularizer (WSR) that enforces a single dominant stress position within subword-tokenized stressed word spans, mitigating underconstrained probability allocations.
- Empirical demonstration that adding auxiliary WSD and WSR improves SSD F1 from 0.909 (WhiStress baseline) to 0.934 on the TinyStress-15K corpus.
- Comprehensive part-of-speech error analysis showing reduced false negative rates on functional categories like particles and determiners.

## Problem

Prior automatic pronunciation assessment (APA) systems treat sentence stress detection (SSD) and word stress detection (WSD) as completely independent tasks, failing to exploit their shared reliance on acoustic-prosodic cues such as pitch, duration, and intensity. Furthermore, alignment-based methods heavily rely on fragile forced alignments, while alignment-free token-level models suffer from spatial ambiguity where subword tokenization spreads prominence probabilities across multiple tokens within a single word span. Addressing these gaps is crucial for robust computer-assisted language learning (CALL) feedback.

## Method

The framework utilizes a frozen whisper-small backbone, extracting contextualized representations from the 9th layer of both encoder and decoder blocks. The input speech log-mel spectrogram is processed by the encoder to yield acoustic states $e_{1:T}$, while the reference transcript provides tokens $t_{1:M}$ and a G2P-derived phone sequence $p_{1:N}$ with CMU-style stress markers. 

The SSD module uses Whisper decoder states as queries and encoder states as keys/values in a Transformer decoder block, followed by a fully connected neural network (FCNN) to predict binary token-level stress posteriors $ŷ_m^{ssd}$ optimized via cross-entropy ($L_{SSD}$). Simultaneously, the WSD module computes phone-aware acoustic representations via cross-attention (phone embeddings as queries, encoder states as keys/values) passed through an FCNN to predict binary phone-level stress posteriors $ŷ_n^{wsd}$ optimized via cross-entropy ($L_{WSD}$). 

To resolve multi-token ambiguity within a stressed word span $w_m$ spanning tokens $[b_m, e_m]$, a word-span stress regularizer ($L_{WSR}$) is introduced. It penalizes deviations of the cumulative token stress probability from 1 and sharpens the distribution by pushing the maximum token probability $ŷ_i^{ssd⋆}$ toward 1 while suppressing other tokens in that span. The multi-task objective combines all three losses weighted by hyperparameters $\alpha$, $\beta$, and $\lambda$ set to 1.0.

## Experimental setup

Experiments use the TinyStress-15K synthetic benchmark corpus comprising 13,500 training, 1,500 validation, and 1,000 test utterances. Baselines include GT alignment, Montreal Forced Aligner (MFA) with BLSTM, and the alignment-free WhiStress model. Evaluation metrics are precision, recall, and F1-score with respect to the stressed class, evaluated at the word level for SSD and phone level for WSD. Models are trained on an NVIDIA 3090 GPU using AdamW (batch size 16, initial learning rate 1e-4, 20 epochs), choosing the checkpoint with the highest validation SSD F1.

## Results

On the TinyStress-15K test set, the proposed STRAW framework achieves an SSD F1 of 0.934 (0.945 precision, 0.924 recall), outperforming the GT alignment baseline (0.858 F1), MFA (0.815 F1), and the alignment-free WhiStress baseline (0.909 F1). Ablation experiments demonstrate that removing WSD drops F1 to 0.922, removing WSR drops F1 to 0.929, and removing both drops F1 to 0.915. For WSD, STRAW achieves an F1 of 0.920, which is largely unaffected by the removal of WSR (0.921 F1). Error analysis across part-of-speech categories reveals that STRAW reduces false negative rates on functional categories like particles (PART) and determiners (DET), though high false negative rates persist on rare categories such as subordinating conjunctions (SCONJ) due to data scarcity.

| Model | Precision | Recall | F1 |
|---|---|---|---|
| GT alignment [14] | 0.862 | 0.853 | 0.858 |
| MFA [14] | 0.776 | 0.859 | 0.815 |
| WhiStress [14] | 0.912 | 0.906 | 0.909 |
| STRAW (Complete) | **0.945** | **0.924** | **0.934** |
| - WSD | 0.938 | 0.906 | 0.922 |
| - WSR | 0.942 | 0.917 | 0.929 |

## Limitations

The framework simplifies lexical stress by modeling only a single primary position per word without capturing full syllabic structures or secondary stress. The frozen backbone and separate task-specific heads prevent direct hidden-state interaction or knowledge transfer between the SSD and WSD branches. Evaluation is restricted to synthetic speech due to a lack of large-scale fine-grained human stress annotations.

## Why read this

Speech and ML researchers building automatic pronunciation assessment or prosody models will learn how to design alignment-free auxiliary regularizers that fix subword tokenization ambiguities in transformer-based architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted language learning (CALL) systems, automated pronunciation scoring, and prosody feedback tools for second-language learners.

## Institutions / 機構

National Taiwan Normal University

## Related

- (link related pages by id as the wiki grows)
