---
id: edet26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1868
pdf: https://www.isca-archive.org/interspeech_2026/edet26_interspeech.pdf
---

# Towards Digital Preservation of Efik: TTS for a Low-Resource African Language

[PDF](https://www.isca-archive.org/interspeech_2026/edet26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/edet26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1868)

**TL;DR** — This paper presents the first end-to-end text-to-speech study and single-speaker corpus for Efik, showing that cross-lingually pretrained MMS-TTS achieves the highest naturalness MOS of 3.80 among four benchmarked neural architectures.

## Problem

Efik is an underrepresented Lower Cross tonal language spoken by millions in Nigeria that completely lacks publicly available speech datasets for supervised TTS training. Because pitch variations encode lexical and grammatical meanings, building speech synthesis systems under severe data scarcity while preserving tone is critical to preventing digital language marginalization.

## Method

The authors curated a single-speaker Efik speech corpus of 2,632 manually verified utterances totaling roughly three hours, sampled at 16kHz from audio recorded with a wireless microphone in a controlled environment. Four neural TTS models were fine-tuned: VITS (50 epochs, lr 2e-4, batch 4), MMS-TTS initialized from a Yoruba checkpoint (50 epochs, lr 2e-5, batch 16, AdamW), SpeechT5 (up to 2500 epochs, lr 1e-5, batch 4, dropout 0.1), and Orpheus-TTS (50 epochs, lr 2e-5, batch 8). Token embeddings were manually expanded to handle Efik-specific characters like o. and ñ.

## Results

Evaluated by five native speakers on a 1-5 scale, MMS-TTS outperformed all baselines, achieving a MOS of 3.80 ± 0.63, Nat-MOS of 3.60 ± 0.56, and A-MOS of 3.04 ± 0.52. Orpheus-TTS followed with a MOS of 3.08, SpeechT5 scored 2.48, and VITS performed poorly at 1.08 due to its high-data requirements. Furthermore, MMS-TTS successfully generated stable long-form speech up to 3 minutes without hallucinating, whereas other models degraded after 20 to 30 seconds.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, linguists, and cultural preservationists working on digital revitalization and accessible technologies for African and low-resource tonal languages.

## Limitations

All models struggled with correct pronunciation of rare characters like ñ, and even the top-performing models suffered from persistent tonal errors and foreign accents.

## Related

- (link related pages by id as the wiki grows)
