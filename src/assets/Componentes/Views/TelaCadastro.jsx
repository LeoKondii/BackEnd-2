import '../../../index.css'
import { useNavigate } from 'react-router-dom';

function TelaCadastro() {
    const navigate = useNavigate();
    return (
    <>
        <div>
            <h1>Realize seu cadastro</h1>
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
        <label>Email</label>
        <input required></input>
        </div>
        <div>
        <button className="button" onClick={() => alert('Redirecionando...')}>Concluir</button>
        <button className="button" onClick={() => navigate('/')}>Retornar</button>
        </div>
    </>)
    }
export default TelaCadastro;