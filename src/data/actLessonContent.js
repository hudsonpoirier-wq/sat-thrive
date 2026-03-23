// ACT Lesson Content — slide decks for the AI teacher / LessonPlayer
// Each module maps to { title, slides: [{ type, title, content, highlight }] }

const ACT_LESSON_CONTENT = {

  /* ═══════════════════════════════════════════════════════════════
     ACT ENGLISH (act-eng-*)
     ═══════════════════════════════════════════════════════════════ */

  'act-eng-1': {
    title: 'Punctuation & Pauses',
    slides: [
      {
        type: 'intro',
        title: 'Punctuation on the ACT English Section',
        content: [
          'ACT English punctuation questions are about sentence control. Every comma, semicolon, colon, and period has a specific job.',
          'Most punctuation errors on the ACT involve comma splices, unnecessary commas, and misused colons or semicolons.',
          'If you can determine whether each side of the punctuation is a complete sentence, you can answer almost every punctuation question.',
        ],
        highlight: 'Decide whether each side is a complete thought — the right punctuation follows from that.',
      },
      {
        type: 'strategy',
        title: 'The Complete Thought Test',
        content: [
          'Look at the words on each side of the punctuation. Can each side stand alone as a sentence?',
          'If BOTH sides are complete sentences, you need a period, semicolon, or comma plus a coordinating conjunction (and, but, so, for, nor, or, yet).',
          'If only ONE side is complete, a comma or no punctuation usually works. A semicolon would be wrong.',
        ],
      },
      {
        type: 'strategy',
        title: 'Colon Rules',
        content: [
          'A colon requires a complete sentence BEFORE it. What comes after can be a list, an explanation, or another sentence.',
          'Do NOT put a colon after "such as," "including," or "like." These words already introduce what follows.',
          'Test it: cover everything after the colon. If the remaining words form a complete sentence, the colon can work.',
        ],
      },
      {
        type: 'strategy',
        title: 'When to Remove the Comma',
        content: [
          'The ACT loves testing unnecessary commas. If there is no grammatical reason for a comma, remove it.',
          'Do NOT put a comma between a subject and its verb: "The tall student, ran quickly" is wrong.',
          'Do NOT put a comma before or after a preposition connecting to its object: "She went to, the store" is wrong.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: "NO CHANGE" Is Right About 25% of the Time',
        content: 'Many students are afraid to pick "NO CHANGE," thinking the question must be testing an error. But about one-quarter of ACT English answers are NO CHANGE. If the original sounds right and you cannot find a grammar rule it breaks, trust it.',
        highlight: 'Don\'t change what isn\'t broken.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Test whether each side of the punctuation is a complete sentence.',
          'A colon needs a complete sentence before it. A semicolon separates two complete sentences.',
          'Remove unnecessary commas — especially between subjects and verbs.',
          'NO CHANGE is correct about 25% of the time. Trust it if no rule is broken.',
        ],
      },
    ],
  },

  'act-eng-2': {
    title: 'Sentence Boundaries & Run-ons',
    slides: [
      {
        type: 'intro',
        title: 'Why the ACT Loves Boundary Questions',
        content: [
          'Sentence boundary questions test whether you can see where one complete idea ends and the next begins.',
          'The two main errors are run-on sentences (two complete sentences joined without proper punctuation) and fragments (incomplete sentences standing alone).',
          'These questions are high-frequency on the ACT and very predictable once you know the patterns.',
        ],
        highlight: 'Find the subject and verb of each clause — that is the whole skill.',
      },
      {
        type: 'strategy',
        title: 'Spotting Run-ons and Comma Splices',
        content: [
          'A run-on joins two complete sentences with nothing between them: "She ran he walked."',
          'A comma splice joins two complete sentences with just a comma: "She ran, he walked."',
          'Fix these with a period, semicolon, comma + conjunction, or by making one side dependent.',
        ],
      },
      {
        type: 'strategy',
        title: 'Spotting Fragments',
        content: [
          'A fragment is missing a subject, a main verb, or a complete thought.',
          'Common fragment starters: "Because," "Although," "While," "Which," "Running through the park."',
          'These dependent clauses need to attach to a main clause to form a complete sentence.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Read It Out Loud',
        content: 'When you read a sentence out loud and your voice naturally drops or stops, that is where the sentence boundary belongs. Your ear is surprisingly accurate for detecting run-ons and fragments, especially when you read at normal speed rather than skimming.',
        highlight: 'Your ear can detect boundary errors — read at normal pace.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Run-ons and comma splices join complete sentences incorrectly.',
          'Fragments are missing a subject, verb, or complete thought.',
          'Fix run-ons with a period, semicolon, or comma + conjunction.',
          'Fix fragments by attaching them to a main clause.',
        ],
      },
    ],
  },

  'act-eng-3': {
    title: 'Agreement, Verb Form & Pronouns',
    slides: [
      {
        type: 'intro',
        title: 'Agreement Errors Are Sneaky',
        content: [
          'Agreement questions test whether subjects match verbs in number and whether pronouns clearly refer to the right noun.',
          'The ACT makes these tricky by placing long phrases between the subject and verb or by using ambiguous pronouns.',
          'If you can find the true subject and the noun a pronoun replaces, you can get every agreement question right.',
        ],
        highlight: 'Find the true subject. Ignore everything between it and the verb.',
      },
      {
        type: 'strategy',
        title: 'Subject-Verb Agreement Tricks',
        content: [
          'Cross out prepositional phrases mentally: "The collection OF old maps IS stored" — the subject is "collection" (singular), not "maps."',
          'Words like "each," "every," "neither," "either" are always singular.',
          'Inverted sentences trick you: "Among the trees STANDS a cabin." The subject is "cabin," not "trees."',
        ],
      },
      {
        type: 'strategy',
        title: 'Pronoun Clarity',
        content: [
          'Every pronoun must clearly refer to ONE specific noun. If "he" could refer to two different men, the pronoun is ambiguous.',
          'Match pronouns in number: "Each student should bring THEIR book" is incorrect on the ACT. "Each" is singular, so use "his or her."',
          'Watch for pronoun shifts: if the passage uses "one," don\'t switch to "you" or "they" mid-sentence.',
        ],
      },
      {
        type: 'strategy',
        title: 'Verb Tense Consistency',
        content: [
          'The ACT tests whether verb tenses are consistent within a passage.',
          'If the passage is in past tense, don\'t randomly switch to present unless there is a logical reason (like describing a current fact).',
          'Look at the surrounding sentences to determine the correct tense.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The "Cover and Match" Technique',
        content: 'Cover everything between the subject and the verb with your hand. Read just the subject and the verb together. "The group... has" or "The group... have"? Your ear will immediately tell you which is right when the distracting phrases are gone.',
        highlight: 'Cover the middle, hear the match.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Cross out interrupting phrases to find the true subject.',
          'Pronouns must clearly refer to one noun and match in number.',
          'Keep verb tenses consistent with the surrounding passage.',
          'Cover the middle of the sentence to hear the subject-verb match.',
        ],
      },
    ],
  },

  'act-eng-4': {
    title: 'Modifiers & Parallel Structure',
    slides: [
      {
        type: 'intro',
        title: 'Modifiers and Parallelism',
        content: [
          'Modifier questions test whether descriptive phrases attach to the right word. Parallelism questions test whether list items match in form.',
          'These are two of the most predictable question types on ACT English.',
          'The modifier rule: the noun right after the comma must be the thing being described. The parallelism rule: items in a list must use the same grammatical form.',
        ],
        highlight: 'Modifiers attach to the nearest noun. Lists must be parallel.',
      },
      {
        type: 'strategy',
        title: 'Fixing Dangling Modifiers',
        content: [
          '"Running through the park, the trees looked beautiful." Who is running? Not the trees.',
          'The noun immediately after the comma must be the one doing the action in the opening phrase.',
          'Correct version: "Running through the park, I noticed the beautiful trees."',
        ],
      },
      {
        type: 'strategy',
        title: 'Parallel Structure in Lists',
        content: [
          'Items in a list must all be the same part of speech or structure.',
          'Wrong: "She likes reading, to swim, and cooking." Mixed forms: gerund, infinitive, gerund.',
          'Right: "She likes reading, swimming, and cooking." All gerunds.',
        ],
      },
      {
        type: 'strategy',
        title: 'Parallel Structure in Comparisons',
        content: [
          'When comparing two things, make sure the items being compared have the same structure.',
          'Wrong: "The results of Study A were better than Study B." You are comparing results to a study.',
          'Right: "The results of Study A were better than those of Study B." Now you are comparing results to results.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Read Just the List Items',
        content: 'Pull out just the items in the list and read them one after another. "Reading, swimming, cooking" — all match. "Reading, to swim, cooking" — one does not match. This takes two seconds and catches every parallelism error.',
        highlight: 'Extract the list items and check that they all match.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Modifiers must attach to the noun they describe — check the noun after the comma.',
          'Items in a list must have the same grammatical form.',
          'Comparisons must compare equivalent structures.',
          'Pull out list items and read them alone to check parallelism.',
        ],
      },
    ],
  },

  'act-eng-5': {
    title: 'Word Choice & Concision',
    slides: [
      {
        type: 'intro',
        title: 'The ACT Rewards Clear, Concise Writing',
        content: [
          'When multiple answer choices are grammatically correct, the ACT almost always prefers the shortest, most direct option.',
          'Wordiness, redundancy, and vague language are the main problems these questions test.',
          'The principle is simple: say what you mean in the fewest clear words.',
        ],
        highlight: 'If two choices mean the same thing, pick the shorter one.',
      },
      {
        type: 'strategy',
        title: 'Spotting Redundancy',
        content: [
          'Redundancy means saying the same idea twice: "true fact," "past history," "advance planning."',
          'On the ACT: "The reason is because..." should be "The reason is that..." or just "because..."',
          'If you can remove a word or phrase without changing the meaning, it is redundant.',
        ],
      },
      {
        type: 'strategy',
        title: 'Cutting Filler Phrases',
        content: [
          '"In order to" just means "to." "Due to the fact that" just means "because."',
          '"At this point in time" means "now." "In the event that" means "if."',
          'Replace these inflated phrases with their short equivalents for a cleaner sentence.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The DELETE Option Is Often Right',
        content: 'When the ACT offers "DELETE the underlined portion" or "OMIT," seriously consider it. If the underlined words are redundant with what the rest of the sentence already says, deleting is usually the correct answer.',
        highlight: 'The DELETE or OMIT option is correct more often than students think.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Choose the shortest answer that preserves the meaning.',
          'Eliminate redundancy: don\'t say the same thing twice.',
          'Replace filler phrases with direct language.',
          'Seriously consider the DELETE/OMIT option when it is available.',
        ],
      },
    ],
  },

  'act-eng-6': {
    title: 'Transitions & Logical Flow',
    slides: [
      {
        type: 'intro',
        title: 'Transitions Show How Ideas Connect',
        content: [
          'Transition questions ask you to pick the word or phrase that correctly shows the relationship between two ideas.',
          'The ACT tests whether you understand contrast, cause-and-effect, addition, sequence, and example relationships.',
          'Do NOT pick a transition just because it sounds good. Pick the one that matches the LOGIC.',
        ],
        highlight: 'Name the relationship first, then pick the transition.',
      },
      {
        type: 'strategy',
        title: 'The Four Transition Categories',
        content: [
          'ADDITION: "Furthermore," "Moreover," "In addition," "Also." The second idea adds to the first.',
          'CONTRAST: "However," "Nevertheless," "On the other hand," "Yet." The second idea goes against the first.',
          'CAUSE/EFFECT: "Therefore," "Consequently," "As a result," "Thus." The second idea results from the first.',
          'SEQUENCE: "First," "Next," "Then," "Finally," "Afterward." Ideas follow a time order.',
        ],
      },
      {
        type: 'strategy',
        title: 'The "Cover and Predict" Method',
        content: [
          'Cover the transition word and read the sentences before and after.',
          'Name the relationship in one word: contrast? result? addition? example?',
          'Then look at the choices and pick the word from the RIGHT category.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: "However" vs. "Therefore" Is the Big Split',
        content: 'About half of all transition questions come down to this choice: does the second sentence go IN THE SAME DIRECTION as the first (therefore, also, furthermore) or in the OPPOSITE DIRECTION (however, instead, nevertheless)? Get the direction right and you eliminate most wrong answers.',
        highlight: 'Same direction or opposite direction? That is the key question.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Transitions must match the logical relationship between ideas.',
          'Four main categories: addition, contrast, cause/effect, and sequence.',
          'Cover the transition and predict the relationship before looking at choices.',
          'Getting the direction right (same vs. opposite) eliminates most wrong answers.',
        ],
      },
    ],
  },

  'act-eng-7': {
    title: 'Paragraph Organization & Relevance',
    slides: [
      {
        type: 'intro',
        title: 'Organization and Relevance Questions',
        content: [
          'These questions ask whether a sentence belongs in the paragraph, where it should be placed, or which detail best supports the paragraph\'s purpose.',
          'They test your ability to see the big picture — the paragraph\'s main job — and evaluate whether each sentence contributes to it.',
          'These are the "thinking" questions of ACT English. Slow down and read the whole paragraph.',
        ],
        highlight: 'Every sentence must serve the paragraph\'s main purpose.',
      },
      {
        type: 'strategy',
        title: 'Should This Sentence Be Added?',
        content: [
          'Summarize the paragraph\'s main topic in one phrase.',
          'Does the new sentence support, develop, or illustrate that topic? If yes, add it.',
          'Does it introduce unrelated information, even if it is interesting? If so, do not add it.',
        ],
      },
      {
        type: 'strategy',
        title: 'Sentence Placement Questions',
        content: [
          'When asked "where should this sentence be placed?", look for logical connections.',
          'A sentence that mentions "this discovery" must come AFTER the sentence that describes the discovery.',
          'A sentence that introduces a new idea should come BEFORE the sentences that elaborate on it.',
        ],
      },
      {
        type: 'strategy',
        title: 'Opening and Closing Sentences',
        content: [
          'An effective opening sentence introduces the paragraph\'s topic without assuming the reader knows anything yet.',
          'An effective closing sentence wraps up the paragraph\'s main point or transitions to the next paragraph.',
          'If the question asks for the best opening, pick the broadest introduction. For the best closing, pick the strongest summary.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Pronouns and Referents Guide Placement',
        content: 'If a sentence uses a pronoun like "this," "these," or "it," look for the noun it refers to. The sentence must come AFTER the sentence that introduces that noun. This is the fastest way to solve placement questions.',
        highlight: 'Follow the pronouns — they point to where the sentence belongs.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Every sentence must serve the paragraph\'s main purpose.',
          'Don\'t add sentences with off-topic information, even if they are interesting.',
          'Use pronouns and logical order to determine sentence placement.',
          'Opening sentences introduce; closing sentences summarize or transition.',
        ],
      },
    ],
  },

  'act-eng-8': {
    title: 'Author Purpose, Tone & Style',
    slides: [
      {
        type: 'intro',
        title: 'Matching the Author\'s Purpose and Tone',
        content: [
          'Style questions ask which word, phrase, or sentence best matches the passage\'s tone and the author\'s purpose.',
          'The ACT uses formal, informative passages most of the time. Answers that are too casual, too dramatic, or too vague are usually wrong.',
          'You need to read the surrounding text carefully to match the style.',
        ],
        highlight: 'Match the existing tone. Don\'t introduce language that clashes.',
      },
      {
        type: 'strategy',
        title: 'Identifying the Tone',
        content: [
          'Ask yourself: is this passage formal or casual? Informative or persuasive? Reflective or urgent?',
          'Look at the vocabulary level and sentence structure in the surrounding paragraphs.',
          'If the passage uses academic language, an answer with slang or casual expressions is wrong.',
        ],
      },
      {
        type: 'strategy',
        title: 'Purpose-Based Questions',
        content: [
          'When the question says "the writer wants to emphasize the difficulty of the task," the answer must specifically convey difficulty.',
          'Read the stated goal carefully. Each word matters: "introduce" is different from "argue," and "historical" is different from "personal."',
          'The correct answer achieves the stated purpose AND matches the passage\'s tone.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Eliminate the Outlier',
        content: 'Usually one or two answer choices obviously clash with the tone — they are either too informal ("super cool") or too extreme ("the most revolutionary moment in human history"). Eliminate these immediately. The right answer blends in with the passage.',
        highlight: 'The correct answer blends seamlessly with the surrounding text.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Match the tone and formality level of the surrounding passage.',
          'Read the stated purpose carefully — every word in the goal matters.',
          'Eliminate answers that are too casual, too dramatic, or too vague.',
          'The right answer should blend in with the passage, not stand out.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     ACT MATH (act-math-*)
     ═══════════════════════════════════════════════════════════════ */

  'act-math-1': {
    title: 'Pre-Algebra & Proportions',
    slides: [
      {
        type: 'intro',
        title: 'Pre-Algebra: The Foundation',
        content: [
          'The first 10 to 15 ACT Math questions test arithmetic, percentages, ratios, proportions, and basic number properties.',
          'These are designed to be straightforward — but careless errors here cost just as many points as harder questions.',
          'Speed and accuracy on these questions give you more time for the challenging problems later.',
        ],
        highlight: 'Get these right quickly to bank time for harder questions.',
      },
      {
        type: 'strategy',
        title: 'Proportions: Set Up Carefully',
        content: [
          'Make sure both ratios compare the SAME things in the SAME order: miles/hours = miles/hours.',
          'Cross-multiply to solve: a/b = c/d means ad = bc.',
          'Label your units on both sides of the proportion to catch setup errors before you solve.',
        ],
      },
      {
        type: 'strategy',
        title: 'Percentages: The Multiplier Shortcut',
        content: [
          'A 25% discount means you pay 75% of the original: multiply by 0.75.',
          'A 15% increase means you have 115% of the original: multiply by 1.15.',
          'Percent change = (new - original) / original × 100. Always divide by the ORIGINAL.',
        ],
      },
      {
        type: 'strategy',
        title: 'Order of Operations and Negatives',
        content: [
          'Follow PEMDAS strictly: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right).',
          'A negative sign in front of a squared term is tricky: -3² = -9, but (-3)² = 9.',
          'When in doubt, use parentheses to keep your arithmetic organized.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Estimate Before You Calculate',
        content: 'Before diving into arithmetic, estimate the answer. If a jacket is $80 with a 25% discount, you know the answer is around $60. If your calculation gives you $40 or $75, something went wrong. Estimating catches errors before they cost you points.',
        highlight: 'A quick estimate catches calculation errors before they cost points.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Set up proportions with matching units and cross-multiply.',
          'Use the multiplier method for percentages: increase = 1 + rate, decrease = 1 - rate.',
          'Follow PEMDAS carefully, especially with negative numbers.',
          'Estimate first to catch careless arithmetic errors.',
        ],
      },
    ],
  },

  'act-math-2': {
    title: 'Linear Equations & Systems',
    slides: [
      {
        type: 'intro',
        title: 'Linear Equations Are High-Frequency',
        content: [
          'Linear equations appear in many forms on the ACT: direct solve-for-x problems, word problems, and graph interpretation.',
          'You need to be comfortable with slope-intercept form (y = mx + b), solving for variables, and working with systems of two equations.',
          'These are bread-and-butter questions — mastering them is essential.',
        ],
        highlight: 'Linear equations are the most common math topic on the ACT.',
      },
      {
        type: 'strategy',
        title: 'Solving Linear Equations',
        content: [
          'Goal: isolate the variable. Use inverse operations — add/subtract first, then multiply/divide.',
          'If the variable appears on both sides, collect all variable terms on one side first.',
          'Always check your answer by substituting it back into the original equation.',
        ],
      },
      {
        type: 'strategy',
        title: 'Systems of Equations',
        content: [
          'Substitution: use when one equation has a variable already isolated (like y = 3x + 1).',
          'Elimination: use when you can add or subtract equations to cancel a variable.',
          'For the ACT, pick whichever method looks faster for the specific problem.',
        ],
      },
      {
        type: 'strategy',
        title: 'Translating Word Problems',
        content: [
          '"Per" signals the slope: dollars per hour, miles per gallon.',
          'A fixed starting amount is the y-intercept: initial fee, base cost, starting balance.',
          'Example: "A plumber charges $50 for a house call plus $30 per hour." Equation: y = 30x + 50.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Plug In Answer Choices',
        content: 'On the ACT, all answer choices are given. Instead of solving algebraically, try substituting each answer choice into the equation. Start with the middle value — if it is too big, go smaller, and vice versa. This often works in under 30 seconds.',
        highlight: 'Substituting answer choices is sometimes faster than solving.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Isolate the variable using inverse operations.',
          'For systems: use substitution or elimination, whichever is faster.',
          'Translate word problems by finding the rate (slope) and starting value (y-intercept).',
          'Plugging in answer choices can be faster than solving algebraically.',
        ],
      },
    ],
  },

  'act-math-3': {
    title: 'Functions & Graph Interpretation',
    slides: [
      {
        type: 'intro',
        title: 'Functions and Graphs',
        content: [
          'Function questions test whether you can evaluate f(x) from a rule or a graph and interpret what slope and intercepts mean.',
          'On a graph, the x-axis is the input and the y-axis is the output. Knowing what each axis represents is essential.',
          'The ACT also tests reading values from tables, which is the same skill in a different format.',
        ],
        highlight: 'A function is an input-output machine. Know what goes in and what comes out.',
      },
      {
        type: 'strategy',
        title: 'Evaluating Functions',
        content: [
          'f(3) means "replace x with 3 in the formula and calculate."',
          'Be careful with order of operations: f(x) = 2x² means square FIRST, then multiply by 2.',
          'If f(x) = x² + 1, then f(3) = 9 + 1 = 10. Do not confuse 2x² with (2x)².',
        ],
      },
      {
        type: 'strategy',
        title: 'Reading Graphs',
        content: [
          'To find f(a) from a graph: go to x = a on the horizontal axis, move up or down to the curve, and read the y-value.',
          'To find where f(x) = 0: look for where the graph crosses the x-axis.',
          'Slope on a graph is the steepness: rise over run between any two points.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Label the Axes in Words',
        content: 'Before answering a graph question, mentally label each axis with what it represents — "time in hours" on the x-axis, "distance in miles" on the y-axis. This prevents the common error of mixing up input and output.',
        highlight: 'Label the axes in words before reading any values.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Evaluate functions by substituting the input and calculating carefully.',
          'Read graphs by finding the x-value first, then reading the y-value.',
          'The x-intercept is where the graph crosses the x-axis (f(x) = 0).',
          'Label graph axes in words to avoid input-output confusion.',
        ],
      },
    ],
  },

  'act-math-4': {
    title: 'Exponents, Polynomials & Quadratics',
    slides: [
      {
        type: 'intro',
        title: 'Algebra Gets Harder Here',
        content: [
          'The middle of the ACT Math section introduces exponent rules, polynomial operations, factoring, and quadratic equations.',
          'These questions require more steps but follow predictable patterns.',
          'If you know the exponent rules and factoring techniques, these become very doable.',
        ],
        highlight: 'Exponent rules and factoring are the keys to this section.',
      },
      {
        type: 'strategy',
        title: 'Exponent Rules',
        content: [
          'Same base, multiply: x^a · x^b = x^(a+b). ADD the exponents.',
          'Same base, divide: x^a / x^b = x^(a-b). SUBTRACT the exponents.',
          'Power of a power: (x^a)^b = x^(ab). MULTIPLY the exponents.',
          'Negative exponent: x^(-a) = 1/x^a. Flip it to the other side of the fraction.',
        ],
      },
      {
        type: 'strategy',
        title: 'Factoring Quadratics',
        content: [
          'For x² + bx + c, find two numbers that multiply to c and add to b.',
          'Example: x² - 5x + 6 = (x - 2)(x - 3) because -2 × -3 = 6 and -2 + -3 = -5.',
          'Difference of squares: a² - b² = (a + b)(a - b). Memorize this pattern.',
        ],
      },
      {
        type: 'strategy',
        title: 'Solving Quadratics',
        content: [
          'Method 1: Factor and set each factor to zero. (x - 2)(x - 3) = 0 gives x = 2 or x = 3.',
          'Method 2: Use the quadratic formula when factoring is difficult: x = (-b ± √(b²-4ac)) / 2a.',
          'Method 3: Complete the square — useful when the question asks for vertex form.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Check by Expanding',
        content: 'After you factor a quadratic, multiply the factors back together. If you get the original expression, you factored correctly. This takes about 10 seconds and is the most reliable way to catch factoring errors.',
        highlight: 'Always multiply your factors back together to verify.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Exponent rules: add for multiplication, subtract for division, multiply for power of a power.',
          'Factor quadratics by finding two numbers that multiply to c and add to b.',
          'The difference of squares pattern appears frequently: a² - b² = (a + b)(a - b).',
          'Check factoring by expanding back to the original expression.',
        ],
      },
    ],
  },

  'act-math-5': {
    title: 'Plane Geometry',
    slides: [
      {
        type: 'intro',
        title: 'Geometry Formulas You Need to Know',
        content: [
          'The ACT does NOT give you a formula sheet. You need to memorize the key geometry formulas.',
          'The most commonly tested shapes are triangles, rectangles, circles, and parallelograms.',
          'Most geometry questions are just about picking the right formula, plugging in, and solving.',
        ],
        highlight: 'No formula sheet on the ACT — memorize the essentials.',
      },
      {
        type: 'strategy',
        title: 'Triangle Facts',
        content: [
          'Angles of a triangle sum to 180 degrees.',
          'Area = (1/2) × base × height. The height must be perpendicular to the base.',
          'The Pythagorean theorem (a² + b² = c²) applies ONLY to right triangles.',
          'Know the common triples: 3-4-5, 5-12-13, 8-15-17, and their multiples.',
        ],
      },
      {
        type: 'strategy',
        title: 'Circles',
        content: [
          'Area = πr². Circumference = 2πr.',
          'Diameter = 2 × radius. Always check whether the problem gives you the radius or the diameter.',
          'For arcs and sectors, use the fraction angle/360 times the full formula.',
        ],
      },
      {
        type: 'strategy',
        title: 'Rectangles, Parallelograms, and Trapezoids',
        content: [
          'Rectangle area = length × width. Perimeter = 2(length + width).',
          'Parallelogram area = base × height (the height is perpendicular, NOT the slanted side).',
          'Trapezoid area = (1/2)(base₁ + base₂) × height.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Draw and Label the Diagram',
        content: 'Even if the ACT provides a diagram, redraw it and label all given information on YOUR diagram. If no diagram is provided, always draw one. Geometry is visual — working without a labeled picture is like doing math blindfolded.',
        highlight: 'Always draw and label — even if a diagram is provided.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Memorize formulas: triangle area, Pythagorean theorem, circle area and circumference.',
          'Triangle angles sum to 180. Know the common Pythagorean triples.',
          'For circles, check whether you have the radius or the diameter.',
          'Draw and label diagrams for every geometry problem.',
        ],
      },
    ],
  },

  'act-math-6': {
    title: 'Coordinate Geometry',
    slides: [
      {
        type: 'intro',
        title: 'Geometry on the Coordinate Plane',
        content: [
          'Coordinate geometry questions test slope, midpoint, distance, and geometric shapes placed on an x-y plane.',
          'These questions combine algebra skills with geometry knowledge.',
          'The formulas are straightforward — the challenge is avoiding sign errors when substituting coordinates.',
        ],
        highlight: 'The formulas are simple. The sign errors are the trap.',
      },
      {
        type: 'strategy',
        title: 'Slope',
        content: [
          'Slope = (y₂ - y₁) / (x₂ - x₁). Rise over run.',
          'Subtract in the SAME order for both coordinates. If you do y₂ - y₁ on top, do x₂ - x₁ on the bottom.',
          'Parallel lines have EQUAL slopes. Perpendicular lines have NEGATIVE RECIPROCAL slopes (like 2 and -1/2).',
        ],
      },
      {
        type: 'strategy',
        title: 'Midpoint and Distance',
        content: [
          'Midpoint: average the x-coordinates and average the y-coordinates. ((x₁+x₂)/2, (y₁+y₂)/2).',
          'Distance: use the distance formula, which is just the Pythagorean theorem in disguise. √((x₂-x₁)² + (y₂-y₁)²).',
          'Or skip the formula: draw a right triangle between the two points and use a² + b² = c².',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Sketch the Points',
        content: 'Before using any formula, plot the points on a quick sketch. This helps you check whether your answer makes sense — if you calculate a slope of 5 but the points clearly form a gentle rise, something is wrong.',
        highlight: 'A quick sketch catches formula errors before they happen.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Slope = (y₂ - y₁) / (x₂ - x₁). Subtract in the same order.',
          'Parallel lines: equal slopes. Perpendicular lines: negative reciprocal slopes.',
          'Midpoint: average the coordinates. Distance: Pythagorean theorem in disguise.',
          'Sketch the points to verify your answer makes sense.',
        ],
      },
    ],
  },

  'act-math-7': {
    title: 'Probability, Statistics & Data',
    slides: [
      {
        type: 'intro',
        title: 'Data and Probability on the ACT',
        content: [
          'These questions ask you to calculate averages, interpret data from tables and graphs, and find basic probabilities.',
          'You need to know mean, median, mode, range, and how to read data carefully.',
          'Most errors come from misreading the data, not from the math itself.',
        ],
        highlight: 'Read the data carefully first. The math is usually straightforward.',
      },
      {
        type: 'strategy',
        title: 'Mean, Median, and Mode',
        content: [
          'Mean = sum of values / number of values.',
          'Median = middle value when data is sorted. For an even number of values, average the two middle ones.',
          'Mode = the value that appears most often. There can be more than one mode.',
        ],
      },
      {
        type: 'strategy',
        title: 'Probability Basics',
        content: [
          'Probability = favorable outcomes / total outcomes.',
          'The result is always between 0 and 1 (or 0% and 100%).',
          '"And" usually means multiply probabilities (for independent events). "Or" usually means add probabilities (for mutually exclusive events).',
        ],
      },
      {
        type: 'strategy',
        title: 'Working Backward from the Mean',
        content: [
          'If you know the mean and the number of values, you can find the total: mean × count = sum.',
          'To find a missing value, subtract the known values from the total sum.',
          'Example: five tests with mean 80 means total = 400. If four tests total 310, the fifth test is 90.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Count Your Outcomes',
        content: 'The most common probability error is miscounting the total number of outcomes. Before setting up the fraction, count every item in the group — not just the favorable ones. Write the total number clearly so you don\'t lose track.',
        highlight: 'Count ALL outcomes carefully before setting up the probability fraction.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Mean = sum / count. Median = middle value. Mode = most frequent.',
          'Probability = favorable / total. Always between 0 and 1.',
          'Use mean × count = sum to work backward and find missing values.',
          'Count all outcomes carefully before calculating probability.',
        ],
      },
    ],
  },

  'act-math-8': {
    title: 'Trigonometry & Advanced Geometry',
    slides: [
      {
        type: 'intro',
        title: 'Trig and Advanced Geometry',
        content: [
          'The later ACT Math questions include trigonometric ratios, special right triangles, and multi-step geometry setups.',
          'You need SOHCAHTOA and the special triangle ratios (30-60-90 and 45-45-90).',
          'These questions are worth the same as easy questions, so getting even a few right here is a big score boost.',
        ],
        highlight: 'SOHCAHTOA and special triangles are the keys to these points.',
      },
      {
        type: 'strategy',
        title: 'SOHCAHTOA',
        content: [
          'SOH: sin(θ) = Opposite / Hypotenuse.',
          'CAH: cos(θ) = Adjacent / Hypotenuse.',
          'TOA: tan(θ) = Opposite / Adjacent.',
          'Identify which sides are opposite, adjacent, and hypotenuse RELATIVE TO THE SPECIFIC ANGLE in the question.',
        ],
      },
      {
        type: 'strategy',
        title: 'Special Right Triangles',
        content: [
          '45-45-90: sides are x, x, x√2. The two legs are equal, the hypotenuse is leg × √2.',
          '30-60-90: sides are x, x√3, 2x. The shortest side is opposite the 30° angle, the longest is the hypotenuse.',
          'Recognizing these patterns saves significant time — you don\'t need to use the Pythagorean theorem.',
        ],
      },
      {
        type: 'strategy',
        title: 'Multi-Step Geometry',
        content: [
          'Some late ACT problems combine shapes — a triangle inside a circle, or a rectangle with a semicircle on top.',
          'Break complex shapes into simpler ones. Find the area of each simple shape, then add or subtract.',
          'Always label the diagram with dimensions you calculate along the way.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Label "O, A, H" on the Triangle',
        content: 'Before writing any trig ratio, physically label the sides of the triangle with "O" for opposite, "A" for adjacent, and "H" for hypotenuse, relative to the angle being asked about. This five-second step prevents the most common trig error.',
        highlight: 'Label O, A, H on the triangle BEFORE writing the ratio.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'SOHCAHTOA: sin = O/H, cos = A/H, tan = O/A.',
          '45-45-90 sides: x, x, x√2. 30-60-90 sides: x, x√3, 2x.',
          'Break complex shapes into simpler ones for area calculations.',
          'Label opposite, adjacent, and hypotenuse before writing any trig ratio.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     ACT READING (act-read-*)
     ═══════════════════════════════════════════════════════════════ */

  'act-read-1': {
    title: 'Main Idea & Key Details',
    slides: [
      {
        type: 'intro',
        title: 'Finding the Main Idea',
        content: [
          'Main idea questions ask what the passage is PRIMARILY about or what the author\'s CENTRAL point is.',
          'The correct answer covers the entire passage, not just one paragraph or detail.',
          'About 3 to 4 questions per passage test this skill, making it the highest-value reading skill to master.',
        ],
        highlight: 'The main idea covers the WHOLE passage, not just one section.',
      },
      {
        type: 'strategy',
        title: 'The "Headline" Test',
        content: [
          'After reading, imagine writing a short newspaper headline for the passage. What would it say?',
          'That headline is essentially the main idea. Match it to the answer choices.',
          'If an answer choice would only work as a headline for one paragraph, it is too narrow.',
        ],
      },
      {
        type: 'strategy',
        title: 'Distinguishing Main Idea from Supporting Details',
        content: [
          'A main idea is the overall argument or focus. A supporting detail is a specific example or fact used to back it up.',
          'The ACT will offer supporting details as tempting wrong answers. They are true but too specific.',
          'Ask: "Is this what the WHOLE passage is about, or just one part?"',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Read the First and Last Paragraphs Carefully',
        content: 'The main idea is almost always introduced in the first paragraph and restated or concluded in the last paragraph. If you are short on time, read these two paragraphs most carefully and skim the middle.',
        highlight: 'First and last paragraphs almost always frame the main idea.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'The main idea covers the entire passage, not just one section.',
          'Use the "headline" test to identify the central point.',
          'Supporting details are true but too specific to be the main idea.',
          'Focus on the first and last paragraphs for the main idea.',
        ],
      },
    ],
  },

  'act-read-2': {
    title: 'Vocabulary in Context',
    slides: [
      {
        type: 'intro',
        title: 'Words in Context on the ACT',
        content: [
          'These questions ask what a word means AS USED IN THE PASSAGE — not its dictionary definition.',
          'Many common words have multiple meanings, and the ACT tests whether you can identify the right one from context.',
          'The answer is always supported by the surrounding sentence, not by your prior knowledge of the word.',
        ],
        highlight: 'Context determines meaning, not the dictionary.',
      },
      {
        type: 'strategy',
        title: 'The Substitution Method',
        content: [
          'Replace the word with each answer choice and read the sentence. Which one preserves the original meaning?',
          'The correct substitution should make the sentence sound natural and logical.',
          'If two choices seem close, look at the surrounding sentences for additional clues.',
        ],
      },
      {
        type: 'strategy',
        title: 'Avoid the Most Common Meaning Trap',
        content: [
          'The ACT loves testing secondary meanings of common words.',
          '"Sharp" might mean "sudden" rather than "pointed." "Volume" might mean "amount" rather than "loudness."',
          'Don\'t automatically pick the first meaning that comes to mind. Let the context guide you.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Reread the Full Sentence',
        content: 'Students often skim the sentence and guess based on the word alone. Always go back and reread the ENTIRE sentence containing the word. The clues are in the surrounding language — tone, direction, and subject all narrow down the meaning.',
        highlight: 'Reread the full sentence every time. Don\'t guess from the word alone.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'The correct meaning is determined by the context, not the dictionary.',
          'Substitute each answer choice into the sentence and check for fit.',
          'Watch for secondary meanings of common words.',
          'Always reread the full sentence before answering.',
        ],
      },
    ],
  },

  'act-read-3': {
    title: 'Inference',
    slides: [
      {
        type: 'intro',
        title: 'Making Inferences on the ACT',
        content: [
          'Inference questions ask you to draw a conclusion that is strongly supported by the passage but not directly stated.',
          'ACT inferences are cautious and evidence-based. The correct answer feels almost unavoidable once you see the evidence.',
          'Wild guesses, creative leaps, and outside knowledge are never correct.',
        ],
        highlight: 'ACT inferences are small, safe steps supported by evidence.',
      },
      {
        type: 'strategy',
        title: 'The Evidence Chain',
        content: [
          'For every inference choice, ask: "What specific lines in the passage support this?"',
          'If you can point to exact text that leads directly to the conclusion, it is a strong inference.',
          'If you need to make two or three assumptions to get there, it is too speculative.',
        ],
      },
      {
        type: 'strategy',
        title: 'Eliminating Extreme and Unsupported Answers',
        content: [
          'Watch for words like "always," "never," "all," "none," and "completely." These are usually too extreme.',
          'If an answer COULD be true but the passage doesn\'t provide evidence for it, eliminate it.',
          'The correct inference stays close to the text and uses moderate language.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The "Must Be True" Test',
        content: 'Ask yourself: based ONLY on this passage, MUST this be true? If the answer is "yes," you have a good inference. If the answer is "probably" or "maybe," it is likely wrong. The correct inference should feel like the only reasonable conclusion.',
        highlight: 'If it MUST be true based on the passage, it is a strong inference.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Inferences are one small step beyond what the text says — not creative leaps.',
          'Point to specific lines that support the inference.',
          'Eliminate answers with extreme language or answers that require outside knowledge.',
          'Use the "must be true" test to verify your choice.',
        ],
      },
    ],
  },

  'act-read-4': {
    title: 'Author\'s Purpose & Perspective',
    slides: [
      {
        type: 'intro',
        title: 'Understanding Why the Author Wrote It',
        content: [
          'Purpose questions ask WHY the author includes a specific detail, paragraph, or example.',
          'Perspective questions ask WHAT the author\'s attitude is — admiring, critical, neutral, skeptical.',
          'The key is distinguishing between what the passage is ABOUT (topic) and what the author is TRYING TO DO (purpose).',
        ],
        highlight: 'Topic is WHAT it\'s about. Purpose is WHY it was written.',
      },
      {
        type: 'strategy',
        title: 'Identifying Purpose',
        content: [
          'Ask: "What job does this paragraph or detail do for the overall passage?"',
          'Common purposes: provide evidence, introduce a contrast, give background, illustrate a point, qualify a claim.',
          'The answer should describe the FUNCTION of the text, not just restate its content.',
        ],
      },
      {
        type: 'strategy',
        title: 'Identifying the Author\'s Tone',
        content: [
          'Name the author\'s attitude in plain words: admiring, skeptical, enthusiastic, concerned, neutral.',
          'Look at word choices. Positive words like "impressive" and "breakthrough" signal admiration. Words like "questionable" and "troubling" signal concern.',
          'The tone should be consistent throughout the passage — don\'t be swayed by one sentence.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: "To" Phrases Guide Purpose Answers',
        content: 'Most purpose answers start with "to" — "to provide an example," "to introduce a counterargument," "to establish historical context." When evaluating these, complete the sentence: "The author includes this detail TO..." and see which completion matches.',
        highlight: '"The author includes this TO..." — complete the sentence to find the purpose.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Purpose asks what JOB a detail does in the passage.',
          'Perspective asks what the author\'s ATTITUDE is.',
          'Look at word choices to identify tone: positive, negative, or neutral.',
          'Purpose answers describe function, not content.',
        ],
      },
    ],
  },

  'act-read-5': {
    title: 'Comparing Viewpoints',
    slides: [
      {
        type: 'intro',
        title: 'Comparing Perspectives',
        content: [
          'Some ACT Reading questions involve two passages or two viewpoints within one passage and ask you to compare them.',
          'You need to track each perspective separately and then identify where they agree, disagree, or qualify each other.',
          'Keeping the two viewpoints mentally separated is the essential skill.',
        ],
        highlight: 'Track each viewpoint separately before comparing.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Summarize Each Viewpoint',
        content: [
          'After reading, write a one-sentence summary of Viewpoint A and a one-sentence summary of Viewpoint B.',
          'Keep them separate. Don\'t blend them yet.',
          'Focus on the CLAIM each person or passage makes, not just the topic they discuss.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Find the Overlap and the Divergence',
        content: [
          'Where do the viewpoints agree? They might share the same basic facts but interpret them differently.',
          'Where do they diverge? One might be optimistic while the other is cautious. One might focus on economics while the other focuses on individual experience.',
          'The answer choices will often test these precise differences.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Make a Two-Column Mental Note',
        content: 'As you read, keep a running mental note: "Passage A says... Passage B says..." When a question asks how they differ, you already have the comparison ready. This is faster than rereading both passages.',
        highlight: 'Two columns in your mind: A says this, B says that.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Summarize each viewpoint in one sentence before comparing.',
          'Identify where they agree AND where they diverge.',
          'Same topic does not mean same position.',
          'Use a two-column mental note while reading.',
        ],
      },
    ],
  },

  'act-read-6': {
    title: 'Structure & Organization',
    slides: [
      {
        type: 'intro',
        title: 'How the Passage Is Built',
        content: [
          'Structure questions ask how the passage is organized — what comes first, what follows, and why ideas appear in that order.',
          'These questions test whether you see the passage as a whole rather than a collection of separate sentences.',
          'Common structures include chronological order, problem-solution, compare-contrast, and claim-evidence.',
        ],
        highlight: 'See the passage as a structured argument, not random paragraphs.',
      },
      {
        type: 'strategy',
        title: 'Labeling Paragraph Functions',
        content: [
          'As you read, mentally label each paragraph with its job: "introduces the topic," "gives example," "presents counterargument," "concludes."',
          'This labeling takes seconds but makes structure questions almost automatic.',
          'The answer choice that correctly describes these paragraph roles is the right one.',
        ],
      },
      {
        type: 'strategy',
        title: 'Shift and Pivot Points',
        content: [
          'Many passages shift direction at some point — from personal to analytical, from past to present, or from one perspective to another.',
          'Words like "however," "yet," "on the other hand," and "in contrast" signal these pivots.',
          'Structure questions often ask about these shifts because they reveal how the argument develops.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: First Sentence of Each Paragraph',
        content: 'The first sentence of each paragraph usually signals the paragraph\'s role. Skim these topic sentences to quickly map the passage\'s structure. If a question asks about overall organization, these sentences give you the answer.',
        highlight: 'Topic sentences reveal the structure. Skim them for a quick map.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Label each paragraph\'s function while reading.',
          'Look for shift words that signal a change in direction or approach.',
          'Common structures: chronological, problem-solution, compare-contrast, claim-evidence.',
          'First sentences of paragraphs usually reveal the overall structure.',
        ],
      },
    ],
  },

  'act-read-7': {
    title: 'Literary Narrative Analysis',
    slides: [
      {
        type: 'intro',
        title: 'The Literary Narrative Passage',
        content: [
          'The first passage on the ACT Reading section is always a literary narrative — a piece of fiction or creative nonfiction.',
          'These questions focus on character, mood, point of view, and how specific details reveal relationships and emotions.',
          'Unlike informational passages, you need to read between the lines for feelings and motivations.',
        ],
        highlight: 'Literary passages test emotions, relationships, and character development.',
      },
      {
        type: 'strategy',
        title: 'Track Character Emotions',
        content: [
          'As you read, note how characters FEEL at each point. Do their feelings change?',
          'Pay attention to what characters DO, not just what they SAY. Actions reveal character more reliably.',
          'The narrator\'s tone and word choices reveal their attitude toward the events and other characters.',
        ],
      },
      {
        type: 'strategy',
        title: 'Reading Between the Lines',
        content: [
          'Literary passages use imagery, metaphor, and subtle description instead of direct statements.',
          '"The room felt smaller with each passing minute" suggests growing tension or discomfort.',
          'When answering, point to specific textual clues — don\'t project your own feelings onto the characters.',
        ],
      },
      {
        type: 'strategy',
        title: 'Character Change Questions',
        content: [
          'Many questions ask how a character changes from the beginning to the end of the passage.',
          'Compare the character\'s attitude, understanding, or emotional state at the start and finish.',
          'The change is usually subtle — from confused to understanding, from resistant to accepting, from distant to connected.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Don\'t Overthink Literary Questions',
        content: 'Students often read too much into literary passages. The ACT is still a standardized test — the answers must be clearly supported by the text. If your interpretation requires a creative leap, it is probably wrong. Stick to what the passage actually says and shows.',
        highlight: 'Even on literary passages, the answer must be supported by the text.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Track character emotions and note how they change throughout the passage.',
          'Actions and descriptions reveal character — read between the lines.',
          'Compare the character at the beginning and end for "change" questions.',
          'Stick to textual evidence, even for literary interpretation.',
        ],
      },
    ],
  },

  'act-read-8': {
    title: 'Humanities, Social Science & Natural Science Passages',
    slides: [
      {
        type: 'intro',
        title: 'The Three Informational Passage Types',
        content: [
          'After the literary narrative, the ACT presents three informational passages: social science, humanities, and natural science.',
          'Each has a slightly different flavor, but the reading strategy is the same: follow the argument, evidence, and purpose.',
          'You do NOT need outside knowledge. Every answer comes from the passage.',
        ],
        highlight: 'All three informational passage types use the same core reading strategy.',
      },
      {
        type: 'strategy',
        title: 'Social Science Passages',
        content: [
          'These cover topics like psychology, sociology, economics, or political science.',
          'Focus on the author\'s central claim and the evidence used to support it.',
          'Watch for data references: when the passage mentions a study or survey, that data often supports the main argument.',
        ],
      },
      {
        type: 'strategy',
        title: 'Humanities Passages',
        content: [
          'These cover art, architecture, philosophy, literature, or cultural history.',
          'Pay attention to the author\'s perspective — are they admiring, analytical, or critical?',
          'These passages often trace how an idea or art form developed over time.',
        ],
      },
      {
        type: 'strategy',
        title: 'Natural Science Passages',
        content: [
          'These cover biology, chemistry, physics, or environmental science.',
          'Focus on the experiment or process described: what was tested, what was found, and what the results mean.',
          'Don\'t be intimidated by technical vocabulary. The passage always explains what you need to know.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Treat Every Passage as an Argument',
        content: 'Regardless of the passage type, ask three questions: What is the main claim? What evidence supports it? What conclusion does the author draw? This framework works for social science, humanities, and natural science passages equally well.',
        highlight: 'Claim, evidence, conclusion — this framework works for all passage types.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Social science: follow the central claim and the data supporting it.',
          'Humanities: track the author\'s perspective and how ideas develop.',
          'Natural science: focus on what was tested, found, and concluded.',
          'Treat every passage as an argument with a claim, evidence, and conclusion.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     ACT SCIENCE (act-sci-*)
     ═══════════════════════════════════════════════════════════════ */

  'act-sci-1': {
    title: 'Reading Graphs & Tables',
    slides: [
      {
        type: 'intro',
        title: 'The Most Important ACT Science Skill',
        content: [
          'About 40 to 50 percent of ACT Science questions are simply about reading data accurately from graphs and tables.',
          'You do NOT need to know science concepts for most of these. You just need to find the right value in the right place.',
          'The biggest source of errors is not the science — it is misreading axes, units, or column headers.',
        ],
        highlight: 'Most ACT Science questions are data-reading questions, not science questions.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Read All Labels Before Answering',
        content: [
          'Before looking at any data, read the title of the graph or table.',
          'Read every axis label and note the units. Is the x-axis in seconds or minutes? Is the y-axis in grams or kilograms?',
          'Read the legend if there are multiple lines or data series.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Locate the Exact Data Point',
        content: [
          'Find the specific row, column, or point the question asks about.',
          'For a graph: find the x-value on the horizontal axis, trace up to the line, then read across to the y-axis.',
          'For a table: find the right row and the right column. Use your finger or a pencil to trace the row and avoid reading the wrong cell.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 3: Identify Trends',
        content: [
          'Some questions ask about the overall trend: is it increasing, decreasing, staying constant, or changing direction?',
          'Look at the overall shape of the data, not just individual points.',
          'Describe trends in words before choosing an answer: "As temperature increases, growth rate increases."',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Use Your Pencil as a Ruler',
        content: 'Hold your pencil horizontally across the graph to trace from a data point to the y-axis. This prevents the most common error: reading the wrong y-value because your eye drifted. A simple physical tool makes a big difference.',
        highlight: 'Trace from the data point to the axis with your pencil.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Read ALL labels, axes, and units before looking at the data.',
          'Trace carefully from x-value to the line to the y-value.',
          'Identify trends: increasing, decreasing, constant, or changing.',
          'Use your pencil as a ruler to prevent misreading values.',
        ],
      },
    ],
  },

  'act-sci-2': {
    title: 'Experimental Design',
    slides: [
      {
        type: 'intro',
        title: 'Understanding How Experiments Work',
        content: [
          'Experimental design questions ask what the researchers were testing, how they set up the experiment, and why they followed certain steps.',
          'You need to identify the manipulated variable (what they changed), the responding variable (what they measured), and the controlled variables (what they kept the same).',
          'The passage always gives you this information — you just need to organize it.',
        ],
        highlight: 'What changed, what was measured, and what stayed the same.',
      },
      {
        type: 'strategy',
        title: 'Summarize the Experiment in One Sentence',
        content: [
          'Before answering questions, summarize: "They changed ___ to measure its effect on ___."',
          'This one sentence tells you the manipulated and responding variables.',
          'Everything else in the procedure is there to keep the experiment fair and controlled.',
        ],
      },
      {
        type: 'strategy',
        title: 'Why Did They Do That?',
        content: [
          'When the question asks WHY a step was included, think about what would happen without it.',
          'Repeating trials increases reliability. Using the same equipment keeps variables controlled.',
          'A control group provides a baseline to compare against.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Skim the Procedure, Study the Data',
        content: 'The procedure paragraphs can be long and technical. Skim them for the big picture (what changed, what was measured), then spend your time on the actual data. Most questions are about the results, not the procedure steps.',
        highlight: 'Skim the procedure for the big picture. Focus on the data.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Identify the manipulated variable, responding variable, and controlled variables.',
          'Summarize the experiment: "They changed ___ to measure ___."',
          'Understand why steps are included: reliability, control, comparison.',
          'Spend most of your time on the data, not the procedure text.',
        ],
      },
    ],
  },

  'act-sci-3': {
    title: 'Variables & Controls',
    slides: [
      {
        type: 'intro',
        title: 'Why Controls Matter',
        content: [
          'Control questions test whether you understand how to design a fair test by isolating one variable at a time.',
          'If you change two things at once, you cannot tell which one caused the result.',
          'The ACT frequently asks what should be kept constant, or what the purpose of a control group is.',
        ],
        highlight: 'Change only one thing at a time. Keep everything else constant.',
      },
      {
        type: 'strategy',
        title: 'Identifying Variables',
        content: [
          'Independent (manipulated) variable: the factor the researcher intentionally changes.',
          'Dependent (responding) variable: the factor the researcher measures as a result.',
          'Controlled variables: everything else that is kept the same across all trials.',
        ],
      },
      {
        type: 'strategy',
        title: 'The Purpose of a Control Group',
        content: [
          'A control group receives no treatment or the standard treatment. It provides a baseline for comparison.',
          'Without a control, you cannot tell if the treatment actually caused the observed effect.',
          'Example: testing a new fertilizer? The control group gets no fertilizer. Compare plant growth with and without it.',
        ],
      },
      {
        type: 'strategy',
        title: 'Designing a Better Experiment',
        content: [
          'The ACT sometimes asks how to improve an experiment or what flaw exists in the design.',
          'Common flaws: too few trials, changing multiple variables at once, no control group, biased sample.',
          'Common improvements: more trials, larger sample size, better controls, standardized conditions.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Ask "What Else Could Explain the Result?"',
        content: 'If you can think of another factor that might have caused the observed result, the experiment has a flaw. The control and controlled variables exist to eliminate these alternative explanations. This thinking helps you answer design questions.',
        highlight: 'If another factor could explain the result, the experiment needs better controls.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Change one variable at a time; keep everything else constant.',
          'The control group provides a baseline for comparison.',
          'Common flaws: too few trials, multiple variables changing, no control.',
          'Ask "what else could explain this?" to identify design flaws.',
        ],
      },
    ],
  },

  'act-sci-4': {
    title: 'Trends, Interpolation & Extrapolation',
    slides: [
      {
        type: 'intro',
        title: 'Reading and Extending Trends',
        content: [
          'Trend questions ask what the data are doing overall: going up, going down, leveling off, or switching direction.',
          'Interpolation means estimating a value BETWEEN measured data points.',
          'Extrapolation means predicting a value BEYOND the measured data, following the established trend.',
        ],
        highlight: 'Interpolation = between the data. Extrapolation = beyond the data.',
      },
      {
        type: 'strategy',
        title: 'Describing Trends',
        content: [
          'Before answering, state the trend in plain words: "As X increases, Y increases" or "Y decreases as X goes up."',
          'Some trends are not linear — they might curve, plateau, or reverse at some point.',
          'Look at the overall pattern, not just two individual data points.',
        ],
      },
      {
        type: 'strategy',
        title: 'Interpolation: Estimating Between Points',
        content: [
          'Find the two data points on either side of the value you need to estimate.',
          'The estimated value should fall between these two points, roughly proportional to the distances.',
          'Example: if y is 10 at x = 2 and y is 20 at x = 4, then y is approximately 15 at x = 3.',
        ],
      },
      {
        type: 'strategy',
        title: 'Extrapolation: Predicting Beyond the Data',
        content: [
          'Continue the trend you see in the data. If the line is going up, the next value should be higher.',
          'Be cautious: extrapolation assumes the trend continues, which is not always true in real life.',
          'On the ACT, extrapolation questions usually ask for the most reasonable prediction, not an exact value.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Use Nearby Points, Not Distant Ones',
        content: 'When estimating, use the data points CLOSEST to the value you need. Data far from your estimate may follow a different part of the trend and give you a misleading answer.',
        highlight: 'Estimate using the nearest data points for the most accurate result.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'State the trend in plain words before answering.',
          'Interpolation estimates between data points; extrapolation predicts beyond them.',
          'Use the nearest data points for the most accurate estimates.',
          'Look at the overall pattern, not just individual points.',
        ],
      },
    ],
  },

  'act-sci-5': {
    title: 'Comparing Scientists\' Views',
    slides: [
      {
        type: 'intro',
        title: 'Conflicting Viewpoints Passages',
        content: [
          'One of the seven ACT Science passages presents two or more scientists with different explanations for the same phenomenon.',
          'This is essentially a READING task — you are matching each scientist\'s claim to evidence and predictions.',
          'You do NOT need to know which scientist is actually correct. You just need to understand each viewpoint.',
        ],
        highlight: 'This is a reading comprehension task, not a science knowledge task.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Summarize Each Viewpoint Separately',
        content: [
          'After reading each scientist\'s position, write a one-sentence summary of their main claim.',
          'Scientist 1: "The structure formed from ___." Scientist 2: "The structure formed from ___."',
          'Keep them completely separate in your mind before comparing.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Match Evidence to the Right Scientist',
        content: [
          'When a question asks "which scientist would agree with this statement," trace the statement back to the specific viewpoint.',
          'Don\'t let your own opinion influence you. Answer based on what each scientist SAID.',
          'If the evidence supports a sudden event, it aligns with the scientist who argued for a sudden cause.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 3: Find Points of Agreement and Disagreement',
        content: [
          'The scientists often agree on some basic facts but disagree on the CAUSE or INTERPRETATION.',
          'Questions may ask what both scientists would agree on — this is usually a shared fact, not a shared explanation.',
          'The main disagreement is almost always about the cause, mechanism, or origin of the phenomenon.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Read This Passage Last',
        content: 'Many ACT tutors recommend saving the conflicting viewpoints passage for last because it is the most reading-heavy and time-consuming. Do the data-heavy passages first where you can score quick points, then tackle the viewpoints passage with whatever time remains.',
        highlight: 'Consider doing data passages first and saving viewpoints for last.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Summarize each scientist\'s main claim in one sentence.',
          'Match evidence and predictions to the correct scientist.',
          'Scientists may agree on facts but disagree on causes.',
          'Consider saving this passage for last and doing data passages first.',
        ],
      },
    ],
  },

  'act-sci-6': {
    title: 'Calculations, Ratios & Unit Logic',
    slides: [
      {
        type: 'intro',
        title: 'Math in the Science Section',
        content: [
          'Some ACT Science questions require simple arithmetic: reading a value, comparing ratios, or converting units.',
          'The math is never complicated — it is usually basic division, multiplication, or proportions.',
          'The challenge is making sure you pull the right numbers from the correct row, trial, or figure.',
        ],
        highlight: 'The math is easy. The challenge is finding the right numbers in the data.',
      },
      {
        type: 'strategy',
        title: 'Ratios and Comparisons',
        content: [
          'When asked to compare two values, be clear about which is the numerator and which is the denominator.',
          'Simplify ratios by dividing both by the greatest common factor.',
          'Example: 12:18 simplifies to 2:3 by dividing both by 6.',
        ],
      },
      {
        type: 'strategy',
        title: 'Unit Conversions',
        content: [
          'The passage usually gives you the conversion factor (for example, 1 L = 1000 mL).',
          'Set up the conversion so the old unit cancels and the new unit remains.',
          'Double-check that your answer is in the unit the question asks for.',
        ],
      },
      {
        type: 'strategy',
        title: 'Reading the Right Data',
        content: [
          'Before doing any math, triple-check that you are reading the right column, the right row, and the right figure.',
          'The most common error is pulling a number from the wrong trial or the wrong variable.',
          'Use your pencil to trace the row and column to the correct cell.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Estimate First',
        content: 'Before calculating precisely, estimate the answer. If the ratio is clearly about 2:3, any answer far from that is wrong. Estimating takes seconds and prevents errors from reading the wrong data point.',
        highlight: 'A quick estimate catches errors from reading the wrong data.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Pull numbers from the correct row, column, and figure before calculating.',
          'Simplify ratios by dividing both sides by the greatest common factor.',
          'Set up unit conversions so old units cancel and new units remain.',
          'Estimate first to catch data-reading errors.',
        ],
      },
    ],
  },

  'act-sci-7': {
    title: 'Hypotheses, Models & Predictions',
    slides: [
      {
        type: 'intro',
        title: 'Making Predictions from Models',
        content: [
          'These questions give you a model or hypothesis and ask what should happen under a new condition if the model is correct.',
          'The key skill is extending the pattern or logic of the model to a new situation.',
          'You do NOT need to evaluate whether the model is scientifically accurate — just follow its logic.',
        ],
        highlight: 'Follow the model\'s logic. Don\'t judge whether the model is right.',
      },
      {
        type: 'strategy',
        title: 'Identifying the Model\'s Pattern',
        content: [
          'Read the model or hypothesis carefully. What relationship does it predict?',
          '"As X increases, Y increases" or "Y is caused by Z" — state the pattern in plain words.',
          'Then apply that same pattern to the new condition the question describes.',
        ],
      },
      {
        type: 'strategy',
        title: 'What Would Support or Weaken the Hypothesis?',
        content: [
          'Evidence SUPPORTS a hypothesis if the result matches what the hypothesis predicts.',
          'Evidence WEAKENS a hypothesis if the result contradicts the prediction.',
          'Look for the specific prediction, then check whether the data agrees or disagrees.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The Prediction Must Match the Model, Not Reality',
        content: 'The ACT is asking what the model predicts, not what actually happens in real life. Even if you know the model is simplified or wrong, pick the answer that matches the model\'s logic. This is a reading and reasoning task.',
        highlight: 'Answer based on the model, not your outside knowledge.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'State the model\'s pattern in plain words before predicting.',
          'Extend the model\'s logic to the new condition.',
          'Supporting evidence matches the prediction; weakening evidence contradicts it.',
          'Follow the model\'s logic, not your own scientific knowledge.',
        ],
      },
    ],
  },

  'act-sci-8': {
    title: 'Multi-Figure Synthesis',
    slides: [
      {
        type: 'intro',
        title: 'Combining Information from Multiple Sources',
        content: [
          'The hardest ACT Science questions ask you to combine data from two or more graphs, tables, or passage sections.',
          'The key is working with one source at a time and then combining the findings.',
          'Rushing to blend both sources too early leads to errors and confusion.',
        ],
        highlight: 'One source at a time. Find each piece, then combine.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Answer from Figure 1',
        content: [
          'Read the question and identify what information comes from Figure 1.',
          'Find that value or trend in Figure 1. Write it down or hold it in your head.',
          'Do NOT look at Figure 2 yet.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Answer from Figure 2',
        content: [
          'Now identify what information comes from Figure 2.',
          'Find that value or trend. Often, the output from Figure 1 becomes the input for Figure 2.',
          'Example: Figure 1 tells you the temperature at which peak growth occurs. Figure 2 tells you what enzyme activity is at that temperature.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 3: Combine and Answer',
        content: [
          'Now put the two pieces together to answer the question.',
          'The answer should use information from BOTH sources — not just one.',
          'If your answer could be found from a single source, you probably have not synthesized enough.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Write Down Intermediate Values',
        content: 'When you find a value from Figure 1, write it in the margin before moving to Figure 2. Holding two numbers in your head while switching between figures is a recipe for errors. A quick note keeps everything organized.',
        highlight: 'Write down the value from Figure 1 before looking at Figure 2.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Work with one figure at a time — don\'t try to blend both at once.',
          'The output of one figure often becomes the input for another.',
          'The answer should require BOTH sources, not just one.',
          'Write down intermediate values to prevent confusion between figures.',
        ],
      },
    ],
  },
}

export default ACT_LESSON_CONTENT
