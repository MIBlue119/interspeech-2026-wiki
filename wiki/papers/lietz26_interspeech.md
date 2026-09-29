---
id: lietz26_interspeech
category: health-clinical
institutions: ["University of California, Santa Cruz", "AImpower.org", "Stanford University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2962
pdf: https://www.isca-archive.org/interspeech_2026/lietz26_interspeech.pdf
---

# Making Room for Speech Diversity: A 50 Year Retrospective of Speech Science and Technology through a Neurodivergent Lens

*Rebecca Lietz, Jingjin Li, Peiyao Liu, Jennifer Chien, Norman Makoto Su, Shaomei Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/lietz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lietz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2962)

**Category:** `health-clinical`

**TL;DR** — This paper presents a 50-year retrospective scoping review of 117 Interspeech and ICASSP papers (1976–2025) concerning neurodivergent speech, revealing a dominant medicalized, deficit-based framing and a lack of direct stakeholder engagement. The authors find that 78% of surveyed papers focus on diagnosis and detection, 62% of new data annotations are done solely by researchers, and fewer than 2% directly solicit feedback from people with disabilities (PWD).

## Key contributions

- Conducted a systematic scoping review of 1,170 retrieved publications from IEEE Xplore and ISCA archives, resulting in a finalized corpus of 117 peer-reviewed papers spanning 1976 to 2025.
- Identified three recurring discourse issues in speech technology: medicalized/interventionist framings (treating neurodivergence as a deficit), severe under-inclusion of neurodivergent stakeholders in research, and the persistence of ableist language.
- Mapped temporal shifts across five decades, showing that stuttering and autism represent the vast majority of studies, with model contributions comprising roughly 70% of publications between 2016 and 2025.
- Proposed concrete, actionable pathways for the Interspeech community to adopt the social model of disability, including participatory problem formation, community-led data annotation, and human-in-the-loop evaluation.

## Problem

Speech technologies consistently underperform for individuals with non-standard speech patterns, such as those with stuttering, autism, ADHD, Down syndrome, or bipolar disorder. Despite a growing volume of research aimed at inclusive speech technology, historical approaches frequently adopt an uncritical medical model of disability. This positions neurodivergent communication traits as individual pathologies or anomalies in need of correction, diagnosis, or masking rather than addressing environmental and systemic barriers. Consequently, speech engineering risks perpetuating technoableism, alienating the very communities it aims to support.

## Method

The study executes a systematic scoping and discourse analysis of literature from Interspeech, ICASSP, EuroSpeech, and ICSLP. Initial search queries using terms like 'stutter', 'disfluen', 'dysfluen', 'disab', 'disord', and 'atyp' across IEEE Xplore and ISCA archives yielded 1,170 papers. Filtering for explicit mentions of developmental neurodivergent conditions reduced the corpus to 155 papers, of which 117 met the final inclusion criteria after manual vetting for speech focus and target conditions. The review methodology evaluates each paper along specific coding dimensions: inclusion criteria, paper type, main contribution category (model, insight, dataset, artifact), intended use case (diagnosis/detection, intervention), data source provenance, annotation personnel, human evaluation inclusion, and the presence of ableist terminology.

Data was independently coded and cross-validated by the research team through weekly alignment meetings, yielding a fully accessible public corpus via Zenodo (doi.org/10.5281/zenodo.20754795). The authors synthesize these coding dimensions with disability justice frameworks, contrasting the dominant medical model with the social model of disability to diagnose systemic blind spots in current speech technology pipelines.

## Experimental setup

The review analyzes a finalized corpus of 117 peer-reviewed papers published between 1976 and 2025 across Interspeech (75 papers), ICASSP (33 papers), ICSLP (5 papers), and EuroSpeech (4 papers). Condition distributions within the corpus comprise stuttering (52 papers), autism spectrum disorder (50 papers), bipolar disorder (12 papers), Down syndrome (3 papers), ADHD/ADD (1 paper), and 8 papers examining other or multiple conditions. Metrics tracked include publication counts over time, percentage share of overall Interspeech publications (peaking near 0.8% in recent years), categorization of stated use cases, distribution of main contributions, and counts of personnel involvement in data annotation and result evaluation.

## Results

Quantitative analysis of the 50-year corpus shows that roughly 60% of surveyed papers contribute a novel model or training method, with model-focused papers jumping to ~70% of total publications between 2016 and 2025. Diagnosis and detection remain the dominant motivating use case across the entire 50-year span, accounting for 78% of papers. Professionals and clinicians are targeted as the intended audience in 56% of papers, whereas people with disabilities (PWD) are the target end users in only 16%.

In terms of stakeholder involvement, 62% of papers conducting new annotations relied exclusively on researchers, 26% on clinicians or professionals, and only 3.1% (2 papers) involved PWD. Furthermore, 78.6% of papers performed zero human evaluation of their systems; of the remaining papers involving humans, fewer than 2% directly solicited feedback or evaluation from neurodivergent individuals. Ableist terminology (e.g., 'fix', 'hide', 'disease', 'cure', 'abnormal') persists consistently across the 50-year timeline.

| Evaluator / Annotator Category | Data Annotation Share (%) | System Evaluation Share (%) |
|---|---|---|
| Researchers alone | 61.5% | N/A (mostly un-evaluated) |
| Professionals / Clinicians | 26.2% | 9.4% |
| Non-experts / Crowd workers | 6.2% | 8.5% |
| People with Disabilities (PWD) | 3.1% | 1.7% |
| No Human Evaluation / Unknown | 13.8% | 78.6% |

## Limitations

The study scope is bounded by its keyword search strategy and restriction to English-language archival databases (IEEE Xplore and ISCA), which may omit relevant disability-focused venues or non-English speech engineering literature. The scoping review focuses exclusively on developmental neurodivergent conditions (stuttering, ADHD, ASD, bipolar disorder, Down syndrome) and does not examine acquired speech disorders, neurodegenerative conditions (e.g., ALS, Parkinson's), or physical motor disabilities. Additionally, qualitative discourse analysis inherently involves interpretive framing by the authors, though mitigated by team coding alignment.

## Why read this

Speech engineers, dataset curators, and researchers building speech recognition, synthesis, or paralinguistic models should read this paper to recognize how technical choices and dataset labeling practices inadvertently embed ableist assumptions. It provides a vital blueprint for shifting from deficit-based medical models toward participatory, social-model-aligned speech technology development.

## Code

- https://doi.org/10.5281/zenodo.20754795

## Applications

Guidance for speech technology researchers, dataset creators, and conference organizers to design inclusive evaluation frameworks, participatory data collection protocols, and anti-ableist communication standards.

## Institutions / 機構

University of California, Santa Cruz, AImpower.org, Stanford University

## Related

- (link related pages by id as the wiki grows)
