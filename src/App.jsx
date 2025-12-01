import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TelaInicial from './assets/Componentes/TelaInicial.jsx'
import Botao from './assets/Componentes/Botao.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TelaInicial nome="Email" dados="email"/>
      <TelaInicial nome="Senha" dados="senha"/>
      <Botao texto="Entrar" onClick={() => alert('Entrando...')}/>
    </>
  )
}

export default App
