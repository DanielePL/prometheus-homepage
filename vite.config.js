import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    // Nicht 5173: der Vite-Default kollidiert mit den anderen Prometheus-
    // Projekten, die parallel laufen. strictPort, damit die Adresse fest
    // bleibt und nicht still auf die nächste freie Nummer wandert.
    port: 5180,
    strictPort: true,
  },
  ssgOptions: {
    // Only the pages a crawler or a shared link should ever see.
    //
    // /auth/callback and /stripe/success are deliberately absent: both read
    // window.location during render, which does not exist in Node and would
    // fail the build. They are runtime redirects with nothing to index.
    // Listed here rather than imported from src/routes.jsx on purpose: importing
    // the route module pulls the whole app graph into the config, and the
    // Supabase client reads import.meta.env at module load — which does not
    // exist while Vite is bundling its own config in Node. Six duplicated
    // strings are cheaper than that coupling. Keep in sync with routes.jsx.
    // /growth is absent on purpose: it is the investor pitch, not a page that
    // should rank, and it fails to render in Node. Excluding it costs nothing
    // and keeps the build honest — it still works fine in the browser.
    includedRoutes: () => [
      '/',
      '/studios',
      '/enterprise',
      '/trainerize-alternative',
      '/privacy',
      '/terms',
      '/impressum',
      '/goodbye',
      '/404',
    ],
    formatting: 'minify',
  },
  build: {
    rollupOptions: {
      // Only for the browser build. vite-react-ssg builds twice, and in the
      // Node pass Rollup treats @supabase/supabase-js as an external module —
      // naming an external in manualChunks is a hard error.
      output: isSsrBuild ? {} : {
        // Supabase only: it's pulled in by the demo form, so it belongs in its
        // own chunk rather than the entry.
        //
        // framer-motion is deliberately NOT listed. Naming it here forced a
        // standalone chunk that Vite then preloaded from index.html — 131 KB
        // fetched on every homepage visit. Since the homepage's animations all
        // run on CSS now, the only remaining users are the parked sections and
        // the lazy /growth route; without an entry here, Rollup puts the
        // library in those route chunks, where it is actually needed.
        manualChunks: {
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
}))
