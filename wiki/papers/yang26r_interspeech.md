---
id: yang26r_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3380
pdf: https://www.isca-archive.org/interspeech_2026/yang26r_interspeech.pdf
---

# A Compact Fully-Open Cache-Aware Streaming Model for Japanese ASR

[PDF](https://www.isca-archive.org/interspeech_2026/yang26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3380)

**TL;DR** — A 123M-parameter fully-open Japanese ASR model combining FastConformer, cache-aware streaming, and hybrid RNNT/CTC decoding achieves an average CER of 12.4% while providing 1220 RTFx throughput.

## Problem

Existing Japanese ASR systems either lack full openness (missing weights, logs, or data preparation scripts) or operate exclusively in offline mode without streaming capabilities. Furthermore, large public corpora like ReazonSpeech are heavily biased toward TV broadcasts, leaving domains such as lectures, spontaneous conversations, and read speech severely underrepresented.

## Method

The architecture builds upon a 17-layer FastConformer encoder (108M parameters) with an 8x depthwise-striding subsampling, paired with a 9.2M RNNT decoder and a 2.1M CTC decoder. It adopts cache-aware multi-context attention, uniformly sampling four context configurations during training to support flexible latency-accuracy trade-offs at inference. The pre-training phase leverages 35K hours of ReazonSpeech v2 with CER-stratified data curation, followed by progressive multi-domain fine-tuning across ~507 hours across five domains, including a newly curated 20-hour TEDxJP split and filtered MSR-86K data.

## Results

Evaluated across five test sets (JSUT, MCV 16.1, TEDxJP-10K, FLEURS-ja, and SPREDS-D1) using greedy decoding without an external LM, the model achieves an average CER of 12.4% with RNNT and 13.8% with CTC. It outperforms the 1B-parameter OWSM-CTC v4 (13.5%) and the 619M ReazonSpeech NeMo-v2 (14.1%) despite being 5-8x smaller. In cache-aware streaming mode with a 1.04-second look-ahead ([70,13]), the average CER is 12.39% for RNNT, and the model maintains an RTFx of 446 (and 1220 in offline mode).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time, on-device Japanese speech transcription applications for smartphones and IoT devices where bounded latency and full open-source reproducibility are required.

## Limitations

Combining CER-stratified pre-training data curation with multi-domain fine-tuning and increased decoder capacity (pred rnn layers = 2) leads to performance degradation on specific lecture domains.

## Related

- (link related pages by id as the wiki grows)
