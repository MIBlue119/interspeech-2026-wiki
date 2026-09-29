---
id: kishi26_interspeech
category: speaker
labels: [self-supervised]
institutions: ["Keio University", "University of Tokyo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1172
pdf: https://www.isca-archive.org/interspeech_2026/kishi26_interspeech.pdf
---

# Do speech foundation models perceive speaker similarity as humans do?

*Minoru Kishi, Hayato Yagi, Shinnosuke Takamichi, Yuki Saito*

[PDF](https://www.isca-archive.org/interspeech_2026/kishi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kishi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1172)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates whether internal speaker embeddings from 43 speech foundation models align with human perceptual speaker similarity, finding substantial variance where encoder-based, large-scale supervised models correlate best.

## Key contributions

- Evaluated over 43 speech foundation and general audio models against human perceptual speaker similarity across JVS and VCTK datasets.
- Formulated a rigorous multi-metric comparison framework incorporating pairwise correlation (LCC/SRCC), Frobenius distance of adjacency matrices, and normalized graph Laplacian spectral distance.
- Performed multiple regression analysis showing that encoder-based architectures and large-scale supervision heavily boost peak human-alignment ($R^2 \approx 0.75-0.98$).
- Analyzed the layer-wise degradation of alignment caused by task-specific fine-tuning (e.g., ASR vs speaker verification vs sound generation).

## Problem

While speech foundation models demonstrate strong capabilities in speaker verification and identification, it remains unclear whether their geometric distance metrics genuinely mirror the continuous, high-level cognitive scale at which human listeners judge speaker similarity. Prior probing studies identify layer-specific behaviors for pitch, gender, and acoustics, but fail to tie internal representations directly to perceptual graphs. Closing this gap is critical to determining whether human-like perceptual functions can emerge purely from data-driven foundation models and guides how to architect perceptually grounded representations.

## Method

The paper maps speech foundation models and human perceptual ratings into weighted undirected graphs $G = (S, E, W)$, where nodes represent distinct speakers and edge weights represent similarity scores. For models, an utterance $x_i$ is fed into a specific Transformer layer to extract frame-level hidden states $f(x_i)$, which are averaged across all frames and 10 utterances per speaker to yield the speaker embedding vector $e_i$. The model similarity score $c_{i,j}^{(	ext{model})}$ is computed as the cosine similarity between $e_i$ and $e_j$. Evaluated models are categorized into 6 distinct buckets: supervised ASR (Parakeet up to 1.1b, Whisper), supervised TTS (Qwen3-TTS, SpeechT5, SpeechGPT, VALL-E X), supervised TTA (AudioGen), audio classification (AST), speech SSL (HuBERT, wav2vec 2.0, WavLM), and audio SSL (ATST-Frame).

To quantify correspondence, three metrics are deployed: Pairwise similarity correlation via Pearson (LCC) and Spearman (SRCC) correlation coefficients on deduplicated edge weights; Frobenius distance comparing element-wise discrepancies of adjacency matrices $A^{(	ext{human})}$ and $A^{(	ext{model})}$; and Spectral distance measuring the $\ell_2$ distance between the $k=10$ smallest nonzero eigenvalues of the normalized graph Laplacian. A multiple regression model is then constructed using configuration variables—decoder usage (is_dec), multilingual training (is_lang), self-supervised vs supervised (is_ssl), log training hours (hours), and log parameter count (params)—against the response variables max metric value across layers (layer_max) and the linear regression slope across normalized layers (layer_slope).

## Experimental setup

Evaluated on the JVS dataset (49 males, 51 females) and the VCTK dataset (52 females, male scores omitted), both providing human perceptual similarity scores normalized to [0, 1]. Compared 43 open-source models spanning supervised ASR, TTS, TTA, audio classification, and speech/audio SSL paradigms. Metrics include LCC, SRCC, negative Frobenius norm, and negative spectral distance. Speaker embeddings were uniformly extracted using 10 utterances per speaker and z-score normalized.

## Results

Multiple regression analysis reveals that decoder architectures significantly degrade peak human alignment across three metrics (is_dec coefficient for LCC layer_max is -0.77, p < 0.001), showing that encoder-based architectures foster more human-like speaker representations. Large-scale supervised models achieve better alignment than their SSL counterparts (is_ssl coefficient for LCC layer_max is -0.14, p = 0.020). Parameter scale yields a negative effect on peak alignment but a positive effect on layer-wise slope, indicating that larger models produce a flatter score distribution across layers. Meanwhile, ASR fine-tuning (e.g., hubert-large-ls960-ft, wav2vec2-large-960h) sharply degrades alignment in deeper layers by suppressing speaker variations in favor of linguistic content, whereas speaker-specialized SSL models like wavlm-ssl_sv preserve a much flatter, stable similarity structure across all layers.

| System / Model Category | LCC (Peak) | SRCC (Peak) | Neg. Frobenius | Neg. Spectral Dist |
|---|---|---|---|---|
| WavLM-base+ (SSL) | ~0.40 | ~0.40 | High | Moderate |
| HuBERT-large-ls960-ft (ASR) | ~0.25 | ~0.25 | Moderate | Low |
| Qwen3-TTS-1.7b (Decoder/TTS) | <0.10 | <0.10 | Low | Low |
| AudioGen-medium (TTA) | ~0.35 | ~0.35 | Moderate | Moderate |

## Limitations

The evaluation relies solely on intra-gender speaker pairs from two datasets (JVS and VCTK), leaving cross-gender perceptual alignments unverified. The analysis is restricted to available open-source models, which inherently bundle confounding factors in pre-training pipelines. Furthermore, the regression model accounts for only ~20% of the variance in layer-wise score progression (layer_slope $R^2 \approx 0.20$), indicating that internal architectural routing and fine-tuning dynamics remain insufficiently captured by high-level configuration parameters alone.

## Why read this

Speech and ML engineers building downstream speaker recognition, voice conversion, or generative audio models should read this to understand how architectural choices and fine-tuning targets distort or preserve human perceptual geometry in internal representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving perceptual fidelity in text-to-speech, voice conversion, and speaker modeling pipelines by aligning latent embedding distances with human cognitive similarity judgments.

## Institutions / 機構

Keio University, University of Tokyo

**Funding / 經費:** JST FOREST, JSPS KAKENHI, Moonshot R&D

## Related

- (link related pages by id as the wiki grows)
