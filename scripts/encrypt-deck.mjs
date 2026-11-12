#!/usr/bin/env node
/* Encrypts a slide deck for /praesentation/?d=<slug> (owner, 2026-11-05: decks
 * must not show claude.ai, must load fast and be protected).
 *
 * The output in public/decks/<slug>.json is AES-256-GCM ciphertext, the key is
 * derived from an access code (PBKDF2-SHA256), and the browser decrypts it. So
 * the site is still static, and without the code the file is unreadable. The
 * code is never stored in the repo. Speaker notes (<aside>) are removed BEFORE
 * encrypting: they are internal, and whoever has the code must not read them.
 *
 * --open (owner, 2026-11-12, Balboa): the same file WITHOUT encryption, for a
 * deck that opens without a code. Notes are still removed. Only for decks the
 * owner has cleared to be readable by anyone holding the link.
 *
 * Usage:
 *   DECK_CODE=... node scripts/encrypt-deck.mjs \
 *     --src <folder holding project/deck.json and project/slides/> \
 *     --assets <json map: asset id → image file> \
 *     --slug ehc-biel --lang de [--skip fees,other]
 *
 * The slides are the "project/" files of the deck's Claude artifact; after a
 * change to a deck, read them again and re-run this with the same code.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import { webcrypto as crypto } from 'node:crypto'

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? undefined : process.argv[i + 1]
}
const src = arg('src')
const slug = arg('slug')
const lang = arg('lang') || 'en'
const skip = new Set((arg('skip') || '').split(',').filter(Boolean))
const assets = JSON.parse(readFileSync(arg('assets'), 'utf8'))
const open = process.argv.includes('--open')
const code = (process.env.DECK_CODE || '').trim().toLowerCase()
if (!src || !slug || !/^[a-z0-9-]+$/.test(slug) || (!open && code.length < 10)) {
  console.error('Need --src, --slug (a-z0-9-) and DECK_CODE (10+ characters), or --open.')
  process.exit(1)
}

const MIME = { '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp4': 'video/mp4' }
const deck = JSON.parse(readFileSync(join(src, 'project/deck.json'), 'utf8'))
const slides = deck.order.filter((id) => !skip.has(id)).map((id) => {
  const html = readFileSync(join(src, 'project/slides', `${id}.html`), 'utf8')
    .replace(/<aside>[\s\S]*?<\/aside>/g, '')
    .replace(/\/_blob\/([0-9a-f]{32})/g, (_, assetId) => {
      const file = assets[assetId]
      if (!file) throw new Error(`Slide ${id}: no file for asset ${assetId}`)
      const b64 = readFileSync(file).toString('base64')
      return `data:${MIME[extname(file).toLowerCase()]};base64,${b64}`
    })
  if (/\/_blob\/|<aside/.test(html)) throw new Error(`Slide ${id}: leftover asset or notes`)
  return html
})

if (open) {
  mkdirSync('public/decks', { recursive: true })
  const out = `public/decks/${slug}.json`
  writeFileSync(out, JSON.stringify({ v: 1, lang, open: true, title: deck.title, slides }))
  console.log(`${out}: ${slides.length} slides, open (no code)`)
  process.exit(0)
}

const ITERATIONS = 310000
const salt = crypto.getRandomValues(new Uint8Array(16))
const iv = crypto.getRandomValues(new Uint8Array(12))
const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey'])
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS },
  base,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt'],
)
const plain = new TextEncoder().encode(JSON.stringify({ title: deck.title, slides }))
const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain))
const b64 = (u8) => Buffer.from(u8).toString('base64')

mkdirSync('public/decks', { recursive: true })
const out = `public/decks/${slug}.json`
writeFileSync(out, JSON.stringify({ v: 1, lang, iterations: ITERATIONS, salt: b64(salt), iv: b64(iv), ct: b64(ct) }))
console.log(`${out}: ${slides.length} slides, ${(plain.length / 1e6).toFixed(1)} MB`)
