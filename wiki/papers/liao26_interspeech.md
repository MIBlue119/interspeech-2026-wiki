---
id: liao26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-155
---

# Role-Aware Semi-Supervised Domain Adaptation for Teacher-Student Speaker Diarization

**TL;DR** — A semi-supervised Mean-Teacher framework adapts speaker diarization to classroom audio, separating speakers by role (teacher vs. student) rather than by identity.

## Problem

Standard speaker diarization identifies anonymous speakers by identity, but educational settings need role-based segregation (teacher vs. student), and generic models struggle here due to data scarcity and domain shift into classroom acoustics.

## Method

The authors propose a Mean Teacher-based Role-Aware Semi-Supervised Domain Adaptation framework using a new semi-supervised dataset (TSSD), reformulating diarization from identity distinction to role detection via a Role-Aware Union Loss for fine-grained separation with only coarse (role-level) supervision, plus a PIT-MSE consistency loss enforcing speaker-order-invariant teacher-student alignment.

## Results

The method successfully disentangles complex classroom acoustic scenes into distinct role-based (teacher/student) speech streams, offering a scalable approach to this "many-to-one" mapping problem in conversational analysis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Classroom audio analytics and educational technology needing to separate teacher and student speech without full speaker-identity labeling.

## Related

- (link related pages by id as the wiki grows)
