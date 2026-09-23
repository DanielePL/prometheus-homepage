export default function Impressum() {
  return (
    <article>
      <h1 className="display text-3xl sm:text-4xl mb-2">Impressum</h1>
      <p className="text-sm text-muted mb-12">Legal Notice according to &sect; 5 TMG / EU E-Commerce Directive</p>

      <div className="space-y-8 text-muted leading-relaxed">
        {/* Company Information */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Company Information</h2>
          <ul className="space-y-2">
            <li><strong className="text-ink">Company:</strong> Peakforce O&Uuml;</li>
            <li><strong className="text-ink">Legal Form:</strong> O&Uuml; (Osa&uuml;hing &mdash; Estonian Private Limited Company)</li>
            <li><strong className="text-ink">Registry Code:</strong> 17389924</li>
            <li><strong className="text-ink">Registered Address:</strong> Harju maakond, Tallinn, Lasnamäe linnaosa, Sepapaja tn 6, 15551, Estonia</li>
            <li><strong className="text-ink">Register:</strong> Estonian Commercial Register (Äriregister)</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Contact</h2>
          <ul className="space-y-2">
            <li><strong className="text-ink">Email:</strong>{' '}
              <a href="mailto:hello@prometheus.coach" className="text-accent-dark hover:text-accent underline underline-offset-4">
                hello@prometheus.coach
              </a>
            </li>
            <li><strong className="text-ink">Website:</strong>{' '}
              <a href="https://prometheus.coach" className="text-accent-dark hover:text-accent underline underline-offset-4">
                prometheus.coach
              </a>
            </li>
          </ul>
        </section>

        {/* Responsible Person */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Responsible Person</h2>
          <p>
            Responsible for content according to &sect; 18 (2) MStV:
          </p>
          <ul className="mt-3 space-y-2">
            <li><strong className="text-ink">Name:</strong> Daniele Pauli</li>
            <li><strong className="text-ink">Address:</strong> Harju maakond, Tallinn, Lasnamäe linnaosa, Sepapaja tn 6, 15551, Estonia</li>
          </ul>
        </section>

        {/* EU Dispute Resolution */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">EU Online Dispute Resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution (ODR):{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-dark hover:text-accent underline underline-offset-4"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p className="mt-3">
            We are neither obligated nor willing to participate in dispute resolution
            proceedings before a consumer arbitration board.
          </p>
        </section>

        {/* Liability Disclaimer */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Liability Disclaimer</h2>

          <h3 className="text-ink font-semibold mt-2 mb-2">Content</h3>
          <p>
            The content of our website and app has been created with the utmost care. However,
            we cannot guarantee the accuracy, completeness, or timeliness of the content. As a
            service provider, we are responsible for our own content on these pages according to
            general laws. However, we are not obligated to monitor transmitted or stored
            third-party information.
          </p>

          <h3 className="text-ink font-semibold mt-4 mb-2">Links</h3>
          <p>
            Our website may contain links to external third-party websites over whose content
            we have no control. We therefore cannot accept any liability for this third-party
            content. The respective provider or operator of the linked pages is always
            responsible for the content of those pages.
          </p>
        </section>

        {/* VAT */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">VAT Information</h2>
          <p>
            VAT identification is not yet assigned. As a newly registered Estonian company, the
            VAT ID will be listed here once obtained.
          </p>
        </section>
      </div>
    </article>
  )
}
