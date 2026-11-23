# Phased Implementation Plan

*RE-SETI proposal archive v1.1 · 23 November 2026 · Prepared by Phil Rail*

> **Status.** Early-stage, independent proposal. Nothing in this plan has started. The timeline below begins only after the review gate in Phase 0 is passed.

This plan turns the proposal (document 01) into five phases. The month numbers are counted from the end of Phase 0 and are estimates, to be revised once reviewers and collaborators have weighed in. Each phase ends with a go/no-go check; the project does not move on until that check is met.

## Phase 0: Review gate (before month 1)

**Purpose:** decide whether the idea deserves real effort.

- Circulate the briefing note (document 07) to at least four independent reviewers with relevant expertise.
- Recruit at least one more committed collaborator, ideally someone with radio-astronomy or SETI data experience.
- Revise the proposal in response to review and publish the changes.

**Exit check:** reviewers do not identify a fatal flaw in the premise; at least one more committed person has joined.

## Phase 1: Foundation (months 1–3)

**Purpose:** confirm the data and build the smallest system that can process it.

- Survey the public Breakthrough Listen archive: what is downloadable, in what formats, under what terms, and at what transfer cost.
- Contact data custodians (Breakthrough Listen; UC Berkeley for the SETI@home data) with the reviewed plan, to ask about access and about the best way to work alongside their teams.
- Choose and document a first pilot dataset small enough to process on a single workstation.
- Stand up a minimal coordination service (the "Master Node") on rented cloud machines, with automated backups and a documented recovery procedure.
- Reproduce one published conventional Doppler-drift result with existing open tools, to prove the data handling is correct.
- Set up the public repository, issue tracker and contribution guidelines.

**Exit check:** a published result has been reproduced end to end; data access terms for the pilot dataset are confirmed in writing.

## Phase 2: Analysis pipeline (months 3–6)

**Purpose:** build and test the machine-learning pipeline on the pilot dataset.

- Train representation models (variational autoencoders and at least one alternative model family) on spectrogram snippets.
- Implement HDBSCAN/DBSCAN-style density clustering and the combined anomaly score (document 01, section 4.3).
- Build the injected-signal suite: synthetic signals across a range of strengths, drift rates and frequencies, inserted blind into real data.
- Measure recovery rates and false-positive rates against the conventional baseline.
- Write up the pipeline and its measured performance for external review.

**Exit check:** the pipeline recovers injected signals at least as well as the conventional baseline at comparable false-positive rates, or the shortfall is understood and documented.

## Phase 3: Pilot deployment (months 6–9)

**Purpose:** prove the distributed system works with real volunteers.

- Package the analysis as a BOINC container application and test it on Linux, macOS and Windows machines.
- Run a closed beta with a small group of volunteers, using redundant computation to check that results agree across machines.
- Process the pilot dataset in full through the distributed system and compare against the single-workstation run.
- Hold a first human review session on the top-ranked candidates, following the written review protocol.
- Publish a pilot report, including the null result if that is what it is.

**Exit check:** distributed results match the reference run; the review protocol has been exercised; the pilot report is public.

## Phase 4: Full-scale reanalysis (months 9–18)

**Purpose:** process the prioritized archive.

- Open volunteer participation more widely, scaling cloud capacity to match.
- Process the archive in priority order, publishing results per data subset as each is finished.
- Keep the injected-signal testing running throughout, so sensitivity is measured on every subset, not just the pilot.
- Maintain the public candidate database, with full provenance for every entry.
- Release labelled interference catalogues, injected-signal datasets and trained models as benchmarks for future surveys.

**Exit check:** each processed subset has a published sensitivity measurement and candidate list.

## Phase 5: Follow-up and stewardship (ongoing)

**Purpose:** close the loop on candidates and keep the outputs useful.

- Pass reviewed candidates to telescope teams (for example those operating FAST, the Green Bank Telescope, MeerKAT or the Allen Telescope Array) as requests for re-observation. These are requests; the project does not operate telescopes.
- Publish all outcomes, including candidates that were ruled out and why.
- Maintain the benchmark datasets and models, and apply the pipeline to new public data as it is released.
- Prepare peer-reviewed papers with collaborating scientists.

## Cross-cutting rules (all phases)

- **No discovery claims** without independent confirmation by another instrument or team.
- **Everything versioned:** data, code, models and results carry version numbers and checksums.
- **Human sign-off** on anything published, and on every candidate escalated to a telescope team.
- **Security:** volunteer software runs in containers with no access beyond its own work unit; signed releases only.
