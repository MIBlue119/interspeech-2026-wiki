---
id: williams26_interspeech
category: deepfake-security
institutions: ["University of Southampton"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-210
pdf: https://www.isca-archive.org/interspeech_2026/williams26_interspeech.pdf
---

# AI Regulation and the Technical Language of Speech Synthesis

*Jennifer Williams*

[PDF](https://www.isca-archive.org/interspeech_2026/williams26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/williams26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-210)

**Category:** `deepfake-security`

**TL;DR** — This paper analyzes the mismatch between global AI regulatory frameworks and the actual technical architecture of modern speech synthesis, highlighting how laws targeting static outputs overlook portable speaker embedding models and complex multi-stage workflows.

## Key contributions

- Traces the historical convergence of text-to-speech, voice conversion, automatic speaker verification, and automatic speech recognition since 1962.
- Classifies speaker, content, and style neural embeddings by provenance (external vs. native) and repurposability across downstream speech pipelines.
- Examines how modern generative workflows (diffusion, flow-matching, neural codecs, and LLM integration) blur the legal distinction between generated and manipulated speech.
- Provides a technical critique of legal transparency definitions in global AI policies (EU AI Act, Singapore, California, etc.) regarding their failure to regulate modular voice models.

## Problem

Current global AI regulations and transparency policies (such as the EU AI Act and various state/national deepfake laws) focus almost exclusively on final generated audio outputs, drawing flawed analogies from image and video domains. They fail to account for portable speaker embedding models (e.g., i-vectors, d-vectors, x-vectors, ECAPA-TDNN) that are developed independently, stored separately, and easily repurposed across diverse systems. Consequently, legal frameworks struggle to assign accountability across complex, multi-stage speech synthesis workflows where voice identity is decoupled from text content.

## Method

The paper presents a taxonomic breakdown of speech synthesis components, examining how early source-filter acoustic models and channel vocoders evolved into neural encoder-decoder architectures, neural vocoders, and unified waveform generators. It details four primary modern workflows: (a) modular pipelines with explicit text/speech encoders, decoders, and vocoders; (b) end-to-end architectures leveraging GANs, diffusion models, or flow-matching; (c) ASR-based voice conversion pipelines that reconstruct speech via intermediate phonetic or text representations; and (d) neural audio codec models driven by large language models. The core technical argument centers on how these workflows integrate external, repurposable speaker embeddings (like WavLM, HuBERT, and ECAPA-TDNN) to achieve zero-shot adaptation without requiring the original training audio or leaving distinct output traces.

## Experimental setup

This is a policy-oriented and historical review paper rather than an empirical benchmarking study. It synthesizes technical literature, historical milestones from 1956 to 2026, and legislative texts across multiple global jurisdictions including Singapore, South Korea, California, Tennessee, Australia, China, Brazil, and the European Union. Analysis is grounded in established speech processing taxonomies and standard neural embedding formulations referenced across Interspeech and IEEE literature.

## Results

As a conceptual and technical critique of AI regulation, the paper does not introduce a novel neural architecture or report quantitative speech synthesis metrics. Instead, it systematically demonstrates that legal dichotomies between 'fully-synthetic' versus 'modified' audio, or 'generated' versus 'manipulated' speech, contradict technical realities where speech is iteratively refined through diffusion or reconstructed via ASR/LLM intermediaries. The findings are summarized via a comprehensive mapping of embedding types (i-vector, d-vector, x-vector, ECAPA-TDNN, GE2E, WavLM, PPG, wav2vec 2.0, HuBERT, Global Style Tokens, and Tacotron embeddings) across their original tasks, external provenance, repurposability, and speaker identification capabilities.

| Embedding Type | Original Task | External | Repurposable | Speaker ID |
|---|---|---|---|---|
| i-vector [39] | ASV | Yes | Yes | Yes |
| x-vector [41] | ASV | Yes | Yes | Yes |
| ECAPA-TDNN [42] | ASV | Yes | Yes | Yes |
| WavLM [44] | SSL (multi-task) | Yes | Yes | Yes |
| wav2vec 2.0 [45] | ASR | Yes | Yes | No |
| HuBERT [46] | SSL for ASR | Yes | Yes | No |

## Limitations

The study focuses primarily on Western and major international regulatory frameworks while omitting exhaustive coverage of regional or municipal municipal-level policies. It provides a qualitative and technical critique without performing empirical simulations of watermarking robustness against adversarial attacks on portable embedding models. Additionally, the rapid pace of multimodal speech-LLM integration means regulatory definitions will continuously face new architectural paradigms.

## Why read this

Speech and ML engineers working on generative audio, voice cloning, or compliance tools should read this to understand the precise technical gaps in current AI legislation. It bridges the divide between speech science and policymaking, explaining why naive output-based watermarking and labeling laws fail to capture modular neural workflows.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informing the drafting of technically sound AI regulations, speech watermarking standards, and provenance-tracking frameworks for synthetic voice generation.

## Institutions / 機構

University of Southampton

**Funding / 經費:** EPSRC National EdgeAI Hub, EPSRC Responsible AI UK, Research England Higher Education Innovation Fund WSI Knowledge Exchange Fund

## Related

- (link related pages by id as the wiki grows)
