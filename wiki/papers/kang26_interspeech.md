---
id: kang26_interspeech
category: speaker
labels: [self-supervised]
institutions: ["Korea University"]
code: https://github.com/slp-lab-research/vam_ecapa
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3192
pdf: https://www.isca-archive.org/interspeech_2026/kang26_interspeech.pdf
---

# Beyond Short Segments : Expanding Speaker Embeddings with Vector Archives

*Hyunku Kang, Minkyu Cho, Chanwoo Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3192)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — VAM-ECAPA introduces a learnable Vector Archive Mapping mechanism to enrich sparse frame-level features from short audio segments, achieving a 54.8% relative error reduction on 1-second trials compared to a strong WavLM+ECAPA-TDNN baseline.

## Key contributions

- Proposes the Transformer-based Vector Archive Mapping with Statistical Pooling (TVAMSP) module to compensate for information scarcity in short-duration speaker verification without requiring multiple utterances at inference time.
- Introduces an end-to-end trainable Vector Archive Library (G=4 archives, l2=149 conceptual length) representing canonical speaker traits that short-utterance features can query via a cross-attention-like mapping.
- Applies an Attentive Statistics Pooling (ASP) broadcast mechanism to inject global utterance-level statistics back into frame-level representations.
- Demonstrates consistent improvements across VoxCeleb1 trial lists (Vox1-O, E, H), lowering 1-second EER to 8.334%.

## Problem

State-of-the-art speaker verification models relying on self-supervised learning backbones like Wav2Vec 2.0, HuBERT, and WavLM experience dramatic performance degradations when processing utterances shorter than three seconds. Short inputs lack crucial coarticulatory cues and prosodic contours needed for stable speaker embeddings. Prior remedies such as multi-segment aggregation demand multiple utterances at inference time, while meta-learning or data augmentation strategies fail to directly enrich frame-level feature sparsity.

## Method

The VAM-ECAPA architecture processes speech through a three-stage pipeline: feature extraction via a pre-trained WavLM backbone, feature enhancement via the TVAMSP module, and backend embedding generation via an ECAPA-TDNN encoder.

The TVAMSP module first passes the weighted-sum WavLM feature sequence through a standard Transformer layer with a residual connection to capture temporal context. The resulting context-aware queries are mapped against a learnable Vector Archive Library composed of G=4 distinct archives, each containing l2=149 vectors. Unlike standard cross-attention, these Keys and Values are fixed model parameters encoding canonical speaker traits learned during training. The mapping scores compute similarities between input frames and aggregated archive concepts to output enhanced features.

Finally, Attentive Statistics Pooling (ASP) computes weighted temporal means and standard deviations, generating an utterance-level summary vector that is broadcast and added back to every frame. The augmented sequence is fed into the ECAPA-TDNN encoder to extract a 192-dimensional L2-normalized speaker embedding optimized via AAM-Softmax loss.

## Experimental setup

Models are trained exclusively on the VoxCeleb2 development set and evaluated on the official VoxCeleb1 test set across original (Vox1-O), extended (Vox1-E), and hard (Vox1-H) trial lists. Performance is measured using Equal Error Rate (EER, %) and Minimum Detection Cost Function (MinDCF). The Vector Archive conceptual length is set to 149 frames (matching 3 seconds of WavLM features) with G=4 archives, and the backend uses an ECAPA-TDNN with SE-Res2Blocks.

## Results

On the 1-second Vox1-O test set, VAM-ECAPA achieves an EER of 8.334% and MinDCF of 0.536, representing a 54.8% relative error reduction compared to the standard WavLM+ECAPA-TDNN baseline (18.437% EER). On the difficult Vox1-H test list, 1-second EER drops from 20.449% down to 14.571% (a 28.7% relative improvement). Ablation studies show that removing the Vector Archive causes the sharpest drop (raising EER to 8.856%), confirming it as the core driver of performance. However, on 3-second or longer inputs where the WavLM backbone already yields stable features, VAM-ECAPA underperforms the unaugmented baseline due to unnecessary archive-based feature distortion.

| System | 3s EER (%) | 2s EER (%) | 1s EER (%) |
|---|---|---|---|
| Wav2vec 2.0 + ECAPA-TDNN | 2.968 | 6.202 | 19.009 |
| HuBERT + ECAPA-TDNN | 2.760 | 5.959 | 19.326 |
| WavLM + ECAPA-TDNN (Baseline) | 2.393 | 5.242 | 18.437 |
| WavLM + VAM-ECAPA (Ours) | 3.185 | 4.175 | 8.334 |

## Limitations

The system suffers from performance degradation on longer utterances (3 seconds or more) because the Vector Archive mapping distorts inherently rich, stable features. The current architecture lacks explicit supervision to force individual archives to capture distinct phonetic or speaker traits. Evaluation is restricted to clean VoxCeleb benchmarks without multi-language or noisy acoustic condition tests.

## Why read this

Speech researchers and engineers tackling short-duration speaker recognition (e.g., smart home voice commands or telephony verification) should read this paper to see how learnable memory-augmented vector libraries can directly patch frame-level information sparsity without needing multiple inference utterances.

## Code

- https://github.com/slp-lab-research/vam_ecapa

## Applications

Voice-activated device commands, phone-based automated authentication, and real-time short-segment speaker verification systems.

## Institutions / 機構

Korea University

**Funding / 經費:** Institute of Information Communications Technology Planning Evaluation, National Research Foundation of Korea, Ministry of Science and ICT, Ministry of SMEs and Startups, Supreme Prosecutor’s Office

## Related

- (link related pages by id as the wiki grows)
