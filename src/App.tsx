import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { Layout } from './components/layout'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}

export default App
