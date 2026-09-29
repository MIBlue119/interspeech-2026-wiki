---
id: quamer26_interspeech
category: deepfake-security
labels: [self-supervised]
institutions: ["Texas A&M University"]
code: https://anonymousis23.github.io/demos/pca-voice-editing/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2741
pdf: https://www.isca-archive.org/interspeech_2026/quamer26_interspeech.pdf
---

# Privacy and quality trade-off in real-time speaker anonymization via editing of age and sex attributes

*Waris Quamer, Ricardo Gutierrez-Osuna*

[PDF](https://www.isca-archive.org/interspeech_2026/quamer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/quamer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2741)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — This paper presents a systematic analysis of the privacy-quality trade-off in real-time speaker anonymization by performing parametric attribute editing of age and sex on speaker embeddings. The authors discover an optimal anonymization sweet spot at roughly 0.25 standard deviations of modification, where speaker identity is effectively suppressed while speech quality remains high.

## Key contributions

- A quantitative regression framework that isolates and evaluates per-attribute contributions (age and sex/femininity) to speaker privacy and speech quality.
- Empirical demonstration that speaker privacy (measured via cosine similarity) degrades much faster than speech quality (DNS-MOS) as attribute shift magnitude increases.
- Perceptual listening test validation (N=20) showing that moderate attribute modifications achieve an 83% speaker differentiation rate while limiting naturalness loss.
- Actionable hyperparameter guidelines demonstrating that sex-related attribute editing provides stronger identity suppression than age, and that non-uniform directions work best depending on source demographics.

## Problem

Prior speaker anonymization research—including DSP perturbations, adversarial training, voice conversion, and the VoicePrivacy Challenge benchmarks—typically treats anonymization as a monolithic, black-box transformation. This leaves a critical gap: it remains unclear how much to modify specific vocal attributes to reach an optimal operating point. Treating anonymization holistically prevents systematic hyperparameter tuning and often leads to unnecessary degradation in speech naturalness and intelligibility.

## Method

The streaming speech synthesis pipeline comprises four core modules: a content encoder predicting HuBERT-Kmeans discrete units via causal CNNs, a speaker encoder concatenating X-vector and ECAPA-TDNN representations, a speaker/variance adapter injecting identity, pitch, and energy via AdaIN and FiLM, and a causal HiFiGAN-based decoder trained with adversarial and multi-resolution STFT losses.

To perform attribute editing, the authors apply Principal Component Analysis (PCA) to the speaker embedding space and compute Pearson correlation coefficients between principal components and target attributes (age and femininity probability). A composite editing direction is constructed via $V_{\text{attribute}} = \sum w_i \text{PC}_i$ where $w_i = \rho(\text{PC}_i, \text{attribute})$. The edited embedding is calculated as $Z' = Z + \lambda_{\text{age}} V_{\text{age}} + \lambda_{\text{femininity}} V_{\text{femininity}}$. Positive $\lambda$ increases the attribute, while negative $\lambda$ decreases it.

PCA was chosen over complex disentanglement methods due to its ultra-low computational overhead, satisfying real-time streaming constraints (latency under 350 ms). Inference involves extracting source content units and speaker embedding, applying the scalar shift $\lambda$ along the PCA directions, and resynthesizing via the HiFiGAN decoder.

## Experimental setup

The synthesis model and PCA decomposition were trained on the LibriTTS corpus, utilizing held-out dev and test splits. Training was conducted using two NVIDIA RTX 3090 GPUs following guidelines from prior streaming synthesis work. Because LibriTTS lacks native demographic labels, continuous age and femininity probability labels were generated using a pre-trained wav2vec2-based age/gender predictor, with age normalized to [0, 1]. Evaluation metrics include speaker embedding cosine similarity (identity proxy), DNS-MOS (speech quality), cosine distance, and perceptual listening tests administered via Amazon Mechanical Turk with 20 listeners.

## Results

Linear regression reveals that both age ($\beta_1 = -0.309, p < 0.001$) and femininity ($\beta_2 = -0.459, p < 0.001$) modifications significantly reduce speaker cosine similarity, with femininity having a stronger impact. For speech quality (DNS-MOS), both age ($\beta_1 = -0.55$) and femininity ($\beta_2 = -0.64$) cause degradation, but a positive interaction term ($\beta_3 = 0.40$) indicates that simultaneous consistent modifications partially compensate for individual distortions. Because cosine similarity drops far more steeply than DNS-MOS, an optimal "sweet spot" emerges at $|\lambda| \approx 0.25$ standard deviations.

In perceptual evaluations, moderate modifications ($|\lambda| = 0.25$) fooled listeners into perceiving a different speaker in 83% of trials while maintaining an acceptable quality score (2.67 for age-only, 2.53 for femininity-only, compared to 3.1 for unedited baseline). Extreme modifications ($|\lambda| = 0.5$) increased the anonymization rate to 94% but severely degraded naturalness (dropping to 2.0). Femininity-only modifications yielded higher anonymization efficacy (98% differentiation) than age-only modifications (70%).

| Condition / System | Modification Magnitude ($\lambda$) | Cosine Similarity | DNS-MOS | Perceptual Anonymity Rate | Quality Score |
|---|---|---|---|---|---|
| Baseline (Unedited) | $0.0$ | $1.0$ | — | — | $3.10$ |
| Moderate Age Modification | $0.25$ std | — | — | $70\%$ | $2.67$ |
| Moderate Femininity Modification | $0.25$ std | — | — | $98\%$ | $2.53$ |
| Moderate Joint Modification (Sweet Spot) | $0.25$ std | Low | High | $83\%$ | $2.67$ |
| Extreme Joint Modification | $0.50$ std | Very Low | Lower | $94\%$ | $2.00$ |

## Limitations

The study is currently limited to English speech data from the LibriTTS corpus, restricting immediate cross-lingual generalizations. The PCA-based attribute editing approach relies on linear approximations, which imperfectly disentangles deeply correlated features like age, sex, and fundamental frequency ($F_0$). Furthermore, automated attribute pseudo-labels derived from pretrained wav2vec2 models introduce potential label noise.

## Why read this

Speech and ML engineers building real-time voice conversion or privacy-preserving pipelines should read this to understand how to tune attribute modification strengths without destroying naturalness. It replaces trial-and-error hyperparametric searches with principled, geometry-based insights into speaker embedding spaces.

## Code

- https://anonymousis23.github.io/demos/pca-voice-editing/

## Applications

Real-time voice-based applications, secure conversational AI, streaming voice anonymization for privacy protection, and telecommunication scrambling.

## Institutions / 機構

Texas A&M University

**Funding / 經費:** Intelligence Advanced Research Projects Activity, Department of Interior/Interior Business Center

## Related

- [DiffAnon: Diffusion-based Prosody Control for Voice Anonymization](ulgen26b_interspeech.md) — same problem · relatedness 2.6/3
- [Imperceptible Voiceprint Protection via Human-Machine Perception Discrepancy Feature Disentanglement](xue26_interspeech.md) — same problem · relatedness 2.5/3
- [Controlled Generation of Synthetic Speaker Vectors for Voice Anonymization](kolos26_interspeech.md) — same problem · relatedness 2.5/3
- [DP-VOXLET: Provable Speaker Anonymization for Disentangled Speech Representations](ngong26_interspeech.md) — same problem · relatedness 2.5/3
- [VerAno: Speaker Anonymization via Self-Supervised Tokenization and Conditional Flow Matching](le26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
