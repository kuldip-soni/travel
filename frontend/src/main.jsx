import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <PersistGate loading={null} persistor={persistor}>

    <Provider store={store}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>,
      </BrowserRouter>
    </Provider>

  </PersistGate>


)
