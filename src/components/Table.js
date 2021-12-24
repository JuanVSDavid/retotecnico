import {useState, useEffect} from 'react'

const Table = () => {
    const [api, setApi] = useState()
    const callListApi = async () => {
        const response = await fetch('http://localhost:8080/api/bestScore')
        const responseJSON = await response.json()
        setApi(responseJSON.sort((a,b) => b.scoreA - a.scoreA))
    }
    useEffect(() => {callListApi()}, [])
    return (
        <div className="table-responsive mt-5">
            {!api ? <p>Cargando...</p> : <table className="table">
                <thead className="text-white">
                    <tr>
                        <th>Nombre</th>
                        <th>Puntaje</th>
                    </tr>
                </thead>
                <tbody className="text-white">
                    {api.map(api => (<tr key={api.id}><td>{api.name}</td><td>{api.scoreA}</td></tr>))}
                </tbody>
            </table>}
        </div>
    )
}
export default Table