import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createHead } from '@vueuse/head'
import ClientOnly from './components/ClientOnly'
import './index.css'
import { createInteract, createRequest, createSession, createSyncState, createSXO } from './hooks/app'

import { createI18n } from 'vue-i18n'
if (!import.meta.env.SSR) {
  import('amfe-flexible/index.js')
}

export function createApp (context, syncState = {}) {
  const app = createSSRApp(App)
  const head = createHead()

  const interact = createInteract(app)
  const session = createSession(app, context)
  const SXO = createSXO(app)
  const router = createRouter(SXO, interact, session)
  const request = createRequest(app, session, interact, router)
  const i18n = createI18n({
    // someting i18n options
  })
  createSyncState(app, syncState)

  app.use(router).use(head)
  app.use(i18n)
  app.component(ClientOnly.name, ClientOnly)

  return { app, router, head, session, request }
}
