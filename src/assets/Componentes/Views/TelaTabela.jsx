import Tabela from '../Tabela.jsx'
import '../../../index.css'
import { useNavigate } from 'react-router-dom';


function TelaTabela() {
    const navigate = useNavigate();
    return (
    <>
        <div>
            <h1>Tabelas</h1>
        </div>
        <Tabela dados1="Nome do Cliente" dados2="Email do Cliente"/>
        <div>
        <button className="button" onClick={() => navigate('/login')}>Voltar</button>
        </div>
    </>)
    }
export default TelaTabela;