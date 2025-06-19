
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
  'disc herniation': 'Vaše príznaky zodpovedajú hernii medzistavcovej platničky, ktorá zahŕňa výhrez materiálu platničky, ktorý môže tlačiť na okolité nervy.',
  'facet joint syndrome': 'Vaše príznaky naznačujú syndróm facetových kĺbov, ktorý zahŕňa zápal alebo podráždenie malých kĺbov v chrbtici.',
  'SIJ syndrome': 'Vaše príznaky zodpovedajú syndrómu SI kĺbu, ktorý zahŕňa dysfunkciu kĺbu spájajúceho chrbticu s panvou.',
  'muscle pain': 'Vaše príznaky zodpovedajú svalovej bolesti, ktorá môže zahŕňať napätie, spazmus alebo preťaženie svalov podporujúcich chrbticu.',
  'spinal stenosis': 'Vaše príznaky naznačujú spinálnu stenózu, čo je zúženie miešneho kanála, ktoré môže tlačiť na nervové štruktúry.',
  'spondylolisthesis': 'Vaše príznaky naznačujú spondylolistézu, kde sa jeden stavec posúva vzhľadom na stavec pod ním.',
  'nerve compression': 'Vaše príznaky zodpovedajú kompresii nervu, kde je nervová štruktúra stlačená okolitými tkanivami.',
  'peripheral neuropathy': 'Vaše príznaky naznačujú periférnu neuropatiu, čo je poškodenie periférnych nervov mimo centrálneho nervového systému.',
  'central sensitization': 'Vaše príznaky naznačujú centrálnu senzitizáciu, kde sa váš centrálny nervový systém stal precitlivený na bolestivé signály.',
  'fibromyalgia': 'Vaše príznaky môžu zodpovedať fibromyalgii, chronickému stavu charakterizovanému rozšírenou svalovou bolesťou a citlivosťou.',
  'red flag': 'Niektoré z vašich príznakov môžu vyžadovať urgentné lekárske ošetrenie. Prosím, navštívte čo najskôr zdravotníckeho pracovníka.',
  'ventral spondylolisthesis': 'Vaše príznaky naznačujú ventrálnu spondylolistézu, kde sa stavec posúva dopredu vzhľadom na stavec pod ním.',
  'dorsal spondylolisthesis': 'Vaše príznaky naznačujú dorzálnu spondylolistézu, kde sa stavec posúva dozadu vzhľadom na stavec pod ním.',
  'costovertebral joint syndrome': 'Vaše príznaky zodpovedajú syndrómu kostovertebrálneho kĺbu, ktorý zahŕňa dysfunkciu kĺbov, kde sa rebrá pripájajú k chrbtici.',
  'Radicular Pain': 'Vaše príznaky naznačujú radikulárnu bolesť, ktorá vyžaruje pozdĺž priebehu nervu v dôsledku zápalu alebo podráždenia.',
  'Radiculopathy': 'Vaše príznaky zodpovedajú radikulopatii, čo je dysfunkcia nervového koreňa vedúca k slabosti, zmenenej citlivosti alebo reflexom.',
  'Central Sensitisation': 'Vaše príznaky naznačujú centrálnu senzitizáciu, kde sa váš centrálny nervový systém stal precitlivený na bolestivé signály.',
  'Central Sensitisation - Allodynia': 'Vaše príznaky zahŕňajú alodýniu, čo je bolesť z podnetov, ktoré by normálne nemali spôsobovať bolesť, čo naznačuje centrálnu senzitizáciu.',
  'Central Sensitisation - Sensory Hypersensitivity': 'Vaše príznaky zahŕňajú zmyslovú precitlivenosť, kde sa environmentálne podnety ako svetlo alebo zvuk stávajú nepríjemnými.',
  'Central Sensitisation - Cognitive Symptoms': 'Vaše príznaky zahŕňajú kognitívne efekty ako zahmlené myslenie alebo únavu, ktoré môžu sprevádzať centrálnu senzitizáciu.',
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
