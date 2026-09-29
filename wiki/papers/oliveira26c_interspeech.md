---
id: oliveira26c_interspeech
category: resources-evaluation
institutions: ["Cardiff University", "University of Surrey"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.pdf
---

# The TinyExplorer Ecosystem: Open tools for studying infants’ auditory and visual experiences

*Cátia M Oliveira, Teodor Y. Nikolov, Tamas Foldes, Charlotte Bocchetta, Hana D'Souza*

[PDF](https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oliveira26c_interspeech.html)

**Category:** `resources-evaluation`

**TL;DR** — The TinyExplorer Ecosystem is an open-source platform combining lightweight egocentric headcam hardware with a locally run desktop application for automated audio-visual annotation, achieving 78% recall and 77% precision in keyword spotting.

## Key contributions

- Developed TinyExplorer Gear, a lightweight headcam system using the Insta360 GO 3 featuring a 116° vertical field of view to capture infant-perspective manual behavior and social faces.
- Built the TinyExplorer Detection App, a local desktop interface ensuring sensitive child video data remains private without cloud uploads.
- Integrated and benchmarked 13 face-detection algorithms, identifying YOLOv11Face (M) and RetinaFace as top performers in egocentric child environments.
- Created an audio processing pipeline combining BabyHuBERT for voice-type classification and Whisper for ASR, targeting 485 CDI concrete nouns.
- Expanded the 100 Days of Hands (100DOH) model to classify hand ownership (own vs. other) and hand-object interactions.

## Problem

Studying early language development and everyday learning environments remains difficult because traditional methods fail to capture the dynamic, multimodal, and socially embedded nature of children's experiences. While head-mounted cameras (headcams) offer a powerful route into capturing first-person visual and auditory input, their widespread research adoption is blocked by two major bottlenecks: the lack of safe, lightweight, child-friendly recording hardware, and the extremely time-intensive nature of manual audio and video annotation. Existing automated analysis tools are often fragmented, cloud-dependent (raising privacy concerns with vulnerable child data), or fail to account for the unique egocentric perspective of infants.

## Method

The TinyExplorer Ecosystem integrates customized wearable hardware with a localized software suite. The hardware component, TinyExplorer Gear, utilizes an Insta360 GO 3 camera recording at 1080p and 50 fps, offering an 80° horizontal and an expanded 116° vertical field of view—roughly three times that of prior child headcams—which is crucial for capturing manual actions and social partner faces from an infant's viewpoint.

The software component, the TinyExplorer Detection App, runs entirely locally on researcher hardware to safeguard sensitive data. For the visual domain, it incorporates benchmarked detectors including YOLOv11Face (M) and RetinaFace for face tracking, alongside an adapted 100 Days of Hands (100DOH) architecture extended to classify hand ownership and hand-object interactions. For the auditory domain, the app constructs a multi-stage pipeline utilizing BabyHuBERT for voice-type classification and Whisper for automated speech recognition (ASR), specifically optimized to detect 485 Communicative Development Inventory (CDI) concrete nouns produced by adults during naturalistic parent-child play.

These design choices were explicitly selected to transition developmental science from isolated mechanism analysis to an integrated, multimodal account of moment-by-moment child experiences. By uniting local processing for privacy with high vertical-FOV capture and specialized multi-modal models, the ecosystem minimizes technical barriers to reproducible, large-scale egocentric developmental research.

## Experimental setup

The ecosystem was evaluated using naturalistic parent-child recordings involving children under three years of age. Benchmarking encompassed 13 state-of-the-art face detection algorithms from the DeepFace library and 6 open-source hand detection algorithms. The auditory keyword spotting pipeline was tested on adult speech from naturalistic recordings targeting 485 concrete nouns, measured against manual human annotations with inter-annotator agreement ranging from 70% to 100% (M = 82.36%, SD = 9.58%).

## Results

The automated keyword spotting pipeline achieved a recall of 78% and a precision of 77% for all target CDI concrete nouns, placing its performance directly in line with human inter-annotator agreement levels (70–100%, mean 82.36%). Among 13 evaluated face detection algorithms, YOLOv11Face (M) and RetinaFace consistently outperformed alternatives in precision, recall, low error, and rank-order correlation with manual ratings. For hand detection, the 100 Days of Hands (100DOH) model demonstrated superior performance over competing open-source baselines for tracking egocentric hand presence.

| System / Condition | Precision | Recall | Human Agreement |
| :--- | :--- | :--- | :--- |
| Keyword Spotting Pipeline | 77% | 78% | 70% - 100% |
| YOLOv11Face (M) / RetinaFace | Top-tier | Top-tier | N/A |
| 100DOH Hand Detection | Superior | Superior | N/A |

## Limitations

The current platform relies on localized compute resources which may constrain lab throughput depending on available hardware. While face and hand detection are benchmarked, ongoing expansions for posture, gesture, and object detection are still in development and require further scaling. The audio evaluation is presently targeted at adult speech for 485 concrete nouns, leaving broader multi-speaker conversational dynamics and multi-lingual generalization as future work.

## Why read this

Speech and ML researchers building multimodal pipelines for child-centered or egocentric data will find a complete, privacy-first open-source blueprint for combining wearable hardware with local AI annotation.

## Code

- https://cardiffbabylab.github.io/tinyexplorer-detection-app/

## Applications

Automated analysis of infant egocentric video and audio for developmental psychology, language acquisition studies, and automated multimodal behavioral coding.

## Institutions / 機構

Cardiff University, University of Surrey

**Funding / 經費:** James S. McDonnell Foundation, UKRI Future Leaders Fellowship

## Related

- (link related pages by id as the wiki grows)
