const clientes = require('../../Models/Cliente');

function PegarLista({id}) {
    
    const n = id;
    const arr =[];
    for (let i = 0; i < n; i++) {
        arr.push(
            <div>
                <label>Item {i + 1}</label>
            </div>
        );
    }
    return (
     arr
    )
}
export default PegarLista;