UNIT({
n:8,name:"Ecology",short:"Ecology",w:"10–15%",form:"pyramid",scale:"10%",scaleOf:"of energy passes to each higher trophic level",
topics:[
["8.1","Responses to the Environment",`
<div class="big"><b>Big idea:</b> Organisms respond to change with <b>behavioral and physiological</b> mechanisms, and they exchange information through signals that change others' behavior.</div>
<ul><li><b>Behavioral:</b> moving to shade, migrating, or hibernating.</li>
<li><b>Physiological:</b> sweating, shivering, or closing stomata.</li>
<li><b>Communication</b> can be visual, auditory, tactile, electrical or chemical. Honeybees dance to signal food, and many plants release chemicals when under attack.</li>
<li>Cooperative behavior can increase the fitness of the group or of relatives.</li></ul>
<div class="out"><b>Not on the exam:</b> specific behavioral or physiological mechanisms, and details of particular communication systems.</div>
<div class="tip"><b>Exam tip</b> Experimental design is a favorite here. Identify the independent variable, the dependent variable and a control, such as isopods choosing between damp and dry sides of a chamber.</div>`],
["8.2","Energy Flow Through Ecosystems",`
<div class="big"><b>Big idea:</b> Energy enters mostly through producers and leaves as heat. Only about <b>10%</b> moves up each trophic level, so food chains stay short.</div>
<div class="diagram"><svg viewBox="0 0 560 220" width="100%" style="min-width:440px" role="img" aria-label="Energy pyramid: producers 10,000 kilocalories, primary consumers 1,000, secondary consumers 100, tertiary consumers 10">
<g stroke-width="2"><rect x="40" y="170" width="480" height="38" fill="var(--good-soft)" stroke="var(--good)"/><rect x="110" y="126" width="340" height="38" fill="var(--leaf-soft)" stroke="var(--leaf)"/><rect x="180" y="82" width="200" height="38" fill="var(--sun-soft)" stroke="var(--sun)"/><rect x="230" y="38" width="100" height="38" fill="var(--bad-soft)" stroke="var(--bad)"/></g>
<g font-size="13" text-anchor="middle"><text x="280" y="194">Producers: 10,000 kcal</text><text x="280" y="150">Primary consumers: 1,000 kcal</text><text x="280" y="106">Secondary: 100 kcal</text><text x="280" y="62">Tertiary: 10</text><text x="280" y="24">About 90% is lost at each step, mostly as heat.</text></g>
</svg></div>
<h3>Strategies for energy</h3>
<ul><li><b>Endotherms</b> use metabolic heat to keep body temperature stable, which costs a lot of energy.</li>
<li><b>Ectotherms</b> rely on behavior, such as moving into the sun or shade, and they use less food energy.</li>
<li>A <b>net energy gain</b> means storage, growth and more reproduction. A <b>net loss</b> means lost mass, less reproduction and eventually death.</li>
<li>Smaller organisms generally have a <b>higher metabolic rate per gram</b>.</li>
<li>Some organisms switch between asexual and sexual reproduction depending on energy availability.</li></ul>
<h3>Cycling matter</h3>
<p>Energy flows one way, but <b>matter cycles</b>. Know the carbon, nitrogen, phosphorus and water cycles. <b>GPP</b> is total photosynthesis, and <b>NPP = GPP − R</b> is what remains after respiration.</p>
<div class="tip"><b>Exam tip</b> Don't say energy "recycles." Producers capture it, consumers transfer some of it and it leaves as heat. Atoms cycle.</div>`],
["8.3","Population Ecology",`
<div class="big"><b>Big idea:</b> Population growth depends on birth rate, death rate and population size. Without limits, populations grow exponentially.</div>
<div class="eq">dN/dt = B − D · dN/dt = rₘₐₓN (exponential)</div>
<ul><li>A <b>population</b> is the individuals of one species in an area.</li>
<li>Exponential growth makes a <b>J-shaped</b> curve, as with bacteria in fresh medium or a species entering new habitat.</li>
<li>Many adaptations relate to obtaining and using energy and matter.</li></ul>
<div class="tip"><b>Exam tip</b> Use the equation directly. With N = 200, B = 30 and D = 10 over a set time, dN/dt = 30 − 10 = 20 individuals per that time.</div>`],
["8.4","Effect of Density on Populations",`
<div class="big"><b>Big idea:</b> Limits slow growth. The <b>logistic model</b> approaches <b>carrying capacity (K)</b>, the sustainable abundance that resources can support.</div>
<div class="eq">dN/dt = rₘₐₓN ( (K − N) ÷ K )</div>
<div class="diagram"><svg viewBox="0 0 560 220" width="100%" style="min-width:440px" role="img" aria-label="Graph of population size over time: exponential curve rises steeply while logistic curve levels off at carrying capacity K">
<line x1="60" y1="20" x2="60" y2="185" stroke="var(--muted)" stroke-width="1.5"/><line x1="60" y1="185" x2="540" y2="185" stroke="var(--muted)" stroke-width="1.5"/>
<line x1="60" y1="70" x2="530" y2="70" stroke="var(--muted)" stroke-dasharray="5 5"/><path d="M60 178 C170 178 230 150 280 110 C330 72 410 71 530 71" fill="none" stroke="var(--leaf)" stroke-width="3"/><path d="M60 178 C150 178 210 160 250 112 C270 88 288 50 300 22" fill="none" stroke="var(--sun)" stroke-width="3"/>
<g font-size="13"><text x="500" y="62">K</text><text x="306" y="32">exponential</text><text x="400" y="94">logistic</text><text x="300" y="210" text-anchor="middle">Time</text><text x="24" y="102" transform="rotate(-90 24 102)" text-anchor="middle">Population size</text></g>
</svg></div>
<div class="tbl"><table><tr><th>Density-dependent</th><th>Density-independent</th></tr>
<tr><td>Food, competition, disease, predators, waste. Effect grows as the population grows.</td><td>Natural disasters, temperature extremes, drought. Effect isn't tied to density.</td></tr></table></div>
<div class="tip"><b>Exam tip</b> Growth is fastest at <b>N = K/2</b>. As N approaches K, (K − N)/K approaches zero, and so does growth. If N exceeds K, growth is negative.</div>`],
["8.5","Community Ecology",`
<div class="big"><b>Big idea:</b> Communities are interacting populations of different species. Those interactions shape who lives there and how energy moves.</div>
<div class="eq">Simpson's Diversity Index = 1 − Σ(n ÷ N)²</div>
<p>A value closer to 1 means higher diversity, and n counts one species while N counts all organisms.</p>
<div class="tbl"><table><tr><th>Interaction</th><th>Effects</th><th>Example</th></tr>
<tr><td><b>Competition</b></td><td>− / −</td><td>Two plants share limited water</td></tr><tr><td><b>Predation</b></td><td>+ / −</td><td>Lynx and hare</td></tr><tr><td><b>Parasitism</b></td><td>+ / −</td><td>Tick on a deer</td></tr><tr><td><b>Mutualism</b></td><td>+ / +</td><td>Bees and flowers</td></tr><tr><td><b>Commensalism</b></td><td>+ / 0</td><td>Barnacles on a whale</td></tr></table></div>
<ul><li><b>Niche partitioning</b> reduces competition by dividing resources.</li><li><b>Trophic cascades</b> occur when a change at one level spreads down a food web.</li></ul>
<div class="tip"><b>Exam tip</b> On predator-prey graphs, predator peaks usually lag behind prey peaks, because predators need time to respond to more food.</div>`],
["8.6","Biodiversity",`
<div class="big"><b>Big idea:</b> Ecosystems with more species and more genetic diversity are generally more <b>resilient</b> to change.</div>
<ul><li>Ecosystems with fewer parts, like monocultures, are often less resilient.</li>
<li><b>Producers</b> and key abiotic factors support the entire food web.</li>
<li><b>Keystone species</b> have an effect far bigger than their abundance. Removing one, like a sea star that eats mussels, can cause collapse.</li></ul>
<div class="tip"><b>Exam tip</b> A keystone species isn't necessarily common or big. The evidence is what happens when it is removed: diversity drops sharply.</div>`],
["8.7","Disruptions in Ecosystems",`
<div class="big"><b>Big idea:</b> Disruptions change ecosystems, and pre-existing variation shapes which populations survive. Humans are a major source of disruption.</div>
<ul><li>An <b>adaptation</b> is a genetic variation favored by selection that gives an advantage in a particular environment.</li>
<li><b>Heterozygote advantage:</b> the heterozygote has higher fitness than either homozygote, as with the sickle-cell allele in malaria regions.</li>
<li><b>Mutations aren't directed</b> by the environment.</li>
<li><b>Invasive species</b> such as kudzu and zebra mussels exploit a new niche free of predators or competitors, or outcompete natives.</li>
<li><b>Human activity:</b> logging, urbanization, monocropping and global climate change. Dutch elm disease and potato blight show how diseases spread.</li>
<li><b>Other disruptions:</b> El Niño, continental drift and meteor impacts.</li></ul>
<div class="tip"><b>Exam tip</b> For a data question on invasive species, connect each change to a resource: more invaders mean less food or space for natives, so native populations drop and the effects spread through the food web.</div>`]
],
q:[
["8.1","A plant closes its stomata during a dry period. This is best described as:",["A physiological response that conserves water","A behavior learned from another plant","A mutation caused by drought","A density-dependent factor"],0,"It's a change in the organism's function in response to its environment."],
["8.1","Researchers test whether isopods prefer damp or dry conditions using a two-sided chamber. What is the dependent variable?",["Number of isopods on each side","Moisture level","Size of the chamber","Species of isopod"],0,"The moisture is changed by researchers, and they measure where the isopods go."],
["8.1","Bees perform a dance after finding food, and others then go to that food. Which is the best description?",["Communication that changes behavior and raises group fitness","Random movement with no information","A density-independent factor","An example of genetic drift"],0,"Information transfer helps the colony find resources efficiently."],
["8.2","If producers contain 20,000 kcal, about how much is available to secondary consumers?",["200 kcal","2,000 kcal","20 kcal","10,000 kcal"],0,"10% moves up each step: 20,000 → 2,000 → 200."],
["8.2","Which statement correctly compares a mouse with a lizard of the same mass?",["The mouse needs more food because endothermy requires more energy","The lizard needs more food because it produces more metabolic heat","Both need exactly the same amount of energy","The lizard must eat constantly at all temperatures"],0,"Endotherms spend a large share of energy on maintaining body temperature."],
["8.2","An animal's net energy intake is negative for a long time. What is expected?",["Decreased mass and reproductive output","Increased reproductive output","Growth in all tissues","No change"],0,"Energy loss greater than gain leads to loss of mass and, eventually, death."],
["8.2","A forest has GPP = 20,000 kcal/m²/yr and plant respiration of 12,000 kcal/m²/yr. What is NPP?",["8,000 kcal/m²/yr","32,000 kcal/m²/yr","12,000 kcal/m²/yr","2,000 kcal/m²/yr"],0,"NPP = GPP − R = 20,000 − 12,000."],
["8.2","Which is correct about energy and matter in ecosystems?",["Energy flows through and is lost as heat, while matter cycles","Energy cycles while matter is lost","Both are completely recycled","Neither moves between organisms"],0,"Atoms are reused, but energy leaves as heat and must be continually supplied."],
["8.2","Which conclusion follows from the 10% rule?",["A plant-based diet can feed more people per area than a meat-based diet","Top predators are the most abundant organisms","Food chains can have unlimited levels","Producers have the least energy"],0,"Less energy is lost when people eat closer to producers."],
["8.3","A population of 500 has 60 births and 20 deaths in a year, with no migration. What is dN/dt?",["+40 per year","+80 per year","−40 per year","+500 per year"],0,"B − D = 60 − 20 = 40 individuals per year."],
["8.3","What does the exponential growth equation assume?",["No resource limits","A constant population size","High competition","Random mating only"],0,"It assumes reproduction continues without constraint."],
["8.3","Which situation is most likely to show exponential growth?",["A few rabbits introduced to a new, resource-rich island","A forest deer herd at carrying capacity","A pond whose food is running out","A population with deaths far exceeding births"],0,"Few individuals plus plenty of resources allow near-maximum growth."],
["8.4","A population with rₘₐₓ = 0.5, N = 300 and K = 600 has what growth rate?",["75 per unit time","150 per unit time","300 per unit time","0 per unit time"],0,"dN/dt = 0.5 × 300 × (600 − 300)/600 = 150 × 0.5 = 75."],
["8.4","Which is a density-independent factor?",["A hurricane","Disease spreading faster in crowds","Competition for nesting sites","Limited food"],0,"The effect of a hurricane doesn't depend on population density."],
["8.4","What happens if population size temporarily exceeds carrying capacity?",["Growth becomes negative, and the population tends to fall","Growth increases faster","K automatically doubles","The population stops needing food"],0,"When N > K, (K − N)/K is negative, so dN/dt is negative."],
["8.4","At what population size is a logistic population growing fastest?",["About K/2","Near zero","Exactly K","Well above K"],0,"Growth peaks at the midpoint, where both N and available resources are moderate."],
["8.5","Sample A contains 5 species with equal numbers, and sample B contains 5 species with one making up 90% of individuals. Which is correct?",["A has higher diversity according to Simpson's index","B has higher diversity","They are equal since richness is the same","Diversity can't be compared"],0,"Simpson's index accounts for evenness as well as richness."],
["8.5","A community has 20 of species X and 20 of species Y. What is Simpson's Diversity Index?",["0.5","0.25","1.0","0"],0,"1 − [(20/40)² + (20/40)²] = 1 − (0.25 + 0.25) = 0.5."],
["8.5","Clownfish get protection from anemones, and anemones get food and cleaning from clownfish. This is:",["Mutualism","Commensalism","Parasitism","Competition"],0,"Both species benefit."],
["8.5","Warbler species feed in different parts of the same tree. This is:",["Niche partitioning","Competitive exclusion ending in extinction","Parasitism","A density-independent factor"],0,"Dividing resources reduces competition and allows coexistence."],
["8.5","Wolves return to a park. Elk numbers fall, willows recover and beavers return. This is a:",["Trophic cascade","Bottleneck","Founder effect","Bacterial conjugation"],0,"Changes at the top of a food web pass through lower levels."],
["8.5","On a predator-prey graph, what typically happens right after a prey population peaks?",["The predator population peaks a little later","The predator population immediately reaches zero","Prey immediately becomes extinct","Both populations rise forever"],0,"Predators respond to increased food after a time lag."],
["8.6","Which ecosystem is likely most resilient to a new pathogen?",["A diverse forest with many tree species","A single-species plantation","A monoculture of cloned crops","A lawn of one grass"],0,"Diversity makes it unlikely for one pathogen to affect all species."],
["8.6","Sea stars are removed from a tide pool, and mussels take over, reducing species count from 15 to 8. Sea stars are:",["A keystone species","A producer","An invasive species","Abiotic factors"],0,"Their effect is disproportionately large relative to their abundance."],
["8.6","Why do producers help maintain diversity in an ecosystem?",["They provide the energy base for consumers","They remove all oxygen","They prevent decomposition","They reduce available energy to zero"],0,"Almost all energy in the food web starts with them."],
["8.7","Zebra mussels spread rapidly in a lake with no natural predators. What is the most likely short-term effect?",["Native filter feeders decline from competition for food","Native species diversity increases immediately","Mussel population falls because of lack of predators","Energy flow stops completely"],0,"Invasive species can exploit a new niche and outcompete native species."],
["8.7","Which claim about mutation is correct?",["Mutations occur randomly and aren't caused by a need","A drought directly creates alleles for drought tolerance","Mutations occur only when helpful","Selection creates new mutations"],0,"Mutations aren't directed by environmental pressures. Selection acts after they occur."],
["8.7","In malaria regions, heterozygotes for the sickle-cell allele have the highest fitness. What is expected of the allele?",["It stays in the population at a relatively high frequency","It quickly disappears","It becomes fixed in everyone","It becomes dominant in all environments"],0,"Heterozygote advantage maintains both alleles."],
["8.7","Which human activity most directly reduces genetic diversity in crops?",["Monocropping","Planting many varieties","Preserving wild relatives","Seed banking"],0,"Growing one variety over a large area reduces diversity and resilience."],
["8.7","Global temperatures rise and flowering occurs earlier, but pollinators emerge on the same date. What is one likely result?",["Reduced pollination and lower seed production","Increased pollinator numbers immediately","No effect on plants","More pollen in the plants' DNA"],0,"Disrupted timing weakens the mutualism and affects both partners."]
],
cards:[
["8.1","Behavioral response","Change in activity, such as moving into shade or migrating."],
["8.1","Physiological response","Change in body function, such as sweating or closing stomata."],
["8.1","Taxis / kinesis","Directed (taxis) or random (kinesis) movement in response to a stimulus."],
["8.2","Trophic level","Position in a food chain: producer, primary consumer and so on."],
["8.2","10% rule","About 10% of energy moves up each trophic level."],
["8.2","Endotherm","Uses metabolic heat to maintain body temperature."],
["8.2","Ectotherm","Relies on external sources and behavior to regulate temperature."],
["8.2","GPP and NPP","GPP is total photosynthesis; NPP = GPP − respiration."],
["8.2","Decomposers","Break down organic matter and recycle nutrients."],
["8.3","Population","Members of one species living in an area."],
["8.3","dN/dt = B − D","Population change equals births minus deaths."],
["8.3","Exponential growth","dN/dt = rₘₐₓN; a J-shaped curve with no limits."],
["8.4","Carrying capacity (K)","Sustainable population size for available resources."],
["8.4","Logistic growth","dN/dt = rₘₐₓN((K − N)/K); an S-shaped curve that levels off at K."],
["8.4","Density-dependent factor","Effect grows with density, such as food or disease."],
["8.4","Density-independent factor","Effect not tied to density, such as a storm."],
["8.5","Simpson's Diversity Index","1 − Σ(n/N)²; closer to 1 means more diverse."],
["8.5","Mutualism","Both species benefit."],
["8.5","Commensalism","One benefits, and the other is unaffected."],
["8.5","Parasitism","One benefits, and the other is harmed."],
["8.5","Niche partitioning","Species divide resources to reduce competition."],
["8.5","Trophic cascade","A change at one level spreads to others through a food web."],
["8.6","Keystone species","Has an effect far greater than its abundance suggests."],
["8.6","Resilience","Ability of an ecosystem to recover after a disturbance."],
["8.7","Adaptation","Inherited variation favored by selection in a specific environment."],
["8.7","Heterozygote advantage","Heterozygote has higher fitness than either homozygote."],
["8.7","Invasive species","Non-native species that spreads quickly and harms a new ecosystem."]
],
frq:[
["8.2","Energy at each trophic level of a grassland was measured as 8,000, 800, 80 and 8 kcal/m²/yr. Identify the percentage transferred and explain why top predators are so scarce.","Each level receives 10% of the energy from the level below. Most of the rest is used in respiration, lost as heat or not consumed. So little energy is left at the top that the ecosystem can support only small numbers of top predators."],
["8.2","Compare the food needs of a 20 g mouse and a 20 g lizard in a cold environment, then explain the differences using energy and metabolism.","The mouse needs far more food. As an endotherm, it uses metabolic heat to keep its body warm, and it has a high surface area-to-volume ratio, so it loses heat quickly. The lizard is an ectotherm and lets its body temperature fall, so it needs little energy."],
["8.4","A population has K = 1,000 and rₘₐₓ = 0.2. Calculate dN/dt at N = 200 and N = 900, and explain the difference.","At N = 200: 0.2 × 200 × (800/1000) = 32. At N = 900: 0.2 × 900 × (100/1000) = 18. Growth is slower near K because few resources remain. At N = 200, many resources remain, but there are fewer individuals than at the midpoint."],
["8.5","Two forest plots have these counts. Plot A: 25, 25, 25, 25. Plot B: 85, 5, 5, 5. Calculate Simpson's Diversity Index for each and determine which is more diverse.","Plot A: 1 − 4(0.25²) = 1 − 0.25 = 0.75. Plot B: 1 − (0.85² + 3(0.05²)) = 1 − (0.7225 + 0.0075) = 0.27. Plot A is more diverse, even though both have 4 species, because its species are more evenly distributed."],
["8.6","Sea otters eat urchins, and urchins eat kelp. Predict what happens to kelp forests and fish diversity if otters are removed. Identify the role of the otter.","Urchin numbers rise without otters, urchins overgraze kelp and kelp forests decline. Many fish lose habitat, so their diversity falls. The otter is a keystone species, because its effect is far greater than its abundance."],
["8.7","An invasive plant shades native wildflowers and has no natural herbivores here. Predict the effect on native plants, and on insects that depend on them. Propose an experiment to test the plant's effect.","Native plant abundance falls from lower light, and the insects that use them decline. To test, set up matched plots, remove the invasive plant from half and leave it in the others, and measure native plant and insect abundance over several seasons with the same methods."]
]
});
