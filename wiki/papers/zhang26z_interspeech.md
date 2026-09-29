---
id: zhang26z_interspeech
category: enhancement-separation
labels: [efficient-on-device, generative-model]
institutions: ["Hangzhou Dianzi University"]
code: https://github.com/zhangwen0821/ARFSE.git
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1679
pdf: https://www.isca-archive.org/interspeech_2026/zhang26z_interspeech.pdf
---

# Time-Unconditional Generative Speech Enhancement via Autonomous Rectified Flow

*Wen Zhang, Wenbin Jiang, Yang Zhang, Xiaofei Zhou*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1679)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — The paper introduces Autonomous Rectified Flow (ARF), a time-unconditional generative speech enhancement framework that eliminates explicit time-step conditioning. It achieves competitive speech quality (PESQ 3.11 at NFE=5) and state-of-the-art single-step inference efficiency with a real-time factor (RTF) of 0.02 at NFE=1.

## Key contributions

- Mathematically proves that the target vector field in linear-path generative speech enhancement is inherently time-invariant, rendering explicit time-step embeddings redundant.
- Proposes Autonomous Rectified Flow (ARF), an autonomous ordinary differential equation (ODE) framework that infers denoising direction directly from the spatial state and noisy observation.
- Achieves high-efficiency single-step generation (NFE=1) with a PESQ of 3.00, SI-SDR of 19.91 dB, and RTF of 0.02 on VoiceBank+DEMAND.
- Demonstrates that removing temporal conditioning modules prevents trajectory overfitting and reduces computational overhead.

## Problem

Generative speech enhancement models such as diffusion models and flow-matching techniques (e.g., FlowSE, BBED) rely heavily on explicit time-step embeddings to track evolving noise scales along generative trajectories. However, in boundary-anchored tasks where linear interpolation paths are used, this explicit temporal conditioning forces models to learn trajectory-specific noise scales, making them prone to trajectory overfitting. Consequently, minor numerical deviations during inference push states off the expected trajectory, severely degrading performance under low Number of Function Evaluations (NFE) budgets.

## Method

The Autonomous Rectified Flow (ARF) framework models speech enhancement using a linear interpolation path between clean speech ($x_0$) and a noisy observation ($y = x_0 + n$). Because the target vector field collapses to the additive noise realization ($y - x_0$), it is mathematically independent of temporal scaling. The model employs a time-unconditional network—built by freezing the time-step input and noise scheduling modules of a 65.6M (or 27.8M in ablations) parameter NCSN++ architecture—to directly estimate the target vector field using only the current state $x_t$ and the noisy mixture $y$.

During training, the network is optimized to map intermediate noisy states directly to the noise correction without time-step guidance. For inference, the framework utilizes an autonomous ordinary differential equation (ODE) system initialized at $t=1$ with the noisy prior and integrated backward to $t=0$. A multi-step Euler solver with a uniform sampling schedule is employed, utilizing a constant step size $\Delta t = 1/N$. This design eliminates temporal modulation layers, which reduces computational latency and eliminates trajectory overfitting risks.

## Experimental setup

Evaluated on the VoiceBank+DEMAND dataset (clean VCTK mixed with DEMAND noise) and cross-evaluated on the DNS Challenge synthetic test set for generalization. Compared against generative baselines FlowSE and BBED across various NFE budgets (NFE = 1, 2, 5). Metrics include PESQ, eSTOI, SI-SDR, WV-MOS, DNSMOS P.835 (SIG, BAK, OVRL), and Real-Time Factor (RTF). Models use an NCSN++ backbone, trained using the Adam optimizer with a learning rate of $1 \times 10^{-4}$, batch size of 4, for 100 epochs with an EMA decay factor of 0.999. STFT uses a 510 FFT size and 128 hop length.

## Results

On VoiceBank+DEMAND at NFE=5, ARFSE achieves a PESQ of 3.11 and eSTOI of 0.88, closely matching FlowSE (PESQ 3.05). At NFE=1, ARFSE significantly outperforms single-step FlowSE and BBED, yielding a PESQ of 3.00, an SI-SDR of 19.91 dB, and an RTF of 0.02 (compared to FlowSE's RTF of 0.05). Ablations in a 27.8M parameter configuration confirm that removing the timestep embedding (w/o t) boosts PESQ from 2.87 to 2.97 at NFE=1 while dropping RTF from 0.05 to 0.02. However, on out-of-distribution tests using the DNS Challenge dataset with heavy reverberation, both ARFSE and FlowSE suffer significant performance drops (e.g., negative SI-SDR in 'with reverb' settings), showing that time-unconditional formulations do not inherently resolve severe room acoustic generalization failures.

| Method | NFEs | PESQ $\uparrow$ | eSTOI $\uparrow$ | SI-SDR (dB) $\uparrow$ | RTF $\downarrow$ |
|---|---|---|---|---|---|
| BBED | 5 | 3.05 | 0.87 | 18.91 | - |
| FlowSE | 5 | 3.05 | 0.87 | 18.02 | 0.19 |
| ARFSE (Ours) | 5 | 3.11 | 0.88 | 18.02 | 0.13 |
| FlowSE | 1 | 2.86 | 0.87 | 19.57 | 0.05 |
| ARFSE (Ours) | 1 | 3.00 | 0.88 | 19.91 | 0.02 |

## Limitations

The evaluation is restricted to clean-to-noisy synthetic mixtures (VoiceBank+DEMAND) and standard DNS challenge conditions, lacking testing on real-world recording device variations. The method fails to generalize well to severe reverberant environments ('with reverb' DNS evaluation), indicating that autonomous trajectory alignment alone does not solve spatial acoustic adaptation. Furthermore, scaling properties across massive pre-trained model sizes are not explored.

## Why read this

Speech researchers and audio engineers working on real-time generative speech enhancement should read this to understand why time-step conditioning can be safely excised from linear flow-matching pipelines, resulting in faster and more robust single-step inference.

## Code

- https://github.com/zhangwen0821/ARFSE.git

## Applications

Real-time on-device speech enhancement for telephony, hearing aids, and voice communication pipelines.

## Institutions / 機構

Hangzhou Dianzi University

**Funding / 經費:** Yangtze River Delta Science and Technology Innovation Community Joint Research, Zhejiang Provincial Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
