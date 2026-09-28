---
id: rong26b_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2273
pdf: https://www.isca-archive.org/interspeech_2026/rong26b_interspeech.pdf
---

# Beyond Symmetric Interaction: Capability-Aware Asymmetric Multi-Agent Collaboration for Audio Deep Reasoning

[PDF](https://www.isca-archive.org/interspeech_2026/rong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2273)

**TL;DR** — AsymAudio is a capability-aware multi-agent framework for audio deep reasoning that achieves state-of-the-art performance by replacing symmetric voting with role-adaptive asymmetric collaboration and intra-agent consistency refinement.

## Problem

Vanilla multi-agent systems for audio deep reasoning struggle due to the underutilization of complementary large audio-language model (LALM) capabilities, capability mismatches that lead to the bucket effect and textual compensation, and inherent sampling instability. Treating all agents as equals often causes superior instruction-following models to abandon acoustic perception and blindly align with weaker peers, resulting in synergistic hallucination where the combined system underperforms its individual parts. Addressing these challenges is vital for developing reliable autonomous systems and next-generation interactive audio assistants.

## Method

The framework utilizes three heterogeneous agents: two decision agents (alpha1, alpha2) and one auxiliary evidence agent (alpha3) backed by Whisper-large and external tools. It operates in three main stages: (1) an Intra-Agent Consistency Refinement Module where each agent performs resampling to resolve internal conflicts and self-correct via an LLM-generated objective acoustic guide; (2) an Inter-Agent Collaborative Interaction Module employing a Role-Adaptive Asymmetric Strategy with customized feedback, giving the stronger decision agent implicit objective acoustic guidance while providing explicit peer context injection to auxiliary and weaker models; and (3) a Final Decision and Reasoning Collection stage that defaults to the strongest agent's output if consensus is not reached within three rounds, while aggregating valid reasoning paths.

## Results

Evaluated on the MMAR and MMAU-mini audio deep reasoning benchmarks using accuracy metrics. On the MMAR benchmark, AsymAudio achieved 71.52% on Sound, 65.05% on Music, 80.27% on Speech, and an overall multi-audio average of 74.80%, outperforming existing SOTA baselines like AudioGenie-Reasoner (58.85%) and Gemini-2.5-Flash. On the MMAU-mini benchmark, it attained an overall average accuracy of 79.10%, surpassing competing models across easy, medium, and hard splits. The paper highlights that resampling variance analysis shows substantial self-correction benefits, mitigating stochastic instability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building advanced autonomous systems, interactive virtual assistants, or expert-level audio understanding pipelines requiring robust multi-step reasoning.

## Related

- (link related pages by id as the wiki grows)
