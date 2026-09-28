---
id: olewale26_interspeech
category: low-resource
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-815
pdf: https://www.isca-archive.org/interspeech_2026/olewale26_interspeech.pdf
---

# Vavanagi: a Community-run Platform for Documentation of the Hula Language in Papua New Guinea

[PDF](https://www.isca-archive.org/interspeech_2026/olewale26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/olewale26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-815)

**TL;DR** — We introduce Vavanagi, a fully community-led platform for crowdsourcing English-Hula text translation and voice recordings, which has successfully gathered over 12,000 parallel sentence pairs.

## Problem

Endangered low-resource languages like Hula (spoken by ~10,000 people in Papua New Guinea) face severe displacement pressure from urban mobility and dominant languages like Tok Pisin. Existing language technology projects often relegate indigenous communities to passive data sources rather than granting them genuine data governance and design authority. The authors address this gap by establishing a reusable five-level community involvement spectrum and proving that grassroots platforms can achieve Level 5 self-governance.

## Method

The Vavanagi platform was built using Replit and standard web code editors, backed by Firebase Firestore for document storage, authentication, and action tracking at a total operational cost under $20 USD. It implements a four-stage workflow: admin source import, crowdsourced text and audio data entry by 77 community members, elder-led review with structured flagging and iterative feedback loops, and data export. Community governance is reinforced via a WhatsApp network for recruitment, role-based access permissions, and a crowdsourced financial prize pool where urban expatriate members fund village-based translators.

## Results

The platform accumulated over 12,124 parallel sentence pairs covering 7,948 unique English words and 9,556 unique Hula words, contributed by 77 translators and 4 reviewers. Sentences have a median length of 8 words (39 characters), with a high first-pass review approval rate of 91%. System Usability Scale (SUS) evaluation completed by 8 translators yielded a mean score of 73.4 out of 100, indicating above-average usability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Indigenous communities, linguists, and speech engineers building low-resource machine translation and automatic speech recognition systems for endangered languages.

## Limitations

The current platform mandates text entry before audio attachment, introducing a participation barrier for older fluent speakers with lower digital literacy.

## Related

- (link related pages by id as the wiki grows)
