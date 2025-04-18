
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">
              Ochrana osobných údajov – Dotazník o bolesti pohybového systému
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-blue max-w-none">
            <p>
              Vaša dôvera a bezpečnosť Vašich údajov sú pre nás kľúčové. Preto by sme Vás radi informovali, ako spracúvame osobné údaje, ktoré nám poskytujete prostredníctvom dotazníka o bolesti pohybového systému.
            </p>
            
            <h3>Aké údaje spracúvame?</h3>
            <p>
              <strong>Emailová adresa:</strong> Ukladáme a spracúvame len Vašu emailovú adresu. Slúži na to, aby sme Vám mohli zaslať výsledky dotazníka, prípadné odporúčania alebo Vás kontaktovať s informáciami o našich službách, ak ste na to udelili súhlas.
            </p>
            <p>
              <strong>Údaje o zdravotnom stave:</strong> Informácie o Vašej bolesti a zdravotnom stave, ktoré uvediete v dotazníku, neukladáme a nespracúvame. Slúžia výhradne na okamžité vyhodnotenie a personalizáciu odporúčaní v reálnom čase. Po ukončení vyhodnotenia tieto údaje nijako ďalej neuchovávame.
            </p>

            <h3>Prečo spracúvame emailovú adresu?</h3>
            <ul>
              <li>Na odoslanie výsledkov vyhodnotenia dotazníka.</li>
              <li>Na prípadné zaslanie dodatočných odporúčaní alebo edukatívneho obsahu.</li>
              <li>Na komunikáciu v súvislosti s ponukou našich služieb, ak ste vyjadrili súhlas so zasielaním marketingových informácií.</li>
            </ul>

            <h3>Ako chránime Vaše údaje?</h3>
            <p>
              Vašu emailovú adresu chránime modernými technickými a organizačnými opatreniami, aby sme zabránili neoprávnenému prístupu, zmene alebo strate údajov.
            </p>

            <h3>Vaše práva:</h3>
            <p>V súlade s GDPR máte právo:</p>
            <ul>
              <li>na prístup k svojim osobným údajom,</li>
              <li>na opravu alebo vymazanie osobných údajov,</li>
              <li>na obmedzenie spracúvania,</li>
              <li>na námietku proti spracúvaniu,</li>
              <li>na prenosnosť údajov,</li>
              <li>na odvolanie súhlasu so spracovaním údajov kedykoľvek.</li>
            </ul>

            <p>
              Pre uplatnenie Vašich práv nás môžete kontaktovať na <a href="mailto:privacy@example.com">privacy@example.com</a>.
            </p>

            <h3>Záver</h3>
            <p>
              Vaše súkromie je pre nás prioritou. Spracovávame len nevyhnutné minimum údajov a zdravotné informácie neukladáme ani nearchivujame.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
