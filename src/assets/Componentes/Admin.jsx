function Admin(props) {
    if(props.admin){
        return(
            <div>
            <button>Editar</button>
            <button>Excluir</button>
            </div>
        )
    }
}
export default Admin;