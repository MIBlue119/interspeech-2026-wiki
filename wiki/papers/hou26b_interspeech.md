---
id: hou26b_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2593
pdf: https://www.isca-archive.org/interspeech_2026/hou26b_interspeech.pdf
---

# Correct Then Detect: Zero-Shot FVMC Annotation for Child Language Sample Analysis

*Shuwei Hou, Wei Bo, Varun Shijo, Chuhui Liu, Manav Kanaganapalli, Ling-Yu Guo, Wenyao Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/hou26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hou26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2593)

**TL;DR** — We propose a zero-shot framework for automated Finite Verb Morphology Composite (FVMC) annotation—a key metric for Developmental Language Disorder—by decomposing the task into verb-focused grammar correction followed by Universal Dependencies parsing and minimum-edit-distance alignment. Evaluated on the ENNI child narrative dataset, the best configuration achieves F1 scores of 97.05%, 60.15%, and 70.23% for correct, incorrect, and omitted obligatory contexts, outperforming top reasoning LLMs by up to 6.21 points.

## Key contributions

- Introduces the first automated pipeline for FVMC labeling and scoring in child language sample analysis, eliminating the need for manually annotated training corpora.
- Proposes a novel 'correction-then-detection' task decomposition framework that isolates grammar error correction to verb morphology, avoiding the hallucinations of direct end-to-end LLM prompting.
- Combines fine-grained grammar error correction (GECToR or prompted LLMs) with Stanza Universal Dependencies parsing and minimum edit distance alignment to recover correct, incorrect, and omitted obligatory contexts.
- Demonstrates state-of-the-art performance on the ENNI child narrative dataset, surpassing frontier reasoning models like GPT 5.2 Reasoning (High) and Claude Sonnet 4.6 Adaptive Thinking across all obligatory context error categories.

## Problem

Language sample analysis (LSA) relies heavily on the Finite Verb Morphology Composite (FVMC) to diagnose Developmental Language Disorder (DLD) by tracking accuracy across four tense morphemes: third-person singular -s, past tense -ed, copula be, and auxiliary be. Computing FVMC manually demands tedious expert analysis of obligatory tense contexts, hindering clinical deployment and large-scale research. Because no annotated corpora exist for direct supervised training, engineers have relied on prompting frontier large language models end-to-end. However, child utterances frequently contain severe grammatical disfluencies and errors that cause these direct reasoning models to hallucinate or fail multi-step rule enforcement, creating an urgent need for structured, zero-shot task decomposition.

## Method

The proposed pipeline processes children's narratives at the story level in three distinct stages. In Stage 1 (Grammar Error Correction), the system maps raw child utterances to a grammatically correct version while strictly constraining modifications to verb-related morphological edits (tense/form conversions and insertion of copula, auxiliary, or main verbs) and prohibiting all non-verb edits like noun number changes or word reordering. Two options are evaluated for this stage: GECToR (built on a RoBERTa encoder using a tailored subset of 20 VERB FORM transformations and specific be-verb replacement/append operations) and prompted frontier LLMs (GPT 5.2 or Sonnet 4.5) instructed to correct only verb morphology.

In Stage 2 (Obligatory Context Labeling), the corrected text is passed through Universal Dependencies models from the Stanza NLP toolkit to derive part-of-speech (POS) tags and morphological features. Rule-based filters then flag words as obligatory contexts for third-person singular -s, regular past -ed, copula be, or auxiliary be, while ignoring clauses without subjects, infinitive be, participles (being, been), gerunds, and irregular or overgeneralized forms. Because the input text is already grammatically corrected, Stanza operates under ideal conditions free of noise.

In Stage 3 (Alignment, Determination, and Calculation), minimum edit distance aligns the original utterance tokens with the corrected sequence. Edit operations determine final token-level FVMC labels: unmodified matches are 'correct obligatory', substitutions are 'incorrect obligatory', insertions are 'omitted obligatory', and unflagged tokens are 'non-obligatory'. The final FVMC score is computed as the ratio of correct obligatory contexts to the sum of correct, incorrect, and omitted contexts.

## Experimental setup

The framework is evaluated on the Edmonton Narrative Norms Instrument (ENNI) dataset containing narrative transcripts from 377 children (typically developing and DLD) across story-elicitation tasks, featuring 17,163 correct, 507 incorrect, and 272 omitted obligatory context labels verified by certified speech-language pathologists. Baselines include direct end-to-end prompting of six frontier models under default decoding parameters (temperature = 1.0, top_p = 1.0): Claude Sonnet 4.5, Claude Sonnet 4.6 Adaptive Thinking, GPT 5.2, and GPT 5.2 Reasoning (Low, Medium, High). Performance is evaluated using precision, recall, and F1 score for correct, incorrect, and omitted obligatory context categories.

## Results

The correction-then-detection architecture substantially outperforms all direct LLM baselines. For correct obligatory contexts, the GPT 5.2 + Stanza configuration achieves a headline F1 score of 97.05% (precision 96.87%, recall 97.23%), outperforming the strongest reasoning LLM baseline (GPT 5.2 Reasoning High at 95.06% F1). For incorrect obligatory contexts, Sonnet 4.5 + Stanza reaches an F1 of 60.15% (precision 48.43%, recall 79.37%), surpassing the best baseline (Sonnet 4.6 Adaptive Thinking at 55.43% F1) by 4.72 points. For omitted obligatory contexts, GPT 5.2 + Stanza reaches 70.23% F1 (precision 77.21%, recall 64.42%), beating Sonnet 4.6 Adaptive Thinking (64.02% F1) by 6.21 points.

Direct non-reasoning LLM baselines perform abysmally; for instance, direct GPT 5.2 scores below 5% F1 on incorrect (4.49%) and omitted (4.39%) categories, proving that raw end-to-end generation fails at complex linguistic rule tracking. Notably, the proposed framework achieves these superior results using standard non-reasoning GEC components paired with deterministic parsing, avoiding the massive computational overhead of high-level reasoning LLMs.

| Method | Correct F1 (%) | Incorrect F1 (%) | Omitted F1 (%) |
|---|---|---|---|
| Sonnet 4.5 (LLM-only) | 50.07 | 28.17 | 44.95 |
| Sonnet 4.6-AT (LLM-only) | 92.84 | 55.43 | 64.02 |
| GPT 5.2-R (High) (LLM-only) | 95.06 | 45.63 | 52.08 |
| Ours (GECToR + Stanza) | 96.77 | 46.86 | 28.87 |
| Ours (Sonnet 4.5 + Stanza) | 96.85 | **60.15** | 68.18 |
| Ours (GPT 5.2 + Stanza) | **97.05** | 56.41 | **70.23** |

## Limitations

The empirical evaluation is restricted entirely to a single narrative dataset (ENNI), leaving generalization to unscripted conversational speech or different clinical elicitation tasks unverified. While performance on correct contexts is near ceiling, F1 scores for incorrect (60.15%) and omitted (70.23%) contexts still exhibit room for improvement. Furthermore, the pipeline currently processes gold-standard manual transcripts rather than raw audio streams, requiring future integration with robust automatic speech recognition (ASR) to realize a fully end-to-end clinical assessment tool.

## Why read this

Researchers and engineers building automated speech and language assessment tools for clinical or educational applications should read this paper to learn how task decomposition (isolating GEC from syntax parsing and alignment) dramatically outperforms expensive end-to-end LLM reasoning prompts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening for Developmental Language Disorder (DLD) in telehealth, computer-assisted speech-language pathology training, and scalable educational language sample analysis.

## Related

- (link related pages by id as the wiki grows)
