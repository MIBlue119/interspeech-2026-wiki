---
id: kaneko26_interspeech
category: tts
labels: [efficient-on-device, generative-model]
institutions: ["NTT"]
code: https://www.kecl.ntt.co.jp/people/kaneko.takuhiro/projects/meanvoiceflow2/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1596
pdf: https://www.isca-archive.org/interspeech_2026/kaneko26_interspeech.pdf
---

# MeanVoiceFlow2: Joint Optimization of Mean Flow and Content Encoder for Fast One-Step Zero-Shot Voice Conversion

*Takuhiro Kaneko, Hirokazu Kameoka, Kou Tanaka, Yuto Kondo*

[PDF](https://www.isca-archive.org/interspeech_2026/kaneko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kaneko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1596)

**Category:** `tts` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — MeanVoiceFlow2 jointly optimizes a one-step flow-based voice conversion module and a lightweight content encoder using distillation, real-data reconstruction, and diffusion-GAN training. It achieves a ~9x speedup and higher perceptual quality than its teacher model without needing external pretrained neural vocoders.

## Key contributions

- Jointly optimizes a student velocity network and a lightweight content encoder to remove the heavy bottleneck of pretrained bottleneck extractors.
- Combines conversion distillation with real-data reconstruction to align distributions and ensure data fidelity without needing parallel training data.
- Implements a diffusion-GAN training scheme with sample mixing and teacher-guided conditioning augmentation to stabilize adversarial training and improve speaker-content disentanglement.
- Achieves ~9× faster inference (RTF of 0.00084) than MeanVoiceFlow while improving perceptual quality (UTMOS, DNSMOS) and keeping speaker similarity intact.

## Problem

State-of-the-art nonparallel zero-shot voice conversion models leverage diffusion and flow-matching frameworks to achieve strong speech quality and speaker similarity, but they typically require multi-step generation or computationally expensive content encoders like Conformer-based bottleneck extractors. While single-step models like MeanVoiceFlow eliminate multi-step sampling bottlenecks, their reliance on a heavy, fixed content encoder creates a significant computational bottleneck during inference. Prior joint-optimization attempts like FasterVoiceGrad resolve this via a diffusion backbone, but they depend heavily on auxiliary pretrained neural vocoders and waveform/feature discriminators for stable adversarial training. MeanVoiceFlow2 addresses these limitations by providing a fast, end-to-end framework that trains from scratch using only a teacher model on the same data, eliminating external dependencies while drastically accelerating inference.

## Method

MeanVoiceFlow2 replaces the fixed pretrained content encoder $c_θ$ and teacher velocity network $u_θ$ with a trainable, computationally efficient content encoder $c_ϕ$ and student velocity network $u_ϕ$. The student network is trained through three primary mechanisms: joint conversion distillation and real-data reconstruction, diffusion-GAN training with sample mixing, and teacher-guided conditioning augmentation. For conversion distillation, the student minimizes an adaptively weighted distance loss $\frac{\|a-b\|^2}{2 \text{sg}(\|a-b\|^2) + \varepsilon}$ ($\varepsilon = 10^{-3}$) against the teacher conversion output. To ensure consistency with real data without parallel pairs, a real-data reconstruction loss is optimized where inputs undergo diffusion noise levels sampled via a logit-normal distribution.

To overcome statistical averaging and enhance distribution realism, least-squares adversarial training is integrated using a diffusion-GAN architecture and sample mixing. Specifically, teacher and mixed samples are perturbed by a diffusion process parameterized by noise level $\gamma$ sampled via a logit-normal distribution, and a discriminator $D_ψ$ (sharing the same U-Net architecture as $u_θ$ with time variables omitted) evaluates them conditioned on target speaker $s^{\text{tgt}}$, content $c^{\text{src}}$, and noise level $\gamma$. Furthermore, teacher-guided conditioning augmentation forces the content encoder to produce robust, speaker-invariant representations by feeding teacher-generated outputs with shuffled speaker identities ($s^{\text{aug}}$) back into the content encoder during distillation and reconstruction updates, avoiding explicit $ℓ_1$ feature-level alignment constraints that can overly constrict the student encoder.

The student architecture uses a 12-layer U-Net velocity network with 512 channels, gated linear units (GLUs), and weight normalization, paired with a lightweight content encoder comprising three convolutional layers with 512 channels, GLUs, instance normalization, and weight normalization. Training utilizes the Adam optimizer with a batch size of 32, learning rate $2 \times 10^{-4}$, $\beta_1 = 0.5$, and $\beta_2 = 0.9$. The student and discriminator are trained for 250 epochs initialized from a teacher model pretrained for 500 epochs. At inference, the heavy bottleneck feature extractor is completely omitted, leaving only the lightweight $c_ϕ$ and $u_ϕ$ to process conversions in a single step.

## Experimental setup

Evaluated on the VCTK dataset (110 English speakers) and LibriTTS (1,151 English speakers) downsampled to 22.05 kHz. Models used 80-dimensional log-mel spectrograms extracted with an FFT size of 1024, hop size of 256, and window size of 1024. Baselines include ground-truth speech, DiffVC (30 iterations), MeanVoiceFlow (teacher), and FasterVoiceGrad. Evaluated using UTMOS (UT $\uparrow$), DNSMOS Pro (DNSP $\uparrow$), DNSMOS (DNS $\uparrow$), Whisper-large-v3 Character Error Rate (CER $\downarrow$), WavLM Base+ Speaker Embedding Cosine Similarity (SECS $\uparrow$), real-time factor (RTF $\downarrow$) measured on a single NVIDIA GeForce RTX 4090 GPU, and subjective nMOS/sMOS metrics via online listening tests.

## Results

On the VCTK dataset, MeanVoiceFlow2 achieved an nMOS of $3.93 \pm .10$ (outperforming MeanVoiceFlow at $3.76$ and FasterVoiceGrad at $3.72$), a UTMOS of 4.05, DNSMOS Pro of 2.99, DNSMOS of 3.81, a CER of 1.2%, and an SECS of 0.887, while slashing the inference RTF to 0.00084 (~9× faster than MeanVoiceFlow's 0.0072 and matching FasterVoiceGrad's RTF). On LibriTTS, MeanVoiceFlow2 achieved a UTMOS of 4.05, DNSMOS Pro of 3.10, DNSMOS of 3.71, CER of 1.1%, SECS of 0.880, and an RTF of 0.0010 (vs MeanVoiceFlow's 0.0089). Ablation studies showed that removing reconstruction degraded UTMOS to 4.00 and CER to 1.8%, whereas omitting conditioning augmentation degraded CER to 1.5% and DNSP to 2.97. Direct $ℓ_1$ feature distillation failed to improve results, degrading CER to 1.9%.

| System | nMOS $\uparrow$ | UTMOS $\uparrow$ | DNSP $\uparrow$ | CER $\downarrow$ | SECS $\uparrow$ | RTF $\downarrow$ |
|---|---|---|---|---|---|---|
| GT | $4.26 \pm .09$ | 4.15 | 2.89 | 0.1 | 0.940 | – |
| DiffVC | $3.43 \pm .11$ | 3.76 | 2.64 | 5.4 | 0.880 | 0.19 |
| MeanVoiceFlow (Teacher) | $3.76 \pm .09$ | 3.98 | 2.85 | 1.2 | 0.886 | 0.0072 |
| MeanVoiceFlow2 (Proposed) | $3.93 \pm .10$ | 4.05 | 2.99 | 1.2 | 0.887 | 0.00084 |
| FasterVoiceGrad | $3.72 \pm .10$ | 4.03 | 2.79 | 1.2 | 0.890 | 0.00084 |

## Limitations

Evaluated exclusively on English corpora (VCTK and LibriTTS) under controlled laboratory recording conditions, leaving multilingual and noisy acoustic scaling untested. The method relies heavily on a pre-trained teacher model, bounding student performance by teacher quality and introducing a two-stage training requirement (500 teacher epochs plus 250 student epochs).

## Why read this

Read this paper if you build real-time speech generation or voice conversion pipelines and want to learn how to distill heavy encoder-flow architectures into efficient, single-step models without auxiliary neural vocoders.

## Code

- https://www.kecl.ntt.co.jp/people/kaneko.takuhiro/projects/meanvoiceflow2/

## Applications

Real-time voice conversion, accent modification, and on-device speech translation pipelines.

## Institutions / 機構

NTT

## Related

- [MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion](ma26c_interspeech.md) — same problem · relatedness 2.9/3
- [CFLOW-VC: An unsupervised cycle training strategy based on normalizing flows for Voice Conversion](song26_interspeech.md) — same problem · relatedness 2.8/3
- [ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion](choi26d_interspeech.md) — same problem · relatedness 2.8/3
- [Improving Model Expressivity and Speaker Matching in Low-Latency Voice Conversion](bargum26_interspeech.md) — same problem · relatedness 2.8/3
- [From A to B to A: Palindromic Zero-Shot Voice Conversion with Non-Parallel Data](mandel26_interspeech.md) — same problem · relatedness 2.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
