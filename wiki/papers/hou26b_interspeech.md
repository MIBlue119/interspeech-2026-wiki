---
id: hou26b_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2593
pdf: https://www.isca-archive.org/interspeech_2026/hou26b_interspeech.pdf
---

# Correct Then Detect: Zero-Shot FVMC Annotation for Child Language Sample Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/hou26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hou26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2593)

**TL;DR** — This paper presents a zero-shot framework that decomposes finite verb morphology assessment into grammar error correction and context detection, achieving F1 scores of 97.05%, 60.15%, and 70.23% on correct, incorrect, and omitted verb contexts.

## Problem

Computing the Finite Verb Morphology Composite (FVMC)—a clinically validated metric for Developmental Language Disorder—requires labor-intensive manual annotation of obligatory tense contexts by speech-language pathologists. Because no annotated corpora exist for supervised training and child utterances contain rich grammatical noise and disfluencies, direct end-to-end prompting of state-of-the-art LLMs often leads to hallucinations and unreliable clinical scoring.

## Method

The framework operates in three sequential stages: restricted grammar error correction (GEC) targeting only verb-related morphological changes and omissions using either GECToR or prompt-guided LLMs; morphosyntactic parsing of the corrected text via Stanza Universal Dependencies to identify obligatory tense contexts while filtering out unconstrained forms; and minimum edit distance alignment between original and corrected text to classify each obligatory context as correct, incorrect, or omitted.

## Results

Evaluated on the ENNI child narrative dataset containing samples from typically developing children and those with Developmental Language Disorder, the method is benchmarked against direct end-to-end LLM baselines including GPT 5.2 Reasoning models and Claude Sonnet 4.6. The proposed pipeline improves F1 scores over the strongest baseline models by 1.99 points on correct contexts, 4.72 points on incorrect contexts, and 6.21 points on omitted contexts, reaching top F1 marks of 97.05%, 60.15%, and 70.23% respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and automated clinical screening systems can use this framework for scalable, cost-efficient language sample analysis and developmental language disorder assessment.

## Related

- (link related pages by id as the wiki grows)
