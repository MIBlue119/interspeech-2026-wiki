---
id: issam26_interspeech
category: translation
labels: [multilingual]
institutions: ["Maastricht University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2278
pdf: https://www.isca-archive.org/interspeech_2026/issam26_interspeech.pdf
---

# Cross-Modal Robustness Transfer (CMRT): Training Robust Speech Translation Models Using Adversarial Text

*Abderrahmane Issam, Yusuf Can Semerci, Jan Scholtes, Gerasimos Spanakis*

[PDF](https://www.isca-archive.org/interspeech_2026/issam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/issam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2278)

**Category:** `translation` · **Labels:** `multilingual`

**TL;DR** — Cross-Modal Robustness Transfer (CMRT) improves end-to-end speech translation (E2E-ST) robustness against morphological variations by 3.4 BLEU points on average using only adversarial text, bypassing the need for costly synthetic speech generation.

## Key contributions

- Adapts text-domain adversarial inflectional attacks (MORPHEUS) to the speech domain as Speech-MORPHEUS, incorporating a homophone-filtering step.
- Proposes Cross-Modal Robustness Transfer (CMRT), enabling robustness training in speech models using exclusively adversarial text data.
- Combines Word-Aligned Contrastive Learning (WACO) and mixup training to strongly align speech and text semantic spaces.
- Demonstrates that CMRT scales effectively when combined with massively pretrained multilingual models like NLLB-200.

## Problem

End-to-End Speech Translation models struggle significantly with non-standard inflectional morphology common in non-native and dialectal speech, yielding high vulnerability on curated benchmarks. While Machine Translation uses synthetic adversarial fine-tuning to fix this, doing the same for speech requires resource-intensive text-to-speech (TTS) generation. This work addresses the gap of how to impart adversarial text robustness directly onto the speech modality without needing high-fidelity adversarial audio.

## Method

The architecture comprises a speech encoder (HuBERT for En-X, mHuBERT for Fr-En) followed by two 1D-convolutional layers (kernel size 5, stride 2, padding 2, 1024 hidden units) to reduce temporal resolution, paired with a 6-layer Transformer translation encoder-decoder (512 hidden units, 8 attention heads, 2048 FFN units).

Training occurs in two primary stages. First, the model undergoes multi-task pretraining (CMRT-TR) using Word-Aligned Contrastive Learning (WACO) via mean pooling over forced alignments to maximize positive pair cosine similarity, combined with mixup training where representations are sampled from speech or text based on a uniform probability $p \sim U(0,1)$. A composite loss minimizes speech, text, and mixup cross-entropy, alongside a symmetric KL divergence loss ($\lambda_{kl} = 2.0$) and contrastive loss ($\lambda_{ctr} = 1.0, \tau = 0.2$).

In the second stage (CMRT-FN), adversarial fine-tuning injects adversarial text embeddings into the frozen speech encoder's manifold via adversarial mixup. Asymmetric KL divergence aligns output distributions of adversarial mixup embeddings with clean speech and text, using a higher KL weight ($\lambda_{kl} = 5.0$) to prioritize robustness while freezing the speech encoder.

## Experimental setup

Evaluated on the CoVoST 2 dataset across four language directions: En-De, En-Ca, En-Ar, and Fr-En, using test set BLEU scores. Adversarial data is generated via Speech-MORPHEUS (using spaCy-lefff, inflecteur, eSpeak NG, and XTTS-v2) on 50k samples. Baselines include MT-Transformer, HuBERT-Transformer, HuBERT-CMOT, TTS-Morpheus-FN, and CMRT-TR. MT models are trained on an NVIDIA A100 and ST models on an NVIDIA H100 using Fairseq with a learning rate of 1e-4.

## Results

CMRT-FN improves adversarial robustness by an average of 3.4 BLEU points over the HuBERT-Transformer baseline across the four translation directions without seeing any adversarial speech during training. While TTS-Morpheus-FN (trained on actual adversarial speech) achieves slightly higher Morpheus scores, it suffers a severe 3.6 BLEU drop on original clean data, whereas CMRT-FN limits its clean data drop to only 0.6 BLEU. When initialized with NLLB-200-distilled-600M, CMRT amplifies robustness gains up to 6.1 BLEU points on Fr-En over HuBERT-NLLB.

| System | En-De (Orig) | En-De (Morpheus) | Fr-En (Orig) | Fr-En (Morpheus) |
|---|---|---|---|---|
| HuBERT-Transformer | 21.4 | 14.4 | 28.4 | 20.5 |
| HuBERT-CMOT | 21.8 | 14.6 | 30.9 | 22.0 |
| CMRT-TR (Ours) | 20.8 | 14.4 | 29.5 | 21.9 |
| TTS-Morpheus-FN (50K) | 18.2 | 19.9 | 24.7 | 25.1 |
| CMRT-FN (50K) | 19.9 | 17.4 | 28.3 | 24.6 |
| CMRT-FN | 20.3 | 17.6 | 28.8 | 25.2 |

## Limitations

The evaluation is constrained to four language pairs (En-De, En-Ca, En-Ar, Fr-En) and relies heavily on forced alignment tools (NeMo Forced Aligner) and rule-based inflection tools which may not scale easily to low-resource languages lacking robust POS taggers and morphological analyzers.

## Why read this

Researchers and engineers working on spoken language translation and robustness will learn how to bypass the computational bottleneck of generating synthetic adversarial audio by transferring text-space adversarial resilience directly across modalities via semantic space alignment.

## Code

- https://github.com/issam9/CMRT

## Applications

Robust end-to-end speech translation systems deployed in real-world scenarios involving heavy non-native, accented, or dialectal speech with morphological variations.

## Institutions / 機構

Maastricht University

**Funding / 經費:** European Union Horizon Europe program, SURF Cooperative

## Related

- (link related pages by id as the wiki grows)
