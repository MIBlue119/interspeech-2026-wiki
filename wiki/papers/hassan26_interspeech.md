---
id: hassan26_interspeech
category: applications-other
institutions: ["Ohio State University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2651
pdf: https://www.isca-archive.org/interspeech_2026/hassan26_interspeech.pdf
---

# SCANS: Supervised Contrastive Temporal Alignment of Neural Responses and Speech Stimuli

*K M Naimul Hassan, Donald S. Williamson*

[PDF](https://www.isca-archive.org/interspeech_2026/hassan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hassan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2651)

**Category:** `applications-other`

**TL;DR** — SCANS is a deep learning framework for EEG-speech temporal alignment that combines a dilated convolutional frontend with symmetric cross-modal attention transformers and a multi-task supervised contrastive loss, achieving a new state-of-the-art total score of 86.1 on the ICASSP 2023 challenge dataset.

## Key contributions

- Proposes a symmetric cross-modal attention mechanism allowing bidirectional, deep feature interaction between EEG and speech streams rather than late-stage fusion.
- Formulates neural-speech alignment as a supervised contrastive learning task using an identity matrix target to explicitly stabilize the shared latent space across subjects.
- Combines cross-entropy classification and supervised contrastive alignment losses in a multi-task objective with a balanced weight factor lambda = 0.5.
- Demonstrates robust generalization to completely unseen subjects, substantially reducing inter-subject performance variance compared to prior architectures.

## Problem

Aligning noisy, high-dimensional non-invasive electroencephalography (EEG) signals with continuous speech audio is critical for speech-reconstruction brain-computer interfaces and intelligent hearing aids. Prior methods like Accou et al., Borsdorf et al., and Thornton et al. rely on late fusion or independent encoders that fail to capture vital cross-modal dependencies during feature extraction. Furthermore, self-supervised contrastive approaches (such as Wang et al. using InfoNCE) suffer from limited data diversity and strict one-to-one mapping constraints, causing poor cross-subject generalization and high performance variance.

## Method

SCANS consists of two symmetric modality-specific encoders for 64-channel EEG and mono-channel speech envelopes. Each encoder begins with a Dilated Convolutional Frontend (DCF) featuring a spatial projection layer to 128 dimensions followed by three dilated convolutional layers with exponential rates (2^0, 2^1, 2^2), a kernel size of 3, ReLU activations, residual connections, and layer normalization.

Following the DCF, features enter Cross-Modal Attention (CMA) Transformer blocks containing learnable positional embeddings, 4 attention heads, and 512-dimensional feed-forward networks. In these blocks, EEG features act as queries for speech keys/values in one pathway, while roles are reversed in the symmetric pathway. Global average pooling compresses the sequences into L2-normalized 128-dimensional embeddings.

The training objective combines standard cross-entropy classification over N candidate segments with a symmetric supervised contrastive alignment loss scaled by a learnable temperature parameter tau. The alignment loss enforces an identity matrix target across batch elements by pulling synchronized EEG-speech pairs together and pushing mismatched pairs apart. The total loss is a weighted sum (lambda = 0.5) of the cross-entropy and alignment losses, optimized using AdamW with an initial learning rate of 0.001, learning rate reduction on plateau, and early stopping.

## Experimental setup

Evaluated on the SParrKULee dataset, which comprises 168 hours of 64-channel EEG recordings from 105 participants listening to Dutch stories across 120-157 training hours and 15.7-31 test hours. Baselines include models from Accou et al., Cui et al., Borsdorf et al., Thornton et al., Qiu et al., and Wang et al. Metrics include Accuracy (ACC), Mean Subject Accuracy (MSA), and Subject Standard Deviation (SSTD) across segment lengths (t = 3s, 5s) and candidate counts (N = 2, 5).

## Results

SCANS achieves a Total Score of 86.1 on the ICASSP 2023 benchmark (t=3s, N=2), outperforming the prior leader Thornton et al. (82.13) while slashing Subject Standard Deviation down to 3.75% (Within-Subject) and 3.12% (Held-out). On the more challenging ICASSP 2024 5-choice held-out subject benchmark (t=5s, N=5), SCANS reaches 69.33% HMSA—surpassing the previous leading model by 6.53%—while maintaining a remarkably low standard deviation of 4.60%.

| Model | WMSA | WSSTD | HMSA | HSSTD | Total Score |
|---|---|---|---|---|---|
| Accou et al. [11] | 77.59 | 7.29 | 77.34 | 5.66 | 77.51 |
| Cui et al. [14] | 79.21 | 7.52 | 78.40 | 5.66 | 78.94 |
| Borsdorf et al. [13] | 79.61 | 7.08 | 77.93 | 7.66 | 79.05 |
| Thornton et al. [12] | 82.71 | 7.70 | 80.98 | 5.27 | 82.13 |
| SCANS (Ours) | 87.09 | 3.75 | 84.12 | 3.12 | 86.10 |

## Limitations

The evaluation is restricted to Dutch-language stories from a single dataset (SParrKULee), leaving multilingual generalization untested. The model's computational complexity scales with the number of attention heads and candidate distractors, and performance depends heavily on clean EEG pre-processing pipelines like multichannel Wiener filtering.

## Why read this

Researchers working on non-invasive neural speech decoding and brain-computer interfaces should read this paper to learn how combining symmetric cross-modal attention with supervised contrastive alignment bridges the EEG-speech modality gap and suppresses inter-subject variance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Objective auditory diagnostic tools, intelligent hearing aids, and speech-reconstruction brain-computer interfaces.

## Institutions / 機構

Ohio State University

**Funding / 經費:** National Science Foundation

## Related

- (link related pages by id as the wiki grows)
