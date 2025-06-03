
import { Question } from '@/utils/types';

export const injuryStartQuestion: Question = {
  id: 'injury-start',
  text: 'Začala sa vaša bolesť po zranení alebo úraze?',
  description: 'Touto otázkou sa snažíme zistiť, či vaša bolesť vznikla priamo pri úraze ako napr. autohavária, pád na schodoch, pád z výšky, silný úder a podobne. Ak vaše bolesti začali pri zohnutí sa - toto NIE JE zranenie alebo úraz pre účel odpovede na túto otázku.',
  type: 'radio',
  options: [
    {
      id: 'yes-injury',
      text: 'Áno',
      mechanisms: ['nociceptive']
    },
    {
      id: 'no-injury',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};

export const activityStartQuestion: Question = {
  id: 'activity-start',
  text: 'Začala sa vaša bolesť po konkrétnej aktivite/pohybe?',
  description: 'Touto otázkou sa snažíme zistiť konkrétny pohyb alebo aktivitu, ktorá je príčinou vzniku vašich bolestí. Na otázku odpovedajte KLADNE, ak sa vaša bolesť začala napr. pri vystieraní sa z predklonu, alebo pri umývaní okien. Na otázku odpovedajte ZÁPORNE, ak si nie ste istý/á. Nesprávne odpovedanie na otázku môže byť aj v tedy, ak sa vaše bolesti zvýrazňujú napr. pri predklone, ale nejde o pohyb, ktorý vám bolesť spôsobil. ', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-activity',
      text: 'Áno',
      mechanisms: ['nociceptive', 'neuropathic']
    },
    {
      id: 'no-activity',
      text: 'Nie',
      mechanisms: ['central']
    }
  ]
};

export const reflexesQuestion: Question = {
  id: 'reflexes',
  text: 'Boli ste informovaný/á lekárom alebo fyzioterapeutom, že máte výrazne znížené alebo chýbajúce reflexy?',
  description: 'Strata alebo výrazné zníženie reflexov nám vedia veľa povedať o vašom stave a jeho príčine. Ak ste navštívili lekára alebo fyzioterapeuta, pravdepodobne ste prešli testom reflexov. V prípade ich zníženia alebo straty, mali by ste byť okamžite upozornený/á. Ak vás zdravotník neupozornil na zemnu reflexov, veľmi pravdepodobne je to preto, že vyšetrenie dopadlo vporiadku - v takom prípade odpovedajte nie. AKO PREBIEHA VYŠETRENIE REFLEXOV? => Zvyčajne ide napr. o poklepkanie kladivkom o šľachu pod kolenom, alebo na achilovej ľache, alebo nad lakťom.', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-reflexes',
      text: 'Áno',
      mechanisms: ['neuropathic']
    },
    {
      id: 'no-reflexes',
      text: 'Nie',
      mechanisms: ['neuropathic']
    },
    {
      id: 'not-visited',
      text: 'Nenavštívil/a som zdravotníckeho pracovníka',
      mechanisms: ['none']
    }
  ]
};

export const sensitivityQuestion: Question = {
  id: 'sensitivity',
  text: 'Máte zvýšenú citlivosť na svetlo, zvuk alebo vône?',
    description: 'Na túto otázku odpovedajte KLADNE iba v prípade, ak sa táto citlivosť objavila od nástupu bolestí alebo v ich priebehu. Na otázku odpovedajte NEGATÍVNE, ak takúto citlivosť nemáte, alebo ste ju mali aj pred nástupom bolestí a nejako výrazne sa nezmenila. PREČO SA PÝTAME? Zvýšená citlivosť na senzorické vnemy môže znamenať precitlivenie nervového systému, čo má vplyv na prežívanie bolesti a taktiež na tvorbu vášho programu.', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-sensitivity',
      text: 'Áno',
      mechanisms: ['central']
    },
    {
      id: 'no-sensitivity',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};

export const variableImpactQuestion: Question = {
  id: 'variable-impact',
  text: 'Je vplyv pohybov/aktivít (rovnakých) na bolesť premenlivý, nepredvídateľný alebo nekonzistentný?',
  description: 'Touto otázkou sa snažíme zistiť vzorec nekonzistentnosti, Odpovedajte KLADNE iba v prípade, ak nedokážete predpokladať nástup vašich bolestí (napr. niekedx bolesť vzniká pri predklone, inokedy nie, ale vzniká pri úplne inom pohybe).', // Add description here later
  type: 'radio',
  options: [
    {
      id: 'yes-variable',
      text: 'Áno',
      mechanisms: ['central']
    },
    {
      id: 'no-variable',
      text: 'Nie',
      mechanisms: ['none']
    }
  ]
};
