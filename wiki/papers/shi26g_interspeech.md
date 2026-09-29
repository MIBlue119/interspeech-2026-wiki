---
id: shi26g_interspeech
category: speech-coding
labels: [self-supervised]
institutions: ["University of Southern California", "Dolby Laboratories"]
code: https://github.com/Alexuan/codec_probing_release
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3135
pdf: https://www.isca-archive.org/interspeech_2026/shi26g_interspeech.pdf
---

# Speech Codec Probing from Semantic and Phonetic Perspectives

*Xuan Shi, Chang Zeng, Tiantian Feng, Shih-Heng Wang, Jianbo Ma, Shrikanth Narayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/shi26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3135)

**Category:** `speech-coding` · **Labels:** `self-supervised`

**TL;DR** — A systematic probing study of four representative speech codecs (EnCodec, DAC, MIMI, MIMO) reveals that current speech tokenizers predominantly encode phonetic and articulatory information rather than lexical-semantic meaning, exhibiting very weak cross-modal alignment with text. This challenges the common practice of calling SSL-distilled codec layers 'semantic tokens' and highlights the need for explicit semantic objectives in speech MLLMs.

## Key contributions

- Extended proxy-task probing using WordNet synonyms and CMU-Levenshtein near-homophones to neural codecs, demonstrating that feature distance patterns reflect phonetic rather than lexical-semantic clustering.
- Conducted physiological articulatory probing using Vocal Tract Distance (VTD) features extracted from real-time MRI (rt-MRI) 75-Speaker datasets, proving that codec latent spaces strongly correlate with actual speech production mechanisms.
- Evaluated cross-modal semantic alignment between speech codecs (MIMI, MIMO) and text token spaces using Centered Kernel Alignment (CKA), revealing near-chance structural similarity.
- Uncovered that distilling WavLM features into MIMI's first codebook layer injects robust phonetic priors rather than true lexical semantics.

## Problem

Modern multimodal large language models (MLLMs) like GPT-4o, Qwen2.5-Omni, and Moshi rely on discrete speech tokenizers to unify speech and text into a shared autoregressive modeling framework. However, the field frequently mislabels self-supervised learning (SSL) or distilled speech representations as 'semantic,' even though prior work shows SSL features group near-homophones ('accept'/'except') closer than true synonyms ('big'/'large'). This linguistic-semantic versus phonetic mismatch creates an unquantified bottleneck that likely drives the performance drops observed in speech-understanding MLLMs. The authors address this by systematically probing how four major neural audio codecs encode semantic, phonetic, and articulatory properties across their RVQ codebook layers.

## Method

The study evaluates four diverse speech tokenizers: EnCodec (SEANet convolutional encoder-decoder with RVQ, 12 kbps), DAC (RVQ with factorized/L2-normalized codebooks, snake activations, and quantizer dropout, 24 kbps), MIMI (Moshi's codec with first-layer WavLM distillation and acoustic residual RVQ, 4.4 kbps), and MIMO (Transformer codec jointly trained with an LLM for reconstruction and ASR, 1.55 kbps). All models operate on 24 kHz audio input.

Three complementary probing methodologies are deployed. First, semantic-phonetic proxy analysis constructs word pairs from LibriSpeech using Montreal Forced Aligner timestamps, extracting WordNet cognitive synonyms and CMU/Levenshtein-distance (<0.4 normalized distance) near-homophones. Euclidean distances across accumulated codebook layers evaluate feature distance trends against random baselines. Second, articulatory probing uses mid-sagittal rt-MRI sequences from the 75-Speaker corpus and its Annot-16 subset (16 expert-annotated speakers) to extract 120-dimensional Vocal Tract Distance (VTD) features at 83 Hz. Projection Weighted Canonical Correlation Analysis (PWCCA) measures the correlation between VTD sequences and upsampled codec latent representations. Third, cross-modal semantic alignment is quantified via Centered Kernel Alignment (CKA) between text-space and speech-space decodings on LibriSpeech word segments, utilizing a random-permutation baseline to correct for intrinsic geometry artifacts.

Key design choices include examining accumulated decoded features (summing current and preceding residual codebook layers) to track information accumulation depth, and performing separate ablation probing on MIMI's first WavLM-distilled layer versus its subsequent acoustic RVQ layers to isolate the exact source of phonetic bias.

## Experimental setup

Experiments utilize the LibriSpeech dataset (word segments extracted via MFA timestamps), WordNet for synonyms, CMU Pronouncing Dictionary for phonemes, and the 75-Speaker / 75-Speaker Annot-16 rt-MRI corpora. Codecs evaluated are EnCodec (24k Hz input, 12k bps), DAC (24k Hz input, 24k bps), MIMI (24k Hz input, 4.4k bps), and MIMO (24k Hz input, 1.55k bps). Evaluation metrics include Euclidean distance ratios against random baselines, PWCCA for VTD-codec correlation (120 gridlines, 83 Hz), and Centered Kernel Alignment (CKA) with random-permutation difference deltas.

## Results

Across functional probing, EnCodec exhibits erratic layer fluctuations while DAC shows a gradual fading of semantic distance curves toward the random baseline as codebook depth increases. Conversely, MIMI and MIMO demonstrate clear accumulation of phonetic and speaker information as codebook indices grow. In articulatory probing, EnCodec and DAC show decreasing VTD correlation curves (fading phonetic information), whereas MIMI and MIMO show strong upward phonetic correlation trends, confirming that phonetic dominance stems from real physiological vocal tract configurations rather than acoustic artifacts. MIMI's separate layer analysis reveals that its WavLM-distilled first layer alone injects a massive phonetic correlation peak.

For cross-modal alignment, MIMI and MIMO yield raw CKA scores of 0.329 and 0.122 respectively against text representations. Baseline-corrected gains over random permutations are marginal (delta = +0.087 for MIMI; delta = +0.054 for MIMO), proving that current speech tokens lack true lexical-semantic structure.

| Speech Tokenizer | Input SR (Hz) | Output SR (bps) | CKA vs Text | Random-Corr CKA Delta ($\Delta$) |
|---|---|---|---|---|
| EnCodec | 24,000 | 12,000 | N/A | N/A |
| DAC | 24,000 | 24,000 | N/A | N/A |
| MIMI | 24,000 | 4,400 | 0.329 | +0.087 |
| MIMO | 24,000 | 1,550 | 0.122 | +0.054 |

## Limitations

The linguistic-semantic evaluations are restricted to English due to reliance on WordNet and the CMU Pronouncing Dictionary, though the authors note prior work demonstrates similar cross-lingual trends. The rt-MRI articulatory dataset (Annot-16) is limited to 16 speakers, potentially constraining generalizability across diverse accents and speaking styles. The study evaluates only four discrete architectures, omitting emerging continuous-latent speech LLM interfaces.

## Why read this

Speech and MLLM researchers should read this paper to dispel the common misconception that SSL-distilled or neural codec tokens carry genuine lexical-semantic structure, providing a rigorous empirical roadmap for designing future tokenizers with explicit text-semantic objectives.

## Code

- https://github.com/Alexuan/codec_probing_release

## Applications

Guiding the architectural design of next-generation speech tokenizers and multimodal large language models for conversational AI, speech-to-speech translation, and spoken language understanding.

## Institutions / 機構

University of Southern California, Dolby Laboratories

**Funding / 經費:** National Science Foundation, IARPA ARTS, Dolby

## Related

- [Discrete vs. Continuous: A Comprehensive Study of Unified Audio Understanding in LALMs](peng26h_interspeech.md) — same problem · relatedness 2.4/3
- [OmniCodec: Low Frame Rate Universal Audio Codec with Semantic–Acoustic Disentanglement](hu26b_interspeech.md) — same problem · relatedness 2.3/3
- [HybridCodec: Fast Dual-Stream, Semantically Enhanced Neural Audio Codec](gangwar26_interspeech.md) — same problem · relatedness 2.2/3
- [Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains](gonzalez26b_interspeech.md) — shared technique · relatedness 2.1/3
- [Low-Framerate Speech Tokenization via Two-Stage Latent Patch Modeling](lemerle26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
