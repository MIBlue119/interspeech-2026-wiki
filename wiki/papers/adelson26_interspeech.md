---
id: adelson26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2041
---

# Beyond Deep Learning: Speech Segmentation and Phone Classification with Neural Assemblies

**TL;DR** — A biologically inspired alternative to deep learning, built from sparse spiking neural assemblies, can detect phone and word boundaries and classify simple commands without any weight training.

## Problem

Deep learning dominates speech processing but needs huge labeled datasets and backpropagation, and its dense representations look little like how biological brains process sound.

## Method

The authors build a framework on Assembly Calculus, a model of sparse neuronal assemblies with Hebbian plasticity and winner-take-all competition, adding a speech-to-spike encoder, a multi-area architecture spanning several timescales, and rules for updating activity across areas.

## Results

Without any weight training, the system detects phone boundaries (F1=0.69) and word boundaries (F1=0.61), and reaches 47.5% and 45.1% accuracy on phone and simple command recognition respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful mainly as a research direction for neuroscience-inspired, training-light speech processing rather than a production ASR replacement today.

## Related

- (link related pages by id as the wiki grows)
