---
id: zhang26w_interspeech
category: speech-coding
labels: [dataset-or-benchmark-release]
institutions: ["Hunan University", "Xiaomi", "Yuelushan Center for Industrial Innovation"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1588
pdf: https://www.isca-archive.org/interspeech_2026/zhang26w_interspeech.pdf
---

# BACH: Benchmarking Audio Codecs for Bio-Acoustic Health

*Zixing Zhang, Xiaojun Mo, Zhongren Dong, Bin Wang, Jing Han*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1588)

**Category:** `speech-coding` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — BACH is the first systematic benchmark evaluating eight neural audio codecs across five bio-acoustic health datasets, revealing a fundamental misalignment between signal reconstruction fidelity and downstream diagnostic classification performance.

## Key contributions

- Proposed BACH, the first systematic benchmark for evaluating neural audio codecs specifically on bio-acoustic health tasks.
- Introduced a three-view evaluation framework assessing performance on original audio, compressed codec representations, and reconstructed audio.
- Benchmarked eight representative neural audio codecs covering multi-codebook, single-codebook, decoupling, and semantic paradigms.
- Uncovered a critical trade-off between perceptual reconstruction quality and semantic retention of clinical/diagnostic cues.

## Problem

Remote healthcare applications require compressing high-dimensional bio-acoustic signals (like heartbeats, lung sounds, and snoring) for efficient transmission without losing diagnostic value. While general audio and speech codecs like DAC and EnCodec achieve high compression and perceptual quality, it remains unclear whether they preserve fine-grained, irregular biological cues required for medical diagnostics. Prior work on bio-acoustic classification relies on handcrafted features or raw spectrograms without considering low-bitrate compression constraints. This creates a bottleneck in clinical adoption, as existing codecs are optimized purely for human perception rather than medical diagnostic fidelity.

## Method

The evaluation pipeline evaluates eight neural audio codecs—including DAC, EnCodec, WavTokenizer, BigCodec, SpeechTokenizer, FACodec, UniCodec, and SemantiCodec—standardized to extremely low bitrates of approximately 1 kbps. To ensure a fair comparison, the benchmark tests three distinct domains: the original audio domain, the compressed domain (using discrete codec token representations directly), and the reconstructed domain (where audio is decoded and processed through a pretrained HuBERT feature extractor). The downstream classification head uses a unified architecture consisting of a linear mapping layer for dimensionality alignment, followed by a Transformer Encoder to model contextual dependencies, and a feed-forward layer for final classification.

Codecs are categorized by architecture: multi-codebook residual vector quantization (RVQ) models like DAC (24kHz, 2 codebooks, 75 token rate, 74.7M params) and EnCodec (24kHz, 2 codebooks, 75 token rate, 14.9M params); single-codebook models like WavTokenizer (24kHz, 1 codebook, 4,096 size, 80.6M params) and BigCodec (16kHz, 1 codebook, 8,192 size, 159.4M params); decoupled semantic-acoustic models like SpeechTokenizer (16kHz, 3 codebooks with the first dedicated to HuBERT-derived semantics, 103.7M params), FACodec (16kHz, factorized subspaces for content/prosody/timbre, 374.5M params); and dual-encoder/mixture-of-experts designs like UniCodec and SemantiCodec. These architectural choices dictate how well linguistic or biological semantics are isolated in early codebook layers versus acoustic details in deeper layers.

## Experimental setup

Evaluated on five bio-acoustic datasets: Snoring (0.28 hrs, 1,000 samples), HeartSound (0.68 hrs, stethoscope-acquired, 5 classes, 1,000 samples), ICBHI (5.49 hrs, lung sounds, 8 classes, 920 samples), MSTI (8.47 hrs, 25 categories, 6,661 samples), and VocalSound (24.37 hrs, laughter/coughs/sneezes, 6 classes, 21,024 samples). Classifiers are trained using the AdamW optimizer with a learning rate of 5e-4, batch size of 32, and 50 epochs. Downstream metrics include Accuracy (Acc) and F1-Score (F1), while signal reconstruction is evaluated via UTMOS, PESQ, and STOI.

## Results

Decoupled architectures like SpeechTokenizer and FACodec achieve superior downstream task performance despite lower reconstruction scores. For instance, on the HeartSound dataset in the compressed domain, FACodec achieves 99.5% Accuracy/F1 and SpeechTokenizer achieves 97.5%, whereas high-fidelity general audio codecs struggle on specialized multi-class medical tasks. Conversely, codecs optimized for perceptual fidelity (such as BigCodec and EnCodec) achieve high PESQ and UTMOS reconstruction scores—such as BigCodec reaching a PESQ of 2.04 and UTMOS of 2.70 on MSTI—but fail to yield top-tier classification accuracy when semantic cues are discarded by the quantization bottleneck. Ablations on codebook depth reveal that increasing the number of RVQ codebooks improves signal reconstruction fidelity (e.g., higher PESQ) but yields negligible gains on downstream bio-acoustic classification tasks due to the inherent brevity and sparse nature of signals like snoring.

| Model | Snoring Rec. Acc/F1 | HeartSound Rec. Acc/F1 | ICBHI Rec. Acc/F1 | MSTI Rec. Acc/F1 | VocalSound Rec. Acc/F1 |
|---|---|---|---|---|---|
| Original | 96.0 / 96.0 | 100.0 / 100.0 | 94.5 / 93.2 | 78.2 / 78.1 | 90.6 / 90.6 |
| DAC | 90.0 / 90.0 | 99.0 / 99.0 | 89.8 / 90.2 | 50.4 / 50.2 | 87.9 / 87.9 |
| Encodec | 92.0 / 92.0 | 99.5 / 99.5 | 88.5 / 89.0 | 58.5 / 58.0 | 89.7 / 89.7 |
| WavTokenizer | 93.0 / 93.0 | 99.5 / 99.5 | 86.1 / 89.1 | 65.1 / 65.3 | 88.5 / 88.5 |
| SpeechTokenizer | 90.0 / 90.0 | 99.0 / 99.0 | 91.6 / 90.4 | 66.4 / 65.9 | 87.1 / 87.1 |
| FACodec | 100.0 / 100.0 | 99.0 / 99.0 | 92.9 / 92.4 | 42.8 / 42.1 | 85.3 / 85.3 |

## Limitations

The study is restricted to extreme low-bitrate settings (~1 kbps) and evaluates codecs pre-trained primarily on speech, music, or general environmental audio without domain adaptation on bio-acoustic health data. Evaluation is limited to five specific classification tasks, omitting continuous monitoring scenarios, streaming robustness, and noisy real-world clinical environments with artifacts.

## Why read this

Audio codec researchers and digital health engineers should read this paper to understand why state-of-the-art neural audio codecs fail to preserve medical diagnostic information despite high perceptual reconstruction metrics, guiding future joint optimization of perceptual and semantic fidelity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Remote patient monitoring, automated auscultation analysis, wearable health diagnostic devices, and ultra-low-bandwidth telemedicine transmission.

## Institutions / 機構

Hunan University, Xiaomi, Yuelushan Center for Industrial Innovation

**Funding / 經費:** Beijing Xiaomi Mobile Software Co., Ltd, National Natural Science Foundation of China, National Science and Technology Major Project of China, Science and Technology Innovation Program of Hunan Province

## Related

- [ClinAware: Speech Enhancement Needs Clinical Awareness](kachare26_interspeech.md) — same problem · relatedness 2.1/3
- [Towards Detecting Neural Audio Codec Synthesized Heart Sounds](girish26_interspeech.md) — shared data / evaluation · relatedness 2.1/3
- [HybridCodec: Fast Dual-Stream, Semantically Enhanced Neural Audio Codec](gangwar26_interspeech.md) — complementary · relatedness 1.9/3
- [Discrete vs. Continuous: A Comprehensive Study of Unified Audio Understanding in LALMs](peng26h_interspeech.md) — shared data / evaluation · relatedness 1.9/3
- [Representational Instability in Decoupled Audio Encoders](variani26_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
