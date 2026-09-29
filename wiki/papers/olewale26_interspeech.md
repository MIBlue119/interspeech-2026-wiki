---
id: olewale26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release]
institutions: ["Vula’a Kunenai Community", "University of Melbourne"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-815
pdf: https://www.isca-archive.org/interspeech_2026/olewale26_interspeech.pdf
---

# Vavanagi: a Community-run Platform for Documentation of the Hula Language in Papua New Guinea

*Bri Olewale, Raphael Merx, Ekaterina Vylomova*

[PDF](https://www.isca-archive.org/interspeech_2026/olewale26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/olewale26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-815)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — We present Vavanagi, a community-run, crowdsourced platform for Hula—an Austronesian language of Papua New Guinea with ~10,000 speakers—that has generated over 12,000 English-Hula parallel text and voice sentences.

## Key contributions

- Proposed a novel 5-level community involvement spectrum for language technology, establishing Vavanagi as a Level 5 fully community-governed project.
- Built and deployed the Vavanagi platform, resulting in a parallel corpus of 12,124+ sentence pairs covering 7,948 unique English and 9,556 unique Hula words.
- Introduced a grassroots crowdfunding and incentive model (PGK0.10 per sentence funded by urban diaspora) to sustain village-based translation labor.
- Demonstrated the use of AI-assisted coding tools by a community member to rapidly develop custom digital infrastructure tailored to local governance.

## Problem

Papua New Guinea exhibits immense linguistic diversity, but smaller indigenous languages like Hula (~10,000 speakers) face severe pressure from urban migration and Tok Pisin dominance. Prior language technology and documentation projects are typically externally initiated and led, often reducing language communities to passive data sources rather than granting them data sovereignty and design authority. This top-down model fails to respect community agency or build sustainable, locally governed digital ecosystems.

## Method

The Vavanagi platform is architected around a four-stage translation and review pipeline implemented using Firebase Firestore for backend database management, authentication, and logging. The tech stack was initially prototyped in Replit with the assistance of AI coding tools, keeping total tech costs under $20 USD. The workflow consists of administrators importing English source prompts, community translators submitting Hula text translations and optional voice recordings, a reviewer team (composed of WhatsApp group administrators) providing iterative feedback, and final export for downstream tasks. 

The governance and financing model directly links urban diaspora members who contribute funds (PGK10–PGK100) to a shared prize pool rewarding village-based translators (PGK0.10 per sentence). This bridges geographical divides and distributes participation across generations, addressing the tension between tech-savvy youth and elder fluent speakers.

## Experimental setup

The platform engaged 77 translators and 4 reviewers from the Hula (Vula’a) community in Central Province, Papua New Guinea. Evaluation metrics include corpus volume statistics, System Usability Scale (SUS) scores collected from 8 translators, and a multi-level qualitative framework measuring community agency across five distinct tiers.

## Results

The platform successfully yielded 12,124+ approved English-Hula sentence pairs spanning 7,948 unique English words and 9,556 unique Hula words, with a median sentence length of 8 words (39 characters). The initial batch of 2,000 sentences was completed in two weeks, and a second batch of 1,500 in three days. A high first-pass approval rate of 91% (8% approved after two revisions, 1% after three or more) demonstrates strong alignment between translators and reviewers. System Usability Scale (SUS) evaluation from 8 users yielded a mean score of 73.4, indicating above-average usability.

| System / Condition | Sentence Pairs | Unique Hula Words | Translators | Reviewers | Mean SUS Score |
|---|---|---|---|---|---|
| Vavanagi Platform | 12,124+ | 9,556 | 77 | 4 | 73.4 |

## Limitations

The current platform setup requires text input, which creates a participation barrier for older elders who are highly fluent in spoken Hula but lack digital literacy or writing proficiency. The dataset is currently limited to 12,124 parallel sentences and has not yet been deployed to train downstream automated speech recognition or machine translation models, which remain future work. Additionally, evaluation is restricted to a small user feedback cohort (8 participants for SUS) due to the grassroots scale of the community.

## Why read this

Speech and ML researchers focusing on low-resource languages should read this to understand how to design truly community-led data collection pipelines that prioritize data sovereignty and local governance over extractive, top-down data harvesting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Downstream development of automated speech recognition (ASR), machine translation (MT), voice-enabled Hula-English commerce applications, and cultural heritage archiving.

## Institutions / 機構

Vula’a Kunenai Community, University of Melbourne

**Funding / 經費:** Australian Research Council

## Related

- (link related pages by id as the wiki grows)
