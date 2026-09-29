---
id: lahtinen26_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2452
pdf: https://www.isca-archive.org/interspeech_2026/lahtinen26_interspeech.pdf
---

# Looking for Affect in Spontaneous Finnish Speech through Linguistic Interpretability

*Kalle Lahtinen, Liisa Mustanoja, Okko Räsänen*

[PDF](https://www.isca-archive.org/interspeech_2026/lahtinen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lahtinen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2452)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper investigates the relative contributions of text- and audio-based features in predicting perceived emotional valence and arousal in spontaneous Finnish speech, finding that multimodal feature combination substantially improves valence regression while arousal remains primarily driven by acoustics. The best valence model achieves a CCC of 0.428, and the best arousal model reaches 0.688.

## Key contributions

- Comprehensive feature importance analysis using 127 combinations of explicit and implicit text/audio features on the FinnAffect corpus for spontaneous Finnish speech.
- Demonstration that combining text embeddings (ModernBERT, FinnSentiment) with audio embeddings (ExHuBERT) raises valence prediction CCC from 0.266 (text-only) / 0.213 (audio-only) to 0.428.
- Proof that arousal prediction in spontaneous speech is overwhelmingly dominated by acoustic representations (ExHuBERT and eGeMAPS achieving CCC 0.686 alone, vs 0.196 for text-only), with text adding negligible gains.
- Comparison of colloquial versus standardized Finnish transcripts across models, indicating robust performance across text normalization styles.

## Problem

Prior affective speech research mostly focuses on acted data or treats acoustic and text modalities in isolation, leaving their complementary interactions unclear, particularly for under-resourced languages like Finnish. While acoustic properties are widely assumed to govern arousal and linguistic content to govern valence, the precise quantitative interplay between these modalities in spontaneous, in-the-wild dialogues remains unmeasured. This gap hinders the development of robust, culturally-aware computational paralinguistics models that account for both what is said and how it is said.

## Method

The study trains multilayer perceptron (MLP) regression models on 127 different combinations of text and audio feature sets using the FinnAffect corpus. The architecture comprises 3 hidden layers with dimensions defined by min(512, max(128, input_dim / 2)), min(256, h1), and min(128, h2), followed by linear layers, ReLU activations, batch normalization, and a dropout of 0.3. The loss function used is 1 minus the concordance correlation coefficient (CCC). Text features comprise 1024-dim mean-pooled ModernBERT tokens, FinnSentiment sentiment posteriors, a 36-dim concatenated emotional lexicon vector (SELF, FEIL, and noun norm lexicons), and a 106/107-dim Trankit-derived syntactic/morphological feature vector (Lingnorm). Audio features include 1024-dim mean-pooled ExHuBERT embeddings (pretrained without Finnish data) and 88-dim eGeMAPSv02 functionals via OpenSmile. Additionally, the opposing affective dimension (arousal score when predicting valence, and vice versa) is included as an optional 1-dimensional feature to simulate concurrent human evaluation loops. Models are optimized using Adam with a learning rate of 10^-3 for 50 epochs using a 5-fold GroupKFold cross-validation strategy grouped by speaker ID.

The training data originates from the annotated portion of FinnAffect (12,000 samples totaling 13.42 hours), split into a Gold Standard test set of 2,000 samples (828 unique speakers) and a train+validation set of 4,000 samples (3,108 unique speakers). Inference utilizes the best-performing validation checkpoint per fold evaluated on the GS test dataset, comparing colloquial Finnish (CF) transcriptions against GPT-4.1 standardized standard Finnish (SF) transcriptions.

## Experimental setup

Evaluated on the FinnAffect dataset containing 12,000 speech samples (13.42 hours total across 3,936 unique speakers drawn from Lahjoita Puhetta, Helpuhe, and Tampuhe corpora). The primary metric is the Concordance Correlation Coefficient (CCC). Training uses 5-fold cross-validation with PyTorch on institutional high-performance computing resources, running for 50 epochs per model.

## Results

For valence regression, combining ModernBERT text embeddings, ExHuBERT audio embeddings, FinnSentiment posteriors, and arousal scores yields a peak test CCC of 0.428 ± 0.021, vastly outperforming text-only (0.266) and audio-only (0.213) baselines. For arousal regression, the best model achieves a test CCC of 0.688 ± 0.020 using ExHuBERT, eGeMAPS, FinnSentiment, and valence scores; however, audio features alone (ExHuBERT + eGeMAPS) achieve nearly identical performance at 0.686 ± 0.019, showing that text provides no substantial complementary benefit for arousal. Across individual modalities, text features dominate valence while acoustic embeddings dominate arousal.

| Systems / Conditions | Valence (Test CCC) | Arousal (Test CCC) |
|---|---|---|
| ModernBERT_T + ExHuBERT_A + FinnSentiment_T + Arousal | 0.428 | - |
| ModernBERT_T (Text-only) | 0.266 | 0.205 |
| ExHuBERT_A + eGeMAPS_A (Audio-only) | 0.213 | 0.686 |
| ExHuBERT_A + eGeMAPS_A + FinnSentiment_T + Valence | - | 0.688 |

## Limitations

The study is restricted to Finnish speech corpora, limiting cross-lingual generalizability without further adaptation. The total annotated dataset scale is relatively small (13.42 hours total, ~2.3 hours test set), and explicit syntactic/lexical feature analysis showed limited explanatory power due to data scarcity. Evaluated models rely heavily on frozen upstream representations (ModernBERT, ExHuBERT) rather than end-to-end joint fine-tuning.

## Why read this

Speech and ML researchers studying multimodal affective computing will learn how linguistic semantics and acoustic paralinguistics differentially contribute to valence and arousal in spontaneous speech. It offers a rigorous blueprint for feature-fusion experiments on under-resourced languages.

## Code

- https://github.com/SPEECHCOG/LookingForAffect/

## Applications

Speech emotion recognition systems, empathetic conversational agents, and computational social science tools analyzing affective content in spontaneous dialogue.

## Institutions / 機構

Tampere University

**Funding / 經費:** Jane and Aatos Erkko Foundation

## Related

- (link related pages by id as the wiki grows)
