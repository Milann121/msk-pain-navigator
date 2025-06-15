
import { Exercise } from "@/types/exercise";

export const nociceptiveExercises: Record<string, Exercise[]> = {
  // Disc Herniation ✅
  // NECK ✅
  'nociceptive-disc herniation-neck': [
    {
      title: 'Program 0-3 týždeň',
      description: 'Cvičenia na redukciu bolesti, ktoré pomáhajú stabilizovať krčnú chrbticu a znížiť tlak na medzistavcové platničky.',
      videos: [
        {
          videoId: 'eL5KxSe3c1g',
          title: 'McKenzie záklony krčnej chrbtice',
          description: 'Postup:\n➜ posaďte sa a uvoľnite trapézy\n➜ vtiahnite bradu dnu (zásuvka), ale nezdvíhajte pri tom plecia, ani hlavu nepredkláňajte\n➜ zakloňte hlavu do rozsahu, ktorý je vám komfortný a nespôsobuje veľa bolesti\n➜ v záklone urobte krátke rotácie hlavy do oboch strán\n➜ OPAKOVANIA: záklon opakujte 5-10x za sebou s 3-5 rotáciami do každej strany ➜ 5x denne. ',
          importance: 3,
          mainGroup: ["mobility", "pain relief"],
        },
        {
          videoId: '7WAoHWIxgEI',
          title: 'Neurodynamika horných končatín',
          description: "Postup:\nPosaďte sa a uvoľnite trapézy\n ➜ upažte ruku s dlaňou smerujúcou hore\n ➜ ohnite dlaň do polohy od seba, spolu s vystretými prstami\n Vráťte dlaň naspäť a pokrčte lakeť do 90 stupňov\n ➜ pohyb zopakujte\nOPAKOVANIA: zopakujte 10-15 x /5x denne",
          importance: 2,
          mainGroup: ["pain-relief", "neuro-mobs"],
        },
        {
          videoId: '844ILxo5xsA',
          title: 'Masáž loptičkou o stenu',
          description: 'Na tento cvik použite ideálne tenisovú loptičku. Položte si loptičku na trapéz, oprite sa o stenu a masírujte svaly šije ako na videu. V prípade, že nájdete bolestivé miesta, môžete staticky zatlačiť po dobu 20-30 sekúnd. Premasírujte celú oblasť trapézov a medzilopatkového priestoru.',
          importance: 1,
          mainGroup: ["pain-relief"],
        }
      ]
    },
    {
      title: 'Program 4-6 týždeň',
      description: 'Prejdite do pokročilejšieho programu na uvoľnenie krčnej chrbtice a zredukujte tlak na vaše platničky',
      videos: [
        {
          videoId: 'PK62xMsZfG0',
          title: 'Modlenie - uvoľnenie krku a lopatiek',
          description: 'Spojte dlane a lakte v 90 stupňovom uhle v lakti a ramenách. So sústavným spojením pomaly zdvíhajte lakte vyššie, ale stále DRŽTE SPOJENÉ lakte aj dlane. UPOZORNENIE: snažte sa, aby vám prsty stále smerovali do stropu. OPAKOVANIA: 20 sekúnd / 2x za sebou / 2x denne.',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
        },
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'Posiľnenie medzilopatkových svalov',
          description: 'Uchyťte odporovú gumu podľa videa. Tieto 3 cviky môžete striedať, alebo si vybrať ktorýkoľvek z nich. \n➜ UPOZORNENIE: pri týchto cvikoch nesmiete pociťovať namáhanie trapézov! Celý čas sa snažte tlačiť lopatky a ramená smerom dole od uší, aby pracovali medzilopatkové svaly. Dbajte na to, aby ste počas vykonávania cvikov viac cítili svaly medzi lopatkami, nie ramená a trapézy - to dosiahnete práve tlačením pliec dole. \n➜ OPAKOVANIA: 10-15x / 3 série / 1x denne. ',
          importance: 2,
          mainGroup: ["stability"],
          
        }
      ]
    }
  ],

  // LUMBAR SPINE ✅
  'nociceptive-disc herniation-lower back': [
    {
      title: 'Pogram cvičení 0-3 týždeň',
      description: 'Základné cvičenia pri pravdepodobnom poškodení platničiek s cieľom redukovať bolesť a zabrániť ďaľšiemu poškodeniu.',
      videos: [
        {
          videoId: 'tIZppe-RB0g',
          title: 'McKenzie záklony',
          description: 'Postup:\n➜ uložte sa na brucho s rukami podľa videa\n➜ dlaňami odtlačte trup od podložky do záklonu\n➜ upozornenie: držte zadok uvoľnený, nezatínajte sedacie svaly!\n➜ zakláňajte sa iba do bodu, pokiaľ je pohyb komfortný a nespôsobuje vám viac bolesti\nOPAKOVANIA: 10x / 4-5x denne',
          importance: 1,
          mainGroup: ["mobility", "pain-relief"],
        },
        {
          videoId: '3A27NLPe2bs',
          title: 'Neurodynamika sedacieho nervu',
          description: 'Popis vo videu.\n ➜ OPAKOVANIA: 15x / 3-5x denne\n ➜ UPOZORNENIE: ihneď po cvičení môžete pociťovať mierne trnutie nohy. Malo by prejsť do pól minúty, v opačnom prípade znížte počet opakovaní alebo cvik vynechajte.',
          importance: 2,
          mainGroup: ["pain-relief", "neuro-mobs"],
        },
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\nOPAKOVANIA: 5x denne.',
          importance: 3
        }
      ]
    },
    {
      title: 'Program cvičení 4-6 týždeň',
      description: 'Pokročilé cvičenia na posilnenie krčnej chrbtice a prevenciu ďaľšieho poškodenia vašich platiničiek.',
      videos: [
        {
          videoId: 'Xp33YgPZgns',
          title:'Mostík',
          description: 'Ľahnite si na chrbát a uložte pokrčené nohy na šírku ramien.\n ➜ Ruky uložte pozdĺž tela. \n ➜ Zaprite sa chodidlami do podložky a zdvihnite zadok nad podložku, do výšky kedy vyrovnáte chrbát \n ➜ Následne pomaly spustite zadok tesne nad podložku a zopakujte znovu \n ➜ OPAKOVANIA: 8-12x /4 série / 1x denne',
          importance: 1
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'Drepy do 90 stupňov',
          description: 'Postavte sa s nohami na na šírku ramien. \n ➜ Drep vykonávajte max. do 90 stupňov ohnutia kolien a bez prehýbania sa v chrtbte. \n ➜ OPAKOVANIA: 10x /3 série / 1x denne',
          importance: 2
        }
      ]
    }
  ],

  // Facet Joint Syndrome ✅
  // NECK ✅
  'nociceptive-facet joint syndrome-neck': [
    {
      title: '0-2 týždeň',
      description: 'Cviky na zvýšenie rozsahu pohybu v krku a zníženie bolesti.',
      videos: [
        {
          videoId: 'JJq8u5IGDb8',
          title: 'Rotácia krčnej chrbtice s opaskom',
          description: 'Tento cvik vám pomôže zvýšiť rozsah pohybu do rotácie. \n ➜ Uchopte uterák podľa videa - horná ruka určuje smer, do ktorého budete hlavu otáčať, spodná fixuje. Spodnou rukou zatiahnite smerom dole a udržujte ťah a súčasne hornou rukou zatiahnite smerom dopredu a hore s udržaním ťahu. Následne vykonajte rotáciu do smeru na strane hornej končatiny so sústavným ťahom oboch rúk. \n ➜ Počas tohoto cviku by ste mali pociťovať zvýšený rozsah pohybu a menej bolesti pri rotácii hlavy. \n ➜ OPAKOVANIA: 6x rotácia do jednej strany / kdykoľvek v priebehu dňa.',
          importance: 3
        },
        {
          videoId: '844ILxo5xsA',
          title: 'Masáž trapézov o stenu',
          description: 'Na tento cvik použite ideálne tenisovú loptičku. Položte si loptičku na trapéz, oprite sa o stenu a masírujte svaly šije ako na videu. V prípade, že nájdete bolestivé miesta, môžete staticky zatlačiť po dobu 20-30 sekúnd. Premasírujte celú oblasť trapézov a medzilopatkového priestoru.',
          importance: 1
        },
        {
          videoId: 'L94T55NiI34',
          title: 'Masáž hornej krčnej chrbtice',
          description: 'Posaďte sa a nahmatajte si hranu lebky za a mierne pod uchom.\n ➜ Zatlačte palcami pod lebku a krúživými pohybmi masírujte záhlavie. Vždy keď sa po zakrúžení vrátite na hranu lebky, zatlačte do kosti a postupujte až ku stredu chrbtice. \n ➜ UPOZORNENIE: Tento cvik môže byť mierne bolestivý, preto je vhodné sedieť! Bolesť sa pri zatlačení môže šíriť do hlavy alebo za oko. \n ➜ Zopakujte podľa pocitu a potreby kedykoľvek v priebehu dňa, najmä ak pociťujete stuhnutie a bolesti hlavy a krku.',
          importance: 2
        },
      ],
    },
    {
      title: '3-5 týždeň',
      description: "Cviky na posilnenie medzilopatkového priestoru a krku + dôraz na prevenciu.",
      videos: [
        {
          videoId: 'oVJqu0FEw',
          title: 'Posiľnenie medzilopatkových svalov',
          description: 'Uchyťte odporovú gumu podľa videa. Tieto 3 cviky môžete striedať, alebo si vybrať ktorýkoľvek z nich. \n➜ UPOZORNENIE: pri týchto cvikoch nesmiete pociťovať namáhanie trapézov! Celý čas sa snažte tlačiť lopatky a ramená smerom dole od uší, aby pracovali medzilopatkové svaly. Dbajte na to, aby ste počas vykonávania cvikov viac cítili svaly medzi lopatkami, nie ramená a trapézy - to dosiahnete práve tlačením pliec dole. \n➜ OPAKOVANIA: 10-15x / 3 série / 1x denne.',
          importance: 1
        },
        {
          videoId: 'D46W1uyK6Mg',
          title: 'Posilnenie svalov krku',
          description: 'Posaďte sa a obe ruky uložte za hlavu. Snažte sa mať uvoľnené ramená.\n ➜ Zatlačte hlavou do dlaní a dlaňami do hlavy, tak aby sa napli svaly krku na zadnej časti krčnej chrbtice. Celý čas sa snažte udržiavať hlavu vzpriamenú. \n ➜ OPAKOVANIA: 10sek. tlak / 10sek. pauza / 5x za sebou. Cvik môžete zopakovať 2-3x denne.',
          importance: 2
        },
      ]
    }
  ],
  
  // MIDDLE BACK ✅
  'nociceptive-facet joint syndrome-middle back': [
    {
      title: '0-2 týždeň',
      description: 'Jemné rotačné pohyby pre zlepšenie mobility v hrudnej oblasti a redukciu bolesti.',
      videos: [
        {
          videoId: 'oAxVF_ktAi0',
          title: 'Rotácia hrudníku so záklonom',
          description: 'Posaďte sa a ruky uložte za hlavu.\n ➜ Pomaly sa vytočte v hrudnej chrbtici do strany do rozsahu, ktorý je vám komfortný. V tejto polohe sa zastavte a mierne zakloňte. Následne sa vráťte naspäť a zopakujte cvik do opačnej strany.\n ➜ OPAKOVANIA: zopakujte 5-8x do každej strany, kedykoľvek v priebehu dňa.',
          importance: 2
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'Masáž hrudnej chrbtice loptičkou',
          description: 'Uložte si loptičku do medzilopatkového priestoru a vertikálnym pohybom uvoľnite bolestivé a stuhnuté svaly.\n ➜ OPAKOVANIA: kedykoľvek v priebehu dňa.',
          importance: 1
        },
      ],
    },
    {
      title: '3-5 týždeň',
      description: 'Jemné rotačné pohyby pre zlepšenie mobility v hrudnej oblasti a redukciu bolesti.',
      videos: [
        {
          videoId: 'oVJqu0FEw-Y',
          title: 'Posiľnenie medzilopatkových svalov',
          description: 'Uchyťte odporovú gumu podľa videa. Tieto 3 cviky môžete striedať, alebo si vybrať ktorýkoľvek z nich. \n➜ UPOZORNENIE: pri týchto cvikoch nesmiete pociťovať namáhanie trapézov! Celý čas sa snažte tlačiť lopatky a ramená smerom dole od uší, aby pracovali medzilopatkové svaly. Dbajte na to, aby ste počas vykonávania cvikov viac cítili svaly medzi lopatkami, nie ramená a trapézy - to dosiahnete práve tlačením pliec dole. \n➜ OPAKOVANIA: 10-15x / 3 série / 1x denne.',
          importance: 2
        },
        {
          videoId: 'rhPOJA3S-IQ',
          title: 'Záklon hrudnej chrbtice',
          description: 'Zaprite dlane o stenu, odstúpte od nej aby ste boli v miernom predklone a s výdychom uvoľnite trup do záklonu. Snažte sa mať celý čas zrelaxované ramená, hlavu v predĺžení chrbtice a v polohe záklonu sa 1-2x nadýchnite.\n➜ OPAKOVANIA: Záklon zopakujte 3-4x, kedykoľvek v priebehu dňa. ',
          importance: 3
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'Otváranie knihy',
          description: 'Týmto cvikom zvýšite mobilitu hrudníka.\n ➜ Uložte sa na bok, pokrčte nohy a spojte dlane pred seba. Spolu s končatinou uloženou na vrchu sa za výdychu vyrotujte do opačnej strany. Hlava by mala celý čas nasledovať ruku. V tejto polohe zotrvajte 3 sekundy.\n ➜ OPAKOVANIA: 5x do každej strany, kedykoľvek v priebehu dňa.',
          importance: 1
        }
      ]  
    }
  ],
    
  // LOWER BACK ✅
  'nociceptive-facet joint syndrome-lower back': [
    {
      title: '0-3 týždeň',
      description: 'Uvoľnenie svalov drieku a zvýšenie mobility',
      videos: [
        {
          videoId: 'L1Mf3NxYwgY',
          title: 'Prelápanie panve',
          description: 'Kedykoľvek v priebehu dňa uľavte stuhnutým svalom drieku preklápaním panve. Rozsah pohybu vykonávaje len taký, ako je vám komfortný a nespôsobuje viac bolesti.\n ➜ OPAKOVANIA: Zopakujte 15x kedykoľvek v priebehu dňa. ',
          importance: 1
        },
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\nOPAKOVANIA: 5x denne.',
          importance: 2
        },
        {
          videoId: 'XspRg50nn30',
          title: 'Strečing chrbtového svalstva',
          description: 'Posaďte sa a uložte bradu na hrudnú kosť. Pomaly sa zaguľatením chrbta predklote a stále udržujte bradu na hrudnej kosti. V úplnom predklone sa 2-3x nadýchnite do brucha a následne sa pomaly vystrite. Ako posledný pohyb bude vystretie hlavy do neutrálnej polohy.\n ➜ UPOZORNENIE: Pri tomto cviku sa vám po vystretí z predklonu môže zatočiť hlava. Vždy majte otvorené oči a nevstavajte hneď to sedu. \n ➜ OPAKOVANIA: 2x za sebou, kedykoľvek v priebehu dňa.',
          importance: 3
        },
      ],
    },
    {  
      title: '4-6 týždeň',
      description: 'Posilnite oblasť sedacích svalov a predídite preťaženiu drieku.',
      videos: [
        {
          videoId: 'Xp33YgPZgns',
          title:'Mostík',
          description: 'Ľahnite si na chrbát a uložte pokrčené nohy na šírku ramien.\n ➜ Ruky uložte pozdĺž tela. \n ➜ Zaprite sa chodidlami do podložky a zdvihnite zadok nad podložku, do výšky kedy vyrovnáte chrbát \n ➜ Následne pomaly spustite zadok tesne nad podložku a zopakujte znovu \n ➜ OPAKOVANIA: 8-12x /4 série / 1x denne',
          importance: 1
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'Drepy do 90 stupňov',
          description: 'Postavte sa s nohami na na šírku ramien. \n ➜ Drep vykonávajte max. do 90 stupňov ohnutia kolien a bez prehýbania sa v chrtbte. \n ➜ OPAKOVANIA: 10x /3 série / 1x denne',
          importance: 2
        }
      ]
    }
  ],

  // Nociceptive - SIJ Syndrome ✅
  'nociceptive-SIJ syndrome-lower back': [
    {
      title: '0-2 týždeň',
      description: 'Stabilizačné cvičenia pre SI kĺb.',
      videos: [
        {
          videoId: 'Wan8QnjTmiQ',
          title: 'Mobilizácia SI kĺbu',
          description: 'Uložte sa na štyri končatiny s kolenami na šírku ramien a chodilami smerujúcimi k sebe.\n ➜ Pomaly si sadajte na päty a počas pohybu zaoblujte chrbát s hlavou sklopenou dole. Pohyb vykonávajte s výdychom a v polohe sed na pätách zrelaxujte pár sekúnd.\n ➜ OPAKOVANIA: 5x za sebou, kedykoľvek v priebehu dňa.',
          importance: 1
        },
        {
          videoId: 'dVjfUlXK93k',
          title:'Drepy do 90 stupňov',
          description: 'Postavte sa s nohami na na šírku ramien. \n ➜ Drep vykonávajte max. do 90 stupňov ohnutia kolien a bez prehýbania sa v chrtbte.\n ➜ OPAKOVANIA: 10x /3 série / 1x denne',
          importance: 2
        }
      ],
    },
    {
      title: '3-6 týždeň',
      description: 'Posilnenie svalov zadku a chrbta.',
      videos: [
        {
          videoId: 'BnWLb1h6kfQ',
          title: 'Posiľňovanie sedacích svalov.',
          description: 'Zvoľte jeden alebo viac cvikov z videa na posilnenie sedacích svalov. Dávajte pozor, aby ste sa neprehýbali v driekovej chrbtici a aby ste počas cvičenia cítili prácu sedacích svalov a hamstringov.\n ➜ OPAKOVANIA: 8-10x / 2-3 série / 1x denne',
          importance: 1
        },
      ]
    }
  ],

  // DEFAULT exercises ✅
  // NECK ✅
  'nociceptive-default-neck': [
    {
      title: 'Základné cvičenia pre krčnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu krčnej chrbtice.',
      videos: [
        {
          videoId: '844ILxo5xsA',
          title: 'Masáž loptičkou o stenu',
          description: 'Na tento cvik použite ideálne tenisovú loptičku. Položte si loptičku na trapéz, oprite sa o stenu a masírujte svaly šije ako na videu. V prípade, že nájdete bolestivé miesta, môžete staticky zatlačiť po dobu 20-30 sekúnd. Premasírujte celú oblasť trapézov a medzilopatkového priestoru.',
          importance: 1
        },
        {
          videoId: 'PK62xMsZfG0',
          title: 'Modlenie - uvoľnenie krku a lopatiek',
          description: 'Spojte dlane a lakte v 90 stupňovom uhle v lakti a ramenách. So sústavným spojením pomaly zdvíhajte lakte vyššie, ale stále DRŽTE SPOJENÉ lakte aj dlane. UPOZORNENIE: snažte sa, aby vám prsty stále smerovali do stropu. OPAKOVANIA: 20 sekúnd / 2x za sebou / 2x denne.',
          importance: 2
        },
        {
          videoId: 'L94T55NiI34',
          title: 'Masáž hornej krčnej chrbtice',
          description: 'Posaďte sa a nahmatajte si hranu lebky za a mierne pod uchom.\n ➜ Zatlačte palcami pod lebku a krúživými pohybmi masírujte záhlavie. Vždy keď sa po zakrúžení vrátite na hranu lebky, zatlačte do kosti a postupujte až ku stredu chrbtice. \n ➜ UPOZORNENIE: Tento cvik môže byť mierne bolestivý, preto je vhodné sedieť! Bolesť sa pri zatlačení môže šíriť do hlavy alebo za oko. \n ➜ Zopakujte podľa pocitu a potreby kedykoľvek v priebehu dňa, najmä ak pociťujete stuhnutie a bolesti hlavy a krku.',
          importance: 3
        }
      ]
    }
  ],
  
  //MIDDLE BACK ✅
  'nociceptive-default-middle back': [
    {
      title: 'Základné cvičenia na hrudnú chrbticu',
      description: 'Všeobecné cvičenia na posilnenie a mobilizáciu hrudnej chrbtice.',
      videos: [
        {
          videoId: 'PK62xMsZfG0',
          title: 'Modlenie - uvoľnenie krku a lopatiek',
          description: 'Spojte dlane a lakte v 90 stupňovom uhle v lakti a ramenách. So sústavným spojením pomaly zdvíhajte lakte vyššie, ale stále DRŽTE SPOJENÉ lakte aj dlane. UPOZORNENIE: snažte sa, aby vám prsty stále smerovali do stropu. OPAKOVANIA: 20 sekúnd / 2x za sebou / 2x denne.',
          importance: 1
        },
        {
          videoId: 'dxzegzGNdaU',
          title: 'Masáž hrudnej chrbtice loptičkou',
          description: 'Uložte si loptičku do medzilopatkového priestoru a vertikálnym pohybom uvoľnite bolestivé a stuhnuté svaly.\n ➜ OPAKOVANIA: kedykoľvek v priebehu dňa.',
          importance: 2
        },
        {
          videoId: 'OKsRn5e2VJY',
          title: 'Otváranie knihy',
          description: 'Týmto cvikom zvýšite mobilitu hrudníka.\n ➜ Uložte sa na bok, pokrčte nohy a spojte dlane pred seba. Spolu s končatinou uloženou na vrchu sa za výdychu vyrotujte do opačnej strany. Hlava by mala celý čas nasledovať ruku. V tejto polohe zotrvajte 3 sekundy.\n ➜ OPAKOVANIA: 5x do každej strany, kedykoľvek v priebehu dňa.',
          importance: 3
        }
      ]
    }
  ],

  //LOWER BACK ✅
  'nociceptive-default-lower back': [
    {
      title: 'Základné cvičenia na drekovú chrbticu',
      description: 'Základné cvičenia na posilnenie a mobilizáciu driekovej chrbtice',
      videos: [
        {
          videoId: 'PMJsVceAnnY',
          title:'Strečing sedacích svalov.',
          description: 'Popis vo videu.\n➜ OPAKOVANIA: 5x denne.',
          importance: 1
        },
        {
          videoId: 'L1Mf3NxYwgY',
          title: 'Prelápanie panve',
          description: 'Kedykoľvek v priebehu dňa uľavte stuhnutým svalom drieku preklápaním panve. Rozsah pohybu vykonávaje len taký, ako je vám komfortný a nespôsobuje viac bolesti.\n ➜ OPAKOVANIA: Zopakujte 15x kedykoľvek v priebehu dňa. ',
          importance: 2
        },
        {
          videoId: 'Xp33YgPZgns',
          title:'Mostík',
          description: 'Ľahnite si na chrbát a uložte pokrčené nohy na šírku ramien.\n ➜ Ruky uložte pozdĺž tela. \n ➜ Zaprite sa chodidlami do podložky a zdvihnite zadok nad podložku, do výšky kedy vyrovnáte chrbát \n ➜ Následne pomaly spustite zadok tesne nad podložku a zopakujte znovu \n ➜ OPAKOVANIA: 8-12x /4 série / 1x denne',
          importance: 3
        }
      ]
    }
  ],
};
