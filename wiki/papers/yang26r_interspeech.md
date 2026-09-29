---
id: yang26r_interspeech
category: asr
labels: [efficient-on-device, streaming-real-time]
institutions: ["Kyoto College of Graduate Studies for Informatics"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3380
pdf: https://www.isca-archive.org/interspeech_2026/yang26r_interspeech.pdf
---

# A Compact Fully-Open Cache-Aware Streaming Model for Japanese ASR

*Yinchang Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3380)

**Category:** `asr` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — This paper presents a 123M-parameter fully-open hybrid RNNT/CTC FastConformer model for Japanese ASR that supports cache-aware streaming, achieving an average CER of 12.4% while outperforming models 5-8x larger.

## Key contributions

- First fully-open Japanese ASR model combining open weights, data preparation manifests, code, and logs with cache-aware streaming capability.
- A 2x2 factorial study of CER-stratified pre-training data curation on 35K hours of ReazonSpeech, isolating interactions between data filtering, model capacity, and fine-tuning scope.
- Progressive multi-domain fine-tuning across 507 hours over five Japanese speech domains, featuring a newly curated TEDxJP-20h lecture training split.
- Achieves 12.4% average CER (RNNT) across five test sets, outperforming 1B OWSM-CTC v4 (13.5%) and 619M ReazonSpeech NeMo-v2 (14.1%) while running at RTFx 1220 (offline) and 446 (streaming).

## Problem

Many high-performing Japanese ASR systems are either closed-source, lack public training recipes, or operate exclusively in offline mode requiring full utterances before output. Building open streaming systems faces a severe data challenge because large open corpora like ReazonSpeech consist entirely of terrestrial TV broadcasts, leaving lecture and conversational domains underrepresented. Existing models like Whisper, NVIDIA parakeet, and OWSM either lack full openness, streaming recipes, or complete reproducibility. This prevents reliable on-device, real-time deployment and open research in Japanese speech recognition.

## Method

The model utilizes a FastConformer-Hybrid-Transducer-CTCBPE-Streaming architecture implemented in NVIDIA NeMo. The 17-layer encoder has d_model = 512 with 8x depthwise-striding subsampling (108M parameters), paired with an RNNT decoder (9.2M) and a CTC auxiliary decoder (weight 0.3, 2.1M), totaling 123M parameters operating on 80-dimensional mel-filterbanks with 10 ms frame shift. Cache-aware multi-context attention uses chunked limited context, uniformly sampling configurations [L,R] from {[70,13], [70,6], [70,1], [70,0]} during training to enable zero-retraining latency-accuracy trade-offs at inference (ranging from 1.04s lookahead down to 0 ms for fully causal streaming).

Pre-training is performed on ReazonSpeech v2 (35K hours) using AdamW (lr=2.0, 15K warmup steps, min lr=5x10^-6), EMA decay (0.9995), SpecAugment, and fastemit regularization (lambda=10^-4). The CER-stratified pre-training strategy transcribes raw data using parakeet-0.6b-ja, drops utterances with CER > 20%, and samples from three quality bands ([0,1], (1,5], (5,20]) with weights 0.65, 0.25, and 0.10 respectively. Fine-tuning uses AdamW with lr=0.6, progressively incorporating a 507-hour multi-domain mixture comprising MCV read speech, TEDxJP-20h lectures, MSR-86K mixed data, BTSJ-1000 conversation (segmented via NeMo Forced Aligner), and FLEURS-ja read speech.

## Experimental setup

Evaluated across five test domains: JSUT basic5000 (read, 5K utts), MCV 16.1 test (crowd-sourced), TEDxJP-10K (lecture), FLEURS-ja test (read), and SPREDS-D1 (simulated meeting). Compared against baselines including Whisper-large-v3, parakeet-0.6b-ja, espnet-str, ReazonSpeech NeMo-v2, and OWSM-CTC v4. Metrics include Greedy CER (%) with text normalized by NFKC, Japanese num2words, and non-letter removal, alongside Real Time Factor inverse (RTFx) measured on a single NVIDIA RTX 6000 Ada (48 GB) GPU. Training completes in ~800 total GPU hours on 4x RTX 6000 Ada GPUs.

## Results

Our 123M model achieves an average CER of 12.4% (RNNT) / 13.8% (CTC) with an offline RTFx of 1220.4 and a streaming RTFx of 446. It outperforms larger fully-open systems such as OWSM-CTC v4 (13.5% CER, 1.01B params) and ReazonSpeech NeMo-v2 (14.1% CER, 620M params). Ablations show that adding TEDxJP-20h fine-tuning drops TEDxJP-10K CER from 25.80% to 13.71%, while BTSJ conversation data improves SPREDS meeting CER from 18.53% to 16.79%.

Under streaming context degradation from [70,13] (1040 ms lookahead) to [70,0] (0 ms lookahead), average RNNT CER increases marginally from 12.39% to 14.04%, showing strong causal robustness. However, the model does not beat the 600M parakeet baseline (10.0% CER) or Whisper-large-v3 (10.7% CER) on pure read-speech benchmarks like FLEURS-t where scale dominates.

| Model | Arch. | Size | Avg. CER ↓ | RTFx ↑ |
|---|---|---|---|---|
| Whisper-large-v3 | AED | 1.55B | 10.7 | 37.3 |
| parakeet-0.6b-ja | TDT/CTC | 0.6B | 10.0 / 10.1 | 881.3 |
| espnet-str | CTC | 0.15B | n/a / 16.1 | 0.69 |
| ReazonSpeech NeMo-v2 | RNNT | 0.62B | 14.1 / n/a | 636.6 |
| OWSM-CTC v4 | CTC | 1.01B | n/a / 13.5 | 45.1 |
| M1-6 (Ours) | RNNT/CTC | 0.12B | 12.4 / 13.8 | 1220.4 |

## Limitations

The study is restricted to the Japanese language, relying on pre-training data derived from a single dominant TV broadcast corpus (ReazonSpeech) which may introduce domain biases despite filtering. The fine-tuning pool is relatively small (~507 hours), and evaluation is limited to five test sets without external language models. Furthermore, complex multi-domain fine-tuning combined with increased decoder prediction network depth can trigger negative transfer or capacity interference on specific lecture domains.

## Why read this

Speech researchers and engineers building real-time, on-device Japanese speech recognition systems should read this paper to learn how to pair a compact 123M FastConformer with cache-aware attention and a fully reproducible open pipeline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time on-device speech transcription, streaming voice assistants, IoT voice interfaces, and live meeting captioning for Japanese.

## Institutions / 機構

Kyoto College of Graduate Studies for Informatics

## Related

- [Argmax Pro: Frontier-level Real-time Speech-to-text with Speakers and Custom Vocabulary on Mobile Devices](angus26_interspeech.md) — same problem · relatedness 2.0/3
- [Reducing the Offline-Streaming Gap for Unified ASR Transducer with Consistency Regularization](andrusenko26_interspeech.md) — same problem · relatedness 1.9/3
- [BACON: Boundary-Aware Convolution for Streaming Conformer Models](xu26o_interspeech.md) — same problem · relatedness 1.9/3
- [Pushing the Limits of Compression: Sub-1-Bit Conformer via Variable-Rank Binary Decomposition](yeo26_interspeech.md) — same problem · relatedness 1.9/3
- [Token-Independent Language Representations for Low-Latency Configurable Multilingual Speech Recognition](zhu26c_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
