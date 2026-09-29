---
id: sung26_interspeech
category: enhancement-separation
labels: [self-supervised, robustness-noise]
institutions: ["National Taiwan University", "Academia Sinica", "Johns Hopkins University", "National Yang Ming Chiao Tung University"]
code: https://github.com/JohnSung0501/fMRI-Decoding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1947
pdf: https://www.isca-archive.org/interspeech_2026/sung26_interspeech.pdf
---

# fMRI Decoding of Speech Conditions Across Brain Regions of Interest for Neural Evaluation of Speech Enhancement

*Ching-Chih Sung, Francis Pingfan Chien, Li-wei Chen, Berrak Sisman, Borching Su, Yu-Te Wang, Yu Tsao*

[PDF](https://www.isca-archive.org/interspeech_2026/sung26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sung26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1947)

**Category:** `enhancement-separation` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces NeuroPAS-Net, a three-phase fMRI decoding framework that uses self-supervised learning, incremental learning, and fine-tuning to distinguish clean from noisy speech. It also proposes NeuroPAS, a continuous neural metric derived from the decoder to evaluate and rank speech enhancement algorithms against subjective intelligibility.

## Key contributions

- Proposes NeuroPAS-Net, a multi-phase transfer learning framework (SSL, incremental learning with replay, and fine-tuning) that outperforms conventional SVM and CNN baselines in decoding speech conditions from fMRI.
- Identifies the Right Precentral Gyrus (R PreCG) as the highest-performing region of interest (ROI) for classifying clean versus noisy speech conditions, achieving 79.3% decoding accuracy.
- Introduces NeuroPAS, a continuous, decoder-derived fMRI metric that maps multivoxel BOLD responses to a clean-like neural score to evaluate and compare speech enhancement systems.
- Demonstrates that a deep learning speech enhancement method (DNN-SE) elicits neural activation patterns closer to clean speech than a classical enhancement method (Classic-SE), correlating with behavioral intelligibility ratings.

## Problem

Decoding clean versus noisy speech from high-dimensional fMRI multivoxel patterns is notoriously difficult due to extreme cross-subject functional variability and low signal-to-noise ratios. Standard linear multivoxel pattern analysis (MVPA) and basic CNN architectures struggle to deliver consistent classification gains across canonical speech-related regions of interest. Furthermore, standard neuroimaging analyses lack a practical, continuous neural metric that directly bridges brain responses to speech enhancement (SE) performance and subjective intelligibility ratings, leaving a gap in objective neural evaluation pipelines for audio processing systems.

## Method

NeuroPAS-Net processes high-dimensional fMRI voxel activation inputs ($X \in \mathbb{R}^P$, up to 11,669 voxels per ROI) via a three-phase transfer-learning framework built on a CNN encoder. Phase 1 applies self-supervised learning (SSL) via a masking-based reconstruction objective trained with mean squared error loss to capture generalizable representations from unlabeled data. Phase 2 introduces an incremental learning (IL) strategy with experience replay, utilizing cross-entropy loss and the Adam optimizer (learning rate $1 \times 10^{-3}$) to perform binary speech-condition classification across sequential tasks while mitigating catastrophic forgetting. Phase 3 executes supervised fine-tuning (SFT) across all network layers using labeled target-domain data for personalized adaptation.

Building on this encoder, the authors derive the Neuro-Perceptual Assessment Score (NeuroPAS) from the sigmoid outputs of the Clean-vs-Noisy classifier trained specifically on R PreCG multivoxel responses. Enhanced speech conditions (DNN-SE and Classic-SE) are passed exclusively during inference to map how closely their elicited brain states resemble clean neural representations. Scores are min-max normalized per subject where clean equals 1 and noisy equals 0, enabling direct comparison against human behavioral intelligibility scores.

## Experimental setup

The study utilized a high-resolution 3T fMRI dataset from 25 healthy native Mandarin speakers (12 male, 13 female; aged 18-25) scanned using a Siemens Magnetom Skyra scanner (TR = 2000 ms, TE = 24 ms, voxel size $3.4 \times 3.4 \times 4.0 \text{ mm}^3$). Participants listened to 96 ten-word sentences across four conditions (Clean, Noisy at -3 dB SNR, DNN-SE using SEMamba, and Classic-SE using MMSE enhancement), split into 4 runs of 24 trials. Baselines included standard L2-regularized Support Vector Machines (SVM) via The Decoding Toolbox (TDT) and standard Convolutional Neural Networks (CNN), evaluated via leave-one-run-out cross-validation (LORO-CV).

## Results

NeuroPAS-Net consistently outperformed both SVM and CNN baselines across all 12 bilateral speech-related ROIs, achieving a peak accuracy of 79.30% in the Right Precentral Gyrus (R PreCG). An ablation study across five top ROIs showed monotonic accuracy improvements as training phases were added: Phase 3 alone reached 77.46% in R PreCG, Phase 2+Phase 3 reached 78.55%, and the full Phase 1+2+3 pipeline hit 79.30%. For neural SE evaluation, normalized NeuroPAS scores showed that DNN-SE yielded a higher mean score of 0.60 compared to Classic-SE's 0.41, indicating that deep learning enhancement shifts brain responses closer to clean speech patterns. NeuroPAS showed a positive correlation with subjective intelligibility ratings (Spearman's $\rho = 0.43$).

| Systems / Conditions | L STG Acc [%] | R STG Acc [%] | R MTG Acc [%] | L PreCG Acc [%] | R PreCG Acc [%] |
|---|---|---|---|---|---|
| Random Baseline | 50.00 | 50.00 | 50.00 | 50.00 | 50.00 |
| SVM Baseline | - | - | - | - | - |
| CNN Baseline | - | - | - | - | - |
| NeuroPAS-Net (Phase 3 only) | 69.79 | 70.25 | 72.92 | 66.46 | 77.46 |
| NeuroPAS-Net (Phase 2+3) | 70.53 | 70.50 | 73.25 | 68.75 | 78.55 |
| NeuroPAS-Net (Phase 1+2+3) | 70.67 | 70.50 | 73.67 | 69.25 | 79.30 |

## Limitations

The study is bounded by a relatively small cohort of 25 young, healthy participants with normal hearing listening exclusively to Mandarin sentences, limiting immediate generalization to aging demographics, sensorineural hearing loss populations, and other languages. The fMRI acquisition temporal resolution (TR = 2000 ms) limits the capture of fast acoustic dynamics compared to EEG or MEG. Furthermore, the correlation between NeuroPAS and subjective intelligibility showed marginal statistical significance (corrected $p \approx 0.17$), indicating that further refinement is needed to match behavioral variance robustly.

## Why read this

Speech and ML researchers building neural evaluation metrics or brain-computer interfaces will find this a blueprint for using multi-phase transfer learning (SSL + incremental learning) to overcome inter-subject fMRI variability. It demonstrates how to translate black-box neural decoder outputs into actionable, continuous metrics for comparing audio enhancement pipelines.

## Code

- https://github.com/JohnSung0501/fMRI-Decoding

## Applications

Objective neural evaluation of speech enhancement algorithms, brain-computer interfaces for hearing aids, and neuro-guided speech processing systems.

## Institutions / 機構

National Taiwan University, Academia Sinica, Johns Hopkins University, National Yang Ming Chiao Tung University

## Related

- [Too Good to Be True: A Study on Modern Automatic Speech Recognition Systems for the Evaluation of Speech Enhancement](oliveira26b_interspeech.md) — same problem · relatedness 2.2/3
- [Deep learning-based predictions of perceived listening effort and intelligibility across enhanced, synthetic, natural, and binaural speech](hoffner26_interspeech.md) — same problem · relatedness 2.0/3
- [Post-Training Speech Enhancement Language Models with Perceptual Rewards](berdo26_interspeech.md) — same problem · relatedness 2.0/3
- [Seed-Enh: Generative Speech Enhancement in Decoupled Semantic and Timbre Spaces](shang26_interspeech.md) — same problem · relatedness 2.0/3
- [Assessing the Impact of Noise and Speech Enhancement on the Intelligibility of Speech Codecs](behringer26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
