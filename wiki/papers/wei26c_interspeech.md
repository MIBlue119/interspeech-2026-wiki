---
id: wei26c_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1191
pdf: https://www.isca-archive.org/interspeech_2026/wei26c_interspeech.pdf
---

# Perceptually Weighted Minimum Mean Square Error Precoding for Acoustic Multi-User MIMO in Vehicular Personal Sound Zones

*Huihui Wei, Dengke Deng, Pengcheng Luo, Weiyu You, Xiaojuan Zhang, Genke Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/wei26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1191)

**Category:** `enhancement-separation`

**TL;DR** — This paper proposes a perceptually weighted multi-user MIMO (MU-MIMO) precoding framework for in-vehicle personal sound zones (PSZ) that integrates psychoacoustic masking into the WMMSE criterion. Evaluated on real car cabin impulse responses, the method achieves improved speech intelligibility and perceived quality over traditional spatial audio baselines.

## Key contributions

- Formulates in-vehicle PSZ as a frequency-domain acoustic MU-MIMO precoding task designed to minimize cross-talk interference across multiple simultaneous zones.
- Introduces a perceptually-weighted optimization criterion integrating psychoacoustic masking (ATH and spectral masking) into the WMMSE framework to penalize errors in sensitive time-frequency regions.
- Demonstrates joint optimization of speech fidelity and inter-user interference suppression under highly reflective, low-rank automotive acoustic conditions.

## Problem

Traditional spatial audio techniques like acoustic contrast control and pressure matching treat acoustic cross-talk as uniform physical energy and struggle to scale beyond a binary bright-dark zone paradigm when multiple listeners require simultaneous audio. Furthermore, the compact, reflective automotive cabin environment creates dense reverberation, frequency-selective fading, and limited spatial degrees of freedom. Existing approaches fail to systematically incorporate human psychoacoustics or jointly optimize errors across multiple distinct listening zones.

## Method

The system models a multi-listener car cabin where $N_L=7$ loudspeakers transmit independent speech streams to $K$ users equipped with microphone arrays (totaling $N_r=64$ receiving sensors across 4 seats). The frequency-domain received signal vector at user $k$ is given by $\mathbf{y}_k = \mathbf{H}_k \mathbf{W}_k \mathbf{s}_k + \sum_{i \neq k} \mathbf{H}_k \mathbf{W}_i \mathbf{s}_i + \mathbf{n}_k$, where $\mathbf{H}_k$ is the acoustic transfer function matrix, $\mathbf{W}_i$ is the pre-filtering matrix, and $\mathbf{s}_i$ is the target speech signal.

The core optimization problem minimizes the trace of a perceptually weighted MSE matrix, $\text{tr}(\mathbf{\Theta}_k \mathbf{E}_k)$, subject to acoustic contrast constraints and a maximum transmit power limit $P_{\text{max}}$. The positive semidefinite weighting matrix $\mathbf{\Theta}_k$ is constructed independently of the precoder using an MPEG-inspired psychoacoustic model. It computes global masking thresholds $T_k(m, l)$ by combining tonal/noise maskers via spreading functions with the absolute threshold of hearing (ATH), mapping them to scalar weights via inverse linear transformation to heavily penalize distortion in perceptually sensitive time-frequency bins.

The resulting non-convex problem is solved via an iterative WMMSE update procedure where receiver filters $\mathbf{U}_k$ and precoders $\mathbf{W}_k$ are updated using first-order optimality conditions, with Lagrange multipliers handling total power and acoustic contrast constraints. The framework avoids binary zone limitations and balances acoustic contrast, reconstruction error, and radiation efficiency across the 100-8000 Hz spectrum.

## Experimental setup

Experiments use measured acoustic impulse responses from a sedan cabin equipped with a 7-channel loudspeaker array and a 64-microphone array spanning 4 passenger seats (16 mics per seat), measured three times for averaging. Speech utterances are drawn from the LibriSpeech corpus. The proposed method (MU-MIMO Perceptual) is compared against ACC, PM, ACC-PM ($\kappa=0.7$), narrowband VAST ($\mu=1, V=7$), worst-case robust ACC (wc RACC), POTDC RACC, and unweighted MU-MIMO (MU-MIMO NoWeight). Evaluation metrics include STOI (Short-Time Objective Intelligibility) and ViSQOL (Virtual Speech Quality Objective Listener).

## Results

The unweighted MU-MIMO baseline achieves an STOI of 0.857 and ViSQOL of 4.183, outperforming traditional baselines like ACC (0.819 STOI / 4.086 ViSQOL) and PM (0.855 STOI / 4.184 ViSQOL). Incorporating perceptual weighting further improves performance, with MU-MIMO Perceptual reaching the highest scores across evaluated metrics at 0.859 STOI and 4.191 ViSQOL. Robust baselines like POTDC RACC suffer degradation (3.628 ViSQOL) due to overly conservative constraints.

| Algorithm Name | STOI | ViSQOL |
|---|---|---|
| ACC | 0.819 | 4.086 |
| PM | 0.855 | 4.184 |
| VAST NF | 0.855 | 4.184 |
| POTDC RACC | 0.810 | 3.628 |
| MU-MIMO NoWeight | 0.857 | 4.183 |
| MU-MIMO Perceptual | 0.859 | 4.191 |

## Limitations

The evaluation is restricted to a static car cabin environment using pre-measured impulse responses from a single sedan model, leaving real-time tracking of passenger head movements and dynamic cabin changes unaddressed. The perceptual weighting relies on a simplified MPEG psychoacoustic model which may not fully capture complex masking effects in highly dynamic or extremely loud multi-talker vehicular environments. Additionally, the approach assumes clean, independent target speech signals for each zone without accounting for background cabin noise.

## Why read this

Spatial audio and automotive acoustic engineers should read this to see how integrating classical psychoacoustic masking into a multi-user WMMSE precoding framework effectively resolves multi-zone interference in highly reverberant spaces without the constraints of traditional bright-dark zone paradigms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart cockpit audio systems, in-vehicle personal sound zones, and multi-listener spatial audio reproduction.

## Institutions / 機構

Shanghai Jiao Tong University, Ningbo Artificial Intelligence Institute, Institute of Advanced Intelligence and Computing

## Related

- (link related pages by id as the wiki grows)
