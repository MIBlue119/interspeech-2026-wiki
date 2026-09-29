---
id: yu26d_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
institutions: ["Hyundai Motor Company"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1631
pdf: https://www.isca-archive.org/interspeech_2026/yu26d_interspeech.pdf
---

# Sweep-RSE: Streaming Region-of-Interest Speech Extraction in Multi-Talker Scenarios via Explicit Spatial Sweeping

*Hogeon Yu, SeongHun Noh, Hyunsik Choi, Sihyun Joo*

[PDF](https://www.isca-archive.org/interspeech_2026/yu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1631)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — Sweep-RSE is a lightweight, strictly causal region-of-interest speech extraction framework that replaces implicit spatial conditioning with an explicit Align & Sweep mechanism, achieving an SI-SDR of 12.88 dB on realistic multi-talker stress tests while requiring only 1.66M parameters.

## Key contributions

- Proposes an explicit Align & Sweep mechanism that virtually steers array elements and scans target regions via phase coherency instead of relying on implicit boundary network learning.
- Introduces Complex Hybrid Split Dense Blocks (CH-SDB) using complex 2D convolutions with weight-sharing to preserve spatial phase relationships and temporal harmonics.
- Integrates a Region Speech Detector (RSD) and hybrid Gated Context Fusion (GCF) to model directional discrepancies and eliminate false alarms in silent/empty regions.
- Achieves a strictly causal, stateful architecture with O(1) processing complexity per frame, scaling efficiently for real-time edge streaming on a 4-channel microphone array.

## Problem

Prior region-of-interest speech extraction methods like ReZero and DPARNet rely on implicit boundary conditioning—using grid points or coordinate encodings injected via feature addition—which forces the network to learn geometric mappings without physical constraints. This leads to severe spatial leakage under dense multi-talker interference and massive false alarms when target regions are empty (Q = 0). These shortcomings make existing models brittle in complex acoustic scenes and impractical for low-latency edge deployment.

## Method

Sweep-RSE processes 4-channel multi-talker STFT inputs through a Boundary-Aware Encoder, a causal Dual-Path Block, and an RSD head. First, Target-Centric Phase Alignment virtually shifts the array to the target window center (θc) via frequency-domain fractional delay compensation, achieving DoA invariance. The aligned signals are passed to the Complex Hybrid Split Dense Block (CH-SDB), featuring complex 2D convolutions (3x1 temporal-spectral) whose channels split into a strict temporal branch (3x1) and a context spectro-temporal branch (3x3).

Next, the Physics-Informed Spatial Sweep Attention (SSA) scans the region using L = 16 equidistant candidate steering vectors (5.625 degrees resolution). Query and key features from L2-normalized microphones are multiplied by the complex conjugate of steering vectors to enforce physical phase alignment, generating attention weights via cosine similarity with a learnable temperature tau = 10. Gated Context Fusion (GCF) then constructs a hybrid feature map combining reference microphone features, averaged aligned target features, and individual spatial difference residuals (F_ref - F_aligned), compressing them through 1x1 convolutions and 1x5 frequency depthwise convolutions.

The refined features enter a lightweight causal Dual-Path Block adapted from SpatialNet (B = 3 blocks, C = 32 channels, FFN expansion 64) with step-wise internal caches for infinite streaming. Finally, dual parallel heads output a complex mask and a Region Speech Detector (RSD) gating probability. The model is trained via AdamW (lr = 3e-4) for 200 epochs on a joint loss: L_SI-SDR + 0.1 * L_BCE.

## Experimental setup

Evaluated on a Standard Set (3k samples) and a Realistic Set (6k samples, including Q = 0 empty regions, Q = 1 target with extreme interference, and Q = 2 group extraction). Signals are generated via gpuRIR using VCTK speech and WHAM! noise at 5-15 dB SNR, sampled at 16 kHz using a 4-channel square array (radius ~5.65 cm). Compared against Oracle MVDR, BSRNN, SpatialNet, Cone-of-Silence (CoS), and causal implicit proxies (ReZero-Proxy, DPARNet-Proxy). Metrics include SI-SDR, PESQ, STOI, and Energy Decay (Q = 0).

## Results

On the Realistic Set for single target extraction (Q = 1), causal Sweep-RSE achieves 12.88 dB SI-SDR, outperforming implicit spatial baselines like ReZero-Proxy (10.32 dB) and DPARNet-Proxy (10.40 dB) by over 2.4 dB despite using 160x fewer parameters than methods like Cone-of-Silence. In empty regions (Q = 0), the model suppresses false alarms with an energy decay of 97.92 dB, vastly outperforming SpatialNet (21.68 dB). Ablations confirm that explicit alignment and sweep dramatically boost robustness against extreme multi-talker interference compared to feature-based or boundary-based implicit conditioning.

| Systems / Conditions | Q=0 Decay (dB) | Q=1 SI-SDR (dB) | Q=2 SI-SDR (dB) | Q=1 STOI | Q=1 PESQ |
|---|---|---|---|---|---|
| Unprocessed | - | -0.76 | 4.93 | 0.64 | 1.16 |
| SpatialNet-small | 21.68 | 17.29 | 6.11 | 0.95 | 3.02 |
| Cone-of-Silence | 45.73 | 10.02 | 11.15 | 0.83 | 1.70 |
| ReZero-Proxy (Causal) | - | 10.32 | 11.74 | - | - |
| DPARNet-Proxy (Causal) | - | 10.40 | 11.71 | - | - |
| Proposed (Causal) | 97.92 | 12.88 | 12.64 | 0.89 | 2.09 |

## Limitations

The evaluation relies on simulated RIRs and mixtures rather than live real-world multi-microphone hardware recordings. The current architecture targets single-speaker extraction within the defined ROI, leaving concurrent multi-speaker separation inside a single window for future work. Furthermore, the fixed-resolution scanning strategy and constrained channel dimensions (C = 32) restrict ultra-fine spatial resolution in highly reverberant, densely populated acoustic spaces.

## Why read this

Speech and ML engineers building real-time, low-latency audio front-ends for AR/VR or hearing aids should read this to see how replacing unstable implicit network spatial mapping with a physics-informed, explicit alignment and sweep mechanism dramatically improves spatial selectivity and noise rejection on edge hardware.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time smart hearing aids, AR/VR spatial audio communication systems, and edge-based directional voice command interfaces.

## Institutions / 機構

Hyundai Motor Company

## Related

- (link related pages by id as the wiki grows)
