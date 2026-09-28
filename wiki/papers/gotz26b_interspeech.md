---
id: gotz26b_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/gotz26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/gotz26b_interspeech.pdf
---

# Scalable Audio Scene Generation with the Treble SDK

[PDF](https://www.isca-archive.org/interspeech_2026/gotz26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gotz26b_interspeech.html)

**TL;DR** — The paper introduces the Treble SDK Scene Generator, a Python framework that uses physically grounded room-acoustic simulations and lightweight lazy scene recipes to construct, store, and bulk-render realistic multi-speaker and device-aware audio datasets.

## Problem

Collecting real-world multi-speaker recordings that account for varying room geometries, material properties, listener orientations, and background noises is expensive, rigid, and hard to scale. While acoustic simulation helps, developers typically need to write extensive custom scripting to bridge isolated room impulse responses (RIRs), clean source tracks, metadata alignment, and audio rendering. This friction hinders the reproducible creation of complex datasets needed for training and evaluating modern robust speech and audio systems.

## Method

The Treble SDK Scene Generator implements an interactive Python workflow using a lazy representation where scenes are initially stored as lightweight recipes containing timed audio blocks, RIR mappings, listener configurations, and target definitions without performing any convolution. Inputs combine pre-computed IR collections, clean audio sources from datasets like Hugging Face, and user-defined conversational or device-level rules. The system supports both manual scene composition with timeline and 3D room visualizations and automated bulk generation that sweeps receiver positions and source arrangements to yield a SceneCollection. Audio convolution, device rendering, and mixture generation are deferred and executed on demand.

## Results

The demonstration highlights the framework's capability to load IR collections, parse Hugging Face speech corpora and HVAC noise tracks, and construct single or bulk multi-speaker conversational scenes. It successfully visualizes timelines and 3D room views, manages dummy-head listener orientations, and outputs JSON-serialisable metadata alongside aligned audio mixtures and separated tracks. Quantitative performance metrics or model evaluations are not the focus of this system demonstration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing spatial audio, speech enhancement, multi-speaker separation, or far-field speech recognition systems can use this tool to build tailored, metadata-rich training and evaluation datasets.

## Related

- (link related pages by id as the wiki grows)
