
import React from 'react';

export const ImportantNotice = () => {
  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <h3 className="font-semibold text-amber-800 mb-2">Dôležité upozornenie</h3>
      <p className="text-amber-700">
        Tieto cvičenia slúžia len ako všeobecné odporúčania a nenahrádzajú návštevu fyzioterapeuta 
        alebo lekára. Ak počas cvičenia pocítite zvýšenú bolesť, závraty alebo akýkoľvek diskomfort, 
        okamžite cvičenie prerušte a vyhľadajte odbornú pomoc.
      </p>
    </div>
  );
};
