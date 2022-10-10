import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AuthRequired from './services/AuthRequired'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthRequired>
      <App />
    </AuthRequired>
  </React.StrictMode>
)


postMessage({ payload: 'removeLoading' }, '*')
/**
 * If you enables use of Node.js API in the Renderer-process
 * ```
 * npm i -D vite-plugin-electron-renderer
 * ```
 * @see - https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
 */
// import './samples/node-api'