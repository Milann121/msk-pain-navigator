
export interface Advice {
  adviceId: number;
  adviceTitle: string;
  adviceSubtitle: string;
  advicePriority: string;
  adviceRule: string;
  adviceDescription: string;
  adviceImageUrl: string;
  adviceLink: string;
  // New matching criteria
  bodyParts: Array<'neck' | 'middle-back' | 'lower-back' | 'upper limb'>;
  mechanisms: Array<'nociceptive' | 'neuropathic' | 'central'>;
  differentials?: Array<string>; // Optional for more specific targeting
}

export const advices: Advice[] = [
  {
    adviceId: 1,
    adviceTitle: "Pravidelná zmena polohy",
    adviceSubtitle: " ",
    advicePriority: "Vysoká",
    adviceRule: "Každých 45-60min.",
    adviceDescription: "Vaše bolesti môžu byť spôsobované aj statickou záťažou, ktorá pri vašom probléme nie je vhodná. Snažte sa pravidelné meniť polohy, čo vám zabezpečí potrebnú úľavu od bolesti a zníženie rizika ďalších bolestí.",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    // Matching criteria - applies to all body parts and mechanisms
    bodyParts: ['neck', 'middle-back', 'lower-back', 'upper limb'],
    mechanisms: ['nociceptive', 'neuropathic', 'central']
  },
  {
    adviceId: 2,
    adviceTitle: "Postupné zvyšovanie záťaže",
    adviceSubtitle: "Pre nociceptívnu bolesť",
    advicePriority: "Stredná",
    adviceRule: "Zvyšujte intenzitu postupne každý týždeň",
    adviceDescription: "Pri nociceptívnej bolesti je dôležité postupne zvyšovať záťaž cvičenia. Začnite pomaly a každý týždeň mierne zvýšte intenzitu alebo počet opakovaní.",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['lower-back', 'middle-back', 'neck'],
    mechanisms: ['nociceptive']
  },
  {
    adviceId: 3,
    adviceTitle: "Pozor na neurálne symptómy",
    adviceSubtitle: "Pre neuropatickú bolesť",
    advicePriority: "Vysoká",
    adviceRule: "Okamžite prestaňte pri zhoršení symptómov",
    adviceDescription: "Pri neuropatickej bolesti dávajte pozor na príznaky ako brnenie, mravčenie alebo žuborenie. Ak sa tieto symptómy zhoršia počas cvičenia, okamžite prestaňte.",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['lower-back', 'neck', 'upper limb'],
    mechanisms: ['neuropathic']
  },
  {
    adviceId: 4,
    adviceTitle: "Rešpektovanie bolesti pri centrálnej senzitizácii",
    adviceSubtitle: "Pre centrálnu bolesť",
    advicePriority: "Vysoká",
    adviceRule: "Nevynucujte si cvičenie cez bolesť",
    adviceDescription: "Pri centrálnej senzitizácii je dôležité rešpektovať vaše hranice. Cvičenie by nemalo zvyšovať bolesť. Začnite veľmi jemne a postupne sa adaptujte.",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['neck', 'middle-back', 'lower-back', 'upper limb'],
    mechanisms: ['central']
  },
  {
    adviceId: 5,
    adviceTitle: "Špeciálne opatrenia pre rameno",
    adviceSubtitle: "Pre problémy ramena",
    advicePriority: "Stredná",
    adviceRule: "Vyhýbajte sa bolestivým pozíciám",
    adviceDescription: "Pri problémoch ramena sa vyhýbajte pohybom nad hlavu v akútnej fáze. Začnite s pohybmi v rozsahu, ktorý nebolí.",
    adviceImageUrl: "https://via.placeholder.com/150",
    adviceLink: "https://www.google.com",
    bodyParts: ['upper limb'],
    mechanisms: ['nociceptive'],
    differentials: ['frozen-shoulder', 'rotator-cuff-tear', 'subacromional-impingement-syndrome']
  }
];
