---
id: wright26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3404
pdf: https://www.isca-archive.org/interspeech_2026/wright26_interspeech.pdf
---

# Not all language switching is equal: Language brokering and code-switching are associated with working memory and inhibitory control in young adults

*Sarah M. Wright, Mark Antoniou, Michael Tyler*

[PDF](https://www.isca-archive.org/interspeech_2026/wright26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wright26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3404)

**TL;DR** — This study demonstrates that overall code-switching frequency is unrelated to young adults' executive function (EF), whereas lexically motivated switching positively correlates with updating and inhibition, and frequent language brokering negatively correlates with them.

## Key contributions

- Evaluates the bilingual advantage hypothesis using a latent variable framework (three-factor CFA for shifting, updating, and response inhibition) in young adults to minimize task impurity.
- Applies an exploratory factor analysis (EFA) revealing a four-factor structure for code-switching motivations: identity, pragmatic, lexical retrieval, and enjoyment.
- Shows that everyday conversational code-switching frequency has no significant relationship with latent executive function domains (p > .30).
- Establishes a positive association between lexically motivated switching and both updating and response inhibition (p = .007), while language brokering showed negative associations.

## Problem

Empirical evidence linking bilingual code-switching frequency to executive function (EF) remains inconsistent, particularly among young adults whose EF is at its developmental peak. Prior work typically treats bilingualism as a unitary experience and collapses diverse communicative drivers (e.g., lexical need vs. identity expression) into a single metric. This lack of measurement sensitivity and failure to distinguish functional speech contexts obscures whether cognitive control engagement depends on the specific communicative demands of language use rather than sheer switching frequency.

## Method

The study analyzes a subset of undergraduate psychology students (final complete cases ranging from N = 176 to N = 375, mean age 23.0) who reported bilingual code-switching. Executive functions were measured across nine behavioural tasks mapped to three latent factors using confirmatory factor analysis (CFA) estimated via maximum likelihood in lavaan: shifting (Colour-Shape, Global-Local, Number-Letter switch costs), updating (Letter Memory, Spatial 2-back, Non-verbal Keep Track), and response inhibition (Antisaccade errors, SART inverse efficiency, Simon interference effect). Factor scores were extracted using the regression method to isolate common variance.

Language measures included single-item 7-point scales for overall code-switching frequency and language brokering frequency. Motivations for code-switching were captured via a 14-item Assessment of Code-Switching Experience Survey (ACSES) analyzed via exploratory factor analysis (EFA) using polychoric correlations, maximum likelihood extraction, and oblimin rotation, yielding a four-factor solution (identity, pragmatic, lexical, enjoyment) scored via the Ten Berge method. Control variables included age, oral proficiency (mean of speaking and comprehension across languages), directional language dominance index, and socioeconomic status (Hollingshead Four-Factor Index).

Statistical models comprised separate and comprehensive linear regressions predicting latent EF factor scores from switching frequency, EFA-derived motivation scores, and brokering frequency while controlling for covariates. These choices were designed to unpack the distinct cognitive burdens of conversational routine versus real-time lexical repair and semantic mediation under social load.

## Experimental setup

The dataset derived from an initial pool of 697 undergraduate participants, with covariate-adjusted complete cases restricted to N = 176 (79.5% female, mean age 23.0 years). Evaluated metrics include model-level F-statistics, R-squared values, p-values, RMSEA (.051 for CFA), and CFI (.91). Implementation utilized lavaan in R for maximum likelihood structural equation and confirmatory factor modeling.

## Results

Everyday code-switching frequency showed no significant association with shifting, updating, or response inhibition (all p > .30, R-squared = .030 to .037). Conversely, lexical motivation was positively associated with updating and response inhibition (both p = .007 in isolated models, p <= .004 in comprehensive models), whereas language brokering frequency showed negative associations with updating (p < .001) and response inhibition (p = .007). Shifting was not significantly predicted by any motivational factors, everyday switching, or brokering (p >= .08). In the comprehensive model, total variance explained (R-squared) ranged from .068 for shifting to .174 for updating.

| Outcome | Everyday Model R² | Motivation Model R² | Brokering Model R² | Comprehensive Model R² |
|---|---|---|---|---|
| Shifting | .037 (p=.260) | .050 (p=.360) | .049 (p=.130) | .068 (p=.289) |
| Updating | .030 (p=.390) | .084 (p=.060) | .112 (p=.001) | .174 (p<.001) |
| Resp. Inhibition | .030 (p=.390) | .083 (p=.060) | .071 (p=.027) | .127 (p=.011) |

## Limitations

The cross-sectional design prevents causal claims regarding speech practices and executive function. Code-switching and language brokering frequencies relied on single-item self-report measures rather than dense ecological logging or objective behavioral telemetry. Language dominance omitted age of acquisition and detailed developmental language history, and the sample was restricted to university psychology students, limiting broader demographic generalizability.

## Why read this

Speech researchers and cognitive scientists should read this paper to understand why frequency-based metrics of code-switching fail to predict cognitive advantages, and how functional communicative drivers (lexical need vs. brokering) provide a more accurate lens for studying bilingual cognitive control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informing the design of cognitive-linguistic evaluations, adaptive dialogue systems, and multilingual communication models that account for functional communicative context and lexical retrieval constraints.

## Related

- (link related pages by id as the wiki grows)
