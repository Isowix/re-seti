# RE-SETI: Proposal Archive v1.3

*Would today's methods find what earlier searches missed?*  
*Trust but verify.*

**RE-SETI: an AI reanalysis of the SETI@home-era radio archives. An independent proposal to reanalyze archival radio SETI data with modern machine learning, under a strict "trust but verify" protocol.**

Prepared by Phil Rail · 24 November 2026

> **Stage: proposal in review.** An early-stage, independent proposal by Phil Rail, seeking reviewers and scientific or technical collaborators. It is not a request for a business co-founder, for funding, or for incorporation.
>
> **Not affiliated.** RE-SETI is not affiliated with, endorsed by, or operated by UC Berkeley or its SETI@home project, the Berkeley SETI Research Center, Breakthrough Listen or the Breakthrough Initiatives, or the SETI Institute. The name refers to re-examining earlier SETI data; RE-SETI is not a continuation of SETI@home.

## In one paragraph

SETI@home (1999–2020) and Breakthrough Listen (2015 onward) recorded vast amounts of radio data and found no confirmed technosignature. RE-SETI proposes to revisit that data with fresh compute, modern infrastructure and machine-learning models doing the inference work: to test the null result with measured sensitivity, and to publish the labelled data and benchmarks so that future radio-telescope surveys can be analyzed better. The most likely outcome is a stronger, better-measured null result, which is still worth having.

## Where to start

- **Short on time?** Read `07_Briefing_Note_for_Reviewers.md` (also as a PDF in `pdf/`). The full zip is secondary.
- **Want the full case?** Read `01_Full_Formal_Proposal.md`.

## The first step

Before anything larger, RE-SETI would run a **single-GPU pilot** on public data: reproduce the published turboSETI event toward HIP 100064 in Price et al. (2020), then test one falsifiable claim — that an anomaly-detection stage can recover narrowband signals whose drift is not constant — with injections that run through the whole pipeline. Throughput, data volume per target and cost are measured. A volunteer computing network is used only if those numbers justify it (`02_Detailed_Phased_Implementation_Plans.md`, Phase 0).

## Contents

| File | What it is |
|---|---|
| `00_Cover_Letter_and_Foreword.md` | Cover letter and the "trust but verify" principle |
| `01_Full_Formal_Proposal.md` | Background, objectives, method, validation, risks |
| `02_Detailed_Phased_Implementation_Plans.md` | Phase 0 review and HIP 100064 / non-linear-drift pilot, with go/kill criteria, then five phases |
| `03_Statement_of_Intent.md` | The commitments the project would operate under |
| `04_Project_Concept_and_Origins.md` | Where the idea came from and the barriers it addresses |
| `05_Technical_Architecture_Notes.md` | Tiered design, end-to-end injections, transfer budget, FDR, cross-checking results |
| `06_Funding_and_Partnerships.md` | Possible funding avenues and precedents |
| `07_Briefing_Note_for_Reviewers.md` | Short plain-language summary for reviewers |
| `08_Invitation_to_Review.md` | Letter inviting reviewers |
| `09_References.md` | All sources cited in the archive |
| `10_About_the_Author.md` | Short biographical note |
| `pdf/` | PDF versions of the documents above |

## Links

- Project page: https://isowix.github.io/re-seti/
- Briefing note (PDF): https://github.com/Isowix/re-seti/releases/download/v1.3/07_Briefing_Note_for_Reviewers.pdf
- Full proposal archive (zip): https://github.com/Isowix/re-seti/releases/download/v1.3/RE-SETI_Proposal_Archive_v1.3.zip
- Repository: https://github.com/Isowix/re-seti
- Release: https://github.com/Isowix/re-seti/releases/tag/v1.3
- Feedback: https://github.com/Isowix/re-seti/issues (GitHub issues are public). Enabling GitHub Discussions is proposed, not yet done.
- Email: hello@axiom-mmf.ca
