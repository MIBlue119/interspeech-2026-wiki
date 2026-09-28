---
id: joo26_interspeech
category: lip-reading
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1163
---

# Cross-Lingual Compositional Learning for Code-Switched Lip Reading

**TL;DR** — CoCoVSR adapts a pretrained multilingual visual speech recognizer to code-switched speech using only monolingual data, reaching SOTA on Chinese-English code-switched lip reading without collecting new video.

## Problem

Code-switching between languages is common in multilingual communication but underexplored in visual speech recognition (VSR), largely because collecting large-scale, realistic code-switched video is expensive and difficult to scale.

## Method

CoCoVSR is a cross-lingual compositional learning framework that adapts a pretrained multilingual VSR model to code-switched scenarios by exploiting existing monolingual corpora, preserving shared articulatory features without any additional data collection or generative synthesis.

## Results

CoCoVSR achieves state-of-the-art performance on Chinese-English code-switched VSR, and also performs competitively on both seen (MultiVSR Chinese) and unseen (LRS2 English) monolingual datasets, showing multilingual performance is preserved with negligible degradation. Code: https://github.com/ewha-mmai/CoCoVSR

## Code

Code released by the authors: https://github.com/ewha-mmai/CoCoVSR

## Applications

Visual speech recognition for multilingual and code-switching speakers, useful for silent-speech interfaces and accessibility tools in linguistically diverse regions.

## Related

- (link related pages by id as the wiki grows)
