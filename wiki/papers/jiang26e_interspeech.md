---
id: jiang26e_interspeech
category: health-clinical
labels: [low-resource, generative-model]
institutions: ["Tianjin University", "China Telecom"]
code: https://jiangyu1205.github.io/Data-Augmentation-for-Alzheimer-s/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1724
pdf: https://www.isca-archive.org/interspeech_2026/jiang26e_interspeech.pdf
---

# Cognitive-Heuristic Guided Multimodal Data Augmentation for Alzheimer’s Disease Detection Using LLM and TTS

*Yu Jiang, Cheng Gong, Bin Wen, Ruihao Jing, Tianrui Wang, Shansong Liu, Boyu Zhu, Yuheng Lu, Xuanchen Li, Xiao Wei, Chunyu Qiang, Xiao-Lei Zhang, Longbiao Wang, Jianwu Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1724)

**Category:** `health-clinical` · **Labels:** `low-resource`, `generative-model`

**TL;DR** — This paper proposes a cognitive-heuristic guided multimodal data augmentation framework for speech-based Alzheimer's disease (AD) detection, combining RAG-enhanced text generation with attribute-guided TTS to reproduce authentic clinical markers of cognitive decline. On the ADReSSo benchmark, integrating this augmented data improves the accuracy of the CogniAlign model from 0.789 to 0.831.

## Key contributions

- Multimodal cognitive alignment framework that maps real-world patient behavioral statistics to anchor both text and speech synthesis.
- Dual-source RAG-enhanced text generation pipeline using clinical expert knowledge bases and exemplary corpora to constrain LLMs against unconstrained hallucination.
- Attribute-guided TTS system (built on CosyVoice2) driven by cognitive latent vectors to reproduce AD-specific acoustic pauses, fillers, and speech rate irregularities.
- Comprehensive validation demonstrating consistent performance gains across multiple AD detection architectures (ERNIE, MM-AD, and CogniAlign) on standard benchmarks.

## Problem

Speech-based Alzheimer's disease detection is severely constrained by data scarcity due to patient privacy and ethical restrictions, leaving publicly available datasets small and poorly annotated. Existing single-modality data augmentation strategies—such as traditional text synonym replacement, back-translation, acoustic perturbations, or standard voice conversion—fail to preserve the intricate alignment between speech and text. Furthermore, they ignore clinical cognitive decline signatures like linguistic disfluencies, reduced lexical diversity, and abnormal pause patterns, yielding insufficient training data for robust clinical generalization.

## Method

The framework operates in three sequential stages: data annotation, knowledge-constrained text generation, and attribute-guided speech synthesis. First, real-world AD characteristics are quantified into a 3D cognitive attribute vector c = [f_flu, f_lex, f_aco] scaling linguistic fluency (non-lexical fillers like "uh"/"um"), lexical complexity (Moving-Average Type-Token Ratio / MATTR), and acoustic fluency (pause-to-speech ratio and speech rate fluctuations).

Second, a dual-source Retrieval-Augmented Generation (RAG) strategy queries an Expert Knowledge Base (K_exp) and Exemplary Corpora (K_exe). Through a Hierarchical Instruction Mapping mechanism, the vector c translates into behavioral constraint prompts via semantic constrainment (Φ_lex mapping lexical scores to deictic substitutions), rhythmic perturbation (Φ_flu mapping disfluency scores to filler insertions and self-repairs), and temporal anchoring (Φ_aco mapping acoustic scores to <pause> tags). This allows an LLM to generate AD-styled scripts T_syn that preserve cognitive markers without hallucination.

Third, an attribute-guided text-to-speech system based on CosyVoice2 is fine-tuned to condition audio generation on both speaker identity embeddings s_j and a cognitive latent representation z_i derived directly from T_syn. This forces the TTS engine to explicitly render acoustic silences and hesitations corresponding to textual markers, prioritizing real-world clinical distributional realism over pristine vocal reconstruction.

## Experimental setup

Experiments utilize the ADReSSo dataset (237 samples for detection training and testing) and the DementiaBank Pitt Corpus (for fine-tuning the attribute-guided TTS model). Raw audio is preprocessed via Demucs for noise separation and WhisperX for sentence-level segmentation and 30-second slicing, yielding ~80,000 training samples. Evaluated baseline architectures include CogniAlign, MM-AD, and ERNIE (Yuan), compared against traditional text augmentations (deletion/insertion, back-translation, fine-tuned GPT-2) and speech augmentations (acoustic perturbations, SeedVC, raw TTS). Models are evaluated using Accuracy, F1-score, Recall, and Precision. Text generation is additionally evaluated via Perplexity (PPL), MATTR, Distinct-2, and SBERT similarity. CosyVoice2 is fine-tuned for 10 epochs on a single NVIDIA H100 GPU.

## Results

Incorporating the proposed multimodal augmentation at a 1:1 ratio boosts the Accuracy of the ERNIE model from 0.718 to 0.747 (F1 from 0.630 to 0.735), MM-AD from 0.732 to 0.803 (F1 from 0.708 to 0.821), and CogniAlign from 0.789 to 0.831 (F1 from 0.783 to 0.833). In text-only evaluations, the proposed LLM+RAG text augmentation achieves an accuracy of 0.857 and F1 of 0.853, outperforming back-translation (0.829 Acc) and fine-tuned GPT-2 (0.829 Acc). In speech-only evaluations, adding cognitive labels to the attribute-guided TTS improves CogniAlign's F1 to 0.833 compared to raw-data TTS (0.817) and voice conversion (0.806).

Data-scale sensitivity analysis reveals that expanding the training data beyond 2.0× to 2.5× leads to performance degradation (dropping CogniAlign accuracy back to 0.789), showing that over-augmentation induces overfitting or redundancy.

| System / Condition | Accuracy | F1-Score | Recall | Precision |
|---|---|---|---|---|
| ERNIE (ADReSSo baseline) | 0.718 | 0.630 | 0.486 | 0.895 |
| ERNIE + Ours | 0.747 | 0.735 | 0.714 | 0.758 |
| MM-AD (ADReSSo baseline) | 0.732 | 0.708 | 0.657 | 0.767 |
| MM-AD + Ours | 0.803 | 0.821 | 0.914 | 0.744 |
| CogniAlign (ADReSSo baseline) | 0.789 | 0.783 | 0.771 | 0.794 |
| CogniAlign + Ours | 0.831 | 0.833 | 0.857 | 0.811 |

## Limitations

The framework's scope is bounded by its reliance on English-language dementia corpora (ADReSSo and DementiaBank Pitt Corpus), limiting direct multilingual generalization without re-indexing culturally and linguistically specific cognitive markers. The evaluation scale is restricted to relatively small benchmark datasets (237 samples in ADReSSo), and scaling up synthetic data beyond 2.0× introduces diminishing returns or overfitting. Furthermore, synthesizing extreme pathological speech features can occasionally trade off precision for recall in specific neural backbones.

## Why read this

Speech and ML researchers tackling data scarcity in clinical health monitoring will find this paper essential reading for its principled approach to grounding generative LLM and TTS pipelines in medical cognitive heuristics. Readers will take away a concrete blueprint for enforcing linguistic-acoustic consistency in synthetic health data.

## Code

- https://jiangyu1205.github.io/Data-Augmentation-for-Alzheimer-s/

## Applications

Non-invasive early screening and continuous remote monitoring of Alzheimer's disease and related neurodegenerative cognitive disorders.

## Institutions / 機構

Tianjin University, China Telecom

## Related

- [LoRA-Tuned Large Language Models for Dementia Detection via Multi-View Speech-Derived Features](park26c_interspeech.md) — same problem · relatedness 2.9/3
- [CoSTA: Cognitive-State-Conditioned TTS Data Augmentation Using ASR Transcripts for Alzheimer’s Disease Detection](liu26_interspeech.md) — same problem · relatedness 2.9/3
- [Listening Between the Lines: Joint Learning of ASR Embeddings and LLM-Augmented Linguistics for Dementia Detection](jung26_interspeech.md) — same problem · relatedness 2.8/3
- [Gated Multi-graph Fusion via Graph Attention Networks for Alzheimer’s Disease Detection](li26ga_interspeech.md) — same problem · relatedness 2.8/3
- [Synthetic Pathological Speech at Scale: A Flow Matching Approach for Clinical Data Augmentation](koudounas26_interspeech.md) — same problem · relatedness 2.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
