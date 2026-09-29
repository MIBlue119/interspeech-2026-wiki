---
id: cho26b_interspeech
category: translation
labels: [low-resource, multilingual, self-supervised, dataset-or-benchmark-release]
institutions: ["National Yang Ming Chiao Tung University"]
code: https://github.com/Speech-AI-Research-Center/taigi-speech2chinese-subtitle
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2096
pdf: https://www.isca-archive.org/interspeech_2026/cho26b_interspeech.pdf
---

# A Multimodal Semi-Supervised Framework for Automatic Construction of a Cross-Lingual Taigi Speech-Chinese Subtitle Corpus

*Cheng-Hsiu Cho, Chih-Chung Kuo, Yu-Siang Lan, Chao-Shih Huang, Yan-Ming Lin, Yuan-Fu Liao*

[PDF](https://www.isca-archive.org/interspeech_2026/cho26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cho26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2096)

**Category:** `translation` · **Labels:** `low-resource`, `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — This paper presents a multimodal semi-supervised framework that combines an Audio-Visual-Language Model (AVLM) and Vision-Language Model (VLM) fusion to automatically build an 860-hour Taigi speech-Chinese subtitle corpus from unlabeled videos, reducing subtitle recognition CER from 36.8% to 9.3%.

## Key contributions

- Proposes a trimodal AVLM framework combining SigLIP (vision), Whisper Large-V2 (audio), and Qwen2.5-7B (LLM) using early fusion and LoRA fine-tuning for robust cross-lingual subtitle extraction.
- Introduces an iterative pseudo-label refinement loop leveraging OCR and AVLM hypotheses filtered by consensus and fused via a VLM instructed to reference video frames.
- Constructs a large-scale, high-precision 860-hour Taigi speech-Chinese subtitle corpus from raw online videos.
- Demonstrates substantial downstream improvements, cutting Whisper Large-V2's cross-lingual transcription CER from 57.8% to 37.8% and doubling Qwen2.5-14B Taigi-Chinese translation BLEU from 0.2016 to 0.4033.

## Problem

Low-resource languages like Taigi suffer from a severe scarcity of digital training resources, restricting modern AI advancement. While online audiovisual content is plentiful, it presents a difficult cross-lingual setup where spoken audio is in Taigi but hardcoded video subtitles are in Traditional Chinese, lacking aligned transcript files. Traditional OCR struggles with visual noise and lacks semantic context, whereas Vision-Language Models frequently hallucinate details absent from the video frames. This mismatch prevents standard automatic speech recognition or corpus collection methods from scaling effectively without manual intervention.

## Method

The framework operates in two main stages: initial video preprocessing and iterative pseudo-label refinement. For unlabeled videos, PaddleOCR extracts raw subtitle text candidates while a trimodal AVLM generates competing text hypotheses. The AVLM architecture consists of a SigLIP vision encoder, a Whisper Large-V2 audio encoder (fine-tuned on Taigi), and a Qwen2.5-7B LLM decoder. Visual and audio features are projected into the LLM embedding space via two-layer GELU-MLP connectors (following LLaVA) and concatenated via an early-fusion strategy. The AVLM is trained using LoRA while freezing the vision and audio encoders.

In the iterative refinement loop, OCR and AVLM candidates are compared using a CER-based threshold filter (consensus threshold < 0.25). Pairs passing the filter are sent to a VLM (Qwen2.5-VL-7B) for fusion using specialized prompts (Prompt #3: Visual Judgment) that explicitly inform the model of OCR and AVLM error patterns and instruct it to use the source image as ground truth. High-confidence fused pseudo-labels are used to fine-tune the AVLM over multiple rounds, expanding the extracted data pool from 156 hours (31%) in Round 0 to 434 hours (87%) by Round 3. Finally, forced alignment yields precisely timed audio-text pairs, scaling up to an 860-hour final corpus.

## Experimental setup

Evaluated on the PTS-Taigi dataset (134.33 hours training, 12.32 hours test) and a self-constructed 'Golden Set' benchmark comprising 7.76 hours of Taigi speech (13,086 sentences) from non-PTS sources across diverse genres. Baselines include bimodal models (VLM: SigLIP + Qwen2.5-14B; ALM: Whisper Large-V2 + Qwen2.5-14B) and varying Qwen2.5 model sizes (7B, 14B, VL-7B) with different prompt complexities. Metrics include Character Error Rate (CER) for subtitle recognition and transcription, and BLEU score for translation.

## Results

On the PTS-Taigi test set, the initial supervised AVLM achieved a CER of 7.46%, outperforming the VLM (10.26%) and ALM (35.29%). Under visual noise (Gaussian blur radius 3) and auditory noise (SNR 0 dB), the AVLM demonstrated significantly smaller degradation than bimodal variants. In iterative refinement on the Golden Set, prompt engineering proved critical: Prompt #3 (Visual Judgment) with Qwen2.5-VL-7B yielded a superior CER of 15.80% compared to direct merging (60.95%). Across 3 iterative rounds, the AVLM's CER on the Golden Set dropped from 36.8% to 9.3%. Downstream fine-tuning of Whisper Large-V2 with the 860-hour corpus reduced transcription CER from 57.8% to 37.8% and improved BLEU from 0.3112 to 0.4815. Fine-tuning Qwen2.5-14B on 590k parallel sentence pairs doubled its translation BLEU score from 0.2016 to 0.4033.

| System / Condition | Modality / Setup | CER (%) | BLEU |
|---|---|---|---|
| VLM Baseline | SigLIP + Qwen2.5-14B | 10.26 | - |
| ALM Baseline | Whisper Large-V2 + Qwen2.5-14B | 35.29 | - |
| AVLM (Proposed) | Whisper + SigLIP + Qwen2.5 | **7.46** | - |
| Whisper Large-V2 (Base) | 134h PTS-Taigi Train | 57.8 | 0.3112 |
| Whisper Large-V2 (Tuned) | 134h + 860h Pseudo-labels | **37.8** | **0.4815** |
| Qwen2.5-14B Translation | Before / After 590k Corpus | - | 0.2016 $\rightarrow$ **0.4033** |

## Limitations

The framework relies heavily on the presence of hardcoded subtitles in source videos, restricting its applicability to video data where subtitles are entirely absent. The iterative pipeline requires substantial compute resources for multi-round VLM inference and LLM fine-tuning. Additionally, evaluation is tightly coupled to Taigi-Chinese language pairs, and performance may vary when transferred to highly divergent low-resource languages with complex writing systems or unstructured video layouts.

## Why read this

Researchers building low-resource speech corpora or cross-lingual speech-translation systems will find a complete blueprint for bootstrapping supervised data from unlabeled multimodal video. It uniquely demonstrates how to combine OCR, audio encoders, and vision-language models into an iterative feedback loop that filters out hallucinations and visual noise.

## Code

- https://github.com/Speech-AI-Research-Center/taigi-speech2chinese-subtitle

## Applications

Cross-lingual automatic speech recognition, machine translation, and low-resource speech dataset construction for educational and archival media.

## Institutions / 機構

National Yang Ming Chiao Tung University

## Related

- [VāṇīSetu: A Human-AI Collaborative Framework for Scalable Conversational Speech Corpus Creation in Low-Resource Settings](kumar26h_interspeech.md) — same problem · relatedness 2.0/3
- [Towards Enabling Multilingual Multitask SpeechLLMs in Data-Scarce Settings](fong26b_interspeech.md) — same problem · relatedness 1.9/3
- [Leveraging Audio-LLMs to Filter Speech-to-Speech Training Data](chen26l_interspeech.md) — same problem · relatedness 1.9/3
- [Speech Recognition on TV Series with Video-Guided Post-ASR Correction](yang26o_interspeech.md) — shared technique · relatedness 1.9/3
- [Genealogical Priors in Self-Supervised Learning: Improving Speech Technology for Low-Resource Languages](granda26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
