---
id: jiang26g_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3114
---

# Integrating Facial Generation into Full-Duplex Spoken Dialogue Systems

**TL;DR** — Moshi-Face extends the Moshi full-duplex spoken dialogue model to jointly generate synchronized speech and facial motion in real time.

## Problem

Full-duplex spoken dialogue models like Moshi enable natural, low-latency voice conversation but are limited to audio, missing the facial expressions integral to human communication.

## Method

Moshi-Face first trains a vector-quantized variational autoencoder as a face codec that encodes 3D head meshes from facial video into discrete "face tokens" and reconstructs meshes from them, then extends Moshi with a Face Transformer module that generates face tokens non-autoregressively alongside audio in real time.

## Results

Achieves audiovisual alignment at low latency while preserving the dialogue quality of the original audio-only Moshi model.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time embodied conversational agents and avatars needing synchronized facial expression alongside spoken dialogue (e.g., virtual assistants, telepresence).

## Related

- (link related pages by id as the wiki grows)
