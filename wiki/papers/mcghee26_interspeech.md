---
id: mcghee26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-694
pdf: https://www.isca-archive.org/interspeech_2026/mcghee26_interspeech.pdf
---

# Feature Design and Generative Modelling in Deep Articulatory Synthesis

*Charles McGhee, Mark J.F. Gales, Kate Knill*

[PDF](https://www.isca-archive.org/interspeech_2026/mcghee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mcghee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-694)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — This paper investigates how auxiliary feature inputs and generative modeling approaches impact deep articulatory speech synthesis, revealing that source and speaker features can distort phonetic content. Using a Flow Matching (DiT) generative setup alongside cascaded Conformer models, the authors demonstrate trade-offs between phonetic consistency and perceptual speech quality.

## Key contributions

- Evaluates the interaction between core articulatory feature sets (ArtVVN) and additional source (F0, STE) or speaker embeddings in deep articulatory synthesis.
- Proposes a cascaded generative architecture utilizing a Diffusion Transformer (DiT) trained with Optimal Transport Conditional Flow Matching (CFM).
- Performs feature substitution and minimal pair analysis to demonstrate how auxiliary source/speaker features induce phonetic substitution errors.
- Compares cascaded models against direct vocoder architectures (SPARC) across clean and noisy evaluation sets (LibriTTS-R, VCTK).

## Problem

Articulatory synthesis is widely used to evaluate acoustic-to-articulatory inversion models, but faithfully resynthesizing speech typically requires adding back information lost during inversion via auxiliary features or generative modeling. Prior works report error rates without analyzing how these extra feature inputs interact with core articulatory representations or whether the output genuinely reflects the inverted articulation. Without careful design, the auxiliary features (such as F0, short-time energy, or speaker embeddings) can override the phonetic constraints of the articulation, confounding evaluation and invalidating claims about the underlying speech production.

## Method

The system uses a 14-dimensional articulatory representation (ArtVVN: 6 fleshpoint 2D points for tongue, lips, and jaw, plus a 2D voicing/nasality feature). For the non-generative baseline, an 8-layer Conformer backbone with a hidden dimension of 256 is used, alongside a larger variant with 12 layers and 768 dimensions. For the generative model, a Diffusion Transformer (DiT) derived from F5-TTS is conditioned on articulatory features, time steps, and speaker embeddings, trained using Optimal Transport Conditional Flow Matching with a linear Gaussian conditional probability path and a minimum variance sigma_min = 1e-4.

Training uses the AdamW optimizer with a learning rate of 1e-4. The base models are trained on the train-clean-100 subset of LibriTTS-R for 25 epochs (non-generative) or 100 epochs (flow-matching), while larger models incorporate train-clean-360. At inference, a first-order Euler solver is applied with exploration of the Number of Function Evaluations (NFEs). The intermediate predicted mel-spectrogram is subsequently passed to a pretrained, frozen BigVGAN Base vocoder to synthesize the final waveform.

## Experimental setup

Evaluated on the test-clean subset of LibriTTS-R, clean and noisy subsets from VCTK, and a minimal pair dataset. Baselines include the SPARC vocoder system and Conformer-based non-generative synthesisers. Metrics include Phone Error Rate (PER), Mean Squared Error (MSE) on reconstructed articulation, cosine similarity and speaker verification accuracy (ECAPA-TDNN) for speaker fidelity, and UTMOS for perceptual speech quality.

## Results

On LibriTTS-R test-clean, the base cascaded model with SPARC features achieves a PER of 7.6 and MSE of 0.009, compared to the SPARC vocoder baseline (8.8 PER, 0.025 MSE). In noisy VCTK conditions, models using explicit source features (F0, STE) experience a much larger jump in PER and MSE compared to models relying solely on articulatory inputs or larger network capacity (e.g., the Large +Spk model achieves 13.5 PER on noisy VCTK versus 29.1 for Base SPARC). Feature substitution experiments show that swapping source features heavily damages consonant accuracy (dropping from 84.9% to 75.2%), while speaker embedding swaps impact vowels more, introducing severe substitution errors such as confusing /E/ with /u/.

| System / Condition | PER (LS) | MSE (LS) | Cos Sim (LS) | UTMOS (LS) |
|---|---|---|---|---|
| Vocoder (SPARC) | 8.8 | 0.025 | 0.95 | 4.12 |
| Base (SPARC) | 7.6 | 0.009 | 0.95 | 3.69 |
| Base (ArtVVN) | 8.2 | 0.008 | 0.78 | 3.09 |
| Base (+Src +Spk) | 7.3 | 0.008 | 0.69 | 3.74 |
| Large (+Spk) | 7.4 | 0.007 | 0.76 | 3.45 |
| FM (ArtVVN) | 8.9 | 0.009 | 0.81 | 2.99 |

## Limitations

The evaluation relies heavily on automatic tools (ASR phone recognizers, UTMOS, and speaker verification networks) rather than human listening tests. The base models are constrained to a 100-hour training set (LibriTTS-R train-clean-100), limiting generalizability and zero-shot speaker transfer. Furthermore, the findings are currently restricted to English speech corpora and specific feature extractions.

## Why read this

Speech and ML engineers building articulatory-to-speech inversion or synthesis systems should read this to understand the hidden pitfalls of auxiliary feature injection. It provides crucial insights into how source and speaker conditioning can inadvertently hijack phonetic content, offering guidance on balancing generative flexibility with phonetic faithfulness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Evaluating acoustic-to-articulatory inversion models, pronunciation training systems, speech therapy tools, and explainable speech synthesis.

## Institutions / 機構

University of Cambridge

## Related

- (link related pages by id as the wiki grows)
