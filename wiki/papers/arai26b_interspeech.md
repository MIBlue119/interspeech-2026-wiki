---
id: arai26b_interspeech
category: speech-production
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.pdf
---

# Programmable Speech Synthesis without Computers

*Takayuki Arai*

[PDF](https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arai26b_interspeech.html)

**TL;DR** — This paper introduces a purely mechanical, computer-free method for speech synthesis using dynamic physical vocal-tract models controlled by interchangeable linear and rotating cam mechanisms. It successfully demonstrates the synthesis of the phrase 'I love you' with comparable acoustic spectrograms across both mechanisms.

## Key contributions

- Developed a programmable physical speech synthesis approach for the VTM-UT30-D6/D9 vocal-tract models that eliminates the need for computers or electronic actuators.
- Designed interchangeable linear cam plate pieces (triangles, rectangles, and trapezoids) that insert into a base plate to precisely control articulation block heights up to 20 mm.
- Designed counterpart rotating cam plate pieces (ramped shapes, annular sectors, and irregular profiles) mounted along a base axis to achieve equivalent temporal articulatory control.
- Validated both mechanisms by successfully synthesizing the English phrase 'I love you' and showing that linear and rotating cams yield broadly similar formant trajectories.

## Problem

Traditional mechanical speech production models, such as those by Umeda and Teranishi, were largely restricted to producing steady-state vowels because manually manipulating multiple physical blocks dynamically was extremely difficult. While subsequent updates integrated computer control and electronic actuators to handle dynamic words and phrases, these electronic setups remove the purely physical and educational utility of acoustic-aerodynamic models. Furthermore, fixed mechanical cams designed for one specific phrase lack flexibility, requiring entirely new hardware components for every new utterance. This work addresses the need for a reconfigurable, computer-free mechanical approach to control speech dynamics.

## Method

The system utilizes the VTM-UT30-D6 and VTM-UT30-D9 physical vocal-tract models, which feature a main vocal tract (and an optional nasal branch in the D9 model) controlled by six articulation blocks inserted from the bottom. Maximum block displacement is bounded at 20 mm by the physical ceiling of the palate or pharyngeal wall. To achieve arbitrary phrase generation without computers, the authors designed a modular, programmable cam architecture using interchangeable physical pieces grouped into three structural categories: ramped/triangular shapes for raising/lowering, rectangular or annular sector shapes for holding constant constriction levels (e.g., 0 mm, 10 mm moderate, 18 mm constriction, 20 mm complete closure), and irregular or trapezoidal shapes for smooth transitions.

In the linear cam configuration, these pieces snap into a base plate to form a linear spatial profile over normalized time for each of the six articulation blocks (Cams 1 through 6, spanning from the lips to the glottal end). In the rotating cam configuration, equivalent pieces attach around a base axis to form a radial profile along its circumference. As the linear base slides or the axes rotate beneath the vocal-tract blocks, the physical profiles mechanically drive the blocks up and down based on tract-variable trajectories derived from Task Dynamics and Articulatory Phonology frameworks, successfully reproducing dynamic acoustic outputs like formants without digital signal processing.

## Experimental setup

The study evaluates the physical VTM-UT30-D6 and VTM-UT30-D9 vocal-tract models using the target English phrase 'I love you'. The two programmable cam designs—linear cams and rotating cams—are compared directly against each other. Evaluation is conducted qualitatively via normalized time-displacement trajectory curves and spectrogram analysis of the resulting acoustic outputs.

## Results

The linear and rotating cam mechanisms successfully synthesized the target phrase 'I love you' entirely through mechanical articulation without electronic computation. Spectrographic comparison of the output audio shows that both cam mechanisms produce broadly similar formant trajectories, proving that the interchangeable modular plate approach can interchange linear and rotational kinematics while maintaining acoustic fidelity.

Because this is a foundational physical modeling demonstration focused on a single proof-of-concept utterance, quantitative word error rates or traditional automated speech metrics are not applicable, and the primary point of comparison is structural equivalence between the two physical form factors.

## Limitations

The approach is currently demonstrated on only a single target phrase ('I love you'), leaving large-scale vocabulary and continuous fluent speech unverified. Systematically designing and manufacturing physical plate pieces for arbitrary, complex multi-phrase utterances remains a manual and non-trivial task. The physical models are also constrained by the mechanical resolution of the six articulation blocks and fixed vocal tract dimensions, which limit fine-grained phonetic variation.

## Why read this

Speech researchers and hardware enthusiasts interested in articulatory phonology, physical acoustic modeling, and historical speech production will find this a fascinating look at computer-free speech synthesis. It provides concrete mechanical blueprints for building modular, reconfigurable physical vocal-tract controllers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Educational physical exhibits for acoustics and speech production, interactive museum displays demonstrating articulatory phonology, and alternative mechanical speech output devices.

## Related

- (link related pages by id as the wiki grows)
