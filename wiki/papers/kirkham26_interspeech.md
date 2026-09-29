---
id: kirkham26_interspeech
category: phonetics-linguistics
institutions: ["Lancaster University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1804
pdf: https://www.isca-archive.org/interspeech_2026/kirkham26_interspeech.pdf
---

# PyPhonPlan: Simulating phonetic planning with dynamic neural fields and task dynamics

*Sam Kirkham*

[PDF](https://www.isca-archive.org/interspeech_2026/kirkham26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kirkham26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1804)

**Category:** `phonetics-linguistics`

**TL;DR** — PyPhonPlan is a Python toolkit that unifies dynamic neural fields (DNFs) with task dynamic simulations to model speech planning, perception, and memory. It demonstrates emergent interactive speech phenomena like phonetic convergence and articulatory accommodation in a shadowing task.

## Key contributions

- An open-source Python toolkit for simulating phonetic planning via coupled dynamic neural fields and task dynamics.
- A modular software architecture supporting multi-layer fields, coupling mechanisms, memory traces, and tract variable simulations.
- A demonstrated three-layer perception-planning-memory simulation replicating phonetic shadowing, accommodation, and washout dynamics.
- Fully-documented executable Jupyter notebooks provided in the open repository to foster reproducible and cumulative computational research.

## Problem

Conventional task dynamic models treat articulatory target values as static, invariant parameters lacking intrinsic mechanisms for learning, memory, or sensory-motor loops. While general-purpose DNF simulators like COSIVINA exist, they lack direct integration with speech-specific task dynamic models of articulatory control. PyPhonPlan addresses this gap by supplying a unified computational framework tailored specifically to speech communication research.

## Method

PyPhonPlan implements a dynamic neural field where activation evolves over time governed by a time constant tau, resting level h, Gaussian noise scaling parameter q, and an interaction kernel defining local excitation and lateral/global inhibition. The interaction kernel incorporates a Mexican-hat profile gated by a sigmoid function with a threshold parameter alpha, ensuring only above-threshold sites interact. Inputs to the field are distributional representations characterized by amplitude a, centroid p, and width w.

Multi-layer architectures allow perception, planning, and memory fields to be coupled. Memory fields track a history of above-threshold planning activation using a slower timescale (tau_decay > tau_mem > tau) that subsequently biases future planning cycles via Hebbian-like dynamics. To prevent perceptual inputs from involuntarily triggering speech output, an optional latched gate gamma(t) clamps planning activation below threshold unless an explicit motor response input is active.

Finally, spatial positions corresponding to peak activations in the planning DNF serve as time-varying targets x*(t) for a critically-damped harmonic oscillator model of tract variables, driving continuous geometric configurations of the vocal tract such as constriction degrees.

## Experimental setup

The paper illustrates the framework using a simulation study modeled on a phonetic shadowing paradigm comprising 1 baseline trial, 10 shadowing trials with an auditory prompt (perception input = 1), and 1 washout trial. Parameter spaces for the articulatory dimension x are set to an arbitrary range of [-10, 10], with response inputs set to 3.0. The implementation is delivered as a modular open-source Python codebase with accompanying Jupyter notebooks.

## Results

In the shadowing simulation, the baseline planning peak settles at the intended response target of x = 3.0. During the first shadowing trial (S1), a strong perceptual prompt at x = 1.0 pulls the planning peak to x = 1.56. This convergence bias persists across all 10 shadowing trials due to cumulative memory updates.

During the washout trial (no perceptual input), the planning peak retains a residual shift of -0.29 units from baseline (settling at x = 2.71) driven by accumulated memory traces. The resulting tract variable trajectories demonstrate that these field-level convergence effects successfully propagate to articulatory output, showing a lower target position during washout compared to baseline.

## Limitations

Input timing is currently hand-stipulated rather than dynamically driven by automated satisfaction conditions or competitive queuing. The tract variable integration extracts time-varying targets from field peaks but lacks a complete inverse mapping from articulators to tract variables. Furthermore, the models are currently restricted to 1D articulatory variables because DNFs scale poorly to higher dimensions.

## Why read this

Speech researchers and computational phoneticians interested in biologically-grounded, non-exemplar models of speech motor control and interactive dialogue dynamics should read this paper to adopt or extend a unified simulation framework.

## Code

- https://github.com/samkirkham/PyPhonPlan

## Applications

Simulating speech motor control, modeling phonetic accommodation and shadowing experiments, and studying agent-based interactive spoken communication.

## Institutions / 機構

Lancaster University

**Funding / 經費:** Arts and Humanities Research Council, The Royal Society, The Leverhulme Trust

## Related

- (link related pages by id as the wiki grows)
