import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

const root = document.getElementById('demo')
const renderApp = Root => {
  ReactDOM.render(
    <AppContainer>
      <Root />
    </AppContainer>,
    root,
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    renderApp(NewApp)
  })
}
