---
id: lin26e_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1346
pdf: https://www.isca-archive.org/interspeech_2026/lin26e_interspeech.pdf
---

# LOPA: Enhancing Spoken Language Assessment via Latent Ordinal Prototype Alignment

*Hong-Yun Lin, Fu-An Chao, Bi-Cheng Yan, Berlin Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1346)

**TL;DR** — The paper introduces LOPA (Latent Ordinal Prototype Alignment) combined with SALR (Semantic-Anchored Layer Routing) to build a lightweight, frozen-backbone Spoken Language Assessment (SLA) model using Whisper. It achieves competitive performance (RMSE 0.361, PCC 0.828) against billion-parameter multimodal LLMs without requiring any backbone fine-tuning.

## Key contributions

- Proposed Semantic-Anchored Layer Routing (SALR) to adaptively integrate multi-depth representations from a frozen Whisper encoder with biased initialization toward the top layer.
- Introduced Latent Ordinal Prototype Alignment (LOPA), a geometric regularizer combining prototype attraction and ordinal constraint losses to enforce monotonic spacing across CEFR-aligned proficiency levels.
- Demonstrated that a lightweight, frozen-speech-model architecture can match or exceed fine-tuned multimodal LLMs (like Phi-4 variants) on spoken language assessment.
- Provided part-dependent interpretability analysis showing that different speech assessment sub-tasks dynamically recruit different layers of the speech encoder.

## Problem

Current multimodal large language models (MLLMs) used for Spoken Language Assessment (SLA) incur prohibitive computational costs for real-world low-resource educational deployment and largely ignore the inherent ordinal structure of language acquisition (e.g., developmental trajectory from B1 to B2). Conversely, lightweight Whisper-based approaches typically probe only the final encoder layer or rely on downstream ASR text-generation, discarding rich intermediate acoustic, phonetic, and phonological cues. This mismatch creates a gap where systems either require massive compute or fail to respect the progressive, ordered nature of human language proficiency scores.

## Method

The pipeline processes input speech via a frozen Whisper Large-v3 backbone encoder containing L = 32 layers, outputting hidden states H of dimension T x D (where D = 1280). In Stage 2, Semantic-Anchored Layer Routing (SALR) learns scalar weights w_l to compute a fused representation, initialized with w_32 = 5.0 and all other layers set to 0.0 to stabilize training and retain a semantic anchor. Stage 3 applies attention-based temporal pooling with a shared scorer and masked softmax over time steps T to collapse the sequence into a fixed-size vector h_pool. Stage 4 passes h_pool through a feature adapter (a two-layer MLP with 512 hidden units, GELU activation, and 0.1 dropout) to yield a latent embedding z in R^d_latent. A linear projection maps z to K class logits, and the final score is computed as the expected value over ordered CEFR scores. The model is optimized using a base MSE loss combined with Latent Ordinal Prototype Alignment (LOPA). LOPA uses learnable prototypes C = {c_1, ..., c_K} initialized from CEFR level centroids. Its loss function consists of a Prototype Attraction Loss to minimize Euclidean distance between sample representations and their ground-truth prototypes, and an Ordinal Constraint Loss governed by a global scaling factor alpha > 0 to enforce that geometric prototype distances proportionally mirror the true semantic score gaps.

## Experimental setup

Evaluated on the Speak & Improve (S&I) Corpus 2025 official Train/Dev/Eval splits focusing on open speaking parts P1, P3, P4, and P5 with half-point CEFR scores ranging from 2.0 to 5.5. Baselines include cascaded ASR->BERT, wav2vec2, Perezoso (Whisper+BERT+handcrafted features), Whisper last-layer APP, and fine-tuned Phi-4 multimodal LLM variants (STG, CTG, MTL, MTL-APP). Metrics reported are RMSE, PCC, tolerance accuracy within +/-0.5 and +/-1.0, Silhouette Score, and Ordinality Correlation. Trained using AdamW (lr 1e-3, batch size 32) for 25 epochs (P1/P5) and 30 epochs (P3/P4), with loss hyperparameters lambda_att = lambda_ord = 0.1.

## Results

The full model achieves an RMSE of 0.361 and a PCC of 0.828, narrowly outperforming or matching the top-performing fine-tuned MLLM baseline Phi-4-MTL-APP (RMSE 0.360, PCC 0.827) while using zero backbone fine-tuning. Ablations show that removing temporal attention drops RMSE to 0.3698, removing SALR (using only the last layer) increases RMSE to 0.3739, removing LOPA degrades RMSE to 0.3831, and a naive uninitialized multi-layer baseline collapses to RMSE 0.4945. A paired t-test on examinee-level squared errors confirms that LOPA yields a statistically significant error reduction compared to the model without LOPA (t(299) = 2.4345, p = 0.0155 two-sided, Cohen's dz = 0.1406).

| System/Condition | RMSE | PCC | % <= 0.5 | % <= 1.0 |
|---|---|---|---|---|
| BERT (ASR->BERT) | 0.445 | 0.727 | 76.0 | 96.3 |
| wav2vec2 | 0.394 | 0.790 | 81.3 | 99.3 |
| APP (Whisper last-layer) | 0.383 | 0.805 | 81.7 | 99.0 |
| Phi-4-MTL-APP (MLLM) | 0.360 | 0.827 | 85.7 | 99.0 |
| Ours (Whisper + SALR + LOPA) | 0.361 | 0.828 | 83.3 | 99.0 |

## Limitations

The evaluation is restricted to the Speak & Improve corpus datasets and English CEFR proficiency scoring, leaving cross-lingual generalizability and performance on extremely low-resource languages unverified. The frozen backbone prevents the extraction of custom domain-specific phonetic representations if Whisper's pre-training missed them. Additionally, while interpretability is improved via layer weighting, the reliance on a fixed Whisper large-v3 encoder requires substantial VRAM during feature extraction.

## Why read this

Researchers and engineers building efficient educational speech assessment systems or exploring geometric regularizers for continuous ordinal regression will find a clean blueprint for bypassing costly MLLM fine-tuning without sacrificing performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated computer-assisted language learning (CALL) platforms, automated oral proficiency testing, and real-time educational speech feedback.

## Related

- (link related pages by id as the wiki grows)
