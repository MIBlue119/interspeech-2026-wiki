---
id: cunningham26_interspeech
category: asr
labels: [multilingual]
institutions: ["DePaul University", "York University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3351
pdf: https://www.isca-archive.org/interspeech_2026/cunningham26_interspeech.pdf
---

# Decolonizing Linguistic Policies in Automatic Speech Recognition: A Framework for Cross-Culturally Competent Speech AI

*Jay L. Cunningham, Mark Atta Mensah, Richard Martinez, João Vieira da Silva Neto, Efi Dawodu*

[PDF](https://www.isca-archive.org/interspeech_2026/cunningham26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cunningham26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3351)

**Category:** `asr` · **Labels:** `multilingual`

**TL;DR** — This paper presents a theoretical and methodological framework for culturally competent Automatic Speech Recognition (ASR), introducing a seven-layer situatedness model, the Three Harms (3M) taxonomy, and a participatory design protocol to counter colonial linguistic hierarchies in speech AI.

## Key contributions

- Synthesizes linguistic capital, raciolinguistic ideology, language policy research, and decolonial computing into a unified theoretical account of ASR linguistic policies.
- Introduces a seven-layer situatedness model for linguistic diversity spanning from base languages to socio-technical implications.
- Proposes the Three Harms (3M) taxonomy—Misrecognition, Misalignment, and Mistrust—to capture failures invisible to standard Word Error Rate (WER) metrics.
- Establishes a four-pillar participatory framework (auditing, co-design, equitable deployment, and feedback integration) placing affected communities as governance partners.

## Problem

Conventional speech AI systems routinely fail speakers of low-resource, Indigenous, and non-standard language varieties because evaluation regimes rely exclusively on Word Error Rate (WER) and standardized prestige norms. Prior approaches treat these failures as isolated technical bugs rather than structural linguistic policies that reproduce colonial hierarchies of linguistic value. This matters because speech interfaces increasingly mediate access to essential public services, healthcare, and education, turning misrecognition and pragmatic misalignment into systemic social exclusion and eroded trust.

## Method

The authors construct a socio-technical framework rather than a novel neural network architecture, drawing extensively on qualitative sociology, language policy theory, and decolonial computing. The core methodological instrument is the 3M audit protocol, which requires combining traditional error metrics (WER, character error rate, tone error rate for tonal languages like Yoruba, and click-consonant tracking for Khoisan-family languages) with community-led pragmatic adequacy ratings, implicature checks, and behavioral trust indicators. The design relies on a four-pillar participatory loop consisting of participatory auditing, community co-design (with localized annotation guidelines and withdrawal rights), equitable deployment (incorporating fallback rules and explicit design for non-recognition), and feedback integration for iterative repair and redress. These components are designed to work together to shift authority over correctness and intelligibility from system developers to marginalized language communities.

Key design choices include treating 'low-resource' as a political-economic outcome rather than an intrinsic data scarcity, operationalizing structural sociolinguistic phenomena into auditable software artifacts, and formalizing 'productive non-recognition' as a necessary privacy and safety mechanism where communities can refuse machine readability.

## Experimental setup

This is a theoretical and framework paper that does not introduce a new model or benchmark result; thus, standard training datasets, hardware specifications, and training epochs are not applicable. Instead, the paper synthesizes existing empirical benchmarks and corpora from prior literature, such as UGSpeechData (5,000 hours across 5 Ghanaian languages), Akan ASR multi-domain evaluations, Mozilla Data Collective, and the Kathbath dataset (1,684 hours across 12 Indian languages). Evaluation concepts prioritize community-panel assessments, pragmatic adequacy ratings, and multi-metric error tracking over automated single-metric evaluation.

## Results

As a theoretical and conceptual contribution, the paper does not report new empirical model accuracy results or benchmark wins. Instead, it re-analyzes existing literature to demonstrate how metrics like WER obscure severe cross-cultural disparities—citing prior findings where Word Error Rates jump from 5% for Standard American English to 35% for African American Language. The paper validates its diagnostic framework through conceptual alignment with multi-domain Akan ASR performance drops and tone error sensitivity in African languages.

## Limitations

The proposed participatory framework is broad and requires substantial contextual adaptation, meaning its four-pillar structure may be difficult to implement directly in very small language communities with limited evaluator capacity. The paper relies on conceptual and qualitative synthesis rather than large-scale empirical validation of the entire four-pillar framework across diverse deployment settings. Additionally, the governance mechanisms do not fully resolve the risks of community-washing or representational capture if participation is co-opted without binding structural authority.

## Why read this

Speech and ML engineers, researchers, and ethicists should read this paper to move beyond WER-centric evaluation and learn how to audit speech technologies for sociolinguistic bias, pragmatic misalignment, and user mistrust.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Culturally competent design and auditing of automated speech recognition systems, voice assistants, and spoken dialogue interfaces in public services, healthcare, and legal domains.

## Institutions / 機構

DePaul University, York University

## Related

- [Speech Technology and Linguistic Diversity](bird26_interspeech.md) — same problem · relatedness 2.2/3
- [‘I have to talk proper white ways’: Australian Aboriginal English Speakers’ Experiences with Voice Technologies](louro26_interspeech.md) — same problem · relatedness 2.0/3
- [From Academic Tool to Community Infrastructure: A Call for Indigenous Partnership in Speech Data Governance](sheth26b_interspeech.md) — same problem · relatedness 2.0/3
- [Working Together on Technologies: A Case Study of Collaboration in Aotearoa](hutchinson26_interspeech.md) — complementary · relatedness 1.9/3
- [Indigenising Speech Technology: Building a TTS Model for te Reo Māori](leoni26_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
