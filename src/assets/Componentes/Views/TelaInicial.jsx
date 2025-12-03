import Coleta from '../Coleta.jsx'
import '../../../index.css'

function TelaInicial() {
    return (
    <>
        <div>
            <h1>Bem vindo ao site ...</h1>
        </div>
        <Coleta nome="Nome" dados="text"/>
        <Coleta nome="Senha" dados="password"/>
        <Coleta nome="Email" dados="email"/>
        <div>
        <button className="button" onClick={() => alert('Redirecionando...')}>Concluir</button>
        <button className="button" onClick={() => alert('Redirecionando...')}>Retornar</button>
        </div>
    </>)
    }
export default TelaInicial;