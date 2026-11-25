# Phased Implementation Plan

*RE-SETI proposal archive v1.3 · 24 November 2026 · Prepared by Phil Rail*

> **Stage: proposal in review.** Nothing in this plan has started except the writing of the proposal. Phase 0 comes first; the month numbers for later phases are counted from the end of Phase 0 and are estimates. Each phase ends with a go/no-go check.

This plan turns the proposal (document 01) into a pilot phase and five further phases.

## Phase 0: Review and single-GPU pilot (before month 1)

**Purpose:** decide whether the idea deserves real effort, and get a measured answer on one falsifiable claim, cheaply, before designing anything larger. Phase 0 has two tracks that run in parallel.

### Track A: review

- Circulate the briefing note (document 07) to at least four independent reviewers with relevant expertise.
- Invite scientific or technical collaborators. This is not a search for a business co-founder.
- Revise the proposal in response to review and publish the changes.

### Track B: single-GPU pilot

Run the whole chain on one consumer GPU against a small public Breakthrough Listen subset. This needs no organization, no servers and no volunteers.

**Reproduction target.** After a short sanity check on turboSETI's public Voyager 1 Green Bank example [1], the published result to reproduce is the turboSETI event toward **HIP 100064** shown in Fig. 7c of Price et al. (2020) [2]. Price et al. reported an event visible only in the ON pointings, then rejected it as interference after finding similar signal pairs toward other stars. Reproducing that *detection* (and the same rejection, if the other cadences are also in the public set) is the software test: the event is not treated as an open candidate. The paper states that the data products of that search, totalling about 219 TB, are available for download as part of Breakthrough Listen Data Release 1 [2]. Event tables are also posted as CSV files with the paper [3]. If the HIP 100064 cadence cannot be retrieved, substitute another Price et al. (2020) GBT L-band cadence that appears in those tables, and say so in the pilot report.

This target is preferred to re-running the Ma et al. (2023) pipeline because turboSETI, the Price event list, and DR1 are public and documented; Ma et al.'s trained weights are not assumed to be available, and their eight signals are not treated as open candidates (document 01, section 2.3).

**The falsifiable claim.** That an anomaly-detection stage can recover narrowband signals whose drift rate is not constant — a class turboSETI's constant-drift-rate search is not designed to catch, and that Ma et al. (2023) explicitly excluded [4] — at a pre-registered false-discovery rate. Published injection tests have mostly used linear drift; the evidence for this claim is thin, which is why it is a pilot test and not a premise.

Steps:

1. **Sanity check:** reproduce turboSETI's worked example on the public Voyager 1 file [1].
2. **Reproduce the published result:** download the public DR1 cadence for HIP 100064 (or the documented substitute), run turboSETI, and compare with Fig. 7c and the published event table [2, 3].
3. **End-to-end injections:** plant a pre-registered set of constant-drift and non-linear-drift narrowband signals, plus empty and shuffled-cadence controls, into the data *before* RFI flagging, detection and ranking (document 01, section 4.2). Run turboSETI, a cadence-aware β-VAE, and GLOBULAR clustering on the same inputs.
4. **Measure and publish:**
   - recovery of each injection class, by stage and for the whole pipeline;
   - false-positive rate on the controls, and a trial of the Benjamini–Hochberg (or equivalent) rule [5];
   - throughput per GPU: gigabytes processed per hour, and hours per target;
   - data volume per target: as downloaded, and after Tier 1 reduction;
   - cost: download volume and time, electricity, and any rented compute;
   - wall-clock time end to end, including download.

### Exit check for Phase 0

- Reviewers do not identify a fatal flaw in the premise; at least one more committed collaborator has joined, or the public-data pilot report is complete enough to stand on its own.
- The HIP 100064 (or substitute) reproduction matches the published event, or the differences are understood and documented.

### Go / kill criteria

These thresholds are proposals for reviewers to challenge, not commitments. They would be registered in the repository before the injection set is scored.

**On the non-linear-drift claim (the scientific go/kill):**

1. **Go:** at the pre-registered false-discovery rate, the ML stage recovers a pre-registered fraction of the non-linear-drift injections that turboSETI misses, and does not lose a pre-registered fraction of the constant-drift injections that turboSETI finds.
2. **Kill or narrow:** if the ML stage does not outperform turboSETI on this class at the agreed FDR, the claim is dropped or revised *before* any larger run. A negative methods result is still worth publishing.

**On a volunteer network (the operational go/kill):** the volunteer network is not assumed. It goes ahead only if **all** of the following hold, using the pilot's measured numbers:

1. **It works:** the single-GPU pipeline reproduces the published result and the end-to-end injection test is complete, whatever its scientific outcome.
2. **It is needed:** at the measured throughput, the prioritized dataset could not be processed on a few rented GPUs within a reasonable time and budget [for example, more than three months on four GPUs]. If a handful of GPUs can do the job, the project uses them and skips volunteers.
3. **The data can be delivered:** after Tier 1 reduction, the download time for a work unit on a typical home connection is a small fraction of its compute time [for example, under 25%], and the total transfer, including replication, fits a budget the data host agrees to (document 05, section 5).
4. **The data host agrees** to the volume of transfer involved.

If any operational criterion fails, the volunteer network is dropped or postponed, and the reanalysis continues at whatever scale the measured numbers support. If the pilot cannot reproduce the published HIP 100064 (or substitute) event at all, the project stops until it can.

## Phase 1: Foundation (months 1–3)

**Purpose:** confirm data access and, if Phase 0 supported the claim or a revised one, prepare to run beyond one workstation.

- Survey the public Breakthrough Listen archive: what is downloadable, in what formats, under what terms, and at what transfer cost, using the pilot's per-target volumes.
- Contact data custodians (Breakthrough Listen / Berkeley SETI Research Center; UC Berkeley for the SETI@home data) with the reviewed plan and pilot results, to ask about access, about running Tier 1 reduction near the data, and about transfer etiquette.
- Stand up a minimal coordination service (the "Master Node") on rented cloud machines, with automated backups and a documented recovery procedure, only if the work is going beyond one GPU.
- Register the FDR procedure and injection grid for any later run (document 01, section 4.5).
- Set up contribution guidelines for the public repository and issue tracker.

**Exit check:** data access terms for the first full dataset are confirmed in writing, including where Tier 1 processing will run and the agreed transfer budget; the registered analysis plan is public.

## Phase 2: Analysis pipeline (months 3–6)

**Purpose:** build and test the full machine-learning pipeline, still on a modest public set.

- Train cadence-aware representation models (variational autoencoders and at least one alternative model family) with the RFI-handling rules in document 01, section 4.4.
- Implement GLOBULAR clustering (HDBSCAN on turboSETI hits, Jacobson-Bell et al. 2025 [6]) as the clustering method in the comparison, test density clustering on the learned representations, and build the combined anomaly score.
- Expand the injected-signal suite, always inserted before flagging and detection, including canary signals for result validation (document 05, section 6).
- Measure recovery rates and false-positive rates against the conventional baseline, including how much the Tier 1 reduction loses.
- Optionally re-reduce a public Ma et al. (2023) cadence as a software test, without treating the eight signals as open candidates [4].
- Write up the pipeline and its measured performance for external review.

**Exit check:** the registered FDR procedure holds on the expanded injection set, or the shortfall is understood and the plan is revised; the non-linear-drift claim has been confirmed, dropped, or narrowed in public.

## Phase 3: Scale-out pilot (months 6–9)

**Purpose:** prove the chosen scale-out route works.

- **If the Phase 0 criteria chose volunteers:** package the analysis as a BOINC container application, test it on Linux, macOS and Windows machines with different GPUs, and run a closed beta with a small group of volunteers, using replication, tolerance-based comparison and canaries (document 05, section 6).
- **If not:** run the same workload on rented GPUs.
- Either way, process a defined subset through the scaled-out system and compare against the single-machine reference run.
- Hold a first human review session on the top-ranked candidates, following the written review protocol, and attempt archival cross-matches (document 01, section 4.6). New telescope observations are not in this phase.
- Publish a pilot report, including the null result if that is what it is, and the measured transfer and compute costs.

**Exit check:** scaled-out results match the reference run within the agreed tolerances; the review protocol has been exercised; the report is public.

## Phase 4: Full-scale reanalysis (months 9–18)

**Purpose:** process the prioritized archive, only under the registered plan.

- Process the agreed data in priority order, within the transfer budget, publishing results per data subset as each is finished.
- Keep end-to-end injected-signal testing running throughout, so sensitivity is measured on every subset.
- Maintain the public candidate database, with full provenance and archival cross-match status for every entry.
- Release labelled interference catalogues, injected-signal datasets and trained models as benchmarks for future surveys.

**Exit check:** each processed subset has a published sensitivity measurement, FDR accounting, and candidate list.

## Phase 5: Follow-up and stewardship (ongoing)

**Purpose:** close the loop on candidates and keep the outputs useful.

- Continue archival cross-matches as new public data appear.
- If, and only if, an observatory partner exists, pass reviewed candidates as requests for re-observation. These are requests; the project does not operate telescopes, and new observations are out of scope until that partner exists.
- Publish all outcomes, including candidates that were ruled out and why.
- Maintain the benchmark datasets and models.
- Prepare peer-reviewed papers with collaborating scientists.

## Cross-cutting rules (all phases)

- **No discovery claims** without independent confirmation by another instrument or team.
- **Everything versioned:** data, code, models and results carry version numbers and checksums.
- **Human sign-off** on anything published, and on every candidate escalated beyond the archive.
- **Transfer budget first:** no bulk download beyond what the data host has agreed to.
- **Registered analysis:** large-run thresholds and the FDR rule are fixed before the search, not after.
- **Security:** volunteer software, if used, runs in containers with no access beyond its own work unit; signed releases only.

## References

1. turboSETI, README worked example (Voyager 1, Green Bank Telescope). https://github.com/UCBerkeleySETI/turbo_seti
2. Price, D. C., et al., "The Breakthrough Listen Search for Intelligent Life: Observations of 1327 Nearby Stars Over 1.10–3.45 GHz", *AJ* 159, 86 (2020). https://doi.org/10.3847/1538-3881/ab65f1
3. Berkeley SETI Research Center, "Breakthrough Listen: 1327 Star Analysis and Public Data Release 1", event tables and open-data links. https://seti.berkeley.edu/listen2019/
4. Ma, P. X., et al., "A deep-learning search for technosignatures from 820 nearby stars", *Nature Astronomy* 7, 492–502 (2023). https://doi.org/10.1038/s41550-022-01872-z
5. Benjamini, Y., and Hochberg, Y., "Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing", *JRSS-B* 57(1), 289–300 (1995). https://doi.org/10.1111/j.2517-6161.1995.tb02031.x
6. Jacobson-Bell, B., et al., "Anomaly Detection and Radio-frequency Interference Classification with Unsupervised Learning in Narrowband Radio Technosignature Searches", *The Astronomical Journal* 169(4), 206 (2025). https://doi.org/10.3847/1538-3881/adb8e7
