---
id: kirkham26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1804
pdf: https://www.isca-archive.org/interspeech_2026/kirkham26_interspeech.pdf
---

# PyPhonPlan: Simulating phonetic planning with dynamic neural fields and task dynamics

[PDF](https://www.isca-archive.org/interspeech_2026/kirkham26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kirkham26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1804)

**TL;DR** — PyPhonPlan is an open-source Python toolkit that integrates dynamic neural fields with task-dynamic articulatory control to simulate interactive speech production and perception loops.

## Problem

Conventional task-dynamic models of speech production treat target values as invariant parameters without intrinsic mechanisms for learning, memory, or sensory feedback. Integrating dynamic neural fields solves this by offering a neurally-grounded framework for phonetic planning, but existing general-purpose simulators lack direct integration with articulatory control. Providing a dedicated toolkit bridges this gap and makes dynamic field theory accessible for cumulative computational speech research.

## Method

The toolkit features modular components for defining dynamic neural fields (DNFs), multi-layer cross-field coupling, gestural inputs, memory fields, and task dynamic solvers. Field dynamics are governed by time evolution equations incorporating Mexican-hat interaction kernels for local excitation and lateral inhibition, gated by sigmoid activation functions. Memory fields operate via a Hebbian-style history trace that evolves on a slower timescale and biases subsequent planning field activations. Tract variable trajectories are derived from planning field activation peaks using critically-damped harmonic oscillator equations.

## Results

The paper demonstrates the toolkit's capabilities using a three-layer perception-planning-memory architecture simulating a phonetic shadowing task across 1 baseline trial, 10 shadowing trials with perceptual input, and 1 washout trial. Results show that planning peak positions converge toward the auditory prompt during shadowing and exhibit residual articulatory shifts during washout due to memory-field updating. The framework successfully models interactive speech dynamics and subtle articulatory consequences of memory-driven phonetic convergence.

## Code

- https://github.com/samkirkham/PyPhonPlan

## Applications

Speech and phonetics researchers studying speech production, motor control, phonetic accommodation, and perception-production loops can use this toolkit to build and simulate dynamic neural models.

## Limitations

In the current implementation, timing is manually stipulated rather than driven by autonomous sequencing mechanisms.

## Related

- (link related pages by id as the wiki grows)
