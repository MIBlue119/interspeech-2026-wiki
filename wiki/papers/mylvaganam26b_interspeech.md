---
id: mylvaganam26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1837
pdf: https://www.isca-archive.org/interspeech_2026/mylvaganam26b_interspeech.pdf
---

# Which Languages Transfer Best to Warlpiri? A Similarity-Based Study for Low-Resource ASR

[PDF](https://www.isca-archive.org/interspeech_2026/mylvaganam26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mylvaganam26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1837)

**TL;DR** — This paper evaluates multi-level acoustic and linguistic similarity metrics to select high-resource source languages for cross-lingual transfer learning in extremely low-resource ASR, achieving substantial error rate reductions on Warlpiri.

## Problem

Endangered and low-resource languages like the Australian Aboriginal language Warlpiri suffer from severe data scarcity, making robust ASR development challenging. While cross-lingual transfer learning helps mitigate this, source languages are typically selected via heuristic, geographic, or genealogical baselines that ignore true acoustic or linguistic proximity. Systematic analysis is required to determine which high-resource languages actually transfer best and why.

## Method

The authors propose a multi-level similarity framework combining embedding-based acoustic proximity from pre-trained models (ECAPA-TDNN, wav2vec 2.0, and XLSR-53 across transformer layers) with linguistic feature distances (syntactic, phoneme inventory, grammatical, and overall typology from WALS, PHOIBLE, and Grambank). Eleven high-resource candidate languages are evaluated and ranked, pre-selected via an LID approach on VoxLingua107. The Whisper small model (244M parameters, 12-layer encoder/decoder) is first fine-tuned on individual high-resource source languages for 10 epochs, then fine-tuned fully on 1 hour of Warlpiri speech data from the DoReCo dataset.

## Results

Evaluating on a 15-minute held-out Warlpiri test set, fine-tuning on acoustically and typologically similar source languages significantly outperforms monolingual (86.9% WER, 41.0% CER) and standard multilingual baselines (72.7% WER, 41.3% CER). Assamese and Hindi source-adaptation achieve the lowest error rates, yielding 32.6% WER / 12.3% CER and 37.6% WER / 14.3% CER respectively, whereas dissimilar languages like Japanese perform poorly (49.7% WER). Correlation analysis shows acoustic similarity best predicts fine-tuning performance, while phoneme inventory and typology better explain zero-shot transfer.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and linguists building speech recognition technologies for endangered, indigenous, and extremely low-resource languages with minimal transcribed data.

## Limitations

Linguistic feature data was missing for certain candidate languages such as Assamese and Japanese, restricting their analysis to specific dimensions.

## Related

- (link related pages by id as the wiki grows)
