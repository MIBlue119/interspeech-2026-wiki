---
id: oliveira26c_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.pdf
---

# The TinyExplorer Ecosystem: Open tools for studying infants’ auditory and visual experiences

[PDF](https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.html)

**TL;DR** — The TinyExplorer Ecosystem is an open-source hardware and local software platform designed to study infants' everyday multimodal environments, achieving 78% recall and 77% precision for keyword spotting of concrete nouns.

## Problem

Studying early language and cognitive development in naturalistic settings remains bottlenecked by the difficulty of recording safe, child-friendly egocentric video and the intensely time-consuming nature of manual audio and visual annotation. Existing toolsets often fail to capture the dynamic, socially embedded, and multimodal interactions essential for infant learning. Furthermore, researchers face significant privacy risks when processing sensitive infant video data through cloud-based external APIs.

## Method

The TinyExplorer platform integrates lightweight wearable hardware (TinyExplorer Gear using an Insta360 GO 3 camera at 1080p/50fps with an expanded vertical field of view of 116°) with a local desktop interface (TinyExplorer Detection App) ensuring all data processing remains on the researcher's machine. For the visual domain, it incorporates benchmarked detectors such as YOLOv11Face (M) and RetinaFace for face detection, alongside an extended 100 Days of Hands (100DOH) model for hand detection and ownership classification. For the auditory domain, the pipeline combines BabyHuBERT for voice type classification with Whisper for automated speech recognition to target communicative development inventory (CDI) concrete nouns.

## Results

Evaluating automated face detection across 13 models identified YOLOv11Face (M) and RetinaFace as top performers in precision and recall with strong concordance to manual ratings. Benchmarking 6 hand detection models found 100 Days of Hands (100DOH) to be the strongest. The auditory keyword spotting pipeline achieved a recall of 78% and a precision of 77% for 485 concrete nouns, aligning closely with human annotator agreement levels (70–100%, mean 82.36%).

## Code

- https://cardiffbabylab.github.io/tinyexplorer-detection-app/

## Applications

Developmental scientists, speech researchers, and psychologists studying early language acquisition, parent-child interactions, and infant everyday learning environments.

## Limitations

Certain advanced features such as hand-object interaction annotation and full audio processing pipelines are still under development and awaiting final integration into the desktop application.

## Related

- (link related pages by id as the wiki grows)
