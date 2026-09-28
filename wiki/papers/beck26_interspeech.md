---
id: beck26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2047
pdf: https://www.isca-archive.org/interspeech_2026/beck26_interspeech.pdf
---

# AppTek Call-Center Dialogues: A Multi-Accent Long-Form Benchmark for English ASR

[PDF](https://www.isca-archive.org/interspeech_2026/beck26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/beck26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2047)

**TL;DR** — The paper introduces the AppTek Call-Center Dialogues corpus, a 128.6-hour benchmark of spontaneous, role-played dialogues spanning 14 English accents, and benchmarks multiple open-source ASR systems to demonstrate substantial performance variations across accents and segmentation techniques.

## Problem

Evaluating conversational ASR robustness remains challenging because existing datasets rely heavily on pre-segmented, read speech or lack explicit dialect labels. Furthermore, large open-weight models risk contamination from web-scraped public training data, making dedicated evaluation sets essential. This benchmark specifically targets spontaneous, task-oriented agent-customer dialogues containing disfluencies, domain vocabulary, and diverse global accents.

## Method

The corpus comprises 1,746 single-channel recordings from 156 speakers across 14 English accents and 16 service-oriented domains, with an average duration of 10.4 minutes per session. Transcripts were manually produced following a strict verbatim protocol preserving disfluencies, hesitations, and repairs, followed by a multi-round quality assurance pipeline incorporating automated consistency checks. The authors benchmarked a wide range of open-source ASR architectures (including NVIDIA Canary/Parakeet, Qwen3-ASR, IBM Granite, Whisper, and others) using various input segmentation strategies such as manual slicing, proprietary segmenters, Silero VAD, and fixed-length chunks.

## Results

Across all models, manual segmentation consistently achieved the lowest word error rates (WER), though Qwen3-ASR models favored fixed 60-second chunks. Average WERs for systems like Parakeet v3, Whisper Large v3, and Qwen3-ASR ranged from roughly 7.4% to over 20% depending on the segmentation setup. Accent robustness analysis revealed performance gaps exceeding 10% absolute WER between the best- and worst-performing dialects for several models, indicating that strong aggregate performance does not ensure cross-accent generalization.

## Code

- https://huggingface.co/datasets/apptek-com

## Applications

Speech engineers and conversational AI developers building automated call-center systems or evaluating ASR robustness across diverse global English accents and long-form conversational inputs.

## Limitations

The dataset is designed exclusively for evaluation and analysis rather than model training.

## Related

- (link related pages by id as the wiki grows)
