import '../../../index.css'
import { useNavigate } from 'react-router-dom';


function TelaInicial() {
    const navigate = useNavigate();
    return (
    <>
        <div>
            <h1>Bem vindo ao site ...</h1>
        </div>
        <div>
        <label>Nome</label>
        <input required></input>
        </div>
        <div>
        <label>Senha</label>
        <input required></input>
        </div>
        <div>
        <button className="button" onClick={() => navigate('/login')}>Concluir</button>
        <button className="button" onClick={() => navigate('/cadastro')}>Cadastrar</button>
        </div>
    </>)
    }
export default TelaInicial;