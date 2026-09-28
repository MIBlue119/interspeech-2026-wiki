---
id: mohapatra26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2325
pdf: https://www.isca-archive.org/interspeech_2026/mohapatra26_interspeech.pdf
---

# Influence of Vocal Tract Curvature on Speech Acoustics: A Three-Dimensional FEM Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/mohapatra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mohapatra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2325)

**TL;DR** — A 3D finite element analysis reveals that vocal tract curvature excites higher-order transverse modes and induces noticeable formant and anti-resonance shifts above 8 kHz in non-uniform geometries, while having negligible effect on uniform cross-sections.

## Problem

Conventional physics-based speech production models typically approximate the vocal tract as a straight 1D or 2D tube, neglecting anatomical curvature or assuming straight geometries. While realistic 3D volumetric models account for natural bending, they mix curvature effects with irregular cross-sections and side branches, leaving the specific acoustic consequences of tract curvature largely unexplored.

## Method

The study employs a 3D finite element (FE) time-domain acoustic wave solver using tetrahedral mesh elements of size 2.5 mm, a 200 kHz sampling rate, and semi-reflective Robin boundary conditions to simulate wall losses. Geometries are modeled with a fixed centerline length of 17 cm, systematically varying cross-sectional uniformity (constant diameter vs. the 1D area function for vowel [A]), curvature intensity (low curvature with 8-16 cm radii vs. high curvature with 3 cm toroidal segments), and bending angles (60, 90, and 120 degrees). Transfer functions and acoustic pressure distributions are evaluated across a frequency range up to 14 kHz.

## Results

Evaluated via finite element simulations up to 14 kHz, uniformly shaped bent ducts show near-identical frequency responses compared to straight tubes, demonstrating that curvature alone does not alter the modal structure under constant cross-section. Conversely, non-uniform curved tracts exhibit well-aligned transfer functions below 8 kHz, but introduce distinct anti-resonances and higher-order transverse modes in the 8-10 kHz and 11-12 kHz regions. Pressure distribution analyses confirm that straight non-uniform tubes maintain plane-wave propagation, whereas bent non-uniform configurations successfully excite transverse acoustic modes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing high-fidelity articulatory speech synthesizers, physics-based speech production models, and digital twins of the vocal tract.

## Limitations

The study is restricted to circular cross-sections to isolate curvature effects and assumes an open-end radiation condition using a homogeneous Dirichlet boundary, thereby neglecting lip radiation effects.

## Related

- (link related pages by id as the wiki grows)
