---
id: sheppard26b_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2908
pdf: https://www.isca-archive.org/interspeech_2026/sheppard26b_interspeech.pdf
---

# Towards participatory speech dataset curation: A queer case study and conceptual framework

*Brooklyn Sheppard, Anaelia Ovalle, Adina Williams, Levent Sagun*

[PDF](https://www.isca-archive.org/interspeech_2026/sheppard26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheppard26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2908)

**Category:** `resources-evaluation`

**TL;DR** — This paper establishes a conceptual and normative framework for participatory speech dataset curation using the LGBTQIA+ (queer) community as a high-stakes case study. It proposes moving beyond traditional top-down crowdsourcing to a cyclical, bidirectional co-design model that balances individual autonomy with community representation.

## Key contributions

- Identifies unique sociotechnical challenges in queer speech data collection, including the risks of 'outing' speakers through gender/identity annotations and historic AI harms (e.g., 'gaydar' and toxic dialect flagging).
- Reviews limitations of existing speech corpora (like Common Voice, MAGES, and Fairspeech) regarding non-binary and marginalized representation.
- Proposes a four-phase conceptual framework for participatory curation: Community, Project Formulation, Modes of Participation, and Personal Autonomy.
- Adapts field linguistics' reciprocal knowledge-sharing models and participatory AI methodologies into actionable normative infrastructure for speech dataset governance.

## Problem

Traditional speech dataset collection relies heavily on top-down crowdsourcing or extractive data-gathering paradigms that treat marginalized populations purely as subjects rather than co-creators. For the queer community, standard practices like binary or perceived gender annotation risk misgendering and involuntarily disclosing sensitive identity attributes, leading to documented distrust of AI developers. Furthermore, existing speech models and benchmark datasets consistently underrepresent or exhibit performance biases against non-binary and gender-diverse speakers, a gap that cannot be fixed simply by scaling up uncurated data without structural community engagement.

## Method

The paper outlines a normative framework structured around four overlapping, bidirectional phases of engagement designed to replace unidirectional data extraction pipelines.

Phase 1 (Community) defines the target group and actively interrogates exclusion criteria, such as geographic biases toward the Global North or English-centric networks like Queer in AI, ensuring researchers explicitly acknowledge who is left out.

Phase 2 (Project Formulation) establishes collaborative decision-making on speech genres (e.g., conversational vs. read speech), data storage security (such as adopting institutional review board frameworks similar to Databrary), and public release terms versus access restrictions to protect vulnerable contributors.

Phase 3 & 4 (Modes of Participation and Personal Autonomy) map out flexible collaboration structures, varying compensation or authorship acknowledgments, and granular individual controls such as the absolute right to revoke contributed voice data when personal circumstances or gender identities fluctuate over time.

## Experimental setup

This is a conceptual and framework-oriented paper rather than an empirical modeling study, so it does not introduce new datasets or quantitative speech benchmarks. Instead, it synthesizes insights from prior literature, qualitative studies, and existing community-led initiatives such as the StammerTalk stuttered speech project and PARQAIR-MH mental health AI framework. It analyzes these reference points qualitatively to ground its proposed four-phase governance model for speech technology.

## Results

Because this is a position and framework paper, it does not report quantitative machine learning metrics or baseline comparisons. Its central qualitative finding is that conventional speech collection pipelines fail to account for the dynamic nature of queer speech (influenced by voice coaching, hormone therapy, or context) and inflict privacy risks. The paper highlights preliminary literature showing that while models perform poorly on 'other' gender categories in datasets like Common Voice 16.0, small sample sizes (8 to 86 speakers) preclude generalizable conclusions without the proposed participatory curation infrastructure.

## Limitations

The proposed framework is currently conceptual and lacks large-scale empirical validation through a newly deployed speech dataset. The paper acknowledges that achieving full representation across every intersection of race, language, disability, and gender within a single project is virtually impossible. Additionally, applying rigorous participatory governance requires significant time, trust-building, and institutional resources that may conflict with rapid, large-scale commercial dataset collection pipelines.

## Why read this

Speech and ML researchers building inclusive datasets, synthetic voice cloning systems, or automatic speech recognition models for diverse populations should read this to understand ethical community engagement. It provides a concrete blueprint for avoiding 'participation washing' and designing governance structures that protect vulnerable speakers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of inclusive text-to-speech voice customization options, ethical speech recognition and speaker verification systems, and sensitive data governance frameworks for marginalized speech communities.

## Institutions / 機構

University of Calgary, Meta

## Related

- (link related pages by id as the wiki grows)
