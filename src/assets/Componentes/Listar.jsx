import styles from './Listar.module.css'
import Admin from './Admin.jsx'

function Listar({d1,d2,d3,d4,d5}) {
    return (
     <div className={styles.Linha}>
        <label>{d1}</label>
        <label>{d2}</label>
        <label>{d3}</label>
        <label>{d4}</label>
        <label>{d5}</label>
        <Admin admin={true}></Admin>
     </div>
    )
}
export default Listar;