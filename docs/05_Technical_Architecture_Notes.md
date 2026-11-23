# Technical Architecture Notes

*RE-SETI proposal archive v1.1 · 23 November 2026 · Prepared by Phil Rail*

> **Status.** This is a design sketch for review. None of it has been built. Component choices are candidates, not commitments.

## Overview

```
Public data archives ──► Ingest & preprocessing ──► Master Node (coordination)
                                                     │        ▲
                                         work units  ▼        │  results
                                              Volunteer & cloud GPU workers
                                                     │
                       Result database ◄─────────────┘
                              │
                     Ranking ──► Human review queue ──► Referral for re-observation
```

## 1. Data layer

- **Sources:** the public Breakthrough Listen archive (filterbank/HDF5 spectrograms, selected raw-voltage data, observation metadata) and, only with custodian agreement, the SETI@home Arecibo data.
- **Staging:** data is downloaded in prioritized batches, checksummed and catalogued before processing. Where possible, preprocessing runs close to where the data is stored to limit transfer costs.
- **Work units:** spectrograms are cut into fixed-size snippets with their on/off-target cadence attached, so each unit can be analyzed independently.

## 2. Master Node (coordination layer)

A small cluster of rented cloud virtual machines, run so that the loss of any single machine does not stop the project.

- **Work scheduling:** a BOINC server hands out work units, tracks deadlines and sends each unit to more than one computer to check results agree.
- **Result handling:** validated results go to a versioned database with full provenance (data source, software version, model version, worker).
- **Resilience:** at least two machines in different zones, automated off-site backups, and a written, tested recovery procedure. All configuration is kept in version control, so the system can be rebuilt from scratch.
- **Automation:** AI agents and workflow automation handle routine operations: watching system health, re-queuing failed work, preparing daily summaries, and drafting candidate dossiers for reviewers. They act within fixed permissions and cannot publish results or contact outside parties. The design does not depend on any particular AI vendor or model.

## 3. Worker clients

- **Platform:** BOINC with container-based ("Docker") applications, which BOINC supports on Linux, macOS and Windows (via WSL) [1]. The container holds a pinned, signed copy of the analysis code and model weights, so every worker runs identical software.
- **Hardware target:** a typical consumer GPU. The detection models (variational autoencoders, convolutional classifiers) are small enough to run comfortably on such hardware. CPU-only fallback is possible at lower throughput.
- **Cloud workers:** the same container runs on rented GPU machines, so the project can run at small scale without volunteers, and can absorb bursts of work.
- **Sandboxing:** containers have no network access beyond the BOINC server and no access to the volunteer's files.

### A note on large language models and AirLLM

The original concept mentioned AirLLM [2], an open-source library that runs very large language models on small GPUs by loading the model one layer at a time from disk. It is a real and useful tool, but it trades speed for memory: because the whole model is read from storage for every generated token, output is very slow compared with a model that fits in GPU memory [2]. That makes it unsuitable for high-volume signal analysis. Signal detection in this project relies on compact, purpose-built models instead.

Large language models may still help with low-volume tasks such as summarizing candidates for human reviewers or helping volunteers with support questions. For those tasks, AirLLM is one candidate option alongside smaller models, quantized models or hosted services. None is a dependency.

## 4. Analysis pipeline (per work unit)

1. **Preprocess:** flag known interference bands, normalize the spectrum.
2. **Baseline:** conventional Doppler-drift search (e.g. turboSETI [3]) for comparison.
3. **Embed:** encode the snippet with the trained representation models.
4. **Score:** reconstruction error, density-cluster isolation (HDBSCAN/DBSCAN-style [4]) and on/off-target consistency combine into one anomaly score.
5. **Return:** scores, features and summary statistics go back to the Master Node; raw data does not.

## 5. Validation layer

- **Injected signals:** a share of work units contain synthetic signals whose presence is hidden from workers and reviewers. Recovery rates are published.
- **Cross-checks:** redundant computation on volunteer machines; comparison with the conventional baseline; agreement between model families.
- **Human review queue:** top-ranked candidates, with automatically prepared dossiers, are reviewed by at least two people.
- **Referral:** surviving candidates are sent to telescope teams with a request for independent re-observation.

## 6. Open questions for technical reviewers

- Which archive subsets give the best scientific return per terabyte transferred?
- Is snippet-level analysis adequate, or do some signal types need longer contexts?
- What injected-signal parameter ranges are most informative?
- What false-positive rate can human reviewers realistically absorb?

## References

1. BOINC, "Docker apps". https://github.com/BOINC/boinc/wiki/Docker-apps
2. AirLLM, open-source layer-wise inference library. https://github.com/lyogavin/airllm
3. turboSETI. https://github.com/UCBerkeleySETI/turbo_seti
4. HDBSCAN documentation. https://hdbscan.readthedocs.io/
