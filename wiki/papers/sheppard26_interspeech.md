---
id: sheppard26_interspeech
category: resources-evaluation
labels: [low-resource]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2904
pdf: https://www.isca-archive.org/interspeech_2026/sheppard26_interspeech.pdf
---

# Queer inclusion in speech datasets: An audit and taxonomy of practical tensions

*Brooklyn Sheppard, Anaelia Ovalle, Adina Williams, Levent Sagun*

[PDF](https://www.isca-archive.org/interspeech_2026/sheppard26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sheppard26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2904)

**Category:** `resources-evaluation` · **Labels:** `low-resource`

**TL;DR** — This paper audits six popular speech technology datasets and two community-designed queer speech datasets, revealing near-zero measurable LGBTQIA+ representation (0-1.4%) in mainstream corpora. It introduces a four-part taxonomy of tensions between standard AI data collection practices and marginalized community needs.

## Key contributions

- Audited six prominent open-source speech technology datasets (Edinburgh Accents, English Dialects, L2-ARCTIC, Common Voice 22.0, Fairspeech, and Casual Conversations V2) for queer representation, finding rates between 0% and 1.44%.
- Audited two speech science datasets created specifically by and for the queer community (MAGES and PTMV) to contrast practices.
- Proposed a novel four-part taxonomy of tensions: scaling vs. inclusion, efficiency vs. engagement, access vs. autonomy, and static categories vs. fluid identities.

## Problem

Mainstream speech and language models exhibit performance disparities and social biases against underrepresented groups due to training data omissions, yet collecting speech data for sensitive attributes like sexual orientation and gender identity introduces severe privacy risks like re-identification and 'gaydar' technologies. While sociolinguistic research documents distinct phonetic and prosodic features in queer speech, widely used speech technology datasets either lack queer speakers entirely or rely on binary, restrictive gender labels that cause downstream models to suffer significant performance degradation. Standard AI data collection approaches fail to account for these risks, leading to structural underrepresentation and potential algorithmic harm for the LGBTQIA+ community.

## Method

The authors conducted a structural audit across eight English-language speech datasets (six mainstream AI corpora and two queer-specific corpora) by examining six specific axes: gender identity annotation options, resulting distribution across gender labels, institutional affiliation, ethics review disclosure disclosures, participant recruitment methods, and data access/usage licenses.

Mainstream datasets were evaluated based on whether they utilized crowdsourcing (e.g., Common Voice, English Dialects), paid microworkers (e.g., Fairspeech, Casual Conversations V2), or academic volunteer recruitment. In contrast, the queer-specific MAGES (14 speakers) and PTMV (20 speakers) datasets utilized community-embedded, word-of-mouth, and social-media recruitment driven by researchers with lived experience, coupled with free-text identity write-in options rather than predefined mutually exclusive categorical labels.

## Experimental setup

The audit examined eight speech datasets ranging in size from 24 speakers (L2-ARCTIC) to 94,911 speakers (Common Voice 22.0). Datasets originated from academic institutions (Edinburgh Accents, L2-ARCTIC, MAGES, PTMV), for-profit corporations (Casual Conversations V2, English Dialects, Fairspeech), and non-profits (Common Voice). Evaluation relied on qualitative and quantitative demographic representation percentages, licensing constraints, and ethics review disclosures.

## Results

Measurable queer representation across mainstream speech technology datasets was found to be critically low, ranging from 0% to 1.44%. Specifically, Common Voice 22.0 (94,911 speakers) and English Dialects (120 speakers) contained 0% representation of non-binary or transgender speakers despite collecting self-reported labels, while Casual Conversations V2 (approx. 5,567 speakers) achieved only 1.44%. Fairspeech and Common Voice explicitly noted that non-binary participants were either entirely absent or purposely filtered out of final releases to avoid skewed results. Conversely, datasets built via community engagement (MAGES and PTMV) achieved 100% and 45% specialized representation respectively, though MAGES instituted strict access controls requiring direct researcher interviews to protect community safety.

| Dataset | # Speakers | Institution | Recruitment | Queer Rep. (%) |
|---|---|---|---|---|
| Casual Conversations V2 | ~5,567 | For-profit | Paid speakers | 1.44 |
| Common Voice 22.0 | 94,911 | Non-profit | Crowdsourced | 0 |
| Edinburgh Accents | 122 | Academic | Crowdsourced | 0.82 |
| English Dialects | 120 | For-profit | Crowdsourced | 0 |
| Fairspeech | 593 | For-profit | Paid speakers | 0 |
| MAGES | 14 | Academic | Social media / Word-of-mouth | 100 |

## Limitations

The audit is restricted to English-language corpora and focuses primarily on gender identity (transgender and non-binary representation) as an artifact of available dataset annotations, rather than encompassing all dimensions of the broader LGBTQIA+ acronym. Furthermore, queer-specific corpora like MAGES and PTMV are exceptionally small (14 and 20 speakers respectively), making them statistically insufficient for large-scale model pretraining.

## Why read this

Speech researchers and dataset creators should read this paper to understand the severe ethical limitations of scaling crowdsourced data collection for marginalized groups and to adopt participatory, privacy-conscious alternatives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Ethical data collection framework design, socially responsible speech dataset curation, and fair speech technology auditing.

## Institutions / 機構

University of Calgary, Meta

## Related

- (link related pages by id as the wiki grows)
