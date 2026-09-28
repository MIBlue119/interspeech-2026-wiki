---
id: yan26b_interspeech
category: audio-captioning
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-619
pdf: https://www.isca-archive.org/interspeech_2026/yan26b_interspeech.pdf
---

# Consistent and Coherent Audio-Visual Understanding with Cross-Frame Patch Differential Attention and Cross-Modal Temporal Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/yan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-619)

**TL;DR** — This paper proposes C2 AVLM, an audio-visual language model featuring cross-frame patch differential attention and temporal aligned attention that achieves a state-of-the-art 50.30% accuracy on the AVSD benchmark.

## Problem

Current multimodal large language models typically process audio and video streams in separate pathways without proper temporal alignment or semantic correspondence. This separation leads to cross-modal inconsistencies, poor handling of fine-grained audio-visual events, and vulnerability to audio-driven hallucinations. Developing architectures that mirror human-like integrated perception across sights and sounds remains a significant open challenge in video understanding.

## Method

The framework integrates a pre-trained vision-language backbone with a Whisper-based audio encoder using three core mechanisms: 1) frame-level Rotary Position Encoding (RoPE) and inverse-ordered modality-specific Frequency Injection for global temporal coordinates; 2) Cross-Frame Patch Differential Attention (CFPDA) to track patch-level visual changes linked to audio events; and 3) Temporally Aligned Attention (TAA) with adaptive quality scoring and linear interpolation soft-masks. The model is trained using parameter-efficient fine-tuning on top of frozen base parameters, keeping the last four decoder layers and the language modeling head trainable. Training is performed on 8 A100 GPUs with batch size 8 using the AdamW-style setup for 1 epoch.

## Results

Evaluated on the Audio-Visual Scene-Aware Dialogue (AVSD) dataset, C2 AVLM achieves 50.30% accuracy, 9.09 BLEU-4, 29.00 ROUGE-L, and 89.87 BERTScore-F1, outperforming baselines like Qwen-2.5-Omni and InternVL-2.5. On out-of-domain tests, it reaches 80.2% F1 on audio-driven hallucination detection (AVHBench) and 50.7% accuracy on long-form temporal coherence (Video-MME without subtitles). Ablation studies confirm that removing RoPE, frequency injection, CFPDA, or cross-modal attention each causes performance drops, with their combination providing the optimal trade-off.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building multimodal dialogue systems, multimedia content analysis pipelines, audio-visual event localizers, and long-form video question-answering applications.

## Limitations

The paper notes some room for improvement in descriptive captioning tasks compared to specialized models.

## Related

- (link related pages by id as the wiki grows)
