---
id: variani26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2487
pdf: https://www.isca-archive.org/interspeech_2026/variani26_interspeech.pdf
---

# Representational Instability in Decoupled Audio Encoders

[PDF](https://www.isca-archive.org/interspeech_2026/variani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/variani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2487)

**TL;DR** — This paper introduces the Stability-Rate-Distortion (SRD) framework and the Continuous Edit Distance (CED) metric to evaluate how acoustic nuisances cause catastrophic representational instability and token shattering in modern neural audio codecs and semantic encoders.

## Problem

Traditional neural audio codecs focus strictly on the Rate-Distortion trade-off to ensure waveform reconstruction, treating latent representations as transient intermediate states. However, the rise of decoupled architectures and speech LLMs means these tokens must serve as permanent, invariant representations for machine consumption. Optimizing solely for signal reconstruction forces encoders to track acoustic nuisances, making them highly vulnerable to perturbations and causing downstream representational collapse.

## Method

The authors conceptualize a three-dimensional SRD framework that treats representational stability as a core evaluation axis, trading off against rate and distortion. To quantify geometric drift across manifolds and codebooks, they propose the Continuous Edit Distance (CED), which projects latent frames onto a unit hypersphere and computes a geometry-aware edit distance robust to temporal shifts, alongside the Unit Edit Distance (UED) for discrete tokens. They analyze state-of-the-art architectures including EnCodec, SoundStream, and Whisper across 26 dialects to measure how vector quantization and linguistic priors affect stability.

## Results

Evaluating state-of-the-art encoders reveals a 'Quantization Penalty' where continuous latents resist minor noise, but vector quantization shatters them into entirely disparate discrete sequences. Furthermore, evaluating 26 dialects exposes a cross-lingual 'Language Tax' where semantic encoders like Whisper maintain stability for high-resource languages but collapse on low-resource dialects due to weak linguistic priors. High waveform fidelity is shown to be empirically at odds with representational stability in low-bitrate regimes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building speech Large Language Models, speech-to-speech translators, and decoupled audio pipelines can use these findings and metrics to design robust, noise-resilient tokenizers.

## Related

- (link related pages by id as the wiki grows)
