import { Head } from 'vite-react-ssg'
import { HomeNav, HomeFooter } from '../../components/home/HomeChrome'
import { livePosts } from '../../lib/blog'
import { PostCard } from './BlogPost'

/* /blog/ — every live post, newest first.
 *
 * With no posts yet the page still renders (so the route can be tested) but is
 * noindex, and the postbuild script leaves it out of the sitemap: an empty blog
 * is not something a search engine should find. It is in no nav either; that
 * link comes with the first real post.
 */
export default function BlogIndex() {
  const posts = livePosts()
  const url = 'https://prometheus.coach/blog/'
  const title = 'Blog: running a gym or a coaching business | Prometheus'
  const description = 'Practical articles for gym owners, studio owners and personal trainers on members, payments, scheduling and growth.'

  return (
    <>
      <Head>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        {posts.length === 0 && <meta name="robots" content="noindex, follow" />}
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:title" content="Prometheus Blog" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://prometheus.coach/images/og/home.jpg" />
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <section className="pt-32 lg:pt-40 pb-24 px-5 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <h1>
              <span className="eyebrow">Blog</span>
              <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl">
                Running a gym, <span className="display-soft">a studio or a coaching business.</span>
              </span>
            </h1>

            {posts.length === 0 ? (
              <p className="mt-10 text-lg text-muted">The first articles are on their way.</p>
            ) : (
              <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            )}
          </div>
        </section>

        <HomeFooter />
      </div>
    </>
  )
}
