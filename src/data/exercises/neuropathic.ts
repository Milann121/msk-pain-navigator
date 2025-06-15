import { Exercise } from "@/types/exercise";

export const neuropathicExercises: Record<string, Exercise[]> = {
  // Radicular Pain ✅
  // NECK ✅
  'neuropathic-Radicular Pain-neck': [
    {
      title: '0-3 týžeň',
      description: 'Jemné cvičenia na uvoľnenie nervových koreňov v krčnej oblasti a zníženie neurologických príznakov.',
      videos: [
        {
          videoId: 'oaB4o_qeMdQ',
          title: 'Zásuvka krku',
          description: 'Posaďte sa a uvoľnite ramená. Uložte si ukazovák jednej ruky na bradu a pomaly zasuňte bradu smerom dnu (podľa videa). Rozsah zásuvky robte iba tak, aby vám bol komfortný, tento cvik by nemal produkovať žiadnu bolesť! Následne bradu opäť vysuňte mierne dopredu. Celý čas sa snažte mať uvoľné plecia, nenapínať ich a hlavu držať v rovine bez pohybov do predklonu alebo záklonu. \n ➜ OPAKOVANIA: 10x / kedykoľvek v priebehu dňa.',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: "Postup: Posaďte sa a uvoľnite trapézy\n ➜ upažte ruku s dlaňou smerujúcou hore\n ➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n Vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte\nOPAKOVANIA: zopakujte 10-15 x /5x denne",
          importance: 2,
          mainGroup: ["neuro-mobs", "pain-relief"],
          bodyPart:["neck"],
        },
        {
          videoId: 'AefUaX7yLGw',
          title: 'Úklony krku',
          description: 'Posaďte sa a začnite vykonávať úklony do strany. Rozsah úklonu vykonávajte maximálne po bolesť a nezotrvávajte v tejto polohe - hneď sa vráťte naspäť do neutrálnej polohy.\n ➜ OPAKOVANIA: 6-8x do každej strany.\n ➜ UPOZORNENIE: ak bude jedna strana bolestivejšia, obmedzte rozsah aj opakovania do tejto polohy. ',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
        }
      ]
    },
    {
      title: '4-6 týždeň',
      description: 'Zvýšenie pohyblivosti v krčnej chrbtici a redukcia bolesti.',
      videos: [
        {
          videoId: 'PK62xMsZfG0',
          title: 'Modlenie - uvoľnenie krku a lopatiek',
          description: 'Spojte dlane a lakte v 90 stupňovom uhle v lakti a ramenách. So sústavným spojením pomaly zdvíhajte lakte vyššie, ale stále DRŽTE SPOJENÉ lakte aj dlane. UPOZORNENIE: snažte sa, aby vám prsty stále smerovali do stropu. OPAKOVANIA: 20 sekúnd / 2x za sebou / 2x denne.',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: '844ILxo5xsA',
          title: 'Masáž loptičkou o stenu',
          description: 'Na tento cvik použite ideálne tenisovú loptičku. Položte si loptičku na trapéz, oprite sa o stenu a masírujte svaly šije ako na videu. V prípade, že nájdete bolestivé miesta, môžete staticky zatlačiť po dobu 20-30 sekúnd. Premasírujte celú oblasť trapézov a medzilopatkového priestoru.',
          importance: 1,
          mainGroup: ["pain-relief"],
          bodyPart:["neck","middle-back"],
        }
      ]
    }
  ],

  //LUMBAR SPINE ✅
  'neuropathic-Radicular Pain-lower back': [
    {
      title: '0-3 týždeň',
      description: 'Cvičenia zamerané na jemnú mobilizáciu nervových štruktúr v driekovej oblasti.',
      videos: [
        {
          videoId: '3A27NLPe2bs',
          title: 'Neurodynamika sedacieho nervu',
          description: 'Popis vo videu.\n ➜ OPAKOVANIA: 15x / 3-5x denne\n ➜ UPOZORNENIE: ihneď po cvičení môžete pociťovať mierne trnutie nohy. Malo by prejsť do pól minúty, v opačnom prípade znížte počet opakovaní alebo cvik vynechajte.',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\nOPAKOVANIA: 5x denne.',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'L1Mf3NxYwgY',
          title: 'Prelápanie panve',
          description: 'Kedykoľvek v priebehu dňa uľavte stuhnutým svalom drieku preklápaním panve. Rozsah pohybu vykonávaje len taký, ako je vám komfortný a nespôsobuje viac bolesti.\n ➜ OPAKOVANIA: Zopakujte 15x kedykoľvek v priebehu dňa. ',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        }
      ]
    },
    {
      title: '4-6 týždeň',
      description: 'Cvičenia zamerané na posilnenie sedacích svalov a adaptáciu na záťaž.',
      videos: [
        {
          videoId: 'Xp33YgPZgns',
          title:'Mostík',
          description: 'Ľahnite si na chrbát a uložte pokrčené nohy na šírku ramien.\n ➜ Ruky uložte pozdĺž tela. \n ➜ Zaprite sa chodidlami do podložky a zdvihnite zadok nad podložku, do výšky kedy vyrovnáte chrbát \n ➜ Následne pomaly spustite zadok tesne nad podložku a zopakujte znovu \n ➜ OPAKOVANIA: 8-12x /4 série / 1x denne',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'Drepy do 90 stupňov',
          description: 'Postavte sa s nohami na na šírku ramien. \n ➜ Drep vykonávajte max. do 90 stupňov ohnutia kolien a bez prehýbania sa v chrtbte. \n ➜ OPAKOVANIA: 10x /3 série / 1x denne',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        } 
      ]
    }
  ],
  

  // NEUROPAHIC - Radiculopathy✅
  //NECK ✅
  'neuropathic-Radiculopathy-neck': [
    {
      title: '0-2 týždne',
      description: 'Cvičenia na zníženie neurologických symptómov a redukciu tlaku na koreň nervu.',
      videos: [
        {
          videoId: 'oFQwLC6iea4',
          title: 'Tenzná neurodynamika',
          description: "Postup:\nPosaďte sa a uvoľnite trapézy\n ➜ upažte ruku s dlaňou smerujúcou hore\n ➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami a odtiahnutím hlavy od ruky. \n Vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov pohyb zopakujte\nOPAKOVANIA: zopakujte 10-15 x /5x denne.\n ➜ UPOZORNENIE: Odťahovanie hlavy robte iba po bolesť. Keď pocítite silný ťah v ruke alebo bolesť, hneď sa vráťte s hlavou aj rukou do neutrálnej polohy!",
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
        },
        {
          videoId: 'eL5KxSe3c1g',
          title: 'McKenzie záklony krčnej chrbtice',
          description: 'Postup:\n➜ posaďte sa a uvoľnite trapézy\n➜ vtiahnite bradu dnu (zásuvka), ale nezdvíhajte pri tom plecia, ani hlavu nepredkláňajte\n➜ zakloňte hlavu do rozsahu, ktorý je vám komfortný a nespôsobuje veľa bolesti\n➜ v záklone urobte krátke rotácie hlavy do oboch strán\n➜ OPAKOVANIA: záklon opakujte 5-10x za sebou s 3-5 rotáciami do každej strany ➜ 5x denne. ',
          importance: 2,
          mainGroup: ["mobility","pain-relief"],
          bodyPart:["neck"],
        }
      ]
    },
    {
      title: '3-5 týždeň',
      description: 'Posilnenie svalov v oblasti krku a medzilopatkového priestoru.',
      videos: [
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'Posiľnenie medzilopatkových svalov',
          description: 'Uchyťte odporovú gumu podľa videa. Tieto 3 cviky môžete striedať, alebo si vybrať ktorýkoľvek z nich. \n➜ UPOZORNENIE: pri týchto cvikoch nesmiete pociťovať namáhanie trapézov! Celý čas sa snažte tlačiť lopatky a ramená smerom dole od uší, aby pracovali medzilopatkové svaly. Dbajte na to, aby ste počas vykonávania cvikov viac cítili svaly medzi lopatkami, nie ramená a trapézy - to dosiahnete práve tlačením pliec dole. \n➜ OPAKOVANIA: 10-15x / 3 série / 1x denne. ',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["neck","middle-back"],
        },
        {
          videoId: 'D46W1uyK6Mg',
          title: 'Posilnenie svalov krku',
          description: 'Posaďte sa a obe ruky uložte za hlavu. Snažte sa mať uvoľnené ramená.\n ➜ Zatlačte hlavou do dlaní a dlaňami do hlavy, tak aby sa napli svaly krku na zadnej časti krčnej chrbtice. Celý čas sa snažte udržiavať hlavu vzpriamenú. \n ➜ OPAKOVANIA: 10sek. tlak / 10sek. pauza / 5x za sebou. Cvik môžete zopakovať 2-3x denne.',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["neck"],
        }
      ]
    }
  ],

  // LUMBAR SPINE ✅
  'neuropathic-Radiculopathy-lower back': [
    {
      title: '0-2 týždeň',
      description: 'Cvičenia zamerané na zníženie neurologických symptómov dolnej končatiny.',
      videos: [
        {
          videoId: 'XP1yzpFR6ho',
          title: 'Proximálna neurodynamika sedacieho nervu',
          description: 'Uložte sa na chrbát a pokrčte nohy. Dolnú končatinu so symptómami zdvihnite a chyťte sa zo zadu pod kolenom. Opatrne pritihnite špičku k sebe a pomaly vystierajte koleno pokým zacítite ťah v nohe, následne sa okamžite vráťte do pôvodnej polohy.\n ➜ UPOZORNENIE: tento cvik môže spôsobiť po docvičení mierne tŕpnutie končatiny, ktoré by malo odísť do minútky - je to vporiadku. Ak by ste mali pocit, že vám symptómy pretvávajú dlhšie, prestaňte s týmto cvikom.\n ➜ OPAKOVANIA: 10-12 opakovaní / 4-5x denne.',
          importance: 1,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'tIZppe-RB0g',
          title: 'McKenzie záklony',
          description: 'Postup:\n➜ uložte sa na brucho s rukami podľa videa\n➜ dlaňami odtlačte trup od podložky do záklonu\n➜ upozornenie: držte zadok uvoľnený, nezatínajte sedacie svaly!\n➜ zakláňajte sa iba do bodu, pokiaľ je pohyb komfortný a nespôsobuje vám viac bolesti\nOPAKOVANIA: 10x / 4-5x denne',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
          bodyPart:["lower-back"],
        },
      ]
    },
    {
      title: '3-5 týždeň',
      description: 'Cvičenia zamerané na zvyšovanie záťaže driekovej chrbtice a sedacích svalov.',
      videos: [
        {
          videoId: 'UaG3eY_wNQg',
          title: 'Masáž sedacích svalov',
          description: 'Zoberte si tenisovú loptičku, uložte si ju na sedacie svaly a oprite sa o ňu o stenu (podľa videa).\n➜ Opatrne sa zaprite do loptičky a v horizontálnych pohyboch masírujte oblasť sedacích svalov tesne pod hranou panve.\n➜ OPAKOVANIA: pár minút denne.',
          importance: 3,
          mainGroup: ["pain-relief"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'Xp33YgPZgns',
          title:'Mostík',
          description: 'Ľahnite si na chrbát a uložte pokrčené nohy na šírku ramien.\n ➜ Ruky uložte pozdĺž tela. \n ➜ Zaprite sa chodidlami do podložky a zdvihnite zadok nad podložku, do výšky kedy vyrovnáte chrbát \n ➜ Následne pomaly spustite zadok tesne nad podložku a zopakujte znovu \n ➜ OPAKOVANIA: 8-12x /4 série / 1x denne',
          importance: 1,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'Drepy do 90 stupňov',
          description: 'Postavte sa s nohami na na šírku ramien. \n ➜ Drep vykonávajte max. do 90 stupňov ohnutia kolien a bez prehýbania sa v chrtbte. \n ➜ OPAKOVANIA: 10x /3 série / 1x denne',
          importance: 2,
          mainGroup: ["stability"],
          bodyPart:["lower-back"],
        }
      ]
    }
  ],

  // Default exercises ✅
  // NECK ✅
  'neuropathic-default-neck': [
    {
      title: 'Základné cvičenia na krčnú chrbticu',
      description: 'Všeobecné cvičenia na mobilizáciu nervových štruktúr v krčnej oblasti.',
      videos: [
        {
          videoId: 'oaB4o_qeMdQ',
          title: 'Zásuvka krku',
          description: 'Posaďte sa a uvoľnite ramená. Uložte si ukazovák jednej ruky na bradu a pomaly zasuňte bradu smerom dnu (podľa videa). Rozsah zásuvky robte iba tak, aby vám bol komfortný, tento cvik by nemal produkovať žiadnu bolesť! Následne bradu opäť vysuňte mierne dopredu. Celý čas sa snažte mať uvoľné plecia, nenapínať ich a hlavu držať v rovine bez pohybov do predklonu alebo záklonu. \n ➜ OPAKOVANIA: 10x / kedykoľvek v priebehu dňa.',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["neck"],
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: "Postup: Posaďte sa a uvoľnite trapézy\n ➜ upažte ruku s dlaňou smerujúcou hore\n ➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n Vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte\nOPAKOVANIA: zopakujte 10-15 x /5x denne",
          importance: 2,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
        },
        {
          videoId: 'PK62xMsZfG0',
          title: 'Modlenie - uvoľnenie krku a lopatiek',
          description: 'Spojte dlane a lakte v 90 stupňovom uhle v lakti a ramenách. So sústavným spojením pomaly zdvíhajte lakte vyššie, ale stále DRŽTE SPOJENÉ lakte aj dlane. UPOZORNENIE: snažte sa, aby vám prsty stále smerovali do stropu. OPAKOVANIA: 20 sekúnd / 2x za sebou / 2x denne.',
          importance: 3,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        }
      ]
    }
  ],

  // MIDDLE BACK ✅
  'neuropathic-default-middle back': [
    {
      title: 'Základné cvičenia na hrudnú chrbticu',
      description: 'Všeobecné cvičenia na hrudnú chrbticu.',
      videos: [
        {
          videoId: 'PK62xMsZfG0',
          title: 'Modlenie - uvoľnenie krku a lopatiek',
          description: 'Spojte dlane a lakte v 90 stupňovom uhle v lakti a ramenách. So sústavným spojením pomaly zdvíhajte lakte vyššie, ale stále DRŽTE SPOJENÉ lakte aj dlane. UPOZORNENIE: snažte sa, aby vám prsty stále smerovali do stropu. OPAKOVANIA: 20 sekúnd / 2x za sebou / 2x denne.',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["middle-back"],
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'Masáž hrudnej chrbtice loptičkou',
          description: 'Uložte si loptičku do medzilopatkového priestoru a vertikálnym pohybom uvoľnite bolestivé a stuhnuté svaly.\n ➜ OPAKOVANIA: kedykoľvek v priebehu dňa.',
          importance: 2,
          mainGroup: ["pain-relief"],
          bodyPart:["middle-back","neck"],
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: "Postup: Posaďte sa a uvoľnite trapézy\n ➜ upažte ruku s dlaňou smerujúcou hore\n ➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n Vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte\nOPAKOVANIA: zopakujte 10-15 x /5x denne",
          importance: 3,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["neck"],
        }
      ]
    }
  ],

  // LOWER BACK ✅
  'neuropathic-default-lower back': [
    {
      title: 'Základné cvičenia na drekovú chrbticu',
      description: 'Základné cvičenia na posilnenie a mobilizáciu driekovej chrbtice',
      videos: [
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\n➜ OPAKOVANIA: 5x denne.',
          importance: 1,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
          videoId: 'L1Mf3NxYwgY',
          title: 'Prelápanie panve',
          description: 'Kedykoľvek v priebehu dňa uľavte stuhnutým svalom drieku preklápaním panve. Rozsah pohybu vykonávaje len taký, ako je vám komfortný a nespôsobuje viac bolesti.\n ➜ OPAKOVANIA: Zopakujte 15x kedykoľvek v priebehu dňa.',
          importance: 2,
          mainGroup: ["mobility"],
          bodyPart:["lower-back"],
        },
        {
         videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: "Postup: Posaďte sa a uvoľnite trapézy\n ➜ upažte ruku s dlaňou smerujúcou hore\n ➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n Vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte\nOPAKOVANIA: zopakujte 10-15 x /5x denne",
          importance: 3,
          mainGroup: ["pain-relief","neuro-mobs"],
          bodyPart:["lower-back"],
        }
      ]
    }
  ]
};
