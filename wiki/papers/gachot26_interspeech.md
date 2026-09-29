---
id: gachot26_interspeech
category: speech-llm-dialogue
labels: [generative-model]
institutions: ["University of Hamburg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2768
pdf: https://www.isca-archive.org/interspeech_2026/gachot26_interspeech.pdf
---

# A Generalized Formalism of Auto-Regressive Decoding for Speech Processing

*Julia Gachot, Philipp Allgeuer, Marie S. Bauer, Stefan Wermter*

[PDF](https://www.isca-archive.org/interspeech_2026/gachot26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gachot26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2768)

**Category:** `speech-llm-dialogue` · **Labels:** `generative-model`

**TL;DR** — This paper establishes a unified theoretical formalism for auto-regressive decoding in speech and sequence processing, framing generation as a stochastic integer problem under probabilistic constraints (SIPC). It provides explicit inclusion criteria and a modular four-step architecture (Estimation, Decision, Prior Update, Termination) to categorize search strategies and enable targeted ablation studies.

## Key contributions

- Derives a generalized theoretical framework for auto-regressive (AR) search strategies based on Stochastic Integer Problems under Probabilistic Constraints (SIPC).
- Establishes explicit, model- and decoding-level inclusion criteria to formally distinguish AR generation from non-AR or edge-case approaches.
- Deconstructs inference into a modular four-step recurrence relation: Estimation, Decision, Prior Update, and Termination Test.
- Proposes a systematic methodology for search-strategy ablation studies by swapping individual functional blocks with baseline equivalents.

## Problem

State-of-the-art speech and language sequence models rely heavily on auto-regressive generation, yet the field lacks a unified formal taxonomy due to implicit and fragmented definitions of next-token decoding. Existing literature treats inference algorithms as indivisible implementation details tied to specific tasks (e.g., beam search for ASR, temperature sampling for TTS), making systematic comparisons, cross-task insights, and rigorous benchmarking difficult. This lack of formalization leads to inconsistent characterizations of what constitutes an auto-regressive method, obscuring the true performance drivers of modern sequence generation.

## Method

The proposed framework defines an auto-regressive predictor as a tuple (M, gAR) operating over a discrete compositional optimization problem. At each iteration t, the model updates a finite set of candidate sequences Y_t and a decoding prior Z_t via a recurrence relation f^(t)(M, gAR)(Y_t, Z_t) -> (Y_{t+1}, Z_{t+1}).

Execution breaks down into four core modular steps: (1) Estimation, where the neural model M processes an input x and prior Z_t to output a conditional probability mass function P_t via softmax (with optional temperature scaling); (2) Decision, where an objective function f_obj (such as Maximum a Posteriori, MAP, or top-B^2 filtering followed by random sampling) aggregates PMF estimates to construct candidate sets; (3) Prior Update, which governs how the state Z is maintained across steps (most commonly Z_{t+1} <- Y_{t+1}, though internal model states can also be used); and (4) Termination Test, a boolean function f_term evaluating when candidates meet completion criteria like end-of-sequence tokens.

By treating these steps as swappable components, the framework accommodates both deterministic strategies like beam search and stochastic methods like temperature sampling within the exact same structural template. This modularity allows researchers to isolate specific algorithmic contributions—such as novel scoring functions for diversity or alternative prior updates for speed—without treating each search strategy as a completely black-box monolithic algorithm.

## Experimental setup

The paper is theoretical and conceptual, establishing a formal framework rather than presenting a single empirical system or training new models. It analyzes ten diverse speech and sequence processing methods published between 2018 and 2025—including five speculative decoding approaches and five non-autoregressive methods—across tasks like ASR, TTS, and machine translation. The evaluation methodology focuses on theoretical categorization, structural mapping, and proposing a framework for component-level ablation studies.

## Results

Because this is a formalism and taxonomy paper, traditional empirical performance numbers or benchmark tables are not generated. Instead, the utility of the framework is demonstrated by successfully classifying diverse edge-case architectures, showing that speculative decoding and even select non-AR models satisfy the proposed model and decoding assumptions. The paper demonstrates that strategies previously viewed as entirely distinct (e.g., MAP-based text-to-speech diversity penalties and stochastic text generation sampling) can be unified and compared directly as variants of the Decision step.

## Limitations

The framework assumes tasks can be modeled as discrete compositional optimization problems or stochastic integer problems under probabilistic constraints (SIPC), which may require adaptation for continuous or purely non-discrete generation modalities. While tested across ten representative literature examples spanning 2018–2025, broader empirical validation across large-scale speech LLM deployments remains to be fully explored. The paper outlines the methodology for component-level ablations but leaves exhaustive empirical quantification of swapping individual steps across massive model scales to future work.

## Why read this

Speech and ML researchers developing or deploying sequence generation models should read this to escape task-siloed inference heuristics and learn how to systematically design, categorize, and ablate decoding strategies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Standardizing inference algorithm design, building task-agnostic decoding benchmarks, and optimizing speech generation pipelines for speed, diversity, and accuracy.

## Institutions / 機構

University of Hamburg

**Funding / 經費:** Horizon Europe, German Research Foundation

## Related

- [Scaling Properties of Continuous Diffusion Spoken Language Models](ramapuram26_interspeech.md) — same problem · relatedness 2.2/3
- [Decoupling Search and Evaluation: Efficient Beam Decoding for Language Model-Based Text-to-Speech Synthesis](liu26l_interspeech.md) — shared technique · relatedness 2.0/3
- [Decoding Order Matters in Autoregressive Speech Synthesis](zhao26e_interspeech.md) — shared technique · relatedness 2.0/3
- [Audio-NSP: Data-Centric Semi-Autoregressive Generation for Large Audio-Language Models](cao26b_interspeech.md) — same problem · relatedness 1.9/3
- [Accelerating End-to-End ASR via Semi-Autoregressive Speculative Decoding](wu26g_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
