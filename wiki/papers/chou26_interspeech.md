---
id: chou26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1238
pdf: https://www.isca-archive.org/interspeech_2026/chou26_interspeech.pdf
---

# Hidden Priors in Speech LLMs: Speaker Identity Shapes Emotional Perception

[PDF](https://www.isca-archive.org/interspeech_2026/chou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1238)

**TL;DR** — This paper investigates how textual prompt-injected speaker identity descriptors (accent, country, language) systematically alter emotion perception in speech LLMs while keeping audio fixed, and shows that lightweight LoRA mitigation effectively eliminates this identity-conditioned sensitivity.

## Problem

Speech LLMs power emotion-aware voice interactions in assistive and healthcare domains, but their affective predictions can be contaminated by hidden priors tied to speaker identity rather than acoustic evidence alone. Because prompt-based interfaces make it effortless to inject textual speaker descriptors, understanding whether and how identity statements bias downstream emotion judgment is vital for reliable deployment. This vulnerability complicates performance evaluation and exposes models to systematic biases based on perceived accents or regional backgrounds.

## Method

The authors introduce a controlled prompt perturbation framework using MSP-Podcast (English) and BIIC-Podcast (Mandarin) datasets, holding audio fixed while injecting 12 distinct speaker identity descriptors across accent, country, and language attributes (e.g., Brazilian accent, Egypt, Japanese language). They evaluate four pre-trained speech LLMs: Qwen2-Audio Instruct, Qwen3-Omni Instruct, Phi-4, and DeSTA2.5-Audio using deterministic decoding. Gradient-based saliency analysis via Captum measures acoustic focus shifts over the audio-token span via mean absolute deviation of cumulative distribution functions (CDFs) across identity prompts. To mitigate identity sensitivity, they freeze the audio encoder and fine-tune language model attention and FFN projections with lightweight LoRA (rank r=8, alpha=16, dropout=0.1) for 10 epochs using two prompt recipes: base prompts (no identity info) and mix prompts (uniformly sampled identity attributes).

## Results

Across all pre-trained models, identity-conditioned prompts yield statistically significant performance disparities under the spread-based F1gap metric confirmed via permutation tests (p < 0.005), with language cues driving the largest dispersion (e.g., Qwen2-Audio on MSP-Podcast shows angry F1 varying from 0.5808 for Yoruba to 0.4322 for Turkish). Saliency analysis reveals that cross-identity label transitions are accompanied by significantly larger acoustic focus shifts than non-transition cases (FDR-corrected p < 0.005). Applying the proposed LoRA adapters drastically reduces F1gap to near-zero levels (e.g., dropping Qwen2-Audio's language F1gap from 0.1239 to 0.0025 on MSP-Podcast using mix-prompt LoRA), making it statistically indistinguishable from the null permutation distribution. Furthermore, models with higher baseline macro-F1, such as DeSTA2.5-Audio, naturally exhibit lower overall identity sensitivity gaps.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building speech-based conversational agents, affective computing systems, and voice assistants across healthcare and customer service domains can use these auditing and mitigation techniques to ensure robust, unbiased emotion recognition.

## Limitations

The study only evaluates isolated single-attribute identity descriptors; real-world speakers embody richer, overlapping, and multidimensional identity attributes that remain underexplored.

## Related

- (link related pages by id as the wiki grows)
