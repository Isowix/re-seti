# References and Sources

*RE-SETI proposal archive v1.3 · 24 November 2026*

Every figure quoted in this archive is taken from one of the sources below. Links were checked on 24 November 2026. Reference numbers in this list are archive-wide; individual documents number their own short lists.

## SETI@home

1. SETI@home, "SETI@home hibernation", project news, 2 March 2020 (volunteer computing to stop on 31 March 2020). https://setiathome.berkeley.edu/old_news.php
2. SETI Institute, "SETI@home Going into Hibernation", 4 March 2020 (reporting the same announcement). https://www.seti.org/news/seti-at-home-going-into-hibernation/
3. Anderson, D. P., Cobb, J., Korpela, E., Lebofsky, M., and Werthimer, D., "SETI@home: an experiment in public-resource computing", *Communications of the ACM* 45(11), 56–61 (2002). https://doi.org/10.1145/581571.581573
4. Korpela, E. J., Anderson, D. P., Cobb, J., Lebofsky, M., Liu, W., and Werthimer, D., "SETI@home: Data Acquisition and Front-End Processing", *The Astronomical Journal* 170, 112 (2025). https://doi.org/10.3847/1538-3881/ade5a7 · arXiv:2506.14718
5. Anderson, D. P., Korpela, E. J., Werthimer, D., Cobb, J., and Allen, B., "SETI@home: Data Analysis and Findings", *The Astronomical Journal* 170, 111 (2025). https://doi.org/10.3847/1538-3881/ade5ab · arXiv:2506.14737
6. Sanders, R., "For 21 years, enthusiasts used their home computers to search for ET. UC Berkeley scientists are homing in on 100 signals they found", *Berkeley News*, 12 January 2026. Source for the ~12 billion detections, ~100 re-observation targets, FAST follow-up, ~3,000 injected "birdies", and the Korpela quotations. https://news.berkeley.edu/2026/01/12/for-21-years-enthusiasts-used-their-home-computers-to-search-for-et-uc-berkeley-scientists-are-homing-in-on-100-signals-they-found/

## Breakthrough Listen

7. Breakthrough Initiatives, "Yuri Milner and Stephen Hawking Announce $100 Million Breakthrough Initiative…", 20 July 2015. Source for the 10-year, US$100 million commitment and the open-data pledge. https://breakthroughinitiatives.org/news/1
8. Lebofsky, M., et al., "The Breakthrough Listen Search for Intelligent Life: Public Data, Formats, Reduction, and Archiving", *PASP* 131, 124505 (2019). Source for Data Release 1 (~1 PB), the ~2% filterbank-to-raw size ratio, and the 11 public archive servers with 10 Gb/s links. https://doi.org/10.1088/1538-3873/ab3e82
9. Berkeley SETI Research Center, "Breakthrough Listen: Data Release 2", February 2020. https://seti.berkeley.edu/bldr2/
10. MacMahon, D. H. E., and Czech, D. J., "The First Decade of Breakthrough Listen", arXiv:2610.07482 (2026, preprint, IAC-26). Source for ~31 PB of data in use across ~42 PB of Breakthrough Listen storage as of March 2026, the Berkeley data center archive, and the 180 TB and 142 TB reduced filterbank products of two surveys. https://arxiv.org/abs/2610.07482
11. Breakthrough Listen open data search. https://breakthroughinitiatives.org/opendatasearch

## Machine learning in SETI

12. Ma, P. X., et al., "A deep-learning search for technosignatures from 820 nearby stars", *Nature Astronomy* 7, 492–502 (2023). Cadence-aware β-VAE; eight signals of interest not re-detected in GBT follow-up on 21 May 2022 and reported as not persistent; changing-drift signals were excluded. https://doi.org/10.1038/s41550-022-01872-z · arXiv:2301.12670
13. Pardo, S., et al., "Using Anomaly Detection to Search for Technosignatures in Breakthrough Listen Observations", *The Astronomical Journal* 170, 12 (2025). https://doi.org/10.3847/1538-3881/add52b · arXiv:2505.03927
14. Jacobson-Bell, B., Croft, S., Choza, C., Andersson, A., Bautista, D., Gajjar, V., Lebofsky, M., MacMahon, D. H. E., Painter, C., and Siemion, A. P. V., "Anomaly Detection and Radio-frequency Interference Classification with Unsupervised Learning in Narrowband Radio Technosignature Searches", *The Astronomical Journal* 169(4), 206 (2025). https://doi.org/10.3847/1538-3881/adb8e7 · arXiv:2411.16556. Introduces GLOBULAR (Grouping Low-frequency Observations By Unsupervised Learning After Reduction) clustering, which applies HDBSCAN to turboSETI FindDoppler hits before FindEvent. Benchmarked on the Choza et al. (2024) turboSETI search of 97 nearby galaxies at L band: 93.1% reduction in false-positive hits and 99.3% in false-positive events (288 to 2); 69 of 100 injected events recovered, against 86 for turboSETI alone.
15. Brzycki, B., et al., "Setigen: Simulating Radio Technosignatures for SETI", arXiv:2203.09668 (2022). https://arxiv.org/abs/2203.09668
16. Berkeley SETI Research Center, "Breakthrough Listen: 1327 Star Analysis and Public Data Release 1". Event tables and open-data links. https://seti.berkeley.edu/listen2019/
17. Price, D. C., et al., "The Breakthrough Listen Search for Intelligent Life: Observations of 1327 Nearby Stars Over 1.10–3.45 GHz", *The Astronomical Journal* 159, 86 (2020). States that all data products, totalling ~219 TB, are available for download as part of Data Release 1. Source for the HIP 100064 event in Fig. 7c (later rejected as interference). https://doi.org/10.3847/1538-3881/ab65f1 · arXiv:1906.07750
18. Enriquez, J. E., et al., "The Breakthrough Listen Search for Intelligent Life: 1.1–1.9 GHz Observations of 692 Nearby Stars", *The Astrophysical Journal* 849, 104 (2017). https://doi.org/10.3847/1538-4357/aa8d1b
19. Ma, P., "AI is helping us search for intelligent alien life – and we've found 8 strange new signals", *The Conversation*, 30 January 2023. Commentary by a co-author of Ma et al. (2023). https://theconversation.com/ai-is-helping-us-search-for-intelligent-alien-life-and-weve-found-8-strange-new-signals-198754
20. Benjamini, Y., and Hochberg, Y., "Controlling the False Discovery Rate: A Practical and Powerful Approach to Multiple Testing", *Journal of the Royal Statistical Society: Series B* 57(1), 289–300 (1995). https://doi.org/10.1111/j.2517-6161.1995.tb02031.x
21. Berkeley SETI Research Center, contact page (public address for scientific collaborations: bsrc@berkeley.edu). https://seti.berkeley.edu/contact.html

## Funding precedents

22. SETI Institute, "$200m Gift Propels Scientific Research in the Search for Life Beyond Earth", 8 November 2023 (Franklin Antonio bequest). https://www.seti.org/news/200m-gift-propels-scientific-research-in-the-search-for-life-beyond-earth/
23. SETI Institute, "SETI Institute Awards Its First Research and Education Innovation Grants", 8 July 2024. https://www.seti.org/news/seti-institute-awards-its-first-research-and-education-innovation-grants/

## Software

24. BOINC (Berkeley Open Infrastructure for Network Computing), "Docker apps". https://github.com/BOINC/boinc/wiki/Docker-apps
25. blimpy. https://github.com/UCBerkeleySETI/blimpy
26. turboSETI. https://github.com/UCBerkeleySETI/turbo_seti
27. HDBSCAN. https://hdbscan.readthedocs.io/
28. AirLLM. https://github.com/lyogavin/airllm
29. GLOBULAR clustering code (Jacobson-Bell). https://github.com/bjacobell/gbt-hdbscan
30. BOINC, "Job replication". https://github.com/BOINC/boinc/wiki/Job-replication
31. BOINC, "Validators". https://github.com/BOINC/boinc/wiki/Validators
32. BOINC, "Homogeneous Redundancy". https://github.com/BOINC/boinc/wiki/Homogeneous-Redundancy
33. PyTorch documentation, "Reproducibility". https://docs.pytorch.org/docs/stable/notes/randomness.html

## Data transfer costs and bandwidth

34. Amazon Web Services, EC2 On-Demand pricing, "Data Transfer": internet egress US$0.09/GB for the first 10 TB a month, US$0.085/GB next 40 TB, US$0.07/GB next 100 TB, US$0.05/GB above 150 TB; first 100 GB a month free (US and EU regions; checked November 2026). https://aws.amazon.com/ec2/pricing/on-demand/
35. Statista, "Median mobile and fixed broadband download and upload speeds worldwide as of September 2026", citing Ookla Speedtest Global Index (fixed broadband median download ~135 Mb/s). https://www.statista.com/statistics/896779/average-mobile-fixed-broadband-download-upload-speeds/
