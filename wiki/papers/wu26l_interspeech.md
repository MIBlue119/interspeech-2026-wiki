---
id: wu26l_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2150
pdf: https://www.isca-archive.org/interspeech_2026/wu26l_interspeech.pdf
---

# One-to-Many Electrolaryngeal Voice Conversion with Synthetic Data

[PDF](https://www.isca-archive.org/interspeech_2026/wu26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2150)

**TL;DR** — The paper proposes a data-driven framework using synthetic EL speech generated via fine-tuned QuickVC models to train a one-to-many electrolaryngeal voice conversion system, outperforming baseline models in intonation naturalness and intelligibility.

## Problem

Laryngectomees often rely on electrolarynx (EL) devices that produce monotonous, mechanical speech, but converting EL speech to natural (NL) speech is hindered by extreme temporal constraints and data scarcity. Previous data augmentation methods flatten F0 but fail to match spectral features, while collection of parallel EL/NL data is non-scalable. This work addresses the lack of time-aligned, one-to-many voice conversion models that can map EL speech to multiple target natural voices.

## Method

The method builds on the QuickVC (QVC) any-to-many voice conversion architecture, which uses a Whisper encoder for content, a speaker encoder for voice identity, a VAE posterior encoder, a flow module, and a CNN discriminator. First, the authors collected a small EL speech corpus of 13 minutes (100 utterances from a single male EL user) to finetune a pretrained Japanese QVC model for unsupervised NL-to-EL conversion. Second, this model converted a large-scale multi-speaker dataset (JVS corpus, 12,998 samples) into synthetic EL speech to form paired NL/EL data. Finally, the pretrained QVC was supervisedly finetuned for EL-to-NL conversion by feeding synthetic EL speech to the Whisper encoder and corresponding NL speech to the speaker encoder, while freezing the speaker encoder and updating only the content encoder and flow module. Training was performed using a single NVIDIA RTX 3090.

## Results

Evaluated on a Japanese dataset converting EL speech to 5 target voices (3 male, 2 female), the proposed 'ours-10k' model achieved an MCD of 6.607, log F0 RMSE of 0.309, F0 correlation of 0.585, CER of 0.366, and voice similarity of 0.923. In comparison, the flat-F0 baseline yielded an MCD of 6.885, F0 RMSE of 0.337, F0 correlation of 0.548, CER of 0.381, and voice similarity of 0.916. Subjective CMOS evaluations showed that participants significantly preferred the proposed model over QVC and flat-F0 baselines in both intonation naturalness and intelligibility (p < 0.005). Ablations demonstrated that scaling synthetic training data from 100 samples to 10,000 samples steadily improves objective metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Laryngectomees and speech-impaired individuals seeking to convert mechanical electrolarynx speech into natural, intelligible speech across multiple target speaker identities.

## Limitations

The model struggles with unpronounceable or degraded sounds frequently present in EL speech (such as the phoneme /h/) and currently produces only neutral intonation without reflecting the speaker's internal emotional states.

## Related

- (link related pages by id as the wiki grows)
