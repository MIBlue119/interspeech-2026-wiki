---
id: oh26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-410
pdf: https://www.isca-archive.org/interspeech_2026/oh26_interspeech.pdf
---

# L-Proto: Language-Aware Episodic Prototypical Training for Multilingual Speaker Verification

*Hyung-Seok Oh, Deok-Hyeon Cho, Seung-Bin Kim, Seong-Whan Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/oh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-410)

**TL;DR** — L-Proto is a language-aware episodic prototypical training strategy for multilingual speaker verification that enforces single-language episodes to eliminate speaker-language entanglement. It achieves substantial EER reductions over conventional fine-tuning across multiple backbone architectures on the TidyVoice benchmark.

## Key contributions

- Identifies that language mixing within episodes biases prototype estimation and destabilizes similarity-based supervision in multilingual speaker verification.
- Proposes L-Proto, a language-aware episodic training framework that constructs language-consistent episodes on-the-fly via streaming buffers.
- Demonstrates consistent EER and minDCF improvements across diverse backbones (ResNet variants, ECAPA-TDNN, and CAM++) on the TidyVoice Challenge benchmark.
- Provides t-SNE visualizations and centroid similarity analyses proving that L-Proto mitigates speaker-language sub-clustering and widens the inter/intra-speaker separation margin.

## Problem

Standard multilingual speaker verification models frequently entangle speaker identity with language-dependent phonetic and prosodic characteristics, causing utterances from the same speaker to form language-specific sub-clusters. Prior strategies such as language-adversarial learning, domain generalization, and global representation-level objectives fail to control linguistic variability at the task level during metric-learning. Furthermore, standard episodic training relies on random speaker and language sampling which mixes languages within an episode, distorting prototype estimation and degrading similarity comparisons when enrollment and test utterances differ in language.

## Method

L-Proto comprises language-aware episode construction, streaming episode sampling, and episodic prototypical optimization. The training set D = { (xi, yi, li) } contains speech samples xi, speaker labels yi, and language labels li. A speaker encoder f_theta maps samples to embeddings z. Instead of global classification, the framework builds episodes E_l where all P speakers and K utterances per speaker share a single language l, eliminating intra-episode linguistic variability.

A streaming sampling mechanism uses buffers B[l][s] to accumulate utterances for each speaker per language. Once a speaker accumulates at least K utterances, they become a 'ready speaker' (R[l]). When at least P ready speakers are available for a language l', an episode of P speakers with K samples each is generated on-the-fly without offline grouping.

Within each language-consistent episode E_l, prototypes are computed as the mean of support embeddings Ss for each speaker s. For a query embedding q, cosine similarity to each prototype is calculated using a temperature parameter tau (set to 0.07). The episodic loss is formulated as a cross-entropy objective over these cosine similarities. The overall training objective combines standard global speaker classification loss L_cls and the episodic supervision loss scaled by a hyperparameter lambda.

## Experimental setup

Evaluated on the TidyVoice Challenge development set derived from TidyVoiceX (~4,474 speakers, ~40 languages, ~321k utterances from Mozilla Common Voice). Models are initialized from VoxBlink2 pretrained checkpoints and fine-tuned for 6 epochs using the wespeaker toolkit on two NVIDIA RTX A6000 GPUs, with learning rates decaying from 5x10^-5 to 1x10^-5. Evaluated backbones include SimAM-ResNet34, SimAM-ResNet100, ResNet152, ResNet221, ResNet293, ECAPA512, ECAPA1024, and CAM++, using EER and minDCF metrics.

## Results

On the SimAM-ResNet34 baseline evaluated on the TidyVoice development set, L-Proto reduces overall EER from 2.88% (pretrained) / 2.91% (fine-tuning) down to 1.38%, and minDCF from 0.85/0.81 down to 0.63. On SimAM-ResNet100, L-Proto achieves an EER of 1.18% and minDCF of 0.61 (compared to 3.48% and 0.81 for pretrained). Ablations demonstrate that combining episodic sampling and prototype supervision is critical (yielding 1.18% EER versus 3.48% for vanilla fine-tuning), and restricting episodes to a single language outperforms multi-language compositions (1.18% vs 1.69% EER for 4 languages).

| System | EER (%) | minDCF |
|---|---|---|
| SimAM-ResNet34 (Pretrained) | 2.88 | 0.85 |
| SimAM-ResNet34 w/ Fine-tuning | 2.91 | 0.81 |
| SimAM-ResNet34 w/ L-Proto | 1.38 | 0.63 |
| SimAM-ResNet100 (Pretrained) | 3.48 | 0.81 |
| SimAM-ResNet100 w/ Fine-tuning | 2.63 | 0.77 |
| SimAM-ResNet100 w/ L-Proto | 1.18 | 0.61 |

## Limitations

The method explicitly requires language labels during training and sufficient speaker diversity within each language to populate streaming buffers. The streaming episode sampling strategy introduces computational and data-loading overhead compared to standard batch-based fine-tuning. Performance gains vary across languages depending on data scale and acoustic conditions, and official hidden test labels were unavailable for evaluation.

## Why read this

Speech researchers and engineers tackling multilingual speaker verification and cross-lingual robustness should read this paper to understand how controlling task-level linguistic composition via episodic prototypical training eliminates language entanglement in speaker embeddings.

## Code

- https://github.com/hs-oh-prml/L-Proto/

## Applications

Cross-lingual speaker verification, multilingual biometric authentication systems, and zero-shot speaker recognition across diverse language environments.

## Related

- (link related pages by id as the wiki grows)
