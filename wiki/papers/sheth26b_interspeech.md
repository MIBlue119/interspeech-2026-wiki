---
id: sheth26b_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2489
pdf: https://www.isca-archive.org/interspeech_2026/sheth26b_interspeech.pdf
---

# From Academic Tool to Community Infrastructure: A Call for Indigenous Partnership in Speech Data Governance

*Kaveri K. Sheth, Sebastien Christian*

[PDF](https://www.isca-archive.org/interspeech_2026/sheth26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheth26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2489)

**TL;DR** — The authors examine ELSI, a governance and data-management platform holding child-centered audio datasets from 10 indigenous communities, and publicly critique its current centralized European academic control, calling for a co-designed community custodianship framework.

## Key contributions

- Audited the ELSI speech platform's access model against established Indigenous data sovereignty frameworks (CARE and OCAP).
- Cataloged 10 distinct non-public indigenous and small-scale community speech datasets across multiple global regions.
- Proposed an architectural extension adding a Community Custodian tier with veto power, access logging, and permitted-use definitions.
- Issued a formal, actionable call to action for indigenous organizations and researchers to co-design data governance protocols.

## Problem

Speech technology development suffers from a severe data availability gap for low-resource and indigenous languages, often driving researchers to acquire audio corpora from small-scale communities. However, when these corpora are collected, their governance typically mirrors the priorities of academic researchers rather than the source communities. Platforms like HomeBank and Databrary provide tiered access control for researchers but entirely lack mechanisms for source communities to participate in governance, receive access notifications, or veto specific use cases. This perpetuates a history of extractive research practices where formal control over indigenous recordings remains geographically, culturally, and institutionally distant.

## Method

ELSI operates via a tiered role-based architecture consisting of Custodians (currently three European academic members of the ExELang Consortium holding master access to raw audio), Tool Creators (who build machine learning models like Voice Type Classifiers on approved data), and Analysts (who work exclusively with derived outputs). To resolve the governance gap, the authors propose introducing a Community Custodian role into this existing structure. This tier would grant community-designated bodies administrative capabilities, including absolute veto power over model training and data usage, transparent access logs, customizable permitted-use definitions, and the right to withdraw datasets.

Technically, this model relies on data being organized by corpus within ELSI's existing infrastructure, requiring targeted updates primarily in the permissions layer, alongside custom dashboards, notification systems, and use-case declaration forms. The authors explicitly note that determining who constitutes the legitimate 'community' or governance body is deeply complex and contested, rendering top-down impositions by academic institutions inadequate. Consequently, the technical architecture is intentionally positioned as an open-ended starting point subject to collaborative co-design with indigenous partners rather than a fixed prescription.

## Experimental setup

The ELSI platform houses over 40 child-centered audio datasets comprising long-form naturalistic daylong recordings across 18+ languages. Among these, at least 10 datasets originate from indigenous and small-scale communities across Papua New Guinea (e.g., Yélı-Dnye), Mexico (Tseltal), Bolivia (Tsimane, Quechua), Peru (Ticuna), Vanuatu, the Solomon Islands, and Timor-Leste (Mambai, Kairui). The study serves as a qualitative governance audit and structural proposal rather than a quantitative machine learning benchmark, mapping platform permissions against statutory requirements (such as GDPR, French Loi Informatique et Libertés, and Code de la recherche) and normative frameworks like the CARE and OCAP principles.

## Results

The qualitative assessment reveals that while ELSI's tiered access model and non-public data status successfully protect sensitive child-centered audio from wide distribution, it falls critically short on CARE principles concerning Collective Benefit and Authority to Control. Specifically, source communities currently lack mechanisms to veto use cases, receive usage notifications, or establish boundaries for model training. The authors do not present quantitative model performance metrics or algorithmic evaluations, as the paper focuses entirely on institutional transparency, governance self-assessment, and laying out a roadmap for equitable community-driven infrastructure.

## Limitations

The proposed community custodian model faces inherent operational challenges, including the difficulty of identifying legitimate community representatives amidst fragmented or competing local power structures. ELSI itself is not currently designed to repatriate raw audio back to communities, and a governance structure initiated by European academics cannot fully substitute for direct community-led frameworks. Furthermore, the scope remains constrained by existing legal frameworks (GDPR and national export laws) which may conflict with localized indigenous governance desires.

## Why read this

Speech researchers, curators, and engineers building datasets or training models on indigenous and low-resource speech should read this paper to understand the ethical and architectural requirements of data sovereignty. It challenges the field to move beyond researcher-centric access controls toward true community governance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of equitable, community-governed speech data repositories and ethical frameworks for processing sensitive indigenous recordings.

## Related

- (link related pages by id as the wiki grows)
