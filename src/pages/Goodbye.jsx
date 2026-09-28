import { Trash2, Mail, Clock, ShieldCheck } from 'lucide-react'

export default function Goodbye() {
  return (
    <article>
      <h1 className="display text-3xl sm:text-4xl mb-2">Account &amp; Data Deletion</h1>
      <p className="text-sm text-muted mb-12">How to delete your account and what happens to your data</p>

      <div className="space-y-8 text-muted leading-relaxed">
        {/* What Gets Deleted */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <div className="flex items-start gap-3 mb-4">
            <Trash2 className="text-accent-dark mt-1 shrink-0" size={22} />
            <h2 className="text-lg font-semibold tracking-tight text-ink">What Gets Deleted</h2>
          </div>
          <p className="mb-4">
            When you delete your account, it is deactivated for 30 days. During that time you can
            sign in again and keep it. After 30 days the following is removed and your login stops
            working:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-ink">Account information</strong> &mdash; Name, email, username, profile picture and login data</li>
            <li><strong className="text-ink">Health notes</strong> &mdash; Medical conditions, injuries, allergies and food preferences you entered</li>
            <li><strong className="text-ink">Community data</strong> &mdash; Your profile, posts, comments and stories are taken down</li>
            <li><strong className="text-ink">Media</strong> &mdash; Progress photos are removed from your account</li>
            <li><strong className="text-ink">Coach connection</strong> &mdash; A connection to a coach ends, including a WhatsApp number shared with them</li>
          </ul>
        </section>

        {/* What Is Kept, Anonymized */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheck className="text-accent-dark mt-1 shrink-0" size={22} />
            <h2 className="text-lg font-semibold tracking-tight text-ink">What Is Kept, Without Your Name</h2>
          </div>
          <p className="mb-4">
            Training and nutrition data (workouts, sets, velocity metrics, food logs, body and
            wellness values) stay after deletion, but no longer carry your name, email or photo.
            We use them only for anonymous training research, never for advertising, and never sell
            them. In addition:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-ink">Legal obligations</strong> &mdash; Payment/transaction records required by tax law (up to 7 years)</li>
            <li><strong className="text-ink">Fraud prevention</strong> &mdash; Minimal data necessary to prevent abuse, as permitted by law</li>
          </ul>
          <p className="mt-4">
            If you want this data erased as well, write to{' '}
            <a href="mailto:hello@prometheus.coach" className="text-accent-dark hover:text-accent underline underline-offset-4">
              hello@prometheus.coach
            </a>{' '}
            (right to erasure, Art. 17 GDPR).
          </p>
        </section>

        {/* How to Delete */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-6">How to Delete Your Account</h2>

          {/* Method 1: In the app */}
          <div className="bg-tint border border-line rounded-xl p-5 mb-4">
            <h3 className="text-ink font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
              In the app
            </h3>
            <p>
              Open Prometheus, go to <strong className="text-ink">Profile</strong>, scroll to the end
              and tap <strong className="text-ink">Delete account</strong>. Confirm, and you are signed
              out. A Google Play or App Store subscription is not cancelled automatically &mdash;
              cancel it in the store.
            </p>
          </div>

          {/* Method 2: Email */}
          <div className="bg-tint border border-line rounded-xl p-5">
            <h3 className="text-ink font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
              Via Email
            </h3>
            <p>
              Send a deletion request to{' '}
              <a href="mailto:hello@prometheus.coach" className="text-accent-dark hover:text-accent underline underline-offset-4">
                hello@prometheus.coach
              </a>{' '}
              from the email address associated with your account. Include &quot;Account
              Deletion Request&quot; in the subject line. We will confirm receipt and process
              your request within 30 days as required by GDPR.
            </p>
          </div>
        </section>

        {/* Processing Time */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="text-accent-dark mt-1 shrink-0" size={22} />
            <h2 className="text-lg font-semibold tracking-tight text-ink">Processing Time</h2>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li>In the app, the request takes effect immediately and you are signed out.</li>
            <li>By email, we confirm receipt within 48 hours.</li>
            <li>After <strong className="text-ink">30 days</strong> the account is anonymized as described above. Signing in before then and choosing &ldquo;Keep my account&rdquo; cancels the deletion.</li>
            <li>Coach, studio and team accounts are deleted by our support, because they share their login with the coaching software.</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <div className="flex items-start gap-3 mb-4">
            <Mail className="text-accent-dark mt-1 shrink-0" size={22} />
            <h2 className="text-lg font-semibold tracking-tight text-ink">Questions?</h2>
          </div>
          <p>
            If you have questions about data deletion or need assistance, contact us at{' '}
            <a href="mailto:hello@prometheus.coach" className="text-accent-dark hover:text-accent underline underline-offset-4">
              hello@prometheus.coach
            </a>.
          </p>
          <p className="mt-3">
            For full details on how we handle your data, see our{' '}
            <a href="/privacy" className="text-accent-dark hover:text-accent underline underline-offset-4">Privacy Policy</a>.
          </p>
        </section>
      </div>
    </article>
  )
}
