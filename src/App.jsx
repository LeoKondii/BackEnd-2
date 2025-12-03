import './App.css'
import './index.css'
import TelaInicial from './assets/Componentes/Views/TelaInicial.jsx'
import TelaCadastro from './assets/Componentes/Views/TelaCadastro.jsx'
import TelaLogin from './assets/Componentes/Views/TelaLogin.jsx'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

function App() {
  return (
    <>
      <div>
      <Router>
        <Routes>
          <Route path='/' element={<TelaInicial />} />
          <Route path='/cadastro' element={<TelaCadastro />} />
          <Route path='/login' element={<TelaLogin />} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
