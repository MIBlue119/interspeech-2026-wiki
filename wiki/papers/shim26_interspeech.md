---
id: shim26_interspeech
category: tts
institutions: ["Simon Fraser University", "University of Massachusetts Amherst", "Enchanted Tools", "CNRS", "Universite Paris Cite"]
code: https://osf.io/8ka5y
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3075
pdf: https://www.isca-archive.org/interspeech_2026/shim26_interspeech.pdf
---

# Should Robots Sound more like Machines than like Humans? User Expectations Affect the Perception of Prosody in TTS Voices

*Ha Eun Shim, Paige Tuttösí, Olivia Yung, Ivan Fong, Sara Ng, Angelica Lim, Yue Wang, H. Henny Yeung*

[PDF](https://www.isca-archive.org/interspeech_2026/shim26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shim26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3075)

**Category:** `tts`

**TL;DR** — This paper investigates how manipulating prosody and indexical machine-likeness in text-to-speech (TTS) avatar voices affects human syntactic disambiguation, finding that machine-like voice quality unexpectedly increases listener intelligibility on ambiguous punctuated sentences. Pitch variations (affective vs. monotonic) improve perceived naturalness but do not aid comprehension.

## Key contributions

- Evaluated the impact of both prosodic intonation (affective vs. monotonic) and indexical voice quality (human-like vs. machine-like) on objective syntactic disambiguation performance.
- Demonstrated that machine-like voice qualities increase listener comprehension accuracy specifically on sentences containing prosodic boundaries (commas), overturning assumptions that more human-like TTS is always superior for understanding.
- Showed that while affective pitch modulation significantly improves MOS ratings of voice naturalness, it has no statistically significant effect on objective speech intelligibility.
- Provided a controlled experimental paradigm using 160 human participants evaluating a fine-tuned Matcha-TTS avatar across direct-address and list sentence structures.

## Problem

Current text-to-speech (TTS) development evaluates success almost exclusively through qualitative user questionnaires (such as MOS or Godspeed scales) measuring naturalness, anthropomorphism, and user satisfaction, while treating speech intelligibility as an isolated metric. Furthermore, modern neural TTS systems frequently struggle to convey subtle prosodic cues needed to resolve syntactic ambiguities, such as relative clause attachments or comma-delimited boundaries (e.g., 'pull, Bart' vs. 'pull Bart'). Previous literature assumes that improving human-like qualities and emotional intonation uniformly enhances human-robot interaction, neglecting how indexical voice properties alter listener expectations, attention, and interpretation strategies.

## Method

The authors synthesized test stimuli using a fine-tuned Matcha-TTS architecture, a neural text-to-speech model initially adapted using recordings from a female native English speaker reading sentences with explicit comma-related prosodic contrasts. Four distinct voice conditions were generated: Human-like Affective, Human-like Monotonic, Machine-like Affective, and Machine-like Monotonic. To create monotonic variations, the authors applied the Praat Vocal Toolkit command 'Change pitch median and variation' scaled to a 40% reduction in pitch height and range. Machine-like voice conditions were synthesized by applying a Praat 'Delay' filter of 0.02s combined with an amplitude setting of 0.5 Pa; the Machine-like Monotonic voice received both the pitch and delay/amplitude manipulations.

During the evaluation, 160 participants took part in a robot-training task where they listened to single-sentence utterances from a robot avatar and determined whether the speech matched a target picture representing either a 'With Comma' or 'Without Comma' syntactic structure. Each participant was assigned to exactly one of the four voice conditions and evaluated 40 unique sentences (comprising direct-address items, list items, and tense/lax vowel fillers). Following the listening task, participants completed an 11-point Likert scale questionnaire incorporating MOS-X2 items (Intelligible, Natural, Prosodic, Sociable) and Godspeed perceived intelligence items (Competent, Intelligent), alongside AI familiarity questions. Data from the robot training task were analyzed using mixed-effects logistic regression models, while questionnaire responses were evaluated using cumulative link ordinal models.

## Experimental setup

The experiment evaluated 160 native English-speaking participants recruited via Prolific (aged 19 to 30 years, 91 females, 68 males), with 40 participants assigned to each of the four voice conditions. Stimuli consisted of 40 unique sentences per participant divided into Direct Address (DA) pairs, List pairs, and vowel-contrast fillers spanning With Comma and Without Comma conditions. Baselines were formed by comparing the four permutations of affectiveness and human/machine indexical qualities. Statistical significance was assessed via Type III Likelihood Ratio Tests on maximal converged mixed-effects logistic regression models.

## Results

The omnibus mixed-effects model revealed a significant three-way interaction between Picture Match, Comma condition, and Voice Condition (chi-squared = 9.93, p = 0.019). Contrast analyses indicated that human-like voices differed significantly from machine-like voices (beta = -0.51, SE = 0.22, z = -2.29, p = 0.022), with machine-like voices achieving higher accuracy specifically in the 'With Comma' condition by mitigating the drop in listener comprehension. Questionnaire data showed no main effect of Voice Condition on overall ratings (p > 0.10), though post-hoc tests confirmed that affective voices were rated significantly more natural (p < 0.01) and human-like voices were marginally rated as smarter than machine-like ones (p = 0.064). Voice affectiveness pitch modifications had no significant effect on intelligibility.

| System Condition | Intelligibility / Disambiguation Accuracy (With Comma) | Mean Naturalness MOS (0-10) |
|---|---|---|
| Human-like Affective | Lower accuracy on comma boundaries | Higher rating (~7-8) |
| Human-like Monotonic | Lower accuracy on comma boundaries | Lower rating (~4-5) |
| Machine-like Affective | Higher accuracy on comma boundaries | Moderate rating |
| Machine-like Monotonic | Higher accuracy on comma boundaries | Lower rating |

## Limitations

The study utilized a between-subjects design where each participant listened to only a single voice condition, preventing direct side-by-side user comparisons of multiple avatars. Testing was restricted to young adult native English speakers in the United States and Canada, limiting generalizability across age groups and languages. The evaluation relied on a specific task and synthetic voice engine (Matcha-TTS), and did not explicitly measure listeners' cognitive listening effort or gaze tracking to definitively confirm whether the machine-like intelligibility boost stems from altered listener expectations or heightened attentional scrutiny.

## Why read this

Speech researchers and conversational AI engineers building virtual assistants or robot avatars should read this paper to understand that optimizing strictly for human-like naturalness and affective prosody does not automatically improve speech comprehension, and that counterintuitive indexical properties can actively enhance listener attention to syntactic boundaries.

## Code

- https://osf.io/8ka5y

## Applications

Design of conversational agents, social robots, and text-to-speech navigation systems where syntactic clarity and disambiguation of complex sentences are critical to preventing user misunderstandings.

## Institutions / 機構

Simon Fraser University, University of Massachusetts Amherst, Enchanted Tools, CNRS, Universite Paris Cite

## Related

- [DEBATE: A Dataset for Disentangling Textual Ambiguity in Mandarin Through Speech](guo26e_interspeech.md) — same problem · relatedness 1.9/3
- [Knowing What to Stress: A Discourse-Conditioned Text-to-Speech Benchmark](turetzky26_interspeech.md) — same problem · relatedness 1.8/3
- [What Makes Synthetic Speech Sound Sarcastic? A Prosody-Controlled Perception Study](li26x_interspeech.md) — shared technique · relatedness 1.8/3
- [A barrier or a booster? Familiarity effects on Mandarin emotion prosody recognition using AI-powered voice cloning](xu26i_interspeech.md) — same problem · relatedness 1.8/3
- [Modulation of Phonetic Realizations in Cantonese Dialogue with Human and AI Interlocutors](chen26m_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
