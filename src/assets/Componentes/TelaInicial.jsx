function TelaInicial({nome,dados}) {
    return (
     <div>
        <label for={nome}>{nome}</label>
        <input type={dados} id={nome} name={nome} required></input>
     </div>
    )
}
export default TelaInicial;