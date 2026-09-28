---
id: tamiru26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2658
pdf: https://www.isca-archive.org/interspeech_2026/tamiru26_interspeech.pdf
---

# High-Quality Speech Synthesis for Under-Resourced Ethiopian Languages

*Rahel Mekonen Tamiru, Solomon Teferra Abate, Martha Yifiru Tachbelie, Abel Mulat Alemu, Samuel Rahimeto Kebede, Rosa Tsegaye Aga*

[PDF](https://www.isca-archive.org/interspeech_2026/tamiru26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tamiru26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2658)

**TL;DR** — This paper presents high-quality text-to-speech (TTS) systems for Amharic and Afan Oromo by fine-tuning SpeechT5 on a newly collected 200-hour studio-quality multi-speaker corpus, achieving human mean opinion scores (MOS) of 4.65 and 4.43, respectively.

## Key contributions

- Created a 200-hour studio-quality, multi-speaker TTS corpus (100 hours each for Amharic and Afan Oromo) covering books, news, and conversational texts.
- Constructed an additional 13-hour targeted Amharic dataset specifically addressing complex phonological phenomena like gemination and context-sensitive homographs.
- Adapted the self-supervised SpeechT5 Transformer architecture for under-resourced Ethiopian languages using 512-dimensional x-speaker embeddings.
- Demonstrated that linguistically targeted data collection directly resolves pronunciation ambiguity, raising Amharic MOS from 4.12 to 4.65.

## Problem

State-of-the-art text-to-speech systems are heavily biased toward high-resource languages, leaving languages like Amharic and Afan Oromo unserved. Traditional approaches for these languages rely on outdated concatenative or hidden Markov model (HMM) parametric systems that are brittle, lack speaker diversity, and suffer from poor prosody and small dataset sizes. Furthermore, existing modern datasets in the region were built primarily for automatic speech recognition (ASR) rather than TTS synthesis, failing to capture intricate phonetic nuances such as Amharic gemination and context-dependent homographs.

## Method

The system utilizes SpeechT5, a unified Transformer-based encoder-decoder model pre-trained on speech-text data and English LibriTTS, which is fine-tuned on the new Ethiopian corpora. Input text is tokenized (with Amharic transliterated from Ge'ez script into Latin-based representations and numbers expanded to words), passed through a text encoder pre-net, processed by the Transformer encoder-decoder, and transformed into an 80-dimensional log Mel-spectrogram via a speech decoder pre-net and post-net. A neural vocoder finally converts the spectrogram into a 16 kHz waveform.

Multi-speaker capability is achieved by extracting 512-dimensional x-vector speaker embeddings per utterance to condition the decoder, capturing unique acoustic and vocal characteristics from two speakers (one male, one female) per language. The model is optimized using the Adam optimizer with a learning rate of 1e-5, mixed-precision training, and gradient accumulation. Sequences longer than 200 tokens are filtered out during preprocessing, and the training minimizes Mean Squared Error (MSE) on spectrogram predictions.

## Experimental setup

Evaluated on a custom 113-hour Amharic corpus (including 13 hours of targeted homograph/gemination data) and a 100-hour Afaan Oromo corpus recorded at 16 kHz, 16-bit mono. Compared against historical baselines including concatenative diphone/triphone systems and HMM parametric models. Evaluation uses objective spectrogram Mean Squared Error (MSE) and subjective Mean Opinion Score (MOS) assessed by ten expert native raters over 250 utterances per language.

## Results

Expanding training data from 50 to 100 hours reduced validation loss from 0.3996 to 0.3662 for Afaan Oromo, and from 0.3915 to 0.3710 for Amharic. Incorporating the 13-hour targeted homograph/gemination dataset further lowered Amharic loss to 0.3675 and boosted its overall MOS from 4.12 to 4.65. The final systems achieve overall MOS scores of 4.65 [4.60, 4.70] for Amharic and 4.43 [4.37, 4.49] for Afaan Oromo, substantially outperforming prior literature baselines that hovered around 3.0 to 4.3 MOS. Pronunciation for Afaan Oromo scored slightly lower at 3.98 [3.84, 4.12] compared to its intelligibility of 4.72.

| Metric | Amharic | Afaan Oromo |
|---|---|---|
| Naturalness | 4.62 [4.53, 4.71] | 4.58 [4.49, 4.67] |
| Intelligibility | 4.68 [4.60, 4.76] | 4.72 [4.64, 4.80] |
| Pronunciation | 4.65 [4.56, 4.73] | 3.98 [3.84, 4.12] |
| Overall Avg. | 4.65 [4.60, 4.70] | 4.43 [4.37, 4.49] |

## Limitations

The current system relies on standardized input text and lacks a fully automated linguistic front-end for real-time homograph and context disambiguation. Speaker diversity is limited to only two speakers (one male, one female) per language. The dataset availability remains subject to institutional policy approvals, restricting immediate open-source community replication.

## Why read this

Researchers and engineers working on low-resource speech generation will learn how targeted linguistic data curation (handling gemination and homographs) combined with self-supervised models like SpeechT5 can bridge performance gaps in under-served languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Screen readers, virtual assistants, and accessibility tools for Ethiopian languages.

## Related

- (link related pages by id as the wiki grows)
