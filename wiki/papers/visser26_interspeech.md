---
id: visser26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-315
pdf: https://www.isca-archive.org/interspeech_2026/visser26_interspeech.pdf
---

# ZeroSyl: Simple Zero-Resource Syllable Tokenization for Spoken Language Modeling

*Nicol Visser, Simon Malan, Danel Slabbert, Herman Kamper*

[PDF](https://www.isca-archive.org/interspeech_2026/visser26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/visser26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-315)

**TL;DR** — ZeroSyl is a training-free unsupervised syllable tokenization method for spoken language modeling that extracts boundaries from the L2 norms of frozen WavLM features, outperforming complex multi-stage pipelines across lexical, syntactic, and narrative benchmarks. When scaled to 60,000 hours of audio, its coarser syllabic units surpass frame-level tokenizers on syntactic modeling tasks.

## Key contributions

- Proposes ZeroSyl, a completely training-free method to discover syllable boundaries and semantic units directly from a frozen WavLM model without fine-tuning objectives.
- Demonstrates that the L2 norm of intermediate WavLM (Layer 13) features provides a robust prominence signal for unsupervised syllable boundary detection.
- Introduces an unsupervised silence collapsing mechanism via agglomerative hierarchical clustering on K-means centroids to mitigate multi-centroid silence fragmentation.
- Shows superior scaling behavior for syntactic modeling compared to fine-grained frame-level speech tokens (SpidR) when moving from 600 to 60,000 hours of training data.

## Problem

Pure speech language models trained on standard high-bitrate self-supervised learning (SSL) tokens generate excessively long sequences, making it difficult to capture long-range dependencies and resulting in a syntactic modeling performance plateau since 2023. Prior attempts to mitigate this using syllable-like units (such as Sylber and SyllableLM) rely on intricate, resource-intensive, multi-stage training pipelines involving custom distillation or masked objective monitoring. Furthermore, pure speech modeling has been shown to scale less favorably than text, necessitating cleaner and simpler tokenization strategies that bridge the gap without requiring massive complex architectures.

## Method

ZeroSyl operates in a strictly training-free pipeline using a pretrained WavLM Large model. For boundary detection, framewise hidden embeddings are extracted from layer 13, their L2 norms are computed ($n_t = ||h_t^{(13)}||_2$), smoothed via a 3-point moving average filter, and subjected to prominence-based peak detection with a threshold of $\delta = 0.45\sigma$ (where $\sigma$ is the signal standard deviation).

Once syllable boundaries are established, semantic representations are extracted from layer 22 of WavLM Large (chosen for higher mutual information with syllable labels) and mean-pooled within each discovered segment. The resulting pooled vectors are discretized using spherical K-means with K-means++ initialization, trained on 100 hours of LibriSpeech with a vocabulary size of $K = 10,000$ via the faiss library. To clean up redundant silence tokens, agglomerative hierarchical clustering is performed on the centroids, identifying the smaller branch corresponding to silences and mapping them to a single vocabulary item, reducing the vocabulary size to 9,116.

A causal language model based on the OPT-125M architecture is trained on the resulting discrete token sequences. The model uses a batch size of 81,920 tokens and a context length of 2,048. Training utilizes a linear warmup to $2 \times 10^{-4}$ for the first 8% of steps followed by cosine annealing, running on Libri-Light data configurations ranging from 600 hours to 60,000 hours.

## Experimental setup

Evaluated on LibriSpeech (100 hours for K-means training, combined test sets for intrinsic metrics) and Libri-Light (600, 6k, and 60k hours for language model scaling). Compared against baselines including SyllableLM (5.0, 6.25, and 8.33 Hz), Sylber, a prominence-based baseline using cosine distance (PromSeg), and the frame-level baseline SpidR. Benchmarked using lexical (sWUGGY), syntactic (sBLIMP), and narrative (Topic StoryCloze - tSC) datasets, alongside intrinsic syllable discovery metrics (Purity, Inverse Purity, Syllable-Normalized Mutual Information, Bitrate in bps).

## Results

On the Libri-Light 6k-hour evaluation, ZeroSyl achieves an sWUGGY lexical accuracy of 68.0% (in-vocabulary 78.6%), an sBLIMP syntactic score of 60.5%, and a Topic StoryCloze narrative score of 68.1%, outperforming both SyllableLM (56.4% sBLIMP) and Sylber (59.1% sBLIMP) while maintaining the lowest bitrate at 52 bits per second (bps). ZeroSyl also achieves an SNMI of 88.9%, beating Sylber (83.5%) and SyllableLM (82.6%).

In scaling experiments up to 60k hours, ZeroSyl trails the fine-grained tokenization of SpidR on lexical tasks (sWUGGY) due to its lower acoustic granularity, but exhibits a steeper upward trajectory on syntactic modeling (sBLIMP), surpassing SpidR at scale and closely matching SpidR on narrative coherence (tSC) despite utilizing a fraction of the complexity.

| System | Bitrate (bps) | sWUGGY (IV) (%) | sBLIMP (%) | tSC (%) |
|---|---|---|---|---|
| SyllableLM 6.25 Hz | 73 | 74.2 | 56.4 | 67.6 |
| Sylber | 53 | 74.7 | 59.1 | 65.8 |
| ZeroSyl (uncollapsed) | 58 | 76.3 | 58.6 | 67.5 |
| ZeroSyl (Collapsed) | 52 | 78.6 | 60.5 | 68.1 |

## Limitations

The primary limitation is that coarse syllabic units sacrifice fine-grained acoustic and phonetic detail, causing ZeroSyl to trail frame-level tokenizers (like SpidR) on lexical tasks such as sWUGGY, particularly for rare or unseen words. The evaluation is currently bounded to English corpora (LibriSpeech and Libri-Light), and the approach relies entirely on the fixed representations of WavLM Large without investigating cross-lingual robustness or the exact underlying mechanism of why L2 norms encode syllable positions.

## Why read this

Speech and ML researchers building pure speech language models without text should read this paper to see how complex multi-stage distillation pipelines for syllable discovery can be entirely replaced by a simple, zero-resource, feature-norm thresholding approach. It provides critical insights into the trade-offs between frame-level and syllabic units across data scaling regimes.

## Code

- https://github.com/nicolvisser/ZeroSyl/

## Applications

Unsupervised speech language modeling, low-resource speech technology, and text-free spoken dialogue systems.

## Related

- (link related pages by id as the wiki grows)
