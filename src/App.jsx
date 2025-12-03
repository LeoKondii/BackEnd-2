import './App.css'
import './index.css'
import Coleta from './assets/Componentes/Coleta'
import TelaCadastro from './assets/Componentes/Views/TelaCadastro.jsx'

function App() {
  return (
    <>
      <div>
        <h1>Bem vindo ao site ...</h1>
      </div>
      <Coleta nome="Usuário" dados="text"/>
      <Coleta nome="Senha" dados="password"/>
      <div>
      <button className="button" onClick={() => alert('Redirecionando...')}>Entrar</button>
      <button className="button" onClick={<TelaCadastro />}>Criar conta</button>
      </div>
    </>
  )
}

export default App
