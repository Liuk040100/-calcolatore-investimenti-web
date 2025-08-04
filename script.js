document.addEventListener('DOMContentLoaded', () => {
    // Elementi del DOM
    const investimentoMensileInput = document.getElementById('investimentoMensile');
    const investimentoSlider = document.getElementById('investimentoSlider');
    const durataAnniInput = document.getElementById('durataAnni');
    const durataSlider = document.getElementById('durataSlider');

    const capitaleInvestitoSpan = document.getElementById('capitaleInvestito');
    const interessiMaturatiSpan = document.getElementById('interessiMaturati');
    const percentualeInteressiSpan = document.getElementById('percentualeInteressi');
    const valoreFinaleSpan = document.getElementById('valoreFinale');
    const testoRiepilogoP = document.getElementById('testoRiepilogo');

    const barraCapitaleDiv = document.getElementById('barraCapitale');
    const barraInteressiDiv = document.getElementById('barraInteressi');

    const TASSO_INTERESSE_ANNUO = 0.06;

    // Funzione per formattare i numeri in valuta EUR
    function formattaValuta(valore) {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(valore);
    }

    // Funzione principale di calcolo e aggiornamento
    function calcolaEAggiorna() {
        const investimentoMensile = parseFloat(investimentoMensileInput.value);
        const anni = parseInt(durataAnniInput.value, 10);

        // Calcoli finanziari
        const mesi = anni * 12;
        const tassoMensile = TASSO_INTERESSE_ANNUO / 12;

        const capitaleInvestito = investimentoMensile * mesi;
        
        // Formula dell'interesse composto per versamenti periodici
        const valoreFinale = investimentoMensile * (((Math.pow(1 + tassoMensile, mesi)) - 1) / tassoMensile);
        
        const interessiMaturati = valoreFinale - capitaleInvestito;

        const percCapitale = (capitaleInvestito / valoreFinale) * 100;
        const percInteressi = (interessiMaturati / valoreFinale) * 100;
        
        const percInteressiSuCapitale = (interessiMaturati / capitaleInvestito) * 100;

        // Aggiornamento del DOM
        capitaleInvestitoSpan.textContent = formattaValuta(capitaleInvestito);
        interessiMaturatiSpan.textContent = formattaValuta(interessiMaturati);
        valoreFinaleSpan.textContent = formattaValuta(valoreFinale);
        
        if (isFinite(percInteressiSuCapitale)) {
            percentualeInteressiSpan.textContent = `+${percInteressiSuCapitale.toFixed(1)}%`;
        } else {
            percentualeInteressiSpan.textContent = '+0.0%';
        }

        testoRiepilogoP.textContent = `Dopo ${anni} anni di investimenti mensili da ${formattaValuta(investimentoMensile)}, il valore totale del tuo portafoglio potrebbe essere:`;

        // Aggiornamento barre di visualizzazione
        barraCapitaleDiv.style.width = `${percCapitale}%`;
        barraInteressiDiv.style.width = `${percInteressi}%`;
    }

    // Sincronizzazione Input e Slider
    investimentoSlider.addEventListener('input', (e) => {
        investimentoMensileInput.value = e.target.value;
        calcolaEAggiorna();
    });

    investimentoMensileInput.addEventListener('input', (e) => {
        investimentoSlider.value = e.target.value;
        calcolaEAggiorna();
    });

    durataSlider.addEventListener('input', (e) => {
        durataAnniInput.value = e.target.value;
        calcolaEAggiorna();
    });

    durataAnniInput.addEventListener('input', (e) => {
        durataSlider.value = e.target.value;
        calcolaEAggiorna();
    });

    // Calcolo iniziale al caricamento della pagina
    calcolaEAggiorna();
});
