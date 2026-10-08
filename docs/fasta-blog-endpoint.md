Untitled




Prometheus blog publishing endpoint —
developer brief
  ​Oct 6, 2026   · ​@Caitlin

Please build one HTTPS endpoint on prometheus.coach that receives a finished blog post
from Fasta Blogging and publishes it on your blog, plus the /blog pages that show those
posts. We send each post when the client approves it. Your site stores it and shows it at
the right time. Nobody has to copy and paste.


How it works
One POST per post. Sending the same post again updates it; it never creates a duplicate.

 1. The client approves a post in Fasta Blogging.
 2. We POST it to your endpoint as JSON: title, slug, SEO fields, body HTML and image
    links.
 3. Your endpoint checks the token, saves the post (creating it, or updating the one with
    the same external_id ) and copies the images to your own storage.
 4. You reply 200 with the post's id and live URL. We save that URL and show it to the
    client.
 5. If a post has a future publish_at , your site keeps it hidden until then. Your side needs
     no scheduler. The page just hides posts whose publish_at is still in the future.
 6. If the post is edited later, steps 2–4 happen again with the same external_id .


Authentication
Use a bearer token over HTTPS. You generate a long random secret (at least 32 bytes, e.g.
openssl rand -hex 32 ) and share it with us securely, never by plain email. We send it on
every request:

   POST https://prometheus.coach/api/fasta/posts
   Authorization: Bearer <your secret>
   Content-Type: application/json
   User-Agent: FastaBlogging-Publisher/1


     Compare the token in constant time ( crypto.timingSafeEqual in Node) and reply
       401 if it is missing or wrong.

     Accept HTTPS only.




                                                                                        Page 1 of 8
Untitled




     Keep the secret in an environment variable, not in the code. You can rotate it any time;
     just send us the new one.
     The path above is only a suggestion. Use whatever path suits your app and tell us.


The request
The request is a single JSON body. Every field below is sent on every request, so a full
resend is always safe. A field we have no value for is sent as null , never left out.


   Field                 Type                   What it is

    external_id          string (UUID)          Our id for the post. Your key for create-or-
                                                update. It never changes.

    version              integer                Goes up by one with every edit. Ignore a
                                                request whose version is lower than the one
                                                you hold.

    status               "publish" |            draft means save it but don't show it. We
                         "draft"                use it for the test post.

    publish_at           ISO 8601 UTC           When it goes live. In the past or now = live
                                                immediately; in the future = hidden until then.

    title                string                 The page's H1. Plain text.

    slug                 string                 The URL part, e.g. how-to-choose-a-gym-
                                                coach . Lowercase, a–z, 0–9 and hyphens.

    meta_title           string                 The <title> tag. Up to about 60 characters.

    meta_description     string                 The meta description. Up to about 155
                                                characters.

    excerpt              string | null          A short summary for the blog index card and
                                                social previews.

    content_html         string                 The body. It does not include the H1; the first
                                                heading is an H2.

    content_markdown     string                 The same body as Markdown, in case you
                                                render Markdown yourselves. Use one, not
                                                both.

    featured_image       object | null          { url, alt, filename, width, height } .
                                                The hero image and social share image.




                                                                                           Page 2 of 8
Untitled




   Field                    Type               What it is

    images                  array              Every image in the body: { url, alt,
                                               caption, filename, width, height } .

    author                  string | null      The name to show as author.

    category                string | null      One category name, if you show categories.

    focus_keyword           string | null      For your reference only. Don't print it on the
                                               page.


A full example:

   {
       "external_id": "5f0c2b1e-8a7d-4c1e-9b3a-2d6f4e8a1c90",
       "version": 3,
       "status": "publish",
       "publish_at": "2026-11-11T22:00:00Z",
       "title": "How to Choose a Coach for Your Gym",
       "slug": "how-to-choose-a-gym-coach",
       "meta_title": "How to Choose a Gym Coach | Prometheus",
     "meta_description": "What to look for when you hire a coach for your gym,
   and the questions to ask first.",
       "excerpt": "What to look for when you hire a coach, and the questions to
   ask first.",
     "content_html": "<p>Opening paragraph…</p><h2>What a good coach does</h2>
   <p>…</p><figure><img src=\"https://<our-storage>/…/coaching-floor.webp\"
   alt=\"Coach working with a member\" width=\"1600\" height=\"900\">
   <figcaption>…</figcaption></figure>",
     "content_markdown": "Opening paragraph…\n\n## What a good coach does\n\n…",
       "featured_image": {
           "url": "https://<our-storage>/…/how-to-choose-a-gym-coach.webp",
           "alt": "Gym coach reviewing a training plan",
           "filename": "how-to-choose-a-gym-coach.webp",
           "width": 1600,
           "height": 900
       },
       "images": [
           {
               "url": "https://<our-storage>/…/coaching-floor.webp",
               "alt": "Coach working with a member",
               "caption": null,
               "filename": "coaching-floor.webp",
               "width": 1600,
               "height": 900
           }



                                                                                          Page 3 of 8
Untitled




       ],
       "author": "Prometheus",
       "category": "Coaching",
       "focus_keyword": "gym coach"
   }




What your endpoint must do
The endpoint is an upsert keyed on external_id . Everything else is about keeping a live
post stable.

       Create or update. If no post has this external_id , create it. If one does, update it in
       place, keeping the same id and URL.
       Ignore old versions. If the incoming version is lower than the one you hold, reply 200
       with the current post and change nothing.
       Keep the URL stable. Once a post is live, never change its slug yourselves. If an update
       ever sends a different slug, keep the old one serving with a 301 redirect to the new
       one.
       Keep the original publish date. On an update to a live post, keep the date it first went
       live. Store a separate updated_at for “last updated”.
       Slug clash. If another post (not this external_id ) already uses the slug, reply 409
       and don't save. We'll fix the slug and resend.
       Copy the images. Image url s are time-limited download links (valid for about 24
       hours), so don't link to them. Download each one into your own storage or CDN, keep
       its filename and alt , and rewrite the matching src in content_html to your copy.
       Do this before you reply 200 .
       Clean the HTML. Run content_html through an allowlist sanitiser (e.g. sanitize-
       html or DOMPurify) before you store or render it. Expect only these tags: p h2 h3 h4
       ul ol li a strong em blockquote figure img figcaption table thead tbody tr
       th td br , plus iframe for YouTube or Vimeo embeds. On a , keep href , rel and
       target . On img , keep src , alt , width and height . Strip everything else.
       Respond within 30 seconds. If downloading the images takes longer, save the post,
       reply 202 with the post's id and URL, and finish the images in the background.
       Never delete. We never send deletes. If a post has to come down, someone removes it
       by hand on your side.




                                                                                           Page 4 of 8
Untitled




Responses and retries
On success, reply with the post's id and its public URL. We save that URL as the post's live
link.

   { "id": "your-post-id", "url": "https://prometheus.coach/blog/how-to-choose-
   a-gym-coach", "status": "published" }


 status is published , scheduled (when publish_at is in the future) or draft .


   Your reply            What it means                 What we do

    200 / 201            Saved                         Mark the post published and store
                                                       url .

    202                  Saved; images still copying   Same as 200 .

    400 / 422            Our payload is wrong          Stop and show your error message to
                                                       our team. No retry.

    401 / 403            Bad token                     Stop and alert our team. No retry.

    409                  Slug already used by          Stop; our team picks a new slug and
                         another post                  resends.

    5xx , timeout, no    Your side failed              Retry with the same body, up to 5 times
   answer                                              over about an hour, then alert our team.


For any error, include a short readable reason, e.g. { "error": "slug already used by
post 812" } . Because retries resend the same external_id and version , a retry after
a timeout that actually succeeded is harmless.


The blog pages
The posts only help search if Google receives each page as finished HTML. Today
prometheus.coach looks like a client-rendered app (one JS bundle), and a post that only
appears after JavaScript runs is indexed late or poorly. So /blog and /blog/<slug> must
be server-rendered or pre-rendered, whatever you use for the rest of the site.

Each post page needs:

     The title as the only <h1> , then content_html .
       <title> = meta_title , <meta name="description"> = meta_description .

       <link rel="canonical"> pointing to the post's own URL.




                                                                                            Page 5 of 8
Untitled




     Open Graph and Twitter tags ( og:title , og:description , og:image = your copy of
     the featured image, og:type=article ).
       Article JSON-LD with headline, image, datePublished , dateModified and author.
     The featured image shown at the top, with its alt text.
     A visible publish date (plus “updated” when it has been updated).

Across the blog:

       /blog lists live posts, newest first, with title, excerpt and featured image. It shows
     nothing that is a draft or has a future publish_at .
     Every live post appears in sitemap.xml , with <lastmod> = updated_at . A scheduled
     post joins the sitemap when its time comes.
     A link to /blog in the site's main navigation or footer.
     A real 404 for unknown slugs, not a 200 that shows an empty page.


Testing and handover
When the endpoint is ready, send us the three items below. We then run the checks with
you before any real post goes out.

What we need from you

     The endpoint URL.
     The bearer token, shared securely (a password manager share or a one-time secret
     link).
     The blog's base URL, e.g. https://prometheus.coach/blog .

Acceptance checks

     A request with no token, or the wrong one, gets 401 .
     A test post with status: "draft" is saved and is not visible on /blog , in the sitemap
     or at its URL.
     The same post resent with status: "publish" and a past publish_at goes live at
     the returned url .
     Resending it with a new title and version + 1 updates the same page. The URL, id and
     original publish date stay the same.
     Resending an older version changes nothing.
     A post with a future publish_at stays hidden until that time, then appears on /blog
     and in the sitemap without anyone touching it.
     Every image on the live page loads from your own storage, with its alt text.
     A second post with a slug that's already taken gets 409 .



                                                                                           Page 6 of 8
Untitled




     Viewing the live post's page source (or curl without JavaScript) shows the full article,
     title, meta description, canonical and JSON-LD.
     Unknown slugs return 404 .

If anything here doesn't fit how your site is built, comment on this doc and we'll adapt our
side.


Building it with Claude Code
If you use Claude Code, you can hand it this brief to build from. First, save this whole doc
(everything above this section) into your repo as docs/fasta-blog-endpoint.md . Claude
Code can't open this link, so it needs a local copy. Then paste the prompt below into
Claude Code from the repo root.




                                                                                        Page 7 of 8
Untitled




   Read docs/fasta-blog-endpoint.md in full. It is the spec for a blog
   publishing endpoint that Fasta Blogging will call, plus the /blog pages that
   display the posts. Build exactly what it describes.


   Before writing any code:
   1. Explore this repo and tell me the stack: framework, how pages are rendered
   (client-only SPA or server-rendered), the database or storage available,
   where files and images can be stored, how sitemap.xml and robots.txt are
   produced today, and how the app is deployed (it runs on Render behind
   Cloudflare).
   2. The spec requires /blog and /blog/<slug> to reach Google as finished HTML.
   If the site is currently a client-only SPA, propose the smallest way to
   server-render or pre-render just the blog routes without rewriting the rest
   of the site, and explain the trade-offs.
   3. Show me a short plan: files to add or change, the database table for posts
   (including external_id unique, version, status, publish_at, created_at,
   updated_at, first_published_at), and where images will be stored. Wait for my
   approval before building.


   While building:
   - Follow the spec's rules exactly: upsert on external_id; ignore a lower
   version; never change a live post's slug or original publish date; 409 on a
   slug used by a different post; copy every image to our own storage and
   rewrite its src before replying; sanitise content_html with an allowlist (the
   tags listed in the spec); constant-time token check; 401 on a bad token;
   respond within 30 seconds (202 if images finish in the background); never
   delete posts.
   - Posts with status draft, or a publish_at in the future, must not appear on
   /blog, in sitemap.xml, or at their URL until they are live. Do this with a
   date filter at render time, not a scheduler.
   - Each post page needs the meta tags, canonical, Open Graph, Article JSON-LD,
   featured image and dates listed in the spec. Unknown slugs return a real 404.
   - Read the bearer token from an environment variable named
   FASTA_PUBLISH_TOKEN. Never commit it.
   - Match the existing code style and keep the change as small as the spec
   allows.


   When done:
   - Write automated tests (or a script) covering every item in the spec's
   Acceptance checks, and run them.
   - Give me a curl command that sends the spec's example JSON as a draft to a
   local server, so I can try it by hand.
   - List anything in the spec you could not do as written and why.


When the checks pass, send us the endpoint URL, the token (shared securely) and the
blog's base URL, and we'll run the test post with you.


                                                                                Page 8 of 8
