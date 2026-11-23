# Technical Architecture Notes

*RE-SETI proposal archive v1.2 · 23 November 2026 · Prepared by Phil Rail*

> **Status.** This is a design sketch for review. None of it has been built. Component choices are candidates, not commitments.

## Overview: process in tiers, move as little data as possible

The cheap part of this project is computation. The expensive part is moving data (section 5). The architecture is therefore tiered: each tier throws away as much as it safely can before anything is moved further.

```
Tier 0  Select       metadata, existing hit lists, target priorities        (at/near the archive)
Tier 1  Reduce       cheap first-pass filtering: drop known-interference     (at/near the archive,
                     bands, cut snippets around candidate hits               or one rented machine)
Tier 2  Analyze      ML scoring of reduced snippets on GPUs                  (one GPU in the pilot;
                                                                             volunteers only if justified)
Tier 3  Validate     cross-checks, injected signals, human review            (Master Node + people)
Tier 4  Refer        requests for independent re-observation                 (telescope teams)
```

Volunteers, if they are used at all, only ever see Tier 2 work: small, reduced snippets, never raw archive files.

## 1. Data layer and Tiers 0–1 (near the archive)

- **Sources:** the public Breakthrough Listen archive (filterbank/HDF5 spectrograms, selected raw-voltage data, observation metadata) and, only with custodian agreement, the SETI@home Arecibo data.
- **Tier 0, select:** choose targets and frequency ranges from metadata, published hit lists and scientific priority, before any bulk download.
- **Tier 1, reduce:** cheap, well-understood processing filters out definite non-signals first: known interference bands are flagged, a conventional Doppler-drift search (turboSETI [3]) produces a hit list, and only small snippets around hits, plus a sample of hit-free regions for injection tests and background statistics, are kept. Breakthrough Listen's own pipeline already works this way: its filterbank products take roughly 2% of the disk space of the raw voltage data they came from [5].
- **Where Tier 1 runs:** as close to the data as the data holders allow. Options, in order of preference: on or next to the archive's own infrastructure (by arrangement), on rented machines in the same data centre or cloud region, or, as a last resort, on project machines after bulk download.
- **Provenance:** every file and snippet is checksummed and catalogued with its source, observation metadata and processing version.

## 2. Master Node (coordination layer)

A small cluster of rented cloud virtual machines, run so that the loss of any single machine does not stop the project.

- **Work scheduling:** hands out Tier 2 work units, tracks deadlines and, if volunteers are used, assigns replicas (section 6).
- **Result handling:** validated results go to a versioned database with full provenance (data source, software version, model version, worker).
- **Resilience:** at least two machines in different zones, automated off-site backups, and a written, tested recovery procedure. All configuration is kept in version control, so the system can be rebuilt from scratch.
- **Automation:** AI agents and workflow automation handle routine operations: watching system health, re-queuing failed work, preparing daily summaries, and drafting candidate dossiers for reviewers. They act within fixed permissions and cannot publish results or contact outside parties. The design does not depend on any particular AI vendor or model.

## 3. Tier 2 workers (GPU analysis)

- **Pilot:** one consumer GPU, run by the project (document 02, Phase 0).
- **Small scale:** the same container on one or a few rented GPU machines.
- **Volunteer scale, only if the pilot justifies it:** BOINC with container-based ("Docker") applications, which BOINC supports on Linux, macOS and Windows (via WSL) [1]. The container holds a pinned, signed copy of the analysis code and model weights.
- **Models:** the detection models (variational autoencoders, convolutional classifiers, density clustering) are small and fit on any consumer GPU. The volunteer client does not use AirLLM or any layer-by-layer loading, and does not run a large language model.
- **Sandboxing:** containers have no network access beyond the project server and no access to the volunteer's files.

### A note on large language models and AirLLM

The original concept mentioned AirLLM [2], an open-source library that runs very large language models on small GPUs by loading the model one layer at a time from storage. Because the whole model is read again for every generated token, it trades a great deal of speed for memory. Signal detection does not need it, since the detection models already fit on a consumer GPU.

AirLLM is at most an optional tool for occasional, low-volume language tasks on project machines, such as drafting candidate summaries for human reviewers. Smaller models, quantized models or hosted services are equally valid for that job. None of them is a dependency, and none is part of the volunteer client.

## 4. Analysis pipeline (per Tier 2 work unit)

1. **Embed:** encode the snippet with the trained representation models.
2. **Score:** reconstruction error, density-cluster isolation (HDBSCAN/DBSCAN-style [4]) and on/off-target consistency combine into one anomaly score.
3. **Return:** scores, features and summary statistics go back to the Master Node; data does not.

## 5. Data transfer budget

### 5.1 Why it dominates

Breakthrough Listen reports about 31 PB of data in use (about 42 PB of capacity) across its storage systems as of March 2026, with the main archive hosted at the Berkeley data center [6]. Not all of it is public, and its makeup (raw voltages versus reduced products) is not broken down in that source. Even so, it sets the scale.

### 5.2 Transfer time

Decimal units (1 PB = 10^15 bytes); sustained rates; no protocol overhead. These are arithmetic, not measurements.

| Volume | at 100 Mb/s | at 1 Gb/s | at 10 Gb/s | at 100 Gb/s |
|---|---|---|---|---|
| 31 PB (all BL storage in use [6]) | ~79 years | ~7.9 years | ~287 days | ~29 days |
| 1 PB (size of Data Release 1 [5]) | ~2.5 years | ~93 days | ~9 days | ~22 hours |
| 180 TB (reduced products, one BL survey [6]) | ~167 days | ~17 days | ~1.7 days | ~4 hours |
| 142 TB (reduced products, another BL survey [6]) | ~131 days | ~13 days | ~1.3 days | ~3 hours |

Two points follow:

- **The bottleneck is the source, not the volunteers.** Every byte sent to volunteers leaves through the archive's own network links. In 2019 the public archive ran on 11 servers, each with a 10 Gb/s link [5]. Adding volunteers does not raise that ceiling.
- **Redundancy multiplies transfer.** Sending each work unit to two volunteers for cross-checking (section 6) doubles the data sent. Volunteer download speeds vary widely; as context only, Ookla reported a global median fixed-broadband download speed of about 135 Mb/s in September 2026 [8]. Sustained, unattended transfer from a volunteer's home will usually be lower, and data caps apply.

### 5.3 Egress cost, if it applies

If data were served from a commercial cloud, outbound transfer would be billed. At Amazon Web Services' published internet egress rates for US and EU regions (US$0.09/GB for the first 10 TB a month, falling to US$0.05/GB above 150 TB a month; first 100 GB a month free) [7]:

| Volume sent | Approximate list-price egress |
|---|---|
| 31 PB | ~US$1.55 million (mostly at the US$0.05/GB tier); ~US$3.1 million with 2× replication |
| 1 PB | ~US$54,000 |
| 142 TB (sent once) | ~US$10,700 |
| 142 TB (sent twice, 2× replication) | ~US$18,000 |

These are illustrative. The Breakthrough Listen archive is not, as far as published sources show, hosted on AWS [6], so these fees may not apply; the cost would instead fall on the host's bandwidth, which is why the project would ask before downloading at scale. Large users can negotiate rates, and research data programs sometimes waive egress.

### 5.4 What the budget implies

- A full rerun of all 31 PB is not proposed.
- Tier 0–1 reduction should happen at or near the archive wherever the data holders allow.
- What leaves the archive should be measured in terabytes of reduced, prioritized data, not petabytes.
- The real numbers (data volume per target, reduction ratio achieved by Tier 1, throughput per GPU) come from the Phase 0 pilot. The transfer budget, and the decision on whether to use volunteers at all, are set from those measurements (document 02).

## 6. Validating results across different hardware

Different GPUs, drivers and math libraries can produce slightly different floating-point results from the same code; PyTorch, for example, does not guarantee completely reproducible results across platforms or between CPU and GPU [9]. BOINC's own documentation describes the same problem and the standard remedies [10, 11, 12]. If volunteers are used, RE-SETI would combine them:

- **Replication across different hardware:** each work unit goes to at least two hosts, deliberately chosen to differ (GPU vendor, model or driver), so a systematic error on one platform shows up as a disagreement rather than a false agreement.
- **Tolerance-based comparison, not bitwise:** the validator compares outputs within set numeric tolerances (for example, anomaly scores within a fixed margin, and the same candidate snippets flagged above threshold), a "fuzzy comparison" approach supported by BOINC's validator framework [10, 11]. BOINC's alternative, homogeneous redundancy, sends replicas only to numerically identical hosts so results can be compared bit for bit [12]; RE-SETI prefers deliberately different hardware, so that platform-specific errors are exposed rather than repeated.
- **Deterministic settings where possible:** fixed seeds, deterministic algorithm settings, pinned library versions and fixed numeric precision inside the container, to shrink the differences that tolerances must absorb.
- **Quorum:** if two results disagree, further replicas are issued until a majority agree, BOINC-style [10, 11].
- **Reference re-runs:** a random sample of work units, plus every unit that produced a high-ranking candidate, is re-run on trusted project hardware.
- **Canary signals:** some work units carry planted synthetic signals that the client cannot distinguish from real data. A client that misses canaries it should find, or reports signals that are not there, is flagged and its results are re-run. Canaries double as part of the injection-and-recovery completeness measurement.
- **Host reputation:** hosts that repeatedly fail validation or canaries are stopped from receiving work.

If no volunteers are used, the same canaries and reference re-runs still apply to project and cloud machines.

## 7. Validation layer (scientific)

- **Injected signals:** synthetic signals of known strength and drift, generated with standard tools such as setigen [13], are hidden in real data; recovery rates are published for every processed subset.
- **Cross-checks:** comparison with the conventional baseline and agreement between model families.
- **Human review queue:** top-ranked candidates, with automatically prepared dossiers, are reviewed by at least two people.
- **Referral:** surviving candidates are sent to telescope teams with a request for independent re-observation.

## 8. Open questions for technical reviewers

- Which archive subsets give the best scientific return per terabyte transferred?
- What reduction ratio can Tier 1 achieve without discarding signals that the ML stage might have caught? (Measured with injected signals in the pilot.)
- Is snippet-level analysis adequate, or do some signal types need longer contexts?
- What tolerances are tight enough to catch faulty clients but loose enough to accept honest hardware differences?
- What false-positive rate can human reviewers realistically absorb?

## References

1. BOINC, "Docker apps". https://github.com/BOINC/boinc/wiki/Docker-apps
2. AirLLM, open-source layer-wise inference library. https://github.com/lyogavin/airllm
3. turboSETI. https://github.com/UCBerkeleySETI/turbo_seti
4. HDBSCAN documentation. https://hdbscan.readthedocs.io/
5. Lebofsky, M., et al., "The Breakthrough Listen Search for Intelligent Life: Public Data, Formats, Reduction, and Archiving", *PASP* 131, 124505 (2019). Source for the ~2% filterbank-to-raw ratio, Data Release 1 (~1 PB) and the 11 public servers with 10 Gb/s links. https://doi.org/10.1088/1538-3873/ab3e82
6. MacMahon, D. H. E., and Czech, D. J., "The First Decade of Breakthrough Listen", arXiv:2610.07482 (2026, preprint). Source for ~31 PB in use / ~42 PB capacity (March 2026), the Berkeley data center archive, and the 180 TB and 142 TB reduced filterbank products of two surveys. https://arxiv.org/abs/2610.07482
7. Amazon Web Services, EC2 On-Demand pricing, "Data Transfer" (checked November 2026). https://aws.amazon.com/ec2/pricing/on-demand/
8. Statista, "Median mobile and fixed broadband download and upload speeds worldwide as of September 2026", citing Ookla Speedtest Global Index. https://www.statista.com/statistics/896779/average-mobile-fixed-broadband-download-upload-speeds/
9. PyTorch documentation, "Reproducibility". https://docs.pytorch.org/docs/stable/notes/randomness.html
10. BOINC, "Job replication". https://github.com/BOINC/boinc/wiki/Job-replication
11. BOINC, "Validators". https://github.com/BOINC/boinc/wiki/Validators
12. BOINC, "Homogeneous Redundancy". https://github.com/BOINC/boinc/wiki/Homogeneous-Redundancy
13. Brzycki, B., et al., "Setigen: Simulating Radio Technosignatures for SETI", arXiv:2203.09668 (2022). https://arxiv.org/abs/2203.09668
