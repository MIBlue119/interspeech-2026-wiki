---
id: arai26b_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.pdf
---

# Programmable Speech Synthesis without Computers

[PDF](https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.html)

**TL;DR** — We present programmable mechanical speech synthesis devices using physical vocal-tract models controlled by interchangeable linear and rotating cam mechanisms instead of computers.

## Problem

Traditional mechanical speech production models require either tedious manual manipulation to produce only steady-state vowels or rely on computers and actuators to drive articulation blocks. Relying on computers limits purely physical, analog investigation of speech dynamics, while fixed traditional cams require completely new hardware for every single target phrase. Developing a programmable mechanical approach allows various speech phrases to be generated physically without relying on digital computers.

## Method

The system utilizes the VTM-UT30-D6 and VTM-UT30-D9 physical vocal-tract models, which feature a main vocal tract (and an optional nasal branch) controlled by six sliding articulation blocks inserted from the bottom. To position these blocks without computers, two cam mechanism types are developed: linear cams (sliding plate pieces on a base plate) and rotating cams (interchangeable plate pieces mounted along a base axis). The plate pieces are divided into three geometric categories: triangles/ramps for raising/lowering blocks up to a 20 mm ceiling, rectangles/annular sectors for maintaining constant heights, and irregular/trapezoidal shapes for transitions. Articulatory trajectories are derived from task dynamics and implemented by assembling these modular pieces.

## Results

The English phrase 'I love you' was successfully synthesized using both the linear cam and rotating cam mechanisms on the VTM-UT30 models. Spectrographic comparison of the output shows that both linear and rotating cam implementations yield broadly similar formant trajectories. No other quantitative error metrics, large-scale test corpora, or baseline comparisons were evaluated in this physical demonstration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Researchers in speech production, phonetics, and acoustic physics seeking to study articulatory dynamics and mechanical speech synthesis without digital computing infrastructure.

## Limitations

The current study only demonstrates the synthesis of a single target phrase ('I love you'), and future work is required to systematically design tract-variable trajectories for arbitrary phrases.

## Related

- (link related pages by id as the wiki grows)
