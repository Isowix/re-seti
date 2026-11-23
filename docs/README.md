# RE-SETI: Proposal Archive v1.2.1

**RE-SETI: an AI reanalysis of the SETI@home-era radio archives. An independent proposal to reanalyze archival radio SETI data with modern machine learning, under a strict "trust but verify" protocol.**

Prepared by Phil Rail · 23 November 2026

> **Status.** Early-stage proposal, circulated for review. No organization has been formed, no funding has been raised, and no infrastructure has been built. Reviewers and collaborators are welcome.
>
> **Not affiliated.** RE-SETI is not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute. The name refers to re-examining earlier SETI data; RE-SETI is not a continuation of SETI@home.

## In one paragraph

SETI@home (1999–2020) and Breakthrough Listen (2015 onward) recorded vast amounts of radio data and found no confirmed technosignature. RE-SETI proposes to revisit that data with fresh compute, modern infrastructure and machine-learning models doing the inference work: to test the null result with measured sensitivity, and to publish the labelled data and benchmarks so that future radio-telescope surveys can be analyzed better. The most likely outcome is a stronger, better-measured null result, which is still worth having.

## Where to start

- **Short on time?** Read `07_Briefing_Note_for_Reviewers.md` (about 2 pages).
- **Want the full case?** Read `01_Full_Formal_Proposal.md`.

## The first step

Before anything larger, RE-SETI would run a **single-GPU pilot**: reproduce a published Breakthrough Listen result on a small public data subset, and measure throughput, data volume per target and cost. Moving data, not computing, is expected to be the main cost, so a volunteer computing network is used only if the pilot's numbers show it is needed and the data can be delivered affordably (`02_Detailed_Phased_Implementation_Plans.md`, Phase 0).

## Contents

| File | What it is |
|---|---|
| `00_Cover_Letter_and_Foreword.md` | Cover letter and the "trust but verify" principle |
| `01_Full_Formal_Proposal.md` | Background, objectives, method, validation, risks |
| `02_Detailed_Phased_Implementation_Plans.md` | Phase 0 review and single-GPU pilot (with go/kill criteria for volunteers), then five phases with exit checks |
| `03_Statement_of_Intent.md` | The commitments the project would operate under |
| `04_Project_Concept_and_Origins.md` | Where the idea came from and the barriers it addresses |
| `05_Technical_Architecture_Notes.md` | Tiered design, data transfer budget, cross-checking results across hardware, validation |
| `06_Funding_and_Partnerships.md` | Possible funding avenues and precedents |
| `07_Briefing_Note_for_Reviewers.md` | Short plain-language summary for reviewers |
| `08_Invitation_to_Review.md` | Letter inviting reviewers |
| `09_References.md` | All sources cited in the archive |
| `pdf/` | PDF versions of the documents above |

## Links

- Project page: https://isowix.github.io/re-seti/
- Repository: https://github.com/Isowix/re-seti
- Feedback: https://github.com/Isowix/re-seti/issues (GitHub issues are public)
