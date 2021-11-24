import { createApp } from './main'
import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

export async function render (url, manifest, context = { host: '', ua: '' }) {
  let renderError = null

  const sessionContext = {
    host: context.host,
    token: '',
    UUID: '',
    ua: context.ua,
    resetToken: token => {}
  }
  const syncState = {}

  const { app, router, head } = createApp(sessionContext, syncState)

  router.push(url)
  try {
    await router.isReady()
  } catch (e) {
    renderError = e
  }

  const matchedComponents = router.currentRoute.value.matched
  if (matchedComponents.some(m => m.name === '404')) {
    renderError = new Error(`404: ${url}`)
  }

  const ctx = {}
  let html = ''
  try {
    html = await renderToString(app, ctx)
  } catch (e) {
    renderError = e
  }
  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [renderError, html, preloadLinks, syncState, headTags, htmlAttrs, bodyAttrs]
}

function renderPreloadLinks (modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink (file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    return ''
  }
}
