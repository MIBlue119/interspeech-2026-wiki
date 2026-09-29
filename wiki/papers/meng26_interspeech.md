---
id: meng26_interspeech
category: speaker
institutions: ["Xinjiang University", "Xinjiang Multimodal Information Technology Engineering Research Center", "Tsinghua University", "AGIBOT"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-25
pdf: https://www.isca-archive.org/interspeech_2026/meng26_interspeech.pdf
---

# A Federated Learning-Based Speaker Recognition Method with Dual Classification Heads

*Ying Meng, Zhihua Fang, Liang He*

[PDF](https://www.isca-archive.org/interspeech_2026/meng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-25)

**Category:** `speaker`

**TL;DR** — FedDCH introduces dual classification heads (local and global) into federated speaker recognition to directly integrate cross-client knowledge and mitigate data heterogeneity, achieving an average EER improvement of up to 68.8% over local training on combined VoxCeleb and CN-Celeb benchmarks.

## Key contributions

- Proposes a dual classification heads architecture (FedDCH) where both a local and a global classifier jointly guide the backend feature extractor during local client training.
- Establishes a more realistic federated setup treating clients as organizations with disjoint speaker sets rather than individual terminal devices.
- Introduces a speaker-ID-based weighted aggregation mechanism utilizing an advantage factor during global classifier aggregation to preserve discriminative speaker information across diverse data volumes.
- Demonstrates robustness and performance gains across varied global loss functions (Cross-Entropy, AM-Softmax, AAM-Softmax) and challenging evaluation sets (Vox-O, Vox-E, Vox-H, CN-Celeb.Eval).

## Problem

Standard speaker recognition relies on centralized training, which violates stringent privacy compliance regulations and demands heavy investments to aggregate sensitive voice data. Applying standard federated learning methods (such as FedAvg, FedProx, MOON, and FedCDA) to decentralized organizational setups leads to severe performance degradation due to data heterogeneity, where each client holds mutually exclusive speaker categories. Prior federated approaches rely entirely on local classification heads that lack explicit awareness of the global data distribution, restricting cross-client knowledge integration to indirect model parameter averaging.

## Method

The framework models $K$ clients and one server, where each client $k$ maintains a private dataset $D_k$ with $N_k$ utterances from $C_k$ speakers. The client-side architecture consists of an embedding extractor $f(\cdot)$ parameterized by weights $w_k$ (ECAPA-TDNN with 1024 channels, yielding 512-dimensional embeddings from 80-dimensional log mel-spectrograms), a local classifier $h_k(\cdot)$ with parameters $\psi_k$ mapping to $C_k$ classes, and a global classifier $h_{g,k}(\cdot)$ with parameters $\psi_{g,k}$ mapping to the total global classes $C = \sum C_k$. During local training, the embedding extractor is optimized under the joint guidance of the local loss ($l_{local}$, using AM-Softmax with margin $m=0.2, s=30$) and the global loss ($l_{global}$). 

After $l=5$ epochs of local training per round, clients update their global classifier parameter matrices based on string IDs matching global categories. Clients then upload both their local embedding extractors $w_k$ and updated global classifiers $\psi_{g,k}$ to the server. The server aggregates the embedding extractors using standard proportion-weighted averaging based on client data sizes ($\lambda_k$), and aggregates the global classifiers using a speaker-ID-based weighted aggregation mechanism. This mechanism applies an advantage factor $\mu$ to weighting matrix $W$ entries for clients possessing data for specific speaker IDs, granting more trained heads higher influence during aggregation. Training proceeds for a maximum of $T=20$ aggregation rounds.

## Experimental setup

Experiments use VoxCeleb1 (1,486,427/1,211 devs; Vox-O test), VoxCeleb2 (1,092,009 devs; Vox-E and Vox-H tests), CN-Celeb1 (111,260 devs; CN-Celeb.Eval test), and CN-Celeb2 (529,485 devs). Baselines include Standard (isolated local training without federated learning), FedAvg, FedProx, MOON, and FedCDA. Evaluation metrics are Equal Error Rate (EER) and Minimum Detection Cost Function (minDCF) at $P_{target}=0.05$. Implementation uses the Adam optimizer with an initial learning rate of 0.001 decaying by 0.97 per epoch.

## Results

On the VoxCeleb2 dataset split uniformly across 4 clients, FedDCH achieves an average EER improvement of 46.5% over local training and 7.6% over FedAvg across test sets. For instance, on Vox-O evaluated across clients 1 through 4, FedDCH records EERs of 2.54%, 2.31%, 2.54%, and 2.37% respectively, outperforming FedAvg (2.69%, 2.52%, 2.73%, 2.57%) and FedCDA (2.59%, 2.43%, 2.89%, 2.39%). In realistic cross-corpus simulations deploying VoxCeleb1, CN-Celeb1, VoxCeleb2, and CN-Celeb2 across four separate clients, FedDCH achieves superior EERs of 1.12% (Vox-O), 8.51% (CN-Celeb.Eval), 1.35% (Vox-O), and 8.78% (CN-Celeb.Eval), outperforming FedAvg (1.18%, 9.05%, 1.38%, 9.23%). 

Ablation studies confirm that joint guidance from both local and global classifiers outperforms models guided solely by local classifiers (e.g., Client1 EER drops from 2.69% to 2.54%) or global classifiers alone (2.49%). However, the method faces limitations on extremely challenging evaluation subsets like Vox-H, where alternative regularizers such as FedProx occasionally achieve stronger baseline results on select clients.

| System / Condition | Vox-O EER (%) | Vox-O minDCF | Vox-E EER (%) | Vox-E minDCF |
|---|---|---|---|---|
| Standard | 3.66 | 0.2404 | 3.77 | 0.2391 |
| FedAvg [13] | 2.69 | 0.1891 | 2.91 | 0.1872 |
| FedProx [18] | 2.84 | 0.1912 | 2.93 | 0.1887 |
| MOON [19] | 2.72 | 0.1954 | 2.91 | 0.1842 |
| FedCDA [20] | 2.59 | 0.1762 | 2.76 | 0.1785 |
| FedDCH (Ours) | 2.54 | 0.1772 | 2.68 | 0.1741 |

## Limitations

The study evaluates federated training primarily under simulated uniform or cross-corpus splits of public benchmarks rather than real-world edge devices with irregular network constraints or device failures. The approach exhibits suboptimal performance scaling when confronting highly difficult or noisy evaluation environments, such as the Vox-H test set where baseline regularized federated methods like FedProx sometimes outperform it. Furthermore, evaluation is restricted to standard multi-speaker datasets without addressing adversarial privacy attacks or dynamic client dropouts during training rounds.

## Why read this

Speech and ML researchers building privacy-preserving, collaborative speaker recognition systems will find this paper valuable for its dual-head federated architecture and speaker-aware aggregation strategy, which directly addresses client data heterogeneity without sacrificing local adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving multi-institutional speaker verification and forensic voice biometric systems deployed across secure enterprise or governmental networks.

## Institutions / 機構

Xinjiang University, Xinjiang Multimodal Information Technology Engineering Research Center, Tsinghua University, AGIBOT

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
