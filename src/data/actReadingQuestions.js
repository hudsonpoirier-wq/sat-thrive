function mc(q, choices, correct, exp) {
  return { q, choices, correct, exp }
}

export const ACT_READING_QUESTIONS = {
  'act-read-1': [
    mc(
      'A passage describes a marine biologist who spent decades studying coral reefs across the Pacific. The passage is primarily about:',
      { A: 'the chemistry of ocean water', B: 'one scientist\'s lifelong dedication to understanding coral ecosystems', C: 'a list of every species found in coral reefs', D: 'the history of scuba diving technology' },
      'B',
      'The central focus is the biologist\'s career-long commitment to coral research, not a narrow subtopic.'
    ),
    mc(
      'A passage opens with a scene of a crowded town hall meeting and then traces the history of a local land dispute. The main idea of the passage is that:',
      { A: 'town hall meetings are boring', B: 'the land dispute has deep roots that continue to affect the community', C: 'the mayor is the most important character', D: 'the town should be relocated' },
      'B',
      'The passage uses the meeting as a frame to explore the dispute\'s long history and ongoing community impact.'
    ),
    mc(
      'In a passage about the decline of handwritten letters, the author argues that digital communication lacks something important. Which of the following best states the passage\'s central claim?',
      { A: 'Email is faster than postal mail.', B: 'Handwritten letters carry personal and emotional significance that digital messages do not replicate.', C: 'Nobody writes letters anymore.', D: 'Postal services should be eliminated.' },
      'B',
      'The central claim is about the unique emotional quality of handwritten letters, not merely speed or popularity.'
    ),
    mc(
      'A passage discusses how a small farming community adapted to drought conditions over several generations. Which detail would best support the passage\'s main idea?',
      { A: 'The community held an annual music festival.', B: 'Farmers developed new irrigation techniques passed down through families.', C: 'The nearest city was fifty miles away.', D: 'The community had a population of 800.' },
      'B',
      'Irrigation techniques passed down through generations directly supports the idea of multigenerational adaptation to drought.'
    ),
    mc(
      'A passage about the history of jazz music ends by describing how modern musicians blend jazz with electronic sounds. The passage as a whole is best described as:',
      { A: 'a chronological overview of jazz\'s evolution from its origins to the present', B: 'a biography of a single jazz musician', C: 'an argument that jazz is better than other genres', D: 'a technical manual for playing jazz instruments' },
      'A',
      'The passage traces jazz from its history through to modern developments, making it a chronological overview.'
    ),
    mc(
      'A passage describes a photographer who documented vanishing landscapes in the American West. The author includes the detail that the photographer often camped alone for weeks. This detail primarily serves to:',
      { A: 'suggest the photographer disliked people', B: 'emphasize the photographer\'s dedication and the isolation required by the work', C: 'explain how cameras work', D: 'argue that camping is dangerous' },
      'B',
      'The detail about camping alone highlights dedication and the solitary nature of the work, reinforcing the main idea.'
    ),
    mc(
      'In a passage about urban renewal in Detroit, the author mentions that some neighborhoods saw a 40% increase in new businesses. This statistic is included mainly to:',
      { A: 'distract from the main argument', B: 'provide concrete evidence that renewal efforts had measurable results', C: 'compare Detroit to other cities', D: 'explain how businesses operate' },
      'B',
      'The statistic serves as concrete evidence supporting the claim that renewal efforts were effective.'
    ),
    mc(
      'A passage about a renowned architect opens with a description of a crumbling building the architect saw as a child. The opening anecdote primarily serves to:',
      { A: 'show that the architect had a difficult childhood', B: 'introduce the experience that first inspired the architect\'s career', C: 'argue that old buildings should be demolished', D: 'describe the local weather' },
      'B',
      'The anecdote establishes the origin of the architect\'s passion, connecting to the passage\'s main focus on career and motivation.'
    ),
    mc(
      'A passage discusses three different approaches to reducing food waste. The author gives the most space to community composting programs. This emphasis suggests that the main idea is:',
      { A: 'all three approaches are equally effective', B: 'community composting is the most promising approach according to the author', C: 'food waste is not a serious problem', D: 'individual efforts are more important than community programs' },
      'B',
      'The amount of coverage given to composting signals it is the author\'s primary focus and favored approach.'
    ),
    mc(
      'A passage about the construction of the Transcontinental Railroad focuses heavily on the laborers who built it. The best summary of the passage would emphasize:',
      { A: 'the financial profits made by railroad companies', B: 'the contributions and hardships of the workers who physically constructed the railroad', C: 'a complete timeline of every train route in America', D: 'modern train technology' },
      'B',
      'Since the passage focuses on the laborers, a good summary should center on their contributions and experiences.'
    ),
    mc(
      'A passage recounts how a librarian in a rural area started a mobile book program using a converted school bus. The passage mainly serves to:',
      { A: 'explain how school buses are manufactured', B: 'illustrate how one person\'s initiative expanded access to reading in an underserved area', C: 'argue that libraries are outdated', D: 'describe the geography of rural America' },
      'B',
      'The passage centers on the librarian\'s initiative and its impact on community reading access.'
    ),
    mc(
      'Which of the following would be the most appropriate title for a passage that discusses how ancient civilizations independently developed similar mathematical concepts?',
      { A: 'Why Math Is Difficult', B: 'Parallel Discoveries: How Separate Cultures Arrived at the Same Mathematical Ideas', C: 'A History of Modern Calculators', D: 'The Life of Pythagoras' },
      'B',
      'The title should capture the main idea of independent but similar mathematical developments across cultures.'
    ),
    mc(
      'A passage about endangered languages describes efforts by linguists and community members to preserve them through recordings and school programs. A key supporting detail is:',
      { A: 'the linguists\' favorite restaurants', B: 'that fewer than 50 fluent speakers of one language remain, making preservation urgent', C: 'the color of the recording equipment', D: 'that some linguists prefer email over phone calls' },
      'B',
      'The small number of remaining speakers directly supports the urgency of preservation efforts, which is the main idea.'
    ),
    mc(
      'A passage about the effects of sleep deprivation on teenagers cites multiple studies. The author\'s central argument is best described as:',
      { A: 'teenagers should be allowed to sleep all day', B: 'later school start times could significantly improve teenage health and academic performance', C: 'sleep research is too expensive', D: 'adults need more sleep than teenagers' },
      'B',
      'The studies cited support the specific argument about later start times benefiting teens, not a vague claim about sleep.'
    ),
    mc(
      'In a passage about the invention of the printing press, the author devotes the final two paragraphs to the press\'s impact on literacy rates. These paragraphs primarily serve to:',
      { A: 'introduce a new, unrelated topic', B: 'show the broader significance of the invention described earlier in the passage', C: 'contradict the earlier paragraphs', D: 'provide a biography of Gutenberg\'s childhood' },
      'B',
      'The final paragraphs extend the discussion from the invention itself to its wider significance, supporting the main idea.'
    ),
    mc(
      'A passage describes how a community theater group revived interest in live performance in a small town. The passage includes details about sold-out shows, new youth programs, and increased downtown foot traffic. Together, these details support the idea that:',
      { A: 'the theater group had little impact on the town', B: 'the theater group became a catalyst for broader community engagement', C: 'only young people attended the performances', D: 'the downtown area was already thriving before the theater opened' },
      'B',
      'Multiple positive effects (sold-out shows, youth programs, foot traffic) collectively support the idea of broader community impact.'
    ),
    mc(
      'A passage about volcanic eruptions and their effects on global climate opens with a vivid description of the 1815 eruption of Mount Tambora. The opening is most likely intended to:',
      { A: 'frighten the reader into avoiding volcanoes', B: 'provide a dramatic, concrete example that introduces the passage\'s broader topic', C: 'prove that 1815 was the worst year in history', D: 'describe Indonesian geography in detail' },
      'B',
      'The specific eruption serves as a vivid entry point into the broader topic of volcanic effects on climate.'
    ),
    mc(
      'A passage argues that public parks are essential to urban well-being. Which of the following details, if included, would most weaken the passage\'s main idea?',
      { A: 'A study showing park visitors report lower stress levels', B: 'Data indicating that cities with more parks have higher property values', C: 'Evidence that most urban parks are underused and poorly maintained', D: 'An anecdote about a family enjoying a picnic in a park' },
      'C',
      'Evidence of parks being underused and neglected would undermine the argument that they are essential to well-being.'
    ),
    mc(
      'In a passage about the migration patterns of monarch butterflies, the author mentions that researchers tag individual butterflies. This detail mainly supports which aspect of the main idea?',
      { A: 'That butterfly wings are colorful', B: 'That scientific methods allow researchers to track and understand migration routes', C: 'That butterflies are insects', D: 'That tagging is an expensive hobby' },
      'B',
      'The tagging detail supports the main idea by showing how researchers gather data about migration.'
    ),
    mc(
      'A passage discusses the rise of telemedicine in rural areas. The author concludes by noting that telemedicine cannot fully replace in-person care. This conclusion suggests the passage\'s main idea is:',
      { A: 'telemedicine is useless', B: 'telemedicine offers important benefits for rural patients but has limitations', C: 'all doctors should work remotely', D: 'rural areas do not need medical care' },
      'B',
      'The balanced conclusion (benefits plus limitations) indicates a nuanced main idea about telemedicine\'s role.'
    ),
    mc(
      'A passage about the development of sign language in the United States focuses on the founding of the American School for the Deaf. The best one-sentence summary of the passage would be:',
      { A: 'Deaf people exist in many countries.', B: 'The founding of the American School for the Deaf was a landmark event that shaped the development of American Sign Language.', C: 'Schools are important institutions.', D: 'Sign language uses hand movements.' },
      'B',
      'The best summary captures both the specific event (the school\'s founding) and its broader significance (shaping ASL).'
    ),
    mc(
      'A passage about a scientist\'s failed experiments leading to an accidental discovery emphasizes the role of persistence. Which detail best supports this emphasis?',
      { A: 'The scientist had a large laboratory.', B: 'The scientist repeated the experiment 47 times before noticing an unexpected result.', C: 'The scientist graduated from a prestigious university.', D: 'The scientist preferred coffee to tea.' },
      'B',
      'Repeating the experiment 47 times directly illustrates persistence, the passage\'s emphasized theme.'
    ),
    mc(
      'A passage about the Dust Bowl era describes how families were forced to abandon their farms. The passage is best characterized as:',
      { A: 'a persuasive essay arguing for modern farming subsidies', B: 'a historical account of how environmental and economic forces displaced farming communities', C: 'a fictional short story about a family road trip', D: 'a scientific analysis of soil chemistry' },
      'B',
      'The passage is a historical account linking environmental disaster to community displacement.'
    ),
    mc(
      'In a passage about innovations in renewable energy, the author mentions that solar panel costs have dropped 90% since 2010. This detail is included primarily to:',
      { A: 'explain how solar panels are manufactured', B: 'provide evidence that renewable energy is becoming increasingly accessible', C: 'argue that all other energy sources should be banned immediately', D: 'compare solar energy to nuclear energy' },
      'B',
      'The cost reduction statistic directly supports the claim about increasing accessibility of renewable energy.'
    ),
    mc(
      'A passage traces the career of a civil rights attorney from her childhood in the segregated South to her arguments before the Supreme Court. The passage\'s main idea is best stated as:',
      { A: 'the Supreme Court is the highest court in the land', B: 'the attorney\'s personal experiences with injustice fueled a career dedicated to legal equality', C: 'all lawyers have interesting childhoods', D: 'the South has warm weather' },
      'B',
      'The passage connects personal experience to professional purpose, making the link between injustice and advocacy the main idea.'
    ),
  ],

  'act-read-2': [
    mc(
      'In a passage about a dancer\'s rise to fame, the author writes that critics called her style "raw." As used here, "raw" most nearly means:',
      { A: 'uncooked', B: 'unpolished and emotionally powerful', C: 'painful', D: 'cold' },
      'B',
      'In the context of artistic criticism, "raw" describes something unrefined but emotionally intense.'
    ),
    mc(
      'A passage about early aviation states that pilots faced "unforgiving" skies. As used here, "unforgiving" most nearly means:',
      { A: 'angry at someone', B: 'extremely dangerous with no margin for error', C: 'cloudy', D: 'forgetful' },
      'B',
      'The word "unforgiving" in this context emphasizes danger and the lack of room for mistakes.'
    ),
    mc(
      'In a passage about a political debate, the author describes one candidate\'s remarks as "measured." As used here, "measured" most nearly means:',
      { A: 'calculated using a ruler', B: 'careful and deliberately restrained', C: 'average in quality', D: 'musical in tone' },
      'B',
      'In the context of speech, "measured" means carefully controlled and deliberate.'
    ),
    mc(
      'A passage about ocean conservation states that the reef was in a "fragile" state. As used here, "fragile" most nearly means:',
      { A: 'made of glass', B: 'easily damaged or at risk of collapse', C: 'lightweight', D: 'transparent' },
      'B',
      'In this ecological context, "fragile" means vulnerable and easily harmed.'
    ),
    mc(
      'In a passage about a novelist, the author writes that her prose "cuts to the bone." This phrase most nearly means:',
      { A: 'her writing is about surgery', B: 'her writing is direct and emotionally penetrating', C: 'her writing is painful to read because of errors', D: 'her sentences are too short' },
      'B',
      'The figurative phrase "cuts to the bone" means the writing is sharp, direct, and deeply affecting.'
    ),
    mc(
      'A social science passage states that voter turnout was "anemic" in the last election. As used here, "anemic" most nearly means:',
      { A: 'related to a blood disorder', B: 'weak and disappointingly low', C: 'surprisingly strong', D: 'average' },
      'B',
      'Used figuratively, "anemic" means lacking strength or vitality—here, very low turnout.'
    ),
    mc(
      'In a passage about a mountain expedition, the climber describes the summit as "elusive." As used here, "elusive" most nearly means:',
      { A: 'beautiful', B: 'difficult to reach or achieve', C: 'slippery to the touch', D: 'invisible' },
      'B',
      '"Elusive" in this context means the summit was hard to attain despite repeated efforts.'
    ),
    mc(
      'A humanities passage describes an artist whose work "resonated" with audiences worldwide. As used here, "resonated" most nearly means:',
      { A: 'produced a loud sound', B: 'deeply connected with and moved people emotionally', C: 'echoed in a large room', D: 'vibrated at a specific frequency' },
      'B',
      'In a figurative context, "resonated" means the work struck a meaningful chord with viewers.'
    ),
    mc(
      'In a passage about factory conditions in the 1900s, the author describes the pace of work as "relentless." As used here, "relentless" most nearly means:',
      { A: 'slow and careful', B: 'constant and without relief', C: 'optional', D: 'enjoyable' },
      'B',
      '"Relentless" describes something that does not let up, emphasizing the harsh, continuous nature of the work.'
    ),
    mc(
      'A passage about a chef states that she "cultivated" a unique menu over many years. As used here, "cultivated" most nearly means:',
      { A: 'planted in soil', B: 'carefully developed and refined over time', C: 'purchased from a store', D: 'memorized quickly' },
      'B',
      'Used figuratively, "cultivated" means she nurtured and gradually developed the menu, as one would tend a garden.'
    ),
    mc(
      'In a literary passage, a character describes her childhood home as "modest." As used here, "modest" most nearly means:',
      { A: 'shy and reserved', B: 'small and unpretentious', C: 'embarrassing', D: 'modern in design' },
      'B',
      'When describing a home, "modest" means simple, small, and without extravagance.'
    ),
    mc(
      'A natural science passage describes the "volatile" nature of certain chemicals. As used here, "volatile" most nearly means:',
      { A: 'angry', B: 'likely to change rapidly or become dangerous', C: 'colorful', D: 'solid and stable' },
      'B',
      'In a scientific context, "volatile" describes substances that can change state or react rapidly.'
    ),
    mc(
      'A passage about a civil rights leader states that his speeches had a "galvanizing" effect on the movement. As used here, "galvanizing" most nearly means:',
      { A: 'coating with zinc', B: 'inspiring and motivating people to action', C: 'confusing and disorienting', D: 'calming and soothing' },
      'B',
      'Figuratively, "galvanizing" means something that shocks people into action or enthusiasm.'
    ),
    mc(
      'In a passage about a historic treaty negotiation, the author writes that the atmosphere was "charged." As used here, "charged" most nearly means:',
      { A: 'financially costly', B: 'filled with tension and strong emotion', C: 'electrically powered', D: 'neutral and relaxed' },
      'B',
      'A "charged" atmosphere in this context means the room was full of tension and high emotion.'
    ),
    mc(
      'A passage about urban development states that the neighborhood underwent a "transformation." As used here, "transformation" most nearly means:',
      { A: 'a minor adjustment', B: 'a dramatic and thorough change', C: 'a temporary decoration', D: 'a magical spell' },
      'B',
      '"Transformation" implies a significant, comprehensive change rather than a small or superficial one.'
    ),
    mc(
      'In a passage about a composer, the author writes that his early work was "derivative." As used here, "derivative" most nearly means:',
      { A: 'related to calculus', B: 'heavily influenced by and imitative of others\' work', C: 'original and groundbreaking', D: 'poorly recorded' },
      'B',
      'In the arts, "derivative" means the work closely imitates existing styles rather than being original.'
    ),
    mc(
      'A passage about wilderness conservation describes a "pristine" forest. As used here, "pristine" most nearly means:',
      { A: 'expensive', B: 'in its original, unspoiled condition', C: 'recently planted', D: 'dark and frightening' },
      'B',
      '"Pristine" means the forest is untouched and in its natural state.'
    ),
    mc(
      'In a passage about a debate tournament, the author notes that one student offered a "compelling" argument. As used here, "compelling" most nearly means:',
      { A: 'forceful and convincing', B: 'lengthy and repetitive', C: 'quiet and shy', D: 'required by law' },
      'A',
      '"Compelling" means the argument was persuasive and difficult to resist or dismiss.'
    ),
    mc(
      'A passage about immigration patterns describes a "wave" of newcomers arriving in the 1920s. As used here, "wave" most nearly means:',
      { A: 'an ocean swell', B: 'a large, sudden influx of people', C: 'a friendly hand gesture', D: 'a permanent settlement' },
      'B',
      'Used figuratively, "wave" describes a large number of people arriving in a relatively short period.'
    ),
    mc(
      'In a passage about a sculptor, the author states that the artist\'s later works are "austere." As used here, "austere" most nearly means:',
      { A: 'colorful and ornate', B: 'severe in style, stripped of decoration', C: 'very large in size', D: 'humorous and playful' },
      'B',
      '"Austere" describes a style that is stark, plain, and without unnecessary ornamentation.'
    ),
    mc(
      'A passage about public health campaigns describes efforts to "stem" the spread of a disease. As used here, "stem" most nearly means:',
      { A: 'the main trunk of a plant', B: 'stop or reduce the flow of', C: 'cause or originate from', D: 'measure precisely' },
      'B',
      'In this context, "stem" means to hold back or slow the spread of something.'
    ),
    mc(
      'In a passage about a historian\'s research, the author writes that the evidence was "scant." As used here, "scant" most nearly means:',
      { A: 'plentiful', B: 'barely sufficient or very limited in amount', C: 'well organized', D: 'frightening' },
      'B',
      '"Scant" means there was very little evidence available—insufficient or meager.'
    ),
    mc(
      'A literary narrative describes a character who speaks in a "sardonic" tone. As used here, "sardonic" most nearly means:',
      { A: 'cheerful and friendly', B: 'mocking or cynically humorous', C: 'loud and angry', D: 'soft and whispery' },
      'B',
      '"Sardonic" describes a tone that is grimly mocking or scornfully humorous.'
    ),
    mc(
      'In a passage about education reform, the author calls the proposed policy "sweeping." As used here, "sweeping" most nearly means:',
      { A: 'related to cleaning floors', B: 'broad in scope and far-reaching', C: 'hasty and careless', D: 'minor and insignificant' },
      'B',
      '"Sweeping" in this context means the policy affects a wide range of areas and is comprehensive in scope.'
    ),
    mc(
      'A passage about a musician describes the audience\'s reaction as "tepid." As used here, "tepid" most nearly means:',
      { A: 'hot and passionate', B: 'lukewarm and lacking enthusiasm', C: 'freezing cold', D: 'perfectly satisfied' },
      'B',
      '"Tepid" means the response was unenthusiastic—neither strongly positive nor strongly negative.'
    ),
  ],

  'act-read-3': [
    mc(
      'A passage describes a scientist who publishes her findings but notes that more trials are needed. It can reasonably be inferred that the scientist:',
      { A: 'believes her results are final and definitive', B: 'is cautious and wants additional evidence before making strong claims', C: 'plans to abandon the research entirely', D: 'thinks scientific publishing is unnecessary' },
      'B',
      'Her call for more trials indicates caution and a desire for stronger evidence.'
    ),
    mc(
      'A passage about a small bookstore mentions that the owner stays open late on weeknights despite low foot traffic. It can reasonably be inferred that the owner:',
      { A: 'does not care about profits at all', B: 'values serving the community even when it is not financially optimal', C: 'is unaware of her business hours', D: 'has no other choice of career' },
      'B',
      'Staying open despite low traffic suggests a commitment beyond pure profit motive.'
    ),
    mc(
      'In a passage about a political figure, the author notes that the figure rarely spoke publicly about her personal life. This suggests that the figure:',
      { A: 'had no personal life', B: 'deliberately maintained a boundary between public duties and private matters', C: 'was unable to communicate effectively', D: 'disliked all public events' },
      'B',
      'Rarely speaking about personal matters suggests intentional privacy, not inability to communicate.'
    ),
    mc(
      'A passage describes a neighborhood where several longtime businesses have closed and been replaced by upscale boutiques. Based on this information, the reader can infer that:',
      { A: 'the neighborhood has not changed at all', B: 'the area is undergoing economic and demographic shifts', C: 'boutiques are always unsuccessful', D: 'longtime businesses close only because of bad management' },
      'B',
      'The replacement of established businesses with upscale shops strongly implies gentrification or economic change.'
    ),
    mc(
      'A literary passage shows a character who repeatedly checks the clock during a dinner party. The reader can reasonably infer that the character:',
      { A: 'is thoroughly enjoying the party', B: 'is anxious or eager for the event to end', C: 'is fascinated by clocks as objects', D: 'has no sense of time' },
      'B',
      'Repeatedly checking the clock is a behavioral cue suggesting impatience, anxiety, or a desire to leave.'
    ),
    mc(
      'In a passage about deep-sea exploration, the author mentions that fewer people have visited the ocean floor than have walked on the moon. This comparison implies that:',
      { A: 'the moon is closer than the ocean floor', B: 'deep-sea exploration remains extremely rare and technically challenging', C: 'space travel is no longer interesting', D: 'the ocean floor has already been fully mapped' },
      'B',
      'The comparison highlights how rare and difficult deep-sea exploration is, even compared to space travel.'
    ),
    mc(
      'A passage about a coach describes how she changed the team\'s training schedule after three consecutive losses. It can be inferred that the coach:',
      { A: 'believed the losses were entirely due to bad luck', B: 'thought the existing approach needed adjustment to improve results', C: 'planned to resign immediately', D: 'did not care about winning' },
      'B',
      'Changing the training schedule in response to losses suggests the coach identified the approach as a factor needing improvement.'
    ),
    mc(
      'In a passage about a painter, the author notes that the artist destroyed several of her early canvases. This detail suggests that the painter:',
      { A: 'ran out of storage space', B: 'held herself to high standards and was dissatisfied with her early work', C: 'wanted to prevent anyone from ever seeing any of her art', D: 'had no talent whatsoever' },
      'B',
      'Destroying early work implies self-criticism and high artistic standards, not a lack of talent.'
    ),
    mc(
      'A passage describes a town that built a memorial for workers who died constructing a local dam. The reader can infer that the town:',
      { A: 'regrets building the dam', B: 'wants to acknowledge the human cost of the project', C: 'plans to demolish the dam', D: 'does not remember the construction period' },
      'B',
      'Building a memorial indicates a desire to honor and remember those who sacrificed during construction.'
    ),
    mc(
      'In a social science passage, an economist notes that wages in a region rose after a new factory opened but that housing costs rose even faster. The reader can infer that:',
      { A: 'workers in the region are all better off financially', B: 'the net economic benefit to workers may be smaller than the wage increase alone suggests', C: 'housing costs and wages are completely unrelated', D: 'the factory should be closed immediately' },
      'B',
      'When housing costs outpace wage gains, the real financial benefit to workers is diminished.'
    ),
    mc(
      'A passage about a journalist describes how she verified every source before publishing a controversial story. It can reasonably be inferred that the journalist:',
      { A: 'did not trust her own writing ability', B: 'understood the importance of accuracy, especially given the story\'s potential impact', C: 'was trying to delay publication indefinitely', D: 'thought the story was unimportant' },
      'B',
      'Thorough source verification for a controversial story reflects awareness of the stakes and a commitment to accuracy.'
    ),
    mc(
      'In a passage about a musician who switched from classical piano to jazz, the author notes that the musician\'s classical training "never left her fingers." This implies that:',
      { A: 'the musician forgot everything about classical music', B: 'her classical technique continued to influence her jazz playing', C: 'she could not play jazz properly', D: 'classical and jazz music are identical' },
      'B',
      'The phrase suggests her classical skills remained embedded in her playing even after she changed genres.'
    ),
    mc(
      'A passage describes a community that resisted a developer\'s plan to build a shopping center on a historic site. The community\'s resistance most strongly suggests that residents:',
      { A: 'oppose all forms of economic development', B: 'place significant value on preserving their local heritage', C: 'do not need any stores', D: 'are indifferent to the site\'s history' },
      'B',
      'Resisting development on a historic site implies residents prioritize heritage preservation.'
    ),
    mc(
      'In a passage about a marathon runner, the author mentions that the runner kept a detailed training journal but never shared it with other athletes. This suggests that:',
      { A: 'the runner was illiterate', B: 'the journal was a private tool for self-improvement rather than a public resource', C: 'other athletes were not interested in running', D: 'the journal contained no useful information' },
      'B',
      'Keeping a detailed but private journal suggests it served as a personal training tool, not something intended for others.'
    ),
    mc(
      'A passage about renewable energy mentions that a coastal town installed wind turbines despite initial opposition from some residents. The passage later notes that the town\'s energy costs dropped significantly. The reader can infer that:',
      { A: 'the opposition was based on accurate predictions', B: 'the practical results may have changed some residents\' opinions about the turbines', C: 'all residents immediately supported the turbines', D: 'the turbines had no effect on energy costs' },
      'B',
      'Significant cost reductions suggest the turbines\' practical benefits may have softened initial opposition.'
    ),
    mc(
      'In a passage about a high school debate team, the coach tells a student, "Your argument is solid, but your delivery needs more confidence." It can be inferred that the coach believes:',
      { A: 'the student should quit the debate team', B: 'the content of the argument is strong but the presentation style could be improved', C: 'delivery is unimportant in debates', D: 'the student\'s argument is weak' },
      'B',
      'The coach praises the argument\'s substance while identifying presentation as an area for growth.'
    ),
    mc(
      'A passage describes how an elderly woman teaches her granddaughter to weave using traditional methods. The passage mentions that fewer than a dozen people in the community still know the technique. It can be inferred that:',
      { A: 'weaving is a common and widespread skill', B: 'the grandmother is helping to preserve a craft that could otherwise be lost', C: 'the granddaughter is not interested in weaving', D: 'the technique is easy to learn from books' },
      'B',
      'With so few practitioners remaining, the teaching represents an act of cultural preservation.'
    ),
    mc(
      'A passage about a doctor who works in a remote village notes that she turned down a lucrative urban practice. It can reasonably be inferred that:',
      { A: 'she was unable to find work in a city', B: 'she prioritizes serving an underserved community over financial gain', C: 'she dislikes medicine', D: 'the village forced her to stay' },
      'B',
      'Choosing a remote village over a profitable urban position indicates a commitment to underserved populations.'
    ),
    mc(
      'In a passage about the decline of a once-thriving fishing industry, the author notes that many boats now sit unused in the harbor. This detail implies that:',
      { A: 'the fishing industry has recovered', B: 'the economic downturn has directly reduced fishing activity', C: 'the boats were never used for fishing', D: 'the harbor is being expanded' },
      'B',
      'Unused boats in the harbor are a visual symbol of the industry\'s decline and reduced activity.'
    ),
    mc(
      'A passage describes a teenager who volunteers at an animal shelter every Saturday even though her friends spend weekends socializing. The reader can infer that the teenager:',
      { A: 'has no friends', B: 'feels a strong sense of responsibility toward the animals', C: 'is required by her school to volunteer', D: 'does not enjoy spending time with people' },
      'B',
      'Choosing to volunteer consistently over socializing suggests a genuine personal commitment to the animals.'
    ),
    mc(
      'In a passage about a failed expedition to the Arctic, the author mentions that the expedition leader wrote in his journal, "We were unprepared for what we found." This statement most strongly implies that:',
      { A: 'the expedition was well planned', B: 'conditions were more severe or different than the team had anticipated', C: 'the leader enjoyed surprises', D: 'the journal was fiction' },
      'B',
      'Admitting being unprepared implies the reality was worse or different than expected.'
    ),
    mc(
      'A passage about urban planning notes that a city removed highway barriers that had separated two neighborhoods for decades. The passage then describes increased interaction between residents. It can be inferred that:',
      { A: 'the barriers had no effect on community interaction', B: 'the physical separation had contributed to social division between the neighborhoods', C: 'residents preferred the barriers', D: 'the highways were never actually built' },
      'B',
      'The increase in interaction after removal suggests the barriers had previously limited social connection.'
    ),
    mc(
      'In a passage about a museum curator, the author mentions that the curator spent three years researching a single artifact before displaying it. This suggests the curator:',
      { A: 'was procrastinating and avoiding work', B: 'was committed to presenting historically accurate and thoroughly researched exhibits', C: 'did not want the artifact to be seen by the public', D: 'thought the artifact was unimportant' },
      'B',
      'Three years of research for a single display item indicates a deep commitment to accuracy and thoroughness.'
    ),
    mc(
      'A passage describes an immigrant family that opens a restaurant serving dishes from their homeland. The restaurant becomes a gathering place for both immigrant and longtime residents. The reader can infer that:',
      { A: 'the food was unpopular', B: 'the restaurant helped build cultural connections across community lines', C: 'only immigrants visited the restaurant', D: 'the family planned to return to their homeland immediately' },
      'B',
      'A restaurant that attracts both immigrant and longtime residents serves as a bridge between cultures.'
    ),
    mc(
      'In a passage about space exploration, the author notes that early astronauts were test pilots accustomed to high-risk situations. This detail implies that:',
      { A: 'space travel was considered routine and safe', B: 'the dangers of early space missions required people with experience handling extreme risk', C: 'test pilots were the only people who applied', D: 'piloting skills were irrelevant to space travel' },
      'B',
      'Selecting test pilots accustomed to high risk implies early space missions were considered extremely dangerous.'
    ),
  ],

  'act-read-4': [
    mc(
      'A passage traces the decline of a local newspaper and ends by calling for community support. The author\'s primary purpose is to:',
      { A: 'entertain readers with humorous anecdotes', B: 'persuade readers that local journalism deserves financial support', C: 'provide an objective history of print media', D: 'criticize the internet as a whole' },
      'B',
      'The call for support at the end reveals a persuasive purpose focused on saving local journalism.'
    ),
    mc(
      'In a passage about a controversial dam project, the author presents arguments both for and against the project but gives the final word to environmentalists. The author\'s perspective is best described as:',
      { A: 'entirely neutral with no opinion', B: 'subtly sympathetic to the environmental concerns', C: 'strongly in favor of the dam', D: 'indifferent to the topic' },
      'B',
      'Giving the final word to one side suggests subtle favoritism even within a balanced presentation.'
    ),
    mc(
      'A passage about a famous inventor focuses almost entirely on failures before the eventual breakthrough. The author most likely structures the passage this way to:',
      { A: 'discourage readers from pursuing inventions', B: 'emphasize that persistence through failure is central to the inventor\'s story', C: 'prove that the invention was actually unimportant', D: 'criticize the inventor\'s work ethic' },
      'B',
      'Spending most of the passage on failures before the breakthrough highlights the theme of persistence.'
    ),
    mc(
      'In a passage about a new educational policy, the author uses phrases like "promising results" and "encouraging trends." The author\'s attitude toward the policy is best described as:',
      { A: 'hostile', B: 'cautiously optimistic', C: 'completely indifferent', D: 'sarcastic' },
      'B',
      'Words like "promising" and "encouraging" signal a positive but measured assessment.'
    ),
    mc(
      'A passage describes a city\'s decision to convert abandoned lots into community gardens. The author includes interviews with residents who express gratitude. The interviews are most likely included to:',
      { A: 'show that residents were opposed to the gardens', B: 'provide firsthand evidence of the program\'s positive impact', C: 'demonstrate that interviews are a valid research method', D: 'change the subject from gardens to interviews' },
      'B',
      'Grateful resident interviews serve as direct evidence supporting the program\'s success.'
    ),
    mc(
      'In a passage about factory farming, the author consistently uses words like "confined," "crowded," and "industrial." The author\'s word choices suggest:',
      { A: 'approval of factory farming practices', B: 'a critical view of the conditions in factory farming', C: 'neutrality about the topic', D: 'ignorance about how farming works' },
      'B',
      'Negative connotation words like "confined" and "crowded" reveal a critical perspective.'
    ),
    mc(
      'A natural science passage explains how coral bleaching occurs and then describes conservation efforts. The author\'s primary purpose is to:',
      { A: 'argue that coral reefs are not worth saving', B: 'inform readers about a threat to coral and the responses to it', C: 'entertain readers with fictional ocean stories', D: 'prove that ocean temperatures never change' },
      'B',
      'The passage combines explanation of a problem with description of solutions, serving an informative purpose.'
    ),
    mc(
      'In a passage about a poet, the author writes, "Her verses were not merely pretty—they were urgent." The author includes this statement most likely to:',
      { A: 'dismiss the poet\'s work as superficial', B: 'emphasize the seriousness and social importance of the poet\'s writing', C: 'compare the poet to a politician', D: 'suggest the poet wrote too quickly' },
      'B',
      'Contrasting "pretty" with "urgent" elevates the poet\'s work from decorative to socially significant.'
    ),
    mc(
      'A passage about the history of public libraries mentions that Andrew Carnegie funded over 1,600 library buildings. This detail is included primarily to:',
      { A: 'explain Carnegie\'s personal life', B: 'illustrate the scale of philanthropic investment in public education', C: 'argue that all libraries should be privately funded', D: 'compare Carnegie to modern billionaires' },
      'B',
      'The large number demonstrates the massive scope of Carnegie\'s library philanthropy.'
    ),
    mc(
      'In a passage about genetically modified crops, the author presents scientific evidence supporting their safety but also acknowledges public concerns. The author\'s approach is best described as:',
      { A: 'dismissive of all public opinion', B: 'balanced, presenting evidence while respecting differing perspectives', C: 'entirely anti-science', D: 'purely emotional with no evidence' },
      'B',
      'Combining scientific evidence with acknowledgment of concerns shows a balanced approach.'
    ),
    mc(
      'A passage about a retired teacher who mentors at-risk youth focuses on specific students whose lives changed. The author most likely focuses on individual stories to:',
      { A: 'avoid discussing the teacher\'s methods', B: 'make the teacher\'s impact concrete and emotionally compelling', C: 'argue that only certain students deserve help', D: 'show that mentoring is ineffective' },
      'B',
      'Individual stories make abstract impact tangible and create emotional connection for the reader.'
    ),
    mc(
      'In a passage about the Space Race, the author describes both American and Soviet achievements in equal detail. The author\'s purpose in doing so is most likely to:',
      { A: 'argue that the Soviet Union was superior', B: 'present a comprehensive, balanced account of the competition', C: 'confuse the reader about which country succeeded', D: 'prove that space exploration was unimportant' },
      'B',
      'Equal coverage of both sides suggests the author aims for a complete, even-handed historical account.'
    ),
    mc(
      'A passage about water pollution ends with the sentence, "The river, once teeming with life, now runs silent." This concluding sentence primarily serves to:',
      { A: 'introduce a new scientific concept', B: 'create an emotional impression that reinforces the passage\'s message about environmental loss', C: 'provide a technical definition of silence', D: 'argue that rivers should not exist' },
      'B',
      'The vivid, melancholy image reinforces the emotional weight of the environmental damage discussed.'
    ),
    mc(
      'In a social science passage about income inequality, the author cites data from three different studies. The author most likely includes multiple studies to:',
      { A: 'make the passage longer', B: 'strengthen the argument by showing consistent findings across different sources', C: 'confuse the reader with too much data', D: 'demonstrate that research is contradictory' },
      'B',
      'Multiple studies showing similar results strengthen the argument by demonstrating consistency.'
    ),
    mc(
      'A passage about a folk musician includes the detail that the musician grew up hearing work songs in cotton fields. This biographical detail is most likely included to:',
      { A: 'show that cotton farming is profitable', B: 'explain the roots of the musician\'s artistic style and subject matter', C: 'argue that all musicians should grow up on farms', D: 'criticize modern music production' },
      'B',
      'The childhood detail connects the musician\'s personal background to their artistic identity.'
    ),
    mc(
      'In a passage about autonomous vehicles, the author writes, "Proponents paint a rosy picture, but the road ahead is far from smooth." The author\'s tone in this sentence is best described as:',
      { A: 'enthusiastic and supportive', B: 'skeptical and cautionary', C: 'angry and hostile', D: 'confused and uncertain' },
      'B',
      'Contrasting the "rosy picture" with a "far from smooth" road signals skepticism about overly optimistic claims.'
    ),
    mc(
      'A humanities passage about a playwright mentions that the playwright\'s most famous work was banned in several countries. The author includes this fact primarily to:',
      { A: 'recommend that readers avoid the play', B: 'demonstrate the work\'s controversial power and cultural impact', C: 'list every country in the world', D: 'explain international copyright law' },
      'B',
      'Being banned highlights the play\'s provocative nature and wide-reaching significance.'
    ),
    mc(
      'In a passage about childhood nutrition, the author opens with a statistic: "One in five children in the United States experiences food insecurity." The statistic is placed at the beginning most likely to:',
      { A: 'demonstrate that the problem is minor', B: 'immediately establish the scope and urgency of the issue', C: 'confuse readers with numbers', D: 'show that the author likes data' },
      'B',
      'A striking statistic at the opening immediately communicates the problem\'s scale and draws the reader in.'
    ),
    mc(
      'A passage about a historical figure mentions both the figure\'s public achievements and private doubts recorded in personal letters. The author includes the private doubts most likely to:',
      { A: 'discredit the historical figure entirely', B: 'provide a more complex and humanized portrait', C: 'argue that the achievements were unimportant', D: 'entertain the reader with gossip' },
      'B',
      'Including private doubts alongside public achievements creates a fuller, more nuanced character portrait.'
    ),
    mc(
      'In a passage about zoos, the author describes conservation breeding programs in detail. The author\'s purpose in this section is most likely to:',
      { A: 'argue that zoos serve only as entertainment', B: 'show that modern zoos play an important role in species preservation', C: 'criticize all zoos without exception', D: 'describe how to build zoo enclosures' },
      'B',
      'Detailed coverage of conservation breeding highlights the scientific and preservation role of zoos.'
    ),
    mc(
      'A passage about a community\'s response to a natural disaster uses the word "resilience" repeatedly throughout. The repetition most likely serves to:',
      { A: 'fill space in the passage', B: 'reinforce the central theme that the community\'s ability to recover is the key message', C: 'confuse the reader about the passage\'s topic', D: 'demonstrate poor writing technique' },
      'B',
      'Repeating "resilience" keeps the reader focused on the passage\'s central theme of community recovery.'
    ),
    mc(
      'In a passage about a museum exhibition on ancient Egypt, the author includes a quote from the lead curator. The quote is most likely included to:',
      { A: 'show that the author could not form their own opinion', B: 'add expert authority and a personal perspective to the discussion', C: 'change the topic to modern Egypt', D: 'prove that curators are unreliable' },
      'B',
      'An expert quote adds credibility and a direct, authoritative voice to the passage.'
    ),
    mc(
      'A passage about urban noise pollution describes a neighborhood where residents cannot sleep due to construction. The author\'s attitude toward the situation is best described as:',
      { A: 'amused', B: 'sympathetic to the affected residents', C: 'supportive of unlimited construction', D: 'indifferent' },
      'B',
      'Describing residents\' inability to sleep portrays them sympathetically and highlights the negative impact of noise.'
    ),
    mc(
      'In a passage about the decline of cursive handwriting instruction, the author presents arguments from both educators who support it and those who think it is outdated. The author\'s primary purpose is to:',
      { A: 'definitively settle the debate', B: 'explore the different perspectives on whether cursive should still be taught', C: 'promote a specific handwriting brand', D: 'argue that all writing should be digital' },
      'B',
      'Presenting both sides without declaring a winner suggests the purpose is exploration of perspectives.'
    ),
    mc(
      'A passage about an archaeological discovery ends with the author writing, "What these ruins whisper to us, if we are willing to listen, is that no civilization is permanent." The author most likely ends with this statement to:',
      { A: 'provide a detailed excavation timeline', B: 'leave the reader with a broader philosophical reflection prompted by the discovery', C: 'argue that archaeology is a waste of time', D: 'introduce a new discovery at a different site' },
      'B',
      'The closing reflection elevates the discussion from a specific find to a universal insight about civilizations.'
    ),
  ],

  'act-read-5': [
    mc(
      'Passage A describes a city\'s new bike lane program as a success that reduced traffic congestion. Passage B argues the same program diverted funds from public transit. The two passages primarily disagree about:',
      { A: 'whether bikes exist', B: 'whether the bike lane program was a wise use of city resources', C: 'the color of the bike lanes', D: 'the history of bicycles' },
      'B',
      'The core disagreement is over whether the program was a good investment, not about factual details.'
    ),
    mc(
      'In a dual passage about space exploration, Author A argues that manned missions to Mars are essential for scientific progress, while Author B contends that robotic missions are more cost-effective. Both authors would most likely agree that:',
      { A: 'Mars exploration has no scientific value', B: 'exploring Mars is a worthwhile scientific goal', C: 'robotic missions are completely useless', D: 'manned missions carry no risks' },
      'B',
      'Both authors support Mars exploration; they disagree only on the method.'
    ),
    mc(
      'Passage A presents the viewpoint of a developer who wants to build affordable housing on an empty lot. Passage B presents the viewpoint of neighbors who want the lot preserved as green space. Which statement would the developer in Passage A most likely make?',
      { A: 'Green spaces are more important than housing.', B: 'The community\'s greatest need is more affordable homes.', C: 'The lot should remain empty permanently.', D: 'Housing construction always harms the environment.' },
      'B',
      'The developer\'s position centers on the need for affordable housing, which aligns with choice B.'
    ),
    mc(
      'In a pair of passages about social media use among teenagers, Author A emphasizes risks such as cyberbullying and anxiety, while Author B highlights benefits like community building and creative expression. Author A would most likely respond to Author B\'s argument by saying:',
      { A: 'Social media has no features whatsoever.', B: 'The benefits Author B describes do not outweigh the documented harms.', C: 'Teenagers should never use any technology.', D: 'Author B\'s evidence is fabricated.' },
      'B',
      'Author A would likely acknowledge benefits but argue that harms are more significant.'
    ),
    mc(
      'Passage A describes traditional farming methods as sustainable and time-tested. Passage B argues that modern agricultural technology is necessary to feed a growing population. The passages share a concern about:',
      { A: 'the fashion industry', B: 'ensuring adequate food production', C: 'the history of ancient Rome', D: 'space exploration funding' },
      'B',
      'Both passages address food production, though they disagree on the best approach.'
    ),
    mc(
      'In dual passages about a proposed minimum wage increase, Author A cites studies showing improved worker well-being, while Author B cites studies showing potential job losses. The primary difference in their approaches is:',
      { A: 'Author A uses evidence and Author B does not', B: 'they emphasize different consequences of the same policy', C: 'Author A discusses wages and Author B discusses weather', D: 'neither author uses any evidence' },
      'B',
      'Both use studies, but they focus on different outcomes—well-being versus employment.'
    ),
    mc(
      'Passage A is written by a museum director who argues that free admission increases public engagement with art. Passage B is written by a museum board member who argues that admission fees are necessary to fund operations. Which of the following would both authors likely support?',
      { A: 'Closing the museum permanently', B: 'Finding ways to make art accessible while maintaining the museum\'s financial health', C: 'Eliminating all museum staff', D: 'Displaying only modern art' },
      'B',
      'Both care about the museum\'s mission; they disagree about funding methods, not the goal.'
    ),
    mc(
      'In a pair of passages about wilderness preservation, Author A argues for strict protections that ban all commercial activity. Author B argues for managed use that allows sustainable tourism. Author B would most likely criticize Author A\'s position by saying:',
      { A: 'Wilderness has no value.', B: 'Banning all access may reduce public support for conservation.', C: 'Tourism always destroys the environment.', D: 'Author A\'s facts are entirely wrong.' },
      'B',
      'Author B values public engagement and would argue that strict bans could alienate potential conservation supporters.'
    ),
    mc(
      'Passage A discusses how standardized testing helps identify students who need academic support. Passage B argues that standardized testing creates unnecessary stress and narrows the curriculum. A point on which both authors would agree is:',
      { A: 'student success is important', B: 'standardized testing should be expanded', C: 'stress has no effect on students', D: 'the curriculum does not matter' },
      'A',
      'Both authors care about students\' well-being and success, even though they disagree about testing\'s role.'
    ),
    mc(
      'In dual passages about electric vehicles, Author A enthusiastically describes their environmental benefits, while Author B raises concerns about battery production and disposal. Author A would most likely counter Author B by arguing that:',
      { A: 'batteries are not used in electric vehicles', B: 'the overall environmental benefit still outweighs the costs of battery production', C: 'Author B knows nothing about cars', D: 'electric vehicles should be banned' },
      'B',
      'Author A would likely acknowledge battery concerns but argue the net environmental impact is positive.'
    ),
    mc(
      'Passage A is a historian\'s account of a revolution that emphasizes economic causes. Passage B is a historian\'s account of the same revolution that emphasizes ideological causes. The two passages differ mainly in:',
      { A: 'which revolution they describe', B: 'which factors they consider most important in explaining the revolution', C: 'whether the revolution actually happened', D: 'the language they are written in' },
      'B',
      'Both discuss the same event but prioritize different explanatory factors.'
    ),
    mc(
      'In a pair of passages about remote work, Author A argues that working from home increases productivity and work-life balance. Author B argues that remote work erodes team collaboration and company culture. Which claim would Author B most likely make?',
      { A: 'Productivity is the only thing that matters.', B: 'In-person interaction fosters creativity and trust that cannot be fully replicated online.', C: 'All offices should be permanently closed.', D: 'Technology has no role in the modern workplace.' },
      'B',
      'Author B values collaboration and culture, so emphasizing the irreplaceable nature of in-person interaction fits.'
    ),
    mc(
      'Passage A describes a government-funded arts program as a vital cultural investment. Passage B describes the same program as an inefficient use of taxpayer money. The fundamental disagreement between the two passages is about:',
      { A: 'whether art exists', B: 'whether public funding for the arts is justified by its returns', C: 'which artists are the most talented', D: 'the definition of the word program' },
      'B',
      'The core debate is whether the arts program provides sufficient value to justify its public cost.'
    ),
    mc(
      'In dual passages about animal testing for medical research, Author A defends the practice as necessary for human safety, while Author B calls it ethically unacceptable. Both authors would most likely agree that:',
      { A: 'medical research is unimportant', B: 'the development of effective medical treatments is a worthy goal', C: 'animals do not feel pain', D: 'ethical considerations are irrelevant to science' },
      'B',
      'Both authors support medical progress; they disagree about whether animal testing is an acceptable means to that end.'
    ),
    mc(
      'Passage A argues that learning a foreign language in school improves cognitive skills and cultural understanding. Passage B argues that schools should focus limited time on STEM subjects instead. Author A would most likely respond to Author B by pointing out that:',
      { A: 'STEM subjects are completely useless', B: 'language learning enhances the critical thinking skills that also benefit STEM performance', C: 'no students enjoy STEM classes', D: 'foreign languages should replace all other subjects' },
      'B',
      'Author A would likely argue that language study complements rather than competes with STEM education.'
    ),
    mc(
      'In a pair of passages about a city\'s decision to ban plastic bags, Author A praises the ban as an important environmental measure, while Author B argues it disproportionately affects low-income shoppers. The two authors primarily differ in their focus on:',
      { A: 'the environmental impact versus the socioeconomic impact of the policy', B: 'the history of plastic manufacturing', C: 'whether bags are used for shopping', D: 'the color of the bags' },
      'A',
      'Author A focuses on environmental benefits while Author B focuses on economic fairness.'
    ),
    mc(
      'Passage A, written by a coach, argues that youth sports build discipline and teamwork. Passage B, written by a pediatrician, warns that intense youth sports can cause burnout and injury. Which detail from Passage B would most directly challenge Passage A\'s claims?',
      { A: 'Some children enjoy playing sports.', B: 'Research shows that 70% of children drop out of organized sports by age 13 due to pressure and overtraining.', C: 'Sports equipment is expensive.', D: 'Coaches are usually well-intentioned.' },
      'B',
      'A high dropout rate from pressure directly challenges the claim that youth sports consistently build positive traits.'
    ),
    mc(
      'In dual passages about nuclear energy, Author A views it as a clean alternative to fossil fuels. Author B views it as an unacceptable safety risk. If a new technology made nuclear waste completely harmless, Author B would most likely:',
      { A: 'remain opposed because waste was not the only concern', B: 'immediately support nuclear energy without reservation', C: 'argue that fossil fuels are also clean', D: 'refuse to acknowledge the new technology exists' },
      'A',
      'Author B\'s concerns include safety risks beyond waste, so eliminating waste alone may not fully resolve the objection.'
    ),
    mc(
      'Passage A describes a community\'s traditional fishing practices as culturally significant. Passage B describes the same practices as ecologically unsustainable. The passages illustrate a tension between:',
      { A: 'two unrelated topics', B: 'cultural preservation and environmental protection', C: 'fishing and farming', D: 'ancient and modern technology' },
      'B',
      'The tension is between respecting cultural traditions and protecting the environment.'
    ),
    mc(
      'In a pair of passages about homework, Author A argues it reinforces learning, while Author B argues it reduces family time and increases stress. Which question would best help evaluate both arguments?',
      { A: 'What color should homework be printed on?', B: 'What does research say about the relationship between homework amount and academic achievement?', C: 'How many pages are in a typical textbook?', D: 'Which subject is the easiest?' },
      'B',
      'Research on homework\'s actual effect on achievement would provide evidence relevant to both authors\' claims.'
    ),
    mc(
      'Passage A describes a new immigration policy as compassionate and necessary. Passage B describes the same policy as poorly enforced and economically risky. Unlike Author A, Author B:',
      { A: 'ignores the policy entirely', B: 'focuses primarily on practical implementation and economic consequences', C: 'supports open borders without limits', D: 'discusses a completely different policy' },
      'B',
      'Author B\'s criticism centers on practical and economic concerns rather than the moral framing used by Author A.'
    ),
    mc(
      'In dual passages about a proposed high-speed rail line, Author A highlights reduced travel times and environmental benefits. Author B highlights construction costs and disruption to existing neighborhoods. Both passages acknowledge that:',
      { A: 'the rail line would never be built', B: 'the project would require significant investment', C: 'high-speed rail technology does not exist', D: 'no one would ride the train' },
      'B',
      'Both authors implicitly or explicitly recognize that the project involves substantial costs.'
    ),
    mc(
      'Passage A discusses the benefits of year-round schooling, arguing it prevents learning loss. Passage B opposes year-round schooling, arguing that students need extended breaks for rest and informal learning. The authors would most likely agree that:',
      { A: 'learning loss is not a real phenomenon', B: 'the structure of the school calendar affects student outcomes', C: 'summer break should be extended to six months', D: 'students do not need any rest' },
      'B',
      'Both authors agree the calendar matters; they disagree about what schedule is best.'
    ),
    mc(
      'In a pair of passages about organic food, Author A argues it is healthier and better for the environment, while Author B argues it is too expensive for most families. Author A would most likely address Author B\'s concern by suggesting:',
      { A: 'that cost is irrelevant to food choices', B: 'that subsidies or policy changes could make organic food more affordable', C: 'that families should simply eat less food', D: 'that Author B is wrong about prices' },
      'B',
      'Author A would likely propose solutions to the cost barrier rather than dismiss it.'
    ),
    mc(
      'Passage A argues that zoos are essential for conservation and education. Passage B argues that zoos are inherently unethical because they confine wild animals. If a zoo successfully reintroduced an endangered species into the wild, Author B would most likely respond by:',
      { A: 'praising the zoo wholeheartedly', B: 'acknowledging the conservation success while maintaining that confinement remains ethically problematic', C: 'arguing that the species should not have been saved', D: 'ignoring the reintroduction entirely' },
      'B',
      'Author B would likely concede the positive outcome while reiterating ethical objections to the method.'
    ),
  ],

  'act-read-6': [
    mc(
      'A passage about the history of vaccines begins with a description of a deadly smallpox outbreak, then traces the development of the first vaccine, and ends with modern vaccination campaigns. The passage is primarily organized:',
      { A: 'from most to least important', B: 'chronologically, tracing events from past to present', C: 'by comparing two opposing viewpoints', D: 'in reverse chronological order' },
      'B',
      'The sequence from a historical outbreak to modern campaigns follows a clear chronological pattern.'
    ),
    mc(
      'In a passage about two approaches to urban planning, the author devotes one section to top-down government planning and another to community-led initiatives. This passage is primarily organized using:',
      { A: 'cause and effect', B: 'compare and contrast', C: 'chronological order', D: 'problem and solution' },
      'B',
      'Presenting two approaches in separate sections is a classic compare-and-contrast structure.'
    ),
    mc(
      'A passage about water scarcity opens by describing the problem, then presents three potential solutions: desalination, conservation, and water recycling. The overall structure of the passage is best described as:',
      { A: 'narrative storytelling', B: 'problem and solution', C: 'chronological history', D: 'classification by region' },
      'B',
      'The passage introduces a problem (scarcity) and then explores solutions, fitting a problem-solution structure.'
    ),
    mc(
      'In a passage about the decline of bee populations, the third paragraph shifts from describing the problem to explaining its causes. The third paragraph primarily functions to:',
      { A: 'repeat information from the first paragraph', B: 'transition from describing what is happening to explaining why it is happening', C: 'introduce an unrelated topic', D: 'provide the passage\'s conclusion' },
      'B',
      'The paragraph serves as a pivot from description of the problem to analysis of causes.'
    ),
    mc(
      'A passage about the American Civil Rights Movement includes a paragraph that describes the economic conditions of the 1950s South. This paragraph most likely functions to:',
      { A: 'distract from the main topic', B: 'provide historical context that helps explain the conditions leading to the movement', C: 'argue that economics is more important than civil rights', D: 'conclude the passage' },
      'B',
      'Background on economic conditions provides context that helps readers understand why the movement arose.'
    ),
    mc(
      'A natural science passage presents Hypothesis A in paragraph 2 and Hypothesis B in paragraph 3, then evaluates the evidence for each in paragraph 4. The passage uses which organizational structure?',
      { A: 'chronological narrative', B: 'presentation of competing hypotheses followed by evaluation', C: 'cause and effect only', D: 'spatial description' },
      'B',
      'Presenting two hypotheses and then weighing evidence is a structured analytical approach.'
    ),
    mc(
      'In a passage about the invention of the telephone, a paragraph describing Bell\'s early experiments is followed by a paragraph describing the public\'s initial reaction. The transition between these paragraphs moves from:',
      { A: 'the present to the past', B: 'the invention process to its social impact', C: 'one inventor to a completely different inventor', D: 'fiction to nonfiction' },
      'B',
      'The shift goes from describing the creative process to examining public response—development to impact.'
    ),
    mc(
      'A passage about climate change begins with current data, then looks back at historical climate patterns, and finally projects future scenarios. This structure can best be described as:',
      { A: 'strictly chronological from past to future', B: 'present-past-future, using the current situation as a starting point', C: 'alphabetical by topic', D: 'random with no clear organization' },
      'B',
      'Starting with the present, looking back, then projecting forward is a present-past-future organizational pattern.'
    ),
    mc(
      'In a passage about a chef\'s career, the second paragraph describes the chef\'s childhood. The placement of this paragraph most likely serves to:',
      { A: 'provide background that explains the chef\'s later passion for cooking', B: 'summarize the entire passage', C: 'contradict the first paragraph', D: 'introduce a different chef' },
      'A',
      'A childhood paragraph early in a career profile provides formative background information.'
    ),
    mc(
      'A passage argues that public transportation should be expanded. The author first describes the problem of traffic congestion, then presents evidence that public transit reduces congestion, and finally proposes specific policy changes. This structure is best described as:',
      { A: 'narrative with flashbacks', B: 'problem, evidence, and proposed solution', C: 'compare and contrast of two cities', D: 'definition and classification' },
      'B',
      'The passage follows a logical argument structure: identify the problem, present evidence, propose action.'
    ),
    mc(
      'In a passage about the effects of deforestation, the final paragraph returns to the image of a single tree that was described in the opening paragraph. This structural choice primarily serves to:',
      { A: 'introduce a new argument', B: 'create a sense of closure by framing the passage with a recurring image', C: 'prove that the author forgot the main point', D: 'change the passage\'s topic' },
      'B',
      'Returning to an opening image at the end creates a framing structure that provides thematic closure.'
    ),
    mc(
      'A passage about a medical breakthrough is structured as follows: Paragraph 1 describes the disease, Paragraph 2 explains previous failed treatments, Paragraph 3 introduces the new treatment, and Paragraph 4 discusses its results. This organization follows:',
      { A: 'spatial order', B: 'a logical progression from problem to background to solution to outcome', C: 'reverse chronological order', D: 'alphabetical order of topics' },
      'B',
      'The sequence—disease, failed treatments, new treatment, results—builds logically from problem to resolution.'
    ),
    mc(
      'In a passage about ancient Roman engineering, one paragraph describes aqueduct construction while the next describes road construction. These two paragraphs are linked primarily by:',
      { A: 'a shared focus on Roman engineering achievements', B: 'a cause-and-effect relationship', C: 'a shift from nonfiction to fiction', D: 'a contradiction between the two topics' },
      'A',
      'Both paragraphs are examples of the same broader topic: Roman engineering accomplishments.'
    ),
    mc(
      'A passage about immigration to the United States uses the first three paragraphs to present statistical data and the fourth paragraph to tell the story of one immigrant family. The fourth paragraph most likely functions to:',
      { A: 'contradict the statistics', B: 'humanize the data by providing a personal example', C: 'prove the statistics are wrong', D: 'shift to an unrelated topic' },
      'B',
      'A personal story after statistical data makes the abstract numbers concrete and relatable.'
    ),
    mc(
      'A passage about renewable energy discusses solar power, then wind power, then hydroelectric power. Each section follows the same pattern: definition, advantages, and limitations. This organizational approach is best described as:',
      { A: 'chronological', B: 'parallel structure across multiple subtopics', C: 'problem and solution', D: 'cause and effect' },
      'B',
      'Using the same pattern (definition, advantages, limitations) for each energy source creates parallel organization.'
    ),
    mc(
      'In a passage about the Great Depression, the author transitions from describing the stock market crash to discussing its effects on ordinary families. This transition serves to:',
      { A: 'change the subject entirely', B: 'move from a macroeconomic event to its human-level consequences', C: 'argue that the crash never happened', D: 'introduce a fictional character' },
      'B',
      'The transition shifts focus from the large-scale financial event to its personal, human impact.'
    ),
    mc(
      'A passage about a scientific discovery is structured so that the conclusion reveals information that reframes the opening paragraph. This structural technique primarily creates:',
      { A: 'confusion about the topic', B: 'a sense of surprise that encourages the reader to reconsider earlier information', C: 'a chronological timeline', D: 'a compare-and-contrast framework' },
      'B',
      'Revealing reframing information at the end creates a surprise that makes the reader reconsider earlier content.'
    ),
    mc(
      'In a passage about the evolution of popular music, each paragraph focuses on a different decade. This organization is best described as:',
      { A: 'spatial', B: 'chronological, organized by time period', C: 'order of importance', D: 'cause and effect' },
      'B',
      'Organizing by decade is a straightforward chronological approach.'
    ),
    mc(
      'A social science passage opens with an anecdote about a single voter, then broadens to discuss national voting trends. This opening paragraph functions to:',
      { A: 'present the passage\'s conclusion', B: 'draw the reader in with a specific example before widening the lens to a broader topic', C: 'argue that only one voter matters', D: 'define the word anecdote' },
      'B',
      'Starting with one person\'s story and then broadening to national trends uses a specific-to-general structure.'
    ),
    mc(
      'A passage about ocean pollution presents the following structure: effects on marine life, effects on human health, and effects on the economy. This organization groups information by:',
      { A: 'chronological sequence', B: 'category of impact', C: 'geographic region', D: 'alphabetical order' },
      'B',
      'Organizing by marine life, human health, and economy groups the discussion by type of impact.'
    ),
    mc(
      'In a passage about a controversial art installation, paragraph 3 presents the artist\'s defense of the work, and paragraph 4 presents critics\' objections. The relationship between these paragraphs is best described as:',
      { A: 'cause and effect', B: 'point and counterpoint', C: 'general to specific', D: 'chronological sequence' },
      'B',
      'Presenting the artist\'s defense followed by critics\' objections creates a point-counterpoint structure.'
    ),
    mc(
      'A passage about a historical figure begins at the end of the figure\'s life and then moves backward through key events. This structure is best described as:',
      { A: 'standard chronological order', B: 'reverse chronological order', C: 'compare and contrast', D: 'problem and solution' },
      'B',
      'Starting at the end and moving backward through time is reverse chronological order.'
    ),
    mc(
      'In a passage about earthquake preparedness, one paragraph explains what causes earthquakes and the next paragraph describes safety procedures during an earthquake. The second paragraph\'s function is to:',
      { A: 'repeat the first paragraph\'s content', B: 'shift from scientific explanation to practical application', C: 'contradict the scientific information', D: 'introduce a new topic unrelated to earthquakes' },
      'B',
      'Moving from causes to safety procedures shifts from theory to practice.'
    ),
    mc(
      'A passage about a town\'s economic recovery uses short, separate sections with subheadings like "The Crisis," "The Response," and "The Results." This format primarily helps the reader by:',
      { A: 'making the passage harder to follow', B: 'clearly signaling the organization and allowing the reader to track the progression of events', C: 'proving that all passages should have subheadings', D: 'hiding the main idea' },
      'B',
      'Subheadings explicitly signal the passage\'s structure and guide the reader through the progression.'
    ),
    mc(
      'In a passage about a painter, the author alternates between describing specific paintings and explaining the historical events that influenced them. This alternating structure primarily serves to:',
      { A: 'confuse the reader about whether the passage is about art or history', B: 'show the direct connection between the artist\'s work and the historical context', C: 'argue that art and history are unrelated', D: 'list paintings in alphabetical order' },
      'B',
      'Alternating between paintings and historical events highlights the relationship between the art and its context.'
    ),
  ],

  'act-read-7': [
    mc(
      'In a literary narrative, the narrator describes her grandmother\'s kitchen in vivid detail—the cracked tiles, the smell of cinnamon, the worn wooden table. These details primarily serve to:',
      { A: 'show that the kitchen needs renovation', B: 'create a warm, nostalgic mood and reveal the narrator\'s emotional connection to the place', C: 'argue that old kitchens are better than new ones', D: 'describe a kitchen from a home improvement catalog' },
      'B',
      'Sensory details about a familiar place build mood and signal emotional attachment.'
    ),
    mc(
      'A passage is narrated by a teenager who has just moved to a new town. The narrator describes other students using words like "alien" and "impenetrable." These word choices primarily reveal that the narrator feels:',
      { A: 'confident and excited', B: 'isolated and unable to connect with peers', C: 'angry at the school administration', D: 'bored by academic subjects' },
      'B',
      'Words like "alien" and "impenetrable" convey a sense of exclusion and difficulty fitting in.'
    ),
    mc(
      'In a literary narrative, a father and son take a long drive together in near silence. The passage ends with the son saying, "Thanks, Dad." The silence during the drive most likely represents:',
      { A: 'hostility between the two characters', B: 'a comfortable, unspoken understanding that does not require words', C: 'the son\'s inability to speak', D: 'the father\'s refusal to acknowledge his son' },
      'B',
      'The grateful ending suggests the silence was companionable and meaningful, not hostile.'
    ),
    mc(
      'A passage is told from the perspective of an elderly man recalling his first day at a new school decades ago. The narrator\'s perspective allows the passage to:',
      { A: 'present only the child\'s limited understanding of events', B: 'blend the child\'s original experience with the adult\'s mature reflection on its meaning', C: 'describe events the narrator did not witness', D: 'avoid any emotional content' },
      'B',
      'An adult looking back can combine the immediacy of childhood experience with the wisdom of later understanding.'
    ),
    mc(
      'In a literary narrative, the narrator describes a recurring dream about a locked door. The locked door most likely symbolizes:',
      { A: 'the narrator\'s interest in carpentry', B: 'something the narrator cannot access or an unresolved emotional barrier', C: 'a literal door that needs a key', D: 'the narrator\'s favorite room in the house' },
      'B',
      'A recurring locked door in a dream suggests inaccessibility or an unresolved issue in the narrator\'s life.'
    ),
    mc(
      'A passage describes a character who volunteers at a homeless shelter but tells no one about it. This detail most directly reveals that the character:',
      { A: 'is ashamed of volunteering', B: 'is privately compassionate and does not seek recognition', C: 'does not actually volunteer at all', D: 'wants to be praised publicly' },
      'B',
      'Volunteering without telling anyone suggests genuine compassion rather than a desire for recognition.'
    ),
    mc(
      'In a literary narrative, the mood shifts from lighthearted to somber when the narrator discovers an old photograph in a drawer. The photograph most likely triggers:',
      { A: 'hunger', B: 'a painful or bittersweet memory that changes the narrator\'s emotional state', C: 'a desire to organize the drawer', D: 'anger at the quality of the photograph' },
      'B',
      'A mood shift caused by a photograph suggests it evokes an emotional memory.'
    ),
    mc(
      'A passage uses first-person narration. The narrator admits, "I may be remembering this wrong." This admission primarily serves to:',
      { A: 'prove the narrator is lying about everything', B: 'acknowledge the limitations of memory and make the narrator more trustworthy through honesty', C: 'signal that the passage is nonfiction', D: 'confuse the reader intentionally' },
      'B',
      'Acknowledging fallibility actually increases credibility by showing the narrator is self-aware and honest.'
    ),
    mc(
      'In a literary narrative about two sisters, one sister is described through actions (cooking, fixing things, organizing) while the other is described through thoughts and feelings. This contrast most likely highlights:',
      { A: 'that the author forgot to describe the second sister\'s actions', B: 'the different ways each sister engages with the world—one through doing, the other through reflecting', C: 'that both sisters are identical', D: 'that actions are unimportant in literature' },
      'B',
      'The contrast in how each sister is characterized reveals their distinct personalities and approaches to life.'
    ),
    mc(
      'A passage ends with the narrator standing at a crossroads, looking down two paths. Given the passage\'s focus on the narrator\'s career decision, the crossroads most likely represents:',
      { A: 'a literal intersection in need of a traffic light', B: 'the narrator\'s choice between two different life directions', C: 'the end of the narrator\'s journey with no more decisions to make', D: 'a random detail with no symbolic meaning' },
      'B',
      'The crossroads image at the end of a passage about a career decision is a clear symbol of choosing between paths.'
    ),
    mc(
      'In a literary narrative, a character who was initially stern and unapproachable gradually begins to smile and share stories. This development primarily reveals:',
      { A: 'that the character has a split personality', B: 'that the character is warming up and becoming more open over time', C: 'that the author changed plans midway through the passage', D: 'that smiling is involuntary' },
      'B',
      'A gradual shift from stern to open shows character development—the character is becoming more comfortable and connected.'
    ),
    mc(
      'A passage describes a rainstorm that begins just as the main character receives bad news. The rainstorm most likely functions as:',
      { A: 'a purely factual weather report', B: 'a reflection of the character\'s emotional state, reinforcing the somber mood', C: 'evidence that the setting is tropical', D: 'a signal that the character enjoys storms' },
      'B',
      'Weather that mirrors a character\'s emotions is a common literary technique called pathetic fallacy.'
    ),
    mc(
      'In a literary narrative, the narrator repeatedly describes a neighbor as someone who "kept her garden perfect but never invited anyone inside." This detail most likely suggests the neighbor is:',
      { A: 'allergic to guests', B: 'someone who maintains appearances while remaining emotionally guarded', C: 'a professional gardener', D: 'planning to sell her house' },
      'B',
      'A perfect exterior combined with no invitation inside suggests a gap between public appearance and private life.'
    ),
    mc(
      'A passage is written from a third-person limited point of view, following the thoughts of a young boy. This narrative choice allows the reader to:',
      { A: 'know what every character is thinking at all times', B: 'experience events closely through the boy\'s perspective while maintaining some narrative distance', C: 'read the passage as a first-person memoir', D: 'understand the passage as a newspaper article' },
      'B',
      'Third-person limited provides access to one character\'s thoughts while maintaining the slight distance of third person.'
    ),
    mc(
      'In a literary narrative, a mother gives her daughter a handmade quilt before the daughter leaves for college. The quilt most likely symbolizes:',
      { A: 'the mother\'s sewing skills', B: 'family connection, warmth, and continuity across distance', C: 'the daughter\'s need for blankets in a cold dormitory', D: 'a crafting project with no deeper meaning' },
      'B',
      'A handmade gift given at a moment of separation carries symbolic weight about connection and care.'
    ),
    mc(
      'A passage describes a character who talks loudly in public but speaks quietly and hesitantly when alone with the narrator. This contrast most likely reveals that the character:',
      { A: 'has a hearing problem', B: 'uses public bravado to mask private insecurity', C: 'is the same in every situation', D: 'prefers loud environments' },
      'B',
      'The difference between public and private behavior suggests the character\'s confidence is performed rather than genuine.'
    ),
    mc(
      'In a literary narrative about a road trip, the narrator says, "The miles behind us felt heavier than the miles ahead." This statement most likely means:',
      { A: 'the car was overloaded with luggage', B: 'the experiences and memories they were leaving behind carried more emotional weight than anticipation of what was to come', C: 'the road behind them was uphill', D: 'they were running out of gasoline' },
      'B',
      'The figurative language about "heavier" miles refers to emotional weight, not physical weight.'
    ),
    mc(
      'A passage introduces a character who is described as "always the last to arrive and the first to leave." This detail characterizes the person as:',
      { A: 'extremely punctual', B: 'someone who avoids deep social engagement or commitment', C: 'a very busy professional', D: 'enthusiastic about every gathering' },
      'B',
      'Arriving late and leaving early suggests a pattern of minimal engagement or avoidance.'
    ),
    mc(
      'In a literary narrative, the narrator finds a bird with a broken wing and nurses it back to health. Given that the narrator has been recovering from an injury herself, the bird most likely represents:',
      { A: 'the narrator\'s interest in ornithology', B: 'the narrator\'s own healing process, mirrored in the care she gives the bird', C: 'a random subplot with no connection to the main story', D: 'evidence that the narrator lives near a forest' },
      'B',
      'A parallel between the narrator\'s recovery and the bird\'s healing creates a symbolic connection.'
    ),
    mc(
      'A passage reveals that the narrator\'s seemingly confident older brother secretly kept a journal full of self-doubt. This revelation primarily serves to:',
      { A: 'prove that journals are worthless', B: 'complicate the narrator\'s and reader\'s understanding of the brother by showing hidden vulnerability', C: 'demonstrate that the brother cannot write well', D: 'introduce a new conflict between the siblings' },
      'B',
      'Revealing private self-doubt beneath public confidence adds complexity and depth to the character.'
    ),
    mc(
      'In a literary narrative set during winter, the narrator describes bare trees, gray skies, and frozen ground. The setting most likely contributes to:',
      { A: 'a mood of warmth and celebration', B: 'a mood of bleakness, isolation, or dormancy that mirrors the narrative\'s emotional tone', C: 'a scientific discussion about climate', D: 'a cheerful and energetic atmosphere' },
      'B',
      'Winter imagery—bare trees, gray skies, frozen ground—typically creates a bleak or introspective mood.'
    ),
    mc(
      'A passage describes a conversation in which a character says one thing but the narrator notes that her eyes "told a different story." This detail primarily suggests:',
      { A: 'the character has unusual eyes', B: 'there is a gap between what the character says and what she truly feels', C: 'the narrator cannot hear properly', D: 'the conversation is taking place in the dark' },
      'B',
      'Eyes "telling a different story" indicates a disconnect between spoken words and true emotions.'
    ),
    mc(
      'In a literary narrative, the narrator mentions that the family dog always sat at the foot of the empty chair where the narrator\'s late grandfather used to sit. This detail primarily serves to:',
      { A: 'show that the dog is poorly trained', B: 'convey the lingering presence of the grandfather\'s absence and the family\'s unspoken grief', C: 'argue that dogs prefer empty chairs', D: 'describe the dog\'s sleeping habits' },
      'B',
      'The dog at the empty chair is a poignant image of continued loyalty that embodies the family\'s loss.'
    ),
    mc(
      'A passage uses second-person narration ("you"), placing the reader directly in the story. This unusual point of view primarily creates:',
      { A: 'confusion about who the author is', B: 'an immersive, intimate experience that makes the reader feel directly involved', C: 'a formal, academic tone', D: 'distance between the reader and the events' },
      'B',
      'Second person ("you") pulls the reader into the narrative, creating immediacy and intimacy.'
    ),
    mc(
      'In a literary narrative, the narrator describes returning to a childhood home that now seems smaller than remembered. This observation most directly reflects:',
      { A: 'that the house has been physically renovated to be smaller', B: 'the narrator\'s growth and changed perspective, revealing that memory reshapes our sense of place', C: 'an error in the narrator\'s memory', D: 'that the neighbors built a larger house next door' },
      'B',
      'A childhood home seeming smaller is a classic reflection of how growth changes perspective and perception.'
    ),
  ],

  'act-read-8': [
    mc(
      'In a social science passage about voter behavior, the author cites a longitudinal study tracking voting patterns over 20 years. The study is included primarily to:',
      { A: 'demonstrate that studies take too long', B: 'provide strong, long-term evidence supporting the author\'s claim about consistent voting trends', C: 'argue that all voters behave identically', D: 'fill space in the passage' },
      'B',
      'A longitudinal study provides robust evidence over time, strengthening the claim about sustained patterns.'
    ),
    mc(
      'A natural science passage explains that a particular species of frog can survive being frozen solid during winter. The passage then describes the biological mechanism that prevents ice from destroying the frog\'s cells. The second part of the passage primarily serves to:',
      { A: 'change the topic from frogs to ice', B: 'explain the scientific basis for the remarkable survival ability introduced in the first part', C: 'argue that all animals can survive freezing', D: 'describe the frog\'s appearance' },
      'B',
      'The second section provides the scientific explanation behind the phenomenon described in the first section.'
    ),
    mc(
      'In a humanities passage about a filmmaker, the author argues that the filmmaker\'s most acclaimed work was actually her weakest because it relied on spectacle rather than storytelling. This argument is best described as:',
      { A: 'a factual summary with no opinion', B: 'a contrarian claim that challenges the conventional evaluation of the filmmaker\'s work', C: 'an unrelated tangent', D: 'a neutral review with no evaluative judgment' },
      'B',
      'Arguing that an acclaimed work is actually weak is a deliberately contrarian position that challenges mainstream opinion.'
    ),
    mc(
      'A social science passage presents evidence that bilingual children outperform monolingual children on certain cognitive tests. The author then addresses the counterargument that socioeconomic factors, not bilingualism, explain the difference. Including the counterargument primarily serves to:',
      { A: 'weaken the author\'s own argument beyond repair', B: 'strengthen the argument by acknowledging and responding to a potential objection', C: 'prove that bilingualism has no benefits', D: 'change the passage\'s topic to economics' },
      'B',
      'Addressing a counterargument and responding to it makes the original argument more credible and thorough.'
    ),
    mc(
      'In a natural science passage, the author describes an experiment in which researchers altered one variable at a time to test its effect on plant growth. This methodological detail is included to:',
      { A: 'bore the reader with technical specifics', B: 'demonstrate that the experimental design was rigorous and the results are reliable', C: 'argue that plants are more important than animals', D: 'describe the researchers\' personal backgrounds' },
      'B',
      'Describing careful methodology reassures the reader that the findings are based on sound experimental practice.'
    ),
    mc(
      'A humanities passage about the Harlem Renaissance argues that the movement\'s literary contributions were as significant as its musical ones. The author supports this claim primarily by:',
      { A: 'listing the names of musicians without explanation', B: 'analyzing specific literary works and showing their cultural impact alongside well-known musical achievements', C: 'ignoring the musical contributions entirely', D: 'arguing that literature is always superior to music' },
      'B',
      'Analyzing specific literary works alongside musical ones directly supports the claim of equal significance.'
    ),
    mc(
      'In a social science passage about the effects of poverty on educational outcomes, the author notes that correlation does not prove causation. This statement is included primarily to:',
      { A: 'dismiss the entire study', B: 'demonstrate scientific caution and acknowledge the limits of the evidence presented', C: 'argue that poverty has no effect on education', D: 'confuse the reader' },
      'B',
      'The caveat about correlation and causation shows intellectual honesty and careful reasoning.'
    ),
    mc(
      'A natural science passage discusses how a newly discovered deep-sea organism challenges existing classifications. The passage then describes the debate among scientists about where the organism fits. The debate section primarily serves to:',
      { A: 'prove that scientists always agree', B: 'show that scientific classification is an ongoing process that responds to new evidence', C: 'argue that the organism does not exist', D: 'list every known species in the ocean' },
      'B',
      'The debate illustrates how scientific understanding evolves as new discoveries challenge existing frameworks.'
    ),
    mc(
      'In a humanities passage about architecture, the author writes that a building\'s design "speaks to the values of the society that built it." Applying this idea, a society that builds massive stone monuments most likely values:',
      { A: 'temporary structures and mobility', B: 'permanence, power, and legacy', C: 'privacy and minimalism', D: 'the lowest possible construction cost' },
      'B',
      'Massive stone monuments suggest a society that prizes endurance, authority, and leaving a lasting mark.'
    ),
    mc(
      'A social science passage about urbanization includes a graph showing population growth in cities over 50 years. The graph is included primarily to:',
      { A: 'decorate the passage', B: 'provide visual evidence that supports the passage\'s claims about sustained urban growth', C: 'confuse readers with unnecessary data', D: 'compare rural and urban cooking styles' },
      'B',
      'The graph provides concrete visual support for the textual claims about urbanization trends.'
    ),
    mc(
      'In a natural science passage, the author states that a widely accepted theory was revised after new fossil evidence was discovered. This information primarily illustrates:',
      { A: 'that all theories are always wrong', B: 'that scientific understanding can change when new evidence becomes available', C: 'that fossils are unimportant to science', D: 'that the original researchers were dishonest' },
      'B',
      'Theory revision based on new evidence is a central feature of how science progresses.'
    ),
    mc(
      'A humanities passage argues that a particular novel was underappreciated when it was published because its themes were ahead of its time. To support this argument, the author would most effectively include:',
      { A: 'a summary of the novel\'s plot without analysis', B: 'evidence showing that later audiences and critics embraced the themes the original audience rejected', C: 'a biography of the novel\'s publisher', D: 'a list of bestsellers from the same year' },
      'B',
      'Evidence of later appreciation directly supports the claim that the work was ahead of its time.'
    ),
    mc(
      'In a social science passage about criminal justice reform, the author presents recidivism data from five different countries. The use of international comparisons primarily serves to:',
      { A: 'prove that crime only exists in one country', B: 'broaden the argument by showing that different approaches produce different outcomes', C: 'argue that international travel reduces crime', D: 'list countries alphabetically' },
      'B',
      'International comparisons provide a wider evidence base and show that policy choices affect outcomes.'
    ),
    mc(
      'A natural science passage describes an experiment that produced unexpected results contradicting the researchers\' hypothesis. The passage notes that the researchers published their findings anyway. This detail suggests that:',
      { A: 'the researchers made an error', B: 'reporting unexpected results is valued in science because it contributes to knowledge', C: 'the experiment was a waste of time', D: 'only successful experiments should be published' },
      'B',
      'Publishing unexpected results reflects scientific integrity and the value of all findings to advancing knowledge.'
    ),
    mc(
      'In a humanities passage about a photographer, the author argues that the photographer\'s work blurred the line between documentary and art. This claim is best supported by:',
      { A: 'a list of camera models the photographer used', B: 'specific examples showing how the photographer\'s images combined factual subject matter with artistic composition', C: 'a discussion of photography pricing', D: 'the photographer\'s educational background only' },
      'B',
      'Specific examples demonstrating both documentary content and artistic technique directly support the claim.'
    ),
    mc(
      'A social science passage about the gig economy includes perspectives from workers, employers, and economists. By including all three perspectives, the author most likely intends to:',
      { A: 'prove that one perspective is completely wrong', B: 'provide a multifaceted analysis that reflects the complexity of the issue', C: 'show that the topic is not worth studying', D: 'avoid taking any position on any issue ever' },
      'B',
      'Multiple perspectives on the same issue create a comprehensive, nuanced analysis.'
    ),
    mc(
      'In a natural science passage, the author explains the water cycle using an analogy of a continuously running conveyor belt. This analogy primarily serves to:',
      { A: 'argue that water is manufactured in factories', B: 'make a complex natural process more accessible by comparing it to something familiar', C: 'prove that conveyor belts are more important than water', D: 'describe how factories operate' },
      'B',
      'Analogies to familiar objects help readers grasp abstract scientific concepts more easily.'
    ),
    mc(
      'A humanities passage discusses how a painter\'s style changed after traveling to Japan. The passage includes reproductions of paintings from before and after the trip. The reproductions are included primarily to:',
      { A: 'make the passage look more attractive', B: 'provide visual evidence of the stylistic shift the author describes', C: 'replace the need for any written analysis', D: 'show that all paintings look the same' },
      'B',
      'Visual comparisons directly support the claim about stylistic change by letting the reader see the difference.'
    ),
    mc(
      'In a social science passage, the author argues that early childhood education programs produce long-term economic benefits. The strongest piece of evidence for this claim would be:',
      { A: 'a testimonial from one parent', B: 'a study tracking participants over decades showing higher earnings and lower incarceration rates', C: 'a description of a classroom\'s wall decorations', D: 'a comparison of different playground designs' },
      'B',
      'Long-term data showing measurable outcomes provides the strongest evidence for long-term benefits.'
    ),
    mc(
      'A natural science passage about climate modeling notes that models are "simplifications of reality." The author includes this caveat primarily to:',
      { A: 'argue that models are useless and should be abandoned', B: 'acknowledge the inherent limitations of models while still supporting their value for understanding trends', C: 'prove that reality is simple', D: 'criticize the scientists who created the models' },
      'B',
      'Calling models simplifications acknowledges limitations while implying they remain useful tools.'
    ),
    mc(
      'In a humanities passage about the influence of African art on European modernism, the author provides specific examples from both traditions. The parallel examples primarily serve to:',
      { A: 'prove that one tradition is superior to the other', B: 'make the connection between the two traditions concrete and visible to the reader', C: 'list as many artworks as possible', D: 'argue that art has no cultural context' },
      'B',
      'Side-by-side examples make the claimed influence tangible rather than abstract.'
    ),
    mc(
      'A social science passage about media literacy argues that students should learn to evaluate news sources critically. The author supports this by describing a study where students could not distinguish between legitimate and fake news articles. The study is included to:',
      { A: 'embarrass the students who participated', B: 'demonstrate that the need for media literacy education is real and supported by evidence', C: 'argue that all news is fake', D: 'describe the design of the study\'s website' },
      'B',
      'The study provides concrete evidence that students lack skills the author argues they need.'
    ),
    mc(
      'In a natural science passage about antibiotic resistance, the author explains how overuse of antibiotics accelerates resistance. If a reader wanted to apply this concept to a different context, which scenario would be most analogous?',
      { A: 'A student studying more and getting better grades', B: 'Overuse of pesticides leading to pesticide-resistant insects', C: 'A car running out of fuel after a long drive', D: 'A library adding more books to its collection' },
      'B',
      'Overuse of pesticides leading to resistant insects parallels antibiotic overuse leading to resistant bacteria.'
    ),
    mc(
      'A humanities passage about a philosopher contrasts the philosopher\'s early and late writings, arguing that the late works represent a significant departure from earlier ideas. The most effective way for the author to support this claim would be to:',
      { A: 'state the claim without providing any evidence', B: 'quote and analyze specific passages from both periods showing clear differences in reasoning and conclusions', C: 'describe the philosopher\'s personal appearance', D: 'list every book the philosopher owned' },
      'B',
      'Direct textual evidence from both periods allows the reader to see the claimed departure firsthand.'
    ),
    mc(
      'In a natural science passage about renewable energy storage, the author discusses current battery technology limitations and then describes emerging alternatives. The passage structure moves from:',
      { A: 'solution to problem', B: 'current limitations to potential future solutions, reflecting the state of the field', C: 'fiction to nonfiction', D: 'unrelated topics presented randomly' },
      'B',
      'Moving from current limitations to emerging alternatives mirrors the field\'s trajectory from challenges to potential solutions.'
    ),
  ],
}
