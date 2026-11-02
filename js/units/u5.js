UNIT({
n:5,name:"Heredity",short:"Heredity",w:"8–11%",form:"chromosome",scale:"1.4 µm",scaleOf:"across a condensed chromosome",
topics:[
["5.1","Meiosis",`
<div class="big"><b>Big idea:</b> Meiosis takes one diploid cell through <b>two divisions</b> and produces four <b>haploid</b> cells. It is how sexual organisms keep their chromosome number constant between generations.</div>
<div class="tbl"><table><tr><th></th><th>Mitosis</th><th>Meiosis</th></tr>
<tr><td>Divisions</td><td>1</td><td>2</td></tr>
<tr><td>Daughter cells</td><td>2, diploid</td><td>4, haploid</td></tr>
<tr><td>Genetic makeup</td><td>Identical</td><td>Different</td></tr>
<tr><td>Homologs pair?</td><td>No</td><td>Yes, in prophase I</td></tr>
<tr><td>Purpose</td><td>Growth, repair, asexual reproduction</td><td>Making gametes</td></tr></table></div>
<h3>What separates when</h3>
<ul><li><b>Meiosis I</b> separates <b>homologous chromosomes</b>. In prophase I, homologs pair (synapsis) and chiasmata may form. In metaphase I, homologous pairs line up at the equator. Sister chromatids stay attached in anaphase I.</li>
<li><b>Meiosis II</b> separates <b>sister chromatids</b>, much like mitosis.</li></ul>
<div class="tip"><b>Exam tip</b> Meiosis I is the reduction division. If a cell has 2n = 8, each cell after meiosis I has 4 chromosomes (still duplicated), and each cell after meiosis II has 4 unduplicated chromosomes.</div>`],
["5.2","Meiosis and Genetic Diversity",`
<div class="big"><b>Big idea:</b> Sexual reproduction creates variation in three ways: <b>crossing over, random assortment and fertilization</b>.</div>
<ul><li><b>Crossing over:</b> non-sister chromatids exchange segments in prophase I, creating new combinations of alleles.</li>
<li><b>Random assortment:</b> each homologous pair lines up independently. A species with haploid number <i>n</i> has 2ⁿ possible combinations. For humans that is 2²³, or more than 8 million.</li>
<li><b>Fertilization:</b> any sperm can join any egg, multiplying those combinations.</li>
<li><b>Nondisjunction:</b> chromosomes fail to separate, so gametes are no longer haploid. The offspring may have an extra or a missing chromosome.</li></ul>
<div class="out"><b>Not on the exam:</b> details of sexual reproduction cycles in various plants and animals, and specific disorders caused by changes in chromosome number.</div>
<div class="tip"><b>Exam tip</b> Nondisjunction in meiosis I makes <b>all four</b> gametes abnormal. Nondisjunction in meiosis II makes <b>two</b> abnormal and two normal.</div>`],
["5.3","Mendelian Genetics",`
<div class="big"><b>Big idea:</b> Alleles separate into gametes (<b>segregation</b>), and genes on different chromosomes assort independently (<b>independent assortment</b>). Probability predicts the offspring.</div>
<div class="diagram"><svg viewBox="0 0 360 200" width="100%" style="max-width:360px;display:block;margin:auto" role="img" aria-label="Punnett square for Aa by Aa showing one AA, two Aa and one aa">
<g fill="var(--leaf-soft)" stroke="var(--leaf)" stroke-width="2"><rect x="100" y="40" width="100" height="70"/><rect x="200" y="40" width="100" height="70"/><rect x="100" y="110" width="100" height="70"/></g><rect x="200" y="110" width="100" height="70" fill="var(--sun-soft)" stroke="var(--sun)" stroke-width="2"/>
<g text-anchor="middle" font-size="18"><text x="150" y="32">A</text><text x="250" y="32">a</text><text x="80" y="82">A</text><text x="80" y="152">a</text><text x="150" y="82">AA</text><text x="250" y="82">Aa</text><text x="150" y="152">Aa</text><text x="250" y="152">aa</text></g>
</svg></div>
<h3>Key crosses</h3>
<ul><li>Monohybrid (Aa × Aa): <b>3:1</b> phenotype ratio, 1:2:1 genotype ratio.</li>
<li>Dihybrid (AaBb × AaBb): <b>9:3:3:1</b> phenotype ratio.</li>
<li>Test cross: unknown × homozygous recessive reveals the unknown genotype.</li></ul>
<h3>Probability rules</h3>
<ul><li><b>Product rule ("and"):</b> multiply probabilities of independent events.</li><li><b>Sum rule ("or"):</b> add probabilities of mutually exclusive events.</li></ul>
<h3>Reading pedigrees</h3>
<ul><li>A trait that skips generations and appears in children of unaffected parents is likely <b>recessive</b>.</li>
<li>A trait affecting mostly XY individuals, passed through unaffected XX mothers, suggests <b>X-linked recessive</b>.</li></ul>
<h3>Chi-square test</h3>
<div class="eq">χ² = Σ (o − e)² ÷ e · df = categories − 1</div>
<p>If χ² is <b>less than</b> the critical value at p = 0.05, fail to reject the null hypothesis. For df = 1 the critical value is 3.84. For df = 3 it is 7.81.</p>
<div class="tip"><b>Exam tip</b> Use the formula sheet and show the steps: state expected counts, compute χ², find df, compare to the critical value and then conclude. Never say the hypothesis is "proven."</div>`],
["5.4","Non-Mendelian Genetics",`
<div class="big"><b>Big idea:</b> Many traits do not follow Mendel's ratios. A significant difference in a chi-square test is the clue that something else is going on.</div>
<div class="tbl"><table><tr><th>Pattern</th><th>What you see</th></tr>
<tr><td><b>Genetic linkage</b></td><td>Genes on one chromosome stay together; few recombinants</td></tr>
<tr><td><b>Codominance</b></td><td>Both alleles show fully, as with AB blood type</td></tr>
<tr><td><b>Incomplete dominance</b></td><td>Heterozygote is intermediate; red × white gives pink</td></tr>
<tr><td><b>Sex-linked</b></td><td>Different frequencies in XX and XY individuals</td></tr>
<tr><td><b>Polygenic</b></td><td>Many genes add together; continuous variation</td></tr>
<tr><td><b>Pleiotropy</b></td><td>One gene affects many traits</td></tr>
<tr><td><b>Non-nuclear</b></td><td>Mitochondrial and chloroplast genes; usually maternal inheritance</td></tr></table></div>
<h3>Gene mapping</h3>
<div class="eq">Recombination frequency = recombinant offspring ÷ total offspring × 100 = map units</div>
<p>Genes farther apart cross over more often. A recombination frequency of 50% means the genes behave as if unlinked.</p>
<div class="tip"><b>Exam tip</b> In a linked cross, the two largest offspring classes are the parental types. The smallest classes are the recombinants.</div>`],
["5.5","Environmental Effects on Phenotype",`
<div class="big"><b>Big idea:</b> The same genotype can make different phenotypes in different environments. This is <b>phenotypic plasticity</b>.</div>
<ul><li>Hydrangea flower color changes with soil pH.</li>
<li>Arctic animals change seasonal fur color.</li>
<li>In some reptiles, incubation temperature determines sex.</li>
<li>Human height and weight depend on genes as well as nutrition.</li>
<li>UV exposure raises melanin production in skin.</li></ul>
<div class="tip"><b>Exam tip</b> To test whether a difference is environmental, use <b>genetically identical</b> organisms in different conditions. Differences then cannot be explained by genotype.</div>`]
],
q:[
["5.1","A diploid cell has 2n = 12 before S phase. After meiosis I, how many chromosomes does each cell have?",["3","6","12","24"],1,"Homologous chromosomes separate during meiosis I, so each cell has 6 chromosomes, each still with 2 chromatids."],
["5.1","Which event occurs in meiosis but not in mitosis?",["Sister chromatids separate","Spindle fibers form","Homologous chromosomes pair up","The nuclear envelope breaks down"],2,"Synapsis of homologous chromosomes happens only in prophase I of meiosis."],
["5.1","During anaphase II, what is separated?",["Homologous pairs","Sister chromatids","Whole diploid nuclei","Non-sister chromatids in a chiasma"],1,"Meiosis II resembles mitosis: sister chromatids go to opposite poles."],
["5.1","Which statement best explains why meiosis is necessary in sexual reproduction?",["It doubles the chromosome number for each generation","It halves chromosome number so fertilization can restore the diploid number","It makes each gamete identical to its parent","It removes the need for DNA replication"],1,"Without reduction, fertilization would double the chromosome number every generation."],
["5.2","Which event is responsible for new allele combinations on a single chromosome?",["Crossing over","Cytokinesis","DNA repair","Nondisjunction"],0,"Exchange between non-sister chromatids recombines alleles on the same chromosome."],
["5.2","An organism has a haploid number of 4. Ignoring crossing over, how many genetically different gametes can independent assortment produce?",["4","8","16","64"],2,"The number is 2ⁿ = 2⁴ = 16."],
["5.2","Nondisjunction of one homologous pair occurs in meiosis I. What is the result among the four gametes?",["All four have abnormal chromosome number","Two are normal and two are abnormal","All four are normal","One is abnormal and three are normal"],0,"All chromosomes go to one side in the first division, so all gametes end up with one extra or one fewer."],
["5.2","Which best explains why two siblings who aren't identical twins have different traits?",["Their gametes came from independent meiosis and fertilization events","Their parents' DNA changed completely between births","Siblings inherit genes only from one parent","Mitosis produces different cells in each sibling's parents"],0,"Crossing over, random assortment and random fertilization make each child's genotype different."],
["5.3","In peas, purple (P) is dominant to white (p). A Pp plant is crossed with a Pp plant. What is the probability that an offspring is white?",["1/4","1/2","3/4","0"],0,"Only pp offspring are white, and that happens with probability 1/2 × 1/2 = 1/4."],
["5.3","From the cross AaBb × AaBb with unlinked genes, what fraction of offspring is aabb?",["1/4","1/8","1/16","9/16"],2,"aa has probability 1/4 and bb has probability 1/4, so 1/4 × 1/4 = 1/16."],
["5.3","Two parents without a condition have an affected child. The most likely pattern is that the trait is:",["dominant, and both parents are homozygous dominant","recessive, and both parents are carriers","dominant, and only one parent is a carrier","not inherited under any circumstances"],1,"A recessive trait can appear when two heterozygous parents pass on recessive alleles."],
["5.3","A test cross of a dominant-phenotype organism gives half dominant and half recessive offspring. The tested organism's genotype is:",["Homozygous dominant","Heterozygous","Homozygous recessive","Impossible to determine"],1,"Only a heterozygote can pass a recessive allele to half of offspring."],
["5.3","A cross gives 88 purple and 12 white offspring, with an expected 3:1 ratio (75:25). What is χ²?",["0.22","2.25","9.01","12.0"],2,"χ² = (88−75)²/75 + (12−25)²/25 = 2.25 + 6.76 = 9.01. With df = 1 and critical value 3.84, the difference is significant."],
["5.3","A calculated χ² of 2.1 with df = 3 at p = 0.05 (critical value 7.81) leads to which conclusion?",["Reject the null; the results differ significantly","Fail to reject the null; differences could be due to chance","The null hypothesis is proven true","The experiment must be repeated with df = 1"],1,"The calculated value is below the critical value, so chance could explain the difference."],
["5.3","An X-linked recessive trait appears in a son. His parents are unaffected. Which statement is correct?",["His father passed on the allele","His mother is a carrier","Both parents are homozygous recessive","The allele must be on the Y chromosome"],1,"Sons get their X from their mother, and an unaffected mother must therefore be a carrier."],
["5.4","Two genes show recombination in 8% of offspring. These genes are:",["on separate chromosomes","linked, about 8 map units apart","identical in sequence","on the Y chromosome only"],1,"A low recombination frequency means the genes are linked, and 1% equals 1 map unit."],
["5.4","A red flower crossed with a white flower gives all pink offspring. What does this show?",["Codominance","Incomplete dominance","Epistasis","Linkage"],1,"The heterozygote has a blended phenotype."],
["5.4","A person with type AB blood expresses both A and B antigens fully. This is:",["incomplete dominance","codominance","pleiotropy","maternal inheritance"],1,"Both alleles are fully expressed in the heterozygote."],
["5.4","Offspring from a dihybrid test cross are: 450 AaBb, 440 aabb, 55 Aabb, 55 aaBb. What is the map distance between the genes?",["5.5 units","11 units","44 units","50 units"],1,"Recombinants = 55 + 55 = 110 of 1000 total, or 11%."],
["5.4","A mitochondrial trait passes from an affected mother to all of her children. An affected father passes it to none. What is the best explanation?",["The trait is on an autosome","Mitochondria are generally inherited from the egg","The trait is on the Y chromosome","The trait is polygenic"],1,"The egg contributes nearly all mitochondria to a zygote, which gives maternal inheritance."],
["5.4","Human height is continuous, with a bell-shaped distribution. Which pattern best explains this?",["Many genes with environmental influence","One gene with two alleles","Sex-linked recessive inheritance","Mitochondrial inheritance only"],0,"Polygenic traits and the environment produce continuous variation."],
["5.5","Hydrangeas with the same genotype have blue flowers in acidic soil and pink flowers in basic soil. This shows that:",["mutation is caused by soil","environment can influence phenotype","genotype changes with pH","flower color is not a trait"],1,"The same genotype gives different phenotypes in different conditions, known as phenotypic plasticity."],
["5.5","Eggs of a turtle species hatch mostly male at 26 °C and mostly female at 31 °C. Which conclusion is best supported?",["Temperature affects sex determination","Temperature changes the DNA sequence","All reptiles lack sex-determining pathways","Males have higher fitness at any temperature"],0,"Incubation temperature can affect gene expression in sex determination."],
["5.5","Which experiment best tests whether an insect's color is environmentally influenced?",["Raise genetically identical insects at different temperatures","Compare unrelated insects in one environment","Count all insect species in a field","Sequence one insect's mitochondria"],0,"Identical genotypes in different environments isolate the environmental effect."]
],
cards:[
["5.1","Haploid (n)","One set of chromosomes, as in gametes."],
["5.1","Diploid (2n)","Two sets of chromosomes, one from each parent."],
["5.1","Homologous chromosomes","Pair with the same genes in the same order, one from each parent."],
["5.1","Synapsis","Pairing of homologous chromosomes in prophase I."],
["5.1","Meiosis I","Reduction division: homologs separate."],
["5.1","Meiosis II","Sister chromatids separate, producing four haploid cells."],
["5.2","Crossing over","Non-sister chromatids exchange segments in prophase I."],
["5.2","Chiasma","Crossover point where chromatids exchange segments."],
["5.2","Random assortment","Homolog pairs line up independently, giving 2ⁿ combinations."],
["5.2","Nondisjunction","Failure of chromosomes to separate correctly; leads to abnormal gametes."],
["5.3","Law of segregation","Two alleles of a gene separate into different gametes."],
["5.3","Law of independent assortment","Genes on different chromosomes assort independently of each other."],
["5.3","Genotype","The alleles an organism has."],
["5.3","Phenotype","The observable trait."],
["5.3","Test cross","Cross with a homozygous recessive to reveal an unknown genotype."],
["5.3","Product rule","Multiply probabilities for independent events (\"and\")."],
["5.3","Sum rule","Add probabilities for mutually exclusive events (\"or\")."],
["5.3","Chi-square","χ² = Σ(o−e)²/e. Compare to a critical value with df = categories − 1."],
["5.3","Null hypothesis","Assumes no real difference from what is expected; differences are due to chance."],
["5.4","Linked genes","Genes close together on a chromosome that tend to be inherited together."],
["5.4","Map unit","1% recombination frequency."],
["5.4","Codominance","Both alleles fully expressed, as in AB blood."],
["5.4","Incomplete dominance","Heterozygote shows an intermediate phenotype."],
["5.4","Sex-linked trait","Gene on a sex chromosome; pattern differs between XX and XY individuals."],
["5.4","Non-nuclear inheritance","Traits from mitochondrial or chloroplast DNA, usually maternal."],
["5.5","Phenotypic plasticity","One genotype can produce different phenotypes in different environments."]
],
frq:[
["5.1","A cell has 2n = 6. Draw or describe the chromosomes at metaphase I, metaphase II and in the resulting gametes. Explain the difference between the first two stages.","Metaphase I: 3 homologous pairs at the equator, for 6 duplicated chromosomes. Metaphase II: 3 duplicated chromosomes lined up singly in each cell. Gametes: 3 unduplicated chromosomes each. The difference is that homologs line up as pairs in metaphase I, but sister chromatids line up individually in metaphase II."],
["5.2","Explain how nondisjunction during meiosis II differs from nondisjunction during meiosis I in the resulting gametes.","In meiosis I, a homologous pair goes to one pole, so all four gametes are abnormal: two with an extra chromosome and two with one fewer. In meiosis II, one pair of sister chromatids fails to separate in one of the two cells, so two gametes are normal, one has an extra chromosome and one has one fewer."],
["5.3","In a cross predicted to give a 9:3:3:1 ratio, a student counts 330, 100, 110 and 60 out of 600. Perform a chi-square test at p = 0.05, where the critical value is 7.81, and draw a conclusion.","Expected: 337.5, 112.5, 112.5, 37.5. χ² = 0.17 + 1.39 + 0.06 + 13.5 = 15.1, df = 3. Since 15.1 > 7.81, reject the null hypothesis. The data differ significantly from a 9:3:3:1 ratio, suggesting the genes may be linked or other factors affect survival."],
["5.4","A dihybrid test cross gives 412 and 396 parental-type offspring and 95 and 97 recombinant-type offspring. Calculate the recombination frequency and explain what it reveals about the genes.","Recombinants = 192 of 1000 = 19.2%, or about 19 map units apart. The value is well below 50%, so the genes are linked on the same chromosome. Crossing over between them occurs, but less often than for unlinked genes."],
["5.4","An affected mother passes a trait to all of her children, while an affected father passes it to none. Propose an inheritance pattern and justify it.","The pattern suggests maternal inheritance from a gene in mitochondrial DNA (or chloroplast DNA in plants). Because the egg provides the zygote's organelles, the mother's trait goes to all children, and sperm generally contribute no mitochondria, so the father's does not pass on."],
["5.5","Design an experiment to determine whether a fruit fly eye color trait changes with rearing temperature. Identify the independent variable, dependent variable, and one control.","Independent variable: rearing temperature, such as 18, 24 and 30 °C. Dependent variable: eye pigment level or color category. Controls: use genetically identical flies with the same diet and light. If the color differs by temperature, the environment influences the phenotype."]
]
});
