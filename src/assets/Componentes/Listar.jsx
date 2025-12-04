import styles from './Listar.module.css'
import Admin from './Admin.jsx'

function Listar({d1,d2}) {
    return (
     <div className={styles.Linha}>
        <label>{d1}</label>
        <label>{d2}</label>
        <Admin admin={true}></Admin>
     </div>
    )
}
export default Listar;