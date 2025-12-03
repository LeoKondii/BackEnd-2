import styles from './Coleta.module.css'

function Coleta({nome,dados}) {
    return (
     <div >
        <label className={styles.coletaLabel} htmlFor={nome}>{nome}</label>
        <input className={styles.coletaCaixa} type={dados} id={nome} name={nome} required></input>
     </div>
    )
}
export default Coleta;