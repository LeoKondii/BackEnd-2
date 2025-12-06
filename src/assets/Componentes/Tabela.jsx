import Listar from "./Listar";

function Tabela({dados1, dados2,dados3,dados4,dados5}) {
    return(
        <table>
            <Listar d1={dados1} d2={dados2} />
        </table>
    )
}

export default Tabela;