/*
 * SAT Reading & Writing Practice Questions
 * A standalone bank of 55 high-quality Digital SAT R&W questions.
 *
 * Each question:
 *   { stem, choices, correct (0-based index), explanation, domain, topic }
 *
 * Sections:
 *   - Grammar & Conventions        (15 questions)
 *   - Expression of Ideas           (15 questions)
 *   - Reading Comprehension          (25 questions)
 */

export const SAT_RW_PRACTICE_QUESTIONS = [

  // ═══════════════════════════════════════════════════════
  //  GRAMMAR & CONVENTIONS  (15 questions)
  // ═══════════════════════════════════════════════════════

  // ── Subject-Verb Agreement with Complex Subjects ──

  {
    stem: 'The committee of senior researchers ___ that the experimental protocol requires revision before the next round of clinical trials can begin.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) agree',
      'B) agrees',
      'C) are agreeing',
      'D) have agreed'
    ],
    correct: 1,
    explanation: 'The subject is "committee," a singular collective noun. The prepositional phrase "of senior researchers" does not change the number of the subject. A singular subject requires a singular verb: "agrees."',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'Neither the lead architect nor the structural engineers ___ comfortable approving the revised blueprints without additional soil testing.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) is',
      'B) was',
      'C) are',
      'D) has been'
    ],
    correct: 2,
    explanation: 'With "neither...nor," the verb agrees with the nearer subject. "Engineers" is plural, so the verb must be plural: "are."',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'Each of the photographs displayed in the gallery ___ taken during the first three months of the documentary project.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) were',
      'B) was',
      'C) have been',
      'D) are being'
    ],
    correct: 1,
    explanation: '"Each" is the subject, and it is always singular regardless of what follows in the prepositional phrase. The singular past-tense verb "was" is correct.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },

  // ── Pronoun-Antecedent Agreement ──

  {
    stem: 'When a student submits an essay after the deadline, ___ should include a brief note explaining the reason for the late submission.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) they',
      'B) you',
      'C) he or she',
      'D) it'
    ],
    correct: 2,
    explanation: 'The antecedent is "a student" (singular). In formal Standard English on the SAT, the pronoun must agree in number with its antecedent. "He or she" is singular and matches "a student." While "they" is increasingly accepted in everyday use, the SAT tests formal agreement, and "he or she" is the conventionally correct formal option here.',
    domain: 'Reading & Writing',
    topic: 'Pronoun-Antecedent Agreement'
  },
  {
    stem: 'The board of directors announced that ___ would hold an emergency meeting to address the recent cybersecurity breach.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) they',
      'B) it',
      'C) he',
      'D) those'
    ],
    correct: 1,
    explanation: '"Board of directors" is a singular collective noun acting as a unit. The singular pronoun "it" correctly refers to the board as a single entity.',
    domain: 'Reading & Writing',
    topic: 'Pronoun-Antecedent Agreement'
  },

  // ── Comma Splices and Run-On Sentences ──

  {
    stem: 'The glacier has been retreating at an accelerating rate since the 1990s ___ scientists warn that nearby communities face increased flooding risks.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) 1990s, scientists',
      'B) 1990s scientists',
      'C) 1990s, and scientists',
      'D) 1990s, scientists, they'
    ],
    correct: 2,
    explanation: 'Two independent clauses cannot be joined by a comma alone (that is a comma splice). Adding the coordinating conjunction "and" after the comma creates a grammatically correct compound sentence.',
    domain: 'Reading & Writing',
    topic: 'Comma Splices and Run-On Sentences'
  },
  {
    stem: 'Miriam Makeba used her platform as a world-renowned singer to advocate against apartheid ___ performances and speeches drew international attention to the injustices in South Africa.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) apartheid her',
      'B) apartheid, her',
      'C) apartheid; her',
      'D) apartheid and, her'
    ],
    correct: 2,
    explanation: 'The text contains two independent clauses. A semicolon correctly joins two independent clauses without a coordinating conjunction. A comma alone (option B) would create a comma splice, and no punctuation (option A) would create a run-on.',
    domain: 'Reading & Writing',
    topic: 'Comma Splices and Run-On Sentences'
  },

  // ── Semicolon and Colon Usage ──

  {
    stem: 'The research team identified three critical factors ___ adequate funding, access to patient populations, and collaboration with local health authorities.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) factors,',
      'B) factors:',
      'C) factors;',
      'D) factors'
    ],
    correct: 1,
    explanation: 'A colon is used after an independent clause to introduce a list. "The research team identified three critical factors" is a complete sentence, and the list that follows explains what those factors are.',
    domain: 'Reading & Writing',
    topic: 'Semicolon and Colon Usage'
  },
  {
    stem: 'The novelist drew heavily from her childhood in rural Appalachia ___ the landscapes, dialects, and traditions of the region appear throughout her work.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) Appalachia,',
      'B) Appalachia:',
      'C) Appalachia; and',
      'D) Appalachia'
    ],
    correct: 1,
    explanation: 'A colon can join two independent clauses when the second clause explains or elaborates on the first. Here, the second clause provides specific examples of how the novelist drew from her childhood.',
    domain: 'Reading & Writing',
    topic: 'Semicolon and Colon Usage'
  },

  // ── Apostrophes and Possessives ──

  {
    stem: 'The two ___ combined efforts resulted in a groundbreaking vaccine that was distributed across 40 countries within a single year.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      "A) laboratories'",
      "B) laboratory's",
      "C) laboratories's",
      "D) laboratorys'"
    ],
    correct: 0,
    explanation: 'The sentence describes the combined efforts of two laboratories (plural). The possessive of a plural noun ending in "s" is formed by adding only an apostrophe: "laboratories\' combined efforts."',
    domain: 'Reading & Writing',
    topic: 'Apostrophes and Possessives'
  },
  {
    stem: 'Although the manuscript had been in the ___ collection for decades, no one had thought to examine the marginal annotations until recently.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      "A) library's",
      "B) libraries",
      "C) libraries'",
      "D) librarys'"
    ],
    correct: 0,
    explanation: 'The sentence refers to the collection belonging to one library (singular possessive). The possessive of a singular noun is formed by adding an apostrophe and "s": "library\'s."',
    domain: 'Reading & Writing',
    topic: 'Apostrophes and Possessives'
  },

  // ── Verb Tense Consistency ──

  {
    stem: 'By the time the rescue team arrived at the remote village, the floodwaters ___ most of the lower buildings and displaced hundreds of residents.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) destroy',
      'B) destroyed',
      'C) had destroyed',
      'D) will have destroyed'
    ],
    correct: 2,
    explanation: 'The phrase "by the time the rescue team arrived" signals that the flooding happened before another past event. The past perfect tense ("had destroyed") correctly indicates an action completed before another past action.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense Consistency'
  },
  {
    stem: 'The choreographer explained that she ___ modern dance with traditional West African movement vocabularies for over fifteen years before her work gained mainstream recognition.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) blends',
      'B) blended',
      'C) had been blending',
      'D) will blend'
    ],
    correct: 2,
    explanation: 'The sentence describes an ongoing action ("for over fifteen years") that took place before another past event ("gained mainstream recognition"). The past perfect progressive ("had been blending") correctly conveys duration before a past moment.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense Consistency'
  },
  {
    stem: 'The historian notes that the Roman Republic ___ a system of checks and balances that, in many respects, anticipated the structures of modern democratic governments.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) develops',
      'B) developed',
      'C) has developed',
      'D) is developing'
    ],
    correct: 1,
    explanation: 'The Roman Republic is a completed historical entity. The simple past tense "developed" is appropriate for describing an action that took place and was completed in the past. The present tense "notes" in the framing clause is fine because the historian is making the observation now, but the Republic\'s action happened in the past.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense Consistency'
  },
  {
    stem: 'Marine biologists have observed that coral bleaching events, which ___ relatively rare before 1980, now occur with alarming frequency across tropical oceans.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) are',
      'B) were',
      'C) have been',
      'D) will be'
    ],
    correct: 1,
    explanation: 'The clause "before 1980" anchors the action in a specific past time. The simple past "were" correctly describes the state of coral bleaching events during that earlier period, contrasting with "now occur" in the present.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense Consistency'
  },

  // ═══════════════════════════════════════════════════════
  //  EXPRESSION OF IDEAS  (15 questions)
  // ═══════════════════════════════════════════════════════

  // ── Transitions Between Sentences ──

  {
    stem: 'Recent studies suggest that urban green spaces can significantly reduce residents\' stress levels. ___, cities with extensive park systems tend to report lower rates of anxiety and depression among their populations.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) Nevertheless,',
      'B) In other words,',
      'C) Accordingly,',
      'D) On the other hand,'
    ],
    correct: 2,
    explanation: 'The second sentence presents a result that follows logically from the first sentence\'s claim. "Accordingly" signals a cause-and-effect relationship: because green spaces reduce stress, cities with more parks see lower anxiety rates.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'The novelist James Baldwin spent much of his adult life in Paris. ___, his fiction remained deeply rooted in the African American experience, drawing on his childhood in Harlem for its most powerful material.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) Similarly,',
      'B) Therefore,',
      'C) Nevertheless,',
      'D) For instance,'
    ],
    correct: 2,
    explanation: 'There is a contrast between living abroad and writing about American experiences. "Nevertheless" signals that the second idea is surprising or contrary to what the first might suggest.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'The solar panel industry has experienced rapid growth over the past decade. ___, the cost of photovoltaic cells has dropped by more than 80 percent since 2010, making solar energy accessible to a much broader market.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) Regardless,',
      'B) Specifically,',
      'C) However,',
      'D) Alternatively,'
    ],
    correct: 1,
    explanation: 'The second sentence provides a specific detail that illustrates the broader claim of "rapid growth." "Specifically" introduces a concrete example or statistic supporting the general statement.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'Monarch butterflies depend on milkweed as the sole host plant for their larvae. ___, the widespread use of herbicides in agricultural regions has dramatically reduced milkweed populations across the butterflies\' migratory corridors.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) Furthermore,',
      'B) However,',
      'C) For this reason,',
      'D) In contrast,'
    ],
    correct: 1,
    explanation: 'The first sentence describes the butterflies\' dependence on milkweed, and the second introduces a threat to that dependence. "However" marks this shift from a biological fact to a complicating problem.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'Archaeologists initially believed that the settlement had been abandoned due to warfare. ___, more recent analysis of skeletal remains and soil samples suggests that a prolonged drought was the more likely cause.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) Moreover,',
      'B) In addition,',
      'C) Subsequently,',
      'D) However,'
    ],
    correct: 3,
    explanation: 'The passage presents a shift from an older explanation (warfare) to a newer, contrasting one (drought). "However" correctly signals this contrast between the initial belief and the revised understanding.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },

  // ── Conciseness and Redundancy ──

  {
    stem: 'The CEO announced that the company would be reducing and cutting down the size of its workforce by approximately 15 percent.\n\nWhich choice most effectively eliminates the redundancy in the underlined portion?',
    choices: [
      'A) reducing and cutting down the size of',
      'B) reducing the size of and cutting down',
      'C) reducing',
      'D) cutting down on the size and reducing'
    ],
    correct: 2,
    explanation: '"Reducing" and "cutting down the size of" mean the same thing. Using just "reducing" eliminates the redundancy while preserving the meaning. Concise writing avoids saying the same thing twice.',
    domain: 'Reading & Writing',
    topic: 'Conciseness and Redundancy'
  },
  {
    stem: 'The autobiography tells the story of the author\'s own personal journey from poverty to literary fame.\n\nWhich choice most effectively eliminates the redundancy?',
    choices: [
      'A) the story of the author\'s own personal journey',
      'B) the story of the author\'s personal and individual journey',
      'C) the story of the author\'s journey',
      'D) the personal story of the author\'s own journey'
    ],
    correct: 2,
    explanation: 'An autobiography is by definition about the author\'s own personal life. "Own" and "personal" are redundant with "autobiography." Simply "the author\'s journey" is sufficient.',
    domain: 'Reading & Writing',
    topic: 'Conciseness and Redundancy'
  },
  {
    stem: 'The museum\'s new exhibit, which is interactive and allows visitors to participate and engage, has drawn record crowds since its opening.\n\nWhich choice is the most concise revision of the underlined portion without changing the meaning?',
    choices: [
      'A) which is interactive and allows visitors to participate and engage,',
      'B) which is interactive,',
      'C) which is interactive, participatory, and engaging to visitors,',
      'D) which allows visitor interaction and participation and engagement,'
    ],
    correct: 1,
    explanation: '"Interactive" already conveys the idea that visitors can participate and engage. The additional phrases are redundant. "Which is interactive" conveys the full meaning concisely.',
    domain: 'Reading & Writing',
    topic: 'Conciseness and Redundancy'
  },

  // ── Combining Sentences Effectively ──

  {
    stem: 'The playwright Lorraine Hansberry wrote "A Raisin in the Sun." The play debuted on Broadway in 1959. It was the first play by a Black woman to be produced on Broadway.\n\nWhich choice most effectively combines the sentences?',
    choices: [
      'A) The playwright Lorraine Hansberry wrote "A Raisin in the Sun," and the play debuted on Broadway in 1959, and it was the first play by a Black woman to be produced on Broadway.',
      'B) Lorraine Hansberry\'s "A Raisin in the Sun," which debuted on Broadway in 1959, was the first play by a Black woman to be produced on Broadway.',
      'C) When Lorraine Hansberry wrote "A Raisin in the Sun," it debuted on Broadway in 1959, being the first play by a Black woman to be produced on Broadway.',
      'D) "A Raisin in the Sun" was written by Lorraine Hansberry; it debuted in 1959 on Broadway and was the first play by a Black woman produced there on Broadway.'
    ],
    correct: 1,
    explanation: 'Option B uses a relative clause ("which debuted on Broadway in 1959") to integrate the date smoothly and keeps the most important information -- that it was the first play by a Black woman on Broadway -- as the main clause. This is more fluid and concise than the other options.',
    domain: 'Reading & Writing',
    topic: 'Combining Sentences'
  },
  {
    stem: 'The Amazon River carries more water than any other river on Earth. Its basin spans nine countries. It supports an estimated 10 percent of all species on the planet.\n\nWhich choice most effectively combines the sentences?',
    choices: [
      'A) The Amazon River carries more water than any other river on Earth, and its basin spans nine countries, and it supports an estimated 10 percent of all species on the planet.',
      'B) Spanning nine countries, the Amazon River, which carries more water than any other river on Earth, supports an estimated 10 percent of all species on the planet.',
      'C) The Amazon River carries more water than any other river on Earth; its basin spans nine countries; it supports an estimated 10 percent of all species on the planet.',
      'D) The Amazon River, carrying more water and spanning nine countries, supports about 10 percent of all species on the planet on Earth.'
    ],
    correct: 1,
    explanation: 'Option B integrates all three facts smoothly: the participial phrase ("Spanning nine countries") and relative clause ("which carries more water...") modify the subject, while the main clause delivers the most striking fact about biodiversity.',
    domain: 'Reading & Writing',
    topic: 'Combining Sentences'
  },

  // ── Logical Sequence of Ideas ──

  {
    stem: 'A researcher is writing a report and wants to emphasize the practical significance of her findings. Which version most effectively achieves this goal?\n\n[1] The study examined antibiotic resistance patterns in hospital settings.\n[2] The findings suggest that rotating antibiotic regimens could reduce resistance rates by up to 40 percent.\n[3] Hospital-acquired infections cost the U.S. healthcare system over $28 billion annually.\n[4] Implementing such rotations would require coordination among departments but could yield substantial cost savings.',
    choices: [
      'A) 1, 2, 3, 4',
      'B) 3, 1, 2, 4',
      'C) 1, 3, 2, 4',
      'D) 2, 1, 4, 3'
    ],
    correct: 1,
    explanation: 'Starting with the cost statistic (sentence 3) immediately establishes practical stakes. Then the study (1) and its findings (2) address the problem, and the implementation note (4) closes with real-world application. This order builds from problem to solution to action.',
    domain: 'Reading & Writing',
    topic: 'Logical Sequence'
  },
  {
    stem: 'While revising an essay about the history of jazz, a student wants to place the following sentence logically:\n\n"These early improvisational techniques laid the groundwork for the complex harmonic explorations of bebop in the 1940s."\n\nWhere should this sentence be placed?\n\n[1] Jazz emerged in the early 20th century in New Orleans, blending African rhythmic traditions with European harmonic structures. [2] Musicians in the city\'s vibrant club scene developed a spontaneous style of performance, responding to one another in real time. [3] ___. [4] Bebop artists such as Charlie Parker and Dizzy Gillespie pushed these boundaries even further, creating music that demanded both technical virtuosity and deep theoretical knowledge.',
    choices: [
      'A) Before sentence 1',
      'B) After sentence 1 (position of sentence 2)',
      'C) After sentence 2 (position marked ___)',
      'D) After sentence 4'
    ],
    correct: 2,
    explanation: 'The sentence bridges the discussion of early improvisational techniques (sentence 2) and bebop (sentence 4). Placing it at position 3 creates a smooth chronological and logical transition from early jazz improvisation to bebop\'s harmonic explorations.',
    domain: 'Reading & Writing',
    topic: 'Logical Sequence'
  },
  {
    stem: 'A student is writing an essay about renewable energy adoption. Which choice most logically completes the paragraph?\n\nDenmark now generates over 50 percent of its electricity from wind power, a milestone that seemed improbable just two decades ago. The nation\'s success did not happen overnight; it resulted from decades of sustained government investment, public support, and technological innovation. ___',
    choices: [
      'A) Wind turbines were first invented in the late 19th century.',
      'B) Other countries seeking to replicate Denmark\'s achievement must recognize that such a transition requires long-term commitment rather than short-term fixes.',
      'C) However, coal remains the most widely used energy source worldwide.',
      'D) Denmark is a small country in northern Europe with a population of approximately 5.8 million.'
    ],
    correct: 1,
    explanation: 'The paragraph builds from Denmark\'s success to explaining the sustained effort behind it. The most logical concluding sentence extends this lesson to other countries, reinforcing the theme that long-term commitment is essential.',
    domain: 'Reading & Writing',
    topic: 'Logical Sequence'
  },
  {
    stem: 'A writer wants to add a supporting example to the following paragraph:\n\n"Indigenous land management practices, long dismissed by Western scientists, are now being recognized for their ecological sophistication. Fire-stick farming, practiced by Aboriginal Australians for tens of thousands of years, ___"\n\nWhich choice most effectively completes the paragraph with relevant supporting detail?',
    choices: [
      'A) is a topic that has generated much debate among historians and anthropologists.',
      'B) involves controlled, low-intensity burns that reduce fuel loads, promote new growth, and increase biodiversity -- outcomes that modern fire management agencies are now striving to replicate.',
      'C) was first documented by European settlers who arrived in Australia in 1788.',
      'D) is just one of many agricultural techniques used around the world.'
    ],
    correct: 1,
    explanation: 'The paragraph claims that indigenous practices demonstrate "ecological sophistication." Option B provides specific, concrete evidence of this sophistication by explaining what fire-stick farming actually does and noting that modern agencies seek to replicate it.',
    domain: 'Reading & Writing',
    topic: 'Logical Sequence'
  },
  {
    stem: 'A student wants to strengthen the argument in the following paragraph by adding a counterpoint. Which choice best accomplishes this goal?\n\n"Proponents of year-round schooling argue that it eliminates the \'summer slide,\' the well-documented loss of academic skills that occurs during long breaks. ___"\n\nWhich choice most effectively adds a counterpoint?',
    choices: [
      'A) Studies have shown that students lose an average of one to two months of math skills over summer vacation.',
      'B) Year-round schooling has been adopted by some districts in California and other states.',
      'C) Critics counter, however, that year-round schedules can disrupt family routines, limit opportunities for enrichment programs, and cause burnout among both students and teachers.',
      'D) The traditional school calendar was originally designed around agricultural cycles.'
    ],
    correct: 2,
    explanation: 'A counterpoint presents the opposing side of the argument. Option C directly addresses the proponents\' claim with specific criticisms of year-round schooling, creating a balanced paragraph.',
    domain: 'Reading & Writing',
    topic: 'Logical Sequence'
  },

  // ═══════════════════════════════════════════════════════
  //  READING COMPREHENSION  (25 questions)
  // ═══════════════════════════════════════════════════════

  // ── Central Idea and Purpose ──

  {
    stem: 'The following is from a recent article about urban ecology:\n\n"Cities, long regarded as ecological dead zones, are increasingly revealing themselves to be surprisingly complex habitats. Peregrine falcons nest on skyscrapers, coyotes navigate highway underpasses, and novel plant communities colonize abandoned lots. Rather than existing in opposition to nature, cities are generating new ecological dynamics that challenge our traditional understanding of wilderness."\n\nWhich choice best states the central idea of the passage?',
    choices: [
      'A) Cities have more wildlife than rural areas.',
      'B) Urban environments are ecologically richer and more complex than previously assumed.',
      'C) Peregrine falcons have adapted perfectly to city life.',
      'D) Conservation efforts should focus exclusively on urban areas.'
    ],
    correct: 1,
    explanation: 'The passage moves from the old view of cities as "ecological dead zones" to the new recognition that they are "surprisingly complex habitats" with "new ecological dynamics." This central contrast supports option B. The passage does not claim cities have more wildlife than rural areas (A), nor does it focus on one species (C) or advocate exclusive urban focus (D).',
    domain: 'Reading & Writing',
    topic: 'Central Idea and Purpose'
  },
  {
    stem: 'The following is from a speech by a public health official:\n\n"We have spent decades treating diseases after they appear. We mobilize enormous resources to manage epidemics, develop medications, and build treatment facilities. But for every dollar we spend on treatment, we could prevent far more suffering by investing in clean water infrastructure, nutritional programs, and preventive care. The question is not whether we can afford prevention -- it is whether we can afford to keep relying on reaction."\n\nThe primary purpose of the passage is to:',
    choices: [
      'A) criticize governments for failing to respond to epidemics.',
      'B) argue that preventive health measures are more cost-effective and should be prioritized over reactive treatment.',
      'C) describe the specific diseases that could be prevented with better infrastructure.',
      'D) explain how treatment facilities are constructed.'
    ],
    correct: 1,
    explanation: 'The speaker contrasts reactive treatment with preventive investment and argues that the latter is more effective. The rhetorical question at the end reinforces the call to shift from reaction to prevention.',
    domain: 'Reading & Writing',
    topic: 'Central Idea and Purpose'
  },
  {
    stem: 'The following is from a literary analysis:\n\n"Toni Morrison\'s use of fragmented chronology in \'Beloved\' is not merely a stylistic choice. By refusing to present events in a linear sequence, Morrison mirrors the way traumatic memories resurface -- unbidden, nonlinear, and resistant to orderly narration. The novel\'s structure thus becomes an embodiment of its central theme: the impossibility of fully containing the trauma of slavery within conventional narrative forms."\n\nThe author of this analysis primarily argues that:',
    choices: [
      'A) Morrison\'s writing style is unnecessarily confusing.',
      'B) the structure of "Beloved" is purposefully designed to reflect the nature of traumatic memory.',
      'C) all novels about slavery should use fragmented chronology.',
      'D) linear narration is always superior to fragmented chronology.'
    ],
    correct: 1,
    explanation: 'The analysis explicitly states that Morrison\'s fragmented structure "mirrors the way traumatic memories resurface" and "becomes an embodiment of its central theme." The author sees the form as inseparable from the content.',
    domain: 'Reading & Writing',
    topic: 'Central Idea and Purpose'
  },

  // ── Evidence-Based Reasoning ──

  {
    stem: 'A sociologist claims that increased screen time among adolescents correlates with higher rates of reported loneliness. Which finding, if true, would most directly support this claim?',
    choices: [
      'A) Adolescents who use social media report feeling more connected to distant relatives.',
      'B) A longitudinal study of 10,000 teens found that those who spent more than four hours daily on screens reported significantly higher loneliness scores than those who spent fewer than two hours.',
      'C) Screen time among adults has also increased over the past decade.',
      'D) Some adolescents prefer texting to face-to-face conversation.'
    ],
    correct: 1,
    explanation: 'The claim is specifically about a correlation between screen time and loneliness among adolescents. Option B provides direct, quantitative evidence of this correlation from a large study with a comparison group.',
    domain: 'Reading & Writing',
    topic: 'Evidence-Based Reasoning'
  },
  {
    stem: 'A historian argues that the construction of transcontinental railroads in the 19th century was the single most important factor in the economic unification of the United States. Which piece of evidence would most effectively challenge this argument?',
    choices: [
      'A) Railroad construction employed hundreds of thousands of workers.',
      'B) The telegraph network, which preceded the railroad, had already linked Eastern and Western markets and enabled real-time coordination of commerce across the continent.',
      'C) Some railroad companies received large land grants from the federal government.',
      'D) Railroads transported both passengers and freight.'
    ],
    correct: 1,
    explanation: 'The historian claims the railroad was the "single most important factor." Evidence that the telegraph had already created economic links before the railroad would challenge the claim that the railroad was uniquely responsible. Options A, C, and D actually support or are neutral to the railroad\'s importance.',
    domain: 'Reading & Writing',
    topic: 'Evidence-Based Reasoning'
  },
  {
    stem: 'An ecologist hypothesizes that the reintroduction of wolves to Yellowstone National Park in 1995 triggered a trophic cascade that improved the health of riparian vegetation along riverbanks. Which finding would most directly support this hypothesis?',
    choices: [
      'A) Wolf populations in Yellowstone have grown steadily since 1995.',
      'B) Elk, the wolves\' primary prey, shifted their grazing patterns after the reintroduction, and previously overgrazed riverbank areas showed significant regrowth of willows and aspens within a decade.',
      'C) Visitors to Yellowstone expressed enthusiasm about seeing wolves in the wild.',
      'D) Wolves are apex predators in many ecosystems around the world.'
    ],
    correct: 1,
    explanation: 'A trophic cascade involves changes flowing down the food chain. Option B traces the specific chain: wolves changed elk behavior, which allowed riverbank vegetation to recover. This directly supports the hypothesis by showing the mechanism of the cascade.',
    domain: 'Reading & Writing',
    topic: 'Evidence-Based Reasoning'
  },

  // ── Vocabulary in Context ──

  {
    stem: 'The architect\'s proposal was deliberately provocative: rather than blending with the neighborhood\'s historic buildings, the design ___ them, with angular glass surfaces that reflected the older facades in distorted fragments.\n\nWhich choice best completes the text?',
    choices: [
      'A) complemented',
      'B) subverted',
      'C) replicated',
      'D) obscured'
    ],
    correct: 1,
    explanation: 'The passage describes a design that is "deliberately provocative" and does not "blend" but instead distorts reflections of older buildings. "Subverted" means to undermine or challenge, which fits the intentional provocation. "Complemented" suggests harmony (the opposite), "replicated" means copied, and "obscured" means hid.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The committee\'s report was ___, running to over 400 pages of detailed analysis, statistical tables, and policy recommendations that addressed every facet of the housing crisis.\n\nWhich choice best completes the text?',
    choices: [
      'A) superficial',
      'B) exhaustive',
      'C) ambiguous',
      'D) inflammatory'
    ],
    correct: 1,
    explanation: 'The description emphasizes thoroughness: 400 pages, detailed analysis, every facet addressed. "Exhaustive" means comprehensive and thorough, covering all possibilities. "Superficial" means the opposite, "ambiguous" means unclear, and "inflammatory" means provocative.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'While many of her contemporaries pursued fame through spectacle, the poet Emily Dickinson cultivated a ___ existence, rarely leaving her home in Amherst and sharing her work with only a small circle of correspondents.\n\nWhich choice best completes the text?',
    choices: [
      'A) reclusive',
      'B) gregarious',
      'C) ostentatious',
      'D) controversial'
    ],
    correct: 0,
    explanation: 'The passage contrasts Dickinson with those seeking fame through spectacle and describes her as rarely leaving home and sharing work with few people. "Reclusive" means withdrawn from society, which matches perfectly. "Gregarious" (sociable), "ostentatious" (showy), and "controversial" (disputed) all contradict the description.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The diplomat\'s language was carefully ___; she acknowledged the severity of the crisis without assigning blame to any particular nation, leaving room for all parties to engage in negotiations.\n\nWhich choice best completes the text?',
    choices: [
      'A) callous',
      'B) measured',
      'C) inflammatory',
      'D) cryptic'
    ],
    correct: 1,
    explanation: '"Measured" means carefully considered and restrained. The diplomat\'s careful balance -- acknowledging severity without assigning blame -- exemplifies measured language. "Callous" (insensitive), "inflammatory" (provoking anger), and "cryptic" (mysterious) do not fit the described tone.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },

  // ── Inference and Implication ──

  {
    stem: 'The following is from a study of urban transportation:\n\n"When the city of Bogota, Colombia, introduced its TransMilenio bus rapid transit system in 2000, planners expected it to serve primarily low-income commuters who lacked access to private vehicles. Within five years, however, surveys revealed that a significant portion of TransMilenio riders were middle-class professionals who had voluntarily given up driving."\n\nIt can most reasonably be inferred from the passage that:',
    choices: [
      'A) the TransMilenio system was a financial failure.',
      'B) effective public transit can attract riders beyond its originally intended demographic when it offers advantages over driving.',
      'C) all middle-class residents of Bogota stopped driving.',
      'D) the planners deliberately designed the system to attract wealthy riders.'
    ],
    correct: 1,
    explanation: 'The passage states that planners expected low-income riders but found middle-class professionals voluntarily switching from cars. This implies that the system offered enough advantages (speed, convenience, cost) to attract riders who had other options. The passage does not say it was a failure, that all middle-class residents switched, or that planners intended to attract wealthier riders.',
    domain: 'Reading & Writing',
    topic: 'Inference and Implication'
  },
  {
    stem: 'The following is from a discussion of artificial intelligence in medicine:\n\n"In a 2019 study, a deep-learning algorithm outperformed a panel of board-certified dermatologists in identifying melanoma from skin lesion photographs. The researchers were careful to note, however, that the algorithm was tested on high-quality clinical images taken under controlled lighting conditions -- a setting quite different from a typical busy clinic where images might be taken with a smartphone under fluorescent lights."\n\nThe researchers\' caveat most strongly suggests that:',
    choices: [
      'A) the algorithm is useless in real-world medical practice.',
      'B) dermatologists should be replaced by artificial intelligence.',
      'C) the algorithm\'s superior performance in the study may not fully translate to real-world clinical settings where image quality varies.',
      'D) all medical images should be taken under controlled lighting conditions.'
    ],
    correct: 2,
    explanation: 'The researchers highlight the gap between controlled study conditions and typical clinical environments. This caveat implies that real-world performance might differ because image quality cannot always be controlled. They are not dismissing the algorithm entirely (A) nor endorsing replacement of doctors (B).',
    domain: 'Reading & Writing',
    topic: 'Inference and Implication'
  },
  {
    stem: 'The following is from a passage about language preservation:\n\n"Of the approximately 7,000 languages currently spoken worldwide, linguists estimate that nearly half will cease to be spoken by the end of this century. When a language disappears, it takes with it not only a system of communication but also a unique framework for understanding the world -- categories of thought, ecological knowledge encoded in vocabulary, and oral histories that exist nowhere else."\n\nThe author most likely mentions "ecological knowledge encoded in vocabulary" in order to:',
    choices: [
      'A) argue that all languages are equally complex grammatically.',
      'B) illustrate that language loss involves the disappearance of irreplaceable intellectual and cultural content, not merely words.',
      'C) suggest that linguists should focus exclusively on documenting plant names.',
      'D) prove that endangered languages are more scientifically valuable than widely spoken ones.'
    ],
    correct: 1,
    explanation: 'The author\'s point is that losing a language means losing more than communication -- it means losing "unique frameworks," including ecological knowledge. This example concretizes the broader argument that language death entails irreplaceable intellectual loss.',
    domain: 'Reading & Writing',
    topic: 'Inference and Implication'
  },
  {
    stem: 'The following is from a passage about economic history:\n\n"During the Great Depression, President Hoover repeatedly assured the public that prosperity was \'just around the corner.\' Meanwhile, unemployment climbed to 25 percent, banks continued to fail by the thousands, and breadlines stretched around city blocks. The gap between official reassurance and lived reality eroded public trust in government institutions for a generation."\n\nThe author implies that:',
    choices: [
      'A) Hoover\'s optimistic statements were ultimately vindicated.',
      'B) the public\'s loss of trust was an irrational overreaction.',
      'C) the disconnect between leaders\' rhetoric and citizens\' actual experiences can have lasting consequences for institutional credibility.',
      'D) the Great Depression ended quickly because of government intervention.'
    ],
    correct: 2,
    explanation: 'The passage juxtaposes Hoover\'s reassurances with the harsh reality and then states that the gap "eroded public trust...for a generation." The implication is that when leaders\' words diverge sharply from people\'s experiences, trust suffers long-term consequences.',
    domain: 'Reading & Writing',
    topic: 'Inference and Implication'
  },

  // ── Text Structure and Function ──

  {
    stem: 'The following is from a scientific article:\n\n"The prevailing model of plate tectonics, first articulated in the 1960s, holds that Earth\'s lithosphere is divided into rigid plates that move atop a more fluid asthenosphere. This model elegantly explains phenomena such as earthquakes, volcanic activity, and mountain formation. Recently, however, geophysicists have discovered that some plates appear to deform internally rather than behaving as perfectly rigid bodies -- a finding that complicates, though it does not overturn, the standard theory."\n\nThe function of the final sentence is to:',
    choices: [
      'A) completely refute the theory of plate tectonics.',
      'B) introduce a modification to the prevailing model while acknowledging that the model\'s core framework remains valid.',
      'C) provide biographical information about the scientists who developed plate tectonics.',
      'D) argue that earthquakes and volcanic activity are unrelated to plate movements.'
    ],
    correct: 1,
    explanation: 'The final sentence uses "complicates, though it does not overturn" -- a key phrase showing that the new finding modifies but does not discard the theory. This balanced nuance is the sentence\'s primary function.',
    domain: 'Reading & Writing',
    topic: 'Text Structure and Function'
  },
  {
    stem: 'The following is from an essay about education policy:\n\nParagraph 1: "Standardized testing has been the cornerstone of American educational assessment for over half a century."\nParagraph 2: "Advocates argue that standardized tests provide objective, comparable data across diverse school districts."\nParagraph 3: "Critics, however, contend that these tests measure test-taking skills rather than genuine understanding and disproportionately disadvantage students from low-income backgrounds."\nParagraph 4: "A growing number of universities have adopted test-optional admissions policies, suggesting that the educational establishment itself is losing confidence in standardized measures."\n\nThe overall structure of the passage is best described as:',
    choices: [
      'A) a chronological history of standardized testing.',
      'B) an introduction of a topic, followed by competing perspectives, followed by evidence of a shift in practice.',
      'C) a series of unrelated arguments about education.',
      'D) a detailed technical explanation of how standardized tests are designed.'
    ],
    correct: 1,
    explanation: 'Paragraph 1 introduces the topic, paragraphs 2 and 3 present the pro and con arguments, and paragraph 4 presents evidence (test-optional policies) suggesting that the debate is being resolved in practice. This is a classic introduction-debate-evidence structure.',
    domain: 'Reading & Writing',
    topic: 'Text Structure and Function'
  },
  {
    stem: 'The following is from a passage about cognitive science:\n\n"Consider the simple act of catching a ball. In less than a second, the brain must calculate the ball\'s trajectory, adjust for wind and spin, coordinate dozens of muscles, and position the hand with millimeter precision. Yet a five-year-old can do this effortlessly, while the most advanced robots still struggle with the task."\n\nThe author most likely includes the comparison to robots in order to:',
    choices: [
      'A) argue that robots are poorly designed.',
      'B) emphasize the remarkable computational power of the human brain by contrasting it with current technology.',
      'C) suggest that children are smarter than adults.',
      'D) predict that robots will never be able to catch a ball.'
    ],
    correct: 1,
    explanation: 'By noting that even advanced robots struggle with what a five-year-old does "effortlessly," the author highlights the extraordinary -- and often underappreciated -- processing power of the human brain. The robot comparison serves as a benchmark to make this point vivid.',
    domain: 'Reading & Writing',
    topic: 'Text Structure and Function'
  },

  // ── Rhetorical Analysis ──

  {
    stem: 'The following is from a persuasive essay:\n\n"Every year, 8 million metric tons of plastic enter the world\'s oceans -- the equivalent of dumping a garbage truck of plastic into the sea every minute. At this rate, scientists predict that by 2050, the oceans will contain more plastic by weight than fish. We have engineered the slow suffocation of the very ecosystems that sustain us."\n\nThe author uses the "garbage truck" comparison primarily to:',
    choices: [
      'A) provide an exact scientific measurement of ocean pollution.',
      'B) make an abstract statistic viscerally comprehensible by translating it into a concrete, vivid image.',
      'C) blame the trucking industry for ocean pollution.',
      'D) suggest that garbage trucks should be banned.'
    ],
    correct: 1,
    explanation: '"8 million metric tons" is an abstract number. By converting it to "a garbage truck every minute," the author creates a vivid mental image that makes the scale of the problem emotionally and intellectually accessible to readers.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Analysis'
  },
  {
    stem: 'The following is from a commencement address:\n\n"You have been told that you are the leaders of tomorrow. I want to challenge that. You are not the leaders of tomorrow -- you are the leaders of today. Tomorrow is a convenient fiction that lets us postpone action. The problems of climate change, inequality, and democratic erosion will not wait politely for you to feel ready."\n\nThe speaker\'s rhetorical strategy in this passage is best described as:',
    choices: [
      'A) flattering the audience to gain their trust.',
      'B) reframing a familiar cliche to create urgency and motivate immediate action.',
      'C) criticizing the audience for their lack of preparation.',
      'D) providing a detailed policy proposal for climate change.'
    ],
    correct: 1,
    explanation: 'The speaker takes the common phrase "leaders of tomorrow," explicitly challenges it, and replaces it with "leaders of today." This reframing turns a comfortable platitude into a call for immediate engagement. The speaker is not criticizing the audience but rather pushing them past comfortable delay.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Analysis'
  },
  {
    stem: 'The following is from a book review:\n\n"To call this novel \'ambitious\' would be an understatement on the order of calling the Pacific Ocean \'damp.\' Spanning four continents and three centuries, the narrative weaves together the stories of twelve interconnected families whose fates are shaped by the global sugar trade. That the author manages to keep all these threads distinct and emotionally compelling is a feat of literary engineering."\n\nThe reviewer\'s tone can best be described as:',
    choices: [
      'A) dismissive and unimpressed.',
      'B) admiringly hyperbolic, using humor to convey genuine high praise.',
      'C) neutrally objective and detached.',
      'D) sarcastically critical of the novel\'s scope.'
    ],
    correct: 1,
    explanation: 'The Pacific Ocean comparison is humorous and deliberately exaggerated ("hyperbolic"), and phrases like "feat of literary engineering" convey clear admiration. The humor serves the praise rather than undermining it, making the tone admiringly hyperbolic.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Analysis'
  },
  {
    stem: 'The following is from Frederick Douglass\'s autobiography:\n\n"I have often been utterly astonished, since I came to the North, to find persons who could speak of the singing among slaves as evidence of their contentment and happiness. It is impossible to conceive of a greater mistake. Slaves sing most when they are most unhappy. The songs of the slave represent the sorrows of his heart."\n\nDouglass\'s rhetorical purpose in this passage is primarily to:',
    choices: [
      'A) describe the musical traditions of enslaved people.',
      'B) correct a dangerous misinterpretation by showing that what outsiders read as happiness was actually an expression of grief.',
      'C) argue that music is unimportant to understanding slavery.',
      'D) praise Northern attitudes toward slavery.'
    ],
    correct: 1,
    explanation: 'Douglass directly addresses and refutes the "greater mistake" of interpreting slave songs as signs of contentment. His purpose is corrective: he reframes the songs as expressions of sorrow, countering a misperception that was used to justify or minimize the suffering of enslaved people.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Analysis'
  },

  // ── Additional Reading Comprehension ──

  {
    stem: 'The following is from a passage about neuroscience:\n\n"For decades, neuroscientists believed that the adult brain was essentially fixed -- that it could not generate new neurons or significantly reorganize its structure. This dogma began to crumble in the 1990s, when researchers demonstrated that the hippocampus, a brain region crucial for memory, continues to produce new neurons throughout adulthood. The discovery of adult neurogenesis did not merely add a footnote to existing textbooks; it forced a fundamental rethinking of the brain\'s capacity for change."\n\nThe word "dogma" as used in the passage most nearly means:',
    choices: [
      'A) a religious belief held on faith.',
      'B) a firmly held belief accepted as authoritative without adequate questioning.',
      'C) a scientific theory supported by overwhelming evidence.',
      'D) a controversial and widely debated hypothesis.'
    ],
    correct: 1,
    explanation: 'In this context, "dogma" refers to the fixed-brain belief that was accepted as established truth in neuroscience. The word carries a negative connotation: the belief was held as authoritative despite being wrong. The passage shows it "crumbling" under new evidence, highlighting that it was not adequately questioned.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The following is from a passage about architecture:\n\n"The Brutalist buildings of the 1960s and 1970s, with their massive concrete forms and unfinished surfaces, were designed to project institutional strength and democratic openness. Their architects believed that exposing a building\'s raw materials was more honest than concealing them behind decorative facades. Yet to many residents who lived near or within these structures, Brutalism communicated not honesty but hostility -- a cold, imposing indifference to human scale and comfort."\n\nThe passage is primarily structured as:',
    choices: [
      'A) a chronological history of Brutalist architecture from its origins to its decline.',
      'B) a presentation of the architects\' intentions followed by a contrasting public reception.',
      'C) a technical explanation of concrete construction methods.',
      'D) an argument that Brutalist buildings should be demolished.'
    ],
    correct: 1,
    explanation: 'The passage first explains what Brutalist architects intended (strength, openness, honesty) and then contrasts this with how the public actually experienced the buildings (hostility, indifference). This intention-versus-reception structure is the passage\'s organizing principle.',
    domain: 'Reading & Writing',
    topic: 'Text Structure and Function'
  },
  {
    stem: 'The following is from a passage about the history of science:\n\n"In 1847, the Hungarian physician Ignaz Semmelweis discovered that hand-washing with chlorinated solutions dramatically reduced the incidence of childbed fever in maternity wards. His colleagues, however, rejected his findings. The suggestion that doctors themselves were transmitting disease to their patients was considered insulting to the medical profession. Semmelweis died in obscurity in 1865, and it was not until the acceptance of germ theory decades later that his contribution was fully recognized."\n\nThe passage most strongly supports which of the following conclusions?',
    choices: [
      'A) Semmelweis\'s findings were based on flawed methodology.',
      'B) Scientific evidence can be rejected when it conflicts with the professional identity and assumptions of the community evaluating it.',
      'C) Germ theory was widely accepted by the 1850s.',
      'D) Hand-washing was already common practice in hospitals before Semmelweis.'
    ],
    correct: 1,
    explanation: 'The passage explicitly states that Semmelweis\'s evidence was rejected because it was "considered insulting to the medical profession." This shows that social and professional factors -- not the quality of the evidence -- drove the rejection. This supports the conclusion that valid evidence can be dismissed when it threatens professional identity.',
    domain: 'Reading & Writing',
    topic: 'Evidence-Based Reasoning'
  },
  {
    stem: 'The following is from a passage about economics:\n\n"Economists have long debated whether minimum wage increases lead to job losses. Classical economic theory predicts that raising the price of labor above its market equilibrium will reduce demand for workers. Empirical studies, however, have produced mixed results. A landmark 1994 study by Card and Krueger found that a minimum wage increase in New Jersey did not reduce employment in the fast-food industry compared to neighboring Pennsylvania, where no increase occurred. More recent analyses using broader datasets have found small but statistically significant negative effects on employment among the least-skilled workers."\n\nBased on the passage, which statement most accurately characterizes the current state of research on minimum wage and employment?',
    choices: [
      'A) Research has definitively proven that minimum wage increases always cause job losses.',
      'B) Research has definitively proven that minimum wage increases never affect employment.',
      'C) The evidence is mixed, with some studies finding no employment effects and others finding modest negative effects among certain groups.',
      'D) No empirical research has been conducted on this topic.'
    ],
    correct: 2,
    explanation: 'The passage presents both the Card and Krueger study (no employment effect) and more recent analyses (small negative effects among least-skilled workers). The passage characterizes the results as "mixed," which directly supports option C.',
    domain: 'Reading & Writing',
    topic: 'Central Idea and Purpose'
  },
  {
    stem: 'The following is from a passage about environmental science:\n\n"The concept of \'ecosystem services\' attempts to quantify the economic value of what nature provides for free: pollination, water filtration, carbon sequestration, flood control. Advocates argue that putting a dollar value on these services makes the cost of environmental destruction visible in terms that policymakers and corporations understand. Critics, however, worry that reducing nature to economic terms risks implying that ecosystems are valuable only insofar as they serve human economic interests -- a framework that could ultimately justify destroying an ecosystem if its calculated economic value falls below the projected profit from development."\n\nThe critics mentioned in the passage are primarily concerned that:',
    choices: [
      'A) ecosystem services cannot be accurately measured.',
      'B) framing nature in purely economic terms could paradoxically provide a rationale for environmental destruction.',
      'C) policymakers do not understand economics.',
      'D) pollination and water filtration are not important.'
    ],
    correct: 1,
    explanation: 'The critics\' concern is specifically about the logical endpoint of economic framing: if nature\'s value is measured in dollars, then whenever profit exceeds that dollar value, destruction becomes "justified." This is a concern about the framework\'s internal logic producing perverse outcomes, not about measurement accuracy.',
    domain: 'Reading & Writing',
    topic: 'Inference and Implication'
  },

  // ═══════════════════════════════════════════════════════
  //  ADDITIONAL QUESTIONS  (25 questions)
  // ═══════════════════════════════════════════════════════

  // ── Additional Grammar & Conventions ──

  {
    stem: 'The archaeologist ___ that the pottery fragments, which date to approximately 3000 BCE, provide crucial evidence of early trade networks between Mesopotamian city-states.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) are arguing',
      'B) argue',
      'C) argues',
      'D) have argued'
    ],
    correct: 2,
    explanation: 'The subject is "archaeologist" (singular). The singular verb "argues" agrees with the singular subject. The intervening clause about pottery fragments does not change the subject.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'The data from the longitudinal study ___ researchers to conclude that early childhood nutrition has lasting effects on cognitive development.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) has led',
      'B) have led',
      'C) are leading',
      'D) lead'
    ],
    correct: 1,
    explanation: '"Data" is plural (the singular form is "datum"). The plural verb "have led" agrees with the plural subject "data." In academic and SAT usage, "data" takes a plural verb.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'The composer revised the symphony\'s third movement extensively ___ she felt the original version lacked the emotional intensity the piece demanded.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) extensively, she',
      'B) extensively she',
      'C) extensively; she',
      'D) extensively because she'
    ],
    correct: 3,
    explanation: 'The second clause explains why the composer revised the movement. "Because" correctly introduces this causal relationship while subordinating the clause and avoiding a comma splice or run-on.',
    domain: 'Reading & Writing',
    topic: 'Comma Splices and Run-On Sentences'
  },
  {
    stem: 'By the time the conservation team arrived at the nesting site, poachers ___ most of the eggs, leaving only a handful for the endangered species to hatch.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) take',
      'B) took',
      'C) had taken',
      'D) are taking'
    ],
    correct: 2,
    explanation: '"By the time the team arrived" signals that the poaching occurred before the past event of arriving. The past perfect "had taken" correctly indicates an action completed before another past action.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense Consistency'
  },
  {
    stem: 'The playwright\'s latest work examines how immigrants ___ their cultural identities in new countries -- a theme that resonates with audiences worldwide.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) negotiates',
      'B) negotiate',
      'C) is negotiating',
      'D) has negotiated'
    ],
    correct: 1,
    explanation: 'The subject of the embedded clause is "immigrants" (plural), so the plural verb "negotiate" is correct. The present tense matches the ongoing nature of the phenomenon.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },

  // ── Additional Transitions & Expression of Ideas ──

  {
    stem: 'The discovery of penicillin in 1928 transformed the treatment of bacterial infections. ___, some researchers argue that the widespread use of antibiotics has inadvertently accelerated the evolution of drug-resistant bacteria.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) Similarly,',
      'B) For example,',
      'C) Paradoxically,',
      'D) In addition,'
    ],
    correct: 2,
    explanation: 'The second sentence presents an ironic outcome: the solution to infections has itself created a new problem. "Paradoxically" signals this ironic or contradictory relationship.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'Iceland generates nearly 100 percent of its electricity from renewable sources, primarily geothermal and hydroelectric power. ___, the country\'s unique geology -- sitting atop a volcanic hotspot on the Mid-Atlantic Ridge -- provides an abundance of geothermal energy that few other nations can match.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) However,',
      'B) This is largely because',
      'C) In contrast,',
      'D) Nevertheless,'
    ],
    correct: 1,
    explanation: 'The second sentence explains why Iceland can generate so much renewable energy. "This is largely because" introduces the causal explanation for the claim in the first sentence.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'While researching a paper on urban planning, a student wants to emphasize the health benefits of green spaces.\n\nWhich choice most effectively accomplishes this goal?',
    choices: [
      'A) Urban parks are popular places for recreation.',
      'B) Research published in The Lancet found that residents living within 300 meters of green space had significantly lower rates of cardiovascular disease, depression, and diabetes compared to those without nearby access.',
      'C) Many cities have parks departments that maintain public green spaces.',
      'D) Green spaces can increase property values in surrounding neighborhoods.'
    ],
    correct: 1,
    explanation: 'Option B provides specific, quantified health outcomes (cardiovascular disease, depression, diabetes) from a credible source, directly supporting the goal of emphasizing health benefits.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Synthesis'
  },
  {
    stem: 'A student wants to revise the following sentence for conciseness without changing its meaning:\n\n"The reason that the experiment failed was due to the fact that the temperature was not properly controlled and maintained at the correct level."\n\nWhich revision is most concise?',
    choices: [
      'A) NO CHANGE',
      'B) The experiment failed because the temperature was not properly controlled.',
      'C) The reason for the failure of the experiment was that the temperature was not controlled and maintained properly.',
      'D) Due to the fact that the temperature was not properly maintained and controlled, the experiment failed for that reason.'
    ],
    correct: 1,
    explanation: '"The reason...was due to the fact that" is redundant; "because" says the same thing concisely. "Controlled and maintained at the correct level" can be simplified to "properly controlled."',
    domain: 'Reading & Writing',
    topic: 'Conciseness and Redundancy'
  },
  {
    stem: 'The Great Barrier Reef supports an astonishing diversity of marine life. ___, it is home to over 1,500 species of fish, 400 types of coral, and numerous species of dolphins, sea turtles, and sharks.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) However,',
      'B) In contrast,',
      'C) Specifically,',
      'D) Nevertheless,'
    ],
    correct: 2,
    explanation: 'The second sentence provides specific examples that illustrate the "astonishing diversity" mentioned in the first. "Specifically" introduces concrete details supporting a general claim.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },

  // ── Additional Reading Comprehension ──

  {
    stem: 'The following is from a passage about cognitive psychology:\n\n"The human brain is remarkably adept at pattern recognition, a skill that served our ancestors well on the savanna. However, this same ability can lead us astray in the modern world: we see patterns where none exist, find correlations in random data, and construct narratives to explain coincidences. Psychologists call this tendency apophenia, and it underlies everything from conspiracy theories to superstitious rituals."\n\nThe author\'s central claim is that:',
    choices: [
      'A) pattern recognition is always harmful.',
      'B) a cognitive ability that evolved for survival can produce irrational beliefs in modern contexts.',
      'C) conspiracy theories are the most common form of apophenia.',
      'D) the human brain has not evolved since prehistoric times.'
    ],
    correct: 1,
    explanation: 'The passage traces pattern recognition from its evolutionary benefit ("served our ancestors well") to its modern drawbacks (seeing nonexistent patterns). The central claim is about a useful ability producing irrational outcomes in new contexts.',
    domain: 'Reading & Writing',
    topic: 'Central Idea and Purpose'
  },
  {
    stem: 'The following is from a passage about music history:\n\n"When Igor Stravinsky\'s \'The Rite of Spring\' premiered in Paris in 1913, the audience erupted in chaos. The dissonant harmonies, irregular rhythms, and primitive choreography shocked listeners accustomed to the elegant conventions of classical ballet. What seemed like artistic vandalism to that first audience, however, proved to be one of the most influential compositions of the twentieth century, fundamentally reshaping the possibilities of musical expression."\n\nThe passage is primarily structured as:',
    choices: [
      'A) a chronological biography of Stravinsky.',
      'B) a narrative that moves from initial rejection to eventual recognition, highlighting the gap between contemporary response and historical significance.',
      'C) an argument that Stravinsky\'s music was not original.',
      'D) a comparison of ballet and modern dance.'
    ],
    correct: 1,
    explanation: 'The passage moves from the hostile premiere reception to the work\'s lasting influence, structuring the narrative around the contrast between initial rejection and eventual recognition.',
    domain: 'Reading & Writing',
    topic: 'Text Structure and Function'
  },
  {
    stem: 'The following is from a passage about environmental policy:\n\n"Cap-and-trade systems put a price on carbon emissions by setting a limit on total allowable emissions and allowing companies to buy and sell emission permits. Proponents argue that this market-based approach achieves pollution reduction more efficiently than top-down regulation. Critics counter that the system creates opportunities for financial speculation, allows wealthy polluters to simply buy their way out of reducing emissions, and has historically set caps too high to drive meaningful change."\n\nBased on the passage, which statement would the critics most likely agree with?',
    choices: [
      'A) Market-based approaches are always superior to regulation.',
      'B) The theoretical efficiency of cap-and-trade may be undermined by practical and structural flaws in implementation.',
      'C) Carbon emissions are not a significant environmental concern.',
      'D) Financial speculation is beneficial for environmental policy.'
    ],
    correct: 1,
    explanation: 'The critics identify specific structural problems (speculation, buying out, high caps) that undermine the system\'s theoretical benefits. They argue that practical flaws compromise the approach\'s effectiveness.',
    domain: 'Reading & Writing',
    topic: 'Inference and Implication'
  },
  {
    stem: 'A researcher claims that bilingual children develop stronger executive function skills than monolingual children. Which finding would most directly support this claim?',
    choices: [
      'A) Bilingual children tend to come from families with higher education levels.',
      'B) In controlled experiments, bilingual children consistently outperformed monolingual peers on tasks requiring attention switching, inhibitory control, and working memory.',
      'C) Many countries offer bilingual education programs.',
      'D) Bilingual children can speak two languages fluently.'
    ],
    correct: 1,
    explanation: 'The claim is about executive function (attention switching, inhibitory control, working memory). Option B provides controlled experimental evidence directly testing these specific skills, making it the strongest support.',
    domain: 'Reading & Writing',
    topic: 'Evidence-Based Reasoning'
  },
  {
    stem: 'The following excerpt is from a passage about the philosophy of science:\n\n"Thomas Kuhn argued that scientific progress does not occur through the gradual accumulation of knowledge, as the popular image suggests. Instead, he proposed that science alternates between periods of \'normal science\' -- in which researchers work within an accepted framework -- and dramatic \'paradigm shifts\' in which the framework itself is overturned and replaced."\n\nAs used in the passage, "framework" most nearly means:',
    choices: [
      'A) a physical structure used to support a building.',
      'B) a set of fundamental assumptions and methods that guide scientific inquiry.',
      'C) a government regulation controlling research.',
      'D) a mathematical equation used in experiments.'
    ],
    correct: 1,
    explanation: 'In this context, "framework" refers to the accepted paradigm -- the set of assumptions, theories, and methods that guide how scientists conduct research within "normal science." A paradigm shift overturns this conceptual structure.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The activist\'s rhetoric grew increasingly ___ as negotiations stalled, abandoning her earlier diplomatic tone in favor of sharp denunciations of the opposition\'s refusal to compromise.\n\nWhich choice best completes the text?',
    choices: [
      'A) conciliatory',
      'B) strident',
      'C) ambivalent',
      'D) understated'
    ],
    correct: 1,
    explanation: 'The passage describes a shift from diplomatic to confrontational ("sharp denunciations"). "Strident" means loud, forceful, and assertive, which matches the escalation described.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The following is from a passage about behavioral economics:\n\n"Classical economic theory assumes that consumers make rational decisions based on complete information. Behavioral economists have demonstrated, however, that real human decision-making is shaped by cognitive biases, emotional responses, and environmental cues. For example, studies show that consumers are more likely to purchase a product when it is framed as \'90% fat-free\' than when the identical product is described as \'10% fat,\' even though the two descriptions are logically equivalent."\n\nThe example about fat-free labeling primarily serves to:',
    choices: [
      'A) argue that all food labels are misleading.',
      'B) illustrate how framing effects demonstrate that human decision-making departs from purely rational models.',
      'C) prove that consumers prefer low-fat products.',
      'D) suggest that food companies should be regulated more strictly.'
    ],
    correct: 1,
    explanation: 'The example shows that logically equivalent information ("90% fat-free" vs. "10% fat") produces different consumer choices, directly illustrating the passage\'s broader point about cognitive biases overriding rational decision-making.',
    domain: 'Reading & Writing',
    topic: 'Text Structure and Function'
  },
  {
    stem: 'Text 1 argues that requiring students to learn cursive handwriting is an outdated practice with no demonstrated cognitive benefits that justify the instructional time spent. Text 2 presents neuroscience research suggesting that the motor complexity of cursive writing activates brain regions associated with memory and fine motor control in ways that typing does not.\n\nBased on both texts, which statement is most accurate?',
    choices: [
      'A) Both texts agree that cursive instruction should be eliminated.',
      'B) The research in Text 2 directly challenges Text 1\'s claim about the absence of cognitive benefits.',
      'C) Text 1 provides stronger evidence than Text 2.',
      'D) The two texts address completely different topics.'
    ],
    correct: 1,
    explanation: 'Text 1 claims no cognitive benefits justify cursive instruction. Text 2 presents neuroscience evidence of specific cognitive benefits (memory, motor control activation). Text 2 directly contradicts Text 1\'s central claim.',
    domain: 'Reading & Writing',
    topic: 'Cross-Text Connections'
  },
  {
    stem: 'The city\'s plan to convert an abandoned rail line into an elevated park was initially met with ___ from neighborhood residents, who worried about increased noise and foot traffic, but opinion shifted dramatically after the park\'s opening, when property values along the route rose by 25 percent.\n\nWhich choice best completes the text?',
    choices: [
      'A) enthusiasm',
      'B) indifference',
      'C) resistance',
      'D) curiosity'
    ],
    correct: 2,
    explanation: 'The residents "worried" about negative impacts, indicating opposition to the plan. "Resistance" captures this initial opposition, which contrasts with the later positive shift in opinion.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'A student is combining the following sentences in a research paper:\n\nSentence 1: The James Webb Space Telescope was launched in December 2021.\nSentence 2: It is the most powerful space telescope ever built.\nSentence 3: Its infrared instruments can detect light from the earliest galaxies formed after the Big Bang.\n\nWhich choice most effectively combines the sentences?',
    choices: [
      'A) The James Webb Space Telescope was launched in December 2021, and it is the most powerful space telescope ever built, and its infrared instruments can detect light from the earliest galaxies formed after the Big Bang.',
      'B) Launched in December 2021, the James Webb Space Telescope -- the most powerful ever built -- uses infrared instruments capable of detecting light from the earliest galaxies formed after the Big Bang.',
      'C) The James Webb Space Telescope, which was launched in December 2021, is the most powerful space telescope ever built, and it has infrared instruments that can detect light from the earliest galaxies that formed after the Big Bang.',
      'D) In December 2021, a telescope was launched into space, and it was powerful and could see early galaxies.'
    ],
    correct: 1,
    explanation: 'Option B efficiently integrates all three facts using a participial phrase ("Launched in December 2021"), a parenthetical appositive ("the most powerful ever built"), and a main clause about the telescope\'s capabilities.',
    domain: 'Reading & Writing',
    topic: 'Combining Sentences'
  },
  {
    stem: 'The following is from a passage about the history of public health:\n\n"John Snow\'s 1854 investigation of a cholera outbreak in London\'s Soho district is often cited as the founding event of modern epidemiology. By meticulously mapping the addresses of cholera victims, Snow identified a contaminated water pump as the source of the outbreak -- decades before the germ theory of disease was widely accepted. His work demonstrated that careful data collection and spatial analysis could identify disease causes even in the absence of a theoretical framework explaining the mechanism of transmission."\n\nThe passage most strongly supports which conclusion?',
    choices: [
      'A) Snow invented the science of microbiology.',
      'B) Empirical methods can produce actionable public health insights even before the underlying science is fully understood.',
      'C) Germ theory was widely accepted by 1854.',
      'D) Mapping technology was advanced in the 19th century.'
    ],
    correct: 1,
    explanation: 'The passage emphasizes that Snow identified the cholera source through data and mapping "decades before" germ theory was accepted. This supports the conclusion that empirical investigation can outpace theoretical understanding.',
    domain: 'Reading & Writing',
    topic: 'Evidence-Based Reasoning'
  },

  // ── More Grammar & Conventions ──

  {
    stem: 'The researchers concluded that the new treatment, which showed promise in early trials, ___ additional testing before it could be recommended for widespread use.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) requiring',
      'B) requires',
      'C) are requiring',
      'D) have required'
    ],
    correct: 1,
    explanation: 'The subject of the main clause is "treatment" (singular). The relative clause about trials is non-essential. The singular verb "requires" agrees with "treatment."',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'The novel, widely considered a masterpiece of modernist fiction, ___ first published in 1925 to mixed reviews.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) were',
      'B) are',
      'C) was',
      'D) have been'
    ],
    correct: 2,
    explanation: '"Novel" is singular and the event occurred in a specific past year (1925), so the singular past tense "was" is correct.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'Scientists have identified a new species of deep-sea fish ___ bioluminescent organs allow it to produce light in the pitch-black ocean depths.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) who\'s',
      'B) whose',
      'C) that\'s',
      'D) which'
    ],
    correct: 1,
    explanation: '"Whose" correctly shows possession (the fish\'s bioluminescent organs). "Who\'s" means "who is," which does not fit here.',
    domain: 'Reading & Writing',
    topic: 'Pronoun Usage'
  },
  {
    stem: 'The marathon runner crossed the finish line ___ collapsed in exhaustion.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) line, and then she',
      'B) line she then',
      'C) line, then she',
      'D) line; then, she'
    ],
    correct: 0,
    explanation: 'Two independent clauses ("crossed the finish line" and "collapsed in exhaustion") need proper joining. A comma with "and" correctly connects them.',
    domain: 'Reading & Writing',
    topic: 'Comma Splices and Run-On Sentences'
  },

  // ── More Vocabulary in Context ──

  {
    stem: 'The professor\'s lecture was deliberately ___, presenting complex theories in simple, everyday language that even non-specialists could follow.\n\nWhich choice best completes the text?',
    choices: [
      'A) esoteric',
      'B) accessible',
      'C) verbose',
      'D) contentious'
    ],
    correct: 1,
    explanation: 'The context shows the professor used simple language for non-specialists. "Accessible" means easy to understand or approach, fitting perfectly.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The discovery was ___, overturning decades of established scientific consensus about the origins of the species.\n\nWhich choice best completes the text?',
    choices: [
      'A) mundane',
      'B) incremental',
      'C) groundbreaking',
      'D) predictable'
    ],
    correct: 2,
    explanation: '"Overturning decades of established scientific consensus" describes a revolutionary finding. "Groundbreaking" means innovatively important, matching this impact.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The diplomat maintained a ___ demeanor throughout the heated negotiations, never raising her voice or showing frustration despite the other side\'s provocations.\n\nWhich choice best completes the text?',
    choices: [
      'A) volatile',
      'B) composed',
      'C) belligerent',
      'D) diffident'
    ],
    correct: 1,
    explanation: 'Never raising her voice or showing frustration despite provocations describes calm self-control. "Composed" means calm, self-possessed, and in control.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },

  // ── More Reading Comprehension ──

  {
    stem: 'The following is from a passage about language acquisition:\n\n"Children who are exposed to two languages from birth do not, as was once feared, suffer from linguistic confusion. Research consistently shows that bilingual children reach language milestones at the same age as monolingual children. In fact, the need to constantly distinguish between two linguistic systems appears to enhance certain cognitive skills, particularly the ability to focus attention and ignore irrelevant information."\n\nThe author\'s primary purpose is to:',
    choices: [
      'A) argue that bilingual education should be mandatory in all schools.',
      'B) correct a misconception about bilingualism and present evidence of its cognitive advantages.',
      'C) explain the process by which children learn to speak.',
      'D) compare the grammar of different languages.'
    ],
    correct: 1,
    explanation: 'The passage addresses the old fear of "linguistic confusion" (the misconception), refutes it with research, and then presents a cognitive advantage. This is a correction-of-misconception-plus-evidence structure.',
    domain: 'Reading & Writing',
    topic: 'Central Idea and Purpose'
  },
  {
    stem: 'The following is from a passage about urban agriculture:\n\n"Vertical farms -- indoor facilities that grow crops in stacked layers under artificial lighting -- have been hailed as the future of agriculture. Proponents point to their ability to produce food year-round, use 95% less water than traditional farming, and eliminate the need for pesticides. Skeptics note, however, that the enormous energy costs of artificial lighting make vertical farms economically viable only for high-value crops like leafy greens and herbs, not for the staple grains that feed the world."\n\nBased on the passage, which statement would both proponents and skeptics most likely agree with?',
    choices: [
      'A) Vertical farms should replace all traditional agriculture.',
      'B) Vertical farms can effectively grow some types of crops.',
      'C) The energy costs of vertical farming are insignificant.',
      'D) Traditional farming will disappear within a decade.'
    ],
    correct: 1,
    explanation: 'Proponents celebrate vertical farms\' ability to grow food, and even skeptics acknowledge they work for "high-value crops like leafy greens and herbs." Both sides agree vertical farms can grow some crops effectively.',
    domain: 'Reading & Writing',
    topic: 'Inference and Implication'
  },
  {
    stem: 'A researcher studying the effects of music on exercise performance designed a study in which participants ran on treadmills under three conditions: no music, slow music (60 BPM), and fast music (140 BPM). The researcher found that participants ran 15% longer with fast music compared to no music, while slow music had no significant effect.\n\nWhich conclusion is best supported by the study?',
    choices: [
      'A) All music improves exercise performance equally.',
      'B) Music tempo, rather than the mere presence of music, appears to be the factor that enhances endurance during exercise.',
      'C) Slow music harms exercise performance.',
      'D) Running is the best form of exercise.'
    ],
    correct: 1,
    explanation: 'Since fast music helped but slow music did not, the key variable is not music versus silence but the tempo of the music. This supports the conclusion that tempo specifically drives the performance effect.',
    domain: 'Reading & Writing',
    topic: 'Evidence-Based Reasoning'
  },
  {
    stem: 'The following is from a literary passage:\n\n"The house had been in the family for four generations, and each generation had left its mark: the original stone walls laid by the great-grandfather, the Victorian porch added by the grandfather, the mid-century kitchen renovation undertaken by the father, and now the solar panels the daughter had installed on the roof. The house was less a building than a palimpsest of the family\'s evolving relationship with the land."\n\nThe word "palimpsest" as used in the passage most nearly means:',
    choices: [
      'A) a museum of historical artifacts.',
      'B) a surface on which successive layers of history are visible, each era adding to rather than erasing the previous ones.',
      'C) a building in need of demolition.',
      'D) a financial investment passed between generations.'
    ],
    correct: 1,
    explanation: 'The passage describes each generation adding something new (stone walls, porch, kitchen, solar panels) while the previous additions remain. A "palimpsest" is a surface where layers of earlier writing are visible beneath the current one -- here used metaphorically for the house\'s accumulated history.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The following is from a passage about economics:\n\n"The gig economy promises workers flexibility and autonomy. Yet a growing body of research reveals a more complicated reality: gig workers often earn below minimum wage after accounting for expenses, lack access to health insurance and retirement benefits, and face unpredictable income that makes financial planning nearly impossible."\n\nThe author\'s rhetorical strategy in this passage is best described as:',
    choices: [
      'A) presenting an enthusiastic endorsement of gig work.',
      'B) first presenting the appealing narrative of gig work, then complicating it with evidence of its downsides.',
      'C) providing a neutral, balanced assessment without taking a position.',
      'D) arguing that all workers should avoid the gig economy.'
    ],
    correct: 1,
    explanation: 'The passage opens with the positive promise ("flexibility and autonomy") and then pivots with "yet" to present research showing the negative realities. This setup-then-complication structure is the core rhetorical strategy.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Analysis'
  },
  {
    stem: 'The historian argued that the Industrial Revolution\'s most ___ consequence was not the creation of factories or the growth of cities, but the fundamental transformation of how ordinary people understood the concept of time itself.\n\nWhich choice best completes the text?',
    choices: [
      'A) trivial',
      'B) ephemeral',
      'C) profound',
      'D) superficial'
    ],
    correct: 2,
    explanation: 'The historian identifies a "fundamental transformation" of how people understood time as the most important consequence -- deeper than the obvious effects like factories and cities. "Profound" means deep, far-reaching, and significant.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'Early in his career, the painter\'s style was ___, carefully adhering to the rules of proportion, perspective, and color theory taught at the Academy. It was only after a transformative trip to North Africa that he began experimenting with bold, unconventional techniques.\n\nWhich choice best completes the text?',
    choices: [
      'A) revolutionary',
      'B) conventional',
      'C) chaotic',
      'D) provocative'
    ],
    correct: 1,
    explanation: '"Carefully adhering to the rules" taught at the Academy describes following established norms. "Conventional" means following traditional standards, which contrasts with the later "bold, unconventional techniques."',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },

  // ── More Transitions ──

  {
    stem: 'The archaeological site has yielded hundreds of artifacts from the Bronze Age. ___, a team of conservators has been working to preserve the most fragile items before they deteriorate further.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) In contrast,',
      'B) To that end,',
      'C) Nevertheless,',
      'D) For instance,'
    ],
    correct: 1,
    explanation: 'The conservators\' preservation work is a purposeful response aimed at protecting the artifacts. "To that end" signals that the second action serves the goal implied by the first (preserving what was found).',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'The vaccine proved highly effective in clinical trials, reducing infection rates by 90 percent. ___, public health officials urged caution, noting that the trials had not included children or immunocompromised individuals.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) Therefore,',
      'B) Similarly,',
      'C) Even so,',
      'D) In addition,'
    ],
    correct: 2,
    explanation: 'The second sentence introduces a note of caution despite the positive results. "Even so" acknowledges the good news while signaling that reservations remain.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'The company invested heavily in employee training programs. ___, turnover rates dropped by 35 percent within two years.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) In contrast,',
      'B) Consequently,',
      'C) Nevertheless,',
      'D) Meanwhile,'
    ],
    correct: 1,
    explanation: 'The drop in turnover is a direct result of the investment in training. "Consequently" signals this cause-and-effect relationship.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },

  // ── Even More Questions ──

  {
    stem: 'The following passage discusses a recent archaeological find:\n\n"In 2023, archaeologists working in southern Turkey unearthed a temple complex dating to approximately 9000 BCE -- more than 5,000 years before the construction of the Egyptian pyramids. The site\'s elaborate stone carvings and monumental architecture challenge the long-held assumption that complex religious structures emerged only after the development of agriculture and settled communities. The people who built this temple appear to have been hunter-gatherers, suggesting that the desire to create sacred spaces may have been a driving force behind, rather than a consequence of, the transition to settled life."\n\nThe passage\'s central argument is that:',
    choices: [
      'A) the Egyptian pyramids were not built by Egyptians.',
      'B) the conventional understanding of the relationship between religion and agricultural settlement may need to be reversed.',
      'C) all hunter-gatherers built temples.',
      'D) Turkey is the most important archaeological region in the world.'
    ],
    correct: 1,
    explanation: 'The passage argues that religious building may have driven settlement rather than resulting from it, reversing the conventional assumption.',
    domain: 'Reading & Writing',
    topic: 'Central Idea and Purpose'
  },
  {
    stem: 'The CEO\'s announcement was ___, providing detailed financial projections, market analysis, and strategic goals for each of the company\'s seven divisions.\n\nWhich choice best completes the text?',
    choices: [
      'A) cursory',
      'B) comprehensive',
      'C) evasive',
      'D) tentative'
    ],
    correct: 1,
    explanation: 'The description of "detailed financial projections, market analysis, and strategic goals" across all divisions indicates thorough coverage. "Comprehensive" means covering all aspects completely.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The old factory, which ___ on the site since 1923, was finally demolished to make way for a new community park.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) stands',
      'B) stood',
      'C) had stood',
      'D) has stood'
    ],
    correct: 2,
    explanation: 'The factory\'s standing began in 1923 and continued until the demolition (a past event). The past perfect "had stood" correctly indicates an action that started in the past and continued up to another past event.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense Consistency'
  },
  {
    stem: 'The invention of the telegraph in the 1830s ___ communication across vast distances for the first time in human history, reducing the time needed to send a message from New York to London from weeks to minutes.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) revolutionize',
      'B) revolutionized',
      'C) has revolutionized',
      'D) is revolutionizing'
    ],
    correct: 1,
    explanation: 'The 1830s anchors the action in a specific past time. The simple past "revolutionized" correctly describes a completed historical event.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense Consistency'
  },
  {
    stem: 'Although the evidence for dark matter is ___, based entirely on gravitational effects rather than direct observation, most physicists consider its existence well established.\n\nWhich choice best completes the text?',
    choices: [
      'A) abundant',
      'B) indirect',
      'C) fabricated',
      'D) irrelevant'
    ],
    correct: 1,
    explanation: 'The passage specifies that evidence is "based entirely on gravitational effects rather than direct observation," which describes indirect evidence -- evidence inferred from effects rather than observed directly.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'A student wants to write a concluding sentence that connects the essay\'s discussion of ocean plastic pollution to a broader environmental theme.\n\nWhich choice best accomplishes this goal?',
    choices: [
      'A) Plastic pollution is a problem in many countries.',
      'B) The crisis in our oceans is ultimately a reflection of a deeper challenge: humanity\'s failure to account for the environmental costs of convenience.',
      'C) More research is needed on this topic.',
      'D) Some types of plastic are recyclable.'
    ],
    correct: 1,
    explanation: 'Option B connects the specific issue (ocean plastic) to a broader theme (environmental costs of convenience), creating a resonant concluding statement that elevates the discussion.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Synthesis'
  },
  {
    stem: 'The following passage is from a science article:\n\n"CRISPR gene-editing technology has been compared to a molecular pair of scissors, capable of cutting and modifying DNA sequences with unprecedented precision. The metaphor, while useful for general audiences, obscures the technology\'s complexity: CRISPR systems include guide RNAs that locate specific DNA sequences, Cas proteins that make the cuts, and repair templates that determine how the DNA is reassembled. Each component must function correctly, and off-target edits remain a significant concern."\n\nThe author discusses the "scissors" metaphor primarily to:',
    choices: [
      'A) argue that CRISPR should never be used.',
      'B) acknowledge a common simplification while demonstrating that the reality is more complex and nuanced.',
      'C) praise science journalism for accurately explaining technology.',
      'D) suggest that gene editing is simple enough for anyone to perform.'
    ],
    correct: 1,
    explanation: 'The author calls the metaphor "useful for general audiences" (acknowledging its value) but then explains how it "obscures the technology\'s complexity" (demonstrating the fuller picture). This is a classic move-from-simplification-to-nuance strategy.',
    domain: 'Reading & Writing',
    topic: 'Text Structure and Function'
  },
  {
    stem: 'The mountain village remained largely ___ from the outside world until a highway was built through the valley in 1975, connecting it to the nearest city for the first time.\n\nWhich choice best completes the text?',
    choices: [
      'A) isolated',
      'B) protected',
      'C) liberated',
      'D) celebrated'
    ],
    correct: 0,
    explanation: 'Being cut off "from the outside world" until a highway connected it describes isolation. "Isolated" means separated or cut off from others.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'Neither the principal nor the teachers ___ aware of the scheduling conflict until students began arriving for two different events in the same auditorium.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) was',
      'B) is',
      'C) were',
      'D) has been'
    ],
    correct: 2,
    explanation: 'With "neither...nor," the verb agrees with the nearer subject. "Teachers" is plural, so the plural verb "were" is correct.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'The researchers published their findings in a leading journal ___ they also presented the data at an international conference in Geneva.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'A) journal, they',
      'B) journal they',
      'C) journal, and they',
      'D) journal; and, they'
    ],
    correct: 2,
    explanation: 'Two independent clauses require proper joining. A comma followed by the coordinating conjunction "and" correctly connects them without creating a comma splice.',
    domain: 'Reading & Writing',
    topic: 'Comma Splices and Run-On Sentences'
  },
  {
    stem: 'The following is from a passage about food science:\n\n"The human preference for sweetness is not a cultural artifact but an evolutionary adaptation. In our ancestors\' environment, sweet tastes reliably indicated energy-rich, safe-to-eat foods like ripe fruit. The problem is that this once-adaptive preference now operates in an environment saturated with manufactured sweetness -- from soda to breakfast cereal -- that our taste buds were never designed to navigate."\n\nThe author\'s argument relies on a distinction between:',
    choices: [
      'A) natural and artificial flavors.',
      'B) the environment in which a trait evolved and the modern environment in which it now operates.',
      'C) adults and children.',
      'D) healthy and unhealthy foods.'
    ],
    correct: 1,
    explanation: 'The argument hinges on the mismatch between the ancestral environment (where sweetness signaled safe, energy-rich food) and the modern environment (saturated with manufactured sweetness). This evolutionary mismatch is the core of the argument.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Analysis'
  },
  {
    stem: 'A student is writing about the benefits of mentorship programs in schools and wants to cite specific evidence of their effectiveness.\n\nWhich choice most effectively accomplishes this goal?',
    choices: [
      'A) Many schools have mentorship programs.',
      'B) Mentorship is an ancient practice dating back to Greek civilization.',
      'C) A three-year study of 500 at-risk students found that those paired with mentors had a 52% lower dropout rate and earned GPAs 0.4 points higher than non-mentored peers.',
      'D) Some students enjoy meeting with their mentors.'
    ],
    correct: 2,
    explanation: 'Option C provides specific, quantitative evidence from a substantial study, directly demonstrating the effectiveness of mentorship programs with concrete metrics.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Synthesis'
  },
  {
    stem: 'The journalist\'s account of the disaster was deliberately ___, focusing on verifiable facts and eyewitness testimony rather than speculation or emotional appeals.\n\nWhich choice best completes the text?',
    choices: [
      'A) sensational',
      'B) restrained',
      'C) dismissive',
      'D) melodramatic'
    ],
    correct: 1,
    explanation: 'Focusing on "verifiable facts and eyewitness testimony rather than speculation or emotional appeals" describes a controlled, measured approach. "Restrained" means kept under control, not excessive.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The ancient Romans developed an extensive road network that connected distant provinces to the capital. ___, the road system facilitated not only military movement but also trade, communication, and cultural exchange across the empire.\n\nWhich choice completes the text with the most logical transition?',
    choices: [
      'A) However,',
      'B) In effect,',
      'C) In contrast,',
      'D) Alternatively,'
    ],
    correct: 1,
    explanation: 'The second sentence elaborates on the impact and significance of the road network. "In effect" signals that what follows describes the practical consequence or result of what was previously stated.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'While some critics dismissed the young author\'s debut novel as overly ambitious, others praised it as a ___ work that signaled the arrival of a major literary talent.\n\nWhich choice best completes the text?',
    choices: [
      'A) derivative',
      'B) promising',
      'C) pedestrian',
      'D) formulaic'
    ],
    correct: 1,
    explanation: '"Signaled the arrival of a major literary talent" conveys a positive assessment of future potential. "Promising" means showing signs of future success, which matches this forward-looking praise.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The anthropologist argued that the ancient settlement\'s location near a river confluence was not accidental but ___, chosen deliberately for the access it provided to trade routes and fresh water.\n\nWhich choice best completes the text?',
    choices: [
      'A) arbitrary',
      'B) strategic',
      'C) coincidental',
      'D) temporary'
    ],
    correct: 1,
    explanation: '"Chosen deliberately" and "not accidental" indicate purposeful selection based on advantages. "Strategic" means carefully planned to serve a particular purpose.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'Despite the overwhelming evidence supporting the new theory, the senior researchers remained ___, insisting that additional replications were needed before they would accept the findings.\n\nWhich choice best completes the text?',
    choices: [
      'A) enthusiastic',
      'B) indifferent',
      'C) skeptical',
      'D) supportive'
    ],
    correct: 2,
    explanation: 'Insisting on additional replications despite "overwhelming evidence" suggests doubt and caution. "Skeptical" means having reservations or doubts about a claim.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The architect ___ the original blueprints extensively, incorporating feedback from the community to create a design that better reflected the neighborhood\'s cultural heritage.\n\nWhich choice best completes the text?',
    choices: [
      'A) preserved',
      'B) discarded',
      'C) revised',
      'D) ignored'
    ],
    correct: 2,
    explanation: '"Incorporating feedback" and creating a design that "better reflected" the heritage implies changes were made to improve the original. "Revised" means altered or amended.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The documentary filmmaker\'s approach was notably ___: rather than narrating events, she allowed her subjects to tell their own stories in their own words, intervening only to provide essential historical context.\n\nWhich choice best completes the text?',
    choices: [
      'A) intrusive',
      'B) restrained',
      'C) aggressive',
      'D) confrontational'
    ],
    correct: 1,
    explanation: 'Allowing subjects to speak for themselves and "intervening only" for essential context indicates a hands-off approach. "Restrained" means holding back, exercising self-control.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'When Marco Polo returned from his travels in Asia, many Europeans found his accounts of the wealth and sophistication of the Mongol Empire to be ___; his descriptions of paper money, coal heating, and postal systems seemed too extraordinary to be true.\n\nWhich choice best completes the text?',
    choices: [
      'A) plausible',
      'B) mundane',
      'C) implausible',
      'D) inspirational'
    ],
    correct: 2,
    explanation: '"Too extraordinary to be true" indicates that the descriptions seemed unbelievable. "Implausible" means seeming unreasonable or unlikely to be true.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The committee ___ its findings in a 200-page report that detailed every aspect of the investigation, from witness interviews to forensic analysis.\n\nWhich choice best completes the text?',
    choices: [
      'A) concealed',
      'B) summarized',
      'C) documented',
      'D) disputed'
    ],
    correct: 2,
    explanation: 'A 200-page report that "detailed every aspect" describes comprehensive recording. "Documented" means recorded in detail.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The economic downturn of the 1930s had a ___ effect on the American workforce: by 1933, approximately 25% of workers were unemployed, and millions more had seen their wages cut dramatically.\n\nWhich choice best completes the text?',
    choices: [
      'A) negligible',
      'B) devastating',
      'C) temporary',
      'D) beneficial'
    ],
    correct: 1,
    explanation: '25% unemployment and dramatic wage cuts indicate severe negative impact. "Devastating" means highly destructive or damaging.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The novelist\'s protagonist, a war veteran struggling to readjust to civilian life, ___ through each day with a sense of detachment, unable to find meaning in the routines that had once brought her comfort.\n\nWhich choice best completes the text?',
    choices: [
      'A) raced',
      'B) drifted',
      'C) charged',
      'D) celebrated'
    ],
    correct: 1,
    explanation: '"Detachment" and inability to find meaning suggest aimless, passive movement through life. "Drifted" conveys moving without purpose or direction.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'In a study of coral reef ecosystems, marine biologists found that the relationship between clownfish and sea anemones is ___: the clownfish receives protection from predators among the anemone\'s stinging tentacles, while the anemone benefits from the nutrients in the clownfish\'s waste.\n\nWhich choice best completes the text?',
    choices: [
      'A) parasitic',
      'B) mutualistic',
      'C) competitive',
      'D) predatory'
    ],
    correct: 1,
    explanation: 'Both organisms benefit from the relationship -- the clownfish gets protection and the anemone gets nutrients. "Mutualistic" describes a relationship where both parties benefit.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'Although the CEO\'s restructuring plan was initially met with resistance from employees, the company\'s improved financial performance in the following quarters ___ even the most vocal critics.\n\nWhich choice best completes the text?',
    choices: [
      'A) angered',
      'B) vindicated',
      'C) confused',
      'D) silenced'
    ],
    correct: 3,
    explanation: 'Improved performance despite initial resistance means critics\' concerns proved unfounded. "Silenced" means rendered unable to continue objecting, as the results spoke for themselves.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The dancer\'s movements were ___, each gesture flowing seamlessly into the next without any visible effort or hesitation.\n\nWhich choice best completes the text?',
    choices: [
      'A) rigid',
      'B) fluid',
      'C) abrupt',
      'D) mechanical'
    ],
    correct: 1,
    explanation: '"Flowing seamlessly" and "without any visible effort" describe smooth, graceful movement. "Fluid" means smooth and elegant, flowing without interruption.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The council members ___ voted to approve the new zoning regulations; however, several members privately expressed concerns about the potential impact on small businesses in the area.\n\nWhich choice best completes the text?',
    choices: [
      'A) reluctantly',
      'B) unanimously',
      'C) enthusiastically',
      'D) hastily'
    ],
    correct: 1,
    explanation: 'The contrast "however, several members privately expressed concerns" suggests that while the vote passed without opposition, there were hidden reservations. "Unanimously" means with the agreement of all.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The professor emphasized that the students\' essays should present arguments that ___ are supported by evidence rather than relying on personal anecdotes or emotional appeals.\n\nWhich choice best completes the text?',
    choices: [
      'A) are supported',
      'B) were supporting',
      'C) have been supported',
      'D) will have supported'
    ],
    correct: 0,
    explanation: 'The sentence describes a general expectation (present tense). "Are supported" is the correct present passive form to match the ongoing requirement.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense and Form'
  },
  {
    stem: 'By the time the rescue team arrived at the remote village, the floodwaters ___ already receded, leaving behind a landscape of mud and debris.\n\nWhich choice best completes the text?',
    choices: [
      'A) have',
      'B) had',
      'C) will have',
      'D) would'
    ],
    correct: 1,
    explanation: 'The receding happened before the team arrived (a past event). "Had receded" (past perfect) correctly indicates an action completed before another past action.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense and Form'
  },
  {
    stem: 'The migrating birds, which travel thousands of miles each autumn, ___ on the same coastal wetlands that their ancestors used centuries ago.\n\nWhich choice best completes the text?',
    choices: [
      'A) relies',
      'B) rely',
      'C) relying',
      'D) has relied'
    ],
    correct: 1,
    explanation: 'The subject is "birds" (plural). The non-essential clause "which travel..." does not change the subject. The plural verb "rely" agrees with "birds."',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'Neither the director nor the producers ___ willing to compromise on the film\'s ending, which led to months of tense negotiations.\n\nWhich choice best completes the text?',
    choices: [
      'A) was',
      'B) were',
      'C) is',
      'D) has been'
    ],
    correct: 1,
    explanation: 'With "neither...nor," the verb agrees with the nearer subject. "Producers" is plural, so the plural verb "were" is correct.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'The company announced its quarterly earnings on Tuesday. ___ the stock price dropped by 8% in after-hours trading as investors reacted to lower-than-expected revenue.\n\nWhich choice best completes the text?',
    choices: [
      'A) Furthermore,',
      'B) Consequently,',
      'C) Nevertheless,',
      'D) Similarly,'
    ],
    correct: 1,
    explanation: 'The stock price dropping is a direct result of the disappointing earnings announcement. "Consequently" signals a cause-and-effect relationship.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'The tropical storm caused widespread flooding in the southern parishes. ___ the northern parishes experienced record drought conditions during the same period.\n\nWhich choice best completes the text?',
    choices: [
      'A) Similarly,',
      'B) In contrast,',
      'C) As a result,',
      'D) Moreover,'
    ],
    correct: 1,
    explanation: 'Flooding in one area and drought in another are opposing conditions. "In contrast" signals a clear difference between two situations.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'The ancient Egyptians developed sophisticated irrigation systems that allowed them to farm the otherwise arid land along the Nile. ___ they created a complex bureaucracy to manage water distribution during the annual floods.\n\nWhich choice best completes the text?',
    choices: [
      'A) However,',
      'B) In addition,',
      'C) In contrast,',
      'D) Nevertheless,'
    ],
    correct: 1,
    explanation: 'Creating a bureaucracy to manage water is an additional development that supplements the irrigation systems. "In addition" signals supplementary information.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'A literary scholar is writing about Emily Dickinson\'s poetry and wants to emphasize how Dickinson\'s reclusive lifestyle influenced her work.\n\nWhich choice most effectively uses relevant information to accomplish this goal?',
    choices: [
      'A) Emily Dickinson lived in Massachusetts during the 19th century.',
      'B) Dickinson\'s increasing withdrawal from social life allowed her to develop an intensely private poetic vision, producing nearly 1,800 poems that explored death, immortality, and the interior landscape of the mind.',
      'C) Many poets have lived unconventional lives.',
      'D) Dickinson\'s poems were mostly published after her death.'
    ],
    correct: 1,
    explanation: 'B directly connects the reclusive lifestyle ("withdrawal from social life") to its influence on her work ("intensely private poetic vision" exploring specific themes).',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Synthesis'
  },
  {
    stem: 'A student is writing about the impact of microplastics on marine ecosystems and wants to convey the scale of the problem.\n\nWhich choice most effectively accomplishes this goal?',
    choices: [
      'A) Microplastics are small pieces of plastic less than 5 millimeters long.',
      'B) Scientists estimate that there are over 170 trillion microplastic particles floating in the world\'s oceans, a number that has tripled in the past two decades and continues to grow as plastic production accelerates.',
      'C) Some people recycle their plastic waste.',
      'D) Marine ecosystems are important for biodiversity.'
    ],
    correct: 1,
    explanation: 'B conveys scale through specific numbers (170 trillion, tripled, two decades) and the ongoing nature of the problem (continues to grow), effectively communicating the magnitude.',
    domain: 'Reading & Writing',
    topic: 'Rhetorical Synthesis'
  },
  {
    stem: 'A researcher studying sleep patterns in adolescents found that teenagers who used electronic devices within one hour of bedtime took an average of 28 minutes longer to fall asleep than those who avoided screens before bed. The researcher concluded that screen exposure before bed disrupts the natural sleep cycle by suppressing melatonin production.\n\nWhich finding, if true, would most directly weaken the researcher\'s conclusion?',
    choices: [
      'A) Teenagers who used screens before bed also consumed more caffeine on average.',
      'B) The study was conducted over a six-month period.',
      'C) Melatonin supplements are available over the counter.',
      'D) Some teenagers in the study used screens for homework rather than entertainment.'
    ],
    correct: 0,
    explanation: 'If screen users also consumed more caffeine, the delayed sleep onset might be caused by caffeine rather than screen exposure, undermining the causal link between screens and melatonin suppression.',
    domain: 'Reading & Writing',
    topic: 'Central Ideas and Details'
  },
  {
    stem: 'The paintings of Frida Kahlo, ___ often feature vivid depictions of physical and emotional pain, have been praised for their unflinching honesty and psychological depth.',
    choices: [
      'A) which',
      'B) that',
      'C) who',
      'D) whom'
    ],
    correct: 0,
    explanation: 'The clause "often feature vivid depictions" provides non-essential additional information about the paintings. "Which" is correct for non-essential clauses referring to things.',
    domain: 'Reading & Writing',
    topic: 'Non-Essential Clauses'
  },
  {
    stem: 'The city\'s annual jazz festival, ___ draws more than 50,000 visitors each summer, has become a significant source of revenue for local businesses.\n\nWhich choice best completes the text?',
    choices: [
      'A) that',
      'B) which',
      'C) who',
      'D) where'
    ],
    correct: 1,
    explanation: 'The clause adds non-essential information about the festival (already identified as "the city\'s annual jazz festival"). Non-essential clauses use "which" with commas.',
    domain: 'Reading & Writing',
    topic: 'Non-Essential Clauses'
  },
  {
    stem: 'The Great Barrier Reef, the world\'s largest coral reef system, ___ visible from outer space.\n\nWhich choice best completes the text?',
    choices: [
      'A) are',
      'B) is',
      'C) were',
      'D) have been'
    ],
    correct: 1,
    explanation: 'The subject is "The Great Barrier Reef" (singular). The appositive "the world\'s largest coral reef system" does not change the singular subject. "Is" is the correct singular verb.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'In her groundbreaking 1962 book Silent Spring, Rachel Carson warned that the widespread use of pesticides ___ irreversible damage to ecosystems and human health.\n\nWhich choice best completes the text?',
    choices: [
      'A) is causing',
      'B) was causing',
      'C) will cause',
      'D) had been causing'
    ],
    correct: 1,
    explanation: 'The sentence describes what Carson warned about in 1962, so past tense is appropriate. "Was causing" correctly describes an ongoing action in the past context of 1962.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense and Form'
  },
  {
    stem: 'Researchers have found that children who regularly read for pleasure ___ larger vocabularies and stronger reading comprehension skills than their peers who read only for school assignments.\n\nWhich choice best completes the text?',
    choices: [
      'A) develops',
      'B) develop',
      'C) developing',
      'D) has developed'
    ],
    correct: 1,
    explanation: 'The subject is "children" (plural), modified by the essential clause "who regularly read for pleasure." The plural verb "develop" agrees with "children."',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'The new public transit system, despite its higher-than-expected construction costs, ___ widely regarded as a worthwhile investment in the city\'s future.\n\nWhich choice best completes the text?',
    choices: [
      'A) are',
      'B) is',
      'C) were',
      'D) have been'
    ],
    correct: 1,
    explanation: 'The subject is "system" (singular). The phrase "despite its higher-than-expected construction costs" is parenthetical and does not change the singular subject. "Is" is correct.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
  {
    stem: 'Text 1 argues that space exploration drives technological innovation that benefits everyday life, citing GPS, memory foam, and water purification systems as examples of NASA spinoff technologies. Text 2 contends that the billions spent on space programs could be more effectively used to address pressing problems on Earth, such as poverty and climate change.\n\nWhich statement best describes the relationship between the two texts?',
    choices: [
      'A) Text 2 directly refutes the specific examples cited in Text 1.',
      'B) The texts agree on the benefits of space exploration but differ on funding levels.',
      'C) The texts present competing frameworks for evaluating how public funds should be allocated.',
      'D) Text 1 is about technology while Text 2 is about politics.'
    ],
    correct: 2,
    explanation: 'Text 1 evaluates space spending through the lens of innovation benefits, while Text 2 evaluates it through the lens of opportunity costs. They fundamentally disagree about how to prioritize public spending.',
    domain: 'Reading & Writing',
    topic: 'Cross-Text Connections'
  },
  {
    stem: 'A passage describes the construction of the Panama Canal, noting that while earlier French efforts failed due to tropical diseases and engineering challenges, the American-led project succeeded in part because of advances in disease prevention, particularly the control of mosquitoes carrying malaria and yellow fever.\n\nWhich choice best states the main idea?',
    choices: [
      'A) The Panama Canal was expensive to build.',
      'B) The success of the Panama Canal project depended not only on engineering but also on medical advances that addressed the health crises that had defeated earlier attempts.',
      'C) French engineers were less skilled than American engineers.',
      'D) Mosquitoes are dangerous insects.'
    ],
    correct: 1,
    explanation: 'The passage highlights how disease prevention was a crucial factor in the canal\'s completion, suggesting that medical advances were as important as engineering in overcoming earlier failures.',
    domain: 'Reading & Writing',
    topic: 'Central Ideas and Details'
  },
  {
    stem: 'The professor noted that while the students\' research methodologies were sound, their conclusions ___ beyond what the data could support.\n\nWhich choice best completes the text?',
    choices: [
      'A) extends',
      'B) extended',
      'C) extending',
      'D) has extended'
    ],
    correct: 1,
    explanation: 'The sentence describes a past observation by the professor. "Extended" is the correct past tense verb to match "noted" in the main clause. The subject "conclusions" is plural, but "extended" works for both singular and plural in past tense.',
    domain: 'Reading & Writing',
    topic: 'Verb Tense and Form'
  },
  {
    stem: 'The landscape architect designed the park to serve multiple functions: a playground for children, walking paths for exercise, and community gardens for neighborhood residents. ___ she incorporated native plants throughout the design to support local pollinators.\n\nWhich choice best completes the text?',
    choices: [
      'A) However,',
      'B) In contrast,',
      'C) Additionally,',
      'D) Nevertheless,'
    ],
    correct: 2,
    explanation: 'Native plants for pollinators are an additional feature that supplements the other design elements. "Additionally" signals supplementary information in the same direction.',
    domain: 'Reading & Writing',
    topic: 'Transitions'
  },
  {
    stem: 'The treaty\'s provisions were deliberately ___, allowing each signatory nation to interpret its obligations in light of its own domestic priorities.\n\nWhich choice best completes the text?',
    choices: [
      'A) rigid',
      'B) specific',
      'C) ambiguous',
      'D) transparent'
    ],
    correct: 2,
    explanation: 'If each nation could interpret its obligations according to its own priorities, the language must have been open to multiple interpretations. "Ambiguous" means open to more than one interpretation.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The journalist\'s investigation revealed that the pharmaceutical company had ___ the results of its clinical trials, reporting only favorable outcomes while suppressing data that showed harmful side effects.\n\nWhich choice best completes the text?',
    choices: [
      'A) published',
      'B) replicated',
      'C) misrepresented',
      'D) validated'
    ],
    correct: 2,
    explanation: 'Reporting only favorable outcomes and suppressing unfavorable data constitutes a distortion of the truth. "Misrepresented" means gave a false or misleading account of.',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'The city\'s decision to convert abandoned lots into community gardens was met with ___ from residents who had long complained about the blight but doubted the government\'s follow-through.\n\nWhich choice best completes the text?',
    choices: [
      'A) indifference',
      'B) hostility',
      'C) cautious optimism',
      'D) overwhelming enthusiasm'
    ],
    correct: 2,
    explanation: 'The residents wanted change (complained about blight) but had doubts (questioned follow-through). This combination of hope and hesitation is best described as "cautious optimism."',
    domain: 'Reading & Writing',
    topic: 'Vocabulary in Context'
  },
  {
    stem: 'Although modern concrete structures typically last about 50 to 100 years, ancient Roman concrete, ___ in structures like the Pantheon, has endured for nearly two millennia.\n\nWhich choice best completes the text?',
    choices: [
      'A) using',
      'B) used',
      'C) having used',
      'D) to use'
    ],
    correct: 1,
    explanation: 'The concrete was used by others (passive meaning). "Used" functions as a past participle meaning "which was used," correctly modifying "ancient Roman concrete."',
    domain: 'Reading & Writing',
    topic: 'Verb Tense and Form'
  },
  {
    stem: 'The novel\'s narrator, ___ reliability the reader comes to question as the story unfolds, presents a version of events that conflicts sharply with testimony given by other characters.\n\nWhich choice best completes the text?',
    choices: [
      'A) who\'s',
      'B) whose',
      'C) which',
      'D) whom'
    ],
    correct: 1,
    explanation: '"Whose" is the possessive form needed here to show that the reliability belongs to the narrator. "Who\'s" means "who is," "which" refers to things, and "whom" is an object pronoun.',
    domain: 'Reading & Writing',
    topic: 'Pronoun Usage'
  },
  {
    stem: 'The researchers concluded that the decline in bee populations ___ primarily attributable to the widespread use of neonicotinoid pesticides, though habitat loss and climate change also played significant roles.\n\nWhich choice best completes the text?',
    choices: [
      'A) were',
      'B) was',
      'C) are',
      'D) have been'
    ],
    correct: 1,
    explanation: 'The subject is "decline" (singular). The verb must agree with this singular subject. Since the researchers "concluded" (past tense), "was" is the correct past tense singular verb.',
    domain: 'Reading & Writing',
    topic: 'Subject-Verb Agreement'
  },
];
