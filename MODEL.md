# Model rules and credits

This is an independent implementation inspired by SimBio Darwinian Snails and Abraham et al. (2009). It does not use anyone else's software code or claim identical numerical behaviour.

## Exercises 1–5

- Each trial starts with 50 snails. The seven thickness classes 1–7 have counts 1, 4, 10, 20, 10, 4 and 1. No-variation populations all have thickness 4.
- The mutation exercise starts with the same distribution truncated at thickness 4: all starting values above 4 become 4. These are model units, not millimetres and not the integers in the Prelude's real dataset.
- Thickness is fixed during an individual's life. Colour is a visual key, not a real pigmentation mechanism.
- Manual claw feeding costs one point per click and awards ten points per eaten snail. An integer thickness of `t` requires `t` clicks. Students can deliberately select any snail; selection is not forced when playing manually.
- An automatic predation event samples one living snail with a relative weight of `exp(-0.5 × (thickness - 1))`. Thus thinner individuals are more likely to be eaten, but every individual has a nonzero chance. This is a stipulated classroom rule, not a fitted crab feeding rate. More crabs increase event frequency, not the rule's strength.
- With selective survival off, each living snail has the same chance of being removed. The random-removal button samples without replacement. Automatic crabs also use random removal when that setting is off.
- Feeding pauses at 25 survivors. The manual and random-removal controls also stop at 25. This is a teaching guard, not a biological carrying capacity.
- Every survivor produces exactly two offspring and dies. At 25 survivors this restores 50 offspring. With inheritance on, offspring copy the parent's thickness. With inheritance off, offspring thickness is sampled independently of the parent from the initial variable distribution.
- With mutation on, each offspring independently has a 20% probability of a mutation attempt. Attempts are equally likely to add or subtract 1. Thickness is bounded below by 1, so downward attempts at 1 cause no actual change. There is no upper thickness limit. The deliberately high rate makes classroom observation practical; it is not an estimate of a real mutation rate.
- Mutation rules do not depend on crab presence, predation, survival or an animal's needs. Equal probabilities do not guarantee equal counts in small samples. Near the lower bound, actual changes are asymmetric even though attempted changes are symmetric; the event CSV records both.
- The histogram shows the living population at the moment of viewing. The trend shows mean thickness of each newly born generation, before its predation. CSV history separately records survivors before reproduction. A within-generation change in the mean is selective mortality, not an individual acquiring a new inherited trait.
- The parent–offspring table shows every birth in the latest generation, even if some offspring have since died. All mutation attempts are retained for the current trial. Biological randomness uses a seeded pseudorandom generator; Reset increments the seed. Cosmetic movement uses separate randomness.
- Reset preserves settings and creates a new trial. Changing starting variation takes effect only after Reset. Other settings affect subsequent relevant events. Switching to the mutation exercise, leaving it, or selecting Exercises 1 or 2 starts a new population. Save evidence first.
- For browser performance, reproduction is refused above 200 parents rather than silently deleting offspring.

## Exercise 6: research model

This is a separate developmental model, intentionally distinct from the fixed-thickness individuals in Exercises 1–5. Both inherited differences and environmental plasticity are possible.

- West and East are fixed source samples, each containing 60 snails: 30 juveniles aged 0 and 30 adults aged 3. West inherited baseline thicknesses are uniform from 1.5 to 4.5; East from 3.5 to 6.5. Time advances in tanks, not source samples.
- Each individual has an inherited baseline `g`. Its visible thickness is `g` plus any juvenile environmental addition. Source individuals initially have no environmental addition.
- During each daily step, a juvenile exposed to an active or banded crab adds 0.5 thickness units, then ages. At age 3 it matures, so a newborn exposed throughout development can add 1.5. Existing additions remain after transfer. Adults do not add further cue-dependent thickness.
- A banded crab supplies a cue but cannot feed. An active crab supplies the same cue and removes one snail per day using thickness-dependent weights `exp(-0.5 × thickness)`. A tank without a crab has neither cue nor predation.
- Snails die at age 15. Recorded causes of death distinguish predation from age.
- Every third day, surviving adults are randomly paired within each tank. Each pair produces two offspring. Baseline thickness is the parental mean of `g`, plus a small random segregation term uniformly between -0.4 and +0.4. A 10% mutation chance adds or subtracts 0.5 with equal probability; baseline is bounded below by 1. This is a simple quantitative inheritance model, not a detailed genetic or sex model. Two adults suffice; no sexes or mating behaviour are modelled.
- Offspring do not inherit the parent's environmentally acquired addition. They start at age 0 and receive their own environmental exposure on subsequent days. Parent IDs and individual IDs can be exported.
- Event order within a day: juvenile exposure and ageing, predation, old-age deaths, then reproduction if it is a mating day. Capacity is 100 per tank; transfers stop at 100 and pairing stops before producing more than 100. Use small comparable starting groups to avoid this artificial cap.
- Tank records capture changes and daily summaries. The individual export captures currently living individuals plus death records; it is not a complete automatic longitudinal archive. Save at each observation time.

## Sources and acknowledgement

- SimBio Virtual Labs / EvoBeaker, *Darwinian Snails* workbook, © 2012 SimBiotic Software for Teaching and Research, Inc. No endorsement or broader redistribution licence is implied.
- Abraham, J. K., Meir, E., Perry, J., Herron, J. C., Maruca, S., & Stal, D. (2009). Addressing Undergraduate Student Misconceptions about Natural Selection with an Interactive Simulated Laboratory. *Evolution: Education and Outreach, 2*, 393–404. https://doi.org/10.1007/s12052-009-0142-3
- Seeley, R. H. (1986). Intense natural selection caused a rapid morphological transition in a living marine snail. *PNAS, 83*, 6897–6901.
- Trussell, G. C. (1996). Phenotypic plasticity in an intertidal snail: The role of a common crab predator. *Evolution, 50*, 448–454.
- Snail sprite: generated for this project. It is stylized snail artwork, not an anatomically accurate photograph of a flat periwinkle. Crab icons are native emoji. No externally hosted Google images, fonts or scripts are used.