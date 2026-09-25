import FeaturePage from '../../components/site/FeaturePage'

/* /video-review/ — feedback, check-ins and calls in one thread.
 * Product truth: video review with annotations (AnnotationCanvas,
 * ClientAnnotationOverlay), check-ins, messaging (Inbox), built-in video
 * calls with a permanent room link (Sales page: "Your permanent call link"),
 * phone-camera bar-speed tracking (VBT) as a footnote. The client list shows
 * days since last training, check-in and message per client. */
export default function VideoReviewPage() {
  return (
    <FeaturePage
      path="/video-review/"
      title="Video feedback and check-ins for online coaches | Prometheus"
      description="Review a client's set on video with annotations, run check-ins and messaging in one thread, and take calls on a link that never changes — all inside the coaching account. From $19 a month."
      ogImage="/images/og/video-review.jpg"
      chip="Video feedback & check-ins"
      headline="See the set. Draw on it."
      accent="Send it back the same day."
      intro="A client films a set in the app, you review it with annotations, and your feedback lands in the same thread as their check-ins and messages. Calls are built in too — one link, never changes."
      hero={{ src: '/images/coach/app-clients.webp', alt: 'The client list: days since each client last trained, checked in or wrote — the ones drifting are at the top', width: 1400, height: 876 }}
      sections={[
        {
          eyebrow: 'Video review',
          title: 'Annotate the set,',
          accent: 'not describe it.',
          body: [
            'Draw on the frame where the knee caves or the bar drifts, add a note, send. The client sees your marks on their own video, in the app, with the next session already underneath it.',
            'Bar speed from the phone camera is in there too for the lifters who want it — the footnote, not the headline.',
          ],
          phones: [
            ['/images/coach/app-mobile-workout.webp', 'Logging a set in the client app'],
            ['/images/coach/app-mobile-training.webp', "This week's training as the client sees it"],
          ],
        },
        {
          eyebrow: 'Check-ins and messages',
          title: 'One thread per client.',
          accent: 'Everything you said, in order.',
          body: [
            'Weekly check-ins, progress photos, questions and your replies sit in one conversation per client. Nothing lives in a chat app you cannot search and nothing gets lost between two tools.',
            'The client list shows who has gone quiet — days since the last session, the last check-in, the last message — so you write to the person who needs it before they cancel.',
          ],
          shot: { src: '/images/coach/loop-clients.webp', alt: 'Client list with days since last training, check-in and message', width: 1600, height: 1000 },
        },
        {
          eyebrow: 'Calls',
          title: 'Video calls, built in.',
          accent: 'One link that never changes.',
          body: [
            'Your call room has a permanent link. Share it once; every client and every prospect re-enters the same room. No third-party meeting tool, no new link per week, nothing to paste by hand.',
          ],
        },
      ]}
      included={[
        'Video review with drawn annotations on the client’s clip',
        'Check-ins, progress photos and messaging in one thread per client',
        'Built-in video calls with a permanent room link',
        'A client list that shows who is drifting',
        'Phone-camera bar-speed tracking (VBT)',
        'Client app free on iPhone and Android',
      ]}
      faq={[
        { q: 'Do I need a separate video-call tool?', a: 'No. Calls run inside Prometheus on a permanent link you share once. Clients and prospects join from the same link every time.' },
        { q: 'How does a client send me a video?', a: 'They film or upload it in the client app, attached to the exercise. You see it in their record, annotate it and reply there.' },
        { q: 'Is video review included at $19?', a: 'Yes. Video review, check-ins, messaging and calls are in every plan. The price changes only with how many clients you coach.' },
        { q: 'Can clients message me outside the app?', a: 'They can, but the point is that they do not have to. Everything in the app is searchable and tied to the client; a message in a chat app is neither.' },
      ]}
      ctaTitle="Review one set today."
      ctaBody="Invite a client, have them film one lift, send your marks back. Fourteen days, no card."
    />
  )
}
