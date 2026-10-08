/* Dev-only sample posts for testing the article template on a long article
 * (table of contents, share buttons, images, tables). src/lib/blog.js adds
 * them only when import.meta.env.DEV is true, so they are tree-shaken out of
 * the production build. Not real content — never publish.
 */

/* Written out as plain literals, no shared object spread: Rollup can only drop
   an unused module whose top level is side-effect free, and a spread counts as
   a possible side effect, which kept this file in the production bundle. */
export const samplePosts = [
  {
    "status": "published",
    "author": {
      "name": "Sample Author",
      "role": "Template test",
      "bio": "A placeholder bio for checking the author block: photo, role, a short paragraph and a link to the author profile.",
      "image": "/images/flame.png",
      "url": "https://prometheus.coach/"
    },
    "featured_image": {
      "src": "/images/gym/front-desk.webp",
      "alt": "Front desk of a gym at opening time",
      "width": 1696,
      "height": 960,
      "caption": "Featured image caption."
    },
    "content_html": "<p>Sample article for testing the blog template in the dev server. It never reaches the production build.</p><h2>Why a front desk needs one screen</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Check-in at the door</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Payments in the same place</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>What the table of contents does</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Sticky on desktop</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Collapsible on mobile</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>Lists, tables and quotes</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><ul><li>An unordered list item</li><li>A second item that is long enough to wrap onto a second line on a phone screen</li><li>A third item</li></ul><ol><li>Numbered one</li><li>Numbered two</li></ol><blockquote><p>A pull quote, to check that quotes stand apart from the running text without shouting.</p></blockquote><table><thead><tr><th>Column A</th><th>Column B</th><th>Column C</th></tr></thead><tbody><tr><td>Row one</td><td>Value</td><td>Value</td></tr><tr><td>Row two with a longer cell</td><td>Value</td><td>Value</td></tr></tbody></table><h2>Images with captions</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><figure><img src=\"/images/gym/coaching-floor.webp\" alt=\"Coaching floor of a gym\" width=\"1696\" height=\"960\" loading=\"lazy\"><figcaption>A caption under an image inside the article.</figcaption></figure><h2>Where the call to action sits</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p>",
    "slug": "sample-long-article",
    "title": "Sample: a long article to test the blog template",
    "seo_title": "Sample long article | Prometheus",
    "meta_description": "A dev-only sample article for testing the blog template.",
    "excerpt": "A dev-only sample article for testing the table of contents, sharing buttons and images.",
    "tags": [
      "gyms",
      "front desk"
    ],
    "publish_at": "2026-10-01T08:00:00Z",
    "updated_at": "2026-10-07T08:00:00Z"
  },
  {
    "status": "published",
    "author": {
      "name": "Sample Author",
      "role": "Template test",
      "bio": "A placeholder bio for checking the author block: photo, role, a short paragraph and a link to the author profile.",
      "image": "/images/flame.png",
      "url": "https://prometheus.coach/"
    },
    "featured_image": {
      "src": "/images/gym/strength-dusk.webp",
      "alt": "Strength area at dusk",
      "width": 1696,
      "height": 960,
      "caption": "Featured image caption."
    },
    "content_html": "<p>Sample article for testing the blog template in the dev server. It never reaches the production build.</p><h2>Why a front desk needs one screen</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Check-in at the door</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Payments in the same place</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>What the table of contents does</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Sticky on desktop</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Collapsible on mobile</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>Lists, tables and quotes</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><ul><li>An unordered list item</li><li>A second item that is long enough to wrap onto a second line on a phone screen</li><li>A third item</li></ul><ol><li>Numbered one</li><li>Numbered two</li></ol><blockquote><p>A pull quote, to check that quotes stand apart from the running text without shouting.</p></blockquote><table><thead><tr><th>Column A</th><th>Column B</th><th>Column C</th></tr></thead><tbody><tr><td>Row one</td><td>Value</td><td>Value</td></tr><tr><td>Row two with a longer cell</td><td>Value</td><td>Value</td></tr></tbody></table><h2>Images with captions</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><figure><img src=\"/images/gym/coaching-floor.webp\" alt=\"Coaching floor of a gym\" width=\"1696\" height=\"960\" loading=\"lazy\"><figcaption>A caption under an image inside the article.</figcaption></figure><h2>Where the call to action sits</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p>",
    "slug": "sample-second-article",
    "title": "Sample: a second article for the related list",
    "meta_description": "A second dev-only sample article.",
    "excerpt": "Shows up under related articles.",
    "tags": [
      "gyms"
    ],
    "publish_at": "2026-09-20T08:00:00Z"
  },
  {
    "status": "draft",
    "author": {
      "name": "Sample Author",
      "role": "Template test",
      "bio": "A placeholder bio for checking the author block: photo, role, a short paragraph and a link to the author profile.",
      "image": "/images/flame.png",
      "url": "https://prometheus.coach/"
    },
    "featured_image": {
      "src": "/images/gym/front-desk.webp",
      "alt": "Front desk of a gym at opening time",
      "width": 1696,
      "height": 960,
      "caption": "Featured image caption."
    },
    "content_html": "<p>Sample article for testing the blog template in the dev server. It never reaches the production build.</p><h2>Why a front desk needs one screen</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Check-in at the door</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Payments in the same place</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>What the table of contents does</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Sticky on desktop</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Collapsible on mobile</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>Lists, tables and quotes</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><ul><li>An unordered list item</li><li>A second item that is long enough to wrap onto a second line on a phone screen</li><li>A third item</li></ul><ol><li>Numbered one</li><li>Numbered two</li></ol><blockquote><p>A pull quote, to check that quotes stand apart from the running text without shouting.</p></blockquote><table><thead><tr><th>Column A</th><th>Column B</th><th>Column C</th></tr></thead><tbody><tr><td>Row one</td><td>Value</td><td>Value</td></tr><tr><td>Row two with a longer cell</td><td>Value</td><td>Value</td></tr></tbody></table><h2>Images with captions</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><figure><img src=\"/images/gym/coaching-floor.webp\" alt=\"Coaching floor of a gym\" width=\"1696\" height=\"960\" loading=\"lazy\"><figcaption>A caption under an image inside the article.</figcaption></figure><h2>Where the call to action sits</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p>",
    "slug": "sample-draft",
    "title": "Sample draft — must not appear anywhere",
    "meta_description": "Draft.",
    "excerpt": "Draft.",
    "tags": [],
    "publish_at": "2026-09-01T08:00:00Z"
  },
  {
    "status": "published",
    "author": {
      "name": "Sample Author",
      "role": "Template test",
      "bio": "A placeholder bio for checking the author block: photo, role, a short paragraph and a link to the author profile.",
      "image": "/images/flame.png",
      "url": "https://prometheus.coach/"
    },
    "featured_image": {
      "src": "/images/gym/front-desk.webp",
      "alt": "Front desk of a gym at opening time",
      "width": 1696,
      "height": 960,
      "caption": "Featured image caption."
    },
    "content_html": "<p>Sample article for testing the blog template in the dev server. It never reaches the production build.</p><h2>Why a front desk needs one screen</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Check-in at the door</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Payments in the same place</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>What the table of contents does</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Sticky on desktop</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h3>Collapsible on mobile</h3><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><h2>Lists, tables and quotes</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><ul><li>An unordered list item</li><li>A second item that is long enough to wrap onto a second line on a phone screen</li><li>A third item</li></ul><ol><li>Numbered one</li><li>Numbered two</li></ol><blockquote><p>A pull quote, to check that quotes stand apart from the running text without shouting.</p></blockquote><table><thead><tr><th>Column A</th><th>Column B</th><th>Column C</th></tr></thead><tbody><tr><td>Row one</td><td>Value</td><td>Value</td></tr><tr><td>Row two with a longer cell</td><td>Value</td><td>Value</td></tr></tbody></table><h2>Images with captions</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><figure><img src=\"/images/gym/coaching-floor.webp\" alt=\"Coaching floor of a gym\" width=\"1696\" height=\"960\" loading=\"lazy\"><figcaption>A caption under an image inside the article.</figcaption></figure><h2>Where the call to action sits</h2><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p><p>This paragraph is filler text that exists only to give the template a realistic length. It runs long enough to show the line length, the spacing between paragraphs and how a <a href=\"/pricing/\">contextual link</a> sits inside running text.</p>",
    "slug": "sample-future",
    "title": "Sample scheduled — must not appear before its date",
    "meta_description": "Future.",
    "excerpt": "Future.",
    "tags": [],
    "publish_at": "2099-01-01T08:00:00Z"
  }
]
