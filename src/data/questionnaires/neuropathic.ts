import { Questionnaire } from '@/utils/types';

export const neuropathicQuestionnaire: Questionnaire = {
  id: 'neuropathic',
  title: 'Hodnotenie neuropatickej bolesti',
  description: 'Tento dotazník nám pomôže lepšie pochopiť vaše príznaky súvisiace s nervovou bolesťou.',
  questions: [
    {
      id: 'coughing-pain',
      text: 'Zhoršuje sa vaša bolesť pri kašeľaní, kýchaní alebo napínaní sa?',
      description: 'Touto otázkou sa snažíme zistiť priamy súvis medzi bolesťou a kýchaním, kašľaním alebo napínaním sa. Ak máte pocit, že niektorá z menovaných činností vám prudko zhorší symptómy, odpovedajte KLADNE.',
      type: 'radio',
      options: [
        {
          id: 'yes-coughing',
          text: 'Áno, moja bolesť sa pri týchto aktivitách zvyšuje.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-coughing',
          text: 'Nie'
        }
      ]
    },
    {
      id: 'abnormal-sensations',
      text: 'Cítite nezvyčajné pocity ako mravčenie, pálenie alebo "elektrické šoky" pozdĺž postihnutej končatiny?',
      description: 'Touto otázkou sa snažíme zistiť, či aj vy prežívate silné elektrizujúce ostré bolesti v presne špecifikovanom mieste. Na otázku odpovedajte KLADNE, ak by ste vedeli presne ukázať, alebo nakresliť kadiaľ vám bolesť prejde. Odpovedajte ZÁPORNE, ak máte pocit, že bolesť alebo symptómy sú viac difúzne (rozptýlené), široké a ťažko lokalizovateľné.',
      type: 'radio',
      options: [
        {
          id: 'yes-sensations',
          text: 'Áno, pociťujem mravčenie, pálenie alebo pocity podobné elektrickým šokom pozdĺž špecifickej dráhy v končatine.',
          differentials: ['Radicular Pain']
        },
        {
          id: 'no-sensations',
          text: 'Nie',
          differentials: ['Radiculopathy']
        }
      ]
    },
    {
      id: 'numbness',
      text: 'Pociťujete znecitlivenie, zníženú citlivosť alebo oťažievanie v konkrétnej oblasti končatiny?',
      description: 'Ak sú vaše symptómy podobné mravenčeniu, tŕpnutiu alebo máte pocit že vaša končatina je nezvyčajne ťažká, odpovedajte KLADNE.',
      type: 'radio',
      options: [
        {
          id: 'yes-numbness',
          text: 'Áno, cítim znecitlivenie alebo nedostatok citlivosti v špecifickej oblasti končatiny.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-numbness',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'muscle-weakness',
      text: 'Všimli ste si svalovú slabosť v postihnutej končatine, ktorá sťažuje uchopenie predmetov, zdvihnutie nohy alebo normálny pohyb?',
      description: 'Máte pocit, že vaša končatina oslabla, nedokážete vykonávať aktivity v rovnakej intezite alebo vám končatina oťažieva? Ak áno, odpovedajte KLADNE.',
      type: 'radio',
      options: [
        {
          id: 'yes-weakness',
          text: 'Áno, mám svalovú slabosť, ktorá ovplyvňuje moju schopnosť hýbať sa alebo používať končatinu správne.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-weakness',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'reflex-loss',
      text: 'Stratili ste reflexy v postihnutej končatine, ktorých stratu vám potvrdil zdravotnícky pracovník?',
      description: 'Strata alebo výrazné zníženie reflexov nám vedia veľa povedať o vašom stave a jeho príčine. Ak ste navštívili lekára alebo fyzioterapeuta, pravdepodobne ste prešli testom reflexov. V prípade ich zníženia alebo straty, mali by ste byť okamžite upozornený/á. AKO PREBIEHA VYŠETRENIE REFLEXOV? => Zvyčajne ide napr. o poklepkanie kladivkom o šľachu pod kolenom, alebo na achilovej ľache, alebo nad lakťom.',
      type: 'radio',
      options: [
        {
          id: 'yes-reflex-loss',
          text: 'Áno, zdravotnícky pracovník potvrdil znížené alebo chýbajúce reflexy.',
          differentials: ['Radiculopathy']
        },
        {
          id: 'no-reflex-loss',
          text: 'Nie',
          differentials: ['Radicular Pain']
        }
      ]
    },
    {
      id: 'spine-abnormality-neuro',
      text: 'Všimli ste si nejakú priehlbinu v chrbtici alebo vystupujúci stavec?',
      description: 'Ak si nie ste istý/á, požiadajte rodinného príslušníka o pomoc -> TEST č.1 = Ľahnite si na brucho na tvrdú zem a vyhrnutým tričkom aby bolo vidno krížovú oblasť chrbtice, s rukami vedľa seba a čelom opretým o zem. Požiadajte blízku osobu, aby sledovala váš chrbát, či v driekovej oblasti nevznikla výtazná priehlbina v jednom malom bode priamo v chrbtici. Ak áno, odpovedajte KLADNE. TEST č.2 = Postavte sa vzpriamene, vyhrňte si tričko a požiadajte blízku osobu, aby sledovala tvar vašej chrbtice v krížovej oblasti. Ak spozorujete vystupujúci stavec oproti ostatným, odpovedajte KLADNE.',
      type: 'radio',
      options: [
        {
          id: 'hole-neuro',
          text: 'Áno, spozoroval/a som priehlbinu v chrbte',
          differentials: ['ventral spondylolisthesis'],
          followUp: [
            {
              id: 'lying-helps-neuro',
              text: 'Máte pocit, že ľah na chrbte zmierňuje vaše príznaky?',
              description: 'Overte si, či vám ľah na chrbte dopraje úľavu. Uložte sa na chrbát, pokrčte kolená a zrelaxujte. Počkajte aj 2 minúty a sledujte vývoj symptómov, potom odpovedajte na otázku.',
              type: 'radio',
              options: [
                {
                  id: 'yes-lying-neuro',
                  text: 'Áno',
                  differentials: ['ventral spondylolisthesis']
                },
                {
                  id: 'no-lying-neuro',
                  text: 'Nie',
                  differentials: ['none']
                }
              ]
            }
          ]
        },
        {
          id: 'sticking-out-neuro',
          text: 'Áno, zdá sa, že môj stavec mierne vystupuje',
          differentials: ['dorsal spondylolisthesis']
        },
        {
          id: 'no-abnormality-neuro',
          text: 'Nie',
          differentials: ['none']
        }
      ]
    }
  ]
};
