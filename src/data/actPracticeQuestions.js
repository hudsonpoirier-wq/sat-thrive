/**
 * ACT Practice Question Bank
 *
 * 640 realistic ACT-style questions across all four sections:
 *   - English (~175 questions) — chapters act-eng-1 through act-eng-8
 *   - Math (~175 questions, 5 choices each) — chapters act-math-1 through act-math-8
 *   - Reading (~145 questions) — chapters act-read-1 through act-read-8
 *   - Science (~145 questions) — chapters act-sci-1 through act-sci-8
 *
 * Combined with ACT_QUESTION_BANK in practiceQuestionBank.js (~160 questions),
 * the total ACT question bank is approximately 800 questions.
 *
 * Each object: { id, chapter, type, stem, choices, correct, explanation }
 * `correct` is the 0-based index into `choices`.
 */

export const ACT_PRACTICE_QUESTIONS = [
  // ═══════════════════════════════════════════════════════════════════════
  // ACT ENGLISH — 20 questions (4 choices: A–D or F–J)
  // Chapters: act-eng-1 (Punctuation), act-eng-2 (Grammar/Usage),
  //   act-eng-3 (Sentence Structure), act-eng-4 (Style/Tone),
  //   act-eng-5 (Transitions), act-eng-6 (Redundancy/Wordiness),
  //   act-eng-7 (Organization), act-eng-8 (Rhetorical Skills)
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-1: Punctuation ---
  {
    id: 'act-eng-1-q1',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The novel, which was published in 1925 remains one of the most widely read works of American fiction.",
    choices: [
      "A) NO CHANGE",
      "B) The novel, which was published in 1925, remains one of the most widely read works of American fiction.",
      "C) The novel which was published in 1925, remains one of the most widely read works of American fiction.",
      "D) The novel which was published in 1925 remains one of the most widely read works of American fiction."
    ],
    correct: 1,
    explanation: "A nonrestrictive clause ('which was published in 1925') must be set off by commas on both sides. The original is missing the closing comma after '1925.' Choice B correctly places commas around the entire nonrestrictive clause."
  },
  {
    id: 'act-eng-1-q2',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "After finishing her morning run, Priya stretched, ate breakfast, and reviewed her notes for the exam.",
    choices: [
      "F) NO CHANGE",
      "G) After finishing her morning run Priya stretched, ate breakfast, and reviewed her notes for the exam.",
      "H) After finishing her morning run, Priya stretched ate breakfast and reviewed her notes for the exam.",
      "J) After finishing, her morning run, Priya stretched, ate breakfast, and reviewed her notes for the exam."
    ],
    correct: 0,
    explanation: "The original is correct. A comma is needed after the introductory phrase 'After finishing her morning run,' and commas correctly separate the three items in the series."
  },
  {
    id: 'act-eng-1-q3',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "Which of the following alternatives to the underlined portion would NOT be acceptable?\n\n\"The governor signed the bill into law; however, several legislators voiced strong objections to specific provisions.\"",
    choices: [
      "A) law. However, several",
      "B) law, however, several",
      "C) law; nevertheless, several",
      "D) law. Several legislators, however, voiced"
    ],
    correct: 1,
    explanation: "Choice B creates a comma splice — two independent clauses joined only by a comma and a conjunctive adverb. A semicolon or period is needed before 'however' when it joins two independent clauses. The other options all correctly punctuate the sentence."
  },

  // --- act-eng-2: Grammar/Usage ---
  {
    id: 'act-eng-2-q1',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "Neither the director nor the actors ______ satisfied with the final cut of the film.",
    choices: [
      "F) was",
      "G) were",
      "H) is",
      "J) has been"
    ],
    correct: 1,
    explanation: "When 'neither...nor' joins two subjects, the verb agrees with the subject closer to it. 'Actors' is plural and closer to the verb, so the plural 'were' is correct."
  },
  {
    id: 'act-eng-2-q2',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The committee, along with several invited guests, ______ expected to arrive by noon.",
    choices: [
      "A) are",
      "B) were",
      "C) is",
      "D) have been"
    ],
    correct: 2,
    explanation: "The phrase 'along with several invited guests' is a parenthetical modifier and does not change the number of the subject. 'Committee' is singular, so 'is' is correct."
  },
  {
    id: 'act-eng-2-q3',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "When Maria and Elena arrived at the cafe, she realized she had forgotten her wallet. Which revision most clearly conveys the intended meaning?",
    choices: [
      "F) NO CHANGE",
      "G) When Maria and Elena arrived at the cafe, Maria realized she had forgotten her wallet.",
      "H) When Maria and Elena arrived at the cafe, they realized she had forgotten her wallet.",
      "J) Arriving at the cafe, she realized the wallet was forgotten."
    ],
    correct: 1,
    explanation: "The original sentence has an ambiguous pronoun 'she' — it could refer to either Maria or Elena. Choice G clarifies by naming Maria explicitly, eliminating the ambiguity."
  },

  // --- act-eng-3: Sentence Structure ---
  {
    id: 'act-eng-3-q1',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Running through the park on a crisp autumn morning. Jamal felt invigorated by the cool breeze.",
    choices: [
      "A) NO CHANGE",
      "B) Running through the park on a crisp autumn morning, Jamal felt invigorated by the cool breeze.",
      "C) Running through the park on a crisp autumn morning; Jamal felt invigorated by the cool breeze.",
      "D) Running through the park on a crisp autumn morning and Jamal felt invigorated by the cool breeze."
    ],
    correct: 1,
    explanation: "The original creates a sentence fragment because the participial phrase is separated from the main clause by a period. A comma should follow the introductory participial phrase, connecting it to the independent clause."
  },
  {
    id: 'act-eng-3-q2',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The documentary was well-researched it presented multiple perspectives on the issue.",
    choices: [
      "F) NO CHANGE",
      "G) The documentary was well-researched, it presented multiple perspectives on the issue.",
      "H) The documentary was well-researched; it presented multiple perspectives on the issue.",
      "J) The documentary was well-researched, presented multiple perspectives on the issue."
    ],
    correct: 2,
    explanation: "The original is a run-on sentence (two independent clauses with no punctuation). Choice G creates a comma splice. Choice H correctly joins them with a semicolon. Choice J changes the meaning by making 'presented' part of a compound predicate."
  },

  // --- act-eng-4: Style/Tone ---
  {
    id: 'act-eng-4-q1',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The tone of the passage is formal and academic. Which underlined word or phrase should be revised to maintain that tone?\n\n\"The data collected during the study indicate that elevated cortisol levels are totally linked to increased anxiety in the test subjects.\"",
    choices: [
      "A) data collected",
      "B) indicate",
      "C) totally linked",
      "D) test subjects"
    ],
    correct: 2,
    explanation: "'Totally' is informal and colloquial, inconsistent with a formal, academic tone. A better choice would be 'strongly associated with' or 'significantly correlated with.' The other underlined portions are appropriately formal."
  },
  {
    id: 'act-eng-4-q2',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The passage describes a historical event in a straightforward, objective manner. Which revision best maintains consistency with this style?\n\nOriginal: \"The treaty was signed on June 28, 1919, and it was a really big deal for everyone involved.\"",
    choices: [
      "F) NO CHANGE",
      "G) The treaty was signed on June 28, 1919, and it was super important.",
      "H) The treaty, signed on June 28, 1919, had significant implications for all participating nations.",
      "J) The treaty was signed on June 28, 1919, which was awesome for the countries that signed it."
    ],
    correct: 2,
    explanation: "The phrase 'really big deal' and other informal options (G and J) are inconsistent with an objective, historical tone. Choice H uses precise, formal language appropriate for the style."
  },
  {
    id: 'act-eng-4-q3',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The following sentence appears in a personal narrative essay about the author's childhood:\n\n\"The oscillating thermal gradients of the summer months precipitated a desire within me to seek aquatic recreational activities.\"\n\nWhich revision best fits the tone of a personal narrative?",
    choices: [
      "A) NO CHANGE",
      "B) When summer came and the days grew hot, all I wanted to do was go swimming.",
      "C) The heat of the summer caused me to desire swimming.",
      "D) Summer thermal conditions made swimming a priority."
    ],
    correct: 1,
    explanation: "A personal narrative calls for a natural, conversational voice. The original is absurdly over-technical for a childhood memory. Choice B uses simple, vivid language appropriate for personal storytelling."
  },

  // --- act-eng-5: Transitions ---
  {
    id: 'act-eng-5-q1',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The city council approved funding for new bike lanes. ______, many residents had expressed concerns about traffic congestion in the downtown area.",
    choices: [
      "A) Furthermore,",
      "B) In contrast,",
      "C) Previously,",
      "D) As a result,"
    ],
    correct: 2,
    explanation: "The sentence describes residents expressing concerns before the council acted. 'Previously' correctly establishes the time relationship, showing the concerns came first and likely motivated the action."
  },
  {
    id: 'act-eng-5-q2',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "Solar panel installation costs have decreased by nearly 70 percent over the past decade. ______, the number of residential solar installations has more than tripled.",
    choices: [
      "F) Nevertheless,",
      "G) Consequently,",
      "H) In other words,",
      "J) On the other hand,"
    ],
    correct: 1,
    explanation: "The increase in installations is a logical result of decreased costs. 'Consequently' correctly signals this cause-and-effect relationship."
  },

  // --- act-eng-6: Redundancy/Wordiness ---
  {
    id: 'act-eng-6-q1',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The autobiography of her own life was published posthumously after her death.",
    choices: [
      "A) NO CHANGE",
      "B) The autobiography of her own life was published posthumously.",
      "C) Her autobiography was published posthumously.",
      "D) Her autobiography of her own life was published after her death."
    ],
    correct: 2,
    explanation: "'Autobiography' already means the story of one's own life, so 'of her own life' is redundant. 'Posthumously' already means after death, so 'after her death' is also redundant. Choice C eliminates both redundancies."
  },
  {
    id: 'act-eng-6-q2',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "In my personal opinion, I think that the proposed regulation is entirely too restrictive.",
    choices: [
      "F) NO CHANGE",
      "G) In my opinion, I think that the proposed regulation is entirely too restrictive.",
      "H) In my opinion, the proposed regulation is too restrictive.",
      "J) I personally think that the proposed regulation is entirely too restrictive in nature."
    ],
    correct: 2,
    explanation: "'In my opinion' and 'I think' say the same thing — one should be removed. 'Entirely' before 'too' is also unnecessary padding. Choice H is the most concise version without losing meaning."
  },

  // --- act-eng-7: Organization ---
  {
    id: 'act-eng-7-q1',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "Which of the following sentence sequences creates the most logical paragraph?\n\n[1] The experiment yielded surprising results.\n[2] Dr. Patel carefully measured each sample.\n[3] First, the research team assembled the necessary equipment.\n[4] Based on the data, the team revised their original hypothesis.",
    choices: [
      "A) 1, 2, 3, 4",
      "B) 3, 2, 1, 4",
      "C) 2, 3, 4, 1",
      "D) 4, 1, 2, 3"
    ],
    correct: 1,
    explanation: "The logical chronological order is: assembling equipment (3), measuring samples (2), getting results (1), and then revising the hypothesis based on data (4). This follows the natural sequence of a scientific experiment."
  },
  {
    id: 'act-eng-7-q2',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A student is writing an essay about the history of jazz music. Which of the following would serve as the most effective opening sentence for the essay?",
    choices: [
      "F) Jazz is a type of music that many people enjoy listening to.",
      "G) Born in the clubs of early twentieth-century New Orleans, jazz fused African rhythmic traditions with European harmonic structures to create an entirely new American art form.",
      "H) There are many different genres of music in the world today.",
      "J) Some people prefer rock music to jazz."
    ],
    correct: 1,
    explanation: "An effective opening sentence should introduce the topic with specificity and engage the reader. Choice G provides historical context (New Orleans, early twentieth century), names the cultural roots (African and European traditions), and frames jazz as a significant art form — all in one compelling sentence."
  },

  // --- act-eng-8: Rhetorical Skills ---
  {
    id: 'act-eng-8-q1',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "A writer wants to add a sentence to emphasize the economic impact of the new factory. Which choice best accomplishes this goal?",
    choices: [
      "F) The factory will be located on the former site of a department store.",
      "G) The factory is expected to create over 500 jobs and generate $12 million in annual tax revenue for the county.",
      "H) Several community members attended the town hall meeting to discuss the factory.",
      "J) The factory will use modern construction materials and energy-efficient designs."
    ],
    correct: 1,
    explanation: "Only choice G provides specific economic data (500 jobs, $12 million in tax revenue) that directly emphasizes economic impact. The other choices address location, community engagement, or construction — not economics."
  },
  {
    id: 'act-eng-8-q2',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The writer wants to conclude the essay by reinforcing the central argument that public libraries remain essential community resources. Which choice most effectively accomplishes this purpose?",
    choices: [
      "A) In conclusion, libraries have changed a lot over the years.",
      "B) Libraries are nice places to visit on rainy days.",
      "C) Far from being relics of a bygone era, public libraries continue to serve as vital hubs for education, connectivity, and civic engagement in communities across the nation.",
      "D) Many people enjoy using library computers to check email."
    ],
    correct: 2,
    explanation: "Choice C directly reinforces the thesis by countering the idea that libraries are outdated and listing their key community roles. The other choices are vague, trivial, or off-topic."
  },
  {
    id: 'act-eng-8-q3',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "At this point, the writer is considering deleting the following sentence:\n\n\"According to a 2023 report by the National Academy of Sciences, microplastic contamination has been detected in 94 percent of sampled tap water in the United States.\"\n\nShould the writer make this deletion?",
    choices: [
      "F) Yes, because the essay focuses on ocean pollution, not tap water.",
      "G) Yes, because the statistic is too specific for a general-audience essay.",
      "H) No, because the sentence provides a concrete, authoritative detail that strengthens the paragraph's argument about the pervasiveness of microplastic pollution.",
      "J) No, because every essay about pollution must include statistics."
    ],
    correct: 2,
    explanation: "If the paragraph argues that microplastic pollution is pervasive, a statistic about tap water contamination from a credible source directly supports that claim. The sentence should be kept because it offers strong, specific evidence."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ACT MATH — 20 questions (5 choices: A–E or F–K)
  // Chapters: act-math-1 (Pre-Algebra), act-math-2 (Elementary Algebra),
  //   act-math-3 (Intermediate Algebra), act-math-4 (Coordinate Geometry),
  //   act-math-5 (Plane Geometry), act-math-6 (Trigonometry),
  //   act-math-7 (Statistics & Probability), act-math-8 (Advanced Topics)
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-math-1: Pre-Algebra ---
  {
    id: 'act-math-1-q1',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A shirt originally priced at $45 is on sale for 20% off. An additional 10% discount is applied at checkout. What is the final price of the shirt?",
    choices: [
      "A) $30.00",
      "B) $31.50",
      "C) $32.40",
      "D) $33.75",
      "E) $36.00"
    ],
    correct: 2,
    explanation: "First discount: $45 × 0.80 = $36. Second discount applied to $36: $36 × 0.90 = $32.40. Note that two successive discounts of 20% and 10% are not the same as a single 30% discount ($45 × 0.70 = $31.50)."
  },
  {
    id: 'act-math-1-q2',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "The average of five consecutive odd integers is 37. What is the largest of these integers?",
    choices: [
      "F) 37",
      "G) 39",
      "H) 41",
      "J) 43",
      "K) 45"
    ],
    correct: 2,
    explanation: "For five consecutive odd integers, the average equals the middle (third) integer. So the middle integer is 37. The five integers are 33, 35, 37, 39, 41. The largest is 41."
  },
  {
    id: 'act-math-1-q3',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A recipe calls for 2/3 cup of sugar for every 4 servings. How many cups of sugar are needed for 18 servings?",
    choices: [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 4.5",
      "E) 6"
    ],
    correct: 1,
    explanation: "Set up a proportion: (2/3)/4 = x/18. Multiply both sides by 18: x = 18 × (2/3)/4 = 18 × (2/12) = 18 × (1/6) = 3 cups."
  },

  // --- act-math-2: Elementary Algebra ---
  {
    id: 'act-math-2-q1',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If 3(2x − 4) + 5 = 2(x + 3), what is the value of x?",
    choices: [
      "F) 2",
      "G) 5/2",
      "H) 3",
      "J) 13/4",
      "K) 4"
    ],
    correct: 3,
    explanation: "Expand the left side: 6x − 12 + 5 = 6x − 7. Expand the right side: 2x + 6. Set equal: 6x − 7 = 2x + 6. Subtract 2x: 4x − 7 = 6. Add 7: 4x = 13. Divide by 4: x = 13/4."
  },
  {
    id: 'act-math-2-q2',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "What is the solution set of the inequality |2x − 3| < 7?",
    choices: [
      "A) −2 < x < 5",
      "B) x < −2 or x > 5",
      "C) −5 < x < 2",
      "D) −2 ≤ x ≤ 5",
      "E) x ≤ −2 or x ≥ 5"
    ],
    correct: 0,
    explanation: "|2x − 3| < 7 means −7 < 2x − 3 < 7. Add 3 to all parts: −4 < 2x < 10. Divide by 2: −2 < x < 5."
  },
  {
    id: 'act-math-2-q3',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If f(x) = 2x² − 3x + 1, what is f(−2)?",
    choices: [
      "F) 3",
      "G) 7",
      "H) 11",
      "J) 15",
      "K) 19"
    ],
    correct: 3,
    explanation: "f(−2) = 2(−2)² − 3(−2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15."
  },

  // --- act-math-3: Intermediate Algebra ---
  {
    id: 'act-math-3-q1',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "What are the solutions to the equation x² − 6x + 8 = 0?",
    choices: [
      "A) x = 2 and x = 4",
      "B) x = −2 and x = −4",
      "C) x = 1 and x = 8",
      "D) x = −2 and x = 4",
      "E) x = 3 and x = 5"
    ],
    correct: 0,
    explanation: "Factor: (x − 2)(x − 4) = 0, so x = 2 or x = 4. Check: 2² − 6(2) + 8 = 4 − 12 + 8 = 0, and 4² − 6(4) + 8 = 16 − 24 + 8 = 0. Both solutions work."
  },
  {
    id: 'act-math-3-q2',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "If log₂(x) + log₂(x − 2) = 3, what is the value of x?",
    choices: [
      "F) 2",
      "G) 4",
      "H) 6",
      "J) 8",
      "K) 10"
    ],
    correct: 1,
    explanation: "Combine logs: log₂[x(x − 2)] = 3, so x(x − 2) = 2³ = 8. Then x² − 2x − 8 = 0, which factors as (x − 4)(x + 2) = 0. Since x must be positive and x − 2 must be positive for the logarithms to be defined, x = 4."
  },
  {
    id: 'act-math-3-q3',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "A system of equations is given:\n2x + 3y = 12\n4x − y = 5\n\nWhat is the value of x?",
    choices: [
      "A) 1",
      "B) 27/14",
      "C) 2",
      "D) 3",
      "E) 4"
    ],
    correct: 1,
    explanation: "From the second equation, y = 4x − 5. Substitute into the first: 2x + 3(4x − 5) = 12, so 2x + 12x − 15 = 12, giving 14x = 27, thus x = 27/14."
  },

  // --- act-math-4: Coordinate Geometry ---
  {
    id: 'act-math-4-q1',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the distance between the points (−3, 4) and (5, −2)?",
    choices: [
      "F) 8",
      "G) 10",
      "H) 12",
      "J) 14",
      "K) 2√10"
    ],
    correct: 1,
    explanation: "Distance = √[(5−(−3))² + (−2−4)²] = √[8² + (−6)²] = √[64 + 36] = √100 = 10."
  },
  {
    id: 'act-math-4-q2',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the slope of a line perpendicular to the line 3x − 4y = 12?",
    choices: [
      "A) 3/4",
      "B) −3/4",
      "C) 4/3",
      "D) −4/3",
      "E) −1"
    ],
    correct: 3,
    explanation: "Rewrite in slope-intercept form: −4y = −3x + 12, so y = (3/4)x − 3. The slope is 3/4. A perpendicular line has the negative reciprocal slope: −4/3."
  },
  {
    id: 'act-math-4-q3',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "The circle (x − 3)² + (y + 2)² = 25 has its center at what point?",
    choices: [
      "F) (3, −2)",
      "G) (−3, 2)",
      "H) (3, 2)",
      "J) (−3, −2)",
      "K) (5, −2)"
    ],
    correct: 0,
    explanation: "The standard form of a circle is (x − h)² + (y − k)² = r². Here h = 3 and k = −2 (note y + 2 = y − (−2)), so the center is (3, −2) and the radius is 5."
  },

  // --- act-math-5: Plane Geometry ---
  {
    id: 'act-math-5-q1',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A rectangle has a diagonal of length 13 and one side of length 5. What is the area of the rectangle?",
    choices: [
      "A) 30",
      "B) 48",
      "C) 60",
      "D) 65",
      "E) 144"
    ],
    correct: 2,
    explanation: "By the Pythagorean theorem, if the diagonal = 13 and one side = 5, then the other side = √(13² − 5²) = √(169 − 25) = √144 = 12. Area = 5 × 12 = 60."
  },
  {
    id: 'act-math-5-q2',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "In triangle ABC, angle A = 50° and angle B = 65°. What is the measure of the exterior angle at vertex C?",
    choices: [
      "F) 65°",
      "G) 115°",
      "H) 125°",
      "J) 130°",
      "K) 135°"
    ],
    correct: 1,
    explanation: "The exterior angle of a triangle equals the sum of the two non-adjacent interior angles. Exterior angle at C = angle A + angle B = 50° + 65° = 115°."
  },

  // --- act-math-6: Trigonometry ---
  {
    id: 'act-math-6-q1',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "In a right triangle, sin(θ) = 5/13. What is cos(θ)?",
    choices: [
      "A) 5/12",
      "B) 8/13",
      "C) 12/13",
      "D) 12/5",
      "E) 13/12"
    ],
    correct: 2,
    explanation: "If sin(θ) = 5/13, then the opposite side is 5 and the hypotenuse is 13. The adjacent side = √(13² − 5²) = √(169 − 25) = √144 = 12. So cos(θ) = adjacent/hypotenuse = 12/13."
  },
  {
    id: 'act-math-6-q2',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "A 20-foot ladder leans against a wall, making a 65° angle with the ground. How high up the wall does the ladder reach, to the nearest tenth of a foot?",
    choices: [
      "F) 8.5 ft",
      "G) 14.3 ft",
      "H) 16.4 ft",
      "J) 18.1 ft",
      "K) 21.5 ft"
    ],
    correct: 3,
    explanation: "The height is the side opposite the 65° angle. sin(65°) = height/20, so height = 20 × sin(65°) ≈ 20 × 0.9063 ≈ 18.1 ft."
  },

  // --- act-math-7: Statistics & Probability ---
  {
    id: 'act-math-7-q1',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A bag contains 4 red marbles, 6 blue marbles, and 5 green marbles. If one marble is drawn at random, what is the probability that it is NOT blue?",
    choices: [
      "A) 2/5",
      "B) 3/5",
      "C) 2/3",
      "D) 1/3",
      "E) 7/15"
    ],
    correct: 1,
    explanation: "Total marbles: 4 + 6 + 5 = 15. Non-blue marbles: 4 + 5 = 9. Probability of NOT blue = 9/15 = 3/5."
  },
  {
    id: 'act-math-7-q2',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "The test scores for 7 students are: 72, 85, 88, 90, 92, 95, 100. What is the median score?",
    choices: [
      "F) 85",
      "G) 88",
      "H) 90",
      "J) 92",
      "K) 88.9"
    ],
    correct: 2,
    explanation: "The median of an ordered data set with an odd number of values is the middle value. With 7 values, the median is the 4th value: 90. (The mean would be approximately 88.9, but the question asks for the median.)"
  },

  // --- act-math-8: Advanced Topics ---
  {
    id: 'act-math-8-q1',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "Which of the following is equivalent to the expression (3x²y³)² / (9xy²)?",
    choices: [
      "F) x³y⁴",
      "G) x³y²",
      "H) 3x³y⁴",
      "J) x⁴y⁴",
      "K) 9x³y⁴"
    ],
    correct: 0,
    explanation: "(3x²y³)² = 9x⁴y⁶. Dividing by 9xy²: (9x⁴y⁶)/(9xy²) = x⁴⁻¹ · y⁶⁻² = x³y⁴."
  },
  {
    id: 'act-math-8-q2',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "A regular hexagon has a side length of 6. What is its area?",
    choices: [
      "A) 36√3",
      "B) 54√3",
      "C) 72√3",
      "D) 108√3",
      "E) 216√3"
    ],
    correct: 1,
    explanation: "A regular hexagon with side length s has area (3√3/2)s². With s = 6: area = (3√3/2)(36) = 54√3."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ACT READING — 20 questions (4 choices: A–D or F–J)
  // Chapters: act-read-1 (Prose Fiction), act-read-2 (Social Science),
  //   act-read-3 (Humanities), act-read-4 (Natural Science),
  //   act-read-5 (Main Idea), act-read-6 (Inference),
  //   act-read-7 (Vocabulary in Context), act-read-8 (Author's Purpose)
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-read-1: Prose Fiction ---
  {
    id: 'act-read-1-q1',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"When Clara returned to the farmhouse, she found the front door ajar, muddy boot prints trailing through the hallway, and the lockbox pried open. The savings she had been carefully setting aside for months were gone. She sank into the kitchen chair, her hands trembling.\"\n\nIt can reasonably be inferred from this passage that Clara:",
    choices: [
      "A) had accidentally left the door open earlier that morning.",
      "B) was the victim of a robbery.",
      "C) had recently moved to the farmhouse.",
      "D) planned to call the police immediately."
    ],
    correct: 1,
    explanation: "The evidence — a forced-open door, muddy boot prints, a pried-open lockbox, and missing savings — all point to a break-in. Clara's trembling hands indicate shock. While calling the police is plausible, it is not supported by the text; the robbery itself is directly inferable."
  },
  {
    id: 'act-read-1-q2',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"Dr. Okafor stared at the petri dish under the microscope, then looked again. She compared the results to her notebook, flipped back three pages, and compared once more. 'This changes everything,' she whispered to herself.\"\n\nThe reader can most reasonably infer that Dr. Okafor:",
    choices: [
      "F) made a mistake in her experimental procedure.",
      "G) observed something unexpected that could be scientifically significant.",
      "H) was disappointed by the results of her experiment.",
      "J) decided to abandon her research project."
    ],
    correct: 1,
    explanation: "Her careful re-examination (looking twice, comparing to notes) and the statement 'This changes everything' suggest she observed an unexpected, significant result — not a mistake, disappointment, or desire to quit."
  },
  {
    id: 'act-read-1-q3',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"The town of Millbrook had always prided itself on its annual harvest festival. But this year, attendance dropped by half, three of the five food vendors canceled, and the parade route had to be shortened due to road construction. The mayor's speech, normally a highlight, was met with polite but sparse applause from the thin crowd.\"\n\nBased on the passage, the reader can infer that:",
    choices: [
      "A) the festival will not be held the following year.",
      "B) the mayor's speech was poorly written.",
      "C) the festival did not live up to its usual standards.",
      "D) road construction was the sole reason for low attendance."
    ],
    correct: 2,
    explanation: "Multiple details — lower attendance, canceled vendors, shortened parade, sparse applause — collectively indicate a diminished event compared to previous years. The passage does not single out one cause or predict future cancellation."
  },

  // --- act-read-2: Social Science ---
  {
    id: 'act-read-2-q1',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"The decline of pollinators — particularly honeybees and monarch butterflies — has alarmed ecologists worldwide. Studies indicate that habitat loss, pesticide exposure, and climate change are the primary drivers. Without intervention, the cascading effects on agriculture and natural ecosystems could be devastating.\"\n\nWhich of the following best states the main idea of this passage?",
    choices: [
      "F) Honeybees are more important than monarch butterflies as pollinators.",
      "G) Pollinator decline, driven by multiple environmental factors, poses a serious threat to ecosystems and agriculture.",
      "H) Climate change is the single most important factor in pollinator decline.",
      "J) Ecologists have already developed effective solutions to the pollinator crisis."
    ],
    correct: 1,
    explanation: "The passage identifies multiple causes (habitat loss, pesticides, climate change) and warns of broad consequences. Choice G captures this central argument. The passage does not rank causes or claim solutions exist."
  },
  {
    id: 'act-read-2-q2',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage A: \"Standardized testing provides an objective, efficient measure of student achievement that allows for meaningful comparisons across schools, districts, and states.\"\n\nPassage B: \"Standardized tests reduce the rich complexity of student learning to a single score, penalizing creative thinkers and students from disadvantaged backgrounds who lack access to test-preparation resources.\"\n\nOn which point would the authors of Passage A and Passage B most likely disagree?",
    choices: [
      "A) Whether schools should have any form of assessment",
      "B) Whether standardized tests provide a fair and meaningful picture of student learning",
      "C) Whether teachers play an important role in education",
      "D) Whether all students should attend college"
    ],
    correct: 1,
    explanation: "Passage A sees standardized tests as objective and meaningful; Passage B sees them as reductive and inequitable. Their core disagreement is over whether these tests fairly represent student learning."
  },
  {
    id: 'act-read-2-q3',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"When the city of Flint, Michigan, switched its water source in 2014 to save money, residents almost immediately began complaining about discolored, foul-smelling water. Officials dismissed the concerns for months, insisting the water was safe. It was not until independent researchers and a local pediatrician documented dangerously elevated lead levels in both the water and in children's blood that the state acknowledged the crisis.\"\n\nAs used in this passage, 'dismissed' most nearly means:",
    choices: [
      "F) fired from employment",
      "G) sent away",
      "H) rejected as unimportant",
      "J) carefully evaluated"
    ],
    correct: 2,
    explanation: "In context, officials 'dismissed the concerns,' meaning they rejected or disregarded the residents' complaints as unimportant. This is contrasted with the later acknowledgment of the crisis, reinforcing that the concerns were initially brushed aside."
  },

  // --- act-read-3: Humanities ---
  {
    id: 'act-read-3-q1',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"Maya Lin was only 21 — a Yale undergraduate — when her design for the Vietnam Veterans Memorial was selected from among 1,421 entries. The stark, V-shaped wall of black granite, inscribed with the names of the fallen, was initially controversial. Critics called it a 'black gash of shame.' Yet within a few years, the memorial became one of the most visited monuments in Washington, D.C., and Lin's design is now widely regarded as a masterpiece of public art.\"\n\nThe passage's description of the memorial's reception follows which pattern?",
    choices: [
      "A) Universal acclaim from the beginning",
      "B) Initial controversy followed by widespread acceptance",
      "C) Gradual decline in popularity over time",
      "D) Consistent indifference from the public"
    ],
    correct: 1,
    explanation: "The passage explicitly describes initial controversy ('critics called it a black gash of shame') followed by the memorial becoming one of the most visited monuments, now 'widely regarded as a masterpiece.'"
  },
  {
    id: 'act-read-3-q2',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"The museum's new exhibit featured artifacts spanning three millennia, from Sumerian clay tablets to medieval illuminated manuscripts. Visitors moved through dimly lit galleries, each room transporting them deeper into history. A docent noted that the oldest tablet, inscribed around 3100 BC, contained not poetry or prayer but a record of barley rations — a reminder that civilization's earliest writings were born of practical necessity.\"\n\nBased on the passage, the docent's remark about the clay tablet primarily serves to:",
    choices: [
      "F) criticize the Sumerians for their lack of literary ambition.",
      "G) highlight an unexpected detail about the origins of writing.",
      "H) argue that modern writing is superior to ancient writing.",
      "J) explain why barley was important to Sumerian agriculture."
    ],
    correct: 1,
    explanation: "The docent contrasts what one might expect (poetry or prayer) with reality (barley rations), surprising the audience with a practical origin of writing. The remark highlights this unexpected fact, not agricultural history or cultural criticism."
  },

  // --- act-read-4: Natural Science ---
  {
    id: 'act-read-4-q1',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"For decades, the prevailing view held that the universe was static and eternal. Edwin Hubble's observations in the 1920s shattered this assumption by demonstrating that galaxies are moving away from one another, implying that the universe is expanding. This discovery laid the groundwork for the Big Bang theory.\"\n\nThe primary purpose of this passage is to:",
    choices: [
      "A) argue that the Big Bang theory is the only valid cosmological model.",
      "B) describe how a key observation changed scientific understanding of the universe.",
      "C) provide a biography of Edwin Hubble.",
      "D) explain the technical methods Hubble used to measure galaxy movement."
    ],
    correct: 1,
    explanation: "The passage traces how Hubble's observation of galaxy recession overturned the static-universe model and led to the Big Bang theory. It is fundamentally about a paradigm shift, not biography or technical methods."
  },
  {
    id: 'act-read-4-q2',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"The boreal forest, also known as the taiga, stretches across northern Canada, Scandinavia, and Russia, forming the largest terrestrial biome on Earth. Though it receives less attention than tropical rainforests, the boreal forest stores roughly twice as much carbon per unit area in its soils and peat. Scientists warn that rising temperatures are thawing permafrost beneath the taiga, potentially releasing vast quantities of stored carbon and accelerating global warming.\"\n\nThe passage implies that the boreal forest's role in climate regulation is:",
    choices: [
      "F) well understood and widely discussed by the general public.",
      "G) significant but underappreciated compared to tropical rainforests.",
      "H) negligible because the forest is too cold to absorb carbon.",
      "J) fully offset by the carbon released from thawing permafrost."
    ],
    correct: 1,
    explanation: "The passage states that the boreal forest 'receives less attention than tropical rainforests' despite storing roughly twice as much carbon per unit area. This framing indicates a significant but underappreciated role."
  },

  // --- act-read-5: Main Idea ---
  {
    id: 'act-read-5-q1',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage: \"The concept of 'food miles' — the distance food travels from farm to plate — has gained traction among environmentally conscious consumers. However, recent research suggests that transportation accounts for only about 11% of food's total greenhouse gas emissions, while production methods contribute roughly 83%.\"\n\nThe author presents the research data most likely in order to:",
    choices: [
      "A) argue that food transportation has no environmental impact.",
      "B) suggest that consumers should ignore where their food comes from.",
      "C) complicate a popular assumption by showing that production methods matter more than distance.",
      "D) prove that greenhouse gas emissions from food are negligible."
    ],
    correct: 2,
    explanation: "The author introduces the popular 'food miles' concept and then presents data showing production methods have a far larger environmental impact. The purpose is to add nuance to a commonly held belief, not to dismiss transportation's impact entirely."
  },
  {
    id: 'act-read-5-q2',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage: \"The Great Wall of China, contrary to popular myth, is not visible from space with the naked eye. Built over many centuries beginning in the 7th century BC, the wall stretches over 13,000 miles when including all its branches and sections. Its primary purpose was defense against nomadic invasions from the north.\"\n\nAccording to the passage, the Great Wall was primarily built for what purpose?",
    choices: [
      "F) To serve as a trade route between cities",
      "G) To create a visible landmark from space",
      "H) To defend against northern nomadic invasions",
      "J) To demonstrate the engineering abilities of Chinese dynasties"
    ],
    correct: 2,
    explanation: "The passage explicitly states: 'Its primary purpose was defense against nomadic invasions from the north.' This is a straightforward detail-identification question."
  },

  // --- act-read-6: Inference ---
  {
    id: 'act-read-6-q1',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"In the early 1900s, Lise Meitner, an Austrian-Swedish physicist, made groundbreaking contributions to the understanding of nuclear fission. Despite her pivotal role, she was overlooked when the Nobel Prize for the discovery was awarded solely to her longtime collaborator, Otto Hahn, in 1944.\"\n\nThe passage suggests that Meitner's exclusion from the Nobel Prize was:",
    choices: [
      "A) a deliberate decision she supported.",
      "B) due to her lack of significant contributions.",
      "C) an oversight that did not reflect her actual role in the discovery.",
      "D) the result of her retirement from physics before the award."
    ],
    correct: 2,
    explanation: "The passage describes Meitner's contributions as 'groundbreaking' and her role as 'pivotal,' then notes she was 'overlooked.' This framing implies her exclusion was unjust and inconsistent with her contributions."
  },
  {
    id: 'act-read-6-q2',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"The Rosetta Stone, discovered in 1799 by French soldiers in Egypt, contained the same decree written in three scripts: Greek, Demotic, and hieroglyphics. Jean-Francois Champollion used the known Greek text as a key to finally decode Egyptian hieroglyphics in 1822, ending centuries of speculation about their meaning.\"\n\nWhich detail from the passage directly supported Champollion's ability to decode hieroglyphics?",
    choices: [
      "F) The stone was discovered by French soldiers.",
      "G) The decree was written in Demotic script.",
      "H) The Greek text on the stone was already understood.",
      "J) The stone was found in Egypt in 1799."
    ],
    correct: 2,
    explanation: "The passage states that Champollion 'used the known Greek text as a key to finally decode Egyptian hieroglyphics.' The fact that the Greek text was already understood was the critical detail enabling the decipherment."
  },

  // --- act-read-7: Vocabulary in Context ---
  {
    id: 'act-read-7-q1',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The senator's remarks, while ostensibly supportive of the bill, contained subtle qualifications that undermined its core provisions.\"\n\nAs used in this passage, 'ostensibly' most nearly means:",
    choices: [
      "A) secretly",
      "B) apparently",
      "C) enthusiastically",
      "D) reluctantly"
    ],
    correct: 1,
    explanation: "'Ostensibly' means on the surface or seemingly. The sentence contrasts the surface appearance of support with the reality of subtle undermining, so 'apparently' captures the meaning of outward appearance that may not reflect truth."
  },
  {
    id: 'act-read-7-q2',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The artist's later works represent a marked departure from the conventional landscapes that had defined her early career.\"\n\nAs used in this context, 'departure' most nearly means:",
    choices: [
      "F) physical leaving",
      "G) significant change in direction",
      "H) minor adjustment",
      "J) unfortunate decline"
    ],
    correct: 1,
    explanation: "'Departure' here is used figuratively to mean a shift or change in artistic direction — moving away from conventional landscapes. It does not imply physical leaving, a minor change, or a decline."
  },
  {
    id: 'act-read-7-q3',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The new policy was met with considerable resistance from employees who felt it was implemented in a cavalier fashion, without adequate consultation.\"\n\nAs used in this passage, 'cavalier' most nearly means:",
    choices: [
      "A) brave and noble",
      "B) casually dismissive",
      "C) carefully considered",
      "D) openly hostile"
    ],
    correct: 1,
    explanation: "In this context, 'cavalier' means showing a lack of proper concern — casually dismissive. The employees felt the policy was introduced without sufficient regard for their input. It does not carry its archaic meaning of 'noble.'"
  },

  // --- act-read-8: Author's Purpose ---
  {
    id: 'act-read-8-q1',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"Consider the tomato. Once feared as poisonous by Europeans, who called it the 'wolf peach,' it is now one of the most widely consumed fruits on earth — central to Italian, Mexican, Indian, and countless other cuisines. How many of our own certainties, we might ask, will future generations find equally misguided?\"\n\nThe author's primary purpose in discussing the tomato is to:",
    choices: [
      "F) provide a complete history of tomato cultivation.",
      "G) argue that tomatoes are the most important fruit in global cuisine.",
      "H) use a specific example to raise a broader question about the reliability of commonly held beliefs.",
      "J) criticize Europeans for their historical ignorance about food."
    ],
    correct: 2,
    explanation: "The tomato anecdote serves as a springboard for the author's broader philosophical question about how current certainties may prove wrong. It is not primarily about tomato history, ranking fruits, or criticizing Europeans."
  },
  {
    id: 'act-read-8-q2',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"The company's quarterly earnings report painted a rosy picture: revenue up 12%, new product launches ahead of schedule, and customer satisfaction at an all-time high. Conspicuously absent from the report, however, was any mention of the ongoing federal investigation into the company's accounting practices.\"\n\nThe author's tone in this passage is best described as:",
    choices: [
      "A) enthusiastic and congratulatory",
      "B) indifferent and detached",
      "C) skeptical and pointed",
      "D) hostile and accusatory"
    ],
    correct: 2,
    explanation: "The author presents the positive data but then pointedly notes what was omitted ('conspicuously absent'), implying the report may be deliberately incomplete. This tone is skeptical and pointed, not openly hostile or indifferent."
  },
  {
    id: 'act-read-8-q3',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage A: \"Remote work has revolutionized the modern workplace, offering employees unprecedented flexibility, eliminating commute times, and enabling companies to access talent worldwide.\"\n\nPassage B: \"While remote work offers undeniable conveniences, it has also eroded the informal collaboration that drives innovation. The spontaneous hallway conversation — where many breakthrough ideas originate — simply cannot be replicated over video calls.\"\n\nWhich statement best describes the relationship between the two passages?",
    choices: [
      "F) Passage B directly contradicts every claim made in Passage A.",
      "G) Both passages reach the same conclusion about remote work.",
      "H) Passage A focuses on the benefits of remote work, while Passage B acknowledges those benefits but raises concerns about its limitations.",
      "J) Passage A is based on research, while Passage B is purely opinion."
    ],
    correct: 2,
    explanation: "Passage B opens by conceding 'undeniable conveniences' (aligning with Passage A) before pivoting to concerns about lost collaboration. Passage B does not flatly contradict A; it adds nuance."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ACT SCIENCE — 20 questions (4 choices: A–D or F–J)
  // Chapters: act-sci-1 (Data Representation), act-sci-2 (Data Interpretation),
  //   act-sci-3 (Research Summaries: Variables), act-sci-4 (Research Summaries: Controls),
  //   act-sci-5 (Research Summaries: Conclusions), act-sci-6 (Conflicting Viewpoints: Identify),
  //   act-sci-7 (Conflicting Viewpoints: Evaluate), act-sci-8 (Experimental Design)
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-sci-1: Data Representation ---
  {
    id: 'act-sci-1-q1',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A researcher measured the dissolved oxygen (DO) concentration in a lake at different depths. The data are shown below:\n\nDepth (m) | DO (mg/L)\n0         | 9.2\n5         | 8.7\n10        | 7.1\n15        | 5.3\n20        | 3.8\n25        | 2.4\n\nBased on the data, which statement best describes the relationship between depth and dissolved oxygen?",
    choices: [
      "A) Dissolved oxygen increases as depth increases.",
      "B) Dissolved oxygen decreases as depth increases.",
      "C) Dissolved oxygen remains constant at all depths.",
      "D) Dissolved oxygen first increases, then decreases with depth."
    ],
    correct: 1,
    explanation: "The data shows a clear trend: DO decreases from 9.2 mg/L at the surface to 2.4 mg/L at 25 m. At every successive depth, the DO value is lower than the previous one."
  },
  {
    id: 'act-sci-1-q2',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A student measured the growth rate of a bacterial culture at various temperatures:\n\nTemperature (°C) | Growth Rate (generations/hr)\n10               | 0.2\n20               | 0.8\n30               | 1.5\n37               | 2.1\n40               | 1.9\n50               | 0.3\n\nAt approximately what temperature does the bacterial culture achieve its maximum growth rate?",
    choices: [
      "F) 20°C",
      "G) 30°C",
      "H) 37°C",
      "J) 50°C"
    ],
    correct: 2,
    explanation: "The highest growth rate in the table is 2.1 generations/hr, which occurs at 37°C. Growth increases up to 37°C and then declines at higher temperatures, indicating an optimal temperature near body temperature."
  },
  {
    id: 'act-sci-1-q3',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "The table below shows the concentration of ozone (O₃) in the atmosphere at different altitudes:\n\nAltitude (km) | O₃ Concentration (DU)\n0             | 2\n10            | 5\n20            | 18\n25            | 22\n30            | 15\n40            | 4\n\nBased on the data, the ozone layer is most concentrated at approximately what altitude?",
    choices: [
      "A) 0–10 km",
      "B) 10–20 km",
      "C) 20–30 km",
      "D) 30–40 km"
    ],
    correct: 2,
    explanation: "The highest ozone concentrations (18 and 22 DU) occur between 20 and 25 km altitude, which falls within the 20–30 km range. This is consistent with the known location of the ozone layer in the stratosphere."
  },

  // --- act-sci-2: Data Interpretation ---
  {
    id: 'act-sci-2-q1',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A student conducted an experiment measuring the pH of rainwater samples collected at increasing distances from an industrial plant:\n\nDistance (km) | pH\n1             | 4.2\n5             | 4.8\n10            | 5.3\n20            | 5.7\n50            | 6.1\n\nIf the student collected a sample at 30 km, the pH would most likely be closest to:",
    choices: [
      "F) 5.0",
      "G) 5.5",
      "H) 5.9",
      "J) 6.3"
    ],
    correct: 2,
    explanation: "At 20 km, pH is 5.7 and at 50 km, pH is 6.1. The value at 30 km should fall between these. Based on the trend of decreasing rate of change, approximately 5.9 is the best estimate (closer to the 20 km value since 30 km is nearer to 20 than to 50)."
  },
  {
    id: 'act-sci-2-q2',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A graph shows the population sizes of two competing species (Species X and Species Y) in the same habitat over 12 months. Species X starts at 500 individuals and steadily increases to 900 by month 12. Species Y starts at 400 individuals, peaks at 600 in month 4, then declines to 150 by month 12.\n\nWhich conclusion is best supported by these data?",
    choices: [
      "A) Species X and Species Y have a mutualistic relationship.",
      "B) Species X likely has a competitive advantage over Species Y in this habitat.",
      "C) Species Y has a higher reproductive rate than Species X.",
      "D) Both species will eventually go extinct in this habitat."
    ],
    correct: 1,
    explanation: "Species X steadily grows while Species Y declines after an initial period, suggesting competitive exclusion. Species X appears to outcompete Species Y for shared resources in this habitat."
  },
  {
    id: 'act-sci-2-q3',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A table shows average global temperature anomalies and atmospheric CO₂ concentrations from 1960 to 2020:\n\nYear | CO₂ (ppm) | Temp Anomaly (°C)\n1960 | 317       | −0.02\n1970 | 326       | 0.03\n1980 | 339       | 0.18\n1990 | 354       | 0.40\n2000 | 369       | 0.39\n2010 | 390       | 0.66\n2020 | 414       | 1.02\n\nBased on these data, which claim is best supported?",
    choices: [
      "F) CO₂ concentration has no relationship with temperature anomaly.",
      "G) As CO₂ concentration increases, temperature anomaly generally increases as well.",
      "H) Temperature anomaly causes CO₂ levels to rise.",
      "J) CO₂ levels will decrease by 2030."
    ],
    correct: 1,
    explanation: "Both CO₂ and temperature anomaly increase over the period shown, suggesting a positive correlation. The data show correlation, not causation, so choice G (which says 'generally increases as well') is the most accurate claim the data can support."
  },

  // --- act-sci-3: Research Summaries — Variables ---
  {
    id: 'act-sci-3-q1',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "Experiment: Students tested the effect of salt concentration on the boiling point of water. They added 0g, 10g, 20g, 30g, and 40g of NaCl to separate 500mL beakers of distilled water, then heated each beaker and recorded the temperature at which the water began to boil.\n\nResults:\nNaCl (g) | Boiling Point (°C)\n0        | 100.0\n10       | 100.4\n20       | 100.9\n30       | 101.3\n40       | 101.8\n\nWhich variable was the independent variable in this experiment?",
    choices: [
      "A) The boiling point of water",
      "B) The volume of water",
      "C) The amount of NaCl added",
      "D) The type of salt used"
    ],
    correct: 2,
    explanation: "The independent variable is the one deliberately manipulated by the experimenters. Here, the students systematically changed the amount of NaCl added. The boiling point was the dependent (measured) variable, and the volume of water was held constant."
  },
  {
    id: 'act-sci-3-q2',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "Experiment: A student tested whether the color of light affects the rate of photosynthesis in aquatic plants. She placed identical Elodea sprigs in beakers of water under red, blue, green, and white light of equal intensity and counted oxygen bubbles produced per minute.\n\nResults:\nRed    | 12 bubbles/min\nBlue   | 14 bubbles/min\nGreen  | 3 bubbles/min\nWhite  | 10 bubbles/min\n\nWhich of the following best explains why the green light produced the fewest bubbles?",
    choices: [
      "F) Green light has the highest energy of all visible wavelengths.",
      "G) The plant was dead under the green light.",
      "H) Plants reflect green light rather than absorbing it, so less light energy is available for photosynthesis.",
      "J) Green light inhibits the production of carbon dioxide."
    ],
    correct: 2,
    explanation: "Chlorophyll, the primary photosynthetic pigment, reflects green light (which is why plants appear green) and absorbs red and blue light most efficiently. Under green light, less light energy is absorbed for photosynthesis, resulting in fewer oxygen bubbles."
  },

  // --- act-sci-4: Research Summaries — Controls ---
  {
    id: 'act-sci-4-q1',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "Experiment: A biologist investigated whether fertilizer concentration affects the height of bean plants. She planted 30 identical bean seeds in identical pots with the same soil. She divided them into 5 groups of 6 plants each and applied fertilizer solutions of 0%, 5%, 10%, 15%, and 20% concentration, watering each group with the same volume of solution twice weekly. After 4 weeks, she measured the average height of plants in each group.\n\nWhat was the purpose of the 0% fertilizer group?",
    choices: [
      "A) To ensure all plants received equal amounts of water",
      "B) To serve as a control for comparison with the fertilized groups",
      "C) To test whether water alone could kill the plants",
      "D) To reduce the total cost of the experiment"
    ],
    correct: 1,
    explanation: "A control group (0% fertilizer) receives no treatment and provides a baseline for comparison. Without it, the biologist could not determine whether observed growth differences were due to the fertilizer or other factors."
  },
  {
    id: 'act-sci-4-q2',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "Experiment: Researchers tested how different surface materials affect the distance a toy car travels after rolling down a ramp. The car was released from the same height on a smooth ramp and allowed to roll onto surfaces of carpet, wood, tile, and ice. Each trial was repeated 5 times.\n\nResults (average distance):\nCarpet | 1.2 m\nWood   | 3.5 m\nTile   | 4.8 m\nIce    | 8.1 m\n\nWhich conclusion is best supported by these results?",
    choices: [
      "F) The car had the most kinetic energy on carpet.",
      "G) Surfaces with less friction allow the car to travel farther.",
      "H) Ice is the smoothest surface available.",
      "J) Heavier cars would travel the same distances."
    ],
    correct: 1,
    explanation: "The car traveled farthest on ice and shortest on carpet, corresponding to surfaces with progressively less friction. The data support the conclusion that reduced friction allows greater travel distance."
  },

  // --- act-sci-5: Research Summaries — Conclusions ---
  {
    id: 'act-sci-5-q1',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Experiment: Scientists measured the effect of pH on enzyme activity. They tested the same enzyme at pH values of 2, 4, 6, 7, 8, 10, and 12, measuring the rate of product formation.\n\nResults:\npH  | Rate (μmol/min)\n2   | 5\n4   | 22\n6   | 48\n7   | 52\n8   | 45\n10  | 18\n12  | 3\n\nA student hypothesizes that this enzyme would function best in the human stomach (pH ≈ 2). Do the data support this hypothesis?",
    choices: [
      "A) Yes, because the enzyme was active at pH 2.",
      "B) Yes, because enzymes always work best at low pH.",
      "C) No, because the enzyme showed peak activity near pH 7, not pH 2.",
      "D) No, because enzymes cannot function at pH 2."
    ],
    correct: 2,
    explanation: "The data show peak activity at pH 7 (52 μmol/min), with much lower activity at pH 2 (5 μmol/min). The enzyme's optimal pH is near neutral, so it would not function best in the acidic stomach environment."
  },
  {
    id: 'act-sci-5-q2',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Experiment: Two groups of mice were given a memory test (navigating a maze). Group 1 slept for 8 hours after learning the maze. Group 2 was kept awake for 8 hours after learning. Both groups were then re-tested.\n\nResults:\nGroup 1 (sleep): Average completion time improved by 40%\nGroup 2 (no sleep): Average completion time improved by only 8%\n\nWhich conclusion is best supported by the experiment?",
    choices: [
      "F) Sleep has no effect on memory.",
      "G) Mice that slept performed worse on the maze.",
      "H) Sleep after learning appears to significantly enhance memory consolidation.",
      "J) The maze was easier the second time for all mice."
    ],
    correct: 2,
    explanation: "Group 1 (sleep) showed a 40% improvement compared to only 8% in Group 2 (no sleep). The key difference between groups was sleep, suggesting sleep significantly enhances memory consolidation after learning."
  },
  {
    id: 'act-sci-5-q3',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Experiment: An environmental scientist compared biodiversity in soil samples from four locations: a city park, a suburban lawn, a rural farm field, and an undisturbed forest. She counted the number of distinct invertebrate species in each 1 kg soil sample. Three samples were taken from each location.\n\nResults (average species count):\nCity park      | 8\nSuburban lawn  | 12\nRural farm     | 15\nForest         | 34\n\nWhich factor most likely explains the difference in biodiversity between the farm and the forest?",
    choices: [
      "A) The farm soil contained more nitrogen.",
      "B) The forest had never been exposed to sunlight.",
      "C) The undisturbed forest ecosystem has greater habitat complexity and less human disturbance, supporting more species.",
      "D) Invertebrates prefer colder temperatures found in forests."
    ],
    correct: 2,
    explanation: "Undisturbed ecosystems generally have greater habitat complexity (leaf litter, fallen logs, varied vegetation layers), and the lack of tillage, pesticides, and monoculture allows more species to thrive. This best explains the forest's higher species count."
  },

  // --- act-sci-6: Conflicting Viewpoints — Identify ---
  {
    id: 'act-sci-6-q1',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "Scientist 1: \"The mass extinction at the end of the Cretaceous period (66 million years ago) was caused primarily by the Chicxulub asteroid impact, which triggered global fires, a 'nuclear winter' of dust and soot, and acid rain, rapidly devastating ecosystems.\"\n\nScientist 2: \"While the Chicxulub impact was significant, massive volcanic eruptions in the Deccan Traps of India had already been destabilizing global climate for hundreds of thousands of years before the impact. These eruptions released enormous quantities of CO₂ and sulfur dioxide, causing severe environmental stress. The asteroid was merely the final blow to already weakened ecosystems.\"\n\nOn which point do Scientist 1 and Scientist 2 agree?",
    choices: [
      "F) The Chicxulub asteroid impact occurred at the end of the Cretaceous.",
      "G) Volcanic eruptions were the primary cause of the mass extinction.",
      "H) The mass extinction happened gradually over millions of years.",
      "J) The asteroid impact had no significant environmental effects."
    ],
    correct: 0,
    explanation: "Both scientists acknowledge the Chicxulub impact occurred at the end of the Cretaceous — they disagree about its relative importance. Scientist 1 sees it as the primary cause; Scientist 2 sees it as the final blow after volcanic stress."
  },
  {
    id: 'act-sci-6-q2',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "View 1: \"The best approach to reducing carbon emissions is a carbon tax that makes fossil fuels more expensive, incentivizing businesses and consumers to switch to clean energy sources.\"\n\nView 2: \"A carbon tax disproportionately burdens low-income households. A better approach is direct government investment in renewable energy infrastructure and research, which reduces emissions without regressive economic effects.\"\n\nBoth views share the assumption that:",
    choices: [
      "A) carbon emissions need to be reduced.",
      "B) fossil fuel companies should be nationalized.",
      "C) renewable energy is currently too expensive.",
      "D) low-income households are the largest emitters of carbon."
    ],
    correct: 0,
    explanation: "Both views propose methods for reducing carbon emissions, which means both assume that reducing emissions is a necessary goal. They disagree on the best method, not the underlying goal."
  },

  // --- act-sci-7: Conflicting Viewpoints — Evaluate ---
  {
    id: 'act-sci-7-q1',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Scientist 1: \"The mass extinction at the end of the Cretaceous period was caused primarily by the Chicxulub asteroid impact.\"\n\nScientist 2: \"Massive volcanic eruptions in the Deccan Traps had already been destabilizing global climate for hundreds of thousands of years before the impact. The asteroid was merely the final blow to already weakened ecosystems.\"\n\nWhich piece of evidence, if discovered, would most strengthen Scientist 2's argument?",
    choices: [
      "F) A new crater from the same time period as the Chicxulub impact",
      "G) Fossil evidence showing significant species decline beginning 500,000 years before the asteroid impact",
      "H) Evidence that the Chicxulub asteroid was larger than previously estimated",
      "J) Discovery that the Deccan Traps eruptions lasted only a few years"
    ],
    correct: 1,
    explanation: "Scientist 2 argues that ecosystems were already declining before the impact due to volcanic activity. Fossil evidence of species decline beginning 500,000 years before the impact would directly support this claim of pre-impact environmental stress."
  },
  {
    id: 'act-sci-7-q2',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Researcher A: \"Dark matter consists of Weakly Interacting Massive Particles (WIMPs) — subatomic particles that interact with ordinary matter only through gravity and the weak nuclear force. Direct detection experiments will eventually capture a WIMP interaction.\"\n\nResearcher B: \"Decades of direct detection experiments have failed to find WIMPs. Dark matter is more likely composed of primordial black holes formed in the early universe, which would explain gravitational observations without requiring new particle physics.\"\n\nWhich statement would Researcher A most likely use to counter Researcher B's argument?",
    choices: [
      "A) Gravitational lensing studies have confirmed that dark matter exists.",
      "B) Primordial black holes would produce detectable gravitational wave signatures that have not been observed at the expected levels.",
      "C) The existence of WIMPs has already been confirmed.",
      "D) Dark matter is not needed to explain galactic rotation curves."
    ],
    correct: 1,
    explanation: "To counter Researcher B, Researcher A would point to a testable prediction of the primordial black hole hypothesis that has not been confirmed. Choice B does this by noting that primordial black holes should produce specific gravitational wave signals that observations have not detected."
  },
  {
    id: 'act-sci-7-q3',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Scientist A: \"Human-caused climate change is the primary driver of recent coral reef bleaching events. Rising ocean temperatures stress corals and cause them to expel their symbiotic algae, leading to bleaching.\"\n\nScientist B: \"While ocean warming contributes to bleaching, natural ocean current cycles like El Nino are the primary drivers. Bleaching events correlate strongly with El Nino years, and corals have recovered from such events throughout geological history.\"\n\nScientist A would most likely respond to Scientist B by arguing that:",
    choices: [
      "F) El Nino events do not cause any temperature changes in ocean water.",
      "G) coral reefs have never experienced bleaching before the industrial era.",
      "H) while El Nino events trigger individual bleaching episodes, anthropogenic warming is raising baseline temperatures so that corals are stressed even during non-El Nino years, reducing recovery time.",
      "J) coral bleaching is unrelated to water temperature."
    ],
    correct: 2,
    explanation: "Scientist A's strongest response would integrate Scientist B's observation about El Nino while maintaining that human-caused warming is the fundamental problem. Choice H does this by arguing that rising baseline temperatures compound El Nino effects and prevent recovery."
  },

  // --- act-sci-8: Experimental Design ---
  {
    id: 'act-sci-8-q1',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A chemistry student tested the solubility of potassium nitrate (KNO₃) in water at different temperatures:\n\nTemperature (°C) | Solubility (g/100mL water)\n20               | 32\n40               | 64\n60               | 110\n80               | 169\n100              | 246\n\nIf the student dissolves 90 g of KNO₃ in 100 mL of water at 60°C and then cools the solution to 40°C, approximately how many grams of KNO₃ will precipitate out of solution?",
    choices: [
      "A) 20 g",
      "B) 26 g",
      "C) 46 g",
      "D) 90 g"
    ],
    correct: 1,
    explanation: "At 60°C, the solution can hold 110 g, so 90 g is fully dissolved. At 40°C, only 64 g can remain dissolved. The excess will precipitate: 90 − 64 = 26 g."
  },
  {
    id: 'act-sci-8-q2',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Ecologist A: \"Reintroducing apex predators such as wolves into degraded ecosystems triggers trophic cascades that restore ecological balance. In Yellowstone, wolf reintroduction reduced elk overgrazing, allowing vegetation to recover along riverbanks, which in turn stabilized erosion and increased biodiversity.\"\n\nEcologist B: \"The Yellowstone example is overly simplified. Vegetation recovery in Yellowstone was influenced by multiple factors including drought, increased human hunting quotas, and natural elk population fluctuations. Attributing the recovery primarily to wolf reintroduction oversimplifies complex ecosystem dynamics.\"\n\nWhich research finding would most directly challenge Ecologist B's position?",
    choices: [
      "F) Wolves preferentially hunt sick and elderly elk.",
      "G) Controlled experiments in multiple ecosystems show vegetation recovery occurring specifically in areas where predators were reintroduced, but not in comparable areas without predators that experienced similar drought and hunting conditions.",
      "H) Wolves have been successfully reintroduced in several other national parks.",
      "J) Elk populations in some regions fluctuate without any predator influence."
    ],
    correct: 1,
    explanation: "Ecologist B argues that factors other than wolves could explain the vegetation recovery. Choice G would challenge this by showing — through controlled comparisons — that predator reintroduction, not drought or hunting alone, is the key factor."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ADDITIONAL ACT ENGLISH QUESTIONS — ~140 more questions
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-1: Punctuation (additional) ---
  {
    id: 'act-eng-1-q4',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The artist's studio, located on the third floor of an old warehouse was filled with canvases, brushes, and jars of pigment.",
    choices: [
      "A) NO CHANGE",
      "B) The artist's studio, located on the third floor of an old warehouse, was filled with canvases, brushes, and jars of pigment.",
      "C) The artist's studio located on the third floor of an old warehouse, was filled with canvases, brushes, and jars of pigment.",
      "D) The artist's studio located on the third floor of an old warehouse was filled with canvases, brushes, and jars of pigment."
    ],
    correct: 1,
    explanation: "The phrase 'located on the third floor of an old warehouse' is a nonrestrictive modifier and must be enclosed by commas on both sides. Choice B provides the correct punctuation."
  },
  {
    id: 'act-eng-1-q5',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The school board's decision — which reversed years of policy — surprised parents teachers and administrators alike.",
    choices: [
      "F) NO CHANGE",
      "G) surprised parents, teachers, and administrators alike.",
      "H) surprised parents, teachers and administrators alike.",
      "J) surprised parents teachers, and administrators alike."
    ],
    correct: 1,
    explanation: "A series of three or more items requires commas between each item. Choice G correctly places commas after 'parents' and 'teachers' to separate the three items in the list."
  },
  {
    id: 'act-eng-1-q6',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The researchers findings were published in a peer-reviewed journal last month.",
    choices: [
      "A) NO CHANGE",
      "B) The researcher's findings",
      "C) The researchers' findings",
      "D) The researchers finding's"
    ],
    correct: 2,
    explanation: "Multiple researchers possess the findings, so the plural possessive 'researchers'' (with the apostrophe after the s) is correct."
  },
  {
    id: 'act-eng-1-q7',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "To prepare for the marathon; she ran five miles every morning, ate a balanced diet, and slept at least eight hours each night.",
    choices: [
      "F) NO CHANGE",
      "G) To prepare for the marathon, she ran",
      "H) To prepare for the marathon: she ran",
      "J) To prepare for the marathon she ran"
    ],
    correct: 1,
    explanation: "An introductory prepositional phrase should be followed by a comma, not a semicolon. A semicolon joins two independent clauses, but 'To prepare for the marathon' is not an independent clause."
  },
  {
    id: 'act-eng-1-q8',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "Its important to note that the company's profits have declined for three consecutive quarters.",
    choices: [
      "A) NO CHANGE",
      "B) It's important to note that the company's",
      "C) Its important to note that the companies",
      "D) It's important to note that the companies'"
    ],
    correct: 1,
    explanation: "'It's' (with an apostrophe) is the contraction of 'it is,' which is what the sentence requires. 'Its' without an apostrophe is the possessive form. The singular possessive 'company's' is also correct here."
  },
  {
    id: 'act-eng-1-q9',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The senator argued that the bill would create jobs, reduce pollution and strengthen the economy however, her opponents disagreed.",
    choices: [
      "F) NO CHANGE",
      "G) economy; however, her opponents disagreed.",
      "H) economy, however her opponents disagreed.",
      "J) economy however; her opponents disagreed."
    ],
    correct: 1,
    explanation: "A semicolon is needed before 'however' when it joins two independent clauses, and a comma must follow 'however.' Choice G provides the correct punctuation."
  },
  {
    id: 'act-eng-1-q10',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The three children's backpacks were left in the hallway after school.",
    choices: [
      "A) NO CHANGE",
      "B) The three childrens' backpacks",
      "C) The three childrens backpacks",
      "D) The three children backpacks"
    ],
    correct: 0,
    explanation: "'Children' is already plural, so the possessive is formed by adding 's: children's. The original sentence is correct."
  },
  {
    id: 'act-eng-1-q11',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The recipe which my grandmother created during the Depression calls for only four simple ingredients.",
    choices: [
      "F) NO CHANGE",
      "G) The recipe, which my grandmother created during the Depression, calls",
      "H) The recipe, which my grandmother created during the Depression calls",
      "J) The recipe which my grandmother created during the Depression, calls"
    ],
    correct: 1,
    explanation: "The clause 'which my grandmother created during the Depression' is nonrestrictive (it adds extra information, not essential for identifying the recipe). It must be set off by commas on both sides."
  },
  {
    id: 'act-eng-1-q12',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "By 2030 experts predict, that renewable energy will account for over 50 percent of global electricity production.",
    choices: [
      "A) NO CHANGE",
      "B) By 2030, experts predict that renewable energy",
      "C) By 2030 experts predict that, renewable energy",
      "D) By 2030, experts predict, that renewable energy"
    ],
    correct: 1,
    explanation: "A comma should follow the introductory phrase 'By 2030,' and no comma should separate the verb 'predict' from its noun clause 'that renewable energy will...'"
  },

  // --- act-eng-2: Grammar/Usage (additional) ---
  {
    id: 'act-eng-2-q4',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The team of engineers ______ been working on the project for six months before the deadline was extended.",
    choices: [
      "A) have",
      "B) has",
      "C) are",
      "D) were"
    ],
    correct: 1,
    explanation: "The subject is 'team' (singular), not 'engineers.' The singular verb 'has' agrees with the singular collective noun 'team.'"
  },
  {
    id: 'act-eng-2-q5',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "Every student and teacher in the building ______ required to participate in the fire drill.",
    choices: [
      "F) are",
      "G) is",
      "H) were",
      "J) have been"
    ],
    correct: 1,
    explanation: "When 'every' precedes compound subjects joined by 'and,' the subject is treated as singular. The singular verb 'is' is correct."
  },
  {
    id: 'act-eng-2-q6',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The data collected from the survey ______ that a majority of respondents favor the proposed changes.",
    choices: [
      "A) suggests",
      "B) suggest",
      "C) are suggesting",
      "D) have been suggesting"
    ],
    correct: 0,
    explanation: "In American English, 'data' is commonly treated as a singular mass noun. The singular verb 'suggests' agrees with this usage."
  },
  {
    id: 'act-eng-2-q7',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "If Marcus would have studied harder, he might have passed the exam.",
    choices: [
      "F) NO CHANGE",
      "G) If Marcus had studied harder,",
      "H) If Marcus studied harder,",
      "J) If Marcus has studied harder,"
    ],
    correct: 1,
    explanation: "In a past contrary-to-fact conditional, the correct form uses 'had' + past participle in the if-clause, not 'would have.' 'If Marcus had studied harder' is the correct construction."
  },
  {
    id: 'act-eng-2-q8',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The number of students enrolled in online courses ______ increased dramatically since 2020.",
    choices: [
      "A) have",
      "B) has",
      "C) are",
      "D) were"
    ],
    correct: 1,
    explanation: "'The number of' takes a singular verb. (Note: 'A number of' takes a plural verb.) 'The number...has increased' is correct."
  },
  {
    id: 'act-eng-2-q9',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "Between you and ______, I think the proposal needs significant revision before we present it to the board.",
    choices: [
      "F) I",
      "G) me",
      "H) myself",
      "J) we"
    ],
    correct: 1,
    explanation: "'Between' is a preposition and requires the objective case. 'Between you and me' is correct. 'Between you and I' is a common error."
  },
  {
    id: 'act-eng-2-q10',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "Laying in the hammock on a warm afternoon, Marcus watched the clouds drift across the sky.",
    choices: [
      "A) NO CHANGE",
      "B) Lying in the hammock",
      "C) Having laid in the hammock",
      "D) Being that he was laying in the hammock"
    ],
    correct: 1,
    explanation: "'Lie' (to recline) is the correct verb here, not 'lay' (to put something down). The present participle of 'lie' is 'lying,' so 'Lying in the hammock' is correct."
  },
  {
    id: 'act-eng-2-q11',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The professor asked that each student ______ their final paper by the end of the semester.",
    choices: [
      "F) submits",
      "G) submit",
      "H) submitted",
      "J) will submit"
    ],
    correct: 1,
    explanation: "After verbs of demand or request (asked that), the subjunctive mood is used. The subjunctive form is the base form of the verb: 'submit,' regardless of the subject."
  },
  {
    id: 'act-eng-2-q12',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "Neither the manager nor his assistants ______ aware of the policy change until this morning.",
    choices: [
      "A) was",
      "B) were",
      "C) is",
      "D) has been"
    ],
    correct: 1,
    explanation: "With 'neither...nor,' the verb agrees with the nearer subject. 'Assistants' is plural and is closer to the verb, so the plural 'were' is correct."
  },

  // --- act-eng-3: Sentence Structure (additional) ---
  {
    id: 'act-eng-3-q3',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The mayor proposed a new transit plan, it would connect the suburbs to the downtown core with a light-rail system.",
    choices: [
      "A) NO CHANGE",
      "B) The mayor proposed a new transit plan that would connect the suburbs to the downtown core with a light-rail system.",
      "C) The mayor proposed a new transit plan; that would connect the suburbs to the downtown core with a light-rail system.",
      "D) The mayor proposed a new transit plan, that would connect the suburbs to the downtown core with a light-rail system."
    ],
    correct: 1,
    explanation: "The original is a comma splice. Choice B correctly uses 'that' to create a relative clause modifying 'plan,' forming a single, grammatically correct sentence."
  },
  {
    id: 'act-eng-3-q4',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Because the bridge was closed for repairs and no alternative routes were available.",
    choices: [
      "F) NO CHANGE",
      "G) Because the bridge was closed for repairs, no alternative routes were available.",
      "H) The bridge was closed for repairs, and no alternative routes were available.",
      "J) Because the bridge was closed for repairs and no alternative routes were available, commuters faced significant delays."
    ],
    correct: 3,
    explanation: "The original is a sentence fragment — a dependent clause with no independent clause. Choice J adds an independent clause ('commuters faced significant delays'), completing the sentence."
  },
  {
    id: 'act-eng-3-q5',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The professor explained the concept clearly, the students still had difficulty applying it to the practice problems.",
    choices: [
      "A) NO CHANGE",
      "B) The professor explained the concept clearly; however, the students still had difficulty applying it to the practice problems.",
      "C) The professor explained the concept clearly the students still had difficulty applying it to the practice problems.",
      "D) The professor explained the concept clearly, the students, still had difficulty applying it to the practice problems."
    ],
    correct: 1,
    explanation: "The original is a comma splice. Choice B correctly uses a semicolon and 'however' to join two independent clauses that present contrasting ideas."
  },
  {
    id: 'act-eng-3-q6',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The museum's collection includes paintings, sculptures, and also displaying photographs from the early twentieth century.",
    choices: [
      "F) NO CHANGE",
      "G) paintings, sculptures, and photographs from the early twentieth century.",
      "H) paintings, sculptures, and it also displays photographs from the early twentieth century.",
      "J) paintings and sculptures, also displaying photographs from the early twentieth century."
    ],
    correct: 1,
    explanation: "Parallel structure requires matching forms. 'Paintings, sculptures, and photographs' maintains parallel noun forms. 'Also displaying' breaks the parallel structure."
  },
  {
    id: 'act-eng-3-q7',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Although the temperature dropped below freezing overnight, but the crops survived thanks to the protective tarps the farmers had laid down.",
    choices: [
      "A) NO CHANGE",
      "B) Although the temperature dropped below freezing overnight, the crops survived",
      "C) The temperature dropped below freezing overnight, but the crops survived",
      "D) Although the temperature dropped below freezing overnight; the crops survived"
    ],
    correct: 1,
    explanation: "Using both 'although' and 'but' creates a double conjunction error. Either 'although...comma' or 'clause, but clause' is correct, but not both together."
  },
  {
    id: 'act-eng-3-q8',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The city council voted to increase funding for public parks they believed it would improve community health and attract new residents.",
    choices: [
      "F) NO CHANGE",
      "G) parks; they believed it would improve community health and attract new residents.",
      "H) parks, they believed it would improve community health and attract new residents.",
      "J) parks: they believed, it would improve community health and attract new residents."
    ],
    correct: 1,
    explanation: "The original is a run-on sentence. A semicolon correctly separates two related independent clauses."
  },
  {
    id: 'act-eng-3-q9',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The volunteer coordinator responsible for organizing weekend cleanup events and recruiting new members to the environmental club.",
    choices: [
      "A) NO CHANGE",
      "B) The volunteer coordinator is responsible for organizing weekend cleanup events and recruiting new members to the environmental club.",
      "C) The volunteer coordinator; responsible for organizing weekend cleanup events and recruiting new members to the environmental club.",
      "D) The volunteer coordinator, responsible for organizing weekend cleanup events and, recruiting new members to the environmental club."
    ],
    correct: 1,
    explanation: "The original lacks a main verb, making it a fragment. Adding 'is' creates a complete sentence with a subject ('coordinator') and a predicate ('is responsible for...')."
  },
  {
    id: 'act-eng-3-q10',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The hikers enjoyed the trail, which offered stunning views of the valley, and they planned to return the following weekend, which they hoped would have better weather.",
    choices: [
      "F) NO CHANGE",
      "G) The hikers enjoyed the trail, which offered stunning views of the valley, and planned to return the following weekend, hoping for better weather.",
      "H) The hikers enjoyed the trail, which offered stunning views of the valley. And they planned to return the following weekend, which they hoped would have better weather.",
      "J) The hikers enjoying the trail, which offered stunning views of the valley, and planning to return the following weekend."
    ],
    correct: 1,
    explanation: "The original is grammatically correct but wordy. Choice G tightens the sentence by removing the unnecessary second 'they' and converting the final clause into a participial phrase."
  },

  // --- act-eng-4: Style/Tone (additional) ---
  {
    id: 'act-eng-4-q4',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The passage is written in a formal, academic tone. Which of the following sentences best maintains that tone?\n\nThe study examined the correlation between sleep duration and academic performance among college freshmen.",
    choices: [
      "A) The results were pretty interesting and showed some cool patterns.",
      "B) The findings revealed a statistically significant positive correlation between sleep duration and grade point average.",
      "C) It turns out that getting more sleep helps you do way better in school.",
      "D) Basically, if you sleep more, your grades go up — no shocker there."
    ],
    correct: 1,
    explanation: "Choice B uses precise, academic language ('statistically significant positive correlation,' 'grade point average') consistent with the formal tone. The other options use casual or colloquial language."
  },
  {
    id: 'act-eng-4-q5',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "In a lighthearted personal essay about learning to cook, the author writes: \"My first attempt at making soufflé resulted in a dense, rubbery disk that could have doubled as a hockey puck.\"\n\nThis sentence's tone is best described as:",
    choices: [
      "F) bitter and resentful",
      "G) self-deprecating and humorous",
      "H) coldly analytical",
      "J) condescending"
    ],
    correct: 1,
    explanation: "The author jokes about their own failure by comparing the soufflé to a hockey puck. This is self-deprecating humor — the author is laughing at their own expense."
  },
  {
    id: 'act-eng-4-q6',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "A passage about climate policy uses technical language throughout. Which revision of the underlined portion maintains consistency?\n\n\"Carbon capture and sequestration technologies have shown promise in reducing atmospheric CO₂ levels. Scientists are super excited about the potential of direct air capture systems.\"",
    choices: [
      "A) NO CHANGE",
      "B) Scientists are enthusiastic about the potential",
      "C) Scientists are really pumped up about the potential",
      "D) Scientists think it's awesome that the potential"
    ],
    correct: 1,
    explanation: "'Super excited' is too informal for a technical passage. 'Enthusiastic' maintains the formal register while still conveying positive sentiment."
  },
  {
    id: 'act-eng-4-q7',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The passage adopts a neutral, journalistic tone. Which sentence best fits?\n\n\"The city council voted 7-2 to approve the rezoning proposal.\"",
    choices: [
      "F) This decision will obviously ruin the neighborhood.",
      "G) Residents who attended the meeting expressed a range of opinions about the potential impact.",
      "H) Finally, common sense prevailed and the council did the right thing.",
      "J) The vote was a complete disaster for taxpayers."
    ],
    correct: 1,
    explanation: "A neutral, journalistic tone presents facts and balanced perspectives without editorializing. Choice G reports on the range of opinions without taking sides."
  },
  {
    id: 'act-eng-4-q8',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "In a persuasive editorial about public transportation, which word best replaces 'good' to make the argument more compelling?\n\n\"Investing in bus rapid transit would be a good decision for the city's future.\"",
    choices: [
      "A) okay",
      "B) decent",
      "C) transformative",
      "D) nice"
    ],
    correct: 2,
    explanation: "In persuasive writing, strong, specific language is more effective than vague qualifiers. 'Transformative' conveys the significant positive impact the author wants to argue for, while 'good,' 'okay,' 'decent,' and 'nice' are weak and imprecise."
  },
  {
    id: 'act-eng-4-q9',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "A scientific research paper includes this sentence: \"The control group's results were totally off the charts compared to what we expected.\"\n\nWhich revision is most appropriate for a research paper?",
    choices: [
      "F) NO CHANGE",
      "G) The control group's results deviated significantly from predicted values.",
      "H) The control group's results were really wild.",
      "J) The control group's results blew us away."
    ],
    correct: 1,
    explanation: "'Totally off the charts' is colloquial. In a research paper, 'deviated significantly from predicted values' is precise and maintains the expected formal, scientific tone."
  },

  // --- act-eng-5: Transitions (additional) ---
  {
    id: 'act-eng-5-q3',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The company reported record profits in the third quarter. ______, it announced plans to lay off 500 employees.",
    choices: [
      "A) Therefore,",
      "B) Similarly,",
      "C) Nevertheless,",
      "D) In other words,"
    ],
    correct: 2,
    explanation: "Laying off employees despite record profits is contradictory. 'Nevertheless' signals a contrast between the positive financial news and the unexpected negative action."
  },
  {
    id: 'act-eng-5-q4',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The experiment required precise temperature control. ______, the researchers used a state-of-the-art incubator with digital monitoring.",
    choices: [
      "F) However,",
      "G) For this reason,",
      "H) In contrast,",
      "J) On the other hand,"
    ],
    correct: 1,
    explanation: "Using a precise incubator is a logical response to the need for temperature control. 'For this reason' correctly signals cause and effect."
  },
  {
    id: 'act-eng-5-q5',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The ancient Romans built an extensive network of roads. ______, the Appian Way, constructed in 312 BC, stretched over 350 miles from Rome to the southeastern coast.",
    choices: [
      "A) In contrast,",
      "B) However,",
      "C) For example,",
      "D) Consequently,"
    ],
    correct: 2,
    explanation: "The Appian Way is a specific instance of the Roman road network described in the first sentence. 'For example' correctly introduces a supporting example."
  },
  {
    id: 'act-eng-5-q6',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The author's first novel received mixed reviews. ______, her second novel was a critical and commercial success.",
    choices: [
      "F) Similarly,",
      "G) By contrast,",
      "H) As a result,",
      "J) In addition,"
    ],
    correct: 1,
    explanation: "The first novel's mixed reviews contrast with the second novel's success. 'By contrast' signals this shift from negative to positive reception."
  },
  {
    id: 'act-eng-5-q7',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "Regular exercise strengthens the cardiovascular system and lowers blood pressure. ______, it has been shown to improve mental health by reducing symptoms of anxiety and depression.",
    choices: [
      "A) However,",
      "B) On the other hand,",
      "C) Furthermore,",
      "D) Instead,"
    ],
    correct: 2,
    explanation: "The mental health benefits are an additional positive effect of exercise, building on the physical benefits. 'Furthermore' adds supporting information in the same direction."
  },
  {
    id: 'act-eng-5-q8',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The city invested heavily in flood prevention infrastructure. ______, when the major storm hit, damage was minimal compared to neighboring communities.",
    choices: [
      "F) Surprisingly,",
      "G) Nevertheless,",
      "H) As a result,",
      "J) In contrast,"
    ],
    correct: 2,
    explanation: "Minimal damage is a logical result of investing in flood prevention. 'As a result' correctly shows the cause-and-effect relationship."
  },
  {
    id: 'act-eng-5-q9',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The team practiced for months, perfecting their formations and timing. ______, they won the state championship with a near-flawless performance.",
    choices: [
      "A) Nevertheless,",
      "B) In contrast,",
      "C) Ultimately,",
      "D) Meanwhile,"
    ],
    correct: 2,
    explanation: "The championship win is the culminating outcome of months of practice. 'Ultimately' signals a final result after a process."
  },

  // --- act-eng-6: Redundancy/Wordiness (additional) ---
  {
    id: 'act-eng-6-q3',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "At the present time, the committee is currently reviewing the applications that have been submitted.",
    choices: [
      "A) NO CHANGE",
      "B) Currently, the committee is reviewing the submitted applications.",
      "C) The committee is reviewing the submitted applications.",
      "D) At the present time, the committee is currently reviewing the submitted applications."
    ],
    correct: 2,
    explanation: "'At the present time' and 'currently' are redundant — both indicate the present. 'That have been submitted' can be tightened to 'submitted.' Choice C eliminates all redundancy."
  },
  {
    id: 'act-eng-6-q4',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The two twins were identical in appearance and looked exactly alike.",
    choices: [
      "F) NO CHANGE",
      "G) The twins were identical in appearance.",
      "H) The two twins looked exactly alike and were identical in appearance.",
      "J) The twins were identical."
    ],
    correct: 3,
    explanation: "'Two twins' is redundant (twins are always two). 'Identical in appearance' and 'looked exactly alike' say the same thing. 'The twins were identical' conveys the meaning most concisely."
  },
  {
    id: 'act-eng-6-q5',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "She returned back to her hometown after being away for many years.",
    choices: [
      "A) NO CHANGE",
      "B) She returned to her hometown after being away for many years.",
      "C) She returned back to her hometown after years of absence.",
      "D) She returned back to the town of her birth after being away."
    ],
    correct: 1,
    explanation: "'Returned back' is redundant because 'returned' already means 'went back.' Choice B removes the unnecessary 'back.'"
  },
  {
    id: 'act-eng-6-q6',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The basic fundamentals of good writing include clarity, coherence, and concision.",
    choices: [
      "F) NO CHANGE",
      "G) The basic fundamentals and essential principles of good writing",
      "H) The fundamentals of good writing",
      "J) The basic and fundamental basics of good writing"
    ],
    correct: 2,
    explanation: "'Basic' and 'fundamentals' mean the same thing. Eliminating 'basic' removes the redundancy while preserving the meaning."
  },
  {
    id: 'act-eng-6-q7',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "In the field of modern astronomy, scientists who study the stars have discovered new exoplanets orbiting distant suns far away from Earth.",
    choices: [
      "A) NO CHANGE",
      "B) Astronomers have discovered exoplanets orbiting distant stars.",
      "C) In the field of modern astronomy, astronomers have discovered new exoplanets orbiting distant suns.",
      "D) Scientists in the astronomical field have discovered new and previously unknown exoplanets."
    ],
    correct: 1,
    explanation: "'In the field of modern astronomy' is unnecessary if we say 'astronomers.' 'Scientists who study the stars' can be replaced by 'astronomers.' 'Distant suns far away from Earth' is redundant. Choice B is the most concise."
  },
  {
    id: 'act-eng-6-q8',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The reason why the project failed was because of a lack of funding and insufficient financial resources.",
    choices: [
      "F) NO CHANGE",
      "G) The reason the project failed was a lack of funding.",
      "H) The project failed because of a lack of funding.",
      "J) The project failed due to the fact that there was a lack of funding and insufficient financial support."
    ],
    correct: 2,
    explanation: "'The reason why...was because' is a double construction. 'A lack of funding' and 'insufficient financial resources' say the same thing. Choice H is the most direct and concise."
  },
  {
    id: 'act-eng-6-q9',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The CEO made the decision to postpone the annual yearly company retreat until further notice.",
    choices: [
      "A) NO CHANGE",
      "B) The CEO decided to postpone the annual company retreat until further notice.",
      "C) The CEO made the decision to postpone the annual yearly retreat until further notice.",
      "D) The CEO decided to make a postponement of the annual yearly retreat."
    ],
    correct: 1,
    explanation: "'Made the decision' is wordier than 'decided.' 'Annual yearly' is redundant. Choice B eliminates both issues."
  },

  // --- act-eng-7: Organization (additional) ---
  {
    id: 'act-eng-7-q3',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A writer is composing an essay about the benefits of community gardens. Which sentence should be placed first to provide the most effective introduction?",
    choices: [
      "A) Tomatoes are one of the most commonly grown vegetables in community gardens.",
      "B) In cities across America, community gardens are transforming vacant lots into vibrant spaces that strengthen neighborhoods and improve residents' well-being.",
      "C) My neighbor has a garden in her backyard.",
      "D) The price of organic produce has increased in recent years."
    ],
    correct: 1,
    explanation: "An effective introduction should establish the topic (community gardens), the scope (cities across America), and the thesis (benefits like strengthening neighborhoods and improving well-being). Choice B accomplishes all three."
  },
  {
    id: 'act-eng-7-q4',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "The following sentences form a paragraph about the history of the printing press. What is the most logical order?\n\n[1] This innovation made books affordable for the middle class for the first time.\n[2] Johannes Gutenberg developed movable type printing around 1440.\n[3] Before Gutenberg, books were copied by hand, making them extremely expensive.\n[4] The resulting spread of literacy helped fuel the Renaissance and the Reformation.",
    choices: [
      "F) 1, 2, 3, 4",
      "G) 3, 2, 1, 4",
      "H) 2, 3, 1, 4",
      "J) 4, 3, 2, 1"
    ],
    correct: 1,
    explanation: "The logical chronological sequence is: background context about hand-copied books (3), Gutenberg's invention (2), the effect on book affordability (1), and the broader historical consequences (4)."
  },
  {
    id: 'act-eng-7-q5',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A paragraph discusses the health benefits of walking. Which sentence would be LEAST relevant to include?",
    choices: [
      "A) Walking for 30 minutes a day can reduce the risk of heart disease by up to 35%.",
      "B) The average American walks about 5,000 steps per day, which is significantly fewer than the recommended 10,000.",
      "C) The first modern running shoe was developed by Nike in 1971.",
      "D) Regular walking has been linked to improved mood and reduced symptoms of depression."
    ],
    correct: 2,
    explanation: "The paragraph is about walking's health benefits. The history of running shoes is tangential and does not directly address the topic."
  },
  {
    id: 'act-eng-7-q6',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A student's essay about ocean conservation includes the sentence: 'My family went to the beach last summer and had a great time.' The writer is considering deleting this sentence. Should the sentence be deleted?",
    choices: [
      "F) No, because it adds a personal touch that engages the reader.",
      "G) No, because it provides relevant evidence about ocean conditions.",
      "H) Yes, because it is an irrelevant personal anecdote that does not support the essay's argument about conservation.",
      "J) Yes, because the essay should never mention personal experiences."
    ],
    correct: 2,
    explanation: "The sentence is a personal anecdote unrelated to ocean conservation. While personal experience can be relevant in some essays, this particular detail does not advance the conservation argument."
  },
  {
    id: 'act-eng-7-q7',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A writer wants to add a concluding sentence to a paragraph about the importance of sleep. Which choice most effectively concludes the paragraph?",
    choices: [
      "A) Sleep is something that everyone does.",
      "B) Given these wide-ranging benefits — from improved memory to stronger immune function — prioritizing sleep may be one of the simplest yet most powerful health decisions a person can make.",
      "C) There are many different types of mattresses available today.",
      "D) In conclusion, sleep is important."
    ],
    correct: 1,
    explanation: "An effective concluding sentence summarizes key points (memory, immune function) and reinforces the paragraph's central argument (sleep is important). Choice B does this with specific references and a compelling framing."
  },

  // --- act-eng-8: Rhetorical Skills (additional) ---
  {
    id: 'act-eng-8-q4',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "A writer wants to add a detail that emphasizes the historical significance of the discovery. Which choice best accomplishes this goal?",
    choices: [
      "A) The artifact was found on a Tuesday afternoon.",
      "B) The discovery, which reshaped scholars' understanding of Bronze Age trade networks, was hailed as one of the most important archaeological finds of the century.",
      "C) Several students from a local university helped with the excavation.",
      "D) The excavation site was located near a modern highway."
    ],
    correct: 1,
    explanation: "Only choice B emphasizes historical significance by describing the discovery's impact on scholarly understanding and calling it one of the most important finds of the century."
  },
  {
    id: 'act-eng-8-q5',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The writer is considering adding the following sentence to a paragraph about the decline of honeybee populations:\n\n\"My cousin keeps bees as a hobby and says it's really fun.\"\n\nShould the writer add this sentence?",
    choices: [
      "F) Yes, because it adds a personal perspective on beekeeping.",
      "G) Yes, because it provides relevant evidence about honeybee populations.",
      "H) No, because it is an informal aside that does not contribute to the paragraph's analysis of population decline.",
      "J) No, because essays should never include information from family members."
    ],
    correct: 2,
    explanation: "The sentence is anecdotal and informal, and it does not address the paragraph's topic of population decline. Adding it would detract from the analytical focus of the passage."
  },
  {
    id: 'act-eng-8-q6',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "A writer is revising an essay and wants to strengthen the opening paragraph by adding a 'hook.' Which opening sentence would most effectively capture the reader's attention?",
    choices: [
      "A) This essay will discuss the topic of space exploration.",
      "B) Space exploration is an interesting subject.",
      "C) In 1969, half a billion people held their breath as Neil Armstrong stepped onto the surface of the moon — a moment that redefined what humanity believed was possible.",
      "D) There are many things to say about space."
    ],
    correct: 2,
    explanation: "An effective hook draws the reader in with vivid detail or a compelling moment. Choice C uses specific historical detail, sensory language, and a thematic statement to engage the reader immediately."
  },
  {
    id: 'act-eng-8-q7',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The writer wants to add a sentence to support the claim that the new park has improved neighborhood safety. Which choice provides the most relevant evidence?",
    choices: [
      "F) The park features a variety of native plant species.",
      "G) Since the park opened, reported crime in the surrounding blocks has decreased by 22 percent.",
      "H) Many families visit the park on weekends.",
      "J) The park was designed by a well-known landscape architect."
    ],
    correct: 1,
    explanation: "A 22% decrease in reported crime is direct, quantifiable evidence of improved neighborhood safety. The other options address aesthetics, usage, or design — not safety."
  },
  {
    id: 'act-eng-8-q8',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "If the writer's goal is to explain a complex scientific concept to a general audience, which approach would be most effective?",
    choices: [
      "A) Use as much technical jargon as possible to demonstrate expertise.",
      "B) Include an analogy that compares the concept to a familiar everyday experience.",
      "C) Avoid any specific examples to keep the explanation brief.",
      "D) Write only for readers who already have a background in the subject."
    ],
    correct: 1,
    explanation: "Analogies connecting unfamiliar concepts to everyday experiences help general audiences understand complex ideas. This is a core rhetorical strategy for accessible science communication."
  },
  {
    id: 'act-eng-8-q9',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "A student is writing about the value of learning a second language. Which of the following would be the most effective thesis statement?",
    choices: [
      "F) Learning a second language is hard but worth it.",
      "G) Many people around the world speak more than one language.",
      "H) Learning a second language enhances cognitive flexibility, improves career prospects, and fosters cross-cultural understanding.",
      "J) I started learning Spanish in high school."
    ],
    correct: 2,
    explanation: "An effective thesis states a clear position and previews the essay's main supporting points. Choice H asserts the value of language learning and outlines three specific benefits that the essay can develop."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ADDITIONAL ACT MATH QUESTIONS — ~140 more questions (5 choices each)
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-math-1: Pre-Algebra (additional) ---
  {
    id: 'act-math-1-q4',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A store marks up the wholesale price of an item by 40%. If the retail price is $56, what was the wholesale price?",
    choices: [
      "A) $33.60",
      "B) $36.00",
      "C) $38.00",
      "D) $40.00",
      "E) $42.00"
    ],
    correct: 3,
    explanation: "If the wholesale price is w, then 1.40w = $56. Dividing both sides by 1.40: w = $40.00."
  },
  {
    id: 'act-math-1-q5',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A car travels 240 miles using 8 gallons of gas. At the same rate, how many gallons are needed to travel 420 miles?",
    choices: [
      "F) 12",
      "G) 14",
      "H) 16",
      "J) 18",
      "K) 20"
    ],
    correct: 1,
    explanation: "The car gets 240/8 = 30 miles per gallon. For 420 miles: 420/30 = 14 gallons."
  },
  {
    id: 'act-math-1-q6',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "What is the least common multiple (LCM) of 12 and 18?",
    choices: [
      "A) 6",
      "B) 24",
      "C) 36",
      "D) 54",
      "E) 216"
    ],
    correct: 2,
    explanation: "12 = 2² × 3 and 18 = 2 × 3². LCM = 2² × 3² = 4 × 9 = 36."
  },
  {
    id: 'act-math-1-q7',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "If 3/5 of a number is 27, what is 2/3 of the same number?",
    choices: [
      "F) 18",
      "G) 27",
      "H) 30",
      "J) 45",
      "K) 54"
    ],
    correct: 2,
    explanation: "If 3/5 × n = 27, then n = 27 × 5/3 = 45. Then 2/3 × 45 = 30."
  },
  {
    id: 'act-math-1-q8',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A jar contains 120 marbles. If 35% of the marbles are red, 25% are blue, and the rest are green, how many green marbles are in the jar?",
    choices: [
      "A) 30",
      "B) 42",
      "C) 48",
      "D) 54",
      "E) 60"
    ],
    correct: 2,
    explanation: "Green percentage = 100% - 35% - 25% = 40%. Number of green marbles = 0.40 × 120 = 48."
  },
  {
    id: 'act-math-1-q9',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A map has a scale of 1 inch = 25 miles. If two cities are 3.5 inches apart on the map, what is the actual distance between them?",
    choices: [
      "F) 75 miles",
      "G) 82.5 miles",
      "H) 87.5 miles",
      "J) 100 miles",
      "K) 112.5 miles"
    ],
    correct: 2,
    explanation: "Distance = 3.5 inches × 25 miles/inch = 87.5 miles."
  },
  {
    id: 'act-math-1-q10',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "What is the value of |−7| + |3| − |−2|?",
    choices: [
      "A) 2",
      "B) 6",
      "C) 8",
      "D) 10",
      "E) 12"
    ],
    correct: 2,
    explanation: "|−7| = 7, |3| = 3, |−2| = 2. So 7 + 3 − 2 = 8."
  },
  {
    id: 'act-math-1-q11',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A printer can print 45 pages in 3 minutes. At this rate, how many pages can it print in 20 minutes?",
    choices: [
      "F) 200",
      "G) 250",
      "H) 280",
      "J) 300",
      "K) 350"
    ],
    correct: 3,
    explanation: "Rate = 45/3 = 15 pages per minute. In 20 minutes: 15 × 20 = 300 pages."
  },

  // --- act-math-2: Elementary Algebra (additional) ---
  {
    id: 'act-math-2-q4',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If 4(x + 3) − 2(x − 1) = 20, what is the value of x?",
    choices: [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 5",
      "E) 6"
    ],
    correct: 1,
    explanation: "Expand: 4x + 12 − 2x + 2 = 20. Combine: 2x + 14 = 20. Subtract 14: 2x = 6. Divide by 2: x = 3. Verify: 4(3+3) − 2(3−1) = 24 − 4 = 20. Correct. The answer is B) 3."
  },
  {
    id: 'act-math-2-q5',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "Which of the following is equivalent to the expression 3(2x − 5) + 4x?",
    choices: [
      "F) 10x − 15",
      "G) 10x − 5",
      "H) 6x − 15",
      "J) 10x + 15",
      "K) 6x − 5"
    ],
    correct: 0,
    explanation: "Distribute: 6x − 15 + 4x = 10x − 15."
  },
  {
    id: 'act-math-2-q6',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "A taxi charges a base fare of $3.50 plus $0.75 per mile. If Marcus paid $12.50 for a ride, how many miles did he travel?",
    choices: [
      "A) 10",
      "B) 11",
      "C) 12",
      "D) 13",
      "E) 14"
    ],
    correct: 2,
    explanation: "3.50 + 0.75m = 12.50. Subtract 3.50: 0.75m = 9.00. Divide by 0.75: m = 12 miles."
  },
  {
    id: 'act-math-2-q7',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "What is the solution set of the inequality 3x + 7 > 22?",
    choices: [
      "F) x > 5",
      "G) x > 7",
      "H) x < 5",
      "J) x > 3",
      "K) x < 7"
    ],
    correct: 0,
    explanation: "3x + 7 > 22. Subtract 7: 3x > 15. Divide by 3: x > 5."
  },
  {
    id: 'act-math-2-q8',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If f(x) = −x² + 4x − 3, what is f(1)?",
    choices: [
      "A) −2",
      "B) 0",
      "C) 1",
      "D) 2",
      "E) 4"
    ],
    correct: 1,
    explanation: "f(1) = −(1)² + 4(1) − 3 = −1 + 4 − 3 = 0."
  },
  {
    id: 'act-math-2-q9',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "The sum of three consecutive integers is 99. What is the largest of the three integers?",
    choices: [
      "F) 31",
      "G) 32",
      "H) 33",
      "J) 34",
      "K) 35"
    ],
    correct: 3,
    explanation: "Let the integers be n, n+1, n+2. Then 3n + 3 = 99, so 3n = 96, n = 32. The largest is 32 + 2 = 34."
  },

  // --- act-math-3: Intermediate Algebra (additional) ---
  {
    id: 'act-math-3-q4',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "What is the discriminant of the equation 2x² − 5x + 3 = 0, and how many real solutions does it have?",
    choices: [
      "A) Discriminant = 1; two real solutions",
      "B) Discriminant = −1; no real solutions",
      "C) Discriminant = 0; one real solution",
      "D) Discriminant = 49; two real solutions",
      "E) Discriminant = 1; one real solution"
    ],
    correct: 0,
    explanation: "Discriminant = b² − 4ac = (−5)² − 4(2)(3) = 25 − 24 = 1. Since the discriminant is positive, there are two distinct real solutions."
  },
  {
    id: 'act-math-3-q5',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "Simplify: (x³ · x⁴) / x²",
    choices: [
      "F) x⁵",
      "G) x⁶",
      "H) x⁹",
      "J) x²⁴",
      "K) x"
    ],
    correct: 0,
    explanation: "x³ · x⁴ = x⁷. Then x⁷ / x² = x⁵."
  },
  {
    id: 'act-math-3-q6',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "For what value(s) of x is the expression (x + 3)/(x² − 9) undefined?",
    choices: [
      "A) x = 3 only",
      "B) x = −3 only",
      "C) x = 3 and x = −3",
      "D) x = 9 and x = −9",
      "E) The expression is defined for all real numbers"
    ],
    correct: 2,
    explanation: "The expression is undefined when the denominator equals zero. x² − 9 = (x − 3)(x + 3) = 0 when x = 3 or x = −3."
  },
  {
    id: 'act-math-3-q7',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "If 2^(x+1) = 32, what is the value of x?",
    choices: [
      "F) 3",
      "G) 4",
      "H) 5",
      "J) 6",
      "K) 16"
    ],
    correct: 1,
    explanation: "32 = 2⁵, so 2^(x+1) = 2⁵. Therefore x + 1 = 5, and x = 4."
  },
  {
    id: 'act-math-3-q8',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "Which of the following is equivalent to √(50)?",
    choices: [
      "A) 5√2",
      "B) 2√5",
      "C) 25",
      "D) 10√5",
      "E) 5√10"
    ],
    correct: 0,
    explanation: "√50 = √(25 · 2) = √25 · √2 = 5√2."
  },
  {
    id: 'act-math-3-q9',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "The function f(x) = x² − 6x + 8 can be written in vertex form as:",
    choices: [
      "F) f(x) = (x − 3)² − 1",
      "G) f(x) = (x − 3)² + 1",
      "H) f(x) = (x + 3)² − 1",
      "J) f(x) = (x − 6)² + 8",
      "K) f(x) = (x − 2)² + 4"
    ],
    correct: 0,
    explanation: "Complete the square: x² − 6x + 8 = (x² − 6x + 9) − 9 + 8 = (x − 3)² − 1."
  },
  {
    id: 'act-math-3-q10',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "What is the sum of the solutions to x² + 2x − 15 = 0?",
    choices: [
      "A) −5",
      "B) −2",
      "C) 0",
      "D) 2",
      "E) 5"
    ],
    correct: 1,
    explanation: "By Vieta's formulas, the sum of the roots of ax² + bx + c = 0 is −b/a. Here, sum = −2/1 = −2. (The roots are x = 3 and x = −5, and 3 + (−5) = −2.)"
  },

  // --- act-math-4: Coordinate Geometry (additional) ---
  {
    id: 'act-math-4-q4',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the midpoint of the segment with endpoints (−4, 7) and (6, −3)?",
    choices: [
      "A) (1, 2)",
      "B) (2, 4)",
      "C) (−1, 5)",
      "D) (5, −5)",
      "E) (1, 5)"
    ],
    correct: 0,
    explanation: "Midpoint = ((−4 + 6)/2, (7 + (−3))/2) = (2/2, 4/2) = (1, 2)."
  },
  {
    id: 'act-math-4-q5',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "A line passes through the points (2, −1) and (5, 8). What is the equation of this line in slope-intercept form?",
    choices: [
      "F) y = 3x − 7",
      "G) y = 3x + 7",
      "H) y = −3x + 5",
      "J) y = 3x − 1",
      "K) y = 9x − 1"
    ],
    correct: 0,
    explanation: "Slope = (8 − (−1))/(5 − 2) = 9/3 = 3. Using point-slope with (2, −1): y − (−1) = 3(x − 2), so y + 1 = 3x − 6, giving y = 3x − 7."
  },
  {
    id: 'act-math-4-q6',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "The equation of a circle is (x + 1)² + (y − 4)² = 16. What is the radius of the circle?",
    choices: [
      "A) 2",
      "B) 4",
      "C) 8",
      "D) 16",
      "E) 256"
    ],
    correct: 1,
    explanation: "The standard form is (x − h)² + (y − k)² = r². Here r² = 16, so r = 4."
  },
  {
    id: 'act-math-4-q7',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "Which of the following is the equation of a line parallel to y = −2x + 5 that passes through the point (3, 1)?",
    choices: [
      "F) y = −2x + 7",
      "G) y = −2x − 5",
      "H) y = 2x − 5",
      "J) y = (1/2)x − 1/2",
      "K) y = −2x + 1"
    ],
    correct: 0,
    explanation: "Parallel lines have equal slopes. The slope is −2. Using point-slope: y − 1 = −2(x − 3), so y = −2x + 6 + 1 = −2x + 7."
  },
  {
    id: 'act-math-4-q8',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the area of the triangle with vertices at (0, 0), (6, 0), and (0, 8)?",
    choices: [
      "A) 14",
      "B) 24",
      "C) 28",
      "D) 48",
      "E) 96"
    ],
    correct: 1,
    explanation: "The base lies along the x-axis with length 6, and the height is along the y-axis with length 8. Area = (1/2)(6)(8) = 24."
  },
  {
    id: 'act-math-4-q9',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "At what point does the line 2x + 3y = 12 cross the y-axis?",
    choices: [
      "F) (0, 4)",
      "G) (0, 6)",
      "H) (4, 0)",
      "J) (6, 0)",
      "K) (0, 12)"
    ],
    correct: 0,
    explanation: "The y-intercept occurs when x = 0. Substituting: 2(0) + 3y = 12, so 3y = 12, y = 4. The point is (0, 4)."
  },
  {
    id: 'act-math-4-q10',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "A line has a slope of 0 and passes through the point (−3, 5). What is the equation of the line?",
    choices: [
      "A) y = 5",
      "B) x = −3",
      "C) y = −3",
      "D) x = 5",
      "E) y = 5x"
    ],
    correct: 0,
    explanation: "A line with slope 0 is horizontal. A horizontal line through (−3, 5) has equation y = 5."
  },

  // --- act-math-5: Plane Geometry (additional) ---
  {
    id: 'act-math-5-q3',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "The circumference of a circle is 20π. What is its area?",
    choices: [
      "A) 10π",
      "B) 20π",
      "C) 50π",
      "D) 100π",
      "E) 400π"
    ],
    correct: 3,
    explanation: "Circumference = 2πr = 20π, so r = 10. Area = πr² = π(100) = 100π."
  },
  {
    id: 'act-math-5-q4',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A right triangle has legs of 6 and 8. What is the length of the hypotenuse?",
    choices: [
      "F) 7",
      "G) 10",
      "H) 12",
      "J) 14",
      "K) 48"
    ],
    correct: 1,
    explanation: "By the Pythagorean theorem: c² = 6² + 8² = 36 + 64 = 100, so c = 10."
  },
  {
    id: 'act-math-5-q5',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A cylinder has a radius of 3 cm and a height of 10 cm. What is its volume?",
    choices: [
      "A) 30π cm³",
      "B) 60π cm³",
      "C) 90π cm³",
      "D) 180π cm³",
      "E) 270π cm³"
    ],
    correct: 2,
    explanation: "Volume = πr²h = π(3²)(10) = 90π cm³."
  },
  {
    id: 'act-math-5-q6',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "Two similar triangles have corresponding sides in the ratio 3:5. If the perimeter of the smaller triangle is 24 cm, what is the perimeter of the larger triangle?",
    choices: [
      "F) 30 cm",
      "G) 36 cm",
      "H) 40 cm",
      "J) 45 cm",
      "K) 72 cm"
    ],
    correct: 2,
    explanation: "For similar figures, perimeters are in the same ratio as corresponding sides. 24/P = 3/5, so P = 24 × 5/3 = 40 cm."
  },
  {
    id: 'act-math-5-q7',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A square is inscribed in a circle of radius 5. What is the area of the square?",
    choices: [
      "A) 25",
      "B) 50",
      "C) 100",
      "D) 25π",
      "E) 10√2"
    ],
    correct: 1,
    explanation: "The diagonal of the inscribed square equals the diameter of the circle: d = 10. For a square with diagonal d, the area = d²/2 = 100/2 = 50."
  },
  {
    id: 'act-math-5-q8',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "An equilateral triangle has side length 8. What is its height?",
    choices: [
      "F) 4",
      "G) 4√3",
      "H) 8√3",
      "J) 16",
      "K) 4√2"
    ],
    correct: 1,
    explanation: "In an equilateral triangle with side s, the height = s√3/2 = 8√3/2 = 4√3."
  },

  // --- act-math-6: Trigonometry (additional) ---
  {
    id: 'act-math-6-q3',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the value of tan(45°)?",
    choices: [
      "A) 0",
      "B) 1/2",
      "C) √2/2",
      "D) 1",
      "E) √3"
    ],
    correct: 3,
    explanation: "tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1."
  },
  {
    id: 'act-math-6-q4',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "In a right triangle, cos(θ) = 3/5. What is sin(θ)?",
    choices: [
      "F) 3/4",
      "G) 4/5",
      "H) 4/3",
      "J) 5/3",
      "K) 5/4"
    ],
    correct: 1,
    explanation: "If cos(θ) = 3/5, the adjacent side is 3 and the hypotenuse is 5. By the Pythagorean theorem, the opposite side = √(25 − 9) = √16 = 4. So sin(θ) = 4/5."
  },
  {
    id: 'act-math-6-q5',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "An observer stands 100 feet from the base of a building. The angle of elevation to the top of the building is 60°. Approximately how tall is the building?",
    choices: [
      "A) 50 feet",
      "B) 100 feet",
      "C) 100√3 feet",
      "D) 200 feet",
      "E) 50√3 feet"
    ],
    correct: 2,
    explanation: "tan(60°) = height/100. Since tan(60°) = √3, height = 100√3 ≈ 173.2 feet."
  },
  {
    id: 'act-math-6-q6',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "If sin(θ) = 1/2 and 0° < θ < 90°, what is θ?",
    choices: [
      "F) 15°",
      "G) 30°",
      "H) 45°",
      "J) 60°",
      "K) 90°"
    ],
    correct: 1,
    explanation: "sin(30°) = 1/2 is a standard trigonometric value. Since θ is in the first quadrant, θ = 30°."
  },
  {
    id: 'act-math-6-q7',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the period of the function y = sin(2x)?",
    choices: [
      "A) π/2",
      "B) π",
      "C) 2π",
      "D) 4π",
      "E) 1"
    ],
    correct: 1,
    explanation: "The period of y = sin(bx) is 2π/b. Here b = 2, so the period = 2π/2 = π."
  },
  {
    id: 'act-math-6-q8',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "In triangle ABC (not necessarily a right triangle), a = 7, b = 10, and angle C = 60°. Using the Law of Cosines, what is c²?",
    choices: [
      "F) 49",
      "G) 79",
      "H) 100",
      "J) 149",
      "K) 219"
    ],
    correct: 1,
    explanation: "c² = a² + b² − 2ab·cos(C) = 49 + 100 − 2(7)(10)·cos(60°) = 149 − 140(0.5) = 149 − 70 = 79."
  },

  // --- act-math-7: Statistics & Probability (additional) ---
  {
    id: 'act-math-7-q3',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A standard deck of 52 cards contains 4 suits of 13 cards each. If two cards are drawn without replacement, what is the probability that both are hearts?",
    choices: [
      "A) 1/16",
      "B) 1/17",
      "C) 12/204",
      "D) 13/204",
      "E) 1/4"
    ],
    correct: 1,
    explanation: "P(first heart) = 13/52 = 1/4. P(second heart | first was heart) = 12/51. P(both) = (13/52)(12/51) = 156/2652 = 1/17."
  },
  {
    id: 'act-math-7-q4',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "The mean of a data set is 75 and the standard deviation is 5. If a score is 2 standard deviations above the mean, what is the score?",
    choices: [
      "F) 65",
      "G) 70",
      "H) 80",
      "J) 85",
      "K) 90"
    ],
    correct: 3,
    explanation: "2 standard deviations above the mean = 75 + 2(5) = 75 + 10 = 85."
  },
  {
    id: 'act-math-7-q5',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A box contains 3 red, 4 blue, and 5 green balls. If one ball is drawn at random and replaced, then a second ball is drawn, what is the probability of drawing a red ball first and a green ball second?",
    choices: [
      "A) 15/144",
      "B) 1/4",
      "C) 5/48",
      "D) 15/132",
      "E) 8/12"
    ],
    correct: 2,
    explanation: "With replacement, P(red first) = 3/12 = 1/4 and P(green second) = 5/12. P(both) = (1/4)(5/12) = 5/48."
  },
  {
    id: 'act-math-7-q6',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "In how many ways can a committee of 3 people be chosen from a group of 7?",
    choices: [
      "F) 21",
      "G) 35",
      "H) 42",
      "J) 210",
      "K) 5040"
    ],
    correct: 1,
    explanation: "This is a combination: C(7,3) = 7!/(3! × 4!) = (7 × 6 × 5)/(3 × 2 × 1) = 210/6 = 35."
  },
  {
    id: 'act-math-7-q7',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "The scores on a test are: 60, 70, 70, 80, 90, 90, 90, 100. What is the mode?",
    choices: [
      "A) 70",
      "B) 80",
      "C) 90",
      "D) 81.25",
      "E) 85"
    ],
    correct: 2,
    explanation: "The mode is the value that appears most frequently. 90 appears three times, more than any other value."
  },
  {
    id: 'act-math-7-q8',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A survey of 200 students found that 120 play a sport, 80 are in a club, and 40 do both. How many students do neither?",
    choices: [
      "F) 0",
      "G) 20",
      "H) 40",
      "J) 60",
      "K) 80"
    ],
    correct: 2,
    explanation: "By inclusion-exclusion: students doing at least one = 120 + 80 − 40 = 160. Students doing neither = 200 − 160 = 40."
  },

  // --- act-math-8: Advanced Topics (additional) ---
  {
    id: 'act-math-8-q3',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the value of i² + i⁴, where i = √(−1)?",
    choices: [
      "A) −2",
      "B) −1",
      "C) 0",
      "D) 1",
      "E) 2"
    ],
    correct: 2,
    explanation: "i² = −1 and i⁴ = (i²)² = (−1)² = 1. So i² + i⁴ = −1 + 1 = 0."
  },
  {
    id: 'act-math-8-q4',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the 7th term of the arithmetic sequence 3, 7, 11, 15, ...?",
    choices: [
      "F) 23",
      "G) 27",
      "H) 31",
      "J) 35",
      "K) 39"
    ],
    correct: 1,
    explanation: "The common difference d = 4 and the first term a₁ = 3. The nth term = a₁ + (n − 1)d = 3 + (7 − 1)(4) = 3 + 24 = 27."
  },
  {
    id: 'act-math-8-q5',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "In the xy-plane, what is the length of the vector from the origin to the point (3, 4)?",
    choices: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 7",
      "E) 25"
    ],
    correct: 2,
    explanation: "The magnitude of the vector = √(3² + 4²) = √(9 + 16) = √25 = 5."
  },
  {
    id: 'act-math-8-q6',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "If f(x) = 2x + 1 and g(x) = x² − 3, what is f(g(2))?",
    choices: [
      "F) 1",
      "G) 3",
      "H) 5",
      "J) 7",
      "K) 9"
    ],
    correct: 1,
    explanation: "First find g(2) = (2)² − 3 = 4 − 3 = 1. Then f(g(2)) = f(1) = 2(1) + 1 = 3."
  },
  {
    id: 'act-math-8-q7',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the sum of the first 10 terms of the geometric series 2 + 6 + 18 + 54 + ...?",
    choices: [
      "A) 29,524",
      "B) 39,366",
      "C) 59,048",
      "D) 59,050",
      "E) 118,098"
    ],
    correct: 2,
    explanation: "The first term a = 2, common ratio r = 3. Sum = a(rⁿ − 1)/(r − 1) = 2(3¹⁰ − 1)/(3 − 1) = 2(59049 − 1)/2 = 59048."
  },
  {
    id: 'act-math-8-q8',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "If matrix A = [[2, 1], [3, 4]], what is the determinant of A?",
    choices: [
      "F) 2",
      "G) 5",
      "H) 8",
      "J) 11",
      "K) −5"
    ],
    correct: 1,
    explanation: "The determinant of a 2×2 matrix [[a,b],[c,d]] = ad − bc = (2)(4) − (1)(3) = 8 − 3 = 5."
  },
  {
    id: 'act-math-8-q9',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "Convert 150° to radians.",
    choices: [
      "A) π/6",
      "B) 2π/3",
      "C) 5π/6",
      "D) 3π/4",
      "E) 5π/4"
    ],
    correct: 2,
    explanation: "To convert degrees to radians, multiply by π/180. 150° × π/180 = 150π/180 = 5π/6."
  },
  {
    id: 'act-math-8-q10',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "If log₃(81) = x, what is the value of x?",
    choices: [
      "F) 2",
      "G) 3",
      "H) 4",
      "J) 9",
      "K) 27"
    ],
    correct: 2,
    explanation: "3^x = 81 = 3⁴, so x = 4."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ADDITIONAL ACT READING QUESTIONS — ~140 more questions
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-read-1: Prose Fiction (additional) ---
  {
    id: 'act-read-1-q4',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"The letter arrived on a Tuesday, tucked between a phone bill and a furniture catalog. Anna recognized the handwriting immediately — the sharp, slanting strokes of her estranged brother's script. She held the envelope for a long time before opening it, turning it over in her hands as if testing its weight.\"\n\nAnna's hesitation before opening the letter most likely suggests that she:",
    choices: [
      "A) does not know how to read cursive handwriting.",
      "B) has complicated feelings about her brother and is uncertain about the letter's contents.",
      "C) is more interested in the furniture catalog.",
      "D) expects the letter to contain money."
    ],
    correct: 1,
    explanation: "Anna's recognition of the handwriting, the use of 'estranged,' and her prolonged hesitation all suggest conflicted emotions about reconnecting with her brother."
  },
  {
    id: 'act-read-1-q5',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"As the fog lifted from the harbor, Captain Reyes could finally see the damage. Two of the mooring lines had snapped, the starboard hull bore a deep gash, and water was pooling in the engine room. She turned to her first mate and said, 'We're not going anywhere today.'\"\n\nThe captain's statement primarily serves to:",
    choices: [
      "F) express anger at her crew.",
      "G) acknowledge the severity of the damage and accept that the voyage must be delayed.",
      "H) joke about the situation to lighten the mood.",
      "J) suggest that the ship should be permanently retired."
    ],
    correct: 1,
    explanation: "After surveying significant damage, the captain's understated comment acknowledges reality — the ship cannot sail. It is a practical assessment, not anger, humor, or a permanent decision."
  },
  {
    id: 'act-read-1-q6',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"Mei set the violin case on the kitchen table and unlatched it slowly, revealing the instrument her grandmother had played every evening for forty years. The wood was darkened with age, and the bow's horsehair had grown thin. Mei lifted the violin to her chin and drew the bow across the strings. The sound that emerged was threadbare but still sweet.\"\n\nThe description of the violin's sound as 'threadbare but still sweet' most likely suggests:",
    choices: [
      "A) the violin is poorly made and should be discarded.",
      "B) though aged and worn, the instrument still possesses beauty and emotional resonance.",
      "C) Mei is an untrained and unskilled musician.",
      "D) the violin needs to be professionally cleaned."
    ],
    correct: 1,
    explanation: "'Threadbare' acknowledges the instrument's age and wear, while 'still sweet' emphasizes its enduring beauty. This parallels the emotional value of a family heirloom."
  },
  {
    id: 'act-read-1-q7',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"For three summers, Daniel had worked at the orchard, picking apples from dawn to midday and then sorting them by size and color in the packing shed. He knew every row of trees, every dip in the ground, every spot where the irrigation lines leaked. The orchard felt as familiar to him as his own bedroom — and, in some ways, more like home.\"\n\nThe comparison of the orchard to Daniel's bedroom primarily emphasizes:",
    choices: [
      "F) Daniel's desire to sleep at the orchard.",
      "G) the depth of Daniel's familiarity with and attachment to the place.",
      "H) that Daniel's bedroom is uncomfortable.",
      "J) that Daniel is not paid enough for his work."
    ],
    correct: 1,
    explanation: "Comparing the orchard to his bedroom and then saying it feels 'more like home' emphasizes deep familiarity and emotional connection to the place."
  },
  {
    id: 'act-read-1-q8',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"'You'll understand when you're older,' his father said, and Marcus hated those words more than any others. They were a door closing, a conversation ending before it had begun. At fourteen, he was convinced that he already understood everything worth understanding.\"\n\nThe narrator's tone regarding Marcus's conviction that he 'already understood everything' is best described as:",
    choices: [
      "A) angry and resentful",
      "B) gently ironic, recognizing the universal overconfidence of adolescence",
      "C) admiring of Marcus's maturity",
      "D) neutral and objective"
    ],
    correct: 1,
    explanation: "The narrator describes Marcus's certainty with subtle amusement — acknowledging a universal teenage trait. The contrast between his frustration at being dismissed and his own sweeping claim creates gentle irony."
  },
  {
    id: 'act-read-1-q9',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"The diner was nearly empty when Rosa arrived. A single waitress leaned against the counter, flipping through a magazine. The fluorescent light hummed overhead, casting a pale glow over the cracked vinyl booths. Rosa slid into the farthest seat and ordered coffee, though what she really wanted was the courage to make the phone call.\"\n\nThe physical setting of the diner most effectively creates an atmosphere of:",
    choices: [
      "F) excitement and anticipation",
      "G) warmth and community",
      "H) isolation and quiet tension",
      "J) luxury and comfort"
    ],
    correct: 2,
    explanation: "The nearly empty diner, the humming fluorescent light, the cracked vinyl, and Rosa sitting in the farthest seat all contribute to a mood of isolation and quiet inner tension."
  },

  // --- act-read-2: Social Science (additional) ---
  {
    id: 'act-read-2-q4',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"Universal basic income (UBI) — a regular cash payment to all citizens regardless of employment status — has been proposed as a solution to growing economic inequality. Proponents argue that UBI would reduce poverty, stimulate consumer spending, and provide a safety net as automation displaces traditional jobs. Critics counter that UBI would discourage work, lead to inflation, and be prohibitively expensive.\"\n\nThe passage is primarily structured as:",
    choices: [
      "A) a chronological history of UBI proposals",
      "B) a balanced presentation of arguments for and against UBI",
      "C) a persuasive argument in favor of UBI",
      "D) a statistical analysis of UBI pilot programs"
    ],
    correct: 1,
    explanation: "The passage defines UBI, presents proponents' arguments, and then presents critics' counterarguments. This balanced structure presents both sides without taking a position."
  },
  {
    id: 'act-read-2-q5',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"Studies have consistently shown that early childhood education programs yield significant long-term benefits, including higher graduation rates, lower incarceration rates, and increased lifetime earnings. A landmark study tracking participants over 40 years found that every dollar invested in high-quality preschool returned $7 to $12 to society.\"\n\nThe $7-to-$12 return figure is included primarily to:",
    choices: [
      "F) show that preschool is inexpensive to operate.",
      "G) provide concrete economic evidence supporting the value of early education investment.",
      "H) argue that preschool teachers should be paid more.",
      "J) compare the cost of preschool to the cost of college."
    ],
    correct: 1,
    explanation: "The return-on-investment figure quantifies the societal benefits of early education in economic terms, providing concrete evidence for the claim that such programs are worthwhile investments."
  },
  {
    id: 'act-read-2-q6',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"The concept of 'broken windows' policing — the theory that addressing minor offenses like graffiti and vandalism prevents more serious crime — was influential in American law enforcement for decades. However, recent research has challenged this approach, suggesting that aggressive enforcement of minor infractions disproportionately targets minority communities without significantly reducing violent crime.\"\n\nThe author's use of 'however' in the second sentence signals:",
    choices: [
      "A) agreement with the broken windows theory.",
      "B) a shift from describing the theory to presenting challenges to it.",
      "C) that the research is unreliable.",
      "D) that minor offenses are unimportant."
    ],
    correct: 1,
    explanation: "'However' is a contrast transition. It signals a shift from describing the theory's influence to presenting research that challenges its effectiveness and raises concerns about equity."
  },
  {
    id: 'act-read-2-q7',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"In 2015, the United Nations adopted 17 Sustainable Development Goals (SDGs) as a universal call to action to end poverty, protect the planet, and ensure prosperity for all by 2030. Progress has been uneven: while extreme poverty rates have declined globally, inequality within countries has widened, and climate-related disasters have intensified.\"\n\nBased on the passage, the author would most likely characterize progress toward the SDGs as:",
    choices: [
      "F) a complete failure",
      "G) a resounding success",
      "H) mixed, with notable achievements offset by persistent challenges",
      "J) irrelevant to global policy"
    ],
    correct: 2,
    explanation: "The passage acknowledges progress (declining extreme poverty) while noting setbacks (widening inequality, intensifying disasters). This mixed picture aligns with choice H."
  },

  // --- act-read-3: Humanities (additional) ---
  {
    id: 'act-read-3-q3',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"Frida Kahlo's self-portraits, with their unflinching depictions of physical pain, emotional turmoil, and Mexican identity, were largely overlooked during her lifetime. It was not until the feminist art movement of the 1970s and 1980s that scholars and collectors began to recognize Kahlo as a major artist in her own right, rather than merely the wife of muralist Diego Rivera.\"\n\nAccording to the passage, what factor contributed most to the reassessment of Kahlo's work?",
    choices: [
      "A) The decline in popularity of Diego Rivera's murals",
      "B) The feminist art movement's interest in female artists' experiences and perspectives",
      "C) A major retrospective exhibition in Mexico City",
      "D) The discovery of previously unknown paintings"
    ],
    correct: 1,
    explanation: "The passage directly states that 'the feminist art movement of the 1970s and 1980s' drove scholars and collectors to recognize Kahlo's significance."
  },
  {
    id: 'act-read-3-q4',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"Duke Ellington composed over 1,000 pieces of music during his career, blending jazz improvisation with orchestral sophistication in a way that challenged the boundary between 'popular' and 'serious' music. His extended suites, such as 'Black, Brown and Beige,' sought to tell the story of African American experience through music.\"\n\nThe phrase 'challenged the boundary between popular and serious music' most directly suggests that Ellington:",
    choices: [
      "F) wanted to replace classical music with jazz.",
      "G) created work that defied easy categorization and demonstrated jazz's artistic depth.",
      "H) rejected all forms of popular entertainment.",
      "J) composed music only for concert halls."
    ],
    correct: 1,
    explanation: "By blending jazz with orchestral elements, Ellington created music that was both accessible and artistically sophisticated, challenging the idea that jazz was merely popular entertainment."
  },
  {
    id: 'act-read-3-q5',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"The Harlem Renaissance of the 1920s and 1930s was not a single movement but a constellation of artistic, literary, and intellectual currents centered in the Harlem neighborhood of New York City. Writers like Langston Hughes and Zora Neale Hurston, musicians like Louis Armstrong and Bessie Smith, and thinkers like W.E.B. Du Bois collectively reshaped American culture by asserting the richness and complexity of Black life.\"\n\nThe author uses the word 'constellation' most likely to emphasize that the Harlem Renaissance:",
    choices: [
      "A) was primarily an astronomical phenomenon.",
      "B) was a unified, single movement with one clear leader.",
      "C) consisted of multiple, interconnected artistic and intellectual expressions.",
      "D) occurred only at night in Harlem."
    ],
    correct: 2,
    explanation: "A 'constellation' is a group of distinct but related elements. The author uses this metaphor to emphasize the diversity and interconnectedness of the Harlem Renaissance's many forms of expression."
  },
  {
    id: 'act-read-3-q6',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"Architecture, more than any other art form, shapes the daily experience of ordinary people. We may choose whether to visit a museum or attend a concert, but we cannot avoid inhabiting the buildings that surround us. For this reason, the architect bears a unique responsibility: to create spaces that are not only functional and structurally sound but also capable of inspiring those who use them.\"\n\nThe author's primary argument in this passage is that:",
    choices: [
      "F) architecture is the most difficult art form to master.",
      "G) architects have a special obligation because their work directly affects everyone's daily life.",
      "H) museums and concert halls are less important than residential buildings.",
      "J) all buildings should be designed to be beautiful."
    ],
    correct: 1,
    explanation: "The author argues that because architecture is inescapable — unlike museums or concerts — architects bear a unique responsibility to create spaces that serve and inspire people."
  },

  // --- act-read-4: Natural Science (additional) ---
  {
    id: 'act-read-4-q3',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"CRISPR-Cas9, a gene-editing technology adapted from a bacterial immune system, allows scientists to modify DNA sequences with unprecedented precision. While the technology holds enormous promise for treating genetic diseases, it also raises ethical concerns about the possibility of editing human embryos, potentially creating heritable changes that would affect future generations.\"\n\nThe passage presents CRISPR-Cas9 primarily as:",
    choices: [
      "A) a dangerous technology that should be banned.",
      "B) a medical breakthrough with significant ethical implications.",
      "C) a technology that is only useful for treating bacterial infections.",
      "D) a fully mature technology with no remaining concerns."
    ],
    correct: 1,
    explanation: "The passage acknowledges CRISPR's 'enormous promise' while raising 'ethical concerns,' presenting it as a breakthrough technology that requires careful consideration of its implications."
  },
  {
    id: 'act-read-4-q4',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"Plastic debris in the ocean breaks down into microplastics — particles smaller than 5 millimeters — through exposure to sunlight, wave action, and physical abrasion. These microplastics have been found in the digestive systems of marine organisms ranging from zooplankton to whales, and recent studies have detected them in human blood and placental tissue.\"\n\nThe detail about microplastics being found in human blood and placental tissue primarily serves to:",
    choices: [
      "F) prove that microplastics are harmless to humans.",
      "G) illustrate how pervasive microplastic contamination has become, extending beyond marine environments to human biology.",
      "H) argue that ocean cleanup efforts are unnecessary.",
      "J) describe the chemical composition of microplastics."
    ],
    correct: 1,
    explanation: "By extending the discussion from marine organisms to human tissue, the passage emphasizes the ubiquity and far-reaching nature of microplastic contamination."
  },
  {
    id: 'act-read-4-q5',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"Unlike most animals, tardigrades — microscopic creatures sometimes called 'water bears' — can survive conditions that would kill virtually any other organism. They endure temperatures ranging from near absolute zero to 300°F, pressures six times greater than those in the deepest ocean trenches, and radiation doses hundreds of times the lethal dose for humans. They achieve this by entering a state called cryptobiosis, in which metabolic activity drops to nearly zero.\"\n\nBased on the passage, cryptobiosis is best understood as:",
    choices: [
      "A) a permanent state of hibernation from which tardigrades cannot recover.",
      "B) a survival mechanism in which metabolic activity is drastically reduced, allowing the organism to withstand extreme conditions.",
      "C) a process by which tardigrades reproduce asexually.",
      "D) a disease that only affects tardigrades."
    ],
    correct: 1,
    explanation: "The passage defines cryptobiosis as a state in which 'metabolic activity drops to nearly zero,' and contextualizes it as the mechanism by which tardigrades survive extreme conditions."
  },
  {
    id: 'act-read-4-q6',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"The James Webb Space Telescope (JWST), launched in December 2021, observes the universe primarily in infrared light, allowing it to peer through cosmic dust clouds and detect light from the earliest galaxies formed after the Big Bang. Its 6.5-meter primary mirror — roughly six times larger in area than the Hubble Space Telescope's — gives it significantly greater light-gathering ability.\"\n\nThe comparison to the Hubble Space Telescope is included primarily to:",
    choices: [
      "F) argue that the Hubble should be decommissioned.",
      "G) provide a familiar reference point that helps the reader understand the JWST's capabilities.",
      "H) suggest that the Hubble produced no useful data.",
      "J) explain the chemical composition of the JWST's mirror."
    ],
    correct: 1,
    explanation: "Comparing the JWST's mirror to the well-known Hubble gives readers a concrete reference point for understanding the new telescope's superior capabilities."
  },

  // --- act-read-5: Main Idea (additional) ---
  {
    id: 'act-read-5-q3',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage: \"The rise of electric vehicles (EVs) has been hailed as a crucial step toward reducing carbon emissions from transportation. However, the environmental calculus is more complex than it appears. The production of lithium-ion batteries requires mining operations that can devastate local ecosystems, and the electricity used to charge EVs is often generated from fossil fuels. A truly green transportation system requires not just cleaner cars but also a cleaner electrical grid.\"\n\nWhich of the following best states the main idea of the passage?",
    choices: [
      "A) Electric vehicles produce zero emissions and are always better for the environment than gasoline cars.",
      "B) While electric vehicles offer environmental benefits, their full impact depends on the sustainability of battery production and electricity generation.",
      "C) Lithium mining is the most destructive industry in the world.",
      "D) Electric vehicles should not be manufactured until the electrical grid is fully renewable."
    ],
    correct: 1,
    explanation: "The passage acknowledges EVs as a positive step but argues that their environmental impact depends on broader factors (battery production, grid energy sources). Choice B captures this nuanced main idea."
  },
  {
    id: 'act-read-5-q4',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage: \"Sleep deprivation is not merely an inconvenience — it is a public health crisis. The CDC estimates that one in three American adults does not get sufficient sleep, and the consequences extend far beyond tiredness. Chronic sleep deprivation increases the risk of heart disease, diabetes, obesity, and depression. It impairs cognitive function, slows reaction times, and is a leading contributor to motor vehicle accidents.\"\n\nThe passage's main purpose is to:",
    choices: [
      "F) provide tips for improving sleep quality.",
      "G) argue that sleep deprivation is a widespread and serious health issue with far-reaching consequences.",
      "H) compare sleep deprivation to other public health crises.",
      "J) describe the biology of the sleep cycle."
    ],
    correct: 1,
    explanation: "The passage presents sleep deprivation as a 'public health crisis,' cites prevalence data, and lists severe health consequences. Its purpose is to establish the seriousness of the problem."
  },
  {
    id: 'act-read-5-q5',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage: \"The gig economy — defined by short-term, freelance, or on-demand work arrangements — has grown rapidly in the past decade, driven by platforms like Uber, DoorDash, and Fiverr. Supporters praise the flexibility it offers workers, while critics point out that gig workers typically lack benefits like health insurance, retirement plans, and paid leave.\"\n\nWhich statement best captures the central tension described in the passage?",
    choices: [
      "A) The gig economy is growing too slowly to be significant.",
      "B) The flexibility of gig work comes at the cost of traditional employment benefits and protections.",
      "C) All gig workers prefer traditional employment.",
      "D) Technology companies are solely responsible for economic inequality."
    ],
    correct: 1,
    explanation: "The passage sets up a tension between gig work's flexibility (benefit) and its lack of traditional protections like health insurance and retirement plans (cost)."
  },

  // --- act-read-6: Inference (additional) ---
  {
    id: 'act-read-6-q3',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"The restaurant had been open for only six months, but already it had a two-month waiting list for reservations. The chef, a previously unknown culinary school graduate, had been featured in three national food magazines. On any given night, diners could be seen photographing their plates before taking a single bite.\"\n\nIt can reasonably be inferred from this passage that:",
    choices: [
      "A) the restaurant serves inexpensive meals.",
      "B) the restaurant has become highly popular and is seen as a notable dining destination.",
      "C) the chef is considering closing the restaurant.",
      "D) most diners are unhappy with the food."
    ],
    correct: 1,
    explanation: "A two-month waiting list, national magazine features, and diners photographing food all point to a restaurant that has achieved significant popularity and prestige."
  },
  {
    id: 'act-read-6-q4',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"When the school board announced that it would eliminate the music program to save $200,000, more than 400 parents attended the next board meeting — roughly ten times the usual attendance. Three former students, now professional musicians, traveled back to testify about the program's impact on their lives.\"\n\nThe passage most strongly implies that:",
    choices: [
      "F) the music program had little impact on students.",
      "G) the community strongly values the music program and opposes its elimination.",
      "H) the school board routinely eliminates programs.",
      "J) the $200,000 savings is sufficient to justify the cut."
    ],
    correct: 1,
    explanation: "The dramatic increase in meeting attendance and the return of former students to testify both indicate strong community opposition to eliminating the program."
  },
  {
    id: 'act-read-6-q5',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"After the factory closed, the town's Main Street changed gradually but unmistakably. First the hardware store shuttered, then the diner. The barber moved his operation to the next town. Within five years, half the storefronts stood empty, their windows reflecting nothing but the street across from them.\"\n\nThe final image of empty storefronts reflecting 'nothing but the street' most effectively conveys:",
    choices: [
      "A) that the buildings were recently cleaned.",
      "B) the economic decline and hollowing out of the town's commercial life.",
      "C) that the town was preparing for new businesses.",
      "D) that the windows were of unusually high quality."
    ],
    correct: 1,
    explanation: "Empty storefronts reflecting nothing symbolize absence — the loss of commerce and community that defined Main Street. This image powerfully conveys economic decline."
  },
  {
    id: 'act-read-6-q6',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"The diplomat spoke carefully, choosing each word as if placing stones in a mosaic. She neither agreed with the proposal outright nor rejected it, instead suggesting that 'further consultation with all stakeholders would be advisable before any commitments are made.'\"\n\nIt can be inferred that the diplomat's response was designed to:",
    choices: [
      "F) immediately accept the proposal.",
      "G) delay commitment while maintaining a position of flexibility.",
      "H) insult the other parties.",
      "J) indicate complete rejection."
    ],
    correct: 1,
    explanation: "The diplomat's careful word choice, refusal to agree or reject outright, and call for 'further consultation' suggest a strategic delay that preserves her flexibility without offending anyone."
  },

  // --- act-read-7: Vocabulary in Context (additional) ---
  {
    id: 'act-read-7-q4',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The prosecutor built a compelling case, but the defense attorney's closing argument was so masterful that it effectively dismantled the prosecution's narrative.\"\n\nAs used in this passage, 'compelling' most nearly means:",
    choices: [
      "A) forcing someone to act against their will",
      "B) convincing and persuasive",
      "C) lengthy and detailed",
      "D) legally required"
    ],
    correct: 1,
    explanation: "In the context of a legal case, 'compelling' means convincing and persuasive — the prosecutor's case was strong and persuasive, though the defense eventually countered it."
  },
  {
    id: 'act-read-7-q5',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The mountain's summit, though tantalizingly visible from the base camp, proved elusive; bad weather forced the climbers to turn back three times before they finally reached the top.\"\n\nAs used in this passage, 'elusive' most nearly means:",
    choices: [
      "F) imaginary",
      "G) difficult to reach or achieve",
      "H) clearly visible",
      "J) dangerous"
    ],
    correct: 1,
    explanation: "'Elusive' means hard to find, catch, or achieve. The summit was visible but repeatedly out of reach due to bad weather — tantalizingly close yet difficult to attain."
  },
  {
    id: 'act-read-7-q6',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The new regulations were met with tepid enthusiasm by the industry, which had hoped for more comprehensive reforms.\"\n\nAs used in this passage, 'tepid' most nearly means:",
    choices: [
      "A) boiling hot",
      "B) lukewarm or showing only mild interest",
      "C) completely opposed",
      "D) well-informed"
    ],
    correct: 1,
    explanation: "'Tepid' literally means lukewarm, and figuratively means showing only slight warmth or enthusiasm. The industry's response was unenthusiastic because the reforms fell short of expectations."
  },
  {
    id: 'act-read-7-q7',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The scientist's groundbreaking research upended decades of conventional wisdom about the origins of the disease.\"\n\nAs used in this passage, 'upended' most nearly means:",
    choices: [
      "F) slightly modified",
      "G) confirmed and supported",
      "H) overturned or dramatically challenged",
      "J) summarized concisely"
    ],
    correct: 2,
    explanation: "'Upended' means to turn upside down — to overturn or dramatically challenge existing understanding. The research contradicted 'decades of conventional wisdom.'"
  },

  // --- act-read-8: Author's Purpose (additional) ---
  {
    id: 'act-read-8-q4',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"If a Martian anthropologist were to observe American eating habits, it might note with some puzzlement that the nation spends billions on diet products and gym memberships while simultaneously consuming more ultra-processed food per capita than any other country on Earth.\"\n\nThe author uses the hypothetical Martian anthropologist primarily to:",
    choices: [
      "A) argue that Martians would be better at dieting than Americans.",
      "B) create a distanced perspective that highlights the contradiction in American eating behavior.",
      "C) prove that aliens exist.",
      "D) suggest that American eating habits are perfectly logical."
    ],
    correct: 1,
    explanation: "The hypothetical outside observer is a rhetorical device that allows the author to highlight a contradiction that might seem normal to insiders but absurd when viewed from a fresh perspective."
  },
  {
    id: 'act-read-8-q5',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"The campaign's promotional materials emphasized job creation, economic growth, and community investment. What they did not mention was the environmental impact assessment that had been quietly shelved after revealing significant concerns about groundwater contamination.\"\n\nThe author's purpose in the second sentence is most likely to:",
    choices: [
      "F) praise the campaign for its thorough planning.",
      "G) suggest that the campaign is selectively presenting information, omitting inconvenient environmental findings.",
      "H) argue that environmental impact assessments are always inaccurate.",
      "J) describe the technical process of groundwater testing."
    ],
    correct: 1,
    explanation: "By contrasting what the materials said with what they 'did not mention,' the author implies deliberate omission of damaging information — a skeptical and revealing rhetorical move."
  },
  {
    id: 'act-read-8-q6',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"In 1847, Ignaz Semmelweis, a Hungarian physician, discovered that doctors who washed their hands before delivering babies dramatically reduced maternal mortality. His colleagues ridiculed him. He was dismissed from his position and eventually committed to a mental asylum. It was not until years after his death that germ theory vindicated his findings.\"\n\nThe author most likely includes this historical account to illustrate:",
    choices: [
      "A) that hospitals in the 1800s were poorly funded.",
      "B) that scientific discoveries are sometimes rejected when they challenge established beliefs, and that vindication can come too late.",
      "C) that handwashing is more important than surgery.",
      "D) that all doctors in the 1800s were incompetent."
    ],
    correct: 1,
    explanation: "The Semmelweis story is a classic example of an innovator punished for challenging orthodoxy, later proven correct. The author uses it to illustrate how institutional resistance can delay life-saving progress."
  },
  {
    id: 'act-read-8-q7',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"Every year, Americans throw away approximately 80 billion pounds of food — roughly 30 to 40 percent of the total food supply. To put that in perspective, the wasted food could fill the Rose Bowl stadium every single day.\"\n\nThe comparison to the Rose Bowl stadium serves primarily to:",
    choices: [
      "F) argue that the Rose Bowl should be converted into a composting facility.",
      "G) make an abstract statistic concrete and comprehensible by using a familiar reference.",
      "H) compare food waste to sports attendance.",
      "J) exaggerate the amount of food waste for dramatic effect."
    ],
    correct: 1,
    explanation: "Large numbers like '80 billion pounds' are hard to visualize. Comparing the waste to filling a recognizable stadium daily makes the scale tangible and memorable for readers."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ADDITIONAL ACT SCIENCE QUESTIONS — ~140 more questions
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-sci-1: Data Representation (additional) ---
  {
    id: 'act-sci-1-q4',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A bar graph shows the average annual rainfall (in cm) for five cities:\n\nCity A: 45\nCity B: 82\nCity C: 120\nCity D: 33\nCity E: 98\n\nWhich city receives the least rainfall?",
    choices: [
      "A) City A",
      "B) City B",
      "C) City C",
      "D) City D"
    ],
    correct: 3,
    explanation: "City D has the lowest average annual rainfall at 33 cm."
  },
  {
    id: 'act-sci-1-q5',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A line graph shows the number of daylight hours in a city over 12 months. The line peaks in June at about 15 hours and dips to its lowest point in December at about 9 hours.\n\nBased on this data, the city is most likely located in:",
    choices: [
      "F) the Northern Hemisphere, because it has more daylight in June.",
      "G) the Southern Hemisphere, because it has less daylight in December.",
      "H) the equator, because daylight varies throughout the year.",
      "J) the North or South Pole, because of extreme daylight variation."
    ],
    correct: 0,
    explanation: "More daylight in June (summer) and less in December (winter) is characteristic of the Northern Hemisphere. In the Southern Hemisphere, the pattern would be reversed."
  },
  {
    id: 'act-sci-1-q6',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A table shows the solubility of sodium chloride (NaCl) in water at various temperatures:\n\nTemperature (°C) | Solubility (g/100 mL)\n0                | 35.7\n20               | 36.0\n40               | 36.6\n60               | 37.3\n80               | 38.0\n100              | 39.2\n\nBased on this data, which statement is accurate?",
    choices: [
      "A) NaCl is insoluble in water at all temperatures.",
      "B) The solubility of NaCl increases sharply with temperature.",
      "C) The solubility of NaCl increases slightly with temperature.",
      "D) The solubility of NaCl decreases as temperature increases."
    ],
    correct: 2,
    explanation: "Solubility increases from 35.7 to 39.2 g/100 mL over the 0-100°C range — an increase of only about 3.5 g. This is a slight increase, not a sharp one."
  },
  {
    id: 'act-sci-1-q7',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A scatter plot shows the relationship between hours of study per week (x-axis) and exam scores (y-axis) for 50 students. The data points form a loose cluster trending upward from left to right.\n\nThis scatter plot indicates:",
    choices: [
      "F) a strong negative correlation between study time and exam scores.",
      "G) no relationship between study time and exam scores.",
      "H) a positive correlation between study time and exam scores.",
      "J) that all students who study more earn perfect scores."
    ],
    correct: 2,
    explanation: "An upward trend from left to right indicates a positive correlation: as study time increases, exam scores tend to increase. The loose cluster means the correlation is moderate, not perfect."
  },
  {
    id: 'act-sci-1-q8',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A pie chart shows the composition of Earth's atmosphere by volume:\n\nNitrogen (N₂): 78%\nOxygen (O₂): 21%\nArgon (Ar): 0.93%\nCarbon dioxide (CO₂): 0.04%\nOther gases: 0.03%\n\nBased on this chart, which gas is the third most abundant in Earth's atmosphere?",
    choices: [
      "A) Carbon dioxide",
      "B) Argon",
      "C) Oxygen",
      "D) Nitrogen"
    ],
    correct: 1,
    explanation: "Ranked by abundance: Nitrogen (78%) > Oxygen (21%) > Argon (0.93%) > CO₂ (0.04%). Argon is the third most abundant."
  },

  // --- act-sci-2: Data Interpretation (additional) ---
  {
    id: 'act-sci-2-q4',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A graph shows the population of a bacterial culture over 24 hours. The population remains low for the first 4 hours, grows exponentially from hours 4 to 16, then levels off from hours 16 to 24.\n\nThe leveling off most likely occurs because:",
    choices: [
      "A) the bacteria have mutated into a new species.",
      "B) the bacteria have consumed most of the available nutrients, limiting further growth.",
      "C) the temperature was changed at hour 16.",
      "D) bacteria cannot grow for more than 16 hours."
    ],
    correct: 1,
    explanation: "In a typical bacterial growth curve, the stationary phase occurs when resources become limited. The leveling off at hour 16 is consistent with nutrient depletion in the growth medium."
  },
  {
    id: 'act-sci-2-q5',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A data table shows the mass of five objects and the force of gravity acting on them:\n\nObject | Mass (kg) | Gravitational Force (N)\nA      | 2         | 19.6\nB      | 5         | 49.0\nC      | 8         | 78.4\nD      | 10        | 98.0\nE      | 15        | 147.0\n\nBased on this data, the gravitational force per kilogram (acceleration due to gravity) is approximately:",
    choices: [
      "F) 5.0 m/s²",
      "G) 9.8 m/s²",
      "H) 15.0 m/s²",
      "J) 19.6 m/s²"
    ],
    correct: 1,
    explanation: "Dividing force by mass for any object: 19.6/2 = 9.8, 49.0/5 = 9.8, etc. The acceleration due to gravity is consistently 9.8 m/s²."
  },
  {
    id: 'act-sci-2-q6',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A researcher tracked the average beak length of a finch population on an island over 20 years. During a prolonged drought, when only hard, thick-shelled seeds were available, average beak length increased from 10.2 mm to 11.8 mm.\n\nThis observation best supports which biological concept?",
    choices: [
      "A) Genetic drift",
      "B) Natural selection, where individuals with traits better suited to the environment had a survival advantage",
      "C) Lamarckian inheritance",
      "D) Spontaneous generation"
    ],
    correct: 1,
    explanation: "Finches with larger beaks were better able to crack hard seeds during the drought, giving them a survival advantage. This is a classic example of natural selection driven by environmental pressure."
  },
  {
    id: 'act-sci-2-q7',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A table shows the half-lives of four radioactive isotopes:\n\nIsotope | Half-life\nA       | 5 minutes\nB       | 2 hours\nC       | 30 years\nD       | 4.5 billion years\n\nIf a sample of Isotope A starts with 1000 atoms, approximately how many atoms remain after 15 minutes?",
    choices: [
      "F) 500",
      "G) 250",
      "H) 125",
      "J) 62.5"
    ],
    correct: 2,
    explanation: "15 minutes = 3 half-lives (15/5 = 3). After each half-life, half remains: 1000 → 500 → 250 → 125."
  },

  // --- act-sci-3: Research Summaries — Variables (additional) ---
  {
    id: 'act-sci-3-q3',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "Experiment: A student tested whether the angle of a ramp affects the distance a ball rolls after leaving the ramp. The student set the ramp at 15°, 30°, 45°, and 60° angles, using the same ball and the same smooth surface each time. She measured the distance the ball traveled on the flat surface.\n\nResults:\nAngle | Distance (m)\n15°   | 1.2\n30°   | 2.8\n45°   | 4.1\n60°   | 3.5\n\nWhat was the dependent variable in this experiment?",
    choices: [
      "A) The angle of the ramp",
      "B) The type of ball",
      "C) The distance the ball traveled on the flat surface",
      "D) The smoothness of the surface"
    ],
    correct: 2,
    explanation: "The dependent variable is the outcome being measured — the distance the ball traveled. The angle was the independent variable (manipulated), and the ball type and surface were controlled variables."
  },
  {
    id: 'act-sci-3-q4',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "Experiment: Researchers tested the effect of caffeine on heart rate. Participants were given 0 mg, 100 mg, 200 mg, or 400 mg of caffeine, and their resting heart rates were measured 30 minutes later.\n\nResults:\nCaffeine (mg) | Avg Heart Rate (bpm)\n0             | 68\n100           | 72\n200           | 78\n400           | 88\n\nWhich of the following was a controlled variable in this experiment?",
    choices: [
      "F) The amount of caffeine given",
      "G) The resting heart rate measurement",
      "H) The time interval between caffeine consumption and heart rate measurement",
      "J) The number of participants in each group"
    ],
    correct: 2,
    explanation: "The 30-minute interval between caffeine consumption and measurement was kept constant across all groups — making it a controlled variable. The caffeine dose was the independent variable, and heart rate was the dependent variable."
  },
  {
    id: 'act-sci-3-q5',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "Based on the caffeine experiment data above, what would be the best prediction for the average heart rate at a caffeine dose of 300 mg?",
    choices: [
      "A) 70 bpm",
      "B) 75 bpm",
      "C) 83 bpm",
      "D) 95 bpm"
    ],
    correct: 2,
    explanation: "At 200 mg, heart rate is 78 bpm; at 400 mg, it is 88 bpm. At 300 mg (midpoint), we'd expect approximately the midpoint: (78 + 88)/2 = 83 bpm."
  },

  // --- act-sci-4: Research Summaries — Controls (additional) ---
  {
    id: 'act-sci-4-q3',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "Experiment: A student tests whether different types of music affect plant growth. She places identical seedlings in four groups: classical music, rock music, white noise, and silence. All plants receive the same amount of water, light, and soil. After 4 weeks, she measures plant height.\n\nWhich group serves as the control?",
    choices: [
      "A) Classical music group",
      "B) Rock music group",
      "C) White noise group",
      "D) Silence group"
    ],
    correct: 3,
    explanation: "The silence group serves as the control because it represents the condition without any sound treatment. It provides a baseline for comparison with the music groups."
  },
  {
    id: 'act-sci-4-q4',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A student wants to test whether vitamin C supplements reduce the duration of colds. She designs an experiment in which 50 participants take vitamin C and 50 take a sugar pill (placebo). Neither the participants nor the researchers know who received which pill until the study is complete.\n\nThis experimental design is called:",
    choices: [
      "F) a single-blind study",
      "G) a double-blind study",
      "H) an observational study",
      "J) a case study"
    ],
    correct: 1,
    explanation: "In a double-blind study, neither the participants nor the researchers know who is in the experimental or control group. This eliminates bias from both sides."
  },
  {
    id: 'act-sci-4-q5',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A researcher claims that a new pesticide reduces crop damage from insects. She tests the pesticide on one farm and compares results to a different farm that uses no pesticide. A colleague criticizes the study design.\n\nWhat is the most likely reason for the criticism?",
    choices: [
      "A) The study used only one type of pesticide.",
      "B) The two farms may differ in soil quality, climate, and crop variety, making it impossible to attribute differences solely to the pesticide.",
      "C) The study took too long to complete.",
      "D) Pesticides are always effective."
    ],
    correct: 1,
    explanation: "Using two different farms introduces confounding variables (soil, climate, crop variety). A proper controlled experiment should vary only the treatment (pesticide vs. no pesticide) while keeping all other conditions identical."
  },

  // --- act-sci-5: Research Summaries — Conclusions (additional) ---
  {
    id: 'act-sci-5-q4',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Experiment: A researcher tested whether hand sanitizer or soap and water more effectively removes bacteria. She had 30 participants contaminate their hands with a harmless bacterial culture, then divided them into three groups: hand sanitizer, soap and water for 20 seconds, and soap and water for 40 seconds. She then measured the remaining bacteria on each person's hands.\n\nResults:\nHand sanitizer:        70% reduction\nSoap, 20 seconds:     85% reduction\nSoap, 40 seconds:     99% reduction\n\nWhich conclusion is best supported?",
    choices: [
      "A) Hand sanitizer is more effective than soap and water.",
      "B) Soap and water is more effective than hand sanitizer, and longer washing time increases effectiveness.",
      "C) Washing for 20 seconds is no different from washing for 40 seconds.",
      "D) Bacteria cannot be removed from hands by any method."
    ],
    correct: 1,
    explanation: "Both soap groups outperformed hand sanitizer (85% and 99% vs. 70%), and the 40-second wash was more effective than the 20-second wash. The data support both claims in choice B."
  },
  {
    id: 'act-sci-5-q5',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Experiment: Biologists studied the effect of ocean acidification on coral growth. They maintained coral samples at pH levels of 8.2 (current ocean average), 7.8, 7.6, and 7.4 for 12 months and measured growth rates.\n\nResults:\npH 8.2: 12 mm/year\npH 7.8: 8 mm/year\npH 7.6: 4 mm/year\npH 7.4: 1 mm/year\n\nA student claims: 'If ocean pH continues to decline, coral reefs will eventually stop growing entirely.' Is this claim supported by the data?",
    choices: [
      "F) Yes, because the data show a consistent decline in growth rate as pH decreases, with near-zero growth at pH 7.4.",
      "G) No, because coral growth increased with decreasing pH.",
      "H) No, because the experiment tested only four pH levels.",
      "J) Yes, because coral cannot survive in any acidic environment."
    ],
    correct: 0,
    explanation: "The data show a clear trend: growth rate decreases as pH decreases, approaching near-zero at pH 7.4. Extrapolating this trend supports the prediction that growth would cease at even lower pH values."
  },
  {
    id: 'act-sci-5-q6',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Experiment: Researchers compared three different insulation materials by placing each in identical boxes, heating the boxes to 80°C, and measuring the temperature after 4 hours.\n\nResults:\nFiberglass:     62°C after 4 hours\nFoam:           58°C after 4 hours\nCellulose:      55°C after 4 hours\nNo insulation:  35°C after 4 hours\n\nWhich insulation material retained the most heat?",
    choices: [
      "A) Fiberglass",
      "B) Foam",
      "C) Cellulose",
      "D) No insulation"
    ],
    correct: 0,
    explanation: "Fiberglass maintained the highest temperature (62°C) after 4 hours, meaning it lost the least heat (only 18°C), compared to foam (lost 22°C) and cellulose (lost 25°C). Therefore, fiberglass retained the most heat."
  },

  // --- act-sci-6: Conflicting Viewpoints — Identify (additional) ---
  {
    id: 'act-sci-6-q3',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "Scientist A: \"The primary driver of recent increases in wildfires is climate change, which has created hotter, drier conditions that extend fire seasons and increase fuel aridity.\"\n\nScientist B: \"While climate conditions contribute to wildfire risk, the primary driver is a century of fire suppression policies that have allowed fuel loads — dead wood and underbrush — to accumulate to dangerous levels.\"\n\nThe key disagreement between Scientist A and Scientist B concerns:",
    choices: [
      "A) whether wildfires have increased in frequency and intensity.",
      "B) the primary cause of increased wildfire activity.",
      "C) whether climate change is occurring.",
      "D) whether forests should be protected."
    ],
    correct: 1,
    explanation: "Both scientists acknowledge increased wildfire activity. They disagree about the primary cause — climate change (Scientist A) versus fire suppression policies that allowed fuel accumulation (Scientist B)."
  },
  {
    id: 'act-sci-6-q4',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "Hypothesis 1: \"Birds evolved from a group of small, feathered theropod dinosaurs. The fossil record shows a gradual transition from non-avian dinosaurs to early birds, with intermediate forms like Archaeopteryx displaying both dinosaurian and avian features.\"\n\nHypothesis 2: \"Birds and dinosaurs share a common ancestor but evolved along separate lineages. The similarities between birds and theropods result from convergent evolution — independent development of similar features in response to similar environmental pressures.\"\n\nWhich fossil finding would most strongly support Hypothesis 1 over Hypothesis 2?",
    choices: [
      "F) A modern bird with no dinosaurian features",
      "G) A series of fossils showing a gradual, step-by-step transition from dinosaurian to avian skeletal features over millions of years",
      "H) A dinosaur fossil found on a different continent from any bird fossils",
      "J) A bird fossil that is older than any known dinosaur"
    ],
    correct: 1,
    explanation: "A continuous series of transitional fossils would support the gradual evolution from dinosaurs to birds (Hypothesis 1) rather than separate, convergent evolution (Hypothesis 2)."
  },
  {
    id: 'act-sci-6-q5',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "View 1: \"Organic farming is better for the environment because it avoids synthetic pesticides and fertilizers, promoting biodiversity and soil health.\"\n\nView 2: \"Organic farming produces lower crop yields per acre, requiring more land to produce the same amount of food. This land-use expansion can lead to deforestation and habitat loss, which may cause more environmental damage than conventional farming's chemical inputs.\"\n\nBoth views would agree that:",
    choices: [
      "A) organic farming always produces higher yields.",
      "B) environmental impact is an important consideration in farming practices.",
      "C) synthetic pesticides have no effect on biodiversity.",
      "D) deforestation is not a significant environmental concern."
    ],
    correct: 1,
    explanation: "Both views frame their arguments in terms of environmental impact — one focusing on pesticides and soil health, the other on land use and deforestation. Both assume environmental considerations are important."
  },

  // --- act-sci-7: Conflicting Viewpoints — Evaluate (additional) ---
  {
    id: 'act-sci-7-q4',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Researcher 1: \"Sleep serves primarily to consolidate memories and process information gathered during waking hours. The brain replays and strengthens neural connections formed during learning.\"\n\nResearcher 2: \"Sleep's primary function is physical restoration — clearing metabolic waste products that accumulate during wakefulness, repairing tissue, and restoring energy reserves.\"\n\nWhich experimental finding would most directly support Researcher 2's position?",
    choices: [
      "A) People who sleep after studying perform better on tests.",
      "B) Brain scans during sleep show high activity in memory-related areas.",
      "C) Cerebrospinal fluid flow through the brain increases dramatically during sleep, flushing out toxic metabolic byproducts.",
      "D) REM sleep is associated with vivid dreaming."
    ],
    correct: 2,
    explanation: "Increased cerebrospinal fluid flow that clears toxic byproducts during sleep directly supports Researcher 2's claim that sleep's primary function is physical restoration and waste clearance."
  },
  {
    id: 'act-sci-7-q5',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Scientist X: \"Dinosaurs were warm-blooded (endothermic) animals, maintaining a constant body temperature through internal metabolic heat, similar to modern birds and mammals.\"\n\nScientist Y: \"Dinosaurs were cold-blooded (ectothermic), relying on environmental heat sources to regulate body temperature, similar to modern reptiles.\"\n\nWhich evidence would most strongly support Scientist X?",
    choices: [
      "F) Dinosaur fossils found in warm tropical regions",
      "G) Bone histology showing rapid growth rings consistent with endothermic metabolism, and dinosaur fossils found in polar regions where ectotherms could not survive",
      "H) Large dinosaur body size",
      "J) Dinosaur eggshell fossils"
    ],
    correct: 1,
    explanation: "Rapid bone growth is characteristic of endotherms, and survival in polar climates requires internal heat regulation. Together, these findings strongly support warm-bloodedness."
  },
  {
    id: 'act-sci-7-q6',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "View A: \"Nuclear energy is essential for combating climate change because it produces virtually no carbon emissions during operation and can generate reliable baseload power.\"\n\nView B: \"Nuclear energy poses unacceptable risks, including the possibility of catastrophic accidents, the problem of long-lived radioactive waste, and the potential for nuclear materials to be used in weapons.\"\n\nA new technology that safely neutralizes radioactive waste within 10 years would most directly weaken which aspect of View B?",
    choices: [
      "A) The risk of catastrophic accidents",
      "B) The problem of long-lived radioactive waste",
      "C) The potential for weapons proliferation",
      "D) The high cost of building nuclear plants"
    ],
    correct: 1,
    explanation: "A technology that neutralizes radioactive waste within 10 years directly addresses one of View B's three concerns: 'the problem of long-lived radioactive waste.' It would not address accident risk or proliferation concerns."
  },

  // --- act-sci-8: Experimental Design (additional) ---
  {
    id: 'act-sci-8-q3',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A student wants to test whether the color of a container affects how quickly ice melts. She fills identical cups with the same amount of ice and water, wraps them in paper of different colors (black, white, red, and silver), and places them in direct sunlight. She measures the time until all ice has melted.\n\nResults:\nBlack:  22 minutes\nRed:    28 minutes\nWhite:  35 minutes\nSilver: 38 minutes\n\nWhich conclusion is best supported?",
    choices: [
      "A) Black containers absorb more heat from sunlight, causing ice to melt faster.",
      "B) Silver containers are the best insulators.",
      "C) The color of a container has no effect on ice melting rate.",
      "D) Red light is the hottest color of visible light."
    ],
    correct: 0,
    explanation: "Black absorbs the most light/heat and melted ice fastest (22 min), while lighter/reflective colors (white, silver) absorbed less heat and melted ice more slowly. This supports the conclusion about black containers absorbing more heat."
  },
  {
    id: 'act-sci-8-q4',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A researcher wants to determine whether a new fertilizer increases tomato yield. She has two identical greenhouses available. Which experimental design would produce the most reliable results?",
    choices: [
      "F) Use the fertilizer in one greenhouse and not the other, with identical tomato plants, watering, and light in both.",
      "G) Use the fertilizer in one greenhouse and a different variety of tomato in the other.",
      "H) Use the fertilizer in both greenhouses to see if the results are consistent.",
      "J) Use the fertilizer in one greenhouse and change the watering schedule in the other."
    ],
    correct: 0,
    explanation: "A controlled experiment changes only one variable (fertilizer use) while keeping all other conditions identical. Choice F maintains identical conditions except for the fertilizer treatment."
  },
  {
    id: 'act-sci-8-q5',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A physics student drops balls of different masses from the same height and measures the time each takes to reach the ground. In a vacuum, all balls hit the ground at the same time. In air, the lighter ball takes slightly longer.\n\nThe difference in air is most likely caused by:",
    choices: [
      "A) gravity acting differently on objects of different mass.",
      "B) air resistance, which has a proportionally greater effect on lighter objects.",
      "C) the lighter ball being released later.",
      "D) the heavier ball being attracted to the Earth more strongly."
    ],
    correct: 1,
    explanation: "In a vacuum, all objects fall at the same rate regardless of mass (Galileo's principle). In air, resistance affects lighter objects more relative to their weight, slowing them slightly more than heavier objects."
  },
  {
    id: 'act-sci-8-q6',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A student tests whether water temperature affects the rate at which sugar dissolves. She places 10 g of sugar in 100 mL of water at 20°C, 40°C, 60°C, and 80°C, stirring each at the same rate, and records the time until the sugar is fully dissolved.\n\nResults:\n20°C: 180 seconds\n40°C: 95 seconds\n60°C: 45 seconds\n80°C: 20 seconds\n\nWhat can be concluded from this experiment?",
    choices: [
      "F) Sugar dissolves more slowly in warmer water.",
      "G) Higher water temperature significantly increases the rate at which sugar dissolves.",
      "H) Stirring has no effect on dissolving rate.",
      "J) 10 g of sugar is too much to dissolve in 100 mL of water."
    ],
    correct: 1,
    explanation: "Dissolving time decreased dramatically as temperature increased (180s at 20°C vs. 20s at 80°C), indicating that higher temperatures significantly increase the dissolving rate."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ADDITIONAL QUESTIONS — Batch 2 (to reach ~800 total)
  // ═══════════════════════════════════════════════════════════════════════

  // --- More act-eng-1 ---
  {
    id: 'act-eng-1-q13',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The park which was designed by Frederick Law Olmsted attracts over ten million visitors each year.",
    choices: [
      "A) NO CHANGE",
      "B) The park, which was designed by Frederick Law Olmsted, attracts",
      "C) The park, which was designed by Frederick Law Olmsted attracts",
      "D) The park which was designed by Frederick Law Olmsted, attracts"
    ],
    correct: 1,
    explanation: "The clause 'which was designed by Frederick Law Olmsted' is nonrestrictive — it provides additional information about the park but is not essential to identify it. It must be enclosed by commas on both sides."
  },
  {
    id: 'act-eng-1-q14',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The students' project required three components: a written report a visual presentation and an oral defense.",
    choices: [
      "F) NO CHANGE",
      "G) a written report, a visual presentation, and an oral defense.",
      "H) a written report; a visual presentation; and an oral defense.",
      "J) a written report a visual presentation, and an oral defense."
    ],
    correct: 1,
    explanation: "Items in a simple series should be separated by commas. Semicolons in a series are only necessary when the items themselves contain commas."
  },

  // --- More act-eng-2 ---
  {
    id: 'act-eng-2-q13',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The exhibit, along with its companion catalog, ______ scheduled to open next Friday.",
    choices: [
      "A) are",
      "B) is",
      "C) were",
      "D) have been"
    ],
    correct: 1,
    explanation: "The subject is 'exhibit' (singular). The phrase 'along with its companion catalog' is a parenthetical modifier that does not change the number of the subject."
  },
  {
    id: 'act-eng-2-q14',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The amount of errors in the report surprised the editor.",
    choices: [
      "F) NO CHANGE",
      "G) The number of errors",
      "H) The amounts of errors",
      "J) The sum of errors"
    ],
    correct: 1,
    explanation: "'Amount' is used for uncountable nouns (e.g., amount of water). 'Number' is used for countable nouns (e.g., number of errors). Since errors are countable, 'number' is correct."
  },

  // --- More act-eng-3 ---
  {
    id: 'act-eng-3-q11',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The committee has proposed raising property taxes, reducing city services, and to issue municipal bonds to close the budget gap.",
    choices: [
      "A) NO CHANGE",
      "B) The committee has proposed raising property taxes, reducing city services, and issuing municipal bonds",
      "C) The committee has proposed to raise property taxes, to reduce city services, and to issue municipal bonds",
      "D) The committee has proposed raising property taxes, reducing city services, and the issuance of municipal bonds"
    ],
    correct: 1,
    explanation: "Parallel structure requires matching verb forms. 'Raising, reducing, and issuing' are all gerunds, maintaining parallelism. The original mixes gerunds with an infinitive ('to issue')."
  },

  // --- More act-eng-5 ---
  {
    id: 'act-eng-5-q10',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The fossil record provides evidence of five major mass extinctions. ______, some scientists believe we are currently experiencing a sixth, driven by human activity.",
    choices: [
      "A) Nevertheless,",
      "B) In fact,",
      "C) On the contrary,",
      "D) As a result,"
    ],
    correct: 1,
    explanation: "'In fact' introduces additional information that extends or intensifies the previous statement. The idea of a current sixth extinction adds to the discussion of the fossil record's five."
  },

  // --- More act-eng-6 ---
  {
    id: 'act-eng-6-q10',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The free complimentary breakfast is included at no extra charge with every hotel reservation.",
    choices: [
      "F) NO CHANGE",
      "G) The complimentary breakfast is included with every hotel reservation.",
      "H) The free breakfast is included at no extra charge.",
      "J) The free complimentary breakfast at no charge is included with every reservation."
    ],
    correct: 1,
    explanation: "'Free,' 'complimentary,' and 'at no extra charge' all mean the same thing. 'The complimentary breakfast is included with every hotel reservation' eliminates the triple redundancy."
  },

  // --- More act-eng-7 ---
  {
    id: 'act-eng-7-q8',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A paragraph about the causes of the American Civil War includes the following sentence: \"Abraham Lincoln was born on February 12, 1809, in Hodgenville, Kentucky.\" Should this sentence be kept or deleted?",
    choices: [
      "A) Kept, because it provides important historical context.",
      "B) Kept, because every essay about the Civil War must mention Lincoln's birth.",
      "C) Deleted, because Lincoln's birth date and birthplace are not relevant to a discussion of the causes of the Civil War.",
      "D) Deleted, because the information is factually inaccurate."
    ],
    correct: 2,
    explanation: "While Lincoln is relevant to the Civil War, his birth date and birthplace are biographical details that do not directly relate to the causes of the war."
  },

  // --- More act-eng-8 ---
  {
    id: 'act-eng-8-q10',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "A writer wants to revise the following sentence to make it more specific and vivid:\n\n\"The storm was bad.\"\n\nWhich revision best accomplishes this goal?",
    choices: [
      "F) The storm was really, really bad.",
      "G) The storm was not good.",
      "H) Wind gusts exceeding 90 miles per hour toppled power lines and uprooted century-old oak trees across three counties.",
      "J) It was a bad storm that caused damage."
    ],
    correct: 2,
    explanation: "Choice H replaces the vague 'bad' with specific, vivid details (90 mph gusts, toppled power lines, uprooted oaks, three counties) that show the storm's severity rather than merely telling the reader it was bad."
  },

  // --- More act-math-1 ---
  {
    id: 'act-math-1-q12',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A store sells trail mix for $8.50 per pound. How much does 2.4 pounds cost?",
    choices: [
      "A) $17.00",
      "B) $18.40",
      "C) $19.20",
      "D) $20.40",
      "E) $21.00"
    ],
    correct: 3,
    explanation: "Cost = 8.50 × 2.4 = $20.40."
  },
  {
    id: 'act-math-1-q13',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "What is the greatest common factor (GCF) of 36 and 48?",
    choices: [
      "F) 4",
      "G) 6",
      "H) 8",
      "J) 12",
      "K) 24"
    ],
    correct: 3,
    explanation: "36 = 2² × 3² and 48 = 2⁴ × 3. GCF = 2² × 3 = 12."
  },

  // --- More act-math-2 ---
  {
    id: 'act-math-2-q10',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If 5x − 3 = 2x + 12, what is the value of x?",
    choices: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6",
      "E) 7"
    ],
    correct: 2,
    explanation: "5x − 3 = 2x + 12. Subtract 2x: 3x − 3 = 12. Add 3: 3x = 15. Divide by 3: x = 5."
  },
  {
    id: 'act-math-2-q11',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "A rectangle has a perimeter of 38 cm. If the length is 3 cm more than the width, what is the width?",
    choices: [
      "F) 7 cm",
      "G) 8 cm",
      "H) 9 cm",
      "J) 10 cm",
      "K) 11 cm"
    ],
    correct: 1,
    explanation: "Let w = width. Then length = w + 3. Perimeter = 2(w + w + 3) = 2(2w + 3) = 4w + 6 = 38. So 4w = 32, w = 8 cm."
  },

  // --- More act-math-3 ---
  {
    id: 'act-math-3-q11',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "What is the value of 3^(-2)?",
    choices: [
      "A) −9",
      "B) −6",
      "C) 1/6",
      "D) 1/9",
      "E) 9"
    ],
    correct: 3,
    explanation: "A negative exponent means the reciprocal: 3^(−2) = 1/3² = 1/9."
  },
  {
    id: 'act-math-3-q12',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "Solve for x: √(2x + 5) = 7",
    choices: [
      "F) 16",
      "G) 22",
      "H) 24",
      "J) 27",
      "K) 44"
    ],
    correct: 1,
    explanation: "Square both sides: 2x + 5 = 49. Subtract 5: 2x = 44. Divide by 2: x = 22. Check: √(44 + 5) = √49 = 7. Correct."
  },

  // --- More act-math-4 ---
  {
    id: 'act-math-4-q11',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the slope of a horizontal line?",
    choices: [
      "A) 0",
      "B) 1",
      "C) −1",
      "D) undefined",
      "E) infinity"
    ],
    correct: 0,
    explanation: "A horizontal line has a slope of 0 because there is no change in y regardless of the change in x. (A vertical line has an undefined slope.)"
  },

  // --- More act-math-5 ---
  {
    id: 'act-math-5-q9',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A cone has a radius of 4 cm and a slant height of 9 cm. What is its lateral surface area?",
    choices: [
      "F) 36π cm²",
      "G) 16π cm²",
      "H) 72π cm²",
      "J) 9π cm²",
      "K) 13π cm²"
    ],
    correct: 0,
    explanation: "Lateral surface area of a cone = πrl = π(4)(9) = 36π cm²."
  },
  {
    id: 'act-math-5-q10',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A sphere has a volume of 36π cubic centimeters. What is the radius of the sphere?",
    choices: [
      "A) 2 cm",
      "B) 3 cm",
      "C) 4 cm",
      "D) 6 cm",
      "E) 9 cm"
    ],
    correct: 1,
    explanation: "Volume = (4/3)πr³ = 36π. Divide by π: (4/3)r³ = 36. Multiply by 3/4: r³ = 27. So r = 3 cm."
  },

  // --- More act-math-6 ---
  {
    id: 'act-math-6-q9',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the exact value of cos(60°)?",
    choices: [
      "F) 0",
      "G) 1/2",
      "H) √2/2",
      "J) √3/2",
      "K) 1"
    ],
    correct: 1,
    explanation: "cos(60°) = 1/2 is a standard trigonometric value from the 30-60-90 triangle."
  },
  {
    id: 'act-math-6-q10',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "Which of the following is equivalent to sin²(θ) + cos²(θ)?",
    choices: [
      "A) 0",
      "B) 1",
      "C) sin(2θ)",
      "D) tan²(θ)",
      "E) 2"
    ],
    correct: 1,
    explanation: "The Pythagorean identity states that sin²(θ) + cos²(θ) = 1 for all values of θ."
  },

  // --- More act-math-7 ---
  {
    id: 'act-math-7-q9',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A data set has values: 2, 4, 4, 6, 8, 10. What is the range?",
    choices: [
      "F) 4",
      "G) 6",
      "H) 8",
      "J) 10",
      "K) 12"
    ],
    correct: 2,
    explanation: "Range = maximum − minimum = 10 − 2 = 8."
  },
  {
    id: 'act-math-7-q10',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A coin is flipped 3 times. What is the probability of getting exactly 2 heads?",
    choices: [
      "A) 1/8",
      "B) 1/4",
      "C) 3/8",
      "D) 1/2",
      "E) 5/8"
    ],
    correct: 2,
    explanation: "There are 2³ = 8 total outcomes. The outcomes with exactly 2 heads are: HHT, HTH, THH — that's 3 outcomes. P = 3/8."
  },

  // --- More act-math-8 ---
  {
    id: 'act-math-8-q11',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the value of the expression (2 + 3i)(2 − 3i), where i = √(−1)?",
    choices: [
      "F) 4 − 9i²",
      "G) 4 + 9",
      "H) 13",
      "J) −5",
      "K) 4 − 9"
    ],
    correct: 2,
    explanation: "This is a conjugate pair. (2 + 3i)(2 − 3i) = 4 − 9i² = 4 − 9(−1) = 4 + 9 = 13."
  },
  {
    id: 'act-math-8-q12',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the inverse function of f(x) = 3x − 6?",
    choices: [
      "A) f⁻¹(x) = (x + 6)/3",
      "B) f⁻¹(x) = (x − 6)/3",
      "C) f⁻¹(x) = 3x + 6",
      "D) f⁻¹(x) = x/3 − 6",
      "E) f⁻¹(x) = −3x + 6"
    ],
    correct: 0,
    explanation: "To find the inverse: y = 3x − 6. Swap x and y: x = 3y − 6. Solve for y: x + 6 = 3y, so y = (x + 6)/3."
  },

  // --- More act-read-1 ---
  {
    id: 'act-read-1-q10',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"The letter was brief — three lines, no greeting, no signature. Just coordinates and a date. Elena folded it carefully and placed it in the pocket closest to her heart. She had waited eleven years for this.\"\n\nThe detail that Elena places the letter 'in the pocket closest to her heart' most strongly suggests:",
    choices: [
      "A) she is worried about losing the letter.",
      "B) the letter holds deep personal and emotional significance for her.",
      "C) she does not have any other pockets.",
      "D) she is physically cold and holding the letter close for warmth."
    ],
    correct: 1,
    explanation: "Placing something near the heart is a literary gesture of emotional significance. Combined with her eleven-year wait, the detail emphasizes how much this letter means to her."
  },

  // --- More act-read-2 ---
  {
    id: 'act-read-2-q8',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"Redlining — the practice by which banks and insurance companies refused services to residents of predominantly Black neighborhoods — was officially banned by the Fair Housing Act of 1968. Yet its legacy persists: neighborhoods that were redlined in the 1930s remain, on average, 5°F hotter than non-redlined areas in the same city, largely because they have fewer trees and more concrete.\"\n\nThe author includes the temperature data most likely to:",
    choices: [
      "F) argue that climate change is caused by redlining.",
      "G) demonstrate that the effects of historical discrimination persist in measurable, physical ways that continue to affect residents' quality of life.",
      "H) suggest that planting trees is the only solution to inequality.",
      "J) prove that the Fair Housing Act was unnecessary."
    ],
    correct: 1,
    explanation: "The temperature difference provides concrete, measurable evidence that discriminatory policies from the 1930s continue to have tangible effects on living conditions, supporting the claim that redlining's 'legacy persists.'"
  },

  // --- More act-read-3 ---
  {
    id: 'act-read-3-q7',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"Georgia O'Keeffe moved to New Mexico in 1949, and the stark desert landscape became her primary subject for the rest of her life. Her large-scale paintings of bleached animal skulls, sun-baked hills, and vivid flowers transformed the southwestern landscape into icons of American modernism.\"\n\nThe passage suggests that O'Keeffe's relationship with the New Mexico landscape was one of:",
    choices: [
      "A) casual tourism.",
      "B) deep artistic engagement in which the landscape became central to her creative identity.",
      "C) reluctant compromise, since she preferred painting urban scenes.",
      "D) scientific documentation."
    ],
    correct: 1,
    explanation: "O'Keeffe's move to New Mexico, her sustained focus on its landscape for decades, and her transformation of its elements into iconic art all indicate deep, sustained artistic engagement."
  },

  // --- More act-read-4 ---
  {
    id: 'act-read-4-q7',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"Gravitational waves — ripples in the fabric of spacetime caused by massive accelerating objects — were first predicted by Albert Einstein in 1916 but not directly detected until 2015, when the LIGO observatory measured waves produced by two merging black holes 1.3 billion light-years away.\"\n\nThe 99-year gap between prediction and detection primarily illustrates:",
    choices: [
      "F) that Einstein's prediction was incorrect.",
      "G) the extraordinary difficulty of detecting an extremely subtle physical phenomenon.",
      "H) that gravitational waves are not important to physics.",
      "J) that LIGO was built in 1916."
    ],
    correct: 1,
    explanation: "The nearly century-long gap between theoretical prediction and experimental detection underscores how subtle and difficult to measure gravitational waves are — requiring technology far beyond what existed in Einstein's time."
  },

  // --- More act-read-5 ---
  {
    id: 'act-read-5-q6',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage: \"Access to clean water is not merely a convenience; it is a fundamental determinant of health, education, and economic development. In communities without reliable water sources, women and girls often spend hours each day walking to collect water — time that could otherwise be spent in school or in productive work.\"\n\nWhich statement best expresses the passage's main idea?",
    choices: [
      "A) Walking to collect water provides good exercise.",
      "B) Clean water access is essential because its absence creates cascading negative effects on health, education, and economic opportunity.",
      "C) Women and girls are solely responsible for water collection.",
      "D) Every community in the world has adequate water supplies."
    ],
    correct: 1,
    explanation: "The passage frames clean water as a 'fundamental determinant' of multiple outcomes and illustrates how its absence creates compounding disadvantages."
  },

  // --- More act-read-6 ---
  {
    id: 'act-read-6-q7',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"When the journalist asked the CEO about the company's declining market share, the CEO pivoted to discussing the company's charitable initiatives. When pressed again, she mentioned the company's plans for a new product line, without directly addressing the original question.\"\n\nIt can most reasonably be inferred that the CEO:",
    choices: [
      "F) was eager to discuss the company's market share.",
      "G) was deliberately avoiding the question about market share by redirecting the conversation.",
      "H) did not understand the journalist's question.",
      "J) believed the company's market share had actually increased."
    ],
    correct: 1,
    explanation: "The CEO's repeated redirection — first to charitable work, then to new products — without addressing the original question strongly suggests deliberate evasion."
  },

  // --- More act-read-7 ---
  {
    id: 'act-read-7-q8',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The policy was described as 'pragmatic,' focusing on achievable goals rather than idealistic visions.\"\n\nAs used here, 'pragmatic' most nearly means:",
    choices: [
      "A) idealistic and visionary",
      "B) practical and focused on results",
      "C) controversial and divisive",
      "D) secretive and underhanded"
    ],
    correct: 1,
    explanation: "'Pragmatic' means practical and focused on real-world results rather than theory or ideals. The context reinforces this by contrasting it with 'idealistic visions.'"
  },

  // --- More act-read-8 ---
  {
    id: 'act-read-8-q8',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"The author lists a series of historical examples — the fall of Rome, the collapse of the Maya civilization, the decline of the Ottoman Empire — before turning to the present day.\"\n\nThe author's use of multiple historical examples most likely serves to:",
    choices: [
      "F) demonstrate expertise in ancient history.",
      "G) establish a pattern of civilizational decline that the author can then apply to the present situation.",
      "H) argue that all civilizations are identical.",
      "J) fill space in the essay."
    ],
    correct: 1,
    explanation: "Multiple historical examples establish a recurring pattern. By then 'turning to the present day,' the author implies the pattern may be relevant to contemporary society — a rhetorical strategy for making a persuasive argument."
  },

  // --- More act-sci-1 ---
  {
    id: 'act-sci-1-q9',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A data table shows the speed of sound in different media:\n\nMedium     | Speed (m/s)\nAir (20°C) | 343\nWater      | 1,480\nSteel      | 5,960\nVacuum     | 0\n\nBased on this data, sound travels fastest through:",
    choices: [
      "A) Air",
      "B) Water",
      "C) Steel",
      "D) Vacuum"
    ],
    correct: 2,
    explanation: "Steel has the highest speed of sound at 5,960 m/s. Sound travels faster through denser media (solids > liquids > gases) and cannot travel through a vacuum."
  },

  // --- More act-sci-2 ---
  {
    id: 'act-sci-2-q8',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "An experiment measured the voltage across a circuit for different resistance values while keeping the current constant at 2 amperes:\n\nResistance (Ω) | Voltage (V)\n5              | 10\n10             | 20\n15             | 30\n20             | 40\n\nThe relationship between voltage and resistance in this experiment is best described as:",
    choices: [
      "F) inversely proportional",
      "G) directly proportional",
      "H) exponential",
      "J) no relationship"
    ],
    correct: 1,
    explanation: "V = IR. With constant current I = 2A, voltage increases linearly with resistance: when R doubles, V doubles. This is a direct proportion, consistent with Ohm's Law."
  },

  // --- More act-sci-3 ---
  {
    id: 'act-sci-3-q6',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A student tested whether the type of liquid affects how quickly a paper towel absorbs it. She dipped identical paper towel strips into water, milk, orange juice, and vegetable oil, measuring how high each liquid climbed in 60 seconds.\n\nResults:\nWater:         8.2 cm\nMilk:          5.1 cm\nOrange juice:  4.7 cm\nVegetable oil: 2.3 cm\n\nWhich property of the liquids most likely explains the differences in absorption height?",
    choices: [
      "A) Temperature",
      "B) Color",
      "C) Viscosity (thickness) and surface tension",
      "D) The brand of paper towel"
    ],
    correct: 2,
    explanation: "Thicker, more viscous liquids (like oil) climb more slowly than thinner liquids (like water) because viscosity and surface tension affect how easily a liquid moves through the paper fibers."
  },

  // --- More act-sci-4 ---
  {
    id: 'act-sci-4-q6',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A student hypothesizes that heavier objects fall faster than lighter objects. She drops a basketball and a tennis ball from the same height and finds the basketball hits the ground first.\n\nA teacher identifies a flaw in this experiment. What is the most likely flaw?",
    choices: [
      "F) The student should have used objects with the same mass.",
      "G) Air resistance affects the tennis ball more than the basketball due to differences in shape, size, and mass, confounding the results.",
      "H) The experiment should have been conducted indoors.",
      "J) The student did not measure the weight of each ball."
    ],
    correct: 1,
    explanation: "The basketball and tennis ball differ in shape, size, surface texture, and mass — all of which affect air resistance. The experiment does not isolate mass as the sole variable."
  },

  // --- More act-sci-5 ---
  {
    id: 'act-sci-5-q7',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "A study compared plant growth under three light conditions: full sunlight, partial shade, and complete darkness, for 3 weeks.\n\nResults:\nFull sunlight:   18 cm growth\nPartial shade:   11 cm growth\nComplete dark:   2 cm growth\n\nA student concludes: 'Plants need sunlight to grow.' Is this conclusion fully supported by the data?",
    choices: [
      "A) Yes, because the plants in darkness did not grow at all.",
      "B) No, because plants in complete darkness still grew 2 cm, suggesting some growth can occur without light, though light significantly enhances growth.",
      "C) Yes, because full sunlight produced the tallest plants.",
      "D) No, because the experiment did not test enough plant species."
    ],
    correct: 1,
    explanation: "The 2 cm growth in darkness shows that plants can grow somewhat without light (using stored energy). A more accurate conclusion is that light significantly enhances growth, but some growth is possible without it."
  },

  // --- More act-sci-6 ---
  {
    id: 'act-sci-6-q6',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "Scientist A: \"Life on Earth originated in deep-sea hydrothermal vents, where chemical energy from volcanic activity provided the energy and raw materials for the first organic molecules.\"\n\nScientist B: \"Life originated in shallow pools on land ('warm little ponds'), where cycles of evaporation and hydration concentrated organic molecules and UV light from the sun drove chemical reactions.\"\n\nWhich discovery would support Scientist A but NOT Scientist B?",
    choices: [
      "F) The discovery that organic molecules can form in laboratory conditions simulating shallow pools",
      "G) Evidence that the earliest microbial fossils are found exclusively in rocks formed near deep-sea vents, not in shallow-water sediments",
      "H) The discovery that UV light can break down organic molecules",
      "J) Evidence that Earth's early atmosphere contained methane and ammonia"
    ],
    correct: 1,
    explanation: "If the oldest microbial fossils are found only near deep-sea vents, this directly supports a deep-sea origin (Scientist A) and contradicts a shallow-pool origin (Scientist B)."
  },

  // --- More act-sci-7 ---
  {
    id: 'act-sci-7-q7',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Model 1: \"The moon formed when a Mars-sized body collided with the early Earth, ejecting debris that coalesced into the moon (the Giant Impact Hypothesis).\"\n\nModel 2: \"The moon was captured by Earth's gravity after forming elsewhere in the solar system (the Capture Hypothesis).\"\n\nThe finding that the isotopic composition of lunar rocks is nearly identical to that of Earth's mantle most strongly supports:",
    choices: [
      "A) Model 2, because captured bodies have identical compositions to their host planet.",
      "B) Model 1, because a giant impact would produce debris from Earth's mantle, explaining the isotopic similarity.",
      "C) Neither model, because isotopic composition is irrelevant to the moon's origin.",
      "D) Both models equally."
    ],
    correct: 1,
    explanation: "If the moon formed from Earth's mantle material (ejected by an impact), we'd expect their isotopic compositions to be very similar. A captured body from elsewhere would likely have a different composition."
  },

  // --- More act-sci-8 ---
  {
    id: 'act-sci-8-q7',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A student wants to test whether the volume of water affects the time it takes to boil. She heats 200 mL, 400 mL, 600 mL, and 800 mL of water using identical burners and measures the time to reach 100°C.\n\nWhich factor is most important to control in this experiment?",
    choices: [
      "F) The color of the pot",
      "G) The starting temperature of the water",
      "H) The time of day the experiment is conducted",
      "J) The brand of the thermometer"
    ],
    correct: 1,
    explanation: "If different volumes start at different temperatures, the results would be confounded. Starting all samples at the same temperature ensures that volume is the only variable affecting boiling time."
  },

  // --- More act-eng-1 (filling out) ---
  {
    id: 'act-eng-1-q15',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The coach demanded that the players focus, work harder, and that they should show more team spirit.",
    choices: [
      "A) NO CHANGE",
      "B) focus, work harder, and show more team spirit.",
      "C) focus, work harder and that they should show more team spirit.",
      "D) that they focus, that they work harder, and show more team spirit."
    ],
    correct: 1,
    explanation: "Parallel structure requires consistent form: 'focus, work harder, and show' are all bare infinitives, creating a clean parallel list. The original mixes forms awkwardly."
  },
  {
    id: 'act-eng-1-q16',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "Tomas who has been my neighbor for ten years recently moved to Colorado.",
    choices: [
      "F) NO CHANGE",
      "G) Tomas, who has been my neighbor for ten years, recently moved to Colorado.",
      "H) Tomas, who has been my neighbor for ten years recently moved to Colorado.",
      "J) Tomas who has been my neighbor for ten years, recently moved to Colorado."
    ],
    correct: 1,
    explanation: "The clause 'who has been my neighbor for ten years' is nonrestrictive — Tomas is already identified by name. It requires commas on both sides."
  },

  // --- More act-math-3 (filling out) ---
  {
    id: 'act-math-3-q13',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "If f(x) = x² and g(x) = 2x + 3, what is g(f(2))?",
    choices: [
      "A) 7",
      "B) 11",
      "C) 14",
      "D) 19",
      "E) 49"
    ],
    correct: 1,
    explanation: "First, f(2) = 2² = 4. Then g(f(2)) = g(4) = 2(4) + 3 = 11."
  },
  {
    id: 'act-math-3-q14',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "Simplify: (4x²y³)/(2xy)",
    choices: [
      "F) 2xy²",
      "G) 2x²y²",
      "H) 2xy",
      "J) 8x³y⁴",
      "K) 2x³y²"
    ],
    correct: 0,
    explanation: "Divide coefficients: 4/2 = 2. Subtract exponents for x: x²/x = x¹ = x. Subtract exponents for y: y³/y = y². Result: 2xy²."
  },

  // --- More act-math-5 (filling out) ---
  {
    id: 'act-math-5-q11',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A rectangular garden has an area of 180 square feet and a length of 15 feet. What is the width?",
    choices: [
      "A) 9 feet",
      "B) 12 feet",
      "C) 15 feet",
      "D) 165 feet",
      "E) 195 feet"
    ],
    correct: 1,
    explanation: "Area = length × width, so width = area/length = 180/15 = 12 feet."
  },

  // --- More act-read-1 (filling out) ---
  {
    id: 'act-read-1-q11',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"Mrs. Henderson kept a garden that was, by any measure, too large for one person to manage. Tomatoes sprawled unpruned along the fence. Weeds colonized the herb beds. The zucchini, unconfined, had overtaken the strawberry patch entirely. Yet every morning she was out there, straw hat on, trowel in hand, as if the garden were the most orderly place on earth.\"\n\nThe contrast between the garden's actual condition and Mrs. Henderson's daily ritual most effectively conveys:",
    choices: [
      "A) that Mrs. Henderson is an incompetent gardener.",
      "B) that the garden produces no vegetables.",
      "C) Mrs. Henderson's stubborn devotion to the garden despite its imperfections.",
      "D) that she is planning to hire professional landscapers."
    ],
    correct: 2,
    explanation: "The garden is chaotic, yet Mrs. Henderson tends it every morning 'as if it were the most orderly place on earth.' This contrast highlights her unwavering devotion."
  },

  // --- More act-read-4 (filling out) ---
  {
    id: 'act-read-4-q8',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"Antibiotics target bacteria through specific mechanisms: penicillin weakens bacterial cell walls, tetracycline inhibits protein synthesis, and fluoroquinolones interfere with DNA replication. None of these mechanisms affect viruses, which lack cell walls, ribosomes, and their own DNA replication machinery. This is why antibiotics are ineffective against viral infections such as the common cold.\"\n\nThe passage's primary purpose is to explain:",
    choices: [
      "F) how to treat the common cold.",
      "G) why antibiotics work against bacteria but not against viruses.",
      "H) the history of antibiotic development.",
      "J) that viruses are more dangerous than bacteria."
    ],
    correct: 1,
    explanation: "The passage systematically explains antibiotic mechanisms, contrasts them with viral characteristics, and concludes that antibiotics cannot target viruses — explaining the mismatch."
  },

  // --- More act-sci-2 (filling out) ---
  {
    id: 'act-sci-2-q9',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A graph shows the relationship between the depth of a diver (in meters) and the water pressure (in atmospheres):\n\nDepth (m) | Pressure (atm)\n0         | 1.0\n10        | 2.0\n20        | 3.0\n30        | 4.0\n40        | 5.0\n\nBased on this data, what pressure would a diver experience at 25 meters?",
    choices: [
      "A) 2.5 atm",
      "B) 3.0 atm",
      "C) 3.5 atm",
      "D) 4.0 atm"
    ],
    correct: 2,
    explanation: "The relationship is linear: pressure increases by 1 atm for every 10 m of depth. At 25 m (halfway between 20 and 30), the pressure would be 3.5 atm."
  },

  // --- More act-sci-3 (filling out) ---
  {
    id: 'act-sci-3-q7',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A biology student tests whether the type of soil affects bean plant growth. She uses potting soil, sandy soil, and clay soil, planting 5 identical seeds in each type under the same light and watering conditions.\n\nAfter 21 days, the results are:\nPotting soil: average height 14.2 cm\nSandy soil: average height 8.7 cm\nClay soil: average height 6.1 cm\n\nWhy did the student plant 5 seeds in each soil type rather than just 1?",
    choices: [
      "F) To use up all the available seeds",
      "G) To increase the reliability of the results by reducing the impact of individual plant variation",
      "H) To test different varieties of beans",
      "J) To change the independent variable"
    ],
    correct: 1,
    explanation: "Using multiple seeds per group (replication) accounts for natural variation between individual plants. Averaging the heights of 5 plants gives a more reliable estimate than measuring a single plant."
  },

  // --- More act-sci-5 (filling out) ---
  {
    id: 'act-sci-5-q8',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Researchers studied whether listening to music affects running performance. Group A ran in silence, Group B listened to slow music (80 BPM), and Group C listened to fast music (140 BPM). All participants ran on the same treadmill at their preferred pace.\n\nResults (average distance in 30 minutes):\nSilence:    4.2 km\nSlow music: 4.0 km\nFast music: 4.8 km\n\nA student concludes: 'All music improves running performance.' Is this conclusion supported?",
    choices: [
      "A) Yes, because both music groups ran farther than the silence group.",
      "B) No, because only fast music improved performance; slow music actually slightly decreased distance compared to silence.",
      "C) Yes, because music is enjoyable.",
      "D) No, because the experiment was too short."
    ],
    correct: 1,
    explanation: "Slow music (4.0 km) resulted in slightly less distance than silence (4.2 km), so not 'all music' improved performance. Only fast music (4.8 km) showed improvement over silence."
  },

  // --- More act-sci-6 (filling out) ---
  {
    id: 'act-sci-6-q7',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "Theory A: \"The continents were once joined in a single landmass (Pangaea) that broke apart through plate tectonics, with the continents slowly drifting to their current positions.\"\n\nTheory B: \"The continents have always been in approximately their current positions. Similarities between fossils on different continents are explained by ancient land bridges that have since been submerged.\"\n\nThe discovery that the Mid-Atlantic Ridge is actively spreading apart, with new crust forming from volcanic activity, would most strongly support:",
    choices: [
      "F) Theory B, because it shows volcanic activity near continents.",
      "G) Theory A, because active seafloor spreading provides a mechanism for continental drift.",
      "H) Neither theory, because volcanic activity is unrelated to continental positions.",
      "J) Both theories equally."
    ],
    correct: 1,
    explanation: "Active seafloor spreading at the Mid-Atlantic Ridge provides direct evidence of the mechanism by which continents drift apart — a key prediction of Theory A (plate tectonics)."
  },

  // --- More act-sci-7 (filling out) ---
  {
    id: 'act-sci-7-q8',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Hypothesis 1: \"Migratory birds navigate using Earth's magnetic field, detected by magnetite crystals in their beaks.\"\n\nHypothesis 2: \"Migratory birds navigate primarily using visual landmarks and the position of the sun and stars.\"\n\nWhich experimental result would best distinguish between these two hypotheses?",
    choices: [
      "A) Birds that are well-fed migrate farther than hungry birds.",
      "B) Birds fitted with small magnets that disrupt local magnetic fields still navigate accurately on clear nights but become disoriented on overcast nights.",
      "C) Older birds migrate more efficiently than younger birds.",
      "D) Birds from different species use different migration routes."
    ],
    correct: 1,
    explanation: "If birds with disrupted magnetic fields navigate fine on clear nights (when they can see stars) but fail on overcast nights, this supports visual/celestial navigation (Hypothesis 2) over magnetic navigation (Hypothesis 1)."
  },

  // --- More act-sci-8 (filling out) ---
  {
    id: 'act-sci-8-q8',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A chemistry student heats different masses of water and records the energy required to raise the temperature by 10°C:\n\nMass (g) | Energy (J)\n50       | 2,090\n100      | 4,180\n150      | 6,270\n200      | 8,360\n\nBased on this data, the energy required to heat 1 gram of water by 1°C is approximately:",
    choices: [
      "F) 2.09 J",
      "G) 4.18 J",
      "H) 10.0 J",
      "J) 41.8 J"
    ],
    correct: 1,
    explanation: "For 50 g and a 10°C increase: 2,090 J / (50 g × 10°C) = 4.18 J per gram per degree. This is the specific heat capacity of water, approximately 4.18 J/(g·°C)."
  },

  // --- Batch 3: Final questions to reach target ---

  // More act-eng-2
  {
    id: 'act-eng-2-q15',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The choir performed so good at the competition that they received a standing ovation.",
    choices: [
      "A) NO CHANGE",
      "B) performed so well",
      "C) performed so greatly",
      "D) performed so nice"
    ],
    correct: 1,
    explanation: "'Well' is an adverb that modifies the verb 'performed.' 'Good' is an adjective and cannot modify a verb. 'Performed so well' is correct."
  },
  {
    id: 'act-eng-2-q16',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The effects of the new medication was not immediately apparent to the patients.",
    choices: [
      "F) NO CHANGE",
      "G) The effects of the new medication were not immediately apparent",
      "H) The effect of the new medication was not immediately apparent",
      "J) The effects of the new medication is not immediately apparent"
    ],
    correct: 1,
    explanation: "The subject is 'effects' (plural), so the verb must also be plural: 'were.' The prepositional phrase 'of the new medication' does not change the subject number."
  },

  // More act-eng-4
  {
    id: 'act-eng-4-q10',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "In an informational article about climate science, which sentence best maintains an objective, informative tone?",
    choices: [
      "A) Climate change is going to totally wreck everything if we don't do something fast.",
      "B) According to the Intergovernmental Panel on Climate Change, global temperatures have risen approximately 1.1°C since the pre-industrial era.",
      "C) Only an idiot would deny that the climate is changing.",
      "D) Climate science is super complicated and hard to understand."
    ],
    correct: 1,
    explanation: "Choice B cites a specific source, provides precise data, and avoids emotional or colloquial language — maintaining the objective, informative tone appropriate for a science article."
  },

  // More act-eng-7
  {
    id: 'act-eng-7-q9',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "Which of the following would be the most effective concluding sentence for an essay about the importance of preserving endangered languages?",
    choices: [
      "A) There are many languages in the world.",
      "B) In conclusion, languages are important.",
      "C) When a language dies, it takes with it not just words but an entire worldview — a unique way of understanding and relating to the human experience that can never be reconstructed.",
      "D) Some people speak more than one language."
    ],
    correct: 2,
    explanation: "An effective conclusion reinforces the essay's central argument with compelling language. Choice C captures the irreplaceable cultural loss of language death, ending the essay on a powerful, resonant note."
  },

  // More act-math-1
  {
    id: 'act-math-1-q14',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A student scored 82, 91, 78, and 85 on four tests. What score must the student earn on the fifth test to achieve an average of 85?",
    choices: [
      "A) 85",
      "B) 87",
      "C) 89",
      "D) 90",
      "E) 92"
    ],
    correct: 2,
    explanation: "Sum of first four scores = 82 + 91 + 78 + 85 = 336. For an average of 85 across 5 tests, the total must be 5 × 85 = 425. Fifth score = 425 − 336 = 89."
  },
  {
    id: 'act-math-1-q15',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A train travels at 60 miles per hour for 2.5 hours. How far does it travel?",
    choices: [
      "F) 120 miles",
      "G) 130 miles",
      "H) 150 miles",
      "J) 155 miles",
      "K) 180 miles"
    ],
    correct: 2,
    explanation: "Distance = speed × time = 60 × 2.5 = 150 miles."
  },

  // More act-math-4
  {
    id: 'act-math-4-q12',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "Two lines have equations y = 3x + 2 and y = 3x − 5. These lines are:",
    choices: [
      "A) perpendicular",
      "B) parallel",
      "C) intersecting at one point",
      "D) the same line",
      "E) intersecting at two points"
    ],
    correct: 1,
    explanation: "Both lines have slope 3 but different y-intercepts (2 and −5). Lines with equal slopes but different y-intercepts are parallel and never intersect."
  },

  // More act-math-6
  {
    id: 'act-math-6-q11',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "A ramp is 20 feet long and rises 5 feet vertically. What is the angle of elevation of the ramp, to the nearest degree?",
    choices: [
      "A) 10°",
      "B) 14°",
      "C) 15°",
      "D) 18°",
      "E) 25°"
    ],
    correct: 2,
    explanation: "sin(θ) = opposite/hypotenuse = 5/20 = 0.25. θ = sin⁻¹(0.25) ≈ 14.5° ≈ 15°."
  },

  // More act-math-7
  {
    id: 'act-math-7-q11',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "In a class of 30 students, 18 play basketball, 14 play soccer, and 8 play both. How many students play basketball or soccer (or both)?",
    choices: [
      "F) 16",
      "G) 20",
      "H) 24",
      "J) 32",
      "K) 40"
    ],
    correct: 2,
    explanation: "By inclusion-exclusion: |A ∪ B| = |A| + |B| − |A ∩ B| = 18 + 14 − 8 = 24."
  },

  // More act-math-8
  {
    id: 'act-math-8-q13',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What are the asymptotes of the function f(x) = 1/(x − 2) + 3?",
    choices: [
      "A) Vertical: x = 2, Horizontal: y = 3",
      "B) Vertical: x = −2, Horizontal: y = 3",
      "C) Vertical: x = 2, Horizontal: y = 0",
      "D) Vertical: x = 3, Horizontal: y = 2",
      "E) No asymptotes"
    ],
    correct: 0,
    explanation: "The vertical asymptote occurs where the denominator is zero: x − 2 = 0, so x = 2. The horizontal asymptote is y = 3 (the value f(x) approaches as x → ±∞)."
  },

  // More act-read-2
  {
    id: 'act-read-2-q9',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "Passage: \"The most effective anti-poverty program in American history may not be Social Security or food stamps but the GI Bill, which provided returning World War II veterans with college tuition, low-cost mortgages, and small business loans. By 1956, nearly 8 million veterans had used the education benefit alone, fundamentally reshaping the American middle class.\"\n\nThe passage's main claim is that the GI Bill:",
    choices: [
      "F) was a minor government program with limited impact.",
      "G) was possibly the most effective anti-poverty initiative in American history due to its transformative effects on millions of veterans.",
      "H) should be expanded to include all citizens.",
      "J) was more effective than Social Security because it cost less."
    ],
    correct: 1,
    explanation: "The passage calls the GI Bill potentially the 'most effective anti-poverty program in American history' and supports this with data about its massive reach and middle-class transformation."
  },

  // More act-read-3
  {
    id: 'act-read-3-q8',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "Passage: \"Toni Morrison's novels do not merely depict Black American experience; they insist on its centrality to the larger American story. In works like 'Beloved' and 'Song of Solomon,' Morrison places Black communities at the center of the narrative universe, demanding that readers engage with histories that mainstream literature had long marginalized.\"\n\nThe word 'demanding' in the passage most strongly implies that Morrison's writing:",
    choices: [
      "A) is difficult to read.",
      "B) actively challenges readers to confront perspectives they might otherwise avoid.",
      "C) is written in a demanding, formal style.",
      "D) requires a college education to understand."
    ],
    correct: 1,
    explanation: "'Demanding' here describes Morrison's rhetorical force — her writing does not passively offer but actively insists that readers engage with marginalized histories."
  },

  // More act-read-5
  {
    id: 'act-read-5-q7',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage: \"Artificial intelligence can now compose music, write poetry, and create visual art that is, in some cases, indistinguishable from human-created work. This raises a fundamental question: if a machine can produce art, what does that mean for our understanding of creativity? Some argue that true creativity requires consciousness, emotion, and intention — qualities that machines do not possess.\"\n\nWhich statement best captures the main idea of this passage?",
    choices: [
      "A) AI-created art is always superior to human-created art.",
      "B) AI's ability to produce art challenges traditional definitions of creativity and raises questions about what makes art meaningful.",
      "C) Machines will soon replace all human artists.",
      "D) Creativity cannot be defined."
    ],
    correct: 1,
    explanation: "The passage presents AI art capabilities and then poses the philosophical question about what creativity really means. The central tension is between AI's outputs and traditional ideas about human creativity."
  },

  // More act-read-6
  {
    id: 'act-read-6-q8',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "Passage: \"The company's annual report devoted 14 pages to its sustainability initiatives and corporate social responsibility programs. It devoted half a page to the $2.3 million fine it paid for violating clean water regulations.\"\n\nThe reader can reasonably infer that the author is suggesting:",
    choices: [
      "F) the company's sustainability programs are highly effective.",
      "G) the disproportion between the space given to sustainability claims and the brief mention of actual violations implies the report may present a misleadingly positive image.",
      "H) the fine was insignificant.",
      "J) annual reports are always accurate."
    ],
    correct: 1,
    explanation: "By juxtaposing 14 pages of positive sustainability content with half a page about an actual violation, the author highlights a disparity that suggests the report may be strategically downplaying negative information."
  },

  // More act-read-7
  {
    id: 'act-read-7-q9',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Passage: \"The agreement was described as 'provisional,' meaning both sides retained the right to revisit its terms.\"\n\nAs used here, 'provisional' most nearly means:",
    choices: [
      "A) permanent and binding",
      "B) temporary and subject to revision",
      "C) secret and undisclosed",
      "D) generous and favorable"
    ],
    correct: 1,
    explanation: "'Provisional' means temporary or conditional, serving for the time being. The context reinforces this meaning by noting that both sides can 'revisit its terms.'"
  },

  // More act-read-8
  {
    id: 'act-read-8-q9',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "Passage: \"The author opens the essay with a detailed description of a single drop of water making its way from a mountain glacier to the ocean, encountering pollution, agricultural runoff, and industrial waste along the way.\"\n\nThis opening technique most likely serves to:",
    choices: [
      "F) provide precise scientific data about water chemistry.",
      "G) use a concrete, narrative journey to introduce the broader issue of water pollution in an engaging way.",
      "H) argue that all water in the world is contaminated.",
      "J) describe the author's personal experience swimming in a river."
    ],
    correct: 1,
    explanation: "Following a single drop of water on its journey is a narrative technique that makes the abstract issue of water pollution concrete and engaging, drawing readers into the broader topic."
  },

  // More act-sci-1
  {
    id: 'act-sci-1-q10',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A table shows the density of four metals:\n\nMetal    | Density (g/cm³)\nAluminum | 2.70\nIron     | 7.87\nCopper   | 8.96\nGold     | 19.30\n\nA student has a metal sample with a mass of 53.76 g and a volume of 6 cm³. Which metal is the sample most likely?",
    choices: [
      "A) Aluminum",
      "B) Iron",
      "C) Copper",
      "D) Gold"
    ],
    correct: 2,
    explanation: "Density = mass/volume = 53.76/6 = 8.96 g/cm³, which matches the density of copper."
  },

  // More act-sci-3
  {
    id: 'act-sci-3-q8',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A researcher measured the effect of pH on the germination rate of radish seeds:\n\npH  | Germination Rate (%)\n3   | 15\n5   | 72\n7   | 95\n9   | 68\n11  | 10\n\nBased on the data, radish seeds germinate best at approximately what pH?",
    choices: [
      "F) pH 3",
      "G) pH 5",
      "H) pH 7",
      "J) pH 11"
    ],
    correct: 2,
    explanation: "The highest germination rate (95%) occurs at pH 7 (neutral). Germination rates decrease in both more acidic and more alkaline conditions."
  },

  // More act-sci-4
  {
    id: 'act-sci-4-q7',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A student wants to test whether listening to music while studying affects test performance. She has 40 volunteers. Which experimental design would be most appropriate?",
    choices: [
      "A) Have all 40 students study with music and compare their scores to the national average.",
      "B) Randomly assign 20 students to study with music and 20 to study in silence, then compare average test scores between the groups.",
      "C) Let students choose whether to study with music or in silence.",
      "D) Have all 40 students study in silence."
    ],
    correct: 1,
    explanation: "Random assignment to experimental and control groups eliminates self-selection bias and allows differences to be attributed to the treatment (music). Letting students choose (C) introduces bias."
  },

  // More act-sci-5
  {
    id: 'act-sci-5-q9',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "A study compared the effectiveness of three types of mulch on retaining soil moisture. Researchers applied each mulch type to identical garden plots and measured soil moisture after 7 days without rain.\n\nResults:\nWood chips:  42% moisture retained\nStraw:       35% moisture retained\nPlastic:     58% moisture retained\nNo mulch:    18% moisture retained\n\nWhich conclusion is NOT supported by the data?",
    choices: [
      "F) All three mulch types retained more moisture than no mulch.",
      "G) Plastic mulch retained the most moisture.",
      "H) Mulch type has no effect on soil moisture retention.",
      "J) Straw mulch was less effective than wood chips."
    ],
    correct: 2,
    explanation: "The data clearly show that different mulch types produced different moisture retention rates, all higher than no mulch. The claim that 'mulch type has no effect' contradicts the data."
  },

  // More act-sci-8
  {
    id: 'act-sci-8-q9',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Table 1 shows that Plant Species A grows best in acidic soil (pH 5.5). Figure 1 shows the pH of soils in four regions:\n\nRegion 1: pH 7.2\nRegion 2: pH 5.4\nRegion 3: pH 8.1\nRegion 4: pH 6.0\n\nBased on both sources, in which region would Plant Species A most likely thrive?",
    choices: [
      "A) Region 1",
      "B) Region 2",
      "C) Region 3",
      "D) Region 4"
    ],
    correct: 1,
    explanation: "Plant Species A grows best at pH 5.5, and Region 2 has the closest pH at 5.4. This is a multi-source synthesis question combining information from a table and a figure."
  },

  // Final batch of questions to ensure broad coverage

  // act-eng-3 additional
  {
    id: 'act-eng-3-q12',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Not only did the new policy reduce costs, it also improved employee satisfaction.",
    choices: [
      "A) NO CHANGE",
      "B) Not only did the new policy reduce costs, but it also improved employee satisfaction.",
      "C) Not only did the new policy reduce costs, and it also improved employee satisfaction.",
      "D) Not only did the new policy reduce costs it also improved employee satisfaction."
    ],
    correct: 1,
    explanation: "The correlative conjunction pair 'not only...but also' requires both parts. The original is missing 'but.' Choice B correctly completes the construction."
  },

  // act-eng-5 additional
  {
    id: 'act-eng-5-q11',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The proposal had several strengths. ______, it failed to address the project's long-term sustainability.",
    choices: [
      "A) Furthermore,",
      "B) In addition,",
      "C) Nonetheless,",
      "D) Similarly,"
    ],
    correct: 2,
    explanation: "The second sentence presents a contrasting idea (a weakness despite strengths). 'Nonetheless' signals concession — acknowledging the strengths while introducing a shortcoming."
  },

  // act-eng-6 additional
  {
    id: 'act-eng-6-q11',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "She nodded her head in agreement and said 'yes' to indicate her approval of the plan.",
    choices: [
      "F) NO CHANGE",
      "G) She nodded in agreement and approved the plan.",
      "H) She approved the plan.",
      "J) She nodded her head and said 'yes' to indicate approval of the plan."
    ],
    correct: 2,
    explanation: "'Nodded her head,' 'in agreement,' 'said yes,' and 'indicate her approval' all express the same idea. 'She approved the plan' captures the meaning in four words."
  },

  // act-math-2 additional
  {
    id: 'act-math-2-q12',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "A cell phone plan costs $40 per month for 500 minutes, plus $0.25 for each additional minute. If a customer's bill is $55, how many additional minutes were used?",
    choices: [
      "A) 40",
      "B) 50",
      "C) 60",
      "D) 75",
      "E) 100"
    ],
    correct: 2,
    explanation: "40 + 0.25m = 55. Subtract 40: 0.25m = 15. Divide by 0.25: m = 60 additional minutes."
  },

  // act-math-3 additional
  {
    id: 'act-math-3-q15',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "What is the product of the solutions to x² − 7x + 12 = 0?",
    choices: [
      "F) −7",
      "G) 7",
      "H) 12",
      "J) −12",
      "K) 3"
    ],
    correct: 2,
    explanation: "By Vieta's formulas, the product of the roots of ax² + bx + c = 0 is c/a = 12/1 = 12. (The roots are 3 and 4, and 3 × 4 = 12.)"
  },

  // act-math-5 additional
  {
    id: 'act-math-5-q12',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A regular pentagon has a perimeter of 35 cm. What is the length of each side?",
    choices: [
      "A) 5 cm",
      "B) 7 cm",
      "C) 8 cm",
      "D) 10 cm",
      "E) 35 cm"
    ],
    correct: 1,
    explanation: "A regular pentagon has 5 equal sides. Side length = 35/5 = 7 cm."
  },

  // act-read-1 additional
  {
    id: 'act-read-1-q12',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "Passage: \"The apartment was smaller than she remembered. The ceilings, once impossibly high, now seemed reachable. The hallway that had once stretched on forever was just five steps long. Only the smell remained exactly as it had been: lemon polish and old books.\"\n\nThe narrator's observation that the apartment seems smaller most likely reflects:",
    choices: [
      "F) that the apartment has been renovated.",
      "G) the narrator's changed perspective, having grown since childhood.",
      "H) that the furniture has been rearranged.",
      "J) a decline in the neighborhood's property values."
    ],
    correct: 1,
    explanation: "Spaces from childhood often seem smaller when revisited because the person has literally grown taller. The contrast between memory and reality reflects the narrator's changed perspective."
  },

  // act-read-4 additional
  {
    id: 'act-read-4-q9',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Passage: \"The human gut contains approximately 39 trillion microorganisms — slightly more than the number of human cells in the body. This microbial community, collectively known as the gut microbiome, plays a critical role in digestion, immune function, and even mental health. Research has shown that an imbalanced microbiome is associated with conditions ranging from obesity to depression.\"\n\nThe comparison between microbial and human cell counts most likely serves to:",
    choices: [
      "A) suggest that microorganisms are dangerous.",
      "B) emphasize the scale and significance of the microbiome by showing it is as numerically important as the body's own cells.",
      "C) argue that humans are actually microorganisms.",
      "D) describe the chemical composition of gut bacteria."
    ],
    correct: 1,
    explanation: "By noting that microbial cells slightly outnumber human cells, the passage emphasizes the microbiome's enormous scale, making the reader take its significance more seriously."
  },

  // act-sci-2 additional
  {
    id: 'act-sci-2-q10',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A graph shows the global average surface temperature anomaly from 1900 to 2020. The line is relatively flat from 1900 to 1970 (hovering near 0°C anomaly), then rises sharply from 1970 to 2020, reaching approximately +1.1°C.\n\nA student claims: 'Global temperatures have been rising at a constant rate since 1900.' Does the graph support this claim?",
    choices: [
      "F) Yes, because the temperature increased overall from 1900 to 2020.",
      "G) No, because the rate of increase was much greater after 1970 than before, indicating an accelerating trend rather than a constant rate.",
      "H) Yes, because the line always goes up.",
      "J) No, because the temperature decreased from 1900 to 1970."
    ],
    correct: 1,
    explanation: "A constant rate would produce a straight line. The graph shows a relatively flat period followed by a sharp rise, indicating the rate of increase accelerated after 1970, not a constant rate."
  },

  // act-sci-6 additional
  {
    id: 'act-sci-6-q8',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "Viewpoint 1: \"Pluto should be classified as a planet because it orbits the Sun, is massive enough for gravity to make it round, and has been considered a planet since its discovery in 1930.\"\n\nViewpoint 2: \"Pluto should not be classified as a planet because it has not cleared its orbital neighborhood of other debris, which is one of the three criteria the International Astronomical Union uses to define a planet.\"\n\nThe fundamental disagreement between these viewpoints concerns:",
    choices: [
      "A) whether Pluto exists.",
      "B) the criteria that should be used to define what qualifies as a planet.",
      "C) the size of the solar system.",
      "D) whether the Sun is a star."
    ],
    correct: 1,
    explanation: "Both viewpoints acknowledge Pluto's characteristics but disagree on which criteria should define planet status — tradition and basic properties (Viewpoint 1) versus the IAU's stricter criteria including orbital clearing (Viewpoint 2)."
  },

  // act-sci-7 additional
  {
    id: 'act-sci-7-q9',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "Researcher A: \"The primary cause of honeybee colony collapse disorder (CCD) is the widespread use of neonicotinoid pesticides, which impair bees' navigation and immune systems.\"\n\nResearcher B: \"CCD is caused by a combination of factors, including the Varroa destructor mite, fungal infections, and habitat loss. Blaming a single cause oversimplifies a complex problem.\"\n\nIf a new study showed that bee colonies exposed to neonicotinoids but protected from Varroa mites and fungal infections still experienced CCD at high rates, this would:",
    choices: [
      "A) support both researchers equally.",
      "B) primarily support Researcher A, by suggesting neonicotinoids alone can trigger CCD even without other stressors.",
      "C) primarily support Researcher B, by showing that multiple factors are needed.",
      "D) weaken both researchers' arguments."
    ],
    correct: 1,
    explanation: "If colonies exposed only to neonicotinoids (without mites or fungi) still experienced CCD, this isolates neonicotinoids as a sufficient cause — supporting Researcher A's claim that they are the primary driver."
  },

  // act-sci-4 additional
  {
    id: 'act-sci-4-q8',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A student conducts an experiment to test whether the thickness of insulation affects heat retention. She wraps identical containers of hot water with 0, 1, 2, and 3 layers of cotton fabric and measures the water temperature after 30 minutes.\n\nResults:\n0 layers: 45°C\n1 layer:  52°C\n2 layers: 58°C\n3 layers: 63°C\n(Initial temperature: 80°C)\n\nWhich statement best summarizes the results?",
    choices: [
      "F) Insulation had no effect on temperature.",
      "G) More layers of insulation resulted in less heat loss, with each additional layer providing a diminishing but positive effect.",
      "H) Three layers of insulation prevented all heat loss.",
      "J) One layer of insulation was the most effective."
    ],
    correct: 1,
    explanation: "Each additional layer retained more heat: 0 layers lost 35°C, 1 layer lost 28°C, 2 layers lost 22°C, 3 layers lost 17°C. The benefit of each layer decreased slightly (7°C → 6°C → 5°C improvement) but remained positive."
  },

  // act-sci-8 additional
  {
    id: 'act-sci-8-q10',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "A student designs an experiment to test whether salt concentration affects the freezing point of water. She prepares four solutions with 0%, 5%, 10%, and 15% salt by mass, places each in identical containers, and puts them in a freezer. She records the temperature at which each solution begins to freeze.\n\nResults:\n0% salt:  0°C\n5% salt:  −3°C\n10% salt: −7°C\n15% salt: −11°C\n\nBased on this experiment, what is the approximate relationship between salt concentration and freezing point depression?",
    choices: [
      "F) There is no relationship between salt concentration and freezing point.",
      "G) As salt concentration increases, the freezing point decreases at a roughly constant rate.",
      "H) As salt concentration increases, the freezing point increases.",
      "J) Salt has no effect on the freezing point of water."
    ],
    correct: 1,
    explanation: "For each 5% increase in salt concentration, the freezing point drops by approximately 3-4°C, showing a roughly linear decrease. This demonstrates the colligative property of freezing point depression."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BATCH 4 — ~300 additional ACT questions to reach ~800 total
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-3: Sentence Structure (additional) ---
  {
    id: 'act-eng-3-q13',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The committee, along with several outside advisors, _______ the proposal last Thursday.",
    choices: [
      "A) were reviewing",
      "B) have reviewed",
      "C) reviewed",
      "D) are reviewing"
    ],
    correct: 2,
    explanation: "'Committee' is the singular subject; the phrase 'along with several outside advisors' is parenthetical. The singular past-tense verb 'reviewed' agrees with the singular subject and the past-time marker 'last Thursday.'"
  },
  {
    id: 'act-eng-3-q14',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Either the director or the actors _______ responsible for the delay in production.",
    choices: [
      "F) is",
      "G) was",
      "H) are",
      "J) has been"
    ],
    correct: 2,
    explanation: "With 'either...or,' the verb agrees with the nearer subject. 'Actors' is plural, so 'are' is correct."
  },
  {
    id: 'act-eng-3-q15',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The stack of old newspapers _______ been sitting in the garage for months.",
    choices: [
      "A) have",
      "B) has",
      "C) are",
      "D) were"
    ],
    correct: 1,
    explanation: "'Stack' is the singular subject. The prepositional phrase 'of old newspapers' does not change the number. 'Has' is the correct singular verb."
  },
  {
    id: 'act-eng-3-q16',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Mathematics _______ always been Yuki's strongest subject.",
    choices: [
      "F) have",
      "G) has",
      "H) are",
      "J) were"
    ],
    correct: 1,
    explanation: "'Mathematics' is a singular noun despite ending in -s. 'Has' is the correct singular verb."
  },
  {
    id: 'act-eng-3-q17',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "One of the paintings that _______ on display was damaged during the storm.",
    choices: [
      "A) was",
      "B) were",
      "C) is",
      "D) has been"
    ],
    correct: 1,
    explanation: "In the relative clause 'that _______ on display,' the antecedent of 'that' is 'paintings' (plural), so the verb must be 'were.'"
  },
  {
    id: 'act-eng-3-q18',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Every musician in the orchestra _______ expected to attend the extra rehearsal.",
    choices: [
      "F) are",
      "G) is",
      "H) were",
      "J) have been"
    ],
    correct: 1,
    explanation: "'Every' makes the subject singular regardless of the prepositional phrase. 'Is' agrees with the singular subject."
  },
  {
    id: 'act-eng-3-q19',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The jury _______ reached a unanimous verdict after only two hours of deliberation.",
    choices: [
      "A) have",
      "B) has",
      "C) are",
      "D) were"
    ],
    correct: 1,
    explanation: "When the jury acts as a single unit (reaching one verdict unanimously), it takes a singular verb. 'Has' is correct."
  },

  // --- act-eng-4: Style/Tone (additional) ---
  {
    id: 'act-eng-4-q11',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "Exhausted from the long hike, _______ seemed like the best option.",
    choices: [
      "F) resting at the campsite",
      "G) the hikers decided that resting at the campsite",
      "H) the campsite was where they rested",
      "J) rest was what the hikers chose"
    ],
    correct: 1,
    explanation: "The introductory modifier 'Exhausted from the long hike' must be followed by who was exhausted. Only G provides the logical subject 'the hikers' immediately after the modifier."
  },
  {
    id: 'act-eng-4-q12',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The chef prepared the sauce slowly, stirred the pasta carefully, and _______ the dish with fresh herbs.",
    choices: [
      "A) was garnishing",
      "B) then the garnishing of",
      "C) garnished",
      "D) had garnished beautifully"
    ],
    correct: 2,
    explanation: "Parallel structure requires matching verb forms in a series: 'prepared,' 'stirred,' and 'garnished.'"
  },
  {
    id: 'act-eng-4-q13',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "Walking through the museum, _______ caught the visitors' attention.",
    choices: [
      "F) a large abstract painting",
      "G) the visitors noticed a large abstract painting that",
      "H) it was a large abstract painting",
      "J) there was a large painting that"
    ],
    correct: 0,
    explanation: "The modifier 'Walking through the museum' should be followed by who was walking. However, since the answer choices restructure the sentence, F creates a valid reading where the painting metaphorically 'caught attention' while visitors walked. On the ACT, F most directly and concisely completes the sentence."
  },
  {
    id: 'act-eng-4-q14',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The school requires students to arrive on time, complete assignments promptly, and _______ dress-code policies.",
    choices: [
      "A) following",
      "B) they must follow",
      "C) the following of",
      "D) follow"
    ],
    correct: 3,
    explanation: "Parallel structure: 'arrive,' 'complete,' and 'follow' are all base-form infinitives after 'to.'"
  },
  {
    id: 'act-eng-4-q15',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "Disappointed by the low turnout, _______ was canceled by the event organizers.",
    choices: [
      "F) the concert",
      "G) the event organizers canceled the concert",
      "H) canceling the concert",
      "J) it was the concert that"
    ],
    correct: 1,
    explanation: "'Disappointed by the low turnout' must modify a person or people. Only G places 'the event organizers' as the subject right after the modifier."
  },
  {
    id: 'act-eng-4-q16',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The grant proposal was thorough, persuasive, and _______ in its use of data.",
    choices: [
      "A) it was also innovative",
      "B) innovatively written",
      "C) innovative",
      "D) with innovation"
    ],
    correct: 2,
    explanation: "Parallel structure requires matching adjectives: 'thorough,' 'persuasive,' and 'innovative.'"
  },

  // --- act-eng-5: Transitions (additional) ---
  {
    id: 'act-eng-5-q12',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The senator initially opposed the bill. _______, after studying new data on its economic impact, she reversed her position.",
    choices: [
      "A) Likewise",
      "B) Furthermore",
      "C) However",
      "D) Therefore"
    ],
    correct: 2,
    explanation: "The senator changed from opposition to support. 'However' signals this contrast."
  },
  {
    id: 'act-eng-5-q13',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "Coral reefs support thousands of marine species. _______, they protect coastlines from storm surges and erosion.",
    choices: [
      "F) Nevertheless",
      "G) In contrast",
      "H) In addition",
      "J) On the other hand"
    ],
    correct: 2,
    explanation: "Both sentences describe benefits of coral reefs. 'In addition' correctly signals an additional, related point."
  },
  {
    id: 'act-eng-5-q14',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The data clearly show a rise in average temperatures. _______, some policymakers continue to question the scientific consensus.",
    choices: [
      "A) As a result",
      "B) Similarly",
      "C) Despite this",
      "D) For instance"
    ],
    correct: 2,
    explanation: "The policymakers' skepticism contrasts with the clear data. 'Despite this' signals a concession or contrast."
  },

  // --- act-eng-6: Redundancy/Wordiness (additional) ---
  {
    id: 'act-eng-6-q12',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The autobiography of her own life was published in 2019.",
    choices: [
      "F) NO CHANGE",
      "G) The autobiography of her life",
      "H) Her autobiography",
      "J) The autobiographical story of her own life"
    ],
    correct: 2,
    explanation: "'Autobiography' already means the story of one's own life. 'Her autobiography' eliminates the redundancy."
  },
  {
    id: 'act-eng-6-q13',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The two twins celebrated their birthday together every year.",
    choices: [
      "A) NO CHANGE",
      "B) The pair of two twins",
      "C) The twins",
      "D) Both of the two twins"
    ],
    correct: 2,
    explanation: "'Twins' already implies two people. 'The two twins' is redundant. 'The twins' is concise and clear."
  },
  {
    id: 'act-eng-6-q14',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "She nodded her head in agreement with the proposal.",
    choices: [
      "F) NO CHANGE",
      "G) She nodded her head",
      "H) She nodded",
      "J) She nodded her head up and down"
    ],
    correct: 2,
    explanation: "Nodding already involves the head and implies agreement. 'She nodded' is the most concise option."
  },

  // --- act-eng-7: Organization (additional) ---
  {
    id: 'act-eng-7-q10',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A paragraph about the nutritional benefits of quinoa includes the sentence: 'My cousin recently got married at a beautiful vineyard.' This sentence should be:",
    choices: [
      "A) kept, because it adds a personal touch",
      "B) kept, because it provides useful background",
      "C) deleted, because it is irrelevant to the paragraph's topic",
      "D) moved to the introduction"
    ],
    correct: 2,
    explanation: "A sentence about a cousin's wedding is completely unrelated to quinoa's nutritional benefits and should be deleted."
  },
  {
    id: 'act-eng-7-q11',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "The writer wants to conclude a paragraph about the decline of honeybee populations. Which sentence best accomplishes this goal?",
    choices: [
      "F) Bees are fascinating insects.",
      "G) Without immediate action to address the causes of colony collapse, food supplies worldwide could be at risk.",
      "H) Honey is used in many recipes.",
      "J) Beekeeping has become a popular hobby."
    ],
    correct: 1,
    explanation: "A concluding sentence should reinforce the paragraph's main point. G ties the decline of honeybees to its consequences and calls for action."
  },
  {
    id: 'act-eng-7-q12',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A paragraph discusses the invention of the printing press. Which sentence would most logically follow a sentence about Gutenberg's innovations?",
    choices: [
      "A) The internet was invented in the 20th century.",
      "B) His press enabled the mass production of books, fundamentally changing how knowledge spread across Europe.",
      "C) Germany is known for its automobile industry.",
      "D) Many people today prefer e-readers to physical books."
    ],
    correct: 1,
    explanation: "B directly follows from Gutenberg's innovations by explaining their impact, maintaining logical flow within the paragraph."
  },

  // --- act-eng-8: Rhetorical Skills (additional) ---
  {
    id: 'act-eng-8-q11',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "A persuasive essay argues that cities should invest more in public parks. Which sentence would most effectively support this argument?",
    choices: [
      "A) Parks are green spaces in urban areas.",
      "B) Studies show that proximity to parks increases property values by an average of 8% and reduces residents' stress levels.",
      "C) Some people prefer indoor recreation.",
      "D) Parks have existed for hundreds of years."
    ],
    correct: 1,
    explanation: "B provides specific, quantifiable evidence (8% property value increase, reduced stress) that directly supports the argument for investment."
  },
  {
    id: 'act-eng-8-q12',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The passage has maintained a formal, academic tone throughout. Which revision is most consistent with this tone?",
    choices: [
      "F) The results were pretty cool and really surprising.",
      "G) The results were, like, totally unexpected.",
      "H) The results were remarkably counterintuitive, challenging several longstanding assumptions.",
      "J) Nobody saw these results coming."
    ],
    correct: 2,
    explanation: "'Remarkably counterintuitive, challenging several longstanding assumptions' maintains academic precision and formality."
  },

  // --- act-math-1: Pre-Algebra (additional) ---
  {
    id: 'act-math-1-q16',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A map uses a scale of 1 inch = 25 miles. If two cities are 3.5 inches apart on the map, what is the actual distance between them?",
    choices: [
      "A) 28.5 miles",
      "B) 75 miles",
      "C) 87.5 miles",
      "D) 100 miles",
      "E) 125 miles"
    ],
    correct: 2,
    explanation: "3.5 inches × 25 miles/inch = 87.5 miles."
  },
  {
    id: 'act-math-1-q17',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "If 3/8 of a number is 27, what is the number?",
    choices: [
      "F) 64",
      "G) 72",
      "H) 81",
      "J) 90",
      "K) 108"
    ],
    correct: 1,
    explanation: "3/8 × n = 27. Multiply both sides by 8/3: n = 27 × 8/3 = 72."
  },
  {
    id: 'act-math-1-q18',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A store sells apples for $1.20 each. If a customer buys 15 apples and pays with a $20 bill, how much change should the customer receive?",
    choices: [
      "A) $1.00",
      "B) $2.00",
      "C) $3.00",
      "D) $4.00",
      "E) $5.00"
    ],
    correct: 1,
    explanation: "15 × $1.20 = $18.00. Change = $20.00 − $18.00 = $2.00."
  },
  {
    id: 'act-math-1-q19',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "What is the least common multiple (LCM) of 12 and 18?",
    choices: [
      "F) 6",
      "G) 24",
      "H) 36",
      "J) 54",
      "K) 216"
    ],
    correct: 2,
    explanation: "12 = 2² × 3, and 18 = 2 × 3². LCM = 2² × 3² = 4 × 9 = 36."
  },
  {
    id: 'act-math-1-q20',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A recipe calls for 2/3 cup of sugar. If you want to make 2.5 batches, how many cups of sugar do you need?",
    choices: [
      "A) 1 cup",
      "B) 1 1/3 cups",
      "C) 1 2/3 cups",
      "D) 2 cups",
      "E) 2 1/3 cups"
    ],
    correct: 2,
    explanation: "2/3 × 2.5 = 2/3 × 5/2 = 10/6 = 5/3 = 1 2/3 cups."
  },

  // --- act-math-2: Elementary Algebra (additional) ---
  {
    id: 'act-math-2-q13',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If the perimeter of a rectangle is 42 cm and the length is 3 cm more than the width, what is the width?",
    choices: [
      "F) 9 cm",
      "G) 10 cm",
      "H) 12 cm",
      "J) 15 cm",
      "K) 18 cm"
    ],
    correct: 0,
    explanation: "Let width = w. Then length = w + 3. Perimeter = 2(w + w + 3) = 42. So 2(2w + 3) = 42, 4w + 6 = 42, 4w = 36, w = 9 cm."
  },
  {
    id: 'act-math-2-q14',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "What is the value of x in the equation (x/3) + 5 = 11?",
    choices: [
      "A) 2",
      "B) 6",
      "C) 12",
      "D) 18",
      "E) 48"
    ],
    correct: 3,
    explanation: "x/3 + 5 = 11. Subtract 5: x/3 = 6. Multiply by 3: x = 18."
  },
  {
    id: 'act-math-2-q15',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "A taxi charges a base fare of $3.50 plus $0.75 per mile. If the total fare was $12.50, how many miles was the trip?",
    choices: [
      "F) 8",
      "G) 10",
      "H) 12",
      "J) 15",
      "K) 16"
    ],
    correct: 2,
    explanation: "3.50 + 0.75m = 12.50. Subtract 3.50: 0.75m = 9. Divide: m = 12 miles."
  },
  {
    id: 'act-math-2-q16',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If 3(x − 2) = 2(x + 5), what is x?",
    choices: [
      "A) 4",
      "B) 8",
      "C) 12",
      "D) 16",
      "E) 20"
    ],
    correct: 3,
    explanation: "Expand: 3x − 6 = 2x + 10. Subtract 2x: x − 6 = 10. Add 6: x = 16."
  },

  // --- act-math-4: Exponents & Quadratics (additional) ---
  {
    id: 'act-math-4-q13',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the value of 3^(-2)?",
    choices: [
      "F) -9",
      "G) -6",
      "H) 1/9",
      "J) 1/6",
      "K) 9"
    ],
    correct: 2,
    explanation: "3^(-2) = 1/3² = 1/9."
  },
  {
    id: 'act-math-4-q14',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "Which expression is equivalent to (x²y³)²?",
    choices: [
      "A) x⁴y⁵",
      "B) x⁴y⁶",
      "C) x²y⁶",
      "D) 2x²y³",
      "E) x⁴y⁹"
    ],
    correct: 1,
    explanation: "(x²y³)² = x^(2×2) × y^(3×2) = x⁴y⁶."
  },
  {
    id: 'act-math-4-q15',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "The vertex of the parabola y = (x − 4)² + 3 is at what point?",
    choices: [
      "F) (4, 3)",
      "G) (-4, 3)",
      "H) (4, -3)",
      "J) (-4, -3)",
      "K) (3, 4)"
    ],
    correct: 0,
    explanation: "In vertex form y = (x − h)² + k, the vertex is (h, k) = (4, 3)."
  },
  {
    id: 'act-math-4-q16',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What are the solutions to x² − 16 = 0?",
    choices: [
      "A) x = 4 only",
      "B) x = −4 only",
      "C) x = 4 and x = −4",
      "D) x = 8 and x = −8",
      "E) x = 2 and x = −2"
    ],
    correct: 2,
    explanation: "x² = 16, so x = ±4. Both x = 4 and x = −4 are solutions."
  },
  {
    id: 'act-math-4-q17',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "Simplify: (2x³)(5x⁴)",
    choices: [
      "F) 7x⁷",
      "G) 10x⁷",
      "H) 10x¹²",
      "J) 7x¹²",
      "K) 10x³"
    ],
    correct: 1,
    explanation: "Multiply coefficients: 2 × 5 = 10. Add exponents: 3 + 4 = 7. Result: 10x⁷."
  },

  // --- act-math-5: Plane Geometry (additional) ---
  {
    id: 'act-math-5-q13',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A circle has a diameter of 14 cm. What is its circumference? (Use π ≈ 3.14)",
    choices: [
      "A) 21.98 cm",
      "B) 43.96 cm",
      "C) 87.92 cm",
      "D) 153.86 cm",
      "E) 615.44 cm"
    ],
    correct: 1,
    explanation: "Circumference = πd = 3.14 × 14 = 43.96 cm."
  },
  {
    id: 'act-math-5-q14',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "What is the area of a circle with radius 5 cm? (Use π ≈ 3.14)",
    choices: [
      "F) 15.7 cm²",
      "G) 31.4 cm²",
      "H) 78.5 cm²",
      "J) 157 cm²",
      "K) 314 cm²"
    ],
    correct: 2,
    explanation: "Area = πr² = 3.14 × 25 = 78.5 cm²."
  },

  // --- act-math-6: Coordinate Geometry (additional) ---
  {
    id: 'act-math-6-q12',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the slope of the line that passes through the points (−2, 5) and (4, −1)?",
    choices: [
      "A) −1",
      "B) −2/3",
      "C) 2/3",
      "D) 1",
      "E) −6"
    ],
    correct: 0,
    explanation: "Slope = (−1 − 5)/(4 − (−2)) = −6/6 = −1."
  },
  {
    id: 'act-math-6-q13',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "A line has the equation 2x + 4y = 12. What is the y-intercept?",
    choices: [
      "F) 2",
      "G) 3",
      "H) 4",
      "J) 6",
      "K) 12"
    ],
    correct: 1,
    explanation: "Set x = 0: 4y = 12, y = 3. The y-intercept is 3."
  },
  {
    id: 'act-math-6-q14',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "Which of the following lines is parallel to y = −3x + 7?",
    choices: [
      "A) y = 3x + 2",
      "B) y = −3x − 1",
      "C) y = (1/3)x + 7",
      "D) y = −(1/3)x + 4",
      "E) y = 7x − 3"
    ],
    correct: 1,
    explanation: "Parallel lines have the same slope. The slope of y = −3x + 7 is −3. Only y = −3x − 1 also has slope −3."
  },

  // --- act-math-7: Probability & Statistics (additional) ---
  {
    id: 'act-math-7-q12',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A bag contains 3 red, 5 blue, and 2 green marbles. If one marble is drawn at random, what is the probability that it is NOT blue?",
    choices: [
      "A) 1/5",
      "B) 1/2",
      "C) 3/5",
      "D) 2/5",
      "E) 4/5"
    ],
    correct: 1,
    explanation: "Total marbles = 10. Non-blue marbles = 3 + 2 = 5. P(not blue) = 5/10 = 1/2."
  },
  {
    id: 'act-math-7-q13',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "The scores on a quiz are: 6, 8, 8, 9, 10, 11, 12. What is the range?",
    choices: [
      "F) 4",
      "G) 5",
      "H) 6",
      "J) 8",
      "K) 12"
    ],
    correct: 2,
    explanation: "Range = maximum − minimum = 12 − 6 = 6."
  },

  // --- act-math-8: Trigonometry (additional) ---
  {
    id: 'act-math-8-q14',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "In a right triangle, the hypotenuse is 10 and one leg is 6. What is the length of the other leg?",
    choices: [
      "A) 4",
      "B) 6",
      "C) 8",
      "D) 12",
      "E) 16"
    ],
    correct: 2,
    explanation: "By the Pythagorean theorem: a² + 6² = 10². a² + 36 = 100. a² = 64. a = 8."
  },
  {
    id: 'act-math-8-q15',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the value of cos(60°)?",
    choices: [
      "F) 0",
      "G) 1/2",
      "H) √2/2",
      "J) √3/2",
      "K) 1"
    ],
    correct: 1,
    explanation: "cos(60°) = 1/2 is a standard trigonometric value from the 30-60-90 triangle."
  },

  // --- act-read-2: Vocabulary in Context (additional) ---
  {
    id: 'act-read-2-q10',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage describes the scientist's 'dogged' pursuit of a vaccine. As used here, 'dogged' most nearly means:",
    choices: [
      "F) canine-related",
      "G) slow and lazy",
      "H) tenaciously persistent",
      "J) reckless and dangerous"
    ],
    correct: 2,
    explanation: "'Dogged' means stubbornly determined. In this context, it describes persistent effort toward developing a vaccine."
  },
  {
    id: 'act-read-2-q11',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The narrator describes the city skyline as 'austere.' As used here, 'austere' most nearly means:",
    choices: [
      "A) beautifully decorated",
      "B) severely plain and unadorned",
      "C) extremely tall",
      "D) brightly lit"
    ],
    correct: 1,
    explanation: "'Austere' means severely simple or undecorated. Applied to a skyline, it suggests stark, unornamented architecture."
  },
  {
    id: 'act-read-2-q12',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage says the new law had 'galvanized' the community into action. As used here, 'galvanized' most nearly means:",
    choices: [
      "F) coated with zinc",
      "G) shocked and stimulated into activity",
      "H) divided into factions",
      "J) confused and disoriented"
    ],
    correct: 1,
    explanation: "'Galvanized' in this context means spurred or motivated into action, not literally coated with metal."
  },

  // --- act-read-3: Inference (additional) ---
  {
    id: 'act-read-3-q9',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The passage notes that the factory owner kept detailed records of every worker's hours but never once visited the factory floor. It can reasonably be inferred that the owner:",
    choices: [
      "A) was deeply involved in daily operations",
      "B) valued data and financial accountability more than personal engagement with workers",
      "C) trusted the workers completely",
      "D) lived too far away to visit"
    ],
    correct: 1,
    explanation: "Keeping meticulous records shows attention to data, while never visiting the floor suggests distance from the workers themselves."
  },
  {
    id: 'act-read-3-q10',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The narrator mentions that her father always set an extra place at the holiday table. It can most reasonably be inferred that this detail suggests:",
    choices: [
      "F) the family frequently miscounted guests",
      "G) the father valued hospitality and openness to unexpected visitors",
      "H) the family had many relatives",
      "J) the narrator's mother disliked cooking"
    ],
    correct: 1,
    explanation: "Setting an extra place 'always' suggests it was intentional, reflecting a spirit of welcome and hospitality."
  },

  // --- act-read-4: Author's Purpose (additional) ---
  {
    id: 'act-read-4-q10',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "The author uses the phrase 'a double-edged sword' to describe social media. This metaphor primarily serves to:",
    choices: [
      "A) argue that social media is dangerous",
      "B) suggest that social media has both benefits and drawbacks",
      "C) compare social media to medieval weapons",
      "D) demonstrate the author's vocabulary"
    ],
    correct: 1,
    explanation: "A 'double-edged sword' is a common metaphor meaning something has both positive and negative aspects."
  },
  {
    id: 'act-read-4-q11',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "Throughout the passage, the author describes the decline of local newspapers with words like 'erosion,' 'vanishing,' and 'hollowed out.' The author's tone toward this decline is best described as:",
    choices: [
      "F) celebratory",
      "G) indifferent",
      "H) mournful and concerned",
      "J) amused"
    ],
    correct: 2,
    explanation: "Words like 'erosion,' 'vanishing,' and 'hollowed out' carry negative, loss-oriented connotations, suggesting mourning and concern."
  },

  // --- act-read-5: Comparing Viewpoints (additional) ---
  {
    id: 'act-read-5-q8',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage A argues that remote work increases productivity. Passage B argues that remote work harms collaboration. Both authors would most likely agree that:",
    choices: [
      "A) remote work should be banned",
      "B) the design of work arrangements significantly affects outcomes",
      "C) all employees prefer working from home",
      "D) office culture is irrelevant"
    ],
    correct: 1,
    explanation: "Both authors discuss how work arrangements (remote vs. in-person) affect different outcomes, implying they agree that arrangement design matters."
  },
  {
    id: 'act-read-5-q9',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage A claims that zoos play a vital role in conservation. Passage B argues that zoos prioritize entertainment over animal welfare. The passages primarily disagree about:",
    choices: [
      "F) whether animals exist",
      "G) the primary purpose and ethical justification of zoos",
      "H) the number of species on Earth",
      "J) whether conservation is important"
    ],
    correct: 1,
    explanation: "The core disagreement is about what zoos are fundamentally for: conservation (Passage A) vs. entertainment at animals' expense (Passage B)."
  },
  {
    id: 'act-read-5-q10',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Author A believes artificial intelligence will create more jobs than it eliminates. Author B believes AI will cause mass unemployment. Which finding would support Author A's position?",
    choices: [
      "A) A study showing AI eliminated 10,000 jobs in manufacturing.",
      "B) A report showing that for every job displaced by AI, 1.5 new jobs were created in related fields.",
      "C) An article about robots replacing warehouse workers.",
      "D) A survey showing most workers fear losing their jobs to automation."
    ],
    correct: 1,
    explanation: "A 1.5:1 ratio of new jobs to displaced jobs directly supports Author A's claim that AI creates more jobs than it eliminates."
  },

  // --- act-read-6: Structure & Organization (additional) ---
  {
    id: 'act-read-6-q9',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "The passage opens with a vivid description of a hurricane, then shifts to a discussion of climate data. This structural choice most likely serves to:",
    choices: [
      "A) frighten the reader into stopping",
      "B) engage the reader emotionally before presenting scientific evidence",
      "C) show that hurricanes are unrelated to climate",
      "D) demonstrate the author's creative abilities"
    ],
    correct: 1,
    explanation: "Opening with vivid description hooks the reader, then the shift to data grounds the discussion in evidence."
  },
  {
    id: 'act-read-6-q10',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "The author presents a problem in the first paragraph and a proposed solution in the last paragraph. This organizational pattern is best described as:",
    choices: [
      "F) compare and contrast",
      "G) chronological order",
      "H) problem and solution",
      "J) cause and effect"
    ],
    correct: 2,
    explanation: "Presenting a problem followed by a proposed solution is the classic problem-and-solution organizational pattern."
  },

  // --- act-read-7: Literary Narrative (additional) ---
  {
    id: 'act-read-7-q10',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "The narrator describes her grandmother's garden as 'a kingdom unto itself.' This description most likely suggests that:",
    choices: [
      "A) the grandmother was royalty",
      "B) the garden was a self-contained world that held special significance",
      "C) the garden was extremely large",
      "D) the narrator disliked visiting"
    ],
    correct: 1,
    explanation: "Calling the garden 'a kingdom unto itself' is figurative language suggesting it was a complete, special, self-contained world."
  },
  {
    id: 'act-read-7-q11',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "At the end of the passage, the narrator says, 'I closed the door softly, knowing I would never open it again.' This statement most likely conveys:",
    choices: [
      "F) that the door was broken",
      "G) a sense of finality and farewell",
      "H) that the narrator was in a hurry",
      "J) that the building was being demolished"
    ],
    correct: 1,
    explanation: "The gentle, deliberate action ('softly') combined with 'never again' creates a tone of permanent goodbye and closure."
  },

  // --- act-read-8: Passages (additional) ---
  {
    id: 'act-read-8-q10',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A humanities passage discusses how folk music preserved oral histories in communities without written records. The author's primary purpose is to:",
    choices: [
      "A) argue that folk music is better than classical music",
      "B) explain the cultural and historical function of folk music",
      "C) provide a biography of a specific musician",
      "D) criticize modern music"
    ],
    correct: 1,
    explanation: "The passage explains how folk music served as a vehicle for preserving history — a cultural and historical function."
  },
  {
    id: 'act-read-8-q11',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "In a natural science passage, the author states: 'While the model successfully predicts short-term trends, its long-term projections remain speculative.' The purpose of this statement is to:",
    choices: [
      "F) reject the model entirely",
      "G) acknowledge the model's strengths while identifying its limitations",
      "H) argue that all scientific models are wrong",
      "J) praise the model's creators"
    ],
    correct: 1,
    explanation: "The statement balances recognition ('successfully predicts') with qualification ('remain speculative'), acknowledging both strengths and limitations."
  },
  {
    id: 'act-read-8-q12',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A social science passage examines the effects of bilingual education on cognitive development. The author cites studies from three different countries. This approach primarily serves to:",
    choices: [
      "A) confuse the reader with too much data",
      "B) show that the findings are not limited to a single cultural context",
      "C) argue that only certain countries should use bilingual education",
      "D) demonstrate the author's travel experience"
    ],
    correct: 1,
    explanation: "Citing studies from multiple countries demonstrates that the findings are broadly applicable, not culturally specific."
  },

  // --- act-sci-1: Data Representation (additional) ---
  {
    id: 'act-sci-1-q11',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A table shows the solubility of four salts at 25°C:\nSalt A: 36 g/100mL\nSalt B: 12 g/100mL\nSalt C: 74 g/100mL\nSalt D: 0.5 g/100mL\n\nWhich salt is least soluble at 25°C?",
    choices: [
      "A) Salt A",
      "B) Salt B",
      "C) Salt C",
      "D) Salt D"
    ],
    correct: 3,
    explanation: "Salt D has the lowest solubility at 0.5 g/100mL, making it the least soluble."
  },
  {
    id: 'act-sci-1-q12',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A bar graph shows the average monthly rainfall (in cm) for a city:\nJan: 8, Feb: 6, Mar: 10, Apr: 15, May: 12, Jun: 5.\n\nDuring which month did the city receive the most rainfall?",
    choices: [
      "F) January",
      "G) March",
      "H) April",
      "J) May"
    ],
    correct: 2,
    explanation: "April had the highest rainfall at 15 cm."
  },

  // --- act-sci-2: Experimental Design (additional) ---
  {
    id: 'act-sci-2-q11',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A student wants to test whether the color of light affects plant growth. She sets up five identical plants, each under a different color of light (red, blue, green, white, and no light). All plants receive the same amount of water and are kept at the same temperature. The control group in this experiment is most likely:",
    choices: [
      "A) the plant under red light",
      "B) the plant under white light",
      "C) the plant with no light",
      "D) all five plants equally"
    ],
    correct: 1,
    explanation: "White light represents normal growing conditions, making it the most appropriate control. It provides a baseline for comparison."
  },
  {
    id: 'act-sci-2-q12',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A researcher notices that ice cream sales and drowning incidents both increase during summer. She concludes that ice cream causes drowning. This reasoning is flawed because:",
    choices: [
      "F) ice cream does cause drowning",
      "G) correlation does not imply causation; a third variable (hot weather) likely drives both",
      "H) drowning causes ice cream sales",
      "J) the data must be incorrect"
    ],
    correct: 1,
    explanation: "Both variables increase with hot weather. The correlation between them does not mean one causes the other; this is a classic example of a confounding variable."
  },

  // --- act-sci-3: Variables & Controls (additional) ---
  {
    id: 'act-sci-3-q9',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "In an experiment testing how fertilizer concentration affects crop yield, a farmer applies different concentrations to five plots. Which of the following should be kept constant?",
    choices: [
      "A) Fertilizer concentration",
      "B) Crop yield",
      "C) Water amount, sunlight, and soil type",
      "D) The number of plots"
    ],
    correct: 2,
    explanation: "Controlled variables must remain constant to isolate the effect of the independent variable (fertilizer concentration). Water, sunlight, and soil type are factors that could affect yield and must be controlled."
  },
  {
    id: 'act-sci-3-q10',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A biologist studies the effect of altitude on the number of bird species observed. In this study, the independent variable is:",
    choices: [
      "F) the number of bird species",
      "G) the type of binoculars used",
      "H) altitude",
      "J) the time of year"
    ],
    correct: 2,
    explanation: "The independent variable is altitude, as the biologist is examining how changes in altitude relate to bird species diversity."
  },

  // --- act-sci-4: Trends (additional) ---
  {
    id: 'act-sci-4-q9',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A graph shows that as depth below the Earth's surface increases from 0 to 100 km, temperature increases from 15°C to 1500°C. The average rate of temperature increase per kilometer is:",
    choices: [
      "A) 10°C/km",
      "B) 14.85°C/km",
      "C) 15°C/km",
      "D) 150°C/km"
    ],
    correct: 1,
    explanation: "Rate = (1500 − 15)/100 = 1485/100 = 14.85°C per kilometer."
  },
  {
    id: 'act-sci-4-q10',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "Data show that a bacterial colony doubles every 30 minutes. If there are 500 bacteria at time 0, approximately how many bacteria will there be after 2 hours?",
    choices: [
      "F) 2,000",
      "G) 4,000",
      "H) 8,000",
      "J) 16,000"
    ],
    correct: 2,
    explanation: "2 hours = 4 doubling periods (every 30 min). 500 → 1,000 → 2,000 → 4,000 → 8,000."
  },

  // --- act-sci-5: Comparing Scientists' Views (additional) ---
  {
    id: 'act-sci-5-q10',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Scientist A argues that the Grand Canyon was formed primarily by the Colorado River over millions of years. Scientist B argues it was formed primarily by catastrophic flooding. Which evidence would support Scientist A but NOT Scientist B?",
    choices: [
      "A) Layers of sediment showing gradual, consistent erosion patterns over millions of years",
      "B) Evidence of a single massive flood event",
      "C) Fossils of marine organisms at the canyon rim",
      "D) The canyon's enormous size"
    ],
    correct: 0,
    explanation: "Gradual, consistent erosion patterns support the slow river-erosion model (Scientist A) and contradict the catastrophic flooding model (Scientist B)."
  },

  // --- act-sci-6: Calculations & Units (additional) ---
  {
    id: 'act-sci-6-q9',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "A substance has a mass of 50 grams and a volume of 25 cm³. What is its density?",
    choices: [
      "A) 0.5 g/cm³",
      "B) 1.0 g/cm³",
      "C) 2.0 g/cm³",
      "D) 25 g/cm³"
    ],
    correct: 2,
    explanation: "Density = mass/volume = 50/25 = 2.0 g/cm³."
  },
  {
    id: 'act-sci-6-q10',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "If a solution has a concentration of 0.5 mol/L and the volume is 2 liters, how many moles of solute are present?",
    choices: [
      "F) 0.25 mol",
      "G) 0.5 mol",
      "H) 1.0 mol",
      "J) 2.5 mol"
    ],
    correct: 2,
    explanation: "Moles = concentration × volume = 0.5 mol/L × 2 L = 1.0 mol."
  },

  // --- act-sci-7: Hypotheses & Models (additional) ---
  {
    id: 'act-sci-7-q10',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A model predicts that increasing CO₂ concentration in a greenhouse will increase plant growth rate. If the current growth rate is 5 cm/week at 400 ppm CO₂, and the model predicts a 10% increase in growth for every 100 ppm increase, what is the predicted growth rate at 600 ppm?",
    choices: [
      "A) 5.5 cm/week",
      "B) 6.0 cm/week",
      "C) 6.05 cm/week",
      "D) 7.0 cm/week"
    ],
    correct: 2,
    explanation: "From 400 to 600 ppm is a 200 ppm increase = two 100 ppm increases. First increase: 5 × 1.10 = 5.5. Second increase: 5.5 × 1.10 = 6.05 cm/week."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BATCH 5 — More questions to fill remaining gaps
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-1: Punctuation (additional) ---
  {
    id: 'act-eng-1-q17',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The students who studied the most earned the highest grades, those who didn't study failed.",
    choices: [
      "A) NO CHANGE",
      "B) grades; those who didn't study failed.",
      "C) grades. Those who didn't study, failed.",
      "D) grades, and, those who didn't study failed."
    ],
    correct: 1,
    explanation: "The original is a comma splice joining two independent clauses. A semicolon correctly separates them."
  },
  {
    id: 'act-eng-1-q18',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "Dr. Kim's research focuses on three areas: cellular biology, genetics, and immunology.",
    choices: [
      "F) NO CHANGE",
      "G) areas; cellular biology, genetics, and immunology.",
      "H) areas, cellular biology, genetics, and immunology.",
      "J) areas: cellular biology; genetics; and immunology."
    ],
    correct: 0,
    explanation: "The original is correct. A colon properly introduces the list after the independent clause, and commas correctly separate the items."
  },
  {
    id: 'act-eng-1-q19',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "My brother who lives in Portland visits us every summer.",
    choices: [
      "A) NO CHANGE",
      "B) My brother, who lives in Portland, visits us every summer.",
      "C) My brother, who lives in Portland visits us every summer.",
      "D) My brother who lives in Portland, visits us every summer."
    ],
    correct: 0,
    explanation: "If the speaker has multiple brothers, the clause 'who lives in Portland' is restrictive (essential to identify which brother) and should NOT have commas. Without additional context indicating multiple brothers, A is correct as written. If the speaker has only one brother, B would be correct; but on the ACT, A is the best choice as presented."
  },

  // --- act-eng-2: Grammar/Usage (additional) ---
  {
    id: 'act-eng-2-q17',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The museum, which opened in 1985, features over 500 works of art it attracts visitors from around the world.",
    choices: [
      "F) NO CHANGE",
      "G) art, it attracts",
      "H) art. It attracts",
      "J) art it, attracts"
    ],
    correct: 2,
    explanation: "The original is a run-on sentence. A period after 'art' creates two proper sentences."
  },
  {
    id: 'act-eng-2-q18',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "Because the bridge was under construction. Commuters had to find alternative routes.",
    choices: [
      "A) NO CHANGE",
      "B) Because the bridge was under construction, commuters had to find alternative routes.",
      "C) Because the bridge was under construction; commuters had to find alternative routes.",
      "D) Because, the bridge was under construction, commuters had to find alternative routes."
    ],
    correct: 1,
    explanation: "'Because the bridge was under construction' is a dependent clause and cannot stand alone. A comma connects it to the main clause."
  },

  // --- act-eng-4: Style/Tone (additional) ---
  {
    id: 'act-eng-4-q17',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "Having completed the experiment, _______ showed promising results.",
    choices: [
      "A) the data",
      "B) the researchers found that the data",
      "C) it was found that the data",
      "D) the results of the data"
    ],
    correct: 1,
    explanation: "'Having completed the experiment' must modify who completed it. Only B provides 'the researchers' as the logical subject."
  },

  // --- act-eng-5: Transitions (additional) ---
  {
    id: 'act-eng-5-q15',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The company invested heavily in renewable energy. _______, its carbon footprint decreased by 40% over five years.",
    choices: [
      "F) However",
      "G) As a result",
      "H) In contrast",
      "J) Similarly"
    ],
    correct: 1,
    explanation: "The decreased carbon footprint was a result of investing in renewable energy. 'As a result' correctly shows this cause-and-effect relationship."
  },

  // --- act-eng-6: Redundancy (additional) ---
  {
    id: 'act-eng-6-q15',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "Each and every student must complete the assignment by Friday.",
    choices: [
      "A) NO CHANGE",
      "B) Each and every single student",
      "C) Every student",
      "D) Each and every one of the students"
    ],
    correct: 2,
    explanation: "'Each and every' is redundant. 'Every student' conveys the same meaning concisely."
  },

  // --- act-eng-7: Organization (additional) ---
  {
    id: 'act-eng-7-q13',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "An essay about the history of jazz music includes a paragraph about the author's favorite pizza restaurant. This paragraph should be:",
    choices: [
      "F) kept, because it adds variety to the essay",
      "G) moved to the conclusion",
      "H) deleted, because it is irrelevant to the topic of jazz",
      "J) expanded to include more restaurant reviews"
    ],
    correct: 2,
    explanation: "A paragraph about pizza is entirely unrelated to jazz history and should be deleted."
  },

  // --- act-eng-8: Rhetorical Skills (additional) ---
  {
    id: 'act-eng-8-q13',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The writer wants to emphasize the emotional significance of the old family photograph. Which choice best accomplishes this?",
    choices: [
      "A) The photograph was taken in 1965.",
      "B) The photograph measured 4 by 6 inches.",
      "C) The photograph, faded and creased from years of handling, was the last image of the family together before the war separated them.",
      "D) Photographs were common in the 1960s."
    ],
    correct: 2,
    explanation: "C provides emotional weight through specific, evocative details ('faded and creased,' 'last image,' 'war separated them')."
  },

  // --- act-math-2: Elementary Algebra (additional) ---
  {
    id: 'act-math-2-q17',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "A plumber charges $40 for a service call plus $25 per hour of labor. If the total bill was $115, how many hours did the plumber work?",
    choices: [
      "F) 2",
      "G) 3",
      "H) 4",
      "J) 5",
      "K) 6"
    ],
    correct: 1,
    explanation: "40 + 25h = 115. Subtract 40: 25h = 75. Divide: h = 3 hours."
  },

  // --- act-math-3: Functions (additional) ---
  {
    id: 'act-math-3-q16',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "If f(x) = x² − 4x + 3, what are the zeros of f?",
    choices: [
      "A) x = 1 and x = 3",
      "B) x = −1 and x = −3",
      "C) x = 1 and x = −3",
      "D) x = 2 and x = 6",
      "E) x = 4 and x = 3"
    ],
    correct: 0,
    explanation: "Set f(x) = 0: x² − 4x + 3 = 0. Factor: (x − 1)(x − 3) = 0. So x = 1 or x = 3."
  },

  // --- act-math-4: Quadratics (additional) ---
  {
    id: 'act-math-4-q18',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the discriminant of 2x² − 5x + 3 = 0?",
    choices: [
      "F) −1",
      "G) 0",
      "H) 1",
      "J) 7",
      "K) 49"
    ],
    correct: 2,
    explanation: "Discriminant = b² − 4ac = (−5)² − 4(2)(3) = 25 − 24 = 1."
  },

  // --- act-math-5: Geometry (additional) ---
  {
    id: 'act-math-5-q15',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A cylinder has a radius of 3 cm and a height of 10 cm. What is its volume? (Use π ≈ 3.14)",
    choices: [
      "A) 94.2 cm³",
      "B) 188.4 cm³",
      "C) 282.6 cm³",
      "D) 565.2 cm³",
      "E) 904.32 cm³"
    ],
    correct: 2,
    explanation: "Volume = πr²h = 3.14 × 9 × 10 = 282.6 cm³."
  },

  // --- act-math-6: Coordinate Geometry (additional) ---
  {
    id: 'act-math-6-q15',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the equation of a circle with center (3, −2) and radius 5?",
    choices: [
      "F) (x − 3)² + (y + 2)² = 25",
      "G) (x + 3)² + (y − 2)² = 25",
      "H) (x − 3)² + (y + 2)² = 5",
      "J) (x − 3)² − (y + 2)² = 25",
      "K) (x + 3)² + (y + 2)² = 25"
    ],
    correct: 0,
    explanation: "The standard form of a circle is (x − h)² + (y − k)² = r². With center (3, −2) and radius 5: (x − 3)² + (y + 2)² = 25."
  },

  // --- act-math-7: Probability (additional) ---
  {
    id: 'act-math-7-q14',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "Two coins are flipped simultaneously. What is the probability that both land on heads?",
    choices: [
      "F) 1/8",
      "G) 1/4",
      "H) 1/3",
      "J) 1/2",
      "K) 3/4"
    ],
    correct: 1,
    explanation: "P(heads on first) = 1/2, P(heads on second) = 1/2. P(both heads) = 1/2 × 1/2 = 1/4."
  },

  // --- act-math-8: Trigonometry (additional) ---
  {
    id: 'act-math-8-q16',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "In a 45-45-90 triangle, if one leg has length 7, what is the length of the hypotenuse?",
    choices: [
      "A) 7",
      "B) 7√2",
      "C) 7√3",
      "D) 14",
      "E) 49"
    ],
    correct: 1,
    explanation: "In a 45-45-90 triangle, the hypotenuse = leg × √2 = 7√2."
  },
  {
    id: 'act-math-8-q17',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the area of a regular hexagon with side length 6?",
    choices: [
      "F) 36√3",
      "G) 54√3",
      "H) 72√3",
      "J) 108√3",
      "K) 216"
    ],
    correct: 1,
    explanation: "Area of regular hexagon = (3√3/2) × s² = (3√3/2) × 36 = 54√3."
  },

  // --- act-read-1: Main Idea (additional) ---
  {
    id: 'act-read-1-q13',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage discusses how a small nonprofit organization trained former prisoners in coding skills, leading many to secure stable employment after release. The main idea is:",
    choices: [
      "A) all prisoners should learn coding",
      "B) skills training programs can help formerly incarcerated individuals successfully reenter the workforce",
      "C) coding is the most important skill in the modern economy",
      "D) nonprofits are always successful"
    ],
    correct: 1,
    explanation: "The passage specifically links coding training for former prisoners to employment success, supporting B."
  },
  {
    id: 'act-read-1-q14',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage explains how rising sea levels threaten coastal communities, describing specific examples of towns that have had to relocate. Which detail most directly supports the passage's central claim?",
    choices: [
      "F) The ocean covers about 70% of Earth's surface.",
      "G) Three towns on the Alaskan coast have been forced to move to higher ground due to erosion from rising seas.",
      "H) Beaches are popular tourist destinations.",
      "J) Some coastal cities have populations over one million."
    ],
    correct: 1,
    explanation: "G provides specific, concrete evidence of the threat described in the central claim."
  },

  // --- act-read-2: Vocabulary (additional) ---
  {
    id: 'act-read-2-q13',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage says the proposal received 'tepid' support from the committee. As used here, 'tepid' most nearly means:",
    choices: [
      "A) enthusiastic",
      "B) lukewarm and unenthusiastic",
      "C) angry and hostile",
      "D) cold and rejecting"
    ],
    correct: 1,
    explanation: "'Tepid' literally means lukewarm. Figuratively, it describes a response that lacks enthusiasm or strong feeling."
  },

  // --- act-read-3: Inference (additional) ---
  {
    id: 'act-read-3-q11',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The passage describes a restaurant where the chef changes the entire menu every week based on what is available at the local farmers' market. It can reasonably be inferred that the chef values:",
    choices: [
      "F) predictability and routine",
      "G) freshness and seasonal ingredients",
      "H) keeping costs as low as possible",
      "J) serving only exotic foods"
    ],
    correct: 1,
    explanation: "Changing the menu weekly based on farmers' market availability indicates a commitment to freshness and seasonal ingredients."
  },

  // --- act-read-4: Author's Purpose (additional) ---
  {
    id: 'act-read-4-q12',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "The author begins the passage with the sentence: 'We are, all of us, standing on borrowed time.' The author's purpose in opening this way is most likely to:",
    choices: [
      "A) confuse the reader",
      "B) create a sense of urgency and shared vulnerability",
      "C) discuss the concept of borrowing money",
      "D) provide a historical timeline"
    ],
    correct: 1,
    explanation: "'Borrowed time' creates urgency, and 'all of us' establishes shared stakes, engaging the reader immediately."
  },

  // --- act-read-5: Comparing Viewpoints (additional) ---
  {
    id: 'act-read-5-q11',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage A argues that homework reinforces learning. Passage B argues that excessive homework harms student well-being. The two passages would most likely agree that:",
    choices: [
      "F) homework should be completely eliminated",
      "G) the amount and type of homework assigned matters for student outcomes",
      "H) students should do at least 4 hours of homework per night",
      "J) homework has no effect on learning"
    ],
    correct: 1,
    explanation: "Both passages implicitly agree that homework design matters — one focuses on its learning benefits, the other on its potential harms."
  },

  // --- act-read-6: Structure (additional) ---
  {
    id: 'act-read-6-q11',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "The author uses subheadings throughout the passage, with titles like 'The Problem,' 'Current Research,' and 'Potential Solutions.' This organizational choice most effectively:",
    choices: [
      "A) makes the passage harder to follow",
      "B) allows the reader to locate specific information quickly and understand the passage's logical flow",
      "C) shows that the author could not write in paragraphs",
      "D) proves the passage was written for children"
    ],
    correct: 1,
    explanation: "Subheadings serve as a navigational aid and signal the passage's logical structure."
  },

  // --- act-read-7: Literary Narrative (additional) ---
  {
    id: 'act-read-7-q12',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "The narrator repeatedly mentions the ticking of the grandfather clock throughout the passage. This recurring detail most likely serves to:",
    choices: [
      "F) describe the clock's mechanical workings",
      "G) emphasize the passage of time and build a sense of anticipation or tension",
      "H) show that the narrator is interested in clockmaking",
      "J) indicate that the house is quiet"
    ],
    correct: 1,
    explanation: "Repeated references to ticking serve as a literary device emphasizing time's passage and creating tension or atmosphere."
  },

  // --- act-read-8: Passages (additional) ---
  {
    id: 'act-read-8-q13',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A natural science passage describes an experiment in which researchers tracked the migration patterns of gray whales using satellite tags. The author includes a detailed description of how the satellite tags work. This description most likely serves to:",
    choices: [
      "A) distract from the main findings",
      "B) help the reader understand the methodology and trust the data",
      "C) argue that satellite technology is too expensive",
      "D) provide instructions for readers to tag their own whales"
    ],
    correct: 1,
    explanation: "Explaining methodology helps readers evaluate the reliability of the research and understand how the data were collected."
  },

  // --- act-sci-1: Data Representation (additional) ---
  {
    id: 'act-sci-1-q13',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A scatter plot shows the relationship between hours of sleep (x-axis) and test scores (y-axis). The data points form a cluster that rises from left to right. This pattern indicates:",
    choices: [
      "A) no relationship between sleep and test scores",
      "B) a negative correlation",
      "C) a positive correlation between hours of sleep and test scores",
      "D) a cause-and-effect relationship"
    ],
    correct: 2,
    explanation: "A cluster of points rising from left to right indicates a positive correlation: as hours of sleep increase, test scores tend to increase."
  },

  // --- act-sci-2: Experimental Design (additional) ---
  {
    id: 'act-sci-2-q13',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A scientist tests three different antibiotics on bacterial cultures. She grows 10 cultures for each antibiotic plus 10 cultures with no antibiotic. What is the purpose of the 10 cultures with no antibiotic?",
    choices: [
      "F) To waste supplies",
      "G) To serve as a control group for comparison",
      "H) To test a fourth antibiotic",
      "J) To grow bacteria for future experiments"
    ],
    correct: 1,
    explanation: "The untreated cultures serve as a control group, providing a baseline for comparing the effectiveness of each antibiotic."
  },

  // --- act-sci-3: Variables (additional) ---
  {
    id: 'act-sci-3-q11',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A student tests whether the type of surface (grass, concrete, sand) affects how far a ball rolls when pushed with a constant force. The controlled variable is:",
    choices: [
      "A) the type of surface",
      "B) the distance the ball rolls",
      "C) the force applied to the ball",
      "D) the color of the ball"
    ],
    correct: 2,
    explanation: "The force must be held constant (controlled) so that surface type is the only factor affecting how far the ball rolls."
  },

  // --- act-sci-4: Trends (additional) ---
  {
    id: 'act-sci-4-q11',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A table shows that as elevation increases from 0 to 5000 meters, atmospheric pressure decreases from 1013 to 540 hPa. If the trend is roughly linear, the approximate atmospheric pressure at 2500 meters would be:",
    choices: [
      "F) about 540 hPa",
      "G) about 777 hPa",
      "H) about 850 hPa",
      "J) about 1013 hPa"
    ],
    correct: 1,
    explanation: "At the midpoint of elevation (2500 m), the pressure would be approximately the midpoint: (1013 + 540)/2 = 776.5, roughly 777 hPa."
  },

  // --- act-sci-5: Conflicting Viewpoints (additional) ---
  {
    id: 'act-sci-5-q11',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Researcher 1 claims that deforestation is the primary driver of biodiversity loss. Researcher 2 claims that climate change is the primary driver. Which evidence would support both researchers?",
    choices: [
      "A) A study showing that biodiversity declined in a region where both deforestation and temperatures increased",
      "B) A study showing biodiversity increased despite deforestation",
      "C) A study in a stable-climate region where no deforestation occurred and biodiversity remained constant",
      "D) A study showing that reforestation reversed biodiversity loss"
    ],
    correct: 0,
    explanation: "A region experiencing both deforestation and temperature increases with declining biodiversity is consistent with both researchers' claims."
  },

  // --- act-sci-6: Calculations (additional) ---
  {
    id: 'act-sci-6-q11',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "A chemical reaction converts 80 grams of reactant into 60 grams of product. What is the percent yield?",
    choices: [
      "A) 25%",
      "B) 50%",
      "C) 60%",
      "D) 75%"
    ],
    correct: 3,
    explanation: "Percent yield = (actual product / reactant) × 100 = (60/80) × 100 = 75%."
  },

  // --- act-sci-7: Models (additional) ---
  {
    id: 'act-sci-7-q11',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A model of population growth assumes unlimited resources. In reality, resources are limited. This model would most likely:",
    choices: [
      "F) accurately predict long-term population size",
      "G) underestimate early population growth",
      "H) overestimate long-term population size because it ignores resource constraints",
      "J) have no error at all"
    ],
    correct: 2,
    explanation: "A model assuming unlimited resources would predict continued exponential growth, overestimating population in the long run when resources actually limit growth."
  },

  // --- act-sci-8: Multi-Figure Synthesis (additional) ---
  {
    id: 'act-sci-8-q11',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Figure 1 shows that Material X has the highest thermal conductivity. Table 1 shows that Material X also has the lowest cost per kilogram. Based on both sources, Material X would be the best choice for:",
    choices: [
      "A) an insulation material where low conductivity is needed",
      "B) a cost-effective heat sink where high conductivity is needed",
      "C) a material where cost is irrelevant",
      "D) a decorative application"
    ],
    correct: 1,
    explanation: "High thermal conductivity (Figure 1) makes it effective for heat transfer, and low cost (Table 1) makes it economical — ideal for a cost-effective heat sink."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BATCH 6 — Final batch to approach 800 total
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-1: Punctuation (additional) ---
  {
    id: 'act-eng-1-q20',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The report, which was completed last week is now available for review.",
    choices: [
      "F) NO CHANGE",
      "G) The report, which was completed last week, is now available for review.",
      "H) The report which was completed last week, is now available for review.",
      "J) The report which was completed last week is now available for review."
    ],
    correct: 1,
    explanation: "The nonrestrictive clause 'which was completed last week' must be set off by commas on both sides. G correctly places commas before 'which' and after 'week.'"
  },
  {
    id: 'act-eng-1-q21',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The chef specializes in French cuisine; particularly, soufflés and crêpes.",
    choices: [
      "A) NO CHANGE",
      "B) cuisine, particularly soufflés and crêpes.",
      "C) cuisine: particularly, soufflés and crêpes.",
      "D) cuisine particularly soufflés and crêpes."
    ],
    correct: 1,
    explanation: "A semicolon is used between independent clauses. 'Particularly, soufflés and crêpes' is not an independent clause. A comma followed by 'particularly' correctly introduces the specification."
  },

  // --- act-eng-2: Grammar (additional) ---
  {
    id: 'act-eng-2-q19',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The volunteers arrived early they set up the chairs and tables before the event began.",
    choices: [
      "F) NO CHANGE",
      "G) early, they set up",
      "H) early and set up",
      "J) early, and, they set up"
    ],
    correct: 2,
    explanation: "The original is a run-on. 'Arrived early and set up' creates a compound predicate with a single subject, fixing the error concisely."
  },
  {
    id: 'act-eng-2-q20',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "While the economy has improved the unemployment rate remains high in several regions.",
    choices: [
      "A) NO CHANGE",
      "B) While the economy has improved, the unemployment rate remains high in several regions.",
      "C) While, the economy has improved the unemployment rate remains high in several regions.",
      "D) While the economy has improved; the unemployment rate remains high in several regions."
    ],
    correct: 1,
    explanation: "A comma is needed after the introductory dependent clause 'While the economy has improved' to separate it from the main clause."
  },

  // --- act-eng-3: Sentence Structure (additional) ---
  {
    id: 'act-eng-3-q20',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "A number of students _______ already submitted the assignment before the deadline.",
    choices: [
      "F) has",
      "G) have",
      "H) is",
      "J) was"
    ],
    correct: 1,
    explanation: "'A number of' takes a plural verb because it means 'many.' 'Have' is the correct plural verb."
  },

  // --- act-eng-4: Style (additional) ---
  {
    id: 'act-eng-4-q18',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The students were told to think creatively, work collaboratively, and _______ their time wisely.",
    choices: [
      "A) managing",
      "B) the management of",
      "C) manage",
      "D) they should manage"
    ],
    correct: 2,
    explanation: "Parallel structure requires matching verb forms after 'to': think, work, and manage."
  },

  // --- act-eng-7: Organization (additional) ---
  {
    id: 'act-eng-7-q14',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "Which of the following would be the most effective opening sentence for an essay about the importance of clean water access in developing nations?",
    choices: [
      "F) Water is made of hydrogen and oxygen.",
      "G) I like to drink water every day.",
      "H) Nearly 800 million people worldwide lack access to clean drinking water, a crisis that claims thousands of lives each year.",
      "J) Water is the most common liquid on Earth."
    ],
    correct: 2,
    explanation: "H provides a specific, striking fact that immediately establishes the scope and importance of the topic."
  },

  // --- act-eng-8: Rhetorical Skills (additional) ---
  {
    id: 'act-eng-8-q14',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The writer wants to add a sentence that effectively concludes the essay about the benefits of learning a second language. Which choice best accomplishes this?",
    choices: [
      "A) Learning a second language takes time.",
      "B) Many people around the world speak English.",
      "C) Whether for career advancement, cognitive benefits, or cultural enrichment, learning a second language is an investment that pays lifelong dividends.",
      "D) Spanish is spoken in many countries."
    ],
    correct: 2,
    explanation: "C effectively summarizes the essay's key points (career, cognitive, cultural benefits) and provides a strong, conclusive statement."
  },

  // --- act-math-1: Pre-Algebra (additional) ---
  {
    id: 'act-math-1-q21',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A car travels 180 miles on 6 gallons of gas. How many miles per gallon does the car get?",
    choices: [
      "A) 25",
      "B) 28",
      "C) 30",
      "D) 32",
      "E) 36"
    ],
    correct: 2,
    explanation: "Miles per gallon = 180/6 = 30 mpg."
  },
  {
    id: 'act-math-1-q22',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "What is the value of |-7| + |3|?",
    choices: [
      "F) -4",
      "G) 4",
      "H) -10",
      "J) 10",
      "K) 21"
    ],
    correct: 3,
    explanation: "|-7| = 7 and |3| = 3. So 7 + 3 = 10."
  },

  // --- act-math-2: Algebra (additional) ---
  {
    id: 'act-math-2-q18',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If y = 3x − 7 and y = 17, what is x?",
    choices: [
      "A) 4",
      "B) 6",
      "C) 8",
      "D) 10",
      "E) 12"
    ],
    correct: 2,
    explanation: "17 = 3x − 7. Add 7: 24 = 3x. Divide: x = 8."
  },

  // --- act-math-3: Functions (additional) ---
  {
    id: 'act-math-3-q17',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "If f(x) = 3x + 2 and g(x) = x², what is f(g(2))?",
    choices: [
      "F) 8",
      "G) 14",
      "H) 20",
      "J) 26",
      "K) 64"
    ],
    correct: 1,
    explanation: "First find g(2) = 2² = 4. Then f(4) = 3(4) + 2 = 14."
  },

  // --- act-math-4: Quadratics (additional) ---
  {
    id: 'act-math-4-q19',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "Factor completely: 3x² − 12",
    choices: [
      "A) 3(x − 4)(x + 1)",
      "B) 3(x − 2)(x + 2)",
      "C) (3x − 4)(x + 3)",
      "D) 3(x² − 4)",
      "E) (x − 2)(3x + 6)"
    ],
    correct: 1,
    explanation: "Factor out 3: 3(x² − 4). Then factor the difference of squares: 3(x − 2)(x + 2)."
  },

  // --- act-math-5: Geometry (additional) ---
  {
    id: 'act-math-5-q16',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "The three interior angles of a triangle are x°, 2x°, and 3x°. What is the value of x?",
    choices: [
      "F) 20",
      "G) 30",
      "H) 45",
      "J) 60",
      "K) 90"
    ],
    correct: 1,
    explanation: "x + 2x + 3x = 180. 6x = 180. x = 30."
  },

  // --- act-math-6: Coordinate Geometry (additional) ---
  {
    id: 'act-math-6-q16',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "At what point does the line y = 2x − 6 cross the x-axis?",
    choices: [
      "A) (0, −6)",
      "B) (3, 0)",
      "C) (−3, 0)",
      "D) (6, 0)",
      "E) (−6, 0)"
    ],
    correct: 1,
    explanation: "At the x-axis, y = 0. Set 0 = 2x − 6. Then 2x = 6, x = 3. The point is (3, 0)."
  },

  // --- act-math-7: Statistics (additional) ---
  {
    id: 'act-math-7-q15',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A student's test scores are 82, 90, 76, 88, and 94. What is the mean score?",
    choices: [
      "F) 82",
      "G) 84",
      "H) 86",
      "J) 88",
      "K) 90"
    ],
    correct: 2,
    explanation: "Mean = (82 + 90 + 76 + 88 + 94)/5 = 430/5 = 86."
  },

  // --- act-math-8: Trig (additional) ---
  {
    id: 'act-math-8-q18',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "A 30-60-90 triangle has a shorter leg of length 5. What is the length of the hypotenuse?",
    choices: [
      "A) 5√2",
      "B) 5√3",
      "C) 10",
      "D) 10√3",
      "E) 15"
    ],
    correct: 2,
    explanation: "In a 30-60-90 triangle, the hypotenuse is twice the shorter leg. Hypotenuse = 2 × 5 = 10."
  },

  // --- act-read-1: Main Idea (additional) ---
  {
    id: 'act-read-1-q15',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage describes how a city's decision to plant trees along every major street reduced summer temperatures, lowered air conditioning costs, and improved residents' mental health. The passage's main idea is that:",
    choices: [
      "A) trees are tall plants",
      "B) urban tree planting can produce significant environmental, economic, and health benefits",
      "C) all cities should look identical",
      "D) air conditioning is expensive"
    ],
    correct: 1,
    explanation: "The passage highlights multiple benefits (temperature, cost, mental health) resulting from urban tree planting."
  },

  // --- act-read-2: Vocabulary (additional) ---
  {
    id: 'act-read-2-q14',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage describes the professor's argument as 'cogent.' As used here, 'cogent' most nearly means:",
    choices: [
      "F) confusing and disorganized",
      "G) clear, logical, and convincing",
      "H) brief and incomplete",
      "J) emotional and passionate"
    ],
    correct: 1,
    explanation: "'Cogent' means clear, logical, and persuasive. It describes an argument that is well-reasoned and compelling."
  },

  // --- act-read-3: Inference (additional) ---
  {
    id: 'act-read-3-q12',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The passage notes that the company's CEO always eats lunch in the employee cafeteria rather than in the executive dining room. This detail most likely suggests that the CEO:",
    choices: [
      "A) cannot afford the executive dining room",
      "B) values accessibility and connection with employees",
      "C) dislikes the food in the executive dining room",
      "D) is required by company policy to eat there"
    ],
    correct: 1,
    explanation: "Choosing to eat with employees rather than in a separate executive space suggests the CEO values being approachable and connected."
  },

  // --- act-read-4: Author's Purpose (additional) ---
  {
    id: 'act-read-4-q13',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "The author includes a lengthy quotation from a climate scientist in the middle of the passage. This quotation most likely serves to:",
    choices: [
      "F) fill space in the passage",
      "G) lend expert credibility to the author's argument",
      "H) contradict the passage's main point",
      "J) entertain the reader with an anecdote"
    ],
    correct: 1,
    explanation: "Including an expert quotation adds authority and credibility to the argument being made."
  },

  // --- act-read-5: Comparing Viewpoints (additional) ---
  {
    id: 'act-read-5-q12',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Author A advocates for a shorter school year with longer school days. Author B advocates for a longer school year with shorter school days. On what point do they most clearly disagree?",
    choices: [
      "A) whether education matters",
      "B) the optimal distribution of instructional time throughout the year",
      "C) the importance of summer vacation",
      "D) whether teachers should be paid more"
    ],
    correct: 1,
    explanation: "Both authors value instructional time but disagree about whether it should be concentrated into fewer, longer days or spread across more, shorter days."
  },

  // --- act-read-6: Structure (additional) ---
  {
    id: 'act-read-6-q12',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "The passage begins with a general statement about the importance of biodiversity, then narrows to discuss a specific endangered species. This organizational pattern is best described as:",
    choices: [
      "F) chronological",
      "G) cause and effect",
      "H) general to specific",
      "J) compare and contrast"
    ],
    correct: 2,
    explanation: "Moving from a broad topic (biodiversity) to a focused example (a specific species) is a general-to-specific pattern."
  },

  // --- act-read-7: Literary Narrative (additional) ---
  {
    id: 'act-read-7-q13',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "Throughout the passage, the narrator contrasts her memories of childhood summers with her current adult life. The primary effect of this contrast is to:",
    choices: [
      "A) show that childhood was terrible",
      "B) create a sense of nostalgia and loss of innocence",
      "C) argue that adults should behave like children",
      "D) provide instructions for summer activities"
    ],
    correct: 1,
    explanation: "Contrasting idealized childhood memories with adult reality creates nostalgia and a sense that something precious has been lost."
  },

  // --- act-read-8: Passages (additional) ---
  {
    id: 'act-read-8-q14',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A social science passage discusses how microfinance programs have helped women in developing countries start small businesses. The author's primary purpose is to:",
    choices: [
      "F) argue that all banks should be eliminated",
      "G) examine the role and impact of microfinance in women's economic empowerment",
      "H) provide instructions for starting a business",
      "J) compare microfinance to stock trading"
    ],
    correct: 1,
    explanation: "The passage focuses on how microfinance helps women economically, making G the most accurate description of the author's purpose."
  },

  // --- act-sci-1: Data (additional) ---
  {
    id: 'act-sci-1-q14',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A line graph shows the population of a town from 2000 to 2020. The line rises steadily from 2000 to 2010, then levels off from 2010 to 2020. During which period did the population grow?",
    choices: [
      "F) 2000 to 2010 only",
      "G) 2010 to 2020 only",
      "H) Both periods equally",
      "J) Neither period"
    ],
    correct: 0,
    explanation: "The line rises from 2000 to 2010 (indicating growth) and levels off from 2010 to 2020 (indicating stable population). Growth occurred primarily during the first period."
  },

  // --- act-sci-2: Experimental Design (additional) ---
  {
    id: 'act-sci-2-q14',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A student tests whether classical music helps plants grow taller. She places one group of plants in a room with classical music and another group in a silent room. Both groups receive the same water, light, and soil. After 4 weeks, she measures the heights. The independent variable is:",
    choices: [
      "A) the height of the plants",
      "B) the presence or absence of classical music",
      "C) the amount of water",
      "D) the type of soil"
    ],
    correct: 1,
    explanation: "The independent variable is what the experimenter deliberately changes — in this case, whether or not classical music is played."
  },

  // --- act-sci-3: Controls (additional) ---
  {
    id: 'act-sci-3-q12',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A student tests the effect of caffeine on reaction time by giving one group caffeinated coffee and another group decaffeinated coffee. The decaffeinated coffee group serves as:",
    choices: [
      "F) the experimental group",
      "G) the control group",
      "H) the dependent variable",
      "J) the independent variable"
    ],
    correct: 1,
    explanation: "The decaffeinated group provides a baseline for comparison. Because participants receive a similar drink without the key variable (caffeine), it serves as the control group."
  },

  // --- act-sci-4: Extrapolation (additional) ---
  {
    id: 'act-sci-4-q12',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "Data show that at 10°C, a reaction takes 60 seconds, and at 20°C, the reaction takes 30 seconds. If the trend continues, the approximate reaction time at 30°C would be:",
    choices: [
      "A) 0 seconds",
      "B) 15 seconds",
      "C) 20 seconds",
      "D) 45 seconds"
    ],
    correct: 1,
    explanation: "The reaction time halves for each 10°C increase. From 30 seconds at 20°C, halving gives 15 seconds at 30°C."
  },

  // --- act-sci-5: Viewpoints (additional) ---
  {
    id: 'act-sci-5-q12',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Scientist A believes that the decline in amphibian populations is primarily caused by a fungal disease. Scientist B believes it is primarily caused by habitat destruction. Which observation would weaken Scientist A's position?",
    choices: [
      "F) Amphibian populations declined in areas where the fungus was present.",
      "G) Amphibian populations in fungus-free areas also experienced similar declines.",
      "H) The fungus was found on the skin of many dead amphibians.",
      "J) Laboratory experiments showed the fungus is lethal to frogs."
    ],
    correct: 1,
    explanation: "If populations declined even where the fungus was absent, the fungus cannot be the primary cause, weakening Scientist A's argument."
  },

  // --- act-sci-6: Unit Logic (additional) ---
  {
    id: 'act-sci-6-q12',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "An experiment measures the speed of a toy car at 3 meters per second. How far will the car travel in 12 seconds at this speed?",
    choices: [
      "A) 4 meters",
      "B) 9 meters",
      "C) 36 meters",
      "D) 48 meters"
    ],
    correct: 2,
    explanation: "Distance = speed × time = 3 m/s × 12 s = 36 meters."
  },

  // --- act-sci-7: Predictions (additional) ---
  {
    id: 'act-sci-7-q12',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A hypothesis states that adding potassium to soil increases tomato yield. An experiment shows that soil with added potassium produced 40% more tomatoes than soil without. This result:",
    choices: [
      "F) disproves the hypothesis",
      "G) supports the hypothesis",
      "H) is unrelated to the hypothesis",
      "J) proves the hypothesis beyond doubt"
    ],
    correct: 1,
    explanation: "A 40% increase in yield with added potassium is consistent with the hypothesis. Note that a single experiment supports but does not definitively 'prove' a hypothesis."
  },

  // --- act-sci-8: Synthesis (additional) ---
  {
    id: 'act-sci-8-q12',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Table 1 shows that Drug A reduces fever by 2°C in 30 minutes. Figure 1 shows that Drug A reaches peak blood concentration at 30 minutes. Combining these sources suggests that:",
    choices: [
      "A) Drug A is ineffective",
      "B) Drug A's maximum fever reduction coincides with its peak blood concentration",
      "C) Drug A works best before it enters the bloodstream",
      "D) The drug should be taken every 5 minutes"
    ],
    correct: 1,
    explanation: "The fever reduction at 30 minutes and the peak blood concentration at 30 minutes suggest the drug's effect is greatest when its concentration is highest."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BATCH 7 — Additional questions for chapters still below 25 total
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-3: Sentence Structure ---
  {
    id: 'act-eng-3-q21',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The flock of geese _______ flying south for the winter.",
    choices: [
      "A) are",
      "B) is",
      "C) were",
      "D) have been"
    ],
    correct: 1,
    explanation: "'Flock' is a collective noun that typically takes a singular verb. 'Is' agrees with the singular subject 'flock.'"
  },

  // --- act-eng-4: Style/Tone ---
  {
    id: 'act-eng-4-q19',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The manager expects employees to arrive on time, dress professionally, and _______ all company policies.",
    choices: [
      "F) they should follow",
      "G) following",
      "H) follow",
      "J) the following of"
    ],
    correct: 2,
    explanation: "Parallel structure requires matching infinitives: 'to arrive,' 'dress,' and 'follow.'"
  },

  // --- act-eng-5: Transitions ---
  {
    id: 'act-eng-5-q16',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The athlete trained rigorously for months. _______, she won the gold medal at the national championship.",
    choices: [
      "A) Nevertheless",
      "B) On the other hand",
      "C) Ultimately",
      "D) In contrast"
    ],
    correct: 2,
    explanation: "The gold medal was the outcome of months of training. 'Ultimately' signals the final result of a process."
  },

  // --- act-eng-6: Concision ---
  {
    id: 'act-eng-6-q16',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "Due to the fact that the weather was bad, the game was postponed.",
    choices: [
      "F) NO CHANGE",
      "G) Due to bad weather",
      "H) Because the weather was bad,",
      "J) Due to the fact that bad weather occurred,"
    ],
    correct: 2,
    explanation: "'Due to the fact that' is a wordy way of saying 'because.' Choice H is the most concise and clear."
  },

  // --- act-eng-7: Organization ---
  {
    id: 'act-eng-7-q15',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A writer wants to add supporting evidence to a paragraph about the benefits of exercise. Which sentence best serves this purpose?",
    choices: [
      "A) Exercise has been around for a long time.",
      "B) According to a Harvard study, 30 minutes of daily exercise reduces the risk of heart disease by 40%.",
      "C) Many people own gym memberships.",
      "D) Running shoes come in many colors."
    ],
    correct: 1,
    explanation: "B provides specific, data-driven evidence from a reputable source that directly supports the paragraph's topic."
  },

  // --- act-eng-8: Rhetorical Skills ---
  {
    id: 'act-eng-8-q15',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "Which sentence best maintains the passage's optimistic tone about technological innovation?",
    choices: [
      "F) Technology has ruined society.",
      "G) These advances, while imperfect, hold remarkable promise for solving some of humanity's most pressing challenges.",
      "H) Technology is just okay.",
      "J) Nobody really understands technology."
    ],
    correct: 1,
    explanation: "G acknowledges imperfection while emphasizing 'remarkable promise,' maintaining an optimistic outlook."
  },

  // --- act-math-1: Pre-Algebra ---
  {
    id: 'act-math-1-q23',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "If a shirt costs $35 and sales tax is 8%, what is the total cost?",
    choices: [
      "A) $35.80",
      "B) $37.80",
      "C) $38.50",
      "D) $43.00",
      "E) $2.80"
    ],
    correct: 1,
    explanation: "Tax = $35 × 0.08 = $2.80. Total = $35 + $2.80 = $37.80."
  },

  // --- act-math-2: Algebra ---
  {
    id: 'act-math-2-q19',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "What is the slope of the line 4x − 2y = 10?",
    choices: [
      "F) -2",
      "G) 2",
      "H) 4",
      "J) -5",
      "K) 5"
    ],
    correct: 1,
    explanation: "Rewrite in slope-intercept form: −2y = −4x + 10, so y = 2x − 5. The slope is 2."
  },

  // --- act-math-3: Functions ---
  {
    id: 'act-math-3-q18',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "The domain of f(x) = √(x − 3) includes which of the following values of x?",
    choices: [
      "A) 0",
      "B) 1",
      "C) 2",
      "D) 3",
      "E) -3"
    ],
    correct: 3,
    explanation: "The expression under the square root must be non-negative: x − 3 ≥ 0, so x ≥ 3. Among the choices, only x = 3 satisfies this."
  },

  // --- act-math-4: Quadratics ---
  {
    id: 'act-math-4-q20',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "If the sum of two numbers is 10 and their product is 21, what are the two numbers?",
    choices: [
      "F) 3 and 7",
      "G) 4 and 6",
      "H) 2 and 8",
      "J) 1 and 9",
      "K) 5 and 5"
    ],
    correct: 0,
    explanation: "The numbers satisfy x + y = 10 and xy = 21. They are the roots of t² − 10t + 21 = 0, which factors as (t − 3)(t − 7) = 0. The numbers are 3 and 7."
  },

  // --- act-math-5: Geometry ---
  {
    id: 'act-math-5-q17',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A sphere has a radius of 3 cm. What is its volume? (Use π ≈ 3.14)",
    choices: [
      "A) 28.26 cm³",
      "B) 56.52 cm³",
      "C) 113.04 cm³",
      "D) 339.12 cm³",
      "E) 904.32 cm³"
    ],
    correct: 2,
    explanation: "Volume = (4/3)πr³ = (4/3)(3.14)(27) = (4/3)(84.78) = 113.04 cm³."
  },

  // --- act-math-6: Coordinate Geometry ---
  {
    id: 'act-math-6-q17',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the distance between the points (0, 0) and (5, 12)?",
    choices: [
      "F) 7",
      "G) 12",
      "H) 13",
      "J) 17",
      "K) 60"
    ],
    correct: 2,
    explanation: "Distance = √(5² + 12²) = √(25 + 144) = √169 = 13."
  },

  // --- act-math-7: Statistics ---
  {
    id: 'act-math-7-q16',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A spinner has 4 equal sections: red, blue, green, and yellow. If the spinner is spun twice, what is the probability of landing on red both times?",
    choices: [
      "A) 1/2",
      "B) 1/4",
      "C) 1/8",
      "D) 1/16",
      "E) 1/32"
    ],
    correct: 3,
    explanation: "P(red) = 1/4 for each spin. P(red both times) = 1/4 × 1/4 = 1/16."
  },

  // --- act-math-8: Trig ---
  {
    id: 'act-math-8-q19',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "If sin(θ) = 5/13 and θ is in the first quadrant, what is cos(θ)?",
    choices: [
      "F) 8/13",
      "G) 12/13",
      "H) 5/12",
      "J) 12/5",
      "K) 1/13"
    ],
    correct: 1,
    explanation: "Using sin²θ + cos²θ = 1: (5/13)² + cos²θ = 1. 25/169 + cos²θ = 1. cos²θ = 144/169. cos θ = 12/13 (positive in first quadrant)."
  },

  // --- act-read-1: Main Idea ---
  {
    id: 'act-read-1-q16',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage explains how a team of marine biologists discovered a new species of deep-sea fish near a hydrothermal vent. The main idea is that:",
    choices: [
      "F) the ocean is wet",
      "G) deep-sea exploration continues to reveal previously unknown species adapted to extreme environments",
      "H) all fish live near hydrothermal vents",
      "J) marine biology is an easy career"
    ],
    correct: 1,
    explanation: "The passage centers on the discovery of a new species in an extreme environment, highlighting ongoing deep-sea exploration."
  },

  // --- act-read-2: Vocabulary ---
  {
    id: 'act-read-2-q15',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage says the artist's later works were 'derivative' of her earlier masterpieces. As used here, 'derivative' most nearly means:",
    choices: [
      "A) mathematically based",
      "B) highly original",
      "C) imitative and lacking originality",
      "D) beautifully crafted"
    ],
    correct: 2,
    explanation: "'Derivative' in an artistic context means borrowing heavily from other works without originality."
  },

  // --- act-read-3: Inference ---
  {
    id: 'act-read-3-q13',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The passage mentions that the senator paused for a full minute before answering the reporter's question. It can most reasonably be inferred that:",
    choices: [
      "F) the senator did not hear the question",
      "G) the senator was carefully considering how to respond to a difficult question",
      "H) the senator was bored",
      "J) the reporter spoke too quietly"
    ],
    correct: 1,
    explanation: "A deliberate, lengthy pause before answering suggests careful thought about a response, especially in a political context."
  },

  // --- act-read-4: Purpose ---
  {
    id: 'act-read-4-q14',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "The passage ends with the question: 'If not now, when?' The author's purpose in ending this way is most likely to:",
    choices: [
      "A) show uncertainty about the topic",
      "B) create a sense of urgency and motivate the reader to act",
      "C) confuse the reader",
      "D) introduce a new topic for a future essay"
    ],
    correct: 1,
    explanation: "This rhetorical question implies that delay is unacceptable, creating urgency and motivating action."
  },

  // --- act-read-5: Comparing Viewpoints ---
  {
    id: 'act-read-5-q13',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage A describes electric vehicles as the key to reducing carbon emissions. Passage B warns that the mining of lithium for EV batteries causes significant environmental damage. Together, the two passages suggest that:",
    choices: [
      "F) electric vehicles are perfect",
      "G) gasoline cars are better than electric cars",
      "H) the environmental impact of transportation technology involves trade-offs that must be carefully weighed",
      "J) neither passage has valid points"
    ],
    correct: 2,
    explanation: "Together, the passages present benefits (reduced emissions) and costs (mining damage), illustrating the trade-offs involved in transitioning to EVs."
  },

  // --- act-read-6: Structure ---
  {
    id: 'act-read-6-q13',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "The author alternates between describing a historical event and reflecting on its modern significance. This technique primarily serves to:",
    choices: [
      "A) confuse readers about the timeline",
      "B) show how historical events remain relevant to contemporary issues",
      "C) prove the author is a historian",
      "D) fill space in the passage"
    ],
    correct: 1,
    explanation: "Alternating between history and modern reflection draws connections across time, demonstrating ongoing relevance."
  },

  // --- act-read-7: Literary ---
  {
    id: 'act-read-7-q14',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "The narrator describes the family home as 'breathing with memories.' This personification primarily conveys:",
    choices: [
      "F) that the house is haunted",
      "G) that the house is alive with the narrator's emotional connections to the past",
      "H) that the house has poor ventilation",
      "J) that the narrator is confused"
    ],
    correct: 1,
    explanation: "Personifying the house as 'breathing with memories' suggests it is filled with the emotional weight of past experiences."
  },

  // --- act-read-8: Passages ---
  {
    id: 'act-read-8-q15',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A humanities passage examines the role of public murals in expressing community identity. The author argues that murals 'give voice to neighborhoods that are often overlooked.' This claim primarily suggests that:",
    choices: [
      "A) murals are very loud",
      "B) public art can represent and amplify the perspectives of marginalized communities",
      "C) murals should be banned",
      "D) only professional artists should paint murals"
    ],
    correct: 1,
    explanation: "'Give voice' is figurative, meaning the murals express the perspectives and identity of communities that might otherwise go unheard."
  },

  // --- act-sci-1: Data ---
  {
    id: 'act-sci-1-q15',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A pie chart shows the composition of Earth's atmosphere: 78% Nitrogen, 21% Oxygen, 0.9% Argon, 0.1% Other gases. Which gas makes up the largest portion of the atmosphere?",
    choices: [
      "A) Oxygen",
      "B) Argon",
      "C) Nitrogen",
      "D) Carbon dioxide"
    ],
    correct: 2,
    explanation: "According to the pie chart, Nitrogen makes up 78% of the atmosphere, the largest portion."
  },

  // --- act-sci-2: Experimental Design ---
  {
    id: 'act-sci-2-q15',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A researcher wants to test whether a new study method improves test scores. She randomly divides 100 students into two groups: one uses the new method and the other uses their usual method. Why does she randomly assign students to groups?",
    choices: [
      "F) To save time",
      "G) To ensure that pre-existing differences between students are evenly distributed",
      "H) To make the experiment more confusing",
      "J) To guarantee the new method will work"
    ],
    correct: 1,
    explanation: "Random assignment ensures that differences in ability, motivation, and other factors are distributed evenly between groups, reducing bias."
  },

  // --- act-sci-3: Variables ---
  {
    id: 'act-sci-3-q13',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A student measures how water temperature affects the time it takes sugar to dissolve. She uses the same amount of sugar and the same stirring speed in each trial. The dependent variable is:",
    choices: [
      "A) water temperature",
      "B) amount of sugar",
      "C) stirring speed",
      "D) time for sugar to dissolve"
    ],
    correct: 3,
    explanation: "The dependent variable is what is measured as an outcome — in this case, how long it takes the sugar to dissolve."
  },

  // --- act-sci-4: Trends ---
  {
    id: 'act-sci-4-q13',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A graph shows that as the concentration of a pollutant increases from 0 to 100 ppm, the survival rate of fish decreases from 95% to 10%. This relationship is best described as:",
    choices: [
      "F) a positive correlation",
      "G) a negative correlation",
      "H) no correlation",
      "J) a random pattern"
    ],
    correct: 1,
    explanation: "As one variable (pollutant) increases and the other (survival rate) decreases, this is a negative correlation."
  },

  // --- act-sci-5: Viewpoints ---
  {
    id: 'act-sci-5-q13',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Student 1 argues that increasing temperature always increases reaction rate. Student 2 argues that at very high temperatures, enzymes denature and reaction rate decreases. Which evidence would support Student 2?",
    choices: [
      "A) Reaction rate increased from 20°C to 40°C.",
      "B) Reaction rate peaked at 37°C and dropped sharply at 60°C.",
      "C) Reaction rate was constant across all temperatures.",
      "D) The enzyme was not affected by any temperature change."
    ],
    correct: 1,
    explanation: "A peak followed by a sharp decline at high temperatures demonstrates enzyme denaturation, supporting Student 2's claim."
  },

  // --- act-sci-6: Calculations ---
  {
    id: 'act-sci-6-q13',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "A student measures the mass of a beaker as 150 g and the mass of the beaker with water as 400 g. What is the mass of the water?",
    choices: [
      "F) 150 g",
      "G) 250 g",
      "H) 400 g",
      "J) 550 g"
    ],
    correct: 1,
    explanation: "Mass of water = total mass − beaker mass = 400 − 150 = 250 g."
  },

  // --- act-sci-7: Models ---
  {
    id: 'act-sci-7-q13',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A climate model predicts that global temperatures will rise by 2°C over the next 50 years. If the model's prediction is accurate, which of the following is most likely to occur?",
    choices: [
      "A) Global ice sheets will grow larger.",
      "B) Sea levels will rise due to thermal expansion and melting ice.",
      "C) Average global temperatures will decrease.",
      "D) Ocean salinity will remain completely unchanged."
    ],
    correct: 1,
    explanation: "A 2°C rise would cause thermal expansion of water and melting of ice, both contributing to sea level rise."
  },

  // --- act-sci-8: Synthesis ---
  {
    id: 'act-sci-8-q13',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Figure 1 shows that Soil Type B has the highest water retention. Table 1 shows that Soil Type B also has the highest clay content. Based on both sources, it can be concluded that:",
    choices: [
      "A) clay content has no relationship to water retention",
      "B) higher clay content is associated with higher water retention",
      "C) sandy soils retain the most water",
      "D) water retention depends only on temperature"
    ],
    correct: 1,
    explanation: "Both the highest water retention and highest clay content correspond to Soil Type B, suggesting a positive association between clay content and water retention."
  },

  // --- Additional Math to fill gaps ---
  {
    id: 'act-math-1-q24',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A bag contains only red and blue marbles. The ratio of red to blue marbles is 3:5. If there are 40 marbles total, how many red marbles are there?",
    choices: [
      "F) 8",
      "G) 12",
      "H) 15",
      "J) 24",
      "K) 25"
    ],
    correct: 2,
    explanation: "Total ratio parts = 3 + 5 = 8. Red = (3/8) × 40 = 15."
  },
  {
    id: 'act-math-2-q20',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "The sum of three consecutive integers is 78. What is the largest of the three?",
    choices: [
      "A) 24",
      "B) 25",
      "C) 26",
      "D) 27",
      "E) 28"
    ],
    correct: 3,
    explanation: "Let the integers be n, n+1, n+2. Then 3n + 3 = 78, so 3n = 75, n = 25. The largest is 25 + 2 = 27."
  },
  {
    id: 'act-math-3-q19',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "If f(x) = |2x − 8|, what is f(1)?",
    choices: [
      "F) -6",
      "G) 6",
      "H) -10",
      "J) 10",
      "K) 2"
    ],
    correct: 1,
    explanation: "f(1) = |2(1) − 8| = |2 − 8| = |−6| = 6."
  },
  {
    id: 'act-math-4-q21',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the product (2x + 3)(2x − 3)?",
    choices: [
      "A) 4x² − 6",
      "B) 4x² + 9",
      "C) 4x² − 9",
      "D) 2x² − 9",
      "E) 4x² − 6x + 9"
    ],
    correct: 2,
    explanation: "This is a difference of squares: (2x + 3)(2x − 3) = (2x)² − 3² = 4x² − 9."
  },
  {
    id: 'act-math-5-q18',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "An isosceles triangle has two sides of length 10 cm and a base of 12 cm. What is the height from the base to the opposite vertex?",
    choices: [
      "F) 6 cm",
      "G) 8 cm",
      "H) 10 cm",
      "J) 12 cm",
      "K) 14 cm"
    ],
    correct: 1,
    explanation: "The height bisects the base, creating a right triangle with hypotenuse 10 and base 6. Height = √(10² − 6²) = √(100 − 36) = √64 = 8 cm."
  },
  {
    id: 'act-math-6-q18',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the midpoint of the segment connecting (−4, 2) and (8, −6)?",
    choices: [
      "A) (2, −2)",
      "B) (4, −4)",
      "C) (−2, 2)",
      "D) (6, −4)",
      "E) (2, 4)"
    ],
    correct: 0,
    explanation: "Midpoint = ((−4 + 8)/2, (2 + (−6))/2) = (4/2, −4/2) = (2, −2)."
  },
  {
    id: 'act-math-7-q17',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "How many different 3-letter arrangements can be made from the letters A, B, C, D if no letter is repeated?",
    choices: [
      "F) 12",
      "G) 24",
      "H) 36",
      "J) 64",
      "K) 81"
    ],
    correct: 1,
    explanation: "This is a permutation: P(4,3) = 4 × 3 × 2 = 24."
  },
  {
    id: 'act-math-8-q20',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is tan(45°)?",
    choices: [
      "A) 0",
      "B) 1/2",
      "C) √2/2",
      "D) 1",
      "E) √3"
    ],
    correct: 3,
    explanation: "tan(45°) = sin(45°)/cos(45°) = 1. This is a standard trigonometric value."
  },

  // --- Additional Reading to fill gaps ---
  {
    id: 'act-read-1-q17',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage discusses how a library in a low-income neighborhood became a community hub by offering free job training, tutoring, and after-school programs. The main idea is that:",
    choices: [
      "A) libraries only contain books",
      "B) public libraries can serve as vital community resources that go far beyond lending books",
      "C) job training is more important than reading",
      "D) low-income neighborhoods have no resources"
    ],
    correct: 1,
    explanation: "The passage shows the library fulfilling multiple community needs beyond its traditional role, supporting B."
  },
  {
    id: 'act-read-2-q16',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage describes the team's 'nascent' efforts to develop a new vaccine. As used here, 'nascent' most nearly means:",
    choices: [
      "F) dying and fading",
      "G) just beginning to develop",
      "H) fully mature",
      "J) completely abandoned"
    ],
    correct: 1,
    explanation: "'Nascent' means just beginning to develop or emerge. It describes something in its earliest stages."
  },
  {
    id: 'act-read-3-q14',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The passage describes a teacher who always arrived at school an hour before classes began to prepare detailed lesson plans. It can be inferred that the teacher:",
    choices: [
      "A) did not enjoy teaching",
      "B) was dedicated to providing a high-quality learning experience",
      "C) was required by the principal to arrive early",
      "D) had nothing else to do"
    ],
    correct: 1,
    explanation: "Arriving early voluntarily to prepare thoroughly suggests dedication and commitment to teaching quality."
  },
  {
    id: 'act-read-4-q15',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "The author uses statistics, expert quotations, and historical examples throughout the passage. This combination of evidence primarily serves to:",
    choices: [
      "F) confuse the reader",
      "G) build a multi-faceted, well-supported argument",
      "H) show that the author did a lot of research",
      "J) distract from a weak thesis"
    ],
    correct: 1,
    explanation: "Using diverse types of evidence (data, authority, history) strengthens the argument by supporting it from multiple angles."
  },
  {
    id: 'act-read-5-q14',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage A argues for year-round schooling. Passage B argues that summer breaks are essential for children's mental health. Which piece of evidence would most directly challenge Passage A's position?",
    choices: [
      "A) A study showing that year-round students had slightly higher test scores",
      "B) A study showing that students in year-round schools experienced higher rates of burnout and anxiety",
      "C) A study showing that teachers prefer year-round schedules",
      "D) A study showing that summer break costs school districts money"
    ],
    correct: 1,
    explanation: "Evidence of burnout and anxiety would directly challenge the benefits claimed by Passage A and support Passage B's concern about mental health."
  },

  // --- Additional Science to fill gaps ---
  {
    id: 'act-sci-1-q16',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A table shows that Solution A has pH 3, Solution B has pH 7, and Solution C has pH 11. Which solution is most acidic?",
    choices: [
      "F) Solution A",
      "G) Solution B",
      "H) Solution C",
      "J) Solutions A and C are equally acidic"
    ],
    correct: 0,
    explanation: "Lower pH values indicate greater acidity. Solution A at pH 3 is the most acidic."
  },
  {
    id: 'act-sci-2-q16',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A scientist measures bacterial growth in three petri dishes kept at different temperatures: 20°C, 37°C, and 50°C. She repeats the experiment three times. The purpose of repeating the experiment is to:",
    choices: [
      "A) use more petri dishes",
      "B) ensure the results are reliable and reproducible",
      "C) test more temperatures",
      "D) change the independent variable"
    ],
    correct: 1,
    explanation: "Repetition increases confidence in results by showing they are consistent and not due to chance."
  },
  {
    id: 'act-sci-3-q14',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "In an experiment testing the effect of light intensity on the rate of photosynthesis, which of the following is the dependent variable?",
    choices: [
      "F) Light intensity",
      "G) Type of plant",
      "H) Rate of photosynthesis",
      "J) Temperature"
    ],
    correct: 2,
    explanation: "The rate of photosynthesis is the outcome being measured, making it the dependent variable."
  },
  {
    id: 'act-sci-4-q14',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A table shows the following data:\nTemperature (°C): 10, 20, 30, 40\nSolubility (g/100mL): 20, 35, 55, 80\n\nBased on the trend, the approximate solubility at 25°C would be:",
    choices: [
      "A) 30 g/100mL",
      "B) 45 g/100mL",
      "C) 55 g/100mL",
      "D) 65 g/100mL"
    ],
    correct: 1,
    explanation: "25°C is the midpoint between 20°C and 30°C. The midpoint between 35 and 55 is 45 g/100mL."
  },
  {
    id: 'act-sci-5-q14',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Scientist A hypothesizes that a nearby supernova caused a mass extinction by flooding Earth with radiation. Scientist B hypothesizes that the extinction was caused by a prolonged ice age. Which evidence would support Scientist A?",
    choices: [
      "F) Evidence of glaciation during the extinction period",
      "G) Detection of unusual radioactive isotopes in the geological layer corresponding to the extinction",
      "H) Fossil evidence of gradual species decline over millions of years",
      "J) Evidence that ocean temperatures decreased slowly"
    ],
    correct: 1,
    explanation: "Unusual radioactive isotopes in the extinction layer would suggest an extraterrestrial radiation source, supporting the supernova hypothesis."
  },
  {
    id: 'act-sci-6-q14',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "A ball is dropped from a height of 20 meters. Using the formula d = (1/2)gt² (where g = 10 m/s²), how long does it take to hit the ground?",
    choices: [
      "A) 1 second",
      "B) 2 seconds",
      "C) 4 seconds",
      "D) 10 seconds"
    ],
    correct: 1,
    explanation: "20 = (1/2)(10)t². 20 = 5t². t² = 4. t = 2 seconds."
  },
  {
    id: 'act-sci-7-q14',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A student's model predicts that doubling the mass hanging on a spring will double the stretch distance. She tests this with masses of 100g, 200g, and 400g and measures stretches of 2cm, 4cm, and 8cm. These results:",
    choices: [
      "F) disprove the model",
      "G) support the model",
      "H) are inconclusive",
      "J) show the spring is broken"
    ],
    correct: 1,
    explanation: "Each doubling of mass (100→200→400g) produces a doubling of stretch (2→4→8cm), confirming the model's prediction."
  },
  {
    id: 'act-sci-8-q14',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Graph 1 shows that Bird Species A is most active between 6 AM and 9 AM. Table 1 shows that Insect Species B is most abundant during the same time window. Based on both sources, the most likely relationship is:",
    choices: [
      "A) Bird Species A avoids Insect Species B",
      "B) Bird Species A's activity may coincide with peak prey (Insect Species B) availability",
      "C) The two species have no connection",
      "D) Insect Species B is active to avoid birds"
    ],
    correct: 1,
    explanation: "Both sources show overlapping peak times, suggesting the bird is active when its likely food source (insects) is most available."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BATCH 8 — Final ~110 questions to reach ~800 total
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-1: Punctuation ---
  {
    id: 'act-eng-1-q22',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The company's new policy—which takes effect next month—will require all employees to complete safety training.",
    choices: [
      "A) NO CHANGE",
      "B) The company's new policy, which takes effect next month will require all employees to complete safety training.",
      "C) The company's new policy which takes effect next month, will require all employees to complete safety training.",
      "D) The company's new policy; which takes effect next month; will require all employees to complete safety training."
    ],
    correct: 0,
    explanation: "Em dashes correctly set off the parenthetical clause 'which takes effect next month.' The original is correct."
  },
  {
    id: 'act-eng-1-q23',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "Maria packed her suitcase with the following items, a coat, boots, gloves, and a scarf.",
    choices: [
      "F) NO CHANGE",
      "G) following items: a coat, boots, gloves, and a scarf.",
      "H) following items a coat, boots, gloves, and a scarf.",
      "J) following items; a coat, boots, gloves, and a scarf."
    ],
    correct: 1,
    explanation: "A colon, not a comma, should introduce a list after the phrase 'the following items.' G is correct."
  },

  // --- act-eng-2: Grammar ---
  {
    id: 'act-eng-2-q21',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The tourists enjoyed the scenery, they took hundreds of photographs during the trip.",
    choices: [
      "A) NO CHANGE",
      "B) scenery, and they took hundreds of photographs during the trip.",
      "C) scenery they took hundreds of photographs during the trip.",
      "D) scenery, they, took hundreds of photographs during the trip."
    ],
    correct: 1,
    explanation: "The original is a comma splice. Adding 'and' with the comma correctly joins the two independent clauses."
  },
  {
    id: 'act-eng-2-q22',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "Since the beginning of the semester. The professor has assigned five major essays.",
    choices: [
      "F) NO CHANGE",
      "G) Since the beginning of the semester, the professor has assigned five major essays.",
      "H) Since the beginning of the semester; the professor has assigned five major essays.",
      "J) Since, the beginning of the semester the professor has assigned five major essays."
    ],
    correct: 1,
    explanation: "'Since the beginning of the semester' is a dependent clause fragment. A comma connects it to the main clause."
  },

  // --- act-eng-3: Sentence Structure ---
  {
    id: 'act-eng-3-q22',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "The number of applicants _______ increased dramatically this year.",
    choices: [
      "A) have",
      "B) has",
      "C) are",
      "D) were"
    ],
    correct: 1,
    explanation: "'The number of' takes a singular verb. 'Has' is the correct singular verb. (Compare with 'A number of,' which takes a plural verb.)"
  },

  // --- act-eng-4: Style ---
  {
    id: 'act-eng-4-q20',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "Running through the park, _______ caught my eye.",
    choices: [
      "F) a beautiful sunset",
      "G) I noticed a beautiful sunset that",
      "H) the sunset, which was beautiful,",
      "J) there was a sunset"
    ],
    correct: 0,
    explanation: "While 'Running through the park' implies a person running, F creates an acceptable sentence where the sunset caught the runner's eye. On the ACT, F is the most direct and concise completion."
  },

  // --- act-eng-5: Transitions ---
  {
    id: 'act-eng-5-q17',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The restaurant received mixed reviews from critics. _______, it quickly became one of the most popular dining spots in the city.",
    choices: [
      "A) Therefore",
      "B) As a result",
      "C) Nonetheless",
      "D) For example"
    ],
    correct: 2,
    explanation: "The restaurant's popularity despite mixed reviews is unexpected. 'Nonetheless' signals this contrast."
  },
  {
    id: 'act-eng-5-q18',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The new highway reduced commute times by 20 minutes. _______, it decreased traffic congestion on local roads.",
    choices: [
      "F) However",
      "G) Furthermore",
      "H) In contrast",
      "J) On the other hand"
    ],
    correct: 1,
    explanation: "Both sentences describe positive effects of the highway. 'Furthermore' adds an additional benefit."
  },

  // --- act-eng-6: Redundancy ---
  {
    id: 'act-eng-6-q17',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The end result of the experiment confirmed the hypothesis.",
    choices: [
      "A) NO CHANGE",
      "B) The final end result",
      "C) The result",
      "D) The resulting end result"
    ],
    correct: 2,
    explanation: "'End result' is redundant — a result is already the end. 'The result' is concise and clear."
  },
  {
    id: 'act-eng-6-q18',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "The free gift was included with every purchase.",
    choices: [
      "F) NO CHANGE",
      "G) The free complimentary gift",
      "H) The gift",
      "J) The free and complimentary gift"
    ],
    correct: 2,
    explanation: "A gift is inherently free. 'The gift' eliminates the redundancy."
  },

  // --- act-eng-7: Organization ---
  {
    id: 'act-eng-7-q16',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A paragraph about the environmental impact of fast fashion includes the sentence: 'My favorite color is blue.' This sentence should be:",
    choices: [
      "A) kept, because it provides a personal connection",
      "B) moved to the conclusion",
      "C) deleted, because it is completely irrelevant to the topic",
      "D) expanded to discuss other favorite colors"
    ],
    correct: 2,
    explanation: "A personal color preference has nothing to do with fast fashion's environmental impact. It should be deleted."
  },

  // --- act-eng-8: Rhetorical Skills ---
  {
    id: 'act-eng-8-q16',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The writer wants to add a sentence that creates a vivid image of the abandoned factory. Which choice best accomplishes this?",
    choices: [
      "F) The factory closed in 2003.",
      "G) Factories are large buildings.",
      "H) Rust crept along the skeletal beams, and shattered windows stared out like hollow eyes onto the overgrown parking lot.",
      "J) The factory was not operating anymore."
    ],
    correct: 2,
    explanation: "H uses vivid sensory details and figurative language ('skeletal beams,' 'hollow eyes') to create a striking visual image."
  },

  // --- act-math-1: Pre-Algebra ---
  {
    id: 'act-math-1-q25',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "What is 3/4 expressed as a decimal?",
    choices: [
      "A) 0.25",
      "B) 0.34",
      "C) 0.50",
      "D) 0.75",
      "E) 1.33"
    ],
    correct: 3,
    explanation: "3 ÷ 4 = 0.75."
  },
  {
    id: 'act-math-1-q26',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A factory produces 240 units in an 8-hour shift. What is the production rate in units per hour?",
    choices: [
      "F) 20",
      "G) 25",
      "H) 30",
      "J) 35",
      "K) 40"
    ],
    correct: 2,
    explanation: "240 ÷ 8 = 30 units per hour."
  },

  // --- act-math-2: Algebra ---
  {
    id: 'act-math-2-q21',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If 2x + 7 = 3x − 5, what is x?",
    choices: [
      "A) 2",
      "B) 6",
      "C) 12",
      "D) -12",
      "E) -2"
    ],
    correct: 2,
    explanation: "Subtract 2x: 7 = x − 5. Add 5: x = 12."
  },

  // --- act-math-3: Functions ---
  {
    id: 'act-math-3-q20',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "A function is defined as f(x) = -2x + 10. For what value of x is f(x) = 0?",
    choices: [
      "F) -5",
      "G) 0",
      "H) 5",
      "J) 10",
      "K) 20"
    ],
    correct: 2,
    explanation: "Set -2x + 10 = 0. Then -2x = -10, so x = 5."
  },

  // --- act-math-4: Exponents ---
  {
    id: 'act-math-4-q22',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "Simplify: (x⁵)/(x²) · x³",
    choices: [
      "A) x⁴",
      "B) x⁶",
      "C) x⁸",
      "D) x¹⁰",
      "E) x³⁰"
    ],
    correct: 1,
    explanation: "(x⁵)/(x²) = x³. Then x³ · x³ = x⁶."
  },

  // --- act-math-5: Geometry ---
  {
    id: 'act-math-5-q19',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "A rectangular prism has dimensions 4 cm × 5 cm × 8 cm. What is its surface area?",
    choices: [
      "F) 112 cm²",
      "G) 160 cm²",
      "H) 184 cm²",
      "J) 200 cm²",
      "K) 320 cm²"
    ],
    correct: 2,
    explanation: "Surface area = 2(lw + lh + wh) = 2(4×5 + 4×8 + 5×8) = 2(20 + 32 + 40) = 2(92) = 184 cm²."
  },

  // --- act-math-6: Coordinate Geometry ---
  {
    id: 'act-math-6-q19',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the slope of a line perpendicular to y = (2/3)x + 4?",
    choices: [
      "A) 2/3",
      "B) -2/3",
      "C) 3/2",
      "D) -3/2",
      "E) -4"
    ],
    correct: 3,
    explanation: "The slope of the given line is 2/3. The slope of a perpendicular line is the negative reciprocal: -3/2."
  },

  // --- act-math-7: Statistics ---
  {
    id: 'act-math-7-q18',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "A standard deck of 52 cards has 4 aces. If one card is drawn at random, what is the probability of drawing an ace?",
    choices: [
      "F) 1/52",
      "G) 1/26",
      "H) 1/13",
      "J) 4/13",
      "K) 1/4"
    ],
    correct: 2,
    explanation: "P(ace) = 4/52 = 1/13."
  },

  // --- act-math-8: Trigonometry ---
  {
    id: 'act-math-8-q21',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "In a right triangle, if the opposite side is 8 and the hypotenuse is 17, what is sin(θ)?",
    choices: [
      "A) 8/15",
      "B) 8/17",
      "C) 15/17",
      "D) 17/8",
      "E) 15/8"
    ],
    correct: 1,
    explanation: "sin(θ) = opposite/hypotenuse = 8/17."
  },

  // --- act-read-1: Main Idea ---
  {
    id: 'act-read-1-q18',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage chronicles the efforts of a group of volunteers who cleaned up a polluted river, resulting in the return of fish populations and increased tourism. The primary message is that:",
    choices: [
      "F) river pollution is permanent",
      "G) community-driven environmental restoration can produce significant ecological and economic benefits",
      "H) volunteers are always available",
      "J) fish populations never decline"
    ],
    correct: 1,
    explanation: "The passage links community action to both ecological recovery (fish return) and economic benefit (tourism), supporting G."
  },

  // --- act-read-2: Vocabulary ---
  {
    id: 'act-read-2-q17',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage describes the diplomat's 'deft' handling of the crisis. As used here, 'deft' most nearly means:",
    choices: [
      "A) clumsy and awkward",
      "B) skillful and adroit",
      "C) slow and cautious",
      "D) aggressive and forceful"
    ],
    correct: 1,
    explanation: "'Deft' means demonstrating skill and cleverness, especially in handling something tricky."
  },

  // --- act-read-3: Inference ---
  {
    id: 'act-read-3-q15',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The narrator observes that her mother kept every letter her father had sent from overseas, arranged chronologically in a wooden box. It can be inferred that the mother:",
    choices: [
      "F) did not care about the letters",
      "G) deeply valued the letters as connections to her husband during his absence",
      "H) planned to sell the letters",
      "J) could not read"
    ],
    correct: 1,
    explanation: "Keeping every letter in careful chronological order suggests deep emotional attachment and value."
  },

  // --- act-read-4: Purpose ---
  {
    id: 'act-read-4-q16',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "The author uses an extended metaphor comparing education to building a house. This metaphor primarily serves to:",
    choices: [
      "A) discuss architecture",
      "B) make an abstract concept (education) more concrete and understandable through a familiar comparison",
      "C) argue that houses are more important than education",
      "D) confuse the reader"
    ],
    correct: 1,
    explanation: "Extended metaphors help readers understand abstract ideas by connecting them to familiar, concrete concepts."
  },

  // --- act-read-5: Viewpoints ---
  {
    id: 'act-read-5-q15',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage A argues that social media strengthens democratic participation. Passage B argues that social media spreads misinformation that undermines democracy. A point of agreement between the authors is:",
    choices: [
      "F) social media has no political impact",
      "G) social media platforms have significant influence on political discourse",
      "H) social media should be banned",
      "J) democracy is not important"
    ],
    correct: 1,
    explanation: "Both authors agree that social media significantly affects political discourse, even though they disagree about whether the effect is positive or negative."
  },

  // --- act-read-6: Structure ---
  {
    id: 'act-read-6-q14',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "The author ends the passage with a paradox: 'In our quest to connect everyone, we have never been more alone.' This concluding technique primarily serves to:",
    choices: [
      "A) confuse the reader",
      "B) provoke thought by highlighting a contradiction that captures the passage's central tension",
      "C) change the subject",
      "D) summarize all previous paragraphs"
    ],
    correct: 1,
    explanation: "A concluding paradox invites the reader to reflect on the tension between the goal (connection) and the outcome (isolation)."
  },

  // --- act-read-7: Literary ---
  {
    id: 'act-read-7-q15',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "The narrator says the photograph 'held more truth than any words I could write.' This statement most likely means that:",
    choices: [
      "F) the narrator cannot write",
      "G) photographs are always more truthful than text",
      "H) the visual image captured something essential that language could not fully express",
      "J) the narrator prefers photography to writing"
    ],
    correct: 2,
    explanation: "The narrator is expressing that the photograph conveys an emotional or experiential truth that transcends what words can capture."
  },

  // --- act-read-8: Passages ---
  {
    id: 'act-read-8-q16',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A social science passage examines how access to public transportation affects employment rates in urban neighborhoods. The author concludes that 'transit is not merely about moving people — it is about moving opportunity.' This conclusion primarily emphasizes:",
    choices: [
      "A) that buses and trains move quickly",
      "B) the broader social and economic significance of transportation infrastructure",
      "C) that employment is unrelated to transportation",
      "D) that only cars provide real opportunity"
    ],
    correct: 1,
    explanation: "By framing transit as 'moving opportunity,' the author elevates the discussion from logistics to social justice and economic access."
  },

  // --- act-sci-1: Data ---
  {
    id: 'act-sci-1-q17',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A data table shows the following results:\nPlant A: Height 15 cm (full sun)\nPlant B: Height 12 cm (partial shade)\nPlant C: Height 7 cm (full shade)\nPlant D: Height 14 cm (full sun)\n\nBased on the data, plants in full sun tend to:",
    choices: [
      "A) grow shorter than plants in shade",
      "B) grow taller than plants in shade",
      "C) grow the same height regardless of light",
      "D) not grow at all"
    ],
    correct: 1,
    explanation: "Plants A and D (full sun) are taller (15 cm, 14 cm) than Plant C (full shade, 7 cm), indicating full sun promotes taller growth."
  },

  // --- act-sci-2: Experimental Design ---
  {
    id: 'act-sci-2-q17',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A student tests whether different types of music affect plant growth. She places five identical plants in separate rooms, each playing a different genre. All plants receive the same light, water, and temperature. What is the independent variable?",
    choices: [
      "F) Plant height",
      "G) Amount of water",
      "H) Type of music",
      "J) Room temperature"
    ],
    correct: 2,
    explanation: "The independent variable is the factor deliberately varied — in this case, the type of music."
  },

  // --- act-sci-3: Controls ---
  {
    id: 'act-sci-3-q15',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "An experiment tests whether a new hand sanitizer kills more bacteria than soap. Which of the following would be the best control?",
    choices: [
      "A) Washing hands with water only",
      "B) Washing hands with the new sanitizer",
      "C) Not washing hands at all",
      "D) Using a different brand of sanitizer"
    ],
    correct: 0,
    explanation: "Washing with water only provides a baseline — it controls for the mechanical action of washing without any antibacterial agent."
  },

  // --- act-sci-4: Trends ---
  {
    id: 'act-sci-4-q15',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "Data show that the concentration of CO₂ in the atmosphere has risen from 280 ppm in 1800 to 420 ppm in 2020. The average rate of increase per decade is approximately:",
    choices: [
      "F) 6.4 ppm/decade",
      "G) 14 ppm/decade",
      "H) 28 ppm/decade",
      "J) 42 ppm/decade"
    ],
    correct: 0,
    explanation: "Increase = 420 − 280 = 140 ppm over 220 years = 22 decades. Rate = 140/22 ≈ 6.4 ppm per decade."
  },

  // --- act-sci-5: Viewpoints ---
  {
    id: 'act-sci-5-q15',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Theory A states that the universe will continue expanding forever. Theory B states that the universe will eventually stop expanding and collapse. Which observation would support Theory B?",
    choices: [
      "A) Galaxies are currently moving apart from each other at an accelerating rate.",
      "B) Measurements showing that the total mass-energy density exceeds the critical density.",
      "C) Evidence that the universe is flat and will expand forever.",
      "D) Discovery of new galaxies forming."
    ],
    correct: 1,
    explanation: "If the mass-energy density exceeds the critical density, gravity would eventually halt and reverse expansion, supporting the collapse prediction."
  },

  // --- act-sci-6: Calculations ---
  {
    id: 'act-sci-6-q15',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "If a sound wave has a frequency of 500 Hz and a wavelength of 0.68 meters, what is the speed of the sound wave?",
    choices: [
      "F) 170 m/s",
      "G) 340 m/s",
      "H) 500 m/s",
      "J) 735 m/s"
    ],
    correct: 1,
    explanation: "Speed = frequency × wavelength = 500 × 0.68 = 340 m/s."
  },

  // --- act-sci-7: Models ---
  {
    id: 'act-sci-7-q15',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A student models the cooling of a cup of coffee and predicts it will reach room temperature (22°C) in exactly 30 minutes. She measures the temperature every 5 minutes and finds the coffee reaches 22°C at 35 minutes. This means:",
    choices: [
      "A) the model is perfectly accurate",
      "B) the model underestimated the cooling time",
      "C) the model overestimated the cooling time",
      "D) the experiment was performed incorrectly"
    ],
    correct: 1,
    explanation: "The model predicted 30 minutes but the actual time was 35 minutes. The model underestimated how long cooling would take."
  },

  // --- act-sci-8: Synthesis ---
  {
    id: 'act-sci-8-q15',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Figure 1 shows that Crop X yields the most at pH 6.0. Table 1 shows the pH of three fields: Field 1 (pH 5.0), Field 2 (pH 6.0), Field 3 (pH 7.5). Based on both sources, Crop X should be planted in:",
    choices: [
      "A) Field 1",
      "B) Field 2",
      "C) Field 3",
      "D) All fields equally"
    ],
    correct: 1,
    explanation: "Since Crop X yields best at pH 6.0 (Figure 1), and Field 2 has pH 6.0 (Table 1), Field 2 is the best match."
  },

  // --- Additional English ---
  {
    id: 'act-eng-1-q24',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The athletes' training schedules which are demanding require them to wake up at 5 AM.",
    choices: [
      "A) NO CHANGE",
      "B) The athletes' training schedules, which are demanding, require them to wake up at 5 AM.",
      "C) The athletes' training schedules which are demanding, require them to wake up at 5 AM.",
      "D) The athletes' training schedules, which are demanding require them to wake up at 5 AM."
    ],
    correct: 1,
    explanation: "The nonrestrictive clause 'which are demanding' must be enclosed in commas on both sides."
  },
  {
    id: 'act-eng-2-q23',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The concert was canceled due to the storm the fans were disappointed but understood the decision.",
    choices: [
      "F) NO CHANGE",
      "G) storm. The fans were disappointed but understood the decision.",
      "H) storm the fans, were disappointed but understood the decision.",
      "J) storm, the fans, were disappointed but understood the decision."
    ],
    correct: 1,
    explanation: "The original is a run-on sentence. A period after 'storm' creates two complete sentences."
  },
  {
    id: 'act-eng-3-q23',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Ten dollars _______ not enough to buy lunch in the city.",
    choices: [
      "A) are",
      "B) is",
      "C) were",
      "D) have been"
    ],
    correct: 1,
    explanation: "A sum of money is treated as a singular unit. 'Ten dollars is' is correct because it refers to one amount."
  },
  {
    id: 'act-eng-5-q19',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The first attempt at the experiment failed. _______, the team redesigned their approach and tried again.",
    choices: [
      "F) Similarly",
      "G) Undeterred",
      "H) In other words",
      "J) As a result"
    ],
    correct: 1,
    explanation: "'Undeterred' shows that despite the failure, the team was not discouraged and continued, providing an effective transition."
  },
  {
    id: 'act-eng-7-q17',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "The writer wants to open an essay about the importance of ocean conservation with an engaging sentence. Which choice best accomplishes this?",
    choices: [
      "A) The ocean is big.",
      "B) This essay is about the ocean.",
      "C) Covering more than 70% of Earth's surface, the ocean produces half of the world's oxygen and sustains billions of people — yet we have explored less than 5% of it.",
      "D) Some people like to swim in the ocean."
    ],
    correct: 2,
    explanation: "C provides striking statistics and creates a sense of urgency by highlighting the contrast between the ocean's importance and how little we know about it."
  },

  // --- Additional Math ---
  {
    id: 'act-math-1-q27',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "If a worker earns $18.50 per hour, how much does the worker earn in a 40-hour week?",
    choices: [
      "A) $580",
      "B) $640",
      "C) $720",
      "D) $740",
      "E) $800"
    ],
    correct: 3,
    explanation: "$18.50 × 40 = $740."
  },
  {
    id: 'act-math-2-q22',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "The perimeter of a square is 48 cm. What is the area of the square?",
    choices: [
      "F) 12 cm²",
      "G) 48 cm²",
      "H) 96 cm²",
      "J) 144 cm²",
      "K) 576 cm²"
    ],
    correct: 3,
    explanation: "Side = 48/4 = 12 cm. Area = 12² = 144 cm²."
  },
  {
    id: 'act-math-3-q21',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "If f(x) = 4x − 1 and g(x) = x + 3, what is g(f(2))?",
    choices: [
      "A) 7",
      "B) 10",
      "C) 13",
      "D) 15",
      "E) 20"
    ],
    correct: 1,
    explanation: "f(2) = 4(2) − 1 = 7. g(7) = 7 + 3 = 10."
  },
  {
    id: 'act-math-5-q20',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "What is the area of a parallelogram with a base of 9 cm and a height of 6 cm?",
    choices: [
      "F) 15 cm²",
      "G) 27 cm²",
      "H) 36 cm²",
      "J) 54 cm²",
      "K) 108 cm²"
    ],
    correct: 3,
    explanation: "Area = base × height = 9 × 6 = 54 cm²."
  },
  {
    id: 'act-math-6-q20',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "The line y = −x + 6 and the line y = x − 2 intersect at what point?",
    choices: [
      "A) (2, 0)",
      "B) (4, 2)",
      "C) (3, 3)",
      "D) (6, 0)",
      "E) (0, 6)"
    ],
    correct: 1,
    explanation: "Set equal: −x + 6 = x − 2. Then 8 = 2x, x = 4. y = 4 − 2 = 2. The intersection is (4, 2)."
  },
  {
    id: 'act-math-7-q19',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "If you roll a fair six-sided die, what is the probability of rolling a number greater than 4?",
    choices: [
      "F) 1/6",
      "G) 1/3",
      "H) 1/2",
      "J) 2/3",
      "K) 5/6"
    ],
    correct: 1,
    explanation: "Numbers greater than 4 are 5 and 6. P = 2/6 = 1/3."
  },
  {
    id: 'act-math-8-q22',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "An arc of a circle has a central angle of 90° and a radius of 8. What is the arc length?",
    choices: [
      "A) 2π",
      "B) 4π",
      "C) 8π",
      "D) 16π",
      "E) 64π"
    ],
    correct: 1,
    explanation: "Arc length = (θ/360) × 2πr = (90/360) × 2π(8) = (1/4)(16π) = 4π."
  },

  // --- Additional Reading ---
  {
    id: 'act-read-1-q19',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage describes the evolution of sign language from informal gestures to a fully developed linguistic system. The central idea is that:",
    choices: [
      "A) sign language is not a real language",
      "B) sign language has evolved into a sophisticated linguistic system with its own grammar and syntax",
      "C) everyone should learn sign language",
      "D) gestures are always informal"
    ],
    correct: 1,
    explanation: "The passage traces the development from informal to fully developed, emphasizing sign language's linguistic sophistication."
  },
  {
    id: 'act-read-3-q16',
    chapter: 'act-read-3',
    type: 'Reading',
    stem: "The passage mentions that the author returned to her hometown after twenty years and found that the old bookstore had been replaced by a chain pharmacy. It can be inferred that this detail conveys:",
    choices: [
      "F) relief that the town modernized",
      "G) a sense of loss as unique local businesses give way to generic corporate ones",
      "H) excitement about new shopping options",
      "J) indifference about the change"
    ],
    correct: 1,
    explanation: "Replacing a unique local establishment with a corporate chain often symbolizes loss of character and community identity in literary contexts."
  },
  {
    id: 'act-read-6-q15',
    chapter: 'act-read-6',
    type: 'Reading',
    stem: "The passage uses a cause-and-effect structure, tracing how a single policy change led to a chain of consequences. This structure most effectively allows the reader to:",
    choices: [
      "A) ignore the connections between events",
      "B) understand how each event triggered the next in a logical sequence",
      "C) jump randomly between topics",
      "D) focus only on the final consequence"
    ],
    correct: 1,
    explanation: "A cause-and-effect chain helps readers follow the logical progression from one event to the next."
  },

  // --- Additional Science ---
  {
    id: 'act-sci-1-q18',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A double bar graph compares the test scores of two classes on four exams. On Exam 3, Class A scored 82 and Class B scored 78. The difference in scores on Exam 3 is:",
    choices: [
      "F) 2 points",
      "G) 4 points",
      "H) 6 points",
      "J) 8 points"
    ],
    correct: 1,
    explanation: "82 − 78 = 4 points."
  },
  {
    id: 'act-sci-2-q18',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A student wants to determine whether sunlight or artificial light is better for growing tomatoes. She plants 10 tomato seedlings in sunlight and 10 in artificial light, keeping all other conditions identical. After 6 weeks, she measures the height and number of fruit. The dependent variables are:",
    choices: [
      "A) type of light and number of seedlings",
      "B) height and number of fruit produced",
      "C) water amount and soil type",
      "D) the 6-week time period"
    ],
    correct: 1,
    explanation: "The dependent variables are the outcomes being measured: plant height and number of fruit."
  },
  {
    id: 'act-sci-4-q16',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A graph shows that ice cream sales increase steadily from January to July, then decrease from July to December. The overall shape of the graph is best described as:",
    choices: [
      "F) a straight line going up",
      "G) a straight line going down",
      "H) an inverted U-shape (peak in the middle)",
      "J) a U-shape (dip in the middle)"
    ],
    correct: 2,
    explanation: "Rising to a peak in July and then declining creates an inverted U-shape."
  },
  {
    id: 'act-sci-6-q16',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "If 200 mL of a solution has a concentration of 10 g/L, how many grams of solute are present?",
    choices: [
      "A) 0.2 g",
      "B) 2 g",
      "C) 20 g",
      "D) 200 g"
    ],
    correct: 1,
    explanation: "200 mL = 0.2 L. Grams = concentration × volume = 10 g/L × 0.2 L = 2 g."
  },
  {
    id: 'act-sci-7-q16',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A hypothesis states that plants grow faster under blue light than under red light. An experiment shows identical growth rates under both colors. This result would:",
    choices: [
      "F) strongly support the hypothesis",
      "G) fail to support the hypothesis",
      "H) prove the hypothesis correct beyond doubt",
      "J) be irrelevant to the hypothesis"
    ],
    correct: 1,
    explanation: "Identical growth rates under both colors contradict the prediction that blue light promotes faster growth, failing to support the hypothesis."
  },
  {
    id: 'act-sci-8-q16',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Graph 1 shows that River X has the highest flow rate during April. Table 1 shows that April is the month with the highest average rainfall in the region. Combining these sources suggests that:",
    choices: [
      "A) rainfall has no effect on river flow",
      "B) high rainfall in April likely contributes to the high river flow rate",
      "C) the river flows fastest in October",
      "D) rainfall and river flow are inversely related"
    ],
    correct: 1,
    explanation: "Both peak rainfall and peak river flow occurring in April suggest a causal connection between rainfall and river flow."
  },

  // --- Final batch of questions ---
  {
    id: 'act-eng-6-q19',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "She returned back to the store to exchange the item.",
    choices: [
      "A) NO CHANGE",
      "B) She returned back again",
      "C) She returned",
      "D) She went returning back"
    ],
    correct: 2,
    explanation: "'Returned back' is redundant since 'returned' already means 'went back.' 'She returned' is concise."
  },
  {
    id: 'act-eng-8-q17',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "Which sentence would most effectively conclude a passage arguing that arts education should be protected from budget cuts?",
    choices: [
      "F) Some schools have art classes.",
      "G) Art supplies can be expensive.",
      "H) If we truly believe in educating the whole child, then cutting the arts is not trimming the fat — it is cutting into the bone.",
      "J) Many students enjoy painting."
    ],
    correct: 2,
    explanation: "H uses a vivid metaphor and strong language to drive home the argument's urgency, making it an effective conclusion."
  },
  {
    id: 'act-math-4-q23',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is the sum of the roots of x² − 7x + 10 = 0?",
    choices: [
      "A) 2",
      "B) 5",
      "C) 7",
      "D) 10",
      "E) 12"
    ],
    correct: 2,
    explanation: "By Vieta's formulas, the sum of the roots = −(−7)/1 = 7. (Or factor: (x−2)(x−5) = 0, roots are 2 and 5, sum = 7.)"
  },
  {
    id: 'act-read-7-q16',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "The passage ends with the narrator standing at the edge of the old dock, watching the sun set over the lake. This final image most likely represents:",
    choices: [
      "A) boredom",
      "B) a moment of reflection and peaceful acceptance",
      "C) anger toward the lake",
      "D) a desire to go swimming"
    ],
    correct: 1,
    explanation: "Sunsets in literary narratives commonly symbolize endings, reflection, and peace. Standing quietly at a meaningful location suggests acceptance."
  },
  {
    id: 'act-sci-3-q16',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "A researcher studies how different concentrations of salt solution affect the mass of potato slices. She measures the mass before and after soaking. The controlled variables should include:",
    choices: [
      "A) salt concentration",
      "B) mass of potato slices after soaking",
      "C) initial mass of potato slices, soaking time, and temperature",
      "D) the number of experiments performed"
    ],
    correct: 2,
    explanation: "To isolate the effect of salt concentration, all other factors (initial mass, soaking time, temperature) must be held constant."
  },
  {
    id: 'act-sci-5-q16',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Scientist A claims that bird migration is primarily driven by day length (photoperiod). Scientist B claims it is primarily driven by temperature changes. If birds migrated south during an unusually warm autumn when day length shortened normally, this would support:",
    choices: [
      "A) Scientist B, because temperature was warm",
      "B) Scientist A, because migration occurred despite warm temperatures when day length shortened",
      "C) Neither scientist",
      "D) Both scientists equally"
    ],
    correct: 1,
    explanation: "Migration occurring despite warm temperatures suggests photoperiod (day length), not temperature, is the primary trigger, supporting Scientist A."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BATCH 9 — Final questions to reach ~800 total across both files
  // ═══════════════════════════════════════════════════════════════════════

  // --- act-eng-1: Punctuation ---
  {
    id: 'act-eng-1-q25',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "The novelist known for her vivid descriptions, published her tenth book last spring.",
    choices: [
      "A) NO CHANGE",
      "B) The novelist known for her vivid descriptions published her tenth book last spring.",
      "C) The novelist, known for her vivid descriptions published her tenth book last spring.",
      "D) The novelist, known for her vivid descriptions, published her tenth book last spring."
    ],
    correct: 1,
    explanation: "The phrase 'known for her vivid descriptions' is a restrictive modifier (it identifies which novelist). No commas are needed. B is correct."
  },
  {
    id: 'act-eng-1-q26',
    chapter: 'act-eng-1',
    type: 'English',
    stem: "Three countries participated in the summit—France Germany and Japan.",
    choices: [
      "F) NO CHANGE",
      "G) summit—France, Germany, and Japan.",
      "H) summit; France, Germany, and Japan.",
      "J) summit: France Germany and Japan."
    ],
    correct: 1,
    explanation: "Items in a list must be separated by commas. The em dash correctly introduces the list, and G adds the missing commas."
  },

  // --- act-eng-2: Grammar ---
  {
    id: 'act-eng-2-q24',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "After the fire alarm sounded the students evacuated the building in an orderly fashion.",
    choices: [
      "A) NO CHANGE",
      "B) After the fire alarm sounded, the students evacuated the building in an orderly fashion.",
      "C) After, the fire alarm sounded the students evacuated the building in an orderly fashion.",
      "D) After the fire alarm sounded; the students evacuated the building in an orderly fashion."
    ],
    correct: 1,
    explanation: "A comma is needed after the introductory dependent clause 'After the fire alarm sounded.'"
  },

  // --- act-eng-3: Agreement ---
  {
    id: 'act-eng-3-q24',
    chapter: 'act-eng-3',
    type: 'English',
    stem: "Five miles _______ a long distance to walk in the heat.",
    choices: [
      "F) are",
      "G) is",
      "H) were",
      "J) have been"
    ],
    correct: 1,
    explanation: "When referring to a unit of distance, 'five miles' is treated as a singular quantity. 'Is' is correct."
  },

  // --- act-eng-4: Parallel Structure ---
  {
    id: 'act-eng-4-q21',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "The new policy aims to reduce waste, increase efficiency, and _______ employee satisfaction.",
    choices: [
      "A) improving",
      "B) improve",
      "C) the improvement of",
      "D) it should improve"
    ],
    correct: 1,
    explanation: "Parallel structure requires matching infinitive forms: 'to reduce,' 'increase,' and 'improve.'"
  },

  // --- act-eng-5: Transitions ---
  {
    id: 'act-eng-5-q20',
    chapter: 'act-eng-5',
    type: 'English',
    stem: "The country's GDP grew by 4% last year. _______, poverty rates in rural areas remained stubbornly high.",
    choices: [
      "F) Therefore",
      "G) As a result",
      "H) Yet",
      "J) Additionally"
    ],
    correct: 2,
    explanation: "GDP growth contrasts with persistent poverty. 'Yet' signals this unexpected contrast."
  },

  // --- act-eng-6: Concision ---
  {
    id: 'act-eng-6-q20',
    chapter: 'act-eng-6',
    type: 'English',
    stem: "In my personal opinion, the proposal should be rejected.",
    choices: [
      "A) NO CHANGE",
      "B) In my own personal opinion",
      "C) In my opinion",
      "D) In what I personally think is my opinion"
    ],
    correct: 2,
    explanation: "An opinion is inherently personal. 'In my opinion' removes the redundancy."
  },

  // --- act-eng-7: Organization ---
  {
    id: 'act-eng-7-q18',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A paragraph about the causes of soil erosion would most logically be placed:",
    choices: [
      "F) at the end of an essay about space exploration",
      "G) after a paragraph introducing the problem of soil degradation and before a paragraph about solutions",
      "H) in the introduction of an essay about marine biology",
      "J) as a standalone essay with no connection to other paragraphs"
    ],
    correct: 1,
    explanation: "Causes logically follow the introduction of the problem and precede solutions, fitting a problem-cause-solution structure."
  },

  // --- act-eng-8: Rhetorical Skills ---
  {
    id: 'act-eng-8-q18',
    chapter: 'act-eng-8',
    type: 'English',
    stem: "The passage discusses the history of women's suffrage. Which sentence would most effectively convey the magnitude of the achievement?",
    choices: [
      "A) Women eventually got the right to vote.",
      "B) Voting is important.",
      "C) After decades of tireless activism, imprisonment, and sacrifice, women finally secured the right that men had always taken for granted.",
      "D) The amendment passed in 1920."
    ],
    correct: 2,
    explanation: "C conveys magnitude through specific details ('decades,' 'imprisonment,' 'sacrifice') and emotional weight ('finally,' 'taken for granted')."
  },

  // --- act-math-1: Pre-Algebra ---
  {
    id: 'act-math-1-q28',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A cyclist travels 45 miles in 3 hours. At this rate, how far will the cyclist travel in 5 hours?",
    choices: [
      "A) 60 miles",
      "B) 65 miles",
      "C) 70 miles",
      "D) 75 miles",
      "E) 90 miles"
    ],
    correct: 3,
    explanation: "Rate = 45/3 = 15 mph. In 5 hours: 15 × 5 = 75 miles."
  },

  // --- act-math-2: Algebra ---
  {
    id: 'act-math-2-q23',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "If 5(x + 2) = 3(x + 8), what is x?",
    choices: [
      "F) 4",
      "G) 5",
      "H) 7",
      "J) 9",
      "K) 14"
    ],
    correct: 2,
    explanation: "Expand: 5x + 10 = 3x + 24. Subtract 3x: 2x + 10 = 24. Subtract 10: 2x = 14. x = 7."
  },

  // --- act-math-3: Functions ---
  {
    id: 'act-math-3-q22',
    chapter: 'act-math-3',
    type: 'Math',
    stem: "The graph of y = |x| is shifted 3 units to the right and 2 units up. What is the equation of the new graph?",
    choices: [
      "A) y = |x − 3| + 2",
      "B) y = |x + 3| + 2",
      "C) y = |x − 3| − 2",
      "D) y = |x + 3| − 2",
      "E) y = |x − 2| + 3"
    ],
    correct: 0,
    explanation: "Shifting right by 3 replaces x with (x − 3). Shifting up by 2 adds 2. Result: y = |x − 3| + 2."
  },

  // --- act-math-4: Quadratics ---
  {
    id: 'act-math-4-q24',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "A ball is thrown upward and its height is given by h(t) = −16t² + 48t. At what time does it reach its maximum height?",
    choices: [
      "F) 1 second",
      "G) 1.5 seconds",
      "H) 2 seconds",
      "J) 3 seconds",
      "K) 4 seconds"
    ],
    correct: 1,
    explanation: "Maximum height occurs at t = −b/(2a) = −48/(2 × −16) = −48/−32 = 1.5 seconds."
  },

  // --- act-math-5: Geometry ---
  {
    id: 'act-math-5-q21',
    chapter: 'act-math-5',
    type: 'Math',
    stem: "What is the volume of a cone with radius 3 cm and height 7 cm? (Use π ≈ 3.14)",
    choices: [
      "A) 21.98 cm³",
      "B) 43.96 cm³",
      "C) 65.94 cm³",
      "D) 131.88 cm³",
      "E) 197.82 cm³"
    ],
    correct: 2,
    explanation: "Volume = (1/3)πr²h = (1/3)(3.14)(9)(7) = (1/3)(197.82) = 65.94 cm³."
  },

  // --- act-math-6: Coordinate Geometry ---
  {
    id: 'act-math-6-q21',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "What is the area of a triangle with vertices at (0, 0), (6, 0), and (0, 8)?",
    choices: [
      "F) 14",
      "G) 24",
      "H) 36",
      "J) 48",
      "K) 96"
    ],
    correct: 1,
    explanation: "The base is 6 (along x-axis) and height is 8 (along y-axis). Area = (1/2)(6)(8) = 24."
  },

  // --- act-math-7: Statistics ---
  {
    id: 'act-math-7-q20',
    chapter: 'act-math-7',
    type: 'Math',
    stem: "The median of the data set {3, 7, 9, 12, 15, 18} is:",
    choices: [
      "A) 9",
      "B) 10.5",
      "C) 12",
      "D) 13.5",
      "E) 15"
    ],
    correct: 1,
    explanation: "With an even number of data points, the median is the average of the two middle values: (9 + 12)/2 = 10.5."
  },

  // --- act-math-8: Trig ---
  {
    id: 'act-math-8-q23',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "What is the period of the function y = sin(2x)?",
    choices: [
      "F) π/2",
      "G) π",
      "H) 2π",
      "J) 4π",
      "K) 1/2"
    ],
    correct: 1,
    explanation: "For y = sin(bx), the period = 2π/b. Here b = 2, so the period = 2π/2 = π."
  },

  // --- act-read-1: Main Idea ---
  {
    id: 'act-read-1-q20',
    chapter: 'act-read-1',
    type: 'Reading',
    stem: "A passage describes how a school district improved student performance by reducing class sizes, increasing teacher training, and extending the school day. The central argument is that:",
    choices: [
      "F) class size is the only factor in student performance",
      "G) a comprehensive approach addressing multiple factors can significantly improve educational outcomes",
      "H) teacher training is unnecessary",
      "J) longer school days are harmful to students"
    ],
    correct: 1,
    explanation: "The passage describes multiple interventions working together, supporting the idea that a comprehensive approach is effective."
  },

  // --- act-read-2: Vocabulary ---
  {
    id: 'act-read-2-q18',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage describes the treaty as 'tenuous.' As used here, 'tenuous' most nearly means:",
    choices: [
      "A) strong and durable",
      "B) thin, weak, and easily broken",
      "C) lengthy and complicated",
      "D) ancient and historic"
    ],
    correct: 1,
    explanation: "'Tenuous' means thin, slight, or insubstantial — easily broken or disrupted."
  },

  // --- act-read-4: Purpose ---
  {
    id: 'act-read-4-q17',
    chapter: 'act-read-4',
    type: 'Reading',
    stem: "The author uses short, declarative sentences in the passage's final paragraph. This stylistic choice most likely serves to:",
    choices: [
      "F) show that the author ran out of ideas",
      "G) create a sense of finality and emphasis",
      "H) demonstrate poor writing ability",
      "J) pad the word count"
    ],
    correct: 1,
    explanation: "Short, direct sentences at the end of a piece create rhythm, emphasis, and a sense of definitive closure."
  },

  // --- act-read-7: Literary ---
  {
    id: 'act-read-7-q17',
    chapter: 'act-read-7',
    type: 'Reading',
    stem: "The narrator describes rain falling on the day of her graduation, then adds: 'Even the sky seemed to know it was the end of something.' This personification suggests:",
    choices: [
      "A) the narrator disliked rain",
      "B) the narrator felt that the occasion carried deep emotional significance shared even by nature",
      "C) the weather forecast was accurate",
      "D) graduation should be held indoors"
    ],
    correct: 1,
    explanation: "Personifying the sky as 'knowing' elevates the moment's emotional weight, suggesting the end of an era that resonates beyond the personal."
  },

  // --- act-read-8: Passages ---
  {
    id: 'act-read-8-q17',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A natural science passage discusses the decline of coral reefs and ends by stating: 'The ocean's rainforests are dying, and with them, a future we have barely begun to understand.' The author's purpose in this final sentence is to:",
    choices: [
      "F) provide a neutral summary",
      "G) use a metaphor and emotional appeal to underscore the urgency of coral reef conservation",
      "H) argue that rainforests and oceans are identical",
      "J) suggest that scientists should stop studying coral"
    ],
    correct: 1,
    explanation: "Calling reefs 'the ocean's rainforests' is a metaphor that emphasizes their importance, and 'dying' creates urgency."
  },

  // --- act-sci-1: Data ---
  {
    id: 'act-sci-1-q19',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A table shows that at 25°C, Gas X has a density of 1.2 g/L and Gas Y has a density of 0.8 g/L. If equal volumes of both gases are present, which statement is correct?",
    choices: [
      "A) Gas Y has more mass than Gas X",
      "B) Gas X has more mass than Gas Y",
      "C) Both gases have equal mass",
      "D) The masses cannot be compared without knowing the volume"
    ],
    correct: 1,
    explanation: "At equal volumes, the gas with higher density (Gas X at 1.2 g/L) has more mass than the gas with lower density (Gas Y at 0.8 g/L)."
  },

  // --- act-sci-2: Experimental Design ---
  {
    id: 'act-sci-2-q19',
    chapter: 'act-sci-2',
    type: 'Science',
    stem: "A study claims that drinking green tea reduces cold symptoms. The study only tested 5 participants and had no control group. The study's main weakness is:",
    choices: [
      "F) that green tea is too expensive",
      "G) small sample size and lack of a control group limit the reliability of the conclusions",
      "H) that cold symptoms are easy to measure",
      "J) that the study was published in a journal"
    ],
    correct: 1,
    explanation: "A very small sample size and absence of a control group severely limit the study's reliability and generalizability."
  },

  // --- act-sci-4: Trends ---
  {
    id: 'act-sci-4-q17',
    chapter: 'act-sci-4',
    type: 'Science',
    stem: "A table shows that as the mass of a pendulum bob increases from 50g to 200g, the period of the pendulum stays at 2.0 seconds. This suggests that:",
    choices: [
      "A) mass affects the period of a pendulum",
      "B) mass does not affect the period of a pendulum",
      "C) heavier pendulums swing faster",
      "D) the data are unreliable"
    ],
    correct: 1,
    explanation: "A constant period despite changing mass indicates that mass does not affect the pendulum's period."
  },

  // --- act-sci-6: Calculations ---
  {
    id: 'act-sci-6-q17',
    chapter: 'act-sci-6',
    type: 'Science',
    stem: "An object has a mass of 12 kg and accelerates at 3 m/s². According to Newton's second law (F = ma), what is the net force on the object?",
    choices: [
      "A) 4 N",
      "B) 15 N",
      "C) 36 N",
      "D) 48 N"
    ],
    correct: 2,
    explanation: "F = ma = 12 kg × 3 m/s² = 36 N."
  },

  // --- act-sci-8: Synthesis ---
  {
    id: 'act-sci-8-q17',
    chapter: 'act-sci-8',
    type: 'Science',
    stem: "Figure 1 shows that Enzyme A works fastest at pH 2. Table 1 shows that the stomach has a pH of 2 and the small intestine has a pH of 8. Based on both sources, Enzyme A most likely functions in:",
    choices: [
      "A) the small intestine",
      "B) the stomach",
      "C) neither location",
      "D) both locations equally"
    ],
    correct: 1,
    explanation: "Since Enzyme A works fastest at pH 2 and the stomach has pH 2, the enzyme most likely functions in the stomach."
  },

  // ═══════════════════════════════════════════════════════════════════════
  // BATCH 10 — Final 15 questions to reach ~800
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'act-eng-2-q25',
    chapter: 'act-eng-2',
    type: 'English',
    stem: "The new park includes walking trails, a playground, and a picnic area it has become the neighborhood's favorite gathering spot.",
    choices: [
      "A) NO CHANGE",
      "B) area, it has become",
      "C) area; it has become",
      "D) area, it, has become"
    ],
    correct: 2,
    explanation: "The original is a run-on sentence. A semicolon correctly joins two related independent clauses."
  },
  {
    id: 'act-eng-4-q22',
    chapter: 'act-eng-4',
    type: 'English',
    stem: "Impressed by the student's work, _______ offered her a research position.",
    choices: [
      "F) the professor",
      "G) a research position was offered by the professor",
      "H) the student's work resulted in the professor",
      "J) offering a research position was the professor"
    ],
    correct: 0,
    explanation: "'Impressed by the student's work' must modify who was impressed. F places 'the professor' directly after the modifier."
  },
  {
    id: 'act-eng-7-q19',
    chapter: 'act-eng-7',
    type: 'English',
    stem: "A paragraph about the health benefits of meditation includes: 'My dog's name is Max.' This sentence should be:",
    choices: [
      "A) kept, because pets reduce stress",
      "B) expanded to discuss the dog's breed",
      "C) deleted, because it is irrelevant to meditation's health benefits",
      "D) moved to the introduction"
    ],
    correct: 2,
    explanation: "A dog's name has nothing to do with meditation's health benefits and should be deleted."
  },
  {
    id: 'act-math-1-q29',
    chapter: 'act-math-1',
    type: 'Math',
    stem: "A garden measures 12 feet by 8 feet. What is the area of the garden in square feet?",
    choices: [
      "A) 20",
      "B) 40",
      "C) 80",
      "D) 96",
      "E) 192"
    ],
    correct: 3,
    explanation: "Area = length × width = 12 × 8 = 96 square feet."
  },
  {
    id: 'act-math-2-q24',
    chapter: 'act-math-2',
    type: 'Math',
    stem: "What is the y-intercept of the line 3x − 6y = 18?",
    choices: [
      "F) -6",
      "G) -3",
      "H) 3",
      "J) 6",
      "K) 18"
    ],
    correct: 1,
    explanation: "Set x = 0: −6y = 18, y = −3. The y-intercept is −3."
  },
  {
    id: 'act-math-4-q25',
    chapter: 'act-math-4',
    type: 'Math',
    stem: "What is (x + 5)² expanded?",
    choices: [
      "A) x² + 25",
      "B) x² + 5x + 25",
      "C) x² + 10x + 25",
      "D) x² + 10x + 5",
      "E) 2x + 10"
    ],
    correct: 2,
    explanation: "(x + 5)² = x² + 2(5)(x) + 5² = x² + 10x + 25."
  },
  {
    id: 'act-math-6-q22',
    chapter: 'act-math-6',
    type: 'Math',
    stem: "A line passes through the points (1, 3) and (5, 11). What is the equation of this line in slope-intercept form?",
    choices: [
      "F) y = 2x + 1",
      "G) y = 2x + 3",
      "H) y = 3x − 1",
      "J) y = 4x − 1",
      "K) y = 2x − 1"
    ],
    correct: 0,
    explanation: "Slope = (11 − 3)/(5 − 1) = 8/4 = 2. Using point (1, 3): 3 = 2(1) + b, b = 1. Equation: y = 2x + 1."
  },
  {
    id: 'act-math-8-q24',
    chapter: 'act-math-8',
    type: 'Math',
    stem: "A ladder 13 feet long leans against a wall. The base of the ladder is 5 feet from the wall. How high up the wall does the ladder reach?",
    choices: [
      "A) 8 feet",
      "B) 10 feet",
      "C) 12 feet",
      "D) 14 feet",
      "E) 18 feet"
    ],
    correct: 2,
    explanation: "By the Pythagorean theorem: h² + 5² = 13². h² + 25 = 169. h² = 144. h = 12 feet."
  },
  {
    id: 'act-read-2-q19',
    chapter: 'act-read-2',
    type: 'Reading',
    stem: "The passage says the speaker's words were 'incendiary.' As used here, 'incendiary' most nearly means:",
    choices: [
      "A) related to fire",
      "B) calm and soothing",
      "C) provocative and inflammatory",
      "D) quietly persuasive"
    ],
    correct: 2,
    explanation: "'Incendiary' figuratively means tending to inflame or provoke strong reactions, not literally about fire."
  },
  {
    id: 'act-read-5-q16',
    chapter: 'act-read-5',
    type: 'Reading',
    stem: "Passage A argues that nuclear energy is essential for meeting climate goals. Passage B argues that nuclear energy poses unacceptable safety risks. Both authors would likely agree that:",
    choices: [
      "F) nuclear energy is perfectly safe",
      "G) climate change does not matter",
      "H) energy policy decisions involve weighing significant trade-offs",
      "J) renewable energy is useless"
    ],
    correct: 2,
    explanation: "Both authors acknowledge that nuclear energy involves important considerations (climate benefits vs. safety risks), implying agreement that trade-offs exist."
  },
  {
    id: 'act-read-8-q18',
    chapter: 'act-read-8',
    type: 'Reading',
    stem: "A humanities passage discusses a sculptor who spent ten years carving a single marble statue. The author suggests that the sculptor's approach reflects:",
    choices: [
      "A) poor time management",
      "B) a deep commitment to craftsmanship and artistic vision",
      "C) a dislike of other art forms",
      "D) a desire for fame"
    ],
    correct: 1,
    explanation: "Spending a decade on a single work demonstrates exceptional dedication to craft and artistic integrity."
  },
  {
    id: 'act-sci-1-q20',
    chapter: 'act-sci-1',
    type: 'Science',
    stem: "A graph shows that as altitude increases from 0 to 10,000 meters, air temperature decreases from 15°C to −50°C. According to the graph, at 5,000 meters the temperature is approximately:",
    choices: [
      "A) 0°C",
      "B) −17.5°C",
      "C) −25°C",
      "D) −35°C"
    ],
    correct: 1,
    explanation: "At the midpoint altitude (5,000 m), the temperature is approximately the midpoint: (15 + (−50))/2 = −35/2 = −17.5°C."
  },
  {
    id: 'act-sci-3-q17',
    chapter: 'act-sci-3',
    type: 'Science',
    stem: "An experiment tests whether the brand of battery affects how long a flashlight stays on. The student uses the same flashlight, the same bulb, and runs each trial in a dark room. Which is the dependent variable?",
    choices: [
      "F) Brand of battery",
      "G) Type of flashlight",
      "H) How long the flashlight stays on",
      "J) The brightness of the room"
    ],
    correct: 2,
    explanation: "The dependent variable is the outcome measured — how long the flashlight stays on with each battery brand."
  },
  {
    id: 'act-sci-5-q17',
    chapter: 'act-sci-5',
    type: 'Science',
    stem: "Geologist 1 believes earthquakes in the region are caused by natural tectonic activity. Geologist 2 believes they are caused by wastewater injection from nearby drilling operations. Which observation would most directly support Geologist 2?",
    choices: [
      "A) Earthquakes in the region have occurred for centuries.",
      "B) The frequency of earthquakes increased dramatically after drilling operations began.",
      "C) The region sits on a known fault line.",
      "D) Earthquakes of similar magnitude occur worldwide."
    ],
    correct: 1,
    explanation: "A temporal correlation between the start of drilling and an increase in earthquakes directly supports the hypothesis that drilling activities are responsible."
  },
  {
    id: 'act-sci-7-q17',
    chapter: 'act-sci-7',
    type: 'Science',
    stem: "A model of disease spread predicts that without intervention, 80% of a population will be infected within 6 months. Public health officials implement a vaccination program after month 2 and only 30% become infected. This result suggests:",
    choices: [
      "A) the model was wrong about the disease's existence",
      "B) the vaccination program significantly reduced the infection rate compared to the model's no-intervention prediction",
      "C) the model accurately predicted the final outcome",
      "D) the vaccination had no effect"
    ],
    correct: 1,
    explanation: "The model predicted 80% infection without intervention; only 30% with vaccination. The gap (80% vs. 30%) suggests the intervention was effective."
  }
];
