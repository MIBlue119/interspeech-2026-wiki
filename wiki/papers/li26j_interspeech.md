---
id: li26j_interspeech
category: health-clinical
institutions: ["Shanghai Artificial Intelligence Laboratory", "Tsinghua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-666
pdf: https://www.isca-archive.org/interspeech_2026/li26j_interspeech.pdf
---

# Towards Paradigm-General Suicide Risk Detection via Speech LLM

*Jialun Li, Weitao Jiang, Ziyun Cui, Yinan Duan, Diyang Qu, Chao Zhang, Runsen Chen, Chang Lei, Wen Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/li26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-666)

**Category:** `health-clinical`

**TL;DR** — This paper introduces Mixture of DoRA Experts (MoDE), a speech LLM framework that unifies ten distinct speech elicitation paradigms for adolescent suicide risk detection, achieving a 4.5% relative accuracy gain over separate tuning and strong zero-shot generalisation on unseen tasks.

## Key contributions

- First cross-paradigm framework unifying ten diverse speech elicitation paradigms (SEPs) for adolescent suicide risk detection into a single model.
- Proposes Mixture of DoRA Experts (MoDE), replacing full subnetwork experts with lightweight weight-decomposed low-rank adaptation modules driven by a decoupled router.
- Demonstrates robust zero-shot generalisation capability to entirely unseen speech elicitation paradigms via cross-paradigm transfer learning.
- Improves prediction reliability and medical safety through enhanced confidence calibration, verified via expected calibration error (ECE) and reject option analysis.

## Problem

Automatic speech-based suicide risk detection typically trains isolated models for individual speech elicitation paradigms (such as reading passages or open-ended self-description), ignoring the complementary acoustic and semantic cues across tasks. Prior single-paradigm methods require maintaining numerous disjoint models and fail to leverage shared clinical indicators, while naive multi-task joint tuning often suffers from negative transfer and gradient interference. Addressing this gap is critical for building scalable, robust mental health screening tools that can handle varied clinical elicitation protocols without sacrificing accuracy.

## Method

The architecture builds upon Qwen2.5-Omni-7B as the speech-text multimodal large language model backbone, processing audio recordings alongside instruction prompts specifying the task description. To adapt the model efficiently, Mixture of DoRA Experts (MoDE) replaces standard fine-tuning layers with $E$ parallel weight-decomposed low-rank adaptation (DoRA) experts, configured with a rank of 32 and an alpha of 64. The hidden states from Transformer blocks pass through a fully connected router using a decoupled design: expert routing weights are computed from the frozen backbone without DoRA modules to maintain training stability, preventing adaptation dynamics from destabilizing router decisions. A temperature scaling mechanism is applied to the router's softmax normalization to control sparseness, balancing expert specialization and diversity.

The final objective function combines standard cross-entropy loss ($L_{CE}$) with a load-balancing auxiliary loss. This auxiliary loss computes the Kullback-Leibler (KL) divergence between the router's expert assignment weights and a uniform distribution across the $E$ experts, regulated by a balancing coefficient $\lambda_{LB}$, which effectively prevents expert collapse. During inference, the router dynamically assigns input tokens to specific DoRA experts depending on the acoustic and semantic properties of the active speech elicitation paradigm.

## Experimental setup

Evaluated on a dataset of 1,223 Chinese adolescents aged 10–18 (53.4% identified at suicide risk via the MINI-KID diagnostic interview), covering ten distinct speech elicitation paradigms split into 8:1:1 train/dev/test ratios. Compared against Whisper-Large-v3 (with a 3-layer MLP classifier) and Qwen2.5-Omni-7B under separate tuning and conventional joint-tuning configurations. Performance is measured primarily via classification accuracy, alongside expected calibration error (ECE), maximum calibration error (MCE), negative log-likelihood (NLL), AUROC, and AUPRC. Models are optimized using AdamW and a cosine learning rate scheduler across 4 epochs with a batch size of 64.

## Results

MoDE achieves an average accuracy of 0.656 across the ten paradigms, representing a 4.5% relative improvement over separate tuning (0.628) and outperforming standard joint tuning (0.635). In ablation studies, removing temperature scaling decreases accuracy to 0.640, while omitting the load-balancing loss causes expert collapse to a single expert, dropping accuracy to 0.625. In leave-one-paradigm-out zero-shot evaluations on unseen SEPs, MoDE achieves 0.616 accuracy on SEP05 and 0.593 on SEP07, vastly outperforming the unadapted base model (0.286 and 0.156, respectively). MoDE also significantly improves calibration, lowering ECE from 0.099 (separate tuning) to 0.061.

| System / Condition | Avg. Accuracy | ECE ↓ | NLL ↓ | AUROC ↑ |
|---|---|---|---|---|
| Separate Tuning | 0.628 | 0.099 | 0.805 | 0.640 |
| Conventional Joint Tuning | 0.635 | — | — | — |
| MoDE (Proposed, E=10) | **0.656** | **0.061** | **0.645** | **0.686** |
| MoDE w/o Temp. Scaling | 0.640 | — | — | — |
| MoDE w/o Load Balancing | 0.625 | — | — | — |

## Limitations

The study relies exclusively on the MINI-KID scale which captures immediate suicide risk states rather than forecasting future long-term suicidal behavior. The evaluation dataset is restricted to a Chinese adolescent cohort (ages 10-18), limiting demographic and cross-lingual generalizability. Additionally, performance on certain individual paradigms (such as SEP10) shows occasional degradation under joint multi-task routing compared to separate task tuning.

## Why read this

Researchers and engineers working on parameter-efficient multi-task speech LLMs or AI-driven mental health screening will find this paper valuable for its novel decoupled Mixture of DoRA Experts routing strategy and rigorous analysis of calibration and zero-shot task transfer.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated mental health screening, remote clinical voice biomarker assessment, and scalable adolescent suicide risk monitoring tools.

## Institutions / 機構

Shanghai Artificial Intelligence Laboratory, Tsinghua University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
