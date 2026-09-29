---
id: phukan26_interspeech
category: deepfake-security
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["National Tsing Hua University", "University of Petroleum and Energy Studies", "Veer Bahadur Singh Purvanchal University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2283
pdf: https://www.isca-archive.org/interspeech_2026/phukan26_interspeech.pdf
---

# Bridging the Age Gap: Towards Detecting Neural Audio Codec Synthesized Elderly Speech Deepfake

*Orchid Chetia Phukan, Girish, Mohd Mujtaba Akhtar, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/phukan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/phukan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2283)

**Category:** `deepfake-security` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — This paper introduces the Elderly CodecFake Detection (ECFD) task and dataset to address the severe generalization failure of current speech deepfake detectors on older adult voices, proposing a novel Jensen-Shannon Divergence foundation model fusion framework called BONSAI that achieves a state-of-the-art 1.66% EER.

## Key contributions

- Formalized the novel Elderly CodecFake Detection (ECFD) task and released the Elderly-CodecFake (ECF) dataset spanning English and Chinese across 14 neural audio codec (NAC) variants.
- Revealed a critical cross-demographic robustness gap, showing that SOTA codec fake detectors experience substantial performance degradation when evaluated on elderly speech compared to younger voices.
- Demonstrated that multimodal foundation models (LanguageBind and ImageBind) outperform speech-only foundation models (Wav2vec2, WavLM, Whisper) due to cross-modal pretraining capturing age-related visual and contextual cues.
- Proposed BONSAI, a novel multimodal fusion framework utilizing Jensen-Shannon Divergence (JSD) loss to align and combine heterogeneous foundation model representations stably.

## Problem

Current speech deepfake and codec fake (CF) detection benchmarks rely predominantly on younger adult speakers, creating severe vulnerability for older populations whose voices exhibit distinct vocal traits like breathiness, reduced pitch stability, and irregular temporal patterns. State-of-the-art detectors built on previous datasets generalize poorly to these demographic shifts, failing to account for neural audio codec (NAC) synthesis artifacts in older adults. This oversight compromises security and trust in assistive communication and voice technologies targeted at aging demographics.

## Method

The paper explores extracting representations from frozen foundation model audio encoders (Wav2vec2, WavLM, Whisper, LanguageBind [LB], and ImageBind [IB]) using average pooling from the last hidden layer, with dimensionalities of 768, 1024, or 512. For downstream classification, the authors benchmark AASIST (a graph neural network) and a lightweight 1D-CNN comprising a convolutional layer, max-pooling, and fully connected layers.

To fuse disparate foundation models without simple concatenation's distributional mismatch, the proposed BONSAI framework passes each FM representation through a 1D-CNN (32 filters, kernel size 3) and projection layers. The normalized softmax probability distributions $p$ and $q$ are aligned using a Jensen-Shannon Divergence (JSD) loss defined as $L_{JSD} = \frac{1}{2} KL(p \parallel m) + \frac{1}{2} KL(q \parallel m)$ where $m = \frac{1}{2}(p + q)$.

The total training objective is a joint loss $L = \lambda L_{CE} + (1 - \lambda) L_{JSD}$, where cross-entropy $L_{CE}$ handles classification and $\lambda = 0.65$ balances the alignment constraint. BONSAI contains roughly 3.8M to 4.02M trainable parameters depending on the underlying foundation model representations.

## Experimental setup

Evaluated on the ECF dataset comprising 60,749 real elderly utterances and 850,486 synthetic codec fake samples across SeniorTalk (Mandarin, 55.53 hours) and TIS Corpus (English, 1,152 utterances). Fourteen neural audio codecs are used for generation, including DAC, EnCodec, SoundStream, SpeechTokenizer, FunCodec, AudioDec, SNAC, and MIMI. Models are optimized using the Adam optimizer with a learning rate of 1e-3, batch size of 32, and dropout for 20 epochs.

## Results

When trained on prior benchmark CF datasets and evaluated zero-shot on ECFD, AASIST and Wav2Vec2-AASIST suffer severe performance drops, achieving high EERs around 14.07% to 30.18% on elderly sets while retaining better accuracy on younger subsets. In in-domain evaluations, multimodal foundation models (LB and IB with CNN downstream classifiers) consistently outperform speech-only models, with individual LB achieving 4.56% average EER. The proposed BONSAI framework combining LanguageBind and ImageBind achieves the headline result of 1.66% average EER (1.80% on SeniorTalk, 1.51% on TIS elderly), outperforming simple feature concatenation and individual foundation models.

| System / Condition | SeniorTalk (E1) EER% | TIS Elderly (E2) EER% | Average EER% |
|---|---|---|---|
| Wav2vec2 (CNN) | 11.02 | 10.29 | 10.66 |
| Whisper (CNN) | 8.46 | 8.14 | 8.30 |
| ImageBind (CNN) | 5.41 | 5.26 | 5.34 |
| LanguageBind (CNN) | 4.81 | 4.30 | 4.56 |
| Concatenation (IB + LB) | 3.01 | 2.50 | 2.76 |
| BONSAI (IB + LB) | 1.80 | 1.51 | 1.66 |

## Limitations

The current dataset scope is limited to Mandarin and English languages, and relies exclusively on older adults aged 60 to 85. The compute cost requires extracting large-scale features from frozen foundation models, and the framework's performance depends heavily on the alignment weight hyperparameter ($\lambda = 0.65$). Broad linguistic and acoustic coverage beyond English and Mandarin remains untested.

## Why read this

Researchers and engineers building robust speech deepfake detectors should read this paper to understand demographic vulnerabilities in current countermeasures and learn how Jensen-Shannon Divergence can effectively align multimodal foundation models for enhanced audio forensics.

## Code

- https://helixometry.github.io/ElderlyCodecFake/

## Applications

Elderly-inclusive speech deepfake detection, scam and impersonation fraud prevention for vulnerable populations, and multimodal audio security systems.

## Institutions / 機構

National Tsing Hua University, University of Petroleum and Energy Studies, Veer Bahadur Singh Purvanchal University

**Funding / 經費:** National Science and Technology Council

## Related

- (link related pages by id as the wiki grows)
