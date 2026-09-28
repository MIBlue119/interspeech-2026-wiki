---
id: sheppard26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2904
pdf: https://www.isca-archive.org/interspeech_2026/sheppard26_interspeech.pdf
---

# Queer inclusion in speech datasets: An audit and taxonomy of practical tensions

[PDF](https://www.isca-archive.org/interspeech_2026/sheppard26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheppard26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2904)

**TL;DR** — An audit of six mainstream speech technology datasets reveals that measurable LGBTQIA+ representation is critically low (0–1.4%), and establishes a four-part taxonomy of tensions between standard AI data collection customs and the preferences of marginalized communities.

## Problem

Voice carries deep identity characteristics, and the lack of queer representation in speech technology datasets risks downstream speech models underperforming or exhibiting bias against LGBTQIA+ speakers. Furthermore, standard AI data collection methods often conflict with the safety and autonomy requirements of marginalized communities, heightening risks of voice misappropriation and surveillance.

## Method

The authors audited eight speech datasets in total: six speech technology datasets (Edinburgh Accents, English Dialects, L2-ARCTIC, Common Voice 22.0, Fairspeech, and Casual Conversations V2) and two speech-science datasets designed specifically for queer inclusion (Mid-Asian Gender Expansive Speech [MAGES] Corpus and A Palette of Transmasculine Voices [PTMV]). The audit analyzed gender identity annotation options, demographic distributions, institutional affiliations, ethics review disclosures, participant recruitment methods, and data access policies. Based on these findings, the authors constructed a qualitative taxonomy of tensions spanning scaling versus inclusion, efficiency versus engagement, access versus autonomy, and static categories versus fluid identities.

## Results

Quantitatively, four of the six mainstream speech technology datasets (Fairspeech, L2-ARCTIC, English Dialects, Common Voice 22.0) contained exactly 0% queer or non-binary representation, while Casual Conversations V2 and Edinburgh Accents contained 1.44% and 0.82% respectively. Mainstream datasets relied heavily on crowdsourcing, microwork platforms, or broad open calls, and mostly enforced mutually exclusive, pre-defined gender categories. In contrast, queer-specific datasets (MAGES and PTMV) utilized community-engaged word-of-mouth and social media recruitment, and permitted participants to freely self-express their gender identities without rigid constraints. Regarding access, most mainstream datasets are open access for training and evaluation (though Fairspeech and CCV2 restrict usage strictly to model evaluation), whereas queer-specific corpora enforce protective measures such as clinical-only use (PTMV) or mandatory researcher interviews before release to honor community vulnerability (MAGES).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech dataset curators, AI ethicists, and speech technology engineers seeking to design fairer, more inclusive speech collection protocols and mitigate model bias against marginalized groups.

## Limitations

The investigation of queer representation focuses primarily on the dimension of gender identity due to availability in existing dataset annotations, though the identified tensions apply to the queer community as a whole.

## Related

- (link related pages by id as the wiki grows)
