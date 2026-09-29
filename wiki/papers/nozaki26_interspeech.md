---
id: nozaki26_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["National Institute of Advanced Industrial Science and Technology", "Keio University", "Waseda University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3308
pdf: https://www.isca-archive.org/interspeech_2026/nozaki26_interspeech.pdf
---

# Semi-Supervised Joint Separation and Diarization for Multichannel Noisy Speech Mixtures

*Yuto Nozaki, Kohei Saijo, Yoshiaki Bando, Masaki Onishi*

[PDF](https://www.isca-archive.org/interspeech_2026/nozaki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nozaki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3308)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — This paper introduces a semi-supervised joint speech separation and diarization framework for multichannel noisy mixtures that trains noise suppression using clean speech mixtures and environmental noise recordings without requiring isolated source signals. Compared to baseline neural FCASA, it improves signal-to-noise ratio (SDR) from 12.3 dB to 14.0 dB and lowers the diarization error rate (DER) from 4.2% to 3.1%.

## Key contributions

- Formulates a semi-supervised joint separation and diarization approach for multichannel noisy mixtures using clean speech mixtures and environmental noise recordings.
- Proposes three objective functions derived from a unified generative model of multichannel mixtures: a thresholded SNR objective, a clean speech mixture negative log-likelihood (NLL), and a multichannel Itakura-Saito distance (MISD) posterior objective.
- Eliminates the requirement for isolated single-speaker ground-truth audio signals during training while avoiding the domain mismatch common in fully simulated synthetic datasets.
- Demonstrates consistent quantitative gains across both separation metrics (SDR, STOI, PESQ, UTMOS, DNSMOS) and diarization metrics (DER, SCA) over FastMNMF2 and standard neural FCASA baselines.

## Problem

Simultaneous speech separation and speaker diarization exhibit a interdependent chicken-and-egg relationship, prompting researchers to develop joint models. However, standard models rely heavily on fully supervised training using completely simulated datasets, causing severe domain mismatch when deployed on real recordings. Weakly supervised or unsupervised spatial covariance methods like neural full-rank spatial covariance analysis with speaker activity (neural FCASA) avoid this by leveraging local Gaussian models and blind source separation, but they break down in diffuse, non-stationary, or close-range noise conditions due to biased spatial statistics. This paper addresses this gap by enabling robust semi-supervised learning that leverages easily obtainable clean conversation mixtures and environmental noise separately.

## Method

The method builds upon a probabilistic generative model of multichannel noisy speech mixtures where an observed _M_-channel mixture is the sum of a clean speech mixture and an environmental noise signal. The clean speech mixture itself is modeled as the sum of _N_ directional speech source signals. The network employs an encoder-decoder architecture following neural FCASA: the encoder alternates between RE-SepFormer blocks (Transformer layers with 256 latent dimensions, 1024 feed-forward dimensions, and 8 attention heads) and iterative source steering (ISS) blocks, while the decoder consists of six linear layers with 256 hidden dimensions, residual connections, PReLUs, and a final softplus activation to ensure non-negative power spectral densities (PSDs).

During training, the system optimizes a multi-task objective combining supervised diarization via binary cross-entropy on speaker activities and a semi-supervised separation loss. The separation loss incorporates the original noisy mixture evidence lower bound (ELBO) alongside three auxiliary clean-speech-mixture objectives: a thresholded signal-to-noise ratio loss with a 30 dB clamp, a negative log-likelihood (NLL) objective evaluated via Monte Carlo approximation using diagonalized noise-free mixtures, and a multichannel Itakura-Saito distance (MISD) measuring the posterior probability of estimated clean speech source images.

At inference, 10-second segments are processed through the trained inference network, and a median filter with an 11-frame window smooths the estimated speaker activities. The maximum number of sources is set to _N_+1 = 6 to accommodate up to 4 speakers, 1 white noise component from clean mixture simulation, and 1 non-stationary environmental noise source.

## Experimental setup

Experiments are conducted on a simulated meeting dataset generated via the JSALT2020 Simulate toolkit using LibriSpeech utterances and DEMAND noise recordings, totaling 86.06 hours for training (2086 files), 4.70 hours for development, and 4.74 hours for testing with a 4-channel microphone array at 16 kHz. Baselines include FastMNMF2 and standard neural FCASA, evaluated using Diarization Error Rate (DER), Source Counting Accuracy (SCA), Signal-to-Distortion Ratio (SDR), STOI, PESQ, UTMOS, and DNSMOS. Models are trained for 200 epochs using AdamW (learning rate 1.0e-4, weight decay 1.0e-5, batch size 64) with SpecAugment data augmentation.

## Results

The fully proposed noise-aware neural FCASA model combining all three auxiliary objectives (P7) achieves an SDR of 14.0 dB and a PESQ of 2.19, outperforming standard neural FCASA (B2) which attains 12.3 dB SDR and 1.83 PESQ, and FastMNMF2 (B1) at 7.5 dB SDR. For diarization, the combined objective configuration reduces the Diarization Error Rate (DER) from 4.2% down to 3.1% while improving source counting accuracy to 0.95. Ablating individual objectives shows that the thresholded SNR loss (_L_^(snr)) yields the largest jump in separation metrics like SDR (reaching 14.0 dB on P1 and P4), whereas the probabilistic NLL (_L_^(nll)) and MISD (_L_^(misd)) objectives provide stronger contributions toward lowering the DER and improving source counting.

| System | DER (%) | SCA | SDR (dB) | STOI | PESQ | UTMOS |
|---|---|---|---|---|---|---|
| FastMNMF2 (B1) | – | – | 7.5 | 0.75 | 1.49 | 1.55 |
| Neural FCASA (B2) | 4.2 | 0.93 | 12.3 | 0.80 | 1.83 | 1.90 |
| Proposed L(snr) (P1) | 4.2 | 0.93 | **14.0** | 0.84 | 2.17 | 2.05 |
| Proposed L(misd) (P3) | 3.2 | **0.95** | 13.0 | 0.83 | 2.06 | 1.98 |
| Proposed Combined (P7) | **3.1** | **0.95** | 13.9 | **0.85** | **2.19** | **2.70** |

## Limitations

The evaluation is restricted to simulated meeting scenarios with fixed microphone arrays and stationary source positions, omitting moving speakers and dynamic noise trajectories. The framework assumes clean speech mixtures and noise recordings can be explicitly separated during training set construction, and performance is bounded by the diversity of the DEMAND noise categories and LibriSpeech subsets utilized.

## Why read this

Speech researchers and audio engineers working on multichannel front-ends will find this a valuable blueprint for combining unsupervised spatial covariance models with weakly supervised clean-mixture objectives, bypassing the need for expensive isolated speaker corpora.

## Code

- https://ybando.jp/projects/na_neural-fcasa/

## Applications

Distant automatic speech recognition front-ends, smart speaker multichannel meeting transcription, and multi-speaker teleconferencing systems operating in noisy environments.

## Institutions / 機構

National Institute of Advanced Industrial Science and Technology, Keio University, Waseda University

**Funding / 經費:** JST FOREST

## Related

- (link related pages by id as the wiki grows)
