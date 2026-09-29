---
id: leoni26_interspeech
category: tts
labels: [low-resource, multilingual, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1443
pdf: https://www.isca-archive.org/interspeech_2026/leoni26_interspeech.pdf
---

# Indigenising Speech Technology: Building a TTS Model for te Reo Māori

*Gianna Leoni, Peter-Lucas Jones, Tūreiti Keith, Suzanne Duncan*

[PDF](https://www.isca-archive.org/interspeech_2026/leoni26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/leoni26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1443)

**Category:** `tts` · **Labels:** `low-resource`, `multilingual`, `generative-model`

**TL;DR** — This paper presents an Indigenous-led text-to-speech (TTS) development framework for te reo Māori and New Zealand English, demonstrating that meticulous data curation and quality assurance can produce superior models with under 33 total hours of audio data.

## Key contributions

- Established a culturally grounded, Indigenous-led pipeline for data curation, collection, and QA that respects data sovereignty.
- Curated specialized benchmark datasets comprising a 90-sentence Māori phoneme-coverage set and a 100-sentence bilingual code-switching set.
- Demonstrated transfer-learning efficiency by leveraging a phonetically overlapping base language (Spanish) before fine-tuning on ~24 hours of male and ~8 hours of female Māori/English voice data.
- Integrated expert in-house linguists and tribal elders throughout text preparation, orthography correction (macrons, proper nouns), and qualitative audio evaluation.

## Problem

Mainstream speech technology consistently fails to produce high-quality TTS for Indigenous and low-resource languages due to inaccessible, poorly curated corpora that ignore unique phonologies like Māori consonant clusters ('ng', 'wh') and vowel length. Open datasets that claim to include Māori are error-prone and lack representation of regional accents and bilingual code-switching common in Aotearoa New Zealand. Relying on foreign synthesizers produces near-unintelligible results, locking Indigenous speakers out of accessible voice assistants, navigation, and language revitalisation tools.

## Method

The training pipeline builds upon prior architecture leveraging International Phonetic Alphabet (IPA) phonemisation and Spanish pre-training data due to shared phonetic properties (covering most Māori phonemes while differing in vowel length and rolled /r/). Fine-tuning is executed using high-quality internal recordings from selected broadcasters possessing deep linguistic expertise and genealogical ties to the community.

Data collection involves rigorous multi-stage curation: texts from fiction and non-fiction are manually cleaned, segmented by punctuation, and verified for orthographic accuracy (including macron placement and proper nouns) by experienced language specialists. Recordings are captured in professional studio environments across ~24 hours for the male voice (11h Māori, 13h English) and >8 hours for the female voice (3h Māori, 5h English). Iterative qualitative evaluation by native-speaking language specialists guides data expansion to address specific failure modes like numbers, acronyms, and proper nouns.

## Experimental setup

The system was evaluated using two custom benchmarks: a 90-sentence monolingual Māori dataset covering all rare sounds and phonemes, and a 100-sentence bilingual code-switching dataset derived from archived meeting transcripts. Evaluation relies primarily on expert human qualitative review measuring vowel/consonant pronunciation, pitch, prosody, intonation, rhythm, clarity, and naturalness against baseline outputs.

## Results

The resulting models successfully eliminate the robotic, segmented cadence typical of out-of-domain synthesizers, delivering native-like fluency and accurate handling of unique Māori phonemes and bilingual code-switching. Ablations and qualitative audits revealed that early models struggled with proper nouns and acronyms due to data sparsity, which was systematically resolved by targeted data curation and re-recording. The paper primarily demonstrates superiority over existing commercial devices and open-source benchmarks that fail to produce intelligible Māori TTS.

## Limitations

The approach relies heavily on scarce in-house language experts and tribal specialists for manual curation and QA, presenting a scaling bottleneck. Evaluation is predominantly subjective and qualitative, lacking automated metric correlates like WER. The current base models intentionally omit emotional nuance to ensure baseline stability, and while a general regional accent was targeted first, other tribal dialects remain to be captured.

## Why read this

Speech and ML engineers building voice tech for low-resource, endangered, or Indigenous languages should read this to learn how rigorous human-in-the-loop data curation and transfer learning can bypass the need for massive web-scale corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Language revitalisation tools, bilingual public transport announcements, pronunciation learning apps, and accessible screen-reading software for te reo Māori and New Zealand English speakers.

## Institutions / 機構

Te Hiku Media

**Funding / 經費:** Te Puni Kokiri, Ministry for Business, Innovation and Employment

## Related

- (link related pages by id as the wiki grows)
