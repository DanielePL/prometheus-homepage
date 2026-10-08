import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

/* Publish every prerendered page a second time as <path>/index.html.
 *
 * The build writes flat files — dist/studios.html — and a request for
 * /studios does not match any file on disk, so the host falls through to its
 * SPA catch-all and answers with the homepage. In a browser that looks fine
 * (React Router renders the right page once the bundle loads); to a crawler the
 * studios URL simply *is* the homepage, canonical tag included.
 *
 * render.yaml names an explicit rewrite per page, which fixes it wherever that
 * file is honoured — Render only applies it to services created from a
 * Blueprint. This script makes the same paths work without any host config at
 * all: dist/studios/index.html is a real file at a directory path, which every
 * static host resolves before reaching a catch-all.
 *
 * Both copies stay in sync because both come from the same build, and both
 * carry the same canonical tag, so the duplicate is invisible to search.
 */
const DIST = 'dist'

/* Recursive since the blog (2026-10-08): /blog/<slug> is written as
   dist/blog/<slug>.html and needs dist/blog/<slug>/index.html the same way. */
async function htmlPages(dir, rel = '') {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name !== 'assets') out.push(...await htmlPages(join(dir, entry.name), join(rel, entry.name)))
    } else if (entry.name.endsWith('.html') && entry.name !== 'index.html' && !(rel === '' && entry.name === '404.html')) {
      out.push(join(rel, entry.name))
    }
  }
  return out
}

const pages = await htmlPages(DIST)

for (const file of pages) {
  const slug = file.replace(/\.html$/, '')
  await mkdir(join(DIST, slug), { recursive: true })
  await copyFile(join(DIST, file), join(DIST, slug, 'index.html'))
}

/* 404.html is deliberately NOT given the directory treatment: that exact
   filename at the root is what a static host looks for when a request matches
   nothing, and /404/ is not a URL anyone should reach. The build already writes
   it flat, so it is simply left alone. */

console.log(`[pretty-urls] ${pages.length} pages as <slug>/index.html, plus 404.html`)
