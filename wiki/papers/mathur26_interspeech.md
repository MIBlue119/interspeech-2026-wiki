---
id: mathur26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2805
pdf: https://www.isca-archive.org/interspeech_2026/mathur26_interspeech.pdf
---

# How Do Instructions Shape Speech? Cross-Attention Attribution for Style-Captioned Text-to-Speech

[PDF](https://www.isca-archive.org/interspeech_2026/mathur26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mathur26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2805)

**TL;DR** — This paper adapts diffusion-based cross-attention attribution (DAAM) to text-to-speech models, revealing that natural language style captions act as global temporal modulators that follow a coarse-to-fine generation schedule.

## Problem

Style-captioned text-to-speech systems use natural language to control voice properties, but the internal mechanisms of how individual caption words influence synthesized acoustic output remain completely unknown. Understanding this is vital for diagnosing failures, improving controllability, and moving beyond black-box generation. Existing interpretability tools like DAAM were built exclusively for text-to-image models and cannot directly handle speech's temporal structure or the interplay between global style and local phonemic content.

## Method

The authors adapt Diffusion Attentive Attribution Maps (DAAM) to CapSpeech, a flow-matching text-to-speech model with a Diffusion Transformer (DiT) backbone containing 25 transformer layers, 24 ODE generation steps, a T5 caption encoder, a CLAP style tag encoder, and a HiFi-GAN vocoder. Forward hooks intercept multi-head cross-attention matrices across all layers and ODE steps during generation, averaging across heads and aggregating temporal heatmaps for each prompt token. Tokens are categorized into style adjectives (30 types), content nouns (20 types), and function words, and evaluated using temporal variance, peak-to-mean ratio, entropy, acoustic correlations with F0 and energy, and layer/step importance ratios across 3,500+ successful generations.

## Results

Evaluating 3,520 successful generations out of 3,600 combinations across 54,880 token instances and over 2.1 million attention matrices, style tokens exhibit significantly lower temporal variance (σ̄² = 2.1 × 10^-5) than content tokens (7.0 × 10^-5, p < 10^-43, d = -1.16) and function tokens (19.2 × 10^-5, p < 10^-44), confirming global conditioning. Style token attention shows semantically coherent acoustic grounding with F0 (r̄ = +0.21) and energy (r̄ = +0.28), with specific words like 'loud' correlating strongly with energy (r = +0.64) and 'nasal' with energy (r = +0.67). Layer and step dynamics show that style importance peaks early in generation (ODE step 0, decaying 5.2× by step 23) and deepens through transformer layers (peaking at layer 17), while attention entropy minimizes at layer 18 to coincide with maximal network selectivity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing or auditing expressive, natural-language-controlled text-to-speech systems for failure diagnosis, model debugging, and enhanced controllability.

## Limitations

The study is restricted to a single text-to-speech architecture (CapSpeech) and synthetic prompts constructed from a limited set of 30 style words.

## Related

- (link related pages by id as the wiki grows)
