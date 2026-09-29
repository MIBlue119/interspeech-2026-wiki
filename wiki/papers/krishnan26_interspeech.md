---
id: krishnan26_interspeech
category: speech-llm-dialogue
institutions: ["Saarland University", "DFKI", "ETH Zurich"]
code: https://repos.lsv.uni-saarland.de/akrishnan/multimodal-jailbreak-slm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-309
pdf: https://www.isca-archive.org/interspeech_2026/krishnan26_interspeech.pdf
---

# On Optimizing Multimodal Jailbreaks for Spoken Language Models

*Aravind Krishnan, Karolina Stańczak, Dietrich Klakow*

[PDF](https://www.isca-archive.org/interspeech_2026/krishnan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/krishnan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-309)

**Category:** `speech-llm-dialogue`

**TL;DR** — The paper introduces JAMA, a joint optimization framework combining Greedy Coordinate Gradient (GCG) and Projected Gradient Descent (PGD) to simultaneously perturb both text and audio modalities in Spoken Language Models, achieving a 1.5× to 20× increase in jailbreak success rates compared to unimodal attacks.

## Key contributions

- Introduces JAMA (Joint Audio-text Multimodal Attack), a joint GCG-PGD white-box optimization method that simultaneously perturbs discrete text suffixes and continuous speech perturbations.
- Demonstrates that JAMA outperforms unimodal attacks (GCG-only or PGD-only) by 2× to 20× across four state-of-the-art spoken language models.
- Analyzes optimization dynamics via gradient energy distributions and t-SNE embedding space projections, revealing that GCG tokens are optimized first and attacks occupy distinct subspaces.
- Proposes SAMA (Sequential Audio-text Multimodal Attack), a sequential approximation that matches JAMA's jailbreak performance at larger scales while cutting compute time by 4× to 6×.

## Problem

Spoken Language Models (SLMs) integrate speech and text modalities but inherit safety vulnerabilities from their LLM backbones while introducing an expanded attack surface. Existing safety evaluations remain unimodal—optimizing either text or speech in isolation while leaving the other modality unoptimized—substantially overestimating real-world security. This paper addresses the gap by asking whether robustness to unimodal adversarial optimization transfers to the multimodal setting, proving that joint attacks expose critical safety flaws missed by single-modality audits.

## Method

The framework utilizes a white-box setting where both discrete text suffixes and continuous speech perturbations are jointly optimized against a frozen SLM over a batch of Q malicious queries and target affirmative responses (e.g., 'Sure, here is what you need...'). For the text modality, Greedy Coordinate Gradient (GCG) appends N optimizable suffix tokens, evaluating Top-K candidate substitutions at each position with search width 32 and top-k 16 for 1000 steps. For the speech modality, Projected Gradient Descent (PGD) applies an imperceptible L2-normalized perturbation delta (lr = 0.01, clipping epsilon = 0.001) to a base audio signal over 1000 steps, using differentiable feature extractors rewritten from numpy to torch to prevent gradient shattering. The joint loss averages the cross-entropy loss over the batch, where the PGD step updates the audio perturbation and the GCG step updates tokens conditioned on the perturbed audio. To resolve the computational bottleneck caused by evaluating large candidate pools against audio contexts, a sequential variant (SAMA) optimizes GCG tokens in isolation first and subsequently optimizes PGD perturbations on the fixed suffix.

## Experimental setup

Evaluations use the AdvBench dataset (8 training samples drawn from the first 40; 480 test samples) across five random seeds, measured via string matching and LLaMA Guard 3 with greedy decoding. Four safety-aligned SLMs are tested: Audio Flamingo 3, Qwen2 Audio (7B Instruct), Gemma 3N (E2B IT), and Qwen2.5 Omni (7B). PGD audio types include an audiobook reading, two Switchboard conversational samples (male/female), and a music performance. Compute experiments for runtime comparisons are run on a single NVIDIA H100 80GB GPU node.

## Results

JAMA consistently outperforms unimodal baselines across all tested SLMs, with joint optimization amplifying jailbreak success rates, especially at intermediate GCG lengths (4-8 tokens) and longer audio lengths. For instance, on Gemma 3N—a model highly robust to GCG-only attacks (3.0% success)—joint optimization with music initialization and 4s-8s audio lengths successfully induces high jailbreak rates. In embedding space analyses via t-SNE and linear classification (reaching 99% accuracy on the first two principal components), unimodal and multimodal attack components occupy separable subspaces far from the benign decision boundary. The sequential variant SAMA achieves comparable jailbreak rates to JAMA at larger lengths (averaging around a 10% gap that shrinks as token/audio length increases) while reducing compute time by 4× to 6×.

| System / Condition | Qwen2.5 Omni (JB %) | Qwen2 Audio (JB %) | Audio Flamingo 3 (JB %) | Gemma 3N (JB %) |
|---|---|---|---|---|
| Benign (No Attack) | 0.0 | 0.0 | 0.0 | 0.0 |
| PGD-only (Music) | 59.5 | 90.9 | 32.6 | 3.0 |
| GCG-only (16 tokens) | 59.0 | 90.9 | 32.6 | 3.0 |
| JAMA (Joint, 16 tok + 4s) | 77.5 | 89.1 | 64.8 | 14.6 |

## Limitations

The evaluation is restricted to white-box gradient-based attacks requiring differentiable feature extractors, limiting applicability to black-box commercial APIs unless surrogate models are used. The study focuses on English-centric safety benchmarks (AdvBench) and evaluates a specific subset of four open-source SLMs, leaving multilingual generalizability and larger-scale architectures unverified.

## Why read this

Speech and ML security researchers building alignment guardrails for audio-language models should read this to understand why unimodal safety testing is fatally flawed and how joint cross-modal optimization unlocks severe vulnerabilities.

## Code

- https://repos.lsv.uni-saarland.de/akrishnan/multimodal-jailbreak-slm

## Applications

Auditing and red-teaming safety alignment in spoken language models, conversational speech assistants, and multimodal dialogue systems prior to public deployment.

## Institutions / 機構

Saarland University, DFKI, ETH Zurich

**Funding / 經費:** European Defence Fund, ETH AI Center

## Related

- (link related pages by id as the wiki grows)
