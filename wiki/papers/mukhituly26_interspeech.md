---
id: mukhituly26_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2797
pdf: https://www.isca-archive.org/interspeech_2026/mukhituly26_interspeech.pdf
---

# A Unified Safety Subspace Exists in Speech Language Models

*Nurdaulet Mukhituly, Muhammad Cendekia Airlangga, Rifo Ahmad Genadi, Nhi Hoai Doan, Amirbek Djanibekov, Samuel Munachiso Nwadike, Zangir Iklassov, Kentaro Inui*

[PDF](https://www.isca-archive.org/interspeech_2026/mukhituly26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mukhituly26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2797)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — Speech Language Models contain a shared, low-dimensional safety subspace across both text and audio modalities where refusal and jailbreak compliance are neatly separated. Applying a single linear steering vector derived from this subspace reliably flips model behavior between refusal and compliance without any retraining, reducing diverse jailbreak success rates from up to 98% down to under 7%.

## Key contributions

- Uncovers and visualizes a low-dimensional safety geometry in transformer residual streams using PCA, proving that benign, harmful, and jailbreak queries form distinct, separable clusters in SLMs.
- Derives full-dimensional 'Audio' and 'Text' steering vectors via PCA back-projection of the difference-of-means vectors, linking Fisher's LDA framework to multi-modal safety boundary estimation.
- Proves theoretical and empirical cross-modal and cross-attack transferability, demonstrating that a steering direction extracted from an audio attack (AdvWave) suppresses text jailbreaks (AutoDAN, BEAST), and vice versa.
- Achieves massive empirical robustness improvements on Qwen2-Audio and GLM-4-Voice across five attack families without requiring model fine-tuning or adversarial training.

## Problem

Integrating speech inputs into large language models creates multimodal attack surfaces, exposing them to both text-based adversarial jailbreaks (e.g., AutoDAN, BEAST) and audio-specific attacks exploiting paralinguistic cues, hidden waveforms, or optimization perturbations (e.g., AdvWave, AMSE, CAVA). Prior defenses typically treat safety as an output-level metric to be optimized via input filtering or adversarial training, ignoring whether audio jailbreaks exploit modality-specific failures or bypass the same internal mechanisms through different input channels. Mechanistic interpretability studies have identified compact refusal structures in text-only models, but it remains entirely unknown whether these safety representations generalize when audio inputs introduce transcript-preserving perturbations, non-linguistic signals, and cross-modal discrepancies.

## Method

The study defines the residual-stream activation $h_m^{l,i}$ of the last token at a chosen middle layer $l^*$ (Layer 15 for Qwen2-Audio, Layer 17 for GLM-4-Voice) across modalities $m \in \{\text{text}, \text{audio}\}$ and query classes $y \in \{\text{benign}, \text{harmful}, \text{jailbreak\}$. Under Fisher's Linear Discriminant Analysis (LDA) and assuming isotropic variance, the difference-of-means (DoM) vector points from the benign cluster to the harmful cluster, defining the optimal linear refusal boundary. Because successful jailbreak perturbations shift harmful activations toward the benign side without reaching them, jailbreak activations cluster near benign inputs. The authors project harmful and jailbreak activations into a 2D subspace using Principal Component Analysis (PCA) to find the compliance-shift vector pointing from the refusal cluster to the compliance cluster.

This 2D vector is back-projected into the full $d$-dimensional residual stream space using the PCA projection matrix $W_m^l$, yielding full-dimensional Audio Vectors ($m=\text{audio}$) and Text Vectors ($m=\text{text}$). Inference-time steering is performed by injecting a scaled, normalized vector into the last-token residual stream: $h^{l*} \leftarrow h^{l*} + \alpha v_{m,\text{ori}}^{l*}$, where scalar $\alpha$ controls magnitude and direction. For negative steering (restoring refusal on jailbreaks), $\alpha < 0$ increases the refusal logit; for positive steering (inducing compliance on harmful prompts), $\alpha > 0$ decreases it. The key architectural insight is that multi-modal training maps semantically equivalent audio and text tokens to nearby residual representations, making the steering vectors approximately parallel and cross-modally interchangeable.

Experiments evaluate Qwen2-Audio and GLM-4-Voice. Hyperparameter sweeping for intervention magnitude $\alpha$ uses ranges $\alpha \in [10, 20]$ for Qwen2-Audio and $\alpha \in \{1, 2\}$ for GLM-4-Voice, directly reflecting the tighter activation clustering observed in GLM-4-Voice's PCA space.

## Experimental setup

Evaluated on two open-source speech language models: Qwen2-Audio and GLM-4-Voice. Benign data uses 200 Alpaca text instructions and 200 AirBench audio samples. Harmful data uses AdvBench text prompts alongside synthesized audio versions. Jailbreak evaluations employ three audio attacks (AdvWave, AMSE, CAVA from JALMBench) and two text attacks (AutoDAN, BEAST). Attack Success Rate (ASR) is measured using GPT-5 as an LLM-as-a-judge protocol to classify outputs as harmful or safe.

## Results

Applying negative steering vectors to jailbreak inputs drops the Attack Success Rate below 7% across all five attacks on both evaluated models. For instance, AdvWave ASR drops from 97.93% to 0.52% on Qwen2-Audio, and from 84.97% to 2.59% on GLM-4-Voice. Similarly, text-based AutoDAN drops from 72.69% to 2.82% (Qwen2-Audio) and 81.48% to 3.24% (GLM-4-Voice).

Conversely, applying positive steering vectors to refused harmful inputs forces compliance, driving ASR up from under 6% to between 56% and 90% across modalities and models. Randomly oriented vectors of matched norm fail to produce these behavioral shifts, demonstrating that the subspace geometry is directional rather than an artifact of activation perturbation magnitude. GLM-4-Voice exhibits tighter overlap between harmful audio and text clusters in PCA space than Qwen2-Audio, though both demonstrate effective cross-modal vector transfer.

| System / Condition | AdvWave (Audio) | AMSE (Audio) | CAVA (Audio) | AutoDAN (Text) | BEAST (Text) |
|---|---|---|---|---|---|
| Qwen2-Audio (Original) | 97.93% | 53.49% | 65.50% | 72.69% | 81.94% |
| Qwen2-Audio (+Audio Vector) | 0.52% | 2.91% | 1.49% | 2.82% | 0.92% |
| GLM-4-Voice (Original) | 84.97% | 71.11% | 44.28% | 81.48% | 79.63% |
| GLM-4-Voice (+Text Vector) | 1.04% | 5.52% | 1.00% | 0.46% | 1.39% |

## Limitations

The evaluation is restricted to only two open-source SLM architectures (Qwen2-Audio and GLM-4-Voice) and a limited set of five specific adversarial attack algorithms. The approach relies on identifying a single middle layer where safety geometry is cleanly segregated, which may require manual tuning or layer-probing for larger or proprietary models. Furthermore, intervention scaling factor $\alpha$ is sensitive and model-dependent, requiring careful calibration to prevent degradation of benign utility or generation quality.

## Why read this

Speech and ML safety researchers should read this paper to understand how mechanistic interpretability concepts from text LLMs extend to multimodal speech models. It provides a blueprint for building lightweight, training-free, and modality-agnostic defense mechanisms via single-layer activation steering.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time, zero-shot safety alignment and jailbreak mitigation filters for commercial speech-to-text and spoken conversational language models deployed on-device or in the cloud.

## Institutions / 機構

MBZUAI, Tohoku University, RIKEN

## Related

- (link related pages by id as the wiki grows)
