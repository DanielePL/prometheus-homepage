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
            When you delete your account, the following data is permanently removed:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-ink">Account information</strong> &mdash; Email, name, profile picture, authentication data</li>
            <li><strong className="text-ink">Training data</strong> &mdash; All workout logs, exercise history, VBT metrics, and personal records</li>
            <li><strong className="text-ink">AI coaching data</strong> &mdash; Conversation history, recommendations, and personalized coaching data</li>
            <li><strong className="text-ink">Nutrition data</strong> &mdash; Food logs, meal photos, nutrition plans, and dietary preferences</li>
            <li><strong className="text-ink">Health data</strong> &mdash; Body measurements, medical conditions, injuries, and Health Connect data</li>
            <li><strong className="text-ink">Community data</strong> &mdash; Posts, comments, likes, and follower relationships</li>
            <li><strong className="text-ink">Media</strong> &mdash; Progress photos, form analysis videos, and any other saved media</li>
          </ul>
        </section>

        {/* What May Be Retained */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheck className="text-accent-dark mt-1 shrink-0" size={22} />
            <h2 className="text-lg font-semibold tracking-tight text-ink">What May Be Retained</h2>
          </div>
          <p className="mb-4">
            In certain cases, limited data may be retained after account deletion:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-ink">Legal obligations</strong> &mdash; Payment/transaction records required by tax law (up to 7 years)</li>
            <li><strong className="text-ink">Anonymized data</strong> &mdash; Fully anonymized, aggregated usage statistics that cannot be linked back to you</li>
            <li><strong className="text-ink">Fraud prevention</strong> &mdash; Minimal data necessary to prevent abuse, as permitted by law</li>
          </ul>
        </section>

        {/* How to Delete */}
        <section className="card rounded-2xl p-6 sm:p-7">
          <h2 className="text-lg font-semibold tracking-tight text-ink mb-6">How to Delete Your Account</h2>

          {/* Method 1: Email */}
          <div className="bg-tint border border-line rounded-xl p-5">
            <h3 className="text-ink font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
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
            <li>We will confirm receipt of your deletion request within 48 hours.</li>
            <li>Your data will be permanently deleted within <strong className="text-ink">30 days</strong>, as required by GDPR.</li>
            <li>You will receive an email confirmation once the deletion is complete.</li>
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
