# Phased Implementation Plan

*RE-SETI proposal archive v1.2 · 23 November 2026 · Prepared by Phil Rail*

> **Status.** Early-stage, independent proposal. Nothing in this plan has started. Phase 0 comes first; the month numbers for later phases are counted from the end of Phase 0.

This plan turns the proposal (document 01) into a pilot phase and five further phases. The month numbers are estimates, to be revised once reviewers and collaborators have weighed in. Each phase ends with a go/no-go check; the project does not move on until that check is met.

## Phase 0: Review and single-GPU pilot (before month 1)

**Purpose:** decide whether the idea deserves real effort, and get real numbers cheaply before designing anything larger. Phase 0 has two tracks that run in parallel.

### Track A: review

- Circulate the briefing note (document 07) to at least four independent reviewers with relevant expertise.
- Recruit at least one more committed collaborator, ideally someone with radio-astronomy or SETI data experience.
- Revise the proposal in response to review and publish the changes.

### Track B: single-GPU pilot

Run the whole chain on one consumer GPU against a small public Breakthrough Listen subset. This needs no organization, no servers and no volunteers.

1. **Sanity check:** reproduce turboSETI's own worked example on the public Voyager 1 Green Bank Telescope file [1].
2. **Reproduce a published result:** download the public data for a small set of targets from the Breakthrough Listen 1,327-star search [2] and reproduce its published turboSETI results for those targets, documenting any differences.
3. **Add the new layers:** run Tier 1 reduction and the ML scoring stage (document 05) on the same data, with injected signals [3], and compare against the baseline.
4. **Measure and publish:**
   - throughput per GPU: gigabytes processed per hour, and hours per target;
   - data volume per target: as downloaded, and after Tier 1 reduction (the reduction ratio);
   - injected-signal recovery for the baseline and for the ML stage;
   - cost: download volume and time, electricity, and any rented compute;
   - wall-clock time end to end, including download.

### Exit check for Phase 0

- Reviewers do not identify a fatal flaw in the premise; at least one more committed person has joined.
- The pilot reproduces the published result, or the differences are understood and documented.

### Go / kill criteria for a volunteer network

The volunteer network is not assumed. It goes ahead only if **all** of the following hold, using the pilot's measured numbers. The thresholds in brackets are proposals for reviewers to challenge, not commitments.

1. **It works:** the single-GPU pipeline reproduces the published result and recovers injected signals at least as well as the turboSETI baseline.
2. **It is needed:** at the measured throughput, the prioritized dataset could not be processed on a few rented GPUs within a reasonable time and budget [for example, more than three months on four GPUs]. If a handful of GPUs can do the job, the project uses them and skips volunteers.
3. **The data can be delivered:** after Tier 1 reduction, the download time for a work unit on a typical home connection is a small fraction of its compute time [for example, under 25%], and the total transfer, including replication, fits a budget the data host agrees to (document 05, section 5).
4. **The data host agrees** to the volume of transfer involved.

If any criterion fails, the volunteer network is dropped or postponed, and the reanalysis continues at whatever scale the measured numbers support. If the pilot cannot reproduce the published result at all, the project stops until it can.

## Phase 1: Foundation (months 1–3)

**Purpose:** confirm data access and build the smallest system that can run beyond one workstation.

- Survey the public Breakthrough Listen archive: what is downloadable, in what formats, under what terms, and at what transfer cost, using the pilot's per-target volumes.
- Contact data custodians (Breakthrough Listen; UC Berkeley for the SETI@home data) with the reviewed plan and pilot results, to ask about access, about running Tier 1 reduction near the data, and about the best way to work alongside their teams.
- Stand up a minimal coordination service (the "Master Node") on rented cloud machines, with automated backups and a documented recovery procedure.
- Set up contribution guidelines for the public repository and issue tracker.

**Exit check:** data access terms for the first full dataset are confirmed in writing, including where Tier 1 processing will run and the agreed transfer budget.

## Phase 2: Analysis pipeline (months 3–6)

**Purpose:** build and test the full machine-learning pipeline.

- Train representation models (variational autoencoders and at least one alternative model family) on reduced snippets.
- Implement HDBSCAN/DBSCAN-style density clustering and the combined anomaly score (document 01, section 4.3).
- Build the full injected-signal suite: synthetic signals across a range of strengths, drift rates and frequencies, inserted blind into real data, including canary signals for result validation (document 05, section 6).
- Measure recovery rates and false-positive rates against the conventional baseline, including how much the Tier 1 reduction loses.
- Re-examine the eight Ma et al. (2023) signals of interest with the new pipeline [4].
- Write up the pipeline and its measured performance for external review.

**Exit check:** the pipeline recovers injected signals at least as well as the conventional baseline at comparable false-positive rates, or the shortfall is understood and documented.

## Phase 3: Scale-out pilot (months 6–9)

**Purpose:** prove the chosen scale-out route works.

- **If the Phase 0 criteria chose volunteers:** package the analysis as a BOINC container application, test it on Linux, macOS and Windows machines with different GPUs, and run a closed beta with a small group of volunteers, using replication, tolerance-based comparison and canaries (document 05, section 6).
- **If not:** run the same workload on rented GPUs.
- Either way, process a defined subset through the scaled-out system and compare against the single-machine reference run.
- Hold a first human review session on the top-ranked candidates, following the written review protocol.
- Publish a pilot report, including the null result if that is what it is, and the measured transfer and compute costs.

**Exit check:** scaled-out results match the reference run within the agreed tolerances; the review protocol has been exercised; the report is public.

## Phase 4: Full-scale reanalysis (months 9–18)

**Purpose:** process the prioritized archive.

- Process the agreed data in priority order, within the transfer budget, publishing results per data subset as each is finished.
- Keep injected-signal testing running throughout, so sensitivity is measured on every subset, not just the pilot.
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
- **Transfer budget first:** no bulk download beyond what the data host has agreed to.
- **Security:** volunteer software, if used, runs in containers with no access beyond its own work unit; signed releases only.

## References

1. turboSETI, README worked example (Voyager 1, Green Bank Telescope). https://github.com/UCBerkeleySETI/turbo_seti
2. Berkeley SETI Research Center, "Breakthrough Listen: 1327 Star Analysis and Public Data Release 1". https://seti.berkeley.edu/listen2019/
3. Brzycki, B., et al., "Setigen: Simulating Radio Technosignatures for SETI", arXiv:2203.09668 (2022). https://arxiv.org/abs/2203.09668
4. Ma, P. X., et al., "A deep-learning search for technosignatures from 820 nearby stars", *Nature Astronomy* 7, 492–502 (2023). https://doi.org/10.1038/s41550-022-01872-z
