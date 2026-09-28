---
id: weller26_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3304
pdf: https://www.isca-archive.org/interspeech_2026/weller26_interspeech.pdf
---

# HaessigDB: A Database of Irritable Speech with Intensity Grading

[PDF](https://www.isca-archive.org/interspeech_2026/weller26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/weller26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3304)

**TL;DR** — The paper introduces HaessigDB, a human-annotated emotional speech database featuring ordinal intensity ratings across annoyance, frustration, and aggression to support escalation management in conversational systems.

## Problem

Existing speech emotion datasets primarily focus on general, coarse, or binary emotion categories and lack intensity grading or temporal dynamics. This makes them unsuitable for customer service applications where intervention decisions and conversation escalation depend on the gradual evolution of user irritability.

## Method

The corpus comprises 45 synthetically generated banking call scripts recorded by four professional voice actors in English, yielding sentence-level snippets averaging 3.91 seconds. A total of 374 crowd-sourcers on Prolific rated the snippets on an ordinal scale from 1 to 10 for annoyance, frustration, and aggression. To ensure high quality, the authors iteratively pruned snippets to achieve a Krippendorff's alpha threshold of alpha >= 0.80 per dimension, producing curated high-agreement subsets alongside inner- and outer-joined combined variants.

## Results

The raw dataset contains 1,068 valid snippets, while the high-agreement subsets contain 553 snippets for annoyance, 537 for frustration, and 516 for aggression. An evaluation of five popular Hugging Face speech emotion recognition models using a threshold sweep against the aggression subdimension revealed major failure modes, as existing categorical models fail to capture graded intensity shifts properly. Analysis of conversation trajectories demonstrates that irritability levels monotonically increase over the first 10 dialogue turns before plateauing.

## Code

- https://huggingface.co/datasets/nwllr/haessigDB

## Applications

Engineers and researchers building customer service voicebots, automated call routing systems, and escalation-aware conversational agents will use this database for training fine-grained emotion detectors and handoff policies.

## Limitations

The database relies on acted rather than naturally occurring customer service audio.

## Related

- (link related pages by id as the wiki grows)
