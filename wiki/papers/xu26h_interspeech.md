---
id: xu26h_interspeech
category: asr
labels: [efficient-on-device, self-supervised]
institutions: ["Chinese University of Hong Kong", "National Research Council Canada"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1010
pdf: https://www.isca-archive.org/interspeech_2026/xu26h_interspeech.pdf
---

# Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering

*Haoning Xu, Zhaoqing Li, Huimeng Wang, Youjun Chen, Chengxi Deng, Mengzhe Geng, Xunying Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1010)

**Category:** `asr` · **Labels:** `efficient-on-device`, `self-supervised`

**TL;DR** — A data-free and training-free model compression approach for speech foundation models replaces destructive magnitude pruning with k-means parameter clustering and fusion. It yields zero-shot performance comparable to uncompressed models, outperforming magnitude-based pruning by up to 68% absolute Word Error Rate reduction at 10% sparsity on Whisper-large-v3.

## Key contributions

- Replaces conventional destructive importance-score pruning with structured k-means parameter clustering and centroid fusion, preserving collective functional information of redundant units.
- Introduces a data-free and training-free compression workflow requiring no calibration data or backpropagation, overcoming data accessibility bottlenecks.
- Proposes a variance-based mixed sparsity allocation strategy that assigns layer-specific compression budgets dynamically based on parameter variance across module groups.
- Produces a hardware-friendly coarse-grained compressed model compatible with standard off-the-shelf hardware without requiring specialized sparse acceleration libraries.

## Problem

Existing neural compression methods for speech foundation models face major roadblocks, notably the irreversible loss of information from isolated magnitude-based pruning that discards functionally redundant weights. Furthermore, most modern pruning and distillation techniques strictly depend on raw calibration data or expensive fine-tuning loops, rendering them useless when original training datasets are unavailable. Finally, fine-grained unstructured pruning methods achieve high compression but demand specialized hardware accelerators or custom runtime libraries, failing to accelerate standard edge or mobile deployment hardware. This paper targets these limitations to create a fast, data-independent, hardware-friendly alternative.

## Method

The proposed method performs channel-wise k-means clustering on structured sub-matrix units (attention heads and intermediate FFN units) to reduce model capacity without dropping parameters. For Multi-Head Self-Attention (MHSA) and cross-attention modules, weight matrices W_q, W_k, W_v, and W_out^T are concatenated across layers into a single matrix, where each structured unit u_i is flattened into a 1D vector of shape dh * 4E. For Feed-Forward Networks (FFN), W_fc1 and W_fc2^T are concatenated with units of shape 1 * 2E. The optimization minimizes the within-cluster sum of squares (WCSS) via hard assignment and centroid updates to find K optimal centroids U_out, which replace the original units by reconstructing the compressed matrices.

To account for layer sensitivity, a parameter variance-based mixed sparsity allocation strategy sorts modules into groups by their parameter variance and partitions them into low, mid, and high sub-groups. Modules in high-variance groups encapsulate more complex information and are assigned a larger cluster budget K_l = floor(K_base * (1 + s)) (with hyperparameter s = 0.2), protecting them from aggressive degradation. Conversely, low-variance groups absorb higher compression rates. This design guarantees identical overall sparsity while intelligently redistributing model capacity across layers.

The approach operates entirely data-free and training-free for inference-ready deployment, though optional 3-epoch post-clustering fine-tuning using AdamW (learning rate 2e-4, batch size 16) on the 100-hour LibriSpeech clean subset is evaluated for absolute capacity recovery. Inference uses standard dense tensor architectures, retaining full compatibility with general-purpose hardware.

## Experimental setup

Experiments are conducted on LibriSpeech dev-clean, dev-other, test-clean, and test-other subsets using HuBERT-large (316.6M parameters) fine-tuned for 20 epochs on 60k hours, and Whisper-large-v3 (1550M parameters). Comparisons are made against uncompressed baselines and traditional Magnitude-based Pruning (MP) across uniform and mixed sparsity settings from 10% to 60%. Fine-tuning uses a single NVIDIA A40 (48 GB) GPU.

## Results

On Whisper-large-v3 at 10% sparsity, the data-free clustering method with mixed sparsity achieves test-clean/test-other WERs of 1.97% and 4.06%, delivering absolute WER reductions of 67.45% and 68.58% over uniform magnitude-based pruning, and maintaining no statistically significant WER increase relative to the uncompressed baseline. On HuBERT-large at 50% uniform sparsity before fine-tuning, parameter clustering yields consistent absolute WER reductions of 27.73% (test-clean) and 18.61% (test-other) over magnitude-based pruning. After 3 epochs of fine-tuning, HuBERT-large retains improvements of 0.19% and 0.79% absolute WER on the respective test splits. Both methods suffer catastrophic degradation when sparsity exceeds 20% for Whisper or 50% for HuBERT, as extreme layer-wise variance collapse prevents the model from retaining critical representations.

| System / Condition | Sparsity | test-clean WER | test-other WER |
|---|---|---|---|
| Uncompressed Whisper-large-v3 | 0% | 2.03% | 3.99% |
| Magnitude-based Pruning | 10% | 69.79% | 75.68% |
| Clustering + Uniform (Ours) | 10% | 2.34% | 7.10% |
| Clustering + Mixed (Ours) | 10% | 1.97% | 4.06% |
| Uncompressed HuBERT-large | 0% | 3.44% | 8.34% |
| Clustering + Mixed (Ours, Fine-tuned) | 50% | 5.12% | 15.68% |

## Limitations

Performance degrades catastrophically at higher sparsity levels (above 20% for Whisper-large-v3 and above 50% for HuBERT-large), indicating that variance-based allocation cannot salvage models under extreme compression. The evaluation is limited to English ASR via LibriSpeech, omitting multilingual or translation stress-tests. Additionally, static non-transformer blocks like CNN frontends limit total system GFLOP reduction compared to transformer-only GFLOP drops.

## Why read this

Speech ML researchers and edge-deployment engineers seeking a zero-shot, data-free method to compress large transformer speech models without specialized runtime hardware will find this paper essential reading. It provides clear insights into why magnitude-based pruning fails on low-variance models like Whisper and introduces parameter clustering as a robust alternative.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device speech recognition, resource-constrained edge transcription systems, and fast model compression in data-scarce environments.

## Institutions / 機構

Chinese University of Hong Kong, National Research Council Canada

**Funding / 經費:** Hong Kong RGC GRF

## Related

- [Pruning as Regularization: Sensitivity-Aware One-Shot Pruning in ASR](irigoyen26_interspeech.md) — same problem · relatedness 2.9/3
- [PhonePrune: One-shot Phoneme-Aware Pruning for Large-scale ASR Models via Phoneme Set Generation and Calibration](lee26q_interspeech.md) — same problem · relatedness 2.6/3
- [Measuring the Redundancy of Decoder Layers in SpeechLLMs](moumen26_interspeech.md) — same problem · relatedness 2.4/3
- [Not All Frames Are Equal: Difference-Aware Quantization for Ultra-Low-Bit ASR](jeon26c_interspeech.md) — same problem · relatedness 2.3/3
- [Pushing the Limits of Compression: Sub-1-Bit Conformer via Variable-Rank Binary Decomposition](yeo26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
