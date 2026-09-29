---
id: lin26j_interspeech
category: asr
labels: [efficient-on-device, streaming-real-time]
institutions: ["Chinese University of Hong Kong", "National University of Singapore", "Harbin Institute of Technology", "Tsinghua University"]
code: https://github.com/PatrickZLin/F2S
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1858
pdf: https://www.isca-archive.org/interspeech_2026/lin26j_interspeech.pdf
---

# First-to-Spike: An Early-Exit Framework for Rapid and Energy-Efficient Spiking Neural Networks

*Zheyuan Lin, Sirui Li, Zeyang Song, Zhiqi Zhang, Siqi Cai, Haizhou Li*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1858)

**Category:** `asr` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — The paper introduces First-to-Spike (F2S), an early-exit framework for Spiking Neural Networks that terminates inference upon the first output spike from a competitive layer, setting a new accuracy state-of-the-art on keyword spotting and EEG tasks while reducing energy consumption.

## Key contributions

- First-to-Spike (F2S) Framework: A fully event-driven architecture that uses the first output spike as the native classification signal without extrinsic softmax thresholds.
- Winner-Take-All (WTA) Circuit: A lateral inhibition mechanism with trainable recurrent inhibitory weights integrated into the output layer to accelerate decision convergence.
- Hybrid Temporal Training (HTT) Objective: A joint loss combining weighted temporal efficient training (TET), a temporal margin loss, and an efficiency regularization term.
- Empirical Validation: Demonstrates superior accuracy, lower average decision timestep (ADT), and reduced energy consumption across speech command (GSC V2) and EEG emotion recognition (SEED/SEED-IV) datasets.

## Problem

Spiking neural networks (SNNs) are designed for energy-efficient, event-driven inference, yet they are frequently trained and evaluated by processing entire input sequences regardless of information density. Prior early-exit SNN approaches, such as ED-sKWS and SEENN, rely on non-spiking auxiliary decision rules like softmax-based confidence thresholds at each timestep, which complicates deployment on pure neuromorphic hardware. This mismatch creates unnecessary computational waste for easy inputs and breaks the purely event-driven computation paradigm. This work matters because true low-latency edge deployment requires intrinsic, spike-based decision mechanisms.

## Method

The F2S framework consists of a multi-layer SNN backbone followed by a First-to-Spike Decision Layer composed of Leaky Integrate-and-Fire (LIF) neurons where each neuron represents a class. Membrane potential dynamics $u_j[t]$ update based on leak factors, input currents, and previous spikes, utilizing surrogate gradients during backward passes via BPTT. The decision rule states that the classification prediction $\hat{y}$ and decision time $t_d$ are determined entirely by the first neuron to emit a spike ($s_j[t] = 1$). If no neuron fires by the final timestep $T$, a fallback mechanism selects the neuron with the highest membrane potential at $T$.

To resolve ambiguity when multiple neurons receive competing evidence, a Winner-Take-All (WTA) circuit introduces a trainable recurrent inhibitory weight matrix $V$ into the decision layer using sigmoid-modulated sub-threshold activity. The diagonal elements are fixed to zero, and off-diagonal weights are initialized negatively to allow leading neurons to suppress rivals. The Hybrid Temporal Training (HTT) objective combines three terms: a Weighted TETLoss utilizing a normalized sigmoid weighting function centered in the middle of the sequence to emphasize salient timesteps; a temporal margin loss enforcing a minimum timestep gap $M$ between the ground-truth neuron and incorrect competitors; and an efficiency loss minimizing the firing time of the correct neuron.

During inference, computation halts the instant the first spike occurs, yielding native adaptive execution times correlated with sample complexity.

## Experimental setup

Evaluated on three datasets: Google Speech Commands V2 (GSC V2) with 98 timesteps of 40-dimensional log Mel-filterbank energies; and SEED and SEED-IV EEG emotion recognition datasets using Differential Entropy features under a subject-independent Leave-One-Subject-Out (LOSO) protocol. Compared against baselines including Yilmaz et al., MSAT, Sparch, and ED-sKWS. Evaluated using Accuracy (%), Average Decision Timestep (ADT), and estimated energy consumption based on 45nm CMOS technology (4.6 pJ per MAC, 0.9 pJ per AC). Hyperparameters set to $\alpha = 0.05$, $\beta = 0.01$, and $M = 5$.

## Results

On GSC V2, F2S achieves an accuracy of 92.89% with an ADT of 63.68 and 2.75 µJ of energy, outperforming the previous early-exit state-of-the-art ED-sKWS (90.14% accuracy, 66.07 ADT, 2.85 µJ) and Sparch (90.46% accuracy). On the SEED EEG dataset, F2S reaches 79.35% accuracy and an ADT of 3.06, slashing latency by 36.5% compared to ED-sKWS (4.82) and 69.4% compared to full-sequence Sparch (10.0).

Ablation studies on GSC V2 show that a vanilla F2S model without WTA and HTT achieves 89.17% accuracy (ADT 69.78). Adding HTT reduces ADT to 66.32 (89.84% accuracy), while integrating WTA yields a larger accuracy jump to 92.32% (ADT 65.43). Combining both elements maximizes performance at 92.89% accuracy and 63.68 ADT.

| Systems/Conditions | Acc. (%) | ADT | Energy (µJ) |
|---|---|---|---|
| Sparch [24] | 90.46 | 98 | 5.36 |
| ED-sKWS [5] | 90.14 | 66.07 | 2.85 |
| F2S w/o WTA & HTT | 89.17 | 69.78 | 3.01 |
| F2S w/ HTT | 89.84 | 66.32 | 2.86 |
| F2S w/ WTA | 92.32 | 65.43 | 2.83 |
| F2S (Ours) | 92.89 | 63.68 | 2.75 |

## Limitations

The evaluation is restricted to controlled audio classification and EEG emotion recognition datasets, leaving open questions regarding robustness under varying signal-to-noise ratios in wild environments. Furthermore, while the model is hardware-friendly, real-world deployment on asynchronous neuromorphic sensors (like event-based microphones) requires further pipeline integration.

## Why read this

Researchers and engineers working on low-power speech recognition and brain-computer interfaces should read this paper to learn how to design fully event-driven, hardware-friendly early-exit SNNs without non-spiking softmax thresholds.

## Code

- https://github.com/PatrickZLin/F2S

## Applications

Real-time keyword spotting on edge devices, brain-computer interface (BCI) decoding, and ultra-low-power continuous streaming time-series classification.

## Institutions / 機構

Chinese University of Hong Kong, National University of Singapore, Harbin Institute of Technology, Tsinghua University

**Funding / 經費:** Program for Guangdong Introducing Innovative and Entrepreneurial Teams, Deutsche Forschungsgemeinschaft, National Natural Science Foundation of China, Shenzhen Stability Science Program, Shenzhen Key Lab of Multi-Modal Cognitive Computing, Guangdong Provincial Key Laboratory of Big Data Computing

## Related

- (link related pages by id as the wiki grows)
