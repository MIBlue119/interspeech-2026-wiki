---
id: halmai26_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2143
pdf: https://www.isca-archive.org/interspeech_2026/halmai26_interspeech.pdf
---

# How Language-Independent Are Emotional Attributes? A Study on Training Data Scaling and Cross-Lingual Generalization

*Dániel Halmai, Gábor Gosztolya*

[PDF](https://www.isca-archive.org/interspeech_2026/halmai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/halmai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2143)

**TL;DR** — This paper investigates how well English Speech Emotion Recognition (SER) models transfer to low-resource Taiwanese Mandarin across emotional attributes (arousal, valence, dominance). By fine-tuning a WavLM-Large backbone, the authors show that adapter models trained on just 10-20 hours of target language data can match or exceed models trained from scratch on 100 hours.

## Key contributions

- Evaluates cross-lingual transfer and data scaling laws for dimensional SER (arousal, valence, dominance) between English (MSP-Podcast, ~104h) and Taiwanese Mandarin (BIIC-Podcast, ~102h).
- Demonstrates that cross-lingual transfer with 1-2 hours of target language data significantly outperforms training from scratch on the same small data volume.
- Establishes that 10 hours of Mandarin fine-tuning data matches or surpasses a 100-hour monolingual model for arousal, while valence requires 20 hours.
- Provides rigorous statistical validation using 5 random seeds per model configuration and Mann-Whitney U significance testing.

## Problem

State-of-the-art Speech Emotion Recognition (SER) systems require large annotated corpora, which are predominantly available only in high-resource languages like English. For low-resource languages, practitioners must choose between training from scratch, using cross-lingual zero-shot models, or domain adaptation, but the required target-data scale and cross-lingual vulnerability across different emotional dimensions remain poorly understood. Prior work often reduced dimensional attributes to binary labels, relied on pre-transformer architectures, or used tiny datasets without exploring scaling bounds.

## Method

The study uses the WavLM Large backbone (316M parameters, 24 transformer layers, pre-trained on 94k hours of speech) as the feature extractor. The network's convolutional layers are frozen, and task-specific regression heads with 3 output neurons (for arousal, valence, dominance) are trained for 20 epochs using the Adam optimizer with a learning rate of 5 × 10−5 and Mean Squared Error (MSE) loss. Model checkpoints are selected based on minimum development set MSE.

Two training paradigms are explored: 'Direct' models trained entirely from scratch on Mandarin subsets (1, 2, 5, 10, 20, and 100 hours), and 'Transfer' models where a WavLM-Large model initially trained on 104 hours of English (MSP-Podcast) is fine-tuned on the same Mandarin subsets. Each experimental condition is averaged over 5 random seeds to ensure robustness against initialization variance.

## Experimental setup

Experiments use the English MSP-Podcast corpus (v1.11, ~104 hours across ~65k chunks) for pre-training/source adaptation and the Taiwanese Mandarin BIIC-Podcast corpus (~102 hours training, ~22h dev, ~22h test) for target evaluation. Baselines include direct monolingual models trained on 100 hours of Mandarin ('Direct-100h') and zero-shot cross-lingual transfer ('Transfer-0h'). Evaluation metrics are Pearson's correlation coefficient and Concordance Correlation Coefficient (CCC) computed per emotional attribute. Implementation uses the SpeechBrain framework.

## Results

On the test set, cross-lingual transfer models trained with only 1 to 2 hours of Mandarin data achieved statistically significant improvements (p < 0.01) over direct models trained from scratch on the same data across all emotion dimensions. For arousal, a transfer model with 10 hours of Mandarin data ('Transfer-10h') yielded a Pearson correlation of 0.624 and CCC of 0.548, matching or outperforming the 100-hour monolingual baseline (0.606 / 0.554). For valence, 20 hours of adaptation data ('Transfer-20h') was required to match the 100-hour monolingual model (Pearson 0.362 vs 0.365; CCC 0.274 vs 0.271).

| Attribute | Approach | Hrs. | Pearson | CCC |
| --- | --- | --- | --- | --- |
| Arousal | Direct | 100h | 0.606 | 0.554 |
| Arousal | Transfer | 10h | 0.624 | 0.548 |
| Valence | Direct | 100h | 0.365 | 0.271 |
| Valence | Transfer | 20h | 0.362 | 0.274 |
| Dominance | Direct | 100h | 0.130 | 0.087 |
| Dominance | Transfer | 10h | 0.183 | 0.112 |

## Limitations

The study is restricted to exactly two languages (English and Taiwanese Mandarin), a single backbone architecture (WavLM Large), and continuous dimensional attributes (omitting categorical emotion classifications). Furthermore, absolute performance scores for valence and dominance remain low across all conditions, pointing to inherent annotation ambiguity or cross-cultural discrepancies in rating subjective emotional attributes.

## Why read this

Speech researchers and engineers building SER systems for low-resource languages should read this to understand data-scaling requirements when adapting large English SSL backbones. It provides concrete evidence that cross-lingual transfer drastically reduces the target data volume needed to reach parity with 100-hour monolingual baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual speech emotion recognition, computer-aided education, mental health monitoring, and empathetic spoken conversational agents.

## Related

- (link related pages by id as the wiki grows)
