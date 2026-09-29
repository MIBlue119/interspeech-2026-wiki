---
id: ghosh26c_interspeech
category: asr
institutions: ["IIIT Hyderabad", "University of Bath"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-560
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26c_interspeech.pdf
---

# V-Align: Visual Forced Alignment via Phoneme to Video Optimal Path Traversal

*Souvik Ghosh, C. V. Jawahar, Vinay Namboodiri*

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-560)

**Category:** `asr`

**TL;DR** — V-Align is a visual forced alignment framework that formulates timestamp localization in silent talking-face videos as an optimal monotonic path traversal over a frame-phoneme compatibility lattice. It achieves state-of-the-art word-level Mean Absolute Error (MAE) of 32.9 ms on LRS2 and 56.9 ms on LRS3.

## Key contributions

- Formulates Visual Forced Alignment (VFA) as an optimal monotonic path traversal problem over a frame-phoneme compatibility lattice rather than frame-wise token prediction.
- Proposes a two-stage training strategy combining boundary-free structure learning (Stage 1) via forward-sum and binarization losses with word-level MFA refinement (Stage 2).
- Uses frozen off-the-shelf encoders (VTP for lip motion and XPhoneBERT for phonemes) bridged via lightweight 1D convolutional modality adaptation projections.
- Outperforms prior fully supervised VFA baselines even without boundary supervision in Stage 1, proving the effectiveness of structured optimal-path objectives.

## Problem

Manual forced alignment is expensive and standard audio-based aligners like WhisperX or MFA fail when audio is noisy, corrupted, or completely missing. Prior visual forced alignment (VFA) approaches like DVFA and He et al. treat alignment as frame-wise token prediction and rely heavily on explicit audio-derived supervision, leading to poor boundary precision and limited generalization in unannotated or silent video settings. This matters because real-world media, archival footage, and privacy-preserving videos often lack reliable audio channels, necessitating robust visual-only temporal alignment.

## Method

V-Align takes a silent video sequence and a text transcription, extracting frame-level lip motion representations via Visual Transformer Pooling (VTP) and token-level contextual phoneme embeddings using XPhoneBERT. Both embeddings are projected into a shared alignment space via trainable 1D convolutional modality adaptation modules, gv and gp. A dense frame-phoneme compatibility lattice is constructed using a Gaussian distance kernel parameterized by a temperature τ = 0.0005, yielding a traversal posterior normalized across phoneme positions.

Training follows a two-stage paradigm. In Stage 1, the model is trained without explicit boundaries using a forward-sum objective (maximizing total probability mass over valid monotonic paths) combined with a path binarization loss to concentrate probability around the decoded optimal path. In Stage 2, phoneme posteriors are aggregated into word-level posteriors to perform word-level boundary refinement guided by Montreal Forced Aligner (MFA) targets.

During inference, discrete boundaries are recovered via dynamic programming (Viterbi-style optimal monotonic decoding), solving for the maximum likelihood monotonic traversal path M. All experiments are conducted using an Adam optimizer with a batch size of 32, an initial learning rate of 10^-4 annealed to 10^-6, trained for 400k steps in Stage 1 and 100k steps in Stage 2 on a single NVIDIA 2080 Ti GPU.

## Experimental setup

Evaluated on the LRS2 (BBC talk shows and news clips) and LRS3 (TED/TEDx talks) datasets. Compared against baselines including KWS-Net, Transpotter, CTC-based alignment, DVFA, and He et al. Metrics include Mean Absolute Error (MAE in milliseconds) for word boundaries and frame-level prediction accuracy (ACC). Notable details include frozen backbone encoders, equal loss weighting, and MFA ground-truth labels for supervision.

## Results

On LRS2, V-Align Stage 1 achieves 54.6 ms MAE and 86.13% ACC, outperforming most fully supervised baselines without using any boundary supervision. With Stage 2 word-level refinement, V-Align reaches a state-of-the-art MAE of 32.9 ms and 91.2% ACC on LRS2, and 56.9 ms MAE and 88.5% ACC on LRS3, reducing alignment error by 17.3 ms on LRS2 and 13.6 ms on LRS3 compared to the prior best method by He et al.

Ablation studies show that optimal traversal decoding outperforms frame-wise argmax (59.7 ms MAE) and greedy monotonic decoding (72.4 ms MAE). Furthermore, combining forward-sum and binarization losses is crucial; training with binarization loss alone leads to unstable lattice sharpening.

| System / Condition | LRS2 MAE (↓) | LRS2 ACC (↑) | LRS3 MAE (↓) | LRS3 ACC (↑) |
|---|---|---|---|---|
| KWS-Net | 171.5 ms | 53.0% | 262.9 ms | 42.6% |
| CTC-based | 80.4 ms | 71.7% | 124.5 ms | 60.1% |
| DVFA | 67.7 ms | 84.2% | 97.7 ms | 80.2% |
| He et al. | 50.2 ms | 89.5% | 70.5 ms | 87.0% |
| V-Align Stage 1 (Ours) | 54.6 ms | 86.13% | 82.9 ms | 79.6% |
| V-Align Stage 2 (Ours) | 32.9 ms | 91.2% | 56.9 ms | 88.5% |

## Limitations

The framework relies on pre-extracted text transcripts and freeze-encoded visual representations, making performance dependent on the quality of the VTP lip-motion encoder and XPhoneBERT tokenizer. Stage 2 supervision relies on MFA-generated alignments, which degrade under noisy acoustic conditions, though Stage 1 mitigates this dependency. Evaluation is currently constrained to English datasets (LRS2 and LRS3), leaving multilingual scalability unverified.

## Why read this

Speech and multimodal AI researchers working on silent video processing, AV-speech synchronization, or robust alignment under missing audio will find this a definitive treatment of structured optimal path traversal lattices. Readers will take away a reproducible recipe for boundary-free structural pretraining combined with word-level refinement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated subtitle synchronization for silent, archival, or privacy-masked videos, noisy-environment video captioning, and multimodal speech dataset curation.

## Institutions / 機構

IIIT Hyderabad, University of Bath

**Funding / 經費:** MeitY, Government of India

## Related

- (link related pages by id as the wiki grows)
