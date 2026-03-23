// SAT Lesson Content — slide decks for the AI teacher / LessonPlayer
// Each chapter maps to { title, slides: [{ type, title, content, highlight }] }

const SAT_LESSON_CONTENT = {

  /* ═══════════════════════════════════════════════════════════════
     CRAFT & STRUCTURE (2.x)
     ═══════════════════════════════════════════════════════════════ */

  '2.1': {
    title: 'Words in Context',
    slides: [
      {
        type: 'intro',
        title: 'What Are Words in Context Questions?',
        content: [
          'These questions give you a short passage with a blank and ask you to pick the word that best completes it.',
          'This is NOT a vocabulary test. The SAT is testing whether you can read the logic of a sentence and pick the word that fits the meaning, tone, and direction.',
          'You will see about 6 to 8 of these per Reading and Writing section, so mastering them is a quick score boost.',
        ],
        highlight: 'Think of these as logic puzzles, not vocab quizzes.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Cover the Blank and Predict',
        content: [
          'Before you look at the answer choices, read the sentence and come up with your OWN word for the blank.',
          'Ask yourself: is the blank positive or negative? Does it continue the previous idea or contrast it?',
          'Signal words like "although," "despite," and "however" mean the blank goes OPPOSITE to what surrounds it. Words like "because," "and," and "furthermore" mean it CONTINUES the same idea.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Match Your Prediction to the Choices',
        content: [
          'Once you have your own word, scan the four choices and find the closest match.',
          'Usually two choices will be clearly wrong in direction — for example, positive words when you need something negative. Eliminate those first.',
          'Between the remaining two, pick the one that is most precise. The SAT loves words that are specific to the context, not just broadly correct.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 3: Plug It Back In',
        content: [
          'Substitute your answer back into the sentence and read it aloud in your head.',
          'Does it sound natural? Does it match the tone of the passage — formal, scientific, narrative?',
          'If two choices both seem to work, look for the one that fits the EXACT meaning the sentence needs, not just the general vibe.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Beware the "Fancy" Trap',
        content: 'The hardest-sounding word is almost never the right answer just because it sounds impressive. The SAT rewards precision, not complexity. If a simple word like "clear" fits perfectly, choose it over a flashy synonym like "pellucid."',
        highlight: 'Simple and precise beats complicated every time.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Read the sentence, predict your own word, then match it to the choices.',
          'Use signal words like "although" and "because" to determine the direction of the blank.',
          'Eliminate choices that are wrong in direction first, then pick the most precise fit.',
          'Always plug your answer back in and read the full sentence to confirm.',
        ],
      },
    ],
  },

  '2.2': {
    title: 'Text Structure & Purpose',
    slides: [
      {
        type: 'intro',
        title: 'What Are Text Structure Questions?',
        content: [
          'These questions ask you HOW a passage is organized or WHAT PURPOSE a specific sentence or paragraph serves.',
          'You need to see the relationship between ideas: is one sentence supporting the previous claim? Contrasting it? Giving an example?',
          'Common patterns include claim then evidence, problem then solution, general statement then specific detail, and comparison or contrast.',
        ],
        highlight: 'Focus on what each part DOES, not just what it SAYS.',
      },
      {
        type: 'strategy',
        title: 'Identify the Structural Pattern First',
        content: [
          'Before reading the choices, ask: what is the overall structure here?',
          'Is the passage presenting a claim and backing it up? Describing a problem and offering a solution? Comparing two perspectives?',
          'Once you name the pattern, the correct answer usually becomes obvious because it will describe that same pattern.',
        ],
      },
      {
        type: 'strategy',
        title: 'Function Questions: Ask "Why Did the Author Include This?"',
        content: [
          'When a question asks what a sentence or paragraph DOES, think about its job in the passage.',
          'Common functions include: providing evidence, introducing a complication, offering a contrast, establishing context, or qualifying a claim.',
          'The right answer describes the ROLE of the text, not just its content.',
        ],
      },
      {
        type: 'strategy',
        title: 'Avoid Common Traps',
        content: [
          'Too broad answers claim the passage "argues that science is important" when it is specifically about one experiment.',
          'Too narrow answers focus on one detail while ignoring the overall purpose.',
          'Direction reversals say the text "refutes" something when it actually "supports" it. Always verify the direction.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Summarize Each Paragraph in Five Words',
        content: 'As you read, mentally label each paragraph with its job — "introduces the problem," "gives example one," "presents the counterargument." This mental outline makes structure questions almost automatic.',
        highlight: 'If you can name each paragraph\'s job, you can answer any structure question.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Name the structural pattern before reading the answer choices.',
          'Function questions ask about the ROLE of the text, not just what it says.',
          'Watch for answers that are too broad, too narrow, or reverse the direction.',
          'Label each paragraph\'s job while reading to build a mental outline.',
        ],
      },
    ],
  },

  '2.3': {
    title: 'Cross-Text Connections',
    slides: [
      {
        type: 'intro',
        title: 'What Are Cross-Text Questions?',
        content: [
          'These questions give you TWO short texts and ask how they relate to each other.',
          'Usually one text presents a claim or finding, and the other responds — by supporting, challenging, extending, or qualifying that claim.',
          'You need to identify the precise relationship, not just what each text says individually.',
        ],
        highlight: 'Read each text separately first, then compare.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Summarize Each Text\'s Main Point',
        content: [
          'After reading Text 1, write a one-sentence summary of its main claim or argument in your head.',
          'Do the same for Text 2. Keep them separate — don\'t blend them yet.',
          'Now ask: does Text 2 agree, disagree, add a nuance, or take a completely different angle?',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Name the Relationship',
        content: [
          'The most common relationships the SAT tests are: support, challenge, qualify, and extend.',
          '"Support" means Text 2 backs up Text 1 with more evidence or agreement.',
          '"Challenge" means Text 2 disagrees with or undermines Text 1.',
          '"Qualify" means Text 2 says "yes, but..." — it partially agrees while adding a limitation.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Watch for Partial Agreement',
        content: 'The SAT loves answers where one text partially agrees but adds a condition or exception. If both texts seem to agree on the surface, look for the subtle difference — that\'s usually where the correct answer lives.',
        highlight: 'The answer is often in the nuance, not the broad agreement or disagreement.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Summarize each text\'s main point independently before comparing.',
          'Name the relationship: support, challenge, qualify, or extend.',
          'Pay close attention to partial agreement or "yes, but" answers.',
          'Don\'t confuse shared TOPIC with shared POSITION — two texts can discuss the same subject but disagree.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     INFORMATION & IDEAS (3.x)
     ═══════════════════════════════════════════════════════════════ */

  '3.1': {
    title: 'Central Ideas & Literalism',
    slides: [
      {
        type: 'intro',
        title: 'Finding the Central Idea',
        content: [
          'Central idea questions ask you to identify the main point or primary purpose of a passage.',
          'The SAT tests whether you can distinguish the BIG PICTURE from supporting details.',
          'A common trap is picking an answer that is true but too specific — it describes one detail, not the overall point.',
        ],
        highlight: 'The central idea is what the WHOLE passage is mainly about, not just one part.',
      },
      {
        type: 'strategy',
        title: 'The "Newspaper Headline" Test',
        content: [
          'After reading, imagine you had to write a short headline for this passage. What would it say?',
          'That headline is essentially the central idea. It should capture the passage\'s main claim or focus.',
          'If an answer choice could NOT work as the headline, it is either too narrow or too broad.',
        ],
      },
      {
        type: 'strategy',
        title: 'Literalism: Stick to the Text',
        content: [
          'The SAT rewards answers that are directly supported by what the passage says — no outside knowledge needed.',
          'If an answer sounds reasonable but you cannot point to specific lines that support it, it is probably wrong.',
          'Read each choice and ask: "Where in the passage does it say this?" If you can\'t find it, eliminate it.',
        ],
      },
      {
        type: 'strategy',
        title: 'Eliminating Traps',
        content: [
          'Too narrow: mentions a real detail from the passage but misses the overall point.',
          'Too broad: makes a sweeping claim that the passage never fully supports.',
          'Off-topic: introduces an idea the passage never discusses.',
          'Reversed: gets the direction wrong — says the author opposes something they actually support.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: First and Last Sentences Are Gold',
        content: 'The first and last sentences of a passage almost always frame the central idea. If you are running low on time, read those sentences carefully and skim the middle. The main point is rarely buried in paragraph three.',
        highlight: 'First and last sentences usually tell you the central idea.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'The central idea covers the WHOLE passage, not just one detail.',
          'Use the "newspaper headline" test to quickly identify the main point.',
          'Stick to the text — if you can\'t point to where the passage says it, eliminate it.',
          'Watch for answers that are too narrow, too broad, or reversed in direction.',
        ],
      },
    ],
  },

  '3.2': {
    title: 'Command of Evidence: Textual',
    slides: [
      {
        type: 'intro',
        title: 'What Are Textual Evidence Questions?',
        content: [
          'These questions ask you to find the piece of evidence that best supports a given claim, or to identify which claim is best supported by quoted text.',
          'You are essentially matching a conclusion to its proof, or vice versa.',
          'This is one of the most testable skills on the SAT — expect 4 to 6 of these per section.',
        ],
        highlight: 'Evidence questions are about matching claims to proof.',
      },
      {
        type: 'strategy',
        title: 'Read the Claim First, Then Hunt for Support',
        content: [
          'Understand the claim or conclusion you need to support BEFORE looking at the evidence choices.',
          'Restate the claim in your own words: what exactly needs to be proven?',
          'Then evaluate each evidence option: does it directly prove this specific claim, or does it just relate to the same topic?',
        ],
      },
      {
        type: 'strategy',
        title: 'The "Because" Test',
        content: [
          'Try linking the claim and evidence with the word "because." The claim is true BECAUSE the evidence shows...',
          'If the connection feels like a stretch, that evidence is probably not strong enough.',
          'The best evidence directly and specifically supports the claim, not just vaguely relates to it.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Watch for Evidence That\'s True But Irrelevant',
        content: 'The trickiest wrong answers contain accurate information from the passage that simply doesn\'t prove the specific claim in the question. Just because a quote is real doesn\'t mean it is the right evidence for THIS claim.',
        highlight: 'True does not equal relevant. The evidence must prove the specific claim asked about.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Understand the claim first, then look for evidence that directly supports it.',
          'Use the "because" test: the claim is true BECAUSE this evidence shows...',
          'Eliminate evidence that is true but does not specifically prove the claim.',
          'The best evidence is direct and specific, not just loosely related.',
        ],
      },
    ],
  },

  '3.3': {
    title: 'Command of Evidence: Graphs',
    slides: [
      {
        type: 'intro',
        title: 'What Are Graph Evidence Questions?',
        content: [
          'These questions pair a short passage with a graph, table, or chart and ask you to find the data point that supports or contradicts a claim.',
          'You do NOT need to understand the science behind the graph. You just need to read the visual accurately.',
          'The key skill is translating between words in the passage and numbers or trends in the data.',
        ],
        highlight: 'Read the axes, labels, and units before anything else.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Read Labels and Units',
        content: [
          'Before doing anything, identify what the x-axis and y-axis represent, including units.',
          'Check the title or legend to understand what each line, bar, or column shows.',
          'Many wrong answers come from reading the wrong axis or misunderstanding what the graph measures.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Match the Claim to a Specific Data Point',
        content: [
          'Read the claim in the passage, then locate the exact data point the claim describes.',
          'Does the graph actually show what the claim says? Look at the exact numbers, not the general trend.',
          'If the question asks what "supports" the claim, find the data point where the graph agrees with the claim.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 3: Watch for Trends vs. Specific Values',
        content: [
          'Some questions ask about overall trends — is the line going up or down?',
          'Others ask about specific values — what was the exact number at time point X?',
          'Make sure you answer the question that was asked: a trend question needs a trend answer, not a data point.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Use Your Finger',
        content: 'Literally trace the graph with your finger or cursor. Find the x-value first, move up to the line, then read across to the y-axis. This simple physical action prevents the most common graph-reading errors.',
        highlight: 'Trace the graph from x-axis up to the line, then across to the y-axis.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Read all labels, axes, and units before answering.',
          'Match the specific claim to a specific data point or trend in the graph.',
          'Know whether the question asks about a trend or a specific value.',
          'Trace the graph carefully to avoid reading the wrong axis.',
        ],
      },
    ],
  },

  '3.4': {
    title: 'Inferences & Extreme Language',
    slides: [
      {
        type: 'intro',
        title: 'What Are Inference Questions?',
        content: [
          'Inference questions ask you to draw a conclusion that is ONE small step beyond what the text directly says.',
          'The key word is "small" — SAT inferences are cautious and well-supported, never wild leaps.',
          'If an answer feels like a stretch or requires outside knowledge, it is almost certainly wrong.',
        ],
        highlight: 'SAT inferences are small, safe steps — not creative guesses.',
      },
      {
        type: 'strategy',
        title: 'The "Must Be True" Test',
        content: [
          'For any inference question, ask: based ONLY on this passage, MUST this conclusion be true?',
          'If the answer is "probably" or "maybe," it is too speculative for the SAT.',
          'The correct inference feels almost obvious once you see it — it is the unavoidable conclusion from the evidence given.',
        ],
      },
      {
        type: 'strategy',
        title: 'Spotting Extreme Language',
        content: [
          'Words like "always," "never," "all," "none," "only," "completely," and "impossible" are red flags.',
          'The SAT almost never rewards extreme answers. Real-world conclusions are usually hedged and qualified.',
          'Prefer answers with moderate language: "suggests," "may indicate," "is likely," "tends to."',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The Safest Answer Usually Wins',
        content: 'When in doubt between two inference answers, pick the more cautious one. The SAT is designed by careful test writers who avoid absolutes. An answer that says "the data suggests a trend" will almost always beat "the data proves a universal law."',
        highlight: 'Moderate, hedged language is almost always correct on inference questions.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Inferences should be one small step beyond the text, not a creative leap.',
          'Use the "must be true" test — the answer should feel unavoidable from the evidence.',
          'Eliminate answers with extreme language like "always," "never," or "completely."',
          'When torn between two answers, pick the more cautious, hedged option.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     STANDARD ENGLISH CONVENTIONS (4.x)
     ═══════════════════════════════════════════════════════════════ */

  '4.1': {
    title: 'Sentence Boundaries',
    slides: [
      {
        type: 'intro',
        title: 'Why Sentence Boundaries Matter',
        content: [
          'Sentence boundary questions test whether you know where one complete thought ends and another begins.',
          'The three biggest errors are run-on sentences, comma splices, and sentence fragments.',
          'These are among the MOST common grammar questions on the SAT, so nailing them is high-value.',
        ],
        highlight: 'If you can spot a complete sentence, you can ace these questions.',
      },
      {
        type: 'strategy',
        title: 'Find the Subject and Verb on Each Side',
        content: [
          'A complete sentence needs a subject and a verb. If both sides of a punctuation mark have a subject and verb, you have two complete sentences.',
          'Two complete sentences joined by just a comma is a COMMA SPLICE — that is always wrong.',
          'You can fix it with a period, a semicolon, or a comma plus a coordinating conjunction like "and," "but," or "so."',
        ],
      },
      {
        type: 'strategy',
        title: 'Recognizing Fragments',
        content: [
          'A fragment is a group of words that looks like a sentence but is missing a subject, a verb, or a complete thought.',
          'Common fragment starters: "Because," "Although," "Which," "Running down the street." These need to be attached to a complete clause.',
          'If the underlined portion starts with a subordinating word, make sure it is connected to a main clause.',
        ],
      },
      {
        type: 'strategy',
        title: 'The Period Test',
        content: [
          'When in doubt, mentally replace the punctuation with a period.',
          'Can the words on the left stand alone as a sentence? Can the words on the right?',
          'If BOTH sides can stand alone, you need a period, semicolon, or comma-plus-conjunction. If only one side can, use a comma or nothing.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Semicolons Equal Periods',
        content: 'A semicolon works exactly like a period — it separates two complete sentences. If you cannot put a period there, you cannot put a semicolon there either. This eliminates many wrong answers instantly.',
        highlight: 'Semicolons and periods have the same grammar rules.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Two complete sentences joined by only a comma is a comma splice — always wrong.',
          'Fix comma splices with a period, semicolon, or comma plus "and," "but," "so."',
          'Fragments need to be attached to a main clause.',
          'Use the period test: if both sides can stand alone, you need a strong separator.',
        ],
      },
    ],
  },

  '4.2': {
    title: 'Colon & Dash Rules',
    slides: [
      {
        type: 'intro',
        title: 'Colons and Dashes on the SAT',
        content: [
          'The SAT loves testing colons and dashes because students often guess on these. But the rules are simple and absolute.',
          'A colon introduces a list, explanation, or elaboration AFTER a complete sentence.',
          'A dash sets off extra information or creates a dramatic pause. Dashes come in pairs when the info is in the middle of a sentence.',
        ],
        highlight: 'Colons need a complete sentence before them. Period.',
      },
      {
        type: 'strategy',
        title: 'The Colon Rule',
        content: [
          'Rule: the words BEFORE a colon must form a complete sentence. What comes after can be a list, a phrase, or another sentence.',
          'Test it: cover everything after the colon. Can the remaining words stand on their own? If yes, a colon can work.',
          'Common trap: putting a colon after "such as" or "including" — these already introduce the list, so the colon is redundant.',
        ],
      },
      {
        type: 'strategy',
        title: 'The Dash Rules',
        content: [
          'A single dash works like a colon — it introduces extra information after a complete thought.',
          'A PAIR of dashes works like parentheses — they set off non-essential information in the middle of a sentence.',
          'If you see one dash, look for a second one. If the non-essential info is between them, make sure the sentence reads smoothly without it.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The Matching Punctuation Check',
        content: 'If a sentence starts an aside with a dash, it MUST end with a dash — not a comma or nothing. If it starts with a comma, it ends with a comma. Mixed punctuation pairs like "dash... comma" are always wrong on the SAT.',
        highlight: 'Dashes match dashes. Commas match commas. Never mix them.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'A colon requires a complete sentence before it.',
          'Dashes come in pairs when setting off non-essential info mid-sentence.',
          'Matching punctuation: if you open with a dash, close with a dash.',
          'Don\'t put a colon after "such as" or "including."',
        ],
      },
    ],
  },

  '4.3': {
    title: 'Subject-Verb Agreement',
    slides: [
      {
        type: 'intro',
        title: 'Why Agreement Questions Trip People Up',
        content: [
          'Subject-verb agreement is straightforward in concept — a singular subject takes a singular verb — but the SAT hides the subject to make it tricky.',
          'The test separates the subject from the verb with long prepositional phrases, relative clauses, or appositives.',
          'Your job is to find the TRUE subject and ignore everything in between.',
        ],
        highlight: 'The SAT hides the subject. Your job is to find it.',
      },
      {
        type: 'strategy',
        title: 'Cross Out the Interrupting Phrases',
        content: [
          'Mentally cross out prepositional phrases like "of the students," "in the box," "along with his friends."',
          'These phrases describe the subject but are NOT the subject. "The collection OF old maps IS stored..." — the subject is "collection," not "maps."',
          'After crossing out interruptions, the subject and verb should be right next to each other.',
        ],
      },
      {
        type: 'strategy',
        title: 'Tricky Subjects to Watch For',
        content: [
          '"Each," "every," "neither," "either," "anyone," "everyone" — these are ALL singular.',
          '"Neither... nor" and "either... or" match the verb to the CLOSER noun.',
          'Inverted sentences like "Here are the results" flip the order — "results" is the subject, not "here."',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Read Just the Subject and Verb Together',
        content: 'Strip away everything between the subject and the verb, then read them together. "The group... has" sounds right. "The group... have" sounds wrong. Your ear is a powerful tool when the distracting phrases are removed.',
        highlight: 'Remove the middle, hear the match.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Find the TRUE subject by crossing out prepositional phrases and appositives.',
          'Indefinite pronouns like "each" and "everyone" are singular.',
          'With "neither/nor" and "either/or," the verb matches the closer noun.',
          'Strip away interruptions and read just the subject and verb together to check.',
        ],
      },
    ],
  },

  '4.4': {
    title: 'Non-Essential Clauses',
    slides: [
      {
        type: 'intro',
        title: 'What Are Non-Essential Clauses?',
        content: [
          'A non-essential clause adds extra information that could be removed without breaking the sentence.',
          'These clauses are set off by commas, dashes, or parentheses. If you delete them, the core sentence still works.',
          'On the SAT, you need to decide whether information is essential or non-essential to pick the right punctuation.',
        ],
        highlight: 'If you can delete it and the sentence still makes sense, it is non-essential.',
      },
      {
        type: 'strategy',
        title: 'The Delete Test',
        content: [
          'Cross out the clause in question. Does the remaining sentence still make grammatical sense and convey the main point?',
          'If YES, the clause is non-essential and needs commas (or dashes or parentheses) around it.',
          'If NO — the sentence breaks or changes meaning — the clause is essential and should NOT have commas.',
        ],
      },
      {
        type: 'strategy',
        title: '"Which" vs. "That"',
        content: [
          '"Which" usually introduces a non-essential clause: "The book, which was published in 2020, won an award."',
          '"That" usually introduces an essential clause: "The book that she recommended was excellent."',
          'This is a reliable shortcut: "which" gets commas, "that" does not.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Commas Come in Pairs',
        content: 'If a non-essential clause is in the MIDDLE of a sentence, it needs a comma on BOTH sides. A common SAT trap is putting a comma before the clause but not after it, or vice versa. Always check both ends.',
        highlight: 'Non-essential clauses in the middle need commas on BOTH sides.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Non-essential clauses can be deleted without breaking the sentence.',
          'Set them off with commas, dashes, or parentheses.',
          '"Which" clauses are usually non-essential; "that" clauses are usually essential.',
          'In the middle of a sentence, non-essential clauses need punctuation on both sides.',
        ],
      },
    ],
  },

  '4.5': {
    title: 'Apostrophes',
    slides: [
      {
        type: 'intro',
        title: 'Apostrophes: Simpler Than You Think',
        content: [
          'The SAT tests apostrophes to see if you know the difference between possessives and plurals.',
          'An apostrophe shows ownership: "the dog\'s bone." No apostrophe means it is just a plural: "two dogs."',
          'Contractions use apostrophes too: "it\'s" means "it is," while "its" means "belonging to it."',
        ],
        highlight: 'Apostrophe = ownership or contraction. No apostrophe = simple plural.',
      },
      {
        type: 'strategy',
        title: 'The Substitution Test for It\'s vs. Its',
        content: [
          'Replace the word with "it is." If the sentence still makes sense, use "it\'s" (the contraction).',
          'If "it is" doesn\'t work, use "its" (the possessive). Example: "The cat licked its paw" — "it is paw" makes no sense, so no apostrophe.',
          'This same test works for "they\'re/their/there," "you\'re/your," and "who\'s/whose."',
        ],
      },
      {
        type: 'strategy',
        title: 'Singular vs. Plural Possessives',
        content: [
          'Singular possessive: add apostrophe-s. "The student\'s book" means one student owns a book.',
          'Plural possessive: add s-apostrophe. "The students\' books" means multiple students own books.',
          'If the plural form doesn\'t end in s (like "children"), add apostrophe-s: "the children\'s toys."',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: "Whose" Never Gets an Apostrophe',
        content: '"Who\'s" means "who is." "Whose" is the possessive. The SAT uses this to trick you because it LOOKS like a possessive should have an apostrophe. But pronouns like "its," "whose," "theirs," and "ours" never use apostrophes for possession.',
        highlight: 'Possessive pronouns NEVER use apostrophes: its, whose, theirs, ours.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Apostrophe means ownership or contraction — never just a plural.',
          'Use the "it is" substitution test for it\'s versus its.',
          'Singular possessive: apostrophe-s. Plural possessive: s-apostrophe.',
          'Possessive pronouns like "its" and "whose" never have apostrophes.',
        ],
      },
    ],
  },

  '4.6': {
    title: 'Dangling Modifiers',
    slides: [
      {
        type: 'intro',
        title: 'What Is a Dangling Modifier?',
        content: [
          'A dangling modifier is a descriptive phrase that doesn\'t properly connect to the thing it\'s supposed to describe.',
          '"Running down the street, the trees looked beautiful." Who is running? The trees? That is a dangling modifier.',
          'On the SAT, the opening phrase MUST describe the noun that comes right after the comma.',
        ],
        highlight: 'The word right after the comma must be the person or thing doing the action in the opening phrase.',
      },
      {
        type: 'strategy',
        title: 'The "Who Is Doing It?" Test',
        content: [
          'Read the opening phrase and ask: who or what is performing this action?',
          'Then look at the noun immediately after the comma. Is it the same person or thing?',
          'If not, the modifier is dangling. The correct answer will put the right noun right after the comma.',
        ],
      },
      {
        type: 'strategy',
        title: 'Common Patterns to Recognize',
        content: [
          '"Walking through the museum, the paintings impressed the visitors." — Wrong. The paintings weren\'t walking.',
          '"Walking through the museum, the visitors were impressed by the paintings." — Correct. The visitors were walking.',
          'Any sentence that starts with an "-ing" phrase, a "to + verb" phrase, or a past participle phrase can have this error.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Scan for "-ing" Openers',
        content: 'Whenever you see a sentence that starts with a phrase like "Running," "Hoping," "Inspired by," or "Known for," immediately check the noun after the comma. This is the SAT\'s favorite modifier structure to test.',
        highlight: 'See an "-ing" opener? Check the noun right after the comma.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'The noun right after the comma must be the one performing the action in the opening phrase.',
          'Ask "who is doing it?" and make sure that person or thing appears immediately after the comma.',
          'Watch for "-ing" phrases, "to + verb" phrases, and past participle phrases at the start of sentences.',
          'The correct answer always puts the logical subject right after the comma.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     EXPRESSION OF IDEAS (5.x)
     ═══════════════════════════════════════════════════════════════ */

  '5.1': {
    title: 'Rhetorical Synthesis',
    slides: [
      {
        type: 'intro',
        title: 'What Is Rhetorical Synthesis?',
        content: [
          'These questions give you bullet points of information and a writing goal, then ask which sentence best achieves that goal.',
          'You need to combine the right pieces of information in the right way for the stated purpose.',
          'This is about writing strategy — choosing what to include and how to frame it based on the audience and purpose.',
        ],
        highlight: 'Read the goal statement carefully before evaluating the choices.',
      },
      {
        type: 'strategy',
        title: 'Step 1: Identify the Goal',
        content: [
          'The question will say something like "to emphasize the practical benefits" or "to introduce the topic to a general audience."',
          'Underline or highlight the specific goal. Every word matters — "emphasize" is different from "introduce," and "practical" is different from "historical."',
          'The correct answer must serve THIS specific goal, not just be grammatically correct or factually accurate.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 2: Match Information to Purpose',
        content: [
          'Look at which bullet points each answer choice includes. Does it pick the RIGHT details for the stated purpose?',
          'If the goal is to emphasize cost savings, the answer should mention financial data, not historical background.',
          'If the goal is to introduce the topic, the answer should give a broad overview, not dive into technical details.',
        ],
      },
      {
        type: 'strategy',
        title: 'Step 3: Check the Framing',
        content: [
          'Two answers might include the same information but frame it differently.',
          'The framing should match the purpose. "Researchers discovered" is neutral and informative. "Researchers were amazed to discover" adds emphasis.',
          'Make sure the tone and structure of the sentence match what the goal asks for.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The Goal is Non-Negotiable',
        content: 'Students often pick the "best-written" sentence instead of the one that achieves the stated goal. A beautifully written sentence that serves the wrong purpose is a wrong answer. Always go back to the goal statement.',
        highlight: 'The best answer is the one that achieves the GOAL, not the prettiest sentence.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Read and underline the specific goal before evaluating answer choices.',
          'Match the information in each choice to the stated purpose.',
          'Check that the framing and tone match the goal.',
          'A well-written sentence is wrong if it doesn\'t serve the stated purpose.',
        ],
      },
    ],
  },

  '5.2': {
    title: 'Transitions: The Family Tree',
    slides: [
      {
        type: 'intro',
        title: 'Transitions on the SAT',
        content: [
          'Transition questions ask you to pick the word or phrase that logically connects two ideas.',
          'The SAT tests about 4 to 6 transition questions per Reading and Writing section, making this a high-frequency topic.',
          'The key is understanding the RELATIONSHIP between the sentences — not just picking a transition that sounds smooth.',
        ],
        highlight: 'Name the relationship first, then pick the transition.',
      },
      {
        type: 'strategy',
        title: 'The Four Transition Families',
        content: [
          'CONTINUATION: "Furthermore," "Moreover," "In addition," "Similarly." Use when the second sentence adds to or agrees with the first.',
          'CONTRAST: "However," "Nevertheless," "On the other hand," "In contrast." Use when the second sentence goes against the first.',
          'CAUSE/EFFECT: "Therefore," "As a result," "Consequently," "Thus." Use when the second sentence is the outcome of the first.',
          'EXAMPLE: "For instance," "For example," "Specifically." Use when the second sentence illustrates the first.',
        ],
      },
      {
        type: 'strategy',
        title: 'The "Cover and Predict" Method',
        content: [
          'Cover the transition and read the sentence before and after. What is the logical relationship?',
          'Say the relationship in one word: "contrast," "result," "example," "addition."',
          'Then find the transition from the right family. If the relationship is contrast, only "however" or "nevertheless" type words can work.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: "However" Is the Most Tested Transition',
        content: 'On average, "However" or its cousins appear more than any other transition family. If the sentence before is positive and the sentence after is negative (or vice versa), the answer is almost always a contrast word.',
        highlight: 'When the direction changes, reach for "However."',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Name the relationship (continuation, contrast, cause/effect, example) before picking a transition.',
          'Use the "cover and predict" method — cover the transition and identify the logic.',
          'Transitions from the wrong family are always wrong, no matter how smooth they sound.',
          'Contrast transitions like "However" are the most commonly tested.',
        ],
      },
    ],
  },

  '5.3': {
    title: 'Concision (Shorter is Better)',
    slides: [
      {
        type: 'intro',
        title: 'Why Concision Matters',
        content: [
          'The SAT almost always rewards the SHORTEST grammatically correct answer that preserves the meaning.',
          'If two choices say the same thing but one uses fewer words, the shorter one is usually right.',
          'Wordiness, redundancy, and unnecessary phrases are the main targets.',
        ],
        highlight: 'When in doubt, pick the shortest answer that keeps the meaning.',
      },
      {
        type: 'strategy',
        title: 'Spotting Redundancy',
        content: [
          'Redundancy means saying the same thing twice: "free gift," "advance planning," "final conclusion."',
          'On the SAT, this often shows up as "The reason is because..." (say "The reason is that..." or just "because") or "In my personal opinion..." (just "In my opinion").',
          'If removing words doesn\'t change the meaning, those words are redundant.',
        ],
      },
      {
        type: 'strategy',
        title: 'Eliminating Filler Phrases',
        content: [
          'Phrases like "in order to" can usually be shortened to "to."',
          '"Due to the fact that" means "because." "At this point in time" means "now."',
          'The SAT tests whether you can spot these inflated phrases and choose the direct alternative.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The Shortest Answer Heuristic',
        content: 'About 70 percent of the time, the shortest grammatically correct answer is right on concision questions. Start there and only move to a longer option if the short one genuinely loses meaning or creates a grammar error.',
        highlight: 'Start with the shortest answer and work up.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'The SAT rewards concise writing — shorter is almost always better.',
          'Look for redundancy: words that repeat an idea already expressed.',
          'Replace filler phrases with their shorter equivalents.',
          'Default to the shortest answer unless it changes the meaning or breaks grammar.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     DESMOS HACKS (6.x)
     ═══════════════════════════════════════════════════════════════ */

  '6.1': {
    title: 'Desmos Regression (Free Points)',
    slides: [
      {
        type: 'intro',
        title: 'Desmos Is Your Secret Weapon',
        content: [
          'The digital SAT gives you a built-in Desmos graphing calculator. Most students barely use it, but it can solve problems instantly.',
          'Regression means fitting an equation to data points. When the SAT gives you a table of values and asks for the equation, Desmos can find it for you.',
          'This is literally free points if you know the steps.',
        ],
        highlight: 'Desmos can solve certain SAT math problems in under 30 seconds.',
      },
      {
        type: 'strategy',
        title: 'How to Enter a Regression in Desmos',
        content: [
          'Step 1: Click the "+" button and choose "table." Enter your x and y values from the problem.',
          'Step 2: In a new line below the table, type the regression model. For linear, type y1 ~ mx1 + b. For quadratic, type y1 ~ ax1^2 + bx1 + c.',
          'Step 3: Desmos will show you the values of the coefficients. Match them to the answer choices.',
        ],
      },
      {
        type: 'strategy',
        title: 'When to Use Regression',
        content: [
          'Use it whenever the problem gives you a data table and asks which equation fits.',
          'Use it for "best fit" questions where you need to find the line or curve through data points.',
          'Even if the problem seems like it should be solved algebraically, regression is often faster and more reliable.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Practice Before Test Day',
        content: 'Go to desmos.com/calculator right now and practice entering a table and running a regression. The SAT Desmos has the same features. If you practice five times before the test, you will be fast enough to use it under pressure.',
        highlight: 'Practice Desmos regressions at desmos.com before test day.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Desmos is built into the digital SAT and can solve data-fitting problems instantly.',
          'Enter data in a table, then type the regression formula to get coefficients.',
          'Use regression whenever a problem gives data and asks for the equation.',
          'Practice at desmos.com before the test so you are fast under pressure.',
        ],
      },
    ],
  },

  '6.2': {
    title: 'Desmos: Systems & Intersections',
    slides: [
      {
        type: 'intro',
        title: 'Solving Systems Visually with Desmos',
        content: [
          'When the SAT asks you to solve a system of equations, you can type both equations into Desmos and find where they intersect.',
          'The intersection point gives you the solution — the x and y values that satisfy both equations.',
          'This works for linear systems, line-and-curve systems, and even some word problems you translate into equations.',
        ],
        highlight: 'Type both equations into Desmos, click the intersection, read the answer.',
      },
      {
        type: 'strategy',
        title: 'Step-by-Step: Finding Intersections',
        content: [
          'Type equation 1 into line 1 of Desmos. Type equation 2 into line 2.',
          'Look for where the graphs cross. Click on the intersection point — Desmos will show the exact coordinates.',
          'If the question asks for just x or just y, read only the coordinate you need.',
        ],
      },
      {
        type: 'strategy',
        title: 'When to Use This',
        content: [
          'Systems of two linear equations: always graphable in Desmos.',
          'A linear equation meeting a quadratic: Desmos shows both intersection points clearly.',
          'Word problems that translate to two equations: set up the equations first, then graph them.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Use Desmos to Check, Not Just Solve',
        content: 'Even if you solve a system algebraically, plug both equations into Desmos to verify your answer. It takes five seconds and catches arithmetic mistakes that could cost you points.',
        highlight: 'Desmos is both a solver AND a checker.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Graph both equations in Desmos and click the intersection point.',
          'Works for linear systems, line-curve systems, and translated word problems.',
          'Always use Desmos to verify algebraic solutions — it catches careless errors.',
          'Read only the coordinate the question asks for.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     HEART OF ALGEBRA (7.x)
     ═══════════════════════════════════════════════════════════════ */

  '7.1': {
    title: 'Linear Equations (y = mx + b)',
    slides: [
      {
        type: 'intro',
        title: 'Linear Equations Are Everywhere',
        content: [
          'Linear equations are the MOST tested math topic on the SAT. You will see them in direct algebra questions, word problems, and graph interpretation.',
          'The slope-intercept form y = mx + b tells you two things: m is the rate of change, and b is the starting value.',
          'Mastering this topic is non-negotiable for a strong math score.',
        ],
        highlight: 'Slope = rate of change. Y-intercept = starting value.',
      },
      {
        type: 'strategy',
        title: 'Translating Word Problems to y = mx + b',
        content: [
          'Look for the "per" word — dollars per hour, miles per gallon, points per game. That is your slope (m).',
          'Look for a fixed starting amount — an initial fee, a base price, a starting balance. That is your y-intercept (b).',
          'Example: "A gym charges a $50 sign-up fee plus $30 per month." The equation is y = 30x + 50.',
        ],
      },
      {
        type: 'strategy',
        title: 'Finding Slope from Two Points',
        content: [
          'Slope = rise over run = (y2 - y1) / (x2 - x1).',
          'Always subtract in the same order. If you do y2 - y1 on top, do x2 - x1 on the bottom.',
          'A positive slope means the line goes up from left to right. A negative slope means it goes down.',
        ],
      },
      {
        type: 'strategy',
        title: 'Solving Linear Equations',
        content: [
          'Goal: get the variable alone on one side. Use inverse operations: add/subtract first, then multiply/divide.',
          'If there are variables on both sides, move them to one side first.',
          'Always check your answer by plugging it back into the original equation.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Plug In the Answer Choices',
        content: 'If the question gives you an equation and four possible values of x, just substitute each answer choice into the equation. The one that makes both sides equal is correct. This is faster than solving when the algebra looks messy.',
        highlight: 'Substituting answer choices is sometimes faster than solving.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'y = mx + b: m is the rate, b is the starting value.',
          'Translate word problems by identifying the "per" rate and the fixed starting amount.',
          'Slope = (y2 - y1) / (x2 - x1). Subtract in the same order.',
          'When stuck, plug answer choices back into the equation.',
        ],
      },
    ],
  },

  '7.2': {
    title: 'Systems of Linear Equations',
    slides: [
      {
        type: 'intro',
        title: 'What Are Systems of Equations?',
        content: [
          'A system is two or more equations with the same variables. The solution is the values that make ALL equations true at the same time.',
          'The SAT tests three main scenarios: one solution (the lines cross), no solution (parallel lines), and infinite solutions (same line).',
          'You need to know when to use substitution, when to use elimination, and what the special cases mean.',
        ],
        highlight: 'One solution, no solution, or infinite solutions — know how to identify each.',
      },
      {
        type: 'strategy',
        title: 'Substitution Method',
        content: [
          'Use substitution when one equation already has a variable isolated, like y = 3x + 2.',
          'Replace that variable in the other equation and solve.',
          'Example: if y = 3x + 2 and 2x + y = 12, replace y: 2x + (3x + 2) = 12, so 5x = 10, x = 2.',
        ],
      },
      {
        type: 'strategy',
        title: 'Elimination Method',
        content: [
          'Use elimination when you can add or subtract the equations to cancel a variable.',
          'Multiply one or both equations so the coefficients of one variable are opposites, then add.',
          'Example: 3x + 2y = 10 and 3x - y = 4. Subtract the second from the first: 3y = 6, so y = 2.',
        ],
      },
      {
        type: 'strategy',
        title: 'No Solution vs. Infinite Solutions',
        content: [
          'No solution: the equations give parallel lines — same slope, different intercepts. You get something like 0 = 5 when solving.',
          'Infinite solutions: the equations are the same line — simplify one and it becomes the other. You get 0 = 0.',
          'The SAT often asks "for what value of k does the system have no solution?" Make the slopes equal and intercepts different.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Use Desmos for Backup',
        content: 'If the algebra gets messy or you want to verify, graph both equations in Desmos. The intersection point is the solution. No intersection means no solution. Lines on top of each other means infinite solutions.',
        highlight: 'Desmos shows the solution visually — great for checking your work.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Use substitution when a variable is already isolated; use elimination when coefficients are convenient.',
          'No solution = same slope, different intercept (parallel lines).',
          'Infinite solutions = same line (identical equations).',
          'Graph in Desmos to verify your algebraic solution.',
        ],
      },
    ],
  },

  '7.3': {
    title: 'Linear Inequalities',
    slides: [
      {
        type: 'intro',
        title: 'Inequalities: Equations with a Twist',
        content: [
          'Linear inequalities work exactly like linear equations with one critical exception: if you multiply or divide by a negative number, you FLIP the inequality sign.',
          'On the SAT, inequality questions show up in both algebra problems and real-world contexts like budgets, constraints, and ranges.',
          'You may also need to graph inequalities on a number line or coordinate plane.',
        ],
        highlight: 'Multiply or divide by a negative? Flip the sign.',
      },
      {
        type: 'strategy',
        title: 'Solving Inequalities',
        content: [
          'Solve just like an equation: isolate the variable using inverse operations.',
          'When you multiply or divide both sides by a negative number, flip the direction of the inequality.',
          'Example: -3x > 12. Divide both sides by -3 and flip: x < -4.',
        ],
      },
      {
        type: 'strategy',
        title: 'Word Problem Inequalities',
        content: [
          '"At most" or "no more than" means less than or equal to (<=).',
          '"At least" or "no fewer than" means greater than or equal to (>=).',
          'Set up the inequality by translating the constraint, then solve. Example: "A student needs at least 80 points" means score >= 80.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Test a Number',
        content: 'After solving, pick a number in your solution range and plug it into the original inequality. If it works, you are on the right track. If not, you probably forgot to flip the sign.',
        highlight: 'Always test your answer by plugging in a number from your solution set.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Solve inequalities like equations, but flip the sign when multiplying or dividing by a negative.',
          '"At most" means <=. "At least" means >=.',
          'Test your solution by substituting a number from the solution range.',
          'On graphs, dashed lines mean strict inequality (<, >); solid lines include the boundary.',
        ],
      },
    ],
  },

  '7.4': {
    title: 'Absolute Value Equations',
    slides: [
      {
        type: 'intro',
        title: 'What Absolute Value Means',
        content: [
          'Absolute value is the distance from zero on a number line. It is always positive or zero.',
          '|x| = 5 means x could be 5 or -5, because both are 5 units from zero.',
          'On the SAT, absolute value questions usually have TWO solutions. Forgetting the negative case is the most common mistake.',
        ],
        highlight: 'Absolute value creates TWO cases: positive and negative.',
      },
      {
        type: 'strategy',
        title: 'Solving Absolute Value Equations',
        content: [
          'Step 1: Isolate the absolute value expression on one side.',
          'Step 2: Set up two equations — one where the inside equals the positive value, and one where it equals the negative value.',
          'Example: |2x - 3| = 7 becomes 2x - 3 = 7 (so x = 5) AND 2x - 3 = -7 (so x = -2). Both are solutions.',
        ],
      },
      {
        type: 'strategy',
        title: 'Watch for "No Solution" Cases',
        content: [
          'If the absolute value equals a negative number, there is NO solution. |x| = -3 is impossible.',
          'If you solve and get a result like |x - 2| = -5, stop immediately — the answer is "no solution."',
          'The SAT will sometimes set up an equation that simplifies to this as a trap.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Check Both Solutions',
        content: 'After finding both solutions, plug each one back into the ORIGINAL equation. Sometimes one solution is extraneous — it was created by the algebra but doesn\'t actually satisfy the original equation.',
        highlight: 'Always verify both solutions in the original equation.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Absolute value creates two cases: positive and negative.',
          'Isolate the absolute value first, then split into two equations.',
          'If the absolute value equals a negative number, there is no solution.',
          'Check both solutions by substituting back into the original equation.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     PROBLEM SOLVING & DATA (8.x)
     ═══════════════════════════════════════════════════════════════ */

  '8.1': {
    title: 'Percentages & Multiplier Method',
    slides: [
      {
        type: 'intro',
        title: 'Percentages Show Up Constantly',
        content: [
          'Percent questions appear in both the math section and in data interpretation. You need to be fast and accurate.',
          'The biggest game-changer is the MULTIPLIER METHOD — it replaces clunky multi-step calculations with one multiplication.',
          'Once you learn it, percent increase, decrease, tax, discount, and compound growth all use the same approach.',
        ],
        highlight: 'The multiplier method turns every percent problem into one multiplication.',
      },
      {
        type: 'strategy',
        title: 'The Multiplier Method',
        content: [
          'A 20% increase means you keep 100% and add 20%, so the multiplier is 1.20.',
          'A 15% decrease means you keep 100% and subtract 15%, so the multiplier is 0.85.',
          'To find the result: just multiply the original by the multiplier. $200 with a 20% increase = 200 × 1.20 = $240.',
        ],
      },
      {
        type: 'strategy',
        title: 'Finding Percent Change',
        content: [
          'Percent change = (new - original) / original × 100.',
          'Always divide by the ORIGINAL value, not the new value. This is a common trap.',
          'If the answer is positive, it is an increase. If negative, it is a decrease.',
        ],
      },
      {
        type: 'strategy',
        title: 'Stacking Multipliers',
        content: [
          'For multiple percent changes, multiply the multipliers together. Do NOT add the percentages.',
          'A 10% increase then a 10% decrease: 1.10 × 0.90 = 0.99. That is a 1% net decrease, NOT zero.',
          'This is how compound interest works too: multiply the multiplier for each period.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: "Of" Means "Times"',
        content: 'When the SAT says "30% of 80," it means 0.30 × 80 = 24. The word "of" in math almost always means multiplication. This shortcut works for every percent-of question.',
        highlight: '"Of" means multiply.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'The multiplier method: increase of 20% = multiply by 1.20; decrease of 15% = multiply by 0.85.',
          'Percent change = (new - original) / original × 100. Divide by the ORIGINAL.',
          'Stack multipliers for successive changes — don\'t add percentages.',
          '"Of" means multiply: 30% of 80 = 0.30 × 80.',
        ],
      },
    ],
  },

  '8.2': {
    title: 'Ratios, Rates & Proportions',
    slides: [
      {
        type: 'intro',
        title: 'Ratios and Proportions on the SAT',
        content: [
          'Ratio and proportion problems test whether you can set up relationships between quantities and solve them.',
          'A ratio compares two quantities. A proportion says two ratios are equal.',
          'These problems show up in word contexts like recipes, maps, scale models, and speed calculations.',
        ],
        highlight: 'Set up the proportion carefully, then cross-multiply.',
      },
      {
        type: 'strategy',
        title: 'Setting Up Proportions',
        content: [
          'Make sure both ratios compare the SAME things in the SAME order.',
          'If the first ratio is miles/hours, the second ratio must also be miles/hours.',
          'Example: "If 3 workers paint 12 walls, how many walls can 7 workers paint?" Set up 3/12 = 7/x and cross-multiply.',
        ],
      },
      {
        type: 'strategy',
        title: 'Part-to-Part vs. Part-to-Whole',
        content: [
          'If a mixture is "3 parts red to 5 parts blue," the total is 8 parts.',
          'Red is 3/8 of the total, not 3/5. Blue is 5/8 of the total, not 5/3.',
          'The SAT will try to trick you by asking for a part-to-whole ratio when the problem gives part-to-part.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Label Your Units',
        content: 'Write units next to every number in your proportion. "Miles/hour = miles/hour" helps you catch setup errors before you waste time solving. If the units don\'t match, your proportion is wrong.',
        highlight: 'Label units on both sides of the proportion to catch errors.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Set up proportions with matching units in the same order on both sides.',
          'Cross-multiply to solve: a/b = c/d means ad = bc.',
          'Part-to-part is different from part-to-whole — add the parts for the total.',
          'Label units on every number to catch setup mistakes.',
        ],
      },
    ],
  },

  '8.3': {
    title: 'Unit Conversions',
    slides: [
      {
        type: 'intro',
        title: 'Unit Conversion Questions',
        content: [
          'These problems ask you to convert between units — feet to inches, hours to minutes, miles per hour to feet per second.',
          'The SAT gives you the conversion factors. You do NOT need to memorize them.',
          'The key skill is setting up a chain of fractions so that units cancel properly.',
        ],
        highlight: 'Set up your fractions so unwanted units cancel out.',
      },
      {
        type: 'strategy',
        title: 'The Fraction Chain Method',
        content: [
          'Write your starting value as a fraction. Then multiply by conversion fractions that cancel the units you want to get rid of.',
          'Example: Convert 60 miles per hour to miles per minute. Start with 60 miles/1 hour × 1 hour/60 minutes = 1 mile per minute.',
          'The unit you want to cancel should appear in the opposite position (numerator vs. denominator).',
        ],
      },
      {
        type: 'strategy',
        title: 'Multi-Step Conversions',
        content: [
          'Some problems require two or three conversion steps. Just keep chaining fractions.',
          'Example: meters per second to kilometers per hour needs two conversions: meters to kilometers AND seconds to hours.',
          'Write out all fractions before multiplying so you can visually check that units cancel.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Draw a Line Through Cancelled Units',
        content: 'Physically draw a line through each unit that appears in both a numerator and denominator. The only units left should be the ones the question asks for. If something else is left, you set up a fraction upside-down.',
        highlight: 'Cross out cancelled units — the surviving units should match the answer.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Set up conversion fractions so unwanted units cancel.',
          'Place units you want to cancel in the opposite position.',
          'Chain multiple conversion fractions for multi-step problems.',
          'Cross out cancelled units to verify your setup before multiplying.',
        ],
      },
    ],
  },

  '8.4': {
    title: 'Statistics: Mean/Median/SD',
    slides: [
      {
        type: 'intro',
        title: 'Statistics on the SAT',
        content: [
          'The SAT tests basic statistical concepts: mean, median, range, and standard deviation.',
          'You need to know the definitions, how changes to data affect each measure, and how to read data from tables or graphs.',
          'You will NOT need to calculate standard deviation by hand — just understand what it means.',
        ],
        highlight: 'Know the concepts and how changes to data affect each measure.',
      },
      {
        type: 'strategy',
        title: 'Mean vs. Median: When They Differ',
        content: [
          'Mean is the sum divided by the count. Median is the middle value when data is sorted.',
          'Outliers affect the mean much more than the median. If a data set has one extreme value, the mean shifts but the median may barely change.',
          'The SAT loves asking "which measure better represents the data" — if there are outliers, the median is usually more representative.',
        ],
      },
      {
        type: 'strategy',
        title: 'How Changes Affect the Mean',
        content: [
          'Adding a value higher than the mean increases the mean. Adding one lower decreases it.',
          'Removing an outlier brings the mean closer to the center of the remaining data.',
          'To find a missing value when you know the mean: mean × count = total sum. Use this to solve backward.',
        ],
      },
      {
        type: 'strategy',
        title: 'Standard Deviation: What It Means',
        content: [
          'Standard deviation measures how spread out the data is. A LARGER SD means more spread; a SMALLER SD means data is clustered near the mean.',
          'You will not calculate SD on the SAT. Instead, you will compare data sets: which is more spread out?',
          'If all values are moved by the same amount (like adding 10 to every score), the SD does NOT change. Only spreading changes SD.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The "Shift vs. Spread" Rule',
        content: 'Adding the same number to every data point SHIFTS the mean but does NOT change the standard deviation or range. Multiplying every data point by a constant changes BOTH the mean AND the SD. This distinction is tested regularly.',
        highlight: 'Shifting data changes the mean. Spreading data changes the SD.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Mean = sum / count. Median = middle value.',
          'Outliers affect the mean more than the median.',
          'Standard deviation measures spread — larger SD means more spread out.',
          'Adding a constant to all values shifts the mean but doesn\'t change the SD.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     ADVANCED MATH (9.x)
     ═══════════════════════════════════════════════════════════════ */

  '9.1': {
    title: 'Quadratics: The Three Forms',
    slides: [
      {
        type: 'intro',
        title: 'Quadratics Are a Major SAT Topic',
        content: [
          'Quadratic equations come in three forms, and each form reveals different information.',
          'The SAT tests whether you can recognize each form and extract the information it gives you — without converting if possible.',
          'Knowing which form to use for which question is the key to saving time.',
        ],
        highlight: 'Each quadratic form reveals different information. Know all three.',
      },
      {
        type: 'strategy',
        title: 'Standard Form: y = ax² + bx + c',
        content: [
          'Standard form immediately shows the y-intercept: it is c, the constant term.',
          'You can find the x-value of the vertex with x = -b/(2a).',
          'To find the roots, you need to factor or use the quadratic formula.',
        ],
      },
      {
        type: 'strategy',
        title: 'Factored Form: y = a(x - r)(x - s)',
        content: [
          'Factored form immediately shows the roots (x-intercepts): x = r and x = s.',
          'The vertex x-value is the average of the roots: x = (r + s) / 2.',
          'Use this form when the problem asks about zeros, roots, or x-intercepts.',
        ],
      },
      {
        type: 'strategy',
        title: 'Vertex Form: y = a(x - h)² + k',
        content: [
          'Vertex form immediately shows the vertex: (h, k).',
          'The vertex is the maximum or minimum point. If a > 0, it is a minimum. If a < 0, it is a maximum.',
          'Use this form when the problem asks about the maximum, minimum, or vertex.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Match the Form to the Question',
        content: 'Before doing any algebra, read the question. Does it ask for roots? Use factored form. Y-intercept? Standard form. Maximum or minimum? Vertex form. Picking the right form can save you from converting, which is the biggest time waster.',
        highlight: 'Roots = factored form. Y-intercept = standard form. Vertex = vertex form.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Standard form reveals the y-intercept (c) and lets you use the quadratic formula.',
          'Factored form reveals the roots and makes finding the vertex easy.',
          'Vertex form reveals the maximum or minimum directly.',
          'Match the form to what the question asks — don\'t convert unless necessary.',
        ],
      },
    ],
  },

  '9.2': {
    title: 'The Discriminant (Δ = b² - 4ac)',
    slides: [
      {
        type: 'intro',
        title: 'The Discriminant Tells You How Many Solutions Exist',
        content: [
          'The discriminant is the expression under the square root in the quadratic formula: b² - 4ac.',
          'It tells you how many real solutions (x-intercepts) a quadratic equation has — without actually solving.',
          'This is a quick, powerful tool that the SAT tests directly.',
        ],
        highlight: 'Discriminant > 0: two solutions. = 0: one solution. < 0: no real solutions.',
      },
      {
        type: 'strategy',
        title: 'The Three Cases',
        content: [
          'If b² - 4ac > 0: the quadratic has TWO distinct real solutions (the parabola crosses the x-axis twice).',
          'If b² - 4ac = 0: the quadratic has exactly ONE real solution (the parabola just touches the x-axis).',
          'If b² - 4ac < 0: the quadratic has NO real solutions (the parabola never touches the x-axis).',
        ],
      },
      {
        type: 'strategy',
        title: 'Common SAT Applications',
        content: [
          '"For what values of k does the equation have no real solutions?" Set b² - 4ac < 0 and solve for k.',
          '"The equation has exactly one solution. What is the value of c?" Set b² - 4ac = 0 and solve for c.',
          'These problems look scary but are just plugging into b² - 4ac and solving an inequality or equation.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Memorize the Formula',
        content: 'b² - 4ac. That is it. Three numbers, one subtraction, one multiplication. Write it at the top of your scratch paper before the math section starts. It is easy to mix up with the full quadratic formula when under pressure.',
        highlight: 'Write b² - 4ac on your scratch paper before you start.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'The discriminant is b² - 4ac from the quadratic formula.',
          'Positive = two real solutions. Zero = one solution. Negative = no real solutions.',
          'Set up discriminant inequalities or equations when asked about the number of solutions.',
          'Memorize the formula — it is short and high-value.',
        ],
      },
    ],
  },

  '9.3': {
    title: 'Exponential Functions',
    slides: [
      {
        type: 'intro',
        title: 'Exponential Growth and Decay',
        content: [
          'Exponential functions model situations where a quantity multiplies by a constant factor over equal time intervals.',
          'The general form is y = a · bˣ, where a is the initial value and b is the growth or decay factor.',
          'If b > 1, it is growth. If 0 < b < 1, it is decay.',
        ],
        highlight: 'b > 1 means growth. 0 < b < 1 means decay.',
      },
      {
        type: 'strategy',
        title: 'Translating Word Problems',
        content: [
          '"A population doubles every 3 years" means the factor is 2 and the period is 3 years.',
          'The equation would be y = a · 2^(t/3), where a is the starting population.',
          '"Loses 10% of its value each year" means the factor is 0.90. The equation is y = a · (0.90)^t.',
        ],
      },
      {
        type: 'strategy',
        title: 'Reading Exponential Graphs',
        content: [
          'Exponential growth curves go up steeply — they start slow and then accelerate.',
          'Exponential decay curves start high and drop toward zero but never reach it.',
          'The y-intercept of y = a · bˣ is always a (plug in x = 0).',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Growth Factor = 1 + Rate',
        content: 'A 5% annual increase means the growth factor is 1.05, not 5 or 0.05. A 5% decrease is 0.95. Students frequently forget to add or subtract from 1. Always ask: "What fraction of the original amount remains after each period?"',
        highlight: 'Growth factor = 1 + rate. Decay factor = 1 - rate.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Exponential form: y = a · bˣ. a = initial value, b = growth/decay factor.',
          'b > 1 is growth; 0 < b < 1 is decay.',
          'Translate word problems by finding the initial value and the factor per period.',
          'Growth factor = 1 + rate. Decay factor = 1 - rate.',
        ],
      },
    ],
  },

  '9.4': {
    title: 'Operations with Polynomials',
    slides: [
      {
        type: 'intro',
        title: 'Polynomial Operations on the SAT',
        content: [
          'The SAT tests adding, subtracting, multiplying, and factoring polynomials.',
          'These problems require careful attention to signs and exponent rules.',
          'The most common polynomial question involves multiplying two binomials or factoring a quadratic.',
        ],
        highlight: 'Stay organized with signs and exponents — that is where errors hide.',
      },
      {
        type: 'strategy',
        title: 'Adding and Subtracting Polynomials',
        content: [
          'Combine LIKE TERMS only — terms with the same variable and the same exponent.',
          '3x² + 5x² = 8x², but 3x² + 5x cannot be combined because the exponents are different.',
          'When subtracting, distribute the negative sign to every term in the second polynomial: (4x² + 3x) - (2x² - x) = 4x² + 3x - 2x² + x = 2x² + 4x.',
        ],
      },
      {
        type: 'strategy',
        title: 'Multiplying Polynomials',
        content: [
          'Use FOIL for two binomials: (a + b)(c + d) = ac + ad + bc + bd.',
          'For larger polynomials, multiply each term in the first by every term in the second.',
          'When multiplying, ADD the exponents: x² · x³ = x⁵.',
        ],
      },
      {
        type: 'strategy',
        title: 'Factoring Strategies',
        content: [
          'Always look for a Greatest Common Factor first.',
          'For quadratics x² + bx + c, find two numbers that multiply to c and add to b.',
          'Difference of squares: a² - b² = (a + b)(a - b). This pattern appears frequently.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Check by Expanding',
        content: 'After factoring, multiply your factors back together to verify you get the original expression. This takes 15 seconds and catches sign errors that are easy to make under test pressure.',
        highlight: 'Factor, then expand to check. It catches sign errors instantly.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Combine like terms when adding or subtracting. Watch the negative sign when subtracting.',
          'Use FOIL for binomial multiplication. Add exponents when multiplying.',
          'Factor by finding a GCF first, then using appropriate patterns.',
          'Always check by expanding your factored form back to the original.',
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     GEOMETRY & TRIG (10.x)
     ═══════════════════════════════════════════════════════════════ */

  '10.1': {
    title: 'Lines & Angles',
    slides: [
      {
        type: 'intro',
        title: 'Lines and Angles on the SAT',
        content: [
          'Geometry questions on the SAT test basic angle relationships: supplementary, complementary, vertical, and angles formed by parallel lines.',
          'You need to know these relationships cold so you can set up equations quickly.',
          'The SAT provides a reference sheet with formulas, but angle relationships are NOT on it — you need to memorize them.',
        ],
        highlight: 'Memorize angle relationships. They are not on the reference sheet.',
      },
      {
        type: 'strategy',
        title: 'Core Angle Facts',
        content: [
          'Supplementary angles add up to 180 degrees (they form a straight line).',
          'Complementary angles add up to 90 degrees.',
          'Vertical angles are equal — they are across from each other when two lines cross.',
        ],
      },
      {
        type: 'strategy',
        title: 'Parallel Lines Cut by a Transversal',
        content: [
          'When a line crosses two parallel lines, it creates eight angles. You only need to know two values because the angles come in two groups.',
          'Corresponding angles (same position at each intersection) are equal.',
          'Alternate interior angles (opposite sides between the parallels) are equal.',
          'Same-side interior angles add to 180 degrees.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Label Every Angle',
        content: 'On the SAT, if a diagram shows parallel lines and a transversal, immediately label all eight angles. Use the vertical angle rule and corresponding angle rule to fill in values. Once labeled, the question usually answers itself.',
        highlight: 'Label all eight angles immediately — the answer falls out.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Supplementary = 180 degrees. Complementary = 90 degrees. Vertical angles are equal.',
          'With parallel lines: corresponding angles are equal, alternate interior angles are equal.',
          'Same-side interior angles are supplementary (add to 180).',
          'Label all angles in the diagram before trying to solve.',
        ],
      },
    ],
  },

  '10.2': {
    title: 'Triangles',
    slides: [
      {
        type: 'intro',
        title: 'Triangle Rules You Must Know',
        content: [
          'Triangles are the most commonly tested geometry shape on the SAT.',
          'The angles of a triangle always add to 180 degrees. This single fact solves many problems.',
          'You also need to know the Pythagorean theorem, special right triangles, and similar triangle ratios.',
        ],
        highlight: 'Triangle angles sum to 180. Pythagorean theorem: a² + b² = c².',
      },
      {
        type: 'strategy',
        title: 'The Pythagorean Theorem',
        content: [
          'For right triangles: a² + b² = c², where c is the hypotenuse (longest side, across from the right angle).',
          'Common Pythagorean triples to recognize: 3-4-5, 5-12-13, 8-15-17, 7-24-25, and their multiples (6-8-10, etc.).',
          'If you see two sides of a right triangle, you can always find the third.',
        ],
      },
      {
        type: 'strategy',
        title: 'Special Right Triangles',
        content: [
          '45-45-90: the legs are equal, and the hypotenuse is leg × √2.',
          '30-60-90: the sides are in the ratio x : x√3 : 2x (shortest to longest).',
          'These are on the reference sheet, but memorizing them saves time.',
        ],
      },
      {
        type: 'strategy',
        title: 'Similar Triangles',
        content: [
          'Similar triangles have the same angles but different sizes. Their sides are proportional.',
          'If triangle ABC is similar to triangle DEF, then AB/DE = BC/EF = AC/DF.',
          'Set up a proportion and cross-multiply to find the missing side.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Draw the Height',
        content: 'Many triangle problems become easier if you draw the height from a vertex to the opposite side. This creates two right triangles, letting you use the Pythagorean theorem or special triangle ratios.',
        highlight: 'Drawing the height creates right triangles you can work with.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Triangle angles sum to 180. Pythagorean theorem for right triangles: a² + b² = c².',
          'Know the common triples: 3-4-5, 5-12-13, and their multiples.',
          'Special right triangles: 45-45-90 and 30-60-90. Know the ratios.',
          'Similar triangles have proportional sides — set up and solve proportions.',
        ],
      },
    ],
  },

  '10.3': {
    title: 'Trigonometry (SOHCAHTOA)',
    slides: [
      {
        type: 'intro',
        title: 'Trig on the SAT: Simpler Than You Think',
        content: [
          'SAT trigonometry is limited to right triangle trig. You need SOHCAHTOA and a few basic identities.',
          'You will NOT see the unit circle, inverse trig functions, or trig equations on the SAT.',
          'If you know SOHCAHTOA and the complementary angle relationship, you can ace every trig question.',
        ],
        highlight: 'SAT trig = SOHCAHTOA + one key identity. That is it.',
      },
      {
        type: 'strategy',
        title: 'SOHCAHTOA',
        content: [
          'SOH: sin(θ) = Opposite / Hypotenuse.',
          'CAH: cos(θ) = Adjacent / Hypotenuse.',
          'TOA: tan(θ) = Opposite / Adjacent.',
          'First identify which sides are opposite, adjacent, and hypotenuse RELATIVE TO THE ANGLE in the question.',
        ],
      },
      {
        type: 'strategy',
        title: 'The Complementary Angle Identity',
        content: [
          'sin(x) = cos(90 - x). This means the sine of an angle equals the cosine of its complement.',
          'The SAT LOVES this identity. If the problem says sin(30) = cos(x), then x = 60.',
          'This works because in a right triangle, the two acute angles add to 90, and the opposite of one is the adjacent of the other.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: Label the Triangle First',
        content: 'Before writing any trig ratio, draw the right triangle and label the sides: which is opposite to the angle in question? Which is adjacent? Which is the hypotenuse? Labeling takes five seconds and prevents the most common error — mixing up opposite and adjacent.',
        highlight: 'Label opposite, adjacent, and hypotenuse before writing the ratio.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'SOHCAHTOA: sin = O/H, cos = A/H, tan = O/A.',
          'Always label sides relative to the specific angle being asked about.',
          'sin(x) = cos(90 - x) is the most tested trig identity.',
          'SAT trig is limited to right triangles — no unit circle needed.',
        ],
      },
    ],
  },

  '10.4': {
    title: 'Circles',
    slides: [
      {
        type: 'intro',
        title: 'Circle Questions on the SAT',
        content: [
          'Circle questions test formulas (area, circumference, arc length) and the equation of a circle on the coordinate plane.',
          'The formulas are on the reference sheet, but you need to know the equation of a circle and how to complete the square.',
          'Most circle questions are formula-based — set up the right formula and solve.',
        ],
        highlight: 'Know the equation of a circle: (x - h)² + (y - k)² = r².',
      },
      {
        type: 'strategy',
        title: 'Essential Circle Formulas',
        content: [
          'Area = πr². Circumference = 2πr (or πd).',
          'Arc length = (central angle / 360) × 2πr.',
          'Sector area = (central angle / 360) × πr².',
          'All of these use the same fraction: central angle / 360.',
        ],
      },
      {
        type: 'strategy',
        title: 'The Equation of a Circle',
        content: [
          'Standard form: (x - h)² + (y - k)² = r², where (h, k) is the center and r is the radius.',
          'Watch the SIGNS: (x - 3)² means h = 3 (positive), not -3.',
          'If the equation is given in expanded form, you may need to complete the square to find the center and radius.',
        ],
      },
      {
        type: 'strategy',
        title: 'Completing the Square for Circles',
        content: [
          'Group x terms and y terms. Add the right constant to each group to form perfect squares.',
          'x² + 6x becomes (x + 3)² when you add 9. y² - 4y becomes (y - 2)² when you add 4.',
          'Whatever you add to the left side, add to the right side too to keep the equation balanced.',
        ],
      },
      {
        type: 'tip',
        title: 'Pro Tip: The "Part Over Whole" Shortcut',
        content: 'For arc length and sector area, just multiply the full circle formula by (angle/360). Think of it as "what fraction of the circle is this arc?" This keeps all circle problems consistent.',
        highlight: 'Arc = fraction of the circle. Fraction = angle / 360.',
      },
      {
        type: 'recap',
        title: 'Key Takeaways',
        content: [
          'Area = πr². Circumference = 2πr. These are on the reference sheet.',
          'Arc length and sector area = (angle/360) × the full circle formula.',
          'Circle equation: (x - h)² + (y - k)² = r². Watch the signs.',
          'Complete the square to convert expanded form to standard form.',
        ],
      },
    ],
  },
}

export default SAT_LESSON_CONTENT
