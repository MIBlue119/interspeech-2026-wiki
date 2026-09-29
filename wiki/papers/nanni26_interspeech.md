---
id: nanni26_interspeech
category: deepfake-security
institutions: ["University of Inland Norway"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2379
pdf: https://www.isca-archive.org/interspeech_2026/nanni26_interspeech.pdf
---

# Rethinking Consent Acquisition for Voice Synthesis: from Static to Dynamic Consent

*Matilde Nanni*

[PDF](https://www.isca-archive.org/interspeech_2026/nanni26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nanni26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2379)

**Category:** `deepfake-security`

**TL;DR** — This paper critically analyzes current contractual consent models in voice synthesis and proposes adopting 'dynamic consent' from bioethics as a governance solution to protect personal identity and prevent identity-based harms. It demonstrates how static one-time authorization fails due to the dual nature of voice as both data and an immutable marker of personal identity.

## Key contributions

- Analyzes the dual nature of voice as a data product and an intrinsic identity marker (characterization and identification), explaining why standard de-identification fails for synthetic voices.
- Critiques two real-world contractual consent frameworks—BeyondWords (general/broad consent) and Narrativ (specific static consent)—highlighting their failure to satisfy informed consent requirements.
- Proposes the adoption of 'dynamic consent' (borrowed from bioethics and managed via digital platforms) as an ongoing governance framework for synthetic voice technologies.
- Outlines key limitations of dynamic consent, noting that its deployment is restricted to controlled systems where voice sources retain significant negotiating power and where specific individual identities are replicated.

## Problem

Voice synthesis enables third parties to generate speech matching a person's exact vocal identity without ongoing control, leading to identity misattribution, reputational damage, and loss of agency. Existing safeguards rely either on broad contractual agreements (such as BeyondWords allowing any use except obscene or racist content) or overly granular static lists (such as Narrativ's 47 categories, which still fail to foresee evolving contexts and nuanced harms). These models fail to satisfy the core requirements of informed consent because they treat voice purely as data rather than an enduring extension of personal identity, leaving voice sources vulnerable to unapproved and harmful downstream deployments.

## Method

The paper builds a normative ethical and legal argument by examining contract law, bioethics literature, and real-world case studies (such as voice actor Paul Skye Lehrman). It contrasts static data-processing authorization models with the bioethical concept of dynamic consent, which relies on interactive digital platforms rather than one-time paperwork.

In a dynamic consent framework, consent-givers retain a centralized dashboard to review, update, and modify their consent permissions as new, unforeseen use cases emerge over time. Rather than attempting the impossible task of forecasting all future harms upfront or granting blanket permissions, the framework shifts consent from a static transaction to an ongoing governance process. This allows users to selectively grant, restrict, or withdraw authorization for specific deployments of their synthetic voice as commercial or personal contexts evolve.

## Experimental setup

This is a theoretical and critical ethics paper rather than an empirical machine learning study. It evaluates qualitative case studies and legal/contractual documents, specifically analyzing the UK voice cloning contract terms from BeyondWords and the category-based portal architecture previously operated by Narrativ in partnership with SAG-AFTRA.

## Results

The analysis demonstrates that general consent models (exemplified by BeyondWords) leave voice sources exposed to damaging associations—such as controversial product endorsements or political ads—that fall outside narrow exclusions like 'obscene or racist.' Specific static consent models (exemplified by Narrativ's 47 categories) partially mitigate this but break down when categories are ambiguous (e.g., 'health' covering both anti-smoking and pro-life campaigns) or when contexts change over time. The paper concludes that dynamic consent is the only model among those examined that successfully aligns with the contextual and evolving nature of identity-based harms.

## Limitations

Dynamic consent introduces higher administrative and infrastructural complexity and risks 'consent fatigue' for participants. Crucially, its regulatory function operates strictly at the deployment stage, meaning it is only viable in controlled deployment systems where individuals possess sufficient market negotiating power over their voice data. Furthermore, it is inapplicable to large multi-speaker text-to-speech models trained on pooled datasets where individual voices are not uniquely identifiable.

## Why read this

Speech and ML researchers, platform architects, and policymakers building voice cloning pipelines should read this paper to understand the severe ethical and legal limitations of current contractual terms of service. It provides a principled roadmap for moving beyond broken static consent mechanisms toward sustainable, identity-preserving governance frameworks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Ethical AI governance, voice cloning platform design, creator-consent management portals, and regulatory compliance frameworks for synthetic media.

## Institutions / 機構

University of Inland Norway

## Related

- [AI Regulation and the Technical Language of Speech Synthesis](williams26_interspeech.md) — same problem · relatedness 1.7/3
- [Voice Privacy from an Attribute-based Perspective](rahman26b_interspeech.md) — same problem · relatedness 1.6/3
- [Countermeasures Against Misuse of Speech Generative AI](yamagishi26_interspeech.md) — same problem · relatedness 1.6/3
- [Imperceptible Voiceprint Protection via Human-Machine Perception Discrepancy Feature Disentanglement](xue26_interspeech.md) — same problem · relatedness 1.5/3
- [DP-VOXLET: Provable Speaker Anonymization for Disentangled Speech Representations](ngong26_interspeech.md) — same problem · relatedness 1.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
