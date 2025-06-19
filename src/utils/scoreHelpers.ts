import { Differential, PainMechanism, SINGroup } from './types';

// Helper function to map pain intensity to SIN group
export const mapPainIntensityToSIN = (intensity: number): SINGroup => {
  if (intensity >= 0 && intensity <= 4) return 'low SIN';
  if (intensity >= 5 && intensity <= 7) return 'mid SIN';
  if (intensity >= 8 && intensity <= 10) return 'high SIN';
  return 'none';
};

// Human-readable mechanism descriptions in Slovak
export const painMechanismDescriptions: Record<PainMechanism, string> = {
  'nociceptive': 'Vaša bolesť sa javí ako primárne nociceptívna, čo znamená, že pochádza z poškodenia tkaniva alebo zápalu v svaloch, kĺboch alebo iných tkanivách.',
  'neuropathic': 'Vaša bolesť sa javí ako primárne neuropatická, čo znamená, že súvisí s poškodením alebo dysfunkciou vášho nervového systému.',
  'central': 'Vaša bolesť zahŕňa centrálnu senzitizáciu, čo znamená, že váš nervový systém sa stal citlivejším na bolestivé signály.',
  'red-flag': 'Vaše príznaky môžu naznačovať vážne ochorenie, ktoré vyžaduje okamžitú lekársku pozornosť. Prosím, navštívte čo najskôr zdravotníckeho pracovníka.',
  'none': 'Z vašich odpovedí sme nedokázali určiť jasný mechanizmus bolesti.'
};

// Human-readable SIN descriptions in Slovak
export const sinGroupDescriptions: Record<SINGroup, string> = {
  'low SIN': 'Vaša bolesť má nízku závažnosť, dráždivosť a povahu, čo znamená, že je vo všeobecnosti mierna, nie ľahko vyvolateľná a rýchlo ustupuje po odstránení dráždivých faktorov.',
  'mid SIN': 'Vaša bolesť má strednú závažnosť, dráždivosť a povahu, čo znamená, že je mierne intenzívna, môže byť vyvolaná špecifickými aktivitami a trvá určitý čas, kým ustúpi.',
  'high SIN': 'Vaša bolesť má vysokú závažnosť, dráždivosť a povahu, čo znamená, že je intenzívna, ľahko vyvolateľná a trvá dlhšie, kým po spustení ustúpi.',
  'none': 'Z vašich odpovedí sme nedokázali určiť závažnosť, dráždivosť a povahu vašej bolesti.'
};

// Human-readable differential descriptions in Slovak
export const differentialDescriptions: Record<Differential, string> = {
  'disc herniation': 'Hernia platničky je stav, pri ktorom sa vnútorná časť medzistavcovej platničky presunie cez poškodený vonkajší kruh. Môže spôsobiť bolesť, ktorá sa vyžaruje do končatín.',
  'facet joint syndrome': 'Syndróm facetových kĺbov vzniká pri zápale alebo dysfunkcii malých kĺbov medzi stavcami. Typicky sa prejavuje lokálnou bolesťou, ktorá sa môže zhoršiť pri predklone alebo otáčaní.',
  'SIJ syndrome': 'Syndróm SI kĺbu (sakroiliakálneho kĺbu) je stav postihujúci kĺb medzi krížovou kosťou a panvou. Môže spôsobiť bolesť v dolnej časti chrbta a panvy.',
  'muscle pain': 'Svalová bolesť je často spôsobená preťažením, napätím alebo zranením svalov. Môže byť akútna alebo chronická.',
  'spinal stenosis': 'Stenóza chrbtice je zúženie kanála chrbtice, ktoré môže spôsobiť tlak na miešny alebo nervové korene.',
  'spondylolisthesis': 'Spondylolistéza je stav, pri ktorom sa jeden stavec posunie vpred oproti stavcu pod ním.',
  'nerve compression': 'Kompresia nervu vzniká, keď je nerv stlačený okolitými tkanivami, čo môže spôsobiť bolesť, tŕpnutie alebo slabosť.',
  'peripheral neuropathy': 'Periférna neuropatia je poškodenie periférnych nervov, ktoré môže spôsobiť bolesť, tŕpnutie a slabosť.',
  'central sensitization': 'Centrálna senzitizácia je stav, pri ktorom je nervový systém hyperaktívny a reaguje na normálne podnety ako na bolestivé.',
  'fibromyalgia': 'Fibromyalgia je chronické ochorenie charakterizované rozšírenou bolesťou svalov a únavou.',
  'red flag': 'Červené vlajky sú varovné príznaky, ktoré môžu indikovať vážne ochorenie vyžadujúce okamžitú lekársku pozornosť.',
  'ventral spondylolisthesis': 'Ventrálna spondylolistéza je typ spondylolistézy, pri ktorom sa stavec posunie dopredu.',
  'dorsal spondylolisthesis': 'Dorzálna spondylolistéza je typ spondylolistézy, pri ktorom sa stavec posunie dozadu.',
  'costovertebral joint syndrome': 'Syndróm kostovertebrálneho kĺbu postihuje kĺby medzi rebrami a stavcami, často spôsobuje bolesť pri dýchaní.',
  'Radicular Pain': 'Radikulárna bolesť je bolesť, ktorá vzniká z nervového koreňa a vyžaruje sa pozdĺž nervovej dráhy.',
  'Radiculopathy': 'Radikulopatia je dysfunkcia nervového koreňa, ktorá môže spôsobiť bolesť, tŕpnutie, slabosť alebo stratu reflexov.',
  'Central Sensitisation': 'Centrálna senzitizácia je stav hypersenzitivity nervového systému na bolestivé podnety.',
  'Central Sensitisation - Allodynia': 'Alodýnia je typ centrálnej senzitizácie, pri ktorej nebolestivé podnety vyvolávajú bolesť.',
  'Central Sensitisation - Sensory Hypersensitivity': 'Zmyslová hypersenzitivita je zvýšená citlivosť na zmyslové podnety.',
  'Central Sensitisation - Cognitive Symptoms': 'Kognitívne symptómy centrálnej senzitizácie môžu zahŕňať problémy s pamäťou a koncentráciou.',
  'frozen-shoulder': 'Zmrznuté rameno je stav charakterizovaný bolesťou a obmedzeným pohybom ramena.',
  'slap-tear': 'SLAP lézia je poškodenie labra v ramene, často spôsobené opakovanými pohybmi nad hlavou.',
  'subacromional-impingement-syndrome': 'Subakromiálny impingment syndróm je stav, pri ktorom sa šľachy v ramene zachytávají pod akromiálnym výbežkom.',
  'stiff-shoulder': 'Stuhnuté rameno je stav charakterizovaný obmedzenou pohyblivosťou ramena.',
  'labral-leason': 'Lézia labra je poškodenie chrupavčitého okraja kĺbovej jamky ramena.',
  'shoulder-bursa': 'Zápal burzy v ramene môže spôsobiť bolesť a obmedzenú pohyblivosť.',
  'rotator-cuff-tear': 'Trhnutie rotátorovej manžety je poškodenie svalov a šliach, ktoré stabilizujú rameno.',
  'rotator-cuff-tendinopathy': 'Tendinopatia rotátorovej manžety je degeneratívne ochorenie šliach ramena.',
  'biceps-tendinopathy': 'Tendinopatia bicepsu je ochorenie šľachy dvojhlavého svalu ramena.',
  'biceps-tear-long-head': 'Trhnutie dlhej hlavy bicepsu je poškodenie šľachy dvojhlavého svalu v ramene.',
  'shoulder-dislocation': 'Vykĺbenie ramena je stav, pri ktorom sa hlavica ramena dostane z kĺbovej jamky.',
  'shoulder-instability': 'Nestabilita ramena je stav, pri ktorom je rameno náchylné na vykĺbenie.',
  'cervical-radiculopathy': 'Cervikalna radikulopatia je stav postihujúci nervové korene v krčnej chrbtici, ktorý môže spôsobiť bolesť, tŕpnutie a slabosť v ramene a paži.',
  'radicular-pain': 'Radikulárna bolesť je ostrá bolesť, ktorá sa vyžaruje z miesta poškodeného nervového koreňa.',
  'radiculopathy': 'Radikulopatia je poškodenie alebo dysfunkcia nervového koreňa.',
  'none': 'Nebola identifikovaná žiadna špecifická diagnóza na základe vašich odpovedí.'
};

// Exercise recommendations based on pain mechanism, SIN, and differential
export const getExerciseRecommendation = (
  mechanism: PainMechanism,
  sinGroup: SINGroup,
  differential: Differential,
  painArea: string
): string => {
  const areaSpecific = painArea === 'neck' 
    ? 'krku a hornej časti chrbta' 
    : painArea === 'middle back' 
      ? 'strednej časti chrbta' 
      : 'dolnej časti chrbta a drieku';
  
  if (mechanism === 'nociceptive') {
    if (sinGroup === 'high SIN') {
      return `Oddych a veľmi jemný pohyb pre oblasť ${areaSpecific}. Zamerajte sa na pozície, ktoré zmierňujú bolesť.`;
    } else if (sinGroup === 'mid SIN') {
      return `Jemné posilňovacie a pohyblivostné cvičenia pre ${areaSpecific}, zostaňte v rozsahu bez bolesti.`;
    } else {
      return `Progresívne posilňovacie a pohyblivostné cvičenia pre ${areaSpecific} na zlepšenie funkcie a prevenciu opakovania.`;
    }
  }
  
  if (mechanism === 'neuropathic') {
    if (sinGroup === 'high SIN') {
      return `Cvičenia nervového kĺzania a jemné polohovanie pre ${areaSpecific} na zníženie podráždenia nervu.`;
    } else {
      return `Cvičenia nervovej mobilizácie a cielené posilňovanie pre ${areaSpecific} na podporu zdravia nervov.`;
    }
  }
  
  if (mechanism === 'central') {
    return `Postupné vystavovanie pohybu, relaxačné techniky a dávkovaná aktivita pre ${areaSpecific} na zníženie citlivosti nervového systému.`;
  }
  
  return `Poraďte sa s fyzioterapeutom pre personalizované vedenie cvičení pre ${areaSpecific}.`;
};
