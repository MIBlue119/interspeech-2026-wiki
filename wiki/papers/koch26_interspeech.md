---
id: koch26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2417
pdf: https://www.isca-archive.org/interspeech_2026/koch26_interspeech.pdf
---

# Collecting Prosody in the Wild: A Content-Controlled, Privacy-First Smartphone Protocol and Empirical Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/koch26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koch26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2417)

**TL;DR** — This paper presents a smartphone-based ecological momentary assessment protocol that uses standardized read-aloud sentences to collect privacy-first prosodic data in the wild, instantly deleting raw audio and transmitting only local openSMILE features.

## Problem

Real-world speech collection typically suffers from a confound between lexical semantics and prosodic delivery, making it difficult to isolate vocal affect. Furthermore, collecting raw audio in the wild creates severe privacy risks and regulatory hurdles under data protection laws like the GDPR. Solving both problems is critical for conducting large-scale, ecologically valid behavioral and mental health research using mobile devices.

## Method

The protocol was integrated into an Android EMA application and deployed in a panel study where participants read three valence-controlled sentences (positive, neutral, negative) drawn randomly from a set of 54 validated German sentences. Audio was captured uncompressed at 16-bit depth and 44.1 kHz via smartphone microphones. An on-device openSMILE Android native executable extracted the 88-feature eGeMAPS set and the 6,373-feature ComParE 2016 set locally. Raw audio files and local CSV outputs were deleted immediately after extraction, and feature vectors were securely synced to a server via SSL encryption.

## Results

Evaluated on a quota-matched sample of 560 participants yielding 9,877 retained recordings, the protocol showed strong participant compliance with a 67.8% initiation rate and a 96.9% completion rate once started. Feature-based filtering removed 232 non-speech clips and 1,108 clips with non-positive harmonic-to-noise ratios. Linear mixed-effects models revealed high speaker-level stability with intraclass correlations ranging from 0.325 to 0.693 across prosodic metrics, alongside minor condition-specific shifts in HNR, voicing rate, and loudness. Downstream random forest classifiers trained on the extracted features predicted self-reported speaker sex with a balanced accuracy of 91.77% using eGeMAPS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Behavioral scientists, psychologists, and speech researchers deploying large-scale ecological momentary assessment studies on smartphones to analyze naturalistic prosody without violating user privacy.

## Limitations

The protocol relies on scripted read-aloud material rather than spontaneous speech, constraining linguistic content and potentially missing completely unconstrained prosodic expressions.

## Related

- (link related pages by id as the wiki grows)
