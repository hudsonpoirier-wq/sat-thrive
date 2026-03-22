function mc(q, choices, correct, exp) {
  return { q, choices, correct, exp }
}

function fr(q, correct, exp) {
  return { q, correct, exp }
}

export const ACT_SCIENCE_QUESTIONS = {
  'act-sci-1': [
    mc(
      'A bar graph shows the average rainfall in four cities. City A has 30 cm, City B has 45 cm, City C has 20 cm, and City D has 55 cm. Which city receives the most rainfall?',
      { A: 'City A', B: 'City B', C: 'City C', D: 'City D' },
      'D',
      'City D has the tallest bar at 55 cm, indicating the most rainfall.'
    ),
    mc(
      'A line graph has time (hours) on the x-axis and temperature (°C) on the y-axis. At 2 hours the temperature is 25°C and at 4 hours it is 35°C. What is the temperature change between 2 and 4 hours?',
      { A: '5°C', B: '10°C', C: '15°C', D: '20°C' },
      'B',
      'The temperature increased from 25°C to 35°C, a change of 10°C.'
    ),
    mc(
      'A data table lists five minerals and their hardness on the Mohs scale. Quartz is listed as 7, Feldspar as 6, Topaz as 8, Diamond as 10, and Talc as 1. According to the table, which mineral is softest?',
      { A: 'Quartz', B: 'Feldspar', C: 'Talc', D: 'Diamond' },
      'C',
      'Talc has the lowest Mohs hardness value (1), making it the softest mineral listed.'
    ),
    mc(
      'A scatter plot shows the relationship between hours of study and test scores. The legend indicates that triangles represent science students and circles represent math students. A data point shown as a triangle at (5, 88) means:',
      { A: 'A math student scored 88 after 5 hours of study', B: 'A science student studied 88 hours and scored 5', C: 'A science student scored 88 after 5 hours of study', D: 'A math student studied 5 hours and scored 5' },
      'C',
      'Triangles represent science students, and the point (5, 88) shows 5 hours of study and a score of 88.'
    ),
    mc(
      'A pie chart shows the composition of Earth\'s atmosphere: 78% nitrogen, 21% oxygen, and 1% other gases. According to the chart, the two most abundant gases make up what percentage of the atmosphere?',
      { A: '78%', B: '89%', C: '99%', D: '100%' },
      'C',
      'Nitrogen (78%) plus oxygen (21%) equals 99% of the atmosphere.'
    ),
    mc(
      'A table shows the boiling points of four liquids: water at 100°C, ethanol at 78°C, acetone at 56°C, and mercury at 357°C. If a student heats all four liquids equally, which will boil first?',
      { A: 'Water', B: 'Ethanol', C: 'Acetone', D: 'Mercury' },
      'C',
      'Acetone has the lowest boiling point (56°C) and will reach its boiling point first.'
    ),
    mc(
      'A graph displays dissolved oxygen (mg/L) on the y-axis and water temperature (°C) on the x-axis. At 5°C the dissolved oxygen is 12 mg/L, and at 25°C it is 8 mg/L. What happens to dissolved oxygen as temperature increases?',
      { A: 'It increases', B: 'It decreases', C: 'It stays the same', D: 'It first increases then decreases' },
      'B',
      'The data shows dissolved oxygen dropping from 12 to 8 mg/L as temperature rises, indicating a decrease.'
    ),
    mc(
      'A dual-axis graph has precipitation (cm) on the left y-axis and average temperature (°C) on the right y-axis, both plotted against month on the x-axis. To find the precipitation in July, a student should read the value from:',
      { A: 'the right y-axis at the July mark', B: 'the left y-axis at the July mark', C: 'the x-axis at the July mark', D: 'the legend only' },
      'B',
      'Precipitation is measured on the left y-axis, so the student should read that axis at the July position.'
    ),
    mc(
      'A table shows four rock samples with their mass (g) and volume (cm^3). Sample 1: 20 g, 10 cm^3. Sample 2: 30 g, 10 cm^3. Sample 3: 40 g, 20 cm^3. Sample 4: 50 g, 25 cm^3. Which sample has the greatest density?',
      { A: 'Sample 1', B: 'Sample 2', C: 'Sample 3', D: 'Sample 4' },
      'B',
      'Density = mass/volume. Sample 2 has 30/10 = 3 g/cm^3, which is the highest density among all samples.'
    ),
    mc(
      'A graph shows population size on the y-axis and year on the x-axis for a deer herd. The curve rises steeply from 1990 to 2000, then levels off from 2000 to 2010. What best describes the population trend after 2000?',
      { A: 'Rapid growth', B: 'Rapid decline', C: 'Relatively stable', D: 'Extinction' },
      'C',
      'A leveling-off curve indicates the population has stabilized and is relatively constant.'
    ),
    mc(
      'A stacked bar graph shows energy sources for three countries. Country X\'s bar shows 40% coal, 30% natural gas, 20% nuclear, and 10% renewable. What percentage of Country X\'s energy comes from fossil fuels?',
      { A: '40%', B: '60%', C: '70%', D: '90%' },
      'C',
      'Coal (40%) and natural gas (30%) are fossil fuels, totaling 70%.'
    ),
    mc(
      'A table lists the pH values of five household substances: lemon juice (2.0), vinegar (2.8), milk (6.5), baking soda solution (8.3), and bleach (12.5). According to the table, which substance is closest to neutral (pH 7)?',
      { A: 'Lemon juice', B: 'Vinegar', C: 'Milk', D: 'Bleach' },
      'C',
      'Milk at pH 6.5 is closest to pH 7, which is neutral.'
    ),
    mc(
      'A graph plots altitude (km) on the x-axis and air pressure (atm) on the y-axis. The curve starts at 1.0 atm at sea level and drops to 0.3 atm at 9 km. Based on the graph, air pressure at 3 km is most likely:',
      { A: 'Greater than 1.0 atm', B: 'Between 0.7 and 0.9 atm', C: 'Less than 0.3 atm', D: 'Exactly 0.5 atm' },
      'B',
      'At 3 km, the pressure should be less than 1.0 atm but well above the 0.3 atm seen at 9 km, making 0.7-0.9 atm a reasonable reading.'
    ),
    mc(
      'A data table records the time (min) for an ice cube to melt completely at different room temperatures: 15°C takes 22 min, 20°C takes 16 min, 25°C takes 11 min, 30°C takes 7 min. According to the table, melting time is shortest at which temperature?',
      { A: '15°C', B: '20°C', C: '25°C', D: '30°C' },
      'D',
      'At 30°C the ice cube melts in only 7 minutes, the shortest time in the table.'
    ),
    mc(
      'A graph shows enzyme activity (units) on the y-axis and pH on the x-axis. The curve peaks at pH 2 and drops to near zero above pH 5. This enzyme most likely functions in:',
      { A: 'the small intestine (pH 7-8)', B: 'the stomach (pH 1.5-3.5)', C: 'the blood (pH 7.4)', D: 'saliva (pH 6.8)' },
      'B',
      'An enzyme with peak activity at pH 2 is well-suited to the acidic environment of the stomach.'
    ),
    mc(
      'A table shows the wavelengths of visible light colors: violet 380-450 nm, blue 450-495 nm, green 495-570 nm, yellow 570-590 nm, orange 590-620 nm, red 620-750 nm. A beam with a wavelength of 510 nm would appear as which color?',
      { A: 'Blue', B: 'Green', C: 'Yellow', D: 'Orange' },
      'B',
      '510 nm falls within the green range of 495-570 nm.'
    ),
    mc(
      'A graph shows the solubility of salt (g per 100 mL water) on the y-axis and temperature (°C) on the x-axis. The line rises from 35 g at 0°C to 39 g at 100°C. The graph indicates that the solubility of this salt:',
      { A: 'decreases sharply with temperature', B: 'increases slightly with temperature', C: 'is unaffected by temperature', D: 'doubles between 0°C and 100°C' },
      'B',
      'The solubility increases only from 35 to 39 g over the full temperature range, which is a slight increase.'
    ),
    mc(
      'A table records heart rate (bpm) for a runner at different times during exercise: 0 min = 70 bpm, 5 min = 110 bpm, 10 min = 140 bpm, 15 min = 155 bpm, 20 min = 160 bpm. Between which two time points does heart rate increase the most?',
      { A: '0 to 5 min', B: '5 to 10 min', C: '10 to 15 min', D: '15 to 20 min' },
      'A',
      'From 0 to 5 min the heart rate increases by 40 bpm (70 to 110), which is the largest jump.'
    ),
    mc(
      'A graph with a broken y-axis starts at 50 instead of 0. A student looking at two bars (one at 55, one at 60) might incorrectly conclude that:',
      { A: 'the values are nearly equal', B: 'the second bar is more than double the first', C: 'the difference between them is very large', D: 'neither bar has a valid measurement' },
      'C',
      'A broken axis exaggerates visual differences, making a small 5-unit gap look much larger than it actually is.'
    ),
    mc(
      'A data table shows that Experiment 1 used 50 mL of solution and produced 3.2 g of product, while Experiment 2 used 100 mL and produced 6.1 g. Based on the table, approximately doubling the solution volume:',
      { A: 'halved the product mass', B: 'had no effect on product mass', C: 'approximately doubled the product mass', D: 'tripled the product mass' },
      'C',
      'The product mass went from 3.2 g to 6.1 g, which is approximately double.'
    ),
    mc(
      'A line graph shows global average temperature anomaly (°C above baseline) from 1900 to 2020. The line stays near 0 from 1900 to 1960, then rises to +1.0°C by 2020. The steepest increase in temperature occurred during which period?',
      { A: '1900 to 1920', B: '1920 to 1940', C: '1940 to 1960', D: '1980 to 2020' },
      'D',
      'The steepest portion of the curve is from 1980 to 2020, where the most rapid temperature increase is visible.'
    ),
    mc(
      'A table shows four soil samples tested for nitrogen content (ppm) and crop yield (kg/hectare). Sample A: 10 ppm, 200 kg; Sample B: 20 ppm, 380 kg; Sample C: 30 ppm, 550 kg; Sample D: 40 ppm, 700 kg. According to the table, which sample had both the highest nitrogen and the highest yield?',
      { A: 'Sample A', B: 'Sample B', C: 'Sample C', D: 'Sample D' },
      'D',
      'Sample D has 40 ppm nitrogen and 700 kg/hectare yield, both the highest values in the table.'
    ),
    mc(
      'A graph plots current (amps) on the y-axis and voltage (volts) on the x-axis for a resistor. The line passes through the origin and through (6, 3). The graph shows that when voltage is 6 V, the current is:',
      { A: '1 amp', B: '2 amps', C: '3 amps', D: '6 amps' },
      'C',
      'The point (6, 3) on the graph directly shows that at 6 V the current is 3 amps.'
    ),
    mc(
      'A table shows the distance a car travels over time: at 1 s it has traveled 10 m, at 2 s it has traveled 20 m, at 3 s it has traveled 30 m. Based on the table, how far has the car traveled at 5 s if the pattern continues?',
      { A: '40 m', B: '45 m', C: '50 m', D: '60 m' },
      'C',
      'The car travels 10 m each second, so at 5 s it has traveled 50 m.'
    ),
    mc(
      'A graph shows bacterial colony count on a log scale (y-axis) over 24 hours (x-axis). A student misreads the y-axis and reports a colony count of 500 instead of 5,000. This error most likely occurred because:',
      { A: 'the x-axis was labeled incorrectly', B: 'the student did not account for the logarithmic scale', C: 'the graph had no title', D: 'the legend was missing a color' },
      'B',
      'Logarithmic scales have unequal spacing, and misreading them by one order of magnitude (500 vs 5,000) is a common error when the scale type is not recognized.'
    ),
  ],

  'act-sci-2': [
    mc(
      'A researcher tests whether the color of light affects photosynthesis rate in aquatic plants. She places identical plants under red, blue, green, and white light and counts oxygen bubbles per minute. The purpose of this experiment is to:',
      { A: 'determine which plant species grows fastest', B: 'investigate how light color influences photosynthesis rate', C: 'measure the temperature of each light source', D: 'compare different species of aquatic plants' },
      'B',
      'The experiment systematically varies light color and measures photosynthesis rate to determine the relationship.'
    ),
    mc(
      'In an experiment testing how salt concentration affects the hatching rate of brine shrimp eggs, a student prepares five beakers with salt concentrations of 0%, 1%, 2%, 3%, and 4%. What is being measured in this experiment?',
      { A: 'Salt concentration', B: 'Number of beakers', C: 'Hatching rate of the eggs', D: 'Temperature of the water' },
      'C',
      'The measured (dependent) variable is the hatching rate, which the student observes as the outcome.'
    ),
    mc(
      'A student wants to test whether music affects plant growth. She grows 10 plants with classical music playing 8 hours a day and 10 plants in silence. All plants receive the same soil, water, and sunlight. Why does she use 10 plants in each group instead of 1?',
      { A: 'To use up all available pots', B: 'To increase the sample size and improve reliability', C: 'To make the experiment take longer', D: 'To test more types of music' },
      'B',
      'A larger sample size reduces the impact of individual variation and makes results more reliable.'
    ),
    mc(
      'Scientists studying erosion set up three identical hillside plots. Plot 1 is bare soil, Plot 2 has grass cover, and Plot 3 has dense shrubs. They measure sediment runoff after simulated rainfall. Why did the scientists use simulated rainfall instead of waiting for natural rain?',
      { A: 'Natural rain would damage the plots', B: 'Simulated rainfall allows control over the amount and duration of water applied', C: 'Natural rain never occurs in the study area', D: 'Simulated rainfall is cheaper than natural rain' },
      'B',
      'Simulated rainfall allows the researchers to keep the water variable consistent across all three plots.'
    ),
    mc(
      'A researcher measures the effect of caffeine on reaction time. Subjects are given 0 mg, 50 mg, 100 mg, or 200 mg of caffeine and then tested with a computer-based reaction time test. Which of the following is an important procedural step?',
      { A: 'Giving all subjects 200 mg of caffeine', B: 'Using the same reaction time test for all subjects', C: 'Testing each subject at a different time of day', D: 'Allowing subjects to choose their caffeine dose' },
      'B',
      'Using the same test ensures consistency in measurement across all groups.'
    ),
    mc(
      'In a chemistry experiment, a student heats four different metals to the same temperature and places each on a block of wax to see how far each melts into the wax. The student is investigating:',
      { A: 'whether wax can be used as fuel', B: 'the specific heat capacity of wax', C: 'which metal retains and transfers the most heat', D: 'the melting point of each metal' },
      'C',
      'The depth of melting into wax indicates how much heat each metal transferred, reflecting its heat retention.'
    ),
    mc(
      'A biologist studying bird migration attaches GPS trackers to 50 birds of the same species in spring and records their locations weekly for 6 months. Which statement best describes the purpose of tracking 50 birds rather than just 5?',
      { A: 'More trackers are cheaper per unit', B: 'A larger sample provides a more representative picture of the species\' migration pattern', C: 'Each bird must be tracked exactly 10 times', D: 'The biologist needed to test 10 different tracker brands' },
      'B',
      'A larger sample better represents the variation in migration patterns across the species.'
    ),
    mc(
      'Students test whether the type of surface affects the distance a toy car rolls. They roll the same car from the same height on carpet, tile, wood, and sandpaper. Which variable must stay constant for a valid comparison?',
      { A: 'The type of surface', B: 'The distance traveled', C: 'The height from which the car is released', D: 'The color of the car' },
      'C',
      'The release height must be the same so that the car starts with the same potential energy on each surface.'
    ),
    mc(
      'A pharmaceutical company tests a new headache medication. Group A receives the medication, and Group B receives an identical-looking sugar pill. Neither the subjects nor the doctors know who received which pill. This setup describes:',
      { A: 'a single-blind study', B: 'a double-blind study', C: 'an observational study', D: 'a case study' },
      'B',
      'When neither the subjects nor the researchers know which group received the treatment, the study is double-blind.'
    ),
    mc(
      'An ecologist sets up pitfall traps in a forest to count ground-dwelling beetles. She places 20 traps in a grid pattern and checks them every 48 hours for two weeks. Why does she use 20 traps rather than a single trap?',
      { A: 'To catch 20 different species', B: 'To sample different microhabitats and obtain a more accurate count', C: 'To make the traps easier to find', D: 'To eliminate all beetles from the forest' },
      'B',
      'Multiple traps sample different locations and reduce bias from placing a trap in an unrepresentative spot.'
    ),
    mc(
      'A student drops balls of different masses from the same height and times how long each takes to hit the ground. She finds that all balls hit at nearly the same time. A classmate argues the experiment is flawed because she did not account for air resistance. This criticism is valid if:',
      { A: 'all balls have the same shape and size', B: 'the balls differ significantly in size and shape', C: 'the experiment is performed indoors', D: 'the student used a digital stopwatch' },
      'B',
      'If the balls differ in shape and size, air resistance affects them differently, which could confound the results.'
    ),
    mc(
      'In a controlled greenhouse experiment, researchers test three fertilizer types on tomato plants. They assign 15 plants to each fertilizer group and 15 plants to a no-fertilizer group. The no-fertilizer group serves as:',
      { A: 'the independent variable', B: 'the dependent variable', C: 'the control group', D: 'the hypothesis' },
      'C',
      'The no-fertilizer group provides a baseline for comparison against the fertilizer treatments.'
    ),
    mc(
      'A student investigates whether water temperature affects how quickly sugar dissolves. She adds 10 g of sugar to 100 mL of water at 20°C, 40°C, 60°C, and 80°C and times how long it takes to dissolve. A flaw in her procedure is that she stirs the 80°C sample but not the others. This flaw is problematic because:',
      { A: 'stirring does not affect dissolving', B: 'it introduces an additional variable that could explain the results', C: 'the sugar will not dissolve without stirring', D: 'all samples should have been at 80°C' },
      'B',
      'Stirring only one sample means the faster dissolving could be due to stirring rather than temperature alone.'
    ),
    mc(
      'Scientists want to test whether a new pesticide harms frogs. They expose 30 frogs to the pesticide and keep 30 frogs in clean water. After 30 days they compare survival rates. The clean-water frogs are part of the experiment because they:',
      { A: 'prove the hypothesis is correct', B: 'show what happens without the pesticide for comparison', C: 'eliminate the need for replication', D: 'ensure the pesticide works on all species' },
      'B',
      'The clean-water group serves as a control, showing normal survival rates for comparison.'
    ),
    mc(
      'A physics student wants to determine how the length of a pendulum affects its period. She tests pendulums of 20 cm, 40 cm, 60 cm, 80 cm, and 100 cm, each with the same mass bob released from the same angle. She times 10 full swings for each length. Why does she time 10 swings instead of 1?',
      { A: 'One swing is too fast to measure accurately, so timing multiple swings reduces measurement error', B: 'The pendulum only works after 10 swings', C: 'She needs exactly 10 data points', D: 'The first swing is always faster than the rest' },
      'A',
      'Timing multiple swings and dividing gives a more accurate measure of the period than timing a single swing.'
    ),
    mc(
      'A marine biologist studies coral bleaching by monitoring 12 reef sites monthly for 3 years, recording water temperature, pH, and coral health. This study is best described as:',
      { A: 'an experimental study with a control group', B: 'a longitudinal observational study', C: 'a double-blind clinical trial', D: 'a single controlled experiment' },
      'B',
      'The researcher observes natural conditions over an extended time without manipulating variables, making this a longitudinal observational study.'
    ),
    mc(
      'To test whether vitamin C reduces cold duration, researchers give 100 volunteers vitamin C supplements and 100 volunteers a placebo for three months. They record the number of days each person has cold symptoms. What is the dependent variable?',
      { A: 'Whether subjects receive vitamin C or placebo', B: 'The number of volunteers', C: 'The number of days with cold symptoms', D: 'The three-month duration of the study' },
      'C',
      'The dependent variable is the measured outcome: the number of days subjects experience cold symptoms.'
    ),
    mc(
      'A chemistry class tests how surface area affects reaction rate by reacting whole, halved, and powdered antacid tablets with vinegar and measuring gas production over 2 minutes. One group forgets to use the same brand of antacid for all trials. This oversight:',
      { A: 'has no effect on the experiment', B: 'could introduce a confounding variable since different brands may have different compositions', C: 'only matters if the tablets are different colors', D: 'improves the experiment by adding variety' },
      'B',
      'Different brands may have different active ingredients or amounts, making the surface area comparison invalid.'
    ),
    mc(
      'A researcher studying plant tropism places seedlings in boxes with a small hole on one side to let light in. She observes that stems grow toward the light. To confirm that it is light causing the bending and not gravity, she should:',
      { A: 'use taller boxes', B: 'rotate the light source to a different side and observe whether the stems redirect', C: 'remove all seedlings from the boxes', D: 'add fertilizer to the soil' },
      'B',
      'Changing the light direction and seeing if stems follow confirms that light, not gravity, drives the response.'
    ),
    mc(
      'Students test how insulation thickness affects heat loss. They wrap identical containers of hot water in 0, 1, 2, and 3 layers of foam and measure temperature every 5 minutes for 30 minutes. Which of the following would NOT be a valid conclusion from this experiment?',
      { A: 'More insulation layers slow heat loss', B: 'The container with 0 layers cools fastest', C: 'Foam insulation prevents all heat loss entirely', D: 'Temperature decreases over time in all containers' },
      'C',
      'Some heat loss always occurs; insulation slows it but never prevents it entirely, so this would not be a valid conclusion.'
    ),
    mc(
      'An agricultural scientist tests four irrigation schedules on soybean yields. She randomly assigns each schedule to 10 separate field plots. Random assignment is used to:',
      { A: 'ensure each plot gets the same treatment', B: 'minimize the effect of pre-existing differences among plots', C: 'increase the number of variables tested', D: 'eliminate the need for a control group' },
      'B',
      'Random assignment helps distribute pre-existing soil or sunlight differences evenly across treatment groups.'
    ),
    mc(
      'A student measures how the angle of a ramp affects the acceleration of a rolling ball. She uses angles of 10°, 20°, 30°, and 40° and times the ball over a 1-meter distance. She performs 5 trials at each angle. The procedure includes multiple trials at each angle in order to:',
      { A: 'test different balls', B: 'calculate an average and reduce random error', C: 'change the ramp material between trials', D: 'see if gravity changes over time' },
      'B',
      'Multiple trials allow calculation of an average, which reduces the impact of random timing errors.'
    ),
    mc(
      'Researchers want to determine if a new coating reduces bacterial growth on hospital surfaces. They coat 50 tiles and leave 50 tiles uncoated, then expose all 100 tiles to the same bacterial culture and count colonies after 48 hours. The uncoated tiles show an average of 320 colonies, while coated tiles show 45 colonies. The most appropriate conclusion is:',
      { A: 'The coating eliminates all bacteria', B: 'The coating significantly reduced bacterial colony counts compared to uncoated tiles', C: 'The bacteria prefer coated tiles', D: 'The experiment needs no replication' },
      'B',
      'The coated tiles had far fewer colonies, but some remained, so the coating reduced but did not eliminate bacterial growth.'
    ),
    mc(
      'An experiment tests five concentrations of a growth hormone on seedling height. The concentrations are 0 ppm, 5 ppm, 10 ppm, 15 ppm, and 20 ppm. How many different treatment levels does this experiment have?',
      { A: '3', B: '4', C: '5', D: '6' },
      'C',
      'There are five distinct concentrations being tested, so there are 5 treatment levels.'
    ),
    mc(
      'A geologist collects water samples from 8 different wells and tests each for lead contamination. She finds that 3 wells exceed safe levels. A valid next step would be to:',
      { A: 'conclude that all groundwater everywhere is contaminated', B: 'resample the 3 contaminated wells and test nearby wells to confirm and map the contamination', C: 'stop all testing immediately', D: 'assume the testing equipment was broken' },
      'B',
      'Resampling confirms the initial finding and testing nearby wells helps determine the extent of contamination.'
    ),
  ],

  'act-sci-3': [
    mc(
      'Students measured the mass of ice as it melted over 10 minutes, recording mass of liquid water every minute. The independent variable in this experiment is:',
      { A: 'mass of liquid water', B: 'temperature of the room', C: 'time', D: 'type of container' },
      'C',
      'Time is the variable the students deliberately vary (measure at each minute), making it the independent variable.'
    ),
    mc(
      'A biologist grows bacteria at five different temperatures and counts colonies after 24 hours. The dependent variable is:',
      { A: 'the type of bacteria', B: 'the temperature', C: 'the number of colonies', D: 'the 24-hour time period' },
      'C',
      'The number of colonies is the measured outcome that depends on the temperature chosen.'
    ),
    mc(
      'A student tests how the amount of sunlight affects the growth of bean plants. She places groups of plants in areas receiving 2, 4, 6, and 8 hours of light per day. The type of soil, amount of water, and pot size are kept the same. These unchanging factors are called:',
      { A: 'dependent variables', B: 'independent variables', C: 'controlled variables (constants)', D: 'hypotheses' },
      'C',
      'Factors deliberately kept the same to ensure a fair test are called controlled variables or constants.'
    ),
    mc(
      'In an experiment testing whether exercise intensity affects heart rate, a group of 20 participants exercises at low, medium, and high intensity. A control group of 20 participants rests quietly. The control group is included to:',
      { A: 'increase the total number of participants', B: 'show the baseline heart rate without exercise for comparison', C: 'eliminate the need for measuring heart rate', D: 'make the experiment longer' },
      'B',
      'The resting group provides a baseline heart rate to compare against the exercising groups.'
    ),
    mc(
      'A chemist adds different amounts of catalyst to five reaction mixtures and measures the time for each reaction to complete. Which is the independent variable?',
      { A: 'Reaction completion time', B: 'Amount of catalyst added', C: 'Temperature of the solution', D: 'Color of the solution' },
      'B',
      'The amount of catalyst is what the chemist deliberately changes, making it the independent variable.'
    ),
    mc(
      'A student investigates whether the type of liquid affects how fast a paper towel absorbs it. She tests water, milk, orange juice, and vinegar. She uses the same brand and size of paper towel each time. Keeping the paper towel brand and size constant ensures that:',
      { A: 'the experiment tests only one variable at a time', B: 'all liquids are absorbed equally', C: 'the results will always favor water', D: 'no controls are needed' },
      'A',
      'Holding the paper towel constant isolates the type of liquid as the only factor being tested.'
    ),
    mc(
      'In a plant growth experiment, Group A receives fertilizer and Group B does not. Both groups are watered equally and placed in the same sunlight. After 4 weeks, Group A is taller. A classmate says the result might be due to different soil quality. This concern is valid only if:',
      { A: 'the soil used in Groups A and B was different', B: 'the plants were the same species', C: 'both groups received water', D: 'the experiment lasted 4 weeks' },
      'A',
      'The concern is valid only if the soil differed between groups, which would introduce a confounding variable.'
    ),
    mc(
      'Researchers studying the effect of noise levels on concentration give participants a memory test while exposed to silence, 50 dB, 70 dB, or 90 dB of background noise. All participants take the same memory test at the same time of day. In this experiment, the memory test score is the:',
      { A: 'independent variable', B: 'controlled variable', C: 'dependent variable', D: 'constant' },
      'C',
      'The test score is measured as the outcome of different noise levels, making it the dependent variable.'
    ),
    mc(
      'A student tests three brands of batteries by placing each in an identical flashlight and timing how long the flashlight stays lit. She tests each brand three times. Which variable is the independent variable?',
      { A: 'Time the flashlight stays lit', B: 'Brand of battery', C: 'Brightness of the flashlight', D: 'Number of trials' },
      'B',
      'The brand of battery is what the student changes between tests, making it the independent variable.'
    ),
    mc(
      'A scientist tests the effect of pH on enzyme activity by mixing an enzyme with substrates at pH 2, 4, 6, 8, and 10. She keeps the enzyme concentration, substrate concentration, and temperature the same. If she also varied the temperature between pH levels, the experiment would be flawed because:',
      { A: 'temperature has no effect on enzymes', B: 'two variables would change simultaneously, making it impossible to attribute results to pH alone', C: 'pH and temperature are the same thing', D: 'the enzyme would stop working at all temperatures' },
      'B',
      'Changing two variables at once prevents the researcher from knowing which variable caused the observed change.'
    ),
    mc(
      'In an ecology study, researchers fence off two meadow plots. In Plot 1, they remove all rabbits. Plot 2 keeps its natural rabbit population. They measure grass height monthly for a year. What is the purpose of Plot 2?',
      { A: 'To test a different hypothesis', B: 'To serve as a control showing natural grass growth with rabbits present', C: 'To eliminate all variables', D: 'To add more independent variables' },
      'B',
      'Plot 2 serves as the control, showing what happens to grass height under normal conditions with rabbits.'
    ),
    mc(
      'A student wants to test whether the length of a spring affects how far it stretches when a mass is hung from it. She uses springs of 10 cm, 15 cm, 20 cm, and 25 cm, all made of the same material and thickness. Keeping material and thickness constant is important because:',
      { A: 'they are the dependent variables', B: 'changing them would introduce confounding variables', C: 'they have no effect on stretching', D: 'the student needs more variables to test' },
      'B',
      'If material or thickness differed, the stretch could be due to those factors rather than length alone.'
    ),
    mc(
      'A food scientist tests whether cooking time affects the vitamin C content of broccoli. She steams broccoli for 0, 2, 5, 10, and 15 minutes, then measures vitamin C. What is the dependent variable?',
      { A: 'Cooking time', B: 'Type of vegetable', C: 'Vitamin C content', D: 'Steam temperature' },
      'C',
      'Vitamin C content is measured as the outcome of different cooking times.'
    ),
    mc(
      'A class experiment tests how soil moisture affects seed germination. Five pots receive 10 mL, 20 mL, 30 mL, 40 mL, and 50 mL of water daily. All pots are in the same room, use the same soil, and contain 10 seeds each. A student argues that using different seed species in different pots would invalidate the results. This argument is correct because:',
      { A: 'different species may have different germination requirements, confounding the moisture variable', B: 'all seeds germinate identically regardless of species', C: 'species is the dependent variable', D: 'using different species would increase the sample size' },
      'A',
      'Different species have different water needs, so varying species would make it impossible to isolate the effect of moisture.'
    ),
    mc(
      'In a physics experiment, students test whether mass affects the speed at which objects fall. They drop balls of 50 g, 100 g, 150 g, and 200 g from the same height. They use balls of the same size and shape. The same size and shape requirement controls for:',
      { A: 'gravity', B: 'air resistance differences', C: 'mass differences', D: 'the dependent variable' },
      'B',
      'Using the same size and shape ensures that air resistance is the same for all balls, isolating mass as the variable.'
    ),
    mc(
      'A nutritionist studies whether breakfast type affects afternoon energy levels. Group 1 eats a high-protein breakfast, Group 2 eats a high-carbohydrate breakfast, and Group 3 skips breakfast. Energy levels are measured at 2 PM using a standardized survey. Group 3 serves as:',
      { A: 'the independent variable', B: 'the dependent variable', C: 'the control group', D: 'a confounding variable' },
      'C',
      'Group 3 (no breakfast) provides a baseline for comparison, serving as the control group.'
    ),
    mc(
      'A student tests the effect of water salinity on the buoyancy of an egg. She prepares solutions of 0%, 5%, 10%, 15%, and 20% salt and places an egg in each. She observes whether the egg sinks, suspends, or floats. The controlled variables include:',
      { A: 'salinity of the water', B: 'whether the egg sinks or floats', C: 'size of the container, water temperature, and type of egg', D: 'the number of different salt concentrations' },
      'C',
      'Container size, water temperature, and egg type must stay constant to isolate salinity as the tested variable.'
    ),
    mc(
      'A researcher tests a new drug on mice. She gives 20 mice the drug and 20 mice an inactive substance. All mice are the same age, sex, and breed. Having mice of the same age, sex, and breed is an example of:',
      { A: 'varying the independent variable', B: 'measuring the dependent variable', C: 'controlling potential confounding variables', D: 'creating additional experimental groups' },
      'C',
      'Matching age, sex, and breed across groups controls for biological differences that could affect the outcome.'
    ),
    mc(
      'A student studies the effect of temperature on the rate of sugar dissolving in water. She tests temperatures of 10°C, 30°C, 50°C, and 70°C. She accidentally uses 15 g of sugar in the 70°C trial and 10 g in all other trials. This means:',
      { A: 'the results for the 70°C trial may not be comparable to the other trials', B: 'the experiment is perfectly valid', C: 'sugar amount has no effect on dissolving rate', D: 'temperature is no longer the independent variable' },
      'A',
      'Using a different sugar amount changes a controlled variable, making that trial\'s results not directly comparable.'
    ),
    mc(
      'An experiment has four test groups receiving different concentrations of fertilizer and one group receiving no fertilizer. How many groups in total are used in the experiment?',
      { A: '3', B: '4', C: '5', D: '6' },
      'C',
      'Four test groups plus one control group (no fertilizer) equals 5 groups total.'
    ),
    mc(
      'In a study of how altitude affects boiling point, a researcher boils water at sea level, 1,000 m, 2,000 m, and 3,000 m. She uses the same pot, stove, and amount of water each time. The boiling point temperature is the:',
      { A: 'independent variable', B: 'controlled variable', C: 'dependent variable', D: 'confounding variable' },
      'C',
      'The boiling point temperature is what is measured at each altitude, making it the dependent variable.'
    ),
    mc(
      'A student grows radish seeds in cups with 0, 50, 100, 150, and 200 mL of water per week. After three weeks she measures root length. She wants to make a fair test. Which of the following would make the test unfair?',
      { A: 'Using the same type of radish seed in every cup', B: 'Placing all cups in the same window', C: 'Using different types of soil in different cups', D: 'Measuring root length with the same ruler' },
      'C',
      'Using different soils introduces a second variable, making the comparison of water amounts unfair.'
    ),
    mc(
      'A teacher asks students to identify the control in the following experiment: 100 mL of water is heated under a lid and without a lid to compare evaporation rates. The control setup is:',
      { A: 'the water heated with a lid, because it represents the condition without the variable of interest (open surface)', B: 'the water heated without a lid, because open evaporation is the normal condition', C: 'both setups together', D: 'neither setup is a control' },
      'B',
      'The open container represents the normal evaporation condition and serves as the baseline for comparing the effect of the lid.'
    ),
    mc(
      'A researcher discovers that plants near a window grow taller than plants in the center of a greenhouse. She suspects light intensity is the cause. To test this, she should:',
      { A: 'move all plants outside', B: 'set up an experiment varying light intensity while keeping all other conditions the same', C: 'assume her suspicion is correct without testing', D: 'change the soil and water for the center plants only' },
      'B',
      'A controlled experiment varying only light intensity would properly test whether light causes the growth difference.'
    ),
    mc(
      'In a taste test, participants evaluate three brands of orange juice. To reduce bias, the cups are labeled X, Y, and Z instead of by brand name. This procedure controls for:',
      { A: 'the temperature of the juice', B: 'participant expectations based on brand recognition', C: 'the number of participants', D: 'the vitamin C content of the juice' },
      'B',
      'Using coded labels prevents participants from being influenced by their existing opinions about a brand.'
    ),
  ],

  'act-sci-4': [
    mc(
      'A graph shows the temperature of a cooling cup of coffee over 60 minutes. The temperature drops quickly at first, then more slowly as it approaches room temperature. This pattern is best described as:',
      { A: 'a linear decrease', B: 'an exponential decay curve', C: 'a constant rate of change', D: 'a linear increase' },
      'B',
      'Rapid initial decrease that gradually slows is characteristic of exponential decay (Newton\'s law of cooling).'
    ),
    mc(
      'A scatter plot shows a strong positive trend between hours of sunlight and number of flowers on a bush. Data points exist for 4, 6, 8, and 10 hours of sunlight. The flower count at 4 hours is 12 and at 8 hours is 28. A reasonable estimate for the flower count at 6 hours is:',
      { A: '8', B: '15', C: '20', D: '30' },
      'C',
      'Interpolating between 12 (at 4 hours) and 28 (at 8 hours) gives approximately 20 at the midpoint of 6 hours.'
    ),
    mc(
      'A table shows the population of a town every 10 years: 1980 = 5,000; 1990 = 7,500; 2000 = 10,000; 2010 = 12,500. The trend in population growth is best described as:',
      { A: 'exponential growth', B: 'approximately linear growth of 2,500 per decade', C: 'declining population', D: 'no clear trend' },
      'B',
      'The population increases by approximately 2,500 each decade, indicating a linear trend.'
    ),
    mc(
      'A graph of plant height (cm) versus days shows data from Day 0 to Day 30. The line levels off after Day 20 at 40 cm. If the trend continues, the plant height at Day 40 is most likely:',
      { A: 'about 40 cm', B: 'about 60 cm', C: 'about 80 cm', D: 'about 0 cm' },
      'A',
      'Since the height leveled off at 40 cm after Day 20, extrapolation suggests it will remain near 40 cm.'
    ),
    mc(
      'A graph shows dissolved CO2 in a lake (mg/L) versus water temperature (°C). The line slopes downward from 8 mg/L at 5°C to 3 mg/L at 30°C. The overall trend indicates that:',
      { A: 'warmer water holds more CO2', B: 'temperature and dissolved CO2 are unrelated', C: 'cooler water holds more dissolved CO2', D: 'dissolved CO2 increases then decreases' },
      'C',
      'The downward trend shows that as temperature increases, dissolved CO2 decreases, meaning cooler water holds more.'
    ),
    mc(
      'Data collected during a chemical reaction show product mass increasing over time: 0 min = 0 g, 5 min = 8 g, 10 min = 14 g, 15 min = 18 g, 20 min = 20 g, 25 min = 20 g. At what time does the reaction appear to be essentially complete?',
      { A: '5 min', B: '10 min', C: '20 min', D: '25 min' },
      'C',
      'The product mass stops increasing after 20 min (stays at 20 g), indicating the reaction is complete by that point.'
    ),
    mc(
      'A graph shows the velocity of a car (m/s) over time (s). From 0 to 5 s, velocity increases linearly from 0 to 20 m/s. From 5 to 10 s, velocity stays at 20 m/s. From 10 to 15 s, velocity decreases linearly to 0. Between 5 s and 10 s, the car is:',
      { A: 'accelerating', B: 'decelerating', C: 'moving at constant velocity', D: 'stationary' },
      'C',
      'A flat line on a velocity-time graph indicates constant velocity (no acceleration).'
    ),
    mc(
      'A table shows bacterial colony counts doubling every 20 minutes: 0 min = 100, 20 min = 200, 40 min = 400, 60 min = 800. Based on this trend, the predicted count at 80 minutes is:',
      { A: '1,000', B: '1,200', C: '1,600', D: '2,400' },
      'C',
      'The pattern doubles every 20 minutes: 800 doubled is 1,600 at 80 minutes.'
    ),
    mc(
      'A graph shows that as the concentration of a reactant increases from 0.1 M to 0.5 M, the reaction rate increases. Beyond 0.5 M, the rate levels off. This leveling off most likely occurs because:',
      { A: 'the reactant has been completely used up', B: 'another factor, such as enzyme saturation, limits the rate', C: 'the graph is incorrect', D: 'concentration has no effect on rate' },
      'B',
      'When a rate plateaus despite increasing substrate, it typically indicates saturation of the enzyme or catalyst.'
    ),
    mc(
      'A scatter plot of chirps per minute versus temperature (°F) for crickets shows data points at 55°F (60 chirps), 65°F (100 chirps), 75°F (140 chirps), and 85°F (180 chirps). A reasonable estimate for chirps per minute at 70°F is:',
      { A: '100', B: '120', C: '140', D: '160' },
      'B',
      'Interpolating between 100 chirps at 65°F and 140 chirps at 75°F, the midpoint at 70°F is approximately 120 chirps.'
    ),
    mc(
      'A graph plots the distance a spring stretches (cm) versus the mass hung from it (g). The data points form a straight line through the origin. This indicates that:',
      { A: 'the spring does not stretch', B: 'stretch is directly proportional to mass', C: 'stretch decreases as mass increases', D: 'the relationship is exponential' },
      'B',
      'A straight line through the origin shows direct proportionality between stretch and mass (Hooke\'s Law).'
    ),
    mc(
      'A researcher plots crop yield (tons/hectare) versus rainfall (cm) for 8 years. The data shows yields increasing with rainfall up to 80 cm, then decreasing with rainfall above 80 cm. The overall pattern is:',
      { A: 'a steady increase', B: 'a steady decrease', C: 'an inverted U-shape (rise then fall)', D: 'no trend' },
      'C',
      'Yields increasing then decreasing around a peak value creates an inverted U-shaped curve.'
    ),
    mc(
      'A data table shows pressure (atm) and volume (L) for a gas at constant temperature: 1 atm / 10 L, 2 atm / 5 L, 4 atm / 2.5 L. The trend between pressure and volume is:',
      { A: 'directly proportional', B: 'inversely proportional', C: 'constant', D: 'no relationship' },
      'B',
      'As pressure doubles, volume halves, showing an inverse proportional relationship (Boyle\'s Law).'
    ),
    mc(
      'A graph of global sea level rise (mm) from 1900 to 2020 shows the line curving upward, with a steeper slope after 1990 than before 1990. This indicates that:',
      { A: 'sea level rise has been decelerating', B: 'the rate of sea level rise has increased in recent decades', C: 'sea levels have been decreasing', D: 'the rate has been constant throughout' },
      'B',
      'A steepening curve means the rate of increase is itself growing, indicating acceleration.'
    ),
    mc(
      'A line graph shows that a balloon rises from 0 m to 600 m in 3 minutes at a constant rate. Based on this trend, at what height (in meters) will the balloon be at 5 minutes?',
      { A: '800', B: '900', C: '1,000', D: '1,200' },
      'C',
      'The balloon rises at 200 m/min (600/3). At 5 min: 200 x 5 = 1,000 m.'
    ),
    mc(
      'A graph shows the light intensity (lux) at various depths in a lake: 0 m = 1,000 lux, 2 m = 500 lux, 4 m = 250 lux, 6 m = 125 lux. The pattern suggests that light intensity:',
      { A: 'decreases linearly with depth', B: 'halves with each additional 2 m of depth', C: 'remains constant with depth', D: 'increases with depth' },
      'B',
      'The values show exponential decay: 1000, 500, 250, 125, halving every 2 meters.'
    ),
    mc(
      'A graph shows the number of daylight hours in a Northern Hemisphere city across 12 months. The graph peaks in June and reaches its minimum in December. If the pattern repeats, daylight hours in the following January would most likely be:',
      { A: 'at their maximum', B: 'slightly more than December', C: 'equal to the previous June', D: 'zero' },
      'B',
      'After the December minimum, daylight hours begin increasing again, so January would show slightly more than December.'
    ),
    mc(
      'A table shows the half-life decay of a radioactive sample: 0 years = 800 g, 10 years = 400 g, 20 years = 200 g, 30 years = 100 g. How much of the sample would remain at 40 years?',
      { A: '0 g', B: '25 g', C: '50 g', D: '75 g' },
      'C',
      'Each 10 years the mass halves. At 40 years: 100/2 = 50 g.'
    ),
    mc(
      'A graph shows tree ring width (mm) over 100 years. Wider rings appear during years with more rainfall. A section of very narrow rings from 1930-1935 most likely indicates:',
      { A: 'a period of unusually high rainfall', B: 'a drought period with very low rainfall', C: 'rapid population growth', D: 'volcanic activity' },
      'B',
      'Narrow tree rings correspond to years with less available water, indicating drought conditions.'
    ),
    mc(
      'A student measures the speed of sound at different air temperatures: 0°C = 331 m/s, 10°C = 337 m/s, 20°C = 343 m/s, 30°C = 349 m/s. The speed increases by approximately how much for each 10°C rise?',
      { A: '3 m/s', B: '6 m/s', C: '12 m/s', D: '20 m/s' },
      'B',
      'Each 10°C increase raises the speed by about 6 m/s (331 to 337 to 343 to 349).'
    ),
    mc(
      'A graph of yeast cell count versus time shows an S-shaped (sigmoidal) curve. The curve rises slowly at first, then steeply, then levels off. The leveling off at the top of the curve most likely represents:',
      { A: 'the death of all yeast cells', B: 'the carrying capacity of the environment', C: 'the beginning of growth', D: 'an error in measurement' },
      'B',
      'An S-shaped growth curve levels off at the carrying capacity, where resources limit further growth.'
    ),
    mc(
      'Data on ice cream sales and drowning incidents both increase during summer months. A student concludes that ice cream sales cause drownings. This conclusion is flawed because:',
      { A: 'the data sets have different units', B: 'correlation does not imply causation; both may be related to a third factor such as warm weather', C: 'the data were collected incorrectly', D: 'ice cream is not sold in summer' },
      'B',
      'Both variables increase due to warmer weather, not because one causes the other. Correlation does not equal causation.'
    ),
    mc(
      'A graph plots soil moisture (%) over 30 days. Moisture drops steadily from 40% to 15% between Day 1 and Day 20, then rises sharply from 15% to 35% between Day 20 and Day 25. The sharp rise is most likely explained by:',
      { A: 'continued drought', B: 'a significant rainfall event around Day 20', C: 'measurement error throughout the experiment', D: 'soil gradually losing moisture' },
      'B',
      'A sharp increase in soil moisture after a sustained decline strongly suggests a rainfall event.'
    ),
    mc(
      'A graph shows a linear trend where a plant grows 3 cm per week. At Week 2, the plant is 10 cm tall. Based on this trend, how tall will the plant be at Week 6?',
      { A: '18', B: '22', C: '24', D: '28' },
      'B',
      'From Week 2 to Week 6 is 4 weeks. Growth = 4 x 3 = 12 cm added to 10 cm gives 22 cm.'
    ),
    mc(
      'A graph shows the relationship between voltage (V) and current (A) for a metal wire. The data points form a straight line with a positive slope passing through the origin. If the voltage were increased beyond the highest measured data point, the current would most likely:',
      { A: 'drop to zero', B: 'continue to increase at the same rate', C: 'remain unchanged', D: 'become negative' },
      'B',
      'A linear trend through the origin suggests that current will continue increasing proportionally as voltage increases (Ohm\'s Law).'
    ),
  ],

  'act-sci-5': [
    mc(
      'Scientist 1 argues that the extinction of the dinosaurs was caused primarily by an asteroid impact. Scientist 2 argues it was caused primarily by massive volcanic eruptions. Which observation would most directly support Scientist 1\'s view?',
      { A: 'Lava flows from 66 million years ago cover large areas in India', B: 'A layer of iridium, rare on Earth but common in asteroids, is found worldwide at the extinction boundary', C: 'Volcanic gases can cause climate cooling', D: 'Dinosaur fossils are found on every continent' },
      'B',
      'Iridium is rare on Earth but abundant in asteroids, so a global iridium layer strongly supports the impact hypothesis.'
    ),
    mc(
      'Scientist A claims that the universe will expand forever. Scientist B claims the expansion will eventually reverse and the universe will contract. Both scientists agree on which point?',
      { A: 'The universe will eventually contract', B: 'The universe is currently expanding', C: 'Dark energy does not exist', D: 'The universe has a definite edge' },
      'B',
      'Both scientists accept that the universe is currently expanding; they disagree about whether it will continue or reverse.'
    ),
    mc(
      'Researcher 1 believes migratory birds navigate primarily using Earth\'s magnetic field. Researcher 2 believes they navigate primarily using star patterns. An experiment shows that birds wearing magnetic disruptors still migrate accurately on clear nights but become disoriented on cloudy nights. This result:',
      { A: 'supports Researcher 1 only', B: 'supports Researcher 2 only', C: 'supports both researchers equally', D: 'disproves both researchers' },
      'B',
      'Birds navigated well using stars (clear nights) even with disrupted magnetic sense, but failed without star visibility, supporting Researcher 2.'
    ),
    mc(
      'Student 1 hypothesizes that a mysterious crater on Mars was formed by a meteorite impact. Student 2 hypothesizes it was formed by a collapsed lava tube. Which evidence would weaken Student 2\'s hypothesis?',
      { A: 'The crater shows no evidence of past volcanic activity in the surrounding region', B: 'Mars has many known lava tubes', C: 'The crater is circular', D: 'The crater is located near the equator' },
      'A',
      'If there is no volcanic activity nearby, a lava tube origin becomes less plausible, weakening Student 2\'s claim.'
    ),
    mc(
      'Scientist X proposes that a species of deep-sea fish uses bioluminescence primarily to attract prey. Scientist Y proposes it uses bioluminescence primarily to communicate with mates. Which observation supports Scientist X?',
      { A: 'The fish flashes light only during mating season', B: 'The fish dangles a glowing lure near its mouth and small organisms swim toward it', C: 'Male and female fish glow at different frequencies', D: 'The fish only glows when other members of the species are nearby' },
      'B',
      'A glowing lure that attracts small organisms directly supports the prey-attraction hypothesis.'
    ),
    mc(
      'Two geologists disagree about how a canyon formed. Geologist 1 says it formed through millions of years of river erosion. Geologist 2 says it formed rapidly during a catastrophic flood. Which evidence would support Geologist 1?',
      { A: 'Multiple distinct sediment layers showing gradual deposition over millions of years along the canyon walls', B: 'A single chaotic deposit of mixed sediment sizes', C: 'Large boulders scattered randomly across the canyon floor', D: 'Evidence of a recent dam collapse upstream' },
      'A',
      'Distinct, orderly sediment layers deposited over long periods support a gradual erosion process.'
    ),
    mc(
      'Scientist A believes that a newly discovered organism is a fungus. Scientist B believes it is a protist. Both would agree that the organism:',
      { A: 'belongs to the plant kingdom', B: 'is a eukaryote', C: 'performs photosynthesis', D: 'is a prokaryote' },
      'B',
      'Both fungi and protists are eukaryotes (cells with nuclei), so both scientists would agree on this classification.'
    ),
    mc(
      'Hypothesis 1 states that acid rain is the primary cause of declining fish populations in a lake. Hypothesis 2 states that overfishing is the primary cause. Data showing that the lake\'s pH has remained stable at 7.0 for the past 20 years would:',
      { A: 'support Hypothesis 1', B: 'weaken Hypothesis 1', C: 'support both hypotheses', D: 'have no relevance to either hypothesis' },
      'B',
      'A stable neutral pH means acid rain has not significantly affected the lake, weakening the acid rain hypothesis.'
    ),
    mc(
      'Model 1 explains earthquakes as caused by tectonic plate movement along fault lines. Model 2 explains certain earthquakes as caused by volcanic magma movement. A strong earthquake occurs hundreds of kilometers from any volcano but directly along a major fault line. This event:',
      { A: 'supports Model 2 only', B: 'contradicts both models', C: 'is consistent with Model 1', D: 'proves volcanoes cause all earthquakes' },
      'C',
      'An earthquake along a fault line far from volcanoes is fully consistent with the tectonic plate model.'
    ),
    mc(
      'Researcher A argues that human-produced CO2 is the main driver of recent global warming. Researcher B argues that natural solar cycles are the main driver. Data showing that solar output has been relatively constant while temperatures have risen sharply would:',
      { A: 'support Researcher B', B: 'weaken Researcher B\'s argument', C: 'support both researchers equally', D: 'be irrelevant to the debate' },
      'B',
      'If solar output is constant but temperatures are rising, solar cycles cannot explain the warming, weakening Researcher B\'s position.'
    ),
    mc(
      'Scientist 1 proposes that a rock layer was deposited in a shallow marine environment. Scientist 2 proposes it was deposited in a desert environment. Fossils of marine shells found in the rock layer would:',
      { A: 'support Scientist 1', B: 'support Scientist 2', C: 'support both equally', D: 'weaken both' },
      'A',
      'Marine shell fossils are strong evidence that the rock formed in a marine (ocean) environment.'
    ),
    mc(
      'Two students disagree about why plants grow toward light. Student 1 says the cells on the shaded side elongate faster due to auxin redistribution. Student 2 says the cells on the lit side die, causing the plant to lean. An experiment showing healthy cells on both sides but longer cells on the shaded side would:',
      { A: 'support Student 1', B: 'support Student 2', C: 'support both equally', D: 'disprove both' },
      'A',
      'If cells on both sides are healthy but shaded-side cells are longer, Student 1\'s auxin-driven elongation model is supported.'
    ),
    mc(
      'View 1 states that the Moon formed from debris after a Mars-sized body struck the early Earth. View 2 states that the Moon was captured by Earth\'s gravity as it passed nearby. The finding that Moon rocks have a chemical composition very similar to Earth\'s mantle supports:',
      { A: 'View 1, because a giant impact would produce debris from Earth\'s mantle', B: 'View 2, because captured objects share the same chemistry', C: 'neither view', D: 'both views equally' },
      'A',
      'If the Moon formed from Earth\'s mantle material blasted off by impact, similar chemistry is expected, supporting View 1.'
    ),
    mc(
      'Scientist A believes a certain protein acts as an enzyme that speeds up a reaction. Scientist B believes it acts as a structural component with no catalytic role. Adding the protein to the reaction mixture and observing a significant increase in reaction rate would:',
      { A: 'weaken Scientist A\'s claim', B: 'support Scientist A\'s claim', C: 'support Scientist B\'s claim', D: 'be irrelevant to both claims' },
      'B',
      'If adding the protein increases the reaction rate, it demonstrates catalytic activity, supporting the enzyme hypothesis.'
    ),
    mc(
      'Theory 1 attributes mass extinctions primarily to asteroid impacts. Theory 2 attributes them primarily to climate change caused by volcanic activity. Both theories would agree that mass extinctions:',
      { A: 'are caused solely by asteroids', B: 'result in the disappearance of many species over a relatively short geological period', C: 'are caused solely by volcanoes', D: 'have never actually occurred' },
      'B',
      'Both theories accept that mass extinctions involve the loss of many species; they disagree only on the primary cause.'
    ),
    mc(
      'Viewpoint 1 claims that high atmospheric CO2 levels during the Cretaceous period led to warmer global temperatures. Viewpoint 2 claims ocean currents were the primary factor controlling Cretaceous climate. Evidence that CO2 levels were five times higher than today and correlated closely with temperature records would:',
      { A: 'support Viewpoint 1', B: 'support Viewpoint 2', C: 'weaken Viewpoint 1', D: 'be equally supportive of both' },
      'A',
      'A strong correlation between high CO2 and warm temperatures directly supports the CO2-driven warming hypothesis.'
    ),
    mc(
      'Scientist 1 argues that a certain behavior in wolves is learned. Scientist 2 argues it is entirely innate (genetic). If wolf pups raised in complete isolation from other wolves still display the behavior, this would:',
      { A: 'support Scientist 1', B: 'support Scientist 2', C: 'support both equally', D: 'disprove both' },
      'B',
      'If the behavior appears without any opportunity for learning, it is likely innate, supporting Scientist 2.'
    ),
    mc(
      'Hypothesis A states that the antibiotic resistance in a bacterial population arose through random mutation and natural selection. Hypothesis B states that individual bacteria developed resistance in direct response to the antibiotic. Finding that resistant bacteria existed in the population before any antibiotic exposure would:',
      { A: 'support Hypothesis A', B: 'support Hypothesis B', C: 'weaken both hypotheses', D: 'have no bearing on either hypothesis' },
      'A',
      'Pre-existing resistance before antibiotic exposure supports the mutation/selection model over the direct response model.'
    ),
    mc(
      'Researcher 1 claims a local river is polluted primarily by agricultural runoff. Researcher 2 claims it is polluted primarily by industrial discharge. Both researchers would likely agree that:',
      { A: 'the river water quality has declined', B: 'agriculture has no impact on water quality', C: 'industry has no impact on water quality', D: 'the river is not actually polluted' },
      'A',
      'Both researchers accept that pollution exists in the river; they disagree only about the primary source.'
    ),
    mc(
      'Model A suggests early Earth\'s atmosphere contained mainly CO2 and N2. Model B suggests it contained mainly methane and ammonia. The discovery of ancient minerals that form only in the presence of CO2-rich atmospheres would:',
      { A: 'weaken Model A', B: 'support Model A', C: 'support Model B', D: 'be irrelevant to both models' },
      'B',
      'Minerals requiring CO2-rich conditions to form directly support Model A\'s proposed atmospheric composition.'
    ),
    mc(
      'Scientist 1 argues that dark matter consists of unknown subatomic particles. Scientist 2 argues that dark matter is actually a modification of gravity at large scales, not a substance at all. An experiment that directly detects a new subatomic particle with the expected properties of dark matter would:',
      { A: 'support Scientist 1 and weaken Scientist 2', B: 'support both equally', C: 'support Scientist 2 and weaken Scientist 1', D: 'be irrelevant to the debate' },
      'A',
      'Direct detection of a dark matter particle would confirm Scientist 1\'s view and undermine the idea that modified gravity explains the observations.'
    ),
    mc(
      'Two ecologists disagree about why a songbird population is declining. Ecologist 1 blames habitat loss from deforestation. Ecologist 2 blames increased predation by invasive cats. Data showing that areas with no cats still have declining songbird populations where deforestation is high would:',
      { A: 'support Ecologist 1', B: 'support Ecologist 2', C: 'weaken both', D: 'support both equally' },
      'A',
      'Declining populations in cat-free areas with deforestation point to habitat loss as the primary factor.'
    ),
    mc(
      'Hypothesis 1 proposes that coral bleaching is caused by rising ocean temperatures. Hypothesis 2 proposes that it is caused by ocean acidification. A study finds that corals bleach at normal pH when temperature rises, but do not bleach at elevated temperatures if pH is artificially lowered. This result:',
      { A: 'supports Hypothesis 1, since bleaching occurred with temperature increase regardless of pH', B: 'supports Hypothesis 2', C: 'supports both equally', D: 'disproves both' },
      'A',
      'Bleaching occurred when temperature rose even at normal pH, and did not occur from pH changes alone, supporting the temperature hypothesis.'
    ),
    mc(
      'Scientist A proposes that a fossil organism was an aquatic predator. Scientist B proposes it was a terrestrial herbivore. Sharp, pointed teeth and streamlined body shape in the fossil would:',
      { A: 'support Scientist A', B: 'support Scientist B', C: 'support neither', D: 'support both' },
      'A',
      'Sharp teeth suggest predation and a streamlined body suggests aquatic locomotion, supporting the aquatic predator hypothesis.'
    ),
    mc(
      'Two students debate whether salt or sugar dissolves faster in water at room temperature. Student 1 predicts salt dissolves faster. Student 2 predicts sugar dissolves faster. They design an experiment adding 10 g of each to 200 mL of water and timing dissolution. Regardless of the outcome, both students would agree that:',
      { A: 'salt always dissolves faster than sugar', B: 'the experiment should use the same amount of water and solute for a fair comparison', C: 'the type of solute does not matter', D: 'no experiment is needed to settle the debate' },
      'B',
      'Both students accept that a fair test requires controlled conditions: same water volume, same solute mass, and same temperature.'
    ),
  ],

  'act-sci-6': [
    mc(
      'A sample travels 150 meters in 30 seconds. What is its average speed?',
      { A: '3 m/s', B: '5 m/s', C: '15 m/s', D: '50 m/s' },
      'B',
      'Average speed = distance / time = 150 / 30 = 5 m/s.'
    ),
    mc(
      'A solution has a concentration of 25 g/L. If a student has 4 liters of this solution, how many grams of solute does she have?',
      { A: '6.25 g', B: '29 g', C: '100 g', D: '625 g' },
      'C',
      '25 g/L x 4 L = 100 g of solute.'
    ),
    mc(
      'A student measures the mass of a rock as 45 g and its volume as 15 cm^3. The density of the rock is:',
      { A: '0.33 g/cm^3', B: '3 g/cm^3', C: '30 g/cm^3', D: '675 g/cm^3' },
      'B',
      'Density = mass / volume = 45 / 15 = 3 g/cm^3.'
    ),
    mc(
      'In an experiment, 60 out of 200 seeds germinated. What percentage of seeds germinated?',
      { A: '20%', B: '25%', C: '30%', D: '35%' },
      'C',
      '(60 / 200) x 100 = 30%.'
    ),
    mc(
      'A reaction produces 36 mL of gas in 12 minutes. What is the average rate of gas production?',
      { A: '2 mL/min', B: '3 mL/min', C: '4 mL/min', D: '6 mL/min' },
      'B',
      'Rate = 36 mL / 12 min = 3 mL/min.'
    ),
    mc(
      'A table shows that Organism A has a mass of 8 kg and Organism B has a mass of 2 kg. The ratio of Organism A\'s mass to Organism B\'s mass is:',
      { A: '1:4', B: '2:8', C: '4:1', D: '8:1' },
      'C',
      '8 kg : 2 kg simplifies to 4:1.'
    ),
    mc(
      'A car burns 12 gallons of fuel to travel 360 miles. Its fuel efficiency is:',
      { A: '20 miles/gallon', B: '30 miles/gallon', C: '36 miles/gallon', D: '42 miles/gallon' },
      'B',
      'Fuel efficiency = 360 miles / 12 gallons = 30 miles/gallon.'
    ),
    mc(
      'A researcher needs to convert 2.5 kilograms to grams. The correct conversion is:',
      { A: '25 g', B: '250 g', C: '2,500 g', D: '25,000 g' },
      'C',
      '1 kg = 1,000 g, so 2.5 kg = 2,500 g.'
    ),
    mc(
      'A population of 500 organisms grows to 650 over one year. The percent increase is:',
      { A: '13%', B: '23%', C: '30%', D: '65%' },
      'C',
      'Increase = 150. Percent increase = (150 / 500) x 100 = 30%.'
    ),
    mc(
      'In a lab, 4 moles of hydrogen react with 2 moles of oxygen. The mole ratio of hydrogen to oxygen is:',
      { A: '1:1', B: '1:2', C: '2:1', D: '4:2' },
      'C',
      '4:2 simplifies to 2:1.'
    ),
    mc(
      'A wave has a frequency of 500 Hz and a wavelength of 0.68 m. What is the wave speed in m/s?',
      { A: '170', B: '272', C: '340', D: '500' },
      'C',
      'Wave speed = frequency x wavelength = 500 x 0.68 = 340 m/s.'
    ),
    mc(
      'An object weighs 980 N on Earth (g = 9.8 m/s^2). What is its mass?',
      { A: '10 kg', B: '50 kg', C: '100 kg', D: '9,604 kg' },
      'C',
      'Mass = weight / g = 980 / 9.8 = 100 kg.'
    ),
    mc(
      'A data table reports a flow rate of 0.5 L/min. How many milliliters flow in 1 minute?',
      { A: '5 mL', B: '50 mL', C: '500 mL', D: '5,000 mL' },
      'C',
      '0.5 L = 500 mL, so the flow rate is 500 mL/min.'
    ),
    mc(
      'A patient\'s heart beats 72 times per minute. How many times does it beat in 5 minutes?',
      { A: '144', B: '216', C: '360', D: '720' },
      'C',
      '72 beats/min x 5 min = 360 beats.'
    ),
    mc(
      'An experiment yields 12 g of product from 48 g of reactant. The percent yield based on the reactant mass is:',
      { A: '12%', B: '25%', C: '36%', D: '48%' },
      'B',
      'Percent yield = (12 / 48) x 100 = 25%.'
    ),
    mc(
      'A force of 200 N is applied over an area of 0.5 m^2. The pressure is:',
      { A: '100 Pa', B: '200 Pa', C: '400 Pa', D: '800 Pa' },
      'C',
      'Pressure = force / area = 200 / 0.5 = 400 Pa.'
    ),
    mc(
      'A scientist collects 3 samples of water. Sample 1 has 12 mg of dissolved solids, Sample 2 has 18 mg, and Sample 3 has 24 mg. The average dissolved solids per sample is:',
      { A: '12 mg', B: '16 mg', C: '18 mg', D: '24 mg' },
      'C',
      'Average = (12 + 18 + 24) / 3 = 54 / 3 = 18 mg.'
    ),
    mc(
      'A substance has a specific heat capacity of 4.18 J/(g·°C). How much energy is needed to raise the temperature of 50 g of this substance by 10°C?',
      { A: '209 J', B: '418 J', C: '2,090 J', D: '4,180 J' },
      'C',
      'Energy = mass x specific heat x temperature change = 50 x 4.18 x 10 = 2,090 J.'
    ),
    mc(
      'A solution contains 15 g of salt dissolved in 500 mL of water. What is the concentration in g/L?',
      { A: '15', B: '25', C: '30', D: '45' },
      'C',
      '500 mL = 0.5 L. Concentration = 15 g / 0.5 L = 30 g/L.'
    ),
    mc(
      'Light travels at approximately 3 x 10^8 m/s. How far does light travel in 2 seconds?',
      { A: '1.5 x 10^8 m', B: '3 x 10^8 m', C: '6 x 10^8 m', D: '9 x 10^8 m' },
      'C',
      'Distance = speed x time = 3 x 10^8 x 2 = 6 x 10^8 m.'
    ),
    mc(
      'In a predator-prey study, 120 predators consume 3,600 prey organisms per month. The average consumption rate per predator per month is:',
      { A: '10', B: '20', C: '30', D: '40' },
      'C',
      '3,600 / 120 = 30 prey per predator per month.'
    ),
    mc(
      'A chemical equation shows that 2 moles of reactant A produce 3 moles of product B. If 10 moles of A react completely, how many moles of B are produced?',
      { A: '5', B: '10', C: '15', D: '20' },
      'C',
      'The ratio is 2:3, so 10 moles of A produce (10 x 3/2) = 15 moles of B.'
    ),
    mc(
      'A fish tank holds 75 liters of water. If the tank is 60% full, how many liters of water does it currently contain?',
      { A: '30 L', B: '40 L', C: '45 L', D: '50 L' },
      'C',
      '75 x 0.60 = 45 L.'
    ),
    mc(
      'A runner completes a 10-km race in 50 minutes. Her average speed in km/hr is:',
      { A: '5 km/hr', B: '8 km/hr', C: '10 km/hr', D: '12 km/hr' },
      'D',
      '50 min = 50/60 hr = 5/6 hr. Speed = 10 / (5/6) = 12 km/hr.'
    ),
    mc(
      'A student converts 350 mL to liters. The correct answer is:',
      { A: '0.035 L', B: '0.35 L', C: '3.5 L', D: '35 L' },
      'B',
      '1,000 mL = 1 L, so 350 mL = 0.35 L.'
    ),
  ],

  'act-sci-7': [
    mc(
      'A scientist hypothesizes that increasing the temperature of water will increase the rate at which salt dissolves. Which experimental result would support this hypothesis?',
      { A: 'Salt dissolves at the same rate at all temperatures', B: 'Salt dissolves faster in warmer water than in cooler water', C: 'Salt does not dissolve at any temperature', D: 'Salt dissolves faster in cooler water' },
      'B',
      'Faster dissolving in warmer water directly supports the hypothesis that higher temperature increases dissolution rate.'
    ),
    mc(
      'A model predicts that organisms living at higher altitudes will have larger lung capacities. Researchers measure lung capacity in populations at sea level, 1,500 m, and 3,000 m. Which finding would refute the model?',
      { A: 'Lung capacity increases from sea level to 3,000 m', B: 'Lung capacity is highest at 3,000 m', C: 'Lung capacity is the same at all three altitudes', D: 'Lung capacity at 1,500 m is between the other two values' },
      'C',
      'If lung capacity does not change with altitude, the model\'s prediction is not supported.'
    ),
    mc(
      'A student predicts that adding more fertilizer will always increase crop yield. She tests 5 fertilizer levels and finds that yield increases up to a point but then decreases at the highest level. This result:',
      { A: 'fully supports the prediction', B: 'partially supports the prediction but shows that excess fertilizer can reduce yield', C: 'completely refutes the prediction', D: 'is unrelated to the prediction' },
      'B',
      'The prediction was partially correct (yield increased with fertilizer up to a point) but the decline at high levels shows the relationship is more complex.'
    ),
    mc(
      'A model of enzyme kinetics predicts that reaction rate will increase as substrate concentration increases until all enzyme active sites are occupied, after which the rate will plateau. Data showing a rate increase from 0.1 M to 0.5 M substrate followed by a flat rate from 0.5 M to 1.0 M would:',
      { A: 'contradict the model', B: 'support the model', C: 'be irrelevant to the model', D: 'suggest the enzyme is not functioning' },
      'B',
      'The data match the model\'s prediction of increasing rate followed by a plateau at saturation.'
    ),
    mc(
      'A hypothesis states that plants grown under red light will produce more biomass than plants grown under blue light. After 30 days, the red-light plants have an average dry mass of 15 g and the blue-light plants have an average dry mass of 22 g. Based on these results:',
      { A: 'the hypothesis is supported', B: 'the hypothesis is refuted', C: 'light color has no effect on biomass', D: 'the experiment was invalid' },
      'B',
      'Blue-light plants produced more biomass, which is the opposite of what the hypothesis predicted.'
    ),
    mc(
      'A model predicts that as global temperatures rise, Arctic ice coverage will decrease. Satellite data from 1980 to 2020 show a consistent decline in September Arctic ice extent. This data:',
      { A: 'weakens the model', B: 'is consistent with the model\'s prediction', C: 'disproves the model', D: 'shows ice coverage is increasing' },
      'B',
      'Declining ice coverage during a period of rising temperatures is exactly what the model predicts.'
    ),
    mc(
      'A biologist hypothesizes that a certain gene is responsible for antibiotic resistance in bacteria. To test this, she should:',
      { A: 'observe the bacteria under a microscope', B: 'remove or disable the gene and see if the bacteria become susceptible to the antibiotic', C: 'add more antibiotic to all cultures', D: 'grow the bacteria at a higher temperature' },
      'B',
      'Disabling the gene and observing a loss of resistance would provide direct evidence that the gene confers resistance.'
    ),
    mc(
      'A climate model predicts that doubling atmospheric CO2 will raise global temperatures by 2-4°C. If actual measurements after CO2 doubling show a 3°C increase, this outcome:',
      { A: 'falls within the model\'s predicted range and supports it', B: 'disproves the model', C: 'shows the model overestimated warming', D: 'is too small to be meaningful' },
      'A',
      '3°C is within the predicted range of 2-4°C, supporting the model.'
    ),
    mc(
      'A physics student predicts that a heavier pendulum bob will swing with a shorter period. She tests bobs of 50 g, 100 g, 150 g, and 200 g, all on strings of the same length. She finds that all have the same period. This result:',
      { A: 'supports the prediction', B: 'refutes the prediction, showing that mass does not affect pendulum period', C: 'indicates the experiment was performed incorrectly', D: 'proves that string length does not matter' },
      'B',
      'Equal periods regardless of mass directly refute the prediction that heavier bobs would swing faster.'
    ),
    mc(
      'A geologist uses a plate tectonics model to predict that two landmasses were once joined. She finds matching rock formations and identical fossils on both continents\' coastlines. These findings:',
      { A: 'weaken the model', B: 'are irrelevant to the model', C: 'support the model\'s prediction of a past connection', D: 'prove the continents never moved' },
      'C',
      'Matching rocks and fossils on separated continents are strong evidence they were once connected, supporting the model.'
    ),
    mc(
      'A medical researcher hypothesizes that a new drug lowers blood pressure. In a trial, the drug group has an average blood pressure decrease of 15 mmHg, while the placebo group has a decrease of 2 mmHg. This result:',
      { A: 'refutes the hypothesis', B: 'suggests the drug may lower blood pressure, supporting the hypothesis', C: 'shows the drug raises blood pressure', D: 'is inconclusive because the placebo group also changed' },
      'B',
      'A substantially larger decrease in the drug group compared to placebo supports the blood-pressure-lowering hypothesis.'
    ),
    mc(
      'A food web model predicts that removing the top predator from an ecosystem will cause the herbivore population to increase initially. Researchers remove wolves from an area and observe that the deer population doubles over two years. This observation:',
      { A: 'contradicts the model', B: 'supports the model\'s prediction', C: 'shows wolves are not predators', D: 'proves deer prefer areas with wolves' },
      'B',
      'The deer population increase after wolf removal matches the model\'s prediction about top predator removal.'
    ),
    mc(
      'A hypothesis states that bacteria grow faster at 37°C than at 25°C. A student tests this and finds that bacterial colonies are larger at 37°C after 24 hours. However, a classmate notes that the 37°C incubator was set to a higher humidity. This observation means:',
      { A: 'the hypothesis is definitively proven', B: 'the result is potentially confounded because humidity was not controlled', C: 'humidity never affects bacterial growth', D: 'the experiment should be repeated at 0°C' },
      'B',
      'Uncontrolled humidity differences mean the faster growth could be partly due to humidity rather than temperature alone.'
    ),
    mc(
      'A model predicts that increasing soil nitrogen will boost corn yield up to 150 kg/hectare of nitrogen, beyond which yield declines due to toxicity. A farmer applies 200 kg/hectare and gets a lower yield than at 150 kg/hectare. This result:',
      { A: 'contradicts the model', B: 'supports the model, which predicted a decline beyond 150 kg/hectare', C: 'shows nitrogen has no effect', D: 'suggests the farmer used the wrong type of corn' },
      'B',
      'The model predicted declining yield above 150 kg/hectare, and the farmer observed exactly that.'
    ),
    mc(
      'A student hypothesizes that metal conducts heat faster than wood. She places one end of a metal rod and one end of a wooden rod in hot water and touches the other ends after 1 minute. She finds the metal rod is warm and the wooden rod is still cool. This result:',
      { A: 'refutes the hypothesis', B: 'supports the hypothesis', C: 'proves wood cannot conduct any heat', D: 'shows both materials conduct heat equally' },
      'B',
      'The metal rod conducting heat to the far end faster than wood directly supports the hypothesis.'
    ),
    mc(
      'A genetic model predicts that crossing two heterozygous parents (Aa x Aa) will produce offspring in a 3:1 phenotypic ratio. A researcher crosses the parents and gets 72 dominant and 28 recessive offspring out of 100. This result:',
      { A: 'perfectly matches the prediction', B: 'is reasonably close to the predicted 3:1 ratio and supports the model', C: 'completely refutes the model', D: 'suggests the parents were both homozygous' },
      'B',
      'The observed ratio of 72:28 is close to the expected 75:25 (3:1), which is typical variation in genetic crosses and supports the model.'
    ),
    mc(
      'A prediction based on the ideal gas law states that doubling the absolute temperature of a gas at constant volume will double its pressure. A student heats a sealed container from 300 K to 600 K and measures the pressure increasing from 1 atm to 1.95 atm. This result:',
      { A: 'is approximately consistent with the prediction', B: 'completely contradicts the prediction', C: 'shows pressure decreased', D: 'proves the gas law does not apply to any gas' },
      'A',
      '1.95 atm is very close to the predicted 2 atm, with the small difference likely due to the gas not being perfectly ideal.'
    ),
    mc(
      'A model of natural selection predicts that bacteria exposed to antibiotics over many generations will become increasingly resistant. A lab experiment exposing bacteria to a low-dose antibiotic for 100 generations shows a steady increase in the minimum inhibitory concentration (MIC). This finding:',
      { A: 'contradicts natural selection', B: 'supports the model\'s prediction of increasing resistance over time', C: 'proves antibiotics make bacteria weaker', D: 'shows no evolution occurred' },
      'B',
      'Increasing MIC over generations demonstrates evolving resistance, consistent with the natural selection model.'
    ),
    mc(
      'A hypothesis claims that deep-ocean hydrothermal vents support life through chemosynthesis rather than photosynthesis. Finding thriving microbial communities at vents in total darkness would:',
      { A: 'support the hypothesis, since photosynthesis requires light', B: 'refute the hypothesis', C: 'show that photosynthesis occurs in darkness', D: 'prove all deep-ocean life is chemosynthetic' },
      'A',
      'Life thriving in complete darkness where photosynthesis is impossible supports the chemosynthesis hypothesis.'
    ),
    mc(
      'A model predicts that the rate of a chemical reaction doubles for every 10°C increase in temperature. At 20°C the rate is 4 units. According to the model, the predicted rate at 40°C is:',
      { A: '8 units', B: '12 units', C: '16 units', D: '32 units' },
      'C',
      'From 20°C to 40°C is a 20°C increase (two doublings). 4 x 2 x 2 = 16 units.'
    ),
    mc(
      'Researchers predict that a volcanic eruption will lower global temperatures by blocking sunlight with ash particles. After a major eruption, they observe a 0.5°C global temperature drop over 18 months. This observation:',
      { A: 'weakens the prediction', B: 'is consistent with the prediction', C: 'shows volcanoes warm the planet', D: 'has nothing to do with the eruption' },
      'B',
      'The observed cooling after the eruption matches the prediction that ash would block sunlight and reduce temperatures.'
    ),
    mc(
      'A model predicts that a sample loses half its radioactivity every 5 years. If the sample starts with 200 units of radioactivity, how many units will remain after 15 years?',
      { A: '12.5', B: '25', C: '50', D: '75' },
      'B',
      'After 5 years: 100. After 10 years: 50. After 15 years: 25 units.'
    ),
    mc(
      'A student hypothesizes that adding sugar to water lowers its freezing point. She makes solutions with 0, 10, 20, and 30 g of sugar per 100 mL of water and measures each freezing point. She finds freezing points of 0°C, -0.6°C, -1.2°C, and -1.8°C respectively. The data:',
      { A: 'refute the hypothesis', B: 'support the hypothesis, showing a consistent decrease in freezing point with added sugar', C: 'show that sugar raises the freezing point', D: 'are inconclusive' },
      'B',
      'Each increase in sugar concentration produces a lower freezing point, directly supporting the hypothesis.'
    ),
    mc(
      'A hypothesis states that heavier raindrops fall faster than lighter raindrops due to gravity overcoming air resistance. If this hypothesis is correct, during a storm with mixed raindrop sizes, large drops should:',
      { A: 'reach the ground before smaller drops released from the same height', B: 'float upward', C: 'fall at the same speed as small drops', D: 'never reach the ground' },
      'A',
      'If heavier drops fall faster, they will reach the ground first when released from the same height.'
    ),
    mc(
      'A student builds a model to predict how far a projectile will travel based on launch angle. The model predicts maximum distance at 45°. She launches projectiles at 15°, 30°, 45°, 60°, and 75° and finds the greatest distance at 45°. Her results:',
      { A: 'match the model\'s prediction exactly', B: 'contradict the model', C: 'show that angle has no effect on distance', D: 'suggest a launch angle of 90° would be optimal' },
      'A',
      'Maximum distance at 45° matches the model\'s prediction precisely.'
    ),
  ],

  'act-sci-8': [
    mc(
      'Figure 1 shows that Plant Species X reaches maximum height at 25°C. Table 1 shows that soil nutrient absorption for Species X peaks at 25°C. Together, these data suggest that:',
      { A: 'temperature has no effect on the plant', B: 'maximum growth and peak nutrient absorption occur at the same optimal temperature', C: 'the plant grows best at low temperatures', D: 'soil nutrients are unrelated to plant growth' },
      'B',
      'Both data sources point to 25°C as the optimal condition, suggesting a link between nutrient absorption and growth.'
    ),
    mc(
      'Graph 1 shows the solubility of three salts (A, B, C) versus temperature. Table 1 shows the actual concentrations of each salt in a solution at 50°C. According to Graph 1, Salt A\'s solubility at 50°C is 40 g/100 mL. Table 1 shows 45 g of Salt A dissolved in 100 mL at 50°C. This means:',
      { A: 'the solution is unsaturated for Salt A', B: 'the solution is supersaturated for Salt A', C: 'Salt A has reached its maximum solubility exactly', D: 'Salt A cannot dissolve at 50°C' },
      'B',
      'Having 45 g dissolved when the solubility limit is 40 g indicates a supersaturated solution.'
    ),
    mc(
      'Figure 1 plots predator population over 10 years. Figure 2 plots prey population over the same 10 years. The predator population peaks approximately 1-2 years after the prey population peaks. This delay is best explained by:',
      { A: 'predators reproducing before prey are available', B: 'predators needing time to grow in numbers after prey become abundant', C: 'prey being unrelated to predator survival', D: 'both populations peaking at exactly the same time' },
      'B',
      'Predator populations rise after prey increases because it takes time for increased food availability to translate into predator reproduction.'
    ),
    mc(
      'Table 1 lists the density of four liquids. Figure 1 shows what happens when the liquids are poured into a graduated cylinder: they form distinct layers. To determine which liquid forms the bottom layer, a student should:',
      { A: 'look only at Figure 1', B: 'find the liquid with the highest density in Table 1, as it would sink to the bottom', C: 'find the liquid with the lowest boiling point', D: 'ignore both data sources' },
      'B',
      'The densest liquid sinks to the bottom. Combining Table 1 (density values) with Figure 1 (layer order) confirms which liquid is on the bottom.'
    ),
    mc(
      'Graph 1 shows atmospheric CO2 levels from 1960 to 2020 (steadily increasing). Graph 2 shows global average temperature anomaly over the same period (also increasing). A student wants to determine whether CO2 and temperature are correlated. She should:',
      { A: 'look at Graph 1 only', B: 'look at Graph 2 only', C: 'compare the trends in both graphs to see if they follow similar patterns', D: 'ignore both graphs and use outside knowledge' },
      'C',
      'Comparing the trends in both figures is necessary to assess whether the two variables change together.'
    ),
    mc(
      'Table 1 shows the results of water quality tests at 5 sites along a river: pH, dissolved oxygen (DO), and nitrate levels. Figure 1 maps the locations of a factory, a farm, and a sewage plant along the river. Site 3 (downstream of the factory) has the lowest pH. Combining these data, the most likely explanation is:',
      { A: 'the farm is raising the pH', B: 'the factory may be discharging acidic waste into the river', C: 'Site 3 has the highest dissolved oxygen', D: 'the sewage plant is upstream of Site 3' },
      'B',
      'Low pH downstream of a factory suggests acidic industrial discharge, which can be concluded only by combining both data sources.'
    ),
    mc(
      'Figure 1 shows the absorption spectrum of chlorophyll a (peaks in blue and red wavelengths). Figure 2 shows the action spectrum of photosynthesis (also peaks in blue and red). The similarity between these two figures suggests that:',
      { A: 'chlorophyll a does not participate in photosynthesis', B: 'chlorophyll a is a primary pigment driving photosynthesis', C: 'green light drives most photosynthesis', D: 'the two figures are unrelated' },
      'B',
      'Matching peaks in absorption and photosynthetic activity indicate that chlorophyll a is responsible for capturing light used in photosynthesis.'
    ),
    mc(
      'Table 1 records the mass of five elements and the number of protons in each atom. Figure 1 shows the arrangement of these elements on a partial periodic table. An element in Table 1 has 12 protons and a mass of 24 amu. Using Figure 1, this element is most likely:',
      { A: 'carbon', B: 'sodium', C: 'magnesium', D: 'aluminum' },
      'C',
      'Magnesium has 12 protons and an atomic mass of approximately 24 amu, and its position on the periodic table confirms this.'
    ),
    mc(
      'Graph 1 shows altitude versus air temperature in a particular region (temperature decreasing with altitude). Table 1 shows the vegetation type found at various altitudes in the same region. At 3,000 m, Graph 1 indicates a temperature of 5°C and Table 1 shows alpine tundra vegetation. This combined information suggests that:',
      { A: 'alpine tundra grows best in warm temperatures', B: 'alpine tundra is adapted to cold temperatures at high altitudes', C: 'vegetation type is unrelated to altitude or temperature', D: 'all vegetation types occur at 3,000 m' },
      'B',
      'Cold temperatures at 3,000 m correlating with alpine tundra vegetation suggests this vegetation type is adapted to cold, high-altitude conditions.'
    ),
    mc(
      'Figure 1 shows how soil moisture varies over 6 months. Figure 2 shows tree ring width for the same period. Both show peaks in April and troughs in August. The most reasonable conclusion from combining these figures is:',
      { A: 'tree growth is unrelated to water availability', B: 'tree growth appears to follow soil moisture patterns', C: 'trees grow fastest when soil is driest', D: 'soil moisture follows tree growth' },
      'B',
      'Parallel patterns in moisture and growth suggest that available water influences tree ring width.'
    ),
    mc(
      'Table 1 shows the composition of gases emitted by a volcano: 80% H2O, 10% CO2, 5% SO2, 5% other. Figure 1 plots the pH of a nearby lake over the eruption period, showing a sharp drop from 7.0 to 4.5. Which gas in Table 1 most likely caused the pH drop?',
      { A: 'H2O', B: 'CO2', C: 'SO2', D: 'Nitrogen' },
      'C',
      'SO2 dissolves in water to form sulfuric acid, which would sharply lower the lake\'s pH.'
    ),
    mc(
      'Graph 1 shows the speed of sound in different materials (air: 343 m/s, water: 1,480 m/s, steel: 5,960 m/s). Table 1 lists the density and elasticity of each material. To explain why sound travels faster in steel than in air, a student should note from Table 1 that steel has:',
      { A: 'lower density and lower elasticity than air', B: 'much higher elasticity than air, which allows faster wave propagation', C: 'the same density as air', D: 'no elasticity' },
      'B',
      'Higher elasticity (stiffness) in steel allows sound waves to propagate faster, as shown by combining the speed data in Graph 1 with material properties in Table 1.'
    ),
    mc(
      'Figure 1 shows the decay curve of a radioactive isotope (half-life = 20 years). Table 1 shows the measured activity of a rock sample as 25% of the original activity. Using both sources, the age of the rock sample is approximately:',
      { A: '10 years', B: '20 years', C: '40 years', D: '80 years' },
      'C',
      '25% of original activity means two half-lives have passed (100% to 50% to 25%). Two half-lives of 20 years each = 40 years.'
    ),
    mc(
      'Table 1 shows the specific heat capacities of four metals (aluminum: 0.90, copper: 0.39, iron: 0.45, lead: 0.13 J/g°C). Figure 1 shows the temperature change of equal masses of each metal when heated with the same energy. Which metal in Figure 1 shows the largest temperature increase?',
      { A: 'Aluminum', B: 'Copper', C: 'Iron', D: 'Lead' },
      'D',
      'Lead has the lowest specific heat, meaning it requires the least energy per gram per degree, so the same energy input produces the largest temperature change.'
    ),
    mc(
      'Graph 1 shows ocean pH decreasing from 8.2 to 8.0 over 50 years. Graph 2 shows coral reef coverage declining over the same period. Table 1 lists the pH tolerance ranges of three coral species, all requiring pH above 7.9. Combining all three sources, if pH drops below 7.9:',
      { A: 'all three coral species would likely be stressed or decline further', B: 'coral coverage would increase', C: 'the data from Graph 1 and Graph 2 are contradictory', D: 'pH has no effect on coral' },
      'A',
      'All three species require pH above 7.9, so a further decrease would push conditions outside their tolerance range, likely accelerating decline.'
    ),
    mc(
      'Figure 1 shows the electromagnetic spectrum with wavelengths. Table 1 lists the energy per photon for different wavelengths. Together, these show that as wavelength decreases:',
      { A: 'photon energy decreases', B: 'photon energy increases', C: 'photon energy stays the same', D: 'wavelength and energy are unrelated' },
      'B',
      'Shorter wavelengths correspond to higher photon energies, a relationship visible by cross-referencing the spectrum (Figure 1) with energy values (Table 1).'
    ),
    mc(
      'Table 1 shows the birth rate and death rate per 1,000 people for five countries. Figure 1 shows the population growth rate (%) for those same countries. Country D has a birth rate of 35 and death rate of 10, giving a natural increase of 25 per 1,000. From Figure 1, Country D has the highest growth rate. This consistency:',
      { A: 'is a coincidence', B: 'confirms that population growth rate is related to the difference between birth and death rates', C: 'shows birth rate alone determines growth', D: 'disproves the demographic transition model' },
      'B',
      'The largest birth-death rate difference matching the highest growth rate confirms the relationship between natural increase and population growth.'
    ),
    mc(
      'Graph 1 shows the intensity of light reaching different depths in clear ocean water. Graph 2 shows the same data for murky estuary water. At 10 m depth, clear water retains 20% of surface light while murky water retains only 2%. This difference is most likely due to:',
      { A: 'clear water being colder', B: 'suspended particles in murky water absorbing and scattering more light', C: 'murky water having lower salinity', D: 'the graphs measuring different things' },
      'B',
      'Suspended particles in murky water reduce light penetration through absorption and scattering, as shown by comparing the two light-depth curves.'
    ),
    mc(
      'Table 1 shows nutrient concentrations in soil at three farm plots. Figure 1 shows crop yield at the same three plots over three years. Plot B consistently has the highest nitrogen level (Table 1) and the highest crop yield (Figure 1). Plot C has the lowest nitrogen and the lowest yield. These data together suggest:',
      { A: 'nitrogen levels may be positively related to crop yield', B: 'nitrogen is toxic to crops', C: 'crop yield is independent of soil nutrients', D: 'Plot A has the highest nitrogen' },
      'A',
      'Higher nitrogen correlating with higher yield across plots suggests a positive relationship between nitrogen and crop production.'
    ),
    mc(
      'Figure 1 shows wind speed at different heights above the ground. Table 1 shows the power output of a wind turbine at different wind speeds. The wind speed at 80 m is 12 m/s (Figure 1), and Table 1 shows that at 12 m/s the turbine produces 1,500 kW. A turbine installed at 40 m, where wind speed is 8 m/s (Figure 1), would produce approximately:',
      { A: '1,500 kW', B: '800 kW', C: '400 kW', D: '2,000 kW' },
      'C',
      'Reading Table 1 at 8 m/s gives approximately 400 kW, showing how combining both sources determines expected output at a given height.'
    ),
    mc(
      'Graph 1 shows blood glucose levels after eating a meal (rising then falling). Graph 2 shows insulin levels after the same meal (rising shortly after glucose rises). A student notes that the insulin peak occurs about 30 minutes after the glucose peak. This timing suggests:',
      { A: 'insulin and glucose are unrelated', B: 'insulin is released in response to rising glucose levels and helps lower them', C: 'glucose rises because of insulin', D: 'both rise and fall at exactly the same time' },
      'B',
      'The sequence (glucose rises first, then insulin rises and glucose falls) suggests insulin is a response to high glucose that helps restore normal levels.'
    ),
    mc(
      'Table 1 shows the atomic radius of elements in Period 3 of the periodic table (decreasing from Na to Cl). Figure 1 shows the first ionization energy of the same elements (generally increasing from Na to Cl). Combining both sources, as atomic radius decreases across the period:',
      { A: 'ionization energy decreases', B: 'ionization energy generally increases', C: 'there is no pattern', D: 'atomic radius and ionization energy both increase' },
      'B',
      'Smaller atoms hold their electrons more tightly, requiring more energy to remove one, so ionization energy increases as radius decreases.'
    ),
    mc(
      'Figure 1 shows that a reaction at 30°C produces 8 g of product. Table 1 shows that the reaction has a 40% yield at 30°C. Based on both sources, what is the theoretical maximum product (in grams) at 30°C?',
      { A: '12', B: '16', C: '20', D: '24' },
      'C',
      'If 8 g represents 40% yield, then 100% yield = 8 / 0.40 = 20 g.'
    ),
    mc(
      'Graph 1 shows the distance between two tectonic plates over millions of years (increasing linearly). Table 1 shows fossils found on each plate that were identical in species up to 100 million years ago but different after that. Combining both sources:',
      { A: 'the plates were never connected', B: 'the plates separated around 100 million years ago, after which species evolved independently', C: 'the fossils prove the plates are moving toward each other', D: 'fossil evidence and plate motion are unrelated' },
      'B',
      'Identical fossils before and different fossils after a certain date, combined with increasing plate distance, indicate the plates split around that time.'
    ),
    mc(
      'Figure 1 shows the UV index throughout a day (peaking at noon). Table 1 shows the number of sunburn cases reported at a beach at different times. The highest number of sunburn cases also occurs around noon. Combining both figures suggests that:',
      { A: 'UV index and sunburn are unrelated', B: 'higher UV exposure at midday is associated with more sunburn cases', C: 'sunburn causes UV radiation', D: 'people do not visit the beach at noon' },
      'B',
      'Peak UV exposure and peak sunburn cases coinciding at noon suggests UV intensity drives sunburn risk.'
    ),
  ],
}
