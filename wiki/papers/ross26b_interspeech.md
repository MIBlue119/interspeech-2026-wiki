---
id: ross26b_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2411
pdf: https://www.isca-archive.org/interspeech_2026/ross26b_interspeech.pdf
---

# Sexualised Synthetic Personas Encode and Amplify Gendered Power Asymmetries through Voice

[PDF](https://www.isca-archive.org/interspeech_2026/ross26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ross26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2411)

**TL;DR** — A listening experiment reveals that commercial sexualised synthetic voices reinforce gendered power asymmetries, with female-coded voices perceived as submissive and sexualised, and male-coded voices as dominant and positive.

## Problem

Commercial voice AI platforms frequently offer sexualised personas (e.g., flirt, temptress) that risk reproducing and amplifying harmful gender stereotypes, toxic masculinity, and heteronormativity. While platforms claim gender parity in offering these styles for both male and female voices, it remains unknown whether users perceive them similarly or how they encode power dynamics. Examining this from a Feminist HCI perspective is crucial to understanding how modern speech synthesis technologies shape social relations and bias.

## Method

The authors conducted a web-based listening experiment using jsPsych with 120 diverse North American English-speaking participants divided into four demographic groups based on gender and sexual attraction. Stimuli consisted of 30 audio samples from ElevenLabs' Voice Library, covering 6 sexualised personas (3 female, 3 male) and 4 non-sexualised control personas, paired with either sexualised platform scripts or neutral Rainbow Passage text. Participants evaluated each sample by selecting 3 adjectives from a balanced list of 36 terms spanning positive, negative, dominant, submissive, and sexualised categories. Generalised linear mixed effects regression models were used to analyze adjective distributions against voice gender, text type, and listener characteristics, alongside acoustic measures of mean F0 and speaking rate.

## Results

Across all listeners, male-coded voices were significantly more frequently ascribed dominant (p < 0.001) and positive (p = 0.0027) adjectives, whereas female-coded voices were predominantly characterized as submissive (p < 0.001) and sexualised (p < 0.001). When sexualised voices read neutral text (Rainbow Passage), the proportion of sexualised adjectives dropped dramatically for male voices (from 46% to 18%) but remained high for female voices (57% to 36%), indicating that female perceptions are heavily driven by inherent prosodic and paralinguistic features like breathiness and sighs. Acoustic analysis showed that sexualised voices had slower speaking rates on average (2.4 syllables/sec) compared to informative voices (3.8 syllables/sec), and sexualised male voices featured markedly lower mean F0 (70.08 Hz) than informative male voices (110.88 Hz). Men attracted exclusively to women (Group 4) were significantly more likely to apply sexualised adjectives to female voices (p = 0.0088) and positive adjectives to male voices (p = 0.0017) compared to other listener groups.

## Code

- https://ariadnasc.github.io/synth-personas

## Applications

Speech engineers, platform designers, and policymakers can use these insights to audit commercial voice generation systems, mitigate gender bias, and design more equitable conversational AI interfaces.

## Limitations

The study focuses specifically on English-language commercial voices from one platform (ElevenLabs) and a controlled set of 30 stimuli evaluated by US and Canadian participants.

## Related

- (link related pages by id as the wiki grows)
