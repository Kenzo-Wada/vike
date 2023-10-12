// https://vike.dev/onRenderClient
export { onRenderClient }

import './css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageShell } from './PageShell'
import { getPageTitle } from './getPageTitle'
import type { OnRenderClient, PageContextClient } from 'vike/types'

let root: ReactDOM.Root
const onRenderClient: OnRenderClient = async (pageContext: PageContextClient): ReturnType<OnRenderClient> => {
  const { Page, pageProps } = pageContext
  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  )
  const container = document.getElementById('page-view')!
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
  document.title = getPageTitle(pageContext)
}
