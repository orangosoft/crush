import '@styles/index.css'

import App from './App'
import { Router } from '@solidjs/router'
import clickOutside from '@directives/clickOutside'
/* @refresh reload */
import { render } from 'solid-js/web'

declare module 'solid-js/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      iframe: any
      webview: any
    }
    interface Directives {
      model: [() => any, (v: any) => any]
      clickOutside: typeof clickOutside
    }
  }
}

declare global {
  interface Window {
    portal: any
  }
}
const root = document.getElementById('app')
if (root) {
  render(
    () => (
      <Router>
        <App />
      </Router>
    ),
    root
  )
}
