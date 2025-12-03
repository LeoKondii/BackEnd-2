import '../../../index.css'
import { useNavigate } from 'react-router-dom';

function TelaLogin() {
    const navigate = useNavigate();
    return (
    <>
        <div>
            <script>
            if(user.tipoCliente == 'Admin'){
            <div class='dropdown'>
                <button class="dropbtn">Clientes</button>
                <div class="dropdown-content">
                    <a href="#">Adicionar</a>
                    <a href="#">Listar</a>
                </div>
            </div>
}
            </script>
            <div class='dropdown'>
                <button class="dropbtn">Reservas</button>
                <div class="dropdown-content">
                    <a href="#">Adicionar</a>
                    <a href="#">Listar</a>
                </div>
            </div>
            <div class='dropdown'>
                <button class="dropbtn">Hoteis</button>
                <div class="dropdown-content">
                    <a href="#">Adicionar</a>
                    <a href="#">Listar</a>
                </div>
            </div>
        </div>
    </>)
    }
export default TelaLogin;