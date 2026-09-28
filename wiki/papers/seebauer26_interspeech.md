---
id: seebauer26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-747
pdf: https://www.isca-archive.org/interspeech_2026/seebauer26_interspeech.pdf
---

# Application context in speech synthesis evaluation: A problem and a solution

[PDF](https://www.isca-archive.org/interspeech_2026/seebauer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seebauer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-747)

**TL;DR** — This study demonstrates that text-to-speech evaluation ratings vary significantly across different application contexts and system interactions, while showing that virtual reality digital twins can provide statistically equivalent evaluation results to physical environments.

## Problem

Traditional text-to-speech evaluations rely heavily on isolated sentence mean opinion scores under the assumption that quality is modular and independent of application context. However, this modularity hypothesis often fails in real-world scenarios, risking severe evaluation confounds when systems are compared without specifying their intended use case. Furthermore, conducting ecologically valid tests in physical settings is resource-intensive, creating a need for reliable simulation alternatives.

## Method

The authors conducted a perception experiment with 80 German-speaking participants interacting across four distinct tasks: a task-oriented dialogue learning scenario (T1), a physical navigation task using Wizard-of-Oz pre-recorded prompts (T2), an open 5-minute free conversation (T3), and listening to a pre-synthesised read short story (T4). Four TTS systems were evaluated via Latin square rotation: Tacotron2 with WaveNet (S1), VITS (S2), Auralis TTS/XTTS-V2 (S3), and Orpheus LLM-based TTS with SNAC codecs (S4). Evaluations used a 100-point digital scale across multiple dimensions (overall quality, listening effort, naturalness, pleasantness, speech melody, audio artifacts, extraversion, negative emotion) plus the short-form User Experience Questionnaire (UEQ). A Bayesian hierarchical multivariate model with Region Of Practical Equivalence (ROPE) analysis was employed to test the influence of application tasks and system interactions, as well as comparing physical testing against a digital twin in Unreal Engine 5 via a Meta Quest 3 HMD.

## Results

Using a ROPE analysis with ±10 equivalence bounds, the navigation task (T2) received significantly higher ratings in Overall Quality compared to T1 (credible interval [12.34, 21.33]) and T3 ([10.04, 18.90]), and superior Listening Effort over T4 ([9.921, 19.421]). The interaction between application contexts and specific TTS systems frequently crossed equivalence bounds (e.g., listening effort differences between T1 and T4 shifted significantly from S3 to S2 with a credible interval of [-37.82, -10.69]). Crucially, comparisons between the physical mock apartment and its Unreal Engine 5 virtual reality digital twin revealed statistically equivalent rating distributions, validating simulation-based testing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers designing text-to-speech evaluation protocols, user experience researchers, and developers of conversational agents can use these findings to establish ecologically valid, context-aware testing pipelines and leverage VR digital twins for efficient evaluations.

## Limitations

The study tested 80 participants using a convenience sample at a single university and evaluated German-language interactions exclusively across four specific application archetypes.

## Related

- (link related pages by id as the wiki grows)
