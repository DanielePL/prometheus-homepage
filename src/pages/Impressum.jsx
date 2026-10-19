/* Impressum der Peakforce GmbH (owner, 2026-10-19: "OÜ sofort weg", Adresse
   Niederfelbenweg 4, 8702 Zollikon). UID und Handelsregister-Nummer kommen
   dazu, sobald der Eintrag im Handelsregister des Kantons Zürich publiziert
   ist; nie "in Gründung" schreiben (Owner-Verbot). */
const MAIL = 'management@prometheus.coach'

export default function Impressum() {
  return (
    <article>
      <h1 className="display text-3xl sm:text-4xl mb-2">Impressum</h1>
      <p className="text-sm text-muted mb-12">Angaben zum Anbieter dieser Website und der Prometheus-Software</p>

      <div className="space-y-8 text-muted leading-relaxed">
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Anbieter</h2>
          <ul className="space-y-2">
            <li><strong className="text-ink">Firma:</strong> Peakforce GmbH</li>
            <li><strong className="text-ink">Rechtsform:</strong> Gesellschaft mit beschränkter Haftung nach Schweizer Recht</li>
            <li><strong className="text-ink">Adresse:</strong> Niederfelbenweg 4, 8702 Zollikon, Schweiz</li>
          </ul>
        </section>

        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Kontakt</h2>
          <ul className="space-y-2">
            <li><strong className="text-ink">E-Mail:</strong>{' '}
              <a href={`mailto:${MAIL}`} className="text-accent-dark hover:text-accent underline underline-offset-4">{MAIL}</a>
            </li>
            <li><strong className="text-ink">Website:</strong>{' '}
              <a href="https://prometheus.coach" className="text-accent-dark hover:text-accent underline underline-offset-4">prometheus.coach</a>
            </li>
          </ul>
        </section>

        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Verantwortlich für den Inhalt</h2>
          <ul className="space-y-2">
            <li><strong className="text-ink">Name:</strong> Daniele Pauli</li>
            <li><strong className="text-ink">Adresse:</strong> Niederfelbenweg 4, 8702 Zollikon, Schweiz</li>
          </ul>
        </section>

        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Haftung</h2>
          <h3 className="text-ink font-semibold mt-2 mb-2">Inhalte</h3>
          <p>
            Die Inhalte dieser Website und der App sind mit grösster Sorgfalt erstellt. Für
            Richtigkeit, Vollständigkeit und Aktualität können wir keine Gewähr übernehmen.
            Für eigene Inhalte sind wir nach den allgemeinen Gesetzen verantwortlich. Eine
            Pflicht, übermittelte oder gespeicherte fremde Informationen zu überwachen, besteht
            nicht.
          </p>
          <h3 className="text-ink font-semibold mt-4 mb-2">Links</h3>
          <p>
            Diese Website kann Links auf Websites Dritter enthalten, auf deren Inhalt wir keinen
            Einfluss haben. Für diese Inhalte übernehmen wir keine Haftung; verantwortlich ist
            der jeweilige Anbieter oder Betreiber der verlinkten Seite.
          </p>
        </section>

        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Mehrwertsteuer</h2>
          <p>Die MWST-Nummer wird hier ergänzt, sobald sie zugeteilt ist.</p>
        </section>
      </div>
    </article>
  )
}
