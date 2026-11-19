import TeamSportPage from '../components/site/TeamSportPage'
import { HOCKEY_LANGUAGES } from '../components/site/teamSportUi'
import { hockeyMedia } from './EishockeyPage'

/* /hockey-su-ghiaccio/ — /eishockey/ in Italian (2026-11-18), for clubs in
 * Ticino. Same claims as the German page, sentence by sentence; nothing
 * added. Formal Lei (Suo, Le). Photos come from EishockeyPage; the screens
 * are the Italian app (public/eishockey/it/, 2026-11-19), captured like the
 * French ones (see HockeySurGlacePage.jsx): fictional demo names set in
 * Italian, calendar subscription block hidden. */
const I = '/eishockey/it'
const m = hockeyMedia.jobs.map((j, i) => ({
  ...j,
  screen: `${I}/${['board', 'assistant', 'club', 'season', 'vbt', 'injury'][i]}.webp`,
}))

const HOCKEY_IT = {
  slug: 'hockey-su-ghiaccio',
  lang: 'it',
  assets: 'eishockey',
  languages: HOCKEY_LANGUAGES,
  head: {
    title: 'Software di preparazione atletica per l’hockey su ghiaccio professionistico | Prometheus',
    description: 'Test, sala pesi, forza esplosiva, pianificazione attorno alle partite e ritorno al gioco per tutta la rosa, in un unico sistema. Software di Zurigo, dati a Zurigo.',
    ogDescription: 'Software di preparazione atletica per l’hockey su ghiaccio professionistico. Un unico sistema per tutto lo staff, dati a Zurigo.',
    ogImage: 'https://prometheus.coach/eishockey/og-it.jpg',
  },
  hero: {
    eyebrow: 'Software di preparazione atletica per l’hockey professionistico',
    lead: 'Test, sala pesi, forza esplosiva, pianificazione attorno alle partite e ritorno al gioco per tutta la rosa, in un unico posto. Software di Zurigo, i dati a Zurigo.',
    position: 'object-[30%_center]',
  },
  pain: 'I test in Excel. Gli orari del ghiaccio in un calendario, la sala pesi su carta. Gli infortuni nel quaderno del fisioterapista. I messaggi in cinque gruppi WhatsApp.',
  jobs: [
    {
      ...m[0],
      eyebrow: 'Uno staff, una piattaforma',
      title: 'Allenatore capo, preparazione atletica e fisioterapia.',
      accent: 'Tutti vedono lo stesso quadro.',
      alt: 'Board della squadra: ogni giocatore con prontezza, carico e disponibilità, i casi critici per primi',
      text: [
        'Al mattino un unico quadro di tutta la rosa: prontezza, carico e disponibilità di ogni giocatore su una riga, i casi critici per primi. Ghiaccio e sala pesi nello stesso calcolo.',
        'I giocatori si registrano nell’app prima dell’allenamento. Niente da ricopiare, nessun giro di domande nello spogliatoio.',
      ],
    },
    {
      ...m[1],
      eyebrow: 'Assistente IA',
      title: 'L’assistente si occupa della pianificazione.',
      accent: 'A decidere è lo staff.',
      alt: 'Assistente di squadra nel piano settimanale: nomina i giocatori stanchi, esclude automaticamente gli infortunati, chiede delle sedute di riabilitazione e mette otto bozze sul board',
      text: [
        'Basta una frase: «Pianifica questa settimana attorno alle partite, portieri a parte.» In pochi secondi la settimana è nel piano come bozza, per attaccanti, difensori e portieri, in percentuale del massimale, con i chili calcolati per ogni giocatore.',
        'L’assistente conosce la rosa, il board, le partite e i Suoi moduli di allenamento. Esclude da solo gli infortunati, nomina i giocatori stanchi e chiede prima di creare sedute di riabilitazione.',
        'Risponde anche alle domande del mattino: chi oggi non dovrebbe sollevare carichi pesanti, e perché? A chi manca ancora un massimale? Nulla arriva ai giocatori prima che lo staff invii la settimana.',
      ],
    },
    {
      ...m[2],
      eyebrow: 'Un club, tutte le squadre',
      title: 'Tutto il settore giovanile su una pagina.',
      accent: 'Ogni squadra vede solo i propri dati.',
      alt: 'Panoramica del club: tutte le squadre con giocatori, disponibilità, infortuni, carico, check-in mentale e consensi dei genitori in sospeso',
      text: [
        'Dagli U9 alla prima squadra: per ogni squadra giocatori, disponibilità, infortuni in corso, carico, check-in mentale, consensi dei genitori in sospeso e la prossima partita. Il tutto sommato per l’intero club.',
        'La dirigenza del club vede indicatori, mai nomi, diagnosi o singoli check-in. Una squadra si apre solo al proprio staff.',
        'Una nuova rosa entra nel sistema da qualsiasi file, che sia Excel, PDF o la foto della lista della squadra, e i link per l’anamnesi di tutti i giocatori che non ne hanno ancora una si creano su un’unica schermata. Quando uno junior sale di categoria, porta con sé i suoi dati.',
      ],
    },
    {
      ...m[3],
      eyebrow: 'Giorno partita',
      title: 'Le partite guidano la settimana.',
      accent: 'Ogni giorno in relazione al prossimo ingaggio.',
      alt: 'Calendario: partite e allenamenti sul ghiaccio in un unico calendario, ogni giorno segnato in relazione alla prossima partita',
      text: [
        'Il calendario delle partite viene importato, non ricopiato. Ogni giorno è segnato in relazione alla prossima partita: forza pesante lontano dalla partita, niente il giorno prima, rigenerazione dopo.',
        'Anche quando le partite si susseguono a ritmo serrato: la stagione in fasi, un piano per la squadra, e ogni giocatore riceve la sua copia.',
      ],
    },
    {
      ...m[4],
      eyebrow: 'Forza esplosiva',
      title: 'Un giocatore di hockey ha bisogno di esplosività.',
      accent: 'Misurata in metri al secondo.',
      alt: 'Allenamento basato sulla velocità: traiettoria del bilanciere, velocità di ogni ripetizione, perdita di velocità e prontezza rispetto al valore di riferimento del giocatore',
      text: [
        'Nessun dispositivo di misura per giocatore, basta uno smartphone: riprende la serie di lato, il sistema traccia la traiettoria del bilanciere e misura ogni ripetizione.',
        'Se il giocatore sposta lo stesso carico più velocemente, è diventato più esplosivo. Il massimale viene stimato senza un tentativo massimale, e la prontezza viene misurata rispetto al suo valore di riferimento personale.',
      ],
    },
    {
      ...m[5],
      eyebrow: 'Ritorno al gioco',
      title: 'Dall’infortunio di nuovo sul ghiaccio.',
      accent: 'Fisioterapia e preparazione atletica sempre allineate.',
      alt: 'Registrazione di un infortunio: stato dall’assenza attraverso cinque fasi di rientro, off-ice e ghiaccio senza contatto, fino a pronto per giocare',
      text: [
        'L’infortunio viene registrato, poi seguono cinque fasi di rientro: riabilitazione, off-ice, ghiaccio senza contatto, allenamento completo, pronto per giocare. Fisioterapista e preparatore atletico vedono lo stesso stato, senza passaggi di consegne al telefono.',
        'Lo stato si imposta una sola volta, la disponibilità nel board si aggiorna da sola.',
      ],
    },
  ],
  app: {
    photo: hockeyMedia.appPhoto,
    text: [
      'La sua settimana, ogni esercizio con le indicazioni tecniche, i suoi record e i suoi progressi. Lo staff non manda più nulla via WhatsApp: ciò che è approvato nel piano compare direttamente al giocatore.',
      'Prima dell’allenamento indica sonno, energia e stress nella stessa app. Da qui nasce la prontezza che lo staff vede al mattino nel board. Ne fa parte anche l’alimentazione, con calorie e macronutrienti.',
    ],
  },
  swiss: 'Nell’hockey professionistico i dati sanitari e di prestazione sono la cosa più sensibile che un club possiede. Il loro posto è in Svizzera, e appartengono al giocatore.',
  closing: 'Ci descriva brevemente come lavora oggi il Suo staff. Le mostriamo la Sua rosa in Prometheus, con il Suo calendario e i Suoi test.',
}

export default function HockeySuGhiaccioPage() {
  return <TeamSportPage sport={HOCKEY_IT} />
}
