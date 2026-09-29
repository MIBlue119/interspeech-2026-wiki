---
id: huo26_interspeech
category: asr
labels: [self-supervised]
institutions: ["University of Toronto"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2676
pdf: https://www.isca-archive.org/interspeech_2026/huo26_interspeech.pdf
---

# Do speech foundation models really learn words?

*Robin Huo, Ewan Dunbar*

[PDF](https://www.isca-archive.org/interspeech_2026/huo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2676)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates whether speech foundation models genuinely learn word-level representations or merely encode local phonetic form. Using a ridge regression residualization technique on LibriSpeech, the authors show that HuBERT and wav2vec 2.0 encode word identity independently of local phonemes in their later transformer layers, and that removing phonemic information improves unsupervised word discovery.

## Key contributions

- Applies linear ridge regression residualization to isolate and subtract out phoneme, diphone, and triphone information from speech foundation model embeddings.
- Demonstrates that HuBERT and wav2vec 2.0 retain high frame-level word classification accuracy (>90%) even after residualizing out phonemes, diphones, and triphones.
- Shows that removing phonemic information via residualization improves normalized edit distance (NED) and F1-score in unsupervised word discovery tasks.
- Highlights that standardization (zero mean, unit variance) of representations prior to residualization is strictly necessary to prevent distribution-shape artifacts from dominating linear classifiers.

## Problem

Prior probing studies claiming that self-supervised speech models encode word identity and semantic features suffer from a confounding factor: words are bundles of phonemes, and models are already highly discriminative of phonemes. Because cosine similarities and standard linear probes can be driven by local phonological form (the signifier) rather than independent lexical properties (the signified), it remains unclear whether these models actually learn form-independent word tokens. This ambiguity hinders progress in understanding why speech foundation models lag behind text-based models in semantic and lexicon discovery tasks.

## Method

The study analyzes base variants of HuBERT and wav2vec 2.0 using pre-trained fairseq checkpoints, evaluating representations from the final convolutional layer and all 12 transformer layers on the LibriSpeech dev-clean split. Features are first standardized to zero mean and unit variance. To remove local phonetic context, a ridge regression model with weight decay alpha (tuned logarithmically between 1 and 0.0001) is trained to predict individual representation frames from one-hot encodings of phonemes, left diphones, right diphones, or triphones; the predicted components are then subtracted to yield residualized embeddings.

To avoid inadvertently scrubbing true word representations, any training instances where a phoneme, diphone, or triphone completely contains the corresponding gold word are excluded from the regression fit. A five-fold cross-validated softmax linear probe is then trained on these residualized frames to evaluate word identity classification. For word discovery, HuBERT layer 9 features are passed through an adjacent-frame dissimilarity peak detection algorithm (using a window size of 3-8 and prominence threshold of 0-1) followed by k-means clustering with k = 13,967.

## Experimental setup

Evaluated on the dev-clean split of the LibriSpeech dataset (English), using gold alignments to map frames to 42 phoneme categories and 8,217 word types. Compared across HuBERT-base and wav2vec 2.0-base across raw representations, phoneme-residualized, diphone-residualized, and triphone-residualized conditions. Metrics include frame-level word classification accuracy, phoneme validation accuracy, normalized edit distance (NED), token F1-score, and R-value for word discovery with a 20 ms boundary tolerance.

## Results

After phoneme residualization, word classification accuracy in later layers (peaking at layers 9-10 for HuBERT and 7-8 for wav2vec 2.0) remains robust, exceeding 90% for longer words, proving that models encode word identity beyond local triphone sequences. In unsupervised word discovery using HuBERT layer 9, removing phoneme information improves the best NED from 0.443 to 0.439 and token F1 from 0.175 to 0.178 across baseline hyperparameter configurations. Conversely, residualizing out triphones harms word segmentation performance, as local phoneme transition probabilities inherently assist boundary detection.

| System / Condition | NED (↓) | F1 (↑) | R (↑) |
|---|---|---|---|
| Raw (Malan et al. baseline) | 0.508 | 0.162 | 0.513 |
| − Phoneme | 0.463 | 0.169 | 0.513 |
| − Diphone-L | 0.490 | 0.162 | 0.506 |
| − Diphone-R | 0.474 | 0.160 | 0.502 |
| − Triphone | 0.556 | 0.136 | 0.474 |

## Limitations

The primary practical limitation is the reliance on precise gold phonemic alignments for residualization, which are unavailable in low-resource or unsupervised settings. Additionally, the exclusion of monophonemic words from the regression training data prevents complete eradication of linear phoneme information (leaving phoneme probe accuracies above chance level). The evaluation is currently restricted to English LibriSpeech, leaving multilingual and cross-lingual generalizability unverified.

## Why read this

Speech and ML researchers investigating interpretability and self-supervised representation geometry will find this a definitive methodological blueprint for disentangling low-level acoustics from higher-order lexical properties. It provides critical insight into what foundation models actually learn inside their middle-to-late transformer layers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unsupervised lexicon discovery, low-resource spoken language processing, and representation engineering for textless language models.

## Institutions / 機構

University of Toronto

**Funding / 經費:** Natural Sciences and Engineering Research Council of Canada, Data Sciences Institute, Linguistics Graduate Research Award at the University of Toronto

## Related

- [Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains](gonzalez26b_interspeech.md) — shared technique · relatedness 2.3/3
- [Do Learned Layer Weights Reflect Pretrained Information Structure in Self-Supervised Speech Models?](getman26b_interspeech.md) — same problem · relatedness 2.3/3
- [Speech Codec Probing from Semantic and Phonetic Perspectives](shi26g_interspeech.md) — same problem · relatedness 2.0/3
- [InsideSSL: Understanding Self-Supervised Speech Representations using a Model-Centric Perspective](sadok26_interspeech.md) — same problem · relatedness 2.0/3
- [Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0](peng26c_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
